let bgmusic= new Audio('./sound/bgmusic.wav');
bgmusic.loop=true;
let freezesound= new Audio("./sound/freeze.mp3");
let fastsound=new Audio("./sound/fast.mp3");
let entrysound = new Audio('./sound/entry.wav');
let bouncesound= new Audio('./sound/bounce.wav')
let gameoversound=new Audio('./sound/gameover.wav');
let bruh= new Audio('./sound/bruh.mp3');

// localStorage.clear();

let highscore=0;
if(Number(localStorage.highscore)>0)
{
    highscore=localStorage.highscore;
}


let menuscreen=document.getElementById('menu');
let gamescreen=document.getElementById('game');
let volume=100;

function animationplaybtn()
{   let playbtn=document.getElementById('playbtn');
    playbtn.style.transition='width 1.2s linear, height 1.2s linear, color 1s linear';
    playbtn.style.width='2500px';
    playbtn.style.color='rgba(0,0,0,0)'
    playbtn.style.height='2500px';
   setTimeout(() => {game();
    bgmusic.play();

   }, 1000); 
}


menu();

function menu(){
    let canvas= document.getElementById('bgcanvas');
    let board=canvas.getContext('2d');

class Canvas {
    constructor(board)
    {
        this.board=board;
        this.balls=[];
        this.strokeStyle='black';
     } 

    drawball(ball) {

        this.board.beginPath();
        this.board.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        this.board.closePath();
        this.board.strokeStyle=this.strokeStyle;
        this.board.lineWidth='5';
        this.board.stroke();
        this.board.fillStyle = ball.color;
        this.board.fill();
      }
    update()
    {   this.board.clearRect(0,0,window.innerWidth,window.innerHeight);
        this.balls.forEach((e)=>
        {
        e.x+=e.velocity.x;
        e.y+=e.velocity.y;
        e.wallcollision();
        this.drawball(e);
        });
    }
  }
class Ballz{
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
        if((this.x+this.radius)>window.innerWidth && this.velocity.x>0 )
        {
            this.velocity.x*=(-1);

        }

        if( (this.x-this.radius)<0 && this.velocity.x<0)
        {
            this.velocity.x*=(-1);
        }

        if((this.y+this.radius)>window.innerHeight && this.velocity.y>0)
        {  
            this.velocity.y*=(-1);
        }
        if((this.y-this.radius)<0 && this.velocity.y<0)
        { 
            this.velocity.y*=(-1);
        }
    }
}
let bg= new Canvas(board);

for(let i=0;i<highscore;i++)
{
    let randomy=Math.random()*window.innerHeight;
    let randomx=Math.random()*window.innerWidth;

    let m=getRandomInRange(1.5,4.8);
    let v=m;
    let vx=getRandomInRange(0,v);
    let vy=getRandomInRange(0,2)<1?Math.sqrt(v*v-vx*vx):(-Math.sqrt(v*v-vx*vx));
    vx*=getRandomInRange(0,2)<1?(-1):(1);
    let r=Math.sqrt(m)*Math.min(window.innerHeight, window.innerWidth)/20;

    let temp=new Ballz(randomx,randomy,r,vx-1,vy-1,'white',m); 
    bg.balls.push(temp);
}

let update = function() {
    bg.update();
    setTimeout(()=>{

    update();
        }, 10);
}

setTimeout(update, 10);


gamescreen.style.display='none';
menuscreen.style.display='inline';
let voldiv = document.getElementById('voldiv');
let volbtn = document.getElementById('volbtn');
let volslider= document.getElementById('volslider');


canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
volslider.value=100;
let txt=volslider.value==0? '&#128264': volslider.value>50?'&#128266':'&#128265';
volbtn.innerHTML=txt;
voldiv.addEventListener('mouseout' ,
()=>{

    volslider.style.transition='width linear 0.25s, opacity linear 0.25s';
    volslider.style.width='0px';
    volslider.style.opacity='0';
    volbtn.style.transition='font 0.25s linear, transform 0.25s linear'
    volbtn.style.fontSize='30px';
    volbtn.style.transform='translateX(-0%)';
    
});

['mouseover', 'click','focus'].forEach(function(event) { voldiv.addEventListener(event, ()=>{
       volslider.style.transition='width linear 0.25s, opacity linear 0.25s';
       volbtn.style.transition='font 0.25s linear, transform 0.25s linear'
       volbtn.style.fontSize='40px';
       volbtn.style.transform='translateX(30%)';

       volslider.style.width='100px';
       volslider.style.opacity='1';
   
   })});

 voldiv.addEventListener('mousemove', ()=>{
    let txt=volslider.value==0? '&#128264': volslider.value>50?'&#128266':'&#128265';
volbtn.innerHTML=txt;
volume=volslider.value;
});

voldiv.addEventListener('touchmove', ()=>{
let txt=volslider.value==0? '&#128264': volslider.value>50?'&#128266':'&#128265';
volbtn.innerHTML=txt;
volume=volslider.value;

});
}







