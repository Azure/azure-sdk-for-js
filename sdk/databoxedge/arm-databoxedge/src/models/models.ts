// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** A device job. */
export interface Job extends ProxyResource {
  /** The current status of the job. */
  readonly status?: JobStatus;
  /** The UTC date and time at which the job started. */
  readonly startTime?: Date;
  /** The UTC date and time at which the job completed. */
  readonly endTime?: Date;
  /** The percentage of the job that is complete. */
  readonly percentComplete?: number;
  /** The error details. */
  readonly error?: JobErrorDetails;
  /** The type of the job. */
  readonly jobType?: JobType;
  /** Current stage of the update operation. */
  readonly currentStage?: UpdateOperationStage;
  /** The download progress. */
  readonly downloadProgress?: UpdateDownloadProgress;
  /** The install progress. */
  readonly installProgress?: UpdateInstallProgress;
  /** Total number of errors encountered during the refresh process. */
  readonly totalRefreshErrors?: number;
  /** Local share/remote container relative path to the error manifest file of the refresh. */
  readonly errorManifestFile?: string;
  /** ARM ID of the entity that was refreshed. */
  readonly refreshedEntityId?: string;
  /** If only subfolders need to be refreshed, then the subfolder path inside the share or container. (The path is empty if there are no subfolders.) */
  folder?: string;
}

export function jobDeserializer(item: any): Job {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"] ? item["properties"] : _jobPropertiesDeserializer(item["properties"])),
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    percentComplete: item["percentComplete"],
    error: !item["error"] ? item["error"] : jobErrorDetailsDeserializer(item["error"]),
  };
}

/** The properties for the job. */
export interface JobProperties {
  /** The type of the job. */
  readonly jobType?: JobType;
  /** Current stage of the update operation. */
  readonly currentStage?: UpdateOperationStage;
  /** The download progress. */
  readonly downloadProgress?: UpdateDownloadProgress;
  /** The install progress. */
  readonly installProgress?: UpdateInstallProgress;
  /** Total number of errors encountered during the refresh process. */
  readonly totalRefreshErrors?: number;
  /** Local share/remote container relative path to the error manifest file of the refresh. */
  readonly errorManifestFile?: string;
  /** ARM ID of the entity that was refreshed. */
  readonly refreshedEntityId?: string;
  /** If only subfolders need to be refreshed, then the subfolder path inside the share or container. (The path is empty if there are no subfolders.) */
  folder?: string;
}

export function jobPropertiesDeserializer(item: any): JobProperties {
  return {
    jobType: item["jobType"],
    currentStage: item["currentStage"],
    downloadProgress: !item["downloadProgress"]
      ? item["downloadProgress"]
      : updateDownloadProgressDeserializer(item["downloadProgress"]),
    installProgress: !item["installProgress"]
      ? item["installProgress"]
      : updateInstallProgressDeserializer(item["installProgress"]),
    totalRefreshErrors: item["totalRefreshErrors"],
    errorManifestFile: item["errorManifestFile"],
    refreshedEntityId: item["refreshedEntityId"],
    folder: item["folder"],
  };
}

/** The type of the job. */
export enum KnownJobType {
  /** Invalid */
  Invalid = "Invalid",
  /** ScanForUpdates */
  ScanForUpdates = "ScanForUpdates",
  /** DownloadUpdates */
  DownloadUpdates = "DownloadUpdates",
  /** InstallUpdates */
  InstallUpdates = "InstallUpdates",
  /** RefreshShare */
  RefreshShare = "RefreshShare",
  /** RefreshContainer */
  RefreshContainer = "RefreshContainer",
  /** Backup */
  Backup = "Backup",
  /** Restore */
  Restore = "Restore",
  /** TriggerSupportPackage */
  TriggerSupportPackage = "TriggerSupportPackage",
}

/**
 * The type of the job. \
 * {@link KnownJobType} can be used interchangeably with JobType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **ScanForUpdates** \
 * **DownloadUpdates** \
 * **InstallUpdates** \
 * **RefreshShare** \
 * **RefreshContainer** \
 * **Backup** \
 * **Restore** \
 * **TriggerSupportPackage**
 */
export type JobType = string;

/** Current stage of the update operation. */
export enum KnownUpdateOperationStage {
  /** Unknown */
  Unknown = "Unknown",
  /** Initial */
  Initial = "Initial",
  /** ScanStarted */
  ScanStarted = "ScanStarted",
  /** ScanComplete */
  ScanComplete = "ScanComplete",
  /** ScanFailed */
  ScanFailed = "ScanFailed",
  /** DownloadStarted */
  DownloadStarted = "DownloadStarted",
  /** DownloadComplete */
  DownloadComplete = "DownloadComplete",
  /** DownloadFailed */
  DownloadFailed = "DownloadFailed",
  /** InstallStarted */
  InstallStarted = "InstallStarted",
  /** InstallComplete */
  InstallComplete = "InstallComplete",
  /** InstallFailed */
  InstallFailed = "InstallFailed",
  /** RebootInitiated */
  RebootInitiated = "RebootInitiated",
  /** Success */
  Success = "Success",
  /** Failure */
  Failure = "Failure",
  /** RescanStarted */
  RescanStarted = "RescanStarted",
  /** RescanComplete */
  RescanComplete = "RescanComplete",
  /** RescanFailed */
  RescanFailed = "RescanFailed",
}

/**
 * Current stage of the update operation. \
 * {@link KnownUpdateOperationStage} can be used interchangeably with UpdateOperationStage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Initial** \
 * **ScanStarted** \
 * **ScanComplete** \
 * **ScanFailed** \
 * **DownloadStarted** \
 * **DownloadComplete** \
 * **DownloadFailed** \
 * **InstallStarted** \
 * **InstallComplete** \
 * **InstallFailed** \
 * **RebootInitiated** \
 * **Success** \
 * **Failure** \
 * **RescanStarted** \
 * **RescanComplete** \
 * **RescanFailed**
 */
export type UpdateOperationStage = string;

/** Details about the download progress of update. */
export interface UpdateDownloadProgress {
  /** The download phase. */
  readonly downloadPhase?: DownloadPhase;
  /** Percentage of completion. */
  readonly percentComplete?: number;
  /** Total bytes to download. */
  readonly totalBytesToDownload?: number;
  /** Total bytes downloaded. */
  readonly totalBytesDownloaded?: number;
  /** Number of updates to download. */
  readonly numberOfUpdatesToDownload?: number;
  /** Number of updates downloaded. */
  readonly numberOfUpdatesDownloaded?: number;
}

export function updateDownloadProgressDeserializer(item: any): UpdateDownloadProgress {
  return {
    downloadPhase: item["downloadPhase"],
    percentComplete: item["percentComplete"],
    totalBytesToDownload: item["totalBytesToDownload"],
    totalBytesDownloaded: item["totalBytesDownloaded"],
    numberOfUpdatesToDownload: item["numberOfUpdatesToDownload"],
    numberOfUpdatesDownloaded: item["numberOfUpdatesDownloaded"],
  };
}

/** The download phase. */
export enum KnownDownloadPhase {
  /** Unknown */
  Unknown = "Unknown",
  /** Initializing */
  Initializing = "Initializing",
  /** Downloading */
  Downloading = "Downloading",
  /** Verifying */
  Verifying = "Verifying",
}

/**
 * The download phase. \
 * {@link KnownDownloadPhase} can be used interchangeably with DownloadPhase,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Initializing** \
 * **Downloading** \
 * **Verifying**
 */
export type DownloadPhase = string;

/** Progress details during installation of updates. */
export interface UpdateInstallProgress {
  /** Percentage completed. */
  readonly percentComplete?: number;
  /** Number of updates to install. */
  readonly numberOfUpdatesToInstall?: number;
  /** Number of updates installed. */
  readonly numberOfUpdatesInstalled?: number;
}

export function updateInstallProgressDeserializer(item: any): UpdateInstallProgress {
  return {
    percentComplete: item["percentComplete"],
    numberOfUpdatesToInstall: item["numberOfUpdatesToInstall"],
    numberOfUpdatesInstalled: item["numberOfUpdatesInstalled"],
  };
}

/** The current status of the job. */
export enum KnownJobStatus {
  /** Invalid */
  Invalid = "Invalid",
  /** Running */
  Running = "Running",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Paused */
  Paused = "Paused",
  /** Scheduled */
  Scheduled = "Scheduled",
}

/**
 * The current status of the job. \
 * {@link KnownJobStatus} can be used interchangeably with JobStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Running** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Paused** \
 * **Scheduled**
 */
export type JobStatus = string;

/** The job error information containing the list of job errors. */
export interface JobErrorDetails {
  /** The error details. */
  readonly errorDetails?: JobErrorItem[];
  /** The code intended for programmatic access. */
  readonly code?: string;
  /** The message that describes the error in detail. */
  readonly message?: string;
}

export function jobErrorDetailsDeserializer(item: any): JobErrorDetails {
  return {
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : jobErrorItemArrayDeserializer(item["errorDetails"]),
    code: item["code"],
    message: item["message"],
  };
}

export function jobErrorItemArrayDeserializer(result: Array<JobErrorItem>): any[] {
  return result.map((item) => {
    return jobErrorItemDeserializer(item);
  });
}

/** The job error items. */
export interface JobErrorItem {
  /** The recommended actions. */
  readonly recommendations?: string[];
  /** The code intended for programmatic access. */
  readonly code?: string;
  /** The message that describes the error in detail. */
  readonly message?: string;
}

export function jobErrorItemDeserializer(item: any): JobErrorItem {
  return {
    recommendations: !item["recommendations"]
      ? item["recommendations"]
      : item["recommendations"].map((p: any) => {
          return p;
        }),
    code: item["code"],
    message: item["message"],
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

/** An error response from the service. */
export interface CloudError {
  /** The error details. */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** An error response from the service. */
export interface CloudErrorBody {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
  /** A list of additional details about the error. */
  details?: CloudErrorBody[];
}

export function cloudErrorBodyDeserializer(item: any): CloudErrorBody {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"] ? item["details"] : cloudErrorBodyArrayDeserializer(item["details"]),
  };
}

export function cloudErrorBodyArrayDeserializer(result: Array<CloudErrorBody>): any[] {
  return result.map((item) => {
    return cloudErrorBodyDeserializer(item);
  });
}

/** The network settings of a device. */
export interface NetworkSettings extends ProxyResource {
  /** The network adapter list on the device. */
  readonly networkAdapters?: NetworkAdapter[];
}

export function networkSettingsDeserializer(item: any): NetworkSettings {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _networkSettingsPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of network settings. */
export interface NetworkSettingsProperties {
  /** The network adapter list on the device. */
  readonly networkAdapters?: NetworkAdapter[];
}

export function networkSettingsPropertiesDeserializer(item: any): NetworkSettingsProperties {
  return {
    networkAdapters: !item["networkAdapters"]
      ? item["networkAdapters"]
      : networkAdapterArrayDeserializer(item["networkAdapters"]),
  };
}

export function networkAdapterArrayDeserializer(result: Array<NetworkAdapter>): any[] {
  return result.map((item) => {
    return networkAdapterDeserializer(item);
  });
}

/** Represents the networkAdapter on a device. */
export interface NetworkAdapter {
  /** Instance ID of network adapter. */
  readonly adapterId?: string;
  /** Hardware position of network adapter. */
  readonly adapterPosition?: NetworkAdapterPosition;
  /** Logical index of the adapter. */
  readonly index?: number;
  /** Node ID of the network adapter. */
  readonly nodeId?: string;
  /** Network adapter name. */
  readonly networkAdapterName?: string;
  /** Hardware label for the adapter. */
  readonly label?: string;
  /** MAC address. */
  readonly macAddress?: string;
  /** Link speed. */
  readonly linkSpeed?: number;
  /** Value indicating whether this adapter is valid. */
  readonly status?: NetworkAdapterStatus;
  /** Value indicating whether this adapter is RDMA capable. */
  rdmaStatus?: NetworkAdapterRdmaStatus;
  /** Value indicating whether this adapter has DHCP enabled. */
  dhcpStatus?: NetworkAdapterDhcpStatus;
  /** The IPv4 configuration of the network adapter. */
  readonly ipv4Configuration?: Ipv4Config;
  /** The IPv6 configuration of the network adapter. */
  readonly ipv6Configuration?: Ipv6Config;
  /** The IPv6 local address. */
  readonly ipv6LinkLocalAddress?: string;
  /** The list of DNS Servers of the device. */
  readonly dnsServers?: string[];
}

export function networkAdapterDeserializer(item: any): NetworkAdapter {
  return {
    adapterId: item["adapterId"],
    adapterPosition: !item["adapterPosition"]
      ? item["adapterPosition"]
      : networkAdapterPositionDeserializer(item["adapterPosition"]),
    index: item["index"],
    nodeId: item["nodeId"],
    networkAdapterName: item["networkAdapterName"],
    label: item["label"],
    macAddress: item["macAddress"],
    linkSpeed: item["linkSpeed"],
    status: item["status"],
    rdmaStatus: item["rdmaStatus"],
    dhcpStatus: item["dhcpStatus"],
    ipv4Configuration: !item["ipv4Configuration"]
      ? item["ipv4Configuration"]
      : ipv4ConfigDeserializer(item["ipv4Configuration"]),
    ipv6Configuration: !item["ipv6Configuration"]
      ? item["ipv6Configuration"]
      : ipv6ConfigDeserializer(item["ipv6Configuration"]),
    ipv6LinkLocalAddress: item["ipv6LinkLocalAddress"],
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
  };
}

/** The network adapter position. */
export interface NetworkAdapterPosition {
  /** The network group. */
  readonly networkGroup?: NetworkGroup;
  /** The port. */
  readonly port?: number;
}

export function networkAdapterPositionDeserializer(item: any): NetworkAdapterPosition {
  return {
    networkGroup: item["networkGroup"],
    port: item["port"],
  };
}

/** The network group. */
export enum KnownNetworkGroup {
  /** None */
  None = "None",
  /** NonRDMA */
  NonRdma = "NonRDMA",
  /** RDMA */
  Rdma = "RDMA",
}

/**
 * The network group. \
 * {@link KnownNetworkGroup} can be used interchangeably with NetworkGroup,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **NonRDMA** \
 * **RDMA**
 */
export type NetworkGroup = string;

/** Value indicating whether this adapter is valid. */
export enum KnownNetworkAdapterStatus {
  /** Inactive */
  Inactive = "Inactive",
  /** Active */
  Active = "Active",
}

/**
 * Value indicating whether this adapter is valid. \
 * {@link KnownNetworkAdapterStatus} can be used interchangeably with NetworkAdapterStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inactive** \
 * **Active**
 */
export type NetworkAdapterStatus = string;

/** Value indicating whether this adapter is RDMA capable. */
export enum KnownNetworkAdapterRdmaStatus {
  /** Incapable */
  Incapable = "Incapable",
  /** Capable */
  Capable = "Capable",
}

/**
 * Value indicating whether this adapter is RDMA capable. \
 * {@link KnownNetworkAdapterRdmaStatus} can be used interchangeably with NetworkAdapterRdmaStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Incapable** \
 * **Capable**
 */
export type NetworkAdapterRdmaStatus = string;

/** Value indicating whether this adapter has DHCP enabled. */
export enum KnownNetworkAdapterDhcpStatus {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Value indicating whether this adapter has DHCP enabled. \
 * {@link KnownNetworkAdapterDhcpStatus} can be used interchangeably with NetworkAdapterDhcpStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **Enabled**
 */
export type NetworkAdapterDhcpStatus = string;

/** Details related to the IPv4 address configuration. */
export interface Ipv4Config {
  /** The IPv4 address of the network adapter. */
  readonly ipAddress?: string;
  /** The IPv4 subnet of the network adapter. */
  readonly subnet?: string;
  /** The IPv4 gateway of the network adapter. */
  readonly gateway?: string;
}

export function ipv4ConfigDeserializer(item: any): Ipv4Config {
  return {
    ipAddress: item["ipAddress"],
    subnet: item["subnet"],
    gateway: item["gateway"],
  };
}

/** Details related to the IPv6 address configuration. */
export interface Ipv6Config {
  /** The IPv6 address of the network adapter. */
  readonly ipAddress?: string;
  /** The IPv6 prefix of the network adapter. */
  readonly prefixLength?: number;
  /** The IPv6 gateway of the network adapter. */
  readonly gateway?: string;
}

export function ipv6ConfigDeserializer(item: any): Ipv6Config {
  return {
    ipAddress: item["ipAddress"],
    prefixLength: item["prefixLength"],
    gateway: item["gateway"],
  };
}

/** The Data Box Edge/Gateway device. */
export interface DataBoxEdgeDevice extends TrackedResource {
  /** The SKU type. */
  sku?: Sku;
  /** The etag for the devices. */
  etag?: string;
  /** Msi identity of the resource */
  identity?: ResourceIdentity;
  /** The kind of the device. */
  readonly kind?: DataBoxEdgeDeviceKind;
  /** DataBoxEdge Device Properties */
  readonly systemDataPropertiesSystemData?: SystemData;
  /** The status of the Data Box Edge/Gateway device. */
  readonly dataBoxEdgeDeviceStatus?: DataBoxEdgeDeviceStatus;
  /** The Serial Number of Data Box Edge/Gateway device. */
  readonly serialNumber?: string;
  /** The Description of the Data Box Edge/Gateway device. */
  readonly description?: string;
  /** The description of the Data Box Edge/Gateway device model. */
  readonly modelDescription?: string;
  /** The type of the Data Box Edge/Gateway device. */
  readonly deviceType?: DeviceType;
  /** The Data Box Edge/Gateway device name. */
  readonly friendlyName?: string;
  /** The Data Box Edge/Gateway device culture. */
  readonly culture?: string;
  /** The Data Box Edge/Gateway device model. */
  readonly deviceModel?: string;
  /** The Data Box Edge/Gateway device software version. */
  readonly deviceSoftwareVersion?: string;
  /** The Data Box Edge/Gateway device local capacity in MB. */
  readonly deviceLocalCapacity?: number;
  /** The Data Box Edge/Gateway device timezone. */
  readonly timeZone?: string;
  /** The device software version number of the device (eg: 1.2.18105.6). */
  readonly deviceHcsVersion?: string;
  /** Type of compute roles configured. */
  readonly configuredRoleTypes?: RoleTypes[];
  /** The number of nodes in the cluster. */
  readonly nodeCount?: number;
  /** The details of the move operation on this resource. */
  readonly resourceMoveDetails?: ResourceMoveDetails;
  /** The details of Edge Profile for this resource */
  readonly edgeProfile?: EdgeProfile;
  /** The details of data-residency related properties for this resource */
  dataResidency?: DataResidency;
  /** Kubernetes Workload Profile */
  readonly kubernetesWorkloadProfile?: string;
}

export function dataBoxEdgeDeviceSerializer(item: DataBoxEdgeDevice): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["dataResidency"])
      ? undefined
      : _dataBoxEdgeDevicePropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    etag: item["etag"],
    identity: !item["identity"] ? item["identity"] : resourceIdentitySerializer(item["identity"]),
  };
}

export function dataBoxEdgeDeviceDeserializer(item: any): DataBoxEdgeDevice {
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
      : _dataBoxEdgeDevicePropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    etag: item["etag"],
    identity: !item["identity"] ? item["identity"] : resourceIdentityDeserializer(item["identity"]),
    kind: item["kind"],
  };
}

/** The properties of the Data Box Edge/Gateway device. */
export interface DataBoxEdgeDeviceProperties {
  /** DataBoxEdge Device Properties */
  readonly systemData?: SystemData;
  /** The status of the Data Box Edge/Gateway device. */
  readonly dataBoxEdgeDeviceStatus?: DataBoxEdgeDeviceStatus;
  /** The Serial Number of Data Box Edge/Gateway device. */
  readonly serialNumber?: string;
  /** The Description of the Data Box Edge/Gateway device. */
  readonly description?: string;
  /** The description of the Data Box Edge/Gateway device model. */
  readonly modelDescription?: string;
  /** The type of the Data Box Edge/Gateway device. */
  readonly deviceType?: DeviceType;
  /** The Data Box Edge/Gateway device name. */
  readonly friendlyName?: string;
  /** The Data Box Edge/Gateway device culture. */
  readonly culture?: string;
  /** The Data Box Edge/Gateway device model. */
  readonly deviceModel?: string;
  /** The Data Box Edge/Gateway device software version. */
  readonly deviceSoftwareVersion?: string;
  /** The Data Box Edge/Gateway device local capacity in MB. */
  readonly deviceLocalCapacity?: number;
  /** The Data Box Edge/Gateway device timezone. */
  readonly timeZone?: string;
  /** The device software version number of the device (eg: 1.2.18105.6). */
  readonly deviceHcsVersion?: string;
  /** Type of compute roles configured. */
  readonly configuredRoleTypes?: RoleTypes[];
  /** The number of nodes in the cluster. */
  readonly nodeCount?: number;
  /** The details of the move operation on this resource. */
  readonly resourceMoveDetails?: ResourceMoveDetails;
  /** The details of Edge Profile for this resource */
  readonly edgeProfile?: EdgeProfile;
  /** The details of data-residency related properties for this resource */
  dataResidency?: DataResidency;
  /** Kubernetes Workload Profile */
  readonly kubernetesWorkloadProfile?: string;
}

export function dataBoxEdgeDevicePropertiesSerializer(item: DataBoxEdgeDeviceProperties): any {
  return {
    dataResidency: !item["dataResidency"]
      ? item["dataResidency"]
      : dataResidencySerializer(item["dataResidency"]),
  };
}

export function dataBoxEdgeDevicePropertiesDeserializer(item: any): DataBoxEdgeDeviceProperties {
  return {
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    dataBoxEdgeDeviceStatus: item["dataBoxEdgeDeviceStatus"],
    serialNumber: item["serialNumber"],
    description: item["description"],
    modelDescription: item["modelDescription"],
    deviceType: item["deviceType"],
    friendlyName: item["friendlyName"],
    culture: item["culture"],
    deviceModel: item["deviceModel"],
    deviceSoftwareVersion: item["deviceSoftwareVersion"],
    deviceLocalCapacity: item["deviceLocalCapacity"],
    timeZone: item["timeZone"],
    deviceHcsVersion: item["deviceHcsVersion"],
    configuredRoleTypes: !item["configuredRoleTypes"]
      ? item["configuredRoleTypes"]
      : item["configuredRoleTypes"].map((p: any) => {
          return p;
        }),
    nodeCount: item["nodeCount"],
    resourceMoveDetails: !item["resourceMoveDetails"]
      ? item["resourceMoveDetails"]
      : resourceMoveDetailsDeserializer(item["resourceMoveDetails"]),
    edgeProfile: !item["edgeProfile"]
      ? item["edgeProfile"]
      : edgeProfileDeserializer(item["edgeProfile"]),
    dataResidency: !item["dataResidency"]
      ? item["dataResidency"]
      : dataResidencyDeserializer(item["dataResidency"]),
    kubernetesWorkloadProfile: item["kubernetesWorkloadProfile"],
  };
}

/** The status of the Data Box Edge/Gateway device. */
export enum KnownDataBoxEdgeDeviceStatus {
  /** ReadyToSetup */
  ReadyToSetup = "ReadyToSetup",
  /** Online */
  Online = "Online",
  /** Offline */
  Offline = "Offline",
  /** NeedsAttention */
  NeedsAttention = "NeedsAttention",
  /** Disconnected */
  Disconnected = "Disconnected",
  /** PartiallyDisconnected */
  PartiallyDisconnected = "PartiallyDisconnected",
  /** Maintenance */
  Maintenance = "Maintenance",
}

/**
 * The status of the Data Box Edge/Gateway device. \
 * {@link KnownDataBoxEdgeDeviceStatus} can be used interchangeably with DataBoxEdgeDeviceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadyToSetup** \
 * **Online** \
 * **Offline** \
 * **NeedsAttention** \
 * **Disconnected** \
 * **PartiallyDisconnected** \
 * **Maintenance**
 */
export type DataBoxEdgeDeviceStatus = string;

/** The type of the Data Box Edge/Gateway device. */
export enum KnownDeviceType {
  /** DataBoxEdgeDevice */
  DataBoxEdgeDevice = "DataBoxEdgeDevice",
}

/**
 * The type of the Data Box Edge/Gateway device. \
 * {@link KnownDeviceType} can be used interchangeably with DeviceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DataBoxEdgeDevice**
 */
export type DeviceType = string;

/** Known values of {@link RoleTypes} that the service accepts. */
export enum KnownRoleTypes {
  /** IOT */
  IOT = "IOT",
  /** ASA */
  ASA = "ASA",
  /** Functions */
  Functions = "Functions",
  /** Cognitive */
  Cognitive = "Cognitive",
  /** MEC */
  MEC = "MEC",
  /** CloudEdgeManagement */
  CloudEdgeManagement = "CloudEdgeManagement",
  /** Kubernetes */
  Kubernetes = "Kubernetes",
}

/** Type of RoleTypes */
export type RoleTypes = string;

/** Fields for tracking resource move */
export interface ResourceMoveDetails {
  /** Denotes whether move operation is in progress */
  operationInProgress?: ResourceMoveStatus;
  /** Denotes the timeout of the operation to finish */
  operationInProgressLockTimeoutInUTC?: Date;
}

export function resourceMoveDetailsDeserializer(item: any): ResourceMoveDetails {
  return {
    operationInProgress: item["operationInProgress"],
    operationInProgressLockTimeoutInUTC: !item["operationInProgressLockTimeoutInUTC"]
      ? item["operationInProgressLockTimeoutInUTC"]
      : new Date(item["operationInProgressLockTimeoutInUTC"]),
  };
}

/** Denotes whether move operation is in progress */
export enum KnownResourceMoveStatus {
  /** None */
  None = "None",
  /** ResourceMoveInProgress */
  ResourceMoveInProgress = "ResourceMoveInProgress",
  /** ResourceMoveFailed */
  ResourceMoveFailed = "ResourceMoveFailed",
}

/**
 * Denotes whether move operation is in progress \
 * {@link KnownResourceMoveStatus} can be used interchangeably with ResourceMoveStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **ResourceMoveInProgress** \
 * **ResourceMoveFailed**
 */
export type ResourceMoveStatus = string;

/** Details about Edge Profile for the resource */
export interface EdgeProfile {
  /** Edge Profile Subscription */
  subscription?: EdgeProfileSubscription;
}

export function edgeProfileDeserializer(item: any): EdgeProfile {
  return {
    subscription: !item["subscription"]
      ? item["subscription"]
      : edgeProfileSubscriptionDeserializer(item["subscription"]),
  };
}

/** Subscription details for the Edge Profile */
export interface EdgeProfileSubscription {
  /** Edge Subscription Registration ID */
  registrationId?: string;
  /** ARM ID of the subscription */
  id?: string;
  state?: SubscriptionState;
  registrationDate?: string;
  subscriptionId?: string;
  tenantId?: string;
  locationPlacementId?: string;
  quotaId?: string;
  serializedDetails?: string;
  registeredFeatures?: SubscriptionRegisteredFeatures[];
}

export function edgeProfileSubscriptionDeserializer(item: any): EdgeProfileSubscription {
  return {
    registrationId: item["registrationId"],
    id: item["id"],
    state: item["state"],
    registrationDate: item["registrationDate"],
    subscriptionId: item["subscriptionId"],
    ...(!item["properties"]
      ? item["properties"]
      : _edgeProfileSubscriptionPropertiesDeserializer(item["properties"])),
  };
}

