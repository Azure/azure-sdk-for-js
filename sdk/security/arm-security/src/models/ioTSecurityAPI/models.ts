// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import { ProxyResource, systemDataDeserializer, ExtensionResource } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The device security group resource */
export interface DeviceSecurityGroup extends ExtensionResource {
  /** The list of custom alert threshold rules. */
  thresholdRules?: ThresholdCustomAlertRuleUnion[];
  /** The list of custom alert time-window rules. */
  timeWindowRules?: TimeWindowCustomAlertRuleUnion[];
  /** The allow-list custom alert rules. */
  allowlistRules?: AllowlistCustomAlertRuleUnion[];
  /** The deny-list custom alert rules. */
  denylistRules?: DenylistCustomAlertRule[];
}

export function deviceSecurityGroupSerializer(item: DeviceSecurityGroup): any {
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

export function deviceSecurityGroupDeserializer(item: any): DeviceSecurityGroup {
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
export interface DeviceSecurityGroupProperties {
  /** The list of custom alert threshold rules. */
  thresholdRules?: ThresholdCustomAlertRuleUnion[];
  /** The list of custom alert time-window rules. */
  timeWindowRules?: TimeWindowCustomAlertRuleUnion[];
  /** The allow-list custom alert rules. */
  allowlistRules?: AllowlistCustomAlertRuleUnion[];
  /** The deny-list custom alert rules. */
  denylistRules?: DenylistCustomAlertRule[];
}

export function deviceSecurityGroupPropertiesSerializer(item: DeviceSecurityGroupProperties): any {
  return {
    thresholdRules: !item["thresholdRules"]
      ? item["thresholdRules"]
      : thresholdCustomAlertRuleUnionArraySerializer(item["thresholdRules"]),
    timeWindowRules: !item["timeWindowRules"]
      ? item["timeWindowRules"]
      : timeWindowCustomAlertRuleUnionArraySerializer(item["timeWindowRules"]),
    allowlistRules: !item["allowlistRules"]
      ? item["allowlistRules"]
      : allowlistCustomAlertRuleUnionArraySerializer(item["allowlistRules"]),
    denylistRules: !item["denylistRules"]
      ? item["denylistRules"]
      : denylistCustomAlertRuleArraySerializer(item["denylistRules"]),
  };
}

export function deviceSecurityGroupPropertiesDeserializer(
  item: any,
): DeviceSecurityGroupProperties {
  return {
    thresholdRules: !item["thresholdRules"]
      ? item["thresholdRules"]
      : thresholdCustomAlertRuleUnionArrayDeserializer(item["thresholdRules"]),
    timeWindowRules: !item["timeWindowRules"]
      ? item["timeWindowRules"]
      : timeWindowCustomAlertRuleUnionArrayDeserializer(item["timeWindowRules"]),
    allowlistRules: !item["allowlistRules"]
      ? item["allowlistRules"]
      : allowlistCustomAlertRuleUnionArrayDeserializer(item["allowlistRules"]),
    denylistRules: !item["denylistRules"]
      ? item["denylistRules"]
      : denylistCustomAlertRuleArrayDeserializer(item["denylistRules"]),
  };
}

export function thresholdCustomAlertRuleUnionArraySerializer(
  result: Array<ThresholdCustomAlertRuleUnion>,
): any[] {
  return result.map((item) => {
    return thresholdCustomAlertRuleUnionSerializer(item);
  });
}

export function thresholdCustomAlertRuleUnionArrayDeserializer(
  result: Array<ThresholdCustomAlertRuleUnion>,
): any[] {
  return result.map((item) => {
    return thresholdCustomAlertRuleUnionDeserializer(item);
  });
}

/** A custom alert rule that checks if a value (depends on the custom alert type) is within the given range. */
export interface ThresholdCustomAlertRule extends CustomAlertRule {
  /** The minimum threshold. */
  minThreshold: number;
  /** The maximum threshold. */
  maxThreshold: number;
  ruleType:
    | "ThresholdCustomAlertRule"
    | "TimeWindowCustomAlertRule"
    | "ActiveConnectionsNotInAllowedRange"
    | "AmqpC2DMessagesNotInAllowedRange"
    | "MqttC2DMessagesNotInAllowedRange"
    | "HttpC2DMessagesNotInAllowedRange"
    | "AmqpC2DRejectedMessagesNotInAllowedRange"
    | "MqttC2DRejectedMessagesNotInAllowedRange"
    | "HttpC2DRejectedMessagesNotInAllowedRange"
    | "AmqpD2CMessagesNotInAllowedRange"
    | "MqttD2CMessagesNotInAllowedRange"
    | "HttpD2CMessagesNotInAllowedRange"
    | "DirectMethodInvokesNotInAllowedRange"
    | "FailedLocalLoginsNotInAllowedRange"
    | "FileUploadsNotInAllowedRange"
    | "QueuePurgesNotInAllowedRange"
    | "TwinUpdatesNotInAllowedRange"
    | "UnauthorizedOperationsNotInAllowedRange";
}

export function thresholdCustomAlertRuleSerializer(item: ThresholdCustomAlertRule): any {
  return {
    isEnabled: item["isEnabled"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
  };
}

export function thresholdCustomAlertRuleDeserializer(item: any): ThresholdCustomAlertRule {
  return {
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
  };
}

/** Alias for ThresholdCustomAlertRuleUnion */
export type ThresholdCustomAlertRuleUnion =
  | TimeWindowCustomAlertRuleUnion
  | ThresholdCustomAlertRule;

export function thresholdCustomAlertRuleUnionSerializer(item: ThresholdCustomAlertRuleUnion): any {
  switch (item.ruleType) {
    case "TimeWindowCustomAlertRule":
    case "ActiveConnectionsNotInAllowedRange":
    case "AmqpC2DMessagesNotInAllowedRange":
    case "MqttC2DMessagesNotInAllowedRange":
    case "HttpC2DMessagesNotInAllowedRange":
    case "AmqpC2DRejectedMessagesNotInAllowedRange":
    case "MqttC2DRejectedMessagesNotInAllowedRange":
    case "HttpC2DRejectedMessagesNotInAllowedRange":
    case "AmqpD2CMessagesNotInAllowedRange":
    case "MqttD2CMessagesNotInAllowedRange":
    case "HttpD2CMessagesNotInAllowedRange":
    case "DirectMethodInvokesNotInAllowedRange":
    case "FailedLocalLoginsNotInAllowedRange":
    case "FileUploadsNotInAllowedRange":
    case "QueuePurgesNotInAllowedRange":
    case "TwinUpdatesNotInAllowedRange":
    case "UnauthorizedOperationsNotInAllowedRange":
      return timeWindowCustomAlertRuleUnionSerializer(item as TimeWindowCustomAlertRuleUnion);

    default:
      return thresholdCustomAlertRuleSerializer(item);
  }
}

export function thresholdCustomAlertRuleUnionDeserializer(
  item: any,
): ThresholdCustomAlertRuleUnion {
  switch (item["ruleType"]) {
    case "TimeWindowCustomAlertRule":
    case "ActiveConnectionsNotInAllowedRange":
    case "AmqpC2DMessagesNotInAllowedRange":
    case "MqttC2DMessagesNotInAllowedRange":
    case "HttpC2DMessagesNotInAllowedRange":
    case "AmqpC2DRejectedMessagesNotInAllowedRange":
    case "MqttC2DRejectedMessagesNotInAllowedRange":
    case "HttpC2DRejectedMessagesNotInAllowedRange":
    case "AmqpD2CMessagesNotInAllowedRange":
    case "MqttD2CMessagesNotInAllowedRange":
    case "HttpD2CMessagesNotInAllowedRange":
    case "DirectMethodInvokesNotInAllowedRange":
    case "FailedLocalLoginsNotInAllowedRange":
    case "FileUploadsNotInAllowedRange":
    case "QueuePurgesNotInAllowedRange":
    case "TwinUpdatesNotInAllowedRange":
    case "UnauthorizedOperationsNotInAllowedRange":
      return timeWindowCustomAlertRuleUnionDeserializer(item as TimeWindowCustomAlertRuleUnion);

    default:
      return thresholdCustomAlertRuleDeserializer(item);
  }
}

/** A custom alert rule that checks if the number of activities (depends on the custom alert type) in a time window is within the given range. */
export interface TimeWindowCustomAlertRule extends ThresholdCustomAlertRule {
  /** The time window size in iso8601 format. */
  timeWindowSize: string;
  ruleType:
    | "TimeWindowCustomAlertRule"
    | "ActiveConnectionsNotInAllowedRange"
    | "AmqpC2DMessagesNotInAllowedRange"
    | "MqttC2DMessagesNotInAllowedRange"
    | "HttpC2DMessagesNotInAllowedRange"
    | "AmqpC2DRejectedMessagesNotInAllowedRange"
    | "MqttC2DRejectedMessagesNotInAllowedRange"
    | "HttpC2DRejectedMessagesNotInAllowedRange"
    | "AmqpD2CMessagesNotInAllowedRange"
    | "MqttD2CMessagesNotInAllowedRange"
    | "HttpD2CMessagesNotInAllowedRange"
    | "DirectMethodInvokesNotInAllowedRange"
    | "FailedLocalLoginsNotInAllowedRange"
    | "FileUploadsNotInAllowedRange"
    | "QueuePurgesNotInAllowedRange"
    | "TwinUpdatesNotInAllowedRange"
    | "UnauthorizedOperationsNotInAllowedRange";
}

export function timeWindowCustomAlertRuleSerializer(item: TimeWindowCustomAlertRule): any {
  return {
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    ruleType: item["ruleType"],
    isEnabled: item["isEnabled"],
    timeWindowSize: item["timeWindowSize"],
  };
}

export function timeWindowCustomAlertRuleDeserializer(item: any): TimeWindowCustomAlertRule {
  return {
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    ruleType: item["ruleType"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
    timeWindowSize: item["timeWindowSize"],
  };
}

/** Alias for TimeWindowCustomAlertRuleUnion */
export type TimeWindowCustomAlertRuleUnion =
  | ActiveConnectionsNotInAllowedRange
  | AmqpC2DMessagesNotInAllowedRange
  | MqttC2DMessagesNotInAllowedRange
  | HttpC2DMessagesNotInAllowedRange
  | AmqpC2DRejectedMessagesNotInAllowedRange
  | MqttC2DRejectedMessagesNotInAllowedRange
  | HttpC2DRejectedMessagesNotInAllowedRange
  | AmqpD2CMessagesNotInAllowedRange
  | MqttD2CMessagesNotInAllowedRange
  | HttpD2CMessagesNotInAllowedRange
  | DirectMethodInvokesNotInAllowedRange
  | FailedLocalLoginsNotInAllowedRange
  | FileUploadsNotInAllowedRange
  | QueuePurgesNotInAllowedRange
  | TwinUpdatesNotInAllowedRange
  | UnauthorizedOperationsNotInAllowedRange
  | TimeWindowCustomAlertRule;

export function timeWindowCustomAlertRuleUnionSerializer(
  item: TimeWindowCustomAlertRuleUnion,
): any {
  switch (item.ruleType) {
    case "ActiveConnectionsNotInAllowedRange":
      return activeConnectionsNotInAllowedRangeSerializer(
        item as ActiveConnectionsNotInAllowedRange,
      );

    case "AmqpC2DMessagesNotInAllowedRange":
      return amqpC2DMessagesNotInAllowedRangeSerializer(item as AmqpC2DMessagesNotInAllowedRange);

    case "MqttC2DMessagesNotInAllowedRange":
      return mqttC2DMessagesNotInAllowedRangeSerializer(item as MqttC2DMessagesNotInAllowedRange);

    case "HttpC2DMessagesNotInAllowedRange":
      return httpC2DMessagesNotInAllowedRangeSerializer(item as HttpC2DMessagesNotInAllowedRange);

    case "AmqpC2DRejectedMessagesNotInAllowedRange":
      return amqpC2DRejectedMessagesNotInAllowedRangeSerializer(
        item as AmqpC2DRejectedMessagesNotInAllowedRange,
      );

    case "MqttC2DRejectedMessagesNotInAllowedRange":
      return mqttC2DRejectedMessagesNotInAllowedRangeSerializer(
        item as MqttC2DRejectedMessagesNotInAllowedRange,
      );

    case "HttpC2DRejectedMessagesNotInAllowedRange":
      return httpC2DRejectedMessagesNotInAllowedRangeSerializer(
        item as HttpC2DRejectedMessagesNotInAllowedRange,
      );

    case "AmqpD2CMessagesNotInAllowedRange":
      return amqpD2CMessagesNotInAllowedRangeSerializer(item as AmqpD2CMessagesNotInAllowedRange);

    case "MqttD2CMessagesNotInAllowedRange":
      return mqttD2CMessagesNotInAllowedRangeSerializer(item as MqttD2CMessagesNotInAllowedRange);

    case "HttpD2CMessagesNotInAllowedRange":
      return httpD2CMessagesNotInAllowedRangeSerializer(item as HttpD2CMessagesNotInAllowedRange);

    case "DirectMethodInvokesNotInAllowedRange":
      return directMethodInvokesNotInAllowedRangeSerializer(
        item as DirectMethodInvokesNotInAllowedRange,
      );

    case "FailedLocalLoginsNotInAllowedRange":
      return failedLocalLoginsNotInAllowedRangeSerializer(
        item as FailedLocalLoginsNotInAllowedRange,
      );

    case "FileUploadsNotInAllowedRange":
      return fileUploadsNotInAllowedRangeSerializer(item as FileUploadsNotInAllowedRange);

    case "QueuePurgesNotInAllowedRange":
      return queuePurgesNotInAllowedRangeSerializer(item as QueuePurgesNotInAllowedRange);

    case "TwinUpdatesNotInAllowedRange":
      return twinUpdatesNotInAllowedRangeSerializer(item as TwinUpdatesNotInAllowedRange);

    case "UnauthorizedOperationsNotInAllowedRange":
      return unauthorizedOperationsNotInAllowedRangeSerializer(
        item as UnauthorizedOperationsNotInAllowedRange,
      );

    default:
      return timeWindowCustomAlertRuleSerializer(item);
  }
}

export function timeWindowCustomAlertRuleUnionDeserializer(
  item: any,
): TimeWindowCustomAlertRuleUnion {
  switch (item["ruleType"]) {
    case "ActiveConnectionsNotInAllowedRange":
      return activeConnectionsNotInAllowedRangeDeserializer(
        item as ActiveConnectionsNotInAllowedRange,
      );

    case "AmqpC2DMessagesNotInAllowedRange":
      return amqpC2DMessagesNotInAllowedRangeDeserializer(item as AmqpC2DMessagesNotInAllowedRange);

    case "MqttC2DMessagesNotInAllowedRange":
      return mqttC2DMessagesNotInAllowedRangeDeserializer(item as MqttC2DMessagesNotInAllowedRange);

    case "HttpC2DMessagesNotInAllowedRange":
      return httpC2DMessagesNotInAllowedRangeDeserializer(item as HttpC2DMessagesNotInAllowedRange);

    case "AmqpC2DRejectedMessagesNotInAllowedRange":
      return amqpC2DRejectedMessagesNotInAllowedRangeDeserializer(
        item as AmqpC2DRejectedMessagesNotInAllowedRange,
      );

    case "MqttC2DRejectedMessagesNotInAllowedRange":
      return mqttC2DRejectedMessagesNotInAllowedRangeDeserializer(
        item as MqttC2DRejectedMessagesNotInAllowedRange,
      );

    case "HttpC2DRejectedMessagesNotInAllowedRange":
      return httpC2DRejectedMessagesNotInAllowedRangeDeserializer(
        item as HttpC2DRejectedMessagesNotInAllowedRange,
      );

    case "AmqpD2CMessagesNotInAllowedRange":
      return amqpD2CMessagesNotInAllowedRangeDeserializer(item as AmqpD2CMessagesNotInAllowedRange);

    case "MqttD2CMessagesNotInAllowedRange":
      return mqttD2CMessagesNotInAllowedRangeDeserializer(item as MqttD2CMessagesNotInAllowedRange);

    case "HttpD2CMessagesNotInAllowedRange":
      return httpD2CMessagesNotInAllowedRangeDeserializer(item as HttpD2CMessagesNotInAllowedRange);

    case "DirectMethodInvokesNotInAllowedRange":
      return directMethodInvokesNotInAllowedRangeDeserializer(
        item as DirectMethodInvokesNotInAllowedRange,
      );

    case "FailedLocalLoginsNotInAllowedRange":
      return failedLocalLoginsNotInAllowedRangeDeserializer(
        item as FailedLocalLoginsNotInAllowedRange,
      );

    case "FileUploadsNotInAllowedRange":
      return fileUploadsNotInAllowedRangeDeserializer(item as FileUploadsNotInAllowedRange);

    case "QueuePurgesNotInAllowedRange":
      return queuePurgesNotInAllowedRangeDeserializer(item as QueuePurgesNotInAllowedRange);

    case "TwinUpdatesNotInAllowedRange":
      return twinUpdatesNotInAllowedRangeDeserializer(item as TwinUpdatesNotInAllowedRange);

    case "UnauthorizedOperationsNotInAllowedRange":
      return unauthorizedOperationsNotInAllowedRangeDeserializer(
        item as UnauthorizedOperationsNotInAllowedRange,
      );

    default:
      return timeWindowCustomAlertRuleDeserializer(item);
  }
}

/** Number of active connections is not in allowed range. */
export interface ActiveConnectionsNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "ActiveConnectionsNotInAllowedRange";
}

export function activeConnectionsNotInAllowedRangeSerializer(
  item: ActiveConnectionsNotInAllowedRange,
): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function activeConnectionsNotInAllowedRangeDeserializer(
  item: any,
): ActiveConnectionsNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of cloud to device messages (AMQP protocol) is not in allowed range. */
export interface AmqpC2DMessagesNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "AmqpC2DMessagesNotInAllowedRange";
}

export function amqpC2DMessagesNotInAllowedRangeSerializer(
  item: AmqpC2DMessagesNotInAllowedRange,
): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function amqpC2DMessagesNotInAllowedRangeDeserializer(
  item: any,
): AmqpC2DMessagesNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of cloud to device messages (MQTT protocol) is not in allowed range. */
export interface MqttC2DMessagesNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "MqttC2DMessagesNotInAllowedRange";
}

export function mqttC2DMessagesNotInAllowedRangeSerializer(
  item: MqttC2DMessagesNotInAllowedRange,
): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function mqttC2DMessagesNotInAllowedRangeDeserializer(
  item: any,
): MqttC2DMessagesNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of cloud to device messages (HTTP protocol) is not in allowed range. */
export interface HttpC2DMessagesNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "HttpC2DMessagesNotInAllowedRange";
}

