# Release History
    
## 6.0.0-beta.1 (2022-06-30)
    
**Features**

  - Added operation Alerts.beginSimulate
  - Added operation Alerts.beginSimulateAndWait
  - Added Interface AadExternalSecuritySolution
  - Added Interface AadSolutionProperties
  - Added Interface ActiveConnectionsNotInAllowedRange
  - Added Interface AdaptiveApplicationControlGroup
  - Added Interface AdaptiveNetworkHardening
  - Added Interface AdvancedThreatProtectionSetting
  - Added Interface Alert
  - Added Interface AlertSimulatorBundlesRequestProperties
  - Added Interface AlertsSuppressionRule
  - Added Interface AlertSyncSettings
  - Added Interface AllowedConnectionsResource
  - Added Interface AllowlistCustomAlertRule
  - Added Interface AmqpC2DMessagesNotInAllowedRange
  - Added Interface AmqpC2DRejectedMessagesNotInAllowedRange
  - Added Interface AmqpD2CMessagesNotInAllowedRange
  - Added Interface AscLocation
  - Added Interface AssessmentStatusResponse
  - Added Interface AtaExternalSecuritySolution
  - Added Interface AtaSolutionProperties
  - Added Interface Automation
  - Added Interface AutomationActionEventHub
  - Added Interface AutomationActionLogicApp
  - Added Interface AutomationActionWorkspace
  - Added Interface AutoProvisioningSetting
  - Added Interface AwAssumeRoleAuthenticationDetailsProperties
  - Added Interface AwsCredsAuthenticationDetailsProperties
  - Added Interface AzureResourceDetails
  - Added Interface AzureResourceIdentifier
  - Added Interface CefExternalSecuritySolution
  - Added Interface CefSolutionProperties
  - Added Interface Compliance
  - Added Interface ComplianceResult
  - Added Interface ConnectionFromIpNotAllowed
  - Added Interface ConnectionToIpNotAllowed
  - Added Interface ConnectorSetting
  - Added Interface ContainerRegistryVulnerabilityProperties
  - Added Interface CspmMonitorAwsOffering
  - Added Interface CustomAssessmentAutomation
  - Added Interface CustomAssessmentAutomationRequest
  - Added Interface CustomEntityStoreAssignment
  - Added Interface DataExportSettings
  - Added Interface DefenderForContainersAwsOffering
  - Added Interface DefenderForServersAwsOffering
  - Added Interface DenylistCustomAlertRule
  - Added Interface DeviceSecurityGroup
  - Added Interface DirectMethodInvokesNotInAllowedRange
  - Added Interface DiscoveredSecuritySolution
  - Added Interface ExternalSecuritySolution
  - Added Interface FailedLocalLoginsNotInAllowedRange
  - Added Interface FileUploadsNotInAllowedRange
  - Added Interface GcpCredentialsDetailsProperties
  - Added Interface HttpC2DMessagesNotInAllowedRange
  - Added Interface HttpC2DRejectedMessagesNotInAllowedRange
  - Added Interface HttpD2CMessagesNotInAllowedRange
  - Added Interface InformationProtectionPolicy
  - Added Interface IngestionSetting
  - Added Interface IoTSecurityAggregatedAlert
  - Added Interface IoTSecurityAggregatedRecommendation
  - Added Interface IoTSecuritySolutionAnalyticsModel
  - Added Interface IoTSecuritySolutionModel
  - Added Interface JitNetworkAccessPolicy
  - Added Interface ListCustomAlertRule
  - Added Interface LocalUserNotAllowed
  - Added Interface LogAnalyticsIdentifier
  - Added Interface MdeOnboardingData
  - Added Interface MqttC2DMessagesNotInAllowedRange
  - Added Interface MqttC2DRejectedMessagesNotInAllowedRange
  - Added Interface MqttD2CMessagesNotInAllowedRange
  - Added Interface OnPremiseResourceDetails
  - Added Interface OnPremiseSqlResourceDetails
  - Added Interface Pricing
  - Added Interface ProcessNotAllowed
  - Added Interface QueuePurgesNotInAllowedRange
  - Added Interface RegulatoryComplianceAssessment
  - Added Interface RegulatoryComplianceControl
  - Added Interface RegulatoryComplianceStandard
  - Added Interface RuleResults
  - Added Interface Scan
  - Added Interface ScanResult
  - Added Interface SecureScoreControlDefinitionItem
  - Added Interface SecureScoreControlDetails
  - Added Interface SecureScoreItem
  - Added Interface SecurityAssessment
  - Added Interface SecurityAssessmentMetadata
  - Added Interface SecurityAssessmentMetadataPropertiesResponse
  - Added Interface SecurityAssessmentMetadataResponse
  - Added Interface SecurityAssessmentProperties
  - Added Interface SecurityAssessmentPropertiesResponse
  - Added Interface SecurityAssessmentResponse
  - Added Interface SecurityConnector
  - Added Interface SecurityContact
  - Added Interface SecuritySolution
  - Added Interface SecuritySolutionsReferenceData
  - Added Interface SecuritySubAssessment
  - Added Interface SecurityTask
  - Added Interface ServerVulnerabilityAssessment
  - Added Interface ServerVulnerabilityProperties
  - Added Interface Setting
  - Added Interface Software
  - Added Interface SqlServerVulnerabilityProperties
  - Added Interface ThresholdCustomAlertRule
  - Added Interface TimeWindowCustomAlertRule
  - Added Interface TopologyResource
  - Added Interface TrackedResource
  - Added Interface TwinUpdatesNotInAllowedRange
  - Added Interface UnauthorizedOperationsNotInAllowedRange
  - Added Interface UpdateIotSecuritySolutionData
  - Added Interface WorkspaceSetting
  - Added Type Alias Enum15
  - Added Type Alias Enum17
  - Added Type Alias Enum73
  - Interface AlertsSimulateOptionalParams has a new optional parameter resumeFrom
  - Interface AlertsSimulateOptionalParams has a new optional parameter updateIntervalInMs
  - Class SecurityCenter has a new parameter ascLocation
  - Added Enum KnownEnum15
  - Added Enum KnownEnum17
  - Added Enum KnownEnum73

