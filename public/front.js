
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
        //icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        text: ["<h2 class='text-center'>כאן נמצא</h2>", "<div class='text-center'>בן הסתום</div>"]
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

console.log(document.getElementById("price"));
