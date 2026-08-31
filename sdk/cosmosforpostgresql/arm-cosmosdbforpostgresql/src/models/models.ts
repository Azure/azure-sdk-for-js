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

/** Represents a cluster. */
export interface Cluster extends TrackedResource {
  /** Describes the identity of the cluster. */
  identity?: IdentityProperties;
  /** Indicates whether the cluster was created using AAD authentication. */
  readonly aadAuthEnabled?: AadEnabledEnum;
  /** The administrator's login name of the servers in the cluster. */
  readonly administratorLogin?: string;
  /** The password of the administrator login. Required for creation. */
  administratorLoginPassword?: string;
  /** The data encryption properties of a cluster. */
  dataEncryption?: DataEncryption;
  /** Provisioning state of the cluster */
  readonly provisioningState?: string;
  /** A state of a cluster/server that is visible to user. */
  readonly state?: string;
  /** The major PostgreSQL version on all cluster servers. */
  postgresqlVersion?: string;
  /** The Citus extension version on all cluster servers. */
  citusVersion?: string;
  /** Maintenance window of a cluster. */
  maintenanceWindow?: MaintenanceWindow;
  /** Preferred primary availability zone (AZ) for all cluster servers. */
  preferredPrimaryZone?: string;
  /** If distributed tables are placed on coordinator or not. Should be set to 'true' on single node clusters. Requires shard rebalancing after value is changed. */
  enableShardsOnCoordinator?: boolean;
  /** If high availability (HA) is enabled or not for the cluster. */
  enableHa?: boolean;
  /** The edition of a coordinator server (default: GeneralPurpose). Required for creation. */
  coordinatorServerEdition?: string;
  /** The storage of a server in MB. Required for creation. See https://learn.microsoft.com/azure/cosmos-db/postgresql/resources-compute for more information. */
  coordinatorStorageQuotaInMb?: number;
  /** The vCores count of a server (max: 96). Required for creation. See https://learn.microsoft.com/azure/cosmos-db/postgresql/resources-compute for more information. */
  coordinatorVCores?: number;
  /** If public access is enabled on coordinator. */
  coordinatorEnablePublicIpAccess?: boolean;
  /** The edition of a node server (default: MemoryOptimized). */
  nodeServerEdition?: string;
  /** Worker node count of the cluster. When node count is 0, it represents a single node configuration with the ability to create distributed tables on that node. 2 or more worker nodes represent multi-node configuration. Node count value cannot be 1. Required for creation. */
  nodeCount?: number;
  /** The storage in MB on each worker node. See https://learn.microsoft.com/azure/cosmos-db/postgresql/resources-compute for more information. */
  nodeStorageQuotaInMb?: number;
  /** The compute in vCores on each worker node (max: 104). See https://learn.microsoft.com/azure/cosmos-db/postgresql/resources-compute for more information. */
  nodeVCores?: number;
  /** If public access is enabled on worker nodes. */
  nodeEnablePublicIpAccess?: boolean;
  /** The list of server names in the cluster */
  readonly serverNames?: ServerNameItem[];
  /** The resource id of source cluster for read replica clusters. */
  sourceResourceId?: string;
  /** The Azure region of source cluster for read replica clusters. */
  sourceLocation?: string;
  /** Indicates whether the cluster was created with a password or using AAD authentication. */
  readonly passwordEnabled?: PasswordEnabledEnum;
  /** Date and time in UTC (ISO8601 format) for cluster restore. */
  pointInTimeUTC?: Date;
  /** The array of read replica clusters. */
  readonly readReplicas?: string[];
  /** The earliest restore point time (ISO8601 format) for the cluster. */
  readonly earliestRestoreTime?: Date;
  /** The private endpoint connections for a cluster. */
  readonly privateEndpointConnections?: SimplePrivateEndpointConnection[];
  /** The database name of the cluster. Only one database per cluster is supported. */
  databaseName?: string;
  /** If cluster backup is stored in another Azure region in addition to the copy of the backup stored in the cluster's region. Enabled only at the time of cluster creation. */
  enableGeoBackup?: boolean;
  /** Authentication configuration of a cluster. */
  authConfig?: AuthConfig;
}

export function clusterSerializer(item: Cluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "administratorLoginPassword",
      "dataEncryption",
      "postgresqlVersion",
      "citusVersion",
      "maintenanceWindow",
      "preferredPrimaryZone",
      "enableShardsOnCoordinator",
      "enableHa",
      "coordinatorServerEdition",
      "coordinatorStorageQuotaInMb",
      "coordinatorVCores",
      "coordinatorEnablePublicIpAccess",
      "nodeServerEdition",
      "nodeCount",
      "nodeStorageQuotaInMb",
      "nodeVCores",
      "nodeEnablePublicIpAccess",
      "sourceResourceId",
      "sourceLocation",
      "pointInTimeUTC",
      "databaseName",
      "enableGeoBackup",
      "authConfig",
    ])
      ? undefined
      : _clusterPropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
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
    identity: !item["identity"]
      ? item["identity"]
      : identityPropertiesDeserializer(item["identity"]),
  };
}

