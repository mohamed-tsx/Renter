const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Prisma = require("../Config/Prisma");

// @description Add Property
// @Method POST
// @Route /property/
// @Access Private
const addProperty = asyncHandler(async (req, res) => {
  const {
    title,
    city,
    description,
    price,
    number_of_bedrooms,
    number_of_kitchens,
    number_of_toilets,
  } = req.body;
  const userId = req.user.id;

  //Check if one of the required fields is empty
  if (
    !(
      title ||
      city ||
      description ||
      price ||
      number_of_bedrooms ||
      number_of_kitchens ||
      number_of_toilets
    )
  ) {
    return res.status(400).json({
      error: "Please provide all fields",
    });
  }

  const newProperty = await Prisma.Property.create({
    data: {
      userId,
      title,
      city,
      description,
      price: parseFloat(price),
      number_of_bedrooms,
      number_of_kitchens,
      number_of_toilets,
    },
  });

  res.status(201).json({
    success: true,
    message: "Property is created successfully",
    data: newProperty,
  });
});

// @description Add Property
// @Method POST
// @Route /property/
// @Access Private
const viewAllProperties = asyncHandler(async (req, res) => {
  const properties = await Prisma.property.findMany();

  // Check if properties exist in database
  if (!properties) {
    return res.status(404).json({
      message: "Properties not found",
    });
  }

  res.status(200).json({
    success: true,
    data: properties,
  });
});

//Exports
module.exports = {
  addProperty,
  viewAllProperties,
};
