# Release History

## 2.0.0-beta.1 (2025-09-10)
Compared with version 1.0.0

### Features Added
  - Added operation BranchesOperations.preflight
  - Added Interface AutoscalingSize
  - Added Interface BranchesPreflightOptionalParams
  - Added Interface OrganizationResourceUpdate
  - Added Interface OrganizationResourceUpdateProperties
  - Added Interface PreflightCheckParameters
  - Added Interface PreflightCheckResult
  - Interface BranchProperties has a new optional parameter branch
  - Interface BranchProperties has a new optional parameter branchId
  - Interface BranchProperties has a new optional parameter computeHours
  - Interface BranchProperties has a new optional parameter dataSize
  - Interface BranchProperties has a new optional parameter isDefault
  - Interface BranchProperties has a new optional parameter lastActive
  - Interface BranchProperties has a new optional parameter protected
  - Interface EndpointProperties has a new optional parameter computeName
  - Interface EndpointProperties has a new optional parameter endpointId
  - Interface EndpointProperties has a new optional parameter lastActive
  - Interface EndpointProperties has a new optional parameter size
  - Interface EndpointProperties has a new optional parameter status
  - Interface NeonDatabaseProperties has a new optional parameter databaseName
  - Interface NeonDatabaseProperties has a new optional parameter lastUpdated
  - Interface NeonRoleProperties has a new optional parameter lastUpdated
  - Interface NeonRoleProperties has a new optional parameter owns
  - Interface NeonRoleProperties has a new optional parameter roleName
  - Interface PostgresClientOptionalParams has a new optional parameter cloudSetting
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias EndpointStatus
  - Added Type Alias EntityType
  - Added Enum AzureClouds
  - Added Enum KnownEndpointStatus
  - Added Enum KnownEntityType
  - Enum KnownVersions has a new value V20241222Preview
  - Enum KnownVersions has a new value V20250301Preview
  - Enum KnownVersions has a new value V20250623Preview

### Breaking Changes
  - Removed operation BranchesOperations.update
  - Removed operation ComputesOperations.createOrUpdate
  - Removed operation ComputesOperations.delete
  - Removed operation ComputesOperations.get
  - Removed operation ComputesOperations.update
  - Removed operation EndpointsOperations.get
  - Removed operation EndpointsOperations.update
  - Removed operation NeonDatabasesOperations.get
  - Removed operation NeonDatabasesOperations.update
  - Removed operation NeonRolesOperations.get
  - Removed operation NeonRolesOperations.update
  - Removed operation ProjectsOperations.update
  - Operation OrganizationsOperations.update has a new signature
  - Removed Interface BranchesUpdateOptionalParams
  - Removed Interface ComputesCreateOrUpdateOptionalParams
  - Removed Interface ComputesDeleteOptionalParams
  - Removed Interface ComputesGetOptionalParams
  - Removed Interface ComputesUpdateOptionalParams
  - Removed Interface EndpointsGetOptionalParams
  - Removed Interface EndpointsUpdateOptionalParams
  - Removed Interface NeonDatabasesGetOptionalParams
  - Removed Interface NeonDatabasesUpdateOptionalParams
  - Removed Interface NeonRolesGetOptionalParams
  - Removed Interface NeonRolesUpdateOptionalParams
  - Removed Interface ProjectsUpdateOptionalParams

    
## 1.0.0 (2025-04-18)

### Features Added

This is the first stable version with the package of @azure/arm-neonpostgres
