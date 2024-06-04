# Release History

## 1.6.0 (Unreleased)

### Bugs Fixed

- Setting the sampling ratio to 0 now correctly applies the value instead of defaulting to 1.

### Other Changes

- Add support for tracking Application Insights shim usage to statsbeat.

## 1.5.0 (2024-05-10)

### Features Added

- Allow setting log level for winston and bunyan via environment variable.
- Add Winston Log instrumentation.
- Add log level configuration for Bunyan and Winston loggers.

### Other Changes

- Updated OpenTelemetry dependencies.

## 1.4.0 (2024-04-16)

### Features Added

- Capture live metrics and live metrics activation in statsbeat.
- Add support for Trace based sampling for logs.
- Add support for Winston log instrumentation.

### Bugs Fixed

- Handle Parsing Nested Objects in Integration Tests.

### Other Changes

- When log sampling, check for spanId instead of traceId.
- Update OpenTelemetry depdendencies.

## 1.3.0 (2024-02-13)

### Features Added

- Allow spanProcessors and logRecordProcessors to be passed as options to useAzureMonitor.

### Bugs Fixed

- Fix detecting Azure Functions and Azure App Service RPs incorrectly in the browser SDK loader.
- Fix OpenTelemetry Resource type being used when resource is set on the AzureMonitorOpenTelemetryOptions by resource detector.
- Fix Resource typing on the Azure Monitor config.
- Fix document duration, dependency duration metric, and default quickpulse endpoint.
- Fix issue with miscalculation of Live Metrics request/depdendency duration.

### Other Changes

- Updated Quickpulse transmission time.
- Update OpenTelemetry depdendencies.
- Add SDK prefix including attach type in both manual and auto-attach scenarios.
- Updated the @microsoft/applicationinsights-web-snippet to version 1.1.2.
- Update swagger definition file for Quickpulse.
- Updated to use exporter version 1.0.0-beta.21.
- Update standard metric names.
- Update to use dev-tool to run tests.
- Add properties in Live Metrics Documents.

## 1.2.0 (2024-01-23)

### Features Added

- Implement browser SDK loader.
- Use OpenTelemetry resource detectors for App Service, Functions, and VM.
- Add Bunyan Log Instrumentation.
- Implement Live Metrics.

### Other Changes

- Add performance tests to pipeline.
- Update OpenTelemetry dependencies.
- Integrate with the Azure SDK internal logger.
- Set synthetic flags on Standard Metrics.

## 1.1.1 (2023-11-09)

### Bugs Fixed

- Add AKS resource provider in Statsbeat, add missing resource identifiers.
- Handle issue of custom MeterReaders not being able to collect metrics for instrumentations.

### Other Changes

- Update OpenTelemetry dependencies.
- Change JSON config values precedence.
- Fix broken link in README.

## 1.1.0 (2023-10-09)

### Bugs Fixed

- Fix precedence of JSON config value changes over defaults.
- Fix custom MeterReaders not being able to collect metrics for instrumentations.
- Fix values for Statsbeat Features and Instrumentations.

### Other Changes

- Fix lint issues.

## 1.0.0 (2023-09-20)

### Features Added

- Add support for Azure Functions programming model v4.

### Bugs Fixed

- Avoid dependency telemetry for ingestion endpoint calls.
- Add custom AI Sampler to maintain data reliability in Standard Metrics.
- Fix issues with SDK version not propagating correctly.

### Other Changes

- Update to latest OpenTelemetry dependencies.
- Rename azureMonitorExporterConfig.
- Remove singleton in handlers.
- Adding Functional Tests.

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
