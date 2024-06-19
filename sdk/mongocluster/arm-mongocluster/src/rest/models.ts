// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** Represents a mongo cluster resource. */
export interface MongoCluster extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: MongoClusterProperties;
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
  /** Whether or not public endpoint access is allowed for this mongo cluster. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The list of node group specs in the cluster. */
  nodeGroupSpecs?: Array<NodeGroupSpec>;
}

/** Parameters used for restore operations */
export interface MongoClusterRestoreParameters {
  /** UTC point in time to restore a mongo cluster */
  pointInTimeUTC?: Date | string;
  /** Resource ID to locate the source cluster to restore */
  sourceResourceId?: string;
}

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

/** The private endpoint connection resource */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionProperties;
}

/** Properties of he private endpoint connection resource */
export interface PrivateEndpointConnectionProperties {
  /** The private endpoint resource */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  provisioningState?: PrivateEndpointConnectionProvisioningState;
}

/** The private endpoint resource */
export interface PrivateEndpoint {
  /** The resource identifier for private endpoint */
  id?: string;
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

/** The base proxy resource. */
export interface ProxyResource extends Resource {}

/** Common properties for all Azure Resource Manager resources. */
export interface Resource {}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** The geo-location where the resource lives */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

/** The resource model definition for an Azure Resource Manager resource with an etag. */
export interface AzureEntityResource extends Resource {}

export interface PrivateLinkResource extends ProxyResource {
  /** Properties of the private link resource. */
  properties?: PrivateLinkResourceProperties;
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

/** Represents a mongo cluster firewall rule. */
export interface FirewallRule extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: FirewallRuleProperties;
}

/** The properties of a mongo cluster firewall rule. */
export interface FirewallRuleProperties {
  /** The start IP address of the mongo cluster firewall rule. Must be IPv4 format. */
  startIpAddress: string;
  /** The end IP address of the mongo cluster firewall rule. Must be IPv4 format. */
  endIpAddress: string;
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface PrivateEndpointConnectionResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateEndpointConnectionProperties;
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface PrivateLinkResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateLinkResourceProperties;
}

/** The type used for update operations of the MongoCluster. */
export interface MongoClusterUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  properties?: MongoClusterUpdateProperties;
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
  nodeGroupSpecs?: Array<NodeGroupSpec>;
}

/** The check availability request body. */
export interface CheckNameAvailabilityRequest {
  /** The name of the resource for which availability needs to be checked. */
  name?: string;
  /** The resource type. */
  type?: string;
}

/** Alias for CreateMode */
export type CreateMode = string | "Default" | "PointInTimeRestore";
/** Alias for ResourceProvisioningState */
export type ResourceProvisioningState =
  | "Succeeded"
  | "Failed"
  | "Canceled"
  | string;
/** Alias for ProvisioningState */
export type ProvisioningState =
  | string
  | ResourceProvisioningState
  | "InProgress"
  | "Updating"
  | "Dropping";
/** Alias for MongoClusterStatus */
export type MongoClusterStatus =
  | string
  | "Ready"
  | "Provisioning"
  | "Updating"
  | "Starting"
  | "Stopping"
  | "Stopped"
  | "Dropping";
/** Alias for PublicNetworkAccess */
export type PublicNetworkAccess = string | "Enabled" | "Disabled";
/** Alias for NodeKind */
export type NodeKind = string | "Shard";
/** Alias for PrivateEndpointServiceConnectionStatus */
export type PrivateEndpointServiceConnectionStatus =
  | "Pending"
  | "Approved"
  | "Rejected"
  | string;
/** Alias for PrivateEndpointConnectionProvisioningState */
export type PrivateEndpointConnectionProvisioningState =
  | ResourceProvisioningState
  | "Creating"
  | "Deleting";
/** Alias for CreatedByType */
export type CreatedByType =
  | "User"
  | "Application"
  | "ManagedIdentity"
  | "Key"
  | string;
