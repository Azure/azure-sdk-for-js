// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext, SecurityInsightsOptionalParams } from "./api/index.js";
import { createSecurityInsights } from "./api/index.js";
import { listWhoisByDomain, listGeodataByIp } from "./api/operations.js";
import type {
  ListWhoisByDomainOptionalParams,
  ListGeodataByIpOptionalParams,
} from "./api/options.js";
import type { ActionsOperations } from "./classic/actions/index.js";
import { _getActionsOperations } from "./classic/actions/index.js";
import type { AlertRuleOperations } from "./classic/alertRule/index.js";
import { _getAlertRuleOperations } from "./classic/alertRule/index.js";
import type { AlertRuleTemplatesOperations } from "./classic/alertRuleTemplates/index.js";
import { _getAlertRuleTemplatesOperations } from "./classic/alertRuleTemplates/index.js";
import type { AlertRulesOperations } from "./classic/alertRules/index.js";
import { _getAlertRulesOperations } from "./classic/alertRules/index.js";
import type { AutomationRulesOperations } from "./classic/automationRules/index.js";
import { _getAutomationRulesOperations } from "./classic/automationRules/index.js";
import type { BillingStatisticsOperations } from "./classic/billingStatistics/index.js";
import { _getBillingStatisticsOperations } from "./classic/billingStatistics/index.js";
import type { BookmarkOperations } from "./classic/bookmark/index.js";
import { _getBookmarkOperations } from "./classic/bookmark/index.js";
import type { BookmarkRelationsOperations } from "./classic/bookmarkRelations/index.js";
import { _getBookmarkRelationsOperations } from "./classic/bookmarkRelations/index.js";
import type { BookmarksOperations } from "./classic/bookmarks/index.js";
import { _getBookmarksOperations } from "./classic/bookmarks/index.js";
import type { ContentPackageOperations } from "./classic/contentPackage/index.js";
import { _getContentPackageOperations } from "./classic/contentPackage/index.js";
import type { ContentPackagesOperations } from "./classic/contentPackages/index.js";
import { _getContentPackagesOperations } from "./classic/contentPackages/index.js";
import type { ContentTemplateOperations } from "./classic/contentTemplate/index.js";
import { _getContentTemplateOperations } from "./classic/contentTemplate/index.js";
import type { ContentTemplatesOperations } from "./classic/contentTemplates/index.js";
import { _getContentTemplatesOperations } from "./classic/contentTemplates/index.js";
import type { DataConnectorDefinitionsOperations } from "./classic/dataConnectorDefinitions/index.js";
import { _getDataConnectorDefinitionsOperations } from "./classic/dataConnectorDefinitions/index.js";
import type { DataConnectorsOperations } from "./classic/dataConnectors/index.js";
import { _getDataConnectorsOperations } from "./classic/dataConnectors/index.js";
import type { DataConnectorsCheckRequirementsOperations } from "./classic/dataConnectorsCheckRequirements/index.js";
import { _getDataConnectorsCheckRequirementsOperations } from "./classic/dataConnectorsCheckRequirements/index.js";
import type { EntitiesOperations } from "./classic/entities/index.js";
import { _getEntitiesOperations } from "./classic/entities/index.js";
import type { EntitiesGetTimelineOperations } from "./classic/entitiesGetTimeline/index.js";
import { _getEntitiesGetTimelineOperations } from "./classic/entitiesGetTimeline/index.js";
import type { EntitiesRelationsOperations } from "./classic/entitiesRelations/index.js";
import { _getEntitiesRelationsOperations } from "./classic/entitiesRelations/index.js";
import type { EntityQueriesOperations } from "./classic/entityQueries/index.js";
import { _getEntityQueriesOperations } from "./classic/entityQueries/index.js";
import type { EntityQueryTemplatesOperations } from "./classic/entityQueryTemplates/index.js";
import { _getEntityQueryTemplatesOperations } from "./classic/entityQueryTemplates/index.js";
import type { EntityRelationsOperations } from "./classic/entityRelations/index.js";
import { _getEntityRelationsOperations } from "./classic/entityRelations/index.js";
import type { FileImportsOperations } from "./classic/fileImports/index.js";
import { _getFileImportsOperations } from "./classic/fileImports/index.js";
import type { GetOperations } from "./classic/get/index.js";
import { _getGetOperations } from "./classic/get/index.js";
import type { GetRecommendationsOperations } from "./classic/getRecommendations/index.js";
import { _getGetRecommendationsOperations } from "./classic/getRecommendations/index.js";
import type { GetTriggeredAnalyticsRuleRunsOperations } from "./classic/getTriggeredAnalyticsRuleRuns/index.js";
import { _getGetTriggeredAnalyticsRuleRunsOperations } from "./classic/getTriggeredAnalyticsRuleRuns/index.js";
import type { HuntCommentsOperations } from "./classic/huntComments/index.js";
import { _getHuntCommentsOperations } from "./classic/huntComments/index.js";
import type { HuntRelationsOperations } from "./classic/huntRelations/index.js";
import { _getHuntRelationsOperations } from "./classic/huntRelations/index.js";
import type { HuntsOperations } from "./classic/hunts/index.js";
import { _getHuntsOperations } from "./classic/hunts/index.js";
import type { IncidentCommentsOperations } from "./classic/incidentComments/index.js";
import { _getIncidentCommentsOperations } from "./classic/incidentComments/index.js";
import type { IncidentRelationsOperations } from "./classic/incidentRelations/index.js";
import { _getIncidentRelationsOperations } from "./classic/incidentRelations/index.js";
import type { IncidentTasksOperations } from "./classic/incidentTasks/index.js";
import { _getIncidentTasksOperations } from "./classic/incidentTasks/index.js";
import type { IncidentsOperations } from "./classic/incidents/index.js";
import { _getIncidentsOperations } from "./classic/incidents/index.js";
import type { MetadataOperations } from "./classic/metadata/index.js";
import { _getMetadataOperations } from "./classic/metadata/index.js";
import type { OfficeConsentsOperations } from "./classic/officeConsents/index.js";
import { _getOfficeConsentsOperations } from "./classic/officeConsents/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ProductPackageOperations } from "./classic/productPackage/index.js";
import { _getProductPackageOperations } from "./classic/productPackage/index.js";
import type { ProductPackagesOperations } from "./classic/productPackages/index.js";
import { _getProductPackagesOperations } from "./classic/productPackages/index.js";
import type { ProductSettingsOperations } from "./classic/productSettings/index.js";
import { _getProductSettingsOperations } from "./classic/productSettings/index.js";
import type { ProductTemplateOperations } from "./classic/productTemplate/index.js";
import { _getProductTemplateOperations } from "./classic/productTemplate/index.js";
import type { ProductTemplatesOperations } from "./classic/productTemplates/index.js";
import { _getProductTemplatesOperations } from "./classic/productTemplates/index.js";
import type { ReevaluateOperations } from "./classic/reevaluate/index.js";
import { _getReevaluateOperations } from "./classic/reevaluate/index.js";
import type { SecurityMLAnalyticsSettingsOperations } from "./classic/securityMLAnalyticsSettings/index.js";
import { _getSecurityMLAnalyticsSettingsOperations } from "./classic/securityMLAnalyticsSettings/index.js";
import type { SentinelOnboardingStatesOperations } from "./classic/sentinelOnboardingStates/index.js";
import { _getSentinelOnboardingStatesOperations } from "./classic/sentinelOnboardingStates/index.js";
import type { SourceControlOperations } from "./classic/sourceControl/index.js";
import { _getSourceControlOperations } from "./classic/sourceControl/index.js";
import type { SourceControlsOperations } from "./classic/sourceControls/index.js";
import { _getSourceControlsOperations } from "./classic/sourceControls/index.js";
import type { ThreatIntelligenceOperations } from "./classic/threatIntelligence/index.js";
import { _getThreatIntelligenceOperations } from "./classic/threatIntelligence/index.js";
import type { ThreatIntelligenceIndicatorOperations } from "./classic/threatIntelligenceIndicator/index.js";
import { _getThreatIntelligenceIndicatorOperations } from "./classic/threatIntelligenceIndicator/index.js";
import type { ThreatIntelligenceIndicatorMetricsOperations } from "./classic/threatIntelligenceIndicatorMetrics/index.js";
import { _getThreatIntelligenceIndicatorMetricsOperations } from "./classic/threatIntelligenceIndicatorMetrics/index.js";
import type { ThreatIntelligenceIndicatorsOperations } from "./classic/threatIntelligenceIndicators/index.js";
import { _getThreatIntelligenceIndicatorsOperations } from "./classic/threatIntelligenceIndicators/index.js";
import type { TriggeredAnalyticsRuleRunOperations } from "./classic/triggeredAnalyticsRuleRun/index.js";
import { _getTriggeredAnalyticsRuleRunOperations } from "./classic/triggeredAnalyticsRuleRun/index.js";
import type { UpdateOperations } from "./classic/update/index.js";
import { _getUpdateOperations } from "./classic/update/index.js";
import type { WatchlistItemsOperations } from "./classic/watchlistItems/index.js";
import { _getWatchlistItemsOperations } from "./classic/watchlistItems/index.js";
import type { WatchlistsOperations } from "./classic/watchlists/index.js";
import { _getWatchlistsOperations } from "./classic/watchlists/index.js";
import type { WorkspaceManagerAssignmentJobsOperations } from "./classic/workspaceManagerAssignmentJobs/index.js";
import { _getWorkspaceManagerAssignmentJobsOperations } from "./classic/workspaceManagerAssignmentJobs/index.js";
import type { WorkspaceManagerAssignmentsOperations } from "./classic/workspaceManagerAssignments/index.js";
import { _getWorkspaceManagerAssignmentsOperations } from "./classic/workspaceManagerAssignments/index.js";
import type { WorkspaceManagerConfigurationsOperations } from "./classic/workspaceManagerConfigurations/index.js";
import { _getWorkspaceManagerConfigurationsOperations } from "./classic/workspaceManagerConfigurations/index.js";
import type { WorkspaceManagerGroupsOperations } from "./classic/workspaceManagerGroups/index.js";
import { _getWorkspaceManagerGroupsOperations } from "./classic/workspaceManagerGroups/index.js";
import type { WorkspaceManagerMembersOperations } from "./classic/workspaceManagerMembers/index.js";
import { _getWorkspaceManagerMembersOperations } from "./classic/workspaceManagerMembers/index.js";
import type {
  EnrichmentIpAddressBody,
  EnrichmentIpGeodata,
  EnrichmentDomainBody,
  EnrichmentDomainWhois,
  EnrichmentType,
} from "./models/models.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { SecurityInsightsOptionalParams } from "./api/securityInsightsContext.js";

