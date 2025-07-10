# Release History
    
## 1.0.0-beta.3 (2025-07-10)
Compared with version 1.0.0-beta.2
    
### Features Added
  - Added operation group StorageTaskAssignmentOperations
  - Added operation StorageTasksOperations.create
  - Added operation StorageTasksOperations.delete
  - Added operation StorageTasksOperations.update
  - Added Interface PageSettings
  - Added Interface StorageTaskUpdateProperties
  - Added Enum KnownVersions
### Breaking Changes
  - Removed operation StorageTasks.beginCreate
  - Removed operation StorageTasks.beginCreateAndWait
  - Removed operation StorageTasks.beginDelete
  - Removed operation StorageTasks.beginDeleteAndWait
  - Removed operation StorageTasks.beginUpdate
  - Removed operation StorageTasks.beginUpdateAndWait
  - Class StorageActionsManagementClient no longer has parameter $host
  - Class StorageActionsManagementClient no longer has parameter apiVersion
  - Class StorageActionsManagementClient no longer has parameter storageTaskAssignmentOperations
  - Class StorageActionsManagementClient no longer has parameter subscriptionId
  - Removed Interface OperationListResult
  - Removed Interface StorageTaskAssignmentOperationsOperations
  - Removed Interface StorageTaskAssignmentsListResult
  - Removed Interface StorageTaskReportSummary
  - Removed Interface StorageTasksCreateHeaders
  - Removed Interface StorageTasksDeleteHeaders
  - Removed Interface StorageTasksListResult
  - Removed Interface StorageTasksUpdateHeaders
  - Type of parameter info of interface ErrorAdditionalInfo is changed from Record<string, unknown> to any
  - Type of parameter properties of interface StorageTaskUpdateParameters is changed from StorageTaskProperties to StorageTaskUpdateProperties
  - Interface StorageActionsManagementClientOptionalParams no longer has parameter $host
  - Interface StorageActionsManagementClientOptionalParams no longer has parameter endpoint
  - Interface StorageTasksCreateOptionalParams no longer has parameter resumeFrom
  - Interface StorageTasksDeleteOptionalParams no longer has parameter resumeFrom
  - Interface StorageTasksUpdateOptionalParams no longer has parameter resumeFrom
  - Removed Type Alias OperationsListNextResponse
  - Removed Type Alias OperationsListResponse
  - Removed Type Alias StorageTaskAssignmentListNextResponse
  - Removed Type Alias StorageTaskAssignmentListResponse
  - Removed Type Alias StorageTasksCreateResponse
  - Removed Type Alias StorageTasksDeleteResponse
  - Removed Type Alias StorageTasksGetResponse
  - Removed Type Alias StorageTasksListByResourceGroupNextResponse
  - Removed Type Alias StorageTasksListByResourceGroupResponse
  - Removed Type Alias StorageTasksListBySubscriptionNextResponse
  - Removed Type Alias StorageTasksListBySubscriptionResponse
  - Removed Type Alias StorageTasksPreviewActionsResponse
  - Removed Type Alias StorageTasksReportListNextResponse
  - Removed Type Alias StorageTasksReportListResponse
  - Removed Type Alias StorageTasksUpdateResponse
  - Removed function getContinuationToken

    
    
## 1.0.0-beta.2 (2025-04-18)
Compared with version 1.0.0-beta.1
    
### Features Added

  - Added Type Alias OnFailure
  - Added Type Alias OnSuccess
  - Added Enum KnownOnFailure
  - Added Enum KnownOnSuccess
  - Added Enum KnownProvisioningState

### Breaking Changes

  - Parameter identity of interface StorageTask is now required
  - Parameter properties of interface StorageTask is now required
  - Type of parameter maxpagesize of interface StorageTaskAssignmentListOptionalParams is changed from string to number
  - Type of parameter onFailure of interface StorageTaskOperation is changed from "break" to OnFailure
  - Type of parameter onSuccess of interface StorageTaskOperation is changed from "continue" to OnSuccess
  - Type of parameter maxpagesize of interface StorageTasksReportListOptionalParams is changed from string to number
    
    
## 1.0.0-beta.1 (2024-03-07)

The package of @azure/arm-storageactions is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
