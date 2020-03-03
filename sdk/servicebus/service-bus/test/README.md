## Pre-requisites

- Run `npm i` to install all the dependencies of this project. This is a one time task.
- The tests expect a Service Bus namespace to exist.
  The connection string for the service bus should be in the environment variable `SERVICEBUS_CONNECTION_STRING`. 

  Note that the tests will recreate entities to get a clean start before running each test.

  See `testUtils.ts` file for information on names used for the entities against which the tests are run.

    The environment variables can be set by adding a file by the name `.env` in the root folder of this project.
    Following is a sample .env file template:
    ```
    SERVICEBUS_CONNECTION_STRING=

    ```

## Setup for running tests that use AAD based authentication
Go through the following setup in order to correctly setup the AAD credentials for tests that require it.

**Register a new application in AAD**

- Follow [Documentation to register a new application](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) in the Azure Active Directory(in the azure-portal).
- Note down the `CLIENT_ID` and `TENANT_ID`.
- In the "Certificates & Secrets" tab, create a secret and note that down.

**Assign owner role to the registered application**

- In the azure-portal, go to your servicebus-namespace and assign **Azure Service Bus Data Owner** role to the registered application.
- This can be done from `Role assignment` section of `Access control (IAM)` tab (in the left-side-navbar of your servicebus-namespace in the azure-portal)<br>
  _Doing this would allow the registered application manage the namespace, i.e., entity creation, deletion, etc.,_<br>
- For more information on Service Bus RBAC setup - [Learn more](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-role-based-access-control)

**Update your environment variables**

Populate the following variables along with the above mentioned environment variables in the `.env`.
```
AZURE_CLIENT_ID=""
AZURE_CLIENT_SECRET=""
AZURE_TENANT_ID=""
```

## Run all tests

Run `npm run test:node` or `npm run test:browser` from your terminal to run all the tests under the `./test` folder

## Run all tests in a single test suite

Append the `.only` on the `describe` method corresponding to the test suite.

Then run `npm run test:node` or `npm run test:browser` from your terminal.

## Run a single test

Append the `.only` on the `it` method corresponding to the test.

Then run `npm run test:node` or `npm run test:browser` from your terminal.

## Debug tests using Visual Studio Code

- Select the debug configuration `Debug Unit Tests` from the drop down in the debug viewlet.
- Add breakpoints in the test you want to debug. Tip: It is helpful to append the `.only` on the test method if you want only that method to be run.
- Start Debugging




![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fservicebus%2Fservice-bus%2Ftest%2FREADME.png)
