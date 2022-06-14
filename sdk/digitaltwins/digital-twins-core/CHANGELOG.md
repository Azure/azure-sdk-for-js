# Release History

## 1.1.0 (unreleased)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features

### Breaking Changes

### Key Bugs Fixed

### Other Changes

- Updated our `@azure/core-tracing` dependency to the latest version (1.0.0).
  - Notable changes include Removal of `@opentelemetry/api` as a transitive dependency and ensuring that the active context is properly propagated.
  - Customers who would like to continue using OpenTelemetry driven tracing should visit our [OpenTelemetry Instrumentation](https://www.npmjs.com/package/@azure/opentelemetry-instrumentation-azure-sdk) package for instructions.

## 1.0.3 (2021-01-15)

- Bug Fix: include the types definition file in the shipped package

## 1.0.2 (2021-01-14)

- Bug Fix: include the types definition file in the shipped package

## 1.0.1 (2021-01-12)

- This release is an update the GA release containing the following changes:
  - Fix publishComponentTelemetry API to follow the convention, now messageId is a mandatory argument
  - Add E2E live and record/playback tests
  - Add samples of delete digitaltwins and models for convenience

## 1.0.0 (2020-10-30)

- The is the GA release containing the following changes:
  - Expose ifMatch, ifNoneMatch optional parameters for upsertDigitalTwin and upsert Relationship APIs
  - Rename etag parameter to ifMatch
  - Fix some documentation

## 1.0.0-preview.2 (2020-10-23)

- This release is an update of the preview with the following changes
  - Package name changed to: `@azure/digital-twins-core`.
  - Add span to all APIs
- Pull request containing the changes: https://github.com/Azure/azure-sdk-for-js/pull/11872

## 1.0.0-preview.1 (2020-09-03)

- This release is a preview of our efforts to create a client library that is user friendly and
  idiomatic to the JavaScript ecosystem. The reasons for most of the changes in this update can be found in the
  [Azure SDK Design Guidelines for TypeScript](https://azure.github.io/azure-sdk/typescript_introduction.html).
- Initial release:
  - Package name `@azure/digital-twins`.
