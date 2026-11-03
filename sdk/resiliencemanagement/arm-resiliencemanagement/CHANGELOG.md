# Release History

## 1.1.0-beta.1 (2026-11-03)
Compared with version 1.0.0

### Features Added
  - Added operation group RecoveryConfigProfilesOperations
  - Added Interface CyberResiliencyGroupProperties
  - Added Interface CyberResiliencyPlanProperties
  - Added Interface CyberResiliencyResourceProperties
  - Added Interface EffectiveConfiguration
  - Added Interface FileShareRecoveryConfig
  - Added Interface InfrastructureResiliencyGroupProperties
  - Added Interface InfrastructureResiliencyPlanProperties
  - Added Interface InfrastructureResiliencyResourceProperties
  - Added Interface ProtectedItemDetails
  - Added Interface RecoveryConfigProfile
  - Added Interface RecoveryConfigProfileAssociation
  - Added Interface RecoveryConfigProfileCreateOrUpdate
  - Added Interface RecoveryConfigProfileCreateOrUpdateProperties
  - Added Interface RecoveryConfigProfileProperties
  - Added Interface RecoveryConfigProfilesCreateOrUpdateOptionalParams
  - Added Interface RecoveryConfigProfilesDeleteOptionalParams
  - Added Interface RecoveryConfigProfilesGetOptionalParams
  - Added Interface RecoveryConfigProfilesListOptionalParams
  - Added Interface RecoveryConfigProfilesUpdateOptionalParams
  - Added Interface RecoveryConfigProfileUpdate
  - Added Interface RecoveryConfigProfileUpdateProperties
  - Added Interface RecoveryGroupResiliencyProperties
  - Added Interface RecoveryPlanResiliencyProperties
  - Added Interface RecoveryPointPolicy
  - Added Interface RecoveryResourceResiliencyProperties
  - Added Interface RegionalObjectives
  - Added Interface ResourceAzureTemplateProtectionSetting
  - Added Interface ResourceCosmosDBProtectionSetting
  - Added Interface ResourceNetAppFilesProtectionSetting
  - Added Interface ResourceServiceBusProtectionSetting
  - Added Interface ResourceStorageAccountProtectionSetting
  - Added Interface TargetEnvironment
  - Added Interface TargetResourceSpec
  - Added Interface TargetScope
  - Added Interface UnifiedResilienceItemRegionalResiliencyPosture
  - Added Interface VmRecoveryConfig
  - Added Interface WorkloadConfig
  - Interface DrillResourceProperties has a new optional parameter faultEligibility
  - Interface DrillResourceProperties has a new optional parameter faultIneligibleReason
  - Interface DrillRunProperties has a new optional parameter recoveryTimeObjective
  - Interface GoalAssignmentProperties has a new optional parameter regionalObjectives
  - Interface GoalAssignmentProperties has a new optional parameter requireRegionalResiliency
  - Interface GoalResourceProperties has a new optional parameter regionalResiliency
  - Interface GoalsData has a new optional parameter regionalResiliency
  - Interface LastRunProperties has a new optional parameter lastRunRecoveryTimeActual
  - Interface RecoveryGroupProperties has a new optional parameter resiliencyGroupProperties
  - Interface RecoveryPlanProperties has a new optional parameter resiliencyPlanProperties
  - Interface RecoveryResourceProperties has a new optional parameter inclusionDisabledReasons
  - Interface RecoveryResourceProperties has a new optional parameter resiliencyResourceProperties
  - Interface RegionalDrillResourceProperties has a new optional parameter advisorRegionalRecommendationId
  - Interface RegionalDrillResourceProperties has a new optional parameter regionalResiliencyStatus
  - Interface RegionalDrillResourceProperties has a new optional parameter replicationMode
  - Interface RegionalDrillResourceProperties has a new optional parameter faultEligibility
  - Interface RegionalDrillResourceProperties has a new optional parameter faultIneligibleReason
  - Interface ResourceProtectionSolutionSettings has a new optional parameter replicationMode
  - Interface UnifiedResilienceItemResiliencyPosture has a new optional parameter regionalResiliency
  - Interface ZonalDrillResourceProperties has a new optional parameter faultEligibility
  - Interface ZonalDrillResourceProperties has a new optional parameter faultIneligibleReason
  - Added Type Alias BackupType
  - Added Type Alias CopyOptions
  - Added Type Alias FaultEligibility
  - Added Type Alias FaultIneligibleReason
  - Added Type Alias IsoDuration
  - Added Type Alias RecoveryGroupResiliencyPropertiesUnion
  - Added Type Alias RecoveryPlanResiliencyPropertiesUnion
  - Added Type Alias RecoveryPointHealthStatus
  - Added Type Alias RecoveryPointPolicyType
  - Added Type Alias RecoveryResourceInclusionEligibility
  - Added Type Alias RecoveryResourceResiliencyPropertiesUnion
  - Added Type Alias RecoveryType
  - Added Type Alias RegionalResiliencyStatus
  - Added Type Alias ReplicationMode
  - Added Type Alias ResiliencyType
  - Added Type Alias ResourceInclusionDisabledReason
  - Added Type Alias ResourceProtectionState
  - Added Type Alias TargetProvisioningMode
  - Added Type Alias WorkloadConfigUnion
  - Added Type Alias WorkloadType
  - Added Enum KnownBackupType
  - Added Enum KnownCopyOptions
  - Added Enum KnownFaultEligibility
  - Added Enum KnownFaultIneligibleReason
  - Added Enum KnownIsoDuration
  - Added Enum KnownRecoveryPointHealthStatus
  - Added Enum KnownRecoveryPointPolicyType
  - Added Enum KnownRecoveryResourceInclusionEligibility
  - Added Enum KnownRecoveryType
  - Added Enum KnownRegionalResiliencyStatus
  - Added Enum KnownReplicationMode
  - Added Enum KnownResiliencyType
  - Added Enum KnownResourceInclusionDisabledReason
  - Added Enum KnownResourceProtectionState
  - Added Enum KnownTargetProvisioningMode
  - Added Enum KnownWorkloadType
  - Enum KnownRecoveryPlanType has a new value CyberRecovery
  - Enum KnownResourceProtectionSolutionType has a new value AzureCosmosDB
  - Enum KnownResourceProtectionSolutionType has a new value AzureNetAppFiles
  - Enum KnownResourceProtectionSolutionType has a new value AzureServiceBus
  - Enum KnownResourceProtectionSolutionType has a new value AzureStorageAccount
  - Enum KnownResourceProtectionSolutionType has a new value AzureTemplate
  - Enum KnownVersions has a new value V20250201Preview
  - Enum KnownVersions has a new value V20260301Preview
  - Enum KnownVersions has a new value V20260401Preview
  - Enum KnownVersions has a new value V20260601Preview
  - Enum KnownVersions has a new value V20260831Preview
  - Enum KnownVersions has a new value V20260930Preview
  - Enum KnownVersions has a new value V20261031Preview
  - Enum KnownVersions has a new value V20261130Preview

    
## 1.0.0 (2026-10-09)

### Features Added

This is the first stable release of the @azure/arm-resiliencemanagement package. It introduces a new SDK generation with layered APIs, smaller bundles, and improved ergonomics. For more details, see the https://aka.ms/azsdk/js/sdk/quickstart.
