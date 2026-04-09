// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../../../static-helpers/serialization/check-prop-undefined.js";
import type { ExtensionResource } from "../../models.js";
import { systemDataDeserializer } from "../../models.js";
import type { PrincipalType, Principal } from "../common/models.js";
import { principalDeserializer } from "../common/models.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Role Assignment schedule */
export interface RoleAssignmentSchedule extends ExtensionResource {
  /** The role assignment schedule scope. */
  scope?: string;
  /** The role definition ID. */
  roleDefinitionId?: string;
  /** The principal ID. */
  principalId?: string;
  /** The principal type of the assigned principal ID. */
  principalType?: PrincipalType;
  /** The id of roleAssignmentScheduleRequest used to create this roleAssignmentSchedule */
  roleAssignmentScheduleRequestId?: string;
  /** The id of roleEligibilitySchedule used to activated this roleAssignmentSchedule */
  linkedRoleEligibilityScheduleId?: string;
  /** Assignment type of the role assignment schedule */
  assignmentType?: AssignmentType;
  /** Membership type of the role assignment schedule */
  memberType?: MemberType;
  /** The status of the role assignment schedule. */
  status?: Status;
  /** Start DateTime when role assignment schedule */
  startDateTime?: Date;
  /** End DateTime when role assignment schedule */
  endDateTime?: Date;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently accepted value is '2.0' */
  conditionVersion?: string;
  /** DateTime when role assignment schedule was created */
  createdOn?: Date;
  /** DateTime when role assignment schedule was modified */
  updatedOn?: Date;
  /** Additional properties of principal, scope and role definition */
  expandedProperties?: ExpandedProperties;
}

export function roleAssignmentScheduleDeserializer(item: any): RoleAssignmentSchedule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _roleAssignmentSchedulePropertiesDeserializer(item["properties"])),
  };
}

/** Role assignment schedule properties with scope. */
export interface RoleAssignmentScheduleProperties {
  /** The role assignment schedule scope. */
  scope?: string;
  /** The role definition ID. */
  roleDefinitionId?: string;
  /** The principal ID. */
  principalId?: string;
  /** The principal type of the assigned principal ID. */
  principalType?: PrincipalType;
  /** The id of roleAssignmentScheduleRequest used to create this roleAssignmentSchedule */
  roleAssignmentScheduleRequestId?: string;
  /** The id of roleEligibilitySchedule used to activated this roleAssignmentSchedule */
  linkedRoleEligibilityScheduleId?: string;
  /** Assignment type of the role assignment schedule */
  assignmentType?: AssignmentType;
  /** Membership type of the role assignment schedule */
  memberType?: MemberType;
  /** The status of the role assignment schedule. */
  status?: Status;
  /** Start DateTime when role assignment schedule */
  startDateTime?: Date;
  /** End DateTime when role assignment schedule */
  endDateTime?: Date;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently accepted value is '2.0' */
  conditionVersion?: string;
  /** DateTime when role assignment schedule was created */
  createdOn?: Date;
  /** DateTime when role assignment schedule was modified */
  updatedOn?: Date;
  /** Additional properties of principal, scope and role definition */
  expandedProperties?: ExpandedProperties;
}

export function roleAssignmentSchedulePropertiesDeserializer(
  item: any,
): RoleAssignmentScheduleProperties {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    roleAssignmentScheduleRequestId: item["roleAssignmentScheduleRequestId"],
    linkedRoleEligibilityScheduleId: item["linkedRoleEligibilityScheduleId"],
    assignmentType: item["assignmentType"],
    memberType: item["memberType"],
    status: item["status"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    updatedOn: !item["updatedOn"] ? item["updatedOn"] : new Date(item["updatedOn"]),
    expandedProperties: !item["expandedProperties"]
      ? item["expandedProperties"]
      : expandedPropertiesDeserializer(item["expandedProperties"]),
  };
}

/** Assignment type of the role assignment schedule */
export enum KnownAssignmentType {
  /** Activated */
  Activated = "Activated",
  /** Assigned */
  Assigned = "Assigned",
}

/**
 * Assignment type of the role assignment schedule \
 * {@link KnownAssignmentType} can be used interchangeably with AssignmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Activated**: Activated \
 * **Assigned**: Assigned
 */
export type AssignmentType = string;

/** Membership type of the role assignment schedule */
export enum KnownMemberType {
  /** Inherited */
  Inherited = "Inherited",
  /** Direct */
  Direct = "Direct",
  /** Group */
  Group = "Group",
}

/**
 * Membership type of the role assignment schedule \
 * {@link KnownMemberType} can be used interchangeably with MemberType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inherited**: Inherited \
 * **Direct**: Direct \
 * **Group**: Group
 */
export type MemberType = string;

/** The status of the role assignment schedule. */
export enum KnownStatus {
  /** Accepted */
  Accepted = "Accepted",
  /** PendingEvaluation */
  PendingEvaluation = "PendingEvaluation",
  /** Granted */
  Granted = "Granted",
  /** Denied */
  Denied = "Denied",
  /** PendingProvisioning */
  PendingProvisioning = "PendingProvisioning",
  /** Provisioned */
  Provisioned = "Provisioned",
  /** PendingRevocation */
  PendingRevocation = "PendingRevocation",
  /** Revoked */
  Revoked = "Revoked",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** PendingApprovalProvisioning */
  PendingApprovalProvisioning = "PendingApprovalProvisioning",
  /** PendingApproval */
  PendingApproval = "PendingApproval",
  /** FailedAsResourceIsLocked */
  FailedAsResourceIsLocked = "FailedAsResourceIsLocked",
  /** PendingAdminDecision */
  PendingAdminDecision = "PendingAdminDecision",
  /** AdminApproved */
  AdminApproved = "AdminApproved",
  /** AdminDenied */
  AdminDenied = "AdminDenied",
  /** TimedOut */
  TimedOut = "TimedOut",
  /** ProvisioningStarted */
  ProvisioningStarted = "ProvisioningStarted",
  /** Invalid */
  Invalid = "Invalid",
  /** PendingScheduleCreation */
  PendingScheduleCreation = "PendingScheduleCreation",
  /** ScheduleCreated */
  ScheduleCreated = "ScheduleCreated",
  /** PendingExternalProvisioning */
  PendingExternalProvisioning = "PendingExternalProvisioning",
}

/**
 * The status of the role assignment schedule. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: Accepted \
 * **PendingEvaluation**: PendingEvaluation \
 * **Granted**: Granted \
 * **Denied**: Denied \
 * **PendingProvisioning**: PendingProvisioning \
 * **Provisioned**: Provisioned \
 * **PendingRevocation**: PendingRevocation \
 * **Revoked**: Revoked \
 * **Canceled**: Canceled \
 * **Failed**: Failed \
 * **PendingApprovalProvisioning**: PendingApprovalProvisioning \
 * **PendingApproval**: PendingApproval \
 * **FailedAsResourceIsLocked**: FailedAsResourceIsLocked \
 * **PendingAdminDecision**: PendingAdminDecision \
 * **AdminApproved**: AdminApproved \
 * **AdminDenied**: AdminDenied \
 * **TimedOut**: TimedOut \
 * **ProvisioningStarted**: ProvisioningStarted \
 * **Invalid**: Invalid \
 * **PendingScheduleCreation**: PendingScheduleCreation \
 * **ScheduleCreated**: ScheduleCreated \
 * **PendingExternalProvisioning**: PendingExternalProvisioning
 */
export type Status = string;

/** model interface ExpandedProperties */
export interface ExpandedProperties {
  /** Details of the resource scope */
  scope?: ExpandedPropertiesScope;
  /** Details of role definition */
  roleDefinition?: ExpandedPropertiesRoleDefinition;
  /** Details of the principal */
  principal?: ExpandedPropertiesPrincipal;
}

export function expandedPropertiesDeserializer(item: any): ExpandedProperties {
  return {
    scope: !item["scope"] ? item["scope"] : expandedPropertiesScopeDeserializer(item["scope"]),
    roleDefinition: !item["roleDefinition"]
      ? item["roleDefinition"]
      : expandedPropertiesRoleDefinitionDeserializer(item["roleDefinition"]),
    principal: !item["principal"]
      ? item["principal"]
      : expandedPropertiesPrincipalDeserializer(item["principal"]),
  };
}

/** Details of the resource scope */
export interface ExpandedPropertiesScope {
  /** Scope id of the resource */
  id?: string;
  /** Display name of the resource */
  displayName?: string;
  /** Type of the resource */
  type?: string;
}

export function expandedPropertiesScopeDeserializer(item: any): ExpandedPropertiesScope {
  return {
    id: item["id"],
    displayName: item["displayName"],
    type: item["type"],
  };
}

/** Details of role definition */
export interface ExpandedPropertiesRoleDefinition {
  /** Id of the role definition */
  id?: string;
  /** Display name of the role definition */
  displayName?: string;
  /** Type of the role definition */
  type?: string;
}

export function expandedPropertiesRoleDefinitionDeserializer(
  item: any,
): ExpandedPropertiesRoleDefinition {
  return {
    id: item["id"],
    displayName: item["displayName"],
    type: item["type"],
  };
}

/** Details of the principal */
export interface ExpandedPropertiesPrincipal {
  /** Id of the principal */
  id?: string;
  /** Display name of the principal */
  displayName?: string;
  /** Email id of the principal */
  email?: string;
  /** Type of the principal */
  type?: string;
}

export function expandedPropertiesPrincipalDeserializer(item: any): ExpandedPropertiesPrincipal {
  return {
    id: item["id"],
    displayName: item["displayName"],
    email: item["email"],
    type: item["type"],
  };
}

export function roleAssignmentScheduleArrayDeserializer(
  result: Array<RoleAssignmentSchedule>,
): any[] {
  return result.map((item) => {
    return roleAssignmentScheduleDeserializer(item);
  });
}

/** Information about current or upcoming role assignment schedule instance */
export interface RoleAssignmentScheduleInstance extends ExtensionResource {
  /** The role assignment schedule scope. */
  scope?: string;
  /** The role definition ID. */
  roleDefinitionId?: string;
  /** The principal ID. */
  principalId?: string;
  /** The principal type of the assigned principal ID. */
  principalType?: PrincipalType;
  /** Id of the master role assignment schedule */
  roleAssignmentScheduleId?: string;
  /** Role Assignment Id in external system */
  originRoleAssignmentId?: string;
  /** The status of the role assignment schedule instance. */
  status?: Status;
  /** The startDateTime of the role assignment schedule instance */
  startDateTime?: Date;
  /** The endDateTime of the role assignment schedule instance */
  endDateTime?: Date;
  /** roleEligibilityScheduleId used to activate */
  linkedRoleEligibilityScheduleId?: string;
  /** roleEligibilityScheduleInstanceId linked to this roleAssignmentScheduleInstance */
  linkedRoleEligibilityScheduleInstanceId?: string;
  /** Assignment type of the role assignment schedule */
  assignmentType?: AssignmentType;
  /** Membership type of the role assignment schedule */
  memberType?: MemberType;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently accepted value is '2.0' */
  conditionVersion?: string;
  /** DateTime when role assignment schedule was created */
  createdOn?: Date;
  /** Additional properties of principal, scope and role definition */
  expandedProperties?: ExpandedProperties;
}

