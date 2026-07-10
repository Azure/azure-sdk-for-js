# Release History

## 9.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 9.0.0-beta.1 (2026-06-22)
Compared with version 8.2.0

### Features Added
  - Added operation AttachedDatabaseConfigurationsOperations.createOrUpdate
  - Added operation AttachedDatabaseConfigurationsOperations.delete
  - Added operation ClusterPrincipalAssignmentsOperations.createOrUpdate
  - Added operation ClusterPrincipalAssignmentsOperations.delete
  - Added operation ClustersOperations.addCalloutPolicies
  - Added operation ClustersOperations.addLanguageExtensions
  - Added operation ClustersOperations.createOrUpdate
  - Added operation ClustersOperations.delete
  - Added operation ClustersOperations.detachFollowerDatabases
  - Added operation ClustersOperations.diagnoseVirtualNetwork
  - Added operation ClustersOperations.migrate
  - Added operation ClustersOperations.removeCalloutPolicy
  - Added operation ClustersOperations.removeLanguageExtensions
  - Added operation ClustersOperations.start
  - Added operation ClustersOperations.stop
  - Added operation ClustersOperations.update
  - Added operation DatabasePrincipalAssignmentsOperations.createOrUpdate
  - Added operation DatabasePrincipalAssignmentsOperations.delete
  - Added operation DatabasesOperations.createOrUpdate
  - Added operation DatabasesOperations.delete
  - Added operation DatabasesOperations.update
  - Added operation DataConnectionsOperations.createOrUpdate
  - Added operation DataConnectionsOperations.dataConnectionValidation
  - Added operation DataConnectionsOperations.delete
  - Added operation DataConnectionsOperations.update
  - Added operation ManagedPrivateEndpointsOperations.createOrUpdate
  - Added operation ManagedPrivateEndpointsOperations.delete
  - Added operation ManagedPrivateEndpointsOperations.update
  - Added operation PrivateEndpointConnectionsOperations.createOrUpdate
  - Added operation PrivateEndpointConnectionsOperations.delete
  - Added operation SandboxCustomImagesOperations.createOrUpdate
  - Added operation SandboxCustomImagesOperations.delete
  - Added operation SandboxCustomImagesOperations.update
  - Added operation ScriptsOperations.createOrUpdate
  - Added operation ScriptsOperations.delete
  - Added operation ScriptsOperations.update
  - Class KustoManagementClient has a new constructor "constructor(credential: TokenCredential, options?: KustoManagementClientOptionalParams);"
  - Added Interface AttachedDatabaseConfigurationProperties
  - Added Interface ClusterPrincipalProperties
  - Added Interface ClusterProperties
  - Added Interface CosmosDbDataConnectionProperties
  - Added Interface DatabaseOperationsInviteFollowerOptionalParams
  - Added Interface DatabasePrincipalProperties
  - Added Interface EventGridConnectionProperties
  - Added Interface EventGridConnectionWithManagedIdentityProperties
  - Added Interface EventGridDataConnectionWithManagedIdentity
  - Added Interface EventHubConnectionProperties
  - Added Interface EventHubConnectionWithManagedIdentityProperties
  - Added Interface EventHubDataConnectionWithManagedIdentity
  - Added Interface FollowerDatabaseProperties
  - Added Interface IotHubConnectionProperties
  - Added Interface ManagedPrivateEndpointProperties
  - Added Interface OperationResultErrorProperties
  - Added Interface OperationResultProperties
  - Added Interface OutboundNetworkDependenciesEndpointProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateLinkResourceProperties
  - Added Interface ReadOnlyFollowingDatabaseProperties
  - Added Interface ReadWriteDatabaseProperties
  - Added Interface RestorePollerOptions
  - Added Interface SandboxCustomImageProperties
  - Added Interface ScriptProperties
  - Added Interface SimplePollerLike
  - Interface AttachedDatabaseConfiguration has a new optional parameter systemData
  - Interface ClusterPrincipalAssignment has a new optional parameter systemData
  - Interface ClusterUpdate has a new optional parameter systemData
  - Interface CosmosDbDataConnection has a new optional parameter systemData
  - Interface Database has a new optional parameter systemData
  - Interface DatabasePrincipalAssignment has a new optional parameter systemData
  - Interface DatabasePrincipalListResult has a new optional parameter nextLink
  - Interface DataConnection has a new optional parameter systemData
  - Interface EventGridDataConnection has a new optional parameter systemData
  - Interface EventHubDataConnection has a new optional parameter systemData
  - Interface IotHubDataConnection has a new optional parameter systemData
  - Interface KeyVaultProperties has a new optional parameter federatedIdentityClientId
  - Interface LanguageExtensionsList has a new optional parameter nextLink
  - Interface OutboundNetworkDependenciesEndpoint has a new optional parameter systemData
  - Interface ProxyResource has a new optional parameter systemData
  - Interface ReadOnlyFollowingDatabase has a new optional parameter systemData
  - Interface ReadWriteDatabase has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface SandboxCustomImage has a new optional parameter systemData
  - Interface Script has a new optional parameter managedIdentityResourceId
  - Interface TrackedResource has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions
  - Enum KnownDataConnectionKind has a new value EventGridWithManagedIdentity
  - Enum KnownDataConnectionKind has a new value EventHubWithManagedIdentity
  - Enum KnownEventGridDataFormat has a new value Azmonstream
  - Enum KnownEventHubDataFormat has a new value Azmonstream
  - Enum KnownIotHubDataFormat has a new value Azmonstream
  - Enum KnownPublicNetworkAccess has a new value SecuredByPerimeter

