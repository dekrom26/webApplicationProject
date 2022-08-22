function showitem(name, q, price) {
  return `<div class="d-flex justify-content-between">
    <span class="font-weight-bold">${name} (Qty:${q})</span>
    <span class="text-muted">${q * price}</span>
    </div>`;
}

function DeleteCart(cart_id) {
  $.ajax({
    url: "http://localhost:8080/deleteCart",
    type: "DELETE",
    data: JSON.stringify({ cart_id: cart_id }),
    contentType: "application/json",
    dataType: "json",
    success: function () {
      console.log("request successfully!");
    },
  });
}

// $(() => {
//   loadOrder();
// });
