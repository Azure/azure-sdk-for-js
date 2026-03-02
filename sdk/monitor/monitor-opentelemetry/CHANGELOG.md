# Release History

## 1.16.0 (2026-02-20)

### Breaking Changes

- Default Sampler Changed: The default sampling behavior has been changed from `ApplicationInsightsSampler` with 100% sampling (all traces sampled) to `RateLimitedSampler` with 5.0 traces per second. This change significantly reduces telemetry volume for high-traffic applications and provides better cost optimization out of the box.
  - **Impact**: Applications with more than 5 requests per second will see fewer traces exported by default.
  - **Migration**: To maintain the previous behavior (100% sampling), explicitly configure the sampler by setting `tracesPerSecond: 0` which will fall back to using `samplingRatio: 1.0`.

### Other Changes

- Changed `CUSTOMER_SDKSTATS` SDK Stats feature to track when customers explicitly disable SDK stats by setting `APPLICATIONINSIGHTS_SDKSTATS_DISABLED=true`.
- In double-instrumentation scenarios, surface a warning in the log stream in addition to diagnostic logs to help customers identify when they have both autoinstrumentation and manual instrumentation enabled.

### Bugs Fixed

- Fixed OpenTelemetry API version mismatch causing Noop providers in VS Code extensions. When a different version of `@opentelemetry/api` was already loaded (e.g. by the VS Code extension host), `useAzureMonitor` would silently fall back to Noop providers, discarding all telemetry. The fix clears the stale global API state before initializing the SDK.

### 1.15.1 (2026-01-16)

### Other Changes

- Updated to using exporter version 1.0.0-beta.38.

### 1.15.0 (2026-01-15)

### Features Added

- Allow configuring additional metric views through `AzureMonitorOpenTelemetryOptions` and pass them to the NodeSDK.
- Honor `OTEL_EXPORTER_OTLP_METRICS_DEFAULT_HISTOGRAM_AGGREGATION` for selecting default histogram aggregation (explicit or exponential).
- Support `OTEL_TRACES_SAMPLER`/`OTEL_TRACES_SAMPLER_ARG` environment variables for sampler selection.

- Add support for automatic instrumentation in ESM environments.

### 1.14.2 (2025-11-13)

### Bugs Fixed

- Fix azure SDK dependency version imports.

### 1.14.1 (2025-11-10)

### Bugs Fixed

- Fix dynamically importing the monitor-opentelemetry packages in Next.js.

### 1.14.0 (2025-09-16)

### Other Changes

- Update exporter version.

### 1.13.1 (2025-09-10)

### Bugs Fixed

- Fix support for multiple metric exporters and OTLP metric exporter creation.

### Other Changes

- Update OpenTelemetry dependencies.

### 1.13.0 (2025-09-05)

### Features Added

- All instrumentations apart from bunyan and winston are now enabled by default.

### Bugs Fixed

- Fix declaration of the preview customer statsbeat enablement environment variable.
- Change customer statsbeat feature name to customer SDK Stats.

## 1.12.0 (2025-08-04)

### Features Added

- Add RateLimitedSampler.

### Other Changes

- Add customer statsbeat feature to feature statsbeat.
- Add multi-ikey feature to feature statsbeat.
- Silence noisy warnings about expected async attributes and the @azure/core-tracing load order not being populated.

## 1.11.1 (2025-06-09)

### Other Changes

- Update to using monitor-opentelemetry-exporter beta 32.

## 1.11.0 (2025-04-16)

### Features Added

- Added support for Process Time Normalized and Exception Rate performance counters.

### Bugs Fixed

- Fixed process time normalized calculation returning NaN.
- Fixed import issue with @azure/functions-core that was causing bundling errors in applications that don't use Azure Functions. [#34045](https://github.com/Azure/azure-sdk-for-js/issues/34045)

### Other Changes

- Hide iKey in debug logs.

## 1.10.0 (2025-04-09)

### Features Added

- Add support for performance counters.

## Other Changes

- Add support for detecting the Application Insights shim on internal verison.
- Native ESM support has been added, and this package will now emit both CommonJS and ESM. [#32819](https://github.com/Azure/azure-sdk-for-js/pull/32819)
- Add undefined checks for document filtering functions.

## 1.9.0 (2025-03-04)

### Features Added

- Add support for stable OpenTelemetry semantic conventions.

### Other Changes

- Added support for detecting AKS when `KUBERNETES_SERVICE_HOST` is set.

## 1.8.1 (2025-01-28)

### Bugs Fixed

- Should not use reserved 7th bit for statsbeat instrumentations.
- Fix incorrectly setting the cloud role name and role instance to undefined on standard metrics in AKS environments.
- Handle exceptions thrown when no http url is present on request telemetry quickpulse documents.

## 1.8.0 (2024-10-23)

### Features Added
- Changed live metrics CPU/Memory perf counter metrics to emit normalized process CPU and process physical memory bytes.
- Support for Live Metrics Filtering.
- Support parsing AAD Audience from the connection string for live metrics.

### Other Changes

- Update to using the logRecordProcessors property.

## 1.7.1 (2024-09-13)

### Bugs Fixed
- Live Metrics: Do not send documents from past time intervals.

### Other Changes

- Update the relative path used in the OTel instrumentation patcher to work with webpack.
- Update OTel dependencies.
- Update enableTraceBasedSamplingForLogs config default value to false.

## 1.7.0 (2024-08-14)

### Features Added

- Add support for Azure Functions v4 types.

### Bugs Fixed

- Live Metrics instrumentation key should be set when env var is used to set the connection string.
- Fix high cardinality issue with dependency stanadard metrics.
- Fix credential issue with Quickpulse sender.
- Fix default for Azure log level.

### Other Changes

- Update applicationinsights-web-snippet version to 1.2.1.
- Add statsbeat tracking for all OpenTelemetry instrumentations.
- Update value used to send sample rate to ingestion.
- Update to the latest OpenTelemetry dependencies.

## 1.6.0 (2024-06-13)

### Bugs Fixed

- Setting the sampling ratio to 0 now correctly applies the value instead of defaulting to 1.
- Fixed standard metrics reported success/failure status for dependencies/requests.
- 3xx level response codes on request telemetry is no longer counted as a request failure in standard metrics.

### Other Changes

- Add support for tracking Application Insights shim usage to statsbeat.
- Live Metrics is enabled by default.
- Update to the latest OpenTelemetry dependencies.

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
