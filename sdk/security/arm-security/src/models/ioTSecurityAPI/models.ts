// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { ProxyResource, ExtensionResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The device security group resource */
export interface IoTSecurityAPIDeviceSecurityGroup extends ExtensionResource {
  /** The list of custom alert threshold rules. */
  thresholdRules?: IoTSecurityAPIThresholdCustomAlertRule[];
  /** The list of custom alert time-window rules. */
  timeWindowRules?: IoTSecurityAPITimeWindowCustomAlertRule[];
  /** The allow-list custom alert rules. */
  allowlistRules?: IoTSecurityAPIAllowlistCustomAlertRule[];
  /** The deny-list custom alert rules. */
  denylistRules?: IoTSecurityAPIDenylistCustomAlertRule[];
}

export function ioTSecurityAPIDeviceSecurityGroupSerializer(
  item: IoTSecurityAPIDeviceSecurityGroup,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "thresholdRules",
      "timeWindowRules",
      "allowlistRules",
      "denylistRules",
    ])
      ? undefined
      : _deviceSecurityGroupPropertiesSerializer(item),
  };
}

export function ioTSecurityAPIDeviceSecurityGroupDeserializer(
  item: any,
): IoTSecurityAPIDeviceSecurityGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _deviceSecurityGroupPropertiesDeserializer(item["properties"])),
  };
}

/** describes properties of a security group. */
export interface IoTSecurityAPIDeviceSecurityGroupProperties {
  /** The list of custom alert threshold rules. */
  thresholdRules?: IoTSecurityAPIThresholdCustomAlertRule[];
  /** The list of custom alert time-window rules. */
  timeWindowRules?: IoTSecurityAPITimeWindowCustomAlertRule[];
  /** The allow-list custom alert rules. */
  allowlistRules?: IoTSecurityAPIAllowlistCustomAlertRule[];
  /** The deny-list custom alert rules. */
  denylistRules?: IoTSecurityAPIDenylistCustomAlertRule[];
}

export function ioTSecurityAPIDeviceSecurityGroupPropertiesSerializer(
  item: IoTSecurityAPIDeviceSecurityGroupProperties,
): any {
  return {
    thresholdRules: !item["thresholdRules"]
      ? item["thresholdRules"]
      : ioTSecurityAPIThresholdCustomAlertRuleArraySerializer(item["thresholdRules"]),
    timeWindowRules: !item["timeWindowRules"]
      ? item["timeWindowRules"]
      : ioTSecurityAPITimeWindowCustomAlertRuleArraySerializer(item["timeWindowRules"]),
    allowlistRules: !item["allowlistRules"]
      ? item["allowlistRules"]
      : ioTSecurityAPIAllowlistCustomAlertRuleArraySerializer(item["allowlistRules"]),
    denylistRules: !item["denylistRules"]
      ? item["denylistRules"]
      : ioTSecurityAPIDenylistCustomAlertRuleArraySerializer(item["denylistRules"]),
  };
}

export function ioTSecurityAPIDeviceSecurityGroupPropertiesDeserializer(
  item: any,
): IoTSecurityAPIDeviceSecurityGroupProperties {
  return {
    thresholdRules: !item["thresholdRules"]
      ? item["thresholdRules"]
      : ioTSecurityAPIThresholdCustomAlertRuleArrayDeserializer(item["thresholdRules"]),
    timeWindowRules: !item["timeWindowRules"]
      ? item["timeWindowRules"]
      : ioTSecurityAPITimeWindowCustomAlertRuleArrayDeserializer(item["timeWindowRules"]),
    allowlistRules: !item["allowlistRules"]
      ? item["allowlistRules"]
      : ioTSecurityAPIAllowlistCustomAlertRuleArrayDeserializer(item["allowlistRules"]),
    denylistRules: !item["denylistRules"]
      ? item["denylistRules"]
      : ioTSecurityAPIDenylistCustomAlertRuleArrayDeserializer(item["denylistRules"]),
  };
}

export function ioTSecurityAPIThresholdCustomAlertRuleArraySerializer(
  result: Array<IoTSecurityAPIThresholdCustomAlertRule>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIThresholdCustomAlertRuleSerializer(item);
  });
}

export function ioTSecurityAPIThresholdCustomAlertRuleArrayDeserializer(
  result: Array<IoTSecurityAPIThresholdCustomAlertRule>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIThresholdCustomAlertRuleDeserializer(item);
  });
}

/** A custom alert rule that checks if a value (depends on the custom alert type) is within the given range. */
export interface IoTSecurityAPIThresholdCustomAlertRule extends IoTSecurityAPICustomAlertRule {
  /** The minimum threshold. */
  minThreshold: number;
  /** The maximum threshold. */
  maxThreshold: number;
  ruleType: "ThresholdCustomAlertRule";
}

export function ioTSecurityAPIThresholdCustomAlertRuleSerializer(
  item: IoTSecurityAPIThresholdCustomAlertRule,
): any {
  return {
    isEnabled: item["isEnabled"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
  };
}

export function ioTSecurityAPIThresholdCustomAlertRuleDeserializer(
  item: any,
): IoTSecurityAPIThresholdCustomAlertRule {
  return {
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
  };
}

export function ioTSecurityAPITimeWindowCustomAlertRuleArraySerializer(
  result: Array<IoTSecurityAPITimeWindowCustomAlertRule>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPITimeWindowCustomAlertRuleSerializer(item);
  });
}

export function ioTSecurityAPITimeWindowCustomAlertRuleArrayDeserializer(
  result: Array<IoTSecurityAPITimeWindowCustomAlertRule>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPITimeWindowCustomAlertRuleDeserializer(item);
  });
}

/** A custom alert rule that checks if the number of activities (depends on the custom alert type) in a time window is within the given range. */
export interface IoTSecurityAPITimeWindowCustomAlertRule extends IoTSecurityAPICustomAlertRule {
  /** The minimum threshold. */
  minThreshold: number;
  /** The maximum threshold. */
  maxThreshold: number;
  /** The time window size in iso8601 format. */
  timeWindowSize: string;
  ruleType: "TimeWindowCustomAlertRule";
}

export function ioTSecurityAPITimeWindowCustomAlertRuleSerializer(
  item: IoTSecurityAPITimeWindowCustomAlertRule,
): any {
  return {
    isEnabled: item["isEnabled"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    timeWindowSize: item["timeWindowSize"],
  };
}

export function ioTSecurityAPITimeWindowCustomAlertRuleDeserializer(
  item: any,
): IoTSecurityAPITimeWindowCustomAlertRule {
  return {
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    timeWindowSize: item["timeWindowSize"],
  };
}

export function ioTSecurityAPIAllowlistCustomAlertRuleArraySerializer(
  result: Array<IoTSecurityAPIAllowlistCustomAlertRule>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIAllowlistCustomAlertRuleSerializer(item);
  });
}

export function ioTSecurityAPIAllowlistCustomAlertRuleArrayDeserializer(
  result: Array<IoTSecurityAPIAllowlistCustomAlertRule>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIAllowlistCustomAlertRuleDeserializer(item);
  });
}

/** A custom alert rule that checks if a value (depends on the custom alert type) is allowed. */
export interface IoTSecurityAPIAllowlistCustomAlertRule extends IoTSecurityAPIListCustomAlertRule {
  /** The values to allow. The format of the values depends on the rule type. */
  allowlistValues: string[];
  ruleType: "AllowlistCustomAlertRule";
}

export function ioTSecurityAPIAllowlistCustomAlertRuleSerializer(
  item: IoTSecurityAPIAllowlistCustomAlertRule,
): any {
  return {
    ruleType: item["ruleType"],
    isEnabled: item["isEnabled"],
    allowlistValues: item["allowlistValues"].map((p: any) => {
      return p;
    }),
  };
}

export function ioTSecurityAPIAllowlistCustomAlertRuleDeserializer(
  item: any,
): IoTSecurityAPIAllowlistCustomAlertRule {
  return {
    valueType: item["valueType"],
    ruleType: item["ruleType"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
    allowlistValues: item["allowlistValues"].map((p: any) => {
      return p;
    }),
  };
}

export function ioTSecurityAPIDenylistCustomAlertRuleArraySerializer(
  result: Array<IoTSecurityAPIDenylistCustomAlertRule>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIDenylistCustomAlertRuleSerializer(item);
  });
}

