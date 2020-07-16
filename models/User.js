const { Schema, model } = require('mongoose')

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
  register_date: {
    type: Date,
    default: Date.now
  }
});


UserSchema.statics.findUser = async (username, email) => {  // Statics are used like User.static

}


const User = model('user', UserSchema);


module.exports = User;