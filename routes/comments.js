const express = require('express')
const router = express.Router()

const commentsController = require('../controllers/comments')

router.post('/posts/:postId/comments', commentsController.createNewComment)
