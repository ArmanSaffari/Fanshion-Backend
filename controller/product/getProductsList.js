const firebaseApp = require("../firebaseConfig");

const getProductsList = async (req, res) => {
  let products = [];
  try {
    // find products in firebase:
    const querySnapshot = await firebaseApp.firestore()
      .collection("Products")
      .where("brand", "==", req.query.brand.toLowerCase())
      .get();
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      products.push(product);
    });

    // return the data:
    res.status(200).json({
      success: true,
      count: products.length,
      products: products
    });

  } catch(err) {
    // return error response:
    res.status(400).json({
      success: false,
      message: err.message || err
    });
  }
}

module.exports = getProductsList;