# Release History

## 1.0.0-beta.1 (Unreleased)

- Rename package to `@microsoft/opentelemetry-exporter-azure-monitor`
- [BREAKING] Deprecate all configuration options except for `connectionString`
- [BREAKING] Removed support for `TelemetryProcessor`

## 1.0.0-preview.6 (2020-10-09)

- (internal) Migrate to autorest generated HttpClient and Envelope Interfaces

## 1.0.0-preview.5 (2020-09-01)

- Migrate to Azure SDK for JS repository
- Adds support for Event Hubs Distributed Tracing [#10575](https://github.com/Azure/azure-sdk-for-js/pull/10575)
