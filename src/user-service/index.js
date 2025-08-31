const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.json());

// Schema cho người dùng
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// API để lấy danh sách người dùng
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// API để tạo người dùng mới
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
});

// Bắt đầu server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`User Service chạy tại http://localhost:${PORT}`);
});