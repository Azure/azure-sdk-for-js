// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { Resource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An Activity Log Alert rule resource. */
export interface ActivityLogAlertResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** The tenant GUID. Must be provided for tenant-level and management group events rules. */
  tenantScope?: string;
  /** A list of resource IDs that will be used as prefixes. The alert will only apply to Activity Log events with resource IDs that fall under one of these prefixes. This list must include at least one item. */
  scopes?: string[];
  /** The condition that will cause this alert to activate. */
  condition?: AlertRuleAllOfCondition;
  /** The actions that will activate when the condition is met. */
  actions?: ActionList;
  /** Indicates whether this Activity Log Alert rule is enabled. If an Activity Log Alert rule is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
  /** A description of this Activity Log Alert rule. */
  description?: string;
}

export function activityLogAlertResourceSerializer(item: ActivityLogAlertResource): any {
  return {
    properties: areAllPropsUndefined(item, [
      "tenantScope",
      "scopes",
      "condition",
      "actions",
      "enabled",
      "description",
    ])
      ? undefined
      : _activityLogAlertResourcePropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
  };
}

export function activityLogAlertResourceDeserializer(item: any): ActivityLogAlertResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _activityLogAlertResourcePropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** An Azure Activity Log Alert rule. */
export interface AlertRuleProperties {
  /** The tenant GUID. Must be provided for tenant-level and management group events rules. */
  tenantScope?: string;
  /** A list of resource IDs that will be used as prefixes. The alert will only apply to Activity Log events with resource IDs that fall under one of these prefixes. This list must include at least one item. */
  scopes?: string[];
  /** The condition that will cause this alert to activate. */
  condition: AlertRuleAllOfCondition;
  /** The actions that will activate when the condition is met. */
  actions: ActionList;
  /** Indicates whether this Activity Log Alert rule is enabled. If an Activity Log Alert rule is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
  /** A description of this Activity Log Alert rule. */
  description?: string;
}

