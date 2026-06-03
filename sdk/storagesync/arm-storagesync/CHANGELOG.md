# Release History

## 10.0.0-beta.1 (2026-06-03)
Compared with version 9.1.0

### Features Added
  - Added operation CloudEndpointsOperations.afsShareMetadataCertificatePublicKeys
  - Added operation CloudEndpointsOperations.create
  - Added operation CloudEndpointsOperations.delete
  - Added operation CloudEndpointsOperations.postBackup
  - Added operation CloudEndpointsOperations.postRestore
  - Added operation CloudEndpointsOperations.preBackup
  - Added operation CloudEndpointsOperations.preRestore
  - Added operation CloudEndpointsOperations.restoreHeartbeat
  - Added operation CloudEndpointsOperations.triggerChangeDetection
  - Added operation PrivateEndpointConnectionsOperations.create
  - Added operation PrivateEndpointConnectionsOperations.delete
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
  - Added Interface CloudEndpointsRestoreHeartbeatOptionalParams
  - Added Interface CloudTieringLowDiskMode
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface ManagedServiceIdentity
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
  - Interface PrivateLinkResource has a new optional parameter properties
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
  - Removed operation CloudEndpoints.beginCreate
  - Removed operation CloudEndpoints.beginCreateAndWait
  - Removed operation CloudEndpoints.beginDelete
  - Removed operation CloudEndpoints.beginDeleteAndWait
  - Removed operation CloudEndpoints.beginPostBackup
  - Removed operation CloudEndpoints.beginPostBackupAndWait
  - Removed operation CloudEndpoints.beginPostRestore
  - Removed operation CloudEndpoints.beginPostRestoreAndWait
  - Removed operation CloudEndpoints.beginPreBackup
  - Removed operation CloudEndpoints.beginPreBackupAndWait
  - Removed operation CloudEndpoints.beginPreRestore
  - Removed operation CloudEndpoints.beginPreRestoreAndWait
  - Removed operation CloudEndpoints.beginTriggerChangeDetection
  - Removed operation CloudEndpoints.beginTriggerChangeDetectionAndWait
  - Removed operation CloudEndpoints.restoreheartbeat
  - Removed operation PrivateEndpointConnections.beginCreate
  - Removed operation PrivateEndpointConnections.beginCreateAndWait
  - Removed operation PrivateEndpointConnections.beginDelete
  - Removed operation PrivateEndpointConnections.beginDeleteAndWait
  - Removed operation RegisteredServers.beginCreate
  - Removed operation RegisteredServers.beginCreateAndWait
  - Removed operation RegisteredServers.beginDelete
  - Removed operation RegisteredServers.beginDeleteAndWait
  - Removed operation RegisteredServers.beginTriggerRollover
  - Removed operation RegisteredServers.beginTriggerRolloverAndWait
  - Removed operation ServerEndpoints.beginCreate
  - Removed operation ServerEndpoints.beginCreateAndWait
  - Removed operation ServerEndpoints.beginDelete
  - Removed operation ServerEndpoints.beginDeleteAndWait
  - Removed operation ServerEndpoints.beginRecallAction
  - Removed operation ServerEndpoints.beginRecallActionAndWait
  - Removed operation ServerEndpoints.beginUpdate
  - Removed operation ServerEndpoints.beginUpdateAndWait
  - Removed operation StorageSyncServices.beginCreate
  - Removed operation StorageSyncServices.beginCreateAndWait
  - Removed operation StorageSyncServices.beginDelete
  - Removed operation StorageSyncServices.beginDeleteAndWait
  - Removed operation StorageSyncServices.beginUpdate
  - Removed operation StorageSyncServices.beginUpdateAndWait
  - Operation SyncGroups.delete has a new signature
  - Operation Workflows.abort has a new signature
  - Class MicrosoftStorageSync no longer has parameter apiVersion
  - Class MicrosoftStorageSync no longer has parameter operationStatusOperations
  - Class MicrosoftStorageSync no longer has parameter subscriptionId
  - Removed Interface CloudEndpointArray
  - Removed Interface CloudEndpointsRestoreheartbeatOptionalParams
  - Removed Interface OperationDisplayResource
  - Removed Interface RegisteredServerArray
  - Removed Interface ResourcesMoveInfo
  - Removed Interface ServerEndpointArray
  - Removed Interface StorageSyncServiceArray
  - Removed Interface SubscriptionState
  - Removed Interface SyncGroupArray
  - Removed Interface WorkflowArray
  - Interface PrivateLinkResource no longer has parameter groupId
  - Interface PrivateLinkResource no longer has parameter requiredMembers
  - Interface PrivateLinkResource no longer has parameter requiredZoneNames
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
