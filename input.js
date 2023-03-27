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
var mobile = false;
var ddx = 0;
var ddy = 0;
var wx = 0;
var wy = 0;
var bf = false;

for( var i = 0 ; i < num; i++){
    target[i].setAttribute('id', i);
}
for(var i = 0; i < num; i++){
    offsetsX[i] = 0;
    offsetsY[i] = 0;
}

workspace.addEventListener('click', (event) => {
    console.log('workspace click')
    if(esc === false && !bf){
        target.forEach(ele1 => ele1.style.backgroundColor = 'red')
        isColorSet = 0;
    }
    bf = false;
    esc = false;
    
})

target.forEach( ele => ele.addEventListener('click', (event) => {
    console.log('click')
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
    if(bf === true){
        bf = false;
    }
    event.stopPropagation();
}));


target.forEach(ele => ele.addEventListener('mousedown', function(e) {
    console.log('mousedown')
    if(dblclk === 0 && !mobile){
        isDown = true
        mouseX = e.pageX
        mouseY = e.pageY
        moveid = this.id;
        document.addEventListener('mousemove',move)
        e.stopPropagation();
    }
  }));
  
  document.addEventListener('mouseup', function(e) {
    if(!mobile){
        console.log('mouseup')
        if (isDown) {
        offsetsX[moveid] += e.pageX - mouseX;
        offsetsY[moveid] += e.pageY - mouseY;
        bf = true;
        }
        if(dblclk === 1){
            dblclk = 0;
        }
        // console.log(offsetsX);
        // console.log(offsetsY);
        isDown = false
        document.removeEventListener('mousemove', move)
    }
  });
  
  
  function move(e) {
    if (isDown) {
      const dx = e.pageX - mouseX
      const dy = e.pageY - mouseY
      ddx = offsetsX[moveid] + dx;
      ddy = offsetsY[moveid] + dy;
      target[moveid].style.transform = `translate(${offsetsX[moveid] + dx}px,${offsetsY[moveid] + dy}px)`;
    }
  }

target.forEach(ele => ele.addEventListener('dblclick', function(e){
    console.log('dblclick');
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

workspace.addEventListener('touchstart', function(e){
    e.preventDefault();
    wx = e.pageX;
    wy = e.pageY;
})
workspace.addEventListener('touchend', function(e){
    e.preventDefault();
    if(dblclk === 1 && e.pageX - wx < 5 && e.pageY - wy < 5 && e.pageX - wx > -5 && e.pageY - wy > -5){
        console.log('release in workspace')
        if (isDown) {
            offsetsX[moveid] += ddx - mouseX;
            offsetsY[moveid] += ddy - mouseY;
          }
        console.log(offsetsX[moveid]);
        console.log(offsetsY[moveid]);
        console.log(e.pageX);
        console.log(e.pageY);
        dblclk = 0;
        isDown = false
        document.removeEventListener('touchmove', move)
    }else if(dblclk === 1){
    }else{
        console.log('turn red')
        target.forEach(ele1 => ele1.style.backgroundColor = 'red')
        isColorSet = 0;
    }
})

for(var i = 0; i < num ; i++){
    target[i].addEventListener('touchstart', function(e){
        ts = new Date().getTime();
        if(dblclk === 0){
            isDown = true
            mouseX = e.pageX
            mouseY = e.pageY
            moveid = this.id;
            document.addEventListener('touchmove',move)
        }
        e.preventDefault();
        e.stopPropagation();
    })
    target[i].addEventListener('touchend', function(e){
        mobile = true;
        var currentTime = new Date().getTime();
        if(currentTime - ts < 200 && currentTime - ts > 0){
            if(dblclk === 1){
                console.log('release in target')
                if (isDown) {
                    offsetsX[moveid] += ddx - mouseX;
                    offsetsY[moveid] += ddy - mouseY;
                  }
                console.log(offsetsX[moveid]);
                console.log(offsetsY[moveid]);
                dblclk = 0;
                isDown = false
                document.removeEventListener('touchmove', move)
            }
            else if(isColorSet === 0){
                target[this.id].style.backgroundColor = '#00f';
                isColorSet = 1;
            }
            else{
                target.forEach(ele1 => ele1.style.backgroundColor = 'red')
                target[this.id].style.backgroundColor = '#00f';
            }
        }
        if(isDown){     
            offsetsX[moveid] += e.pageX - mouseX;
            offsetsY[moveid] += e.pageY - mouseY;
            if(dblclk === 1){
                dblclk = 0;
            }
            // console.log(offsetsX);
            // console.log(offsetsY);
            isDown = false
            document.removeEventListener('mousemove', move)
        }
        var tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            dblclk = 1;
            isDown = true
            mouseX = e.pageX
            mouseY = e.pageY
            console.log('mouseX is');
            console.log(mouseX)
            console.log('mouseY is');
            console.log(mouseY)
            moveid = this.id;
            console.log(offsetsX[moveid])
            console.log(offsetsY[moveid])
            document.addEventListener('touchmove',move)
        }
        lastTap = currentTime;
        e.preventDefault();
        e.stopPropagation();    
        })
}

