# Release History

## 1.0.0-beta.22 (2024-04-16)

### Features Added

- Add support for more Azure Monitor part A/tags.

### Other Changes

- Update README Code Snippets.

## 1.0.0-beta.21 (2024-03-08)

### Bugs Fixed

- Fix issue with duration calculation for Spans.

## 1.0.0-beta.20 (2024-02-13)

### Bugs Fixed

- Added exception handling for reading files to avoid concurrency errors.
- Fixed issues with formatting for the duration field.

### Other Changes

- Changed the environment variable used to pass the sdk prefix.
- Errors are no longer thrown upon failed statsbeat export.
- Added exception handling for file creation and lookup used for telemetry caching.
- Update OpenTelemetry depdendencies.
- Change time precision to nanoseconds.

## 1.0.0-beta.19 (2024-01-23)

### Features Added

- Capture WCF as an RPC dependency type.

### Other Changes

- Statsbeat will stop being exported when user iKey is invalid.
- Statsbeat attach type name updated to follow spec.
- Update OpenTelemetry dependencies.
- Update generated files.

## 1.0.0-beta.18 (2023-11-09)

### Bugs Fixed

- Fix Feature and Instrumentation Statsbeat type value.

### Other Changes

- Update OpenTelemetry dependencies.
- Add instructions to export Logs in readme.


## 1.0.0-beta.17 (2023-10-09)

### Features Added

- Update OpenTelemetry dependency packages.
- Add support for aadAudience configuration using connection string.

### Bugs Fixed

- Fix issue with credentialScopes setup not being passed to core-client.
- Fix Statsbeat metric names.

### Other Changes

- Add performance tests.
- Add metric and span util tests.

## 1.0.0-beta.16 (2023-08-30)

### Bugs Fixed

- Avoid dependency telemetry for ingestion endpoint calls.

## 1.0.0-beta.15 (2023-08-24)

### Breaking Changes

- `AzureMonitorExporterOptions.aadTokenCredential` is now `AzureMonitorExporterOptions.credential`.
- No longer expose the `MonitorBase`, `MonitorDomain`, or `TelemetryItem` interfaces.

### Bugs Fixed

- Fix issue with wrong name for _OTELRESOURCE_ metric.
- Fix an issue with serializing nested log messages.

## 1.0.0-beta.14 (2023-06-15)

### Features Added

- Update OpenTelemetry dependency packages.

### Bugs Fixed

- Fix issues with Breeze events format for new Resource attributes telemetry event
  and legacy Application Insights events.
- Metrics Exporter use delta aggregation temporality.

## 1.0.0-beta.13 (2023-06-06)

### Features Added

- Update opentelemetry/instrumentation packages.
- Add support for Application Insights log events.
- Add AiCloudRole and AiCloudRoleInstance to OTel Resource event.
- Add OTel resource metric envelope.
- Add OpenTelemetry Log Exporter
- Use Kubernetes resource attributes to populate cloud role and role instance.

## 1.0.0-beta.12 (2023-04-04)

### Features Added

- Use Prefix/Distro version if available.
- Remove standard metrics custom handling.
- Remove mapped Span attributes and remaining as properties.
- Updated OpenTelemetry dependencies to their latest available versions.

## 1.0.0-beta.11 (2023-02-02)

### Features Added

- Add attach and feature Statsbeat Metrics.

## 1.0.0-beta.10 (2022-11-09)

### Features Added

- Add network Statsbeat Metrics.

## 1.0.0-beta.9 (2022-10-20)

### Features Added

- Application Insights Sampler.
- Added retriable behavior for 502, 503 and 504 status codes.
- Export Metric attributes and Histogram Min/Max values.
- Added new config options disableOfflineStorage, storageDirectory and exposed ApplicationInsightsClientOptionalParams for HTTP client extra configuration.
- Added Network Statsbeat Metrics.

### Breaking Changes

- Azure Monitor OpenTelemetry Metrics Exporter Configuration updated.

### Bugs Fixed

- Suppress tracing while exporting metrics.
- Envelopes not populating sampleRate correctly.

## 1.0.0-beta.8 (2022-07-07)

### Features Added

- Added Azure Monitor OpenTelemetry Metrics Exporter.
- Export Span events as Exception and Message Telemetry.
- Updated OpenTelemetry dependencies to their latest available versions.

## 1.0.0-beta.7 (2022-04-05)

### Features Added

- Added authentication support using @azure/identity TokenCredential.
- Added file access control in Windows for retriable telemetry.

## 1.0.0-beta.6 (2022-02-08)

### Other Changes

- Updated OpenTelemtry dependencies to their latest available versions.

## 1.0.0-beta.5 (2021-10-05)

### Bugs Fixed

- Fixed issue with SDK version field not being populated correctly.

### Other Changes

- Updated mapping for Azure Monitor according to latest specs.

## 1.0.0-beta.4 (2021-07-07)

- Updating OpenTelemetry API to 1.0.0
- Adding support for temporary and permanent redirect
- Adding cleanup process for older temp files

## 1.0.0-beta.3 (2021-02-10)

- Rename package to `@azure/monitor-opentelemetry-exporter`
- Added serviceApiVersion config
- Open Telemetry dependency updates

## 1.0.0-beta.2 (2021-01-20)

- Ship the correct type declaration file

## 1.0.0-beta.1 (2021-01-13)

- OT Exporter retry when there are network issues
- OpenTelemetry Exporter using Resources API to get service properties
- Rename package to `@azure/opentelemetry-exporter-azure-monitor`
- [BREAKING] Deprecate all configuration options except for `connectionString`
- [BREAKING] Removed support for `TelemetryProcessor`
- (internal) Migrate to autorest generated HttpClient and Envelope Interfaces
- Migrate to Azure SDK for JS repository
- Adds support for Event Hubs Distributed Tracing [#10575](https://github.com/Azure/azure-sdk-for-js/pull/10575)
