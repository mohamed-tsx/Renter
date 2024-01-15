const express = require("express");
const { addProperty } = require("../Controllers/PropertyController");
const Protect = require("../MiddleWares/authMiddleWare");
const { isOwner, isRenter } = require("../MiddleWares/userRoleAuth");
const router = express.Router();

// Add new property
router.post("/", Protect, isOwner, addProperty);

// Export
module.exports = router;
