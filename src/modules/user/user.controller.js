const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { createUser, checkUserEmail } = require('./user.repository')
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = { name, email, password: hashedPassword }
        await createUser(newUser)
        res.status(200).json({
            status: "Success",
            message: "Sign up successfully"
        })
    } catch (err) {
        res.status(401).json({
            status: "Failed",
            message: "Sign up failed"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await checkUserEmail(email)
        if (!user) {
            return res.status(401).json({
                status: "failed",
                message: "invalid email"
            })
        }
        const checkUserPassword = await bcrypt.compare(password, user.password)
        if (!checkUserPassword) {
            return res.status(401).json({
                status: "failed",
                message: "invalid password"
            })
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.SECRET_KEY_FOR_JWT, { expiresIn: "15m" })
        res.status(200).json({
            status: "Success",
            message: "Login successfully",
            token: token
        })
    } catch (err) {
        res.status(401).json({
            status: "failed",
            message: "error in login"
        })
    }
}

module.exports = { signupUser, loginUser }