const ctx = canvas.getContext('2d');


//canvas dimensions
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;
const Rockets = [];
const smallPartials=[];
const number = 10;
const r = 7;
const di=[1,-1,0];
const v = [{ x: 1, y: -1,in:0 }, { x: 0, y: -1,in:1 }, { x: -1, y: -1,in:2 }];



class Point {

    constructor(x, y, radius, color, velocity, factor) {

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color
        this.velocity = velocity;
        this.factor = factor;

    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {

        this.draw()
        this.x = this.x + this.factor * this.velocity.x;
        this.y = this.y + this.factor * this.velocity.y;

    }
}

class Rocket extends Point {
    constructor(x, y, radius, color, velocity, factor, endX, endY) {
        super(x, y, radius, color, velocity, factor);
        this.endX = endX;
        this.endY = endY;
    }
}


class SmallPoint extends Point{


    constructor(x, y, radius, color, velocity, factor){
        super(x, y, radius, color, velocity,factor);
        this.opacity=1;
    }

    update(){
        ctx.save()
        ctx.globalAlpha=this.opacity;
        this.opacity-=0.01;
        super.update();
        ctx.restore()
    }
}


function newRocket() {
    const x = Math.random() * (window.innerWidth-100) + 50;
    const y = window.innerHeight + 10;
    const color = "red"
    const radius = 10;
    const velocity = v[Math.floor(Math.random() * v.length)];
    const factor = Math.random()*3+1;
    const endX = Math.random() * (window.innerWidth-100) +50;
    const endY = Math.random() * (window.innerHeight -100 ) +50;

    return new Rocket(x,y,radius,color,velocity,factor,endX,endY);
}


function newSmallPoint(MyRocket) {
    const x=MyRocket.x;
    const y=MyRocket.y;
    const color = "yellow"
    const radius = Math.random() * r + 3;
    const velocity = {
        x:di[Math.floor(Math.random() * di.length)],
        y:di[Math.floor(Math.random() * di.length)]
    };
    const factor=Math.random()*3+1;

    return new SmallPoint(x,y,radius,color,velocity,factor);
}

function isOut(MyRocket){

    let f=false;

    if(MyRocket.in==0){
        f= MyRocket.y<=MyRocket.endY && MyRocket.x>=MyRocket.endX;
    }else if(MyRocket.in==1){
        f= MyRocket.y<=MyRocket.endY;
    }else{   
        f=  MyRocket.y<=MyRocket.endY && MyRocket.x<=MyRocket.endX;
    }

    if(f) return f;

    return MyRocket.x<=0 || MyRocket.x>=window.innerWidth || MyRocket.y<=0;
}


// [0,1], [-1,1] ,[1 , -1]
function init() {
    for (let i = 0; i < number; i++) {
        Rockets.push(newRocket());
    }
    
    
    animate();
    
}




function animate() {

    animateId = requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0,0,0,0.4)"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    Rockets.forEach((MyRocket,index)=>{
        MyRocket.update();

        if(isOut(MyRocket)){

            for(let i=0;i<Math.floor(Math.random() * r + 10);i++){
                smallPartials.push(newSmallPoint(MyRocket));
            }
         
            Rockets.splice(index,1);
        }
    });

    smallPartials.forEach((Point, index) => {

        Point.update();
        if (Point.opacity <= 0) {
            smallPartials.splice(index, 1);
        }

    })

    if(Rockets.length<number){

        for(let i=Rockets.length;i<=number;i++){
            Rockets.push(newRocket());
        }
    }

    
    // console.log(smallPartials)




}


init();