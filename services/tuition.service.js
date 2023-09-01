const Tuition = require("../models/tuition.model");

exports.getTuitionService = async (filters, queries) => {
  //   let searchQuery = new RegExp(queries.search);

  const result = await Tuition.find(queries);
  const total = await Tuition.countDocuments(queries);
  return { total, result };
};

exports.createTuitionService = async (data) => {
  const result = await Tuition.create(data);
  return result;
};

exports.getTuitionByIdService = async (id) => {
  const result = await Tuition.findById(id);
  return result;
};
exports.deleteTuition = async (id) => {
  const result = await Tuition.deleteOne({ _id: id });
  return result;
};

exports.updateTuitionByIdService = async (id, data) => {
  const result = await Tuition.updateOne({ _id: id }, data);
  return result;
};
