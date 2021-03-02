const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')

exports.getNewReply = (req, res) => {
  const currentUser = req.user
  let post
  Post.findById(
    req.params.postId
  ).lean().then(p => {
    post = p
    return Comment.findById(req.params.commentId).lean()
  }).then(comment => {
    res.render('replies-new', { post, comment, currentUser })
  }).catch(err => {
    console.log(err.message)
  })
}

exports.postNewReply = (req, res) => {
  const reply = new Comment(req.body)
  reply.author = req.user._id
  Post.findById(req.params.postId).then(post => {
    Promise.all([
      reply.save(),
      Comment.findById(req.params.commentId)
    ]).then(([reply, comment]) => {
      comment.comments.unshift(reply._id)
      return Promise.all([
        comment.save()
      ])
    }).then(() => {
      res.redirect(`/posts/${req.params.postId}`)
    }).catch(console.error)
    return post.save()
  })
}
