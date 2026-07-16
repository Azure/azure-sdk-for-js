# Release History

## 10.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 10.0.0-beta.1 (2026-06-09)
Compared with version 9.1.0

### Features Added
  - Added operation group CGProfileOperations
  - Added operation group CGProfilesOperations
  - Added operation group LocationOperations
  - Added operation group NGroupsOperations
  - Added operation group SandboxGroupsOperations
  - Added operation ContainerGroupsOperations.createOrUpdate
  - Added operation ContainerGroupsOperations.delete
  - Added operation ContainerGroupsOperations.restart
  - Added operation ContainerGroupsOperations.start
  - Added operation SubnetServiceAssociationLinkOperations.delete
  - Class ContainerInstanceManagementClient has a new constructor "constructor(credential: TokenCredential, options?: ContainerInstanceManagementClientOptionalParams);"
  - Added Interface ApiEntityReference
  - Added Interface ApplicationGateway
  - Added Interface ApplicationGatewayBackendAddressPool
  - Added Interface ArmResource
  - Added Interface CGProfileCreateOrUpdateOptionalParams
  - Added Interface CGProfileDeleteOptionalParams
  - Added Interface CGProfileGetByRevisionNumberOptionalParams
  - Added Interface CGProfileGetOptionalParams
  - Added Interface CGProfileListAllRevisionsOptionalParams
  - Added Interface CGProfilesListByResourceGroupOptionalParams
  - Added Interface CGProfilesListBySubscriptionOptionalParams
  - Added Interface CGProfileUpdateOptionalParams
  - Added Interface ConfigMap
  - Added Interface ContainerGroupProfile
  - Added Interface ContainerGroupProfilePatch
  - Added Interface ContainerGroupProfileProperties
  - Added Interface ContainerGroupProfileReferenceDefinition
  - Added Interface ContainerGroupProfileStub
  - Added Interface ContainerProperties
  - Added Interface DeploymentExtensionSpecProperties
  - Added Interface ElasticProfile
  - Added Interface ElasticProfileContainerGroupNamingPolicy
  - Added Interface ElasticProfileContainerGroupNamingPolicyGuidNamingPolicy
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface FileShare
  - Added Interface FileShareProperties
  - Added Interface IdentityAccessControl
  - Added Interface IdentityAcls
  - Added Interface InitContainerPropertiesDefinition
  - Added Interface LoadBalancer
  - Added Interface LoadBalancerBackendAddressPool
  - Added Interface ManagedServiceIdentity
  - Added Interface NetworkProfile
  - Added Interface NGroup
  - Added Interface NGroupCGPropertyContainer
  - Added Interface NGroupCGPropertyContainerProperties
  - Added Interface NGroupCGPropertyVolume
  - Added Interface NGroupContainerGroupProperties
  - Added Interface NGroupIdentity
  - Added Interface NGroupPatch
  - Added Interface NGroupProperties
  - Added Interface NGroupsCreateOrUpdateOptionalParams
  - Added Interface NGroupsDeleteOptionalParams
  - Added Interface NGroupsGetOptionalParams
  - Added Interface NGroupsListByResourceGroupOptionalParams
  - Added Interface NGroupsListOptionalParams
  - Added Interface NGroupsRestartOptionalParams
  - Added Interface NGroupsStartOptionalParams
  - Added Interface NGroupsStopOptionalParams
  - Added Interface NGroupsUpdateOptionalParams
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PlacementProfile
  - Added Interface ProxyResource
  - Added Interface RestorePollerOptions
  - Added Interface SandboxGroup
  - Added Interface SandboxGroupAccessToken
  - Added Interface SandboxGroupNetworkProfile
  - Added Interface SandboxGroupProperties
  - Added Interface SandboxGroupsConnectOptionalParams
  - Added Interface SandboxGroupsCreateOrUpdateOptionalParams
  - Added Interface SandboxGroupsDeleteOptionalParams
  - Added Interface SandboxGroupsGetOptionalParams
  - Added Interface SandboxGroupsListByResourceGroupOptionalParams
  - Added Interface SandboxGroupsListBySubscriptionOptionalParams
  - Added Interface SandboxGroupsUpdateOptionalParams
  - Added Interface SandboxGroupTagsUpdate
  - Added Interface SecretReference
  - Added Interface SimplePollerLike
  - Added Interface StandbyPoolProfileDefinition
  - Added Interface StorageProfile
  - Added Interface SubnetReference
  - Added Interface SystemData
  - Added Interface TrackedResource
  - Added Interface UpdateProfile
  - Added Interface UpdateProfileRollingUpdateProfile
  - Added Interface UserAssignedIdentity
  - Interface AzureFileVolume has a new optional parameter storageAccountKeyReference
  - Interface Container has a new optional parameter configMap
  - Interface ContainerGroup has a new optional parameter containerGroupProfile
  - Interface ContainerGroup has a new optional parameter identityAcls
  - Interface ContainerGroup has a new optional parameter isCreatedFromStandbyPool
  - Interface ContainerGroup has a new optional parameter secretReferences
  - Interface ContainerGroup has a new optional parameter standbyPoolProfile
  - Interface ContainerGroup has a new optional parameter systemData
  - Interface ContainerGroupProperties has a new optional parameter containerGroupProfile
  - Interface ContainerGroupProperties has a new optional parameter identityAcls
  - Interface ContainerGroupProperties has a new optional parameter isCreatedFromStandbyPool
  - Interface ContainerGroupProperties has a new optional parameter secretReferences
  - Interface ContainerGroupProperties has a new optional parameter standbyPoolProfile
  - Interface EnvironmentVariable has a new optional parameter secureValueReference
  - Interface ImageRegistryCredential has a new optional parameter passwordReference
  - Interface Volume has a new optional parameter secretReference
  - Added Type Alias AzureFileShareAccessTier
  - Added Type Alias AzureFileShareAccessType
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Type Alias IdentityAccessLevel
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias NGroupProvisioningState
  - Added Type Alias NGroupUpdateMode
  - Added Type Alias SandboxGroupProvisioningState
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownIdentityAccessLevel
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownNGroupProvisioningState
  - Added Enum KnownNGroupUpdateMode
  - Added Enum KnownSandboxGroupProvisioningState
  - Added Enum KnownVersions
  - Enum KnownContainerGroupSku has a new value NotSpecified

