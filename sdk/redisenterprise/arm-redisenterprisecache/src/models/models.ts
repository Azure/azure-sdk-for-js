// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

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

/** Describes a database on the Redis Enterprise cluster */
export interface Database extends ProxyResource {
  /** Specifies whether redis clients can connect using TLS-encrypted or plaintext redis protocols. Default is TLS-encrypted. */
  clientProtocol?: Protocol;
  /** TCP port of the database endpoint. Specified at create time. Defaults to an available port. */
  port?: number;
  /** Current provisioning status of the database */
  readonly provisioningState?: ProvisioningState;
  /** Current resource status of the database */
  readonly resourceState?: ResourceState;
  /** Clustering policy - default is OSSCluster. This property can be updated only if the current value is NoCluster. If the value is OSSCluster or EnterpriseCluster, it cannot be updated without deleting the database. */
  clusteringPolicy?: ClusteringPolicy;
  /** Redis eviction policy - default is VolatileLRU */
  evictionPolicy?: EvictionPolicy;
  /** Persistence settings */
  persistence?: Persistence;
  /** Optional set of redis modules to enable in this database - modules can only be added at creation time. */
  modules?: Module[];
  /** Optional set of properties to configure geo replication for this database. */
  geoReplication?: DatabasePropertiesGeoReplication;
  /** Version of Redis the database is running on, e.g. '6.0' */
  readonly redisVersion?: string;
  /** Option to defer upgrade when newest version is released - default is NotDeferred. Learn more: https://aka.ms/redisversionupgrade */
  deferUpgrade?: DeferUpgradeSetting;
  /** This property can be Enabled/Disabled to allow or deny access with the current access keys. Can be updated even after database is created. Default is Disabled. */
  accessKeysAuthentication?: AccessKeysAuthentication;
}

export function databaseSerializer(item: Database): any {
  return {
    properties: areAllPropsUndefined(item, [
      "clientProtocol",
      "port",
      "clusteringPolicy",
      "evictionPolicy",
      "persistence",
      "modules",
      "geoReplication",
      "deferUpgrade",
      "accessKeysAuthentication",
    ])
      ? undefined
      : _databasePropertiesSerializer(item),
  };
}

export function databaseDeserializer(item: any): Database {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databasePropertiesDeserializer(item["properties"])),
  };
}

/** Properties for creating Redis Enterprise databases */
export interface DatabaseCreateProperties extends DatabaseProperties {
  /** This property can be Enabled/Disabled to allow or deny access with the current access keys. Can be updated even after database is created. Default is Disabled. */
  accessKeysAuthentication?: AccessKeysAuthentication;
}

export function databaseCreatePropertiesSerializer(item: DatabaseCreateProperties): any {
  return {
    clientProtocol: item["clientProtocol"],
    port: item["port"],
    clusteringPolicy: item["clusteringPolicy"],
    evictionPolicy: item["evictionPolicy"],
    persistence: !item["persistence"]
      ? item["persistence"]
      : persistenceSerializer(item["persistence"]),
    modules: !item["modules"] ? item["modules"] : moduleArraySerializer(item["modules"]),
    geoReplication: !item["geoReplication"]
      ? item["geoReplication"]
      : databasePropertiesGeoReplicationSerializer(item["geoReplication"]),
    deferUpgrade: item["deferUpgrade"],
    accessKeysAuthentication: item["accessKeysAuthentication"],
  };
}

export function databaseCreatePropertiesDeserializer(item: any): DatabaseCreateProperties {
  return {
    clientProtocol: item["clientProtocol"],
    port: item["port"],
    provisioningState: item["provisioningState"],
    resourceState: item["resourceState"],
    clusteringPolicy: item["clusteringPolicy"],
    evictionPolicy: item["evictionPolicy"],
    persistence: !item["persistence"]
      ? item["persistence"]
      : persistenceDeserializer(item["persistence"]),
    modules: !item["modules"] ? item["modules"] : moduleArrayDeserializer(item["modules"]),
    geoReplication: !item["geoReplication"]
      ? item["geoReplication"]
      : databasePropertiesGeoReplicationDeserializer(item["geoReplication"]),
    redisVersion: item["redisVersion"],
    deferUpgrade: item["deferUpgrade"],
    accessKeysAuthentication: item["accessKeysAuthentication"],
  };
}

