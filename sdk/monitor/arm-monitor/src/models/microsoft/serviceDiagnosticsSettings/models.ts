// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { ExtensionResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";
import type { RetentionPolicy } from "../common/models.js";
import { retentionPolicySerializer, retentionPolicyDeserializer } from "../common/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Description of a service diagnostic setting */
export interface ServiceDiagnosticSettingsResource extends ExtensionResource {
  /** Resource location */
  location: string;
  /** Resource tags */
  tags?: Record<string, string>;
  /** The resource ID of the storage account to which you would like to send Diagnostic Logs. */
  storageAccountId?: string;
  /** The service bus rule ID of the service bus namespace in which you would like to have Event Hubs created for streaming Diagnostic Logs. The rule ID is of the format: '{service bus resource ID}/authorizationrules/{key name}'. */
  serviceBusRuleId?: string;
  /** The resource Id for the event hub namespace authorization rule. */
  eventHubAuthorizationRuleId?: string;
  /** the list of metric settings. */
  metrics?: MetricSettings[];
  /** the list of logs settings. */
  logs?: LogSettings[];
  /** The workspace ID (resource ID of a Log Analytics workspace) for a Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2 */
  workspaceId?: string;
}

export function serviceDiagnosticSettingsResourceSerializer(
  item: ServiceDiagnosticSettingsResource,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "storageAccountId",
      "serviceBusRuleId",
      "eventHubAuthorizationRuleId",
      "metrics",
      "logs",
      "workspaceId",
    ])
      ? undefined
      : _serviceDiagnosticSettingsResourcePropertiesSerializer(item),
    location: item["location"],
    tags: item["tags"],
  };
}

export function serviceDiagnosticSettingsResourceDeserializer(
  item: any,
): ServiceDiagnosticSettingsResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serviceDiagnosticSettingsResourcePropertiesDeserializer(item["properties"])),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The diagnostic settings for service. */
export interface ServiceDiagnosticSettings {
  /** The resource ID of the storage account to which you would like to send Diagnostic Logs. */
  storageAccountId?: string;
  /** The service bus rule ID of the service bus namespace in which you would like to have Event Hubs created for streaming Diagnostic Logs. The rule ID is of the format: '{service bus resource ID}/authorizationrules/{key name}'. */
  serviceBusRuleId?: string;
  /** The resource Id for the event hub namespace authorization rule. */
  eventHubAuthorizationRuleId?: string;
  /** the list of metric settings. */
  metrics?: MetricSettings[];
  /** the list of logs settings. */
  logs?: LogSettings[];
  /** The workspace ID (resource ID of a Log Analytics workspace) for a Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2 */
  workspaceId?: string;
}

export function serviceDiagnosticSettingsSerializer(item: ServiceDiagnosticSettings): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"] ? item["metrics"] : metricSettingsArraySerializer(item["metrics"]),
    logs: !item["logs"] ? item["logs"] : logSettingsArraySerializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}

export function serviceDiagnosticSettingsDeserializer(item: any): ServiceDiagnosticSettings {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"] ? item["metrics"] : metricSettingsArrayDeserializer(item["metrics"]),
    logs: !item["logs"] ? item["logs"] : logSettingsArrayDeserializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}

export function metricSettingsArraySerializer(result: Array<MetricSettings>): any[] {
  return result.map((item) => {
    return metricSettingsSerializer(item);
  });
}

export function metricSettingsArrayDeserializer(result: Array<MetricSettings>): any[] {
  return result.map((item) => {
    return metricSettingsDeserializer(item);
  });
}

/** Part of MultiTenantDiagnosticSettings. Specifies the settings for a particular metric. */
export interface MetricSettings {
  /** the timegrain of the metric in ISO8601 format. */
  timeGrain: string;
  /** a value indicating whether this timegrain is enabled. */
  enabled: boolean;
  /** the retention policy for this timegrain. */
  retentionPolicy?: RetentionPolicy;
}

export function metricSettingsSerializer(item: MetricSettings): any {
  return {
    timeGrain: item["timeGrain"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function metricSettingsDeserializer(item: any): MetricSettings {
  return {
    timeGrain: item["timeGrain"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

export function logSettingsArraySerializer(result: Array<LogSettings>): any[] {
  return result.map((item) => {
    return logSettingsSerializer(item);
  });
}

export function logSettingsArrayDeserializer(result: Array<LogSettings>): any[] {
  return result.map((item) => {
    return logSettingsDeserializer(item);
  });
}

/** Part of MultiTenantDiagnosticSettings. Specifies the settings for a particular log. */
export interface LogSettings {
  /** Name of a Diagnostic Log category for a resource type this setting is applied to. To obtain the list of Diagnostic Log categories for a resource, first perform a GET diagnostic settings operation. */
  category?: string;
  /** a value indicating whether this log is enabled. */
  enabled: boolean;
  /** the retention policy for this log. */
  retentionPolicy?: RetentionPolicy;
}

export function logSettingsSerializer(item: LogSettings): any {
  return {
    category: item["category"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function logSettingsDeserializer(item: any): LogSettings {
  return {
    category: item["category"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

/** Service diagnostic setting resource for patch operations */
export interface ServiceDiagnosticSettingsResourcePatch {
  /** Resource tags */
  tags?: Record<string, string>;
  /** The resource ID of the storage account to which you would like to send Diagnostic Logs. */
  storageAccountId?: string;
  /** The service bus rule ID of the service bus namespace in which you would like to have Event Hubs created for streaming Diagnostic Logs. The rule ID is of the format: '{service bus resource ID}/authorizationrules/{key name}'. */
  serviceBusRuleId?: string;
  /** The resource Id for the event hub namespace authorization rule. */
  eventHubAuthorizationRuleId?: string;
  /** the list of metric settings. */
  metrics?: MetricSettings[];
  /** the list of logs settings. */
  logs?: LogSettings[];
  /** The workspace ID (resource ID of a Log Analytics workspace) for a Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2 */
  workspaceId?: string;
}

export function serviceDiagnosticSettingsResourcePatchSerializer(
  item: ServiceDiagnosticSettingsResourcePatch,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "storageAccountId",
      "serviceBusRuleId",
      "eventHubAuthorizationRuleId",
      "metrics",
      "logs",
      "workspaceId",
    ])
      ? undefined
      : _serviceDiagnosticSettingsResourcePatchPropertiesSerializer(item),
  };
}

export function _serviceDiagnosticSettingsResourcePropertiesSerializer(
  item: ServiceDiagnosticSettingsResource,
): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"] ? item["metrics"] : metricSettingsArraySerializer(item["metrics"]),
    logs: !item["logs"] ? item["logs"] : logSettingsArraySerializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}

export function _serviceDiagnosticSettingsResourcePropertiesDeserializer(item: any) {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"] ? item["metrics"] : metricSettingsArrayDeserializer(item["metrics"]),
    logs: !item["logs"] ? item["logs"] : logSettingsArrayDeserializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}

export function _serviceDiagnosticSettingsResourcePatchPropertiesSerializer(
  item: ServiceDiagnosticSettingsResourcePatch,
): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"] ? item["metrics"] : metricSettingsArraySerializer(item["metrics"]),
    logs: !item["logs"] ? item["logs"] : logSettingsArraySerializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}

export function _serviceDiagnosticSettingsResourcePatchPropertiesDeserializer(item: any) {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"] ? item["metrics"] : metricSettingsArrayDeserializer(item["metrics"]),
    logs: !item["logs"] ? item["logs"] : logSettingsArrayDeserializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}
