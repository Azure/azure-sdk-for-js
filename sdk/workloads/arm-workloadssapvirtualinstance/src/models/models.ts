// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../helpers/serializerHelpers.js";

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
  User = "user",
  /** system */
  System = "system",
  /** user,system */
  UserSystem = "user,system",
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

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
  };
}

/** Define the SAP Application Server Instance resource. */
export interface SAPApplicationServerInstance extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SAPApplicationServerProperties;
}

export function sAPApplicationServerInstanceSerializer(
  item: SAPApplicationServerInstance,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
    properties: !item.properties
      ? item.properties
      : sAPApplicationServerPropertiesSerializer(item.properties),
  };
}

/** Defines the SAP Application Server instance properties. */
export interface SAPApplicationServerProperties {
  /** Application server Instance Number. */
  readonly instanceNo?: string;
  /** Application server Subnet. */
  readonly subnet?: string;
  /** Application server instance SAP hostname. */
  readonly hostname?: string;
  /** Application server instance SAP Kernel Version. */
  readonly kernelVersion?: string;
  /** Application server instance SAP Kernel Patch level. */
  readonly kernelPatch?: string;
  /** Application server instance SAP IP Address. */
  readonly ipAddress?: string;
  /** Application server instance gateway Port. */
  readonly gatewayPort?: number;
  /** Application server instance ICM HTTP Port. */
  readonly icmHttpPort?: number;
  /** Application server instance ICM HTTPS Port. */
  readonly icmHttpsPort?: number;
  /** Application server instance dispatcher status. */
  readonly dispatcherStatus?: string;
  /** The Load Balancer details such as LoadBalancer ID attached to Application Server Virtual Machines */
  readonly loadBalancerDetails?: LoadBalancerDetails;
  /** The list of virtual machines. */
  readonly vmDetails?: ApplicationServerVmDetails[];
  /** Defines the SAP Instance status. */
  readonly status?: SAPVirtualInstanceStatus;
  /** Defines the health of SAP Instances. */
  readonly health?: SAPHealthState;
  /** Defines the provisioning states. */
  readonly provisioningState?: SapVirtualInstanceProvisioningState;
  /** Defines the Application Instance errors. */
  readonly errors?: SAPVirtualInstanceError;
}

export function sAPApplicationServerPropertiesSerializer(item: SAPApplicationServerProperties) {
  return item as any;
}

/** The Load Balancer details such as Load Balancer ID. */
export interface LoadBalancerDetails {
  /** Fully qualified resource ID for the load balancer. */
  readonly id?: string;
}

/** The Application Server VM Details. */
export interface ApplicationServerVmDetails {
  /** Defines the type of application server VM. */
  readonly type?: ApplicationServerVirtualMachineType;
  /** The virtual machine id. */
  readonly virtualMachineId?: string;
  /** Storage details of all the Storage Accounts attached to the App Virtual Machine. For e.g. NFS on AFS Shared Storage. */
  readonly storageDetails?: StorageInformation[];
}

/** Known values of {@link ApplicationServerVirtualMachineType} that the service accepts. */
export enum KnownApplicationServerVirtualMachineType {
  /** Active */
  Active = "Active",
  /** Standby */
  Standby = "Standby",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Defines the type of application server VM. \
 * {@link KnownApplicationServerVirtualMachineType} can be used interchangeably with ApplicationServerVirtualMachineType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active** \
 * **Standby** \
 * **Unknown**
 */
export type ApplicationServerVirtualMachineType = string;

/** Storage details of all the Storage accounts attached to the VM. For e.g. NFS on AFS Shared Storage. */
export interface StorageInformation {
  /** Fully qualified resource ID for the storage account. */
  readonly id?: string;
}

/** Known values of {@link SAPVirtualInstanceStatus} that the service accepts. */
export enum KnownSAPVirtualInstanceStatus {
  /** Starting */
  Starting = "Starting",
  /** Running */
  Running = "Running",
  /** Stopping */
  Stopping = "Stopping",
  /** Offline */
  Offline = "Offline",
  /** PartiallyRunning */
  PartiallyRunning = "PartiallyRunning",
  /** Unavailable */
  Unavailable = "Unavailable",
  /** SoftShutdown */
  SoftShutdown = "SoftShutdown",
}

/**
 * Defines the SAP Instance status. \
 * {@link KnownSAPVirtualInstanceStatus} can be used interchangeably with SAPVirtualInstanceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Starting** \
 * **Running** \
 * **Stopping** \
 * **Offline** \
 * **PartiallyRunning** \
 * **Unavailable** \
 * **SoftShutdown**
 */
export type SAPVirtualInstanceStatus = string;

/** Known values of {@link SAPHealthState} that the service accepts. */
export enum KnownSAPHealthState {
  /** Unknown */
  Unknown = "Unknown",
  /** Healthy */
  Healthy = "Healthy",
  /** Unhealthy */
  Unhealthy = "Unhealthy",
  /** Degraded */
  Degraded = "Degraded",
}

/**
 * Defines the health of SAP Instances. \
 * {@link KnownSAPHealthState} can be used interchangeably with SAPHealthState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Healthy** \
 * **Unhealthy** \
 * **Degraded**
 */
export type SAPHealthState = string;

/** Known values of {@link SapVirtualInstanceProvisioningState} that the service accepts. */
export enum KnownSapVirtualInstanceProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Updating */
  Updating = "Updating",
  /** Creating */
  Creating = "Creating",
  /** Failed */
  Failed = "Failed",
  /** Deleting */
  Deleting = "Deleting",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Defines the provisioning states. \
 * {@link KnownSapVirtualInstanceProvisioningState} can be used interchangeably with SapVirtualInstanceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Updating** \
 * **Creating** \
 * **Failed** \
 * **Deleting** \
 * **Canceled**
 */
export type SapVirtualInstanceProvisioningState = string;

/** An error response from the Virtual Instance for SAP Workload service. */
export interface SAPVirtualInstanceError {
  /** The Virtual Instance for SAP error body. */
  properties?: ErrorDefinition;
}

/** Error definition. */
export interface ErrorDefinition {
  /** Service specific error code which serves as the substatus for the HTTP error code. */
  readonly code?: string;
  /** Description of the error. */
  readonly message?: string;
  /** Internal error details. */
  readonly details?: ErrorDefinition[];
}

/** Defines the request body for updating SAP Application Instance. */
export interface UpdateSAPApplicationInstanceRequest {
  /** Gets or sets the Resource tags. */
  tags?: Record<string, string>;
}

export function updateSAPApplicationInstanceRequestSerializer(
  item: UpdateSAPApplicationInstanceRequest,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
  };
}

/** The response of a SAPApplicationServerInstance list operation. */
export interface _SAPApplicationServerInstanceListResult {
  /** The SAPApplicationServerInstance items on this page */
  value: SAPApplicationServerInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Start SAP instance(s) request body. */
export interface StartRequest {
  /** The boolean value indicates whether to start the virtual machines before starting the SAP instances. */
  startVm?: boolean;
}

export function startRequestSerializer(item: StartRequest): Record<string, unknown> {
  return {
    startVm: item["startVm"],
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
}

/** Stop SAP instance(s) request body. */
export interface StopRequest {
  /** This parameter defines how long (in seconds) the soft shutdown waits until the RFC/HTTP clients no longer consider the server for calls with load balancing. Value 0 means that the kernel does not wait, but goes directly into the next shutdown state, i.e. hard stop. */
  softStopTimeoutSeconds?: number;
  /** The boolean value indicates whether to Stop and deallocate the virtual machines along with the SAP instances. */
  deallocateVm?: boolean;
}

export function stopRequestSerializer(item: StopRequest): Record<string, unknown> {
  return {
    softStopTimeoutSeconds: item["softStopTimeoutSeconds"],
    deallocateVm: item["deallocateVm"],
  };
}

/** Define the Database resource. */
export interface SAPDatabaseInstance extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SAPDatabaseProperties;
}

export function sAPDatabaseInstanceSerializer(item: SAPDatabaseInstance): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
    properties: !item.properties
      ? item.properties
      : sAPDatabasePropertiesSerializer(item.properties),
  };
}

/** Defines the Database properties. */
export interface SAPDatabaseProperties {
  /** Database subnet. */
  readonly subnet?: string;
  /** Database SID name. */
  readonly databaseSid?: string;
  /** Database type, that is if the DB is HANA, DB2, Oracle, SAP ASE, Max DB or MS SQL Server. */
  readonly databaseType?: string;
  /** Database IP Address. */
  readonly ipAddress?: string;
  /** The Load Balancer details such as LoadBalancer ID attached to Database Virtual Machines */
  readonly loadBalancerDetails?: LoadBalancerDetails;
  /** The list of virtual machines corresponding to the Database resource. */
  readonly vmDetails?: DatabaseVmDetails[];
  /** Defines the SAP Instance status. */
  readonly status?: SAPVirtualInstanceStatus;
  /** Defines the provisioning states. */
  readonly provisioningState?: SapVirtualInstanceProvisioningState;
  /** Defines the errors related to Database resource. */
  readonly errors?: SAPVirtualInstanceError;
}

export function sAPDatabasePropertiesSerializer(item: SAPDatabaseProperties) {
  return item as any;
}

/** Database VM details. */
export interface DatabaseVmDetails {
  /** The virtual machine id. */
  readonly virtualMachineId?: string;
  /** Defines the SAP Instance status. */
  readonly status?: SAPVirtualInstanceStatus;
  /** Storage details of all the Storage Accounts attached to the Database Virtual Machine. For e.g. NFS on AFS Shared Storage. */
  readonly storageDetails?: StorageInformation[];
}

/** Defines the request body for updating SAP Database Instance. */
export interface UpdateSAPDatabaseInstanceRequest {
  /** Gets or sets the Resource tags. */
  tags?: Record<string, string>;
}

export function updateSAPDatabaseInstanceRequestSerializer(
  item: UpdateSAPDatabaseInstanceRequest,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
  };
}

/** The response of a SAPDatabaseInstance list operation. */
export interface _SAPDatabaseInstanceListResult {
  /** The SAPDatabaseInstance items on this page */
  value: SAPDatabaseInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Define the SAP Central Services Instance resource. */
export interface SAPCentralServerInstance extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SAPCentralServerProperties;
}

