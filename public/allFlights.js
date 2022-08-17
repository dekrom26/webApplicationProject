
 document.getElementById("myButton3").onclick= function(){
            $.get("/order",(data)=>{
          $("#text").empty();
          console.log(data);
          for (var i = 0; i < data.length; i++){
          const continent=data[i].Continent;
          const price=data[i].Price;
          const category=data[i].Category;
          const name=data[i].Name;
          let upName = data[i].Name.toUpperCase();
        $("#text").append(`<td><p><b>Name:</b> ${name}</p> <p><b>Price:</b> ${data[i].Price}$</p>
        <p><b>Duration:</b> ${data[i].Duration} hours</p><p><b>Departure:</b> ${data[i].Departure}</p>
        <p><b>Temperature:</b> ${data[i].Temperature} C</p><p><b>Date:</b> ${data[i].Date}</p>
        <p><b>Category:</b> ${data[i].Category}</p>
        <p><a class="weatherwidget-io" href="https://forecast7.com/en/${data[i].API}/${data[i].Name}/" data-label_1="${upName}" data-label_2="WEATHER" data-mode="Current" >WEATHER</a></p>
        `
        );
        var col = document.getElementById('text');
        col.innerHTML += '<button class="bag-btn" onclick="AddCart(' + i + ')">Add To Cart</button>';
        var like = document.getElementById('text');
        like.innerHTML += '<button class="like-btn" onclick="Like()"> <i class="fa fa-thumbs-up"></i></button>';
        var unlike = document.getElementById('text');
        unlike.innerHTML += '<button class="unlike-btn" onclick="UnLike()"> <i class="fa fa-thumbs-down"></i></button>';
    document.getElementById("text").innerHTML+=`<p><img id="image_`+i+`" class="center"/></p></td><hr><br>`;
      $("#image" + "_" + i).attr("src",data[i].URL);
      $("#image" + "_" + i).attr("width", "40%");
      $("#image" + "_" + i).attr("height", "40%"); 
          }
            });
          }



      var continentUser="";
      var priceUser="";
      var categoryUser="";
      var api="";
      document.getElementById("myButton1").onclick= function(){
        var priceUser=document.getElementById("price").value;//the price the user put.
        var categoryUser=document.getElementById("category").value;//the category the user put.
        var continentUser=document.getElementById("continent").value;//the contienet the user put.
        $.get("/allflights",(data)=>{
        $("#text").empty();
        for (var i = 0; i < data.length; i++){
        const continent=data[i].Continent;
        const price=data[i].Price;
        const category=data[i].Category;
        console.log(category);
       // debugger;
        if((continentUser=="all"||continent==continentUser) &&
         (categoryUser=="all"||category==categoryUser)){
          //priceUser=="all"||price==priceUser
          if(priceUser=="cheap" && price>=100)
          continue;

          if(priceUser=="regular" && (price<100 || price>=500))
          continue;

          if(priceUser=="expensive" && price<500)
          continue;
          let upName = data[i].Name.toUpperCase();
        const name=data[i].Name;
      $("#text").append(`<td><p><b>Name:</b> ${name}</p> <p><b>Price:</b> ${data[i].Price}$</p>
      <p><b>Duration:</b> ${data[i].Duration} hours</p><p><b>Departure:</b> ${data[i].Departure}</p>
      <p><b>Temperature:</b> ${data[i].Temperature} C</p><p><b>Date:</b> ${data[i].Date}</p>
      <p><b>Category:</b> ${data[i].Category}</p>
      <p><a class="weatherwidget-io" href="https://forecast7.com/en/${data[i].API}/${data[i].Name}/" data-label_1="${upName}" data-label_2="WEATHER" data-mode="Current" >WEATHER</a></p>
      `);
      var col = document.getElementById('text');
      col.innerHTML += '<button class="bag-btn" onclick="AddCart(' + i + ')">Add To Cart</button>';
      var like = document.getElementById('text');
      like.innerHTML += '<button class="like-btn" onclick="Like()"> <i class="fa fa-thumbs-up"></i></button>';
      var unlike = document.getElementById('text');
      unlike.innerHTML += '<button class="unlike-btn" onclick="UnLike()"> <i class="fa fa-thumbs-down"></i></button>';
  document.getElementById("text").innerHTML+=`<p><img id="image_`+i+`" class="center"/></p></td><hr><br>`;
    $("#image" + "_" + i).attr("src",data[i].URL);
    $("#image" + "_" + i).attr("width", "40%");
    $("#image" + "_" + i).attr("height", "40%"); 
  
   }
  }
});
        }



        // <option value="cold">Less than 15C</option>
        // <option value="regular">Between 15C and 24C</option>
        // <option value="hot">Over 24C</option>


    
        var startData = "";
        var endDate = "";
        var temperatureUser = "";
        var duration = 0;
        document.getElementById("myButton2").onclick= function(){
          var startData=document.getElementById("start").value;
          var endDate=document.getElementById("end").value;
          var temperatureUser = document.getElementById("temperature").value;
          var durationUser = document.getElementById("duration").value;
          $.get("/allflights",(data)=>{
          $("#text").empty();
          console.log(data);
          for (var i = 0; i < data.length; i++){
          const Temperature=data[i].Temperature;
          const date=data[i].Date;
          const duration = data[i].Duration;
          console.log(temperatureUser);
          console.log(Temperature);
          console.log(date);
          if(date>startData && date<endDate){
            if((temperatureUser=="cold"&& Temperature >=15) || (durationUser=="short" && duration>=4))
            continue;
            if((temperatureUser=="regular"&& (Temperature <15 || Temperature>=25)) || (durationUser=="med" && (duration<4 || duration >=6)))
            continue;
            if((temperatureUser=="hot"&& Temperature <25) || (durationUser=="long" && duration<6))
            continue;
            let upName = data[i].Name.toUpperCase();
          const name=data[i].Name;
        $("#text").append(`<td><p><b>Name:</b> ${name}</p> <p><b>Price:</b> ${data[i].Price}$</p>
        <p><b>Duration:</b> ${data[i].Duration} hours</p><p><b>Departure:</b> ${data[i].Departure}</p>
        <p><b>Temperature:</b> ${data[i].Temperature} C</p><p><b>Date:</b> ${data[i].Date}</p>
        <p><b>Category:</b> ${data[i].Category}</p>
        <p><a class="weatherwidget-io" href="https://forecast7.com/en/${data[i].API}/${data[i].Name}/" data-label_1="${upName}" data-label_2="WEATHER" data-mode="Current" >WEATHER</a></p>
        `);
        var col = document.getElementById('text');
        col.innerHTML += '<button class="bag-btn" onclick="AddCart(' + i + ')">Add To Cart</button>';
        var like = document.getElementById('text');
        like.innerHTML += '<button class="like-btn" onclick="Like()"> <i class="fa fa-thumbs-up"></i></button>';
        var unlike = document.getElementById('text');
        unlike.innerHTML += '<button class="unlike-btn" onclick="UnLike()"> <i class="fa fa-thumbs-down"></i></button>';
    document.getElementById("text").innerHTML+=`<p><img id="image_`+i+`" class="center"/></p></td><hr><br>`;
      $("#image" + "_" + i).attr("src",data[i].URL);
      $("#image" + "_" + i).attr("width", "40%");
      $("#image" + "_" + i).attr("height", "40%"); 
    
     }
    }
  });
          }