/** Known values of {@link SubscriptionState} that the service accepts. */
export enum KnownSubscriptionState {
  /** Registered */
  Registered = "Registered",
  /** Warned */
  Warned = "Warned",
  /** Suspended */
  Suspended = "Suspended",
  /** Deleted */
  Deleted = "Deleted",
  /** Unregistered */
  Unregistered = "Unregistered",
}

/** Type of SubscriptionState */
export type SubscriptionState = string;

/** model interface SubscriptionProperties */
export interface SubscriptionProperties {
  tenantId?: string;
  locationPlacementId?: string;
  quotaId?: string;
  serializedDetails?: string;
  registeredFeatures?: SubscriptionRegisteredFeatures[];
}

export function subscriptionPropertiesDeserializer(item: any): SubscriptionProperties {
  return {
    tenantId: item["tenantId"],
    locationPlacementId: item["locationPlacementId"],
    quotaId: item["quotaId"],
    serializedDetails: item["serializedDetails"],
    registeredFeatures: !item["registeredFeatures"]
      ? item["registeredFeatures"]
      : subscriptionRegisteredFeaturesArrayDeserializer(item["registeredFeatures"]),
  };
}

export function subscriptionRegisteredFeaturesArrayDeserializer(
  result: Array<SubscriptionRegisteredFeatures>,
): any[] {
  return result.map((item) => {
    return subscriptionRegisteredFeaturesDeserializer(item);
  });
}

/** model interface SubscriptionRegisteredFeatures */
export interface SubscriptionRegisteredFeatures {
  name?: string;
  state?: string;
}

export function subscriptionRegisteredFeaturesDeserializer(
  item: any,
): SubscriptionRegisteredFeatures {
  return {
    name: item["name"],
    state: item["state"],
  };
}

/** Wraps data-residency related information for edge-resource and this should be used with ARM layer. */
export interface DataResidency {
  /** DataResidencyType enum */
  type?: DataResidencyType;
}

export function dataResidencySerializer(item: DataResidency): any {
  return { type: item["type"] };
}

export function dataResidencyDeserializer(item: any): DataResidency {
  return {
    type: item["type"],
  };
}

/** DataResidencyType enum */
export enum KnownDataResidencyType {
  /** GeoZoneReplication */
  GeoZoneReplication = "GeoZoneReplication",
  /** ZoneReplication */
  ZoneReplication = "ZoneReplication",
}

/**
 * DataResidencyType enum \
 * {@link KnownDataResidencyType} can be used interchangeably with DataResidencyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GeoZoneReplication** \
 * **ZoneReplication**
 */
export type DataResidencyType = string;

/** The SKU type. */
export interface Sku {
  /** SKU name. */
  name?: SkuName;
  /** The SKU tier. This is based on the SKU name. */
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

/** The Sku name. */
export enum KnownSkuName {
  /** Gateway */
  Gateway = "Gateway",
  /** Edge */
  Edge = "Edge",
  /** TEA_1Node */
  TEA1Node = "TEA_1Node",
  /** TEA_1Node_UPS */
  TEA1NodeUPS = "TEA_1Node_UPS",
  /** TEA_1Node_Heater */
  TEA1NodeHeater = "TEA_1Node_Heater",
  /** TEA_1Node_UPS_Heater */
  TEA1NodeUPSHeater = "TEA_1Node_UPS_Heater",
  /** TEA_4Node_Heater */
  TEA4NodeHeater = "TEA_4Node_Heater",
  /** TEA_4Node_UPS_Heater */
  TEA4NodeUPSHeater = "TEA_4Node_UPS_Heater",
  /** TMA */
  TMA = "TMA",
  /** TDC */
  TDC = "TDC",
  /** TCA_Small */
  TCASmall = "TCA_Small",
  /** GPU */
  GPU = "GPU",
  /** TCA_Large */
  TCALarge = "TCA_Large",
  /** EdgeP_Base */
  EdgePBase = "EdgeP_Base",
  /** EdgeP_High */
  EdgePHigh = "EdgeP_High",
  /** EdgePR_Base */
  EdgePRBase = "EdgePR_Base",
  /** EdgePR_Base_UPS */
  EdgePRBaseUPS = "EdgePR_Base_UPS",
  /** EP2_64_1VPU_W */
  EP2641VPUW = "EP2_64_1VPU_W",
  /** EP2_128_1T4_Mx1_W */
  EP21281T4Mx1W = "EP2_128_1T4_Mx1_W",
  /** EP2_256_2T4_W */
  EP22562T4W = "EP2_256_2T4_W",
  /** EdgeMR_Mini */
  EdgeMRMini = "EdgeMR_Mini",
  /** RCA_Small */
  RCASmall = "RCA_Small",
  /** RCA_Large */
  RCALarge = "RCA_Large",
  /** RDC */
  RDC = "RDC",
  /** Management */
  Management = "Management",
  /** EP2_64_Mx1_W */
  EP264Mx1W = "EP2_64_Mx1_W",
  /** EP2_128_GPU1_Mx1_W */
  EP2128GPU1Mx1W = "EP2_128_GPU1_Mx1_W",
  /** EP2_256_GPU2_Mx1 */
  EP2256GPU2Mx1 = "EP2_256_GPU2_Mx1",
  /** EdgeMR_TCP */
  EdgeMRTCP = "EdgeMR_TCP",
}

/**
 * The Sku name. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Gateway** \
 * **Edge** \
 * **TEA_1Node** \
 * **TEA_1Node_UPS** \
 * **TEA_1Node_Heater** \
 * **TEA_1Node_UPS_Heater** \
 * **TEA_4Node_Heater** \
 * **TEA_4Node_UPS_Heater** \
 * **TMA** \
 * **TDC** \
 * **TCA_Small** \
 * **GPU** \
 * **TCA_Large** \
 * **EdgeP_Base** \
 * **EdgeP_High** \
 * **EdgePR_Base** \
 * **EdgePR_Base_UPS** \
 * **EP2_64_1VPU_W** \
 * **EP2_128_1T4_Mx1_W** \
 * **EP2_256_2T4_W** \
 * **EdgeMR_Mini** \
 * **RCA_Small** \
 * **RCA_Large** \
 * **RDC** \
 * **Management** \
 * **EP2_64_Mx1_W** \
 * **EP2_128_GPU1_Mx1_W** \
 * **EP2_256_GPU2_Mx1** \
 * **EdgeMR_TCP**
 */
export type SkuName = string;

/** The Sku tier. */
export enum KnownSkuTier {
  /** Standard */
  Standard = "Standard",
}

/**
 * The Sku tier. \
 * {@link KnownSkuTier} can be used interchangeably with SkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**
 */
export type SkuTier = string;

/** Msi identity details of the resource */
export interface ResourceIdentity {
  /** Identity type */
  type?: MsiIdentityType;
  /** Service Principal Id backing the Msi */
  readonly principalId?: string;
  /** Home Tenant Id */
  readonly tenantId?: string;
}

export function resourceIdentitySerializer(item: ResourceIdentity): any {
  return { type: item["type"] };
}

export function resourceIdentityDeserializer(item: any): ResourceIdentity {
  return {
    type: item["type"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
  };
}

/** Identity type */
export enum KnownMsiIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * Identity type \
 * {@link KnownMsiIdentityType} can be used interchangeably with MsiIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **SystemAssigned** \
 * **UserAssigned**
 */
export type MsiIdentityType = string;

/** The kind of the device. */
export enum KnownDataBoxEdgeDeviceKind {
  /** AzureDataBoxGateway */
  AzureDataBoxGateway = "AzureDataBoxGateway",
  /** AzureStackEdge */
  AzureStackEdge = "AzureStackEdge",
  /** AzureStackHub */
  AzureStackHub = "AzureStackHub",
  /** AzureModularDataCentre */
  AzureModularDataCentre = "AzureModularDataCentre",
}

/**
 * The kind of the device. \
 * {@link KnownDataBoxEdgeDeviceKind} can be used interchangeably with DataBoxEdgeDeviceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureDataBoxGateway** \
 * **AzureStackEdge** \
 * **AzureStackHub** \
 * **AzureModularDataCentre**
 */
export type DataBoxEdgeDeviceKind = string;

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

/** The Data Box Edge/Gateway device patch. */
export interface DataBoxEdgeDevicePatch {
  /** The tags attached to the Data Box Edge/Gateway resource. */
  tags?: Record<string, string>;
  /** Msi identity of the resource */
  identity?: ResourceIdentity;
  /** Edge Profile property of the Data Box Edge/Gateway device */
  edgeProfile?: EdgeProfilePatch;
}

export function dataBoxEdgeDevicePatchSerializer(item: DataBoxEdgeDevicePatch): any {
  return {
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : resourceIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, ["edgeProfile"])
      ? undefined
      : _dataBoxEdgeDevicePatchPropertiesSerializer(item),
  };
}

/** The Data Box Edge/Gateway device properties patch. */
export interface DataBoxEdgeDevicePropertiesPatch {
  /** Edge Profile property of the Data Box Edge/Gateway device */
  edgeProfile?: EdgeProfilePatch;
}

export function dataBoxEdgeDevicePropertiesPatchSerializer(
  item: DataBoxEdgeDevicePropertiesPatch,
): any {
  return {
    edgeProfile: !item["edgeProfile"]
      ? item["edgeProfile"]
      : edgeProfilePatchSerializer(item["edgeProfile"]),
  };
}

/** The Data Box Edge/Gateway Edge Profile patch. */
export interface EdgeProfilePatch {
  /** The Data Box Edge/Gateway Edge Profile Subscription patch */
  subscription?: EdgeProfileSubscriptionPatch;
}

export function edgeProfilePatchSerializer(item: EdgeProfilePatch): any {
  return {
    subscription: !item["subscription"]
      ? item["subscription"]
      : edgeProfileSubscriptionPatchSerializer(item["subscription"]),
  };
}

/** The Data Box Edge/Gateway Edge Profile Subscription patch. */
export interface EdgeProfileSubscriptionPatch {
  /** The path ID that uniquely identifies the subscription of the edge profile. */
  id?: string;
}

export function edgeProfileSubscriptionPatchSerializer(item: EdgeProfileSubscriptionPatch): any {
  return { id: item["id"] };
}

/** The collection of Data Box Edge/Gateway devices. */
export interface _DataBoxEdgeDeviceList {
  /** The DataBoxEdgeDevice items on this page */
  readonly value: DataBoxEdgeDevice[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dataBoxEdgeDeviceListDeserializer(item: any): _DataBoxEdgeDeviceList {
  return {
    value: dataBoxEdgeDeviceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataBoxEdgeDeviceArraySerializer(result: Array<DataBoxEdgeDevice>): any[] {
  return result.map((item) => {
    return dataBoxEdgeDeviceSerializer(item);
  });
}

export function dataBoxEdgeDeviceArrayDeserializer(result: Array<DataBoxEdgeDevice>): any[] {
  return result.map((item) => {
    return dataBoxEdgeDeviceDeserializer(item);
  });
}

/** Used in activation key generation flow. */
export interface GenerateCertResponse {
  /**
   * Gets or sets base64 encoded certificate raw data,
   * this is the public part needed to be uploaded to cert vault
   */
  publicKey?: string;
  /**
   * Gets or sets base64 encoded private part of the certificate,
   * needed to form the activation key
   */
  privateKey?: string;
  /** Gets or sets expiry time in UTC */
  expiryTimeInUTC?: string;
}

export function generateCertResponseDeserializer(item: any): GenerateCertResponse {
  return {
    publicKey: item["publicKey"],
    privateKey: item["privateKey"],
    expiryTimeInUTC: item["expiryTimeInUTC"],
  };
}

/** The extended Info of the Data Box Edge/Gateway device. */
export interface DataBoxEdgeDeviceExtendedInfo extends ARMBaseModel {
  /** Metadata pertaining to creation and last modification of DataBoxEdgeDevice */
  readonly systemData?: SystemData;
  /** The digital signature of encrypted certificate. */
  encryptionKeyThumbprint?: string;
  /** The public part of the encryption certificate. Client uses this to encrypt any secret. */
  encryptionKey?: string;
  /** The Resource ID of the Resource. */
  readonly resourceKey?: string;
  /** The Key Vault ARM Id for client secrets */
  clientSecretStoreId?: string;
  /** The url to access the Client Key Vault */
  clientSecretStoreUrl?: string;
  /** The name of Channel Integrity Key stored in the Client Key Vault */
  channelIntegrityKeyName?: string;
  /** The version of Channel Integrity Key stored in the Client Key Vault */
  channelIntegrityKeyVersion?: string;
  /** Key vault sync status */
  keyVaultSyncStatus?: KeyVaultSyncStatus;
  /** Device secrets, will be returned only with ODataFilter $expand=deviceSecrets */
  readonly deviceSecrets?: Record<string, Secret>;
  /** Cluster Witness Type */
  readonly clusterWitnessType?: ClusterWitnessType;
  /** The witness location of file share. */
  readonly fileShareWitnessLocation?: string;
  /** The username of file share. */
  readonly fileShareWitnessUsername?: string;
  /** The Cloud Witness Storage account name. */
  readonly cloudWitnessStorageAccountName?: string;
  /** The Container for cloud witness in the storage account. */
  readonly cloudWitnessContainerName?: string;
  /** The Azure service endpoint of the cloud witness storage account. */
  readonly cloudWitnessStorageEndpoint?: string;
}

export function dataBoxEdgeDeviceExtendedInfoDeserializer(
  item: any,
): DataBoxEdgeDeviceExtendedInfo {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _dataBoxEdgeDeviceExtendedInfoPropertiesDeserializer(item["properties"])),
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The properties of the Data Box Edge/Gateway device extended info. */
export interface DataBoxEdgeDeviceExtendedInfoProperties {
  /** The digital signature of encrypted certificate. */
  encryptionKeyThumbprint?: string;
  /** The public part of the encryption certificate. Client uses this to encrypt any secret. */
  encryptionKey?: string;
  /** The Resource ID of the Resource. */
  readonly resourceKey?: string;
  /** The Key Vault ARM Id for client secrets */
  clientSecretStoreId?: string;
  /** The url to access the Client Key Vault */
  clientSecretStoreUrl?: string;
  /** The name of Channel Integrity Key stored in the Client Key Vault */
  channelIntegrityKeyName?: string;
  /** The version of Channel Integrity Key stored in the Client Key Vault */
  channelIntegrityKeyVersion?: string;
  /** Key vault sync status */
  keyVaultSyncStatus?: KeyVaultSyncStatus;
  /** Device secrets, will be returned only with ODataFilter $expand=deviceSecrets */
  readonly deviceSecrets?: Record<string, Secret>;
  /** Cluster Witness Type */
  readonly clusterWitnessType?: ClusterWitnessType;
  /** The witness location of file share. */
  readonly fileShareWitnessLocation?: string;
  /** The username of file share. */
  readonly fileShareWitnessUsername?: string;
  /** The Cloud Witness Storage account name. */
  readonly cloudWitnessStorageAccountName?: string;
  /** The Container for cloud witness in the storage account. */
  readonly cloudWitnessContainerName?: string;
  /** The Azure service endpoint of the cloud witness storage account. */
  readonly cloudWitnessStorageEndpoint?: string;
}

export function dataBoxEdgeDeviceExtendedInfoPropertiesDeserializer(
  item: any,
): DataBoxEdgeDeviceExtendedInfoProperties {
  return {
    encryptionKeyThumbprint: item["encryptionKeyThumbprint"],
    encryptionKey: item["encryptionKey"],
    resourceKey: item["resourceKey"],
    clientSecretStoreId: item["clientSecretStoreId"],
    clientSecretStoreUrl: item["clientSecretStoreUrl"],
    channelIntegrityKeyName: item["channelIntegrityKeyName"],
    channelIntegrityKeyVersion: item["channelIntegrityKeyVersion"],
    keyVaultSyncStatus: item["keyVaultSyncStatus"],
    deviceSecrets: !item["deviceSecrets"]
      ? item["deviceSecrets"]
      : secretRecordDeserializer(item["deviceSecrets"]),
    clusterWitnessType: item["clusterWitnessType"],
    fileShareWitnessLocation: item["fileShareWitnessLocation"],
    fileShareWitnessUsername: item["fileShareWitnessUsername"],
    cloudWitnessStorageAccountName: item["cloudWitnessStorageAccountName"],
    cloudWitnessContainerName: item["cloudWitnessContainerName"],
    cloudWitnessStorageEndpoint: item["cloudWitnessStorageEndpoint"],
  };
}

/** For changing or to initiate the resync to key-vault set the status to KeyVaultSyncPending, rest of the status will not be applicable. */
export enum KnownKeyVaultSyncStatus {
  /** KeyVaultSynced */
  KeyVaultSynced = "KeyVaultSynced",
  /** KeyVaultSyncFailed */
  KeyVaultSyncFailed = "KeyVaultSyncFailed",
  /** KeyVaultNotConfigured */
  KeyVaultNotConfigured = "KeyVaultNotConfigured",
  /** KeyVaultSyncPending */
  KeyVaultSyncPending = "KeyVaultSyncPending",
  /** KeyVaultSyncing */
  KeyVaultSyncing = "KeyVaultSyncing",
  /** KeyVaultNotSynced */
  KeyVaultNotSynced = "KeyVaultNotSynced",
}

/**
 * For changing or to initiate the resync to key-vault set the status to KeyVaultSyncPending, rest of the status will not be applicable. \
 * {@link KnownKeyVaultSyncStatus} can be used interchangeably with KeyVaultSyncStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **KeyVaultSynced** \
 * **KeyVaultSyncFailed** \
 * **KeyVaultNotConfigured** \
 * **KeyVaultSyncPending** \
 * **KeyVaultSyncing** \
 * **KeyVaultNotSynced**
 */
export type KeyVaultSyncStatus = string;

export function secretRecordDeserializer(item: Record<string, any>): Record<string, Secret> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : secretDeserializer(item[key]);
  });
  return result;
}

/** Holds device secret either as a KeyVault reference or as an encrypted value. */
export interface Secret {
  /** Encrypted (using device public key) secret value. */
  encryptedSecret?: AsymmetricEncryptedSecret;
  /** Id of the Key-Vault where secret is stored (ex: secrets/AuthClientSecret/82ef4346187a4033a10d629cde07d740). */
  keyVaultId?: string;
}

export function secretDeserializer(item: any): Secret {
  return {
    encryptedSecret: !item["encryptedSecret"]
      ? item["encryptedSecret"]
      : asymmetricEncryptedSecretDeserializer(item["encryptedSecret"]),
    keyVaultId: item["keyVaultId"],
  };
}

/** Represent the secrets intended for encryption with asymmetric key pair. */
export interface AsymmetricEncryptedSecret {
  /** The value of the secret. */
  value: string;
  /** Thumbprint certificate used to encrypt \"Value\". If the value is unencrypted, it will be null. */
  encryptionCertThumbprint?: string;
  /** The algorithm used to encrypt "Value". */
  encryptionAlgorithm: EncryptionAlgorithm;
}

export function asymmetricEncryptedSecretSerializer(item: AsymmetricEncryptedSecret): any {
  return {
    value: item["value"],
    encryptionCertThumbprint: item["encryptionCertThumbprint"],
    encryptionAlgorithm: item["encryptionAlgorithm"],
  };
}

export function asymmetricEncryptedSecretDeserializer(item: any): AsymmetricEncryptedSecret {
  return {
    value: item["value"],
    encryptionCertThumbprint: item["encryptionCertThumbprint"],
    encryptionAlgorithm: item["encryptionAlgorithm"],
  };
}

/** The algorithm used to encrypt "Value". */
export enum KnownEncryptionAlgorithm {
  /** None */
  None = "None",
  /** AES256 */
  AES256 = "AES256",
  /** RSAES_PKCS1_v_1_5 */
  RsaesPkcs1V15 = "RSAES_PKCS1_v_1_5",
}

/**
 * The algorithm used to encrypt "Value". \
 * {@link KnownEncryptionAlgorithm} can be used interchangeably with EncryptionAlgorithm,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **AES256** \
 * **RSAES_PKCS1_v_1_5**
 */
export type EncryptionAlgorithm = string;

/** Cluster Witness Type */
export enum KnownClusterWitnessType {
  /** None */
  None = "None",
  /** Cloud */
  Cloud = "Cloud",
  /** FileShare */
  FileShare = "FileShare",
}

/**
 * Cluster Witness Type \
 * {@link KnownClusterWitnessType} can be used interchangeably with ClusterWitnessType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Cloud** \
 * **FileShare**
 */
export type ClusterWitnessType = string;

/** Represents the base class for all object models. */
export interface ARMBaseModel {
  /** The path ID that uniquely identifies the object. */
  readonly id?: string;
  /** The object name. */
  readonly name?: string;
  /** The hierarchical type of the object. */
  readonly type?: string;
}

export function armBaseModelSerializer(_item: ARMBaseModel): any {
  return {};
}

export function armBaseModelDeserializer(item: any): ARMBaseModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** The security settings of a device. */
export interface SecuritySettings extends ARMBaseModel {
  /** Device administrator password as an encrypted string (encrypted using RSA PKCS #1) is used to sign into the  local web UI of the device. The Actual password should have at least 8 characters that are a combination of  uppercase, lowercase, numeric, and special characters. */
  deviceAdminPassword: AsymmetricEncryptedSecret;
}

export function securitySettingsSerializer(item: SecuritySettings): any {
  return { properties: _securitySettingsPropertiesSerializer(item) };
}

/** The properties of security settings. */
export interface SecuritySettingsProperties {
  /** Device administrator password as an encrypted string (encrypted using RSA PKCS #1) is used to sign into the  local web UI of the device. The Actual password should have at least 8 characters that are a combination of  uppercase, lowercase, numeric, and special characters. */
  deviceAdminPassword: AsymmetricEncryptedSecret;
}

export function securitySettingsPropertiesSerializer(item: SecuritySettingsProperties): any {
  return { deviceAdminPassword: asymmetricEncryptedSecretSerializer(item["deviceAdminPassword"]) };
}

/** The Data Box Edge/Gateway device extended info patch. */
export interface DataBoxEdgeDeviceExtendedInfoPatch {
  /** The Key Vault ARM Id for client secrets */
  clientSecretStoreId?: string;
  /** The url to access the Client Key Vault */
  clientSecretStoreUrl?: string;
  /** The name for Channel Integrity Key stored in the Client Key Vault */
  channelIntegrityKeyName?: string;
  /** The version of Channel Integrity Key stored in the Client Key Vault */
  channelIntegrityKeyVersion?: string;
  /** For changing or to initiate the resync to key-vault set the status to KeyVaultSyncPending, rest of the status will not be applicable. */
  syncStatus?: KeyVaultSyncStatus;
}

export function dataBoxEdgeDeviceExtendedInfoPatchSerializer(
  item: DataBoxEdgeDeviceExtendedInfoPatch,
): any {
  return {
    clientSecretStoreId: item["clientSecretStoreId"],
    clientSecretStoreUrl: item["clientSecretStoreUrl"],
    channelIntegrityKeyName: item["channelIntegrityKeyName"],
    channelIntegrityKeyVersion: item["channelIntegrityKeyVersion"],
    syncStatus: item["syncStatus"],
  };
}

/** The upload certificate request. */
export interface UploadCertificateRequest {
  /** The authentication type. */
  authenticationType?: AuthenticationType;
  /** The base64 encoded certificate raw data. */
  certificate: string;
}

export function uploadCertificateRequestSerializer(item: UploadCertificateRequest): any {
  return { properties: _uploadCertificateRequestPropertiesSerializer(item) };
}

/** Raw Certificate Data. */
export interface RawCertificateData {
  /** The authentication type. */
  authenticationType?: AuthenticationType;
  /** The base64 encoded certificate raw data. */
  certificate: string;
}

export function rawCertificateDataSerializer(item: RawCertificateData): any {
  return { authenticationType: item["authenticationType"], certificate: item["certificate"] };
}

/** The authentication type. */
export enum KnownAuthenticationType {
  /** Invalid */
  Invalid = "Invalid",
  /** AzureActiveDirectory */
  AzureActiveDirectory = "AzureActiveDirectory",
}

/**
 * The authentication type. \
 * {@link KnownAuthenticationType} can be used interchangeably with AuthenticationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **AzureActiveDirectory**
 */
export type AuthenticationType = string;

/** The upload registration certificate response. */
export interface UploadCertificateResponse {
  /** Specifies authentication type. */
  authType?: AuthenticationType;
  /** The resource ID of the Data Box Edge/Gateway device. */
  readonly resourceId?: string;
  /** Azure Active Directory tenant authority. */
  readonly aadAuthority?: string;
  /** Azure Active Directory tenant ID. */
  readonly aadTenantId?: string;
  /** Azure Active Directory service principal client ID. */
  readonly servicePrincipalClientId?: string;
  /** Azure Active Directory service principal object ID. */
  readonly servicePrincipalObjectId?: string;
  /** The azure management endpoint audience. */
  readonly azureManagementEndpointAudience?: string;
  /** Identifier of the target resource that is the recipient of the requested token. */
  readonly aadAudience?: string;
}

export function uploadCertificateResponseDeserializer(item: any): UploadCertificateResponse {
  return {
    authType: item["authType"],
    resourceId: item["resourceId"],
    aadAuthority: item["aadAuthority"],
    aadTenantId: item["aadTenantId"],
    servicePrincipalClientId: item["servicePrincipalClientId"],
    servicePrincipalObjectId: item["servicePrincipalObjectId"],
    azureManagementEndpointAudience: item["azureManagementEndpointAudience"],
    aadAudience: item["aadAudience"],
  };
}

/** Details about ongoing updates and availability of updates on the device. */
export interface UpdateSummary extends ProxyResource {
  /** The current version of the device in format: 1.2.17312.13.", */
  deviceVersionNumber?: string;
  /** The current version of the device in text format. */
  friendlyDeviceVersionName?: string;
  /** The last time when a scan was done on the device. */
  deviceLastScannedDateTime?: Date;
  /** The time when the last scan job was completed (success/cancelled/failed) on the appliance. */
  lastCompletedScanJobDateTime?: Date;
  /** Time when the last scan job is successfully completed. */
  lastSuccessfulScanJobTime?: Date;
  /** The time when the last Download job was completed (success/cancelled/failed) on the appliance. */
  readonly lastCompletedDownloadJobDateTime?: Date;
  /** JobId of the last ran download job.(Can be success/cancelled/failed) */
  readonly lastCompletedDownloadJobId?: string;
  /** JobStatus of the last ran download job. */
  readonly lastDownloadJobStatus?: JobStatus;
  /** The time when the Last Install job was completed successfully on the appliance */
  lastSuccessfulInstallJobDateTime?: Date;
  /** The time when the last Install job was completed (success/cancelled/failed) on the appliance. */
  readonly lastCompletedInstallJobDateTime?: Date;
  /** JobId of the last ran install job.(Can be success/cancelled/failed) */
  readonly lastCompletedInstallJobId?: string;
  /** JobStatus of the last ran install job. */
  readonly lastInstallJobStatus?: JobStatus;
  /** The number of updates available for the current device version as per the last device scan. */
  readonly totalNumberOfUpdatesAvailable?: number;
  /** The total number of items pending download. */
  readonly totalNumberOfUpdatesPendingDownload?: number;
  /** The total number of items pending install. */
  readonly totalNumberOfUpdatesPendingInstall?: number;
  /** Indicates if updates are available and at least one of the updates needs a reboot. */
  readonly rebootBehavior?: InstallRebootBehavior;
  /** The current update operation. */
  readonly ongoingUpdateOperation?: UpdateOperation;
  /** The job ID of the download job in progress. */
  readonly inProgressDownloadJobId?: string;
  /** The job ID of the install job in progress. */
  readonly inProgressInstallJobId?: string;
  /** The time when the currently running download (if any) started. */
  readonly inProgressDownloadJobStartedDateTime?: Date;
  /** The time when the currently running install (if any) started. */
  readonly inProgressInstallJobStartedDateTime?: Date;
  /** The list of updates available for install. */
  readonly updateTitles?: string[];
  /** The list of updates available for install. */
  readonly updates?: UpdateDetails[];
  /** The total size of updates available for download in bytes. */
  readonly totalUpdateSizeInBytes?: number;
  /** The total time in Minutes */
  readonly totalTimeInMinutes?: number;
}

export function updateSummaryDeserializer(item: any): UpdateSummary {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _updateSummaryPropertiesDeserializer(item["properties"])),
  };
}

