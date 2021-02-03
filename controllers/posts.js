const Post = require('../models/post')

exports.getNewPostForm = (req, res) => {
  return res.render('posts/posts-new')
}

exports.createNewPost = (req, res) => {
  const post = new Post(req.body)
  post.save((err, post) => {
    if (err) {
      console.log(err)
    }
    return res.redirect('/')
  })
}
