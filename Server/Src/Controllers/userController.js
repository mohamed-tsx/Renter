const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Prisma = require("../Config/Prisma");
const bcrypt = require("bcryptjs");

// @description Register new user
// @Method POST
// @Route /userr/
// @Access Public
const register = asyncHandler(async (req, res) => {
  // Fetch the necessary data from the request
  const { firstName, lastName, username, email, password } = req.body;
  const { role } = req.query;

  //Check if the email or password or username are provided
  if ((!firstName, !lastName, !username || !email || !password || !role)) {
    return res.status(400).json({
      error: "Please provide all fields",
    });
  }

  //Check if user role is valid
  if (role !== "renter" && role !== "owner") {
    return res.status(400).json({
      error: "Please provide a valid role",
    });
  }

  //Check if the user already exists
  const user = await Prisma.user.findUnique({
    where: {
      email,
    },
  });

  // If user already exists return a error message
  if (user) {
    return res.status(400).json({
      error: "User already exists",
    });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const newUser = await Prisma.user.create({
    data: {
      firstName,
      lastName,
      username,
      email,
      role,
      password: hashedPassword,
    },
  });

  // Return the response with success and newly created user
  res.status(201).json({
    success: true,
    data: newUser,
    token: generateToken(newUser.id, newUser.email),
  });
});

// @description Login
// @Method POST
// @Route /userr/login
// @Access Public
const login = asyncHandler(async (req, res) => {
  // Fetch the necessary data from the request
  const { email, password } = req.body;

  //Check if the email or password or username are provided
  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: "Please all the required fields!",
    });
  }

  //Check if the user exists
  const user = await Prisma.user.findUnique({
    where: {
      email,
    },
  });

  // If user does not exist return a error message
  if (!user) {
    res.status(400).json({
      success: false,
      error: "User does not exist",
    });
  }

  // Check if the password is correct
  const isMatch = await bcrypt.compare(password, user.password);

  // If password is incorrect return a error message
  if (!isMatch) {
    res.status(400).json({
      success: false,
      error: "Invalid password",
    });
  }

  // Return the response with success and newly created user
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: user,
    token: generateToken(user.id, user.email),
  });
});

const generateToken = (id, email) => {
  const payload = { id, email };
  const secret = process.env.JWT_SECRET;
  return jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
};

module.exports = {
  register,
  login,
};
