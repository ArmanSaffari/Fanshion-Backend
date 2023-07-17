const signin = async (req, res) => {
  console.log(req.body);
  res.status(200).json({
    success: true,
    message: "done"
  });
}

module.exports = signin;