const mongoose = require("mongoose");
// require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

// Make connection with database atalas
const connectToMongoDB = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Failed to connect with MongoDB", error));
};
module.exports = connectToMongoDB;