export function roleAssignmentScheduleInstanceDeserializer(
  item: any,
): RoleAssignmentScheduleInstance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _roleAssignmentScheduleInstancePropertiesDeserializer(item["properties"])),
  };
}

/** Role assignment schedule properties with scope. */
export interface RoleAssignmentScheduleInstanceProperties {
  /** The role assignment schedule scope. */
  scope?: string;
  /** The role definition ID. */
  roleDefinitionId?: string;
  /** The principal ID. */
  principalId?: string;
  /** The principal type of the assigned principal ID. */
  principalType?: PrincipalType;
  /** Id of the master role assignment schedule */
  roleAssignmentScheduleId?: string;
  /** Role Assignment Id in external system */
  originRoleAssignmentId?: string;
  /** The status of the role assignment schedule instance. */
  status?: Status;
  /** The startDateTime of the role assignment schedule instance */
  startDateTime?: Date;
  /** The endDateTime of the role assignment schedule instance */
  endDateTime?: Date;
  /** roleEligibilityScheduleId used to activate */
  linkedRoleEligibilityScheduleId?: string;
  /** roleEligibilityScheduleInstanceId linked to this roleAssignmentScheduleInstance */
  linkedRoleEligibilityScheduleInstanceId?: string;
  /** Assignment type of the role assignment schedule */
  assignmentType?: AssignmentType;
  /** Membership type of the role assignment schedule */
  memberType?: MemberType;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently accepted value is '2.0' */
  conditionVersion?: string;
  /** DateTime when role assignment schedule was created */
  createdOn?: Date;
  /** Additional properties of principal, scope and role definition */
  expandedProperties?: ExpandedProperties;
}

export function roleAssignmentScheduleInstancePropertiesDeserializer(
  item: any,
): RoleAssignmentScheduleInstanceProperties {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    roleAssignmentScheduleId: item["roleAssignmentScheduleId"],
    originRoleAssignmentId: item["originRoleAssignmentId"],
    status: item["status"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    linkedRoleEligibilityScheduleId: item["linkedRoleEligibilityScheduleId"],
    linkedRoleEligibilityScheduleInstanceId: item["linkedRoleEligibilityScheduleInstanceId"],
    assignmentType: item["assignmentType"],
    memberType: item["memberType"],
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    expandedProperties: !item["expandedProperties"]
      ? item["expandedProperties"]
      : expandedPropertiesDeserializer(item["expandedProperties"]),
  };
}

export function roleAssignmentScheduleInstanceArrayDeserializer(
  result: Array<RoleAssignmentScheduleInstance>,
): any[] {
  return result.map((item) => {
    return roleAssignmentScheduleInstanceDeserializer(item);
  });
}

/** Role Assignment schedule request */
export interface RoleAssignmentScheduleRequest extends ExtensionResource {
  /** The role assignment schedule request scope. */
  readonly scope?: string;
  /** The role definition ID. */
  roleDefinitionId?: string;
  /** The principal ID. */
  principalId?: string;
  /** The principal type of the assigned principal ID. */
  readonly principalType?: PrincipalType;
  /** The type of the role assignment schedule request. Eg: SelfActivate, AdminAssign etc */
  requestType?: RequestType;
  /** The status of the role assignment schedule request. */
  readonly status?: Status;
  /** The approvalId of the role assignment schedule request. */
  readonly approvalId?: string;
  /** The resultant role assignment schedule id or the role assignment schedule id being updated */
  targetRoleAssignmentScheduleId?: string;
  /** The role assignment schedule instance id being updated */
  targetRoleAssignmentScheduleInstanceId?: string;
  /** Schedule info of the role assignment schedule */
  scheduleInfo?: RoleAssignmentScheduleRequestPropertiesScheduleInfo;
  /** The linked role eligibility schedule id - to activate an eligibility. */
  linkedRoleEligibilityScheduleId?: string;
  /** Justification for the role assignment */
  justification?: string;
  /** Ticket Info of the role assignment */
  ticketInfo?: RoleAssignmentScheduleRequestPropertiesTicketInfo;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently accepted value is '2.0' */
  conditionVersion?: string;
  /** DateTime when role assignment schedule request was created */
  readonly createdOn?: Date;
  /** Id of the user who created this request */
  readonly requestorId?: string;
  /** Additional properties of principal, scope and role definition */
  readonly expandedProperties?: ExpandedProperties;
}

export function roleAssignmentScheduleRequestSerializer(item: RoleAssignmentScheduleRequest): any {
  return {
    properties: areAllPropsUndefined(item, [
      "roleDefinitionId",
      "principalId",
      "requestType",
      "targetRoleAssignmentScheduleId",
      "targetRoleAssignmentScheduleInstanceId",
      "scheduleInfo",
      "linkedRoleEligibilityScheduleId",
      "justification",
      "ticketInfo",
      "condition",
      "conditionVersion",
    ])
      ? undefined
      : _roleAssignmentScheduleRequestPropertiesSerializer(item),
  };
}

export function roleAssignmentScheduleRequestDeserializer(
  item: any,
): RoleAssignmentScheduleRequest {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _roleAssignmentScheduleRequestPropertiesDeserializer(item["properties"])),
  };
}

/** Role assignment schedule request properties with scope. */
export interface RoleAssignmentScheduleRequestProperties {
  /** The role assignment schedule request scope. */
  readonly scope?: string;
  /** The role definition ID. */
  roleDefinitionId: string;
  /** The principal ID. */
  principalId: string;
  /** The principal type of the assigned principal ID. */
  readonly principalType?: PrincipalType;
  /** The type of the role assignment schedule request. Eg: SelfActivate, AdminAssign etc */
  requestType: RequestType;
  /** The status of the role assignment schedule request. */
  readonly status?: Status;
  /** The approvalId of the role assignment schedule request. */
  readonly approvalId?: string;
  /** The resultant role assignment schedule id or the role assignment schedule id being updated */
  targetRoleAssignmentScheduleId?: string;
  /** The role assignment schedule instance id being updated */
  targetRoleAssignmentScheduleInstanceId?: string;
  /** Schedule info of the role assignment schedule */
  scheduleInfo?: RoleAssignmentScheduleRequestPropertiesScheduleInfo;
  /** The linked role eligibility schedule id - to activate an eligibility. */
  linkedRoleEligibilityScheduleId?: string;
  /** Justification for the role assignment */
  justification?: string;
  /** Ticket Info of the role assignment */
  ticketInfo?: RoleAssignmentScheduleRequestPropertiesTicketInfo;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently accepted value is '2.0' */
  conditionVersion?: string;
  /** DateTime when role assignment schedule request was created */
  readonly createdOn?: Date;
  /** Id of the user who created this request */
  readonly requestorId?: string;
  /** Additional properties of principal, scope and role definition */
  readonly expandedProperties?: ExpandedProperties;
}

export function roleAssignmentScheduleRequestPropertiesSerializer(
  item: RoleAssignmentScheduleRequestProperties,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    requestType: item["requestType"],
    targetRoleAssignmentScheduleId: item["targetRoleAssignmentScheduleId"],
    targetRoleAssignmentScheduleInstanceId: item["targetRoleAssignmentScheduleInstanceId"],
    scheduleInfo: !item["scheduleInfo"]
      ? item["scheduleInfo"]
      : roleAssignmentScheduleRequestPropertiesScheduleInfoSerializer(item["scheduleInfo"]),
    linkedRoleEligibilityScheduleId: item["linkedRoleEligibilityScheduleId"],
    justification: item["justification"],
    ticketInfo: !item["ticketInfo"]
      ? item["ticketInfo"]
      : roleAssignmentScheduleRequestPropertiesTicketInfoSerializer(item["ticketInfo"]),
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
  };
}

export function roleAssignmentScheduleRequestPropertiesDeserializer(
  item: any,
): RoleAssignmentScheduleRequestProperties {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    requestType: item["requestType"],
    status: item["status"],
    approvalId: item["approvalId"],
    targetRoleAssignmentScheduleId: item["targetRoleAssignmentScheduleId"],
    targetRoleAssignmentScheduleInstanceId: item["targetRoleAssignmentScheduleInstanceId"],
    scheduleInfo: !item["scheduleInfo"]
      ? item["scheduleInfo"]
      : roleAssignmentScheduleRequestPropertiesScheduleInfoDeserializer(item["scheduleInfo"]),
    linkedRoleEligibilityScheduleId: item["linkedRoleEligibilityScheduleId"],
    justification: item["justification"],
    ticketInfo: !item["ticketInfo"]
      ? item["ticketInfo"]
      : roleAssignmentScheduleRequestPropertiesTicketInfoDeserializer(item["ticketInfo"]),
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    requestorId: item["requestorId"],
    expandedProperties: !item["expandedProperties"]
      ? item["expandedProperties"]
      : expandedPropertiesDeserializer(item["expandedProperties"]),
  };
}

/** The type of the role assignment schedule request. Eg: SelfActivate, AdminAssign etc */
export enum KnownRequestType {
  /** AdminAssign */
  AdminAssign = "AdminAssign",
  /** AdminRemove */
  AdminRemove = "AdminRemove",
  /** AdminUpdate */
  AdminUpdate = "AdminUpdate",
  /** AdminExtend */
  AdminExtend = "AdminExtend",
  /** AdminRenew */
  AdminRenew = "AdminRenew",
  /** SelfActivate */
  SelfActivate = "SelfActivate",
  /** SelfDeactivate */
  SelfDeactivate = "SelfDeactivate",
  /** SelfExtend */
  SelfExtend = "SelfExtend",
  /** SelfRenew */
  SelfRenew = "SelfRenew",
}

/**
 * The type of the role assignment schedule request. Eg: SelfActivate, AdminAssign etc \
 * {@link KnownRequestType} can be used interchangeably with RequestType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AdminAssign**: AdminAssign \
 * **AdminRemove**: AdminRemove \
 * **AdminUpdate**: AdminUpdate \
 * **AdminExtend**: AdminExtend \
 * **AdminRenew**: AdminRenew \
 * **SelfActivate**: SelfActivate \
 * **SelfDeactivate**: SelfDeactivate \
 * **SelfExtend**: SelfExtend \
 * **SelfRenew**: SelfRenew
 */
export type RequestType = string;

/** Schedule info of the role assignment schedule */
export interface RoleAssignmentScheduleRequestPropertiesScheduleInfo {
  /** Start DateTime of the role assignment schedule. */
  startDateTime?: Date;
  /** Expiration of the role assignment schedule */
  expiration?: RoleAssignmentScheduleRequestPropertiesScheduleInfoExpiration;
}

