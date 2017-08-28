/**
 *
var game = (function() {
    // init stuff here?
    var player = new GameObject();
    var obstacles = [];
    return {
        time: 0,
        player: player,
        obstacles: obstacles
    };
})();

game.requestAnimFrame = (function() {
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

game.main = function() {
    var t = Date.now(),
        dt = (t - game.time) / 1000.0;

    // update game state

    // draw frame

    game.time = t;
    game.requestAnimFrame(game.main);
}

game.player = {
    x: 0,
    y: 0,
    vy: 0,
    vx: 1,
    w: 20,
    h: 20,
    color: '#000'
};

game.obstacle = {
    x: 0,
    w: 10,
    hole: 0,
    color: '#f00'
};

game.ui = (function() {
    var _menu = document.getElementById('menu'),
        _game = document.getElementById('game'),
        _canvas = document.createElement("canvas"),
        _ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 480;
    _game.appendChild(canvas);
    
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == '38') {
            game.thrustVector = 1;
        }
        else if (event.keyCode == '40') {
            game.thrustVector = -1
        }
    });
    document.addEventListener('keyup', function (event) {
        if (event.keyCode == '38') {
            game.thrustVector = 0;
        }
        else if (event.keyCode == '40') {
            game.thrustVector = 0;
        }
    });

    document.getElementById('start_btn').addEventListener('click', function() {
        switchView();
        //loadGame();
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
        ctx: _ctx,
        w: _w,
        h: _h,
        switchView: switchView
    }
})();


 **/