const express = require('express') 
const bodyParser = require('body-parser');



const connectDB = require('./config/index')

const authRoute = require('./routes/auth/authRoute')

const generalRoute = require('./routes/generalRoute')

const auth = require('./middleware/authMiddleware');
const isVerified = require('./middleware/isVerifiedMiddleware');


const port = process.env.PORT || 3001

connectDB();


var app = express()


app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'pug')

app.use('/auth', authRoute);   //http://localhost/auth

app.use('/', auth, isVerified, generalRoute);   //http://localhost/ 



app.get('*',(req,res)=>{
    res.render('404');
})

  app.listen(port,()=>{

    console.log("Listening on " + port)
})