const express = require("express");
const app = require("./app");
// const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const cors = require("cors");

app.listen(port, () => {
  console.log(`go-tutor server is running on port ${port}`);
});
