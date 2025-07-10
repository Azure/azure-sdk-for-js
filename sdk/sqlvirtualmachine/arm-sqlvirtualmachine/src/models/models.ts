// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Virtual machine resource id for response. */
export interface _OperationListResult {
  /** The Operation items on this page */
  readonly value: Operation[];
  /** The link to the next page of items */
  readonly nextLink?: string;
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

/** Result of the request to list SQL operations. */
export interface Operation {
  /** The name of the operation being performed on this particular object." */
  readonly name?: string;
  /** he localized display information for this particular operation / action. */
  readonly display?: OperationDisplay;
  /** The intended executor of the operation." */
  readonly origin?: OperationOrigin;
  /** Additional descriptions for the operation. */
  readonly properties?: Record<string, Record<string, any>>;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: !item["properties"]
      ? item["properties"]
      : _operationPropertyRecordDeserializer(item["properties"]),
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

/** The intended executor of the operation. */
export enum KnownOperationOrigin {
  User = "user",
  System = "system",
}

/**
 * The intended executor of the operation. \
 * {@link KnownOperationOrigin} can be used interchangeably with OperationOrigin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user** \
 * **system**
 */
export type OperationOrigin = string;

export function _operationPropertyRecordDeserializer(
  item: Record<string, any>,
): Record<string, _OperationProperty> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : _operationPropertyDeserializer(item[key]);
  });
  return result;
}

/** model interface _OperationProperty */
export interface _OperationProperty {}

export function _operationPropertyDeserializer(item: any): _OperationProperty {
  return item;
}

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

/** A SQL Server availability group listener. */
export interface AvailabilityGroupListener extends ProxyResource {
  /** Resource properties. */
  properties?: AvailabilityGroupListenerProperties;
}

export function availabilityGroupListenerSerializer(item: AvailabilityGroupListener): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : availabilityGroupListenerPropertiesSerializer(item["properties"]),
  };
}

