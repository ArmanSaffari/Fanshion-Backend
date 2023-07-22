const express = require("express");
const router = express.Router();
const path= require('path');

const userRoutes = require("./user.js");
const productRoutes = require("./product.js");

const parentDir = path.resolve(__dirname, '..');

router.use("/api/user", userRoutes);
router.use("/api/product", productRoutes);

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/brands', function (req, res) {
  res.render('brands');
});

router.get('/items/:brand', function (req, res) {
  const brand = req.params.brand;
  res.render('items', { brand: brand });
});

router.get('/itemDetails/:productId', function (req, res) {
  const productId = req.params.productId;
  res.render('itemDetails', { id: productId });
});

router.get('/trending', function (req, res) {
  res.render('trending');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.get('/sign-up', function (req, res) {
  res.render('sign-up');
});

router.get('/snapshots', function (req, res) {
  res.render('snapshots');
});

router.get('/profile', function (req, res) {
  res.render('profile');
});

module.exports = router;