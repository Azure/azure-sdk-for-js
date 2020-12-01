# Release History

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
