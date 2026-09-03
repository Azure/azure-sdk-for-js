// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SecurityCenterContext,
  SecurityCenterOptionalParams,
  createSecurityCenter,
} from "./api/index.js";
import {
  AdvancedThreatProtectionOperations,
  _getAdvancedThreatProtectionOperations,
} from "./classic/advancedThreatProtection/index.js";
import { AlertsOperations, _getAlertsOperations } from "./classic/alerts/index.js";
import {
  AlertsSuppressionRulesOperations,
  _getAlertsSuppressionRulesOperations,
} from "./classic/alertsSuppressionRules/index.js";
import {
  AllowedConnectionsOperations,
  _getAllowedConnectionsOperations,
} from "./classic/allowedConnections/index.js";
import {
  APICollectionsOperations,
  _getAPICollectionsOperations,
} from "./classic/apiCollections/index.js";
import { ApplicationOperations, _getApplicationOperations } from "./classic/application/index.js";
import {
  ApplicationsOperations,
  _getApplicationsOperations,
} from "./classic/applications/index.js";
import { AssessmentsOperations, _getAssessmentsOperations } from "./classic/assessments/index.js";
import {
  AssessmentsMetadataOperations,
  _getAssessmentsMetadataOperations,
} from "./classic/assessmentsMetadata/index.js";
import { AssignmentsOperations, _getAssignmentsOperations } from "./classic/assignments/index.js";
import {
  AutoProvisioningSettingsOperations,
  _getAutoProvisioningSettingsOperations,
} from "./classic/autoProvisioningSettings/index.js";
import { AutomationsOperations, _getAutomationsOperations } from "./classic/automations/index.js";
import {
  AzureDevOpsOrgsOperations,
  _getAzureDevOpsOrgsOperations,
} from "./classic/azureDevOpsOrgs/index.js";
import {
  AzureDevOpsProjectsOperations,
  _getAzureDevOpsProjectsOperations,
} from "./classic/azureDevOpsProjects/index.js";
import {
  AzureDevOpsReposOperations,
  _getAzureDevOpsReposOperations,
} from "./classic/azureDevOpsRepos/index.js";
import {
  ComplianceResultsOperations,
  _getComplianceResultsOperations,
} from "./classic/complianceResults/index.js";
import { CompliancesOperations, _getCompliancesOperations } from "./classic/compliances/index.js";
import {
  CustomRecommendationsOperations,
  _getCustomRecommendationsOperations,
} from "./classic/customRecommendations/index.js";
import {
  DefenderForStorageOperations,
  _getDefenderForStorageOperations,
} from "./classic/defenderForStorage/index.js";
import {
  DevOpsConfigurationsOperations,
  _getDevOpsConfigurationsOperations,
} from "./classic/devOpsConfigurations/index.js";
import {
  DevOpsOperationResultsOperations,
  _getDevOpsOperationResultsOperations,
} from "./classic/devOpsOperationResults/index.js";
import {
  DeviceSecurityGroupsOperations,
  _getDeviceSecurityGroupsOperations,
} from "./classic/deviceSecurityGroups/index.js";
import {
  DiscoveredSecuritySolutionsOperations,
  _getDiscoveredSecuritySolutionsOperations,
} from "./classic/discoveredSecuritySolutions/index.js";
import {
  ExternalSecuritySolutionsOperations,
  _getExternalSecuritySolutionsOperations,
} from "./classic/externalSecuritySolutions/index.js";
import {
  GitHubIssuesOperations,
  _getGitHubIssuesOperations,
} from "./classic/gitHubIssues/index.js";
import {
  GitHubOwnersOperations,
  _getGitHubOwnersOperations,
} from "./classic/gitHubOwners/index.js";
import { GitHubReposOperations, _getGitHubReposOperations } from "./classic/gitHubRepos/index.js";
import {
  GitLabGroupsOperations,
  _getGitLabGroupsOperations,
} from "./classic/gitLabGroups/index.js";
import {
  GitLabProjectsOperations,
  _getGitLabProjectsOperations,
} from "./classic/gitLabProjects/index.js";
import {
  GitLabSubgroupsOperations,
  _getGitLabSubgroupsOperations,
} from "./classic/gitLabSubgroups/index.js";
import {
  GovernanceAssignmentsOperations,
  _getGovernanceAssignmentsOperations,
} from "./classic/governanceAssignments/index.js";
import {
  GovernanceRulesOperations,
  _getGovernanceRulesOperations,
} from "./classic/governanceRules/index.js";
import {
  HealthReportsOperations,
  _getHealthReportsOperations,
} from "./classic/healthReports/index.js";
import {
  InformationProtectionPoliciesOperations,
  _getInformationProtectionPoliciesOperations,
} from "./classic/informationProtectionPolicies/index.js";
import {
  IotSecuritySolutionOperations,
  _getIotSecuritySolutionOperations,
} from "./classic/iotSecuritySolution/index.js";
import {
  IotSecuritySolutionAnalyticsOperations,
  _getIotSecuritySolutionAnalyticsOperations,
} from "./classic/iotSecuritySolutionAnalytics/index.js";
import {
  IotSecuritySolutionsAnalyticsAggregatedAlertOperations,
  _getIotSecuritySolutionsAnalyticsAggregatedAlertOperations,
} from "./classic/iotSecuritySolutionsAnalyticsAggregatedAlert/index.js";
import {
  IotSecuritySolutionsAnalyticsRecommendationOperations,
  _getIotSecuritySolutionsAnalyticsRecommendationOperations,
} from "./classic/iotSecuritySolutionsAnalyticsRecommendation/index.js";
import {
  JitNetworkAccessPoliciesOperations,
  _getJitNetworkAccessPoliciesOperations,
} from "./classic/jitNetworkAccessPolicies/index.js";
import { LocationsOperations, _getLocationsOperations } from "./classic/locations/index.js";
import {
  MdeOnboardingsOperations,
  _getMdeOnboardingsOperations,
} from "./classic/mdeOnboardings/index.js";
import {
  OperationResultsOperations,
  _getOperationResultsOperations,
} from "./classic/operationResults/index.js";
import {
  OperationStatusesOperations,
  _getOperationStatusesOperations,
} from "./classic/operationStatuses/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { PricingsOperations, _getPricingsOperations } from "./classic/pricings/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import {
  PrivateLinksOperations,
  _getPrivateLinksOperations,
} from "./classic/privateLinks/index.js";
import {
  RegulatoryComplianceAssessmentsOperations,
  _getRegulatoryComplianceAssessmentsOperations,
} from "./classic/regulatoryComplianceAssessments/index.js";
import {
  RegulatoryComplianceControlsOperations,
  _getRegulatoryComplianceControlsOperations,
} from "./classic/regulatoryComplianceControls/index.js";
import {
  RegulatoryComplianceStandardsOperations,
  _getRegulatoryComplianceStandardsOperations,
} from "./classic/regulatoryComplianceStandards/index.js";
import {
  SecureScoreControlDefinitionsOperations,
  _getSecureScoreControlDefinitionsOperations,
} from "./classic/secureScoreControlDefinitions/index.js";
import {
  SecureScoreControlsOperations,
  _getSecureScoreControlsOperations,
} from "./classic/secureScoreControls/index.js";
import {
  SecureScoresOperations,
  _getSecureScoresOperations,
} from "./classic/secureScores/index.js";
import {
  SecurityConnectorApplicationOperations,
  _getSecurityConnectorApplicationOperations,
} from "./classic/securityConnectorApplication/index.js";
import {
  SecurityConnectorApplicationsOperations,
  _getSecurityConnectorApplicationsOperations,
} from "./classic/securityConnectorApplications/index.js";
import {
  SecurityConnectorsOperations,
  _getSecurityConnectorsOperations,
} from "./classic/securityConnectors/index.js";
import {
  SecurityContactsOperations,
  _getSecurityContactsOperations,
} from "./classic/securityContacts/index.js";
import {
  SecurityOperatorsOperations,
  _getSecurityOperatorsOperations,
} from "./classic/securityOperators/index.js";
import {
  SecuritySolutionsOperations,
  _getSecuritySolutionsOperations,
} from "./classic/securitySolutions/index.js";
import {
  SecuritySolutionsReferenceDataOperations,
  _getSecuritySolutionsReferenceDataOperations,
} from "./classic/securitySolutionsReferenceData/index.js";
import {
  SecurityStandardsOperations,
  _getSecurityStandardsOperations,
} from "./classic/securityStandards/index.js";
import {
  SensitivitySettingsOperations,
  _getSensitivitySettingsOperations,
} from "./classic/sensitivitySettings/index.js";
import {
  ServerVulnerabilityAssessmentOperations,
  _getServerVulnerabilityAssessmentOperations,
} from "./classic/serverVulnerabilityAssessment/index.js";
import {
  ServerVulnerabilityAssessmentsSettingsOperations,
  _getServerVulnerabilityAssessmentsSettingsOperations,
} from "./classic/serverVulnerabilityAssessmentsSettings/index.js";
import { SettingsOperations, _getSettingsOperations } from "./classic/settings/index.js";
import {
  SqlVulnerabilityAssessmentBaselineRulesOperations,
  _getSqlVulnerabilityAssessmentBaselineRulesOperations,
} from "./classic/sqlVulnerabilityAssessmentBaselineRules/index.js";
import {
  SqlVulnerabilityAssessmentScanResultsOperations,
  _getSqlVulnerabilityAssessmentScanResultsOperations,
} from "./classic/sqlVulnerabilityAssessmentScanResults/index.js";
import {
  SqlVulnerabilityAssessmentScansOperations,
  _getSqlVulnerabilityAssessmentScansOperations,
} from "./classic/sqlVulnerabilityAssessmentScans/index.js";
import {
  SqlVulnerabilityAssessmentSettingsOperations,
  _getSqlVulnerabilityAssessmentSettingsOperations,
} from "./classic/sqlVulnerabilityAssessmentSettings/index.js";
import {
  StandardAssignmentsOperations,
  _getStandardAssignmentsOperations,
} from "./classic/standardAssignments/index.js";
import { StandardsOperations, _getStandardsOperations } from "./classic/standards/index.js";
import {
  SubAssessmentsOperations,
  _getSubAssessmentsOperations,
} from "./classic/subAssessments/index.js";
import { TasksOperations, _getTasksOperations } from "./classic/tasks/index.js";
import { TopologyOperations, _getTopologyOperations } from "./classic/topology/index.js";
import {
  WorkspaceSettingsOperations,
  _getWorkspaceSettingsOperations,
} from "./classic/workspaceSettings/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { SecurityCenterOptionalParams } from "./api/securityCenterContext.js";

