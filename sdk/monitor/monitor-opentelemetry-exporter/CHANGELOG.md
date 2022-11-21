# Release History

## 1.0.0-beta.11 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

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
