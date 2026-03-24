// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Management group name availability check parameters. */
export interface CheckNameAvailabilityRequest {
  /** the name to check for availability */
  name?: string;
  /** fully qualified resource type which includes provider namespace */
  type?: "Microsoft.Management/managementGroups";
}

export function checkNameAvailabilityRequestSerializer(item: CheckNameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** Describes the result of the request to check management group name availability. */
export interface CheckNameAvailabilityResult {
  /** Required. True indicates name is valid and available. False indicates the name is invalid, unavailable, or both. */
  readonly nameAvailable?: boolean;
  /** Required if nameAvailable == false. Invalid indicates the name provided does not match the resource provider's naming requirements (incorrect length, unsupported characters, etc.) AlreadyExists indicates that the name is already in use and is therefore unavailable. */
  readonly reason?: Reason;
  /** Required if nameAvailable == false. Localized. If reason == invalid, provide the user with the reason why the given name is invalid, and provide the resource naming requirements so that the user can select a valid name. If reason == AlreadyExists, explain that is already in use, and direct them to select a different name. */
  readonly message?: string;
}

export function checkNameAvailabilityResultDeserializer(item: any): CheckNameAvailabilityResult {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Required if nameAvailable == false. Invalid indicates the name provided does not match the resource provider's naming requirements (incorrect length, unsupported characters, etc.) AlreadyExists indicates that the name is already in use and is therefore unavailable. */
export type Reason = "Invalid" | "AlreadyExists";

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

/** The tenant backfill status */
export interface TenantBackfillStatusResult {
  /** The AAD Tenant ID associated with the management group. For example, 00000000-0000-0000-0000-000000000000 */
  readonly tenantId?: string;
  /** The status of the Tenant Backfill */
  readonly status?: Status;
}

export function tenantBackfillStatusResultDeserializer(item: any): TenantBackfillStatusResult {
  return {
    tenantId: item["tenantId"],
    status: item["status"],
  };
}

/** The status of the Tenant Backfill */
export type Status =
  | "NotStarted"
  | "NotStartedButGroupsExist"
  | "Started"
  | "Failed"
  | "Cancelled"
  | "Completed";

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

/** The management group details. */
export interface ManagementGroup extends ProxyResource {
  /** The AAD Tenant ID associated with the management group. For example, 00000000-0000-0000-0000-000000000000 */
  tenantId?: string;
  /** The friendly name of the management group. */
  displayName?: string;
  /** The details of a management group. */
  details?: ManagementGroupDetails;
  /** The list of children. */
  children?: ManagementGroupChildInfo[];
}

export function managementGroupDeserializer(item: any): ManagementGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managementGroupPropertiesDeserializer(item["properties"])),
  };
}

/** The generic properties of a management group. */
export interface ManagementGroupProperties {
  /** The AAD Tenant ID associated with the management group. For example, 00000000-0000-0000-0000-000000000000 */
  tenantId?: string;
  /** The friendly name of the management group. */
  displayName?: string;
  /** The details of a management group. */
  details?: ManagementGroupDetails;
  /** The list of children. */
  children?: ManagementGroupChildInfo[];
}

export function managementGroupPropertiesDeserializer(item: any): ManagementGroupProperties {
  return {
    tenantId: item["tenantId"],
    displayName: item["displayName"],
    details: !item["details"]
      ? item["details"]
      : managementGroupDetailsDeserializer(item["details"]),
    children: !item["children"]
      ? item["children"]
      : managementGroupChildInfoArrayDeserializer(item["children"]),
  };
}

/** The details of a management group. */
export interface ManagementGroupDetails {
  /** The version number of the object. */
  version?: number;
  /** The date and time when this object was last updated. */
  updatedTime?: Date;
  /** The identity of the principal or process that updated the object. */
  updatedBy?: string;
  /** (Optional) The ID of the parent management group. */
  parent?: ParentGroupInfo;
  /** The path from the root to the current group. */
  path?: ManagementGroupPathElement[];
  /** The ancestors of the management group. */
  managementGroupAncestors?: string[];
  /** The ancestors of the management group displayed in reversed order, from immediate parent to the root. */
  managementGroupAncestorsChain?: ManagementGroupPathElement[];
}

