function register(first, last, email, pass, conpass) {

  var x=ifExists(email)
  console.log(x);

  if (first == "" || last == "" || pass == "" || conpass == "") {
    window.alert("Not all fields are filled, try again");
    return;
  }
  if ((pass != conpass) ) {
    
    window.alert("The password does not match, try again");
    return;
  } 

  
  else createUser(first, last, email, pass);
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

function ifExists(email){
  var x=5;
  var arr;
  $.get("/allusers", function (data, status) {
   arr=data;
   return arr ;
   

  });

  // for (var j = 0; j < arr.length; j++) {
  //   if ( arr[j].Email==email){
  //     console.log(arr[j].Email + "if")
  //     x=1;
  //    break;
  //   } 
  //   if ( j==(arr.length-1)){
  //     x=0;
  //    }
  // }
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
