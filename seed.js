const mongoose = require("mongoose");
//const { collection } = require('./models/flights');
const { Flights, Users, Cart } = require("./models/flights");

const seedFlight = [
  {
    Name: "dubai",
    URL: "imgs/dubai.jpg",
    Duration: 12,
    Departure: "Israel",
    Arrivle: "Dubai",
    Price: 600,
    Temperature: 40,
    Continent: "asia",
    Date: "2022-09-28",
    Category: "shopping",
    Rating: 40,
    API: "25d2055d27",
    Sales: 15,
  },

  {
    Name: "paris",
    URL: "imgs/france.jpg",
    Duration: 14,
    Departure: "Israel",
    Arrivle: "paris",
    Price: 800,
    Temperature: 23,
    Continent: "europe",
    Date: "2022-08-12",
    Category: "shopping",
    Rating: 85,
    API: "48d862d35",
    Sales: 0,
  },
  {
    Name: "athens",
    URL: "imgs/greece.jpg",
    Duration: 8,
    Departure: "Israel",
    Arrivle: "Athens",
    Price: 900,
    Temperature: 34,
    Continent: "europe",
    Date: "2022-04-19",
    Category: "shopping",
    Rating: 35,
    API: "33d95n83d36",
    Sales: 0,
  },
  {
    Name: "new-zealand",
    URL: "imgs/newZealand.jpg",
    Duration: 8,
    Departure: "Wellington",
    Arrivle: "paris",
    Price: 900,
    Temperature: 14,
    Continent: "northAmerica",
    Date: "2022-12-20",
    Category: "nature",
    Rating: 60,
    API: "n40d90174d89",
    Sales: 0,
  },

  {
    Name: "lisbon",
    URL: "imgs/portugal.jpg",
    Duration: 5,
    Departure: "Israel",
    Arrivle: "Lisbon",
    Price: 300,
    Temperature: 25,
    Continent: "europe",
    Date: "2022-07-15",
    Category: "urban",
    Rating: 47,
    API: "38d72n9d14",
    Sales: 0,
  },

  {
    Name: "madrid",
    URL: "imgs/spain.jpg",
    Duration: 5,
    Departure: "Israel",
    Arrivle: "madrid",
    Price: 400,
    Temperature: 25,
    Continent: "europe",
    Date: "2022-11-21",
    Category: "shopping",
    Rating: 66,
    API: "40d42n3d70",
    Sales: 0,
  },

  {
    Name: "brasilia",
    URL: "imgs/brazil.jpg",
    Duration: 14,
    Departure: "Israel",
    Arrivle: "Brasilia",
    Price: 720,
    Temperature: 25,
    Continent: "southAmerica",
    Date: "2022-01-13",
    Category: "nature",
    Rating: 71,
    API: "n15d79n47d88",
    Sales: 0,
  },

  {
    Name: "maldives",
    URL: "imgs/maldives.jpg",
    Duration: 7,
    Departure: "Israel",
    Arrivle: "male",
    Price: 800,
    Temperature: 24,
    Continent: "asia",
    Date: "2022-05-02",
    Category: "sunbathing",
    Rating: 92,
    API: "3d2073d22",
    Sales: 0,
  },

  {
    Name: "albany",
    URL: "imgs/newyork.jpg",
    Duration: 12,
    Departure: "Israel",
    Arrivle: "Albany",
    Price: 850,
    Temperature: 15,
    Continent: "northAmerica",
    Date: "2022-04-09",
    Category: "urban",
    Rating: 15,
    API: "42d65n73d76",
    Sales: 0,
  },

  {
    Name: "zanzibar",
    URL: "imgs/zanzibar.jpg",
    Duration: 7,
    Departure: "Israel",
    Arrivle: "Stone Town",
    Price: 450,
    Temperature: 30,
    Continent: "africa",
    Date: "2022-03-02",
    Category: "exotic",
    Rating: 84,
    API: "n6d1739d20",
    Sales: 0,
  },
];

const seedUsers = [
  {
    Email: "admin@gmail.com",
    Password: "flight123",
  },
];

const seedCart = [
  {
    Products: [],
  },
];

//{ flight_id: "gf4544", Quantities: 5 }

const seedDB = async () => {
  await Flights.deleteMany({});
  await Flights.insertMany(seedFlight);

  await Users.deleteMany({});
  await Users.insertMany(seedUsers);

  await Cart.deleteMany({});
  await Cart.insertMany(seedCart);

  await Flights.aggregate([
    {
      $group: {
        _id: "shopping",
        count: { $count: {} },
      },
    },
  ]);
  console.log("Seed file uploaded successfully");
};

exports.seedDB = seedDB;
