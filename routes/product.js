const express = require("express");
const router = express.Router();

const getProductsList = require("../controller/product/getProductsList.js");
const productDetails = require("../controller/product/productDetails.js");

router.use("/getProductsList", getProductsList);
router.use("/productDetails", productDetails);

module.exports = router;
