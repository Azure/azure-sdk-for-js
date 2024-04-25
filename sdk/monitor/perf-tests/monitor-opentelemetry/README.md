### Guide

1. Build the monitor-opentelemetry perf tests package `rush build -t perf-monitor-opentelemetry`.
2. Copy the `sample.env` file and name it as `.env`.
3. Create an Application Insights resource and populate the `.env` file with connectionString.
4. Run the tests as follows:

- Exporting Spans
  - `npm run perf-test:node -- SpanExportTest --warmup 1 --iterations 1 --parallel 2 --duration 15`
- Exporting Metrics
  - `npm run perf-test:node -- MetricExportTest --warmup 1 --iterations 1 --parallel 2 --duration 15`
- Exporting Logs
  - `npm run perf-test:node -- LogExportTest --warmup 1 --iterations 1 --parallel 2 --duration 15`
