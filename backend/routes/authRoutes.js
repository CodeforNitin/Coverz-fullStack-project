const express = require('express');
const router = express.Router();

//getting methods from controlller
const {
    signup_post, 
    login_post
} = require ('../controller/authController')

//to add new user
router.post('/signup', signup_post)

//to login new user
router.post('/login', login_post)

module.exports = router;
