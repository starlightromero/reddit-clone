const path = require('path')
const express = require('express')
const handlebars = require('express-handlebars')
const routes = require('./routes/main')

const port = 3000
const app = express()

app.set('view engine', 'hbs')
app.engine('hbs', handlebars({
  layoutsDir: path.join(__dirname, '/views/layouts/'),
  partialsDir: path.join(__dirname, '/views/partials/'),
  extname: 'hbs',
  defaultLayout: 'base'
}))

app.use(routes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
