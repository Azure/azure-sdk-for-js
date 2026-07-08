// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../static-helpers/serialization/check-prop-undefined.js";
import type { ProxyResource } from "../models.js";
import { systemDataDeserializer } from "../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** An Activity Log Alert rule resource. */
export interface ActivityLogAlertsApiActivityLogAlertResource extends ProxyResource {
  /** The tags of the resource. */
  tags?: Record<string, string>;
  /** The location of the resource. Azure Activity Log Alert rules are supported on Global, West Europe and North Europe regions. */
  location?: string;
  /** The tenant GUID. Must be provided for tenant-level and management group events rules. */
  tenantScope?: string;
  /** A list of resource IDs that will be used as prefixes. The alert will only apply to Activity Log events with resource IDs that fall under one of these prefixes. This list must include at least one item. */
  scopes?: string[];
  /** The condition that will cause this alert to activate. */
  condition?: ActivityLogAlertsApiAlertRuleAllOfCondition;
  /** The actions that will activate when the condition is met. */
  actions?: ActivityLogAlertsApiActionList;
  /** Indicates whether this Activity Log Alert rule is enabled. If an Activity Log Alert rule is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
  /** A description of this Activity Log Alert rule. */
  description?: string;
}

export function activityLogAlertsApiActivityLogAlertResourceSerializer(
  item: ActivityLogAlertsApiActivityLogAlertResource,
): any {
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

export function activityLogAlertsApiActivityLogAlertResourceDeserializer(
  item: any,
): ActivityLogAlertsApiActivityLogAlertResource {
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
export interface ActivityLogAlertsApiAlertRuleProperties {
  /** The tenant GUID. Must be provided for tenant-level and management group events rules. */
  tenantScope?: string;
  /** A list of resource IDs that will be used as prefixes. The alert will only apply to Activity Log events with resource IDs that fall under one of these prefixes. This list must include at least one item. */
  scopes?: string[];
  /** The condition that will cause this alert to activate. */
  condition: ActivityLogAlertsApiAlertRuleAllOfCondition;
  /** The actions that will activate when the condition is met. */
  actions: ActivityLogAlertsApiActionList;
  /** Indicates whether this Activity Log Alert rule is enabled. If an Activity Log Alert rule is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
  /** A description of this Activity Log Alert rule. */
  description?: string;
}

export function activityLogAlertsApiAlertRulePropertiesSerializer(
  item: ActivityLogAlertsApiAlertRuleProperties,
): any {
  return {
    tenantScope: item["tenantScope"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    condition: activityLogAlertsApiAlertRuleAllOfConditionSerializer(item["condition"]),
    actions: activityLogAlertsApiActionListSerializer(item["actions"]),
    enabled: item["enabled"],
    description: item["description"],
  };
}

export function activityLogAlertsApiAlertRulePropertiesDeserializer(
  item: any,
): ActivityLogAlertsApiAlertRuleProperties {
  return {
    tenantScope: item["tenantScope"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    condition: activityLogAlertsApiAlertRuleAllOfConditionDeserializer(item["condition"]),
    actions: activityLogAlertsApiActionListDeserializer(item["actions"]),
    enabled: item["enabled"],
    description: item["description"],
  };
}

/** An Activity Log Alert rule condition that is met when all its member conditions are met. */
export interface ActivityLogAlertsApiAlertRuleAllOfCondition {
  /** The list of Activity Log Alert rule conditions. */
  allOf: ActivityLogAlertsApiAlertRuleAnyOfOrLeafCondition[];
}

export function activityLogAlertsApiAlertRuleAllOfConditionSerializer(
  item: ActivityLogAlertsApiAlertRuleAllOfCondition,
): any {
  return { allOf: activityLogAlertsApiAlertRuleAnyOfOrLeafConditionArraySerializer(item["allOf"]) };
}

export function activityLogAlertsApiAlertRuleAllOfConditionDeserializer(
  item: any,
): ActivityLogAlertsApiAlertRuleAllOfCondition {
  return {
    allOf: activityLogAlertsApiAlertRuleAnyOfOrLeafConditionArrayDeserializer(item["allOf"]),
  };
}

export function activityLogAlertsApiAlertRuleAnyOfOrLeafConditionArraySerializer(
  result: Array<ActivityLogAlertsApiAlertRuleAnyOfOrLeafCondition>,
): any[] {
  return result.map((item) => {
    return activityLogAlertsApiAlertRuleAnyOfOrLeafConditionSerializer(item);
  });
}

export function activityLogAlertsApiAlertRuleAnyOfOrLeafConditionArrayDeserializer(
  result: Array<ActivityLogAlertsApiAlertRuleAnyOfOrLeafCondition>,
): any[] {
  return result.map((item) => {
    return activityLogAlertsApiAlertRuleAnyOfOrLeafConditionDeserializer(item);
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
export interface ActivityLogAlertsApiAlertRuleAnyOfOrLeafCondition extends ActivityLogAlertsApiAlertRuleLeafCondition {
  /** An Activity Log Alert rule condition that is met when at least one of its member leaf conditions are met. */
  anyOf?: ActivityLogAlertsApiAlertRuleLeafCondition[];
}

export function activityLogAlertsApiAlertRuleAnyOfOrLeafConditionSerializer(
  item: ActivityLogAlertsApiAlertRuleAnyOfOrLeafCondition,
): any {
  return {
    field: item["field"],
    equals: item["equals"],
    containsAny: !item["containsAny"]
      ? item["containsAny"]
      : item["containsAny"].map((p: any) => {
          return p;
        }),
    anyOf: !item["anyOf"]
      ? item["anyOf"]
      : activityLogAlertsApiAlertRuleLeafConditionArraySerializer(item["anyOf"]),
  };
}

export function activityLogAlertsApiAlertRuleAnyOfOrLeafConditionDeserializer(
  item: any,
): ActivityLogAlertsApiAlertRuleAnyOfOrLeafCondition {
  return {
    field: item["field"],
    equals: item["equals"],
    containsAny: !item["containsAny"]
      ? item["containsAny"]
      : item["containsAny"].map((p: any) => {
          return p;
        }),
    anyOf: !item["anyOf"]
      ? item["anyOf"]
      : activityLogAlertsApiAlertRuleLeafConditionArrayDeserializer(item["anyOf"]),
  };
}

export function activityLogAlertsApiAlertRuleLeafConditionArraySerializer(
  result: Array<ActivityLogAlertsApiAlertRuleLeafCondition>,
): any[] {
  return result.map((item) => {
    return activityLogAlertsApiAlertRuleLeafConditionSerializer(item);
  });
}

export function activityLogAlertsApiAlertRuleLeafConditionArrayDeserializer(
  result: Array<ActivityLogAlertsApiAlertRuleLeafCondition>,
): any[] {
  return result.map((item) => {
    return activityLogAlertsApiAlertRuleLeafConditionDeserializer(item);
  });
}

/**
 * An Activity Log Alert rule condition that is met by comparing the field and value of an Activity Log event.
 * This condition must contain 'field' and either 'equals' or 'containsAny'.
 */
export interface ActivityLogAlertsApiAlertRuleLeafCondition {
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

export function activityLogAlertsApiAlertRuleLeafConditionSerializer(
  item: ActivityLogAlertsApiAlertRuleLeafCondition,
): any {
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

export function activityLogAlertsApiAlertRuleLeafConditionDeserializer(
  item: any,
): ActivityLogAlertsApiAlertRuleLeafCondition {
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
export interface ActivityLogAlertsApiActionList {
  /** The list of the Action Groups. */
  actionGroups?: ActivityLogAlertsApiActivityLogAlertActionGroup[];
}

export function activityLogAlertsApiActionListSerializer(
  item: ActivityLogAlertsApiActionList,
): any {
  return {
    actionGroups: !item["actionGroups"]
      ? item["actionGroups"]
      : activityLogAlertsApiActivityLogAlertActionGroupArraySerializer(item["actionGroups"]),
  };
}

export function activityLogAlertsApiActionListDeserializer(
  item: any,
): ActivityLogAlertsApiActionList {
  return {
    actionGroups: !item["actionGroups"]
      ? item["actionGroups"]
      : activityLogAlertsApiActivityLogAlertActionGroupArrayDeserializer(item["actionGroups"]),
  };
}

export function activityLogAlertsApiActivityLogAlertActionGroupArraySerializer(
  result: Array<ActivityLogAlertsApiActivityLogAlertActionGroup>,
): any[] {
  return result.map((item) => {
    return activityLogAlertsApiActivityLogAlertActionGroupSerializer(item);
  });
}

export function activityLogAlertsApiActivityLogAlertActionGroupArrayDeserializer(
  result: Array<ActivityLogAlertsApiActivityLogAlertActionGroup>,
): any[] {
  return result.map((item) => {
    return activityLogAlertsApiActivityLogAlertActionGroupDeserializer(item);
  });
}

/** A pointer to an Azure Action Group. */
export interface ActivityLogAlertsApiActivityLogAlertActionGroup {
  /** The resource ID of the Action Group. This cannot be null or empty. */
  actionGroupId: string;
  /** the dictionary of custom properties to include with the post operation. These data are appended to the webhook payload. */
  webhookProperties?: Record<string, string>;
  /** Predefined list of properties and configuration items for the action group. */
  actionProperties?: Record<string, string>;
}

export function activityLogAlertsApiActivityLogAlertActionGroupSerializer(
  item: ActivityLogAlertsApiActivityLogAlertActionGroup,
): any {
  return {
    actionGroupId: item["actionGroupId"],
    webhookProperties: item["webhookProperties"],
    actionProperties: item["actionProperties"],
  };
}

export function activityLogAlertsApiActivityLogAlertActionGroupDeserializer(
  item: any,
): ActivityLogAlertsApiActivityLogAlertActionGroup {
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
export interface ActivityLogAlertsApiActivityLogAlertErrorResponse {
  /** The error code. */
  readonly code?: string;
  /** The error message indicating why the operation failed. */
  readonly message?: string;
}

export function activityLogAlertsApiActivityLogAlertErrorResponseDeserializer(
  item: any,
): ActivityLogAlertsApiActivityLogAlertErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** An Activity Log Alert rule object for the body of patch operations. */
export interface ActivityLogAlertsApiAlertRulePatchObject {
  /** The resource tags */
  tags?: Record<string, string>;
  /** Indicates whether this Activity Log Alert rule is enabled. If an Activity Log Alert rule is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function activityLogAlertsApiAlertRulePatchObjectSerializer(
  item: ActivityLogAlertsApiAlertRulePatchObject,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _alertRulePatchObjectPropertiesSerializer(item),
  };
}

/** An Activity Log Alert rule properties for patch operations. */
export interface ActivityLogAlertsApiAlertRulePatchProperties {
  /** Indicates whether this Activity Log Alert rule is enabled. If an Activity Log Alert rule is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function activityLogAlertsApiAlertRulePatchPropertiesSerializer(
  item: ActivityLogAlertsApiAlertRulePatchProperties,
): any {
  return { enabled: item["enabled"] };
}

/** A list of Activity Log Alert rules. */
export interface _ActivityLogAlertsApiAlertRuleList {
  /** The ActivityLogAlertResource items on this page */
  value: ActivityLogAlertsApiActivityLogAlertResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _activityLogAlertsApiAlertRuleListDeserializer(
  item: any,
): _ActivityLogAlertsApiAlertRuleList {
  return {
    value: activityLogAlertsApiActivityLogAlertResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function activityLogAlertsApiActivityLogAlertResourceArraySerializer(
  result: Array<ActivityLogAlertsApiActivityLogAlertResource>,
): any[] {
  return result.map((item) => {
    return activityLogAlertsApiActivityLogAlertResourceSerializer(item);
  });
}

export function activityLogAlertsApiActivityLogAlertResourceArrayDeserializer(
  result: Array<ActivityLogAlertsApiActivityLogAlertResource>,
): any[] {
  return result.map((item) => {
    return activityLogAlertsApiActivityLogAlertResourceDeserializer(item);
  });
}

export function _activityLogAlertResourcePropertiesSerializer(
  item: ActivityLogAlertsApiActivityLogAlertResource,
): any {
  return {
    tenantScope: item["tenantScope"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    condition: !item["condition"]
      ? item["condition"]
      : activityLogAlertsApiAlertRuleAllOfConditionSerializer(item["condition"]),
    actions: !item["actions"]
      ? item["actions"]
      : activityLogAlertsApiActionListSerializer(item["actions"]),
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
      : activityLogAlertsApiAlertRuleAllOfConditionDeserializer(item["condition"]),
    actions: !item["actions"]
      ? item["actions"]
      : activityLogAlertsApiActionListDeserializer(item["actions"]),
    enabled: item["enabled"],
    description: item["description"],
  };
}

export function _alertRulePatchObjectPropertiesSerializer(
  item: ActivityLogAlertsApiAlertRulePatchObject,
): any {
  return { enabled: item["enabled"] };
}
