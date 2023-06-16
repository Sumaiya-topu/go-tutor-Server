const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");

app.use(express.json());
app.use(cors());

//product schema
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send("go tutor server running...!");
});

module.exports = app;
