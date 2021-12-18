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
var shoot = document.querySelector('#bg');
var shoot_gun = document.querySelector('#Shoot');
var gun_hit = document.querySelector('#gun');
var BoxMain = document.querySelector('.center');
var Tutorial = document.querySelector('.tutorial');
var MyNameResult = document.querySelector('#Player');
var NumberOfPlayers = document.querySelector("#total");
var Document_Control = /** @class */ (function () {
    function Document_Control() {
    }
    //Enemy 
    Document_Control.prototype.setEnemyScore = function (value) {
        EnemyScore.innerHTML = "" + value;
    };
    Document_Control.prototype.setEnemyScoreName = function (enemy) {
        EnemyName.innerHTML = "" + enemy;
    };
    Document_Control.prototype.showEnemyScoreBox = function () {
        EnemyBoxS.classList.remove("none");
    };
    Document_Control.prototype.setEnemyName = function (name) {
        Tem_Input_Enemy.innerHTML = "" + name;
    };
    Document_Control.prototype.setInput_Enemy = function (name) {
        Input_Enemy.value = name;
    };
    Document_Control.prototype.removeEnemyBox = function () {
        EnemyBox.classList.add('none');
        console.log(new Error().stack);
    };
    Document_Control.prototype.showEnemyBox = function () {
        EnemyBox.classList.remove('none');
    };
    //User
    Document_Control.prototype.setMyName = function (name) {
        Input_Name_p.innerHTML = "" + you;
    };
    Document_Control.prototype.setMyScore = function (value) {
        btn.innerHTML = "" + value;
    };
    //Result
    Document_Control.prototype.setResult = function (value) {
        Result.innerHTML = value;
    };
    Document_Control.prototype.setMyResult = function (me, enemy) {
        MyNameResult.innerHTML = me + " " + "vs" + " " + enemy;
    };
    Document_Control.prototype.setNumberOfPlayer = function (value) {
        NumberOfPlayers.innerHTML = "" + value;
    };
    //ScoreBox
    Document_Control.prototype.removeShow_Score = function () {
        Show_Score.classList.add('none');
        // console.log('call remove')
        // console.trace()
        // console.log(new Error().stack);
    };
    Document_Control.prototype.showShow_Score = function () {
        Show_Score.classList.remove('none');
        console.log('call show');
        // console.trace()
        // console.log(new Error().stack);
        // throw('Error')
    };
    Document_Control.prototype.isShowScoreDisplay = function () {
        return !Show_Score.classList.contains('none');
    };
    //PlayBox
    Document_Control.prototype.removePlayBox = function () {
        PlayBox.classList.add('none');
    };
    Document_Control.prototype.showPlayBox = function () {
        PlayBox.classList.remove('none');
    };
    Document_Control.prototype.isPlayBoxDisplay = function () {
        return !PlayBox.classList.contains('none');
    };
    //WaitBox
    Document_Control.prototype.isWaitBoxDisplay = function () {
        return !WaitBox.classList.contains('none');
    };
    Document_Control.prototype.showWaitBox = function () {
        WaitBox.classList.remove('none');
    };
    Document_Control.prototype.removeWaitBox = function () {
        WaitBox.classList.add('none');
    };
    Document_Control.prototype.removeNameBox = function () {
        NameBox.classList.add('none');
    };
    Document_Control.prototype.showNameBox = function () {
        NameBox.classList.remove('none');
    };
    //Tutorial
    Document_Control.prototype.showTutorial = function () {
        Tutorial.classList.remove('none');
    };
    Document_Control.prototype.removeTutorial = function () {
        Tutorial.classList.add('none');
    };
    //Load
    Document_Control.prototype.isLoadDisplay = function () {
        return !Load.classList.contains('none');
    };
    Document_Control.prototype.showLoad = function () {
        Load.classList.remove('none');
        console.log(new Error().stack);
    };
    Document_Control.prototype.removeLoad = function () {
        Load.classList.add('none');
        console.log(new Error().stack);
    };
    //Game
    Document_Control.prototype.startGestsGame = function () {
        Show_Score.classList.add('none');
        NameBox.classList.remove('none');
        btn.innerHTML = "0";
    };
    Document_Control.prototype.startMutGame = function () {
        Show_Score.classList.add('none');
        EnemyBox.classList.remove('none');
        EnemyBoxS.classList.add('none');
        PlayBox.classList.add('none');
        btn.innerHTML = "0";
    };
    Document_Control.prototype.ToggleLoad = function () {
        Load.classList.toggle('none');
        // console.log()
        console.log(new Error().stack);
    };
    //music
    Document_Control.prototype.playGunShoot = function () {
        shoot_gun.currentTime = 0;
        shoot_gun.play();
    };
    Document_Control.prototype.playGunHit = function () {
        gun_hit.currentTime = 0;
        gun_hit.play();
    };
    return Document_Control;
}());
