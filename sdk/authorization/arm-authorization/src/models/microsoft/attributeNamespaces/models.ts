// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { ProxyResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Paged collection of Operation items */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** The definition of a Microsoft.Authorization operation. */
export interface Operation {
  /** Name of the operation */
  name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** Display of the operation */
  display?: OperationDisplay;
  /** Origin of the operation */
  origin?: string;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
  };
}

/** The display information for a Microsoft.Authorization operation. */
export interface OperationDisplay {
  /** The resource provider name: Microsoft.Authorization. */
  readonly provider?: string;
  /** The resource on which the operation is performed. */
  readonly resource?: string;
  /** The operation that users can perform. */
  readonly operation?: string;
  /** The description for the operation. */
  readonly description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Error description and code explaining why an operation failed. */
export interface ErrorDefinition {
  /** Error of the list gateway status. */
  error?: ErrorDefinitionProperties;
}

export function errorDefinitionDeserializer(item: any): ErrorDefinition {
  return {
    error: !item["error"] ? item["error"] : errorDefinitionPropertiesDeserializer(item["error"]),
  };
}

/** Error description and code explaining why an operation failed. */
export interface ErrorDefinitionProperties {
  /** Description of the error. */
  readonly message?: string;
  /** Error code of list gateway. */
  code?: string;
}

export function errorDefinitionPropertiesDeserializer(item: any): ErrorDefinitionProperties {
  return {
    message: item["message"],
    code: item["code"],
  };
}

/** Access Review History Definition. */
export interface AccessReviewHistoryDefinition extends ProxyResource {
  /** The display name for the history definition. */
  displayName?: string;
  /** Date time used when selecting review data, all reviews included in data start on or after this date. For use only with one-time/non-recurring reports. */
  readonly reviewHistoryPeriodStartDateTime?: Date;
  /** Date time used when selecting review data, all reviews included in data end on or before this date. For use only with one-time/non-recurring reports. */
  readonly reviewHistoryPeriodEndDateTime?: Date;
  /** Collection of review decisions which the history data should be filtered on. For example if Approve and Deny are supplied the data will only contain review results in which the decision maker approved or denied a review request. */
  decisions?: AccessReviewResult[];
  /** This read-only field specifies the of the requested review history data. This is either requested, in-progress, done or error. */
  readonly status?: AccessReviewHistoryDefinitionStatus;
  /** Date time when history definition was created */
  readonly createdDateTime?: Date;
  /** The user or other identity who created this history definition. */
  readonly createdBy?: AccessReviewActorIdentity;
  /** A collection of scopes used when selecting review history data */
  scopes?: AccessReviewScope[];
  /** Recurrence settings for recurring history reports, skip for one-time reports. */
  settings?: AccessReviewHistoryScheduleSettings;
  /** Set of access review history instances for this history definition. */
  instances?: AccessReviewHistoryInstance[];
}

export function accessReviewHistoryDefinitionDeserializer(
  item: any,
): AccessReviewHistoryDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _accessReviewHistoryDefinitionPropertiesDeserializer(item["properties"])),
  };
}

/** Access Review History Instances. */
export interface AccessReviewHistoryDefinitionProperties {
  /** The display name for the history definition. */
  displayName?: string;
  /** Date time used when selecting review data, all reviews included in data start on or after this date. For use only with one-time/non-recurring reports. */
  readonly reviewHistoryPeriodStartDateTime?: Date;
  /** Date time used when selecting review data, all reviews included in data end on or before this date. For use only with one-time/non-recurring reports. */
  readonly reviewHistoryPeriodEndDateTime?: Date;
  /** Collection of review decisions which the history data should be filtered on. For example if Approve and Deny are supplied the data will only contain review results in which the decision maker approved or denied a review request. */
  decisions?: AccessReviewResult[];
  /** This read-only field specifies the of the requested review history data. This is either requested, in-progress, done or error. */
  readonly status?: AccessReviewHistoryDefinitionStatus;
  /** Date time when history definition was created */
  readonly createdDateTime?: Date;
  /** The user or other identity who created this history definition. */
  readonly createdBy?: AccessReviewActorIdentity;
  /** A collection of scopes used when selecting review history data */
  scopes?: AccessReviewScope[];
  /** Recurrence settings for recurring history reports, skip for one-time reports. */
  settings?: AccessReviewHistoryScheduleSettings;
  /** Set of access review history instances for this history definition. */
  instances?: AccessReviewHistoryInstance[];
}

export function accessReviewHistoryDefinitionPropertiesSerializer(
  item: AccessReviewHistoryDefinitionProperties,
): any {
  return {
    displayName: item["displayName"],
    decisions: !item["decisions"]
      ? item["decisions"]
      : item["decisions"].map((p: any) => {
          return p;
        }),
    scopes: !item["scopes"] ? item["scopes"] : accessReviewScopeArraySerializer(item["scopes"]),
    settings: !item["settings"]
      ? item["settings"]
      : accessReviewHistoryScheduleSettingsSerializer(item["settings"]),
    instances: !item["instances"]
      ? item["instances"]
      : accessReviewHistoryInstanceArraySerializer(item["instances"]),
  };
}

