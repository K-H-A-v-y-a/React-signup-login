const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://mongo:upthP3mZDkoNSaeX@cluster0.7zmytnl.mongodb.net/?retryWrites=true&w=majority/test")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log('MongoDB connection failed');
  });

const newSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Make sure email addresses are unique
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  dob: {
    type: Date
  },
  gender: {
    type: String
  },
  mobileno: {
    type: String
  }
});

const collection = mongoose.model("collection", newSchema);

module.exports = collection;


