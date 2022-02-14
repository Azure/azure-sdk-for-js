# Release History
    
## 15.1.0-beta.1 (2022-02-14)
    
**Features**

  - Added Interface ManagedClusterOidcIssuerProfile
  - Added Type Alias Format
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter capacityReservationGroupID
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter hostGroupID
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter messageOfTheDay
  - Interface ManagedClustersListClusterAdminCredentialsOptionalParams has a new optional parameter format
  - Type Alias AgentPool has a new parameter messageOfTheDay
  - Type Alias AgentPool has a new parameter capacityReservationGroupID
  - Type Alias AgentPool has a new parameter hostGroupID
  - Type Alias ManagedCluster has a new parameter currentKubernetesVersion
  - Type Alias ManagedCluster has a new parameter oidcIssuerProfile
  - Type Alias ManagedCluster has a new parameter enableNamespaceResources
  - Added Enum KnownFormat
  - Enum KnownNetworkPlugin has a new value None
    
    
## 15.0.0 (2021-12-09)

The package of @azure/arm-containerservice is using our next generation design principles since version 15.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