export function sAPCentralServerInstanceSerializer(
  item: SAPCentralServerInstance,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
    properties: !item.properties
      ? item.properties
      : sAPCentralServerPropertiesSerializer(item.properties),
  };
}

/** Defines the SAP Central Services Instance properties. */
export interface SAPCentralServerProperties {
  /** The central services instance number. */
  readonly instanceNo?: string;
  /** The central services instance subnet. */
  readonly subnet?: string;
  /** Defines the SAP message server properties. */
  messageServerProperties?: MessageServerProperties;
  /** Defines the SAP Enqueue Server properties. */
  enqueueServerProperties?: EnqueueServerProperties;
  /** Defines the SAP Gateway Server properties. */
  gatewayServerProperties?: GatewayServerProperties;
  /** Defines the SAP Enqueue Replication Server (ERS) properties. */
  enqueueReplicationServerProperties?: EnqueueReplicationServerProperties;
  /** The central services instance Kernel Version. */
  readonly kernelVersion?: string;
  /** The central services instance Kernel Patch level. */
  readonly kernelPatch?: string;
  /** The Load Balancer details such as LoadBalancer ID attached to ASCS Virtual Machines */
  readonly loadBalancerDetails?: LoadBalancerDetails;
  /** The list of virtual machines corresponding to the Central Services instance. */
  readonly vmDetails?: CentralServerVmDetails[];
  /** Defines the SAP Instance status. */
  readonly status?: SAPVirtualInstanceStatus;
  /** Defines the health of SAP Instances. */
  readonly health?: SAPHealthState;
  /** Defines the provisioning states. */
  readonly provisioningState?: SapVirtualInstanceProvisioningState;
  /** Defines the errors related to SAP Central Services Instance resource. */
  readonly errors?: SAPVirtualInstanceError;
}

export function sAPCentralServerPropertiesSerializer(
  item: SAPCentralServerProperties,
): Record<string, unknown> {
  return {
    messageServerProperties: !item.messageServerProperties
      ? item.messageServerProperties
      : messageServerPropertiesSerializer(item.messageServerProperties),
    enqueueServerProperties: !item.enqueueServerProperties
      ? item.enqueueServerProperties
      : enqueueServerPropertiesSerializer(item.enqueueServerProperties),
    gatewayServerProperties: !item.gatewayServerProperties
      ? item.gatewayServerProperties
      : gatewayServerPropertiesSerializer(item.gatewayServerProperties),
    enqueueReplicationServerProperties: !item.enqueueReplicationServerProperties
      ? item.enqueueReplicationServerProperties
      : enqueueReplicationServerPropertiesSerializer(item.enqueueReplicationServerProperties),
  };
}

/** Defines the SAP message server properties. */
export interface MessageServerProperties {
  /** message server port. */
  readonly msPort?: number;
  /** message server internal MS port. */
  readonly internalMsPort?: number;
  /** message server HTTP Port. */
  readonly httpPort?: number;
  /** message server HTTPS Port. */
  readonly httpsPort?: number;
  /** message server SAP Hostname. */
  readonly hostname?: string;
  /** message server IP Address. */
  readonly ipAddress?: string;
  /** Defines the health of SAP Instances. */
  readonly health?: SAPHealthState;
}

export function messageServerPropertiesSerializer(item: MessageServerProperties) {
  return item as any;
}

/** Defines the SAP Enqueue Server properties. */
export interface EnqueueServerProperties {
  /** Enqueue Server SAP Hostname. */
  readonly hostname?: string;
  /** Enqueue Server SAP IP Address. */
  readonly ipAddress?: string;
  /** Enqueue Server Port. */
  readonly port?: number;
  /** Defines the health of SAP Instances. */
  readonly health?: SAPHealthState;
}

export function enqueueServerPropertiesSerializer(item: EnqueueServerProperties) {
  return item as any;
}

/** Defines the SAP Gateway Server properties. */
export interface GatewayServerProperties {
  /** Gateway Port. */
  readonly port?: number;
  /** Defines the health of SAP Instances. */
  readonly health?: SAPHealthState;
}

export function gatewayServerPropertiesSerializer(item: GatewayServerProperties) {
  return item as any;
}

/** Defines the SAP Enqueue Replication Server (ERS) properties. */
export interface EnqueueReplicationServerProperties {
  /** Defines the type of Enqueue Replication Server. */
  readonly ersVersion?: EnqueueReplicationServerType;
  /** ERS Instance Number. */
  readonly instanceNo?: string;
  /** ERS SAP Hostname. */
  readonly hostname?: string;
  /** ERS SAP Kernel Version. */
  readonly kernelVersion?: string;
  /** ERS SAP Kernel Patch level. */
  readonly kernelPatch?: string;
  /** ERS SAP IP Address. */
  readonly ipAddress?: string;
  /** Defines the health of SAP Instances. */
  readonly health?: SAPHealthState;
}

export function enqueueReplicationServerPropertiesSerializer(
  item: EnqueueReplicationServerProperties,
) {
  return item as any;
}

/** Known values of {@link EnqueueReplicationServerType} that the service accepts. */
export enum KnownEnqueueReplicationServerType {
  /** EnqueueReplicator1 */
  EnqueueReplicator1 = "EnqueueReplicator1",
  /** EnqueueReplicator2 */
  EnqueueReplicator2 = "EnqueueReplicator2",
}

/**
 * Defines the type of Enqueue Replication Server. \
 * {@link KnownEnqueueReplicationServerType} can be used interchangeably with EnqueueReplicationServerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EnqueueReplicator1** \
 * **EnqueueReplicator2**
 */
export type EnqueueReplicationServerType = string;

/** The SAP Central Services Instance VM details. */
export interface CentralServerVmDetails {
  /** Defines the type of central server VM. */
  readonly type?: CentralServerVirtualMachineType;
  /** The virtual machine id. */
  readonly virtualMachineId?: string;
  /** Storage details of all the Storage Accounts attached to the ASCS Virtual Machine. For e.g. NFS on AFS Shared Storage. */
  readonly storageDetails?: StorageInformation[];
}

/** Known values of {@link CentralServerVirtualMachineType} that the service accepts. */
export enum KnownCentralServerVirtualMachineType {
  /** Primary */
  Primary = "Primary",
  /** Secondary */
  Secondary = "Secondary",
  /** Unknown */
  Unknown = "Unknown",
  /** ASCS */
  ASCS = "ASCS",
  /** ERSInactive */
  ERSInactive = "ERSInactive",
  /** ERS */
  ERS = "ERS",
  /** Standby */
  Standby = "Standby",
}

/**
 * Defines the type of central server VM. \
 * {@link KnownCentralServerVirtualMachineType} can be used interchangeably with CentralServerVirtualMachineType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary** \
 * **Secondary** \
 * **Unknown** \
 * **ASCS** \
 * **ERSInactive** \
 * **ERS** \
 * **Standby**
 */
export type CentralServerVirtualMachineType = string;

/** Defines the request body for updating SAP Central Instance. */
export interface UpdateSAPCentralInstanceRequest {
  /** Gets or sets the Resource tags. */
  tags?: Record<string, string>;
}

export function updateSAPCentralInstanceRequestSerializer(
  item: UpdateSAPCentralInstanceRequest,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
  };
}

/** The response of a SAPCentralServerInstance list operation. */
export interface _SAPCentralServerInstanceListResult {
  /** The SAPCentralServerInstance items on this page */
  value: SAPCentralServerInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Define the Virtual Instance for SAP solutions resource. */
export interface SAPVirtualInstance extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SAPVirtualInstanceProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function sAPVirtualInstanceSerializer(item: SAPVirtualInstance): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
    properties: !item.properties
      ? item.properties
      : sAPVirtualInstancePropertiesSerializer(item.properties),
    identity: !item.identity ? item.identity : managedServiceIdentitySerializer(item.identity),
  };
}

/** Defines the Virtual Instance for SAP solutions resource properties. */
export interface SAPVirtualInstanceProperties {
  /** Defines the environment type - Production/Non Production. */
  environment: SAPEnvironmentType;
  /** Defines the SAP Product type. */
  sapProduct: SAPProductType;
  /** Specifies the network access configuration for the resources that will be deployed in the Managed Resource Group. The options to choose from are Public and Private. If 'Private' is chosen, the Storage Account service tag should be enabled on the subnets in which the SAP VMs exist. This is required for establishing connectivity between VM extensions and the managed resource group storage account. This setting is currently applicable only to Storage Account. Learn more here https://go.microsoft.com/fwlink/?linkid=2247228 */
  managedResourcesNetworkAccessType?: ManagedResourcesNetworkAccessType;
  /** Defines if the SAP system is being created using Azure Center for SAP solutions (ACSS) or if an existing SAP system is being registered with ACSS */
  configuration: SAPConfigurationUnion;
  /** Managed resource group configuration */
  managedResourceGroupConfiguration?: ManagedRGConfiguration;
  /** Defines the SAP Instance status. */
  readonly status?: SAPVirtualInstanceStatus;
  /** Defines the health of SAP Instances. */
  readonly health?: SAPHealthState;
  /** Defines the Virtual Instance for SAP state. */
  readonly state?: SAPVirtualInstanceState;
  /** Defines the provisioning states. */
  readonly provisioningState?: SapVirtualInstanceProvisioningState;
  /** Indicates any errors on the Virtual Instance for SAP solutions resource. */
  readonly errors?: SAPVirtualInstanceError;
}

export function sAPVirtualInstancePropertiesSerializer(
  item: SAPVirtualInstanceProperties,
): Record<string, unknown> {
  return {
    environment: item["environment"],
    sapProduct: item["sapProduct"],
    managedResourcesNetworkAccessType: item["managedResourcesNetworkAccessType"],
    configuration: sAPConfigurationUnionSerializer(item.configuration),
    managedResourceGroupConfiguration: !item.managedResourceGroupConfiguration
      ? item.managedResourceGroupConfiguration
      : managedRGConfigurationSerializer(item.managedResourceGroupConfiguration),
  };
}

/** Known values of {@link SAPEnvironmentType} that the service accepts. */
export enum KnownSAPEnvironmentType {
  /** NonProd */
  NonProd = "NonProd",
  /** Prod */
  Prod = "Prod",
}

/**
 * Defines the environment type - Production/Non Production. \
 * {@link KnownSAPEnvironmentType} can be used interchangeably with SAPEnvironmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NonProd** \
 * **Prod**
 */
