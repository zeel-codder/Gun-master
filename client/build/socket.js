var you = "";
var enemy = "";
var tem = "";
var RoomId = "";
var EnemyEndPoint = -1;
var GestsPlay = false;
var Input_Name = document.querySelector("#name");
var Input_Name_p = document.querySelector("#you");
var Input_Enemy = document.querySelector("#enemy");
var Load = document.querySelector(".load");
var Message = document.querySelector(".red");
var EnemyName = document.querySelector("#Ename");
var EnemyScore = document.querySelector("#pe");
var Result = document.querySelector("#result");
var EnemyBoxS = document.querySelector(".right");
var WaitBox = document.querySelector(".Wait");
var Tem_Input_Enemy = document.querySelector("#EnemyName");
var NameBox = document.querySelector('.name_container');
var EnemyBox = document.querySelector('.enemy_container');
var PlayBox = document.querySelector('.PlayBox');
var Show_Score = document.querySelector('.score');
var canvas = document.querySelector('#canvas');
var btn = document.querySelector('#p');
var btn_ans = document.querySelector('#p2');
var shoot = document.querySelector('#Shoot');
var BoxMain = document.querySelector('.center');
var Tutorial = document.querySelector('.tutorial');
var MyNameResult = document.querySelector('#Player');
var NumberOfPlayers = document.querySelector("#total");
// var socket = io("http://localhost:3000/");
var socket = io("https://gameshoot123.herokuapp.com");
socket.on("UserRefuse", function (to) {
    //console.log(to, 123)
    if (to == you) {
        ResponseEvent("User Not youWant to play With ", function () { });
    }
});
socket.on("UpdateScore", function (to, value) {
    //console.log('callfind')
    EnemyScore.innerHTML = "" + value;
});
socket.on('All', function (to, form) {
    //console.log(to, name, to == name)
    if (to == you) {
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
    // console.log('room',to,form)
    EnemyBox.classList.add("none");
    if (to == you || form == you) {
        EnemyBoxS.classList.remove("none");
        EnemyName.innerHTML = "" + enemy;
        if (Load.classList.contains('none')) {
            Load.classList.remove('none');
        }
        socket.emit('JoinRoom', RoomId, you);
        Start();
    }
});
socket.on('TotalPlayerChange', function (total) {
    NumberOfPlayers.innerHTML = "" + total;
});
socket.on("YourEnd", function (roomId, value, score) {
    EnemyEndPoint = value;
    ShowResult(score);
});
socket.on("EnemyMathEnd", function (roomId, value) {
    EnemyEndPoint = value;
    console.log(score, EnemyEndPoint);
    if (score > EnemyEndPoint) {
        ShowResult(score);
    }
});
function Home() {
    if (GestsPlay) {
        Show_Score.classList.add('none');
        NameBox.classList.remove('none');
        btn.innerHTML = "0";
        score = 0;
    }
    else {
        Show_Score.classList.add('none');
        EnemyBox.classList.remove('none');
        EnemyBoxS.classList.add('none');
        btn.innerHTML = "0";
        score = 0;
        EnemyEndPoint = -1;
        enemy = "";
        tem = "";
        RoomId = "";
        EnemyEndPoint = -1;
    }
    GestsPlay = false;
}
function ShowResult(score) {
    if (!Load.classList.contains('none')) {
        Load.classList.add('none');
    }
    if (EnemyEndPoint < score) {
        Result.innerHTML = "You Win";
    }
    else if (EnemyEndPoint > score) {
        Result.innerHTML = "You Loss";
    }
    else {
        Result.innerHTML = "Match Draw";
    }
    if (!WaitBox.classList.contains('none')) {
        WaitBox.classList.add('none');
    }
    Show_Score.classList.remove('none');
    if (!Load.classList.contains('none')) {
        ToggleLoad();
    }
    MyNameResult.innerHTML = you + " " + "vs" + " " + enemy;
    socket.emit("MathEndBoth", RoomId, score, EnemyEndPoint);
    socket.emit("Left-Room", RoomId, you);
    SendMyScore(score);
}
function SendMyScore(value) {
    //console.log('callsend')
    socket.emit("ScoreChanged", RoomId, you, value);
}
function YourMathEnd(score) {
    // console.log('End')
    ToggleLoad();
    WaitBox.classList.remove('none');
    socket.emit("MathEnd", RoomId, score);
}
function ToggleLoad() {
    Load.classList.toggle('none');
}
function display(data) {
    Message.innerHTML = "" + data;
    setTimeout(function () { return Message.innerHTML = ""; }, 3000);
}
function FindThePlayer() {
    score = 0;
    enemy = "";
    tem = "";
    RoomId = "";
    EnemyEndPoint = -1;
    btn.innerHTML = "0";
    EnemyScore.innerHTML = "0";
    if (!Show_Score.classList.contains('none')) {
        Show_Score.classList.add('none');
    }
    enemy = Input_Enemy.value;
    if (enemy == null || enemy.length == 0)
        return;
    ToggleLoad();
    socket.emit("UserFindAndJoin", enemy, you, function (type) {
        //console.log(type)
        ResponseEvent(type, function () {
            PlayBox.classList.add('none');
            EnemyBox.classList.remove('none');
        });
    });
}
function AddUser() {
    you = Input_Name.value;
    //console.log(name)
    if (you == null || you.length == 0)
        return;
    ToggleLoad();
    socket.emit('AddUser', you, function (type) {
        ResponseEvent(type, function () {
            Input_Name_p.innerHTML = "" + you;
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
    score = 0;
    EnemyEndPoint = -1;
    btn.innerHTML = "0";
    EnemyScore.innerHTML = "0";
    socket.emit('ChallengeAccepted', you, enemy);
    PlayBox.classList.add('none');
}
function NotAccepted() {
    PlayBox.classList.add('none');
    EnemyBox.classList.remove('none');
    socket.emit('ChallengeAcceptedNotExcepted', you, tem);
    tem = "";
}
function ToggleTutorial() {
    NameBox.classList.toggle('none');
    Tutorial.classList.toggle('none');
}
function Reload() {
    window.location.reload();
}
ToggleLoad();
