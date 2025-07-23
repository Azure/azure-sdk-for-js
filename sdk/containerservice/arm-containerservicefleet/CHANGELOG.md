# Release History
    
## 2.0.0 (2025-04-16)
    
### Features Added

  - Added operation group AutoUpgradeProfileOperationsOperations
  - Added operation group AutoUpgradeProfilesOperations
  - Added operation FleetMembersOperations.create
  - Added operation FleetMembersOperations.delete
  - Added operation FleetMembersOperations.updateAsync
  - Added operation FleetsOperations.create
  - Added operation FleetsOperations.delete
  - Added operation FleetsOperations.updateAsync
  - Added operation FleetUpdateStrategiesOperations.createOrUpdate
  - Added operation FleetUpdateStrategiesOperations.delete
  - Added operation UpdateRunsOperations.createOrUpdate
  - Added operation UpdateRunsOperations.delete
  - Added operation UpdateRunsOperations.skip
  - Added operation UpdateRunsOperations.start
  - Added operation UpdateRunsOperations.stop
  - Added Interface AutoUpgradeNodeImageSelection
  - Added Interface AutoUpgradeProfile
  - Added Interface AutoUpgradeProfileOperationsGenerateUpdateRunOptionalParams
  - Added Interface AutoUpgradeProfileProperties
  - Added Interface AutoUpgradeProfilesCreateOrUpdateOptionalParams
  - Added Interface AutoUpgradeProfilesDeleteOptionalParams
  - Added Interface AutoUpgradeProfilesGetOptionalParams
  - Added Interface AutoUpgradeProfilesListByFleetOptionalParams
  - Added Interface AutoUpgradeProfileStatus
  - Added Interface FleetMemberProperties
  - Added Interface FleetMemberStatus
  - Added Interface FleetMembersUpdateAsyncOptionalParams
  - Added Interface FleetMemberUpdateProperties
  - Added Interface FleetProperties
  - Added Interface FleetsCreateOptionalParams
  - Added Interface FleetStatus
  - Added Interface FleetsUpdateAsyncOptionalParams
  - Added Interface FleetUpdateStrategyProperties
  - Added Interface GenerateResponse
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface UpdateRunProperties
  - Added Type Alias AutoUpgradeLastTriggerStatus
  - Added Type Alias AutoUpgradeNodeImageSelectionType
  - Added Type Alias AutoUpgradeProfileProvisioningState
  - Added Type Alias ContinuablePage
  - Added Type Alias UpgradeChannel
  - Interface APIServerAccessProfile has a new optional parameter enableVnetIntegration
  - Interface APIServerAccessProfile has a new optional parameter subnetId
  - Interface Fleet has a new optional parameter properties
  - Interface FleetMember has a new optional parameter properties
  - Interface FleetMemberUpdate has a new optional parameter properties
  - Interface FleetUpdateStrategy has a new optional parameter properties
  - Interface NodeImageSelection has a new optional parameter customNodeImageVersions
  - Interface UpdateRun has a new optional parameter properties
  - Added Enum KnownAutoUpgradeLastTriggerStatus
  - Added Enum KnownAutoUpgradeNodeImageSelectionType
  - Added Enum KnownAutoUpgradeProfileProvisioningState
  - Added Enum KnownUpgradeChannel
  - Added Enum KnownVersions
  - Enum KnownManagedServiceIdentityType has a new value SystemAndUserAssigned
  - Enum KnownNodeImageSelectionType has a new value Custom
  - Added function restorePoller
  - Type of parameter info of interface ErrorAdditionalInfo is changed from Record<string, unknown> to Record<string, any>
  - Type of parameter tags of interface FleetPatch is changed from {
        [propertyName: string]: string;
    } to Record<string, string>
  - Type of parameter userAssignedIdentities of interface ManagedServiceIdentity is changed from {
        [propertyName: string]: UserAssignedIdentity;
    } to Record<string, UserAssignedIdentity>
  - Type of parameter tags of interface TrackedResource is changed from {
        [propertyName: string]: string;
    } to Record<string, string>

