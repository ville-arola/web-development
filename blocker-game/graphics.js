game.graphics = (function() {
    var _ctx = game.ctx;

    function drawObject(obj) {
        var shape = obj.vertices.slice(0);
        _ctx.fillStyle = obj.color;
        _ctx.beginPath();
        _ctx.moveTo(shape.shift(), shape.shift());
        while(shape.length) {
            _ctx.lineTo(shape.shift(), shape.shift());
        }
        _ctx.closePath();
        _ctx.fill();
    }

    return {
        drawObject: drawObject
    }
})();