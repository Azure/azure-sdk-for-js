// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/** Response for Volume request. */
export interface Volume extends ProxyResource {
  /** Properties of Volume. */
  properties: VolumeProperties;
}

export function volumeSerializer(item: Volume): any {
  return { properties: volumePropertiesSerializer(item["properties"]) };
}

export function volumeDeserializer(item: any): Volume {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: volumePropertiesDeserializer(item["properties"]),
  };
}

/** Volume response properties. */
export interface VolumeProperties {
  /** Unique Id of the volume in GUID format */
  readonly volumeId?: string;
  /** State of the operation on the resource. */
  creationData?: SourceCreationData;
  /** Volume size. */
  sizeGiB: number;
  /** Storage target information */
  readonly storageTarget?: IscsiTargetInfo;
  /** Information about Azure services owning the ElasticSan volume resource. */
  managedBy?: ManagedByResources[];
  /** State of the operation on the resource. */
  readonly provisioningState?: ProvisioningStates;
}

export function volumePropertiesSerializer(item: VolumeProperties): any {
  return {
    creationData: !item["creationData"]
      ? item["creationData"]
      : sourceCreationDataSerializer(item["creationData"]),
    sizeGiB: item["sizeGiB"],
    managedBy: !item["managedBy"]
      ? item["managedBy"]
      : managedByResourcesArraySerializer(item["managedBy"]),
  };
}

export function volumePropertiesDeserializer(item: any): VolumeProperties {
  return {
    volumeId: item["volumeId"],
    creationData: !item["creationData"]
      ? item["creationData"]
      : sourceCreationDataDeserializer(item["creationData"]),
    sizeGiB: item["sizeGiB"],
    storageTarget: !item["storageTarget"]
      ? item["storageTarget"]
      : iscsiTargetInfoDeserializer(item["storageTarget"]),
    managedBy: !item["managedBy"]
      ? item["managedBy"]
      : managedByResourcesArrayDeserializer(item["managedBy"]),
    provisioningState: item["provisioningState"],
  };
}

/** Data source used when creating the volume. */
export interface SourceCreationData {
  /** This enumerates the possible sources of a volume creation. */
  createSource?: VolumeCreateOption;
  /** Fully qualified resource ID for the resource. E.g. "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName}" */
  sourceId?: string;
}

export function sourceCreationDataSerializer(item: SourceCreationData): any {
  return { createSource: item["createSource"], sourceId: item["sourceId"] };
}

export function sourceCreationDataDeserializer(item: any): SourceCreationData {
  return {
    createSource: item["createSource"],
    sourceId: item["sourceId"],
  };
}

/** This enumerates the possible sources of a volume creation. */
export enum KnownVolumeCreateOption {
  /** None */
  None = "None",
  /** VolumeSnapshot */
  VolumeSnapshot = "VolumeSnapshot",
  /** DiskSnapshot */
  DiskSnapshot = "DiskSnapshot",
  /** Disk */
  Disk = "Disk",
  /** DiskRestorePoint */
  DiskRestorePoint = "DiskRestorePoint",
}

/**
 * This enumerates the possible sources of a volume creation. \
 * {@link KnownVolumeCreateOption} can be used interchangeably with VolumeCreateOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **VolumeSnapshot** \
 * **DiskSnapshot** \
 * **Disk** \
 * **DiskRestorePoint**
 */
export type VolumeCreateOption = string;

/** Iscsi target information */
export interface IscsiTargetInfo {
  /** iSCSI Target IQN (iSCSI Qualified Name); example: "iqn.2005-03.org.iscsi:server". */
  readonly targetIqn?: string;
  /** iSCSI Target Portal Host Name */
  readonly targetPortalHostname?: string;
  /** iSCSI Target Portal Port */
  readonly targetPortalPort?: number;
  /** State of the operation on the resource. */
  readonly provisioningState?: ProvisioningStates;
  /** Operational status of the iSCSI Target. */
  status?: OperationalStatus;
}

export function iscsiTargetInfoDeserializer(item: any): IscsiTargetInfo {
  return {
    targetIqn: item["targetIqn"],
    targetPortalHostname: item["targetPortalHostname"],
    targetPortalPort: item["targetPortalPort"],
    provisioningState: item["provisioningState"],
    status: item["status"],
  };
}

/** Provisioning state of the iSCSI Target. */
export enum KnownProvisioningStates {
  /** Invalid */
  Invalid = "Invalid",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Pending */
  Pending = "Pending",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Deleted */
  Deleted = "Deleted",
  /** Restoring */
  Restoring = "Restoring",
  /** SoftDeleting */
  SoftDeleting = "SoftDeleting",
}

/**
 * Provisioning state of the iSCSI Target. \
 * {@link KnownProvisioningStates} can be used interchangeably with ProvisioningStates,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Pending** \
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Deleted** \
 * **Restoring** \
 * **SoftDeleting**
 */
export type ProvisioningStates = string;

/** Operational status of the resource. */
export enum KnownOperationalStatus {
  /** Invalid */
  Invalid = "Invalid",
  /** Unknown */
  Unknown = "Unknown",
  /** Healthy */
  Healthy = "Healthy",
  /** Unhealthy */
  Unhealthy = "Unhealthy",
  /** Updating */
  Updating = "Updating",
  /** Running */
  Running = "Running",
  /** Stopped */
  Stopped = "Stopped",
  /** Stopped (deallocated) */
  StoppedDeallocated = "Stopped (deallocated)",
}

