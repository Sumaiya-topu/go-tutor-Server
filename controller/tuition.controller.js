const Tuition = require("../models/tuition.model.js");
const {
  getTuitionService,
  createTuitionService,
  getTuitionByIdService,
  deleteTuition,
  updateTuitionByIdService,
} = require("../services/tuition.service.js");

exports.getAllTuition = async (req, res) => {
  try {
    let filters = {
      ...req.query,
      isApprove: true,
    };
    const excludesFields = ["sort", "fields", "search"];

    excludesFields.forEach((field) => {
      delete filters[field];
    });
    if (req.query.search) {
      filters = {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { fullName: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      };
    }

    let queries = {};

    // single with multi sorting
    if (req.query.sort) {
      let sortCateory = req.query.sort;
      sortCateory = sortCateory.split(",").join(" ");
      queries.sort = sortCateory;
    }

    // for projection---------------------------------------------
    if (req.query.fields) {
      let selectCourse = req.query.fields.split(",").join(" ");
      queries.fields = selectCourse;
    }

    const result = await getTuitionService(filters, queries);

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: error.message,
    });
  }
};

//create tuition post

exports.createTuition = async (req, res) => {
  try {
    const { id } = req.params;
    const tuitionData = req.body; // Assuming your request body contains tuition data

    // Set the studentId field with the id from request parameters
    tuitionData.postedBy = id;

    // Create a new Tuition document with the studentId set
    const newTuition = new Tuition(tuitionData);
    await newTuition.save();

    // const newTuition = await createTuitionService(req.body);

    const filter = { postedBy: id };
    const data = await Tuition.find(filter);

    res.status(200).json({
      status: "success",
      message: "data inserted successfully!",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data is not inserted ",
      error: error.message,
    });
  }
};

//get tuition post by id
exports.getTuitionById = async (req, res) => {
  try {
    const id = req.params.id;
    const tuition = await getTuitionByIdService(id);

    res.status(200).json({
      status: "success",
      data: tuition,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

//delete tuition by id
exports.deleteTuitionById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteTuition(id);

    res.status(200).json({
      status: "success",
      message: "Deleted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

// update tuition by id
exports.updateTuitionById = async (req, res) => {
  try {
    const id = req.params.id;
    const Tuition = await updateTuitionByIdService(id, req.body);

    res.status(200).json({
      status: "success",
      data: Tuition,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};
