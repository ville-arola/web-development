game = (function() {
    var gameWrapper = document.getElementById('game'),
        menuWrapper = document.getElementById('menu'),
        canvas = document.createElement('canvas');

    canvas.setAttribute('width', 800);
    canvas.setAttribute('height', 600);
    gameWrapper.appendChild(canvas);



    var gameWindow = {
        canvas : document.createElement("canvas"),
        init : function() {
            this.canvas.width = 800;
            this.canvas.height = 600;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }




    document.getElementById('start_btn').addEventListener('click', function () {
        showGame();
    });

    document.addEventListener('keydown', function (event) {
        if (event.keyCode == '38') {
            //up
        }
        else if (event.keyCode == '40') {
            //down
        }
    });
    document.addEventListener('keyup', function (event) {
        if (event.keyCode == '38' || event.keyCode == '40') {

        }
    });

    function showGame() {
        gameWrapper.removeAttribute('class');
        menuWrapper.setAttribute('class', 'hidden');
    }

    function showMenu() {
        menuWrapper.removeAttribute('class');
        gameWrapper.setAttribute('class', 'hidden');
    }

    return {
        ctx: canvas.getContext('2d'),
        showMenu: showMenu
    }
})();
