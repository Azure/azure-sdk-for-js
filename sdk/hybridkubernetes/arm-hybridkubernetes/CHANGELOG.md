# Release History

## 3.0.0-beta.2 (2026-06-10)
Compared with version 2.1.0

### Features Added
  - Added operation ConnectedClusterOperations.beginCreateOrReplace
  - Added operation ConnectedClusterOperations.beginCreateOrReplaceAndWait
  - Added operation ConnectedClusterOperations.beginUpdateAsync
  - Added operation ConnectedClusterOperations.beginUpdateAsyncAndWait
  - Added operation ConnectedClusterOperations.createOrReplace
  - Added operation ConnectedClusterOperations.delete
  - Added operation ConnectedClusterOperations.updateAsync
  - Added operation OperationsOperations.get
  - Class ConnectedKubernetesClient has a new constructor "constructor(credential: TokenCredential, options?: ConnectedKubernetesClientOptionalParams);"
  - Added Interface AadProfile
  - Added Interface AgentError
  - Added Interface ArcAgentProfile
  - Added Interface ArcAgentryConfigurations
  - Added Interface ConnectedClusterCreateOrReplaceOptionalParams
  - Added Interface ConnectedClusterPatchProperties
  - Added Interface ConnectedClusterProperties
  - Added Interface ConnectedClusterUpdateAsyncOptionalParams
  - Added Interface Gateway
  - Added Interface OidcIssuerProfile
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface SecurityProfile
  - Added Interface SecurityProfileWorkloadIdentity
  - Added Interface SimplePollerLike
  - Added Interface SystemComponent
  - Interface ConnectedCluster has a new optional parameter aadProfile
  - Interface ConnectedCluster has a new optional parameter arcAgentProfile
  - Interface ConnectedCluster has a new optional parameter arcAgentryConfigurations
  - Interface ConnectedCluster has a new optional parameter azureHybridBenefit
  - Interface ConnectedCluster has a new optional parameter distributionVersion
  - Interface ConnectedCluster has a new optional parameter gateway
  - Interface ConnectedCluster has a new optional parameter kind
  - Interface ConnectedCluster has a new optional parameter miscellaneousProperties
  - Interface ConnectedCluster has a new optional parameter oidcIssuerProfile
  - Interface ConnectedCluster has a new optional parameter privateLinkScopeResourceId
  - Interface ConnectedCluster has a new optional parameter privateLinkState
  - Interface ConnectedCluster has a new optional parameter securityProfile
  - Interface ConnectedClusterPatch has a new optional parameter azureHybridBenefit
  - Interface ConnectedClusterPatch has a new optional parameter distribution
  - Interface ConnectedClusterPatch has a new optional parameter distributionVersion
  - Interface ConnectedClusterPatch has a new optional parameter gateway
  - Interface HybridConnectionConfig has a new optional parameter relayTid
  - Interface HybridConnectionConfig has a new optional parameter relayType
  - Interface Operation has a new optional parameter actionType
  - Interface Operation has a new optional parameter isDataAction
  - Interface Operation has a new optional parameter origin
  - Interface Resource has a new optional parameter systemData
  - Interface TrackedResource has a new optional parameter systemData
  - Added Type Alias ActionType
  - Added Type Alias AutoUpgradeOptions
  - Added Type Alias AzureHybridBenefit
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ConnectedClusterKind
  - Added Type Alias Origin
  - Added Type Alias PrivateLinkState
  - Added Enum AzureClouds
  - Added Enum KnownActionType
  - Added Enum KnownAutoUpgradeOptions
  - Added Enum KnownAzureHybridBenefit
  - Added Enum KnownConnectedClusterKind
  - Added Enum KnownOrigin
  - Added Enum KnownPrivateLinkState
  - Added Enum KnownVersions
  - Enum KnownConnectivityStatus has a new value AgentNotInstalled

