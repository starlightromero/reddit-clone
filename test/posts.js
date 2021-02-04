const app = require('./../server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect

const Post = require('../models/post')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

describe('Posts', function () {
  const agent = chai.request.agent(server)
  const newPost = {
    title: 'post title',
    url: 'https://www.google.com',
    summary: 'post summary'
  }
  it('Should create with valid attributes at POST /posts/new', function (done) {
  // Checks how many posts there are now
    Post.estimatedDocumentCount().then(function (initialDocCount) {
      agent.post(
        '/posts/new'
      ).set(
        'content-type', 'application/x-www-form-urlencoded'
      ).send(
        newPost
      ).then(function (res) {
        Post.estimatedDocumentCount().then(function (newDocCount) {
          // Check that the database has one more post in it
          expect(res).to.have.status(200)
          // Check that the database has one more post in it
          expect(newDocCount).to.be.equal(initialDocCount + 1)
          done()
        }).catch(function (err) {
          done(err)
        })
      }).catch(function (err) {
        done(err)
      })
    }).catch(function (err) {
      done(err)
    })
  })

  after(function () {
    Post.findOneAndDelete(newPost)
  })
})
