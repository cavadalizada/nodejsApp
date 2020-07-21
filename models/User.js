const { Schema, model } = require('mongoose')

const bcrypt = require(`bcrypt`)


const sendVerificationMail = require('./../mail/mail')


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email:{
    type: String,
    required : true,
    unique: true,
    trim: true,
    validate(value) {
      const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if(!emailRegexp.test(value)){
          throw new Error('Email invalid')
      }
    }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  salt: {
    type: String,
    required: true
  },
  tokenList:[{
    token:{
      type: String,
      required: true
    }
  }],
  isVerified:{
    type: Boolean,
    required: true
  },
  verifyCode:{
    type: Number,
  },
  otpCode:{
    type: Number,
    default:0,
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

// Registers a user with given values
UserSchema.statics.registerUser = async (name, email, username ,password) => {  // Statics are used like User.static

  var user = new User;

  const salt = bcrypt.genSaltSync(10,'a')     // '12345678' + 'asdasf' => 'dsaa$adasdafa24dasfadasfadc'

  const verifyCode = Math.floor(Math.random() *(9999-1000) + 1000)


  user.verifyCode = verifyCode

  sendVerificationMail(email,verifyCode);

  user.isVerified = false;
  user.name = name
  user.email = email
  user.username = username
  user.password = bcrypt.hashSync(password,salt) 
  user.salt = salt
  

  await user.save();

  return user
}


const User = model('user', UserSchema);


module.exports = User;