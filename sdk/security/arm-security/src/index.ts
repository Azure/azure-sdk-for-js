// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { SecurityCenter } from "./securityCenter.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorAdditionalInfo,
  ErrorResponse,
  ErrorDetail,
  ExtensionResource,
  Operation,
  OperationDisplay,
  Origin,
  ArmActionType,
  PrivateLinkResourceProperties,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  PrivateEndpointConnectionProvisioningState,
  PrivateEndpointConnection,
  Identity,
  ResourceIdentityType,
  OperationStatusResult,
  TrackedResource,
} from "./models/index.js";
export {
  KnownCreatedByType,
  KnownOrigin,
  KnownArmActionType,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
} from "./models/index.js";
export type {
  AlertsAPIAlert,
  AlertsAPIAlertProperties,
  AlertsAPIAlertSeverity,
  AlertsAPIIntent,
  AlertsAPIResourceIdentifier,
  AlertsAPIResourceIdentifierUnion,
  AlertsAPIResourceIdentifierType,
  AlertsAPIAzureResourceIdentifier,
  AlertsAPILogAnalyticsIdentifier,
  AlertsAPIAlertStatus,
  AlertsAPIAlertEntity,
  AlertsAPIAlertPropertiesSupportingEvidence,
  AlertsAPIAlertSimulatorRequestBody,
  AlertsAPIAlertSimulatorRequestProperties,
  AlertsAPIAlertSimulatorRequestPropertiesUnion,
  AlertsAPIKind,
  AlertsAPIAlertSimulatorBundlesRequestProperties,
  AlertsAPIBundleType,
} from "./models/alertsAPI/index.js";
export {
  KnownAlertsAPIAlertSeverity,
  KnownAlertsAPIIntent,
  KnownAlertsAPIResourceIdentifierType,
  KnownAlertsAPIAlertStatus,
  KnownAlertsAPIKind,
  KnownAlertsAPIBundleType,
} from "./models/alertsAPI/index.js";
export type {
  AlertsSuppressionRulesAPIAlertsSuppressionRule,
  AlertsSuppressionRulesAPIAlertsSuppressionRuleProperties,
  AlertsSuppressionRulesAPIRuleState,
  AlertsSuppressionRulesAPISuppressionAlertsScope,
  AlertsSuppressionRulesAPIScopeElement,
} from "./models/alertsSuppressionRulesAPI/index.js";
export type {
  ApiCollectionsAPIApiCollection,
  ApiCollectionsAPIApiCollectionProperties,
} from "./models/apiCollectionsAPI/index.js";
export type {
  ApplicationsAPIApplication,
  ApplicationsAPIApplicationProperties,
  ApplicationsAPIApplicationSourceResourceType,
} from "./models/applicationsAPI/index.js";
export { KnownApplicationsAPIApplicationSourceResourceType } from "./models/applicationsAPI/index.js";
export type {
  AssessmentAPISecurityAssessmentMetadataResponse,
  AssessmentAPISecurityAssessmentMetadataPropertiesResponse,
  AssessmentAPISecurityAssessmentMetadataPropertiesResponsePublishDates,
  AssessmentAPITactics,
  AssessmentAPITechniques,
  AssessmentAPISecurityAssessmentMetadataProperties,
  AssessmentAPICategories,
  AssessmentAPIUserImpact,
  AssessmentAPIImplementationEffort,
  AssessmentAPIThreats,
  AssessmentAPIAssessmentType,
  AssessmentAPISecurityAssessmentMetadataPartnerData,
  AssessmentAPISecurityAssessmentResponse,
  AssessmentAPISecurityAssessmentPropertiesResponse,
  AssessmentAPIAssessmentStatusResponse,
  AssessmentAPIAssessmentStatus,
  AssessmentAPIAssessmentStatusCode,
  AssessmentAPISecurityAssessmentPropertiesBase,
  AssessmentAPISecurityAssessmentPropertiesBaseRisk,
  AssessmentAPIRiskLevel,
  AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItem,
  AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemNodesItem,
  AssessmentAPISecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem,
  AssessmentAPIAzureResourceDetails,
  AssessmentAPIAssessmentLinks,
  AssessmentAPISecurityAssessmentPartnerData,
  AssessmentAPISecurityAssessment,
  AssessmentAPISecurityAssessmentProperties,
  AssessmentAPIExpandEnum,
} from "./models/assessmentAPI/index.js";
export {
  KnownAssessmentAPITactics,
  KnownAssessmentAPITechniques,
  KnownAssessmentAPICategories,
  KnownAssessmentAPIUserImpact,
  KnownAssessmentAPIImplementationEffort,
  KnownAssessmentAPIThreats,
  KnownAssessmentAPIAssessmentType,
  KnownAssessmentAPIAssessmentStatusCode,
  KnownAssessmentAPIRiskLevel,
  KnownAssessmentAPIExpandEnum,
} from "./models/assessmentAPI/index.js";
export type {
  ATPSettingsAPIAdvancedThreatProtectionSetting,
  ATPSettingsAPIAdvancedThreatProtectionProperties,
} from "./models/atpSettingsAPI/index.js";
export type {
  AutomationsAPIAutomation,
  AutomationsAPIAutomationProperties,
  AutomationsAPIAutomationScope,
  AutomationsAPIAutomationSource,
  AutomationsAPIEventSource,
  AutomationsAPIAutomationRuleSet,
  AutomationsAPIAutomationTriggeringRule,
  AutomationsAPIPropertyType,
  AutomationsAPIOperator,
  AutomationsAPIAutomationAction,
  AutomationsAPIAutomationActionUnion,
  AutomationsAPIAutomationActionLogicApp,
  AutomationsAPIAutomationActionEventHub,
  AutomationsAPIAutomationActionWorkspace,
  AutomationsAPIAutomationUpdateModel,
  AutomationsAPIAutomationValidationStatus,
  AutomationsAPISecurityContact,
  AutomationsAPISecurityContactProperties,
  AutomationsAPINotificationsSource,
  AutomationsAPINotificationsSourceUnion,
  AutomationsAPISourceType,
  AutomationsAPINotificationsSourceAlert,
  AutomationsAPIMinimalSeverity,
  AutomationsAPINotificationsSourceAttackPath,
  AutomationsAPIMinimalRiskLevel,
  AutomationsAPISecurityContactPropertiesNotificationsByRole,
  AutomationsAPISecurityContactRole,
  AutomationsAPISecurityContactName,
} from "./models/automationsAPI/index.js";
export {
  KnownAutomationsAPIEventSource,
  KnownAutomationsAPIPropertyType,
  KnownAutomationsAPIOperator,
  KnownAutomationsAPISourceType,
  KnownAutomationsAPIMinimalSeverity,
  KnownAutomationsAPIMinimalRiskLevel,
  KnownAutomationsAPISecurityContactRole,
  KnownAutomationsAPISecurityContactName,
} from "./models/automationsAPI/index.js";
export type {
  CommonCloudError,
  CommonCloudErrorBody,
  CommonSeverity,
  CommonActionType,
  CommonTags,
  CommonState,
  CommonSource,
  CommonOperationStatus,
  CommonProvisioningState,
  CommonAssignedStandardItem,
  CommonSettingName,
  CommonResourceDetails,
  CommonResourceDetailsUnion,
} from "./models/common/index.js";
export {
  KnownCommonSeverity,
  KnownCommonActionType,
  KnownCommonState,
  KnownCommonSource,
  KnownCommonProvisioningState,
  KnownCommonSettingName,
} from "./models/common/index.js";
export type {
  ComplianceResultsAPIComplianceResult,
  ComplianceResultsAPIComplianceResultProperties,
  ComplianceResultsAPIResourceStatus,
} from "./models/complianceResultsAPI/index.js";
export { KnownComplianceResultsAPIResourceStatus } from "./models/complianceResultsAPI/index.js";
export type {
  DefenderForStorageAPIDefenderForStorageSetting,
  DefenderForStorageAPIDefenderForStorageSettingProperties,
  DefenderForStorageAPIMalwareScanningProperties,
  DefenderForStorageAPIOnUploadProperties,
  DefenderForStorageAPIOnUploadFilters,
  DefenderForStorageAPIBlobScanResultsOptions,
  DefenderForStorageAPIAutomatedResponseType,
  DefenderForStorageAPISensitiveDataDiscoveryProperties,
  DefenderForStorageAPIMalwareScan,
  DefenderForStorageAPIMalwareScanProperties,
  DefenderForStorageAPIScanSummary,
  DefenderForStorageAPIBlobsScanSummary,
  DefenderForStorageAPIFilesScanSummary,
} from "./models/defenderForStorageAPI/index.js";
export {
  KnownDefenderForStorageAPIBlobScanResultsOptions,
  KnownDefenderForStorageAPIAutomatedResponseType,
} from "./models/defenderForStorageAPI/index.js";
export type {
  GovernanceAPIGovernanceAssignment,
  GovernanceAPIGovernanceAssignmentProperties,
  GovernanceAPIRemediationEta,
  GovernanceAPIGovernanceEmailNotification,
  GovernanceAPIGovernanceAssignmentAdditionalData,
  GovernanceAPIGovernanceRule,
  GovernanceAPIGovernanceRuleProperties,
  GovernanceAPIGovernanceRuleType,
  GovernanceAPIGovernanceRuleSourceResourceType,
  GovernanceAPIGovernanceRuleOwnerSource,
  GovernanceAPIGovernanceRuleOwnerSourceType,
  GovernanceAPIGovernanceRuleEmailNotification,
  GovernanceAPIGovernanceRuleMetadata,
  GovernanceAPIExecuteGovernanceRuleParams,
  GovernanceAPIOperationResult,
  GovernanceAPIOperationResultStatus,
} from "./models/governanceAPI/index.js";
export {
  KnownGovernanceAPIGovernanceRuleType,
  KnownGovernanceAPIGovernanceRuleSourceResourceType,
  KnownGovernanceAPIGovernanceRuleOwnerSourceType,
  KnownGovernanceAPIOperationResultStatus,
} from "./models/governanceAPI/index.js";
export type {
  HealthReportsAPIHealthReport,
  HealthReportsAPIHealthReportProperties,
  HealthReportsAPIresourceDetails,
  HealthReportsAPIenvironmentDetails,
  HealthReportsAPIhealthDataClassification,
  HealthReportsAPIstatus,
  HealthReportsAPIStatusName,
  HealthReportsAPIissue,
} from "./models/healthReportsAPI/index.js";
export { KnownHealthReportsAPIStatusName } from "./models/healthReportsAPI/index.js";
export type {
  IoTSecurityAPIDeviceSecurityGroup,
  IoTSecurityAPIDeviceSecurityGroupProperties,
  IoTSecurityAPIThresholdCustomAlertRule,
  IoTSecurityAPITimeWindowCustomAlertRule,
  IoTSecurityAPIAllowlistCustomAlertRule,
  IoTSecurityAPIDenylistCustomAlertRule,
  IoTSecurityAPICustomAlertRule,
  IoTSecurityAPICustomAlertRuleUnion,
  IoTSecurityAPIListCustomAlertRule,
  IoTSecurityAPIListCustomAlertRuleUnion,
  IoTSecurityAPIValueType,
  IoTSecurityAPIIoTSecuritySolutionAnalyticsModel,
  IoTSecurityAPIIoTSecuritySolutionAnalyticsModelProperties,
  IoTSecurityAPIIoTSeverityMetrics,
  IoTSecurityAPIIoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItem,
  IoTSecurityAPIIoTSecurityAlertedDevice,
  IoTSecurityAPIIoTSecurityDeviceAlert,
  IoTSecurityAPIReportedSeverity,
  IoTSecurityAPIIoTSecurityDeviceRecommendation,
  IoTSecurityAPIIoTSecuritySolutionAnalyticsModelList,
  IoTSecurityAPIIoTSecuritySolutionModel,
  IoTSecurityAPIIoTSecuritySolutionProperties,
  IoTSecurityAPISecuritySolutionStatus,
  IoTSecurityAPIExportData,
  IoTSecurityAPIDataSource,
  IoTSecurityAPIUserDefinedResourcesProperties,
  IoTSecurityAPIRecommendationConfigurationProperties,
  IoTSecurityAPIRecommendationType,
  IoTSecurityAPIRecommendationConfigStatus,
  IoTSecurityAPIUnmaskedIpLoggingStatus,
  IoTSecurityAPIAdditionalWorkspacesProperties,
  IoTSecurityAPIAdditionalWorkspaceType,
  IoTSecurityAPIAdditionalWorkspaceDataType,
  IoTSecurityAPIUpdateIotSecuritySolutionData,
  IoTSecurityAPIUpdateIoTSecuritySolutionProperties,
  IoTSecurityAPITagsResource,
  IoTSecurityAPIIoTSecurityAggregatedAlert,
  IoTSecurityAPIIoTSecurityAggregatedAlertProperties,
  IoTSecurityAPIIoTSecurityAggregatedAlertPropertiesTopDevicesListItem,
  IoTSecurityAPIIoTSecurityAggregatedRecommendation,
  IoTSecurityAPIIoTSecurityAggregatedRecommendationProperties,
} from "./models/ioTSecurityAPI/index.js";
export {
  KnownIoTSecurityAPIValueType,
  KnownIoTSecurityAPIReportedSeverity,
  KnownIoTSecurityAPISecuritySolutionStatus,
  KnownIoTSecurityAPIExportData,
  KnownIoTSecurityAPIDataSource,
  KnownIoTSecurityAPIRecommendationType,
  KnownIoTSecurityAPIRecommendationConfigStatus,
  KnownIoTSecurityAPIUnmaskedIpLoggingStatus,
  KnownIoTSecurityAPIAdditionalWorkspaceType,
  KnownIoTSecurityAPIAdditionalWorkspaceDataType,
} from "./models/ioTSecurityAPI/index.js";
export type {
  LegacySettingsAPIAutoProvisioningSetting,
  LegacySettingsAPIAutoProvisioningSettingProperties,
  LegacySettingsAPIAutoProvision,
  LegacySettingsAPICompliance,
  LegacySettingsAPIComplianceProperties,
  LegacySettingsAPIComplianceSegment,
  LegacySettingsAPIInformationProtectionPolicy,
  LegacySettingsAPIInformationProtectionPolicyProperties,
  LegacySettingsAPISensitivityLabel,
  LegacySettingsAPIRank,
  LegacySettingsAPIInformationType,
  LegacySettingsAPIInformationProtectionKeyword,
  LegacySettingsAPIInformationProtectionPolicyName,
  LegacySettingsAPIWorkspaceSetting,
  LegacySettingsAPIWorkspaceSettingProperties,
} from "./models/legacySettingsAPI/index.js";
export {
  KnownLegacySettingsAPIAutoProvision,
  KnownLegacySettingsAPIInformationProtectionPolicyName,
} from "./models/legacySettingsAPI/index.js";
export type { LocationsAPIAscLocation } from "./models/locationsAPI/index.js";
export type {
  MdeOnboardingAPIMdeOnboardingData,
  MdeOnboardingAPIMdeOnboardingDataProperties,
} from "./models/mdeOnboardingAPI/index.js";
export type {
  PricingsAPIPricing,
  PricingsAPIPricingProperties,
  PricingsAPIPricingTier,
  PricingsAPIEnforce,
  PricingsAPIInherited,
  PricingsAPIResourcesCoverageStatus,
  PricingsAPIExtension,
  PricingsApiisEnabled,
} from "./models/pricingsAPI/index.js";
export {
  KnownPricingsAPIPricingTier,
  KnownPricingsAPIEnforce,
  KnownPricingsAPIInherited,
  KnownPricingsAPIResourcesCoverageStatus,
  KnownPricingsApiisEnabled,
} from "./models/pricingsAPI/index.js";
export type {
  PrivateLinksAPIPrivateLinkGroupResource,
  PrivateLinksAPIPrivateEndpointConnection,
  PrivateLinksAPIPrivateLinkResource,
  PrivateLinksAPIPrivateLinkProperties,
  PrivateLinksAPIPublicNetworkAccess,
  PrivateLinksAPIPrivateLinkUpdate,
} from "./models/privateLinksAPI/index.js";
export { KnownPrivateLinksAPIPublicNetworkAccess } from "./models/privateLinksAPI/index.js";
export type {
  RegulatoryComplianceAPIRegulatoryComplianceStandard,
  RegulatoryComplianceAPIRegulatoryComplianceStandardProperties,
  RegulatoryComplianceAPIRegulatoryComplianceControl,
  RegulatoryComplianceAPIRegulatoryComplianceControlProperties,
  RegulatoryComplianceAPIRegulatoryComplianceAssessment,
  RegulatoryComplianceAPIRegulatoryComplianceAssessmentProperties,
} from "./models/regulatoryComplianceAPI/index.js";
export type {
  SecureScoreAPISecureScoreItem,
  SecureScoreAPISecureScoreItemProperties,
  SecureScoreAPIScoreDetails,
  SecureScoreAPISecureScoreControlDetails,
  SecureScoreAPISecureScoreControlScoreDetails,
  SecureScoreAPISecureScoreControlDefinitionItem,
  SecureScoreAPISecureScoreControlDefinitionItemProperties,
  SecureScoreAPISecureScoreControlDefinitionSource,
  SecureScoreAPIControlType,
  SecureScoreAPIAzureResourceLink,
  SecureScoreAPIExpandControlsEnum,
} from "./models/secureScoreAPI/index.js";
export {
  KnownSecureScoreAPIControlType,
  KnownSecureScoreAPIExpandControlsEnum,
} from "./models/secureScoreAPI/index.js";
export type {
  SecurityConnectorsAPISecurityConnector,
  SecurityConnectorsAPISecurityConnectorProperties,
  SecurityConnectorsAPICloudName,
  SecurityConnectorsAPIcloudOffering,
  SecurityConnectorsAPIcloudOfferingUnion,
  SecurityConnectorsAPIOfferingType,
  SecurityConnectorsAPIcspmMonitorAwsOffering,
  SecurityConnectorsAPICspmMonitorAwsOfferingNativeCloudConnection,
  SecurityConnectorsAPIdefenderForContainersAwsOffering,
  SecurityConnectorsAPIDefenderForContainersAwsOfferingKubernetesService,
  SecurityConnectorsAPIDefenderForContainersAwsOfferingKubernetesDataCollection,
  SecurityConnectorsAPIDefenderForContainersAwsOfferingCloudWatchToKinesis,
  SecurityConnectorsAPIDefenderForContainersAwsOfferingKinesisToS3,
  SecurityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersImageAssessment,
  SecurityConnectorsAPIDefenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8S,
  SecurityConnectorsAPIdefenderForContainersAwsOfferingVmScanners,
  SecurityConnectorsAPIdefenderForServersAwsOffering,
  SecurityConnectorsAPIDefenderForServersAwsOfferingDefenderForServers,
  SecurityConnectorsAPIDefenderForServersAwsOfferingArcAutoProvisioning,
  SecurityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioning,
  SecurityConnectorsAPIDefenderForServersAwsOfferingVaAutoProvisioningConfiguration,
  SecurityConnectorsAPIType,
  SecurityConnectorsAPIDefenderForServersAwsOfferingMdeAutoProvisioning,
  SecurityConnectorsAPIDefenderForServersAwsOfferingSubPlan,
  SecurityConnectorsAPISubPlan,
  SecurityConnectorsAPIdefenderForServersAwsOfferingVmScanners,
  SecurityConnectorsAPIdefenderFoDatabasesAwsOffering,
  SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingArcAutoProvisioning,
  SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingRds,
  SecurityConnectorsAPIDefenderFoDatabasesAwsOfferingDatabasesDspm,
  SecurityConnectorsAPIcspmMonitorGcpOffering,
  SecurityConnectorsAPICspmMonitorGcpOfferingNativeCloudConnection,
  SecurityConnectorsAPIdefenderForServersGcpOffering,
  SecurityConnectorsAPIDefenderForServersGcpOfferingDefenderForServers,
  SecurityConnectorsAPIDefenderForServersGcpOfferingArcAutoProvisioning,
  SecurityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioning,
  SecurityConnectorsAPIDefenderForServersGcpOfferingVaAutoProvisioningConfiguration,
  SecurityConnectorsAPIDefenderForServersGcpOfferingMdeAutoProvisioning,
  SecurityConnectorsAPIDefenderForServersGcpOfferingSubPlan,
  SecurityConnectorsAPIdefenderForServersGcpOfferingVmScanners,
  SecurityConnectorsAPIdefenderForDatabasesGcpOffering,
  SecurityConnectorsAPIDefenderForDatabasesGcpOfferingArcAutoProvisioning,
  SecurityConnectorsAPIDefenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioning,
  SecurityConnectorsAPIdefenderForContainersGcpOffering,
  SecurityConnectorsAPIDefenderForContainersGcpOfferingNativeCloudConnection,
  SecurityConnectorsAPIDefenderForContainersGcpOfferingDataPipelineNativeCloudConnection,
  SecurityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersImageAssessment,
  SecurityConnectorsAPIDefenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8S,
  SecurityConnectorsAPIdefenderForContainersGcpOfferingVmScanners,
  SecurityConnectorsAPIcspmMonitorGithubOffering,
  SecurityConnectorsAPIcspmMonitorAzureDevOpsOffering,
  SecurityConnectorsAPIdefenderCspmAwsOffering,
  SecurityConnectorsAPIdefenderCspmAwsOfferingVmScanners,
  SecurityConnectorsAPIDefenderCspmAwsOfferingDataSensitivityDiscovery,
  SecurityConnectorsAPIDefenderCspmAwsOfferingDatabasesDspm,
  SecurityConnectorsAPIDefenderCspmAwsOfferingCiem,
  SecurityConnectorsAPIDefenderCspmAwsOfferingCiemCiemDiscovery,
  SecurityConnectorsAPIDefenderCspmAwsOfferingCiemCiemOidc,
  SecurityConnectorsAPIDefenderCspmAwsOfferingMdcContainersImageAssessment,
  SecurityConnectorsAPIDefenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8S,
  SecurityConnectorsAPIdefenderCspmGcpOffering,
  SecurityConnectorsAPIDefenderCspmGcpOfferingCiemDiscovery,
  SecurityConnectorsAPIdefenderCspmGcpOfferingVmScanners,
  SecurityConnectorsAPIDefenderCspmGcpOfferingDataSensitivityDiscovery,
  SecurityConnectorsAPIDefenderCspmGcpOfferingMdcContainersImageAssessment,
  SecurityConnectorsAPIDefenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8S,
  SecurityConnectorsAPIcspmMonitorGitLabOffering,
  SecurityConnectorsAPIcspmMonitorDockerHubOffering,
  SecurityConnectorsAPIdefenderForContainersDockerHubOffering,
  SecurityConnectorsAPIdefenderCspmDockerHubOffering,
  SecurityConnectorsAPIcspmMonitorJFrogOffering,
  SecurityConnectorsAPIdefenderForContainersJFrogOffering,
  SecurityConnectorsAPIdefenderCspmJFrogOffering,
  SecurityConnectorsAPIDefenderCspmJFrogOfferingMdcContainersImageAssessment,
  SecurityConnectorsAPIEnvironmentData,
  SecurityConnectorsAPIEnvironmentDataUnion,
  SecurityConnectorsAPIEnvironmentType,
  SecurityConnectorsAPIAwsEnvironmentData,
  SecurityConnectorsAPIAwsOrganizationalData,
  SecurityConnectorsAPIAwsOrganizationalDataUnion,
  SecurityConnectorsAPIOrganizationMembershipType,
  SecurityConnectorsAPIAwsOrganizationalDataMaster,
  SecurityConnectorsAPIAwsOrganizationalDataMember,
  SecurityConnectorsAPIGcpProjectEnvironmentData,
  SecurityConnectorsAPIGcpOrganizationalData,
  SecurityConnectorsAPIGcpOrganizationalDataUnion,
  SecurityConnectorsAPIGcpOrganizationalDataOrganization,
  SecurityConnectorsAPIGcpOrganizationalDataMember,
  SecurityConnectorsAPIGcpProjectDetails,
  SecurityConnectorsAPIGithubScopeEnvironmentData,
  SecurityConnectorsAPIAzureDevOpsScopeEnvironmentData,
  SecurityConnectorsAPIGitlabScopeEnvironmentData,
  SecurityConnectorsAPIDockerHubEnvironmentData,
  SecurityConnectorsAPIAuthentication,
  SecurityConnectorsAPIAuthenticationUnion,
  SecurityConnectorsAPIAuthenticationType,
  SecurityConnectorsAPIAccessTokenAuthentication,
  SecurityConnectorsApijFrogEnvironmentData,
  SecurityConnectorsAPIvmScannersAws,
  SecurityConnectorsAPIvmScannersBase,
  SecurityConnectorsAPIVmScannersBaseConfiguration,
  SecurityConnectorsAPIScanningMode,
  SecurityConnectorsAPIarcAutoProvisioningAws,
  SecurityConnectorsAPIarcAutoProvisioning,
  SecurityConnectorsAPIArcAutoProvisioningConfiguration,
  SecurityConnectorsAPIarcAutoProvisioningGcp,
  SecurityConnectorsAPIvmScannersGcp,
} from "./models/securityConnectorsAPI/index.js";
export {
  KnownSecurityConnectorsAPICloudName,
  KnownSecurityConnectorsAPIOfferingType,
  KnownSecurityConnectorsAPIType,
  KnownSecurityConnectorsAPISubPlan,
  KnownSecurityConnectorsAPIEnvironmentType,
  KnownSecurityConnectorsAPIOrganizationMembershipType,
  KnownSecurityConnectorsAPIAuthenticationType,
  KnownSecurityConnectorsAPIScanningMode,
} from "./models/securityConnectorsAPI/index.js";
export type {
  SecurityConnectorsDevOpsAPIAzureDevOpsOrg,
  SecurityConnectorsDevOpsAPIAzureDevOpsOrgProperties,
  SecurityConnectorsDevOpsAPIDevOpsProvisioningState,
  SecurityConnectorsDevOpsAPIOnboardingState,
  SecurityConnectorsDevOpsAPIActionableRemediation,
  SecurityConnectorsDevOpsAPIActionableRemediationState,
  SecurityConnectorsDevOpsAPICategoryConfiguration,
  SecurityConnectorsDevOpsAPIRuleCategory,
  SecurityConnectorsDevOpsAPITargetBranchConfiguration,
  SecurityConnectorsDevOpsAPIAnnotateDefaultBranchState,
  SecurityConnectorsDevOpsAPIInheritFromParentState,
  SecurityConnectorsDevOpsAPIAzureDevOpsOrgListResponse,
  SecurityConnectorsDevOpsAPIGitHubOwner,
  SecurityConnectorsDevOpsAPIGitHubOwnerProperties,
  SecurityConnectorsDevOpsAPIGitHubOwnerListResponse,
  SecurityConnectorsDevOpsAPIGitLabGroup,
  SecurityConnectorsDevOpsAPIGitLabGroupProperties,
  SecurityConnectorsDevOpsAPIGitLabGroupListResponse,
  SecurityConnectorsDevOpsAPIDevOpsConfiguration,
  SecurityConnectorsDevOpsAPIDevOpsConfigurationProperties,
  SecurityConnectorsDevOpsAPIAuthorization,
  SecurityConnectorsDevOpsAPIAutoDiscovery,
  SecurityConnectorsDevOpsAPIDevOpsCapability,
  SecurityConnectorsDevOpsAPIAgentlessConfiguration,
  SecurityConnectorsDevOpsAPIAgentlessEnablement,
  SecurityConnectorsDevOpsAPIInventoryListKind,
  SecurityConnectorsDevOpsAPIInventoryList,
  SecurityConnectorsDevOpsAPIInventoryKind,
  SecurityConnectorsDevOpsAPIAzureDevOpsProject,
  SecurityConnectorsDevOpsAPIAzureDevOpsProjectProperties,
  SecurityConnectorsDevOpsAPIGitLabProject,
  SecurityConnectorsDevOpsAPIGitLabProjectProperties,
  SecurityConnectorsDevOpsAPIAzureDevOpsRepository,
  SecurityConnectorsDevOpsAPIAzureDevOpsRepositoryProperties,
  SecurityConnectorsDevOpsAPIGitHubRepository,
  SecurityConnectorsDevOpsAPIGitHubRepositoryProperties,
  SecurityConnectorsDevOpsAPIIssueCreationRequest,
} from "./models/securityConnectorsDevOpsAPI/index.js";
export {
  KnownSecurityConnectorsDevOpsAPIDevOpsProvisioningState,
  KnownSecurityConnectorsDevOpsAPIOnboardingState,
  KnownSecurityConnectorsDevOpsAPIActionableRemediationState,
  KnownSecurityConnectorsDevOpsAPIRuleCategory,
  KnownSecurityConnectorsDevOpsAPIAnnotateDefaultBranchState,
  KnownSecurityConnectorsDevOpsAPIInheritFromParentState,
  KnownSecurityConnectorsDevOpsAPIAutoDiscovery,
  KnownSecurityConnectorsDevOpsAPIAgentlessEnablement,
  KnownSecurityConnectorsDevOpsAPIInventoryListKind,
  KnownSecurityConnectorsDevOpsAPIInventoryKind,
} from "./models/securityConnectorsDevOpsAPI/index.js";
export type { SecurityManagementClientprivateLinkParameters } from "./models/securityManagementClient/index.js";
export type { SecurityOperatorsAPISecurityOperator } from "./models/securityOperatorsAPI/index.js";
export type {
  SecuritySolutionsAPIDiscoveredSecuritySolution,
  SecuritySolutionsAPIDiscoveredSecuritySolutionProperties,
  SecuritySolutionsAPISecurityFamily,
  SecuritySolutionsAPIExternalSecuritySolution,
  SecuritySolutionsAPIExternalSecuritySolutionUnion,
  SecuritySolutionsAPIExternalSecuritySolutionKind,
  SecuritySolutionsAPICefExternalSecuritySolution,
  SecuritySolutionsAPICefSolutionProperties,
  SecuritySolutionsAPIAtaExternalSecuritySolution,
  SecuritySolutionsAPIAtaSolutionProperties,
  SecuritySolutionsAPIAadExternalSecuritySolution,
  SecuritySolutionsAPIAadSolutionProperties,
  SecuritySolutionsAPIConnectedWorkspace,
  SecuritySolutionsAPIAadConnectivityState,
  SecuritySolutionsAPIExternalSecuritySolutionProperties,
  SecuritySolutionsAPIJitNetworkAccessPolicy,
  SecuritySolutionsAPIJitNetworkAccessPolicyProperties,
  SecuritySolutionsAPIJitNetworkAccessPolicyVirtualMachine,
  SecuritySolutionsAPIJitNetworkAccessPortRule,
  SecuritySolutionsAPIProtocol,
  SecuritySolutionsAPIJitNetworkAccessRequest,
  SecuritySolutionsAPIJitNetworkAccessRequestVirtualMachine,
  SecuritySolutionsAPIJitNetworkAccessRequestPort,
  SecuritySolutionsAPIStatus,
  SecuritySolutionsAPIStatusReason,
  SecuritySolutionsAPIJitNetworkAccessPolicyInitiateRequest,
  SecuritySolutionsAPIJitNetworkAccessPolicyInitiateVirtualMachine,
  SecuritySolutionsAPIJitNetworkAccessPolicyInitiatePort,
  SecuritySolutionsAPISecuritySolution,
  SecuritySolutionsAPISecuritySolutionProperties,
  SecuritySolutionsAPIAllowedConnectionsResource,
  SecuritySolutionsAPIAllowedConnectionsResourceProperties,
  SecuritySolutionsAPIConnectableResource,
  SecuritySolutionsAPIConnectedResource,
  SecuritySolutionsAPIConnectionType,
  SecuritySolutionsAPIServerVulnerabilityAssessment,
  SecuritySolutionsAPIServerVulnerabilityAssessmentProperties,
  SecuritySolutionsAPIServerVulnerabilityAssessmentPropertiesProvisioningState,
  SecuritySolutionsAPITopologyResource,
  SecuritySolutionsAPITopologyResourceProperties,
  SecuritySolutionsAPITopologySingleResource,
  SecuritySolutionsAPITopologySingleResourceParent,
  SecuritySolutionsAPITopologySingleResourceChild,
  SecuritySolutionsAPIsecuritySolutionsReferenceDataList,
  SecuritySolutionsAPIsecuritySolutionsReferenceData,
  SecuritySolutionsAPIsecuritySolutionsReferenceDataProperties,
} from "./models/securitySolutionsAPI/index.js";
export {
  KnownSecuritySolutionsAPISecurityFamily,
  KnownSecuritySolutionsAPIExternalSecuritySolutionKind,
  KnownSecuritySolutionsAPIAadConnectivityState,
  KnownSecuritySolutionsAPIProtocol,
  KnownSecuritySolutionsAPIStatus,
  KnownSecuritySolutionsAPIStatusReason,
  KnownSecuritySolutionsAPIConnectionType,
  KnownSecuritySolutionsAPIServerVulnerabilityAssessmentPropertiesProvisioningState,
} from "./models/securitySolutionsAPI/index.js";
export type {
  SecurityStandardsAPISecurityStandard,
  SecurityStandardsAPISecurityStandardProperties,
  SecurityStandardsAPIStandardType,
  SecurityStandardsAPIPartialAssessmentProperties,
  SecurityStandardsAPIStandardSupportedCloud,
  SecurityStandardsAPIStandardMetadata,
  SecurityStandardsAPIStandardAssignment,
  SecurityStandardsAPIStandardAssignmentProperties,
  SecurityStandardsAPIEffect,
  SecurityStandardsAPIStandardAssignmentPropertiesExemptionData,
  SecurityStandardsAPIExemptionCategory,
  SecurityStandardsAPIAssignedAssessmentItem,
  SecurityStandardsAPIStandardAssignmentPropertiesAttestationData,
  SecurityStandardsAPIattestationComplianceState,
  SecurityStandardsAPIAttestationEvidence,
  SecurityStandardsAPIStandardAssignmentMetadata,
  SecurityStandardsAPICustomRecommendation,
  SecurityStandardsAPICustomRecommendationProperties,
  SecurityStandardsAPIRecommendationSupportedClouds,
  SecurityStandardsAPISeverityEnum,
  SecurityStandardsAPISecurityIssue,
} from "./models/securityStandardsAPI/index.js";
export {
  KnownSecurityStandardsAPIStandardType,
  KnownSecurityStandardsAPIStandardSupportedCloud,
  KnownSecurityStandardsAPIEffect,
  KnownSecurityStandardsAPIExemptionCategory,
  KnownSecurityStandardsAPIattestationComplianceState,
  KnownSecurityStandardsAPIRecommendationSupportedClouds,
  KnownSecurityStandardsAPISeverityEnum,
  KnownSecurityStandardsAPISecurityIssue,
} from "./models/securityStandardsAPI/index.js";
export type {
  SensitivitySettingsAPIGetSensitivitySettingsResponse,
  SensitivitySettingsAPIGetSensitivitySettingsResponseProperties,
  SensitivitySettingsAPIGetSensitivitySettingsResponsePropertiesMipInformation,
  SensitivitySettingsAPIMipIntegrationStatus,
  SensitivitySettingsAPILabel,
  SensitivitySettingsAPIInfoType,
  SensitivitySettingsAPIBuiltInInfoType,
  SensitivitySettingsAPIUpdateSensitivitySettingsRequest,
} from "./models/sensitivitySettingsAPI/index.js";
export { KnownSensitivitySettingsAPIMipIntegrationStatus } from "./models/sensitivitySettingsAPI/index.js";
export type {
  ServerVulnerabilityAssessmentsSettingsAPIServerVulnerabilityAssessmentsSetting,
  ServerVulnerabilityAssessmentsSettingsAPIServerVulnerabilityAssessmentsSettingUnion,
  ServerVulnerabilityAssessmentsSettingsAPIServerVulnerabilityAssessmentsSettingKindName,
  ServerVulnerabilityAssessmentsSettingsAPIServerVulnerabilityAssessmentsSettingKind,
  ServerVulnerabilityAssessmentsSettingsAPIAzureServersSetting,
  ServerVulnerabilityAssessmentsSettingsAPIServerVulnerabilityAssessmentsAzureSettingProperties,
  ServerVulnerabilityAssessmentsSettingsAPIServerVulnerabilityAssessmentsAzureSettingSelectedProvider,
} from "./models/serverVulnerabilityAssessmentsSettingsAPI/index.js";
export {
  KnownServerVulnerabilityAssessmentsSettingsAPIServerVulnerabilityAssessmentsSettingKindName,
  KnownServerVulnerabilityAssessmentsSettingsAPIServerVulnerabilityAssessmentsSettingKind,
  KnownServerVulnerabilityAssessmentsSettingsAPIServerVulnerabilityAssessmentsAzureSettingSelectedProvider,
} from "./models/serverVulnerabilityAssessmentsSettingsAPI/index.js";
export type {
  SettingsAPISetting,
  SettingsAPISettingUnion,
  SettingsAPISettingKind,
  SettingsAPIDataExportSettings,
  SettingsAPIDataExportSettingProperties,
  SettingsAPIAlertSyncSettings,
  SettingsAPIAlertSyncSettingProperties,
} from "./models/settingsAPI/index.js";
export { KnownSettingsAPISettingKind } from "./models/settingsAPI/index.js";
export type {
  SqlVulnerabilityAssessmentsAPIRuleResults,
  SqlVulnerabilityAssessmentsAPIRuleResultsProperties,
  SqlVulnerabilityAssessmentsAPIRuleResultsInput,
  SqlVulnerabilityAssessmentsAPIRulesResults,
  SqlVulnerabilityAssessmentsAPIRulesResultsInput,
  SqlVulnerabilityAssessmentsAPIScanResult,
  SqlVulnerabilityAssessmentsAPIScanResultProperties,
  SqlVulnerabilityAssessmentsAPIRuleStatus,
  SqlVulnerabilityAssessmentsAPIRemediation,
  SqlVulnerabilityAssessmentsAPIBaselineAdjustedResult,
  SqlVulnerabilityAssessmentsAPIBaseline,
  SqlVulnerabilityAssessmentsAPIVaRule,
  SqlVulnerabilityAssessmentsAPIRuleSeverity,
  SqlVulnerabilityAssessmentsAPIRuleType,
  SqlVulnerabilityAssessmentsAPIQueryCheck,
  SqlVulnerabilityAssessmentsAPIBenchmarkReference,
  SqlVulnerabilityAssessmentsAPISqlVulnerabilityAssessmentSettings,
  SqlVulnerabilityAssessmentsAPISqlVulnerabilityAssessmentSettingsProperties,
  SqlVulnerabilityAssessmentsAPISqlVulnerabilityAssessmentState,
  SqlVulnerabilityAssessmentsAPISqlVulnerabilityAssessmentScanOperationResult,
  SqlVulnerabilityAssessmentsAPISqlVulnerabilityAssessmentScanOperationResultProperties,
  SqlVulnerabilityAssessmentsAPIScanOperationStatus,
  SqlVulnerabilityAssessmentsAPIScanV2,
  SqlVulnerabilityAssessmentsAPIScanPropertiesV2,
  SqlVulnerabilityAssessmentsAPIScanTriggerType,
  SqlVulnerabilityAssessmentsAPIScanState,
} from "./models/sqlVulnerabilityAssessmentsAPI/index.js";
export {
  KnownSqlVulnerabilityAssessmentsAPIRuleStatus,
  KnownSqlVulnerabilityAssessmentsAPIRuleSeverity,
  KnownSqlVulnerabilityAssessmentsAPIRuleType,
  KnownSqlVulnerabilityAssessmentsAPISqlVulnerabilityAssessmentState,
  KnownSqlVulnerabilityAssessmentsAPIScanOperationStatus,
  KnownSqlVulnerabilityAssessmentsAPIScanTriggerType,
  KnownSqlVulnerabilityAssessmentsAPIScanState,
} from "./models/sqlVulnerabilityAssessmentsAPI/index.js";
export type {
  StandardsAPIStandard,
  StandardsAPIStandardProperties,
  StandardsAPIStandardComponentProperties,
  StandardsAPIStandardSupportedClouds,
  StandardsAPIAssignment,
  StandardsAPIAssignmentProperties,
  StandardsAPIAssignedComponentItem,
  StandardsAPIAssignmentPropertiesAdditionalData,
} from "./models/standardsAPI/index.js";
export type {
  SubAssessmentsAPISecuritySubAssessment,
  SubAssessmentsAPISecuritySubAssessmentProperties,
  SubAssessmentsAPISubAssessmentStatus,
  SubAssessmentsAPISubAssessmentStatusCode,
  SubAssessmentsAPIAdditionalData,
  SubAssessmentsAPIAdditionalDataUnion,
  SubAssessmentsAPIAssessedResourceType,
  SubAssessmentsAPISqlServerVulnerabilityProperties,
  SubAssessmentsAPIContainerRegistryVulnerabilityProperties,
  SubAssessmentsApicvss,
  SubAssessmentsAPICve,
  SubAssessmentsAPIVendorReference,
  SubAssessmentsAPIServerVulnerabilityProperties,
} from "./models/subAssessmentsAPI/index.js";
export {
  KnownSubAssessmentsAPISubAssessmentStatusCode,
  KnownSubAssessmentsAPIAssessedResourceType,
} from "./models/subAssessmentsAPI/index.js";
export type {
  TasksAPISecurityTask,
  TasksAPISecurityTaskProperties,
  TasksAPISecurityTaskParameters,
  TasksAPITaskUpdateActionType,
} from "./models/tasksAPI/index.js";
export { KnownTasksAPITaskUpdateActionType } from "./models/tasksAPI/index.js";
export type { SecurityCenterOptionalParams } from "./api/index.js";
export type {
  AdvancedThreatProtectionCreateOptionalParams,
  AdvancedThreatProtectionGetOptionalParams,
} from "./api/advancedThreatProtection/index.js";
export type {
  AlertsSimulateOptionalParams,
  AlertsListByResourceGroupOptionalParams,
  AlertsListOptionalParams,
  AlertsUpdateResourceGroupLevelStateToInProgressOptionalParams,
  AlertsUpdateResourceGroupLevelStateToActivateOptionalParams,
  AlertsUpdateResourceGroupLevelStateToDismissOptionalParams,
  AlertsUpdateResourceGroupLevelStateToResolveOptionalParams,
  AlertsListResourceGroupLevelByRegionOptionalParams,
  AlertsGetResourceGroupLevelOptionalParams,
  AlertsUpdateSubscriptionLevelStateToInProgressOptionalParams,
  AlertsUpdateSubscriptionLevelStateToActivateOptionalParams,
  AlertsUpdateSubscriptionLevelStateToResolveOptionalParams,
  AlertsUpdateSubscriptionLevelStateToDismissOptionalParams,
  AlertsListSubscriptionLevelByRegionOptionalParams,
  AlertsGetSubscriptionLevelOptionalParams,
} from "./api/alerts/index.js";
export type {
  AlertsSuppressionRulesListOptionalParams,
  AlertsSuppressionRulesDeleteOptionalParams,
  AlertsSuppressionRulesUpdateOptionalParams,
  AlertsSuppressionRulesGetOptionalParams,
} from "./api/alertsSuppressionRules/index.js";
export type {
  AllowedConnectionsListOptionalParams,
  AllowedConnectionsListByHomeRegionOptionalParams,
  AllowedConnectionsGetOptionalParams,
} from "./api/allowedConnections/index.js";
export type {
  APICollectionsListByResourceGroupOptionalParams,
  APICollectionsListBySubscriptionOptionalParams,
  APICollectionsListByAzureApiManagementServiceOptionalParams,
  APICollectionsOffboardAzureApiManagementApiOptionalParams,
  APICollectionsOnboardAzureApiManagementApiOptionalParams,
  APICollectionsGetByAzureApiManagementServiceOptionalParams,
} from "./api/apiCollections/index.js";
export type {
  ApplicationDeleteOptionalParams,
  ApplicationCreateOrUpdateOptionalParams,
  ApplicationGetOptionalParams,
} from "./api/application/index.js";
export type { ApplicationsListOptionalParams } from "./api/applications/index.js";
export type {
  AssessmentsListOptionalParams,
  AssessmentsDeleteOptionalParams,
  AssessmentsCreateOrUpdateOptionalParams,
  AssessmentsGetOptionalParams,
} from "./api/assessments/index.js";
export type {
  AssessmentsMetadataListOptionalParams,
  AssessmentsMetadataGetOptionalParams,
  AssessmentsMetadataListBySubscriptionOptionalParams,
  AssessmentsMetadataDeleteInSubscriptionOptionalParams,
  AssessmentsMetadataCreateInSubscriptionOptionalParams,
  AssessmentsMetadataGetInSubscriptionOptionalParams,
} from "./api/assessmentsMetadata/index.js";
export type {
  AssignmentsListBySubscriptionOptionalParams,
  AssignmentsListOptionalParams,
  AssignmentsDeleteOptionalParams,
  AssignmentsCreateOrUpdateOptionalParams,
  AssignmentsGetOptionalParams,
} from "./api/assignments/index.js";
export type {
  AutomationsValidateOptionalParams,
  AutomationsListOptionalParams,
  AutomationsListByResourceGroupOptionalParams,
  AutomationsDeleteOptionalParams,
  AutomationsUpdateOptionalParams,
  AutomationsCreateOrUpdateOptionalParams,
  AutomationsGetOptionalParams,
} from "./api/automations/index.js";
export type {
  AutoProvisioningSettingsListOptionalParams,
  AutoProvisioningSettingsCreateOptionalParams,
  AutoProvisioningSettingsGetOptionalParams,
} from "./api/autoProvisioningSettings/index.js";
export type {
  AzureDevOpsOrgsListAvailableOptionalParams,
  AzureDevOpsOrgsListOptionalParams,
  AzureDevOpsOrgsUpdateOptionalParams,
  AzureDevOpsOrgsCreateOrUpdateOptionalParams,
  AzureDevOpsOrgsGetOptionalParams,
} from "./api/azureDevOpsOrgs/index.js";
export type {
  AzureDevOpsProjectsListOptionalParams,
  AzureDevOpsProjectsUpdateOptionalParams,
  AzureDevOpsProjectsCreateOrUpdateOptionalParams,
  AzureDevOpsProjectsGetOptionalParams,
} from "./api/azureDevOpsProjects/index.js";
export type {
  AzureDevOpsReposListOptionalParams,
  AzureDevOpsReposUpdateOptionalParams,
  AzureDevOpsReposCreateOrUpdateOptionalParams,
  AzureDevOpsReposGetOptionalParams,
} from "./api/azureDevOpsRepos/index.js";
export type {
  ComplianceResultsListOptionalParams,
  ComplianceResultsGetOptionalParams,
} from "./api/complianceResults/index.js";
export type {
  CompliancesListOptionalParams,
  CompliancesGetOptionalParams,
} from "./api/compliances/index.js";
export type {
  CustomRecommendationsListOptionalParams,
  CustomRecommendationsDeleteOptionalParams,
  CustomRecommendationsCreateOrUpdateOptionalParams,
  CustomRecommendationsGetOptionalParams,
} from "./api/customRecommendations/index.js";
export type {
  DefenderForStorageGetMalwareScanOptionalParams,
  DefenderForStorageCancelMalwareScanOptionalParams,
  DefenderForStorageStartMalwareScanOptionalParams,
  DefenderForStorageListOptionalParams,
  DefenderForStorageCreateOptionalParams,
  DefenderForStorageGetOptionalParams,
} from "./api/defenderForStorage/index.js";
export type {
  DeviceSecurityGroupsListOptionalParams,
  DeviceSecurityGroupsDeleteOptionalParams,
  DeviceSecurityGroupsCreateOrUpdateOptionalParams,
  DeviceSecurityGroupsGetOptionalParams,
} from "./api/deviceSecurityGroups/index.js";
export type {
  DevOpsConfigurationsListOptionalParams,
  DevOpsConfigurationsDeleteOptionalParams,
  DevOpsConfigurationsUpdateOptionalParams,
  DevOpsConfigurationsCreateOrUpdateOptionalParams,
  DevOpsConfigurationsGetOptionalParams,
} from "./api/devOpsConfigurations/index.js";
export type { DevOpsOperationResultsGetOptionalParams } from "./api/devOpsOperationResults/index.js";
export type {
  DiscoveredSecuritySolutionsListOptionalParams,
  DiscoveredSecuritySolutionsListByHomeRegionOptionalParams,
  DiscoveredSecuritySolutionsGetOptionalParams,
} from "./api/discoveredSecuritySolutions/index.js";
export type {
  ExternalSecuritySolutionsListOptionalParams,
  ExternalSecuritySolutionsListByHomeRegionOptionalParams,
  ExternalSecuritySolutionsGetOptionalParams,
} from "./api/externalSecuritySolutions/index.js";
export type { GitHubIssuesCreateOptionalParams } from "./api/gitHubIssues/index.js";
export type {
  GitHubOwnersListAvailableOptionalParams,
  GitHubOwnersListOptionalParams,
  GitHubOwnersGetOptionalParams,
} from "./api/gitHubOwners/index.js";
export type {
  GitHubReposListOptionalParams,
  GitHubReposGetOptionalParams,
} from "./api/gitHubRepos/index.js";
export type {
  GitLabGroupsListAvailableOptionalParams,
  GitLabGroupsListOptionalParams,
  GitLabGroupsGetOptionalParams,
} from "./api/gitLabGroups/index.js";
export type {
  GitLabProjectsListOptionalParams,
  GitLabProjectsGetOptionalParams,
} from "./api/gitLabProjects/index.js";
export type { GitLabSubgroupsListOptionalParams } from "./api/gitLabSubgroups/index.js";
export type {
  GovernanceAssignmentsListOptionalParams,
  GovernanceAssignmentsDeleteOptionalParams,
  GovernanceAssignmentsCreateOrUpdateOptionalParams,
  GovernanceAssignmentsGetOptionalParams,
} from "./api/governanceAssignments/index.js";
export type {
  GovernanceRulesOperationResultsOptionalParams,
  GovernanceRulesExecuteOptionalParams,
  GovernanceRulesListOptionalParams,
  GovernanceRulesDeleteOptionalParams,
  GovernanceRulesCreateOrUpdateOptionalParams,
  GovernanceRulesGetOptionalParams,
} from "./api/governanceRules/index.js";
export type {
  HealthReportsListOptionalParams,
  HealthReportsGetOptionalParams,
} from "./api/healthReports/index.js";
export type {
  InformationProtectionPoliciesListOptionalParams,
  InformationProtectionPoliciesCreateOrUpdateOptionalParams,
  InformationProtectionPoliciesGetOptionalParams,
} from "./api/informationProtectionPolicies/index.js";
export type {
  IotSecuritySolutionListBySubscriptionOptionalParams,
  IotSecuritySolutionListByResourceGroupOptionalParams,
  IotSecuritySolutionDeleteOptionalParams,
  IotSecuritySolutionUpdateOptionalParams,
  IotSecuritySolutionCreateOrUpdateOptionalParams,
  IotSecuritySolutionGetOptionalParams,
} from "./api/iotSecuritySolution/index.js";
export type {
  IotSecuritySolutionAnalyticsListOptionalParams,
  IotSecuritySolutionAnalyticsGetOptionalParams,
} from "./api/iotSecuritySolutionAnalytics/index.js";
export type {
  IotSecuritySolutionsAnalyticsAggregatedAlertDismissOptionalParams,
  IotSecuritySolutionsAnalyticsAggregatedAlertListOptionalParams,
  IotSecuritySolutionsAnalyticsAggregatedAlertGetOptionalParams,
} from "./api/iotSecuritySolutionsAnalyticsAggregatedAlert/index.js";
export type {
  IotSecuritySolutionsAnalyticsRecommendationListOptionalParams,
  IotSecuritySolutionsAnalyticsRecommendationGetOptionalParams,
} from "./api/iotSecuritySolutionsAnalyticsRecommendation/index.js";
export type {
  JitNetworkAccessPoliciesListByResourceGroupOptionalParams,
  JitNetworkAccessPoliciesListOptionalParams,
  JitNetworkAccessPoliciesInitiateOptionalParams,
  JitNetworkAccessPoliciesListByRegionOptionalParams,
  JitNetworkAccessPoliciesListByResourceGroupAndRegionOptionalParams,
  JitNetworkAccessPoliciesDeleteOptionalParams,
  JitNetworkAccessPoliciesCreateOrUpdateOptionalParams,
  JitNetworkAccessPoliciesGetOptionalParams,
} from "./api/jitNetworkAccessPolicies/index.js";
export type {
  LocationsListOptionalParams,
  LocationsGetOptionalParams,
} from "./api/locations/index.js";
export type {
  MdeOnboardingsListOptionalParams,
  MdeOnboardingsGetOptionalParams,
} from "./api/mdeOnboardings/index.js";
export type { OperationResultsGetOptionalParams } from "./api/operationResults/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type { OperationStatusesGetOptionalParams } from "./api/operationStatuses/index.js";
export type {
  PricingsListOptionalParams,
  PricingsDeleteOptionalParams,
  PricingsUpdateOptionalParams,
  PricingsGetOptionalParams,
} from "./api/pricings/index.js";
export type {
  PrivateEndpointConnectionsListOptionalParams,
  PrivateEndpointConnectionsDeleteOptionalParams,
  PrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  PrivateEndpointConnectionsGetOptionalParams,
} from "./api/privateEndpointConnections/index.js";
export type {
  PrivateLinkResourcesListOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./api/privateLinkResources/index.js";
export type {
  PrivateLinksListBySubscriptionOptionalParams,
  PrivateLinksListOptionalParams,
  PrivateLinksDeleteOptionalParams,
  PrivateLinksUpdateOptionalParams,
  PrivateLinksCreateOptionalParams,
  PrivateLinksHeadOptionalParams,
  PrivateLinksGetOptionalParams,
} from "./api/privateLinks/index.js";
export type {
  RegulatoryComplianceAssessmentsListOptionalParams,
  RegulatoryComplianceAssessmentsGetOptionalParams,
} from "./api/regulatoryComplianceAssessments/index.js";
export type {
  RegulatoryComplianceControlsListOptionalParams,
  RegulatoryComplianceControlsGetOptionalParams,
} from "./api/regulatoryComplianceControls/index.js";
export type {
  RegulatoryComplianceStandardsListOptionalParams,
  RegulatoryComplianceStandardsGetOptionalParams,
} from "./api/regulatoryComplianceStandards/index.js";
export type {
  SecureScoreControlDefinitionsListBySubscriptionOptionalParams,
  SecureScoreControlDefinitionsListOptionalParams,
} from "./api/secureScoreControlDefinitions/index.js";
export type {
  SecureScoreControlsListOptionalParams,
  SecureScoreControlsListBySecureScoreOptionalParams,
} from "./api/secureScoreControls/index.js";
export type {
  SecureScoresListOptionalParams,
  SecureScoresGetOptionalParams,
} from "./api/secureScores/index.js";
export type {
  SecurityConnectorApplicationDeleteOptionalParams,
  SecurityConnectorApplicationCreateOrUpdateOptionalParams,
  SecurityConnectorApplicationGetOptionalParams,
} from "./api/securityConnectorApplication/index.js";
export type { SecurityConnectorApplicationsListOptionalParams } from "./api/securityConnectorApplications/index.js";
export type {
  SecurityConnectorsListOptionalParams,
  SecurityConnectorsListByResourceGroupOptionalParams,
  SecurityConnectorsDeleteOptionalParams,
  SecurityConnectorsUpdateOptionalParams,
  SecurityConnectorsCreateOrUpdateOptionalParams,
  SecurityConnectorsGetOptionalParams,
} from "./api/securityConnectors/index.js";
export type {
  SecurityContactsListOptionalParams,
  SecurityContactsDeleteOptionalParams,
  SecurityContactsCreateOptionalParams,
  SecurityContactsGetOptionalParams,
} from "./api/securityContacts/index.js";
export type {
  SecurityOperatorsListOptionalParams,
  SecurityOperatorsDeleteOptionalParams,
  SecurityOperatorsCreateOrUpdateOptionalParams,
  SecurityOperatorsGetOptionalParams,
} from "./api/securityOperators/index.js";
export type {
  SecuritySolutionsListOptionalParams,
  SecuritySolutionsGetOptionalParams,
} from "./api/securitySolutions/index.js";
export type {
  SecuritySolutionsReferenceDataListByHomeRegionOptionalParams,
  SecuritySolutionsReferenceDataListOptionalParams,
} from "./api/securitySolutionsReferenceData/index.js";
export type {
  SecurityStandardsListOptionalParams,
  SecurityStandardsDeleteOptionalParams,
  SecurityStandardsCreateOrUpdateOptionalParams,
  SecurityStandardsGetOptionalParams,
} from "./api/securityStandards/index.js";
export type {
  SensitivitySettingsListOptionalParams,
  SensitivitySettingsCreateOrUpdateOptionalParams,
  SensitivitySettingsGetOptionalParams,
} from "./api/sensitivitySettings/index.js";
export type {
  ServerVulnerabilityAssessmentListByExtendedResourceOptionalParams,
  ServerVulnerabilityAssessmentDeleteOptionalParams,
  ServerVulnerabilityAssessmentCreateOrUpdateOptionalParams,
  ServerVulnerabilityAssessmentGetOptionalParams,
} from "./api/serverVulnerabilityAssessment/index.js";
export type {
  ServerVulnerabilityAssessmentsSettingsListBySubscriptionOptionalParams,
  ServerVulnerabilityAssessmentsSettingsDeleteOptionalParams,
  ServerVulnerabilityAssessmentsSettingsCreateOrUpdateOptionalParams,
  ServerVulnerabilityAssessmentsSettingsGetOptionalParams,
} from "./api/serverVulnerabilityAssessmentsSettings/index.js";
export type {
  SettingsListOptionalParams,
  SettingsUpdateOptionalParams,
  SettingsGetOptionalParams,
} from "./api/settings/index.js";
export type {
  SqlVulnerabilityAssessmentBaselineRulesAddOptionalParams,
  SqlVulnerabilityAssessmentBaselineRulesListOptionalParams,
  SqlVulnerabilityAssessmentBaselineRulesDeleteOptionalParams,
  SqlVulnerabilityAssessmentBaselineRulesCreateOrUpdateOptionalParams,
  SqlVulnerabilityAssessmentBaselineRulesGetOptionalParams,
} from "./api/sqlVulnerabilityAssessmentBaselineRules/index.js";
export type {
  SqlVulnerabilityAssessmentScanResultsListOptionalParams,
  SqlVulnerabilityAssessmentScanResultsGetOptionalParams,
} from "./api/sqlVulnerabilityAssessmentScanResults/index.js";
export type {
  SqlVulnerabilityAssessmentScansListOptionalParams,
  SqlVulnerabilityAssessmentScansGetOptionalParams,
  SqlVulnerabilityAssessmentScansGetScanOperationResultOptionalParams,
  SqlVulnerabilityAssessmentScansInitiateScanOptionalParams,
} from "./api/sqlVulnerabilityAssessmentScans/index.js";
export type {
  SqlVulnerabilityAssessmentSettingsDeleteOptionalParams,
  SqlVulnerabilityAssessmentSettingsCreateOrUpdateOptionalParams,
  SqlVulnerabilityAssessmentSettingsGetOptionalParams,
} from "./api/sqlVulnerabilityAssessmentSettings/index.js";
export type {
  StandardAssignmentsListOptionalParams,
  StandardAssignmentsDeleteOptionalParams,
  StandardAssignmentsCreateOptionalParams,
  StandardAssignmentsGetOptionalParams,
} from "./api/standardAssignments/index.js";
export type {
  StandardsListBySubscriptionOptionalParams,
  StandardsListOptionalParams,
  StandardsDeleteOptionalParams,
  StandardsCreateOrUpdateOptionalParams,
  StandardsGetOptionalParams,
} from "./api/standards/index.js";
export type {
  SubAssessmentsListAllOptionalParams,
  SubAssessmentsListOptionalParams,
  SubAssessmentsGetOptionalParams,
} from "./api/subAssessments/index.js";
export type {
  TasksListOptionalParams,
  TasksUpdateSubscriptionLevelTaskStateOptionalParams,
  TasksListByHomeRegionOptionalParams,
  TasksGetSubscriptionLevelTaskOptionalParams,
  TasksUpdateResourceGroupLevelTaskStateOptionalParams,
  TasksListByResourceGroupOptionalParams,
  TasksGetResourceGroupLevelTaskOptionalParams,
} from "./api/tasks/index.js";
export type {
  TopologyListOptionalParams,
  TopologyListByHomeRegionOptionalParams,
  TopologyGetOptionalParams,
} from "./api/topology/index.js";
export type {
  WorkspaceSettingsListOptionalParams,
  WorkspaceSettingsDeleteOptionalParams,
  WorkspaceSettingsUpdateOptionalParams,
  WorkspaceSettingsCreateOptionalParams,
  WorkspaceSettingsGetOptionalParams,
} from "./api/workspaceSettings/index.js";
export type {
  AdvancedThreatProtectionOperations,
  AlertsOperations,
  AlertsSuppressionRulesOperations,
  AllowedConnectionsOperations,
  APICollectionsOperations,
  ApplicationOperations,
  ApplicationsOperations,
  AssessmentsOperations,
  AssessmentsMetadataOperations,
  AssignmentsOperations,
  AutomationsOperations,
  AutoProvisioningSettingsOperations,
  AzureDevOpsOrgsOperations,
  AzureDevOpsProjectsOperations,
  AzureDevOpsReposOperations,
  ComplianceResultsOperations,
  CompliancesOperations,
  CustomRecommendationsOperations,
  DefenderForStorageOperations,
  DeviceSecurityGroupsOperations,
  DevOpsConfigurationsOperations,
  DevOpsOperationResultsOperations,
  DiscoveredSecuritySolutionsOperations,
  ExternalSecuritySolutionsOperations,
  GitHubIssuesOperations,
  GitHubOwnersOperations,
  GitHubReposOperations,
  GitLabGroupsOperations,
  GitLabProjectsOperations,
  GitLabSubgroupsOperations,
  GovernanceAssignmentsOperations,
  GovernanceRulesOperations,
  HealthReportsOperations,
  InformationProtectionPoliciesOperations,
  IotSecuritySolutionOperations,
  IotSecuritySolutionAnalyticsOperations,
  IotSecuritySolutionsAnalyticsAggregatedAlertOperations,
  IotSecuritySolutionsAnalyticsRecommendationOperations,
  JitNetworkAccessPoliciesOperations,
  LocationsOperations,
  MdeOnboardingsOperations,
  OperationResultsOperations,
  OperationsOperations,
  OperationStatusesOperations,
  PricingsOperations,
  PrivateEndpointConnectionsOperations,
  PrivateLinkResourcesOperations,
  PrivateLinksOperations,
  RegulatoryComplianceAssessmentsOperations,
  RegulatoryComplianceControlsOperations,
  RegulatoryComplianceStandardsOperations,
  SecureScoreControlDefinitionsOperations,
  SecureScoreControlsOperations,
  SecureScoresOperations,
  SecurityConnectorApplicationOperations,
  SecurityConnectorApplicationsOperations,
  SecurityConnectorsOperations,
  SecurityContactsOperations,
  SecurityOperatorsOperations,
  SecuritySolutionsOperations,
  SecuritySolutionsReferenceDataOperations,
  SecurityStandardsOperations,
  SensitivitySettingsOperations,
  ServerVulnerabilityAssessmentOperations,
  ServerVulnerabilityAssessmentsSettingsOperations,
  SettingsOperations,
  SqlVulnerabilityAssessmentBaselineRulesOperations,
  SqlVulnerabilityAssessmentScanResultsOperations,
  SqlVulnerabilityAssessmentScansOperations,
  SqlVulnerabilityAssessmentSettingsOperations,
  StandardAssignmentsOperations,
  StandardsOperations,
  SubAssessmentsOperations,
  TasksOperations,
  TopologyOperations,
  WorkspaceSettingsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