export type SAPEnvironmentType = string;

/** Known values of {@link SAPProductType} that the service accepts. */
export enum KnownSAPProductType {
  /** ECC */
  ECC = "ECC",
  /** S4HANA */
  S4HANA = "S4HANA",
  /** Other */
  Other = "Other",
}

/**
 * Defines the SAP Product type. \
 * {@link KnownSAPProductType} can be used interchangeably with SAPProductType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ECC** \
 * **S4HANA** \
 * **Other**
 */
export type SAPProductType = string;

/** Known values of {@link ManagedResourcesNetworkAccessType} that the service accepts. */
export enum KnownManagedResourcesNetworkAccessType {
  /** Public */
  Public = "Public",
  /** Private */
  Private = "Private",
}

/**
 * Defines the network access type for managed resources. \
 * {@link KnownManagedResourcesNetworkAccessType} can be used interchangeably with ManagedResourcesNetworkAccessType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public** \
 * **Private**
 */
export type ManagedResourcesNetworkAccessType = string;

/** The SAP Configuration. */
export interface SAPConfiguration {
  /** the discriminator possible values: Discovery, Deployment, DeploymentWithOSConfig */
  configurationType: SAPConfigurationType;
}

export function sAPConfigurationUnionSerializer(item: SAPConfigurationUnion) {
  switch (item.configurationType) {
    case "Discovery":
      return discoveryConfigurationSerializer(item as DiscoveryConfiguration);

    case "Deployment":
      return deploymentConfigurationSerializer(item as DeploymentConfiguration);

    case "DeploymentWithOSConfig":
      return deploymentWithOSConfigurationSerializer(item as DeploymentWithOSConfiguration);

    default:
      return sAPConfigurationSerializer(item);
  }
}

export function sAPConfigurationSerializer(item: SAPConfigurationUnion): Record<string, unknown> {
  return {
    configurationType: item["configurationType"],
  };
}

/** Discovery Details. */
export interface DiscoveryConfiguration extends SAPConfiguration {
  /** The virtual machine ID of the Central Server. */
  centralServerVmId?: string;
  /** The custom storage account name for the storage account created by the service in the managed resource group created as part of VIS deployment.<br><br>Refer to the storage account naming rules [here](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftstorage).<br><br>If not provided, the service will create the storage account with a random name. */
  managedRgStorageAccountName?: string;
  /** The geo-location where the SAP system exists. */
  readonly appLocation?: string;
  /** The configuration Type. */
  configurationType: "Discovery";
}

export function discoveryConfigurationSerializer(
  item: DiscoveryConfiguration,
): Record<string, unknown> {
  return {
    configurationType: item["configurationType"],
    centralServerVmId: item["centralServerVmId"],
    managedRgStorageAccountName: item["managedRgStorageAccountName"],
  };
}

/** Deployment Configuration. */
export interface DeploymentConfiguration extends SAPConfiguration {
  /** The geo-location where the SAP system is to be created. */
  appLocation?: string;
  /** The infrastructure configuration. */
  infrastructureConfiguration?: InfrastructureConfigurationUnion;
  /** The software configuration. */
  softwareConfiguration?: SoftwareConfigurationUnion;
  /** The deployment configuration Type. */
  configurationType: "Deployment";
}

export function deploymentConfigurationSerializer(
  item: DeploymentConfiguration,
): Record<string, unknown> {
  return {
    configurationType: item["configurationType"],
    appLocation: item["appLocation"],
    infrastructureConfiguration: !item.infrastructureConfiguration
      ? item.infrastructureConfiguration
      : infrastructureConfigurationUnionSerializer(item.infrastructureConfiguration),
    softwareConfiguration: !item.softwareConfiguration
      ? item.softwareConfiguration
      : softwareConfigurationUnionSerializer(item.softwareConfiguration),
  };
}

/** Deploy SAP Infrastructure Details. */
export interface InfrastructureConfiguration {
  /** The application resource group where SAP system resources will be deployed. */
  appResourceGroup: string;
  /** the discriminator possible values: SingleServer, ThreeTier */
  deploymentType: SAPDeploymentType;
}

export function infrastructureConfigurationUnionSerializer(item: InfrastructureConfigurationUnion) {
  switch (item.deploymentType) {
    case "SingleServer":
      return singleServerConfigurationSerializer(item as SingleServerConfiguration);

    case "ThreeTier":
      return threeTierConfigurationSerializer(item as ThreeTierConfiguration);

    default:
      return infrastructureConfigurationSerializer(item);
  }
}

export function infrastructureConfigurationSerializer(
  item: InfrastructureConfigurationUnion,
): Record<string, unknown> {
  return {
    appResourceGroup: item["appResourceGroup"],
    deploymentType: item["deploymentType"],
  };
}

/** Gets or sets the single server configuration. For prerequisites for creating the infrastructure, please see [here](https://go.microsoft.com/fwlink/?linkid=2212611&clcid=0x409) */
export interface SingleServerConfiguration extends InfrastructureConfiguration {
  /** Network configuration for the server */
  networkConfiguration?: NetworkConfiguration;
  /** The database type. */
  databaseType?: SAPDatabaseType;
  /** The subnet id. */
  subnetId: string;
  /** Gets or sets the virtual machine configuration. */
  virtualMachineConfiguration: VirtualMachineConfiguration;
  /** Gets or sets the disk configuration. */
  dbDiskConfiguration?: DiskConfiguration;
  /** The set of custom names to be used for underlying azure resources that are part of the SAP system. */
  customResourceNames?: SingleServerCustomResourceNamesUnion;
  /** The type of SAP deployment, single server in this case. */
  deploymentType: "SingleServer";
}

export function singleServerConfigurationSerializer(
  item: SingleServerConfiguration,
): Record<string, unknown> {
  return {
    appResourceGroup: item["appResourceGroup"],
    deploymentType: item["deploymentType"],
    networkConfiguration: !item.networkConfiguration
      ? item.networkConfiguration
      : networkConfigurationSerializer(item.networkConfiguration),
    databaseType: item["databaseType"],
    subnetId: item["subnetId"],
    virtualMachineConfiguration: virtualMachineConfigurationSerializer(
      item.virtualMachineConfiguration,
    ),
    dbDiskConfiguration: !item.dbDiskConfiguration
      ? item.dbDiskConfiguration
      : diskConfigurationSerializer(item.dbDiskConfiguration),
    customResourceNames: !item.customResourceNames
      ? item.customResourceNames
      : singleServerCustomResourceNamesUnionSerializer(item.customResourceNames),
  };
}

/** Defines the network configuration type for SAP system infrastructure that is being deployed */
export interface NetworkConfiguration {
  /** Specifies whether a secondary IP address should be added to the network interface on all VMs of the SAP system being deployed */
  isSecondaryIpEnabled?: boolean;
}

export function networkConfigurationSerializer(
  item: NetworkConfiguration,
): Record<string, unknown> {
  return {
    isSecondaryIpEnabled: item["isSecondaryIpEnabled"],
  };
}

/** Known values of {@link SAPDatabaseType} that the service accepts. */
export enum KnownSAPDatabaseType {
  /** HANA */
  HANA = "HANA",
  /** DB2 */
  DB2 = "DB2",
}

/**
 * Defines the supported SAP Database types. \
 * {@link KnownSAPDatabaseType} can be used interchangeably with SAPDatabaseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HANA** \
 * **DB2**
 */
export type SAPDatabaseType = string;

/** Defines the virtual machine configuration. */
export interface VirtualMachineConfiguration {
  /** The virtual machine size. */
  vmSize: string;
  /** The image reference. */
  imageReference: ImageReference;
  /** The OS profile. */
  osProfile: OSProfile;
}

export function virtualMachineConfigurationSerializer(
  item: VirtualMachineConfiguration,
): Record<string, unknown> {
  return {
    vmSize: item["vmSize"],
    imageReference: imageReferenceSerializer(item.imageReference),
    osProfile: oSProfileSerializer(item.osProfile),
  };
}

/** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. NOTE: Image reference publisher and offer can only be set when you create the scale set. */
export interface ImageReference {
  /** The image publisher. */
  publisher?: string;
  /** Specifies the offer of the platform image or marketplace image used to create the virtual machine. */
  offer?: string;
  /** The image SKU. */
  sku?: string;
  /** Specifies the version of the platform image or marketplace image used to create the virtual machine. The allowed formats are Major.Minor.Build or 'latest'. Major, Minor, and Build are decimal numbers. Specify 'latest' to use the latest version of an image available at deploy time. Even if you use 'latest', the VM image will not automatically update after deploy time even if a new version becomes available. */
  version?: string;
  /** Specifies the ARM resource ID of the Azure Compute Gallery image version used for creating ACSS VMs. You will need to provide this input when you choose to deploy virtual machines in ACSS with OS image from the Azure Compute gallery. */
  id?: string;
}

export function imageReferenceSerializer(item: ImageReference): Record<string, unknown> {
  return {
    publisher: item["publisher"],
    offer: item["offer"],
    sku: item["sku"],
    version: item["version"],
    id: item["id"],
  };
}

/** Specifies the operating system settings for the virtual machine. Some of the settings cannot be changed once VM is provisioned. */
export interface OSProfile {
  /** Specifies the name of the administrator account. <br><br> This property cannot be updated after the VM is created. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters. */
  adminUsername?: string;
  /** Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection) */
  adminPassword?: string;
  /** Specifies Windows operating system settings on the virtual machine. */
  osConfiguration?: OSConfigurationUnion;
}

export function oSProfileSerializer(item: OSProfile): Record<string, unknown> {
  return {
    adminUsername: item["adminUsername"],
    adminPassword: item["adminPassword"],
    osConfiguration: !item.osConfiguration
      ? item.osConfiguration
      : oSConfigurationUnionSerializer(item.osConfiguration),
  };
}

/** Defines the OS configuration. */
export interface OSConfiguration {
  /** the discriminator possible values: Windows, Linux */
  osType: OSType;
}

export function oSConfigurationUnionSerializer(item: OSConfigurationUnion) {
  switch (item.osType) {
    case "Windows":
      return windowsConfigurationSerializer(item as WindowsConfiguration);

    case "Linux":
      return linuxConfigurationSerializer(item as LinuxConfiguration);

    default:
      return oSConfigurationSerializer(item);
  }
}

