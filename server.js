const path = require("path");
const mongoose = require("mongoose");
const { Flights, Users, Cart } = require("./models/flights");
const seed = require("./models/seed");
const cors = require("cors");
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
    console.log("MONGO CONNECTION TO FLIGHTS !!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO FLIGHTS CONNECTION ERROR!!!!");
    console.log(err);
  });
seed.seedDB();

app.get("/flights", (req, res) => {
  res.sendFile(
    path.join(__dirname, "/public", "view/allFlights/allFlights.html")
  );
});

app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "view/reg/registration.html"));
});
console.log(__dirname);

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "view/home/home.html"));
});
app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "view/cart/cart.html"));
});

app.get("/master", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "view/master/master.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/public", "view/login/login.html"));
});

app.get("/allflights", async (req, res) => {
  const flights = await Flights.find({});
  res.json(flights);
});

app.get("/allusers", async (req, res) => {
  const users = await Users.find({});
  res.json(users);
});

app.get("/carts", async (req, res) => {
  const carts = await Cart.find({});
  res.json(carts);
});

app.get("/order", async (req, res) => {
  const flights1 = await Flights.find().sort({ Price: 1 });
  res.json(flights1);
});

app.get("/groupByContinent", async (req, res) => {
  const groupByContinent = await Flights.aggregate([
    {
      $group: {
        _id: "$Continent",
        total: { $sum: 1 },
      },
    },
  ]);
  res.json(groupByContinent);
});

app.get("/groupByCategory", async (req, res) => {
  const groupByCategory = await Flights.aggregate([
    {
      $group: {
        _id: "$Category",
        avg: { $avg: "$Price" },
      },
    },
  ]);
  res.json(groupByCategory);
});

app.put("/update", async (req, res) => {
  console.log(`${req.body.characteristic}`);
  console.log(`${req.body._id}`);
  console.log(`${req.body.value}`);
  var id = req.body._id;
  switch (req.body.characteristic) {
    case "Name":
      await Flights.findByIdAndUpdate(id, { Name: req.body.value });
      break;
    case "URL":
      await Flights.findByIdAndUpdate(id, { URL: req.body.value });
      break;
    case "Duration":
      await Flights.findByIdAndUpdate(id, { Duration: req.body.value });
      break;
    case "DepartureL":
      await Flights.findByIdAndUpdate(id, { Departure: req.body.value });
      break;
    case "Arrivle":
      await Flights.findByIdAndUpdate(id, { Arrivle: req.body.value });
      break;
    case "Price":
      await Flights.findByIdAndUpdate(id, { Price: req.body.value });
      break;
    case "Temperature":
      await Flights.findByIdAndUpdate(id, { Temperature: req.body.value });
      break;
    case "Date":
      await Flights.findByIdAndUpdate(id, { Date: req.body.value });
      break;
    case "Continent":
      await Flights.findByIdAndUpdate(id, { Continent: req.body.value });
      break;
    case "Category":
      await Flights.findByIdAndUpdate(id, { Category: req.body.value });
      break;
    case "Rating":
      await Flights.findByIdAndUpdate(id, { Rating: req.body.value });
      break;
    case "API":
      await Flights.findByIdAndUpdate(id, { API: req.body.value });
      break;
    default:
  }

  res.json({ status: 200 });
});

app.post("/like", async (req, res) => {
  var new_rating = parseInt(req.body.rating);
  new_rating += 1;
  await Flights.findByIdAndUpdate(req.body._id, { Rating: new_rating });
  res.json({ status: 200 });
});

app.post("/unlike", async (req, res) => {
  var new_rating = parseInt(req.body.rating);
  new_rating -= 1;
  await Flights.findByIdAndUpdate(req.body._id, { Rating: new_rating });
  res.json({ status: 200 });
});

app.post("/addToCart", async (req, res) => {
  var cart_id = req.body.cart_id;
  obj = await Cart.findById(cart_id);
  var arr = obj.Products;
  var id_item = req.body._id;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].flight_id == id_item) {
      arr[i].Quantities++;
      await Cart.findByIdAndUpdate(cart_id, { Products: arr });
      return;
    }
  }
  arr.push({ flight_id: id_item, Quantities: 1 });
  await Cart.findByIdAndUpdate(cart_id, { Products: arr });

  res.json({ status: 200 });
});

