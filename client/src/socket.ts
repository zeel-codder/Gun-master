let you: string = "";
let enemy: string = "";
let tem: string = "";
let RoomId: string = "";
let EnemyEndPoint: number = -1;
let GestsPlay: boolean = false;


const dom = new Document_Control();






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
    dom.setEnemyScore(value)
});




socket.on('All', (to: string, form: string) => {

    console.log(to, you, to == you)
    if (to == you) {
        tem = form;

        dom.setEnemyName(form);
        dom.removeEnemyBox();
        if (!dom.isShowScoreDisplay()) {
            dom.removeShow_Score()
        }
        dom.showPlayBox()

        setTimeout(() => {

            if (enemy != form) {
                NotAccepted();
            }

        }, 10000)
    }
});



socket.on("EnterRoom", (roomId: string, to: string, form: string) => {
    RoomId = roomId;
    // console.log('room',to,form)
    if (to == you || form == you) {
        dom.removeEnemyBox();
        dom.showEnemyScoreBox()
        dom.setEnemyScoreName(enemy);
        if (dom.isLoadDisplay()) {
            dom.removeLoad()
        }
        socket.emit('JoinRoom', RoomId, you)
        Start()

    }
})


socket.on('TotalPlayerChange', (total: number) => {


    dom.setNumberOfPlayer(total);

})



socket.on("YourEnd", (roomId: string, value: number, score: number) => {
    EnemyEndPoint = value;
    ShowResult(score)
})

socket.on("EnemyMathEnd", (roomId: string, value: number) => {
    EnemyEndPoint = value;
    console.log(score, EnemyEndPoint)
    if (score > EnemyEndPoint) {
        socket.emit("MathEndBoth", roomId, score, EnemyEndPoint);
        // ShowResult(score);
    }else{
        if(dom.isShowScoreDisplay()){
           dom.removeShow_Score()
        }
        dom.showWaitBox()
    }
})

function Home() {
    dom.playGunShoot()

    if (GestsPlay) {
        dom.startGestsGame();
        score = 0;
    } else {
        dom.startMutGame();
        score = 0;
        EnemyEndPoint = -1;
        enemy = "";
        tem = "";
        RoomId = "";
        EnemyEndPoint = -1;
    }
    GestsPlay = false;
    dom.setInput_Enemy('')


}


function ShowResult(score: number) {
    if (dom.isPlayBoxDisplay()) {

        dom.removePlayBox()

    }


    if (dom.isLoadDisplay()) {
        dom.removeLoad()
    }
    if (EnemyEndPoint < score) {
        dom.setResult("You Win")
    } else if (EnemyEndPoint > score) {
        dom.setResult("You Loss")
    } else {
        dom.setResult("Match Draw")
    }
    if (dom.isWaitBoxDisplay()) {
        dom.removeWaitBox();
    }
    dom.showShow_Score()
    if (dom.isLoadDisplay()) {
        dom.ToggleLoad();
    }

    dom.setMyResult(you, enemy);

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

    dom.ToggleLoad()
    dom.removeShow_Score()
    dom.showWaitBox()


    socket.emit("MathEnd", RoomId, score);


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
    dom.setMyScore(0);
    dom.setEnemyScore(0);
    dom.playGunShoot()

    if (dom.isShowScoreDisplay()) {

        dom.removeShow_Score();

    }

    enemy = Input_Enemy.value;
    if (enemy == null || enemy.length == 0) return;
    dom.ToggleLoad()
    socket.emit(
        "UserFindAndJoin",
        enemy,
        you,
        (type: string) => {

            //console.log(type)

            ResponseEvent(type, () => {

                dom.removePlayBox();

                dom.showEnemyBox();

            })


        })

}

function AddUser() {
    you = Input_Name.value;
    dom.playGunShoot()
    //console.log(name)
    if (you == null || you.length == 0) return;
    dom.ToggleLoad()
    socket.emit('AddUser', you,
        (type: string) => {

            ResponseEvent(type, () => {

                Input_Name_p.innerHTML = "" + you;

                dom.removeNameBox()
                dom.showEnemyBox();

            })
        })
}

function ResponseEvent(type: string, callback: Function) {

    dom.ToggleLoad();

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
    dom.setMyScore(0);
    dom.setEnemyScore(0);
    socket.emit('ChallengeAccepted', you, enemy);
    dom.removePlayBox();
    dom.setInput_Enemy('')
    dom.playGunShoot()
    if (!dom.isLoadDisplay()) {
        dom.showLoad()
    }
}

function NotAccepted() {

    dom.removePlayBox()
    dom.showEnemyBox()
    socket.emit('ChallengeAcceptedNotExcepted', you, tem);
    tem = ""
    dom.setInput_Enemy('')
    dom.playGunShoot()

}


function ToggleTutorial() {
    NameBox.classList.toggle('none')
    Tutorial.classList.toggle('none')
    dom.playGunShoot()
}






 function Reload() {
    dom.playGunShoot()
    window.location.reload();
}

dom.ToggleLoad()
