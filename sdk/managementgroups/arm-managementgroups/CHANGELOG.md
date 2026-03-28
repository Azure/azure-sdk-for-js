# Release History

## 3.0.0-beta.1 (2026-03-24)
Compared with version 2.0.2

### Features Added
  - Added operation ManagementGroupsOperations.createOrUpdate
  - Added operation ManagementGroupsOperations.delete
  - Added operation ManagementGroupsOperations.getDescendants
  - Added operation ManagementGroupSubscriptionsOperations.getSubscriptionsUnderManagementGroup
  - Added Interface CreateManagementGroupProperties
  - Added Interface CreateOrUpdateSettingsProperties
  - Added Interface DescendantInfoProperties
  - Added Interface EntityInfoProperties
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface HierarchySettingsProperties
  - Added Interface ManagementGroupInfoProperties
  - Added Interface ManagementGroupProperties
  - Added Interface OperationDisplay
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface Resource
  - Added Interface RestorePollerOptions
  - Added Interface SubscriptionUnderManagementGroupProperties
  - Added Interface SystemData
  - Interface DescendantInfo has a new optional parameter properties
  - Interface EntityInfo has a new optional parameter properties
  - Interface HierarchySettings has a new optional parameter systemData
  - Interface ManagementGroup has a new optional parameter systemData
  - Interface Operation has a new optional parameter actionType
  - Interface Operation has a new optional parameter isDataAction
  - Interface Operation has a new optional parameter origin
  - Interface SubscriptionUnderManagementGroup has a new optional parameter systemData
  - Added Type Alias ActionType
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Type Alias EntitySearchType
  - Added Type Alias EntityViewParameterType
  - Added Type Alias ManagementGroupExpandType
  - Added Type Alias Origin
  - Added Type Alias Permissions
  - Added Enum AzureClouds
  - Added Enum KnownActionType
  - Added Enum KnownCreatedByType
  - Added Enum KnownEntitySearchType
  - Added Enum KnownEntityViewParameterType
  - Added Enum KnownManagementGroupExpandType
  - Added Enum KnownOrigin
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation ManagementGroups.beginCreateOrUpdate
  - Removed operation ManagementGroups.beginCreateOrUpdateAndWait
  - Removed operation ManagementGroups.beginDelete
  - Removed operation ManagementGroups.beginDeleteAndWait
  - Removed operation ManagementGroups.listDescendants
  - Removed operation ManagementGroupSubscriptions.listSubscriptionsUnderManagementGroup
  - Removed Interface AzureAsyncOperationResults
  - Removed Interface EntityHierarchyItem
  - Removed Interface ErrorDetails
  - Removed Interface ListSubscriptionUnderManagementGroup
  - Removed Interface OperationDisplayProperties
  - Removed Interface OperationResults
  - Type of parameter error of interface ErrorResponse is changed from ErrorDetails to ErrorDetail
  - Interface DescendantInfo no longer has parameter displayName
  - Interface DescendantInfo no longer has parameter parent
  - Interface EntityInfo no longer has parameter displayName
  - Interface EntityInfo no longer has parameter inheritedPermissions
  - Interface EntityInfo no longer has parameter numberOfChildGroups
  - Interface EntityInfo no longer has parameter numberOfChildren
  - Interface EntityInfo no longer has parameter numberOfDescendants
  - Interface EntityInfo no longer has parameter parent
  - Interface EntityInfo no longer has parameter parentDisplayNameChain
  - Interface EntityInfo no longer has parameter parentNameChain
  - Interface EntityInfo no longer has parameter permissions
  - Interface EntityInfo no longer has parameter tenantId
  - Removed Type Alias Enum0
  - Removed Type Alias Enum2
  - Removed Type Alias Enum3
  - Removed Type Alias Permissions_2
  - Type alias "ManagementGroupChildType" has been changed
  - Removed Enum KnownEnum0
  - Removed Enum KnownEnum2
  - Removed Enum KnownEnum3
  - Removed Enum KnownManagementGroupChildType
  - Removed Enum KnownPermissions

## 2.0.2 (2022-12-05)

### Features Added

  - Exposes `getContinuationToken` helper function to extract continuation token

**Bugfix**

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 2.0.1 (2022-04-24)

### Features Added

  - Bug fix

## 2.0.0 (2021-12-22)

The package of @azure/arm-managementgroups is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
