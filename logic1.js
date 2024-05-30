const path = require('path');
const fs = require('fs');

let mockData = {};

const loadMockData = () => {
  const dataPath = path.join(__dirname, 'mockDatabase.json');
  const rawData = fs.readFileSync(dataPath);
  mockData = JSON.parse(rawData);
};

const setMockData = (data) => {
  mockData = data;
};

const getAllUsers = () => mockData.users;

const getUserByName = (name) => mockData.users.find(u => u.name === name) || null;

const createUser = (user) => {
  const newUser = {
    id: mockData.users.length + 1,
    ...user
  };

  mockData.users.push(newUser);
  return newUser;
};

const updateUserByName = (name, updatedInfo) => {
  const userIndex = mockData.users.findIndex(u => u.name === name);

  if (userIndex !== -1) {
    const updatedUser = { ...mockData.users[userIndex], ...updatedInfo };
    mockData.users[userIndex] = updatedUser;
    return updatedUser;
  }

  return null;
};

const deleteUserByName = (name) => {
  const userIndex = mockData.users.findIndex(u => u.name === name);
  if (userIndex !== -1) {
    return mockData.users.splice(userIndex, 1)[0];
  }
  return null;
};

module.exports = {
  loadMockData,
  setMockData,
  getAllUsers,
  getUserByName,
  createUser,
  updateUserByName,
  deleteUserByName
};
