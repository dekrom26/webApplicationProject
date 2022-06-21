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
let counter = [0,0,0,0,0,0];
let cart = [];
const element = document.getElementsByClassName("media-element");

let img0 = document.getElementsByClassName("img-0");
let img1 = document.getElementsByClassName("img-1");
let img2 = document.getElementsByClassName("img-2");
let img3 = document.getElementsByClassName("img-3");
let img4 = document.getElementsByClassName("img-4");
let img5 = document.getElementsByClassName("img-5");

const cart0 = document.getElementById("cart-0");
const cart1 = document.getElementById("cart-1");
const cart2 = document.getElementById("cart-2");
const cart3 = document.getElementById("cart-3");
const cart4 = document.getElementById("cart-4");
const cart5 = document.getElementById("cart-5");
const cart6 = document.getElementById("cart-6");


function amountOfOrders(){

    cart0.addEventListener("click", function() {
        counter[0]++;
      });

    cart1.addEventListener("click", function() {
        counter[1]++;
      });

    cart2.addEventListener("click", function() {
        counter[2]++;
      });

    cart3.addEventListener("click", function() {
        counter[3]++;
      });

    cart4.addEventListener("click", function() {
        counter[4]++;
      });

    cart5.addEventListener("click", function() {
        counter[5]++;
      });

}

amountOfOrders();

let max =0;
function maxOreders()
{
    for (const orders of counter) {
        if(orders > max)
        max = orders;
    }
}

maxOreders();

console.log(maxOreders.max);



console.log(counter);

