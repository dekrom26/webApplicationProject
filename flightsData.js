// const mongoose = require('mongoose');
// const Product = require('./models/Flights');

// mongoose.connect('mongodb://localhost:27017/Flights', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("MONGO CONNECTION OPEN!!!")
//     })
//     .catch(err => {
//         console.log("OH NO MONGO CONNECTION ERROR!!!!")
//         console.log(err)
//     })

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })




// const flightsData = [
//     {
//         Name: 'F234Y',
//         Duration: 12,
//         Departure:'Israel',
//         Arrivle:'New-York',
//         Price: 600,
//         Temperature: 10,  
//         Continent:'northAmerica',
//         Date:'2022-09-28',
//         Category: 'shopping'
//     },
//     {
//         Name: 'V2G42',
//         Duration: 1,
//         Departure:'Israel',
//         Arrivle:'Greece',
//         Price: 150,
//         Temperature: 30,  
//         Continent:'europe',
//         Date:'2022-07-28',     
//         Category: 'sunbathing',

//     },
//     {
//         Name: 'F244Y',
//         Duration: 12,
//         Departure:'New-York',
//         Arrivle:'Israel',
//         Price: 600,
//         Temperature: 30,  
//         Continent:'europe',
//         Date:'2022-10-04',
//         Category: 'shopping'

//     },

//     {
//         Name: 'V2G42',
//         Duration: 1,
//         Departure:'Israel',
//         Arrivle:'Paris',
//         Price: 400,
//         Temperature: 25,  
//         Continent:'europe',
//         Date:'2022-08-28',     
//         Category: 'shopping',

//     },

//     {
//         Name: 'V2G42',
//         Duration: 1,
//         Departure:'Israel',
//         Arrivle:'Thailand',
//         Price: 800,
//         Temperature: 32,  
//         Continent:'asia',
//         Date:'2022-07-28',     
//         Category: 'sunbathing',
//     },



// ]

// Product.insertMany(flightsData)
//     .then(res => {
//         console.log(res)
//     })
//     .catch(e => {
//         console.log(e)
//     })

