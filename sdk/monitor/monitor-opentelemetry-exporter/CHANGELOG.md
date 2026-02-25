# Release History

## 1.0.0-beta.39 (2026-02-20)

### Features Added 

- Add ownership checks for storage directories.

### Bugs Fixed

- Fixed an issue where telemetry rejected by ingestion-side sampling was incorrectly persisted for retry, causing offline storage to fill up unnecessarily.

### 1.0.0-beta.38 (2026-01-16)

### Features Added

- Remove limit on custom properties field on both logs and spans.
- Updated customer SDK Stats metric names from preview format to stable format.

### 1.0.0-beta.37 (2026-01-15)

### Features Added

- Populate the `microsoft.applicationId` resource attribute from the Application Insights connection string when it is not already provided.

### Other Changes

- Detect AKS when the `KUBERNETES_SERVICE_HOST` environment variable is defined.
- Statsbeat exports now report success on failed sends to prevent PeriodicExportingMetricReader errors from surfacing to customers.

## 1.0.0-beta.36 (2025-11-10)

### Bugs Fixed

- Fixed dynamic import of the exporter package.

- Add support for multiuser permissions in unix.

- Add support for log message serialization for complex objects.

## 1.0.0-beta.35 (2025-09-16)

### Other Changes

- Update OpenTelemetry dependencies.

## 1.0.0-beta.34 (2025-09-05)

### Features Added

- Added support for configuring customer SDK Stats export interval using the `APPLICATIONINSIGHTS_SDKSTATS_EXPORT_INTERVAL` environment variable (specified in seconds).

- Added support for the `telemetry_success` field on customer SDK Stats to track if dropped request and dependency telemetry succeeded or failed.

### Other Changes

- Renamed Customer Statsbeat feature to customer SDK Stats.
- Update drop.reason values for customer SDK Stats.
- Update logic setting ai.location.ip to use the microsoft.client.ip value by default.
- Add further drop reason for disk persistence disablement.

## 1.0.0-beta.33 (2025-08-04)

### Features Added

- Track CLIENT_READONLY and CLIENT_TIMEOUT customer SDK Stats.

### Bugs Fixed

- Fix auto-detection of RP environment for azure functions.

### Other Changes

- Respect parent sampling result in ApplicationInsightsSampler.

## 1.0.0-beta.32 (2025-06-09)

### Features Added

- Added customer-facing SDK Stats preview.

### Features Added

- Add RateLimitedSampler.

### Other Changes

- Ensure that the longIntervalStatsbeat reader is properly bound to a MetricProducer.
- Removed error logging upon failure to initialize long interval statsbeat.
- No longer send statsbeat counters when values are zero.
- Fix statsbeat throttle recording logic.
- SEMATTRS_ENDUSER_ID is properly added to tags but not to properties in telemetry envelopes.
- Update network statsbeat to follow a singleton pattern.
- Stop sending client OS value.

## 1.0.0-beta.31 (2025-04-16)

### Features Added

- Support `syntheticSource` from `user_agent.synthetic.type` semantic convention.

### Bugs Fixed

- Fixed process time normalized calculation returning NaN.

## Other Changes

- Hide iKey in debug logs.
- Add to statsbeat success count when a batch of envelopes is partially accepted by breeze.

## 1.0.0-beta.30 (2025-04-09)

### Features Added

- Support setting the AiLocationIp on logs and events.
- Add support for performance counters.

### Other Changes

- Filter OpenTelemetry semantic attributes from being double recorded as custom dimensions.
- Add support for detecting the Application Insights shim on internal verison.
- Do not filter out `_MS.ProcessedByMetricExtractors` value on envelopes.

## 1.0.0-beta.29 (2025-03-04)

### Features Added

- Support the AMW de-duping flag in AKS auto-attach scenarios.
- Support sending custom events via specifying `microsoft.custom_event.name` on logs.
- Support the stable OpenTelemetry HTTP semantic conventions.

### Other Changes

- Removed faulty span exception exporting logic.
- Remove applying cloud.\* tags to statsbeat telemetry.
- Correctly capture attach type on statsbeat metrics.

## 1.0.0-beta.28 (2025-01-28)

### Features Added

- Added support for operation name on dependencies and logs.

### Bugs Fixed

- Fixed usage of environment variable to disable resource metric creation.

### Other Changes

- Fix setting statsbeat custom dimensions.
- EAI_AGAIN REST errors are considered retriable.
- Add 15 second warmup before export of long interval statsbeat.

## 1.0.0-beta.27 (2024-10-23)

### Other Changes

- Update Statsbeat shutdown logic to include more status codes for shutdown.
- Add non-essential statsbeat metrics.
- Update logic for when to emit exceptions.

## 1.0.0-beta.26 (2024-09-13)

### Other Changes

- Enforce property length limits on telemetry using truncation.
- Updated OTel dependencies.

## 1.0.0-beta.25 (2024-08-14)

### Other Changes

- Added APPLICATIONINSIGHTS_OPENTELEMETRY_RESOURCE_METRIC_DISABLED environment variable.
- Update value used to send sample rate to ingestion.
- Update to the latest OpenTelemetry dependencies.

## 1.0.0-beta.24 (2024-06-13)

### Bugs Fixed

- Fix issue with `disableOfflineStorage` being set sending error messages to customer apps.
- Fix issue with `disableOfflineStorage` not applying to Statsbeat senders.

### Other Changes

- Client generated Span event exceptions no longer generate trace telemetry.
- Sever spans with http status codes within 4xx range should count as request failures.
- Update to the latest OpenTelemetry dependencies.

## 1.0.0-beta.23 (2024-05-10)

### Features Added

- Capture and export measurements when creating log records from the Application Insights 3.X SDK.

### Other Changes

- Add live metrics activation tracking to statsbeat.
- Update OpenTelemetry dependencies.
- Convert OTel-valid performance counter names to appropriate breeze names.

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
