// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Alert processing rule object containing target scopes, conditions and scheduling logic. */
export interface AlertProcessingRule extends TrackedResource {
  /** Alert processing rule properties. */
  properties?: AlertProcessingRuleProperties;
}

export function alertProcessingRuleSerializer(item: AlertProcessingRule): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : alertProcessingRulePropertiesSerializer(item["properties"]),
  };
}

export function alertProcessingRuleDeserializer(item: any): AlertProcessingRule {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : alertProcessingRulePropertiesDeserializer(item["properties"]),
  };
}

/** Alert processing rule properties defining scopes, conditions and scheduling logic for alert processing rule. */
export interface AlertProcessingRuleProperties {
  /** Scopes on which alert processing rule will apply. */
  scopes: string[];
  /** Conditions on which alerts will be filtered. */
  conditions?: Condition[];
  /** Scheduling for alert processing rule. */
  schedule?: Schedule;
  /** Actions to be applied. */
  actions: ActionUnion[];
  /** Actions to be applied.Description of alert processing rule. */
  description?: string;
  /** Indicates if the given alert processing rule is enabled or disabled. */
  enabled?: boolean;
}

export function alertProcessingRulePropertiesSerializer(item: AlertProcessingRuleProperties): any {
  return {
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionArraySerializer(item["conditions"]),
    schedule: !item["schedule"] ? item["schedule"] : scheduleSerializer(item["schedule"]),
    actions: actionUnionArraySerializer(item["actions"]),
    description: item["description"],
    enabled: item["enabled"],
  };
}

export function alertProcessingRulePropertiesDeserializer(
  item: any,
): AlertProcessingRuleProperties {
  return {
    scopes: item["scopes"].map((p: any) => {
      return p;
    }),
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionArrayDeserializer(item["conditions"]),
    schedule: !item["schedule"] ? item["schedule"] : scheduleDeserializer(item["schedule"]),
    actions: actionUnionArrayDeserializer(item["actions"]),
    description: item["description"],
    enabled: item["enabled"],
  };
}

export function conditionArraySerializer(result: Array<Condition>): any[] {
  return result.map((item) => {
    return conditionSerializer(item);
  });
}

export function conditionArrayDeserializer(result: Array<Condition>): any[] {
  return result.map((item) => {
    return conditionDeserializer(item);
  });
}

/** Condition to trigger an alert processing rule. */
export interface Condition {
  /** Field for a given condition. */
  field?: Field;
  /** Operator for a given condition. */
  operator?: Operator;
  /** List of values to match for a given condition. */
  values?: string[];
}

