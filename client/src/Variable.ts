interface velocity {

    x:number;
    y:number;

}

interface Point{
    x:number;
    y:number;
}

class Player {
    x: number;
    y: number;
    radius: number;
    color: string;
    factor:number;

    constructor(x: number, y: number, radius:number, color:string) {

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.factor=1

    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}



class ProjectDot extends Player{

  

  
    velocity:velocity;

    constructor(x: number, y: number, radius :number, color :string,velocity :velocity,factor:number=1) {

        super(x, y, radius, color)
        this.velocity = velocity;
        this.factor=factor;

    }

    update(){

        this.draw()
        this.x=this.x+ this.factor*this.velocity.x;
        this.y=this.y+ this.factor*this.velocity.y;

    }
}

class Enemy extends ProjectDot{

    constructor(x: number, y: number, radius :number, color :string,velocity :velocity,factor :number=1){
        super(x, y, radius, color, velocity,factor);
    }

}


class SmallPoint extends Enemy{

    opacity: number;


    constructor(x: number, y: number, radius:number, color:string, velocity:velocity, factor:number=1){
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
