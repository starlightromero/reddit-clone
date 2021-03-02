const express = require('express')
const router = express.Router()

const subredditController = require('../controllers/subreddit')

router.get('/', subredditController.getSubreddit)

module.exports = router
