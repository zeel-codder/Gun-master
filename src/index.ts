const canvas: HTMLCanvasElement = document.querySelector('#canvas');

const ctx = canvas.getContext('2d');
const btn = document.querySelector('#p')




const width: number = window.innerWidth;
const height: number = window.innerHeight;
canvas.width = width;
canvas.height = height
const p_x: number = width / 2;
const p_y: number = height; let score: number = 0;


let ProjectPoints: ProjectDot[] = []
let Enemys: Enemy[] = [];
const person = new Player(p_x, height, 30, 'blue');
const color: string[] = ['red', 'white', 'yellow', 'green']
let shot_max: boolean = false;
let enemy_loop:any=0;
let start:boolean =false;





function AddPoint(event: MouseEvent) {
    const index: number = Math.floor(Math.random() * color.length);

    const x: number = event.clientX - p_x;
    const y: number = event.clientY - p_y;
    const angle = Math.atan2(y, x);
    const Project = new ProjectDot(p_x, p_y, 5, color[index],
        { x: Math.cos(angle), y: Math.sin(angle) }, 4)
    //  console.log(Project);
    if(start){
        ProjectPoints.push(Project);
    }else{
        start=true;
    }
}


function Start() :void{
// for make the gun shot
window.addEventListener('click', AddPoint)


//enemy Started

enemy_loop=setInterval(() => {

    const radius: number = Math.random() * (30 - 10) + 10;

    const index: number = Math.floor(Math.random() * color.length);
    // const color



    let x: number;
    let y: number;


    x = width * Math.random();
    y = 0 - radius


    const x1: number = p_x - x;
    const y2: number = p_y - y;
    const angle = Math.atan2(y2, x1);
    const speed: velocity = {

        y: Math.sin(angle),
        x: Math.cos(angle)

    }

    const factor:number=Math.random()<0.1?
                        score>50?
                        4
                        : 
                        2
                        :
                        Math.random()<0.5?
                        3
                        :
                        1;

    Enemys.push(new Enemy(x, y, radius, color[index], speed,factor))

    // console.log(Enemys, ProjectPoints)
}, 1000)
// call for gun hoot
animate()

}

// console.log('call')

function animate(): void {

    // console.log(ProjectPoints)
    requestAnimationFrame(animate);
    ctx.fillStyle="rgba(0,0,0,0.4)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    person.draw();
    ProjectPoints.forEach((point,index) => {
        point.update();

        const isOut:boolean = point.x+point.radius<0 
                              || 
                              point.x-point.radius > width
                              ||
                              point.y+point.radius<0

            if (isOut) {
                setTimeout(() => {

                   

                    ProjectPoints.splice(index, 1);
                
                })
            }
    })

    Enemys.forEach((e, index1) => {
        e.update()

        ProjectPoints.forEach((point, index2) => {

            const diff = Math.hypot(point.x - e.x, point.y - e.y) - point.radius - e.radius;

            if (diff < 1) {
                setTimeout(() => {

                    score++;
                    btn.innerHTML = "" + score;

                    ProjectPoints.splice(index2, 1);

                    if(e.radius-10>10){
                        e.radius-=10;
                    }else{

                        Enemys.splice(index1, 1);
                    }
                })
            }
        })

        const diff = Math.hypot(p_x - e.x, p_y - e.y) - 30 - e.radius;

        if (diff < 1) {
            setTimeout(() => {
                alert(`Game End score=${score}`)
                ReSet();
            }) 
            return;
        }


    })

}

function ReSet() :void{
    Enemys=[];
    ProjectPoints=[];
    score=0;
    btn.innerHTML = "" + score;
    window.removeEventListener('click', AddPoint)
    if(enemy_loop!=0){

        clearInterval(enemy_loop)
    }
    start=false;
}






