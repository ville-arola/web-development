game.math = (function() {
    function sumAB(a, b) {
        return game.vect2d(a.x+b.x, a.y+b.y);
    }

    function diffAB(a, b) {
        return game.vect2d(a.x-b.x, a.y-b.y);
    }

    function normP(p) {
        return Math.sqrt(p.x*p.x + p.y*p.y);
    }

    function distAB(a, b) {
        var dx = a.x - b.x,
            dy = a.y - b.y;
        return Math.sqrt(dx*dx + dy*dy);
    }

    function mean(points) {
        var len = points.length,
            sx = 0,
            sy = 0;
        for (var i = len; i; i--) {
            sx += points[i-1].x;
            sy += points[i-1].y;
        }
        return game.point(sx/len, sy/len);
    }

    return {
        sumAB: sumAB,
        diffAB: diffAB,
        normP: normP,
        distAB: distAB,
        mean: mean
    };
})();
