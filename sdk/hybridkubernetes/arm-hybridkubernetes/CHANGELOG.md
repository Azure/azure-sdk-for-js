# Release History
    
## 3.0.0-beta.1 (2025-03-20)
Compared with version 2.1.0
    
### Features Added

  - Added operation ConnectedClusterOperations.beginCreateOrReplace
  - Added operation ConnectedClusterOperations.beginCreateOrReplaceAndWait
  - Added Interface AadProfile
  - Added Interface AgentError
  - Added Interface ArcAgentProfile
  - Added Interface ArcAgentryConfigurations
  - Added Interface ConnectedClusterCreateOrReplaceOptionalParams
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
  - Interface ConnectedClusterPatch no longer has parameter properties
    
    
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
