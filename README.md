# QAFullstackProject

This is a QA project which tests a fullstack application built on Nodejs Express and Mysql Workbench for a user management system. The project tests unit functions, integration tests, and then end to end system testing. For testing supertest, jest, chai, and mocha and mochawsome is used. Please following instruction after cloning or downloading the repository.

## Instructions to run:
Install the following depencies on nodejs express server:
body-parser": "^1.19.0",
    "chai": "^4.3.4",
    "chai-http": "^4.4.0",
    "ejs": "^3.1.6",
    "express": "^4.19.2",
    "fs": "^0.0.1-security",
    "mysql2": "^3.9.8",
    "node-mocks-http": "^1.14.1",
    "selenium-webdriver": "^4.21.0",
    "sinon": "^18.0.0",
    "sqlite3": "^5.0.2",
    "supertest": "^7.0.0"
    "jest": "^27.0.6",
    "mocha": "^10.4.0",
    "mochawesome": "^7.1.3"
Then npm start for the server and to run the tests please use the following command:
npm run testmocha
All tests (15 in total) shall pass. Then see the report in JSON or HTML format.