const jwt = require('jsonwebtoken')
// const express = require('express')
require('dotenv').config()

const auth = (req, res, next) => {
    const authIs = req.headers['authorization']
    const token = authIs && authIs.split(" ")[1]
    if (!token) {
        return res.send("no token provided")
    }
    jwt.verify(token, process.env.SECRET_KEY_FOR_JWT, (err, user) => {
        if (err) {
            return res.send("invalid token")
        }
        req.user = user
        next()
    })
}
module.exports = auth