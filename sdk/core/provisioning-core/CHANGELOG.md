# Release History

## 1.0.0-beta.1 (Unreleased)

### Features Added

- Initial preview of the Azure Provisioning core authoring primitives. [#39825](https://github.com/Azure/azure-sdk-for-js/pull/39825)

### Bugs Fixed

- Reject RFC3339 values whose conversion to RFC7231 would lose fractional-second precision. [#39825](https://github.com/Azure/azure-sdk-for-js/pull/39825)
- Keep inherited resource-group tags synchronized after tag reassignment. [#39825](https://github.com/Azure/azure-sdk-for-js/pull/39825)
- Require mandatory resource-name arguments for Bicep ID helper functions. [#39825](https://github.com/Azure/azure-sdk-for-js/pull/39825)
- Reject ISO 8601 durations with fractional values on non-rightmost components. [#39825](https://github.com/Azure/azure-sdk-for-js/pull/39825)
