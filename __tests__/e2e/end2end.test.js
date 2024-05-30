const { Builder, By } = require('selenium-webdriver');

// Increase timeout for this test file
jest.setTimeout(90000); // Set timeout to 90 seconds

async function createUserTest() {
  let driver = await new Builder().forBrowser('firefox').build();

  try {
    // Navigate to the application
    await driver.get('http://localhost:3000');
    
    // Click on create user button
    await driver.findElement(By.id('create-user')).click();

    // Fill out the user creation form
    await driver.findElement(By.id('name')).sendKeys('John Doe');
    await driver.findElement(By.id('nickname')).sendKeys('johnd');
    await driver.findElement(By.id('age')).sendKeys('30');
    await driver.findElement(By.id('bio')).sendKeys('A bio');
    
    // Submit the form
    await driver.findElement(By.id('submit')).click();

    // Wait for redirection and user list to be updated
    await driver.get('http://localhost:3000');
    
    // Wait for the user list to be populated
    await driver.sleep(2000); // Adjust sleep time if necessary

    // Find the newly created user by its ID
    let newUserElement = await driver.findElement(By.id('user-1')); // Assuming '1' is the ID of the newly created user
    let newUserText = await newUserElement.getText();

    // Verify the new user details
    let newUserFound = newUserText.includes('John Doe') &&
                       newUserText.includes('johnd') &&
                       newUserText.includes('30') &&
                       newUserText.includes('A bio');

    return newUserFound;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  } finally {
    await driver.quit();
  }
}

test('User creation test', async () => {
  expect(await createUserTest()).toBe(true);
});