/** The device update information summary. */
export interface UpdateSummaryProperties {
  /** The current version of the device in format: 1.2.17312.13.", */
  deviceVersionNumber?: string;
  /** The current version of the device in text format. */
  friendlyDeviceVersionName?: string;
  /** The last time when a scan was done on the device. */
  deviceLastScannedDateTime?: Date;
  /** The time when the last scan job was completed (success/cancelled/failed) on the appliance. */
  lastCompletedScanJobDateTime?: Date;
  /** Time when the last scan job is successfully completed. */
  lastSuccessfulScanJobTime?: Date;
  /** The time when the last Download job was completed (success/cancelled/failed) on the appliance. */
  readonly lastCompletedDownloadJobDateTime?: Date;
  /** JobId of the last ran download job.(Can be success/cancelled/failed) */
  readonly lastCompletedDownloadJobId?: string;
  /** JobStatus of the last ran download job. */
  readonly lastDownloadJobStatus?: JobStatus;
  /** The time when the Last Install job was completed successfully on the appliance */
  lastSuccessfulInstallJobDateTime?: Date;
  /** The time when the last Install job was completed (success/cancelled/failed) on the appliance. */
  readonly lastCompletedInstallJobDateTime?: Date;
  /** JobId of the last ran install job.(Can be success/cancelled/failed) */
  readonly lastCompletedInstallJobId?: string;
  /** JobStatus of the last ran install job. */
  readonly lastInstallJobStatus?: JobStatus;
  /** The number of updates available for the current device version as per the last device scan. */
  readonly totalNumberOfUpdatesAvailable?: number;
  /** The total number of items pending download. */
  readonly totalNumberOfUpdatesPendingDownload?: number;
  /** The total number of items pending install. */
  readonly totalNumberOfUpdatesPendingInstall?: number;
  /** Indicates if updates are available and at least one of the updates needs a reboot. */
  readonly rebootBehavior?: InstallRebootBehavior;
  /** The current update operation. */
  readonly ongoingUpdateOperation?: UpdateOperation;
  /** The job ID of the download job in progress. */
  readonly inProgressDownloadJobId?: string;
  /** The job ID of the install job in progress. */
  readonly inProgressInstallJobId?: string;
  /** The time when the currently running download (if any) started. */
  readonly inProgressDownloadJobStartedDateTime?: Date;
  /** The time when the currently running install (if any) started. */
  readonly inProgressInstallJobStartedDateTime?: Date;
  /** The list of updates available for install. */
  readonly updateTitles?: string[];
  /** The list of updates available for install. */
  readonly updates?: UpdateDetails[];
  /** The total size of updates available for download in bytes. */
  readonly totalUpdateSizeInBytes?: number;
  /** The total time in Minutes */
  readonly totalTimeInMinutes?: number;
}

export function updateSummaryPropertiesDeserializer(item: any): UpdateSummaryProperties {
  return {
    deviceVersionNumber: item["deviceVersionNumber"],
    friendlyDeviceVersionName: item["friendlyDeviceVersionName"],
    deviceLastScannedDateTime: !item["deviceLastScannedDateTime"]
      ? item["deviceLastScannedDateTime"]
      : new Date(item["deviceLastScannedDateTime"]),
    lastCompletedScanJobDateTime: !item["lastCompletedScanJobDateTime"]
      ? item["lastCompletedScanJobDateTime"]
      : new Date(item["lastCompletedScanJobDateTime"]),
    lastSuccessfulScanJobTime: !item["lastSuccessfulScanJobTime"]
      ? item["lastSuccessfulScanJobTime"]
      : new Date(item["lastSuccessfulScanJobTime"]),
    lastCompletedDownloadJobDateTime: !item["lastCompletedDownloadJobDateTime"]
      ? item["lastCompletedDownloadJobDateTime"]
      : new Date(item["lastCompletedDownloadJobDateTime"]),
    lastCompletedDownloadJobId: item["lastCompletedDownloadJobId"],
    lastDownloadJobStatus: item["lastDownloadJobStatus"],
    lastSuccessfulInstallJobDateTime: !item["lastSuccessfulInstallJobDateTime"]
      ? item["lastSuccessfulInstallJobDateTime"]
      : new Date(item["lastSuccessfulInstallJobDateTime"]),
    lastCompletedInstallJobDateTime: !item["lastCompletedInstallJobDateTime"]
      ? item["lastCompletedInstallJobDateTime"]
      : new Date(item["lastCompletedInstallJobDateTime"]),
    lastCompletedInstallJobId: item["lastCompletedInstallJobId"],
    lastInstallJobStatus: item["lastInstallJobStatus"],
    totalNumberOfUpdatesAvailable: item["totalNumberOfUpdatesAvailable"],
    totalNumberOfUpdatesPendingDownload: item["totalNumberOfUpdatesPendingDownload"],
    totalNumberOfUpdatesPendingInstall: item["totalNumberOfUpdatesPendingInstall"],
    rebootBehavior: item["rebootBehavior"],
    ongoingUpdateOperation: item["ongoingUpdateOperation"],
    inProgressDownloadJobId: item["inProgressDownloadJobId"],
    inProgressInstallJobId: item["inProgressInstallJobId"],
    inProgressDownloadJobStartedDateTime: !item["inProgressDownloadJobStartedDateTime"]
      ? item["inProgressDownloadJobStartedDateTime"]
      : new Date(item["inProgressDownloadJobStartedDateTime"]),
    inProgressInstallJobStartedDateTime: !item["inProgressInstallJobStartedDateTime"]
      ? item["inProgressInstallJobStartedDateTime"]
      : new Date(item["inProgressInstallJobStartedDateTime"]),
    updateTitles: !item["updateTitles"]
      ? item["updateTitles"]
      : item["updateTitles"].map((p: any) => {
          return p;
        }),
    updates: !item["updates"] ? item["updates"] : updateDetailsArrayDeserializer(item["updates"]),
    totalUpdateSizeInBytes: item["totalUpdateSizeInBytes"],
    totalTimeInMinutes: item["totalTimeInMinutes"],
  };
}

/** Indicates if updates are available and at least one of the updates needs a reboot. */
export enum KnownInstallRebootBehavior {
  /** NeverReboots */
  NeverReboots = "NeverReboots",
  /** RequiresReboot */
  RequiresReboot = "RequiresReboot",
  /** RequestReboot */
  RequestReboot = "RequestReboot",
}

/**
 * Indicates if updates are available and at least one of the updates needs a reboot. \
 * {@link KnownInstallRebootBehavior} can be used interchangeably with InstallRebootBehavior,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NeverReboots** \
 * **RequiresReboot** \
 * **RequestReboot**
 */
export type InstallRebootBehavior = string;

/** The current update operation. */
export enum KnownUpdateOperation {
  /** None */
  None = "None",
  /** Scan */
  Scan = "Scan",
  /** Download */
  Download = "Download",
  /** Install */
  Install = "Install",
}

/**
 * The current update operation. \
 * {@link KnownUpdateOperation} can be used interchangeably with UpdateOperation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Scan** \
 * **Download** \
 * **Install**
 */
export type UpdateOperation = string;

export function updateDetailsArrayDeserializer(result: Array<UpdateDetails>): any[] {
  return result.map((item) => {
    return updateDetailsDeserializer(item);
  });
}

/** Update Specific attributes */
export interface UpdateDetails {
  /** Title of the Update */
  updateTitle?: string;
  /** Size of the update(In Bytes) */
  updateSize?: number;
  /** Type of the Update */
  updateType?: UpdateType;
  /** Target Version number */
  targetVersion?: string;
  /** Friendly Version Number */
  friendlyVersionNumber?: string;
  /** Estimated Install Time for the update */
  estimatedInstallTimeInMins?: number;
  /** Indicates if updates are available and at least one of the updates needs a reboot. */
  rebootBehavior?: InstallRebootBehavior;
  /** Impact of Installing an updateType */
  installationImpact?: InstallationImpact;
  /** Status of the update. */
  status?: UpdateStatus;
}

export function updateDetailsDeserializer(item: any): UpdateDetails {
  return {
    updateTitle: item["updateTitle"],
    updateSize: item["updateSize"],
    updateType: item["updateType"],
    targetVersion: item["targetVersion"],
    friendlyVersionNumber: item["friendlyVersionNumber"],
    estimatedInstallTimeInMins: item["estimatedInstallTimeInMins"],
    rebootBehavior: item["rebootBehavior"],
    installationImpact: item["installationImpact"],
    status: item["status"],
  };
}

/** Type of the Update */
export enum KnownUpdateType {
  /** Software */
  Software = "Software",
  /** Kubernetes */
  Kubernetes = "Kubernetes",
  /** Firmware */
  Firmware = "Firmware",
}

/**
 * Type of the Update \
 * {@link KnownUpdateType} can be used interchangeably with UpdateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Software** \
 * **Kubernetes** \
 * **Firmware**
 */
export type UpdateType = string;

/** Impact of Installing an updateType */
export enum KnownInstallationImpact {
  /** None */
  None = "None",
  /** DeviceRebooted */
  DeviceRebooted = "DeviceRebooted",
  /** KubernetesWorkloadsDown */
  KubernetesWorkloadsDown = "KubernetesWorkloadsDown",
}

/**
 * Impact of Installing an updateType \
 * {@link KnownInstallationImpact} can be used interchangeably with InstallationImpact,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **DeviceRebooted** \
 * **KubernetesWorkloadsDown**
 */
export type InstallationImpact = string;

/** Status of the update. */
export enum KnownUpdateStatus {
  /** DownloadPending */
  DownloadPending = "DownloadPending",
  /** DownloadStarted */
  DownloadStarted = "DownloadStarted",
  /** DownloadCompleted */
  DownloadCompleted = "DownloadCompleted",
  /** InstallStarted */
  InstallStarted = "InstallStarted",
  /** InstallCompleted */
  InstallCompleted = "InstallCompleted",
}

/**
 * Status of the update. \
 * {@link KnownUpdateStatus} can be used interchangeably with UpdateStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DownloadPending** \
 * **DownloadStarted** \
 * **DownloadCompleted** \
 * **InstallStarted** \
 * **InstallCompleted**
 */
export type UpdateStatus = string;

/** The list of operations supported by Microsoft.DataBoxEdge resource provider. */
export interface _OperationsList {
  /** The list of operations. */
  value: Operation[];
  /** The URL to get the next page of operations. */
  nextLink?: string;
}

export function _operationsListDeserializer(item: any): _OperationsList {
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

/** Operations. */
export interface Operation {
  /** Name of the operation. */
  name?: string;
  /** Is data action. */
  isDataAction?: boolean;
  /** Properties displayed for the operation. */
  display?: OperationDisplay;
  /** Origin of the operation. */
  origin?: string;
  /** Service specification. */
  serviceSpecification?: ServiceSpecification;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    ...(!item["properties"]
      ? item["properties"]
      : _operationPropertiesDeserializer(item["properties"])),
  };
}

