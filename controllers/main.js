const Post = require('../models/post')

exports.index = (req, res) => {
  return res.render('index')
}

exports.getSubreddit = (req, res) => {
  const currentUser = req.user
  Post.find(
    { subreddit: req.params.subreddit }
  ).lean().then(posts => {
    res.render(
      'posts-index',
      { posts, currentUser }
    )
  }).catch(err => {
    console.log(err)
  })
}
