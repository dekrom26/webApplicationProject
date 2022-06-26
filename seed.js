const mongoose = require('mongoose');
const { collection } = require('./models/flights');
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
      Continent:"northAmerica",
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
      Continent:"europe",
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
      Continent:"europe",
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
      Continent:"northAmerica",
      Date:"2022-09-28",
      Category:"shopping",
    },

    {
      Name:"5",
      URL:"imgs/portugal.jpg",
      Duration:5,
      Departure:"Israel",
      Arrivle:"Humberto Delgado",
      Price:300,
      Temperature:25,
      Continent:"europe",
      Date:"2022-07-15",
      Category:"exotic",
    },
    

    {
      Name:"6",
      URL:"imgs/spain.jpg",
      Duration:5,
      Departure:"Israel",
      Arrivle:"madrid",
      Price:400,
      Temperature:25,
      Continent:"europe",
      Date:"2022-09-21",
      Category:"shopping",
    },

    {
      Name:"7",
      URL:"imgs/brazil.jpg",
      Duration:14,
      Departure:"Israel",
      Arrivle:"rio de janeiro",
      Price:720,
      Temperature:25,
      Continent:"southAmerica",
      Date:"2022-01-13",
      Category:"nature",
    },

    
    {
      Name:"8",
      URL:"imgs/maldives.jpg",
      Duration:7,
      Departure:"Israel",
      Arrivle:"Velana International",
      Price:800,
      Temperature:24,
      Continent:"asia",
      Date:"2022-11-02",
      Category:"sunbathing",
    },

    {
      Name:"9",
      URL:"imgs/newyork.jpg",
      Duration:12,
      Departure:"Israel",
      Arrivle:"new york",
      Price:850,
      Temperature:15,
      Continent:"northAmerica",
      Date:"2022-04-09",
      Category:"urban",
    },

    {
      Name:"10",
      URL:"imgs/zanzibar.jpg",
      Duration:7,
      Departure:"Israel",
      Arrivle:"zanzibar",
      Price:450,
      Temperature:30,
      Continent:"africa",
      Date:"2022-03-02",
      Category:"exotic",
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
// let limit = Flights.collection.find({_id:"2"}).sort({ length: -1 }).limit(3);


// collection.find(query).sort({ length: -1 }).limit(3);
// collection.find(query).limit(3).sort({ length: -1 });

// seedDB().then(()=>{
//     console.log("Seed file uploaded successfully")
// });

exports.seedDB = seedDB