export function roleAssignmentScheduleRequestPropertiesScheduleInfoSerializer(
  item: RoleAssignmentScheduleRequestPropertiesScheduleInfo,
): any {
  return {
    startDateTime: !item["startDateTime"]
      ? item["startDateTime"]
      : item["startDateTime"].toISOString(),
    expiration: !item["expiration"]
      ? item["expiration"]
      : roleAssignmentScheduleRequestPropertiesScheduleInfoExpirationSerializer(item["expiration"]),
  };
}

export function roleAssignmentScheduleRequestPropertiesScheduleInfoDeserializer(
  item: any,
): RoleAssignmentScheduleRequestPropertiesScheduleInfo {
  return {
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    expiration: !item["expiration"]
      ? item["expiration"]
      : roleAssignmentScheduleRequestPropertiesScheduleInfoExpirationDeserializer(
          item["expiration"],
        ),
  };
}

/** Expiration of the role assignment schedule */
export interface RoleAssignmentScheduleRequestPropertiesScheduleInfoExpiration {
  /** Type of the role assignment schedule expiration */
  type?: Type;
  /** End DateTime of the role assignment schedule. */
  endDateTime?: Date;
  /** Duration of the role assignment schedule in TimeSpan. */
  duration?: string;
}

export function roleAssignmentScheduleRequestPropertiesScheduleInfoExpirationSerializer(
  item: RoleAssignmentScheduleRequestPropertiesScheduleInfoExpiration,
): any {
  return {
    type: item["type"],
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : item["endDateTime"].toISOString(),
    duration: item["duration"],
  };
}

export function roleAssignmentScheduleRequestPropertiesScheduleInfoExpirationDeserializer(
  item: any,
): RoleAssignmentScheduleRequestPropertiesScheduleInfoExpiration {
  return {
    type: item["type"],
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    duration: item["duration"],
  };
}

/** Type of the role assignment schedule expiration */
export enum KnownType {
  /** AfterDuration */
  AfterDuration = "AfterDuration",
  /** AfterDateTime */
  AfterDateTime = "AfterDateTime",
  /** NoExpiration */
  NoExpiration = "NoExpiration",
}

/**
 * Type of the role assignment schedule expiration \
 * {@link KnownType} can be used interchangeably with Type,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AfterDuration**: AfterDuration \
 * **AfterDateTime**: AfterDateTime \
 * **NoExpiration**: NoExpiration
 */
export type Type = string;

/** Ticket Info of the role assignment */
export interface RoleAssignmentScheduleRequestPropertiesTicketInfo {
  /** Ticket number for the role assignment */
  ticketNumber?: string;
  /** Ticket system name for the role assignment */
  ticketSystem?: string;
}

export function roleAssignmentScheduleRequestPropertiesTicketInfoSerializer(
  item: RoleAssignmentScheduleRequestPropertiesTicketInfo,
): any {
  return { ticketNumber: item["ticketNumber"], ticketSystem: item["ticketSystem"] };
}

export function roleAssignmentScheduleRequestPropertiesTicketInfoDeserializer(
  item: any,
): RoleAssignmentScheduleRequestPropertiesTicketInfo {
  return {
    ticketNumber: item["ticketNumber"],
    ticketSystem: item["ticketSystem"],
  };
}

export function roleAssignmentScheduleRequestArraySerializer(
  result: Array<RoleAssignmentScheduleRequest>,
): any[] {
  return result.map((item) => {
    return roleAssignmentScheduleRequestSerializer(item);
  });
}

export function roleAssignmentScheduleRequestArrayDeserializer(
  result: Array<RoleAssignmentScheduleRequest>,
): any[] {
  return result.map((item) => {
    return roleAssignmentScheduleRequestDeserializer(item);
  });
}

/** Role eligibility schedule */
export interface RoleEligibilitySchedule extends ExtensionResource {
  /** The role eligibility schedule scope. */
  scope?: string;
  /** The role definition ID. */
  roleDefinitionId?: string;
  /** The principal ID. */
  principalId?: string;
  /** The principal type of the assigned principal ID. */
  principalType?: PrincipalType;
  /** The id of roleEligibilityScheduleRequest used to create this roleAssignmentSchedule */
  roleEligibilityScheduleRequestId?: string;
  /** Membership type of the role eligibility schedule */
  memberType?: MemberType;
  /** The status of the role eligibility schedule. */
  status?: Status;
  /** Start DateTime when role eligibility schedule */
  startDateTime?: Date;
  /** End DateTime when role eligibility schedule */
  endDateTime?: Date;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently accepted value is '2.0' */
  conditionVersion?: string;
  /** DateTime when role eligibility schedule was created */
  createdOn?: Date;
  /** DateTime when role eligibility schedule was modified */
  updatedOn?: Date;
  /** Additional properties of principal, scope and role definition */
  expandedProperties?: ExpandedProperties;
}

export function roleEligibilityScheduleDeserializer(item: any): RoleEligibilitySchedule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _roleEligibilitySchedulePropertiesDeserializer(item["properties"])),
  };
}

/** Role eligibility schedule properties with scope. */
export interface RoleEligibilityScheduleProperties {
  /** The role eligibility schedule scope. */
  scope?: string;
  /** The role definition ID. */
  roleDefinitionId?: string;
  /** The principal ID. */
  principalId?: string;
  /** The principal type of the assigned principal ID. */
  principalType?: PrincipalType;
  /** The id of roleEligibilityScheduleRequest used to create this roleAssignmentSchedule */
  roleEligibilityScheduleRequestId?: string;
  /** Membership type of the role eligibility schedule */
  memberType?: MemberType;
  /** The status of the role eligibility schedule. */
  status?: Status;
  /** Start DateTime when role eligibility schedule */
  startDateTime?: Date;
  /** End DateTime when role eligibility schedule */
  endDateTime?: Date;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently accepted value is '2.0' */
  conditionVersion?: string;
  /** DateTime when role eligibility schedule was created */
  createdOn?: Date;
  /** DateTime when role eligibility schedule was modified */
  updatedOn?: Date;
  /** Additional properties of principal, scope and role definition */
  expandedProperties?: ExpandedProperties;
}

export function roleEligibilitySchedulePropertiesDeserializer(
  item: any,
): RoleEligibilityScheduleProperties {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    roleEligibilityScheduleRequestId: item["roleEligibilityScheduleRequestId"],
    memberType: item["memberType"],
    status: item["status"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    updatedOn: !item["updatedOn"] ? item["updatedOn"] : new Date(item["updatedOn"]),
    expandedProperties: !item["expandedProperties"]
      ? item["expandedProperties"]
      : expandedPropertiesDeserializer(item["expandedProperties"]),
  };
}

export function roleEligibilityScheduleArrayDeserializer(
  result: Array<RoleEligibilitySchedule>,
): any[] {
  return result.map((item) => {
    return roleEligibilityScheduleDeserializer(item);
  });
}

/** Information about current or upcoming role eligibility schedule instance */
export interface RoleEligibilityScheduleInstance extends ExtensionResource {
  /** The role eligibility schedule scope. */
  scope?: string;
  /** The role definition ID. */
  roleDefinitionId?: string;
  /** The principal ID. */
  principalId?: string;
  /** The principal type of the assigned principal ID. */
  principalType?: PrincipalType;
  /** Id of the master role eligibility schedule */
  roleEligibilityScheduleId?: string;
  /** The status of the role eligibility schedule instance */
  status?: Status;
  /** The startDateTime of the role eligibility schedule instance */
  startDateTime?: Date;
  /** The endDateTime of the role eligibility schedule instance */
  endDateTime?: Date;
  /** Membership type of the role eligibility schedule */
  memberType?: MemberType;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently accepted value is '2.0' */
  conditionVersion?: string;
  /** DateTime when role eligibility schedule was created */
  createdOn?: Date;
  /** Additional properties of principal, scope and role definition */
  expandedProperties?: ExpandedProperties;
}

export function roleEligibilityScheduleInstanceDeserializer(
  item: any,
): RoleEligibilityScheduleInstance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _roleEligibilityScheduleInstancePropertiesDeserializer(item["properties"])),
  };
}

/** Role eligibility schedule properties with scope. */
export interface RoleEligibilityScheduleInstanceProperties {
  /** The role eligibility schedule scope. */
  scope?: string;
  /** The role definition ID. */
  roleDefinitionId?: string;
  /** The principal ID. */
  principalId?: string;
  /** The principal type of the assigned principal ID. */
  principalType?: PrincipalType;
  /** Id of the master role eligibility schedule */
  roleEligibilityScheduleId?: string;
  /** The status of the role eligibility schedule instance */
  status?: Status;
  /** The startDateTime of the role eligibility schedule instance */
  startDateTime?: Date;
  /** The endDateTime of the role eligibility schedule instance */
  endDateTime?: Date;
  /** Membership type of the role eligibility schedule */
  memberType?: MemberType;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently accepted value is '2.0' */
  conditionVersion?: string;
  /** DateTime when role eligibility schedule was created */
  createdOn?: Date;
  /** Additional properties of principal, scope and role definition */
  expandedProperties?: ExpandedProperties;
}

export function roleEligibilityScheduleInstancePropertiesDeserializer(
  item: any,
): RoleEligibilityScheduleInstanceProperties {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    roleEligibilityScheduleId: item["roleEligibilityScheduleId"],
    status: item["status"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    memberType: item["memberType"],
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    expandedProperties: !item["expandedProperties"]
      ? item["expandedProperties"]
      : expandedPropertiesDeserializer(item["expandedProperties"]),
  };
}

export function roleEligibilityScheduleInstanceArrayDeserializer(
  result: Array<RoleEligibilityScheduleInstance>,
): any[] {
  return result.map((item) => {
    return roleEligibilityScheduleInstanceDeserializer(item);
  });
}

/** Role Eligibility schedule request */
export interface RoleEligibilityScheduleRequest extends ExtensionResource {
  /** The role eligibility schedule request scope. */
  readonly scope?: string;
  /** The role definition ID. */
  roleDefinitionId?: string;
  /** The principal ID. */
  principalId?: string;
  /** The principal type of the assigned principal ID. */
  readonly principalType?: PrincipalType;
  /** The type of the role assignment schedule request. Eg: SelfActivate, AdminAssign etc */
  requestType?: RequestType;
  /** The status of the role eligibility schedule request. */
  readonly status?: Status;
  /** The approvalId of the role eligibility schedule request. */
  readonly approvalId?: string;
  /** Schedule info of the role eligibility schedule */
  scheduleInfo?: RoleEligibilityScheduleRequestPropertiesScheduleInfo;
  /** The resultant role eligibility schedule id or the role eligibility schedule id being updated */
  targetRoleEligibilityScheduleId?: string;
  /** The role eligibility schedule instance id being updated */
  targetRoleEligibilityScheduleInstanceId?: string;
  /** Justification for the role eligibility */
  justification?: string;
  /** Ticket Info of the role eligibility */
  ticketInfo?: RoleEligibilityScheduleRequestPropertiesTicketInfo;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently accepted value is '2.0' */
  conditionVersion?: string;
  /** DateTime when role eligibility schedule request was created */
  readonly createdOn?: Date;
  /** Id of the user who created this request */
  readonly requestorId?: string;
  /** Additional properties of principal, scope and role definition */
  readonly expandedProperties?: ExpandedProperties;
}