export function managementGroupDetailsDeserializer(item: any): ManagementGroupDetails {
  return {
    version: item["version"],
    updatedTime: !item["updatedTime"] ? item["updatedTime"] : new Date(item["updatedTime"]),
    updatedBy: item["updatedBy"],
    parent: !item["parent"] ? item["parent"] : parentGroupInfoDeserializer(item["parent"]),
    path: !item["path"] ? item["path"] : managementGroupPathElementArrayDeserializer(item["path"]),
    managementGroupAncestors: !item["managementGroupAncestors"]
      ? item["managementGroupAncestors"]
      : item["managementGroupAncestors"].map((p1: any) => {
          return p1;
        }),
    managementGroupAncestorsChain: !item["managementGroupAncestorsChain"]
      ? item["managementGroupAncestorsChain"]
      : managementGroupPathElementArrayDeserializer(item["managementGroupAncestorsChain"]),
  };
}

/** (Optional) The ID of the parent management group. */
export interface ParentGroupInfo {
  /** The fully qualified ID for the parent management group.  For example, /providers/Microsoft.Management/managementGroups/0000000-0000-0000-0000-000000000000 */
  id?: string;
  /** The name of the parent management group */
  name?: string;
  /** The friendly name of the parent management group. */
  displayName?: string;
}

export function parentGroupInfoDeserializer(item: any): ParentGroupInfo {
  return {
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
  };
}

export function managementGroupPathElementArrayDeserializer(
  result: Array<ManagementGroupPathElement>,
): any[] {
  return result.map((item) => {
    return managementGroupPathElementDeserializer(item);
  });
}

/** A path element of a management group ancestors. */
export interface ManagementGroupPathElement {
  /** The name of the group. */
  name?: string;
  /** The friendly name of the group. */
  displayName?: string;
}

export function managementGroupPathElementDeserializer(item: any): ManagementGroupPathElement {
  return {
    name: item["name"],
    displayName: item["displayName"],
  };
}

export function managementGroupChildInfoArrayDeserializer(
  result: Array<ManagementGroupChildInfo>,
): any[] {
  return result.map((item) => {
    return managementGroupChildInfoDeserializer(item);
  });
}

/** The child information of a management group. */
export interface ManagementGroupChildInfo {
  /** The fully qualified resource type which includes provider namespace (e.g. Microsoft.Management/managementGroups) */
  type?: ManagementGroupChildType;
  /** The fully qualified ID for the child resource (management group or subscription).  For example, /providers/Microsoft.Management/managementGroups/0000000-0000-0000-0000-000000000000 */
  id?: string;
  /** The name of the child entity. */
  name?: string;
  /** The friendly name of the child resource. */
  displayName?: string;
  /** The list of children. */
  children?: ManagementGroupChildInfo[];
}

export function managementGroupChildInfoDeserializer(item: any): ManagementGroupChildInfo {
  return {
    type: item["type"],
    id: item["id"],
    name: item["name"],
    displayName: item["displayName"],
    children: !item["children"]
      ? item["children"]
      : managementGroupChildInfoArrayDeserializer(item["children"]),
  };
}

/** The type of child resource. */
export type ManagementGroupChildType = "Microsoft.Management/managementGroups" | "/subscriptions";

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

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

