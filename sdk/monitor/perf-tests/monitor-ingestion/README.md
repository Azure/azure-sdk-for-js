### Guide

1. Build the monitor-query perf tests package `rush build -t perf-monitor-query`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create log analytics workspace account and populate the `.env` file with the values of variables specified from the `sample.env`
4. Run the tests as follows:

- metrics query
  - `npm run perf-test:node -- MetricsQueryTest --warmup 1 --iterations 1 --parallel 50 --duration 15`
- log query
  - `npm run perf-test:node -- LogQueryTest --warmup 1 --iterations 1 --parallel 50 --duration 15`
- log batch query
  - `npm run perf-test:node -- LogQueryBatchTest --warmup 1 --iterations 1 --parallel 50 --duration 15`
