function register(first, last, email, pass, conpass) {
  if (first == "" || last == "" || pass == "" || conpass == "") {
    window.alert("Not all fields are filled, try again");
    return;
  }
  if (pass != conpass) {
    window.alert("The password does not match, try again");
    return;
  } else createUser(first, last, email, pass);
}

function createUser(first, last, email, pass) {
  $.ajax({
    url: "http://localhost:8080/createuser",
    type: "POST",
    data: JSON.stringify({
      first: first,
      last: last,
      email: email,
      pass: pass,
    }),
    contentType: "application/json",
    dataType: "json",
    success: function () {
      console.log("request successfully!");
      //   window.alert("You have successfully registered!");
    },
  });
  showFlightPage();
}
