const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const fetchuser = require("../middlewares/fetchuser");


// Signup: Create a new account
router.post('/signup', controller.signup);

// Login: 
router.post('/login', controller.login);

// Get User: 
router.get('/getuser', fetchuser, controller.getUser);


module.exports = router;


