# Release History

## 8.0.0 (2026-06-24)

### Features Added
  - Added operation ResourceGroupsOperations.delete
  - Added operation ResourceGroupsOperations.exportTemplate
  - Added operation ResourcesOperations.createOrUpdate
  - Added operation ResourcesOperations.createOrUpdateById
  - Added operation ResourcesOperations.delete
  - Added operation ResourcesOperations.deleteById
  - Added operation ResourcesOperations.moveResources
  - Added operation ResourcesOperations.update
  - Added operation ResourcesOperations.updateById
  - Added operation ResourcesOperations.validateMoveResources
  - Added operation TagsOperationsOperations.createOrUpdateAtScope
  - Added operation TagsOperationsOperations.deleteAtScope
  - Added operation TagsOperationsOperations.updateAtScope
  - Added Interface ErrorDetail
  - Added Interface ExtensionResource
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface SystemData
  - Added Interface TagsOperationsCreateOrUpdateAtScopeOptionalParams
  - Added Interface TagsOperationsCreateOrUpdateOptionalParams
  - Added Interface TagsOperationsCreateOrUpdateValueOptionalParams
  - Added Interface TagsOperationsDeleteAtScopeOptionalParams
  - Added Interface TagsOperationsDeleteOptionalParams
  - Added Interface TagsOperationsDeleteValueOptionalParams
  - Added Interface TagsOperationsGetAtScopeOptionalParams
  - Added Interface TagsOperationsListOptionalParams
  - Added Interface TagsOperationsUpdateAtScopeOptionalParams
  - Added Interface TrackedResource
  - Interface GenericResource has a new optional parameter systemData
  - Interface GenericResourceExpanded has a new optional parameter systemData
  - Interface Operation has a new optional parameter actionType
  - Interface Operation has a new optional parameter isDataAction
  - Interface Operation has a new optional parameter origin
  - Interface Resource has a new optional parameter systemData
  - Interface ResourceGroup has a new optional parameter systemData
  - Interface TagsResource has a new optional parameter systemData
  - Added Type Alias ActionType
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Type Alias Origin
  - Added Enum AzureClouds
  - Added Enum KnownActionType
  - Added Enum KnownCreatedByType
  - Added Enum KnownOrigin
  - Added Enum KnownVersions

### Breaking Changes
  - Class ResourceManagementClient no longer has parameter apiVersion
  - Class ResourceManagementClient no longer has parameter subscriptionId
  - Removed Interface GenericResourceFilter
  - Removed Interface ResourceGroupFilter
  - Removed Interface ResourceProviderOperationDisplayProperties
  - Removed Interface SubResource
  - Removed Interface TagsCreateOrUpdateAtScopeOptionalParams
  - Removed Interface TagsCreateOrUpdateOptionalParams
  - Removed Interface TagsCreateOrUpdateValueOptionalParams
  - Removed Interface TagsDeleteAtScopeOptionalParams
  - Removed Interface TagsDeleteOptionalParams
  - Removed Interface TagsDeleteValueOptionalParams
  - Removed Interface TagsGetAtScopeOptionalParams
  - Removed Interface TagsListOptionalParams
  - Removed Interface TagsUpdateAtScopeOptionalParams
  - Interface Resource no longer has parameter extendedLocation
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Parameter value of interface ProviderPermissionListResult is now required
  - Parameter value of interface ProviderResourceTypeListResult is now required

