// NOTE: The variable "shirts" is defined in the shirts.js file as the full list of shirt offerings
//       You can access this variable here, and should use this variable here to build your webpages

function storeData(t){
    console.log(t);
    localStorage.setItem('name', shirts[t]['name']);
    localStorage.setItem('description', shirts[t]['description']);
    localStorage.setItem('price', shirts[t]['price']);
    localStorage.setItem('colors', t);
  }

  function setImage(ind){
    document.getElementById('theImage').src= shirts[ind]["colors"][localStorage.getItem('c_color')][localStorage.getItem('c_side')] === null || shirts[ind]["colors"][localStorage.getItem('c_color')][localStorage.getItem('c_side')] === undefined ? 'shirt_images/not-found.png' : shirts[ind]["colors"][localStorage.getItem('c_color')][localStorage.getItem('c_side')];
  }

let initProducts = () => {
    // To see the shirts object, run:
    console.log(shirts.length);
    var canva = document.createElement("div");
    canva.setAttribute('class', 'canva');
    const num = Math.ceil(shirts.length/3);
    canva.style.height = num * 600 + 'px';
    document.getElementById("shirts").appendChild(canva);

    var wrapping = document.createElement("div");
    wrapping.setAttribute('class', 'wrapping');
    canva.appendChild(wrapping);

    var status = 0;

    for( var i = 0; i < shirts.length; i++){

        var block = document.createElement("div");
        block.setAttribute('class','block');
        wrapping.appendChild(block);

        var img_a = document.createElement("a");
        img_a.setAttribute('id',i);
        img_a.onclick = function () { storeData(this.id); window.location.href='./details.html' };
        block.appendChild(img_a);

        var shirt_img = document.createElement("img");
        shirt_img.src = shirts[i]["colors"][Object.keys(shirts[i]["colors"])[0]]["front"] === null || shirts[i]["colors"][Object.keys(shirts[i]["colors"])[0]]["front"] === undefined ? 'shirt_images/not-found.png' : shirts[i]["colors"][Object.keys(shirts[i]["colors"])[0]]["front"];
        shirt_img.setAttribute('class', 'shirt_img');
        shirt_img.onerror = function(){this.src = 'shirt_images/not-found.png'};
        img_a.appendChild(shirt_img);

        var shirt_title = document.createElement("div");
        shirt_title.setAttribute('class', 'shirt_title');
        shirt_title.innerHTML = shirts[i]["name"] === null || shirts[i]["name"] === undefined ? 'Name Unavailable': shirts[i]["name"];
        block.appendChild(shirt_title);

        var shirt_num = document.createElement("div");
        shirt_num.setAttribute('class', 'shirt_num');
        shirt_num.innerHTML = Object.keys(shirts[i]["colors"]).length === 1 ? "Available in " + Object.keys(shirts[i]["colors"]).length + " color" : "Available in " + Object.keys(shirts[i]["colors"]).length + " colors";
        block.appendChild(shirt_num);

        var wrapper = document.createElement("div");
        wrapper.setAttribute('class', 'wrapper_1');
        block.appendChild(wrapper);

        var but_1 = document.createElement("btn");
        but_1.setAttribute('class', 'but_1');
        but_1.setAttribute('id', i);
        but_1.innerHTML = "Quick View";
        but_1.onclick = function(){

            if(status === 0){
            var q_div = document.createElement('div');
            q_div.setAttribute('class', 'q_div');
            q_div.setAttribute('id', 'q_div');
            document.getElementById("shirts").appendChild(q_div);

            var q_wrapper = document.createElement('div');
            q_wrapper.setAttribute('class', 'q_wrapper');
            q_div.appendChild(q_wrapper);

            var q_img1_a = document.createElement("a");
            q_img1_a.setAttribute('id',this.id);
            q_img1_a.setAttribute('class', 'q_img1_a');
            q_img1_a.onclick = function () { storeData(this.id); window.location.href='./details.html' };
            q_wrapper.appendChild(q_img1_a);

            var q_img1 = document.createElement('img');
            q_img1.src = shirts[this.id]["colors"][Object.keys(shirts[this.id]["colors"])[0]]["front"] === null || shirts[this.id]["colors"][Object.keys(shirts[this.id]["colors"])[0]]["front"] === undefined ? 'shirt_images/not-found.png' : shirts[this.id]["colors"][Object.keys(shirts[this.id]["colors"])[0]]["front"];
            q_img1.setAttribute('class', 'q_img');
            q_img1.setAttribute('id', 'q_img1');
            q_img1.onerror = function(){this.src = 'shirt_images/not-found.png'};
            q_img1_a.appendChild(q_img1);

            var q_img2_a = document.createElement("a");
            q_img2_a.setAttribute('id',this.id);
            q_img2_a.setAttribute('class', 'q_img2_a');
            q_img2_a.onclick = function () { storeData(this.id); window.location.href='./details.html' };
            q_wrapper.appendChild(q_img2_a);

            var q_img2 = document.createElement('img');
            q_img2.setAttribute('class', 'q_img');
            q_img2.setAttribute('id', 'q_img2');
            q_img2.src = shirts[this.id]["colors"][Object.keys(shirts[this.id]["colors"])[0]]["back"] === null || shirts[this.id]["colors"][Object.keys(shirts[this.id]["colors"])[0]]["back"] === undefined ? 'shirt_images/not-found.png' : shirts[this.id]["colors"][Object.keys(shirts[this.id]["colors"])[0]]["back"];
            q_img2.onerror = function(){this.src = 'shirt_images/not-found.png'};
            q_img2_a.appendChild(q_img2);

            var q_info = document.createElement('div');
            q_wrapper.appendChild(q_info);

            var q_name = document.createElement('div');
            q_name.setAttribute('class', 'q_name');
            q_name.setAttribute('id', 'q_name');
            q_name.innerHTML = shirts[this.id]['name'] == null || shirts[this.id]['name'] == undefined ? 'Name Unavailable' : shirts[this.id]['name'];
            q_info.appendChild(q_name);

            var q_price = document.createElement('div');
            q_price.setAttribute('class', 'q_price');
            q_price.setAttribute('id', 'q_price');
            q_price.innerHTML = shirts[this.id]['price'] == null || shirts[this.id]['price'] == undefined ? 'Price Unavailable' : shirts[this.id]['price'];
            q_info.appendChild(q_price);

            var q_des = document.createElement('div');
            q_des.setAttribute('class', 'q_des');
            q_des.setAttribute('id', 'q_des');
            q_des.innerHTML = shirts[this.id]['description'] == null || shirts[this.id]['description'] == undefined ? 'Description Unavailable' : shirts[this.id]['description'];
            q_info.appendChild(q_des);

            var q_btn = document.createElement('btn');
            q_btn.setAttribute('class', 'q_btn');
            q_btn.innerHTML = 'close';
            q_btn.onclick = function(){
                status = 0;
                q_div.remove();
            }
            q_info.appendChild(q_btn);

            document.getElementById('q_div').scrollIntoView();

            status = 1;
            }
            else{
                var temp = this.id;
                document.getElementById('q_img1').src = shirts[this.id]["colors"][Object.keys(shirts[this.id]["colors"])[0]]["front"] === null || shirts[this.id]["colors"][Object.keys(shirts[this.id]["colors"])[0]]["front"] === undefined ? 'shirt_images/not-found.png' : shirts[this.id]["colors"][Object.keys(shirts[this.id]["colors"])[0]]["front"];
                document.getElementById('q_img2').src = shirts[this.id]["colors"][Object.keys(shirts[this.id]["colors"])[0]]["back"] === null || shirts[this.id]["colors"][Object.keys(shirts[this.id]["colors"])[0]]["back"] === undefined? 'shirt_images/not-found.png' : shirts[this.id]["colors"][Object.keys(shirts[this.id]["colors"])[0]]["back"];
                document.getElementById('q_name').innerHTML = shirts[this.id]['name'] == null || shirts[this.id]['name'] == undefined ? 'Name Unavailable' : shirts[this.id]['name'];
                document.getElementById('q_price').innerHTML = shirts[this.id]['price'] == null || shirts[this.id]['price'] == undefined ? 'Price Unavailable' : shirts[this.id]['price'];
                document.getElementById('q_des').innerHTML = shirts[this.id]['description'] == null || shirts[this.id]['description'] == undefined ? 'Description Unavailable' : shirts[this.id]['description'];
                document.getElementById('q_div').scrollIntoView();
                document.getElementsByClassName('q_img2_a')[0].setAttribute('id', this.id);
                document.getElementsByClassName('q_img1_a')[0].setAttribute('id', this.id);
            }
        }
        wrapper.appendChild(but_1);

        var but_2 = document.createElement("btn");
        but_2.setAttribute('id',i);
        but_2.setAttribute('class', 'but_1');
        but_2.innerHTML = "See Page";
        but_2.onclick = function () { storeData(this.id); window.location.href='./details.html' };
        wrapper.appendChild(but_2);






    }

    console.log(Object.keys(shirts[1]["colors"]).length)

    // Your Code Here

};