/**
 * Operational status of the resource. \
 * {@link KnownOperationalStatus} can be used interchangeably with OperationalStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Unknown** \
 * **Healthy** \
 * **Unhealthy** \
 * **Updating** \
 * **Running** \
 * **Stopped** \
 * **Stopped (deallocated)**
 */
export type OperationalStatus = string;

export function managedByResourcesArraySerializer(result: Array<ManagedByResources>): any[] {
  return result.map((item) => {
    return managedByResourcesSerializer(item);
  });
}

export function managedByResourcesArrayDeserializer(result: Array<ManagedByResources>): any[] {
  return result.map((item) => {
    return managedByResourcesDeserializer(item);
  });
}

/** Information about Azure services owning the ElasticSan volume resource. */
export interface ManagedByResources {
  /** ClientId of the application managing the resource */
  clientId?: string;
  /** Version number to keep track of resources using the Volume */
  version?: number;
  /** ARM Resource IDs of the resources managing the volume */
  resourceIds?: string[];
}

export function managedByResourcesSerializer(item: ManagedByResources): any {
  return {
    clientId: item["clientId"],
    version: item["version"],
    resourceIds: !item["resourceIds"]
      ? item["resourceIds"]
      : item["resourceIds"].map((p: any) => {
          return p;
        }),
  };
}

export function managedByResourcesDeserializer(item: any): ManagedByResources {
  return {
    clientId: item["clientId"],
    version: item["version"],
    resourceIds: !item["resourceIds"]
      ? item["resourceIds"]
      : item["resourceIds"].map((p: any) => {
          return p;
        }),
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

/** Response for ElasticSan request. */
export interface ElasticSan extends TrackedResource {
  /** Properties of ElasticSan. */
  properties: ElasticSanProperties;
}

export function elasticSanSerializer(item: ElasticSan): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: elasticSanPropertiesSerializer(item["properties"]),
  };
}

export function elasticSanDeserializer(item: any): ElasticSan {
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
    properties: elasticSanPropertiesDeserializer(item["properties"]),
  };
}

/** Elastic San response properties. */
export interface ElasticSanProperties {
  /** resource sku */
  sku: Sku;
  /** Logical zone for Elastic San resource; example: ["1"]. */
  availabilityZones?: string[];
  /** State of the operation on the resource. */
  readonly provisioningState?: ProvisioningStates;
  /** Base size of the Elastic San appliance in TiB. */
  baseSizeTiB?: number;
  /** Extended size of the Elastic San appliance in TiB. */
  extendedCapacitySizeTiB?: number;
  /** Total size of the provisioned Volumes in GiB. */
  readonly totalVolumeSizeGiB?: number;
  /** Total number of volume groups in this Elastic San appliance. */
  readonly volumeGroupCount?: number;
  /** Total Provisioned IOPS of the Elastic San appliance. Settable only for ElasticSanVersion V2, where it is required; read-only for V1. */
  totalIops?: number;
  /** Total Provisioned MBps Elastic San appliance. Settable only for ElasticSanVersion V2, where it is required; read-only for V1. */
  totalMBps?: number;
  /** Total size of the Elastic San appliance in TB. Settable only for ElasticSanVersion V2, where it is required; read-only for V1. */
  totalSizeTiB?: number;
  /** The list of Private Endpoint Connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Allow or disallow public network access to ElasticSan. Value is optional but if passed in, must be 'Enabled' or 'Disabled'. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Auto Scale Properties for Elastic San Appliance. */
  autoScaleProperties?: AutoScaleProperties;
  /** Elastic San appliance version. Defaults to V1 if not specified. */
  version?: ElasticSanVersion;
  /** Used capacity in GiB. */
  readonly usedCapacityGiB?: number;
  /** Total IOPS reserved by all the volume groups under an ElasticSan */
  readonly totalReservedIops?: number;
  /** Total MBps reserved by all the volume groups under an ElasticSan */
  readonly totalReservedMBps?: number;
}

