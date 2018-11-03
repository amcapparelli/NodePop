var { expect } = require('chai')
const nodePop = require('../app')
const request = require('supertest')


describe('Api', function () {
    it('should return json response', function(done) {
        request(nodePop)
        .get('/apiv1/adsdata')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
})

describe('Api authenticate', function () {
    it('should return json response', function(done) {
        request(nodePop)
        .get('/apiv1/authenticate')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
})

describe('Api requires authentication', function () {
    it('should require authentication to get data from api', function(done) {
        request(nodePop)
        .get('/apiv1/adsdata')
        .expect('Content-Type', /json/)
        .expect({
            "success": false,
            "code": 401,
            "error": "Authentication required"
        }, done)
    })
})

var user = {
    email: 'user@example.com',
    password: '1234'
}

describe('Get data with authentication', function() {
    let token = null

    before(function(done) {
        request(nodePop)
        .post('/apiv1/authenticate')
        .send(user)
        .end(function (err, res) {
            token = res.body.token
            done()
        })
    })
    it('should let authenticated user get data', function (done) {
        request(nodePop)
        .get('/apiv1/adsdata')
        .send({token: token})
        .end(function (error, res) {
            expect(res.body.success).to.equal(true)
            expect(res.body).to.have.property('result')
            expect(res.body).to.have.property('allTags')
            done()
        })
})
})