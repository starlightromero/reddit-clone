const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const routes = require('./routes/main')
const postRoutes = require('./routes/posts')

const port = 3000
const app = express()

app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
  layoutsDir: path.join(__dirname, '/views/layouts/'),
  partialsDir: path.join(__dirname, '/views/partials/'),
  extname: 'hbs',
  defaultLayout: 'base'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.use('/posts', postRoutes)
app.use(routes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
