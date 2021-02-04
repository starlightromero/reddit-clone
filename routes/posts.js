const express = require('express')
const router = express.Router()

const postController = require('../controllers/posts')

router.get('/new', postController.getNewPostForm)
router.post('/new', postController.createNewPost)
router.get('/', postController.getPosts)

module.exports = router