export function accessReviewHistoryDefinitionPropertiesDeserializer(
  item: any,
): AccessReviewHistoryDefinitionProperties {
  return {
    displayName: item["displayName"],
    reviewHistoryPeriodStartDateTime: !item["reviewHistoryPeriodStartDateTime"]
      ? item["reviewHistoryPeriodStartDateTime"]
      : new Date(item["reviewHistoryPeriodStartDateTime"]),
    reviewHistoryPeriodEndDateTime: !item["reviewHistoryPeriodEndDateTime"]
      ? item["reviewHistoryPeriodEndDateTime"]
      : new Date(item["reviewHistoryPeriodEndDateTime"]),
    decisions: !item["decisions"]
      ? item["decisions"]
      : item["decisions"].map((p1: any) => {
          return p1;
        }),
    status: item["status"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    createdBy: !item["createdBy"]
      ? item["createdBy"]
      : accessReviewActorIdentityDeserializer(item["createdBy"]),
    scopes: !item["scopes"] ? item["scopes"] : accessReviewScopeArrayDeserializer(item["scopes"]),
    settings: !item["settings"]
      ? item["settings"]
      : accessReviewHistoryScheduleSettingsDeserializer(item["settings"]),
    instances: !item["instances"]
      ? item["instances"]
      : accessReviewHistoryInstanceArrayDeserializer(item["instances"]),
  };
}

/** Represents a reviewer's decision for a given review */
export enum KnownAccessReviewResult {
  /** Approve */
  Approve = "Approve",
  /** Deny */
  Deny = "Deny",
  /** NotReviewed */
  NotReviewed = "NotReviewed",
  /** DontKnow */
  DontKnow = "DontKnow",
  /** NotNotified */
  NotNotified = "NotNotified",
}

/**
 * Represents a reviewer's decision for a given review \
 * {@link KnownAccessReviewResult} can be used interchangeably with AccessReviewResult,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approve**: Approve \
 * **Deny**: Deny \
 * **NotReviewed**: NotReviewed \
 * **DontKnow**: DontKnow \
 * **NotNotified**: NotNotified
 */
export type AccessReviewResult = string;

/** This read-only field specifies the of the requested review history data. This is either requested, in-progress, done or error. */
export enum KnownAccessReviewHistoryDefinitionStatus {
  /** Requested */
  Requested = "Requested",
  /** InProgress */
  InProgress = "InProgress",
  /** Done */
  Done = "Done",
  /** Error */
  Error = "Error",
}

/**
 * This read-only field specifies the of the requested review history data. This is either requested, in-progress, done or error. \
 * {@link KnownAccessReviewHistoryDefinitionStatus} can be used interchangeably with AccessReviewHistoryDefinitionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Requested**: Requested \
 * **InProgress**: InProgress \
 * **Done**: Done \
 * **Error**: Error
 */
export type AccessReviewHistoryDefinitionStatus = string;

/** Details of the actor identity */
export interface AccessReviewActorIdentity {
  /** The identity id */
  readonly principalId?: string;
  /** The identity type : user/servicePrincipal */
  readonly principalType?: AccessReviewActorIdentityType;
  /** The identity display name */
  readonly principalName?: string;
  /** The user principal name(if valid) */
  readonly userPrincipalName?: string;
}

export function accessReviewActorIdentityDeserializer(item: any): AccessReviewActorIdentity {
  return {
    principalId: item["principalId"],
    principalType: item["principalType"],
    principalName: item["principalName"],
    userPrincipalName: item["userPrincipalName"],
  };
}

/** The identity type : user/servicePrincipal */
export enum KnownAccessReviewActorIdentityType {
  /** user */
  User = "user",
  /** servicePrincipal */
  ServicePrincipal = "servicePrincipal",
}

/**
 * The identity type : user/servicePrincipal \
 * {@link KnownAccessReviewActorIdentityType} can be used interchangeably with AccessReviewActorIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: user \
 * **servicePrincipal**: servicePrincipal
 */
export type AccessReviewActorIdentityType = string;

export function accessReviewScopeArraySerializer(result: Array<AccessReviewScope>): any[] {
  return result.map((item) => {
    return accessReviewScopeSerializer(item);
  });
}

export function accessReviewScopeArrayDeserializer(result: Array<AccessReviewScope>): any[] {
  return result.map((item) => {
    return accessReviewScopeDeserializer(item);
  });
}

/** Descriptor for what needs to be reviewed */
export interface AccessReviewScope {
  /** ResourceId in which this review is getting created */
  readonly resourceId?: string;
  /** This is used to indicate the role being reviewed */
  readonly roleDefinitionId?: string;
  /** The identity type user/servicePrincipal to review */
  readonly principalType?: AccessReviewScopePrincipalType;
  /** The role assignment state eligible/active to review */
  readonly assignmentState?: AccessReviewScopeAssignmentState;
  /** Duration users are inactive for. The value should be in ISO  8601 format (http://en.wikipedia.org/wiki/ISO_8601#Durations).This code can be used to convert TimeSpan to a valid interval string: XmlConvert.ToString(new TimeSpan(hours, minutes, seconds)) */
  inactiveDuration?: string;
  /** Flag to indicate whether to expand nested memberships or not. */
  expandNestedMemberships?: boolean;
  /** Flag to indicate whether to expand nested memberships or not. */
  includeInheritedAccess?: boolean;
  /** Flag to indicate whether to expand nested memberships or not. */
  includeAccessBelowResource?: boolean;
  /** This is used to indicate the resource id(s) to exclude */
  excludeResourceId?: string;
  /** This is used to indicate the role definition id(s) to exclude */
  excludeRoleDefinitionId?: string;
}

export function accessReviewScopeSerializer(item: AccessReviewScope): any {
  return {
    inactiveDuration: item["inactiveDuration"],
    expandNestedMemberships: item["expandNestedMemberships"],
    includeInheritedAccess: item["includeInheritedAccess"],
    includeAccessBelowResource: item["includeAccessBelowResource"],
    excludeResourceId: item["excludeResourceId"],
    excludeRoleDefinitionId: item["excludeRoleDefinitionId"],
  };
}

export function accessReviewScopeDeserializer(item: any): AccessReviewScope {
  return {
    resourceId: item["resourceId"],
    roleDefinitionId: item["roleDefinitionId"],
    principalType: item["principalType"],
    assignmentState: item["assignmentState"],
    inactiveDuration: item["inactiveDuration"],
    expandNestedMemberships: item["expandNestedMemberships"],
    includeInheritedAccess: item["includeInheritedAccess"],
    includeAccessBelowResource: item["includeAccessBelowResource"],
    excludeResourceId: item["excludeResourceId"],
    excludeRoleDefinitionId: item["excludeRoleDefinitionId"],
  };
}

/** The identity type user/servicePrincipal to review */
export enum KnownAccessReviewScopePrincipalType {
  /** user */
  User = "user",
  /** guestUser */
  GuestUser = "guestUser",
  /** servicePrincipal */
  ServicePrincipal = "servicePrincipal",
  /** user,group */
  UserGroup = "user,group",
  /** redeemedGuestUser */
  RedeemedGuestUser = "redeemedGuestUser",
}

/**
 * The identity type user/servicePrincipal to review \
 * {@link KnownAccessReviewScopePrincipalType} can be used interchangeably with AccessReviewScopePrincipalType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: user \
 * **guestUser**: guestUser \
 * **servicePrincipal**: servicePrincipal \
 * **user,group**: user,group \
 * **redeemedGuestUser**: redeemedGuestUser
 */
export type AccessReviewScopePrincipalType = string;

/** The role assignment state eligible/active to review */
export enum KnownAccessReviewScopeAssignmentState {
  /** eligible */
  Eligible = "eligible",
  /** active */
  Active = "active",
}

/**
 * The role assignment state eligible/active to review \
 * {@link KnownAccessReviewScopeAssignmentState} can be used interchangeably with AccessReviewScopeAssignmentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **eligible**: eligible \
 * **active**: active
 */
export type AccessReviewScopeAssignmentState = string;

/** Recurrence settings of an Access Review History Definition. */
export interface AccessReviewHistoryScheduleSettings {
  /** The recurrence type : weekly, monthly, etc. */
  type?: AccessReviewRecurrencePatternType;
  /** The interval for recurrence. For a quarterly review, the interval is 3 for type : absoluteMonthly. */
  interval?: number;
  /** The recurrence range type. The possible values are: endDate, noEnd, numbered. */
  typeRangeType?: AccessReviewRecurrenceRangeType;
  /** The number of times to repeat the access review. Required and must be positive if type is numbered. */
  numberOfOccurrences?: number;
  /** The DateTime when the review is scheduled to be start. This could be a date in the future. Required on create. */
  startDate?: Date;
  /** The DateTime when the review is scheduled to end. Required if type is endDate */
  endDate?: Date;
}

export function accessReviewHistoryScheduleSettingsSerializer(
  item: AccessReviewHistoryScheduleSettings,
): any {
  return {
    pattern: areAllPropsUndefined(item, ["type", "interval"])
      ? undefined
      : _accessReviewHistoryScheduleSettingsPatternSerializer(item),
    range: areAllPropsUndefined(item, ["type", "numberOfOccurrences", "startDate", "endDate"])
      ? undefined
      : _accessReviewHistoryScheduleSettingsRangeSerializer(item),
  };
}

export function accessReviewHistoryScheduleSettingsDeserializer(
  item: any,
): AccessReviewHistoryScheduleSettings {
  return {
    ...(!item["pattern"]
      ? item["pattern"]
      : _accessReviewHistoryScheduleSettingsPatternDeserializer(item["pattern"])),
    ...(!item["range"]
      ? item["range"]
      : _accessReviewHistoryScheduleSettingsRangeDeserializer(item["range"])),
  };
}

/** Recurrence Pattern of an Access Review Schedule Definition. */
export interface AccessReviewRecurrencePattern {
  /** The recurrence type : weekly, monthly, etc. */
  type?: AccessReviewRecurrencePatternType;
  /** The interval for recurrence. For a quarterly review, the interval is 3 for type : absoluteMonthly. */
  interval?: number;
}

export function accessReviewRecurrencePatternSerializer(item: AccessReviewRecurrencePattern): any {
  return { type: item["type"], interval: item["interval"] };
}

export function accessReviewRecurrencePatternDeserializer(
  item: any,
): AccessReviewRecurrencePattern {
  return {
    type: item["type"],
    interval: item["interval"],
  };
}

/** The recurrence type : weekly, monthly, etc. */
export enum KnownAccessReviewRecurrencePatternType {
  /** weekly */
  Weekly = "weekly",
  /** absoluteMonthly */
  AbsoluteMonthly = "absoluteMonthly",
}

/**
 * The recurrence type : weekly, monthly, etc. \
 * {@link KnownAccessReviewRecurrencePatternType} can be used interchangeably with AccessReviewRecurrencePatternType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **weekly**: weekly \
 * **absoluteMonthly**: absoluteMonthly
 */
export type AccessReviewRecurrencePatternType = string;

/** Recurrence Range of an Access Review Schedule Definition. */
export interface AccessReviewRecurrenceRange {
  /** The recurrence range type. The possible values are: endDate, noEnd, numbered. */
  type?: AccessReviewRecurrenceRangeType;
  /** The number of times to repeat the access review. Required and must be positive if type is numbered. */
  numberOfOccurrences?: number;
  /** The DateTime when the review is scheduled to be start. This could be a date in the future. Required on create. */
  startDate?: Date;
  /** The DateTime when the review is scheduled to end. Required if type is endDate */
  endDate?: Date;
}

export function accessReviewRecurrenceRangeSerializer(item: AccessReviewRecurrenceRange): any {
  return {
    type: item["type"],
    numberOfOccurrences: item["numberOfOccurrences"],
    startDate: !item["startDate"] ? item["startDate"] : item["startDate"].toISOString(),
    endDate: !item["endDate"] ? item["endDate"] : item["endDate"].toISOString(),
  };
}

export function accessReviewRecurrenceRangeDeserializer(item: any): AccessReviewRecurrenceRange {
  return {
    type: item["type"],
    numberOfOccurrences: item["numberOfOccurrences"],
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
  };
}

/** The recurrence range type. The possible values are: endDate, noEnd, numbered. */
export enum KnownAccessReviewRecurrenceRangeType {
  /** endDate */
  EndDate = "endDate",
  /** noEnd */
  NoEnd = "noEnd",
  /** numbered */
  Numbered = "numbered",
}

/**
 * The recurrence range type. The possible values are: endDate, noEnd, numbered. \
 * {@link KnownAccessReviewRecurrenceRangeType} can be used interchangeably with AccessReviewRecurrenceRangeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **endDate**: endDate \
 * **noEnd**: noEnd \
 * **numbered**: numbered
 */
export type AccessReviewRecurrenceRangeType = string;

export function accessReviewHistoryInstanceArraySerializer(
  result: Array<AccessReviewHistoryInstance>,
): any[] {
  return result.map((item) => {
    return accessReviewHistoryInstanceSerializer(item);
  });
}

export function accessReviewHistoryInstanceArrayDeserializer(
  result: Array<AccessReviewHistoryInstance>,
): any[] {
  return result.map((item) => {
    return accessReviewHistoryInstanceDeserializer(item);
  });
}

/** Access Review History Definition Instance. */
export interface AccessReviewHistoryInstance {
  /** The access review history definition instance id. */
  readonly id?: string;
  /** The access review history definition instance unique id. */
  readonly name?: string;
  /** The resource type. */
  readonly type?: string;
  /** Date time used when selecting review data, all reviews included in data start on or after this date. For use only with one-time/non-recurring reports. */
  reviewHistoryPeriodStartDateTime?: Date;
  /** Date time used when selecting review data, all reviews included in data end on or before this date. For use only with one-time/non-recurring reports. */
  reviewHistoryPeriodEndDateTime?: Date;
  /** The display name for the parent history definition. */
  displayName?: string;
  /** Status of the requested review history instance data. This is either requested, in-progress, done or error. The state transitions are as follows - Requested -> InProgress -> Done -> Expired */
  readonly status?: AccessReviewHistoryDefinitionStatus;
  /** Date time when the history data report is scheduled to be generated. */
  runDateTime?: Date;
  /** Date time when the history data report is scheduled to be generated. */
  fulfilledDateTime?: Date;
  /** Uri which can be used to retrieve review history data. To generate this Uri, generateDownloadUri() must be called for a specific accessReviewHistoryDefinitionInstance. The link expires after a 24 hour period. Callers can see the expiration date time by looking at the 'se' parameter in the generated uri. */
  readonly downloadUri?: string;
  /** Date time when history data report expires and the associated data is deleted. */
  expiration?: Date;
}

export function accessReviewHistoryInstanceSerializer(item: AccessReviewHistoryInstance): any {
  return {
    properties: areAllPropsUndefined(item, [
      "reviewHistoryPeriodStartDateTime",
      "reviewHistoryPeriodEndDateTime",
      "displayName",
      "runDateTime",
      "fulfilledDateTime",
      "expiration",
    ])
      ? undefined
      : _accessReviewHistoryInstancePropertiesSerializer(item),
  };
}

export function accessReviewHistoryInstanceDeserializer(item: any): AccessReviewHistoryInstance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _accessReviewHistoryInstancePropertiesDeserializer(item["properties"])),
  };
}

/** Access Review History Definition Instance properties. */
export interface AccessReviewHistoryInstanceProperties {
  /** Date time used when selecting review data, all reviews included in data start on or after this date. For use only with one-time/non-recurring reports. */
  reviewHistoryPeriodStartDateTime?: Date;
  /** Date time used when selecting review data, all reviews included in data end on or before this date. For use only with one-time/non-recurring reports. */
  reviewHistoryPeriodEndDateTime?: Date;
  /** The display name for the parent history definition. */
  displayName?: string;
  /** Status of the requested review history instance data. This is either requested, in-progress, done or error. The state transitions are as follows - Requested -> InProgress -> Done -> Expired */
  readonly status?: AccessReviewHistoryDefinitionStatus;
  /** Date time when the history data report is scheduled to be generated. */
  runDateTime?: Date;
  /** Date time when the history data report is scheduled to be generated. */
  fulfilledDateTime?: Date;
  /** Uri which can be used to retrieve review history data. To generate this Uri, generateDownloadUri() must be called for a specific accessReviewHistoryDefinitionInstance. The link expires after a 24 hour period. Callers can see the expiration date time by looking at the 'se' parameter in the generated uri. */
  readonly downloadUri?: string;
  /** Date time when history data report expires and the associated data is deleted. */
  expiration?: Date;
}

