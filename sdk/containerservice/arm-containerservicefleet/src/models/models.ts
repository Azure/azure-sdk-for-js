// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";
import type {
  ClusterResourcePlacementSpec,
  ClusterResourcePlacementSpecPatch,
} from "./placement/v1/models.js";
import {
  clusterResourcePlacementSpecSerializer,
  clusterResourcePlacementSpecDeserializer,
  clusterResourcePlacementSpecPatchSerializer,
} from "./placement/v1/models.js";
import { stringToUint8Array } from "@azure/core-util";

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

/** A cluster mesh profile stores the general information about the mesh. */
export interface ClusterMeshProfile extends ProxyResource {
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
  /** The provisioning state of the cluster mesh profile. */
  readonly provisioningState?: ClusterMeshProfileProvisioningState;
  /**
   * Select the members of the mesh.
   *   * Only key/value pairs with the `=` operator are accepted in the label selector.
   *   * If empty or not specified, no Fleet members will be selected to join the mesh.
   */
  memberSelector?: MemberSelector;
  /** The cluster mesh profile status. */
  readonly status?: ClusterMeshProfileStatus;
}

export function clusterMeshProfileSerializer(item: ClusterMeshProfile): any {
  return {
    properties: areAllPropsUndefined(item, ["memberSelector"])
      ? undefined
      : _clusterMeshProfilePropertiesSerializer(item),
  };
}

export function clusterMeshProfileDeserializer(item: any): ClusterMeshProfile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _clusterMeshProfilePropertiesDeserializer(item["properties"])),
    eTag: item["eTag"],
  };
}

/** A cluster mesh profile stores the general information about the mesh. */
export interface ClusterMeshProfileProperties {
  /** The provisioning state of the cluster mesh profile. */
  readonly provisioningState?: ClusterMeshProfileProvisioningState;
  /**
   * Select the members of the mesh.
   *   * Only key/value pairs with the `=` operator are accepted in the label selector.
   *   * If empty or not specified, no Fleet members will be selected to join the mesh.
   */
  memberSelector?: MemberSelector;
  /** The cluster mesh profile status. */
  readonly status?: ClusterMeshProfileStatus;
}

export function clusterMeshProfilePropertiesSerializer(item: ClusterMeshProfileProperties): any {
  return {
    memberSelector: !item["memberSelector"]
      ? item["memberSelector"]
      : memberSelectorSerializer(item["memberSelector"]),
  };
}

export function clusterMeshProfilePropertiesDeserializer(item: any): ClusterMeshProfileProperties {
  return {
    provisioningState: item["provisioningState"],
    memberSelector: !item["memberSelector"]
      ? item["memberSelector"]
      : memberSelectorDeserializer(item["memberSelector"]),
    status: !item["status"] ? item["status"] : clusterMeshProfileStatusDeserializer(item["status"]),
  };
}

/** The provisioning state of the cluster mesh profile resource. */
export enum KnownClusterMeshProfileProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the cluster mesh profile resource. \
 * {@link KnownClusterMeshProfileProvisioningState} can be used interchangeably with ClusterMeshProfileProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ClusterMeshProfileProvisioningState = string;

/** Select members of a fleet. */
export interface MemberSelector {
  /** Kubernetes-style label selector for selecting Fleet members, e.g. `env=production`. */
  byLabel: string;
}

export function memberSelectorSerializer(item: MemberSelector): any {
  return { byLabel: item["byLabel"] };
}

export function memberSelectorDeserializer(item: any): MemberSelector {
  return {
    byLabel: item["byLabel"],
  };
}

/** Status of the cluster mesh. */
export interface ClusterMeshProfileStatus {
  /** The state of the cluster mesh. */
  readonly state: ClusterMeshState;
  /** The last applied MemberSelector for the cluster mesh profile. */
  readonly lastAppliedMemberSelector?: MemberSelector;
  /** The last operation ID for the cluster mesh profile. */
  readonly lastOperationId?: string;
  /** The last operation error of the cluster mesh profile. */
  readonly lastOperationError?: ErrorDetail;
}

export function clusterMeshProfileStatusDeserializer(item: any): ClusterMeshProfileStatus {
  return {
    state: item["state"],
    lastAppliedMemberSelector: !item["lastAppliedMemberSelector"]
      ? item["lastAppliedMemberSelector"]
      : memberSelectorDeserializer(item["lastAppliedMemberSelector"]),
    lastOperationId: item["lastOperationId"],
    lastOperationError: !item["lastOperationError"]
      ? item["lastOperationError"]
      : errorDetailDeserializer(item["lastOperationError"]),
  };
}

/** Cluster mesh state. */
export enum KnownClusterMeshState {
  /** The mesh is not connected. */
  NotConnected = "NotConnected",
  /** The mesh is applying. */
  Applying = "Applying",
  /** The mesh is connected. */
  Connected = "Connected",
  /** The mesh is degraded. */
  Degraded = "Degraded",
  /** The mesh failed to connect. */
  Failed = "Failed",
}

/**
 * Cluster mesh state. \
 * {@link KnownClusterMeshState} can be used interchangeably with ClusterMeshState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotConnected**: The mesh is not connected. \
 * **Applying**: The mesh is applying. \
 * **Connected**: The mesh is connected. \
 * **Degraded**: The mesh is degraded. \
 * **Failed**: The mesh failed to connect.
 */
export type ClusterMeshState = string;

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