let initDetails = () => {
    // To see the shirts object, run:
    // console.log(shirts);
    var t_wrap = document.createElement("div");
    t_wrap.setAttribute('class', 'Twrap');
    document.getElementById("details").appendChild(t_wrap);

    var t_shirt = document.createElement("div");
    t_shirt.setAttribute('class', 'Tshirts');
    var t_name = localStorage.getItem('name');
    t_shirt.innerHTML = t_name === 'null' || t_name === 'undefined'? 'Name Unavailable' : t_name;
    t_wrap.appendChild(t_shirt);

    var t_canva = document.createElement("div");
    t_canva.setAttribute('class', 't_canva');
    document.getElementById("details").appendChild(t_canva);

    var t_wrapping = document.createElement("div");
    t_wrapping.setAttribute('class', 't_wrapping');
    t_canva.appendChild(t_wrapping);

    var index = localStorage.getItem('colors');

    localStorage.setItem('c_side','front');
    localStorage.setItem('c_color', Object.keys(shirts[index]["colors"])[0]);

    var t_img = document.createElement("img");
    t_img.setAttribute('id','theImage');
    t_img.src = shirts[index]["colors"][localStorage.getItem('c_color')][localStorage.getItem('c_side')] === null  || shirts[index]["colors"][localStorage.getItem('c_color')][localStorage.getItem('c_side')] === undefined ? 'shirt_images/not-found.png' : shirts[index]["colors"][localStorage.getItem('c_color')][localStorage.getItem('c_side')];
    t_img.setAttribute('class', 't_img');
    t_img.onerror = function(){this.src = 'shirt_images/not-found.png'};
    t_wrapping.appendChild(t_img);

    var info = document.createElement("div");
    t_wrapping.appendChild(info);

    var t_price = document.createElement("div");
    t_price.setAttribute('class', 'info');
    var tprice = localStorage.getItem('price');
    console.log(tprice);
    t_price.innerHTML = tprice === 'null' || tprice === 'undefined' ? 'Price Unavailable' : tprice ;
    info.appendChild(t_price);

    var t_des = document.createElement("div");
    t_des.setAttribute('class', 'des');
    var tdes = localStorage.getItem('description');
    t_des.innerHTML = tdes === 'null' || tdes === 'undefined'? 'Description Unavailable' : tdes ;
    info.appendChild(t_des);

    var row_1 = document.createElement("div");
    row_1.setAttribute('class', 'row');
    info.appendChild(row_1);

    var t_side = document.createElement("div");
    t_side.setAttribute('class', 'column side');
    t_side.innerHTML = 'Side:'
    row_1.appendChild(t_side);

    var front = document.createElement("btn");
    front.setAttribute('class', 'column s_btn');
    front.innerHTML = 'Front'
    front.onclick = function () {localStorage.setItem('c_side', 'front'); setImage(index)}
    row_1.appendChild(front);

    var back = document.createElement("btn");
    back.setAttribute('class', 'column s_btn');
    back.innerHTML = 'Back'
    back.onclick = function () {localStorage.setItem('c_side', 'back'); setImage(index)}
    row_1.appendChild(back);

    var rows = Math.ceil(Object.keys(shirts[index]["colors"]).length/4);
    var cur = 0;

    for(var j = 0 ; j < rows ; j++){
        var row_2 = document.createElement("div");
        row_2.setAttribute('class', 'row');
        info.appendChild(row_2);
        if(j === 0){
            var t_color = document.createElement("div");
            t_color.setAttribute('class', 'column side');
            t_color.innerHTML = 'Color:'
            row_2.appendChild(t_color);
        }
        else{
            var t_color = document.createElement("div");
            t_color.setAttribute('class', 'column side_1');
            t_color.innerHTML = 'Color:'
            row_2.appendChild(t_color);
        }
        for(var z = 0; z < 4 ; z++){
            if(cur < Object.keys(shirts[index]["colors"]).length){
                var c_btn = document.createElement("btn");
                c_btn.setAttribute('class', 'column c_btn');
                c_btn.setAttribute('id', cur);
                c_btn.style.backgroundColor = Object.keys(shirts[index]["colors"])[cur];
                c_btn.innerHTML = Object.keys(shirts[index]["colors"])[cur];
                c_btn.onclick = function () {localStorage.setItem('c_color', Object.keys(shirts[index]["colors"])[this.id]); setImage(index)}
                row_2.appendChild(c_btn);
                cur += 1;
            }
        }
        // console.log(Object.keys(shirts[index]["colors"])[i]);
    }




    // Your Code Here
};