export function conditionSerializer(item: Condition): any {
  return {
    field: item["field"],
    operator: item["operator"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function conditionDeserializer(item: any): Condition {
  return {
    field: item["field"],
    operator: item["operator"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** Field for a given condition. */
export enum KnownField {
  /** Severity */
  Severity = "Severity",
  /** MonitorService */
  MonitorService = "MonitorService",
  /** MonitorCondition */
  MonitorCondition = "MonitorCondition",
  /** SignalType */
  SignalType = "SignalType",
  /** TargetResourceType */
  TargetResourceType = "TargetResourceType",
  /** TargetResource */
  TargetResource = "TargetResource",
  /** TargetResourceGroup */
  TargetResourceGroup = "TargetResourceGroup",
  /** AlertRuleId */
  AlertRuleId = "AlertRuleId",
  /** AlertRuleName */
  AlertRuleName = "AlertRuleName",
  /** Description */
  Description = "Description",
  /** AlertContext */
  AlertContext = "AlertContext",
}

/**
 * Field for a given condition. \
 * {@link KnownField} can be used interchangeably with Field,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Severity**: Severity \
 * **MonitorService**: MonitorService \
 * **MonitorCondition**: MonitorCondition \
 * **SignalType**: SignalType \
 * **TargetResourceType**: TargetResourceType \
 * **TargetResource**: TargetResource \
 * **TargetResourceGroup**: TargetResourceGroup \
 * **AlertRuleId**: AlertRuleId \
 * **AlertRuleName**: AlertRuleName \
 * **Description**: Description \
 * **AlertContext**: AlertContext
 */
export type Field = string;

/** Operator for a given condition. */
export enum KnownOperator {
  /** Equals */
  Equals = "Equals",
  /** NotEquals */
  NotEquals = "NotEquals",
  /** Contains */
  Contains = "Contains",
  /** DoesNotContain */
  DoesNotContain = "DoesNotContain",
}

/**
 * Operator for a given condition. \
 * {@link KnownOperator} can be used interchangeably with Operator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Equals**: Equals \
 * **NotEquals**: NotEquals \
 * **Contains**: Contains \
 * **DoesNotContain**: DoesNotContain
 */
export type Operator = string;

/** Scheduling configuration for a given alert processing rule. */
export interface Schedule {
  /** Scheduling effective from time. Date-Time in ISO-8601 format without timezone suffix. */
  effectiveFrom?: string;
  /** Scheduling effective until time. Date-Time in ISO-8601 format without timezone suffix. */
  effectiveUntil?: string;
  /** Scheduling time zone. */
  timeZone?: string;
  /** List of recurrences. */
  recurrences?: RecurrenceUnion[];
}

export function scheduleSerializer(item: Schedule): any {
  return {
    effectiveFrom: item["effectiveFrom"],
    effectiveUntil: item["effectiveUntil"],
    timeZone: item["timeZone"],
    recurrences: !item["recurrences"]
      ? item["recurrences"]
      : recurrenceUnionArraySerializer(item["recurrences"]),
  };
}

export function scheduleDeserializer(item: any): Schedule {
  return {
    effectiveFrom: item["effectiveFrom"],
    effectiveUntil: item["effectiveUntil"],
    timeZone: item["timeZone"],
    recurrences: !item["recurrences"]
      ? item["recurrences"]
      : recurrenceUnionArrayDeserializer(item["recurrences"]),
  };
}

export function recurrenceUnionArraySerializer(result: Array<RecurrenceUnion>): any[] {
  return result.map((item) => {
    return recurrenceUnionSerializer(item);
  });
}

export function recurrenceUnionArrayDeserializer(result: Array<RecurrenceUnion>): any[] {
  return result.map((item) => {
    return recurrenceUnionDeserializer(item);
  });
}

/** Recurrence object. */
export interface Recurrence {
  /** Specifies when the recurrence should be applied. */
  /** The discriminator possible values: Daily, Weekly, Monthly */
  recurrenceType: RecurrenceType;
  /** Start time for recurrence. */
  startTime?: string;
  /** End time for recurrence. */
  endTime?: string;
}

export function recurrenceSerializer(item: Recurrence): any {
  return {
    recurrenceType: item["recurrenceType"],
    startTime: item["startTime"],
    endTime: item["endTime"],
  };
}

export function recurrenceDeserializer(item: any): Recurrence {
  return {
    recurrenceType: item["recurrenceType"],
    startTime: item["startTime"],
    endTime: item["endTime"],
  };
}

/** Alias for RecurrenceUnion */
export type RecurrenceUnion = DailyRecurrence | WeeklyRecurrence | MonthlyRecurrence | Recurrence;

export function recurrenceUnionSerializer(item: RecurrenceUnion): any {
  switch (item.recurrenceType) {
    case "Daily":
      return dailyRecurrenceSerializer(item as DailyRecurrence);

    case "Weekly":
      return weeklyRecurrenceSerializer(item as WeeklyRecurrence);

    case "Monthly":
      return monthlyRecurrenceSerializer(item as MonthlyRecurrence);

    default:
      return recurrenceSerializer(item);
  }
}

export function recurrenceUnionDeserializer(item: any): RecurrenceUnion {
  switch (item["recurrenceType"]) {
    case "Daily":
      return dailyRecurrenceDeserializer(item as DailyRecurrence);

    case "Weekly":
      return weeklyRecurrenceDeserializer(item as WeeklyRecurrence);

    case "Monthly":
      return monthlyRecurrenceDeserializer(item as MonthlyRecurrence);

    default:
      return recurrenceDeserializer(item);
  }
}

/** Specifies when the recurrence should be applied. */
export enum KnownRecurrenceType {
  /** Daily */
  Daily = "Daily",
  /** Weekly */
  Weekly = "Weekly",
  /** Monthly */
  Monthly = "Monthly",
}

/**
 * Specifies when the recurrence should be applied. \
 * {@link KnownRecurrenceType} can be used interchangeably with RecurrenceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Daily**: Daily \
 * **Weekly**: Weekly \
 * **Monthly**: Monthly
 */
export type RecurrenceType = string;

/** Daily recurrence object. */
export interface DailyRecurrence extends Recurrence {
  /** Specifies when the recurrence should be applied. */
  recurrenceType: "Daily";
}

export function dailyRecurrenceSerializer(item: DailyRecurrence): any {
  return {
    recurrenceType: item["recurrenceType"],
    startTime: item["startTime"],
    endTime: item["endTime"],
  };
}

export function dailyRecurrenceDeserializer(item: any): DailyRecurrence {
  return {
    recurrenceType: item["recurrenceType"],
    startTime: item["startTime"],
    endTime: item["endTime"],
  };
}

/** Weekly recurrence object. */
export interface WeeklyRecurrence extends Recurrence {
  /** Specifies the values for weekly recurrence pattern. */
  daysOfWeek: DaysOfWeek[];
  /** Specifies when the recurrence should be applied. */
  recurrenceType: "Weekly";
}

export function weeklyRecurrenceSerializer(item: WeeklyRecurrence): any {
  return {
    recurrenceType: item["recurrenceType"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    daysOfWeek: item["daysOfWeek"].map((p: any) => {
      return p;
    }),
  };
}

export function weeklyRecurrenceDeserializer(item: any): WeeklyRecurrence {
  return {
    recurrenceType: item["recurrenceType"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    daysOfWeek: item["daysOfWeek"].map((p: any) => {
      return p;
    }),
  };
}

/** Days of week. */
export enum KnownDaysOfWeek {
  /** Sunday */
  Sunday = "Sunday",
  /** Monday */
  Monday = "Monday",
  /** Tuesday */
  Tuesday = "Tuesday",
  /** Wednesday */
  Wednesday = "Wednesday",
  /** Thursday */
  Thursday = "Thursday",
  /** Friday */
  Friday = "Friday",
  /** Saturday */
  Saturday = "Saturday",
}

/**
 * Days of week. \
 * {@link KnownDaysOfWeek} can be used interchangeably with DaysOfWeek,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Sunday**: Sunday \
 * **Monday**: Monday \
 * **Tuesday**: Tuesday \
 * **Wednesday**: Wednesday \
 * **Thursday**: Thursday \
 * **Friday**: Friday \
 * **Saturday**: Saturday
 */
export type DaysOfWeek = string;

/** Monthly recurrence object. */
export interface MonthlyRecurrence extends Recurrence {
  /** Specifies the values for monthly recurrence pattern. */
  daysOfMonth: number[];
  /** Specifies when the recurrence should be applied. */
  recurrenceType: "Monthly";
}

export function monthlyRecurrenceSerializer(item: MonthlyRecurrence): any {
  return {
    recurrenceType: item["recurrenceType"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    daysOfMonth: item["daysOfMonth"].map((p: any) => {
      return p;
    }),
  };
}

export function monthlyRecurrenceDeserializer(item: any): MonthlyRecurrence {
  return {
    recurrenceType: item["recurrenceType"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    daysOfMonth: item["daysOfMonth"].map((p: any) => {
      return p;
    }),
  };
}

export function actionUnionArraySerializer(result: Array<ActionUnion>): any[] {
  return result.map((item) => {
    return actionUnionSerializer(item);
  });
}

export function actionUnionArrayDeserializer(result: Array<ActionUnion>): any[] {
  return result.map((item) => {
    return actionUnionDeserializer(item);
  });
}

/** Action to be applied. */
export interface Action {
  /** Action that should be applied. */
  /** The discriminator possible values: AddActionGroups, RemoveAllActionGroups */
  actionType: ActionType;
}

export function actionSerializer(item: Action): any {
  return { actionType: item["actionType"] };
}

export function actionDeserializer(item: any): Action {
  return {
    actionType: item["actionType"],
  };
}

/** Alias for ActionUnion */
export type ActionUnion = AddActionGroups | RemoveAllActionGroups | Action;

export function actionUnionSerializer(item: ActionUnion): any {
  switch (item.actionType) {
    case "AddActionGroups":
      return addActionGroupsSerializer(item as AddActionGroups);

    case "RemoveAllActionGroups":
      return removeAllActionGroupsSerializer(item as RemoveAllActionGroups);

    default:
      return actionSerializer(item);
  }
}

export function actionUnionDeserializer(item: any): ActionUnion {
  switch (item["actionType"]) {
    case "AddActionGroups":
      return addActionGroupsDeserializer(item as AddActionGroups);

    case "RemoveAllActionGroups":
      return removeAllActionGroupsDeserializer(item as RemoveAllActionGroups);

    default:
      return actionDeserializer(item);
  }
}

/** Action that should be applied. */
export enum KnownActionType {
  /** AddActionGroups */
  AddActionGroups = "AddActionGroups",
  /** RemoveAllActionGroups */
  RemoveAllActionGroups = "RemoveAllActionGroups",
}

/**
 * Action that should be applied. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AddActionGroups**: AddActionGroups \
 * **RemoveAllActionGroups**: RemoveAllActionGroups
 */
export type ActionType = string;

/** Add action groups to alert processing rule. */
export interface AddActionGroups extends Action {
  /** List of action group Ids to add to alert processing rule. */
  actionGroupIds: string[];
  /** Action that should be applied. */
  actionType: "AddActionGroups";
}

export function addActionGroupsSerializer(item: AddActionGroups): any {
  return {
    actionType: item["actionType"],
    actionGroupIds: item["actionGroupIds"].map((p: any) => {
      return p;
    }),
  };
}

export function addActionGroupsDeserializer(item: any): AddActionGroups {
  return {
    actionType: item["actionType"],
    actionGroupIds: item["actionGroupIds"].map((p: any) => {
      return p;
    }),
  };
}

/** Indicates if all action groups should be removed. */
export interface RemoveAllActionGroups extends Action {
  /** Action that should be applied. */
  actionType: "RemoveAllActionGroups";
}

export function removeAllActionGroupsSerializer(item: RemoveAllActionGroups): any {
  return { actionType: item["actionType"] };
}

export function removeAllActionGroupsDeserializer(item: any): RemoveAllActionGroups {
  return {
    actionType: item["actionType"],
  };
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
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

/** An error response from the service. */
export interface ErrorResponse {
  /** Details of error response. */
  error?: ErrorResponseBody;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorResponseBodyDeserializer(item["error"]),
  };
}

/** Details of error response. */
export interface ErrorResponseBody {
  /** Error code, intended to be consumed programmatically. */
  code?: string;
  /** Description of the error, intended for display in user interface. */
  message?: string;
  /** Target of the particular error, for example name of the property. */
  target?: string;
  /** A list of additional details about the error. */
  details?: ErrorResponseBody[];
}

export function errorResponseBodyDeserializer(item: any): ErrorResponseBody {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : errorResponseBodyArrayDeserializer(item["details"]),
  };
}

export function errorResponseBodyArrayDeserializer(result: Array<ErrorResponseBody>): any[] {
  return result.map((item) => {
    return errorResponseBodyDeserializer(item);
  });
}

/** Data contract for patch. */
export interface PatchObject {
  /** Tags to be updated. */
  tags?: Record<string, string>;
  /** Indicates if the given alert processing rule is enabled or disabled. */
  enabled?: boolean;
}

export function patchObjectSerializer(item: PatchObject): any {
  return {
    properties: areAllPropsUndefined(item, ["enabled"])
      ? undefined
      : _patchObjectPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** Alert processing rule properties supported by patch. */
export interface PatchProperties {
  /** Indicates if the given alert processing rule is enabled or disabled. */
  enabled?: boolean;
}

export function patchPropertiesSerializer(item: PatchProperties): any {
  return { enabled: item["enabled"] };
}

/** List of alert processing rules. */
export interface _AlertProcessingRulesList {
  /** The AlertProcessingRule items on this page */
  value: AlertProcessingRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertProcessingRulesListDeserializer(item: any): _AlertProcessingRulesList {
  return {
    value: alertProcessingRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function alertProcessingRuleArraySerializer(result: Array<AlertProcessingRule>): any[] {
  return result.map((item) => {
    return alertProcessingRuleSerializer(item);
  });
}

export function alertProcessingRuleArrayDeserializer(result: Array<AlertProcessingRule>): any[] {
  return result.map((item) => {
    return alertProcessingRuleDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2021-08-08 API version. */
  V20210808 = "2021-08-08",
}

export function _patchObjectPropertiesSerializer(item: PatchObject): any {
  return { enabled: item["enabled"] };
}
