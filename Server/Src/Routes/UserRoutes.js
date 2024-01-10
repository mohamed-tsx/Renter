const express = require("express");
const { register, login } = require("../Controllers/userController");
const router = express.Router();

router.post("/user/", register);
router.post("/user/login", login);

module.exports = router;
