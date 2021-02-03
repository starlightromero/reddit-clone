exports.getNewPostForm = (req, res) => {
  return res.render('posts/posts-new')
}

exports.createNewPost = (req, res) => {
  console.log(req.body)
  return res.render('posts/posts-new')
}
