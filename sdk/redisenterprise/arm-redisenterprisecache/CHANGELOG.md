# Release History

## 2.3.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.3.0-beta.1 (2023-03-27)
    
**Features**

  - Added operation group Skus
  - Added operation Databases.beginFlush
  - Added operation Databases.beginFlushAndWait
  - Added Interface Capability
  - Added Interface ClusterPropertiesEncryption
  - Added Interface ClusterPropertiesEncryptionCustomerManagedKeyEncryption
  - Added Interface ClusterPropertiesEncryptionCustomerManagedKeyEncryptionKeyIdentity
  - Added Interface DatabasesFlushHeaders
  - Added Interface DatabasesFlushOptionalParams
  - Added Interface FlushParameters
  - Added Interface LocationInfo
  - Added Interface ManagedServiceIdentity
  - Added Interface RegionSkuDetail
  - Added Interface RegionSkuDetails
  - Added Interface SkuDetail
  - Added Interface SkusListOptionalParams
  - Added Interface SystemData
  - Added Interface UserAssignedIdentity
  - Added Type Alias CmkIdentityType
  - Added Type Alias CreatedByType
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias SkusListResponse
  - Interface Cluster has a new optional parameter encryption
  - Interface Cluster has a new optional parameter identity
  - Interface ClusterUpdate has a new optional parameter encryption
  - Interface ClusterUpdate has a new optional parameter identity
  - Interface Resource has a new optional parameter systemData
  - Added Enum KnownCmkIdentityType
  - Added Enum KnownCreatedByType
  - Added Enum KnownManagedServiceIdentityType
    
    
## 2.2.0 (2022-12-07)
    
**Features**

  - Added Interface Cluster
  - Added Interface Database
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResource
  - Added Interface TrackedResource
    
    
## 2.1.0 (2022-04-11)
    
**Features**

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
