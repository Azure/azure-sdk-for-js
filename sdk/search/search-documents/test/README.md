# Testing

To run our tests, first do a full update of the project by running `rush update`, then rebuild either this package, with `rush build -t @azure/search-documents` or all packages with `rush build`, then make sure to build the tests with `rush build:test`. After that, you can either run our unit tests, which won't reach to live services, and our integration tests, which will indeed require existing, reachable resources.

## Run all tests

Run `rushx test:node` or `rushx test:browser` from your terminal to run all the tests under the `./test` folder

## Run all tests in a single test suite

Append the `.only` on the `describe` method corresponding to the test suite.

Then run `rushx test:node` or `rushx test:browser` from your terminal.

## Run a single test

Append the `.only` on the `it` method corresponding to the test.

Then run `rushx test:node` or `rushx test:browser` from your terminal.

## Debug tests using Visual Studio Code

- Select the debug configuration `Debug Unit Tests` from the drop down in the debug viewlet.
- Add breakpoints in the test you want to debug. Tip: It is helpful to append the `.only` on the test method if you want only that method to be run.
- Start Debugging

## Unit tests

To run unit tests, go to the root of this library and run `rushx unit-test`. This will run tests in a purely nodejs environment, and in a browser environment using [Karma](https://karma-runner.github.io/latest/index.html). These tests aim to reproduce the behavior of our library against remote endpoints through previously recorded HTTP request and responses. You won't need to have any environment configuration, nor internet access, for these tests to run.

Keep in mind that if you modify the test files, the API shape of this library, or the underlying network calls, the recordings need to be re-generated.

You can read more in the section: [Regenerating recordings](#regenerating-recordings).

## Integration tests

Our integration tests will run against the live resources, which are determined by the environment variables you provide.

To run the integration tests, you will need to execute `rushx integration-test`.

To generate new resources for your tests, follow the procedure at [Integration Testing with live services](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#integration-testing-with-live-services).

The environment variables needed are:

- `SEARCH_API_ADMIN_KEY`: The primary key of your Azure Search account.
- `SEARCH_API_ADMIN_KEY_ALT` (optional): The secondary key of your Azure Search account.
- `ENDPOINT`: The endpoint of your Azure Search account.

Integration tests won't need updated recordings, and they also won't change previous recordings unless specified (see [Regenerating recordings](#regenerating-recordings)).

## Regenerating recordings

If you modify the test files, the API shape of this library, or the underlying network calls, the recordings need to be re-generated before you run the unit tests.

To re-generate the recordings, set the environment variable `TEST_MODE` to `record` and then run the integration tests. Once the integration tests finish,
the recordings will be updated.

## The common recorder

Our tests use our library [test-utils-recorder](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/test-utils/recorder).
For any other question or if you want to help us get better at testing, please read the [test-utils-recorder's readme](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/test-utils/recorder/README.md).

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fsearch%2Fsearch-documents%2Ftest%2FREADME.png)
