// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SecurityInsightsContext,
  SecurityInsightsOptionalParams,
  createSecurityInsights,
} from "./api/index.js";
import { listWhoisByDomain, listGeodataByIp } from "./api/operations.js";
import { ListWhoisByDomainOptionalParams, ListGeodataByIpOptionalParams } from "./api/options.js";
import { ActionsOperations, _getActionsOperations } from "./classic/actions/index.js";
import { AlertRuleOperations, _getAlertRuleOperations } from "./classic/alertRule/index.js";
import {
  AlertRuleTemplatesOperations,
  _getAlertRuleTemplatesOperations,
} from "./classic/alertRuleTemplates/index.js";
import { AlertRulesOperations, _getAlertRulesOperations } from "./classic/alertRules/index.js";
import {
  AutomationRulesOperations,
  _getAutomationRulesOperations,
} from "./classic/automationRules/index.js";
import {
  BillingStatisticsOperations,
  _getBillingStatisticsOperations,
} from "./classic/billingStatistics/index.js";
import {
  BookmarkOperationsOperations,
  _getBookmarkOperationsOperations,
} from "./classic/bookmarkOperations/index.js";
import {
  BookmarkRelationsOperations,
  _getBookmarkRelationsOperations,
} from "./classic/bookmarkRelations/index.js";
import { BookmarksOperations, _getBookmarksOperations } from "./classic/bookmarks/index.js";
import {
  ContentPackageOperations,
  _getContentPackageOperations,
} from "./classic/contentPackage/index.js";
import {
  ContentPackagesOperations,
  _getContentPackagesOperations,
} from "./classic/contentPackages/index.js";
import {
  ContentTemplateOperations,
  _getContentTemplateOperations,
} from "./classic/contentTemplate/index.js";
import {
  ContentTemplatesOperations,
  _getContentTemplatesOperations,
} from "./classic/contentTemplates/index.js";
import {
  DataConnectorDefinitionsOperations,
  _getDataConnectorDefinitionsOperations,
} from "./classic/dataConnectorDefinitions/index.js";
import {
  DataConnectorsOperations,
  _getDataConnectorsOperations,
} from "./classic/dataConnectors/index.js";
import {
  DataConnectorsCheckRequirementsOperationsOperations,
  _getDataConnectorsCheckRequirementsOperationsOperations,
} from "./classic/dataConnectorsCheckRequirementsOperations/index.js";
import { EntitiesOperations, _getEntitiesOperations } from "./classic/entities/index.js";
import {
  EntitiesGetTimelineOperations,
  _getEntitiesGetTimelineOperations,
} from "./classic/entitiesGetTimeline/index.js";
import {
  EntitiesRelationsOperations,
  _getEntitiesRelationsOperations,
} from "./classic/entitiesRelations/index.js";
import {
  EntityQueriesOperations,
  _getEntityQueriesOperations,
} from "./classic/entityQueries/index.js";
import {
  EntityQueryTemplatesOperations,
  _getEntityQueryTemplatesOperations,
} from "./classic/entityQueryTemplates/index.js";
import {
  EntityRelationsOperations,
  _getEntityRelationsOperations,
} from "./classic/entityRelations/index.js";
import { FileImportsOperations, _getFileImportsOperations } from "./classic/fileImports/index.js";
import { GetOperations, _getGetOperations } from "./classic/get/index.js";
import {
  GetRecommendationsOperations,
  _getGetRecommendationsOperations,
} from "./classic/getRecommendations/index.js";
import {
  GetTriggeredAnalyticsRuleRunsOperations,
  _getGetTriggeredAnalyticsRuleRunsOperations,
} from "./classic/getTriggeredAnalyticsRuleRuns/index.js";
import {
  HuntCommentsOperations,
  _getHuntCommentsOperations,
} from "./classic/huntComments/index.js";
import {
  HuntRelationsOperations,
  _getHuntRelationsOperations,
} from "./classic/huntRelations/index.js";
import { HuntsOperations, _getHuntsOperations } from "./classic/hunts/index.js";
import {
  IncidentCommentsOperations,
  _getIncidentCommentsOperations,
} from "./classic/incidentComments/index.js";
import {
  IncidentRelationsOperations,
  _getIncidentRelationsOperations,
} from "./classic/incidentRelations/index.js";
import {
  IncidentTasksOperations,
  _getIncidentTasksOperations,
} from "./classic/incidentTasks/index.js";
import { IncidentsOperations, _getIncidentsOperations } from "./classic/incidents/index.js";
import { MetadataOperations, _getMetadataOperations } from "./classic/metadata/index.js";
import {
  OfficeConsentsOperations,
  _getOfficeConsentsOperations,
} from "./classic/officeConsents/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  ProductPackageOperations,
  _getProductPackageOperations,
} from "./classic/productPackage/index.js";
import {
  ProductPackagesOperations,
  _getProductPackagesOperations,
} from "./classic/productPackages/index.js";
import {
  ProductSettingsOperations,
  _getProductSettingsOperations,
} from "./classic/productSettings/index.js";
import {
  ProductTemplateOperations,
  _getProductTemplateOperations,
} from "./classic/productTemplate/index.js";
import {
  ProductTemplatesOperations,
  _getProductTemplatesOperations,
} from "./classic/productTemplates/index.js";
import { ReevaluateOperations, _getReevaluateOperations } from "./classic/reevaluate/index.js";
import {
  SecurityMLAnalyticsSettingsOperations,
  _getSecurityMLAnalyticsSettingsOperations,
} from "./classic/securityMLAnalyticsSettings/index.js";
import {
  SentinelOnboardingStatesOperations,
  _getSentinelOnboardingStatesOperations,
} from "./classic/sentinelOnboardingStates/index.js";
import {
  SourceControlOperationsOperations,
  _getSourceControlOperationsOperations,
} from "./classic/sourceControlOperations/index.js";
import {
  SourceControlsOperations,
  _getSourceControlsOperations,
} from "./classic/sourceControls/index.js";
import {
  ThreatIntelligenceOperations,
  _getThreatIntelligenceOperations,
} from "./classic/threatIntelligence/index.js";
import {
  ThreatIntelligenceIndicatorOperations,
  _getThreatIntelligenceIndicatorOperations,
} from "./classic/threatIntelligenceIndicator/index.js";
import {
  ThreatIntelligenceIndicatorMetricsOperations,
  _getThreatIntelligenceIndicatorMetricsOperations,
} from "./classic/threatIntelligenceIndicatorMetrics/index.js";
import {
  ThreatIntelligenceIndicatorsOperations,
  _getThreatIntelligenceIndicatorsOperations,
} from "./classic/threatIntelligenceIndicators/index.js";
import {
  TriggeredAnalyticsRuleRunOperations,
  _getTriggeredAnalyticsRuleRunOperations,
} from "./classic/triggeredAnalyticsRuleRun/index.js";
import { UpdateOperations, _getUpdateOperations } from "./classic/update/index.js";
import {
  WatchlistItemsOperations,
  _getWatchlistItemsOperations,
} from "./classic/watchlistItems/index.js";
import { WatchlistsOperations, _getWatchlistsOperations } from "./classic/watchlists/index.js";
import {
  WorkspaceManagerAssignmentJobsOperations,
  _getWorkspaceManagerAssignmentJobsOperations,
} from "./classic/workspaceManagerAssignmentJobs/index.js";
import {
  WorkspaceManagerAssignmentsOperations,
  _getWorkspaceManagerAssignmentsOperations,
} from "./classic/workspaceManagerAssignments/index.js";
import {
  WorkspaceManagerConfigurationsOperations,
  _getWorkspaceManagerConfigurationsOperations,
} from "./classic/workspaceManagerConfigurations/index.js";
import {
  WorkspaceManagerGroupsOperations,
  _getWorkspaceManagerGroupsOperations,
} from "./classic/workspaceManagerGroups/index.js";
import {
  WorkspaceManagerMembersOperations,
  _getWorkspaceManagerMembersOperations,
} from "./classic/workspaceManagerMembers/index.js";
import {
  EnrichmentIpAddressBody,
  EnrichmentIpGeodata,
  EnrichmentDomainBody,
  EnrichmentDomainWhois,
  EnrichmentType,
} from "./models/models.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

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
    this.sourceControlOperations = _getSourceControlOperationsOperations(this._client);
    this.dataConnectorsCheckRequirementsOperations =
      _getDataConnectorsCheckRequirementsOperationsOperations(this._client);
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
    this.bookmarkOperations = _getBookmarkOperationsOperations(this._client);
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
  /** The operation groups for sourceControlOperations */
  public readonly sourceControlOperations: SourceControlOperationsOperations;
  /** The operation groups for dataConnectorsCheckRequirementsOperations */
  public readonly dataConnectorsCheckRequirementsOperations: DataConnectorsCheckRequirementsOperationsOperations;
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
  /** The operation groups for bookmarkOperations */
  public readonly bookmarkOperations: BookmarkOperationsOperations;
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
