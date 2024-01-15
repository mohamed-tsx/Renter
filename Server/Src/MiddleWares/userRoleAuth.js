const asyncHandler = require("express-async-handler");
const Prisma = require("../Config/Prisma");

//Check if the user is owner inorder to create new posts for houses renting
const isOwner = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  // Check from the database
  const user = await Prisma.user.findUnique({
    where: {
      id,
    },
  });

  // Check if the user exists
  if (!user) {
    res.status(401).json({
      message: "User not found",
    });
  }

  //Check if the user role is owner
  if (user.role === "owner") {
    next();
  } else {
    res.status(401).json({
      success: false,
      error: "You are not authorized to perform this action",
    });
  }
});

//Check if the user is renter inorder to send renting request for owners
const isRenter = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const user = await Prisma.user.findUnique({
    where: {
      id,
    },
  });

  // Check if the user exists
  if (!user) {
    res.status(401).json({
      message: "User not found",
    });
  }

  // Check if the user role is renter
  if (user.role === "renter") {
    next();
  } else {
    res.status(401).json({
      success: false,
      error: "You are not authorized to perform this action",
    });
  }
});

module.exports = {
  isOwner,
  isRenter,
};
