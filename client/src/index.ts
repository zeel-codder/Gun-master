
const canvas: HTMLCanvasElement  = document.querySelector('#canvas');
const btn: HTMLButtonElement = document.querySelector('#p')
const btn_ans: HTMLButtonElement = document.querySelector('#p2')
const shoot: HTMLAudioElement = document.querySelector('#Shoot')
const tutorial: HTMLDivElement=document.querySelector('.center')
// const Show_Score:HTMLDivElement=document.querySelector('.score')


const ctx:any = canvas.getContext('2d');


//canvas dimensions
const width: number = window.innerWidth;
const height: number = window.innerHeight;
canvas.width = width;
canvas.height = height
const p_x: number = width / 2;
const p_y: number = height; let score: number = 0;
let animateId:number =0;




let ProjectPoints: ProjectDot[] = []
let Enemys: Enemy[] = [];
let person = new Player(p_x, height, 30, 'blue');
let Particals: SmallPoint[] = [];


const color: string[] = ['red', 'white', 'yellow', 'green']
let shot_max: boolean = false;
let enemy_loop: any = 0;
let start: boolean = false;



/*
Functions is User for generator Bullet based on user click
*/




function AddPoint(event: MouseEvent) {
    // console.log(event);
    // if(event.isTrusted=="Enter") return;
    const index: number = Math.floor(Math.random() * color.length);

    const x: number = event.clientX - person.x;
    const y: number = event.clientY - person.y;
    const angle = Math.atan2(y, x);
    const Project = new ProjectDot(person.x, person.y, 7, color[index],
        { x: Math.cos(angle), y: Math.sin(angle) }, 4)

    //  console.log(Project);
    if (start) {
        // shoot.currentTime=0;
        // shoot.play()
        ProjectPoints.push(Project);
    } else {
        start = true;
    }
    console.log('call1')
}

/*
Functions is User for generator Bullet To Top
*/

function AddPointUp(event: KeyboardEvent) {

    // console.log(event);
    const key: string = event.key;
    if (key == 'Enter') return;

    const nu: number = 6;
    console.log(key)

    if (event.shiftKey || key == "ArrowUp") {

        const index: number = Math.floor(Math.random() * color.length);

        const x: number = person.x;
        const y: number = person.y;

        const Project = new ProjectDot(person.x, person.y, 5, color[index],
            { x: 0, y: -1 }, 4)
        //  console.log(Project);
        if (start) {

            if (Math.random() < .3 || key == "ArrowUp") {
                // shoot.currentTime=0;
                // shoot.play()
                ProjectPoints.push(Project);
            }
        } else {
            start = true;
        }
    }


    if (key == "ArrowLeft") {
        if (person.x - nu >= person.radius) {
            person.x -= nu;
        } else {
            person.x = person.radius;
        }
    } else if (key == "ArrowRight") {
        if (person.x + nu <= width - person.radius) {
            person.x += nu;
        } else {
            person.x = width - person.radius;
        }
    }
    // console.log('call')
}








// console.log('call')

/***
 * Functions is User to make the all change in our person and enemy
 */

