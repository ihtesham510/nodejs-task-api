import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;
connect(uri);
const db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", () => console.log("error connecting to the database"));

app.all("/", (req, res) => {
  console.log("Just got a request!");
  res.send("Yo!");
});

app.get("/ip", function (req, res) {
  const ipAddress = req.socket.remoteAddress;
  res.send(ipAddress);
});

async function connect(uri) {
  await mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  app.listen(port, console.log(`App is running on PORT : ${port}`));
}