function game(){
menuscreen.style.display='none';
gamescreen.style.display='inline';
let canvas /**@type {HTMLCanvasElement} */=document.querySelector('#hello');
let display=canvas.getContext('2d');

let scorediv=document.getElementById('score');
let bg=document.getElementById('bg');
bg.width=window.innerWidth;
bg.height=window.innerHeight;

canvas.width=window.innerWidth*99/100;
canvas.height=window.innerHeight*99/100;
let width=canvas.width;
let height=canvas.height;

let body=document.getElementById("body");
let t=document.getElementById("effect");

let effect=t.getContext('2d');

let alpha = 1;
let changing=1;

bgmusic.volume=volume/100;

let gameover=0;

class Canvas {
    constructor(board)
    {
        this.board=board;
        this.balls=[];
        this.score=0;
        this.trail=0.1; //lower=longer trail
        this.strokeStyle='black';
     } 

    drawball(ball) {

        this.board.beginPath();
        this.board.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        this.board.closePath();
        this.board.strokeStyle=this.strokeStyle;
        this.board.lineWidth='5';
        this.board.stroke();
        this.board.fillStyle = ball.color;
        this.board.fill();
      }

      levelmodifier(score)
      {
                    
        this.trail=0.5; //lower the longer
                    

        if(this.score<=10)
        {
            this.board.clearRect(0,0,width,height);
        }
        if(this.score>10)
        {
            this.board.fillStyle=`rgba(255,0,0,${this.trail}`;
            this.board.fillRect(0,0,width,height);
  
                if(score>25 && score<=35)
                {
                    if (changing==1) 
                    {   alpha -= alpha<0.5?0.01:0.003;
                        if (alpha <= 0) {changing = -1;}
                    } 
                    else
                    {   alpha += alpha<0.5?0.01:0.003;
                        if (alpha >= 1) {changing = 1;}
                    }
                    if(alpha>=0 && alpha <=1)
                    {
                        this.board.globalAlpha=alpha;
                    }
                }

                if(this.score>35)
                {
                    if (changing==1) 
                    {   alpha -= Math.random()/50;
                        if (alpha <= -0.5) {changing = -1;}
                    } 
                    else
                    {   alpha += Math.random()/50;
                        if (alpha >= 1) {changing = 1;}
                    }
                    if(alpha>=0 && alpha <=1)
                    {
                        this.board.globalAlpha=alpha<0?0:alpha;
                    }
                }

                if(this.score<42 && this.score>10)
                {
                    for(let i=0;i<(this.balls.length-1);i++)
                         {
                    for(let j=i+1;j<this.balls.length;j++)
                    {
                        resolveCollision(this.balls[i],this.balls[j]);
                    }
                         }  
                 } 
                    
                if(this.score>30)
                 {
                     this.trail=0.4;
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
            if(board.score<15)
            {
                bouncesound.volume=volume/300*(15-board.score)/15;
                bouncesound.play();
            }
        }

        if( (this.x-this.radius)<0 && this.velocity.x<0)
        {
            this.velocity.x*=(-1);
            if(board.score<15)
            {
                bouncesound.volume=volume/300*(15-board.score)/15;
                bouncesound.play();
            }
        }

        if((this.y+this.radius)>height && this.velocity.y>0)
        {  
            this.velocity.y*=(-1);
            if(board.score<15)
            {
                bouncesound.volume=volume/300*(15-board.score)/15;
                bouncesound.play();
            }
        }
        if((this.y-this.radius)<0 && this.velocity.y<0)
        { 
            this.velocity.y*=(-1);
            if(board.score<15)
            {
                bouncesound.volume=volume/300*(15-board.score)/15;
                bouncesound.play();
            }
        }
    }
}

let board= new Canvas(display);
let multiplier=5;
entrysound.volume=volume/200;

let uiclick=false;

let homebtn=document.getElementById('homebtn');
homebtn.addEventListener('click',()=>{
    uiclick=true;
    setTimeout(()=>{uiclick=false;},100);
});

body.addEventListener('click',
(e)=>
{


if(uiclick==false && gameover==0)
   { let m=getRandomInRange(1.5,4.8);
    let v=multiplier/m;
    let vx=getRandomInRange(0,v);
    let vy=getRandomInRange(0,2)<1?Math.sqrt(v*v-vx*vx):(-Math.sqrt(v*v-vx*vx));
    vx*=getRandomInRange(0,2)<1?(-1):(1);
    let r=Math.sqrt(m)*Math.min(window.innerHeight, window.innerWidth)/20;

    let temp=new Ball(e.offsetX,e.offsetY,r,vx,vy,'white',m);
    
    entrysound.play();
    checkTouchCollision(e,r);

    if(gameover==0)
    {
    board.balls.push(temp);
    multiplier+=board.score>5?0.1:0.05;
    board.score++;
    scorediv.innerText='Score : '+ board.score;
    }
    if(gameover==1)
    {    high=false;
        bgmusic.pause();
        gameoversound.volume=volume/150;
        gameoversound.play();
        entrysound.pause();
        if(highscore<board.score)
        {
            high=true;
            console.log(high)
        }
        if(high!=true)
        {
            document.getElementById('highscorevalue').innerText=String(highscore);
        }
        setTimeout(()=>
        {let gameoverdiv=document.getElementById('gameoverdiv');
        gameoverdiv.style.opacity='1';
        gameoverdiv.style.display='flex';

        let innercontainer=document.getElementById('innercontainer');
       innercontainer.style.opacity='0';
       innercontainer.style.transition='opacity 2s linear';
       setTimeout(function() {
        innercontainer.style.opacity = '1';
      }, 100);

      console.log(high);
     

      scoreanim(board.score,high,highscore);
         if(highscore<board.score)
        {
            highscore=board.score;
            localStorage.highscore=highscore;
        }
        }
        ,0);

        
        if(board.score<5)
        {
            setTimeout(() => { bruh.play();
            }, 1000);
        }

        temp.color='black';
        board.strokeStyle='white';
         board.drawball(temp);
        gameover++;}
}
}
)


let counter=10;
let skip=false;


let update = function() {
   
    if(gameover==1)
    {  
        return;
    } 
    if(gameover==0)
    {  
    board.update();

    if(board.score>30)
    {       if(skip==false)
            { let test=Math.random()*1000;
            if(test>=7 && test<=998)
            {

                counter=10;
            }
        
            if(test<7)
            {
                counter=1;
                const image = document.getElementById("fast");
               effect.drawImage(image, 0, 0, width,height);
               fastsound.play();
               fastsound.volume=volume/100;

               bgmusic.playbackRate=1.25;
                skip=true;
                setTimeout(()=>{skip=false; fastsound.pause(); fastsound.currentTime=0; effect.clearRect(0,0,width,height);     bgmusic.playbackRate=1;},getRandomInRange(700,1000));
            }
        
            if(test>998)
            {
            counter=getRandomInRange(500,1000);
            const image = document.getElementById("freeze");
            effect.globalAlpha=counter/500;
            effect.drawImage(image, 0, 0, width,height);
            freezesound.volume=volume/100;
            freezesound.play();
            bgmusic.pause();
            
            setTimeout(()=>{skip==false && effect.clearRect(0,0,width,height); freezesound.pause(); bgmusic.play(); freezesound.currentTime=0;}, counter);
            }

        }



}
    setTimeout(()=>{

    update();
        }, counter);

    }
}

setTimeout(update, counter);










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

function checkTouchCollision(x,r)
    {
        let xpos=x.offsetX;
        let ypos=x.offsetY;


        if((board.balls).length>0)
        {temp =board.balls.forEach(
                             (e)=>{
                             let xDist=xpos - e.x;
                             let yDist=ypos - e.y;
                            let Dist=Math.sqrt(xDist*xDist+yDist*yDist);
                               if(Dist<(r+e.radius))
                                {
                                   gameover=1;
                                 }
                                }
            )
            }
    }
}

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
}


