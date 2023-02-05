
let canvas /**@type {HTMLCanvasElement} */=document.querySelector('#hello');
let display=canvas.getContext('2d');
let width=canvas.width;
let height=canvas.height;

class Canvas {
    constructor(board)
    {
        this.board=board;
        this.balls=[];
        this.score=0;
        this.trail=0.1; //lower=longer trail
        this.interval=120; //as in fps
    } 


    drawball(ball) {

        this.board.beginPath();
        this.board.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        this.board.closePath();
        this.board.fillStyle = ball.color;
        this.board.fill();
      }

      levelmodifier(score)
      {
                    
                     this.trail=0.04;
                    

        if(score<=10)
        {
            this.board.clearRect(0,0,width,height);
        }
        if(score>10)
        {
            this.board.fillStyle=`rgba(255,0,0,${this.trail}`;
            this.board.fillRect(0,0,width,height);

             if(score>20)
             {  
                if(score<50||score>60)
                {
                    for(let i=0;i<(this.balls.length-1);i++)
                {
                    for(let j=i+1;j<this.balls.length;j++)
                    {
                        resolveCollision(this.balls[i],this.balls[j]);
                    }
                }  
                 } 
                    
                if(score>30)
                 {
                     this.trail=0.01;
                    
                     if(score>40)
                         {
                            setInterval(()=>{this.interval=Math.random()*Math.random()*30},2000);
                         }
                 }
             }
        }   
    }
    update()
    { 
        this.levelmodifier(this.score);

        this.balls.forEach((e)=>
        {
        e.x+=e.velocity.x;
        e.y+=e.velocity.y;
        e.wallcollision();
        this.drawball(e);
        });

        this.board.beginPath();
        this.board.strokeStyle="black";
        this.board.font="30px Georgia";
        this.board.strokeText(String(this.balls.length),40,40);
        this.board.closePath();
     
    }


  }

  function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
}

  function resolveCollision(particle, otherParticle) {
    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

if(Math.sqrt(xDist*xDist+yDist*yDist)<(particle.radius+otherParticle.radius))
   { const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;



    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m2 - m1) / (m1 + m2) + u1.x * 2 * m1 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}
}



class Ball{
    constructor(x,y,r,dx,dy,color='white',mass=2)
    {
        this.x=x;
        this.y=y;
        this.radius=r;
        this.velocity={x:dx,y:dy};
        this.color=color;
        this.mass=mass;
    }

    wallcollision()
    {
        if((this.x+this.radius)>width && this.velocity.x>0 )
        {
            this.velocity.x*=(-1);
        }

        if( (this.x-this.radius)<0 && this.velocity.x<0)
        {
            this.velocity.x*=(-1);
        }

        if((this.y+this.radius)>height && this.velocity.y>0)
        {  
            this.velocity.y*=(-1);
        }
        if((this.y-this.radius)<0 && this.velocity.y<0)
        { 
            this.velocity.y*=(-1);
        }
    }
}

let board= new Canvas(display);
let multiplier=5;
canvas.addEventListener('click',
(e)=>
{
    let m=getRandomInRange(1.5,4.8);
    let v=multiplier/m;
    let vx=getRandomInRange(0,v);
    let vy=getRandomInRange(0,2)<1?Math.sqrt(v*v-vx*vx):(-Math.sqrt(v*v-vx*vx));
    vx*=getRandomInRange(0,2)<1?(-1):(1);
    board.balls.push(new Ball(e.offsetX,e.offsetY,Math.sqrt(m)*30,vx,vy,'white',m));
    multiplier+=board.score>5?0.1:0.05;
    board.score++;
}
)


let counter=8;


let update = function() {
    test=0;
    if(board.score>40)
    {test=5;
    counter=(Math.random()*1000)<test?(Math.random()*1200):((Math.random()*1000)>300?0:8);
    }

    board.update();
    setTimeout(update, counter);
}
setTimeout(update, counter);


function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }