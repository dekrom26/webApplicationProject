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
                        <input class="form-control " type="number" id="quantity" value="${quantity}" />
                        <button type="button" onclick=updateAndRef("${id}",document.getElementById('quantity').value) class="btn btn-primary btn-lg btn-block">Checkout</button>
                        </div>
                    <div class="col-md-3 price">
                        <span>${price * quantity}$</span>
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
function loadCart() {
  $("#items").empty();
  var arr_id;
  var arr_flight;
  $.get("/carts", function (data1, status) {
    arr_id = data1[0].Products;
    console.log(arr_id);

    $.get("/allflights", function (data, status) {
      arr_flight = data;
      console.log(arr_flight);
      for (var j = 0; j < arr_id.length; j++) {
        for (var i = 0; i < arr_flight.length; i++) {
          if (arr_id[j].flight_id != arr_flight[i]._id) continue;

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
    });
  });
}

$(() => {
  loadCart();
});
