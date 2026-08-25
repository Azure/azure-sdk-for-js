# Release History

## 2.0.0 (2026-08-25)

### Features Added
  - Added operation group ManifestsOperations
  - Added Interface ActionConfiguration
  - Added Interface AppliedManifestInfo
  - Added Interface GroupConnectivityInformation
  - Added Interface LocalizedOperationDisplayDefinitionQpsPloc
  - Added Interface ManagedResourceGroupDenyAssignmentConfiguration
  - Added Interface ManifestCheckinSpecification
  - Added Interface ManifestInfo
  - Added Interface ManifestInfoProperties
  - Added Interface ManifestsCreateOrUpdateOptionalParams
  - Added Interface ManifestsGetOptionalParams
  - Added Interface PrivateEndpointConfiguration
  - Added Interface ResourceDeletionPolicyAndProperties
  - Added Interface ResourceDeletionPolicyProperties
  - Added Interface ResourceTypeManagedResourceGroupConfiguration
  - Added Interface WriteLockConfiguration
  - Interface ApplicationDataAuthorization has a new optional parameter excludeApplicationIdFromManifest
  - Interface CustomRolloutPropertiesSpecification has a new optional parameter manifestCheckinSpecification
  - Interface CustomRolloutPropertiesSpecification has a new optional parameter rolloutId
  - Interface CustomRolloutPropertiesStatus has a new optional parameter completedRegionsInfo
  - Interface CustomRolloutSpecification has a new optional parameter manifestCheckinSpecification
  - Interface CustomRolloutSpecification has a new optional parameter rolloutId
  - Interface CustomRolloutStatus has a new optional parameter completedRegionsInfo
  - Interface DefaultRolloutPropertiesSpecification has a new optional parameter manifestCheckinSpecification
  - Interface DefaultRolloutSpecification has a new optional parameter manifestCheckinSpecification
  - Interface LinkedAccessCheck has a new optional parameter options
  - Interface LocalizedOperationDefinition has a new optional parameter properties
  - Interface LocalizedOperationDefinitionDisplay has a new optional parameter qpsPloc
  - Interface LocalizedOperationDisplayDefinition has a new optional parameter qpsPloc
  - Interface ProviderRegistrationProperties has a new optional parameter enablePresetResourceTypes
  - Interface ProviderRegistrationProperties has a new optional parameter oboSubscriptionId
  - Interface ResourceProviderManagement has a new optional parameter featureManagementOwners
  - Interface ResourceProviderManifest has a new optional parameter tokenAuthConfiguration
  - Interface ResourceProviderManifestManagement has a new optional parameter featureManagementOwners
  - Interface ResourceProviderManifestPropertiesManagement has a new optional parameter featureManagementOwners
  - Interface ResourceType has a new optional parameter resourceDeletionPolicies
  - Interface ResourceTypeRegistrationProperties has a new optional parameter managedResourceGroupConfiguration
  - Interface ResourceTypeRegistrationProperties has a new optional parameter privateEndpointConfiguration
  - Interface ResourceTypeRegistrationProperties has a new optional parameter resourceDeletionPolicies
  - Interface ResourceTypeRegistrationProperties has a new optional parameter superScaleEnabled
  - Interface ResourceTypeRegistrationProperties has a new optional parameter writeLock
  - Interface ResourceTypeRegistrationPropertiesManagement has a new optional parameter featureManagementOwners
  - Interface ResourceTypeRegistrationPropertiesResourceManagementOptionsBatchProvisioningSupport has a new optional parameter actionConfigurations
  - Interface ResourceTypeRegistrationPropertiesResourceManagementOptionsBatchProvisioningSupport has a new optional parameter batchContractVersion
  - Interface ResourceTypeRegistrationPropertiesResourceManagementOptionsBatchProvisioningSupport has a new optional parameter maxBatchSize
  - Interface ResourceTypeRegistrationPropertiesResourceManagementOptionsBatchProvisioningSupport has a new optional parameter maxNestedBatchSize
  - Interface ResourceTypeRegistrationPropertiesResourceManagementOptionsBatchProvisioningSupport has a new optional parameter requiredFeatures
  - Interface ThrottlingMetric has a new optional parameter bucketSize
  - Added Type Alias LinkedAccessCheckOptions
  - Added Type Alias ManifestCheckinOption
  - Added Type Alias RPaaSResourceDeletionPolicy
  - Added Type Alias WriteLockState
  - Added Enum KnownLinkedAccessCheckOptions
  - Added Enum KnownManifestCheckinOption
  - Added Enum KnownRPaaSResourceDeletionPolicy
  - Added Enum KnownWriteLockState
  - Enum KnownExtensionCategory has a new value ResourceBillingNotification
  - Enum KnownResourceDeletionPolicy has a new value Cascade
  - Enum KnownResourceDeletionPolicy has a new value Force
  - Enum KnownResourceDeletionPolicy has a new value SoftDelete
  - Enum KnownResourceProviderType has a new value Decommissioned
  - Enum KnownVersions has a new value V20251001

### Breaking Changes
  - Operation CustomRolloutsOperations.createOrUpdate has a new signature
  - Operation CustomRolloutsOperations.get has a new signature
  - Operation CustomRolloutsOperations.listByProviderRegistration has a new signature
  - Operation DefaultRolloutsOperations.createOrUpdate has a new signature
  - Operation DefaultRolloutsOperations.get has a new signature
  - Operation DefaultRolloutsOperations.listByProviderRegistration has a new signature
  - Operation NewRegionFrontloadReleaseOperations.createOrUpdate has a new signature
  - Operation NewRegionFrontloadReleaseOperations.generateManifest has a new signature
  - Operation NewRegionFrontloadReleaseOperations.get has a new signature
  - Operation OperationsOperations.listByProviderRegistration has a new signature
  - Operation ResourceTypeRegistrationsOperations.createOrUpdate has a new signature
  - Operation ResourceTypeRegistrationsOperations.get has a new signature
  - Operation ResourceTypeRegistrationsOperations.listByProviderRegistration has a new signature
  - Removed Type Alias ManifestResourceDeletionPolicy
  - Type alias "MarketplaceType" has been changed
  - Removed Enum KnownManifestResourceDeletionPolicy
  - Enum KnownResourceDeletionPolicy no longer has value CascadeDeleteAll
  - Enum KnownResourceDeletionPolicy no longer has value CascadeDeleteProxyOnlyChildren

    
## 1.0.0 (2026-07-16)

### Features Added

This is the first stable release of the @azure/arm-providerhub package. It introduces a new SDK generation with layered APIs, smaller bundles, and improved ergonomics. For more details, see the https://aka.ms/azsdk/js/sdk/quickstart.
