const { Builder, By, Key, until } = require('selenium-webdriver');

async function createUserTest() {
  // Create a new WebDriver instance
  let driver = await new Builder().forBrowser('firefox').build();

  try {
    // Step 1: Navigate to the Create User Page
    await driver.get('http://localhost:3000');
    await driver.findElement(By.id('create-user')).click();

    // Step 2: Fill out the Form
    await driver.findElement(By.id('name')).sendKeys('John Doe');
    await driver.findElement(By.id('nickname')).sendKeys('johnd');
    await driver.findElement(By.id('age')).sendKeys('30');
    await driver.findElement(By.id('bio')).sendKeys('A bio');

    // Step 3: Submit the Form
    await driver.findElement(By.id('submit')).click();

    // Step 4: Verify User Creation
    await driver.get('http://localhost:3000');
    let userElements = await driver.findElements(By.className('user'));
    let newUserFound = false;
    for (let userElement of userElements) {
      let userText = await userElement.getText();
      if (userText.includes('John Doe') && userText.includes('johnd') && userText.includes('30') && userText.includes('A bio')) {
        newUserFound = true;
        break;
      }
    }
    if (newUserFound) {
      console.log('User creation test passed!');
    } else {
      console.error('User creation test failed!');
    }

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Quit the WebDriver session
    await driver.quit();
  }
}

// Run the test
createUserTest();