export function httpC2DMessagesNotInAllowedRangeSerializer(
  item: HttpC2DMessagesNotInAllowedRange,
): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function httpC2DMessagesNotInAllowedRangeDeserializer(
  item: any,
): HttpC2DMessagesNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of rejected cloud to device messages (AMQP protocol) is not in allowed range. */
export interface AmqpC2DRejectedMessagesNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "AmqpC2DRejectedMessagesNotInAllowedRange";
}

export function amqpC2DRejectedMessagesNotInAllowedRangeSerializer(
  item: AmqpC2DRejectedMessagesNotInAllowedRange,
): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function amqpC2DRejectedMessagesNotInAllowedRangeDeserializer(
  item: any,
): AmqpC2DRejectedMessagesNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of rejected cloud to device messages (MQTT protocol) is not in allowed range. */
export interface MqttC2DRejectedMessagesNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "MqttC2DRejectedMessagesNotInAllowedRange";
}

export function mqttC2DRejectedMessagesNotInAllowedRangeSerializer(
  item: MqttC2DRejectedMessagesNotInAllowedRange,
): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function mqttC2DRejectedMessagesNotInAllowedRangeDeserializer(
  item: any,
): MqttC2DRejectedMessagesNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of rejected cloud to device messages (HTTP protocol) is not in allowed range. */
export interface HttpC2DRejectedMessagesNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "HttpC2DRejectedMessagesNotInAllowedRange";
}