### Breaking Changes
  - Operation OperationsResultsLocation.get has a new signature
  - Removed Interface CalloutPoliciesList
  - Removed Interface DatabaseInviteFollowerOptionalParams
  - Removed Interface FollowerDatabaseListResultGet
  - Removed Interface SkuDescriptionList

    
## 8.2.0 (2025-01-24)
    
### Features Added

  - Added operation Clusters.beginAddCalloutPolicies
  - Added operation Clusters.beginAddCalloutPoliciesAndWait
  - Added operation Clusters.beginRemoveCalloutPolicy
  - Added operation Clusters.beginRemoveCalloutPolicyAndWait
  - Added operation Clusters.listCalloutPolicies
  - Added operation Clusters.listFollowerDatabasesGet
  - Added Interface CalloutPoliciesList
  - Added Interface CalloutPolicy
  - Added Interface CalloutPolicyToRemove
  - Added Interface ClustersAddCalloutPoliciesHeaders
  - Added Interface ClustersAddCalloutPoliciesOptionalParams
  - Added Interface ClustersListCalloutPoliciesOptionalParams
  - Added Interface ClustersListFollowerDatabasesGetOptionalParams
  - Added Interface ClustersRemoveCalloutPolicyHeaders
  - Added Interface ClustersRemoveCalloutPolicyOptionalParams
  - Added Interface FollowerDatabaseDefinitionGet
  - Added Interface FollowerDatabaseListResultGet
  - Added Type Alias CalloutType
  - Added Type Alias ClustersListCalloutPoliciesResponse
  - Added Type Alias ClustersListFollowerDatabasesGetResponse
  - Added Type Alias OutboundAccess
  - Added Type Alias PrincipalPermissionsAction
  - Added Type Alias ScriptLevel
  - Added Type Alias ZoneStatus
  - Interface Cluster has a new optional parameter calloutPolicies
  - Interface Cluster has a new optional parameter zoneStatus
  - Interface ClusterUpdate has a new optional parameter calloutPolicies
  - Interface ClusterUpdate has a new optional parameter zoneStatus
  - Interface SandboxCustomImage has a new optional parameter baseImageName
  - Interface Script has a new optional parameter principalPermissionsAction
  - Interface Script has a new optional parameter scriptLevel
  - Added Enum KnownCalloutType
  - Added Enum KnownOutboundAccess
  - Added Enum KnownPrincipalPermissionsAction
  - Added Enum KnownScriptLevel
  - Added Enum KnownZoneStatus
  - Enum KnownClusterPrincipalRole has a new value AllDatabasesMonitor
  - Enum KnownLanguageExtensionImageName has a new value Python3117
  - Enum KnownLanguageExtensionImageName has a new value Python3117DL
    
    
## 8.1.0 (2023-10-11)
    
