const canvas: HTMLCanvasElement = document.querySelector('#canvas');

const ctx = canvas.getContext('2d');
const btn=document.querySelector('#p')




const width: number = window.innerWidth;
const height: number = window.innerHeight;
canvas.width = width;
canvas.height = height
const p_x: number = width / 2;
const p_y: number = height;let score :number=0;


const ProjectPoints: ProjectDot[] = []
const Enemys: Enemy[] = [];
const person = new Player(p_x, height, 30, 'blue');
const color: string[] = ['red', 'black', 'yellow','green']
let shot_max: boolean = false;

// for make the gun shot
window.addEventListener('click', AddPoint)



function AddPoint(event: MouseEvent) {
    const index: number = Math.floor(Math.random() * color.length);

    const x: number = event.clientX - p_x;
    const y: number = event.clientY - p_y;
    const angle = Math.atan2(y, x);
    const Project = new ProjectDot(p_x, p_y, 5, color[index],
        { x: Math.cos(angle), y: Math.sin(angle) },4)
    //  console.log(Project);
   
        ProjectPoints.push(Project);
    

}






//enemy Started

setInterval(() => {

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

    Enemys.push(new Enemy(x, y, radius, color[index], speed))

    // console.log(Enemys, ProjectPoints)





}, 1000)



function animate(): void {

    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    person.draw();
    ProjectPoints.forEach((point) => {
        point.update();
    })

    Enemys.forEach((e,index1) => {
        e.update()

        ProjectPoints.forEach((point,index2)=>{

            const diff=Math.hypot(point.x-e.x,point.y-e.y) -point.radius-e.radius;

            if(diff<1){
                setTimeout(()=>{

                    score++;
                    btn.innerHTML=""+score;

                    ProjectPoints.splice(index2,1);
                    Enemys.splice(index1,1);
                })
            }
        })
    })

}
// call for gun hoot
animate()





