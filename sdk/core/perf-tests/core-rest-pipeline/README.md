### Guide

1. Build the core-rest-pipeline perf tests package `rush build -t perf-core-rest-pipeline`.
3. Copy the `sample.env` file and name it as `.env`.
4. Populate the `.env` file with your Azure Credentials.
5. Refer to the [rate limits](https://docs.microsoft.com/azure/active-directory/enterprise-users/directory-service-limits-restrictions) and then run the tests as follows:

- `bearerTokenChallengeAuthenticationPolicy` test for the `challengeCallbacks`, for simple `WWW-Authenticate` challenges.
  - `npm run perf-test:node -- BearerTokenChallengeAuthenticationPolicyTest --warmup 1 --iterations 1 --parallel 5`