export class SecurityCenter {
  private _client: SecurityCenterContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: SecurityCenterOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: SecurityCenterOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | SecurityCenterOptionalParams,
    options?: SecurityCenterOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createSecurityCenter(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.subAssessments = _getSubAssessmentsOperations(this._client);
    this.sqlVulnerabilityAssessmentScans = _getSqlVulnerabilityAssessmentScansOperations(
      this._client,
    );
    this.sqlVulnerabilityAssessmentSettings = _getSqlVulnerabilityAssessmentSettingsOperations(
      this._client,
    );
    this.sensitivitySettings = _getSensitivitySettingsOperations(this._client);
    this.securitySolutionsReferenceData = _getSecuritySolutionsReferenceDataOperations(
      this._client,
    );
    this.topology = _getTopologyOperations(this._client);
    this.serverVulnerabilityAssessment = _getServerVulnerabilityAssessmentOperations(this._client);
    this.allowedConnections = _getAllowedConnectionsOperations(this._client);
    this.gitHubIssues = _getGitHubIssuesOperations(this._client);
    this.gitHubRepos = _getGitHubReposOperations(this._client);
    this.azureDevOpsRepos = _getAzureDevOpsReposOperations(this._client);
    this.devOpsOperationResults = _getDevOpsOperationResultsOperations(this._client);
    this.gitLabSubgroups = _getGitLabSubgroupsOperations(this._client);
    this.secureScoreControlDefinitions = _getSecureScoreControlDefinitionsOperations(this._client);
    this.secureScoreControls = _getSecureScoreControlsOperations(this._client);
    this.secureScores = _getSecureScoresOperations(this._client);
    this.privateLinks = _getPrivateLinksOperations(this._client);
    this.operationStatuses = _getOperationStatusesOperations(this._client);
    this.operationResults = _getOperationResultsOperations(this._client);
    this.locations = _getLocationsOperations(this._client);
    this.iotSecuritySolutionsAnalyticsRecommendation =
      _getIotSecuritySolutionsAnalyticsRecommendationOperations(this._client);
    this.iotSecuritySolutionsAnalyticsAggregatedAlert =
      _getIotSecuritySolutionsAnalyticsAggregatedAlertOperations(this._client);
    this.iotSecuritySolution = _getIotSecuritySolutionOperations(this._client);
    this.iotSecuritySolutionAnalytics = _getIotSecuritySolutionAnalyticsOperations(this._client);
    this.defenderForStorage = _getDefenderForStorageOperations(this._client);
    this.advancedThreatProtection = _getAdvancedThreatProtectionOperations(this._client);
    this.assessments = _getAssessmentsOperations(this._client);
    this.securityConnectorApplications = _getSecurityConnectorApplicationsOperations(this._client);
    this.application = _getApplicationOperations(this._client);
    this.apiCollections = _getAPICollectionsOperations(this._client);
    this.tasks = _getTasksOperations(this._client);
    this.assignments = _getAssignmentsOperations(this._client);
    this.standards = _getStandardsOperations(this._client);
    this.sqlVulnerabilityAssessmentScanResults =
      _getSqlVulnerabilityAssessmentScanResultsOperations(this._client);
    this.sqlVulnerabilityAssessmentBaselineRules =
      _getSqlVulnerabilityAssessmentBaselineRulesOperations(this._client);
    this.settings = _getSettingsOperations(this._client);
    this.serverVulnerabilityAssessmentsSettings =
      _getServerVulnerabilityAssessmentsSettingsOperations(this._client);
    this.customRecommendations = _getCustomRecommendationsOperations(this._client);
    this.standardAssignments = _getStandardAssignmentsOperations(this._client);
    this.securityStandards = _getSecurityStandardsOperations(this._client);
    this.securitySolutions = _getSecuritySolutionsOperations(this._client);
    this.jitNetworkAccessPolicies = _getJitNetworkAccessPoliciesOperations(this._client);
    this.externalSecuritySolutions = _getExternalSecuritySolutionsOperations(this._client);
    this.discoveredSecuritySolutions = _getDiscoveredSecuritySolutionsOperations(this._client);
    this.securityOperators = _getSecurityOperatorsOperations(this._client);
    this.gitLabProjects = _getGitLabProjectsOperations(this._client);
    this.azureDevOpsProjects = _getAzureDevOpsProjectsOperations(this._client);
    this.devOpsConfigurations = _getDevOpsConfigurationsOperations(this._client);
    this.gitLabGroups = _getGitLabGroupsOperations(this._client);
    this.gitHubOwners = _getGitHubOwnersOperations(this._client);
    this.azureDevOpsOrgs = _getAzureDevOpsOrgsOperations(this._client);
    this.securityConnectors = _getSecurityConnectorsOperations(this._client);
    this.regulatoryComplianceAssessments = _getRegulatoryComplianceAssessmentsOperations(
      this._client,
    );
    this.regulatoryComplianceControls = _getRegulatoryComplianceControlsOperations(this._client);
    this.regulatoryComplianceStandards = _getRegulatoryComplianceStandardsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.pricings = _getPricingsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.mdeOnboardings = _getMdeOnboardingsOperations(this._client);
    this.workspaceSettings = _getWorkspaceSettingsOperations(this._client);
    this.informationProtectionPolicies = _getInformationProtectionPoliciesOperations(this._client);
    this.compliances = _getCompliancesOperations(this._client);
    this.autoProvisioningSettings = _getAutoProvisioningSettingsOperations(this._client);
    this.deviceSecurityGroups = _getDeviceSecurityGroupsOperations(this._client);
    this.healthReports = _getHealthReportsOperations(this._client);
    this.governanceRules = _getGovernanceRulesOperations(this._client);
    this.governanceAssignments = _getGovernanceAssignmentsOperations(this._client);
    this.complianceResults = _getComplianceResultsOperations(this._client);
    this.securityContacts = _getSecurityContactsOperations(this._client);
    this.automations = _getAutomationsOperations(this._client);
    this.assessmentsMetadata = _getAssessmentsMetadataOperations(this._client);
    this.securityConnectorApplication = _getSecurityConnectorApplicationOperations(this._client);
    this.applications = _getApplicationsOperations(this._client);
    this.alertsSuppressionRules = _getAlertsSuppressionRulesOperations(this._client);
    this.alerts = _getAlertsOperations(this._client);
  }