### Breaking Changes
  - Operation ContainerGroups.beginCreateOrUpdate has a new signature
  - Operation ContainerGroups.beginCreateOrUpdateAndWait has a new signature
  - Operation ContainerGroups.beginDeleteAndWait has a new signature
  - Operation ContainerGroups.get has a new signature
  - Operation ContainerGroups.update has a new signature
  - Removed Interface Location_2
  - Interface ContainerGroupProperties no longer has parameter identity
  - Parameter image of interface Container is now optional
  - Parameter resources of interface Container is now optional
  - Parameter osType of interface ContainerGroup is now optional
  - Parameter osType of interface ContainerGroupProperties is now optional

    
## 9.2.0-beta.1 (2024-10-18)
Compared with version 9.1.0
    
### Features Added

  - Added operation group ContainerGroupProfileOperations
  - Added operation group ContainerGroupProfiles
  - Added Interface ConfigMap
  - Added Interface ContainerGroupProfile
  - Added Interface ContainerGroupProfileGetByRevisionNumberOptionalParams
  - Added Interface ContainerGroupProfileListAllRevisionsNextOptionalParams
  - Added Interface ContainerGroupProfileListAllRevisionsOptionalParams
  - Added Interface ContainerGroupProfileListResult
  - Added Interface ContainerGroupProfilePatch
  - Added Interface ContainerGroupProfileProperties
  - Added Interface ContainerGroupProfileReferenceDefinition
  - Added Interface ContainerGroupProfilesCreateOrUpdateOptionalParams
  - Added Interface ContainerGroupProfilesDeleteOptionalParams
  - Added Interface ContainerGroupProfilesGetOptionalParams
  - Added Interface ContainerGroupProfilesListByResourceGroupNextOptionalParams
  - Added Interface ContainerGroupProfilesListByResourceGroupOptionalParams
  - Added Interface ContainerGroupProfilesListNextOptionalParams
  - Added Interface ContainerGroupProfilesListOptionalParams
  - Added Interface ContainerGroupProfilesPatchOptionalParams
  - Added Interface StandbyPoolProfileDefinition
  - Added Type Alias ContainerGroupProfileGetByRevisionNumberResponse
  - Added Type Alias ContainerGroupProfileListAllRevisionsNextResponse
  - Added Type Alias ContainerGroupProfileListAllRevisionsResponse
  - Added Type Alias ContainerGroupProfilesCreateOrUpdateResponse
  - Added Type Alias ContainerGroupProfilesGetResponse
  - Added Type Alias ContainerGroupProfilesListByResourceGroupNextResponse
  - Added Type Alias ContainerGroupProfilesListByResourceGroupResponse
  - Added Type Alias ContainerGroupProfilesListNextResponse
  - Added Type Alias ContainerGroupProfilesListResponse
  - Added Type Alias ContainerGroupProfilesPatchResponse
  - Interface Container has a new optional parameter configMap
  - Interface ContainerGroupProperties has a new optional parameter containerGroupProfile
  - Interface ContainerGroupProperties has a new optional parameter isCreatedFromStandbyPool
  - Interface ContainerGroupProperties has a new optional parameter standbyPoolProfile
    
    
