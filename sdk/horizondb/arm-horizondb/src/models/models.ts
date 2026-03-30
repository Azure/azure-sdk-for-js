// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

/** Represents the HorizonDb cluster. */
export interface HorizonDbCluster extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: HorizonDbClusterProperties;
}

export function horizonDbClusterSerializer(item: HorizonDbCluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : horizonDbClusterPropertiesSerializer(item["properties"]),
  };
}

export function horizonDbClusterDeserializer(item: any): HorizonDbCluster {
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
      : horizonDbClusterPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a HorizonDb cluster. */
export interface HorizonDbClusterProperties {
  /** The administrator login name. */
  administratorLogin: string;
  /** The administrator login password. */
  administratorLoginPassword?: string;
  /** The version of the HorizonDb cluster. */
  version?: string;
  /** The mode to create a new HorizonDb cluster. */
  createMode?: CreateModeCluster;
  /** Restore point creation time specifying the time to restore from. */
  pointInTimeUTC?: Date;
  /** The source cluster resource ID for restore or replica creation. */
  sourceClusterResourceId?: string;
  /** The pool name for restore or replica operations. */
  poolName?: string;
  /** Number of replicas. */
  replicaCount?: number;
  /** Number of vCores. */
  vCores?: number;
  /** The processor type for the HorizonDb cluster. */
  processorType?: string;
  /** The network related info. */
  network?: Network;
  /** Current state of the cluster. */
  readonly state?: State;
  /** The fully qualified domain name of the cluster. */
  readonly fullyQualifiedDomainName?: string;
  /** The fully qualified domain name used for readonly endpoint for the cluster. */
  readonly readonlyEndpoint?: string;
  /** The provisioning state of the cluster. */
  readonly provisioningState?: ProvisioningState;
  /** Defines how replicas are placed across availability zones. */
  zonePlacementPolicy?: ZonePlacementPolicy;
  /** Defines connection to a parameter group. */
  parameterGroup?: HorizonDbClusterParameterGroupConnectionProperties;
}

export function horizonDbClusterPropertiesSerializer(item: HorizonDbClusterProperties): any {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    createMode: item["createMode"],
    pointInTimeUTC: !item["pointInTimeUTC"]
      ? item["pointInTimeUTC"]
      : item["pointInTimeUTC"].toISOString(),
    sourceClusterResourceId: item["sourceClusterResourceId"],
    poolName: item["poolName"],
    replicaCount: item["replicaCount"],
    vCores: item["vCores"],
    processorType: item["processorType"],
    network: !item["network"] ? item["network"] : networkSerializer(item["network"]),
    zonePlacementPolicy: item["zonePlacementPolicy"],
    parameterGroup: !item["parameterGroup"]
      ? item["parameterGroup"]
      : horizonDbClusterParameterGroupConnectionPropertiesSerializer(item["parameterGroup"]),
  };
}

export function horizonDbClusterPropertiesDeserializer(item: any): HorizonDbClusterProperties {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    createMode: item["createMode"],
    pointInTimeUTC: !item["pointInTimeUTC"]
      ? item["pointInTimeUTC"]
      : new Date(item["pointInTimeUTC"]),
    sourceClusterResourceId: item["sourceClusterResourceId"],
    poolName: item["poolName"],
    replicaCount: item["replicaCount"],
    vCores: item["vCores"],
    processorType: item["processorType"],
    network: !item["network"] ? item["network"] : networkDeserializer(item["network"]),
    state: item["state"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    readonlyEndpoint: item["readonlyEndpoint"],
    provisioningState: item["provisioningState"],
    zonePlacementPolicy: item["zonePlacementPolicy"],
    parameterGroup: !item["parameterGroup"]
      ? item["parameterGroup"]
      : horizonDbClusterParameterGroupConnectionPropertiesDeserializer(item["parameterGroup"]),
  };
}