  /** The operation groups for subAssessments */
  public readonly subAssessments: SubAssessmentsOperations;
  /** The operation groups for sqlVulnerabilityAssessmentScans */
  public readonly sqlVulnerabilityAssessmentScans: SqlVulnerabilityAssessmentScansOperations;
  /** The operation groups for sqlVulnerabilityAssessmentSettings */
  public readonly sqlVulnerabilityAssessmentSettings: SqlVulnerabilityAssessmentSettingsOperations;
  /** The operation groups for sensitivitySettings */
  public readonly sensitivitySettings: SensitivitySettingsOperations;
  /** The operation groups for securitySolutionsReferenceData */
  public readonly securitySolutionsReferenceData: SecuritySolutionsReferenceDataOperations;
  /** The operation groups for topology */
  public readonly topology: TopologyOperations;
  /** The operation groups for serverVulnerabilityAssessment */
  public readonly serverVulnerabilityAssessment: ServerVulnerabilityAssessmentOperations;
  /** The operation groups for allowedConnections */
  public readonly allowedConnections: AllowedConnectionsOperations;
  /** The operation groups for gitHubIssues */
  public readonly gitHubIssues: GitHubIssuesOperations;
  /** The operation groups for gitHubRepos */
  public readonly gitHubRepos: GitHubReposOperations;
  /** The operation groups for azureDevOpsRepos */
  public readonly azureDevOpsRepos: AzureDevOpsReposOperations;
  /** The operation groups for devOpsOperationResults */
  public readonly devOpsOperationResults: DevOpsOperationResultsOperations;
  /** The operation groups for gitLabSubgroups */
  public readonly gitLabSubgroups: GitLabSubgroupsOperations;
  /** The operation groups for secureScoreControlDefinitions */
  public readonly secureScoreControlDefinitions: SecureScoreControlDefinitionsOperations;
  /** The operation groups for secureScoreControls */
  public readonly secureScoreControls: SecureScoreControlsOperations;
  /** The operation groups for secureScores */
  public readonly secureScores: SecureScoresOperations;
  /** The operation groups for privateLinks */
  public readonly privateLinks: PrivateLinksOperations;
  /** The operation groups for operationStatuses */
  public readonly operationStatuses: OperationStatusesOperations;
  /** The operation groups for operationResults */
  public readonly operationResults: OperationResultsOperations;
  /** The operation groups for locations */
  public readonly locations: LocationsOperations;
  /** The operation groups for iotSecuritySolutionsAnalyticsRecommendation */
  public readonly iotSecuritySolutionsAnalyticsRecommendation: IotSecuritySolutionsAnalyticsRecommendationOperations;
  /** The operation groups for iotSecuritySolutionsAnalyticsAggregatedAlert */
  public readonly iotSecuritySolutionsAnalyticsAggregatedAlert: IotSecuritySolutionsAnalyticsAggregatedAlertOperations;
  /** The operation groups for iotSecuritySolution */
  public readonly iotSecuritySolution: IotSecuritySolutionOperations;
  /** The operation groups for iotSecuritySolutionAnalytics */
  public readonly iotSecuritySolutionAnalytics: IotSecuritySolutionAnalyticsOperations;
  /** The operation groups for defenderForStorage */
  public readonly defenderForStorage: DefenderForStorageOperations;
  /** The operation groups for advancedThreatProtection */
  public readonly advancedThreatProtection: AdvancedThreatProtectionOperations;
  /** The operation groups for assessments */
  public readonly assessments: AssessmentsOperations;
  /** The operation groups for securityConnectorApplications */
  public readonly securityConnectorApplications: SecurityConnectorApplicationsOperations;
  /** The operation groups for application */
  public readonly application: ApplicationOperations;
  /** The operation groups for apiCollections */
  public readonly apiCollections: APICollectionsOperations;
  /** The operation groups for tasks */
  public readonly tasks: TasksOperations;
  /** The operation groups for assignments */
  public readonly assignments: AssignmentsOperations;
  /** The operation groups for standards */
  public readonly standards: StandardsOperations;
  /** The operation groups for sqlVulnerabilityAssessmentScanResults */
  public readonly sqlVulnerabilityAssessmentScanResults: SqlVulnerabilityAssessmentScanResultsOperations;
  /** The operation groups for sqlVulnerabilityAssessmentBaselineRules */
  public readonly sqlVulnerabilityAssessmentBaselineRules: SqlVulnerabilityAssessmentBaselineRulesOperations;
  /** The operation groups for settings */
  public readonly settings: SettingsOperations;
  /** The operation groups for serverVulnerabilityAssessmentsSettings */
  public readonly serverVulnerabilityAssessmentsSettings: ServerVulnerabilityAssessmentsSettingsOperations;
  /** The operation groups for customRecommendations */
  public readonly customRecommendations: CustomRecommendationsOperations;
  /** The operation groups for standardAssignments */
  public readonly standardAssignments: StandardAssignmentsOperations;
  /** The operation groups for securityStandards */
  public readonly securityStandards: SecurityStandardsOperations;
  /** The operation groups for securitySolutions */
  public readonly securitySolutions: SecuritySolutionsOperations;
  /** The operation groups for jitNetworkAccessPolicies */
  public readonly jitNetworkAccessPolicies: JitNetworkAccessPoliciesOperations;
  /** The operation groups for externalSecuritySolutions */
  public readonly externalSecuritySolutions: ExternalSecuritySolutionsOperations;
  /** The operation groups for discoveredSecuritySolutions */
  public readonly discoveredSecuritySolutions: DiscoveredSecuritySolutionsOperations;
  /** The operation groups for securityOperators */
  public readonly securityOperators: SecurityOperatorsOperations;
  /** The operation groups for gitLabProjects */
  public readonly gitLabProjects: GitLabProjectsOperations;
  /** The operation groups for azureDevOpsProjects */
  public readonly azureDevOpsProjects: AzureDevOpsProjectsOperations;
  /** The operation groups for devOpsConfigurations */
  public readonly devOpsConfigurations: DevOpsConfigurationsOperations;
  /** The operation groups for gitLabGroups */
  public readonly gitLabGroups: GitLabGroupsOperations;
  /** The operation groups for gitHubOwners */
  public readonly gitHubOwners: GitHubOwnersOperations;
  /** The operation groups for azureDevOpsOrgs */
  public readonly azureDevOpsOrgs: AzureDevOpsOrgsOperations;
  /** The operation groups for securityConnectors */
  public readonly securityConnectors: SecurityConnectorsOperations;
  /** The operation groups for regulatoryComplianceAssessments */
  public readonly regulatoryComplianceAssessments: RegulatoryComplianceAssessmentsOperations;
  /** The operation groups for regulatoryComplianceControls */
  public readonly regulatoryComplianceControls: RegulatoryComplianceControlsOperations;
  /** The operation groups for regulatoryComplianceStandards */
  public readonly regulatoryComplianceStandards: RegulatoryComplianceStandardsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for pricings */
  public readonly pricings: PricingsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for mdeOnboardings */
  public readonly mdeOnboardings: MdeOnboardingsOperations;
  /** The operation groups for workspaceSettings */
  public readonly workspaceSettings: WorkspaceSettingsOperations;
  /** The operation groups for informationProtectionPolicies */
  public readonly informationProtectionPolicies: InformationProtectionPoliciesOperations;
  /** The operation groups for compliances */
  public readonly compliances: CompliancesOperations;
  /** The operation groups for autoProvisioningSettings */
  public readonly autoProvisioningSettings: AutoProvisioningSettingsOperations;
  /** The operation groups for deviceSecurityGroups */
  public readonly deviceSecurityGroups: DeviceSecurityGroupsOperations;
  /** The operation groups for healthReports */
  public readonly healthReports: HealthReportsOperations;
  /** The operation groups for governanceRules */
  public readonly governanceRules: GovernanceRulesOperations;
  /** The operation groups for governanceAssignments */
  public readonly governanceAssignments: GovernanceAssignmentsOperations;
  /** The operation groups for complianceResults */
  public readonly complianceResults: ComplianceResultsOperations;
  /** The operation groups for securityContacts */
  public readonly securityContacts: SecurityContactsOperations;
  /** The operation groups for automations */
  public readonly automations: AutomationsOperations;
  /** The operation groups for assessmentsMetadata */
  public readonly assessmentsMetadata: AssessmentsMetadataOperations;
  /** The operation groups for securityConnectorApplication */
  public readonly securityConnectorApplication: SecurityConnectorApplicationOperations;
  /** The operation groups for applications */
  public readonly applications: ApplicationsOperations;
  /** The operation groups for alertsSuppressionRules */
  public readonly alertsSuppressionRules: AlertsSuppressionRulesOperations;
  /** The operation groups for alerts */
  public readonly alerts: AlertsOperations;
}