/** Management group creation parameters. */
export interface CreateManagementGroupRequest {
  /** The fully qualified ID for the management group.  For example, /providers/Microsoft.Management/managementGroups/0000000-0000-0000-0000-000000000000 */
  readonly id?: string;
  /** The type of the resource.  For example, Microsoft.Management/managementGroups */
  readonly type?: string;
  /** The name of the management group. For example, 00000000-0000-0000-0000-000000000000 */
  name?: string;
  /** The AAD Tenant ID associated with the management group. For example, 00000000-0000-0000-0000-000000000000 */
  readonly tenantId?: string;
  /** The friendly name of the management group. If no value is passed then this  field will be set to the groupId. */
  displayName?: string;
  /** The details of a management group used during creation. */
  details?: CreateManagementGroupDetails;
  /** The list of children. */
  readonly children?: CreateManagementGroupChildInfo[];
}

export function createManagementGroupRequestSerializer(item: CreateManagementGroupRequest): any {
  return {
    name: item["name"],
    properties: areAllPropsUndefined(item, ["displayName", "details"])
      ? undefined
      : _createManagementGroupRequestPropertiesSerializer(item),
  };
}

/** The generic properties of a management group used during creation. */
export interface CreateManagementGroupProperties {
  /** The AAD Tenant ID associated with the management group. For example, 00000000-0000-0000-0000-000000000000 */
  readonly tenantId?: string;
  /** The friendly name of the management group. If no value is passed then this  field will be set to the groupId. */
  displayName?: string;
  /** The details of a management group used during creation. */
  details?: CreateManagementGroupDetails;
  /** The list of children. */
  readonly children?: CreateManagementGroupChildInfo[];
}

export function createManagementGroupPropertiesSerializer(
  item: CreateManagementGroupProperties,
): any {
  return {
    displayName: item["displayName"],
    details: !item["details"]
      ? item["details"]
      : createManagementGroupDetailsSerializer(item["details"]),
  };
}

/** The details of a management group used during creation. */
export interface CreateManagementGroupDetails {
  /** The version number of the object. */
  readonly version?: number;
  /** The date and time when this object was last updated. */
  readonly updatedTime?: Date;
  /** The identity of the principal or process that updated the object. */
  readonly updatedBy?: string;
  /** (Optional) The ID of the parent management group used during creation. */
  parent?: CreateParentGroupInfo;
}

export function createManagementGroupDetailsSerializer(item: CreateManagementGroupDetails): any {
  return {
    parent: !item["parent"] ? item["parent"] : createParentGroupInfoSerializer(item["parent"]),
  };
}

/** (Optional) The ID of the parent management group used during creation. */
export interface CreateParentGroupInfo {
  /** The fully qualified ID for the parent management group.  For example, /providers/Microsoft.Management/managementGroups/0000000-0000-0000-0000-000000000000 */
  id?: string;
  /** The name of the parent management group */
  readonly name?: string;
  /** The friendly name of the parent management group. */
  readonly displayName?: string;
}

export function createParentGroupInfoSerializer(item: CreateParentGroupInfo): any {
  return { id: item["id"] };
}

export function createManagementGroupChildInfoArraySerializer(
  result: Array<CreateManagementGroupChildInfo>,
): any[] {
  return result.map((item) => {
    return createManagementGroupChildInfoSerializer(item);
  });
}

/** The child information of a management group used during creation. */
export interface CreateManagementGroupChildInfo {
  /** The fully qualified resource type which includes provider namespace (e.g. Microsoft.Management/managementGroups) */
  readonly type?: ManagementGroupChildType;
  /** The fully qualified ID for the child resource (management group or subscription).  For example, /providers/Microsoft.Management/managementGroups/0000000-0000-0000-0000-000000000000 */
  readonly id?: string;
  /** The name of the child entity. */
  readonly name?: string;
  /** The friendly name of the child resource. */
  readonly displayName?: string;
  /** The list of children. */
  readonly children?: CreateManagementGroupChildInfo[];
}

export function createManagementGroupChildInfoSerializer(
  item: CreateManagementGroupChildInfo,
): any {
  return item;
}

/** The generic properties of a management group. */
export interface ManagementGroupInfoProperties {
  /** The AAD Tenant ID associated with the management group. For example, 00000000-0000-0000-0000-000000000000 */
  tenantId?: string;
  /** The friendly name of the management group. */
  displayName?: string;
}

