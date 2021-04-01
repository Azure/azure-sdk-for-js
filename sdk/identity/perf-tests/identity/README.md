### Guide

**Important:**  
These tests won't work on Node 8 nor Node 15.

1. Install `@azure/msal-node-extensions@1.0.0-alpha.6` globally with `npm i -g @azure/msal-node-extensions@1.0.0-alpha.6`.
2. Build the Identity perf tests package `rush build -t perf-identity`.
3. Copy the `sample.env` file and name it as `.env`.
4. Populate the `.env` file with your Azure Credentials.
5. Refer to the [rate limits](https://docs.microsoft.com/azure/active-directory/enterprise-users/directory-service-limits-restrictions) and then run the tests as follows:

- `DeviceCodeCredential` test for the `tokenCachePersistenceOptions`.
  - `npm run perf-test:node -- DeviceCodeCredentialPersistenceTest --warmup 1 --iterations 1 --parallel 5`
