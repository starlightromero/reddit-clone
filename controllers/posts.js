const Post = require('../models/post')

exports.getNewPostForm = (req, res) => {
  return res.render('posts/posts-new')
}

exports.createNewPost = (req, res) => {
  if (req.user) {
    const post = new Post(req.body)
    post.save((err, post) => {
      return res.redirect(`/`)
    })
  } else {
    return res.status(401)
  }
}

exports.getPosts = (req, res) => {
  const currentUser = req.user
  Post.find({}).lean().then(posts => {
    res.render(
      'posts-index',
      { posts, currentUser }
    )
  }).catch(err => {
    console.log(err.message)
  })
}

exports.getPost = (req, res) => {
  Post.findById(req.params.id).lean().populate('comments').then((post) => {
    res.render('posts/post-detail', {
      post
    })
  }).catch((err) => {
    console.log(err.message)
  })
}
