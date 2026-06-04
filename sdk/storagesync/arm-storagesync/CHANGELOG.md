# Release History

## 10.0.0-beta.1 (2026-06-04)
Compared with version 9.1.0

### Features Added
  - Added operation CloudEndpointsOperations.afsShareMetadataCertificatePublicKeys
  - Added operation CloudEndpointsOperations.create
  - Added operation CloudEndpointsOperations.delete
  - Added operation CloudEndpointsOperations.postBackup
  - Added operation CloudEndpointsOperations.postRestore
  - Added operation CloudEndpointsOperations.preBackup
  - Added operation CloudEndpointsOperations.preRestore
  - Added operation CloudEndpointsOperations.triggerChangeDetection
  - Added operation PrivateEndpointConnectionsOperations.create
  - Added operation PrivateEndpointConnectionsOperations.delete
  - Added operation RegisteredServersOperations.beginUpdate
  - Added operation RegisteredServersOperations.beginUpdateAndWait
  - Added operation RegisteredServersOperations.create
  - Added operation RegisteredServersOperations.delete
  - Added operation RegisteredServersOperations.triggerRollover
  - Added operation RegisteredServersOperations.update
  - Added operation ServerEndpointsOperations.create
  - Added operation ServerEndpointsOperations.delete
  - Added operation ServerEndpointsOperations.recallAction
  - Added operation ServerEndpointsOperations.update
  - Added operation StorageSyncServicesOperations.create
  - Added operation StorageSyncServicesOperations.delete
  - Added operation StorageSyncServicesOperations.update
  - Class MicrosoftStorageSync has a new constructor "constructor(credential: TokenCredential, options?: MicrosoftStorageSyncOptionalParams);"
  - Added Interface CloudEndpointAfsShareMetadataCertificatePublicKeys
  - Added Interface CloudEndpointCreateParametersProperties
  - Added Interface CloudEndpointProperties
  - Added Interface CloudEndpointsAfsShareMetadataCertificatePublicKeysOptionalParams
  - Added Interface CloudTieringLowDiskMode
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface ManagedServiceIdentity
  - Added Interface OperationStatusOperationsGetOptionalParams
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PostBackupResponseProperties
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateLinkResourceProperties
  - Added Interface RegisteredServerCreateParametersProperties
  - Added Interface RegisteredServerProperties
  - Added Interface RegisteredServersUpdateOptionalParams
  - Added Interface RegisteredServerUpdateParameters
  - Added Interface RegisteredServerUpdateProperties
  - Added Interface RestorePollerOptions
  - Added Interface ServerEndpointCreateParametersProperties
  - Added Interface ServerEndpointProperties
  - Added Interface ServerEndpointProvisioningStatus
  - Added Interface ServerEndpointProvisioningStepStatus
  - Added Interface ServerEndpointUpdateProperties
  - Added Interface SimplePollerLike
  - Added Interface StorageSyncServiceCreateParametersProperties
  - Added Interface StorageSyncServiceProperties
  - Added Interface StorageSyncServiceUpdateProperties
  - Added Interface SyncGroupProperties
  - Added Interface SystemData
  - Added Interface UserAssignedIdentity
  - Added Interface WorkflowProperties
  - Interface CloudEndpoint has a new optional parameter systemData
  - Interface CloudEndpointCreateParameters has a new optional parameter systemData
  - Interface OperationResourceMetricSpecification has a new optional parameter lockAggregationType
  - Interface OperationResourceMetricSpecification has a new optional parameter supportedAggregationTypes
  - Interface PrivateEndpointConnection has a new optional parameter groupIds
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface PrivateLinkResource has a new optional parameter systemData
  - Interface ProxyResource has a new optional parameter systemData
  - Interface RegisteredServer has a new optional parameter activeAuthType
  - Interface RegisteredServer has a new optional parameter applicationId
  - Interface RegisteredServer has a new optional parameter identity
  - Interface RegisteredServer has a new optional parameter latestApplicationId
  - Interface RegisteredServer has a new optional parameter systemData
  - Interface RegisteredServerCreateParameters has a new optional parameter applicationId
  - Interface RegisteredServerCreateParameters has a new optional parameter identity
  - Interface RegisteredServerCreateParameters has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface ServerEndpoint has a new optional parameter serverEndpointProvisioningStatus
  - Interface ServerEndpoint has a new optional parameter systemData
  - Interface ServerEndpointCloudTieringStatus has a new optional parameter lowDiskMode
  - Interface ServerEndpointCreateParameters has a new optional parameter systemData
  - Interface StorageSyncApiError has a new optional parameter innererror
  - Interface StorageSyncService has a new optional parameter identity
  - Interface StorageSyncService has a new optional parameter useIdentity
  - Interface StorageSyncService has a new optional parameter systemData
  - Interface StorageSyncServiceCreateParameters has a new optional parameter identity
  - Interface StorageSyncServiceCreateParameters has a new optional parameter useIdentity
  - Interface StorageSyncServiceCreateParameters has a new optional parameter id
  - Interface StorageSyncServiceCreateParameters has a new optional parameter name
  - Interface StorageSyncServiceCreateParameters has a new optional parameter systemData
  - Interface StorageSyncServiceCreateParameters has a new optional parameter type
  - Interface StorageSyncServiceUpdateParameters has a new optional parameter identity
  - Interface StorageSyncServiceUpdateParameters has a new optional parameter useIdentity
  - Interface SyncGroup has a new optional parameter systemData
  - Interface SyncGroupCreateParameters has a new optional parameter systemData
  - Interface TrackedResource has a new optional parameter systemData
  - Interface Workflow has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CloudTieringLowDiskModeState
  - Added Type Alias CreatedByType
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias ServerAuthType
  - Added Type Alias ServerProvisioningStatus
  - Added Type Alias Type
  - Added Enum AzureClouds
  - Added Enum KnownCloudTieringLowDiskModeState
  - Added Enum KnownCreatedByType
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownServerAuthType
  - Added Enum KnownServerProvisioningStatus
  - Added Enum KnownVersions