export function oSConfigurationSerializer(item: OSConfigurationUnion): Record<string, unknown> {
  return {
    osType: item["osType"],
  };
}

/** Specifies Windows operating system settings on the virtual machine. */
export interface WindowsConfiguration extends OSConfiguration {
  /** The OS Type */
  osType: "Windows";
}

export function windowsConfigurationSerializer(
  item: WindowsConfiguration,
): Record<string, unknown> {
  return {
    osType: item["osType"],
  };
}

/** Specifies the Linux operating system settings on the virtual machine. <br><br>For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros). */
export interface LinuxConfiguration extends OSConfiguration {
  /** Specifies whether password authentication should be disabled. */
  disablePasswordAuthentication?: boolean;
  /** Specifies the ssh key configuration for a Linux OS. (This property is deprecated, please use 'sshKeyPair' instead) */
  ssh?: SshConfiguration;
  /** The SSH Key-pair used to authenticate with the VM's. */
  sshKeyPair?: SshKeyPair;
  /** The OS Type */
  osType: "Linux";
}

export function linuxConfigurationSerializer(item: LinuxConfiguration): Record<string, unknown> {
  return {
    osType: item["osType"],
    disablePasswordAuthentication: item["disablePasswordAuthentication"],
    ssh: !item.ssh ? item.ssh : sshConfigurationSerializer(item.ssh),
    sshKeyPair: !item.sshKeyPair ? item.sshKeyPair : sshKeyPairSerializer(item.sshKeyPair),
  };
}

/** SSH configuration for Linux based VMs running on Azure */
export interface SshConfiguration {
  /** The list of SSH public keys used to authenticate with linux based VMs. */
  publicKeys?: SshPublicKey[];
}

export function sshConfigurationSerializer(item: SshConfiguration): Record<string, unknown> {
  return {
    publicKeys:
      item["publicKeys"] === undefined
        ? item["publicKeys"]
        : item["publicKeys"].map(sshPublicKeySerializer),
  };
}

/** Contains information about SSH certificate public key and the path on the Linux VM where the public key is placed. */
export interface SshPublicKey {
  /** SSH public key certificate used to authenticate with the VM through ssh. The key needs to be at least 2048-bit and in ssh-rsa format. <br><br> For creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure](https://docs.microsoft.com/azure/virtual-machines/linux/create-ssh-keys-detailed). */
  keyData?: string;
}

export function sshPublicKeySerializer(item: SshPublicKey): Record<string, unknown> {
  return {
    keyData: item["keyData"],
  };
}

/** The SSH Key-pair used to authenticate with the VM. The key needs to be at least 2048-bit and in ssh-rsa format. <br><br> For creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure](https://docs.microsoft.com/azure/virtual-machines/linux/create-ssh-keys-detailed). */
export interface SshKeyPair {
  /** SSH public key */
  publicKey?: string;
  /** SSH private key. */
  privateKey?: string;
}

export function sshKeyPairSerializer(item: SshKeyPair): Record<string, unknown> {
  return {
    publicKey: item["publicKey"],
    privateKey: item["privateKey"],
  };
}

/** Known values of {@link OSType} that the service accepts. */
export enum KnownOSType {
  /** Linux */
  Linux = "Linux",
  /** Windows */
  Windows = "Windows",
}

/**
 * The OS Type \
 * {@link KnownOSType} can be used interchangeably with OSType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Linux** \
 * **Windows**
 */
export type OSType = string;

/** The Disk Configuration Details. */
export interface DiskConfiguration {
  /** The disk configuration for the db volume. For HANA, Required volumes are: ['hana/data', 'hana/log', hana/shared', 'usr/sap', 'os'], Optional volume : ['backup']. */
  diskVolumeConfigurations?: Record<string, DiskVolumeConfiguration>;
}

export function diskConfigurationSerializer(item: DiskConfiguration): Record<string, unknown> {
  return {
    diskVolumeConfigurations: !item.diskVolumeConfigurations
      ? item.diskVolumeConfigurations
      : (serializeRecord(
          item.diskVolumeConfigurations as any,
          diskVolumeConfigurationSerializer,
        ) as any),
  };
}

/** The disk configuration required for the selected volume. */
export interface DiskVolumeConfiguration {
  /** The total number of disks required for the concerned volume. */
  count?: number;
  /** The disk size in GB. */
  sizeGB?: number;
  /** The disk SKU details. */
  sku?: DiskSku;
}

export function diskVolumeConfigurationSerializer(
  item: DiskVolumeConfiguration,
): Record<string, unknown> {
  return {
    count: item["count"],
    sizeGB: item["sizeGB"],
    sku: !item.sku ? item.sku : diskSkuSerializer(item.sku),
  };
}

/** The type of disk sku. For example, Standard_LRS, Standard_ZRS, Premium_LRS, Premium_ZRS. */
export interface DiskSku {
  /** Defines the disk sku name. */
  name?: DiskSkuName;
}

export function diskSkuSerializer(item: DiskSku): Record<string, unknown> {
  return {
    name: item["name"],
  };
}

/** Known values of {@link DiskSkuName} that the service accepts. */
export enum KnownDiskSkuName {
  /** Standard_LRS */
  StandardLRS = "Standard_LRS",
  /** Premium_LRS */
  PremiumLRS = "Premium_LRS",
  /** StandardSSD_LRS */
  StandardSSDLRS = "StandardSSD_LRS",
  /** UltraSSD_LRS */
  UltraSSDLRS = "UltraSSD_LRS",
  /** Premium_ZRS */
  PremiumZRS = "Premium_ZRS",
  /** StandardSSD_ZRS */
  StandardSSDZRS = "StandardSSD_ZRS",
  /** PremiumV2_LRS */
  PremiumV2LRS = "PremiumV2_LRS",
}

/**
 * Defines the disk sku name. \
 * {@link KnownDiskSkuName} can be used interchangeably with DiskSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS** \
 * **Premium_LRS** \
 * **StandardSSD_LRS** \
 * **UltraSSD_LRS** \
 * **Premium_ZRS** \
 * **StandardSSD_ZRS** \
 * **PremiumV2_LRS**
 */
export type DiskSkuName = string;

/** The resource-names input to specify custom names for underlying azure resources that are part of a single server SAP system. */
export interface SingleServerCustomResourceNames {
  /** the discriminator possible values: FullResourceName */
  namingPatternType: NamingPatternType;
}

export function singleServerCustomResourceNamesUnionSerializer(
  item: SingleServerCustomResourceNamesUnion,
) {
  switch (item.namingPatternType) {
    case "FullResourceName":
      return singleServerFullResourceNamesSerializer(item as SingleServerFullResourceNames);

    default:
      return singleServerCustomResourceNamesSerializer(item);
  }
}

export function singleServerCustomResourceNamesSerializer(
  item: SingleServerCustomResourceNamesUnion,
): Record<string, unknown> {
  return {
    namingPatternType: item["namingPatternType"],
  };
}

/** The resource name object where the specified values will be full resource names of the corresponding resources in a single server SAP system. */
export interface SingleServerFullResourceNames extends SingleServerCustomResourceNames {
  /** The resource names object for virtual machine and related resources. */
  virtualMachine?: VirtualMachineResourceNames;
  /** The pattern type to be used for resource naming. */
  namingPatternType: "FullResourceName";
}

export function singleServerFullResourceNamesSerializer(
  item: SingleServerFullResourceNames,
): Record<string, unknown> {
  return {
    namingPatternType: item["namingPatternType"],
    virtualMachine: !item.virtualMachine
      ? item.virtualMachine
      : virtualMachineResourceNamesSerializer(item.virtualMachine),
  };
}

/** The resource names object for virtual machine and related resources. */
export interface VirtualMachineResourceNames {
  /** The full name for virtual machine. The length of this field can be upto 64 characters. If name is not provided, service uses a default name based on the deployment type. For SingleServer, default name is {SID}vm. In case of HA-AvZone systems, default name will be {SID}{app/ascs/db}z{a/b}vm with an incrementor at the end in case of more than 1 vm per layer. For distributed and HA-AvSet systems, default name will be {SID}{app/ascs/db}vm with an incrementor at the end in case of more than 1 vm per layer. */
  vmName?: string;
  /** The full name for virtual-machine's host (computer name). Currently, ACSS only supports host names which are less than or equal to 13 characters long. If this value is not provided, vmName will be used as host name. */
  hostName?: string;
  /** The list of network interface name objects for the selected virtual machine. Currently, only one network interface is supported per virtual machine. */
  networkInterfaces?: NetworkInterfaceResourceNames[];
  /** The full name for OS disk attached to the VM. If this value is not provided, it will be named by ARM as per its default naming standards (prefixed with vm name). There is only one OS disk attached per Virtual Machine. */
  osDiskName?: string;
  /** The full resource names for virtual machine data disks. This is a dictionary containing list of names of data disks per volume. Currently supported volumes for database layer are ['hana/data', 'hana/log', hana/shared', 'usr/sap', 'os', 'backup']. For application and cs layers, only 'default' volume is supported */
  dataDiskNames?: Record<string, string[]>;
}

export function virtualMachineResourceNamesSerializer(
  item: VirtualMachineResourceNames,
): Record<string, unknown> {
  return {
    vmName: item["vmName"],
    hostName: item["hostName"],
    networkInterfaces:
      item["networkInterfaces"] === undefined
        ? item["networkInterfaces"]
        : item["networkInterfaces"].map(networkInterfaceResourceNamesSerializer),
    osDiskName: item["osDiskName"],
    dataDiskNames: !item.dataDiskNames
      ? item.dataDiskNames
      : (serializeRecord(item.dataDiskNames as any) as any),
  };
}

/** The resource names object for network interface and related resources. */
export interface NetworkInterfaceResourceNames {
  /** The full name for network interface. If name is not provided, service uses a default name based on the deployment type. For SingleServer, default name is {SID}-Nic. In case of HA-AvZone systems, default name will be {SID}-{App/ASCS/DB}-Zone{A/B}-Nic with an incrementor at the end in case of more than 1 instance per layer. For distributed and HA-AvSet systems, default name will be {SID}-{App/ASCS/DB}-Nic with an incrementor at the end in case of more than 1 instance per layer. */
  networkInterfaceName?: string;
}

