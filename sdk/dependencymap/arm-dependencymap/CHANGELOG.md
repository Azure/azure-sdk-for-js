# Release History

## 1.0.0-beta.2 (2025-09-23)
Compared with version 1.0.0-beta.1

### Features Added
  - Added operation MapsOperations.getDependencyViewForAllMachines
  - Added Interface DependencyProcessFilter
  - Added Interface ExportDependenciesAdditionalInfo
  - Added Interface ExportDependenciesOperationResult
  - Added Interface ExportDependenciesResultProperties
  - Added Interface GetDependencyViewForAllMachinesOperationResult
  - Added Interface GetDependencyViewForAllMachinesRequest
  - Added Interface GetDependencyViewForAllMachinesResultProperties
  - Added Interface MapsGetDependencyViewForAllMachinesOptionalParams
  - Interface DependencyMapClientOptionalParams has a new optional parameter cloudSetting
  - Interface ExportDependenciesRequest has a new optional parameter applianceNameList
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ExportDependenciesStatusCode
  - Added Enum AzureClouds
  - Added Enum KnownExportDependenciesStatusCode
  - Enum KnownVersions has a new value V20250501Preview
  - Enum KnownVersions has a new value V20250701Preview

### Breaking Changes
  - Operation MapsOperations.exportDependencies has a new signature
  - Parameter focusedMachineId of interface ExportDependenciesRequest is now optional

    
## 1.0.0-beta.1 (2025-04-14)

### Features Added

Initial release of the Azure DependencyMap package
