# Release History

## 1.0.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.3 (2023-08-30)

### Features Added

- Removed singleton in handlers to allow sending telemetry to multiple connection strings.

### Bugs Fixed

- Avoid dependency telemetry for ingestion endpoint calls.

## 1.0.0-beta.2 (2023-08-25)

### Breaking Changes

- API update, removed AzureMonitorOpenTelemetryClient in favor of useAzureMonitor method.
- OpenTelemetry API need to be used to retrieve TracerProvider, Tracer, MetricProvider, Meter, LogProvider and Logger.
- Removed properties in AzureMonitorOpenTelemetryOptions.
- Removed OTLP Exporters.
- Removed Perf Counter Metrics.

## 1.0.0-beta.1 (2023-07-14)

### Features Added

- Add OTLP Exporters
- Use BatchLogRecordProcessor
- Set MeterProvider in Instrumentations
- Add MeterProvider and LoggerProvider as global

### Bugs Fixed

- Fix issue with connection string provided through env variable

## 1.0.0-beta.0 (2023-07-06)

### Features Added

- Added Azure Monitor OpenTelemetry package.
- Set MeterProvider in Instrumentations.
- Add Standard Metrics support.
- Add Azure Functions Correlation Hook.
- Add Performance Counter metrics.
- Use AzureMonitorLogExporter to export logs.
- Fix issues with types.
- Add support for Application Insights log events.
- API updates.
