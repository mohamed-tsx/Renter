const express = require("express");
const {
  register,
  login,
  getUserProfile,
} = require("../Controllers/userController");
const Protect = require("../MiddleWares/authMiddleWare");
const multer = require("multer");
const upload = multer({ dest: "uploads/user/" });
const router = express.Router();

router.post("/user/", upload.single("image"), register);
router.post("/user/login", login);
router.get("/user/profile", Protect, getUserProfile);

module.exports = router;
