const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Prisma = require("../Config/Prisma");

// @description Register new user
// @Method POST
// @Route /user/
// @Access Public
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please provide all the required fields");
  }
  const user = await Prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await Prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: newUser,
  });
});

module.exports = { register };
