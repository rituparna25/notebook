const mongoose = require('mongoose');
require('dotenv').config({ path: './Backend/.env' });
const mongoURI =process.env.MONGODB_URI
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
module.exports = connectToMongo