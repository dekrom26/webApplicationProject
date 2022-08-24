"use strict";
window.onload = function () {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var img = document.getElementById("imgCanvas");
  ctx.drawImage(img, 0, 0, 52, 52);
};

function preload() {
  $(document).ready(function () {
    $("#app").empty();
  });
}

function showRegPage() {
  $(document).ready(function () {
    preload();
    $("#app").load("view/login/loginclient.html");
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

function share() {
  let xhr = new XMLHttpRequest();

  var message = window.prompt("תנו לנו ביקורת:");

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
}

function dekelMelech() {
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
  fetch("/allflights")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const arrOfFlights = [];
      for (let singleFlight of res) {
        arrOfFlights.push(singleFlight);
      }
      console.log(arrOfFlights);
      for (let flight of arrOfFlights) {
        AddMarker1(flight, map);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("locations was loaded");
    });
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

function AddMarker1(mapArgument, map) {
  let marker = new google.maps.Marker({
    position: mapArgument.Coords,
    map: map,
  });
  let infoWindow = new google.maps.InfoWindow({
    content: mapArgument.Name,
  });
  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });
}

function showGraphs() {
  $("#search").empty();
  $("#main").empty();
  $("#create").empty();
  $("#update").empty();
  $("#delete").empty();
  $("#graphs").empty();
  $("#users").empty();

  $("#graphs").append(graph);
}

function showCreateFlights() {
  $("#search").empty();
  $("#main").empty();
  $("#create").empty();
  $("#update").empty();
  $("#delete").empty();
  $("#graphs").empty();
  $("#users").empty();
  $("#create").load("view/master/crud/creat.html");
}

function showUpdateFlights() {
  $("#search").empty();
  $("#main").empty();
  $("#create").empty();
  $("#update").empty();
  $("#delete").empty();
  $("#graphs").empty();
  $("#users").empty();
  $("#update").load("view/master/crud/update.html");
}

function showDeleteFlights() {
  $("#search").empty();
  $("#main").empty();
  $("#create").empty();
  $("#update").empty();
  $("#delete").empty();
  $("#graphs").empty();
  $("#users").empty();
  $("#delete").load("view/master/crud/delete.html");
}

function showUsers() {
  $("#search").empty();
  $("#main").empty();
  $("#create").empty();
  $("#update").empty();
  $("#delete").empty();
  $("#graphs").empty();
  $("#users").empty();
  $("#users").load("view/master/user/userTable.html");
}

function Master_Authentication(email, password) {
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

function User_Authentication(email, password) {
  if (email == "" || password == "") {
    window.alert("Not all fields are filled, try again");
    return;
  }
  $.get("/allusers", (data) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].Email == email && data[i].Password == password) {
        var cart_id = data[i].Cart_id;
        window.alert(
          "You have successfully login! your CartId is:  " +
            cart_id +
            " " +
            "  (please save it to continue)   "
        );
        showFlightPage();
        return;
      }
      if (i == data.length - 1) {
        window.alert("The user does not exist");
        return;
      }
    }
  });
}

function showReg() {
  $("#LoginClient").empty();
  $("#reg").load("/registration");
}

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

function showCartPage() {
  $(document).ready(function () {
    preload();
    $("#app").load("cart");
  });
}

function update_price(_id, quantity, cart_id) {
  console.log(quantity);
  $.ajax({
    url: "http://localhost:8080/updatePrice",
    type: "POST",
    data: JSON.stringify({
      _id: _id,
      quantity: quantity,
      cart_id: cart_id,
    }),
    contentType: "application/json",
    dataType: "json",
    success: function () {
      console.log("request successfully!");
    },
  });
}

function updateAndRef(_id, quantity, cart_id) {
  update_price(_id, quantity, cart_id);
  loadCartById(cart_id);
}

function showOrderPage(cart_id) {
  console.log(cart_id);
  $("#maincart").empty();
  var arr;
  $.get("/carts", function (data, status) {
    for (var l = 0; l < data.length; l++) {
      if (data[l]._id == cart_id) {
        arr = data[l].Products;
      }
    }
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
  });
  loadOrder(cart_id);
}

function loadOrder(cart_id) {
  $("#maincart").load("view/order/order.html");
  $("#itemOrder").empty();
  var arr_id;
  var arr_flight;
  var first;
  var last;
  $.get("/carts", function (data1, status) {
    for (var l = 0; l < data1.length; l++) {
      if (data1[l]._id == cart_id) {
        arr_id = data1[l].Products;
        first = data1[l].FirstName;
        last = data1[l].LastName;
      }
    }

    $.get("/allflights", function (data, status) {
      arr_flight = data;
      console.log(arr_flight);
      var total = 0;
      for (var j = 0; j < arr_id.length; j++) {
        for (var i = 0; i < arr_flight.length; i++) {
          if (arr_id[j].flight_id != arr_flight[i]._id) continue;

          total += arr_id[j].Quantities * arr_flight[i].Price;
          $("#itemOrder").append(
            showitem(
              arr_flight[i].Name,
              arr_id[j].Quantities,
              arr_flight[i].Price
            )
          );
        }
      }
      $("#name_client").empty;
      $("#name_client").append(first + " " + last);
      $("#totalorder").empty();
      $("#totalorder").append(total + "$");
      DeleteCart(cart_id);
    });
  });
}

// This function will open socket to each connected user for real-time data transfer
const openSocket = () => {
  const socket = io();

  socket.on("users", (arg) => {
    document.getElementById("users").innerText = `${arg}`;
  });
};

const main = () => {
  openSocket();
  dekelMelech();
};

main();