export function managementGroupInfoPropertiesDeserializer(
  item: any,
): ManagementGroupInfoProperties {
  return {
    tenantId: item["tenantId"],
    displayName: item["displayName"],
  };
}

/** Management group patch parameters. */
export interface PatchManagementGroupRequest {
  /** The friendly name of the management group. */
  displayName?: string;
  /** (Optional) The fully qualified ID for the parent management group.  For example, /providers/Microsoft.Management/managementGroups/0000000-0000-0000-0000-000000000000 */
  parentGroupId?: string;
}

export function patchManagementGroupRequestSerializer(item: PatchManagementGroupRequest): any {
  return { displayName: item["displayName"], parentGroupId: item["parentGroupId"] };
}

/** Paged collection of DescendantInfo items */
export interface _DescendantListResult {
  /** The DescendantInfo items on this page */
  value: DescendantInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _descendantListResultDeserializer(item: any): _DescendantListResult {
  return {
    value: descendantInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function descendantInfoArrayDeserializer(result: Array<DescendantInfo>): any[] {
  return result.map((item) => {
    return descendantInfoDeserializer(item);
  });
}

/** The descendant. */
export interface DescendantInfo {
  /** The fully qualified ID for the descendant.  For example, /providers/Microsoft.Management/managementGroups/0000000-0000-0000-0000-000000000000 or /subscriptions/0000000-0000-0000-0000-000000000000 */
  readonly id?: string;
  /** The type of the resource. For example, Microsoft.Management/managementGroups or /subscriptions */
  readonly type?: string;
  /** The name of the descendant. For example, 00000000-0000-0000-0000-000000000000 */
  readonly name?: string;
  /** The generic properties of an descendant. */
  properties?: DescendantInfoProperties;
}

export function descendantInfoDeserializer(item: any): DescendantInfo {
  return {
    id: item["id"],
    type: item["type"],
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : descendantInfoPropertiesDeserializer(item["properties"]),
  };
}

/** The generic properties of an descendant. */
export interface DescendantInfoProperties {
  /** The friendly name of the management group. */
  displayName?: string;
  /** The ID of the parent management group. */
  parent?: DescendantParentGroupInfo;
}

export function descendantInfoPropertiesDeserializer(item: any): DescendantInfoProperties {
  return {
    displayName: item["displayName"],
    parent: !item["parent"]
      ? item["parent"]
      : descendantParentGroupInfoDeserializer(item["parent"]),
  };
}

/** The ID of the parent management group. */
export interface DescendantParentGroupInfo {
  /** The fully qualified ID for the parent management group.  For example, /providers/Microsoft.Management/managementGroups/0000000-0000-0000-0000-000000000000 */
  id?: string;
}

export function descendantParentGroupInfoDeserializer(item: any): DescendantParentGroupInfo {
  return {
    id: item["id"],
  };
}

/** Describes the result of the request to list management groups. */
export interface _ManagementGroupListResult {
  /** The list of management groups. */
  value?: ManagementGroupInfo[];
  /** The URL to use for getting the next set of results. */
  readonly nextLink?: string;
}

export function _managementGroupListResultDeserializer(item: any): _ManagementGroupListResult {
  return {
    value: !item["value"] ? item["value"] : managementGroupInfoArrayDeserializer(item["value"]),
    nextLink: item["@nextLink"],
  };
}

export function managementGroupInfoArrayDeserializer(result: Array<ManagementGroupInfo>): any[] {
  return result.map((item) => {
    return managementGroupInfoDeserializer(item);
  });
}

/** The management group resource. */
export interface ManagementGroupInfo {
  /** The fully qualified ID for the management group.  For example, /providers/Microsoft.Management/managementGroups/0000000-0000-0000-0000-000000000000 */
  readonly id?: string;
  /** The type of the resource. For example, Microsoft.Management/managementGroups */
  readonly type?: string;
  /** The name of the management group. For example, 00000000-0000-0000-0000-000000000000 */
  readonly name?: string;
  /** The AAD Tenant ID associated with the management group. For example, 00000000-0000-0000-0000-000000000000 */
  tenantId?: string;
  /** The friendly name of the management group. */
  displayName?: string;
}

export function managementGroupInfoDeserializer(item: any): ManagementGroupInfo {
  return {
    id: item["id"],
    type: item["type"],
    name: item["name"],
    ...(!item["properties"]
      ? item["properties"]
      : _managementGroupInfoPropertiesDeserializer(item["properties"])),
  };
}

/** Lists all hierarchy settings. */
export interface HierarchySettingsList {
  /** The list of hierarchy settings. */
  value?: HierarchySettingsInfo[];
  /** The URL to use for getting the next set of results. */
  readonly nextLink?: string;
}

export function hierarchySettingsListDeserializer(item: any): HierarchySettingsList {
  return {
    value: !item["value"] ? item["value"] : hierarchySettingsInfoArrayDeserializer(item["value"]),
    nextLink: item["@nextLink"],
  };
}

export function hierarchySettingsInfoArrayDeserializer(
  result: Array<HierarchySettingsInfo>,
): any[] {
  return result.map((item) => {
    return hierarchySettingsInfoDeserializer(item);
  });
}

/** The hierarchy settings resource. */
export interface HierarchySettingsInfo {
  /** The fully qualified ID for the settings object.  For example, /providers/Microsoft.Management/managementGroups/0000000-0000-0000-0000-000000000000/settings/default. */
  readonly id?: string;
  /** The type of the resource.  For example, Microsoft.Management/managementGroups/settings. */
  readonly type?: string;
  /** The name of the object. In this case, default. */
  readonly name?: string;
  /** The AAD Tenant ID associated with the hierarchy settings. For example, 00000000-0000-0000-0000-000000000000 */
  tenantId?: string;
  /** Indicates whether RBAC access is required upon group creation under the root Management Group. If set to true, user will require Microsoft.Management/managementGroups/write action on the root Management Group scope in order to create new Groups directly under the root. This will prevent new users from creating new Management Groups, unless they are given access. */
  requireAuthorizationForGroupCreation?: boolean;
  /** Settings that sets the default Management Group under which new subscriptions get added in this tenant. For example, /providers/Microsoft.Management/managementGroups/defaultGroup */
  defaultManagementGroup?: string;
}

export function hierarchySettingsInfoDeserializer(item: any): HierarchySettingsInfo {
  return {
    id: item["id"],
    type: item["type"],
    name: item["name"],
    ...(!item["properties"]
      ? item["properties"]
      : _hierarchySettingsInfoPropertiesDeserializer(item["properties"])),
  };
}

/** The generic properties of hierarchy settings. */
export interface HierarchySettingsProperties {
  /** The AAD Tenant ID associated with the hierarchy settings. For example, 00000000-0000-0000-0000-000000000000 */
  tenantId?: string;
  /** Indicates whether RBAC access is required upon group creation under the root Management Group. If set to true, user will require Microsoft.Management/managementGroups/write action on the root Management Group scope in order to create new Groups directly under the root. This will prevent new users from creating new Management Groups, unless they are given access. */
  requireAuthorizationForGroupCreation?: boolean;
  /** Settings that sets the default Management Group under which new subscriptions get added in this tenant. For example, /providers/Microsoft.Management/managementGroups/defaultGroup */
  defaultManagementGroup?: string;
}

export function hierarchySettingsPropertiesDeserializer(item: any): HierarchySettingsProperties {
  return {
    tenantId: item["tenantId"],
    requireAuthorizationForGroupCreation: item["requireAuthorizationForGroupCreation"],
    defaultManagementGroup: item["defaultManagementGroup"],
  };
}

/** Settings defined at the Management Group scope. */
export interface HierarchySettings extends ProxyResource {
  /** The AAD Tenant ID associated with the hierarchy settings. For example, 00000000-0000-0000-0000-000000000000 */
  tenantId?: string;
  /** Indicates whether RBAC access is required upon group creation under the root Management Group. If set to true, user will require Microsoft.Management/managementGroups/write action on the root Management Group scope in order to create new Groups directly under the root. This will prevent new users from creating new Management Groups, unless they are given access. */
  requireAuthorizationForGroupCreation?: boolean;
  /** Settings that sets the default Management Group under which new subscriptions get added in this tenant. For example, /providers/Microsoft.Management/managementGroups/defaultGroup */
  defaultManagementGroup?: string;
}

export function hierarchySettingsDeserializer(item: any): HierarchySettings {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _hierarchySettingsPropertiesDeserializer(item["properties"])),
  };
}

/** Parameters for creating or updating Management Group settings */
export interface CreateOrUpdateSettingsRequest {
  /** Indicates whether RBAC access is required upon group creation under the root Management Group. If set to true, user will require Microsoft.Management/managementGroups/write action on the root Management Group scope in order to create new Groups directly under the root. This will prevent new users from creating new Management Groups, unless they are given access. */
  requireAuthorizationForGroupCreation?: boolean;
  /** Settings that sets the default Management Group under which new subscriptions get added in this tenant. For example, /providers/Microsoft.Management/managementGroups/defaultGroup */
  defaultManagementGroup?: string;
}

export function createOrUpdateSettingsRequestSerializer(item: CreateOrUpdateSettingsRequest): any {
  return {
    properties: areAllPropsUndefined(item, [
      "requireAuthorizationForGroupCreation",
      "defaultManagementGroup",
    ])
      ? undefined
      : _createOrUpdateSettingsRequestPropertiesSerializer(item),
  };
}

/** The properties of the request to create or update Management Group settings */
export interface CreateOrUpdateSettingsProperties {
  /** Indicates whether RBAC access is required upon group creation under the root Management Group. If set to true, user will require Microsoft.Management/managementGroups/write action on the root Management Group scope in order to create new Groups directly under the root. This will prevent new users from creating new Management Groups, unless they are given access. */
  requireAuthorizationForGroupCreation?: boolean;
  /** Settings that sets the default Management Group under which new subscriptions get added in this tenant. For example, /providers/Microsoft.Management/managementGroups/defaultGroup */
  defaultManagementGroup?: string;
}

export function createOrUpdateSettingsPropertiesSerializer(
  item: CreateOrUpdateSettingsProperties,
): any {
  return {
    requireAuthorizationForGroupCreation: item["requireAuthorizationForGroupCreation"],
    defaultManagementGroup: item["defaultManagementGroup"],
  };
}

/** The details of subscription under management group. */
export interface SubscriptionUnderManagementGroup extends ProxyResource {
  /** The AAD Tenant ID associated with the subscription. For example, 00000000-0000-0000-0000-000000000000 */
  tenant?: string;
  /** The friendly name of the subscription. */
  displayName?: string;
  /** The ID of the parent management group. */
  parent?: DescendantParentGroupInfo;
  /** The state of the subscription. */
  state?: string;
}

export function subscriptionUnderManagementGroupDeserializer(
  item: any,
): SubscriptionUnderManagementGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _subscriptionUnderManagementGroupPropertiesDeserializer(item["properties"])),
  };
}