### Breaking Changes
  - Operation CloudEndpoints.beginDeleteAndWait has a new signature
  - Operation CloudEndpoints.beginPreBackupAndWait has a new signature
  - Operation CloudEndpoints.restoreheartbeat has a new signature
  - Operation RegisteredServers.beginDeleteAndWait has a new signature
  - Operation RegisteredServers.beginTriggerRolloverAndWait has a new signature
  - Operation ServerEndpoints.beginDeleteAndWait has a new signature
  - Operation ServerEndpoints.beginRecallActionAndWait has a new signature
  - Operation StorageSyncServices.beginDeleteAndWait has a new signature
  - Operation SyncGroups.delete has a new signature
  - Operation Workflows.abort has a new signature
  - Removed Interface CloudEndpointArray
  - Removed Interface OperationDisplayResource
  - Removed Interface OperationStatusGetOptionalParams
  - Removed Interface RegisteredServerArray
  - Removed Interface ResourcesMoveInfo
  - Removed Interface ServerEndpointArray
  - Removed Interface StorageSyncServiceArray
  - Removed Interface SubscriptionState
  - Removed Interface SyncGroupArray
  - Removed Interface WorkflowArray
  - Interface StorageSyncApiError no longer has parameter innerError
  - Removed Type Alias ProgressType
  - Removed Type Alias Reason
  - Removed Enum KnownProgressType
  - Removed Enum KnownReason

    
## 9.1.0 (2022-12-12)
    
### Features Added

  - Added Interface CloudEndpoint
  - Added Interface CloudEndpointCreateParameters
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResource
  - Added Interface RegisteredServer
  - Added Interface RegisteredServerCreateParameters
  - Added Interface ServerEndpoint
  - Added Interface ServerEndpointCreateParameters
  - Added Interface StorageSyncService
  - Added Interface SyncGroup
  - Added Interface SyncGroupCreateParameters
  - Added Interface TrackedResource
  - Added Interface Workflow
    
## 9.0.1 (2022-05-01)

### Features Added

  - Bug fix
    
## 9.0.0 (2022-01-21)

The package of @azure/arm-storagesync is using our next generation design principles since version 9.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
