const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose")

const userRoute = require("./routes/user");

dotenv.config();

const app = express();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('DB connection successfully.');
  } catch(err) {
    console.log(err);
  }
};

dbConnect();

app.use(express.json());
app.use("/api/users", userRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend server is running port number ${process.env.PORT}`);
});