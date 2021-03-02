const express = require('express')
const router = express.Router()

const postController = require('../controllers/posts')

router.put('/posts/:id/vote-up', postController.putUpVote)

router.put('/posts/:id/vote-down', postController.putDownVote)

router.get('/new', postController.getNewPostForm)

router.post('/new', postController.createNewPost)

router.get('/:id', postController.getPost)

router.get('/', postController.getPosts)

module.exports = router
