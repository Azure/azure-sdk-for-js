// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** redeem request. */
export interface RedeemRequest {
  /** redeem code */
  redeemCode: string;
  /** first name of requester */
  firstName: string;
  /** last name of requester */
  lastName: string;
}

export function redeemRequestSerializer(item: RedeemRequest): any {
  return {
    redeemCode: item["redeemCode"],
    firstName: item["firstName"],
    lastName: item["lastName"],
  };
}

/** Error response indicates that the service is not able to process the incoming request. The reason is provided in the error message. */
export interface ErrorResponseBody {
  /** The details of the error. */
  error?: ErrorResponse;
}

export function errorResponseBodyDeserializer(item: any): ErrorResponseBody {
  return {
    error: !item["error"] ? item["error"] : errorResponseDeserializer(item["error"]),
  };
}

/** Describes the format of Error response. */
export interface ErrorResponse {
  /** Error code */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface OperationListResult {
  /** The Operation items on this page */
  readonly value: Operation[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function operationListResultDeserializer(item: any): OperationListResult {
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

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for an operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
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

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

/** Grant details. */
export interface GrantDetails extends ProxyResource {
  /** Offer Cap */
  readonly offerCap?: Amount;
  /** Grant Effective Date */
  readonly effectiveDate?: Date;
  /** Grant Offer Type */
  readonly offerType?: GrantType;
  /** Expiration Date */
  readonly expirationDate?: Date;
  /** Grant status */
  readonly status?: GrantStatus;
  /** allocated budget */
  readonly allocatedBudget?: Amount;
}

export function grantDetailsDeserializer(item: any): GrantDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _grantDetailsPropertiesDeserializer(item["properties"])),
  };
}

/** Grant detail properties */
export interface GrantDetailProperties {
  /** Offer Cap */
  readonly offerCap?: Amount;
  /** Grant Effective Date */
  readonly effectiveDate?: Date;
  /** Grant Offer Type */
  readonly offerType?: GrantType;
  /** Expiration Date */
  readonly expirationDate?: Date;
  /** Grant status */
  readonly status?: GrantStatus;
  /** allocated budget */
  readonly allocatedBudget?: Amount;
}

export function grantDetailPropertiesDeserializer(item: any): GrantDetailProperties {
  return {
    offerCap: !item["offerCap"] ? item["offerCap"] : amountDeserializer(item["offerCap"]),
    effectiveDate: !item["effectiveDate"] ? item["effectiveDate"] : new Date(item["effectiveDate"]),
    offerType: item["offerType"],
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    status: item["status"],
    allocatedBudget: !item["allocatedBudget"]
      ? item["allocatedBudget"]
      : amountDeserializer(item["allocatedBudget"]),
  };
}

/** The amount. */
export interface Amount {
  /** The type of currency being used for the value. */
  currency?: string;
  /** Amount value. */
  value?: number;
}

export function amountSerializer(item: Amount): any {
  return { currency: item["currency"], value: item["value"] };
}

export function amountDeserializer(item: any): Amount {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

/** Grant Offer Type */
export enum KnownGrantType {
  /** Student */
  Student = "Student",
  /** Academic */
  Academic = "Academic",
}

/**
 * Grant Offer Type \
 * {@link KnownGrantType} can be used interchangeably with GrantType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Student**: Student \
 * **Academic**: Academic
 */
export type GrantType = string;

/** Grant status */
export enum KnownGrantStatus {
  /** Active */
  Active = "Active",
  /** Inactive */
  Inactive = "Inactive",
}

/**
 * Grant status \
 * {@link KnownGrantStatus} can be used interchangeably with GrantStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Active \
 * **Inactive**: Inactive
 */
export type GrantStatus = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
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

export function resourceSerializer(_item: Resource): any {
  return {};
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

/** List of Grants info. */
export interface _GrantListResponse {
  /** The GrantDetails items on this page. */
  readonly value?: GrantDetails[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _grantListResponseDeserializer(item: any): _GrantListResponse {
  return {
    value: !item["value"] ? item["value"] : grantDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function grantDetailsArrayDeserializer(result: Array<GrantDetails>): any[] {
  return result.map((item) => {
    return grantDetailsDeserializer(item);
  });
}

/** Lab details. */
export interface LabDetails extends ProxyResource {
  /** Lab Display Name */
  displayName?: string;
  /** Default monetary cap for each student in this lab */
  budgetPerStudent?: Amount;
  /** Detail description of this lab */
  description?: string;
  /** Default expiration date for each student in this lab */
  expirationDate?: Date;
  /** Lab creation date */
  readonly effectiveDate?: Date;
  /** The status of this lab */
  readonly status?: LabStatus;
  /** the total number of students that can be accepted to the lab. */
  readonly maxStudentCount?: number;
  /** invitation code for redeemable lab */
  readonly invitationCode?: string;
  /** Total budget */
  readonly totalBudget?: Amount;
  /** Total allocated budget */
  readonly totalAllocatedBudget?: Amount;
}

export function labDetailsSerializer(item: LabDetails): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "budgetPerStudent",
      "description",
      "expirationDate",
    ])
      ? undefined
      : _labDetailsPropertiesSerializer(item),
  };
}

export function labDetailsDeserializer(item: any): LabDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _labDetailsPropertiesDeserializer(item["properties"])),
  };
}

