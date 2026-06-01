const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://vipinsohal:Vipin@123@cluster0.kkceceo.mongodb.net/bookstore?retryWrites=true&w=majority');
        console.log('MongoDB Connected Successfully...');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;