// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../helpers/serializerHelpers.js";
import {
  PrivateEndpointConnectionResource as PrivateEndpointConnectionResourceRest,
  PrivateEndpointConnectionProperties as PrivateEndpointConnectionPropertiesRest,
  PrivateLinkServiceConnectionState as PrivateLinkServiceConnectionStateRest,
  FirewallRule as FirewallRuleRest,
  FirewallRuleProperties as FirewallRulePropertiesRest,
  TrackedResource as TrackedResourceRest,
  MongoCluster as MongoClusterRest,
  MongoClusterProperties as MongoClusterPropertiesRest,
  MongoClusterRestoreParameters as MongoClusterRestoreParametersRest,
  NodeGroupSpec as NodeGroupSpecRest,
  MongoClusterUpdate as MongoClusterUpdateRest,
  MongoClusterUpdateProperties as MongoClusterUpdatePropertiesRest,
  CheckNameAvailabilityRequest as CheckNameAvailabilityRequestRest,
} from "../rest/index.js";

/** The response of a PrivateLinkResource list operation. */
export interface _PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
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

export function resourceSerializer(item: Resource) {
  return item as any;
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

/** Known values of {@link CreatedByType} that the service accepts. */
export enum KnownCreatedByType {
  /** User */
  User = "User",
  /** Application */
  Application = "Application",
  /** ManagedIdentity */
  ManagedIdentity = "ManagedIdentity",
  /** Key */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User** \
 * **Application** \
 * **ManagedIdentity** \
 * **Key**
 */
export type CreatedByType = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource) {
  return item as any;
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface PrivateLinkResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateLinkResourceProperties;
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
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

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, any>;
}

/** The response of a PrivateEndpointConnectionResource list operation. */
export interface _PrivateEndpointConnectionResourceListResult {
  /** The PrivateEndpointConnectionResource items on this page */
  value: PrivateEndpointConnectionResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface PrivateEndpointConnectionResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionResourceSerializer(
  item: PrivateEndpointConnectionResource,
): PrivateEndpointConnectionResourceRest {
  return {
    properties: !item.properties
      ? item.properties
      : privateEndpointConnectionPropertiesSerializer(item.properties),
  };
}

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The group ids for the private endpoint resource. */
  readonly groupIds?: string[];
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): PrivateEndpointConnectionPropertiesRest {
  return {
    privateEndpoint: !item.privateEndpoint
      ? item.privateEndpoint
      : privateEndpointSerializer(item.privateEndpoint),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item.privateLinkServiceConnectionState,
    ),
  };
}

/** The Private Endpoint resource. */
export interface PrivateEndpoint {
  /** The resource identifier for private endpoint */
  readonly id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint) {
  return item as any;
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): PrivateLinkServiceConnectionStateRest {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** Known values of {@link PrivateEndpointServiceConnectionStatus} that the service accepts. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected**
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** Known values of {@link PrivateEndpointConnectionProvisioningState} that the service accepts. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Creating** \
 * **Deleting** \
 * **Failed**
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** Represents a mongo cluster firewall rule. */
export interface FirewallRule extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: FirewallRuleProperties;
}

export function firewallRuleSerializer(item: FirewallRule): FirewallRuleRest {
  return {
    properties: !item.properties
      ? item.properties
      : firewallRulePropertiesSerializer(item.properties),
  };
}

/** The properties of a mongo cluster firewall rule. */
export interface FirewallRuleProperties {
  /** The provisioning state of the firewall rule. */
  readonly provisioningState?: ProvisioningState;
  /** The start IP address of the mongo cluster firewall rule. Must be IPv4 format. */
  startIpAddress: string;
  /** The end IP address of the mongo cluster firewall rule. Must be IPv4 format. */
  endIpAddress: string;
}

export function firewallRulePropertiesSerializer(
  item: FirewallRuleProperties,
): FirewallRulePropertiesRest {
  return {
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
  };
}

/** Known values of {@link ResourceProvisioningState} that the service accepts. */
export enum KnownResourceProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The provisioning state of a resource type. \
 * {@link KnownResourceProvisioningState} can be used interchangeably with ResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed** \
 * **Canceled**
 */
export type ResourceProvisioningState = string;

/** The response of a FirewallRule list operation. */
export interface _FirewallRuleListResult {
  /** The FirewallRule items on this page */
  value: FirewallRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): TrackedResourceRest {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
  };
}

/** Represents a mongo cluster resource. */
export interface MongoCluster extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: MongoClusterProperties;
}