### Features Added

  - Added operation group SandboxCustomImages
  - Added Interface SandboxCustomImage
  - Added Interface SandboxCustomImagesCheckNameAvailabilityOptionalParams
  - Added Interface SandboxCustomImagesCheckNameRequest
  - Added Interface SandboxCustomImagesCreateOrUpdateOptionalParams
  - Added Interface SandboxCustomImagesDeleteHeaders
  - Added Interface SandboxCustomImagesDeleteOptionalParams
  - Added Interface SandboxCustomImagesGetOptionalParams
  - Added Interface SandboxCustomImagesListByClusterOptionalParams
  - Added Interface SandboxCustomImagesListResult
  - Added Interface SandboxCustomImagesUpdateHeaders
  - Added Interface SandboxCustomImagesUpdateOptionalParams
  - Added Type Alias Language
  - Added Type Alias SandboxCustomImagesCheckNameAvailabilityResponse
  - Added Type Alias SandboxCustomImagesCreateOrUpdateResponse
  - Added Type Alias SandboxCustomImagesGetResponse
  - Added Type Alias SandboxCustomImagesListByClusterResponse
  - Added Type Alias SandboxCustomImagesUpdateResponse
  - Added Type Alias VnetState
  - Interface AttachedDatabaseConfigurationsDeleteHeaders has a new optional parameter location
  - Interface ClusterPrincipalAssignmentsDeleteHeaders has a new optional parameter location
  - Interface ClustersAddLanguageExtensionsHeaders has a new optional parameter location
  - Interface ClustersDeleteHeaders has a new optional parameter location
  - Interface ClustersDetachFollowerDatabasesHeaders has a new optional parameter location
  - Interface ClustersDiagnoseVirtualNetworkHeaders has a new optional parameter location
  - Interface ClustersMigrateHeaders has a new optional parameter location
  - Interface ClustersRemoveLanguageExtensionsHeaders has a new optional parameter location
  - Interface ClustersStartHeaders has a new optional parameter location
  - Interface ClustersStopHeaders has a new optional parameter location
  - Interface ClustersUpdateHeaders has a new optional parameter location
  - Interface ClusterUpdate has a new optional parameter zones
  - Interface DatabasePrincipalAssignmentsDeleteHeaders has a new optional parameter location
  - Interface DatabasesDeleteHeaders has a new optional parameter location
  - Interface DatabasesUpdateHeaders has a new optional parameter location
  - Interface DataConnectionsDataConnectionValidationHeaders has a new optional parameter location
  - Interface DataConnectionsDeleteHeaders has a new optional parameter location
  - Interface DataConnectionsUpdateHeaders has a new optional parameter location
  - Interface EndpointDetail has a new optional parameter ipAddress
  - Interface LanguageExtension has a new optional parameter languageExtensionCustomImageName
  - Interface ManagedPrivateEndpointsDeleteHeaders has a new optional parameter location
  - Interface ManagedPrivateEndpointsUpdateHeaders has a new optional parameter location
  - Interface PrivateEndpointConnectionsDeleteHeaders has a new optional parameter location
  - Interface ScriptsDeleteHeaders has a new optional parameter location
  - Interface ScriptsUpdateHeaders has a new optional parameter location
  - Interface VirtualNetworkConfiguration has a new optional parameter state
  - Added Enum KnownLanguage
  - Added Enum KnownVnetState
  - Enum KnownLanguageExtensionImageName has a new value Python3108DL
  - Enum KnownLanguageExtensionImageName has a new value PythonCustomImage
    
    
## 8.0.0 (2023-07-05)
    
### Features Added

  - Added operation group DatabaseOperations
  - Added operation Clusters.beginMigrate
  - Added operation Clusters.beginMigrateAndWait
  - Added Interface AttachedDatabaseConfigurationsCreateOrUpdateHeaders
  - Added Interface AttachedDatabaseConfigurationsDeleteHeaders
  - Added Interface ClusterMigrateRequest
  - Added Interface ClusterPrincipalAssignmentsDeleteHeaders
  - Added Interface ClustersAddLanguageExtensionsHeaders
  - Added Interface ClustersDeleteHeaders
  - Added Interface ClustersDetachFollowerDatabasesHeaders
  - Added Interface ClustersDiagnoseVirtualNetworkHeaders
  - Added Interface ClustersMigrateHeaders
  - Added Interface ClustersMigrateOptionalParams
  - Added Interface ClustersRemoveLanguageExtensionsHeaders
  - Added Interface ClustersStartHeaders
  - Added Interface ClustersStopHeaders
  - Added Interface DatabaseInviteFollowerOptionalParams
  - Added Interface DatabaseInviteFollowerRequest
  - Added Interface DatabaseInviteFollowerResult
  - Added Interface DatabasePrincipalAssignmentsDeleteHeaders
  - Added Interface DatabasesCreateOrUpdateHeaders
  - Added Interface DatabasesDeleteHeaders
  - Added Interface DatabasesListByClusterNextOptionalParams
  - Added Interface DataConnectionsCreateOrUpdateHeaders
  - Added Interface DataConnectionsDataConnectionValidationHeaders
  - Added Interface DataConnectionsDeleteHeaders
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface ManagedPrivateEndpointsCreateOrUpdateHeaders
  - Added Interface ManagedPrivateEndpointsDeleteHeaders
  - Added Interface MigrationClusterProperties
  - Added Interface OperationsResultsLocationGetHeaders
  - Added Interface PrivateEndpointConnectionsDeleteHeaders
  - Added Interface ScriptsCreateOrUpdateHeaders
  - Added Interface ScriptsDeleteHeaders
  - Added Interface SuspensionDetails
  - Added Type Alias DatabaseInviteFollowerResponse
  - Added Type Alias DatabasesListByClusterNextResponse
  - Added Type Alias MigrationClusterRole
  - Added Type Alias OperationsResultsLocationGetResponse
  - Interface Cluster has a new optional parameter migrationCluster
  - Interface ClusterUpdate has a new optional parameter migrationCluster
  - Interface DatabaseListResult has a new optional parameter nextLink
  - Interface DatabasesListByClusterOptionalParams has a new optional parameter skiptoken
  - Interface DatabasesListByClusterOptionalParams has a new optional parameter top
  - Interface ReadOnlyFollowingDatabase has a new optional parameter suspensionDetails
  - Interface ReadWriteDatabase has a new optional parameter keyVaultProperties
  - Interface ReadWriteDatabase has a new optional parameter suspensionDetails
  - Added Enum KnownMigrationClusterRole
  - Enum KnownState has a new value Migrated

