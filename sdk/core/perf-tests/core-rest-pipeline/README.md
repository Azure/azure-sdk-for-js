### Guide

1. Build the core-rest-pipeline perf tests package `rush build -t perf-core-rest-pipeline`.
2. Copy the `sample.env` file and name it as `.env`.
3. Populate the `.env` file with your Azure Credentials.
4. Refer to the [rate limits](https://docs.microsoft.com/azure/active-directory/enterprise-users/directory-service-limits-restrictions) and then run the tests as follows:

- `bearerTokenAuthenticationPolicy` test for the `challengeCallbacks`, for simple `WWW-Authenticate` challenges.
  - `npm run perf-test:node -- BearerTokenAuthenticationPolicyChallengeTest --warmup 1 --iterations 1 --parallel 5`
- Comparing various HTTP clients...
  - `npm run perf-test:node -- FetchTest --warmup 1 --iterations 1 --parallel 5` [ 6,693.39 ops/sec ]
  - `npm run perf-test:node -- UndiciRequestTest --warmup 1 --iterations 1 --parallel 5` [ 19,733.93 ops/sec ]
  - `npm run perf-test:node -- CoreRestPipelineTest --warmup 1 --iterations 1 --parallel 5` [ 17,519.69 ops/sec]
  - `npm run perf-test:node -- CoreHTTPTest --warmup 1 --iterations 1 --parallel 5` [ 4,498.91 ops/sec]
  - `npm run perf-test:node -- HttpRequestTest --warmup 1 --iterations 1 --parallel 5` [ 19,632.64 ops/sec]
    [ -- number ops/sec -- ] are from a codespaces instance
