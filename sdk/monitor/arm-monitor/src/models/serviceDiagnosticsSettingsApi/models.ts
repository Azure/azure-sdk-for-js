// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { MicrosoftCommonRetentionPolicy } from "../microsoft/common/models.js";
import {
  microsoftCommonRetentionPolicySerializer,
  microsoftCommonRetentionPolicyDeserializer,
} from "../microsoft/common/models.js";
import type { MicrosoftInsightsCombinedClientMetricSettings } from "../microsoft/insightsCombinedClient/models.js";
import {
  microsoftInsightsCombinedClientMetricSettingsArraySerializer,
  microsoftInsightsCombinedClientMetricSettingsArrayDeserializer,
} from "../microsoft/insightsCombinedClient/models.js";
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Description of a service diagnostic setting */
export interface ServiceDiagnosticsSettingsApiServiceDiagnosticSettingsResource extends ExtensionResource {
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
  metrics?: MicrosoftInsightsCombinedClientMetricSettings[];
  /** the list of logs settings. */
  logs?: ServiceDiagnosticsSettingsApiLogSettings[];
  /** The workspace ID (resource ID of a Log Analytics workspace) for a Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2 */
  workspaceId?: string;
}

export function serviceDiagnosticsSettingsApiServiceDiagnosticSettingsResourceSerializer(
  item: ServiceDiagnosticsSettingsApiServiceDiagnosticSettingsResource,
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

export function serviceDiagnosticsSettingsApiServiceDiagnosticSettingsResourceDeserializer(
  item: any,
): ServiceDiagnosticsSettingsApiServiceDiagnosticSettingsResource {
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
export interface ServiceDiagnosticsSettingsApiServiceDiagnosticSettings {
  /** The resource ID of the storage account to which you would like to send Diagnostic Logs. */
  storageAccountId?: string;
  /** The service bus rule ID of the service bus namespace in which you would like to have Event Hubs created for streaming Diagnostic Logs. The rule ID is of the format: '{service bus resource ID}/authorizationrules/{key name}'. */
  serviceBusRuleId?: string;
  /** The resource Id for the event hub namespace authorization rule. */
  eventHubAuthorizationRuleId?: string;
  /** the list of metric settings. */
  metrics?: MicrosoftInsightsCombinedClientMetricSettings[];
  /** the list of logs settings. */
  logs?: ServiceDiagnosticsSettingsApiLogSettings[];
  /** The workspace ID (resource ID of a Log Analytics workspace) for a Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2 */
  workspaceId?: string;
}

export function serviceDiagnosticsSettingsApiServiceDiagnosticSettingsSerializer(
  item: ServiceDiagnosticsSettingsApiServiceDiagnosticSettings,
): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : microsoftInsightsCombinedClientMetricSettingsArraySerializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : serviceDiagnosticsSettingsApiLogSettingsArraySerializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}

export function serviceDiagnosticsSettingsApiServiceDiagnosticSettingsDeserializer(
  item: any,
): ServiceDiagnosticsSettingsApiServiceDiagnosticSettings {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : microsoftInsightsCombinedClientMetricSettingsArrayDeserializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : serviceDiagnosticsSettingsApiLogSettingsArrayDeserializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}

export function serviceDiagnosticsSettingsApiLogSettingsArraySerializer(
  result: Array<ServiceDiagnosticsSettingsApiLogSettings>,
): any[] {
  return result.map((item) => {
    return serviceDiagnosticsSettingsApiLogSettingsSerializer(item);
  });
}

export function serviceDiagnosticsSettingsApiLogSettingsArrayDeserializer(
  result: Array<ServiceDiagnosticsSettingsApiLogSettings>,
): any[] {
  return result.map((item) => {
    return serviceDiagnosticsSettingsApiLogSettingsDeserializer(item);
  });
}

/** Part of MultiTenantDiagnosticSettings. Specifies the settings for a particular log. */
export interface ServiceDiagnosticsSettingsApiLogSettings {
  /** Name of a Diagnostic Log category for a resource type this setting is applied to. To obtain the list of Diagnostic Log categories for a resource, first perform a GET diagnostic settings operation. */
  category?: string;
  /** a value indicating whether this log is enabled. */
  enabled: boolean;
  /** the retention policy for this log. */
  retentionPolicy?: MicrosoftCommonRetentionPolicy;
}

export function serviceDiagnosticsSettingsApiLogSettingsSerializer(
  item: ServiceDiagnosticsSettingsApiLogSettings,
): any {
  return {
    category: item["category"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : microsoftCommonRetentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function serviceDiagnosticsSettingsApiLogSettingsDeserializer(
  item: any,
): ServiceDiagnosticsSettingsApiLogSettings {
  return {
    category: item["category"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : microsoftCommonRetentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

/** Service diagnostic setting resource for patch operations */
export interface ServiceDiagnosticsSettingsApiServiceDiagnosticSettingsResourcePatch {
  /** Resource tags */
  tags?: Record<string, string>;
  /** The resource ID of the storage account to which you would like to send Diagnostic Logs. */
  storageAccountId?: string;
  /** The service bus rule ID of the service bus namespace in which you would like to have Event Hubs created for streaming Diagnostic Logs. The rule ID is of the format: '{service bus resource ID}/authorizationrules/{key name}'. */
  serviceBusRuleId?: string;
  /** The resource Id for the event hub namespace authorization rule. */
  eventHubAuthorizationRuleId?: string;
  /** the list of metric settings. */
  metrics?: MicrosoftInsightsCombinedClientMetricSettings[];
  /** the list of logs settings. */
  logs?: ServiceDiagnosticsSettingsApiLogSettings[];
  /** The workspace ID (resource ID of a Log Analytics workspace) for a Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2 */
  workspaceId?: string;
}

export function serviceDiagnosticsSettingsApiServiceDiagnosticSettingsResourcePatchSerializer(
  item: ServiceDiagnosticsSettingsApiServiceDiagnosticSettingsResourcePatch,
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
  item: ServiceDiagnosticsSettingsApiServiceDiagnosticSettingsResource,
): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : microsoftInsightsCombinedClientMetricSettingsArraySerializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : serviceDiagnosticsSettingsApiLogSettingsArraySerializer(item["logs"]),
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
      : microsoftInsightsCombinedClientMetricSettingsArrayDeserializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : serviceDiagnosticsSettingsApiLogSettingsArrayDeserializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}

export function _serviceDiagnosticSettingsResourcePatchPropertiesSerializer(
  item: ServiceDiagnosticsSettingsApiServiceDiagnosticSettingsResourcePatch,
): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : microsoftInsightsCombinedClientMetricSettingsArraySerializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : serviceDiagnosticsSettingsApiLogSettingsArraySerializer(item["logs"]),
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
      : microsoftInsightsCombinedClientMetricSettingsArrayDeserializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : serviceDiagnosticsSettingsApiLogSettingsArrayDeserializer(item["logs"]),
    workspaceId: item["workspaceId"],
  };
}
