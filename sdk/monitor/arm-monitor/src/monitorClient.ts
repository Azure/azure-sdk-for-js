// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext, MonitorClientOptionalParams } from "./api/index.js";
import { createMonitor } from "./api/index.js";
import type { ActionGroupsOperations } from "./classic/actionGroups/index.js";
import { _getActionGroupsOperations } from "./classic/actionGroups/index.js";
import type { ActivityLogAlertsOperations } from "./classic/activityLogAlerts/index.js";
import { _getActivityLogAlertsOperations } from "./classic/activityLogAlerts/index.js";
import type { ActivityLogsOperations } from "./classic/activityLogs/index.js";
import { _getActivityLogsOperations } from "./classic/activityLogs/index.js";
import type { AlertRuleIncidentsOperations } from "./classic/alertRuleIncidents/index.js";
import { _getAlertRuleIncidentsOperations } from "./classic/alertRuleIncidents/index.js";
import type { AutoscaleSettingsOperations } from "./classic/autoscaleSettings/index.js";
import { _getAutoscaleSettingsOperations } from "./classic/autoscaleSettings/index.js";
import type { BaselinesOperations } from "./classic/baselines/index.js";
import { _getBaselinesOperations } from "./classic/baselines/index.js";
import type { DataCollectionEndpointsOperations } from "./classic/dataCollectionEndpoints/index.js";
import { _getDataCollectionEndpointsOperations } from "./classic/dataCollectionEndpoints/index.js";
import type { DataCollectionRuleAssociationsOperations } from "./classic/dataCollectionRuleAssociations/index.js";
import { _getDataCollectionRuleAssociationsOperations } from "./classic/dataCollectionRuleAssociations/index.js";
import type { DataCollectionRulesOperations } from "./classic/dataCollectionRules/index.js";
import { _getDataCollectionRulesOperations } from "./classic/dataCollectionRules/index.js";
import type { EventCategoriesOperations } from "./classic/eventCategories/index.js";
import { _getEventCategoriesOperations } from "./classic/eventCategories/index.js";
import type { LogProfilesOperations } from "./classic/logProfiles/index.js";
import { _getLogProfilesOperations } from "./classic/logProfiles/index.js";
import type { MetricAlertsOperations } from "./classic/metricAlerts/index.js";
import { _getMetricAlertsOperations } from "./classic/metricAlerts/index.js";
import type { MetricAlertsStatusOperations } from "./classic/metricAlertsStatus/index.js";
import { _getMetricAlertsStatusOperations } from "./classic/metricAlertsStatus/index.js";
import type { MetricDefinitionsOperations } from "./classic/metricDefinitions/index.js";
import { _getMetricDefinitionsOperations } from "./classic/metricDefinitions/index.js";
import type { MetricNamespacesOperations } from "./classic/metricNamespaces/index.js";
import { _getMetricNamespacesOperations } from "./classic/metricNamespaces/index.js";
import type { MetricsOperations } from "./classic/metrics/index.js";
import { _getMetricsOperations } from "./classic/metrics/index.js";
import type { PredictiveMetricOperations } from "./classic/predictiveMetric/index.js";
import { _getPredictiveMetricOperations } from "./classic/predictiveMetric/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { PrivateLinkScopeOperationStatusOperations } from "./classic/privateLinkScopeOperationStatus/index.js";
import { _getPrivateLinkScopeOperationStatusOperations } from "./classic/privateLinkScopeOperationStatus/index.js";
import type { PrivateLinkScopedResourcesOperations } from "./classic/privateLinkScopedResources/index.js";
import { _getPrivateLinkScopedResourcesOperations } from "./classic/privateLinkScopedResources/index.js";
import type { PrivateLinkScopesOperations } from "./classic/privateLinkScopes/index.js";
import { _getPrivateLinkScopesOperations } from "./classic/privateLinkScopes/index.js";
import type { ScheduledQueryRuleOperations } from "./classic/scheduledQueryRule/index.js";
import { _getScheduledQueryRuleOperations } from "./classic/scheduledQueryRule/index.js";
import type { ScheduledQueryRulesOperations } from "./classic/scheduledQueryRules/index.js";
import { _getScheduledQueryRulesOperations } from "./classic/scheduledQueryRules/index.js";
import type { ServiceDiagnosticSettingsOperations } from "./classic/serviceDiagnosticSettings/index.js";
import { _getServiceDiagnosticSettingsOperations } from "./classic/serviceDiagnosticSettings/index.js";
import type { TenantActivityLogsOperations } from "./classic/tenantActivityLogs/index.js";
import { _getTenantActivityLogsOperations } from "./classic/tenantActivityLogs/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { MonitorClientOptionalParams } from "./api/monitorContext.js";