function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }







 function scoreanim(sc,high=true,hhh)
 {

    const numbers = "0123456789";
    let score=String(sc);
    let temp = score.split('').map((e)=>{ return '0'});
    let test='';
    temp.forEach((e)=>{test+='0'})
    let interval = null;
    let txt=document.getElementById("currentscorevalue");
    txt.textContent=test;

    let iteration = 0;
      
      clearInterval(interval);
      
      interval = setInterval(() => {
        txt.textContent = txt.textContent
          .split("")
          .map((number, index) => {
            if(index < iteration) {
              return score[index];
            }
            return numbers[Math.floor(Math.random() * 10)]
          })
          .join("");
        
        if(iteration >= temp.length){ 
          clearInterval(interval);
          console.log(high);
          if(high==true)
          {setTimeout(()=>{ highscoreanim(sc,hhh);},0)}
        }
        
        iteration += 1 / 20;
      }, 30);

 } 




 function highscoreanim(sc,highsc) {
    const numbers = "0123456789";
    let score=String(sc);
    let highscore=String(highsc);
    let test=highscore;
    console.log(test)
    if(score.length!=highscore.length)
    {
        for(i=0;i<(score.length-highscore.length);i++)
        {
            if(highsc=0)
            {
                continue;
            }
            test+=String(Math.floor(Math.random()*10));
        }
    }

    let interval = null;
    let txt=document.getElementById("highscorevalue");
    txt.textContent=test;

    let iteration = 0;
      
      clearInterval(interval);
      
      interval = setInterval(() => {
        txt.textContent = txt.textContent
          .split("")
          .map((number, index) => {
            if(index < iteration) {
              return score[index];
            }
            return numbers[Math.floor(Math.random() * 10)]
          })
          .join("");
        
        if(iteration >= test.length){ 
          clearInterval(interval);
        }
        
        iteration += 1 / 20;
      }, 30);
 }