// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface OperationOutput {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplayOutput;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: OriginOutput;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionTypeOutput;
}

/** Localized display information for and operation. */
export interface OperationDisplayOutput {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  description?: string;
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponseOutput {
  /** The error object. */
  error?: ErrorDetailOutput;
}

/** The error detail. */
export interface ErrorDetailOutput {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: Array<ErrorDetailOutput>;
  /** The error additional info. */
  readonly additionalInfo?: Array<ErrorAdditionalInfoOutput>;
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfoOutput {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, any>;
}

/** Represents a mongo cluster resource. */
export interface MongoClusterOutput extends TrackedResourceOutput {
  /** The resource-specific properties for this resource. */
  properties?: MongoClusterPropertiesOutput;
}

/** The properties of a mongo cluster. */
export interface MongoClusterPropertiesOutput {
  /** The mode to create a mongo cluster. */
  createMode?: CreateModeOutput;
  /** The parameters to create a point-in-time restore mongo cluster. */
  restoreParameters?: MongoClusterRestoreParametersOutput;
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
  readonly provisioningState?: ProvisioningStateOutput;
  /** The status of the mongo cluster. */
  readonly clusterStatus?: MongoClusterStatusOutput;
  /** Whether or not public endpoint access is allowed for this mongo cluster. */
  publicNetworkAccess?: PublicNetworkAccessOutput;
  /** The list of node group specs in the cluster. */
  nodeGroupSpecs?: Array<NodeGroupSpecOutput>;
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: Array<PrivateEndpointConnectionOutput>;
}

/** Parameters used for restore operations */
export interface MongoClusterRestoreParametersOutput {
  /** UTC point in time to restore a mongo cluster */
  pointInTimeUTC?: string;
  /** Resource ID to locate the source cluster to restore */
  sourceResourceId?: string;
}

/** Specification for a node group. */
export interface NodeGroupSpecOutput {
  /** The resource sku for the node group. This defines the size of CPU and memory that is provisioned for each node. Example values: 'M30', 'M40'. */
  sku?: string;
  /** The disk storage size for the node group in GB. Example values: 128, 256, 512, 1024. */
  diskSizeGB?: number;
  /** Whether high availability is enabled on the node group. */
  enableHa?: boolean;
  /** The node type deployed in the node group. */
  kind?: NodeKindOutput;
  /** The number of nodes in the node group. */
  nodeCount?: number;
}

/** The private endpoint connection resource */
export interface PrivateEndpointConnectionOutput extends ProxyResourceOutput {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionPropertiesOutput;
}

/** Properties of he private endpoint connection resource */
export interface PrivateEndpointConnectionPropertiesOutput {
  /** The group identifiers for the private endpoint resource */
  readonly groupIds?: string[];
  /** The private endpoint resource */
  privateEndpoint?: PrivateEndpointOutput;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionStateOutput;
  /** The provisioning state of the private endpoint connection resource. */
  provisioningState?: PrivateEndpointConnectionProvisioningStateOutput;
}

/** The private endpoint resource */
export interface PrivateEndpointOutput {
  /** The resource identifier for private endpoint */
  id?: string;
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionStateOutput {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatusOutput;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

/** The base proxy resource. */
export interface ProxyResourceOutput extends ResourceOutput {}

/** Common properties for all Azure Resource Manager resources. */
export interface ResourceOutput {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemDataOutput;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemDataOutput {
  /** The identity that created the resource. */
  readonly createdBy?: string;
  /** The type of identity that created the resource. */
  readonly createdByType?: CreatedByTypeOutput;
  /** The type of identity that created the resource. */
  readonly createdAt?: string;
  /** The identity that last modified the resource. */
  readonly lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  readonly lastModifiedByType?: CreatedByTypeOutput;
  /** The timestamp of resource last modification (UTC) */
  readonly lastModifiedAt?: string;
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResourceOutput extends ResourceOutput {
  /** The geo-location where the resource lives */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** The base extension resource. */
export interface ExtensionResourceOutput extends ResourceOutput {}

/** The resource model definition for an Azure Resource Manager resource with an etag. */
export interface AzureEntityResourceOutput extends ResourceOutput {
  /** Resource Etag. */
  readonly etag: string;
}

export interface PrivateLinkResourceOutput extends ProxyResourceOutput {
  /** Properties of the private link resource. */
  properties?: PrivateLinkResourcePropertiesOutput;
}

/** Properties of a private link resource. */
export interface PrivateLinkResourcePropertiesOutput {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

/** Represents a mongo cluster firewall rule. */
export interface FirewallRuleOutput extends ProxyResourceOutput {
  /** The resource-specific properties for this resource. */
  properties?: FirewallRulePropertiesOutput;
}

/** The properties of a mongo cluster firewall rule. */
export interface FirewallRulePropertiesOutput {
  /** The provisioning state of the firewall rule. */
  readonly provisioningState?: ProvisioningStateOutput;
  /** The start IP address of the mongo cluster firewall rule. Must be IPv4 format. */
  startIpAddress: string;
  /** The end IP address of the mongo cluster firewall rule. Must be IPv4 format. */
  endIpAddress: string;
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface PrivateEndpointConnectionResourceOutput
  extends ProxyResourceOutput {
  /** The resource-specific properties for this resource. */
  properties?: PrivateEndpointConnectionPropertiesOutput;
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface PrivateLinkResourceOutput extends ProxyResourceOutput {
  /** The resource-specific properties for this resource. */
  properties?: PrivateLinkResourcePropertiesOutput;
}

/** The connection strings for the given mongo cluster. */
export interface ListConnectionStringsResultOutput {
  /** An array that contains the connection strings for a mongo cluster. */
  readonly connectionStrings?: Array<ConnectionStringOutput>;
}

/** Connection string for the mongo cluster */
export interface ConnectionStringOutput {
  /** Value of the connection string */
  readonly connectionString?: string;
  /** Description of the connection string */
  readonly description?: string;
}

/** The check availability result. */
export interface CheckNameAvailabilityResponseOutput {
  /** Indicates if the resource name is available. */
  nameAvailable?: boolean;
  /** The reason why the given name is not available. */
  reason?: CheckNameAvailabilityReasonOutput;
  /** Detailed reason why the given name is not available. */
  message?: string;
}

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export type PagedOperationOutput = Paged<OperationOutput>;
/** Alias for OriginOutput */
export type OriginOutput = "user" | "system" | "user,system" | string;
/** Alias for ActionTypeOutput */
export type ActionTypeOutput = "Internal" | string;
/** Alias for CreateModeOutput */
export type CreateModeOutput = string | "Default" | "PointInTimeRestore";
/** Alias for ResourceProvisioningStateOutput */
export type ResourceProvisioningStateOutput =
  | "Succeeded"
  | "Failed"
  | "Canceled"
  | string;
/** Alias for ProvisioningStateOutput */
export type ProvisioningStateOutput =
  | string
  | ResourceProvisioningStateOutput
  | "InProgress"
  | "Updating"
  | "Dropping";
/** Alias for MongoClusterStatusOutput */
export type MongoClusterStatusOutput =
  | string
  | "Ready"
  | "Provisioning"
  | "Updating"
  | "Starting"
  | "Stopping"
  | "Stopped"
  | "Dropping";
/** Alias for PublicNetworkAccessOutput */
export type PublicNetworkAccessOutput = string | "Enabled" | "Disabled";
/** Alias for NodeKindOutput */
export type NodeKindOutput = string | "Shard";
/** Alias for PrivateEndpointServiceConnectionStatusOutput */
export type PrivateEndpointServiceConnectionStatusOutput =
  | "Pending"
  | "Approved"
  | "Rejected"
  | string;
/** Alias for PrivateEndpointConnectionProvisioningStateOutput */
export type PrivateEndpointConnectionProvisioningStateOutput =
  | ResourceProvisioningStateOutput
  | "Creating"
  | "Deleting";
/** Alias for CreatedByTypeOutput */
export type CreatedByTypeOutput =
  | "User"
  | "Application"
  | "ManagedIdentity"
  | "Key"
  | string;
/** The response of a MongoCluster list operation. */
export type MongoClusterListResultOutput = Paged<MongoClusterOutput>;
/** Alias for CheckNameAvailabilityReasonOutput */
export type CheckNameAvailabilityReasonOutput =
  | "Invalid"
  | "AlreadyExists"
  | string;
/** The response of a FirewallRule list operation. */
export type FirewallRuleListResultOutput = Paged<FirewallRuleOutput>;
/** The response of a PrivateEndpointConnectionResource list operation. */
export type PrivateEndpointConnectionResourceListResultOutput =
  Paged<PrivateEndpointConnectionResourceOutput>;
/** The response of a PrivateLinkResource list operation. */
export type PrivateLinkResourceListResultOutput =
  Paged<PrivateLinkResourceOutput>;
