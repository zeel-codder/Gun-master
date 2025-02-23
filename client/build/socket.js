var you = "";
var enemy = "";
var tem = "";
var RoomId = "";
var EnemyEndPoint = -1;
var GestsPlay = false;
var dom = new Document_Control();
var socket = io("https://gun-master-backend.modulezp.com/");
// var socket = io("https://game-master-be.zeelcodder.repl.co/");
socket.on("UserRefuse", function (to) {
    //console.log(to, 123)
    if (to == you) {
        ResponseEvent("User Not youWant to play With ", function () { });
    }
});
socket.on("UpdateScore", function (to, value) {
    //console.log('callfind')
    dom.setEnemyScore(value);
});
socket.on("All", function (to, form) {
    console.log(to, you, to == you);
    if (to == you) {
        tem = form;
        dom.setEnemyName(form);
        dom.removeEnemyBox();
        if (!dom.isShowScoreDisplay()) {
            dom.removeShow_Score();
        }
        dom.showPlayBox();
        setTimeout(function () {
            if (enemy != form) {
                NotAccepted();
            }
        }, 10000);
    }
});
socket.on("EnterRoom", function (roomId, to, form) {
    RoomId = roomId;
    // console.log('room',to,form)
    if (to == you || form == you) {
        dom.removeEnemyBox();
        dom.showEnemyScoreBox();
        dom.setEnemyScoreName(enemy);
        if (dom.isLoadDisplay()) {
            dom.removeLoad();
        }
        socket.emit("JoinRoom", RoomId, you);
        Start();
    }
});
socket.on("TotalPlayerChange", function (total) {
    dom.setNumberOfPlayer(total);
});
socket.on("YourEnd", function (roomId, value, score) {
    EnemyEndPoint = value;
    ShowResult(score);
});
socket.on("EnemyMathEnd", function (roomId, value) {
    EnemyEndPoint = value;
    console.log(score, EnemyEndPoint);
    if (score > EnemyEndPoint) {
        socket.emit("MathEndBoth", roomId, score, EnemyEndPoint);
        // ShowResult(score);
    }
    else {
        if (dom.isShowScoreDisplay()) {
            dom.removeShow_Score();
        }
        dom.showWaitBox();
    }
});
function Home() {
    dom.playGunShoot();
    if (GestsPlay) {
        dom.startGestsGame();
        score = 0;
    }
    else {
        dom.startMutGame();
        score = 0;
        EnemyEndPoint = -1;
        enemy = "";
        tem = "";
        RoomId = "";
        EnemyEndPoint = -1;
    }
    GestsPlay = false;
    dom.setInput_Enemy("");
}
function ShowResult(score) {
    if (dom.isPlayBoxDisplay()) {
        dom.removePlayBox();
    }
    if (dom.isLoadDisplay()) {
        dom.removeLoad();
    }
    if (EnemyEndPoint < score) {
        dom.setResult("You Win");
    }
    else if (EnemyEndPoint > score) {
        dom.setResult("You Loss");
    }
    else {
        dom.setResult("Match Draw");
    }
    if (dom.isWaitBoxDisplay()) {
        dom.removeWaitBox();
    }
    dom.showShow_Score();
    if (dom.isLoadDisplay()) {
        dom.ToggleLoad();
    }
    dom.setMyResult(you, enemy);
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
    dom.ToggleLoad();
    dom.removeShow_Score();
    dom.showWaitBox();
    socket.emit("MathEnd", RoomId, score);
}
function display(data) {
    Message.innerHTML = "" + data;
    setTimeout(function () { return (Message.innerHTML = ""); }, 3000);
}
function FindThePlayer() {
    score = 0;
    enemy = "";
    tem = "";
    RoomId = "";
    EnemyEndPoint = -1;
    dom.setMyScore(0);
    dom.setEnemyScore(0);
    dom.playGunShoot();
    if (dom.isShowScoreDisplay()) {
        dom.removeShow_Score();
    }
    enemy = Input_Enemy.value;
    if (enemy == null || enemy.length == 0)
        return;
    dom.ToggleLoad();
    socket.emit("UserFindAndJoin", enemy, you, function (type) {
        //console.log(type)
        ResponseEvent(type, function () {
            dom.removePlayBox();
            dom.showEnemyBox();
        });
    });
}
function AddUser() {
    you = Input_Name.value;
    dom.playGunShoot();
    //console.log(name)
    if (you == null || you.length == 0)
        return;
    dom.ToggleLoad();
    socket.emit("AddUser", you, function (type) {
        ResponseEvent(type, function () {
            Input_Name_p.innerHTML = "" + you;
            dom.removeNameBox();
            dom.showEnemyBox();
        });
    });
}
function ResponseEvent(type, callback) {
    dom.ToggleLoad();
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
    dom.setMyScore(0);
    dom.setEnemyScore(0);
    socket.emit("ChallengeAccepted", you, enemy);
    dom.removePlayBox();
    dom.setInput_Enemy("");
    dom.playGunShoot();
    if (!dom.isLoadDisplay()) {
        dom.showLoad();
    }
}
function NotAccepted() {
    dom.removePlayBox();
    dom.showEnemyBox();
    socket.emit("ChallengeAcceptedNotExcepted", you, tem);
    tem = "";
    dom.setInput_Enemy("");
    dom.playGunShoot();
}
function ToggleTutorial() {
    NameBox.classList.toggle("none");
    Tutorial.classList.toggle("none");
    dom.playGunShoot();
}
function Reload() {
    dom.playGunShoot();
    window.location.reload();
}
dom.ToggleLoad();