export function networkInterfaceResourceNamesSerializer(
  item: NetworkInterfaceResourceNames,
): Record<string, unknown> {
  return {
    networkInterfaceName: item["networkInterfaceName"],
  };
}

/** Known values of {@link NamingPatternType} that the service accepts. */
export enum KnownNamingPatternType {
  /** FullResourceName */
  FullResourceName = "FullResourceName",
}

/**
 * The pattern type to be used for resource naming. \
 * {@link KnownNamingPatternType} can be used interchangeably with NamingPatternType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FullResourceName**
 */
export type NamingPatternType = string;

/** Gets or sets the three tier SAP configuration. For prerequisites for creating the infrastructure, please see [here](https://go.microsoft.com/fwlink/?linkid=2212611&clcid=0x409) */
export interface ThreeTierConfiguration extends InfrastructureConfiguration {
  /** Network configuration common to all servers */
  networkConfiguration?: NetworkConfiguration;
  /** The central server configuration. */
  centralServer: CentralServerConfiguration;
  /** The application server configuration. */
  applicationServer: ApplicationServerConfiguration;
  /** The database configuration. */
  databaseServer: DatabaseConfiguration;
  /** The high availability configuration. */
  highAvailabilityConfig?: HighAvailabilityConfiguration;
  /** The storage configuration. */
  storageConfiguration?: StorageConfiguration;
  /** The set of custom names to be used for underlying azure resources that are part of the SAP system. */
  customResourceNames?: ThreeTierCustomResourceNamesUnion;
  /** The type of SAP deployment, ThreeTier in this case. */
  deploymentType: "ThreeTier";
}

export function threeTierConfigurationSerializer(
  item: ThreeTierConfiguration,
): Record<string, unknown> {
  return {
    appResourceGroup: item["appResourceGroup"],
    deploymentType: item["deploymentType"],
    networkConfiguration: !item.networkConfiguration
      ? item.networkConfiguration
      : networkConfigurationSerializer(item.networkConfiguration),
    centralServer: centralServerConfigurationSerializer(item.centralServer),
    applicationServer: applicationServerConfigurationSerializer(item.applicationServer),
    databaseServer: databaseConfigurationSerializer(item.databaseServer),
    highAvailabilityConfig: !item.highAvailabilityConfig
      ? item.highAvailabilityConfig
      : highAvailabilityConfigurationSerializer(item.highAvailabilityConfig),
    storageConfiguration: !item.storageConfiguration
      ? item.storageConfiguration
      : storageConfigurationSerializer(item.storageConfiguration),
    customResourceNames: !item.customResourceNames
      ? item.customResourceNames
      : threeTierCustomResourceNamesUnionSerializer(item.customResourceNames),
  };
}

/** Gets or sets the central server configuration. */
export interface CentralServerConfiguration {
  /** The subnet id. */
  subnetId: string;
  /** Gets or sets the virtual machine configuration. */
  virtualMachineConfiguration: VirtualMachineConfiguration;
  /** The number of central server VMs. */
  instanceCount: number;
}

export function centralServerConfigurationSerializer(
  item: CentralServerConfiguration,
): Record<string, unknown> {
  return {
    subnetId: item["subnetId"],
    virtualMachineConfiguration: virtualMachineConfigurationSerializer(
      item.virtualMachineConfiguration,
    ),
    instanceCount: item["instanceCount"],
  };
}

/** Gets or sets the application server configuration. */
export interface ApplicationServerConfiguration {
  /** The subnet id. */
  subnetId: string;
  /** Gets or sets the virtual machine configuration. */
  virtualMachineConfiguration: VirtualMachineConfiguration;
  /** The number of app server instances. */
  instanceCount: number;
}

export function applicationServerConfigurationSerializer(
  item: ApplicationServerConfiguration,
): Record<string, unknown> {
  return {
    subnetId: item["subnetId"],
    virtualMachineConfiguration: virtualMachineConfigurationSerializer(
      item.virtualMachineConfiguration,
    ),
    instanceCount: item["instanceCount"],
  };
}

/** Gets or sets the database configuration. */
export interface DatabaseConfiguration {
  /** The database type. */
  databaseType?: SAPDatabaseType;
  /** The subnet id. */
  subnetId: string;
  /** Gets or sets the virtual machine configuration. */
  virtualMachineConfiguration: VirtualMachineConfiguration;
  /** The number of database VMs. */
  instanceCount: number;
  /** Gets or sets the disk configuration. */
  diskConfiguration?: DiskConfiguration;
}

export function databaseConfigurationSerializer(
  item: DatabaseConfiguration,
): Record<string, unknown> {
  return {
    databaseType: item["databaseType"],
    subnetId: item["subnetId"],
    virtualMachineConfiguration: virtualMachineConfigurationSerializer(
      item.virtualMachineConfiguration,
    ),
    instanceCount: item["instanceCount"],
    diskConfiguration: !item.diskConfiguration
      ? item.diskConfiguration
      : diskConfigurationSerializer(item.diskConfiguration),
  };
}

/** Gets or sets the high availability configuration. */
export interface HighAvailabilityConfiguration {
  /** The high availability type. */
  highAvailabilityType: SAPHighAvailabilityType;
}

export function highAvailabilityConfigurationSerializer(
  item: HighAvailabilityConfiguration,
): Record<string, unknown> {
  return {
    highAvailabilityType: item["highAvailabilityType"],
  };
}

/** Known values of {@link SAPHighAvailabilityType} that the service accepts. */
export enum KnownSAPHighAvailabilityType {
  /** AvailabilitySet */
  AvailabilitySet = "AvailabilitySet",
  /** AvailabilityZone */
  AvailabilityZone = "AvailabilityZone",
}

/**
 * The high availability type (AvailabilitySet or AvailabilityZone). \
 * {@link KnownSAPHighAvailabilityType} can be used interchangeably with SAPHighAvailabilityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AvailabilitySet** \
 * **AvailabilityZone**
 */
export type SAPHighAvailabilityType = string;

/** Gets or sets the storage configuration. */
export interface StorageConfiguration {
  /** The properties of the transport directory attached to the VIS. The default for transportFileShareConfiguration is the createAndMount flow if storage configuration is missing. */
  transportFileShareConfiguration?: FileShareConfigurationUnion;
}

export function storageConfigurationSerializer(
  item: StorageConfiguration,
): Record<string, unknown> {
  return {
    transportFileShareConfiguration: !item.transportFileShareConfiguration
      ? item.transportFileShareConfiguration
      : fileShareConfigurationUnionSerializer(item.transportFileShareConfiguration),
  };
}

/** File Share configuration details, populated with information on storage configuration mounted on the VIS. The createAndMount option is selected in case of missing input. */
export interface FileShareConfiguration {
  /** the discriminator possible values: Skip, CreateAndMount, Mount */
  configurationType: FileShareConfigurationType;
}

export function fileShareConfigurationUnionSerializer(item: FileShareConfigurationUnion) {
  switch (item.configurationType) {
    case "Skip":
      return skipFileShareConfigurationSerializer(item as SkipFileShareConfiguration);

    case "CreateAndMount":
      return createAndMountFileShareConfigurationSerializer(
        item as CreateAndMountFileShareConfiguration,
      );

    case "Mount":
      return mountFileShareConfigurationSerializer(item as MountFileShareConfiguration);

    default:
      return fileShareConfigurationSerializer(item);
  }
}

export function fileShareConfigurationSerializer(
  item: FileShareConfigurationUnion,
): Record<string, unknown> {
  return {
    configurationType: item["configurationType"],
  };
}

/** Gets or sets the file share configuration for scenarios where transport directory fileshare is not created or required. */
export interface SkipFileShareConfiguration extends FileShareConfiguration {
  /** The type of file share config, skip in this case i.e. fileshare is not created or required. */
  configurationType: "Skip";
}

export function skipFileShareConfigurationSerializer(
  item: SkipFileShareConfiguration,
): Record<string, unknown> {
  return {
    configurationType: item["configurationType"],
  };
}

/** Gets or sets the file share configuration where the transport directory fileshare is created and mounted as a part of the create infra flow. Please pre-create the resource group you intend to place the transport directory in. The storage account and fileshare will be auto-created by the ACSS and doesn't need to be pre-created. */
export interface CreateAndMountFileShareConfiguration extends FileShareConfiguration {
  /** The name of transport file share resource group. This should be pre created by the customer. The app rg is used in case of missing input. */
  resourceGroup?: string;
  /** The name of file share storage account name . A custom name is used in case of missing input. */
  storageAccountName?: string;
  /** The type of file share config. */
  configurationType: "CreateAndMount";
}

export function createAndMountFileShareConfigurationSerializer(
  item: CreateAndMountFileShareConfiguration,
): Record<string, unknown> {
  return {
    configurationType: item["configurationType"],
    resourceGroup: item["resourceGroup"],
    storageAccountName: item["storageAccountName"],
  };
}

/** Gets or sets the file share configuration where the transport directory fileshare already exists, and user wishes to mount the fileshare as a part of the create infra flow. */
export interface MountFileShareConfiguration extends FileShareConfiguration {
  /** The fileshare resource ID */
  id: string;
  /** The private endpoint resource ID */
  privateEndpointId: string;
  /** The type of file share config, mount in this case. */
  configurationType: "Mount";
}

export function mountFileShareConfigurationSerializer(
  item: MountFileShareConfiguration,
): Record<string, unknown> {
  return {
    configurationType: item["configurationType"],
    id: item["id"],
    privateEndpointId: item["privateEndpointId"],
  };
}

/** Known values of {@link FileShareConfigurationType} that the service accepts. */
export enum KnownFileShareConfigurationType {
  /** Skip */
  Skip = "Skip",
  /** CreateAndMount */
  CreateAndMount = "CreateAndMount",
  /** Mount */
  Mount = "Mount",
}

/**
 * The type of file share config. \
 * {@link KnownFileShareConfigurationType} can be used interchangeably with FileShareConfigurationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Skip** \
 * **CreateAndMount** \
 * **Mount**
 */
export type FileShareConfigurationType = string;

/** The resource-names input to specify custom names for underlying azure resources that are part of a three tier SAP system. */
export interface ThreeTierCustomResourceNames {
  /** the discriminator possible values: FullResourceName */
  namingPatternType: NamingPatternType;
}