export function alertRulePropertiesSerializer(item: AlertRuleProperties): any {
  return {
    tenantScope: item["tenantScope"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    condition: alertRuleAllOfConditionSerializer(item["condition"]),
    actions: actionListSerializer(item["actions"]),
    enabled: item["enabled"],
    description: item["description"],
  };
}

export function alertRulePropertiesDeserializer(item: any): AlertRuleProperties {
  return {
    tenantScope: item["tenantScope"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    condition: alertRuleAllOfConditionDeserializer(item["condition"]),
    actions: actionListDeserializer(item["actions"]),
    enabled: item["enabled"],
    description: item["description"],
  };
}

/** An Activity Log Alert rule condition that is met when all its member conditions are met. */
export interface AlertRuleAllOfCondition {
  /** The list of Activity Log Alert rule conditions. */
  allOf: AlertRuleAnyOfOrLeafCondition[];
}

export function alertRuleAllOfConditionSerializer(item: AlertRuleAllOfCondition): any {
  return { allOf: alertRuleAnyOfOrLeafConditionArraySerializer(item["allOf"]) };
}

export function alertRuleAllOfConditionDeserializer(item: any): AlertRuleAllOfCondition {
  return {
    allOf: alertRuleAnyOfOrLeafConditionArrayDeserializer(item["allOf"]),
  };
}

export function alertRuleAnyOfOrLeafConditionArraySerializer(
  result: Array<AlertRuleAnyOfOrLeafCondition>,
): any[] {
  return result.map((item) => {
    return alertRuleAnyOfOrLeafConditionSerializer(item);
  });
}

export function alertRuleAnyOfOrLeafConditionArrayDeserializer(
  result: Array<AlertRuleAnyOfOrLeafCondition>,
): any[] {
  return result.map((item) => {
    return alertRuleAnyOfOrLeafConditionDeserializer(item);
  });
}

/**
 * An Activity Log Alert rule condition that is met when all its member conditions are met.
 * Each condition can be of one of the following types:
 * __Important__: Each type has its unique subset of properties. Properties from different types CANNOT exist in one condition.
 * * __Leaf Condition -__ must contain 'field' and either 'equals' or 'containsAny'.
 * _Please note, 'anyOf' should __not__ be set in a Leaf Condition._
 * * __AnyOf Condition -__ must contain __only__ 'anyOf' (which is an array of Leaf Conditions).
 * _Please note, 'field', 'equals' and 'containsAny' should __not__ be set in an AnyOf Condition._
 */
export interface AlertRuleAnyOfOrLeafCondition extends AlertRuleLeafCondition {
  /** An Activity Log Alert rule condition that is met when at least one of its member leaf conditions are met. */
  anyOf?: AlertRuleLeafCondition[];
}

export function alertRuleAnyOfOrLeafConditionSerializer(item: AlertRuleAnyOfOrLeafCondition): any {
  return {
    field: item["field"],
    equals: item["equals"],
    containsAny: !item["containsAny"]
      ? item["containsAny"]
      : item["containsAny"].map((p: any) => {
          return p;
        }),
    anyOf: !item["anyOf"] ? item["anyOf"] : alertRuleLeafConditionArraySerializer(item["anyOf"]),
  };
}

export function alertRuleAnyOfOrLeafConditionDeserializer(
  item: any,
): AlertRuleAnyOfOrLeafCondition {
  return {
    field: item["field"],
    equals: item["equals"],
    containsAny: !item["containsAny"]
      ? item["containsAny"]
      : item["containsAny"].map((p: any) => {
          return p;
        }),
    anyOf: !item["anyOf"] ? item["anyOf"] : alertRuleLeafConditionArrayDeserializer(item["anyOf"]),
  };
}

export function alertRuleLeafConditionArraySerializer(
  result: Array<AlertRuleLeafCondition>,
): any[] {
  return result.map((item) => {
    return alertRuleLeafConditionSerializer(item);
  });
}

export function alertRuleLeafConditionArrayDeserializer(
  result: Array<AlertRuleLeafCondition>,
): any[] {
  return result.map((item) => {
    return alertRuleLeafConditionDeserializer(item);
  });
}

/**
 * An Activity Log Alert rule condition that is met by comparing the field and value of an Activity Log event.
 * This condition must contain 'field' and either 'equals' or 'containsAny'.
 */
export interface AlertRuleLeafCondition {
  /**
   * The name of the Activity Log event's field that this condition will examine.
   * The possible values for this field are (case-insensitive): 'resourceId', 'category', 'caller', 'level', 'operationName', 'resourceGroup', 'resourceProvider', 'status', 'subStatus', 'resourceType', or anything beginning with 'properties'.
   */
  field?: string;
  /** The value of the event's field will be compared to this value (case-insensitive) to determine if the condition is met. */
  equals?: string;
  /** The value of the event's field will be compared to the values in this array (case-insensitive) to determine if the condition is met. */
  containsAny?: string[];
}

export function alertRuleLeafConditionSerializer(item: AlertRuleLeafCondition): any {
  return {
    field: item["field"],
    equals: item["equals"],
    containsAny: !item["containsAny"]
      ? item["containsAny"]
      : item["containsAny"].map((p: any) => {
          return p;
        }),
  };
}

export function alertRuleLeafConditionDeserializer(item: any): AlertRuleLeafCondition {
  return {
    field: item["field"],
    equals: item["equals"],
    containsAny: !item["containsAny"]
      ? item["containsAny"]
      : item["containsAny"].map((p: any) => {
          return p;
        }),
  };
}

/** A list of Activity Log Alert rule actions. */
export interface ActionList {
  /** The list of the Action Groups. */
  actionGroups?: ActivityLogAlertActionGroup[];
}

export function actionListSerializer(item: ActionList): any {
  return {
    actionGroups: !item["actionGroups"]
      ? item["actionGroups"]
      : activityLogAlertActionGroupArraySerializer(item["actionGroups"]),
  };
}

export function actionListDeserializer(item: any): ActionList {
  return {
    actionGroups: !item["actionGroups"]
      ? item["actionGroups"]
      : activityLogAlertActionGroupArrayDeserializer(item["actionGroups"]),
  };
}

export function activityLogAlertActionGroupArraySerializer(
  result: Array<ActivityLogAlertActionGroup>,
): any[] {
  return result.map((item) => {
    return activityLogAlertActionGroupSerializer(item);
  });
}

export function activityLogAlertActionGroupArrayDeserializer(
  result: Array<ActivityLogAlertActionGroup>,
): any[] {
  return result.map((item) => {
    return activityLogAlertActionGroupDeserializer(item);
  });
}

/** A pointer to an Azure Action Group. */
export interface ActivityLogAlertActionGroup {
  /** The resource ID of the Action Group. This cannot be null or empty. */
  actionGroupId: string;
  /** the dictionary of custom properties to include with the post operation. These data are appended to the webhook payload. */
  webhookProperties?: Record<string, string>;
  /** Predefined list of properties and configuration items for the action group. */
  actionProperties?: Record<string, string>;
}

export function activityLogAlertActionGroupSerializer(item: ActivityLogAlertActionGroup): any {
  return {
    actionGroupId: item["actionGroupId"],
    webhookProperties: item["webhookProperties"],
    actionProperties: item["actionProperties"],
  };
}

export function activityLogAlertActionGroupDeserializer(item: any): ActivityLogAlertActionGroup {
  return {
    actionGroupId: item["actionGroupId"],
    webhookProperties: !item["webhookProperties"]
      ? item["webhookProperties"]
      : Object.fromEntries(
          Object.entries(item["webhookProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    actionProperties: !item["actionProperties"]
      ? item["actionProperties"]
      : Object.fromEntries(
          Object.entries(item["actionProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The error response. */
export interface ActivityLogAlertErrorResponse {
  /** The error code. */
  readonly code?: string;
  /** The error message indicating why the operation failed. */
  readonly message?: string;
}

export function activityLogAlertErrorResponseDeserializer(
  item: any,
): ActivityLogAlertErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** An Activity Log Alert rule object for the body of patch operations. */
export interface AlertRulePatchObject {
  /** The resource tags */
  tags?: Record<string, string>;
  /** Indicates whether this Activity Log Alert rule is enabled. If an Activity Log Alert rule is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function alertRulePatchObjectSerializer(item: AlertRulePatchObject): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _alertRulePatchObjectPropertiesSerializer(item),
  };
}

/** An Activity Log Alert rule properties for patch operations. */
export interface AlertRulePatchProperties {
  /** Indicates whether this Activity Log Alert rule is enabled. If an Activity Log Alert rule is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function alertRulePatchPropertiesSerializer(item: AlertRulePatchProperties): any {
  return { enabled: item["enabled"] };
}

/** A list of Activity Log Alert rules. */
export interface _AlertRuleList {
  /** The ActivityLogAlertResource items on this page */
  value: ActivityLogAlertResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertRuleListDeserializer(item: any): _AlertRuleList {
  return {
    value: activityLogAlertResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function activityLogAlertResourceArraySerializer(
  result: Array<ActivityLogAlertResource>,
): any[] {
  return result.map((item) => {
    return activityLogAlertResourceSerializer(item);
  });
}

export function activityLogAlertResourceArrayDeserializer(
  result: Array<ActivityLogAlertResource>,
): any[] {
  return result.map((item) => {
    return activityLogAlertResourceDeserializer(item);
  });
}

export function _activityLogAlertResourcePropertiesSerializer(item: ActivityLogAlertResource): any {
  return {
    tenantScope: item["tenantScope"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    condition: !item["condition"]
      ? item["condition"]
      : alertRuleAllOfConditionSerializer(item["condition"]),
    actions: !item["actions"] ? item["actions"] : actionListSerializer(item["actions"]),
    enabled: item["enabled"],
    description: item["description"],
  };
}

export function _activityLogAlertResourcePropertiesDeserializer(item: any) {
  return {
    tenantScope: item["tenantScope"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    condition: !item["condition"]
      ? item["condition"]
      : alertRuleAllOfConditionDeserializer(item["condition"]),
    actions: !item["actions"] ? item["actions"] : actionListDeserializer(item["actions"]),
    enabled: item["enabled"],
    description: item["description"],
  };
}

export function _alertRulePatchObjectPropertiesSerializer(item: AlertRulePatchObject): any {
  return { enabled: item["enabled"] };
}
