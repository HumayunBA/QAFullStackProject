// mockdatabase.js

const mockDatabase = {
    users: []
};

// To save user data to the mock database
function saveUserToMockDatabase(userData) {
    
    // For now, let's just push it to our mock database
    mockDatabase.users.push(userData);
}

// Export the mock database object and the function to be used by other files if needed
module.exports = {
    mockDatabase,
    saveUserToMockDatabase
};
