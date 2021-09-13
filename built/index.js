var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
var indexs = [];
var width = window.innerWidth;
var height = window.innerHeight;
canvas.width = width;
canvas.height = height;
var x = width / 2;
var y = height;
var person = new Player(x, y, 30, 'blue');
// indexs.push({ x, y })
person.draw();
window.addEventListener('click', function (event) {
    var x = event.clientX;
    var y = event.clientY;
    console.log(x + " " + y);
    indexs.push({ x: x, y: y });
    var Project = new ProjectDot(x, y, 5, 'red', { x: 1, y: 1 });
    Project.draw();
});
function drawLines() {
    var i = 0;
    var inter = setInterval(function () {
        if (i === indexs.length - 2) {
            clearInterval(inter);
            return;
        }
        // console.log('call')
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.strokeStyle = "blue";
        ctx.moveTo(indexs[i].x, indexs[i].y);
        ctx.lineTo(indexs[i + 1].x, indexs[i + 1].y);
        ctx.stroke();
        i++;
    }, 500);
    console.log(indexs);
}
