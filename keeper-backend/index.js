const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 80;

mongoose
  .connect("mongodb://127.0.0.1:27017/keeperDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error", err));

const keeperSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
});

const Keeper = new mongoose.model("keeper", keeperSchema);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/api/getAll", async (req, res) => {
  const keeperList = await Keeper.find({});
  res.status(200).send(keeperList);
});
app.post("/api/addNew", async (req, res) => {
  const { title, description } = req.body;
  const keeper = await Keeper.create({
    title,
    description,
  });

  const keeperList = await Keeper.find({});
  res.status(200).send(keeperList);
});
app.post("/api/delete", async (req, res) => {
  const { id } = req.body;
  await Keeper.deleteOne({ _id: id });

  const keeperList = await Keeper.find({}); // Fetch the updated list of keepers
  res.status(200).send(keeperList); // Send the updated list back to the client
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
