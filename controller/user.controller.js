const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const os = require("os");
const randomstring = require("randomstring");

const {
  createSignUpService,
  getUserService,
  findUserByEmail,
} = require("../services/user.service");
const sendEmail = require("../utils/emailSender");
const { generateToken } = require("../utils/token");

//get all user
exports.getUsers = async (req, res) => {
  try {
    let filters = { ...req.query };
    const excludesFields = ["sort", "fields", "search"];

    excludesFields.forEach((field) => {
      delete filters[field];
    });
    let queries = {};

    if (req.query.search) {
      let oldFilters = filters;
      filters = {
        ...oldFilters,
        $or: [
          { email: { $regex: req.query.search, $options: "i" } },
          { phone: { $regex: req.query.search, $options: "i" } },
          { fullName: { $regex: req.query.search, $options: "i" } },
        ],
      };
    }

    if (req.query.sort) {
      let sortCateory = req.query.sort;
      sortCateory = sortCateory.split(",").join(" ");
      queries.sort = sortCateory;
    }

    if (req.query.fields) {
      let selectCategory = req.query.fields.split(",").join(" ");
      queries.fields = selectCategory;
    }

    const user = await getUserService(filters, queries);

    res.status(200).json({
      status: "success",
      data: {
        data: user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "internal error",
      error: error.message,
    });
  }
};

//sign up
exports.signUp = async (req, res, next) => {
  try {
    const user = await createSignUpService(req.body);
    const userip = new User({
      macAddress: [],
      deviceName: [],
    });

    userip
      .save()
      .then((doc) => {
        console.log(doc);
        // Document saved successfully
      })
      .catch((err) => {
        console.error(err);
        // Error saving document
      });
    //here we can make new profile
    // token genarate
    const validateToken = jwt.sign(
      { _id: user._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "12h",
      }
    );
    // genarate url
    let url =
      process.env.NODE_ENV === "development"
        ? process.env.FRONTEND_URL
        : process.env.CLIENT_URL;
    url = url + `/${user._id}/verify?token=` + validateToken;

    await sendEmail(user.email, "emailVerify", { url }, (ret) => {
      console.log(ret, "out");
      if (ret === "sent") {
        res.status(201).json({
          status: "success",
          message: "User successfully signup! Verification email sent.",
        });
      } else {
        res
          .status(201)
          .json({ status: "success", message: "successfully signup" });
      }
    });

    res.status(200).json({
      status: "success",
      message: "successfully signup",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

// login
exports.logIn = async (req, res, next) => {
  try {
    const hostname = os.hostname();
    const userIp = req.ip;
    console.log("User ip & hostname", userIp, hostname);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        message: "Please provide your credential",
      });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "No user Found. Please Create an account",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        status: "fail",
        message: "email or password are not correct",
      });
    }

    const { password: pwd, ...others } = user.toObject();
    if (!user.isEmailVerified) {
      return res.status(401).json({
        status: "fail",
        message: "Please check your email to verify your account.",
      });
    }

    const filter = { _id: user?._id };
    if (user?.macAddress.length <= 2) {
      const setHostName = {
        $push: {
          deviceName: hostname,
        },
      };
      const setUserIp = {
        $push: {
          macAddress: userIp,
        },
      };
      console.log(user?.macAddress.length, filter);
      const updateUserWithMacAddress = await User.updateOne(filter, setUserIp);
      const updateUserWithHostName = await User.updateOne(filter, setHostName);
      //create jwt token
      const token = generateToken(user);
      res.status(200).json({
        status: "success",
        message: "successfully logged in",
        data: { token, user: others, userIp, updateUserWithMacAddress },
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Device limit exceeded",
      });
    }

    //add token to active sessions array
    // const activeSessions = req.app.get("activeSessions");
    // activeSessions.push({ email: email, token: token });
    // req.app.set("activeSessions", activeSessions);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

//verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { id } = req.query;
    const query = { _id: id };
    const result = await User.findOne(query);
    const updateUser = {
      $set: {
        isEmailVerified: true,
      },
    };
    const user = await User.updateOne(query, updateUser);
    res.send(user);
  } catch {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};
