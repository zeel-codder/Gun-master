var name = "";
var enemy = "";
var tem = "";
var RoomId = "";
var EnemyEndPoint = -1;
var Input_Name = document.getElementById("name");
var Input_Name_p = document.getElementById("you");
var Input_Enemy = document.getElementById("enemy");
var Load = document.querySelector(".load");
var Message = document.querySelector(".red");
var EnemyName = document.querySelector("#Ename");
var EnemyScore = document.querySelector("#pe");
var Result = document.querySelector("#result");
var EnemyBoxS = document.querySelector(".right");
var WaitBox = document.querySelector(".Wait");
var Tem_Input_Enemy = document.getElementById("EnemyName");
var NameBox = document.querySelector('.name_container');
var EnemyBox = document.querySelector('.enemy_container');
var PlayBox = document.querySelector('.PlayBox');
var Show_Score = document.querySelector('.score');
var canvas = document.querySelector('#canvas');
var btn = document.querySelector('#p');
var btn_ans = document.querySelector('#p2');
var shoot = document.querySelector('#Shoot');
var tutorial = document.querySelector('.center');
var socket = io("http://localhost:3000");
function FindThePlayer() {
    if (!Show_Score.classList.contains('none')) {
        Show_Score.classList.add('none');
    }
    enemy = Input_Enemy.value;
    if (enemy == null)
        return;
    ToggleLoad();
    socket.emit("UserFindAndJoin", enemy, name, function (type) {
        console.log(type);
        ResponseEvent(type, function () {
            PlayBox.classList.add('none');
            EnemyBox.classList.remove('none');
        });
    });
}
function AddUser() {
    name = Input_Name.value;
    console.log(name);
    if (name == null)
        return;
    ToggleLoad();
    socket.emit('AddUser', name, function (type) {
        ResponseEvent(type, function () {
            Input_Name_p.innerHTML = "" + name;
            NameBox.classList.add('none');
            EnemyBox.classList.remove('none');
        });
    });
}
function ResponseEvent(type, callback) {
    ToggleLoad();
    if (!type) {
        callback();
    }
    else {
        display(type);
    }
}
function Accepted() {
    enemy = tem;
    socket.emit('ChallengeAccepted', name, enemy);
    PlayBox.classList.add('none');
}
function NotAccepted() {
    PlayBox.classList.add('none');
    EnemyBox.classList.remove('none');
    socket.emit('ChallengeAcceptedNotExcepted', name, tem);
    tem = "";
}
socket.on("UserRefuse", function (to) {
    console.log(to, 123);
    if (to == name) {
        ResponseEvent("User Not youWant to play With ", function () {
        });
    }
});
function ToggleLoad() {
    Load.classList.toggle('none');
}
function display(data) {
    Message.innerHTML = "" + data;
    setTimeout(function () { return Message.innerHTML = ""; }, 3000);
}
function CallBack(type) {
    ToggleLoad(type);
}
function SendMyScore(value) {
    console.log('callsend');
    socket.emit("ScoreChanged", RoomId, name, value);
}
function YourMathEnd(score) {
    console.log('End');
    ToggleLoad();
    WaitBox.classList.remove('none');
    socket.emit("MathEnd", RoomId, score);
}
socket.on("UpdateScore", function (to, value) {
    console.log('callfind');
    EnemyScore.innerHTML = "" + value;
});
socket.on('connect', function (socket) {
    console.log('connected');
});
socket.on("UserNotFound", function (User) {
    console.log(User);
});
socket.on('All', function (to, form) {
    console.log(to, name, to == name);
    if (to == name) {
        tem = form;
        Tem_Input_Enemy.innerHTML = "" + form;
        EnemyBox.classList.add('none');
        if (!Show_Score.classList.contains('none')) {
            Show_Score.classList.add('none');
        }
        PlayBox.classList.remove('none');
    }
});
socket.on("EnterRoom", function (roomId, to, form) {
    RoomId = roomId;
    console.log('room', to, form);
    EnemyBox.classList.add("none");
    if (to == name || form == name) {
        EnemyBoxS.classList.remove("none");
        EnemyName.innerHTML = "" + enemy;
        socket.emit('JoinRoom', RoomId, name);
        Start();
        if (!Load.classList.contains('none')) {
            Load.classList.add('none');
        }
    }
});
function ShowResult(score) {
    if (EnemyEndPoint <= score) {
        Result.innerHTML = "You Win";
    }
    else {
        Result.innerHTML = "You Loss";
    }
    if (!WaitBox.classList.contains('none')) {
        WaitBox.classList.add('none');
    }
    Show_Score.classList.remove('none');
    if (!Load.classList.contains('none')) {
        ToggleLoad();
    }
    socket.emit("MathEndBoth", RoomId, score, EnemyEndPoint);
    socket.emit("Left-Room", RoomId, name);
    score = 0;
    EnemyEndPoint = -1;
    SendMyScore(score);
}
socket.on("YourEnd", function (roomId, value, score) {
    EnemyEndPoint = value;
    ShowResult(score);
});
socket.on("EnemyMathEnd", function (roomId, value) {
    EnemyEndPoint = value;
});
function Home() {
    Show_Score.classList.add('none');
    EnemyBox.classList.remove('none');
    EnemyEndPoint = -1;
    score = 0;
    enemy = "";
    tem = "";
    RoomId = "";
    EnemyEndPoint = -1;
    EnemyBoxS.classList.add('none');
    btn.innerHTML = "0";
}
ToggleLoad();