export function accessReviewHistoryInstancePropertiesSerializer(
  item: AccessReviewHistoryInstanceProperties,
): any {
  return {
    reviewHistoryPeriodStartDateTime: !item["reviewHistoryPeriodStartDateTime"]
      ? item["reviewHistoryPeriodStartDateTime"]
      : item["reviewHistoryPeriodStartDateTime"].toISOString(),
    reviewHistoryPeriodEndDateTime: !item["reviewHistoryPeriodEndDateTime"]
      ? item["reviewHistoryPeriodEndDateTime"]
      : item["reviewHistoryPeriodEndDateTime"].toISOString(),
    displayName: item["displayName"],
    runDateTime: !item["runDateTime"] ? item["runDateTime"] : item["runDateTime"].toISOString(),
    fulfilledDateTime: !item["fulfilledDateTime"]
      ? item["fulfilledDateTime"]
      : item["fulfilledDateTime"].toISOString(),
    expiration: !item["expiration"] ? item["expiration"] : item["expiration"].toISOString(),
  };
}

export function accessReviewHistoryInstancePropertiesDeserializer(
  item: any,
): AccessReviewHistoryInstanceProperties {
  return {
    reviewHistoryPeriodStartDateTime: !item["reviewHistoryPeriodStartDateTime"]
      ? item["reviewHistoryPeriodStartDateTime"]
      : new Date(item["reviewHistoryPeriodStartDateTime"]),
    reviewHistoryPeriodEndDateTime: !item["reviewHistoryPeriodEndDateTime"]
      ? item["reviewHistoryPeriodEndDateTime"]
      : new Date(item["reviewHistoryPeriodEndDateTime"]),
    displayName: item["displayName"],
    status: item["status"],
    runDateTime: !item["runDateTime"] ? item["runDateTime"] : new Date(item["runDateTime"]),
    fulfilledDateTime: !item["fulfilledDateTime"]
      ? item["fulfilledDateTime"]
      : new Date(item["fulfilledDateTime"]),
    downloadUri: item["downloadUri"],
    expiration: !item["expiration"] ? item["expiration"] : new Date(item["expiration"]),
  };
}

export function accessReviewHistoryDefinitionArrayDeserializer(
  result: Array<AccessReviewHistoryDefinition>,
): any[] {
  return result.map((item) => {
    return accessReviewHistoryDefinitionDeserializer(item);
  });
}

/** Access Review Schedule Definition. */
export interface AccessReviewScheduleDefinition extends ProxyResource {
  /** The display name for the schedule definition. */
  displayName?: string;
  /** This read-only field specifies the status of an accessReview. */
  readonly status?: AccessReviewScheduleDefinitionStatus;
  /** The description provided by the access review creator and visible to admins. */
  descriptionForAdmins?: string;
  /** The description provided by the access review creator to be shown to reviewers. */
  descriptionForReviewers?: string;
  /** The user or other identity who created this review. */
  readonly createdBy?: AccessReviewActorIdentity;
  /** Access Review Settings. */
  settings?: AccessReviewScheduleSettings;
  /** This is used to define what to include in scope of the review. The scope definition includes the resourceId and roleDefinitionId. */
  readonly scope?: AccessReviewScope;
  /** This is the collection of reviewers. */
  reviewers?: AccessReviewReviewer[];
  /** This is the collection of backup reviewers. */
  backupReviewers?: AccessReviewReviewer[];
  /** This field specifies the type of reviewers for a review. Usually for a review, reviewers are explicitly assigned. However, in some cases, the reviewers may not be assigned and instead be chosen dynamically. For example managers review or self review. */
  readonly reviewersType?: AccessReviewScheduleDefinitionReviewersType;
  /** This is the collection of instances returned when one does an expand on it. */
  instances?: AccessReviewInstance[];
}

export function accessReviewScheduleDefinitionDeserializer(
  item: any,
): AccessReviewScheduleDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _accessReviewScheduleDefinitionPropertiesDeserializer(item["properties"])),
  };
}

/** Access Review. */
export interface AccessReviewScheduleDefinitionProperties {
  /** The display name for the schedule definition. */
  displayName?: string;
  /** This read-only field specifies the status of an accessReview. */
  readonly status?: AccessReviewScheduleDefinitionStatus;
  /** The description provided by the access review creator and visible to admins. */
  descriptionForAdmins?: string;
  /** The description provided by the access review creator to be shown to reviewers. */
  descriptionForReviewers?: string;
  /** This is the collection of reviewers. */
  reviewers?: AccessReviewReviewer[];
  /** This is the collection of backup reviewers. */
  backupReviewers?: AccessReviewReviewer[];
  /** This field specifies the type of reviewers for a review. Usually for a review, reviewers are explicitly assigned. However, in some cases, the reviewers may not be assigned and instead be chosen dynamically. For example managers review or self review. */
  readonly reviewersType?: AccessReviewScheduleDefinitionReviewersType;
  /** This is the collection of instances returned when one does an expand on it. */
  instances?: AccessReviewInstance[];
  /** The identity id */
  readonly principalId?: string;
  /** The identity type : user/servicePrincipal */
  readonly principalType?: AccessReviewActorIdentityType;
  /** The identity display name */
  readonly principalName?: string;
  /** The user principal name(if valid) */
  readonly userPrincipalName?: string;
  /** Flag to indicate whether sending mails to reviewers and the review creator is enabled. */
  mailNotificationsEnabled?: boolean;
  /** Flag to indicate whether sending reminder emails to reviewers are enabled. */
  reminderNotificationsEnabled?: boolean;
  /** Flag to indicate whether reviewers are required to provide a justification when reviewing access. */
  defaultDecisionEnabled?: boolean;
  /** Flag to indicate whether the reviewer is required to pass justification when recording a decision. */
  justificationRequiredOnApproval?: boolean;
  /** This specifies the behavior for the autoReview feature when an access review completes. */
  defaultDecision?: DefaultDecisionType;
  /** Flag to indicate whether auto-apply capability, to automatically change the target object access resource, is enabled. If not enabled, a user must, after the review completes, apply the access review. */
  autoApplyDecisionsEnabled?: boolean;
  /** Flag to indicate whether showing recommendations to reviewers is enabled. */
  recommendationsEnabled?: boolean;
  /** Recommendations for access reviews are calculated by looking back at 30 days of data(w.r.t the start date of the review) by default. However, in some scenarios, customers want to change how far back to look at and want to configure 60 days, 90 days, etc. instead. This setting allows customers to configure this duration. The value should be in ISO  8601 format (http://en.wikipedia.org/wiki/ISO_8601#Durations).This code can be used to convert TimeSpan to a valid interval string: XmlConvert.ToString(new TimeSpan(hours, minutes, seconds)) */
  recommendationLookBackDuration?: string;
  /** The duration in days for an instance. */
  instanceDurationInDays?: number;
  /** Access Review Settings. */
  recurrence?: AccessReviewRecurrenceSettings;
  /** ResourceId in which this review is getting created */
  readonly resourceId?: string;
  /** This is used to indicate the role being reviewed */
  readonly roleDefinitionId?: string;
  /** The identity type user/servicePrincipal to review */
  readonly principalTypeScopePrincipalType?: AccessReviewScopePrincipalType;
  /** The role assignment state eligible/active to review */
  readonly assignmentState?: AccessReviewScopeAssignmentState;
  /** Duration users are inactive for. The value should be in ISO  8601 format (http://en.wikipedia.org/wiki/ISO_8601#Durations).This code can be used to convert TimeSpan to a valid interval string: XmlConvert.ToString(new TimeSpan(hours, minutes, seconds)) */
  inactiveDuration?: string;
  /** Flag to indicate whether to expand nested memberships or not. */
  expandNestedMemberships?: boolean;
  /** Flag to indicate whether to expand nested memberships or not. */
  includeInheritedAccess?: boolean;
  /** Flag to indicate whether to expand nested memberships or not. */
  includeAccessBelowResource?: boolean;
  /** This is used to indicate the resource id(s) to exclude */
  excludeResourceId?: string;
  /** This is used to indicate the role definition id(s) to exclude */
  excludeRoleDefinitionId?: string;
}

export function accessReviewScheduleDefinitionPropertiesSerializer(
  item: AccessReviewScheduleDefinitionProperties,
): any {
  return {
    displayName: item["displayName"],
    descriptionForAdmins: item["descriptionForAdmins"],
    descriptionForReviewers: item["descriptionForReviewers"],
    settings: areAllPropsUndefined(item, [
      "mailNotificationsEnabled",
      "reminderNotificationsEnabled",
      "defaultDecisionEnabled",
      "justificationRequiredOnApproval",
      "defaultDecision",
      "autoApplyDecisionsEnabled",
      "recommendationsEnabled",
      "recommendationLookBackDuration",
      "instanceDurationInDays",
      "recurrence",
    ])
      ? undefined
      : _accessReviewScheduleDefinitionPropertiesSettingsSerializer(item),
    reviewers: !item["reviewers"]
      ? item["reviewers"]
      : accessReviewReviewerArraySerializer(item["reviewers"]),
    backupReviewers: !item["backupReviewers"]
      ? item["backupReviewers"]
      : accessReviewReviewerArraySerializer(item["backupReviewers"]),
    instances: !item["instances"]
      ? item["instances"]
      : accessReviewInstanceArraySerializer(item["instances"]),
  };
}

export function accessReviewScheduleDefinitionPropertiesDeserializer(
  item: any,
): AccessReviewScheduleDefinitionProperties {
  return {
    displayName: item["displayName"],
    status: item["status"],
    descriptionForAdmins: item["descriptionForAdmins"],
    descriptionForReviewers: item["descriptionForReviewers"],
    ...(!item["createdBy"]
      ? item["createdBy"]
      : _accessReviewScheduleDefinitionPropertiesCreatedByDeserializer(item["createdBy"])),
    ...(!item["settings"]
      ? item["settings"]
      : _accessReviewScheduleDefinitionPropertiesSettingsDeserializer(item["settings"])),
    ...(!item["scope"]
      ? item["scope"]
      : _accessReviewScheduleDefinitionPropertiesScopeDeserializer(item["scope"])),
    reviewers: !item["reviewers"]
      ? item["reviewers"]
      : accessReviewReviewerArrayDeserializer(item["reviewers"]),
    backupReviewers: !item["backupReviewers"]
      ? item["backupReviewers"]
      : accessReviewReviewerArrayDeserializer(item["backupReviewers"]),
    reviewersType: item["reviewersType"],
    instances: !item["instances"]
      ? item["instances"]
      : accessReviewInstanceArrayDeserializer(item["instances"]),
  };
}

