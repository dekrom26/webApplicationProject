const mongoose = require("mongoose");

// Flight Modal Schema
const flightsSchema = new mongoose.Schema({
  Name: {
    type: String,
    // required: true
  },
  URL: {
    type: String,
    // required: true
  },
  Duration: {
    type: Number,
    // require:true
  },
  Departure: {
    type: String,
    // required: true
  },
  Arrivle: {
    type: String,
    // required: true
  },
  Price: {
    type: Number,
    // required: true,
    min: 0,
  },
  Temperature: {
    type: Number,
    // required: true,
    min: 0,
  },
  Continent: {
    type: String,

    enum: ["asia", "africa", "northAmerica", "southAmerica", "europe"],
    // type: String,
    // required: true
  },
  Date: {
    type: String,
    // required: true,
  },
  Category: {
    // type: String,
    // required: true
    type: String,
    enum: ["urban", "exotic", "nature", "shopping", "sunbathing"],
  },
  Rating: {
    type: Number,
    //    required:true,
    min: 0,
  },
  API: {
    type: String,
  },
  Sales: {
    type: Number,
    min: 0,
  },
  Coords: {
    lat: Number,
    lng: Number,
  },
});

// User Modal Schema
const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    // required: true
  },
  LastName: {
    type: String,
    // required: true
  },
  Email: {
    type: String,
    // required: true
  },
  Password: {
    type: String,
    // required: true
  },
  Cart_id: {
    type: String,
  },
});

// Cart Modal Schema
const CartSchema = new mongoose.Schema({
  //     Products: [{
  //     Name:String
  //     }]
  // ,
  Products: [
    {
      flight_id: String,
      Quantities: Number,
    },
  ],

  FirstName: {
    type: String,
    // required: true
  },
  LastName: {
    type: String,
    // required: true
  },
  //experience: [{ body: String, date: Date }],
});

const Flights = mongoose.model("Flights", flightsSchema);
const Users = mongoose.model("Users", UserSchema);
const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Flights, Users, Cart };