**Breaking Changes**

  - Removed operation Alerts.simulate
  - Operation AdaptiveApplicationControls.delete has a new signature
  - Operation AdaptiveApplicationControls.get has a new signature
  - Operation AdaptiveApplicationControls.put has a new signature
  - Operation Alerts.getResourceGroupLevel has a new signature
  - Operation Alerts.getSubscriptionLevel has a new signature
  - Operation Alerts.listResourceGroupLevelByRegion has a new signature
  - Operation Alerts.listSubscriptionLevelByRegion has a new signature
  - Operation Alerts.updateResourceGroupLevelStateToActivate has a new signature
  - Operation Alerts.updateResourceGroupLevelStateToDismiss has a new signature
  - Operation Alerts.updateResourceGroupLevelStateToResolve has a new signature
  - Operation Alerts.updateSubscriptionLevelStateToActivate has a new signature
  - Operation Alerts.updateSubscriptionLevelStateToDismiss has a new signature
  - Operation Alerts.updateSubscriptionLevelStateToResolve has a new signature
  - Operation AllowedConnections.get has a new signature
  - Operation AllowedConnections.listByHomeRegion has a new signature
  - Operation DiscoveredSecuritySolutions.get has a new signature
  - Operation DiscoveredSecuritySolutions.listByHomeRegion has a new signature
  - Operation ExternalSecuritySolutions.get has a new signature
  - Operation ExternalSecuritySolutions.listByHomeRegion has a new signature
  - Operation InformationProtectionPolicies.createOrUpdate has a new signature
  - Operation InformationProtectionPolicies.get has a new signature
  - Operation JitNetworkAccessPolicies.createOrUpdate has a new signature
  - Operation JitNetworkAccessPolicies.delete has a new signature
  - Operation JitNetworkAccessPolicies.get has a new signature
  - Operation JitNetworkAccessPolicies.initiate has a new signature
  - Operation JitNetworkAccessPolicies.listByRegion has a new signature
  - Operation JitNetworkAccessPolicies.listByResourceGroupAndRegion has a new signature
  - Operation Locations.get has a new signature
  - Operation SecuritySolutions.get has a new signature
  - Operation SecuritySolutionsReferenceDataOperations.listByHomeRegion has a new signature
  - Operation Settings.get has a new signature
  - Operation Settings.update has a new signature
  - Operation Tasks.getResourceGroupLevelTask has a new signature
  - Operation Tasks.getSubscriptionLevelTask has a new signature
  - Operation Tasks.listByHomeRegion has a new signature
  - Operation Tasks.listByResourceGroup has a new signature
  - Operation Tasks.updateResourceGroupLevelTaskState has a new signature
  - Operation Tasks.updateSubscriptionLevelTaskState has a new signature
  - Operation Topology.get has a new signature
  - Operation Topology.listByHomeRegion has a new signature
  - Class SecurityCenter has a new signature
  - Removed Enum KnownInformationProtectionPolicyName
  - Removed Enum KnownSettingName
  - Removed Enum KnownTaskUpdateActionType
  - Enum KnownOfferingType no longer has value InformationProtectionAws
  - Enum KnownSupportedCloudEnum no longer has value GCP
    
    