/** This read-only field specifies the status of an accessReview. */
export enum KnownAccessReviewScheduleDefinitionStatus {
  /** NotStarted */
  NotStarted = "NotStarted",
  /** InProgress */
  InProgress = "InProgress",
  /** Completed */
  Completed = "Completed",
  /** Applied */
  Applied = "Applied",
  /** Initializing */
  Initializing = "Initializing",
  /** Applying */
  Applying = "Applying",
  /** Completing */
  Completing = "Completing",
  /** Scheduled */
  Scheduled = "Scheduled",
  /** AutoReviewing */
  AutoReviewing = "AutoReviewing",
  /** AutoReviewed */
  AutoReviewed = "AutoReviewed",
  /** Starting */
  Starting = "Starting",
}

/**
 * This read-only field specifies the status of an accessReview. \
 * {@link KnownAccessReviewScheduleDefinitionStatus} can be used interchangeably with AccessReviewScheduleDefinitionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: NotStarted \
 * **InProgress**: InProgress \
 * **Completed**: Completed \
 * **Applied**: Applied \
 * **Initializing**: Initializing \
 * **Applying**: Applying \
 * **Completing**: Completing \
 * **Scheduled**: Scheduled \
 * **AutoReviewing**: AutoReviewing \
 * **AutoReviewed**: AutoReviewed \
 * **Starting**: Starting
 */
export type AccessReviewScheduleDefinitionStatus = string;

/** Settings of an Access Review. */
export interface AccessReviewScheduleSettings {
  /** Flag to indicate whether sending mails to reviewers and the review creator is enabled. */
  mailNotificationsEnabled?: boolean;
  /** Flag to indicate whether sending reminder emails to reviewers are enabled. */
  reminderNotificationsEnabled?: boolean;
  /** Flag to indicate whether reviewers are required to provide a justification when reviewing access. */
  defaultDecisionEnabled?: boolean;
  /** Flag to indicate whether the reviewer is required to pass justification when recording a decision. */
  justificationRequiredOnApproval?: boolean;
  /** This specifies the behavior for the autoReview feature when an access review completes. */
  defaultDecision?: DefaultDecisionType;
  /** Flag to indicate whether auto-apply capability, to automatically change the target object access resource, is enabled. If not enabled, a user must, after the review completes, apply the access review. */
  autoApplyDecisionsEnabled?: boolean;
  /** Flag to indicate whether showing recommendations to reviewers is enabled. */
  recommendationsEnabled?: boolean;
  /** Recommendations for access reviews are calculated by looking back at 30 days of data(w.r.t the start date of the review) by default. However, in some scenarios, customers want to change how far back to look at and want to configure 60 days, 90 days, etc. instead. This setting allows customers to configure this duration. The value should be in ISO  8601 format (http://en.wikipedia.org/wiki/ISO_8601#Durations).This code can be used to convert TimeSpan to a valid interval string: XmlConvert.ToString(new TimeSpan(hours, minutes, seconds)) */
  recommendationLookBackDuration?: string;
  /** The duration in days for an instance. */
  instanceDurationInDays?: number;
  /** Access Review schedule definition recurrence pattern. */
  pattern?: AccessReviewRecurrencePattern;
  /** Access Review schedule definition recurrence range. */
  range?: AccessReviewRecurrenceRange;
}

export function accessReviewScheduleSettingsSerializer(item: AccessReviewScheduleSettings): any {
  return {
    mailNotificationsEnabled: item["mailNotificationsEnabled"],
    reminderNotificationsEnabled: item["reminderNotificationsEnabled"],
    defaultDecisionEnabled: item["defaultDecisionEnabled"],
    justificationRequiredOnApproval: item["justificationRequiredOnApproval"],
    defaultDecision: item["defaultDecision"],
    autoApplyDecisionsEnabled: item["autoApplyDecisionsEnabled"],
    recommendationsEnabled: item["recommendationsEnabled"],
    recommendationLookBackDuration: item["recommendationLookBackDuration"],
    instanceDurationInDays: item["instanceDurationInDays"],
    recurrence: areAllPropsUndefined(item, ["pattern", "range"])
      ? undefined
      : _accessReviewScheduleSettingsRecurrenceSerializer(item),
  };
}

export function accessReviewScheduleSettingsDeserializer(item: any): AccessReviewScheduleSettings {
  return {
    mailNotificationsEnabled: item["mailNotificationsEnabled"],
    reminderNotificationsEnabled: item["reminderNotificationsEnabled"],
    defaultDecisionEnabled: item["defaultDecisionEnabled"],
    justificationRequiredOnApproval: item["justificationRequiredOnApproval"],
    defaultDecision: item["defaultDecision"],
    autoApplyDecisionsEnabled: item["autoApplyDecisionsEnabled"],
    recommendationsEnabled: item["recommendationsEnabled"],
    recommendationLookBackDuration: item["recommendationLookBackDuration"],
    instanceDurationInDays: item["instanceDurationInDays"],
    ...(!item["recurrence"]
      ? item["recurrence"]
      : _accessReviewScheduleSettingsRecurrenceDeserializer(item["recurrence"])),
  };
}

/** This specifies the behavior for the autoReview feature when an access review completes. */
export enum KnownDefaultDecisionType {
  /** Approve */
  Approve = "Approve",
  /** Deny */
  Deny = "Deny",
  /** Recommendation */
  Recommendation = "Recommendation",
}

/**
 * This specifies the behavior for the autoReview feature when an access review completes. \
 * {@link KnownDefaultDecisionType} can be used interchangeably with DefaultDecisionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approve**: Approve \
 * **Deny**: Deny \
 * **Recommendation**: Recommendation
 */
export type DefaultDecisionType = string;

/** Recurrence Settings of an Access Review Schedule Definition. */
export interface AccessReviewRecurrenceSettings {
  /** The recurrence type : weekly, monthly, etc. */
  type?: AccessReviewRecurrencePatternType;
  /** The interval for recurrence. For a quarterly review, the interval is 3 for type : absoluteMonthly. */
  interval?: number;
  /** The recurrence range type. The possible values are: endDate, noEnd, numbered. */
  typeRangeType?: AccessReviewRecurrenceRangeType;
  /** The number of times to repeat the access review. Required and must be positive if type is numbered. */
  numberOfOccurrences?: number;
  /** The DateTime when the review is scheduled to be start. This could be a date in the future. Required on create. */
  startDate?: Date;
  /** The DateTime when the review is scheduled to end. Required if type is endDate */
  endDate?: Date;
}

export function accessReviewRecurrenceSettingsSerializer(
  item: AccessReviewRecurrenceSettings,
): any {
  return {
    pattern: areAllPropsUndefined(item, ["type", "interval"])
      ? undefined
      : _accessReviewRecurrenceSettingsPatternSerializer(item),
    range: areAllPropsUndefined(item, ["type", "numberOfOccurrences", "startDate", "endDate"])
      ? undefined
      : _accessReviewRecurrenceSettingsRangeSerializer(item),
  };
}

export function accessReviewRecurrenceSettingsDeserializer(
  item: any,
): AccessReviewRecurrenceSettings {
  return {
    ...(!item["pattern"]
      ? item["pattern"]
      : _accessReviewRecurrenceSettingsPatternDeserializer(item["pattern"])),
    ...(!item["range"]
      ? item["range"]
      : _accessReviewRecurrenceSettingsRangeDeserializer(item["range"])),
  };
}

export function accessReviewReviewerArraySerializer(result: Array<AccessReviewReviewer>): any[] {
  return result.map((item) => {
    return accessReviewReviewerSerializer(item);
  });
}

export function accessReviewReviewerArrayDeserializer(result: Array<AccessReviewReviewer>): any[] {
  return result.map((item) => {
    return accessReviewReviewerDeserializer(item);
  });
}

/** Descriptor for what needs to be reviewed */
export interface AccessReviewReviewer {
  /** The id of the reviewer(user/servicePrincipal) */
  principalId?: string;
  /** The identity type : user/servicePrincipal */
  readonly principalType?: AccessReviewReviewerType;
}

export function accessReviewReviewerSerializer(item: AccessReviewReviewer): any {
  return { principalId: item["principalId"] };
}

export function accessReviewReviewerDeserializer(item: any): AccessReviewReviewer {
  return {
    principalId: item["principalId"],
    principalType: item["principalType"],
  };
}

/** The identity type : user/servicePrincipal */
export enum KnownAccessReviewReviewerType {
  /** user */
  User = "user",
  /** servicePrincipal */
  ServicePrincipal = "servicePrincipal",
}

/**
 * The identity type : user/servicePrincipal \
 * {@link KnownAccessReviewReviewerType} can be used interchangeably with AccessReviewReviewerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: user \
 * **servicePrincipal**: servicePrincipal
 */
export type AccessReviewReviewerType = string;

/** This field specifies the type of reviewers for a review. Usually for a review, reviewers are explicitly assigned. However, in some cases, the reviewers may not be assigned and instead be chosen dynamically. For example managers review or self review. */
export enum KnownAccessReviewScheduleDefinitionReviewersType {
  /** Assigned */
  Assigned = "Assigned",
  /** Self */
  Self = "Self",
  /** Managers */
  Managers = "Managers",
}

/**
 * This field specifies the type of reviewers for a review. Usually for a review, reviewers are explicitly assigned. However, in some cases, the reviewers may not be assigned and instead be chosen dynamically. For example managers review or self review. \
 * {@link KnownAccessReviewScheduleDefinitionReviewersType} can be used interchangeably with AccessReviewScheduleDefinitionReviewersType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Assigned**: Assigned \
 * **Self**: Self \
 * **Managers**: Managers
 */
export type AccessReviewScheduleDefinitionReviewersType = string;

export function accessReviewInstanceArraySerializer(result: Array<AccessReviewInstance>): any[] {
  return result.map((item) => {
    return accessReviewInstanceSerializer(item);
  });
}

export function accessReviewInstanceArrayDeserializer(result: Array<AccessReviewInstance>): any[] {
  return result.map((item) => {
    return accessReviewInstanceDeserializer(item);
  });
}

