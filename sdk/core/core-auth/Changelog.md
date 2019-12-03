# Changelog

# 1.0.2 - 2019-12-02

- Updated to use OpenTelemetry 0.2 via `@azure/core-tracing`

# 1.0.0 - 2019-10-29

This release marks the general availability of the `@azure/core-auth` package.

- Standardizes API to be more consistent with other SDK packages.
  ([PR #5899](https://github.com/Azure/azure-sdk-for-js/pull/5899))
- Removed the browser bundle. A browser-compatible library can still be created through the use of a bundler such as Rollup, Webpack, or Parcel.
  ([#5860](https://github.com/Azure/azure-sdk-for-js/pull/5860))

# 1.0.0-preview.4 - 2019-10-22

- Removed the `SimpleTokenCredential` implementation since it is not useful outside of test scenarios
- Updated to use the latest version of `@azure/core-tracing` package

## 1.0.0-preview.3 - 2019-09-09

- Fixed a ping timeout issue. The timeout is now configurable. ([PR #4941](https://github.com/Azure/azure-sdk-for-js/pull/4941))
