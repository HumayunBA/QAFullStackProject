const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
describe('User Application Tests', function () {
  this.timeout(10000); // Set default timeout to 10 seconds
  let driver;
  beforeEach(async function () {
    driver = await new Builder().forBrowser('firefox').build();
    await driver.manage().setTimeouts({ implicit: 10000 }); // Set implicit wait for 10 seconds
  });
  afterEach(async function () {
    if (driver) {
      await driver.quit();
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
    }
  });
  it('should list existing users', async function () {
    await driver.get('http://localhost:3000/'); // Replace with your server address
    const userList = await driver.findElement(By.id('userList'));
    const users = await userList.findElements(By.tagName('li'));
    assert(users.length > 0, 'User list should not be empty');
    const firstUserLink = await users[0].findElement(By.tagName('a'));
    await firstUserLink.click();
  });
  it('should create a new user', async function () {
    await driver.get('http://localhost:3000/create.html');
    const nameField = await driver.findElement(By.id('name'));
    const nicknameField = await driver.findElement(By.id('nickname'));
    const ageField = await driver.findElement(By.id('age'));
    const bioField = await driver.findElement(By.id('bio'));
    const submitButton = await driver.findElement(By.id('submit'));
    await nameField.sendKeys('Test User');
    await nicknameField.sendKeys('test_user');
    await ageField.sendKeys(25);
    await bioField.sendKeys('This is a test user bio.');
    await submitButton.click();
    await driver.sleep(2000); // Adjust wait time as needed
    await driver.get('http://localhost:3000/');
    const updatedUserList = await driver.findElement(By.id('userList'));
    const updatedUsers = await updatedUserList.findElements(By.tagName('li'));
    let found = false;
    for (const user of updatedUsers) {
      const userLink = await user.findElement(By.tagName('a'));
      const userLinkText = await userLink.getText();
      if (userLinkText.includes('Test User (test_user)')) {
        found = true;
        break;
      }
    }
    assert(found, 'Newly created user not found in the list');
  });
  it('should edit an existing user', async function () {
    await driver.get('http://localhost:3000/');
    const userList = await driver.findElement(By.id('userList'));
    const users = await userList.findElements(By.tagName('li'));
    assert(users.length > 0, 'User list should not be empty');
    const firstUserLink = await users[0].findElement(By.tagName('a'));
    await firstUserLink.click();
    await driver.wait(until.elementLocated(By.className('editBtn')), 20000); // Wait for the edit button
    const editButton = await driver.findElement(By.className('editBtn'));
    await editButton.click();
    const nameField = await driver.findElement(By.id('name'));
    await nameField.clear();
    await nameField.sendKeys('Updated Test User');
    const editSubmitButton = await driver.findElement(By.id('editButton'));
    await editSubmitButton.click();
    await driver.sleep(2000); // Adjust wait time as needed
    await driver.get('http://localhost:3000/');
    const updatedUserList = await driver.findElement(By.id('userList'));
    const updatedUsers = await updatedUserList.findElements(By.tagName('li'));
    let found = false;
    for (const user of updatedUsers) {
      const userLink = await user.findElement(By.tagName('a'));
      const userLinkText = await userLink.getText();
      if (userLinkText.includes('Updated Test User')) {
        found = true;
        break;
      }
    }
    assert(found, 'Edited user not found in the list');
  });
  it('should delete an existing user', async function () {
    await driver.get('http://localhost:3000/');
    const userList = await driver.findElement(By.id('userList'));
    const users = await userList.findElements(By.tagName('li'));
    assert(users.length > 0, 'User list should not be empty');
    const deleteButtons = await driver.findElements(By.css('.deleteBtn'));
    if (deleteButtons.length > 0) {
      // Click the first delete button found
      await deleteButtons[0].click();
    } else {
      console.error('Delete button not found');
      throw new Error('Delete button not found');
    }
    await driver.sleep(2000); // Adjust wait time as needed
    await driver.get('http://localhost:3000/');
    const updatedUserList = await driver.findElement(By.id('userList'));
    const updatedUsers = await updatedUserList.findElements(By.tagName('li'));
    const userCountAfterDelete = updatedUsers.length;
    assert(userCountAfterDelete < users.length, 'User was not deleted successfully');
  });
});