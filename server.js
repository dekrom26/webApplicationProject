const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Flights = require('./models/flights');
const { send } = require('process');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

var public = path.join(__dirname + "/public");
app.use("/",express.static(public));




mongoose.connect('mongodb://localhost:27017/Flights', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })
    

    app.get("/flights",async(req,res)=>{
        const flights = await Flights.find({})
        console.log(flights);
    })

    app.get("/",(req,res)=>
    {
       res.sendFile(public);
    });  
    // app.get('/cart', function (req, res) {
    //     res.sendfile(public + '/shoppingCart.html')
    //   });

      app.get('/chat', function (req, res) {
        res.sendFile(public + '/html/index.html');
      });
      

app.listen(8080, () => {
    console.log("APP IS LISTENING ON PORT 8080!")
})

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