/** The mode to create a new HorizonDb cluster. */
export enum KnownCreateModeCluster {
  /** Create a new cluster */
  Create = "Create",
  /** Update an existing cluster */
  Update = "Update",
  /** Create cluster from point-in-time restore */
  PointInTimeRestore = "PointInTimeRestore",
}

/**
 * The mode to create a new HorizonDb cluster. \
 * {@link KnownCreateModeCluster} can be used interchangeably with CreateModeCluster,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Create**: Create a new cluster \
 * **Update**: Update an existing cluster \
 * **PointInTimeRestore**: Create cluster from point-in-time restore
 */
export type CreateModeCluster = string;

/** Network properties. */
export interface Network {
  /** The flag indicating whether public ip is requested. */
  readonly publicNetworkAccess?: PublicNetworkAccessState;
}

export function networkSerializer(item: Network): any {
  return item;
}

export function networkDeserializer(item: any): Network {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** Indicates if public network access is enabled or not. */
export enum KnownPublicNetworkAccessState {
  /** Public network access is enabled */
  Enabled = "Enabled",
  /** Public network access is disabled */
  Disabled = "Disabled",
}

/**
 * Indicates if public network access is enabled or not. \
 * {@link KnownPublicNetworkAccessState} can be used interchangeably with PublicNetworkAccessState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Public network access is enabled \
 * **Disabled**: Public network access is disabled
 */
export type PublicNetworkAccessState = string;

/** Current states. */
export enum KnownState {
  /** Is ready and operational */
  Ready = "Ready",
  /** Is being dropped/deleted */
  Dropping = "Dropping",
  /** Is disabled */
  Disabled = "Disabled",
  /** Is starting up */
  Starting = "Starting",
  /** Is stopping */
  Stopping = "Stopping",
  /** Is stopped */
  Stopped = "Stopped",
  /** Is being updated */
  Updating = "Updating",
  /** Is healthy */
  Healthy = "Healthy",
}

/**
 * Current states. \
 * {@link KnownState} can be used interchangeably with State,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: Is ready and operational \
 * **Dropping**: Is being dropped\/deleted \
 * **Disabled**: Is disabled \
 * **Starting**: Is starting up \
 * **Stopping**: Is stopping \
 * **Stopped**: Is stopped \
 * **Updating**: Is being updated \
 * **Healthy**: Is healthy
 */
export type State = string;

/** The provisioning state. */
export enum KnownProvisioningState {
  /** Provisioning completed successfully */
  Succeeded = "Succeeded",
  /** Provisioning failed */
  Failed = "Failed",
  /** Provisioning was canceled */
  Canceled = "Canceled",
  /** Provisioning is in progress */
  InProgress = "InProgress",
  /** Provisioning is in progress */
  Provisioning = "Provisioning",
}

/**
 * The provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Provisioning completed successfully \
 * **Failed**: Provisioning failed \
 * **Canceled**: Provisioning was canceled \
 * **InProgress**: Provisioning is in progress \
 * **Provisioning**: Provisioning is in progress
 */
export type ProvisioningState = string;

/** The zone redundancy option for the cluster. */
export enum KnownZonePlacementPolicy {
  /** Enforce zonal redundancy */
  Strict = "Strict",
  /** Best-effort placement (default) */
  BestEffort = "BestEffort",
}

/**
 * The zone redundancy option for the cluster. \
 * {@link KnownZonePlacementPolicy} can be used interchangeably with ZonePlacementPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Strict**: Enforce zonal redundancy \
 * **BestEffort**: Best-effort placement (default)
 */
export type ZonePlacementPolicy = string;

/** Connection information for HorizonDb parameter group. */
export interface HorizonDbClusterParameterGroupConnectionProperties {
  /** The resource ID of the connected parameter group. */
  id?: string;
  /** Indication of if parameter group is applied on HorizonDb resource. */
  readonly syncStatus?: string;
  /** Indicates whether the parameters should be applied immediately. */
  applyImmediately?: boolean;
}

export function horizonDbClusterParameterGroupConnectionPropertiesSerializer(
  item: HorizonDbClusterParameterGroupConnectionProperties,
): any {
  return { id: item["id"], applyImmediately: item["applyImmediately"] };
}

export function horizonDbClusterParameterGroupConnectionPropertiesDeserializer(
  item: any,
): HorizonDbClusterParameterGroupConnectionProperties {
  return {
    id: item["id"],
    syncStatus: item["syncStatus"],
    applyImmediately: item["applyImmediately"],
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

export function resourceSerializer(item: Resource): any {
  return item;
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

/** HorizonDb cluster for update operations. */
export interface HorizonDbClusterForPatchUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The properties that can be updated for a HorizonDb cluster. */
  properties?: HorizonDbClusterPropertiesForPatchUpdate;
}

export function horizonDbClusterForPatchUpdateSerializer(
  item: HorizonDbClusterForPatchUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : horizonDbClusterPropertiesForPatchUpdateSerializer(item["properties"]),
  };
}

/** Properties of a HorizonDb cluster for update operations. */
export interface HorizonDbClusterPropertiesForPatchUpdate {
  /** The administrator login password. */
  administratorLoginPassword?: string;
  /** Number of vCores. */
  vCores?: number;
  /** Defines connection to a parameter group. */
  parameterGroup?: HorizonDbClusterParameterGroupConnectionProperties;
}

export function horizonDbClusterPropertiesForPatchUpdateSerializer(
  item: HorizonDbClusterPropertiesForPatchUpdate,
): any {
  return {
    administratorLoginPassword: item["administratorLoginPassword"],
    vCores: item["vCores"],
    parameterGroup: !item["parameterGroup"]
      ? item["parameterGroup"]
      : horizonDbClusterParameterGroupConnectionPropertiesSerializer(item["parameterGroup"]),
  };
}

/** The response of a HorizonDbCluster list operation. */
export interface _HorizonDbClusterListResult {
  /** The HorizonDbCluster items on this page */
  value: HorizonDbCluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _horizonDbClusterListResultDeserializer(item: any): _HorizonDbClusterListResult {
  return {
    value: horizonDbClusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function horizonDbClusterArraySerializer(result: Array<HorizonDbCluster>): any[] {
  return result.map((item) => {
    return horizonDbClusterSerializer(item);
  });
}

export function horizonDbClusterArrayDeserializer(result: Array<HorizonDbCluster>): any[] {
  return result.map((item) => {
    return horizonDbClusterDeserializer(item);
  });
}

/** Represents the HorizonDb pool. */
export interface HorizonDbPool extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: HorizonDbPoolProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function horizonDbPoolDeserializer(item: any): HorizonDbPool {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : horizonDbPoolPropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Properties of a HorizonDb pool. */
export interface HorizonDbPoolProperties {
  /** The location of the HorizonDb pool. */
  location?: string;
  /** Current state of the pool. */
  readonly state?: State;
  /** Number of replicas in the pool. */
  readonly replicaCount?: number;
  /** The version of the HorizonDb pool. */
  readonly version?: string;
  /** The create mode for the pool. */
  readonly createMode?: CreateModePool;
  /** The provisioning state of the pool. */
  readonly provisioningState?: ProvisioningState;
}

export function horizonDbPoolPropertiesDeserializer(item: any): HorizonDbPoolProperties {
  return {
    location: item["location"],
    state: item["state"],
    replicaCount: item["replicaCount"],
    version: item["version"],
    createMode: item["createMode"],
    provisioningState: item["provisioningState"],
  };
}

/** The mode to create a new HorizonDb cluster. */
export enum KnownCreateModePool {
  /** Create a new pool */
  Create = "Create",
  /** Update an existing pool */
  Update = "Update",
}

/**
 * The mode to create a new HorizonDb cluster. \
 * {@link KnownCreateModePool} can be used interchangeably with CreateModePool,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Create**: Create a new pool \
 * **Update**: Update an existing pool
 */
export type CreateModePool = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
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

/** The response of a HorizonDbPool list operation. */
export interface _HorizonDbPoolListResult {
  /** The HorizonDbPool items on this page */
  value: HorizonDbPool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _horizonDbPoolListResultDeserializer(item: any): _HorizonDbPoolListResult {
  return {
    value: horizonDbPoolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function horizonDbPoolArrayDeserializer(result: Array<HorizonDbPool>): any[] {
  return result.map((item) => {
    return horizonDbPoolDeserializer(item);
  });
}

/** Represents the HorizonDb replica. */
export interface HorizonDbReplica extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: HorizonDbReplicaProperties;
}

export function horizonDbReplicaSerializer(item: HorizonDbReplica): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : horizonDbReplicaPropertiesSerializer(item["properties"]),
  };
}

export function horizonDbReplicaDeserializer(item: any): HorizonDbReplica {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : horizonDbReplicaPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a HorizonDb replica. */
export interface HorizonDbReplicaProperties {
  /** Role of the replica. */
  role?: ReplicaRole;
  /** Current status of the replica. */
  readonly status?: State;
  /** The fully qualified domain name of the replica. */
  readonly fullyQualifiedDomainName?: string;
  /** The availability zone of the replica. */
  availabilityZone?: string;
  /** The provisioning state of the replica. */
  readonly provisioningState?: ProvisioningState;
}

export function horizonDbReplicaPropertiesSerializer(item: HorizonDbReplicaProperties): any {
  return { role: item["role"], availabilityZone: item["availabilityZone"] };
}

export function horizonDbReplicaPropertiesDeserializer(item: any): HorizonDbReplicaProperties {
  return {
    role: item["role"],
    status: item["status"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    availabilityZone: item["availabilityZone"],
    provisioningState: item["provisioningState"],
  };
}

/** Role of the replica. */
export enum KnownReplicaRole {
  /** Read-only replica */
  Read = "Read",
  /** ReadWrite replica */
  ReadWrite = "ReadWrite",
}

/**
 * Role of the replica. \
 * {@link KnownReplicaRole} can be used interchangeably with ReplicaRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Read**: Read-only replica \
 * **ReadWrite**: ReadWrite replica
 */
export type ReplicaRole = string;

/** The response of a HorizonDbReplica list operation. */
export interface _HorizonDbReplicaListResult {
  /** The HorizonDbReplica items on this page */
  value: HorizonDbReplica[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _horizonDbReplicaListResultDeserializer(item: any): _HorizonDbReplicaListResult {
  return {
    value: horizonDbReplicaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function horizonDbReplicaArraySerializer(result: Array<HorizonDbReplica>): any[] {
  return result.map((item) => {
    return horizonDbReplicaSerializer(item);
  });
}

export function horizonDbReplicaArrayDeserializer(result: Array<HorizonDbReplica>): any[] {
  return result.map((item) => {
    return horizonDbReplicaDeserializer(item);
  });
}

/** HorizonDb replica for update operations. */
export interface HorizonDbReplicaForPatchUpdate {
  /** Properties of a HorizonDb replica for update operations. */
  properties?: HorizonDbReplicaPropertiesForPatchUpdate;
}

export function horizonDbReplicaForPatchUpdateSerializer(
  item: HorizonDbReplicaForPatchUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : horizonDbReplicaPropertiesForPatchUpdateSerializer(item["properties"]),
  };
}

/** Properties of a HorizonDb replica for update operations. */
export interface HorizonDbReplicaPropertiesForPatchUpdate {
  /** Role of the replica. */
  role?: ReplicaRole;
}

export function horizonDbReplicaPropertiesForPatchUpdateSerializer(
  item: HorizonDbReplicaPropertiesForPatchUpdate,
): any {
  return { role: item["role"] };
}

/** Represents the HorizonDb firewall rule. */
export interface HorizonDbFirewallRule extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: HorizonDbFirewallRuleProperties;
}

export function horizonDbFirewallRuleSerializer(item: HorizonDbFirewallRule): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : horizonDbFirewallRulePropertiesSerializer(item["properties"]),
  };
}

export function horizonDbFirewallRuleDeserializer(item: any): HorizonDbFirewallRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : horizonDbFirewallRulePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a HorizonDb firewall rule. */
export interface HorizonDbFirewallRuleProperties {
  /** The start IP address of the firewall rule (IPv4). */
  startIpAddress: string;
  /** The end IP address of the firewall rule (IPv4). */
  endIpAddress: string;
  /** The description of the HorizonDb firewall rule. */
  description?: string;
  /** The provisioning state of the firewall rule. */
  readonly provisioningState?: ProvisioningState;
}

export function horizonDbFirewallRulePropertiesSerializer(
  item: HorizonDbFirewallRuleProperties,
): any {
  return {
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
    description: item["description"],
  };
}

export function horizonDbFirewallRulePropertiesDeserializer(
  item: any,
): HorizonDbFirewallRuleProperties {
  return {
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
    description: item["description"],
    provisioningState: item["provisioningState"],
  };
}

/** The response of a HorizonDbFirewallRule list operation. */
export interface _HorizonDbFirewallRuleListResult {
  /** The HorizonDbFirewallRule items on this page */
  value: HorizonDbFirewallRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _horizonDbFirewallRuleListResultDeserializer(
  item: any,
): _HorizonDbFirewallRuleListResult {
  return {
    value: horizonDbFirewallRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function horizonDbFirewallRuleArraySerializer(result: Array<HorizonDbFirewallRule>): any[] {
  return result.map((item) => {
    return horizonDbFirewallRuleSerializer(item);
  });
}

export function horizonDbFirewallRuleArrayDeserializer(
  result: Array<HorizonDbFirewallRule>,
): any[] {
  return result.map((item) => {
    return horizonDbFirewallRuleDeserializer(item);
  });
}

/** A private endpoint connection resource */
export interface PrivateEndpointConnectionResource extends Resource {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionResourceDeserializer(
  item: any,
): PrivateEndpointConnectionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
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

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
  };
}

/** The private endpoint resource. */
export interface PrivateEndpoint {
  /** The resource identifier of the private endpoint */
  readonly id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return item;
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
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
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The private endpoint connection status. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /** Connection waiting for approval or rejection */
  Pending = "Pending",
  /** Connection approved */
  Approved = "Approved",
  /** Connection Rejected */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Connection waiting for approval or rejection \
 * **Approved**: Connection approved \
 * **Rejected**: Connection Rejected
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Connection has been provisioned */
  Succeeded = "Succeeded",
  /** Connection is being created */
  Creating = "Creating",
  /** Connection is being deleted */
  Deleting = "Deleting",
  /** Connection provisioning has failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Connection has been provisioned \
 * **Creating**: Connection is being created \
 * **Deleting**: Connection is being deleted \
 * **Failed**: Connection provisioning has failed
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** The response of a PrivateEndpointConnectionResource list operation. */
export interface _PrivateEndpointConnectionResourceListResult {
  /** The PrivateEndpointConnectionResource items on this page */
  value: PrivateEndpointConnectionResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionResourceListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionResourceListResult {
  return {
    value: privateEndpointConnectionResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateEndpointConnectionResourceArrayDeserializer(
  result: Array<PrivateEndpointConnectionResource>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionResourceDeserializer(item);
  });
}

/** PATCH model for private endpoint connections */
export interface PrivateEndpointConnectionUpdate {
  /** The private endpoint connection properties */
  properties?: OptionalPropertiesUpdateableProperties;
}

export function privateEndpointConnectionUpdateSerializer(
  item: PrivateEndpointConnectionUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : optionalPropertiesUpdateablePropertiesSerializer(item["properties"]),
  };
}

/** The template for adding optional properties. */
export interface OptionalPropertiesUpdateableProperties {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function optionalPropertiesUpdateablePropertiesSerializer(
  item: OptionalPropertiesUpdateableProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

/** The private endpoint connection resource */
export interface PrivateEndpointConnection extends Resource {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Represents the HorizonDb private link resource. */
export interface HorizonDbPrivateLinkResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateLinkResourceProperties;
}

export function horizonDbPrivateLinkResourceDeserializer(item: any): HorizonDbPrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
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

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a HorizonDbPrivateLinkResource list operation. */
export interface _HorizonDbPrivateLinkResourceListResult {
  /** The HorizonDbPrivateLinkResource items on this page */
  value: HorizonDbPrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _horizonDbPrivateLinkResourceListResultDeserializer(
  item: any,
): _HorizonDbPrivateLinkResourceListResult {
  return {
    value: horizonDbPrivateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function horizonDbPrivateLinkResourceArrayDeserializer(
  result: Array<HorizonDbPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return horizonDbPrivateLinkResourceDeserializer(item);
  });
}

/** Represents the HorizonDb parameter group. */
export interface HorizonDbParameterGroup extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: HorizonDbParameterGroupProperties;
}

export function horizonDbParameterGroupSerializer(item: HorizonDbParameterGroup): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : horizonDbParameterGroupPropertiesSerializer(item["properties"]),
  };
}

export function horizonDbParameterGroupDeserializer(item: any): HorizonDbParameterGroup {
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
      : horizonDbParameterGroupPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a HorizonDb parameter group. */
export interface HorizonDbParameterGroupProperties {
  /** Parameters in the parameter group. */
  parameters?: ParameterProperties[];
  /** Description of the parameter group. */
  description?: string;
  /** PostgreSQL version for the parameter group. */
  pgVersion?: number;
  /** Current version of the parameter group. */
  readonly version?: number;
  /** Indicates whether the parameters should be applied immediately. */
  applyImmediately?: boolean;
  /** The provisioning state of the parameter group. */
  readonly provisioningState?: ProvisioningState;
}

export function horizonDbParameterGroupPropertiesSerializer(
  item: HorizonDbParameterGroupProperties,
): any {
  return {
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterPropertiesArraySerializer(item["parameters"]),
    description: item["description"],
    pgVersion: item["pgVersion"],
    applyImmediately: item["applyImmediately"],
  };
}

export function horizonDbParameterGroupPropertiesDeserializer(
  item: any,
): HorizonDbParameterGroupProperties {
  return {
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterPropertiesArrayDeserializer(item["parameters"]),
    description: item["description"],
    pgVersion: item["pgVersion"],
    version: item["version"],
    applyImmediately: item["applyImmediately"],
    provisioningState: item["provisioningState"],
  };
}

export function parameterPropertiesArraySerializer(result: Array<ParameterProperties>): any[] {
  return result.map((item) => {
    return parameterPropertiesSerializer(item);
  });
}

export function parameterPropertiesArrayDeserializer(result: Array<ParameterProperties>): any[] {
  return result.map((item) => {
    return parameterPropertiesDeserializer(item);
  });
}

/** Properties of a HorizonDb parameters. */
export interface ParameterProperties {
  /** The name of the parameter. */
  name?: string;
  /** The description of the parameter. */
  readonly description?: string;
  /** The value of the configuration. */
  value?: string;
  /** The data type of the parameter. */
  readonly dataType?: string;
  /** The allowed values for the parameter. */
  readonly allowedValues?: string;
  /** Whether the parameter can be changed dynamically. */
  readonly isDynamic?: boolean;
  /** Whether the parameter is a read-only parameter. */
  readonly isReadOnly?: boolean;
  /** Link to parameter documentation. */
  readonly documentationLink?: string;
  /** The unit of measurement for the parameter. */
  readonly unit?: string;
}

export function parameterPropertiesSerializer(item: ParameterProperties): any {
  return { name: item["name"], value: item["value"] };
}

export function parameterPropertiesDeserializer(item: any): ParameterProperties {
  return {
    name: item["name"],
    description: item["description"],
    value: item["value"],
    dataType: item["dataType"],
    allowedValues: item["allowedValues"],
    isDynamic: item["isDynamic"],
    isReadOnly: item["isReadOnly"],
    documentationLink: item["documentationLink"],
    unit: item["unit"],
  };
}

/** HorizonDb parameter group for update operations. */
export interface HorizonDbParameterGroupForPatchUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The properties that can be updated for a HorizonDb parameter group. */
  properties?: HorizonDbParameterGroupPropertiesForPatchUpdate;
}

export function horizonDbParameterGroupForPatchUpdateSerializer(
  item: HorizonDbParameterGroupForPatchUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : horizonDbParameterGroupPropertiesForPatchUpdateSerializer(item["properties"]),
  };
}

/** Properties of a HorizonDb parameter group for update operations. */
export interface HorizonDbParameterGroupPropertiesForPatchUpdate {
  /** Parameters in the parameter group. */
  parameters?: ParameterProperties[];
  /** Description of the parameter group. */
  description?: string;
  /** Indicates whether the parameters should be applied immediately. */
  applyImmediately?: boolean;
}

export function horizonDbParameterGroupPropertiesForPatchUpdateSerializer(
  item: HorizonDbParameterGroupPropertiesForPatchUpdate,
): any {
  return {
    parameters: !item["parameters"]
      ? item["parameters"]
      : parameterPropertiesArraySerializer(item["parameters"]),
    description: item["description"],
    applyImmediately: item["applyImmediately"],
  };
}

/** The response of a HorizonDbParameterGroup list operation. */
export interface _HorizonDbParameterGroupListResult {
  /** The HorizonDbParameterGroup items on this page */
  value: HorizonDbParameterGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _horizonDbParameterGroupListResultDeserializer(
  item: any,
): _HorizonDbParameterGroupListResult {
  return {
    value: horizonDbParameterGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function horizonDbParameterGroupArraySerializer(
  result: Array<HorizonDbParameterGroup>,
): any[] {
  return result.map((item) => {
    return horizonDbParameterGroupSerializer(item);
  });
}

export function horizonDbParameterGroupArrayDeserializer(
  result: Array<HorizonDbParameterGroup>,
): any[] {
  return result.map((item) => {
    return horizonDbParameterGroupDeserializer(item);
  });
}

/** The response of a HorizonDbParameterGroupConnectionProperties list operation. */
export interface _HorizonDbParameterGroupConnectionPropertiesListResult {
  /** The HorizonDbParameterGroupConnectionProperties items on this page */
  value: HorizonDbParameterGroupConnectionProperties[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _horizonDbParameterGroupConnectionPropertiesListResultDeserializer(
  item: any,
): _HorizonDbParameterGroupConnectionPropertiesListResult {
  return {
    value: horizonDbParameterGroupConnectionPropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function horizonDbParameterGroupConnectionPropertiesArrayDeserializer(
  result: Array<HorizonDbParameterGroupConnectionProperties>,
): any[] {
  return result.map((item) => {
    return horizonDbParameterGroupConnectionPropertiesDeserializer(item);
  });
}

/** Connection information for HorizonDb parameter group. */
export interface HorizonDbParameterGroupConnectionProperties {
  /** The name of the connected resource. */
  readonly name?: string;
  /** The resource ID of the connected resource. */
  readonly id?: string;
  /** The type of the resource. */
  readonly type?: string;
}

export function horizonDbParameterGroupConnectionPropertiesDeserializer(
  item: any,
): HorizonDbParameterGroupConnectionProperties {
  return {
    name: item["name"],
    id: item["id"],
    type: item["type"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-01-20-preview API version. */
  V20260120Preview = "2026-01-20-preview",
}
