"use strict";
window.onload = function () {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var img = document.getElementById("imgCanvas");
  ctx.drawImage(img, 0, 0, 52, 52);

  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
};
/*
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
*/
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

class MyNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<nav>
    <div class="container">
    <ul class="menu">
        <canvas id="myCanvas" width="50" height="50" style="border:1px solid #000000;">
            <img id="imgCanvas" src="style/img0.jpg" alt="">
            </canvas>
        <li class="logo"><a href="#">Cheapest Flights</a></li>
        <li class="item"><a href="/Home">Home</a></li>
        <li class="item"><a href="/Flights">Flights</a></li>
        <li class="item"><a href="/chat">Chat</a></li>
        <li class="item"><a id="cart" class="cart1" href="/cart">
          
            <i style="font-size:24px" class="fa">&#xf07a;</i>
            <li class="toggle"><span class="bars"></span></li>
        </a>
        </li>
        
    </ul>
    </div>

</nav>`;
  }
}
customElements.define("my-nav", MyNav);

class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` <footer class="footer-distributed">

      <div class="footer-left">

          <h3>Cheapest<span>Flights</span></h3>

          <p class="footer-links">
              <a href="#">Home</a>
              ·
              <a href="#">Blog</a>
              ·
              <a href="#">Pricing</a>
              ·
              <a href="#">About</a>
              ·
              <a href="#">Faq</a>
              ·
              <a href="#">Contact</a>
          </p>

          <p class="footer-company-name">CheapestFlights © 2022</p>
      </div>

      <div class="footer-center">

          <div>
              <i class="fa fa-map-marker"></i>
              <p><span>2 אלי ויזל</span> ראשון לציון, ישראל</p>
              <div id="map">
                  <script async defer
                          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1lRPzPBHuKlkSVrXGlWvhGYQlISrMSBE&callback=initMap">
                  </script>

              </div>
          </div>

          <div>
              <i class="fa fa-phone"></i>
              <p>03-1234567</p>
          </div>

          <div>
              <i class="fa fa-envelope"></i>
              <p><a href="">contact@CheapestFlights.com</a></p>
          </div>

      </div>

      <div class="footer-right">

          <p class="footer-company-about">
              <span>קצת עלינו</span>
              חברת תעופה שהוקמה למען ציון טוב בפרוייקט
          </p>
<div></div>

          <div id="fb-share-button">
            <svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid meet">
                <path class="svg-icon-path" d="M9.1,0.1V2H8C7.6,2,7.3,2.1,7.1,2.3C7,2.4,6.9,2.7,6.9,3v1.4H9L8.8,6.5H6.9V12H4.7V6.5H2.9V4.4h1.8V2.8 c0-0.9,0.3-1.6,0.7-2.1C6,0.2,6.6,0,7.5,0C8.2,0,8.7,0,9.1,0.1z"></path>
            </svg>
            <span>Share</span>
        </div>

      </div>

  </footer>`;
  }
}
customElements.define("mfooter", MyFooter);

async function router() {
  const routes = [
    { path: "/", view: "./home/home.html" },
    { path: "/Home", view: "./home/home.html" },
    { path: "/Home/", view: "./home/home.html" },
    { path: "/Flights", view: "./allFlights/allFlights.html" },
    { path: "/Flights/", view: "./allFlights/allFlights.html" },
    { path: "/chat", view: "./chat/chat.html" },
    { path: "/chat/", view: "./chat/chat.html" },
    { path: "/cart", view: "./cart/shoppingCart.html" },
    { path: "/cart/", view: "./cart/shoppingCart.html" },
  ];
  const matchRoute = routes.find(
    (route) => route.path == window.location.pathname
  );
  document.getElementById("app").innerHTML = await getTemplate(matchRoute.view);
}

function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}
async function getTemplate(url) {
  return fetch(url).then((res) => res.text());
}
