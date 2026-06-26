# Release History

## 1.0.0-beta.2 (2026-06-25)
Compared with version 1.0.0-beta.1

### Features Added
  - Added operation group UploadServiceOperations
  - Added Interface InsightCategoryGroup
  - Added Interface InsightReference
  - Added Interface ManagedServiceIdentityOnlyUserAssigned
  - Added Interface Performance
  - Added Interface UploadServiceGetUploadTokenOptionalParams
  - Added Interface UploadTokenResult
  - Added Interface UserAssignedIdentity
  - Interface Connector has a new optional parameter identity
  - Interface ImpactCategoriesListBySubscriptionOptionalParams has a new optional parameter resourceType
  - Interface ImpactClientOptionalParams has a new optional parameter cloudSetting
  - Interface WorkloadImpactProperties has a new optional parameter detectionType
  - Interface WorkloadImpactProperties has a new optional parameter durationInSec
  - Interface WorkloadImpactProperties has a new optional parameter durationMarginInSec
  - Interface WorkloadImpactProperties has a new optional parameter hitCount
  - Interface WorkloadImpactProperties has a new optional parameter insightsByCategory
  - Interface WorkloadImpactProperties has a new optional parameter ongoingImpact
  - Interface WorkloadImpactProperties has a new optional parameter severity
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias DetectionType
  - Added Type Alias ManagedServiceIdentityTypeOnlyUserAssigned
  - Added Type Alias Severity
  - Added Enum AzureClouds
  - Added Enum KnownDetectionType
  - Added Enum KnownManagedServiceIdentityTypeOnlyUserAssigned
  - Added Enum KnownSeverity
  - Enum KnownVersions has a new value V20250101Preview
  - Enum KnownVersions has a new value V20260101Preview

### Breaking Changes
  - Operation ImpactCategoriesOperations.listBySubscription has a new signature
  - Removed Interface ConnectorUpdate
  - Removed Interface ConnectorUpdateProperties
  - Removed Interface Performance_2
  - Interface ConnectorProperties has a new required parameter processingState
  - Interface ConnectorProperties has a new required parameter processingStateMessage
  - Enum KnownVersions no longer has value V20240501Preview

    
## 1.0.0-beta.1 (2025-02-20)

### Features Added

Initial release of the Azure Impact Reporting package