export function ioTSecurityAPIDenylistCustomAlertRuleArrayDeserializer(
  result: Array<IoTSecurityAPIDenylistCustomAlertRule>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIDenylistCustomAlertRuleDeserializer(item);
  });
}

/** A custom alert rule that checks if a value (depends on the custom alert type) is denied. */
export interface IoTSecurityAPIDenylistCustomAlertRule extends IoTSecurityAPIListCustomAlertRule {
  /** The values to deny. The format of the values depends on the rule type. */
  denylistValues: string[];
  ruleType: "DenylistCustomAlertRule";
}

export function ioTSecurityAPIDenylistCustomAlertRuleSerializer(
  item: IoTSecurityAPIDenylistCustomAlertRule,
): any {
  return {
    ruleType: item["ruleType"],
    isEnabled: item["isEnabled"],
    denylistValues: item["denylistValues"].map((p: any) => {
      return p;
    }),
  };
}

export function ioTSecurityAPIDenylistCustomAlertRuleDeserializer(
  item: any,
): IoTSecurityAPIDenylistCustomAlertRule {
  return {
    valueType: item["valueType"],
    ruleType: item["ruleType"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
    denylistValues: item["denylistValues"].map((p: any) => {
      return p;
    }),
  };
}

/** A custom alert rule. */
export interface IoTSecurityAPICustomAlertRule {
  /** The display name of the custom alert. */
  readonly displayName?: string;
  /** The description of the custom alert. */
  readonly description?: string;
  /** Status of the custom alert. */
  isEnabled: boolean;
  /** The type of the custom alert rule. */
  /** The discriminator possible values: ThresholdCustomAlertRule, TimeWindowCustomAlertRule, AllowlistCustomAlertRule, ListCustomAlertRule, DenylistCustomAlertRule */
  ruleType: string;
}

export function ioTSecurityAPICustomAlertRuleSerializer(item: IoTSecurityAPICustomAlertRule): any {
  return { isEnabled: item["isEnabled"], ruleType: item["ruleType"] };
}

export function ioTSecurityAPICustomAlertRuleDeserializer(
  item: any,
): IoTSecurityAPICustomAlertRule {
  return {
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
    ruleType: item["ruleType"],
  };
}

/** Alias for IoTSecurityAPICustomAlertRuleUnion */
export type IoTSecurityAPICustomAlertRuleUnion =
  | IoTSecurityAPIThresholdCustomAlertRule
  | IoTSecurityAPITimeWindowCustomAlertRule
  | IoTSecurityAPIListCustomAlertRuleUnion
  | IoTSecurityAPICustomAlertRule;

export function ioTSecurityAPICustomAlertRuleUnionSerializer(
  item: IoTSecurityAPICustomAlertRuleUnion,
): any {
  switch (item.ruleType) {
    case "ThresholdCustomAlertRule":
      return ioTSecurityAPIThresholdCustomAlertRuleSerializer(
        item as IoTSecurityAPIThresholdCustomAlertRule,
      );

    case "TimeWindowCustomAlertRule":
      return ioTSecurityAPITimeWindowCustomAlertRuleSerializer(
        item as IoTSecurityAPITimeWindowCustomAlertRule,
      );

    case "ListCustomAlertRule":
    case "AllowlistCustomAlertRule":
    case "DenylistCustomAlertRule":
      return ioTSecurityAPIListCustomAlertRuleUnionSerializer(
        item as IoTSecurityAPIListCustomAlertRuleUnion,
      );

    default:
      return ioTSecurityAPICustomAlertRuleSerializer(item);
  }
}

export function ioTSecurityAPICustomAlertRuleUnionDeserializer(
  item: any,
): IoTSecurityAPICustomAlertRuleUnion {
  switch (item["ruleType"]) {
    case "ThresholdCustomAlertRule":
      return ioTSecurityAPIThresholdCustomAlertRuleDeserializer(
        item as IoTSecurityAPIThresholdCustomAlertRule,
      );

    case "TimeWindowCustomAlertRule":
      return ioTSecurityAPITimeWindowCustomAlertRuleDeserializer(
        item as IoTSecurityAPITimeWindowCustomAlertRule,
      );

    case "ListCustomAlertRule":
    case "AllowlistCustomAlertRule":
    case "DenylistCustomAlertRule":
      return ioTSecurityAPIListCustomAlertRuleUnionDeserializer(
        item as IoTSecurityAPIListCustomAlertRuleUnion,
      );

    default:
      return ioTSecurityAPICustomAlertRuleDeserializer(item);
  }
}

/** A List custom alert rule. */
export interface IoTSecurityAPIListCustomAlertRule extends IoTSecurityAPICustomAlertRule {
  /** The value type of the items in the list. */
  readonly valueType?: IoTSecurityAPIValueType;
  ruleType: "ListCustomAlertRule" | "AllowlistCustomAlertRule" | "DenylistCustomAlertRule";
}

export function ioTSecurityAPIListCustomAlertRuleSerializer(
  item: IoTSecurityAPIListCustomAlertRule,
): any {
  return { isEnabled: item["isEnabled"], ruleType: item["ruleType"] };
}

export function ioTSecurityAPIListCustomAlertRuleDeserializer(
  item: any,
): IoTSecurityAPIListCustomAlertRule {
  return {
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
    ruleType: item["ruleType"],
    valueType: item["valueType"],
  };
}

/** Alias for IoTSecurityAPIListCustomAlertRuleUnion */
export type IoTSecurityAPIListCustomAlertRuleUnion =
  | IoTSecurityAPIAllowlistCustomAlertRule
  | IoTSecurityAPIDenylistCustomAlertRule
  | IoTSecurityAPIListCustomAlertRule;

export function ioTSecurityAPIListCustomAlertRuleUnionSerializer(
  item: IoTSecurityAPIListCustomAlertRuleUnion,
): any {
  switch (item.ruleType) {
    case "AllowlistCustomAlertRule":
      return ioTSecurityAPIAllowlistCustomAlertRuleSerializer(
        item as IoTSecurityAPIAllowlistCustomAlertRule,
      );

    case "DenylistCustomAlertRule":
      return ioTSecurityAPIDenylistCustomAlertRuleSerializer(
        item as IoTSecurityAPIDenylistCustomAlertRule,
      );

    default:
      return ioTSecurityAPIListCustomAlertRuleSerializer(item);
  }
}

export function ioTSecurityAPIListCustomAlertRuleUnionDeserializer(
  item: any,
): IoTSecurityAPIListCustomAlertRuleUnion {
  switch (item["ruleType"]) {
    case "AllowlistCustomAlertRule":
      return ioTSecurityAPIAllowlistCustomAlertRuleDeserializer(
        item as IoTSecurityAPIAllowlistCustomAlertRule,
      );

    case "DenylistCustomAlertRule":
      return ioTSecurityAPIDenylistCustomAlertRuleDeserializer(
        item as IoTSecurityAPIDenylistCustomAlertRule,
      );

    default:
      return ioTSecurityAPIListCustomAlertRuleDeserializer(item);
  }
}

/** The value type of the items in the list. */
export enum KnownIoTSecurityAPIValueType {
  /** An IP range in CIDR format (e.g. '192.168.0.1/8'). */
  IpCidr = "IpCidr",
  /** Any string value. */
  String = "String",
}

/**
 * The value type of the items in the list. \
 * {@link KnownIoTSecurityAPIValueType} can be used interchangeably with IoTSecurityAPIValueType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IpCidr**: An IP range in CIDR format (e.g. '192.168.0.1\/8'). \
 * **String**: Any string value.
 */
export type IoTSecurityAPIValueType = string;

/** List of device security groups */
export interface _IoTSecurityAPIDeviceSecurityGroupList {
  /** List of device security group objects */
  value?: IoTSecurityAPIDeviceSecurityGroup[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _ioTSecurityAPIDeviceSecurityGroupListDeserializer(
  item: any,
): _IoTSecurityAPIDeviceSecurityGroupList {
  return {
    value: !item["value"]
      ? item["value"]
      : ioTSecurityAPIDeviceSecurityGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ioTSecurityAPIDeviceSecurityGroupArraySerializer(
  result: Array<IoTSecurityAPIDeviceSecurityGroup>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIDeviceSecurityGroupSerializer(item);
  });
}

export function ioTSecurityAPIDeviceSecurityGroupArrayDeserializer(
  result: Array<IoTSecurityAPIDeviceSecurityGroup>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIDeviceSecurityGroupDeserializer(item);
  });
}

/** Security analytics of your IoT Security solution */
export interface IoTSecurityAPIIoTSecuritySolutionAnalyticsModel extends ProxyResource {
  /** Security analytics of your IoT Security solution. */
  readonly metrics?: IoTSecurityAPIIoTSeverityMetrics;
  /** Number of unhealthy devices within your IoT Security solution. */
  readonly unhealthyDeviceCount?: number;
  /** List of device metrics by the aggregation date. */
  readonly devicesMetrics?: IoTSecurityAPIIoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItem[];
  /** List of the 3 devices with the most alerts. */
  topAlertedDevices?: IoTSecurityAPIIoTSecurityAlertedDevice[];
  /** List of the 3 most prevalent device alerts. */
  mostPrevalentDeviceAlerts?: IoTSecurityAPIIoTSecurityDeviceAlert[];
  /** List of the 3 most prevalent device recommendations. */
  mostPrevalentDeviceRecommendations?: IoTSecurityAPIIoTSecurityDeviceRecommendation[];
}

export function ioTSecurityAPIIoTSecuritySolutionAnalyticsModelDeserializer(
  item: any,
): IoTSecurityAPIIoTSecuritySolutionAnalyticsModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _ioTSecuritySolutionAnalyticsModelPropertiesDeserializer(item["properties"])),
  };
}

