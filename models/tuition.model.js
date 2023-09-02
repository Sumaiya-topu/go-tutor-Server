const mongoose = require("mongoose");

const tuitionSchema = mongoose.Schema(
  {
    studentName: String,
    class: String,
    subject: String,
    backgroundMedium: String,
    studentGender: String,
    mobile: Number,
    email: String,
    salaryRange: String,
    daysPerWeek: String,
    address: String,
    desiredTutor: String,
    location: String,
    postedBy: String,
  },
  { timestamps: true }
);

const Tuition = mongoose.model("Tuition", tuitionSchema);
module.exports = Tuition;
