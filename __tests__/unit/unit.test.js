const { expect } = require('chai');
const logic = require('../../logic1');
const originalMockDatabase = require('../../mockDatabase.json'); 

let mockDatabase;

beforeEach(() => {
  mockDatabase = JSON.parse(JSON.stringify(originalMockDatabase));
  logic.setMockData(mockDatabase); 
});

describe('Logic Functions', () => {
  it('getAllUsers should return all users', () => {
    const users = logic.getAllUsers();

    expect(users).to.deep.equal(mockDatabase.users);
  });

  it('getUserByName should return a user by name if user exists', () => {
    const userName = 'John Doe';
    const user = mockDatabase.users.find(u => u.name === userName);

    const result = logic.getUserByName(userName);

    expect(result).to.deep.equal(user);
  });

  it('getUserByName should return null if user does not exist', () => {
    const userName = 'Nonexistent User';

    const result = logic.getUserByName(userName);

    expect(result).to.be.null;
  });

  it('createUser should add a new user', () => {
    const newUser = { name: 'Alice Doe', nickname: 'aliced', age: 25, bio: 'Lorem ipsum...' };
    const createdUser = logic.createUser(newUser);
    const users = logic.getAllUsers();

    expect(users).to.deep.include(createdUser);
  });

  it('updateUserByName should update an existing user', () => {
    const userName = 'John Doe';
    const updatedInfo = { age: 35 };
    logic.updateUserByName(userName, updatedInfo);
    const updatedUser = logic.getUserByName(userName);
    expect(updatedUser.age).to.equal(updatedInfo.age);
  });

  it('deleteUserByName should delete an existing user', () => {
    const userName = 'John Doe';
    const deletedUser = logic.deleteUserByName(userName);
    const users = logic.getAllUsers();
    expect(deletedUser).to.exist;
    expect(users.find(u => u.name === userName)).to.not.exist;
  });

});
