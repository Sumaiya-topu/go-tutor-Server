const User = require("../models/user.model");

exports.createSignUpService = async (data) => {
  let result = await User.create(data);
  return result;
};
