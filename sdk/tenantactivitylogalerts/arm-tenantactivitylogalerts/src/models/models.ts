// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A list of Tenant Activity Log Alert rules. */
export interface _TenantAlertRuleList {
  /** The TenantActivityLogAlertResource items on this page */
  value: TenantActivityLogAlertResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _tenantAlertRuleListDeserializer(item: any): _TenantAlertRuleList {
  return {
    value: tenantActivityLogAlertResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tenantActivityLogAlertResourceArraySerializer(
  result: Array<TenantActivityLogAlertResource>,
): any[] {
  return result.map((item) => {
    return tenantActivityLogAlertResourceSerializer(item);
  });
}

export function tenantActivityLogAlertResourceArrayDeserializer(
  result: Array<TenantActivityLogAlertResource>,
): any[] {
  return result.map((item) => {
    return tenantActivityLogAlertResourceDeserializer(item);
  });
}

/** A Tenant Activity Log Alert rule resource. */
export interface TenantActivityLogAlertResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
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

export function tenantActivityLogAlertResourceSerializer(
  item: TenantActivityLogAlertResource,
): any {
  return {
    properties: _tenantActivityLogAlertResourcePropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
  };
}

export function tenantActivityLogAlertResourceDeserializer(
  item: any,
): TenantActivityLogAlertResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._tenantActivityLogAlertResourcePropertiesDeserializer(item["properties"]),
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
  actionGroups?: ActionGroup[];
}

export function actionListSerializer(item: ActionList): any {
  return {
    actionGroups: !item["actionGroups"]
      ? item["actionGroups"]
      : actionGroupArraySerializer(item["actionGroups"]),
  };
}

export function actionListDeserializer(item: any): ActionList {
  return {
    actionGroups: !item["actionGroups"]
      ? item["actionGroups"]
      : actionGroupArrayDeserializer(item["actionGroups"]),
  };
}

export function actionGroupArraySerializer(result: Array<ActionGroup>): any[] {
  return result.map((item) => {
    return actionGroupSerializer(item);
  });
}

export function actionGroupArrayDeserializer(result: Array<ActionGroup>): any[] {
  return result.map((item) => {
    return actionGroupDeserializer(item);
  });
}

/** A pointer to an Azure Action Group. */
export interface ActionGroup {
  /** The resource ID of the Action Group. This cannot be null or empty. */
  actionGroupId: string;
  /** the dictionary of custom properties to include with the post operation. These data are appended to the webhook payload. */
  webhookProperties?: Record<string, string>;
  /** Predefined list of properties and configuration items for the action group. */
  actionProperties?: Record<string, string>;
}

export function actionGroupSerializer(item: ActionGroup): any {
  return {
    actionGroupId: item["actionGroupId"],
    webhookProperties: item["webhookProperties"],
    actionProperties: item["actionProperties"],
  };
}

export function actionGroupDeserializer(item: any): ActionGroup {
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

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(item: Resource): any {
  return item;
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** An Activity Log Alert rule object for the body of patch operations. */
export interface TenantAlertRulePatchObject {
  /** The resource tags */
  tags?: Record<string, string>;
  /** Indicates whether this Activity Log Alert rule is enabled. If an Activity Log Alert rule is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function tenantAlertRulePatchObjectSerializer(item: TenantAlertRulePatchObject): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _tenantAlertRulePatchObjectPropertiesSerializer(item),
  };
}

/** An Activity Log Alert rule properties for patch operations. */
export interface TenantAlertRulePatchProperties {
  /** Indicates whether this Activity Log Alert rule is enabled. If an Activity Log Alert rule is not enabled, then none of its actions will be activated. */
  enabled?: boolean;
}

export function tenantAlertRulePatchPropertiesSerializer(
  item: TenantAlertRulePatchProperties,
): any {
  return { enabled: item["enabled"] };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-04-01-preview API version. */
  V20230401Preview = "2023-04-01-preview",
}

export function _tenantActivityLogAlertResourcePropertiesSerializer(
  item: TenantActivityLogAlertResource,
): any {
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

export function _tenantActivityLogAlertResourcePropertiesDeserializer(item: any) {
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

export function _tenantAlertRulePatchObjectPropertiesSerializer(
  item: TenantAlertRulePatchObject,
): any {
  return { enabled: item["enabled"] };
}
