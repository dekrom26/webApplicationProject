function showOneProduct(
  id,
  name,
  url,
  departure,
  date,
  category,
  price,
  quantity
) {
  return `<div class="product">
    <div class="row">
        <div class="col-md-3">
            <img class="img-fluid mx-auto d-block image" src="${url}">
        </div>
        <div class="col-md-8">
            <div class="info">
                <div class="row">
                    <div class="col-md-5 product-name"> 
                        <div class="product-name">
                            <a href="#">${name}</a>
                            <div class="product-info">
                                <div>Departure: <span class="value">${departure}</span></div>
                                <div>Date: <span class="value">${date}</span></div>
                                <div>Category: <span class="value">${category}</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 quantity">
                        <label for="quantity">Quantity:</label>
                        <input class="form-control " type="number" id="quantity+${name}" value="${quantity}" />
                        <button type="button" onclick=updateAndRef("${id}",document.getElementById('quantity+${name}').value,document.getElementById('cart_id_2').value) class="btn btn-primary btn-lg btn-block">update</button>
                        </div>
                    <div class="col-md-3 price">
                        <span>${price * quantity}$</span>
                        <br>
                        <button type="button" onclick = deleteItem("${id}",document.getElementById('cart_id_2').value) class="btn btn-danger"><i class="fa fa-trash"></i></button>
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
}

//<input id="quantity" type="number" value =${quantity} onclick=updateAndRef("${id}") class="form-control quantity-input">
//          <input id="quantity" type="number" value =${quantity}  class="form-control quantity-input">

// class="form-control quantity-input">
// function loadCart(cart_id) {
//   console.log(cart_id);
// $("#items").empty();
// var arr_id;
// var arr_flight;
// $.get("/carts", function (data1, status) {
//   arr_id = data1[0].Products;
//   console.log(arr_id);

//   $.get("/allflights", function (data, status) {
//     arr_flight = data;
//     console.log(arr_flight);
//     var total = 0;
//     for (var j = 0; j < arr_id.length; j++) {
//       for (var i = 0; i < arr_flight.length; i++) {
//         if (arr_id[j].flight_id != arr_flight[i]._id) continue;

//         total += arr_id[j].Quantities * arr_flight[i].Price;
//         $("#items").append(
//           showOneProduct(
//             arr_flight[i]._id,
//             arr_flight[i].Name,
//             arr_flight[i].URL,
//             arr_flight[i].Departure,
//             arr_flight[i].Date,
//             arr_flight[i].Category,
//             arr_flight[i].Price,
//             arr_id[j].Quantities
//           )
//         );
//       }
//     }
//     $("#total").empty();
//     $("#total").append(total + "$");
//   });
// });
//}

function loadCartById(id) {
  console.log(id);
  $("#items").empty();
  var arr_id;
  var arr_flight;
  $.get("/carts", function (data1, status) {
    for (var l = 0; l < data1.length; l++) {
      if (data1[l]._id == id) {
        arr_id = data1[l].Products;
      }
    }
    console.log(arr_id);
    $.get("/allflights", function (data, status) {
      arr_flight = data;
      console.log(arr_flight);
      var total = 0;
      for (var j = 0; j < arr_id.length; j++) {
        for (var i = 0; i < arr_flight.length; i++) {
          if (arr_id[j].flight_id != arr_flight[i]._id) continue;

          total += arr_id[j].Quantities * arr_flight[i].Price;
          $("#items").append(
            showOneProduct(
              arr_flight[i]._id,
              arr_flight[i].Name,
              arr_flight[i].URL,
              arr_flight[i].Departure,
              arr_flight[i].Date,
              arr_flight[i].Category,
              arr_flight[i].Price,
              arr_id[j].Quantities
            )
          );
        }
      }
      $("#total").empty();
      $("#total").append(total + "$");
    });
  });
}

function deleteItem(_id, cart_id) {
  console.log(_id);
  console.log(cart_id);
  $.ajax({
    url: "http://localhost:8080/deleteItem",
    type: "DELETE",
    data: JSON.stringify({ _id: _id, cart_id: cart_id }),
    contentType: "application/json",
    dataType: "json",
    success: function () {
      console.log("request successfully!");
    },
  });
  loadCartById(cart_id);
}

// $(() => {
//   loadCart();
// });s
