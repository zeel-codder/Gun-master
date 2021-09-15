const canvas: HTMLCanvasElement = document.querySelector('#canvas');
const btn :HTMLButtonElement = document.querySelector('#p')
const shoot :HTMLAudioElement =document.querySelector('#Shoot')



const ctx = canvas.getContext('2d');


const width: number = window.innerWidth;
const height: number = window.innerHeight;
canvas.width = width;
canvas.height = height
const p_x: number = width / 2;
const p_y: number = height; let score: number = 0;



let ProjectPoints: ProjectDot[] = []
let Enemys: Enemy[] = [];let person = new Player(p_x, height, 30, 'blue');
const color: string[] = ['red', 'white', 'yellow', 'green']
let shot_max: boolean = false;
let enemy_loop: any = 0;
let start: boolean = false;





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

function AddPointUp(event: KeyboardEvent) {

    // console.log(event);
    const key: string = event.key;

    const nu:number =6;
    console.log(key)

    if (event.shiftKey || key=="ArrowUp") {

        const index: number = Math.floor(Math.random() * color.length);

        const x: number = person.x;
        const y: number = person.y;

        const Project = new ProjectDot(person.x, person.y, 5, color[index],
            { x: 0, y: -1 }, 4)
        //  console.log(Project);
        if (start) {
            
            if(Math.random()<.3 || key=="ArrowUp" ){
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
        }else{
            person.x = person.radius;
        }
    } else if (key == "ArrowRight") {
        if (person.x + nu<= width-person.radius) {
            person.x += nu;
        }else{
            person.x =width- person.radius;
        }
    }
    // console.log('call')
}



function Start(): void {
    // for make the gun shot
    shoot.loop=true;
    shoot.play()

    // window.addEventListener('ArrowLeft', AddPointUp);
    window.addEventListener('keydown', AddPointUp);
    window.addEventListener('mousedown', AddPoint)


    //enemy Started

    enemy_loop = setInterval(() => {

        const radius: number = Math.random() * (30 - 10) + 10;

        const index: number = Math.floor(Math.random() * color.length);
        // const color



        let x: number;
        let y: number;


        x = width * Math.random();
        y = 0 - radius


        const speed: velocity = {

            y: 1,
            x: 0

        }

        const factor: number = Math.random() < 0.1 ?
            score > 50 ?
                4
                :
                2
            :
            Math.random() < 0.5 ?
                2
                :
                1;

        Enemys.push(new Enemy(x, y, radius, color[index], speed, factor))

        // console.log(Enemys, ProjectPoints)
    }, 1500)
    // call for gun hoot
    animate()

}

// console.log('call')

function animate(): void {

    // console.log(ProjectPoints)
    requestAnimationFrame(animate);

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
            setTimeout(() => {



                ProjectPoints.splice(index, 1);

            })
        }
    })

    Enemys.forEach((e, index1) => {
        e.update()

       

        const isOut: boolean = e.y-e.radius>height;

        if (isOut) {
            setTimeout(() => {
                Enemys.splice(index1, 1);
            })
          
            
        }else{

        ProjectPoints.forEach((point, index2) => {

            const diff = Math.hypot(point.x - e.x, point.y - e.y) - point.radius - e.radius;

            if (diff < 1) {
                setTimeout(() => {

                    score++;
                    btn.innerHTML = "" + score;

                    ProjectPoints.splice(index2, 1);

                    if (e.radius - 10 > 10) {
                        e.radius -= 10;
                    } else {

                        Enemys.splice(index1, 1);
                    }
                })
            }
        })
    



        const diff = Math.hypot(person.x - e.x, person.y - e.y) - person.radius - e.radius;

        if (diff < 1) {
            setTimeout(() => {
                alert(`Game End score=${score}`)
                ReSet();
            })
            return;
        }
    }


    })

}

function ReSet(): void {
    Enemys = [];
    ProjectPoints = [];
    score = 0;
    btn.innerHTML = "" + score;
    window.removeEventListener('mousedown', AddPoint)
    window.removeEventListener('keydown',AddPointUp);
    if (enemy_loop != 0) {

        clearInterval(enemy_loop)
    }
    person = new Player(p_x, height, 30, 'blue');
    start = false;
}






