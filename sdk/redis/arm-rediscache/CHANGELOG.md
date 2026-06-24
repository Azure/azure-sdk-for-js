# Release History

## 9.0.0-beta.2 (2026-06-24)
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