export function mongoClusterSerializer(item: MongoCluster): MongoClusterRest {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
    properties: !item.properties
      ? item.properties
      : mongoClusterPropertiesSerializer(item.properties),
  };
}

/** The properties of a mongo cluster. */
export interface MongoClusterProperties {
  /** The mode to create a mongo cluster. */
  createMode?: CreateMode;
  /** The parameters to create a point-in-time restore mongo cluster. */
  restoreParameters?: MongoClusterRestoreParameters;
  /** The administrator's login for the mongo cluster. */
  administratorLogin?: string;
  /** The password of the administrator login. */
  administratorLoginPassword?: string;
  /** The Mongo DB server version. Defaults to the latest available version if not specified. */
  serverVersion?: string;
  /** The default mongo connection string for the cluster. */
  readonly connectionString?: string;
  /** Earliest restore timestamp in UTC ISO8601 format. */
  readonly earliestRestoreTime?: string;
  /** The provisioning state of the mongo cluster. */
  readonly provisioningState?: ProvisioningState;
  /** The status of the mongo cluster. */
  readonly clusterStatus?: MongoClusterStatus;
  /** Whether or not public endpoint access is allowed for this mongo cluster. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The list of node group specs in the cluster. */
  nodeGroupSpecs?: NodeGroupSpec[];
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
}

export function mongoClusterPropertiesSerializer(
  item: MongoClusterProperties,
): MongoClusterPropertiesRest {
  return {
    createMode: item["createMode"],
    restoreParameters: !item.restoreParameters
      ? item.restoreParameters
      : mongoClusterRestoreParametersSerializer(item.restoreParameters),
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    serverVersion: item["serverVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    nodeGroupSpecs:
      item["nodeGroupSpecs"] === undefined
        ? item["nodeGroupSpecs"]
        : item["nodeGroupSpecs"].map(nodeGroupSpecSerializer),
  };
}

/** Known values of {@link CreateMode} that the service accepts. */
export enum KnownCreateMode {
  /** Default */
  Default = "Default",
  /** PointInTimeRestore */
  PointInTimeRestore = "PointInTimeRestore",
}

/**
 * The mode that the Mongo Cluster is created with. \
 * {@link KnownCreateMode} can be used interchangeably with CreateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **PointInTimeRestore**
 */
export type CreateMode = string;

/** Parameters used for restore operations */
export interface MongoClusterRestoreParameters {
  /** UTC point in time to restore a mongo cluster */
  pointInTimeUTC?: Date;
  /** Resource ID to locate the source cluster to restore */
  sourceResourceId?: string;
}

export function mongoClusterRestoreParametersSerializer(
  item: MongoClusterRestoreParameters,
): MongoClusterRestoreParametersRest {
  return {
    pointInTimeUTC: item["pointInTimeUTC"]?.toISOString(),
    sourceResourceId: item["sourceResourceId"],
  };
}

/** Known values of {@link MongoClusterStatus} that the service accepts. */
export enum KnownMongoClusterStatus {
  /** Ready */
  Ready = "Ready",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Updating */
  Updating = "Updating",
  /** Starting */
  Starting = "Starting",
  /** Stopping */
  Stopping = "Stopping",
  /** Stopped */
  Stopped = "Stopped",
  /** Dropping */
  Dropping = "Dropping",
}

/**
 * The status of the Mongo cluster resource. \
 * {@link KnownMongoClusterStatus} can be used interchangeably with MongoClusterStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready** \
 * **Provisioning** \
 * **Updating** \
 * **Starting** \
 * **Stopping** \
 * **Stopped** \
 * **Dropping**
 */
export type MongoClusterStatus = string;

/** Known values of {@link PublicNetworkAccess} that the service accepts. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Whether or not public endpoint access is allowed for this Mongo cluster.  Value is optional and default value is 'Enabled' \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PublicNetworkAccess = string;

/** Specification for a node group. */
export interface NodeGroupSpec {
  /** The resource sku for the node group. This defines the size of CPU and memory that is provisioned for each node. Example values: 'M30', 'M40'. */
  sku?: string;
  /** The disk storage size for the node group in GB. Example values: 128, 256, 512, 1024. */
  diskSizeGB?: number;
  /** Whether high availability is enabled on the node group. */
  enableHa?: boolean;
  /** The node type deployed in the node group. */
  kind?: NodeKind;
  /** The number of nodes in the node group. */
  nodeCount?: number;
}

export function nodeGroupSpecSerializer(item: NodeGroupSpec): NodeGroupSpecRest {
  return {
    sku: item["sku"],
    diskSizeGB: item["diskSizeGB"],
    enableHa: item["enableHa"],
    kind: item["kind"],
    nodeCount: item["nodeCount"],
  };
}

/** Known values of {@link NodeKind} that the service accepts. */
export enum KnownNodeKind {
  /** Shard */
  Shard = "Shard",
}

/**
 * The kind of the node on the cluster. \
 * {@link KnownNodeKind} can be used interchangeably with NodeKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Shard**
 */
export type NodeKind = string;

/** The private endpoint connection resource */
export interface PrivateEndpointConnection extends Resource {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionProperties;
}

/** The type used for update operations of the MongoCluster. */
export interface MongoClusterUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: MongoClusterUpdateProperties;
}