/** Security analytics properties of your IoT Security solution */
export interface IoTSecurityAPIIoTSecuritySolutionAnalyticsModelProperties {
  /** Security analytics of your IoT Security solution. */
  readonly metrics?: IoTSecurityAPIIoTSeverityMetrics;
  /** Number of unhealthy devices within your IoT Security solution. */
  readonly unhealthyDeviceCount?: number;
  /** List of device metrics by the aggregation date. */
  readonly devicesMetrics?: IoTSecurityAPIIoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItem[];
  /** List of the 3 devices with the most alerts. */
  topAlertedDevices?: IoTSecurityAPIIoTSecurityAlertedDevice[];
  /** List of the 3 most prevalent device alerts. */
  mostPrevalentDeviceAlerts?: IoTSecurityAPIIoTSecurityDeviceAlert[];
  /** List of the 3 most prevalent device recommendations. */
  mostPrevalentDeviceRecommendations?: IoTSecurityAPIIoTSecurityDeviceRecommendation[];
}

export function ioTSecurityAPIIoTSecuritySolutionAnalyticsModelPropertiesDeserializer(
  item: any,
): IoTSecurityAPIIoTSecuritySolutionAnalyticsModelProperties {
  return {
    metrics: !item["metrics"]
      ? item["metrics"]
      : ioTSecurityAPIIoTSeverityMetricsDeserializer(item["metrics"]),
    unhealthyDeviceCount: item["unhealthyDeviceCount"],
    devicesMetrics: !item["devicesMetrics"]
      ? item["devicesMetrics"]
      : ioTSecurityAPIIoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItemArrayDeserializer(
          item["devicesMetrics"],
        ),
    topAlertedDevices: !item["topAlertedDevices"]
      ? item["topAlertedDevices"]
      : ioTSecurityAPIIoTSecurityAlertedDeviceArrayDeserializer(item["topAlertedDevices"]),
    mostPrevalentDeviceAlerts: !item["mostPrevalentDeviceAlerts"]
      ? item["mostPrevalentDeviceAlerts"]
      : ioTSecurityAPIIoTSecurityDeviceAlertArrayDeserializer(item["mostPrevalentDeviceAlerts"]),
    mostPrevalentDeviceRecommendations: !item["mostPrevalentDeviceRecommendations"]
      ? item["mostPrevalentDeviceRecommendations"]
      : ioTSecurityAPIIoTSecurityDeviceRecommendationArrayDeserializer(
          item["mostPrevalentDeviceRecommendations"],
        ),
  };
}

/** IoT Security solution analytics severity metrics. */
export interface IoTSecurityAPIIoTSeverityMetrics {
  /** Count of high severity alerts/recommendations. */
  high?: number;
  /** Count of medium severity alerts/recommendations. */
  medium?: number;
  /** Count of low severity alerts/recommendations. */
  low?: number;
}

export function ioTSecurityAPIIoTSeverityMetricsDeserializer(
  item: any,
): IoTSecurityAPIIoTSeverityMetrics {
  return {
    high: item["high"],
    medium: item["medium"],
    low: item["low"],
  };
}

export function ioTSecurityAPIIoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItemArrayDeserializer(
  result: Array<IoTSecurityAPIIoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItem>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIIoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItemDeserializer(
      item,
    );
  });
}

/** model interface IoTSecurityAPIIoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItem */
export interface IoTSecurityAPIIoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItem {
  /** Aggregation of IoT Security solution device alert metrics by date. */
  date?: Date;
  /** Device alert count by severity. */
  devicesMetrics?: IoTSecurityAPIIoTSeverityMetrics;
}

export function ioTSecurityAPIIoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItemDeserializer(
  item: any,
): IoTSecurityAPIIoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItem {
  return {
    date: !item["date"] ? item["date"] : new Date(item["date"]),
    devicesMetrics: !item["devicesMetrics"]
      ? item["devicesMetrics"]
      : ioTSecurityAPIIoTSeverityMetricsDeserializer(item["devicesMetrics"]),
  };
}

export function ioTSecurityAPIIoTSecurityAlertedDeviceArrayDeserializer(
  result: Array<IoTSecurityAPIIoTSecurityAlertedDevice>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIIoTSecurityAlertedDeviceDeserializer(item);
  });
}

/** Statistical information about the number of alerts per device during last set number of days. */
export interface IoTSecurityAPIIoTSecurityAlertedDevice {
  /** Device identifier. */
  readonly deviceId?: string;
  /** Number of alerts raised for this device. */
  readonly alertsCount?: number;
}

export function ioTSecurityAPIIoTSecurityAlertedDeviceDeserializer(
  item: any,
): IoTSecurityAPIIoTSecurityAlertedDevice {
  return {
    deviceId: item["deviceId"],
    alertsCount: item["alertsCount"],
  };
}

export function ioTSecurityAPIIoTSecurityDeviceAlertArrayDeserializer(
  result: Array<IoTSecurityAPIIoTSecurityDeviceAlert>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIIoTSecurityDeviceAlertDeserializer(item);
  });
}

/** Statistical information about the number of alerts per alert type during last set number of days */
export interface IoTSecurityAPIIoTSecurityDeviceAlert {
  /** Display name of the alert */
  readonly alertDisplayName?: string;
  /** Assessed Alert severity. */
  readonly reportedSeverity?: IoTSecurityAPIReportedSeverity;
  /** Number of alerts raised for this alert type. */
  readonly alertsCount?: number;
}

export function ioTSecurityAPIIoTSecurityDeviceAlertDeserializer(
  item: any,
): IoTSecurityAPIIoTSecurityDeviceAlert {
  return {
    alertDisplayName: item["alertDisplayName"],
    reportedSeverity: item["reportedSeverity"],
    alertsCount: item["alertsCount"],
  };
}

/** Assessed alert severity. */
export enum KnownIoTSecurityAPIReportedSeverity {
  /** Informational */
  Informational = "Informational",
  /** Low */
  Low = "Low",
  /** Medium */
  Medium = "Medium",
  /** High */
  High = "High",
}

/**
 * Assessed alert severity. \
 * {@link KnownIoTSecurityAPIReportedSeverity} can be used interchangeably with IoTSecurityAPIReportedSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Informational**: Informational \
 * **Low**: Low \
 * **Medium**: Medium \
 * **High**: High
 */
export type IoTSecurityAPIReportedSeverity = string;

export function ioTSecurityAPIIoTSecurityDeviceRecommendationArrayDeserializer(
  result: Array<IoTSecurityAPIIoTSecurityDeviceRecommendation>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIIoTSecurityDeviceRecommendationDeserializer(item);
  });
}

/** Statistical information about the number of recommendations per device, per recommendation type. */
export interface IoTSecurityAPIIoTSecurityDeviceRecommendation {
  /** Display name of the recommendation. */
  readonly recommendationDisplayName?: string;
  /** Assessed recommendation severity. */
  readonly reportedSeverity?: IoTSecurityAPIReportedSeverity;
  /** Number of devices with this recommendation. */
  readonly devicesCount?: number;
}

