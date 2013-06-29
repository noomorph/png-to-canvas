(function () {

    var frame = 0,
        scoreboard = new Scoreboard();

    scoreboard.register('Image', ImgBase64, document.getElementById("speed-img-base64"));
    scoreboard.register('Canvas.drawImage', CanvasDrawImage, document.getElementById("speed-canvas-base64"));
    scoreboard.register('Canvas.putImageData', CanvasPutImageData, document.getElementById("speed-pixel-base64"));
    
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        scoreboard.register('SvgImage', SvgImageBase64, document.getElementById("speed-svg-base64"));
    }

    var socket = io.connect();

    socket.on('frame', function (base64uri) {
        var can = 0, j;

        var next = function () {
            can += 1;
            if (can === scoreboard.count()) {
                socket.emit('request frame', ++frame);
                can = 0;
            }
        };

        setTimeout(function () {
            for (j = 0; j < scoreboard.impls.length; j++) {
                (function (impl) {
                    impl.render(base64uri, next);
                })(scoreboard.impls[j]);
            }
        }, 0);
    });

    socket.emit('request frame', ++frame);
})();