function animate(): void {

    // console.log(ProjectPoints)
    animateId=requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0,0,0,0.4)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    person.draw();
    ProjectPoints.forEach((point, index) => {
        point.update();

        const isOut: boolean = point.x + point.radius < 0
            ||
            point.x - point.radius > width
            ||
            point.y + point.radius < 0

        if (isOut) {
           
                ProjectPoints.splice(index, 1);
         
        }
    })

    Enemys.forEach((e, index1) => {
        e.update()



        const isOut: boolean = e.y - e.radius > height;

        if (isOut) {
          
                Enemys.splice(index1, 1);
           


        } else {

            ProjectPoints.forEach((point, index2) => {

                const diff = Math.hypot(point.x - e.x, point.y - e.y) - point.radius - e.radius;

                if (diff < 1) {
                    setTimeout(() => {


                        ProjectPoints.splice(index2, 1);

                        if (e.radius - 10 > 10) {

                            score=score+Math.floor(e.radius)-10;
                            btn.innerHTML = "" + score;
                            SendMyScore(score);
                            if(EnemyEndPoint!=-1 && EnemyEndPoint<score){
                                ReSet()
                                ShowResult(score);
                            }

                            for (let i = 0; i < Math.random() * (e.radius + 10); i++) {
                                Particals.push(

                                    new SmallPoint(
                                        e.x,
                                        e.y,
                                        5 * Math.random(),
                                        e.color,
                                        {
                                            x: (Math.random() - 0.5) * (Math.random() * 10),
                                            y: (Math.random() - 0.5) * (Math.random() * 10),
                                        }

                                    )

                                )
                            }


                            e.radius -= 10;
                        } else {

                        score=score+Math.floor(e.radius);
                        btn.innerHTML = "" + score;
                        SendMyScore(score)

                            Enemys.splice(index1, 1);
                        }
                    })
                }
            })




            const diff = Math.hypot(person.x - e.x, person.y - e.y) - person.radius - e.radius;

            if (diff < 1) {
                setTimeout(() => {
                    if(start){
                        YourMathEnd(score)
                        if(EnemyEndPoint!=-1){

                            ShowResult(score)

                        }
                        ReSet();

                    }
                })
                return;
            }
        }


    });

    Particals.forEach((Point, index) => {

        Point.update();
        if (Point.opacity <= 0) {
            Particals.splice(index, 1);
        }

    })

}





function Start(): void {
    // for make the gun shot

    if(!tutorial.classList.contains('none')){

        tutorial.classList.add('none')
    }

    if(! Show_Score.classList.contains('none')){

        Show_Score.classList.add('none')

    }


    shoot.loop = true;
    shoot.play()

    // window.addEventListener('ArrowLeft', AddPointUp);
    window.addEventListener('keydown', AddPointUp);
    window.addEventListener('mousedown', AddPoint)


    //enemy Started

    enemy_loop = setInterval(() => {

        let max:number =score/1000+1;
        


        for(let i=0;i<max;i++){

        

        const radius: number = Math.random() * (40 - 10) + 10;

        const index: number = Math.floor(Math.random() * color.length);
        // const color

        let x: number;
        let y: number;


        const po: number = Math.random();
        if (po < .5) {
            x = width * Math.random();
            y = 0 - radius;
        } else if (po >= .5 && po < 0.7) {

            x = 0 - radius;
            y = (height - person.radius) * Math.random();

        } else {
            x = width + radius;
            y = (height - person.radius) * Math.random();

        }



        const speed: velocity = {

            y: 1,
            x: 0

        }

        if (Math.random() < .5) {


            const x1: number = person.x - x;
            const y1: number = person.y - y;
            const angle = Math.atan2(y1, x1);

            speed.x = Math.cos(angle)
            speed.y = Math.sin(angle)
        }


        const factor: number =
            Math.random() < 0.1
                ?
                score > 50
                    ?
                    
                   score>100?
                    5
                    :
                    3
                    :
                    score>100?
                    4
                    :
                    2
                :
                Math.random() < 0.5
                    ?
                    2
                    :
                    1;

        Enemys.push(new Enemy(x, y, radius, color[index], speed, factor))

        // console.log(Enemys, ProjectPoints)
    }
    }, 1500)
    // call for gun hoot
    animate()

}



function ReSet(): void {
    btn_ans.innerHTML=""+score;
    tutorial.classList.remove("none")
    if(WaitBox.classList.contains("none")){
        Show_Score.classList.remove('none')
    }
    cancelAnimationFrame(animateId)
    Enemys = [];
    ProjectPoints = [];
    Particals = []
    // score = 0;
    ctx.clearRect(0,0,canvas.width,canvas.height)
    // ctx.clearRect()
    shoot.pause()
    btn.innerHTML = "" + score;
    window.removeEventListener('mousedown', AddPoint);
    window.removeEventListener('keydown', AddPointUp);
    clearInterval(enemy_loop)
    // person = new Player(p_x, height, 30, 'blue');
    start = false;
}






