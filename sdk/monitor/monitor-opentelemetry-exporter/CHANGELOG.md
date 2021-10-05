# Release History

## 1.0.0-beta.5 (2021-10-05)

- Updated mapping for Azure Monitor according to latest specs.
- Fixed issue with SDK version field not being populated correctly.

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
