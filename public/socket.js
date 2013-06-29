(function () {

    var i = 0, total = 0, msImage = 0, msCanvas = 0,
        canvas1 = document.getElementById("canvas1"),
        ctx = canvas1.getContext("2d"),
        image1 = document.getElementById("image1"),
        speedImage = document.getElementById("speed-img-base64"),
        speedCanvas = document.getElementById("speed-canvas-base64");

    var socket = io.connect();

    socket.on('frame', function (base64uri) {
      var can = 0;

      total += 1;

      function next () {
        can += 1;
        if (can === 2) {
          socket.emit('request frame', ++i);
          can = 0;
        }
      }

      setTimeout(function () {
        var start = new Date();
        image1.src = base64uri;
        image1.onload = function () {
          msImage += new Date() - start;
          speedImage.value = (msImage / total).toFixed(0) + "ms";
          next();
        };
      }, 0);

      setTimeout(function () {
        var start = new Date();
        var tmp = new Image();
        tmp.src = base64uri;
        tmp.onload = function () {
          ctx.drawImage(tmp, 0, 0, canvas1.width, canvas1.height);
          msCanvas += new Date() - start;
          speedCanvas.value = (msCanvas / total).toFixed(0) + "ms";
          next();
        };
      }, 0);

    });

    socket.emit('request frame', ++i);
})();