export function roleEligibilityScheduleRequestSerializer(
  item: RoleEligibilityScheduleRequest,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "roleDefinitionId",
      "principalId",
      "requestType",
      "scheduleInfo",
      "targetRoleEligibilityScheduleId",
      "targetRoleEligibilityScheduleInstanceId",
      "justification",
      "ticketInfo",
      "condition",
      "conditionVersion",
    ])
      ? undefined
      : _roleEligibilityScheduleRequestPropertiesSerializer(item),
  };
}

export function roleEligibilityScheduleRequestDeserializer(
  item: any,
): RoleEligibilityScheduleRequest {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _roleEligibilityScheduleRequestPropertiesDeserializer(item["properties"])),
  };
}

/** Role eligibility schedule request properties with scope. */
export interface RoleEligibilityScheduleRequestProperties {
  /** The role eligibility schedule request scope. */
  readonly scope?: string;
  /** The role definition ID. */
  roleDefinitionId: string;
  /** The principal ID. */
  principalId: string;
  /** The principal type of the assigned principal ID. */
  readonly principalType?: PrincipalType;
  /** The type of the role assignment schedule request. Eg: SelfActivate, AdminAssign etc */
  requestType: RequestType;
  /** The status of the role eligibility schedule request. */
  readonly status?: Status;
  /** The approvalId of the role eligibility schedule request. */
  readonly approvalId?: string;
  /** Schedule info of the role eligibility schedule */
  scheduleInfo?: RoleEligibilityScheduleRequestPropertiesScheduleInfo;
  /** The resultant role eligibility schedule id or the role eligibility schedule id being updated */
  targetRoleEligibilityScheduleId?: string;
  /** The role eligibility schedule instance id being updated */
  targetRoleEligibilityScheduleInstanceId?: string;
  /** Justification for the role eligibility */
  justification?: string;
  /** Ticket Info of the role eligibility */
  ticketInfo?: RoleEligibilityScheduleRequestPropertiesTicketInfo;
  /** The conditions on the role assignment. This limits the resources it can be assigned to. e.g.: @Resource[Microsoft.Storage/storageAccounts/blobServices/containers:ContainerName] StringEqualsIgnoreCase 'foo_storage_container' */
  condition?: string;
  /** Version of the condition. Currently accepted value is '2.0' */
  conditionVersion?: string;
  /** DateTime when role eligibility schedule request was created */
  readonly createdOn?: Date;
  /** Id of the user who created this request */
  readonly requestorId?: string;
  /** Additional properties of principal, scope and role definition */
  readonly expandedProperties?: ExpandedProperties;
}

export function roleEligibilityScheduleRequestPropertiesSerializer(
  item: RoleEligibilityScheduleRequestProperties,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    requestType: item["requestType"],
    scheduleInfo: !item["scheduleInfo"]
      ? item["scheduleInfo"]
      : roleEligibilityScheduleRequestPropertiesScheduleInfoSerializer(item["scheduleInfo"]),
    targetRoleEligibilityScheduleId: item["targetRoleEligibilityScheduleId"],
    targetRoleEligibilityScheduleInstanceId: item["targetRoleEligibilityScheduleInstanceId"],
    justification: item["justification"],
    ticketInfo: !item["ticketInfo"]
      ? item["ticketInfo"]
      : roleEligibilityScheduleRequestPropertiesTicketInfoSerializer(item["ticketInfo"]),
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
  };
}

export function roleEligibilityScheduleRequestPropertiesDeserializer(
  item: any,
): RoleEligibilityScheduleRequestProperties {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    requestType: item["requestType"],
    status: item["status"],
    approvalId: item["approvalId"],
    scheduleInfo: !item["scheduleInfo"]
      ? item["scheduleInfo"]
      : roleEligibilityScheduleRequestPropertiesScheduleInfoDeserializer(item["scheduleInfo"]),
    targetRoleEligibilityScheduleId: item["targetRoleEligibilityScheduleId"],
    targetRoleEligibilityScheduleInstanceId: item["targetRoleEligibilityScheduleInstanceId"],
    justification: item["justification"],
    ticketInfo: !item["ticketInfo"]
      ? item["ticketInfo"]
      : roleEligibilityScheduleRequestPropertiesTicketInfoDeserializer(item["ticketInfo"]),
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    requestorId: item["requestorId"],
    expandedProperties: !item["expandedProperties"]
      ? item["expandedProperties"]
      : expandedPropertiesDeserializer(item["expandedProperties"]),
  };
}

/** Schedule info of the role eligibility schedule */
export interface RoleEligibilityScheduleRequestPropertiesScheduleInfo {
  /** Start DateTime of the role eligibility schedule. */
  startDateTime?: Date;
  /** Expiration of the role eligibility schedule */
  expiration?: RoleEligibilityScheduleRequestPropertiesScheduleInfoExpiration;
}

export function roleEligibilityScheduleRequestPropertiesScheduleInfoSerializer(
  item: RoleEligibilityScheduleRequestPropertiesScheduleInfo,
): any {
  return {
    startDateTime: !item["startDateTime"]
      ? item["startDateTime"]
      : item["startDateTime"].toISOString(),
    expiration: !item["expiration"]
      ? item["expiration"]
      : roleEligibilityScheduleRequestPropertiesScheduleInfoExpirationSerializer(
          item["expiration"],
        ),
  };
}

export function roleEligibilityScheduleRequestPropertiesScheduleInfoDeserializer(
  item: any,
): RoleEligibilityScheduleRequestPropertiesScheduleInfo {
  return {
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    expiration: !item["expiration"]
      ? item["expiration"]
      : roleEligibilityScheduleRequestPropertiesScheduleInfoExpirationDeserializer(
          item["expiration"],
        ),
  };
}

/** Expiration of the role eligibility schedule */
export interface RoleEligibilityScheduleRequestPropertiesScheduleInfoExpiration {
  /** Type of the role eligibility schedule expiration */
  type?: Type;
  /** End DateTime of the role eligibility schedule. */
  endDateTime?: Date;
  /** Duration of the role eligibility schedule in TimeSpan. */
  duration?: string;
}

export function roleEligibilityScheduleRequestPropertiesScheduleInfoExpirationSerializer(
  item: RoleEligibilityScheduleRequestPropertiesScheduleInfoExpiration,
): any {
  return {
    type: item["type"],
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : item["endDateTime"].toISOString(),
    duration: item["duration"],
  };
}

export function roleEligibilityScheduleRequestPropertiesScheduleInfoExpirationDeserializer(
  item: any,
): RoleEligibilityScheduleRequestPropertiesScheduleInfoExpiration {
  return {
    type: item["type"],
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    duration: item["duration"],
  };
}

/** Ticket Info of the role eligibility */
export interface RoleEligibilityScheduleRequestPropertiesTicketInfo {
  /** Ticket number for the role eligibility */
  ticketNumber?: string;
  /** Ticket system name for the role eligibility */
  ticketSystem?: string;
}

export function roleEligibilityScheduleRequestPropertiesTicketInfoSerializer(
  item: RoleEligibilityScheduleRequestPropertiesTicketInfo,
): any {
  return { ticketNumber: item["ticketNumber"], ticketSystem: item["ticketSystem"] };
}

export function roleEligibilityScheduleRequestPropertiesTicketInfoDeserializer(
  item: any,
): RoleEligibilityScheduleRequestPropertiesTicketInfo {
  return {
    ticketNumber: item["ticketNumber"],
    ticketSystem: item["ticketSystem"],
  };
}

export function roleEligibilityScheduleRequestArraySerializer(
  result: Array<RoleEligibilityScheduleRequest>,
): any[] {
  return result.map((item) => {
    return roleEligibilityScheduleRequestSerializer(item);
  });
}

export function roleEligibilityScheduleRequestArrayDeserializer(
  result: Array<RoleEligibilityScheduleRequest>,
): any[] {
  return result.map((item) => {
    return roleEligibilityScheduleRequestDeserializer(item);
  });
}

/** Role management policy */
export interface RoleManagementPolicy extends ExtensionResource {
  /** The role management policy scope. */
  scope?: string;
  /** The role management policy display name. */
  displayName?: string;
  /** The role management policy description. */
  description?: string;
  /** The role management policy is default policy. */
  isOrganizationDefault?: boolean;
  /** The name of the entity last modified it */
  readonly lastModifiedBy?: Principal;
  /** The last modified date time. */
  readonly lastModifiedDateTime?: Date;
  /** The rule applied to the policy. */
  rules?: RoleManagementPolicyRuleUnion[];
  /** The readonly computed rule applied to the policy. */
  readonly effectiveRules?: RoleManagementPolicyRuleUnion[];
  /** Additional properties of scope */
  readonly policyProperties?: PolicyProperties;
}

export function roleManagementPolicySerializer(item: RoleManagementPolicy): any {
  return {
    properties: areAllPropsUndefined(item, [
      "scope",
      "displayName",
      "description",
      "isOrganizationDefault",
      "rules",
    ])
      ? undefined
      : _roleManagementPolicyPropertiesSerializer(item),
  };
}

export function roleManagementPolicyDeserializer(item: any): RoleManagementPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _roleManagementPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** Role management policy properties with scope. */
export interface RoleManagementPolicyProperties {
  /** The role management policy scope. */
  scope?: string;
  /** The role management policy display name. */
  displayName?: string;
  /** The role management policy description. */
  description?: string;
  /** The role management policy is default policy. */
  isOrganizationDefault?: boolean;
  /** The name of the entity last modified it */
  readonly lastModifiedBy?: Principal;
  /** The last modified date time. */
  readonly lastModifiedDateTime?: Date;
  /** The rule applied to the policy. */
  rules?: RoleManagementPolicyRuleUnion[];
  /** The readonly computed rule applied to the policy. */
  readonly effectiveRules?: RoleManagementPolicyRuleUnion[];
  /** Additional properties of scope */
  readonly policyProperties?: PolicyProperties;
}

export function roleManagementPolicyPropertiesSerializer(
  item: RoleManagementPolicyProperties,
): any {
  return {
    scope: item["scope"],
    displayName: item["displayName"],
    description: item["description"],
    isOrganizationDefault: item["isOrganizationDefault"],
    rules: !item["rules"]
      ? item["rules"]
      : roleManagementPolicyRuleUnionArraySerializer(item["rules"]),
  };
}

export function roleManagementPolicyPropertiesDeserializer(
  item: any,
): RoleManagementPolicyProperties {
  return {
    scope: item["scope"],
    displayName: item["displayName"],
    description: item["description"],
    isOrganizationDefault: item["isOrganizationDefault"],
    lastModifiedBy: !item["lastModifiedBy"]
      ? item["lastModifiedBy"]
      : principalDeserializer(item["lastModifiedBy"]),
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    rules: !item["rules"]
      ? item["rules"]
      : roleManagementPolicyRuleUnionArrayDeserializer(item["rules"]),
    effectiveRules: !item["effectiveRules"]
      ? item["effectiveRules"]
      : roleManagementPolicyRuleUnionArrayDeserializer(item["effectiveRules"]),
    policyProperties: !item["policyProperties"]
      ? item["policyProperties"]
      : policyPropertiesDeserializer(item["policyProperties"]),
  };
}