export function httpC2DRejectedMessagesNotInAllowedRangeSerializer(
  item: HttpC2DRejectedMessagesNotInAllowedRange,
): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function httpC2DRejectedMessagesNotInAllowedRangeDeserializer(
  item: any,
): HttpC2DRejectedMessagesNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of device to cloud messages (AMQP protocol) is not in allowed range. */
export interface AmqpD2CMessagesNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "AmqpD2CMessagesNotInAllowedRange";
}

export function amqpD2CMessagesNotInAllowedRangeSerializer(
  item: AmqpD2CMessagesNotInAllowedRange,
): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function amqpD2CMessagesNotInAllowedRangeDeserializer(
  item: any,
): AmqpD2CMessagesNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of device to cloud messages (MQTT protocol) is not in allowed range. */
export interface MqttD2CMessagesNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "MqttD2CMessagesNotInAllowedRange";
}

export function mqttD2CMessagesNotInAllowedRangeSerializer(
  item: MqttD2CMessagesNotInAllowedRange,
): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function mqttD2CMessagesNotInAllowedRangeDeserializer(
  item: any,
): MqttD2CMessagesNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of device to cloud messages (HTTP protocol) is not in allowed range. */
export interface HttpD2CMessagesNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "HttpD2CMessagesNotInAllowedRange";
}

export function httpD2CMessagesNotInAllowedRangeSerializer(
  item: HttpD2CMessagesNotInAllowedRange,
): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function httpD2CMessagesNotInAllowedRangeDeserializer(
  item: any,
): HttpD2CMessagesNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of direct method invokes is not in allowed range. */
export interface DirectMethodInvokesNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "DirectMethodInvokesNotInAllowedRange";
}

export function directMethodInvokesNotInAllowedRangeSerializer(
  item: DirectMethodInvokesNotInAllowedRange,
): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function directMethodInvokesNotInAllowedRangeDeserializer(
  item: any,
): DirectMethodInvokesNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of failed local logins is not in allowed range. */
export interface FailedLocalLoginsNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "FailedLocalLoginsNotInAllowedRange";
}

export function failedLocalLoginsNotInAllowedRangeSerializer(
  item: FailedLocalLoginsNotInAllowedRange,
): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function failedLocalLoginsNotInAllowedRangeDeserializer(
  item: any,
): FailedLocalLoginsNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of file uploads is not in allowed range. */
export interface FileUploadsNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "FileUploadsNotInAllowedRange";
}

export function fileUploadsNotInAllowedRangeSerializer(item: FileUploadsNotInAllowedRange): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function fileUploadsNotInAllowedRangeDeserializer(item: any): FileUploadsNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of device queue purges is not in allowed range. */
export interface QueuePurgesNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "QueuePurgesNotInAllowedRange";
}

export function queuePurgesNotInAllowedRangeSerializer(item: QueuePurgesNotInAllowedRange): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function queuePurgesNotInAllowedRangeDeserializer(item: any): QueuePurgesNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of twin updates is not in allowed range. */
export interface TwinUpdatesNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "TwinUpdatesNotInAllowedRange";
}

export function twinUpdatesNotInAllowedRangeSerializer(item: TwinUpdatesNotInAllowedRange): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function twinUpdatesNotInAllowedRangeDeserializer(item: any): TwinUpdatesNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Number of unauthorized operations is not in allowed range. */
export interface UnauthorizedOperationsNotInAllowedRange extends TimeWindowCustomAlertRule {
  /** The type of the custom alert rule. */
  ruleType: "UnauthorizedOperationsNotInAllowedRange";
}

export function unauthorizedOperationsNotInAllowedRangeSerializer(
  item: UnauthorizedOperationsNotInAllowedRange,
): any {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    isEnabled: item["isEnabled"],
  };
}

