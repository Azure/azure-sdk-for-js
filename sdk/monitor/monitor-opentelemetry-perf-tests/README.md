### Guide

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

### Offline exporter routing benchmark

From `sdk/monitor/monitor-opentelemetry-exporter`, run `pnpm benchmark:routing` after
building the exporter and its dependencies. No Azure resources or credentials are needed.

Each case exports the same size batch (512 completed spans) to an in-memory HTTP transport.
For 1, 3, and 25 destinations, compare routing enabled against two single-endpoint
baselines: routing disabled without attributes and routing disabled with the same destination
attributes. In disabled mode all spans go to the host, regardless of destination count.

Warm timings reuse a primed exporter. Cold timings include construction, export, and shutdown
of a new exporter, not Node.js startup. Span creation is outside both measurements. Separate
JSON rows report heap growth sampled at transport calls and at completion. These are not
exact allocation peaks or network measurements. Compare runs on the same Node.js version
and machine.
