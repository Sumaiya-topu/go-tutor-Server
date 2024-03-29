const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const imageUploadRoutes = require("./routes/imageUpload.route");
const tuitionRoutes = require("./routes/tuition.route");

app.use(express.json());
app.use(cors());
app.use(express.static("image"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/upload", imageUploadRoutes);
app.use("/api/v1/tuition", tuitionRoutes);

app.get("/", (req, res) => {
  res.send("go tutor server running...!");
});

module.exports = app;
