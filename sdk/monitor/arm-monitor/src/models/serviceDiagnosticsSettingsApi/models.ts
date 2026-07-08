// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { MetricSettings, LogSettings } from "../diagnosticsSettings/models.js";
import {
  metricSettingsArraySerializer,
  metricSettingsArrayDeserializer,
  logSettingsArraySerializer,
  logSettingsArrayDeserializer,
} from "../diagnosticsSettings/models.js";
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

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