/** Lab detail result properties. */
export interface LabProperties {
  /** Lab Display Name */
  displayName: string;
  /** Default monetary cap for each student in this lab */
  budgetPerStudent: Amount;
  /** Detail description of this lab */
  description: string;
  /** Default expiration date for each student in this lab */
  expirationDate: Date;
  /** Lab creation date */
  readonly effectiveDate?: Date;
  /** The status of this lab */
  readonly status?: LabStatus;
  /** the total number of students that can be accepted to the lab. */
  readonly maxStudentCount?: number;
  /** invitation code for redeemable lab */
  readonly invitationCode?: string;
  /** The type of currency being used for the value. */
  currency?: string;
  /** Amount value. */
  value?: number;
  /** The type of currency being used for the value. */
  currencyTotalAllocatedBudgetCurrency?: string;
  /** Amount value. */
  valueTotalAllocatedBudgetValue?: number;
}

export function labPropertiesSerializer(item: LabProperties): any {
  return {
    displayName: item["displayName"],
    budgetPerStudent: amountSerializer(item["budgetPerStudent"]),
    description: item["description"],
    expirationDate: item["expirationDate"].toISOString(),
  };
}

export function labPropertiesDeserializer(item: any): LabProperties {
  return {
    displayName: item["displayName"],
    budgetPerStudent: amountDeserializer(item["budgetPerStudent"]),
    description: item["description"],
    expirationDate: new Date(item["expirationDate"]),
    effectiveDate: !item["effectiveDate"] ? item["effectiveDate"] : new Date(item["effectiveDate"]),
    status: item["status"],
    maxStudentCount: item["maxStudentCount"],
    invitationCode: item["invitationCode"],
    ...(!item["totalBudget"]
      ? item["totalBudget"]
      : _labPropertiesTotalBudgetDeserializer(item["totalBudget"])),
    ...(!item["totalAllocatedBudget"]
      ? item["totalAllocatedBudget"]
      : _labPropertiesTotalAllocatedBudgetDeserializer(item["totalAllocatedBudget"])),
  };
}

/** The status of this lab */
export enum KnownLabStatus {
  /** Active */
  Active = "Active",
  /** Deleted */
  Deleted = "Deleted",
  /** Pending */
  Pending = "Pending",
}

/**
 * The status of this lab \
 * {@link KnownLabStatus} can be used interchangeably with LabStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Active \
 * **Deleted**: Deleted \
 * **Pending**: Pending
 */
export type LabStatus = string;

/** List of Labs info. */
export interface _LabListResult {
  /** The LabDetails items on this page. */
  readonly value?: LabDetails[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _labListResultDeserializer(item: any): _LabListResult {
  return {
    value: !item["value"] ? item["value"] : labDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function labDetailsArraySerializer(result: Array<LabDetails>): any[] {
  return result.map((item) => {
    return labDetailsSerializer(item);
  });
}

export function labDetailsArrayDeserializer(result: Array<LabDetails>): any[] {
  return result.map((item) => {
    return labDetailsDeserializer(item);
  });
}

/** invite code generate request. */
export interface InviteCodeGenerateRequest {
  /** the total number of students that can be accepted to the lab. */
  maxStudentCount?: number;
}

export function inviteCodeGenerateRequestSerializer(item: InviteCodeGenerateRequest): any {
  return { maxStudentCount: item["maxStudentCount"] };
}

/** join requests. */
export interface JoinRequestDetails extends ProxyResource {
  /** First Name */
  firstName?: string;
  /** Last Name */
  lastName?: string;
  /** join request email */
  email?: string;
  /** Join request status */
  status?: JoinRequestStatus;
}

export function joinRequestDetailsDeserializer(item: any): JoinRequestDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _joinRequestDetailsPropertiesDeserializer(item["properties"])),
  };
}

/** Join request properties. */
export interface JoinRequestProperties {
  /** First Name */
  firstName?: string;
  /** Last Name */
  lastName?: string;
  /** join request email */
  email?: string;
  /** Join request status */
  status?: JoinRequestStatus;
}

export function joinRequestPropertiesDeserializer(item: any): JoinRequestProperties {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    email: item["email"],
    status: item["status"],
  };
}

