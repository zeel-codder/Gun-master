const canvas: HTMLCanvasElement = document.querySelector('#canvas');

const ctx = canvas.getContext('2d');




const indexs: Point[] = []


const width: number = window.innerWidth;
const height: number = window.innerHeight;

canvas.width = width; canvas.height = height


const x: number = width / 2;
const y: number = height;


const person = new Player(x, y, 30, 'blue');
// indexs.push({ x, y })
person.draw();

window.addEventListener('click', (event: MouseEvent) => {

    const x: number = event.clientX;
    const y: number = event.clientY;

    console.log(x + " " + y);

    indexs.push({ x, y });

    const Project = new ProjectDot(x, y, 5, 'red', { x: 1, y: 1 })

    Project.draw();
})



function drawLines() {




    let i: number = 0;

    const inter = setInterval(() => {

        if (i === indexs.length - 2) {
            clearInterval(inter);
            return;
        }

        // console.log('call')


        ctx.beginPath();
        ctx.lineWidth = 5

        ctx.lineCap = "round";

        ctx.strokeStyle = "blue";
        ctx.moveTo(indexs[i].x, indexs[i].y);
        ctx.lineTo(indexs[i + 1].x, indexs[i + 1].y);
        ctx.stroke();
        i++;
    }, 500)

    console.log(indexs);

}







