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

exports.getPosts = (req, res) => {
  Post.find({}).lean().then(posts => {
    res.render('posts/posts-index', {
      posts
    })
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