/** Access Review Instance. */
export interface AccessReviewInstance extends ProxyResource {
  /** This read-only field specifies the status of an access review instance. */
  readonly status?: AccessReviewInstanceStatus;
  /** The DateTime when the review instance is scheduled to be start. */
  startDateTime?: Date;
  /** The DateTime when the review instance is scheduled to end. */
  endDateTime?: Date;
  /** This is the collection of reviewers. */
  reviewers?: AccessReviewReviewer[];
  /** This is the collection of backup reviewers. */
  backupReviewers?: AccessReviewReviewer[];
  /** This field specifies the type of reviewers for a review. Usually for a review, reviewers are explicitly assigned. However, in some cases, the reviewers may not be assigned and instead be chosen dynamically. For example managers review or self review. */
  readonly reviewersType?: AccessReviewInstanceReviewersType;
}

export function accessReviewInstanceSerializer(item: AccessReviewInstance): any {
  return {
    properties: areAllPropsUndefined(item, [
      "startDateTime",
      "endDateTime",
      "reviewers",
      "backupReviewers",
    ])
      ? undefined
      : _accessReviewInstancePropertiesSerializer(item),
  };
}

export function accessReviewInstanceDeserializer(item: any): AccessReviewInstance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _accessReviewInstancePropertiesDeserializer(item["properties"])),
  };
}

/** Access Review Instance properties. */
export interface AccessReviewInstanceProperties {
  /** This read-only field specifies the status of an access review instance. */
  readonly status?: AccessReviewInstanceStatus;
  /** The DateTime when the review instance is scheduled to be start. */
  startDateTime?: Date;
  /** The DateTime when the review instance is scheduled to end. */
  endDateTime?: Date;
  /** This is the collection of reviewers. */
  reviewers?: AccessReviewReviewer[];
  /** This is the collection of backup reviewers. */
  backupReviewers?: AccessReviewReviewer[];
  /** This field specifies the type of reviewers for a review. Usually for a review, reviewers are explicitly assigned. However, in some cases, the reviewers may not be assigned and instead be chosen dynamically. For example managers review or self review. */
  readonly reviewersType?: AccessReviewInstanceReviewersType;
}

export function accessReviewInstancePropertiesSerializer(
  item: AccessReviewInstanceProperties,
): any {
  return {
    startDateTime: !item["startDateTime"]
      ? item["startDateTime"]
      : item["startDateTime"].toISOString(),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : item["endDateTime"].toISOString(),
    reviewers: !item["reviewers"]
      ? item["reviewers"]
      : accessReviewReviewerArraySerializer(item["reviewers"]),
    backupReviewers: !item["backupReviewers"]
      ? item["backupReviewers"]
      : accessReviewReviewerArraySerializer(item["backupReviewers"]),
  };
}

export function accessReviewInstancePropertiesDeserializer(
  item: any,
): AccessReviewInstanceProperties {
  return {
    status: item["status"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    reviewers: !item["reviewers"]
      ? item["reviewers"]
      : accessReviewReviewerArrayDeserializer(item["reviewers"]),
    backupReviewers: !item["backupReviewers"]
      ? item["backupReviewers"]
      : accessReviewReviewerArrayDeserializer(item["backupReviewers"]),
    reviewersType: item["reviewersType"],
  };
}

/** This read-only field specifies the status of an access review instance. */
export enum KnownAccessReviewInstanceStatus {
  /** NotStarted */
  NotStarted = "NotStarted",
  /** InProgress */
  InProgress = "InProgress",
  /** Completed */
  Completed = "Completed",
  /** Applied */
  Applied = "Applied",
  /** Initializing */
  Initializing = "Initializing",
  /** Applying */
  Applying = "Applying",
  /** Completing */
  Completing = "Completing",
  /** Scheduled */
  Scheduled = "Scheduled",
  /** AutoReviewing */
  AutoReviewing = "AutoReviewing",
  /** AutoReviewed */
  AutoReviewed = "AutoReviewed",
  /** Starting */
  Starting = "Starting",
}

/**
 * This read-only field specifies the status of an access review instance. \
 * {@link KnownAccessReviewInstanceStatus} can be used interchangeably with AccessReviewInstanceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: NotStarted \
 * **InProgress**: InProgress \
 * **Completed**: Completed \
 * **Applied**: Applied \
 * **Initializing**: Initializing \
 * **Applying**: Applying \
 * **Completing**: Completing \
 * **Scheduled**: Scheduled \
 * **AutoReviewing**: AutoReviewing \
 * **AutoReviewed**: AutoReviewed \
 * **Starting**: Starting
 */
export type AccessReviewInstanceStatus = string;

/** This field specifies the type of reviewers for a review. Usually for a review, reviewers are explicitly assigned. However, in some cases, the reviewers may not be assigned and instead be chosen dynamically. For example managers review or self review. */
export enum KnownAccessReviewInstanceReviewersType {
  /** Assigned */
  Assigned = "Assigned",
  /** Self */
  Self = "Self",
  /** Managers */
  Managers = "Managers",
}

/**
 * This field specifies the type of reviewers for a review. Usually for a review, reviewers are explicitly assigned. However, in some cases, the reviewers may not be assigned and instead be chosen dynamically. For example managers review or self review. \
 * {@link KnownAccessReviewInstanceReviewersType} can be used interchangeably with AccessReviewInstanceReviewersType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Assigned**: Assigned \
 * **Self**: Self \
 * **Managers**: Managers
 */
export type AccessReviewInstanceReviewersType = string;

export function accessReviewScheduleDefinitionArrayDeserializer(
  result: Array<AccessReviewScheduleDefinition>,
): any[] {
  return result.map((item) => {
    return accessReviewScheduleDefinitionDeserializer(item);
  });
}

/** Access Review Default Settings. */
export interface AccessReviewDefaultSettings extends ProxyResource {
  /** Flag to indicate whether sending mails to reviewers and the review creator is enabled. */
  mailNotificationsEnabled?: boolean;
  /** Flag to indicate whether sending reminder emails to reviewers are enabled. */
  reminderNotificationsEnabled?: boolean;
  /** Flag to indicate whether reviewers are required to provide a justification when reviewing access. */
  defaultDecisionEnabled?: boolean;
  /** Flag to indicate whether the reviewer is required to pass justification when recording a decision. */
  justificationRequiredOnApproval?: boolean;
  /** This specifies the behavior for the autoReview feature when an access review completes. */
  defaultDecision?: DefaultDecisionType;
  /** Flag to indicate whether auto-apply capability, to automatically change the target object access resource, is enabled. If not enabled, a user must, after the review completes, apply the access review. */
  autoApplyDecisionsEnabled?: boolean;
  /** Flag to indicate whether showing recommendations to reviewers is enabled. */
  recommendationsEnabled?: boolean;
  /** Recommendations for access reviews are calculated by looking back at 30 days of data(w.r.t the start date of the review) by default. However, in some scenarios, customers want to change how far back to look at and want to configure 60 days, 90 days, etc. instead. This setting allows customers to configure this duration. The value should be in ISO  8601 format (http://en.wikipedia.org/wiki/ISO_8601#Durations).This code can be used to convert TimeSpan to a valid interval string: XmlConvert.ToString(new TimeSpan(hours, minutes, seconds)) */
  recommendationLookBackDuration?: string;
  /** The duration in days for an instance. */
  instanceDurationInDays?: number;
  /** Access Review Settings. */
  recurrence?: AccessReviewRecurrenceSettings;
}

export function accessReviewDefaultSettingsDeserializer(item: any): AccessReviewDefaultSettings {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _accessReviewDefaultSettingsPropertiesDeserializer(item["properties"])),
  };
}

