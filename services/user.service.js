const User = require("../models/user.model");

exports.createSignUpService = async (data) => {
  let result = await User.create(data);
  return result;
};

exports.getUserService = async (whereCondition, queries) => {
  const result = await User.find(whereCondition)
    // .select("-password")
    .sort(queries.sort);
  const total = await User.countDocuments(whereCondition);
  return { total, result };
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.getUserByIdService = async (id) => {
  // const result = await User.findOne({ _id: id }).select("-password ");
  const result = await User.findOne({ _id: id });
  return result;
};

exports.updateUserService = async (id, data) => {
  console.log(data);
  const result = await User.updateOne({ _id: id }, data);
  console.log("Result from service", result);
  return result;
};
