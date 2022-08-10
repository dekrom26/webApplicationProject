// const express = require('express');
// const app = express();
// const path = require('path');
// const mongoose = require('mongoose');


// const Flights = require('./models/Flights');



// mongoose.connect('mongodb://localhost:27017/Flights', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("MONGO CONNECTION OPEN!!!")
//     })
//     .catch(err => {
//         console.log("OH NO MONGO CONNECTION ERROR!!!!")
//         console.log(err)
//     })
    
//     // var public = path.join(__dirname + "/view");
//     // app.use(express.static('view'));
//     app.use("/",express.static(path.resolve(__dirname,"view")));

//     // app.get("/",(req,res) => {
//     //     res.sendFile(path.resolve(__dirname+"/view/public"));
//     // })
//     app.get("/",(request,response)=>{ 
//         response.sendFile(path.resolve(__dirname+"/view/public/index.html"));
//        });


    


// app.listen(8080, () => {
//     console.log("APP IS LISTENING ON PORT 8080!")
// })


