require('dotenv').config()
const mongoose = require('mongoose')
const assert = require('assert')

const url = process.env.MONGO_URI
mongoose.Promise = global.Promise
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    assert.strictEqual(null, err)
    console.log('Connected successfully to database')

    // db.close(); turn on for testing
  }
)
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))
mongoose.set('debug', true)

module.exports = mongoose.connection
