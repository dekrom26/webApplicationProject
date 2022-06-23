'use strict';
window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("imgCanvas");
   ctx.drawImage(img, 0, 0,52,52);
};

//     window.fbAsyncInit = function() {
//     FB.init({
//         appId      : '707420810543094',
//         cookie     : true,
//         xfbml      : true,
//         version    : 'v14.0'
//     });

//         FB.getLoginStatus(function(response) {
//             statusChangeCallback(response);
//         });

// };


//     (function(d, s, id){
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {return;}
//     js = d.createElement(s); js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

//     function statusChangeCallback(response){
//         if(response.status === 'connected'){
//             console.log('Logged in and authenticated');
//         }else{
//             console.log('Not authenticated');
//         }
//     }


// function checkLoginState() {
//     FB.getLoginStatus(function(response) {
//         statusChangeCallback(response);
//     });
// }

// document.getElementById("share").addEventListener('click',postApi());
// //access token EAAKDZAT4efZCYBAJiPXOZCLsRfHZC2geCmzUWPJz17JZAtfZBFyyPSn3wpQVQvhWvWFkfI14aROWW1pFfTLdHv330upVeJNsalMwyoCexZCFHBxzJicEE7tXZAcB6cD0uqZCdRw2lmO0ve35pK6v55ZCcYbI7wP5gzrUjZCAitDHKWZCBUuoXXEbIHyX
// function postApi() {

//     console.log("test");
//     FB.api(
//         '/107487608674072/feed',
//         'POST',
//         {"message": "ben"},
//         function (response) {
//             // Insert your code here
//         }
//     );

// }


document.getElementById("fb-share-button").addEventListener('click', function() {
    let xhr = new XMLHttpRequest();
// <<<<<<< HEAD
    var message = "hello1";
// =======
    var message = window.prompt("תנו לנו ביקורת:");
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
