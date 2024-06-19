// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The response of a PrivateLinkResource list operation. */
export interface PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Common properties for all Azure Resource Manager resources. */
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

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  readonly createdBy?: string;
  /** The type of identity that created the resource. */
  readonly createdByType?: CreatedByType;
  /** The type of identity that created the resource. */
  readonly createdAt?: Date;
  /** The identity that last modified the resource. */
  readonly lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  readonly lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  readonly lastModifiedAt?: Date;
}

/** The kind of entity that created the resource. */
/** "User", "Application", "ManagedIdentity", "Key" */
export type CreatedByType = string;

/** The base proxy resource. */
export interface ProxyResource extends Resource {}

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
export interface PrivateEndpointConnectionResourceListResult {
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

/** Properties of he private endpoint connection resource */
export interface PrivateEndpointConnectionProperties {
  /** The group identifiers for the private endpoint resource */
  readonly groupIds?: string[];
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

/** The private endpoint connection status */
/** "Pending", "Approved", "Rejected" */
export type PrivateEndpointServiceConnectionStatus = string;
/** The provisioning state of a resource type. */
/** "Succeeded", "Failed", "Canceled" */
export type ResourceProvisioningState = string;

/** Standard Azure Resource Manager operation status response */
export interface ArmOperationStatus {
  /** The operation status */
  status: ResourceProvisioningState;
  /** The name of the  operationStatus resource */
  readonly name?: string;
  /** Operation start time */
  readonly startTime?: Date;
  /** Operation complete time */
  readonly endTime?: Date;
  /** The progress made toward completing the operation */
  readonly percentComplete?: number;
  /** Errors that occurred if the operation ended with Canceled or Failed status */
  readonly error?: ErrorDetail;
}

/** Represents a mongo cluster firewall rule. */
export interface FirewallRule extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: FirewallRuleProperties;
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

/** The response of a FirewallRule list operation. */
export interface FirewallRuleListResult {
  /** The FirewallRule items on this page */
  value: FirewallRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** The geo-location where the resource lives */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

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

/** The mode that the Mongo Cluster is created with. */
/** "Default", "PointInTimeRestore" */
export type CreateMode = string;

/** Parameters used for restore operations */
export interface MongoClusterRestoreParameters {
  /** UTC point in time to restore a mongo cluster */
  pointInTimeUTC?: Date;
  /** Resource ID to locate the source cluster to restore */
  sourceResourceId?: string;
}

/** The status of the Mongo cluster resource. */
/** "Ready", "Provisioning", "Updating", "Starting", "Stopping", "Stopped", "Dropping" */
export type MongoClusterStatus = string;
/** Whether or not public endpoint access is allowed for this Mongo cluster.  Value is optional and default value is 'Enabled' */
/** "Enabled", "Disabled" */
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

/** The kind of the node on the cluster. */
/** "Shard" */
export type NodeKind = string;

/** The private endpoint connection resource */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionProperties;
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
  nodeGroupSpecs?: NodeGroupSpec[];
}

/** The response of a MongoCluster list operation. */
export interface MongoClusterListResult {
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

/** The check availability result. */
export interface CheckNameAvailabilityResponse {
  /** Indicates if the resource name is available. */
  nameAvailable?: boolean;
  /** The reason why the given name is not available. */
  reason?: CheckNameAvailabilityReason;
  /** Detailed reason why the given name is not available. */
  message?: string;
}

/** Possible reasons for a name not being available. */
/** "Invalid", "AlreadyExists" */
export type CheckNameAvailabilityReason = string;

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface PagedOperation {
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
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionType;
}

/** Localized display information for and operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  description?: string;
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
/** "user", "system", "user,system" */
export type Origin = string;
/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
/** "Internal" */
export type ActionType = string;
/** The available API versions. */
/** */
export type Versions = "2024-03-01-preview";
/** Alias for PrivateEndpointConnectionProvisioningState */
export type PrivateEndpointConnectionProvisioningState =
  | ResourceProvisioningState
  | "Creating"
  | "Deleting";
/** Alias for ProvisioningState */
export type ProvisioningState =
  | string
  | ResourceProvisioningState
  | "InProgress"
  | "Updating"
  | "Dropping";
