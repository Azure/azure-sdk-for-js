### Guide

This is a template project demonstrating how to create performance tests using the `@azure/test-utils-perf` package.

To build:
1. Build the template perf tests package `rush build -t perf-template`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create a App Configuration resource and populate the `.env` file with the necessary variables:
   - `TEMPLATE_ENDPOINT_URL`: the endpoint URL of the App Configuration resource to target.
   - `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`: tenant ID, client ID, and the client secret of an AAD app registration which you have permitted to access your App Configuration resource.
4. Run the tests as follows
   - get configuration setting
     - `npm run perf-test:node -- GetConfigurationSettingTest --warmup 1 --duration 2 --iterations 2 --parallel 2`
     - Note that the template project does not appropriately handle hitting rate limits, and so increasing the duration and/or amount of parallelization may cause test failures due to the rate limit.
