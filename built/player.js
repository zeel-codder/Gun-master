var Player = /** @class */ (function () {
    function Player(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    Player.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    return Player;
}());
var ProjectDot = /** @class */ (function () {
    function ProjectDot(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    ProjectDot.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    ProjectDot.prototype.update = function () {
        this.draw();
        this.x - this.x + this.velocity.x;
        this.y - this.y + this.velocity.y;
    };
    return ProjectDot;
}());
