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
    },
    {
      Name:"Athens",
      URL:"imgs/greece.jpg",
      Duration:8,
      Departure:"Israel",
      Arrivle:"Athens",
      Price:900,
      Temperature:21,
      Continent:"europe",
      Date:"2022-09-28",
      Category:"shopping",
    },
    {
      Name:"Wellington",
      URL:"imgs/newZealand.jpg",
      Duration:8,
      Departure:"Wellington",
      Arrivle:"paris",
      Price:900,
      Temperature:21,
      Continent:"northAmerica",
      Date:"2022-09-28",
      Category:"shopping",
    },

    {
      Name:"Lisbon",
      URL:"imgs/portugal.jpg",
      Duration:5,
      Departure:"Israel",
      Arrivle:"Lisbon",
      Price:300,
      Temperature:25,
      Continent:"europe",
      Date:"2022-07-15",
      Category:"exotic",
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
    },

    {
      Name:"Brasilia",
      URL:"imgs/brazil.jpg",
      Duration:14,
      Departure:"Israel",
      Arrivle:"Brasilia",
      Price:720,
      Temperature:25,
      Continent:"southAmerica",
      Date:"2022-01-13",
      Category:"nature",
    },

    
    {
      Name:"male",
      URL:"imgs/maldives.jpg",
      Duration:7,
      Departure:"Israel",
      Arrivle:"male",
      Price:800,
      Temperature:24,
      Continent:"asia",
      Date:"2022-11-02",
      Category:"sunbathing",
    },

    {
      Name:"Albany",
      URL:"imgs/newyork.jpg",
      Duration:12,
      Departure:"Israel",
      Arrivle:"Albany",
      Price:850,
      Temperature:15,
      Continent:"northAmerica",
      Date:"2022-04-09",
      Category:"urban",
    },

    {
      Name:"Stone Town",
      URL:"imgs/zanzibar.jpg",
      Duration:7,
      Departure:"Israel",
      Arrivle:"Stone Town",
      Price:450,
      Temperature:30,
      Continent:"africa",
      Date:"2022-03-02",
      Category:"exotic",
    },

]
const seedDB= async ()=>{
    await Flights.deleteMany({});
    await Flights.insertMany(seedFlight);
    console.log("Seed file uploaded successfully")
}


exports.seedDB = seedDB
