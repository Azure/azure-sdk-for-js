# 1.0.0-preview.7 2nd December 2019

- Updated the behavior of how incompatible versions of OpenTelemetry Tracer are handled. Now, errors will be thrown only if the user has manually set a Tracer. This means that incompatible versions will be silently ignored when tracing is not enabled.
- Updated to use OpenTelemetry 0.2 via the `@opentelemetry/types` package. There were two breaking changes in this update:
  - `isRecordingEvents` on `Span` was renamed to `isRecording`. [PR link](https://github.com/open-telemetry/opentelemetry-js/pull/454)
  - `addLink` was removed from `Span` as links are now only allowed to be added during span creation. This is possible by specifying any necessary links inside `SpanOptions`. [PR link](https://github.com/open-telemetry/opentelemetry-js/pull/449)

# 1.0.0-preview.5 22nd October 2019

- Fixes issue where loading multiple copies of this module could result in the tracer set by `setTracer()` being reset.

# 1.0.0-preview.4 8th October 2019

- Remove dependency on the `debug` module to ensure compatibility with IE11

# 1.0.0-preview.3 7th October 2019

- Updated to use the latest types from OpenTelemetry (PR [#5182](https://github.com/Azure/azure-sdk-for-js/pull/5182))
- Clean up and refactored code for easier usage and testability. (PR [#5233](https://github.com/Azure/azure-sdk-for-js/pull/5233) and PR [#5283](https://github.com/Azure/azure-sdk-for-js/pull/5283))

# 1.0.0-preview.2 9th September 2019

Updated the `OpenCensusSpanPlugin` & the `NoOpSpanPlugin` to support for retrieving span context. This allows updating of request headers with the right [span context](https://www.w3.org/TR/trace-context/#trace-context-http-headers-format). (PR [#4712](https://github.com/Azure/azure-sdk-for-js/pull/4712))

# 1.0.0-preview.1 5th August 2019

Provides low-level interfaces and helper methods for tracing in Azure SDK
