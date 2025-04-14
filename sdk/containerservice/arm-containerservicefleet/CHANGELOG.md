# Release History

## 1.2.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

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
