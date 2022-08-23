function Search1() {
  var priceUser = document.getElementById("price").value; //the price the user put.
  var categoryUser = document.getElementById("category").value; //the category the user put.
  var continentUser = document.getElementById("continent").value; //the contienet the user put.
  $.get("/allflights", (data) => {
    $("#text").empty();
    for (var i = 0; i < data.length; i++) {
      const continent = data[i].Continent;
      const price = data[i].Price;
      const category = data[i].Category;
      if (
        (continentUser == "all" || continent == continentUser) &&
        (categoryUser == "all" || category == categoryUser)
      ) {
        if (priceUser == "cheap" && price >= 100) continue;

        if (priceUser == "regular" && (price < 100 || price >= 500)) continue;

        if (priceUser == "expensive" && price < 500) continue;

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
    }
  });
}

function Search2() {
  var startData = document.getElementById("start").value;
  var endDate = document.getElementById("end").value;
  var temperatureUser = document.getElementById("temperature").value;
  var durationUser = document.getElementById("duration").value;
  $.get("/allflights", (data) => {
    $("#text").empty();
    for (var i = 0; i < data.length; i++) {
      const Temperature = data[i].Temperature;
      const date = data[i].Date;
      const duration = data[i].Duration;

      if (date > startData && date < endDate) {
        if (
          (temperatureUser == "cold" && Temperature >= 15) ||
          (durationUser == "short" && duration >= 4)
        )
          continue;
        if (
          (temperatureUser == "regular" &&
            (Temperature < 15 || Temperature >= 25)) ||
          (durationUser == "med" && (duration < 4 || duration >= 6))
        )
          continue;
        if (
          (temperatureUser == "hot" && Temperature < 25) ||
          (durationUser == "long" && duration < 6)
        )
          continue;

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
    }
  });
}

!(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (!d.getElementById(id)) {
    js = d.createElement(s);
    js.id = id;
    js.src = "https://weatherwidget.io/js/widget.min.js";
    fjs.parentNode.insertBefore(js, fjs);
  }
})(document, "script", "weatherwidget-io-js");

function GroupByContinent() {
  $("#text").empty();
  $("#text").append(`<p>The number of flights on each continent:</p><br>`);
  $.get("/groupByContinent", function (data, status) {
    for (let i = 0; i < data.length; i++) {
      $("#text").append(
        `<p id="name"><b><Continent:</b> ${data[i]._id}:${data[i].total}</p>`
      );
    }
  });
}

function GroupByCategory() {
  $("#text").empty();
  $("#text").append(`<p>Average flight ticket by category:</p><br>`);
  $.get("/groupByCategory", function (data, status) {
    for (let i = 0; i < data.length; i++) {
      $("#text").append(
        `<p id="name"><b><Category:</b> ${data[i]._id}:${data[i].avg}$</p>`
      );
    }
  });
}

function Like(i) {
  $.get("/allflights", function (data, status) {
    var id_product = data[i]._id;
    var rating = data[i].Rating;
    $.ajax({
      url: "http://localhost:8080/like",
      type: "POST",
      data: JSON.stringify({ _id: id_product, rating: rating }),
      contentType: "application/json",
      dataType: "json",
      success: function () {
        console.log("like successfully!");
        //window.alert("successfully updated");
      },
    });
  });
}

function UnLike(i) {
  $.get("/allflights", function (data, status) {
    var id_product = data[i]._id;
    var rating = data[i].Rating;
    $.ajax({
      url: "http://localhost:8080/unlike",
      type: "POST",
      data: JSON.stringify({ _id: id_product, rating: rating }),
      contentType: "application/json",
      dataType: "json",
      success: function () {
        console.log("unlike successfully!");
        //window.alert("successfully updated");
      },
    });
  });
}

function BuyNow() {
  var arr = [];
  var count = 0;
  $.get("/allflights", function (data, status) {
    for (let i = 0; i < data.length; i++) {
      if (indexes[i] == 1) {
        count += data[i].Price;
        arr.push(data[i].Name);
      }
    }

    $.ajax({
      url: "http://localhost:8080/buy",
      type: "POST",
      data: JSON.stringify({ arr: arr, count: count }),
      contentType: "application/json",
      dataType: "json",
      success: function () {
        console.log("request successfully!");
        //window.alert("successfully updated");
      },
    });
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

         
        <button class="bag-btn" onclick=AddCart(${i},document.getElementById('cart_id').value)>Add To Cart</button>
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

function AddCart(i, cart_id) {
  console.log(i);
  console.log("cart_id:" + cart_id);
  if (cart_id == "") {
    window.alert("Please enter your cart id before you add an item to cart");
    return;
  }
  $.get("/allflights", function (data, status) {
    var _id = data[i]._id;
    $.ajax({
      url: "http://localhost:8080/addToCart",
      type: "POST",
      data: JSON.stringify({
        _id: _id,
        cart_id: cart_id,
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


function search_allFlight(name){
    console.log(name);
    $("#text").empty();
    $.get("/allflights", function (data, status) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].Name == name) {
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
      }
    });
  }





$(() => {
  showCard();
});