/** Paged collection of AccessReviewHistoryInstance items */
export interface _AccessReviewHistoryDefinitionInstanceListResult {
  /** The AccessReviewHistoryInstance items on this page */
  value: AccessReviewHistoryInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _accessReviewHistoryDefinitionInstanceListResultDeserializer(
  item: any,
): _AccessReviewHistoryDefinitionInstanceListResult {
  return {
    value: accessReviewHistoryInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function accessReviewDecisionArrayDeserializer(result: Array<AccessReviewDecision>): any[] {
  return result.map((item) => {
    return accessReviewDecisionDeserializer(item);
  });
}

/** Access Review. */
export interface AccessReviewDecision extends ProxyResource {
  /** Principal associated with the decision record. Can be AccessReviewDecisionUserIdentity or AccessReviewDecisionServicePrincipalIdentity */
  readonly principal?: AccessReviewDecisionIdentityUnion;
  /** Resource associated with this decision record. */
  readonly resource?: AccessReviewDecisionResource;
  /** The feature- generated recommendation shown to the reviewer. */
  readonly recommendation?: AccessRecommendationType;
  /** The decision on the approval step. This value is initially set to NotReviewed. Approvers can take action of Approve/Deny */
  decision?: AccessReviewResult;
  /** Justification provided by approvers for their action */
  justification?: string;
  /** Date Time when a decision was taken. */
  readonly reviewedDateTime?: Date;
  /** Details of the approver. */
  readonly reviewedBy?: AccessReviewActorIdentity;
  /** The outcome of applying the decision. */
  readonly applyResult?: AccessReviewApplyResult;
  /** The date and time when the review decision was applied. */
  readonly appliedDateTime?: Date;
  /** Details of the approver. */
  readonly appliedBy?: AccessReviewActorIdentity;
  /** This is the collection of insights for this decision item. */
  insights?: AccessReviewDecisionInsight[];
  /** Details of the membership type. */
  readonly principalResourceMembership?: AccessReviewDecisionPrincipalResourceMembership;
}

export function accessReviewDecisionDeserializer(item: any): AccessReviewDecision {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _accessReviewDecisionPropertiesDeserializer(item["properties"])),
  };
}

/** Approval Step. */
export interface AccessReviewDecisionProperties {
  /** Principal associated with the decision record. Can be AccessReviewDecisionUserIdentity or AccessReviewDecisionServicePrincipalIdentity */
  readonly principal?: AccessReviewDecisionIdentityUnion;
  /** Resource associated with this decision record. */
  readonly resource?: AccessReviewDecisionResource;
  /** The feature- generated recommendation shown to the reviewer. */
  readonly recommendation?: AccessRecommendationType;
  /** The decision on the approval step. This value is initially set to NotReviewed. Approvers can take action of Approve/Deny */
  decision?: AccessReviewResult;
  /** Justification provided by approvers for their action */
  justification?: string;
  /** Date Time when a decision was taken. */
  readonly reviewedDateTime?: Date;
  /** Details of the approver. */
  readonly reviewedBy?: AccessReviewActorIdentity;
  /** The outcome of applying the decision. */
  readonly applyResult?: AccessReviewApplyResult;
  /** The date and time when the review decision was applied. */
  readonly appliedDateTime?: Date;
  /** Details of the approver. */
  readonly appliedBy?: AccessReviewActorIdentity;
  /** This is the collection of insights for this decision item. */
  insights?: AccessReviewDecisionInsight[];
  /** Details of the membership type. */
  readonly principalResourceMembership?: AccessReviewDecisionPrincipalResourceMembership;
}

export function accessReviewDecisionPropertiesSerializer(
  item: AccessReviewDecisionProperties,
): any {
  return {
    decision: item["decision"],
    justification: item["justification"],
    insights: !item["insights"]
      ? item["insights"]
      : accessReviewDecisionInsightArraySerializer(item["insights"]),
  };
}

export function accessReviewDecisionPropertiesDeserializer(
  item: any,
): AccessReviewDecisionProperties {
  return {
    principal: !item["principal"]
      ? item["principal"]
      : accessReviewDecisionIdentityUnionDeserializer(item["principal"]),
    resource: !item["resource"]
      ? item["resource"]
      : accessReviewDecisionResourceDeserializer(item["resource"]),
    recommendation: item["recommendation"],
    decision: item["decision"],
    justification: item["justification"],
    reviewedDateTime: !item["reviewedDateTime"]
      ? item["reviewedDateTime"]
      : new Date(item["reviewedDateTime"]),
    reviewedBy: !item["reviewedBy"]
      ? item["reviewedBy"]
      : accessReviewActorIdentityDeserializer(item["reviewedBy"]),
    applyResult: item["applyResult"],
    appliedDateTime: !item["appliedDateTime"]
      ? item["appliedDateTime"]
      : new Date(item["appliedDateTime"]),
    appliedBy: !item["appliedBy"]
      ? item["appliedBy"]
      : accessReviewActorIdentityDeserializer(item["appliedBy"]),
    insights: !item["insights"]
      ? item["insights"]
      : accessReviewDecisionInsightArrayDeserializer(item["insights"]),
    principalResourceMembership: !item["principalResourceMembership"]
      ? item["principalResourceMembership"]
      : accessReviewDecisionPrincipalResourceMembershipDeserializer(
          item["principalResourceMembership"],
        ),
  };
}

/** Target of the decision. */
export interface AccessReviewDecisionIdentity {
  /** The type of decision target : User/ServicePrincipal */
  /** The discriminator possible values: user, servicePrincipal */
  type: DecisionTargetType;
  /** The id of principal whose access was reviewed. */
  readonly id?: string;
  /** The display name of the user whose access was reviewed. */
  readonly displayName?: string;
}

export function accessReviewDecisionIdentityDeserializer(item: any): AccessReviewDecisionIdentity {
  return {
    type: item["type"],
    id: item["id"],
    displayName: item["displayName"],
  };
}

/** Alias for AccessReviewDecisionIdentityUnion */
export type AccessReviewDecisionIdentityUnion =
  | AccessReviewDecisionUserIdentity
  | AccessReviewDecisionServicePrincipalIdentity
  | AccessReviewDecisionIdentity;

export function accessReviewDecisionIdentityUnionDeserializer(
  item: any,
): AccessReviewDecisionIdentityUnion {
  switch (item["type"]) {
    case "user":
      return accessReviewDecisionUserIdentityDeserializer(item as AccessReviewDecisionUserIdentity);

    case "servicePrincipal":
      return accessReviewDecisionServicePrincipalIdentityDeserializer(
        item as AccessReviewDecisionServicePrincipalIdentity,
      );

    default:
      return accessReviewDecisionIdentityDeserializer(item);
  }
}

/** The type of decision target : User/ServicePrincipal */
export enum KnownDecisionTargetType {
  /** user */
  User = "user",
  /** servicePrincipal */
  ServicePrincipal = "servicePrincipal",
}

/**
 * The type of decision target : User/ServicePrincipal \
 * {@link KnownDecisionTargetType} can be used interchangeably with DecisionTargetType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: user \
 * **servicePrincipal**: servicePrincipal
 */
export type DecisionTargetType = string;

/** User Decision Target */
export interface AccessReviewDecisionUserIdentity extends AccessReviewDecisionIdentity {
  /** The user principal name of the user whose access was reviewed. */
  readonly userPrincipalName?: string;
  /** The type of decision target : User/ServicePrincipal */
  type: "user";
}

export function accessReviewDecisionUserIdentityDeserializer(
  item: any,
): AccessReviewDecisionUserIdentity {
  return {
    type: item["type"],
    id: item["id"],
    displayName: item["displayName"],
    userPrincipalName: item["userPrincipalName"],
  };
}

/** Service Principal Decision Target */
export interface AccessReviewDecisionServicePrincipalIdentity extends AccessReviewDecisionIdentity {
  /** The appId for the service principal entity being reviewed */
  readonly appId?: string;
  /** The type of decision target : User/ServicePrincipal */
  type: "servicePrincipal";
}

export function accessReviewDecisionServicePrincipalIdentityDeserializer(
  item: any,
): AccessReviewDecisionServicePrincipalIdentity {
  return {
    type: item["type"],
    id: item["id"],
    displayName: item["displayName"],
    appId: item["appId"],
  };
}

/** Target of the decision. */
export interface AccessReviewDecisionResource {
  /** The type of resource */
  type: DecisionResourceType;
  /** The id of resource associated with a decision record. */
  readonly id?: string;
  /** The display name of resource associated with a decision record. */
  readonly displayName?: string;
}

export function accessReviewDecisionResourceDeserializer(item: any): AccessReviewDecisionResource {
  return {
    type: item["type"],
    id: item["id"],
    displayName: item["displayName"],
  };
}

/** The type of resource */
export enum KnownDecisionResourceType {
  /** azureRole */
  AzureRole = "azureRole",
}

/**
 * The type of resource \
 * {@link KnownDecisionResourceType} can be used interchangeably with DecisionResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **azureRole**: azureRole
 */
export type DecisionResourceType = string;

/** The feature- generated recommendation shown to the reviewer. */
export enum KnownAccessRecommendationType {
  /** Approve */
  Approve = "Approve",
  /** Deny */
  Deny = "Deny",
  /** NoInfoAvailable */
  NoInfoAvailable = "NoInfoAvailable",
}

/**
 * The feature- generated recommendation shown to the reviewer. \
 * {@link KnownAccessRecommendationType} can be used interchangeably with AccessRecommendationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approve**: Approve \
 * **Deny**: Deny \
 * **NoInfoAvailable**: NoInfoAvailable
 */
export type AccessRecommendationType = string;

/** The outcome of applying the decision. */
export enum KnownAccessReviewApplyResult {
  /** New */
  New = "New",
  /** Applying */
  Applying = "Applying",
  /** AppliedSuccessfully */
  AppliedSuccessfully = "AppliedSuccessfully",
  /** AppliedWithUnknownFailure */
  AppliedWithUnknownFailure = "AppliedWithUnknownFailure",
  /** AppliedSuccessfullyButObjectNotFound */
  AppliedSuccessfullyButObjectNotFound = "AppliedSuccessfullyButObjectNotFound",
  /** ApplyNotSupported */
  ApplyNotSupported = "ApplyNotSupported",
}

/**
 * The outcome of applying the decision. \
 * {@link KnownAccessReviewApplyResult} can be used interchangeably with AccessReviewApplyResult,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **New**: New \
 * **Applying**: Applying \
 * **AppliedSuccessfully**: AppliedSuccessfully \
 * **AppliedWithUnknownFailure**: AppliedWithUnknownFailure \
 * **AppliedSuccessfullyButObjectNotFound**: AppliedSuccessfullyButObjectNotFound \
 * **ApplyNotSupported**: ApplyNotSupported
 */
export type AccessReviewApplyResult = string;

export function accessReviewDecisionInsightArraySerializer(
  result: Array<AccessReviewDecisionInsight>,
): any[] {
  return result.map((item) => {
    return accessReviewDecisionInsightSerializer(item);
  });
}

export function accessReviewDecisionInsightArrayDeserializer(
  result: Array<AccessReviewDecisionInsight>,
): any[] {
  return result.map((item) => {
    return accessReviewDecisionInsightDeserializer(item);
  });
}

/** Access Review Decision Insight. */
export interface AccessReviewDecisionInsight {
  /** The access review insight id. */
  readonly id?: string;
  /** The access review insight name. */
  readonly name?: string;
  /** The resource type. */
  readonly type?: string;
  /** Access Review Decision Insight properties. */
  properties?: AccessReviewDecisionInsightPropertiesUnion;
}

export function accessReviewDecisionInsightSerializer(item: AccessReviewDecisionInsight): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : accessReviewDecisionInsightPropertiesUnionSerializer(item["properties"]),
  };
}

export function accessReviewDecisionInsightDeserializer(item: any): AccessReviewDecisionInsight {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : accessReviewDecisionInsightPropertiesUnionDeserializer(item["properties"]),
  };
}

/** Details of the Insight. */
export interface AccessReviewDecisionInsightProperties {
  /** The type of insight */
  /** The discriminator possible values: userSignInInsight */
  type: AccessReviewDecisionInsightType;
  /** Date Time when the insight was created. */
  readonly insightCreatedDateTime?: Date;
}

export function accessReviewDecisionInsightPropertiesSerializer(
  item: AccessReviewDecisionInsightProperties,
): any {
  return { type: item["type"] };
}

export function accessReviewDecisionInsightPropertiesDeserializer(
  item: any,
): AccessReviewDecisionInsightProperties {
  return {
    type: item["type"],
    insightCreatedDateTime: !item["insightCreatedDateTime"]
      ? item["insightCreatedDateTime"]
      : new Date(item["insightCreatedDateTime"]),
  };
}

/** Alias for AccessReviewDecisionInsightPropertiesUnion */
export type AccessReviewDecisionInsightPropertiesUnion =
  | AccessReviewDecisionUserSignInInsightProperties
  | AccessReviewDecisionInsightProperties;

export function accessReviewDecisionInsightPropertiesUnionSerializer(
  item: AccessReviewDecisionInsightPropertiesUnion,
): any {
  switch (item.type) {
    case "userSignInInsight":
      return accessReviewDecisionUserSignInInsightPropertiesSerializer(
        item as AccessReviewDecisionUserSignInInsightProperties,
      );

    default:
      return accessReviewDecisionInsightPropertiesSerializer(item);
  }
}

export function accessReviewDecisionInsightPropertiesUnionDeserializer(
  item: any,
): AccessReviewDecisionInsightPropertiesUnion {
  switch (item["type"]) {
    case "userSignInInsight":
      return accessReviewDecisionUserSignInInsightPropertiesDeserializer(
        item as AccessReviewDecisionUserSignInInsightProperties,
      );

    default:
      return accessReviewDecisionInsightPropertiesDeserializer(item);
  }
}

/** The type of insight */
export enum KnownAccessReviewDecisionInsightType {
  /** userSignInInsight */
  UserSignInInsight = "userSignInInsight",
}

