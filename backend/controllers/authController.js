const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../utils/validation')



const register = async (req, res) => {
    try {

        let { firstname, lastname, email, password } = req.body
        const { error } = registerValidation(req.body)
        if (error) return res.status(400).json({ error: error })

        const isExist = await User.findOne({ email: email })

        if (isExist) return res.status(400).json({ error: "Email already exists" })
        const hashedPassword = await bcrypt.hash(password, 10)
        password = hashedPassword
        const user = new User({ firstname, lastname, email, password });
        await user.save();
        return res.status(200).json({ message: "Registered successfully !" })

    } catch (error) {
        return res.status(400).json({ error: error })
    }

}



const login = async (req, res) => {

    try {

        const token = req.cookies.token;
        const body = req.body;



        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const user = await User.findById(decoded.id).select('-password')
            if (user) {
                return res.status(200).json({ user: user })
            }
        }


        const data = req.body;
        const error = loginValidation(data);

        if (error.error) return res.status(400).json({ error: error })

        const { email, password } = data;
        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json({ error: "Email or password is wrong" })
        const isMatch = bcrypt.compare(password, user.password)
        if (isMatch) {

            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
            console.log(token)

            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
            })
 
            const { firstname, lastname, email, _id } = user;
            return res.status(200).json({ user: { firstname, lastname, email, _id }, message: "Logged in successfully !" })
        }
        else {
            return res.status(400).json({ error: "Email or password is wrong" })
        }



    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

}


const logout = async (req, res) => {

    try {
        res.clearCookie('token')
        return res.status(200).json({ message: "Logged out successfully !" })


    } catch (error) {
        return res.status(400).json({ error: error })

    }

}

const checkTokenInCookies = async (req, res) => {

    try {
        const token = req.cookies.token;
        if (token) {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const user = await User.findById(decoded.id).select('-password')
            if (user) {
                return res.status(200).json({ user: user })
            }
        }
        else {
            return res.status(400).json({ error: "Token not found" })
        }

    } catch (error) {
        return res.status(400).json({ error: error })

    }
}



module.exports = { register, login, logout, checkTokenInCookies }
