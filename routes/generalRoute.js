const {Router} = require('express');

const generalController = require('./../controllers/generalController');
const auth = require('../middleware/authMiddleware');
const isVerified = require('../middleware/isVerifiedMiddleware');



const app = Router();


app.get('/', generalController.displayHome)

app.get('/isVerifiedOrAuthenticated',auth,isVerified, generalController.displayHome)

  module.exports = app;