# Release History

## 1.0.0-beta.13 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.12 (2023-01-10)

### Features Added

- Added `workspaceResourceId` to AzureSynapseArtifactsLinkedServiceTypeProperties.
- Added `pythonCodeReference`, `filesV2`, `scanFolder`, `configurationType`, `targetSparkConfiguration` and `sparkConfig` properties to SparkJobActivity.
- Added `authHeaders` proprety to RestServiceLinkedService.
- Added new apis of Pause/Resume for Synapse Link.
- Added PowerBIWorkspaceLinkedService.

### Breaking Changes

- Renamed API `createOrUpdateLinkConnection` to `createOrUpdate` in `LinkConnectionOperations`.
- Renamed API `deleteLinkConnection` to `delete` in `LinkConnectionOperations`.
- Renamed API `getLinkConnection` to `get` in `LinkConnectionOperations`.
- Renamed API `listLinkConnectionsByWorkspace` to `listByWorkspace` in `LinkConnectionOperations`.

## 1.0.0-beta.11 (2022-09-21)

### Features Added

- Updated to `@azure/core-tracing` 1.0.
- Added a set of new LinkedService types.

## 1.0.0-beta.10 (2022-04-18)

### Features Added

Added `LinkConnectionOperations`

## 1.0.0-beta.9 (2022-03-14)

### Features Added

Added more supported types in `LinkedServiceOperations`

### Other Changes

Taking latest codegen changes which include merging Client and ClientContext classes

## 1.0.0-beta.8 (2022-01-12)

### Features Added

Added `MetastoreOperations`

## 1.0.0-beta.7 (2021-11-09)

### Other Changes

- Added data flow flowlet
- `KqlScriptContentCurrentConnection` now has poolName and databaseName properties

## 1.0.0-beta.6 (2021-10-05)

### Other Changes

- Upgrade to [package-artifacts-composite-v1](https://github.com/Azure/azure-rest-api-specs/blob/bee724836ffdeb5458274037dc75f4d43576b5e3/specification/synapse/data-plane/readme.md#tag-package-artifacts-composite-v1)

- Added `SparkConfiguration`, `KqlScripts` and associated support types.
- Update type of many modles from string to object
- `SparkJobDefinition`, `Notebook` and `SqlScript` now has a folder property
- `SqlConnection` now has poolName and databaseName properties

## 1.0.0-beta.5 (2021-08-10)

### Other Changes

- Migrate to CoreV2
- Re-generate with swagger `2021-06-01-preview`

## 1.0.0-beta.4 (2021-04-06)

- Adds ADF support
- Consume latest Code Generator changes

## 1.0.0-beta.3 (2021-03-09)

- Regenerated from the latest versions of REST API and Code Generator

## 1.0.0-beta.2 (2021-02-09)

- Regenerated from the latest REST API

## 1.0.0-beta.1 (2020-12-09)

- Initial release
