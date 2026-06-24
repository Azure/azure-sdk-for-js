# Release History

## 1.0.0-beta.6 (2026-06-24)
Compared with version 1.0.0-beta.3

### Features Added
  - Added Interface GrantDetailProperties
  - Added Interface JoinRequestProperties
  - Added Interface LabProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface StudentLabProperties
  - Added Interface StudentProperties
  - Interface LabDetails has a new optional parameter totalAllocatedBudget
  - Interface LabDetails has a new optional parameter totalBudget
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions

### Breaking Changes
  - Class EducationManagementClient no longer has parameter apiVersion
  - Removed Interface GrantListResponse
  - Removed Interface JoinRequestList
  - Interface LabDetails no longer has parameter currencyPropertiesTotalAllocatedBudgetCurrency
  - Interface LabDetails no longer has parameter currencyPropertiesTotalBudgetCurrency
  - Interface LabDetails no longer has parameter valuePropertiesTotalAllocatedBudgetValue
  - Interface LabDetails no longer has parameter valuePropertiesTotalBudgetValue
  - Parameter value of interface OperationListResult is now required

