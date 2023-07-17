const express = require("express");
const router = express.Router();

const signin = require("../controller/signin");

//user APIs:
router.use("/user/signin", signin);

module.exports = router;
