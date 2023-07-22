const firebaseApp = require("../firebaseConfig");

const saveItem = async (req, res) => {
  try {
    // return error if id has not been identified in the request:
    if (!req.query.id) throw "product id has not defined!"
    
    // find product details in firestore:
    const querySnapshot = await firebaseApp.firestore()
      .collection('Users')
      .doc(req.user.uid)
      .get()
      

    // update savedItems in firestore
    let savedItems = await querySnapshot.data().savedItems || [];
    // console.log("savedItems: ", savedItems)

    let message=''

    if (savedItems.includes(req.query.id)) {
      savedItems = savedItems.filter(item => item !== req.query.id)
      message = `The item (${req.query.id}) removed form saved list!`
    } else {
      savedItems.push(req.query.id)
      message = `The item (${req.query.id}) saved to the list!`
    }

    await firebaseApp.firestore()
      .collection('Users')
      .doc(req.user.uid)
      .update({savedItems: savedItems})

    // return the data:
    res.status(200).json({
      success: true,
      message: message,
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


module.exports = saveItem;