export function availabilityGroupListenerDeserializer(item: any): AvailabilityGroupListener {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : availabilityGroupListenerPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of an availability group listener. */
export interface AvailabilityGroupListenerProperties {
  /** Provisioning state to track the async operation status. */
  readonly provisioningState?: string;
  /** Name of the availability group. */
  availabilityGroupName?: string;
  /** List of load balancer configurations for an availability group listener. */
  loadBalancerConfigurations?: LoadBalancerConfiguration[];
  /** List of multi subnet IP configurations for an AG listener. */
  multiSubnetIpConfigurations?: MultiSubnetIpConfiguration[];
  /** Create a default availability group if it does not exist. */
  createDefaultAvailabilityGroupIfNotExist?: boolean;
  /** Listener port. */
  port?: number;
  /** Availability Group configuration. */
  availabilityGroupConfiguration?: AgConfiguration;
}

export function availabilityGroupListenerPropertiesSerializer(
  item: AvailabilityGroupListenerProperties,
): any {
  return {
    availabilityGroupName: item["availabilityGroupName"],
    loadBalancerConfigurations: !item["loadBalancerConfigurations"]
      ? item["loadBalancerConfigurations"]
      : loadBalancerConfigurationArraySerializer(item["loadBalancerConfigurations"]),
    multiSubnetIpConfigurations: !item["multiSubnetIpConfigurations"]
      ? item["multiSubnetIpConfigurations"]
      : multiSubnetIpConfigurationArraySerializer(item["multiSubnetIpConfigurations"]),
    createDefaultAvailabilityGroupIfNotExist: item["createDefaultAvailabilityGroupIfNotExist"],
    port: item["port"],
    availabilityGroupConfiguration: !item["availabilityGroupConfiguration"]
      ? item["availabilityGroupConfiguration"]
      : agConfigurationSerializer(item["availabilityGroupConfiguration"]),
  };
}

export function availabilityGroupListenerPropertiesDeserializer(
  item: any,
): AvailabilityGroupListenerProperties {
  return {
    provisioningState: item["provisioningState"],
    availabilityGroupName: item["availabilityGroupName"],
    loadBalancerConfigurations: !item["loadBalancerConfigurations"]
      ? item["loadBalancerConfigurations"]
      : loadBalancerConfigurationArrayDeserializer(item["loadBalancerConfigurations"]),
    multiSubnetIpConfigurations: !item["multiSubnetIpConfigurations"]
      ? item["multiSubnetIpConfigurations"]
      : multiSubnetIpConfigurationArrayDeserializer(item["multiSubnetIpConfigurations"]),
    createDefaultAvailabilityGroupIfNotExist: item["createDefaultAvailabilityGroupIfNotExist"],
    port: item["port"],
    availabilityGroupConfiguration: !item["availabilityGroupConfiguration"]
      ? item["availabilityGroupConfiguration"]
      : agConfigurationDeserializer(item["availabilityGroupConfiguration"]),
  };
}

export function loadBalancerConfigurationArraySerializer(
  result: Array<LoadBalancerConfiguration>,
): any[] {
  return result.map((item) => {
    return loadBalancerConfigurationSerializer(item);
  });
}

export function loadBalancerConfigurationArrayDeserializer(
  result: Array<LoadBalancerConfiguration>,
): any[] {
  return result.map((item) => {
    return loadBalancerConfigurationDeserializer(item);
  });
}

/** A load balancer configuration for an availability group listener. */
export interface LoadBalancerConfiguration {
  /** Private IP address. */
  privateIpAddress?: PrivateIPAddress;
  /** Resource id of the public IP. */
  publicIpAddressResourceId?: string;
  /** Resource id of the load balancer. */
  loadBalancerResourceId?: string;
  /** Probe port. */
  probePort?: number;
  /** List of the SQL virtual machine instance resource id's that are enrolled into the availability group listener. */
  sqlVirtualMachineInstances?: string[];
}

export function loadBalancerConfigurationSerializer(item: LoadBalancerConfiguration): any {
  return {
    privateIpAddress: !item["privateIpAddress"]
      ? item["privateIpAddress"]
      : privateIPAddressSerializer(item["privateIpAddress"]),
    publicIpAddressResourceId: item["publicIpAddressResourceId"],
    loadBalancerResourceId: item["loadBalancerResourceId"],
    probePort: item["probePort"],
    sqlVirtualMachineInstances: !item["sqlVirtualMachineInstances"]
      ? item["sqlVirtualMachineInstances"]
      : item["sqlVirtualMachineInstances"].map((p: any) => {
          return p;
        }),
  };
}

export function loadBalancerConfigurationDeserializer(item: any): LoadBalancerConfiguration {
  return {
    privateIpAddress: !item["privateIpAddress"]
      ? item["privateIpAddress"]
      : privateIPAddressDeserializer(item["privateIpAddress"]),
    publicIpAddressResourceId: item["publicIpAddressResourceId"],
    loadBalancerResourceId: item["loadBalancerResourceId"],
    probePort: item["probePort"],
    sqlVirtualMachineInstances: !item["sqlVirtualMachineInstances"]
      ? item["sqlVirtualMachineInstances"]
      : item["sqlVirtualMachineInstances"].map((p: any) => {
          return p;
        }),
  };
}

/** A private IP address bound to the availability group listener. */
export interface PrivateIPAddress {
  /** Private IP address bound to the availability group listener. */
  ipAddress?: string;
  /** Subnet used to include private IP. */
  subnetResourceId?: string;
}

export function privateIPAddressSerializer(item: PrivateIPAddress): any {
  return {
    ipAddress: item["ipAddress"],
    subnetResourceId: item["subnetResourceId"],
  };
}

export function privateIPAddressDeserializer(item: any): PrivateIPAddress {
  return {
    ipAddress: item["ipAddress"],
    subnetResourceId: item["subnetResourceId"],
  };
}

export function multiSubnetIpConfigurationArraySerializer(
  result: Array<MultiSubnetIpConfiguration>,
): any[] {
  return result.map((item) => {
    return multiSubnetIpConfigurationSerializer(item);
  });
}

export function multiSubnetIpConfigurationArrayDeserializer(
  result: Array<MultiSubnetIpConfiguration>,
): any[] {
  return result.map((item) => {
    return multiSubnetIpConfigurationDeserializer(item);
  });
}

/** Multi subnet ip configuration for an availability group listener. */
export interface MultiSubnetIpConfiguration {
  /** Private IP address. */
  privateIpAddress: PrivateIPAddress;
  /** SQL virtual machine instance resource id that are enrolled into the availability group listener. */
  sqlVirtualMachineInstance: string;
}

export function multiSubnetIpConfigurationSerializer(item: MultiSubnetIpConfiguration): any {
  return {
    privateIpAddress: privateIPAddressSerializer(item["privateIpAddress"]),
    sqlVirtualMachineInstance: item["sqlVirtualMachineInstance"],
  };
}

export function multiSubnetIpConfigurationDeserializer(item: any): MultiSubnetIpConfiguration {
  return {
    privateIpAddress: privateIPAddressDeserializer(item["privateIpAddress"]),
    sqlVirtualMachineInstance: item["sqlVirtualMachineInstance"],
  };
}

/** Availability group configuration. */
export interface AgConfiguration {
  /** Replica configurations. */
  replicas?: AgReplica[];
}

export function agConfigurationSerializer(item: AgConfiguration): any {
  return {
    replicas: !item["replicas"] ? item["replicas"] : agReplicaArraySerializer(item["replicas"]),
  };
}

export function agConfigurationDeserializer(item: any): AgConfiguration {
  return {
    replicas: !item["replicas"] ? item["replicas"] : agReplicaArrayDeserializer(item["replicas"]),
  };
}

export function agReplicaArraySerializer(result: Array<AgReplica>): any[] {
  return result.map((item) => {
    return agReplicaSerializer(item);
  });
}

export function agReplicaArrayDeserializer(result: Array<AgReplica>): any[] {
  return result.map((item) => {
    return agReplicaDeserializer(item);
  });
}

/** Availability group replica configuration. */
export interface AgReplica {
  /** Sql VirtualMachine Instance Id. */
  sqlVirtualMachineInstanceId?: string;
  /** Replica Role in availability group. */
  role?: Role;
  /** Replica commit mode in availability group. */
  commit?: Commit;
  /** Replica failover mode in availability group. */
  failover?: Failover;
  /** Replica readable secondary mode in availability group. */
  readableSecondary?: ReadableSecondary;
}

export function agReplicaSerializer(item: AgReplica): any {
  return {
    sqlVirtualMachineInstanceId: item["sqlVirtualMachineInstanceId"],
    role: item["role"],
    commit: item["commit"],
    failover: item["failover"],
    readableSecondary: item["readableSecondary"],
  };
}

export function agReplicaDeserializer(item: any): AgReplica {
  return {
    sqlVirtualMachineInstanceId: item["sqlVirtualMachineInstanceId"],
    role: item["role"],
    commit: item["commit"],
    failover: item["failover"],
    readableSecondary: item["readableSecondary"],
  };
}

/** Replica Role in availability group. */
export enum KnownRole {
  Primary = "Primary",
  Secondary = "Secondary",
}

/**
 * Replica Role in availability group. \
 * {@link KnownRole} can be used interchangeably with Role,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary** \
 * **Secondary**
 */
export type Role = string;

/** Replica commit mode in availability group. */
export enum KnownCommit {
  SynchronousCommit = "Synchronous_Commit",
  AsynchronousCommit = "Asynchronous_Commit",
}

/**
 * Replica commit mode in availability group. \
 * {@link KnownCommit} can be used interchangeably with Commit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Synchronous_Commit** \
 * **Asynchronous_Commit**
 */
export type Commit = string;

/** Replica failover mode in availability group. */
export enum KnownFailover {
  Automatic = "Automatic",
  Manual = "Manual",
}

/**
 * Replica failover mode in availability group. \
 * {@link KnownFailover} can be used interchangeably with Failover,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Automatic** \
 * **Manual**
 */
export type Failover = string;

/** Replica readable secondary mode in availability group. */
export enum KnownReadableSecondary {
  No = "No",
  All = "All",
  ReadOnly = "Read_Only",
}

/**
 * Replica readable secondary mode in availability group. \
 * {@link KnownReadableSecondary} can be used interchangeably with ReadableSecondary,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **No** \
 * **All** \
 * **Read_Only**
 */
export type ReadableSecondary = string;

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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** The response of a AvailabilityGroupListener list operation. */
export interface _AvailabilityGroupListenerListResult {
  /** The AvailabilityGroupListener items on this page */
  readonly value: AvailabilityGroupListener[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _availabilityGroupListenerListResultDeserializer(
  item: any,
): _AvailabilityGroupListenerListResult {
  return {
    value: availabilityGroupListenerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function availabilityGroupListenerArraySerializer(
  result: Array<AvailabilityGroupListener>,
): any[] {
  return result.map((item) => {
    return availabilityGroupListenerSerializer(item);
  });
}

export function availabilityGroupListenerArrayDeserializer(
  result: Array<AvailabilityGroupListener>,
): any[] {
  return result.map((item) => {
    return availabilityGroupListenerDeserializer(item);
  });
}

/** A SQL virtual machine. */
export interface SqlVirtualMachine extends TrackedResource {
  /** DO NOT USE. This value will be deprecated. Azure Active Directory identity of the server. */
  identity?: ResourceIdentity;
  /** Resource properties. */
  properties?: SqlVirtualMachineProperties;
}

export function sqlVirtualMachineSerializer(item: SqlVirtualMachine): any {
  return {
    tags: item["tags"],
    location: item["location"],
    identity: !item["identity"] ? item["identity"] : resourceIdentitySerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : sqlVirtualMachinePropertiesSerializer(item["properties"]),
  };
}

export function sqlVirtualMachineDeserializer(item: any): SqlVirtualMachine {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    identity: !item["identity"] ? item["identity"] : resourceIdentityDeserializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : sqlVirtualMachinePropertiesDeserializer(item["properties"]),
  };
}

/** Azure Active Directory identity configuration for a resource. */
export interface ResourceIdentity {
  /** The Azure Active Directory principal id. */
  readonly principalId?: string;
  /** The identity type. Set this to 'SystemAssigned' in order to automatically create and assign an Azure Active Directory principal for the resource. */
  type?: IdentityType;
  /** The Azure Active Directory tenant id. */
  readonly tenantId?: string;
}

export function resourceIdentitySerializer(item: ResourceIdentity): any {
  return { type: item["type"] };
}

export function resourceIdentityDeserializer(item: any): ResourceIdentity {
  return {
    principalId: item["principalId"],
    type: item["type"],
    tenantId: item["tenantId"],
  };
}

/** The identity type. Set this to 'SystemAssigned' in order to automatically create and assign an Azure Active Directory principal for the resource. */
export enum KnownIdentityType {
  None = "None",
  SystemAssigned = "SystemAssigned",
  UserAssigned = "UserAssigned",
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * The identity type. Set this to 'SystemAssigned' in order to automatically create and assign an Azure Active Directory principal for the resource. \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **SystemAssigned** \
 * **UserAssigned** \
 * **SystemAssigned,UserAssigned**
 */
export type IdentityType = string;

/** The SQL virtual machine properties. */
export interface SqlVirtualMachineProperties {
  /** ARM Resource id of underlying virtual machine created from SQL marketplace image. */
  virtualMachineResourceId?: string;
  /** Provisioning state to track the async operation status. */
  readonly provisioningState?: string;
  /** SQL image offer. Examples include SQL2016-WS2016, SQL2017-WS2016. */
  sqlImageOffer?: string;
  /** SQL Server license type. */
  sqlServerLicenseType?: SqlServerLicenseType;
  /** SQL Server Management type. NOTE: This parameter is not used anymore. API will automatically detect the Sql Management, refrain from using it. */
  sqlManagement?: SqlManagementMode;
  /** SQL IaaS Agent least privilege mode. */
  leastPrivilegeMode?: LeastPrivilegeMode;
  /** SQL Server edition type. */
  sqlImageSku?: SqlImageSku;
  /** ARM resource id of the SQL virtual machine group this SQL virtual machine is or will be part of. */
  sqlVirtualMachineGroupResourceId?: string;
  /** Domain credentials for setting up Windows Server Failover Cluster for SQL availability group. */
  wsfcDomainCredentials?: WsfcDomainCredentials;
  /** Domain credentials for setting up Windows Server Failover Cluster for SQL availability group. */
  wsfcStaticIp?: string;
  /** Auto patching settings for applying critical security updates to SQL virtual machine. */
  autoPatchingSettings?: AutoPatchingSettings;
  /** Auto backup settings for SQL Server. */
  autoBackupSettings?: AutoBackupSettings;
  /** Key vault credential settings. */
  keyVaultCredentialSettings?: KeyVaultCredentialSettings;
  /** SQL Server configuration management settings. */
  serverConfigurationsManagementSettings?: ServerConfigurationsManagementSettings;
  /** Storage Configuration Settings. */
  storageConfigurationSettings?: StorageConfigurationSettings;
  /** Troubleshooting status */
  readonly troubleshootingStatus?: TroubleshootingStatus;
  /** SQL best practices Assessment Settings. */
  assessmentSettings?: AssessmentSettings;
  /** Enable automatic upgrade of Sql IaaS extension Agent. */
  enableAutomaticUpgrade?: boolean;
  /** Additional VM Patching solution enabled on the Virtual Machine */
  readonly additionalVmPatch?: AdditionalOsPatch;
  /** Virtual Machine Identity details used for Sql IaaS extension configurations. */
  virtualMachineIdentitySettings?: VirtualMachineIdentity;
  /** Operating System of the current SQL Virtual Machine. */
  readonly osType?: OsType;
}

export function sqlVirtualMachinePropertiesSerializer(item: SqlVirtualMachineProperties): any {
  return {
    virtualMachineResourceId: item["virtualMachineResourceId"],
    sqlImageOffer: item["sqlImageOffer"],
    sqlServerLicenseType: item["sqlServerLicenseType"],
    sqlManagement: item["sqlManagement"],
    leastPrivilegeMode: item["leastPrivilegeMode"],
    sqlImageSku: item["sqlImageSku"],
    sqlVirtualMachineGroupResourceId: item["sqlVirtualMachineGroupResourceId"],
    wsfcDomainCredentials: !item["wsfcDomainCredentials"]
      ? item["wsfcDomainCredentials"]
      : wsfcDomainCredentialsSerializer(item["wsfcDomainCredentials"]),
    wsfcStaticIp: item["wsfcStaticIp"],
    autoPatchingSettings: !item["autoPatchingSettings"]
      ? item["autoPatchingSettings"]
      : autoPatchingSettingsSerializer(item["autoPatchingSettings"]),
    autoBackupSettings: !item["autoBackupSettings"]
      ? item["autoBackupSettings"]
      : autoBackupSettingsSerializer(item["autoBackupSettings"]),
    keyVaultCredentialSettings: !item["keyVaultCredentialSettings"]
      ? item["keyVaultCredentialSettings"]
      : keyVaultCredentialSettingsSerializer(item["keyVaultCredentialSettings"]),
    serverConfigurationsManagementSettings: !item["serverConfigurationsManagementSettings"]
      ? item["serverConfigurationsManagementSettings"]
      : serverConfigurationsManagementSettingsSerializer(
          item["serverConfigurationsManagementSettings"],
        ),
    storageConfigurationSettings: !item["storageConfigurationSettings"]
      ? item["storageConfigurationSettings"]
      : storageConfigurationSettingsSerializer(item["storageConfigurationSettings"]),
    assessmentSettings: !item["assessmentSettings"]
      ? item["assessmentSettings"]
      : assessmentSettingsSerializer(item["assessmentSettings"]),
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    virtualMachineIdentitySettings: !item["virtualMachineIdentitySettings"]
      ? item["virtualMachineIdentitySettings"]
      : virtualMachineIdentitySerializer(item["virtualMachineIdentitySettings"]),
  };
}

export function sqlVirtualMachinePropertiesDeserializer(item: any): SqlVirtualMachineProperties {
  return {
    virtualMachineResourceId: item["virtualMachineResourceId"],
    provisioningState: item["provisioningState"],
    sqlImageOffer: item["sqlImageOffer"],
    sqlServerLicenseType: item["sqlServerLicenseType"],
    sqlManagement: item["sqlManagement"],
    leastPrivilegeMode: item["leastPrivilegeMode"],
    sqlImageSku: item["sqlImageSku"],
    sqlVirtualMachineGroupResourceId: item["sqlVirtualMachineGroupResourceId"],
    wsfcDomainCredentials: !item["wsfcDomainCredentials"]
      ? item["wsfcDomainCredentials"]
      : wsfcDomainCredentialsDeserializer(item["wsfcDomainCredentials"]),
    wsfcStaticIp: item["wsfcStaticIp"],
    autoPatchingSettings: !item["autoPatchingSettings"]
      ? item["autoPatchingSettings"]
      : autoPatchingSettingsDeserializer(item["autoPatchingSettings"]),
    autoBackupSettings: !item["autoBackupSettings"]
      ? item["autoBackupSettings"]
      : autoBackupSettingsDeserializer(item["autoBackupSettings"]),
    keyVaultCredentialSettings: !item["keyVaultCredentialSettings"]
      ? item["keyVaultCredentialSettings"]
      : keyVaultCredentialSettingsDeserializer(item["keyVaultCredentialSettings"]),
    serverConfigurationsManagementSettings: !item["serverConfigurationsManagementSettings"]
      ? item["serverConfigurationsManagementSettings"]
      : serverConfigurationsManagementSettingsDeserializer(
          item["serverConfigurationsManagementSettings"],
        ),
    storageConfigurationSettings: !item["storageConfigurationSettings"]
      ? item["storageConfigurationSettings"]
      : storageConfigurationSettingsDeserializer(item["storageConfigurationSettings"]),
    troubleshootingStatus: !item["troubleshootingStatus"]
      ? item["troubleshootingStatus"]
      : troubleshootingStatusDeserializer(item["troubleshootingStatus"]),
    assessmentSettings: !item["assessmentSettings"]
      ? item["assessmentSettings"]
      : assessmentSettingsDeserializer(item["assessmentSettings"]),
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    additionalVmPatch: item["additionalVmPatch"],
    virtualMachineIdentitySettings: !item["virtualMachineIdentitySettings"]
      ? item["virtualMachineIdentitySettings"]
      : virtualMachineIdentityDeserializer(item["virtualMachineIdentitySettings"]),
    osType: item["osType"],
  };
}

/** SQL Server license type. */
export enum KnownSqlServerLicenseType {
  Payg = "PAYG",
  Ahub = "AHUB",
  DR = "DR",
}

/**
 * SQL Server license type. \
 * {@link KnownSqlServerLicenseType} can be used interchangeably with SqlServerLicenseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PAYG** \
 * **AHUB** \
 * **DR**
 */
export type SqlServerLicenseType = string;

/** SQL Server Management type. NOTE: This parameter is not used anymore. API will automatically detect the Sql Management, refrain from using it. */
export enum KnownSqlManagementMode {
  Full = "Full",
  LightWeight = "LightWeight",
  NoAgent = "NoAgent",
}

/**
 * SQL Server Management type. NOTE: This parameter is not used anymore. API will automatically detect the Sql Management, refrain from using it. \
 * {@link KnownSqlManagementMode} can be used interchangeably with SqlManagementMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Full** \
 * **LightWeight** \
 * **NoAgent**
 */
export type SqlManagementMode = string;

/** SQL IaaS Agent least privilege mode. */
export enum KnownLeastPrivilegeMode {
  Enabled = "Enabled",
  NotSet = "NotSet",
}

/**
 * SQL IaaS Agent least privilege mode. \
 * {@link KnownLeastPrivilegeMode} can be used interchangeably with LeastPrivilegeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **NotSet**
 */
export type LeastPrivilegeMode = string;

/** SQL Server edition type. */
export enum KnownSqlImageSku {
  Developer = "Developer",
  Express = "Express",
  Standard = "Standard",
  Enterprise = "Enterprise",
  Web = "Web",
}

/**
 * SQL Server edition type. \
 * {@link KnownSqlImageSku} can be used interchangeably with SqlImageSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Developer** \
 * **Express** \
 * **Standard** \
 * **Enterprise** \
 * **Web**
 */
export type SqlImageSku = string;

/** Domain credentials for setting up Windows Server Failover Cluster for SQL availability group. */
export interface WsfcDomainCredentials {
  /** Cluster bootstrap account password. */
  clusterBootstrapAccountPassword?: string;
  /** Cluster operator account password. */
  clusterOperatorAccountPassword?: string;
  /** SQL service account password. */
  sqlServiceAccountPassword?: string;
}

export function wsfcDomainCredentialsSerializer(item: WsfcDomainCredentials): any {
  return {
    clusterBootstrapAccountPassword: item["clusterBootstrapAccountPassword"],
    clusterOperatorAccountPassword: item["clusterOperatorAccountPassword"],
    sqlServiceAccountPassword: item["sqlServiceAccountPassword"],
  };
}

export function wsfcDomainCredentialsDeserializer(item: any): WsfcDomainCredentials {
  return {
    clusterBootstrapAccountPassword: item["clusterBootstrapAccountPassword"],
    clusterOperatorAccountPassword: item["clusterOperatorAccountPassword"],
    sqlServiceAccountPassword: item["sqlServiceAccountPassword"],
  };
}

/** Set a patching window during which Windows and SQL patches will be applied. */
export interface AutoPatchingSettings {
  /** Enable or disable autopatching on SQL virtual machine. */
  enable?: boolean;
  /** Day of week to apply the patch on. */
  dayOfWeek?: DayOfWeek;
  /** Hour of the day when patching is initiated. Local VM time. */
  maintenanceWindowStartingHour?: number;
  /** Duration of patching. */
  maintenanceWindowDuration?: number;
  /** Additional Patch to be enable or enabled on the SQL Virtual Machine. */
  additionalVmPatch?: AdditionalVmPatch;
}

export function autoPatchingSettingsSerializer(item: AutoPatchingSettings): any {
  return {
    enable: item["enable"],
    dayOfWeek: item["dayOfWeek"],
    maintenanceWindowStartingHour: item["maintenanceWindowStartingHour"],
    maintenanceWindowDuration: item["maintenanceWindowDuration"],
    additionalVmPatch: item["additionalVmPatch"],
  };
}

export function autoPatchingSettingsDeserializer(item: any): AutoPatchingSettings {
  return {
    enable: item["enable"],
    dayOfWeek: item["dayOfWeek"],
    maintenanceWindowStartingHour: item["maintenanceWindowStartingHour"],
    maintenanceWindowDuration: item["maintenanceWindowDuration"],
    additionalVmPatch: item["additionalVmPatch"],
  };
}

/** Day of week to apply the patch on. */
export type DayOfWeek =
  | "Everyday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

/** Additional Patch to be enable or enabled on the SQL Virtual Machine. */
export enum KnownAdditionalVmPatch {
  NotSet = "NotSet",
  MicrosoftUpdate = "MicrosoftUpdate",
}

/**
 * Additional Patch to be enable or enabled on the SQL Virtual Machine. \
 * {@link KnownAdditionalVmPatch} can be used interchangeably with AdditionalVmPatch,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSet** \
 * **MicrosoftUpdate**
 */
export type AdditionalVmPatch = string;

/** Configure backups for databases in your SQL virtual machine. */
export interface AutoBackupSettings {
  /** Enable or disable autobackup on SQL virtual machine. */
  enable?: boolean;
  /** Enable or disable encryption for backup on SQL virtual machine. */
  enableEncryption?: boolean;
  /** Retention period of backup: 1-90 days. */
  retentionPeriod?: number;
  /** Storage account url where backup will be taken to. */
  storageAccountUrl?: string;
  /** Storage container name where backup will be taken to. */
  storageContainerName?: string;
  /** Storage account key where backup will be taken to. */
  storageAccessKey?: string;
  /** Password for encryption on backup. */
  password?: string;
  /** Include or exclude system databases from auto backup. */
  backupSystemDbs?: boolean;
  /** Backup schedule type. */
  backupScheduleType?: BackupScheduleType;
  /** Frequency of full backups. In both cases, full backups begin during the next scheduled time window. */
  fullBackupFrequency?: FullBackupFrequencyType;
  /** Days of the week for the backups when FullBackupFrequency is set to Weekly. */
  daysOfWeek?: AutoBackupDaysOfWeek[];
  /** Start time of a given day during which full backups can take place. 0-23 hours. */
  fullBackupStartTime?: number;
  /** Duration of the time window of a given day during which full backups can take place. 1-23 hours. */
  fullBackupWindowHours?: number;
  /** Frequency of log backups. 5-60 minutes. */
  logBackupFrequency?: number;
}

export function autoBackupSettingsSerializer(item: AutoBackupSettings): any {
  return {
    enable: item["enable"],
    enableEncryption: item["enableEncryption"],
    retentionPeriod: item["retentionPeriod"],
    storageAccountUrl: item["storageAccountUrl"],
    storageContainerName: item["storageContainerName"],
    storageAccessKey: item["storageAccessKey"],
    password: item["password"],
    backupSystemDbs: item["backupSystemDbs"],
    backupScheduleType: item["backupScheduleType"],
    fullBackupFrequency: item["fullBackupFrequency"],
    daysOfWeek: !item["daysOfWeek"]
      ? item["daysOfWeek"]
      : item["daysOfWeek"].map((p: any) => {
          return p;
        }),
    fullBackupStartTime: item["fullBackupStartTime"],
    fullBackupWindowHours: item["fullBackupWindowHours"],
    logBackupFrequency: item["logBackupFrequency"],
  };
}

export function autoBackupSettingsDeserializer(item: any): AutoBackupSettings {
  return {
    enable: item["enable"],
    enableEncryption: item["enableEncryption"],
    retentionPeriod: item["retentionPeriod"],
    storageAccountUrl: item["storageAccountUrl"],
    storageContainerName: item["storageContainerName"],
    storageAccessKey: item["storageAccessKey"],
    password: item["password"],
    backupSystemDbs: item["backupSystemDbs"],
    backupScheduleType: item["backupScheduleType"],
    fullBackupFrequency: item["fullBackupFrequency"],
    daysOfWeek: !item["daysOfWeek"]
      ? item["daysOfWeek"]
      : item["daysOfWeek"].map((p: any) => {
          return p;
        }),
    fullBackupStartTime: item["fullBackupStartTime"],
    fullBackupWindowHours: item["fullBackupWindowHours"],
    logBackupFrequency: item["logBackupFrequency"],
  };
}

/** Backup schedule type. */
export enum KnownBackupScheduleType {
  Manual = "Manual",
  Automated = "Automated",
}

/**
 * Backup schedule type. \
 * {@link KnownBackupScheduleType} can be used interchangeably with BackupScheduleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manual** \
 * **Automated**
 */
export type BackupScheduleType = string;

/** Frequency of full backups. In both cases, full backups begin during the next scheduled time window. */
export enum KnownFullBackupFrequencyType {
  Daily = "Daily",
  Weekly = "Weekly",
}

/**
 * Frequency of full backups. In both cases, full backups begin during the next scheduled time window. \
 * {@link KnownFullBackupFrequencyType} can be used interchangeably with FullBackupFrequencyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Daily** \
 * **Weekly**
 */
export type FullBackupFrequencyType = string;

/** Known values of {@link AutoBackupDaysOfWeek} that the service accepts. */
export enum KnownAutoBackupDaysOfWeek {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

/** Type of AutoBackupDaysOfWeek */
export type AutoBackupDaysOfWeek = string;

/** Configure your SQL virtual machine to be able to connect to the Azure Key Vault service. */
export interface KeyVaultCredentialSettings {
  /** Enable or disable key vault credential setting. */
  enable?: boolean;
  /** Credential name. */
  credentialName?: string;
  /** Azure Key Vault url. */
  azureKeyVaultUrl?: string;
  /** Service principal name to access key vault. */
  servicePrincipalName?: string;
  /** Service principal name secret to access key vault. */
  servicePrincipalSecret?: string;
}

export function keyVaultCredentialSettingsSerializer(item: KeyVaultCredentialSettings): any {
  return {
    enable: item["enable"],
    credentialName: item["credentialName"],
    azureKeyVaultUrl: item["azureKeyVaultUrl"],
    servicePrincipalName: item["servicePrincipalName"],
    servicePrincipalSecret: item["servicePrincipalSecret"],
  };
}

export function keyVaultCredentialSettingsDeserializer(item: any): KeyVaultCredentialSettings {
  return {
    enable: item["enable"],
    credentialName: item["credentialName"],
    azureKeyVaultUrl: item["azureKeyVaultUrl"],
    servicePrincipalName: item["servicePrincipalName"],
    servicePrincipalSecret: item["servicePrincipalSecret"],
  };
}

/** Set the connectivity, storage and workload settings. */
export interface ServerConfigurationsManagementSettings {
  /** SQL connectivity type settings. */
  sqlConnectivityUpdateSettings?: SqlConnectivityUpdateSettings;
  /** SQL workload type settings. */
  sqlWorkloadTypeUpdateSettings?: SqlWorkloadTypeUpdateSettings;
  /** SQL storage update settings. */
  sqlStorageUpdateSettings?: SqlStorageUpdateSettings;
  /** Additional SQL feature settings. */
  additionalFeaturesServerConfigurations?: AdditionalFeaturesServerConfigurations;
  /** SQL Instance settings. */
  sqlInstanceSettings?: SQLInstanceSettings;
  /** Azure AD authentication Settings. */
  azureAdAuthenticationSettings?: AADAuthenticationSettings;
}

export function serverConfigurationsManagementSettingsSerializer(
  item: ServerConfigurationsManagementSettings,
): any {
  return {
    sqlConnectivityUpdateSettings: !item["sqlConnectivityUpdateSettings"]
      ? item["sqlConnectivityUpdateSettings"]
      : sqlConnectivityUpdateSettingsSerializer(item["sqlConnectivityUpdateSettings"]),
    sqlWorkloadTypeUpdateSettings: !item["sqlWorkloadTypeUpdateSettings"]
      ? item["sqlWorkloadTypeUpdateSettings"]
      : sqlWorkloadTypeUpdateSettingsSerializer(item["sqlWorkloadTypeUpdateSettings"]),
    sqlStorageUpdateSettings: !item["sqlStorageUpdateSettings"]
      ? item["sqlStorageUpdateSettings"]
      : sqlStorageUpdateSettingsSerializer(item["sqlStorageUpdateSettings"]),
    additionalFeaturesServerConfigurations: !item["additionalFeaturesServerConfigurations"]
      ? item["additionalFeaturesServerConfigurations"]
      : additionalFeaturesServerConfigurationsSerializer(
          item["additionalFeaturesServerConfigurations"],
        ),
    sqlInstanceSettings: !item["sqlInstanceSettings"]
      ? item["sqlInstanceSettings"]
      : sqlInstanceSettingsSerializer(item["sqlInstanceSettings"]),
    azureAdAuthenticationSettings: !item["azureAdAuthenticationSettings"]
      ? item["azureAdAuthenticationSettings"]
      : aadAuthenticationSettingsSerializer(item["azureAdAuthenticationSettings"]),
  };
}

export function serverConfigurationsManagementSettingsDeserializer(
  item: any,
): ServerConfigurationsManagementSettings {
  return {
    sqlConnectivityUpdateSettings: !item["sqlConnectivityUpdateSettings"]
      ? item["sqlConnectivityUpdateSettings"]
      : sqlConnectivityUpdateSettingsDeserializer(item["sqlConnectivityUpdateSettings"]),
    sqlWorkloadTypeUpdateSettings: !item["sqlWorkloadTypeUpdateSettings"]
      ? item["sqlWorkloadTypeUpdateSettings"]
      : sqlWorkloadTypeUpdateSettingsDeserializer(item["sqlWorkloadTypeUpdateSettings"]),
    sqlStorageUpdateSettings: !item["sqlStorageUpdateSettings"]
      ? item["sqlStorageUpdateSettings"]
      : sqlStorageUpdateSettingsDeserializer(item["sqlStorageUpdateSettings"]),
    additionalFeaturesServerConfigurations: !item["additionalFeaturesServerConfigurations"]
      ? item["additionalFeaturesServerConfigurations"]
      : additionalFeaturesServerConfigurationsDeserializer(
          item["additionalFeaturesServerConfigurations"],
        ),
    sqlInstanceSettings: !item["sqlInstanceSettings"]
      ? item["sqlInstanceSettings"]
      : sqlInstanceSettingsDeserializer(item["sqlInstanceSettings"]),
    azureAdAuthenticationSettings: !item["azureAdAuthenticationSettings"]
      ? item["azureAdAuthenticationSettings"]
      : aadAuthenticationSettingsDeserializer(item["azureAdAuthenticationSettings"]),
  };
}

/** Set the access level and network port settings for SQL Server. */
export interface SqlConnectivityUpdateSettings {
  /** SQL Server connectivity option. */
  connectivityType?: ConnectivityType;
  /** SQL Server port. */
  port?: number;
  /** SQL Server sysadmin login to create. */
  sqlAuthUpdateUserName?: string;
  /** SQL Server sysadmin login password. */
  sqlAuthUpdatePassword?: string;
}

export function sqlConnectivityUpdateSettingsSerializer(item: SqlConnectivityUpdateSettings): any {
  return {
    connectivityType: item["connectivityType"],
    port: item["port"],
    sqlAuthUpdateUserName: item["sqlAuthUpdateUserName"],
    sqlAuthUpdatePassword: item["sqlAuthUpdatePassword"],
  };
}

export function sqlConnectivityUpdateSettingsDeserializer(
  item: any,
): SqlConnectivityUpdateSettings {
  return {
    connectivityType: item["connectivityType"],
    port: item["port"],
    sqlAuthUpdateUserName: item["sqlAuthUpdateUserName"],
    sqlAuthUpdatePassword: item["sqlAuthUpdatePassword"],
  };
}

/** SQL Server connectivity option. */
export enum KnownConnectivityType {
  Local = "LOCAL",
  Private = "PRIVATE",
  Public = "PUBLIC",
}

/**
 * SQL Server connectivity option. \
 * {@link KnownConnectivityType} can be used interchangeably with ConnectivityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LOCAL** \
 * **PRIVATE** \
 * **PUBLIC**
 */
export type ConnectivityType = string;

/** Set workload type to optimize storage for SQL Server. */
export interface SqlWorkloadTypeUpdateSettings {
  /** SQL Server workload type. */
  sqlWorkloadType?: SqlWorkloadType;
}

export function sqlWorkloadTypeUpdateSettingsSerializer(item: SqlWorkloadTypeUpdateSettings): any {
  return { sqlWorkloadType: item["sqlWorkloadType"] };
}

export function sqlWorkloadTypeUpdateSettingsDeserializer(
  item: any,
): SqlWorkloadTypeUpdateSettings {
  return {
    sqlWorkloadType: item["sqlWorkloadType"],
  };
}

/** SQL Server workload type. */
export enum KnownSqlWorkloadType {
  General = "GENERAL",
  Oltp = "OLTP",
  DW = "DW",
}

/**
 * SQL Server workload type. \
 * {@link KnownSqlWorkloadType} can be used interchangeably with SqlWorkloadType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GENERAL** \
 * **OLTP** \
 * **DW**
 */
export type SqlWorkloadType = string;

/** Set disk storage settings for SQL Server. */
export interface SqlStorageUpdateSettings {
  /** Virtual machine disk count. */
  diskCount?: number;
  /** Device id of the first disk to be updated. */
  startingDeviceId?: number;
  /** Disk configuration to apply to SQL Server. */
  diskConfigurationType?: DiskConfigurationType;
}

export function sqlStorageUpdateSettingsSerializer(item: SqlStorageUpdateSettings): any {
  return {
    diskCount: item["diskCount"],
    startingDeviceId: item["startingDeviceId"],
    diskConfigurationType: item["diskConfigurationType"],
  };
}

export function sqlStorageUpdateSettingsDeserializer(item: any): SqlStorageUpdateSettings {
  return {
    diskCount: item["diskCount"],
    startingDeviceId: item["startingDeviceId"],
    diskConfigurationType: item["diskConfigurationType"],
  };
}

/** Disk configuration to apply to SQL Server. */
export enum KnownDiskConfigurationType {
  NEW = "NEW",
  Extend = "EXTEND",
  ADD = "ADD",
}

/**
 * Disk configuration to apply to SQL Server. \
 * {@link KnownDiskConfigurationType} can be used interchangeably with DiskConfigurationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NEW** \
 * **EXTEND** \
 * **ADD**
 */
export type DiskConfigurationType = string;

/** Additional SQL Server feature settings. */
export interface AdditionalFeaturesServerConfigurations {
  /** Enable or disable R services (SQL 2016 onwards). */
  isRServicesEnabled?: boolean;
}

export function additionalFeaturesServerConfigurationsSerializer(
  item: AdditionalFeaturesServerConfigurations,
): any {
  return { isRServicesEnabled: item["isRServicesEnabled"] };
}

export function additionalFeaturesServerConfigurationsDeserializer(
  item: any,
): AdditionalFeaturesServerConfigurations {
  return {
    isRServicesEnabled: item["isRServicesEnabled"],
  };
}

/** Set the server/instance-level settings for SQL Server. */
export interface SQLInstanceSettings {
  /** SQL Server Collation. */
  collation?: string;
  /** SQL Server MAXDOP. */
  maxDop?: number;
  /** SQL Server Optimize for Adhoc workloads. */
  isOptimizeForAdHocWorkloadsEnabled?: boolean;
  /** SQL Server minimum memory. */
  minServerMemoryMB?: number;
  /** SQL Server maximum memory. */
  maxServerMemoryMB?: number;
  /** SQL Server LPIM. */
  isLpimEnabled?: boolean;
  /** SQL Server IFI. */
  isIfiEnabled?: boolean;
}

export function sqlInstanceSettingsSerializer(item: SQLInstanceSettings): any {
  return {
    collation: item["collation"],
    maxDop: item["maxDop"],
    isOptimizeForAdHocWorkloadsEnabled: item["isOptimizeForAdHocWorkloadsEnabled"],
    minServerMemoryMB: item["minServerMemoryMB"],
    maxServerMemoryMB: item["maxServerMemoryMB"],
    isLpimEnabled: item["isLpimEnabled"],
    isIfiEnabled: item["isIfiEnabled"],
  };
}

export function sqlInstanceSettingsDeserializer(item: any): SQLInstanceSettings {
  return {
    collation: item["collation"],
    maxDop: item["maxDop"],
    isOptimizeForAdHocWorkloadsEnabled: item["isOptimizeForAdHocWorkloadsEnabled"],
    minServerMemoryMB: item["minServerMemoryMB"],
    maxServerMemoryMB: item["maxServerMemoryMB"],
    isLpimEnabled: item["isLpimEnabled"],
    isIfiEnabled: item["isIfiEnabled"],
  };
}

/** Enable AAD authentication for SQL VM. */
export interface AADAuthenticationSettings {
  /** The client Id of the Managed Identity to query Microsoft Graph API. An empty string must be used for the system assigned Managed Identity */
  clientId?: string;
}

export function aadAuthenticationSettingsSerializer(item: AADAuthenticationSettings): any {
  return { clientId: item["clientId"] };
}

export function aadAuthenticationSettingsDeserializer(item: any): AADAuthenticationSettings {
  return {
    clientId: item["clientId"],
  };
}

/** Storage Configurations for SQL Data, Log and TempDb. */
export interface StorageConfigurationSettings {
  /** SQL Server Data Storage Settings. */
  sqlDataSettings?: SQLStorageSettings;
  /** SQL Server Log Storage Settings. */
  sqlLogSettings?: SQLStorageSettings;
  /** SQL Server TempDb Storage Settings. */
  sqlTempDbSettings?: SQLTempDbSettings;
  /** SQL Server SystemDb Storage on DataPool if true. */
  sqlSystemDbOnDataDisk?: boolean;
  /** Disk configuration to apply to SQL Server. */
  diskConfigurationType?: DiskConfigurationType;
  /** Storage workload type. */
  storageWorkloadType?: StorageWorkloadType;
  /** Enable SQL IaaS Agent storage configuration blade in Azure Portal. */
  enableStorageConfigBlade?: boolean;
}

export function storageConfigurationSettingsSerializer(item: StorageConfigurationSettings): any {
  return {
    sqlDataSettings: !item["sqlDataSettings"]
      ? item["sqlDataSettings"]
      : sqlStorageSettingsSerializer(item["sqlDataSettings"]),
    sqlLogSettings: !item["sqlLogSettings"]
      ? item["sqlLogSettings"]
      : sqlStorageSettingsSerializer(item["sqlLogSettings"]),
    sqlTempDbSettings: !item["sqlTempDbSettings"]
      ? item["sqlTempDbSettings"]
      : sqlTempDbSettingsSerializer(item["sqlTempDbSettings"]),
    sqlSystemDbOnDataDisk: item["sqlSystemDbOnDataDisk"],
    diskConfigurationType: item["diskConfigurationType"],
    storageWorkloadType: item["storageWorkloadType"],
    enableStorageConfigBlade: item["enableStorageConfigBlade"],
  };
}

export function storageConfigurationSettingsDeserializer(item: any): StorageConfigurationSettings {
  return {
    sqlDataSettings: !item["sqlDataSettings"]
      ? item["sqlDataSettings"]
      : sqlStorageSettingsDeserializer(item["sqlDataSettings"]),
    sqlLogSettings: !item["sqlLogSettings"]
      ? item["sqlLogSettings"]
      : sqlStorageSettingsDeserializer(item["sqlLogSettings"]),
    sqlTempDbSettings: !item["sqlTempDbSettings"]
      ? item["sqlTempDbSettings"]
      : sqlTempDbSettingsDeserializer(item["sqlTempDbSettings"]),
    sqlSystemDbOnDataDisk: item["sqlSystemDbOnDataDisk"],
    diskConfigurationType: item["diskConfigurationType"],
    storageWorkloadType: item["storageWorkloadType"],
    enableStorageConfigBlade: item["enableStorageConfigBlade"],
  };
}

/** Set disk storage settings for SQL Server. */
export interface SQLStorageSettings {
  /** Logical Unit Numbers for the disks. */
  luns?: number[];
  /** SQL Server default file path */
  defaultFilePath?: string;
  /** Use storage pool to build a drive if true or not provided */
  useStoragePool?: boolean;
}

export function sqlStorageSettingsSerializer(item: SQLStorageSettings): any {
  return {
    luns: !item["luns"]
      ? item["luns"]
      : item["luns"].map((p: any) => {
          return p;
        }),
    defaultFilePath: item["defaultFilePath"],
    useStoragePool: item["useStoragePool"],
  };
}

export function sqlStorageSettingsDeserializer(item: any): SQLStorageSettings {
  return {
    luns: !item["luns"]
      ? item["luns"]
      : item["luns"].map((p: any) => {
          return p;
        }),
    defaultFilePath: item["defaultFilePath"],
    useStoragePool: item["useStoragePool"],
  };
}

/** Set tempDb storage settings for SQL Server. */
export interface SQLTempDbSettings {
  /** SQL Server tempdb data file size */
  dataFileSize?: number;
  /** SQL Server tempdb data file autoGrowth size */
  dataGrowth?: number;
  /** SQL Server tempdb log file size */
  logFileSize?: number;
  /** SQL Server tempdb log file autoGrowth size */
  logGrowth?: number;
  /** SQL Server tempdb data file count */
  dataFileCount?: number;
  /** SQL Server tempdb persist folder choice */
  persistFolder?: boolean;
  /** SQL Server tempdb persist folder location */
  persistFolderPath?: string;
  /** Logical Unit Numbers for the disks. */
  luns?: number[];
  /** SQL Server default file path */
  defaultFilePath?: string;
  /** Use storage pool to build a drive if true or not provided */
  useStoragePool?: boolean;
}

export function sqlTempDbSettingsSerializer(item: SQLTempDbSettings): any {
  return {
    dataFileSize: item["dataFileSize"],
    dataGrowth: item["dataGrowth"],
    logFileSize: item["logFileSize"],
    logGrowth: item["logGrowth"],
    dataFileCount: item["dataFileCount"],
    persistFolder: item["persistFolder"],
    persistFolderPath: item["persistFolderPath"],
    luns: !item["luns"]
      ? item["luns"]
      : item["luns"].map((p: any) => {
          return p;
        }),
    defaultFilePath: item["defaultFilePath"],
    useStoragePool: item["useStoragePool"],
  };
}

export function sqlTempDbSettingsDeserializer(item: any): SQLTempDbSettings {
  return {
    dataFileSize: item["dataFileSize"],
    dataGrowth: item["dataGrowth"],
    logFileSize: item["logFileSize"],
    logGrowth: item["logGrowth"],
    dataFileCount: item["dataFileCount"],
    persistFolder: item["persistFolder"],
    persistFolderPath: item["persistFolderPath"],
    luns: !item["luns"]
      ? item["luns"]
      : item["luns"].map((p: any) => {
          return p;
        }),
    defaultFilePath: item["defaultFilePath"],
    useStoragePool: item["useStoragePool"],
  };
}

/** Storage workload type. */
export enum KnownStorageWorkloadType {
  General = "GENERAL",
  Oltp = "OLTP",
  DW = "DW",
}

/**
 * Storage workload type. \
 * {@link KnownStorageWorkloadType} can be used interchangeably with StorageWorkloadType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GENERAL** \
 * **OLTP** \
 * **DW**
 */
export type StorageWorkloadType = string;

/** Status of last troubleshooting operation on this SQL VM */
export interface TroubleshootingStatus {
  /** Root cause of the issue */
  readonly rootCause?: string;
  /** Last troubleshooting trigger time in UTC timezone */
  readonly lastTriggerTimeUtc?: Date;
  /** Start time in UTC timezone. */
  readonly startTimeUtc?: Date;
  /** End time in UTC timezone. */
  readonly endTimeUtc?: Date;
  /** SQL VM troubleshooting scenario. */
  readonly troubleshootingScenario?: TroubleshootingScenario;
  /** Troubleshooting properties */
  readonly properties?: TroubleshootingAdditionalProperties;
}

export function troubleshootingStatusDeserializer(item: any): TroubleshootingStatus {
  return {
    rootCause: item["rootCause"],
    lastTriggerTimeUtc: !item["lastTriggerTimeUtc"]
      ? item["lastTriggerTimeUtc"]
      : new Date(item["lastTriggerTimeUtc"]),
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    troubleshootingScenario: item["troubleshootingScenario"],
    properties: !item["properties"]
      ? item["properties"]
      : troubleshootingAdditionalPropertiesDeserializer(item["properties"]),
  };
}

/** SQL VM troubleshooting scenario. */
export enum KnownTroubleshootingScenario {
  UnhealthyReplica = "UnhealthyReplica",
}

/**
 * SQL VM troubleshooting scenario. \
 * {@link KnownTroubleshootingScenario} can be used interchangeably with TroubleshootingScenario,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UnhealthyReplica**
 */
export type TroubleshootingScenario = string;

/** SQL VM Troubleshooting additional properties. */
export interface TroubleshootingAdditionalProperties {
  /** The unhealthy replica information */
  unhealthyReplicaInfo?: UnhealthyReplicaInfo;
}

export function troubleshootingAdditionalPropertiesSerializer(
  item: TroubleshootingAdditionalProperties,
): any {
  return {
    unhealthyReplicaInfo: !item["unhealthyReplicaInfo"]
      ? item["unhealthyReplicaInfo"]
      : unhealthyReplicaInfoSerializer(item["unhealthyReplicaInfo"]),
  };
}

export function troubleshootingAdditionalPropertiesDeserializer(
  item: any,
): TroubleshootingAdditionalProperties {
  return {
    unhealthyReplicaInfo: !item["unhealthyReplicaInfo"]
      ? item["unhealthyReplicaInfo"]
      : unhealthyReplicaInfoDeserializer(item["unhealthyReplicaInfo"]),
  };
}

/** SQL VM Troubleshoot UnhealthyReplica scenario information. */
export interface UnhealthyReplicaInfo {
  /** The name of the availability group */
  availabilityGroupName?: string;
}

export function unhealthyReplicaInfoSerializer(item: UnhealthyReplicaInfo): any {
  return { availabilityGroupName: item["availabilityGroupName"] };
}

export function unhealthyReplicaInfoDeserializer(item: any): UnhealthyReplicaInfo {
  return {
    availabilityGroupName: item["availabilityGroupName"],
  };
}

/** Configure SQL best practices Assessment for databases in your SQL virtual machine. */
export interface AssessmentSettings {
  /** Enable or disable SQL best practices Assessment feature on SQL virtual machine. */
  enable?: boolean;
  /** Run SQL best practices Assessment immediately on SQL virtual machine. */
  runImmediately?: boolean;
  /** Schedule for SQL best practices Assessment. */
  schedule?: Schedule;
}

export function assessmentSettingsSerializer(item: AssessmentSettings): any {
  return {
    enable: item["enable"],
    runImmediately: item["runImmediately"],
    schedule: !item["schedule"] ? item["schedule"] : scheduleSerializer(item["schedule"]),
  };
}

export function assessmentSettingsDeserializer(item: any): AssessmentSettings {
  return {
    enable: item["enable"],
    runImmediately: item["runImmediately"],
    schedule: !item["schedule"] ? item["schedule"] : scheduleDeserializer(item["schedule"]),
  };
}

/** Set assessment schedule for SQL Server. */
export interface Schedule {
  /** Enable or disable assessment schedule on SQL virtual machine. */
  enable?: boolean;
  /** Number of weeks to schedule between 2 assessment runs. Takes value from 1-6 */
  weeklyInterval?: number;
  /** Occurrence of the DayOfWeek day within a month to schedule assessment. Takes values: 1,2,3,4 and -1. Use -1 for last DayOfWeek day of the month */
  monthlyOccurrence?: number;
  /** Day of the week to run assessment. */
  dayOfWeek?: AssessmentDayOfWeek;
  /** Time of the day in HH:mm format. Eg. 17:30 */
  startTime?: string;
}

export function scheduleSerializer(item: Schedule): any {
  return {
    enable: item["enable"],
    weeklyInterval: item["weeklyInterval"],
    monthlyOccurrence: item["monthlyOccurrence"],
    dayOfWeek: item["dayOfWeek"],
    startTime: item["startTime"],
  };
}

export function scheduleDeserializer(item: any): Schedule {
  return {
    enable: item["enable"],
    weeklyInterval: item["weeklyInterval"],
    monthlyOccurrence: item["monthlyOccurrence"],
    dayOfWeek: item["dayOfWeek"],
    startTime: item["startTime"],
  };
}

/** Day of the week to run assessment. */
export type AssessmentDayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

/** Additional VM Patching solution enabled on the Virtual Machine */
export enum KnownAdditionalOsPatch {
  WU = "WU",
  Wumu = "WUMU",
  Wsus = "WSUS",
}

/**
 * Additional VM Patching solution enabled on the Virtual Machine \
 * {@link KnownAdditionalOsPatch} can be used interchangeably with AdditionalOsPatch,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WU** \
 * **WUMU** \
 * **WSUS**
 */
export type AdditionalOsPatch = string;

/** Virtual Machine Identity details used for Sql IaaS extension configurations. */
export interface VirtualMachineIdentity {
  /** Identity type of the virtual machine. Specify None to opt-out of Managed Identities. */
  type?: VmIdentityType;
  /** ARM Resource Id of the identity. Only required when UserAssigned identity is selected. */
  resourceId?: string;
}

export function virtualMachineIdentitySerializer(item: VirtualMachineIdentity): any {
  return { type: item["type"], resourceId: item["resourceId"] };
}

export function virtualMachineIdentityDeserializer(item: any): VirtualMachineIdentity {
  return {
    type: item["type"],
    resourceId: item["resourceId"],
  };
}

/** Identity type of the virtual machine. Specify None to opt-out of Managed Identities. */
export enum KnownVmIdentityType {
  None = "None",
  SystemAssigned = "SystemAssigned",
  UserAssigned = "UserAssigned",
}

/**
 * Identity type of the virtual machine. Specify None to opt-out of Managed Identities. \
 * {@link KnownVmIdentityType} can be used interchangeably with VmIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **SystemAssigned** \
 * **UserAssigned**
 */
export type VmIdentityType = string;
/** Operating System of the current SQL Virtual Machine. */
export type OsType = "Windows" | "Linux";

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

/** An update to a SQL virtual machine. */
export interface SqlVirtualMachineUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function sqlVirtualMachineUpdateSerializer(item: SqlVirtualMachineUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a SqlVirtualMachine list operation. */
export interface _SqlVirtualMachineListResult {
  /** The SqlVirtualMachine items on this page */
  readonly value: SqlVirtualMachine[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _sqlVirtualMachineListResultDeserializer(item: any): _SqlVirtualMachineListResult {
  return {
    value: sqlVirtualMachineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlVirtualMachineArraySerializer(result: Array<SqlVirtualMachine>): any[] {
  return result.map((item) => {
    return sqlVirtualMachineSerializer(item);
  });
}

export function sqlVirtualMachineArrayDeserializer(result: Array<SqlVirtualMachine>): any[] {
  return result.map((item) => {
    return sqlVirtualMachineDeserializer(item);
  });
}

/** Configure disk config assessment for databases in your SQL virtual machine. */
export interface DiskConfigAssessmentRequest {
  /** Boolean to run disk config Assessment. Use false to fetch past Assessment. */
  runDiskConfigRules?: boolean;
}

export function diskConfigAssessmentRequestSerializer(item: DiskConfigAssessmentRequest): any {
  return { runDiskConfigRules: item["runDiskConfigRules"] };
}

/** A SQL virtual machine group. */
export interface SqlVirtualMachineGroup extends TrackedResource {
  /** Resource properties. */
  properties?: SqlVirtualMachineGroupProperties;
}

export function sqlVirtualMachineGroupSerializer(item: SqlVirtualMachineGroup): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : sqlVirtualMachineGroupPropertiesSerializer(item["properties"]),
  };
}

export function sqlVirtualMachineGroupDeserializer(item: any): SqlVirtualMachineGroup {
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
      : sqlVirtualMachineGroupPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a SQL virtual machine group. */
export interface SqlVirtualMachineGroupProperties {
  /** Provisioning state to track the async operation status. */
  readonly provisioningState?: string;
  /** SQL image offer. Examples may include SQL2016-WS2016, SQL2017-WS2016. */
  sqlImageOffer?: string;
  /** SQL image sku. */
  sqlImageSku?: SqlVmGroupImageSku;
  /** Scale type. */
  readonly scaleType?: ScaleType;
  /** Type of cluster manager: Windows Server Failover Cluster (WSFC), implied by the scale type of the group and the OS type. */
  readonly clusterManagerType?: ClusterManagerType;
  /** Cluster type. */
  readonly clusterConfiguration?: ClusterConfiguration;
  /** Cluster Active Directory domain profile. */
  wsfcDomainProfile?: WsfcDomainProfile;
}

export function sqlVirtualMachineGroupPropertiesSerializer(
  item: SqlVirtualMachineGroupProperties,
): any {
  return {
    sqlImageOffer: item["sqlImageOffer"],
    sqlImageSku: item["sqlImageSku"],
    wsfcDomainProfile: !item["wsfcDomainProfile"]
      ? item["wsfcDomainProfile"]
      : wsfcDomainProfileSerializer(item["wsfcDomainProfile"]),
  };
}

export function sqlVirtualMachineGroupPropertiesDeserializer(
  item: any,
): SqlVirtualMachineGroupProperties {
  return {
    provisioningState: item["provisioningState"],
    sqlImageOffer: item["sqlImageOffer"],
    sqlImageSku: item["sqlImageSku"],
    scaleType: item["scaleType"],
    clusterManagerType: item["clusterManagerType"],
    clusterConfiguration: item["clusterConfiguration"],
    wsfcDomainProfile: !item["wsfcDomainProfile"]
      ? item["wsfcDomainProfile"]
      : wsfcDomainProfileDeserializer(item["wsfcDomainProfile"]),
  };
}

/** SQL image sku. */
export enum KnownSqlVmGroupImageSku {
  Developer = "Developer",
  Enterprise = "Enterprise",
}

/**
 * SQL image sku. \
 * {@link KnownSqlVmGroupImageSku} can be used interchangeably with SqlVmGroupImageSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Developer** \
 * **Enterprise**
 */
export type SqlVmGroupImageSku = string;

/** Scale type. */
export enum KnownScaleType {
  HA = "HA",
}

/**
 * Scale type. \
 * {@link KnownScaleType} can be used interchangeably with ScaleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HA**
 */
export type ScaleType = string;

/** Type of cluster manager: Windows Server Failover Cluster (WSFC), implied by the scale type of the group and the OS type. */
export enum KnownClusterManagerType {
  Wsfc = "WSFC",
}

/**
 * Type of cluster manager: Windows Server Failover Cluster (WSFC), implied by the scale type of the group and the OS type. \
 * {@link KnownClusterManagerType} can be used interchangeably with ClusterManagerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WSFC**
 */
export type ClusterManagerType = string;

/** Cluster type. */
export enum KnownClusterConfiguration {
  Domainful = "Domainful",
}

/**
 * Cluster type. \
 * {@link KnownClusterConfiguration} can be used interchangeably with ClusterConfiguration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Domainful**
 */
export type ClusterConfiguration = string;

/** Active Directory account details to operate Windows Server Failover Cluster. */
export interface WsfcDomainProfile {
  /** Fully qualified name of the domain. */
  domainFqdn?: string;
  /** Organizational Unit path in which the nodes and cluster will be present. */
  ouPath?: string;
  /** Account name used for creating cluster (at minimum needs permissions to 'Create Computer Objects' in domain). */
  clusterBootstrapAccount?: string;
  /** Account name used for operating cluster i.e. will be part of administrators group on all the participating virtual machines in the cluster. */
  clusterOperatorAccount?: string;
  /** Account name under which SQL service will run on all participating SQL virtual machines in the cluster. */
  sqlServiceAccount?: string;
  /** The flag to check if SQL service account is GMSA. */
  isSqlServiceAccountGmsa?: boolean;
  /** Optional path for fileshare witness. */
  fileShareWitnessPath?: string;
  /** Fully qualified ARM resource id of the witness storage account. */
  storageAccountUrl?: string;
  /** Primary key of the witness storage account. */
  storageAccountPrimaryKey?: string;
  /** Cluster subnet type. */
  clusterSubnetType?: ClusterSubnetType;
}

export function wsfcDomainProfileSerializer(item: WsfcDomainProfile): any {
  return {
    domainFqdn: item["domainFqdn"],
    ouPath: item["ouPath"],
    clusterBootstrapAccount: item["clusterBootstrapAccount"],
    clusterOperatorAccount: item["clusterOperatorAccount"],
    sqlServiceAccount: item["sqlServiceAccount"],
    isSqlServiceAccountGmsa: item["isSqlServiceAccountGmsa"],
    fileShareWitnessPath: item["fileShareWitnessPath"],
    storageAccountUrl: item["storageAccountUrl"],
    storageAccountPrimaryKey: item["storageAccountPrimaryKey"],
    clusterSubnetType: item["clusterSubnetType"],
  };
}

export function wsfcDomainProfileDeserializer(item: any): WsfcDomainProfile {
  return {
    domainFqdn: item["domainFqdn"],
    ouPath: item["ouPath"],
    clusterBootstrapAccount: item["clusterBootstrapAccount"],
    clusterOperatorAccount: item["clusterOperatorAccount"],
    sqlServiceAccount: item["sqlServiceAccount"],
    isSqlServiceAccountGmsa: item["isSqlServiceAccountGmsa"],
    fileShareWitnessPath: item["fileShareWitnessPath"],
    storageAccountUrl: item["storageAccountUrl"],
    storageAccountPrimaryKey: item["storageAccountPrimaryKey"],
    clusterSubnetType: item["clusterSubnetType"],
  };
}

/** Cluster subnet type. */
export enum KnownClusterSubnetType {
  SingleSubnet = "SingleSubnet",
  MultiSubnet = "MultiSubnet",
}

/**
 * Cluster subnet type. \
 * {@link KnownClusterSubnetType} can be used interchangeably with ClusterSubnetType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SingleSubnet** \
 * **MultiSubnet**
 */
export type ClusterSubnetType = string;

/** An update to a SQL virtual machine group. */
export interface SqlVirtualMachineGroupUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function sqlVirtualMachineGroupUpdateSerializer(item: SqlVirtualMachineGroupUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a SqlVirtualMachineGroup list operation. */
export interface _SqlVirtualMachineGroupListResult {
  /** The SqlVirtualMachineGroup items on this page */
  readonly value: SqlVirtualMachineGroup[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

export function _sqlVirtualMachineGroupListResultDeserializer(
  item: any,
): _SqlVirtualMachineGroupListResult {
  return {
    value: sqlVirtualMachineGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sqlVirtualMachineGroupArraySerializer(
  result: Array<SqlVirtualMachineGroup>,
): any[] {
  return result.map((item) => {
    return sqlVirtualMachineGroupSerializer(item);
  });
}

export function sqlVirtualMachineGroupArrayDeserializer(
  result: Array<SqlVirtualMachineGroup>,
): any[] {
  return result.map((item) => {
    return sqlVirtualMachineGroupDeserializer(item);
  });
}

/** Details required for SQL VM troubleshooting */
export interface SqlVmTroubleshooting {
  /** Start time in UTC timezone. */
  startTimeUtc?: Date;
  /** End time in UTC timezone. */
  endTimeUtc?: Date;
  /** SQL VM troubleshooting scenario. */
  troubleshootingScenario?: TroubleshootingScenario;
  /** Troubleshooting properties */
  properties?: TroubleshootingAdditionalProperties;
  /** Virtual machine resource id for response. */
  readonly virtualMachineResourceId?: string;
}

export function sqlVmTroubleshootingSerializer(item: SqlVmTroubleshooting): any {
  return {
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : item["startTimeUtc"].toISOString(),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : item["endTimeUtc"].toISOString(),
    troubleshootingScenario: item["troubleshootingScenario"],
    properties: !item["properties"]
      ? item["properties"]
      : troubleshootingAdditionalPropertiesSerializer(item["properties"]),
  };
}

export function sqlVmTroubleshootingDeserializer(item: any): SqlVmTroubleshooting {
  return {
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    troubleshootingScenario: item["troubleshootingScenario"],
    properties: !item["properties"]
      ? item["properties"]
      : troubleshootingAdditionalPropertiesDeserializer(item["properties"]),
    virtualMachineResourceId: item["virtualMachineResourceId"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-10-01 API version. */
  V20231001 = "2023-10-01",
}