/** The generic properties of subscription under a management group. */
export interface SubscriptionUnderManagementGroupProperties {
  /** The AAD Tenant ID associated with the subscription. For example, 00000000-0000-0000-0000-000000000000 */
  tenant?: string;
  /** The friendly name of the subscription. */
  displayName?: string;
  /** The ID of the parent management group. */
  parent?: DescendantParentGroupInfo;
  /** The state of the subscription. */
  state?: string;
}

export function subscriptionUnderManagementGroupPropertiesDeserializer(
  item: any,
): SubscriptionUnderManagementGroupProperties {
  return {
    tenant: item["tenant"],
    displayName: item["displayName"],
    parent: !item["parent"]
      ? item["parent"]
      : descendantParentGroupInfoDeserializer(item["parent"]),
    state: item["state"],
  };
}

/** The details of all subscriptions under management group. */
export interface _ListSubscriptionUnderManagementGroup {
  /** The SubscriptionUnderManagementGroup items on this page */
  value: SubscriptionUnderManagementGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listSubscriptionUnderManagementGroupDeserializer(
  item: any,
): _ListSubscriptionUnderManagementGroup {
  return {
    value: subscriptionUnderManagementGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function subscriptionUnderManagementGroupArrayDeserializer(
  result: Array<SubscriptionUnderManagementGroup>,
): any[] {
  return result.map((item) => {
    return subscriptionUnderManagementGroupDeserializer(item);
  });
}

/** Describes the result of the request to view entities. */
export interface _EntityListResult {
  /** The EntityInfo items on this page */
  value: EntityInfo[];
  /** The link to the next page of items */
  nextLink?: string;
  /** Total count of records that match the filter. */
  count?: number;
}

export function _entityListResultDeserializer(item: any): _EntityListResult {
  return {
    value: entityInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
    count: item["count"],
  };
}

export function entityInfoArrayDeserializer(result: Array<EntityInfo>): any[] {
  return result.map((item) => {
    return entityInfoDeserializer(item);
  });
}

/** The entity. */
export interface EntityInfo {
  /** The fully qualified ID for the entity.  For example, /providers/Microsoft.Management/managementGroups/0000000-0000-0000-0000-000000000000 */
  readonly id?: string;
  /** The type of the resource. For example, Microsoft.Management/managementGroups */
  readonly type?: string;
  /** The name of the entity. For example, 00000000-0000-0000-0000-000000000000 */
  readonly name?: string;
  /** The generic properties of an entity. */
  properties?: EntityInfoProperties;
}

export function entityInfoDeserializer(item: any): EntityInfo {
  return {
    id: item["id"],
    type: item["type"],
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : entityInfoPropertiesDeserializer(item["properties"]),
  };
}

/** The generic properties of an entity. */
export interface EntityInfoProperties {
  /** The AAD Tenant ID associated with the entity. For example, 00000000-0000-0000-0000-000000000000 */
  tenantId?: string;
  /** The friendly name of the management group. */
  displayName?: string;
  /** (Optional) The ID of the parent management group. */
  parent?: EntityParentGroupInfo;
  /** The users specific permissions to this item. */
  permissions?: Permissions;
  /** The users specific permissions to this item. */
  inheritedPermissions?: Permissions;
  /** Number of Descendants */
  numberOfDescendants?: number;
  /** Number of children is the number of Groups and Subscriptions that are exactly one level underneath the current Group. */
  numberOfChildren?: number;
  /** Number of children is the number of Groups that are exactly one level underneath the current Group. */
  numberOfChildGroups?: number;
  /** The parent display name chain from the root group to the immediate parent */
  parentDisplayNameChain?: string[];
  /** The parent name chain from the root group to the immediate parent */
  parentNameChain?: string[];
}

export function entityInfoPropertiesDeserializer(item: any): EntityInfoProperties {
  return {
    tenantId: item["tenantId"],
    displayName: item["displayName"],
    parent: !item["parent"] ? item["parent"] : entityParentGroupInfoDeserializer(item["parent"]),
    permissions: item["permissions"],
    inheritedPermissions: item["inheritedPermissions"],
    numberOfDescendants: item["numberOfDescendants"],
    numberOfChildren: item["numberOfChildren"],
    numberOfChildGroups: item["numberOfChildGroups"],
    parentDisplayNameChain: !item["parentDisplayNameChain"]
      ? item["parentDisplayNameChain"]
      : item["parentDisplayNameChain"].map((p1: any) => {
          return p1;
        }),
    parentNameChain: !item["parentNameChain"]
      ? item["parentNameChain"]
      : item["parentNameChain"].map((p1: any) => {
          return p1;
        }),
  };
}

/** (Optional) The ID of the parent management group. */
export interface EntityParentGroupInfo {
  /** The fully qualified ID for the parent management group.  For example, /providers/Microsoft.Management/managementGroups/0000000-0000-0000-0000-000000000000 */
  id?: string;
}

export function entityParentGroupInfoDeserializer(item: any): EntityParentGroupInfo {
  return {
    id: item["id"],
  };
}

/** The users specific permissions to this item. */
export type Permissions = "noaccess" | "view" | "edit" | "delete";

/** Known values of {@link ManagementGroupExpandType} that the service accepts. */
export enum KnownManagementGroupExpandType {
  /** children */
  Children = "children",
  /** path */
  Path = "path",
  /** ancestors */
  Ancestors = "ancestors",
}

/** Type of ManagementGroupExpandType */
export type ManagementGroupExpandType = string;

/** Known values of {@link EntitySearchType} that the service accepts. */
export enum KnownEntitySearchType {
  /** AllowedParents */
  AllowedParents = "AllowedParents",
  /** AllowedChildren */
  AllowedChildren = "AllowedChildren",
  /** ParentAndFirstLevelChildren */
  ParentAndFirstLevelChildren = "ParentAndFirstLevelChildren",
  /** ParentOnly */
  ParentOnly = "ParentOnly",
  /** ChildrenOnly */
  ChildrenOnly = "ChildrenOnly",
}

/** Type of EntitySearchType */
export type EntitySearchType = string;

/** Known values of {@link EntityViewParameterType} that the service accepts. */
export enum KnownEntityViewParameterType {
  /** FullHierarchy */
  FullHierarchy = "FullHierarchy",
  /** GroupsOnly */
  GroupsOnly = "GroupsOnly",
  /** SubscriptionsOnly */
  SubscriptionsOnly = "SubscriptionsOnly",
  /** Audit */
  Audit = "Audit",
}

/** Type of EntityViewParameterType */
export type EntityViewParameterType = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-04-01 API version. */
  V20230401 = "2023-04-01",
}

export function _managementGroupPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    displayName: item["displayName"],
    details: !item["details"]
      ? item["details"]
      : managementGroupDetailsDeserializer(item["details"]),
    children: !item["children"]
      ? item["children"]
      : managementGroupChildInfoArrayDeserializer(item["children"]),
  };
}

