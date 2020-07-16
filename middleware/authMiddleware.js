const User = require("../models/User")
const jwt = require('jsonwebtoken')
const config = require('config')


const auth = async(req,res, next) => {

    try {
        
        const token = req.header('Authorization').replace('Bearer ', '')
        const decodedToken = jwt.verify(token, config.get('JWTtoken'))

        const user = await User.findOne({username:decodedToken.username, 'tokenList.token': token})

        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user


        next()
    } catch (error) {
        res.status(401).send({error: "Authentication invalid"})
    }

}

module.exports= auth