# Release History

## 1.0.0-beta.2 (2026-08-26)
Compared with version 1.0.0-beta.1

### Features Added
  - Added operation DrillRunsOperations.beginGenerateReport
  - Added operation DrillRunsOperations.beginGenerateReportAndWait
  - Added operation DrillRunsOperations.beginListReportDownloadUrl
  - Added operation DrillRunsOperations.beginListReportDownloadUrlAndWait
  - Added operation DrillRunsOperations.generateReport
  - Added operation DrillRunsOperations.listReportDownloadUrl
  - Added Interface DrillReportSummary
  - Added Interface DrillRunReprotectRequest
  - Added Interface DrillRunsGenerateReportOptionalParams
  - Added Interface DrillRunsListReportDownloadUrlOptionalParams
  - Added Interface HealthModelMonitoringProperties
  - Added Interface ListReportDownloadUrlRequest
  - Added Interface ReportStageStatus
  - Added Interface ResiliencyProperties
  - Added Interface ResourceCrossZoneVmRecoveryProtectionSetting
  - Added Interface ResourceFeasibilityReview
  - Added Interface SkuDetails
  - Added Interface SliAttentionStatus
  - Added Interface SliMonitoringProperties
  - Added Interface SliSelection
  - Added Interface UserConfirmationItem
  - Interface AttentionReason has a new optional parameter discoveryRuleExists
  - Interface AttentionReason has a new optional parameter drillRbacOnHealthModel
  - Interface AttentionReason has a new optional parameter drillRbacOnSli
  - Interface AttentionReason has a new optional parameter healthModelExists
  - Interface AttentionReason has a new optional parameter monitoringSourceNotConfigured
  - Interface AttentionReason has a new optional parameter rbacNeededForDrillOnHealthModel
  - Interface AttentionReason has a new optional parameter sliAttentionStatuses
  - Interface DrillProperties has a new optional parameter healthModelMonitoringProperties
  - Interface DrillProperties has a new optional parameter sliMonitoringProperties
  - Interface DrillRunProperties has a new optional parameter report
  - Interface DrillRunsFailOverOptionalParams has a new optional parameter body
  - Interface DrillRunsReprotectOptionalParams has a new optional parameter body
  - Interface DrillUpdateProperties has a new optional parameter healthModelMonitoringProperties
  - Interface DrillUpdateProperties has a new optional parameter sliMonitoringProperties
  - Interface GoalAssignmentProperties has a new optional parameter requireZonalResiliency
  - Interface GoalResourceProperties has a new optional parameter zonalResiliency
  - Interface OperationQualificationDetails has a new optional parameter resourceFeasibilityReviews
  - Interface RegionalDrillProperties has a new optional parameter healthModelMonitoringProperties
  - Interface RegionalDrillProperties has a new optional parameter sliMonitoringProperties
  - Interface ValidateForExecutionProperties has a new optional parameter operationName
  - Interface ZonalDrillProperties has a new optional parameter healthModelMonitoringProperties
  - Interface ZonalDrillProperties has a new optional parameter sliMonitoringProperties
  - Added Type Alias DrillReportFinalizationState
  - Added Type Alias DrillReportFormat
  - Added Type Alias DrillReportGenerationStatus
  - Added Type Alias DrillRunTasks
  - Added Type Alias ResourceFeasibilityReviewStatus
  - Added Type Alias ResourceFeasibilityReviewType
  - Added Type Alias SliType
  - Added Type Alias SliTypeMatchState
  - Added Enum KnownDrillReportFinalizationState
  - Added Enum KnownDrillReportFormat
  - Added Enum KnownDrillReportGenerationStatus
  - Added Enum KnownDrillRunTasks
  - Added Enum KnownResourceFeasibilityReviewStatus
  - Added Enum KnownResourceFeasibilityReviewType
  - Added Enum KnownSliType
  - Added Enum KnownSliTypeMatchState
  - Enum KnownProvisioningState has a new value NeedsAttention
  - Enum KnownVersions has a new value V20260601Preview
  - Enum KnownVersions has a new value V20260831Preview

### Breaking Changes
  - Operation DrillRunsOperations.beginFailOver has a new signature
  - Operation DrillRunsOperations.beginFailOverAndWait has a new signature
  - Operation DrillRunsOperations.failOver has a new signature
  - Operation DrillsOperations.beginValidateForExecution has a new signature
  - Operation DrillsOperations.beginValidateForExecutionAndWait has a new signature
  - Operation DrillsOperations.validateForExecution has a new signature
  - Operation GoalAssignmentsOperations.beginCreateOrUpdate has a new signature
  - Operation GoalAssignmentsOperations.beginCreateOrUpdateAndWait has a new signature
  - Operation GoalAssignmentsOperations.beginUpdate has a new signature
  - Operation GoalAssignmentsOperations.beginUpdateAndWait has a new signature
  - Operation GoalAssignmentsOperations.beginUpdateGoalResources has a new signature
  - Operation GoalAssignmentsOperations.beginUpdateGoalResourcesAndWait has a new signature
  - Operation GoalAssignmentsOperations.createOrUpdate has a new signature
  - Operation GoalAssignmentsOperations.get has a new signature
  - Operation GoalAssignmentsOperations.list has a new signature
  - Operation GoalAssignmentsOperations.update has a new signature
  - Operation GoalAssignmentsOperations.updateGoalResources has a new signature
  - Operation GoalResourcesOperations.get has a new signature
  - Operation GoalResourcesOperations.list has a new signature
  - Removed Interface ManagedOnBehalfOfConfiguration
  - Removed Interface MoboBrokerResource
  - Removed Interface UserConfirmationForHighAvailabilityItem
  - Interface DrillProperties no longer has parameter managedOnBehalfOfConfiguration
  - Interface RegionalDrillProperties no longer has parameter managedOnBehalfOfConfiguration
  - Interface ZonalDrillProperties no longer has parameter managedOnBehalfOfConfiguration
  - Parameter goalAssignmentType of interface GoalAssignmentProperties is now optional
  - Parameter goalTemplateId of interface GoalAssignmentProperties is now optional
  - Parameter highAvailabilityAttestationStatus of interface GoalResourceProperties is now optional
  - Parameter highAvailabilityGoalParticipation of interface GoalResourceProperties is now optional
  - Parameter serviceLevelObjectiveResourceId of interface ServiceLevelResource is now optional
  - Parameter sourceLocations of interface ValidateForExecutionProperties is now optional

    
## 1.0.0-beta.1 (2026-06-22)

### Features Added

This is the first preview release of the @azure/arm-resiliencemanagement package. It introduces a new SDK generation with layered APIs, smaller bundles, and improved ergonomics. For more details, see the https://aka.ms/azsdk/js/sdk/quickstart.
