const express = require("express");
const {
  register,
  login,
  getUserProfile,
} = require("../Controllers/userController");
const Protect = require("../MiddleWares/authMiddleWare");
const router = express.Router();

router.post("/user/", register);
router.post("/user/login", login);
router.get("/user/profile", Protect, getUserProfile);

module.exports = router;
