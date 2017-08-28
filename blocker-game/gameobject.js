game.polygon = function(vertices) {
    var vertices = vertices,
        center = game.math.mean(vertices),
        position = game.point(0, 0),
        angle = 0,
        boundingBox = [game.point(_.minBy(vertices, 'x'), _.minBy(vertices, 'y')),
                       game.point(_.maxBy(vertices, 'x'), _.maxBy(vertices, 'y'))];
    return {
        vertices: vertices,
        vertexCount: vertices.length,
        boundingBox: boundingBox
    }
};

game.object = function(spriteUrl, shape, position, speed, acceleration) {
    var spriteUrl = spriteUrl,
        x = position[0],
        y = position[1],
        vx = speed[0],
        vy = speed[1],
        ax = acceleration[0],
        ay = acceleration[1];


    return {
        x: x,
        y: y,

        update: update,
        render: render
    };
};