/** Properties of the cluster. */
export interface ClusterProperties {
  /** Indicates whether the cluster was created using AAD authentication. */
  readonly aadAuthEnabled?: AadEnabledEnum;
  /** The administrator's login name of the servers in the cluster. */
  readonly administratorLogin?: string;
  /** The password of the administrator login. Required for creation. */
  administratorLoginPassword?: string;
  /** The data encryption properties of a cluster. */
  dataEncryption?: DataEncryption;
  /** Provisioning state of the cluster */
  readonly provisioningState?: string;
  /** A state of a cluster/server that is visible to user. */
  readonly state?: string;
  /** The major PostgreSQL version on all cluster servers. */
  postgresqlVersion?: string;
  /** The Citus extension version on all cluster servers. */
  citusVersion?: string;
  /** Maintenance window of a cluster. */
  maintenanceWindow?: MaintenanceWindow;
  /** Preferred primary availability zone (AZ) for all cluster servers. */
  preferredPrimaryZone?: string;
  /** If distributed tables are placed on coordinator or not. Should be set to 'true' on single node clusters. Requires shard rebalancing after value is changed. */
  enableShardsOnCoordinator?: boolean;
  /** If high availability (HA) is enabled or not for the cluster. */
  enableHa?: boolean;
  /** The edition of a coordinator server (default: GeneralPurpose). Required for creation. */
  coordinatorServerEdition?: string;
  /** The storage of a server in MB. Required for creation. See https://learn.microsoft.com/azure/cosmos-db/postgresql/resources-compute for more information. */
  coordinatorStorageQuotaInMb?: number;
  /** The vCores count of a server (max: 96). Required for creation. See https://learn.microsoft.com/azure/cosmos-db/postgresql/resources-compute for more information. */
  coordinatorVCores?: number;
  /** If public access is enabled on coordinator. */
  coordinatorEnablePublicIpAccess?: boolean;
  /** The edition of a node server (default: MemoryOptimized). */
  nodeServerEdition?: string;
  /** Worker node count of the cluster. When node count is 0, it represents a single node configuration with the ability to create distributed tables on that node. 2 or more worker nodes represent multi-node configuration. Node count value cannot be 1. Required for creation. */
  nodeCount?: number;
  /** The storage in MB on each worker node. See https://learn.microsoft.com/azure/cosmos-db/postgresql/resources-compute for more information. */
  nodeStorageQuotaInMb?: number;
  /** The compute in vCores on each worker node (max: 104). See https://learn.microsoft.com/azure/cosmos-db/postgresql/resources-compute for more information. */
  nodeVCores?: number;
  /** If public access is enabled on worker nodes. */
  nodeEnablePublicIpAccess?: boolean;
  /** The list of server names in the cluster */
  readonly serverNames?: ServerNameItem[];
  /** The resource id of source cluster for read replica clusters. */
  sourceResourceId?: string;
  /** The Azure region of source cluster for read replica clusters. */
  sourceLocation?: string;
  /** Indicates whether the cluster was created with a password or using AAD authentication. */
  readonly passwordEnabled?: PasswordEnabledEnum;
  /** Date and time in UTC (ISO8601 format) for cluster restore. */
  pointInTimeUTC?: Date;
  /** The array of read replica clusters. */
  readonly readReplicas?: string[];
  /** The earliest restore point time (ISO8601 format) for the cluster. */
  readonly earliestRestoreTime?: Date;
  /** The private endpoint connections for a cluster. */
  readonly privateEndpointConnections?: SimplePrivateEndpointConnection[];
  /** The database name of the cluster. Only one database per cluster is supported. */
  databaseName?: string;
  /** If cluster backup is stored in another Azure region in addition to the copy of the backup stored in the cluster's region. Enabled only at the time of cluster creation. */
  enableGeoBackup?: boolean;
  /** Authentication configuration of a cluster. */
  authConfig?: AuthConfig;
}

export function clusterPropertiesSerializer(item: ClusterProperties): any {
  return {
    administratorLoginPassword: item["administratorLoginPassword"],
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : dataEncryptionSerializer(item["dataEncryption"]),
    postgresqlVersion: item["postgresqlVersion"],
    citusVersion: item["citusVersion"],
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowSerializer(item["maintenanceWindow"]),
    preferredPrimaryZone: item["preferredPrimaryZone"],
    enableShardsOnCoordinator: item["enableShardsOnCoordinator"],
    enableHa: item["enableHa"],
    coordinatorServerEdition: item["coordinatorServerEdition"],
    coordinatorStorageQuotaInMb: item["coordinatorStorageQuotaInMb"],
    coordinatorVCores: item["coordinatorVCores"],
    coordinatorEnablePublicIpAccess: item["coordinatorEnablePublicIpAccess"],
    nodeServerEdition: item["nodeServerEdition"],
    nodeCount: item["nodeCount"],
    nodeStorageQuotaInMb: item["nodeStorageQuotaInMb"],
    nodeVCores: item["nodeVCores"],
    nodeEnablePublicIpAccess: item["nodeEnablePublicIpAccess"],
    sourceResourceId: item["sourceResourceId"],
    sourceLocation: item["sourceLocation"],
    pointInTimeUTC: !item["pointInTimeUTC"]
      ? item["pointInTimeUTC"]
      : item["pointInTimeUTC"].toISOString(),
    databaseName: item["databaseName"],
    enableGeoBackup: item["enableGeoBackup"],
    authConfig: !item["authConfig"] ? item["authConfig"] : authConfigSerializer(item["authConfig"]),
  };
}