/**
 * The type of insight \
 * {@link KnownAccessReviewDecisionInsightType} can be used interchangeably with AccessReviewDecisionInsightType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **userSignInInsight**: userSignInInsight
 */
export type AccessReviewDecisionInsightType = string;

/** User Decision Target */
export interface AccessReviewDecisionUserSignInInsightProperties extends AccessReviewDecisionInsightProperties {
  /** Date Time when the user signed into the tenant. */
  readonly lastSignInDateTime?: Date;
  /** The type of insight */
  type: "userSignInInsight";
}

export function accessReviewDecisionUserSignInInsightPropertiesSerializer(
  item: AccessReviewDecisionUserSignInInsightProperties,
): any {
  return { type: item["type"] };
}

export function accessReviewDecisionUserSignInInsightPropertiesDeserializer(
  item: any,
): AccessReviewDecisionUserSignInInsightProperties {
  return {
    type: item["type"],
    insightCreatedDateTime: !item["insightCreatedDateTime"]
      ? item["insightCreatedDateTime"]
      : new Date(item["insightCreatedDateTime"]),
    lastSignInDateTime: !item["lastSignInDateTime"]
      ? item["lastSignInDateTime"]
      : new Date(item["lastSignInDateTime"]),
  };
}

/** Target of the decision. */
export interface AccessReviewDecisionPrincipalResourceMembership {
  /** Every decision item in an access review represents a principal's membership to a resource. This property represents details of the membership. Examples of this detail might be whether the principal has direct access or indirect access */
  membershipTypes?: AccessReviewDecisionPrincipalResourceMembershipType[];
}

