const path = require("path");
const mongoose = require("mongoose");
const Flights = require("./models/flights");
const seed = require("./seed");
const cors = require('cors');



var express = require("express"),
  app = express();
  app.use(cors());
  app.use(express.json());
 var http = require("http"),
  server = http.createServer(app),
  io = require("socket.io")(server);


server.listen(8080, () => {
  console.log("APP IS LISTENING ON PORT 8080!");
});

app.get("/", (req, res) => {
  res.sendFile(public);
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

seed.seedDB();

app.get("/flights", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "allFlights.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "home.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "chat.html"));
});

app.get("/master", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "master.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "login.html"));
});

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


app.get("/groupByContinent", async (req, res) => {
  const groupByContinent = await Flights.aggregate([{
    $group:{
      _id:"$Continent",
      total: {$sum:1}
    }
  }])
  res.json(groupByContinent);
});

app.get("/groupByCategory", async (req, res) => {
  const groupByCategory = await Flights.aggregate([{
    $group:{
      _id:"$Category",
      avg: {$avg:"$Price"}
    }
  }])
  res.json(groupByCategory);
});


app.put("/update", async (req, res) => {
  console.log(`${req.body.characteristic}`);
  console.log(`${req.body._id}`);
  console.log(`${req.body.value}`);
  var id=req.body._id;
  //switchcase
  switch(req.body.characteristic) {
    case "Name":
      await Flights.findByIdAndUpdate(id,{"Name":req.body.value});
      break;
      case "URL":
      await Flights.findByIdAndUpdate(id,{"URL":req.body.value});
      break;
      case "Duration":
      await Flights.findByIdAndUpdate(id,{"Duration":req.body.value});
      break;
      case "DepartureL":
      await Flights.findByIdAndUpdate(id,{"Departure":req.body.value});
      break;
      case "Arrivle":
      await Flights.findByIdAndUpdate(id,{"Arrivle":req.body.value});
      break;
      case "Price":
      await Flights.findByIdAndUpdate(id,{"Price":req.body.value});
      break;
      case "Temperature":
      await Flights.findByIdAndUpdate(id,{"Temperature":req.body.value});
      break;
      case "Date":
      await Flights.findByIdAndUpdate(id,{"Date":req.body.value});
      break;
      case "Continent":
      await Flights.findByIdAndUpdate(id,{"Continent":req.body.value});
      break;
      case "Category":
      await Flights.findByIdAndUpdate(id,{"Category":req.body.value});
      break;
      case "Rating":
      await Flights.findByIdAndUpdate(id,{"Rating":req.body.value});
      break;
      case "API":
      await Flights.findByIdAndUpdate(id,{"API":req.body.value});
      break;
      default:
  }

  // await Flights.findByIdAndUpdate(req.body._id,{characteristic}`:req.body.value});
  res.json({"status": 200});
})
// Name
// URL
// Duration
// Departure
// Arrivle
// Price
// Temperature
// Continent
//Date
// Category
// Rating
// API
app.post("/create", async (req, res) => {
  console.log(`${req.body.name}`);

  await Flights.create({ "Name": req.body.name,
  "URL":req.body.URL,
  "Duration":req.body.duration,
  "Departure":req.body.departure,
  "Arrivle":req.body.arrivle,
  "Price":req.body.price,
  "Temperature":req.body.temperature,
  "Continent":req.body.continent,
  "Date":req.body.date,
  "Category":req.body.category,
  "API":req.body.API,
 });
  res.json({"status": 200});
})


io.on("connection", (socket) => {
  console.log("Conection to socket.io");
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// app.get('/chat', function (req, res) {
//   res.sendFile(public + '/html/index.html');
// });

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