### Breaking Changes
  - Removed operation ConnectedCluster.beginCreate
  - Removed operation ConnectedCluster.beginCreateAndWait
  - Removed operation ConnectedCluster.update
  - Removed operation Operations.list
  - Class ConnectedKubernetesClient no longer has parameter apiVersion
  - Class ConnectedKubernetesClient no longer has parameter connectedClusterOperations
  - Class ConnectedKubernetesClient no longer has parameter subscriptionId
  - Removed Interface ConnectedClusterCreateOptionalParams
  - Removed Interface ConnectedClusterList
  - Removed Interface ConnectedClusterUpdateOptionalParams
  - Removed Interface OperationList
  - Interface ConnectedClusterPatch no longer has parameter properties
  - Removed Type Alias LastModifiedByType
  - Removed Enum KnownLastModifiedByType

    
## 3.0.0-beta.1 (2025-03-28)
Compared with version 2.1.0
    
### Features Added

  - Added operation ConnectedClusterOperations.beginCreateOrReplace
  - Added operation ConnectedClusterOperations.beginCreateOrReplaceAndWait
  - Added Interface AadProfile
  - Added Interface AgentError
  - Added Interface ArcAgentProfile
  - Added Interface ArcAgentryConfigurations
  - Added Interface ConnectedClusterCreateOrReplaceOptionalParams
  - Added Interface ConnectedClusterPatchProperties
  - Added Interface ConnectedClusterProperties
  - Added Interface Gateway
  - Added Interface OidcIssuerProfile
  - Added Interface SecurityProfile
  - Added Interface SecurityProfileWorkloadIdentity
  - Added Interface SystemComponent
  - Added Type Alias AutoUpgradeOptions
  - Added Type Alias AzureHybridBenefit
  - Added Type Alias ConnectedClusterCreateOrReplaceResponse
  - Added Type Alias ConnectedClusterKind
  - Added Type Alias PrivateLinkState
  - Interface ConnectedCluster has a new optional parameter kind
  - Interface HybridConnectionConfig has a new optional parameter relayTid
  - Interface HybridConnectionConfig has a new optional parameter relayType
  - Added Enum KnownAutoUpgradeOptions
  - Added Enum KnownAzureHybridBenefit
  - Added Enum KnownConnectedClusterKind
  - Added Enum KnownPrivateLinkState
  - Enum KnownConnectivityStatus has a new value AgentNotInstalled

### Breaking Changes

  - Removed operation ConnectedClusterOperations.beginCreate
  - Removed operation ConnectedClusterOperations.beginCreateAndWait
  - Class ConnectedKubernetesClient has a new signature
  - Interface ConnectedCluster no longer has parameter agentPublicKeyCertificate
  - Interface ConnectedCluster no longer has parameter agentVersion
  - Interface ConnectedCluster no longer has parameter connectivityStatus
  - Interface ConnectedCluster no longer has parameter distribution
  - Interface ConnectedCluster no longer has parameter infrastructure
  - Interface ConnectedCluster no longer has parameter kubernetesVersion
  - Interface ConnectedCluster no longer has parameter lastConnectivityTime
  - Interface ConnectedCluster no longer has parameter managedIdentityCertificateExpirationTime
  - Interface ConnectedCluster no longer has parameter offering
  - Interface ConnectedCluster no longer has parameter provisioningState
  - Interface ConnectedCluster no longer has parameter totalCoreCount
  - Interface ConnectedCluster no longer has parameter totalNodeCount
  - Interface ConnectedCluster has a new required parameter properties
  - Type of parameter properties of interface ConnectedClusterPatch is changed from Record<string, unknown> to ConnectedClusterPatchProperties
    
    
## 2.1.0 (2022-11-25)
    
### Features Added

  - Added Interface ConnectedCluster
  - Added Interface TrackedResource
    
## 2.0.1 (2022-04-26)

### Features Added

  - Bug fix
    
## 2.0.0 (2022-01-18)

The package of @azure/arm-hybridkubernetes is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