export function ioTSecurityAPIIoTSecurityDeviceRecommendationDeserializer(
  item: any,
): IoTSecurityAPIIoTSecurityDeviceRecommendation {
  return {
    recommendationDisplayName: item["recommendationDisplayName"],
    reportedSeverity: item["reportedSeverity"],
    devicesCount: item["devicesCount"],
  };
}

/** List of Security analytics of your IoT Security solution */
export interface IoTSecurityAPIIoTSecuritySolutionAnalyticsModelList {
  /** The IoTSecuritySolutionAnalyticsModel items on this page */
  value: IoTSecurityAPIIoTSecuritySolutionAnalyticsModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function ioTSecurityAPIIoTSecuritySolutionAnalyticsModelListDeserializer(
  item: any,
): IoTSecurityAPIIoTSecuritySolutionAnalyticsModelList {
  return {
    value: ioTSecurityAPIIoTSecuritySolutionAnalyticsModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ioTSecurityAPIIoTSecuritySolutionAnalyticsModelArrayDeserializer(
  result: Array<IoTSecurityAPIIoTSecuritySolutionAnalyticsModel>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIIoTSecuritySolutionAnalyticsModelDeserializer(item);
  });
}

/** IoT Security solution configuration and resource information. */
export interface IoTSecurityAPIIoTSecuritySolutionModel extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Workspace resource ID */
  workspace?: string;
  /** Resource display name. */
  displayName?: string;
  /** Status of the IoT Security solution. */
  status?: IoTSecurityAPISecuritySolutionStatus;
  /** List of additional options for exporting to workspace data. */
  export?: IoTSecurityAPIExportData[];
  /** Disabled data sources. Disabling these data sources compromises the system. */
  disabledDataSources?: IoTSecurityAPIDataSource[];
  /** IoT Hub resource IDs */
  iotHubs?: string[];
  /** Properties of the IoT Security solution's user defined resources. */
  userDefinedResources?: IoTSecurityAPIUserDefinedResourcesProperties;
  /** List of resources that were automatically discovered as relevant to the security solution. */
  readonly autoDiscoveredResources?: string[];
  /** List of the configuration status for each recommendation type. */
  recommendationsConfiguration?: IoTSecurityAPIRecommendationConfigurationProperties[];
  /** Unmasked IP address logging status */
  unmaskedIpLoggingStatus?: IoTSecurityAPIUnmaskedIpLoggingStatus;
  /** List of additional workspaces */
  additionalWorkspaces?: IoTSecurityAPIAdditionalWorkspacesProperties[];
}

export function ioTSecurityAPIIoTSecuritySolutionModelSerializer(
  item: IoTSecurityAPIIoTSecuritySolutionModel,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "workspace",
      "displayName",
      "status",
      "export",
      "disabledDataSources",
      "iotHubs",
      "userDefinedResources",
      "recommendationsConfiguration",
      "unmaskedIpLoggingStatus",
      "additionalWorkspaces",
    ])
      ? undefined
      : _ioTSecuritySolutionModelPropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
  };
}

export function ioTSecurityAPIIoTSecuritySolutionModelDeserializer(
  item: any,
): IoTSecurityAPIIoTSecuritySolutionModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _ioTSecuritySolutionModelPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Security Solution setting data */
export interface IoTSecurityAPIIoTSecuritySolutionProperties {
  /** Workspace resource ID */
  workspace?: string;
  /** Resource display name. */
  displayName: string;
  /** Status of the IoT Security solution. */
  status?: IoTSecurityAPISecuritySolutionStatus;
  /** List of additional options for exporting to workspace data. */
  export?: IoTSecurityAPIExportData[];
  /** Disabled data sources. Disabling these data sources compromises the system. */
  disabledDataSources?: IoTSecurityAPIDataSource[];
  /** IoT Hub resource IDs */
  iotHubs: string[];
  /** Properties of the IoT Security solution's user defined resources. */
  userDefinedResources?: IoTSecurityAPIUserDefinedResourcesProperties;
  /** List of resources that were automatically discovered as relevant to the security solution. */
  readonly autoDiscoveredResources?: string[];
  /** List of the configuration status for each recommendation type. */
  recommendationsConfiguration?: IoTSecurityAPIRecommendationConfigurationProperties[];
  /** Unmasked IP address logging status */
  unmaskedIpLoggingStatus?: IoTSecurityAPIUnmaskedIpLoggingStatus;
  /** List of additional workspaces */
  additionalWorkspaces?: IoTSecurityAPIAdditionalWorkspacesProperties[];
}

export function ioTSecurityAPIIoTSecuritySolutionPropertiesSerializer(
  item: IoTSecurityAPIIoTSecuritySolutionProperties,
): any {
  return {
    workspace: item["workspace"],
    displayName: item["displayName"],
    status: item["status"],
    export: !item["export"]
      ? item["export"]
      : item["export"].map((p: any) => {
          return p;
        }),
    disabledDataSources: !item["disabledDataSources"]
      ? item["disabledDataSources"]
      : item["disabledDataSources"].map((p: any) => {
          return p;
        }),
    iotHubs: item["iotHubs"].map((p: any) => {
      return p;
    }),
    userDefinedResources: !item["userDefinedResources"]
      ? item["userDefinedResources"]
      : ioTSecurityAPIUserDefinedResourcesPropertiesSerializer(item["userDefinedResources"]),
    recommendationsConfiguration: !item["recommendationsConfiguration"]
      ? item["recommendationsConfiguration"]
      : ioTSecurityAPIRecommendationConfigurationPropertiesArraySerializer(
          item["recommendationsConfiguration"],
        ),
    unmaskedIpLoggingStatus: item["unmaskedIpLoggingStatus"],
    additionalWorkspaces: !item["additionalWorkspaces"]
      ? item["additionalWorkspaces"]
      : ioTSecurityAPIAdditionalWorkspacesPropertiesArraySerializer(item["additionalWorkspaces"]),
  };
}

export function ioTSecurityAPIIoTSecuritySolutionPropertiesDeserializer(
  item: any,
): IoTSecurityAPIIoTSecuritySolutionProperties {
  return {
    workspace: item["workspace"],
    displayName: item["displayName"],
    status: item["status"],
    export: !item["export"]
      ? item["export"]
      : item["export"].map((p: any) => {
          return p;
        }),
    disabledDataSources: !item["disabledDataSources"]
      ? item["disabledDataSources"]
      : item["disabledDataSources"].map((p: any) => {
          return p;
        }),
    iotHubs: item["iotHubs"].map((p: any) => {
      return p;
    }),
    userDefinedResources: !item["userDefinedResources"]
      ? item["userDefinedResources"]
      : ioTSecurityAPIUserDefinedResourcesPropertiesDeserializer(item["userDefinedResources"]),
    autoDiscoveredResources: !item["autoDiscoveredResources"]
      ? item["autoDiscoveredResources"]
      : item["autoDiscoveredResources"].map((p: any) => {
          return p;
        }),
    recommendationsConfiguration: !item["recommendationsConfiguration"]
      ? item["recommendationsConfiguration"]
      : ioTSecurityAPIRecommendationConfigurationPropertiesArrayDeserializer(
          item["recommendationsConfiguration"],
        ),
    unmaskedIpLoggingStatus: item["unmaskedIpLoggingStatus"],
    additionalWorkspaces: !item["additionalWorkspaces"]
      ? item["additionalWorkspaces"]
      : ioTSecurityAPIAdditionalWorkspacesPropertiesArrayDeserializer(item["additionalWorkspaces"]),
  };
}

/** Status of the IoT Security solution. */
export enum KnownIoTSecurityAPISecuritySolutionStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Status of the IoT Security solution. \
 * {@link KnownIoTSecurityAPISecuritySolutionStatus} can be used interchangeably with IoTSecurityAPISecuritySolutionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type IoTSecurityAPISecuritySolutionStatus = string;

/** Known values of {@link ExportData} that the service accepts. */
export enum KnownIoTSecurityAPIExportData {
  /** Agent raw events */
  RawEvents = "RawEvents",
}

/** Type of IoTSecurityAPIExportData */
export type IoTSecurityAPIExportData = string;

/** Known values of {@link DataSource} that the service accepts. */
export enum KnownIoTSecurityAPIDataSource {
  /** Devices twin data */
  TwinData = "TwinData",
}

