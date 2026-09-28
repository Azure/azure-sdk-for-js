# Release History

## 1.0.0-beta.2 (2026-09-28)
Compared with version 1.0.0-beta.1

### Features Added
  - Added operation StoragesOperations.disableComplianceLock
  - Added operation StoragesOperations.enableComplianceLock
  - Added operation StoragesOperations.refresh
  - Added Interface ActivateSaaSRequestParam
  - Added Interface CloudAccountCreateOrUpdate
  - Added Interface CloudAccountPropertiesCreateOrUpdate
  - Added Interface CloudAccountPropertiesUpdate
  - Added Interface CommvaultPlanCreateOrUpdate
  - Added Interface CompanyProfile
  - Added Interface ManagedServiceIdentityCreateOrUpdate
  - Added Interface ManagedServiceIdentityUpdate
  - Added Interface MarketplaceDetailsCreateOrUpdate
  - Added Interface MarketplaceDetailsUpdate
  - Added Interface PlanPropertiesCreateOrUpdate
  - Added Interface ProtectionGroupCreateOrUpdate
  - Added Interface ProtectionGroupPropertiesCreateOrUpdate
  - Added Interface ProxyResourceCreateOrUpdate
  - Added Interface ResourceCreateOrUpdate
  - Added Interface ResourceUpdate
  - Added Interface RoleMappingCreateOrUpdate
  - Added Interface RoleMappingPropertiesCreateOrUpdate
  - Added Interface StorageCreateOrUpdate
  - Added Interface StoragePropertiesCreateOrUpdate
  - Added Interface StoragesDisableComplianceLockOptionalParams
  - Added Interface StoragesEnableComplianceLockOptionalParams
  - Added Interface StoragesRefreshOptionalParams
  - Added Interface TrackedResourceCreateOrUpdate
  - Added Interface TrackedResourceUpdate
  - Added Interface UserAssignedIdentityCreateOrUpdate
  - Added Interface UserAssignedIdentityUpdate
  - Interface ActivateSaaSParameterRequest has a new optional parameter activateSaaSRequestParam
  - Interface ActivateSaaSParameterRequest has a new optional parameter publisherId
  - Interface CloudAccountProperties has a new optional parameter company
  - Interface StorageProperties has a new optional parameter complianceLockStatus
  - Added Type Alias ComplianceLockStatus
  - Added Enum KnownComplianceLockStatus
  - Enum KnownVersions has a new value V9Preview

### Breaking Changes
  - Operation SaaSOperationGroupOperations.activateResource has a new signature
  - Removed Interface CloudAccountUpdateProperties
  - Interface ActivateSaaSParameterRequest has a new required parameter saasGuid
  - Interface ActivateSaaSParameterRequest no longer has parameter saaSGuid
  - Interface CloudAccountProperties no longer has parameter backupAdminOnCcaCreate
  - Interface CloudAccountProperties no longer has parameter multiPersonAuthorizationOnCcaCreate
  - Parameter lastBackUpTime of interface ProtectionGroupProperties is now required
  - Parameter numberOfProtectedItems of interface ProtectionGroupProperties is now required
  - Parameter protectionStatus of interface ProtectionGroupProperties is now required
  - Parameter entities of interface RoleAssignment is now required
  - Parameter roleName of interface RoleAssignment is now required

    
## 1.0.0-beta.1 (2026-06-24)

### Features Added

This is the first preview release of the @azure/arm-commvaultcontentstore package. It introduces a new SDK generation with layered APIs, smaller bundles, and improved ergonomics. For more details, see the https://aka.ms/azsdk/js/sdk/quickstart.
