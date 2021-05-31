const mongoose = require("mongoose");
const URI = require("../config/key_dev").MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(" 💾 MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