export function roleManagementPolicyRuleUnionArraySerializer(
  result: Array<RoleManagementPolicyRuleUnion>,
): any[] {
  return result.map((item) => {
    return roleManagementPolicyRuleUnionSerializer(item);
  });
}

export function roleManagementPolicyRuleUnionArrayDeserializer(
  result: Array<RoleManagementPolicyRuleUnion>,
): any[] {
  return result.map((item) => {
    return roleManagementPolicyRuleUnionDeserializer(item);
  });
}

/** The role management policy rule. */
export interface RoleManagementPolicyRule {
  /** The id of the rule. */
  id?: string;
  /** The type of rule */
  /** The discriminator possible values: RoleManagementPolicyApprovalRule, RoleManagementPolicyAuthenticationContextRule, RoleManagementPolicyEnablementRule, RoleManagementPolicyExpirationRule, RoleManagementPolicyNotificationRule, RoleManagementPolicyPimOnlyModeRule */
  ruleType: RoleManagementPolicyRuleType;
  /** The target of the current rule. */
  target?: RoleManagementPolicyRuleTarget;
}

export function roleManagementPolicyRuleSerializer(item: RoleManagementPolicyRule): any {
  return {
    id: item["id"],
    ruleType: item["ruleType"],
    target: !item["target"]
      ? item["target"]
      : roleManagementPolicyRuleTargetSerializer(item["target"]),
  };
}

export function roleManagementPolicyRuleDeserializer(item: any): RoleManagementPolicyRule {
  return {
    id: item["id"],
    ruleType: item["ruleType"],
    target: !item["target"]
      ? item["target"]
      : roleManagementPolicyRuleTargetDeserializer(item["target"]),
  };
}

/** Alias for RoleManagementPolicyRuleUnion */
export type RoleManagementPolicyRuleUnion =
  | RoleManagementPolicyApprovalRule
  | RoleManagementPolicyAuthenticationContextRule
  | RoleManagementPolicyEnablementRule
  | RoleManagementPolicyExpirationRule
  | RoleManagementPolicyNotificationRule
  | RoleManagementPolicyPimOnlyModeRule
  | RoleManagementPolicyRule;

export function roleManagementPolicyRuleUnionSerializer(item: RoleManagementPolicyRuleUnion): any {
  switch (item.ruleType) {
    case "RoleManagementPolicyApprovalRule":
      return roleManagementPolicyApprovalRuleSerializer(item as RoleManagementPolicyApprovalRule);

    case "RoleManagementPolicyAuthenticationContextRule":
      return roleManagementPolicyAuthenticationContextRuleSerializer(
        item as RoleManagementPolicyAuthenticationContextRule,
      );

    case "RoleManagementPolicyEnablementRule":
      return roleManagementPolicyEnablementRuleSerializer(
        item as RoleManagementPolicyEnablementRule,
      );

    case "RoleManagementPolicyExpirationRule":
      return roleManagementPolicyExpirationRuleSerializer(
        item as RoleManagementPolicyExpirationRule,
      );

    case "RoleManagementPolicyNotificationRule":
      return roleManagementPolicyNotificationRuleSerializer(
        item as RoleManagementPolicyNotificationRule,
      );

    case "RoleManagementPolicyPimOnlyModeRule":
      return roleManagementPolicyPimOnlyModeRuleSerializer(
        item as RoleManagementPolicyPimOnlyModeRule,
      );

    default:
      return roleManagementPolicyRuleSerializer(item);
  }
}

export function roleManagementPolicyRuleUnionDeserializer(
  item: any,
): RoleManagementPolicyRuleUnion {
  switch (item["ruleType"]) {
    case "RoleManagementPolicyApprovalRule":
      return roleManagementPolicyApprovalRuleDeserializer(item as RoleManagementPolicyApprovalRule);

    case "RoleManagementPolicyAuthenticationContextRule":
      return roleManagementPolicyAuthenticationContextRuleDeserializer(
        item as RoleManagementPolicyAuthenticationContextRule,
      );

    case "RoleManagementPolicyEnablementRule":
      return roleManagementPolicyEnablementRuleDeserializer(
        item as RoleManagementPolicyEnablementRule,
      );

    case "RoleManagementPolicyExpirationRule":
      return roleManagementPolicyExpirationRuleDeserializer(
        item as RoleManagementPolicyExpirationRule,
      );

    case "RoleManagementPolicyNotificationRule":
      return roleManagementPolicyNotificationRuleDeserializer(
        item as RoleManagementPolicyNotificationRule,
      );

    case "RoleManagementPolicyPimOnlyModeRule":
      return roleManagementPolicyPimOnlyModeRuleDeserializer(
        item as RoleManagementPolicyPimOnlyModeRule,
      );

    default:
      return roleManagementPolicyRuleDeserializer(item);
  }
}

/** The type of rule */
export enum KnownRoleManagementPolicyRuleType {
  /** RoleManagementPolicyApprovalRule */
  RoleManagementPolicyApprovalRule = "RoleManagementPolicyApprovalRule",
  /** RoleManagementPolicyAuthenticationContextRule */
  RoleManagementPolicyAuthenticationContextRule = "RoleManagementPolicyAuthenticationContextRule",
  /** RoleManagementPolicyEnablementRule */
  RoleManagementPolicyEnablementRule = "RoleManagementPolicyEnablementRule",
  /** RoleManagementPolicyExpirationRule */
  RoleManagementPolicyExpirationRule = "RoleManagementPolicyExpirationRule",
  /** RoleManagementPolicyNotificationRule */
  RoleManagementPolicyNotificationRule = "RoleManagementPolicyNotificationRule",
  /** RoleManagementPolicyPimOnlyModeRule */
  RoleManagementPolicyPimOnlyModeRule = "RoleManagementPolicyPimOnlyModeRule",
}

/**
 * The type of rule \
 * {@link KnownRoleManagementPolicyRuleType} can be used interchangeably with RoleManagementPolicyRuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RoleManagementPolicyApprovalRule**: RoleManagementPolicyApprovalRule \
 * **RoleManagementPolicyAuthenticationContextRule**: RoleManagementPolicyAuthenticationContextRule \
 * **RoleManagementPolicyEnablementRule**: RoleManagementPolicyEnablementRule \
 * **RoleManagementPolicyExpirationRule**: RoleManagementPolicyExpirationRule \
 * **RoleManagementPolicyNotificationRule**: RoleManagementPolicyNotificationRule \
 * **RoleManagementPolicyPimOnlyModeRule**: RoleManagementPolicyPimOnlyModeRule
 */
export type RoleManagementPolicyRuleType = string;

/** The role management policy rule target. */
export interface RoleManagementPolicyRuleTarget {
  /** The caller of the setting. */
  caller?: string;
  /** The type of operation. */
  operations?: string[];
  /** The assignment level to which rule is applied. */
  level?: string;
  /** The list of target objects. */
  targetObjects?: string[];
  /** The list of inheritable settings. */
  inheritableSettings?: string[];
  /** The list of enforced settings. */
  enforcedSettings?: string[];
}

export function roleManagementPolicyRuleTargetSerializer(
  item: RoleManagementPolicyRuleTarget,
): any {
  return {
    caller: item["caller"],
    operations: !item["operations"]
      ? item["operations"]
      : item["operations"].map((p: any) => {
          return p;
        }),
    level: item["level"],
    targetObjects: !item["targetObjects"]
      ? item["targetObjects"]
      : item["targetObjects"].map((p: any) => {
          return p;
        }),
    inheritableSettings: !item["inheritableSettings"]
      ? item["inheritableSettings"]
      : item["inheritableSettings"].map((p: any) => {
          return p;
        }),
    enforcedSettings: !item["enforcedSettings"]
      ? item["enforcedSettings"]
      : item["enforcedSettings"].map((p: any) => {
          return p;
        }),
  };
}

export function roleManagementPolicyRuleTargetDeserializer(
  item: any,
): RoleManagementPolicyRuleTarget {
  return {
    caller: item["caller"],
    operations: !item["operations"]
      ? item["operations"]
      : item["operations"].map((p: any) => {
          return p;
        }),
    level: item["level"],
    targetObjects: !item["targetObjects"]
      ? item["targetObjects"]
      : item["targetObjects"].map((p: any) => {
          return p;
        }),
    inheritableSettings: !item["inheritableSettings"]
      ? item["inheritableSettings"]
      : item["inheritableSettings"].map((p: any) => {
          return p;
        }),
    enforcedSettings: !item["enforcedSettings"]
      ? item["enforcedSettings"]
      : item["enforcedSettings"].map((p: any) => {
          return p;
        }),
  };
}

/** The role management policy approval rule. */
export interface RoleManagementPolicyApprovalRule extends RoleManagementPolicyRule {
  /** The approval setting */
  setting?: ApprovalSettings;
  /** The type of rule */
  ruleType: "RoleManagementPolicyApprovalRule";
}

export function roleManagementPolicyApprovalRuleSerializer(
  item: RoleManagementPolicyApprovalRule,
): any {
  return {
    id: item["id"],
    ruleType: item["ruleType"],
    target: !item["target"]
      ? item["target"]
      : roleManagementPolicyRuleTargetSerializer(item["target"]),
    setting: !item["setting"] ? item["setting"] : approvalSettingsSerializer(item["setting"]),
  };
}

export function roleManagementPolicyApprovalRuleDeserializer(
  item: any,
): RoleManagementPolicyApprovalRule {
  return {
    id: item["id"],
    ruleType: item["ruleType"],
    target: !item["target"]
      ? item["target"]
      : roleManagementPolicyRuleTargetDeserializer(item["target"]),
    setting: !item["setting"] ? item["setting"] : approvalSettingsDeserializer(item["setting"]),
  };
}

/** The approval settings. */
export interface ApprovalSettings {
  /** Determines whether approval is required or not. */
  isApprovalRequired?: boolean;
  /** Determines whether approval is required for assignment extension. */
  isApprovalRequiredForExtension?: boolean;
  /** Determine whether requestor justification is required. */
  isRequestorJustificationRequired?: boolean;
  /** The type of rule */
  approvalMode?: ApprovalMode;
  /** The approval stages of the request. */
  approvalStages?: ApprovalStage[];
}

export function approvalSettingsSerializer(item: ApprovalSettings): any {
  return {
    isApprovalRequired: item["isApprovalRequired"],
    isApprovalRequiredForExtension: item["isApprovalRequiredForExtension"],
    isRequestorJustificationRequired: item["isRequestorJustificationRequired"],
    approvalMode: item["approvalMode"],
    approvalStages: !item["approvalStages"]
      ? item["approvalStages"]
      : approvalStageArraySerializer(item["approvalStages"]),
  };
}

