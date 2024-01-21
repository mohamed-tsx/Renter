const express = require("express");
const {
  addProperty,
  viewAllProperties,
  myProperies,
  viewOneProperty,
  updateProperty,
} = require("../Controllers/PropertyController");
const Protect = require("../MiddleWares/authMiddleWare");
const { isOwner, isRenter } = require("../MiddleWares/userRoleAuth");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/property" });

// Add new property
router.post(
  "/addProperty",
  upload.array("images", 5),
  Protect,
  isOwner,
  addProperty
);

//View All available properties for renting
router.get("/viewproperties", Protect, isRenter, viewAllProperties);

//Check my properties
router.get("/myproperties", Protect, isOwner, myProperies);

//View one property
router.get("/viewoneproperty/", Protect, viewOneProperty);

//Update a property
router.put(
  "/updateproperty/",
  Protect,
  isOwner,
  upload.array("images", 5),
  updateProperty
);

// Export
module.exports = router;
