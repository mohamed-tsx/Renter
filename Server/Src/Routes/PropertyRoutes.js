const express = require("express");
const {
  addProperty,
  viewAllProperties,
  myProperies,
} = require("../Controllers/PropertyController");
const Protect = require("../MiddleWares/authMiddleWare");
const { isOwner, isRenter } = require("../MiddleWares/userRoleAuth");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Add new property
router.post("/", upload.array("images", 5), Protect, isOwner, addProperty);

//View All available properties for renting
router.get("/viewproperties", Protect, isRenter, viewAllProperties);

//Check my properties
router.get("/myproperties", Protect, isOwner, myProperies);

// Export
module.exports = router;
