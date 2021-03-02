const express = require('express')
const router = express.Router()

const postController = require('../controllers/posts')
const isAuth = require('../middleware/isAuth')

router.put('/:id/vote-up', isAuth, postController.putUpVote)

router.put('/:id/vote-down', isAuth, postController.putDownVote)

router.get('/new', isAuth, postController.getNewPostForm)

router.post('/new', isAuth, postController.createNewPost)

router.get('/:id', postController.getPost)

router.get('/', postController.getPosts)

module.exports = router
