function showOneProduct(name, url, departure, date, category, price) {
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
                        <input id="quantity" type="number" value ="1" class="form-control quantity-input">
                    </div>
                    <div class="col-md-3 price">
                        <span>${price}$</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
}

$(() => {
  $("#items").empty();
  $.get("/allflights", function (data, status) {
    for (var i = 0; i < data.length; i++) {
      $("#items").append(
        showOneProduct(
          data[i].Name,
          data[i].URL,
          data[i].Departure,
          data[i].Date,
          data[i].Category,
          data[i].Price
        )
      );
    }
  });
});
