# Release History

## 1.0.0-beta.2 (2026-08-27)
Compared with version 1.0.0-beta.1

### Features Added
  - Added Interface ErrorResponse
  - Interface AzureTerraformClientOptionalParams has a new optional parameter cloudSetting
  - Interface BaseExportModel has a new optional parameter excludeAzureResource
  - Interface BaseExportModel has a new optional parameter excludeTerraformResource
  - Interface BaseExportModel has a new optional parameter includeExtensions
  - Interface BaseExportModel has a new optional parameter includeManagedResource
  - Interface BaseExportModel has a new optional parameter includeRoleAssignment
  - Interface ExportQuery has a new optional parameter authorizationScopeFilter
  - Interface ExportQuery has a new optional parameter includeResourceGroup
  - Interface ExportQuery has a new optional parameter table
  - Interface ExportQuery has a new optional parameter excludeAzureResource
  - Interface ExportQuery has a new optional parameter excludeTerraformResource
  - Interface ExportQuery has a new optional parameter includeExtensions
  - Interface ExportQuery has a new optional parameter includeManagedResource
  - Interface ExportQuery has a new optional parameter includeRoleAssignment
  - Interface ExportResource has a new optional parameter includeResourceGroup
  - Interface ExportResource has a new optional parameter recursive
  - Interface ExportResource has a new optional parameter excludeAzureResource
  - Interface ExportResource has a new optional parameter excludeTerraformResource
  - Interface ExportResource has a new optional parameter includeExtensions
  - Interface ExportResource has a new optional parameter includeManagedResource
  - Interface ExportResource has a new optional parameter includeRoleAssignment
  - Interface ExportResourceGroup has a new optional parameter excludeAzureResource
  - Interface ExportResourceGroup has a new optional parameter excludeTerraformResource
  - Interface ExportResourceGroup has a new optional parameter includeExtensions
  - Interface ExportResourceGroup has a new optional parameter includeManagedResource
  - Interface ExportResourceGroup has a new optional parameter includeRoleAssignment
  - Interface ExportResult has a new optional parameter import
  - Added Type Alias AuthorizationScopeFilter
  - Added Type Alias AzureExtensionResourceType
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownAuthorizationScopeFilter
  - Added Enum KnownAzureExtensionResourceType
  - Enum KnownTargetProvider has a new value Azapi
  - Enum KnownTargetProvider has a new value Azurerm
  - Enum KnownVersions has a new value V20230701Preview
  - Enum KnownVersions has a new value V20250601Preview
  - Enum KnownVersions has a new value V20250901Preview
  - Enum KnownVersions has a new value V20260901Preview

### Breaking Changes
  - Interface TerraformOperationStatus has a new required parameter id
  - Enum KnownTargetProvider no longer has value azapi
  - Enum KnownTargetProvider no longer has value azurerm
  - Enum KnownVersions no longer has value v2023_07_01_preview

### Bugs Fixed
  - Fixed default credential scopes for sovereign cloud settings. [#39751](https://github.com/Azure/azure-sdk-for-js/pull/39751)

    
## 1.0.0-beta.1 (2024-11-18)

### Features Added

Initial release of the Azure AzureTerraform Package.
