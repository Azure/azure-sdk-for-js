# Release History

## 9.0.0-beta.2 (2026-06-25)
Compared with version 8.2.0

### Features Added
  - Added operation AccessPolicyOperations.createUpdate
  - Added operation AccessPolicyOperations.delete
  - Added operation AccessPolicyAssignmentOperations.createUpdate
  - Added operation AccessPolicyAssignmentOperations.delete
  - Added operation LinkedServerOperations.create
  - Added operation LinkedServerOperations.delete
  - Added operation PrivateEndpointConnectionsOperations.put
  - Added operation RedisOperations.create
  - Added operation RedisOperations.delete
  - Added operation RedisOperations.exportData
  - Added operation RedisOperations.flushCache
  - Added operation RedisOperations.importData
  - Added operation RedisOperations.update
  - Class RedisManagementClient has a new constructor "constructor(credential: TokenCredential, options?: RedisManagementClientOptionalParams);"
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateLinkResourceProperties
  - Added Interface RedisCacheAccessPolicyAssignmentProperties
  - Added Interface RedisCacheAccessPolicyProperties
  - Added Interface RedisFirewallRuleProperties
  - Added Interface RestorePollerOptions
  - Added Interface ScheduleEntries
  - Added Interface SimplePollerLike
  - Added Interface SystemData
  - Interface PrivateEndpointConnection has a new optional parameter groupIds
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface PrivateLinkResource has a new optional parameter systemData
  - Interface ProxyResource has a new optional parameter systemData
  - Interface RedisCacheAccessPolicy has a new optional parameter systemData
  - Interface RedisCacheAccessPolicyAssignment has a new optional parameter systemData
  - Interface RedisCommonPropertiesRedisConfiguration has a new optional parameter additionalProperties
  - Interface RedisFirewallRule has a new optional parameter systemData
  - Interface RedisLinkedServerWithProperties has a new optional parameter systemData
  - Interface RedisPatchSchedule has a new optional parameter systemData
  - Interface RedisProperties has a new optional parameter targetAmrResourceId
  - Interface RedisResource has a new optional parameter targetAmrResourceId
  - Interface RedisResource has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface TrackedResource has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownVersions
  - Enum KnownProvisioningState has a new value Migrating
  - Enum KnownProvisioningState has a new value MigrationCancellationFailed
  - Enum KnownProvisioningState has a new value MigrationCancelling
  - Enum KnownProvisioningState has a new value MigrationFailed
  - Enum KnownProvisioningState has a new value MigrationSucceeded

### Breaking Changes
  - Class RedisManagementClient no longer has parameter apiVersion
  - Class RedisManagementClient no longer has parameter subscriptionId
  - Removed Interface NotificationListResponse
  - Removed Interface RedisCacheAccessPolicyAssignmentList
  - Removed Interface RedisCacheAccessPolicyList
  - Removed Interface RedisFirewallRuleCreateParameters
  - Removed Interface RedisLinkedServerWithPropertiesList

## 9.0.0-beta.1 (2026-06-02)
Compared with version 8.2.0

### Features Added
  - Added operation AccessPolicyOperations.createUpdate
  - Added operation AccessPolicyOperations.delete
  - Added operation AccessPolicyAssignmentOperations.createUpdate
  - Added operation AccessPolicyAssignmentOperations.delete
  - Added operation LinkedServerOperations.create
  - Added operation LinkedServerOperations.delete
  - Added operation PrivateEndpointConnectionsOperations.put
  - Added operation RedisOperations.create
  - Added operation RedisOperations.delete
  - Added operation RedisOperations.exportData
  - Added operation RedisOperations.flushCache
  - Added operation RedisOperations.importData
  - Added operation RedisOperations.update
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateLinkResourceProperties
  - Added Interface RedisCacheAccessPolicyAssignmentProperties
  - Added Interface RedisCacheAccessPolicyProperties
  - Added Interface RedisFirewallRuleProperties
  - Added Interface RestorePollerOptions
  - Added Interface ScheduleEntries
  - Added Interface SimplePollerLike
  - Added Interface SystemData
  - Interface PrivateEndpointConnection has a new optional parameter groupIds
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface PrivateLinkResource has a new optional parameter systemData
  - Interface ProxyResource has a new optional parameter systemData
  - Interface RedisCacheAccessPolicy has a new optional parameter systemData
  - Interface RedisCacheAccessPolicyAssignment has a new optional parameter systemData
  - Interface RedisCommonPropertiesRedisConfiguration has a new optional parameter additionalProperties
  - Interface RedisFirewallRule has a new optional parameter systemData
  - Interface RedisLinkedServerWithProperties has a new optional parameter systemData
  - Interface RedisPatchSchedule has a new optional parameter systemData
  - Interface RedisProperties has a new optional parameter targetAmrResourceId
  - Interface RedisResource has a new optional parameter targetAmrResourceId
  - Interface RedisResource has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface TrackedResource has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownVersions
  - Enum KnownProvisioningState has a new value Migrating
  - Enum KnownProvisioningState has a new value MigrationCancellationFailed
  - Enum KnownProvisioningState has a new value MigrationCancelling
  - Enum KnownProvisioningState has a new value MigrationFailed
  - Enum KnownProvisioningState has a new value MigrationSucceeded