/** Type of IoTSecurityAPIDataSource */
export type IoTSecurityAPIDataSource = string;

/** Properties of the IoT Security solution's user defined resources. */
export interface IoTSecurityAPIUserDefinedResourcesProperties {
  /** Azure Resource Graph query which represents the security solution's user defined resources. Required to start with "where type != "Microsoft.Devices/IotHubs"" */
  query: string | null;
  /** List of Azure subscription ids on which the user defined resources query should be executed. */
  querySubscriptions: string[] | null;
}

export function ioTSecurityAPIUserDefinedResourcesPropertiesSerializer(
  item: IoTSecurityAPIUserDefinedResourcesProperties,
): any {
  return {
    query: item["query"],
    querySubscriptions: !item["querySubscriptions"]
      ? item["querySubscriptions"]
      : item["querySubscriptions"].map((p: any) => {
          return p;
        }),
  };
}

export function ioTSecurityAPIUserDefinedResourcesPropertiesDeserializer(
  item: any,
): IoTSecurityAPIUserDefinedResourcesProperties {
  return {
    query: item["query"],
    querySubscriptions: !item["querySubscriptions"]
      ? item["querySubscriptions"]
      : item["querySubscriptions"].map((p1: any) => {
          return p1;
        }),
  };
}

export function ioTSecurityAPIRecommendationConfigurationPropertiesArraySerializer(
  result: Array<IoTSecurityAPIRecommendationConfigurationProperties>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIRecommendationConfigurationPropertiesSerializer(item);
  });
}

export function ioTSecurityAPIRecommendationConfigurationPropertiesArrayDeserializer(
  result: Array<IoTSecurityAPIRecommendationConfigurationProperties>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIRecommendationConfigurationPropertiesDeserializer(item);
  });
}

/** The type of IoT Security recommendation. */
export interface IoTSecurityAPIRecommendationConfigurationProperties {
  /** The type of IoT Security recommendation. */
  recommendationType: IoTSecurityAPIRecommendationType;
  readonly name?: string;
  /** Recommendation status. When the recommendation status is disabled recommendations are not generated. */
  status: IoTSecurityAPIRecommendationConfigStatus;
}

export function ioTSecurityAPIRecommendationConfigurationPropertiesSerializer(
  item: IoTSecurityAPIRecommendationConfigurationProperties,
): any {
  return { recommendationType: item["recommendationType"], status: item["status"] };
}

export function ioTSecurityAPIRecommendationConfigurationPropertiesDeserializer(
  item: any,
): IoTSecurityAPIRecommendationConfigurationProperties {
  return {
    recommendationType: item["recommendationType"],
    name: item["name"],
    status: item["status"],
  };
}

/** The type of IoT Security recommendation. */
export enum KnownIoTSecurityAPIRecommendationType {
  /** Authentication schema used for pull an edge module from an ACR repository does not use Service Principal Authentication. */
  IoTAcrauthentication = "IoT_ACRAuthentication",
  /** IoT agent message size capacity is currently underutilized, causing an increase in the number of sent messages. Adjust message intervals for better utilization. */
  IoTAgentSendsUnutilizedMessages = "IoT_AgentSendsUnutilizedMessages",
  /** Identified security related system configuration issues. */
  IoTBaseline = "IoT_Baseline",
  /** You can optimize Edge Hub memory usage by turning off protocol heads for any protocols not used by Edge modules in your solution. */
  IoTEdgeHubMemOptimize = "IoT_EdgeHubMemOptimize",
  /** Logging is disabled for this edge module. */
  IoTEdgeLoggingOptions = "IoT_EdgeLoggingOptions",
  /** A minority within a device security group has inconsistent Edge Module settings with the rest of their group. */
  IoTInconsistentModuleSettings = "IoT_InconsistentModuleSettings",
  /** Install the Azure Security of Things Agent. */
  IoTInstallAgent = "IoT_InstallAgent",
  /** IP Filter Configuration should have rules defined for allowed traffic and should deny all other traffic by default. */
  IoTIpfilterDenyAll = "IoT_IPFilter_DenyAll",
  /** An Allow IP Filter rules source IP range is too large. Overly permissive rules might expose your IoT hub to malicious intenders. */
  IoTIpfilterPermissiveRule = "IoT_IPFilter_PermissiveRule",
  /** A listening endpoint was found on the device. */
  IoTOpenPorts = "IoT_OpenPorts",
  /** An Allowed firewall policy was found (INPUT/OUTPUT). The policy should Deny all traffic by default and define rules to allow necessary communication to/from the device. */
  IoTPermissiveFirewallPolicy = "IoT_PermissiveFirewallPolicy",
  /** A rule in the firewall has been found that contains a permissive pattern for a wide range of IP addresses or Ports. */
  IoTPermissiveInputFirewallRules = "IoT_PermissiveInputFirewallRules",
  /** A rule in the firewall has been found that contains a permissive pattern for a wide range of IP addresses or Ports. */
  IoTPermissiveOutputFirewallRules = "IoT_PermissiveOutputFirewallRules",
  /** Edge module is configured to run in privileged mode, with extensive Linux capabilities or with host-level network access (send/receive data to host machine). */
  IoTPrivilegedDockerOptions = "IoT_PrivilegedDockerOptions",
  /** Same authentication credentials to the IoT Hub used by multiple devices. This could indicate an illegitimate device impersonating a legitimate device. It also exposes the risk of device impersonation by an attacker. */
  IoTSharedCredentials = "IoT_SharedCredentials",
  /** Insecure TLS configurations detected. Immediate upgrade recommended. */
  IoTVulnerableTLSCipherSuite = "IoT_VulnerableTLSCipherSuite",
}

/**
 * The type of IoT Security recommendation. \
 * {@link KnownIoTSecurityAPIRecommendationType} can be used interchangeably with IoTSecurityAPIRecommendationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IoT_ACRAuthentication**: Authentication schema used for pull an edge module from an ACR repository does not use Service Principal Authentication. \
 * **IoT_AgentSendsUnutilizedMessages**: IoT agent message size capacity is currently underutilized, causing an increase in the number of sent messages. Adjust message intervals for better utilization. \
 * **IoT_Baseline**: Identified security related system configuration issues. \
 * **IoT_EdgeHubMemOptimize**: You can optimize Edge Hub memory usage by turning off protocol heads for any protocols not used by Edge modules in your solution. \
 * **IoT_EdgeLoggingOptions**: Logging is disabled for this edge module. \
 * **IoT_InconsistentModuleSettings**: A minority within a device security group has inconsistent Edge Module settings with the rest of their group. \
 * **IoT_InstallAgent**: Install the Azure Security of Things Agent. \
 * **IoT_IPFilter_DenyAll**: IP Filter Configuration should have rules defined for allowed traffic and should deny all other traffic by default. \
 * **IoT_IPFilter_PermissiveRule**: An Allow IP Filter rules source IP range is too large. Overly permissive rules might expose your IoT hub to malicious intenders. \
 * **IoT_OpenPorts**: A listening endpoint was found on the device. \
 * **IoT_PermissiveFirewallPolicy**: An Allowed firewall policy was found (INPUT\/OUTPUT). The policy should Deny all traffic by default and define rules to allow necessary communication to\/from the device. \
 * **IoT_PermissiveInputFirewallRules**: A rule in the firewall has been found that contains a permissive pattern for a wide range of IP addresses or Ports. \
 * **IoT_PermissiveOutputFirewallRules**: A rule in the firewall has been found that contains a permissive pattern for a wide range of IP addresses or Ports. \
 * **IoT_PrivilegedDockerOptions**: Edge module is configured to run in privileged mode, with extensive Linux capabilities or with host-level network access (send\/receive data to host machine). \
 * **IoT_SharedCredentials**: Same authentication credentials to the IoT Hub used by multiple devices. This could indicate an illegitimate device impersonating a legitimate device. It also exposes the risk of device impersonation by an attacker. \
 * **IoT_VulnerableTLSCipherSuite**: Insecure TLS configurations detected. Immediate upgrade recommended.
 */
export type IoTSecurityAPIRecommendationType = string;

