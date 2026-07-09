# Release History

## 1.0.0-beta.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.2 (2026-05-27)
Compared with version 1.0.0-beta.1

### Features Added
  - Added operation group PlatformWorkloadIdentityRoleSetOperations
  - Added operation group PlatformWorkloadIdentityRoleSetsOperations
  - Added operation OpenShiftClustersOperations.createOrUpdate
  - Added operation OpenShiftClustersOperations.delete
  - Added operation OpenShiftClustersOperations.update
  - Added operation OpenShiftVersionsOperations.get
  - Added Interface ManagedServiceIdentity
  - Added Interface OpenShiftClusterProperties
  - Added Interface OpenShiftVersionProperties
  - Added Interface OpenShiftVersionsGetOptionalParams
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PlatformWorkloadIdentity
  - Added Interface PlatformWorkloadIdentityProfile
  - Added Interface PlatformWorkloadIdentityRole
  - Added Interface PlatformWorkloadIdentityRoleSet
  - Added Interface PlatformWorkloadIdentityRoleSetGetOptionalParams
  - Added Interface PlatformWorkloadIdentityRoleSetProperties
  - Added Interface PlatformWorkloadIdentityRoleSetsListOptionalParams
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface UserAssignedIdentity
  - Interface ClusterProfile has a new optional parameter oidcIssuer
  - Interface OpenShiftCluster has a new optional parameter identity
  - Interface OpenShiftCluster has a new optional parameter platformWorkloadIdentityProfile
  - Interface OpenShiftClusterUpdate has a new optional parameter identity
  - Interface OpenShiftClusterUpdate has a new optional parameter platformWorkloadIdentityProfile
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ManagedServiceIdentityType
  - Added Enum AzureClouds
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownVersions

### Breaking Changes
  - Removed Interface MachinePool
  - Removed Interface MachinePoolList
  - Removed Interface MachinePools
  - Removed Interface MachinePoolsCreateOrUpdateOptionalParams
  - Removed Interface MachinePoolsDeleteOptionalParams
  - Removed Interface MachinePoolsGetOptionalParams
  - Removed Interface MachinePoolsListOptionalParams
  - Removed Interface MachinePoolsUpdateOptionalParams
  - Removed Interface MachinePoolUpdate
  - Removed Interface OpenShiftClusterList
  - Removed Interface OpenShiftVersionList
  - Removed Interface OperationList
  - Removed Interface Secret
  - Removed Interface SecretList
  - Removed Interface Secrets
  - Removed Interface SecretsCreateOrUpdateOptionalParams
  - Removed Interface SecretsDeleteOptionalParams
  - Removed Interface SecretsGetOptionalParams
  - Removed Interface SecretsListOptionalParams
  - Removed Interface SecretsUpdateOptionalParams
  - Removed Interface SecretUpdate
  - Removed Interface SyncIdentityProvider
  - Removed Interface SyncIdentityProviderList
  - Removed Interface SyncIdentityProviders
  - Removed Interface SyncIdentityProvidersCreateOrUpdateOptionalParams
  - Removed Interface SyncIdentityProvidersDeleteOptionalParams
  - Removed Interface SyncIdentityProvidersGetOptionalParams
  - Removed Interface SyncIdentityProvidersListOptionalParams
  - Removed Interface SyncIdentityProvidersUpdateOptionalParams
  - Removed Interface SyncIdentityProviderUpdate
  - Removed Interface SyncSet
  - Removed Interface SyncSetList
  - Removed Interface SyncSets
  - Removed Interface SyncSetsCreateOrUpdateOptionalParams
  - Removed Interface SyncSetsDeleteOptionalParams
  - Removed Interface SyncSetsGetOptionalParams
  - Removed Interface SyncSetsListOptionalParams
  - Removed Interface SyncSetsUpdateOptionalParams
  - Removed Interface SyncSetUpdate
  - Interface OpenShiftClusterUpdate no longer has parameter systemData

    
## 1.0.0-beta.1 (2024-07-26)

### Features Added

The package of @azure/arm-redhatopenshift is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
