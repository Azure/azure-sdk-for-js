# Release History

## 1.0.0-beta.16 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.15 (2024-06-07)

### Features Added
- Model Dataset has a new parameter LakeHouseLocation
- Model Dataset has a new parameter GoogleBigQueryV2ObjectDataset
- Model Dataset has a new parameter PostgreSqlV2TableDataset
- Model Dataset has a new parameter SalesforceServiceCloudV2ObjectDataset
- Model Dataset has a new parameter SalesforceV2ObjectDataset
- Model Dataset has a new parameter ServiceNowV2ObjectDataset
- Model Dataset has a new parameter SnowflakeV2Dataset
- Model Dataset has a new parameter WarehouseTableDataset
- Model Pipeline has a new parameter ExpressionV2
- Model Pipeline has a new parameter GoogleBigQueryV2Source
- Model Pipeline has a new parameter LakeHouseTableSink
- Model Pipeline has a new parameter LakeHouseTableSource
- Model Pipeline has a new parameter LakeHouseWriteSettings
- Model Pipeline has a new parameter LakeHouseReadSettings
- Model Pipeline has a new parameter Metadata
- Model Pipeline has a new parameter MetadataItem
- Model Pipeline has a new parameter ParquetReadSettingsstate
- Model Pipeline has a new parameter PostgreSqlV2Source
- Model Pipeline has a new parameter SalesforceServiceCloudV2Sink
- Model Pipeline has a new parameter SalesforceServiceCloudV2Source
- Model Pipeline has a new parameter SalesforceV2Sink
- Model Pipeline has a new parameter SalesforceV2SourceReadBehavior
- Model Pipeline has a new parameter SalesforceV2Source
- Model Pipeline has a new parameter ServiceNowV2Source
- Model Pipeline has a new parameter SnowflakeV2Sink
- Model Pipeline has a new parameter SnowflakeV2Source
- Model Pipeline has a new parameter WarehouseSink
- Model Pipeline has a new parameter WarehouseSource
- Model LinkedService add supports GoogleAds
- Model LinkedService has a new parameter GoogleBigQueryV2LinkedService
- Model LinkedService has a new parameter LakeHouseLinkedService
- Model LinkedService has a new parameter PostgreSqlV2LinkedService
- Model LinkedService has a new parameter SalesforceServiceCloudV2LinkedService
- Model LinkedService has a new parameter SalesforceV2LinkedService
- Model LinkedService has a new parameter SalesforceV2LinkedService
- Model LinkedService has a new parameter SnowflakeV2LinkedService
- Model LinkedService has a new parameter WarehouseLinkedService
- Model LinkedService has a new parameter WarehouseLinkedService

### Breaking Changes
- Model LinkedService parameter MariaDBLinkedService update new properties
- Model LinkedService parameter MySqlLinkedService update new properties
- Model LinkedService parameter ServiceNowV2LinkedService update properties
- Model Pipeline parameter ExecuteDataFlowActivity update new properties computeType
- Model Pipeline parameter ScriptActivityScriptBlock update properties type

## 1.0.0-beta.14 (2023-12-15)

### Other Changes
- Fix runNotebook sessionId from number to string
- Fix placeholder links causing 404s
- Sync expression Support From DataFactory To Synapse


## 1.0.0-beta.13 (2023-07-26)

### Features Added
- Added `authenticationType` , `containerUri`, `sasUri` and `sasToken` properties to BlobService
- Added `setSystemVariable` proprety to SetVariableActivityTypeProperties
- Added `mongoDbAtlasDriverVersion` property to MongoDbAtlasLinkedServiceTypeProperties
- Added `ActionOnExistingTargetTable` property for Synapse Link
- Added `OutputColumn` Object For Office365Source outputColumns
- Added `configurationType` , `targetSparkConfiguration` and `sparkConfig` properties for SynapseNotebookActivityTypeProperties
- Added `credential` property for LinkedService
- Added `isolationLevel` property for SQLServerSource
- Added new apis of Create/Cancel/GetStatus/GetSnapshot for RunNotebook

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
