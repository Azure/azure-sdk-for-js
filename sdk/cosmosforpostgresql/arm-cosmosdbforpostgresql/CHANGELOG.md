# Release History

## 2.0.0-beta.1 (2026-06-18)
Compared with version 1.0.0

### Features Added
  - Added operation ClustersOperations.create
  - Added operation ClustersOperations.delete
  - Added operation ClustersOperations.promoteReadReplica
  - Added operation ClustersOperations.restart
  - Added operation ClustersOperations.start
  - Added operation ClustersOperations.stop
  - Added operation ClustersOperations.update
  - Added operation ConfigurationsOperations.updateOnCoordinator
  - Added operation ConfigurationsOperations.updateOnNode
  - Added operation FirewallRulesOperations.createOrUpdate
  - Added operation FirewallRulesOperations.delete
  - Added operation PrivateEndpointConnectionsOperations.createOrUpdate
  - Added operation PrivateEndpointConnectionsOperations.delete
  - Added operation RolesOperations.create
  - Added operation RolesOperations.delete
  - Added Interface AuthConfig
  - Added Interface ClusterProperties
  - Added Interface ClusterPropertiesForUpdate
  - Added Interface ConfigurationProperties
  - Added Interface DataEncryption
  - Added Interface FirewallRuleProperties
  - Added Interface IdentityProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateEndpointConnectionSimpleProperties
  - Added Interface PrivateLinkResourceProperties
  - Added Interface PromoteRequest
  - Added Interface RestorePollerOptions
  - Added Interface RoleProperties
  - Added Interface RolePropertiesExternalIdentity
  - Added Interface ServerConfigurationProperties
  - Added Interface SimplePollerLike
  - Added Interface UserAssignedIdentity
  - Interface Cluster has a new optional parameter aadAuthEnabled
  - Interface Cluster has a new optional parameter authConfig
  - Interface Cluster has a new optional parameter databaseName
  - Interface Cluster has a new optional parameter dataEncryption
  - Interface Cluster has a new optional parameter enableGeoBackup
  - Interface Cluster has a new optional parameter identity
  - Interface Cluster has a new optional parameter passwordEnabled
  - Interface ClusterForUpdate has a new optional parameter identity
  - Interface Operation has a new optional parameter actionType
  - Interface Role has a new optional parameter externalIdentity
  - Interface Role has a new optional parameter roleType
  - Added Type Alias AadEnabledEnum
  - Added Type Alias ActionType
  - Added Type Alias ActiveDirectoryAuth
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CheckNameAvailabilityResourceType
  - Added Type Alias DataEncryptionType
  - Added Type Alias IdentityType
  - Added Type Alias Origin
  - Added Type Alias PasswordAuth
  - Added Type Alias PasswordEnabledEnum
  - Added Type Alias PrincipalType
  - Added Type Alias RoleType
  - Added Enum AzureClouds
  - Added Enum KnownAadEnabledEnum
  - Added Enum KnownActionType
  - Added Enum KnownActiveDirectoryAuth
  - Added Enum KnownDataEncryptionType
  - Added Enum KnownIdentityType
  - Added Enum KnownOrigin
  - Added Enum KnownPasswordAuth
  - Added Enum KnownPasswordEnabledEnum
  - Added Enum KnownPrincipalType
  - Added Enum KnownRoleType
  - Added Enum KnownVersions

### Breaking Changes
  - Operation Clusters.beginPromoteReadReplicaAndWait has a new signature
  - Operation Clusters.beginRestartAndWait has a new signature
  - Operation FirewallRules.beginDeleteAndWait has a new signature
  - Operation PrivateEndpointConnections.beginDeleteAndWait has a new signature
  - Operation Roles.beginCreate has a new signature
  - Operation Roles.beginCreateAndWait has a new signature
  - Operation Roles.beginDeleteAndWait has a new signature
  - Operation Roles.get has a new signature
  - Class CosmosDBForPostgreSQL no longer has parameter apiVersion
  - Class CosmosDBForPostgreSQL no longer has parameter subscriptionId
  - Interface Operation no longer has parameter properties
  - Parameter password of interface Role is now optional
  - Removed Type Alias OperationOrigin
  - Removed Enum KnownOperationOrigin

    
## 1.0.0 (2023-09-04)

The package of @azure/arm-cosmosdbforpostgresql is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