/** Recommendation status. When the recommendation status is disabled recommendations are not generated. */
export enum KnownIoTSecurityAPIRecommendationConfigStatus {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Recommendation status. When the recommendation status is disabled recommendations are not generated. \
 * {@link KnownIoTSecurityAPIRecommendationConfigStatus} can be used interchangeably with IoTSecurityAPIRecommendationConfigStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type IoTSecurityAPIRecommendationConfigStatus = string;

/** Unmasked IP address logging status */
export enum KnownIoTSecurityAPIUnmaskedIpLoggingStatus {
  /** Unmasked IP logging is disabled */
  Disabled = "Disabled",
  /** Unmasked IP logging is enabled */
  Enabled = "Enabled",
}

/**
 * Unmasked IP address logging status \
 * {@link KnownIoTSecurityAPIUnmaskedIpLoggingStatus} can be used interchangeably with IoTSecurityAPIUnmaskedIpLoggingStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Unmasked IP logging is disabled \
 * **Enabled**: Unmasked IP logging is enabled
 */
export type IoTSecurityAPIUnmaskedIpLoggingStatus = string;

export function ioTSecurityAPIAdditionalWorkspacesPropertiesArraySerializer(
  result: Array<IoTSecurityAPIAdditionalWorkspacesProperties>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIAdditionalWorkspacesPropertiesSerializer(item);
  });
}

export function ioTSecurityAPIAdditionalWorkspacesPropertiesArrayDeserializer(
  result: Array<IoTSecurityAPIAdditionalWorkspacesProperties>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIAdditionalWorkspacesPropertiesDeserializer(item);
  });
}

/** Properties of the additional workspaces. */
export interface IoTSecurityAPIAdditionalWorkspacesProperties {
  /** Workspace resource id */
  workspace?: string;
  /** Workspace type. */
  type?: IoTSecurityAPIAdditionalWorkspaceType;
  /** List of data types sent to workspace */
  dataTypes?: IoTSecurityAPIAdditionalWorkspaceDataType[];
}

