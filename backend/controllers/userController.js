const mongoose = require('mongoose');
const User  = require('../models/userModel');

const getAllUsers = async (req, res) => {

    try {
        const users = await User.find();
        res.status(200).json({ users: users })
    }
    catch (error) {
        res.status(400).json({ error: error })
    }

}


const getUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ user: user })
    }
    catch (error) {
        res.status(400).json({ error: error })
    }

}

module.exports = { getAllUsers, getUser }