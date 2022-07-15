const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Mongo DB connected successfully!");
    }
  }
);
