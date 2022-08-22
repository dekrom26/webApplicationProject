"use strict";
window.onload = function () {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var img = document.getElementById("imgCanvas");
  ctx.drawImage(img, 0, 0, 52, 52);
};

// let buttons = document.getElementsByTagName("button");

// const cart = [];

// for (var i = 0; i < buttons.length; i++) {
//   let button = buttons[i];
//   console.log(button);
//   button.addEventListener("click", function (event) {
//     console.clear();
//     console.log(event.target);
//     console.log(event.target.dataset.productSku);
//     cart.push(event.target.dataset.productSku);
//     console.log(cart);
//   });
// }

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

let graph;
function removeGraph() {
  if (graph) {
    graph = null;
  } else {
    graph = $("#graphs").detach();
  }
}
function showGraphs() {
  $("#main").empty();
  $("#create").empty();
  $("#update").empty();
  $("#delete").empty();
  $("#graphs").empty();
  //$("#graphs").detach();
  // if (!graph) {
  //   graph = loadRating();
  // }
  $("#graphs").append(graph);
}

function showCreateFlights() {
  $("#main").empty();
  $("#create").empty();
  $("#update").empty();
  $("#delete").empty();
  $("#graphs").empty();
  // graph=$("#graphs").detach();
  $("#create").load("creat.html");
}

function showUpdateFlights() {
  $("#main").empty();
  $("#create").empty();
  $("#update").empty();
  $("#delete").empty();
  $("#graphs").empty();
  // graph=$("#graphs").detach();
  $("#update").load("update.html");
}

function showDeleteFlights() {
  $("#main").empty();
  $("#create").empty();
  $("#update").empty();
  $("#delete").empty();
  $("#graphs").empty();
  // graph=$("#graphs").detach();
  $("#delete").load("delete.html");
}

function User_Authentication(email, password) {
  $.get("/allusers", (data) => {
    var EmailAdmin = data[0].Email;
    var PassAdmin = data[0].Password;
    if (email == EmailAdmin && password == PassAdmin) {
      $("#Authentication").empty();
      $("#master").load("/master");
    } else {
      alert("Email or password is incorrect !");
      console.log("email fail");
    }
  });
}
/////////cart

function createFlight(
  name,
  URL,
  duration,
  departure,
  arrivle,
  price,
  temperature,
  continent,
  date,
  category,
  API
) {
  console.log(name);
  // $.post("/create", obj);
  $.ajax({
    url: "http://localhost:8080/create",
    type: "POST",
    data: JSON.stringify({
      name: name,
      URL: URL,
      duration: duration,
      departure: departure,
      arrivle: arrivle,
      price: price,
      temperature: temperature,
      continent: continent,
      date: date,
      category: category,
      Rating: 0,
      API: API,
    }),
    contentType: "application/json",
    dataType: "json",
    success: function () {
      console.log("request successfully!");
    },
  });
}

function showCardAllFlight(
  i,
  name,
  date,
  url,
  duration,
  Departure,
  Arrivle,
  Price,
  Temperature,
  Continent,
  Category
) {
  return `<section class="light">
  <body>
  <div class="container py-2">
    <article class="postcard light blue">
      <a class="postcard__img_link" href="#">
        <img
          class="postcard__img"
          src="${url}"
          alt="Image Title"
        />
      </a>
      <div class="postcard__text t-light">
        <h1 class="postcard__title blue"><a href="#">${name}</a></h1>
  
        <div class="postcard__subtitle small">
            <i class="fas fa-calendar-alt mr-2"></i>${date}
        </div>
        <div class="postcard__bar"></div>
     
        <ul class="postcard__tagbox">
          <li class="tag__item"><i class="fas fa-clock mr-2"></i>Duration(Hours): ${duration}</li>
          <li class="tag__item"><i class="fas fa-clock mr-2"></i>Departure: ${Departure}</li>
          <li class="tag__item"><i class="fas fa-clock mr-2"></i>Arrivle: ${Arrivle}</li>
          <li class="tag__item"><i class="fas fa-clock mr-2"></i>Price: ${Price} $</li>
          <li class="tag__item"><i class="fas fa-clock mr-2"></i>Temperature: ${Temperature}</li>
          <li class="tag__item"><i class="fas fa-clock mr-2"></i>Continent: ${Continent}</li>
          <li class="tag__item"><i class="fas fa-clock mr-2"></i>Category: ${Category}</li>

         
        <button class="bag-btn" onclick="AddCart(${i})">Add To Cart</button>
        <button class="like-btn" onclick="Like(${i})"> <i class="fa fa-thumbs-up"></i></button>
        <button class="unlike-btn" onclick="UnLike(${i})"> <i class="fa fa-thumbs-down"></i></button>
          </div>
          </li>
          </li>
        </ul>
      </div>
   
  </div>
  </section>
  <body>
  `;
}

function showCard() {
  $("#text").empty();
  $.get("/allflights", function (data, status) {
    for (var i = 0; i < data.length; i++) {
      $("#text").append(
        showCardAllFlight(
          i,
          data[i].Name,
          data[i].Date,
          data[i].URL,
          data[i].Duration,
          data[i].Departure,
          data[i].Arrivle,
          data[i].Price,
          data[i].Temperature,
          data[i].Continent,
          data[i].Category
        )
      );
    }
  });
}

function showCartPage() {
  $(document).ready(function () {
    preload();
    $("#app").load("cart");
  });
}

function AddCart(i) {
  console.log(i);
  $.get("/allflights", function (data, status) {
    var _id = data[i]._id;
    $.ajax({
      url: "http://localhost:8080/addToCart",
      type: "POST",
      data: JSON.stringify({
        _id: _id,
      }),
      contentType: "application/json",
      dataType: "json",
      success: function () {
        console.log("request successfully!");
        window.alert("Product added successfully");
      },
    });
  });
}

function update_price(_id, quantity) {
  console.log(quantity);
  $.ajax({
    url: "http://localhost:8080/updatePrice",
    type: "POST",
    data: JSON.stringify({
      _id: _id,
      quantity: quantity,
    }),
    contentType: "application/json",
    dataType: "json",
    success: function () {
      console.log("request successfully!");
    },
  });
}

function updateAndRef(_id, quantity) {
  update_price(_id, quantity);
  loadCart();
}

function showOrderPage() {
  $("#maincart").empty();
  $.get("/carts", function (data, status) {
    var arr = data[0].Products;
    $.ajax({
      url: "http://localhost:8080/updateSales",
      type: "POST",
      data: JSON.stringify({
        arr: arr,
      }),
      contentType: "application/json",
      dataType: "json",
      success: function () {
        console.log("request successfully!");
      },
    });
    $("#maincart").load("order.html");
  });
}