/** The response of a ClusterMeshProfile list operation. */
export interface _ClusterMeshProfileListResult {
  /** The ClusterMeshProfile items on this page */
  value: ClusterMeshProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterMeshProfileListResultDeserializer(
  item: any,
): _ClusterMeshProfileListResult {
  return {
    value: clusterMeshProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterMeshProfileArraySerializer(result: Array<ClusterMeshProfile>): any[] {
  return result.map((item) => {
    return clusterMeshProfileSerializer(item);
  });
}

export function clusterMeshProfileArrayDeserializer(result: Array<ClusterMeshProfile>): any[] {
  return result.map((item) => {
    return clusterMeshProfileDeserializer(item);
  });
}

/** The Fleet resource. */
export interface Fleet extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: FleetProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
  /** Managed identity. */
  identity?: ManagedServiceIdentity;
}

export function fleetSerializer(item: Fleet): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : fleetPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function fleetDeserializer(item: any): Fleet {
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
      : fleetPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Fleet properties. */
export interface FleetProperties {
  /** The status of the last operation. */
  readonly provisioningState?: FleetProvisioningState;
  /** The FleetHubProfile configures the Fleet's hub. */
  hubProfile?: FleetHubProfile;
  /** Status information for the fleet. */
  readonly status?: FleetStatus;
}

export function fleetPropertiesSerializer(item: FleetProperties): any {
  return {
    hubProfile: !item["hubProfile"]
      ? item["hubProfile"]
      : fleetHubProfileSerializer(item["hubProfile"]),
  };
}

export function fleetPropertiesDeserializer(item: any): FleetProperties {
  return {
    provisioningState: item["provisioningState"],
    hubProfile: !item["hubProfile"]
      ? item["hubProfile"]
      : fleetHubProfileDeserializer(item["hubProfile"]),
    status: !item["status"] ? item["status"] : fleetStatusDeserializer(item["status"]),
  };
}

/** The provisioning state of the last accepted operation. */
export enum KnownFleetProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The provisioning state of a fleet being created. */
  Creating = "Creating",
  /** The provisioning state of a fleet being updated. */
  Updating = "Updating",
  /** The provisioning state of a fleet being deleted. */
  Deleting = "Deleting",
}

/**
 * The provisioning state of the last accepted operation. \
 * {@link KnownFleetProvisioningState} can be used interchangeably with FleetProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: The provisioning state of a fleet being created. \
 * **Updating**: The provisioning state of a fleet being updated. \
 * **Deleting**: The provisioning state of a fleet being deleted.
 */
export type FleetProvisioningState = string;

/** The FleetHubProfile configures the fleet hub. */
export interface FleetHubProfile {
  /** DNS prefix used to create the FQDN for the Fleet hub. */
  dnsPrefix?: string;
  /** The access profile for the Fleet hub API server. */
  apiServerAccessProfile?: APIServerAccessProfile;
  /** The agent profile for the Fleet hub. */
  agentProfile?: AgentProfile;
  /** The FQDN of the Fleet hub. */
  readonly fqdn?: string;
  /** The Kubernetes version of the Fleet hub. */
  readonly kubernetesVersion?: string;
  /** The Azure Portal FQDN of the Fleet hub. */
  readonly portalFqdn?: string;
}

export function fleetHubProfileSerializer(item: FleetHubProfile): any {
  return {
    dnsPrefix: item["dnsPrefix"],
    apiServerAccessProfile: !item["apiServerAccessProfile"]
      ? item["apiServerAccessProfile"]
      : apiServerAccessProfileSerializer(item["apiServerAccessProfile"]),
    agentProfile: !item["agentProfile"]
      ? item["agentProfile"]
      : agentProfileSerializer(item["agentProfile"]),
  };
}

export function fleetHubProfileDeserializer(item: any): FleetHubProfile {
  return {
    dnsPrefix: item["dnsPrefix"],
    apiServerAccessProfile: !item["apiServerAccessProfile"]
      ? item["apiServerAccessProfile"]
      : apiServerAccessProfileDeserializer(item["apiServerAccessProfile"]),
    agentProfile: !item["agentProfile"]
      ? item["agentProfile"]
      : agentProfileDeserializer(item["agentProfile"]),
    fqdn: item["fqdn"],
    kubernetesVersion: item["kubernetesVersion"],
    portalFqdn: item["portalFqdn"],
  };
}

/** Access profile for the Fleet hub API server. */
export interface APIServerAccessProfile {
  /** Whether to create the Fleet hub as a private cluster or not. */
  enablePrivateCluster?: boolean;
  /** Whether to enable apiserver vnet integration for the Fleet hub or not. */
  enableVnetIntegration?: boolean;
  /** The subnet to be used when apiserver vnet integration is enabled. It is required when creating a new Fleet with BYO vnet. */
  subnetId?: string;
}

export function apiServerAccessProfileSerializer(item: APIServerAccessProfile): any {
  return {
    enablePrivateCluster: item["enablePrivateCluster"],
    enableVnetIntegration: item["enableVnetIntegration"],
    subnetId: item["subnetId"],
  };
}

export function apiServerAccessProfileDeserializer(item: any): APIServerAccessProfile {
  return {
    enablePrivateCluster: item["enablePrivateCluster"],
    enableVnetIntegration: item["enableVnetIntegration"],
    subnetId: item["subnetId"],
  };
}

/** Agent profile for the Fleet hub. */
export interface AgentProfile {
  /** The ID of the subnet which the Fleet hub node will join on startup. If this is not specified, a vnet and subnet will be generated and used. */
  subnetId?: string;
  /** The virtual machine size of the Fleet hub. */
  vmSize?: string;
}

export function agentProfileSerializer(item: AgentProfile): any {
  return { subnetId: item["subnetId"], vmSize: item["vmSize"] };
}

export function agentProfileDeserializer(item: any): AgentProfile {
  return {
    subnetId: item["subnetId"],
    vmSize: item["vmSize"],
  };
}

/** Status information for the fleet. */
export interface FleetStatus {
  /** The last operation ID for the fleet. */
  readonly lastOperationId?: string;
  /** The last operation error for the fleet. */
  readonly lastOperationError?: ErrorDetail;
}

export function fleetStatusDeserializer(item: any): FleetStatus {
  return {
    lastOperationId: item["lastOperationId"],
    lastOperationError: !item["lastOperationError"]
      ? item["lastOperationError"]
      : errorDetailDeserializer(item["lastOperationError"]),
  };
}

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
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
  SystemAndUserAssigned = "SystemAssigned, UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned, UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
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

/** Properties of a Fleet that can be patched. */
export interface FleetPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Managed identity. */
  identity?: ManagedServiceIdentity;
}

export function fleetPatchSerializer(item: FleetPatch): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** The response of a Fleet list operation. */
export interface _FleetListResult {
  /** The Fleet items on this page */
  value: Fleet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fleetListResultDeserializer(item: any): _FleetListResult {
  return {
    value: fleetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fleetArraySerializer(result: Array<Fleet>): any[] {
  return result.map((item) => {
    return fleetSerializer(item);
  });
}

export function fleetArrayDeserializer(result: Array<Fleet>): any[] {
  return result.map((item) => {
    return fleetDeserializer(item);
  });
}

/** The Credential results response. */
export interface FleetCredentialResults {
  /** Array of base64-encoded Kubernetes configuration files. */
  readonly kubeconfigs?: FleetCredentialResult[];
}

export function fleetCredentialResultsDeserializer(item: any): FleetCredentialResults {
  return {
    kubeconfigs: !item["kubeconfigs"]
      ? item["kubeconfigs"]
      : fleetCredentialResultArrayDeserializer(item["kubeconfigs"]),
  };
}

export function fleetCredentialResultArrayDeserializer(
  result: Array<FleetCredentialResult>,
): any[] {
  return result.map((item) => {
    return fleetCredentialResultDeserializer(item);
  });
}

/** One credential result item. */
export interface FleetCredentialResult {
  /** The name of the credential. */
  readonly name?: string;
  /** Base64-encoded Kubernetes configuration file. */
  readonly value?: Uint8Array;
}

export function fleetCredentialResultDeserializer(item: any): FleetCredentialResult {
  return {
    name: item["name"],
    value: !item["value"]
      ? item["value"]
      : typeof item["value"] === "string"
        ? stringToUint8Array(item["value"], "base64")
        : item["value"],
  };
}

/** A member of the Fleet. It contains a reference to an existing Kubernetes cluster on Azure. */
export interface FleetMember extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: FleetMemberProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function fleetMemberSerializer(item: FleetMember): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : fleetMemberPropertiesSerializer(item["properties"]),
  };
}

export function fleetMemberDeserializer(item: any): FleetMember {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : fleetMemberPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** A member of the Fleet. It contains a reference to an existing Kubernetes cluster on Azure. */
export interface FleetMemberProperties {
  /** The ARM resource id of the cluster that joins the Fleet. Must be a valid Azure resource id. e.g.: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{clusterName}'. */
  clusterResourceId: string;
  /** The group this member belongs to for multi-cluster update management. */
  group?: string;
  /** The status of the last operation. */
  readonly provisioningState?: FleetMemberProvisioningState;
  /** The labels for the fleet member. */
  labels?: Record<string, string>;
  /** Status information of the last operation for fleet member. */
  readonly status?: FleetMemberStatus;
  /** The Mesh Member Properties associated with this Fleet Member. */
  readonly meshProperties?: MeshProperties;
}

export function fleetMemberPropertiesSerializer(item: FleetMemberProperties): any {
  return {
    clusterResourceId: item["clusterResourceId"],
    group: item["group"],
    labels: item["labels"],
  };
}

export function fleetMemberPropertiesDeserializer(item: any): FleetMemberProperties {
  return {
    clusterResourceId: item["clusterResourceId"],
    group: item["group"],
    provisioningState: item["provisioningState"],
    labels: !item["labels"]
      ? item["labels"]
      : Object.fromEntries(Object.entries(item["labels"]).map(([k, p]: [string, any]) => [k, p])),
    status: !item["status"] ? item["status"] : fleetMemberStatusDeserializer(item["status"]),
    meshProperties: !item["meshProperties"]
      ? item["meshProperties"]
      : meshPropertiesDeserializer(item["meshProperties"]),
  };
}

/** The provisioning state of the last accepted operation. */
export enum KnownFleetMemberProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The provisioning state of a member joining a fleet. */
  Joining = "Joining",
  /** The provisioning state of a member leaving a fleet. */
  Leaving = "Leaving",
  /** The provisioning state of a member being updated. */
  Updating = "Updating",
}

/**
 * The provisioning state of the last accepted operation. \
 * {@link KnownFleetMemberProvisioningState} can be used interchangeably with FleetMemberProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Joining**: The provisioning state of a member joining a fleet. \
 * **Leaving**: The provisioning state of a member leaving a fleet. \
 * **Updating**: The provisioning state of a member being updated.
 */
export type FleetMemberProvisioningState = string;

/** Status information for the fleet member */
export interface FleetMemberStatus {
  /** The last operation ID for the fleet member */
  readonly lastOperationId?: string;
  /** The last operation error of the fleet member */
  readonly lastOperationError?: ErrorDetail;
}

export function fleetMemberStatusDeserializer(item: any): FleetMemberStatus {
  return {
    lastOperationId: item["lastOperationId"],
    lastOperationError: !item["lastOperationError"]
      ? item["lastOperationError"]
      : errorDetailDeserializer(item["lastOperationError"]),
  };
}

/** The Mesh Member data for a Fleet Member resource. */
export interface MeshProperties {
  /** The Cilium cluster properties. */
  readonly ciliumProperties: CiliumProperties;
  /** The status of the mesh member. */
  readonly status: MeshMemberStatus;
  /** Resource id of the cluster mesh profile associated with this mesh member. */
  readonly clusterMeshProfileResourceId: string;
}

export function meshPropertiesDeserializer(item: any): MeshProperties {
  return {
    ciliumProperties: ciliumPropertiesDeserializer(item["ciliumProperties"]),
    status: meshMemberStatusDeserializer(item["status"]),
    clusterMeshProfileResourceId: item["clusterMeshProfileResourceId"],
  };
}

/** The Cilium specific properties of the member cluster. */
export interface CiliumProperties {
  /** Cilium requires each cluster to be assigned a unique numeric cluster id from 1 - 255. The id is managed by Fleet and cannot be set by the user. */
  readonly id: number;
  /** Cilium requires each cluster to be assigned a unique human-readable name. The name is managed by Fleet, based on the Fleet Member name, and cannot be set by the user. */
  readonly name: string;
}

export function ciliumPropertiesDeserializer(item: any): CiliumProperties {
  return {
    id: item["id"],
    name: item["name"],
  };
}

/** Status of the mesh member. */
export interface MeshMemberStatus {
  /** The mesh member state. */
  readonly state: MeshMemberState;
  /** When the status was last updated. */
  readonly lastUpdatedAt?: Date;
  /** The last operation ID that affected the mesh properties of the fleet member. */
  readonly lastOperationId?: string;
  /** The error affecting this member. */
  readonly error?: ErrorDetail;
}

export function meshMemberStatusDeserializer(item: any): MeshMemberStatus {
  return {
    state: item["state"],
    lastUpdatedAt: !item["lastUpdatedAt"] ? item["lastUpdatedAt"] : new Date(item["lastUpdatedAt"]),
    lastOperationId: item["lastOperationId"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Mesh member state. */
export enum KnownMeshMemberState {
  /** The member is connecting to the mesh. */
  Connecting = "Connecting",
  /** The member is connected to the mesh. */
  Connected = "Connected",
  /** The member is disconnecting from the mesh. */
  Disconnecting = "Disconnecting",
  /** The member failed to connect due to an error. */
  Failed = "Failed",
}

/**
 * Mesh member state. \
 * {@link KnownMeshMemberState} can be used interchangeably with MeshMemberState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connecting**: The member is connecting to the mesh. \
 * **Connected**: The member is connected to the mesh. \
 * **Disconnecting**: The member is disconnecting from the mesh. \
 * **Failed**: The member failed to connect due to an error.
 */
export type MeshMemberState = string;

/** The type used for update operations of the FleetMember. */
export interface FleetMemberUpdate {
  /** The resource-specific properties for this resource. */
  properties?: FleetMemberUpdateProperties;
}

export function fleetMemberUpdateSerializer(item: FleetMemberUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : fleetMemberUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the FleetMember. */
export interface FleetMemberUpdateProperties {
  /** The group this member belongs to for multi-cluster update management. */
  group?: string;
  /** The labels for the fleet member. */
  labels?: Record<string, string>;
}

export function fleetMemberUpdatePropertiesSerializer(item: FleetMemberUpdateProperties): any {
  return { group: item["group"], labels: item["labels"] };
}

/** The response of a FleetMember list operation. */
export interface _FleetMemberListResult {
  /** The FleetMember items on this page */
  value: FleetMember[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fleetMemberListResultDeserializer(item: any): _FleetMemberListResult {
  return {
    value: fleetMemberArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fleetMemberArraySerializer(result: Array<FleetMember>): any[] {
  return result.map((item) => {
    return fleetMemberSerializer(item);
  });
}

export function fleetMemberArrayDeserializer(result: Array<FleetMember>): any[] {
  return result.map((item) => {
    return fleetMemberDeserializer(item);
  });
}

/** A fleet managed namespace. */
export interface FleetManagedNamespace extends TrackedResource {
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
  /** The status of the last operation. */
  readonly provisioningState?: FleetManagedNamespaceProvisioningState;
  /** The namespace properties for the fleet managed namespace. */
  managedNamespaceProperties?: ManagedNamespaceProperties;
  /** Action if the managed namespace with the same name already exists. Default is Never. */
  adoptionPolicy?: AdoptionPolicy;
  /** Delete options of a fleet managed namespace. Default is Keep. */
  deletePolicy?: DeletePolicy;
  /** The profile of the propagation to create the namespace. */
  propagationPolicy?: PropagationPolicy;
  /** Status information of the last operation for fleet managed namespace. */
  readonly status?: FleetManagedNamespaceStatus;
  /** The Azure Portal FQDN of the Fleet hub. */
  readonly portalFqdn?: string;
}

export function fleetManagedNamespaceSerializer(item: FleetManagedNamespace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "managedNamespaceProperties",
      "adoptionPolicy",
      "deletePolicy",
      "propagationPolicy",
    ])
      ? undefined
      : _fleetManagedNamespacePropertiesSerializer(item),
  };
}

export function fleetManagedNamespaceDeserializer(item: any): FleetManagedNamespace {
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
    ...(!item["properties"]
      ? item["properties"]
      : _fleetManagedNamespacePropertiesDeserializer(item["properties"])),
    eTag: item["eTag"],
  };
}

/** The properties of a fleet managed namespace. */
export interface FleetManagedNamespaceProperties {
  /** The status of the last operation. */
  readonly provisioningState?: FleetManagedNamespaceProvisioningState;
  /** The namespace properties for the fleet managed namespace. */
  managedNamespaceProperties?: ManagedNamespaceProperties;
  /** Action if the managed namespace with the same name already exists. Default is Never. */
  adoptionPolicy: AdoptionPolicy;
  /** Delete options of a fleet managed namespace. Default is Keep. */
  deletePolicy: DeletePolicy;
  /** The profile of the propagation to create the namespace. */
  propagationPolicy?: PropagationPolicy;
  /** Status information of the last operation for fleet managed namespace. */
  readonly status?: FleetManagedNamespaceStatus;
  /** The Azure Portal FQDN of the Fleet hub. */
  readonly portalFqdn?: string;
}

export function fleetManagedNamespacePropertiesSerializer(
  item: FleetManagedNamespaceProperties,
): any {
  return {
    managedNamespaceProperties: !item["managedNamespaceProperties"]
      ? item["managedNamespaceProperties"]
      : managedNamespacePropertiesSerializer(item["managedNamespaceProperties"]),
    adoptionPolicy: item["adoptionPolicy"],
    deletePolicy: item["deletePolicy"],
    propagationPolicy: !item["propagationPolicy"]
      ? item["propagationPolicy"]
      : propagationPolicySerializer(item["propagationPolicy"]),
  };
}

export function fleetManagedNamespacePropertiesDeserializer(
  item: any,
): FleetManagedNamespaceProperties {
  return {
    provisioningState: item["provisioningState"],
    managedNamespaceProperties: !item["managedNamespaceProperties"]
      ? item["managedNamespaceProperties"]
      : managedNamespacePropertiesDeserializer(item["managedNamespaceProperties"]),
    adoptionPolicy: item["adoptionPolicy"],
    deletePolicy: item["deletePolicy"],
    propagationPolicy: !item["propagationPolicy"]
      ? item["propagationPolicy"]
      : propagationPolicyDeserializer(item["propagationPolicy"]),
    status: !item["status"]
      ? item["status"]
      : fleetManagedNamespaceStatusDeserializer(item["status"]),
    portalFqdn: item["portalFqdn"],
  };
}

/** The provisioning state of the fleet managed namespace resource */
export enum KnownFleetManagedNamespaceProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The provisioning state of a fleet managed namespace being created. */
  Creating = "Creating",
  /** The provisioning state of a fleet managed namespace being updated. */
  Updating = "Updating",
  /** The provisioning state of a fleet managed namespace being deleted. */
  Deleting = "Deleting",
}

/**
 * The provisioning state of the fleet managed namespace resource \
 * {@link KnownFleetManagedNamespaceProvisioningState} can be used interchangeably with FleetManagedNamespaceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: The provisioning state of a fleet managed namespace being created. \
 * **Updating**: The provisioning state of a fleet managed namespace being updated. \
 * **Deleting**: The provisioning state of a fleet managed namespace being deleted.
 */
export type FleetManagedNamespaceProvisioningState = string;

/** The namespace properties for the fleet managed namespace. */
export interface ManagedNamespaceProperties {
  /** The labels for the fleet managed namespace. */
  labels?: Record<string, string>;
  /** The annotations for the fleet managed namespace. */
  annotations?: Record<string, string>;
  /** The default resource quota for the fleet managed namespace. */
  defaultResourceQuota?: ResourceQuota;
  /** The default network policy for the fleet managed namespace. */
  defaultNetworkPolicy?: NetworkPolicy;
}

export function managedNamespacePropertiesSerializer(item: ManagedNamespaceProperties): any {
  return {
    labels: item["labels"],
    annotations: item["annotations"],
    defaultResourceQuota: !item["defaultResourceQuota"]
      ? item["defaultResourceQuota"]
      : resourceQuotaSerializer(item["defaultResourceQuota"]),
    defaultNetworkPolicy: !item["defaultNetworkPolicy"]
      ? item["defaultNetworkPolicy"]
      : networkPolicySerializer(item["defaultNetworkPolicy"]),
  };
}

export function managedNamespacePropertiesDeserializer(item: any): ManagedNamespaceProperties {
  return {
    labels: !item["labels"]
      ? item["labels"]
      : Object.fromEntries(Object.entries(item["labels"]).map(([k, p]: [string, any]) => [k, p])),
    annotations: !item["annotations"]
      ? item["annotations"]
      : Object.fromEntries(
          Object.entries(item["annotations"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    defaultResourceQuota: !item["defaultResourceQuota"]
      ? item["defaultResourceQuota"]
      : resourceQuotaDeserializer(item["defaultResourceQuota"]),
    defaultNetworkPolicy: !item["defaultNetworkPolicy"]
      ? item["defaultNetworkPolicy"]
      : networkPolicyDeserializer(item["defaultNetworkPolicy"]),
  };
}

/** The resource quota for the managed namespace. */
export interface ResourceQuota {
  /** The CPU request for the managed namespace. See more at https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu */
  cpuRequest?: string;
  /** The CPU limit for the managed namespace. See more at https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu */
  cpuLimit?: string;
  /** The memory request for the managed namespace. See more at https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory */
  memoryRequest?: string;
  /** The memory limit for the managed namespace. See more at https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory */
  memoryLimit?: string;
}

export function resourceQuotaSerializer(item: ResourceQuota): any {
  return {
    cpuRequest: item["cpuRequest"],
    cpuLimit: item["cpuLimit"],
    memoryRequest: item["memoryRequest"],
    memoryLimit: item["memoryLimit"],
  };
}

export function resourceQuotaDeserializer(item: any): ResourceQuota {
  return {
    cpuRequest: item["cpuRequest"],
    cpuLimit: item["cpuLimit"],
    memoryRequest: item["memoryRequest"],
    memoryLimit: item["memoryLimit"],
  };
}

/** The network policy for the managed namespace. */
export interface NetworkPolicy {
  /** The ingress policy for the managed namespace. */
  ingress?: PolicyRule;
  /** The egress policy for the managed namespace. */
  egress?: PolicyRule;
}

export function networkPolicySerializer(item: NetworkPolicy): any {
  return { ingress: item["ingress"], egress: item["egress"] };
}

export function networkPolicyDeserializer(item: any): NetworkPolicy {
  return {
    ingress: item["ingress"],
    egress: item["egress"],
  };
}

/** The possible values representing different network policy rules. */
export enum KnownPolicyRule {
  /** Allow all network traffic. */
  AllowAll = "AllowAll",
  /** Deny all network traffic. */
  DenyAll = "DenyAll",
  /** Allow traffic within the same namespace. */
  AllowSameNamespace = "AllowSameNamespace",
}

/**
 * The possible values representing different network policy rules. \
 * {@link KnownPolicyRule} can be used interchangeably with PolicyRule,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllowAll**: Allow all network traffic. \
 * **DenyAll**: Deny all network traffic. \
 * **AllowSameNamespace**: Allow traffic within the same namespace.
 */
export type PolicyRule = string;

/** Action if the Namespace with the same name already exists. */
export enum KnownAdoptionPolicy {
  /** If the Namespace already exists, do not take over the existing Namespace to be managed by ARM. */
  Never = "Never",
  /** If there is an identical Namespace, take over the existing Namespace to be managed by ARM. */
  IfIdentical = "IfIdentical",
  /** Always take over the existing Namespace to be managed by ARM, even if it is not identical. */
  Always = "Always",
}

/**
 * Action if the Namespace with the same name already exists. \
 * {@link KnownAdoptionPolicy} can be used interchangeably with AdoptionPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Never**: If the Namespace already exists, do not take over the existing Namespace to be managed by ARM. \
 * **IfIdentical**: If there is an identical Namespace, take over the existing Namespace to be managed by ARM. \
 * **Always**: Always take over the existing Namespace to be managed by ARM, even if it is not identical.
 */
export type AdoptionPolicy = string;

/** Delete options for the ARM managed namespace. */
export enum KnownDeletePolicy {
  /** Delete the ARM resource but keep the Namespace. */
  Keep = "Keep",
  /** Delete both ARM resource and Namespace. */
  Delete = "Delete",
}

/**
 * Delete options for the ARM managed namespace. \
 * {@link KnownDeletePolicy} can be used interchangeably with DeletePolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Keep**: Delete the ARM resource but keep the Namespace. \
 * **Delete**: Delete both ARM resource and Namespace.
 */
export type DeletePolicy = string;

/** The propagation to be used for provisioning the namespace among the fleet. */
export interface PropagationPolicy {
  /** The type of the policy to be used. Default is Placement. */
  type: PropagationType;
  /** The profile to be used for propagation via placement. */
  placementProfile?: PlacementProfile;
}

export function propagationPolicySerializer(item: PropagationPolicy): any {
  return {
    type: item["type"],
    placementProfile: !item["placementProfile"]
      ? item["placementProfile"]
      : placementProfileSerializer(item["placementProfile"]),
  };
}

export function propagationPolicyDeserializer(item: any): PropagationPolicy {
  return {
    type: item["type"],
    placementProfile: !item["placementProfile"]
      ? item["placementProfile"]
      : placementProfileDeserializer(item["placementProfile"]),
  };
}

/** How the namespace will be provisioned among the fleet members. */
export enum KnownPropagationType {
  /** Using ClusterResourcePlacement. */
  Placement = "Placement",
}

/**
 * How the namespace will be provisioned among the fleet members. \
 * {@link KnownPropagationType} can be used interchangeably with PropagationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Placement**: Using ClusterResourcePlacement.
 */
export type PropagationType = string;

/** The configuration profile for default ClusterResourcePlacement for placement. */
export interface PlacementProfile {
  /** The default ClusterResourcePlacement policy configuration. */
  defaultClusterResourcePlacement?: ClusterResourcePlacementSpec;
}

export function placementProfileSerializer(item: PlacementProfile): any {
  return {
    defaultClusterResourcePlacement: !item["defaultClusterResourcePlacement"]
      ? item["defaultClusterResourcePlacement"]
      : clusterResourcePlacementSpecSerializer(item["defaultClusterResourcePlacement"]),
  };
}

export function placementProfileDeserializer(item: any): PlacementProfile {
  return {
    defaultClusterResourcePlacement: !item["defaultClusterResourcePlacement"]
      ? item["defaultClusterResourcePlacement"]
      : clusterResourcePlacementSpecDeserializer(item["defaultClusterResourcePlacement"]),
  };
}

/** Status information for the fleet managed namespace. */
export interface FleetManagedNamespaceStatus {
  /** The last operation ID for the fleet managed namespace */
  readonly lastOperationId?: string;
  /** The last operation error of the fleet managed namespace */
  readonly lastOperationError?: ErrorDetail;
}

export function fleetManagedNamespaceStatusDeserializer(item: any): FleetManagedNamespaceStatus {
  return {
    lastOperationId: item["lastOperationId"],
    lastOperationError: !item["lastOperationError"]
      ? item["lastOperationError"]
      : errorDetailDeserializer(item["lastOperationError"]),
  };
}

/** The response of a FleetManagedNamespace list operation. */
export interface _FleetManagedNamespaceListResult {
  /** The FleetManagedNamespace items on this page */
  value: FleetManagedNamespace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fleetManagedNamespaceListResultDeserializer(
  item: any,
): _FleetManagedNamespaceListResult {
  return {
    value: fleetManagedNamespaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fleetManagedNamespaceArraySerializer(result: Array<FleetManagedNamespace>): any[] {
  return result.map((item) => {
    return fleetManagedNamespaceSerializer(item);
  });
}

export function fleetManagedNamespaceArrayDeserializer(
  result: Array<FleetManagedNamespace>,
): any[] {
  return result.map((item) => {
    return fleetManagedNamespaceDeserializer(item);
  });
}

/** The properties of a fleet managed namespace that can be patched. */
export interface FleetManagedNamespacePatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The updatable properties of the fleet managed namespace. */
  properties?: FleetManagedNamespacePropertiesPatch;
}

export function fleetManagedNamespacePatchSerializer(item: FleetManagedNamespacePatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : fleetManagedNamespacePropertiesPatchSerializer(item["properties"]),
  };
}

/** The properties of a fleet managed namespace that can be patched. */
export interface FleetManagedNamespacePropertiesPatch {
  /** The namespace properties for the fleet managed namespace. */
  managedNamespaceProperties?: ManagedNamespaceProperties;
  /** Action if the managed namespace with the same name already exists. */
  adoptionPolicy?: AdoptionPolicy;
  /** Delete options of a fleet managed namespace. */
  deletePolicy?: DeletePolicy;
  /** The profile of the propagation to create the namespace. */
  propagationPolicy?: PropagationPolicyPatch;
}

export function fleetManagedNamespacePropertiesPatchSerializer(
  item: FleetManagedNamespacePropertiesPatch,
): any {
  return {
    managedNamespaceProperties: !item["managedNamespaceProperties"]
      ? item["managedNamespaceProperties"]
      : managedNamespacePropertiesSerializer(item["managedNamespaceProperties"]),
    adoptionPolicy: item["adoptionPolicy"],
    deletePolicy: item["deletePolicy"],
    propagationPolicy: !item["propagationPolicy"]
      ? item["propagationPolicy"]
      : propagationPolicyPatchSerializer(item["propagationPolicy"]),
  };
}

/** The propagation settings that can be patched. */
export interface PropagationPolicyPatch {
  /** The type of the policy to be used. */
  type?: PropagationType;
  /** The placement profile that can be patched. */
  placementProfile?: PlacementProfilePatch;
}

export function propagationPolicyPatchSerializer(item: PropagationPolicyPatch): any {
  return {
    type: item["type"],
    placementProfile: !item["placementProfile"]
      ? item["placementProfile"]
      : placementProfilePatchSerializer(item["placementProfile"]),
  };
}

/** The placement profile settings that can be patched. */
export interface PlacementProfilePatch {
  /** The default ClusterResourcePlacement policy configuration that can be patched. */
  defaultClusterResourcePlacement?: ClusterResourcePlacementSpecPatch;
}

export function placementProfilePatchSerializer(item: PlacementProfilePatch): any {
  return {
    defaultClusterResourcePlacement: !item["defaultClusterResourcePlacement"]
      ? item["defaultClusterResourcePlacement"]
      : clusterResourcePlacementSpecPatchSerializer(item["defaultClusterResourcePlacement"]),
  };
}

/** A Gate controls the progression during a staged rollout, e.g. in an Update Run. */
export interface Gate extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: GateProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function gateDeserializer(item: any): Gate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : gatePropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** A Gate controls the progression during a staged rollout, e.g. in an Update Run. */
export interface GateProperties {
  /** The provisioning state of the Gate resource. */
  readonly provisioningState?: GateProvisioningState;
  /** The human-readable display name of the Gate. */
  displayName?: string;
  /** The type of the Gate determines how it is completed. */
  gateType: GateType;
  /** Details for ScheduledStart gate */
  scheduledStartProperties?: ScheduledStartProperties;
  /** The target that the Gate is controlling, e.g. an Update Run. */
  target: GateTarget;
  /** The state of the Gate. */
  state: GateState;
}

export function gatePropertiesDeserializer(item: any): GateProperties {
  return {
    provisioningState: item["provisioningState"],
    displayName: item["displayName"],
    gateType: item["gateType"],
    scheduledStartProperties: !item["scheduledStartProperties"]
      ? item["scheduledStartProperties"]
      : scheduledStartPropertiesDeserializer(item["scheduledStartProperties"]),
    target: gateTargetDeserializer(item["target"]),
    state: item["state"],
  };
}

/** The provisioning state of the Gate resource. */
export enum KnownGateProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the Gate resource. \
 * {@link KnownGateProvisioningState} can be used interchangeably with GateProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type GateProvisioningState = string;

/** The type of the Gate determines how it is completed. */
export enum KnownGateType {
  /** An approval gate is completed by setting its state to be Completed. */
  Approval = "Approval",
  /** A scheduled start gate is automatically completed when the scheduled time is reached. */
  ScheduledStart = "ScheduledStart",
}

/**
 * The type of the Gate determines how it is completed. \
 * {@link KnownGateType} can be used interchangeably with GateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Approval**: An approval gate is completed by setting its state to be Completed. \
 * **ScheduledStart**: A scheduled start gate is automatically completed when the scheduled time is reached.
 */
export type GateType = string;

/** Properties for ScheduledStart gate */
export interface ScheduledStartProperties {
  /** The day of the week when the scheduled start occurs. */
  startDay: DayOfWeek;
  /** The local time of day when the scheduled start occurs in 24-hour (HH:mm) format. */
  startTime: string;
  /** The UTC offset for the scheduled time in HH:mm format, -14:00 to +14:00 */
  utcOffset: string;
  /** The absolute UTC time when the gate will complete. Set when the gate is created. */
  readonly absoluteStartTime?: Date;
}

export function scheduledStartPropertiesDeserializer(item: any): ScheduledStartProperties {
  return {
    startDay: item["startDay"],
    startTime: item["startTime"],
    utcOffset: item["utcOffset"],
    absoluteStartTime: !item["absoluteStartTime"]
      ? item["absoluteStartTime"]
      : new Date(item["absoluteStartTime"]),
  };
}

/** The days of a week. */
export enum KnownDayOfWeek {
  /** The day Monday. */
  Monday = "Monday",
  /** The day Tuesday. */
  Tuesday = "Tuesday",
  /** The day Wednesday. */
  Wednesday = "Wednesday",
  /** The day Thursday. */
  Thursday = "Thursday",
  /** The day Friday. */
  Friday = "Friday",
  /** The day Saturday. */
  Saturday = "Saturday",
  /** The day Sunday. */
  Sunday = "Sunday",
}

/**
 * The days of a week. \
 * {@link KnownDayOfWeek} can be used interchangeably with DayOfWeek,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Monday**: The day Monday. \
 * **Tuesday**: The day Tuesday. \
 * **Wednesday**: The day Wednesday. \
 * **Thursday**: The day Thursday. \
 * **Friday**: The day Friday. \
 * **Saturday**: The day Saturday. \
 * **Sunday**: The day Sunday.
 */
export type DayOfWeek = string;

/** The target that the Gate is controlling, e.g. an Update Run. Exactly one of the properties objects will be set. */
export interface GateTarget {
  /** The resource id that the Gate is controlling the rollout of. */
  id: string;
  /** The properties of the Update Run that the Gate is targeting. */
  updateRunProperties?: UpdateRunGateTargetProperties;
}

export function gateTargetDeserializer(item: any): GateTarget {
  return {
    id: item["id"],
    updateRunProperties: !item["updateRunProperties"]
      ? item["updateRunProperties"]
      : updateRunGateTargetPropertiesDeserializer(item["updateRunProperties"]),
  };
}

/** The properties of the Update Run that the Gate is targeting. */
export interface UpdateRunGateTargetProperties {
  /** The name of the Update Run. */
  readonly name: string;
  /** The Update Stage of the Update Run. */
  readonly stage?: string;
  /** The Update Group of the Update Run. */
  readonly group?: string;
  /** Whether the Gate is placed before or after the update itself. */
  timing: Timing;
}

export function updateRunGateTargetPropertiesDeserializer(
  item: any,
): UpdateRunGateTargetProperties {
  return {
    name: item["name"],
    stage: item["stage"],
    group: item["group"],
    timing: item["timing"],
  };
}

/** Whether the Gate is placed before or after the target. */
export enum KnownTiming {
  /** The Gate is before the target. */
  Before = "Before",
  /** The Gate is after the target. */
  After = "After",
}

/**
 * Whether the Gate is placed before or after the target. \
 * {@link KnownTiming} can be used interchangeably with Timing,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Before**: The Gate is before the target. \
 * **After**: The Gate is after the target.
 */
export type Timing = string;

/** The state of the Gate. */
export enum KnownGateState {
  /** A Pending Gate will continue to block the staged rollout process it is controlling. */
  Pending = "Pending",
  /** A Skipped Gate means that the staged rollout process it is controlling was skipped. */
  Skipped = "Skipped",
  /** An Completed Gate allows the staged rollout process to continue. */
  Completed = "Completed",
}

/**
 * The state of the Gate. \
 * {@link KnownGateState} can be used interchangeably with GateState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: A Pending Gate will continue to block the staged rollout process it is controlling. \
 * **Skipped**: A Skipped Gate means that the staged rollout process it is controlling was skipped. \
 * **Completed**: An Completed Gate allows the staged rollout process to continue.
 */
export type GateState = string;

/** Patch a Gate resource. */
export interface GatePatch {
  /** Properties of a Gate that can be patched. */
  properties: GatePatchProperties;
}

export function gatePatchSerializer(item: GatePatch): any {
  return { properties: gatePatchPropertiesSerializer(item["properties"]) };
}

/** Properties of a Gate that can be patched. */
export interface GatePatchProperties {
  /** The state of the Gate. */
  state: GateState;
}

export function gatePatchPropertiesSerializer(item: GatePatchProperties): any {
  return { state: item["state"] };
}

/** The response of a Gate list operation. */
export interface _GateListResult {
  /** The Gate items on this page */
  value: Gate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _gateListResultDeserializer(item: any): _GateListResult {
  return {
    value: gateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function gateArrayDeserializer(result: Array<Gate>): any[] {
  return result.map((item) => {
    return gateDeserializer(item);
  });
}

/** A multi-stage process to perform update operations across members of a Fleet. */
export interface UpdateRun extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: UpdateRunProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function updateRunSerializer(item: UpdateRun): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : updateRunPropertiesSerializer(item["properties"]),
  };
}

export function updateRunDeserializer(item: any): UpdateRun {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : updateRunPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** The properties of the UpdateRun. */
export interface UpdateRunProperties {
  /** The provisioning state of the UpdateRun resource. */
  readonly provisioningState?: UpdateRunProvisioningState;
  /**
   * The resource id of the FleetUpdateStrategy resource to reference.
   *
   * When creating a new run, there are three ways to define a strategy for the run:
   * 1. Define a new strategy in place: Set the "strategy" field.
   * 2. Use an existing strategy: Set the "updateStrategyId" field. (since 2023-08-15-preview)
   * 3. Use the default strategy to update all the members one by one: Leave both "updateStrategyId" and "strategy" unset. (since 2023-08-15-preview)
   *
   * Setting both "updateStrategyId" and "strategy" is invalid.
   *
   * UpdateRuns created by "updateStrategyId" snapshot the referenced UpdateStrategy at the time of creation and store it in the "strategy" field.
   * Subsequent changes to the referenced FleetUpdateStrategy resource do not propagate.
   * UpdateRunStrategy changes can be made directly on the "strategy" field before launching the UpdateRun.
   */
  updateStrategyId?: string;
  /**
   * The strategy defines the order in which the clusters will be updated.
   * If not set, all members will be updated sequentially. The UpdateRun status will show a single UpdateStage and a single UpdateGroup targeting all members.
   * The strategy of the UpdateRun can be modified until the run is started.
   */
  strategy?: UpdateRunStrategy;
  /** The update to be applied to all clusters in the UpdateRun. The managedClusterUpdate can be modified until the run is started. */
  managedClusterUpdate: ManagedClusterUpdate;
  /** The status of the UpdateRun. */
  readonly status?: UpdateRunStatus;
  /** AutoUpgradeProfileId is the id of an auto upgrade profile resource. */
  readonly autoUpgradeProfileId?: string;
}

export function updateRunPropertiesSerializer(item: UpdateRunProperties): any {
  return {
    updateStrategyId: item["updateStrategyId"],
    strategy: !item["strategy"] ? item["strategy"] : updateRunStrategySerializer(item["strategy"]),
    managedClusterUpdate: managedClusterUpdateSerializer(item["managedClusterUpdate"]),
  };
}

export function updateRunPropertiesDeserializer(item: any): UpdateRunProperties {
  return {
    provisioningState: item["provisioningState"],
    updateStrategyId: item["updateStrategyId"],
    strategy: !item["strategy"]
      ? item["strategy"]
      : updateRunStrategyDeserializer(item["strategy"]),
    managedClusterUpdate: managedClusterUpdateDeserializer(item["managedClusterUpdate"]),
    status: !item["status"] ? item["status"] : updateRunStatusDeserializer(item["status"]),
    autoUpgradeProfileId: item["autoUpgradeProfileId"],
  };
}

/** The provisioning state of the UpdateRun resource. */
export enum KnownUpdateRunProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the UpdateRun resource. \
 * {@link KnownUpdateRunProvisioningState} can be used interchangeably with UpdateRunProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type UpdateRunProvisioningState = string;

/**
 * Defines the update sequence of the clusters via stages and groups.
 *
 * Stages within a run are executed sequentially one after another.
 * Groups within a stage are executed in parallel.
 * Member clusters within a group are updated sequentially one after another.
 *
 * A valid strategy contains no duplicate groups within or across stages.
 */
export interface UpdateRunStrategy {
  /** The list of stages that compose this update run. Min size: 1. */
  stages: UpdateStage[];
}

export function updateRunStrategySerializer(item: UpdateRunStrategy): any {
  return { stages: updateStageArraySerializer(item["stages"]) };
}

export function updateRunStrategyDeserializer(item: any): UpdateRunStrategy {
  return {
    stages: updateStageArrayDeserializer(item["stages"]),
  };
}

export function updateStageArraySerializer(result: Array<UpdateStage>): any[] {
  return result.map((item) => {
    return updateStageSerializer(item);
  });
}

export function updateStageArrayDeserializer(result: Array<UpdateStage>): any[] {
  return result.map((item) => {
    return updateStageDeserializer(item);
  });
}

/** Defines a stage which contains the groups to update and the steps to take (e.g., wait for a time period) before starting the next stage. */
export interface UpdateStage {
  /** The name of the stage. Must be unique within the UpdateRun. */
  name: string;
  /** Defines the groups to be executed in parallel in this stage. Duplicate groups are not allowed. Min size: 1. */
  groups?: UpdateGroup[];
  /**
   * Select the members of the stage.
   *   * If specified without UpdateGroup, one implicit group containing the selected members will be created.
   *   * If specified with UpdateGroup, members will be pre-filtered before group-level selection logic is applied.
   *   * If not specified, group-level selection logic will be used.
   */
  memberSelector?: MemberSelector;
  /** The time in seconds to wait at the end of this stage before starting the next one. Defaults to 0 seconds if unspecified. */
  afterStageWaitInSeconds?: number;
  /**
   * The max number of upgrades that can run concurrently across all groups in this stage.
   * Acts as a ceiling (and not a quota) for the number of concurrent upgrades within the stage you want to tolerate at a time.
   * Actual concurrency may be lower depending on group-level concurrency limits or individual member conditions.
   * Stage maxConcurrency has a min value of "1".
   * Accepts either:
   *     • A fixed count, e.g., "3"
   *     • A percentage, e.g., "25%" (range 1–100). Percentage is of the total number of clusters across all groups in the stage.
   *       Fractional results are rounded down. A minimum of 1 upgrade is enforced.
   * Examples:
   *     • "3"     --> up to 3 clusters from this stage upgrade at once (across all groups).
   *     • "100%"  --> “all at once”; up to all clusters in this stage upgrade at the same time.
   *     • "25%"   --> up to 25% of the stage’s total clusters upgrade at the same time.
   */
  maxConcurrency?: string;
  /** A list of Gates that will be created before this Stage is executed. */
  beforeGates?: GateConfiguration[];
  /** A list of Gates that will be created after this Stage is executed. */
  afterGates?: GateConfiguration[];
}

export function updateStageSerializer(item: UpdateStage): any {
  return {
    name: item["name"],
    groups: !item["groups"] ? item["groups"] : updateGroupArraySerializer(item["groups"]),
    memberSelector: !item["memberSelector"]
      ? item["memberSelector"]
      : memberSelectorSerializer(item["memberSelector"]),
    afterStageWaitInSeconds: item["afterStageWaitInSeconds"],
    maxConcurrency: item["maxConcurrency"],
    beforeGates: !item["beforeGates"]
      ? item["beforeGates"]
      : gateConfigurationArraySerializer(item["beforeGates"]),
    afterGates: !item["afterGates"]
      ? item["afterGates"]
      : gateConfigurationArraySerializer(item["afterGates"]),
  };
}

export function updateStageDeserializer(item: any): UpdateStage {
  return {
    name: item["name"],
    groups: !item["groups"] ? item["groups"] : updateGroupArrayDeserializer(item["groups"]),
    memberSelector: !item["memberSelector"]
      ? item["memberSelector"]
      : memberSelectorDeserializer(item["memberSelector"]),
    afterStageWaitInSeconds: item["afterStageWaitInSeconds"],
    maxConcurrency: item["maxConcurrency"],
    beforeGates: !item["beforeGates"]
      ? item["beforeGates"]
      : gateConfigurationArrayDeserializer(item["beforeGates"]),
    afterGates: !item["afterGates"]
      ? item["afterGates"]
      : gateConfigurationArrayDeserializer(item["afterGates"]),
  };
}

export function updateGroupArraySerializer(result: Array<UpdateGroup>): any[] {
  return result.map((item) => {
    return updateGroupSerializer(item);
  });
}

export function updateGroupArrayDeserializer(result: Array<UpdateGroup>): any[] {
  return result.map((item) => {
    return updateGroupDeserializer(item);
  });
}

/** A group to be updated. */
export interface UpdateGroup {
  /**
   * Name of the group.
   * It must match a group name of an existing fleet member.
   */
  name: string;
  /**
   * The max number of upgrades that can run concurrently in this specific group.
   * Acts as a ceiling (and not a quota) for the number of concurrent upgrades within the group you want to tolerate at a time.
   * Actual concurrency may be lower depending on stage-level concurrency limits or individual member conditions.
   * Group maxConcurrency has a min value of "1". The max value is min(number of clusters in the group, the stage maxConcurrency).
   * If no value is provided, defaults to 1.
   * Accepts either:
   *     • A fixed count, e.g. "3"
   *     • A percentage, e.g. "25%" (range 1–100). Percentage is of the number of clusters in the group.
   *       Fractional results are rounded down. A minimum of 1 upgrade is enforced.
   * Examples:
   *     • "3" --> up to 3 members from this group upgrade at once.
   *     • "100%" --> “all at once”, up to all members for this group upgrade at the same time.
   *     • "25%" --> up to 25% of the members in the group will be upgraded at the same time.
   */
  maxConcurrency?: string;
  /**
   * Select the members of the group.
   *   * If specified, label-based selection will override group name based selection,
   *     and Name is only used as an identifier.
   *   * If not specified, group name based selection will be used, and Name must match a
   *     group name of an existing fleet member.
   */
  memberSelector?: MemberSelector;
  /** A list of Gates that will be created before this Group is executed. */
  beforeGates?: GateConfiguration[];
  /** A list of Gates that will be created after this Group is executed. */
  afterGates?: GateConfiguration[];
}

export function updateGroupSerializer(item: UpdateGroup): any {
  return {
    name: item["name"],
    maxConcurrency: item["maxConcurrency"],
    memberSelector: !item["memberSelector"]
      ? item["memberSelector"]
      : memberSelectorSerializer(item["memberSelector"]),
    beforeGates: !item["beforeGates"]
      ? item["beforeGates"]
      : gateConfigurationArraySerializer(item["beforeGates"]),
    afterGates: !item["afterGates"]
      ? item["afterGates"]
      : gateConfigurationArraySerializer(item["afterGates"]),
  };
}

export function updateGroupDeserializer(item: any): UpdateGroup {
  return {
    name: item["name"],
    maxConcurrency: item["maxConcurrency"],
    memberSelector: !item["memberSelector"]
      ? item["memberSelector"]
      : memberSelectorDeserializer(item["memberSelector"]),
    beforeGates: !item["beforeGates"]
      ? item["beforeGates"]
      : gateConfigurationArrayDeserializer(item["beforeGates"]),
    afterGates: !item["afterGates"]
      ? item["afterGates"]
      : gateConfigurationArrayDeserializer(item["afterGates"]),
  };
}

export function gateConfigurationArraySerializer(result: Array<GateConfiguration>): any[] {
  return result.map((item) => {
    return gateConfigurationSerializer(item);
  });
}

export function gateConfigurationArrayDeserializer(result: Array<GateConfiguration>): any[] {
  return result.map((item) => {
    return gateConfigurationDeserializer(item);
  });
}

/** GateConfiguration is used to define where Gates should be placed within the Update Run. */
export interface GateConfiguration {
  /** The human-readable display name of the Gate. */
  displayName?: string;
  /** The type of the Gate determines how it is completed. */
  type: GateType;
  /** Scheduled start configuration for gates of type ScheduledStart. */
  scheduledStartConfiguration?: ScheduledStartConfiguration;
}

export function gateConfigurationSerializer(item: GateConfiguration): any {
  return {
    displayName: item["displayName"],
    type: item["type"],
    scheduledStartConfiguration: !item["scheduledStartConfiguration"]
      ? item["scheduledStartConfiguration"]
      : scheduledStartConfigurationSerializer(item["scheduledStartConfiguration"]),
  };
}

export function gateConfigurationDeserializer(item: any): GateConfiguration {
  return {
    displayName: item["displayName"],
    type: item["type"],
    scheduledStartConfiguration: !item["scheduledStartConfiguration"]
      ? item["scheduledStartConfiguration"]
      : scheduledStartConfigurationDeserializer(item["scheduledStartConfiguration"]),
  };
}

/** Configuration for ScheduledStart gate */
export interface ScheduledStartConfiguration {
  /** The day of the week when the scheduled start occurs. */
  startDay: DayOfWeek;
  /** The local time of day when the scheduled start occurs in 24-hour (HH:mm) format. */
  startTime: string;
  /** The UTC offset for the scheduled time in HH:mm format, -14:00 to +14:00 */
  utcOffset: string;
}

export function scheduledStartConfigurationSerializer(item: ScheduledStartConfiguration): any {
  return { startDay: item["startDay"], startTime: item["startTime"], utcOffset: item["utcOffset"] };
}

export function scheduledStartConfigurationDeserializer(item: any): ScheduledStartConfiguration {
  return {
    startDay: item["startDay"],
    startTime: item["startTime"],
    utcOffset: item["utcOffset"],
  };
}

/** The update to be applied to the ManagedClusters. */
export interface ManagedClusterUpdate {
  /** The upgrade to apply to the ManagedClusters. */
  upgrade: ManagedClusterUpgradeSpec;
  /** The node image upgrade to be applied to the target nodes in update run. */
  nodeImageSelection?: NodeImageSelection;
}

export function managedClusterUpdateSerializer(item: ManagedClusterUpdate): any {
  return {
    upgrade: managedClusterUpgradeSpecSerializer(item["upgrade"]),
    nodeImageSelection: !item["nodeImageSelection"]
      ? item["nodeImageSelection"]
      : nodeImageSelectionSerializer(item["nodeImageSelection"]),
  };
}

export function managedClusterUpdateDeserializer(item: any): ManagedClusterUpdate {
  return {
    upgrade: managedClusterUpgradeSpecDeserializer(item["upgrade"]),
    nodeImageSelection: !item["nodeImageSelection"]
      ? item["nodeImageSelection"]
      : nodeImageSelectionDeserializer(item["nodeImageSelection"]),
  };
}

/** The upgrade to apply to a ManagedCluster. */
export interface ManagedClusterUpgradeSpec {
  /** ManagedClusterUpgradeType is the type of upgrade to be applied. */
  type: ManagedClusterUpgradeType;
  /** The Kubernetes version to upgrade the member clusters to. */
  kubernetesVersion?: string;
}

export function managedClusterUpgradeSpecSerializer(item: ManagedClusterUpgradeSpec): any {
  return { type: item["type"], kubernetesVersion: item["kubernetesVersion"] };
}

export function managedClusterUpgradeSpecDeserializer(item: any): ManagedClusterUpgradeSpec {
  return {
    type: item["type"],
    kubernetesVersion: item["kubernetesVersion"],
  };
}

/** The type of upgrade to perform when targeting ManagedClusters. */
export enum KnownManagedClusterUpgradeType {
  /** Full upgrades the control plane and all agent pools of the target ManagedClusters. Requires the ManagedClusterUpgradeSpec.KubernetesVersion property to be set. */
  Full = "Full",
  /** NodeImageOnly upgrades only the node images of the target ManagedClusters. Requires the ManagedClusterUpgradeSpec.KubernetesVersion property to NOT be set. */
  NodeImageOnly = "NodeImageOnly",
  /** ControlPlaneOnly upgrades only targets the KubernetesVersion of the ManagedClusters and will not be applied to the AgentPool. Requires the ManagedClusterUpgradeSpec.KubernetesVersion property to be set. */
  ControlPlaneOnly = "ControlPlaneOnly",
}

/**
 * The type of upgrade to perform when targeting ManagedClusters. \
 * {@link KnownManagedClusterUpgradeType} can be used interchangeably with ManagedClusterUpgradeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Full**: Full upgrades the control plane and all agent pools of the target ManagedClusters. Requires the ManagedClusterUpgradeSpec.KubernetesVersion property to be set. \
 * **NodeImageOnly**: NodeImageOnly upgrades only the node images of the target ManagedClusters. Requires the ManagedClusterUpgradeSpec.KubernetesVersion property to NOT be set. \
 * **ControlPlaneOnly**: ControlPlaneOnly upgrades only targets the KubernetesVersion of the ManagedClusters and will not be applied to the AgentPool. Requires the ManagedClusterUpgradeSpec.KubernetesVersion property to be set.
 */
export type ManagedClusterUpgradeType = string;

/** The node image upgrade to be applied to the target nodes in update run. */
export interface NodeImageSelection {
  /** The node image upgrade type. */
  type: NodeImageSelectionType;
  /** Custom node image versions to upgrade the nodes to. This field is required if node image selection type is Custom. Otherwise, it must be empty. For each node image family (e.g., 'AKSUbuntu-1804gen2containerd'), this field can contain at most one version (e.g., only one of 'AKSUbuntu-1804gen2containerd-2023.01.12' or 'AKSUbuntu-1804gen2containerd-2023.02.12', not both). If the nodes belong to a family without a matching image version in this field, they are not upgraded. */
  customNodeImageVersions?: NodeImageVersion[];
}

export function nodeImageSelectionSerializer(item: NodeImageSelection): any {
  return {
    type: item["type"],
    customNodeImageVersions: !item["customNodeImageVersions"]
      ? item["customNodeImageVersions"]
      : nodeImageVersionArraySerializer(item["customNodeImageVersions"]),
  };
}

export function nodeImageSelectionDeserializer(item: any): NodeImageSelection {
  return {
    type: item["type"],
    customNodeImageVersions: !item["customNodeImageVersions"]
      ? item["customNodeImageVersions"]
      : nodeImageVersionArrayDeserializer(item["customNodeImageVersions"]),
  };
}

/** The node image upgrade type. */
export enum KnownNodeImageSelectionType {
  /** Use the latest image version when upgrading nodes. Clusters may use different image versions (e.g., 'AKSUbuntu-1804gen2containerd-2021.10.12' and 'AKSUbuntu-1804gen2containerd-2021.10.19') because, for example, the latest available version is different in different regions. */
  Latest = "Latest",
  /** The image versions to upgrade nodes to are selected as described below: for each node pool in managed clusters affected by the update run, the system selects the latest image version such that it is available across all other node pools (in all other clusters) of the same image type. As a result, all node pools of the same image type will be upgraded to the same image version. For example, if the latest image version for image type 'AKSUbuntu-1804gen2containerd' is 'AKSUbuntu-1804gen2containerd-2021.10.12' for a node pool in cluster A in region X, and is 'AKSUbuntu-1804gen2containerd-2021.10.17' for a node pool in cluster B in region Y, the system will upgrade both node pools to image version 'AKSUbuntu-1804gen2containerd-2021.10.12'. */
  Consistent = "Consistent",
  /** Upgrade the nodes to the custom image versions. When set, update run will use node image versions provided in customNodeImageVersions to upgrade the nodes. If set, customNodeImageVersions must not be empty. */
  Custom = "Custom",
}

/**
 * The node image upgrade type. \
 * {@link KnownNodeImageSelectionType} can be used interchangeably with NodeImageSelectionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Latest**: Use the latest image version when upgrading nodes. Clusters may use different image versions (e.g., 'AKSUbuntu-1804gen2containerd-2021.10.12' and 'AKSUbuntu-1804gen2containerd-2021.10.19') because, for example, the latest available version is different in different regions. \
 * **Consistent**: The image versions to upgrade nodes to are selected as described below: for each node pool in managed clusters affected by the update run, the system selects the latest image version such that it is available across all other node pools (in all other clusters) of the same image type. As a result, all node pools of the same image type will be upgraded to the same image version. For example, if the latest image version for image type 'AKSUbuntu-1804gen2containerd' is 'AKSUbuntu-1804gen2containerd-2021.10.12' for a node pool in cluster A in region X, and is 'AKSUbuntu-1804gen2containerd-2021.10.17' for a node pool in cluster B in region Y, the system will upgrade both node pools to image version 'AKSUbuntu-1804gen2containerd-2021.10.12'. \
 * **Custom**: Upgrade the nodes to the custom image versions. When set, update run will use node image versions provided in customNodeImageVersions to upgrade the nodes. If set, customNodeImageVersions must not be empty.
 */
export type NodeImageSelectionType = string;

export function nodeImageVersionArraySerializer(result: Array<NodeImageVersion>): any[] {
  return result.map((item) => {
    return nodeImageVersionSerializer(item);
  });
}

export function nodeImageVersionArrayDeserializer(result: Array<NodeImageVersion>): any[] {
  return result.map((item) => {
    return nodeImageVersionDeserializer(item);
  });
}

/** The node upgrade image version. */
export interface NodeImageVersion {
  /** The image version to upgrade the nodes to (e.g., 'AKSUbuntu-1804gen2containerd-2022.12.13'). */
  readonly version?: string;
}

export function nodeImageVersionSerializer(_item: NodeImageVersion): any {
  return {};
}

export function nodeImageVersionDeserializer(item: any): NodeImageVersion {
  return {
    version: item["version"],
  };
}

/** The status of a UpdateRun. */
export interface UpdateRunStatus {
  /** The status of the UpdateRun. */
  readonly status?: UpdateStatus;
  /** The stages composing an update run. Stages are run sequentially withing an UpdateRun. */
  readonly stages?: UpdateStageStatus[];
  /** The node image upgrade specs for the update run. It is only set in update run when `NodeImageSelection.type` is `Consistent`. */
  readonly nodeImageSelection?: NodeImageSelectionStatus;
}

export function updateRunStatusDeserializer(item: any): UpdateRunStatus {
  return {
    status: !item["status"] ? item["status"] : updateStatusDeserializer(item["status"]),
    stages: !item["stages"] ? item["stages"] : updateStageStatusArrayDeserializer(item["stages"]),
    nodeImageSelection: !item["nodeImageSelection"]
      ? item["nodeImageSelection"]
      : nodeImageSelectionStatusDeserializer(item["nodeImageSelection"]),
  };
}

/** The status for an operation or group of operations. */
export interface UpdateStatus {
  /** The time the operation or group was started. */
  readonly startTime?: Date;
  /** The time the operation or group was completed. */
  readonly completedTime?: Date;
  /** The State of the operation or group. */
  readonly state?: UpdateState;
  /** The error details when a failure is encountered. */
  readonly error?: ErrorDetail;
}

export function updateStatusDeserializer(item: any): UpdateStatus {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    completedTime: !item["completedTime"] ? item["completedTime"] : new Date(item["completedTime"]),
    state: item["state"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The state of the UpdateRun, UpdateStage, UpdateGroup, or MemberUpdate. */
export enum KnownUpdateState {
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that has not been started. */
  NotStarted = "NotStarted",
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that is running. */
  Running = "Running",
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that is being stopped. */
  Stopping = "Stopping",
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that has stopped. */
  Stopped = "Stopped",
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that has been skipped. */
  Skipped = "Skipped",
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that has failed. */
  Failed = "Failed",
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that is pending. */
  Pending = "Pending",
  /** The state of an UpdateRun/UpdateStage/UpdateGroup/MemberUpdate that has completed. */
  Completed = "Completed",
}

/**
 * The state of the UpdateRun, UpdateStage, UpdateGroup, or MemberUpdate. \
 * {@link KnownUpdateState} can be used interchangeably with UpdateState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that has not been started. \
 * **Running**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that is running. \
 * **Stopping**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that is being stopped. \
 * **Stopped**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that has stopped. \
 * **Skipped**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that has been skipped. \
 * **Failed**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that has failed. \
 * **Pending**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that is pending. \
 * **Completed**: The state of an UpdateRun\/UpdateStage\/UpdateGroup\/MemberUpdate that has completed.
 */
export type UpdateState = string;

export function updateStageStatusArrayDeserializer(result: Array<UpdateStageStatus>): any[] {
  return result.map((item) => {
    return updateStageStatusDeserializer(item);
  });
}

/** The status of a UpdateStage. */
export interface UpdateStageStatus {
  /** The status of the UpdateStage. */
  readonly status?: UpdateStatus;
  /** The name of the UpdateStage. */
  readonly name?: string;
  /** The max number of upgrades that can run concurrently across all groups in this stage, resolved from the UpdateStrategy.UpdateStage.maxConcurrency value. */
  readonly maxConcurrency?: number;
  /** The list of groups to be updated as part of this UpdateStage. */
  readonly groups?: UpdateGroupStatus[];
  /** The list of Gates that will run before this UpdateStage. */
  readonly beforeGates?: UpdateRunGateStatus[];
  /** The list of Gates that will run after this UpdateStage. */
  readonly afterGates?: UpdateRunGateStatus[];
  /** The status of the wait period configured on the UpdateStage. */
  readonly afterStageWaitStatus?: WaitStatus;
}

export function updateStageStatusDeserializer(item: any): UpdateStageStatus {
  return {
    status: !item["status"] ? item["status"] : updateStatusDeserializer(item["status"]),
    name: item["name"],
    maxConcurrency: item["maxConcurrency"],
    groups: !item["groups"] ? item["groups"] : updateGroupStatusArrayDeserializer(item["groups"]),
    beforeGates: !item["beforeGates"]
      ? item["beforeGates"]
      : updateRunGateStatusArrayDeserializer(item["beforeGates"]),
    afterGates: !item["afterGates"]
      ? item["afterGates"]
      : updateRunGateStatusArrayDeserializer(item["afterGates"]),
    afterStageWaitStatus: !item["afterStageWaitStatus"]
      ? item["afterStageWaitStatus"]
      : waitStatusDeserializer(item["afterStageWaitStatus"]),
  };
}

export function updateGroupStatusArrayDeserializer(result: Array<UpdateGroupStatus>): any[] {
  return result.map((item) => {
    return updateGroupStatusDeserializer(item);
  });
}

/** The status of a UpdateGroup. */
export interface UpdateGroupStatus {
  /** The status of the UpdateGroup. */
  readonly status?: UpdateStatus;
  /** The name of the UpdateGroup. */
  readonly name?: string;
  /**   The max number of upgrades that can run concurrently in this group, resolved from the UpdateStrategy.UpdateGroup.maxConcurrency value. If no value was provided, this value defaults to "1". */
  readonly maxConcurrency?: number;
  /** The list of member this UpdateGroup updates. */
  readonly members?: MemberUpdateStatus[];
  /** The list of Gates that will run before this UpdateGroup. */
  readonly beforeGates?: UpdateRunGateStatus[];
  /** The list of Gates that will run after this UpdateGroup. */
  readonly afterGates?: UpdateRunGateStatus[];
}

export function updateGroupStatusDeserializer(item: any): UpdateGroupStatus {
  return {
    status: !item["status"] ? item["status"] : updateStatusDeserializer(item["status"]),
    name: item["name"],
    maxConcurrency: item["maxConcurrency"],
    members: !item["members"]
      ? item["members"]
      : memberUpdateStatusArrayDeserializer(item["members"]),
    beforeGates: !item["beforeGates"]
      ? item["beforeGates"]
      : updateRunGateStatusArrayDeserializer(item["beforeGates"]),
    afterGates: !item["afterGates"]
      ? item["afterGates"]
      : updateRunGateStatusArrayDeserializer(item["afterGates"]),
  };
}

export function memberUpdateStatusArrayDeserializer(result: Array<MemberUpdateStatus>): any[] {
  return result.map((item) => {
    return memberUpdateStatusDeserializer(item);
  });
}

/** The status of a member update operation. */
export interface MemberUpdateStatus {
  /** The status of the MemberUpdate operation. */
  readonly status?: UpdateStatus;
  /** The name of the FleetMember. */
  readonly name?: string;
  /** The Azure resource id of the target Kubernetes cluster. */
  readonly clusterResourceId?: string;
  /** The operation resource id of the latest attempt to perform the operation. */
  readonly operationId?: string;
  /** The status message after processing the member update operation. */
  readonly message?: string;
}

export function memberUpdateStatusDeserializer(item: any): MemberUpdateStatus {
  return {
    status: !item["status"] ? item["status"] : updateStatusDeserializer(item["status"]),
    name: item["name"],
    clusterResourceId: item["clusterResourceId"],
    operationId: item["operationId"],
    message: item["message"],
  };
}

export function updateRunGateStatusArrayDeserializer(result: Array<UpdateRunGateStatus>): any[] {
  return result.map((item) => {
    return updateRunGateStatusDeserializer(item);
  });
}

/** The status of the Gate, as represented in the Update Run. */
export interface UpdateRunGateStatus {
  /** The human-readable display name of the Gate. */
  readonly displayName?: string;
  /** The resource id of the Gate. */
  readonly gateId?: string;
  /** The status of the Gate. */
  readonly status?: UpdateStatus;
}

export function updateRunGateStatusDeserializer(item: any): UpdateRunGateStatus {
  return {
    displayName: item["displayName"],
    gateId: item["gateId"],
    status: !item["status"] ? item["status"] : updateStatusDeserializer(item["status"]),
  };
}

/** The status of the wait duration. */
export interface WaitStatus {
  /** The status of the wait duration. */
  readonly status?: UpdateStatus;
  /** The wait duration configured in seconds. */
  readonly waitDurationInSeconds?: number;
}

export function waitStatusDeserializer(item: any): WaitStatus {
  return {
    status: !item["status"] ? item["status"] : updateStatusDeserializer(item["status"]),
    waitDurationInSeconds: item["waitDurationInSeconds"],
  };
}

/** The node image upgrade specs for the update run. */
export interface NodeImageSelectionStatus {
  /** The image versions to upgrade the nodes to. */
  readonly selectedNodeImageVersions?: NodeImageVersion[];
}

export function nodeImageSelectionStatusDeserializer(item: any): NodeImageSelectionStatus {
  return {
    selectedNodeImageVersions: !item["selectedNodeImageVersions"]
      ? item["selectedNodeImageVersions"]
      : nodeImageVersionArrayDeserializer(item["selectedNodeImageVersions"]),
  };
}

/** The response of a UpdateRun list operation. */
export interface _UpdateRunListResult {
  /** The UpdateRun items on this page */
  value: UpdateRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _updateRunListResultDeserializer(item: any): _UpdateRunListResult {
  return {
    value: updateRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function updateRunArraySerializer(result: Array<UpdateRun>): any[] {
  return result.map((item) => {
    return updateRunSerializer(item);
  });
}

export function updateRunArrayDeserializer(result: Array<UpdateRun>): any[] {
  return result.map((item) => {
    return updateRunDeserializer(item);
  });
}

/** The properties of a skip operation containing multiple skip requests. */
export interface SkipProperties {
  /** The targets to skip. */
  targets: SkipTarget[];
}

export function skipPropertiesSerializer(item: SkipProperties): any {
  return { targets: skipTargetArraySerializer(item["targets"]) };
}

export function skipTargetArraySerializer(result: Array<SkipTarget>): any[] {
  return result.map((item) => {
    return skipTargetSerializer(item);
  });
}

/** The definition of a single skip request. */
export interface SkipTarget {
  /** The skip target type. */
  type: TargetType;
  /**
   * The skip target's name.
   * To skip a member/group/stage, use the member/group/stage's name;
   * Tp skip an after stage wait, use the parent stage's name.
   */
  name: string;
}

export function skipTargetSerializer(item: SkipTarget): any {
  return { type: item["type"], name: item["name"] };
}

/** The target type of a skip request. */
export enum KnownTargetType {
  /** Skip the update of a member. */
  Member = "Member",
  /** Skip the update of a group. */
  Group = "Group",
  /** Skip the update of an entire stage including the after stage wait. */
  Stage = "Stage",
  /** Skip the update of the after stage wait of a certain stage. */
  AfterStageWait = "AfterStageWait",
}

/**
 * The target type of a skip request. \
 * {@link KnownTargetType} can be used interchangeably with TargetType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Member**: Skip the update of a member. \
 * **Group**: Skip the update of a group. \
 * **Stage**: Skip the update of an entire stage including the after stage wait. \
 * **AfterStageWait**: Skip the update of the after stage wait of a certain stage.
 */
export type TargetType = string;

/** Defines a multi-stage process to perform update operations across members of a Fleet. */
export interface FleetUpdateStrategy extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: FleetUpdateStrategyProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function fleetUpdateStrategySerializer(item: FleetUpdateStrategy): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : fleetUpdateStrategyPropertiesSerializer(item["properties"]),
  };
}

export function fleetUpdateStrategyDeserializer(item: any): FleetUpdateStrategy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : fleetUpdateStrategyPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** The properties of the UpdateStrategy. */
export interface FleetUpdateStrategyProperties {
  /** The provisioning state of the UpdateStrategy resource. */
  readonly provisioningState?: FleetUpdateStrategyProvisioningState;
  /** Defines the update sequence of the clusters. */
  strategy: UpdateRunStrategy;
}

export function fleetUpdateStrategyPropertiesSerializer(item: FleetUpdateStrategyProperties): any {
  return { strategy: updateRunStrategySerializer(item["strategy"]) };
}

export function fleetUpdateStrategyPropertiesDeserializer(
  item: any,
): FleetUpdateStrategyProperties {
  return {
    provisioningState: item["provisioningState"],
    strategy: updateRunStrategyDeserializer(item["strategy"]),
  };
}

/** The provisioning state of the UpdateStrategy resource. */
export enum KnownFleetUpdateStrategyProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the UpdateStrategy resource. \
 * {@link KnownFleetUpdateStrategyProvisioningState} can be used interchangeably with FleetUpdateStrategyProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type FleetUpdateStrategyProvisioningState = string;

/** The response of a FleetUpdateStrategy list operation. */
export interface _FleetUpdateStrategyListResult {
  /** The FleetUpdateStrategy items on this page */
  value: FleetUpdateStrategy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fleetUpdateStrategyListResultDeserializer(
  item: any,
): _FleetUpdateStrategyListResult {
  return {
    value: fleetUpdateStrategyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fleetUpdateStrategyArraySerializer(result: Array<FleetUpdateStrategy>): any[] {
  return result.map((item) => {
    return fleetUpdateStrategySerializer(item);
  });
}

export function fleetUpdateStrategyArrayDeserializer(result: Array<FleetUpdateStrategy>): any[] {
  return result.map((item) => {
    return fleetUpdateStrategyDeserializer(item);
  });
}

/** The AutoUpgradeProfile resource. */
export interface AutoUpgradeProfile extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AutoUpgradeProfileProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function autoUpgradeProfileSerializer(item: AutoUpgradeProfile): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : autoUpgradeProfilePropertiesSerializer(item["properties"]),
  };
}

export function autoUpgradeProfileDeserializer(item: any): AutoUpgradeProfile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : autoUpgradeProfilePropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** The properties of the AutoUpgradeProfile. */
export interface AutoUpgradeProfileProperties {
  /** The provisioning state of the AutoUpgradeProfile resource. */
  readonly provisioningState?: AutoUpgradeProfileProvisioningState;
  /** The resource id of the UpdateStrategy resource to reference. If not specified, the auto upgrade will run on all clusters which are members of the fleet. */
  updateStrategyId?: string;
  /** Configures how auto-upgrade will be run. */
  channel: UpgradeChannel;
  /** The node image upgrade to be applied to the target clusters in auto upgrade. */
  nodeImageSelection?: AutoUpgradeNodeImageSelection;
  /**
   * If set to False: the auto upgrade has effect - target managed clusters will be upgraded on schedule.
   * If set to True: the auto upgrade has no effect - no upgrade will be run on the target managed clusters.
   * This is a boolean and not an enum because enabled/disabled are all available states of the auto upgrade profile.
   * By default, this is set to False.
   */
  disabled?: boolean;
  /** The status of the auto upgrade profile. */
  autoUpgradeProfileStatus?: AutoUpgradeProfileStatus;
  /**
   *   This is the target Kubernetes version for auto-upgrade. The format must be `{major version}.{minor version}`. For example, "1.30".
   *   By default, this is empty.
   *   If upgrade channel is set to TargetKubernetesVersion, this field must not be empty.
   *   If upgrade channel is not TargetKubernetesVersion, this field must be empty.
   */
  targetKubernetesVersion?: string;
  /**
   *   If upgrade channel is not TargetKubernetesVersion, this field must be False.
   *   If set to True: Fleet auto upgrade will continue generate update runs for patches of minor versions earlier than N-2
   *   (where N is the latest supported minor version) if those minor versions support Long-Term Support (LTS).
   *   By default, this is set to False.
   *   For more information on AKS LTS, please see https://learn.microsoft.com/en-us/azure/aks/long-term-support
   */
  longTermSupport?: boolean;
}

export function autoUpgradeProfilePropertiesSerializer(item: AutoUpgradeProfileProperties): any {
  return {
    updateStrategyId: item["updateStrategyId"],
    channel: item["channel"],
    nodeImageSelection: !item["nodeImageSelection"]
      ? item["nodeImageSelection"]
      : autoUpgradeNodeImageSelectionSerializer(item["nodeImageSelection"]),
    disabled: item["disabled"],
    autoUpgradeProfileStatus: !item["autoUpgradeProfileStatus"]
      ? item["autoUpgradeProfileStatus"]
      : autoUpgradeProfileStatusSerializer(item["autoUpgradeProfileStatus"]),
    targetKubernetesVersion: item["targetKubernetesVersion"],
    longTermSupport: item["longTermSupport"],
  };
}

export function autoUpgradeProfilePropertiesDeserializer(item: any): AutoUpgradeProfileProperties {
  return {
    provisioningState: item["provisioningState"],
    updateStrategyId: item["updateStrategyId"],
    channel: item["channel"],
    nodeImageSelection: !item["nodeImageSelection"]
      ? item["nodeImageSelection"]
      : autoUpgradeNodeImageSelectionDeserializer(item["nodeImageSelection"]),
    disabled: item["disabled"],
    autoUpgradeProfileStatus: !item["autoUpgradeProfileStatus"]
      ? item["autoUpgradeProfileStatus"]
      : autoUpgradeProfileStatusDeserializer(item["autoUpgradeProfileStatus"]),
    targetKubernetesVersion: item["targetKubernetesVersion"],
    longTermSupport: item["longTermSupport"],
  };
}

/** The provisioning state of the AutoUpgradeProfile resource. */
export enum KnownAutoUpgradeProfileProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the AutoUpgradeProfile resource. \
 * {@link KnownAutoUpgradeProfileProvisioningState} can be used interchangeably with AutoUpgradeProfileProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type AutoUpgradeProfileProvisioningState = string;

/** Configuration of how auto upgrade will be run. */
export enum KnownUpgradeChannel {
  /**
   *  Upgrades the clusters kubernetes version to the latest supported patch release on minor version N-1, where N is the latest supported minor version.
   *  For example, if a cluster runs version 1.17.7 and versions 1.17.9, 1.18.4, 1.18.6, and 1.19.1 are available, the cluster upgrades to 1.18.6.
   */
  Stable = "Stable",
  /** Upgrades the clusters kubernetes version to the latest supported patch release on the latest supported minor version. */
  Rapid = "Rapid",
  /** Upgrade node image version of the clusters. */
  NodeImage = "NodeImage",
  /**
   *   Upgrades the clusters Kubernetes version to the latest supported patch version of the specified target Kubernetes version.
   *   For information on the behavior of update run for Kubernetes version upgrade,
   *   see https://learn.microsoft.com/en-us/azure/kubernetes-fleet/update-orchestration?tabs=azure-portal
   */
  TargetKubernetesVersion = "TargetKubernetesVersion",
  /**
   *   Applies security patches to the nodes of the target clusters.
   *   For information on the behavior of update run for security patch upgrade,
   *   see https://learn.microsoft.com/en-us/azure/kubernetes-fleet/update-orchestration?tabs=azure-portal
   */
  SecurityPatch = "SecurityPatch",
}

/**
 * Configuration of how auto upgrade will be run. \
 * {@link KnownUpgradeChannel} can be used interchangeably with UpgradeChannel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Stable**:  Upgrades the clusters kubernetes version to the latest supported patch release on minor version N-1, where N is the latest supported minor version.
 *  For example, if a cluster runs version 1.17.7 and versions 1.17.9, 1.18.4, 1.18.6, and 1.19.1 are available, the cluster upgrades to 1.18.6. \
 * **Rapid**: Upgrades the clusters kubernetes version to the latest supported patch release on the latest supported minor version. \
 * **NodeImage**: Upgrade node image version of the clusters. \
 * **TargetKubernetesVersion**:   Upgrades the clusters Kubernetes version to the latest supported patch version of the specified target Kubernetes version.
 *   For information on the behavior of update run for Kubernetes version upgrade,
 *   see https:\//learn.microsoft.com\/en-us\/azure\/kubernetes-fleet\/update-orchestration?tabs=azure-portal \
 * **SecurityPatch**:   Applies security patches to the nodes of the target clusters.
 *   For information on the behavior of update run for security patch upgrade,
 *   see https:\//learn.microsoft.com\/en-us\/azure\/kubernetes-fleet\/update-orchestration?tabs=azure-portal
 */
export type UpgradeChannel = string;

/** The node image upgrade to be applied to the target clusters in auto upgrade. */
export interface AutoUpgradeNodeImageSelection {
  /** The node image upgrade type. */
  type: AutoUpgradeNodeImageSelectionType;
}

export function autoUpgradeNodeImageSelectionSerializer(item: AutoUpgradeNodeImageSelection): any {
  return { type: item["type"] };
}

export function autoUpgradeNodeImageSelectionDeserializer(
  item: any,
): AutoUpgradeNodeImageSelection {
  return {
    type: item["type"],
  };
}

/** The node image upgrade type. */
export enum KnownAutoUpgradeNodeImageSelectionType {
  /** Use the latest image version when upgrading nodes. Clusters may use different image versions (e.g., 'AKSUbuntu-1804gen2containerd-2021.10.12' and 'AKSUbuntu-1804gen2containerd-2021.10.19') because, for example, the latest available version is different in different regions. */
  Latest = "Latest",
  /** The image versions to upgrade nodes to are selected as described below: for each node pool in managed clusters affected by the update run, the system selects the latest image version such that it is available across all other node pools (in all other clusters) of the same image type. As a result, all node pools of the same image type will be upgraded to the same image version. For example, if the latest image version for image type 'AKSUbuntu-1804gen2containerd' is 'AKSUbuntu-1804gen2containerd-2021.10.12' for a node pool in cluster A in region X, and is 'AKSUbuntu-1804gen2containerd-2021.10.17' for a node pool in cluster B in region Y, the system will upgrade both node pools to image version 'AKSUbuntu-1804gen2containerd-2021.10.12'. */
  Consistent = "Consistent",
}

/**
 * The node image upgrade type. \
 * {@link KnownAutoUpgradeNodeImageSelectionType} can be used interchangeably with AutoUpgradeNodeImageSelectionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Latest**: Use the latest image version when upgrading nodes. Clusters may use different image versions (e.g., 'AKSUbuntu-1804gen2containerd-2021.10.12' and 'AKSUbuntu-1804gen2containerd-2021.10.19') because, for example, the latest available version is different in different regions. \
 * **Consistent**: The image versions to upgrade nodes to are selected as described below: for each node pool in managed clusters affected by the update run, the system selects the latest image version such that it is available across all other node pools (in all other clusters) of the same image type. As a result, all node pools of the same image type will be upgraded to the same image version. For example, if the latest image version for image type 'AKSUbuntu-1804gen2containerd' is 'AKSUbuntu-1804gen2containerd-2021.10.12' for a node pool in cluster A in region X, and is 'AKSUbuntu-1804gen2containerd-2021.10.17' for a node pool in cluster B in region Y, the system will upgrade both node pools to image version 'AKSUbuntu-1804gen2containerd-2021.10.12'.
 */
export type AutoUpgradeNodeImageSelectionType = string;

/** AutoUpgradeProfileStatus is the status of an auto upgrade profile. */
export interface AutoUpgradeProfileStatus {
  /** The UTC time of the last attempt to automatically create and start an UpdateRun as triggered by the release of new versions. */
  readonly lastTriggeredAt?: Date;
  /** The status of the last AutoUpgrade trigger. */
  readonly lastTriggerStatus?: AutoUpgradeLastTriggerStatus;
  /** The error details of the last trigger. */
  readonly lastTriggerError?: ErrorDetail;
  /** The target Kubernetes version or node image versions of the last trigger. */
  readonly lastTriggerUpgradeVersions?: string[];
  /** Additional information about the last trigger attempt. */
  readonly lastTriggerMessage?: string;
}

export function autoUpgradeProfileStatusSerializer(_item: AutoUpgradeProfileStatus): any {
  return {};
}

export function autoUpgradeProfileStatusDeserializer(item: any): AutoUpgradeProfileStatus {
  return {
    lastTriggeredAt: !item["lastTriggeredAt"]
      ? item["lastTriggeredAt"]
      : new Date(item["lastTriggeredAt"]),
    lastTriggerStatus: item["lastTriggerStatus"],
    lastTriggerError: !item["lastTriggerError"]
      ? item["lastTriggerError"]
      : errorDetailDeserializer(item["lastTriggerError"]),
    lastTriggerUpgradeVersions: !item["lastTriggerUpgradeVersions"]
      ? item["lastTriggerUpgradeVersions"]
      : item["lastTriggerUpgradeVersions"].map((p: any) => {
          return p;
        }),
    lastTriggerMessage: item["lastTriggerMessage"],
  };
}

/** AutoUpgradeLastTriggerStatus is the status of the last AutoUpgrade trigger (attempt to automatically create and start UpdateRun when there are new released versions) of an auto upgrade profile. */
export enum KnownAutoUpgradeLastTriggerStatus {
  /** The last AutoUpgrade trigger was succeeded. */
  Succeeded = "Succeeded",
  /** The last AutoUpgrade trigger failed. */
  Failed = "Failed",
}

/**
 * AutoUpgradeLastTriggerStatus is the status of the last AutoUpgrade trigger (attempt to automatically create and start UpdateRun when there are new released versions) of an auto upgrade profile. \
 * {@link KnownAutoUpgradeLastTriggerStatus} can be used interchangeably with AutoUpgradeLastTriggerStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The last AutoUpgrade trigger was succeeded. \
 * **Failed**: The last AutoUpgrade trigger failed.
 */
export type AutoUpgradeLastTriggerStatus = string;

/** The response of a AutoUpgradeProfile list operation. */
export interface _AutoUpgradeProfileListResult {
  /** The AutoUpgradeProfile items on this page */
  value: AutoUpgradeProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _autoUpgradeProfileListResultDeserializer(
  item: any,
): _AutoUpgradeProfileListResult {
  return {
    value: autoUpgradeProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function autoUpgradeProfileArraySerializer(result: Array<AutoUpgradeProfile>): any[] {
  return result.map((item) => {
    return autoUpgradeProfileSerializer(item);
  });
}

export function autoUpgradeProfileArrayDeserializer(result: Array<AutoUpgradeProfile>): any[] {
  return result.map((item) => {
    return autoUpgradeProfileDeserializer(item);
  });
}

/** GenerateResponse is the response of a generate request. */
export interface GenerateResponse {
  /** The ARM resource id of the generated UpdateRun. e.g.: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/updateRuns/{updateRunName}'. */
  readonly id: string;
}

export function generateResponseDeserializer(item: any): GenerateResponse {
  return {
    id: item["id"],
  };
}

/** Azure Kubernetes Fleet Manager api versions. */
export enum KnownVersions {
  /** Azure Kubernetes Fleet Manager api version 2023-10-15. */
  V20231015 = "2023-10-15",
  /** Azure Kubernetes Fleet Manager api version 2024-04-01. */
  V20240401 = "2024-04-01",
  /** Azure Kubernetes Fleet Manager api version 2025-03-01. */
  V20250301 = "2025-03-01",
  /** Azure Kubernetes Fleet Manager api version 2026-06-01. */
  V20260601 = "2026-06-01",
  /** Azure Kubernetes Fleet Manager api version 2026-11-01. */
  V20261101 = "2026-11-01",
}

export function _clusterMeshProfilePropertiesSerializer(item: ClusterMeshProfile): any {
  return {
    memberSelector: !item["memberSelector"]
      ? item["memberSelector"]
      : memberSelectorSerializer(item["memberSelector"]),
  };
}

export function _clusterMeshProfilePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    memberSelector: !item["memberSelector"]
      ? item["memberSelector"]
      : memberSelectorDeserializer(item["memberSelector"]),
    status: !item["status"] ? item["status"] : clusterMeshProfileStatusDeserializer(item["status"]),
  };
}

export function _fleetManagedNamespacePropertiesSerializer(item: FleetManagedNamespace): any {
  return {
    managedNamespaceProperties: !item["managedNamespaceProperties"]
      ? item["managedNamespaceProperties"]
      : managedNamespacePropertiesSerializer(item["managedNamespaceProperties"]),
    adoptionPolicy: item["adoptionPolicy"],
    deletePolicy: item["deletePolicy"],
    propagationPolicy: !item["propagationPolicy"]
      ? item["propagationPolicy"]
      : propagationPolicySerializer(item["propagationPolicy"]),
  };
}

export function _fleetManagedNamespacePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    managedNamespaceProperties: !item["managedNamespaceProperties"]
      ? item["managedNamespaceProperties"]
      : managedNamespacePropertiesDeserializer(item["managedNamespaceProperties"]),
    adoptionPolicy: item["adoptionPolicy"],
    deletePolicy: item["deletePolicy"],
    propagationPolicy: !item["propagationPolicy"]
      ? item["propagationPolicy"]
      : propagationPolicyDeserializer(item["propagationPolicy"]),
    status: !item["status"]
      ? item["status"]
      : fleetManagedNamespaceStatusDeserializer(item["status"]),
    portalFqdn: item["portalFqdn"],
  };
}
