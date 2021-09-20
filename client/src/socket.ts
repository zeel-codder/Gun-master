let you: string = "";
let enemy: string = "";
let tem: string = "";
let RoomId: string = "";
let EnemyEndPoint: number = -1;
let GestsPlay: boolean = false;

const Input_Name: HTMLInputElement = document.querySelector("#name")
const Input_Name_p: HTMLParagraphElement = document.querySelector("#you")
const Input_Enemy: HTMLInputElement = document.querySelector("#enemy")
const Load: HTMLImageElement = document.querySelector(".load")
const Message: HTMLParagraphElement = document.querySelector(".red")
const EnemyName: HTMLSpanElement = document.querySelector("#Ename")
const EnemyScore: HTMLSpanElement = document.querySelector("#pe")
const Result: HTMLHeadingElement = document.querySelector("#result")
const EnemyBoxS: HTMLDivElement = document.querySelector(".right")
const WaitBox: HTMLDivElement = document.querySelector(".Wait")
const Tem_Input_Enemy: HTMLInputElement = document.querySelector("#EnemyName")
const NameBox: HTMLDivElement = document.querySelector('.name_container')
const EnemyBox: HTMLDivElement = document.querySelector('.enemy_container')
const PlayBox: HTMLDivElement = document.querySelector('.PlayBox')
const Show_Score: HTMLDivElement = document.querySelector('.score')
const canvas: HTMLCanvasElement = document.querySelector('#canvas');
const btn: HTMLSpanElement = document.querySelector('#p')
const btn_ans: HTMLHeadingElement = document.querySelector('#p2')
const shoot: HTMLAudioElement = document.querySelector('#Shoot')
const BoxMain: HTMLDivElement = document.querySelector('.center')
const Tutorial: HTMLDivElement = document.querySelector('.tutorial')
const MyNameResult: HTMLParagraphElement = document.querySelector('#Player')
const NumberOfPlayers: HTMLParagraphElement = document.querySelector("#total");






// var socket = io("http://localhost:3000/");
var socket = io("https://gameshoot123.herokuapp.com");


socket.on("UserRefuse", (to: string) => {
    //console.log(to, 123)
    if (to == you) {
        ResponseEvent("User Not youWant to play With ", () => { })
    }
})



socket.on("UpdateScore", (to: string, value: number) => {
    //console.log('callfind')
    EnemyScore.innerHTML = "" + value
});




socket.on('All', (to: string, form: string) => {

    //console.log(to, name, to == name)
    if (to == you) {
        tem = form;

        Tem_Input_Enemy.innerHTML = "" + form;
        EnemyBox.classList.add('none')
        if (!Show_Score.classList.contains('none')) {

            Show_Score.classList.add('none')

        }
        PlayBox.classList.remove('none')
    }
});



socket.on("EnterRoom", (roomId: string, to: string, form: string) => {
    RoomId = roomId;
    // console.log('room',to,form)
    EnemyBox.classList.add("none")
    if (to == you || form == you) {
        EnemyBoxS.classList.remove("none")
        EnemyName.innerHTML = "" + enemy;
        if (Load.classList.contains('none')) {
            Load.classList.remove('none')
        }
        socket.emit('JoinRoom', RoomId, you)
        Start()
        
    }
})


socket.on('TotalPlayerChange', (total: number) => {

    NumberOfPlayers.innerHTML = "" + total;

})



socket.on("YourEnd", (roomId: string, value: number, score: number) => {
    EnemyEndPoint = value;
    ShowResult(score)
})

socket.on("EnemyMathEnd", (roomId: string, value: number) => {
    EnemyEndPoint = value;
    console.log(score,EnemyEndPoint)
    if (score > EnemyEndPoint) {
        ShowResult(score);
    }
})

function Home() {

    if (GestsPlay) {
        Show_Score.classList.add('none');
        NameBox.classList.remove('none');
        btn.innerHTML = "0";
        score = 0;
    } else {
        Show_Score.classList.add('none');
        EnemyBox.classList.remove('none');
        EnemyBoxS.classList.add('none')
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


function ShowResult(score: number) {
    if (! Load.classList.contains('none')) {
        Load.classList.add('none')
    }
    if (EnemyEndPoint < score) {
        Result.innerHTML = "You Win"
    } else if (EnemyEndPoint > score) {
        Result.innerHTML = "You Loss"
    } else {
        Result.innerHTML = "Match Draw"
    }
    if (!WaitBox.classList.contains('none')) {
        WaitBox.classList.add('none')
    }
    Show_Score.classList.remove('none')
    if (!Load.classList.contains('none')) {
        ToggleLoad();
    }
    MyNameResult.innerHTML = you + " " + "vs" + " " + enemy;
    socket.emit("MathEndBoth", RoomId, score, EnemyEndPoint);
    socket.emit("Left-Room", RoomId, you);
    SendMyScore(score)
}


function SendMyScore(value: number) {
    //console.log('callsend')

    socket.emit("ScoreChanged", RoomId, you, value)
}

function YourMathEnd(score: number) {
    // console.log('End')

    ToggleLoad()
    WaitBox.classList.remove('none')

    socket.emit("MathEnd", RoomId, score);


}


function ToggleLoad() {
    Load.classList.toggle('none')
}

function display(data: string) {
    Message.innerHTML = "" + data;
    setTimeout(

        () => Message.innerHTML = ""
        ,
        3000
    )
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

        Show_Score.classList.add('none')

    }

    enemy = Input_Enemy.value;
    if (enemy == null || enemy.length == 0) return;
    ToggleLoad()
    socket.emit(
        "UserFindAndJoin",
        enemy,
        you,
        (type: string) => {

            //console.log(type)

            ResponseEvent(type, () => {

                PlayBox.classList.add('none')
                EnemyBox.classList.remove('none');

            })


        })

}

function AddUser() {
    you = Input_Name.value;
    //console.log(name)
    if (you == null || you.length == 0) return;
    ToggleLoad()
    socket.emit('AddUser', you,
        (type: string) => {

            ResponseEvent(type, () => {

                Input_Name_p.innerHTML = "" + you;
                NameBox.classList.add('none')
                EnemyBox.classList.remove('none')
            })
        })
}

function ResponseEvent(type: string, callback: Function) {

    ToggleLoad();

    if (!type) {
        callback()
    } else {
        display(type)
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

    PlayBox.classList.add('none')
    EnemyBox.classList.remove('none');
    socket.emit('ChallengeAcceptedNotExcepted', you, tem);
    tem = ""

}



function ToggleTutorial() {
    NameBox.classList.toggle('none')
    Tutorial.classList.toggle('none')
}


function Reload(){
    window.location.reload();
}

ToggleLoad()
