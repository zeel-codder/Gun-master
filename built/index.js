var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
var btn = document.querySelector('#p');
var width = window.innerWidth;
var height = window.innerHeight;
canvas.width = width;
canvas.height = height;
var p_x = width / 2;
var p_y = height;
var score = 0;
var ProjectPoints = [];
var Enemys = [];
var person = new Player(p_x, height, 30, 'blue');
var color = ['red', 'black', 'yellow', 'green'];
var shot_max = false;
var enemy_loop = 0;
var start = false;
function AddPoint(event) {
    var index = Math.floor(Math.random() * color.length);
    var x = event.clientX - p_x;
    var y = event.clientY - p_y;
    var angle = Math.atan2(y, x);
    var Project = new ProjectDot(p_x, p_y, 5, color[index], { x: Math.cos(angle), y: Math.sin(angle) }, 4);
    //  console.log(Project);
    if (start) {
        ProjectPoints.push(Project);
    }
    else {
        start = true;
    }
}
function Start() {
    // for make the gun shot
    window.addEventListener('click', AddPoint);
    //enemy Started
    enemy_loop = setInterval(function () {
        var radius = Math.random() * (30 - 10) + 10;
        var index = Math.floor(Math.random() * color.length);
        // const color
        var x;
        var y;
        x = width * Math.random();
        y = 0 - radius;
        var x1 = p_x - x;
        var y2 = p_y - y;
        var angle = Math.atan2(y2, x1);
        var speed = {
            y: Math.sin(angle),
            x: Math.cos(angle)
        };
        Enemys.push(new Enemy(x, y, radius, color[index], speed));
        // console.log(Enemys, ProjectPoints)
    }, 1000);
    // call for gun hoot
    animate();
}
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    person.draw();
    ProjectPoints.forEach(function (point) {
        point.update();
    });
    Enemys.forEach(function (e, index1) {
        e.update();
        ProjectPoints.forEach(function (point, index2) {
            var diff = Math.hypot(point.x - e.x, point.y - e.y) - point.radius - e.radius;
            if (diff < 1) {
                setTimeout(function () {
                    score++;
                    btn.innerHTML = "" + score;
                    ProjectPoints.splice(index2, 1);
                    Enemys.splice(index1, 1);
                });
            }
        });
        var diff = Math.hypot(p_x - e.x, p_y - e.y) - 30 - e.radius;
        if (diff < 1) {
            setTimeout(function () {
                alert("Game End score=" + score);
                ReSet();
            });
            return;
        }
    });
}
function ReSet() {
    Enemys = [];
    ProjectPoints = [];
    score = 0;
    btn.innerHTML = "" + score;
    window.removeEventListener('click', AddPoint);
    if (enemy_loop != 0) {
        clearInterval(enemy_loop);
    }
    start = false;
}