/** Join request status */
export enum KnownJoinRequestStatus {
  /** Pending */
  Pending = "Pending",
  /** Denied */
  Denied = "Denied",
}

/**
 * Join request status \
 * {@link KnownJoinRequestStatus} can be used interchangeably with JoinRequestStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Pending \
 * **Denied**: Denied
 */
export type JoinRequestStatus = string;

/** list of join requests. */
export interface _JoinRequestList {
  /** The JoinRequestDetails items on this page. */
  readonly value?: JoinRequestDetails[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _joinRequestListDeserializer(item: any): _JoinRequestList {
  return {
    value: !item["value"] ? item["value"] : joinRequestDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function joinRequestDetailsArrayDeserializer(result: Array<JoinRequestDetails>): any[] {
  return result.map((item) => {
    return joinRequestDetailsDeserializer(item);
  });
}

/** Student details. */
export interface StudentDetails extends ProxyResource {
  /** First Name */
  firstName?: string;
  /** Last Name */
  lastName?: string;
  /** Student Email */
  email?: string;
  /** Student Role */
  role?: StudentRole;
  /** Student Budget */
  budget?: Amount;
  /** Subscription Id */
  readonly subscriptionId?: string;
  /** Date this student is set to expire from the lab. */
  expirationDate?: Date;
  /** Student Lab Status */
  readonly status?: StudentLabStatus;
  /** Date student was added to the lab */
  readonly effectiveDate?: Date;
  /** Subscription alias */
  subscriptionAlias?: string;
  /** subscription invite last sent date */
  subscriptionInviteLastSentDate?: Date;
}

export function studentDetailsSerializer(item: StudentDetails): any {
  return {
    properties: areAllPropsUndefined(item, [
      "firstName",
      "lastName",
      "email",
      "role",
      "budget",
      "expirationDate",
      "subscriptionAlias",
      "subscriptionInviteLastSentDate",
    ])
      ? undefined
      : _studentDetailsPropertiesSerializer(item),
  };
}

export function studentDetailsDeserializer(item: any): StudentDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _studentDetailsPropertiesDeserializer(item["properties"])),
  };
}

/** Student detail properties */
export interface StudentProperties {
  /** First Name */
  firstName: string;
  /** Last Name */
  lastName: string;
  /** Student Email */
  email: string;
  /** Student Role */
  role: StudentRole;
  /** Student Budget */
  budget: Amount;
  /** Subscription Id */
  readonly subscriptionId?: string;
  /** Date this student is set to expire from the lab. */
  expirationDate: Date;
  /** Student Lab Status */
  readonly status?: StudentLabStatus;
  /** Date student was added to the lab */
  readonly effectiveDate?: Date;
  /** Subscription alias */
  subscriptionAlias?: string;
  /** subscription invite last sent date */
  subscriptionInviteLastSentDate?: Date;
}

export function studentPropertiesSerializer(item: StudentProperties): any {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    email: item["email"],
    role: item["role"],
    budget: amountSerializer(item["budget"]),
    expirationDate: item["expirationDate"].toISOString(),
    subscriptionAlias: item["subscriptionAlias"],
    subscriptionInviteLastSentDate: !item["subscriptionInviteLastSentDate"]
      ? item["subscriptionInviteLastSentDate"]
      : item["subscriptionInviteLastSentDate"].toISOString(),
  };
}