export function _createManagementGroupRequestPropertiesSerializer(
  item: CreateManagementGroupRequest,
): any {
  return {
    displayName: item["displayName"],
    details: !item["details"]
      ? item["details"]
      : createManagementGroupDetailsSerializer(item["details"]),
  };
}

export function _azureAsyncOperationResultsPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    displayName: item["displayName"],
  };
}

export function _managementGroupInfoPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    displayName: item["displayName"],
  };
}

export function _hierarchySettingsInfoPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    requireAuthorizationForGroupCreation: item["requireAuthorizationForGroupCreation"],
    defaultManagementGroup: item["defaultManagementGroup"],
  };
}

export function _hierarchySettingsPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    requireAuthorizationForGroupCreation: item["requireAuthorizationForGroupCreation"],
    defaultManagementGroup: item["defaultManagementGroup"],
  };
}

export function _createOrUpdateSettingsRequestPropertiesSerializer(
  item: CreateOrUpdateSettingsRequest,
): any {
  return {
    requireAuthorizationForGroupCreation: item["requireAuthorizationForGroupCreation"],
    defaultManagementGroup: item["defaultManagementGroup"],
  };
}

export function _subscriptionUnderManagementGroupPropertiesDeserializer(item: any) {
  return {
    tenant: item["tenant"],
    displayName: item["displayName"],
    parent: !item["parent"]
      ? item["parent"]
      : descendantParentGroupInfoDeserializer(item["parent"]),
    state: item["state"],
  };
}
