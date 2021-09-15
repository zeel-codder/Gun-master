var canvas = document.querySelector('#canvas');
var btn = document.querySelector('#p');
var shoot = document.querySelector('#Shoot');
var ctx = canvas.getContext('2d');
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
var color = ['red', 'white', 'yellow', 'green'];
var shot_max = false;
var enemy_loop = 0;
var start = false;
function AddPoint(event) {
    // console.log(event);
    // if(event.isTrusted=="Enter") return;
    var index = Math.floor(Math.random() * color.length);
    var x = event.clientX - person.x;
    var y = event.clientY - person.y;
    var angle = Math.atan2(y, x);
    var Project = new ProjectDot(person.x, person.y, 7, color[index], { x: Math.cos(angle), y: Math.sin(angle) }, 4);
    //  console.log(Project);
    if (start) {
        // shoot.currentTime=0;
        // shoot.play()
        ProjectPoints.push(Project);
    }
    else {
        start = true;
    }
    console.log('call1');
}
function AddPointUp(event) {
    // console.log(event);
    var key = event.key;
    var nu = 6;
    console.log(key);
    if (event.shiftKey || key == "ArrowUp") {
        var index = Math.floor(Math.random() * color.length);
        var x = person.x;
        var y = person.y;
        var Project = new ProjectDot(person.x, person.y, 5, color[index], { x: 0, y: -1 }, 4);
        //  console.log(Project);
        if (start) {
            if (Math.random() < .3 || key == "ArrowUp") {
                // shoot.currentTime=0;
                // shoot.play()
                ProjectPoints.push(Project);
            }
        }
        else {
            start = true;
        }
    }
    if (key == "ArrowLeft") {
        if (person.x - nu >= person.radius) {
            person.x -= nu;
        }
        else {
            person.x = person.radius;
        }
    }
    else if (key == "ArrowRight") {
        if (person.x + nu <= width - person.radius) {
            person.x += nu;
        }
        else {
            person.x = width - person.radius;
        }
    }
    // console.log('call')
}
function Start() {
    // for make the gun shot
    shoot.loop = true;
    shoot.play();
    // window.addEventListener('ArrowLeft', AddPointUp);
    window.addEventListener('keydown', AddPointUp);
    window.addEventListener('mousedown', AddPoint);
    //enemy Started
    enemy_loop = setInterval(function () {
        var radius = Math.random() * (30 - 10) + 10;
        var index = Math.floor(Math.random() * color.length);
        // const color
        var x;
        var y;
        x = width * Math.random();
        y = 0 - radius;
        var speed = {
            y: 1,
            x: 0
        };
        var factor = Math.random() < 0.1 ?
            score > 50 ?
                4
                :
                    2
            :
                Math.random() < 0.5 ?
                    2
                    :
                        1;
        Enemys.push(new Enemy(x, y, radius, color[index], speed, factor));
        // console.log(Enemys, ProjectPoints)
    }, 1500);
    // call for gun hoot
    animate();
}
// console.log('call')
function animate() {
    // console.log(ProjectPoints)
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    person.draw();
    ProjectPoints.forEach(function (point, index) {
        point.update();
        var isOut = point.x + point.radius < 0
            ||
                point.x - point.radius > width
            ||
                point.y + point.radius < 0;
        if (isOut) {
            setTimeout(function () {
                ProjectPoints.splice(index, 1);
            });
        }
    });
    Enemys.forEach(function (e, index1) {
        e.update();
        var isOut = e.y - e.radius > height;
        if (isOut) {
            setTimeout(function () {
                Enemys.splice(index1, 1);
            });
        }
        else {
            ProjectPoints.forEach(function (point, index2) {
                var diff = Math.hypot(point.x - e.x, point.y - e.y) - point.radius - e.radius;
                if (diff < 1) {
                    setTimeout(function () {
                        score++;
                        btn.innerHTML = "" + score;
                        ProjectPoints.splice(index2, 1);
                        if (e.radius - 10 > 10) {
                            e.radius -= 10;
                        }
                        else {
                            Enemys.splice(index1, 1);
                        }
                    });
                }
            });
            var diff = Math.hypot(person.x - e.x, person.y - e.y) - person.radius - e.radius;
            if (diff < 1) {
                setTimeout(function () {
                    alert("Game End score=" + score);
                    ReSet();
                });
                return;
            }
        }
    });
}
function ReSet() {
    Enemys = [];
    ProjectPoints = [];
    score = 0;
    btn.innerHTML = "" + score;
    window.removeEventListener('mousedown', AddPoint);
    window.removeEventListener('keydown', AddPointUp);
    if (enemy_loop != 0) {
        clearInterval(enemy_loop);
    }
    person = new Player(p_x, height, 30, 'blue');
    start = false;
}
