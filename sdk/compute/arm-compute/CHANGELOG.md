## 30.0.0-beta.3 (2021-08-31)
    
**Features**

  - Added Interface ApplicationProfile
  - Added Interface SoftDeletePolicy
  - Added Interface VMGalleryApplication
  - Added Interface VMSizeProperties
  - Added Type Alias ExtendedLocationType
  - Added Type Alias ReplicationMode
  - Interface AdditionalCapabilities has a new optional parameter hibernationEnabled
  - Interface GalleryArtifactPublishingProfileBase has a new optional parameter replicationMode
  - Interface HardwareProfile has a new optional parameter vmSizeProperties
  - Interface ResourceSkuLocationInfo has a new optional parameter extendedLocations
  - Interface ResourceSkuLocationInfo has a new optional parameter type
  - Interface ResourceSkusListNextOptionalParams has a new optional parameter includeExtendedLocations
  - Interface ResourceSkusListOptionalParams has a new optional parameter includeExtendedLocations
  - Interface ScaleInPolicy has a new optional parameter forceDeletion
  - Interface VirtualMachineScaleSetVMProfile has a new optional parameter applicationProfile
  - Interface VirtualMachinesDeallocateOptionalParams has a new optional parameter hibernate
  - Type Alias Gallery has a new parameter softDeletePolicy
  - Type Alias GalleryUpdate has a new parameter softDeletePolicy
  - Type Alias ImageReference has a new parameter sharedGalleryImageId
  - Type Alias VirtualMachine has a new parameter applicationProfile
  - Type Alias VirtualMachineExtension has a new parameter suppressFailures
  - Type Alias VirtualMachineExtensionUpdate has a new parameter suppressFailures
  - Type Alias VirtualMachineScaleSetExtension has a new parameter suppressFailures
  - Type Alias VirtualMachineScaleSetExtensionUpdate has a new parameter suppressFailures
  - Type Alias VirtualMachineScaleSetVMExtension has a new parameter suppressFailures
  - Type Alias VirtualMachineScaleSetVMExtensionUpdate has a new parameter suppressFailures
  - Type Alias VirtualMachineUpdate has a new parameter applicationProfile
  - Added Enum KnownExtendedLocationType
  - Added Enum KnownReplicationMode
    
## 30.0.0-beta.2 (2021-07-27)
    
**Features**

  - Added operation group CapacityReservationGroups
  - Added operation group CapacityReservations
  - Added Interface CapacityReservationGroupInstanceView
  - Added Interface CapacityReservationGroupListResult
  - Added Interface CapacityReservationGroupsCreateOrUpdateOptionalParams
  - Added Interface CapacityReservationGroupsDeleteOptionalParams
  - Added Interface CapacityReservationGroupsGetOptionalParams
  - Added Interface CapacityReservationGroupsListByResourceGroupNextOptionalParams
  - Added Interface CapacityReservationGroupsListByResourceGroupOptionalParams
  - Added Interface CapacityReservationGroupsListBySubscriptionNextOptionalParams
  - Added Interface CapacityReservationGroupsListBySubscriptionOptionalParams
  - Added Interface CapacityReservationGroupsUpdateOptionalParams
  - Added Interface CapacityReservationInstanceView
  - Added Interface CapacityReservationListResult
  - Added Interface CapacityReservationProfile
  - Added Interface CapacityReservationsCreateOrUpdateOptionalParams
  - Added Interface CapacityReservationsDeleteOptionalParams
  - Added Interface CapacityReservationsGetOptionalParams
  - Added Interface CapacityReservationsListByCapacityReservationGroupNextOptionalParams
  - Added Interface CapacityReservationsListByCapacityReservationGroupOptionalParams
  - Added Interface CapacityReservationsUpdateOptionalParams
  - Added Interface CapacityReservationUtilization
  - Added Interface SpotRestorePolicy
  - Added Type Alias CapacityReservation
  - Added Type Alias CapacityReservationGroup
  - Added Type Alias CapacityReservationGroupInstanceViewTypes
  - Added Type Alias CapacityReservationGroupsCreateOrUpdateResponse
  - Added Type Alias CapacityReservationGroupsGetResponse
  - Added Type Alias CapacityReservationGroupsListByResourceGroupNextResponse
  - Added Type Alias CapacityReservationGroupsListByResourceGroupResponse
  - Added Type Alias CapacityReservationGroupsListBySubscriptionNextResponse
  - Added Type Alias CapacityReservationGroupsListBySubscriptionResponse
  - Added Type Alias CapacityReservationGroupsUpdateResponse
  - Added Type Alias CapacityReservationGroupUpdate
  - Added Type Alias CapacityReservationInstanceViewTypes
  - Added Type Alias CapacityReservationInstanceViewWithName
  - Added Type Alias CapacityReservationsCreateOrUpdateResponse
  - Added Type Alias CapacityReservationsGetResponse
  - Added Type Alias CapacityReservationsListByCapacityReservationGroupNextResponse
  - Added Type Alias CapacityReservationsListByCapacityReservationGroupResponse
  - Added Type Alias CapacityReservationsUpdateResponse
  - Added Type Alias CapacityReservationUpdate
  - Added Type Alias ExpandTypesForGetCapacityReservationGroups
  - Interface VirtualMachineScaleSetVMProfile has a new optional parameter capacityReservation
  - Type Alias VirtualMachine has a new parameter capacityReservation
  - Type Alias VirtualMachineScaleSet has a new parameter spotRestorePolicy
  - Type Alias VirtualMachineUpdate has a new parameter capacityReservation
  - Added Enum KnownCapacityReservationGroupInstanceViewTypes
  - Added Enum KnownCapacityReservationInstanceViewTypes
  - Added Enum KnownExpandTypesForGetCapacityReservationGroups

**Breaking Changes**

  - Class ComputeManagementClient has a new required parameter capacityReservationGroups
  - Class ComputeManagementClient has a new required parameter capacityReservations
    
## 30.0.0-beta.1 (2021-07-15)

This is the first preview for the new version of the `@azure/arm-compute` package that follows the new [guidelines for TypeScript SDKs](https://azure.github.io/azure-sdk/typescript_introduction.html) for Azure services.

While this package remains auto generated, the SDK generator itself has undergone changes to comply with the above guidelines in order to generate packages that are idiomatic to the JavaScript/TypeScript ecosystem and consistent with other packages for Azure services. For more on this, please see [State of the Azure SDK 2021](https://devblogs.microsoft.com/azure-sdk/state-of-the-azure-sdk-2021/).

Please note that this version has breaking changes, all of which were made after careful consideration during the authoring of the guidelines and user studies.

**Noteworthy changes and features**
- Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
- Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead.
- List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
- Long running operations i.e. the methods whose names started with `begin` now return a poller object that gives you a better control over the operation. To get the final result like before use the corresponding method that will have the suffix `AndWait`.
- The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
