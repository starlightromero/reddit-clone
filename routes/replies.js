const express = require('express')
const router = express.Router()

const repliesController = require('../controllers/replies')
const isAuth = require('../middleware/isAuth')

router.get('/new', isAuth, repliesController.getNewReply)

router.post('/', isAuth, repliesController.postNewReply)

module.exports = router
