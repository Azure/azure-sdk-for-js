# Release History

## 3.0.0 (2026-06-25)

### Features Added
  - Added operation ManagementGroupsOperations.createOrUpdate
  - Added operation ManagementGroupsOperations.delete
  - Added Interface CreateManagementGroupProperties
  - Added Interface CreateOrUpdateSettingsProperties
  - Added Interface DescendantInfoProperties
  - Added Interface EntityInfoProperties
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface HierarchySettingsProperties
  - Added Interface ManagementGroupInfoProperties
  - Added Interface ManagementGroupProperties
  - Added Interface ManagementGroupsListDescendantsOptionalParams
  - Added Interface ManagementGroupSubscriptionsListSubscriptionsUnderManagementGroupOptionalParams
  - Added Interface OperationDisplay
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface Resource
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface SubscriptionUnderManagementGroupProperties
  - Added Interface SystemData
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
  - Operation ManagementGroups.beginDeleteAndWait has a new signature
  - Class ManagementGroupsAPI no longer has parameter apiVersion
  - Class ManagementGroupsAPI no longer has parameter hierarchySettingsOperations
  - Removed Interface AzureAsyncOperationResults
  - Removed Interface EntityHierarchyItem
  - Removed Interface ErrorDetails
  - Removed Interface ListSubscriptionUnderManagementGroup
  - Removed Interface ManagementGroupsGetDescendantsOptionalParams
  - Removed Interface ManagementGroupSubscriptionsGetSubscriptionsUnderManagementGroupOptionalParams
  - Removed Interface OperationDisplayProperties
  - Removed Interface OperationResults
  - Type of parameter error of interface ErrorResponse is changed from ErrorDetails to ErrorDetail
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

