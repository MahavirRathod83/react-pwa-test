// external modules import
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://mahavir:mahavir123@cluster0.idsdf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      )
      .then(() => {
        console.log("Connected to MongoDB database successfully.");
      })
      .catch((error) => {
        console.log("Error connecting to MongoDB: ", error.message);
      });
  } catch (error) {
    console.log("Database connection error: ", error.message);
  }
};

module.exports = connectDatabase;
