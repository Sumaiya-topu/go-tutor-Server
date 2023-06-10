const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dotenv = require("dotenv").config();
mongoose.set("strictQuery", false);

const express = require("express");
const cors = require("cors");
const app = require("./app");

// database connection
mongoose
  .connect(process.env.DATABASE_URI, { useNewUrlParser: true })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

//use  middlewares
app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`go-tutor server is running on port ${port}`);
});
