const {Router} = require('express');

const authController = require('./../../controllers/authController');


const auth = require('./../../middleware/authMiddleware');
const isVerified = require('../../middleware/isVerifiedMiddleware');

const config = require('config')

const app = Router();

if (config.get("OTPSignIn")){
  app.get('/login',authController.displaySingleLogin)
}else{
  app.get('/login', authController.displayLogin)
}

app.get('/register', authController.displayRegister)

app.post('/register', authController.registerUser)

if (config.get("OTPSignIn")){
  app.post('/sendOTP', authController.sendOTP)
  app.post('/loginOTP', authController.loginOTP)
}else{
  app.post('/login', authController.loginUser)

}
app.get('/logout',auth,isVerified, authController.logoutUser)


app.get('/verify', auth, authController.displayVerify)

app.post('/verify',auth, authController.verifyEmail)



  module.exports = app;