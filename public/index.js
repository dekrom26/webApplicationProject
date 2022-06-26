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
    //var message = "hello1";
// =======
    var message = window.prompt("תנו לנו ביקורת:");
    // console.log(message);
// >>>>>>> 81f850a04fe8fb875112bbb792c81eda6f9183d6
    var accessToken = "EAAPjYG6LzYMBAFxo6fbUCHUumyt6ZAceU5YBJPAnvtrZCWQZCOBAoRksMjWESeT7OeJTZBYh5VcLx4VMJO635iQDdbvsdZBBTbnPDwGY6Tgv890pCMw2k9vXg6IpK38k2HLnWNZABiMYOocLkfGsT9e7heduHsZBRADmBPNGPwtjgZDZD\n"
    var createPostRequest = "https://graph.facebook.com/v14.0/104839158945939/feed?message=" + encodeURIComponent(message) + "&access_token=" + accessToken
    xhr.open("POST", createPostRequest);
    xhr.onload = () => console.log(xhr.responseText);
    xhr.send()
});

//curl -i -X POST \
//  "https://graph.facebook.com/v14.0/104839158945939/feed?message=test1&access_token=EAAPjYG6LzYMBAAtA55ZAXCbjMZCPGq1FXDZBtZB5aCaUKK2ZA8pCQnkdiyBVQgwphGe0ZA7qUSYWjlB13UhnltocSFUHmzdG28HAnZAEEEWKXSoRJl6tnwmuqJCpBH6byuZCRjNpJPC98CnRnsR16bR16ZB3R1mBGueOvHFfuJXLAsCwIpUwyPq4T"

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
