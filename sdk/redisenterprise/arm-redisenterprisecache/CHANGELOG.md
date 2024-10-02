# Release History

## 3.1.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 3.1.0-beta.1 (2024-05-13)
Compared with version 3.0.0
    
### Features Added

  - Added operation Databases.beginForceLinkToReplicationGroup
  - Added operation Databases.beginForceLinkToReplicationGroupAndWait
  - Added operation Databases.beginUpgradeDBRedisVersion
  - Added operation Databases.beginUpgradeDBRedisVersionAndWait
  - Added Interface DatabasesForceLinkToReplicationGroupHeaders
  - Added Interface DatabasesForceLinkToReplicationGroupOptionalParams
  - Added Interface DatabasesUpgradeDBRedisVersionHeaders
  - Added Interface DatabasesUpgradeDBRedisVersionOptionalParams
  - Added Interface ForceLinkParameters
  - Added Type Alias DatabasesForceLinkToReplicationGroupResponse
  - Added Type Alias DatabasesUpgradeDBRedisVersionResponse
  - Added Type Alias DeferUpgradeSetting
  - Interface Database has a new optional parameter deferUpgrade
  - Interface Database has a new optional parameter redisVersion
  - Interface DatabaseUpdate has a new optional parameter deferUpgrade
  - Interface DatabaseUpdate has a new optional parameter redisVersion
  - Added Enum KnownDeferUpgradeSetting
  - Enum KnownSkuName has a new value EnterpriseE5
    
    
## 3.0.0 (2024-01-31)
    
### Features Added

  - Added operation Databases.beginFlush
  - Added operation Databases.beginFlushAndWait
  - Added operation PrivateEndpointConnections.beginDelete
  - Added operation PrivateEndpointConnections.beginDeleteAndWait
  - Added Interface ClusterPropertiesEncryption
  - Added Interface ClusterPropertiesEncryptionCustomerManagedKeyEncryption
  - Added Interface ClusterPropertiesEncryptionCustomerManagedKeyEncryptionKeyIdentity
  - Added Interface DatabasesFlushHeaders
  - Added Interface DatabasesFlushOptionalParams
  - Added Interface FlushParameters
  - Added Interface ManagedServiceIdentity
  - Added Interface PrivateEndpointConnectionsDeleteHeaders
  - Added Interface UserAssignedIdentity
  - Added Type Alias CmkIdentityType
  - Added Type Alias ManagedServiceIdentityType
  - Interface Cluster has a new optional parameter encryption
  - Interface Cluster has a new optional parameter identity
  - Interface ClusterUpdate has a new optional parameter encryption
  - Interface ClusterUpdate has a new optional parameter identity
  - Interface PrivateEndpointConnectionsDeleteOptionalParams has a new optional parameter resumeFrom
  - Interface PrivateEndpointConnectionsDeleteOptionalParams has a new optional parameter updateIntervalInMs
  - Added Enum KnownCmkIdentityType
  - Added Enum KnownManagedServiceIdentityType
  - Enum KnownResourceState has a new value Scaling
  - Enum KnownResourceState has a new value ScalingFailed

### Breaking Changes

  - Removed operation PrivateEndpointConnections.delete
    
    
## 2.2.0 (2022-12-07)
    
### Features Added

  - Added Interface Cluster
  - Added Interface Database
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResource
  - Added Interface TrackedResource
    
    
## 2.1.0 (2022-04-11)
    
### Features Added

  - Added operation Databases.beginForceUnlink
  - Added operation Databases.beginForceUnlinkAndWait
  - Added Interface DatabasePropertiesGeoReplication
  - Added Interface DatabasesForceUnlinkOptionalParams
  - Added Interface ForceUnlinkParameters
  - Added Interface LinkedDatabase
  - Added Type Alias LinkState
  - Interface DatabaseUpdate has a new optional parameter geoReplication
  - Type Alias Database has a new parameter geoReplication
  - Added Enum KnownLinkState
    
    
## 2.0.0 (2022-01-20)

The package of @azure/arm-redisenterprisecache is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
