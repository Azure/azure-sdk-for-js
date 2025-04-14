## Setting up the perf project

1. Build the template perf test project `rush build -t perf-template`.
2. Navigate to `cd sdk/template/perf-tests/template`.

## Environment setup

Create a template namespace and populate the .env file with the necessary environment variables:

- `TEMPLATE_ENDPOINT_URL`: the endpoint URL of the App Configuration resource to target.
- `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`: tenant ID, client ID, and the client secret of an AAD app registration which you have permitted to access your App Configuration resource.

## Running the tests

To test the `getConfigurationSetting` method exposed by the template project:

> `npm run perf-test:node -- GetConfigurationSettingTest --warmup 1 --duration 2 --iterations 2 --parallel 2`

Note that the template project does not appropriately handle the app config service's rate limiting, and so increasing the duration and/or amount of parallelization may cause test failures due to the rate limit. This issue can be avoided by making use of the test proxy.

_Note: For more default options, refer [Perf-Framework-Default-Options](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/perf/README.md#keyconcepts)._
