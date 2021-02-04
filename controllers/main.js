const Post = require('../models/post')

exports.index = (req, res) => {
  return res.render('index')
}

exports.getSubreddit = (req, res) => {
  Post.find(
    { subreddit: req.params.subreddit }
  ).lean().then(posts => {
    res.render('posts-index', { posts })
  }).catch(err => {
    console.log(err)
  })
}
