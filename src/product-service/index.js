const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/productdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.json());

// Schema cho sản phẩm
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

const Product = mongoose.model('Product', productSchema);

// API để lấy danh sách sản phẩm
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// API để tạo sản phẩm mới
app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
});

// Bắt đầu server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Product Service chạy tại http://localhost:${PORT}`);
});