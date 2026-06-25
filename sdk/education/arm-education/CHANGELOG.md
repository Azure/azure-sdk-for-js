# Release History

## 1.0.0-beta.6 (2026-06-25)
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

## 1.0.0-beta.5 (2026-05-27)
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
  - Removed Interface GrantListResponse
  - Removed Interface JoinRequestList
  - Interface LabDetails no longer has parameter currencyPropertiesTotalAllocatedBudgetCurrency
  - Interface LabDetails no longer has parameter currencyPropertiesTotalBudgetCurrency
  - Interface LabDetails no longer has parameter valuePropertiesTotalAllocatedBudgetValue
  - Interface LabDetails no longer has parameter valuePropertiesTotalBudgetValue
  - Parameter value of interface OperationListResult is now required

    
## 1.0.0-beta.3 (2023-01-10)
    
### Features Added

  - Interface GrantsListAllNextOptionalParams no longer has parameter includeAllocatedBudget
  - Interface GrantsListNextOptionalParams no longer has parameter includeAllocatedBudget
  - Interface JoinRequestsListNextOptionalParams no longer has parameter includeDenied
  - Interface LabsListAllNextOptionalParams no longer has parameter includeBudget
  - Interface LabsListAllNextOptionalParams no longer has parameter includeDeleted
  - Interface LabsListNextOptionalParams no longer has parameter includeBudget
  - Interface StudentsListNextOptionalParams no longer has parameter includeDeleted
    
    
## 1.0.0-beta.2 (2022-07-04)
    
### Features Added

  - Added Interface GrantDetails
  - Added Interface JoinRequestDetails
  - Added Interface LabDetails
  - Added Interface StudentDetails
  - Added Interface StudentLabDetails
  - Enum KnownLabStatus has a new value Pending
    
    
## 1.0.0-beta.1 (2022-05-24)

The package of @azure/arm-education is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