export function approvalSettingsDeserializer(item: any): ApprovalSettings {
  return {
    isApprovalRequired: item["isApprovalRequired"],
    isApprovalRequiredForExtension: item["isApprovalRequiredForExtension"],
    isRequestorJustificationRequired: item["isRequestorJustificationRequired"],
    approvalMode: item["approvalMode"],
    approvalStages: !item["approvalStages"]
      ? item["approvalStages"]
      : approvalStageArrayDeserializer(item["approvalStages"]),
  };
}

/** The type of rule */
export enum KnownApprovalMode {
  /** SingleStage */
  SingleStage = "SingleStage",
  /** Serial */
  Serial = "Serial",
  /** Parallel */
  Parallel = "Parallel",
  /** NoApproval */
  NoApproval = "NoApproval",
}

/**
 * The type of rule \
 * {@link KnownApprovalMode} can be used interchangeably with ApprovalMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SingleStage**: SingleStage \
 * **Serial**: Serial \
 * **Parallel**: Parallel \
 * **NoApproval**: NoApproval
 */
export type ApprovalMode = string;

export function approvalStageArraySerializer(result: Array<ApprovalStage>): any[] {
  return result.map((item) => {
    return approvalStageSerializer(item);
  });
}

export function approvalStageArrayDeserializer(result: Array<ApprovalStage>): any[] {
  return result.map((item) => {
    return approvalStageDeserializer(item);
  });
}

/** The approval stage. */
export interface ApprovalStage {
  /** The time in days when approval request would be timed out */
  approvalStageTimeOutInDays?: number;
  /** Determines whether approver need to provide justification for his decision. */
  isApproverJustificationRequired?: boolean;
  /** The time in minutes when the approval request would be escalated if the primary approver does not approve */
  escalationTimeInMinutes?: number;
  /** The primary approver of the request. */
  primaryApprovers?: UserSet[];
  /** The value determine whether escalation feature is enabled. */
  isEscalationEnabled?: boolean;
  /** The escalation approver of the request. */
  escalationApprovers?: UserSet[];
}

export function approvalStageSerializer(item: ApprovalStage): any {
  return {
    approvalStageTimeOutInDays: item["approvalStageTimeOutInDays"],
    isApproverJustificationRequired: item["isApproverJustificationRequired"],
    escalationTimeInMinutes: item["escalationTimeInMinutes"],
    primaryApprovers: !item["primaryApprovers"]
      ? item["primaryApprovers"]
      : userSetArraySerializer(item["primaryApprovers"]),
    isEscalationEnabled: item["isEscalationEnabled"],
    escalationApprovers: !item["escalationApprovers"]
      ? item["escalationApprovers"]
      : userSetArraySerializer(item["escalationApprovers"]),
  };
}

export function approvalStageDeserializer(item: any): ApprovalStage {
  return {
    approvalStageTimeOutInDays: item["approvalStageTimeOutInDays"],
    isApproverJustificationRequired: item["isApproverJustificationRequired"],
    escalationTimeInMinutes: item["escalationTimeInMinutes"],
    primaryApprovers: !item["primaryApprovers"]
      ? item["primaryApprovers"]
      : userSetArrayDeserializer(item["primaryApprovers"]),
    isEscalationEnabled: item["isEscalationEnabled"],
    escalationApprovers: !item["escalationApprovers"]
      ? item["escalationApprovers"]
      : userSetArrayDeserializer(item["escalationApprovers"]),
  };
}

export function userSetArraySerializer(result: Array<UserSet>): any[] {
  return result.map((item) => {
    return userSetSerializer(item);
  });
}

export function userSetArrayDeserializer(result: Array<UserSet>): any[] {
  return result.map((item) => {
    return userSetDeserializer(item);
  });
}

/** The detail of a user. */
export interface UserSet {
  /** The type of user. */
  userType?: UserType;
  /** The value indicating whether the user is a backup fallback approver */
  isBackup?: boolean;
  /** The object id of the user. */
  id?: string;
  /** The description of the user. */
  description?: string;
}

export function userSetSerializer(item: UserSet): any {
  return {
    userType: item["userType"],
    isBackup: item["isBackup"],
    id: item["id"],
    description: item["description"],
  };
}

export function userSetDeserializer(item: any): UserSet {
  return {
    userType: item["userType"],
    isBackup: item["isBackup"],
    id: item["id"],
    description: item["description"],
  };
}

/** The type of user. */
export enum KnownUserType {
  /** User */
  User = "User",
  /** Group */
  Group = "Group",
}

/**
 * The type of user. \
 * {@link KnownUserType} can be used interchangeably with UserType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: User \
 * **Group**: Group
 */
export type UserType = string;

/** The role management policy authentication context rule. */
export interface RoleManagementPolicyAuthenticationContextRule extends RoleManagementPolicyRule {
  /** The value indicating if rule is enabled. */
  isEnabled?: boolean;
  /** The claim value. */
  claimValue?: string;
  /** The type of rule */
  ruleType: "RoleManagementPolicyAuthenticationContextRule";
}

export function roleManagementPolicyAuthenticationContextRuleSerializer(
  item: RoleManagementPolicyAuthenticationContextRule,
): any {
  return {
    id: item["id"],
    ruleType: item["ruleType"],
    target: !item["target"]
      ? item["target"]
      : roleManagementPolicyRuleTargetSerializer(item["target"]),
    isEnabled: item["isEnabled"],
    claimValue: item["claimValue"],
  };
}

export function roleManagementPolicyAuthenticationContextRuleDeserializer(
  item: any,
): RoleManagementPolicyAuthenticationContextRule {
  return {
    id: item["id"],
    ruleType: item["ruleType"],
    target: !item["target"]
      ? item["target"]
      : roleManagementPolicyRuleTargetDeserializer(item["target"]),
    isEnabled: item["isEnabled"],
    claimValue: item["claimValue"],
  };
}

/** The role management policy enablement rule. */
export interface RoleManagementPolicyEnablementRule extends RoleManagementPolicyRule {
  /** The list of enabled rules. */
  enabledRules?: EnablementRules[];
  /** The type of rule */
  ruleType: "RoleManagementPolicyEnablementRule";
}

export function roleManagementPolicyEnablementRuleSerializer(
  item: RoleManagementPolicyEnablementRule,
): any {
  return {
    id: item["id"],
    ruleType: item["ruleType"],
    target: !item["target"]
      ? item["target"]
      : roleManagementPolicyRuleTargetSerializer(item["target"]),
    enabledRules: !item["enabledRules"]
      ? item["enabledRules"]
      : item["enabledRules"].map((p: any) => {
          return p;
        }),
  };
}

export function roleManagementPolicyEnablementRuleDeserializer(
  item: any,
): RoleManagementPolicyEnablementRule {
  return {
    id: item["id"],
    ruleType: item["ruleType"],
    target: !item["target"]
      ? item["target"]
      : roleManagementPolicyRuleTargetDeserializer(item["target"]),
    enabledRules: !item["enabledRules"]
      ? item["enabledRules"]
      : item["enabledRules"].map((p: any) => {
          return p;
        }),
  };
}

/** The type of enablement rule */
export enum KnownEnablementRules {
  /** MultiFactorAuthentication */
  MultiFactorAuthentication = "MultiFactorAuthentication",
  /** Justification */
  Justification = "Justification",
  /** Ticketing */
  Ticketing = "Ticketing",
}

/**
 * The type of enablement rule \
 * {@link KnownEnablementRules} can be used interchangeably with EnablementRules,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MultiFactorAuthentication**: MultiFactorAuthentication \
 * **Justification**: Justification \
 * **Ticketing**: Ticketing
 */
export type EnablementRules = string;

/** The role management policy expiration rule. */
export interface RoleManagementPolicyExpirationRule extends RoleManagementPolicyRule {
  /** The value indicating whether expiration is required. */
  isExpirationRequired?: boolean;
  /** The maximum duration of expiration in timespan. */
  maximumDuration?: string;
  /** The members not restricted by expiration rule. */
  exceptionMembers?: UserSet[];
  /** The type of rule */
  ruleType: "RoleManagementPolicyExpirationRule";
}

export function roleManagementPolicyExpirationRuleSerializer(
  item: RoleManagementPolicyExpirationRule,
): any {
  return {
    id: item["id"],
    ruleType: item["ruleType"],
    target: !item["target"]
      ? item["target"]
      : roleManagementPolicyRuleTargetSerializer(item["target"]),
    isExpirationRequired: item["isExpirationRequired"],
    maximumDuration: item["maximumDuration"],
    exceptionMembers: !item["exceptionMembers"]
      ? item["exceptionMembers"]
      : userSetArraySerializer(item["exceptionMembers"]),
  };
}

export function roleManagementPolicyExpirationRuleDeserializer(
  item: any,
): RoleManagementPolicyExpirationRule {
  return {
    id: item["id"],
    ruleType: item["ruleType"],
    target: !item["target"]
      ? item["target"]
      : roleManagementPolicyRuleTargetDeserializer(item["target"]),
    isExpirationRequired: item["isExpirationRequired"],
    maximumDuration: item["maximumDuration"],
    exceptionMembers: !item["exceptionMembers"]
      ? item["exceptionMembers"]
      : userSetArrayDeserializer(item["exceptionMembers"]),
  };
}

/** The role management policy notification rule. */
export interface RoleManagementPolicyNotificationRule extends RoleManagementPolicyRule {
  /** The type of notification. */
  notificationType?: NotificationDeliveryMechanism;
  /** The notification level. */
  notificationLevel?: NotificationLevel;
  /** The recipient type. */
  recipientType?: RecipientType;
  /** The list of notification recipients. */
  notificationRecipients?: string[];
  /** Determines if the notification will be sent to the recipient type specified in the policy rule. */
  isDefaultRecipientsEnabled?: boolean;
  /** The type of rule */
  ruleType: "RoleManagementPolicyNotificationRule";
}

export function roleManagementPolicyNotificationRuleSerializer(
  item: RoleManagementPolicyNotificationRule,
): any {
  return {
    id: item["id"],
    ruleType: item["ruleType"],
    target: !item["target"]
      ? item["target"]
      : roleManagementPolicyRuleTargetSerializer(item["target"]),
    notificationType: item["notificationType"],
    notificationLevel: item["notificationLevel"],
    recipientType: item["recipientType"],
    notificationRecipients: !item["notificationRecipients"]
      ? item["notificationRecipients"]
      : item["notificationRecipients"].map((p: any) => {
          return p;
        }),
    isDefaultRecipientsEnabled: item["isDefaultRecipientsEnabled"],
  };
}

export function roleManagementPolicyNotificationRuleDeserializer(
  item: any,
): RoleManagementPolicyNotificationRule {
  return {
    id: item["id"],
    ruleType: item["ruleType"],
    target: !item["target"]
      ? item["target"]
      : roleManagementPolicyRuleTargetDeserializer(item["target"]),
    notificationType: item["notificationType"],
    notificationLevel: item["notificationLevel"],
    recipientType: item["recipientType"],
    notificationRecipients: !item["notificationRecipients"]
      ? item["notificationRecipients"]
      : item["notificationRecipients"].map((p: any) => {
          return p;
        }),
    isDefaultRecipientsEnabled: item["isDefaultRecipientsEnabled"],
  };
}

