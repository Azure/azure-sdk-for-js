// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { serializeRecord } from "../helpers/serializerHelpers.js";

/** The response of a Replica list operation. */
export interface _ReplicaListResult {
  /** The Replica items on this page */
  value: Replica[];
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

/** Represents a mongo cluster replica. */
export interface Replica extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: MongoClusterProperties;
}

/** The properties of a mongo cluster. */
export interface MongoClusterProperties {
  /** The mode to create a mongo cluster. */
  createMode?: CreateMode;
  /** The parameters to create a point-in-time restore mongo cluster. */
  restoreParameters?: MongoClusterRestoreParameters;
  /** The parameters to create a replica mongo cluster. */
  replicaParameters?: MongoClusterReplicaParameters;
  /** The local administrator properties for the mongo cluster. */
  administrator?: AdministratorProperties;
  /** The Mongo DB server version. Defaults to the latest available version if not specified. */
  serverVersion?: string;
  /** The default mongo connection string for the cluster. */
  readonly connectionString?: string;
  /** The provisioning state of the mongo cluster. */
  readonly provisioningState?: ProvisioningState;
  /** The status of the mongo cluster. */
  readonly clusterStatus?: MongoClusterStatus;
  /** Whether or not public endpoint access is allowed for this mongo cluster. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The high availability properties of the mongo cluster. */
  highAvailability?: HighAvailabilityProperties;
  /** The storage properties of the mongo cluster. */
  storage?: StorageProperties;
  /** The sharding properties of the mongo cluster. */
  sharding?: ShardingProperties;
  /** The compute properties of the mongo cluster. */
  compute?: ComputeProperties;
  /** The backup properties of the mongo cluster. */
  backup?: BackupProperties;
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** List of private endpoint connections. */
  previewFeatures?: PreviewFeature[];
  /** The replication properties for the mongo cluster */
  readonly replica?: ReplicationProperties;
  /** The infrastructure version the cluster is provisioned on. */
  readonly infrastructureVersion?: string;
}

