### Guide

1. Build the core-rest-pipeline perf tests package `rush build -t perf-core-rest-pipeline`.
2. Copy the `sample.env` file and name it as `.env`.
3. Populate the `.env` file with your Azure Credentials.
4. Refer to the [rate limits](https://docs.microsoft.com/azure/active-directory/enterprise-users/directory-service-limits-restrictions) and then run the tests as follows:

- `bearerTokenAuthenticationPolicy` test for the `challengeCallbacks`, for simple `WWW-Authenticate` challenges.
  - `npm run perf-test:node -- BearerTokenAuthenticationPolicyChallengeTest --warmup 1 --iterations 1 --parallel 5`
  - `npm run perf-test:node -- FetchTest --warmup 1 --iterations 1 --parallel 5` [ 1572.2 ops/sec ]
  - `npm run perf-test:node -- CoreRestPipelineTest --warmup 1 --iterations 1 --parallel 5` [ 4163.02 ops/sec]
  - `npm run perf-test:node -- CoreHTTPTest --warmup 1 --iterations 1 --parallel 5` [ 993.29 ops/sec]
  [ -- number ops/sec -- ] are from a codespaces instance
