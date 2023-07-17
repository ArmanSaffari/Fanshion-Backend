const express = require("express");
const router = express.Router();

const signin = async (req, res) => {
  console.log(req.body);
  res.status(200).json({
    success: true,
    message: "done"
  });
}



router.post("/signin", signin);

module.exports = router;