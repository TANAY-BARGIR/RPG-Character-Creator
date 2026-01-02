const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/rpg_game")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const heroSchema = new mongoose.Schema({
  name: String,
  strength: Number,
  agility: Number,
  intelligence: Number,
  date: { type: Date, default: Date.now },
});

const Hero = mongoose.model("Hero", heroSchema);

// --- ROUTES ---

app.get("/api/heroes", async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/heroes", async (req, res) => {
  try {
    const newHero = new Hero(req.body);

    const savedHero = await newHero.save();

    console.log("Hero Saved:", savedHero.name);
    res.status(201).json(savedHero);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/heroes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedHero = await Hero.findByIdAndDelete(id);

    if (deletedHero) {
      res.json({ message: "Hero banished!" });
    } else {
      res.status(404).json({ message: "Hero not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
