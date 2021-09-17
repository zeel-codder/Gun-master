var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Player = /** @class */ (function () {
    function Player(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.factor = 1;
    }
    Player.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
    return Player;
}());
var ProjectDot = /** @class */ (function (_super) {
    __extends(ProjectDot, _super);
    function ProjectDot(x, y, radius, color, velocity, factor) {
        if (factor === void 0) { factor = 1; }
        var _this = _super.call(this, x, y, radius, color) || this;
        _this.velocity = velocity;
        _this.factor = factor;
        return _this;
    }
    ProjectDot.prototype.update = function () {
        this.draw();
        this.x = this.x + this.factor * this.velocity.x;
        this.y = this.y + this.factor * this.velocity.y;
    };
    return ProjectDot;
}(Player));
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(x, y, radius, color, velocity, factor) {
        if (factor === void 0) { factor = 1; }
        return _super.call(this, x, y, radius, color, velocity, factor) || this;
    }
    return Enemy;
}(ProjectDot));
var SmallPoint = /** @class */ (function (_super) {
    __extends(SmallPoint, _super);
    function SmallPoint(x, y, radius, color, velocity, factor) {
        if (factor === void 0) { factor = 1; }
        var _this = _super.call(this, x, y, radius, color, velocity, factor) || this;
        _this.opacity = 1;
        return _this;
    }
    SmallPoint.prototype.update = function () {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        this.opacity -= 0.01;
        _super.prototype.update.call(this);
        ctx.restore();
    };
    return SmallPoint;
}(Enemy));
