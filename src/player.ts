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

    constructor(x: number, y: number, radius, color) {

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;

    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}



class ProjectDot {

  

    x: number;
    y: number;
    radius: number;
    color: string;
    velocity:velocity;

    constructor(x: number, y: number, radius, color,velocity) {

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;

    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(){

        this.draw()
        this.x-this.x+this.velocity.x;
        this.y-this.y+this.velocity.y;

    }

    
}

