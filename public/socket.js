(function () {
    var start = new Date(),
        i = 0,
        total = 0;
    var speed = document.getElementById("speed");

    var canvas = document.getElementById("canvas"), ctx, image;
    if (canvas) {
      ctx = canvas.getContext("2d");
      image = new Image();
    } else {
      image = document.images[0];
    }

    var socket = io.connect();

    socket.on('connect', function () {
      console.log('connected');
    });

    socket.on('disconnect', function () {
      console.log('disconnected');
    });

    socket.on('reconnect', function () {
      console.log('reconnected');
    });

    image.onload = function () {
      if (ctx) {
        ctx.drawImage(image, 0, 0);
      }
      speed.value = ((++total) / ((new Date()-start)*0.001)).toFixed(0);
      socket.emit('request frame', ++i);
    };

    socket.on('frame', function (base64uri) {
      image.src = base64uri;
    });

    socket.emit('request frame', ++i);
})();