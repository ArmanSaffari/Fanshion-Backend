const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const checkToken = async (req, res, next) => {
  try {
    if (!req.headers.token) throw "not found"
    const token = req.headers.token;
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;

    // console.log('decodedToken: ', decodedToken);

    next();

  } catch(err) {
    res.status(401).json({
      success: false,
      message: "Unauthorized!"
    });
  }
}

module.exports = checkToken;