export function threeTierCustomResourceNamesUnionSerializer(
  item: ThreeTierCustomResourceNamesUnion,
) {
  switch (item.namingPatternType) {
    case "FullResourceName":
      return threeTierFullResourceNamesSerializer(item as ThreeTierFullResourceNames);

    default:
      return threeTierCustomResourceNamesSerializer(item);
  }
}

export function threeTierCustomResourceNamesSerializer(
  item: ThreeTierCustomResourceNamesUnion,
): Record<string, unknown> {
  return {
    namingPatternType: item["namingPatternType"],
  };
}

/** The resource name object where the specified values will be full resource names of the corresponding resources in a three tier SAP system. */
export interface ThreeTierFullResourceNames extends ThreeTierCustomResourceNames {
  /** The full resource names object for central server layer resources. */
  centralServer?: CentralServerFullResourceNames;
  /** The full resource names object for application layer resources. The number of entries in this list should be equal to the number VMs to be created for application layer. */
  applicationServer?: ApplicationServerFullResourceNames;
  /** The full resource names object for database layer resources. The number of entries in this list should be equal to the number VMs to be created for database layer. */
  databaseServer?: DatabaseServerFullResourceNames;
  /** The resource names object for shared storage. */
  sharedStorage?: SharedStorageResourceNames;
  /** The pattern type to be used for resource naming, FullResourceName in this case. */
  namingPatternType: "FullResourceName";
}

export function threeTierFullResourceNamesSerializer(
  item: ThreeTierFullResourceNames,
): Record<string, unknown> {
  return {
    namingPatternType: item["namingPatternType"],
    centralServer: !item.centralServer
      ? item.centralServer
      : centralServerFullResourceNamesSerializer(item.centralServer),
    applicationServer: !item.applicationServer
      ? item.applicationServer
      : applicationServerFullResourceNamesSerializer(item.applicationServer),
    databaseServer: !item.databaseServer
      ? item.databaseServer
      : databaseServerFullResourceNamesSerializer(item.databaseServer),
    sharedStorage: !item.sharedStorage
      ? item.sharedStorage
      : sharedStorageResourceNamesSerializer(item.sharedStorage),
  };
}

/** The full resource names object for central server layer resources. */
export interface CentralServerFullResourceNames {
  /** The list of names for all ASCS virtual machines to be deployed. The number of entries in this list should be equal to the number VMs to be created for ASCS layer. At maximum, there can be two virtual machines at this layer: ASCS and ERS. */
  virtualMachines?: VirtualMachineResourceNames[];
  /** The full name for availability set. In case name is not provided, it will be defaulted to {SID}-ASCS-AvSet. */
  availabilitySetName?: string;
  /** The resource names object for load balancer and related resources. */
  loadBalancer?: LoadBalancerResourceNames;
}

export function centralServerFullResourceNamesSerializer(
  item: CentralServerFullResourceNames,
): Record<string, unknown> {
  return {
    virtualMachines:
      item["virtualMachines"] === undefined
        ? item["virtualMachines"]
        : item["virtualMachines"].map(virtualMachineResourceNamesSerializer),
    availabilitySetName: item["availabilitySetName"],
    loadBalancer: !item.loadBalancer
      ? item.loadBalancer
      : loadBalancerResourceNamesSerializer(item.loadBalancer),
  };
}

/** The resource names object for load balancer and related resources. */
export interface LoadBalancerResourceNames {
  /** The full resource name for load balancer. If this value is not provided, load balancer will be name as {ASCS/DB}-loadBalancer. */
  loadBalancerName?: string;
  /** The list of frontend IP configuration names. If provided as input, size of this list should be 2 for cs layer and should be 1 for database layer. */
  frontendIpConfigurationNames?: string[];
  /** The list of backend pool names. Currently, ACSS deploys only one backend pool and hence, size of this list should be 1 */
  backendPoolNames?: string[];
  /** The list of health probe names. If provided as input, size of this list should be 2 for cs layer and should be 1 for database layer. */
  healthProbeNames?: string[];
}

export function loadBalancerResourceNamesSerializer(
  item: LoadBalancerResourceNames,
): Record<string, unknown> {
  return {
    loadBalancerName: item["loadBalancerName"],
    frontendIpConfigurationNames: item["frontendIpConfigurationNames"],
    backendPoolNames: item["backendPoolNames"],
    healthProbeNames: item["healthProbeNames"],
  };
}

/** The full resource names object for application layer resources. The number of entries in this list should be equal to the number VMs to be created for application layer. */
export interface ApplicationServerFullResourceNames {
  /** The list of virtual machine naming details. */
  virtualMachines?: VirtualMachineResourceNames[];
  /** The full name for availability set. In case name is not provided, it will be defaulted to {SID}-App-AvSet. */
  availabilitySetName?: string;
}

export function applicationServerFullResourceNamesSerializer(
  item: ApplicationServerFullResourceNames,
): Record<string, unknown> {
  return {
    virtualMachines:
      item["virtualMachines"] === undefined
        ? item["virtualMachines"]
        : item["virtualMachines"].map(virtualMachineResourceNamesSerializer),
    availabilitySetName: item["availabilitySetName"],
  };
}

/** The full resource names object for database layer resources. The number of entries in this list should be equal to the number VMs to be created for database layer. */
export interface DatabaseServerFullResourceNames {
  /** The list of virtual machine naming details. */
  virtualMachines?: VirtualMachineResourceNames[];
  /** The full name for availability set. In case name is not provided, it will be defaulted to {SID}-DB-AvSet. */
  availabilitySetName?: string;
  /** The resource names object for load balancer and related resources. */
  loadBalancer?: LoadBalancerResourceNames;
}

export function databaseServerFullResourceNamesSerializer(
  item: DatabaseServerFullResourceNames,
): Record<string, unknown> {
  return {
    virtualMachines:
      item["virtualMachines"] === undefined
        ? item["virtualMachines"]
        : item["virtualMachines"].map(virtualMachineResourceNamesSerializer),
    availabilitySetName: item["availabilitySetName"],
    loadBalancer: !item.loadBalancer
      ? item.loadBalancer
      : loadBalancerResourceNamesSerializer(item.loadBalancer),
  };
}

/** The resource names object for shared storage. */
export interface SharedStorageResourceNames {
  /** The full name of the shared storage account. If it is not provided, it will be defaulted to {SID}nfs{guid of 15 chars}. */
  sharedStorageAccountName?: string;
  /** The full name of private end point for the shared storage account. If it is not provided, it will be defaulted to {storageAccountName}_pe */
  sharedStorageAccountPrivateEndPointName?: string;
}

export function sharedStorageResourceNamesSerializer(
  item: SharedStorageResourceNames,
): Record<string, unknown> {
  return {
    sharedStorageAccountName: item["sharedStorageAccountName"],
    sharedStorageAccountPrivateEndPointName: item["sharedStorageAccountPrivateEndPointName"],
  };
}

/** Known values of {@link SAPDeploymentType} that the service accepts. */
export enum KnownSAPDeploymentType {
  /** SingleServer */
  SingleServer = "SingleServer",
  /** ThreeTier */
  ThreeTier = "ThreeTier",
}

/**
 * The type of SAP deployment, single server or Three tier. \
 * {@link KnownSAPDeploymentType} can be used interchangeably with SAPDeploymentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SingleServer** \
 * **ThreeTier**
 */
export type SAPDeploymentType = string;

/** The SAP Software configuration Input. */
export interface SoftwareConfiguration {
  /** the discriminator possible values: ServiceInitiated, SAPInstallWithoutOSConfig, External */
  softwareInstallationType: SAPSoftwareInstallationType;
}

export function softwareConfigurationUnionSerializer(item: SoftwareConfigurationUnion) {
  switch (item.softwareInstallationType) {
    case "ServiceInitiated":
      return serviceInitiatedSoftwareConfigurationSerializer(
        item as ServiceInitiatedSoftwareConfiguration,
      );

    case "SAPInstallWithoutOSConfig":
      return sAPInstallWithoutOSConfigSoftwareConfigurationSerializer(
        item as SAPInstallWithoutOSConfigSoftwareConfiguration,
      );

    case "External":
      return externalInstallationSoftwareConfigurationSerializer(
        item as ExternalInstallationSoftwareConfiguration,
      );

    default:
      return softwareConfigurationSerializer(item);
  }
}

export function softwareConfigurationSerializer(
  item: SoftwareConfigurationUnion,
): Record<string, unknown> {
  return {
    softwareInstallationType: item["softwareInstallationType"],
  };
}

/** The SAP Software configuration Input when the software is to be installed by service. */
export interface ServiceInitiatedSoftwareConfiguration extends SoftwareConfiguration {
  /** The URL to the SAP Build of Materials(BOM) file. */
  bomUrl: string;
  /** The software version to install. */
  softwareVersion: string;
  /** The SAP bits storage account id. */
  sapBitsStorageAccountId: string;
  /** The FQDN to set for the SAP system during install. */
  sapFqdn: string;
  /** The SSH private key. */
  sshPrivateKey: string;
  /** Gets or sets the HA software configuration. */
  highAvailabilitySoftwareConfiguration?: HighAvailabilitySoftwareConfiguration;
  /** The SAP software installation Type, service initiated in this case. */
  softwareInstallationType: "ServiceInitiated";
}

export function serviceInitiatedSoftwareConfigurationSerializer(
  item: ServiceInitiatedSoftwareConfiguration,
): Record<string, unknown> {
  return {
    softwareInstallationType: item["softwareInstallationType"],
    bomUrl: item["bomUrl"],
    softwareVersion: item["softwareVersion"],
    sapBitsStorageAccountId: item["sapBitsStorageAccountId"],
    sapFqdn: item["sapFqdn"],
    sshPrivateKey: item["sshPrivateKey"],
    highAvailabilitySoftwareConfiguration: !item.highAvailabilitySoftwareConfiguration
      ? item.highAvailabilitySoftwareConfiguration
      : highAvailabilitySoftwareConfigurationSerializer(item.highAvailabilitySoftwareConfiguration),
  };
}

/** Gets or sets the HA software configuration. */
export interface HighAvailabilitySoftwareConfiguration {
  /** The fencing client id. */
  fencingClientId: string;
  /** The fencing client id secret/password. The secret should never expire. This will be used pacemaker to start/stop the cluster VMs. */
  fencingClientPassword: string;
}

