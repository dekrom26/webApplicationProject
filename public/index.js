'use strict';
window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("imgCanvas");
   ctx.drawImage(img, 0, 0,52,52);
};
function initMap() {
    // map options.
    let options = {
        zoom: 13,
        center: {lat: 31.969896, lng: 34.772101}
    }
    //New map
    let map = new google.maps.Map(document.getElementById('map'), options);

    AddMarker({
        coords: {lat: 31.969896, lng: 34.772101},
        map: map,
        text: ["<h2 class='text-center'>כאן נמצא</h2>", "<div class='text-center'>דקל אוכל בתחת</div>"]
    }, map);
}
function AddMarker(mapArgument, map) {
    let marker = new google.maps.Marker({
        position: mapArgument.coords,
        map: mapArgument.map,
        icon: mapArgument.icon,
    });
    let infoWindow = new google.maps.InfoWindow({
        content: mapArgument.text[0] + mapArgument.text[1]
    });
    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
}


// document.addEventListener("DOMContentLoaded",function() {
//     let fly = document.querySelector('img');
// console.log(fly);

// })

// const changePrice =  function(){// change the price from 50 to 1500
//     //const date = new Date().getMonth();
//     const randomPrice0 = Math.trunc(Math.random() * 1000) + 1;
//     const randomPrice1 =  Math.trunc(Math.random() * 1000) + 1;
//     const randomPrice2 = Math.trunc(Math.random() * 1000) + 1;
//     const randomPrice3 = Math.trunc(Math.random() * 1000) + 1;
//     const randomPrice4 =  Math.trunc(Math.random() * 1000) + 1;
//     const randomPrice5 = Math.trunc(Math.random() * 1000) + 1;

//     document.getElementById("price-0").textContent = `$ ${randomPrice0}`; //price for france
//     document.getElementById("price-1").textContent = `$ ${randomPrice1}`;//price for spain  
//     document.getElementById("price-2").textContent = `$ ${randomPrice2}`; //price for dubai
//     document.getElementById("price-3").textContent =  `$ ${randomPrice3}`;//price for Greece
//     document.getElementById("price-4").textContent =  `$ ${randomPrice4}`;//price for Portugal
//     document.getElementById("price-5").textContent =  `$ ${randomPrice5}`;//price for New Zealand
//     //console.log(date);
// }
// changePrice();
function randomFly(){
    // diceEl.src = `dice-${dice}.png`;
    // const diceEl = document.querySelector('.dice');
    let img0 = document.querySelector(".img-0");
    let img1 =document.querySelector(".img-1");
    let img2 = document.querySelector(".img-2");
    let img3 = document.querySelector(".img-3");
    let img4 =document.querySelector(".img-4");
    let img5 =document.querySelector(".img-5");
    // img0.src = "imgs/portugal.jpg"; // change the img

}
randomFly();






// let count =0;
// const counter = document.getElementById('counter');
// document.getElementById('button').addEventListener('click',event =>{
//     const cl = counter.classList;
//     const c = 'new-counter';
//     count++;

//     counter.innerText = count;
//     cl.remove(c, cl.contains(c));
//     setTimeout(() => 
//     counter.classList.add('new-counter'),0);
// })


// function getCart(){
//     $.get("cart",(data)=>{
//       let blabla = data;
//     //   showAd(screenAds.shift());
//     console.log(blalba);
//     });
//   }


//   $(() => {
//     getCart();
//   });








