const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');
// const { default: Products } = require('./src/components/Products');

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const Product = mongoose.model("products", new mongoose.Schema({
    _id : {type: String, default: shortid.generate},
    title: String,
    desription: String,
    image: String,
    price: Number,
    availableSizes: [String],
}))

app.get('/api/data', async (req,res) => {
    const productList = await Product.find({});
    res.send(productList)
})


app.post('/api/data', async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
})

app.delete('/api/data/:id', async(req,res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
})

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('serve at http://localhost:5000 '));

