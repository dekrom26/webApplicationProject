// const express = require('express');
const bodyParser=require('body-parser')
// const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Flights = require('./models/flights');
const { send } = require('process');
// const http = require('http');
const socket = require("socket.io-client")("https://example.com");
const seed=require('./seed')
// const server = http.createServer(app);
// const io = require('socket.io')(server);



var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io')(server);

server.listen(3030, () => {
  console.log("APP IS LISTENING ON PORT 8080!")
})

var public = path.join(__dirname + "/public");
app.use("/",express.static(public));



mongoose.connect('mongodb://localhost:27017/Flights', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    },()=>{ 
  seed.seedDB();
  })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })
    
    
    app.get("/flights",(req,res)=>{
      res.sendFile(path.join(__dirname, '/public', 'allFlights.html'));
    })

    app.get("/allflights",async(req,res)=>{
        const flights = await Flights.find({})
        // console.log(flights);
        res.json(flights);
        // res.send(flights);
    })

    app.get("/",(req,res)=>
    {
       res.sendFile(public);
    });  

    io.on('connection', socket => {
      console.log('Conection to socket.io');
      socket.on('message', ({ name, message }) => {
        io.emit('message', { name, message })
      })
    });

    // io.on('connection', (socket) => {
    //   console.log('a user connected');
    // });

      app.get('/chat', function (req, res) {
        res.sendFile(public + '/html/index.html');
      });
      
      // C:\Users\97252\OneDrive\מסמכים\GitHub\webApplicationProject\public\chat\shoppingCart.html
      app.get('/cart', function (req, res) {
        res.sendFile(public + '/cart/shoppingCart.html');
      });

    //   const seedFlight = [
    //     {
    //       Name:"F234Y",
    //       URL:"imgs/dubai.jpg",
    //       Duration:12,
    //       Departure:"Israel",
    //       Arrivle:"New-York",
    //       Price:600,
    //       Temperature:10,
    //       Continent:"northAmerica",
    //       Date:"2022-09-28",
    //       Category:"shopping"
    //     },
    // ]

    // // [{"_id":"62a5db12d3649b6db876b912","Name":"F234Y","Duration":12,"Departure":"Israel","Arrivle":"New-York","Price":600,"Temperature":10,"Continent":"northAmerica","Date":"2022-09-28T00:00:00.000Z","Category":"shopping","__v":0}
    // // ,{"_id":"62a5db12d3649b6db876b913","Name":"V2G42","Duration":1,"Departure":"Israel","Arrivle":"Greece","Price":150,"Temperature":30,"Continent":"europe","Date":"2022-07-28T00:00:00.000Z","Category":"sunbathing","__v":0},
    // // {"_id":"62a5db12d3649b6db876b914","Name":"F244Y","Duration":12,"Departure":"New-York","Arrivle":"Israel","Price":600,"Temperature":30,"Continent":"europe","Date":"2022-10-04T00:00:00.000Z","Category":"shopping","__v":0},
    // // {"_id":"62a5db12d3649b6db876b915","Name":"V2G42","Duration":1,"Departure":"Israel","Arrivle":"Paris","Price":400,"Temperature":25,"Continent":"europe","Date":"2022-08-28T00:00:00.000Z","Category":"shopping","__v":0},
    // // {"_id":"62a5db12d3649b6db876b916","Name":"V2G42","Duration":1,"Departure":"Israel","Arrivle":"Thailand","Price":800,"Temperature":32,"Continent":"asia","Date":"2022-07-28T00:00:00.000Z","Category":"sunbathing","__v":0}]
    
    // Flights.insertMany(seedFlight)
    //     .then(res => {})
    //     .catch(e => {
    //         console.log(e)
    //     });


    ///////////////

// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'))


// app.get('/products', async (req, res) => {
//     const { category } = req.query;
//     if (category) {
//         const products = await Product.find({ category })
//         res.render('products/index', { products, category })
//     } else {
//         const products = await Product.find({})
//         res.render('products/index', { products, category: 'All' })
//     }
// })

// app.get('/products/new', (req, res) => {
//     res.render('products/new', { categories })
// })

// app.post('/products', async (req, res) => {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     res.redirect(`/products/${newProduct._id}`)
// })

// app.get('/products/:id', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findById(id)
//     res.render('products/show', { product })
// })

// app.get('/products/:id/edit', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     res.render('products/edit', { product, categories })
// })

// app.put('/products/:id', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
//     res.redirect(`/products/${product._id}`);
// })

// app.delete('/products/:id', async (req, res) => {
//     const { id } = req.params;
//     const deletedProduct = await Product.findByIdAndDelete(id);
//     res.redirect('/products');
// })





// socket.on("connect_error", (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });



// server.listen(8080, () => {
//     console.log("APP IS LISTENING ON PORT 8080!")
// })

var usernames = {};

io.sockets.on('connection', function (socket) {
console.log("connect1");
//socket.emit('connect',function(){
  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function (data) {
	  console.log("sendCHAT1");
    // we tell the client to execute 'updatechat' with 2 parameters
    io.sockets.emit('updatechat', socket.username, data);
  //});
});
  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(username){
	  console.log("adduser1");
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    // echo to client they've connected
    socket.emit('updatechat', 'SERVER', 'you have connected');
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
    // update the list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function(){
	  console.log("disconnect");
    // remove the username from global usernames list
    delete usernames[socket.username];
    // update list of users in chat, client-side
    io.sockets.emit('updateusers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
  });
});










