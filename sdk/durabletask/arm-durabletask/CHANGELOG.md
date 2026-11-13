# Release History

## 1.2.0-beta.1 (2026-10-20)
Compared with version 1.1.0

### Features Added
  - Added operation group DetectorsOperations
  - Added operation group FailoverInstancesOperations
  - Added operation group TaskQueuesOperations
  - Added operation group TransparentDataEncryptionsOperations
  - Added operation SchedulersOperations.restart
  - Added Interface Detector
  - Added Interface DetectorDataset
  - Added Interface DetectorMetadata
  - Added Interface DetectorProperties
  - Added Interface DetectorRenderingProperties
  - Added Interface DetectorsGetOptionalParams
  - Added Interface DetectorsListBySchedulerOptionalParams
  - Added Interface DetectorStatus
  - Added Interface DetectorTable
  - Added Interface DetectorTableColumn
  - Added Interface FailoverInstance
  - Added Interface FailoverInstanceProperties
  - Added Interface FailoverInstancesCreateOrReplaceOptionalParams
  - Added Interface FailoverInstancesDeleteOptionalParams
  - Added Interface FailoverInstancesFailoverOptionalParams
  - Added Interface FailoverInstancesForceFailoverAllowDataLossOptionalParams
  - Added Interface FailoverInstancesGetOptionalParams
  - Added Interface FailoverInstancesListBySchedulerOptionalParams
  - Added Interface ManagedServiceIdentity
  - Added Interface SchedulersRestartOptionalParams
  - Added Interface TaskQueue
  - Added Interface TaskQueueProperties
  - Added Interface TaskQueuesCreateOrUpdateOptionalParams
  - Added Interface TaskQueuesDeleteOptionalParams
  - Added Interface TaskQueuesGetOptionalParams
  - Added Interface TaskQueuesListByTaskHubOptionalParams
  - Added Interface TaskQueuesUpdateOptionalParams
  - Added Interface TaskQueueThroughput
  - Added Interface TaskQueueUpdate
  - Added Interface TransparentDataEncryption
  - Added Interface TransparentDataEncryptionProperties
  - Added Interface TransparentDataEncryptionsCreateOrReplaceOptionalParams
  - Added Interface TransparentDataEncryptionsDeleteOptionalParams
  - Added Interface TransparentDataEncryptionsGetOptionalParams
  - Added Interface TransparentDataEncryptionsListBySchedulerOptionalParams
  - Added Interface UserAssignedIdentity
  - Interface Scheduler has a new optional parameter identity
  - Interface SchedulerUpdate has a new optional parameter identity
  - Interface TaskHubProperties has a new optional parameter capabilities
  - Added Type Alias DetectorRenderingType
  - Added Type Alias DetectorStatusId
  - Added Type Alias DetectorType
  - Added Type Alias FailoverState
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias ReplicationRole
  - Added Type Alias TransparentDataEncryptionKeySource
  - Added Enum KnownDetectorRenderingType
  - Added Enum KnownDetectorStatusId
  - Added Enum KnownDetectorType
  - Added Enum KnownFailoverState
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownReplicationRole
  - Added Enum KnownTransparentDataEncryptionKeySource
  - Enum KnownVersions has a new value V20241001Preview
  - Enum KnownVersions has a new value V20250401Preview
  - Enum KnownVersions has a new value V20260501Preview
  - Enum KnownVersions has a new value V20260701Preview

## 1.1.0 (2026-03-09)

### Features Added
  - Added operation SchedulersOperations.createOrUpdatePrivateEndpointConnection
  - Added operation SchedulersOperations.deletePrivateEndpointConnection
  - Added operation SchedulersOperations.getPrivateEndpointConnection
  - Added operation SchedulersOperations.getPrivateLink
  - Added operation SchedulersOperations.listPrivateEndpointConnections
  - Added operation SchedulersOperations.listPrivateLinks
  - Added operation SchedulersOperations.updatePrivateEndpointConnection
  - Added Interface OptionalPropertiesUpdateableProperties
  - Added Interface PrivateEndpoint
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateEndpointConnectionUpdate
  - Added Interface PrivateLinkResourceProperties
  - Added Interface PrivateLinkServiceConnectionState
  - Added Interface SchedulerPrivateLinkResource
  - Added Interface SchedulersCreateOrUpdatePrivateEndpointConnectionOptionalParams
  - Added Interface SchedulersDeletePrivateEndpointConnectionOptionalParams
  - Added Interface SchedulersGetPrivateEndpointConnectionOptionalParams
  - Added Interface SchedulersGetPrivateLinkOptionalParams
  - Added Interface SchedulersListPrivateEndpointConnectionsOptionalParams
  - Added Interface SchedulersListPrivateLinksOptionalParams
  - Added Interface SchedulersUpdatePrivateEndpointConnectionOptionalParams
  - Interface SchedulerProperties has a new optional parameter privateEndpointConnections
  - Interface SchedulerProperties has a new optional parameter publicNetworkAccess
  - Interface SchedulerPropertiesUpdate has a new optional parameter publicNetworkAccess
  - Added Type Alias PrivateEndpointConnectionProvisioningState
  - Added Type Alias PrivateEndpointServiceConnectionStatus
  - Added Type Alias PublicNetworkAccess
  - Added Enum KnownPrivateEndpointConnectionProvisioningState
  - Added Enum KnownPrivateEndpointServiceConnectionStatus
  - Added Enum KnownPublicNetworkAccess
  - Enum KnownVersions has a new value V20260201

    
## 1.0.0 (2025-09-25)

### Features Added

This is the first stable version with the package of @azure/arm-durabletask
