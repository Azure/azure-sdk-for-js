## Pre-requisites

- Run `npm i` to install all the dependencies of this project. This is a one time task
- Have a file by the name `.env` in the root folder of this project.
- This file should contain the below environment variables pointing to the various Service Bus resources
    - SERVICEBUS_CONNECTION_STRING
    - QUEUE_NAME (without sessions enabled)
    - TOPIC_NAME
    - SUBSCRIPTION_NAME

## Run all tests

Run `npm run unit` from your terminal to run all the tests under the `./test` folder

## Run all tests from a single file

Update the npm script for `unit` in the package.json file to replace the glob pattern that matches
all test files under the `test` folder with the relative path to the file you want to target.

Then run `npm run unit` from your terminal.

## Run all tests in a single test suite

Append the `.only` on the `describe` method corresponding to the test suite.

Then run `npm run unit` from your terminal.

## Run a single test

Append the `.only` on the `it` method corresponding to the test.

Then run `npm run unit` from your terminal.

## Debug tests using Visual Studio Code

- Run the command `Debug: Open launch.json`. 
- In the `launch.json` file that opens, update the `"${workspaceFolder}/test/test-file-to-debug.spec.ts"` to point to the test file you want to debug.
- Select the debug configuration `Debug Unit Tests` from the drop down in the debug viewlet.
- Add breakpoints in the test you want to debug. Tip: It is helpful to append the `.only` on the test method if you want only that method to be run.
- Start Debugging