export function studentPropertiesDeserializer(item: any): StudentProperties {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    email: item["email"],
    role: item["role"],
    budget: amountDeserializer(item["budget"]),
    subscriptionId: item["subscriptionId"],
    expirationDate: new Date(item["expirationDate"]),
    status: item["status"],
    effectiveDate: !item["effectiveDate"] ? item["effectiveDate"] : new Date(item["effectiveDate"]),
    subscriptionAlias: item["subscriptionAlias"],
    subscriptionInviteLastSentDate: !item["subscriptionInviteLastSentDate"]
      ? item["subscriptionInviteLastSentDate"]
      : new Date(item["subscriptionInviteLastSentDate"]),
  };
}

/** Student Role */
export enum KnownStudentRole {
  /** Student */
  Student = "Student",
  /** Admin */
  Admin = "Admin",
}

/**
 * Student Role \
 * {@link KnownStudentRole} can be used interchangeably with StudentRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Student**: Student \
 * **Admin**: Admin
 */
export type StudentRole = string;

/** Student Lab Status */
export enum KnownStudentLabStatus {
  /** Active */
  Active = "Active",
  /** Disabled */
  Disabled = "Disabled",
  /** Expired */
  Expired = "Expired",
  /** Pending */
  Pending = "Pending",
  /** Deleted */
  Deleted = "Deleted",
}

/**
 * Student Lab Status \
 * {@link KnownStudentLabStatus} can be used interchangeably with StudentLabStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Active \
 * **Disabled**: Disabled \
 * **Expired**: Expired \
 * **Pending**: Pending \
 * **Deleted**: Deleted
 */
export type StudentLabStatus = string;

