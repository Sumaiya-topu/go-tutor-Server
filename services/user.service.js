const User = require("../models/user.model");

exports.createSignUpService = async (data) => {
  let result = await User.create(data);
  return result;
};

exports.getUserService = async (filters, queries) => {
  const result = await User.find(filters)
    .select("-password")
    .sort(queries.sort);
  const total = await User.countDocuments(filters);
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