export class SecurityInsights {
  private _client: SecurityInsightsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: SecurityInsightsOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: SecurityInsightsOptionalParams,
  );
  /** API spec for Microsoft.SecurityInsights (Azure Security Insights) resource provider */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | SecurityInsightsOptionalParams,
    options?: SecurityInsightsOptionalParams,
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
    this._client = createSecurityInsights(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.workspaceManagerAssignmentJobs = _getWorkspaceManagerAssignmentJobsOperations(
      this._client,
    );
    this.getTriggeredAnalyticsRuleRuns = _getGetTriggeredAnalyticsRuleRunsOperations(this._client);
    this.reevaluate = _getReevaluateOperations(this._client);
    this.getRecommendations = _getGetRecommendationsOperations(this._client);
    this.update = _getUpdateOperations(this._client);
    this.get = _getGetOperations(this._client);
    this.entitiesGetTimeline = _getEntitiesGetTimelineOperations(this._client);
    this.threatIntelligence = _getThreatIntelligenceOperations(this._client);
    this.threatIntelligenceIndicatorMetrics = _getThreatIntelligenceIndicatorMetricsOperations(
      this._client,
    );
    this.sourceControl = _getSourceControlOperations(this._client);
    this.dataConnectorsCheckRequirements = _getDataConnectorsCheckRequirementsOperations(
      this._client,
    );
    this.threatIntelligenceIndicators = _getThreatIntelligenceIndicatorsOperations(this._client);
    this.threatIntelligenceIndicator = _getThreatIntelligenceIndicatorOperations(this._client);
    this.metadata = _getMetadataOperations(this._client);
    this.entitiesRelations = _getEntitiesRelationsOperations(this._client);
    this.incidentRelations = _getIncidentRelationsOperations(this._client);
    this.contentTemplates = _getContentTemplatesOperations(this._client);
    this.contentTemplate = _getContentTemplateOperations(this._client);
    this.productTemplates = _getProductTemplatesOperations(this._client);
    this.productTemplate = _getProductTemplateOperations(this._client);
    this.productPackages = _getProductPackagesOperations(this._client);
    this.productPackage = _getProductPackageOperations(this._client);
    this.contentPackage = _getContentPackageOperations(this._client);
    this.contentPackages = _getContentPackagesOperations(this._client);
    this.bookmark = _getBookmarkOperations(this._client);
    this.actions = _getActionsOperations(this._client);
    this.alertRule = _getAlertRuleOperations(this._client);
    this.workspaceManagerMembers = _getWorkspaceManagerMembersOperations(this._client);
    this.workspaceManagerGroups = _getWorkspaceManagerGroupsOperations(this._client);
    this.workspaceManagerConfigurations = _getWorkspaceManagerConfigurationsOperations(
      this._client,
    );
    this.workspaceManagerAssignments = _getWorkspaceManagerAssignmentsOperations(this._client);
    this.triggeredAnalyticsRuleRun = _getTriggeredAnalyticsRuleRunOperations(this._client);
    this.productSettings = _getProductSettingsOperations(this._client);
    this.officeConsents = _getOfficeConsentsOperations(this._client);
    this.huntRelations = _getHuntRelationsOperations(this._client);
    this.huntComments = _getHuntCommentsOperations(this._client);
    this.hunts = _getHuntsOperations(this._client);
    this.fileImports = _getFileImportsOperations(this._client);
    this.entityQueryTemplates = _getEntityQueryTemplatesOperations(this._client);
    this.entityQueries = _getEntityQueriesOperations(this._client);
    this.entities = _getEntitiesOperations(this._client);
    this.billingStatistics = _getBillingStatisticsOperations(this._client);
    this.watchlistItems = _getWatchlistItemsOperations(this._client);
    this.watchlists = _getWatchlistsOperations(this._client);
    this.sourceControls = _getSourceControlsOperations(this._client);
    this.securityMLAnalyticsSettings = _getSecurityMLAnalyticsSettingsOperations(this._client);
    this.sentinelOnboardingStates = _getSentinelOnboardingStatesOperations(this._client);
    this.incidentTasks = _getIncidentTasksOperations(this._client);
    this.entityRelations = _getEntityRelationsOperations(this._client);
    this.bookmarkRelations = _getBookmarkRelationsOperations(this._client);
    this.incidentComments = _getIncidentCommentsOperations(this._client);
    this.dataConnectors = _getDataConnectorsOperations(this._client);
    this.dataConnectorDefinitions = _getDataConnectorDefinitionsOperations(this._client);
    this.bookmarks = _getBookmarksOperations(this._client);
    this.incidents = _getIncidentsOperations(this._client);
    this.automationRules = _getAutomationRulesOperations(this._client);
    this.alertRuleTemplates = _getAlertRuleTemplatesOperations(this._client);
    this.alertRules = _getAlertRulesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** Get whois information for a single domain name */
  listWhoisByDomain(
    resourceGroupName: string,
    workspaceName: string,
    enrichmentType: EnrichmentType,
    domainBody: EnrichmentDomainBody,
    options: ListWhoisByDomainOptionalParams = { requestOptions: {} },
  ): Promise<EnrichmentDomainWhois> {
    return listWhoisByDomain(
      this._client,
      resourceGroupName,
      workspaceName,
      enrichmentType,
      domainBody,
      options,
    );
  }

  /** Get geodata for a single IP address */
  listGeodataByIp(
    resourceGroupName: string,
    workspaceName: string,
    enrichmentType: EnrichmentType,
    ipAddressBody: EnrichmentIpAddressBody,
    options: ListGeodataByIpOptionalParams = { requestOptions: {} },
  ): Promise<EnrichmentIpGeodata> {
    return listGeodataByIp(
      this._client,
      resourceGroupName,
      workspaceName,
      enrichmentType,
      ipAddressBody,
      options,
    );
  }

  /** The operation groups for workspaceManagerAssignmentJobs */
  public readonly workspaceManagerAssignmentJobs: WorkspaceManagerAssignmentJobsOperations;
  /** The operation groups for getTriggeredAnalyticsRuleRuns */
  public readonly getTriggeredAnalyticsRuleRuns: GetTriggeredAnalyticsRuleRunsOperations;
  /** The operation groups for reevaluate */
  public readonly reevaluate: ReevaluateOperations;
  /** The operation groups for getRecommendations */
  public readonly getRecommendations: GetRecommendationsOperations;
  /** The operation groups for update */
  public readonly update: UpdateOperations;
  /** The operation groups for get */
  public readonly get: GetOperations;
  /** The operation groups for entitiesGetTimeline */
  public readonly entitiesGetTimeline: EntitiesGetTimelineOperations;
  /** The operation groups for threatIntelligence */
  public readonly threatIntelligence: ThreatIntelligenceOperations;
  /** The operation groups for threatIntelligenceIndicatorMetrics */
  public readonly threatIntelligenceIndicatorMetrics: ThreatIntelligenceIndicatorMetricsOperations;
  /** The operation groups for sourceControl */
  public readonly sourceControl: SourceControlOperations;
  /** The operation groups for dataConnectorsCheckRequirements */
  public readonly dataConnectorsCheckRequirements: DataConnectorsCheckRequirementsOperations;
  /** The operation groups for threatIntelligenceIndicators */
  public readonly threatIntelligenceIndicators: ThreatIntelligenceIndicatorsOperations;
  /** The operation groups for threatIntelligenceIndicator */
  public readonly threatIntelligenceIndicator: ThreatIntelligenceIndicatorOperations;
  /** The operation groups for metadata */
  public readonly metadata: MetadataOperations;
  /** The operation groups for entitiesRelations */
  public readonly entitiesRelations: EntitiesRelationsOperations;
  /** The operation groups for incidentRelations */
  public readonly incidentRelations: IncidentRelationsOperations;
  /** The operation groups for contentTemplates */
  public readonly contentTemplates: ContentTemplatesOperations;
  /** The operation groups for contentTemplate */
  public readonly contentTemplate: ContentTemplateOperations;
  /** The operation groups for productTemplates */
  public readonly productTemplates: ProductTemplatesOperations;
  /** The operation groups for productTemplate */
  public readonly productTemplate: ProductTemplateOperations;
  /** The operation groups for productPackages */
  public readonly productPackages: ProductPackagesOperations;
  /** The operation groups for productPackage */
  public readonly productPackage: ProductPackageOperations;
  /** The operation groups for contentPackage */
  public readonly contentPackage: ContentPackageOperations;
  /** The operation groups for contentPackages */
  public readonly contentPackages: ContentPackagesOperations;
  /** The operation groups for bookmark */
  public readonly bookmark: BookmarkOperations;
  /** The operation groups for actions */
  public readonly actions: ActionsOperations;
  /** The operation groups for alertRule */
  public readonly alertRule: AlertRuleOperations;
  /** The operation groups for workspaceManagerMembers */
  public readonly workspaceManagerMembers: WorkspaceManagerMembersOperations;
  /** The operation groups for workspaceManagerGroups */
  public readonly workspaceManagerGroups: WorkspaceManagerGroupsOperations;
  /** The operation groups for workspaceManagerConfigurations */
  public readonly workspaceManagerConfigurations: WorkspaceManagerConfigurationsOperations;
  /** The operation groups for workspaceManagerAssignments */
  public readonly workspaceManagerAssignments: WorkspaceManagerAssignmentsOperations;
  /** The operation groups for triggeredAnalyticsRuleRun */
  public readonly triggeredAnalyticsRuleRun: TriggeredAnalyticsRuleRunOperations;
  /** The operation groups for productSettings */
  public readonly productSettings: ProductSettingsOperations;
  /** The operation groups for officeConsents */
  public readonly officeConsents: OfficeConsentsOperations;
  /** The operation groups for huntRelations */
  public readonly huntRelations: HuntRelationsOperations;
  /** The operation groups for huntComments */
  public readonly huntComments: HuntCommentsOperations;
  /** The operation groups for hunts */
  public readonly hunts: HuntsOperations;
  /** The operation groups for fileImports */
  public readonly fileImports: FileImportsOperations;
  /** The operation groups for entityQueryTemplates */
  public readonly entityQueryTemplates: EntityQueryTemplatesOperations;
  /** The operation groups for entityQueries */
  public readonly entityQueries: EntityQueriesOperations;
  /** The operation groups for entities */
  public readonly entities: EntitiesOperations;
  /** The operation groups for billingStatistics */
  public readonly billingStatistics: BillingStatisticsOperations;
  /** The operation groups for watchlistItems */
  public readonly watchlistItems: WatchlistItemsOperations;
  /** The operation groups for watchlists */
  public readonly watchlists: WatchlistsOperations;
  /** The operation groups for sourceControls */
  public readonly sourceControls: SourceControlsOperations;
  /** The operation groups for securityMLAnalyticsSettings */
  public readonly securityMLAnalyticsSettings: SecurityMLAnalyticsSettingsOperations;
  /** The operation groups for sentinelOnboardingStates */
  public readonly sentinelOnboardingStates: SentinelOnboardingStatesOperations;
  /** The operation groups for incidentTasks */
  public readonly incidentTasks: IncidentTasksOperations;
  /** The operation groups for entityRelations */
  public readonly entityRelations: EntityRelationsOperations;
  /** The operation groups for bookmarkRelations */
  public readonly bookmarkRelations: BookmarkRelationsOperations;
  /** The operation groups for incidentComments */
  public readonly incidentComments: IncidentCommentsOperations;
  /** The operation groups for dataConnectors */
  public readonly dataConnectors: DataConnectorsOperations;
  /** The operation groups for dataConnectorDefinitions */
  public readonly dataConnectorDefinitions: DataConnectorDefinitionsOperations;
  /** The operation groups for bookmarks */
  public readonly bookmarks: BookmarksOperations;
  /** The operation groups for incidents */
  public readonly incidents: IncidentsOperations;
  /** The operation groups for automationRules */
  public readonly automationRules: AutomationRulesOperations;
  /** The operation groups for alertRuleTemplates */
  public readonly alertRuleTemplates: AlertRuleTemplatesOperations;
  /** The operation groups for alertRules */
  public readonly alertRules: AlertRulesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
