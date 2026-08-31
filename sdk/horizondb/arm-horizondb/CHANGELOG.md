# Release History

## 1.0.0-beta.2 (2026-08-20)
Compared with version 1.0.0-beta.1

### Features Added
  - Added operation group HorizonDbAdministratorsOperations
  - Added operation HorizonDbClustersOperations.beginRestart
  - Added operation HorizonDbClustersOperations.beginRestartAndWait
  - Added operation HorizonDbClustersOperations.beginStart
  - Added operation HorizonDbClustersOperations.beginStartAndWait
  - Added operation HorizonDbClustersOperations.beginStop
  - Added operation HorizonDbClustersOperations.beginStopAndWait
  - Added operation HorizonDbClustersOperations.restart
  - Added operation HorizonDbClustersOperations.start
  - Added operation HorizonDbClustersOperations.stop
  - Added operation HorizonDbPrivateEndpointConnectionsOperations.updateStatus
  - Added Interface HorizonDbAdministrator
  - Added Interface HorizonDbAdministratorAdd
  - Added Interface HorizonDbAdministratorProperties
  - Added Interface HorizonDbAdministratorPropertiesForAdd
  - Added Interface HorizonDbAdministratorsCreateOrUpdateOptionalParams
  - Added Interface HorizonDbAdministratorsDeleteOptionalParams
  - Added Interface HorizonDbAdministratorsGetOptionalParams
  - Added Interface HorizonDbAdministratorsListOptionalParams
  - Added Interface HorizonDbClusterAuthConfig
  - Added Interface HorizonDbClusterMirroring
  - Added Interface HorizonDbClustersRestartOptionalParams
  - Added Interface HorizonDbClustersStartOptionalParams
  - Added Interface HorizonDbClustersStopOptionalParams
  - Added Interface HorizonDbComputeModel
  - Added Interface HorizonDbPrivateEndpointConnectionsUpdateStatusOptionalParams
  - Added Interface ManagedServiceIdentity
  - Added Interface UserAssignedIdentity
  - Interface HorizonDbCluster has a new optional parameter identity
  - Interface HorizonDbClusterForPatchUpdate has a new optional parameter identity
  - Interface HorizonDbClusterProperties has a new optional parameter authConfig
  - Interface HorizonDbClusterProperties has a new optional parameter computeModel
  - Interface HorizonDbClusterProperties has a new optional parameter mirroring
  - Interface HorizonDbClusterPropertiesForPatchUpdate has a new optional parameter authConfig
  - Interface HorizonDbClusterPropertiesForPatchUpdate has a new optional parameter computeModel
  - Interface HorizonDbClusterPropertiesForPatchUpdate has a new optional parameter mirroring
  - Added Type Alias AuthenticationState
  - Added Type Alias HorizonDbComputeModelType
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias PrincipalTypes
  - Added Enum KnownAuthenticationState
  - Added Enum KnownHorizonDbComputeModelType
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownPrincipalTypes
  - Enum KnownState has a new value Succeeded
  - Enum KnownState has a new value Upgrading
  - Enum KnownVersions has a new value V20260501Preview

### Breaking Changes
  - Removed operation HorizonDbPrivateEndpointConnectionsOperations.beginUpdate
  - Removed operation HorizonDbPrivateEndpointConnectionsOperations.beginUpdateAndWait
  - Removed operation HorizonDbPrivateEndpointConnectionsOperations.update
  - Operation HorizonDbPrivateEndpointConnectionsOperations.beginDelete has a new signature
  - Operation HorizonDbPrivateEndpointConnectionsOperations.beginDeleteAndWait has a new signature
  - Operation HorizonDbPrivateEndpointConnectionsOperations.delete has a new signature
  - Removed Interface HorizonDbPrivateEndpointConnectionsUpdateOptionalParams
  - Removed Interface OptionalPropertiesUpdateableProperties
  - Removed Interface PrivateEndpointConnection
  - Removed Interface PrivateEndpointConnectionUpdate

    
## 1.0.0-beta.1 (2026-04-22)

### Features Added

Initial release of the @azure/arm-horizondb package
