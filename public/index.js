'use strict';
window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("imgCanvas");
   ctx.drawImage(img, 0, 0,52,52);
};

    window.fbAsyncInit = function() {
    FB.init({
        appId      : '707420810543094',
        cookie     : true,
        xfbml      : true,
        version    : 'v14.0'
    });

        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });

};


    (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

    function statusChangeCallback(response){
        if(response.status === 'connected'){
            console.log('Logged in and authenticated');
        }else{
            console.log('Not authenticated');
        }
    }


function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}
function postApi() {
    FB.api(
        '/107487608674072/feed',
        'POST',
        {"message": "test 3"},
        function (response) {
            // Insert your code here
        }
    );
}


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
