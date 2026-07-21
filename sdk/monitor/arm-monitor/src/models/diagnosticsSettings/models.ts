// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { RetentionPolicy } from "../microsoft/common/models.js";
import {
  retentionPolicySerializer,
  retentionPolicyDeserializer,
} from "../microsoft/common/models.js";
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  timeGrain?: string;
  /** Name of a Diagnostic Metric category for a resource type this setting is applied to. To obtain the list of Diagnostic metric categories for a resource, first perform a GET diagnostic settings operation. */
  category?: string;
  /** a value indicating whether this category is enabled. */
  enabled: boolean;
  /** the retention policy for this category. */
  retentionPolicy?: RetentionPolicy;
}

export function metricSettingsSerializer(item: MetricSettings): any {
  return {
    timeGrain: item["timeGrain"],
    category: item["category"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function metricSettingsDeserializer(item: any): MetricSettings {
  return {
    timeGrain: item["timeGrain"],
    category: item["category"],
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
  /** Name of a Diagnostic Log category group for a resource type this setting is applied to. To obtain the list of Diagnostic Log categories for a resource, first perform a GET diagnostic settings operation. */
  categoryGroup?: string;
  /** a value indicating whether this log is enabled. */
  enabled: boolean;
  /** the retention policy for this log. */
  retentionPolicy?: RetentionPolicy;
}

export function logSettingsSerializer(item: LogSettings): any {
  return {
    category: item["category"],
    categoryGroup: item["categoryGroup"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function logSettingsDeserializer(item: any): LogSettings {
  return {
    category: item["category"],
    categoryGroup: item["categoryGroup"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : retentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

/** The diagnostic setting resource. */
export interface DiagnosticSettingsResource extends ExtensionResource {
  /** The resource ID of the storage account to which you would like to send Diagnostic Logs. */
  storageAccountId?: string;
  /** The service bus rule Id of the diagnostic setting. This is here to maintain backwards compatibility. */
  serviceBusRuleId?: string;
  /** The resource Id for the event hub authorization rule. */
  eventHubAuthorizationRuleId?: string;
  /** The name of the event hub. If none is specified, the default event hub will be selected. */
  eventHubName?: string;
  /** The list of metric settings. */
  metrics?: MetricSettings[];
  /** The list of logs settings. */
  logs?: LogSettings[];
  /** The full ARM resource ID of the Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2 */
  workspaceId?: string;
  /** The full ARM resource ID of the Marketplace resource to which you would like to send Diagnostic Logs. */
  marketplacePartnerId?: string;
  /** A string indicating whether the export to Log Analytics should use the default destination type, i.e. AzureDiagnostics, or use a destination type constructed as follows: <normalized service identity>_<normalized category name>. Possible values are: Dedicated and null (null is default.) */
  logAnalyticsDestinationType?: string;
}

export function diagnosticSettingsResourceSerializer(item: DiagnosticSettingsResource): any {
  return {
    properties: areAllPropsUndefined(item, [
      "storageAccountId",
      "serviceBusRuleId",
      "eventHubAuthorizationRuleId",
      "eventHubName",
      "metrics",
      "logs",
      "workspaceId",
      "marketplacePartnerId",
      "logAnalyticsDestinationType",
    ])
      ? undefined
      : _diagnosticSettingsResourcePropertiesSerializer(item),
  };
}

export function diagnosticSettingsResourceDeserializer(item: any): DiagnosticSettingsResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _diagnosticSettingsResourcePropertiesDeserializer(item["properties"])),
  };
}

/** The diagnostic settings. */
export interface DiagnosticSettings {
  /** The resource ID of the storage account to which you would like to send Diagnostic Logs. */
  storageAccountId?: string;
  /** The service bus rule Id of the diagnostic setting. This is here to maintain backwards compatibility. */
  serviceBusRuleId?: string;
  /** The resource Id for the event hub authorization rule. */
  eventHubAuthorizationRuleId?: string;
  /** The name of the event hub. If none is specified, the default event hub will be selected. */
  eventHubName?: string;
  /** The list of metric settings. */
  metrics?: MetricSettings[];
  /** The list of logs settings. */
  logs?: LogSettings[];
  /** The full ARM resource ID of the Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2 */
  workspaceId?: string;
  /** The full ARM resource ID of the Marketplace resource to which you would like to send Diagnostic Logs. */
  marketplacePartnerId?: string;
  /** A string indicating whether the export to Log Analytics should use the default destination type, i.e. AzureDiagnostics, or use a destination type constructed as follows: <normalized service identity>_<normalized category name>. Possible values are: Dedicated and null (null is default.) */
  logAnalyticsDestinationType?: string;
}

export function diagnosticSettingsSerializer(item: DiagnosticSettings): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    eventHubName: item["eventHubName"],
    metrics: !item["metrics"] ? item["metrics"] : metricSettingsArraySerializer_1(item["metrics"]),
    logs: !item["logs"] ? item["logs"] : logSettingsArraySerializer_1(item["logs"]),
    workspaceId: item["workspaceId"],
    marketplacePartnerId: item["marketplacePartnerId"],
    logAnalyticsDestinationType: item["logAnalyticsDestinationType"],
  };
}

export function diagnosticSettingsDeserializer(item: any): DiagnosticSettings {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    eventHubName: item["eventHubName"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : metricSettingsArrayDeserializer_1(item["metrics"]),
    logs: !item["logs"] ? item["logs"] : logSettingsArrayDeserializer_1(item["logs"]),
    workspaceId: item["workspaceId"],
    marketplacePartnerId: item["marketplacePartnerId"],
    logAnalyticsDestinationType: item["logAnalyticsDestinationType"],
  };
}

export function metricSettingsArraySerializer_1(result: Array<MetricSettings>): any[] {
  return result.map((item) => {
    return metricSettingsSerializer(item);
  });
}

export function metricSettingsArrayDeserializer_1(result: Array<MetricSettings>): any[] {
  return result.map((item) => {
    return metricSettingsDeserializer(item);
  });
}

export function logSettingsArraySerializer_1(result: Array<LogSettings>): any[] {
  return result.map((item) => {
    return logSettingsSerializer(item);
  });
}

export function logSettingsArrayDeserializer_1(result: Array<LogSettings>): any[] {
  return result.map((item) => {
    return logSettingsDeserializer(item);
  });
}

/** Represents a collection of alert rule resources. */
export interface _DiagnosticSettingsResourceCollection {
  /** The collection of diagnostic settings resources;. */
  value?: DiagnosticSettingsResource[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _diagnosticSettingsResourceCollectionDeserializer(
  item: any,
): _DiagnosticSettingsResourceCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : diagnosticSettingsResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function diagnosticSettingsResourceArraySerializer(
  result: Array<DiagnosticSettingsResource>,
): any[] {
  return result.map((item) => {
    return diagnosticSettingsResourceSerializer(item);
  });
}

export function diagnosticSettingsResourceArrayDeserializer(
  result: Array<DiagnosticSettingsResource>,
): any[] {
  return result.map((item) => {
    return diagnosticSettingsResourceDeserializer(item);
  });
}

/** The diagnostic settings category resource. */
export interface DiagnosticSettingsCategoryResource extends ExtensionResource {
  /** The type of the diagnostic settings category. */
  categoryType?: CategoryType;
  /** the collection of what category groups are supported. */
  categoryGroups?: string[];
}

export function diagnosticSettingsCategoryResourceDeserializer(
  item: any,
): DiagnosticSettingsCategoryResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _diagnosticSettingsCategoryResourcePropertiesDeserializer(item["properties"])),
  };
}

/** The diagnostic settings Category. */
export interface DiagnosticSettingsCategory {
  /** The type of the diagnostic settings category. */
  categoryType?: CategoryType;
  /** the collection of what category groups are supported. */
  categoryGroups?: string[];
}

export function diagnosticSettingsCategoryDeserializer(item: any): DiagnosticSettingsCategory {
  return {
    categoryType: item["categoryType"],
    categoryGroups: !item["categoryGroups"]
      ? item["categoryGroups"]
      : item["categoryGroups"].map((p: any) => {
          return p;
        }),
  };
}

/** The type of the diagnostic settings category. */
export enum KnownCategoryType {
  /** Metrics */
  Metrics = "Metrics",
  /** Logs */
  Logs = "Logs",
}

/**
 * The type of the diagnostic settings category. \
 * {@link KnownCategoryType} can be used interchangeably with CategoryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Metrics**: Metrics \
 * **Logs**: Logs
 */
export type CategoryType = string;

/** Represents a collection of diagnostic setting category resources. */
export interface _DiagnosticSettingsCategoryResourceCollection {
  /** The collection of diagnostic settings category resources. */
  value?: DiagnosticSettingsCategoryResource[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _diagnosticSettingsCategoryResourceCollectionDeserializer(
  item: any,
): _DiagnosticSettingsCategoryResourceCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : diagnosticSettingsCategoryResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function diagnosticSettingsCategoryResourceArrayDeserializer(
  result: Array<DiagnosticSettingsCategoryResource>,
): any[] {
  return result.map((item) => {
    return diagnosticSettingsCategoryResourceDeserializer(item);
  });
}

export function _diagnosticSettingsResourcePropertiesSerializer(
  item: DiagnosticSettingsResource,
): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    eventHubName: item["eventHubName"],
    metrics: !item["metrics"] ? item["metrics"] : metricSettingsArraySerializer_1(item["metrics"]),
    logs: !item["logs"] ? item["logs"] : logSettingsArraySerializer_1(item["logs"]),
    workspaceId: item["workspaceId"],
    marketplacePartnerId: item["marketplacePartnerId"],
    logAnalyticsDestinationType: item["logAnalyticsDestinationType"],
  };
}

export function _diagnosticSettingsResourcePropertiesDeserializer(item: any) {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    eventHubName: item["eventHubName"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : metricSettingsArrayDeserializer_1(item["metrics"]),
    logs: !item["logs"] ? item["logs"] : logSettingsArrayDeserializer_1(item["logs"]),
    workspaceId: item["workspaceId"],
    marketplacePartnerId: item["marketplacePartnerId"],
    logAnalyticsDestinationType: item["logAnalyticsDestinationType"],
  };
}

export function _diagnosticSettingsCategoryResourcePropertiesDeserializer(item: any) {
  return {
    categoryType: item["categoryType"],
    categoryGroups: !item["categoryGroups"]
      ? item["categoryGroups"]
      : item["categoryGroups"].map((p: any) => {
          return p;
        }),
  };
}
