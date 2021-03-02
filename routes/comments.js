const express = require('express')
const router = express.Router()

const commentsController = require('../controllers/comments')
const isAuth = require('../middleware/isAuth')

router.post('/', isAuth, commentsController.createNewComment)

module.exports = router
