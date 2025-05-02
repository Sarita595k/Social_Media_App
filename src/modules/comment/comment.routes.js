// comments route starts here
const express = require('express')
const { getComment, addComment, updateComment, deleteComment } = require('./comment.controller')
const router = express.Router()

router.get('/', getComment)
router.post('/comment/:id', addComment)
router.patch('/comment/:id', updateComment)
router.delete('/comment/:id', deleteComment)
module.exports = router