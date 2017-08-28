game.physics = (function() {

    var object = {
        shape: [{x:0, y:0}],
        vertices: [{x:0, y:0}],
        position: {x:0, y:0},
        orientation: 0,
        speed: {x:0, y:0},
        angularSpeed: 0,
        cFriction: 0.5,
        cBounce: 0.5,
        color: '#f0f',

    };

    function applyForce(force, object, point) {
        var centerOfMass = game.math.mean(object.vertices),
            r = point ? distance(point, c) : 0;
    }

    function resolveCollision(objectA, objectB) {
        // find collision point
        // if collision point exists
        // calculate and apply collision forces to each object
    }

    return {
        applyForce: applyForce,
        resolveCollision: resolveCollision
    }
})();

game.utils = (function() {
    // use sparingly
    function pointInsidePolygon(point, polygon) {
        var c = polygon.vertices,
            b = game.math.diffAB(c[0], point),
            a, theta = 0;
        for (var i = 1; i < polygon.vertexCount; i++) {
            a = b;
            b = game.math.diffAB(c[i], point);
            theta += Math.atan((a.x*b.y - a.y*b.x) / (a.x*b.x + a.y*b.y));
        }
        theta += Math.atan((b.x*c[0].y - b.y*c[0].x) / (b.x*c[0].x + b.y*c[0].y));
        return theta / (2*Math.PI) > 0.5;
    }

    function areColliding(obj1, obj2) {
        // bounding box test first
        if (obj1.boundingBox[0].x > obj2.boundingBox[1].x ||
            obj1.boundingBox[0].y > obj2.boundingBox[1].y ||
            obj1.boundingBox[1].x < obj2.boundingBox[0].x ||
            obj1.boundingBox[1].y < obj2.boundingBox[0].y) {
            return false;
        }
        // find object vertices inside other object's bounding box
        var c_vertices1 = _.filter(obj1.vertices, function(v) {
                if (v.x >= obj2.boundingBox[0].x & v.x <= obj2.boundingBox[1].x &
                    v.y >= obj2.boundingBox[0].y & v.y <= obj2.boundingBox[1].y) {
                    return true;
                }
                return false;
            }),
            c_vertices2 = _.filter(obj2.vertices, function(v) {
                if (v.x >= obj1.boundingBox[0].x & v.x <= obj1.boundingBox[1].x &
                    v.y >= obj1.boundingBox[0].y & v.y <= obj1.boundingBox[1].y) {
                    return true;
                }
                return false;
            });
        if (c_vertices1.length + c_vertices2.length == 0) {
            return false;
        }
        // determine if any of them is inside the other polygon
        for (var i = obj1.verticeCount; i; i--) {
            if (pointInsidePolygon(obj1.vertices[i-1], obj2)) {
                return true;
            }
        }
        for (var i = obj2.verticeCount; i; i--) {
            if (pointInsidePolygon(obj2.vertices[i-1], obj1)) {
                return true;
            }
        }
        return false;
    }

    return {
        areColliding: areColliding
    };
})();