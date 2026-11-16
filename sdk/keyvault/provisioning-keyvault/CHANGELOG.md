# Release History

## 1.0.0-beta.2 (2026-10-29)
Compared with version 1.0.0-beta.1

### Features Added
  - Class AccessPolicy has a new constructor "constructor(context: KeyVault, props: (AccessPolicyProps & {
        existing?: false;
    }) | (ExistingResourceProps<AccessPolicyUpdateKind> & {
        existing: true;
    }), options?: ResourceOptions);"
  - Class ManagedHsmKey has a new constructor "constructor(context: ManagedHsm, props: (ManagedHsmKeyProps & {
        existing?: false;
    }) | (ExistingResourceProps & {
        existing: true;
    }), options?: ResourceOptions);"
  - Class ManagedHsmPrivateEndpointConnection has a new constructor "constructor(context: ManagedHsm, props?: (ManagedHsmPrivateEndpointConnectionProps & {
        existing?: false;
    }) | (ExistingResourceProps & {
        existing: true;
    }), options?: ResourceOptions);"
  - Class Secret has a new constructor "constructor(context: KeyVault, props: (SecretProps & {
        existing?: false;
    }) | (ExistingResourceProps & {
        existing: true;
    }), options?: ResourceOptions);"
  - Class VaultKey has a new constructor "constructor(context: KeyVault, props: (VaultKeyProps & {
        existing?: false;
    }) | (ExistingResourceProps & {
        existing: true;
    }), options?: ResourceOptions);"
  - Class VaultPrivateEndpointConnection has a new constructor "constructor(context: KeyVault, props?: (VaultPrivateEndpointConnectionProps & {
        existing?: false;
    }) | (ExistingResourceProps & {
        existing: true;
    }), options?: ResourceOptions);"
  - Added Interface MhsmGeoReplicatedRegionView
  - Added Interface MhsmPrivateEndpointConnectionPropertiesView
  - Added Interface MhsmPrivateEndpointView
  - Added Interface PrivateEndpointConnectionPropertiesView
  - Added Interface PrivateEndpointView
  - Interface ManagedHsmProperties has a new optional parameter provisioningState
  - Interface ManagedHsmPropertiesView has a new optional parameter provisioningState
  - Interface MhsmGeoReplicatedRegion has a new optional parameter provisioningState
  - Interface MhsmPrivateEndpoint has a new optional parameter id
  - Interface MhsmPrivateEndpointConnectionItem has a new optional parameter etag
  - Interface MhsmPrivateEndpointConnectionItem has a new optional parameter id
  - Interface MhsmPrivateEndpointConnectionItemView has a new optional parameter etag
  - Interface MhsmPrivateEndpointConnectionItemView has a new optional parameter id
  - Interface MhsmPrivateEndpointConnectionProperties has a new optional parameter provisioningState
  - Interface PrivateEndpoint has a new optional parameter id
  - Interface PrivateEndpointConnectionItem has a new optional parameter etag
  - Interface PrivateEndpointConnectionItem has a new optional parameter id
  - Interface PrivateEndpointConnectionItemView has a new optional parameter etag
  - Interface PrivateEndpointConnectionItemView has a new optional parameter id
  - Interface PrivateEndpointConnectionProperties has a new optional parameter provisioningState
  - Interface VaultProperties has a new optional parameter provisioningState
  - Interface VaultPropertiesInput has a new optional parameter provisioningState
  - Interface VaultPropertiesView has a new optional parameter provisioningState
  - Added Type Alias AccessPolicyUpdateKind
  - Added Type Alias GeoReplicationRegionProvisioningState
  - Added Type Alias PrivateEndpointConnectionProvisioningState
  - Added Type Alias ProvisioningState
  - Added Type Alias VaultProvisioningState

### Breaking Changes
  - Class AccessPolicy has a new signature
  - Class ManagedHsmKey has a new signature
  - Class ManagedHsmPrivateEndpointConnection has a new signature
  - Class Secret has a new signature
  - Class VaultKey has a new signature
  - Class VaultPrivateEndpointConnection has a new signature
  - Type of property name of class AccessPolicy has changed
  - Parameter name of interface AccessPolicyProps is now required
  - Removed Type Alias MhsmGeoReplicatedRegionView
  - Removed Type Alias MhsmPrivateEndpointConnectionPropertiesView
  - Removed Type Alias MhsmPrivateEndpointView
  - Removed Type Alias PrivateEndpointConnectionPropertiesView
  - Removed Type Alias PrivateEndpointView

## 1.0.0-beta.1 (2026-09-28)

### Features Added

- Initial preview of Azure Key Vault provisioning resources generated from the `2026-02-01` TypeSpec contract. [#39825](https://github.com/Azure/azure-sdk-for-js/pull/39825)