### Breaking Changes

  - Enum KnownLanguageExtensionImageName no longer has value Python3912
  - Enum KnownLanguageExtensionImageName no longer has value Python3912IncludeDeepLearning
    
    
## 7.3.0 (2023-02-07)
    
### Features Added

  - Added operation group Skus
  - Added Interface CosmosDbDataConnection
  - Added Interface ResourceSkuCapabilities
  - Added Interface ResourceSkuZoneDetails
  - Added Interface SkusListOptionalParams
  - Added Type Alias LanguageExtensionImageName
  - Added Type Alias SkusListResponse
  - Interface LanguageExtension has a new optional parameter languageExtensionImageName
  - Interface SkuLocationInfoItem has a new optional parameter zoneDetails
  - Interface TableLevelSharingProperties has a new optional parameter functionsToExclude
  - Interface TableLevelSharingProperties has a new optional parameter functionsToInclude
  - Added Enum KnownLanguageExtensionImageName
  - Enum KnownAzureSkuName has a new value StandardL32AsV3
  - Enum KnownAzureSkuName has a new value StandardL32SV3
  - Enum KnownDataConnectionKind has a new value CosmosDb
  - Enum KnownProvisioningState has a new value Canceled
    
## 7.2.1 (2023-01-11)

### Features Added

  - Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 7.2.0 (2022-09-15)

### Features Added

  - Added Interface AttachedDatabaseConfiguration
  - Added Interface Cluster
  - Added Interface ClusterPrincipalAssignment
  - Added Interface ClusterUpdate
  - Added Interface Database
  - Added Interface DatabasePrincipalAssignment
  - Added Interface DataConnection
  - Added Interface EventGridDataConnection
  - Added Interface EventHubDataConnection
  - Added Interface IotHubDataConnection
  - Added Interface ManagedPrivateEndpoint
  - Added Interface OutboundNetworkDependenciesEndpoint
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResource
  - Added Interface ReadOnlyFollowingDatabase
  - Added Interface ReadWriteDatabase
  - Added Interface Script
  - Added Interface TrackedResource
  - Added Type Alias CallerRole
  - Added Type Alias DatabaseShareOrigin
  - Interface DatabasesCreateOrUpdateOptionalParams has a new optional parameter callerRole
  - Interface DatabasesUpdateOptionalParams has a new optional parameter callerRole
  - Interface FollowerDatabaseDefinition has a new optional parameter databaseShareOrigin
  - Interface FollowerDatabaseDefinition has a new optional parameter tableLevelSharingProperties
  - Added Enum KnownCallerRole
  - Added Enum KnownDatabaseShareOrigin
  - Enum KnownAzureSkuName has a new value StandardE16DV4
  - Enum KnownAzureSkuName has a new value StandardE16DV5
  - Enum KnownAzureSkuName has a new value StandardE2DV4
  - Enum KnownAzureSkuName has a new value StandardE2DV5
  - Enum KnownAzureSkuName has a new value StandardE4DV4
  - Enum KnownAzureSkuName has a new value StandardE4DV5
  - Enum KnownAzureSkuName has a new value StandardE8DV4
  - Enum KnownAzureSkuName has a new value StandardE8DV5
  - Enum KnownAzureSkuName has a new value StandardEC16AdsV5
  - Enum KnownAzureSkuName has a new value StandardEC16AsV53TBPS
  - Enum KnownAzureSkuName has a new value StandardEC16AsV54TBPS
  - Enum KnownAzureSkuName has a new value StandardEC8AdsV5
  - Enum KnownAzureSkuName has a new value StandardEC8AsV51TBPS
  - Enum KnownAzureSkuName has a new value StandardEC8AsV52TBPS
  - Enum KnownAzureSkuName has a new value StandardL16AsV3
  - Enum KnownAzureSkuName has a new value StandardL16SV3
  - Enum KnownAzureSkuName has a new value StandardL8AsV3
  - Enum KnownAzureSkuName has a new value StandardL8SV3
    
