const express = require('express')
const router = express.Router()

const repliesController = require('../controllers/replies')

router.get('/new', repliesController.getNewReply)

router.post('/', repliesController.postNewReply)

module.exports = router