export function mongoClusterUpdateSerializer(item: MongoClusterUpdate): MongoClusterUpdateRest {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    properties: !item.properties
      ? item.properties
      : mongoClusterUpdatePropertiesSerializer(item.properties),
  };
}

/** The updatable properties of the MongoCluster. */
export interface MongoClusterUpdateProperties {
  /** The administrator's login for the mongo cluster. */
  administratorLogin?: string;
  /** The password of the administrator login. */
  administratorLoginPassword?: string;
  /** The Mongo DB server version. Defaults to the latest available version if not specified. */
  serverVersion?: string;
  /** Whether or not public endpoint access is allowed for this mongo cluster. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The list of node group specs in the cluster. */
  nodeGroupSpecs?: NodeGroupSpec[];
}

export function mongoClusterUpdatePropertiesSerializer(
  item: MongoClusterUpdateProperties,
): MongoClusterUpdatePropertiesRest {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    serverVersion: item["serverVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    nodeGroupSpecs:
      item["nodeGroupSpecs"] === undefined
        ? item["nodeGroupSpecs"]
        : item["nodeGroupSpecs"].map(nodeGroupSpecSerializer),
  };
}

/** The response of a MongoCluster list operation. */
export interface _MongoClusterListResult {
  /** The MongoCluster items on this page */
  value: MongoCluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** The connection strings for the given mongo cluster. */
export interface ListConnectionStringsResult {
  /** An array that contains the connection strings for a mongo cluster. */
  readonly connectionStrings?: ConnectionString[];
}

/** Connection string for the mongo cluster */
export interface ConnectionString {
  /** Value of the connection string */
  readonly connectionString?: string;
  /** Description of the connection string */
  readonly description?: string;
}

/** The check availability request body. */
export interface CheckNameAvailabilityRequest {
  /** The name of the resource for which availability needs to be checked. */
  name?: string;
  /** The resource type. */
  type?: string;
}

export function checkNameAvailabilityRequestSerializer(
  item: CheckNameAvailabilityRequest,
): CheckNameAvailabilityRequestRest {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The check availability result. */
export interface CheckNameAvailabilityResponse {
  /** Indicates if the resource name is available. */
  nameAvailable?: boolean;
  /** The reason why the given name is not available. */
  reason?: CheckNameAvailabilityReason;
  /** Detailed reason why the given name is not available. */
  message?: string;
}

/** Known values of {@link CheckNameAvailabilityReason} that the service accepts. */
export enum KnownCheckNameAvailabilityReason {
  /** Invalid */
  Invalid = "Invalid",
  /** AlreadyExists */
  AlreadyExists = "AlreadyExists",
}

/**
 * Possible reasons for a name not being available. \
 * {@link KnownCheckNameAvailabilityReason} can be used interchangeably with CheckNameAvailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **AlreadyExists**
 */
export type CheckNameAvailabilityReason = string;

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  readonly display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionType;
}

/** Localized display information for and operation. */
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

/** Known values of {@link Origin} that the service accepts. */
export enum KnownOrigin {
  /** user */
  user = "user",
  /** system */
  system = "system",
  /** user,system */
  "user,system" = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user** \
 * **system** \
 * **user,system**
 */
export type Origin = string;

/** Known values of {@link ActionType} that the service accepts. */
export enum KnownActionType {
  /** Internal */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**
 */
export type ActionType = string;
/** The available API versions. */
export type Versions = "2024-03-01-preview";
/** Alias for ProvisioningState */
export type ProvisioningState =
  | string
  | ResourceProvisioningState
  | "InProgress"
  | "Updating"
  | "Dropping";