## 7.1.2 (2022-06-17)

### Features Added

  - Bug fix   
 
## 7.1.1 (2022-04-24)

### Features Added

  - Bug fix   

## 7.1.0 (2022-02-23)
    
### Features Added

  - Added operation group OperationsResultsLocation
  - Added Interface ClustersUpdateHeaders
  - Added Interface DatabasesUpdateHeaders
  - Added Interface DataConnectionsUpdateHeaders
  - Added Interface ManagedPrivateEndpointsUpdateHeaders
  - Added Interface OperationsResultsLocationGetOptionalParams
  - Added Interface ScriptsUpdateHeaders
  - Added Type Alias DatabaseRouting
  - Added Type Alias PublicIPType
  - Interface OperationResult has a new optional parameter provisioningState
  - Class KustoManagementClient has a new parameter operationsResultsLocation
  - Type Alias Cluster has a new parameter publicIPType
  - Type Alias Cluster has a new parameter virtualClusterGraduationProperties
  - Type Alias Cluster has a new parameter privateEndpointConnections
  - Type Alias ClusterPrincipalAssignment has a new parameter aadObjectId
  - Type Alias ClusterUpdate has a new parameter publicIPType
  - Type Alias ClusterUpdate has a new parameter virtualClusterGraduationProperties
  - Type Alias ClusterUpdate has a new parameter privateEndpointConnections
  - Type Alias DatabasePrincipalAssignment has a new parameter aadObjectId
  - Type Alias EventGridDataConnection has a new parameter eventGridResourceId
  - Type Alias EventGridDataConnection has a new parameter managedIdentityResourceId
  - Type Alias EventGridDataConnection has a new parameter managedIdentityObjectId
  - Type Alias EventGridDataConnection has a new parameter databaseRouting
  - Type Alias EventHubDataConnection has a new parameter managedIdentityObjectId
  - Type Alias EventHubDataConnection has a new parameter databaseRouting
  - Type Alias IotHubDataConnection has a new parameter databaseRouting
  - Type Alias Script has a new parameter scriptContent
  - Added Enum KnownDatabaseRouting
  - Added Enum KnownPublicIPType
  - Enum KnownAzureSkuName has a new value StandardD16DV5
  - Enum KnownAzureSkuName has a new value StandardD32DV4
  - Enum KnownAzureSkuName has a new value StandardD32DV5
  - Enum KnownAzureSkuName has a new value StandardE16AdsV5
  - Enum KnownAzureSkuName has a new value StandardE16AsV53TBPS
  - Enum KnownAzureSkuName has a new value StandardE16AsV54TBPS
  - Enum KnownAzureSkuName has a new value StandardE16SV43TBPS
  - Enum KnownAzureSkuName has a new value StandardE16SV44TBPS
  - Enum KnownAzureSkuName has a new value StandardE16SV53TBPS
  - Enum KnownAzureSkuName has a new value StandardE16SV54TBPS
  - Enum KnownAzureSkuName has a new value StandardE2AdsV5
  - Enum KnownAzureSkuName has a new value StandardE4AdsV5
  - Enum KnownAzureSkuName has a new value StandardE8AdsV5
  - Enum KnownAzureSkuName has a new value StandardE8AsV51TBPS
  - Enum KnownAzureSkuName has a new value StandardE8AsV52TBPS
  - Enum KnownAzureSkuName has a new value StandardE8SV41TBPS
  - Enum KnownAzureSkuName has a new value StandardE8SV42TBPS
  - Enum KnownAzureSkuName has a new value StandardE8SV51TBPS
  - Enum KnownAzureSkuName has a new value StandardE8SV52TBPS
    
    
## 7.0.0 (2022-01-24)

The package of @azure/arm-kusto is using our next generation design principles since version 7.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