app.post("/updatePrice", async (req, res) => {
  cart_id = req.body.cart_id;
  obj = await Cart.findById(cart_id);
  var arr = obj.Products;
  var id_item = req.body._id;
  var quantity_item = req.body.quantity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].flight_id == id_item) {
      arr[i].Quantities = quantity_item;
      await Cart.findByIdAndUpdate(cart_id, { Products: arr });
      return;
    }
  }

  res.json({ status: 200 });
});

app.post("/updateSales", async (req, res) => {
  var arr = req.body.arr;
  console.log(arr);
  var id;
  var q;
  var flight;
  var sales;
  for (let i = 0; i < arr.length; i++) {
    id = arr[i].flight_id;
    q = arr[i].Quantities;
    flight = await Flights.findById(id);
    sales = flight.Sales;
    sales += q;
    await Flights.findByIdAndUpdate(id, { Sales: sales });
  }
  res.json({ status: 200 });
});

app.post("/updateUser", async (req, res) => {
  console.log(req.body.first);
  var id = req.body._id;
  var User = await Users.findById(id);
  var FirstName = User.FirstName;
  var LastName = User.LastName;
  var Email = User.Email;
  if (req.body.first != "") FirstName = req.body.first;
  if (req.body.last != "") LastName = req.body.last;
  if (req.body.email != "") Email = req.body.email;

  await Users.findByIdAndUpdate(id, {
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
  });

  res.json({ status: 200 });
});

app.delete("/delete", async (req, res) => {
  var id = req.body._id;
  await Flights.findByIdAndDelete(id, { Name: req.body.value });
  res.json({ status: 200 });
});

app.delete("/deleteUser", async (req, res) => {
  console.log(req.body._id);
  var _id = req.body._id;
  await Users.findByIdAndDelete(_id);
  res.json({ status: 200 });
});

app.delete("/deleteCart", async (req, res) => {
  cart_id = req.body.cart_id;
  var arr = [];
  await Cart.findByIdAndUpdate(cart_id, { Products: arr });

  res.json({ status: 200 });
});

app.delete("/deleteItem", async (req, res) => {
  cart_id = req.body.cart_id;
  obj = await Cart.findById(cart_id);
  var arr = obj.Products;
  var id_item = req.body._id;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].flight_id === id_item) {
      arr.splice(i, 1);
      await Cart.findByIdAndUpdate(cart_id, { Products: arr });
    }
  }
  res.json({ status: 200 });
});

app.post("/create", async (req, res) => {
  console.log(`${req.body.name}`);

  await Flights.create({
    Name: req.body.name,
    URL: req.body.URL,
    Duration: req.body.duration,
    Departure: req.body.departure,
    Arrivle: req.body.arrivle,
    Price: req.body.price,
    Temperature: req.body.temperature,
    Continent: req.body.continent,
    Date: req.body.date,
    Category: req.body.category,
    API: req.body.API,
  });
  res.json({ status: 200 });
});

app.post("/createuser", async (req, res) => {
  var cart = await Cart.create({
    Products: [],
    FirstName: req.body.first,
    LastName: req.body.last,
  });
  var id_cart = cart._id;
  await Users.create({
    FirstName: req.body.first,
    LastName: req.body.last,
    Email: req.body.email,
    Password: req.body.pass,
    Cart_id: id_cart,
  });
  res.json({ status: 200 });
});

io.on("connection", (socket) => {
  console.log("Conection to socket.io");
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
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

let usersConnected = 0;

io.on("connection", (socket) => {
  console.log("user connected");
  usersConnected += 1;
  io.emit("users", `${usersConnected}`);

  socket.on("disconnect", () => {
    console.log("user disconnect");
    usersConnected -= 1;
    io.emit("users", `${usersConnected}`);
  });

  socket.on("message", (message) => {
    console.log(message);
  });
});