// if(date>startData && data<endDate){







      !function (d,s,id){
                    var js,fjs=d.getElementsByTagName(s)[0];
                    if(!d.getElementById(id)){
                        js=d.createElement(s);
                        js.id=id;
                        js.src='https://weatherwidget.io/js/widget.min.js';
                        fjs.parentNode.insertBefore(js,fjs);
                    }
                }(document,'script','weatherwidget-io-js');


            
                

function ClearDiv(){
    document.getElementById("text").innerHTML = ``;
}
function getAllFlights(){
  $.get("/allflights",(data)=>{
    $("#text").empty();
    for (var i = 0; i < data.length; i++){
    const name=data[i].Name;
    let upName = data[i].Name.toUpperCase();
    $("#text").append(`<td><p><b>Name:</b> ${name}</p> <p><b>Price:</b> ${data[i].Price}$</p>
        <p><b>Duration:</b> ${data[i].Duration} hours</p><p><b>Departure:</b> ${data[i].Departure}</p>
        <p><b>Temperature:</b> ${data[i].Temperature} C</p><p><b>Date:</b> ${data[i].Date}</p>
        <p><b>Category:</b> ${data[i].Category}</p>
        <p><a class="weatherwidget-io" href="https://forecast7.com/en/${data[i].API}/${data[i].Name}/" data-label_1="${upName}" data-label_2="WEATHER" data-mode="Current" >WEATHER</a><p>

          `);
          var col = document.getElementById('text');
          col.innerHTML += '<button class="bag-btn" onclick="AddCart(' + i + ')">Add To Cart</button>';
        var like = document.getElementById('text');
        like.innerHTML += '<button class="like-btn" onclick="Like()"> <i class="fa fa-thumbs-up"></i></button>';
        var unlike = document.getElementById('text');
        unlike.innerHTML += '<button class="unlike-btn" onclick="UnLike()"> <i class="fa fa-thumbs-down"></i></button>';
    document.getElementById("text").innerHTML+=`<p><img id="image_`+i+`" class="center"/></p></td><hr><br>`;
      $("#image" + "_" + i).attr("src",data[i].URL);
      $("#image" + "_" + i).attr("width", "40%");
      $("#image" + "_" + i).attr("height", "40%"); 
    }
  });

  }

  function GroupByContinent() {
    $("#text").empty();
    $("#text").append(`<p>The number of flights on each continent:</p><br>`)
    $.get("/groupByContinent", function (data, status) {
        for (let i = 0; i < data.length; i++) {
          $("#text").append(`<p id="name"><b><Continent:</b> ${data[i]._id}:${data[i].total}</p>`);
        }
    });
  }

  function GroupByCategory() {
    $("#text").empty();
    $("#text").append(`<p>Average flight ticket by category:</p><br>`)
    $.get("/groupByCategory", function (data, status) {
        for (let i = 0; i < data.length; i++) {
          $("#text").append(`<p id="name"><b><Category:</b> ${data[i]._id}:${data[i].avg}$</p>`);
        }
    });
  }

  
  ///groupByCategory

  //get("/groupByContinent"

  // $("#text").append(`<p id="proname"><b><Company:</b></font> ${data[i]._id}:${data[i].total}</p>`);









  var indexes = [];
  function AddCart(i) {
      let index = i;
      console.log(i);
      keepGood = 0;
      $.get("/allflights", function (data, status) {
        // localStorage.setItem(i)
          console.log(i);
          if (indexes[i] == 1) {
              console.log("Second Time");
              PlusQuantity(i);
          }
          if (indexes[i] == undefined) {
              document.getElementById("app").getElementsByClassName("cart-product-title")[0].innerHTML += `<div class="item_` + i + `"><p><b><Company:</b></font> ${data[i].Name}<b></p><p>Price:</b>${data[i].Price}$</p></div>`;
              document.getElementById("app").getElementsByClassName("cart-product-title")[0].innerHTML += `<div class="item_` + i + `"><p><img id="img_` + i + `" class="center"/></p></div>`;
              $("#img" + "_" + i).attr("src", data[i].URL);
              $("#img" + "_" + i).attr("width", "150px");
              $("#img" + "_" + i).attr("height", "100px");
              document.getElementById("app").getElementsByClassName("cart-product-title")[0].innerHTML += `<div class="item_` + i + `"><button id="botton_` + i + `" onclick="Remove(` + i + `)">Remove</button></div><br>`;
              document.getElementById("app").getElementsByClassName("cart-product-title")[0].innerHTML += `<div class="item_` + i + `"><button class="btn minus-btn" type="button" onclick="MinusQuantity(` + i + `)">-</button><div class="pin_` + i + `">1</div>
              <button class="btn plus-btn" type="button" onclick="PlusQuantity(` + i + `)">+</button>`;
              let sum = parseInt(document.getElementById("app").getElementsByClassName("cart-total")[0].innerHTML) + data[i].Price;
              document.getElementById("app").getElementsByClassName("cart-total")[0].innerHTML = sum;
              console.log("the sum" + sum);
              indexes[i] = 1;
          }
          if (indexes[i] != undefined && indexes[i] != 1) {
              document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[0].innerHTML += `<p><b><Company:</b></font> ${data[i].Name}<b></p><p>Price:</b>${data[i].Price}$</p>`;
              document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[1].innerHTML += `<p><img id="img_` + i + `" class="center"/></p>`;
              $("#img" + "_" + i).attr("src", data[i].URL);
              $("#img" + "_" + i).attr("width", "150px");
              $("#img" + "_" + i).attr("height", "100px");
              document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[2].innerHTML += `<button id="botton_` + i + `" onclick="Remove(` + i + `)">Remove</button></div>`;
              document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].innerHTML += `<div class="item_` + i + `"><button class="btn minus-btn" type="button" onclick="MinusQuantity(` + i + `)">-</button> <div class="pin_` + i + `">1</div>
              <button class="btn plus-btn" type="button" onclick="PlusQuantity(` + i + `)">+</button>`;
              let sum = parseInt(document.getElementById("app").getElementsByClassName("cart-total")[0].innerHTML) + parseInt(data[i].Price);
              document.getElementById("app").getElementsByClassName("cart-total")[0].innerHTML = sum;
              console.log("the sum" + sum);
              indexes[i] = 1;
  
          }
  
      });
  }
  function Remove(i) {
      if (indexes[i] == 1) {
          indexes[i] = 0;
      }
      let Quantity = parseInt(document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].getElementsByClassName("pin_" + i)[0].innerHTML);
      document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[0].innerHTML = "";
      document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[1].innerHTML = "";
      document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[2].innerHTML = "";
      document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].innerHTML = "";
      $.get("/allflights", function (data, status) {
          let sum = parseInt(document.getElementById("app").getElementsByClassName("cart-total")[0].innerHTML) - (parseInt(data[i].Price) * Quantity);
          document.getElementById("app").getElementsByClassName("cart-total")[0].innerHTML = sum;
          console.log("the sum" + sum);
      });
  
  
  
  
  }
  function MinusQuantity(i) {
      let value = parseInt(document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].getElementsByClassName("pin_" + i)[0].innerHTML);
      if (value == 1)
          Remove(i);
      else {
          $.get("/allflights", function (data, status) {
              let sum = parseInt(document.getElementById("app").getElementsByClassName("cart-total")[0].innerHTML) - parseInt(data[i].Price);
              document.getElementById("app").getElementsByClassName("cart-total")[0].innerHTML = sum;
              --value;
              // alert(value);
              document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].getElementsByClassName("pin_" + i)[0].innerHTML = value;
          });
      }
  
  
  }
  function PlusQuantity(i) {
      let value = parseInt(document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].getElementsByClassName("pin_" + i)[0].innerHTML);
      $.get("/allflights", function (data, status) {
          let sum = parseInt(document.getElementById("app").getElementsByClassName("cart-total")[0].innerHTML) + parseInt(data[i].Price);
          document.getElementById("app").getElementsByClassName("cart-total")[0].innerHTML = sum;
          ++value;
          // alert(value);
          document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].getElementsByClassName("pin_" + i)[0].innerHTML = value;
      });
  }
    $.get("/allflights", function (data, status) {
         for (let i = 0; i < data.length; i++) {
            if (indexes[i] == 1) {
                let value = parseInt(document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].getElementsByClassName("pin_" + i)[0].innerHTML);
                localStorage.setItem('testObject', JSON.stringify(value));
            }
        }
    });

  
  // Retrieve the object from storage
  var retrievedObject = localStorage.getItem('testObject');
  
  console.log('retrievedObject: ', JSON.parse(retrievedObject));


  function BuyNow() {
    // document.getElementById("app").getElementsByClassName("cart")[0].getElementsByClassName("userAlert")[0].innerHTML = "";
    // document.getElementById("app").getElementsByClassName("cart")[0].getElementsByClassName("userAlert2")[0].innerHTML = "";
    // let fileduserID = document.getElementById("app").getElementsByClassName("cart")[0].getElementsByClassName("un")[0].value;
    // let filedPrice = document.getElementById("app").getElementsByClassName("cart-total")[0].innerHTML;
    // if (fileduserID == "") {
    //     document.getElementById("app").getElementsByClassName("cart")[0].getElementsByClassName("userAlert")[0].innerHTML = "This is Required Filed" + `<br>`;
    // }
    // if (filedPrice == "0") {
    //     document.getElementById("app").getElementsByClassName("cart")[0].getElementsByClassName("userAlert2")[0].innerHTML = " Your Cart is Empty";
    // }
    // var user = fileduserID;

    $.get("/allflights", function (data, status) {
        for (let i = 0; i < data.length; i++) {
            if (indexes[i] == 1) {
               // let value = parseInt(document.getElementById("app").getElementsByClassName("cart-product-title")[0].getElementsByClassName("item_" + i)[3].getElementsByClassName("pin_" + i)[0].innerHTML);
               $.ajax({
                url: "http://localhost:8080/buy",
                type: "POST",
                data: JSON.stringify({ "productName":data[i].Name,
                    "price":data[i].Price}),
                contentType: "application/json",
                dataType: "json",
                success: function() {
                  console.log("request successfully!");
                  //window.alert("successfully updated");
                }
              });
              //  $.post("http://localhost:8080/buy", {productName: data[i].Name, price: data[i].Price}, function (data) {
              //   });

// <<<<<<< HEAD
            }
        }
    });
}

// =======
function Like(){
    console.log("like");
}
 function UnLike(){
     console.log("unlike");
 }
// >>>>>>> 32553a0df3e97733761fa7f5aed807be0b62edde

function BuyNow() {
  var arr = [];
  var count=0;
 $.get("/allflights", function (data, status) {
        for (let i = 0; i < data.length; i++) {
            if (indexes[i] == 1) {
              count+=data[i].Price;
              arr.push(data[i].Name);
            }
        }

        $.ajax({
          url: "http://localhost:8080/buy",
          type: "POST",
          data: JSON.stringify({ "arr":arr,
              "count":count}),
          contentType: "application/json",
          dataType: "json",
          success: function() {
            console.log("request successfully!");
            //window.alert("successfully updated");
          }
        });
    });
  }

$(() => {
        getAllFlights();
});
    