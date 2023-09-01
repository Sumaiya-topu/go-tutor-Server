const mongoose = require("mongoose");

const tuitionSchema = mongoose.Schema(
  {
    class: String,
    subject: String,
    salaryRange: String,
    daysPerWeek: String,
    location: String,
    postedBy: String,
  },
  { timestamps: true }
);

const Tuition = mongoose.model("Tuition", tuitionSchema);
module.exports = Tuition;