## 5.0.0 (2022-03-30)
    
**Features**

  - Added operation Alerts.simulate
  - Added Interface InformationProtectionAwsOfferingInformationProtection
  - Added Type Alias InformationProtectionAwsOffering
  - Added Type Alias InformationProtectionPolicyName
  - Added Type Alias SettingName
  - Added Type Alias TaskUpdateActionType
  - Type Alias Pricing has a new parameter subPlan
  - Added Enum KnownInformationProtectionPolicyName
  - Added Enum KnownSettingName
  - Added Enum KnownTaskUpdateActionType
  - Enum KnownOfferingType has a new value InformationProtectionAws
  - Enum KnownSupportedCloudEnum has a new value GCP

**Breaking Changes**

  - Removed operation Alerts.beginSimulate
  - Removed operation Alerts.beginSimulateAndWait
  - Operation AdaptiveApplicationControls.delete has a new signature
  - Operation AdaptiveApplicationControls.get has a new signature
  - Operation AdaptiveApplicationControls.put has a new signature
  - Operation Alerts.getResourceGroupLevel has a new signature
  - Operation Alerts.getSubscriptionLevel has a new signature
  - Operation Alerts.listResourceGroupLevelByRegion has a new signature
  - Operation Alerts.listSubscriptionLevelByRegion has a new signature
  - Operation Alerts.updateResourceGroupLevelStateToActivate has a new signature
  - Operation Alerts.updateResourceGroupLevelStateToDismiss has a new signature
  - Operation Alerts.updateResourceGroupLevelStateToResolve has a new signature
  - Operation Alerts.updateSubscriptionLevelStateToActivate has a new signature
  - Operation Alerts.updateSubscriptionLevelStateToDismiss has a new signature
  - Operation Alerts.updateSubscriptionLevelStateToResolve has a new signature
  - Operation AllowedConnections.get has a new signature
  - Operation AllowedConnections.listByHomeRegion has a new signature
  - Operation DiscoveredSecuritySolutions.get has a new signature
  - Operation DiscoveredSecuritySolutions.listByHomeRegion has a new signature
  - Operation ExternalSecuritySolutions.get has a new signature
  - Operation ExternalSecuritySolutions.listByHomeRegion has a new signature
  - Operation InformationProtectionPolicies.createOrUpdate has a new signature
  - Operation InformationProtectionPolicies.get has a new signature
  - Operation JitNetworkAccessPolicies.createOrUpdate has a new signature
  - Operation JitNetworkAccessPolicies.delete has a new signature
  - Operation JitNetworkAccessPolicies.get has a new signature
  - Operation JitNetworkAccessPolicies.initiate has a new signature
  - Operation JitNetworkAccessPolicies.listByRegion has a new signature
  - Operation JitNetworkAccessPolicies.listByResourceGroupAndRegion has a new signature
  - Operation Locations.get has a new signature
  - Operation SecuritySolutions.get has a new signature
  - Operation SecuritySolutionsReferenceDataOperations.listByHomeRegion has a new signature
  - Operation Settings.get has a new signature
  - Operation Settings.update has a new signature
  - Operation Tasks.getResourceGroupLevelTask has a new signature
  - Operation Tasks.getSubscriptionLevelTask has a new signature
  - Operation Tasks.listByHomeRegion has a new signature
  - Operation Tasks.listByResourceGroup has a new signature
  - Operation Tasks.updateResourceGroupLevelTaskState has a new signature
  - Operation Tasks.updateSubscriptionLevelTaskState has a new signature
  - Operation Topology.get has a new signature
  - Operation Topology.listByHomeRegion has a new signature
  - Class SecurityCenter has a new signature
  - Interface AlertsSimulateOptionalParams no longer has parameter resumeFrom
  - Interface AlertsSimulateOptionalParams no longer has parameter updateIntervalInMs
  - Class SecurityCenter no longer has parameter ascLocation
  - Removed Enum KnownEnum15
  - Removed Enum KnownEnum17
  - Removed Enum KnownEnum73
    
    
## 4.0.0 (2021-12-14)

The package of @azure/arm-security is using our next generation design principles since version 4.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
