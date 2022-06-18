const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Flights = require('./models/flights');
const { send } = require('process');


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
    app.get('/cart', function (req, res) {
        res.sendfile(public + '/shoppingCart.html')
      });

app.listen(8080, () => {
    console.log("APP IS LISTENING ON PORT 8080!")
})
