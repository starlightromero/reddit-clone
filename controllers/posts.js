const Post = require('../models/post')
const User = require('../models/user')

exports.getNewPostForm = (req, res) => {
  return res.render('posts/posts-new')
}

exports.createNewPost = (req, res) => {
  if (req.user) {
    const post = new Post(req.body)
    post.author = req.user._id
    post.upVotes = []
    post.downVotes = []
    post.voteScore = 0
    post.save().then(post => {
      return User.findById(req.user._id)
    }).then(user => {
      user.posts.unshift(post)
      user.save()
      res.redirect(`/posts/${post._id}`)
    }).catch(err => {
      console.log(err.message)
    })
  } else {
    return res.status(401)
  }
}

exports.getPosts = (req, res) => {
  const currentUser = req.user
  console.log(req.cookies)
  Post.find({}).lean().populate(
    'author'
  ).then(posts => {
    res.render('posts-index', { posts, currentUser })
  }).catch(err => {
    console.log(err.message)
  })
}

exports.getPost = (req, res) => {
  const currentUser = req.user
  Post.findById(
    req.params.id
  ).populate(
    'comments'
  ).lean().then(post => {
    res.render('posts-show', { post, currentUser })
  }).catch(err => {
    console.log(err.message)
  })
}

exports.putUpVote = (req, res) => {
  Post.findById(req.params.id).exec(function (err, post) {
    post.upVotes.push(req.user._id)
    post.voteScore = post.voteScore + 1
    post.save()
    res.status(200)
  })
})

exports.putDownVote = (req, res) => {
  Post.findById(req.params.id).exec(function (err, post) {
    post.downVotes.push(req.user._id)
    post.voteScore = post.voteScore - 1
    post.save()
    res.status(200)
  })
})
