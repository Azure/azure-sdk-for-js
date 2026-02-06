# Release History

## 1.0.0-beta.10 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

- Updated `@opentelemetry/instrumentation` dependency to ^0.211.0.

## 1.0.0-beta.9 (2025-06-10)

### Other Changes

- Updates OpenTelemetry packages to v2.

## 1.0.0-beta.8 (2025-02-11)

### Bugs Fixed

- Fixes an issue where tracing spans were marked as failed when a conditional request failed with a 304 status code. [#32666](https://github.com/Azure/azure-sdk-for-js/pull/32666)

### Other Changes

- In order to better align with the OpenTelemetry specification, tracing spans will no longer be marked successful, leaving them UNSET by default. [#32666](https://github.com/Azure/azure-sdk-for-js/pull/32666)

## 1.0.0-beta.7 (2024-10-08)

### Features Added

- Added support for attaching events to a span. [#31162](https://github.com/Azure/azure-sdk-for-js/pull/31162)

### Other Changes

- Updated to latest OTEL libraries

## 1.0.0-beta.6 (2024-08-15)

### Other Changes

- Export the AzureSdkInstrumentation class directly for compatibility with [@opentelemetry/auto-instrumentations-node](https://www.npmjs.com/package/@opentelemetry/auto-instrumentations-node)
- Updated to latest OTEL libraries

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
