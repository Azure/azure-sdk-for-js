// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { MicrosoftCommonRetentionPolicy } from "../microsoft/common/models.js";
import {
  microsoftCommonRetentionPolicySerializer,
  microsoftCommonRetentionPolicyDeserializer,
} from "../microsoft/common/models.js";
import type { ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The diagnostic setting resource. */
export interface DiagnosticsSettingsDiagnosticSettingsResource extends ExtensionResource {
  /** The resource ID of the storage account to which you would like to send Diagnostic Logs. */
  storageAccountId?: string;
  /** The service bus rule Id of the diagnostic setting. This is here to maintain backwards compatibility. */
  serviceBusRuleId?: string;
  /** The resource Id for the event hub authorization rule. */
  eventHubAuthorizationRuleId?: string;
  /** The name of the event hub. If none is specified, the default event hub will be selected. */
  eventHubName?: string;
  /** The list of metric settings. */
  metrics?: DiagnosticsSettingsMetricSettings[];
  /** The list of logs settings. */
  logs?: DiagnosticsSettingsLogSettings[];
  /** The full ARM resource ID of the Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2 */
  workspaceId?: string;
  /** The full ARM resource ID of the Marketplace resource to which you would like to send Diagnostic Logs. */
  marketplacePartnerId?: string;
  /** A string indicating whether the export to Log Analytics should use the default destination type, i.e. AzureDiagnostics, or use a destination type constructed as follows: <normalized service identity>_<normalized category name>. Possible values are: Dedicated and null (null is default.) */
  logAnalyticsDestinationType?: string;
}

export function diagnosticsSettingsDiagnosticSettingsResourceSerializer(
  item: DiagnosticsSettingsDiagnosticSettingsResource,
): any {
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

export function diagnosticsSettingsDiagnosticSettingsResourceDeserializer(
  item: any,
): DiagnosticsSettingsDiagnosticSettingsResource {
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
export interface DiagnosticsSettingsDiagnosticSettings {
  /** The resource ID of the storage account to which you would like to send Diagnostic Logs. */
  storageAccountId?: string;
  /** The service bus rule Id of the diagnostic setting. This is here to maintain backwards compatibility. */
  serviceBusRuleId?: string;
  /** The resource Id for the event hub authorization rule. */
  eventHubAuthorizationRuleId?: string;
  /** The name of the event hub. If none is specified, the default event hub will be selected. */
  eventHubName?: string;
  /** The list of metric settings. */
  metrics?: DiagnosticsSettingsMetricSettings[];
  /** The list of logs settings. */
  logs?: DiagnosticsSettingsLogSettings[];
  /** The full ARM resource ID of the Log Analytics workspace to which you would like to send Diagnostic Logs. Example: /subscriptions/4b9e8510-67ab-4e9a-95a9-e2f1e570ea9c/resourceGroups/insights-integration/providers/Microsoft.OperationalInsights/workspaces/viruela2 */
  workspaceId?: string;
  /** The full ARM resource ID of the Marketplace resource to which you would like to send Diagnostic Logs. */
  marketplacePartnerId?: string;
  /** A string indicating whether the export to Log Analytics should use the default destination type, i.e. AzureDiagnostics, or use a destination type constructed as follows: <normalized service identity>_<normalized category name>. Possible values are: Dedicated and null (null is default.) */
  logAnalyticsDestinationType?: string;
}

export function diagnosticsSettingsDiagnosticSettingsSerializer(
  item: DiagnosticsSettingsDiagnosticSettings,
): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    eventHubName: item["eventHubName"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : diagnosticsSettingsMetricSettingsArraySerializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : diagnosticsSettingsLogSettingsArraySerializer(item["logs"]),
    workspaceId: item["workspaceId"],
    marketplacePartnerId: item["marketplacePartnerId"],
    logAnalyticsDestinationType: item["logAnalyticsDestinationType"],
  };
}

export function diagnosticsSettingsDiagnosticSettingsDeserializer(
  item: any,
): DiagnosticsSettingsDiagnosticSettings {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    eventHubName: item["eventHubName"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : diagnosticsSettingsMetricSettingsArrayDeserializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : diagnosticsSettingsLogSettingsArrayDeserializer(item["logs"]),
    workspaceId: item["workspaceId"],
    marketplacePartnerId: item["marketplacePartnerId"],
    logAnalyticsDestinationType: item["logAnalyticsDestinationType"],
  };
}

export function diagnosticsSettingsMetricSettingsArraySerializer(
  result: Array<DiagnosticsSettingsMetricSettings>,
): any[] {
  return result.map((item) => {
    return diagnosticsSettingsMetricSettingsSerializer(item);
  });
}

export function diagnosticsSettingsMetricSettingsArrayDeserializer(
  result: Array<DiagnosticsSettingsMetricSettings>,
): any[] {
  return result.map((item) => {
    return diagnosticsSettingsMetricSettingsDeserializer(item);
  });
}

/** Part of MultiTenantDiagnosticSettings. Specifies the settings for a particular metric. */
export interface DiagnosticsSettingsMetricSettings {
  /** the timegrain of the metric in ISO8601 format. */
  timeGrain?: string;
  /** Name of a Diagnostic Metric category for a resource type this setting is applied to. To obtain the list of Diagnostic metric categories for a resource, first perform a GET diagnostic settings operation. */
  category?: string;
  /** a value indicating whether this category is enabled. */
  enabled: boolean;
  /** the retention policy for this category. */
  retentionPolicy?: MicrosoftCommonRetentionPolicy;
}

export function diagnosticsSettingsMetricSettingsSerializer(
  item: DiagnosticsSettingsMetricSettings,
): any {
  return {
    timeGrain: item["timeGrain"],
    category: item["category"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : microsoftCommonRetentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function diagnosticsSettingsMetricSettingsDeserializer(
  item: any,
): DiagnosticsSettingsMetricSettings {
  return {
    timeGrain: item["timeGrain"],
    category: item["category"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : microsoftCommonRetentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

export function diagnosticsSettingsLogSettingsArraySerializer(
  result: Array<DiagnosticsSettingsLogSettings>,
): any[] {
  return result.map((item) => {
    return diagnosticsSettingsLogSettingsSerializer(item);
  });
}

export function diagnosticsSettingsLogSettingsArrayDeserializer(
  result: Array<DiagnosticsSettingsLogSettings>,
): any[] {
  return result.map((item) => {
    return diagnosticsSettingsLogSettingsDeserializer(item);
  });
}

/** Part of MultiTenantDiagnosticSettings. Specifies the settings for a particular log. */
export interface DiagnosticsSettingsLogSettings {
  /** Name of a Diagnostic Log category for a resource type this setting is applied to. To obtain the list of Diagnostic Log categories for a resource, first perform a GET diagnostic settings operation. */
  category?: string;
  /** Name of a Diagnostic Log category group for a resource type this setting is applied to. To obtain the list of Diagnostic Log categories for a resource, first perform a GET diagnostic settings operation. */
  categoryGroup?: string;
  /** a value indicating whether this log is enabled. */
  enabled: boolean;
  /** the retention policy for this log. */
  retentionPolicy?: MicrosoftCommonRetentionPolicy;
}

export function diagnosticsSettingsLogSettingsSerializer(
  item: DiagnosticsSettingsLogSettings,
): any {
  return {
    category: item["category"],
    categoryGroup: item["categoryGroup"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : microsoftCommonRetentionPolicySerializer(item["retentionPolicy"]),
  };
}

export function diagnosticsSettingsLogSettingsDeserializer(
  item: any,
): DiagnosticsSettingsLogSettings {
  return {
    category: item["category"],
    categoryGroup: item["categoryGroup"],
    enabled: item["enabled"],
    retentionPolicy: !item["retentionPolicy"]
      ? item["retentionPolicy"]
      : microsoftCommonRetentionPolicyDeserializer(item["retentionPolicy"]),
  };
}

/** Represents a collection of alert rule resources. */
export interface _DiagnosticsSettingsDiagnosticSettingsResourceCollection {
  /** The collection of diagnostic settings resources;. */
  value?: DiagnosticsSettingsDiagnosticSettingsResource[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _diagnosticsSettingsDiagnosticSettingsResourceCollectionDeserializer(
  item: any,
): _DiagnosticsSettingsDiagnosticSettingsResourceCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : diagnosticsSettingsDiagnosticSettingsResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function diagnosticsSettingsDiagnosticSettingsResourceArraySerializer(
  result: Array<DiagnosticsSettingsDiagnosticSettingsResource>,
): any[] {
  return result.map((item) => {
    return diagnosticsSettingsDiagnosticSettingsResourceSerializer(item);
  });
}

export function diagnosticsSettingsDiagnosticSettingsResourceArrayDeserializer(
  result: Array<DiagnosticsSettingsDiagnosticSettingsResource>,
): any[] {
  return result.map((item) => {
    return diagnosticsSettingsDiagnosticSettingsResourceDeserializer(item);
  });
}

/** The diagnostic settings category resource. */
export interface DiagnosticsSettingsDiagnosticSettingsCategoryResource extends ExtensionResource {
  /** The type of the diagnostic settings category. */
  categoryType?: DiagnosticsSettingsCategoryType;
  /** the collection of what category groups are supported. */
  categoryGroups?: string[];
}

export function diagnosticsSettingsDiagnosticSettingsCategoryResourceDeserializer(
  item: any,
): DiagnosticsSettingsDiagnosticSettingsCategoryResource {
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
export interface DiagnosticsSettingsDiagnosticSettingsCategory {
  /** The type of the diagnostic settings category. */
  categoryType?: DiagnosticsSettingsCategoryType;
  /** the collection of what category groups are supported. */
  categoryGroups?: string[];
}

export function diagnosticsSettingsDiagnosticSettingsCategoryDeserializer(
  item: any,
): DiagnosticsSettingsDiagnosticSettingsCategory {
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
export enum KnownDiagnosticsSettingsCategoryType {
  /** Metrics */
  Metrics = "Metrics",
  /** Logs */
  Logs = "Logs",
}

/**
 * The type of the diagnostic settings category. \
 * {@link KnownDiagnosticsSettingsCategoryType} can be used interchangeably with DiagnosticsSettingsCategoryType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Metrics**: Metrics \
 * **Logs**: Logs
 */
export type DiagnosticsSettingsCategoryType = string;

/** Represents a collection of diagnostic setting category resources. */
export interface _DiagnosticsSettingsDiagnosticSettingsCategoryResourceCollection {
  /** The collection of diagnostic settings category resources. */
  value?: DiagnosticsSettingsDiagnosticSettingsCategoryResource[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _diagnosticsSettingsDiagnosticSettingsCategoryResourceCollectionDeserializer(
  item: any,
): _DiagnosticsSettingsDiagnosticSettingsCategoryResourceCollection {
  return {
    value: !item["value"]
      ? item["value"]
      : diagnosticsSettingsDiagnosticSettingsCategoryResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function diagnosticsSettingsDiagnosticSettingsCategoryResourceArrayDeserializer(
  result: Array<DiagnosticsSettingsDiagnosticSettingsCategoryResource>,
): any[] {
  return result.map((item) => {
    return diagnosticsSettingsDiagnosticSettingsCategoryResourceDeserializer(item);
  });
}

export function _diagnosticSettingsResourcePropertiesSerializer(
  item: DiagnosticsSettingsDiagnosticSettingsResource,
): any {
  return {
    storageAccountId: item["storageAccountId"],
    serviceBusRuleId: item["serviceBusRuleId"],
    eventHubAuthorizationRuleId: item["eventHubAuthorizationRuleId"],
    eventHubName: item["eventHubName"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : diagnosticsSettingsMetricSettingsArraySerializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : diagnosticsSettingsLogSettingsArraySerializer(item["logs"]),
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
      : diagnosticsSettingsMetricSettingsArrayDeserializer(item["metrics"]),
    logs: !item["logs"]
      ? item["logs"]
      : diagnosticsSettingsLogSettingsArrayDeserializer(item["logs"]),
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
