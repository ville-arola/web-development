var game = {};

game.ship = (function() {
    var _thrustVector = 0,
        _x = w / 2,
        _y = h / 2,
        _vx = 1.0,
        _vy = 0;
    return {
        thrustVector: _thrustVector
    };
})();

game.ui = (function() {
    var _menu = document.getElementById('menu'),
        _game = document.getElementById('game'),
        _canvas = document.getElementById('game_window'),
        _upBtn = document.getElementById('upBtn'),
        _downBtn = document.getElementById('downBtn'),
        _ctx = _canvas.getContext('2d'),
        _w = _canvas.offsetWidth,
        _h = _canvas.offsetHeight;



    document.getElementById('startBtn').addEventListener('click', function() {

        switchView();
        //loadGame();
    });


    var thrustVector;
    document.addEventListener('keydown', function(event) {
        if (event.keyCode == '38') {
            thrustVector = 1;
        }
        else if (event.keyCode == '40') {
            thrustVector = -1
        }
    });
    document.addEventListener('keyup', function(event) {
        if (event.keyCode == '38') {
            thrustVector = 0;
        }
        else if (event.keyCode == '40') {
            thrustVector = 0;
        }
    });




    function switchView() {
        if (_menu.className == 'hidden') {
            _menu.className = '';
            _game.className = 'hidden';
        }
        else {
            _menu.className = 'hidden';
            _game.className = '';
        }
    }

    return {
        menu: _menu,
        game: _game,
        canvas: _canvas,
        upBtn: _upBtn,
        downBtn: _downBtn,
        ctx: _ctx,
        w: _w,
        h: _h,
        switchView: switchView
    }
})();


game.graphicsAssets = (function() {
    var assets = [
        { name: 'rocket', url: 'images/rocket.svg' },
        { name: 'star',   url: 'images/star.svg' },
        { name: 'planet1',   url: 'images/planet1.svg' }
    ];
    var index = 0;
    function load(){
        var img = new Image();
        img.onload = function () {
            assets[index].obj = img;
            if (index < assets.length - 1) {
                index++;
                setTimeout(load, 0);
            }
            else {
                document.dispatchEvent('assetsLoaded');
            }
        }
    }
    document.addEventListener('assetsLoaded', function() {
        var res = [];
        for (var i = 0; i < assets.length; i++) {
            res[assets[i].name] = assets[i].obj;
        }
        game.graphicsAssets = res;
    });
    load();
})();

/*
var player = (function() {
    var _img = new Image(),

        _draw = null;
    _img.onload = function () {
        _draw = function() {
            ctx.drawImage(_img, _x, _y);
        }
    };
    _img.src = 'images/rocket.svg';
    return {
        draw: _draw,
        x: _x,
        y: _y,
        vx: _vx,
        vy: _vy
    }
})();

var star = function(x, y, z) {
    var _x = x,
        _y = y,
        _z = z;
    function draw() {

    }
}

var background = (function() {
    var n = 50,
        starField = [];
    function init() {
        for (var i = n; i; i--) {

        }
    }
})();

*/