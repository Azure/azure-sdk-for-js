# Release History

## 3.3.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 3.3.1 (2025-08-22)

### Other Changes

  - Other fixes

## 3.3.0 (2023-03-01)
    
### Features Added

  - Added Type Alias CleanupConnectionArtifacts
  - Added Type Alias RecordPropertyAndItemRemovals
  - Interface AzureDataExplorerConnectionProperties has a new optional parameter adxRelationshipLifecycleEventsTableName
  - Interface AzureDataExplorerConnectionProperties has a new optional parameter adxTwinLifecycleEventsTableName
  - Interface AzureDataExplorerConnectionProperties has a new optional parameter recordPropertyAndItemRemovals
  - Interface TimeSeriesDatabaseConnectionsDeleteOptionalParams has a new optional parameter cleanupConnectionArtifacts
  - Added Enum KnownCleanupConnectionArtifacts
  - Added Enum KnownRecordPropertyAndItemRemovals
    
    
## 3.2.0 (2022-11-30)
    
### Features Added

  - Added Interface AzureDataExplorerConnectionProperties
  - Added Interface ConnectionPropertiesPrivateLinkServiceConnectionState
  - Added Interface DigitalTwinsDescription
  - Added Interface DigitalTwinsEndpointResource
  - Added Interface EventGrid
  - Added Interface EventHub
  - Added Interface ManagedIdentityReference
  - Added Interface ServiceBus
  - Added Interface TimeSeriesDatabaseConnection
  - Added Interface UserAssignedIdentity
  - Added Type Alias ConnectionType
  - Added Type Alias IdentityType
  - Interface DigitalTwinsEndpointResourceProperties has a new optional parameter identity
  - Interface DigitalTwinsIdentity has a new optional parameter userAssignedIdentities
  - Interface TimeSeriesDatabaseConnectionProperties has a new optional parameter identity
  - Added Enum KnownIdentityType
  - Enum KnownDigitalTwinsIdentityType has a new value SystemAssignedUserAssigned
  - Enum KnownDigitalTwinsIdentityType has a new value UserAssigned
    
    
## 3.1.0 (2022-06-22)
    
### Features Added

  - Added operation group TimeSeriesDatabaseConnections
  - Added Interface GroupIdInformationProperties
  - Added Interface SystemData
  - Added Interface TimeSeriesDatabaseConnectionListResult
  - Added Interface TimeSeriesDatabaseConnectionProperties
  - Added Interface TimeSeriesDatabaseConnectionsCreateOrUpdateOptionalParams
  - Added Interface TimeSeriesDatabaseConnectionsDeleteOptionalParams
  - Added Interface TimeSeriesDatabaseConnectionsGetOptionalParams
  - Added Interface TimeSeriesDatabaseConnectionsListNextOptionalParams
  - Added Interface TimeSeriesDatabaseConnectionsListOptionalParams
  - Added Type Alias AzureDataExplorerConnectionProperties
  - Added Type Alias ConnectionType_2
  - Added Type Alias CreatedByType
  - Added Type Alias TimeSeriesDatabaseConnection
  - Added Type Alias TimeSeriesDatabaseConnectionPropertiesUnion
  - Added Type Alias TimeSeriesDatabaseConnectionsCreateOrUpdateResponse
  - Added Type Alias TimeSeriesDatabaseConnectionsDeleteResponse
  - Added Type Alias TimeSeriesDatabaseConnectionsGetResponse
  - Added Type Alias TimeSeriesDatabaseConnectionsListNextResponse
  - Added Type Alias TimeSeriesDatabaseConnectionsListResponse
  - Added Type Alias TimeSeriesDatabaseConnectionState
  - Interface DigitalTwinsResource has a new optional parameter systemData
  - Interface ExternalResource has a new optional parameter systemData
  - Interface Operation has a new optional parameter properties
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Class AzureDigitalTwinsManagementClient has a new parameter timeSeriesDatabaseConnections
  - Added Enum KnownConnectionType
  - Added Enum KnownCreatedByType
  - Added Enum KnownTimeSeriesDatabaseConnectionState
  - Enum KnownEndpointProvisioningState has a new value Updating
    
    
## 3.0.0 (2022-01-13)

The package of @azure/arm-digitaltwins is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
