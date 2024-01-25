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
    res.status(400);
    throw new Error("Please fill all the required fields");
  }

  const newProperty = await Prisma.property.create({
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
// @Method GET
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

// @description Update Property
// @Method PUT
// @Route /property/updateproperty
// @Access Private
const updateProperty = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.query;

  // Fetch data from request body
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

  // Check if one of the required fields is empty
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

  // Check if the property exists
  const property = await Prisma.property.findUnique({
    where: { id },
  });

  // If property doesn't exist, return error response
  if (!property) {
    return res.status(404).json({
      message: "Property not found",
    });
  }

  // If the property but user's id and userId of the property don't match, deny this action
  if (property.userId !== userId) {
    return res.status(401).json({
      message: "You are not authorized to update this property",
    });
  }

  // Update the property
  const updatedProperty = await Prisma.property.update({
    where: { id },
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
    message: "Property is updated successfully",
    data: updatedProperty,
  });
});

// @description Update Property
// @Method PUT
// @Route /property/updateproperty
// @Access Private
const deleteProperty = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.query;

  // Check if the property exists
  const property = await Prisma.property.findUnique({
    where: { id },
  });

  // If property doesn't exist, return error response
  if (!property) {
    return res.status(404).json({
      message: "Property not found",
    });
  }

  // If the property but user's id and userId of the property don't match, deny this action
  if (property.userId !== userId) {
    return res.status(401).json({
      message: "You are not authorized to delete this property",
    });
  }

  // Delete associated images first
  await Prisma.image.deleteMany({
    where: { propertyId: id },
  });

  // Delete the property
  const deletedProperty = await Prisma.property.delete({
    where: { id },
  });

  res.status(201).json({
    success: true,
    message: "Property is deleted successfully",
    data: deletedProperty,
  });
});

//Exports
module.exports = {
  addProperty,
  viewAllProperties,
  myProperies,
  viewOneProperty,
  updateProperty,
  deleteProperty,
};
