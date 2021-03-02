const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.getSignUp = (req, res) => {
  res.render('auth/sign-up')
}

exports.postSignUp = (req, res) => {
  const user = new User(req.body)
  user.save().then((user) => {
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' })
    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true })
    res.redirect('/')
  }).catch(err => {
    console.log(err.message)
    return res.status(400).send({ err: err })
  })
}

exports.getLogout = (req, res) => {
  res.clearCookie('nToken')
  res.redirect('/')
}

exports.getLogin = (req, res) => {
  res.render('auth/login')
}

exports.postLogin = (req, res) => {
  const username = req.body.username
  const password = req.body.password
  User.findOne(
    { username },
    'username password'
  ).then(user => {
    if (!user) {
      return res.status(401).send({ message: 'Wrong Username or Password' })
    }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { console.log(err) }
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong Username or password' })
      }
      const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
        expiresIn: '60 days'
      })
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true })
      res.redirect('/')
    })
  }).catch(err => {
    console.log(err)
  })
}
