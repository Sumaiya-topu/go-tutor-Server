const User = require("../models/user.model");

exports.checkWithIdService = async (id, modelName) => {
  const result = await User.findOne({ _id: id });
  if (result?.role) {
    return true;
  } else {
    return false;
  }
};

exports.checkWithEmailService = async (email) => {
  const result = await User.findOne({ email: email });
  if (result?.role) {
    return true;
  } else {
    return false;
  }
};
