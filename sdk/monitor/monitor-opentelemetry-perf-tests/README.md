### Guide

Use Node.js 22.23.4 or later on the 22.x line, 24.22.1 or later on the 24.x line, or 26.12.1 or later on the 26.x line. See the [Monitor runtime security requirements](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/README.md#nodejs-security-updates). Updating npm dependencies alone does not patch the runtime.

1. Build the monitor-opentelemetry perf tests package `pnpm build --filter perf-monitor-opentelemetry...`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create an Application Insights resource and populate the `.env` file with connectionString.
4. Run the tests as follows:

- Exporting Spans
  - `npm run perf-test:node -- SpanExportTest --warmup 1 --iterations 1 --parallel 2 --duration 15`
- Exporting Metrics
  - `npm run perf-test:node -- MetricExportTest --warmup 1 --iterations 1 --parallel 2 --duration 15`
- Exporting Logs
  - `npm run perf-test:node -- LogExportTest --warmup 1 --iterations 1 --parallel 2 --duration 15`