### Breaking Changes

  - Removed operation FleetMembers.beginCreate
  - Removed operation FleetMembers.beginCreateAndWait
  - Removed operation FleetMembers.beginDelete
  - Removed operation FleetMembers.beginDeleteAndWait
  - Removed operation FleetMembers.beginUpdate
  - Removed operation FleetMembers.beginUpdateAndWait
  - Removed operation Fleets.beginCreateOrUpdate
  - Removed operation Fleets.beginCreateOrUpdateAndWait
  - Removed operation Fleets.beginDelete
  - Removed operation Fleets.beginDeleteAndWait
  - Removed operation Fleets.beginUpdate
  - Removed operation Fleets.beginUpdateAndWait
  - Removed operation FleetUpdateStrategies.beginCreateOrUpdate
  - Removed operation FleetUpdateStrategies.beginCreateOrUpdateAndWait
  - Removed operation FleetUpdateStrategies.beginDelete
  - Removed operation FleetUpdateStrategies.beginDeleteAndWait
  - Removed operation UpdateRuns.beginCreateOrUpdate
  - Removed operation UpdateRuns.beginCreateOrUpdateAndWait
  - Removed operation UpdateRuns.beginDelete
  - Removed operation UpdateRuns.beginDeleteAndWait
  - Removed operation UpdateRuns.beginSkip
  - Removed operation UpdateRuns.beginSkipAndWait
  - Removed operation UpdateRuns.beginStart
  - Removed operation UpdateRuns.beginStartAndWait
  - Removed operation UpdateRuns.beginStop
  - Removed operation UpdateRuns.beginStopAndWait
  - Class ContainerServiceFleetClient has a new signature
  - Interface ContainerServiceFleetClientOptionalParams no longer has parameter $host
  - Interface ContainerServiceFleetClientOptionalParams no longer has parameter endpoint
  - Interface Fleet no longer has parameter hubProfile
  - Interface Fleet no longer has parameter provisioningState
  - Interface FleetMember no longer has parameter clusterResourceId
  - Interface FleetMember no longer has parameter group
  - Interface FleetMember no longer has parameter provisioningState
  - Interface FleetMembersCreateOptionalParams no longer has parameter resumeFrom
  - Interface FleetMembersDeleteOptionalParams no longer has parameter resumeFrom
  - Interface FleetMemberUpdate no longer has parameter group
  - Interface FleetsDeleteOptionalParams no longer has parameter resumeFrom
  - Interface FleetUpdateStrategiesCreateOrUpdateOptionalParams no longer has parameter resumeFrom
  - Interface FleetUpdateStrategiesDeleteOptionalParams no longer has parameter resumeFrom
  - Interface FleetUpdateStrategy no longer has parameter provisioningState
  - Interface FleetUpdateStrategy no longer has parameter strategy
  - Interface UpdateRun no longer has parameter managedClusterUpdate
  - Interface UpdateRun no longer has parameter provisioningState
  - Interface UpdateRun no longer has parameter status
  - Interface UpdateRun no longer has parameter strategy
  - Interface UpdateRun no longer has parameter updateStrategyId
  - Interface UpdateRunsCreateOrUpdateOptionalParams no longer has parameter resumeFrom
  - Interface UpdateRunsDeleteOptionalParams no longer has parameter resumeFrom
  - Interface UpdateRunsSkipOptionalParams no longer has parameter resumeFrom
  - Interface UpdateRunsStartOptionalParams no longer has parameter resumeFrom
  - Interface UpdateRunsStopOptionalParams no longer has parameter resumeFrom
  - Class ContainerServiceFleetClient no longer has parameter $host
  - Class ContainerServiceFleetClient no longer has parameter apiVersion
  - Class ContainerServiceFleetClient no longer has parameter subscriptionId
  - Enum KnownManagedServiceIdentityType no longer has value SystemAssignedUserAssigned
  - Removed function getContinuationToken
    
    
## 1.2.0-beta.1 (2024-10-15)
Compared with version 1.1.0
    
### Features Added

  - Added operation group AutoUpgradeProfiles
  - Added Interface AutoUpgradeNodeImageSelection
  - Added Interface AutoUpgradeProfile
  - Added Interface AutoUpgradeProfileListResult
  - Added Interface AutoUpgradeProfilesCreateOrUpdateHeaders
  - Added Interface AutoUpgradeProfilesCreateOrUpdateOptionalParams
  - Added Interface AutoUpgradeProfilesDeleteHeaders
  - Added Interface AutoUpgradeProfilesDeleteOptionalParams
  - Added Interface AutoUpgradeProfilesGetOptionalParams
  - Added Interface AutoUpgradeProfilesListByFleetNextOptionalParams
  - Added Interface AutoUpgradeProfilesListByFleetOptionalParams
  - Added Type Alias AutoUpgradeNodeImageSelectionType
  - Added Type Alias AutoUpgradeProfileProvisioningState
  - Added Type Alias AutoUpgradeProfilesCreateOrUpdateResponse
  - Added Type Alias AutoUpgradeProfilesDeleteResponse
  - Added Type Alias AutoUpgradeProfilesGetResponse
  - Added Type Alias AutoUpgradeProfilesListByFleetNextResponse
  - Added Type Alias AutoUpgradeProfilesListByFleetResponse
  - Added Type Alias UpgradeChannel
  - Interface APIServerAccessProfile has a new optional parameter enableVnetIntegration
  - Interface APIServerAccessProfile has a new optional parameter subnetId
  - Interface NodeImageSelection has a new optional parameter customNodeImageVersions
  - Added Enum KnownAutoUpgradeNodeImageSelectionType
  - Added Enum KnownAutoUpgradeProfileProvisioningState
  - Added Enum KnownUpgradeChannel
  - Enum KnownNodeImageSelectionType has a new value Custom
    
    
## 1.1.0 (2024-05-15)
    
### Features Added

  - Added operation UpdateRuns.beginSkip
  - Added operation UpdateRuns.beginSkipAndWait
  - Added Interface AgentProfile
  - Added Interface APIServerAccessProfile
  - Added Interface FleetHubProfile
  - Added Interface SkipProperties
  - Added Interface SkipTarget
  - Added Interface UpdateRunsSkipHeaders
  - Added Interface UpdateRunsSkipOptionalParams
  - Added Type Alias TargetType
  - Added Type Alias UpdateRunsSkipResponse
  - Interface Fleet has a new optional parameter hubProfile
  - Added Enum KnownTargetType
  - Enum KnownManagedClusterUpgradeType has a new value ControlPlaneOnly
    
    
## 1.1.0-beta.1 (2024-04-03)
    
### Features Added

  - Added operation UpdateRuns.beginSkip
  - Added operation UpdateRuns.beginSkipAndWait
  - Added Interface AgentProfile
  - Added Interface APIServerAccessProfile
  - Added Interface FleetHubProfile
  - Added Interface SkipProperties
  - Added Interface SkipTarget
  - Added Interface UpdateRunsSkipHeaders
  - Added Interface UpdateRunsSkipOptionalParams
  - Added Type Alias TargetType
  - Added Type Alias UpdateRunsSkipResponse
  - Interface Fleet has a new optional parameter hubProfile
  - Added Enum KnownTargetType
  - Enum KnownManagedClusterUpgradeType has a new value ControlPlaneOnly
    
    
## 1.0.0 (2023-10-27)

The package of @azure/arm-containerservicefleet is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
