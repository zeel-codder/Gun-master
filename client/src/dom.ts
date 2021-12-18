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
const shoot: HTMLAudioElement = document.querySelector('#bg')
const shoot_gun: HTMLAudioElement = document.querySelector('#Shoot')
const gun_hit: HTMLAudioElement = document.querySelector('#gun')
const BoxMain: HTMLDivElement = document.querySelector('.center')
const Tutorial: HTMLDivElement = document.querySelector('.tutorial')
const MyNameResult: HTMLParagraphElement = document.querySelector('#Player')
const NumberOfPlayers: HTMLParagraphElement = document.querySelector("#total");


class Document_Control{


    //Enemy 
    setEnemyScore(value:number){
        EnemyScore.innerHTML = "" + value;
    }
    setEnemyScoreName(enemy:string){
        EnemyName.innerHTML = "" + enemy;
    }

    showEnemyScoreBox(){
        EnemyBoxS.classList.remove("none")
    }
    setEnemyName(name:string){
        Tem_Input_Enemy.innerHTML = "" + name;
    }

    setInput_Enemy(name:string){
        Input_Enemy.value=name;
    }

    removeEnemyBox(){
        EnemyBox.classList.add('none')
        console.log(new Error().stack);
    }

    showEnemyBox(){
        EnemyBox.classList.remove('none')
    }


    //User

    setMyName(name:string){
        Input_Name_p.innerHTML = "" + you;
    }
    setMyScore(value:number){
        btn.innerHTML = ""+value;
    }
    

    //Result
    setResult(value:string){
        Result.innerHTML = value;
    }
    setMyResult(me:string,enemy:string){
        MyNameResult.innerHTML = me + " " + "vs" + " " + enemy;
    }


    setNumberOfPlayer(value:number){
        NumberOfPlayers.innerHTML="" + value;
    }
  

    //ScoreBox
    removeShow_Score(){

        
        Show_Score.classList.add('none')

        // console.log('call remove')
        // console.trace()
        // console.log(new Error().stack);


    }
    
    showShow_Score(){
        Show_Score.classList.remove('none')
        console.log('call show')
        // console.trace()
        // console.log(new Error().stack);


        // throw('Error')
    }
    isShowScoreDisplay(){
        return !Show_Score.classList.contains('none');
    }


    //PlayBox

    removePlayBox(){
        PlayBox.classList.add('none')
    }
    showPlayBox(){
        PlayBox.classList.remove('none')
    }

    isPlayBoxDisplay(){
        return !PlayBox.classList.contains('none')
    }

    //WaitBox

    isWaitBoxDisplay(){
        return !WaitBox.classList.contains('none');
    }

    showWaitBox(){
        WaitBox.classList.remove('none')
    }


    removeWaitBox(){
        WaitBox.classList.add('none')
    }

    removeNameBox(){
        NameBox.classList.add('none')
    }
    showNameBox(){
        NameBox.classList.remove('none')
    }

    //Tutorial
    showTutorial(){
        Tutorial.classList.remove('none')
    }
    removeTutorial(){
        Tutorial.classList.add('none')
    }

   

    //Load
    isLoadDisplay(){
        return !Load.classList.contains('none');
    }

    showLoad(){
        Load.classList.remove('none');
        console.log(new Error().stack);

    }

    removeLoad(){
        Load.classList.add('none');
        console.log(new Error().stack);

    }

    //Game
    startGestsGame(){

        Show_Score.classList.add('none');
        NameBox.classList.remove('none');
        btn.innerHTML = "0";

    }

    startMutGame(){

        Show_Score.classList.add('none');
        EnemyBox.classList.remove('none');
        EnemyBoxS.classList.add('none')
        PlayBox.classList.add('none')
        btn.innerHTML = "0";

    }

    ToggleLoad() {
        Load.classList.toggle('none')
        // console.log()
        console.log(new Error ().stack);

    }

    //music

    playGunShoot()
    {
        shoot_gun.currentTime=0
        shoot_gun.play()
    }

    playGunHit()
    {
        gun_hit.currentTime=0
        gun_hit.play()
    }
}
