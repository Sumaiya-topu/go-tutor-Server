const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const { createSignUpService } = require("../services/user.service");

//sign up
exports.signUp = async (req, res, next) => {
  const user = await createSignUpService(req.body);
};
