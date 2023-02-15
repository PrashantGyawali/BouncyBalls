let voldiv = document.getElementById('voldiv');
let volbtn = document.getElementById('volbtn');
let volslider= document.getElementById('volslider');

voldiv.addEventListener('mouseout' ,
()=>{

    volslider.style.transition='width linear 0.25s, opacity linear 0.25s';
    volslider.style.width='0px';
    volslider.style.opacity='0';

});

['mouseover', 'click','focus'].forEach(function(event) { voldiv.addEventListener(event, ()=>{
       volslider.style.transition='width linear 0.25s, opacity linear 0.25s';
       volslider.style.width='100px';
       volslider.style.opacity='1';
   
   })});

voldiv.addEventListener('mousemove',
()=>{
    let txt=volslider.value==0? '&#128264': volslider.value>50?'&#128266':'&#128265';
volbtn.innerHTML=txt;
})
voldiv.addEventListener('touchmove',
()=>{
    let txt=volslider.value==0? '&#128264': volslider.value>50?'&#128266':'&#128265';
volbtn.innerHTML=txt;
})