### Breaking Changes
  - Removed Interface NotificationListResponse
  - Removed Interface RedisCacheAccessPolicyAssignmentList
  - Removed Interface RedisCacheAccessPolicyList
  - Removed Interface RedisFirewallRuleCreateParameters
  - Removed Interface RedisLinkedServerWithPropertiesList

    
## 8.2.0 (2025-01-07)
    
### Features Added

  - Added Type Alias ZonalAllocationPolicy
  - Interface RedisCommonProperties has a new optional parameter zonalAllocationPolicy
  - Interface RedisCreateParameters has a new optional parameter zonalAllocationPolicy
  - Interface RedisResource has a new optional parameter zonalAllocationPolicy
  - Interface RedisUpdateParameters has a new optional parameter zonalAllocationPolicy
  - Added Enum KnownZonalAllocationPolicy
    
    
## 8.1.0 (2024-07-12)
    
### Features Added

  - Interface RedisCommonProperties has a new optional parameter disableAccessKeyAuthentication
  - Interface RedisCommonPropertiesRedisConfiguration has a new optional parameter notifyKeyspaceEvents
  - Interface RedisCreateParameters has a new optional parameter disableAccessKeyAuthentication
  - Interface RedisResource has a new optional parameter disableAccessKeyAuthentication
  - Interface RedisUpdateParameters has a new optional parameter disableAccessKeyAuthentication
    
    
## 8.0.0 (2023-09-11)
    
### Features Added

  - Added operation group AccessPolicy
  - Added operation group AccessPolicyAssignment
  - Added operation Redis.beginFlushCache
  - Added operation Redis.beginFlushCacheAndWait
  - Added Interface AccessPolicyAssignmentCreateUpdateOptionalParams
  - Added Interface AccessPolicyAssignmentDeleteHeaders
  - Added Interface AccessPolicyAssignmentDeleteOptionalParams
  - Added Interface AccessPolicyAssignmentGetOptionalParams
  - Added Interface AccessPolicyAssignmentListNextOptionalParams
  - Added Interface AccessPolicyAssignmentListOptionalParams
  - Added Interface AccessPolicyCreateUpdateOptionalParams
  - Added Interface AccessPolicyDeleteHeaders
  - Added Interface AccessPolicyDeleteOptionalParams
  - Added Interface AccessPolicyGetOptionalParams
  - Added Interface AccessPolicyListNextOptionalParams
  - Added Interface AccessPolicyListOptionalParams
  - Added Interface LinkedServerDeleteHeaders
  - Added Interface RedisCacheAccessPolicy
  - Added Interface RedisCacheAccessPolicyAssignment
  - Added Interface RedisCacheAccessPolicyAssignmentList
  - Added Interface RedisCacheAccessPolicyList
  - Added Interface RedisFlushCacheHeaders
  - Added Interface RedisFlushCacheOptionalParams
  - Added Type Alias AccessPolicyAssignmentCreateUpdateResponse
  - Added Type Alias AccessPolicyAssignmentGetResponse
  - Added Type Alias AccessPolicyAssignmentListNextResponse
  - Added Type Alias AccessPolicyAssignmentListResponse
  - Added Type Alias AccessPolicyAssignmentProvisioningState
  - Added Type Alias AccessPolicyCreateUpdateResponse
  - Added Type Alias AccessPolicyGetResponse
  - Added Type Alias AccessPolicyListNextResponse
  - Added Type Alias AccessPolicyListResponse
  - Added Type Alias AccessPolicyProvisioningState
  - Added Type Alias AccessPolicyType
  - Added Type Alias RedisFlushCacheResponse
  - Added Type Alias UpdateChannel
  - Interface RedisCommonProperties has a new optional parameter updateChannel
  - Interface RedisCommonPropertiesRedisConfiguration has a new optional parameter aadEnabled
  - Interface RedisCreateParameters has a new optional parameter updateChannel
  - Interface RedisResource has a new optional parameter updateChannel
  - Interface RedisUpdateParameters has a new optional parameter updateChannel
  - Added Enum KnownAccessPolicyAssignmentProvisioningState
  - Added Enum KnownAccessPolicyProvisioningState
  - Added Enum KnownAccessPolicyType
  - Added Enum KnownUpdateChannel
  - Enum KnownProvisioningState has a new value ConfiguringAAD

