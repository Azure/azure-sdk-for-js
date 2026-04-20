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
export interface MicrosoftActivityLogAlertsActivityLogAlertResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** The tenant GUID. Must be provided for tenant-level and management group events rules. */
  tenantScope?: string;
  /** A list of resource IDs that will be used as prefixes. The alert will only apply to Activity Log events with resource IDs that fall under one of these prefixes. This list must include at least one item. */
  scopes?: string[];
  /** The condition that will cause this alert to activate. */
  condition?: MicrosoftActivityLogAlertsAlertRuleAllOfCondition;
  /** The actions that will activate when the condition is met. */
  actions?: MicrosoftActivityLogAlertsActionList;
  /** Indicates whether this Activity Log Alert rule is enabled. If an Activity Log Alert rule is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
  /** A description of this Activity Log Alert rule. */
  description?: string;
}

export function microsoftActivityLogAlertsActivityLogAlertResourceSerializer(
  item: MicrosoftActivityLogAlertsActivityLogAlertResource,
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

export function microsoftActivityLogAlertsActivityLogAlertResourceDeserializer(
  item: any,
): MicrosoftActivityLogAlertsActivityLogAlertResource {
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
export interface MicrosoftActivityLogAlertsAlertRuleProperties {
  /** The tenant GUID. Must be provided for tenant-level and management group events rules. */
  tenantScope?: string;
  /** A list of resource IDs that will be used as prefixes. The alert will only apply to Activity Log events with resource IDs that fall under one of these prefixes. This list must include at least one item. */
  scopes?: string[];
  /** The condition that will cause this alert to activate. */
  condition: MicrosoftActivityLogAlertsAlertRuleAllOfCondition;
  /** The actions that will activate when the condition is met. */
  actions: MicrosoftActivityLogAlertsActionList;
  /** Indicates whether this Activity Log Alert rule is enabled. If an Activity Log Alert rule is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
  /** A description of this Activity Log Alert rule. */
  description?: string;
}

export function microsoftActivityLogAlertsAlertRulePropertiesSerializer(
  item: MicrosoftActivityLogAlertsAlertRuleProperties,
): any {
  return {
    tenantScope: item["tenantScope"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    condition: microsoftActivityLogAlertsAlertRuleAllOfConditionSerializer(item["condition"]),
    actions: microsoftActivityLogAlertsActionListSerializer(item["actions"]),
    enabled: item["enabled"],
    description: item["description"],
  };
}

export function microsoftActivityLogAlertsAlertRulePropertiesDeserializer(
  item: any,
): MicrosoftActivityLogAlertsAlertRuleProperties {
  return {
    tenantScope: item["tenantScope"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
    condition: microsoftActivityLogAlertsAlertRuleAllOfConditionDeserializer(item["condition"]),
    actions: microsoftActivityLogAlertsActionListDeserializer(item["actions"]),
    enabled: item["enabled"],
    description: item["description"],
  };
}

/** An Activity Log Alert rule condition that is met when all its member conditions are met. */
export interface MicrosoftActivityLogAlertsAlertRuleAllOfCondition {
  /** The list of Activity Log Alert rule conditions. */
  allOf: MicrosoftActivityLogAlertsAlertRuleAnyOfOrLeafCondition[];
}

export function microsoftActivityLogAlertsAlertRuleAllOfConditionSerializer(
  item: MicrosoftActivityLogAlertsAlertRuleAllOfCondition,
): any {
  return {
    allOf: microsoftActivityLogAlertsAlertRuleAnyOfOrLeafConditionArraySerializer(item["allOf"]),
  };
}

export function microsoftActivityLogAlertsAlertRuleAllOfConditionDeserializer(
  item: any,
): MicrosoftActivityLogAlertsAlertRuleAllOfCondition {
  return {
    allOf: microsoftActivityLogAlertsAlertRuleAnyOfOrLeafConditionArrayDeserializer(item["allOf"]),
  };
}

export function microsoftActivityLogAlertsAlertRuleAnyOfOrLeafConditionArraySerializer(
  result: Array<MicrosoftActivityLogAlertsAlertRuleAnyOfOrLeafCondition>,
): any[] {
  return result.map((item) => {
    return microsoftActivityLogAlertsAlertRuleAnyOfOrLeafConditionSerializer(item);
  });
}

export function microsoftActivityLogAlertsAlertRuleAnyOfOrLeafConditionArrayDeserializer(
  result: Array<MicrosoftActivityLogAlertsAlertRuleAnyOfOrLeafCondition>,
): any[] {
  return result.map((item) => {
    return microsoftActivityLogAlertsAlertRuleAnyOfOrLeafConditionDeserializer(item);
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
export interface MicrosoftActivityLogAlertsAlertRuleAnyOfOrLeafCondition extends MicrosoftActivityLogAlertsAlertRuleLeafCondition {
  /** An Activity Log Alert rule condition that is met when at least one of its member leaf conditions are met. */
  anyOf?: MicrosoftActivityLogAlertsAlertRuleLeafCondition[];
}

export function microsoftActivityLogAlertsAlertRuleAnyOfOrLeafConditionSerializer(
  item: MicrosoftActivityLogAlertsAlertRuleAnyOfOrLeafCondition,
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
      : microsoftActivityLogAlertsAlertRuleLeafConditionArraySerializer(item["anyOf"]),
  };
}

export function microsoftActivityLogAlertsAlertRuleAnyOfOrLeafConditionDeserializer(
  item: any,
): MicrosoftActivityLogAlertsAlertRuleAnyOfOrLeafCondition {
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
      : microsoftActivityLogAlertsAlertRuleLeafConditionArrayDeserializer(item["anyOf"]),
  };
}

export function microsoftActivityLogAlertsAlertRuleLeafConditionArraySerializer(
  result: Array<MicrosoftActivityLogAlertsAlertRuleLeafCondition>,
): any[] {
  return result.map((item) => {
    return microsoftActivityLogAlertsAlertRuleLeafConditionSerializer(item);
  });
}

export function microsoftActivityLogAlertsAlertRuleLeafConditionArrayDeserializer(
  result: Array<MicrosoftActivityLogAlertsAlertRuleLeafCondition>,
): any[] {
  return result.map((item) => {
    return microsoftActivityLogAlertsAlertRuleLeafConditionDeserializer(item);
  });
}

/**
 * An Activity Log Alert rule condition that is met by comparing the field and value of an Activity Log event.
 * This condition must contain 'field' and either 'equals' or 'containsAny'.
 */
export interface MicrosoftActivityLogAlertsAlertRuleLeafCondition {
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

export function microsoftActivityLogAlertsAlertRuleLeafConditionSerializer(
  item: MicrosoftActivityLogAlertsAlertRuleLeafCondition,
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

export function microsoftActivityLogAlertsAlertRuleLeafConditionDeserializer(
  item: any,
): MicrosoftActivityLogAlertsAlertRuleLeafCondition {
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
export interface MicrosoftActivityLogAlertsActionList {
  /** The list of the Action Groups. */
  actionGroups?: MicrosoftActivityLogAlertsActionGroup[];
}

export function microsoftActivityLogAlertsActionListSerializer(
  item: MicrosoftActivityLogAlertsActionList,
): any {
  return {
    actionGroups: !item["actionGroups"]
      ? item["actionGroups"]
      : microsoftActivityLogAlertsActionGroupArraySerializer(item["actionGroups"]),
  };
}

export function microsoftActivityLogAlertsActionListDeserializer(
  item: any,
): MicrosoftActivityLogAlertsActionList {
  return {
    actionGroups: !item["actionGroups"]
      ? item["actionGroups"]
      : microsoftActivityLogAlertsActionGroupArrayDeserializer(item["actionGroups"]),
  };
}

export function microsoftActivityLogAlertsActionGroupArraySerializer(
  result: Array<MicrosoftActivityLogAlertsActionGroup>,
): any[] {
  return result.map((item) => {
    return microsoftActivityLogAlertsActionGroupSerializer(item);
  });
}

export function microsoftActivityLogAlertsActionGroupArrayDeserializer(
  result: Array<MicrosoftActivityLogAlertsActionGroup>,
): any[] {
  return result.map((item) => {
    return microsoftActivityLogAlertsActionGroupDeserializer(item);
  });
}

/** A pointer to an Azure Action Group. */
export interface MicrosoftActivityLogAlertsActionGroup {
  /** The resource ID of the Action Group. This cannot be null or empty. */
  actionGroupId: string;
  /** the dictionary of custom properties to include with the post operation. These data are appended to the webhook payload. */
  webhookProperties?: Record<string, string>;
  /** Predefined list of properties and configuration items for the action group. */
  actionProperties?: Record<string, string>;
}

export function microsoftActivityLogAlertsActionGroupSerializer(
  item: MicrosoftActivityLogAlertsActionGroup,
): any {
  return {
    actionGroupId: item["actionGroupId"],
    webhookProperties: item["webhookProperties"],
    actionProperties: item["actionProperties"],
  };
}

export function microsoftActivityLogAlertsActionGroupDeserializer(
  item: any,
): MicrosoftActivityLogAlertsActionGroup {
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
export interface MicrosoftActivityLogAlertsErrorResponse {
  /** The error code. */
  readonly code?: string;
  /** The error message indicating why the operation failed. */
  readonly message?: string;
}

export function microsoftActivityLogAlertsErrorResponseDeserializer(
  item: any,
): MicrosoftActivityLogAlertsErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** An Activity Log Alert rule object for the body of patch operations. */
export interface MicrosoftActivityLogAlertsAlertRulePatchObject {
  /** The resource tags */
  tags?: Record<string, string>;
  /** Indicates whether this Activity Log Alert rule is enabled. If an Activity Log Alert rule is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function microsoftActivityLogAlertsAlertRulePatchObjectSerializer(
  item: MicrosoftActivityLogAlertsAlertRulePatchObject,
): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _alertRulePatchObjectPropertiesSerializer(item),
  };
}

/** An Activity Log Alert rule properties for patch operations. */
export interface MicrosoftActivityLogAlertsAlertRulePatchProperties {
  /** Indicates whether this Activity Log Alert rule is enabled. If an Activity Log Alert rule is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function microsoftActivityLogAlertsAlertRulePatchPropertiesSerializer(
  item: MicrosoftActivityLogAlertsAlertRulePatchProperties,
): any {
  return { enabled: item["enabled"] };
}

/** A list of Activity Log Alert rules. */
export interface _MicrosoftActivityLogAlertsAlertRuleList {
  /** The ActivityLogAlertResource items on this page */
  value: MicrosoftActivityLogAlertsActivityLogAlertResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _microsoftActivityLogAlertsAlertRuleListDeserializer(
  item: any,
): _MicrosoftActivityLogAlertsAlertRuleList {
  return {
    value: microsoftActivityLogAlertsActivityLogAlertResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function microsoftActivityLogAlertsActivityLogAlertResourceArraySerializer(
  result: Array<MicrosoftActivityLogAlertsActivityLogAlertResource>,
): any[] {
  return result.map((item) => {
    return microsoftActivityLogAlertsActivityLogAlertResourceSerializer(item);
  });
}

export function microsoftActivityLogAlertsActivityLogAlertResourceArrayDeserializer(
  result: Array<MicrosoftActivityLogAlertsActivityLogAlertResource>,
): any[] {
  return result.map((item) => {
    return microsoftActivityLogAlertsActivityLogAlertResourceDeserializer(item);
  });
}

export function _activityLogAlertResourcePropertiesSerializer(
  item: MicrosoftActivityLogAlertsActivityLogAlertResource,
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
      : microsoftActivityLogAlertsAlertRuleAllOfConditionSerializer(item["condition"]),
    actions: !item["actions"]
      ? item["actions"]
      : microsoftActivityLogAlertsActionListSerializer(item["actions"]),
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
      : microsoftActivityLogAlertsAlertRuleAllOfConditionDeserializer(item["condition"]),
    actions: !item["actions"]
      ? item["actions"]
      : microsoftActivityLogAlertsActionListDeserializer(item["actions"]),
    enabled: item["enabled"],
    description: item["description"],
  };
}

export function _alertRulePatchObjectPropertiesSerializer(
  item: MicrosoftActivityLogAlertsAlertRulePatchObject,
): any {
  return { enabled: item["enabled"] };
}
