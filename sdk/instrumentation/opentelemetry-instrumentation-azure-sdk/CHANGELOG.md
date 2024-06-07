# Release History

## 1.0.0-beta.6 (Unreleased)

- Export the AzureSdkInstrumentation class directly for compatibility with [@opentelemetry/auto-instrumentations-node](https://www.npmjs.com/package/@opentelemetry/auto-instrumentations-node)

## 1.0.0-beta.5 (2023-08-09)

### Other Changes

- Updated to latest OTEL libraries

## 1.0.0-beta.4 (2023-06-14)

### Other Changes

- Updated to latest OTEL libraries

## 1.0.0-beta.3 (2023-04-25)

### Other Changes

- Updated to latest OTEL libraries

## 1.0.0-beta.2 (2022-10-22)

### Features Added

- Added the ability to disable Azure SDK Spans from being recorded by setting the `AZURE_TRACING_DISABLED` environment variable to true.
- Added support for `AZURE_HTTP_TRACING_CHILDREN_DISABLED` environment variable which allows disabling all children of our core HTTP spans from being recorded.

### Other Changes

- Updated our `@azure/core-tracing` dependency to the latest version (1.0.0).

## 1.0.0-beta.1 (2022-02-08)

This marks the first beta release of the OpenTelemetry Instrumentation library for the Azure SDK which will enable OpenTelemetry instrumentation for Azure SDK client libraries.
