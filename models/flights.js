const mongoose = require('mongoose');

const flightsSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Duration:{
    type:Number,
    require:true
    },
    Departure: {
        type: String,
        required: true
    },
    Arrivle: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true,
        min: 0
    },
    Temperature: {
        type: Number,
        required: true,
        min: 0
    },
    Continent: {
        type: String,
     
        enum: ['asia', 'africa', 'northAmerica','soutAmerica','europe']
        // type: String,
        // required: true
    },
    Date: {
        type: Date,
        required: true,
    },
    Category: {
        // type: String,
        // required: true
        type: String,
        enum: ['urban', 'exotic', 'nature','shopping','sunbathing']
    }
    

})

const Flights = mongoose.model('Flights', flightsSchema);

module.exports = Flights;