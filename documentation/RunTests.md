## Running Node SDK Tests

#### Pre-requisite

* [Setup Environment Variables](./EnvironmentVariables.md)

#### Run Tests
* This will execute all the tests mentioned in azure-sdk-for-node/test/testlistarm.txt ```npm test```

* Running selective tests:
  Comment out the unrequired tests in azure-sdk-for-node/test/testlistarm.txt file by putting "# " at the beginning of line and run the tests by executing: ```npm test```

* For running arm tests, execute `npm run unit-arm`
