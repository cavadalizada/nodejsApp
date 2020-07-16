const {Router} = require('express');

const authController = require('./../../controllers/authController');


const auth = require('./../../middleware/authMiddleware');
const isVerified = require('../../middleware/isVerifiedMiddleware');


const app = Router();


app.get('/login', authController.displayLogin)


app.get('/register', authController.displayRegister)

app.post('/register', authController.registerUser)

app.post('/login', authController.loginUser)


app.get('/logout',auth,isVerified, authController.logoutUser)


app.get('/verify', auth, authController.displayVerify)

app.post('/verify',auth, authController.verifyEmail)



  module.exports = app;