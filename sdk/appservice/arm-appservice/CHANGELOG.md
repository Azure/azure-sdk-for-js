# Release History

## 12.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 12.0.0 (2022-04-07)
    
**Features**

  - Added operation group Global_2

**Breaking Changes**

  - Removed operation group Global
    
    
## 11.0.0 (2022-01-10)
    
**Features**

  - Added operation group ContainerApps
  - Added operation group ContainerAppsRevisions
  - Added operation Domains.transferOut
  - Added operation WebApps.getAuthSettingsV2WithoutSecrets
  - Added Interface Configuration
  - Added Interface Container
  - Added Interface ContainerAppCollection
  - Added Interface ContainerAppsConfiguration
  - Added Interface ContainerAppsCreateOrUpdateOptionalParams
  - Added Interface ContainerAppsDeleteOptionalParams
  - Added Interface ContainerAppSecret
  - Added Interface ContainerAppsGetOptionalParams
  - Added Interface ContainerAppsListByResourceGroupNextOptionalParams
  - Added Interface ContainerAppsListByResourceGroupOptionalParams
  - Added Interface ContainerAppsListBySubscriptionNextOptionalParams
  - Added Interface ContainerAppsListBySubscriptionOptionalParams
  - Added Interface ContainerAppsListSecretsOptionalParams
  - Added Interface ContainerAppsRevisionsActivateRevisionOptionalParams
  - Added Interface ContainerAppsRevisionsDeactivateRevisionOptionalParams
  - Added Interface ContainerAppsRevisionsGetRevisionOptionalParams
  - Added Interface ContainerAppsRevisionsListRevisionsNextOptionalParams
  - Added Interface ContainerAppsRevisionsListRevisionsOptionalParams
  - Added Interface ContainerAppsRevisionsRestartRevisionOptionalParams
  - Added Interface ContainerResources
  - Added Interface CustomHostnameSitesCollection
  - Added Interface CustomScaleRule
  - Added Interface Dapr
  - Added Interface DaprComponent
  - Added Interface DaprMetadata
  - Added Interface DomainsTransferOutOptionalParams
  - Added Interface EnvironmentVar
  - Added Interface HttpScaleRule
  - Added Interface Ingress
  - Added Interface ListCustomHostNameSitesNextOptionalParams
  - Added Interface ListCustomHostNameSitesOptionalParams
  - Added Interface QueueScaleRule
  - Added Interface RegistryCredentials
  - Added Interface RevisionCollection
  - Added Interface Scale
  - Added Interface ScaleRule
  - Added Interface ScaleRuleAuth
  - Added Interface Secret
  - Added Interface SecretsCollection
  - Added Interface Template
  - Added Interface TrafficWeight
  - Added Interface WebAppsGetAuthSettingsV2WithoutSecretsOptionalParams
  - Added Type Alias ActiveRevisionsMode
  - Added Type Alias ContainerApp
  - Added Type Alias ContainerAppProvisioningState
  - Added Type Alias ContainerAppsCreateOrUpdateResponse
  - Added Type Alias ContainerAppsGetResponse
  - Added Type Alias ContainerAppsListByResourceGroupNextResponse
  - Added Type Alias ContainerAppsListByResourceGroupResponse
  - Added Type Alias ContainerAppsListBySubscriptionNextResponse
  - Added Type Alias ContainerAppsListBySubscriptionResponse
  - Added Type Alias ContainerAppsListSecretsResponse
  - Added Type Alias ContainerAppsRevisionsGetRevisionResponse
  - Added Type Alias ContainerAppsRevisionsListRevisionsNextResponse
  - Added Type Alias ContainerAppsRevisionsListRevisionsResponse
  - Added Type Alias CustomHostnameSites
  - Added Type Alias DomainsTransferOutResponse
  - Added Type Alias EnterpriseGradeCdnStatus
  - Added Type Alias Enum16
  - Added Type Alias Enum17
  - Added Type Alias Enum18
  - Added Type Alias Enum19
  - Added Type Alias Enum20
  - Added Type Alias IngressTransportMethod
  - Added Type Alias ListCustomHostNameSitesNextResponse
  - Added Type Alias ListCustomHostNameSitesResponse
  - Added Type Alias Revision
  - Added Type Alias RevisionHealthState
  - Added Type Alias RevisionProvisioningState
  - Added Type Alias WebAppsGetAuthSettingsV2WithoutSecretsResponse
  - Class WebSiteManagementClient has a new parameter containerApps
  - Class WebSiteManagementClient has a new parameter containerAppsRevisions
  - Type Alias KubeEnvironment has a new parameter environmentType
  - Type Alias KubeEnvironment has a new parameter containerAppsConfiguration
  - Type Alias KubeEnvironmentPatchResource has a new parameter containerAppsConfiguration
  - Type Alias StaticSiteARMResource has a new parameter enterpriseGradeCdnStatus
  - Type Alias StaticSitePatchResource has a new parameter enterpriseGradeCdnStatus
  - Added Enum KnownActiveRevisionsMode
  - Added Enum KnownContainerAppProvisioningState
  - Added Enum KnownEnterpriseGradeCdnStatus
  - Added Enum KnownEnum16
  - Added Enum KnownEnum17
  - Added Enum KnownEnum18
  - Added Enum KnownEnum19
  - Added Enum KnownEnum20
  - Added Enum KnownIngressTransportMethod
  - Added Enum KnownRevisionHealthState
  - Added Enum KnownRevisionProvisioningState

**Breaking Changes**

  - Removed Enum KnownEnum10
  - Removed Enum KnownEnum11
  - Removed Enum KnownEnum12
  - Removed Enum KnownEnum13
  - Removed Enum KnownEnum14
    
    
## 10.0.0 (2021-12-13)

The package of @azure/arm-appservice is using our next generation design principles since version 10.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
