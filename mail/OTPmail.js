const config = require('config')
const nodemailer = require('nodemailer');


const sendOTPMail = async (target,verifyCode) =>{

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'alizada.cavad@gmail.com',
        pass: config.get("GOOGLE_API_KEY")
      }
    });
    URL = "www.google.com"
  
    const mailOptions = {
      from: 'alizada.cavad@gmail.com',
      to: target,
      subject: 'Please confirm account',
      html: `Here is the verification code ${verifyCode}.`,
      text: `Here is the verification code ${verifyCode}.`
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
      console.log(error);
      } else {
        console.log('OTP Email sent: ' + info.response);
      }
    });
  
  }


  module.exports = sendOTPMail