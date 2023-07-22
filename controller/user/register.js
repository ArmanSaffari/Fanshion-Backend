const firebaseApp = require("../firebaseConfig");

const register = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw { message: 'Both email and password are required to register.'}
    }

    const userRecord = await firebaseApp.auth()
      .createUserWithEmailAndPassword(req.body.email, req.body.password)

    const uid = userRecord.user.uid;

    await firebaseApp.firestore()
      .collection("Users")
      .doc(uid)
      .set({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        DOB: req.body.DOB || null,
        favoriteBrand: "",
        from: req.body.from || null,
        livesIn: req.body.livesIn || null,
        occupation: req.body.occupation || null,
        age: req.body.age || null,
        profileImageUrl: ""
      })

      res.status(200).json({
        success: true,
        message: "An account has successfully created!"
      })
    // })
  } catch(err) {
    res.status(400).json({
      success: false,
      message: err.message || err
    });
  }
}

module.exports = register;