/** List of Students info. */
export interface _StudentListResult {
  /** The StudentDetails items on this page. */
  readonly value?: StudentDetails[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _studentListResultDeserializer(item: any): _StudentListResult {
  return {
    value: !item["value"] ? item["value"] : studentDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function studentDetailsArraySerializer(result: Array<StudentDetails>): any[] {
  return result.map((item) => {
    return studentDetailsSerializer(item);
  });
}

export function studentDetailsArrayDeserializer(result: Array<StudentDetails>): any[] {
  return result.map((item) => {
    return studentDetailsDeserializer(item);
  });
}

/** Student lab details. */
export interface StudentLabDetails extends ProxyResource {
  /** Student lab Display Name */
  readonly displayName?: string;
  /** Detail description of this lab */
  readonly description?: string;
  /** Date the lab will expire and by default will be the expiration date for each student in this lab */
  readonly expirationDate?: Date;
  /** Student Role */
  readonly role?: StudentRole;
  /** Student Budget */
  readonly budget?: Amount;
  /** Subscription Id */
  readonly subscriptionId?: string;
  /** Student Lab Status */
  readonly status?: StudentLabStatus;
  /** User Added Date */
  readonly effectiveDate?: Date;
  /** Lab Scope. /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/providers/Microsoft.Education/labs/default */
  readonly labScope?: string;
}

export function studentLabDetailsDeserializer(item: any): StudentLabDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _studentLabDetailsPropertiesDeserializer(item["properties"])),
  };
}

/** Student lab detail properties */
export interface StudentLabProperties {
  /** Student lab Display Name */
  readonly displayName?: string;
  /** Detail description of this lab */
  readonly description?: string;
  /** Date the lab will expire and by default will be the expiration date for each student in this lab */
  readonly expirationDate?: Date;
  /** Student Role */
  readonly role?: StudentRole;
  /** Student Budget */
  readonly budget?: Amount;
  /** Subscription Id */
  readonly subscriptionId?: string;
  /** Student Lab Status */
  readonly status?: StudentLabStatus;
  /** User Added Date */
  readonly effectiveDate?: Date;
  /** Lab Scope. /providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/invoiceSections/{invoiceSectionName}/providers/Microsoft.Education/labs/default */
  readonly labScope?: string;
}

export function studentLabPropertiesDeserializer(item: any): StudentLabProperties {
  return {
    displayName: item["displayName"],
    description: item["description"],
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    role: item["role"],
    budget: !item["budget"] ? item["budget"] : amountDeserializer(item["budget"]),
    subscriptionId: item["subscriptionId"],
    status: item["status"],
    effectiveDate: !item["effectiveDate"] ? item["effectiveDate"] : new Date(item["effectiveDate"]),
    labScope: item["labScope"],
  };
}

/** List of Student Labs info. */
export interface _StudentLabListResult {
  /** The StudentLabDetails items on this page. */
  readonly value?: StudentLabDetails[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _studentLabListResultDeserializer(item: any): _StudentLabListResult {
  return {
    value: !item["value"] ? item["value"] : studentLabDetailsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function studentLabDetailsArrayDeserializer(result: Array<StudentLabDetails>): any[] {
  return result.map((item) => {
    return studentLabDetailsDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2021-12-01-preview API version. */
  V20211201Preview = "2021-12-01-preview",
}

export function _grantDetailsPropertiesDeserializer(item: any) {
  return {
    offerCap: !item["offerCap"] ? item["offerCap"] : amountDeserializer(item["offerCap"]),
    effectiveDate: !item["effectiveDate"] ? item["effectiveDate"] : new Date(item["effectiveDate"]),
    offerType: item["offerType"],
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    status: item["status"],
    allocatedBudget: !item["allocatedBudget"]
      ? item["allocatedBudget"]
      : amountDeserializer(item["allocatedBudget"]),
  };
}

export function _labPropertiesTotalBudgetSerializer(item: LabProperties): any {
  return { currency: item["currency"], value: item["value"] };
}

export function _labPropertiesTotalBudgetDeserializer(item: any) {
  return {
    currency: item["currency"],
    value: item["value"],
  };
}

export function _labPropertiesTotalAllocatedBudgetSerializer(item: LabProperties): any {
  return {
    currency: item["currencyTotalAllocatedBudgetCurrency"],
    value: item["valueTotalAllocatedBudgetValue"],
  };
}

export function _labPropertiesTotalAllocatedBudgetDeserializer(item: any) {
  return {
    currencyTotalAllocatedBudgetCurrency: item["currency"],
    valueTotalAllocatedBudgetValue: item["value"],
  };
}

export function _labDetailsPropertiesSerializer(item: LabDetails): any {
  return {
    displayName: item["displayName"],
    budgetPerStudent: !item["budgetPerStudent"]
      ? item["budgetPerStudent"]
      : amountSerializer(item["budgetPerStudent"]),
    description: item["description"],
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : item["expirationDate"].toISOString(),
  };
}

export function _labDetailsPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    budgetPerStudent: !item["budgetPerStudent"]
      ? item["budgetPerStudent"]
      : amountDeserializer(item["budgetPerStudent"]),
    description: item["description"],
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    effectiveDate: !item["effectiveDate"] ? item["effectiveDate"] : new Date(item["effectiveDate"]),
    status: item["status"],
    maxStudentCount: item["maxStudentCount"],
    invitationCode: item["invitationCode"],
    totalBudget: !item["totalBudget"]
      ? item["totalBudget"]
      : amountDeserializer(item["totalBudget"]),
    totalAllocatedBudget: !item["totalAllocatedBudget"]
      ? item["totalAllocatedBudget"]
      : amountDeserializer(item["totalAllocatedBudget"]),
  };
}

export function _joinRequestDetailsPropertiesDeserializer(item: any) {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    email: item["email"],
    status: item["status"],
  };
}

export function _studentDetailsPropertiesSerializer(item: StudentDetails): any {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    email: item["email"],
    role: item["role"],
    budget: !item["budget"] ? item["budget"] : amountSerializer(item["budget"]),
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : item["expirationDate"].toISOString(),
    subscriptionAlias: item["subscriptionAlias"],
    subscriptionInviteLastSentDate: !item["subscriptionInviteLastSentDate"]
      ? item["subscriptionInviteLastSentDate"]
      : item["subscriptionInviteLastSentDate"].toISOString(),
  };
}

export function _studentDetailsPropertiesDeserializer(item: any) {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    email: item["email"],
    role: item["role"],
    budget: !item["budget"] ? item["budget"] : amountDeserializer(item["budget"]),
    subscriptionId: item["subscriptionId"],
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    status: item["status"],
    effectiveDate: !item["effectiveDate"] ? item["effectiveDate"] : new Date(item["effectiveDate"]),
    subscriptionAlias: item["subscriptionAlias"],
    subscriptionInviteLastSentDate: !item["subscriptionInviteLastSentDate"]
      ? item["subscriptionInviteLastSentDate"]
      : new Date(item["subscriptionInviteLastSentDate"]),
  };
}

export function _studentLabDetailsPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    role: item["role"],
    budget: !item["budget"] ? item["budget"] : amountDeserializer(item["budget"]),
    subscriptionId: item["subscriptionId"],
    status: item["status"],
    effectiveDate: !item["effectiveDate"] ? item["effectiveDate"] : new Date(item["effectiveDate"]),
    labScope: item["labScope"],
  };
}
