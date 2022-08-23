function ShowOneUser(i,First,Last,Email){
    return `     <tr>
    <td>
      <img
        src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
        alt=""
      />
      <a href="#" class="user-link">${First} ${Last}</a>
      <span class="user-subhead">User</span>
    </td>
    <td>
      <a href="#">${Email}</a>
    </td>
    <td style="width: 20%">
   
    <span class="fa-stack">
    <button type="b utton" onclick=edituser("${i}",document.getElementById('FirstUserName${i}').value,document.getElementById('LastUserName${i}').value,document.getElementById('UserMail${i}').value) class="table-link text-info">
    <i class="fa fa-square fa-stack-2x"></i>
    <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>
    </button>
    </span>
   
    <span class="fa-stack">
    <button type="button" onclick=deleteuser(${i}) class="table-link danger">
    <i class="fa fa-square fa-stack-2x"></i>
    <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
    </button>
    </span>
    </td>

    <td><div class="form-field col-lg-6">
    <label for="FirstUserName${i}">First Name</label
    ><input
      class="input-text js-input"
      type="text"
      id="FirstUserName${i}"
      value=""
    />
    <br />
  </div>
  <div class="form-field col-lg-6">
    <label for="LastUserName${i}">Last Name</label
    ><input class="input-text js-input" type="text" id="LastUserName${i}" value="" />
  </div>
  <div class="form-field col-lg-6">
    <label for="UserMail${i}">User Mail</label
    ><input class="input-text js-input" type="email" id="UserMail${i}" value="" />
  </div>
    </td>
  </tr>`
    }

function edituser(i,first,last,email){
    $.get("/allusers", (data) => {
         _id = data[i]._id;
  


    $.ajax({
      url: "http://localhost:8080/updateUser",
      type: "POST",
      data: JSON.stringify({ _id: _id,
      first:first,
      last:last,
      email:email,}),
      contentType: "application/json",
      dataType: "json",
      success: function () {
        console.log("request successfully!");
      },
    });
    showAllUsers(); 
});
}


function search_user(fullname){
    $("#members").empty();
    $.get("/allusers", (data) => {
        for (var i = 0; i < data.length; i++) {
         var Full= data[i].FirstName+" "+data[i].LastName
         if(Full.toUpperCase()==fullname.toUpperCase()){
            $("#members").append(
                ShowOneUser(
                i,
                data[i].FirstName,
                data[i].LastName,
                data[i].Email,
              )
            );
         }
        }
    })
}

function deleteuser(i){
    $.get("/allusers", (data) => {
            var _id = data[i]._id;
        $.ajax({
          url: "http://localhost:8080/deleteUser",
          type: "DELETE",
          data: JSON.stringify({ _id: _id }),
          contentType: "application/json",
          dataType: "json",
          success: function () {
            console.log("request successfully!");
          },
        });
        showAllUsers(); 
    });
    }


    function Adminload(){
        return `<tr>
        <td>
          <img
            src="https://icons.veryicon.com/png/o/miscellaneous/yuanql/icon-admin.png"
            alt=""
          />
          <a href="#" class="user-link">Hadar Basson</a>
          <span class="user-subhead">Admin</span>
        </td>
        <td>
          <a href="#">admin@gmail.com</a>
        </td>
      </tr> `
    }

    function showAllUsers(){
        $("#members").empty();
        $("#members").append(Adminload());
     $.get("/allusers", function (data, status) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].FirstName !="Admin" && data[i].LastName !="Admin" ) {
        $("#members").append(
            ShowOneUser(
            i,
            data[i].FirstName,
            data[i].LastName,
            data[i].Email,
          )
        );
      }
    }
  });
    }


    $(() => {
        showAllUsers();
      });
      

