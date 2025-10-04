// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

/** Represents a mongo cluster resource. */
export interface MongoCluster extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: MongoClusterProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function mongoClusterSerializer(item: MongoCluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : mongoClusterPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function mongoClusterDeserializer(item: any): MongoCluster {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : mongoClusterPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
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
  /** The Data API properties of the mongo cluster. */
  dataApi?: DataApiProperties;
  /** List of private endpoint connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** List of private endpoint connections. */
  previewFeatures?: PreviewFeature[];
  /** The replication properties for the mongo cluster */
  readonly replica?: ReplicationProperties;
  /** The infrastructure version the cluster is provisioned on. */
  readonly infrastructureVersion?: string;
  /** The authentication configuration for the cluster. */
  authConfig?: AuthConfigProperties;
  /** The encryption configuration for the cluster. Depends on identity being configured. */
  encryption?: EncryptionProperties;
}

export function mongoClusterPropertiesSerializer(item: MongoClusterProperties): any {
  return {
    createMode: item["createMode"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : mongoClusterRestoreParametersSerializer(item["restoreParameters"]),
    replicaParameters: !item["replicaParameters"]
      ? item["replicaParameters"]
      : mongoClusterReplicaParametersSerializer(item["replicaParameters"]),
    administrator: !item["administrator"]
      ? item["administrator"]
      : administratorPropertiesSerializer(item["administrator"]),
    serverVersion: item["serverVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    highAvailability: !item["highAvailability"]
      ? item["highAvailability"]
      : highAvailabilityPropertiesSerializer(item["highAvailability"]),
    storage: !item["storage"] ? item["storage"] : storagePropertiesSerializer(item["storage"]),
    sharding: !item["sharding"] ? item["sharding"] : shardingPropertiesSerializer(item["sharding"]),
    compute: !item["compute"] ? item["compute"] : computePropertiesSerializer(item["compute"]),
    backup: !item["backup"] ? item["backup"] : backupPropertiesSerializer(item["backup"]),
    dataApi: !item["dataApi"] ? item["dataApi"] : dataApiPropertiesSerializer(item["dataApi"]),
    previewFeatures: !item["previewFeatures"]
      ? item["previewFeatures"]
      : item["previewFeatures"].map((p: any) => {
          return p;
        }),
    authConfig: !item["authConfig"]
      ? item["authConfig"]
      : authConfigPropertiesSerializer(item["authConfig"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesSerializer(item["encryption"]),
  };
}

export function mongoClusterPropertiesDeserializer(item: any): MongoClusterProperties {
  return {
    createMode: item["createMode"],
    restoreParameters: !item["restoreParameters"]
      ? item["restoreParameters"]
      : mongoClusterRestoreParametersDeserializer(item["restoreParameters"]),
    replicaParameters: !item["replicaParameters"]
      ? item["replicaParameters"]
      : mongoClusterReplicaParametersDeserializer(item["replicaParameters"]),
    administrator: !item["administrator"]
      ? item["administrator"]
      : administratorPropertiesDeserializer(item["administrator"]),
    serverVersion: item["serverVersion"],
    connectionString: item["connectionString"],
    provisioningState: item["provisioningState"],
    clusterStatus: item["clusterStatus"],
    publicNetworkAccess: item["publicNetworkAccess"],
    highAvailability: !item["highAvailability"]
      ? item["highAvailability"]
      : highAvailabilityPropertiesDeserializer(item["highAvailability"]),
    storage: !item["storage"] ? item["storage"] : storagePropertiesDeserializer(item["storage"]),
    sharding: !item["sharding"]
      ? item["sharding"]
      : shardingPropertiesDeserializer(item["sharding"]),
    compute: !item["compute"] ? item["compute"] : computePropertiesDeserializer(item["compute"]),
    backup: !item["backup"] ? item["backup"] : backupPropertiesDeserializer(item["backup"]),
    dataApi: !item["dataApi"] ? item["dataApi"] : dataApiPropertiesDeserializer(item["dataApi"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    previewFeatures: !item["previewFeatures"]
      ? item["previewFeatures"]
      : item["previewFeatures"].map((p: any) => {
          return p;
        }),
    replica: !item["replica"]
      ? item["replica"]
      : replicationPropertiesDeserializer(item["replica"]),
    infrastructureVersion: item["infrastructureVersion"],
    authConfig: !item["authConfig"]
      ? item["authConfig"]
      : authConfigPropertiesDeserializer(item["authConfig"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesDeserializer(item["encryption"]),
  };
}

/** The mode that the Mongo Cluster is created with. */
export enum KnownCreateMode {
  /** Create a new mongo cluster. */
  Default = "Default",
  /** Create a mongo cluster from a restore point-in-time. */
  PointInTimeRestore = "PointInTimeRestore",
  /** Create a replica cluster in distinct geographic region from the source cluster. */
  GeoReplica = "GeoReplica",
  /** Create a replica cluster in the same geographic region as the source cluster. */
  Replica = "Replica",
}

/**
 * The mode that the Mongo Cluster is created with. \
 * {@link KnownCreateMode} can be used interchangeably with CreateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Create a new mongo cluster. \
 * **PointInTimeRestore**: Create a mongo cluster from a restore point-in-time. \
 * **GeoReplica**: Create a replica cluster in distinct geographic region from the source cluster. \
 * **Replica**: Create a replica cluster in the same geographic region as the source cluster.
 */
export type CreateMode = string;

/** Parameters used for restore operations */
export interface MongoClusterRestoreParameters {
  /** UTC point in time to restore a mongo cluster */
  pointInTimeUTC?: Date;
  /** Resource ID to locate the source cluster to restore */
  sourceResourceId?: string;
}

export function mongoClusterRestoreParametersSerializer(item: MongoClusterRestoreParameters): any {
  return {
    pointInTimeUTC: !item["pointInTimeUTC"]
      ? item["pointInTimeUTC"]
      : item["pointInTimeUTC"].toISOString(),
    sourceResourceId: item["sourceResourceId"],
  };
}

export function mongoClusterRestoreParametersDeserializer(
  item: any,
): MongoClusterRestoreParameters {
  return {
    pointInTimeUTC: !item["pointInTimeUTC"]
      ? item["pointInTimeUTC"]
      : new Date(item["pointInTimeUTC"]),
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

export function mongoClusterReplicaParametersSerializer(item: MongoClusterReplicaParameters): any {
  return {
    sourceResourceId: item["sourceResourceId"],
    sourceLocation: item["sourceLocation"],
  };
}

export function mongoClusterReplicaParametersDeserializer(
  item: any,
): MongoClusterReplicaParameters {
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

export function administratorPropertiesSerializer(item: AdministratorProperties): any {
  return { userName: item["userName"], password: item["password"] };
}

export function administratorPropertiesDeserializer(item: any): AdministratorProperties {
  return {
    userName: item["userName"],
    password: item["password"],
  };
}

/** The provisioning state of the last accepted operation. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** An operation is in-progress on the resource. */
  InProgress = "InProgress",
  /** An update operation is in-progress on the resource. */
  Updating = "Updating",
  /** A drop operation is in-progress on the resource. */
  Dropping = "Dropping",
}

/**
 * The provisioning state of the last accepted operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **InProgress**: An operation is in-progress on the resource. \
 * **Updating**: An update operation is in-progress on the resource. \
 * **Dropping**: A drop operation is in-progress on the resource.
 */
export type ProvisioningState = string;

/** The status of the Mongo cluster resource. */
export enum KnownMongoClusterStatus {
  /** The mongo cluster resource is ready for use. */
  Ready = "Ready",
  /** The mongo cluster resource is being provisioned. */
  Provisioning = "Provisioning",
  /** The mongo cluster resource is being updated. */
  Updating = "Updating",
  /** The mongo cluster resource is being started. */
  Starting = "Starting",
  /** The mongo cluster resource is being stopped. */
  Stopping = "Stopping",
  /** The mongo cluster resource is stopped. */
  Stopped = "Stopped",
  /** The mongo cluster resource is being dropped. */
  Dropping = "Dropping",
}

/**
 * The status of the Mongo cluster resource. \
 * {@link KnownMongoClusterStatus} can be used interchangeably with MongoClusterStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: The mongo cluster resource is ready for use. \
 * **Provisioning**: The mongo cluster resource is being provisioned. \
 * **Updating**: The mongo cluster resource is being updated. \
 * **Starting**: The mongo cluster resource is being started. \
 * **Stopping**: The mongo cluster resource is being stopped. \
 * **Stopped**: The mongo cluster resource is stopped. \
 * **Dropping**: The mongo cluster resource is being dropped.
 */
export type MongoClusterStatus = string;

/** Whether or not public endpoint access is allowed for this Mongo cluster.  Value is optional and default value is 'Enabled' */
export enum KnownPublicNetworkAccess {
  /** If set, mongo cluster can be accessed through private and public methods. */
  Enabled = "Enabled",
  /** If set, the private endpoints are the exclusive access method. */
  Disabled = "Disabled",
}

/**
 * Whether or not public endpoint access is allowed for this Mongo cluster.  Value is optional and default value is 'Enabled' \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: If set, mongo cluster can be accessed through private and public methods. \
 * **Disabled**: If set, the private endpoints are the exclusive access method.
 */
export type PublicNetworkAccess = string;

/** The high availability properties of the cluster. */
export interface HighAvailabilityProperties {
  /** The target high availability mode requested for the cluster. */
  targetMode?: HighAvailabilityMode;
}

export function highAvailabilityPropertiesSerializer(item: HighAvailabilityProperties): any {
  return { targetMode: item["targetMode"] };
}

export function highAvailabilityPropertiesDeserializer(item: any): HighAvailabilityProperties {
  return {
    targetMode: item["targetMode"],
  };
}

/** The high availability modes for a cluster. */
export enum KnownHighAvailabilityMode {
  /** High availability mode is disabled. This mode is can see availability impact during faults or maintenance and is not recommended for production. */
  Disabled = "Disabled",
  /** High availability mode is enabled, where each server in a shard is placed in the same availability zone. */
  SameZone = "SameZone",
  /** High availability mode is enabled and preferences ZoneRedundant if availability zones capacity is available in the region, otherwise falls-back to provisioning with SameZone. */
  ZoneRedundantPreferred = "ZoneRedundantPreferred",
}

/**
 * The high availability modes for a cluster. \
 * {@link KnownHighAvailabilityMode} can be used interchangeably with HighAvailabilityMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: High availability mode is disabled. This mode is can see availability impact during faults or maintenance and is not recommended for production. \
 * **SameZone**: High availability mode is enabled, where each server in a shard is placed in the same availability zone. \
 * **ZoneRedundantPreferred**: High availability mode is enabled and preferences ZoneRedundant if availability zones capacity is available in the region, otherwise falls-back to provisioning with SameZone.
 */
export type HighAvailabilityMode = string;

/** The storage properties of the cluster. This includes the data storage size and scaling applied to servers in the cluster. */
export interface StorageProperties {
  /** The size of the data disk assigned to each server. */
  sizeGb?: number;
  /** The type of storage to provision the cluster servers with. */
  type?: StorageType;
}

export function storagePropertiesSerializer(item: StorageProperties): any {
  return { sizeGb: item["sizeGb"], type: item["type"] };
}

export function storagePropertiesDeserializer(item: any): StorageProperties {
  return {
    sizeGb: item["sizeGb"],
    type: item["type"],
  };
}

/** The type of storage that a mongo cluster can be provisioned with. */
export enum KnownStorageType {
  /** Premium SSD for high performance workloads. */
  PremiumSSD = "PremiumSSD",
  /** Premium SSD v2 for very IO-intensive workloads. This is a preview option and has additional limitations. */
  PremiumSSDv2 = "PremiumSSDv2",
}

/**
 * The type of storage that a mongo cluster can be provisioned with. \
 * {@link KnownStorageType} can be used interchangeably with StorageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PremiumSSD**: Premium SSD for high performance workloads. \
 * **PremiumSSDv2**: Premium SSD v2 for very IO-intensive workloads. This is a preview option and has additional limitations.
 */
export type StorageType = string;

/** The sharding properties of the cluster. This includes the shard count and scaling options for the cluster. */
export interface ShardingProperties {
  /** Number of shards to provision on the cluster. */
  shardCount?: number;
}

export function shardingPropertiesSerializer(item: ShardingProperties): any {
  return { shardCount: item["shardCount"] };
}

export function shardingPropertiesDeserializer(item: any): ShardingProperties {
  return {
    shardCount: item["shardCount"],
  };
}

/** The compute properties of the cluster. This includes the virtual-cores/memory and scaling options applied to servers in the cluster. */
export interface ComputeProperties {
  /** The compute tier to assign to the cluster, where each tier maps to a virtual-core and memory size. Example values: 'M30', 'M40'. */
  tier?: string;
}

export function computePropertiesSerializer(item: ComputeProperties): any {
  return { tier: item["tier"] };
}

export function computePropertiesDeserializer(item: any): ComputeProperties {
  return {
    tier: item["tier"],
  };
}

/** The backup properties of the cluster. This includes the earliest restore time and retention settings. */
export interface BackupProperties {
  /** Earliest restore timestamp in UTC ISO8601 format. */
  readonly earliestRestoreTime?: string;
}

export function backupPropertiesSerializer(item: BackupProperties): any {
  return item;
}

export function backupPropertiesDeserializer(item: any): BackupProperties {
  return {
    earliestRestoreTime: item["earliestRestoreTime"],
  };
}

/** Data API properties. */
export interface DataApiProperties {
  /** The mode to indicate whether the Mongo Data API is enabled for a cluster. */
  mode?: DataApiMode;
}

export function dataApiPropertiesSerializer(item: DataApiProperties): any {
  return { mode: item["mode"] };
}

export function dataApiPropertiesDeserializer(item: any): DataApiProperties {
  return {
    mode: item["mode"],
  };
}

/** The mode to apply to the Mongo Data API. */
export enum KnownDataApiMode {
  /** Mongo Data API is enabled for the cluster. */
  Enabled = "Enabled",
  /** Mongo Data API is disabled for the cluster. */
  Disabled = "Disabled",
}

/**
 * The mode to apply to the Mongo Data API. \
 * {@link KnownDataApiMode} can be used interchangeably with DataApiMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Mongo Data API is enabled for the cluster. \
 * **Disabled**: Mongo Data API is disabled for the cluster.
 */
export type DataApiMode = string;

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
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
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
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

/** Preview features that can be enabled on a mongo cluster. */
export enum KnownPreviewFeature {
  /** Enables geo replicas preview feature. The feature must be set at create-time on new cluster to enable linking a geo-replica cluster to it. */
  GeoReplicas = "GeoReplicas",
}

/**
 * Preview features that can be enabled on a mongo cluster. \
 * {@link KnownPreviewFeature} can be used interchangeably with PreviewFeature,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GeoReplicas**: Enables geo replicas preview feature. The feature must be set at create-time on new cluster to enable linking a geo-replica cluster to it.
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

export function replicationPropertiesDeserializer(item: any): ReplicationProperties {
  return {
    sourceResourceId: item["sourceResourceId"],
    role: item["role"],
    replicationState: item["replicationState"],
  };
}

/** Replication role of the mongo cluster. */
export enum KnownReplicationRole {
  /** The cluster is a primary replica. */
  Primary = "Primary",
  /** The cluster is a local asynchronous replica. */
  AsyncReplica = "AsyncReplica",
  /** The cluster is a geo-asynchronous replica. */
  GeoAsyncReplica = "GeoAsyncReplica",
}

/**
 * Replication role of the mongo cluster. \
 * {@link KnownReplicationRole} can be used interchangeably with ReplicationRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: The cluster is a primary replica. \
 * **AsyncReplica**: The cluster is a local asynchronous replica. \
 * **GeoAsyncReplica**: The cluster is a geo-asynchronous replica.
 */
export type ReplicationRole = string;

/** The state of the replication link between the replica and source cluster. */
export enum KnownReplicationState {
  /** Replication link is active. */
  Active = "Active",
  /** Replica is catching-up with the primary. This can occur after the replica is created or after a promotion is triggered. */
  Catchup = "Catchup",
  /** Replica and replication link to the primary is being created. */
  Provisioning = "Provisioning",
  /** Replication link is being updated due to a change on the replica or an upgrade. */
  Updating = "Updating",
  /** Replication link is broken and the replica may need to be recreated. */
  Broken = "Broken",
  /** Replication link is re-configuring due to a promotion event. */
  Reconfiguring = "Reconfiguring",
}

/**
 * The state of the replication link between the replica and source cluster. \
 * {@link KnownReplicationState} can be used interchangeably with ReplicationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Replication link is active. \
 * **Catchup**: Replica is catching-up with the primary. This can occur after the replica is created or after a promotion is triggered. \
 * **Provisioning**: Replica and replication link to the primary is being created. \
 * **Updating**: Replication link is being updated due to a change on the replica or an upgrade. \
 * **Broken**: Replication link is broken and the replica may need to be recreated. \
 * **Reconfiguring**: Replication link is re-configuring due to a promotion event.
 */
export type ReplicationState = string;

/** The authentication configuration for the Mongo cluster. */
export interface AuthConfigProperties {
  /** Allowed authentication modes for data access on the cluster. */
  allowedModes?: AuthenticationMode[];
}

export function authConfigPropertiesSerializer(item: AuthConfigProperties): any {
  return {
    allowedModes: !item["allowedModes"]
      ? item["allowedModes"]
      : item["allowedModes"].map((p: any) => {
          return p;
        }),
  };
}

export function authConfigPropertiesDeserializer(item: any): AuthConfigProperties {
  return {
    allowedModes: !item["allowedModes"]
      ? item["allowedModes"]
      : item["allowedModes"].map((p: any) => {
          return p;
        }),
  };
}

/** The authentication modes supporting on the Mongo cluster. */
export enum KnownAuthenticationMode {
  /** Native mongo authentication mode using username and password with auth mechanism 'SCRAM-SHA-256'. */
  NativeAuth = "NativeAuth",
  /** Microsoft Entra ID authentication mode using Entra users assigned to the cluster and auth mechanism 'MONGODB-OIDC'. */
  MicrosoftEntraID = "MicrosoftEntraID",
}

/**
 * The authentication modes supporting on the Mongo cluster. \
 * {@link KnownAuthenticationMode} can be used interchangeably with AuthenticationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NativeAuth**: Native mongo authentication mode using username and password with auth mechanism 'SCRAM-SHA-256'. \
 * **MicrosoftEntraID**: Microsoft Entra ID authentication mode using Entra users assigned to the cluster and auth mechanism 'MONGODB-OIDC'.
 */
export type AuthenticationMode = string;

/** The encryption configuration for the mongo cluster. */
export interface EncryptionProperties {
  /** Customer managed key encryption settings. */
  customerManagedKeyEncryption?: CustomerManagedKeyEncryptionProperties;
}

export function encryptionPropertiesSerializer(item: EncryptionProperties): any {
  return {
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : customerManagedKeyEncryptionPropertiesSerializer(item["customerManagedKeyEncryption"]),
  };
}

export function encryptionPropertiesDeserializer(item: any): EncryptionProperties {
  return {
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : customerManagedKeyEncryptionPropertiesDeserializer(item["customerManagedKeyEncryption"]),
  };
}

/** Customer managed key encryption settings. */
export interface CustomerManagedKeyEncryptionProperties {
  /** The identity used to access the key encryption key. */
  keyEncryptionKeyIdentity?: KeyEncryptionKeyIdentity;
  /** The URI of the key vault key used for encryption. */
  keyEncryptionKeyUrl?: string;
}

export function customerManagedKeyEncryptionPropertiesSerializer(
  item: CustomerManagedKeyEncryptionProperties,
): any {
  return {
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : keyEncryptionKeyIdentitySerializer(item["keyEncryptionKeyIdentity"]),
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
  };
}

export function customerManagedKeyEncryptionPropertiesDeserializer(
  item: any,
): CustomerManagedKeyEncryptionProperties {
  return {
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : keyEncryptionKeyIdentityDeserializer(item["keyEncryptionKeyIdentity"]),
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
  };
}

/** The identity used for key encryption key. */
export interface KeyEncryptionKeyIdentity {
  /** The type of identity. Only 'UserAssignedIdentity' is supported. */
  identityType?: KeyEncryptionKeyIdentityType;
  /** The user assigned identity resource id. */
  userAssignedIdentityResourceId?: string;
}

export function keyEncryptionKeyIdentitySerializer(item: KeyEncryptionKeyIdentity): any {
  return {
    identityType: item["identityType"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

export function keyEncryptionKeyIdentityDeserializer(item: any): KeyEncryptionKeyIdentity {
  return {
    identityType: item["identityType"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

/** The type of identity for key encryption key. */
export enum KnownKeyEncryptionKeyIdentityType {
  /** User assigned identity. */
  UserAssignedIdentity = "UserAssignedIdentity",
}

/**
 * The type of identity for key encryption key. \
 * {@link KnownKeyEncryptionKeyIdentityType} can be used interchangeably with KeyEncryptionKeyIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UserAssignedIdentity**: User assigned identity.
 */
export type KeyEncryptionKeyIdentityType = string;

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
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

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
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
    tags: item["tags"],
    location: item["location"],
  };
}

/** The type used for update operations of the MongoCluster. */
export interface MongoClusterUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: MongoClusterUpdateProperties;
}

export function mongoClusterUpdateSerializer(item: MongoClusterUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : mongoClusterUpdatePropertiesSerializer(item["properties"]),
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
  /** The Data API properties of the mongo cluster. */
  dataApi?: DataApiProperties;
  /** List of private endpoint connections. */
  previewFeatures?: PreviewFeature[];
  /** The authentication configuration for the cluster. */
  authConfig?: AuthConfigProperties;
  /** The encryption configuration for the cluster. Depends on identity being configured. */
  encryption?: EncryptionProperties;
}

export function mongoClusterUpdatePropertiesSerializer(item: MongoClusterUpdateProperties): any {
  return {
    administrator: !item["administrator"]
      ? item["administrator"]
      : administratorPropertiesSerializer(item["administrator"]),
    serverVersion: item["serverVersion"],
    publicNetworkAccess: item["publicNetworkAccess"],
    highAvailability: !item["highAvailability"]
      ? item["highAvailability"]
      : highAvailabilityPropertiesSerializer(item["highAvailability"]),
    storage: !item["storage"] ? item["storage"] : storagePropertiesSerializer(item["storage"]),
    sharding: !item["sharding"] ? item["sharding"] : shardingPropertiesSerializer(item["sharding"]),
    compute: !item["compute"] ? item["compute"] : computePropertiesSerializer(item["compute"]),
    backup: !item["backup"] ? item["backup"] : backupPropertiesSerializer(item["backup"]),
    dataApi: !item["dataApi"] ? item["dataApi"] : dataApiPropertiesSerializer(item["dataApi"]),
    previewFeatures: !item["previewFeatures"]
      ? item["previewFeatures"]
      : item["previewFeatures"].map((p: any) => {
          return p;
        }),
    authConfig: !item["authConfig"]
      ? item["authConfig"]
      : authConfigPropertiesSerializer(item["authConfig"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionPropertiesSerializer(item["encryption"]),
  };
}

/** The response of a MongoCluster list operation. */
export interface _MongoClusterListResult {
  /** The MongoCluster items on this page */
  value: MongoCluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _mongoClusterListResultDeserializer(item: any): _MongoClusterListResult {
  return {
    value: mongoClusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function mongoClusterArraySerializer(result: Array<MongoCluster>): any[] {
  return result.map((item) => {
    return mongoClusterSerializer(item);
  });
}

export function mongoClusterArrayDeserializer(result: Array<MongoCluster>): any[] {
  return result.map((item) => {
    return mongoClusterDeserializer(item);
  });
}

/** The connection strings for the given mongo cluster. */
export interface ListConnectionStringsResult {
  /** An array that contains the connection strings for a mongo cluster. */
  readonly connectionStrings?: ConnectionString[];
}

export function listConnectionStringsResultDeserializer(item: any): ListConnectionStringsResult {
  return {
    connectionStrings: !item["connectionStrings"]
      ? item["connectionStrings"]
      : connectionStringArrayDeserializer(item["connectionStrings"]),
  };
}

export function connectionStringArrayDeserializer(result: Array<ConnectionString>): any[] {
  return result.map((item) => {
    return connectionStringDeserializer(item);
  });
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

export function connectionStringDeserializer(item: any): ConnectionString {
  return {
    connectionString: item["connectionString"],
    description: item["description"],
    name: item["name"],
  };
}

/** The check availability request body. */
export interface CheckNameAvailabilityRequest {
  /** The name of the resource for which availability needs to be checked. */
  name?: string;
  /** The resource type. */
  type?: string;
}

export function checkNameAvailabilityRequestSerializer(item: CheckNameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
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

export function checkNameAvailabilityResponseDeserializer(
  item: any,
): CheckNameAvailabilityResponse {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Possible reasons for a name not being available. */
export enum KnownCheckNameAvailabilityReason {
  /** Name is invalid. */
  Invalid = "Invalid",
  /** Name already exists. */
  AlreadyExists = "AlreadyExists",
}

/**
 * Possible reasons for a name not being available. \
 * {@link KnownCheckNameAvailabilityReason} can be used interchangeably with CheckNameAvailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Name is invalid. \
 * **AlreadyExists**: Name already exists.
 */
export type CheckNameAvailabilityReason = string;

/** Promote replica request properties. */
export interface PromoteReplicaRequest {
  /** The promote option to apply to the operation. */
  promoteOption: PromoteOption;
  /** The mode to apply to the promote operation. Value is optional and default value is 'Switchover'. */
  mode?: PromoteMode;
}

export function promoteReplicaRequestSerializer(item: PromoteReplicaRequest): any {
  return { promoteOption: item["promoteOption"], mode: item["mode"] };
}

/** The option to apply to a promote operation. */
export enum KnownPromoteOption {
  /** Promote option forces the promotion without waiting for the replica to be caught up to the primary. This can result in data-loss so should only be used during disaster recovery scenarios. */
  Forced = "Forced",
}

/**
 * The option to apply to a promote operation. \
 * {@link KnownPromoteOption} can be used interchangeably with PromoteOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Forced**: Promote option forces the promotion without waiting for the replica to be caught up to the primary. This can result in data-loss so should only be used during disaster recovery scenarios.
 */
export type PromoteOption = string;

/** The mode to apply to a promote operation. */
export enum KnownPromoteMode {
  /** Promotion will switch the current replica cluster to the primary role and the original primary will be switched to a replica role, maintaining the replication link. */
  Switchover = "Switchover",
}

/**
 * The mode to apply to a promote operation. \
 * {@link KnownPromoteMode} can be used interchangeably with PromoteMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Switchover**: Promotion will switch the current replica cluster to the primary role and the original primary will be switched to a replica role, maintaining the replication link.
 */
export type PromoteMode = string;

/** Represents a mongo cluster firewall rule. */
export interface FirewallRule extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: FirewallRuleProperties;
}

export function firewallRuleSerializer(item: FirewallRule): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : firewallRulePropertiesSerializer(item["properties"]),
  };
}

export function firewallRuleDeserializer(item: any): FirewallRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : firewallRulePropertiesDeserializer(item["properties"]),
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

export function firewallRulePropertiesSerializer(item: FirewallRuleProperties): any {
  return {
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
  };
}

export function firewallRulePropertiesDeserializer(item: any): FirewallRuleProperties {
  return {
    provisioningState: item["provisioningState"],
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
  };
}

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

/** The response of a FirewallRule list operation. */
export interface _FirewallRuleListResult {
  /** The FirewallRule items on this page */
  value: FirewallRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _firewallRuleListResultDeserializer(item: any): _FirewallRuleListResult {
  return {
    value: firewallRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function firewallRuleArraySerializer(result: Array<FirewallRule>): any[] {
  return result.map((item) => {
    return firewallRuleSerializer(item);
  });
}

export function firewallRuleArrayDeserializer(result: Array<FirewallRule>): any[] {
  return result.map((item) => {
    return firewallRuleDeserializer(item);
  });
}

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

export function privateEndpointConnectionResourceArraySerializer(
  result: Array<PrivateEndpointConnectionResource>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionResourceSerializer(item);
  });
}

export function privateEndpointConnectionResourceArrayDeserializer(
  result: Array<PrivateEndpointConnectionResource>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionResourceDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface PrivateEndpointConnectionResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionResourceSerializer(
  item: PrivateEndpointConnectionResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
  };
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

/** The response of a PrivateLinkResource list operation. */
export interface _PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface PrivateLinkResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
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

/** The response of a Replica list operation. */
export interface _ReplicaListResult {
  /** The Replica items on this page */
  value: Replica[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _replicaListResultDeserializer(item: any): _ReplicaListResult {
  return {
    value: replicaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function replicaArrayDeserializer(result: Array<Replica>): any[] {
  return result.map((item) => {
    return replicaDeserializer(item);
  });
}

/** Represents a mongo cluster replica. */
export interface Replica extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: MongoClusterProperties;
}

export function replicaDeserializer(item: any): Replica {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : mongoClusterPropertiesDeserializer(item["properties"]),
  };
}

/** Represents a Mongo cluster user. */
export interface User extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: UserProperties;
}

export function userSerializer(item: User): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : userPropertiesSerializer(item["properties"]),
  };
}

export function userDeserializer(item: any): User {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : userPropertiesDeserializer(item["properties"]),
  };
}

/** Definition of Mongo user resource on a cluster. */
export interface UserProperties {
  /** The provisioning state of the user. */
  readonly provisioningState?: ProvisioningState;
  /** The user's identity provider definition. */
  identityProvider?: IdentityProviderUnion;
  /** Database roles that are assigned to the user. */
  roles?: DatabaseRole[];
}

export function userPropertiesSerializer(item: UserProperties): any {
  return {
    identityProvider: !item["identityProvider"]
      ? item["identityProvider"]
      : identityProviderUnionSerializer(item["identityProvider"]),
    roles: !item["roles"] ? item["roles"] : databaseRoleArraySerializer(item["roles"]),
  };
}

export function userPropertiesDeserializer(item: any): UserProperties {
  return {
    provisioningState: item["provisioningState"],
    identityProvider: !item["identityProvider"]
      ? item["identityProvider"]
      : identityProviderUnionDeserializer(item["identityProvider"]),
    roles: !item["roles"] ? item["roles"] : databaseRoleArrayDeserializer(item["roles"]),
  };
}

/** Defines a user's identity provider definition. */
export interface IdentityProvider {
  /** The type of identity provider that the user belongs to. */
  /** The discriminator possible values: MicrosoftEntraID */
  type: IdentityProviderType;
}

export function identityProviderSerializer(item: IdentityProvider): any {
  return { type: item["type"] };
}

export function identityProviderDeserializer(item: any): IdentityProvider {
  return {
    type: item["type"],
  };
}

/** Alias for IdentityProviderUnion */
export type IdentityProviderUnion = EntraIdentityProvider | IdentityProvider;

export function identityProviderUnionSerializer(item: IdentityProviderUnion): any {
  switch (item.type) {
    case "MicrosoftEntraID":
      return entraIdentityProviderSerializer(item as EntraIdentityProvider);

    default:
      return identityProviderSerializer(item);
  }
}

export function identityProviderUnionDeserializer(item: any): IdentityProviderUnion {
  switch (item.type) {
    case "MicrosoftEntraID":
      return entraIdentityProviderDeserializer(item as EntraIdentityProvider);

    default:
      return identityProviderDeserializer(item);
  }
}

/** Identity provider types that a a user identity can belong to. */
export enum KnownIdentityProviderType {
  /** Microsoft Entra ID provider. */
  MicrosoftEntraID = "MicrosoftEntraID",
}

/**
 * Identity provider types that a a user identity can belong to. \
 * {@link KnownIdentityProviderType} can be used interchangeably with IdentityProviderType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MicrosoftEntraID**: Microsoft Entra ID provider.
 */
export type IdentityProviderType = string;

/** Defines a Microsoft Entra ID Mongo user. */
export interface EntraIdentityProvider extends IdentityProvider {
  /** The type of identity provider that the user belongs to. */
  type: "MicrosoftEntraID";
  /** The Entra identity properties for the user. */
  properties: EntraIdentityProviderProperties;
}

export function entraIdentityProviderSerializer(item: EntraIdentityProvider): any {
  return {
    type: item["type"],
    properties: entraIdentityProviderPropertiesSerializer(item["properties"]),
  };
}

export function entraIdentityProviderDeserializer(item: any): EntraIdentityProvider {
  return {
    type: item["type"],
    properties: entraIdentityProviderPropertiesDeserializer(item["properties"]),
  };
}

/** Microsoft Entra ID provider properties. */
export interface EntraIdentityProviderProperties {
  /** The principal type of the user. */
  principalType: EntraPrincipalType;
}

export function entraIdentityProviderPropertiesSerializer(
  item: EntraIdentityProviderProperties,
): any {
  return { principalType: item["principalType"] };
}

export function entraIdentityProviderPropertiesDeserializer(
  item: any,
): EntraIdentityProviderProperties {
  return {
    principalType: item["principalType"],
  };
}

/** Microsoft Entra ID principal types available for a Mongo user. */
export enum KnownEntraPrincipalType {
  /** Entra user type. */
  User = "user",
  /** Entra service principal type. */
  ServicePrincipal = "servicePrincipal",
}

/**
 * Microsoft Entra ID principal types available for a Mongo user. \
 * {@link KnownEntraPrincipalType} can be used interchangeably with EntraPrincipalType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Entra user type. \
 * **servicePrincipal**: Entra service principal type.
 */
export type EntraPrincipalType = string;

export function databaseRoleArraySerializer(result: Array<DatabaseRole>): any[] {
  return result.map((item) => {
    return databaseRoleSerializer(item);
  });
}

export function databaseRoleArrayDeserializer(result: Array<DatabaseRole>): any[] {
  return result.map((item) => {
    return databaseRoleDeserializer(item);
  });
}

/** Database role definition that is assigned to a user. */
export interface DatabaseRole {
  /** Database scope that the role is assigned to. */
  db: string;
  /** The role that is assigned to the user on the database scope. */
  role: UserRole;
}

export function databaseRoleSerializer(item: DatabaseRole): any {
  return { db: item["db"], role: item["role"] };
}

export function databaseRoleDeserializer(item: any): DatabaseRole {
  return {
    db: item["db"],
    role: item["role"],
  };
}

/** Built-in database role that can be assigned to a user. */
export enum KnownUserRole {
  /** Root role permissions on the target scope. */
  Root = "root",
}

/**
 * Built-in database role that can be assigned to a user. \
 * {@link KnownUserRole} can be used interchangeably with UserRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **root**: Root role permissions on the target scope.
 */
export type UserRole = string;

/** The response of a User list operation. */
export interface _UserListResult {
  /** The User items on this page */
  value: User[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _userListResultDeserializer(item: any): _UserListResult {
  return {
    value: userArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function userArraySerializer(result: Array<User>): any[] {
  return result.map((item) => {
    return userSerializer(item);
  });
}

export function userArrayDeserializer(result: Array<User>): any[] {
  return result.map((item) => {
    return userDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** Azure Cosmos DB for Mongo vCore clusters api version 2024-03-01-preview. */
  V20240301Preview = "2024-03-01-preview",
  /** Azure Cosmos DB for Mongo vCore clusters api version 2024-06-01-preview. */
  V20240601Preview = "2024-06-01-preview",
  /** Azure Cosmos DB for Mongo vCore clusters api version 2024-07-01. */
  V20240701 = "2024-07-01",
  /** Azure Cosmos DB for Mongo vCore clusters api version 2024-10-01-preview. */
  V20241001Preview = "2024-10-01-preview",
  /** Azure Cosmos DB for Mongo vCore clusters api version 2025-04-01-preview. */
  V20250401Preview = "2025-04-01-preview",
  /** Azure Cosmos DB for Mongo vCore clusters api version 2025-07-01-preview. */
  V20250701Preview = "2025-07-01-preview",
  /** Azure Cosmos DB for Mongo vCore clusters api version 2025-08-01-preview. */
  V20250801Preview = "2025-08-01-preview",
}