export function mongoClusterPropertiesSerializer(
  item: MongoClusterProperties,
): Record<string, unknown> {
  return {
    createMode: item["createMode"],
    restoreParameters: !item.restoreParameters
      ? item.restoreParameters
      : mongoClusterRestoreParametersSerializer(item.restoreParameters),
    replicaParameters: !item.replicaParameters
      ? item.replicaParameters
      : mongoClusterReplicaParametersSerializer(item.replicaParameters),
    administrator: !item.administrator
      ? item.administrator
      : administratorPropertiesSerializer(item.administrator),
    serverVersion: item["serverVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    highAvailability: !item.highAvailability
      ? item.highAvailability
      : highAvailabilityPropertiesSerializer(item.highAvailability),
    storage: !item.storage
      ? item.storage
      : storagePropertiesSerializer(item.storage),
    sharding: !item.sharding
      ? item.sharding
      : shardingPropertiesSerializer(item.sharding),
    compute: !item.compute
      ? item.compute
      : computePropertiesSerializer(item.compute),
    backup: !item.backup
      ? item.backup
      : backupPropertiesSerializer(item.backup),
    previewFeatures: item["previewFeatures"],
  };
}

/** Known values of {@link CreateMode} that the service accepts. */
export enum KnownCreateMode {
  /** Default */
  Default = "Default",
  /** PointInTimeRestore */
  PointInTimeRestore = "PointInTimeRestore",
  /** GeoReplica */
  GeoReplica = "GeoReplica",
  /** Replica */
  Replica = "Replica",
}

/**
 * The mode that the Mongo Cluster is created with. \
 * {@link KnownCreateMode} can be used interchangeably with CreateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **PointInTimeRestore** \
 * **GeoReplica** \
 * **Replica**
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
): Record<string, unknown> {
  return {
    pointInTimeUTC: item["pointInTimeUTC"]?.toISOString(),
    sourceResourceId: item["sourceResourceId"],
  };
}

/** Parameters used for replica operations. */
export interface MongoClusterReplicaParameters {
  /** The id of the replication source cluster. */
  sourceResourceId: string;
  /** The location of the source cluster */
  sourceLocation: string;
}

export function mongoClusterReplicaParametersSerializer(
  item: MongoClusterReplicaParameters,
): Record<string, unknown> {
  return {
    sourceResourceId: item["sourceResourceId"],
    sourceLocation: item["sourceLocation"],
  };
}

/** The local administrator login properties. */
export interface AdministratorProperties {
  /** The administrator user name. */
  userName?: string;
  /** The administrator password. */
  password?: string;
}

export function administratorPropertiesSerializer(
  item: AdministratorProperties,
): Record<string, unknown> {
  return {
    userName: item["userName"],
    password: item["password"],
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

/** The high availability properties of the cluster. */
export interface HighAvailabilityProperties {
  /** The target high availability mode requested for the cluster. */
  targetMode?: HighAvailabilityMode;
}

export function highAvailabilityPropertiesSerializer(
  item: HighAvailabilityProperties,
): Record<string, unknown> {
  return {
    targetMode: item["targetMode"],
  };
}

/** Known values of {@link HighAvailabilityMode} that the service accepts. */
export enum KnownHighAvailabilityMode {
  /** Disabled */
  Disabled = "Disabled",
  /** SameZone */
  SameZone = "SameZone",
  /** ZoneRedundantPreferred */
  ZoneRedundantPreferred = "ZoneRedundantPreferred",
}

/**
 * The high availability modes for a cluster. \
 * {@link KnownHighAvailabilityMode} can be used interchangeably with HighAvailabilityMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **SameZone** \
 * **ZoneRedundantPreferred**
 */
export type HighAvailabilityMode = string;

/** The storage properties of the cluster. This includes the data storage size and scaling applied to servers in the cluster. */
export interface StorageProperties {
  /** The size of the data disk assigned to each server. */
  sizeGb?: number;
}

export function storagePropertiesSerializer(
  item: StorageProperties,
): Record<string, unknown> {
  return {
    sizeGb: item["sizeGb"],
  };
}

/** The sharding properties of the cluster. This includes the shard count and scaling options for the cluster. */
export interface ShardingProperties {
  /** Number of shards to provision on the cluster. */
  shardCount?: number;
}

export function shardingPropertiesSerializer(
  item: ShardingProperties,
): Record<string, unknown> {
  return {
    shardCount: item["shardCount"],
  };
}

/** The compute properties of the cluster. This includes the virtual-cores/memory and scaling options applied to servers in the cluster. */
export interface ComputeProperties {
  /** The compute tier to assign to the cluster, where each tier maps to a virtual-core and memory size. Example values: 'M30', 'M40'. */
  tier?: string;
}

export function computePropertiesSerializer(
  item: ComputeProperties,
): Record<string, unknown> {
  return {
    tier: item["tier"],
  };
}

/** The backup properties of the cluster. This includes the earliest restore time and retention settings. */
export interface BackupProperties {
  /** Earliest restore timestamp in UTC ISO8601 format. */
  readonly earliestRestoreTime?: string;
}

export function backupPropertiesSerializer(item: BackupProperties) {
  return item as any;
}

/** The private endpoint connection resource */
export interface PrivateEndpointConnection extends Resource {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionProperties;
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
): Record<string, unknown> {
  return {
    privateEndpoint: !item.privateEndpoint
      ? item.privateEndpoint
      : privateEndpointSerializer(item.privateEndpoint),
    privateLinkServiceConnectionState:
      privateLinkServiceConnectionStateSerializer(
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
): Record<string, unknown> {
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

/** Known values of {@link PreviewFeature} that the service accepts. */
export enum KnownPreviewFeature {
  /** GeoReplicas */
  GeoReplicas = "GeoReplicas",
}

/**
 * Preview features that can be enabled on a mongo cluster. \
 * {@link KnownPreviewFeature} can be used interchangeably with PreviewFeature,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GeoReplicas**
 */
export type PreviewFeature = string;

/** Replica properties of the mongo cluster. */
export interface ReplicationProperties {
  /** The resource id the source cluster for the replica cluster. */
  readonly sourceResourceId?: string;
  /** The replication role of the cluster */
  readonly role?: ReplicationRole;
  /** The replication link state of the replica cluster. */
  readonly replicationState?: ReplicationState;
}

/** Known values of {@link ReplicationRole} that the service accepts. */
export enum KnownReplicationRole {
  /** Primary */
  Primary = "Primary",
  /** AsyncReplica */
  AsyncReplica = "AsyncReplica",
  /** GeoAsyncReplica */
  GeoAsyncReplica = "GeoAsyncReplica",
}

/**
 * Replication role of the mongo cluster. \
 * {@link KnownReplicationRole} can be used interchangeably with ReplicationRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary** \
 * **AsyncReplica** \
 * **GeoAsyncReplica**
 */
export type ReplicationRole = string;

/** Known values of {@link ReplicationState} that the service accepts. */
export enum KnownReplicationState {
  /** Active */
  Active = "Active",
  /** Catchup */
  Catchup = "Catchup",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Updating */
  Updating = "Updating",
  /** Broken */
  Broken = "Broken",
  /** Reconfiguring */
  Reconfiguring = "Reconfiguring",
}

/**
 * The state of the replication link between the replica and source cluster. \
 * {@link KnownReplicationState} can be used interchangeably with ReplicationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active** \
 * **Catchup** \
 * **Provisioning** \
 * **Updating** \
 * **Broken** \
 * **Reconfiguring**
 */
export type ReplicationState = string;

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

/** The response of a PrivateLinkResource list operation. */
export interface _PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
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
): Record<string, unknown> {
  return {
    properties: !item.properties
      ? item.properties
      : privateEndpointConnectionPropertiesSerializer(item.properties),
  };
}

/** Represents a mongo cluster firewall rule. */
export interface FirewallRule extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: FirewallRuleProperties;
}

export function firewallRuleSerializer(
  item: FirewallRule,
): Record<string, unknown> {
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
): Record<string, unknown> {
  return {
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
  };
}

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

export function trackedResourceSerializer(
  item: TrackedResource,
): Record<string, unknown> {
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

export function mongoClusterSerializer(
  item: MongoCluster,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
    properties: !item.properties
      ? item.properties
      : mongoClusterPropertiesSerializer(item.properties),
  };
}

/** The type used for update operations of the MongoCluster. */
export interface MongoClusterUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: MongoClusterUpdateProperties;
}

export function mongoClusterUpdateSerializer(
  item: MongoClusterUpdate,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    properties: !item.properties
      ? item.properties
      : mongoClusterUpdatePropertiesSerializer(item.properties),
  };
}

/** The updatable properties of the MongoCluster. */
export interface MongoClusterUpdateProperties {
  /** The local administrator properties for the mongo cluster. */
  administrator?: AdministratorProperties;
  /** The Mongo DB server version. Defaults to the latest available version if not specified. */
  serverVersion?: string;
  /** Whether or not public endpoint access is allowed for this mongo cluster. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The high availability properties of the mongo cluster. */
  highAvailability?: HighAvailabilityProperties;
  /** The storage properties of the mongo cluster. */
  storage?: StorageProperties;
  /** The sharding properties of the mongo cluster. */
  sharding?: ShardingProperties;
  /** The compute properties of the mongo cluster. */
  compute?: ComputeProperties;
  /** The backup properties of the mongo cluster. */
  backup?: BackupProperties;
  /** List of private endpoint connections. */
  previewFeatures?: PreviewFeature[];
}

export function mongoClusterUpdatePropertiesSerializer(
  item: MongoClusterUpdateProperties,
): Record<string, unknown> {
  return {
    administrator: !item.administrator
      ? item.administrator
      : administratorPropertiesSerializer(item.administrator),
    serverVersion: item["serverVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    highAvailability: !item.highAvailability
      ? item.highAvailability
      : highAvailabilityPropertiesSerializer(item.highAvailability),
    storage: !item.storage
      ? item.storage
      : storagePropertiesSerializer(item.storage),
    sharding: !item.sharding
      ? item.sharding
      : shardingPropertiesSerializer(item.sharding),
    compute: !item.compute
      ? item.compute
      : computePropertiesSerializer(item.compute),
    backup: !item.backup
      ? item.backup
      : backupPropertiesSerializer(item.backup),
    previewFeatures: item["previewFeatures"],
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
  /** Name of the connection string. */
  readonly name?: string;
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
): Record<string, unknown> {
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

/** Promote replica request properties. */
export interface PromoteReplicaRequest {
  /** The promote option to apply to the operation. */
  promoteOption: PromoteOption;
  /** The mode to apply to the promote operation. Value is optional and default value is 'Switchover'. */
  mode?: PromoteMode;
}

export function promoteReplicaRequestSerializer(
  item: PromoteReplicaRequest,
): Record<string, unknown> {
  return {
    promoteOption: item["promoteOption"],
    mode: item["mode"],
  };
}

/** Known values of {@link PromoteOption} that the service accepts. */
export enum KnownPromoteOption {
  /** Forced */
  Forced = "Forced",
}

/**
 * The option to apply to a promote operation. \
 * {@link KnownPromoteOption} can be used interchangeably with PromoteOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Forced**
 */
export type PromoteOption = string;

/** Known values of {@link PromoteMode} that the service accepts. */
export enum KnownPromoteMode {
  /** Switchover */
  Switchover = "Switchover",
}

/**
 * The mode to apply to a promote operation. \
 * {@link KnownPromoteMode} can be used interchangeably with PromoteMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Switchover**
 */
export type PromoteMode = string;

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
export type Versions =
  | "2024-03-01-preview"
  | "2024-06-01-preview"
  | "2024-07-01";
/** Alias for ProvisioningState */
export type ProvisioningState =
  | string
  | ResourceProvisioningState
  | "InProgress"
  | "Updating"
  | "Dropping";
