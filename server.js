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
        // console.log(flights);
        res.send(flights);
    })

    app.get("/",(req,res)=>
    {
       res.sendFile(public);
    });  
    app.get('/cart', function (req, res) {
        res.sendfile(public + '/shoppingCart.html')
      });

    


    ///////////////

// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'))


// app.get('/products', async (req, res) => {
//     const { category } = req.query;
//     if (category) {
//         const products = await Product.find({ category })
//         res.render('products/index', { products, category })
//     } else {
//         const products = await Product.find({})
//         res.render('products/index', { products, category: 'All' })
//     }
// })

// app.get('/products/new', (req, res) => {
//     res.render('products/new', { categories })
// })

// app.post('/products', async (req, res) => {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     res.redirect(`/products/${newProduct._id}`)
// })

// app.get('/products/:id', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findById(id)
//     res.render('products/show', { product })
// })

// app.get('/products/:id/edit', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     res.render('products/edit', { product, categories })
// })

// app.put('/products/:id', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
//     res.redirect(`/products/${product._id}`);
// })

// app.delete('/products/:id', async (req, res) => {
//     const { id } = req.params;
//     const deletedProduct = await Product.findByIdAndDelete(id);
//     res.redirect('/products');
// })



app.listen(8080, () => {
    console.log("APP IS LISTENING ON PORT 8080!")
})
