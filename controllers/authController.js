const { Mongoose } = require("mongoose")
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)
const config = require('config')


const User = require('../models/User');

const sendOTPMail = require('./../mail/OTPmail')

exports.displayLogin = (req,res)=>{

    res.render('login.pug')
}


exports.displayRegister = (req,res)=>{

    res.render('register.pug')
}

exports.displaySingleLogin = (req,res)=>{

    res.render('singleLogin.pug')
}

exports.sendOTP = async (req,res)=>{
const { email } = req.body;

user = await User.findOne({email})

if(user == null){
    return res.status(400).json({msg:'No user with this email found.'})
}

const otpCode = Math.floor(Math.random() *(9999-1000) + 1000)

user.otpCode = otpCode;
await user.save();
sendOTPMail(email,otpCode);

res.json({msg:'Success'})
}

//Login One time Password 
exports.loginOTP = async (req,res)=>{
    const { otpCode,email} = req.body
        
    if (!otpCode) {
        return res.status(400).json({ msg: 'Please provide an OTPCode' });
    }
    try {
        const test = await User.findOne({email}).exec()
    
            if(test == null){
                return res.status(400).json({msg: `Unable to login`})
            } 
            if(test.otpCode!=otpCode){
            return res.status(400).json({ msg: 'Unable to login' });
        }
        test.otpCode = null;
        const token = jwt.sign({username: test.username},config.get('JWTtoken'),{expiresIn:"1 day"});
        test.tokenList = test.tokenList.concat({ token })
        await test.save()
        console.log(test)
        res.json({"username": test.username, "token":token})
         
        }catch (error) {
            console.log(error)
        }


}



// Login controller
exports.loginUser = async (req,res)=>{
    const { username, password} = req.body
        
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    try {
        const test = await User.findOne({username:username}).exec()
    
            if(test == null){
                return res.status(400).json({msg: `Unable to login`})
            } 
            const salt = test.salt

            if(test.password!=bcrypt.hashSync(password,salt)){
            return res.status(400).json({ msg: 'Unable to login' });

        }

        const token = jwt.sign({username},config.get('JWTtoken'),{expiresIn:"1 day"});
        test.tokenList = test.tokenList.concat({ token })
        await test.save()
        console.log(test)
        return res.json({"username": test.username, "token":token})
         
        }catch (error) {
            console.log(error)
        }


}

exports.verifyEmail = async (req,res)=>{
    
    if(req.body.verifyCode == req.user.verifyCode){
        req.user.isVerified = true
        req.user.verifyCode = null;
        await req.user.save()
        return res.redirect('/')
    }

    return res.json({msg:"Please try again"})




}

exports.displayVerify = async (req,res)=>{

    
    return res.render('verify.pug')


}

//Logout
exports.logoutUser = async (req,res)=>{
    
    req.user.tokenList = req.user.tokenList.filter((token)=>{

        return token.token !== req.token
    })
    req.user.save().then().catch()
    
    res.redirect('/')
}


// Registration
exports.registerUser = async (req,res)=>{

    const {name, email, username, password} = req.body


    if (!name || !username || !password || !email) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    try {
        // maybe there is a better way to write below code
        var test = await User.findOne({$or: [
            {username},
            {email}]}).exec()
        if(test!=null){
        return res.status(400).json({ msg: 'Username or email already taken' });
        }
    
      const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if(!emailRegexp.test(email)){
          return res.status(400).json({msg: 'Email incorrect'})
      }
    
      await User.registerUser(name, email, username, password)

      return res.redirect('/auth/login')

      
    }catch (error) {
        console.log(error)
    }


}

