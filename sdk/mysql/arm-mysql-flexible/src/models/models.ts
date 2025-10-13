// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The static parameters for a resource group based resource */
export interface _OperationListResult {
  /** The Operation items on this page */
  value?: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
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
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Additional descriptions for the operation. */
  properties?: Record<string, any>;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: item["properties"],
  };
}

/** Display metadata associated with the operation. */
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

/** Represents a Administrator. */
export interface AzureADAdministrator extends ProxyResource {
  /** The properties of an administrator. */
  properties?: AdministratorProperties;
}

export function azureADAdministratorSerializer(item: AzureADAdministrator): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : administratorPropertiesSerializer(item["properties"]),
  };
}

export function azureADAdministratorDeserializer(item: any): AzureADAdministrator {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : administratorPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of an administrator. */
export interface AdministratorProperties {
  /** Type of the sever administrator. */
  administratorType?: AdministratorType;
  /** Login name of the server administrator. */
  login?: string;
  /** SID (object ID) of the server administrator. */
  sid?: string;
  /** Tenant ID of the administrator. */
  tenantId?: string;
  /** The resource id of the identity used for AAD Authentication. */
  identityResourceId?: string;
}

export function administratorPropertiesSerializer(item: AdministratorProperties): any {
  return {
    administratorType: item["administratorType"],
    login: item["login"],
    sid: item["sid"],
    tenantId: item["tenantId"],
    identityResourceId: item["identityResourceId"],
  };
}

export function administratorPropertiesDeserializer(item: any): AdministratorProperties {
  return {
    administratorType: item["administratorType"],
    login: item["login"],
    sid: item["sid"],
    tenantId: item["tenantId"],
    identityResourceId: item["identityResourceId"],
  };
}

/** Type of the sever administrator. */
export enum KnownAdministratorType {
  /** ActiveDirectory */
  ActiveDirectory = "ActiveDirectory",
}

/**
 * Type of the sever administrator. \
 * {@link KnownAdministratorType} can be used interchangeably with AdministratorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ActiveDirectory**
 */
export type AdministratorType = string;

/** Known values of {@link AdministratorName} that the service accepts. */
export enum KnownAdministratorName {
  /** ActiveDirectory */
  ActiveDirectory = "ActiveDirectory",
}

/** Type of AdministratorName */
export type AdministratorName = string;

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

/** A List of azure ad administrators. */
export interface _AdministratorListResult {
  /** The list of azure ad administrator of a server. */
  value?: AzureADAdministrator[];
  /** The link used to get the next page of operations. */
  nextLink?: string;
}

export function _administratorListResultDeserializer(item: any): _AdministratorListResult {
  return {
    value: !item["value"] ? item["value"] : azureADAdministratorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function azureADAdministratorArraySerializer(result: Array<AzureADAdministrator>): any[] {
  return result.map((item) => {
    return azureADAdministratorSerializer(item);
  });
}

export function azureADAdministratorArrayDeserializer(result: Array<AzureADAdministrator>): any[] {
  return result.map((item) => {
    return azureADAdministratorDeserializer(item);
  });
}

/** Represents a server. */
export interface Server extends TrackedResource {
  /** Properties of the server. */
  properties?: ServerProperties;
  /** The cmk identity for the server. */
  identity?: MySQLServerIdentity;
  /** The SKU (pricing tier) of the server. */
  sku?: MySQLServerSku;
}

export function serverSerializer(item: Server): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : serverPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : mySQLServerIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : mySQLServerSkuSerializer(item["sku"]),
  };
}

export function serverDeserializer(item: any): Server {
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
      : serverPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : mySQLServerIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : mySQLServerSkuDeserializer(item["sku"]),
  };
}

/** The properties of a server. */
export interface ServerProperties {
  /** The administrator's login name of a server. Can only be specified when the server is being created (and is required for creation). */
  administratorLogin?: string;
  /** The password of the administrator login (required for server creation). */
  administratorLoginPassword?: string;
  /** Major version of MySQL. 8.0.21 stands for MySQL 8.0, 5.7.44 stands for MySQL 5.7 */
  version?: ServerVersion;
  /** Major version and actual engine version */
  readonly fullVersion?: string;
  /** availability Zone information of the server. */
  availabilityZone?: string;
  /** The mode to create a new MySQL server. */
  createMode?: CreateMode;
  /** The source MySQL server id. */
  sourceServerResourceId?: string;
  /** Restore point creation time (ISO8601 format), specifying the time to restore from. */
  restorePointInTime?: Date;
  /** The replication role. */
  replicationRole?: ReplicationRole;
  /** The maximum number of replicas that a primary server can have. */
  readonly replicaCapacity?: number;
  /** The Data Encryption for CMK. */
  dataEncryption?: DataEncryption;
  /** The state of a server. */
  readonly state?: ServerState;
  /** The fully qualified domain name of a server. */
  readonly fullyQualifiedDomainName?: string;
  /** The server database port. Can only be specified when the server is being created. */
  databasePort?: number;
  /** Storage related properties of a server. */
  storage?: Storage;
  /** Backup related properties of a server. */
  backup?: Backup;
  /** High availability related properties of a server. */
  highAvailability?: HighAvailability;
  /** Network related properties of a server. */
  network?: Network;
  /** PrivateEndpointConnections related properties of a server. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Maintenance policy of a server. */
  maintenancePolicy?: MaintenancePolicy;
  /** Maintenance window of a server. Known issue: cannot be set during server creation or updated with other properties during server update; must be updated separately. */
  maintenanceWindow?: MaintenanceWindow;
  /** Source properties for import from storage. */
  importSourceProperties?: ImportSourceProperties;
}