## 9.1.0 (2023-04-24)
    
### Features Added

  - Added Interface ConfidentialComputeProperties
  - Added Interface DeploymentExtensionSpec
  - Added Interface SecurityContextCapabilitiesDefinition
  - Added Interface SecurityContextDefinition
  - Added Type Alias ContainerGroupPriority
  - Interface Container has a new optional parameter securityContext
  - Interface ContainerGroupProperties has a new optional parameter confidentialComputeProperties
  - Interface ContainerGroupProperties has a new optional parameter extensions
  - Interface ContainerGroupProperties has a new optional parameter priority
  - Interface EncryptionProperties has a new optional parameter identity
  - Interface InitContainerDefinition has a new optional parameter securityContext
  - Added Enum KnownContainerGroupPriority
  - Enum KnownContainerGroupSku has a new value Confidential
  - Added function getContinuationToken
    
    
## 9.0.0 (2022-08-30)
    
### Features Added

  - Added operation group SubnetServiceAssociationLink
  - Added Interface ContainerGroupProperties
  - Added Interface SubnetServiceAssociationLinkDeleteOptionalParams
  - Added Interface UserAssignedIdentities
  - Added Type Alias DnsNameLabelReusePolicy
  - Interface IpAddress has a new optional parameter autoGeneratedDomainNameLabelScope
  - Interface Usage has a new optional parameter id
  - Class ContainerInstanceManagementClient has a new parameter subnetServiceAssociationLink
  - Added Enum KnownDnsNameLabelReusePolicy

### Breaking Changes

  - Interface ContainerGroup no longer has parameter containers
  - Interface ContainerGroup no longer has parameter diagnostics
  - Interface ContainerGroup no longer has parameter dnsConfig
  - Interface ContainerGroup no longer has parameter encryptionProperties
  - Interface ContainerGroup no longer has parameter identity
  - Interface ContainerGroup no longer has parameter imageRegistryCredentials
  - Interface ContainerGroup no longer has parameter initContainers
  - Interface ContainerGroup no longer has parameter instanceView
  - Interface ContainerGroup no longer has parameter ipAddress
  - Interface ContainerGroup no longer has parameter osType
  - Interface ContainerGroup no longer has parameter provisioningState
  - Interface ContainerGroup no longer has parameter restartPolicy
  - Interface ContainerGroup no longer has parameter sku
  - Interface ContainerGroup no longer has parameter subnetIds
  - Interface ContainerGroup no longer has parameter volumes
  - Interface IpAddress no longer has parameter dnsNameLabelReusePolicy
  - Removed Enum KnownAutoGeneratedDomainNameLabelScope
    
    
## 8.2.0 (2022-07-11)
    
### Features Added

  - Added Interface ContainerGroup
    
    
## 8.1.0 (2022-04-06)
    
### Features Added

  - Added Type Alias AutoGeneratedDomainNameLabelScope
  - Interface IpAddress has a new optional parameter dnsNameLabelReusePolicy
  - Added Enum KnownAutoGeneratedDomainNameLabelScope
    
    
## 8.0.0 (2022-01-04)

The package of @azure/arm-containerinstance is using our next generation design principles since version 8.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
