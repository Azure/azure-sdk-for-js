# Release History

## 9.0.0 (2025-09-12)

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
  - Added Interface RedisCacheAccessPolicyProperties
  - Added Interface RestorePollerOptions
  - Added Interface ScheduleEntries
  - Added Interface SystemData
  - Interface PrivateEndpointConnection has a new optional parameter properties
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface PrivateLinkResource has a new optional parameter systemData
  - Interface ProxyResource has a new optional parameter systemData
  - Interface RedisCacheAccessPolicy has a new optional parameter properties
  - Interface RedisCacheAccessPolicy has a new optional parameter systemData
  - Interface RedisCacheAccessPolicyAssignment has a new optional parameter systemData
  - Interface RedisCommonPropertiesRedisConfiguration has a new optional parameter additionalProperties
  - Interface RedisFirewallRule has a new optional parameter systemData
  - Interface RedisLinkedServerWithProperties has a new optional parameter properties
  - Interface RedisLinkedServerWithProperties has a new optional parameter systemData
  - Interface RedisPatchSchedule has a new optional parameter systemData
  - Interface RedisResource has a new optional parameter systemData
  - Interface RedisUpdateParameters has a new optional parameter properties
  - Interface Resource has a new optional parameter systemData
  - Interface TrackedResource has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation AccessPolicy.beginCreateUpdate
  - Removed operation AccessPolicy.beginCreateUpdateAndWait
  - Removed operation AccessPolicy.beginDelete
  - Removed operation AccessPolicy.beginDeleteAndWait
  - Removed operation AccessPolicyAssignment.beginCreateUpdate
  - Removed operation AccessPolicyAssignment.beginCreateUpdateAndWait
  - Removed operation AccessPolicyAssignment.beginDelete
  - Removed operation AccessPolicyAssignment.beginDeleteAndWait
  - Removed operation LinkedServer.beginCreate
  - Removed operation LinkedServer.beginCreateAndWait
  - Removed operation LinkedServer.beginDelete
  - Removed operation LinkedServer.beginDeleteAndWait
  - Removed operation PrivateEndpointConnections.beginPut
  - Removed operation PrivateEndpointConnections.beginPutAndWait
  - Removed operation Redis.beginCreate
  - Removed operation Redis.beginCreateAndWait
  - Removed operation Redis.beginDelete
  - Removed operation Redis.beginDeleteAndWait
  - Removed operation Redis.beginExportData
  - Removed operation Redis.beginExportDataAndWait
  - Removed operation Redis.beginFlushCache
  - Removed operation Redis.beginFlushCacheAndWait
  - Removed operation Redis.beginImportData
  - Removed operation Redis.beginImportDataAndWait
  - Removed operation Redis.beginUpdate
  - Removed operation Redis.beginUpdateAndWait
  - Operation FirewallRules.createOrUpdate has a new signature
  - Operation FirewallRules.get has a new signature
  - Operation PatchSchedules.createOrUpdate has a new signature
  - Operation PatchSchedules.get has a new signature
  - Operation Redis.get has a new signature
  - Removed Interface NotificationListResponse
  - Removed Interface RedisCacheAccessPolicyAssignmentList
  - Removed Interface RedisCacheAccessPolicyList
  - Removed Interface RedisFirewallRuleCreateParameters
  - Removed Interface RedisLinkedServerWithPropertiesList
  - Interface RedisCreateParameters has a new required parameter properties
  - Interface RedisLinkedServerCreateParameters has a new required parameter properties
  - Interface RedisPatchSchedule has a new required parameter properties
  - Interface RedisResource has a new required parameter properties
  - Interface PrivateEndpointConnection no longer has parameter privateEndpoint
  - Interface PrivateEndpointConnection no longer has parameter privateLinkServiceConnectionState
  - Interface PrivateEndpointConnection no longer has parameter provisioningState
  - Interface RedisCacheAccessPolicy no longer has parameter permissions
  - Interface RedisCacheAccessPolicy no longer has parameter provisioningState
  - Interface RedisCacheAccessPolicy no longer has parameter typePropertiesType
  - Interface RedisCreateParameters no longer has parameter disableAccessKeyAuthentication
  - Interface RedisCreateParameters no longer has parameter enableNonSslPort
  - Interface RedisCreateParameters no longer has parameter minimumTlsVersion
  - Interface RedisCreateParameters no longer has parameter publicNetworkAccess
  - Interface RedisCreateParameters no longer has parameter redisConfiguration
  - Interface RedisCreateParameters no longer has parameter redisVersion
  - Interface RedisCreateParameters no longer has parameter replicasPerMaster
  - Interface RedisCreateParameters no longer has parameter replicasPerPrimary
  - Interface RedisCreateParameters no longer has parameter shardCount
  - Interface RedisCreateParameters no longer has parameter sku
  - Interface RedisCreateParameters no longer has parameter staticIP
  - Interface RedisCreateParameters no longer has parameter subnetId
  - Interface RedisCreateParameters no longer has parameter tenantSettings
  - Interface RedisCreateParameters no longer has parameter updateChannel
  - Interface RedisCreateParameters no longer has parameter zonalAllocationPolicy
  - Interface RedisLinkedServerCreateParameters no longer has parameter geoReplicatedPrimaryHostName
  - Interface RedisLinkedServerCreateParameters no longer has parameter linkedRedisCacheId
  - Interface RedisLinkedServerCreateParameters no longer has parameter linkedRedisCacheLocation
  - Interface RedisLinkedServerCreateParameters no longer has parameter primaryHostName
  - Interface RedisLinkedServerCreateParameters no longer has parameter serverRole
  - Interface RedisLinkedServerWithProperties no longer has parameter geoReplicatedPrimaryHostName
  - Interface RedisLinkedServerWithProperties no longer has parameter linkedRedisCacheId
  - Interface RedisLinkedServerWithProperties no longer has parameter linkedRedisCacheLocation
  - Interface RedisLinkedServerWithProperties no longer has parameter primaryHostName
  - Interface RedisLinkedServerWithProperties no longer has parameter provisioningState
  - Interface RedisLinkedServerWithProperties no longer has parameter serverRole
  - Interface RedisPatchSchedule no longer has parameter scheduleEntries
  - Interface RedisResource no longer has parameter accessKeys
  - Interface RedisResource no longer has parameter disableAccessKeyAuthentication
  - Interface RedisResource no longer has parameter enableNonSslPort
  - Interface RedisResource no longer has parameter hostName
  - Interface RedisResource no longer has parameter instances
  - Interface RedisResource no longer has parameter linkedServers
  - Interface RedisResource no longer has parameter minimumTlsVersion
  - Interface RedisResource no longer has parameter port
  - Interface RedisResource no longer has parameter privateEndpointConnections
  - Interface RedisResource no longer has parameter provisioningState
  - Interface RedisResource no longer has parameter publicNetworkAccess
  - Interface RedisResource no longer has parameter redisConfiguration
  - Interface RedisResource no longer has parameter redisVersion
  - Interface RedisResource no longer has parameter replicasPerMaster
  - Interface RedisResource no longer has parameter replicasPerPrimary
  - Interface RedisResource no longer has parameter shardCount
  - Interface RedisResource no longer has parameter sku
  - Interface RedisResource no longer has parameter sslPort
  - Interface RedisResource no longer has parameter staticIP
  - Interface RedisResource no longer has parameter subnetId
  - Interface RedisResource no longer has parameter tenantSettings
  - Interface RedisResource no longer has parameter updateChannel
  - Interface RedisResource no longer has parameter zonalAllocationPolicy
  - Interface RedisUpdateParameters no longer has parameter disableAccessKeyAuthentication
  - Interface RedisUpdateParameters no longer has parameter enableNonSslPort
  - Interface RedisUpdateParameters no longer has parameter minimumTlsVersion
  - Interface RedisUpdateParameters no longer has parameter publicNetworkAccess
  - Interface RedisUpdateParameters no longer has parameter redisConfiguration
  - Interface RedisUpdateParameters no longer has parameter redisVersion
  - Interface RedisUpdateParameters no longer has parameter replicasPerMaster
  - Interface RedisUpdateParameters no longer has parameter replicasPerPrimary
  - Interface RedisUpdateParameters no longer has parameter shardCount
  - Interface RedisUpdateParameters no longer has parameter sku
  - Interface RedisUpdateParameters no longer has parameter tenantSettings
  - Interface RedisUpdateParameters no longer has parameter updateChannel
  - Interface RedisUpdateParameters no longer has parameter zonalAllocationPolicy

    
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
