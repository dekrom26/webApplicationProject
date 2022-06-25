const mongoose = require('mongoose');
const Flights = require('./models/flights');


const seedFlight = [
    {
      Name:"1",
      URL:"imgs/dubai.jpg",
      Duration:12,
      Departure:"Israel",
      Arrivle:"Dubai",
      Price:600,
      Temperature:10,
      // Continent:"northAmerica",
      Date:"2022-09-28",
      Category:"shopping",
    },

    {
      Name:"2",
      URL:"imgs/france.jpg",
      Duration:14,
      Departure:"Israel",
      Arrivle:"paris",
      Price:800,
      Temperature:3,
      // Continent:"northAmerica",
      Date:"2022-09-28",
      Category:"shopping",
    },
    {
      Name:"3",
      URL:"imgs/greece.jpg",
      Duration:8,
      Departure:"Israel",
      Arrivle:"paris",
      Price:900,
      Temperature:21,
      // Continent:"northAmerica",
      Date:"2022-09-28",
      Category:"shopping",
    },
    {
      Name:"4",
      URL:"imgs/newZealand.jpg",
      Duration:8,
      Departure:"Israel",
      Arrivle:"paris",
      Price:900,
      Temperature:21,
      // Continent:"northAmerica",
      Date:"2022-09-28",
      Category:"shopping",
    },

]

// [{"_id":"62a5db12d3649b6db876b912","Name":"F234Y","Duration":12,"Departure":"Israel","Arrivle":"New-York","Price":600,"Temperature":10,"Continent":"northAmerica","Date":"2022-09-28T00:00:00.000Z","Category":"shopping","__v":0}
// ,{"_id":"62a5db12d3649b6db876b913","Name":"V2G42","Duration":1,"Departure":"Israel","Arrivle":"Greece","Price":150,"Temperature":30,"Continent":"europe","Date":"2022-07-28T00:00:00.000Z","Category":"sunbathing","__v":0},
// {"_id":"62a5db12d3649b6db876b914","Name":"F244Y","Duration":12,"Departure":"New-York","Arrivle":"Israel","Price":600,"Temperature":30,"Continent":"europe","Date":"2022-10-04T00:00:00.000Z","Category":"shopping","__v":0},
// {"_id":"62a5db12d3649b6db876b915","Name":"V2G42","Duration":1,"Departure":"Israel","Arrivle":"Paris","Price":400,"Temperature":25,"Continent":"europe","Date":"2022-08-28T00:00:00.000Z","Category":"shopping","__v":0},
// {"_id":"62a5db12d3649b6db876b916","Name":"V2G42","Duration":1,"Departure":"Israel","Arrivle":"Thailand","Price":800,"Temperature":32,"Continent":"asia","Date":"2022-07-28T00:00:00.000Z","Category":"sunbathing","__v":0}]

const seedDB= async ()=>{
    await Flights.deleteMany({});
    await Flights.insertMany(seedFlight);
    console.log("Seed file uploaded successfully")

}

// seedDB().then(()=>{
//     console.log("Seed file uploaded successfully")
// });

exports.seedDB = seedDB
