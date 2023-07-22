const firebaseApp = require("../firebaseConfig");

const getSavedItems = async (req, res) => {
  try {

    // find product details in firestore:
    const querySnapshot = await firebaseApp.firestore()
      .collection('Users')
      .doc(req.user.uid)
      .get()
      
    let savedItems = await querySnapshot.data().savedItems || [];

    // return the data:
    res.status(200).json({
      success: true,
      savedItems: savedItems
    });

  } catch(err) {
    // return error response:
    res.status(400).json({
      success: false,
      message: err.message || err
    });
  }
}

module.exports = getSavedItems;