import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const uri =
  "mongodb+srv://ihtesham510:Kissanime.me@cluster0.ltdixlk.mongodb.net/";
connect(uri);

app.all("/", (req, res) => {
  console.log("Just got a request!");
  res.send("Yo!");
});

async function connect(uri) {
  await mongoose.connect(uri);
  app.listen(port, console.log(`App is running on PORT : ${port}`));
}
