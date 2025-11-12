# Release History

## 4.0.0 (2025-11-12)

### Features Added
  - Added Interface MhsmServiceTagRule
  - Added Interface Permissions
  - Added Interface ProxyResource
  - Added Interface TrackedResource
  - Added Interface VaultsCreateOrUpdateHeaders
  - Added Interface VaultsPurgeDeletedHeaders
  - Interface DeletedManagedHsm has a new optional parameter systemData
  - Interface DeletedVault has a new optional parameter systemData
  - Interface Key has a new optional parameter systemData
  - Interface ManagedHsmKey has a new optional parameter systemData
  - Interface ManagedHsmsCreateOrUpdateHeaders has a new optional parameter retryAfter
  - Interface ManagedHsmsDeleteHeaders has a new optional parameter retryAfter
  - Interface ManagedHsmsPurgeDeletedHeaders has a new optional parameter retryAfter
  - Interface ManagedHsmsUpdateHeaders has a new optional parameter retryAfter
  - Interface MhsmNetworkRuleSet has a new optional parameter serviceTags
  - Interface MhsmPrivateEndpointConnectionsDeleteHeaders has a new optional parameter retryAfter
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface PrivateLinkResource has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface Secret has a new optional parameter systemData
  - Added Type Alias CreatedByType
  - Added Enum KnownCreatedByType
  - Added Enum KnownReason

### Breaking Changes
  - Operation ManagedHsms.checkMhsmNameAvailability has a new signature
  - Operation Vaults.checkNameAvailability has a new signature
  - Removed Interface ProxyResourceWithoutSystemData
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Removed Type Alias IdentityType
  - Type alias "Reason" has been changed
  - Removed Enum KnownIdentityType

    
## 3.2.0 (2025-03-12)
    
### Features Added

  - Enum KnownManagedHsmSkuFamily has a new value C
    
    
## 3.1.0 (2023-10-18)
    
### Features Added

  - Added Interface ManagedServiceIdentity
  - Added Interface UserAssignedIdentity
  - Added Type Alias ManagedServiceIdentityType
  - Interface ManagedHsmResource has a new optional parameter identity
  - Added Enum KnownManagedServiceIdentityType
    
    
## 3.0.0 (2023-04-10)
    
### Features Added

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

### Breaking Changes

  - Interface MhsmPrivateEndpointConnectionsDeleteHeaders no longer has parameter retryAfter
    
    
## 2.0.0 (2022-01-17)

The package of @azure/arm-keyvault is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
