game.object = function(vertices, speed, angularSpeed, frictionCoefficient, bounceCoefficient, color) {
    var _vertices = vertices,
        _speed = speed,
        _angularSpeed = angularSpeed,
        _frictionCoefficient = frictionCoefficient,
        _bounceCoefficient = bounceCoefficient,
        _color = color;

    return {
        vertices: _vertices,
        speed: _speed,
        angularSpeed: _angularSpeed,
        mass: _mass,
        frictionCoefficient: _frictionCoefficient,
        bounceCoefficient: _bounceCoefficient,
        color: _color
    }
}