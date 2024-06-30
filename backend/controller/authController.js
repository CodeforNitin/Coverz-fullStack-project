const mongoose = require('mongoose');
const User = require('../models/UserModel')
const jwt = require ('jsonwebtoken')

//creating jwt token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//calling static signup method
const signup_post = async (req, res) => {

    const {email, password} = req.body;
    try{
        const newUser = await User.signup(email, password)

        //creating token
        const token = createToken(newUser._id)
        res.status(200).json({ email, token })
    }
    catch (error){
        res.status(400).json({ error: error.message })
    }
}

//calling static login method
const login_post = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password)

        //creating token
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    }
    catch (error){
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    signup_post,
    login_post
}