const mongoose = require('mongoose');
const { collection } = require('./models/flights');
const Flights = require('./models/flights');


const seedFlight = [
    {
      Name:"dubai",
      URL:"imgs/dubai.jpg",
      Duration:12,
      Departure:"Israel",
      Arrivle:"Dubai",
      Price:600,
      Temperature:10,
      Continent:"northAmerica",
      Date:"2022-09-28",
      Category:"shopping",
      API:"25d2055d27",
    },

    {
      Name:"paris",
      URL:"imgs/france.jpg",
      Duration:14,
      Departure:"Israel",
      Arrivle:"paris",
      Price:800,
      Temperature:3,
      Continent:"europe",
      Date:"2022-09-28",
      Category:"shopping",
      API:"48d862d35",
    },
    {
      Name:"athens",
      URL:"imgs/greece.jpg",
      Duration:8,
      Departure:"Israel",
      Arrivle:"Athens",
      Price:900,
      Temperature:21,
      Continent:"europe",
      Date:"2022-09-28",
      Category:"shopping",
      API:"33d95n83d36",
    },
    {
      Name:"new-zealand",
      URL:"imgs/newZealand.jpg",
      Duration:8,
      Departure:"Wellington",
      Arrivle:"paris",
      Price:900,
      Temperature:21,
      Continent:"northAmerica",
      Date:"2022-09-28",
      Category:"shopping",
      API:"n40d90174d89",
    },

    {
      Name:"lisbon",
      URL:"imgs/portugal.jpg",
      Duration:5,
      Departure:"Israel",
      Arrivle:"Lisbon",
      Price:300,
      Temperature:25,
      Continent:"europe",
      Date:"2022-07-15",
      Category:"exotic",
      API:"38d72n9d14",
    },
    

    {
      Name:"madrid",
      URL:"imgs/spain.jpg",
      Duration:5,
      Departure:"Israel",
      Arrivle:"madrid",
      Price:400,
      Temperature:25,
      Continent:"europe",
      Date:"2022-09-21",
      Category:"shopping",
      API:"40d42n3d70",
    },

    {
      Name:"brasilia",
      URL:"imgs/brazil.jpg",
      Duration:14,
      Departure:"Israel",
      Arrivle:"Brasilia",
      Price:720,
      Temperature:25,
      Continent:"southAmerica",
      Date:"2022-01-13",
      Category:"nature",
      API:"n15d79n47d88",
    },

    
    {
      Name:"maldives",
      URL:"imgs/maldives.jpg",
      Duration:7,
      Departure:"Israel",
      Arrivle:"male",
      Price:800,
      Temperature:24,
      Continent:"asia",
      Date:"2022-11-02",
      Category:"sunbathing",
      API:"3d2073d22",
    },

    {
      Name:"albany",
      URL:"imgs/newyork.jpg",
      Duration:12,
      Departure:"Israel",
      Arrivle:"Albany",
      Price:850,
      Temperature:15,
      Continent:"northAmerica",
      Date:"2022-04-09",
      Category:"urban",
      API:"42d65n73d76",
    },

    {
      Name:"zanzibar",
      URL:"imgs/zanzibar.jpg",
      Duration:7,
      Departure:"Israel",
      Arrivle:"Stone Town",
      Price:450,
      Temperature:30,
      Continent:"africa",
      Date:"2022-03-02",
      Category:"exotic",
      API:"n6d1739d20",
    },

]
const seedDB= async ()=>{
    await Flights.deleteMany({});
    await Flights.insertMany(seedFlight);
    await Flights.aggregate( [
  {
    $group: {
      _id: "shopping",
       count: { $count: { } }
    }
  }
] )
    console.log("Seed file uploaded successfully")
}



exports.seedDB = seedDB
