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
  ArmPrivateEndpointConnection,
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
  Alert,
  AlertProperties,
  AlertSeverity,
  Intent,
  ResourceIdentifier,
  ResourceIdentifierUnion,
  ResourceIdentifierType,
  AzureResourceIdentifier,
  LogAnalyticsIdentifier,
  AlertStatus,
  AlertEntity,
  AlertPropertiesSupportingEvidence,
  AlertSimulatorRequestBody,
  AlertSimulatorRequestProperties,
  AlertSimulatorRequestPropertiesUnion,
  Kind,
  AlertSimulatorBundlesRequestProperties,
  BundleType,
} from "./models/alertsAPI/index.js";
export {
  KnownAlertSeverity,
  KnownIntent,
  KnownResourceIdentifierType,
  KnownAlertStatus,
  KnownKind,
  KnownBundleType,
} from "./models/alertsAPI/index.js";
export type {
  AlertsSuppressionRule,
  AlertsSuppressionRuleProperties,
  RuleState,
  SuppressionAlertsScope,
  ScopeElement,
} from "./models/alertsSuppressionRulesAPI/index.js";
export type { ApiCollection, ApiCollectionProperties } from "./models/apiCollectionsAPI/index.js";
export type {
  Application,
  ApplicationProperties,
  ApplicationSourceResourceType,
} from "./models/applicationsAPI/index.js";
export { KnownApplicationSourceResourceType } from "./models/applicationsAPI/index.js";
export type {
  SecurityAssessmentMetadataResponse,
  SecurityAssessmentMetadataPropertiesResponse,
  SecurityAssessmentMetadataPropertiesResponsePublishDates,
  Tactics,
  Techniques,
  SecurityAssessmentMetadataProperties,
  Categories,
  UserImpact,
  ImplementationEffort,
  Threats,
  AssessmentType,
  SecurityAssessmentMetadataPartnerData,
  SecurityAssessmentResponse,
  SecurityAssessmentPropertiesResponse,
  AssessmentStatusResponse,
  AssessmentStatus,
  AssessmentStatusCode,
  SecurityAssessmentPropertiesBase,
  SecurityAssessmentPropertiesBaseRisk,
  RiskLevel,
  SecurityAssessmentPropertiesBaseRiskPathsItem,
  SecurityAssessmentPropertiesBaseRiskPathsItemNodesItem,
  SecurityAssessmentPropertiesBaseRiskPathsItemEdgeItem,
  AzureResourceDetails,
  AssessmentLinks,
  SecurityAssessmentPartnerData,
  SecurityAssessment,
  SecurityAssessmentProperties,
  ExpandEnum,
} from "./models/assessmentAPI/index.js";
export {
  KnownTactics,
  KnownTechniques,
  KnownCategories,
  KnownUserImpact,
  KnownImplementationEffort,
  KnownThreats,
  KnownAssessmentType,
  KnownAssessmentStatusCode,
  KnownRiskLevel,
  KnownExpandEnum,
} from "./models/assessmentAPI/index.js";
export type {
  AdvancedThreatProtectionSetting,
  AdvancedThreatProtectionProperties,
} from "./models/atpSettingsAPI/index.js";
export type {
  Automation,
  AutomationProperties,
  AutomationScope,
  AutomationSource,
  EventSource,
  AutomationRuleSet,
  AutomationTriggeringRule,
  PropertyType,
  Operator,
  AutomationAction,
  AutomationActionUnion,
  AutomationActionLogicApp,
  AutomationActionEventHub,
  AutomationActionWorkspace,
  AutomationUpdateModel,
  AutomationValidationStatus,
  SecurityContact,
  SecurityContactProperties,
  NotificationsSource,
  NotificationsSourceUnion,
  SourceType,
  NotificationsSourceAlert,
  MinimalSeverity,
  NotificationsSourceAttackPath,
  MinimalRiskLevel,
  SecurityContactPropertiesNotificationsByRole,
  SecurityContactRole,
  SecurityContactName,
} from "./models/automationsAPI/index.js";
export {
  KnownEventSource,
  KnownPropertyType,
  KnownOperator,
  KnownSourceType,
  KnownMinimalSeverity,
  KnownMinimalRiskLevel,
  KnownSecurityContactRole,
  KnownSecurityContactName,
} from "./models/automationsAPI/index.js";
export type {
  CloudError,
  CloudErrorBody,
  Severity,
  ActionType,
  Tags,
  State,
  Source,
  OperationStatus,
  ProvisioningState,
  AssignedStandardItem,
  SettingName,
  ResourceDetails,
  ResourceDetailsUnion,
} from "./models/common/index.js";
export {
  KnownSeverity,
  KnownActionType,
  KnownState,
  KnownSource,
  KnownProvisioningState,
  KnownSettingName,
} from "./models/common/index.js";
export type {
  ComplianceResult,
  ComplianceResultProperties,
  ResourceStatus,
} from "./models/complianceResultsAPI/index.js";
export { KnownResourceStatus } from "./models/complianceResultsAPI/index.js";
export type {
  DefenderForStorageSetting,
  DefenderForStorageSettingProperties,
  MalwareScanningProperties,
  OnUploadProperties,
  OnUploadFilters,
  BlobScanResultsOptions,
  AutomatedResponseType,
  SensitiveDataDiscoveryProperties,
  MalwareScan,
  MalwareScanProperties,
  ScanSummary,
  BlobsScanSummary,
  FilesScanSummary,
} from "./models/defenderForStorageAPI/index.js";
export {
  KnownBlobScanResultsOptions,
  KnownAutomatedResponseType,
} from "./models/defenderForStorageAPI/index.js";
export type {
  GovernanceAssignment,
  GovernanceAssignmentProperties,
  RemediationEta,
  GovernanceEmailNotification,
  GovernanceAssignmentAdditionalData,
  GovernanceRule,
  GovernanceRuleProperties,
  GovernanceRuleType,
  GovernanceRuleSourceResourceType,
  GovernanceRuleOwnerSource,
  GovernanceRuleOwnerSourceType,
  GovernanceRuleEmailNotification,
  GovernanceRuleMetadata,
  ExecuteGovernanceRuleParams,
  OperationResult,
  OperationResultStatus,
} from "./models/governanceAPI/index.js";
export {
  KnownGovernanceRuleType,
  KnownGovernanceRuleSourceResourceType,
  KnownGovernanceRuleOwnerSourceType,
  KnownOperationResultStatus,
} from "./models/governanceAPI/index.js";
export type {
  HealthReport,
  HealthReportProperties,
  ResourceDetails as SecurityCenterResourceDetails,
  EnvironmentDetails,
  HealthDataClassification,
  Status,
  StatusName,
  Issue,
} from "./models/healthReportsAPI/index.js";
export { KnownStatusName } from "./models/healthReportsAPI/index.js";
export type {
  DeviceSecurityGroup,
  DeviceSecurityGroupProperties,
  ThresholdCustomAlertRule,
  ThresholdCustomAlertRuleUnion,
  TimeWindowCustomAlertRule,
  AllowlistCustomAlertRule,
  DenylistCustomAlertRule,
  CustomAlertRule,
  CustomAlertRuleUnion,
  ListCustomAlertRule,
  ListCustomAlertRuleUnion,
  ValueType,
  IoTSecuritySolutionAnalyticsModel,
  IoTSecuritySolutionAnalyticsModelProperties,
  IoTSeverityMetrics,
  IoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItem,
  IoTSecurityAlertedDevice,
  IoTSecurityDeviceAlert,
  ReportedSeverity,
  IoTSecurityDeviceRecommendation,
  IoTSecuritySolutionAnalyticsModelList,
  IoTSecuritySolutionModel,
  IoTSecuritySolutionProperties,
  SecuritySolutionStatus,
  ExportData,
  DataSource,
  UserDefinedResourcesProperties,
  RecommendationConfigurationProperties,
  RecommendationType,
  RecommendationConfigStatus,
  UnmaskedIpLoggingStatus,
  AdditionalWorkspacesProperties,
  AdditionalWorkspaceType,
  AdditionalWorkspaceDataType,
  UpdateIotSecuritySolutionData,
  UpdateIoTSecuritySolutionProperties,
  TagsResource,
  IoTSecurityAggregatedAlert,
  IoTSecurityAggregatedAlertProperties,
  IoTSecurityAggregatedAlertPropertiesTopDevicesListItem,
  IoTSecurityAggregatedRecommendation,
  IoTSecurityAggregatedRecommendationProperties,
} from "./models/ioTSecurityAPI/index.js";
export {
  KnownValueType,
  KnownReportedSeverity,
  KnownSecuritySolutionStatus,
  KnownExportData,
  KnownDataSource,
  KnownRecommendationType,
  KnownRecommendationConfigStatus,
  KnownUnmaskedIpLoggingStatus,
  KnownAdditionalWorkspaceType,
  KnownAdditionalWorkspaceDataType,
} from "./models/ioTSecurityAPI/index.js";
export type {
  AutoProvisioningSetting,
  AutoProvisioningSettingProperties,
  AutoProvision,
  Compliance,
  ComplianceProperties,
  ComplianceSegment,
  InformationProtectionPolicy,
  InformationProtectionPolicyProperties,
  SensitivityLabel,
  Rank,
  InformationType,
  InformationProtectionKeyword,
  InformationProtectionPolicyName,
  WorkspaceSetting,
  WorkspaceSettingProperties,
} from "./models/legacySettingsAPI/index.js";
export {
  KnownAutoProvision,
  KnownInformationProtectionPolicyName,
} from "./models/legacySettingsAPI/index.js";
export type { AscLocation } from "./models/locationsAPI/index.js";
export type {
  MdeOnboardingData,
  MdeOnboardingDataProperties,
} from "./models/mdeOnboardingAPI/index.js";
export type {
  Pricing,
  PricingProperties,
  PricingTier,
  Enforce,
  Inherited,
  ResourcesCoverageStatus,
  Extension,
  IsEnabled,
} from "./models/pricingsAPI/index.js";
export {
  KnownPricingTier,
  KnownEnforce,
  KnownInherited,
  KnownResourcesCoverageStatus,
  KnownIsEnabled,
} from "./models/pricingsAPI/index.js";
export type {
  PrivateLinkGroupResource,
  PrivateEndpointConnection,
  PrivateLinkResource,
  PrivateLinkProperties,
  PublicNetworkAccess,
  PrivateLinkUpdate,
} from "./models/privateLinksAPI/index.js";
export { KnownPublicNetworkAccess } from "./models/privateLinksAPI/index.js";
export type {
  RegulatoryComplianceStandard,
  RegulatoryComplianceStandardProperties,
  RegulatoryComplianceControl,
  RegulatoryComplianceControlProperties,
  RegulatoryComplianceAssessment,
  RegulatoryComplianceAssessmentProperties,
} from "./models/regulatoryComplianceAPI/index.js";
export type {
  SecureScoreItem,
  SecureScoreItemProperties,
  ScoreDetails,
  SecureScoreControlDetails,
  SecureScoreControlScoreDetails,
  SecureScoreControlDefinitionItem,
  SecureScoreControlDefinitionItemProperties,
  SecureScoreControlDefinitionSource,
  ControlType,
  AzureResourceLink,
  ExpandControlsEnum,
} from "./models/secureScoreAPI/index.js";
export { KnownControlType, KnownExpandControlsEnum } from "./models/secureScoreAPI/index.js";
export type {
  SecurityConnector,
  SecurityConnectorProperties,
  CloudName,
  CloudOffering,
  CloudOfferingUnion,
  OfferingType,
  CspmMonitorAwsOffering,
  CspmMonitorAwsOfferingNativeCloudConnection,
  DefenderForContainersAwsOffering,
  DefenderForContainersAwsOfferingKubernetesService,
  DefenderForContainersAwsOfferingKubernetesDataCollection,
  DefenderForContainersAwsOfferingCloudWatchToKinesis,
  DefenderForContainersAwsOfferingKinesisToS3,
  DefenderForContainersAwsOfferingMdcContainersImageAssessment,
  DefenderForContainersAwsOfferingMdcContainersAgentlessDiscoveryK8S,
  DefenderForContainersAwsOfferingVmScanners,
  DefenderForServersAwsOffering,
  DefenderForServersAwsOfferingDefenderForServers,
  DefenderForServersAwsOfferingArcAutoProvisioning,
  DefenderForServersAwsOfferingVaAutoProvisioning,
  DefenderForServersAwsOfferingVaAutoProvisioningConfiguration,
  Type,
  DefenderForServersAwsOfferingMdeAutoProvisioning,
  DefenderForServersAwsOfferingSubPlan,
  SubPlan,
  DefenderForServersAwsOfferingVmScanners,
  DefenderFoDatabasesAwsOffering,
  DefenderFoDatabasesAwsOfferingArcAutoProvisioning,
  DefenderFoDatabasesAwsOfferingRds,
  DefenderFoDatabasesAwsOfferingDatabasesDspm,
  CspmMonitorGcpOffering,
  CspmMonitorGcpOfferingNativeCloudConnection,
  DefenderForServersGcpOffering,
  DefenderForServersGcpOfferingDefenderForServers,
  DefenderForServersGcpOfferingArcAutoProvisioning,
  DefenderForServersGcpOfferingVaAutoProvisioning,
  DefenderForServersGcpOfferingVaAutoProvisioningConfiguration,
  DefenderForServersGcpOfferingMdeAutoProvisioning,
  DefenderForServersGcpOfferingSubPlan,
  DefenderForServersGcpOfferingVmScanners,
  DefenderForDatabasesGcpOffering,
  DefenderForDatabasesGcpOfferingArcAutoProvisioning,
  DefenderForDatabasesGcpOfferingDefenderForDatabasesArcAutoProvisioning,
  DefenderForContainersGcpOffering,
  DefenderForContainersGcpOfferingNativeCloudConnection,
  DefenderForContainersGcpOfferingDataPipelineNativeCloudConnection,
  DefenderForContainersGcpOfferingMdcContainersImageAssessment,
  DefenderForContainersGcpOfferingMdcContainersAgentlessDiscoveryK8S,
  DefenderForContainersGcpOfferingVmScanners,
  CspmMonitorGithubOffering,
  CspmMonitorAzureDevOpsOffering,
  DefenderCspmAwsOffering,
  DefenderCspmAwsOfferingVmScanners,
  DefenderCspmAwsOfferingDataSensitivityDiscovery,
  DefenderCspmAwsOfferingDatabasesDspm,
  DefenderCspmAwsOfferingCiem,
  DefenderCspmAwsOfferingCiemCiemDiscovery,
  DefenderCspmAwsOfferingCiemCiemOidc,
  DefenderCspmAwsOfferingMdcContainersImageAssessment,
  DefenderCspmAwsOfferingMdcContainersAgentlessDiscoveryK8S,
  DefenderCspmGcpOffering,
  DefenderCspmGcpOfferingCiemDiscovery,
  DefenderCspmGcpOfferingVmScanners,
  DefenderCspmGcpOfferingDataSensitivityDiscovery,
  DefenderCspmGcpOfferingMdcContainersImageAssessment,
  DefenderCspmGcpOfferingMdcContainersAgentlessDiscoveryK8S,
  CspmMonitorGitLabOffering,
  CspmMonitorDockerHubOffering,
  DefenderForContainersDockerHubOffering,
  DefenderCspmDockerHubOffering,
  CspmMonitorJFrogOffering,
  DefenderForContainersJFrogOffering,
  DefenderCspmJFrogOffering,
  DefenderCspmJFrogOfferingMdcContainersImageAssessment,
  EnvironmentData,
  EnvironmentDataUnion,
  EnvironmentType,
  AwsEnvironmentData,
  AwsOrganizationalData,
  AwsOrganizationalDataUnion,
  OrganizationMembershipType,
  AwsOrganizationalDataMaster,
  AwsOrganizationalDataMember,
  GcpProjectEnvironmentData,
  GcpOrganizationalData,
  GcpOrganizationalDataUnion,
  GcpOrganizationalDataOrganization,
  GcpOrganizationalDataMember,
  GcpProjectDetails,
  GithubScopeEnvironmentData,
  AzureDevOpsScopeEnvironmentData,
  GitlabScopeEnvironmentData,
  DockerHubEnvironmentData,
  Authentication,
  AuthenticationUnion,
  AuthenticationType,
  AccessTokenAuthentication,
  JFrogEnvironmentData,
  VmScannersAws,
  VmScannersBase,
  VmScannersBaseConfiguration,
  ScanningMode,
  ArcAutoProvisioningAws,
  ArcAutoProvisioning,
  ArcAutoProvisioningConfiguration,
  ArcAutoProvisioningGcp,
  VmScannersGcp,
} from "./models/securityConnectorsAPI/index.js";
export {
  KnownCloudName,
  KnownOfferingType,
  KnownType,
  KnownSubPlan,
  KnownEnvironmentType,
  KnownOrganizationMembershipType,
  KnownAuthenticationType,
  KnownScanningMode,
} from "./models/securityConnectorsAPI/index.js";
export type {
  AzureDevOpsOrg,
  AzureDevOpsOrgProperties,
  DevOpsProvisioningState,
  OnboardingState,
  ActionableRemediation,
  ActionableRemediationState,
  CategoryConfiguration,
  RuleCategory,
  TargetBranchConfiguration,
  AnnotateDefaultBranchState,
  InheritFromParentState,
  AzureDevOpsOrgListResponse,
  GitHubOwner,
  GitHubOwnerProperties,
  GitHubOwnerListResponse,
  GitLabGroup,
  GitLabGroupProperties,
  GitLabGroupListResponse,
  DevOpsConfiguration,
  DevOpsConfigurationProperties,
  Authorization,
  AutoDiscovery,
  DevOpsCapability,
  AgentlessConfiguration,
  AgentlessEnablement,
  InventoryListKind,
  InventoryList,
  InventoryKind,
  AzureDevOpsProject,
  AzureDevOpsProjectProperties,
  GitLabProject,
  GitLabProjectProperties,
  AzureDevOpsRepository,
  AzureDevOpsRepositoryProperties,
  GitHubRepository,
  GitHubRepositoryProperties,
  IssueCreationRequest,
} from "./models/securityConnectorsDevOpsAPI/index.js";
export {
  KnownDevOpsProvisioningState,
  KnownOnboardingState,
  KnownActionableRemediationState,
  KnownRuleCategory,
  KnownAnnotateDefaultBranchState,
  KnownInheritFromParentState,
  KnownAutoDiscovery,
  KnownAgentlessEnablement,
  KnownInventoryListKind,
  KnownInventoryKind,
} from "./models/securityConnectorsDevOpsAPI/index.js";
export type { PrivateLinkParameters } from "./models/securityManagementClient/index.js";
export type { SecurityOperator } from "./models/securityOperatorsAPI/index.js";
export type {
  DiscoveredSecuritySolution,
  DiscoveredSecuritySolutionProperties,
  SecurityFamily,
  ExternalSecuritySolution,
  ExternalSecuritySolutionUnion,
  ExternalSecuritySolutionKind,
  CefExternalSecuritySolution,
  CefSolutionProperties,
  AtaExternalSecuritySolution,
  AtaSolutionProperties,
  AadExternalSecuritySolution,
  AadSolutionProperties,
  ConnectedWorkspace,
  AadConnectivityState,
  ExternalSecuritySolutionProperties,
  JitNetworkAccessPolicy,
  JitNetworkAccessPolicyProperties,
  JitNetworkAccessPolicyVirtualMachine,
  JitNetworkAccessPortRule,
  Protocol,
  JitNetworkAccessRequest,
  JitNetworkAccessRequestVirtualMachine,
  JitNetworkAccessRequestPort,
  Status as SecurityCenterStatus,
  StatusReason,
  JitNetworkAccessPolicyInitiateRequest,
  JitNetworkAccessPolicyInitiateVirtualMachine,
  JitNetworkAccessPolicyInitiatePort,
  SecuritySolution,
  SecuritySolutionProperties,
  AllowedConnectionsResource,
  AllowedConnectionsResourceProperties,
  ConnectableResource,
  ConnectedResource,
  ConnectionType,
  ServerVulnerabilityAssessment,
  ServerVulnerabilityAssessmentProperties,
  ServerVulnerabilityAssessmentPropertiesProvisioningState,
  TopologyResource,
  TopologyResourceProperties,
  TopologySingleResource,
  TopologySingleResourceParent,
  TopologySingleResourceChild,
  SecuritySolutionsReferenceDataList,
  SecuritySolutionsReferenceData,
  SecuritySolutionsReferenceDataProperties,
} from "./models/securitySolutionsAPI/index.js";
export {
  KnownSecurityFamily,
  KnownExternalSecuritySolutionKind,
  KnownAadConnectivityState,
  KnownProtocol,
  KnownStatus,
  KnownStatusReason,
  KnownConnectionType,
  KnownServerVulnerabilityAssessmentPropertiesProvisioningState,
} from "./models/securitySolutionsAPI/index.js";
export type {
  SecurityStandard,
  SecurityStandardProperties,
  StandardType,
  PartialAssessmentProperties,
  StandardSupportedCloud,
  StandardMetadata,
  StandardAssignment,
  StandardAssignmentProperties,
  Effect,
  StandardAssignmentPropertiesExemptionData,
  ExemptionCategory,
  AssignedAssessmentItem,
  StandardAssignmentPropertiesAttestationData,
  AttestationComplianceState,
  AttestationEvidence,
  StandardAssignmentMetadata,
  CustomRecommendation,
  CustomRecommendationProperties,
  RecommendationSupportedClouds,
  SeverityEnum,
  SecurityIssue,
} from "./models/securityStandardsAPI/index.js";
export {
  KnownStandardType,
  KnownStandardSupportedCloud,
  KnownEffect,
  KnownExemptionCategory,
  KnownAttestationComplianceState,
  KnownRecommendationSupportedClouds,
  KnownSeverityEnum,
  KnownSecurityIssue,
} from "./models/securityStandardsAPI/index.js";
export type {
  GetSensitivitySettingsResponse,
  GetSensitivitySettingsResponseProperties,
  GetSensitivitySettingsResponsePropertiesMipInformation,
  MipIntegrationStatus,
  Label,
  InfoType,
  BuiltInInfoType,
  UpdateSensitivitySettingsRequest,
} from "./models/sensitivitySettingsAPI/index.js";
export { KnownMipIntegrationStatus } from "./models/sensitivitySettingsAPI/index.js";
export type {
  ServerVulnerabilityAssessmentsSetting,
  ServerVulnerabilityAssessmentsSettingUnion,
  ServerVulnerabilityAssessmentsSettingKindName,
  ServerVulnerabilityAssessmentsSettingKind,
  AzureServersSetting,
  ServerVulnerabilityAssessmentsAzureSettingProperties,
  ServerVulnerabilityAssessmentsAzureSettingSelectedProvider,
} from "./models/serverVulnerabilityAssessmentsSettingsAPI/index.js";
export {
  KnownServerVulnerabilityAssessmentsSettingKindName,
  KnownServerVulnerabilityAssessmentsSettingKind,
  KnownServerVulnerabilityAssessmentsAzureSettingSelectedProvider,
} from "./models/serverVulnerabilityAssessmentsSettingsAPI/index.js";
export type {
  Setting,
  SettingUnion,
  SettingKind,
  DataExportSettings,
  DataExportSettingProperties,
  AlertSyncSettings,
  AlertSyncSettingProperties,
} from "./models/settingsAPI/index.js";
export { KnownSettingKind } from "./models/settingsAPI/index.js";
export type {
  RuleResults,
  RuleResultsProperties,
  RuleResultsInput,
  RulesResults,
  RulesResultsInput,
  ScanResult,
  ScanResultProperties,
  RuleStatus,
  Remediation,
  BaselineAdjustedResult,
  Baseline,
  VaRule,
  RuleSeverity,
  RuleType,
  QueryCheck,
  BenchmarkReference,
  SqlVulnerabilityAssessmentSettings,
  SqlVulnerabilityAssessmentSettingsProperties,
  SqlVulnerabilityAssessmentState,
  SqlVulnerabilityAssessmentScanOperationResult,
  SqlVulnerabilityAssessmentScanOperationResultProperties,
  ScanOperationStatus,
  ScanV2,
  ScanPropertiesV2,
  ScanTriggerType,
  ScanState,
} from "./models/sqlVulnerabilityAssessmentsAPI/index.js";
export {
  KnownRuleStatus,
  KnownRuleSeverity,
  KnownRuleType,
  KnownSqlVulnerabilityAssessmentState,
  KnownScanOperationStatus,
  KnownScanTriggerType,
  KnownScanState,
} from "./models/sqlVulnerabilityAssessmentsAPI/index.js";
export type {
  Standard,
  StandardProperties,
  StandardComponentProperties,
  StandardSupportedClouds,
  Assignment,
  AssignmentProperties,
  AssignedComponentItem,
  AssignmentPropertiesAdditionalData,
} from "./models/standardsAPI/index.js";
export type {
  SecuritySubAssessment,
  SecuritySubAssessmentProperties,
  SubAssessmentStatus,
  SubAssessmentStatusCode,
  AdditionalData,
  AdditionalDataUnion,
  AssessedResourceType,
  SqlServerVulnerabilityProperties,
  ContainerRegistryVulnerabilityProperties,
  Cvss,
  Cve,
  VendorReference,
  ServerVulnerabilityProperties,
} from "./models/subAssessmentsAPI/index.js";
export {
  KnownSubAssessmentStatusCode,
  KnownAssessedResourceType,
} from "./models/subAssessmentsAPI/index.js";
export type {
  SecurityTask,
  SecurityTaskProperties,
  SecurityTaskParameters,
  TaskUpdateActionType,
} from "./models/tasksAPI/index.js";
export { KnownTaskUpdateActionType } from "./models/tasksAPI/index.js";
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
