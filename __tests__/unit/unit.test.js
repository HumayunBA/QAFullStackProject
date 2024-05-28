const logic = require('../../logic'); // Updated path
const database = require('../../database'); // Updated path
const httpMocks = require('node-mocks-http');

// Mock database connection
jest.mock('../../database', () => ({
  query: jest.fn(),
}));

describe('Logic Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllUsers should return all users', () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    database.query.mockImplementation((query, callback) => {
      callback(null, mockUsers);
    });

    res.on('end', () => {
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockUsers);
    });

    logic.getAllUsers(req, res);
  });

  test('getUserById should return a user by ID if user exists', () => {
    const mockUser = { id: 1, name: 'John Doe' };
    const req = httpMocks.createRequest({ params: { id: 1 } });
    const res = httpMocks.createResponse();

    database.query.mockImplementation((query, values, callback) => {
      callback(null, [mockUser]);
    });

    res.on('end', () => {
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(mockUser);
    });

    logic.getUserById(req, res);
  });

  test('getUserById should return 404 if user does not exist', () => {
    const req = httpMocks.createRequest({ params: { id: 1 } });
    const res = httpMocks.createResponse();

    database.query.mockImplementation((query, values, callback) => {
      callback(null, []);
    });

    res.on('end', () => {
      expect(res.statusCode).toBe(404);
    });

    logic.getUserById(req, res);
  });

  test('createUserForm should render the create user form', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    // Since we are not sending a file path, let's check for specific HTML elements
    logic.createUserForm(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getData()).toContain('<h1>Create User</h1>');
    expect(res._getData()).toContain('<form id="createUserForm">');
    expect(res._getData()).toContain('<button type="submit">Create</button>');
  });

  test('createUser should create a new user', () => {
    const req = httpMocks.createRequest({
      body: { name: 'John Doe', nickname: 'johnd', age: 30, bio: 'A bio' }
    });
    const res = httpMocks.createResponse();

    database.query.mockImplementation((query, values, callback) => {
      callback(null, { insertId: 1 });
    });

    res.on('end', () => {
      expect(res.statusCode).toBe(302); // Redirect status
    });

    logic.createUser(req, res);
  });
});