export function ioTSecurityAPIAdditionalWorkspacesPropertiesSerializer(
  item: IoTSecurityAPIAdditionalWorkspacesProperties,
): any {
  return {
    workspace: item["workspace"],
    type: item["type"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : item["dataTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function ioTSecurityAPIAdditionalWorkspacesPropertiesDeserializer(
  item: any,
): IoTSecurityAPIAdditionalWorkspacesProperties {
  return {
    workspace: item["workspace"],
    type: item["type"],
    dataTypes: !item["dataTypes"]
      ? item["dataTypes"]
      : item["dataTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** Workspace type. */
export enum KnownIoTSecurityAPIAdditionalWorkspaceType {
  /** Sentinel */
  Sentinel = "Sentinel",
}

/**
 * Workspace type. \
 * {@link KnownIoTSecurityAPIAdditionalWorkspaceType} can be used interchangeably with IoTSecurityAPIAdditionalWorkspaceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Sentinel**: Sentinel
 */
export type IoTSecurityAPIAdditionalWorkspaceType = string;

/** Data types sent to workspace. */
export enum KnownIoTSecurityAPIAdditionalWorkspaceDataType {
  /** Alerts */
  Alerts = "Alerts",
  /** RawEvents */
  RawEvents = "RawEvents",
}

/**
 * Data types sent to workspace. \
 * {@link KnownIoTSecurityAPIAdditionalWorkspaceDataType} can be used interchangeably with IoTSecurityAPIAdditionalWorkspaceDataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Alerts**: Alerts \
 * **RawEvents**: RawEvents
 */
export type IoTSecurityAPIAdditionalWorkspaceDataType = string;

/** model interface IoTSecurityAPIUpdateIotSecuritySolutionData */
export interface IoTSecurityAPIUpdateIotSecuritySolutionData extends IoTSecurityAPITagsResource {
  /** Properties of the IoT Security solution's user defined resources. */
  userDefinedResources?: IoTSecurityAPIUserDefinedResourcesProperties;
  /** List of the configuration status for each recommendation type. */
  recommendationsConfiguration?: IoTSecurityAPIRecommendationConfigurationProperties[];
}

export function ioTSecurityAPIUpdateIotSecuritySolutionDataSerializer(
  item: IoTSecurityAPIUpdateIotSecuritySolutionData,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["userDefinedResources", "recommendationsConfiguration"])
      ? undefined
      : _updateIotSecuritySolutionDataPropertiesSerializer(item),
  };
}

/** Update Security Solution setting data */
export interface IoTSecurityAPIUpdateIoTSecuritySolutionProperties {
  /** Properties of the IoT Security solution's user defined resources. */
  userDefinedResources?: IoTSecurityAPIUserDefinedResourcesProperties;
  /** List of the configuration status for each recommendation type. */
  recommendationsConfiguration?: IoTSecurityAPIRecommendationConfigurationProperties[];
}

export function ioTSecurityAPIUpdateIoTSecuritySolutionPropertiesSerializer(
  item: IoTSecurityAPIUpdateIoTSecuritySolutionProperties,
): any {
  return {
    userDefinedResources: !item["userDefinedResources"]
      ? item["userDefinedResources"]
      : ioTSecurityAPIUserDefinedResourcesPropertiesSerializer(item["userDefinedResources"]),
    recommendationsConfiguration: !item["recommendationsConfiguration"]
      ? item["recommendationsConfiguration"]
      : ioTSecurityAPIRecommendationConfigurationPropertiesArraySerializer(
          item["recommendationsConfiguration"],
        ),
  };
}

/** A container holding only the Tags for a resource, allowing the user to update the tags. */
export interface IoTSecurityAPITagsResource {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function ioTSecurityAPITagsResourceSerializer(item: IoTSecurityAPITagsResource): any {
  return { tags: item["tags"] };
}

/** List of IoT Security solutions. */
export interface _IoTSecurityAPIIoTSecuritySolutionsList {
  /** The IoTSecuritySolutionModel items on this page */
  value: IoTSecurityAPIIoTSecuritySolutionModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ioTSecurityAPIIoTSecuritySolutionsListDeserializer(
  item: any,
): _IoTSecurityAPIIoTSecuritySolutionsList {
  return {
    value: ioTSecurityAPIIoTSecuritySolutionModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ioTSecurityAPIIoTSecuritySolutionModelArraySerializer(
  result: Array<IoTSecurityAPIIoTSecuritySolutionModel>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIIoTSecuritySolutionModelSerializer(item);
  });
}

export function ioTSecurityAPIIoTSecuritySolutionModelArrayDeserializer(
  result: Array<IoTSecurityAPIIoTSecuritySolutionModel>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIIoTSecuritySolutionModelDeserializer(item);
  });
}

/** Security Solution Aggregated Alert information */
export interface IoTSecurityAPIIoTSecurityAggregatedAlert extends ProxyResource {
  /** Resource tags */
  tags?: Record<string, string>;
  /** Name of the alert type. */
  readonly alertType?: string;
  /** Display name of the alert type. */
  readonly alertDisplayName?: string;
  /** Date of detection. */
  readonly aggregatedDateUtc?: Date;
  /** Name of the organization that raised the alert. */
  readonly vendorName?: string;
  /** Assessed alert severity. */
  readonly reportedSeverity?: IoTSecurityAPIReportedSeverity;
  /** Recommended steps for remediation. */
  readonly remediationSteps?: string;
  /** Description of the suspected vulnerability and meaning. */
  readonly description?: string;
  /** Number of alerts occurrences within the aggregated time window. */
  readonly count?: number;
  /** Azure resource ID of the resource that received the alerts. */
  readonly effectedResourceType?: string;
  /** The type of the alerted resource (Azure, Non-Azure). */
  readonly systemSource?: string;
  /** IoT Security solution alert response. */
  readonly actionTaken?: string;
  /** Log analytics query for getting the list of affected devices/alerts. */
  readonly logAnalyticsQuery?: string;
  /** 10 devices with the highest number of occurrences of this alert type, on this day. */
  readonly topDevicesList?: IoTSecurityAPIIoTSecurityAggregatedAlertPropertiesTopDevicesListItem[];
}

export function ioTSecurityAPIIoTSecurityAggregatedAlertDeserializer(
  item: any,
): IoTSecurityAPIIoTSecurityAggregatedAlert {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _ioTSecurityAggregatedAlertPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** IoT Security solution aggregated alert details. */
export interface IoTSecurityAPIIoTSecurityAggregatedAlertProperties {
  /** Name of the alert type. */
  readonly alertType?: string;
  /** Display name of the alert type. */
  readonly alertDisplayName?: string;
  /** Date of detection. */
  readonly aggregatedDateUtc?: Date;
  /** Name of the organization that raised the alert. */
  readonly vendorName?: string;
  /** Assessed alert severity. */
  readonly reportedSeverity?: IoTSecurityAPIReportedSeverity;
  /** Recommended steps for remediation. */
  readonly remediationSteps?: string;
  /** Description of the suspected vulnerability and meaning. */
  readonly description?: string;
  /** Number of alerts occurrences within the aggregated time window. */
  readonly count?: number;
  /** Azure resource ID of the resource that received the alerts. */
  readonly effectedResourceType?: string;
  /** The type of the alerted resource (Azure, Non-Azure). */
  readonly systemSource?: string;
  /** IoT Security solution alert response. */
  readonly actionTaken?: string;
  /** Log analytics query for getting the list of affected devices/alerts. */
  readonly logAnalyticsQuery?: string;
  /** 10 devices with the highest number of occurrences of this alert type, on this day. */
  readonly topDevicesList?: IoTSecurityAPIIoTSecurityAggregatedAlertPropertiesTopDevicesListItem[];
}

export function ioTSecurityAPIIoTSecurityAggregatedAlertPropertiesDeserializer(
  item: any,
): IoTSecurityAPIIoTSecurityAggregatedAlertProperties {
  return {
    alertType: item["alertType"],
    alertDisplayName: item["alertDisplayName"],
    aggregatedDateUtc: !item["aggregatedDateUtc"]
      ? item["aggregatedDateUtc"]
      : new Date(item["aggregatedDateUtc"]),
    vendorName: item["vendorName"],
    reportedSeverity: item["reportedSeverity"],
    remediationSteps: item["remediationSteps"],
    description: item["description"],
    count: item["count"],
    effectedResourceType: item["effectedResourceType"],
    systemSource: item["systemSource"],
    actionTaken: item["actionTaken"],
    logAnalyticsQuery: item["logAnalyticsQuery"],
    topDevicesList: !item["topDevicesList"]
      ? item["topDevicesList"]
      : ioTSecurityAPIIoTSecurityAggregatedAlertPropertiesTopDevicesListItemArrayDeserializer(
          item["topDevicesList"],
        ),
  };
}

export function ioTSecurityAPIIoTSecurityAggregatedAlertPropertiesTopDevicesListItemArrayDeserializer(
  result: Array<IoTSecurityAPIIoTSecurityAggregatedAlertPropertiesTopDevicesListItem>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIIoTSecurityAggregatedAlertPropertiesTopDevicesListItemDeserializer(item);
  });
}

/** model interface IoTSecurityAPIIoTSecurityAggregatedAlertPropertiesTopDevicesListItem */
export interface IoTSecurityAPIIoTSecurityAggregatedAlertPropertiesTopDevicesListItem {
  /** Name of the device. */
  readonly deviceId?: string;
  /** Number of alerts raised for this device. */
  readonly alertsCount?: number;
  /** Most recent time this alert was raised for this device, on this day. */
  readonly lastOccurrence?: string;
}

export function ioTSecurityAPIIoTSecurityAggregatedAlertPropertiesTopDevicesListItemDeserializer(
  item: any,
): IoTSecurityAPIIoTSecurityAggregatedAlertPropertiesTopDevicesListItem {
  return {
    deviceId: item["deviceId"],
    alertsCount: item["alertsCount"],
    lastOccurrence: item["lastOccurrence"],
  };
}

/** List of IoT Security solution aggregated alert data. */
export interface _IoTSecurityAPIIoTSecurityAggregatedAlertList {
  /** The IoTSecurityAggregatedAlert items on this page */
  value: IoTSecurityAPIIoTSecurityAggregatedAlert[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ioTSecurityAPIIoTSecurityAggregatedAlertListDeserializer(
  item: any,
): _IoTSecurityAPIIoTSecurityAggregatedAlertList {
  return {
    value: ioTSecurityAPIIoTSecurityAggregatedAlertArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ioTSecurityAPIIoTSecurityAggregatedAlertArrayDeserializer(
  result: Array<IoTSecurityAPIIoTSecurityAggregatedAlert>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIIoTSecurityAggregatedAlertDeserializer(item);
  });
}

/** IoT Security solution recommendation information. */
export interface IoTSecurityAPIIoTSecurityAggregatedRecommendation extends ProxyResource {
  /** Resource tags */
  tags?: Record<string, string>;
  /** Name of the recommendation. */
  recommendationName?: string;
  /** Display name of the recommendation type. */
  readonly recommendationDisplayName?: string;
  /** Description of the suspected vulnerability and meaning. */
  readonly description?: string;
  /** Recommendation-type GUID. */
  readonly recommendationTypeId?: string;
  /** Name of the organization that made the recommendation. */
  readonly detectedBy?: string;
  /** Recommended steps for remediation */
  readonly remediationSteps?: string;
  /** Assessed recommendation severity. */
  readonly reportedSeverity?: IoTSecurityAPIReportedSeverity;
  /** Number of healthy devices within the IoT Security solution. */
  readonly healthyDevices?: number;
  /** Number of unhealthy devices within the IoT Security solution. */
  readonly unhealthyDeviceCount?: number;
  /** Log analytics query for getting the list of affected devices/alerts. */
  readonly logAnalyticsQuery?: string;
}

export function ioTSecurityAPIIoTSecurityAggregatedRecommendationDeserializer(
  item: any,
): IoTSecurityAPIIoTSecurityAggregatedRecommendation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _ioTSecurityAggregatedRecommendationPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** IoT Security solution aggregated recommendation information */
export interface IoTSecurityAPIIoTSecurityAggregatedRecommendationProperties {
  /** Name of the recommendation. */
  recommendationName?: string;
  /** Display name of the recommendation type. */
  readonly recommendationDisplayName?: string;
  /** Description of the suspected vulnerability and meaning. */
  readonly description?: string;
  /** Recommendation-type GUID. */
  readonly recommendationTypeId?: string;
  /** Name of the organization that made the recommendation. */
  readonly detectedBy?: string;
  /** Recommended steps for remediation */
  readonly remediationSteps?: string;
  /** Assessed recommendation severity. */
  readonly reportedSeverity?: IoTSecurityAPIReportedSeverity;
  /** Number of healthy devices within the IoT Security solution. */
  readonly healthyDevices?: number;
  /** Number of unhealthy devices within the IoT Security solution. */
  readonly unhealthyDeviceCount?: number;
  /** Log analytics query for getting the list of affected devices/alerts. */
  readonly logAnalyticsQuery?: string;
}

export function ioTSecurityAPIIoTSecurityAggregatedRecommendationPropertiesDeserializer(
  item: any,
): IoTSecurityAPIIoTSecurityAggregatedRecommendationProperties {
  return {
    recommendationName: item["recommendationName"],
    recommendationDisplayName: item["recommendationDisplayName"],
    description: item["description"],
    recommendationTypeId: item["recommendationTypeId"],
    detectedBy: item["detectedBy"],
    remediationSteps: item["remediationSteps"],
    reportedSeverity: item["reportedSeverity"],
    healthyDevices: item["healthyDevices"],
    unhealthyDeviceCount: item["unhealthyDeviceCount"],
    logAnalyticsQuery: item["logAnalyticsQuery"],
  };
}

/** List of IoT Security solution aggregated recommendations. */
export interface _IoTSecurityAPIIoTSecurityAggregatedRecommendationList {
  /** The IoTSecurityAggregatedRecommendation items on this page */
  value: IoTSecurityAPIIoTSecurityAggregatedRecommendation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ioTSecurityAPIIoTSecurityAggregatedRecommendationListDeserializer(
  item: any,
): _IoTSecurityAPIIoTSecurityAggregatedRecommendationList {
  return {
    value: ioTSecurityAPIIoTSecurityAggregatedRecommendationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ioTSecurityAPIIoTSecurityAggregatedRecommendationArrayDeserializer(
  result: Array<IoTSecurityAPIIoTSecurityAggregatedRecommendation>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAPIIoTSecurityAggregatedRecommendationDeserializer(item);
  });
}

export function _deviceSecurityGroupPropertiesSerializer(
  item: IoTSecurityAPIDeviceSecurityGroup,
): any {
  return {
    thresholdRules: !item["thresholdRules"]
      ? item["thresholdRules"]
      : ioTSecurityAPIThresholdCustomAlertRuleArraySerializer(item["thresholdRules"]),
    timeWindowRules: !item["timeWindowRules"]
      ? item["timeWindowRules"]
      : ioTSecurityAPITimeWindowCustomAlertRuleArraySerializer(item["timeWindowRules"]),
    allowlistRules: !item["allowlistRules"]
      ? item["allowlistRules"]
      : ioTSecurityAPIAllowlistCustomAlertRuleArraySerializer(item["allowlistRules"]),
    denylistRules: !item["denylistRules"]
      ? item["denylistRules"]
      : ioTSecurityAPIDenylistCustomAlertRuleArraySerializer(item["denylistRules"]),
  };
}

export function _deviceSecurityGroupPropertiesDeserializer(item: any) {
  return {
    thresholdRules: !item["thresholdRules"]
      ? item["thresholdRules"]
      : ioTSecurityAPIThresholdCustomAlertRuleArrayDeserializer(item["thresholdRules"]),
    timeWindowRules: !item["timeWindowRules"]
      ? item["timeWindowRules"]
      : ioTSecurityAPITimeWindowCustomAlertRuleArrayDeserializer(item["timeWindowRules"]),
    allowlistRules: !item["allowlistRules"]
      ? item["allowlistRules"]
      : ioTSecurityAPIAllowlistCustomAlertRuleArrayDeserializer(item["allowlistRules"]),
    denylistRules: !item["denylistRules"]
      ? item["denylistRules"]
      : ioTSecurityAPIDenylistCustomAlertRuleArrayDeserializer(item["denylistRules"]),
  };
}

export function _ioTSecuritySolutionAnalyticsModelPropertiesDeserializer(item: any) {
  return {
    metrics: !item["metrics"]
      ? item["metrics"]
      : ioTSecurityAPIIoTSeverityMetricsDeserializer(item["metrics"]),
    unhealthyDeviceCount: item["unhealthyDeviceCount"],
    devicesMetrics: !item["devicesMetrics"]
      ? item["devicesMetrics"]
      : ioTSecurityAPIIoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItemArrayDeserializer(
          item["devicesMetrics"],
        ),
    topAlertedDevices: !item["topAlertedDevices"]
      ? item["topAlertedDevices"]
      : ioTSecurityAPIIoTSecurityAlertedDeviceArrayDeserializer(item["topAlertedDevices"]),
    mostPrevalentDeviceAlerts: !item["mostPrevalentDeviceAlerts"]
      ? item["mostPrevalentDeviceAlerts"]
      : ioTSecurityAPIIoTSecurityDeviceAlertArrayDeserializer(item["mostPrevalentDeviceAlerts"]),
    mostPrevalentDeviceRecommendations: !item["mostPrevalentDeviceRecommendations"]
      ? item["mostPrevalentDeviceRecommendations"]
      : ioTSecurityAPIIoTSecurityDeviceRecommendationArrayDeserializer(
          item["mostPrevalentDeviceRecommendations"],
        ),
  };
}

export function _ioTSecuritySolutionModelPropertiesSerializer(
  item: IoTSecurityAPIIoTSecuritySolutionModel,
): any {
  return {
    workspace: item["workspace"],
    displayName: item["displayName"],
    status: item["status"],
    export: !item["export"]
      ? item["export"]
      : item["export"].map((p: any) => {
          return p;
        }),
    disabledDataSources: !item["disabledDataSources"]
      ? item["disabledDataSources"]
      : item["disabledDataSources"].map((p: any) => {
          return p;
        }),
    iotHubs: !item["iotHubs"]
      ? item["iotHubs"]
      : item["iotHubs"].map((p: any) => {
          return p;
        }),
    userDefinedResources: !item["userDefinedResources"]
      ? item["userDefinedResources"]
      : ioTSecurityAPIUserDefinedResourcesPropertiesSerializer(item["userDefinedResources"]),
    recommendationsConfiguration: !item["recommendationsConfiguration"]
      ? item["recommendationsConfiguration"]
      : ioTSecurityAPIRecommendationConfigurationPropertiesArraySerializer(
          item["recommendationsConfiguration"],
        ),
    unmaskedIpLoggingStatus: item["unmaskedIpLoggingStatus"],
    additionalWorkspaces: !item["additionalWorkspaces"]
      ? item["additionalWorkspaces"]
      : ioTSecurityAPIAdditionalWorkspacesPropertiesArraySerializer(item["additionalWorkspaces"]),
  };
}

export function _ioTSecuritySolutionModelPropertiesDeserializer(item: any) {
  return {
    workspace: item["workspace"],
    displayName: item["displayName"],
    status: item["status"],
    export: !item["export"]
      ? item["export"]
      : item["export"].map((p: any) => {
          return p;
        }),
    disabledDataSources: !item["disabledDataSources"]
      ? item["disabledDataSources"]
      : item["disabledDataSources"].map((p: any) => {
          return p;
        }),
    iotHubs: !item["iotHubs"]
      ? item["iotHubs"]
      : item["iotHubs"].map((p: any) => {
          return p;
        }),
    userDefinedResources: !item["userDefinedResources"]
      ? item["userDefinedResources"]
      : ioTSecurityAPIUserDefinedResourcesPropertiesDeserializer(item["userDefinedResources"]),
    autoDiscoveredResources: !item["autoDiscoveredResources"]
      ? item["autoDiscoveredResources"]
      : item["autoDiscoveredResources"].map((p: any) => {
          return p;
        }),
    recommendationsConfiguration: !item["recommendationsConfiguration"]
      ? item["recommendationsConfiguration"]
      : ioTSecurityAPIRecommendationConfigurationPropertiesArrayDeserializer(
          item["recommendationsConfiguration"],
        ),
    unmaskedIpLoggingStatus: item["unmaskedIpLoggingStatus"],
    additionalWorkspaces: !item["additionalWorkspaces"]
      ? item["additionalWorkspaces"]
      : ioTSecurityAPIAdditionalWorkspacesPropertiesArrayDeserializer(item["additionalWorkspaces"]),
  };
}

export function _updateIotSecuritySolutionDataPropertiesSerializer(
  item: IoTSecurityAPIUpdateIotSecuritySolutionData,
): any {
  return {
    userDefinedResources: !item["userDefinedResources"]
      ? item["userDefinedResources"]
      : ioTSecurityAPIUserDefinedResourcesPropertiesSerializer(item["userDefinedResources"]),
    recommendationsConfiguration: !item["recommendationsConfiguration"]
      ? item["recommendationsConfiguration"]
      : ioTSecurityAPIRecommendationConfigurationPropertiesArraySerializer(
          item["recommendationsConfiguration"],
        ),
  };
}

export function _ioTSecurityAggregatedAlertPropertiesDeserializer(item: any) {
  return {
    alertType: item["alertType"],
    alertDisplayName: item["alertDisplayName"],
    aggregatedDateUtc: !item["aggregatedDateUtc"]
      ? item["aggregatedDateUtc"]
      : new Date(item["aggregatedDateUtc"]),
    vendorName: item["vendorName"],
    reportedSeverity: item["reportedSeverity"],
    remediationSteps: item["remediationSteps"],
    description: item["description"],
    count: item["count"],
    effectedResourceType: item["effectedResourceType"],
    systemSource: item["systemSource"],
    actionTaken: item["actionTaken"],
    logAnalyticsQuery: item["logAnalyticsQuery"],
    topDevicesList: !item["topDevicesList"]
      ? item["topDevicesList"]
      : ioTSecurityAPIIoTSecurityAggregatedAlertPropertiesTopDevicesListItemArrayDeserializer(
          item["topDevicesList"],
        ),
  };
}

export function _ioTSecurityAggregatedRecommendationPropertiesDeserializer(item: any) {
  return {
    recommendationName: item["recommendationName"],
    recommendationDisplayName: item["recommendationDisplayName"],
    description: item["description"],
    recommendationTypeId: item["recommendationTypeId"],
    detectedBy: item["detectedBy"],
    remediationSteps: item["remediationSteps"],
    reportedSeverity: item["reportedSeverity"],
    healthyDevices: item["healthyDevices"],
    unhealthyDeviceCount: item["unhealthyDeviceCount"],
    logAnalyticsQuery: item["logAnalyticsQuery"],
  };
}
