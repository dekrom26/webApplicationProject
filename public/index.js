'use strict';
window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("imgCanvas");
   ctx.drawImage(img, 0, 0,52,52);
};


document.getElementById("fb-share-button").addEventListener('click', function() {
    let xhr = new XMLHttpRequest();
// <<<<<<< HEAD
    var message = "hello1";
// =======
    var message = window.prompt("תנו לנו ביקורת:");
    // console.log(message);
// >>>>>>> 81f850a04fe8fb875112bbb792c81eda6f9183d6
    var accessToken = "EAAPjYG6LzYMBAG00lwAzFMMp8li26nphSjHALtBNAmW8eZALfj2CZC2PQxy79tZCOVHH276w3M5fjBVM5qDULChLCGjUeEak0ELpJXZCCSH367aveQKhQxvlYxYauOt5ZC3OiDRZBo3JJkwybyAQejxWyylifS6cJ4kgZC8ZCbBEF6EwzVKvMXdtncedBGH1uEnkz7jTaSjtkAZDZD"
    var createPostRequest = "https://graph.facebook.com/v14.0/104839158945939/feed?message=" + encodeURIComponent(message) + "&access_token=" + accessToken
    xhr.open("POST", createPostRequest);
    xhr.onload = () => console.log(xhr.responseText);
    xhr.send()
});



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
        text: ["<h2 class='text-center'>כאן נמצא</h2>", "<div class='text-center'>משרדי החברה</div>"]
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
