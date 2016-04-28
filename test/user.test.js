var api = require('../app.js'),
request = require('supertest')(api);

var userId;
var username = "usertest";
var password = "passwordtest";
var email = "test@continuous-integration-test.com";
var citizen = "lyon";

describe('GET /users', function() {
  describe('#getAllUsers()', function () {
    it('respond with json', function (done) {
    	request
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500, {error: 'Getting all user is not allowed.'}, done);
    });
  });
});
describe('POST /user', function() {
  describe('#addUser()', function () {
    it('respond with json', function (done) {
    	request
        .post('/user')
        .set('Accept', 'application/json')
        // .expect('Content-Type', /json/)
        .expect(hasUserIdKeys)
        .expect(200, done);
    });
  });
});
describe('PUT /user/:id', function() {
  describe('#updateUser()', function () {
    if (userId != null) {
      it('respond with json', function (done) {
      	request
          .put('/user/')
          .set('Accept', 'application/json')
          // .expect('Content-Type', /json/)
          .expect(200, done);
      });
    }
  });
});
describe('DELETE /user/:id', function() {
  describe('#deleteUser()', function () {
    if (userId != null) {
      it('respond with json', function (done) {
      	request
          .delete('/user/')
          .set('Accept', 'application/json')
          // .expect('Content-Type', /json/)
          .expect(200, done);
      });
    }
  });
});
describe('GET /user/:id', function() {
  describe('#getUser()', function () {
    if (userId != null) {
      it('respond with json', function (done) {
      	request
          .get('/user/1')
          .set('Accept', 'application/json')
          // .expect('Content-Type', /json/)
          .expect(200, done);
      });
    }
  });
});
describe('GET /connection', function() {
  describe('#userConnection()', function () {
    if (userId != null) {
      it('respond with json', function (done) {
        request
          .get('/connection')
          .set('Accept', 'application/json')
          // .expect('Content-Type', /json/)
          .expect(200, done);
      });
    }
  });
});

function hasUserIdKeys(res) {
  if (!('userId' in res.body)) throw new Error("missing userId key. Body :" + JSON.stringify(res.body));
  else  userId = res.body.userId;
}