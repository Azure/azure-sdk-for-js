# Release History

## 3.1.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 3.1.0 (2023-10-18)
    
**Features**

  - Added Interface ManagedServiceIdentity
  - Added Interface UserAssignedIdentity
  - Added Type Alias ManagedServiceIdentityType
  - Interface ManagedHsmResource has a new optional parameter identity
  - Added Enum KnownManagedServiceIdentityType
    
    
## 3.0.0 (2023-04-10)
    
**Features**

  - Added operation group ManagedHsmKeys
  - Added operation group MhsmRegions
  - Added operation ManagedHsms.checkMhsmNameAvailability
  - Added Interface Action
  - Added Interface CheckMhsmNameAvailabilityParameters
  - Added Interface CheckMhsmNameAvailabilityResult
  - Added Interface Key
  - Added Interface KeyReleasePolicy
  - Added Interface KeyRotationPolicyAttributes
  - Added Interface LifetimeAction
  - Added Interface ManagedHsm
  - Added Interface ManagedHsmAction
  - Added Interface ManagedHsmKey
  - Added Interface ManagedHsmKeyAttributes
  - Added Interface ManagedHsmKeyCreateParameters
  - Added Interface ManagedHsmKeyListResult
  - Added Interface ManagedHsmKeyProperties
  - Added Interface ManagedHsmKeyReleasePolicy
  - Added Interface ManagedHsmKeyRotationPolicyAttributes
  - Added Interface ManagedHsmKeysCreateIfNotExistOptionalParams
  - Added Interface ManagedHsmKeysGetOptionalParams
  - Added Interface ManagedHsmKeysGetVersionOptionalParams
  - Added Interface ManagedHsmKeysListNextOptionalParams
  - Added Interface ManagedHsmKeysListOptionalParams
  - Added Interface ManagedHsmKeysListVersionsNextOptionalParams
  - Added Interface ManagedHsmKeysListVersionsOptionalParams
  - Added Interface ManagedHsmLifetimeAction
  - Added Interface ManagedHsmRotationPolicy
  - Added Interface ManagedHsmsCheckMhsmNameAvailabilityOptionalParams
  - Added Interface ManagedHsmsCreateOrUpdateHeaders
  - Added Interface ManagedHsmsDeleteHeaders
  - Added Interface ManagedHSMSecurityDomainProperties
  - Added Interface ManagedHsmsPurgeDeletedHeaders
  - Added Interface ManagedHsmsUpdateHeaders
  - Added Interface ManagedHsmTrigger
  - Added Interface MhsmGeoReplicatedRegion
  - Added Interface MhsmPrivateEndpointConnection
  - Added Interface MhsmPrivateLinkResource
  - Added Interface MhsmRegionsListByResourceNextOptionalParams
  - Added Interface MhsmRegionsListByResourceOptionalParams
  - Added Interface MhsmRegionsListResult
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResourceWithoutSystemData
  - Added Interface RotationPolicy
  - Added Interface Secret
  - Added Interface SecretAttributes
  - Added Interface Trigger
  - Added Type Alias ActivationStatus
  - Added Type Alias GeoReplicationRegionProvisioningState
  - Added Type Alias KeyRotationPolicyActionType
  - Added Type Alias ManagedHsmKeysCreateIfNotExistResponse
  - Added Type Alias ManagedHsmKeysGetResponse
  - Added Type Alias ManagedHsmKeysGetVersionResponse
  - Added Type Alias ManagedHsmKeysListNextResponse
  - Added Type Alias ManagedHsmKeysListResponse
  - Added Type Alias ManagedHsmKeysListVersionsNextResponse
  - Added Type Alias ManagedHsmKeysListVersionsResponse
  - Added Type Alias ManagedHsmsCheckMhsmNameAvailabilityResponse
  - Added Type Alias ManagedHsmsPurgeDeletedResponse
  - Added Type Alias MhsmRegionsListByResourceNextResponse
  - Added Type Alias MhsmRegionsListByResourceResponse
  - Interface KeyProperties has a new optional parameter releasePolicy
  - Interface KeyProperties has a new optional parameter rotationPolicy
  - Interface ManagedHsmProperties has a new optional parameter regions
  - Interface ManagedHsmProperties has a new optional parameter securityDomainProperties
  - Interface MhsmPrivateEndpointConnectionItem has a new optional parameter etag
  - Interface MhsmPrivateEndpointConnectionItem has a new optional parameter id
  - Added Enum KnownActivationStatus
  - Added Enum KnownGeoReplicationRegionProvisioningState
  - Enum KnownJsonWebKeyOperation has a new value Release
  - Enum KnownKeyPermissions has a new value Getrotationpolicy
  - Enum KnownKeyPermissions has a new value Release
  - Enum KnownKeyPermissions has a new value Rotate
  - Enum KnownKeyPermissions has a new value Setrotationpolicy
  - Added function getContinuationToken
  - Interface SecretsListNextOptionalParams no longer has parameter top
  - Interface VaultsListByResourceGroupNextOptionalParams no longer has parameter top
  - Interface VaultsListBySubscriptionNextOptionalParams no longer has parameter top
  - Interface VaultsListNextOptionalParams no longer has parameter top
  - Interface ManagedHsmsListByResourceGroupNextOptionalParams no longer has parameter top
  - Interface ManagedHsmsListBySubscriptionNextOptionalParams no longer has parameter top

**Breaking Changes**

  - Interface MhsmPrivateEndpointConnectionsDeleteHeaders no longer has parameter retryAfter
    
    
## 2.0.0 (2022-01-17)

The package of @azure/arm-keyvault is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
