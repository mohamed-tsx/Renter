const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// @description Add Property
// @Method POST
// @Route /property/
// @Access Public
const addProperty = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Checking...",
  });
});

//Exports
module.exports = {
  addProperty,
};
