# Release History

## 2.0.0 (Unreleased)

### Features Added

### Breaking Changes

- Migrated to use `@azure/core-rest-pipeline`. For more information, please refer to [the documentation](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core#core-v1-and-core-v2). As a result of this migration:
  - The response types no longer contain the raw response `_response`. To access the raw response, an `onResponse` callback has to be passed in the request options bag, for example:
    ```ts
    let rawResponse: FullOperationResponse | undefined;
    await client.operationName(/* ...parameters... */, {
      onResponse: (response) => (rawResponse = response),
    });
    ```
  - Client methods that previously returned `RestResponse` now return `void`. In the event the operation fails, a `RestError` will still be thrown. To access the raw HTTP response, use the `onResponse` callback described above.
- Digital Twin objects returned from operations no longer have their properties wrapped in a `body` property.

### Bugs Fixed

### Other Changes

## 1.1.0 (2022-07-19)

### Features Added

- Added support for twin and component metadata property `$lastUpdateTime`, signifying the date and time a twin or component was last updated.

## 1.1.0-beta.1 (2022-04-04)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features
- Added support for [property sourceTime](https://docs.microsoft.com/azure/digital-twins/how-to-manage-twin#update-a-propertys-sourcetime).

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
