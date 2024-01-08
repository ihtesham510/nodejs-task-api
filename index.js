const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Task = require("./models/task");
const cors = require("cors");
const User = require("./models/user");
dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to the database"));
db.on("error", () => console.log("Error connecting to the database"));

const port = process.env.PORT || 3000;
const app = express();

// Use bodyParser middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.set("json spaces", 2);

// Create a new task
app.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task
app.patch("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* Users */
// create user
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Get all tasks
app.get("/users", async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on Port:${port}`);
});
