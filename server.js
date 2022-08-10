
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const Flights = require("./models/flights");
const { send } = require("process");
const socket = require("socket.io-client")("https://example.com");
const seed = require("./seed");
var express = require("express"),
  app = express(),
  http = require("http"),
  server = http.createServer(app),
  io = require("socket.io")(server);

server.listen(7000, () => {
  console.log("APP IS LISTENING ON PORT 7000!");
});

var public = path.join(__dirname + "/public");
app.use("/", express.static(public));

mongoose
  .connect("mongodb://localhost:27017/Flights", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });



  app.get("/blabla",async(req,res)=>{
    const blabla = await Flights.aggregate( [
      {
        $group: {
          _id: "$Continent",totalPrice:{$sum :"$Price"}
        }
      }
    ] )
    console.log(blabla);
  res.json(blabla);
})


    app.get("/",(req,res)=>
    {
       res.sendFile(public);
    });  
seed.seedDB();


app.get("/flights", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/allFlights", "allFlights.html"));
});

// app.get("/Home", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public", "index.html"));
// });

app.get("/allflights", async (req, res) => {
  const flights = await Flights.find({});
  res.json(flights);
  // res.send(flights);
  //
});

app.get("/order", async (req, res) => {
  const flights1 = await Flights.find().sort({ Price: 1 });
  res.json(flights1);
});

app.get("/", (req, res) => {
  res.sendFile(public);
});

io.on("connection", (socket) => {
  console.log("Conection to socket.io");
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

app.get("/chat", function (req, res) {
  res.sendFile(public + "/html/index.html");
});

// C:\Users\97252\OneDrive\מסמכים\GitHub\webApplicationProject\public\chat\shoppingCart.html
app.get("/cart", function (req, res) {
  res.sendFile(public + "/cart/shoppingCart.html");
});

app.get("/allcart", async (req, res) => {
  const flights = await Flights.find({});
  res.json(flights);
});




var usernames = {};

io.sockets.on("connection", function (socket) {
  console.log("connect1");
  //socket.emit('connect',function(){
  // when the client emits 'sendchat', this listens and executes
  socket.on("sendchat", function (data) {
    console.log("sendCHAT1");
    // we tell the client to execute 'updatechat' with 2 parameters
    io.sockets.emit("updatechat", socket.username, data);
    //});
  });
  // when the client emits 'adduser', this listens and executes
  socket.on("adduser", function (username) {
    console.log("adduser1");
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    // echo to client they've connected
    socket.emit("updatechat", "SERVER", "you have connected");
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit("updatechat", "SERVER", username + " has connected");
    // update the list of users in chat, client-side
    io.sockets.emit("updateusers", usernames);
  });

  // when the user disconnects.. perform this
  socket.on("disconnect", function () {
    console.log("disconnect");
    // remove the username from global usernames list
    delete usernames[socket.username];
    // update list of users in chat, client-side
    io.sockets.emit("updateusers", usernames);
    // echo globally that this client has left
    socket.broadcast.emit(
      "updatechat",
      "SERVER",
      socket.username + " has disconnected"
    );
  });
});

// server.listen(8080, () => {
//   console.log("APP IS LISTENING ON PORT 8080!")
// })
