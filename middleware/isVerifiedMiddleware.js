const User = require("../models/User")
const jwt = require('jsonwebtoken')
const config = require('config')


const isVerified = async(req,res, next) => {

    try {
        
        if(!req.user.isVerified){

            return res.redirect('/auth/verify')
        }

        next()
    } catch (error) {
        res.status(401).send({error: "Authentication invalid"})
    }

}

module.exports = isVerified