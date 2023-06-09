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
var width_dic = {};
var origin_width = {};
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
var abor = false;
var difference = 0;
var selected = -1;
var scaling = false;
var temp = 0;
var db_es = 0;

for( var i = 0 ; i < num; i++){
    target[i].setAttribute('id', i);
}
for(var i = 0; i < num; i++){
    offsetsX[i] = 0;
    offsetsY[i] = 0;
}

for(var i = 0 ; i < num ; i++){
    width_dic[i] = target[i].clientWidth;
    origin_width[i] = target[i].clientWidth;
}

workspace.addEventListener('click', (event) => {
    if((esc === false && !bf) || db_es === 1){
        target.forEach(ele1 => ele1.style.backgroundColor = 'red')
        isColorSet = 0;
        db_es = 0;
    }
    bf = false;
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
    if(bf === true){
        bf = false;
    }
    event.stopPropagation();
}));


target.forEach(ele => ele.addEventListener('mousedown', function(e) {
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
      ddx =  dx;
      ddy =  dy;
      target[moveid].style.transform = `translate(${offsetsX[moveid] + dx}px,${offsetsY[moveid] + dy}px)`;
      if( mobile && e.touches.length > 1){
        if(isDown){
            dblclk = 0;
            isDown = false;
            target[moveid].style.transform = `translate(${offsetsX[moveid]}px,${offsetsY[moveid]}px)`;
            document.removeEventListener('touchmove', move)
            abor = true;
        }
      }
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
            if(dblclk === 1){
                db_es = 1;
            }
            dblclk = 0;
        }
    }
});

workspace.addEventListener('touchstart', function(e){
    e.preventDefault();
    wx = e.pageX;
    wy = e.pageY;
    if(e.touches.length == 2 && isColorSet === 1){
        difference = Math.abs(e.touches[0].clientX - e.touches[1].clientX)
        scaling = true;
        // console.log(difference)
        document.addEventListener('touchmove', scale)
    }
    if(e.touches.length === 3){
        target[selected].style.width = width_dic[selected] + 'px'
        target[selected].style.marginLeft = '-' + width_dic[selected]/2 + 'px'
        temp = width_dic[selected]
        document.removeEventListener('touchmove', scale)
    }
})
workspace.addEventListener('touchend', function(e){
    e.preventDefault();
    if(dblclk === 1 && e.pageX - wx < 5 && e.pageY - wy < 5 && e.pageX - wx > -5 && e.pageY - wy > -5){
        console.log('release in workspace')
        if (isDown) {
            offsetsX[moveid] += ddx ;
            offsetsY[moveid] += ddy ;
          }
        dblclk = 0;
        isDown = false
        document.removeEventListener('touchmove', move)
    }else if(abor || dblclk === 1 || scaling){
        // scaling = false
            // console.log(abor)
            // console.log(dblclk)
            // console.log(scaling)
            abor = false;
            // console.log('abort is false')
            if(dblclk === 0 && scaling && e.touches.length === 1){
                width_dic[selected] = temp;
            }
            if(e.touches.length === 0){
                scaling = false;
                // console.log('scale is false')
            }

    }else{
        target.forEach(ele1 => ele1.style.backgroundColor = 'red')
        isColorSet = 0;
        selected = -1;
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
                if (isDown) {
                    offsetsX[moveid] += ddx;
                    offsetsY[moveid] += ddy;
                  }
                dblclk = 0;
                isDown = false
                document.removeEventListener('touchmove', move)
            }
            else if(isColorSet === 0){
                target[this.id].style.backgroundColor = '#00f';
                isColorSet = 1;
                selected = this.id;
            }
            else{
                target.forEach(ele1 => ele1.style.backgroundColor = 'red')
                target[this.id].style.backgroundColor = '#00f';
                selected = this.id;
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
            document.removeEventListener('touchmove', move)
        }
        var tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
            dblclk = 1;
            isDown = true
            mouseX = e.pageX
            mouseY = e.pageY
            // console.log('mouseX is');
            // console.log(mouseX)
            // console.log('mouseY is');
            // console.log(mouseY)
            // moveid = this.id;
            // console.log(offsetsX[moveid])
            // console.log(offsetsY[moveid])
            document.addEventListener('touchmove',move)
        }
        lastTap = currentTime;
        e.preventDefault();
        e.stopPropagation();    
        })
}

function scale(e){
    var new_d = Math.abs(e.touches[1].clientX - e.touches[0].clientX)
    var dif_p = 1 + (new_d - difference)/(difference * 1.0)
    temp = width_dic[selected] * dif_p < origin_width[selected]/ 2 ? origin_width[selected]/ 2 : (width_dic[selected]) * dif_p;
    target[selected].style.width = temp + 'px';
    target[selected].style.marginLeft = width_dic[selected] * dif_p < origin_width[selected]/ 2 ? '-' + origin_width[selected]/ 4 + 'px' : '-' + ((width_dic[selected]) * dif_p) / 2 + 'px';
}