export class MonitorClient {
  private _client: MonitorContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: MonitorClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: MonitorClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | MonitorClientOptionalParams,
    options?: MonitorClientOptionalParams,
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
    this._client = createMonitor(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.actionGroups = _getActionGroupsOperations(this._client);
    this.baselines = _getBaselinesOperations(this._client);
    this.scheduledQueryRules = _getScheduledQueryRulesOperations(this._client);
    this.metricAlertsStatus = _getMetricAlertsStatusOperations(this._client);
    this.metricAlerts = _getMetricAlertsOperations(this._client);
    this.activityLogAlerts = _getActivityLogAlertsOperations(this._client);
    this.logProfiles = _getLogProfilesOperations(this._client);
    this.alertRuleIncidents = _getAlertRuleIncidentsOperations(this._client);
    this.serviceDiagnosticSettings = _getServiceDiagnosticSettingsOperations(this._client);
    this.metrics = _getMetricsOperations(this._client);
    this.metricNamespaces = _getMetricNamespacesOperations(this._client);
    this.metricDefinitions = _getMetricDefinitionsOperations(this._client);
    this.tenantActivityLogs = _getTenantActivityLogsOperations(this._client);
    this.eventCategories = _getEventCategoriesOperations(this._client);
    this.activityLogs = _getActivityLogsOperations(this._client);
    this.predictiveMetric = _getPredictiveMetricOperations(this._client);
    this.autoscaleSettings = _getAutoscaleSettingsOperations(this._client);
    this.privateLinkScopeOperationStatus = _getPrivateLinkScopeOperationStatusOperations(
      this._client,
    );
    this.privateLinkScopedResources = _getPrivateLinkScopedResourcesOperations(this._client);
    this.privateLinkScopes = _getPrivateLinkScopesOperations(this._client);
    this.dataCollectionRules = _getDataCollectionRulesOperations(this._client);
    this.dataCollectionRuleAssociations = _getDataCollectionRuleAssociationsOperations(
      this._client,
    );
    this.scheduledQueryRule = _getScheduledQueryRuleOperations(this._client);
    this.dataCollectionEndpoints = _getDataCollectionEndpointsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
  }

  /** The operation groups for actionGroups */
  public readonly actionGroups: ActionGroupsOperations;
  /** The operation groups for baselines */
  public readonly baselines: BaselinesOperations;
  /** The operation groups for scheduledQueryRules */
  public readonly scheduledQueryRules: ScheduledQueryRulesOperations;
  /** The operation groups for metricAlertsStatus */
  public readonly metricAlertsStatus: MetricAlertsStatusOperations;
  /** The operation groups for metricAlerts */
  public readonly metricAlerts: MetricAlertsOperations;
  /** The operation groups for activityLogAlerts */
  public readonly activityLogAlerts: ActivityLogAlertsOperations;
  /** The operation groups for logProfiles */
  public readonly logProfiles: LogProfilesOperations;
  /** The operation groups for alertRuleIncidents */
  public readonly alertRuleIncidents: AlertRuleIncidentsOperations;
  /** The operation groups for serviceDiagnosticSettings */
  public readonly serviceDiagnosticSettings: ServiceDiagnosticSettingsOperations;
  /** The operation groups for metrics */
  public readonly metrics: MetricsOperations;
  /** The operation groups for metricNamespaces */
  public readonly metricNamespaces: MetricNamespacesOperations;
  /** The operation groups for metricDefinitions */
  public readonly metricDefinitions: MetricDefinitionsOperations;
  /** The operation groups for tenantActivityLogs */
  public readonly tenantActivityLogs: TenantActivityLogsOperations;
  /** The operation groups for eventCategories */
  public readonly eventCategories: EventCategoriesOperations;
  /** The operation groups for activityLogs */
  public readonly activityLogs: ActivityLogsOperations;
  /** The operation groups for predictiveMetric */
  public readonly predictiveMetric: PredictiveMetricOperations;
  /** The operation groups for autoscaleSettings */
  public readonly autoscaleSettings: AutoscaleSettingsOperations;
  /** The operation groups for privateLinkScopeOperationStatus */
  public readonly privateLinkScopeOperationStatus: PrivateLinkScopeOperationStatusOperations;
  /** The operation groups for privateLinkScopedResources */
  public readonly privateLinkScopedResources: PrivateLinkScopedResourcesOperations;
  /** The operation groups for privateLinkScopes */
  public readonly privateLinkScopes: PrivateLinkScopesOperations;
  /** The operation groups for dataCollectionRules */
  public readonly dataCollectionRules: DataCollectionRulesOperations;
  /** The operation groups for dataCollectionRuleAssociations */
  public readonly dataCollectionRuleAssociations: DataCollectionRuleAssociationsOperations;
  /** The operation groups for scheduledQueryRule */
  public readonly scheduledQueryRule: ScheduledQueryRuleOperations;
  /** The operation groups for dataCollectionEndpoints */
  public readonly dataCollectionEndpoints: DataCollectionEndpointsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
}
