const { Mongoose } = require("mongoose")
const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)
const config = require('config')


const User = require('../models/User');

exports.displayHome = (req,res)=>{

    res.render('home.pug')

}

exports.createDiary = (req,res) => {



}



