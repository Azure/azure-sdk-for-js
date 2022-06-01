# Release History

## 1.0.0-beta.2 (Unreleased)

### Features Added

- Added the ability to disable Azure SDK Spans from being recorded by setting the `AZURE_TRACING_DISABLED` environment variable to true.
- Added support for `AZURE_HTTP_TRACING_DISABLED` environment variable which allows disabling all children of our core HTTP spans from being recorded.

### Breaking Changes

### Bugs Fixed

### Other Changes

- Updated our `@azure/core-tracing` dependency to the latest version (1.0.0).

## 1.0.0-beta.1 (2022-02-08)

This marks the first beta release of the OpenTelemetry Instrumentation library for the Azure SDK which will enable OpenTelemetry instrumentation for Azure SDK client libraries.