/** This property can be Enabled/Disabled to allow or deny access with the current access keys. Can be updated even after database is created. */
export enum KnownAccessKeysAuthentication {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * This property can be Enabled/Disabled to allow or deny access with the current access keys. Can be updated even after database is created. \
 * {@link KnownAccessKeysAuthentication} can be used interchangeably with AccessKeysAuthentication,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled
 */
export type AccessKeysAuthentication = string;

/** Properties of Redis Enterprise databases, as opposed to general resource properties like location, tags */
export interface DatabaseProperties {
  /** Specifies whether redis clients can connect using TLS-encrypted or plaintext redis protocols. Default is TLS-encrypted. */
  clientProtocol?: Protocol;
  /** TCP port of the database endpoint. Specified at create time. Defaults to an available port. */
  port?: number;
  /** Current provisioning status of the database */
  readonly provisioningState?: ProvisioningState;
  /** Current resource status of the database */
  readonly resourceState?: ResourceState;
  /** Clustering policy - default is OSSCluster. This property can be updated only if the current value is NoCluster. If the value is OSSCluster or EnterpriseCluster, it cannot be updated without deleting the database. */
  clusteringPolicy?: ClusteringPolicy;
  /** Redis eviction policy - default is VolatileLRU */
  evictionPolicy?: EvictionPolicy;
  /** Persistence settings */
  persistence?: Persistence;
  /** Optional set of redis modules to enable in this database - modules can only be added at creation time. */
  modules?: Module[];
  /** Optional set of properties to configure geo replication for this database. */
  geoReplication?: DatabasePropertiesGeoReplication;
  /** Version of Redis the database is running on, e.g. '6.0' */
  readonly redisVersion?: string;
  /** Option to defer upgrade when newest version is released - default is NotDeferred. Learn more: https://aka.ms/redisversionupgrade */
  deferUpgrade?: DeferUpgradeSetting;
  /** This property can be Enabled/Disabled to allow or deny access with the current access keys. Can be updated even after database is created. */
  accessKeysAuthentication?: AccessKeysAuthentication;
}

export function databasePropertiesSerializer(item: DatabaseProperties): any {
  return {
    clientProtocol: item["clientProtocol"],
    port: item["port"],
    clusteringPolicy: item["clusteringPolicy"],
    evictionPolicy: item["evictionPolicy"],
    persistence: !item["persistence"]
      ? item["persistence"]
      : persistenceSerializer(item["persistence"]),
    modules: !item["modules"] ? item["modules"] : moduleArraySerializer(item["modules"]),
    geoReplication: !item["geoReplication"]
      ? item["geoReplication"]
      : databasePropertiesGeoReplicationSerializer(item["geoReplication"]),
    deferUpgrade: item["deferUpgrade"],
    accessKeysAuthentication: item["accessKeysAuthentication"],
  };
}

export function databasePropertiesDeserializer(item: any): DatabaseProperties {
  return {
    clientProtocol: item["clientProtocol"],
    port: item["port"],
    provisioningState: item["provisioningState"],
    resourceState: item["resourceState"],
    clusteringPolicy: item["clusteringPolicy"],
    evictionPolicy: item["evictionPolicy"],
    persistence: !item["persistence"]
      ? item["persistence"]
      : persistenceDeserializer(item["persistence"]),
    modules: !item["modules"] ? item["modules"] : moduleArrayDeserializer(item["modules"]),
    geoReplication: !item["geoReplication"]
      ? item["geoReplication"]
      : databasePropertiesGeoReplicationDeserializer(item["geoReplication"]),
    redisVersion: item["redisVersion"],
    deferUpgrade: item["deferUpgrade"],
    accessKeysAuthentication: item["accessKeysAuthentication"],
  };
}

/** Specifies whether redis clients can connect using TLS-encrypted or plaintext redis protocols. Default is TLS-encrypted. */
export enum KnownProtocol {
  /** Encrypted */
  Encrypted = "Encrypted",
  /** Plaintext */
  Plaintext = "Plaintext",
}

/**
 * Specifies whether redis clients can connect using TLS-encrypted or plaintext redis protocols. Default is TLS-encrypted. \
 * {@link KnownProtocol} can be used interchangeably with Protocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Encrypted**: Encrypted \
 * **Plaintext**: Plaintext
 */
export type Protocol = string;

/** Current provisioning status */
export enum KnownProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Current provisioning status \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Creating**: Creating \
 * **Updating**: Updating \
 * **Deleting**: Deleting
 */
export type ProvisioningState = string;

/** Current resource status */
export enum KnownResourceState {
  /** Running */
  Running = "Running",
  /** Creating */
  Creating = "Creating",
  /** CreateFailed */
  CreateFailed = "CreateFailed",
  /** Updating */
  Updating = "Updating",
  /** UpdateFailed */
  UpdateFailed = "UpdateFailed",
  /** Deleting */
  Deleting = "Deleting",
  /** DeleteFailed */
  DeleteFailed = "DeleteFailed",
  /** Enabling */
  Enabling = "Enabling",
  /** EnableFailed */
  EnableFailed = "EnableFailed",
  /** Disabling */
  Disabling = "Disabling",
  /** DisableFailed */
  DisableFailed = "DisableFailed",
  /** Disabled */
  Disabled = "Disabled",
  /** Scaling */
  Scaling = "Scaling",
  /** ScalingFailed */
  ScalingFailed = "ScalingFailed",
  /** Moving */
  Moving = "Moving",
}

/**
 * Current resource status \
 * {@link KnownResourceState} can be used interchangeably with ResourceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: Running \
 * **Creating**: Creating \
 * **CreateFailed**: CreateFailed \
 * **Updating**: Updating \
 * **UpdateFailed**: UpdateFailed \
 * **Deleting**: Deleting \
 * **DeleteFailed**: DeleteFailed \
 * **Enabling**: Enabling \
 * **EnableFailed**: EnableFailed \
 * **Disabling**: Disabling \
 * **DisableFailed**: DisableFailed \
 * **Disabled**: Disabled \
 * **Scaling**: Scaling \
 * **ScalingFailed**: ScalingFailed \
 * **Moving**: Moving
 */
export type ResourceState = string;

/** Clustering policy - default is OSSCluster. This property can be updated only if the current value is NoCluster. If the value is OSSCluster or EnterpriseCluster, it cannot be updated without deleting the database. */
export enum KnownClusteringPolicy {
  /** Enterprise clustering policy uses only the classic redis protocol, which does not support redis cluster commands. */
  EnterpriseCluster = "EnterpriseCluster",
  /** OSS clustering policy follows the redis cluster specification, and requires all clients to support redis clustering. */
  OSSCluster = "OSSCluster",
  /** The NoCluster policy is used for non-clustered Redis instances that do not require clustering features. */
  NoCluster = "NoCluster",
}

/**
 * Clustering policy - default is OSSCluster. This property can be updated only if the current value is NoCluster. If the value is OSSCluster or EnterpriseCluster, it cannot be updated without deleting the database. \
 * {@link KnownClusteringPolicy} can be used interchangeably with ClusteringPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EnterpriseCluster**: Enterprise clustering policy uses only the classic redis protocol, which does not support redis cluster commands. \
 * **OSSCluster**: OSS clustering policy follows the redis cluster specification, and requires all clients to support redis clustering. \
 * **NoCluster**: The NoCluster policy is used for non-clustered Redis instances that do not require clustering features.
 */
export type ClusteringPolicy = string;

/** Redis eviction policy - default is VolatileLRU */
export enum KnownEvictionPolicy {
  /** AllKeysLFU */
  AllKeysLFU = "AllKeysLFU",
  /** AllKeysLRU */
  AllKeysLRU = "AllKeysLRU",
  /** AllKeysRandom */
  AllKeysRandom = "AllKeysRandom",
  /** VolatileLRU */
  VolatileLRU = "VolatileLRU",
  /** VolatileLFU */
  VolatileLFU = "VolatileLFU",
  /** VolatileTTL */
  VolatileTTL = "VolatileTTL",
  /** VolatileRandom */
  VolatileRandom = "VolatileRandom",
  /** NoEviction */
  NoEviction = "NoEviction",
}

/**
 * Redis eviction policy - default is VolatileLRU \
 * {@link KnownEvictionPolicy} can be used interchangeably with EvictionPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllKeysLFU**: AllKeysLFU \
 * **AllKeysLRU**: AllKeysLRU \
 * **AllKeysRandom**: AllKeysRandom \
 * **VolatileLRU**: VolatileLRU \
 * **VolatileLFU**: VolatileLFU \
 * **VolatileTTL**: VolatileTTL \
 * **VolatileRandom**: VolatileRandom \
 * **NoEviction**: NoEviction
 */
export type EvictionPolicy = string;

/** Persistence-related configuration for the Redis Enterprise database */
export interface Persistence {
  /** Sets whether AOF is enabled. Note that at most one of AOF or RDB persistence may be enabled. */
  aofEnabled?: boolean;
  /** Sets whether RDB is enabled. Note that at most one of AOF or RDB persistence may be enabled. */
  rdbEnabled?: boolean;
  /** Sets the frequency at which data is written to disk. Defaults to '1s', meaning 'every second'. Note that the 'always' setting is deprecated, because of its performance impact. */
  aofFrequency?: AofFrequency;
  /** Sets the frequency at which a snapshot of the database is created. */
  rdbFrequency?: RdbFrequency;
}

export function persistenceSerializer(item: Persistence): any {
  return {
    aofEnabled: item["aofEnabled"],
    rdbEnabled: item["rdbEnabled"],
    aofFrequency: item["aofFrequency"],
    rdbFrequency: item["rdbFrequency"],
  };
}

export function persistenceDeserializer(item: any): Persistence {
  return {
    aofEnabled: item["aofEnabled"],
    rdbEnabled: item["rdbEnabled"],
    aofFrequency: item["aofFrequency"],
    rdbFrequency: item["rdbFrequency"],
  };
}

/** Sets the frequency at which data is written to disk. Defaults to '1s', meaning 'every second'. Note that the 'always' setting is deprecated, because of its performance impact. */
export enum KnownAofFrequency {
  /** 1s */
  OneS = "1s",
  /** always */
  Always = "always",
}

/**
 * Sets the frequency at which data is written to disk. Defaults to '1s', meaning 'every second'. Note that the 'always' setting is deprecated, because of its performance impact. \
 * {@link KnownAofFrequency} can be used interchangeably with AofFrequency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **1s**: 1s \
 * **always**: always
 */
export type AofFrequency = string;

/** Sets the frequency at which a snapshot of the database is created. */
export enum KnownRdbFrequency {
  /** 1h */
  OneH = "1h",
  /** 6h */
  SixH = "6h",
  /** 12h */
  TwelveH = "12h",
}

/**
 * Sets the frequency at which a snapshot of the database is created. \
 * {@link KnownRdbFrequency} can be used interchangeably with RdbFrequency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **1h**: 1h \
 * **6h**: 6h \
 * **12h**: 12h
 */
export type RdbFrequency = string;

export function moduleArraySerializer(result: Array<Module>): any[] {
  return result.map((item) => {
    return moduleSerializer(item);
  });
}

export function moduleArrayDeserializer(result: Array<Module>): any[] {
  return result.map((item) => {
    return moduleDeserializer(item);
  });
}

/** Specifies configuration of a redis module */
export interface Module {
  /** The name of the module, e.g. 'RedisBloom', 'RediSearch', 'RedisTimeSeries' */
  name: string;
  /** Configuration options for the module, e.g. 'ERROR_RATE 0.01 INITIAL_SIZE 400'. */
  args?: string;
  /** The version of the module, e.g. '1.0'. */
  readonly version?: string;
}

export function moduleSerializer(item: Module): any {
  return { name: item["name"], args: item["args"] };
}

export function moduleDeserializer(item: any): Module {
  return {
    name: item["name"],
    args: item["args"],
    version: item["version"],
  };
}

/** Optional set of properties to configure geo replication for this database. */
export interface DatabasePropertiesGeoReplication {
  /** Name for the group of linked database resources */
  groupNickname?: string;
  /** List of database resources to link with this database */
  linkedDatabases?: LinkedDatabase[];
}

export function databasePropertiesGeoReplicationSerializer(
  item: DatabasePropertiesGeoReplication,
): any {
  return {
    groupNickname: item["groupNickname"],
    linkedDatabases: !item["linkedDatabases"]
      ? item["linkedDatabases"]
      : linkedDatabaseArraySerializer(item["linkedDatabases"]),
  };
}

export function databasePropertiesGeoReplicationDeserializer(
  item: any,
): DatabasePropertiesGeoReplication {
  return {
    groupNickname: item["groupNickname"],
    linkedDatabases: !item["linkedDatabases"]
      ? item["linkedDatabases"]
      : linkedDatabaseArrayDeserializer(item["linkedDatabases"]),
  };
}

export function linkedDatabaseArraySerializer(result: Array<LinkedDatabase>): any[] {
  return result.map((item) => {
    return linkedDatabaseSerializer(item);
  });
}

export function linkedDatabaseArrayDeserializer(result: Array<LinkedDatabase>): any[] {
  return result.map((item) => {
    return linkedDatabaseDeserializer(item);
  });
}

/** Specifies details of a linked database resource. */
export interface LinkedDatabase {
  /** Resource ID of a database resource to link with this database. */
  id?: string;
  /** State of the link between the database resources. */
  readonly state?: LinkState;
}

export function linkedDatabaseSerializer(item: LinkedDatabase): any {
  return { id: item["id"] };
}

export function linkedDatabaseDeserializer(item: any): LinkedDatabase {
  return {
    id: item["id"],
    state: item["state"],
  };
}

/** State of the link between the database resources. */
export enum KnownLinkState {
  /** Linked */
  Linked = "Linked",
  /** Linking */
  Linking = "Linking",
  /** Unlinking */
  Unlinking = "Unlinking",
  /** LinkFailed */
  LinkFailed = "LinkFailed",
  /** UnlinkFailed */
  UnlinkFailed = "UnlinkFailed",
}

/**
 * State of the link between the database resources. \
 * {@link KnownLinkState} can be used interchangeably with LinkState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Linked**: Linked \
 * **Linking**: Linking \
 * **Unlinking**: Unlinking \
 * **LinkFailed**: LinkFailed \
 * **UnlinkFailed**: UnlinkFailed
 */
export type LinkState = string;

/** Option to defer upgrade when newest version is released - default is NotDeferred. Learn more: https://aka.ms/redisversionupgrade */
export enum KnownDeferUpgradeSetting {
  /** Deferred */
  Deferred = "Deferred",
  /** NotDeferred */
  NotDeferred = "NotDeferred",
}

/**
 * Option to defer upgrade when newest version is released - default is NotDeferred. Learn more: https://aka.ms/redisversionupgrade \
 * {@link KnownDeferUpgradeSetting} can be used interchangeably with DeferUpgradeSetting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Deferred**: Deferred \
 * **NotDeferred**: NotDeferred
 */
export type DeferUpgradeSetting = string;

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

/** A partial update to the Redis Enterprise database */
export interface DatabaseUpdate {
  /** Specifies whether redis clients can connect using TLS-encrypted or plaintext redis protocols. Default is TLS-encrypted. */
  clientProtocol?: Protocol;
  /** TCP port of the database endpoint. Specified at create time. Defaults to an available port. */
  port?: number;
  /** Current provisioning status of the database */
  readonly provisioningState?: ProvisioningState;
  /** Current resource status of the database */
  readonly resourceState?: ResourceState;
  /** Clustering policy - default is OSSCluster. This property can be updated only if the current value is NoCluster. If the value is OSSCluster or EnterpriseCluster, it cannot be updated without deleting the database. */
  clusteringPolicy?: ClusteringPolicy;
  /** Redis eviction policy - default is VolatileLRU */
  evictionPolicy?: EvictionPolicy;
  /** Persistence settings */
  persistence?: Persistence;
  /** Optional set of redis modules to enable in this database - modules can only be added at creation time. */
  modules?: Module[];
  /** Optional set of properties to configure geo replication for this database. */
  geoReplication?: DatabasePropertiesGeoReplication;
  /** Version of Redis the database is running on, e.g. '6.0' */
  readonly redisVersion?: string;
  /** Option to defer upgrade when newest version is released - default is NotDeferred. Learn more: https://aka.ms/redisversionupgrade */
  deferUpgrade?: DeferUpgradeSetting;
  /** This property can be Enabled/Disabled to allow or deny access with the current access keys. Can be updated even after database is created. Default is Disabled. */
  accessKeysAuthentication?: AccessKeysAuthentication;
}

export function databaseUpdateSerializer(item: DatabaseUpdate): any {
  return {
    properties: areAllPropsUndefined(item, [
      "clientProtocol",
      "port",
      "clusteringPolicy",
      "evictionPolicy",
      "persistence",
      "modules",
      "geoReplication",
      "deferUpgrade",
      "accessKeysAuthentication",
    ])
      ? undefined
      : _databaseUpdatePropertiesSerializer(item),
  };
}

/** Properties for updating Redis Enterprise databases */
export interface DatabaseUpdateProperties extends DatabaseProperties {
  /** This property can be Enabled/Disabled to allow or deny access with the current access keys. Can be updated even after database is created. Default is Disabled. */
  accessKeysAuthentication?: AccessKeysAuthentication;
}

export function databaseUpdatePropertiesSerializer(item: DatabaseUpdateProperties): any {
  return {
    clientProtocol: item["clientProtocol"],
    port: item["port"],
    clusteringPolicy: item["clusteringPolicy"],
    evictionPolicy: item["evictionPolicy"],
    persistence: !item["persistence"]
      ? item["persistence"]
      : persistenceSerializer(item["persistence"]),
    modules: !item["modules"] ? item["modules"] : moduleArraySerializer(item["modules"]),
    geoReplication: !item["geoReplication"]
      ? item["geoReplication"]
      : databasePropertiesGeoReplicationSerializer(item["geoReplication"]),
    deferUpgrade: item["deferUpgrade"],
    accessKeysAuthentication: item["accessKeysAuthentication"],
  };
}

/** The response of a list-all operation. */
export interface _DatabaseList {
  /** The Database items on this page */
  value: Database[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseListDeserializer(item: any): _DatabaseList {
  return {
    value: databaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseArraySerializer(result: Array<Database>): any[] {
  return result.map((item) => {
    return databaseSerializer(item);
  });
}

export function databaseArrayDeserializer(result: Array<Database>): any[] {
  return result.map((item) => {
    return databaseDeserializer(item);
  });
}

/** The secret access keys used for authenticating connections to redis */
export interface AccessKeys {
  /** The current primary key that clients can use to authenticate */
  readonly primaryKey?: string;
  /** The current secondary key that clients can use to authenticate */
  readonly secondaryKey?: string;
}

export function accessKeysDeserializer(item: any): AccessKeys {
  return {
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
  };
}

/** Specifies which access keys to reset to a new random value. */
export interface RegenerateKeyParameters {
  /** Which access key to regenerate. */
  keyType: AccessKeyType;
}

export function regenerateKeyParametersSerializer(item: RegenerateKeyParameters): any {
  return { keyType: item["keyType"] };
}

/** Which access key to regenerate. */
export type AccessKeyType = "Primary" | "Secondary";

/** Parameters for a Redis Enterprise import operation. */
export interface ImportClusterParameters {
  /** SAS URIs for the target blobs to import from */
  sasUris: string[];
}

export function importClusterParametersSerializer(item: ImportClusterParameters): any {
  return {
    sasUris: item["sasUris"].map((p: any) => {
      return p;
    }),
  };
}

/** Parameters for a Redis Enterprise export operation. */
export interface ExportClusterParameters {
  /** SAS URI for the target directory to export to */
  sasUri: string;
}

export function exportClusterParametersSerializer(item: ExportClusterParameters): any {
  return { sasUri: item["sasUri"] };
}

/** Parameters for a Redis Enterprise Active Geo Replication Force Unlink operation. */
export interface ForceUnlinkParameters {
  /** The resource IDs of the database resources to be unlinked. */
  ids: string[];
}

export function forceUnlinkParametersSerializer(item: ForceUnlinkParameters): any {
  return {
    ids: item["ids"].map((p: any) => {
      return p;
    }),
  };
}

/** Parameters for reconfiguring active geo-replication, of an existing database that was previously unlinked from a replication group. */
export interface ForceLinkParameters {
  /** Properties to configure geo replication for this database. */
  geoReplication: ForceLinkParametersGeoReplication;
}

export function forceLinkParametersSerializer(item: ForceLinkParameters): any {
  return { geoReplication: forceLinkParametersGeoReplicationSerializer(item["geoReplication"]) };
}

/** Properties to configure geo replication for this database. */
export interface ForceLinkParametersGeoReplication {
  /** The name of the group of linked database resources. This should match the existing replication group name. */
  groupNickname?: string;
  /** The resource IDs of the databases that are expected to be linked and included in the replication group. This parameter is used to validate that the linking is to the expected (unlinked) part of the replication group, if it is splintered. */
  linkedDatabases?: LinkedDatabase[];
}

export function forceLinkParametersGeoReplicationSerializer(
  item: ForceLinkParametersGeoReplication,
): any {
  return {
    groupNickname: item["groupNickname"],
    linkedDatabases: !item["linkedDatabases"]
      ? item["linkedDatabases"]
      : linkedDatabaseArraySerializer(item["linkedDatabases"]),
  };
}

/** Parameters for a Redis Enterprise active geo-replication flush operation */
export interface FlushParameters {
  /** The identifiers of all the other database resources in the georeplication group to be flushed. */
  ids?: string[];
}

export function flushParametersSerializer(item: FlushParameters): any {
  return {
    ids: !item["ids"]
      ? item["ids"]
      : item["ids"].map((p: any) => {
          return p;
        }),
  };
}

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnection extends Resource {
  /** The group ids for the private endpoint resource. */
  readonly groupIds?: string[];
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
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

/** The response of a PrivateEndpointConnection list operation. */
export interface _PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** Describes the Redis Enterprise cluster */
export interface Cluster extends TrackedResource {
  /** Distinguishes the kind of cluster. Read-only. */
  readonly kind?: Kind;
  /** The SKU to create, which affects price, performance, and features. */
  sku: Sku;
  /** The availability zones. */
  zones?: string[];
  /** The identity of the resource. */
  identity?: ManagedServiceIdentity;
  /** Enabled by default. If highAvailability is disabled, the data set is not replicated. This affects the availability SLA, and increases the risk of data loss. */
  highAvailability?: HighAvailability;
  /** The minimum TLS version for the cluster to support, e.g. '1.2'. Newer versions can be added in the future. Note that TLS 1.0 and TLS 1.1 are now completely obsolete -- you cannot use them. They are mentioned only for the sake of consistency with old API versions. */
  minimumTlsVersion?: TlsVersion;
  /** Encryption-at-rest configuration for the cluster. */
  encryption?: ClusterPropertiesEncryption;
  /** Cluster-level maintenance configuration. */
  maintenanceConfiguration?: MaintenanceConfiguration;
  /** DNS name of the cluster endpoint */
  readonly hostName?: string;
  /** Current provisioning status of the cluster */
  readonly provisioningState?: ProvisioningState;
  /** Explains the current redundancy strategy of the cluster, which affects the expected SLA. */
  readonly redundancyMode?: RedundancyMode;
  /** Current resource status of the cluster */
  readonly resourceState?: ResourceState;
  /** Version of redis the cluster supports, e.g. '6' */
  readonly redisVersion?: string;
  /** List of private endpoint connections associated with the specified Redis Enterprise cluster */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Whether or not public network traffic can access the Redis cluster. Only 'Enabled' or 'Disabled' can be set. null is returned only for clusters created using an old API version which do not have this property and cannot be set. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function clusterSerializer(item: Cluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "highAvailability",
      "minimumTlsVersion",
      "encryption",
      "maintenanceConfiguration",
      "publicNetworkAccess",
    ])
      ? undefined
      : _clusterPropertiesSerializer(item),
    sku: skuSerializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function clusterDeserializer(item: any): Cluster {
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
      : _clusterPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    sku: skuDeserializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties of Redis Enterprise clusters for create operations */
export interface ClusterCreateProperties extends ClusterProperties {
  /** Whether or not public network traffic can access the Redis cluster. Only 'Enabled' or 'Disabled' can be set. null is returned only for clusters created using an old API version which do not have this property and cannot be set. */
  publicNetworkAccess: PublicNetworkAccess | null;
}

export function clusterCreatePropertiesSerializer(item: ClusterCreateProperties): any {
  return {
    highAvailability: item["highAvailability"],
    minimumTlsVersion: item["minimumTlsVersion"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : clusterPropertiesEncryptionSerializer(item["encryption"]),
    maintenanceConfiguration: !item["maintenanceConfiguration"]
      ? item["maintenanceConfiguration"]
      : maintenanceConfigurationSerializer(item["maintenanceConfiguration"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function clusterCreatePropertiesDeserializer(item: any): ClusterCreateProperties {
  return {
    highAvailability: item["highAvailability"],
    minimumTlsVersion: item["minimumTlsVersion"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : clusterPropertiesEncryptionDeserializer(item["encryption"]),
    maintenanceConfiguration: !item["maintenanceConfiguration"]
      ? item["maintenanceConfiguration"]
      : maintenanceConfigurationDeserializer(item["maintenanceConfiguration"]),
    hostName: item["hostName"],
    provisioningState: item["provisioningState"],
    redundancyMode: item["redundancyMode"],
    resourceState: item["resourceState"],
    redisVersion: item["redisVersion"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** Whether or not public network traffic can access the Redis cluster. Only 'Enabled' or 'Disabled' can be set. null is returned only for clusters created using an old API version which do not have this property and cannot be set. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Whether or not public network traffic can access the Redis cluster. Only 'Enabled' or 'Disabled' can be set. null is returned only for clusters created using an old API version which do not have this property and cannot be set. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type PublicNetworkAccess = string;

/** Distinguishes the kind of cluster. Read-only. */
export enum KnownKind {
  /** v1 */
  V1 = "v1",
  /** v2 */
  V2 = "v2",
}

/**
 * Distinguishes the kind of cluster. Read-only. \
 * {@link KnownKind} can be used interchangeably with Kind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **v1**: v1 \
 * **v2**: v2
 */
export type Kind = string;

/** SKU parameters supplied to the create Redis Enterprise cluster operation. */
export interface Sku {
  /** The level of Redis Enterprise cluster to deploy. Possible values: ('Balanced_B5', 'MemoryOptimized_M10', 'ComputeOptimized_X5', etc.). For more information on SKUs see the latest pricing documentation. Note that additional SKUs may become supported in the future. */
  name: SkuName;
  /** This property is only used with Enterprise and EnterpriseFlash SKUs. Determines the size of the cluster. Valid values are (2, 4, 6, ...) for Enterprise SKUs and (3, 9, 15, ...) for EnterpriseFlash SKUs. */
  capacity?: number;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"], capacity: item["capacity"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    capacity: item["capacity"],
  };
}

/** The level of Redis Enterprise cluster to deploy. Possible values: ('Balanced_B5', 'MemoryOptimized_M10', 'ComputeOptimized_X5', etc.). For more information on SKUs see the latest pricing documentation. Note that additional SKUs may become supported in the future. */
export enum KnownSkuName {
  /** Enterprise_E1 */
  EnterpriseE1 = "Enterprise_E1",
  /** Enterprise_E5 */
  EnterpriseE5 = "Enterprise_E5",
  /** Enterprise_E10 */
  EnterpriseE10 = "Enterprise_E10",
  /** Enterprise_E20 */
  EnterpriseE20 = "Enterprise_E20",
  /** Enterprise_E50 */
  EnterpriseE50 = "Enterprise_E50",
  /** Enterprise_E100 */
  EnterpriseE100 = "Enterprise_E100",
  /** Enterprise_E200 */
  EnterpriseE200 = "Enterprise_E200",
  /** Enterprise_E400 */
  EnterpriseE400 = "Enterprise_E400",
  /** EnterpriseFlash_F300 */
  EnterpriseFlashF300 = "EnterpriseFlash_F300",
  /** EnterpriseFlash_F700 */
  EnterpriseFlashF700 = "EnterpriseFlash_F700",
  /** EnterpriseFlash_F1500 */
  EnterpriseFlashF1500 = "EnterpriseFlash_F1500",
  /** Balanced_B0 */
  BalancedB0 = "Balanced_B0",
  /** Balanced_B1 */
  BalancedB1 = "Balanced_B1",
  /** Balanced_B3 */
  BalancedB3 = "Balanced_B3",
  /** Balanced_B5 */
  BalancedB5 = "Balanced_B5",
  /** Balanced_B10 */
  BalancedB10 = "Balanced_B10",
  /** Balanced_B20 */
  BalancedB20 = "Balanced_B20",
  /** Balanced_B50 */
  BalancedB50 = "Balanced_B50",
  /** Balanced_B100 */
  BalancedB100 = "Balanced_B100",
  /** Balanced_B150 */
  BalancedB150 = "Balanced_B150",
  /** Balanced_B250 */
  BalancedB250 = "Balanced_B250",
  /** Balanced_B350 */
  BalancedB350 = "Balanced_B350",
  /** Balanced_B500 */
  BalancedB500 = "Balanced_B500",
  /** Balanced_B700 */
  BalancedB700 = "Balanced_B700",
  /** Balanced_B1000 */
  BalancedB1000 = "Balanced_B1000",
  /** MemoryOptimized_M10 */
  MemoryOptimizedM10 = "MemoryOptimized_M10",
  /** MemoryOptimized_M20 */
  MemoryOptimizedM20 = "MemoryOptimized_M20",
  /** MemoryOptimized_M50 */
  MemoryOptimizedM50 = "MemoryOptimized_M50",
  /** MemoryOptimized_M100 */
  MemoryOptimizedM100 = "MemoryOptimized_M100",
  /** MemoryOptimized_M150 */
  MemoryOptimizedM150 = "MemoryOptimized_M150",
  /** MemoryOptimized_M250 */
  MemoryOptimizedM250 = "MemoryOptimized_M250",
  /** MemoryOptimized_M350 */
  MemoryOptimizedM350 = "MemoryOptimized_M350",
  /** MemoryOptimized_M500 */
  MemoryOptimizedM500 = "MemoryOptimized_M500",
  /** MemoryOptimized_M700 */
  MemoryOptimizedM700 = "MemoryOptimized_M700",
  /** MemoryOptimized_M1000 */
  MemoryOptimizedM1000 = "MemoryOptimized_M1000",
  /** MemoryOptimized_M1500 */
  MemoryOptimizedM1500 = "MemoryOptimized_M1500",
  /** MemoryOptimized_M2000 */
  MemoryOptimizedM2000 = "MemoryOptimized_M2000",
  /** ComputeOptimized_X3 */
  ComputeOptimizedX3 = "ComputeOptimized_X3",
  /** ComputeOptimized_X5 */
  ComputeOptimizedX5 = "ComputeOptimized_X5",
  /** ComputeOptimized_X10 */
  ComputeOptimizedX10 = "ComputeOptimized_X10",
  /** ComputeOptimized_X20 */
  ComputeOptimizedX20 = "ComputeOptimized_X20",
  /** ComputeOptimized_X50 */
  ComputeOptimizedX50 = "ComputeOptimized_X50",
  /** ComputeOptimized_X100 */
  ComputeOptimizedX100 = "ComputeOptimized_X100",
  /** ComputeOptimized_X150 */
  ComputeOptimizedX150 = "ComputeOptimized_X150",
  /** ComputeOptimized_X250 */
  ComputeOptimizedX250 = "ComputeOptimized_X250",
  /** ComputeOptimized_X350 */
  ComputeOptimizedX350 = "ComputeOptimized_X350",
  /** ComputeOptimized_X500 */
  ComputeOptimizedX500 = "ComputeOptimized_X500",
  /** ComputeOptimized_X700 */
  ComputeOptimizedX700 = "ComputeOptimized_X700",
  /** FlashOptimized_A250 */
  FlashOptimizedA250 = "FlashOptimized_A250",
  /** FlashOptimized_A500 */
  FlashOptimizedA500 = "FlashOptimized_A500",
  /** FlashOptimized_A700 */
  FlashOptimizedA700 = "FlashOptimized_A700",
  /** FlashOptimized_A1000 */
  FlashOptimizedA1000 = "FlashOptimized_A1000",
  /** FlashOptimized_A1500 */
  FlashOptimizedA1500 = "FlashOptimized_A1500",
  /** FlashOptimized_A2000 */
  FlashOptimizedA2000 = "FlashOptimized_A2000",
  /** FlashOptimized_A4500 */
  FlashOptimizedA4500 = "FlashOptimized_A4500",
}

/**
 * The level of Redis Enterprise cluster to deploy. Possible values: ('Balanced_B5', 'MemoryOptimized_M10', 'ComputeOptimized_X5', etc.). For more information on SKUs see the latest pricing documentation. Note that additional SKUs may become supported in the future. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enterprise_E1**: Enterprise_E1 \
 * **Enterprise_E5**: Enterprise_E5 \
 * **Enterprise_E10**: Enterprise_E10 \
 * **Enterprise_E20**: Enterprise_E20 \
 * **Enterprise_E50**: Enterprise_E50 \
 * **Enterprise_E100**: Enterprise_E100 \
 * **Enterprise_E200**: Enterprise_E200 \
 * **Enterprise_E400**: Enterprise_E400 \
 * **EnterpriseFlash_F300**: EnterpriseFlash_F300 \
 * **EnterpriseFlash_F700**: EnterpriseFlash_F700 \
 * **EnterpriseFlash_F1500**: EnterpriseFlash_F1500 \
 * **Balanced_B0**: Balanced_B0 \
 * **Balanced_B1**: Balanced_B1 \
 * **Balanced_B3**: Balanced_B3 \
 * **Balanced_B5**: Balanced_B5 \
 * **Balanced_B10**: Balanced_B10 \
 * **Balanced_B20**: Balanced_B20 \
 * **Balanced_B50**: Balanced_B50 \
 * **Balanced_B100**: Balanced_B100 \
 * **Balanced_B150**: Balanced_B150 \
 * **Balanced_B250**: Balanced_B250 \
 * **Balanced_B350**: Balanced_B350 \
 * **Balanced_B500**: Balanced_B500 \
 * **Balanced_B700**: Balanced_B700 \
 * **Balanced_B1000**: Balanced_B1000 \
 * **MemoryOptimized_M10**: MemoryOptimized_M10 \
 * **MemoryOptimized_M20**: MemoryOptimized_M20 \
 * **MemoryOptimized_M50**: MemoryOptimized_M50 \
 * **MemoryOptimized_M100**: MemoryOptimized_M100 \
 * **MemoryOptimized_M150**: MemoryOptimized_M150 \
 * **MemoryOptimized_M250**: MemoryOptimized_M250 \
 * **MemoryOptimized_M350**: MemoryOptimized_M350 \
 * **MemoryOptimized_M500**: MemoryOptimized_M500 \
 * **MemoryOptimized_M700**: MemoryOptimized_M700 \
 * **MemoryOptimized_M1000**: MemoryOptimized_M1000 \
 * **MemoryOptimized_M1500**: MemoryOptimized_M1500 \
 * **MemoryOptimized_M2000**: MemoryOptimized_M2000 \
 * **ComputeOptimized_X3**: ComputeOptimized_X3 \
 * **ComputeOptimized_X5**: ComputeOptimized_X5 \
 * **ComputeOptimized_X10**: ComputeOptimized_X10 \
 * **ComputeOptimized_X20**: ComputeOptimized_X20 \
 * **ComputeOptimized_X50**: ComputeOptimized_X50 \
 * **ComputeOptimized_X100**: ComputeOptimized_X100 \
 * **ComputeOptimized_X150**: ComputeOptimized_X150 \
 * **ComputeOptimized_X250**: ComputeOptimized_X250 \
 * **ComputeOptimized_X350**: ComputeOptimized_X350 \
 * **ComputeOptimized_X500**: ComputeOptimized_X500 \
 * **ComputeOptimized_X700**: ComputeOptimized_X700 \
 * **FlashOptimized_A250**: FlashOptimized_A250 \
 * **FlashOptimized_A500**: FlashOptimized_A500 \
 * **FlashOptimized_A700**: FlashOptimized_A700 \
 * **FlashOptimized_A1000**: FlashOptimized_A1000 \
 * **FlashOptimized_A1500**: FlashOptimized_A1500 \
 * **FlashOptimized_A2000**: FlashOptimized_A2000 \
 * **FlashOptimized_A4500**: FlashOptimized_A4500
 */
export type SkuName = string;

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
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
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

/** Properties of Redis Enterprise clusters, as opposed to general resource properties like location, tags */
export interface ClusterProperties {
  /** Enabled by default. If highAvailability is disabled, the data set is not replicated. This affects the availability SLA, and increases the risk of data loss. */
  highAvailability?: HighAvailability;
  /** The minimum TLS version for the cluster to support, e.g. '1.2'. Newer versions can be added in the future. Note that TLS 1.0 and TLS 1.1 are now completely obsolete -- you cannot use them. They are mentioned only for the sake of consistency with old API versions. */
  minimumTlsVersion?: TlsVersion;
  /** Encryption-at-rest configuration for the cluster. */
  encryption?: ClusterPropertiesEncryption;
  /** Cluster-level maintenance configuration. */
  maintenanceConfiguration?: MaintenanceConfiguration;
  /** DNS name of the cluster endpoint */
  readonly hostName?: string;
  /** Current provisioning status of the cluster */
  readonly provisioningState?: ProvisioningState;
  /** Explains the current redundancy strategy of the cluster, which affects the expected SLA. */
  readonly redundancyMode?: RedundancyMode;
  /** Current resource status of the cluster */
  readonly resourceState?: ResourceState;
  /** Version of redis the cluster supports, e.g. '6' */
  readonly redisVersion?: string;
  /** List of private endpoint connections associated with the specified Redis Enterprise cluster */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
}

export function clusterPropertiesSerializer(item: ClusterProperties): any {
  return {
    highAvailability: item["highAvailability"],
    minimumTlsVersion: item["minimumTlsVersion"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : clusterPropertiesEncryptionSerializer(item["encryption"]),
    maintenanceConfiguration: !item["maintenanceConfiguration"]
      ? item["maintenanceConfiguration"]
      : maintenanceConfigurationSerializer(item["maintenanceConfiguration"]),
  };
}

export function clusterPropertiesDeserializer(item: any): ClusterProperties {
  return {
    highAvailability: item["highAvailability"],
    minimumTlsVersion: item["minimumTlsVersion"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : clusterPropertiesEncryptionDeserializer(item["encryption"]),
    maintenanceConfiguration: !item["maintenanceConfiguration"]
      ? item["maintenanceConfiguration"]
      : maintenanceConfigurationDeserializer(item["maintenanceConfiguration"]),
    hostName: item["hostName"],
    provisioningState: item["provisioningState"],
    redundancyMode: item["redundancyMode"],
    resourceState: item["resourceState"],
    redisVersion: item["redisVersion"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
  };
}

/** Enabled by default. If highAvailability is disabled, the data set is not replicated. This affects the availability SLA, and increases the risk of data loss. */
export enum KnownHighAvailability {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Enabled by default. If highAvailability is disabled, the data set is not replicated. This affects the availability SLA, and increases the risk of data loss. \
 * {@link KnownHighAvailability} can be used interchangeably with HighAvailability,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type HighAvailability = string;

/** The minimum TLS version for the cluster to support, e.g. '1.2'. Newer versions can be added in the future. Note that TLS 1.0 and TLS 1.1 are now completely obsolete -- you cannot use them. They are mentioned only for the sake of consistency with old API versions. */
export enum KnownTlsVersion {
  /** 1.0 */
  One0 = "1.0",
  /** 1.1 */
  One1 = "1.1",
  /** 1.2 */
  One2 = "1.2",
}

/**
 * The minimum TLS version for the cluster to support, e.g. '1.2'. Newer versions can be added in the future. Note that TLS 1.0 and TLS 1.1 are now completely obsolete -- you cannot use them. They are mentioned only for the sake of consistency with old API versions. \
 * {@link KnownTlsVersion} can be used interchangeably with TlsVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **1.0**: 1.0 \
 * **1.1**: 1.1 \
 * **1.2**: 1.2
 */
export type TlsVersion = string;

/** Encryption-at-rest configuration for the cluster. */
export interface ClusterPropertiesEncryption {
  /** All Customer-managed key encryption properties for the resource. Set this to an empty object to use Microsoft-managed key encryption. */
  customerManagedKeyEncryption?: ClusterPropertiesEncryptionCustomerManagedKeyEncryption;
}

export function clusterPropertiesEncryptionSerializer(item: ClusterPropertiesEncryption): any {
  return {
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : clusterPropertiesEncryptionCustomerManagedKeyEncryptionSerializer(
          item["customerManagedKeyEncryption"],
        ),
  };
}

export function clusterPropertiesEncryptionDeserializer(item: any): ClusterPropertiesEncryption {
  return {
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : clusterPropertiesEncryptionCustomerManagedKeyEncryptionDeserializer(
          item["customerManagedKeyEncryption"],
        ),
  };
}

/** All Customer-managed key encryption properties for the resource. Set this to an empty object to use Microsoft-managed key encryption. */
export interface ClusterPropertiesEncryptionCustomerManagedKeyEncryption {
  /** All identity configuration for Customer-managed key settings defining which identity should be used to auth to Key Vault. */
  keyEncryptionKeyIdentity?: ClusterPropertiesEncryptionCustomerManagedKeyEncryptionKeyIdentity;
  /** Key encryption key Url, versioned only. Ex: https://contosovault.vault.azure.net/keys/contosokek/562a4bb76b524a1493a6afe8e536ee78 */
  keyEncryptionKeyUrl?: string;
}

export function clusterPropertiesEncryptionCustomerManagedKeyEncryptionSerializer(
  item: ClusterPropertiesEncryptionCustomerManagedKeyEncryption,
): any {
  return {
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : clusterPropertiesEncryptionCustomerManagedKeyEncryptionKeyIdentitySerializer(
          item["keyEncryptionKeyIdentity"],
        ),
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
  };
}

export function clusterPropertiesEncryptionCustomerManagedKeyEncryptionDeserializer(
  item: any,
): ClusterPropertiesEncryptionCustomerManagedKeyEncryption {
  return {
    keyEncryptionKeyIdentity: !item["keyEncryptionKeyIdentity"]
      ? item["keyEncryptionKeyIdentity"]
      : clusterPropertiesEncryptionCustomerManagedKeyEncryptionKeyIdentityDeserializer(
          item["keyEncryptionKeyIdentity"],
        ),
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
  };
}

/** All identity configuration for Customer-managed key settings defining which identity should be used to auth to Key Vault. */
export interface ClusterPropertiesEncryptionCustomerManagedKeyEncryptionKeyIdentity {
  /** User assigned identity to use for accessing key encryption key Url. Ex: /subscriptions/<sub uuid>/resourceGroups/<resource group>/providers/Microsoft.ManagedIdentity/userAssignedIdentities/myId. */
  userAssignedIdentityResourceId?: string;
  /** Only userAssignedIdentity is supported in this API version; other types may be supported in the future */
  identityType?: CmkIdentityType;
}

export function clusterPropertiesEncryptionCustomerManagedKeyEncryptionKeyIdentitySerializer(
  item: ClusterPropertiesEncryptionCustomerManagedKeyEncryptionKeyIdentity,
): any {
  return {
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
    identityType: item["identityType"],
  };
}

export function clusterPropertiesEncryptionCustomerManagedKeyEncryptionKeyIdentityDeserializer(
  item: any,
): ClusterPropertiesEncryptionCustomerManagedKeyEncryptionKeyIdentity {
  return {
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
    identityType: item["identityType"],
  };
}

/** Only userAssignedIdentity is supported in this API version; other types may be supported in the future */
export enum KnownCmkIdentityType {
  /** systemAssignedIdentity */
  SystemAssignedIdentity = "systemAssignedIdentity",
  /** userAssignedIdentity */
  UserAssignedIdentity = "userAssignedIdentity",
}

/**
 * Only userAssignedIdentity is supported in this API version; other types may be supported in the future \
 * {@link KnownCmkIdentityType} can be used interchangeably with CmkIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **systemAssignedIdentity**: systemAssignedIdentity \
 * **userAssignedIdentity**: userAssignedIdentity
 */
export type CmkIdentityType = string;

/** Cluster-level maintenance configuration. */
export interface MaintenanceConfiguration {
  /** Custom maintenance windows that apply to the cluster. */
  maintenanceWindows?: MaintenanceWindow[];
}

export function maintenanceConfigurationSerializer(item: MaintenanceConfiguration): any {
  return {
    maintenanceWindows: !item["maintenanceWindows"]
      ? item["maintenanceWindows"]
      : maintenanceWindowArraySerializer(item["maintenanceWindows"]),
  };
}

export function maintenanceConfigurationDeserializer(item: any): MaintenanceConfiguration {
  return {
    maintenanceWindows: !item["maintenanceWindows"]
      ? item["maintenanceWindows"]
      : maintenanceWindowArrayDeserializer(item["maintenanceWindows"]),
  };
}

export function maintenanceWindowArraySerializer(result: Array<MaintenanceWindow>): any[] {
  return result.map((item) => {
    return maintenanceWindowSerializer(item);
  });
}

export function maintenanceWindowArrayDeserializer(result: Array<MaintenanceWindow>): any[] {
  return result.map((item) => {
    return maintenanceWindowDeserializer(item);
  });
}

/** A single custom maintenance window. */
export interface MaintenanceWindow {
  /** Maintenance window type. */
  type: MaintenanceWindowType;
  /** Duration in ISO-8601 format, for example 'PT5H'. */
  duration: string;
  /** Start hour (0-23) in UTC when the maintenance window begins. */
  startHourUtc: number;
  /** Recurring schedule for the maintenance window. */
  schedule: MaintenanceWindowSchedule;
}

export function maintenanceWindowSerializer(item: MaintenanceWindow): any {
  return {
    type: item["type"],
    duration: item["duration"],
    startHourUtc: item["startHourUtc"],
    schedule: maintenanceWindowScheduleSerializer(item["schedule"]),
  };
}

export function maintenanceWindowDeserializer(item: any): MaintenanceWindow {
  return {
    type: item["type"],
    duration: item["duration"],
    startHourUtc: item["startHourUtc"],
    schedule: maintenanceWindowScheduleDeserializer(item["schedule"]),
  };
}

/** Maintenance window type. */
export enum KnownMaintenanceWindowType {
  /** Weekly maintenance window. */
  Weekly = "Weekly",
}

/**
 * Maintenance window type. \
 * {@link KnownMaintenanceWindowType} can be used interchangeably with MaintenanceWindowType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Weekly**: Weekly maintenance window.
 */
export type MaintenanceWindowType = string;

/** Schedule details for a maintenance window. */
export interface MaintenanceWindowSchedule {
  /** Day of week. Required when the maintenance window type is 'Weekly'. */
  dayOfWeek?: MaintenanceDayOfWeek;
}

export function maintenanceWindowScheduleSerializer(item: MaintenanceWindowSchedule): any {
  return { dayOfWeek: item["dayOfWeek"] };
}

export function maintenanceWindowScheduleDeserializer(item: any): MaintenanceWindowSchedule {
  return {
    dayOfWeek: item["dayOfWeek"],
  };
}

/** Day of week. Required when the maintenance window type is 'Weekly'. */
export enum KnownMaintenanceDayOfWeek {
  /** Sunday */
  Sunday = "Sunday",
  /** Monday */
  Monday = "Monday",
  /** Tuesday */
  Tuesday = "Tuesday",
  /** Wednesday */
  Wednesday = "Wednesday",
  /** Thursday */
  Thursday = "Thursday",
  /** Friday */
  Friday = "Friday",
  /** Saturday */
  Saturday = "Saturday",
}

/**
 * Day of week. Required when the maintenance window type is 'Weekly'. \
 * {@link KnownMaintenanceDayOfWeek} can be used interchangeably with MaintenanceDayOfWeek,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Sunday** \
 * **Monday** \
 * **Tuesday** \
 * **Wednesday** \
 * **Thursday** \
 * **Friday** \
 * **Saturday**
 */
export type MaintenanceDayOfWeek = string;

/** Explains the current redundancy strategy of the cluster, which affects the expected SLA. */
export enum KnownRedundancyMode {
  /** No redundancy. Availability loss will occur. */
  None = "None",
  /** Local redundancy with high availability. */
  LR = "LR",
  /** Zone redundant. Higher availability. */
  ZR = "ZR",
}

/**
 * Explains the current redundancy strategy of the cluster, which affects the expected SLA. \
 * {@link KnownRedundancyMode} can be used interchangeably with RedundancyMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No redundancy. Availability loss will occur. \
 * **LR**: Local redundancy with high availability. \
 * **ZR**: Zone redundant. Higher availability.
 */
export type RedundancyMode = string;

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

/** A partial update to the Redis Enterprise cluster */
export interface ClusterUpdate {
  /** The SKU to create, which affects price, performance, and features. */
  sku?: Sku;
  /** The identity of the resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Enabled by default. If highAvailability is disabled, the data set is not replicated. This affects the availability SLA, and increases the risk of data loss. */
  highAvailability?: HighAvailability;
  /** The minimum TLS version for the cluster to support, e.g. '1.2'. Newer versions can be added in the future. Note that TLS 1.0 and TLS 1.1 are now completely obsolete -- you cannot use them. They are mentioned only for the sake of consistency with old API versions. */
  minimumTlsVersion?: TlsVersion;
  /** Encryption-at-rest configuration for the cluster. */
  encryption?: ClusterPropertiesEncryption;
  /** Cluster-level maintenance configuration. */
  maintenanceConfiguration?: MaintenanceConfiguration;
  /** DNS name of the cluster endpoint */
  readonly hostName?: string;
  /** Current provisioning status of the cluster */
  readonly provisioningState?: ProvisioningState;
  /** Explains the current redundancy strategy of the cluster, which affects the expected SLA. */
  readonly redundancyMode?: RedundancyMode;
  /** Current resource status of the cluster */
  readonly resourceState?: ResourceState;
  /** Version of redis the cluster supports, e.g. '6' */
  readonly redisVersion?: string;
  /** List of private endpoint connections associated with the specified Redis Enterprise cluster */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Whether or not public network traffic can access the Redis cluster. Only 'Enabled' or 'Disabled' can be set. null is returned only for clusters created using an old API version which do not have this property and cannot be set. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function clusterUpdateSerializer(item: ClusterUpdate): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    properties: areAllPropsUndefined(item, [
      "highAvailability",
      "minimumTlsVersion",
      "encryption",
      "maintenanceConfiguration",
      "publicNetworkAccess",
    ])
      ? undefined
      : _clusterUpdatePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
  };
}

/** Properties of Redis Enterprise clusters for update operations */
export interface ClusterUpdateProperties extends ClusterProperties {
  /** Whether or not public network traffic can access the Redis cluster. Only 'Enabled' or 'Disabled' can be set. null is returned only for clusters created using an old API version which do not have this property and cannot be set. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function clusterUpdatePropertiesSerializer(item: ClusterUpdateProperties): any {
  return {
    highAvailability: item["highAvailability"],
    minimumTlsVersion: item["minimumTlsVersion"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : clusterPropertiesEncryptionSerializer(item["encryption"]),
    maintenanceConfiguration: !item["maintenanceConfiguration"]
      ? item["maintenanceConfiguration"]
      : maintenanceConfigurationSerializer(item["maintenanceConfiguration"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** The response of a list-all operation. */
export interface _ClusterList {
  /** The Cluster items on this page */
  value: Cluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterListDeserializer(item: any): _ClusterList {
  return {
    value: clusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterArraySerializer(result: Array<Cluster>): any[] {
  return result.map((item) => {
    return clusterSerializer(item);
  });
}

export function clusterArrayDeserializer(result: Array<Cluster>): any[] {
  return result.map((item) => {
    return clusterDeserializer(item);
  });
}

/** The response of a listSkusForScaling operation. */
export interface SkuDetailsList {
  /** List of SKUS available to scale up or scale down. */
  skus?: SkuDetails[];
}

export function skuDetailsListDeserializer(item: any): SkuDetailsList {
  return {
    skus: !item["skus"] ? item["skus"] : skuDetailsArrayDeserializer(item["skus"]),
  };
}

export function skuDetailsArrayDeserializer(result: Array<SkuDetails>): any[] {
  return result.map((item) => {
    return skuDetailsDeserializer(item);
  });
}

/** Details of a Redis Enterprise cluster SKU. */
export interface SkuDetails {
  /** The name of the SKU. */
  readonly name?: string;
  /** The cache size in GB. */
  readonly sizeInGB?: number;
}

export function skuDetailsDeserializer(item: any): SkuDetails {
  return {
    name: item["name"],
    sizeInGB: item["sizeInGB"],
  };
}

/** A list of private link resources. */
export interface _PrivateLinkResourceListResult {
  /** Array of private link resources */
  value?: PrivateLinkResource[];
  /** URL to get the next set of operation list results (if there are any). */
  readonly nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
  return {
    value: !item["value"] ? item["value"] : privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private link resource. */
export interface PrivateLinkResource extends Resource {
  /** Resource properties. */
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

/** Describes the access policy assignment of Redis Enterprise database */
export interface AccessPolicyAssignment extends ProxyResource {
  /** Current provisioning status of the access policy assignment. */
  readonly provisioningState?: ProvisioningState;
  /** Name of access policy under specific access policy assignment. Only "default" policy is supported for now. */
  accessPolicyName?: string;
  /** The user associated with the access policy. */
  user?: AccessPolicyAssignmentPropertiesUser;
}

export function accessPolicyAssignmentSerializer(item: AccessPolicyAssignment): any {
  return {
    properties: areAllPropsUndefined(item, ["accessPolicyName", "user"])
      ? undefined
      : _accessPolicyAssignmentPropertiesSerializer(item),
  };
}

export function accessPolicyAssignmentDeserializer(item: any): AccessPolicyAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _accessPolicyAssignmentPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of Redis Enterprise database access policy assignment. */
export interface AccessPolicyAssignmentProperties {
  /** Current provisioning status of the access policy assignment. */
  readonly provisioningState?: ProvisioningState;
  /** Name of access policy under specific access policy assignment. Only "default" policy is supported for now. */
  accessPolicyName: string;
  /** The user associated with the access policy. */
  user: AccessPolicyAssignmentPropertiesUser;
}

export function accessPolicyAssignmentPropertiesSerializer(
  item: AccessPolicyAssignmentProperties,
): any {
  return {
    accessPolicyName: item["accessPolicyName"],
    user: accessPolicyAssignmentPropertiesUserSerializer(item["user"]),
  };
}

export function accessPolicyAssignmentPropertiesDeserializer(
  item: any,
): AccessPolicyAssignmentProperties {
  return {
    provisioningState: item["provisioningState"],
    accessPolicyName: item["accessPolicyName"],
    user: accessPolicyAssignmentPropertiesUserDeserializer(item["user"]),
  };
}

/** The user associated with the access policy. */
export interface AccessPolicyAssignmentPropertiesUser {
  /** The object ID of the user. */
  objectId?: string;
}

export function accessPolicyAssignmentPropertiesUserSerializer(
  item: AccessPolicyAssignmentPropertiesUser,
): any {
  return { objectId: item["objectId"] };
}

export function accessPolicyAssignmentPropertiesUserDeserializer(
  item: any,
): AccessPolicyAssignmentPropertiesUser {
  return {
    objectId: item["objectId"],
  };
}

/** The response of a list-all operation. */
export interface _AccessPolicyAssignmentList {
  /** The AccessPolicyAssignment items on this page */
  value: AccessPolicyAssignment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _accessPolicyAssignmentListDeserializer(item: any): _AccessPolicyAssignmentList {
  return {
    value: accessPolicyAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function accessPolicyAssignmentArraySerializer(
  result: Array<AccessPolicyAssignment>,
): any[] {
  return result.map((item) => {
    return accessPolicyAssignmentSerializer(item);
  });
}

export function accessPolicyAssignmentArrayDeserializer(
  result: Array<AccessPolicyAssignment>,
): any[] {
  return result.map((item) => {
    return accessPolicyAssignmentDeserializer(item);
  });
}

/** Describes the current migration operation on a Redis Enterprise cluster. */
export interface Migration extends ProxyResource {
  /** Properties of the migration operation. */
  properties?: MigrationPropertiesUnion;
}

export function migrationSerializer(item: Migration): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : migrationPropertiesUnionSerializer(item["properties"]),
  };
}

export function migrationDeserializer(item: any): Migration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : migrationPropertiesUnionDeserializer(item["properties"]),
  };
}

/** Properties for Redis Enterprise migration operation. */
export interface MigrationProperties {
  /** Describes the source of the migration operation. */
  /** The discriminator possible values: AzureCacheForRedis */
  sourceType: SourceType;
  /** The Azure resource ID of the Azure Managed Redis destination cache to migrate. */
  readonly targetResourceId?: string;
  /** Current provisioning status of the migration */
  readonly provisioningState?: MigrationProvisioningState;
  /** Additional details about the migration operation's status in free text format. */
  readonly statusDetails?: string;
  /** The timestamp when the migration operation was created. */
  readonly creationTime?: Date;
  /** The timestamp when the migration operation was last updated. */
  readonly lastModifiedTime?: Date;
}

export function migrationPropertiesSerializer(item: MigrationProperties): any {
  return { sourceType: item["sourceType"] };
}

export function migrationPropertiesDeserializer(item: any): MigrationProperties {
  return {
    sourceType: item["sourceType"],
    targetResourceId: item["targetResourceId"],
    provisioningState: item["provisioningState"],
    statusDetails: item["statusDetails"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
  };
}

/** Alias for MigrationPropertiesUnion */
export type MigrationPropertiesUnion = AzureCacheForRedisMigrationProperties | MigrationProperties;

export function migrationPropertiesUnionSerializer(item: MigrationPropertiesUnion): any {
  switch (item.sourceType) {
    case "AzureCacheForRedis":
      return azureCacheForRedisMigrationPropertiesSerializer(
        item as AzureCacheForRedisMigrationProperties,
      );

    default:
      return migrationPropertiesSerializer(item);
  }
}

export function migrationPropertiesUnionDeserializer(item: any): MigrationPropertiesUnion {
  switch (item["sourceType"]) {
    case "AzureCacheForRedis":
      return azureCacheForRedisMigrationPropertiesDeserializer(
        item as AzureCacheForRedisMigrationProperties,
      );

    default:
      return migrationPropertiesDeserializer(item);
  }
}

/** Describes the source of the migration operation. */
export enum KnownSourceType {
  /** Migration from Azure Cache for Redis to Redis Enterprise. */
  AzureCacheForRedis = "AzureCacheForRedis",
}

/**
 * Describes the source of the migration operation. \
 * {@link KnownSourceType} can be used interchangeably with SourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureCacheForRedis**: Migration from Azure Cache for Redis to Redis Enterprise.
 */
export type SourceType = string;

/** Current provisioning status */
export enum KnownMigrationProvisioningState {
  /** The request has been accepted and the migration operation is being initialized. */
  Accepted = "Accepted",
  /** The migration operation is in progress. */
  InProgress = "InProgress",
  /** The migration operation has completed transferring data and is ready for DNS switch. */
  ReadyForDnsSwitch = "ReadyForDnsSwitch",
  /** The migration operation has completed successfully. */
  Succeeded = "Succeeded",
  /** The migration operation has failed. */
  Failed = "Failed",
  /** The migration operation is being cancelled. */
  Cancelling = "Cancelling",
  /** The migration operation has been cancelled. */
  Cancelled = "Cancelled",
}

/**
 * Current provisioning status \
 * {@link KnownMigrationProvisioningState} can be used interchangeably with MigrationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: The request has been accepted and the migration operation is being initialized. \
 * **InProgress**: The migration operation is in progress. \
 * **ReadyForDnsSwitch**: The migration operation has completed transferring data and is ready for DNS switch. \
 * **Succeeded**: The migration operation has completed successfully. \
 * **Failed**: The migration operation has failed. \
 * **Cancelling**: The migration operation is being cancelled. \
 * **Cancelled**: The migration operation has been cancelled.
 */
export type MigrationProvisioningState = string;

/** Properties for Redis Enterprise migration operation for Azure Cache for Redis. */
export interface AzureCacheForRedisMigrationProperties extends MigrationProperties {
  /** The source resource ID to migrate from. This is the resource ID of the Azure Cache for Redis. */
  sourceResourceId: string;
  /** Sets whether the DNS is switched automatically after the data is transferred from the source cache to the target cache. This property must be true during the preview. */
  switchDns: boolean;
  /** Sets whether the data is migrated from source to target or not. This property must be true during the preview. */
  skipDataMigration: boolean;
  /** Describes the source of the migration operation. */
  sourceType: "AzureCacheForRedis";
}

export function azureCacheForRedisMigrationPropertiesSerializer(
  item: AzureCacheForRedisMigrationProperties,
): any {
  return {
    sourceType: item["sourceType"],
    sourceResourceId: item["sourceResourceId"],
    switchDns: item["switchDns"],
    skipDataMigration: item["skipDataMigration"],
  };
}

export function azureCacheForRedisMigrationPropertiesDeserializer(
  item: any,
): AzureCacheForRedisMigrationProperties {
  return {
    sourceType: item["sourceType"],
    targetResourceId: item["targetResourceId"],
    provisioningState: item["provisioningState"],
    statusDetails: item["statusDetails"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    sourceResourceId: item["sourceResourceId"],
    switchDns: item["switchDns"],
    skipDataMigration: item["skipDataMigration"],
  };
}

/** The response of a list-all migrations. */
export interface _MigrationList {
  /** The Migration items on this page */
  value: Migration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _migrationListDeserializer(item: any): _MigrationList {
  return {
    value: migrationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function migrationArraySerializer(result: Array<Migration>): any[] {
  return result.map((item) => {
    return migrationSerializer(item);
  });
}

export function migrationArrayDeserializer(result: Array<Migration>): any[] {
  return result.map((item) => {
    return migrationDeserializer(item);
  });
}

/** The status of a long-running operation. */
export interface OperationStatus {
  /** The operation's unique id. */
  id?: string;
  /** The operation's name. */
  name?: string;
  /** The start time of the operation. */
  startTime?: string;
  /** The end time of the operation. */
  endTime?: string;
  /** The current status of the operation. */
  status?: string;
  /** Error response describing why the operation failed. */
  error?: ErrorResponse;
}

export function operationStatusDeserializer(item: any): OperationStatus {
  return {
    id: item["id"],
    name: item["name"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    status: item["status"],
    error: !item["error"] ? item["error"] : errorResponseDeserializer(item["error"]),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-08-01-preview API version. */
  V20250801Preview = "2025-08-01-preview",
}

export function _databasePropertiesSerializer(item: Database): any {
  return {
    clientProtocol: item["clientProtocol"],
    port: item["port"],
    clusteringPolicy: item["clusteringPolicy"],
    evictionPolicy: item["evictionPolicy"],
    persistence: !item["persistence"]
      ? item["persistence"]
      : persistenceSerializer(item["persistence"]),
    modules: !item["modules"] ? item["modules"] : moduleArraySerializer(item["modules"]),
    geoReplication: !item["geoReplication"]
      ? item["geoReplication"]
      : databasePropertiesGeoReplicationSerializer(item["geoReplication"]),
    deferUpgrade: item["deferUpgrade"],
    accessKeysAuthentication: item["accessKeysAuthentication"],
  };
}

export function _databasePropertiesDeserializer(item: any) {
  return {
    clientProtocol: item["clientProtocol"],
    port: item["port"],
    provisioningState: item["provisioningState"],
    resourceState: item["resourceState"],
    clusteringPolicy: item["clusteringPolicy"],
    evictionPolicy: item["evictionPolicy"],
    persistence: !item["persistence"]
      ? item["persistence"]
      : persistenceDeserializer(item["persistence"]),
    modules: !item["modules"] ? item["modules"] : moduleArrayDeserializer(item["modules"]),
    geoReplication: !item["geoReplication"]
      ? item["geoReplication"]
      : databasePropertiesGeoReplicationDeserializer(item["geoReplication"]),
    redisVersion: item["redisVersion"],
    deferUpgrade: item["deferUpgrade"],
    accessKeysAuthentication: item["accessKeysAuthentication"],
  };
}

export function _databaseUpdatePropertiesSerializer(item: DatabaseUpdate): any {
  return {
    clientProtocol: item["clientProtocol"],
    port: item["port"],
    clusteringPolicy: item["clusteringPolicy"],
    evictionPolicy: item["evictionPolicy"],
    persistence: !item["persistence"]
      ? item["persistence"]
      : persistenceSerializer(item["persistence"]),
    modules: !item["modules"] ? item["modules"] : moduleArraySerializer(item["modules"]),
    geoReplication: !item["geoReplication"]
      ? item["geoReplication"]
      : databasePropertiesGeoReplicationSerializer(item["geoReplication"]),
    deferUpgrade: item["deferUpgrade"],
    accessKeysAuthentication: item["accessKeysAuthentication"],
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
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

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _clusterPropertiesSerializer(item: Cluster): any {
  return {
    highAvailability: item["highAvailability"],
    minimumTlsVersion: item["minimumTlsVersion"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : clusterPropertiesEncryptionSerializer(item["encryption"]),
    maintenanceConfiguration: !item["maintenanceConfiguration"]
      ? item["maintenanceConfiguration"]
      : maintenanceConfigurationSerializer(item["maintenanceConfiguration"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function _clusterPropertiesDeserializer(item: any) {
  return {
    highAvailability: item["highAvailability"],
    minimumTlsVersion: item["minimumTlsVersion"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : clusterPropertiesEncryptionDeserializer(item["encryption"]),
    maintenanceConfiguration: !item["maintenanceConfiguration"]
      ? item["maintenanceConfiguration"]
      : maintenanceConfigurationDeserializer(item["maintenanceConfiguration"]),
    hostName: item["hostName"],
    provisioningState: item["provisioningState"],
    redundancyMode: item["redundancyMode"],
    resourceState: item["resourceState"],
    redisVersion: item["redisVersion"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function _clusterUpdatePropertiesSerializer(item: ClusterUpdate): any {
  return {
    highAvailability: item["highAvailability"],
    minimumTlsVersion: item["minimumTlsVersion"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : clusterPropertiesEncryptionSerializer(item["encryption"]),
    maintenanceConfiguration: !item["maintenanceConfiguration"]
      ? item["maintenanceConfiguration"]
      : maintenanceConfigurationSerializer(item["maintenanceConfiguration"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function _accessPolicyAssignmentPropertiesSerializer(item: AccessPolicyAssignment): any {
  return {
    accessPolicyName: item["accessPolicyName"],
    user: !item["user"]
      ? item["user"]
      : accessPolicyAssignmentPropertiesUserSerializer(item["user"]),
  };
}

export function _accessPolicyAssignmentPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    accessPolicyName: item["accessPolicyName"],
    user: !item["user"]
      ? item["user"]
      : accessPolicyAssignmentPropertiesUserDeserializer(item["user"]),
  };
}
