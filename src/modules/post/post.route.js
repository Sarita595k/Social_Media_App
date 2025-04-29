const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../../middleware/auth')
const { getAllPostsCtrl, createPostCtrl, updatePostCtrl, deletepostCtrl } = require('./post.controller')

// router.use(isLoggedIn)
router.get('/', isLoggedIn, getAllPostsCtrl)
router.post('/', isLoggedIn, createPostCtrl)
router.patch('/:id', updatePostCtrl)
router.delete('/:id', deletepostCtrl)

module.exports = router