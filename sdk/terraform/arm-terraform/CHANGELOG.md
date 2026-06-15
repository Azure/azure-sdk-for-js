# Release History

## 1.0.0-beta.2 (2026-06-15)
Compared with version 1.0.0-beta.1

### Features Added
  - Added Interface ErrorResponse
  - Interface AzureTerraformClientOptionalParams has a new optional parameter cloudSetting
  - Interface BaseExportModel has a new optional parameter excludeAzureResource
  - Interface BaseExportModel has a new optional parameter excludeTerraformResource
  - Interface BaseExportModel has a new optional parameter includeManagedResource
  - Interface BaseExportModel has a new optional parameter includeRoleAssignment
  - Interface ExportQuery has a new optional parameter authorizationScopeFilter
  - Interface ExportQuery has a new optional parameter includeResourceGroup
  - Interface ExportQuery has a new optional parameter table
  - Interface ExportQuery has a new optional parameter excludeAzureResource
  - Interface ExportQuery has a new optional parameter excludeTerraformResource
  - Interface ExportQuery has a new optional parameter includeManagedResource
  - Interface ExportQuery has a new optional parameter includeRoleAssignment
  - Interface ExportResource has a new optional parameter includeResourceGroup
  - Interface ExportResource has a new optional parameter recursive
  - Interface ExportResource has a new optional parameter excludeAzureResource
  - Interface ExportResource has a new optional parameter excludeTerraformResource
  - Interface ExportResource has a new optional parameter includeManagedResource
  - Interface ExportResource has a new optional parameter includeRoleAssignment
  - Interface ExportResourceGroup has a new optional parameter excludeAzureResource
  - Interface ExportResourceGroup has a new optional parameter excludeTerraformResource
  - Interface ExportResourceGroup has a new optional parameter includeManagedResource
  - Interface ExportResourceGroup has a new optional parameter includeRoleAssignment
  - Interface ExportResult has a new optional parameter import
  - Added Type Alias AuthorizationScopeFilter
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownAuthorizationScopeFilter
  - Enum KnownTargetProvider has a new value Azapi
  - Enum KnownTargetProvider has a new value Azurerm
  - Enum KnownVersions has a new value V20230701Preview
  - Enum KnownVersions has a new value V20250601Preview
  - Enum KnownVersions has a new value V20250901Preview

### Breaking Changes
  - Interface TerraformOperationStatus has a new required parameter id
  - Enum KnownTargetProvider no longer has value azapi
  - Enum KnownTargetProvider no longer has value azurerm
  - Enum KnownVersions no longer has value v2023_07_01_preview

    
## 1.0.0-beta.1 (2024-11-18)

### Features Added

Initial release of the Azure AzureTerraform Package.