export function highAvailabilitySoftwareConfigurationSerializer(
  item: HighAvailabilitySoftwareConfiguration,
): Record<string, unknown> {
  return {
    fencingClientId: item["fencingClientId"],
    fencingClientPassword: item["fencingClientPassword"],
  };
}

/** The SAP Software configuration Input when the software is to be installed by service without OS Configurations */
export interface SAPInstallWithoutOSConfigSoftwareConfiguration extends SoftwareConfiguration {
  /** The URL to the SAP Build of Materials(BOM) file. */
  bomUrl: string;
  /** The SAP bits storage account id. */
  sapBitsStorageAccountId: string;
  /** The software version to install. */
  softwareVersion: string;
  /** Gets or sets the HA software configuration. */
  highAvailabilitySoftwareConfiguration?: HighAvailabilitySoftwareConfiguration;
  /** The SAP software installation Type. */
  softwareInstallationType: "SAPInstallWithoutOSConfig";
}

export function sAPInstallWithoutOSConfigSoftwareConfigurationSerializer(
  item: SAPInstallWithoutOSConfigSoftwareConfiguration,
): Record<string, unknown> {
  return {
    softwareInstallationType: item["softwareInstallationType"],
    bomUrl: item["bomUrl"],
    sapBitsStorageAccountId: item["sapBitsStorageAccountId"],
    softwareVersion: item["softwareVersion"],
    highAvailabilitySoftwareConfiguration: !item.highAvailabilitySoftwareConfiguration
      ? item.highAvailabilitySoftwareConfiguration
      : highAvailabilitySoftwareConfigurationSerializer(item.highAvailabilitySoftwareConfiguration),
  };
}

/** The SAP Software configuration Input when the software is installed externally outside the service. */
export interface ExternalInstallationSoftwareConfiguration extends SoftwareConfiguration {
  /** The resource ID of the virtual machine containing the central server instance. */
  centralServerVmId?: string;
  /** The SAP software installation Type. */
  softwareInstallationType: "External";
}

export function externalInstallationSoftwareConfigurationSerializer(
  item: ExternalInstallationSoftwareConfiguration,
): Record<string, unknown> {
  return {
    softwareInstallationType: item["softwareInstallationType"],
    centralServerVmId: item["centralServerVmId"],
  };
}

/** Known values of {@link SAPSoftwareInstallationType} that the service accepts. */
export enum KnownSAPSoftwareInstallationType {
  /** ServiceInitiated */
  ServiceInitiated = "ServiceInitiated",
  /** SAPInstallWithoutOSConfig */
  SAPInstallWithoutOSConfig = "SAPInstallWithoutOSConfig",
  /** External */
  External = "External",
}

/**
 * The SAP software installation Type. \
 * {@link KnownSAPSoftwareInstallationType} can be used interchangeably with SAPSoftwareInstallationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServiceInitiated** \
 * **SAPInstallWithoutOSConfig** \
 * **External**
 */
export type SAPSoftwareInstallationType = string;

/** Deployment along with OS Configuration. */
export interface DeploymentWithOSConfiguration extends SAPConfiguration {
  /** The geo-location where the SAP system is to be created. */
  appLocation?: string;
  /** The infrastructure configuration. */
  infrastructureConfiguration?: InfrastructureConfigurationUnion;
  /** The software configuration. */
  softwareConfiguration?: SoftwareConfigurationUnion;
  /** The OS and SAP configuration. */
  osSapConfiguration?: OsSapConfiguration;
  /** The configuration Type. */
  configurationType: "DeploymentWithOSConfig";
}

export function deploymentWithOSConfigurationSerializer(
  item: DeploymentWithOSConfiguration,
): Record<string, unknown> {
  return {
    configurationType: item["configurationType"],
    appLocation: item["appLocation"],
    infrastructureConfiguration: !item.infrastructureConfiguration
      ? item.infrastructureConfiguration
      : infrastructureConfigurationUnionSerializer(item.infrastructureConfiguration),
    softwareConfiguration: !item.softwareConfiguration
      ? item.softwareConfiguration
      : softwareConfigurationUnionSerializer(item.softwareConfiguration),
    osSapConfiguration: !item.osSapConfiguration
      ? item.osSapConfiguration
      : osSapConfigurationSerializer(item.osSapConfiguration),
  };
}

/** Defines the OS and SAP Configurations for Deployment */
export interface OsSapConfiguration {
  /** The url and storage account ID where deployer VM packages are uploaded */
  deployerVmPackages?: DeployerVmPackages;
  /** The FQDN to set for the SAP system */
  sapFqdn?: string;
}

export function osSapConfigurationSerializer(item: OsSapConfiguration): Record<string, unknown> {
  return {
    deployerVmPackages: !item.deployerVmPackages
      ? item.deployerVmPackages
      : deployerVmPackagesSerializer(item.deployerVmPackages),
    sapFqdn: item["sapFqdn"],
  };
}

/** Defines the url and storage account ID where deployer VM packages are uploaded */
export interface DeployerVmPackages {
  /** The URL to the deployer VM packages file. */
  url?: string;
  /** The deployer VM packages storage account id */
  storageAccountId?: string;
}

export function deployerVmPackagesSerializer(item: DeployerVmPackages): Record<string, unknown> {
  return {
    url: item["url"],
    storageAccountId: item["storageAccountId"],
  };
}

/** Known values of {@link SAPConfigurationType} that the service accepts. */
export enum KnownSAPConfigurationType {
  /** Deployment */
  Deployment = "Deployment",
  /** Discovery */
  Discovery = "Discovery",
  /** DeploymentWithOSConfig */
  DeploymentWithOSConfig = "DeploymentWithOSConfig",
}

/**
 * The configuration Type. \
 * {@link KnownSAPConfigurationType} can be used interchangeably with SAPConfigurationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Deployment** \
 * **Discovery** \
 * **DeploymentWithOSConfig**
 */
export type SAPConfigurationType = string;

/** Managed resource group configuration */
export interface ManagedRGConfiguration {
  /** Managed resource group name */
  name?: string;
}

export function managedRGConfigurationSerializer(
  item: ManagedRGConfiguration,
): Record<string, unknown> {
  return {
    name: item["name"],
  };
}

/** Known values of {@link SAPVirtualInstanceState} that the service accepts. */
export enum KnownSAPVirtualInstanceState {
  /** InfrastructureDeploymentPending */
  InfrastructureDeploymentPending = "InfrastructureDeploymentPending",
  /** InfrastructureDeploymentInProgress */
  InfrastructureDeploymentInProgress = "InfrastructureDeploymentInProgress",
  /** InfrastructureDeploymentFailed */
  InfrastructureDeploymentFailed = "InfrastructureDeploymentFailed",
  /** SoftwareInstallationPending */
  SoftwareInstallationPending = "SoftwareInstallationPending",
  /** SoftwareInstallationInProgress */
  SoftwareInstallationInProgress = "SoftwareInstallationInProgress",
  /** SoftwareInstallationFailed */
  SoftwareInstallationFailed = "SoftwareInstallationFailed",
  /** SoftwareDetectionInProgress */
  SoftwareDetectionInProgress = "SoftwareDetectionInProgress",
  /** SoftwareDetectionFailed */
  SoftwareDetectionFailed = "SoftwareDetectionFailed",
  /** DiscoveryPending */
  DiscoveryPending = "DiscoveryPending",
  /** DiscoveryInProgress */
  DiscoveryInProgress = "DiscoveryInProgress",
  /** DiscoveryFailed */
  DiscoveryFailed = "DiscoveryFailed",
  /** RegistrationComplete */
  RegistrationComplete = "RegistrationComplete",
  /** ACSSInstallationBlocked */
  ACSSInstallationBlocked = "ACSSInstallationBlocked",
}

/**
 * Defines the Virtual Instance for SAP state. \
 * {@link KnownSAPVirtualInstanceState} can be used interchangeably with SAPVirtualInstanceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InfrastructureDeploymentPending** \
 * **InfrastructureDeploymentInProgress** \
 * **InfrastructureDeploymentFailed** \
 * **SoftwareInstallationPending** \
 * **SoftwareInstallationInProgress** \
 * **SoftwareInstallationFailed** \
 * **SoftwareDetectionInProgress** \
 * **SoftwareDetectionFailed** \
 * **DiscoveryPending** \
 * **DiscoveryInProgress** \
 * **DiscoveryFailed** \
 * **RegistrationComplete** \
 * **ACSSInstallationBlocked**
 */
export type SAPVirtualInstanceState = string;

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

export function managedServiceIdentitySerializer(
  item: ManagedServiceIdentity,
): Record<string, unknown> {
  return {
    type: item["type"],
    userAssignedIdentities: !item.userAssignedIdentities
      ? item.userAssignedIdentities
      : (serializeRecord(
          item.userAssignedIdentities as any,
          userAssignedIdentitySerializer,
        ) as any),
  };
}

/** Known values of {@link ManagedServiceIdentityType} that the service accepts. */
export enum KnownManagedServiceIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAndUserAssigned */
  SystemAndUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **SystemAssigned** \
 * **UserAssigned** \
 * **SystemAssigned,UserAssigned**
 */
export type ManagedServiceIdentityType = string;

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity) {
  return item as any;
}

/** Defines the request body for updating Virtual Instance for SAP. */
export interface UpdateSAPVirtualInstanceRequest {
  /** Gets or sets the Resource tags. */
  tags?: Record<string, string>;
  /** Managed service identity (user assigned identities) */
  identity?: ManagedServiceIdentity;
  /** The update properties. */
  properties?: UpdateSAPVirtualInstanceProperties;
}

export function updateSAPVirtualInstanceRequestSerializer(
  item: UpdateSAPVirtualInstanceRequest,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    identity: !item.identity ? item.identity : managedServiceIdentitySerializer(item.identity),
    properties: !item.properties
      ? item.properties
      : updateSAPVirtualInstancePropertiesSerializer(item.properties),
  };
}

/** Defines the update request body properties for updating Virtual Instance for SAP. */
export interface UpdateSAPVirtualInstanceProperties {
  /** Specifies the network access configuration for the resources that will be deployed in the Managed Resource Group. The options to choose from are Public and Private. If 'Private' is chosen, the Storage Account service tag should be enabled on the subnets in which the SAP VMs exist. This is required for establishing connectivity between VM extensions and the managed resource group storage account. This setting is currently applicable only to Storage Account. Learn more here https://go.microsoft.com/fwlink/?linkid=2247228 */
  managedResourcesNetworkAccessType?: ManagedResourcesNetworkAccessType;
}

