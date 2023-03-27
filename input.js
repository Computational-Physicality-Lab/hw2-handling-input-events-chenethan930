/*
* all the code for homework 2 goes into this file.
You will attach event handlers to the document, workspace, and targets defined in the html file
to handle mouse, touch and possible other events.

You will certainly need a large number of global variables to keep track of the current modes and states
of the interaction.
*/
var target = document.querySelectorAll(".target");
var workspace = document.querySelector("#workspace");
var isColorSet = 0;
var isDown = false;
let mouseX = 0;
let mouseY = 0;
let offsetX = 0;
let offsetY = 0;
var num = target.length;
var moveid = -1;
var offsetsX = {};
var offsetsY = {};
var dblclk = 0;
var esc = false;
var timeout;
var lastTap = 0;
var ts = 0;

for( var i = 0 ; i < num; i++){
    target[i].setAttribute('id', i);
}
for(var i = 0; i < num; i++){
    offsetsX[i] = 0;
    offsetsY[i] = 0;
}

workspace.addEventListener('click', (event) => {
    if(esc === false){
        target.forEach(ele1 => ele1.style.backgroundColor = 'red')
        isColorSet = 0;
    }
    esc = false;
    
})

target.forEach( ele => ele.addEventListener('click', (event) => {
    if(isColorSet === 0 && event.pageX - mouseX < 5 && event.pageY - mouseY < 5 && event.pageX - mouseX > -5 && event.pageY - mouseY > -5){
        ele.style.backgroundColor = '#00f';
        isColorSet = 1;
    }
    else{
        if(esc === true){
            if(event.pageX - mouseX < 5 && event.pageY - mouseY < 5 && event.pageX - mouseX > -5 && event.pageY - mouseY > -5){
                target.forEach(ele1 => ele1.style.backgroundColor = 'red')
                ele.style.backgroundColor = '#00f';
                esc = false;
            }
        }
        if(event.pageX - mouseX < 5 && event.pageY - mouseY < 5 && event.pageX - mouseX > -5 && event.pageY - mouseY > -5){
            target.forEach(ele1 => ele1.style.backgroundColor = 'red')
            ele.style.backgroundColor = '#00f';
    }
    }
    event.stopPropagation();
}));


target.forEach(ele => ele.addEventListener('mousedown', function(e) {
    if(dblclk === 0){
        isDown = true
        mouseX = e.pageX
        mouseY = e.pageY
        moveid = this.id;
        document.addEventListener('mousemove',move)
        e.stopPropagation();
    }
  }));
  
  document.addEventListener('mouseup', function(e) {
    if (isDown) {
      offsetsX[moveid] += e.pageX - mouseX;
      offsetsY[moveid] += e.pageY - mouseY;
    }
    if(dblclk === 1){
        dblclk = 0;
    }
    console.log(offsetsX);
    console.log(offsetsY);
    isDown = false
    document.removeEventListener('mousemove', move)
  });
  
  
  function move(e) {
    if (isDown) {
      const dx = e.pageX - mouseX
      const dy = e.pageY - mouseY
      target[moveid].style.transform = `translate(${offsetsX[moveid] + dx}px,${offsetsY[moveid] + dy}px)`;
    }
  }

target.forEach(ele => ele.addEventListener('dblclick', function(e){
    dblclk = 1;
    isDown = true
    mouseX = e.pageX
    mouseY = e.pageY
    moveid = this.id;
    document.addEventListener('mousemove',move)
}))

document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        if(isDown === true){
            esc = true;
            target[moveid].style.transform = `translate(${offsetsX[moveid]}px,${offsetsY[moveid]}px)`;
            isDown = false;
            dblclk = 0;
        }
    }
});

for(var i = 0; i < num ; i++){
    target[i].addEventListener('touchstart', function(e){
        e.preventDefault();
        ts = new Date().getTime();
    })
    target[i].addEventListener('touchend', function(e){
        var currentTime = new Date().getTime();
        if(currentTime - ts < 500 && currentTime - ts > 0){
            if(isColorSet === 0){
                target[this.id].style.backgroundColor = '#00f';
                isColorSet = 1;
            }
            else{
                target.forEach(ele1 => ele1.style.backgroundColor = 'red')
                target[this.id].style.backgroundColor = '#00f';
            }
        }
        var tapLength = currentTime - lastTap;
        if (tapLength < 500 && tapLength > 0) {
            e.preventDefault();
            dblclk = 1;
            isDown = true
            mouseX = e.pageX
            mouseY = e.pageY
            moveid = this.id;
            document.addEventListener('touchmove',move)
        }
        lastTap = currentTime;
        })
}