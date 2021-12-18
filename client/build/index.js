// const Show_Score:HTMLDivElement=document.querySelector('.score')
var ctx = canvas.getContext('2d');
//canvas dimensions
var width = window.innerWidth;
var height = window.innerHeight;
canvas.width = width;
canvas.height = height;
var p_x = width / 2;
var p_y = height;
var score = 0;
var animateId = 0;
var ProjectPoints = [];
var Enemys = [];
var person = new Player(p_x, height, 30, 'blue');
var Particals = [];
var color = ['red', 'white', 'yellow', 'green'];
var shot_max = false;
var enemy_loop = 0;
var start = false;
/*
Functions is User for generator Bullet based on user click
*/
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
/*
Functions is User for generator Bullet To Top
*/
function AddPointUp(event) {
    // console.log(event);
    var key = event.key;
    if (key == 'Enter')
        return;
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
// console.log('call')
/***
 * Functions is User to make the all change in our person and enemy
 */
function animate() {
    // console.log(ProjectPoints)
    animateId = requestAnimationFrame(animate);
    var link = 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dW5pdmVyc2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60';
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var background = new Image();
    background.src = link;
    background.onload = function () {
        ctx.drawImage(background, 0, 0, width, height);
    };
    person.draw();
    ProjectPoints.forEach(function (point, index) {
        point.update();
        var isOut = point.x + point.radius < 0
            ||
                point.x - point.radius > width
            ||
                point.y + point.radius < 0;
        if (isOut) {
            ProjectPoints.splice(index, 1);
        }
    });
    if (!GestsPlay) {
        SendMyScore(score);
        if (EnemyEndPoint != -1 && EnemyEndPoint < score) {
            ReSet();
            ShowResult(score);
        }
    }
    Enemys.forEach(function (e, index1) {
        e.update();
        var isOut = e.y - e.radius > height;
        if (isOut) {
            Enemys.splice(index1, 1);
        }
        else {
            ProjectPoints.forEach(function (point, index2) {
                var diff = Math.hypot(point.x - e.x, point.y - e.y) - point.radius - e.radius;
                if (diff < 1) {
                    setTimeout(function () {
                        ProjectPoints.splice(index2, 1);
                        dom.playGunHit();
                        if (e.radius - 10 > 10) {
                            score = score + Math.floor(e.radius) - 10;
                            btn.innerHTML = "" + score;
                            if (!GestsPlay) {
                                SendMyScore(score);
                                if (EnemyEndPoint != -1 && EnemyEndPoint < score) {
                                    ReSet();
                                    ShowResult(score);
                                }
                            }
                            for (var i = 0; i < Math.random() * (e.radius + 10); i++) {
                                Particals.push(new SmallPoint(e.x, e.y, 5 * Math.random(), e.color, {
                                    x: (Math.random() - 0.5) * (Math.random() * 10),
                                    y: (Math.random() - 0.5) * (Math.random() * 10),
                                }));
                            }
                            e.radius -= 10;
                        }
                        else {
                            score = score + Math.floor(e.radius);
                            btn.innerHTML = "" + score;
                            if (!GestsPlay) {
                                SendMyScore(score);
                            }
                            Enemys.splice(index1, 1);
                        }
                    });
                }
            });
            var diff = Math.hypot(person.x - e.x, person.y - e.y) - person.radius - e.radius;
            if (diff < 1) {
                setTimeout(function () {
                    if (start) {
                        if (!GestsPlay) {
                            YourMathEnd(score);
                            if (EnemyEndPoint != -1) {
                                ShowResult(score);
                            }
                        }
                        ReSet();
                    }
                });
                return;
            }
        }
    });
    Particals.forEach(function (Point, index) {
        Point.update();
        if (Point.opacity <= 0) {
            Particals.splice(index, 1);
        }
    });
}
function Start() {
    // for make the gun shot
    start = true;
    if (!BoxMain.classList.contains('none')) {
        BoxMain.classList.add('none');
    }
    // if(! Show_Score.classList.contains('none')){
    //     Show_Score.classList.add('none')
    // }
    shoot.loop = true;
    shoot.play();
    // window.addEventListener('ArrowLeft', AddPointUp);
    window.addEventListener('keydown', AddPointUp);
    window.addEventListener('mousedown', AddPoint);
    //enemy Started
    enemy_loop = setInterval(function () {
        var max = score / 1000 + 1;
        for (var i = 0; i < max; i++) {
            var radius = Math.random() * (40 - 10) + 10;
            var index = Math.floor(Math.random() * color.length);
            // const color
            var x = void 0;
            var y = void 0;
            var po = Math.random();
            if (po < .5) {
                x = width * Math.random();
                y = 0 - radius;
            }
            else if (po >= .5 && po < 0.7) {
                x = 0 - radius;
                y = (height - person.radius) * Math.random();
            }
            else {
                x = width + radius;
                y = (height - person.radius) * Math.random();
            }
            var speed = {
                y: 1,
                x: 0
            };
            if (Math.random() < .3) {
                var x1 = person.x - x;
                var y1 = person.y - y;
                var angle = Math.atan2(y1, x1);
                speed.x = Math.cos(angle);
                speed.y = Math.sin(angle);
            }
            var factor = Math.random() < 0.1
                ?
                    score > 500
                        ?
                            score > 1000 ?
                                5
                                :
                                    3
                        :
                            score > 1000 ?
                                4
                                :
                                    2
                :
                    Math.random() < 0.2
                        ?
                            2
                        :
                            1;
            Enemys.push(new Enemy(x, y, radius, color[index], speed, factor));
            // console.log(Enemys, ProjectPoints)
        }
    }, 1500);
    // call for gun hoot
    animate();
}
function ReSet() {
    btn_ans.innerHTML = "" + score;
    BoxMain.classList.remove("none");
    if (!GestsPlay) {
    }
    else {
        dom.removeNameBox();
        dom.showShow_Score();
    }
    cancelAnimationFrame(animateId);
    Enemys = [];
    ProjectPoints = [];
    Particals = [];
    // score = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect()
    shoot.pause();
    btn.innerHTML = "" + score;
    window.removeEventListener('mousedown', AddPoint);
    window.removeEventListener('keydown', AddPointUp);
    clearInterval(enemy_loop);
    // person = new Player(p_x, height, 30, 'blue');
    start = false;
}
function StartGuest() {
    GestsPlay = true;
    Start();
    dom.playGunShoot();
}
