// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { ExtensionResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Description of a service diagnostic setting */
export interface MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResource extends ExtensionResource {
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
  metrics?: MicrosoftServiceDiagnosticsSettingsMetricSettings[];
  /** the list of logs settings. */
  logs?: MicrosoftServiceDiagnosticsSettingsLogSettings[];
  /** The workspace ID (resource ID of a Log Analytics workspace) for a Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2 */
  workspaceId?: string;
}

export function microsoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResourceSerializer(
  item: MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResource,
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

export function microsoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResourceDeserializer(
  item: any,
): MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResource {
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
export interface MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettings {
  /** The resource ID of the storage account to which you would like to send Diagnostic Logs. */
  storageAccountId?: string;
  /** The service bus rule ID of the service bus namespace in which you would like to have Event Hubs created for streaming Diagnostic Logs. The rule ID is of the format: '{service bus resource ID}/authorizationrules/{key name}'. */
  serviceBusRuleId?: string;
  /** The resource Id for the event hub namespace authorization rule. */
  eventHubAuthorizationRuleId?: string;
  /** the list of metric settings. */
  metrics?: MicrosoftServiceDiagnosticsSettingsMetricSettings[];
  /** the list of logs settings. */
  logs?: MicrosoftServiceDiagnosticsSettingsLogSettings[];
  /** The workspace ID (resource ID of a Log Analytics workspace) for a Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2 */
  workspaceId?: string;
}

export function microsoftServiceDiagnosticsSettingsServiceDiagnosticSettingsSerializer(
  item: MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettings,
): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : microsoftServiceDiagnosticsSettingsMetricSettingsArraySerializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : microsoftServiceDiagnosticsSettingsLogSettingsArraySerializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}

export function microsoftServiceDiagnosticsSettingsServiceDiagnosticSettingsDeserializer(
  item: any,
): MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettings {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : microsoftServiceDiagnosticsSettingsMetricSettingsArrayDeserializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : microsoftServiceDiagnosticsSettingsLogSettingsArrayDeserializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}

export function microsoftServiceDiagnosticsSettingsMetricSettingsArraySerializer(
  result: Array<MicrosoftServiceDiagnosticsSettingsMetricSettings>,
): any[] {
  return result.map((item) => {
    return microsoftServiceDiagnosticsSettingsMetricSettingsSerializer(item);
  });
}

export function microsoftServiceDiagnosticsSettingsMetricSettingsArrayDeserializer(
  result: Array<MicrosoftServiceDiagnosticsSettingsMetricSettings>,
): any[] {
  return result.map((item) => {
    return microsoftServiceDiagnosticsSettingsMetricSettingsDeserializer(item);
  });
}

/** Part of MultiTenantDiagnosticSettings. Specifies the settings for a particular metric. */
export interface MicrosoftServiceDiagnosticsSettingsMetricSettings {
  /** the timegrain of the metric in ISO8601 format. */
  timeGrain: string;
  /** a value indicating whether this timegrain is enabled. */
  enabled: boolean;
  /** the retention policy for this timegrain. */
  retentionPolicy?: MicrosoftServiceDiagnosticsSettingsRetentionPolicy;
}

export function microsoftServiceDiagnosticsSettingsMetricSettingsSerializer(
  item: MicrosoftServiceDiagnosticsSettingsMetricSettings,
): any {
  return {
    timeGrain: item["timeGrain"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : microsoftServiceDiagnosticsSettingsRetentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function microsoftServiceDiagnosticsSettingsMetricSettingsDeserializer(
  item: any,
): MicrosoftServiceDiagnosticsSettingsMetricSettings {
  return {
    timeGrain: item["timeGrain"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : microsoftServiceDiagnosticsSettingsRetentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

/** Specifies the retention policy for the log. */
export interface MicrosoftServiceDiagnosticsSettingsRetentionPolicy {
  /** a value indicating whether the retention policy is enabled. */
  enabled: boolean;
  /** the number of days for the retention in days. A value of 0 will retain the events indefinitely. */
  days: number;
}

export function microsoftServiceDiagnosticsSettingsRetentionPolicySerializer(
  item: MicrosoftServiceDiagnosticsSettingsRetentionPolicy,
): any {
  return { enabled: item["enabled"], days: item["days"] };
}

export function microsoftServiceDiagnosticsSettingsRetentionPolicyDeserializer(
  item: any,
): MicrosoftServiceDiagnosticsSettingsRetentionPolicy {
  return {
    enabled: item["enabled"],
    days: item["days"],
  };
}

export function microsoftServiceDiagnosticsSettingsLogSettingsArraySerializer(
  result: Array<MicrosoftServiceDiagnosticsSettingsLogSettings>,
): any[] {
  return result.map((item) => {
    return microsoftServiceDiagnosticsSettingsLogSettingsSerializer(item);
  });
}

export function microsoftServiceDiagnosticsSettingsLogSettingsArrayDeserializer(
  result: Array<MicrosoftServiceDiagnosticsSettingsLogSettings>,
): any[] {
  return result.map((item) => {
    return microsoftServiceDiagnosticsSettingsLogSettingsDeserializer(item);
  });
}

/** Part of MultiTenantDiagnosticSettings. Specifies the settings for a particular log. */
export interface MicrosoftServiceDiagnosticsSettingsLogSettings {
  /** Name of a Diagnostic Log category for a resource type this setting is applied to. To obtain the list of Diagnostic Log categories for a resource, first perform a GET diagnostic settings operation. */
  category?: string;
  /** a value indicating whether this log is enabled. */
  enabled: boolean;
  /** the retention policy for this log. */
  retentionPolicy?: MicrosoftServiceDiagnosticsSettingsRetentionPolicy;
}

export function microsoftServiceDiagnosticsSettingsLogSettingsSerializer(
  item: MicrosoftServiceDiagnosticsSettingsLogSettings,
): any {
  return {
    category: item["category"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : microsoftServiceDiagnosticsSettingsRetentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function microsoftServiceDiagnosticsSettingsLogSettingsDeserializer(
  item: any,
): MicrosoftServiceDiagnosticsSettingsLogSettings {
  return {
    category: item["category"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : microsoftServiceDiagnosticsSettingsRetentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

/** Describes the format of Error response. */
export interface MicrosoftServiceDiagnosticsSettingsErrorResponse {
  /** Error code */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
}

export function microsoftServiceDiagnosticsSettingsErrorResponseDeserializer(
  item: any,
): MicrosoftServiceDiagnosticsSettingsErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Service diagnostic setting resource for patch operations */
export interface MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResourcePatch {
  /** Resource tags */
  tags?: Record<string, string>;
  /** The resource ID of the storage account to which you would like to send Diagnostic Logs. */
  storageAccountId?: string;
  /** The service bus rule ID of the service bus namespace in which you would like to have Event Hubs created for streaming Diagnostic Logs. The rule ID is of the format: '{service bus resource ID}/authorizationrules/{key name}'. */
  serviceBusRuleId?: string;
  /** The resource Id for the event hub namespace authorization rule. */
  eventHubAuthorizationRuleId?: string;
  /** the list of metric settings. */
  metrics?: MicrosoftServiceDiagnosticsSettingsMetricSettings[];
  /** the list of logs settings. */
  logs?: MicrosoftServiceDiagnosticsSettingsLogSettings[];
  /** The workspace ID (resource ID of a Log Analytics workspace) for a Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2 */
  workspaceId?: string;
}

export function microsoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResourcePatchSerializer(
  item: MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResourcePatch,
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
  item: MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResource,
): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : microsoftServiceDiagnosticsSettingsMetricSettingsArraySerializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : microsoftServiceDiagnosticsSettingsLogSettingsArraySerializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}

export function _serviceDiagnosticSettingsResourcePropertiesDeserializer(item: any) {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : microsoftServiceDiagnosticsSettingsMetricSettingsArrayDeserializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : microsoftServiceDiagnosticsSettingsLogSettingsArrayDeserializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}

export function _serviceDiagnosticSettingsResourcePatchPropertiesSerializer(
  item: MicrosoftServiceDiagnosticsSettingsServiceDiagnosticSettingsResourcePatch,
): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : microsoftServiceDiagnosticsSettingsMetricSettingsArraySerializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : microsoftServiceDiagnosticsSettingsLogSettingsArraySerializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}

export function _serviceDiagnosticSettingsResourcePatchPropertiesDeserializer(item: any) {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : microsoftServiceDiagnosticsSettingsMetricSettingsArrayDeserializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : microsoftServiceDiagnosticsSettingsLogSettingsArrayDeserializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}