/** Operation display properties. */
export interface OperationDisplay {
  /** Provider name. */
  provider?: string;
  /** The type of resource in which the operation is performed. */
  resource?: string;
  /** Operation to be performed on the resource. */
  operation?: string;
  /** Description of the operation to be performed. */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Operation properties. */
export interface OperationProperties {
  /** Service specification. */
  serviceSpecification?: ServiceSpecification;
}

export function operationPropertiesDeserializer(item: any): OperationProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** Service specification. */
export interface ServiceSpecification {
  /** Metric specification as defined by shoebox. */
  metricSpecifications?: MetricSpecificationV1[];
}

export function serviceSpecificationDeserializer(item: any): ServiceSpecification {
  return {
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : metricSpecificationV1ArrayDeserializer(item["metricSpecifications"]),
  };
}

export function metricSpecificationV1ArrayDeserializer(
  result: Array<MetricSpecificationV1>,
): any[] {
  return result.map((item) => {
    return metricSpecificationV1Deserializer(item);
  });
}

/** Metric specification version 1. */
export interface MetricSpecificationV1 {
  /** Name of the metric. */
  name?: string;
  /** Display name of the metric. */
  displayName?: string;
  /** Description of the metric to be displayed. */
  displayDescription?: string;
  /** Metric units. */
  unit?: MetricUnit;
  /** Metric aggregation type. */
  aggregationType?: MetricAggregationType;
  /** Metric dimensions, other than default dimension which is resource. */
  dimensions?: MetricDimensionV1[];
  /** Set true to fill the gaps with zero. */
  fillGapWithZero?: boolean;
  /** Metric category. */
  category?: MetricCategory;
  /** Resource name override. */
  resourceIdDimensionNameOverride?: string;
  /** Support granularity of metrics. */
  supportedTimeGrainTypes?: TimeGrain[];
  supportedAggregationTypes?: MetricAggregationType[];
}

export function metricSpecificationV1Deserializer(item: any): MetricSpecificationV1 {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    aggregationType: item["aggregationType"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricDimensionV1ArrayDeserializer(item["dimensions"]),
    fillGapWithZero: item["fillGapWithZero"],
    category: item["category"],
    resourceIdDimensionNameOverride: item["resourceIdDimensionNameOverride"],
    supportedTimeGrainTypes: !item["supportedTimeGrainTypes"]
      ? item["supportedTimeGrainTypes"]
      : item["supportedTimeGrainTypes"].map((p: any) => {
          return p;
        }),
    supportedAggregationTypes: !item["supportedAggregationTypes"]
      ? item["supportedAggregationTypes"]
      : item["supportedAggregationTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** Metric units. */
export enum KnownMetricUnit {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Percent */
  Percent = "Percent",
  /** Count */
  Count = "Count",
  /** Seconds */
  Seconds = "Seconds",
  /** Milliseconds */
  Milliseconds = "Milliseconds",
  /** Bytes */
  Bytes = "Bytes",
  /** BytesPerSecond */
  BytesPerSecond = "BytesPerSecond",
  /** CountPerSecond */
  CountPerSecond = "CountPerSecond",
}

/**
 * Metric units. \
 * {@link KnownMetricUnit} can be used interchangeably with MetricUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Percent** \
 * **Count** \
 * **Seconds** \
 * **Milliseconds** \
 * **Bytes** \
 * **BytesPerSecond** \
 * **CountPerSecond**
 */
export type MetricUnit = string;

/** Metric aggregation type. */
export enum KnownMetricAggregationType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** None */
  None = "None",
  /** Average */
  Average = "Average",
  /** Minimum */
  Minimum = "Minimum",
  /** Maximum */
  Maximum = "Maximum",
  /** Total */
  Total = "Total",
  /** Count */
  Count = "Count",
}

/**
 * Metric aggregation type. \
 * {@link KnownMetricAggregationType} can be used interchangeably with MetricAggregationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **None** \
 * **Average** \
 * **Minimum** \
 * **Maximum** \
 * **Total** \
 * **Count**
 */
export type MetricAggregationType = string;

export function metricDimensionV1ArrayDeserializer(result: Array<MetricDimensionV1>): any[] {
  return result.map((item) => {
    return metricDimensionV1Deserializer(item);
  });
}

/** Metric Dimension v1. */
export interface MetricDimensionV1 {
  /** Name of the metrics dimension. */
  name?: string;
  /** Display name of the metrics dimension. */
  displayName?: string;
  /** To be exported to shoe box. */
  toBeExportedForShoebox?: boolean;
}

export function metricDimensionV1Deserializer(item: any): MetricDimensionV1 {
  return {
    name: item["name"],
    displayName: item["displayName"],
    toBeExportedForShoebox: item["toBeExportedForShoebox"],
  };
}

/** Metric category. */
export enum KnownMetricCategory {
  /** Capacity */
  Capacity = "Capacity",
  /** Transaction */
  Transaction = "Transaction",
}

/**
 * Metric category. \
 * {@link KnownMetricCategory} can be used interchangeably with MetricCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Capacity** \
 * **Transaction**
 */
export type MetricCategory = string;

/** Known values of {@link TimeGrain} that the service accepts. */
export enum KnownTimeGrain {
  /** PT1M */
  PT1M = "PT1M",
  /** PT5M */
  PT5M = "PT5M",
  /** PT15M */
  PT15M = "PT15M",
  /** PT30M */
  PT30M = "PT30M",
  /** PT1H */
  PT1H = "PT1H",
  /** PT6H */
  PT6H = "PT6H",
  /** PT12H */
  PT12H = "PT12H",
  /** PT1D */
  PT1D = "PT1D",
}

/** Type of TimeGrain */
export type TimeGrain = string;

/** Alert on the data box edge/gateway device. */
export interface Alert extends ProxyResource {
  /** Alert title. */
  readonly title?: string;
  /** Alert type. */
  readonly alertType?: string;
  /** UTC time when the alert appeared. */
  readonly appearedAtDateTime?: Date;
  /** Alert recommendation. */
  readonly recommendation?: string;
  /** Severity of the alert. */
  readonly severity?: AlertSeverity;
  /** Error details of the alert. */
  readonly errorDetails?: AlertErrorDetails;
  /** Alert details. */
  readonly detailedInformation?: Record<string, string>;
}

export function alertDeserializer(item: any): Alert {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _alertPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of alert. */
export interface AlertProperties {
  /** Alert title. */
  readonly title?: string;
  /** Alert type. */
  readonly alertType?: string;
  /** UTC time when the alert appeared. */
  readonly appearedAtDateTime?: Date;
  /** Alert recommendation. */
  readonly recommendation?: string;
  /** Severity of the alert. */
  readonly severity?: AlertSeverity;
  /** Error details of the alert. */
  readonly errorDetails?: AlertErrorDetails;
  /** Alert details. */
  readonly detailedInformation?: Record<string, string>;
}

export function alertPropertiesDeserializer(item: any): AlertProperties {
  return {
    title: item["title"],
    alertType: item["alertType"],
    appearedAtDateTime: !item["appearedAtDateTime"]
      ? item["appearedAtDateTime"]
      : new Date(item["appearedAtDateTime"]),
    recommendation: item["recommendation"],
    severity: item["severity"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : alertErrorDetailsDeserializer(item["errorDetails"]),
    detailedInformation: !item["detailedInformation"]
      ? item["detailedInformation"]
      : Object.fromEntries(
          Object.entries(item["detailedInformation"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Severity of the alert. */
export enum KnownAlertSeverity {
  /** Informational */
  Informational = "Informational",
  /** Warning */
  Warning = "Warning",
  /** Critical */
  Critical = "Critical",
}

/**
 * Severity of the alert. \
 * {@link KnownAlertSeverity} can be used interchangeably with AlertSeverity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Informational** \
 * **Warning** \
 * **Critical**
 */
export type AlertSeverity = string;

/** Error details for the alert. */
export interface AlertErrorDetails {
  /** Error code. */
  readonly errorCode?: string;
  /** Error Message. */
  readonly errorMessage?: string;
  /** Number of occurrences. */
  readonly occurrences?: number;
}

export function alertErrorDetailsDeserializer(item: any): AlertErrorDetails {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    occurrences: item["occurrences"],
  };
}

/** Collection of alerts. */
export interface _AlertList {
  /** The Alert items on this page */
  readonly value: Alert[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _alertListDeserializer(item: any): _AlertList {
  return {
    value: alertArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function alertArrayDeserializer(result: Array<Alert>): any[] {
  return result.map((item) => {
    return alertDeserializer(item);
  });
}

/** The bandwidth schedule details. */
export interface BandwidthSchedule extends ProxyResource {
  /** The start time of the schedule in UTC. */
  start: string;
  /** The stop time of the schedule in UTC. */
  stop: string;
  /** The bandwidth rate in Mbps. */
  rateInMbps: number;
  /** The days of the week when this schedule is applicable. */
  days: DayOfWeek[];
}

export function bandwidthScheduleSerializer(item: BandwidthSchedule): any {
  return { properties: _bandwidthSchedulePropertiesSerializer(item) };
}

export function bandwidthScheduleDeserializer(item: any): BandwidthSchedule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._bandwidthSchedulePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the bandwidth schedule. */
export interface BandwidthScheduleProperties {
  /** The start time of the schedule in UTC. */
  start: string;
  /** The stop time of the schedule in UTC. */
  stop: string;
  /** The bandwidth rate in Mbps. */
  rateInMbps: number;
  /** The days of the week when this schedule is applicable. */
  days: DayOfWeek[];
}

export function bandwidthSchedulePropertiesSerializer(item: BandwidthScheduleProperties): any {
  return {
    start: item["start"],
    stop: item["stop"],
    rateInMbps: item["rateInMbps"],
    days: item["days"].map((p: any) => {
      return p;
    }),
  };
}

export function bandwidthSchedulePropertiesDeserializer(item: any): BandwidthScheduleProperties {
  return {
    start: item["start"],
    stop: item["stop"],
    rateInMbps: item["rateInMbps"],
    days: item["days"].map((p: any) => {
      return p;
    }),
  };
}

/** Known values of {@link DayOfWeek} that the service accepts. */
export enum KnownDayOfWeek {
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

/** Type of DayOfWeek */
export type DayOfWeek = string;

/** The collection of bandwidth schedules. */
export interface _BandwidthSchedulesList {
  /** The BandwidthSchedule items on this page */
  readonly value: BandwidthSchedule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _bandwidthSchedulesListDeserializer(item: any): _BandwidthSchedulesList {
  return {
    value: bandwidthScheduleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function bandwidthScheduleArraySerializer(result: Array<BandwidthSchedule>): any[] {
  return result.map((item) => {
    return bandwidthScheduleSerializer(item);
  });
}

export function bandwidthScheduleArrayDeserializer(result: Array<BandwidthSchedule>): any[] {
  return result.map((item) => {
    return bandwidthScheduleDeserializer(item);
  });
}

/** The diagnostic proactive log collection settings of a device. */
export interface DiagnosticProactiveLogCollectionSettings extends ProxyResource {
  /** Proactive diagnostic collection consent flag */
  userConsent: ProactiveDiagnosticsConsent;
}

export function diagnosticProactiveLogCollectionSettingsSerializer(
  item: DiagnosticProactiveLogCollectionSettings,
): any {
  return { properties: _diagnosticProactiveLogCollectionSettingsPropertiesSerializer(item) };
}

export function diagnosticProactiveLogCollectionSettingsDeserializer(
  item: any,
): DiagnosticProactiveLogCollectionSettings {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._diagnosticProactiveLogCollectionSettingsPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of proactive log collection settings. */
export interface ProactiveLogCollectionSettingsProperties {
  /** Proactive diagnostic collection consent flag */
  userConsent: ProactiveDiagnosticsConsent;
}

export function proactiveLogCollectionSettingsPropertiesSerializer(
  item: ProactiveLogCollectionSettingsProperties,
): any {
  return { userConsent: item["userConsent"] };
}

export function proactiveLogCollectionSettingsPropertiesDeserializer(
  item: any,
): ProactiveLogCollectionSettingsProperties {
  return {
    userConsent: item["userConsent"],
  };
}

/** Proactive diagnostic collection consent flag */
export enum KnownProactiveDiagnosticsConsent {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Proactive diagnostic collection consent flag \
 * {@link KnownProactiveDiagnosticsConsent} can be used interchangeably with ProactiveDiagnosticsConsent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type ProactiveDiagnosticsConsent = string;

/** The remote support settings of a device. */
export interface DiagnosticRemoteSupportSettings extends ProxyResource {
  /** Remote support settings list according to the RemoteApplicationType */
  remoteSupportSettingsList?: RemoteSupportSettings[];
}

export function diagnosticRemoteSupportSettingsSerializer(
  item: DiagnosticRemoteSupportSettings,
): any {
  return { properties: _diagnosticRemoteSupportSettingsPropertiesSerializer(item) };
}

export function diagnosticRemoteSupportSettingsDeserializer(
  item: any,
): DiagnosticRemoteSupportSettings {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._diagnosticRemoteSupportSettingsPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of remote support settings. */
export interface DiagnosticRemoteSupportSettingsProperties {
  /** Remote support settings list according to the RemoteApplicationType */
  remoteSupportSettingsList?: RemoteSupportSettings[];
}

export function diagnosticRemoteSupportSettingsPropertiesSerializer(
  item: DiagnosticRemoteSupportSettingsProperties,
): any {
  return {
    remoteSupportSettingsList: !item["remoteSupportSettingsList"]
      ? item["remoteSupportSettingsList"]
      : remoteSupportSettingsArraySerializer(item["remoteSupportSettingsList"]),
  };
}

export function diagnosticRemoteSupportSettingsPropertiesDeserializer(
  item: any,
): DiagnosticRemoteSupportSettingsProperties {
  return {
    remoteSupportSettingsList: !item["remoteSupportSettingsList"]
      ? item["remoteSupportSettingsList"]
      : remoteSupportSettingsArrayDeserializer(item["remoteSupportSettingsList"]),
  };
}

export function remoteSupportSettingsArraySerializer(result: Array<RemoteSupportSettings>): any[] {
  return result.map((item) => {
    return remoteSupportSettingsSerializer(item);
  });
}

export function remoteSupportSettingsArrayDeserializer(
  result: Array<RemoteSupportSettings>,
): any[] {
  return result.map((item) => {
    return remoteSupportSettingsDeserializer(item);
  });
}

/** RemoteApplicationType for which remote support settings is being modified */
export interface RemoteSupportSettings {
  /** Remote application type */
  remoteApplicationType?: RemoteApplicationType;
  /** Access level allowed for this remote application type */
  accessLevel?: AccessLevel;
  /** Expiration time stamp */
  expirationTimeStampInUTC?: Date;
}

export function remoteSupportSettingsSerializer(item: RemoteSupportSettings): any {
  return {
    remoteApplicationType: item["remoteApplicationType"],
    accessLevel: item["accessLevel"],
    expirationTimeStampInUTC: !item["expirationTimeStampInUTC"]
      ? item["expirationTimeStampInUTC"]
      : item["expirationTimeStampInUTC"].toISOString(),
  };
}

export function remoteSupportSettingsDeserializer(item: any): RemoteSupportSettings {
  return {
    remoteApplicationType: item["remoteApplicationType"],
    accessLevel: item["accessLevel"],
    expirationTimeStampInUTC: !item["expirationTimeStampInUTC"]
      ? item["expirationTimeStampInUTC"]
      : new Date(item["expirationTimeStampInUTC"]),
  };
}

/** Remote application type */
export enum KnownRemoteApplicationType {
  /** Powershell */
  Powershell = "Powershell",
  /** WAC */
  WAC = "WAC",
  /** LocalUI */
  LocalUI = "LocalUI",
  /** AllApplications */
  AllApplications = "AllApplications",
}

/**
 * Remote application type \
 * {@link KnownRemoteApplicationType} can be used interchangeably with RemoteApplicationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Powershell** \
 * **WAC** \
 * **LocalUI** \
 * **AllApplications**
 */
export type RemoteApplicationType = string;

/** Access level allowed for this remote application type */
export enum KnownAccessLevel {
  /** None */
  None = "None",
  /** ReadOnly */
  ReadOnly = "ReadOnly",
  /** ReadWrite */
  ReadWrite = "ReadWrite",
  /** FullAccess */
  FullAccess = "FullAccess",
}

/**
 * Access level allowed for this remote application type \
 * {@link KnownAccessLevel} can be used interchangeably with AccessLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **ReadOnly** \
 * **ReadWrite** \
 * **FullAccess**
 */
export type AccessLevel = string;

/** The order details. */
export interface Order extends ProxyResource {
  /** It specify the order api version. */
  readonly kind?: string;
  /** It specify the order resource id. */
  readonly orderId?: string;
  /** The contact details. */
  contactInformation?: ContactDetails;
  /** The shipping address. */
  shippingAddress?: Address;
  /** Current status of the order. */
  readonly currentStatus?: OrderStatus;
  /** List of status changes in the order. */
  readonly orderHistory?: OrderStatus[];
  /** Serial number of the device. */
  readonly serialNumber?: string;
  /** Tracking information for the package delivered to the customer whether it has an original or a replacement device. */
  readonly deliveryTrackingInfo?: TrackingInfo[];
  /** Tracking information for the package returned from the customer whether it has an original or a replacement device. */
  readonly returnTrackingInfo?: TrackingInfo[];
  /** ShipmentType of the order */
  shipmentType?: ShipmentType;
}

export function orderSerializer(item: Order): any {
  return {
    properties: areAllPropsUndefined(item, [
      "contactInformation",
      "shippingAddress",
      "shipmentType",
    ])
      ? undefined
      : _orderPropertiesSerializer(item),
  };
}

export function orderDeserializer(item: any): Order {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _orderPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** Order properties. */
export interface OrderProperties {
  /** It specify the order resource id. */
  readonly orderId?: string;
  /** The contact details. */
  contactInformation: ContactDetails;
  /** The shipping address. */
  shippingAddress?: Address;
  /** Current status of the order. */
  readonly currentStatus?: OrderStatus;
  /** List of status changes in the order. */
  readonly orderHistory?: OrderStatus[];
  /** Serial number of the device. */
  readonly serialNumber?: string;
  /** Tracking information for the package delivered to the customer whether it has an original or a replacement device. */
  readonly deliveryTrackingInfo?: TrackingInfo[];
  /** Tracking information for the package returned from the customer whether it has an original or a replacement device. */
  readonly returnTrackingInfo?: TrackingInfo[];
  /** ShipmentType of the order */
  shipmentType?: ShipmentType;
}

export function orderPropertiesSerializer(item: OrderProperties): any {
  return {
    contactInformation: contactDetailsSerializer(item["contactInformation"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : addressSerializer(item["shippingAddress"]),
    shipmentType: item["shipmentType"],
  };
}

export function orderPropertiesDeserializer(item: any): OrderProperties {
  return {
    orderId: item["orderId"],
    contactInformation: contactDetailsDeserializer(item["contactInformation"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : addressDeserializer(item["shippingAddress"]),
    currentStatus: !item["currentStatus"]
      ? item["currentStatus"]
      : orderStatusDeserializer(item["currentStatus"]),
    orderHistory: !item["orderHistory"]
      ? item["orderHistory"]
      : orderStatusArrayDeserializer(item["orderHistory"]),
    serialNumber: item["serialNumber"],
    deliveryTrackingInfo: !item["deliveryTrackingInfo"]
      ? item["deliveryTrackingInfo"]
      : trackingInfoArrayDeserializer(item["deliveryTrackingInfo"]),
    returnTrackingInfo: !item["returnTrackingInfo"]
      ? item["returnTrackingInfo"]
      : trackingInfoArrayDeserializer(item["returnTrackingInfo"]),
    shipmentType: item["shipmentType"],
  };
}

/** Contains all the contact details of the customer. */
export interface ContactDetails {
  /** The contact person name. */
  contactPerson: string;
  /** The name of the company. */
  companyName: string;
  /** The phone number. */
  phone: string;
  /** The email list. */
  emailList: string[];
}

export function contactDetailsSerializer(item: ContactDetails): any {
  return {
    contactPerson: item["contactPerson"],
    companyName: item["companyName"],
    phone: item["phone"],
    emailList: item["emailList"].map((p: any) => {
      return p;
    }),
  };
}

export function contactDetailsDeserializer(item: any): ContactDetails {
  return {
    contactPerson: item["contactPerson"],
    companyName: item["companyName"],
    phone: item["phone"],
    emailList: item["emailList"].map((p: any) => {
      return p;
    }),
  };
}

/** The shipping address of the customer. */
export interface Address {
  /** The address line1. */
  addressLine1?: string;
  /** The address line2. */
  addressLine2?: string;
  /** The address line3. */
  addressLine3?: string;
  /** The postal code. */
  postalCode?: string;
  /** The city name. */
  city?: string;
  /** The state name. */
  state?: string;
  /** The country name. */
  country: string;
}

export function addressSerializer(item: Address): any {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    postalCode: item["postalCode"],
    city: item["city"],
    state: item["state"],
    country: item["country"],
  };
}

export function addressDeserializer(item: any): Address {
  return {
    addressLine1: item["addressLine1"],
    addressLine2: item["addressLine2"],
    addressLine3: item["addressLine3"],
    postalCode: item["postalCode"],
    city: item["city"],
    state: item["state"],
    country: item["country"],
  };
}

/** Represents a single status change. */
export interface OrderStatus {
  /** Status of the order as per the allowed status types. */
  status: OrderState;
  /** Time of status update. */
  readonly updateDateTime?: Date;
  /** Comments related to this status change. */
  comments?: string;
  /** Tracking information related to the state in the ordering flow */
  readonly trackingInformation?: TrackingInfo;
  /**
   * Dictionary to hold generic information which is not stored
   * by the already existing properties
   */
  readonly additionalOrderDetails?: Record<string, string>;
}

export function orderStatusDeserializer(item: any): OrderStatus {
  return {
    status: item["status"],
    updateDateTime: !item["updateDateTime"]
      ? item["updateDateTime"]
      : new Date(item["updateDateTime"]),
    comments: item["comments"],
    trackingInformation: !item["trackingInformation"]
      ? item["trackingInformation"]
      : trackingInfoDeserializer(item["trackingInformation"]),
    additionalOrderDetails: !item["additionalOrderDetails"]
      ? item["additionalOrderDetails"]
      : Object.fromEntries(
          Object.entries(item["additionalOrderDetails"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Status of the order as per the allowed status types. */
export enum KnownOrderState {
  /** Untracked */
  Untracked = "Untracked",
  /** AwaitingFulfillment */
  AwaitingFulfillment = "AwaitingFulfillment",
  /** AwaitingPreparation */
  AwaitingPreparation = "AwaitingPreparation",
  /** AwaitingShipment */
  AwaitingShipment = "AwaitingShipment",
  /** Shipped */
  Shipped = "Shipped",
  /** Arriving */
  Arriving = "Arriving",
  /** Delivered */
  Delivered = "Delivered",
  /** ReplacementRequested */
  ReplacementRequested = "ReplacementRequested",
  /** LostDevice */
  LostDevice = "LostDevice",
  /** Declined */
  Declined = "Declined",
  /** ReturnInitiated */
  ReturnInitiated = "ReturnInitiated",
  /** AwaitingReturnShipment */
  AwaitingReturnShipment = "AwaitingReturnShipment",
  /** ShippedBack */
  ShippedBack = "ShippedBack",
  /** CollectedAtMicrosoft */
  CollectedAtMicrosoft = "CollectedAtMicrosoft",
  /** AwaitingPickup */
  AwaitingPickup = "AwaitingPickup",
  /** PickupCompleted */
  PickupCompleted = "PickupCompleted",
  /** AwaitingDrop */
  AwaitingDrop = "AwaitingDrop",
}

/**
 * Status of the order as per the allowed status types. \
 * {@link KnownOrderState} can be used interchangeably with OrderState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Untracked** \
 * **AwaitingFulfillment** \
 * **AwaitingPreparation** \
 * **AwaitingShipment** \
 * **Shipped** \
 * **Arriving** \
 * **Delivered** \
 * **ReplacementRequested** \
 * **LostDevice** \
 * **Declined** \
 * **ReturnInitiated** \
 * **AwaitingReturnShipment** \
 * **ShippedBack** \
 * **CollectedAtMicrosoft** \
 * **AwaitingPickup** \
 * **PickupCompleted** \
 * **AwaitingDrop**
 */
export type OrderState = string;

/** Tracking courier information. */
export interface TrackingInfo {
  /** Serial number of the device being tracked. */
  serialNumber?: string;
  /** Name of the carrier used in the delivery. */
  carrierName?: string;
  /** Tracking ID of the shipment. */
  trackingId?: string;
  /** Tracking URL of the shipment. */
  trackingUrl?: string;
}

export function trackingInfoDeserializer(item: any): TrackingInfo {
  return {
    serialNumber: item["serialNumber"],
    carrierName: item["carrierName"],
    trackingId: item["trackingId"],
    trackingUrl: item["trackingUrl"],
  };
}

export function orderStatusArrayDeserializer(result: Array<OrderStatus>): any[] {
  return result.map((item) => {
    return orderStatusDeserializer(item);
  });
}

export function trackingInfoArrayDeserializer(result: Array<TrackingInfo>): any[] {
  return result.map((item) => {
    return trackingInfoDeserializer(item);
  });
}

/** Known values of {@link ShipmentType} that the service accepts. */
export enum KnownShipmentType {
  /** NotApplicable */
  NotApplicable = "NotApplicable",
  /** ShippedToCustomer */
  ShippedToCustomer = "ShippedToCustomer",
  /** SelfPickup */
  SelfPickup = "SelfPickup",
}

/** Type of ShipmentType */
export type ShipmentType = string;

/** List of order entities. */
export interface _OrderList {
  /** The Order items on this page */
  readonly value: Order[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _orderListDeserializer(item: any): _OrderList {
  return {
    value: orderArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function orderArraySerializer(result: Array<Order>): any[] {
  return result.map((item) => {
    return orderSerializer(item);
  });
}

export function orderArrayDeserializer(result: Array<Order>): any[] {
  return result.map((item) => {
    return orderDeserializer(item);
  });
}

/** DC Access code in the case of Self Managed Shipping. */
export interface DCAccessCode {
  /** DCAccess Code for the Self Managed shipment. */
  authCode?: string;
}

export function dcAccessCodeDeserializer(item: any): DCAccessCode {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _dcAccessCodePropertiesDeserializer(item["properties"])),
  };
}

/** DCAccessCode Properties. */
export interface DCAccessCodeProperties {
  /** DCAccess Code for the Self Managed shipment. */
  authCode?: string;
}

export function dcAccessCodePropertiesDeserializer(item: any): DCAccessCodeProperties {
  return {
    authCode: item["authCode"],
  };
}

/** Compute role. */
export interface Role extends ProxyResource {
  /** Role type. */
  /** The discriminator possible values: CloudEdgeManagement, IOT, Kubernetes, MEC */
  kind: RoleTypes;
}

export function roleSerializer(item: Role): any {
  return { kind: item["kind"] };
}

export function roleDeserializer(item: any): Role {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
  };
}

/** Alias for RoleUnion */
export type RoleUnion = CloudEdgeManagementRole | IoTRole | KubernetesRole | MECRole | Role;

export function roleUnionSerializer(item: RoleUnion): any {
  switch (item.kind) {
    case "CloudEdgeManagement":
      return cloudEdgeManagementRoleSerializer(item as CloudEdgeManagementRole);

    case "IOT":
      return ioTRoleSerializer(item as IoTRole);

    case "Kubernetes":
      return kubernetesRoleSerializer(item as KubernetesRole);

    case "MEC":
      return mecRoleSerializer(item as MECRole);

    default:
      return roleSerializer(item);
  }
}

export function roleUnionDeserializer(item: any): RoleUnion {
  switch (item["kind"]) {
    case "CloudEdgeManagement":
      return cloudEdgeManagementRoleDeserializer(item as CloudEdgeManagementRole);

    case "IOT":
      return ioTRoleDeserializer(item as IoTRole);

    case "Kubernetes":
      return kubernetesRoleDeserializer(item as KubernetesRole);

    case "MEC":
      return mecRoleDeserializer(item as MECRole);

    default:
      return roleDeserializer(item);
  }
}

/**
 * The preview of Virtual Machine Cloud Management from the Azure supports deploying and managing VMs on your Azure Stack Edge device from Azure Portal.
 * For more information, refer to: https://docs.microsoft.com/en-us/azure/databox-online/azure-stack-edge-gpu-virtual-machine-overview
 * By using this feature, you agree to the preview legal terms. See the https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/ for additional details.
 */
export interface CloudEdgeManagementRole extends Role {
  /** Role type. */
  kind: "CloudEdgeManagement";
  /** Local Edge Management Status */
  readonly localManagementStatus?: RoleStatus;
  /** Edge Profile of the resource */
  readonly edgeProfile?: EdgeProfile;
  /** Role status. */
  roleStatus?: RoleStatus;
}

export function cloudEdgeManagementRoleSerializer(item: CloudEdgeManagementRole): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["roleStatus"])
      ? undefined
      : _cloudEdgeManagementRolePropertiesSerializer(item),
  };
}

export function cloudEdgeManagementRoleDeserializer(item: any): CloudEdgeManagementRole {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _cloudEdgeManagementRolePropertiesDeserializer(item["properties"])),
  };
}

/** CloudEdgeManagement Role properties. */
export interface CloudEdgeManagementRoleProperties {
  /** Local Edge Management Status */
  readonly localManagementStatus?: RoleStatus;
  /** Edge Profile of the resource */
  readonly edgeProfile?: EdgeProfile;
  /** Role status. */
  roleStatus: RoleStatus;
}

export function cloudEdgeManagementRolePropertiesSerializer(
  item: CloudEdgeManagementRoleProperties,
): any {
  return { roleStatus: item["roleStatus"] };
}

export function cloudEdgeManagementRolePropertiesDeserializer(
  item: any,
): CloudEdgeManagementRoleProperties {
  return {
    localManagementStatus: item["localManagementStatus"],
    edgeProfile: !item["edgeProfile"]
      ? item["edgeProfile"]
      : edgeProfileDeserializer(item["edgeProfile"]),
    roleStatus: item["roleStatus"],
  };
}

/** Local Edge Management Status */
export enum KnownRoleStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Local Edge Management Status \
 * {@link KnownRoleStatus} can be used interchangeably with RoleStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type RoleStatus = string;

/** Compute role. */
export interface IoTRole extends Role {
  /** Role type. */
  kind: "IOT";
  /** Host OS supported by the IoT role. */
  hostPlatform?: PlatformType;
  /** IoT device metadata to which data box edge device needs to be connected. */
  ioTDeviceDetails?: IoTDeviceInfo;
  /** IoT edge device to which the IoT role needs to be configured. */
  ioTEdgeDeviceDetails?: IoTDeviceInfo;
  /** Mount points of shares in role(s). */
  shareMappings?: MountPointMap[];
  /** Iot edge agent details to download the agent and bootstrap iot runtime. */
  ioTEdgeAgentInfo?: IoTEdgeAgentInfo;
  /** Platform where the Iot runtime is hosted. */
  readonly hostPlatformType?: HostPlatformType;
  /** Resource allocation */
  computeResource?: ComputeResource;
  /** Role status. */
  roleStatus?: RoleStatus;
}

export function ioTRoleSerializer(item: IoTRole): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "hostPlatform",
      "ioTDeviceDetails",
      "ioTEdgeDeviceDetails",
      "shareMappings",
      "ioTEdgeAgentInfo",
      "computeResource",
      "roleStatus",
    ])
      ? undefined
      : _ioTRolePropertiesSerializer(item),
  };
}

export function ioTRoleDeserializer(item: any): IoTRole {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _ioTRolePropertiesDeserializer(item["properties"])),
  };
}

/** IoT role properties. */
export interface IoTRoleProperties {
  /** Host OS supported by the IoT role. */
  hostPlatform: PlatformType;
  /** IoT device metadata to which data box edge device needs to be connected. */
  ioTDeviceDetails: IoTDeviceInfo;
  /** IoT edge device to which the IoT role needs to be configured. */
  ioTEdgeDeviceDetails: IoTDeviceInfo;
  /** Mount points of shares in role(s). */
  shareMappings?: MountPointMap[];
  /** Iot edge agent details to download the agent and bootstrap iot runtime. */
  ioTEdgeAgentInfo?: IoTEdgeAgentInfo;
  /** Platform where the Iot runtime is hosted. */
  readonly hostPlatformType?: HostPlatformType;
  /** Resource allocation */
  computeResource?: ComputeResource;
  /** Role status. */
  roleStatus: RoleStatus;
}

export function ioTRolePropertiesSerializer(item: IoTRoleProperties): any {
  return {
    hostPlatform: item["hostPlatform"],
    ioTDeviceDetails: ioTDeviceInfoSerializer(item["ioTDeviceDetails"]),
    ioTEdgeDeviceDetails: ioTDeviceInfoSerializer(item["ioTEdgeDeviceDetails"]),
    shareMappings: !item["shareMappings"]
      ? item["shareMappings"]
      : mountPointMapArraySerializer(item["shareMappings"]),
    ioTEdgeAgentInfo: !item["ioTEdgeAgentInfo"]
      ? item["ioTEdgeAgentInfo"]
      : ioTEdgeAgentInfoSerializer(item["ioTEdgeAgentInfo"]),
    computeResource: !item["computeResource"]
      ? item["computeResource"]
      : computeResourceSerializer(item["computeResource"]),
    roleStatus: item["roleStatus"],
  };
}

export function ioTRolePropertiesDeserializer(item: any): IoTRoleProperties {
  return {
    hostPlatform: item["hostPlatform"],
    ioTDeviceDetails: ioTDeviceInfoDeserializer(item["ioTDeviceDetails"]),
    ioTEdgeDeviceDetails: ioTDeviceInfoDeserializer(item["ioTEdgeDeviceDetails"]),
    shareMappings: !item["shareMappings"]
      ? item["shareMappings"]
      : mountPointMapArrayDeserializer(item["shareMappings"]),
    ioTEdgeAgentInfo: !item["ioTEdgeAgentInfo"]
      ? item["ioTEdgeAgentInfo"]
      : ioTEdgeAgentInfoDeserializer(item["ioTEdgeAgentInfo"]),
    hostPlatformType: item["hostPlatformType"],
    computeResource: !item["computeResource"]
      ? item["computeResource"]
      : computeResourceDeserializer(item["computeResource"]),
    roleStatus: item["roleStatus"],
  };
}

/** Host OS supported by the Arc addon. */
export enum KnownPlatformType {
  /** Windows */
  Windows = "Windows",
  /** Linux */
  Linux = "Linux",
}

/**
 * Host OS supported by the Arc addon. \
 * {@link KnownPlatformType} can be used interchangeably with PlatformType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows** \
 * **Linux**
 */
export type PlatformType = string;

/** Metadata of IoT device/IoT Edge device to be configured. */
export interface IoTDeviceInfo {
  /** ID of the IoT device/edge device. */
  deviceId: string;
  /** Host name for the IoT hub associated to the device. */
  ioTHostHub: string;
  /** Id for the IoT hub associated to the device. */
  ioTHostHubId?: string;
  /** Encrypted IoT device/IoT edge device connection string. */
  authentication?: Authentication;
}

export function ioTDeviceInfoSerializer(item: IoTDeviceInfo): any {
  return {
    deviceId: item["deviceId"],
    ioTHostHub: item["ioTHostHub"],
    ioTHostHubId: item["ioTHostHubId"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationSerializer(item["authentication"]),
  };
}

export function ioTDeviceInfoDeserializer(item: any): IoTDeviceInfo {
  return {
    deviceId: item["deviceId"],
    ioTHostHub: item["ioTHostHub"],
    ioTHostHubId: item["ioTHostHubId"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : authenticationDeserializer(item["authentication"]),
  };
}

/** Authentication mechanism for IoT devices. */
export interface Authentication {
  /** Symmetric key for authentication. */
  symmetricKey?: SymmetricKey;
}

export function authenticationSerializer(item: Authentication): any {
  return {
    symmetricKey: !item["symmetricKey"]
      ? item["symmetricKey"]
      : symmetricKeySerializer(item["symmetricKey"]),
  };
}

export function authenticationDeserializer(item: any): Authentication {
  return {
    symmetricKey: !item["symmetricKey"]
      ? item["symmetricKey"]
      : symmetricKeyDeserializer(item["symmetricKey"]),
  };
}

/** Symmetric key for authentication. */
export interface SymmetricKey {
  /** Connection string based on the symmetric key. */
  connectionString?: AsymmetricEncryptedSecret;
}

export function symmetricKeySerializer(item: SymmetricKey): any {
  return {
    connectionString: !item["connectionString"]
      ? item["connectionString"]
      : asymmetricEncryptedSecretSerializer(item["connectionString"]),
  };
}

export function symmetricKeyDeserializer(item: any): SymmetricKey {
  return {
    connectionString: !item["connectionString"]
      ? item["connectionString"]
      : asymmetricEncryptedSecretDeserializer(item["connectionString"]),
  };
}

export function mountPointMapArraySerializer(result: Array<MountPointMap>): any[] {
  return result.map((item) => {
    return mountPointMapSerializer(item);
  });
}

export function mountPointMapArrayDeserializer(result: Array<MountPointMap>): any[] {
  return result.map((item) => {
    return mountPointMapDeserializer(item);
  });
}

/** The share mount point. */
export interface MountPointMap {
  /** ID of the share mounted to the role VM. */
  shareId: string;
  /** ID of the role to which share is mounted. */
  readonly roleId?: string;
  /** Mount point for the share. */
  readonly mountPoint?: string;
  /** Mounting type. */
  readonly mountType?: MountType;
  /** Role type. */
  readonly roleType?: RoleTypes;
}

export function mountPointMapSerializer(item: MountPointMap): any {
  return { shareId: item["shareId"] };
}

export function mountPointMapDeserializer(item: any): MountPointMap {
  return {
    shareId: item["shareId"],
    roleId: item["roleId"],
    mountPoint: item["mountPoint"],
    mountType: item["mountType"],
    roleType: item["roleType"],
  };
}

/** Mounting type. */
export enum KnownMountType {
  /** Volume */
  Volume = "Volume",
  /** HostPath */
  HostPath = "HostPath",
}

/**
 * Mounting type. \
 * {@link KnownMountType} can be used interchangeably with MountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Volume** \
 * **HostPath**
 */
export type MountType = string;

/** IoT edge agent details is optional, this will be used for download system Agent module while bootstrapping IoT Role if specified. */
export interface IoTEdgeAgentInfo {
  /** Name of the IoT edge agent image. */
  imageName: string;
  /** Image Tag. */
  tag: string;
  /** Image repository details. */
  imageRepository?: ImageRepositoryCredential;
}

export function ioTEdgeAgentInfoSerializer(item: IoTEdgeAgentInfo): any {
  return {
    imageName: item["imageName"],
    tag: item["tag"],
    imageRepository: !item["imageRepository"]
      ? item["imageRepository"]
      : imageRepositoryCredentialSerializer(item["imageRepository"]),
  };
}

export function ioTEdgeAgentInfoDeserializer(item: any): IoTEdgeAgentInfo {
  return {
    imageName: item["imageName"],
    tag: item["tag"],
    imageRepository: !item["imageRepository"]
      ? item["imageRepository"]
      : imageRepositoryCredentialDeserializer(item["imageRepository"]),
  };
}

/** Image repository credential. */
export interface ImageRepositoryCredential {
  /** Image repository url (e.g.: mcr.microsoft.com). */
  imageRepositoryUrl: string;
  /** Repository user name. */
  userName: string;
  /** Repository user password. */
  password?: AsymmetricEncryptedSecret;
}

export function imageRepositoryCredentialSerializer(item: ImageRepositoryCredential): any {
  return {
    imageRepositoryUrl: item["imageRepositoryUrl"],
    userName: item["userName"],
    password: !item["password"]
      ? item["password"]
      : asymmetricEncryptedSecretSerializer(item["password"]),
  };
}

export function imageRepositoryCredentialDeserializer(item: any): ImageRepositoryCredential {
  return {
    imageRepositoryUrl: item["imageRepositoryUrl"],
    userName: item["userName"],
    password: !item["password"]
      ? item["password"]
      : asymmetricEncryptedSecretDeserializer(item["password"]),
  };
}

/** Platform where the runtime is hosted. */
export enum KnownHostPlatformType {
  /** KubernetesCluster */
  KubernetesCluster = "KubernetesCluster",
  /** LinuxVM */
  LinuxVM = "LinuxVM",
}

/**
 * Platform where the runtime is hosted. \
 * {@link KnownHostPlatformType} can be used interchangeably with HostPlatformType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **KubernetesCluster** \
 * **LinuxVM**
 */
export type HostPlatformType = string;

/** Compute infrastructure Resource */
export interface ComputeResource {
  /** Processor count */
  processorCount: number;
  /** Memory in GB */
  memoryInGB: number;
}

export function computeResourceSerializer(item: ComputeResource): any {
  return { processorCount: item["processorCount"], memoryInGB: item["memoryInGB"] };
}

export function computeResourceDeserializer(item: any): ComputeResource {
  return {
    processorCount: item["processorCount"],
    memoryInGB: item["memoryInGB"],
  };
}

/**
 * The limited preview of Kubernetes Cluster Management from the Azure supports:
 * 1. Using a simple turn-key option in Azure Portal, deploy a Kubernetes cluster on your Azure Stack Edge device.
 * 2. Configure Kubernetes cluster running on your device with Arc enabled Kubernetes with a click of a button in the Azure Portal.
 * Azure Arc enables organizations to view, manage, and govern their on-premises Kubernetes clusters using the Azure Portal, command line tools, and APIs.
 * 3. Easily configure Persistent Volumes using SMB and NFS shares for storing container data.
 * For more information, refer to the document here: https://databoxupdatepackages.blob.core.windows.net/documentation/Microsoft-Azure-Stack-Edge-K8-Cloud-Management-20210323.pdf
 * Or Demo: https://databoxupdatepackages.blob.core.windows.net/documentation/Microsoft-Azure-Stack-Edge-K8S-Cloud-Management-20210323.mp4
 * By using this feature, you agree to the preview legal terms. See the https://azure.microsoft.com/en-us/support/legal/preview-supplemental-terms/
 */
export interface KubernetesRole extends Role {
  /** Role type. */
  kind: "Kubernetes";
  /** Host OS supported by the Kubernetes role. */
  hostPlatform?: PlatformType;
  /** State of Kubernetes deployment */
  readonly provisioningState?: KubernetesState;
  /** Platform where the runtime is hosted. */
  readonly hostPlatformType?: HostPlatformType;
  /** Kubernetes cluster configuration */
  kubernetesClusterInfo?: KubernetesClusterInfo;
  /** Kubernetes role resources */
  kubernetesRoleResources?: KubernetesRoleResources;
  /** Role status. */
  roleStatus?: RoleStatus;
}

export function kubernetesRoleSerializer(item: KubernetesRole): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "hostPlatform",
      "kubernetesClusterInfo",
      "kubernetesRoleResources",
      "roleStatus",
    ])
      ? undefined
      : _kubernetesRolePropertiesSerializer(item),
  };
}

export function kubernetesRoleDeserializer(item: any): KubernetesRole {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _kubernetesRolePropertiesDeserializer(item["properties"])),
  };
}

/** Kubernetes role properties. */
export interface KubernetesRoleProperties {
  /** Host OS supported by the Kubernetes role. */
  hostPlatform: PlatformType;
  /** State of Kubernetes deployment */
  readonly provisioningState?: KubernetesState;
  /** Platform where the runtime is hosted. */
  readonly hostPlatformType?: HostPlatformType;
  /** Kubernetes cluster configuration */
  kubernetesClusterInfo: KubernetesClusterInfo;
  /** Kubernetes role resources */
  kubernetesRoleResources: KubernetesRoleResources;
  /** Role status. */
  roleStatus: RoleStatus;
}

export function kubernetesRolePropertiesSerializer(item: KubernetesRoleProperties): any {
  return {
    hostPlatform: item["hostPlatform"],
    kubernetesClusterInfo: kubernetesClusterInfoSerializer(item["kubernetesClusterInfo"]),
    kubernetesRoleResources: kubernetesRoleResourcesSerializer(item["kubernetesRoleResources"]),
    roleStatus: item["roleStatus"],
  };
}

export function kubernetesRolePropertiesDeserializer(item: any): KubernetesRoleProperties {
  return {
    hostPlatform: item["hostPlatform"],
    provisioningState: item["provisioningState"],
    hostPlatformType: item["hostPlatformType"],
    kubernetesClusterInfo: kubernetesClusterInfoDeserializer(item["kubernetesClusterInfo"]),
    kubernetesRoleResources: kubernetesRoleResourcesDeserializer(item["kubernetesRoleResources"]),
    roleStatus: item["roleStatus"],
  };
}

/** State of Kubernetes deployment */
export enum KnownKubernetesState {
  /** Invalid */
  Invalid = "Invalid",
  /** Creating */
  Creating = "Creating",
  /** Created */
  Created = "Created",
  /** Updating */
  Updating = "Updating",
  /** Reconfiguring */
  Reconfiguring = "Reconfiguring",
  /** Failed */
  Failed = "Failed",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * State of Kubernetes deployment \
 * {@link KnownKubernetesState} can be used interchangeably with KubernetesState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Creating** \
 * **Created** \
 * **Updating** \
 * **Reconfiguring** \
 * **Failed** \
 * **Deleting**
 */
export type KubernetesState = string;

/** Kubernetes cluster configuration */
export interface KubernetesClusterInfo {
  /** Etcd configuration */
  readonly etcdInfo?: EtcdInfo;
  /** Kubernetes cluster nodes */
  readonly nodes?: NodeInfo[];
  /** Kubernetes cluster version */
  version: string;
}

export function kubernetesClusterInfoSerializer(item: KubernetesClusterInfo): any {
  return { version: item["version"] };
}

export function kubernetesClusterInfoDeserializer(item: any): KubernetesClusterInfo {
  return {
    etcdInfo: !item["etcdInfo"] ? item["etcdInfo"] : etcdInfoDeserializer(item["etcdInfo"]),
    nodes: !item["nodes"] ? item["nodes"] : nodeInfoArrayDeserializer(item["nodes"]),
    version: item["version"],
  };
}

/** Etcd configuration */
export interface EtcdInfo {
  /** Etcd type */
  readonly type?: string;
  /** Etcd version */
  readonly version?: string;
}

export function etcdInfoDeserializer(item: any): EtcdInfo {
  return {
    type: item["type"],
    version: item["version"],
  };
}

export function nodeInfoArrayDeserializer(result: Array<NodeInfo>): any[] {
  return result.map((item) => {
    return nodeInfoDeserializer(item);
  });
}

/** Kubernetes node info */
export interface NodeInfo {
  /** Node name. */
  readonly name?: string;
  /** Node type - Master/Worker */
  readonly type?: KubernetesNodeType;
  /** IP Configuration of the Kubernetes node. */
  ipConfiguration?: KubernetesIPConfiguration[];
}

export function nodeInfoDeserializer(item: any): NodeInfo {
  return {
    name: item["name"],
    type: item["type"],
    ipConfiguration: !item["ipConfiguration"]
      ? item["ipConfiguration"]
      : kubernetesIPConfigurationArrayDeserializer(item["ipConfiguration"]),
  };
}

/** Node type - Master/Worker */
export enum KnownKubernetesNodeType {
  /** Invalid */
  Invalid = "Invalid",
  /** Master */
  Master = "Master",
  /** Worker */
  Worker = "Worker",
}

/**
 * Node type - Master/Worker \
 * {@link KnownKubernetesNodeType} can be used interchangeably with KubernetesNodeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Master** \
 * **Worker**
 */
export type KubernetesNodeType = string;

export function kubernetesIPConfigurationArrayDeserializer(
  result: Array<KubernetesIPConfiguration>,
): any[] {
  return result.map((item) => {
    return kubernetesIPConfigurationDeserializer(item);
  });
}

/** Kubernetes node IP configuration */
export interface KubernetesIPConfiguration {
  /** Port of the Kubernetes node. */
  readonly port?: string;
  /** IP address of the Kubernetes node. */
  ipAddress?: string;
}

export function kubernetesIPConfigurationDeserializer(item: any): KubernetesIPConfiguration {
  return {
    port: item["port"],
    ipAddress: item["ipAddress"],
  };
}

/** Kubernetes role resources */
export interface KubernetesRoleResources {
  /** Kubernetes role storage resource */
  storage?: KubernetesRoleStorage;
  /** Kubernetes role compute resource */
  compute: KubernetesRoleCompute;
  /** Kubernetes role network resource */
  readonly network?: KubernetesRoleNetwork;
}

export function kubernetesRoleResourcesSerializer(item: KubernetesRoleResources): any {
  return {
    storage: !item["storage"] ? item["storage"] : kubernetesRoleStorageSerializer(item["storage"]),
    compute: kubernetesRoleComputeSerializer(item["compute"]),
  };
}

export function kubernetesRoleResourcesDeserializer(item: any): KubernetesRoleResources {
  return {
    storage: !item["storage"]
      ? item["storage"]
      : kubernetesRoleStorageDeserializer(item["storage"]),
    compute: kubernetesRoleComputeDeserializer(item["compute"]),
    network: !item["network"]
      ? item["network"]
      : kubernetesRoleNetworkDeserializer(item["network"]),
  };
}

/** Kubernetes role storage resource */
export interface KubernetesRoleStorage {
  /** Kubernetes storage class info. */
  readonly storageClasses?: KubernetesRoleStorageClassInfo[];
  /** Mount points of shares in role(s). */
  endpoints?: MountPointMap[];
}

export function kubernetesRoleStorageSerializer(item: KubernetesRoleStorage): any {
  return {
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : mountPointMapArraySerializer(item["endpoints"]),
  };
}

export function kubernetesRoleStorageDeserializer(item: any): KubernetesRoleStorage {
  return {
    storageClasses: !item["storageClasses"]
      ? item["storageClasses"]
      : kubernetesRoleStorageClassInfoArrayDeserializer(item["storageClasses"]),
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : mountPointMapArrayDeserializer(item["endpoints"]),
  };
}

export function kubernetesRoleStorageClassInfoArrayDeserializer(
  result: Array<KubernetesRoleStorageClassInfo>,
): any[] {
  return result.map((item) => {
    return kubernetesRoleStorageClassInfoDeserializer(item);
  });
}

/** Kubernetes storage class info. */
export interface KubernetesRoleStorageClassInfo {
  /** Storage class name. */
  readonly name?: string;
  /** Storage class type. */
  readonly type?: string;
  /** If provisioned storage is posix compliant. */
  readonly posixCompliant?: PosixComplianceStatus;
}

export function kubernetesRoleStorageClassInfoDeserializer(
  item: any,
): KubernetesRoleStorageClassInfo {
  return {
    name: item["name"],
    type: item["type"],
    posixCompliant: item["posixCompliant"],
  };
}

/** If provisioned storage is posix compliant. */
export enum KnownPosixComplianceStatus {
  /** Invalid */
  Invalid = "Invalid",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * If provisioned storage is posix compliant. \
 * {@link KnownPosixComplianceStatus} can be used interchangeably with PosixComplianceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Enabled** \
 * **Disabled**
 */
export type PosixComplianceStatus = string;

/** Kubernetes role compute resource */
export interface KubernetesRoleCompute {
  /** VM profile */
  vmProfile: string;
  /** Memory in bytes */
  readonly memoryInBytes?: number;
  /** Processor count */
  readonly processorCount?: number;
}

export function kubernetesRoleComputeSerializer(item: KubernetesRoleCompute): any {
  return { vmProfile: item["vmProfile"] };
}

export function kubernetesRoleComputeDeserializer(item: any): KubernetesRoleCompute {
  return {
    vmProfile: item["vmProfile"],
    memoryInBytes: item["memoryInBytes"],
    processorCount: item["processorCount"],
  };
}

/** Kubernetes role network resource */
export interface KubernetesRoleNetwork {
  /** Cni configuration */
  readonly cniConfig?: CniConfig;
  /** Load balancer configuration */
  readonly loadBalancerConfig?: LoadBalancerConfig;
}

export function kubernetesRoleNetworkDeserializer(item: any): KubernetesRoleNetwork {
  return {
    cniConfig: !item["cniConfig"] ? item["cniConfig"] : cniConfigDeserializer(item["cniConfig"]),
    loadBalancerConfig: !item["loadBalancerConfig"]
      ? item["loadBalancerConfig"]
      : loadBalancerConfigDeserializer(item["loadBalancerConfig"]),
  };
}

/** Cni configuration */
export interface CniConfig {
  /** Cni type */
  readonly type?: string;
  /** Cni version */
  readonly version?: string;
  /** Pod Subnet */
  readonly podSubnet?: string;
  /** Service subnet */
  readonly serviceSubnet?: string;
}

export function cniConfigDeserializer(item: any): CniConfig {
  return {
    type: item["type"],
    version: item["version"],
    podSubnet: item["podSubnet"],
    serviceSubnet: item["serviceSubnet"],
  };
}

/** Load balancer configuration */
export interface LoadBalancerConfig {
  /** Load balancer type */
  readonly type?: string;
  /** Load balancer version */
  readonly version?: string;
  /** Load balancer ipconfig */
  ipRange?: string[];
}

export function loadBalancerConfigDeserializer(item: any): LoadBalancerConfig {
  return {
    type: item["type"],
    version: item["version"],
    ipRange: !item["ipRange"]
      ? item["ipRange"]
      : item["ipRange"].map((p: any) => {
          return p;
        }),
  };
}

/** MEC role. */
export interface MECRole extends Role {
  /** Role type. */
  kind: "MEC";
  /** Activation key of the MEC. */
  connectionString?: AsymmetricEncryptedSecret;
  /** Controller Endpoint. */
  controllerEndpoint?: string;
  /** Unique Id of the Resource. */
  resourceUniqueId?: string;
  /** Role status. */
  roleStatus?: RoleStatus;
}

export function mecRoleSerializer(item: MECRole): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "connectionString",
      "controllerEndpoint",
      "resourceUniqueId",
      "roleStatus",
    ])
      ? undefined
      : _mecRolePropertiesSerializer(item),
  };
}

export function mecRoleDeserializer(item: any): MECRole {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _mecRolePropertiesDeserializer(item["properties"])),
  };
}

/** MEC role properties. */
export interface MECRoleProperties {
  /** Activation key of the MEC. */
  connectionString?: AsymmetricEncryptedSecret;
  /** Controller Endpoint. */
  controllerEndpoint?: string;
  /** Unique Id of the Resource. */
  resourceUniqueId?: string;
  /** Role status. */
  roleStatus: RoleStatus;
}

export function mecRolePropertiesSerializer(item: MECRoleProperties): any {
  return {
    connectionString: !item["connectionString"]
      ? item["connectionString"]
      : asymmetricEncryptedSecretSerializer(item["connectionString"]),
    controllerEndpoint: item["controllerEndpoint"],
    resourceUniqueId: item["resourceUniqueId"],
    roleStatus: item["roleStatus"],
  };
}

export function mecRolePropertiesDeserializer(item: any): MECRoleProperties {
  return {
    connectionString: !item["connectionString"]
      ? item["connectionString"]
      : asymmetricEncryptedSecretDeserializer(item["connectionString"]),
    controllerEndpoint: item["controllerEndpoint"],
    resourceUniqueId: item["resourceUniqueId"],
    roleStatus: item["roleStatus"],
  };
}

/** Collection of all the roles on the Data Box Edge device. */
export interface _RoleList {
  /** The Role items on this page */
  readonly value: RoleUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _roleListDeserializer(item: any): _RoleList {
  return {
    value: roleUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function roleUnionArraySerializer(result: Array<RoleUnion>): any[] {
  return result.map((item) => {
    return roleUnionSerializer(item);
  });
}

export function roleUnionArrayDeserializer(result: Array<RoleUnion>): any[] {
  return result.map((item) => {
    return roleUnionDeserializer(item);
  });
}

/** Role Addon */
export interface Addon extends ProxyResource {
  /** Addon type. */
  /** The discriminator possible values: ArcForKubernetes, IotEdge */
  kind: AddonType;
}

export function addonSerializer(item: Addon): any {
  return { kind: item["kind"] };
}

export function addonDeserializer(item: any): Addon {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
  };
}

/** Alias for AddonUnion */
export type AddonUnion = ArcAddon | IoTAddon | Addon;

export function addonUnionSerializer(item: AddonUnion): any {
  switch (item.kind) {
    case "ArcForKubernetes":
      return arcAddonSerializer(item as ArcAddon);

    case "IotEdge":
      return ioTAddonSerializer(item as IoTAddon);

    default:
      return addonSerializer(item);
  }
}

export function addonUnionDeserializer(item: any): AddonUnion {
  switch (item["kind"]) {
    case "ArcForKubernetes":
      return arcAddonDeserializer(item as ArcAddon);

    case "IotEdge":
      return ioTAddonDeserializer(item as IoTAddon);

    default:
      return addonDeserializer(item);
  }
}

/** Addon type. */
export enum KnownAddonType {
  /** IotEdge */
  IotEdge = "IotEdge",
  /** ArcForKubernetes */
  ArcForKubernetes = "ArcForKubernetes",
}

/**
 * Addon type. \
 * {@link KnownAddonType} can be used interchangeably with AddonType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IotEdge** \
 * **ArcForKubernetes**
 */
export type AddonType = string;

/** Arc Addon. */
export interface ArcAddon extends Addon {
  /** Addon type. */
  kind: "ArcForKubernetes";
  /** Arc resource subscription Id */
  subscriptionId: string;
  /** Arc resource group name */
  resourceGroupName: string;
  /** Arc resource Name */
  resourceName: string;
  /** Arc resource location */
  resourceLocation: string;
  /** Arc resource version */
  readonly version?: string;
  /** Host OS supported by the Arc addon. */
  readonly hostPlatform?: PlatformType;
  /** Platform where the runtime is hosted. */
  readonly hostPlatformType?: HostPlatformType;
  /** Addon Provisioning State */
  readonly provisioningState?: AddonState;
}

export function arcAddonSerializer(item: ArcAddon): any {
  return { kind: item["kind"], properties: _arcAddonPropertiesSerializer(item) };
}

export function arcAddonDeserializer(item: any): ArcAddon {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._arcAddonPropertiesDeserializer(item["properties"]),
  };
}

/** Arc addon properties. */
export interface ArcAddonProperties {
  /** Arc resource subscription Id */
  subscriptionId: string;
  /** Arc resource group name */
  resourceGroupName: string;
  /** Arc resource Name */
  resourceName: string;
  /** Arc resource location */
  resourceLocation: string;
  /** Arc resource version */
  readonly version?: string;
  /** Host OS supported by the Arc addon. */
  readonly hostPlatform?: PlatformType;
  /** Platform where the runtime is hosted. */
  readonly hostPlatformType?: HostPlatformType;
  /** Addon Provisioning State */
  readonly provisioningState?: AddonState;
}

export function arcAddonPropertiesSerializer(item: ArcAddonProperties): any {
  return {
    subscriptionId: item["subscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    resourceName: item["resourceName"],
    resourceLocation: item["resourceLocation"],
  };
}

export function arcAddonPropertiesDeserializer(item: any): ArcAddonProperties {
  return {
    subscriptionId: item["subscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    resourceName: item["resourceName"],
    resourceLocation: item["resourceLocation"],
    version: item["version"],
    hostPlatform: item["hostPlatform"],
    hostPlatformType: item["hostPlatformType"],
    provisioningState: item["provisioningState"],
  };
}

/** Addon Provisioning State */
export enum KnownAddonState {
  /** Invalid */
  Invalid = "Invalid",
  /** Creating */
  Creating = "Creating",
  /** Created */
  Created = "Created",
  /** Updating */
  Updating = "Updating",
  /** Reconfiguring */
  Reconfiguring = "Reconfiguring",
  /** Failed */
  Failed = "Failed",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Addon Provisioning State \
 * {@link KnownAddonState} can be used interchangeably with AddonState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **Creating** \
 * **Created** \
 * **Updating** \
 * **Reconfiguring** \
 * **Failed** \
 * **Deleting**
 */
export type AddonState = string;

/** IoT Addon. */
export interface IoTAddon extends Addon {
  /** Addon type. */
  kind: "IotEdge";
  /** IoT device metadata to which appliance needs to be connected. */
  ioTDeviceDetails: IoTDeviceInfo;
  /** IoT edge device to which the IoT Addon needs to be configured. */
  ioTEdgeDeviceDetails: IoTDeviceInfo;
  /** Version of IoT running on the appliance. */
  readonly version?: string;
  /** Host OS supported by the IoT addon. */
  readonly hostPlatform?: PlatformType;
  /** Platform where the runtime is hosted. */
  readonly hostPlatformType?: HostPlatformType;
  /** Addon Provisioning State */
  readonly provisioningState?: AddonState;
}

export function ioTAddonSerializer(item: IoTAddon): any {
  return { kind: item["kind"], properties: _ioTAddonPropertiesSerializer(item) };
}

export function ioTAddonDeserializer(item: any): IoTAddon {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._ioTAddonPropertiesDeserializer(item["properties"]),
  };
}

/** IoT addon properties. */
export interface IoTAddonProperties {
  /** IoT device metadata to which appliance needs to be connected. */
  ioTDeviceDetails: IoTDeviceInfo;
  /** IoT edge device to which the IoT Addon needs to be configured. */
  ioTEdgeDeviceDetails: IoTDeviceInfo;
  /** Version of IoT running on the appliance. */
  readonly version?: string;
  /** Host OS supported by the IoT addon. */
  readonly hostPlatform?: PlatformType;
  /** Platform where the runtime is hosted. */
  readonly hostPlatformType?: HostPlatformType;
  /** Addon Provisioning State */
  readonly provisioningState?: AddonState;
}

export function ioTAddonPropertiesSerializer(item: IoTAddonProperties): any {
  return {
    ioTDeviceDetails: ioTDeviceInfoSerializer(item["ioTDeviceDetails"]),
    ioTEdgeDeviceDetails: ioTDeviceInfoSerializer(item["ioTEdgeDeviceDetails"]),
  };
}

export function ioTAddonPropertiesDeserializer(item: any): IoTAddonProperties {
  return {
    ioTDeviceDetails: ioTDeviceInfoDeserializer(item["ioTDeviceDetails"]),
    ioTEdgeDeviceDetails: ioTDeviceInfoDeserializer(item["ioTEdgeDeviceDetails"]),
    version: item["version"],
    hostPlatform: item["hostPlatform"],
    hostPlatformType: item["hostPlatformType"],
    provisioningState: item["provisioningState"],
  };
}

/** Collection of all the Role addon on the Azure Stack Edge device. */
export interface _AddonList {
  /** The Addon items on this page */
  readonly value: AddonUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _addonListDeserializer(item: any): _AddonList {
  return {
    value: addonUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function addonUnionArraySerializer(result: Array<AddonUnion>): any[] {
  return result.map((item) => {
    return addonUnionSerializer(item);
  });
}

export function addonUnionArrayDeserializer(result: Array<AddonUnion>): any[] {
  return result.map((item) => {
    return addonUnionDeserializer(item);
  });
}

/** Represents a share on the  Data Box Edge/Gateway device. */
export interface Share extends ProxyResource {
  /** Description for the share. */
  description?: string;
  /** Current status of the share. */
  shareStatus: ShareStatus;
  /** Current monitoring status of the share. */
  monitoringStatus: MonitoringStatus;
  /** Azure container mapping for the share. */
  azureContainerInfo?: AzureContainerInfo;
  /** Access protocol to be used by the share. */
  accessProtocol: ShareAccessProtocol;
  /** Mapping of users and corresponding access rights on the share (required for SMB protocol). */
  userAccessRights?: UserAccessRight[];
  /** List of IP addresses and corresponding access rights on the share(required for NFS protocol). */
  clientAccessRights?: ClientAccessRight[];
  /** Details of the refresh job on this share. */
  refreshDetails?: RefreshDetails;
  /** Share mount point to the role. */
  readonly shareMappings?: MountPointMap[];
  /** Data policy of the share. */
  dataPolicy?: DataPolicy;
}

export function shareSerializer(item: Share): any {
  return { properties: _sharePropertiesSerializer(item) };
}

export function shareDeserializer(item: any): Share {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._sharePropertiesDeserializer(item["properties"]),
  };
}

/** The share properties. */
export interface ShareProperties {
  /** Description for the share. */
  description?: string;
  /** Current status of the share. */
  shareStatus: ShareStatus;
  /** Current monitoring status of the share. */
  monitoringStatus: MonitoringStatus;
  /** Azure container mapping for the share. */
  azureContainerInfo?: AzureContainerInfo;
  /** Access protocol to be used by the share. */
  accessProtocol: ShareAccessProtocol;
  /** Mapping of users and corresponding access rights on the share (required for SMB protocol). */
  userAccessRights?: UserAccessRight[];
  /** List of IP addresses and corresponding access rights on the share(required for NFS protocol). */
  clientAccessRights?: ClientAccessRight[];
  /** Details of the refresh job on this share. */
  refreshDetails?: RefreshDetails;
  /** Share mount point to the role. */
  readonly shareMappings?: MountPointMap[];
  /** Data policy of the share. */
  dataPolicy?: DataPolicy;
}

export function sharePropertiesSerializer(item: ShareProperties): any {
  return {
    description: item["description"],
    shareStatus: item["shareStatus"],
    monitoringStatus: item["monitoringStatus"],
    azureContainerInfo: !item["azureContainerInfo"]
      ? item["azureContainerInfo"]
      : azureContainerInfoSerializer(item["azureContainerInfo"]),
    accessProtocol: item["accessProtocol"],
    userAccessRights: !item["userAccessRights"]
      ? item["userAccessRights"]
      : userAccessRightArraySerializer(item["userAccessRights"]),
    clientAccessRights: !item["clientAccessRights"]
      ? item["clientAccessRights"]
      : clientAccessRightArraySerializer(item["clientAccessRights"]),
    refreshDetails: !item["refreshDetails"]
      ? item["refreshDetails"]
      : refreshDetailsSerializer(item["refreshDetails"]),
    dataPolicy: item["dataPolicy"],
  };
}

export function sharePropertiesDeserializer(item: any): ShareProperties {
  return {
    description: item["description"],
    shareStatus: item["shareStatus"],
    monitoringStatus: item["monitoringStatus"],
    azureContainerInfo: !item["azureContainerInfo"]
      ? item["azureContainerInfo"]
      : azureContainerInfoDeserializer(item["azureContainerInfo"]),
    accessProtocol: item["accessProtocol"],
    userAccessRights: !item["userAccessRights"]
      ? item["userAccessRights"]
      : userAccessRightArrayDeserializer(item["userAccessRights"]),
    clientAccessRights: !item["clientAccessRights"]
      ? item["clientAccessRights"]
      : clientAccessRightArrayDeserializer(item["clientAccessRights"]),
    refreshDetails: !item["refreshDetails"]
      ? item["refreshDetails"]
      : refreshDetailsDeserializer(item["refreshDetails"]),
    shareMappings: !item["shareMappings"]
      ? item["shareMappings"]
      : mountPointMapArrayDeserializer(item["shareMappings"]),
    dataPolicy: item["dataPolicy"],
  };
}

/** Current status of the share. */
export enum KnownShareStatus {
  /** Offline */
  Offline = "Offline",
  /** Unknown */
  Unknown = "Unknown",
  /** OK */
  OK = "OK",
  /** Updating */
  Updating = "Updating",
  /** NeedsAttention */
  NeedsAttention = "NeedsAttention",
}

/**
 * Current status of the share. \
 * {@link KnownShareStatus} can be used interchangeably with ShareStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Offline** \
 * **Unknown** \
 * **OK** \
 * **Updating** \
 * **NeedsAttention**
 */
export type ShareStatus = string;

/** Current monitoring status of the share. */
export enum KnownMonitoringStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Current monitoring status of the share. \
 * {@link KnownMonitoringStatus} can be used interchangeably with MonitoringStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type MonitoringStatus = string;

/** Azure container mapping of the endpoint. */
export interface AzureContainerInfo {
  /** ID of the storage account credential used to access storage. */
  storageAccountCredentialId: string;
  /** Container name (Based on the data format specified, this represents the name of Azure Files/Page blob/Block blob). */
  containerName: string;
  /** Storage format used for the file represented by the share. */
  dataFormat: AzureContainerDataFormat;
}

export function azureContainerInfoSerializer(item: AzureContainerInfo): any {
  return {
    storageAccountCredentialId: item["storageAccountCredentialId"],
    containerName: item["containerName"],
    dataFormat: item["dataFormat"],
  };
}

export function azureContainerInfoDeserializer(item: any): AzureContainerInfo {
  return {
    storageAccountCredentialId: item["storageAccountCredentialId"],
    containerName: item["containerName"],
    dataFormat: item["dataFormat"],
  };
}

/** Storage format used for the file represented by the share. */
export enum KnownAzureContainerDataFormat {
  /** BlockBlob */
  BlockBlob = "BlockBlob",
  /** PageBlob */
  PageBlob = "PageBlob",
  /** AzureFile */
  AzureFile = "AzureFile",
}

/**
 * Storage format used for the file represented by the share. \
 * {@link KnownAzureContainerDataFormat} can be used interchangeably with AzureContainerDataFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BlockBlob** \
 * **PageBlob** \
 * **AzureFile**
 */
export type AzureContainerDataFormat = string;

/** Access protocol to be used by the share. */
export enum KnownShareAccessProtocol {
  /** SMB */
  SMB = "SMB",
  /** NFS */
  NFS = "NFS",
}

/**
 * Access protocol to be used by the share. \
 * {@link KnownShareAccessProtocol} can be used interchangeably with ShareAccessProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SMB** \
 * **NFS**
 */
export type ShareAccessProtocol = string;

export function userAccessRightArraySerializer(result: Array<UserAccessRight>): any[] {
  return result.map((item) => {
    return userAccessRightSerializer(item);
  });
}

export function userAccessRightArrayDeserializer(result: Array<UserAccessRight>): any[] {
  return result.map((item) => {
    return userAccessRightDeserializer(item);
  });
}

/** The mapping between a particular user and the access type on the SMB share. */
export interface UserAccessRight {
  /** User ID (already existing in the device). */
  userId: string;
  /** Type of access to be allowed for the user. */
  accessType: ShareAccessType;
}

export function userAccessRightSerializer(item: UserAccessRight): any {
  return { userId: item["userId"], accessType: item["accessType"] };
}

export function userAccessRightDeserializer(item: any): UserAccessRight {
  return {
    userId: item["userId"],
    accessType: item["accessType"],
  };
}

/** Type of access to be allowed on the share for this user. */
export enum KnownShareAccessType {
  /** Change */
  Change = "Change",
  /** Read */
  Read = "Read",
  /** Custom */
  Custom = "Custom",
}

/**
 * Type of access to be allowed on the share for this user. \
 * {@link KnownShareAccessType} can be used interchangeably with ShareAccessType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Change** \
 * **Read** \
 * **Custom**
 */
export type ShareAccessType = string;

export function clientAccessRightArraySerializer(result: Array<ClientAccessRight>): any[] {
  return result.map((item) => {
    return clientAccessRightSerializer(item);
  });
}

export function clientAccessRightArrayDeserializer(result: Array<ClientAccessRight>): any[] {
  return result.map((item) => {
    return clientAccessRightDeserializer(item);
  });
}

/** The mapping between a particular client IP and the type of access client has on the NFS share. */
export interface ClientAccessRight {
  /** IP of the client. */
  client: string;
  /** Type of access to be allowed for the client. */
  accessPermission: ClientPermissionType;
}

export function clientAccessRightSerializer(item: ClientAccessRight): any {
  return { client: item["client"], accessPermission: item["accessPermission"] };
}

export function clientAccessRightDeserializer(item: any): ClientAccessRight {
  return {
    client: item["client"],
    accessPermission: item["accessPermission"],
  };
}

/** Type of access to be allowed for the client. */
export enum KnownClientPermissionType {
  /** NoAccess */
  NoAccess = "NoAccess",
  /** ReadOnly */
  ReadOnly = "ReadOnly",
  /** ReadWrite */
  ReadWrite = "ReadWrite",
}

/**
 * Type of access to be allowed for the client. \
 * {@link KnownClientPermissionType} can be used interchangeably with ClientPermissionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoAccess** \
 * **ReadOnly** \
 * **ReadWrite**
 */
export type ClientPermissionType = string;

/** Fields for tracking refresh job on the share or container. */
export interface RefreshDetails {
  /** If a refresh job is currently in progress on this share or container, this field indicates the ARM resource ID of that job. The field is empty if no job is in progress. */
  inProgressRefreshJobId?: string;
  /** Indicates the completed time for the last refresh job on this particular share or container, if any.This could be a failed job or a successful job. */
  lastCompletedRefreshJobTimeInUTC?: Date;
  /** Indicates the relative path of the error xml for the last refresh job on this particular share or container, if any. This could be a failed job or a successful job. */
  errorManifestFile?: string;
  /** Indicates the id of the last refresh job on this particular share or container,if any. This could be a failed job or a successful job. */
  lastJob?: string;
}

export function refreshDetailsSerializer(item: RefreshDetails): any {
  return {
    inProgressRefreshJobId: item["inProgressRefreshJobId"],
    lastCompletedRefreshJobTimeInUTC: !item["lastCompletedRefreshJobTimeInUTC"]
      ? item["lastCompletedRefreshJobTimeInUTC"]
      : item["lastCompletedRefreshJobTimeInUTC"].toISOString(),
    errorManifestFile: item["errorManifestFile"],
    lastJob: item["lastJob"],
  };
}

export function refreshDetailsDeserializer(item: any): RefreshDetails {
  return {
    inProgressRefreshJobId: item["inProgressRefreshJobId"],
    lastCompletedRefreshJobTimeInUTC: !item["lastCompletedRefreshJobTimeInUTC"]
      ? item["lastCompletedRefreshJobTimeInUTC"]
      : new Date(item["lastCompletedRefreshJobTimeInUTC"]),
    errorManifestFile: item["errorManifestFile"],
    lastJob: item["lastJob"],
  };
}

/** Data policy of the share. */
export enum KnownDataPolicy {
  /** Cloud */
  Cloud = "Cloud",
  /** Local */
  Local = "Local",
}

/**
 * Data policy of the share. \
 * {@link KnownDataPolicy} can be used interchangeably with DataPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cloud** \
 * **Local**
 */
export type DataPolicy = string;

/** Collection of all the shares on the Data Box Edge/Gateway device. */
export interface _ShareList {
  /** The Share items on this page */
  readonly value: Share[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _shareListDeserializer(item: any): _ShareList {
  return {
    value: shareArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function shareArraySerializer(result: Array<Share>): any[] {
  return result.map((item) => {
    return shareSerializer(item);
  });
}

export function shareArrayDeserializer(result: Array<Share>): any[] {
  return result.map((item) => {
    return shareDeserializer(item);
  });
}

/** The storage account credential. */
export interface StorageAccountCredential extends ProxyResource {
  /** Alias for the storage account. */
  alias: string;
  /** Username for the storage account. */
  userName?: string;
  /** Encrypted storage key. */
  accountKey?: AsymmetricEncryptedSecret;
  /** Connection string for the storage account. Use this string if username and account key are not specified. */
  connectionString?: string;
  /** Signifies whether SSL needs to be enabled or not. */
  sslStatus: SSLStatus;
  /** Blob end point for private clouds. */
  blobDomainName?: string;
  /** Type of storage accessed on the storage account. */
  accountType: AccountType;
  /** Id of the storage account. */
  storageAccountId?: string;
}

export function storageAccountCredentialSerializer(item: StorageAccountCredential): any {
  return { properties: _storageAccountCredentialPropertiesSerializer(item) };
}

export function storageAccountCredentialDeserializer(item: any): StorageAccountCredential {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._storageAccountCredentialPropertiesDeserializer(item["properties"]),
  };
}

/** The storage account credential properties. */
export interface StorageAccountCredentialProperties {
  /** Alias for the storage account. */
  alias: string;
  /** Username for the storage account. */
  userName?: string;
  /** Encrypted storage key. */
  accountKey?: AsymmetricEncryptedSecret;
  /** Connection string for the storage account. Use this string if username and account key are not specified. */
  connectionString?: string;
  /** Signifies whether SSL needs to be enabled or not. */
  sslStatus: SSLStatus;
  /** Blob end point for private clouds. */
  blobDomainName?: string;
  /** Type of storage accessed on the storage account. */
  accountType: AccountType;
  /** Id of the storage account. */
  storageAccountId?: string;
}

export function storageAccountCredentialPropertiesSerializer(
  item: StorageAccountCredentialProperties,
): any {
  return {
    alias: item["alias"],
    userName: item["userName"],
    accountKey: !item["accountKey"]
      ? item["accountKey"]
      : asymmetricEncryptedSecretSerializer(item["accountKey"]),
    connectionString: item["connectionString"],
    sslStatus: item["sslStatus"],
    blobDomainName: item["blobDomainName"],
    accountType: item["accountType"],
    storageAccountId: item["storageAccountId"],
  };
}

export function storageAccountCredentialPropertiesDeserializer(
  item: any,
): StorageAccountCredentialProperties {
  return {
    alias: item["alias"],
    userName: item["userName"],
    accountKey: !item["accountKey"]
      ? item["accountKey"]
      : asymmetricEncryptedSecretDeserializer(item["accountKey"]),
    connectionString: item["connectionString"],
    sslStatus: item["sslStatus"],
    blobDomainName: item["blobDomainName"],
    accountType: item["accountType"],
    storageAccountId: item["storageAccountId"],
  };
}

/** Signifies whether SSL needs to be enabled or not. */
export enum KnownSSLStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Signifies whether SSL needs to be enabled or not. \
 * {@link KnownSSLStatus} can be used interchangeably with SSLStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type SSLStatus = string;

/** Type of storage accessed on the storage account. */
export enum KnownAccountType {
  /** GeneralPurposeStorage */
  GeneralPurposeStorage = "GeneralPurposeStorage",
  /** BlobStorage */
  BlobStorage = "BlobStorage",
}

/**
 * Type of storage accessed on the storage account. \
 * {@link KnownAccountType} can be used interchangeably with AccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GeneralPurposeStorage** \
 * **BlobStorage**
 */
export type AccountType = string;

/** The collection of storage account credentials. */
export interface _StorageAccountCredentialList {
  /** The StorageAccountCredential items on this page */
  readonly value: StorageAccountCredential[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storageAccountCredentialListDeserializer(
  item: any,
): _StorageAccountCredentialList {
  return {
    value: storageAccountCredentialArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageAccountCredentialArraySerializer(
  result: Array<StorageAccountCredential>,
): any[] {
  return result.map((item) => {
    return storageAccountCredentialSerializer(item);
  });
}

export function storageAccountCredentialArrayDeserializer(
  result: Array<StorageAccountCredential>,
): any[] {
  return result.map((item) => {
    return storageAccountCredentialDeserializer(item);
  });
}

/** Represents a Storage Account on the  Data Box Edge/Gateway device. */
export interface StorageAccount extends ProxyResource {
  /** Description for the storage Account. */
  description?: string;
  /** Current status of the storage account */
  storageAccountStatus?: StorageAccountStatus;
  /** Data policy of the storage Account. */
  dataPolicy: DataPolicy;
  /** Storage Account Credential Id */
  storageAccountCredentialId?: string;
  /** BlobEndpoint of Storage Account */
  readonly blobEndpoint?: string;
  /** The Container Count. Present only for Storage Accounts with DataPolicy set to Cloud. */
  readonly containerCount?: number;
}

export function storageAccountSerializer(item: StorageAccount): any {
  return { properties: _storageAccountPropertiesSerializer(item) };
}

export function storageAccountDeserializer(item: any): StorageAccount {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._storageAccountPropertiesDeserializer(item["properties"]),
  };
}

/** The storage account properties. */
export interface StorageAccountProperties {
  /** Description for the storage Account. */
  description?: string;
  /** Current status of the storage account */
  storageAccountStatus?: StorageAccountStatus;
  /** Data policy of the storage Account. */
  dataPolicy: DataPolicy;
  /** Storage Account Credential Id */
  storageAccountCredentialId?: string;
  /** BlobEndpoint of Storage Account */
  readonly blobEndpoint?: string;
  /** The Container Count. Present only for Storage Accounts with DataPolicy set to Cloud. */
  readonly containerCount?: number;
}

export function storageAccountPropertiesSerializer(item: StorageAccountProperties): any {
  return {
    description: item["description"],
    storageAccountStatus: item["storageAccountStatus"],
    dataPolicy: item["dataPolicy"],
    storageAccountCredentialId: item["storageAccountCredentialId"],
  };
}

export function storageAccountPropertiesDeserializer(item: any): StorageAccountProperties {
  return {
    description: item["description"],
    storageAccountStatus: item["storageAccountStatus"],
    dataPolicy: item["dataPolicy"],
    storageAccountCredentialId: item["storageAccountCredentialId"],
    blobEndpoint: item["blobEndpoint"],
    containerCount: item["containerCount"],
  };
}

/** Current status of the storage account */
export enum KnownStorageAccountStatus {
  /** OK */
  OK = "OK",
  /** Offline */
  Offline = "Offline",
  /** Unknown */
  Unknown = "Unknown",
  /** Updating */
  Updating = "Updating",
  /** NeedsAttention */
  NeedsAttention = "NeedsAttention",
}

/**
 * Current status of the storage account \
 * {@link KnownStorageAccountStatus} can be used interchangeably with StorageAccountStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OK** \
 * **Offline** \
 * **Unknown** \
 * **Updating** \
 * **NeedsAttention**
 */
export type StorageAccountStatus = string;

/** Collection of all the Storage Accounts on the Data Box Edge/Gateway device. */
export interface _StorageAccountList {
  /** The StorageAccount items on this page */
  readonly value: StorageAccount[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storageAccountListDeserializer(item: any): _StorageAccountList {
  return {
    value: storageAccountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageAccountArraySerializer(result: Array<StorageAccount>): any[] {
  return result.map((item) => {
    return storageAccountSerializer(item);
  });
}

export function storageAccountArrayDeserializer(result: Array<StorageAccount>): any[] {
  return result.map((item) => {
    return storageAccountDeserializer(item);
  });
}

/** Represents a container on the  Data Box Edge/Gateway device. */
export interface Container extends ProxyResource {
  /** Current status of the container. */
  readonly containerStatus?: ContainerStatus;
  /** DataFormat for Container */
  dataFormat: AzureContainerDataFormat;
  /** Details of the refresh job on this container. */
  readonly refreshDetails?: RefreshDetails;
  /** The UTC time when container got created. */
  readonly createdDateTime?: Date;
}

export function containerSerializer(item: Container): any {
  return { properties: _containerPropertiesSerializer(item) };
}

export function containerDeserializer(item: any): Container {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._containerPropertiesDeserializer(item["properties"]),
  };
}

/** The container properties. */
export interface ContainerProperties {
  /** Current status of the container. */
  readonly containerStatus?: ContainerStatus;
  /** DataFormat for Container */
  dataFormat: AzureContainerDataFormat;
  /** Details of the refresh job on this container. */
  readonly refreshDetails?: RefreshDetails;
  /** The UTC time when container got created. */
  readonly createdDateTime?: Date;
}

export function containerPropertiesSerializer(item: ContainerProperties): any {
  return { dataFormat: item["dataFormat"] };
}

export function containerPropertiesDeserializer(item: any): ContainerProperties {
  return {
    containerStatus: item["containerStatus"],
    dataFormat: item["dataFormat"],
    refreshDetails: !item["refreshDetails"]
      ? item["refreshDetails"]
      : refreshDetailsDeserializer(item["refreshDetails"]),
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
  };
}

/** Current status of the container. */
export enum KnownContainerStatus {
  /** OK */
  OK = "OK",
  /** Offline */
  Offline = "Offline",
  /** Unknown */
  Unknown = "Unknown",
  /** Updating */
  Updating = "Updating",
  /** NeedsAttention */
  NeedsAttention = "NeedsAttention",
}

/**
 * Current status of the container. \
 * {@link KnownContainerStatus} can be used interchangeably with ContainerStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OK** \
 * **Offline** \
 * **Unknown** \
 * **Updating** \
 * **NeedsAttention**
 */
export type ContainerStatus = string;

/** Collection of all the containers on the Data Box Edge/Gateway device. */
export interface _ContainerList {
  /** The Container items on this page */
  readonly value: Container[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _containerListDeserializer(item: any): _ContainerList {
  return {
    value: containerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function containerArraySerializer(result: Array<Container>): any[] {
  return result.map((item) => {
    return containerSerializer(item);
  });
}

export function containerArrayDeserializer(result: Array<Container>): any[] {
  return result.map((item) => {
    return containerDeserializer(item);
  });
}

/** Trigger details. */
export interface Trigger extends ProxyResource {
  /** Trigger Kind. */
  /** The discriminator possible values: FileEvent, PeriodicTimerEvent */
  kind: TriggerEventType;
}

export function triggerSerializer(item: Trigger): any {
  return { kind: item["kind"] };
}

export function triggerDeserializer(item: any): Trigger {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
  };
}

/** Alias for TriggerUnion */
export type TriggerUnion = FileEventTrigger | PeriodicTimerEventTrigger | Trigger;

export function triggerUnionSerializer(item: TriggerUnion): any {
  switch (item.kind) {
    case "FileEvent":
      return fileEventTriggerSerializer(item as FileEventTrigger);

    case "PeriodicTimerEvent":
      return periodicTimerEventTriggerSerializer(item as PeriodicTimerEventTrigger);

    default:
      return triggerSerializer(item);
  }
}

export function triggerUnionDeserializer(item: any): TriggerUnion {
  switch (item["kind"]) {
    case "FileEvent":
      return fileEventTriggerDeserializer(item as FileEventTrigger);

    case "PeriodicTimerEvent":
      return periodicTimerEventTriggerDeserializer(item as PeriodicTimerEventTrigger);

    default:
      return triggerDeserializer(item);
  }
}

/** Trigger Kind. */
export enum KnownTriggerEventType {
  /** FileEvent */
  FileEvent = "FileEvent",
  /** PeriodicTimerEvent */
  PeriodicTimerEvent = "PeriodicTimerEvent",
}

/**
 * Trigger Kind. \
 * {@link KnownTriggerEventType} can be used interchangeably with TriggerEventType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FileEvent** \
 * **PeriodicTimerEvent**
 */
export type TriggerEventType = string;

/** Trigger details. */
export interface FileEventTrigger extends Trigger {
  /** Trigger Kind. */
  kind: "FileEvent";
  /** File event source details. */
  sourceInfo: FileSourceInfo;
  /** Role sink info. */
  sinkInfo: RoleSinkInfo;
  /** A custom context tag typically used to correlate the trigger against its usage. For example, if a periodic timer trigger is intended for certain specific IoT modules in the device, the tag can be the name or the image URL of the module. */
  customContextTag?: string;
}

export function fileEventTriggerSerializer(item: FileEventTrigger): any {
  return { kind: item["kind"], properties: _fileEventTriggerPropertiesSerializer(item) };
}

export function fileEventTriggerDeserializer(item: any): FileEventTrigger {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._fileEventTriggerPropertiesDeserializer(item["properties"]),
  };
}

/** File trigger properties. */
export interface FileTriggerProperties {
  /** File event source details. */
  sourceInfo: FileSourceInfo;
  /** Role sink info. */
  sinkInfo: RoleSinkInfo;
  /** A custom context tag typically used to correlate the trigger against its usage. For example, if a periodic timer trigger is intended for certain specific IoT modules in the device, the tag can be the name or the image URL of the module. */
  customContextTag?: string;
}

export function fileTriggerPropertiesSerializer(item: FileTriggerProperties): any {
  return {
    sourceInfo: fileSourceInfoSerializer(item["sourceInfo"]),
    sinkInfo: roleSinkInfoSerializer(item["sinkInfo"]),
    customContextTag: item["customContextTag"],
  };
}

export function fileTriggerPropertiesDeserializer(item: any): FileTriggerProperties {
  return {
    sourceInfo: fileSourceInfoDeserializer(item["sourceInfo"]),
    sinkInfo: roleSinkInfoDeserializer(item["sinkInfo"]),
    customContextTag: item["customContextTag"],
  };
}

/** File source details. */
export interface FileSourceInfo {
  /** File share ID. */
  shareId: string;
}

export function fileSourceInfoSerializer(item: FileSourceInfo): any {
  return { shareId: item["shareId"] };
}

export function fileSourceInfoDeserializer(item: any): FileSourceInfo {
  return {
    shareId: item["shareId"],
  };
}

/** Compute role against which events will be raised. */
export interface RoleSinkInfo {
  /** Compute role ID. */
  roleId: string;
}

export function roleSinkInfoSerializer(item: RoleSinkInfo): any {
  return { roleId: item["roleId"] };
}

export function roleSinkInfoDeserializer(item: any): RoleSinkInfo {
  return {
    roleId: item["roleId"],
  };
}

/** Trigger details. */
export interface PeriodicTimerEventTrigger extends Trigger {
  /** Trigger Kind. */
  kind: "PeriodicTimerEvent";
  /** Periodic timer details. */
  sourceInfo: PeriodicTimerSourceInfo;
  /** Role Sink information. */
  sinkInfo: RoleSinkInfo;
  /** A custom context tag typically used to correlate the trigger against its usage. For example, if a periodic timer trigger is intended for certain specific IoT modules in the device, the tag can be the name or the image URL of the module. */
  customContextTag?: string;
}

export function periodicTimerEventTriggerSerializer(item: PeriodicTimerEventTrigger): any {
  return { kind: item["kind"], properties: _periodicTimerEventTriggerPropertiesSerializer(item) };
}

export function periodicTimerEventTriggerDeserializer(item: any): PeriodicTimerEventTrigger {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._periodicTimerEventTriggerPropertiesDeserializer(item["properties"]),
  };
}

/** Periodic timer trigger properties. */
export interface PeriodicTimerProperties {
  /** Periodic timer details. */
  sourceInfo: PeriodicTimerSourceInfo;
  /** Role Sink information. */
  sinkInfo: RoleSinkInfo;
  /** A custom context tag typically used to correlate the trigger against its usage. For example, if a periodic timer trigger is intended for certain specific IoT modules in the device, the tag can be the name or the image URL of the module. */
  customContextTag?: string;
}

export function periodicTimerPropertiesSerializer(item: PeriodicTimerProperties): any {
  return {
    sourceInfo: periodicTimerSourceInfoSerializer(item["sourceInfo"]),
    sinkInfo: roleSinkInfoSerializer(item["sinkInfo"]),
    customContextTag: item["customContextTag"],
  };
}

export function periodicTimerPropertiesDeserializer(item: any): PeriodicTimerProperties {
  return {
    sourceInfo: periodicTimerSourceInfoDeserializer(item["sourceInfo"]),
    sinkInfo: roleSinkInfoDeserializer(item["sinkInfo"]),
    customContextTag: item["customContextTag"],
  };
}

/** Periodic timer event source. */
export interface PeriodicTimerSourceInfo {
  /** The time of the day that results in a valid trigger. Schedule is computed with reference to the time specified upto seconds. If timezone is not specified the time will considered to be in device timezone. The value will always be returned as UTC time. */
  startTime: Date;
  /** Periodic frequency at which timer event needs to be raised. Supports daily, hourly, minutes, and seconds. */
  schedule: string;
  /** Topic where periodic events are published to IoT device. */
  topic?: string;
}

export function periodicTimerSourceInfoSerializer(item: PeriodicTimerSourceInfo): any {
  return {
    startTime: item["startTime"].toISOString(),
    schedule: item["schedule"],
    topic: item["topic"],
  };
}

export function periodicTimerSourceInfoDeserializer(item: any): PeriodicTimerSourceInfo {
  return {
    startTime: new Date(item["startTime"]),
    schedule: item["schedule"],
    topic: item["topic"],
  };
}

/** Collection of all trigger on the data box edge device. */
export interface _TriggerList {
  /** The Trigger items on this page */
  readonly value: TriggerUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _triggerListDeserializer(item: any): _TriggerList {
  return {
    value: triggerUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function triggerUnionArraySerializer(result: Array<TriggerUnion>): any[] {
  return result.map((item) => {
    return triggerUnionSerializer(item);
  });
}

export function triggerUnionArrayDeserializer(result: Array<TriggerUnion>): any[] {
  return result.map((item) => {
    return triggerUnionDeserializer(item);
  });
}

/** Represents a user who has access to one or more shares on the Data Box Edge/Gateway device. */
export interface User extends ProxyResource {
  /** The password details. */
  encryptedPassword?: AsymmetricEncryptedSecret;
  /** List of shares that the user has rights on. This field should not be specified during user creation. */
  readonly shareAccessRights?: ShareAccessRight[];
  /** Type of the user. */
  userType: UserType;
}

export function userSerializer(item: User): any {
  return { properties: _userPropertiesSerializer(item) };
}

export function userDeserializer(item: any): User {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._userPropertiesDeserializer(item["properties"]),
  };
}

/** The user properties. */
export interface UserProperties {
  /** The password details. */
  encryptedPassword?: AsymmetricEncryptedSecret;
  /** List of shares that the user has rights on. This field should not be specified during user creation. */
  readonly shareAccessRights?: ShareAccessRight[];
  /** Type of the user. */
  userType: UserType;
}

export function userPropertiesSerializer(item: UserProperties): any {
  return {
    encryptedPassword: !item["encryptedPassword"]
      ? item["encryptedPassword"]
      : asymmetricEncryptedSecretSerializer(item["encryptedPassword"]),
    userType: item["userType"],
  };
}

export function userPropertiesDeserializer(item: any): UserProperties {
  return {
    encryptedPassword: !item["encryptedPassword"]
      ? item["encryptedPassword"]
      : asymmetricEncryptedSecretDeserializer(item["encryptedPassword"]),
    shareAccessRights: !item["shareAccessRights"]
      ? item["shareAccessRights"]
      : shareAccessRightArrayDeserializer(item["shareAccessRights"]),
    userType: item["userType"],
  };
}

export function shareAccessRightArrayDeserializer(result: Array<ShareAccessRight>): any[] {
  return result.map((item) => {
    return shareAccessRightDeserializer(item);
  });
}

/** Specifies the mapping between this particular user and the type of access he has on shares on this device. */
export interface ShareAccessRight {
  /** The share ID. */
  shareId: string;
  /** Type of access to be allowed on the share for this user. */
  accessType: ShareAccessType;
}

export function shareAccessRightDeserializer(item: any): ShareAccessRight {
  return {
    shareId: item["shareId"],
    accessType: item["accessType"],
  };
}

/** Type of the user. */
export enum KnownUserType {
  /** Share */
  Share = "Share",
  /** LocalManagement */
  LocalManagement = "LocalManagement",
  /** ARM */
  ARM = "ARM",
}

/**
 * Type of the user. \
 * {@link KnownUserType} can be used interchangeably with UserType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Share** \
 * **LocalManagement** \
 * **ARM**
 */
export type UserType = string;

/** Collection of users. */
export interface _UserList {
  /** The User items on this page */
  readonly value: User[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _userListDeserializer(item: any): _UserList {
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

/** Object for Capturing DeviceCapacityRequestInfo */
export interface DeviceCapacityRequestInfo {
  /** Array containing the sizes of the VMs for checking if its feasible to create them on the appliance. */
  vmPlacementQuery: string[][];
  /** Array of the VMs of the sizes in VmSizes can be provisioned on the appliance. */
  vmPlacementResults?: VmPlacementRequestResult[];
}

export function deviceCapacityRequestInfoSerializer(item: DeviceCapacityRequestInfo): any {
  return { properties: _deviceCapacityRequestInfoPropertiesSerializer(item) };
}

/** Properties of Device Capacity Request Info containing VM's to be checked and their corresponding results. */
export interface DeviceCapacityRequestInfoProperties {
  /** Array containing the sizes of the VMs for checking if its feasible to create them on the appliance. */
  vmPlacementQuery: string[][];
  /** Array of the VMs of the sizes in VmSizes can be provisioned on the appliance. */
  vmPlacementResults?: VmPlacementRequestResult[];
}

export function deviceCapacityRequestInfoPropertiesSerializer(
  item: DeviceCapacityRequestInfoProperties,
): any {
  return {
    vmPlacementQuery: item["vmPlacementQuery"].map((p: any) => {
      return p.map((p: any) => {
        return p;
      });
    }),
    vmPlacementResults: !item["vmPlacementResults"]
      ? item["vmPlacementResults"]
      : vmPlacementRequestResultArraySerializer(item["vmPlacementResults"]),
  };
}

export function vmPlacementRequestResultArraySerializer(
  result: Array<VmPlacementRequestResult>,
): any[] {
  return result.map((item) => {
    return vmPlacementRequestResultSerializer(item);
  });
}

/** List of VM sizes being checked for creation on appliance along with corresponding result. */
export interface VmPlacementRequestResult {
  /** List of VM sizes being checked. */
  vmSize?: string[];
  /** Boolean value indicating if the VM(s) in VmSize can be created. */
  isFeasible?: boolean;
  /** MessageCode indicating reason for success or failure. */
  messageCode?: string;
  /** Localized message to be displayed to the user to explain the check result. */
  message?: string;
}

export function vmPlacementRequestResultSerializer(item: VmPlacementRequestResult): any {
  return {
    vmSize: !item["vmSize"]
      ? item["vmSize"]
      : item["vmSize"].map((p: any) => {
          return p;
        }),
    isFeasible: item["isFeasible"],
    messageCode: item["messageCode"],
    message: item["message"],
  };
}

/** Collection of Nodes. */
export interface _NodeList {
  /** The Node items on this page */
  readonly value: Node[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nodeListDeserializer(item: any): _NodeList {
  return {
    value: nodeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nodeArrayDeserializer(result: Array<Node>): any[] {
  return result.map((item) => {
    return nodeDeserializer(item);
  });
}

/**
 * Represents a single node in a Data box Edge/Gateway device
 * Gateway devices, standalone Edge devices and a single node cluster Edge device will all have 1 node
 * Multi-node Edge devices will have more than 1 nodes
 */
export interface Node extends ARMBaseModel {
  /** The current status of the individual node */
  readonly nodeStatus?: NodeStatus;
  /** Serial number of the Chassis */
  readonly nodeChassisSerialNumber?: string;
  /** Serial number of the individual node */
  readonly nodeSerialNumber?: string;
  /** Display Name of the individual node */
  readonly nodeDisplayName?: string;
  /** Friendly software version name that is currently installed on the node */
  readonly nodeFriendlySoftwareVersion?: string;
  /** HCS version that is currently installed on the node */
  readonly nodeHcsVersion?: string;
  /** Guid instance id of the node */
  readonly nodeInstanceId?: string;
}

export function nodeDeserializer(item: any): Node {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"] ? item["properties"] : _nodePropertiesDeserializer(item["properties"])),
  };
}

/** This class represents the nodes in a highly available cluster */
export interface NodeProperties {
  /** The current status of the individual node */
  readonly nodeStatus?: NodeStatus;
  /** Serial number of the Chassis */
  readonly nodeChassisSerialNumber?: string;
  /** Serial number of the individual node */
  readonly nodeSerialNumber?: string;
  /** Display Name of the individual node */
  readonly nodeDisplayName?: string;
  /** Friendly software version name that is currently installed on the node */
  readonly nodeFriendlySoftwareVersion?: string;
  /** HCS version that is currently installed on the node */
  readonly nodeHcsVersion?: string;
  /** Guid instance id of the node */
  readonly nodeInstanceId?: string;
}

export function nodePropertiesDeserializer(item: any): NodeProperties {
  return {
    nodeStatus: item["nodeStatus"],
    nodeChassisSerialNumber: item["nodeChassisSerialNumber"],
    nodeSerialNumber: item["nodeSerialNumber"],
    nodeDisplayName: item["nodeDisplayName"],
    nodeFriendlySoftwareVersion: item["nodeFriendlySoftwareVersion"],
    nodeHcsVersion: item["nodeHcsVersion"],
    nodeInstanceId: item["nodeInstanceId"],
  };
}

/** The current status of the individual node */
export enum KnownNodeStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** Up */
  Up = "Up",
  /** Down */
  Down = "Down",
  /** Rebooting */
  Rebooting = "Rebooting",
  /** ShuttingDown */
  ShuttingDown = "ShuttingDown",
}

/**
 * The current status of the individual node \
 * {@link KnownNodeStatus} can be used interchangeably with NodeStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Up** \
 * **Down** \
 * **Rebooting** \
 * **ShuttingDown**
 */
export type NodeStatus = string;

/** The request object for trigger support package. */
export interface TriggerSupportPackageRequest extends ARMBaseModel {
  /** MinimumTimeStamp from where logs need to be collected */
  minimumTimeStamp?: Date;
  /** Start of the timespan of the log collection */
  maximumTimeStamp?: Date;
  /**
   * Type of files, which need to be included in the logs
   * This will contain the type of logs (Default/DefaultWithDumps/None/All/DefaultWithArchived)
   * or a comma separated list of log types that are required
   */
  include?: string;
}

export function triggerSupportPackageRequestSerializer(item: TriggerSupportPackageRequest): any {
  return { properties: _triggerSupportPackageRequestPropertiesSerializer(item) };
}

/** The share properties. */
export interface SupportPackageRequestProperties {
  /** MinimumTimeStamp from where logs need to be collected */
  minimumTimeStamp?: Date;
  /** Start of the timespan of the log collection */
  maximumTimeStamp?: Date;
  /**
   * Type of files, which need to be included in the logs
   * This will contain the type of logs (Default/DefaultWithDumps/None/All/DefaultWithArchived)
   * or a comma separated list of log types that are required
   */
  include?: string;
}

export function supportPackageRequestPropertiesSerializer(
  item: SupportPackageRequestProperties,
): any {
  return {
    minimumTimeStamp: !item["minimumTimeStamp"]
      ? item["minimumTimeStamp"]
      : item["minimumTimeStamp"].toISOString(),
    maximumTimeStamp: !item["maximumTimeStamp"]
      ? item["maximumTimeStamp"]
      : item["maximumTimeStamp"].toISOString(),
    include: item["include"],
  };
}

/** Object for Capturing DeviceCapacityInfo */
export interface DeviceCapacityInfo extends ProxyResource {
  /** Timestamp of request in UTC */
  timeStamp?: Date;
  /** Cluster capacity data for storage resources (CSV). */
  clusterStorageCapacityInfo?: ClusterStorageViewData;
  /** Cluster capacity data for compute resources (Memory and GPU). */
  clusterComputeCapacityInfo?: ClusterCapacityViewData;
  /** The dictionary of individual node names and node capacities in the cluster. */
  nodeCapacityInfos?: Record<string, HostCapacity>;
}

export function deviceCapacityInfoDeserializer(item: any): DeviceCapacityInfo {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _deviceCapacityInfoPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of Device Capacity Info */
export interface DeviceCapacityInfoProperties {
  /** Timestamp of request in UTC */
  timeStamp?: Date;
  /** Cluster capacity data for storage resources (CSV). */
  clusterStorageCapacityInfo?: ClusterStorageViewData;
  /** Cluster capacity data for compute resources (Memory and GPU). */
  clusterComputeCapacityInfo?: ClusterCapacityViewData;
  /** The dictionary of individual node names and node capacities in the cluster. */
  nodeCapacityInfos?: Record<string, HostCapacity>;
}

export function deviceCapacityInfoPropertiesDeserializer(item: any): DeviceCapacityInfoProperties {
  return {
    timeStamp: !item["timeStamp"] ? item["timeStamp"] : new Date(item["timeStamp"]),
    clusterStorageCapacityInfo: !item["clusterStorageCapacityInfo"]
      ? item["clusterStorageCapacityInfo"]
      : clusterStorageViewDataDeserializer(item["clusterStorageCapacityInfo"]),
    clusterComputeCapacityInfo: !item["clusterComputeCapacityInfo"]
      ? item["clusterComputeCapacityInfo"]
      : clusterCapacityViewDataDeserializer(item["clusterComputeCapacityInfo"]),
    nodeCapacityInfos: !item["nodeCapacityInfos"]
      ? item["nodeCapacityInfos"]
      : hostCapacityRecordDeserializer(item["nodeCapacityInfos"]),
  };
}

/** Cluster Storage Data. */
export interface ClusterStorageViewData {
  /** Total storage on the cluster in MB. */
  clusterTotalStorageMb?: number;
  /** The available or free storage on the cluster in MB. */
  clusterFreeStorageMb?: number;
}

export function clusterStorageViewDataDeserializer(item: any): ClusterStorageViewData {
  return {
    clusterTotalStorageMb: item["clusterTotalStorageMb"],
    clusterFreeStorageMb: item["clusterFreeStorageMb"],
  };
}

/** Cluster Compute Data. */
export interface ClusterCapacityViewData {
  /** The FQDN of the cluster. */
  fqdn?: string;
  /** The cluster's GPU capacity. */
  gpuCapacity?: ClusterGpuCapacity;
  /** The cluster's memory capacity. */
  memoryCapacity?: ClusterMemoryCapacity;
  /** The last time at which the ClusterCapacityViewData was set. */
  lastRefreshedTime?: Date;
  /** The total # of vCPUs provisioned by non-HPN VM per appliance. */
  totalProvisionedNonHpnCores?: number;
}

export function clusterCapacityViewDataDeserializer(item: any): ClusterCapacityViewData {
  return {
    fqdn: item["fqdn"],
    gpuCapacity: !item["gpuCapacity"]
      ? item["gpuCapacity"]
      : clusterGpuCapacityDeserializer(item["gpuCapacity"]),
    memoryCapacity: !item["memoryCapacity"]
      ? item["memoryCapacity"]
      : clusterMemoryCapacityDeserializer(item["memoryCapacity"]),
    lastRefreshedTime: !item["lastRefreshedTime"]
      ? item["lastRefreshedTime"]
      : new Date(item["lastRefreshedTime"]),
    totalProvisionedNonHpnCores: item["totalProvisionedNonHpnCores"],
  };
}

/** Cluster GPU Data. */
export interface ClusterGpuCapacity {
  /** The cluster GPU Type. */
  gpuType?: string;
  /** The used GPU units count in the cluster. */
  gpuUsedUnitsCount?: number;
  /** The free GPU units count in the cluster. */
  gpuFreeUnitsCount?: number;
  /** The GPU units count reserved for failover in the cluster. */
  gpuReservedForFailoverUnitsCount?: number;
  /** The total GPU units count in the cluster. */
  gpuTotalUnitsCount?: number;
}

export function clusterGpuCapacityDeserializer(item: any): ClusterGpuCapacity {
  return {
    gpuType: item["gpuType"],
    gpuUsedUnitsCount: item["gpuUsedUnitsCount"],
    gpuFreeUnitsCount: item["gpuFreeUnitsCount"],
    gpuReservedForFailoverUnitsCount: item["gpuReservedForFailoverUnitsCount"],
    gpuTotalUnitsCount: item["gpuTotalUnitsCount"],
  };
}

/** NodeCapacityInfo defines the required information to determine the placement of a VM. */
export interface ClusterMemoryCapacity {
  /** The free memory in the cluster in MB. */
  clusterFreeMemoryMb?: number;
  /** The used memory in the cluster in MB. */
  clusterUsedMemoryMb?: number;
  /** The failover memory in the cluster in MB. */
  clusterFailoverMemoryMb?: number;
  /** The fragmentation memory in the cluster in MB. */
  clusterFragmentationMemoryMb?: number;
  /** The memory reserved for Hyper-V in the cluster in MB. */
  clusterHypervReserveMemoryMb?: number;
  /** The memory of the Infra VM in the cluster in MB. */
  clusterInfraVmMemoryMb?: number;
  /** The total memory in the cluster in MB. */
  clusterTotalMemoryMb?: number;
  /** The non-failover memory in the cluster in MB. */
  clusterNonFailoverVmMb?: number;
  /** The memory used by VMs in the cluster in MB. */
  clusterMemoryUsedByVmsMb?: number;
}

export function clusterMemoryCapacityDeserializer(item: any): ClusterMemoryCapacity {
  return {
    clusterFreeMemoryMb: item["clusterFreeMemoryMb"],
    clusterUsedMemoryMb: item["clusterUsedMemoryMb"],
    clusterFailoverMemoryMb: item["clusterFailoverMemoryMb"],
    clusterFragmentationMemoryMb: item["clusterFragmentationMemoryMb"],
    clusterHypervReserveMemoryMb: item["clusterHypervReserveMemoryMb"],
    clusterInfraVmMemoryMb: item["clusterInfraVmMemoryMb"],
    clusterTotalMemoryMb: item["clusterTotalMemoryMb"],
    clusterNonFailoverVmMb: item["clusterNonFailoverVmMb"],
    clusterMemoryUsedByVmsMb: item["clusterMemoryUsedByVmsMb"],
  };
}

export function hostCapacityRecordDeserializer(
  item: Record<string, any>,
): Record<string, HostCapacity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : hostCapacityDeserializer(item[key]);
  });
  return result;
}

/** Host Capacity Data. */
export interface HostCapacity {
  /** The name of the host. */
  hostName?: string;
  /** The available memory on the host accounting for VM placement size and any host VM reservations. */
  effectiveAvailableMemoryMbOnHost?: number;
  /** The available amount of GPUs on the host to use after accounting for GPUS used by reservations on the host. */
  availableGpuCount?: number;
  /** The VM used memory per VmId. */
  vmUsedMemory?: Record<string, VmMemory>;
  /** The GPU type of the VM. */
  gpuType?: string;
  /** The numa nodes information for Hpn VMs. */
  numaNodesData?: NumaNodeData[];
}

export function hostCapacityDeserializer(item: any): HostCapacity {
  return {
    hostName: item["hostName"],
    effectiveAvailableMemoryMbOnHost: item["effectiveAvailableMemoryMbOnHost"],
    availableGpuCount: item["availableGpuCount"],
    vmUsedMemory: !item["vmUsedMemory"]
      ? item["vmUsedMemory"]
      : vmMemoryRecordDeserializer(item["vmUsedMemory"]),
    gpuType: item["gpuType"],
    numaNodesData: !item["numaNodesData"]
      ? item["numaNodesData"]
      : numaNodeDataArrayDeserializer(item["numaNodesData"]),
  };
}

export function vmMemoryRecordDeserializer(item: Record<string, any>): Record<string, VmMemory> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : vmMemoryDeserializer(item[key]);
  });
  return result;
}

/** VmMemory Data. */
export interface VmMemory {
  /** The total amount of RAM in the virtual machine, as seen by the guest  operating system. For a virtual machine with dynamic memory enabled, this represents the initial memory available at startup. */
  startupMemoryMB?: number;
  /** The current memory used by the virtual machine. */
  currentMemoryUsageMB?: number;
}

export function vmMemoryDeserializer(item: any): VmMemory {
  return {
    startupMemoryMB: item["startupMemoryMB"],
    currentMemoryUsageMB: item["currentMemoryUsageMB"],
  };
}

export function numaNodeDataArrayDeserializer(result: Array<NumaNodeData>): any[] {
  return result.map((item) => {
    return numaNodeDataDeserializer(item);
  });
}

/** NUMA node data. */
export interface NumaNodeData {
  /** The NUMA node index. */
  numaNodeIndex?: number;
  /** The total memory on the NUMA node. */
  totalMemoryInMb?: number;
  /** The logical cores per core count. */
  logicalCoreCountPerCore?: number;
  /** The effective available memory on the NUMA node in MB. */
  effectiveAvailableMemoryInMb?: number;
  /** The free VCPU indices for the Hpn VMs. */
  freeVCpuIndexesForHpn?: number[];
  /** The VCPU indices for Hpn VMs */
  vCpuIndexesForHpn?: number[];
  /** The VCPU indices for the root. */
  vCpuIndexesForRoot?: number[];
}

export function numaNodeDataDeserializer(item: any): NumaNodeData {
  return {
    numaNodeIndex: item["numaNodeIndex"],
    totalMemoryInMb: item["totalMemoryInMb"],
    logicalCoreCountPerCore: item["logicalCoreCountPerCore"],
    effectiveAvailableMemoryInMb: item["effectiveAvailableMemoryInMb"],
    freeVCpuIndexesForHpn: !item["freeVCpuIndexesForHpn"]
      ? item["freeVCpuIndexesForHpn"]
      : item["freeVCpuIndexesForHpn"].map((p: any) => {
          return p;
        }),
    vCpuIndexesForHpn: !item["vCpuIndexesForHpn"]
      ? item["vCpuIndexesForHpn"]
      : item["vCpuIndexesForHpn"].map((p: any) => {
          return p;
        }),
    vCpuIndexesForRoot: !item["vCpuIndexesForRoot"]
      ? item["vCpuIndexesForRoot"]
      : item["vCpuIndexesForRoot"].map((p: any) => {
          return p;
        }),
  };
}

/** The metric setting details for the role */
export interface MonitoringMetricConfiguration extends ProxyResource {
  /** The metrics configuration details */
  metricConfigurations: MetricConfiguration[];
}

export function monitoringMetricConfigurationSerializer(item: MonitoringMetricConfiguration): any {
  return { properties: _monitoringMetricConfigurationPropertiesSerializer(item) };
}

export function monitoringMetricConfigurationDeserializer(
  item: any,
): MonitoringMetricConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._monitoringMetricConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** Metrics properties */
export interface MonitoringMetricConfigurationProperties {
  /** The metrics configuration details */
  metricConfigurations: MetricConfiguration[];
}

export function monitoringMetricConfigurationPropertiesSerializer(
  item: MonitoringMetricConfigurationProperties,
): any {
  return { metricConfigurations: metricConfigurationArraySerializer(item["metricConfigurations"]) };
}

export function monitoringMetricConfigurationPropertiesDeserializer(
  item: any,
): MonitoringMetricConfigurationProperties {
  return {
    metricConfigurations: metricConfigurationArrayDeserializer(item["metricConfigurations"]),
  };
}

export function metricConfigurationArraySerializer(result: Array<MetricConfiguration>): any[] {
  return result.map((item) => {
    return metricConfigurationSerializer(item);
  });
}

export function metricConfigurationArrayDeserializer(result: Array<MetricConfiguration>): any[] {
  return result.map((item) => {
    return metricConfigurationDeserializer(item);
  });
}

/** Metric configuration. */
export interface MetricConfiguration {
  /** The Resource ID on which the metrics should be pushed. */
  resourceId: string;
  /** The MDM account to which the counters should be pushed. */
  mdmAccount?: string;
  /** The MDM namespace to which the counters should be pushed. This is required if MDMAccount is specified */
  metricNameSpace?: string;
  /** Host name for the IoT hub associated to the device. */
  counterSets: MetricCounterSet[];
}

export function metricConfigurationSerializer(item: MetricConfiguration): any {
  return {
    resourceId: item["resourceId"],
    mdmAccount: item["mdmAccount"],
    metricNameSpace: item["metricNameSpace"],
    counterSets: metricCounterSetArraySerializer(item["counterSets"]),
  };
}

export function metricConfigurationDeserializer(item: any): MetricConfiguration {
  return {
    resourceId: item["resourceId"],
    mdmAccount: item["mdmAccount"],
    metricNameSpace: item["metricNameSpace"],
    counterSets: metricCounterSetArrayDeserializer(item["counterSets"]),
  };
}

export function metricCounterSetArraySerializer(result: Array<MetricCounterSet>): any[] {
  return result.map((item) => {
    return metricCounterSetSerializer(item);
  });
}

export function metricCounterSetArrayDeserializer(result: Array<MetricCounterSet>): any[] {
  return result.map((item) => {
    return metricCounterSetDeserializer(item);
  });
}

/** The metric counter set */
export interface MetricCounterSet {
  /** The counters that should be collected in this set. */
  counters: MetricCounter[];
}

export function metricCounterSetSerializer(item: MetricCounterSet): any {
  return { counters: metricCounterArraySerializer(item["counters"]) };
}

export function metricCounterSetDeserializer(item: any): MetricCounterSet {
  return {
    counters: metricCounterArrayDeserializer(item["counters"]),
  };
}

export function metricCounterArraySerializer(result: Array<MetricCounter>): any[] {
  return result.map((item) => {
    return metricCounterSerializer(item);
  });
}

export function metricCounterArrayDeserializer(result: Array<MetricCounter>): any[] {
  return result.map((item) => {
    return metricCounterDeserializer(item);
  });
}

/** The metric counter */
export interface MetricCounter {
  /** The counter name. */
  name: string;
  /** The instance from which counter should be collected. */
  instance?: string;
  /** The dimension filter. */
  dimensionFilter?: MetricDimension[];
  /** The additional dimensions to be added to metric. */
  additionalDimensions?: MetricDimension[];
}

export function metricCounterSerializer(item: MetricCounter): any {
  return {
    name: item["name"],
    instance: item["instance"],
    dimensionFilter: !item["dimensionFilter"]
      ? item["dimensionFilter"]
      : metricDimensionArraySerializer(item["dimensionFilter"]),
    additionalDimensions: !item["additionalDimensions"]
      ? item["additionalDimensions"]
      : metricDimensionArraySerializer(item["additionalDimensions"]),
  };
}

export function metricCounterDeserializer(item: any): MetricCounter {
  return {
    name: item["name"],
    instance: item["instance"],
    dimensionFilter: !item["dimensionFilter"]
      ? item["dimensionFilter"]
      : metricDimensionArrayDeserializer(item["dimensionFilter"]),
    additionalDimensions: !item["additionalDimensions"]
      ? item["additionalDimensions"]
      : metricDimensionArrayDeserializer(item["additionalDimensions"]),
  };
}

export function metricDimensionArraySerializer(result: Array<MetricDimension>): any[] {
  return result.map((item) => {
    return metricDimensionSerializer(item);
  });
}

export function metricDimensionArrayDeserializer(result: Array<MetricDimension>): any[] {
  return result.map((item) => {
    return metricDimensionDeserializer(item);
  });
}

/** The metric dimension */
export interface MetricDimension {
  /** The dimension type. */
  sourceType: string;
  /** The dimension value. */
  sourceName: string;
}

export function metricDimensionSerializer(item: MetricDimension): any {
  return { sourceType: item["sourceType"], sourceName: item["sourceName"] };
}

export function metricDimensionDeserializer(item: any): MetricDimension {
  return {
    sourceType: item["sourceType"],
    sourceName: item["sourceName"],
  };
}

/** Collection of metric configurations. */
export interface _MonitoringMetricConfigurationList {
  /** The MonitoringMetricConfiguration items on this page */
  readonly value: MonitoringMetricConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _monitoringMetricConfigurationListDeserializer(
  item: any,
): _MonitoringMetricConfigurationList {
  return {
    value: monitoringMetricConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function monitoringMetricConfigurationArraySerializer(
  result: Array<MonitoringMetricConfiguration>,
): any[] {
  return result.map((item) => {
    return monitoringMetricConfigurationSerializer(item);
  });
}

export function monitoringMetricConfigurationArrayDeserializer(
  result: Array<MonitoringMetricConfiguration>,
): any[] {
  return result.map((item) => {
    return monitoringMetricConfigurationDeserializer(item);
  });
}

/** List of SKU Information objects. */
export interface _DataBoxEdgeSkuList {
  /** The DataBoxEdgeSku items on this page */
  readonly value: DataBoxEdgeSku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dataBoxEdgeSkuListDeserializer(item: any): _DataBoxEdgeSkuList {
  return {
    value: dataBoxEdgeSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataBoxEdgeSkuArrayDeserializer(result: Array<DataBoxEdgeSku>): any[] {
  return result.map((item) => {
    return dataBoxEdgeSkuDeserializer(item);
  });
}

/** The Sku information. */
export interface DataBoxEdgeSku {
  /** The type of the resource. */
  readonly resourceType?: string;
  /** The Sku name. */
  readonly name?: SkuName;
  /** The Sku kind. */
  readonly kind?: string;
  /** The Sku tier. */
  readonly tier?: SkuTier;
  /** The Sku kind. */
  readonly size?: string;
  /** The Sku family. */
  readonly family?: string;
  /** Availability of the Sku for the region. */
  readonly locations?: string[];
  /** The API versions in which Sku is available. */
  readonly apiVersions?: string[];
  /** Availability of the Sku for the location/zone/site. */
  readonly locationInfo?: SkuLocationInfo[];
  /** The pricing info of the Sku. */
  readonly costs?: SkuCost[];
  /** Sku can be signed up by customer or not. */
  readonly signupOption?: SkuSignupOption;
  /** Availability of the Sku as preview/stable. */
  readonly version?: SkuVersion;
  /** Links to the next set of results */
  readonly availability?: SkuAvailability;
  /** List of Shipment Types supported by this SKU */
  readonly shipmentTypes?: ShipmentType[];
  /** The capability info of the SKU. */
  readonly capabilities?: SkuCapability[];
}

export function dataBoxEdgeSkuDeserializer(item: any): DataBoxEdgeSku {
  return {
    resourceType: item["resourceType"],
    name: item["name"],
    kind: item["kind"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    apiVersions: !item["apiVersions"]
      ? item["apiVersions"]
      : item["apiVersions"].map((p: any) => {
          return p;
        }),
    locationInfo: !item["locationInfo"]
      ? item["locationInfo"]
      : skuLocationInfoArrayDeserializer(item["locationInfo"]),
    costs: !item["costs"] ? item["costs"] : skuCostArrayDeserializer(item["costs"]),
    signupOption: item["signupOption"],
    version: item["version"],
    availability: item["availability"],
    shipmentTypes: !item["shipmentTypes"]
      ? item["shipmentTypes"]
      : item["shipmentTypes"].map((p: any) => {
          return p;
        }),
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
  /** The sites. */
  readonly sites?: string[];
}

export function skuLocationInfoDeserializer(item: any): SkuLocationInfo {
  return {
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    sites: !item["sites"]
      ? item["sites"]
      : item["sites"].map((p: any) => {
          return p;
        }),
  };
}

export function skuCostArrayDeserializer(result: Array<SkuCost>): any[] {
  return result.map((item) => {
    return skuCostDeserializer(item);
  });
}

/** The metadata for retrieving price info. */
export interface SkuCost {
  /** Used for querying price from commerce. */
  readonly meterId?: string;
  /** The cost quantity. */
  readonly quantity?: number;
  /** The extended unit. */
  readonly extendedUnit?: string;
}

export function skuCostDeserializer(item: any): SkuCost {
  return {
    meterId: item["meterId"],
    quantity: item["quantity"],
    extendedUnit: item["extendedUnit"],
  };
}

/** Sku can be signed up by customer or not. */
export enum KnownSkuSignupOption {
  /** None */
  None = "None",
  /** Available */
  Available = "Available",
}

/**
 * Sku can be signed up by customer or not. \
 * {@link KnownSkuSignupOption} can be used interchangeably with SkuSignupOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Available**
 */
export type SkuSignupOption = string;

/** Availability of the Sku as preview/stable. */
export enum KnownSkuVersion {
  /** Stable */
  Stable = "Stable",
  /** Preview */
  Preview = "Preview",
}

/**
 * Availability of the Sku as preview/stable. \
 * {@link KnownSkuVersion} can be used interchangeably with SkuVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Stable** \
 * **Preview**
 */
export type SkuVersion = string;

/** Links to the next set of results */
export enum KnownSkuAvailability {
  /** Available */
  Available = "Available",
  /** Unavailable */
  Unavailable = "Unavailable",
}

/**
 * Links to the next set of results \
 * {@link KnownSkuAvailability} can be used interchangeably with SkuAvailability,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available** \
 * **Unavailable**
 */
export type SkuAvailability = string;

export function skuCapabilityArrayDeserializer(result: Array<SkuCapability>): any[] {
  return result.map((item) => {
    return skuCapabilityDeserializer(item);
  });
}

/** The metadata to describe the capability. */
export interface SkuCapability {
  /** An invariant to describe the feature. */
  readonly name?: string;
  /** An invariant if the feature is measured by quantity. */
  readonly value?: string;
}

export function skuCapabilityDeserializer(item: any): SkuCapability {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-12-01 API version. */
  V20231201 = "2023-12-01",
}

export function _jobPropertiesDeserializer(item: any) {
  return {
    jobType: item["jobType"],
    currentStage: item["currentStage"],
    downloadProgress: !item["downloadProgress"]
      ? item["downloadProgress"]
      : updateDownloadProgressDeserializer(item["downloadProgress"]),
    installProgress: !item["installProgress"]
      ? item["installProgress"]
      : updateInstallProgressDeserializer(item["installProgress"]),
    totalRefreshErrors: item["totalRefreshErrors"],
    errorManifestFile: item["errorManifestFile"],
    refreshedEntityId: item["refreshedEntityId"],
    folder: item["folder"],
  };
}

export function _networkSettingsPropertiesDeserializer(item: any) {
  return {
    networkAdapters: !item["networkAdapters"]
      ? item["networkAdapters"]
      : networkAdapterArrayDeserializer(item["networkAdapters"]),
  };
}

export function _edgeProfileSubscriptionPropertiesDeserializer(item: any) {
  return {
    tenantId: item["tenantId"],
    locationPlacementId: item["locationPlacementId"],
    quotaId: item["quotaId"],
    serializedDetails: item["serializedDetails"],
    registeredFeatures: !item["registeredFeatures"]
      ? item["registeredFeatures"]
      : subscriptionRegisteredFeaturesArrayDeserializer(item["registeredFeatures"]),
  };
}

export function _dataBoxEdgeDevicePropertiesSerializer(item: DataBoxEdgeDevice): any {
  return {
    dataResidency: !item["dataResidency"]
      ? item["dataResidency"]
      : dataResidencySerializer(item["dataResidency"]),
  };
}

export function _dataBoxEdgeDevicePropertiesDeserializer(item: any) {
  return {
    systemDataPropertiesSystemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    dataBoxEdgeDeviceStatus: item["dataBoxEdgeDeviceStatus"],
    serialNumber: item["serialNumber"],
    description: item["description"],
    modelDescription: item["modelDescription"],
    deviceType: item["deviceType"],
    friendlyName: item["friendlyName"],
    culture: item["culture"],
    deviceModel: item["deviceModel"],
    deviceSoftwareVersion: item["deviceSoftwareVersion"],
    deviceLocalCapacity: item["deviceLocalCapacity"],
    timeZone: item["timeZone"],
    deviceHcsVersion: item["deviceHcsVersion"],
    configuredRoleTypes: !item["configuredRoleTypes"]
      ? item["configuredRoleTypes"]
      : item["configuredRoleTypes"].map((p: any) => {
          return p;
        }),
    nodeCount: item["nodeCount"],
    resourceMoveDetails: !item["resourceMoveDetails"]
      ? item["resourceMoveDetails"]
      : resourceMoveDetailsDeserializer(item["resourceMoveDetails"]),
    edgeProfile: !item["edgeProfile"]
      ? item["edgeProfile"]
      : edgeProfileDeserializer(item["edgeProfile"]),
    dataResidency: !item["dataResidency"]
      ? item["dataResidency"]
      : dataResidencyDeserializer(item["dataResidency"]),
    kubernetesWorkloadProfile: item["kubernetesWorkloadProfile"],
  };
}

export function _dataBoxEdgeDevicePatchPropertiesSerializer(item: DataBoxEdgeDevicePatch): any {
  return {
    edgeProfile: !item["edgeProfile"]
      ? item["edgeProfile"]
      : edgeProfilePatchSerializer(item["edgeProfile"]),
  };
}

export function _dataBoxEdgeDeviceExtendedInfoPropertiesDeserializer(item: any) {
  return {
    encryptionKeyThumbprint: item["encryptionKeyThumbprint"],
    encryptionKey: item["encryptionKey"],
    resourceKey: item["resourceKey"],
    clientSecretStoreId: item["clientSecretStoreId"],
    clientSecretStoreUrl: item["clientSecretStoreUrl"],
    channelIntegrityKeyName: item["channelIntegrityKeyName"],
    channelIntegrityKeyVersion: item["channelIntegrityKeyVersion"],
    keyVaultSyncStatus: item["keyVaultSyncStatus"],
    deviceSecrets: !item["deviceSecrets"]
      ? item["deviceSecrets"]
      : secretRecordDeserializer(item["deviceSecrets"]),
    clusterWitnessType: item["clusterWitnessType"],
    fileShareWitnessLocation: item["fileShareWitnessLocation"],
    fileShareWitnessUsername: item["fileShareWitnessUsername"],
    cloudWitnessStorageAccountName: item["cloudWitnessStorageAccountName"],
    cloudWitnessContainerName: item["cloudWitnessContainerName"],
    cloudWitnessStorageEndpoint: item["cloudWitnessStorageEndpoint"],
  };
}

export function _securitySettingsPropertiesSerializer(item: SecuritySettings): any {
  return { deviceAdminPassword: asymmetricEncryptedSecretSerializer(item["deviceAdminPassword"]) };
}

export function _uploadCertificateRequestPropertiesSerializer(item: UploadCertificateRequest): any {
  return { authenticationType: item["authenticationType"], certificate: item["certificate"] };
}

export function _updateSummaryPropertiesDeserializer(item: any) {
  return {
    deviceVersionNumber: item["deviceVersionNumber"],
    friendlyDeviceVersionName: item["friendlyDeviceVersionName"],
    deviceLastScannedDateTime: !item["deviceLastScannedDateTime"]
      ? item["deviceLastScannedDateTime"]
      : new Date(item["deviceLastScannedDateTime"]),
    lastCompletedScanJobDateTime: !item["lastCompletedScanJobDateTime"]
      ? item["lastCompletedScanJobDateTime"]
      : new Date(item["lastCompletedScanJobDateTime"]),
    lastSuccessfulScanJobTime: !item["lastSuccessfulScanJobTime"]
      ? item["lastSuccessfulScanJobTime"]
      : new Date(item["lastSuccessfulScanJobTime"]),
    lastCompletedDownloadJobDateTime: !item["lastCompletedDownloadJobDateTime"]
      ? item["lastCompletedDownloadJobDateTime"]
      : new Date(item["lastCompletedDownloadJobDateTime"]),
    lastCompletedDownloadJobId: item["lastCompletedDownloadJobId"],
    lastDownloadJobStatus: item["lastDownloadJobStatus"],
    lastSuccessfulInstallJobDateTime: !item["lastSuccessfulInstallJobDateTime"]
      ? item["lastSuccessfulInstallJobDateTime"]
      : new Date(item["lastSuccessfulInstallJobDateTime"]),
    lastCompletedInstallJobDateTime: !item["lastCompletedInstallJobDateTime"]
      ? item["lastCompletedInstallJobDateTime"]
      : new Date(item["lastCompletedInstallJobDateTime"]),
    lastCompletedInstallJobId: item["lastCompletedInstallJobId"],
    lastInstallJobStatus: item["lastInstallJobStatus"],
    totalNumberOfUpdatesAvailable: item["totalNumberOfUpdatesAvailable"],
    totalNumberOfUpdatesPendingDownload: item["totalNumberOfUpdatesPendingDownload"],
    totalNumberOfUpdatesPendingInstall: item["totalNumberOfUpdatesPendingInstall"],
    rebootBehavior: item["rebootBehavior"],
    ongoingUpdateOperation: item["ongoingUpdateOperation"],
    inProgressDownloadJobId: item["inProgressDownloadJobId"],
    inProgressInstallJobId: item["inProgressInstallJobId"],
    inProgressDownloadJobStartedDateTime: !item["inProgressDownloadJobStartedDateTime"]
      ? item["inProgressDownloadJobStartedDateTime"]
      : new Date(item["inProgressDownloadJobStartedDateTime"]),
    inProgressInstallJobStartedDateTime: !item["inProgressInstallJobStartedDateTime"]
      ? item["inProgressInstallJobStartedDateTime"]
      : new Date(item["inProgressInstallJobStartedDateTime"]),
    updateTitles: !item["updateTitles"]
      ? item["updateTitles"]
      : item["updateTitles"].map((p: any) => {
          return p;
        }),
    updates: !item["updates"] ? item["updates"] : updateDetailsArrayDeserializer(item["updates"]),
    totalUpdateSizeInBytes: item["totalUpdateSizeInBytes"],
    totalTimeInMinutes: item["totalTimeInMinutes"],
  };
}

export function _operationPropertiesDeserializer(item: any) {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

export function _alertPropertiesDeserializer(item: any) {
  return {
    title: item["title"],
    alertType: item["alertType"],
    appearedAtDateTime: !item["appearedAtDateTime"]
      ? item["appearedAtDateTime"]
      : new Date(item["appearedAtDateTime"]),
    recommendation: item["recommendation"],
    severity: item["severity"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : alertErrorDetailsDeserializer(item["errorDetails"]),
    detailedInformation: !item["detailedInformation"]
      ? item["detailedInformation"]
      : Object.fromEntries(
          Object.entries(item["detailedInformation"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function _bandwidthSchedulePropertiesSerializer(item: BandwidthSchedule): any {
  return {
    start: item["start"],
    stop: item["stop"],
    rateInMbps: item["rateInMbps"],
    days: item["days"].map((p: any) => {
      return p;
    }),
  };
}

export function _bandwidthSchedulePropertiesDeserializer(item: any) {
  return {
    start: item["start"],
    stop: item["stop"],
    rateInMbps: item["rateInMbps"],
    days: item["days"].map((p: any) => {
      return p;
    }),
  };
}

export function _diagnosticProactiveLogCollectionSettingsPropertiesSerializer(
  item: DiagnosticProactiveLogCollectionSettings,
): any {
  return { userConsent: item["userConsent"] };
}

export function _diagnosticProactiveLogCollectionSettingsPropertiesDeserializer(item: any) {
  return {
    userConsent: item["userConsent"],
  };
}

export function _diagnosticRemoteSupportSettingsPropertiesSerializer(
  item: DiagnosticRemoteSupportSettings,
): any {
  return {
    remoteSupportSettingsList: !item["remoteSupportSettingsList"]
      ? item["remoteSupportSettingsList"]
      : remoteSupportSettingsArraySerializer(item["remoteSupportSettingsList"]),
  };
}

export function _diagnosticRemoteSupportSettingsPropertiesDeserializer(item: any) {
  return {
    remoteSupportSettingsList: !item["remoteSupportSettingsList"]
      ? item["remoteSupportSettingsList"]
      : remoteSupportSettingsArrayDeserializer(item["remoteSupportSettingsList"]),
  };
}

export function _orderPropertiesSerializer(item: Order): any {
  return {
    contactInformation: !item["contactInformation"]
      ? item["contactInformation"]
      : contactDetailsSerializer(item["contactInformation"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : addressSerializer(item["shippingAddress"]),
    shipmentType: item["shipmentType"],
  };
}

export function _orderPropertiesDeserializer(item: any) {
  return {
    orderId: item["orderId"],
    contactInformation: !item["contactInformation"]
      ? item["contactInformation"]
      : contactDetailsDeserializer(item["contactInformation"]),
    shippingAddress: !item["shippingAddress"]
      ? item["shippingAddress"]
      : addressDeserializer(item["shippingAddress"]),
    currentStatus: !item["currentStatus"]
      ? item["currentStatus"]
      : orderStatusDeserializer(item["currentStatus"]),
    orderHistory: !item["orderHistory"]
      ? item["orderHistory"]
      : orderStatusArrayDeserializer(item["orderHistory"]),
    serialNumber: item["serialNumber"],
    deliveryTrackingInfo: !item["deliveryTrackingInfo"]
      ? item["deliveryTrackingInfo"]
      : trackingInfoArrayDeserializer(item["deliveryTrackingInfo"]),
    returnTrackingInfo: !item["returnTrackingInfo"]
      ? item["returnTrackingInfo"]
      : trackingInfoArrayDeserializer(item["returnTrackingInfo"]),
    shipmentType: item["shipmentType"],
  };
}

export function _dcAccessCodePropertiesDeserializer(item: any) {
  return {
    authCode: item["authCode"],
  };
}

export function _cloudEdgeManagementRolePropertiesSerializer(item: CloudEdgeManagementRole): any {
  return { roleStatus: item["roleStatus"] };
}

export function _cloudEdgeManagementRolePropertiesDeserializer(item: any) {
  return {
    localManagementStatus: item["localManagementStatus"],
    edgeProfile: !item["edgeProfile"]
      ? item["edgeProfile"]
      : edgeProfileDeserializer(item["edgeProfile"]),
    roleStatus: item["roleStatus"],
  };
}

export function _ioTRolePropertiesSerializer(item: IoTRole): any {
  return {
    hostPlatform: item["hostPlatform"],
    ioTDeviceDetails: !item["ioTDeviceDetails"]
      ? item["ioTDeviceDetails"]
      : ioTDeviceInfoSerializer(item["ioTDeviceDetails"]),
    ioTEdgeDeviceDetails: !item["ioTEdgeDeviceDetails"]
      ? item["ioTEdgeDeviceDetails"]
      : ioTDeviceInfoSerializer(item["ioTEdgeDeviceDetails"]),
    shareMappings: !item["shareMappings"]
      ? item["shareMappings"]
      : mountPointMapArraySerializer(item["shareMappings"]),
    ioTEdgeAgentInfo: !item["ioTEdgeAgentInfo"]
      ? item["ioTEdgeAgentInfo"]
      : ioTEdgeAgentInfoSerializer(item["ioTEdgeAgentInfo"]),
    computeResource: !item["computeResource"]
      ? item["computeResource"]
      : computeResourceSerializer(item["computeResource"]),
    roleStatus: item["roleStatus"],
  };
}

export function _ioTRolePropertiesDeserializer(item: any) {
  return {
    hostPlatform: item["hostPlatform"],
    ioTDeviceDetails: !item["ioTDeviceDetails"]
      ? item["ioTDeviceDetails"]
      : ioTDeviceInfoDeserializer(item["ioTDeviceDetails"]),
    ioTEdgeDeviceDetails: !item["ioTEdgeDeviceDetails"]
      ? item["ioTEdgeDeviceDetails"]
      : ioTDeviceInfoDeserializer(item["ioTEdgeDeviceDetails"]),
    shareMappings: !item["shareMappings"]
      ? item["shareMappings"]
      : mountPointMapArrayDeserializer(item["shareMappings"]),
    ioTEdgeAgentInfo: !item["ioTEdgeAgentInfo"]
      ? item["ioTEdgeAgentInfo"]
      : ioTEdgeAgentInfoDeserializer(item["ioTEdgeAgentInfo"]),
    hostPlatformType: item["hostPlatformType"],
    computeResource: !item["computeResource"]
      ? item["computeResource"]
      : computeResourceDeserializer(item["computeResource"]),
    roleStatus: item["roleStatus"],
  };
}

export function _kubernetesRolePropertiesSerializer(item: KubernetesRole): any {
  return {
    hostPlatform: item["hostPlatform"],
    kubernetesClusterInfo: !item["kubernetesClusterInfo"]
      ? item["kubernetesClusterInfo"]
      : kubernetesClusterInfoSerializer(item["kubernetesClusterInfo"]),
    kubernetesRoleResources: !item["kubernetesRoleResources"]
      ? item["kubernetesRoleResources"]
      : kubernetesRoleResourcesSerializer(item["kubernetesRoleResources"]),
    roleStatus: item["roleStatus"],
  };
}

export function _kubernetesRolePropertiesDeserializer(item: any) {
  return {
    hostPlatform: item["hostPlatform"],
    provisioningState: item["provisioningState"],
    hostPlatformType: item["hostPlatformType"],
    kubernetesClusterInfo: !item["kubernetesClusterInfo"]
      ? item["kubernetesClusterInfo"]
      : kubernetesClusterInfoDeserializer(item["kubernetesClusterInfo"]),
    kubernetesRoleResources: !item["kubernetesRoleResources"]
      ? item["kubernetesRoleResources"]
      : kubernetesRoleResourcesDeserializer(item["kubernetesRoleResources"]),
    roleStatus: item["roleStatus"],
  };
}

export function _mecRolePropertiesSerializer(item: MECRole): any {
  return {
    connectionString: !item["connectionString"]
      ? item["connectionString"]
      : asymmetricEncryptedSecretSerializer(item["connectionString"]),
    controllerEndpoint: item["controllerEndpoint"],
    resourceUniqueId: item["resourceUniqueId"],
    roleStatus: item["roleStatus"],
  };
}

export function _mecRolePropertiesDeserializer(item: any) {
  return {
    connectionString: !item["connectionString"]
      ? item["connectionString"]
      : asymmetricEncryptedSecretDeserializer(item["connectionString"]),
    controllerEndpoint: item["controllerEndpoint"],
    resourceUniqueId: item["resourceUniqueId"],
    roleStatus: item["roleStatus"],
  };
}

export function _arcAddonPropertiesSerializer(item: ArcAddon): any {
  return {
    subscriptionId: item["subscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    resourceName: item["resourceName"],
    resourceLocation: item["resourceLocation"],
  };
}

export function _arcAddonPropertiesDeserializer(item: any) {
  return {
    subscriptionId: item["subscriptionId"],
    resourceGroupName: item["resourceGroupName"],
    resourceName: item["resourceName"],
    resourceLocation: item["resourceLocation"],
    version: item["version"],
    hostPlatform: item["hostPlatform"],
    hostPlatformType: item["hostPlatformType"],
    provisioningState: item["provisioningState"],
  };
}

export function _ioTAddonPropertiesSerializer(item: IoTAddon): any {
  return {
    ioTDeviceDetails: ioTDeviceInfoSerializer(item["ioTDeviceDetails"]),
    ioTEdgeDeviceDetails: ioTDeviceInfoSerializer(item["ioTEdgeDeviceDetails"]),
  };
}

export function _ioTAddonPropertiesDeserializer(item: any) {
  return {
    ioTDeviceDetails: ioTDeviceInfoDeserializer(item["ioTDeviceDetails"]),
    ioTEdgeDeviceDetails: ioTDeviceInfoDeserializer(item["ioTEdgeDeviceDetails"]),
    version: item["version"],
    hostPlatform: item["hostPlatform"],
    hostPlatformType: item["hostPlatformType"],
    provisioningState: item["provisioningState"],
  };
}

export function _sharePropertiesSerializer(item: Share): any {
  return {
    description: item["description"],
    shareStatus: item["shareStatus"],
    monitoringStatus: item["monitoringStatus"],
    azureContainerInfo: !item["azureContainerInfo"]
      ? item["azureContainerInfo"]
      : azureContainerInfoSerializer(item["azureContainerInfo"]),
    accessProtocol: item["accessProtocol"],
    userAccessRights: !item["userAccessRights"]
      ? item["userAccessRights"]
      : userAccessRightArraySerializer(item["userAccessRights"]),
    clientAccessRights: !item["clientAccessRights"]
      ? item["clientAccessRights"]
      : clientAccessRightArraySerializer(item["clientAccessRights"]),
    refreshDetails: !item["refreshDetails"]
      ? item["refreshDetails"]
      : refreshDetailsSerializer(item["refreshDetails"]),
    dataPolicy: item["dataPolicy"],
  };
}

export function _sharePropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    shareStatus: item["shareStatus"],
    monitoringStatus: item["monitoringStatus"],
    azureContainerInfo: !item["azureContainerInfo"]
      ? item["azureContainerInfo"]
      : azureContainerInfoDeserializer(item["azureContainerInfo"]),
    accessProtocol: item["accessProtocol"],
    userAccessRights: !item["userAccessRights"]
      ? item["userAccessRights"]
      : userAccessRightArrayDeserializer(item["userAccessRights"]),
    clientAccessRights: !item["clientAccessRights"]
      ? item["clientAccessRights"]
      : clientAccessRightArrayDeserializer(item["clientAccessRights"]),
    refreshDetails: !item["refreshDetails"]
      ? item["refreshDetails"]
      : refreshDetailsDeserializer(item["refreshDetails"]),
    shareMappings: !item["shareMappings"]
      ? item["shareMappings"]
      : mountPointMapArrayDeserializer(item["shareMappings"]),
    dataPolicy: item["dataPolicy"],
  };
}

export function _storageAccountCredentialPropertiesSerializer(item: StorageAccountCredential): any {
  return {
    alias: item["alias"],
    userName: item["userName"],
    accountKey: !item["accountKey"]
      ? item["accountKey"]
      : asymmetricEncryptedSecretSerializer(item["accountKey"]),
    connectionString: item["connectionString"],
    sslStatus: item["sslStatus"],
    blobDomainName: item["blobDomainName"],
    accountType: item["accountType"],
    storageAccountId: item["storageAccountId"],
  };
}

export function _storageAccountCredentialPropertiesDeserializer(item: any) {
  return {
    alias: item["alias"],
    userName: item["userName"],
    accountKey: !item["accountKey"]
      ? item["accountKey"]
      : asymmetricEncryptedSecretDeserializer(item["accountKey"]),
    connectionString: item["connectionString"],
    sslStatus: item["sslStatus"],
    blobDomainName: item["blobDomainName"],
    accountType: item["accountType"],
    storageAccountId: item["storageAccountId"],
  };
}

export function _storageAccountPropertiesSerializer(item: StorageAccount): any {
  return {
    description: item["description"],
    storageAccountStatus: item["storageAccountStatus"],
    dataPolicy: item["dataPolicy"],
    storageAccountCredentialId: item["storageAccountCredentialId"],
  };
}

export function _storageAccountPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    storageAccountStatus: item["storageAccountStatus"],
    dataPolicy: item["dataPolicy"],
    storageAccountCredentialId: item["storageAccountCredentialId"],
    blobEndpoint: item["blobEndpoint"],
    containerCount: item["containerCount"],
  };
}

export function _containerPropertiesSerializer(item: Container): any {
  return { dataFormat: item["dataFormat"] };
}

export function _containerPropertiesDeserializer(item: any) {
  return {
    containerStatus: item["containerStatus"],
    dataFormat: item["dataFormat"],
    refreshDetails: !item["refreshDetails"]
      ? item["refreshDetails"]
      : refreshDetailsDeserializer(item["refreshDetails"]),
    createdDateTime: !item["createdDateTime"]
      ? item["createdDateTime"]
      : new Date(item["createdDateTime"]),
  };
}

export function _fileEventTriggerPropertiesSerializer(item: FileEventTrigger): any {
  return {
    sourceInfo: fileSourceInfoSerializer(item["sourceInfo"]),
    sinkInfo: roleSinkInfoSerializer(item["sinkInfo"]),
    customContextTag: item["customContextTag"],
  };
}

export function _fileEventTriggerPropertiesDeserializer(item: any) {
  return {
    sourceInfo: fileSourceInfoDeserializer(item["sourceInfo"]),
    sinkInfo: roleSinkInfoDeserializer(item["sinkInfo"]),
    customContextTag: item["customContextTag"],
  };
}

export function _periodicTimerEventTriggerPropertiesSerializer(
  item: PeriodicTimerEventTrigger,
): any {
  return {
    sourceInfo: periodicTimerSourceInfoSerializer(item["sourceInfo"]),
    sinkInfo: roleSinkInfoSerializer(item["sinkInfo"]),
    customContextTag: item["customContextTag"],
  };
}

export function _periodicTimerEventTriggerPropertiesDeserializer(item: any) {
  return {
    sourceInfo: periodicTimerSourceInfoDeserializer(item["sourceInfo"]),
    sinkInfo: roleSinkInfoDeserializer(item["sinkInfo"]),
    customContextTag: item["customContextTag"],
  };
}

export function _userPropertiesSerializer(item: User): any {
  return {
    encryptedPassword: !item["encryptedPassword"]
      ? item["encryptedPassword"]
      : asymmetricEncryptedSecretSerializer(item["encryptedPassword"]),
    userType: item["userType"],
  };
}

export function _userPropertiesDeserializer(item: any) {
  return {
    encryptedPassword: !item["encryptedPassword"]
      ? item["encryptedPassword"]
      : asymmetricEncryptedSecretDeserializer(item["encryptedPassword"]),
    shareAccessRights: !item["shareAccessRights"]
      ? item["shareAccessRights"]
      : shareAccessRightArrayDeserializer(item["shareAccessRights"]),
    userType: item["userType"],
  };
}

export function _deviceCapacityRequestInfoPropertiesSerializer(
  item: DeviceCapacityRequestInfo,
): any {
  return {
    vmPlacementQuery: item["vmPlacementQuery"].map((p: any) => {
      return p.map((p: any) => {
        return p;
      });
    }),
    vmPlacementResults: !item["vmPlacementResults"]
      ? item["vmPlacementResults"]
      : vmPlacementRequestResultArraySerializer(item["vmPlacementResults"]),
  };
}

export function _nodePropertiesDeserializer(item: any) {
  return {
    nodeStatus: item["nodeStatus"],
    nodeChassisSerialNumber: item["nodeChassisSerialNumber"],
    nodeSerialNumber: item["nodeSerialNumber"],
    nodeDisplayName: item["nodeDisplayName"],
    nodeFriendlySoftwareVersion: item["nodeFriendlySoftwareVersion"],
    nodeHcsVersion: item["nodeHcsVersion"],
    nodeInstanceId: item["nodeInstanceId"],
  };
}

export function _triggerSupportPackageRequestPropertiesSerializer(
  item: TriggerSupportPackageRequest,
): any {
  return {
    minimumTimeStamp: !item["minimumTimeStamp"]
      ? item["minimumTimeStamp"]
      : item["minimumTimeStamp"].toISOString(),
    maximumTimeStamp: !item["maximumTimeStamp"]
      ? item["maximumTimeStamp"]
      : item["maximumTimeStamp"].toISOString(),
    include: item["include"],
  };
}

export function _deviceCapacityInfoPropertiesDeserializer(item: any) {
  return {
    timeStamp: !item["timeStamp"] ? item["timeStamp"] : new Date(item["timeStamp"]),
    clusterStorageCapacityInfo: !item["clusterStorageCapacityInfo"]
      ? item["clusterStorageCapacityInfo"]
      : clusterStorageViewDataDeserializer(item["clusterStorageCapacityInfo"]),
    clusterComputeCapacityInfo: !item["clusterComputeCapacityInfo"]
      ? item["clusterComputeCapacityInfo"]
      : clusterCapacityViewDataDeserializer(item["clusterComputeCapacityInfo"]),
    nodeCapacityInfos: !item["nodeCapacityInfos"]
      ? item["nodeCapacityInfos"]
      : hostCapacityRecordDeserializer(item["nodeCapacityInfos"]),
  };
}

export function _monitoringMetricConfigurationPropertiesSerializer(
  item: MonitoringMetricConfiguration,
): any {
  return { metricConfigurations: metricConfigurationArraySerializer(item["metricConfigurations"]) };
}

export function _monitoringMetricConfigurationPropertiesDeserializer(item: any) {
  return {
    metricConfigurations: metricConfigurationArrayDeserializer(item["metricConfigurations"]),
  };
}
