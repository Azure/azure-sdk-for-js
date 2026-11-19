// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type {
  AgentFabric,
  Member,
  PolicyGroup,
  ClusterAssociation,
  EgressTrustBundle,
} from "./microsoft/networkSecurity/models.js";
import {
  agentFabricArrayDeserializer,
  memberArrayDeserializer,
  policyGroupArrayDeserializer,
  clusterAssociationArrayDeserializer,
  egressTrustBundleArrayDeserializer,
} from "./microsoft/networkSecurity/models.js";
import type {
  NeuroShieldResource,
  NeuroShieldSummary,
  NeuroShieldProtectedResource,
  NeuroShieldFinding,
  NeuroShieldMitigation,
} from "./neuroShield/management/models.js";
import {
  neuroShieldResourceArrayDeserializer,
  neuroShieldSummaryArrayDeserializer,
  neuroShieldProtectedResourceArrayDeserializer,
  neuroShieldFindingArrayDeserializer,
  neuroShieldMitigationArrayDeserializer,
} from "./neuroShield/management/models.js";

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
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

/** The current status of an async operation. */
export interface OperationStatusResult {
  /** Fully qualified ID for the async operation. */
  id?: string;
  /** Name of the async operation. */
  name?: string;
  /** Operation status. */
  status: string;
  /** Percent of the operation that is complete. */
  percentComplete?: number;
  /** The start time of the operation. */
  startTime?: Date;
  /** The end time of the operation. */
  endTime?: Date;
  /** The operations list. */
  operations?: OperationStatusResult[];
  /** If present, details of the operation error. */
  error?: ErrorDetail;
  /** Fully qualified ID of the resource against which the original async operation was started. */
  readonly resourceId?: string;
}

export function operationStatusResultDeserializer(item: any): OperationStatusResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    resourceId: item["resourceId"],
  };
}

export function operationStatusResultArrayDeserializer(
  result: Array<OperationStatusResult>,
): any[] {
  return result.map((item) => {
    return operationStatusResultDeserializer(item);
  });
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

/** The response of a NeuroShieldResource list operation. */
export interface _NeuroShieldResourceListResult {
  /** The NeuroShieldResource items on this page */
  value: NeuroShieldResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _neuroShieldResourceListResultDeserializer(
  item: any,
): _NeuroShieldResourceListResult {
  return {
    value: neuroShieldResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NeuroShieldSummary list operation. */
export interface _NeuroShieldSummaryListResult {
  /** The NeuroShieldSummary items on this page */
  value: NeuroShieldSummary[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _neuroShieldSummaryListResultDeserializer(
  item: any,
): _NeuroShieldSummaryListResult {
  return {
    value: neuroShieldSummaryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The provisioning state of a resource type. */
export enum KnownResourceProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of a resource type. \
 * {@link KnownResourceProvisioningState} can be used interchangeably with ResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ResourceProvisioningState = string;

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

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

/** The response of a NeuroShieldProtectedResource list operation. */
export interface _NeuroShieldProtectedResourceListResult {
  /** The NeuroShieldProtectedResource items on this page */
  value: NeuroShieldProtectedResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _neuroShieldProtectedResourceListResultDeserializer(
  item: any,
): _NeuroShieldProtectedResourceListResult {
  return {
    value: neuroShieldProtectedResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NeuroShieldFinding list operation. */
export interface _NeuroShieldFindingListResult {
  /** The NeuroShieldFinding items on this page */
  value: NeuroShieldFinding[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _neuroShieldFindingListResultDeserializer(
  item: any,
): _NeuroShieldFindingListResult {
  return {
    value: neuroShieldFindingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a NeuroShieldMitigation list operation. */
export interface _NeuroShieldMitigationListResult {
  /** The NeuroShieldMitigation items on this page */
  value: NeuroShieldMitigation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _neuroShieldMitigationListResultDeserializer(
  item: any,
): _NeuroShieldMitigationListResult {
  return {
    value: neuroShieldMitigationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Managed service identity (either system assigned, or none) */
export interface SystemAssignedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: SystemAssignedServiceIdentityType;
}

export function systemAssignedServiceIdentitySerializer(item: SystemAssignedServiceIdentity): any {
  return { type: item["type"] };
}

export function systemAssignedServiceIdentityDeserializer(
  item: any,
): SystemAssignedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** Type of managed service identity (either system assigned, or none). */
export enum KnownSystemAssignedServiceIdentityType {
  /** No managed system identity. */
  None = "None",
  /** System assigned managed system identity. */
  SystemAssigned = "SystemAssigned",
}

/**
 * Type of managed service identity (either system assigned, or none). \
 * {@link KnownSystemAssignedServiceIdentityType} can be used interchangeably with SystemAssignedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed system identity. \
 * **SystemAssigned**: System assigned managed system identity.
 */
export type SystemAssignedServiceIdentityType = string;

/** The response of a AgentFabric list operation. */
export interface _AgentFabricListResult {
  /** The AgentFabric items on this page */
  value: AgentFabric[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _agentFabricListResultDeserializer(item: any): _AgentFabricListResult {
  return {
    value: agentFabricArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a Member list operation. */
export interface _MemberListResult {
  /** The Member items on this page */
  value: Member[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _memberListResultDeserializer(item: any): _MemberListResult {
  return {
    value: memberArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The type used for updating tags in PolicyGroup resources. */
export interface PolicyGroupTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function policyGroupTagsUpdateSerializer(item: PolicyGroupTagsUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a PolicyGroup list operation. */
export interface _PolicyGroupListResult {
  /** The PolicyGroup items on this page */
  value: PolicyGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _policyGroupListResultDeserializer(item: any): _PolicyGroupListResult {
  return {
    value: policyGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a ClusterAssociation list operation. */
export interface _ClusterAssociationListResult {
  /** The ClusterAssociation items on this page */
  value: ClusterAssociation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterAssociationListResultDeserializer(
  item: any,
): _ClusterAssociationListResult {
  return {
    value: clusterAssociationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The response of a EgressTrustBundle list operation. */
export interface _EgressTrustBundleListResult {
  /** The EgressTrustBundle items on this page */
  value: EgressTrustBundle[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _egressTrustBundleListResultDeserializer(item: any): _EgressTrustBundleListResult {
  return {
    value: egressTrustBundleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}
