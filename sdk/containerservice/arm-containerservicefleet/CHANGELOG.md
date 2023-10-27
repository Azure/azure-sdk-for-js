# Release History

## 1.0.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.3 (2023-10-07)
    
**Features**

  - Added operation group FleetUpdateStrategies
  - Added Interface FleetUpdateStrategiesCreateOrUpdateHeaders
  - Added Interface FleetUpdateStrategiesCreateOrUpdateOptionalParams
  - Added Interface FleetUpdateStrategiesDeleteHeaders
  - Added Interface FleetUpdateStrategiesDeleteOptionalParams
  - Added Interface FleetUpdateStrategiesGetOptionalParams
  - Added Interface FleetUpdateStrategiesListByFleetNextOptionalParams
  - Added Interface FleetUpdateStrategiesListByFleetOptionalParams
  - Added Interface FleetUpdateStrategy
  - Added Interface FleetUpdateStrategyListResult
  - Added Type Alias FleetUpdateStrategiesCreateOrUpdateResponse
  - Added Type Alias FleetUpdateStrategiesGetResponse
  - Added Type Alias FleetUpdateStrategiesListByFleetNextResponse
  - Added Type Alias FleetUpdateStrategiesListByFleetResponse
  - Added Type Alias FleetUpdateStrategyProvisioningState
  - Interface AgentProfile has a new optional parameter vmSize
  - Interface FleetHubProfile has a new optional parameter portalFqdn
  - Interface UpdateRun has a new optional parameter updateStrategyId
  - Added Enum KnownFleetUpdateStrategyProvisioningState
    
    
## 1.0.0-beta.2 (2023-09-08)
    
**Features**

  - Added operation FleetMembers.beginUpdate
  - Added operation FleetMembers.beginUpdateAndWait
  - Added operation Fleets.beginUpdate
  - Added operation Fleets.beginUpdateAndWait
  - Added Interface AgentProfile
  - Added Interface APIServerAccessProfile
  - Added Interface FleetMembersUpdateHeaders
  - Added Interface FleetsUpdateHeaders
  - Added Interface ManagedServiceIdentity
  - Added Interface NodeImageSelection
  - Added Interface NodeImageSelectionStatus
  - Added Interface NodeImageVersion
  - Added Interface UserAssignedIdentity
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias NodeImageSelectionType
  - Interface Fleet has a new optional parameter identity
  - Interface FleetHubProfile has a new optional parameter agentProfile
  - Interface FleetHubProfile has a new optional parameter apiServerAccessProfile
  - Interface FleetMembersUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface FleetMembersUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface FleetPatch has a new optional parameter identity
  - Interface FleetsUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface FleetsUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface ManagedClusterUpdate has a new optional parameter nodeImageSelection
  - Interface MemberUpdateStatus has a new optional parameter message
  - Interface UpdateRunStatus has a new optional parameter nodeImageSelection
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownNodeImageSelectionType
  - Enum KnownUpdateState has a new value Skipped

**Breaking Changes**

  - Removed operation FleetMembers.update
  - Removed operation Fleets.update
    
    
## 1.0.0-beta.1 (2023-06-01)

The package of @azure/arm-containerservicefleet is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
