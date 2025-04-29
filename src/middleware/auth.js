const jwt = require('jsonwebtoken')
// const express = require('express')
require('dotenv').config()

const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).send("not logged in")
    }
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY_FOR_JWT)
        req.user = decode
        next()
    } catch (err) {
        res.status(401).json({
            status: "failed",
            message: "Error in auth file"
        })
    }
}
module.exports = { isLoggedIn }