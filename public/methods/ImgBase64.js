function ImgBase64(pushScore) {
    var image1 = document.getElementById("image1"),
        start = new Date(),
        after;

    image1.onload = function () {
        pushScore(new Date() - start);
        if (after) {
            after();
            after = null;
        }
    };

    this.render = function (base64uri, callback) {
        start = new Date();
        after = callback;
        image1.src = base64uri;
    };
}