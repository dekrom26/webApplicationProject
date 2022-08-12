"use strict";
window.onload = function () {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var img = document.getElementById("imgCanvas");
  ctx.drawImage(img, 0, 0, 52, 52);
};

let buttons = document.getElementsByTagName("button");

const cart = [];

for (var i = 0; i < buttons.length; i++) {
  let button = buttons[i];
  console.log(button);
  button.addEventListener("click", function (event) {
    console.clear();
    console.log(event.target);
    console.log(event.target.dataset.productSku);
    cart.push(event.target.dataset.productSku);
    console.log(cart);
  });
}

// const result = await fetch('')

function preload() {
  $(document).ready(function () {
    $("#app").empty();
  });
}

function showMasterPage() {
  $(document).ready(function () {
    preload();
    $("#app").load("login");
  });
}

function showFlightPage() {
  $(document).ready(function () {
    preload();
    $("#app").load("flights");
  });
}

function showHomePage() {
  $(document).ready(function () {
    preload();
    $("#app").load("home");
  });
}

function showChatPage() {
  $(document).ready(function () {
    preload();
    $("#app").load("chat");
  });
}

function showCartPage() {
  $(document).ready(function () {
    preload();
    $("#app").load("cart");
  });
}
//C:\Users\97252\OneDrive\מסמכים\GitHub\webApplicationProject\public\cart\shoppingCart.html

document
  .getElementById("fb-share-button")
  .addEventListener("click", function () {
    let xhr = new XMLHttpRequest();
    // <<<<<<< HEAD
    //var message = "hello1";
    // =======
    var message = window.prompt("תנו לנו ביקורת:");
    // console.log(message);
    // >>>>>>> 81f850a04fe8fb875112bbb792c81eda6f9183d6
    var accessToken =
      "EAAPjYG6LzYMBAPTUSwlCALb1cFQPewOLX44jGz8ltTdBSZCvX6C0R6i7Cf4ZA8ywtkQEMhPdX3gXR6r6xV0JdbJni2xHgm4CKKEM2l5spqZAZAtFe8M6LR2NxSU70XtQFJlthqkju5GBbIXysQuZCLyljId27DThP9ClGZBKgpOjPaSOUMCfxW";
    var createPostRequest =
      "https://graph.facebook.com/v14.0/104839158945939/feed?message=" +
      encodeURIComponent(message) +
      "&access_token=" +
      accessToken;
    xhr.open("POST", createPostRequest);
    xhr.onload = () => console.log(xhr.responseText);
    xhr.send();
  });

//curl -i -X POST \
//  "https://graph.facebook.com/v14.0/104839158945939/feed?message=test1&access_token=EAAPjYG6LzYMBAAtA55ZAXCbjMZCPGq1FXDZBtZB5aCaUKK2ZA8pCQnkdiyBVQgwphGe0ZA7qUSYWjlB13UhnltocSFUHmzdG28HAnZAEEEWKXSoRJl6tnwmuqJCpBH6byuZCRjNpJPC98CnRnsR16bR16ZB3R1mBGueOvHFfuJXLAsCwIpUwyPq4T"

function initMap() {
  // map options.
  let options = {
    zoom: 13,
    center: { lat: 31.969896, lng: 34.772101 },
  };
  //New map
  let map = new google.maps.Map(document.getElementById("map"), options);

  AddMarker(
    {
      coords: { lat: 31.969896, lng: 34.772101 },
      map: map,
      text: [
        "<h2 class='text-center'>כאן נמצא</h2>",
        "<div class='text-center'>משרדי החברה</div>",
      ],
    },
    map
  );
}
function AddMarker(mapArgument, map) {
  let marker = new google.maps.Marker({
    position: mapArgument.coords,
    map: mapArgument.map,
    icon: mapArgument.icon,
  });
  let infoWindow = new google.maps.InfoWindow({
    content: mapArgument.text[0] + mapArgument.text[1],
  });
  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });
}

function showallFlights() {
  $.get("/allflights", (data) => {
    $("#main").empty();
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      const continent = data[i].Continent;
      const price = data[i].Price;
      const category = data[i].Category;
      const name = data[i].Name;
      let upName = data[i].Name.toUpperCase();
      $("#main")
        .append(`<td><p><b>Name:</b> ${name}</p> <p><b>Price:</b> ${data[i].Price}$</p>
      <p><b>Duration:</b> ${data[i].Duration} hours</p><p><b>Departure:</b> ${data[i].Departure}</p>
      <p><b>Temperature:</b> ${data[i].Temperature} C</p><p><b>Date:</b> ${data[i].Date}</p>
      <p><b>Category:</b> ${data[i].Category}</p>
      `);
      document.getElementById("main").innerHTML +=
        `<p><img id="image_` + i + `" class="center"/></p></td><hr><br>`;
      $("#image" + "_" + i).attr("src", data[i].URL);
      $("#image" + "_" + i).attr("width", "40%");
      $("#image" + "_" + i).attr("height", "40%");
    }
  });
}

function showCreateFlights() {
  $("#main").empty();
  $("#create").empty();
  $("#main").append("");
}

function User_Authentication() {
  var EmailUser = document.getElementById("email").value; //the email the user put.
  var PasswordUser = document.getElementById("password").value; //the password the user put.
  if (EmailUser == "admin@gmail.com" && PasswordUser == "flight123") {
    $("#Authentication").empty();
    $("#master").load("/master");
  } else {
    alert("Email or password is incorrect !");
    console.log("email fail");
  }
}
/////////cart