export function updateSAPVirtualInstancePropertiesSerializer(
  item: UpdateSAPVirtualInstanceProperties,
): Record<string, unknown> {
  return {
    managedResourcesNetworkAccessType: item["managedResourcesNetworkAccessType"],
  };
}

/** The response of a SAPVirtualInstance list operation. */
export interface _SAPVirtualInstanceListResult {
  /** The SAPVirtualInstance items on this page */
  value: SAPVirtualInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** The SAP Sizing Recommendation request. */
export interface SAPSizingRecommendationRequest {
  /** The geo-location where the resource is to be created. */
  appLocation: string;
  /** Defines the environment type - Production/Non Production. */
  environment: SAPEnvironmentType;
  /** Defines the SAP Product type. */
  sapProduct: SAPProductType;
  /** The deployment type. Eg: SingleServer/ThreeTier */
  deploymentType: SAPDeploymentType;
  /** The SAP Application Performance Standard measurement. */
  saps: number;
  /** The database memory configuration. */
  dbMemory: number;
  /** The database type. */
  databaseType: SAPDatabaseType;
  /** The DB scale method. */
  dbScaleMethod?: SAPDatabaseScaleMethod;
  /** The high availability type. */
  highAvailabilityType?: SAPHighAvailabilityType;
}

export function sAPSizingRecommendationRequestSerializer(
  item: SAPSizingRecommendationRequest,
): Record<string, unknown> {
  return {
    appLocation: item["appLocation"],
    environment: item["environment"],
    sapProduct: item["sapProduct"],
    deploymentType: item["deploymentType"],
    saps: item["saps"],
    dbMemory: item["dbMemory"],
    databaseType: item["databaseType"],
    dbScaleMethod: item["dbScaleMethod"],
    highAvailabilityType: item["highAvailabilityType"],
  };
}

/** Known values of {@link SAPDatabaseScaleMethod} that the service accepts. */
export enum KnownSAPDatabaseScaleMethod {
  /** ScaleUp */
  ScaleUp = "ScaleUp",
}

/**
 * The database scale method. \
 * {@link KnownSAPDatabaseScaleMethod} can be used interchangeably with SAPDatabaseScaleMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ScaleUp**
 */
export type SAPDatabaseScaleMethod = string;

/** The SAP sizing recommendation result. */
export interface SAPSizingRecommendationResult {
  /** the discriminator possible values: SingleServer, ThreeTier */
  deploymentType: SAPDeploymentType;
}

/** The recommended configuration for a single server SAP system. */
export interface SingleServerRecommendationResult extends SAPSizingRecommendationResult {
  /** The recommended VM SKU for single server. */
  vmSku?: string;
  /** The single server SAP deployment type. */
  deploymentType: "SingleServer";
}

/** The recommended configuration for a three tier SAP system. */
export interface ThreeTierRecommendationResult extends SAPSizingRecommendationResult {
  /** The database VM SKU. */
  dbVmSku?: string;
  /** The database server instance count. */
  databaseInstanceCount?: number;
  /** The central server VM SKU. */
  centralServerVmSku?: string;
  /** The central server instance count. */
  centralServerInstanceCount?: number;
  /** The application server VM SKU. */
  applicationServerVmSku?: string;
  /** The application server instance count. */
  applicationServerInstanceCount?: number;
  /** The three tier SAP deployment type. */
  deploymentType: "ThreeTier";
}

/** The SAP request to get list of supported SKUs. */
export interface SAPSupportedSkusRequest {
  /** The geo-location where the resource is to be created. */
  appLocation: string;
  /** Defines the environment type - Production/Non Production. */
  environment: SAPEnvironmentType;
  /** Defines the SAP Product type. */
  sapProduct: SAPProductType;
  /** The deployment type. Eg: SingleServer/ThreeTier */
  deploymentType: SAPDeploymentType;
  /** The database type. Eg: HANA, DB2, etc */
  databaseType: SAPDatabaseType;
  /** The high availability type. */
  highAvailabilityType?: SAPHighAvailabilityType;
}

export function sAPSupportedSkusRequestSerializer(
  item: SAPSupportedSkusRequest,
): Record<string, unknown> {
  return {
    appLocation: item["appLocation"],
    environment: item["environment"],
    sapProduct: item["sapProduct"],
    deploymentType: item["deploymentType"],
    databaseType: item["databaseType"],
    highAvailabilityType: item["highAvailabilityType"],
  };
}

/** The list of supported SKUs for different resources which are part of SAP deployment. */
export interface SAPSupportedResourceSkusResult {
  /** Gets the list of SAP supported SKUs. */
  supportedSkus?: SAPSupportedSku[];
}

/** The SAP supported SKU. */
export interface SAPSupportedSku {
  /** The VM Sku. */
  vmSku?: string;
  /** True if the Sku is certified for App server in the SAP system. */
  isAppServerCertified?: boolean;
  /** True if the Sku is certified for Database server in the SAP system. */
  isDatabaseCertified?: boolean;
}

/** The SAP request to get list of disk configurations. */
export interface SAPDiskConfigurationsRequest {
  /** The geo-location where the SAP resources will be created. */
  appLocation: string;
  /** Defines the environment type - Production/Non Production. */
  environment: SAPEnvironmentType;
  /** Defines the SAP Product type. */
  sapProduct: SAPProductType;
  /** The database type. Eg: HANA, DB2, etc */
  databaseType: SAPDatabaseType;
  /** The deployment type. Eg: SingleServer/ThreeTier */
  deploymentType: SAPDeploymentType;
  /** The VM SKU for database instance. */
  dbVmSku: string;
}

export function sAPDiskConfigurationsRequestSerializer(
  item: SAPDiskConfigurationsRequest,
): Record<string, unknown> {
  return {
    appLocation: item["appLocation"],
    environment: item["environment"],
    sapProduct: item["sapProduct"],
    databaseType: item["databaseType"],
    deploymentType: item["deploymentType"],
    dbVmSku: item["dbVmSku"],
  };
}

/** The list of disk configuration for vmSku which are part of SAP deployment. */
export interface SAPDiskConfigurationsResult {
  /** The disk configuration for the db volume. For HANA, Required volumes are: ['hana/data', 'hana/log', hana/shared', 'usr/sap', 'os'], Optional volume : ['backup']. */
  volumeConfigurations?: Record<string, SAPDiskConfiguration>;
}

/** The SAP Disk Configuration contains 'recommended disk' details and list of supported disks detail for a volume type. */
export interface SAPDiskConfiguration {
  /** The recommended disk details for a given VM Sku. */
  recommendedConfiguration?: DiskVolumeConfiguration;
  /** The list of supported disks for a given VM Sku. */
  supportedConfigurations?: DiskDetails[];
}

/** The supported disk size details for a disk type. */
export interface DiskDetails {
  /** The type of disk sku. For example, Standard_LRS, Standard_ZRS, Premium_LRS, Premium_ZRS. */
  sku?: DiskSku;
  /** The disk size in GB. */
  sizeGB?: number;
  /** The minimum supported disk count. */
  minimumSupportedDiskCount?: number;
  /** The maximum supported disk count. */
  maximumSupportedDiskCount?: number;
  /** The disk Iops. */
  iopsReadWrite?: number;
  /** The disk provisioned throughput in MBps. */
  mbpsReadWrite?: number;
  /** The disk tier, e.g. P10, E10. */
  diskTier?: string;
}

/** The SAP request to get list of availability zones. */
export interface SAPAvailabilityZoneDetailsRequest {
  /** The geo-location where the SAP resources will be created. */
  appLocation: string;
  /** Defines the SAP Product type. */
  sapProduct: SAPProductType;
  /** The database type. Eg: HANA, DB2, etc */
  databaseType: SAPDatabaseType;
}

export function sAPAvailabilityZoneDetailsRequestSerializer(
  item: SAPAvailabilityZoneDetailsRequest,
): Record<string, unknown> {
  return {
    appLocation: item["appLocation"],
    sapProduct: item["sapProduct"],
    databaseType: item["databaseType"],
  };
}

/** The list of supported availability zone pairs which are part of SAP HA deployment. */
export interface SAPAvailabilityZoneDetailsResult {
  /** Gets the list of availability zone pairs. */
  availabilityZonePairs?: SAPAvailabilityZonePair[];
}

/** The SAP Availability Zone Pair. */
export interface SAPAvailabilityZonePair {
  /** The zone A. */
  zoneA?: number;
  /** The zone B. */
  zoneB?: number;
}

/** Alias for SAPConfigurationUnion */
export type SAPConfigurationUnion =
  | DiscoveryConfiguration
  | DeploymentConfiguration
  | DeploymentWithOSConfiguration
  | SAPConfiguration;
/** Alias for InfrastructureConfigurationUnion */
export type InfrastructureConfigurationUnion =
  | SingleServerConfiguration
  | ThreeTierConfiguration
  | InfrastructureConfiguration;
/** Alias for OSConfigurationUnion */
export type OSConfigurationUnion = WindowsConfiguration | LinuxConfiguration | OSConfiguration;
/** Alias for SingleServerCustomResourceNamesUnion */
export type SingleServerCustomResourceNamesUnion =
  | SingleServerFullResourceNames
  | SingleServerCustomResourceNames;
/** Alias for FileShareConfigurationUnion */
export type FileShareConfigurationUnion =
  | SkipFileShareConfiguration
  | CreateAndMountFileShareConfiguration
  | MountFileShareConfiguration
  | FileShareConfiguration;
/** Alias for ThreeTierCustomResourceNamesUnion */
export type ThreeTierCustomResourceNamesUnion =
  | ThreeTierFullResourceNames
  | ThreeTierCustomResourceNames;
/** Alias for SoftwareConfigurationUnion */
export type SoftwareConfigurationUnion =
  | ServiceInitiatedSoftwareConfiguration
  | SAPInstallWithoutOSConfigSoftwareConfiguration
  | ExternalInstallationSoftwareConfiguration
  | SoftwareConfiguration;
/** Alias for SAPSizingRecommendationResultUnion */
export type SAPSizingRecommendationResultUnion =
  | SingleServerRecommendationResult
  | ThreeTierRecommendationResult
  | SAPSizingRecommendationResult;