export function clusterPropertiesDeserializer(item: any): ClusterProperties {
  return {
    aadAuthEnabled: item["aadAuthEnabled"],
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : dataEncryptionDeserializer(item["dataEncryption"]),
    provisioningState: item["provisioningState"],
    state: item["state"],
    postgresqlVersion: item["postgresqlVersion"],
    citusVersion: item["citusVersion"],
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowDeserializer(item["maintenanceWindow"]),
    preferredPrimaryZone: item["preferredPrimaryZone"],
    enableShardsOnCoordinator: item["enableShardsOnCoordinator"],
    enableHa: item["enableHa"],
    coordinatorServerEdition: item["coordinatorServerEdition"],
    coordinatorStorageQuotaInMb: item["coordinatorStorageQuotaInMb"],
    coordinatorVCores: item["coordinatorVCores"],
    coordinatorEnablePublicIpAccess: item["coordinatorEnablePublicIpAccess"],
    nodeServerEdition: item["nodeServerEdition"],
    nodeCount: item["nodeCount"],
    nodeStorageQuotaInMb: item["nodeStorageQuotaInMb"],
    nodeVCores: item["nodeVCores"],
    nodeEnablePublicIpAccess: item["nodeEnablePublicIpAccess"],
    serverNames: !item["serverNames"]
      ? item["serverNames"]
      : serverNameItemArrayDeserializer(item["serverNames"]),
    sourceResourceId: item["sourceResourceId"],
    sourceLocation: item["sourceLocation"],
    passwordEnabled: item["passwordEnabled"],
    pointInTimeUTC: !item["pointInTimeUTC"]
      ? item["pointInTimeUTC"]
      : new Date(item["pointInTimeUTC"]),
    readReplicas: !item["readReplicas"]
      ? item["readReplicas"]
      : item["readReplicas"].map((p: any) => {
          return p;
        }),
    earliestRestoreTime: !item["earliestRestoreTime"]
      ? item["earliestRestoreTime"]
      : new Date(item["earliestRestoreTime"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : simplePrivateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    databaseName: item["databaseName"],
    enableGeoBackup: item["enableGeoBackup"],
    authConfig: !item["authConfig"]
      ? item["authConfig"]
      : authConfigDeserializer(item["authConfig"]),
  };
}

/** Indicates whether the cluster was created using AAD authentication. */
export enum KnownAadEnabledEnum {
  /** enabled */
  Enabled = "enabled",
  /** disabled */
  Disabled = "disabled",
}

/**
 * Indicates whether the cluster was created using AAD authentication. \
 * {@link KnownAadEnabledEnum} can be used interchangeably with AadEnabledEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled** \
 * **disabled**
 */
export type AadEnabledEnum = string;

/** The data encryption properties of a cluster. */
export interface DataEncryption {
  /** URI for the key in keyvault for data encryption of the primary server. */
  primaryKeyUri?: string;
  /** Resource Id for the User assigned identity to be used for data encryption of the primary server. */
  primaryUserAssignedIdentityId?: string;
  type?: DataEncryptionType;
}

export function dataEncryptionSerializer(item: DataEncryption): any {
  return {
    primaryKeyUri: item["primaryKeyUri"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    type: item["type"],
  };
}

export function dataEncryptionDeserializer(item: any): DataEncryption {
  return {
    primaryKeyUri: item["primaryKeyUri"],
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    type: item["type"],
  };
}

/** Known values of {@link DataEncryptionType} that the service accepts. */
export enum KnownDataEncryptionType {
  /** AzureKeyVault */
  AzureKeyVault = "AzureKeyVault",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
}

/** Type of DataEncryptionType */
export type DataEncryptionType = string;

/** Schedule settings for regular cluster updates. */
export interface MaintenanceWindow {
  /** Indicates whether custom maintenance window is enabled or not. */
  customWindow?: string;
  /** Start hour within preferred day of the week for maintenance window. */
  startHour?: number;
  /** Start minute within the start hour for maintenance window. */
  startMinute?: number;
  /** Preferred day of the week for maintenance window. */
  dayOfWeek?: number;
}

export function maintenanceWindowSerializer(item: MaintenanceWindow): any {
  return {
    customWindow: item["customWindow"],
    startHour: item["startHour"],
    startMinute: item["startMinute"],
    dayOfWeek: item["dayOfWeek"],
  };
}

export function maintenanceWindowDeserializer(item: any): MaintenanceWindow {
  return {
    customWindow: item["customWindow"],
    startHour: item["startHour"],
    startMinute: item["startMinute"],
    dayOfWeek: item["dayOfWeek"],
  };
}

export function serverNameItemArrayDeserializer(result: Array<ServerNameItem>): any[] {
  return result.map((item) => {
    return serverNameItemDeserializer(item);
  });
}

/** The name object for a server. */
export interface ServerNameItem {
  /** The name of a server. */
  name?: string;
  /** The fully qualified domain name of a server. */
  readonly fullyQualifiedDomainName?: string;
}

export function serverNameItemDeserializer(item: any): ServerNameItem {
  return {
    name: item["name"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
  };
}

/** Indicates whether the cluster was created with a password or using AAD authentication. */
export enum KnownPasswordEnabledEnum {
  /** enabled */
  Enabled = "enabled",
  /** disabled */
  Disabled = "disabled",
}

/**
 * Indicates whether the cluster was created with a password or using AAD authentication. \
 * {@link KnownPasswordEnabledEnum} can be used interchangeably with PasswordEnabledEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **enabled** \
 * **disabled**
 */
export type PasswordEnabledEnum = string;

export function simplePrivateEndpointConnectionArrayDeserializer(
  result: Array<SimplePrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return simplePrivateEndpointConnectionDeserializer(item);
  });
}

/** A private endpoint connection. */
export interface SimplePrivateEndpointConnection extends ProxyResource {
  /** Private endpoint which the connection belongs to. */
  privateEndpoint?: PrivateEndpointProperty;
  /** Group ids of the private endpoint connection. */
  groupIds?: string[];
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function simplePrivateEndpointConnectionDeserializer(
  item: any,
): SimplePrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _simplePrivateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** The properties in private endpoint connection */
export interface PrivateEndpointConnectionSimpleProperties {
  /** Private endpoint which the connection belongs to. */
  privateEndpoint?: PrivateEndpointProperty;
  /** Group ids of the private endpoint connection. */
  groupIds?: string[];
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionSimplePropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionSimpleProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertyDeserializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
  };
}

/** Property to represent resource id of the private endpoint. */
export interface PrivateEndpointProperty {
  /** Resource id of the private endpoint. */
  id?: string;
}

export function privateEndpointPropertyDeserializer(item: any): PrivateEndpointProperty {
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

/** Authentication configuration of a cluster. */
export interface AuthConfig {
  activeDirectoryAuth?: ActiveDirectoryAuth;
  passwordAuth?: PasswordAuth;
}

export function authConfigSerializer(item: AuthConfig): any {
  return { activeDirectoryAuth: item["activeDirectoryAuth"], passwordAuth: item["passwordAuth"] };
}

export function authConfigDeserializer(item: any): AuthConfig {
  return {
    activeDirectoryAuth: item["activeDirectoryAuth"],
    passwordAuth: item["passwordAuth"],
  };
}

/** Known values of {@link ActiveDirectoryAuth} that the service accepts. */
export enum KnownActiveDirectoryAuth {
  /** enabled */
  Enabled = "enabled",
  /** disabled */
  Disabled = "disabled",
}

/** Type of ActiveDirectoryAuth */
export type ActiveDirectoryAuth = string;

/** Known values of {@link PasswordAuth} that the service accepts. */
export enum KnownPasswordAuth {
  /** enabled */
  Enabled = "enabled",
  /** disabled */
  Disabled = "disabled",
}

/** Type of PasswordAuth */
export type PasswordAuth = string;

/** Describes the identity of the cluster. */
export interface IdentityProperties {
  type?: IdentityType;
  /** The set of user assigned identities associated with the resource. The userAssignedIdentities dictionary keys will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}. The dictionary values can be empty objects ({}) in requests. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function identityPropertiesSerializer(item: IdentityProperties): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityPropertiesDeserializer(item: any): IdentityProperties {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Known values of {@link IdentityType} that the service accepts. */
export enum KnownIdentityType {
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
}

/** Type of IdentityType */
export type IdentityType = string;

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

/** Represents a cluster for update. */
export interface ClusterForUpdate {
  /** Describes the identity of the cluster. */
  identity?: IdentityProperties;
  /** Application-specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** The password of the administrator login. Each cluster is created with pre-defined administrative role called ‘citus’. */
  administratorLoginPassword?: string;
  /** The major PostgreSQL version on all cluster servers. */
  postgresqlVersion?: string;
  /** The Citus extension version on all cluster servers. */
  citusVersion?: string;
  /** If distributed tables are placed on coordinator or not. Should be set to 'true' on single node clusters. Requires shard rebalancing after value is changed. */
  enableShardsOnCoordinator?: boolean;
  /** If high availability (HA) is enabled or not for the cluster. */
  enableHa?: boolean;
  /** Preferred primary availability zone (AZ) for all cluster servers. */
  preferredPrimaryZone?: string;
  /** The edition of the coordinator (default: GeneralPurpose). */
  coordinatorServerEdition?: string;
  /** The storage of the coordinator in MB. */
  coordinatorStorageQuotaInMb?: number;
  /** The vCores count of the coordinator (max: 96). */
  coordinatorVCores?: number;
  /** If public access is enabled on coordinator. */
  coordinatorEnablePublicIpAccess?: boolean;
  /** The edition of a node (default: MemoryOptimized). */
  nodeServerEdition?: string;
  /** Worker node count of the cluster. When node count is 0, it represents a single node configuration with the ability to create distributed tables on that node. 2 or more worker nodes represent multi-node configuration. Node count value cannot be 1. */
  nodeCount?: number;
  /** The storage in MB on each worker node. */
  nodeStorageQuotaInMb?: number;
  /** The compute in vCores on each worker node (max: 104). */
  nodeVCores?: number;
  /** If public access is enabled on worker nodes. */
  readonly nodeEnablePublicIpAccess?: boolean;
  /** Maintenance window of a cluster. */
  maintenanceWindow?: MaintenanceWindow;
}

export function clusterForUpdateSerializer(item: ClusterForUpdate): any {
  return {
    properties: areAllPropsUndefined(item, [
      "administratorLoginPassword",
      "postgresqlVersion",
      "citusVersion",
      "enableShardsOnCoordinator",
      "enableHa",
      "preferredPrimaryZone",
      "coordinatorServerEdition",
      "coordinatorStorageQuotaInMb",
      "coordinatorVCores",
      "coordinatorEnablePublicIpAccess",
      "nodeServerEdition",
      "nodeCount",
      "nodeStorageQuotaInMb",
      "nodeVCores",
      "maintenanceWindow",
    ])
      ? undefined
      : _clusterForUpdatePropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
    tags: item["tags"],
  };
}

/** The properties used to update a cluster. */
export interface ClusterPropertiesForUpdate {
  /** The password of the administrator login. Each cluster is created with pre-defined administrative role called ‘citus’. */
  administratorLoginPassword?: string;
  /** The major PostgreSQL version on all cluster servers. */
  postgresqlVersion?: string;
  /** The Citus extension version on all cluster servers. */
  citusVersion?: string;
  /** If distributed tables are placed on coordinator or not. Should be set to 'true' on single node clusters. Requires shard rebalancing after value is changed. */
  enableShardsOnCoordinator?: boolean;
  /** If high availability (HA) is enabled or not for the cluster. */
  enableHa?: boolean;
  /** Preferred primary availability zone (AZ) for all cluster servers. */
  preferredPrimaryZone?: string;
  /** The edition of the coordinator (default: GeneralPurpose). */
  coordinatorServerEdition?: string;
  /** The storage of the coordinator in MB. */
  coordinatorStorageQuotaInMb?: number;
  /** The vCores count of the coordinator (max: 96). */
  coordinatorVCores?: number;
  /** If public access is enabled on coordinator. */
  coordinatorEnablePublicIpAccess?: boolean;
  /** The edition of a node (default: MemoryOptimized). */
  nodeServerEdition?: string;
  /** Worker node count of the cluster. When node count is 0, it represents a single node configuration with the ability to create distributed tables on that node. 2 or more worker nodes represent multi-node configuration. Node count value cannot be 1. */
  nodeCount?: number;
  /** The storage in MB on each worker node. */
  nodeStorageQuotaInMb?: number;
  /** The compute in vCores on each worker node (max: 104). */
  nodeVCores?: number;
  /** If public access is enabled on worker nodes. */
  readonly nodeEnablePublicIpAccess?: boolean;
  /** Maintenance window of a cluster. */
  maintenanceWindow?: MaintenanceWindow;
}

export function clusterPropertiesForUpdateSerializer(item: ClusterPropertiesForUpdate): any {
  return {
    administratorLoginPassword: item["administratorLoginPassword"],
    postgresqlVersion: item["postgresqlVersion"],
    citusVersion: item["citusVersion"],
    enableShardsOnCoordinator: item["enableShardsOnCoordinator"],
    enableHa: item["enableHa"],
    preferredPrimaryZone: item["preferredPrimaryZone"],
    coordinatorServerEdition: item["coordinatorServerEdition"],
    coordinatorStorageQuotaInMb: item["coordinatorStorageQuotaInMb"],
    coordinatorVCores: item["coordinatorVCores"],
    coordinatorEnablePublicIpAccess: item["coordinatorEnablePublicIpAccess"],
    nodeServerEdition: item["nodeServerEdition"],
    nodeCount: item["nodeCount"],
    nodeStorageQuotaInMb: item["nodeStorageQuotaInMb"],
    nodeVCores: item["nodeVCores"],
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowSerializer(item["maintenanceWindow"]),
  };
}

/** The response of a Cluster list operation. */
export interface _ClusterListResult {
  /** The Cluster items on this page */
  value: Cluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterListResultDeserializer(item: any): _ClusterListResult {
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

/** Request from client to promote geo-redundant replica */
export interface PromoteRequest {
  /** Boolean property to enable geo-redundant replica promotion. */
  enableGeoBackup?: boolean;
}

export function promoteRequestSerializer(item: PromoteRequest): any {
  return { enableGeoBackup: item["enableGeoBackup"] };
}

/** Request from client to check cluster name availability. */
export interface NameAvailabilityRequest {
  /** Cluster name to verify. */
  name: string;
  /** Resource type used for verification. */
  type: CheckNameAvailabilityResourceType;
}

export function nameAvailabilityRequestSerializer(item: NameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** Resource type used for name availability verification. */
export type CheckNameAvailabilityResourceType = "Microsoft.DBforPostgreSQL/serverGroupsv2";

/** Represents cluster name availability. */
export interface NameAvailability {
  /** Error message. */
  message?: string;
  /** Indicates whether the cluster name is available. */
  nameAvailable?: boolean;
  /** Name of the cluster. */
  name?: string;
  /** Type of the cluster. */
  type?: string;
}

export function nameAvailabilityDeserializer(item: any): NameAvailability {
  return {
    message: item["message"],
    nameAvailable: item["nameAvailable"],
    name: item["name"],
    type: item["type"],
  };
}

/** Represents configuration details for coordinator and node. */
export interface Configuration extends ProxyResource {
  /** Description of the configuration. */
  readonly description?: string;
  /** Data type of the configuration. */
  readonly dataType?: ConfigurationDataType;
  /** Allowed values of the configuration. */
  readonly allowedValues?: string;
  /** If configuration change requires restart. */
  requiresRestart?: boolean;
  /** The list of server role group configuration values. */
  serverRoleGroupConfigurations?: ServerRoleGroupConfiguration[];
  /** Provisioning state of the configuration */
  readonly provisioningState?: ProvisioningState;
}

export function configurationDeserializer(item: any): Configuration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _configurationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of configuration. */
export interface ConfigurationProperties {
  /** Description of the configuration. */
  readonly description?: string;
  /** Data type of the configuration. */
  readonly dataType?: ConfigurationDataType;
  /** Allowed values of the configuration. */
  readonly allowedValues?: string;
  /** If configuration change requires restart. */
  requiresRestart?: boolean;
  /** The list of server role group configuration values. */
  serverRoleGroupConfigurations: ServerRoleGroupConfiguration[];
  /** Provisioning state of the configuration */
  readonly provisioningState?: ProvisioningState;
}

export function configurationPropertiesDeserializer(item: any): ConfigurationProperties {
  return {
    description: item["description"],
    dataType: item["dataType"],
    allowedValues: item["allowedValues"],
    requiresRestart: item["requiresRestart"],
    serverRoleGroupConfigurations: serverRoleGroupConfigurationArrayDeserializer(
      item["serverRoleGroupConfigurations"],
    ),
    provisioningState: item["provisioningState"],
  };
}

/** Data type of the configuration. */
export enum KnownConfigurationDataType {
  /** Boolean */
  Boolean = "Boolean",
  /** Numeric */
  Numeric = "Numeric",
  /** Integer */
  Integer = "Integer",
  /** Enumeration */
  Enumeration = "Enumeration",
}

/**
 * Data type of the configuration. \
 * {@link KnownConfigurationDataType} can be used interchangeably with ConfigurationDataType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Boolean** \
 * **Numeric** \
 * **Integer** \
 * **Enumeration**
 */
export type ConfigurationDataType = string;

export function serverRoleGroupConfigurationArrayDeserializer(
  result: Array<ServerRoleGroupConfiguration>,
): any[] {
  return result.map((item) => {
    return serverRoleGroupConfigurationDeserializer(item);
  });
}

/** Represents server role group configuration value. */
export interface ServerRoleGroupConfiguration {
  /** The role of servers in the server role group. */
  role: ServerRole;
  /** Value of the configuration. */
  value: string;
  /** Default value of the configuration. */
  readonly defaultValue?: string;
  /** Source of the configuration. */
  readonly source?: string;
}

export function serverRoleGroupConfigurationDeserializer(item: any): ServerRoleGroupConfiguration {
  return {
    role: item["role"],
    value: item["value"],
    defaultValue: item["defaultValue"],
    source: item["source"],
  };
}

/** The role of a server. */
export enum KnownServerRole {
  /** Coordinator */
  Coordinator = "Coordinator",
  /** Worker */
  Worker = "Worker",
}

/**
 * The role of a server. \
 * {@link KnownServerRole} can be used interchangeably with ServerRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Coordinator** \
 * **Worker**
 */
export type ServerRole = string;

/** The current provisioning state. */
export enum KnownProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** InProgress */
  InProgress = "InProgress",
  /** Failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Canceled** \
 * **InProgress** \
 * **Failed**
 */
export type ProvisioningState = string;

/** Pagination result of configurations. */
export interface _ClusterConfigurationListResult {
  /** The list of configurations. */
  value?: Configuration[];
  /** The link to the next page of results. */
  nextLink?: string;
}

export function _clusterConfigurationListResultDeserializer(
  item: any,
): _ClusterConfigurationListResult {
  return {
    value: !item["value"] ? item["value"] : configurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function configurationArrayDeserializer(result: Array<Configuration>): any[] {
  return result.map((item) => {
    return configurationDeserializer(item);
  });
}

/** The response of a ServerConfiguration list operation. */
export interface _ServerConfigurationListResult {
  /** The ServerConfiguration items on this page */
  value: ServerConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverConfigurationListResultDeserializer(
  item: any,
): _ServerConfigurationListResult {
  return {
    value: serverConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverConfigurationArraySerializer(result: Array<ServerConfiguration>): any[] {
  return result.map((item) => {
    return serverConfigurationSerializer(item);
  });
}

export function serverConfigurationArrayDeserializer(result: Array<ServerConfiguration>): any[] {
  return result.map((item) => {
    return serverConfigurationDeserializer(item);
  });
}

/** Represents a configuration. */
export interface ServerConfiguration extends ProxyResource {
  /** Value of the configuration. */
  value?: string;
  /** Source of the configuration. */
  readonly source?: string;
  /** Description of the configuration. */
  readonly description?: string;
  /** Default value of the configuration. */
  readonly defaultValue?: string;
  /** Data type of the configuration. */
  readonly dataType?: ConfigurationDataType;
  /** Allowed values of the configuration. */
  readonly allowedValues?: string;
  /** If configuration change requires restart. */
  readonly requiresRestart?: boolean;
  /** Provisioning state of the configuration. */
  readonly provisioningState?: ProvisioningState;
}

export function serverConfigurationSerializer(item: ServerConfiguration): any {
  return {
    properties: areAllPropsUndefined(item, ["value"])
      ? undefined
      : _serverConfigurationPropertiesSerializer(item),
  };
}

export function serverConfigurationDeserializer(item: any): ServerConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverConfigurationPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a configuration. */
export interface ServerConfigurationProperties {
  /** Value of the configuration. */
  value: string;
  /** Source of the configuration. */
  readonly source?: string;
  /** Description of the configuration. */
  readonly description?: string;
  /** Default value of the configuration. */
  readonly defaultValue?: string;
  /** Data type of the configuration. */
  readonly dataType?: ConfigurationDataType;
  /** Allowed values of the configuration. */
  readonly allowedValues?: string;
  /** If configuration change requires restart. */
  readonly requiresRestart?: boolean;
  /** Provisioning state of the configuration. */
  readonly provisioningState?: ProvisioningState;
}

export function serverConfigurationPropertiesSerializer(item: ServerConfigurationProperties): any {
  return { value: item["value"] };
}

export function serverConfigurationPropertiesDeserializer(
  item: any,
): ServerConfigurationProperties {
  return {
    value: item["value"],
    source: item["source"],
    description: item["description"],
    defaultValue: item["defaultValue"],
    dataType: item["dataType"],
    allowedValues: item["allowedValues"],
    requiresRestart: item["requiresRestart"],
    provisioningState: item["provisioningState"],
  };
}

/** Represents a cluster firewall rule. */
export interface FirewallRule extends ProxyResource {
  /** The start IP address of the cluster firewall rule. Must be IPv4 format. */
  startIpAddress: string;
  /** The end IP address of the cluster firewall rule. Must be IPv4 format. */
  endIpAddress: string;
  /** Provisioning state of the firewall rule. */
  readonly provisioningState?: ProvisioningState;
}

export function firewallRuleSerializer(item: FirewallRule): any {
  return { properties: _firewallRulePropertiesSerializer(item) };
}

export function firewallRuleDeserializer(item: any): FirewallRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._firewallRulePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a cluster firewall rule. */
export interface FirewallRuleProperties {
  /** The start IP address of the cluster firewall rule. Must be IPv4 format. */
  startIpAddress: string;
  /** The end IP address of the cluster firewall rule. Must be IPv4 format. */
  endIpAddress: string;
  /** Provisioning state of the firewall rule. */
  readonly provisioningState?: ProvisioningState;
}

export function firewallRulePropertiesSerializer(item: FirewallRuleProperties): any {
  return { startIpAddress: item["startIpAddress"], endIpAddress: item["endIpAddress"] };
}

export function firewallRulePropertiesDeserializer(item: any): FirewallRuleProperties {
  return {
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
    provisioningState: item["provisioningState"],
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

/** A private endpoint connection resource */
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

export function privateEndpointSerializer(_item: PrivateEndpoint): any {
  return {};
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

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

/** A private link resource. */
export interface PrivateLinkResource extends ProxyResource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
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

/** Represents a cluster role. */
export interface Role extends ProxyResource {
  roleType?: RoleType;
  /** The password of the cluster role. If an identity is used, password will not be required. */
  password?: string;
  externalIdentity?: RolePropertiesExternalIdentity;
  /** Provisioning state of the role */
  readonly provisioningState?: ProvisioningState;
}

export function roleSerializer(item: Role): any {
  return { properties: _rolePropertiesSerializer(item) };
}

export function roleDeserializer(item: any): Role {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._rolePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a cluster role. */
export interface RoleProperties {
  roleType?: RoleType;
  /** The password of the cluster role. If an identity is used, password will not be required. */
  password?: string;
  /** Provisioning state of the role */
  readonly provisioningState?: ProvisioningState;
  /** A type definition that refers the id to an Azure Resource Manager resource. */
  objectId?: string;
  principalType?: PrincipalType;
  /** A type definition that refers the id to an Azure Resource Manager resource. */
  tenantId?: string;
}

export function rolePropertiesSerializer(item: RoleProperties): any {
  return {
    roleType: item["roleType"],
    password: item["password"],
    externalIdentity: areAllPropsUndefined(item, ["objectId", "principalType", "tenantId"])
      ? undefined
      : _rolePropertiesExternalIdentitySerializer(item),
  };
}

export function rolePropertiesDeserializer(item: any): RoleProperties {
  return {
    roleType: item["roleType"],
    password: item["password"],
    ...(!item["externalIdentity"]
      ? item["externalIdentity"]
      : _rolePropertiesExternalIdentityDeserializer(item["externalIdentity"])),
    provisioningState: item["provisioningState"],
  };
}

/** Known values of {@link RoleType} that the service accepts. */
export enum KnownRoleType {
  /** user */
  User = "user",
  /** admin */
  Admin = "admin",
}

/** Type of RoleType */
export type RoleType = string;

/** model interface RolePropertiesExternalIdentity */
export interface RolePropertiesExternalIdentity {
  /** A type definition that refers the id to an Azure Resource Manager resource. */
  objectId: string;
  principalType: PrincipalType;
  /** A type definition that refers the id to an Azure Resource Manager resource. */
  tenantId?: string;
}

export function rolePropertiesExternalIdentitySerializer(
  item: RolePropertiesExternalIdentity,
): any {
  return {
    objectId: item["objectId"],
    principalType: item["principalType"],
    tenantId: item["tenantId"],
  };
}

export function rolePropertiesExternalIdentityDeserializer(
  item: any,
): RolePropertiesExternalIdentity {
  return {
    objectId: item["objectId"],
    principalType: item["principalType"],
    tenantId: item["tenantId"],
  };
}

/** Known values of {@link PrincipalType} that the service accepts. */
export enum KnownPrincipalType {
  /** user */
  User = "user",
  /** servicePrincipal */
  ServicePrincipal = "servicePrincipal",
  /** group */
  Group = "group",
}

/** Type of PrincipalType */
export type PrincipalType = string;

/** The response of a Role list operation. */
export interface _RoleListResult {
  /** The Role items on this page */
  value: Role[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _roleListResultDeserializer(item: any): _RoleListResult {
  return {
    value: roleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function roleArraySerializer(result: Array<Role>): any[] {
  return result.map((item) => {
    return roleSerializer(item);
  });
}

export function roleArrayDeserializer(result: Array<Role>): any[] {
  return result.map((item) => {
    return roleDeserializer(item);
  });
}

/** Represents a server in a cluster. */
export interface ClusterServer extends ProxyResource {
  /** The edition of a server. */
  serverEdition?: string;
  /** The storage of a server in MB. */
  storageQuotaInMb?: number;
  /** The vCores count of a server. */
  vCores?: number;
  /** If high availability (HA) is enabled or not for the server. */
  enableHa?: boolean;
  /** If public access is enabled on server. */
  readonly enablePublicIpAccess?: boolean;
  /** If server database is set to read-only by system maintenance depending on high disk space usage. */
  readonly isReadOnly?: boolean;
  /** The administrator's login name of the servers in the cluster. */
  readonly administratorLogin?: string;
  /** The fully qualified domain name of a server. */
  readonly fullyQualifiedDomainName?: string;
  /** The role of server in the cluster. */
  role?: ServerRole;
  /** A state of a cluster/server that is visible to user. */
  readonly state?: string;
  /** A state of HA feature for the cluster. */
  readonly haState?: string;
  /** Availability Zone information of the server. */
  availabilityZone?: string;
  /** The major PostgreSQL version of server. */
  postgresqlVersion?: string;
  /** The Citus extension version of server. */
  citusVersion?: string;
}

export function clusterServerDeserializer(item: any): ClusterServer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _clusterServerPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a server in cluster. */
export interface ClusterServerProperties extends ServerProperties {
  /** The fully qualified domain name of a server. */
  readonly fullyQualifiedDomainName?: string;
  /** The role of server in the cluster. */
  role?: ServerRole;
  /** A state of a cluster/server that is visible to user. */
  readonly state?: string;
  /** A state of HA feature for the cluster. */
  readonly haState?: string;
  /** Availability Zone information of the server. */
  availabilityZone?: string;
  /** The major PostgreSQL version of server. */
  postgresqlVersion?: string;
  /** The Citus extension version of server. */
  citusVersion?: string;
}

export function clusterServerPropertiesDeserializer(item: any): ClusterServerProperties {
  return {
    serverEdition: item["serverEdition"],
    storageQuotaInMb: item["storageQuotaInMb"],
    vCores: item["vCores"],
    enableHa: item["enableHa"],
    enablePublicIpAccess: item["enablePublicIpAccess"],
    isReadOnly: item["isReadOnly"],
    administratorLogin: item["administratorLogin"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    role: item["role"],
    state: item["state"],
    haState: item["haState"],
    availabilityZone: item["availabilityZone"],
    postgresqlVersion: item["postgresqlVersion"],
    citusVersion: item["citusVersion"],
  };
}

/** The properties of a server. */
export interface ServerProperties {
  /** The edition of a server. */
  serverEdition?: string;
  /** The storage of a server in MB. */
  storageQuotaInMb?: number;
  /** The vCores count of a server. */
  vCores?: number;
  /** If high availability (HA) is enabled or not for the server. */
  enableHa?: boolean;
  /** If public access is enabled on server. */
  readonly enablePublicIpAccess?: boolean;
  /** If server database is set to read-only by system maintenance depending on high disk space usage. */
  readonly isReadOnly?: boolean;
  /** The administrator's login name of the servers in the cluster. */
  readonly administratorLogin?: string;
}

export function serverPropertiesDeserializer(item: any): ServerProperties {
  return {
    serverEdition: item["serverEdition"],
    storageQuotaInMb: item["storageQuotaInMb"],
    vCores: item["vCores"],
    enableHa: item["enableHa"],
    enablePublicIpAccess: item["enablePublicIpAccess"],
    isReadOnly: item["isReadOnly"],
    administratorLogin: item["administratorLogin"],
  };
}

/** The response of a ClusterServer list operation. */
export interface _ClusterServerListResult {
  /** The ClusterServer items on this page */
  value: ClusterServer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterServerListResultDeserializer(item: any): _ClusterServerListResult {
  return {
    value: clusterServerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterServerArrayDeserializer(result: Array<ClusterServer>): any[] {
  return result.map((item) => {
    return clusterServerDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-03-02-preview API version. */
  V20230302Preview = "2023-03-02-preview",
}

export function _simplePrivateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointPropertyDeserializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _clusterPropertiesSerializer(item: Cluster): any {
  return {
    administratorLoginPassword: item["administratorLoginPassword"],
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : dataEncryptionSerializer(item["dataEncryption"]),
    postgresqlVersion: item["postgresqlVersion"],
    citusVersion: item["citusVersion"],
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowSerializer(item["maintenanceWindow"]),
    preferredPrimaryZone: item["preferredPrimaryZone"],
    enableShardsOnCoordinator: item["enableShardsOnCoordinator"],
    enableHa: item["enableHa"],
    coordinatorServerEdition: item["coordinatorServerEdition"],
    coordinatorStorageQuotaInMb: item["coordinatorStorageQuotaInMb"],
    coordinatorVCores: item["coordinatorVCores"],
    coordinatorEnablePublicIpAccess: item["coordinatorEnablePublicIpAccess"],
    nodeServerEdition: item["nodeServerEdition"],
    nodeCount: item["nodeCount"],
    nodeStorageQuotaInMb: item["nodeStorageQuotaInMb"],
    nodeVCores: item["nodeVCores"],
    nodeEnablePublicIpAccess: item["nodeEnablePublicIpAccess"],
    sourceResourceId: item["sourceResourceId"],
    sourceLocation: item["sourceLocation"],
    pointInTimeUTC: !item["pointInTimeUTC"]
      ? item["pointInTimeUTC"]
      : item["pointInTimeUTC"].toISOString(),
    databaseName: item["databaseName"],
    enableGeoBackup: item["enableGeoBackup"],
    authConfig: !item["authConfig"] ? item["authConfig"] : authConfigSerializer(item["authConfig"]),
  };
}

export function _clusterPropertiesDeserializer(item: any) {
  return {
    aadAuthEnabled: item["aadAuthEnabled"],
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : dataEncryptionDeserializer(item["dataEncryption"]),
    provisioningState: item["provisioningState"],
    state: item["state"],
    postgresqlVersion: item["postgresqlVersion"],
    citusVersion: item["citusVersion"],
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowDeserializer(item["maintenanceWindow"]),
    preferredPrimaryZone: item["preferredPrimaryZone"],
    enableShardsOnCoordinator: item["enableShardsOnCoordinator"],
    enableHa: item["enableHa"],
    coordinatorServerEdition: item["coordinatorServerEdition"],
    coordinatorStorageQuotaInMb: item["coordinatorStorageQuotaInMb"],
    coordinatorVCores: item["coordinatorVCores"],
    coordinatorEnablePublicIpAccess: item["coordinatorEnablePublicIpAccess"],
    nodeServerEdition: item["nodeServerEdition"],
    nodeCount: item["nodeCount"],
    nodeStorageQuotaInMb: item["nodeStorageQuotaInMb"],
    nodeVCores: item["nodeVCores"],
    nodeEnablePublicIpAccess: item["nodeEnablePublicIpAccess"],
    serverNames: !item["serverNames"]
      ? item["serverNames"]
      : serverNameItemArrayDeserializer(item["serverNames"]),
    sourceResourceId: item["sourceResourceId"],
    sourceLocation: item["sourceLocation"],
    passwordEnabled: item["passwordEnabled"],
    pointInTimeUTC: !item["pointInTimeUTC"]
      ? item["pointInTimeUTC"]
      : new Date(item["pointInTimeUTC"]),
    readReplicas: !item["readReplicas"]
      ? item["readReplicas"]
      : item["readReplicas"].map((p: any) => {
          return p;
        }),
    earliestRestoreTime: !item["earliestRestoreTime"]
      ? item["earliestRestoreTime"]
      : new Date(item["earliestRestoreTime"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : simplePrivateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    databaseName: item["databaseName"],
    enableGeoBackup: item["enableGeoBackup"],
    authConfig: !item["authConfig"]
      ? item["authConfig"]
      : authConfigDeserializer(item["authConfig"]),
  };
}

export function _clusterForUpdatePropertiesSerializer(item: ClusterForUpdate): any {
  return {
    administratorLoginPassword: item["administratorLoginPassword"],
    postgresqlVersion: item["postgresqlVersion"],
    citusVersion: item["citusVersion"],
    enableShardsOnCoordinator: item["enableShardsOnCoordinator"],
    enableHa: item["enableHa"],
    preferredPrimaryZone: item["preferredPrimaryZone"],
    coordinatorServerEdition: item["coordinatorServerEdition"],
    coordinatorStorageQuotaInMb: item["coordinatorStorageQuotaInMb"],
    coordinatorVCores: item["coordinatorVCores"],
    coordinatorEnablePublicIpAccess: item["coordinatorEnablePublicIpAccess"],
    nodeServerEdition: item["nodeServerEdition"],
    nodeCount: item["nodeCount"],
    nodeStorageQuotaInMb: item["nodeStorageQuotaInMb"],
    nodeVCores: item["nodeVCores"],
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowSerializer(item["maintenanceWindow"]),
  };
}

export function _configurationPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    dataType: item["dataType"],
    allowedValues: item["allowedValues"],
    requiresRestart: item["requiresRestart"],
    serverRoleGroupConfigurations: !item["serverRoleGroupConfigurations"]
      ? item["serverRoleGroupConfigurations"]
      : serverRoleGroupConfigurationArrayDeserializer(item["serverRoleGroupConfigurations"]),
    provisioningState: item["provisioningState"],
  };
}

export function _serverConfigurationPropertiesSerializer(item: ServerConfiguration): any {
  return { value: item["value"] };
}

export function _serverConfigurationPropertiesDeserializer(item: any) {
  return {
    value: item["value"],
    source: item["source"],
    description: item["description"],
    defaultValue: item["defaultValue"],
    dataType: item["dataType"],
    allowedValues: item["allowedValues"],
    requiresRestart: item["requiresRestart"],
    provisioningState: item["provisioningState"],
  };
}

export function _firewallRulePropertiesSerializer(item: FirewallRule): any {
  return { startIpAddress: item["startIpAddress"], endIpAddress: item["endIpAddress"] };
}

export function _firewallRulePropertiesDeserializer(item: any) {
  return {
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
    provisioningState: item["provisioningState"],
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

export function _privateLinkResourcePropertiesDeserializer(item: any) {
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

export function _rolePropertiesExternalIdentitySerializer(item: RoleProperties): any {
  return {
    objectId: item["objectId"],
    principalType: item["principalType"],
    tenantId: item["tenantId"],
  };
}

export function _rolePropertiesExternalIdentityDeserializer(item: any) {
  return {
    objectId: item["objectId"],
    principalType: item["principalType"],
    tenantId: item["tenantId"],
  };
}

export function _rolePropertiesSerializer(item: Role): any {
  return {
    roleType: item["roleType"],
    password: item["password"],
    externalIdentity: !item["externalIdentity"]
      ? item["externalIdentity"]
      : rolePropertiesExternalIdentitySerializer(item["externalIdentity"]),
  };
}

export function _rolePropertiesDeserializer(item: any) {
  return {
    roleType: item["roleType"],
    password: item["password"],
    externalIdentity: !item["externalIdentity"]
      ? item["externalIdentity"]
      : rolePropertiesExternalIdentityDeserializer(item["externalIdentity"]),
    provisioningState: item["provisioningState"],
  };
}

export function _clusterServerPropertiesDeserializer(item: any) {
  return {
    serverEdition: item["serverEdition"],
    storageQuotaInMb: item["storageQuotaInMb"],
    vCores: item["vCores"],
    enableHa: item["enableHa"],
    enablePublicIpAccess: item["enablePublicIpAccess"],
    isReadOnly: item["isReadOnly"],
    administratorLogin: item["administratorLogin"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    role: item["role"],
    state: item["state"],
    haState: item["haState"],
    availabilityZone: item["availabilityZone"],
    postgresqlVersion: item["postgresqlVersion"],
    citusVersion: item["citusVersion"],
  };
}
