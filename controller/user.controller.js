const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const {
  createSignUpService,
  getUserService,
} = require("../services/user.service");

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