export function serverPropertiesSerializer(item: ServerProperties): any {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    availabilityZone: item["availabilityZone"],
    createMode: item["createMode"],
    sourceServerResourceId: item["sourceServerResourceId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : item["restorePointInTime"].toISOString(),
    replicationRole: item["replicationRole"],
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : dataEncryptionSerializer(item["dataEncryption"]),
    databasePort: item["databasePort"],
    storage: !item["storage"] ? item["storage"] : storageSerializer(item["storage"]),
    backup: !item["backup"] ? item["backup"] : backupSerializer(item["backup"]),
    highAvailability: !item["highAvailability"]
      ? item["highAvailability"]
      : highAvailabilitySerializer(item["highAvailability"]),
    network: !item["network"] ? item["network"] : networkSerializer(item["network"]),
    maintenancePolicy: !item["maintenancePolicy"]
      ? item["maintenancePolicy"]
      : maintenancePolicySerializer(item["maintenancePolicy"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowSerializer(item["maintenanceWindow"]),
    importSourceProperties: !item["importSourceProperties"]
      ? item["importSourceProperties"]
      : importSourcePropertiesSerializer(item["importSourceProperties"]),
  };
}

export function serverPropertiesDeserializer(item: any): ServerProperties {
  return {
    administratorLogin: item["administratorLogin"],
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    fullVersion: item["fullVersion"],
    availabilityZone: item["availabilityZone"],
    createMode: item["createMode"],
    sourceServerResourceId: item["sourceServerResourceId"],
    restorePointInTime: !item["restorePointInTime"]
      ? item["restorePointInTime"]
      : new Date(item["restorePointInTime"]),
    replicationRole: item["replicationRole"],
    replicaCapacity: item["replicaCapacity"],
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : dataEncryptionDeserializer(item["dataEncryption"]),
    state: item["state"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    databasePort: item["databasePort"],
    storage: !item["storage"] ? item["storage"] : storageDeserializer(item["storage"]),
    backup: !item["backup"] ? item["backup"] : backupDeserializer(item["backup"]),
    highAvailability: !item["highAvailability"]
      ? item["highAvailability"]
      : highAvailabilityDeserializer(item["highAvailability"]),
    network: !item["network"] ? item["network"] : networkDeserializer(item["network"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    maintenancePolicy: !item["maintenancePolicy"]
      ? item["maintenancePolicy"]
      : maintenancePolicyDeserializer(item["maintenancePolicy"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowDeserializer(item["maintenanceWindow"]),
    importSourceProperties: !item["importSourceProperties"]
      ? item["importSourceProperties"]
      : importSourcePropertiesDeserializer(item["importSourceProperties"]),
  };
}

/** The major version of a server. 8.0.21 stands for MySQL 8.0, 5.7.44 stands for MySQL 5.7 */
export enum KnownServerVersion {
  /** 5.7 */
  Five7 = "5.7",
  /** 8.0.21 */
  Eight021 = "8.0.21",
}

/**
 * The major version of a server. 8.0.21 stands for MySQL 8.0, 5.7.44 stands for MySQL 5.7 \
 * {@link KnownServerVersion} can be used interchangeably with ServerVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **5.7** \
 * **8.0.21**
 */
export type ServerVersion = string;

/** The mode to create a new MySQL server. */
export enum KnownCreateMode {
  /** Default */
  Default = "Default",
  /** PointInTimeRestore */
  PointInTimeRestore = "PointInTimeRestore",
  /** Replica */
  Replica = "Replica",
  /** GeoRestore */
  GeoRestore = "GeoRestore",
}

/**
 * The mode to create a new MySQL server. \
 * {@link KnownCreateMode} can be used interchangeably with CreateMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **PointInTimeRestore** \
 * **Replica** \
 * **GeoRestore**
 */
export type CreateMode = string;

/** The replication role. */
export enum KnownReplicationRole {
  /** None */
  None = "None",
  /** Source */
  Source = "Source",
  /** Replica */
  Replica = "Replica",
}

/**
 * The replication role. \
 * {@link KnownReplicationRole} can be used interchangeably with ReplicationRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Source** \
 * **Replica**
 */
export type ReplicationRole = string;

/** The date encryption for cmk. */
export interface DataEncryption {
  /** Primary user identity resource id */
  primaryUserAssignedIdentityId?: string;
  /** Primary key uri */
  primaryKeyURI?: string;
  /** Geo backup user identity resource id as identity can't cross region, need identity in same region as geo backup */
  geoBackupUserAssignedIdentityId?: string;
  /** Geo backup key uri as key vault can't cross region, need cmk in same region as geo backup */
  geoBackupKeyURI?: string;
  /** The key type, AzureKeyVault for enable cmk, SystemManaged for disable cmk. */
  type?: DataEncryptionType;
}

export function dataEncryptionSerializer(item: DataEncryption): any {
  return {
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    primaryKeyURI: item["primaryKeyURI"],
    geoBackupUserAssignedIdentityId: item["geoBackupUserAssignedIdentityId"],
    geoBackupKeyURI: item["geoBackupKeyURI"],
    type: item["type"],
  };
}

export function dataEncryptionDeserializer(item: any): DataEncryption {
  return {
    primaryUserAssignedIdentityId: item["primaryUserAssignedIdentityId"],
    primaryKeyURI: item["primaryKeyURI"],
    geoBackupUserAssignedIdentityId: item["geoBackupUserAssignedIdentityId"],
    geoBackupKeyURI: item["geoBackupKeyURI"],
    type: item["type"],
  };
}

/** The key type, AzureKeyVault for enable cmk, SystemManaged for disable cmk. */
export type DataEncryptionType = "AzureKeyVault" | "SystemManaged";

/** The state of a server. */
export enum KnownServerState {
  /** Ready */
  Ready = "Ready",
  /** Dropping */
  Dropping = "Dropping",
  /** Disabled */
  Disabled = "Disabled",
  /** Starting */
  Starting = "Starting",
  /** Stopping */
  Stopping = "Stopping",
  /** Stopped */
  Stopped = "Stopped",
  /** Updating */
  Updating = "Updating",
}

/**
 * The state of a server. \
 * {@link KnownServerState} can be used interchangeably with ServerState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready** \
 * **Dropping** \
 * **Disabled** \
 * **Starting** \
 * **Stopping** \
 * **Stopped** \
 * **Updating**
 */
export type ServerState = string;

/** Storage Profile properties of a server */
export interface Storage {
  /** Max storage size allowed for a server. */
  storageSizeGB?: number;
  /** Storage IOPS for a server. */
  iops?: number;
  /** Enable Storage Auto Grow or not. */
  autoGrow?: EnableStatusEnum;
  /** Enable Log On Disk or not. */
  logOnDisk?: EnableStatusEnum;
  /** The sku name of the server storage. */
  readonly storageSku?: string;
  /** Enable IO Auto Scaling or not. */
  autoIoScaling?: EnableStatusEnum;
  /** The redundant type of the server storage. The parameter is used for server creation. */
  storageRedundancy?: StorageRedundancyEnum;
}

export function storageSerializer(item: Storage): any {
  return {
    storageSizeGB: item["storageSizeGB"],
    iops: item["iops"],
    autoGrow: item["autoGrow"],
    logOnDisk: item["logOnDisk"],
    autoIoScaling: item["autoIoScaling"],
    storageRedundancy: item["storageRedundancy"],
  };
}

export function storageDeserializer(item: any): Storage {
  return {
    storageSizeGB: item["storageSizeGB"],
    iops: item["iops"],
    autoGrow: item["autoGrow"],
    logOnDisk: item["logOnDisk"],
    storageSku: item["storageSku"],
    autoIoScaling: item["autoIoScaling"],
    storageRedundancy: item["storageRedundancy"],
  };
}

/** Enum to indicate whether value is 'Enabled' or 'Disabled' */
export enum KnownEnableStatusEnum {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Enum to indicate whether value is 'Enabled' or 'Disabled' \
 * {@link KnownEnableStatusEnum} can be used interchangeably with EnableStatusEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type EnableStatusEnum = string;

/** Enum to indicate whether storage sku value is 'ZoneRedundancy' or 'LocalRedundancy' */
export enum KnownStorageRedundancyEnum {
  /** LocalRedundancy */
  LocalRedundancy = "LocalRedundancy",
  /** ZoneRedundancy */
  ZoneRedundancy = "ZoneRedundancy",
}

/**
 * Enum to indicate whether storage sku value is 'ZoneRedundancy' or 'LocalRedundancy' \
 * {@link KnownStorageRedundancyEnum} can be used interchangeably with StorageRedundancyEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LocalRedundancy** \
 * **ZoneRedundancy**
 */
export type StorageRedundancyEnum = string;

/** Storage Profile properties of a server */
export interface Backup {
  /** Backup retention days for the server. */
  backupRetentionDays?: number;
  /** Backup interval hours for the server. */
  backupIntervalHours?: number;
  /** Whether or not geo redundant backup is enabled. */
  geoRedundantBackup?: EnableStatusEnum;
  /** Earliest restore point creation time (ISO8601 format) */
  readonly earliestRestoreDate?: Date;
}

export function backupSerializer(item: Backup): any {
  return {
    backupRetentionDays: item["backupRetentionDays"],
    backupIntervalHours: item["backupIntervalHours"],
    geoRedundantBackup: item["geoRedundantBackup"],
  };
}

export function backupDeserializer(item: any): Backup {
  return {
    backupRetentionDays: item["backupRetentionDays"],
    backupIntervalHours: item["backupIntervalHours"],
    geoRedundantBackup: item["geoRedundantBackup"],
    earliestRestoreDate: !item["earliestRestoreDate"]
      ? item["earliestRestoreDate"]
      : new Date(item["earliestRestoreDate"]),
  };
}

/** High availability properties of a server */
export interface HighAvailability {
  /** High availability mode for a server. */
  mode?: HighAvailabilityMode;
  /** The state of server high availability. */
  readonly state?: HighAvailabilityState;
  /** Availability zone of the standby server. */
  standbyAvailabilityZone?: string;
}

export function highAvailabilitySerializer(item: HighAvailability): any {
  return {
    mode: item["mode"],
    standbyAvailabilityZone: item["standbyAvailabilityZone"],
  };
}

export function highAvailabilityDeserializer(item: any): HighAvailability {
  return {
    mode: item["mode"],
    state: item["state"],
    standbyAvailabilityZone: item["standbyAvailabilityZone"],
  };
}

/** High availability mode for a server. */
export enum KnownHighAvailabilityMode {
  /** Disabled */
  Disabled = "Disabled",
  /** ZoneRedundant */
  ZoneRedundant = "ZoneRedundant",
  /** SameZone */
  SameZone = "SameZone",
}

/**
 * High availability mode for a server. \
 * {@link KnownHighAvailabilityMode} can be used interchangeably with HighAvailabilityMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **ZoneRedundant** \
 * **SameZone**
 */
export type HighAvailabilityMode = string;

/** The state of server high availability. */
export enum KnownHighAvailabilityState {
  /** NotEnabled */
  NotEnabled = "NotEnabled",
  /** CreatingStandby */
  CreatingStandby = "CreatingStandby",
  /** Healthy */
  Healthy = "Healthy",
  /** FailingOver */
  FailingOver = "FailingOver",
  /** RemovingStandby */
  RemovingStandby = "RemovingStandby",
}

/**
 * The state of server high availability. \
 * {@link KnownHighAvailabilityState} can be used interchangeably with HighAvailabilityState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotEnabled** \
 * **CreatingStandby** \
 * **Healthy** \
 * **FailingOver** \
 * **RemovingStandby**
 */
export type HighAvailabilityState = string;

/** Network related properties of a server */
export interface Network {
  /** Whether or not public network access is allowed for this server. Value is 'Disabled' when server has VNet integration. */
  publicNetworkAccess?: EnableStatusEnum;
  /** Delegated subnet resource id used to setup vnet for a server. */
  delegatedSubnetResourceId?: string;
  /** Private DNS zone resource id. */
  privateDnsZoneResourceId?: string;
}

export function networkSerializer(item: Network): any {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    delegatedSubnetResourceId: item["delegatedSubnetResourceId"],
    privateDnsZoneResourceId: item["privateDnsZoneResourceId"],
  };
}

export function networkDeserializer(item: any): Network {
  return {
    publicNetworkAccess: item["publicNetworkAccess"],
    delegatedSubnetResourceId: item["delegatedSubnetResourceId"],
    privateDnsZoneResourceId: item["privateDnsZoneResourceId"],
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

/** A private endpoint connection resource */
export interface PrivateEndpointConnection extends Resource {
  /** Resource properties. */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
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

/** Maintenance policy of a server. */
export interface MaintenancePolicy {
  /** The patch strategy of this server */
  patchStrategy?: PatchStrategy;
}

export function maintenancePolicySerializer(item: MaintenancePolicy): any {
  return { patchStrategy: item["patchStrategy"] };
}

export function maintenancePolicyDeserializer(item: any): MaintenancePolicy {
  return {
    patchStrategy: item["patchStrategy"],
  };
}

/** Enum to indicate the patch strategy of a server */
export enum KnownPatchStrategy {
  /** Regular */
  Regular = "Regular",
  /** VirtualCanary */
  VirtualCanary = "VirtualCanary",
}

/**
 * Enum to indicate the patch strategy of a server \
 * {@link KnownPatchStrategy} can be used interchangeably with PatchStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regular** \
 * **VirtualCanary**
 */
export type PatchStrategy = string;

/** Maintenance window of a server. */
export interface MaintenanceWindow {
  /** indicates whether custom window is enabled or disabled */
  customWindow?: string;
  /** start hour for maintenance window */
  startHour?: number;
  /** start minute for maintenance window */
  startMinute?: number;
  /** day of week for maintenance window */
  dayOfWeek?: number;
  /** The batch of maintenance when enabled the custom managed maintenance window of a server. */
  batchOfMaintenance?: BatchOfMaintenance;
}

export function maintenanceWindowSerializer(item: MaintenanceWindow): any {
  return {
    customWindow: item["customWindow"],
    startHour: item["startHour"],
    startMinute: item["startMinute"],
    dayOfWeek: item["dayOfWeek"],
    batchOfMaintenance: item["batchOfMaintenance"],
  };
}

export function maintenanceWindowDeserializer(item: any): MaintenanceWindow {
  return {
    customWindow: item["customWindow"],
    startHour: item["startHour"],
    startMinute: item["startMinute"],
    dayOfWeek: item["dayOfWeek"],
    batchOfMaintenance: item["batchOfMaintenance"],
  };
}

/** The batch of maintenance when enabled the custom managed maintenance window of a server. */
export enum KnownBatchOfMaintenance {
  /** Default */
  Default = "Default",
  /** Batch1 */
  Batch1 = "Batch1",
  /** Batch2 */
  Batch2 = "Batch2",
}

/**
 * The batch of maintenance when enabled the custom managed maintenance window of a server. \
 * {@link KnownBatchOfMaintenance} can be used interchangeably with BatchOfMaintenance,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **Batch1** \
 * **Batch2**
 */
export type BatchOfMaintenance = string;

/** Import source related properties. */
export interface ImportSourceProperties {
  /** Storage type of import source. */
  storageType?: ImportSourceStorageType;
  /** Uri of the import source storage. */
  storageUrl?: string;
  /** Sas token for accessing source storage. Read and list permissions are required for sas token. */
  sasToken?: string;
  /** Relative path of data directory in storage. */
  dataDirPath?: string;
}

export function importSourcePropertiesSerializer(item: ImportSourceProperties): any {
  return {
    storageType: item["storageType"],
    storageUrl: item["storageUrl"],
    sasToken: item["sasToken"],
    dataDirPath: item["dataDirPath"],
  };
}

export function importSourcePropertiesDeserializer(item: any): ImportSourceProperties {
  return {
    storageType: item["storageType"],
    storageUrl: item["storageUrl"],
    sasToken: item["sasToken"],
    dataDirPath: item["dataDirPath"],
  };
}

/** Storage type of import source. */
export enum KnownImportSourceStorageType {
  /** AzureBlob */
  AzureBlob = "AzureBlob",
}

/**
 * Storage type of import source. \
 * {@link KnownImportSourceStorageType} can be used interchangeably with ImportSourceStorageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureBlob**
 */
export type ImportSourceStorageType = string;

/** Properties to configure Identity for Bring your Own Keys */
export interface MySQLServerIdentity {
  /** ObjectId from the KeyVault */
  readonly principalId?: string;
  /** TenantId from the KeyVault */
  readonly tenantId?: string;
  /** Type of managed service identity. */
  type?: ManagedServiceIdentityType;
  /** Metadata of user assigned identity. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function mySQLServerIdentitySerializer(item: MySQLServerIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function mySQLServerIdentityDeserializer(item: any): MySQLServerIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Type of managed service identity. */
export enum KnownManagedServiceIdentityType {
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * Type of managed service identity. \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UserAssigned**
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

/** Metadata of user assigned identity. */
export interface UserAssignedIdentity {
  /** Principal Id of user assigned identity */
  readonly principalId?: string;
  /** Client Id of user assigned identity */
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

/** Billing information related properties of a server. */
export interface MySQLServerSku {
  /** The name of the sku, e.g. Standard_D32s_v3. */
  name: string;
  /** The tier of the particular SKU, e.g. GeneralPurpose. */
  tier: ServerSkuTier;
}

export function mySQLServerSkuSerializer(item: MySQLServerSku): any {
  return { name: item["name"], tier: item["tier"] };
}

export function mySQLServerSkuDeserializer(item: any): MySQLServerSku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** The tier of the particular SKU, e.g. GeneralPurpose. */
export enum KnownServerSkuTier {
  /** Burstable */
  Burstable = "Burstable",
  /** GeneralPurpose */
  GeneralPurpose = "GeneralPurpose",
  /** MemoryOptimized */
  MemoryOptimized = "MemoryOptimized",
}

/**
 * The tier of the particular SKU, e.g. GeneralPurpose. \
 * {@link KnownServerSkuTier} can be used interchangeably with ServerSkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Burstable** \
 * **GeneralPurpose** \
 * **MemoryOptimized**
 */
export type ServerSkuTier = string;

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

/** Parameters allowed to update for a server. */
export interface ServerForUpdate {
  /** The cmk identity for the server. */
  identity?: MySQLServerIdentity;
  /** The SKU (pricing tier) of the server. */
  sku?: MySQLServerSku;
  /** The properties that can be updated for a server. */
  properties?: ServerPropertiesForUpdate;
  /** Application-specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
}

export function serverForUpdateSerializer(item: ServerForUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : mySQLServerIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : mySQLServerSkuSerializer(item["sku"]),
    properties: !item["properties"]
      ? item["properties"]
      : serverPropertiesForUpdateSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** The properties that can be updated for a server. */
export interface ServerPropertiesForUpdate {
  /** The password of the administrator login. */
  administratorLoginPassword?: string;
  /** Server version. */
  version?: ServerVersion;
  /** Storage related properties of a server. */
  storage?: Storage;
  /** Backup related properties of a server. */
  backup?: Backup;
  /** High availability related properties of a server. */
  highAvailability?: HighAvailability;
  /** Maintenance policy of a server. */
  maintenancePolicy?: MaintenancePolicy;
  /** Maintenance window of a server. */
  maintenanceWindow?: MaintenanceWindow;
  /** The replication role of the server. */
  replicationRole?: ReplicationRole;
  /** The Data Encryption for CMK. */
  dataEncryption?: DataEncryption;
  /** Network related properties of a server */
  network?: Network;
}

export function serverPropertiesForUpdateSerializer(item: ServerPropertiesForUpdate): any {
  return {
    administratorLoginPassword: item["administratorLoginPassword"],
    version: item["version"],
    storage: !item["storage"] ? item["storage"] : storageSerializer(item["storage"]),
    backup: !item["backup"] ? item["backup"] : backupSerializer(item["backup"]),
    highAvailability: !item["highAvailability"]
      ? item["highAvailability"]
      : highAvailabilitySerializer(item["highAvailability"]),
    maintenancePolicy: !item["maintenancePolicy"]
      ? item["maintenancePolicy"]
      : maintenancePolicySerializer(item["maintenancePolicy"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowSerializer(item["maintenanceWindow"]),
    replicationRole: item["replicationRole"],
    dataEncryption: !item["dataEncryption"]
      ? item["dataEncryption"]
      : dataEncryptionSerializer(item["dataEncryption"]),
    network: !item["network"] ? item["network"] : networkSerializer(item["network"]),
  };
}

/** The response of a Server list operation. */
export interface _ServerListResult {
  /** The Server items on this page */
  value?: Server[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverListResultDeserializer(item: any): _ServerListResult {
  return {
    value: !item["value"] ? item["value"] : serverArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverArraySerializer(result: Array<Server>): any[] {
  return result.map((item) => {
    return serverSerializer(item);
  });
}

export function serverArrayDeserializer(result: Array<Server>): any[] {
  return result.map((item) => {
    return serverDeserializer(item);
  });
}

/** High availability validation properties of a server */
export interface HighAvailabilityValidationEstimation {
  /** Estimated seconds of downtime for the deployment. */
  readonly estimatedDowntime?: number;
  /** Scheduled Availability zone of the standby server. */
  readonly scheduledStandbyAvailabilityZone?: string;
  /** Expected Availability zone of the standby server. */
  expectedStandbyAvailabilityZone?: string;
}

export function highAvailabilityValidationEstimationSerializer(
  item: HighAvailabilityValidationEstimation,
): any {
  return {
    expectedStandbyAvailabilityZone: item["expectedStandbyAvailabilityZone"],
  };
}

export function highAvailabilityValidationEstimationDeserializer(
  item: any,
): HighAvailabilityValidationEstimation {
  return {
    estimatedDowntime: item["estimatedDowntime"],
    scheduledStandbyAvailabilityZone: item["scheduledStandbyAvailabilityZone"],
    expectedStandbyAvailabilityZone: item["expectedStandbyAvailabilityZone"],
  };
}

/** Server restart parameters. */
export interface ServerRestartParameter {
  /** Whether or not failover to standby server when restarting a server with high availability enabled. */
  restartWithFailover?: EnableStatusEnum;
  /** The maximum allowed failover time in seconds. */
  maxFailoverSeconds?: number;
}

export function serverRestartParameterSerializer(item: ServerRestartParameter): any {
  return {
    restartWithFailover: item["restartWithFailover"],
    maxFailoverSeconds: item["maxFailoverSeconds"],
  };
}

/** Server Gtid set parameters: Replication with Global Transaction Identifiers. */
export interface ServerGtidSetParameter {
  /** The Gtid set of server. */
  gtidSet?: string;
}

export function serverGtidSetParameterSerializer(item: ServerGtidSetParameter): any {
  return { gtidSet: item["gtidSet"] };
}

/** Parameters to detach Vnet. */
export interface ServerDetachVNetParameter {
  /** Whether or not public network access is allowed for this server. Value is 'Disabled' when server has VNet integration. */
  publicNetworkAccess?: EnableStatusEnum;
}

export function serverDetachVNetParameterSerializer(item: ServerDetachVNetParameter): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

/** BackupAndExport API Request */
export interface BackupAndExportRequest extends BackupRequestBase {
  /** Backup Target Store Details */
  targetDetails: BackupStoreDetailsUnion;
}

export function backupAndExportRequestSerializer(item: BackupAndExportRequest): any {
  return {
    backupSettings: backupSettingsSerializer(item["backupSettings"]),
    targetDetails: backupStoreDetailsUnionSerializer(item["targetDetails"]),
  };
}

/** Details about the target where the backup content will be stored. */
export interface BackupStoreDetails {
  /** Type of the specific object - used for deserializing */
  /** The discriminator possible values: FullBackupStoreDetails */
  objectType: string;
}

export function backupStoreDetailsSerializer(item: BackupStoreDetails): any {
  return { objectType: item["objectType"] };
}

/** Alias for BackupStoreDetailsUnion */
export type BackupStoreDetailsUnion = FullBackupStoreDetails | BackupStoreDetails;

export function backupStoreDetailsUnionSerializer(item: BackupStoreDetailsUnion): any {
  switch (item.objectType) {
    case "FullBackupStoreDetails":
      return fullBackupStoreDetailsSerializer(item as FullBackupStoreDetails);

    default:
      return backupStoreDetailsSerializer(item);
  }
}

/** FullBackupStoreDetails is used for scenarios where backup data is streamed/copied over to a storage destination. */
export interface FullBackupStoreDetails extends BackupStoreDetails {
  /** SASUriList of storage containers where backup data is to be streamed/copied. */
  sasUriList: string[];
  /** Type of the specific object - used for deserializing */
  objectType: "FullBackupStoreDetails";
}

export function fullBackupStoreDetailsSerializer(item: FullBackupStoreDetails): any {
  return {
    objectType: item["objectType"],
    sasUriList: item["sasUriList"].map((p: any) => {
      return p;
    }),
  };
}

/** BackupRequestBase is the base for all backup request. */
export interface BackupRequestBase {
  /** Backup Settings */
  backupSettings: BackupSettings;
}

export function backupRequestBaseSerializer(item: BackupRequestBase): any {
  return { backupSettings: backupSettingsSerializer(item["backupSettings"]) };
}

/** Backup Settings */
export interface BackupSettings {
  /** The name of the backup. */
  backupName: string;
  /** Backup Format for the current backup. (CollatedFormat is INTERNAL – DO NOT USE) */
  backupFormat?: BackupFormat;
}

export function backupSettingsSerializer(item: BackupSettings): any {
  return { backupName: item["backupName"], backupFormat: item["backupFormat"] };
}

/** Backup Format for the current backup. (CollatedFormat is INTERNAL – DO NOT USE) */
export enum KnownBackupFormat {
  /** CollatedFormat */
  CollatedFormat = "CollatedFormat",
  /** Raw */
  Raw = "Raw",
}

/**
 * Backup Format for the current backup. (CollatedFormat is INTERNAL – DO NOT USE) \
 * {@link KnownBackupFormat} can be used interchangeably with BackupFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CollatedFormat** \
 * **Raw**
 */
export type BackupFormat = string;

/** Represents BackupAndExportAPI Response */
export interface BackupAndExportResponse extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: BackupAndExportResponseProperties;
  /** The error object. */
  error?: ErrorDetail;
  /** The name of the backup and export response. */
  readonly name: string;
  /** The operation status */
  status?: OperationStatus;
  /** Start time */
  startTime?: Date;
  /** End time */
  endTime?: Date;
  /** Operation progress (0-100). */
  percentComplete?: number;
}

export function backupAndExportResponseDeserializer(item: any): BackupAndExportResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : backupAndExportResponsePropertiesDeserializer(item["properties"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    percentComplete: item["percentComplete"],
  };
}

/** BackupAndExport Response Properties */
export interface BackupAndExportResponseProperties {
  /** Size of datasource in bytes */
  datasourceSizeInBytes?: number;
  /** Data transferred in bytes */
  dataTransferredInBytes?: number;
  /** Metadata related to backup to be stored for restoring resource in key-value pairs. */
  backupMetadata?: string;
}

export function backupAndExportResponsePropertiesDeserializer(
  item: any,
): BackupAndExportResponseProperties {
  return {
    datasourceSizeInBytes: item["datasourceSizeInBytes"],
    dataTransferredInBytes: item["dataTransferredInBytes"],
    backupMetadata: item["backupMetadata"],
  };
}

/** The operation status */
export type OperationStatus =
  | "Pending"
  | "InProgress"
  | "Succeeded"
  | "Failed"
  | "CancelInProgress"
  | "Canceled";

/** Represents ValidateBackup API Response */
export interface ValidateBackupResponse {
  /** The response properties of a pre backup operation. */
  properties?: ValidateBackupResponseProperties;
}

export function validateBackupResponseDeserializer(item: any): ValidateBackupResponse {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : validateBackupResponsePropertiesDeserializer(item["properties"]),
  };
}

/** ValidateBackup Response Properties */
export interface ValidateBackupResponseProperties {
  /** Estimated no of storage containers required for resource data to be backed up. */
  numberOfContainers?: number;
}

export function validateBackupResponsePropertiesDeserializer(
  item: any,
): ValidateBackupResponseProperties {
  return {
    numberOfContainers: item["numberOfContainers"],
  };
}

/** The response of a LogFile list operation. */
export interface _LogFileListResult {
  /** The LogFile items on this page */
  value?: LogFile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _logFileListResultDeserializer(item: any): _LogFileListResult {
  return {
    value: !item["value"] ? item["value"] : logFileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function logFileArrayDeserializer(result: Array<LogFile>): any[] {
  return result.map((item) => {
    return logFileDeserializer(item);
  });
}

/** Represents a logFile. */
export interface LogFile extends ProxyResource {
  /** The properties of a logFile. */
  properties?: LogFileProperties;
}

export function logFileDeserializer(item: any): LogFile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : logFilePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a logFile. */
export interface LogFileProperties {
  /** The size in kb of the logFile. */
  sizeInKB?: number;
  /** Creation timestamp of the log file. */
  createdTime?: Date;
  /** Type of the log file. */
  type?: string;
  /** Last modified timestamp of the log file. */
  lastModifiedTime?: Date;
  /** The url to download the log file from. */
  url?: string;
}

export function logFilePropertiesDeserializer(item: any): LogFileProperties {
  return {
    sizeInKB: item["sizeInKB"],
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    type: item["type"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    url: item["url"],
  };
}

/** Server backup properties */
export interface ServerBackup extends ProxyResource {
  /** The properties of a server backup. */
  properties?: ServerBackupProperties;
}

export function serverBackupDeserializer(item: any): ServerBackup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : serverBackupPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a server backup. */
export interface ServerBackupProperties {
  /** Backup type. */
  backupType?: string;
  /** Backup completed time (ISO8601 format). */
  completedTime?: Date;
  /** Backup source */
  source?: string;
}

export function serverBackupPropertiesDeserializer(item: any): ServerBackupProperties {
  return {
    backupType: item["backupType"],
    completedTime: !item["completedTime"] ? item["completedTime"] : new Date(item["completedTime"]),
    source: item["source"],
  };
}

/** The response of a ServerBackup list operation. */
export interface _ServerBackupListResult {
  /** The ServerBackup items on this page */
  value?: ServerBackup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverBackupListResultDeserializer(item: any): _ServerBackupListResult {
  return {
    value: !item["value"] ? item["value"] : serverBackupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverBackupArrayDeserializer(result: Array<ServerBackup>): any[] {
  return result.map((item) => {
    return serverBackupDeserializer(item);
  });
}

/** Server backup properties */
export interface ServerBackupV2 extends ProxyResource {
  /** The properties of a server backup. */
  properties?: ServerBackupPropertiesV2;
}

export function serverBackupV2Serializer(item: ServerBackupV2): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : serverBackupPropertiesV2Serializer(item["properties"]),
  };
}

export function serverBackupV2Deserializer(item: any): ServerBackupV2 {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : serverBackupPropertiesV2Deserializer(item["properties"]),
  };
}

/** The properties of a server backup. */
export interface ServerBackupPropertiesV2 {
  /** Backup name */
  backupNameV2?: string;
  backupType?: BackupType;
  /** Backup completed time (ISO8601 format). */
  completedTime?: Date;
  /** Backup source */
  source?: string;
  /** The provisioning state of backup resource. */
  readonly provisioningState?: ProvisioningState;
}

export function serverBackupPropertiesV2Serializer(item: ServerBackupPropertiesV2): any {
  return {
    backupNameV2: item["backupNameV2"],
    backupType: item["backupType"],
    completedTime: !item["completedTime"]
      ? item["completedTime"]
      : item["completedTime"].toISOString(),
    source: item["source"],
  };
}

export function serverBackupPropertiesV2Deserializer(item: any): ServerBackupPropertiesV2 {
  return {
    backupNameV2: item["backupNameV2"],
    backupType: item["backupType"],
    completedTime: !item["completedTime"] ? item["completedTime"] : new Date(item["completedTime"]),
    source: item["source"],
    provisioningState: item["provisioningState"],
  };
}

/** Known values of {@link BackupType} that the service accepts. */
export enum KnownBackupType {
  /** FULL */
  Full = "FULL",
}

/** Type of BackupType */
export type BackupType = string;

/** The current provisioning state. */
export enum KnownProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The current provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Creating** \
 * **Deleting** \
 * **Failed** \
 * **Canceled**
 */
export type ProvisioningState = string;

/** The response of a ServerBackupV2 list operation. */
export interface _ServerBackupV2ListResult {
  /** The ServerBackupV2 items on this page */
  value?: ServerBackupV2[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serverBackupV2ListResultDeserializer(item: any): _ServerBackupV2ListResult {
  return {
    value: !item["value"] ? item["value"] : serverBackupV2ArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverBackupV2ArraySerializer(result: Array<ServerBackupV2>): any[] {
  return result.map((item) => {
    return serverBackupV2Serializer(item);
  });
}

export function serverBackupV2ArrayDeserializer(result: Array<ServerBackupV2>): any[] {
  return result.map((item) => {
    return serverBackupV2Deserializer(item);
  });
}

/** Represents a Configuration. */
export interface Configuration extends ProxyResource {
  /** The properties of a configuration. */
  properties?: ConfigurationProperties;
}

export function configurationSerializer(item: Configuration): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : configurationPropertiesSerializer(item["properties"]),
  };
}

export function configurationDeserializer(item: any): Configuration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : configurationPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a configuration. */
export interface ConfigurationProperties {
  /** Value of the configuration. */
  value?: string;
  /** Current value of the configuration. */
  currentValue?: string;
  /** Description of the configuration. */
  readonly description?: string;
  /** The link used to get the document from community or Azure site. */
  readonly documentationLink?: string;
  /** Default value of the configuration. */
  readonly defaultValue?: string;
  /** Data type of the configuration. */
  readonly dataType?: string;
  /** Allowed values of the configuration. */
  readonly allowedValues?: string;
  /** Source of the configuration. */
  source?: ConfigurationSource;
  /** If is the configuration read only. */
  readonly isReadOnly?: IsReadOnly;
  /** If is the configuration pending restart or not. */
  readonly isConfigPendingRestart?: IsConfigPendingRestart;
  /** If is the configuration dynamic. */
  readonly isDynamicConfig?: IsDynamicConfig;
}

export function configurationPropertiesSerializer(item: ConfigurationProperties): any {
  return {
    value: item["value"],
    currentValue: item["currentValue"],
    source: item["source"],
  };
}

export function configurationPropertiesDeserializer(item: any): ConfigurationProperties {
  return {
    value: item["value"],
    currentValue: item["currentValue"],
    description: item["description"],
    documentationLink: item["documentationLink"],
    defaultValue: item["defaultValue"],
    dataType: item["dataType"],
    allowedValues: item["allowedValues"],
    source: item["source"],
    isReadOnly: item["isReadOnly"],
    isConfigPendingRestart: item["isConfigPendingRestart"],
    isDynamicConfig: item["isDynamicConfig"],
  };
}

/** Source of the configuration. */
export enum KnownConfigurationSource {
  /** system-default */
  SystemDefault = "system-default",
  /** user-override */
  UserOverride = "user-override",
}

/**
 * Source of the configuration. \
 * {@link KnownConfigurationSource} can be used interchangeably with ConfigurationSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **system-default** \
 * **user-override**
 */
export type ConfigurationSource = string;

/** If is the configuration read only. */
export enum KnownIsReadOnly {
  /** True */
  True = "True",
  /** False */
  False = "False",
}

/**
 * If is the configuration read only. \
 * {@link KnownIsReadOnly} can be used interchangeably with IsReadOnly,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True** \
 * **False**
 */
export type IsReadOnly = string;

/** If is the configuration pending restart or not. */
export enum KnownIsConfigPendingRestart {
  /** True */
  True = "True",
  /** False */
  False = "False",
}

/**
 * If is the configuration pending restart or not. \
 * {@link KnownIsConfigPendingRestart} can be used interchangeably with IsConfigPendingRestart,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True** \
 * **False**
 */
export type IsConfigPendingRestart = string;

/** If is the configuration dynamic. */
export enum KnownIsDynamicConfig {
  /** True */
  True = "True",
  /** False */
  False = "False",
}

/**
 * If is the configuration dynamic. \
 * {@link KnownIsDynamicConfig} can be used interchangeably with IsDynamicConfig,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True** \
 * **False**
 */
export type IsDynamicConfig = string;

/** The response of a Configuration list operation. */
export interface _ConfigurationListResult {
  /** The Configuration items on this page */
  value?: Configuration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _configurationListResultDeserializer(item: any): _ConfigurationListResult {
  return {
    value: !item["value"] ? item["value"] : configurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function configurationArraySerializer(result: Array<Configuration>): any[] {
  return result.map((item) => {
    return configurationSerializer(item);
  });
}

export function configurationArrayDeserializer(result: Array<Configuration>): any[] {
  return result.map((item) => {
    return configurationDeserializer(item);
  });
}

/** A list of server configurations to update. */
export interface ConfigurationListForBatchUpdate {
  /** The list of server configurations. */
  value?: ConfigurationForBatchUpdate[];
  /** Whether to reset all server parameters to default. */
  resetAllToDefault?: ResetAllToDefault;
}

export function configurationListForBatchUpdateSerializer(
  item: ConfigurationListForBatchUpdate,
): any {
  return {
    value: !item["value"]
      ? item["value"]
      : configurationForBatchUpdateArraySerializer(item["value"]),
    resetAllToDefault: item["resetAllToDefault"],
  };
}

export function configurationForBatchUpdateArraySerializer(
  result: Array<ConfigurationForBatchUpdate>,
): any[] {
  return result.map((item) => {
    return configurationForBatchUpdateSerializer(item);
  });
}

/** Represents a Configuration. */
export interface ConfigurationForBatchUpdate {
  /** Name of the configuration. */
  name?: string;
  /** The properties can be updated for a configuration. */
  properties?: ConfigurationForBatchUpdateProperties;
}

export function configurationForBatchUpdateSerializer(item: ConfigurationForBatchUpdate): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : configurationForBatchUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The properties can be updated for a configuration. */
export interface ConfigurationForBatchUpdateProperties {
  /** Value of the configuration. */
  value?: string;
  /** Source of the configuration. */
  source?: string;
}

export function configurationForBatchUpdatePropertiesSerializer(
  item: ConfigurationForBatchUpdateProperties,
): any {
  return { value: item["value"], source: item["source"] };
}

/** Whether to reset all server parameters to default. */
export enum KnownResetAllToDefault {
  /** True */
  True = "True",
  /** False */
  False = "False",
}

/**
 * Whether to reset all server parameters to default. \
 * {@link KnownResetAllToDefault} can be used interchangeably with ResetAllToDefault,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True** \
 * **False**
 */
export type ResetAllToDefault = string;

/** Represents a Database. */
export interface Database extends ProxyResource {
  /** The properties of a database. */
  properties?: DatabaseProperties;
}

export function databaseSerializer(item: Database): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : databasePropertiesSerializer(item["properties"]),
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
    properties: !item["properties"]
      ? item["properties"]
      : databasePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a database. */
export interface DatabaseProperties {
  /** The charset of the database. */
  charset?: string;
  /** The collation of the database. */
  collation?: string;
}

export function databasePropertiesSerializer(item: DatabaseProperties): any {
  return { charset: item["charset"], collation: item["collation"] };
}

export function databasePropertiesDeserializer(item: any): DatabaseProperties {
  return {
    charset: item["charset"],
    collation: item["collation"],
  };
}

/** The response of a Database list operation. */
export interface _DatabaseListResult {
  /** The Database items on this page */
  value?: Database[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseListResultDeserializer(item: any): _DatabaseListResult {
  return {
    value: !item["value"] ? item["value"] : databaseArrayDeserializer(item["value"]),
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

/** Represents a server firewall rule. */
export interface FirewallRule extends ProxyResource {
  /** The properties of a firewall rule. */
  properties: FirewallRuleProperties;
}

export function firewallRuleSerializer(item: FirewallRule): any {
  return { properties: firewallRulePropertiesSerializer(item["properties"]) };
}

export function firewallRuleDeserializer(item: any): FirewallRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: firewallRulePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a server firewall rule. */
export interface FirewallRuleProperties {
  /** The start IP address of the server firewall rule. Must be IPv4 format. */
  startIpAddress: string;
  /** The end IP address of the server firewall rule. Must be IPv4 format. */
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
    startIpAddress: item["startIpAddress"],
    endIpAddress: item["endIpAddress"],
  };
}

/** The response of a FirewallRule list operation. */
export interface _FirewallRuleListResult {
  /** The FirewallRule items on this page */
  value?: FirewallRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _firewallRuleListResultDeserializer(item: any): _FirewallRuleListResult {
  return {
    value: !item["value"] ? item["value"] : firewallRuleArrayDeserializer(item["value"]),
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

/** A server's Advanced Threat Protection. */
export interface AdvancedThreatProtection extends ProxyResource {
  /** Resource properties. */
  properties?: AdvancedThreatProtectionProperties;
}

export function advancedThreatProtectionSerializer(item: AdvancedThreatProtection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : advancedThreatProtectionPropertiesSerializer(item["properties"]),
  };
}

export function advancedThreatProtectionDeserializer(item: any): AdvancedThreatProtection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : advancedThreatProtectionPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of an Advanced Threat Protection setting. */
export interface AdvancedThreatProtectionProperties {
  /** Specifies the UTC creation time of the policy. */
  readonly creationTime?: Date;
  /** Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled or a state has not been applied yet on the specific database or server. */
  state?: AdvancedThreatProtectionState;
  /** Provisioning state of the Threat Protection. */
  readonly provisioningState?: AdvancedThreatProtectionProvisioningState;
}

export function advancedThreatProtectionPropertiesSerializer(
  item: AdvancedThreatProtectionProperties,
): any {
  return { state: item["state"] };
}

export function advancedThreatProtectionPropertiesDeserializer(
  item: any,
): AdvancedThreatProtectionProperties {
  return {
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    state: item["state"],
    provisioningState: item["provisioningState"],
  };
}

/** Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled on the server. */
export enum KnownAdvancedThreatProtectionState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled on the server. \
 * {@link KnownAdvancedThreatProtectionState} can be used interchangeably with AdvancedThreatProtectionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type AdvancedThreatProtectionState = string;

/** The current provisioning state. */
export enum KnownAdvancedThreatProtectionProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Updating */
  Updating = "Updating",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownAdvancedThreatProtectionProvisioningState} can be used interchangeably with AdvancedThreatProtectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Updating** \
 * **Canceled** \
 * **Failed**
 */
export type AdvancedThreatProtectionProvisioningState = string;

/** Known values of {@link AdvancedThreatProtectionName} that the service accepts. */
export enum KnownAdvancedThreatProtectionName {
  /** Default */
  Default = "Default",
}

/** Type of AdvancedThreatProtectionName */
export type AdvancedThreatProtectionName = string;

/** Parameters allowed to update advanced threat protection for a server. */
export interface AdvancedThreatProtectionForUpdate {
  /** Resource update properties. */
  properties?: AdvancedThreatProtectionUpdateProperties;
}

export function advancedThreatProtectionForUpdateSerializer(
  item: AdvancedThreatProtectionForUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : advancedThreatProtectionUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Properties of Advanced Threat Protection that can be updated. */
export interface AdvancedThreatProtectionUpdateProperties {
  /** Specifies the state of the Advanced Threat Protection, whether it is enabled or disabled or a state has not been applied yet on the specific database or server. */
  state: AdvancedThreatProtectionState;
}

export function advancedThreatProtectionUpdatePropertiesSerializer(
  item: AdvancedThreatProtectionUpdateProperties,
): any {
  return { state: item["state"] };
}

/** The response of a AdvancedThreatProtection list operation. */
export interface _AdvancedThreatProtectionListResult {
  /** The AdvancedThreatProtection items on this page */
  readonly value?: AdvancedThreatProtection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _advancedThreatProtectionListResultDeserializer(
  item: any,
): _AdvancedThreatProtectionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : advancedThreatProtectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function advancedThreatProtectionArraySerializer(
  result: Array<AdvancedThreatProtection>,
): any[] {
  return result.map((item) => {
    return advancedThreatProtectionSerializer(item);
  });
}

export function advancedThreatProtectionArrayDeserializer(
  result: Array<AdvancedThreatProtection>,
): any[] {
  return result.map((item) => {
    return advancedThreatProtectionDeserializer(item);
  });
}

/** Represents a location capability set. */
export interface Capability extends ProxyResource {
  /** The properties of a location capability set. */
  properties?: CapabilityPropertiesV2;
}

export function capabilityDeserializer(item: any): Capability {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : capabilityPropertiesV2Deserializer(item["properties"]),
  };
}

/** Location capability. */
export interface CapabilityPropertiesV2 {
  /** supported geo backup regions */
  readonly supportedGeoBackupRegions?: string[];
  /** A list of supported flexible server editions. */
  readonly supportedFlexibleServerEditions?: ServerEditionCapabilityV2[];
  /** A list of supported server versions. */
  readonly supportedServerVersions?: ServerVersionCapabilityV2[];
  /** A list of supported features. */
  readonly supportedFeatures?: FeatureProperty[];
}

export function capabilityPropertiesV2Deserializer(item: any): CapabilityPropertiesV2 {
  return {
    supportedGeoBackupRegions: !item["supportedGeoBackupRegions"]
      ? item["supportedGeoBackupRegions"]
      : item["supportedGeoBackupRegions"].map((p: any) => {
          return p;
        }),
    supportedFlexibleServerEditions: !item["supportedFlexibleServerEditions"]
      ? item["supportedFlexibleServerEditions"]
      : serverEditionCapabilityV2ArrayDeserializer(item["supportedFlexibleServerEditions"]),
    supportedServerVersions: !item["supportedServerVersions"]
      ? item["supportedServerVersions"]
      : serverVersionCapabilityV2ArrayDeserializer(item["supportedServerVersions"]),
    supportedFeatures: !item["supportedFeatures"]
      ? item["supportedFeatures"]
      : featurePropertyArrayDeserializer(item["supportedFeatures"]),
  };
}

export function serverEditionCapabilityV2ArrayDeserializer(
  result: Array<ServerEditionCapabilityV2>,
): any[] {
  return result.map((item) => {
    return serverEditionCapabilityV2Deserializer(item);
  });
}

/** Server edition capabilities. */
export interface ServerEditionCapabilityV2 {
  /** Server edition name */
  readonly name?: string;
  /** Default Sku name */
  readonly defaultSku?: string;
  /** Default storage size */
  readonly defaultStorageSize?: number;
  /** A list of supported storage editions */
  readonly supportedStorageEditions?: StorageEditionCapability[];
  /** A list of supported Skus */
  readonly supportedSkus?: SkuCapabilityV2[];
}

export function serverEditionCapabilityV2Deserializer(item: any): ServerEditionCapabilityV2 {
  return {
    name: item["name"],
    defaultSku: item["defaultSku"],
    defaultStorageSize: item["defaultStorageSize"],
    supportedStorageEditions: !item["supportedStorageEditions"]
      ? item["supportedStorageEditions"]
      : storageEditionCapabilityArrayDeserializer(item["supportedStorageEditions"]),
    supportedSkus: !item["supportedSkus"]
      ? item["supportedSkus"]
      : skuCapabilityV2ArrayDeserializer(item["supportedSkus"]),
  };
}

export function storageEditionCapabilityArrayDeserializer(
  result: Array<StorageEditionCapability>,
): any[] {
  return result.map((item) => {
    return storageEditionCapabilityDeserializer(item);
  });
}

/** storage edition capability */
export interface StorageEditionCapability {
  /** storage edition name */
  readonly name?: string;
  /** The minimal supported storage size. */
  readonly minStorageSize?: number;
  /** The maximum supported storage size. */
  readonly maxStorageSize?: number;
  /** Minimal backup retention days */
  readonly minBackupRetentionDays?: number;
  /** Maximum backup retention days */
  readonly maxBackupRetentionDays?: number;
  /** Minimal backup interval hours */
  readonly minBackupIntervalHours?: number;
  /** Maximum backup interval hours */
  readonly maxBackupIntervalHours?: number;
}

export function storageEditionCapabilityDeserializer(item: any): StorageEditionCapability {
  return {
    name: item["name"],
    minStorageSize: item["minStorageSize"],
    maxStorageSize: item["maxStorageSize"],
    minBackupRetentionDays: item["minBackupRetentionDays"],
    maxBackupRetentionDays: item["maxBackupRetentionDays"],
    minBackupIntervalHours: item["minBackupIntervalHours"],
    maxBackupIntervalHours: item["maxBackupIntervalHours"],
  };
}

export function skuCapabilityV2ArrayDeserializer(result: Array<SkuCapabilityV2>): any[] {
  return result.map((item) => {
    return skuCapabilityV2Deserializer(item);
  });
}

/** Sku capability */
export interface SkuCapabilityV2 {
  /** vCore name */
  readonly name?: string;
  /** supported vCores */
  readonly vCores?: number;
  /** supported IOPS */
  readonly supportedIops?: number;
  /** supported memory per vCore in MB */
  readonly supportedMemoryPerVCoreMB?: number;
  /** Supported zones */
  readonly supportedZones?: string[];
  /** Supported high availability mode */
  readonly supportedHAMode?: string[];
}

export function skuCapabilityV2Deserializer(item: any): SkuCapabilityV2 {
  return {
    name: item["name"],
    vCores: item["vCores"],
    supportedIops: item["supportedIops"],
    supportedMemoryPerVCoreMB: item["supportedMemoryPerVCoreMB"],
    supportedZones: !item["supportedZones"]
      ? item["supportedZones"]
      : item["supportedZones"].map((p: any) => {
          return p;
        }),
    supportedHAMode: !item["supportedHAMode"]
      ? item["supportedHAMode"]
      : item["supportedHAMode"].map((p: any) => {
          return p;
        }),
  };
}

export function serverVersionCapabilityV2ArrayDeserializer(
  result: Array<ServerVersionCapabilityV2>,
): any[] {
  return result.map((item) => {
    return serverVersionCapabilityV2Deserializer(item);
  });
}

/** Server version capabilities. */
export interface ServerVersionCapabilityV2 {
  /** server version */
  readonly name?: string;
}

export function serverVersionCapabilityV2Deserializer(item: any): ServerVersionCapabilityV2 {
  return {
    name: item["name"],
  };
}

export function featurePropertyArrayDeserializer(result: Array<FeatureProperty>): any[] {
  return result.map((item) => {
    return featurePropertyDeserializer(item);
  });
}

/** Server version capabilities. */
export interface FeatureProperty {
  /** feature name */
  readonly featureName?: string;
  /** feature value */
  readonly featureValue?: string;
}

export function featurePropertyDeserializer(item: any): FeatureProperty {
  return {
    featureName: item["featureName"],
    featureValue: item["featureValue"],
  };
}

/** location capability set */
export interface _CapabilitySetsList {
  /** The CapabilitySetsList items on this page */
  readonly value?: Capability[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _capabilitySetsListDeserializer(item: any): _CapabilitySetsList {
  return {
    value: !item["value"] ? item["value"] : capabilityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function capabilityArrayDeserializer(result: Array<Capability>): any[] {
  return result.map((item) => {
    return capabilityDeserializer(item);
  });
}

/** Represents a maintenance. */
export interface Maintenance extends ProxyResource {
  /** The properties of a maintenance */
  properties: MaintenanceProperties;
}

export function maintenanceDeserializer(item: any): Maintenance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: maintenancePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a maintenance resource. */
export interface MaintenanceProperties {
  /** A string defines maintenance type. */
  readonly maintenanceType?: MaintenanceType;
  /** A string describes the maintenance status */
  readonly maintenanceState?: MaintenanceState;
  /** The start time for a maintenance. */
  maintenanceStartTime?: Date;
  /** The end time for a maintenance. */
  readonly maintenanceEndTime?: Date;
  /** The start time for a maintenance execution. */
  readonly maintenanceExecutionStartTime?: Date;
  /** The end time for a maintenance execution. */
  readonly maintenanceExecutionEndTime?: Date;
  /** The min time the maintenance can be rescheduled. */
  readonly maintenanceAvailableScheduleMinTime?: Date;
  /** The max time the maintenance can be rescheduled. */
  readonly maintenanceAvailableScheduleMaxTime?: Date;
  /** The maintenance title. */
  readonly maintenanceTitle?: string;
  /** The maintenance description. */
  readonly maintenanceDescription?: string;
  /** Provisioning state of the Maintenance. */
  readonly provisioningState?: MaintenanceProvisioningState;
}

export function maintenancePropertiesDeserializer(item: any): MaintenanceProperties {
  return {
    maintenanceType: item["maintenanceType"],
    maintenanceState: item["maintenanceState"],
    maintenanceStartTime: !item["maintenanceStartTime"]
      ? item["maintenanceStartTime"]
      : new Date(item["maintenanceStartTime"]),
    maintenanceEndTime: !item["maintenanceEndTime"]
      ? item["maintenanceEndTime"]
      : new Date(item["maintenanceEndTime"]),
    maintenanceExecutionStartTime: !item["maintenanceExecutionStartTime"]
      ? item["maintenanceExecutionStartTime"]
      : new Date(item["maintenanceExecutionStartTime"]),
    maintenanceExecutionEndTime: !item["maintenanceExecutionEndTime"]
      ? item["maintenanceExecutionEndTime"]
      : new Date(item["maintenanceExecutionEndTime"]),
    maintenanceAvailableScheduleMinTime: !item["maintenanceAvailableScheduleMinTime"]
      ? item["maintenanceAvailableScheduleMinTime"]
      : new Date(item["maintenanceAvailableScheduleMinTime"]),
    maintenanceAvailableScheduleMaxTime: !item["maintenanceAvailableScheduleMaxTime"]
      ? item["maintenanceAvailableScheduleMaxTime"]
      : new Date(item["maintenanceAvailableScheduleMaxTime"]),
    maintenanceTitle: item["maintenanceTitle"],
    maintenanceDescription: item["maintenanceDescription"],
    provisioningState: item["provisioningState"],
  };
}

/** The type of this maintenance. */
export enum KnownMaintenanceType {
  /** RoutineMaintenance */
  RoutineMaintenance = "RoutineMaintenance",
  /** MinorVersionUpgrade */
  MinorVersionUpgrade = "MinorVersionUpgrade",
  /** SecurityPatches */
  SecurityPatches = "SecurityPatches",
  /** HotFixes */
  HotFixes = "HotFixes",
}

/**
 * The type of this maintenance. \
 * {@link KnownMaintenanceType} can be used interchangeably with MaintenanceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RoutineMaintenance** \
 * **MinorVersionUpgrade** \
 * **SecurityPatches** \
 * **HotFixes**
 */
export type MaintenanceType = string;

/** The current status of this maintenance. */
export enum KnownMaintenanceState {
  /** Scheduled */
  Scheduled = "Scheduled",
  /** ReScheduled */
  ReScheduled = "ReScheduled",
  /** InPreparation */
  InPreparation = "InPreparation",
  /** Processing */
  Processing = "Processing",
  /** Completed */
  Completed = "Completed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The current status of this maintenance. \
 * {@link KnownMaintenanceState} can be used interchangeably with MaintenanceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Scheduled** \
 * **ReScheduled** \
 * **InPreparation** \
 * **Processing** \
 * **Completed** \
 * **Canceled**
 */
export type MaintenanceState = string;

/** The current provisioning state. */
export enum KnownMaintenanceProvisioningState {
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
 * {@link KnownMaintenanceProvisioningState} can be used interchangeably with MaintenanceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Creating** \
 * **Deleting** \
 * **Failed**
 */
export type MaintenanceProvisioningState = string;

/** Represents a maintenance update parameter. */
export interface MaintenanceUpdate {
  /** The properties of a maintenance update parameter */
  properties?: MaintenancePropertiesForUpdate;
}

export function maintenanceUpdateSerializer(item: MaintenanceUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : maintenancePropertiesForUpdateSerializer(item["properties"]),
  };
}

/** The properties of a maintenance update parameter. */
export interface MaintenancePropertiesForUpdate {
  /** The start time for a maintenance. */
  maintenanceStartTime?: Date;
}

export function maintenancePropertiesForUpdateSerializer(
  item: MaintenancePropertiesForUpdate,
): any {
  return {
    maintenanceStartTime: !item["maintenanceStartTime"]
      ? item["maintenanceStartTime"]
      : item["maintenanceStartTime"].toISOString(),
  };
}

/** The response of a Maintenance list operation. */
export interface _MaintenanceListResult {
  /** The Maintenance items on this page */
  value?: Maintenance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _maintenanceListResultDeserializer(item: any): _MaintenanceListResult {
  return {
    value: !item["value"] ? item["value"] : maintenanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function maintenanceArrayDeserializer(result: Array<Maintenance>): any[] {
  return result.map((item) => {
    return maintenanceDeserializer(item);
  });
}

/** The response of a PrivateEndpointConnection list operation. */
export interface PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function privateEndpointConnectionListResultDeserializer(
  item: any,
): PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
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

/**
 * A list of private link resources for versions before v6.
 *
 * This model represents the standard `PrivateLinkResourceListResult` envelope for versions v3, v4, and v5. It has been deprecated for v6 and beyond.
 *
 * Note: This is only intended for use with versions before v6. Do not use this if you are already on CommonTypes.Version.v6 or beyond.
 *
 * If you are migrating to v6 or above, use `PrivateLinkResourceListResult` directly.
 */
export interface _PrivateLinkResourceListResult {
  /** Array of private link resources */
  value?: PrivateLinkResource[];
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
  return {
    value: !item["value"] ? item["value"] : privateLinkResourceArrayDeserializer(item["value"]),
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** location capability */
export interface _CapabilitiesListResult {
  /** The CapabilityProperties items on this page */
  readonly value?: CapabilityProperties[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _capabilitiesListResultDeserializer(item: any): _CapabilitiesListResult {
  return {
    value: !item["value"] ? item["value"] : capabilityPropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function capabilityPropertiesArrayDeserializer(result: Array<CapabilityProperties>): any[] {
  return result.map((item) => {
    return capabilityPropertiesDeserializer(item);
  });
}

/** Location capabilities. */
export interface CapabilityProperties {
  /** zone name */
  readonly zone?: string;
  /** Supported high availability mode */
  readonly supportedHAMode?: string[];
  /** supported geo backup regions */
  readonly supportedGeoBackupRegions?: string[];
  /** A list of supported flexible server editions. */
  readonly supportedFlexibleServerEditions?: ServerEditionCapability[];
}

export function capabilityPropertiesDeserializer(item: any): CapabilityProperties {
  return {
    zone: item["zone"],
    supportedHAMode: !item["supportedHAMode"]
      ? item["supportedHAMode"]
      : item["supportedHAMode"].map((p: any) => {
          return p;
        }),
    supportedGeoBackupRegions: !item["supportedGeoBackupRegions"]
      ? item["supportedGeoBackupRegions"]
      : item["supportedGeoBackupRegions"].map((p: any) => {
          return p;
        }),
    supportedFlexibleServerEditions: !item["supportedFlexibleServerEditions"]
      ? item["supportedFlexibleServerEditions"]
      : serverEditionCapabilityArrayDeserializer(item["supportedFlexibleServerEditions"]),
  };
}

export function serverEditionCapabilityArrayDeserializer(
  result: Array<ServerEditionCapability>,
): any[] {
  return result.map((item) => {
    return serverEditionCapabilityDeserializer(item);
  });
}

/** Server edition capabilities. */
export interface ServerEditionCapability {
  /** Server edition name */
  readonly name?: string;
  /** A list of supported storage editions */
  readonly supportedStorageEditions?: StorageEditionCapability[];
  /** A list of supported server versions. */
  readonly supportedServerVersions?: ServerVersionCapability[];
}

export function serverEditionCapabilityDeserializer(item: any): ServerEditionCapability {
  return {
    name: item["name"],
    supportedStorageEditions: !item["supportedStorageEditions"]
      ? item["supportedStorageEditions"]
      : storageEditionCapabilityArrayDeserializer(item["supportedStorageEditions"]),
    supportedServerVersions: !item["supportedServerVersions"]
      ? item["supportedServerVersions"]
      : serverVersionCapabilityArrayDeserializer(item["supportedServerVersions"]),
  };
}

export function serverVersionCapabilityArrayDeserializer(
  result: Array<ServerVersionCapability>,
): any[] {
  return result.map((item) => {
    return serverVersionCapabilityDeserializer(item);
  });
}

/** Server version capabilities. */
export interface ServerVersionCapability {
  /** server version */
  readonly name?: string;
  /** A list of supported Skus */
  readonly supportedSkus?: SkuCapability[];
}

export function serverVersionCapabilityDeserializer(item: any): ServerVersionCapability {
  return {
    name: item["name"],
    supportedSkus: !item["supportedSkus"]
      ? item["supportedSkus"]
      : skuCapabilityArrayDeserializer(item["supportedSkus"]),
  };
}

export function skuCapabilityArrayDeserializer(result: Array<SkuCapability>): any[] {
  return result.map((item) => {
    return skuCapabilityDeserializer(item);
  });
}

/** Sku capability */
export interface SkuCapability {
  /** vCore name */
  readonly name?: string;
  /** supported vCores */
  readonly vCores?: number;
  /** supported IOPS */
  readonly supportedIops?: number;
  /** supported memory per vCore in MB */
  readonly supportedMemoryPerVCoreMB?: number;
}

export function skuCapabilityDeserializer(item: any): SkuCapability {
  return {
    name: item["name"],
    vCores: item["vCores"],
    supportedIops: item["supportedIops"],
    supportedMemoryPerVCoreMB: item["supportedMemoryPerVCoreMB"],
  };
}

/** Virtual network subnet usage parameter */
export interface VirtualNetworkSubnetUsageParameter {
  /** Virtual network resource id. */
  virtualNetworkResourceId?: string;
}

export function virtualNetworkSubnetUsageParameterSerializer(
  item: VirtualNetworkSubnetUsageParameter,
): any {
  return { virtualNetworkResourceId: item["virtualNetworkResourceId"] };
}

/** Virtual network subnet usage data. */
export interface VirtualNetworkSubnetUsageResult {
  /** The location name. */
  readonly location?: string;
  /** The subscription id. */
  readonly subscriptionId?: string;
  /** A list of delegated subnet usage */
  readonly delegatedSubnetsUsage?: DelegatedSubnetUsage[];
}

export function virtualNetworkSubnetUsageResultDeserializer(
  item: any,
): VirtualNetworkSubnetUsageResult {
  return {
    location: item["location"],
    subscriptionId: item["subscriptionId"],
    delegatedSubnetsUsage: !item["delegatedSubnetsUsage"]
      ? item["delegatedSubnetsUsage"]
      : delegatedSubnetUsageArrayDeserializer(item["delegatedSubnetsUsage"]),
  };
}

export function delegatedSubnetUsageArrayDeserializer(result: Array<DelegatedSubnetUsage>): any[] {
  return result.map((item) => {
    return delegatedSubnetUsageDeserializer(item);
  });
}

/** Delegated subnet usage data. */
export interface DelegatedSubnetUsage {
  /** name of the subnet */
  readonly subnetName?: string;
  /** Number of used delegated subnets */
  readonly usage?: number;
}

export function delegatedSubnetUsageDeserializer(item: any): DelegatedSubnetUsage {
  return {
    subnetName: item["subnetName"],
    usage: item["usage"],
  };
}

/** Request from client to check resource name availability. */
export interface NameAvailabilityRequest {
  /** Resource name to verify. */
  name: string;
  /** Resource type used for verification. */
  type?: string;
}

export function nameAvailabilityRequestSerializer(item: NameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** Represents a resource name availability. */
export interface NameAvailability {
  /** Error Message. */
  message?: string;
  /** Indicates whether the resource name is available. */
  nameAvailable?: boolean;
  /** Reason for name being unavailable. */
  reason?: string;
}

export function nameAvailabilityDeserializer(item: any): NameAvailability {
  return {
    message: item["message"],
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
  };
}

/** Represents Operation Results API Response */
export interface OperationStatusExtendedResult extends OperationStatusResult {
  /** The extended properties of Operation Results */
  properties?: Record<string, any>;
}

export function operationStatusExtendedResultDeserializer(
  item: any,
): OperationStatusExtendedResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    resourceId: item["resourceId"],
    properties: item["properties"],
  };
}

/** The current status of an async operation. */
export interface OperationStatusResult {
  /** Fully qualified ID for the async operation. */
  id?: string;
  /** Name of the async operation. */
  name?: string;
  /** Operation status. */
  status: string;
  /** Percent of the operation that is complete. */
  percentComplete?: number;
  /** The start time of the operation. */
  startTime?: Date;
  /** The end time of the operation. */
  endTime?: Date;
  /** The operations list. */
  operations?: OperationStatusResult[];
  /** If present, details of the operation error. */
  error?: ErrorDetail;
  /** Fully qualified ID of the resource against which the original async operation was started. */
  readonly resourceId?: string;
}

export function operationStatusResultDeserializer(item: any): OperationStatusResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    resourceId: item["resourceId"],
  };
}

export function operationStatusResultArrayDeserializer(
  result: Array<OperationStatusResult>,
): any[] {
  return result.map((item) => {
    return operationStatusResultDeserializer(item);
  });
}

/** Represents Operation Results API Response */
export interface OperationProgressResult extends OperationStatusResult {
  /** The response properties specific to the operation */
  properties?: OperationProgressResponseTypeUnion;
}

export function operationProgressResultDeserializer(item: any): OperationProgressResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    resourceId: item["resourceId"],
    properties: !item["properties"]
      ? item["properties"]
      : operationProgressResponseTypeUnionDeserializer(item["properties"]),
  };
}

/** Represents the response properties specific to the operation */
export interface OperationProgressResponseType {
  /** Identifies the type of source operation */
  /** The discriminator possible values: BackupAndExportResponse, ImportFromStorageResponse */
  objectType: ObjectType;
}

export function operationProgressResponseTypeDeserializer(
  item: any,
): OperationProgressResponseType {
  return {
    objectType: item["objectType"],
  };
}

/** Alias for OperationProgressResponseTypeUnion */
export type OperationProgressResponseTypeUnion =
  | BackupAndExportResponseType
  | ImportFromStorageResponseType
  | OperationProgressResponseType;

export function operationProgressResponseTypeUnionDeserializer(
  item: any,
): OperationProgressResponseTypeUnion {
  switch (item.objectType) {
    case "BackupAndExportResponse":
      return backupAndExportResponseTypeDeserializer(item as BackupAndExportResponseType);

    case "ImportFromStorageResponse":
      return importFromStorageResponseTypeDeserializer(item as ImportFromStorageResponseType);

    default:
      return operationProgressResponseTypeDeserializer(item);
  }
}

/** Identifies the type of source operation */
export enum KnownObjectType {
  /** BackupAndExportResponse */
  BackupAndExportResponse = "BackupAndExportResponse",
  /** ImportFromStorageResponse */
  ImportFromStorageResponse = "ImportFromStorageResponse",
}

/**
 * Identifies the type of source operation \
 * {@link KnownObjectType} can be used interchangeably with ObjectType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BackupAndExportResponse** \
 * **ImportFromStorageResponse**
 */
export type ObjectType = string;

/** BackupAndExport Response Properties */
export interface BackupAndExportResponseType extends OperationProgressResponseType {
  /** Size of datasource in bytes */
  datasourceSizeInBytes?: number;
  /** Data transferred in bytes */
  dataTransferredInBytes?: number;
  /** Metadata related to backup to be stored for restoring resource in key-value pairs. */
  backupMetadata?: string;
  /** Identifies the type of source operation */
  objectType: "BackupAndExportResponse";
}

export function backupAndExportResponseTypeDeserializer(item: any): BackupAndExportResponseType {
  return {
    objectType: item["objectType"],
    datasourceSizeInBytes: item["datasourceSizeInBytes"],
    dataTransferredInBytes: item["dataTransferredInBytes"],
    backupMetadata: item["backupMetadata"],
  };
}

/** ImportFromStorage Response Properties */
export interface ImportFromStorageResponseType extends OperationProgressResponseType {
  /** The estimated time of operation completion. */
  estimatedCompletionTime?: Date;
  /** Identifies the type of source operation */
  objectType: "ImportFromStorageResponse";
}

export function importFromStorageResponseTypeDeserializer(
  item: any,
): ImportFromStorageResponseType {
  return {
    objectType: item["objectType"],
    estimatedCompletionTime: !item["estimatedCompletionTime"]
      ? item["estimatedCompletionTime"]
      : new Date(item["estimatedCompletionTime"]),
  };
}

/** The response of get private dns zone suffix. */
export interface GetPrivateDnsZoneSuffixResponse {
  /** Represents the private DNS zone suffix. */
  privateDnsZoneSuffix?: string;
}

export function getPrivateDnsZoneSuffixResponseDeserializer(
  item: any,
): GetPrivateDnsZoneSuffixResponse {
  return {
    privateDnsZoneSuffix: item["privateDnsZoneSuffix"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-12-30 API version. */
  V20241230 = "2024-12-30",
}
