# Testing

To run our tests, first install the dependencies by running `npm install` (or `rush install`) at the root of the source code of this library (keyvault-certificates).
With the dependencies installed, you'll be able to run the unit tests and integration tests.

## Unit tests

To run unit tests, go to the root of this library (keyvault-certificates) and run `npm run unit-test`.
This will run tests in a purely nodejs environment, and in a browser environment using [Karma](https://karma-runner.github.io/latest/index.html).
These tests aim to reproduce the behavior of our library against remote endpoints through previously recorded HTTP request and responses.
You won't need to have any environment configuration, nor internet access, for these tests to run.

Keep in mind that if you modify the test files, the API shape of this library, or the underlying network calls, the recordings need to be re-generated.
You can read more in the section: [Regenerating recordings](#regenerating-recordings).

## Integration tests

Our integration tests will run against the live resources, which are determined by the environment variables you provide.
To run the integration tests, you will need to execute `npm run integration-test`.

The environment variables needed are:

- `AZURE_CLIENT_ID`: The Client ID of your Azure account.
- `AZURE_CLIENT_SECRET`: The secret of your Azure account.
- `AZURE_TENANT_ID`: The Tenant ID of your Azure account.
- `KEYVAULT_NAME`: The name of the Key Vault you want to run the tests against.

Integration tests won't need updated recordings, and they also won't change previous recordings unless specified (see [Regenerating recordings](#regenerating-recordings)).

## Regenerating recordings

If you modify the test files, the API shape of this library, or the underlying network calls, the recordings need to be re-generated before you run the unit tests.

To re-generate the recordings, set the environment variable `TEST_MODE` to `record` and then run the integration tests. Once the integration tests finish,
the recordings will be updated.

## The common recorder

Our tests use our library [test-utils-recorder](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/test-utils/recorder).
For any other question or if you want to help us get better at testing, please read the [test-utils-recorder's readme](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/test-utils/recorder/README.md).