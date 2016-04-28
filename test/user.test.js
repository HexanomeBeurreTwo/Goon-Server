var api = require('../app.js'),
request = require('supertest')(api);

describe('GET /users', function() {
  describe('#getAllUsers()', function () {
    it('respond with json', function (done) {
    	request
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
describe('POST /user', function() {
  describe('#addUser()', function () {
    it('respond with json', function (done) {
    	request
        .post('/user')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
describe('PUT /user/:id', function() {
  describe('#updateUser()', function () {
    it('respond with json', function (done) {
    	request
        .put('/user/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
describe('DELETE /user/:id', function() {
  describe('#deleteUser()', function () {
    it('respond with json', function (done) {
    	request
        .delete('/user/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
describe('GET /user/:id', function() {
  describe('#getUser()', function () {
    it('respond with json', function (done) {
    	request
        .get('/user/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
describe('GET /connection', function() {
  describe('#getUser()', function () {
    it('respond with json', function (done) {
      request
        .get('/connection')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