export function accessReviewDecisionPrincipalResourceMembershipDeserializer(
  item: any,
): AccessReviewDecisionPrincipalResourceMembership {
  return {
    membershipTypes: !item["membershipTypes"]
      ? item["membershipTypes"]
      : item["membershipTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** Known values of {@link AccessReviewDecisionPrincipalResourceMembershipType} that the service accepts. */
export enum KnownAccessReviewDecisionPrincipalResourceMembershipType {
  /** direct */
  Direct = "direct",
  /** indirect */
  Indirect = "indirect",
}

/** Type of AccessReviewDecisionPrincipalResourceMembershipType */
export type AccessReviewDecisionPrincipalResourceMembershipType = string;

export function accessReviewContactedReviewerArrayDeserializer(
  result: Array<AccessReviewContactedReviewer>,
): any[] {
  return result.map((item) => {
    return accessReviewContactedReviewerDeserializer(item);
  });
}

/** Access Review Contacted Reviewer. */
export interface AccessReviewContactedReviewer {
  /** The access review reviewer id. */
  readonly id?: string;
  /** The access review reviewer id. */
  readonly name?: string;
  /** The resource type. */
  readonly type?: string;
  /** The display name of the reviewer */
  readonly userDisplayName?: string;
  /** The user principal name of the reviewer */
  readonly userPrincipalName?: string;
  /** Date Time when the reviewer was contacted. */
  readonly createdDateTime?: Date;
}

export function accessReviewContactedReviewerDeserializer(
  item: any,
): AccessReviewContactedReviewer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _accessReviewContactedReviewerPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of access review contacted reviewer. */
export interface AccessReviewContactedReviewerProperties {
  /** The display name of the reviewer */
  readonly userDisplayName?: string;
  /** The user principal name of the reviewer */
  readonly userPrincipalName?: string;
  /** Date Time when the reviewer was contacted. */
  readonly createdDateTime?: Date;
}

export function accessReviewContactedReviewerPropertiesDeserializer(
  item: any,
): AccessReviewContactedReviewerProperties {
  return {
    userDisplayName: item["userDisplayName"],
    userPrincipalName: item["userPrincipalName"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
  };
}

/** Record All Decisions payload. */
export interface RecordAllDecisionsProperties {
  /** The id of principal which needs to be approved/denied. */
  readonly principalId?: string;
  /** The id of resource which needs to be approved/denied. */
  readonly resourceId?: string;
  /** The decision to make. Approvers can take action of Approve/Deny */
  decision?: RecordAllDecisionsResult;
  /** Justification provided by approvers for their action */
  justification?: string;
}

export function recordAllDecisionsPropertiesSerializer(item: RecordAllDecisionsProperties): any {
  return { decision: item["decision"], justification: item["justification"] };
}

/** The decision to make. Approvers can take action of Approve/Deny */
export enum KnownRecordAllDecisionsResult {
  /** Approve */
  Approve = "Approve",
  /** Deny */
  Deny = "Deny",
}

/**
 * The decision to make. Approvers can take action of Approve/Deny \
 * {@link KnownRecordAllDecisionsResult} can be used interchangeably with RecordAllDecisionsResult,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approve**: Approve \
 * **Deny**: Deny
 */
export type RecordAllDecisionsResult = string;

export function _accessReviewHistoryScheduleSettingsPatternSerializer(
  item: AccessReviewHistoryScheduleSettings,
): any {
  return { type: item["type"], interval: item["interval"] };
}

export function _accessReviewHistoryScheduleSettingsPatternDeserializer(item: any) {
  return {
    type: item["type"],
    interval: item["interval"],
  };
}

export function _accessReviewHistoryScheduleSettingsRangeSerializer(
  item: AccessReviewHistoryScheduleSettings,
): any {
  return {
    type: item["typeRangeType"],
    numberOfOccurrences: item["numberOfOccurrences"],
    startDate: !item["startDate"] ? item["startDate"] : item["startDate"].toISOString(),
    endDate: !item["endDate"] ? item["endDate"] : item["endDate"].toISOString(),
  };
}

export function _accessReviewHistoryScheduleSettingsRangeDeserializer(item: any) {
  return {
    typeRangeType: item["type"],
    numberOfOccurrences: item["numberOfOccurrences"],
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
  };
}

export function _accessReviewHistoryInstancePropertiesSerializer(
  item: AccessReviewHistoryInstance,
): any {
  return {
    reviewHistoryPeriodStartDateTime: !item["reviewHistoryPeriodStartDateTime"]
      ? item["reviewHistoryPeriodStartDateTime"]
      : item["reviewHistoryPeriodStartDateTime"].toISOString(),
    reviewHistoryPeriodEndDateTime: !item["reviewHistoryPeriodEndDateTime"]
      ? item["reviewHistoryPeriodEndDateTime"]
      : item["reviewHistoryPeriodEndDateTime"].toISOString(),
    displayName: item["displayName"],
    runDateTime: !item["runDateTime"] ? item["runDateTime"] : item["runDateTime"].toISOString(),
    fulfilledDateTime: !item["fulfilledDateTime"]
      ? item["fulfilledDateTime"]
      : item["fulfilledDateTime"].toISOString(),
    expiration: !item["expiration"] ? item["expiration"] : item["expiration"].toISOString(),
  };
}

export function _accessReviewHistoryInstancePropertiesDeserializer(item: any) {
  return {
    reviewHistoryPeriodStartDateTime: !item["reviewHistoryPeriodStartDateTime"]
      ? item["reviewHistoryPeriodStartDateTime"]
      : new Date(item["reviewHistoryPeriodStartDateTime"]),
    reviewHistoryPeriodEndDateTime: !item["reviewHistoryPeriodEndDateTime"]
      ? item["reviewHistoryPeriodEndDateTime"]
      : new Date(item["reviewHistoryPeriodEndDateTime"]),
    displayName: item["displayName"],
    status: item["status"],
    runDateTime: !item["runDateTime"] ? item["runDateTime"] : new Date(item["runDateTime"]),
    fulfilledDateTime: !item["fulfilledDateTime"]
      ? item["fulfilledDateTime"]
      : new Date(item["fulfilledDateTime"]),
    downloadUri: item["downloadUri"],
    expiration: !item["expiration"] ? item["expiration"] : new Date(item["expiration"]),
  };
}

export function _accessReviewHistoryDefinitionPropertiesSerializer(
  item: AccessReviewHistoryDefinition,
): any {
  return {
    displayName: item["displayName"],
    decisions: !item["decisions"]
      ? item["decisions"]
      : item["decisions"].map((p: any) => {
          return p;
        }),
    scopes: !item["scopes"] ? item["scopes"] : accessReviewScopeArraySerializer(item["scopes"]),
    settings: !item["settings"]
      ? item["settings"]
      : accessReviewHistoryScheduleSettingsSerializer(item["settings"]),
    instances: !item["instances"]
      ? item["instances"]
      : accessReviewHistoryInstanceArraySerializer(item["instances"]),
  };
}

export function _accessReviewHistoryDefinitionPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    reviewHistoryPeriodStartDateTime: !item["reviewHistoryPeriodStartDateTime"]
      ? item["reviewHistoryPeriodStartDateTime"]
      : new Date(item["reviewHistoryPeriodStartDateTime"]),
    reviewHistoryPeriodEndDateTime: !item["reviewHistoryPeriodEndDateTime"]
      ? item["reviewHistoryPeriodEndDateTime"]
      : new Date(item["reviewHistoryPeriodEndDateTime"]),
    decisions: !item["decisions"]
      ? item["decisions"]
      : item["decisions"].map((p1: any) => {
          return p1;
        }),
    status: item["status"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
    createdBy: !item["createdBy"]
      ? item["createdBy"]
      : accessReviewActorIdentityDeserializer(item["createdBy"]),
    scopes: !item["scopes"] ? item["scopes"] : accessReviewScopeArrayDeserializer(item["scopes"]),
    settings: !item["settings"]
      ? item["settings"]
      : accessReviewHistoryScheduleSettingsDeserializer(item["settings"]),
    instances: !item["instances"]
      ? item["instances"]
      : accessReviewHistoryInstanceArrayDeserializer(item["instances"]),
  };
}

export function _accessReviewScheduleDefinitionPropertiesCreatedByDeserializer(item: any) {
  return {
    principalId: item["principalId"],
    principalType: item["principalType"],
    principalName: item["principalName"],
    userPrincipalName: item["userPrincipalName"],
  };
}

export function _accessReviewRecurrenceSettingsPatternSerializer(
  item: AccessReviewRecurrenceSettings,
): any {
  return { type: item["type"], interval: item["interval"] };
}

export function _accessReviewRecurrenceSettingsPatternDeserializer(item: any) {
  return {
    type: item["type"],
    interval: item["interval"],
  };
}

export function _accessReviewRecurrenceSettingsRangeSerializer(
  item: AccessReviewRecurrenceSettings,
): any {
  return {
    type: item["typeRangeType"],
    numberOfOccurrences: item["numberOfOccurrences"],
    startDate: !item["startDate"] ? item["startDate"] : item["startDate"].toISOString(),
    endDate: !item["endDate"] ? item["endDate"] : item["endDate"].toISOString(),
  };
}

export function _accessReviewRecurrenceSettingsRangeDeserializer(item: any) {
  return {
    typeRangeType: item["type"],
    numberOfOccurrences: item["numberOfOccurrences"],
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    endDate: !item["endDate"] ? item["endDate"] : new Date(item["endDate"]),
  };
}

export function _accessReviewScheduleSettingsRecurrenceSerializer(
  item: AccessReviewScheduleSettings,
): any {
  return {
    pattern: !item["pattern"]
      ? item["pattern"]
      : accessReviewRecurrencePatternSerializer(item["pattern"]),
    range: !item["range"] ? item["range"] : accessReviewRecurrenceRangeSerializer(item["range"]),
  };
}

export function _accessReviewScheduleSettingsRecurrenceDeserializer(item: any) {
  return {
    pattern: !item["pattern"]
      ? item["pattern"]
      : accessReviewRecurrencePatternDeserializer(item["pattern"]),
    range: !item["range"] ? item["range"] : accessReviewRecurrenceRangeDeserializer(item["range"]),
  };
}

export function _accessReviewScheduleDefinitionPropertiesSettingsSerializer(
  item: AccessReviewScheduleDefinitionProperties,
): any {
  return {
    mailNotificationsEnabled: item["mailNotificationsEnabled"],
    reminderNotificationsEnabled: item["reminderNotificationsEnabled"],
    defaultDecisionEnabled: item["defaultDecisionEnabled"],
    justificationRequiredOnApproval: item["justificationRequiredOnApproval"],
    defaultDecision: item["defaultDecision"],
    autoApplyDecisionsEnabled: item["autoApplyDecisionsEnabled"],
    recommendationsEnabled: item["recommendationsEnabled"],
    recommendationLookBackDuration: item["recommendationLookBackDuration"],
    instanceDurationInDays: item["instanceDurationInDays"],
    recurrence: !item["recurrence"]
      ? item["recurrence"]
      : accessReviewRecurrenceSettingsSerializer(item["recurrence"]),
  };
}

export function _accessReviewScheduleDefinitionPropertiesSettingsDeserializer(item: any) {
  return {
    mailNotificationsEnabled: item["mailNotificationsEnabled"],
    reminderNotificationsEnabled: item["reminderNotificationsEnabled"],
    defaultDecisionEnabled: item["defaultDecisionEnabled"],
    justificationRequiredOnApproval: item["justificationRequiredOnApproval"],
    defaultDecision: item["defaultDecision"],
    autoApplyDecisionsEnabled: item["autoApplyDecisionsEnabled"],
    recommendationsEnabled: item["recommendationsEnabled"],
    recommendationLookBackDuration: item["recommendationLookBackDuration"],
    instanceDurationInDays: item["instanceDurationInDays"],
    recurrence: !item["recurrence"]
      ? item["recurrence"]
      : accessReviewRecurrenceSettingsDeserializer(item["recurrence"]),
  };
}

export function _accessReviewScheduleDefinitionPropertiesScopeSerializer(
  item: AccessReviewScheduleDefinitionProperties,
): any {
  return {
    inactiveDuration: item["inactiveDuration"],
    expandNestedMemberships: item["expandNestedMemberships"],
    includeInheritedAccess: item["includeInheritedAccess"],
    includeAccessBelowResource: item["includeAccessBelowResource"],
    excludeResourceId: item["excludeResourceId"],
    excludeRoleDefinitionId: item["excludeRoleDefinitionId"],
  };
}

export function _accessReviewScheduleDefinitionPropertiesScopeDeserializer(item: any) {
  return {
    resourceId: item["resourceId"],
    roleDefinitionId: item["roleDefinitionId"],
    principalTypeScopePrincipalType: item["principalType"],
    assignmentState: item["assignmentState"],
    inactiveDuration: item["inactiveDuration"],
    expandNestedMemberships: item["expandNestedMemberships"],
    includeInheritedAccess: item["includeInheritedAccess"],
    includeAccessBelowResource: item["includeAccessBelowResource"],
    excludeResourceId: item["excludeResourceId"],
    excludeRoleDefinitionId: item["excludeRoleDefinitionId"],
  };
}

export function _accessReviewInstancePropertiesSerializer(item: AccessReviewInstance): any {
  return {
    startDateTime: !item["startDateTime"]
      ? item["startDateTime"]
      : item["startDateTime"].toISOString(),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : item["endDateTime"].toISOString(),
    reviewers: !item["reviewers"]
      ? item["reviewers"]
      : accessReviewReviewerArraySerializer(item["reviewers"]),
    backupReviewers: !item["backupReviewers"]
      ? item["backupReviewers"]
      : accessReviewReviewerArraySerializer(item["backupReviewers"]),
  };
}

export function _accessReviewInstancePropertiesDeserializer(item: any) {
  return {
    status: item["status"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    reviewers: !item["reviewers"]
      ? item["reviewers"]
      : accessReviewReviewerArrayDeserializer(item["reviewers"]),
    backupReviewers: !item["backupReviewers"]
      ? item["backupReviewers"]
      : accessReviewReviewerArrayDeserializer(item["backupReviewers"]),
    reviewersType: item["reviewersType"],
  };
}

export function _accessReviewScheduleDefinitionPropertiesSerializer(
  item: AccessReviewScheduleDefinition,
): any {
  return {
    displayName: item["displayName"],
    descriptionForAdmins: item["descriptionForAdmins"],
    descriptionForReviewers: item["descriptionForReviewers"],
    settings: !item["settings"]
      ? item["settings"]
      : accessReviewScheduleSettingsSerializer(item["settings"]),
    reviewers: !item["reviewers"]
      ? item["reviewers"]
      : accessReviewReviewerArraySerializer(item["reviewers"]),
    backupReviewers: !item["backupReviewers"]
      ? item["backupReviewers"]
      : accessReviewReviewerArraySerializer(item["backupReviewers"]),
    instances: !item["instances"]
      ? item["instances"]
      : accessReviewInstanceArraySerializer(item["instances"]),
  };
}

export function _accessReviewScheduleDefinitionPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    status: item["status"],
    descriptionForAdmins: item["descriptionForAdmins"],
    descriptionForReviewers: item["descriptionForReviewers"],
    createdBy: !item["createdBy"]
      ? item["createdBy"]
      : accessReviewActorIdentityDeserializer(item["createdBy"]),
    settings: !item["settings"]
      ? item["settings"]
      : accessReviewScheduleSettingsDeserializer(item["settings"]),
    scope: !item["scope"] ? item["scope"] : accessReviewScopeDeserializer(item["scope"]),
    reviewers: !item["reviewers"]
      ? item["reviewers"]
      : accessReviewReviewerArrayDeserializer(item["reviewers"]),
    backupReviewers: !item["backupReviewers"]
      ? item["backupReviewers"]
      : accessReviewReviewerArrayDeserializer(item["backupReviewers"]),
    reviewersType: item["reviewersType"],
    instances: !item["instances"]
      ? item["instances"]
      : accessReviewInstanceArrayDeserializer(item["instances"]),
  };
}

export function _accessReviewDefaultSettingsPropertiesSerializer(
  item: AccessReviewDefaultSettings,
): any {
  return {
    mailNotificationsEnabled: item["mailNotificationsEnabled"],
    reminderNotificationsEnabled: item["reminderNotificationsEnabled"],
    defaultDecisionEnabled: item["defaultDecisionEnabled"],
    justificationRequiredOnApproval: item["justificationRequiredOnApproval"],
    defaultDecision: item["defaultDecision"],
    autoApplyDecisionsEnabled: item["autoApplyDecisionsEnabled"],
    recommendationsEnabled: item["recommendationsEnabled"],
    recommendationLookBackDuration: item["recommendationLookBackDuration"],
    instanceDurationInDays: item["instanceDurationInDays"],
    recurrence: !item["recurrence"]
      ? item["recurrence"]
      : accessReviewRecurrenceSettingsSerializer(item["recurrence"]),
  };
}

export function _accessReviewDefaultSettingsPropertiesDeserializer(item: any) {
  return {
    mailNotificationsEnabled: item["mailNotificationsEnabled"],
    reminderNotificationsEnabled: item["reminderNotificationsEnabled"],
    defaultDecisionEnabled: item["defaultDecisionEnabled"],
    justificationRequiredOnApproval: item["justificationRequiredOnApproval"],
    defaultDecision: item["defaultDecision"],
    autoApplyDecisionsEnabled: item["autoApplyDecisionsEnabled"],
    recommendationsEnabled: item["recommendationsEnabled"],
    recommendationLookBackDuration: item["recommendationLookBackDuration"],
    instanceDurationInDays: item["instanceDurationInDays"],
    recurrence: !item["recurrence"]
      ? item["recurrence"]
      : accessReviewRecurrenceSettingsDeserializer(item["recurrence"]),
  };
}

export function _accessReviewDecisionPropertiesSerializer(item: AccessReviewDecision): any {
  return {
    decision: item["decision"],
    justification: item["justification"],
    insights: !item["insights"]
      ? item["insights"]
      : accessReviewDecisionInsightArraySerializer(item["insights"]),
  };
}

export function _accessReviewDecisionPropertiesDeserializer(item: any) {
  return {
    principal: !item["principal"]
      ? item["principal"]
      : accessReviewDecisionIdentityUnionDeserializer(item["principal"]),
    resource: !item["resource"]
      ? item["resource"]
      : accessReviewDecisionResourceDeserializer(item["resource"]),
    recommendation: item["recommendation"],
    decision: item["decision"],
    justification: item["justification"],
    reviewedDateTime: !item["reviewedDateTime"]
      ? item["reviewedDateTime"]
      : new Date(item["reviewedDateTime"]),
    reviewedBy: !item["reviewedBy"]
      ? item["reviewedBy"]
      : accessReviewActorIdentityDeserializer(item["reviewedBy"]),
    applyResult: item["applyResult"],
    appliedDateTime: !item["appliedDateTime"]
      ? item["appliedDateTime"]
      : new Date(item["appliedDateTime"]),
    appliedBy: !item["appliedBy"]
      ? item["appliedBy"]
      : accessReviewActorIdentityDeserializer(item["appliedBy"]),
    insights: !item["insights"]
      ? item["insights"]
      : accessReviewDecisionInsightArrayDeserializer(item["insights"]),
    principalResourceMembership: !item["principalResourceMembership"]
      ? item["principalResourceMembership"]
      : accessReviewDecisionPrincipalResourceMembershipDeserializer(
          item["principalResourceMembership"],
        ),
  };
}

export function _accessReviewContactedReviewerPropertiesDeserializer(item: any) {
  return {
    userDisplayName: item["userDisplayName"],
    userPrincipalName: item["userPrincipalName"],
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
  };
}
