function showitem(name, q, price) {
  return `<div class="d-flex justify-content-between">
    <span class="font-weight-bold">${name} (Qty:${q})</span>
    <span class="text-muted">${q * price}</span>
    </div>`;
}

function loadOrder() {
  $("#itemOrder").empty();
  var arr_id;
  var arr_flight;
  $.get("/carts", function (data1, status) {
    arr_id = data1[0].Products;
    console.log(arr_id);

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
      $("#totalorder").empty();
      $("#totalorder").append(total + "$");
    });
  });
}

function showHomePageandDelete() {
  $.ajax({
    url: "http://localhost:8080/deleteCart",
    type: "DELETE",
    data: JSON.stringify({}),
    contentType: "application/json",
    dataType: "json",
    success: function () {
      console.log("request successfully!");
    },
  });
  showHomePage();
}

$(() => {
  loadOrder();
});