/** The type of notification. */
export enum KnownNotificationDeliveryMechanism {
  /** Email */
  Email = "Email",
}

/**
 * The type of notification. \
 * {@link KnownNotificationDeliveryMechanism} can be used interchangeably with NotificationDeliveryMechanism,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Email**: Email
 */
export type NotificationDeliveryMechanism = string;

/** The notification level. */
export enum KnownNotificationLevel {
  /** None */
  None = "None",
  /** Critical */
  Critical = "Critical",
  /** All */
  All = "All",
}

/**
 * The notification level. \
 * {@link KnownNotificationLevel} can be used interchangeably with NotificationLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **Critical**: Critical \
 * **All**: All
 */
export type NotificationLevel = string;

/** The recipient type. */
export enum KnownRecipientType {
  /** Requestor */
  Requestor = "Requestor",
  /** Approver */
  Approver = "Approver",
  /** Admin */
  Admin = "Admin",
}

/**
 * The recipient type. \
 * {@link KnownRecipientType} can be used interchangeably with RecipientType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Requestor**: Requestor \
 * **Approver**: Approver \
 * **Admin**: Admin
 */
export type RecipientType = string;

/** The role management policy PIM only mode rule. */
export interface RoleManagementPolicyPimOnlyModeRule extends RoleManagementPolicyRule {
  /** The PIM Only Mode settings */
  pimOnlyModeSettings?: PIMOnlyModeSettings;
  /** The type of rule */
  ruleType: "RoleManagementPolicyPimOnlyModeRule";
}

export function roleManagementPolicyPimOnlyModeRuleSerializer(
  item: RoleManagementPolicyPimOnlyModeRule,
): any {
  return {
    id: item["id"],
    ruleType: item["ruleType"],
    target: !item["target"]
      ? item["target"]
      : roleManagementPolicyRuleTargetSerializer(item["target"]),
    pimOnlyModeSettings: !item["pimOnlyModeSettings"]
      ? item["pimOnlyModeSettings"]
      : pimOnlyModeSettingsSerializer(item["pimOnlyModeSettings"]),
  };
}

export function roleManagementPolicyPimOnlyModeRuleDeserializer(
  item: any,
): RoleManagementPolicyPimOnlyModeRule {
  return {
    id: item["id"],
    ruleType: item["ruleType"],
    target: !item["target"]
      ? item["target"]
      : roleManagementPolicyRuleTargetDeserializer(item["target"]),
    pimOnlyModeSettings: !item["pimOnlyModeSettings"]
      ? item["pimOnlyModeSettings"]
      : pimOnlyModeSettingsDeserializer(item["pimOnlyModeSettings"]),
  };
}

/** The PIM Only Mode settings. */
export interface PIMOnlyModeSettings {
  /** Determines whether the setting is enabled, disabled or report only. */
  mode?: PIMOnlyMode;
  /** The list of excluded entities that the rule does not apply to. */
  excludes?: UsersOrServicePrincipalSet[];
  /** The list of excluded assignment types allowed. */
  excludedAssignmentTypes?: ExcludedPrincipalTypes[];
}

export function pimOnlyModeSettingsSerializer(item: PIMOnlyModeSettings): any {
  return {
    mode: item["mode"],
    excludes: !item["excludes"]
      ? item["excludes"]
      : usersOrServicePrincipalSetArraySerializer(item["excludes"]),
    excludedAssignmentTypes: !item["excludedAssignmentTypes"]
      ? item["excludedAssignmentTypes"]
      : item["excludedAssignmentTypes"].map((p: any) => {
          return p;
        }),
  };
}

export function pimOnlyModeSettingsDeserializer(item: any): PIMOnlyModeSettings {
  return {
    mode: item["mode"],
    excludes: !item["excludes"]
      ? item["excludes"]
      : usersOrServicePrincipalSetArrayDeserializer(item["excludes"]),
    excludedAssignmentTypes: !item["excludedAssignmentTypes"]
      ? item["excludedAssignmentTypes"]
      : item["excludedAssignmentTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** Determines whether the setting is enabled, disabled or report only. */
export enum KnownPIMOnlyMode {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
  /** ReportOnly */
  ReportOnly = "ReportOnly",
}

/**
 * Determines whether the setting is enabled, disabled or report only. \
 * {@link KnownPIMOnlyMode} can be used interchangeably with PIMOnlyMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled \
 * **ReportOnly**: ReportOnly
 */
export type PIMOnlyMode = string;

export function usersOrServicePrincipalSetArraySerializer(
  result: Array<UsersOrServicePrincipalSet>,
): any[] {
  return result.map((item) => {
    return usersOrServicePrincipalSetSerializer(item);
  });
}

export function usersOrServicePrincipalSetArrayDeserializer(
  result: Array<UsersOrServicePrincipalSet>,
): any[] {
  return result.map((item) => {
    return usersOrServicePrincipalSetDeserializer(item);
  });
}

/** The detail of a subject. */
export interface UsersOrServicePrincipalSet {
  /** The type of user. */
  type?: UsersOrServicePrincipalSetUserType;
  /** The object id of the entity. */
  id?: string;
  /** The display Name of the entity. */
  displayName?: string;
}

export function usersOrServicePrincipalSetSerializer(item: UsersOrServicePrincipalSet): any {
  return { type: item["type"], id: item["id"], displayName: item["displayName"] };
}

export function usersOrServicePrincipalSetDeserializer(item: any): UsersOrServicePrincipalSet {
  return {
    type: item["type"],
    id: item["id"],
    displayName: item["displayName"],
  };
}

/** The type of user. */
export enum KnownUsersOrServicePrincipalSetUserType {
  /** User */
  User = "User",
  /** Group */
  Group = "Group",
  /** ServicePrincipal */
  ServicePrincipal = "ServicePrincipal",
}

/**
 * The type of user. \
 * {@link KnownUsersOrServicePrincipalSetUserType} can be used interchangeably with UsersOrServicePrincipalSetUserType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: User \
 * **Group**: Group \
 * **ServicePrincipal**: ServicePrincipal
 */
export type UsersOrServicePrincipalSetUserType = string;

/** Known values of {@link ExcludedPrincipalTypes} that the service accepts. */
export enum KnownExcludedPrincipalTypes {
  /** ServicePrincipalsAsTarget */
  ServicePrincipalsAsTarget = "ServicePrincipalsAsTarget",
  /** ServicePrincipalsAsRequestor */
  ServicePrincipalsAsRequestor = "ServicePrincipalsAsRequestor",
}

/** Type of ExcludedPrincipalTypes */
export type ExcludedPrincipalTypes = string;

/** Expanded info of resource scope */
export interface PolicyProperties {
  /** Details of the resource scope */
  readonly scope?: PolicyPropertiesScope;
}

export function policyPropertiesDeserializer(item: any): PolicyProperties {
  return {
    scope: !item["scope"] ? item["scope"] : policyPropertiesScopeDeserializer(item["scope"]),
  };
}

/** Details of the resource scope */
export interface PolicyPropertiesScope {
  /** Scope id of the resource */
  id?: string;
  /** Display name of the resource */
  displayName?: string;
  /** Type of the resource */
  type?: string;
}

export function policyPropertiesScopeDeserializer(item: any): PolicyPropertiesScope {
  return {
    id: item["id"],
    displayName: item["displayName"],
    type: item["type"],
  };
}

export function roleManagementPolicyArraySerializer(result: Array<RoleManagementPolicy>): any[] {
  return result.map((item) => {
    return roleManagementPolicySerializer(item);
  });
}

export function roleManagementPolicyArrayDeserializer(result: Array<RoleManagementPolicy>): any[] {
  return result.map((item) => {
    return roleManagementPolicyDeserializer(item);
  });
}

/** Role management policy */
export interface RoleManagementPolicyAssignment extends ExtensionResource {
  /** The role management policy scope. */
  scope?: string;
  /** The role definition of management policy assignment. */
  roleDefinitionId?: string;
  /** The policy id role management policy assignment. */
  policyId?: string;
  /** The readonly computed rule applied to the policy. */
  readonly effectiveRules?: RoleManagementPolicyRuleUnion[];
  /** Additional properties of scope, role definition and policy */
  readonly policyAssignmentProperties?: PolicyAssignmentProperties;
}

export function roleManagementPolicyAssignmentSerializer(
  item: RoleManagementPolicyAssignment,
): any {
  return {
    properties: areAllPropsUndefined(item, ["scope", "roleDefinitionId", "policyId"])
      ? undefined
      : _roleManagementPolicyAssignmentPropertiesSerializer(item),
  };
}

export function roleManagementPolicyAssignmentDeserializer(
  item: any,
): RoleManagementPolicyAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _roleManagementPolicyAssignmentPropertiesDeserializer(item["properties"])),
  };
}

/** Role management policy assignment properties with scope. */
export interface RoleManagementPolicyAssignmentProperties {
  /** The role management policy scope. */
  scope?: string;
  /** The role definition of management policy assignment. */
  roleDefinitionId?: string;
  /** The policy id role management policy assignment. */
  policyId?: string;
  /** The readonly computed rule applied to the policy. */
  readonly effectiveRules?: RoleManagementPolicyRuleUnion[];
  /** Additional properties of scope, role definition and policy */
  readonly policyAssignmentProperties?: PolicyAssignmentProperties;
}

export function roleManagementPolicyAssignmentPropertiesSerializer(
  item: RoleManagementPolicyAssignmentProperties,
): any {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    policyId: item["policyId"],
  };
}

export function roleManagementPolicyAssignmentPropertiesDeserializer(
  item: any,
): RoleManagementPolicyAssignmentProperties {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    policyId: item["policyId"],
    effectiveRules: !item["effectiveRules"]
      ? item["effectiveRules"]
      : roleManagementPolicyRuleUnionArrayDeserializer(item["effectiveRules"]),
    policyAssignmentProperties: !item["policyAssignmentProperties"]
      ? item["policyAssignmentProperties"]
      : policyAssignmentPropertiesDeserializer(item["policyAssignmentProperties"]),
  };
}

/** Expanded info of resource scope, role definition and policy */
export interface PolicyAssignmentProperties {
  /** Details of the resource scope */
  scope?: PolicyAssignmentPropertiesScope;
  /** Details of role definition */
  roleDefinition?: PolicyAssignmentPropertiesRoleDefinition;
  /** Details of the policy */
  policy?: PolicyAssignmentPropertiesPolicy;
}

export function policyAssignmentPropertiesDeserializer(item: any): PolicyAssignmentProperties {
  return {
    scope: !item["scope"]
      ? item["scope"]
      : policyAssignmentPropertiesScopeDeserializer(item["scope"]),
    roleDefinition: !item["roleDefinition"]
      ? item["roleDefinition"]
      : policyAssignmentPropertiesRoleDefinitionDeserializer(item["roleDefinition"]),
    policy: !item["policy"]
      ? item["policy"]
      : policyAssignmentPropertiesPolicyDeserializer(item["policy"]),
  };
}