export function unauthorizedOperationsNotInAllowedRangeDeserializer(
  item: any,
): UnauthorizedOperationsNotInAllowedRange {
  return {
    timeWindowSize: item["timeWindowSize"],
    ruleType: item["ruleType"],
    minThreshold: item["minThreshold"],
    maxThreshold: item["maxThreshold"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

export function timeWindowCustomAlertRuleUnionArraySerializer(
  result: Array<TimeWindowCustomAlertRuleUnion>,
): any[] {
  return result.map((item) => {
    return timeWindowCustomAlertRuleUnionSerializer(item);
  });
}

export function timeWindowCustomAlertRuleUnionArrayDeserializer(
  result: Array<TimeWindowCustomAlertRuleUnion>,
): any[] {
  return result.map((item) => {
    return timeWindowCustomAlertRuleUnionDeserializer(item);
  });
}

export function allowlistCustomAlertRuleUnionArraySerializer(
  result: Array<AllowlistCustomAlertRuleUnion>,
): any[] {
  return result.map((item) => {
    return allowlistCustomAlertRuleUnionSerializer(item);
  });
}

export function allowlistCustomAlertRuleUnionArrayDeserializer(
  result: Array<AllowlistCustomAlertRuleUnion>,
): any[] {
  return result.map((item) => {
    return allowlistCustomAlertRuleUnionDeserializer(item);
  });
}

/** A custom alert rule that checks if a value (depends on the custom alert type) is allowed. */
export interface AllowlistCustomAlertRule extends ListCustomAlertRule {
  /** The values to allow. The format of the values depends on the rule type. */
  allowlistValues: string[];
  ruleType:
    | "AllowlistCustomAlertRule"
    | "ConnectionToIpNotAllowed"
    | "ConnectionFromIpNotAllowed"
    | "LocalUserNotAllowed"
    | "ProcessNotAllowed";
}

export function allowlistCustomAlertRuleSerializer(item: AllowlistCustomAlertRule): any {
  return {
    ruleType: item["ruleType"],
    isEnabled: item["isEnabled"],
    allowlistValues: item["allowlistValues"].map((p: any) => {
      return p;
    }),
  };
}

export function allowlistCustomAlertRuleDeserializer(item: any): AllowlistCustomAlertRule {
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

/** Alias for AllowlistCustomAlertRuleUnion */
export type AllowlistCustomAlertRuleUnion =
  | ConnectionToIpNotAllowed
  | ConnectionFromIpNotAllowed
  | LocalUserNotAllowed
  | ProcessNotAllowed
  | AllowlistCustomAlertRule;

export function allowlistCustomAlertRuleUnionSerializer(item: AllowlistCustomAlertRuleUnion): any {
  switch (item.ruleType) {
    case "ConnectionToIpNotAllowed":
      return connectionToIpNotAllowedSerializer(item as ConnectionToIpNotAllowed);

    case "ConnectionFromIpNotAllowed":
      return connectionFromIpNotAllowedSerializer(item as ConnectionFromIpNotAllowed);

    case "LocalUserNotAllowed":
      return localUserNotAllowedSerializer(item as LocalUserNotAllowed);

    case "ProcessNotAllowed":
      return processNotAllowedSerializer(item as ProcessNotAllowed);

    default:
      return allowlistCustomAlertRuleSerializer(item);
  }
}

export function allowlistCustomAlertRuleUnionDeserializer(
  item: any,
): AllowlistCustomAlertRuleUnion {
  switch (item["ruleType"]) {
    case "ConnectionToIpNotAllowed":
      return connectionToIpNotAllowedDeserializer(item as ConnectionToIpNotAllowed);

    case "ConnectionFromIpNotAllowed":
      return connectionFromIpNotAllowedDeserializer(item as ConnectionFromIpNotAllowed);

    case "LocalUserNotAllowed":
      return localUserNotAllowedDeserializer(item as LocalUserNotAllowed);

    case "ProcessNotAllowed":
      return processNotAllowedDeserializer(item as ProcessNotAllowed);

    default:
      return allowlistCustomAlertRuleDeserializer(item);
  }
}

/** Outbound connection to an ip that isn't allowed. Allow list consists of ipv4 or ipv6 range in CIDR notation. */
export interface ConnectionToIpNotAllowed extends AllowlistCustomAlertRule {
  ruleType: "ConnectionToIpNotAllowed";
}

export function connectionToIpNotAllowedSerializer(item: ConnectionToIpNotAllowed): any {
  return {
    allowlistValues: item["allowlistValues"].map((p: any) => {
      return p;
    }),
    ruleType: item["ruleType"],
    isEnabled: item["isEnabled"],
  };
}

export function connectionToIpNotAllowedDeserializer(item: any): ConnectionToIpNotAllowed {
  return {
    allowlistValues: item["allowlistValues"].map((p: any) => {
      return p;
    }),
    ruleType: item["ruleType"],
    valueType: item["valueType"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Inbound connection from an ip that isn't allowed. Allow list consists of ipv4 or ipv6 range in CIDR notation. */
export interface ConnectionFromIpNotAllowed extends AllowlistCustomAlertRule {
  ruleType: "ConnectionFromIpNotAllowed";
}

export function connectionFromIpNotAllowedSerializer(item: ConnectionFromIpNotAllowed): any {
  return {
    allowlistValues: item["allowlistValues"].map((p: any) => {
      return p;
    }),
    ruleType: item["ruleType"],
    isEnabled: item["isEnabled"],
  };
}

export function connectionFromIpNotAllowedDeserializer(item: any): ConnectionFromIpNotAllowed {
  return {
    allowlistValues: item["allowlistValues"].map((p: any) => {
      return p;
    }),
    ruleType: item["ruleType"],
    valueType: item["valueType"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Login by a local user that isn't allowed. Allow list consists of login names to allow. */
export interface LocalUserNotAllowed extends AllowlistCustomAlertRule {
  ruleType: "LocalUserNotAllowed";
}

export function localUserNotAllowedSerializer(item: LocalUserNotAllowed): any {
  return {
    allowlistValues: item["allowlistValues"].map((p: any) => {
      return p;
    }),
    ruleType: item["ruleType"],
    isEnabled: item["isEnabled"],
  };
}

export function localUserNotAllowedDeserializer(item: any): LocalUserNotAllowed {
  return {
    allowlistValues: item["allowlistValues"].map((p: any) => {
      return p;
    }),
    ruleType: item["ruleType"],
    valueType: item["valueType"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

/** Execution of a process that isn't allowed. Allow list consists of process names to allow. */
export interface ProcessNotAllowed extends AllowlistCustomAlertRule {
  ruleType: "ProcessNotAllowed";
}

export function processNotAllowedSerializer(item: ProcessNotAllowed): any {
  return {
    allowlistValues: item["allowlistValues"].map((p: any) => {
      return p;
    }),
    ruleType: item["ruleType"],
    isEnabled: item["isEnabled"],
  };
}

export function processNotAllowedDeserializer(item: any): ProcessNotAllowed {
  return {
    allowlistValues: item["allowlistValues"].map((p: any) => {
      return p;
    }),
    ruleType: item["ruleType"],
    valueType: item["valueType"],
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
  };
}

export function denylistCustomAlertRuleArraySerializer(
  result: Array<DenylistCustomAlertRule>,
): any[] {
  return result.map((item) => {
    return denylistCustomAlertRuleSerializer(item);
  });
}

export function denylistCustomAlertRuleArrayDeserializer(
  result: Array<DenylistCustomAlertRule>,
): any[] {
  return result.map((item) => {
    return denylistCustomAlertRuleDeserializer(item);
  });
}

/** A custom alert rule that checks if a value (depends on the custom alert type) is denied. */
export interface DenylistCustomAlertRule extends ListCustomAlertRule {
  /** The values to deny. The format of the values depends on the rule type. */
  denylistValues: string[];
  ruleType: "DenylistCustomAlertRule";
}

export function denylistCustomAlertRuleSerializer(item: DenylistCustomAlertRule): any {
  return {
    ruleType: item["ruleType"],
    isEnabled: item["isEnabled"],
    denylistValues: item["denylistValues"].map((p: any) => {
      return p;
    }),
  };
}

export function denylistCustomAlertRuleDeserializer(item: any): DenylistCustomAlertRule {
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
export interface CustomAlertRule {
  /** The display name of the custom alert. */
  readonly displayName?: string;
  /** The description of the custom alert. */
  readonly description?: string;
  /** Status of the custom alert. */
  isEnabled: boolean;
  /** The type of the custom alert rule. */
  /** The discriminator possible values: ThresholdCustomAlertRule, TimeWindowCustomAlertRule, AllowlistCustomAlertRule, ListCustomAlertRule, DenylistCustomAlertRule, ConnectionToIpNotAllowed, ConnectionFromIpNotAllowed, LocalUserNotAllowed, ProcessNotAllowed, ActiveConnectionsNotInAllowedRange, AmqpC2DMessagesNotInAllowedRange, MqttC2DMessagesNotInAllowedRange, HttpC2DMessagesNotInAllowedRange, AmqpC2DRejectedMessagesNotInAllowedRange, MqttC2DRejectedMessagesNotInAllowedRange, HttpC2DRejectedMessagesNotInAllowedRange, AmqpD2CMessagesNotInAllowedRange, MqttD2CMessagesNotInAllowedRange, HttpD2CMessagesNotInAllowedRange, DirectMethodInvokesNotInAllowedRange, FailedLocalLoginsNotInAllowedRange, FileUploadsNotInAllowedRange, QueuePurgesNotInAllowedRange, TwinUpdatesNotInAllowedRange, UnauthorizedOperationsNotInAllowedRange */
  ruleType: string;
}

export function customAlertRuleSerializer(item: CustomAlertRule): any {
  return { isEnabled: item["isEnabled"], ruleType: item["ruleType"] };
}

export function customAlertRuleDeserializer(item: any): CustomAlertRule {
  return {
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
    ruleType: item["ruleType"],
  };
}

/** Alias for CustomAlertRuleUnion */
export type CustomAlertRuleUnion =
  | ThresholdCustomAlertRuleUnion
  | ListCustomAlertRuleUnion
  | CustomAlertRule;

export function customAlertRuleUnionSerializer(item: CustomAlertRuleUnion): any {
  switch (item.ruleType) {
    case "ThresholdCustomAlertRule":
    case "TimeWindowCustomAlertRule":
    case "ActiveConnectionsNotInAllowedRange":
    case "AmqpC2DMessagesNotInAllowedRange":
    case "MqttC2DMessagesNotInAllowedRange":
    case "HttpC2DMessagesNotInAllowedRange":
    case "AmqpC2DRejectedMessagesNotInAllowedRange":
    case "MqttC2DRejectedMessagesNotInAllowedRange":
    case "HttpC2DRejectedMessagesNotInAllowedRange":
    case "AmqpD2CMessagesNotInAllowedRange":
    case "MqttD2CMessagesNotInAllowedRange":
    case "HttpD2CMessagesNotInAllowedRange":
    case "DirectMethodInvokesNotInAllowedRange":
    case "FailedLocalLoginsNotInAllowedRange":
    case "FileUploadsNotInAllowedRange":
    case "QueuePurgesNotInAllowedRange":
    case "TwinUpdatesNotInAllowedRange":
    case "UnauthorizedOperationsNotInAllowedRange":
      return thresholdCustomAlertRuleUnionSerializer(item as ThresholdCustomAlertRuleUnion);

    case "ListCustomAlertRule":
    case "AllowlistCustomAlertRule":
    case "DenylistCustomAlertRule":
    case "ConnectionToIpNotAllowed":
    case "ConnectionFromIpNotAllowed":
    case "LocalUserNotAllowed":
    case "ProcessNotAllowed":
      return listCustomAlertRuleUnionSerializer(item as ListCustomAlertRuleUnion);

    default:
      return customAlertRuleSerializer(item);
  }
}

export function customAlertRuleUnionDeserializer(item: any): CustomAlertRuleUnion {
  switch (item["ruleType"]) {
    case "ThresholdCustomAlertRule":
    case "TimeWindowCustomAlertRule":
    case "ActiveConnectionsNotInAllowedRange":
    case "AmqpC2DMessagesNotInAllowedRange":
    case "MqttC2DMessagesNotInAllowedRange":
    case "HttpC2DMessagesNotInAllowedRange":
    case "AmqpC2DRejectedMessagesNotInAllowedRange":
    case "MqttC2DRejectedMessagesNotInAllowedRange":
    case "HttpC2DRejectedMessagesNotInAllowedRange":
    case "AmqpD2CMessagesNotInAllowedRange":
    case "MqttD2CMessagesNotInAllowedRange":
    case "HttpD2CMessagesNotInAllowedRange":
    case "DirectMethodInvokesNotInAllowedRange":
    case "FailedLocalLoginsNotInAllowedRange":
    case "FileUploadsNotInAllowedRange":
    case "QueuePurgesNotInAllowedRange":
    case "TwinUpdatesNotInAllowedRange":
    case "UnauthorizedOperationsNotInAllowedRange":
      return thresholdCustomAlertRuleUnionDeserializer(item as ThresholdCustomAlertRuleUnion);

    case "ListCustomAlertRule":
    case "AllowlistCustomAlertRule":
    case "DenylistCustomAlertRule":
    case "ConnectionToIpNotAllowed":
    case "ConnectionFromIpNotAllowed":
    case "LocalUserNotAllowed":
    case "ProcessNotAllowed":
      return listCustomAlertRuleUnionDeserializer(item as ListCustomAlertRuleUnion);

    default:
      return customAlertRuleDeserializer(item);
  }
}

/** A List custom alert rule. */
export interface ListCustomAlertRule extends CustomAlertRule {
  /** The value type of the items in the list. */
  readonly valueType?: ValueType;
  ruleType:
    | "ListCustomAlertRule"
    | "AllowlistCustomAlertRule"
    | "DenylistCustomAlertRule"
    | "ConnectionToIpNotAllowed"
    | "ConnectionFromIpNotAllowed"
    | "LocalUserNotAllowed"
    | "ProcessNotAllowed";
}

export function listCustomAlertRuleSerializer(item: ListCustomAlertRule): any {
  return { isEnabled: item["isEnabled"], ruleType: item["ruleType"] };
}

export function listCustomAlertRuleDeserializer(item: any): ListCustomAlertRule {
  return {
    displayName: item["displayName"],
    description: item["description"],
    isEnabled: item["isEnabled"],
    ruleType: item["ruleType"],
    valueType: item["valueType"],
  };
}

/** Alias for ListCustomAlertRuleUnion */
export type ListCustomAlertRuleUnion =
  | AllowlistCustomAlertRuleUnion
  | DenylistCustomAlertRule
  | ListCustomAlertRule;

export function listCustomAlertRuleUnionSerializer(item: ListCustomAlertRuleUnion): any {
  switch (item.ruleType) {
    case "AllowlistCustomAlertRule":
    case "ConnectionToIpNotAllowed":
    case "ConnectionFromIpNotAllowed":
    case "LocalUserNotAllowed":
    case "ProcessNotAllowed":
      return allowlistCustomAlertRuleUnionSerializer(item as AllowlistCustomAlertRuleUnion);

    case "DenylistCustomAlertRule":
      return denylistCustomAlertRuleSerializer(item as DenylistCustomAlertRule);

    default:
      return listCustomAlertRuleSerializer(item);
  }
}

export function listCustomAlertRuleUnionDeserializer(item: any): ListCustomAlertRuleUnion {
  switch (item["ruleType"]) {
    case "AllowlistCustomAlertRule":
    case "ConnectionToIpNotAllowed":
    case "ConnectionFromIpNotAllowed":
    case "LocalUserNotAllowed":
    case "ProcessNotAllowed":
      return allowlistCustomAlertRuleUnionDeserializer(item as AllowlistCustomAlertRuleUnion);

    case "DenylistCustomAlertRule":
      return denylistCustomAlertRuleDeserializer(item as DenylistCustomAlertRule);

    default:
      return listCustomAlertRuleDeserializer(item);
  }
}

/** The value type of the items in the list. */
export enum KnownValueType {
  /** An IP range in CIDR format (e.g. '192.168.0.1/8'). */
  IpCidr = "IpCidr",
  /** Any string value. */
  String = "String",
}

/**
 * The value type of the items in the list. \
 * {@link KnownValueType} can be used interchangeably with ValueType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IpCidr**: An IP range in CIDR format (e.g. '192.168.0.1\/8'). \
 * **String**: Any string value.
 */
export type ValueType = string;

/** List of device security groups */
export interface _DeviceSecurityGroupList {
  /** List of device security group objects */
  value?: DeviceSecurityGroup[];
  /** The URI to fetch the next page. */
  readonly nextLink?: string;
}

export function _deviceSecurityGroupListDeserializer(item: any): _DeviceSecurityGroupList {
  return {
    value: !item["value"] ? item["value"] : deviceSecurityGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deviceSecurityGroupArraySerializer(result: Array<DeviceSecurityGroup>): any[] {
  return result.map((item) => {
    return deviceSecurityGroupSerializer(item);
  });
}

export function deviceSecurityGroupArrayDeserializer(result: Array<DeviceSecurityGroup>): any[] {
  return result.map((item) => {
    return deviceSecurityGroupDeserializer(item);
  });
}

/** Security analytics of your IoT Security solution */
export interface IoTSecuritySolutionAnalyticsModel extends ProxyResource {
  /** Security analytics of your IoT Security solution. */
  readonly metrics?: IoTSeverityMetrics;
  /** Number of unhealthy devices within your IoT Security solution. */
  readonly unhealthyDeviceCount?: number;
  /** List of device metrics by the aggregation date. */
  readonly devicesMetrics?: IoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItem[];
  /** List of the 3 devices with the most alerts. */
  topAlertedDevices?: IoTSecurityAlertedDevice[];
  /** List of the 3 most prevalent device alerts. */
  mostPrevalentDeviceAlerts?: IoTSecurityDeviceAlert[];
  /** List of the 3 most prevalent device recommendations. */
  mostPrevalentDeviceRecommendations?: IoTSecurityDeviceRecommendation[];
}

export function ioTSecuritySolutionAnalyticsModelDeserializer(
  item: any,
): IoTSecuritySolutionAnalyticsModel {
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
export interface IoTSecuritySolutionAnalyticsModelProperties {
  /** Security analytics of your IoT Security solution. */
  readonly metrics?: IoTSeverityMetrics;
  /** Number of unhealthy devices within your IoT Security solution. */
  readonly unhealthyDeviceCount?: number;
  /** List of device metrics by the aggregation date. */
  readonly devicesMetrics?: IoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItem[];
  /** List of the 3 devices with the most alerts. */
  topAlertedDevices?: IoTSecurityAlertedDevice[];
  /** List of the 3 most prevalent device alerts. */
  mostPrevalentDeviceAlerts?: IoTSecurityDeviceAlert[];
  /** List of the 3 most prevalent device recommendations. */
  mostPrevalentDeviceRecommendations?: IoTSecurityDeviceRecommendation[];
}

export function ioTSecuritySolutionAnalyticsModelPropertiesDeserializer(
  item: any,
): IoTSecuritySolutionAnalyticsModelProperties {
  return {
    metrics: !item["metrics"] ? item["metrics"] : ioTSeverityMetricsDeserializer(item["metrics"]),
    unhealthyDeviceCount: item["unhealthyDeviceCount"],
    devicesMetrics: !item["devicesMetrics"]
      ? item["devicesMetrics"]
      : ioTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItemArrayDeserializer(
          item["devicesMetrics"],
        ),
    topAlertedDevices: !item["topAlertedDevices"]
      ? item["topAlertedDevices"]
      : ioTSecurityAlertedDeviceArrayDeserializer(item["topAlertedDevices"]),
    mostPrevalentDeviceAlerts: !item["mostPrevalentDeviceAlerts"]
      ? item["mostPrevalentDeviceAlerts"]
      : ioTSecurityDeviceAlertArrayDeserializer(item["mostPrevalentDeviceAlerts"]),
    mostPrevalentDeviceRecommendations: !item["mostPrevalentDeviceRecommendations"]
      ? item["mostPrevalentDeviceRecommendations"]
      : ioTSecurityDeviceRecommendationArrayDeserializer(
          item["mostPrevalentDeviceRecommendations"],
        ),
  };
}

/** IoT Security solution analytics severity metrics. */
export interface IoTSeverityMetrics {
  /** Count of high severity alerts/recommendations. */
  high?: number;
  /** Count of medium severity alerts/recommendations. */
  medium?: number;
  /** Count of low severity alerts/recommendations. */
  low?: number;
}

export function ioTSeverityMetricsDeserializer(item: any): IoTSeverityMetrics {
  return {
    high: item["high"],
    medium: item["medium"],
    low: item["low"],
  };
}

export function ioTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItemArrayDeserializer(
  result: Array<IoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItem>,
): any[] {
  return result.map((item) => {
    return ioTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItemDeserializer(item);
  });
}

/** model interface IoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItem */
export interface IoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItem {
  /** Aggregation of IoT Security solution device alert metrics by date. */
  date?: Date;
  /** Device alert count by severity. */
  devicesMetrics?: IoTSeverityMetrics;
}

export function ioTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItemDeserializer(
  item: any,
): IoTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItem {
  return {
    date: !item["date"] ? item["date"] : new Date(item["date"]),
    devicesMetrics: !item["devicesMetrics"]
      ? item["devicesMetrics"]
      : ioTSeverityMetricsDeserializer(item["devicesMetrics"]),
  };
}

export function ioTSecurityAlertedDeviceArrayDeserializer(
  result: Array<IoTSecurityAlertedDevice>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAlertedDeviceDeserializer(item);
  });
}

/** Statistical information about the number of alerts per device during last set number of days. */
export interface IoTSecurityAlertedDevice {
  /** Device identifier. */
  readonly deviceId?: string;
  /** Number of alerts raised for this device. */
  readonly alertsCount?: number;
}

export function ioTSecurityAlertedDeviceDeserializer(item: any): IoTSecurityAlertedDevice {
  return {
    deviceId: item["deviceId"],
    alertsCount: item["alertsCount"],
  };
}

export function ioTSecurityDeviceAlertArrayDeserializer(
  result: Array<IoTSecurityDeviceAlert>,
): any[] {
  return result.map((item) => {
    return ioTSecurityDeviceAlertDeserializer(item);
  });
}

/** Statistical information about the number of alerts per alert type during last set number of days */
export interface IoTSecurityDeviceAlert {
  /** Display name of the alert */
  readonly alertDisplayName?: string;
  /** Assessed Alert severity. */
  readonly reportedSeverity?: ReportedSeverity;
  /** Number of alerts raised for this alert type. */
  readonly alertsCount?: number;
}

export function ioTSecurityDeviceAlertDeserializer(item: any): IoTSecurityDeviceAlert {
  return {
    alertDisplayName: item["alertDisplayName"],
    reportedSeverity: item["reportedSeverity"],
    alertsCount: item["alertsCount"],
  };
}

/** Assessed alert severity. */
export enum KnownReportedSeverity {
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
 * {@link KnownReportedSeverity} can be used interchangeably with ReportedSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Informational**: Informational \
 * **Low**: Low \
 * **Medium**: Medium \
 * **High**: High
 */
export type ReportedSeverity = string;

export function ioTSecurityDeviceRecommendationArrayDeserializer(
  result: Array<IoTSecurityDeviceRecommendation>,
): any[] {
  return result.map((item) => {
    return ioTSecurityDeviceRecommendationDeserializer(item);
  });
}

/** Statistical information about the number of recommendations per device, per recommendation type. */
export interface IoTSecurityDeviceRecommendation {
  /** Display name of the recommendation. */
  readonly recommendationDisplayName?: string;
  /** Assessed recommendation severity. */
  readonly reportedSeverity?: ReportedSeverity;
  /** Number of devices with this recommendation. */
  readonly devicesCount?: number;
}

export function ioTSecurityDeviceRecommendationDeserializer(
  item: any,
): IoTSecurityDeviceRecommendation {
  return {
    recommendationDisplayName: item["recommendationDisplayName"],
    reportedSeverity: item["reportedSeverity"],
    devicesCount: item["devicesCount"],
  };
}

/** List of Security analytics of your IoT Security solution */
export interface IoTSecuritySolutionAnalyticsModelList {
  /** The IoTSecuritySolutionAnalyticsModel items on this page */
  value: IoTSecuritySolutionAnalyticsModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function ioTSecuritySolutionAnalyticsModelListDeserializer(
  item: any,
): IoTSecuritySolutionAnalyticsModelList {
  return {
    value: ioTSecuritySolutionAnalyticsModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ioTSecuritySolutionAnalyticsModelArrayDeserializer(
  result: Array<IoTSecuritySolutionAnalyticsModel>,
): any[] {
  return result.map((item) => {
    return ioTSecuritySolutionAnalyticsModelDeserializer(item);
  });
}

/** IoT Security solution configuration and resource information. */
export interface IoTSecuritySolutionModel extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** Workspace resource ID */
  workspace?: string;
  /** Resource display name. */
  displayName?: string;
  /** Status of the IoT Security solution. */
  status?: SecuritySolutionStatus;
  /** List of additional options for exporting to workspace data. */
  export?: ExportData[];
  /** Disabled data sources. Disabling these data sources compromises the system. */
  disabledDataSources?: DataSource[];
  /** IoT Hub resource IDs */
  iotHubs?: string[];
  /** Properties of the IoT Security solution's user defined resources. */
  userDefinedResources?: UserDefinedResourcesProperties;
  /** List of resources that were automatically discovered as relevant to the security solution. */
  readonly autoDiscoveredResources?: string[];
  /** List of the configuration status for each recommendation type. */
  recommendationsConfiguration?: RecommendationConfigurationProperties[];
  /** Unmasked IP address logging status */
  unmaskedIpLoggingStatus?: UnmaskedIpLoggingStatus;
  /** List of additional workspaces */
  additionalWorkspaces?: AdditionalWorkspacesProperties[];
}

export function ioTSecuritySolutionModelSerializer(item: IoTSecuritySolutionModel): any {
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

export function ioTSecuritySolutionModelDeserializer(item: any): IoTSecuritySolutionModel {
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
export interface IoTSecuritySolutionProperties {
  /** Workspace resource ID */
  workspace?: string;
  /** Resource display name. */
  displayName: string;
  /** Status of the IoT Security solution. */
  status?: SecuritySolutionStatus;
  /** List of additional options for exporting to workspace data. */
  export?: ExportData[];
  /** Disabled data sources. Disabling these data sources compromises the system. */
  disabledDataSources?: DataSource[];
  /** IoT Hub resource IDs */
  iotHubs: string[];
  /** Properties of the IoT Security solution's user defined resources. */
  userDefinedResources?: UserDefinedResourcesProperties;
  /** List of resources that were automatically discovered as relevant to the security solution. */
  readonly autoDiscoveredResources?: string[];
  /** List of the configuration status for each recommendation type. */
  recommendationsConfiguration?: RecommendationConfigurationProperties[];
  /** Unmasked IP address logging status */
  unmaskedIpLoggingStatus?: UnmaskedIpLoggingStatus;
  /** List of additional workspaces */
  additionalWorkspaces?: AdditionalWorkspacesProperties[];
}

export function ioTSecuritySolutionPropertiesSerializer(item: IoTSecuritySolutionProperties): any {
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
      : userDefinedResourcesPropertiesSerializer(item["userDefinedResources"]),
    recommendationsConfiguration: !item["recommendationsConfiguration"]
      ? item["recommendationsConfiguration"]
      : recommendationConfigurationPropertiesArraySerializer(item["recommendationsConfiguration"]),
    unmaskedIpLoggingStatus: item["unmaskedIpLoggingStatus"],
    additionalWorkspaces: !item["additionalWorkspaces"]
      ? item["additionalWorkspaces"]
      : additionalWorkspacesPropertiesArraySerializer(item["additionalWorkspaces"]),
  };
}

export function ioTSecuritySolutionPropertiesDeserializer(
  item: any,
): IoTSecuritySolutionProperties {
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
      : userDefinedResourcesPropertiesDeserializer(item["userDefinedResources"]),
    autoDiscoveredResources: !item["autoDiscoveredResources"]
      ? item["autoDiscoveredResources"]
      : item["autoDiscoveredResources"].map((p: any) => {
          return p;
        }),
    recommendationsConfiguration: !item["recommendationsConfiguration"]
      ? item["recommendationsConfiguration"]
      : recommendationConfigurationPropertiesArrayDeserializer(
          item["recommendationsConfiguration"],
        ),
    unmaskedIpLoggingStatus: item["unmaskedIpLoggingStatus"],
    additionalWorkspaces: !item["additionalWorkspaces"]
      ? item["additionalWorkspaces"]
      : additionalWorkspacesPropertiesArrayDeserializer(item["additionalWorkspaces"]),
  };
}

/** Status of the IoT Security solution. */
export enum KnownSecuritySolutionStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Status of the IoT Security solution. \
 * {@link KnownSecuritySolutionStatus} can be used interchangeably with SecuritySolutionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type SecuritySolutionStatus = string;

/** Known values of {@link ExportData} that the service accepts. */
export enum KnownExportData {
  /** Agent raw events */
  RawEvents = "RawEvents",
}

/** Type of ExportData */
export type ExportData = string;

/** Known values of {@link DataSource} that the service accepts. */
export enum KnownDataSource {
  /** Devices twin data */
  TwinData = "TwinData",
}

/** Type of DataSource */
export type DataSource = string;

/** Properties of the IoT Security solution's user defined resources. */
export interface UserDefinedResourcesProperties {
  /** Azure Resource Graph query which represents the security solution's user defined resources. Required to start with "where type != "Microsoft.Devices/IotHubs"" */
  query: string | null;
  /** List of Azure subscription ids on which the user defined resources query should be executed. */
  querySubscriptions: string[] | null;
}

export function userDefinedResourcesPropertiesSerializer(
  item: UserDefinedResourcesProperties,
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

export function userDefinedResourcesPropertiesDeserializer(
  item: any,
): UserDefinedResourcesProperties {
  return {
    query: item["query"],
    querySubscriptions: !item["querySubscriptions"]
      ? item["querySubscriptions"]
      : item["querySubscriptions"].map((p1: any) => {
          return p1;
        }),
  };
}

export function recommendationConfigurationPropertiesArraySerializer(
  result: Array<RecommendationConfigurationProperties>,
): any[] {
  return result.map((item) => {
    return recommendationConfigurationPropertiesSerializer(item);
  });
}

export function recommendationConfigurationPropertiesArrayDeserializer(
  result: Array<RecommendationConfigurationProperties>,
): any[] {
  return result.map((item) => {
    return recommendationConfigurationPropertiesDeserializer(item);
  });
}

/** The type of IoT Security recommendation. */
export interface RecommendationConfigurationProperties {
  /** The type of IoT Security recommendation. */
  recommendationType: RecommendationType;
  readonly name?: string;
  /** Recommendation status. When the recommendation status is disabled recommendations are not generated. */
  status: RecommendationConfigStatus;
}

export function recommendationConfigurationPropertiesSerializer(
  item: RecommendationConfigurationProperties,
): any {
  return { recommendationType: item["recommendationType"], status: item["status"] };
}

export function recommendationConfigurationPropertiesDeserializer(
  item: any,
): RecommendationConfigurationProperties {
  return {
    recommendationType: item["recommendationType"],
    name: item["name"],
    status: item["status"],
  };
}

/** The type of IoT Security recommendation. */
export enum KnownRecommendationType {
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
 * {@link KnownRecommendationType} can be used interchangeably with RecommendationType,
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
export type RecommendationType = string;

/** Recommendation status. When the recommendation status is disabled recommendations are not generated. */
export enum KnownRecommendationConfigStatus {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Recommendation status. When the recommendation status is disabled recommendations are not generated. \
 * {@link KnownRecommendationConfigStatus} can be used interchangeably with RecommendationConfigStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type RecommendationConfigStatus = string;

/** Unmasked IP address logging status */
export enum KnownUnmaskedIpLoggingStatus {
  /** Unmasked IP logging is disabled */
  Disabled = "Disabled",
  /** Unmasked IP logging is enabled */
  Enabled = "Enabled",
}

/**
 * Unmasked IP address logging status \
 * {@link KnownUnmaskedIpLoggingStatus} can be used interchangeably with UnmaskedIpLoggingStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Unmasked IP logging is disabled \
 * **Enabled**: Unmasked IP logging is enabled
 */
export type UnmaskedIpLoggingStatus = string;

export function additionalWorkspacesPropertiesArraySerializer(
  result: Array<AdditionalWorkspacesProperties>,
): any[] {
  return result.map((item) => {
    return additionalWorkspacesPropertiesSerializer(item);
  });
}

export function additionalWorkspacesPropertiesArrayDeserializer(
  result: Array<AdditionalWorkspacesProperties>,
): any[] {
  return result.map((item) => {
    return additionalWorkspacesPropertiesDeserializer(item);
  });
}

/** Properties of the additional workspaces. */
export interface AdditionalWorkspacesProperties {
  /** Workspace resource id */
  workspace?: string;
  /** Workspace type. */
  type?: AdditionalWorkspaceType;
  /** List of data types sent to workspace */
  dataTypes?: AdditionalWorkspaceDataType[];
}

export function additionalWorkspacesPropertiesSerializer(
  item: AdditionalWorkspacesProperties,
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

export function additionalWorkspacesPropertiesDeserializer(
  item: any,
): AdditionalWorkspacesProperties {
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
export enum KnownAdditionalWorkspaceType {
  /** Sentinel */
  Sentinel = "Sentinel",
}

/**
 * Workspace type. \
 * {@link KnownAdditionalWorkspaceType} can be used interchangeably with AdditionalWorkspaceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Sentinel**: Sentinel
 */
export type AdditionalWorkspaceType = string;

/** Data types sent to workspace. */
export enum KnownAdditionalWorkspaceDataType {
  /** Alerts */
  Alerts = "Alerts",
  /** RawEvents */
  RawEvents = "RawEvents",
}

/**
 * Data types sent to workspace. \
 * {@link KnownAdditionalWorkspaceDataType} can be used interchangeably with AdditionalWorkspaceDataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Alerts**: Alerts \
 * **RawEvents**: RawEvents
 */
export type AdditionalWorkspaceDataType = string;

/** model interface UpdateIotSecuritySolutionData */
export interface UpdateIotSecuritySolutionData extends TagsResource {
  /** Properties of the IoT Security solution's user defined resources. */
  userDefinedResources?: UserDefinedResourcesProperties;
  /** List of the configuration status for each recommendation type. */
  recommendationsConfiguration?: RecommendationConfigurationProperties[];
}

export function updateIotSecuritySolutionDataSerializer(item: UpdateIotSecuritySolutionData): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["userDefinedResources", "recommendationsConfiguration"])
      ? undefined
      : _updateIotSecuritySolutionDataPropertiesSerializer(item),
  };
}

/** Update Security Solution setting data */
export interface UpdateIoTSecuritySolutionProperties {
  /** Properties of the IoT Security solution's user defined resources. */
  userDefinedResources?: UserDefinedResourcesProperties;
  /** List of the configuration status for each recommendation type. */
  recommendationsConfiguration?: RecommendationConfigurationProperties[];
}

export function updateIoTSecuritySolutionPropertiesSerializer(
  item: UpdateIoTSecuritySolutionProperties,
): any {
  return {
    userDefinedResources: !item["userDefinedResources"]
      ? item["userDefinedResources"]
      : userDefinedResourcesPropertiesSerializer(item["userDefinedResources"]),
    recommendationsConfiguration: !item["recommendationsConfiguration"]
      ? item["recommendationsConfiguration"]
      : recommendationConfigurationPropertiesArraySerializer(item["recommendationsConfiguration"]),
  };
}

/** A container holding only the Tags for a resource, allowing the user to update the tags. */
export interface TagsResource {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function tagsResourceSerializer(item: TagsResource): any {
  return { tags: item["tags"] };
}

/** List of IoT Security solutions. */
export interface _IoTSecuritySolutionsList {
  /** The IoTSecuritySolutionModel items on this page */
  value: IoTSecuritySolutionModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ioTSecuritySolutionsListDeserializer(item: any): _IoTSecuritySolutionsList {
  return {
    value: ioTSecuritySolutionModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ioTSecuritySolutionModelArraySerializer(
  result: Array<IoTSecuritySolutionModel>,
): any[] {
  return result.map((item) => {
    return ioTSecuritySolutionModelSerializer(item);
  });
}

export function ioTSecuritySolutionModelArrayDeserializer(
  result: Array<IoTSecuritySolutionModel>,
): any[] {
  return result.map((item) => {
    return ioTSecuritySolutionModelDeserializer(item);
  });
}

/** Security Solution Aggregated Alert information */
export interface IoTSecurityAggregatedAlert extends ProxyResource {
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
  readonly reportedSeverity?: ReportedSeverity;
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
  readonly topDevicesList?: IoTSecurityAggregatedAlertPropertiesTopDevicesListItem[];
}

export function ioTSecurityAggregatedAlertDeserializer(item: any): IoTSecurityAggregatedAlert {
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
export interface IoTSecurityAggregatedAlertProperties {
  /** Name of the alert type. */
  readonly alertType?: string;
  /** Display name of the alert type. */
  readonly alertDisplayName?: string;
  /** Date of detection. */
  readonly aggregatedDateUtc?: Date;
  /** Name of the organization that raised the alert. */
  readonly vendorName?: string;
  /** Assessed alert severity. */
  readonly reportedSeverity?: ReportedSeverity;
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
  readonly topDevicesList?: IoTSecurityAggregatedAlertPropertiesTopDevicesListItem[];
}

export function ioTSecurityAggregatedAlertPropertiesDeserializer(
  item: any,
): IoTSecurityAggregatedAlertProperties {
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
      : ioTSecurityAggregatedAlertPropertiesTopDevicesListItemArrayDeserializer(
          item["topDevicesList"],
        ),
  };
}

export function ioTSecurityAggregatedAlertPropertiesTopDevicesListItemArrayDeserializer(
  result: Array<IoTSecurityAggregatedAlertPropertiesTopDevicesListItem>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAggregatedAlertPropertiesTopDevicesListItemDeserializer(item);
  });
}

/** model interface IoTSecurityAggregatedAlertPropertiesTopDevicesListItem */
export interface IoTSecurityAggregatedAlertPropertiesTopDevicesListItem {
  /** Name of the device. */
  readonly deviceId?: string;
  /** Number of alerts raised for this device. */
  readonly alertsCount?: number;
  /** Most recent time this alert was raised for this device, on this day. */
  readonly lastOccurrence?: string;
}

export function ioTSecurityAggregatedAlertPropertiesTopDevicesListItemDeserializer(
  item: any,
): IoTSecurityAggregatedAlertPropertiesTopDevicesListItem {
  return {
    deviceId: item["deviceId"],
    alertsCount: item["alertsCount"],
    lastOccurrence: item["lastOccurrence"],
  };
}

/** List of IoT Security solution aggregated alert data. */
export interface _IoTSecurityAggregatedAlertList {
  /** The IoTSecurityAggregatedAlert items on this page */
  value: IoTSecurityAggregatedAlert[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ioTSecurityAggregatedAlertListDeserializer(
  item: any,
): _IoTSecurityAggregatedAlertList {
  return {
    value: ioTSecurityAggregatedAlertArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ioTSecurityAggregatedAlertArrayDeserializer(
  result: Array<IoTSecurityAggregatedAlert>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAggregatedAlertDeserializer(item);
  });
}

/** IoT Security solution recommendation information. */
export interface IoTSecurityAggregatedRecommendation extends ProxyResource {
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
  readonly reportedSeverity?: ReportedSeverity;
  /** Number of healthy devices within the IoT Security solution. */
  readonly healthyDevices?: number;
  /** Number of unhealthy devices within the IoT Security solution. */
  readonly unhealthyDeviceCount?: number;
  /** Log analytics query for getting the list of affected devices/alerts. */
  readonly logAnalyticsQuery?: string;
}

export function ioTSecurityAggregatedRecommendationDeserializer(
  item: any,
): IoTSecurityAggregatedRecommendation {
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
export interface IoTSecurityAggregatedRecommendationProperties {
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
  readonly reportedSeverity?: ReportedSeverity;
  /** Number of healthy devices within the IoT Security solution. */
  readonly healthyDevices?: number;
  /** Number of unhealthy devices within the IoT Security solution. */
  readonly unhealthyDeviceCount?: number;
  /** Log analytics query for getting the list of affected devices/alerts. */
  readonly logAnalyticsQuery?: string;
}

export function ioTSecurityAggregatedRecommendationPropertiesDeserializer(
  item: any,
): IoTSecurityAggregatedRecommendationProperties {
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
export interface _IoTSecurityAggregatedRecommendationList {
  /** The IoTSecurityAggregatedRecommendation items on this page */
  value: IoTSecurityAggregatedRecommendation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ioTSecurityAggregatedRecommendationListDeserializer(
  item: any,
): _IoTSecurityAggregatedRecommendationList {
  return {
    value: ioTSecurityAggregatedRecommendationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ioTSecurityAggregatedRecommendationArrayDeserializer(
  result: Array<IoTSecurityAggregatedRecommendation>,
): any[] {
  return result.map((item) => {
    return ioTSecurityAggregatedRecommendationDeserializer(item);
  });
}

export function _deviceSecurityGroupPropertiesSerializer(item: DeviceSecurityGroup): any {
  return {
    thresholdRules: !item["thresholdRules"]
      ? item["thresholdRules"]
      : thresholdCustomAlertRuleUnionArraySerializer(item["thresholdRules"]),
    timeWindowRules: !item["timeWindowRules"]
      ? item["timeWindowRules"]
      : timeWindowCustomAlertRuleUnionArraySerializer(item["timeWindowRules"]),
    allowlistRules: !item["allowlistRules"]
      ? item["allowlistRules"]
      : allowlistCustomAlertRuleUnionArraySerializer(item["allowlistRules"]),
    denylistRules: !item["denylistRules"]
      ? item["denylistRules"]
      : denylistCustomAlertRuleArraySerializer(item["denylistRules"]),
  };
}

export function _deviceSecurityGroupPropertiesDeserializer(item: any) {
  return {
    thresholdRules: !item["thresholdRules"]
      ? item["thresholdRules"]
      : thresholdCustomAlertRuleUnionArrayDeserializer(item["thresholdRules"]),
    timeWindowRules: !item["timeWindowRules"]
      ? item["timeWindowRules"]
      : timeWindowCustomAlertRuleUnionArrayDeserializer(item["timeWindowRules"]),
    allowlistRules: !item["allowlistRules"]
      ? item["allowlistRules"]
      : allowlistCustomAlertRuleUnionArrayDeserializer(item["allowlistRules"]),
    denylistRules: !item["denylistRules"]
      ? item["denylistRules"]
      : denylistCustomAlertRuleArrayDeserializer(item["denylistRules"]),
  };
}

export function _ioTSecuritySolutionAnalyticsModelPropertiesDeserializer(item: any) {
  return {
    metrics: !item["metrics"] ? item["metrics"] : ioTSeverityMetricsDeserializer(item["metrics"]),
    unhealthyDeviceCount: item["unhealthyDeviceCount"],
    devicesMetrics: !item["devicesMetrics"]
      ? item["devicesMetrics"]
      : ioTSecuritySolutionAnalyticsModelPropertiesDevicesMetricsItemArrayDeserializer(
          item["devicesMetrics"],
        ),
    topAlertedDevices: !item["topAlertedDevices"]
      ? item["topAlertedDevices"]
      : ioTSecurityAlertedDeviceArrayDeserializer(item["topAlertedDevices"]),
    mostPrevalentDeviceAlerts: !item["mostPrevalentDeviceAlerts"]
      ? item["mostPrevalentDeviceAlerts"]
      : ioTSecurityDeviceAlertArrayDeserializer(item["mostPrevalentDeviceAlerts"]),
    mostPrevalentDeviceRecommendations: !item["mostPrevalentDeviceRecommendations"]
      ? item["mostPrevalentDeviceRecommendations"]
      : ioTSecurityDeviceRecommendationArrayDeserializer(
          item["mostPrevalentDeviceRecommendations"],
        ),
  };
}

export function _ioTSecuritySolutionModelPropertiesSerializer(item: IoTSecuritySolutionModel): any {
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
      : userDefinedResourcesPropertiesSerializer(item["userDefinedResources"]),
    recommendationsConfiguration: !item["recommendationsConfiguration"]
      ? item["recommendationsConfiguration"]
      : recommendationConfigurationPropertiesArraySerializer(item["recommendationsConfiguration"]),
    unmaskedIpLoggingStatus: item["unmaskedIpLoggingStatus"],
    additionalWorkspaces: !item["additionalWorkspaces"]
      ? item["additionalWorkspaces"]
      : additionalWorkspacesPropertiesArraySerializer(item["additionalWorkspaces"]),
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
      : userDefinedResourcesPropertiesDeserializer(item["userDefinedResources"]),
    autoDiscoveredResources: !item["autoDiscoveredResources"]
      ? item["autoDiscoveredResources"]
      : item["autoDiscoveredResources"].map((p: any) => {
          return p;
        }),
    recommendationsConfiguration: !item["recommendationsConfiguration"]
      ? item["recommendationsConfiguration"]
      : recommendationConfigurationPropertiesArrayDeserializer(
          item["recommendationsConfiguration"],
        ),
    unmaskedIpLoggingStatus: item["unmaskedIpLoggingStatus"],
    additionalWorkspaces: !item["additionalWorkspaces"]
      ? item["additionalWorkspaces"]
      : additionalWorkspacesPropertiesArrayDeserializer(item["additionalWorkspaces"]),
  };
}

export function _updateIotSecuritySolutionDataPropertiesSerializer(
  item: UpdateIotSecuritySolutionData,
): any {
  return {
    userDefinedResources: !item["userDefinedResources"]
      ? item["userDefinedResources"]
      : userDefinedResourcesPropertiesSerializer(item["userDefinedResources"]),
    recommendationsConfiguration: !item["recommendationsConfiguration"]
      ? item["recommendationsConfiguration"]
      : recommendationConfigurationPropertiesArraySerializer(item["recommendationsConfiguration"]),
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
      : ioTSecurityAggregatedAlertPropertiesTopDevicesListItemArrayDeserializer(
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
