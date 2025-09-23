# Release History

## 1.0.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.3 (2025-08-22)

### Other Changes

  - Other fixes

## 1.0.0-beta.2 (2023-11-07)
    
### Features Added

  - Added operation group AzureBareMetalStorageInstances
  - Added operation AzureBareMetalInstances.beginRestart
  - Added operation AzureBareMetalInstances.beginRestartAndWait
  - Added operation AzureBareMetalInstances.beginShutdown
  - Added operation AzureBareMetalInstances.beginShutdownAndWait
  - Added operation AzureBareMetalInstances.beginStart
  - Added operation AzureBareMetalInstances.beginStartAndWait
  - Added Interface AzureBareMetalInstancesRestartHeaders
  - Added Interface AzureBareMetalInstancesRestartOptionalParams
  - Added Interface AzureBareMetalInstancesShutdownHeaders
  - Added Interface AzureBareMetalInstancesShutdownOptionalParams
  - Added Interface AzureBareMetalInstancesStartHeaders
  - Added Interface AzureBareMetalInstancesStartOptionalParams
  - Added Interface AzureBareMetalStorageInstance
  - Added Interface AzureBareMetalStorageInstancesCreateOptionalParams
  - Added Interface AzureBareMetalStorageInstancesDeleteOptionalParams
  - Added Interface AzureBareMetalStorageInstancesGetOptionalParams
  - Added Interface AzureBareMetalStorageInstancesListByResourceGroupNextOptionalParams
  - Added Interface AzureBareMetalStorageInstancesListByResourceGroupOptionalParams
  - Added Interface AzureBareMetalStorageInstancesListBySubscriptionNextOptionalParams
  - Added Interface AzureBareMetalStorageInstancesListBySubscriptionOptionalParams
  - Added Interface AzureBareMetalStorageInstancesListResult
  - Added Interface AzureBareMetalStorageInstancesUpdateOptionalParams
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ForceState
  - Added Interface NetworkInterface
  - Added Interface OperationDisplay
  - Added Interface OperationListResult
  - Added Interface OperationStatus
  - Added Interface OperationStatusError
  - Added Interface StorageBillingProperties
  - Added Interface StorageProperties
  - Added Type Alias ActionType
  - Added Type Alias AsyncOperationStatus
  - Added Type Alias AzureBareMetalInstanceForcePowerState
  - Added Type Alias AzureBareMetalInstancesRestartResponse
  - Added Type Alias AzureBareMetalInstancesShutdownResponse
  - Added Type Alias AzureBareMetalInstancesStartResponse
  - Added Type Alias AzureBareMetalStorageInstancesCreateResponse
  - Added Type Alias AzureBareMetalStorageInstancesGetResponse
  - Added Type Alias AzureBareMetalStorageInstancesListByResourceGroupNextResponse
  - Added Type Alias AzureBareMetalStorageInstancesListByResourceGroupResponse
  - Added Type Alias AzureBareMetalStorageInstancesListBySubscriptionNextResponse
  - Added Type Alias AzureBareMetalStorageInstancesListBySubscriptionResponse
  - Added Type Alias AzureBareMetalStorageInstancesUpdateResponse
  - Added Type Alias Origin
  - Added Type Alias ProvisioningState
  - Interface Operation has a new optional parameter actionType
  - Interface Operation has a new optional parameter origin
  - Interface Resource has a new optional parameter systemData
  - Added Enum KnownActionType
  - Added Enum KnownAsyncOperationStatus
  - Added Enum KnownAzureBareMetalInstanceForcePowerState
  - Added Enum KnownOrigin
  - Added Enum KnownProvisioningState
  - Enum KnownAzureBareMetalHardwareTypeNamesEnum has a new value Sdflex
  - Enum KnownAzureBareMetalInstanceSizeNamesEnum has a new value S448Se

### Breaking Changes

  - Interface AzureBareMetalInstance no longer has parameter systemData
  - Type of parameter error of interface ErrorResponse is changed from ErrorDefinition to ErrorDetail
  - Type of parameter networkInterfaces of interface NetworkProfile is changed from IpAddress[] to NetworkInterface[]
  - Type of parameter display of interface Operation is changed from Display to OperationDisplay
    
    
## 1.0.0-beta.1 (2023-05-23)

The package of @azure/arm-baremetalinfrastructure is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
