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
  const images = req.files.map((file) => ({ imageUrl: file.path }));
  const userId = req.user.id;

  //Check if one of the required fields is empty
  if (
    !(
      title &&
      city &&
      description &&
      price &&
      number_of_bedrooms &&
      number_of_kitchens &&
      number_of_toilets &&
      images
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
      images: {
        create: images,
      },
    },
    include: {
      owner: true,
      rental: true,
      images: true,
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
const myProperies = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Check the user's properties
  const properties = await Prisma.property.findMany({
    where: {
      userId,
    },
    include: {
      rental: true,
      images: true,
    },
  });

  //Return not found message if the user don't have properties
  if (!properties) {
    return res.status(404).json({
      message: "Properties not found",
    });
  }

  //Return a message with success and the data
  res.status(200).json({
    success: true,
    properties: properties,
  });
});

// @description Add Property
// @Method POST
// @Route /property/
// @Access Private
const viewAllProperties = asyncHandler(async (req, res) => {
  const properties = await Prisma.property.findMany({
    include: {
      owner: true,
      images: true,
    },
  });

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

// @description View Property
// @Method POST
// @Route /property/viewproperty/:id
// @Access Private
const viewOneProperty = asyncHandler(async (req, res) => {
  const { id } = req.query;

  // Check if the property exist in database
  const property = await Prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      owner: true,
      images: true,
    },
  });

  //Return not found message if the property don't exist
  if (!property) {
    return res.status(404).json({
      message: "Property not found",
    });
  }

  res.status(200).json({
    success: true,
    data: property,
  });
});

//Exports
module.exports = {
  addProperty,
  viewAllProperties,
  myProperies,
  viewOneProperty,
};