/** Details of the resource scope */
export interface PolicyAssignmentPropertiesScope {
  /** Scope id of the resource */
  id?: string;
  /** Display name of the resource */
  displayName?: string;
  /** Type of the resource */
  type?: string;
}

export function policyAssignmentPropertiesScopeDeserializer(
  item: any,
): PolicyAssignmentPropertiesScope {
  return {
    id: item["id"],
    displayName: item["displayName"],
    type: item["type"],
  };
}

/** Details of role definition */
export interface PolicyAssignmentPropertiesRoleDefinition {
  /** Id of the role definition */
  id?: string;
  /** Display name of the role definition */
  displayName?: string;
  /** Type of the role definition */
  type?: string;
}

export function policyAssignmentPropertiesRoleDefinitionDeserializer(
  item: any,
): PolicyAssignmentPropertiesRoleDefinition {
  return {
    id: item["id"],
    displayName: item["displayName"],
    type: item["type"],
  };
}

/** Details of the policy */
export interface PolicyAssignmentPropertiesPolicy {
  /** Id of the policy */
  id?: string;
  /** The name of the entity last modified it */
  readonly lastModifiedBy?: Principal;
  /** The last modified date time. */
  lastModifiedDateTime?: Date;
}

export function policyAssignmentPropertiesPolicyDeserializer(
  item: any,
): PolicyAssignmentPropertiesPolicy {
  return {
    id: item["id"],
    lastModifiedBy: !item["lastModifiedBy"]
      ? item["lastModifiedBy"]
      : principalDeserializer(item["lastModifiedBy"]),
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
  };
}

export function roleManagementPolicyAssignmentArraySerializer(
  result: Array<RoleManagementPolicyAssignment>,
): any[] {
  return result.map((item) => {
    return roleManagementPolicyAssignmentSerializer(item);
  });
}

export function roleManagementPolicyAssignmentArrayDeserializer(
  result: Array<RoleManagementPolicyAssignment>,
): any[] {
  return result.map((item) => {
    return roleManagementPolicyAssignmentDeserializer(item);
  });
}

/** Paged collection of EligibleChildResource items */
export interface _EligibleChildResourcesListResult {
  /** The EligibleChildResource items on this page */
  value: EligibleChildResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _eligibleChildResourcesListResultDeserializer(
  item: any,
): _EligibleChildResourcesListResult {
  return {
    value: eligibleChildResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function eligibleChildResourceArrayDeserializer(
  result: Array<EligibleChildResource>,
): any[] {
  return result.map((item) => {
    return eligibleChildResourceDeserializer(item);
  });
}

/** Eligible child resource */
export interface EligibleChildResource {
  /** The resource scope Id. */
  readonly id?: string;
  /** The resource name. */
  readonly name?: string;
  /** The resource type. */
  readonly type?: string;
}

export function eligibleChildResourceDeserializer(item: any): EligibleChildResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

export function _roleAssignmentSchedulePropertiesDeserializer(item: any) {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    roleAssignmentScheduleRequestId: item["roleAssignmentScheduleRequestId"],
    linkedRoleEligibilityScheduleId: item["linkedRoleEligibilityScheduleId"],
    assignmentType: item["assignmentType"],
    memberType: item["memberType"],
    status: item["status"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    updatedOn: !item["updatedOn"] ? item["updatedOn"] : new Date(item["updatedOn"]),
    expandedProperties: !item["expandedProperties"]
      ? item["expandedProperties"]
      : expandedPropertiesDeserializer(item["expandedProperties"]),
  };
}

export function _roleAssignmentScheduleInstancePropertiesDeserializer(item: any) {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    roleAssignmentScheduleId: item["roleAssignmentScheduleId"],
    originRoleAssignmentId: item["originRoleAssignmentId"],
    status: item["status"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    linkedRoleEligibilityScheduleId: item["linkedRoleEligibilityScheduleId"],
    linkedRoleEligibilityScheduleInstanceId: item["linkedRoleEligibilityScheduleInstanceId"],
    assignmentType: item["assignmentType"],
    memberType: item["memberType"],
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    expandedProperties: !item["expandedProperties"]
      ? item["expandedProperties"]
      : expandedPropertiesDeserializer(item["expandedProperties"]),
  };
}

export function _roleAssignmentScheduleRequestPropertiesSerializer(
  item: RoleAssignmentScheduleRequest,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    requestType: item["requestType"],
    targetRoleAssignmentScheduleId: item["targetRoleAssignmentScheduleId"],
    targetRoleAssignmentScheduleInstanceId: item["targetRoleAssignmentScheduleInstanceId"],
    scheduleInfo: !item["scheduleInfo"]
      ? item["scheduleInfo"]
      : roleAssignmentScheduleRequestPropertiesScheduleInfoSerializer(item["scheduleInfo"]),
    linkedRoleEligibilityScheduleId: item["linkedRoleEligibilityScheduleId"],
    justification: item["justification"],
    ticketInfo: !item["ticketInfo"]
      ? item["ticketInfo"]
      : roleAssignmentScheduleRequestPropertiesTicketInfoSerializer(item["ticketInfo"]),
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
  };
}

export function _roleAssignmentScheduleRequestPropertiesDeserializer(item: any) {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    requestType: item["requestType"],
    status: item["status"],
    approvalId: item["approvalId"],
    targetRoleAssignmentScheduleId: item["targetRoleAssignmentScheduleId"],
    targetRoleAssignmentScheduleInstanceId: item["targetRoleAssignmentScheduleInstanceId"],
    scheduleInfo: !item["scheduleInfo"]
      ? item["scheduleInfo"]
      : roleAssignmentScheduleRequestPropertiesScheduleInfoDeserializer(item["scheduleInfo"]),
    linkedRoleEligibilityScheduleId: item["linkedRoleEligibilityScheduleId"],
    justification: item["justification"],
    ticketInfo: !item["ticketInfo"]
      ? item["ticketInfo"]
      : roleAssignmentScheduleRequestPropertiesTicketInfoDeserializer(item["ticketInfo"]),
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    requestorId: item["requestorId"],
    expandedProperties: !item["expandedProperties"]
      ? item["expandedProperties"]
      : expandedPropertiesDeserializer(item["expandedProperties"]),
  };
}

export function _roleEligibilitySchedulePropertiesDeserializer(item: any) {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    roleEligibilityScheduleRequestId: item["roleEligibilityScheduleRequestId"],
    memberType: item["memberType"],
    status: item["status"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    updatedOn: !item["updatedOn"] ? item["updatedOn"] : new Date(item["updatedOn"]),
    expandedProperties: !item["expandedProperties"]
      ? item["expandedProperties"]
      : expandedPropertiesDeserializer(item["expandedProperties"]),
  };
}

export function _roleEligibilityScheduleInstancePropertiesDeserializer(item: any) {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    roleEligibilityScheduleId: item["roleEligibilityScheduleId"],
    status: item["status"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
    memberType: item["memberType"],
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    expandedProperties: !item["expandedProperties"]
      ? item["expandedProperties"]
      : expandedPropertiesDeserializer(item["expandedProperties"]),
  };
}

export function _roleEligibilityScheduleRequestPropertiesSerializer(
  item: RoleEligibilityScheduleRequest,
): any {
  return {
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    requestType: item["requestType"],
    scheduleInfo: !item["scheduleInfo"]
      ? item["scheduleInfo"]
      : roleEligibilityScheduleRequestPropertiesScheduleInfoSerializer(item["scheduleInfo"]),
    targetRoleEligibilityScheduleId: item["targetRoleEligibilityScheduleId"],
    targetRoleEligibilityScheduleInstanceId: item["targetRoleEligibilityScheduleInstanceId"],
    justification: item["justification"],
    ticketInfo: !item["ticketInfo"]
      ? item["ticketInfo"]
      : roleEligibilityScheduleRequestPropertiesTicketInfoSerializer(item["ticketInfo"]),
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
  };
}

export function _roleEligibilityScheduleRequestPropertiesDeserializer(item: any) {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    principalId: item["principalId"],
    principalType: item["principalType"],
    requestType: item["requestType"],
    status: item["status"],
    approvalId: item["approvalId"],
    scheduleInfo: !item["scheduleInfo"]
      ? item["scheduleInfo"]
      : roleEligibilityScheduleRequestPropertiesScheduleInfoDeserializer(item["scheduleInfo"]),
    targetRoleEligibilityScheduleId: item["targetRoleEligibilityScheduleId"],
    targetRoleEligibilityScheduleInstanceId: item["targetRoleEligibilityScheduleInstanceId"],
    justification: item["justification"],
    ticketInfo: !item["ticketInfo"]
      ? item["ticketInfo"]
      : roleEligibilityScheduleRequestPropertiesTicketInfoDeserializer(item["ticketInfo"]),
    condition: item["condition"],
    conditionVersion: item["conditionVersion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    requestorId: item["requestorId"],
    expandedProperties: !item["expandedProperties"]
      ? item["expandedProperties"]
      : expandedPropertiesDeserializer(item["expandedProperties"]),
  };
}

export function _roleManagementPolicyPropertiesSerializer(item: RoleManagementPolicy): any {
  return {
    scope: item["scope"],
    displayName: item["displayName"],
    description: item["description"],
    isOrganizationDefault: item["isOrganizationDefault"],
    rules: !item["rules"]
      ? item["rules"]
      : roleManagementPolicyRuleUnionArraySerializer(item["rules"]),
  };
}

export function _roleManagementPolicyPropertiesDeserializer(item: any) {
  return {
    scope: item["scope"],
    displayName: item["displayName"],
    description: item["description"],
    isOrganizationDefault: item["isOrganizationDefault"],
    lastModifiedBy: !item["lastModifiedBy"]
      ? item["lastModifiedBy"]
      : principalDeserializer(item["lastModifiedBy"]),
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    rules: !item["rules"]
      ? item["rules"]
      : roleManagementPolicyRuleUnionArrayDeserializer(item["rules"]),
    effectiveRules: !item["effectiveRules"]
      ? item["effectiveRules"]
      : roleManagementPolicyRuleUnionArrayDeserializer(item["effectiveRules"]),
    policyProperties: !item["policyProperties"]
      ? item["policyProperties"]
      : policyPropertiesDeserializer(item["policyProperties"]),
  };
}

export function _roleManagementPolicyAssignmentPropertiesSerializer(
  item: RoleManagementPolicyAssignment,
): any {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    policyId: item["policyId"],
  };
}

export function _roleManagementPolicyAssignmentPropertiesDeserializer(item: any) {
  return {
    scope: item["scope"],
    roleDefinitionId: item["roleDefinitionId"],
    policyId: item["policyId"],
    effectiveRules: !item["effectiveRules"]
      ? item["effectiveRules"]
      : roleManagementPolicyRuleUnionArrayDeserializer(item["effectiveRules"]),
    policyAssignmentProperties: !item["policyAssignmentProperties"]
      ? item["policyAssignmentProperties"]
      : policyAssignmentPropertiesDeserializer(item["policyAssignmentProperties"]),
  };
}
