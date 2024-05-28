const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const logic = require('../../logic');
const database = require('../../database');
const httpMocks = require('node-mocks-http');

describe('Logic Functions', () => {
  afterEach(() => {
    sinon.restore(); // Restore mocked functions after each test
  });

  it('should return all users when getAllUsers is called', () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    // Mock database query function
    const queryStub = sinon.stub(database, 'query').callsFake((query, callback) => {
      callback(null, mockUsers);
    });

    // Test the logic function
    logic.getAllUsers(req, res);

    expect(res.statusCode).to.equal(200);
    expect(res._getJSONData()).to.deep.equal(mockUsers);
    queryStub.restore(); // Restore the stub after the test
  });

  it('should return a user by ID if user exists when getUserById is called', () => {
    const mockUser = { id: 1, name: 'John Doe' };
    const req = httpMocks.createRequest({ params: { id: 1 } });
    const res = httpMocks.createResponse();

    // Mock database query function
    const queryStub = sinon.stub(database, 'query').callsFake((query, values, callback) => {
      callback(null, [mockUser]);
    });

    // Test the logic function
    logic.getUserById(req, res);

    expect(res.statusCode).to.equal(200);
    expect(res._getJSONData()).to.deep.equal(mockUser);
    queryStub.restore(); // Restore the stub after the test
  });

  it('should return 404 if user does not exist when getUserById is called', () => {
    const req = httpMocks.createRequest({ params: { id: 1 } });
    const res = httpMocks.createResponse();

    // Mock database query function
    const queryStub = sinon.stub(database, 'query').callsFake((query, values, callback) => {
      callback(null, []);
    });

    // Test the logic function
    logic.getUserById(req, res);

    expect(res.statusCode).to.equal(404);
    queryStub.restore(); // Restore the stub after the test
  });

  it('should render the create user form when createUserForm is called', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    // Test the logic function
    logic.createUserForm(req, res);

    expect(res.statusCode).to.equal(200);
    expect(res._getData()).to.contain('<h1>Create User</h1>');
    expect(res._getData()).to.contain('<form id="createUserForm">');
    expect(res._getData()).to.contain('<button type="submit">Create</button>');
  });

  it('should create a new user when createUser is called', () => {
    const req = httpMocks.createRequest({
      body: { name: 'John Doe', nickname: 'johnd', age: 30, bio: 'A bio' }
    });
    const res = httpMocks.createResponse();

    // Mock database query function
    const queryStub = sinon.stub(database, 'query').callsFake((query, values, callback) => {
      callback(null, { insertId: 1 });
    });

    // Test the logic function
    logic.createUser(req, res);

    expect(res.statusCode).to.equal(302); // Redirect status
    queryStub.restore(); // Restore the stub after the test
  });
});
