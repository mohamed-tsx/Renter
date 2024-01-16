const express = require("express");
const {
  addProperty,
  viewAllProperties,
} = require("../Controllers/PropertyController");
const Protect = require("../MiddleWares/authMiddleWare");
const { isOwner, isRenter } = require("../MiddleWares/userRoleAuth");
const router = express.Router();

// Add new property
router.post("/", Protect, isOwner, addProperty);

//View All available properties for renting
router.get("/viewproperties", Protect, isRenter, viewAllProperties);

// Export
module.exports = router;
