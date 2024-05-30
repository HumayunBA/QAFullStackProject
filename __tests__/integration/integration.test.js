const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const sinon = require('sinon');
const express = require('express');
const bodyParser = require('body-parser');
const logic = require('../../logic'); 
const database = require('../../database');

const app = express();
app.use(bodyParser.json());

app.get('/users', logic.getAllUsers);
app.get('/users/:id', logic.getUserById);
app.post('/users', logic.createUser);
app.delete('/users/:id', logic.deleteUser); 



describe('Logic Functions', () => {
  afterEach(() => {
    sinon.restore(); 
  });

  it('should return all users when getAllUsers is called', (done) => {
    const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];

    const queryStub = sinon.stub(database, 'query').callsFake((query, callback) => {
      callback(null, mockUsers);
    });

    request(app)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.deep.equal(mockUsers);
        queryStub.restore(); 
        done();
      });
  });

  it('should return a user by ID if user exists when getUserById is called', (done) => {
    const mockUser = { id: 1, name: 'John Doe' };

    const queryStub = sinon.stub(database, 'query').callsFake((query, values, callback) => {
      callback(null, [mockUser]);
    });

    request(app)
      .get('/users/1')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.deep.equal(mockUser);
        queryStub.restore(); 
        done();
      });
  });

  it('should return 404 if user does not exist when getUserById is called', (done) => {

    const queryStub = sinon.stub(database, 'query').callsFake((query, values, callback) => {
      callback(null, []);
    });

    request(app)
      .get('/users/1')
      .expect(404, done);
  });

  it('should create a new user when createUser is called', (done) => {

    const queryStub = sinon.stub(database, 'query').callsFake((query, values, callback) => {
      callback(null, { insertId: 1 });
    });

    request(app)
      .post('/users')
      .send({ name: 'John Doe', nickname: 'johnd', age: 30, bio: 'A bio' })
      .expect(302, done);
  });

  it('should delete a user by ID if user exists when deleteUser is called', (done) => {
    const userId = 1;

    const queryStub = sinon.stub(database, 'query').callsFake((query, values, callback) => {

      callback(null, { affectedRows: 1 });
    });

    request(app)
      .delete(`/users/${userId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        queryStub.restore(); 
        done();
      });
  });
});
