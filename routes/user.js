const express = require("express");
const router = express.Router();

const signin = require("../controller/user/signin.js");
const register = require("../controller/user/register.js");
const saveItem = require("../controller/user/saveItem.js");
const getSavedItems = require("../controller/user/getSavedItems.js");
const checkToken = require("../middleware/checkToken.js");

router.post("/signin", signin);
router.post("/register", register);
router.put("/saveItem", checkToken, saveItem);
router.get("/userSavedItems", checkToken, getSavedItems);

module.exports = router;
