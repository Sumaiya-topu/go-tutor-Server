const mongoose = require("mongoose");
const validator = require("validator");
const shortid = require("shortid");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      validate: [validator.isEmail, "please provide a valid email"],
      required: [true, "Email address is required"],
      unique: true,
    },
    number: {
      type: Number,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 5,
            minLowercase: 1,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message: "password {VALUE} is not strong enough.",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords don't match!",
      },
    },
    referralCode: {
      type: String,
      default: shortid.generate,
    },
    // commission: {
    //   type: Number,
    //   default: 0,
    // },
    role: {
      type: String,
      enum: ["student", "admin", "tutor"],
      default: "student",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    fullName: {
      type: String,
      required: [true, "Please provide your Full Name"],
      trim: true,
    },
    cv: Object,
    department: String,
    institution: String,
    backgroundMedium: String,
    preferredClass: String,
    preferredSubject: String,
    preferredArea: String,
    qualification: String,
    address: String,
    city: String,
    country: String,
    zipCode: String,
    imageURL: {
      type: String,
      // validate: [validator.isURL, "Please provide a valid image url"],
    },
    nidImageFront: {
      type: String,
    },
    nidImageBack: {
      type: String,
    },
    certificate: {
      type: String,
    },
    birth: String,
    facebookURL: String,
    linkedinURL: String,
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is invalid ",
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked", "new"],
      default: "active",
    },
    forgetPasswordToken: {
      type: String,
      default: "",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    macAddress: Array,
    deviceName: Array,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
