# Release History

## 2.0.0-beta.1 (2026-11-05)
Compared with version 1.0.0

### Features Added
  - Added operation group ComputePlacementScoresOperations
  - Added operation group SkuMixPlacementScoresOperations
  - Added Interface ComputePlacementScoresBase
  - Added Interface ComputePlacementScoresGetOptionalParams
  - Added Interface ComputePlacementScoresInput
  - Added Interface ComputePlacementScoresPostOptionalParams
  - Added Interface ComputePlacementScoresResponse
  - Added Interface PlacementScoresProperties
  - Added Interface SkuMixPlacementBase
  - Added Interface SkuMixPlacementCapacityLimit
  - Added Interface SkuMixPlacementCapacityProfile
  - Added Interface SkuMixPlacementDeploymentChoice
  - Added Interface SkuMixPlacementInstanceDescription
  - Added Interface SkuMixPlacementItem
  - Added Interface SkuMixPlacementProperties
  - Added Interface SkuMixPlacementRequest
  - Added Interface SkuMixPlacementResponse
  - Added Interface SkuMixPlacementScoresGetOptionalParams
  - Added Interface SkuMixPlacementScoresPostOptionalParams
  - Added Interface SkuMixPlacementSpotPriorityProfile
  - Added Interface SkuMixPlacementVMSize
  - Added Interface SkuMixPlacementZoneAllocationPolicy
  - Added Interface SkuMixPlacementZonePreference
  - Added Interface SpotPlacementScoresBase
  - Interface PlacementScore has a new optional parameter placementPreference
  - Added Type Alias PlacementScoreValue
  - Added Type Alias SkuMixPlacementAllocationStrategy
  - Added Type Alias SkuMixPlacementCapacityLimitReason
  - Added Type Alias SkuMixPlacementCapacityType
  - Added Type Alias SkuMixPlacementOSType
  - Added Type Alias SkuMixPlacementPartialFulfillmentReason
  - Added Type Alias SkuMixPlacementPriority
  - Added Type Alias SkuMixPlacementZonalDistributionStrategy
  - Added Enum KnownPlacementScoreValue
  - Added Enum KnownSkuMixPlacementAllocationStrategy
  - Added Enum KnownSkuMixPlacementCapacityLimitReason
  - Added Enum KnownSkuMixPlacementCapacityType
  - Added Enum KnownSkuMixPlacementOSType
  - Added Enum KnownSkuMixPlacementPartialFulfillmentReason
  - Added Enum KnownSkuMixPlacementPriority
  - Added Enum KnownSkuMixPlacementZonalDistributionStrategy
  - Enum KnownVersions has a new value V20260505Preview
  - Enum KnownVersions has a new value V20260905Preview
  - Enum KnownVersions has a new value V20261005Preview

### Breaking Changes
  - Type of property spotPlacementScores of class ComputeRecommenderManagementClient has changed
  - Removed Interface ComputeDiagnosticBase
  - Removed Interface DiagnosticProperties
  - Interface PlacementScore no longer has parameter isQuotaAvailable
  - Parameter desiredSizes of interface SpotPlacementScoresInput is now required

## 1.1.0-beta.2 (2026-08-28)
Compared with version 1.0.0

### Features Added
  - Added operation group SkuMixPlacementScoresOperations
  - Added Interface SkuMixPlacementBase
  - Added Interface SkuMixPlacementCapacityLimit
  - Added Interface SkuMixPlacementCapacityProfile
  - Added Interface SkuMixPlacementDeploymentChoice
  - Added Interface SkuMixPlacementInstanceDescription
  - Added Interface SkuMixPlacementItem
  - Added Interface SkuMixPlacementProperties
  - Added Interface SkuMixPlacementRequest
  - Added Interface SkuMixPlacementResponse
  - Added Interface SkuMixPlacementScoresGetOptionalParams
  - Added Interface SkuMixPlacementScoresPostOptionalParams
  - Added Interface SkuMixPlacementSpotPriorityProfile
  - Added Interface SkuMixPlacementVMSize
  - Added Interface SkuMixPlacementZoneAllocationPolicy
  - Added Interface SkuMixPlacementZonePreference
  - Added Type Alias SkuMixPlacementAllocationStrategy
  - Added Type Alias SkuMixPlacementCapacityLimitReason
  - Added Type Alias SkuMixPlacementCapacityType
  - Added Type Alias SkuMixPlacementOSType
  - Added Type Alias SkuMixPlacementPartialFulfillmentReason
  - Added Type Alias SkuMixPlacementPriority
  - Added Type Alias SkuMixPlacementZonalDistributionStrategy
  - Added Enum KnownSkuMixPlacementAllocationStrategy
  - Added Enum KnownSkuMixPlacementCapacityLimitReason
  - Added Enum KnownSkuMixPlacementCapacityType
  - Added Enum KnownSkuMixPlacementOSType
  - Added Enum KnownSkuMixPlacementPartialFulfillmentReason
  - Added Enum KnownSkuMixPlacementPriority
  - Added Enum KnownSkuMixPlacementZonalDistributionStrategy
  - Enum KnownVersions has a new value V20260505Preview
  - Enum KnownVersions has a new value V20260905Preview

## 1.1.0-beta.1 (2026-08-03)
Compared with version 1.0.0

### Features Added
  - Added operation group SkuMixPlacementScoresOperations
  - Added Interface SkuMixPlacementBase
  - Added Interface SkuMixPlacementCapacityProfile
  - Added Interface SkuMixPlacementDeploymentChoice
  - Added Interface SkuMixPlacementInstanceDescription
  - Added Interface SkuMixPlacementItem
  - Added Interface SkuMixPlacementProperties
  - Added Interface SkuMixPlacementRequest
  - Added Interface SkuMixPlacementResponse
  - Added Interface SkuMixPlacementScoresGetOptionalParams
  - Added Interface SkuMixPlacementScoresPostOptionalParams
  - Added Interface SkuMixPlacementSpotPriorityProfile
  - Added Interface SkuMixPlacementVMSize
  - Added Interface SkuMixPlacementZoneAllocationPolicy
  - Added Interface SkuMixPlacementZonePreference
  - Added Type Alias SkuMixPlacementAllocationStrategy
  - Added Type Alias SkuMixPlacementCapacityType
  - Added Type Alias SkuMixPlacementOSType
  - Added Type Alias SkuMixPlacementPartialFulfillmentReason
  - Added Type Alias SkuMixPlacementPriority
  - Added Type Alias SkuMixPlacementZonalDistributionStrategy
  - Added Enum KnownSkuMixPlacementAllocationStrategy
  - Added Enum KnownSkuMixPlacementCapacityType
  - Added Enum KnownSkuMixPlacementOSType
  - Added Enum KnownSkuMixPlacementPartialFulfillmentReason
  - Added Enum KnownSkuMixPlacementPriority
  - Added Enum KnownSkuMixPlacementZonalDistributionStrategy
  - Enum KnownVersions has a new value V20260505Preview

    
## 1.0.0 (2025-09-25)

### Features Added

This is the first stable version with the package of @azure/arm-computerecommender