### Breaking Changes

  - Type of parameter error of interface OperationStatusResult is changed from ErrorDetailAutoGenerated to ErrorDetail
    
    
## 7.2.0 (2023-06-02)
    
### Features Added

  - Interface ExportRDBParameters has a new optional parameter storageSubscriptionId
  - Interface ImportRDBParameters has a new optional parameter storageSubscriptionId
  - Interface RedisCommonPropertiesRedisConfiguration has a new optional parameter storageSubscriptionId
    
## 7.1.1 (2023-01-31)

### Features Added

  - Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 7.1.0 (2022-10-21)
    
### Features Added

  - Interface RedisLinkedServerCreateParameters has a new optional parameter geoReplicatedPrimaryHostName
  - Interface RedisLinkedServerCreateParameters has a new optional parameter primaryHostName
  - Interface RedisLinkedServerCreateProperties has a new optional parameter geoReplicatedPrimaryHostName
  - Interface RedisLinkedServerCreateProperties has a new optional parameter primaryHostName
  - Interface RedisLinkedServerWithProperties has a new optional parameter geoReplicatedPrimaryHostName
  - Interface RedisLinkedServerWithProperties has a new optional parameter primaryHostName
    
    
## 7.0.0 (2022-09-05)
    
### Features Added

  - Added operation LinkedServer.beginDelete
  - Added operation LinkedServer.beginDeleteAndWait
  - Added operation Redis.beginUpdate
  - Added operation Redis.beginUpdateAndWait
  - Added Interface OperationStatus
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResource
  - Added Interface RedisCreateProperties
  - Added Interface RedisFirewallRule
  - Added Interface RedisFirewallRuleCreateParameters
  - Added Interface RedisLinkedServerProperties
  - Added Interface RedisLinkedServerWithProperties
  - Added Interface RedisPatchSchedule
  - Added Interface RedisProperties
  - Added Interface RedisResource
  - Added Interface RedisUpdateProperties
  - Added Interface TrackedResource
  - Interface ExportRDBParameters has a new optional parameter preferredDataArchiveAuthMethod
  - Interface ImportRDBParameters has a new optional parameter preferredDataArchiveAuthMethod
  - Interface LinkedServerDeleteOptionalParams has a new optional parameter resumeFrom
  - Interface LinkedServerDeleteOptionalParams has a new optional parameter updateIntervalInMs
  - Interface RedisCommonPropertiesRedisConfiguration has a new optional parameter aofBackupEnabled
  - Interface RedisCommonPropertiesRedisConfiguration has a new optional parameter authnotrequired
  - Interface RedisUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface RedisUpdateOptionalParams has a new optional parameter updateIntervalInMs

### Breaking Changes

  - Removed operation LinkedServer.delete
  - Removed operation Redis.update
  - Operation PatchSchedules.createOrUpdate has a new signature
    
    
## 6.1.0 (2022-03-07)
    
### Features Added

  - Added operation group AsyncOperationStatus
  - Added Interface AsyncOperationStatusGetOptionalParams
  - Added Interface ErrorDetailAutoGenerated
  - Added Interface ManagedServiceIdentity
  - Added Interface OperationStatusResult
  - Added Interface UserAssignedIdentity
  - Added Type Alias AsyncOperationStatusGetResponse
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias OperationStatus
  - Interface RedisCommonPropertiesRedisConfiguration has a new optional parameter preferredDataArchiveAuthMethod
  - Interface RedisCommonPropertiesRedisConfiguration has a new optional parameter preferredDataPersistenceAuthMethod
  - Interface RedisCommonPropertiesRedisConfiguration has a new optional parameter zonalConfiguration
  - Interface RedisCreateParameters has a new optional parameter identity
  - Interface RedisUpdateParameters has a new optional parameter identity
  - Class RedisManagementClient has a new parameter asyncOperationStatus
  - Type Alias RedisPatchSchedule has a new parameter location
  - Type Alias RedisResource has a new parameter identity
  - Added Enum KnownManagedServiceIdentityType
    
    
## 6.0.0 (2021-12-10)

The package of @azure/arm-rediscache is using our next generation design principles since version 6.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
