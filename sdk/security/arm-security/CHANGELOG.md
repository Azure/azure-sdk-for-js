# Release History
    
## 5.0.0 (2022-03-17)
    
**Features**

  - Interface SecurityCenterOptionalParams has a new optional parameter apiVersion
  - Class SecurityCenter has a new parameter apiVersion
  - Type Alias Pricing has a new parameter subPlan

**Breaking Changes**

  - Removed operation group AdaptiveApplicationControls
  - Removed operation group AdaptiveNetworkHardenings
  - Removed operation group AdvancedThreatProtection
  - Removed operation group Alerts
  - Removed operation group AlertsSuppressionRules
  - Removed operation group AllowedConnections
  - Removed operation group Assessments
  - Removed operation group AssessmentsMetadata
  - Removed operation group Automations
  - Removed operation group AutoProvisioningSettings
  - Removed operation group ComplianceResults
  - Removed operation group Compliances
  - Removed operation group Connectors
  - Removed operation group CustomAssessmentAutomations
  - Removed operation group CustomEntityStoreAssignments
  - Removed operation group DeviceSecurityGroups
  - Removed operation group DiscoveredSecuritySolutions
  - Removed operation group ExternalSecuritySolutions
  - Removed operation group InformationProtectionPolicies
  - Removed operation group IngestionSettings
  - Removed operation group IotSecuritySolution
  - Removed operation group IotSecuritySolutionAnalytics
  - Removed operation group IotSecuritySolutionsAnalyticsAggregatedAlert
  - Removed operation group IotSecuritySolutionsAnalyticsRecommendation
  - Removed operation group JitNetworkAccessPolicies
  - Removed operation group Locations
  - Removed operation group MdeOnboardings
  - Removed operation group Operations
  - Removed operation group RegulatoryComplianceAssessments
  - Removed operation group RegulatoryComplianceControls
  - Removed operation group RegulatoryComplianceStandards
  - Removed operation group SecureScoreControlDefinitions
  - Removed operation group SecureScoreControls
  - Removed operation group SecureScores
  - Removed operation group SecurityConnectors
  - Removed operation group SecurityContacts
  - Removed operation group SecuritySolutions
  - Removed operation group SecuritySolutionsReferenceDataOperations
  - Removed operation group ServerVulnerabilityAssessmentOperations
  - Removed operation group Settings
  - Removed operation group SoftwareInventories
  - Removed operation group SqlVulnerabilityAssessmentBaselineRules
  - Removed operation group SqlVulnerabilityAssessmentScanResults
  - Removed operation group SqlVulnerabilityAssessmentScans
  - Removed operation group SubAssessments
  - Removed operation group Tasks
  - Removed operation group Topology
  - Removed operation group WorkspaceSettings
  - Class SecurityCenter has a new signature
  - Class SecurityCenter no longer has parameter adaptiveApplicationControls
  - Class SecurityCenter no longer has parameter adaptiveNetworkHardenings
  - Class SecurityCenter no longer has parameter advancedThreatProtection
  - Class SecurityCenter no longer has parameter alerts
  - Class SecurityCenter no longer has parameter alertsSuppressionRules
  - Class SecurityCenter no longer has parameter allowedConnections
  - Class SecurityCenter no longer has parameter ascLocation
  - Class SecurityCenter no longer has parameter assessments
  - Class SecurityCenter no longer has parameter assessmentsMetadata
  - Class SecurityCenter no longer has parameter automations
  - Class SecurityCenter no longer has parameter autoProvisioningSettings
  - Class SecurityCenter no longer has parameter complianceResults
  - Class SecurityCenter no longer has parameter compliances
  - Class SecurityCenter no longer has parameter connectors
  - Class SecurityCenter no longer has parameter customAssessmentAutomations
  - Class SecurityCenter no longer has parameter customEntityStoreAssignments
  - Class SecurityCenter no longer has parameter deviceSecurityGroups
  - Class SecurityCenter no longer has parameter discoveredSecuritySolutions
  - Class SecurityCenter no longer has parameter externalSecuritySolutions
  - Class SecurityCenter no longer has parameter informationProtectionPolicies
  - Class SecurityCenter no longer has parameter ingestionSettings
  - Class SecurityCenter no longer has parameter iotSecuritySolution
  - Class SecurityCenter no longer has parameter iotSecuritySolutionAnalytics
  - Class SecurityCenter no longer has parameter iotSecuritySolutionsAnalyticsAggregatedAlert
  - Class SecurityCenter no longer has parameter iotSecuritySolutionsAnalyticsRecommendation
  - Class SecurityCenter no longer has parameter jitNetworkAccessPolicies
  - Class SecurityCenter no longer has parameter locations
  - Class SecurityCenter no longer has parameter mdeOnboardings
  - Class SecurityCenter no longer has parameter operations
  - Class SecurityCenter no longer has parameter regulatoryComplianceAssessments
  - Class SecurityCenter no longer has parameter regulatoryComplianceControls
  - Class SecurityCenter no longer has parameter regulatoryComplianceStandards
  - Class SecurityCenter no longer has parameter secureScoreControlDefinitions
  - Class SecurityCenter no longer has parameter secureScoreControls
  - Class SecurityCenter no longer has parameter secureScores
  - Class SecurityCenter no longer has parameter securityConnectors
  - Class SecurityCenter no longer has parameter securityContacts
  - Class SecurityCenter no longer has parameter securitySolutions
  - Class SecurityCenter no longer has parameter securitySolutionsReferenceDataOperations
  - Class SecurityCenter no longer has parameter serverVulnerabilityAssessmentOperations
  - Class SecurityCenter no longer has parameter settings
  - Class SecurityCenter no longer has parameter softwareInventories
  - Class SecurityCenter no longer has parameter sqlVulnerabilityAssessmentBaselineRules
  - Class SecurityCenter no longer has parameter sqlVulnerabilityAssessmentScanResults
  - Class SecurityCenter no longer has parameter sqlVulnerabilityAssessmentScans
  - Class SecurityCenter no longer has parameter subAssessments
  - Class SecurityCenter no longer has parameter tasks
  - Class SecurityCenter no longer has parameter topology
  - Class SecurityCenter no longer has parameter workspaceSettings
  - Removed Enum KnownAadConnectivityState
  - Removed Enum KnownActionType
  - Removed Enum KnownAdaptiveApplicationControlIssue
  - Removed Enum KnownAdditionalWorkspaceDataType
  - Removed Enum KnownAdditionalWorkspaceType
  - Removed Enum KnownAlertNotifications
  - Removed Enum KnownAlertSeverity
  - Removed Enum KnownAlertStatus
  - Removed Enum KnownAlertsToAdmins
  - Removed Enum KnownAssessedResourceType
  - Removed Enum KnownAssessmentStatusCode
  - Removed Enum KnownAssessmentType
  - Removed Enum KnownAuthenticationProvisioningState
  - Removed Enum KnownAuthenticationType
  - Removed Enum KnownAutoProvision
  - Removed Enum KnownBundleType
  - Removed Enum KnownCategories
  - Removed Enum KnownCloudName
  - Removed Enum KnownConfigurationStatus
  - Removed Enum KnownConnectionType
  - Removed Enum KnownControlType
  - Removed Enum KnownCreatedByType
  - Removed Enum KnownDataSource
  - Removed Enum KnownDirection
  - Removed Enum KnownEndOfSupportStatus
  - Removed Enum KnownEnforcementMode
  - Removed Enum KnownEnforcementSupport
  - Removed Enum KnownEnum15
  - Removed Enum KnownEnum17
  - Removed Enum KnownEnum73
  - Removed Enum KnownEventSource
  - Removed Enum KnownExpandControlsEnum
  - Removed Enum KnownExpandEnum
  - Removed Enum KnownExportData
  - Removed Enum KnownExternalSecuritySolutionKind
  - Removed Enum KnownFileType
  - Removed Enum KnownHybridComputeProvisioningState
  - Removed Enum KnownImplementationEffort
  - Removed Enum KnownIntent
  - Removed Enum KnownKind
  - Removed Enum KnownOfferingType
  - Removed Enum KnownOperator
  - Removed Enum KnownOrganizationMembershipType
  - Removed Enum KnownPermissionProperty
  - Removed Enum KnownPropertyType
  - Removed Enum KnownProtocol
  - Removed Enum KnownProvisioningState
  - Removed Enum KnownRecommendationAction
  - Removed Enum KnownRecommendationConfigStatus
  - Removed Enum KnownRecommendationStatus
  - Removed Enum KnownRecommendationType
  - Removed Enum KnownReportedSeverity
  - Removed Enum KnownResourceIdentifierType
  - Removed Enum KnownResourceStatus
  - Removed Enum KnownRuleSeverity
  - Removed Enum KnownRuleStatus
  - Removed Enum KnownRuleType
  - Removed Enum KnownScanState
  - Removed Enum KnownScanTriggerType
  - Removed Enum KnownSecurityFamily
  - Removed Enum KnownSecuritySolutionStatus
  - Removed Enum KnownServerVulnerabilityAssessmentPropertiesProvisioningState
  - Removed Enum KnownSettingKind
  - Removed Enum KnownSeverity
  - Removed Enum KnownSeverityEnum
  - Removed Enum KnownSource
  - Removed Enum KnownSourceSystem
  - Removed Enum KnownState
  - Removed Enum KnownStatus
  - Removed Enum KnownStatusReason
  - Removed Enum KnownSubAssessmentStatusCode
  - Removed Enum KnownSupportedCloudEnum
  - Removed Enum KnownTactics
  - Removed Enum KnownTechniques
  - Removed Enum KnownThreats
  - Removed Enum KnownTransportProtocol
  - Removed Enum KnownUnmaskedIpLoggingStatus
  - Removed Enum KnownUserImpact
  - Removed Enum KnownValueType
    
    
## 4.0.0 (2021-12-14)

The package of @azure/arm-security is using our next generation design principles since version 4.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
