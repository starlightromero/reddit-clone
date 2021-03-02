const Post = require('../models/post')

exports.getSubreddit = (req, res) => {
  const currentUser = req.user
  Post.find(
    { subreddit: req.params.subreddit }
  ).lean().then(posts => {
    res.render(
      'posts/posts-index',
      { posts, currentUser }
    )
  }).catch(err => {
    console.log(err)
  })
}
