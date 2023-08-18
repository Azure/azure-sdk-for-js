# Release History

## 1.0.0-beta.15

### Bugs Fixed

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
