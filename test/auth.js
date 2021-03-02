const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

const User = require('../models/user')

const should = chai.should()
chai.use(chaiHttp)

describe('User', function () {
  const agent = chai.request.agent(server)
  it('should not be able to login if they have not registered', function (done) {
    agent.post(
      '/login',
      {
        email: 'wrong@wrong.com',
        password: 'nope'
      }
    ).end(
      function (err, res) {
        res.status.should.be.equal(401)
        done()
      }
    )
  })

  it('should be able to signup', function (done) {
    User.findOneAndRemove({ username: 'testone' }, function () {
      agent.post(
        '/sign-up'
      ).send(
        {
          username: 'testone',
          password: 'password'
        }
      ).end(
        function (err, res) {
          if (err) { done(err) }
          res.should.have.status(200)
          agent.should.have.cookie('nToken')
          done()
        }
      )
    })
  })

  it('should be able to login', function (done) {
    agent.post(
      '/login'
    ).send(
      {
        username: 'testone',
        password: 'password'
      }
    ).end(function (err, res) {
      if (err) { done(err) }
      res.should.have.status(200)
      agent.should.have.cookie('nToken')
      done()
    })
  })

  it('should be able to logout', function (done) {
    agent.get(
      '/logout'
    ).end(function (err, res) {
      if (err) { done(err) }
      res.should.have.status(200)
      agent.should.not.have.cookie('nToken')
      done()
    })
  })

  after(function () {
    agent.close()
  })
})
