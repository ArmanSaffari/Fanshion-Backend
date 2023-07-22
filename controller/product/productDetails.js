const firebaseApp = require("../firebaseConfig");

const productDetails = async (req, res) => {
  let products = [];
  try {
    // find product details in firebase:
    const querySnapshot = await firebaseApp.firestore()
    .collection("Products")
    .doc(req.query.id)
    .get();

    // return the data:
    res.status(200).json({
      success: true,
      details: querySnapshot.data()
    });

  } catch(err) {
    // return error response:
    res.status(400).json({
      success: false,
      message: err.message || err
    });
  }
}

module.exports = productDetails;