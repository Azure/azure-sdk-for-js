### Guide

1. Build the Identity perf tests package `rush build -t perf-identity`.
2. Copy the `sample.env` file and name it as `.env`.
3. Populate the `.env` file with your Azure Credentials.
4. Refer to the [rate limits](https://learn.microsoft.com/entra/identity/users/directory-service-limits-restrictions) and then run the tests as follows:

- `ClientSecretCredential` test for the `tokenCachePersistenceOptions`.
  - `npm run perf-test:node -- ClientSecretCredentialPersistenceTest --warmup 1 --iterations 1 --parallel 5`
