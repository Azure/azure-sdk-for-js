# Release History

## 1.0.0-beta.6 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.5 (2026-06-26)
Compared with version 1.0.0-beta.3

### Features Added
  - Added operation CustomLocationsOperations.createOrUpdate
  - Added operation CustomLocationsOperations.delete
  - Added operation ResourceSyncRulesOperations.createOrUpdate
  - Added operation ResourceSyncRulesOperations.update
  - Class CustomLocationsManagementClient has a new constructor "constructor(credential: TokenCredential, options?: CustomLocationsManagementClientOptionalParams);"
  - Added Interface CustomLocationOperationValueDisplay
  - Added Interface CustomLocationProperties
  - Added Interface EnabledResourceTypeProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ResourceSyncRuleProperties
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Interface CustomLocationsUpdateOptionalParams has a new optional parameter properties
  - Interface PatchableCustomLocations has a new optional parameter properties
  - Interface PatchableResourceSyncRule has a new optional parameter properties
  - Interface ProxyResource has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface TrackedResource has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions

### Breaking Changes
  - Removed Interface CustomLocationOperationsList
  - Interface CustomLocationsUpdateOptionalParams no longer has parameter authentication
  - Interface CustomLocationsUpdateOptionalParams no longer has parameter clusterExtensionIds
  - Interface CustomLocationsUpdateOptionalParams no longer has parameter displayName
  - Interface CustomLocationsUpdateOptionalParams no longer has parameter hostResourceId
  - Interface CustomLocationsUpdateOptionalParams no longer has parameter hostType
  - Interface CustomLocationsUpdateOptionalParams no longer has parameter namespace
  - Interface CustomLocationsUpdateOptionalParams no longer has parameter provisioningState
  - Interface PatchableCustomLocations no longer has parameter authentication
  - Interface PatchableCustomLocations no longer has parameter clusterExtensionIds
  - Interface PatchableCustomLocations no longer has parameter displayName
  - Interface PatchableCustomLocations no longer has parameter hostResourceId
  - Interface PatchableCustomLocations no longer has parameter hostType
  - Interface PatchableCustomLocations no longer has parameter namespace
  - Interface PatchableCustomLocations no longer has parameter provisioningState
  - Interface PatchableResourceSyncRule no longer has parameter priority
  - Interface PatchableResourceSyncRule no longer has parameter provisioningState
  - Interface PatchableResourceSyncRule no longer has parameter selector
  - Interface PatchableResourceSyncRule no longer has parameter targetResourceGroup

## 1.0.0-beta.3 (2023-01-10)

### Features Added

- Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

- A series of small bug fixs relevant to authentication and apiVersion policy

## 1.0.0-beta.2 (2022-07-20)
    
### Features Added

  - Added operation group ResourceSyncRules
  - Added operation CustomLocations.findTargetResourceGroup
  - Added Interface CustomLocation
  - Added Interface CustomLocationFindTargetResourceGroupProperties
  - Added Interface CustomLocationFindTargetResourceGroupResult
  - Added Interface CustomLocationsFindTargetResourceGroupOptionalParams
  - Added Interface EnabledResourceType
  - Added Interface MatchExpressionsProperties
  - Added Interface PatchableResourceSyncRule
  - Added Interface ProxyResource
  - Added Interface ResourceSyncRule
  - Added Interface ResourceSyncRuleListResult
  - Added Interface ResourceSyncRulePropertiesSelector
  - Added Interface ResourceSyncRulesCreateOrUpdateOptionalParams
  - Added Interface ResourceSyncRulesDeleteOptionalParams
  - Added Interface ResourceSyncRulesGetOptionalParams
  - Added Interface ResourceSyncRulesListByCustomLocationIDNextOptionalParams
  - Added Interface ResourceSyncRulesListByCustomLocationIDOptionalParams
  - Added Interface ResourceSyncRulesUpdateOptionalParams
  - Added Interface TrackedResource
  - Added Type Alias CustomLocationsFindTargetResourceGroupResponse
  - Added Type Alias ResourceSyncRulesCreateOrUpdateResponse
  - Added Type Alias ResourceSyncRulesGetResponse
  - Added Type Alias ResourceSyncRulesListByCustomLocationIDNextResponse
  - Added Type Alias ResourceSyncRulesListByCustomLocationIDResponse
  - Added Type Alias ResourceSyncRulesUpdateResponse
  - Class CustomLocationsManagementClient has a new parameter $host
  - Class CustomLocationsManagementClient has a new parameter apiVersion
  - Class CustomLocationsManagementClient has a new parameter resourceSyncRules
  - Class CustomLocationsManagementClient has a new parameter subscriptionId

### Breaking Changes

  - Deleted Class CustomLocationsManagementClientContext
    
## 1.0.0-beta.1 (2021-10-08)

  - Initial Release
