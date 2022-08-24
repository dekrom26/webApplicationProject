function register(first, last, email, pass, conpass) {

  var x;
  $.get("/allusers", (data) => {
    for (var i = 0; i < data.length; i++) {
       if(data[i].Email==email){
          window.alert("The email exists in the system, try again");
          return;
       }
       
    }
  
   if (first == "" || last == "" || pass == "" || conpass == "") {
    window.alert("Not all fields are filled, try again");
    return;
  }
  if ((pass != conpass) ) {
    
    window.alert("The password does not match, try again");
    return;
  } 

  else createUser(first, last, email, pass);
  
  });

 
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
  getCardId(first, last);
}



function getCardId(first, last) {
  $.get("/allusers", function (data, status) {
    for (var j = 0; j < data.length; j++) {
      if (data[j].FirstName == first && data[j].LastName == last) {
        var CartId = data[j].Cart_id;
        window.alert(
          "You have successfully registered! your CartId is:  " +
            CartId +
            " " +
            "  (please save it to continue)   "
        );
      }
    }
  });
  showFlightPage();
}
