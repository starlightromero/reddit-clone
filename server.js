require('dotenv').config()
const cookieParser = require('cookie-parser')
const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const checkAuth = require('./middleware/checkAuth')

const routes = require('./routes/main')
const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')
const authRoutes = require('./routes/auth')
const repliesRoutes = require('./routes/replies')
const subredditRoutes = require('./routes/subreddit')

require('./data/db')

const port = 3000
const app = express()

app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
  layoutsDir: path.join(__dirname, '/views/layouts/'),
  partialsDir: path.join(__dirname, '/views/partials/'),
  extname: 'hbs',
  defaultLayout: 'base'
}))

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(cookieParser())
app.use(checkAuth)

app.use('/posts/:postId/comments/:commentId/replies', repliesRoutes)
app.use('/posts/:postId/comments', commentRoutes)
app.use('/posts', postRoutes)
app.use('/n/:subreddit', subredditRoutes)
app.use(authRoutes)
app.use(routes)

app.listen(port)

module.exports = app