export function elasticSanPropertiesSerializer(item: ElasticSanProperties): any {
  return {
    sku: skuSerializer(item["sku"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    baseSizeTiB: item["baseSizeTiB"],
    extendedCapacitySizeTiB: item["extendedCapacitySizeTiB"],
    totalIops: item["totalIops"],
    totalMBps: item["totalMBps"],
    totalSizeTiB: item["totalSizeTiB"],
    publicNetworkAccess: item["publicNetworkAccess"],
    autoScaleProperties: !item["autoScaleProperties"]
      ? item["autoScaleProperties"]
      : autoScalePropertiesSerializer(item["autoScaleProperties"]),
    version: item["version"],
  };
}

export function elasticSanPropertiesDeserializer(item: any): ElasticSanProperties {
  return {
    sku: skuDeserializer(item["sku"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    baseSizeTiB: item["baseSizeTiB"],
    extendedCapacitySizeTiB: item["extendedCapacitySizeTiB"],
    totalVolumeSizeGiB: item["totalVolumeSizeGiB"],
    volumeGroupCount: item["volumeGroupCount"],
    totalIops: item["totalIops"],
    totalMBps: item["totalMBps"],
    totalSizeTiB: item["totalSizeTiB"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    autoScaleProperties: !item["autoScaleProperties"]
      ? item["autoScaleProperties"]
      : autoScalePropertiesDeserializer(item["autoScaleProperties"]),
    version: item["version"],
    usedCapacityGiB: item["usedCapacityGiB"],
    totalReservedIops: item["totalReservedIops"],
    totalReservedMBps: item["totalReservedMBps"],
  };
}

/** The SKU name. Required for account creation; optional for update. */
export interface Sku {
  /** The sku name. */
  name: SkuName;
  /** The sku tier. */
  tier?: SkuTier;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"], tier: item["tier"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** The sku name. */
export enum KnownSkuName {
  /** Premium locally redundant storage */
  PremiumLRS = "Premium_LRS",
  /** Premium zone redundant storage */
  PremiumZRS = "Premium_ZRS",
  /** Locally redundant storage. Supported only for ElasticSanVersion V2. */
  ElasticSANLRS = "ElasticSAN_LRS",
}

/**
 * The sku name. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Premium_LRS**: Premium locally redundant storage \
 * **Premium_ZRS**: Premium zone redundant storage \
 * **ElasticSAN_LRS**: Locally redundant storage. Supported only for ElasticSanVersion V2.
 */
export type SkuName = string;

/** The sku tier. */
export enum KnownSkuTier {
  /** Premium Tier */
  Premium = "Premium",
}

/**
 * The sku tier. \
 * {@link KnownSkuTier} can be used interchangeably with SkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Premium**: Premium Tier
 */
export type SkuTier = string;

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

/** Response for PrivateEndpoint Connection object */
export interface PrivateEndpointConnection extends ProxyResource {
  /** Private Endpoint Connection Properties. */
  properties: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return { properties: privateEndpointConnectionPropertiesSerializer(item["properties"]) };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: privateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Response for PrivateEndpoint connection properties */
export interface PrivateEndpointConnectionProperties {
  /** Provisioning State of Private Endpoint connection resource */
  readonly provisioningState?: ProvisioningStates;
  /** Private Endpoint resource */
  privateEndpoint?: PrivateEndpoint;
  /** Private Link Service Connection State. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** List of resources private endpoint is mapped */
  groupIds?: string[];
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
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Response for PrivateEndpoint */
export interface PrivateEndpoint {
  /** The ARM identifier for Private Endpoint */
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

/** Response for Private Link Service Connection state */
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
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Failed */
  Failed = "Failed",
  /** Rejected */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Failed** \
 * **Rejected**
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** Allow or disallow public network access to ElasticSan. Value is optional but if passed in, must be 'Enabled' or 'Disabled'. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Allow or disallow public network access to ElasticSan. Value is optional but if passed in, must be 'Enabled' or 'Disabled'. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PublicNetworkAccess = string;

/** The auto scale settings on Elastic San Appliance. */
export interface AutoScaleProperties {
  /** Scale up settings on Elastic San Appliance. */
  scaleUpProperties?: ScaleUpProperties;
}

export function autoScalePropertiesSerializer(item: AutoScaleProperties): any {
  return {
    scaleUpProperties: !item["scaleUpProperties"]
      ? item["scaleUpProperties"]
      : scaleUpPropertiesSerializer(item["scaleUpProperties"]),
  };
}

export function autoScalePropertiesDeserializer(item: any): AutoScaleProperties {
  return {
    scaleUpProperties: !item["scaleUpProperties"]
      ? item["scaleUpProperties"]
      : scaleUpPropertiesDeserializer(item["scaleUpProperties"]),
  };
}

/** Scale up properties on Elastic San Appliance. */
export interface ScaleUpProperties {
  /** Unused size on Elastic San appliance in TiB. */
  unusedSizeTiB?: number;
  /** Unit to increase Capacity Unit on Elastic San appliance in TiB. */
  increaseCapacityUnitByTiB?: number;
  /** Maximum scale up size on Elastic San appliance in TiB. */
  capacityUnitScaleUpLimitTiB?: number;
  /** Enable or Disable scale up setting on Elastic San Appliance. */
  autoScalePolicyEnforcement?: AutoScalePolicyEnforcement;
}

export function scaleUpPropertiesSerializer(item: ScaleUpProperties): any {
  return {
    unusedSizeTiB: item["unusedSizeTiB"],
    increaseCapacityUnitByTiB: item["increaseCapacityUnitByTiB"],
    capacityUnitScaleUpLimitTiB: item["capacityUnitScaleUpLimitTiB"],
    autoScalePolicyEnforcement: item["autoScalePolicyEnforcement"],
  };
}

export function scaleUpPropertiesDeserializer(item: any): ScaleUpProperties {
  return {
    unusedSizeTiB: item["unusedSizeTiB"],
    increaseCapacityUnitByTiB: item["increaseCapacityUnitByTiB"],
    capacityUnitScaleUpLimitTiB: item["capacityUnitScaleUpLimitTiB"],
    autoScalePolicyEnforcement: item["autoScalePolicyEnforcement"],
  };
}

/** Enable or Disable scale up setting on Elastic San Appliance. */
export enum KnownAutoScalePolicyEnforcement {
  /** None */
  None = "None",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Enable or Disable scale up setting on Elastic San Appliance. \
 * {@link KnownAutoScalePolicyEnforcement} can be used interchangeably with AutoScalePolicyEnforcement,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Enabled** \
 * **Disabled**
 */
export type AutoScalePolicyEnforcement = string;

/** Elastic San appliance version. */
export enum KnownElasticSanVersion {
  /** Version 1 of the Elastic San appliance. */
  V1 = "V1",
  /** Version 2 of the Elastic San appliance. */
  V2 = "V2",
}

/**
 * Elastic San appliance version. \
 * {@link KnownElasticSanVersion} can be used interchangeably with ElasticSanVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **V1**: Version 1 of the Elastic San appliance. \
 * **V2**: Version 2 of the Elastic San appliance.
 */
export type ElasticSanVersion = string;

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

/** Response for ElasticSan update request. */
export interface ElasticSanUpdate {
  /** Properties of ElasticSan. */
  properties?: ElasticSanUpdateProperties;
  /** Update tags */
  tags?: Record<string, string>;
}

export function elasticSanUpdateSerializer(item: ElasticSanUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : elasticSanUpdatePropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Elastic San update properties. */
export interface ElasticSanUpdateProperties {
  /** Base size of the Elastic San appliance in TiB. */
  baseSizeTiB?: number;
  /** Extended size of the Elastic San appliance in TiB. */
  extendedCapacitySizeTiB?: number;
  /** Allow or disallow public network access to ElasticSan Account. Value is optional but if passed in, must be 'Enabled' or 'Disabled'. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Auto Scale Properties for Elastic San Appliance. */
  autoScaleProperties?: AutoScaleProperties;
  /** Total Provisioned IOPS of the Elastic San appliance. Supported only for ElasticSanVersion V2. */
  totalIops?: number;
  /** Total Provisioned MBps Elastic San appliance. Supported only for ElasticSanVersion V2. */
  totalMBps?: number;
  /** Total size of the Elastic San appliance in TB. Supported only for ElasticSanVersion V2. */
  totalSizeTiB?: number;
}

export function elasticSanUpdatePropertiesSerializer(item: ElasticSanUpdateProperties): any {
  return {
    baseSizeTiB: item["baseSizeTiB"],
    extendedCapacitySizeTiB: item["extendedCapacitySizeTiB"],
    publicNetworkAccess: item["publicNetworkAccess"],
    autoScaleProperties: !item["autoScaleProperties"]
      ? item["autoScaleProperties"]
      : autoScalePropertiesSerializer(item["autoScaleProperties"]),
    totalIops: item["totalIops"],
    totalMBps: item["totalMBps"],
    totalSizeTiB: item["totalSizeTiB"],
  };
}

/** List of Elastic Sans */
export interface _ElasticSanList {
  /** The ElasticSan items on this page */
  value: ElasticSan[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _elasticSanListDeserializer(item: any): _ElasticSanList {
  return {
    value: elasticSanArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function elasticSanArraySerializer(result: Array<ElasticSan>): any[] {
  return result.map((item) => {
    return elasticSanSerializer(item);
  });
}

export function elasticSanArrayDeserializer(result: Array<ElasticSan>): any[] {
  return result.map((item) => {
    return elasticSanDeserializer(item);
  });
}

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

/** Response for Volume request. */
export interface VolumeUpdate {
  /** Properties of Volume. */
  properties?: VolumeUpdateProperties;
}

export function volumeUpdateSerializer(item: VolumeUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : volumeUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Volume response properties. */
export interface VolumeUpdateProperties {
  /** Volume size. */
  sizeGiB?: number;
  /** Information about Azure services owning the ElasticSan volume resource. */
  managedBy?: ManagedByResources[];
}

export function volumeUpdatePropertiesSerializer(item: VolumeUpdateProperties): any {
  return {
    sizeGiB: item["sizeGiB"],
    managedBy: !item["managedBy"]
      ? item["managedBy"]
      : managedByResourcesArraySerializer(item["managedBy"]),
  };
}

/** List of Volumes */
export interface _VolumeList {
  /** The Volume items on this page */
  value: Volume[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _volumeListDeserializer(item: any): _VolumeList {
  return {
    value: volumeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function volumeArraySerializer(result: Array<Volume>): any[] {
  return result.map((item) => {
    return volumeSerializer(item);
  });
}

export function volumeArrayDeserializer(result: Array<Volume>): any[] {
  return result.map((item) => {
    return volumeDeserializer(item);
  });
}

/** object to hold array of volume names */
export interface VolumeNameList {
  /** array of volume names */
  volumeNames: string[];
}

export function volumeNameListSerializer(item: VolumeNameList): any {
  return {
    volumeNames: item["volumeNames"].map((p: any) => {
      return p;
    }),
  };
}

/** response object for pre validation api */
export interface PreValidationResponse {
  /** a status value indicating success or failure of validation */
  validationStatus?: string;
}

export function preValidationResponseDeserializer(item: any): PreValidationResponse {
  return {
    validationStatus: item["validationStatus"],
  };
}

/** object to hold array of Disk Snapshot ARM IDs */
export interface DiskSnapshotList {
  /** array of DiskSnapshot ARM IDs */
  diskSnapshotIds: string[];
}

export function diskSnapshotListSerializer(item: DiskSnapshotList): any {
  return {
    diskSnapshotIds: item["diskSnapshotIds"].map((p: any) => {
      return p;
    }),
  };
}

/** Response for Volume Group request. */
export interface VolumeGroup extends ProxyResource {
  /** The identity of the resource. */
  identity?: Identity;
  /** Properties of VolumeGroup. */
  properties?: VolumeGroupProperties;
}

export function volumeGroupSerializer(item: VolumeGroup): any {
  return {
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : volumeGroupPropertiesSerializer(item["properties"]),
  };
}

export function volumeGroupDeserializer(item: any): VolumeGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : volumeGroupPropertiesDeserializer(item["properties"]),
  };
}

/** Identity for the resource. */
export interface Identity {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** The identity type. */
  type: IdentityType;
  /** Gets or sets a list of key value pairs that describe the set of User Assigned identities that will be used with this volume group. The key is the ARM resource identifier of the identity. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function identitySerializer(item: Identity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The identity type. */
export enum KnownIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * The identity type. \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **SystemAssigned** \
 * **UserAssigned**
 */
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

/** UserAssignedIdentity for the resource. */
export interface UserAssignedIdentity {
  /** The principal ID of the identity. */
  readonly principalId?: string;
  /** The client ID of the identity. */
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

/** VolumeGroup response properties. */
export interface VolumeGroupProperties {
  /** State of the operation on the resource. */
  readonly provisioningState?: ProvisioningStates;
  /** Type of storage target */
  protocolType?: StorageTargetType;
  /** Type of encryption */
  encryption?: EncryptionType;
  /** Encryption Properties describing Key Vault and Identity information */
  encryptionProperties?: EncryptionProperties;
  /** A collection of rules governing the accessibility from specific network locations. */
  networkAcls?: NetworkRuleSet;
  /** The list of Private Endpoint Connections. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** A boolean indicating whether or not Data Integrity Check is enabled */
  enforceDataIntegrityCheckForIscsi?: boolean;
  /** A boolean indicating whether or not Encryption in Transit is enabled, supported only for ISCSI protocol. */
  encryptionInTransit?: boolean;
  /** Reserved IOPS allocated for this volume group, applicable for QualityOfService PerformanceCritical only. */
  reservedIops?: number;
  /** Reserved MBps allocated for this volume group, applicable for QualityOfService PerformanceCritical only. */
  reservedMBps?: number;
  /** Quality of Service tier for the volume group, applicable for ElasticSanVersion V2 only. */
  qualityOfService?: QualityOfService;
  /** The retention policy for the soft deleted volume group and its associated resources. */
  deleteRetentionPolicy?: DeleteRetentionPolicy;
}

export function volumeGroupPropertiesSerializer(item: VolumeGroupProperties): any {
  return {
    protocolType: item["protocolType"],
    encryption: item["encryption"],
    encryptionProperties: !item["encryptionProperties"]
      ? item["encryptionProperties"]
      : encryptionPropertiesSerializer(item["encryptionProperties"]),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : networkRuleSetSerializer(item["networkAcls"]),
    enforceDataIntegrityCheckForIscsi: item["enforceDataIntegrityCheckForIscsi"],
    encryptionInTransit: item["encryptionInTransit"],
    reservedIops: item["reservedIops"],
    reservedMBps: item["reservedMBps"],
    qualityOfService: item["qualityOfService"],
    deleteRetentionPolicy: !item["deleteRetentionPolicy"]
      ? item["deleteRetentionPolicy"]
      : deleteRetentionPolicySerializer(item["deleteRetentionPolicy"]),
  };
}

export function volumeGroupPropertiesDeserializer(item: any): VolumeGroupProperties {
  return {
    provisioningState: item["provisioningState"],
    protocolType: item["protocolType"],
    encryption: item["encryption"],
    encryptionProperties: !item["encryptionProperties"]
      ? item["encryptionProperties"]
      : encryptionPropertiesDeserializer(item["encryptionProperties"]),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : networkRuleSetDeserializer(item["networkAcls"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    enforceDataIntegrityCheckForIscsi: item["enforceDataIntegrityCheckForIscsi"],
    encryptionInTransit: item["encryptionInTransit"],
    reservedIops: item["reservedIops"],
    reservedMBps: item["reservedMBps"],
    qualityOfService: item["qualityOfService"],
    deleteRetentionPolicy: !item["deleteRetentionPolicy"]
      ? item["deleteRetentionPolicy"]
      : deleteRetentionPolicyDeserializer(item["deleteRetentionPolicy"]),
  };
}

/** Storage Target type. */
export enum KnownStorageTargetType {
  /** Iscsi */
  Iscsi = "Iscsi",
  /** Direct attach storage target type. */
  DirectAttach = "DirectAttach",
  /** None */
  None = "None",
}

/**
 * Storage Target type. \
 * {@link KnownStorageTargetType} can be used interchangeably with StorageTargetType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Iscsi** \
 * **DirectAttach**: Direct attach storage target type. \
 * **None**
 */
export type StorageTargetType = string;

/** The type of key used to encrypt the data of the disk. */
export enum KnownEncryptionType {
  /** Volume is encrypted at rest with Platform managed key. It is the default encryption type. */
  EncryptionAtRestWithPlatformKey = "EncryptionAtRestWithPlatformKey",
  /** Volume is encrypted at rest with Customer managed key that can be changed and revoked by a customer. */
  EncryptionAtRestWithCustomerManagedKey = "EncryptionAtRestWithCustomerManagedKey",
}

/**
 * The type of key used to encrypt the data of the disk. \
 * {@link KnownEncryptionType} can be used interchangeably with EncryptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EncryptionAtRestWithPlatformKey**: Volume is encrypted at rest with Platform managed key. It is the default encryption type. \
 * **EncryptionAtRestWithCustomerManagedKey**: Volume is encrypted at rest with Customer managed key that can be changed and revoked by a customer.
 */
export type EncryptionType = string;

/** The encryption settings on the volume group. */
export interface EncryptionProperties {
  /** Properties provided by key vault. */
  keyVaultProperties?: KeyVaultProperties;
  /** The identity to be used with service-side encryption at rest. */
  encryptionIdentity?: EncryptionIdentity;
}

export function encryptionPropertiesSerializer(item: EncryptionProperties): any {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    identity: !item["encryptionIdentity"]
      ? item["encryptionIdentity"]
      : encryptionIdentitySerializer(item["encryptionIdentity"]),
  };
}

export function encryptionPropertiesDeserializer(item: any): EncryptionProperties {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    encryptionIdentity: !item["identity"]
      ? item["identity"]
      : encryptionIdentityDeserializer(item["identity"]),
  };
}

/** Properties of key vault. */
export interface KeyVaultProperties {
  /** The name of KeyVault key. */
  keyName?: string;
  /** The version of KeyVault key. */
  keyVersion?: string;
  /** The Uri of KeyVault. */
  keyVaultUri?: string;
  /** The object identifier of the current versioned Key Vault Key in use. */
  readonly currentVersionedKeyIdentifier?: string;
  /** Timestamp of last rotation of the Key Vault Key. */
  readonly lastKeyRotationTimestamp?: Date;
  /** This is a read only property that represents the expiration time of the current version of the customer managed key used for encryption. */
  readonly currentVersionedKeyExpirationTimestamp?: Date;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return {
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    keyVaultUri: item["keyVaultUri"],
  };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    keyVaultUri: item["keyVaultUri"],
    currentVersionedKeyIdentifier: item["currentVersionedKeyIdentifier"],
    lastKeyRotationTimestamp: !item["lastKeyRotationTimestamp"]
      ? item["lastKeyRotationTimestamp"]
      : new Date(item["lastKeyRotationTimestamp"]),
    currentVersionedKeyExpirationTimestamp: !item["currentVersionedKeyExpirationTimestamp"]
      ? item["currentVersionedKeyExpirationTimestamp"]
      : new Date(item["currentVersionedKeyExpirationTimestamp"]),
  };
}

/** Encryption identity for the volume group. */
export interface EncryptionIdentity {
  /** Resource identifier of the UserAssigned identity to be associated with server-side encryption on the volume group. */
  encryptionUserAssignedIdentity?: string;
}

export function encryptionIdentitySerializer(item: EncryptionIdentity): any {
  return { userAssignedIdentity: item["encryptionUserAssignedIdentity"] };
}

export function encryptionIdentityDeserializer(item: any): EncryptionIdentity {
  return {
    encryptionUserAssignedIdentity: item["userAssignedIdentity"],
  };
}

/** A set of rules governing the network accessibility. */
export interface NetworkRuleSet {
  /** The list of virtual network rules. */
  virtualNetworkRules?: VirtualNetworkRule[];
}

export function networkRuleSetSerializer(item: NetworkRuleSet): any {
  return {
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : virtualNetworkRuleArraySerializer(item["virtualNetworkRules"]),
  };
}

export function networkRuleSetDeserializer(item: any): NetworkRuleSet {
  return {
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : virtualNetworkRuleArrayDeserializer(item["virtualNetworkRules"]),
  };
}

export function virtualNetworkRuleArraySerializer(result: Array<VirtualNetworkRule>): any[] {
  return result.map((item) => {
    return virtualNetworkRuleSerializer(item);
  });
}

export function virtualNetworkRuleArrayDeserializer(result: Array<VirtualNetworkRule>): any[] {
  return result.map((item) => {
    return virtualNetworkRuleDeserializer(item);
  });
}

/** Virtual Network rule. */
export interface VirtualNetworkRule {
  /** Resource ID of a subnet, for example: /subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}. */
  virtualNetworkResourceId: string;
  /** The action of virtual network rule. */
  action?: Action;
}

export function virtualNetworkRuleSerializer(item: VirtualNetworkRule): any {
  return { id: item["virtualNetworkResourceId"], action: item["action"] };
}

export function virtualNetworkRuleDeserializer(item: any): VirtualNetworkRule {
  return {
    virtualNetworkResourceId: item["id"],
    action: item["action"],
  };
}

/** The action of virtual network rule. */
export enum KnownAction {
  /** Allow */
  Allow = "Allow",
}

/**
 * The action of virtual network rule. \
 * {@link KnownAction} can be used interchangeably with Action,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**
 */
export type Action = string;

/** Quality of Service tier for the volume group, applicable for ElasticSanVersion V2 only. */
export enum KnownQualityOfService {
  /** General purpose tier. */
  GeneralPurpose = "GeneralPurpose",
  /** Performance critical tier. */
  PerformanceCritical = "PerformanceCritical",
}

/**
 * Quality of Service tier for the volume group, applicable for ElasticSanVersion V2 only. \
 * {@link KnownQualityOfService} can be used interchangeably with QualityOfService,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GeneralPurpose**: General purpose tier. \
 * **PerformanceCritical**: Performance critical tier.
 */
export type QualityOfService = string;

/** Response for Delete Retention Policy object */
export interface DeleteRetentionPolicy {
  policyState?: PolicyState;
  /** The number of days to retain the resources after deletion. */
  retentionPeriodDays?: number;
}

export function deleteRetentionPolicySerializer(item: DeleteRetentionPolicy): any {
  return { policyState: item["policyState"], retentionPeriodDays: item["retentionPeriodDays"] };
}

export function deleteRetentionPolicyDeserializer(item: any): DeleteRetentionPolicy {
  return {
    policyState: item["policyState"],
    retentionPeriodDays: item["retentionPeriodDays"],
  };
}

/** Known values of {@link PolicyState} that the service accepts. */
export enum KnownPolicyState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/** Type of PolicyState */
export type PolicyState = string;

/** Volume Group request. */
export interface VolumeGroupUpdate {
  /** The identity of the resource. */
  identity?: Identity;
  /** Properties of VolumeGroup. */
  properties?: VolumeGroupUpdateProperties;
}

export function volumeGroupUpdateSerializer(item: VolumeGroupUpdate): any {
  return {
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    properties: !item["properties"]
      ? item["properties"]
      : volumeGroupUpdatePropertiesSerializer(item["properties"]),
  };
}

/** VolumeGroup response properties. */
export interface VolumeGroupUpdateProperties {
  /** Type of storage target */
  protocolType?: StorageTargetType;
  /** Type of encryption */
  encryption?: EncryptionType;
  /** Encryption Properties describing Key Vault and Identity information */
  encryptionProperties?: EncryptionProperties;
  /** A collection of rules governing the accessibility from specific network locations. */
  networkAcls?: NetworkRuleSet;
  /** A boolean indicating whether or not Data Integrity Check is enabled */
  enforceDataIntegrityCheckForIscsi?: boolean;
  /** Reserved IOPS allocated for this volume group, applicable for QualityOfService PerformanceCritical only. */
  reservedIops?: number;
  /** Reserved MBps allocated for this volume group, applicable for QualityOfService PerformanceCritical only. */
  reservedMBps?: number;
  /** The retention policy for the soft deleted volume group and its associated resources */
  deleteRetentionPolicy?: DeleteRetentionPolicy;
}

export function volumeGroupUpdatePropertiesSerializer(item: VolumeGroupUpdateProperties): any {
  return {
    protocolType: item["protocolType"],
    encryption: item["encryption"],
    encryptionProperties: !item["encryptionProperties"]
      ? item["encryptionProperties"]
      : encryptionPropertiesSerializer(item["encryptionProperties"]),
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : networkRuleSetSerializer(item["networkAcls"]),
    enforceDataIntegrityCheckForIscsi: item["enforceDataIntegrityCheckForIscsi"],
    reservedIops: item["reservedIops"],
    reservedMBps: item["reservedMBps"],
    deleteRetentionPolicy: !item["deleteRetentionPolicy"]
      ? item["deleteRetentionPolicy"]
      : deleteRetentionPolicySerializer(item["deleteRetentionPolicy"]),
  };
}

/** List of Volume Groups */
export interface _VolumeGroupList {
  /** The VolumeGroup items on this page */
  value: VolumeGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _volumeGroupListDeserializer(item: any): _VolumeGroupList {
  return {
    value: volumeGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function volumeGroupArraySerializer(result: Array<VolumeGroup>): any[] {
  return result.map((item) => {
    return volumeGroupSerializer(item);
  });
}

export function volumeGroupArrayDeserializer(result: Array<VolumeGroup>): any[] {
  return result.map((item) => {
    return volumeGroupDeserializer(item);
  });
}

/** A list of private link resources */
export interface PrivateLinkResourceListResult {
  /** Array of private link resources */
  value: PrivateLinkResource[];
  /** URI to fetch the next section of the paginated response. */
  readonly nextLink?: string;
}

export function privateLinkResourceListResultDeserializer(
  item: any,
): PrivateLinkResourceListResult {
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

/** A private link resource */
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
  /** The private link resource Private link DNS zone name. */
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

/** Response for Volume Snapshot request. */
export interface Snapshot extends ProxyResource {
  /** Properties of Volume Snapshot. */
  properties: SnapshotProperties;
}

export function snapshotSerializer(item: Snapshot): any {
  return { properties: snapshotPropertiesSerializer(item["properties"]) };
}

export function snapshotDeserializer(item: any): Snapshot {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: snapshotPropertiesDeserializer(item["properties"]),
  };
}

/** Properties for Snapshot. */
export interface SnapshotProperties {
  /** Data used when creating a volume snapshot. */
  creationData: SnapshotCreationData;
  /** State of the operation on the resource. */
  readonly provisioningState?: ProvisioningStates;
  /** Size of Source Volume */
  readonly sourceVolumeSizeGiB?: number;
  /** Source Volume Name of a snapshot */
  readonly volumeName?: string;
  /** The state of snapshot which determines the access availability of the snapshot. */
  readonly snapshotAccessState?: SnapshotAccessState;
  /** Percentage complete for the background copy of the snapshot when a snapshot is in InstantAccess state. */
  readonly completionPercent?: number;
}

export function snapshotPropertiesSerializer(item: SnapshotProperties): any {
  return { creationData: snapshotCreationDataSerializer(item["creationData"]) };
}

export function snapshotPropertiesDeserializer(item: any): SnapshotProperties {
  return {
    creationData: snapshotCreationDataDeserializer(item["creationData"]),
    provisioningState: item["provisioningState"],
    sourceVolumeSizeGiB: item["sourceVolumeSizeGiB"],
    volumeName: item["volumeName"],
    snapshotAccessState: item["snapshotAccessState"],
    completionPercent: item["completionPercent"],
  };
}

/** Data used when creating a volume snapshot. */
export interface SnapshotCreationData {
  /** Fully qualified resource ID of the volume. E.g. "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ElasticSan/elasticSans/{elasticSanName}/volumegroups/{volumeGroupName}/volumes/{volumeName}" */
  sourceId: string;
}

export function snapshotCreationDataSerializer(item: SnapshotCreationData): any {
  return { sourceId: item["sourceId"] };
}

export function snapshotCreationDataDeserializer(item: any): SnapshotCreationData {
  return {
    sourceId: item["sourceId"],
  };
}

/** The state of snapshot which determines the access availability of the snapshot. */
export enum KnownSnapshotAccessState {
  /** Default value. */
  Unknown = "Unknown",
  /** The snapshot cannot be used for restore, copy or download to offline. */
  Pending = "Pending",
  /** The snapshot can be used for restore, copy to different region, and download to offline. */
  Available = "Available",
  /** The snapshot can be used for restoring volumes with fast performance but cannot be copied or downloaded. */
  InstantAccess = "InstantAccess",
  /** The snapshot can be used for restoring volumes with fast performance, copied and downloaded. */
  AvailableWithInstantAccess = "AvailableWithInstantAccess",
}

/**
 * The state of snapshot which determines the access availability of the snapshot. \
 * {@link KnownSnapshotAccessState} can be used interchangeably with SnapshotAccessState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Default value. \
 * **Pending**: The snapshot cannot be used for restore, copy or download to offline. \
 * **Available**: The snapshot can be used for restore, copy to different region, and download to offline. \
 * **InstantAccess**: The snapshot can be used for restoring volumes with fast performance but cannot be copied or downloaded. \
 * **AvailableWithInstantAccess**: The snapshot can be used for restoring volumes with fast performance, copied and downloaded.
 */
export type SnapshotAccessState = string;

/** List of Snapshots */
export interface _SnapshotList {
  /** The Snapshot items on this page */
  value: Snapshot[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _snapshotListDeserializer(item: any): _SnapshotList {
  return {
    value: snapshotArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function snapshotArraySerializer(result: Array<Snapshot>): any[] {
  return result.map((item) => {
    return snapshotSerializer(item);
  });
}

export function snapshotArrayDeserializer(result: Array<Snapshot>): any[] {
  return result.map((item) => {
    return snapshotDeserializer(item);
  });
}

/** List of SKU Information objects */
export interface _SkuInformationList {
  /** The SkuInformation items on this page */
  readonly value: SkuInformation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _skuInformationListDeserializer(item: any): _SkuInformationList {
  return {
    value: skuInformationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function skuInformationArrayDeserializer(result: Array<SkuInformation>): any[] {
  return result.map((item) => {
    return skuInformationDeserializer(item);
  });
}

/** ElasticSAN SKU and its properties */
export interface SkuInformation {
  /** Sku Name */
  name: SkuName;
  /** Sku Tier */
  tier?: SkuTier;
  /** The type of the resource. */
  readonly resourceType?: string;
  /** The set of locations that the SKU is available. This will be supported and registered Azure Geo Regions (e.g. West US, East US, Southeast Asia, etc.). */
  readonly locations?: string[];
  /** Availability of the SKU for the location/zone */
  readonly locationInfo?: SkuLocationInfo[];
  /** The capability information in the specified SKU. */
  readonly capabilities?: SKUCapability[];
}

export function skuInformationDeserializer(item: any): SkuInformation {
  return {
    name: item["name"],
    tier: item["tier"],
    resourceType: item["resourceType"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    locationInfo: !item["locationInfo"]
      ? item["locationInfo"]
      : skuLocationInfoArrayDeserializer(item["locationInfo"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : skuCapabilityArrayDeserializer(item["capabilities"]),
  };
}

export function skuLocationInfoArrayDeserializer(result: Array<SkuLocationInfo>): any[] {
  return result.map((item) => {
    return skuLocationInfoDeserializer(item);
  });
}

/** The location info. */
export interface SkuLocationInfo {
  /** The location. */
  readonly location?: string;
  /** The zones. */
  readonly zones?: string[];
  /** Details of capabilities available in each zone. */
  readonly zoneDetails?: SkuZoneDetails[];
}

export function skuLocationInfoDeserializer(item: any): SkuLocationInfo {
  return {
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    zoneDetails: !item["zoneDetails"]
      ? item["zoneDetails"]
      : skuZoneDetailsArrayDeserializer(item["zoneDetails"]),
  };
}

export function skuZoneDetailsArrayDeserializer(result: Array<SkuZoneDetails>): any[] {
  return result.map((item) => {
    return skuZoneDetailsDeserializer(item);
  });
}

/** Details of capabilities available in each zone. */
export interface SkuZoneDetails {
  /** The zone(s). */
  readonly name?: string[];
  /** The capabilities supported in the zone(s). */
  readonly capabilities?: SKUCapability[];
}

export function skuZoneDetailsDeserializer(item: any): SkuZoneDetails {
  return {
    name: !item["name"]
      ? item["name"]
      : item["name"].map((p: any) => {
          return p;
        }),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : skuCapabilityArrayDeserializer(item["capabilities"]),
  };
}

export function skuCapabilityArrayDeserializer(result: Array<SKUCapability>): any[] {
  return result.map((item) => {
    return skuCapabilityDeserializer(item);
  });
}

/** The capability information in the specified SKU. */
export interface SKUCapability {
  /** The name of capability. */
  readonly name?: string;
  /** A string value to indicate states of given capability. */
  readonly value?: string;
}

export function skuCapabilityDeserializer(item: any): SKUCapability {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Known values of {@link x-ms-delete-snapshots} that the service accepts. */
export enum KnownXMsDeleteSnapshots {
  /** true */
  True = "true",
  /** false */
  False = "false",
}

/** Type of XMsDeleteSnapshots */
export type XMsDeleteSnapshots = string;

/** Known values of {@link x-ms-force-delete} that the service accepts. */
export enum KnownXMsForceDelete {
  /** true */
  True = "true",
  /** false */
  False = "false",
}

/** Type of XMsForceDelete */
export type XMsForceDelete = string;

/** Known values of {@link DeleteType} that the service accepts. */
export enum KnownDeleteType {
  /** permanent */
  Permanent = "permanent",
}

/** Type of DeleteType */
export type DeleteType = string;

/** Known values of {@link x-ms-access-soft-deleted-resources} that the service accepts. */
export enum KnownXMsAccessSoftDeletedResources {
  /** true */
  True = "true",
  /** false */
  False = "false",
}

/** Type of XMsAccessSoftDeletedResources */
export type XMsAccessSoftDeletedResources = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-09-01 stable API version. */
  V20250901 = "2025-09-01",
  /** The 2026-05-01-preview API version. */
  V20260501Preview = "2026-05-01-preview",
}
