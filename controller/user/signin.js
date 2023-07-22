const firebaseApp = require("../firebaseConfig");

const signin = async (req, res) => {
  try {
    let userName = ''
    // login to firebase:
    if (req.body.email && req.body.password) {
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(async () => {
          const user = await firebaseApp.auth().currentUser;
          const token = await user.getIdToken();
          await firebaseApp.firestore()
            .collection('Users')
            .doc(user.uid)
            .get()
            .then((doc) => doc.data())
            .then((userDetails) => {
              userName = `${userDetails.firstName} ${userDetails.lastName}`
            });
          
            // console.log(token)

          if (user) {
            res.status(200).json({
              success: true,
              userUid: user.uid,
              userName: userName,
              message: `Hello ${userName}! You have signed in successfully.`,
              token: token
            })
          }
        }
      )
    } else {
      throw { message: 'request is not in a correct format!'}
    }
  } catch(err) {
    res.status(400).json({
      success: false,
      message: err.message || err
    });
  }
  
  
}

module.exports = signin;