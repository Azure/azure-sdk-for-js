// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Information required to validate the subnet that will be used in AML file system create */
export interface AmlFilesystemSubnetInfo {
  /** Subnet used for managing the AML file system and for client-facing operations. This subnet should have at least a /24 subnet mask within the VNET's address space. */
  filesystemSubnet?: string;
  /** The size of the AML file system, in TiB. */
  storageCapacityTiB?: number;
  /** SKU for the resource. */
  sku?: SkuName;
  /** Region that the AML file system will be created in. */
  location?: string;
}

export function amlFilesystemSubnetInfoSerializer(item: AmlFilesystemSubnetInfo): any {
  return {
    filesystemSubnet: item["filesystemSubnet"],
    storageCapacityTiB: item["storageCapacityTiB"],
    sku: !item["sku"] ? item["sku"] : skuNameSerializer(item["sku"]),
    location: item["location"],
  };
}

/** SKU for the resource. */
export interface SkuName {
  /** SKU name for this resource. */
  name?: string;
}

export function skuNameSerializer(item: SkuName): any {
  return { name: item["name"] };
}

export function skuNameDeserializer(item: any): SkuName {
  return {
    name: item["name"],
  };
}

/** An error response. */
export interface CloudError {
  /** The body of the error. */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** An error response. */
export interface CloudErrorBody {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A list of additional details about the error. */
  details?: CloudErrorBody[];
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
  /** The target of the particular error. For example, the name of the property in error. */
  target?: string;
}

export function cloudErrorBodyDeserializer(item: any): CloudErrorBody {
  return {
    code: item["code"],
    details: !item["details"] ? item["details"] : cloudErrorBodyArrayDeserializer(item["details"]),
    message: item["message"],
    target: item["target"],
  };
}

export function cloudErrorBodyArrayDeserializer(result: Array<CloudErrorBody>): any[] {
  return result.map((item) => {
    return cloudErrorBodyDeserializer(item);
  });
}

/** The error details provided when the checkAmlFSSubnets call fails. */
export interface AmlFilesystemCheckSubnetError {
  /** The error details for the AML file system's subnet. */
  filesystemSubnet?: AmlFilesystemCheckSubnetErrorFilesystemSubnet;
}

export function amlFilesystemCheckSubnetErrorDeserializer(
  item: any,
): AmlFilesystemCheckSubnetError {
  return {
    filesystemSubnet: !item["filesystemSubnet"]
      ? item["filesystemSubnet"]
      : amlFilesystemCheckSubnetErrorFilesystemSubnetDeserializer(item["filesystemSubnet"]),
  };
}

/** The error details for the AML file system's subnet. */
export interface AmlFilesystemCheckSubnetErrorFilesystemSubnet {
  /** The status of the AML file system subnet check. */
  status?: FilesystemSubnetStatusType;
  /** The details of the AML file system subnet check. */
  message?: string;
}

export function amlFilesystemCheckSubnetErrorFilesystemSubnetDeserializer(
  item: any,
): AmlFilesystemCheckSubnetErrorFilesystemSubnet {
  return {
    status: item["status"],
    message: item["message"],
  };
}

/** The status of the AML file system subnet check. */
export enum KnownFilesystemSubnetStatusType {
  /** Ok */
  Ok = "Ok",
  /** Invalid */
  Invalid = "Invalid",
}

/**
 * The status of the AML file system subnet check. \
 * {@link KnownFilesystemSubnetStatusType} can be used interchangeably with FilesystemSubnetStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ok**: Ok \
 * **Invalid**: Invalid
 */
export type FilesystemSubnetStatusType = string;

/** Information required to get the number of available IP addresses a subnet should have that will be used in AML file system create */
export interface RequiredAmlFilesystemSubnetsSizeInfo {
  /** The size of the AML file system, in TiB. */
  storageCapacityTiB?: number;
  /** SKU for the resource. */
  sku?: SkuName;
}

export function requiredAmlFilesystemSubnetsSizeInfoSerializer(
  item: RequiredAmlFilesystemSubnetsSizeInfo,
): any {
  return {
    storageCapacityTiB: item["storageCapacityTiB"],
    sku: !item["sku"] ? item["sku"] : skuNameSerializer(item["sku"]),
  };
}

/** Information about the number of available IP addresses that are required for the AML file system. */
export interface RequiredAmlFilesystemSubnetsSize {
  /** The number of available IP addresses that are required for the AML file system. */
  filesystemSubnetSize?: number;
}

export function requiredAmlFilesystemSubnetsSizeDeserializer(
  item: any,
): RequiredAmlFilesystemSubnetsSize {
  return {
    filesystemSubnetSize: item["filesystemSubnetSize"],
  };
}

/** Result of the request to list Resource Provider operations. It contains a list of operations and a URL link to get the next set of results. */
export interface _ApiOperationListResult {
  /** List of Resource Provider operations supported by the Microsoft.StorageCache resource provider. */
  value?: ApiOperation[];
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

export function _apiOperationListResultDeserializer(item: any): _ApiOperationListResult {
  return {
    value: !item["value"] ? item["value"] : apiOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function apiOperationArrayDeserializer(result: Array<ApiOperation>): any[] {
  return result.map((item) => {
    return apiOperationDeserializer(item);
  });
}

/** REST API operation description: see https://github.com/Azure/azure-rest-api-specs/blob/master/documentation/openapi-authoring-automated-guidelines.md#r3023-operationsapiimplementation */
export interface ApiOperation {
  /** The object that represents the operation. */
  display?: ApiOperationDisplay;
  /** Origin of the operation. */
  origin?: string;
  /** The flag that indicates whether the operation applies to data plane. */
  isDataAction?: boolean;
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** Specification of the all the metrics provided for a resource type. */
  serviceSpecification?: ApiOperationPropertiesServiceSpecification;
}

export function apiOperationDeserializer(item: any): ApiOperation {
  return {
    display: !item["display"] ? item["display"] : apiOperationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    isDataAction: item["isDataAction"],
    name: item["name"],
    ...(!item["properties"]
      ? item["properties"]
      : _apiOperationPropertiesDeserializer(item["properties"])),
  };
}

/** The object that represents the operation. */
export interface ApiOperationDisplay {
  /** Operation type: Read, write, delete, etc. */
  operation?: string;
  /** Service provider: Microsoft.StorageCache */
  provider?: string;
  /** Resource on which the operation is performed: Cache, etc. */
  resource?: string;
  /** The description of the operation */
  description?: string;
}

export function apiOperationDisplayDeserializer(item: any): ApiOperationDisplay {
  return {
    operation: item["operation"],
    provider: item["provider"],
    resource: item["resource"],
    description: item["description"],
  };
}

/** Additional details about an operation. */
export interface ApiOperationProperties {
  /** Specification of the all the metrics provided for a resource type. */
  serviceSpecification?: ApiOperationPropertiesServiceSpecification;
}

export function apiOperationPropertiesDeserializer(item: any): ApiOperationProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : apiOperationPropertiesServiceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** Specification of the all the metrics provided for a resource type. */
export interface ApiOperationPropertiesServiceSpecification {
  /** Details about operations related to metrics. */
  metricSpecifications?: MetricSpecification[];
  /** Details about operations related to logs. */
  logSpecifications?: LogSpecification[];
}

export function apiOperationPropertiesServiceSpecificationDeserializer(
  item: any,
): ApiOperationPropertiesServiceSpecification {
  return {
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : metricSpecificationArrayDeserializer(item["metricSpecifications"]),
    logSpecifications: !item["logSpecifications"]
      ? item["logSpecifications"]
      : logSpecificationArrayDeserializer(item["logSpecifications"]),
  };
}

export function metricSpecificationArrayDeserializer(result: Array<MetricSpecification>): any[] {
  return result.map((item) => {
    return metricSpecificationDeserializer(item);
  });
}

/** Details about operation related to metrics. */
export interface MetricSpecification {
  /** The name of the metric. */
  name?: string;
  /** Localized display name of the metric. */
  displayName?: string;
  /** The description of the metric. */
  displayDescription?: string;
  /** The unit that the metric is measured in. */
  unit?: string;
  /** The type of metric aggregation. */
  aggregationType?: string;
  /** Support metric aggregation type. */
  supportedAggregationTypes?: MetricAggregationType[];
  /** Type of metrics. */
  metricClass?: string;
  /** Dimensions of the metric */
  dimensions?: MetricDimension[];
}

export function metricSpecificationDeserializer(item: any): MetricSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    aggregationType: item["aggregationType"],
    supportedAggregationTypes: !item["supportedAggregationTypes"]
      ? item["supportedAggregationTypes"]
      : item["supportedAggregationTypes"].map((p: any) => {
          return p;
        }),
    metricClass: item["metricClass"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricDimensionArrayDeserializer(item["dimensions"]),
  };
}

/** Known values of {@link MetricAggregationType} that the service accepts. */
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

/** Type of MetricAggregationType */
export type MetricAggregationType = string;

export function metricDimensionArrayDeserializer(result: Array<MetricDimension>): any[] {
  return result.map((item) => {
    return metricDimensionDeserializer(item);
  });
}

/** Specifications of the Dimension of metrics. */
export interface MetricDimension {
  /** Name of the dimension */
  name?: string;
  /** Localized friendly display name of the dimension */
  displayName?: string;
  /** Internal name of the dimension. */
  internalName?: string;
  /** To be exported to shoe box. */
  toBeExportedForShoebox?: boolean;
}

export function metricDimensionDeserializer(item: any): MetricDimension {
  return {
    name: item["name"],
    displayName: item["displayName"],
    internalName: item["internalName"],
    toBeExportedForShoebox: item["toBeExportedForShoebox"],
  };
}

export function logSpecificationArrayDeserializer(result: Array<LogSpecification>): any[] {
  return result.map((item) => {
    return logSpecificationDeserializer(item);
  });
}

/** Details about operation related to logs. */
export interface LogSpecification {
  /** The name of the log. */
  name?: string;
  /** Localized display name of the log. */
  displayName?: string;
}

export function logSpecificationDeserializer(item: any): LogSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
  };
}

/** A cache instance. Follows Azure Resource Manager standards: https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/resource-api-reference.md */
export interface Cache extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Region name string. */
  location?: string;
  /** The identity of the cache, if configured. */
  identity?: CacheIdentity;
  /** SKU for the cache. */
  sku?: CacheSku;
  /** The size of this Cache, in GB. */
  cacheSizeGB?: number;
  /** Health of the cache. */
  readonly health?: CacheHealth;
  /** Array of IPv4 addresses that can be used by clients mounting this cache. */
  readonly mountAddresses?: string[];
  /** ARM provisioning state, see https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/Addendum.md#provisioningstate-property */
  readonly provisioningState?: ProvisioningStateType;
  /** Subnet used for the cache. */
  subnet?: string;
  /** Upgrade status of the cache. */
  readonly upgradeStatus?: CacheUpgradeStatus;
  /** Upgrade settings of the cache. */
  upgradeSettings?: CacheUpgradeSettings;
  /** Specifies network settings of the cache. */
  networkSettings?: CacheNetworkSettings;
  /** Specifies encryption settings of the cache. */
  encryptionSettings?: CacheEncryptionSettings;
  /** Specifies security settings of the cache. */
  securitySettings?: CacheSecuritySettings;
  /** Specifies Directory Services settings of the cache. */
  directoryServicesSettings?: CacheDirectorySettings;
  /** Availability zones for resources. This field should only contain a single element in the array. */
  zones?: string[];
  /** Specifies the priming jobs defined in the cache. */
  primingJobs?: PrimingJob[];
  /** Specifies the space allocation percentage for each storage target in the cache. */
  readonly spaceAllocation?: StorageTargetSpaceAllocation[];
}

export function cacheSerializer(item: Cache): any {
  return {
    properties: areAllPropsUndefined(item, [
      "cacheSizeGB",
      "subnet",
      "upgradeSettings",
      "networkSettings",
      "encryptionSettings",
      "securitySettings",
      "directoryServicesSettings",
      "zones",
      "primingJobs",
    ])
      ? undefined
      : _cachePropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
    identity: !item["identity"] ? item["identity"] : cacheIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : cacheSkuSerializer(item["sku"]),
  };
}

export function cacheDeserializer(item: any): Cache {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _cachePropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    identity: !item["identity"] ? item["identity"] : cacheIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : cacheSkuDeserializer(item["sku"]),
  };
}

/** Properties of the cache. */
export interface CacheProperties {
  /** The size of this Cache, in GB. */
  cacheSizeGB?: number;
  /** Health of the cache. */
  readonly health?: CacheHealth;
  /** Array of IPv4 addresses that can be used by clients mounting this cache. */
  readonly mountAddresses?: string[];
  /** ARM provisioning state, see https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/Addendum.md#provisioningstate-property */
  readonly provisioningState?: ProvisioningStateType;
  /** Subnet used for the cache. */
  subnet?: string;
  /** Upgrade status of the cache. */
  readonly upgradeStatus?: CacheUpgradeStatus;
  /** Upgrade settings of the cache. */
  upgradeSettings?: CacheUpgradeSettings;
  /** Specifies network settings of the cache. */
  networkSettings?: CacheNetworkSettings;
  /** Specifies encryption settings of the cache. */
  encryptionSettings?: CacheEncryptionSettings;
  /** Specifies security settings of the cache. */
  securitySettings?: CacheSecuritySettings;
  /** Specifies Directory Services settings of the cache. */
  directoryServicesSettings?: CacheDirectorySettings;
  /** Availability zones for resources. This field should only contain a single element in the array. */
  zones?: string[];
  /** Specifies the priming jobs defined in the cache. */
  primingJobs?: PrimingJob[];
  /** Specifies the space allocation percentage for each storage target in the cache. */
  readonly spaceAllocation?: StorageTargetSpaceAllocation[];
}

export function cachePropertiesSerializer(item: CacheProperties): any {
  return {
    cacheSizeGB: item["cacheSizeGB"],
    subnet: item["subnet"],
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : cacheUpgradeSettingsSerializer(item["upgradeSettings"]),
    networkSettings: !item["networkSettings"]
      ? item["networkSettings"]
      : cacheNetworkSettingsSerializer(item["networkSettings"]),
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : cacheEncryptionSettingsSerializer(item["encryptionSettings"]),
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : cacheSecuritySettingsSerializer(item["securitySettings"]),
    directoryServicesSettings: !item["directoryServicesSettings"]
      ? item["directoryServicesSettings"]
      : cacheDirectorySettingsSerializer(item["directoryServicesSettings"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    primingJobs: !item["primingJobs"]
      ? item["primingJobs"]
      : primingJobArraySerializer(item["primingJobs"]),
  };
}

export function cachePropertiesDeserializer(item: any): CacheProperties {
  return {
    cacheSizeGB: item["cacheSizeGB"],
    health: !item["health"] ? item["health"] : cacheHealthDeserializer(item["health"]),
    mountAddresses: !item["mountAddresses"]
      ? item["mountAddresses"]
      : item["mountAddresses"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    subnet: item["subnet"],
    upgradeStatus: !item["upgradeStatus"]
      ? item["upgradeStatus"]
      : cacheUpgradeStatusDeserializer(item["upgradeStatus"]),
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : cacheUpgradeSettingsDeserializer(item["upgradeSettings"]),
    networkSettings: !item["networkSettings"]
      ? item["networkSettings"]
      : cacheNetworkSettingsDeserializer(item["networkSettings"]),
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : cacheEncryptionSettingsDeserializer(item["encryptionSettings"]),
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : cacheSecuritySettingsDeserializer(item["securitySettings"]),
    directoryServicesSettings: !item["directoryServicesSettings"]
      ? item["directoryServicesSettings"]
      : cacheDirectorySettingsDeserializer(item["directoryServicesSettings"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    primingJobs: !item["primingJobs"]
      ? item["primingJobs"]
      : primingJobArrayDeserializer(item["primingJobs"]),
    spaceAllocation: !item["spaceAllocation"]
      ? item["spaceAllocation"]
      : storageTargetSpaceAllocationArrayDeserializer(item["spaceAllocation"]),
  };
}

/** An indication of cache health. Gives more information about health than just that related to provisioning. */
export interface CacheHealth {
  /** List of cache health states. Down is when the cluster is not responding.  Degraded is when its functioning but has some alerts. Transitioning when it is creating or deleting. Unknown will be returned in old api versions when a new value is added in future versions. WaitingForKey is when the create is waiting for the system assigned identity to be given access to the encryption key in the encryption settings. */
  state?: HealthStateType;
  /** Describes explanation of state. */
  statusDescription?: string;
  /** Outstanding conditions that need to be investigated and resolved. */
  readonly conditions?: Condition[];
}

export function cacheHealthDeserializer(item: any): CacheHealth {
  return {
    state: item["state"],
    statusDescription: item["statusDescription"],
    conditions: !item["conditions"]
      ? item["conditions"]
      : conditionArrayDeserializer(item["conditions"]),
  };
}

/** List of cache health states. Down is when the cluster is not responding.  Degraded is when its functioning but has some alerts. Transitioning when it is creating or deleting. Unknown will be returned in old api versions when a new value is added in future versions. WaitingForKey is when the create is waiting for the system assigned identity to be given access to the encryption key in the encryption settings. */
export enum KnownHealthStateType {
  /** Unknown */
  Unknown = "Unknown",
  /** Healthy */
  Healthy = "Healthy",
  /** Degraded */
  Degraded = "Degraded",
  /** Down */
  Down = "Down",
  /** Transitioning */
  Transitioning = "Transitioning",
  /** Stopping */
  Stopping = "Stopping",
  /** Stopped */
  Stopped = "Stopped",
  /** Upgrading */
  Upgrading = "Upgrading",
  /** Flushing */
  Flushing = "Flushing",
  /** WaitingForKey */
  WaitingForKey = "WaitingForKey",
  /** StartFailed */
  StartFailed = "StartFailed",
  /** UpgradeFailed */
  UpgradeFailed = "UpgradeFailed",
}

/**
 * List of cache health states. Down is when the cluster is not responding.  Degraded is when its functioning but has some alerts. Transitioning when it is creating or deleting. Unknown will be returned in old api versions when a new value is added in future versions. WaitingForKey is when the create is waiting for the system assigned identity to be given access to the encryption key in the encryption settings. \
 * {@link KnownHealthStateType} can be used interchangeably with HealthStateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown \
 * **Healthy**: Healthy \
 * **Degraded**: Degraded \
 * **Down**: Down \
 * **Transitioning**: Transitioning \
 * **Stopping**: Stopping \
 * **Stopped**: Stopped \
 * **Upgrading**: Upgrading \
 * **Flushing**: Flushing \
 * **WaitingForKey**: WaitingForKey \
 * **StartFailed**: StartFailed \
 * **UpgradeFailed**: UpgradeFailed
 */
export type HealthStateType = string;

export function conditionArrayDeserializer(result: Array<Condition>): any[] {
  return result.map((item) => {
    return conditionDeserializer(item);
  });
}

/** Outstanding conditions that will need to be resolved. */
export interface Condition {
  /** The time when the condition was raised. */
  readonly timestamp?: Date;
  /** The issue requiring attention. */
  readonly message?: string;
}

export function conditionDeserializer(item: any): Condition {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    message: item["message"],
  };
}

/** ARM provisioning state, see https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/Addendum.md#provisioningstate-property */
export enum KnownProvisioningStateType {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Updating */
  Updating = "Updating",
}

/**
 * ARM provisioning state, see https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/Addendum.md#provisioningstate-property \
 * {@link KnownProvisioningStateType} can be used interchangeably with ProvisioningStateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Creating**: Creating \
 * **Deleting**: Deleting \
 * **Updating**: Updating
 */
export type ProvisioningStateType = string;

/** Properties describing the software upgrade state of the cache. */
export interface CacheUpgradeStatus {
  /** Version string of the firmware currently installed on this cache. */
  readonly currentFirmwareVersion?: string;
  /** True if there is a firmware update ready to install on this cache. The firmware will automatically be installed after firmwareUpdateDeadline if not triggered earlier via the upgrade operation. */
  readonly firmwareUpdateStatus?: FirmwareStatusType;
  /** Time at which the pending firmware update will automatically be installed on the cache. */
  readonly firmwareUpdateDeadline?: Date;
  /** Time of the last successful firmware update. */
  readonly lastFirmwareUpdate?: Date;
  /** When firmwareUpdateAvailable is true, this field holds the version string for the update. */
  readonly pendingFirmwareVersion?: string;
}

export function cacheUpgradeStatusDeserializer(item: any): CacheUpgradeStatus {
  return {
    currentFirmwareVersion: item["currentFirmwareVersion"],
    firmwareUpdateStatus: item["firmwareUpdateStatus"],
    firmwareUpdateDeadline: !item["firmwareUpdateDeadline"]
      ? item["firmwareUpdateDeadline"]
      : new Date(item["firmwareUpdateDeadline"]),
    lastFirmwareUpdate: !item["lastFirmwareUpdate"]
      ? item["lastFirmwareUpdate"]
      : new Date(item["lastFirmwareUpdate"]),
    pendingFirmwareVersion: item["pendingFirmwareVersion"],
  };
}

/** True if there is a firmware update ready to install on this cache. The firmware will automatically be installed after firmwareUpdateDeadline if not triggered earlier via the upgrade operation. */
export enum KnownFirmwareStatusType {
  /** available */
  Available = "available",
  /** unavailable */
  Unavailable = "unavailable",
}

/**
 * True if there is a firmware update ready to install on this cache. The firmware will automatically be installed after firmwareUpdateDeadline if not triggered earlier via the upgrade operation. \
 * {@link KnownFirmwareStatusType} can be used interchangeably with FirmwareStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **available**: available \
 * **unavailable**: unavailable
 */
export type FirmwareStatusType = string;

/** Cache Upgrade Settings. */
export interface CacheUpgradeSettings {
  /** True if the user chooses to select an installation time between now and firmwareUpdateDeadline. Else the firmware will automatically be installed after firmwareUpdateDeadline if not triggered earlier via the upgrade operation. */
  upgradeScheduleEnabled?: boolean;
  /** When upgradeScheduleEnabled is true, this field holds the user-chosen upgrade time. At the user-chosen time, the firmware update will automatically be installed on the cache. */
  scheduledTime?: Date;
}

export function cacheUpgradeSettingsSerializer(item: CacheUpgradeSettings): any {
  return {
    upgradeScheduleEnabled: item["upgradeScheduleEnabled"],
    scheduledTime: !item["scheduledTime"]
      ? item["scheduledTime"]
      : item["scheduledTime"].toISOString(),
  };
}

export function cacheUpgradeSettingsDeserializer(item: any): CacheUpgradeSettings {
  return {
    upgradeScheduleEnabled: item["upgradeScheduleEnabled"],
    scheduledTime: !item["scheduledTime"] ? item["scheduledTime"] : new Date(item["scheduledTime"]),
  };
}

/** Cache network settings. */
export interface CacheNetworkSettings {
  /** The IPv4 maximum transmission unit configured for the subnet. */
  mtu?: number;
  /** Array of additional IP addresses used by this cache. */
  readonly utilityAddresses?: string[];
  /** DNS servers for the cache to use.  It will be set from the network configuration if no value is provided. */
  dnsServers?: string[];
  /** DNS search domain */
  dnsSearchDomain?: string;
  /** NTP server IP Address or FQDN for the cache to use. The default is time.windows.com. */
  ntpServer?: string;
}

export function cacheNetworkSettingsSerializer(item: CacheNetworkSettings): any {
  return {
    mtu: item["mtu"],
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    dnsSearchDomain: item["dnsSearchDomain"],
    ntpServer: item["ntpServer"],
  };
}

export function cacheNetworkSettingsDeserializer(item: any): CacheNetworkSettings {
  return {
    mtu: item["mtu"],
    utilityAddresses: !item["utilityAddresses"]
      ? item["utilityAddresses"]
      : item["utilityAddresses"].map((p: any) => {
          return p;
        }),
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    dnsSearchDomain: item["dnsSearchDomain"],
    ntpServer: item["ntpServer"],
  };
}

/** Cache encryption settings. */
export interface CacheEncryptionSettings {
  /** Specifies the location of the key encryption key in key vault. */
  keyEncryptionKey?: KeyVaultKeyReference;
  /** Specifies whether the service will automatically rotate to the newest version of the key in the key vault. */
  rotationToLatestKeyVersionEnabled?: boolean;
}

export function cacheEncryptionSettingsSerializer(item: CacheEncryptionSettings): any {
  return {
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyVaultKeyReferenceSerializer(item["keyEncryptionKey"]),
    rotationToLatestKeyVersionEnabled: item["rotationToLatestKeyVersionEnabled"],
  };
}

export function cacheEncryptionSettingsDeserializer(item: any): CacheEncryptionSettings {
  return {
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyVaultKeyReferenceDeserializer(item["keyEncryptionKey"]),
    rotationToLatestKeyVersionEnabled: item["rotationToLatestKeyVersionEnabled"],
  };
}

/** Describes a reference to key vault key. */
export interface KeyVaultKeyReference {
  /** The URL referencing a key encryption key in key vault. */
  keyUrl: string;
  /** Describes a resource Id to source key vault. */
  sourceVault: KeyVaultKeyReferenceSourceVault;
}

export function keyVaultKeyReferenceSerializer(item: KeyVaultKeyReference): any {
  return {
    keyUrl: item["keyUrl"],
    sourceVault: keyVaultKeyReferenceSourceVaultSerializer(item["sourceVault"]),
  };
}

export function keyVaultKeyReferenceDeserializer(item: any): KeyVaultKeyReference {
  return {
    keyUrl: item["keyUrl"],
    sourceVault: keyVaultKeyReferenceSourceVaultDeserializer(item["sourceVault"]),
  };
}

/** Describes a resource Id to source key vault. */
export interface KeyVaultKeyReferenceSourceVault {
  /** Resource Id. */
  id?: string;
}

export function keyVaultKeyReferenceSourceVaultSerializer(
  item: KeyVaultKeyReferenceSourceVault,
): any {
  return { id: item["id"] };
}

export function keyVaultKeyReferenceSourceVaultDeserializer(
  item: any,
): KeyVaultKeyReferenceSourceVault {
  return {
    id: item["id"],
  };
}

/** Cache security settings. */
export interface CacheSecuritySettings {
  /** NFS access policies defined for this cache. */
  accessPolicies?: NfsAccessPolicy[];
}

export function cacheSecuritySettingsSerializer(item: CacheSecuritySettings): any {
  return {
    accessPolicies: !item["accessPolicies"]
      ? item["accessPolicies"]
      : nfsAccessPolicyArraySerializer(item["accessPolicies"]),
  };
}

export function cacheSecuritySettingsDeserializer(item: any): CacheSecuritySettings {
  return {
    accessPolicies: !item["accessPolicies"]
      ? item["accessPolicies"]
      : nfsAccessPolicyArrayDeserializer(item["accessPolicies"]),
  };
}

export function nfsAccessPolicyArraySerializer(result: Array<NfsAccessPolicy>): any[] {
  return result.map((item) => {
    return nfsAccessPolicySerializer(item);
  });
}

export function nfsAccessPolicyArrayDeserializer(result: Array<NfsAccessPolicy>): any[] {
  return result.map((item) => {
    return nfsAccessPolicyDeserializer(item);
  });
}

/** A set of rules describing access policies applied to NFSv3 clients of the cache. */
export interface NfsAccessPolicy {
  /** Name identifying this policy. Access Policy names are not case sensitive. */
  name: string;
  /** The set of rules describing client accesses allowed under this policy. */
  accessRules: NfsAccessRule[];
}

export function nfsAccessPolicySerializer(item: NfsAccessPolicy): any {
  return { name: item["name"], accessRules: nfsAccessRuleArraySerializer(item["accessRules"]) };
}

export function nfsAccessPolicyDeserializer(item: any): NfsAccessPolicy {
  return {
    name: item["name"],
    accessRules: nfsAccessRuleArrayDeserializer(item["accessRules"]),
  };
}

export function nfsAccessRuleArraySerializer(result: Array<NfsAccessRule>): any[] {
  return result.map((item) => {
    return nfsAccessRuleSerializer(item);
  });
}

export function nfsAccessRuleArrayDeserializer(result: Array<NfsAccessRule>): any[] {
  return result.map((item) => {
    return nfsAccessRuleDeserializer(item);
  });
}

/** Rule to place restrictions on portions of the cache namespace being presented to clients. */
export interface NfsAccessRule {
  /** Scope for this rule. The scope and filter determine which clients match the rule. */
  scope: NfsAccessRuleScope;
  /** Filter applied to the scope for this rule. The filter's format depends on its scope. 'default' scope matches all clients and has no filter value. 'network' scope takes a filter in CIDR format (for example, 10.99.1.0/24). 'host' takes an IP address or fully qualified domain name as filter. If a client does not match any filter rule and there is no default rule, access is denied. */
  filter?: string;
  /** Access allowed by this rule. */
  access: NfsAccessRuleAccess;
  /** Allow SUID semantics. */
  suid?: boolean;
  /** For the default policy, allow access to subdirectories under the root export. If this is set to no, clients can only mount the path '/'. If set to yes, clients can mount a deeper path, like '/a/b'. */
  submountAccess?: boolean;
  /** Map root accesses to anonymousUID and anonymousGID. */
  rootSquash?: boolean;
  /** UID value that replaces 0 when rootSquash is true. 65534 will be used if not provided. */
  anonymousUID?: string;
  /** GID value that replaces 0 when rootSquash is true. This will use the value of anonymousUID if not provided. */
  anonymousGID?: string;
}

export function nfsAccessRuleSerializer(item: NfsAccessRule): any {
  return {
    scope: item["scope"],
    filter: item["filter"],
    access: item["access"],
    suid: item["suid"],
    submountAccess: item["submountAccess"],
    rootSquash: item["rootSquash"],
    anonymousUID: item["anonymousUID"],
    anonymousGID: item["anonymousGID"],
  };
}

export function nfsAccessRuleDeserializer(item: any): NfsAccessRule {
  return {
    scope: item["scope"],
    filter: item["filter"],
    access: item["access"],
    suid: item["suid"],
    submountAccess: item["submountAccess"],
    rootSquash: item["rootSquash"],
    anonymousUID: item["anonymousUID"],
    anonymousGID: item["anonymousGID"],
  };
}

/** Scope for this rule. The scope and filter determine which clients match the rule. */
export enum KnownNfsAccessRuleScope {
  /** default */
  Default = "default",
  /** network */
  Network = "network",
  /** host */
  Host = "host",
}

/**
 * Scope for this rule. The scope and filter determine which clients match the rule. \
 * {@link KnownNfsAccessRuleScope} can be used interchangeably with NfsAccessRuleScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **default**: default \
 * **network**: network \
 * **host**: host
 */
export type NfsAccessRuleScope = string;

/** Access allowed by this rule. */
export enum KnownNfsAccessRuleAccess {
  /** no */
  No = "no",
  /** ro */
  Ro = "ro",
  /** rw */
  Rw = "rw",
}

/**
 * Access allowed by this rule. \
 * {@link KnownNfsAccessRuleAccess} can be used interchangeably with NfsAccessRuleAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **no**: no \
 * **ro**: ro \
 * **rw**: rw
 */
export type NfsAccessRuleAccess = string;

/** Cache Directory Services settings. */
export interface CacheDirectorySettings {
  /** Specifies settings for joining the HPC Cache to an Active Directory domain. */
  activeDirectory?: CacheActiveDirectorySettings;
  /** Specifies settings for Extended Groups. Extended Groups allows users to be members of more than 16 groups. */
  usernameDownload?: CacheUsernameDownloadSettings;
}

export function cacheDirectorySettingsSerializer(item: CacheDirectorySettings): any {
  return {
    activeDirectory: !item["activeDirectory"]
      ? item["activeDirectory"]
      : cacheActiveDirectorySettingsSerializer(item["activeDirectory"]),
    usernameDownload: !item["usernameDownload"]
      ? item["usernameDownload"]
      : cacheUsernameDownloadSettingsSerializer(item["usernameDownload"]),
  };
}

export function cacheDirectorySettingsDeserializer(item: any): CacheDirectorySettings {
  return {
    activeDirectory: !item["activeDirectory"]
      ? item["activeDirectory"]
      : cacheActiveDirectorySettingsDeserializer(item["activeDirectory"]),
    usernameDownload: !item["usernameDownload"]
      ? item["usernameDownload"]
      : cacheUsernameDownloadSettingsDeserializer(item["usernameDownload"]),
  };
}

/** Active Directory settings used to join a cache to a domain. */
export interface CacheActiveDirectorySettings {
  /** Primary DNS IP address used to resolve the Active Directory domain controller's fully qualified domain name. */
  primaryDnsIpAddress: string;
  /** Secondary DNS IP address used to resolve the Active Directory domain controller's fully qualified domain name. */
  secondaryDnsIpAddress?: string;
  /** The fully qualified domain name of the Active Directory domain controller. */
  domainName: string;
  /** The Active Directory domain's NetBIOS name. */
  domainNetBiosName: string;
  /** The NetBIOS name to assign to the HPC Cache when it joins the Active Directory domain as a server. Length must 1-15 characters from the class [-0-9a-zA-Z]. */
  cacheNetBiosName: string;
  /** True if the HPC Cache is joined to the Active Directory domain. */
  readonly domainJoined?: DomainJoinedType;
  /** Active Directory admin credentials used to join the HPC Cache to a domain. */
  credentials?: CacheActiveDirectorySettingsCredentials;
}

export function cacheActiveDirectorySettingsSerializer(item: CacheActiveDirectorySettings): any {
  return {
    primaryDnsIpAddress: item["primaryDnsIpAddress"],
    secondaryDnsIpAddress: item["secondaryDnsIpAddress"],
    domainName: item["domainName"],
    domainNetBiosName: item["domainNetBiosName"],
    cacheNetBiosName: item["cacheNetBiosName"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : cacheActiveDirectorySettingsCredentialsSerializer(item["credentials"]),
  };
}

export function cacheActiveDirectorySettingsDeserializer(item: any): CacheActiveDirectorySettings {
  return {
    primaryDnsIpAddress: item["primaryDnsIpAddress"],
    secondaryDnsIpAddress: item["secondaryDnsIpAddress"],
    domainName: item["domainName"],
    domainNetBiosName: item["domainNetBiosName"],
    cacheNetBiosName: item["cacheNetBiosName"],
    domainJoined: item["domainJoined"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : cacheActiveDirectorySettingsCredentialsDeserializer(item["credentials"]),
  };
}

/** True if the HPC Cache is joined to the Active Directory domain. */
export enum KnownDomainJoinedType {
  /** Yes */
  Yes = "Yes",
  /** No */
  No = "No",
  /** Error */
  Error = "Error",
}

/**
 * True if the HPC Cache is joined to the Active Directory domain. \
 * {@link KnownDomainJoinedType} can be used interchangeably with DomainJoinedType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Yes**: Yes \
 * **No**: No \
 * **Error**: Error
 */
export type DomainJoinedType = string;

/** Active Directory admin credentials used to join the HPC Cache to a domain. */
export interface CacheActiveDirectorySettingsCredentials {
  /** Username of the Active Directory domain administrator. This value is stored encrypted and not returned on response. */
  username: string;
  /** Plain text password of the Active Directory domain administrator. This value is stored encrypted and not returned on response. */
  password?: string;
}

export function cacheActiveDirectorySettingsCredentialsSerializer(
  item: CacheActiveDirectorySettingsCredentials,
): any {
  return { username: item["username"], password: item["password"] };
}

export function cacheActiveDirectorySettingsCredentialsDeserializer(
  item: any,
): CacheActiveDirectorySettingsCredentials {
  return {
    username: item["username"],
    password: item["password"],
  };
}

/** Settings for Extended Groups username and group download. */
export interface CacheUsernameDownloadSettings {
  /** Whether or not Extended Groups is enabled. */
  extendedGroups?: boolean;
  /** This setting determines how the cache gets username and group names for clients. */
  usernameSource?: UsernameSource;
  /** The URI of the file containing group information (in /etc/group file format). This field must be populated when 'usernameSource' is set to 'File'. */
  groupFileURI?: string;
  /** The URI of the file containing user information (in /etc/passwd file format). This field must be populated when 'usernameSource' is set to 'File'. */
  userFileURI?: string;
  /** The fully qualified domain name or IP address of the LDAP server to use. */
  ldapServer?: string;
  /** The base distinguished name for the LDAP domain. */
  ldapBaseDN?: string;
  /** Whether or not the LDAP connection should be encrypted. */
  encryptLdapConnection?: boolean;
  /** Determines if the certificates must be validated by a certificate authority. When true, caCertificateURI must be provided. */
  requireValidCertificate?: boolean;
  /** Determines if the certificate should be automatically downloaded. This applies to 'caCertificateURI' only if 'requireValidCertificate' is true. */
  autoDownloadCertificate?: boolean;
  /** The URI of the CA certificate to validate the LDAP secure connection. This field must be populated when 'requireValidCertificate' is set to true. */
  caCertificateURI?: string;
  /** Indicates whether or not the HPC Cache has performed the username download successfully. */
  readonly usernameDownloaded?: UsernameDownloadedType;
  /** When present, these are the credentials for the secure LDAP connection. */
  credentials?: CacheUsernameDownloadSettingsCredentials;
}

export function cacheUsernameDownloadSettingsSerializer(item: CacheUsernameDownloadSettings): any {
  return {
    extendedGroups: item["extendedGroups"],
    usernameSource: item["usernameSource"],
    groupFileURI: item["groupFileURI"],
    userFileURI: item["userFileURI"],
    ldapServer: item["ldapServer"],
    ldapBaseDN: item["ldapBaseDN"],
    encryptLdapConnection: item["encryptLdapConnection"],
    requireValidCertificate: item["requireValidCertificate"],
    autoDownloadCertificate: item["autoDownloadCertificate"],
    caCertificateURI: item["caCertificateURI"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : cacheUsernameDownloadSettingsCredentialsSerializer(item["credentials"]),
  };
}

export function cacheUsernameDownloadSettingsDeserializer(
  item: any,
): CacheUsernameDownloadSettings {
  return {
    extendedGroups: item["extendedGroups"],
    usernameSource: item["usernameSource"],
    groupFileURI: item["groupFileURI"],
    userFileURI: item["userFileURI"],
    ldapServer: item["ldapServer"],
    ldapBaseDN: item["ldapBaseDN"],
    encryptLdapConnection: item["encryptLdapConnection"],
    requireValidCertificate: item["requireValidCertificate"],
    autoDownloadCertificate: item["autoDownloadCertificate"],
    caCertificateURI: item["caCertificateURI"],
    usernameDownloaded: item["usernameDownloaded"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : cacheUsernameDownloadSettingsCredentialsDeserializer(item["credentials"]),
  };
}

/** This setting determines how the cache gets username and group names for clients. */
export enum KnownUsernameSource {
  /** AD */
  AD = "AD",
  /** LDAP */
  Ldap = "LDAP",
  /** File */
  File = "File",
  /** None */
  None = "None",
}

/**
 * This setting determines how the cache gets username and group names for clients. \
 * {@link KnownUsernameSource} can be used interchangeably with UsernameSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AD**: AD \
 * **LDAP**: LDAP \
 * **File**: File \
 * **None**: None
 */
export type UsernameSource = string;

/** Indicates whether or not the HPC Cache has performed the username download successfully. */
export enum KnownUsernameDownloadedType {
  /** Yes */
  Yes = "Yes",
  /** No */
  No = "No",
  /** Error */
  Error = "Error",
}

/**
 * Indicates whether or not the HPC Cache has performed the username download successfully. \
 * {@link KnownUsernameDownloadedType} can be used interchangeably with UsernameDownloadedType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Yes**: Yes \
 * **No**: No \
 * **Error**: Error
 */
export type UsernameDownloadedType = string;

/** When present, these are the credentials for the secure LDAP connection. */
export interface CacheUsernameDownloadSettingsCredentials {
  /** The Bind Distinguished Name identity to be used in the secure LDAP connection. This value is stored encrypted and not returned on response. */
  bindDn?: string;
  /** The Bind password to be used in the secure LDAP connection. This value is stored encrypted and not returned on response. */
  bindPassword?: string;
}

export function cacheUsernameDownloadSettingsCredentialsSerializer(
  item: CacheUsernameDownloadSettingsCredentials,
): any {
  return { bindDn: item["bindDn"], bindPassword: item["bindPassword"] };
}

export function cacheUsernameDownloadSettingsCredentialsDeserializer(
  item: any,
): CacheUsernameDownloadSettingsCredentials {
  return {
    bindDn: item["bindDn"],
    bindPassword: item["bindPassword"],
  };
}

export function primingJobArraySerializer(result: Array<PrimingJob>): any[] {
  return result.map((item) => {
    return primingJobSerializer(item);
  });
}

export function primingJobArrayDeserializer(result: Array<PrimingJob>): any[] {
  return result.map((item) => {
    return primingJobDeserializer(item);
  });
}

/** A priming job instance. */
export interface PrimingJob {
  /** The priming job name. */
  primingJobName: string;
  /** The URL for the priming manifest file to download. This file must be readable from the HPC Cache. When the file is in Azure blob storage the URL should include a Shared Access Signature (SAS) granting read permissions on the blob. */
  primingManifestUrl: string;
  /** The unique identifier of the priming job. */
  readonly primingJobId?: string;
  /** The state of the priming operation. */
  readonly primingJobState?: PrimingJobState;
  /** The status code of the priming job. */
  readonly primingJobStatus?: string;
  /** The job details or error information if any. */
  readonly primingJobDetails?: string;
  /** The current progress of the priming job, as a percentage. */
  readonly primingJobPercentComplete?: number;
}

export function primingJobSerializer(item: PrimingJob): any {
  return { primingJobName: item["primingJobName"], primingManifestUrl: item["primingManifestUrl"] };
}

export function primingJobDeserializer(item: any): PrimingJob {
  return {
    primingJobName: item["primingJobName"],
    primingManifestUrl: item["primingManifestUrl"],
    primingJobId: item["primingJobId"],
    primingJobState: item["primingJobState"],
    primingJobStatus: item["primingJobStatus"],
    primingJobDetails: item["primingJobDetails"],
    primingJobPercentComplete: item["primingJobPercentComplete"],
  };
}

/** The state of the priming operation. */
export enum KnownPrimingJobState {
  /** Queued */
  Queued = "Queued",
  /** Running */
  Running = "Running",
  /** Paused */
  Paused = "Paused",
  /** Complete */
  Complete = "Complete",
}

/**
 * The state of the priming operation. \
 * {@link KnownPrimingJobState} can be used interchangeably with PrimingJobState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Queued**: Queued \
 * **Running**: Running \
 * **Paused**: Paused \
 * **Complete**: Complete
 */
export type PrimingJobState = string;

export function storageTargetSpaceAllocationArraySerializer(
  result: Array<StorageTargetSpaceAllocation>,
): any[] {
  return result.map((item) => {
    return storageTargetSpaceAllocationSerializer(item);
  });
}

export function storageTargetSpaceAllocationArrayDeserializer(
  result: Array<StorageTargetSpaceAllocation>,
): any[] {
  return result.map((item) => {
    return storageTargetSpaceAllocationDeserializer(item);
  });
}

/** Storage Target space allocation properties. */
export interface StorageTargetSpaceAllocation {
  /** Name of the storage target. */
  name?: string;
  /** The percentage of cache space allocated for this storage target */
  allocationPercentage?: number;
}

export function storageTargetSpaceAllocationSerializer(item: StorageTargetSpaceAllocation): any {
  return { name: item["name"], allocationPercentage: item["allocationPercentage"] };
}

export function storageTargetSpaceAllocationDeserializer(item: any): StorageTargetSpaceAllocation {
  return {
    name: item["name"],
    allocationPercentage: item["allocationPercentage"],
  };
}

/** Cache identity properties. */
export interface CacheIdentity {
  /** The principal ID for the system-assigned identity of the cache. */
  readonly principalId?: string;
  /** The tenant ID associated with the cache. */
  readonly tenantId?: string;
  /** The type of identity used for the cache */
  type?: CacheIdentityType;
  /** A dictionary where each key is a user assigned identity resource ID, and each key's value is an empty dictionary. */
  userAssignedIdentities?: Record<string, UserAssignedIdentitiesValue>;
}

export function cacheIdentitySerializer(item: CacheIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function cacheIdentityDeserializer(item: any): CacheIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of identity used for the cache */
export type CacheIdentityType =
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | "None";

export function userAssignedIdentitiesValueRecordSerializer(
  item: Record<string, UserAssignedIdentitiesValue>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitiesValueSerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentitiesValueRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentitiesValue> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitiesValueDeserializer(item[key]);
  });
  return result;
}

/** model interface UserAssignedIdentitiesValue */
export interface UserAssignedIdentitiesValue {
  /** The principal ID of the user-assigned identity. */
  readonly principalId?: string;
  /** The client ID of the user-assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitiesValueSerializer(_item: UserAssignedIdentitiesValue): any {
  return {};
}

export function userAssignedIdentitiesValueDeserializer(item: any): UserAssignedIdentitiesValue {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** SKU for the cache. */
export interface CacheSku {
  /** SKU name for this cache. */
  name?: string;
}

export function cacheSkuSerializer(item: CacheSku): any {
  return { name: item["name"] };
}

export function cacheSkuDeserializer(item: any): CacheSku {
  return {
    name: item["name"],
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

/** Result of the request to list caches. It contains a list of caches and a URL link to get the next set of results. */
export interface _CachesListResult {
  /** List of caches. */
  value?: Cache[];
  /** URL to get the next set of cache list results, if there are any. */
  nextLink?: string;
}

export function _cachesListResultDeserializer(item: any): _CachesListResult {
  return {
    value: !item["value"] ? item["value"] : cacheArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cacheArraySerializer(result: Array<Cache>): any[] {
  return result.map((item) => {
    return cacheSerializer(item);
  });
}

export function cacheArrayDeserializer(result: Array<Cache>): any[] {
  return result.map((item) => {
    return cacheDeserializer(item);
  });
}

/** Object containing the priming job ID. */
export interface PrimingJobIdParameter {
  /** The unique identifier of the priming job. */
  primingJobId: string;
}

export function primingJobIdParameterSerializer(item: PrimingJobIdParameter): any {
  return { primingJobId: item["primingJobId"] };
}

/** Type of the Storage Target. */
export interface StorageTarget extends ProxyResource {
  /** Region name string. */
  readonly location?: string;
  /** List of cache namespace junctions to target for namespace associations. */
  junctions?: NamespaceJunction[];
  /** Type of the Storage Target. */
  targetType?: StorageTargetType;
  /** ARM provisioning state, see https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/Addendum.md#provisioningstate-property */
  readonly provisioningState?: ProvisioningStateType;
  /** Storage target operational state. */
  state?: OperationalStateType;
  /** Properties when targetType is nfs3. */
  nfs3?: Nfs3Target;
  /** Properties when targetType is clfs. */
  clfs?: ClfsTarget;
  /** Properties when targetType is unknown. */
  unknown?: UnknownTarget;
  /** Properties when targetType is blobNfs. */
  blobNfs?: BlobNfsTarget;
  /** The percentage of cache space allocated for this storage target */
  readonly allocationPercentage?: number;
}

export function storageTargetSerializer(item: StorageTarget): any {
  return {
    properties: areAllPropsUndefined(item, [
      "junctions",
      "targetType",
      "state",
      "nfs3",
      "clfs",
      "unknown",
      "blobNfs",
    ])
      ? undefined
      : _storageTargetPropertiesSerializer(item),
  };
}

export function storageTargetDeserializer(item: any): StorageTarget {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _storageTargetPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** Properties of the Storage Target. */
export interface StorageTargetProperties {
  /** List of cache namespace junctions to target for namespace associations. */
  junctions?: NamespaceJunction[];
  /** Type of the Storage Target. */
  targetType: StorageTargetType;
  /** ARM provisioning state, see https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/Addendum.md#provisioningstate-property */
  readonly provisioningState?: ProvisioningStateType;
  /** Storage target operational state. */
  state?: OperationalStateType;
  /** Properties when targetType is nfs3. */
  nfs3?: Nfs3Target;
  /** Properties when targetType is clfs. */
  clfs?: ClfsTarget;
  /** Properties when targetType is unknown. */
  unknown?: UnknownTarget;
  /** Properties when targetType is blobNfs. */
  blobNfs?: BlobNfsTarget;
  /** The percentage of cache space allocated for this storage target */
  readonly allocationPercentage?: number;
}

export function storageTargetPropertiesSerializer(item: StorageTargetProperties): any {
  return {
    junctions: !item["junctions"]
      ? item["junctions"]
      : namespaceJunctionArraySerializer(item["junctions"]),
    targetType: item["targetType"],
    state: item["state"],
    nfs3: !item["nfs3"] ? item["nfs3"] : nfs3TargetSerializer(item["nfs3"]),
    clfs: !item["clfs"] ? item["clfs"] : clfsTargetSerializer(item["clfs"]),
    unknown: !item["unknown"] ? item["unknown"] : unknownTargetSerializer(item["unknown"]),
    blobNfs: !item["blobNfs"] ? item["blobNfs"] : blobNfsTargetSerializer(item["blobNfs"]),
  };
}

export function storageTargetPropertiesDeserializer(item: any): StorageTargetProperties {
  return {
    junctions: !item["junctions"]
      ? item["junctions"]
      : namespaceJunctionArrayDeserializer(item["junctions"]),
    targetType: item["targetType"],
    provisioningState: item["provisioningState"],
    state: item["state"],
    nfs3: !item["nfs3"] ? item["nfs3"] : nfs3TargetDeserializer(item["nfs3"]),
    clfs: !item["clfs"] ? item["clfs"] : clfsTargetDeserializer(item["clfs"]),
    unknown: !item["unknown"] ? item["unknown"] : unknownTargetDeserializer(item["unknown"]),
    blobNfs: !item["blobNfs"] ? item["blobNfs"] : blobNfsTargetDeserializer(item["blobNfs"]),
    allocationPercentage: item["allocationPercentage"],
  };
}

export function namespaceJunctionArraySerializer(result: Array<NamespaceJunction>): any[] {
  return result.map((item) => {
    return namespaceJunctionSerializer(item);
  });
}

export function namespaceJunctionArrayDeserializer(result: Array<NamespaceJunction>): any[] {
  return result.map((item) => {
    return namespaceJunctionDeserializer(item);
  });
}

/** A namespace junction. */
export interface NamespaceJunction {
  /** Namespace path on a cache for a Storage Target. */
  namespacePath?: string;
  /** Path in Storage Target to which namespacePath points. */
  targetPath?: string;
  /** NFS export where targetPath exists. */
  nfsExport?: string;
  /** Name of the access policy applied to this junction. */
  nfsAccessPolicy?: string;
}

export function namespaceJunctionSerializer(item: NamespaceJunction): any {
  return {
    namespacePath: item["namespacePath"],
    targetPath: item["targetPath"],
    nfsExport: item["nfsExport"],
    nfsAccessPolicy: item["nfsAccessPolicy"],
  };
}

export function namespaceJunctionDeserializer(item: any): NamespaceJunction {
  return {
    namespacePath: item["namespacePath"],
    targetPath: item["targetPath"],
    nfsExport: item["nfsExport"],
    nfsAccessPolicy: item["nfsAccessPolicy"],
  };
}

/** Type of the Storage Target. */
export enum KnownStorageTargetType {
  /** nfs3 */
  Nfs3 = "nfs3",
  /** clfs */
  Clfs = "clfs",
  /** unknown */
  Unknown = "unknown",
  /** blobNfs */
  BlobNfs = "blobNfs",
}

/**
 * Type of the Storage Target. \
 * {@link KnownStorageTargetType} can be used interchangeably with StorageTargetType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **nfs3**: nfs3 \
 * **clfs**: clfs \
 * **unknown**: unknown \
 * **blobNfs**: blobNfs
 */
export type StorageTargetType = string;

/** Storage target operational state. */
export enum KnownOperationalStateType {
  /** Ready */
  Ready = "Ready",
  /** Busy */
  Busy = "Busy",
  /** Suspended */
  Suspended = "Suspended",
  /** Flushing */
  Flushing = "Flushing",
}

/**
 * Storage target operational state. \
 * {@link KnownOperationalStateType} can be used interchangeably with OperationalStateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: Ready \
 * **Busy**: Busy \
 * **Suspended**: Suspended \
 * **Flushing**: Flushing
 */
export type OperationalStateType = string;

/** Properties pertaining to the Nfs3Target */
export interface Nfs3Target {
  /** IP address or host name of an NFSv3 host (e.g., 10.0.44.44). */
  target?: string;
  /** Identifies the StorageCache usage model to be used for this storage target. */
  usageModel?: string;
  /** Amount of time (in seconds) the cache waits before it checks the back-end storage for file updates. */
  verificationTimer?: number;
  /** Amount of time (in seconds) the cache waits after the last file change before it copies the changed file to back-end storage. */
  writeBackTimer?: number;
}

export function nfs3TargetSerializer(item: Nfs3Target): any {
  return {
    target: item["target"],
    usageModel: item["usageModel"],
    verificationTimer: item["verificationTimer"],
    writeBackTimer: item["writeBackTimer"],
  };
}

export function nfs3TargetDeserializer(item: any): Nfs3Target {
  return {
    target: item["target"],
    usageModel: item["usageModel"],
    verificationTimer: item["verificationTimer"],
    writeBackTimer: item["writeBackTimer"],
  };
}

/** Properties pertaining to the ClfsTarget */
export interface ClfsTarget {
  /** Resource ID of storage container. */
  target?: string;
}

export function clfsTargetSerializer(item: ClfsTarget): any {
  return { target: item["target"] };
}

export function clfsTargetDeserializer(item: any): ClfsTarget {
  return {
    target: item["target"],
  };
}

/** Properties pertaining to the UnknownTarget */
export interface UnknownTarget {
  /** Dictionary of string->string pairs containing information about the Storage Target. */
  attributes?: Record<string, string>;
}

export function unknownTargetSerializer(item: UnknownTarget): any {
  return { attributes: item["attributes"] };
}

export function unknownTargetDeserializer(item: any): UnknownTarget {
  return {
    attributes: !item["attributes"]
      ? item["attributes"]
      : Object.fromEntries(
          Object.entries(item["attributes"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Properties pertaining to the BlobNfsTarget. */
export interface BlobNfsTarget {
  /** Resource ID of the storage container. */
  target?: string;
  /** Identifies the StorageCache usage model to be used for this storage target. */
  usageModel?: string;
  /** Amount of time (in seconds) the cache waits before it checks the back-end storage for file updates. */
  verificationTimer?: number;
  /** Amount of time (in seconds) the cache waits after the last file change before it copies the changed file to back-end storage. */
  writeBackTimer?: number;
}

export function blobNfsTargetSerializer(item: BlobNfsTarget): any {
  return {
    target: item["target"],
    usageModel: item["usageModel"],
    verificationTimer: item["verificationTimer"],
    writeBackTimer: item["writeBackTimer"],
  };
}

export function blobNfsTargetDeserializer(item: any): BlobNfsTarget {
  return {
    target: item["target"],
    usageModel: item["usageModel"],
    verificationTimer: item["verificationTimer"],
    writeBackTimer: item["writeBackTimer"],
  };
}

/** A list of Storage Targets. */
export interface _StorageTargetsResult {
  /** The list of Storage Targets defined for the cache. */
  value?: StorageTarget[];
  /** The URI to fetch the next page of Storage Targets. */
  nextLink?: string;
}

export function _storageTargetsResultDeserializer(item: any): _StorageTargetsResult {
  return {
    value: !item["value"] ? item["value"] : storageTargetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageTargetArraySerializer(result: Array<StorageTarget>): any[] {
  return result.map((item) => {
    return storageTargetSerializer(item);
  });
}

export function storageTargetArrayDeserializer(result: Array<StorageTarget>): any[] {
  return result.map((item) => {
    return storageTargetDeserializer(item);
  });
}

/** An AML file system instance. Follows Azure Resource Manager standards: https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/resource-api-reference.md */
export interface AmlFilesystem extends TrackedResource {
  /** The managed identity used by the AML file system, if configured. */
  identity?: AmlFilesystemIdentity;
  /** SKU for the resource. */
  sku?: SkuName;
  /** The availability zones. */
  zones?: string[];
  /** The size of the AML file system, in TiB. This might be rounded up. */
  storageCapacityTiB?: number;
  /** The current storage capacity of the AML file system, in TiB. This reflects the actual capacity including any expansions. */
  readonly currentStorageCapacityTiB?: number;
  /** The unique identifier of the AML file system cluster. */
  readonly clusterUuid?: string;
  /** Health of the AML file system. */
  readonly health?: AmlFilesystemHealth;
  /** ARM provisioning state. */
  readonly provisioningState?: AmlFilesystemProvisioningStateType;
  /** Subnet used for managing the AML file system and for client-facing operations. This subnet should have at least a /24 subnet mask within the VNET's address space. */
  filesystemSubnet?: string;
  /** Client information for the AML file system. */
  readonly clientInfo?: AmlFilesystemClientInfo;
  /** Throughput provisioned in MB per sec, calculated as storageCapacityTiB * per-unit storage throughput */
  readonly throughputProvisionedMBps?: number;
  /** Specifies encryption settings of the AML file system. */
  encryptionSettings?: AmlFilesystemEncryptionSettings;
  /** Start time of a 30-minute weekly maintenance window. */
  maintenanceWindow?: AmlFilesystemPropertiesMaintenanceWindow;
  /** Hydration and archive settings and status */
  hsm?: AmlFilesystemPropertiesHsm;
  /** Specifies root squash settings of the AML file system. */
  rootSquashSettings?: AmlFilesystemRootSquashSettings;
}

export function amlFilesystemSerializer(item: AmlFilesystem): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "storageCapacityTiB",
      "filesystemSubnet",
      "encryptionSettings",
      "maintenanceWindow",
      "hsm",
      "rootSquashSettings",
    ])
      ? undefined
      : _amlFilesystemPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : amlFilesystemIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuNameSerializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function amlFilesystemDeserializer(item: any): AmlFilesystem {
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
      : _amlFilesystemPropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : amlFilesystemIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : skuNameDeserializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Properties of the AML file system. */
export interface AmlFilesystemProperties {
  /** The size of the AML file system, in TiB. This might be rounded up. */
  storageCapacityTiB: number;
  /** The current storage capacity of the AML file system, in TiB. This reflects the actual capacity including any expansions. */
  readonly currentStorageCapacityTiB?: number;
  /** The unique identifier of the AML file system cluster. */
  readonly clusterUuid?: string;
  /** Health of the AML file system. */
  readonly health?: AmlFilesystemHealth;
  /** ARM provisioning state. */
  readonly provisioningState?: AmlFilesystemProvisioningStateType;
  /** Subnet used for managing the AML file system and for client-facing operations. This subnet should have at least a /24 subnet mask within the VNET's address space. */
  filesystemSubnet: string;
  /** Client information for the AML file system. */
  readonly clientInfo?: AmlFilesystemClientInfo;
  /** Throughput provisioned in MB per sec, calculated as storageCapacityTiB * per-unit storage throughput */
  readonly throughputProvisionedMBps?: number;
  /** Specifies encryption settings of the AML file system. */
  encryptionSettings?: AmlFilesystemEncryptionSettings;
  /** Start time of a 30-minute weekly maintenance window. */
  maintenanceWindow: AmlFilesystemPropertiesMaintenanceWindow;
  /** Hydration and archive settings and status */
  hsm?: AmlFilesystemPropertiesHsm;
  /** Specifies root squash settings of the AML file system. */
  rootSquashSettings?: AmlFilesystemRootSquashSettings;
}

export function amlFilesystemPropertiesSerializer(item: AmlFilesystemProperties): any {
  return {
    storageCapacityTiB: item["storageCapacityTiB"],
    filesystemSubnet: item["filesystemSubnet"],
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : amlFilesystemEncryptionSettingsSerializer(item["encryptionSettings"]),
    maintenanceWindow: amlFilesystemPropertiesMaintenanceWindowSerializer(
      item["maintenanceWindow"],
    ),
    hsm: !item["hsm"] ? item["hsm"] : amlFilesystemPropertiesHsmSerializer(item["hsm"]),
    rootSquashSettings: !item["rootSquashSettings"]
      ? item["rootSquashSettings"]
      : amlFilesystemRootSquashSettingsSerializer(item["rootSquashSettings"]),
  };
}

export function amlFilesystemPropertiesDeserializer(item: any): AmlFilesystemProperties {
  return {
    storageCapacityTiB: item["storageCapacityTiB"],
    currentStorageCapacityTiB: item["currentStorageCapacityTiB"],
    clusterUuid: item["clusterUuid"],
    health: !item["health"] ? item["health"] : amlFilesystemHealthDeserializer(item["health"]),
    provisioningState: item["provisioningState"],
    filesystemSubnet: item["filesystemSubnet"],
    clientInfo: !item["clientInfo"]
      ? item["clientInfo"]
      : amlFilesystemClientInfoDeserializer(item["clientInfo"]),
    throughputProvisionedMBps: item["throughputProvisionedMBps"],
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : amlFilesystemEncryptionSettingsDeserializer(item["encryptionSettings"]),
    maintenanceWindow: amlFilesystemPropertiesMaintenanceWindowDeserializer(
      item["maintenanceWindow"],
    ),
    hsm: !item["hsm"] ? item["hsm"] : amlFilesystemPropertiesHsmDeserializer(item["hsm"]),
    rootSquashSettings: !item["rootSquashSettings"]
      ? item["rootSquashSettings"]
      : amlFilesystemRootSquashSettingsDeserializer(item["rootSquashSettings"]),
  };
}

/** An indication of AML file system health. Gives more information about health than just that related to provisioning. */
export interface AmlFilesystemHealth {
  /** List of AML file system health states. */
  state?: AmlFilesystemHealthStateType;
  /** Server-defined error code for the AML file system health */
  statusCode?: string;
  /** Describes the health state. */
  statusDescription?: string;
}

export function amlFilesystemHealthDeserializer(item: any): AmlFilesystemHealth {
  return {
    state: item["state"],
    statusCode: item["statusCode"],
    statusDescription: item["statusDescription"],
  };
}

/** List of AML file system health states. */
export enum KnownAmlFilesystemHealthStateType {
  /** Unavailable */
  Unavailable = "Unavailable",
  /** Available */
  Available = "Available",
  /** Degraded */
  Degraded = "Degraded",
  /** Transitioning */
  Transitioning = "Transitioning",
  /** Maintenance */
  Maintenance = "Maintenance",
  /** Expanding */
  Expanding = "Expanding",
}

/**
 * List of AML file system health states. \
 * {@link KnownAmlFilesystemHealthStateType} can be used interchangeably with AmlFilesystemHealthStateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unavailable**: Unavailable \
 * **Available**: Available \
 * **Degraded**: Degraded \
 * **Transitioning**: Transitioning \
 * **Maintenance**: Maintenance \
 * **Expanding**: Expanding
 */
export type AmlFilesystemHealthStateType = string;

/** ARM provisioning state. */
export enum KnownAmlFilesystemProvisioningStateType {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Updating */
  Updating = "Updating",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * ARM provisioning state. \
 * {@link KnownAmlFilesystemProvisioningStateType} can be used interchangeably with AmlFilesystemProvisioningStateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Creating**: Creating \
 * **Deleting**: Deleting \
 * **Updating**: Updating \
 * **Canceled**: Canceled
 */
export type AmlFilesystemProvisioningStateType = string;

/** AML file system client information */
export interface AmlFilesystemClientInfo {
  /** The IPv4 address used by clients to mount the AML file system's Lustre Management Service (MGS). */
  readonly mgsAddress?: string;
  /** Recommended command to mount the AML file system */
  readonly mountCommand?: string;
  /** The version of Lustre running in the AML file system */
  readonly lustreVersion?: string;
  /** Container Storage Interface information for the AML file system. */
  readonly containerStorageInterface?: AmlFilesystemContainerStorageInterface;
}

export function amlFilesystemClientInfoDeserializer(item: any): AmlFilesystemClientInfo {
  return {
    mgsAddress: item["mgsAddress"],
    mountCommand: item["mountCommand"],
    lustreVersion: item["lustreVersion"],
    containerStorageInterface: !item["containerStorageInterface"]
      ? item["containerStorageInterface"]
      : amlFilesystemContainerStorageInterfaceDeserializer(item["containerStorageInterface"]),
  };
}

/** AML file system container storage interface information */
export interface AmlFilesystemContainerStorageInterface {
  /** Recommended AKS Persistent Volume Claim for the CSI driver, in Base64 encoded YAML */
  readonly persistentVolumeClaim?: string;
  /** Recommended AKS Persistent Volume for the CSI driver, in Base64 encoded YAML */
  readonly persistentVolume?: string;
  /** Recommended AKS Storage Class for the CSI driver, in Base64 encoded YAML */
  readonly storageClass?: string;
}

export function amlFilesystemContainerStorageInterfaceDeserializer(
  item: any,
): AmlFilesystemContainerStorageInterface {
  return {
    persistentVolumeClaim: item["persistentVolumeClaim"],
    persistentVolume: item["persistentVolume"],
    storageClass: item["storageClass"],
  };
}

/** AML file system encryption settings. */
export interface AmlFilesystemEncryptionSettings {
  /** Specifies the location of the encryption key in Key Vault. */
  keyEncryptionKey?: KeyVaultKeyReference;
}

export function amlFilesystemEncryptionSettingsSerializer(
  item: AmlFilesystemEncryptionSettings,
): any {
  return {
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyVaultKeyReferenceSerializer(item["keyEncryptionKey"]),
  };
}

export function amlFilesystemEncryptionSettingsDeserializer(
  item: any,
): AmlFilesystemEncryptionSettings {
  return {
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyVaultKeyReferenceDeserializer(item["keyEncryptionKey"]),
  };
}

/** Start time of a 30-minute weekly maintenance window. */
export interface AmlFilesystemPropertiesMaintenanceWindow {
  /** Day of the week on which the maintenance window will occur. */
  dayOfWeek?: MaintenanceDayOfWeekType;
  /** The time of day (in UTC) to start the maintenance window. */
  timeOfDayUTC?: string;
}

export function amlFilesystemPropertiesMaintenanceWindowSerializer(
  item: AmlFilesystemPropertiesMaintenanceWindow,
): any {
  return { dayOfWeek: item["dayOfWeek"], timeOfDayUTC: item["timeOfDayUTC"] };
}

export function amlFilesystemPropertiesMaintenanceWindowDeserializer(
  item: any,
): AmlFilesystemPropertiesMaintenanceWindow {
  return {
    dayOfWeek: item["dayOfWeek"],
    timeOfDayUTC: item["timeOfDayUTC"],
  };
}

/** Day of the week on which the maintenance window will occur. */
export type MaintenanceDayOfWeekType =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

/** Hydration and archive settings and status */
export interface AmlFilesystemPropertiesHsm {
  /** Specifies HSM settings of the AML file system. */
  settings?: AmlFilesystemHsmSettings;
  /** Archive status */
  readonly archiveStatus?: AmlFilesystemArchive[];
}

export function amlFilesystemPropertiesHsmSerializer(item: AmlFilesystemPropertiesHsm): any {
  return {
    settings: !item["settings"]
      ? item["settings"]
      : amlFilesystemHsmSettingsSerializer(item["settings"]),
  };
}

export function amlFilesystemPropertiesHsmDeserializer(item: any): AmlFilesystemPropertiesHsm {
  return {
    settings: !item["settings"]
      ? item["settings"]
      : amlFilesystemHsmSettingsDeserializer(item["settings"]),
    archiveStatus: !item["archiveStatus"]
      ? item["archiveStatus"]
      : amlFilesystemArchiveArrayDeserializer(item["archiveStatus"]),
  };
}

/** AML file system HSM settings. */
export interface AmlFilesystemHsmSettings {
  /** Resource ID of storage container used for hydrating the namespace and archiving from the namespace. The resource provider must have permission to create SAS tokens on the storage account. */
  container: string;
  /** Resource ID of storage container used for logging events and errors.  Must be a separate container in the same storage account as the hydration and archive container. The resource provider must have permission to create SAS tokens on the storage account. */
  loggingContainer: string;
  /** Only blobs in the non-logging container that start with this path/prefix get imported into the cluster namespace. This is only used during initial creation of the AML file system. It automatically creates an import job resource that can be deleted. */
  importPrefix?: string;
  /** Only blobs in the non-logging container that start with one of the paths/prefixes in this array get imported into the cluster namespace. This is only used during initial creation of the AML file system and has '/' as the default value. It automatically creates an import job resource that can be deleted. */
  importPrefixesInitial?: string[];
}

export function amlFilesystemHsmSettingsSerializer(item: AmlFilesystemHsmSettings): any {
  return {
    container: item["container"],
    loggingContainer: item["loggingContainer"],
    importPrefix: item["importPrefix"],
    importPrefixesInitial: !item["importPrefixesInitial"]
      ? item["importPrefixesInitial"]
      : item["importPrefixesInitial"].map((p: any) => {
          return p;
        }),
  };
}

export function amlFilesystemHsmSettingsDeserializer(item: any): AmlFilesystemHsmSettings {
  return {
    container: item["container"],
    loggingContainer: item["loggingContainer"],
    importPrefix: item["importPrefix"],
    importPrefixesInitial: !item["importPrefixesInitial"]
      ? item["importPrefixesInitial"]
      : item["importPrefixesInitial"].map((p: any) => {
          return p;
        }),
  };
}

export function amlFilesystemArchiveArrayDeserializer(result: Array<AmlFilesystemArchive>): any[] {
  return result.map((item) => {
    return amlFilesystemArchiveDeserializer(item);
  });
}

/** Information about the AML file system archive */
export interface AmlFilesystemArchive {
  /** Lustre file system path to archive relative to the file system root.  Specify '/' to archive all modified data. */
  readonly filesystemPath?: string;
  /** The status of the archive */
  readonly status?: AmlFilesystemArchiveStatus;
}

export function amlFilesystemArchiveDeserializer(item: any): AmlFilesystemArchive {
  return {
    filesystemPath: item["filesystemPath"],
    status: !item["status"]
      ? item["status"]
      : amlFilesystemArchiveStatusDeserializer(item["status"]),
  };
}

/** The status of the archive */
export interface AmlFilesystemArchiveStatus {
  /** The state of the archive operation */
  readonly state?: ArchiveStatusType;
  /** The time of the last completed archive operation */
  readonly lastCompletionTime?: Date;
  /** The time the latest archive operation started */
  readonly lastStartedTime?: Date;
  /** The completion percentage of the archive operation */
  readonly percentComplete?: number;
  /** Server-defined error code for the archive operation */
  readonly errorCode?: string;
  /** Server-defined error message for the archive operation */
  readonly errorMessage?: string;
}

export function amlFilesystemArchiveStatusDeserializer(item: any): AmlFilesystemArchiveStatus {
  return {
    state: item["state"],
    lastCompletionTime: !item["lastCompletionTime"]
      ? item["lastCompletionTime"]
      : new Date(item["lastCompletionTime"]),
    lastStartedTime: !item["lastStartedTime"]
      ? item["lastStartedTime"]
      : new Date(item["lastStartedTime"]),
    percentComplete: item["percentComplete"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
  };
}

/** The state of the archive operation */
export enum KnownArchiveStatusType {
  /** NotConfigured */
  NotConfigured = "NotConfigured",
  /** Idle */
  Idle = "Idle",
  /** InProgress */
  InProgress = "InProgress",
  /** Canceled */
  Canceled = "Canceled",
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
  /** Cancelling */
  Cancelling = "Cancelling",
  /** FSScanInProgress */
  FSScanInProgress = "FSScanInProgress",
}

/**
 * The state of the archive operation \
 * {@link KnownArchiveStatusType} can be used interchangeably with ArchiveStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotConfigured**: NotConfigured \
 * **Idle**: Idle \
 * **InProgress**: InProgress \
 * **Canceled**: Canceled \
 * **Completed**: Completed \
 * **Failed**: Failed \
 * **Cancelling**: Cancelling \
 * **FSScanInProgress**: FSScanInProgress
 */
export type ArchiveStatusType = string;

/** AML file system squash settings. */
export interface AmlFilesystemRootSquashSettings {
  /** Squash mode of the AML file system. 'All': User and Group IDs on files will be squashed to the provided values for all users on non-trusted systems. 'RootOnly': User and Group IDs on files will be squashed to provided values for solely the root user on non-trusted systems. 'None': No squashing of User and Group IDs is performed for any users on any systems. */
  mode?: AmlFilesystemSquashMode;
  /** Semicolon separated NID IP Address list(s) to be added to the TrustedSystems. */
  noSquashNidLists?: string;
  /** User ID to squash to. */
  squashUID?: number;
  /** Group ID to squash to. */
  squashGID?: number;
  /** AML file system squash status. */
  readonly status?: string;
}

export function amlFilesystemRootSquashSettingsSerializer(
  item: AmlFilesystemRootSquashSettings,
): any {
  return {
    mode: item["mode"],
    noSquashNidLists: item["noSquashNidLists"],
    squashUID: item["squashUID"],
    squashGID: item["squashGID"],
  };
}

export function amlFilesystemRootSquashSettingsDeserializer(
  item: any,
): AmlFilesystemRootSquashSettings {
  return {
    mode: item["mode"],
    noSquashNidLists: item["noSquashNidLists"],
    squashUID: item["squashUID"],
    squashGID: item["squashGID"],
    status: item["status"],
  };
}

/** Squash mode of the AML file system. 'All': User and Group IDs on files will be squashed to the provided values for all users on non-trusted systems. 'RootOnly': User and Group IDs on files will be squashed to provided values for solely the root user on non-trusted systems. 'None': No squashing of User and Group IDs is performed for any users on any systems. */
export enum KnownAmlFilesystemSquashMode {
  /** None */
  None = "None",
  /** RootOnly */
  RootOnly = "RootOnly",
  /** All */
  All = "All",
}

/**
 * Squash mode of the AML file system. 'All': User and Group IDs on files will be squashed to the provided values for all users on non-trusted systems. 'RootOnly': User and Group IDs on files will be squashed to provided values for solely the root user on non-trusted systems. 'None': No squashing of User and Group IDs is performed for any users on any systems. \
 * {@link KnownAmlFilesystemSquashMode} can be used interchangeably with AmlFilesystemSquashMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **RootOnly**: RootOnly \
 * **All**: All
 */
export type AmlFilesystemSquashMode = string;

/** Managed Identity properties. */
export interface AmlFilesystemIdentity {
  /** The principal ID for the user-assigned identity of the resource. */
  readonly principalId?: string;
  /** The tenant ID associated with the resource. */
  readonly tenantId?: string;
  /** The type of identity used for the resource. */
  type?: AmlFilesystemIdentityType;
  /** A dictionary where each key is a user assigned identity resource ID, and each key's value is an empty dictionary. */
  userAssignedIdentities?: Record<string, UserAssignedIdentitiesValue>;
}

export function amlFilesystemIdentitySerializer(item: AmlFilesystemIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function amlFilesystemIdentityDeserializer(item: any): AmlFilesystemIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of identity used for the resource. */
export type AmlFilesystemIdentityType = "UserAssigned" | "None";

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

/** An AML file system update instance. */
export interface AmlFilesystemUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Specifies encryption settings of the AML file system. */
  encryptionSettings?: AmlFilesystemEncryptionSettings;
  /** Start time of a 30-minute weekly maintenance window. */
  maintenanceWindow?: AmlFilesystemUpdatePropertiesMaintenanceWindow;
  /** Specifies root squash settings of the AML file system. */
  rootSquashSettings?: AmlFilesystemRootSquashSettings;
}

export function amlFilesystemUpdateSerializer(item: AmlFilesystemUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "encryptionSettings",
      "maintenanceWindow",
      "rootSquashSettings",
    ])
      ? undefined
      : _amlFilesystemUpdatePropertiesSerializer(item),
  };
}

/** Properties of the AML file system. */
export interface AmlFilesystemUpdateProperties {
  /** Specifies encryption settings of the AML file system. */
  encryptionSettings?: AmlFilesystemEncryptionSettings;
  /** Start time of a 30-minute weekly maintenance window. */
  maintenanceWindow?: AmlFilesystemUpdatePropertiesMaintenanceWindow;
  /** Specifies root squash settings of the AML file system. */
  rootSquashSettings?: AmlFilesystemRootSquashSettings;
}

export function amlFilesystemUpdatePropertiesSerializer(item: AmlFilesystemUpdateProperties): any {
  return {
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : amlFilesystemEncryptionSettingsSerializer(item["encryptionSettings"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : amlFilesystemUpdatePropertiesMaintenanceWindowSerializer(item["maintenanceWindow"]),
    rootSquashSettings: !item["rootSquashSettings"]
      ? item["rootSquashSettings"]
      : amlFilesystemRootSquashSettingsSerializer(item["rootSquashSettings"]),
  };
}

/** Start time of a 30-minute weekly maintenance window. */
export interface AmlFilesystemUpdatePropertiesMaintenanceWindow {
  /** Day of the week on which the maintenance window will occur. */
  dayOfWeek?: MaintenanceDayOfWeekType;
  /** The time of day (in UTC) to start the maintenance window. */
  timeOfDayUTC?: string;
}

export function amlFilesystemUpdatePropertiesMaintenanceWindowSerializer(
  item: AmlFilesystemUpdatePropertiesMaintenanceWindow,
): any {
  return { dayOfWeek: item["dayOfWeek"], timeOfDayUTC: item["timeOfDayUTC"] };
}

/** Result of the request to list AML file systems. It contains a list of AML file systems and a URL link to get the next set of results. */
export interface _AmlFilesystemsListResult {
  /** List of AML file systems. */
  value?: AmlFilesystem[];
  /** URL to get the next set of AML file system list results, if there are any. */
  nextLink?: string;
}

export function _amlFilesystemsListResultDeserializer(item: any): _AmlFilesystemsListResult {
  return {
    value: !item["value"] ? item["value"] : amlFilesystemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function amlFilesystemArraySerializer(result: Array<AmlFilesystem>): any[] {
  return result.map((item) => {
    return amlFilesystemSerializer(item);
  });
}

export function amlFilesystemArrayDeserializer(result: Array<AmlFilesystem>): any[] {
  return result.map((item) => {
    return amlFilesystemDeserializer(item);
  });
}

/** Information required to execute the archive operation */
export interface AmlFilesystemArchiveInfo {
  /** Lustre file system path to archive relative to the file system root.  Specify '/' to archive all modified data. */
  filesystemPath?: string;
}

export function amlFilesystemArchiveInfoSerializer(item: AmlFilesystemArchiveInfo): any {
  return { filesystemPath: item["filesystemPath"] };
}

/** An auto export job instance. Follows Azure Resource Manager standards: https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/resource-api-reference.md */
export interface AutoExportJob extends TrackedResource {
  /** ARM provisioning state. */
  readonly provisioningState?: AutoExportJobProvisioningStateType;
  /** The administrative status of the auto export job. Possible values: 'Enable', 'Disable'. Passing in a value of 'Disable' will disable the current active auto export job. By default it is set to 'Enable'. */
  adminStatus?: AutoExportJobAdminStatus;
  /** An array of blob paths/prefixes that get auto exported to the cluster namespace. It has '/' as the default value. Number of maximum allowed paths for now is 1. */
  autoExportPrefixes?: string[];
  /** The status of the auto export */
  readonly status?: AutoExportJobPropertiesStatus;
}

export function autoExportJobSerializer(item: AutoExportJob): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["adminStatus", "autoExportPrefixes"])
      ? undefined
      : _autoExportJobPropertiesSerializer(item),
  };
}

export function autoExportJobDeserializer(item: any): AutoExportJob {
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
      : _autoExportJobPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the auto export job. */
export interface AutoExportJobProperties {
  /** ARM provisioning state. */
  readonly provisioningState?: AutoExportJobProvisioningStateType;
  /** The administrative status of the auto export job. Possible values: 'Enable', 'Disable'. Passing in a value of 'Disable' will disable the current active auto export job. By default it is set to 'Enable'. */
  adminStatus?: AutoExportJobAdminStatus;
  /** An array of blob paths/prefixes that get auto exported to the cluster namespace. It has '/' as the default value. Number of maximum allowed paths for now is 1. */
  autoExportPrefixes?: string[];
  /** The operational state of auto export. InProgress indicates the export is running.  Disabling indicates the user has requested to disable the export but the disabling is still in progress. Disabled indicates auto export has been disabled.  DisableFailed indicates the disabling has failed.  Failed means the export was unable to continue, due to a fatal error. */
  state?: AutoExportStatusType;
  /** Server-defined status code for auto export job. */
  readonly statusCode?: string;
  /** Server-defined status message for auto export job. */
  readonly statusMessage?: string;
  /** Total files exported since the start of the export. This is accumulative, some files may be counted repeatedly. */
  readonly totalFilesExported?: number;
  /** Total data (in MiB) exported since the start of the export. This is accumulative, some files may be counted repeatedly. */
  readonly totalMiBExported?: number;
  /** Total files failed to be export since the last successfully completed iteration. This is accumulative, some files may be counted repeatedly. */
  readonly totalFilesFailed?: number;
  /** Number of iterations completed since the start of the export. */
  readonly exportIterationCount?: number;
  /** Time (in UTC) of the last successfully completed export iteration. Look at logging container for details. */
  readonly lastSuccessfulIterationCompletionTimeUTC?: Date;
  /** Files discovered for export in current iteration. It may increase while more export items are found. */
  readonly currentIterationFilesDiscovered?: number;
  /** Data (in MiB) discovered for export in current iteration. It may increase while more export items are found. */
  readonly currentIterationMiBDiscovered?: number;
  /** Files that have been exported in current iteration. */
  readonly currentIterationFilesExported?: number;
  /** Data (in MiB) that have been exported in current iteration. */
  readonly currentIterationMiBExported?: number;
  /** Files failed to export in current iteration. */
  readonly currentIterationFilesFailed?: number;
  /** The time (in UTC) the latest auto export job started. */
  readonly lastStartedTimeUTC?: Date;
  /** The time (in UTC) of the last completed auto export job. */
  readonly lastCompletionTimeUTC?: Date;
}

export function autoExportJobPropertiesSerializer(item: AutoExportJobProperties): any {
  return {
    adminStatus: item["adminStatus"],
    autoExportPrefixes: !item["autoExportPrefixes"]
      ? item["autoExportPrefixes"]
      : item["autoExportPrefixes"].map((p: any) => {
          return p;
        }),
  };
}

export function autoExportJobPropertiesDeserializer(item: any): AutoExportJobProperties {
  return {
    provisioningState: item["provisioningState"],
    adminStatus: item["adminStatus"],
    autoExportPrefixes: !item["autoExportPrefixes"]
      ? item["autoExportPrefixes"]
      : item["autoExportPrefixes"].map((p: any) => {
          return p;
        }),
    ...(!item["status"]
      ? item["status"]
      : _autoExportJobPropertiesStatusDeserializer(item["status"])),
  };
}

/** ARM provisioning state. */
export enum KnownAutoExportJobProvisioningStateType {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Updating */
  Updating = "Updating",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * ARM provisioning state. \
 * {@link KnownAutoExportJobProvisioningStateType} can be used interchangeably with AutoExportJobProvisioningStateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Creating**: Creating \
 * **Deleting**: Deleting \
 * **Updating**: Updating \
 * **Canceled**: Canceled
 */
export type AutoExportJobProvisioningStateType = string;

/** The administrative status of the auto export job. Possible values: 'Enable', 'Disable'. Passing in a value of 'Disable' will disable the current active auto export job. By default it is set to 'Enable'. */
export enum KnownAutoExportJobAdminStatus {
  /** Enable */
  Enable = "Enable",
  /** Disable */
  Disable = "Disable",
}

/**
 * The administrative status of the auto export job. Possible values: 'Enable', 'Disable'. Passing in a value of 'Disable' will disable the current active auto export job. By default it is set to 'Enable'. \
 * {@link KnownAutoExportJobAdminStatus} can be used interchangeably with AutoExportJobAdminStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enable**: Enable \
 * **Disable**: Disable
 */
export type AutoExportJobAdminStatus = string;

/** The status of the auto export */
export interface AutoExportJobPropertiesStatus {
  /** The operational state of auto export. InProgress indicates the export is running.  Disabling indicates the user has requested to disable the export but the disabling is still in progress. Disabled indicates auto export has been disabled.  DisableFailed indicates the disabling has failed.  Failed means the export was unable to continue, due to a fatal error. */
  state?: AutoExportStatusType;
  /** Server-defined status code for auto export job. */
  readonly statusCode?: string;
  /** Server-defined status message for auto export job. */
  readonly statusMessage?: string;
  /** Total files exported since the start of the export. This is accumulative, some files may be counted repeatedly. */
  readonly totalFilesExported?: number;
  /** Total data (in MiB) exported since the start of the export. This is accumulative, some files may be counted repeatedly. */
  readonly totalMiBExported?: number;
  /** Total files failed to be export since the last successfully completed iteration. This is accumulative, some files may be counted repeatedly. */
  readonly totalFilesFailed?: number;
  /** Number of iterations completed since the start of the export. */
  readonly exportIterationCount?: number;
  /** Time (in UTC) of the last successfully completed export iteration. Look at logging container for details. */
  readonly lastSuccessfulIterationCompletionTimeUTC?: Date;
  /** Files discovered for export in current iteration. It may increase while more export items are found. */
  readonly currentIterationFilesDiscovered?: number;
  /** Data (in MiB) discovered for export in current iteration. It may increase while more export items are found. */
  readonly currentIterationMiBDiscovered?: number;
  /** Files that have been exported in current iteration. */
  readonly currentIterationFilesExported?: number;
  /** Data (in MiB) that have been exported in current iteration. */
  readonly currentIterationMiBExported?: number;
  /** Files failed to export in current iteration. */
  readonly currentIterationFilesFailed?: number;
  /** The time (in UTC) the latest auto export job started. */
  readonly lastStartedTimeUTC?: Date;
  /** The time (in UTC) of the last completed auto export job. */
  readonly lastCompletionTimeUTC?: Date;
}

export function autoExportJobPropertiesStatusDeserializer(
  item: any,
): AutoExportJobPropertiesStatus {
  return {
    state: item["state"],
    statusCode: item["statusCode"],
    statusMessage: item["statusMessage"],
    totalFilesExported: item["totalFilesExported"],
    totalMiBExported: item["totalMiBExported"],
    totalFilesFailed: item["totalFilesFailed"],
    exportIterationCount: item["exportIterationCount"],
    lastSuccessfulIterationCompletionTimeUTC: !item["lastSuccessfulIterationCompletionTimeUTC"]
      ? item["lastSuccessfulIterationCompletionTimeUTC"]
      : new Date(item["lastSuccessfulIterationCompletionTimeUTC"]),
    currentIterationFilesDiscovered: item["currentIterationFilesDiscovered"],
    currentIterationMiBDiscovered: item["currentIterationMiBDiscovered"],
    currentIterationFilesExported: item["currentIterationFilesExported"],
    currentIterationMiBExported: item["currentIterationMiBExported"],
    currentIterationFilesFailed: item["currentIterationFilesFailed"],
    lastStartedTimeUTC: !item["lastStartedTimeUTC"]
      ? item["lastStartedTimeUTC"]
      : new Date(item["lastStartedTimeUTC"]),
    lastCompletionTimeUTC: !item["lastCompletionTimeUTC"]
      ? item["lastCompletionTimeUTC"]
      : new Date(item["lastCompletionTimeUTC"]),
  };
}

/** The operational state of auto export. InProgress indicates the export is running.  Disabling indicates the user has requested to disable the export but the disabling is still in progress. Disabled indicates auto export has been disabled.  DisableFailed indicates the disabling has failed.  Failed means the export was unable to continue, due to a fatal error. */
export enum KnownAutoExportStatusType {
  /** InProgress */
  InProgress = "InProgress",
  /** Disabling */
  Disabling = "Disabling",
  /** Disabled */
  Disabled = "Disabled",
  /** DisableFailed */
  DisableFailed = "DisableFailed",
  /** Failed */
  Failed = "Failed",
}

/**
 * The operational state of auto export. InProgress indicates the export is running.  Disabling indicates the user has requested to disable the export but the disabling is still in progress. Disabled indicates auto export has been disabled.  DisableFailed indicates the disabling has failed.  Failed means the export was unable to continue, due to a fatal error. \
 * {@link KnownAutoExportStatusType} can be used interchangeably with AutoExportStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: InProgress \
 * **Disabling**: Disabling \
 * **Disabled**: Disabled \
 * **DisableFailed**: DisableFailed \
 * **Failed**: Failed
 */
export type AutoExportStatusType = string;

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

/** An auto export job update instance. */
export interface AutoExportJobUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The administrative status of the auto export job. Possible values: 'Enable', 'Disable'. Passing in a value of 'Disable' will disable the current active auto export job. By default it is set to 'Enable'. */
  adminStatus?: AutoExportJobAdminStatus;
}

export function autoExportJobUpdateSerializer(item: AutoExportJobUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["adminStatus"])
      ? undefined
      : _autoExportJobUpdatePropertiesSerializer(item),
  };
}

/** model interface AutoExportJobUpdateProperties */
export interface AutoExportJobUpdateProperties {
  /** The administrative status of the auto export job. Possible values: 'Enable', 'Disable'. Passing in a value of 'Disable' will disable the current active auto export job. By default it is set to 'Enable'. */
  adminStatus?: AutoExportJobAdminStatus;
}

export function autoExportJobUpdatePropertiesSerializer(item: AutoExportJobUpdateProperties): any {
  return { adminStatus: item["adminStatus"] };
}

/** Result of the request to list auto export jobs. It contains a list of auto export jobs and a URL link to get the next set of results. */
export interface _AutoExportJobsListResult {
  /** List of auto export jobs. */
  value?: AutoExportJob[];
  /** URL to get the next set of auto export job list results, if there are any. */
  nextLink?: string;
}

export function _autoExportJobsListResultDeserializer(item: any): _AutoExportJobsListResult {
  return {
    value: !item["value"] ? item["value"] : autoExportJobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function autoExportJobArraySerializer(result: Array<AutoExportJob>): any[] {
  return result.map((item) => {
    return autoExportJobSerializer(item);
  });
}

export function autoExportJobArrayDeserializer(result: Array<AutoExportJob>): any[] {
  return result.map((item) => {
    return autoExportJobDeserializer(item);
  });
}

/** An import job instance. Follows Azure Resource Manager standards: https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/resource-api-reference.md */
export interface ImportJob extends TrackedResource {
  /** ARM provisioning state. */
  readonly provisioningState?: ImportJobProvisioningStateType;
  /** The administrative status of the import job. Possible values: 'Active', 'Cancel'. Passing in a value of 'Cancel' will cancel the current active import job. By default it is set to 'Active'. */
  adminStatus?: ImportJobAdminStatus;
  /** An array of blob paths/prefixes that get imported into the cluster namespace. It has '/' as the default value. */
  importPrefixes?: string[];
  /** How the import job will handle conflicts. For example, if the import job is trying to bring in a directory, but a file is at that path, how it handles it. Fail indicates that the import job should stop immediately and not do anything with the conflict. Skip indicates that it should pass over the conflict. OverwriteIfDirty causes the import job to delete and re-import the file or directory if it is a conflicting type, is dirty, or was not previously imported. OverwriteAlways extends OverwriteIfDirty to include releasing files that had been restored but were not dirty. Please reference https://learn.microsoft.com/en-us/azure/azure-managed-lustre/ for a thorough explanation of these resolution modes. */
  conflictResolutionMode?: ConflictResolutionMode;
  /** Total non-conflict oriented errors the import job will tolerate before exiting with failure. -1 means infinite. 0 means exit immediately and is the default. */
  maximumErrors?: number;
  /** The status of the import */
  readonly status?: ImportJobPropertiesStatus;
}

export function importJobSerializer(item: ImportJob): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "adminStatus",
      "importPrefixes",
      "conflictResolutionMode",
      "maximumErrors",
    ])
      ? undefined
      : _importJobPropertiesSerializer(item),
  };
}

export function importJobDeserializer(item: any): ImportJob {
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
      : _importJobPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the import job. */
export interface ImportJobProperties {
  /** ARM provisioning state. */
  readonly provisioningState?: ImportJobProvisioningStateType;
  /** The administrative status of the import job. Possible values: 'Active', 'Cancel'. Passing in a value of 'Cancel' will cancel the current active import job. By default it is set to 'Active'. */
  adminStatus?: ImportJobAdminStatus;
  /** An array of blob paths/prefixes that get imported into the cluster namespace. It has '/' as the default value. */
  importPrefixes?: string[];
  /** How the import job will handle conflicts. For example, if the import job is trying to bring in a directory, but a file is at that path, how it handles it. Fail indicates that the import job should stop immediately and not do anything with the conflict. Skip indicates that it should pass over the conflict. OverwriteIfDirty causes the import job to delete and re-import the file or directory if it is a conflicting type, is dirty, or was not previously imported. OverwriteAlways extends OverwriteIfDirty to include releasing files that had been restored but were not dirty. Please reference https://learn.microsoft.com/en-us/azure/azure-managed-lustre/ for a thorough explanation of these resolution modes. */
  conflictResolutionMode?: ConflictResolutionMode;
  /** Total non-conflict oriented errors the import job will tolerate before exiting with failure. -1 means infinite. 0 means exit immediately and is the default. */
  maximumErrors?: number;
  /** The operational state of the import job. InProgress indicates the import is still running. Canceled indicates it has been canceled by the user. Completed indicates import finished, successfully importing all discovered blobs into the Lustre namespace. CompletedPartial indicates the import finished but some blobs either were found to be conflicting and could not be imported or other errors were encountered. Failed means the import was unable to complete due to a fatal error. */
  readonly state?: ImportStatusType;
  /** The status message of the import job. */
  readonly statusMessage?: string;
  /** The total blob objects walked. */
  readonly totalBlobsWalked?: number;
  /** A recent and frequently updated rate of blobs walked per second. */
  readonly blobsWalkedPerSecond?: number;
  /** The total blobs that have been imported since import began. */
  readonly totalBlobsImported?: number;
  /** New or modified files that have been imported into the filesystem. */
  readonly importedFiles?: number;
  /** New or modified directories that have been imported into the filesystem. */
  readonly importedDirectories?: number;
  /** Newly added symbolic links into the filesystem. */
  readonly importedSymlinks?: number;
  /** Files that already exist in the filesystem and have not been modified. */
  readonly preexistingFiles?: number;
  /** Directories that already exist in the filesystem and have not been modified. */
  readonly preexistingDirectories?: number;
  /** Symbolic links that already exist in the filesystem and have not been modified. */
  readonly preexistingSymlinks?: number;
  /** A recent and frequently updated rate of total files, directories, and symlinks imported per second. */
  readonly blobsImportedPerSecond?: number;
  /** The time (in UTC) of the last completed import job. */
  readonly lastCompletionTime?: Date;
  /** The time (in UTC) the latest import job started. */
  readonly lastStartedTime?: Date;
  /** Number of errors in the import job. */
  readonly totalErrors?: number;
  /** Number of conflicts in the import job. */
  readonly totalConflicts?: number;
}

export function importJobPropertiesSerializer(item: ImportJobProperties): any {
  return {
    adminStatus: item["adminStatus"],
    importPrefixes: !item["importPrefixes"]
      ? item["importPrefixes"]
      : item["importPrefixes"].map((p: any) => {
          return p;
        }),
    conflictResolutionMode: item["conflictResolutionMode"],
    maximumErrors: item["maximumErrors"],
  };
}

export function importJobPropertiesDeserializer(item: any): ImportJobProperties {
  return {
    provisioningState: item["provisioningState"],
    adminStatus: item["adminStatus"],
    importPrefixes: !item["importPrefixes"]
      ? item["importPrefixes"]
      : item["importPrefixes"].map((p: any) => {
          return p;
        }),
    conflictResolutionMode: item["conflictResolutionMode"],
    maximumErrors: item["maximumErrors"],
    ...(!item["status"] ? item["status"] : _importJobPropertiesStatusDeserializer(item["status"])),
  };
}

/** ARM provisioning state. */
export enum KnownImportJobProvisioningStateType {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Updating */
  Updating = "Updating",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * ARM provisioning state. \
 * {@link KnownImportJobProvisioningStateType} can be used interchangeably with ImportJobProvisioningStateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Creating**: Creating \
 * **Deleting**: Deleting \
 * **Updating**: Updating \
 * **Canceled**: Canceled
 */
export type ImportJobProvisioningStateType = string;

/** The administrative status of the import job. Possible values: 'Active', 'Cancel'. Passing in a value of 'Cancel' will cancel the current active import job. By default it is set to 'Active'. */
export enum KnownImportJobAdminStatus {
  /** Active */
  Active = "Active",
  /** Cancel */
  Cancel = "Cancel",
}

/**
 * The administrative status of the import job. Possible values: 'Active', 'Cancel'. Passing in a value of 'Cancel' will cancel the current active import job. By default it is set to 'Active'. \
 * {@link KnownImportJobAdminStatus} can be used interchangeably with ImportJobAdminStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Active \
 * **Cancel**: Cancel
 */
export type ImportJobAdminStatus = string;

/** How the import job will handle conflicts. For example, if the import job is trying to bring in a directory, but a file is at that path, how it handles it. Fail indicates that the import job should stop immediately and not do anything with the conflict. Skip indicates that it should pass over the conflict. OverwriteIfDirty causes the import job to delete and re-import the file or directory if it is a conflicting type, is dirty, or was not previously imported. OverwriteAlways extends OverwriteIfDirty to include releasing files that had been restored but were not dirty. Please reference https://learn.microsoft.com/en-us/azure/azure-managed-lustre/ for a thorough explanation of these resolution modes. */
export enum KnownConflictResolutionMode {
  /** Fail */
  Fail = "Fail",
  /** Skip */
  Skip = "Skip",
  /** OverwriteIfDirty */
  OverwriteIfDirty = "OverwriteIfDirty",
  /** OverwriteAlways */
  OverwriteAlways = "OverwriteAlways",
}

/**
 * How the import job will handle conflicts. For example, if the import job is trying to bring in a directory, but a file is at that path, how it handles it. Fail indicates that the import job should stop immediately and not do anything with the conflict. Skip indicates that it should pass over the conflict. OverwriteIfDirty causes the import job to delete and re-import the file or directory if it is a conflicting type, is dirty, or was not previously imported. OverwriteAlways extends OverwriteIfDirty to include releasing files that had been restored but were not dirty. Please reference https://learn.microsoft.com/en-us/azure/azure-managed-lustre/ for a thorough explanation of these resolution modes. \
 * {@link KnownConflictResolutionMode} can be used interchangeably with ConflictResolutionMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Fail**: Fail \
 * **Skip**: Skip \
 * **OverwriteIfDirty**: OverwriteIfDirty \
 * **OverwriteAlways**: OverwriteAlways
 */
export type ConflictResolutionMode = string;

/** The status of the import */
export interface ImportJobPropertiesStatus {
  /** The operational state of the import job. InProgress indicates the import is still running. Canceled indicates it has been canceled by the user. Completed indicates import finished, successfully importing all discovered blobs into the Lustre namespace. CompletedPartial indicates the import finished but some blobs either were found to be conflicting and could not be imported or other errors were encountered. Failed means the import was unable to complete due to a fatal error. */
  readonly state?: ImportStatusType;
  /** The status message of the import job. */
  readonly statusMessage?: string;
  /** The total blob objects walked. */
  readonly totalBlobsWalked?: number;
  /** A recent and frequently updated rate of blobs walked per second. */
  readonly blobsWalkedPerSecond?: number;
  /** The total blobs that have been imported since import began. */
  readonly totalBlobsImported?: number;
  /** New or modified files that have been imported into the filesystem. */
  readonly importedFiles?: number;
  /** New or modified directories that have been imported into the filesystem. */
  readonly importedDirectories?: number;
  /** Newly added symbolic links into the filesystem. */
  readonly importedSymlinks?: number;
  /** Files that already exist in the filesystem and have not been modified. */
  readonly preexistingFiles?: number;
  /** Directories that already exist in the filesystem and have not been modified. */
  readonly preexistingDirectories?: number;
  /** Symbolic links that already exist in the filesystem and have not been modified. */
  readonly preexistingSymlinks?: number;
  /** A recent and frequently updated rate of total files, directories, and symlinks imported per second. */
  readonly blobsImportedPerSecond?: number;
  /** The time (in UTC) of the last completed import job. */
  readonly lastCompletionTime?: Date;
  /** The time (in UTC) the latest import job started. */
  readonly lastStartedTime?: Date;
  /** Number of errors in the import job. */
  readonly totalErrors?: number;
  /** Number of conflicts in the import job. */
  readonly totalConflicts?: number;
}

export function importJobPropertiesStatusDeserializer(item: any): ImportJobPropertiesStatus {
  return {
    state: item["state"],
    statusMessage: item["statusMessage"],
    totalBlobsWalked: item["totalBlobsWalked"],
    blobsWalkedPerSecond: item["blobsWalkedPerSecond"],
    totalBlobsImported: item["totalBlobsImported"],
    importedFiles: item["importedFiles"],
    importedDirectories: item["importedDirectories"],
    importedSymlinks: item["importedSymlinks"],
    preexistingFiles: item["preexistingFiles"],
    preexistingDirectories: item["preexistingDirectories"],
    preexistingSymlinks: item["preexistingSymlinks"],
    blobsImportedPerSecond: item["blobsImportedPerSecond"],
    lastCompletionTime: !item["lastCompletionTime"]
      ? item["lastCompletionTime"]
      : new Date(item["lastCompletionTime"]),
    lastStartedTime: !item["lastStartedTime"]
      ? item["lastStartedTime"]
      : new Date(item["lastStartedTime"]),
    totalErrors: item["totalErrors"],
    totalConflicts: item["totalConflicts"],
  };
}

/** The operational state of the import job. InProgress indicates the import is still running. Canceled indicates it has been canceled by the user. Completed indicates import finished, successfully importing all discovered blobs into the Lustre namespace. CompletedPartial indicates the import finished but some blobs either were found to be conflicting and could not be imported or other errors were encountered. Failed means the import was unable to complete due to a fatal error. */
export enum KnownImportStatusType {
  /** InProgress */
  InProgress = "InProgress",
  /** Cancelling */
  Cancelling = "Cancelling",
  /** Canceled */
  Canceled = "Canceled",
  /** Completed */
  Completed = "Completed",
  /** CompletedPartial */
  CompletedPartial = "CompletedPartial",
  /** Failed */
  Failed = "Failed",
}

/**
 * The operational state of the import job. InProgress indicates the import is still running. Canceled indicates it has been canceled by the user. Completed indicates import finished, successfully importing all discovered blobs into the Lustre namespace. CompletedPartial indicates the import finished but some blobs either were found to be conflicting and could not be imported or other errors were encountered. Failed means the import was unable to complete due to a fatal error. \
 * {@link KnownImportStatusType} can be used interchangeably with ImportStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: InProgress \
 * **Cancelling**: Cancelling \
 * **Canceled**: Canceled \
 * **Completed**: Completed \
 * **CompletedPartial**: CompletedPartial \
 * **Failed**: Failed
 */
export type ImportStatusType = string;

/** An import job update instance. */
export interface ImportJobUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The administrative status of the import job. Possible values: 'Active', 'Cancel'. Passing in a value of 'Cancel' will cancel the current active import job. */
  adminStatus?: ImportJobAdminStatus;
}

export function importJobUpdateSerializer(item: ImportJobUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["adminStatus"])
      ? undefined
      : _importJobUpdatePropertiesSerializer(item),
  };
}

/** model interface ImportJobUpdateProperties */
export interface ImportJobUpdateProperties {
  /** The administrative status of the import job. Possible values: 'Active', 'Cancel'. Passing in a value of 'Cancel' will cancel the current active import job. */
  adminStatus?: ImportJobAdminStatus;
}

export function importJobUpdatePropertiesSerializer(item: ImportJobUpdateProperties): any {
  return { adminStatus: item["adminStatus"] };
}

/** Result of the request to list import jobs. It contains a list of import jobs and a URL link to get the next set of results. */
export interface _ImportJobsListResult {
  /** List of import jobs. */
  value?: ImportJob[];
  /** URL to get the next set of import job list results, if there are any. */
  nextLink?: string;
}

export function _importJobsListResultDeserializer(item: any): _ImportJobsListResult {
  return {
    value: !item["value"] ? item["value"] : importJobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function importJobArraySerializer(result: Array<ImportJob>): any[] {
  return result.map((item) => {
    return importJobSerializer(item);
  });
}

export function importJobArrayDeserializer(result: Array<ImportJob>): any[] {
  return result.map((item) => {
    return importJobDeserializer(item);
  });
}

/** An auto import job instance. Follows Azure Resource Manager standards: https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/resource-api-reference.md */
export interface AutoImportJob extends TrackedResource {
  /** ARM provisioning state. */
  readonly provisioningState?: AutoImportJobPropertiesProvisioningState;
  /** The administrative status of the auto import job. Possible values: 'Enable', 'Disable'. Passing in a value of 'Disable' will disable the current active auto import job. By default it is set to 'Enable'. */
  adminStatus?: AutoImportJobPropertiesAdminStatus;
  /** An array of blob paths/prefixes that get auto imported to the cluster namespace. It has '/' as the default value. Number of maximum allowed paths is 100. */
  autoImportPrefixes?: string[];
  /** How the auto import job will handle conflicts. For example, if the auto import job is trying to bring in a directory, but a file is at that path, how it handles it. Fail indicates that the auto import job should stop immediately and not do anything with the conflict. Skip indicates that it should pass over the conflict. OverwriteIfDirty causes the auto import job to delete and re-import the file or directory if it is a conflicting type, is dirty, or is currently released. OverwriteAlways extends OverwriteIfDirty to include releasing files that had been restored but were not dirty. Please reference https://learn.microsoft.com/en-us/azure/azure-managed-lustre/blob-integration#conflict-resolution-mode for a thorough explanation of these resolution modes. */
  conflictResolutionMode?: ConflictResolutionMode;
  /** Whether or not to enable deletions during auto import. This only affects overwrite-dirty. */
  enableDeletions?: boolean;
  /** Total non-conflict-oriented errors (e.g., OS errors) Import will tolerate before exiting with failure. -1 means infinite. 0 means exit immediately on any error. */
  maximumErrors?: number;
  /** The status of the auto import job. */
  readonly status?: AutoImportJobPropertiesStatus;
}

export function autoImportJobSerializer(item: AutoImportJob): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "adminStatus",
      "autoImportPrefixes",
      "conflictResolutionMode",
      "enableDeletions",
      "maximumErrors",
    ])
      ? undefined
      : _autoImportJobPropertiesSerializer(item),
  };
}

export function autoImportJobDeserializer(item: any): AutoImportJob {
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
      : _autoImportJobPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the auto import job. */
export interface AutoImportJobProperties {
  /** ARM provisioning state. */
  readonly provisioningState?: AutoImportJobPropertiesProvisioningState;
  /** The administrative status of the auto import job. Possible values: 'Enable', 'Disable'. Passing in a value of 'Disable' will disable the current active auto import job. By default it is set to 'Enable'. */
  adminStatus?: AutoImportJobPropertiesAdminStatus;
  /** An array of blob paths/prefixes that get auto imported to the cluster namespace. It has '/' as the default value. Number of maximum allowed paths is 100. */
  autoImportPrefixes?: string[];
  /** How the auto import job will handle conflicts. For example, if the auto import job is trying to bring in a directory, but a file is at that path, how it handles it. Fail indicates that the auto import job should stop immediately and not do anything with the conflict. Skip indicates that it should pass over the conflict. OverwriteIfDirty causes the auto import job to delete and re-import the file or directory if it is a conflicting type, is dirty, or is currently released. OverwriteAlways extends OverwriteIfDirty to include releasing files that had been restored but were not dirty. Please reference https://learn.microsoft.com/en-us/azure/azure-managed-lustre/blob-integration#conflict-resolution-mode for a thorough explanation of these resolution modes. */
  conflictResolutionMode?: ConflictResolutionMode;
  /** Whether or not to enable deletions during auto import. This only affects overwrite-dirty. */
  enableDeletions?: boolean;
  /** Total non-conflict-oriented errors (e.g., OS errors) Import will tolerate before exiting with failure. -1 means infinite. 0 means exit immediately on any error. */
  maximumErrors?: number;
  /** The state of the auto import operation. */
  readonly state?: AutoImportJobState;
  /** Server-defined status code for auto import job. */
  readonly statusCode?: string;
  /** Server-defined status message for auto import job. */
  readonly statusMessage?: string;
  /** Date and time of when the currently running full scan began. */
  readonly scanStartTime?: Date;
  /** Date and time of when the full scan ended. */
  readonly scanEndTime?: Date;
  /** Total number of blobs walked during full scan. */
  readonly totalBlobsWalked?: number;
  /** Rate of blobs walked during full scan. */
  readonly rateOfBlobWalk?: number;
  /** Total number of blobs imported during full scan. */
  readonly totalBlobsImported?: number;
  /** Rate of blob import during full scan. */
  readonly rateOfBlobImport?: number;
  /** Number of files imported during full scan. */
  readonly importedFiles?: number;
  /** Number of directories imported during full scan. */
  readonly importedDirectories?: number;
  /** Number of symlinks imported during full scan. */
  readonly importedSymlinks?: number;
  /** Number of preexisting files during full scan. */
  readonly preexistingFiles?: number;
  /** Number of preexisting directories during full scan. */
  readonly preexistingDirectories?: number;
  /** Number of preexisting symlinks during full scan. */
  readonly preexistingSymlinks?: number;
  /** Total errors encountered during full scan. */
  readonly totalErrors?: number;
  /** Total conflicts encountered during full scan. */
  readonly totalConflicts?: number;
  /** The storage account blob change feed status of the auto import job. */
  readonly blobSyncEvents?: AutoImportJobPropertiesStatusBlobSyncEvents;
  /** The time (in UTC) the latest auto import job started. */
  readonly lastStartedTimeUTC?: Date;
  /** The time (in UTC) of the last completed auto import job. */
  readonly lastCompletionTimeUTC?: Date;
}

export function autoImportJobPropertiesSerializer(item: AutoImportJobProperties): any {
  return {
    adminStatus: item["adminStatus"],
    autoImportPrefixes: !item["autoImportPrefixes"]
      ? item["autoImportPrefixes"]
      : item["autoImportPrefixes"].map((p: any) => {
          return p;
        }),
    conflictResolutionMode: item["conflictResolutionMode"],
    enableDeletions: item["enableDeletions"],
    maximumErrors: item["maximumErrors"],
  };
}

export function autoImportJobPropertiesDeserializer(item: any): AutoImportJobProperties {
  return {
    provisioningState: item["provisioningState"],
    adminStatus: item["adminStatus"],
    autoImportPrefixes: !item["autoImportPrefixes"]
      ? item["autoImportPrefixes"]
      : item["autoImportPrefixes"].map((p: any) => {
          return p;
        }),
    conflictResolutionMode: item["conflictResolutionMode"],
    enableDeletions: item["enableDeletions"],
    maximumErrors: item["maximumErrors"],
    ...(!item["status"]
      ? item["status"]
      : _autoImportJobPropertiesStatusDeserializer(item["status"])),
  };
}

/** ARM provisioning state. */
export enum KnownAutoImportJobPropertiesProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Updating */
  Updating = "Updating",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * ARM provisioning state. \
 * {@link KnownAutoImportJobPropertiesProvisioningState} can be used interchangeably with AutoImportJobPropertiesProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Creating**: Creating \
 * **Deleting**: Deleting \
 * **Updating**: Updating \
 * **Canceled**: Canceled
 */
export type AutoImportJobPropertiesProvisioningState = string;

/** The administrative status of the auto import job. Possible values: 'Enable', 'Disable'. Passing in a value of 'Disable' will disable the current active auto import job. By default it is set to 'Enable'. */
export enum KnownAutoImportJobPropertiesAdminStatus {
  /** Enable */
  Enable = "Enable",
  /** Disable */
  Disable = "Disable",
}

/**
 * The administrative status of the auto import job. Possible values: 'Enable', 'Disable'. Passing in a value of 'Disable' will disable the current active auto import job. By default it is set to 'Enable'. \
 * {@link KnownAutoImportJobPropertiesAdminStatus} can be used interchangeably with AutoImportJobPropertiesAdminStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enable**: Enable \
 * **Disable**: Disable
 */
export type AutoImportJobPropertiesAdminStatus = string;

/** The status of the auto import job. */
export interface AutoImportJobPropertiesStatus {
  /** The state of the auto import operation. */
  readonly state?: AutoImportJobState;
  /** Server-defined status code for auto import job. */
  readonly statusCode?: string;
  /** Server-defined status message for auto import job. */
  readonly statusMessage?: string;
  /** Date and time of when the currently running full scan began. */
  readonly scanStartTime?: Date;
  /** Date and time of when the full scan ended. */
  readonly scanEndTime?: Date;
  /** Total number of blobs walked during full scan. */
  readonly totalBlobsWalked?: number;
  /** Rate of blobs walked during full scan. */
  readonly rateOfBlobWalk?: number;
  /** Total number of blobs imported during full scan. */
  readonly totalBlobsImported?: number;
  /** Rate of blob import during full scan. */
  readonly rateOfBlobImport?: number;
  /** Number of files imported during full scan. */
  readonly importedFiles?: number;
  /** Number of directories imported during full scan. */
  readonly importedDirectories?: number;
  /** Number of symlinks imported during full scan. */
  readonly importedSymlinks?: number;
  /** Number of preexisting files during full scan. */
  readonly preexistingFiles?: number;
  /** Number of preexisting directories during full scan. */
  readonly preexistingDirectories?: number;
  /** Number of preexisting symlinks during full scan. */
  readonly preexistingSymlinks?: number;
  /** Total errors encountered during full scan. */
  readonly totalErrors?: number;
  /** Total conflicts encountered during full scan. */
  readonly totalConflicts?: number;
  /** The storage account blob change feed status of the auto import job. */
  readonly blobSyncEvents?: AutoImportJobPropertiesStatusBlobSyncEvents;
  /** The time (in UTC) the latest auto import job started. */
  readonly lastStartedTimeUTC?: Date;
  /** The time (in UTC) of the last completed auto import job. */
  readonly lastCompletionTimeUTC?: Date;
}

export function autoImportJobPropertiesStatusDeserializer(
  item: any,
): AutoImportJobPropertiesStatus {
  return {
    state: item["state"],
    statusCode: item["statusCode"],
    statusMessage: item["statusMessage"],
    scanStartTime: !item["scanStartTime"] ? item["scanStartTime"] : new Date(item["scanStartTime"]),
    scanEndTime: !item["scanEndTime"] ? item["scanEndTime"] : new Date(item["scanEndTime"]),
    totalBlobsWalked: item["totalBlobsWalked"],
    rateOfBlobWalk: item["rateOfBlobWalk"],
    totalBlobsImported: item["totalBlobsImported"],
    rateOfBlobImport: item["rateOfBlobImport"],
    importedFiles: item["importedFiles"],
    importedDirectories: item["importedDirectories"],
    importedSymlinks: item["importedSymlinks"],
    preexistingFiles: item["preexistingFiles"],
    preexistingDirectories: item["preexistingDirectories"],
    preexistingSymlinks: item["preexistingSymlinks"],
    totalErrors: item["totalErrors"],
    totalConflicts: item["totalConflicts"],
    blobSyncEvents: !item["blobSyncEvents"]
      ? item["blobSyncEvents"]
      : autoImportJobPropertiesStatusBlobSyncEventsDeserializer(item["blobSyncEvents"]),
    lastStartedTimeUTC: !item["lastStartedTimeUTC"]
      ? item["lastStartedTimeUTC"]
      : new Date(item["lastStartedTimeUTC"]),
    lastCompletionTimeUTC: !item["lastCompletionTimeUTC"]
      ? item["lastCompletionTimeUTC"]
      : new Date(item["lastCompletionTimeUTC"]),
  };
}

/** The state of the auto import operation. */
export enum KnownAutoImportJobState {
  /** InProgress */
  InProgress = "InProgress",
  /** Failed */
  Failed = "Failed",
  /** Disabling */
  Disabling = "Disabling",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The state of the auto import operation. \
 * {@link KnownAutoImportJobState} can be used interchangeably with AutoImportJobState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: InProgress \
 * **Failed**: Failed \
 * **Disabling**: Disabling \
 * **Disabled**: Disabled
 */
export type AutoImportJobState = string;

/** The storage account blob change feed status of the auto import job. */
export interface AutoImportJobPropertiesStatusBlobSyncEvents {
  /** Number of files imported during auto import. */
  readonly importedFiles?: number;
  /** Number of directories imported during auto import. */
  readonly importedDirectories?: number;
  /** Number of symlinks imported during auto import. */
  readonly importedSymlinks?: number;
  /** Number of preexisting files during auto import. */
  readonly preexistingFiles?: number;
  /** Number of preexisting directories during auto import. */
  readonly preexistingDirectories?: number;
  /** Number of preexisting symlinks during auto import. */
  readonly preexistingSymlinks?: number;
  /** Total number of blobs imported during auto import. */
  readonly totalBlobsImported?: number;
  /** Rate of blob import per second during auto import. */
  readonly rateOfBlobImport?: number;
  /** Total errors encountered during auto import. */
  readonly totalErrors?: number;
  /** Total conflicts encountered during auto import. */
  readonly totalConflicts?: number;
  /** Number of deletions during auto import. */
  readonly deletions?: number;
  /** Date and time of the last Change Feed event consumed. */
  readonly lastChangeFeedEventConsumedTime?: Date;
  /** Date and time when last fully synchronized. */
  readonly lastTimeFullySynchronized?: Date;
}

export function autoImportJobPropertiesStatusBlobSyncEventsDeserializer(
  item: any,
): AutoImportJobPropertiesStatusBlobSyncEvents {
  return {
    importedFiles: item["importedFiles"],
    importedDirectories: item["importedDirectories"],
    importedSymlinks: item["importedSymlinks"],
    preexistingFiles: item["preexistingFiles"],
    preexistingDirectories: item["preexistingDirectories"],
    preexistingSymlinks: item["preexistingSymlinks"],
    totalBlobsImported: item["totalBlobsImported"],
    rateOfBlobImport: item["rateOfBlobImport"],
    totalErrors: item["totalErrors"],
    totalConflicts: item["totalConflicts"],
    deletions: item["deletions"],
    lastChangeFeedEventConsumedTime: !item["lastChangeFeedEventConsumedTime"]
      ? item["lastChangeFeedEventConsumedTime"]
      : new Date(item["lastChangeFeedEventConsumedTime"]),
    lastTimeFullySynchronized: !item["lastTimeFullySynchronized"]
      ? item["lastTimeFullySynchronized"]
      : new Date(item["lastTimeFullySynchronized"]),
  };
}

/** An auto import job update instance. */
export interface AutoImportJobUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The administrative status of the auto import job. Possible values: 'Enable', 'Disable'. Passing in a value of 'Disable' will disable the current active auto import job. By default it is set to 'Enable'. */
  adminStatus?: AutoImportJobUpdatePropertiesAdminStatus;
}

export function autoImportJobUpdateSerializer(item: AutoImportJobUpdate): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["adminStatus"])
      ? undefined
      : _autoImportJobUpdatePropertiesSerializer(item),
  };
}

/** model interface AutoImportJobUpdateProperties */
export interface AutoImportJobUpdateProperties {
  /** The administrative status of the auto import job. Possible values: 'Enable', 'Disable'. Passing in a value of 'Disable' will disable the current active auto import job. By default it is set to 'Enable'. */
  adminStatus?: AutoImportJobUpdatePropertiesAdminStatus;
}

export function autoImportJobUpdatePropertiesSerializer(item: AutoImportJobUpdateProperties): any {
  return { adminStatus: item["adminStatus"] };
}

/** The administrative status of the auto import job. Possible values: 'Enable', 'Disable'. Passing in a value of 'Disable' will disable the current active auto import job. By default it is set to 'Enable'. */
export enum KnownAutoImportJobUpdatePropertiesAdminStatus {
  /** Enable */
  Enable = "Enable",
  /** Disable */
  Disable = "Disable",
}

/**
 * The administrative status of the auto import job. Possible values: 'Enable', 'Disable'. Passing in a value of 'Disable' will disable the current active auto import job. By default it is set to 'Enable'. \
 * {@link KnownAutoImportJobUpdatePropertiesAdminStatus} can be used interchangeably with AutoImportJobUpdatePropertiesAdminStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enable**: Enable \
 * **Disable**: Disable
 */
export type AutoImportJobUpdatePropertiesAdminStatus = string;

/** Result of the request to list auto import jobs. It contains a list of auto import jobs and a URL link to get the next set of results. */
export interface _AutoImportJobsListResult {
  /** List of auto import jobs. */
  value?: AutoImportJob[];
  /** URL to get the next set of auto import job list results, if there are any. */
  nextLink?: string;
}

export function _autoImportJobsListResultDeserializer(item: any): _AutoImportJobsListResult {
  return {
    value: !item["value"] ? item["value"] : autoImportJobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function autoImportJobArraySerializer(result: Array<AutoImportJob>): any[] {
  return result.map((item) => {
    return autoImportJobSerializer(item);
  });
}

export function autoImportJobArrayDeserializer(result: Array<AutoImportJob>): any[] {
  return result.map((item) => {
    return autoImportJobDeserializer(item);
  });
}

/** An expansion job instance. Follows Azure Resource Manager standards: https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/resource-api-reference.md */
export interface ExpansionJob extends TrackedResource {
  /** ARM provisioning state, see https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/Addendum.md#provisioningstate-property */
  readonly provisioningState?: ExpansionJobPropertiesProvisioningState;
  /** The new storage capacity in TiB for the AML file system after expansion. This must be a multiple of the Sku step size, and greater than the current storage capacity of the AML file system. */
  newStorageCapacityTiB?: number;
  /** The status of the expansion job. */
  readonly status?: ExpansionJobPropertiesStatus;
}

export function expansionJobSerializer(item: ExpansionJob): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["newStorageCapacityTiB"])
      ? undefined
      : _expansionJobPropertiesSerializer(item),
  };
}

export function expansionJobDeserializer(item: any): ExpansionJob {
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
      : _expansionJobPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the expansion job. */
export interface ExpansionJobProperties {
  /** ARM provisioning state, see https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/Addendum.md#provisioningstate-property */
  readonly provisioningState?: ExpansionJobPropertiesProvisioningState;
  /** The new storage capacity in TiB for the AML file system after expansion. This must be a multiple of the Sku step size, and greater than the current storage capacity of the AML file system. */
  newStorageCapacityTiB?: number;
  /** The operational state of the expansion job. InProgress indicates the expansion is still running. Completed indicates expansion finished successfully. Failed means the expansion was unable to complete due to a fatal error. Deleting indicates the expansion is being rolled back. */
  readonly state?: ExpansionJobStatusType;
  /** Server-defined status code for expansion job. */
  readonly statusCode?: string;
  /** Server-defined status message for expansion job. */
  readonly statusMessage?: string;
  /** The percentage of expansion job completion. */
  readonly percentComplete?: number;
  /** The time (in UTC) the expansion job started. */
  readonly startTimeUTC?: Date;
  /** The time (in UTC) when the expansion job completed. Only populated when job reaches a terminal state. */
  readonly completionTimeUTC?: Date;
}

export function expansionJobPropertiesSerializer(item: ExpansionJobProperties): any {
  return { newStorageCapacityTiB: item["newStorageCapacityTiB"] };
}

export function expansionJobPropertiesDeserializer(item: any): ExpansionJobProperties {
  return {
    provisioningState: item["provisioningState"],
    newStorageCapacityTiB: item["newStorageCapacityTiB"],
    ...(!item["status"]
      ? item["status"]
      : _expansionJobPropertiesStatusDeserializer(item["status"])),
  };
}

/** ARM provisioning state, see https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/Addendum.md#provisioningstate-property */
export enum KnownExpansionJobPropertiesProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Updating */
  Updating = "Updating",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * ARM provisioning state, see https://github.com/Azure/azure-resource-manager-rpc/blob/master/v1.0/Addendum.md#provisioningstate-property \
 * {@link KnownExpansionJobPropertiesProvisioningState} can be used interchangeably with ExpansionJobPropertiesProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Creating**: Creating \
 * **Deleting**: Deleting \
 * **Updating**: Updating \
 * **Canceled**: Canceled
 */
export type ExpansionJobPropertiesProvisioningState = string;

/** The status of the expansion job. */
export interface ExpansionJobPropertiesStatus {
  /** The operational state of the expansion job. InProgress indicates the expansion is still running. Completed indicates expansion finished successfully. Failed means the expansion was unable to complete due to a fatal error. Deleting indicates the expansion is being rolled back. */
  readonly state?: ExpansionJobStatusType;
  /** Server-defined status code for expansion job. */
  readonly statusCode?: string;
  /** Server-defined status message for expansion job. */
  readonly statusMessage?: string;
  /** The percentage of expansion job completion. */
  readonly percentComplete?: number;
  /** The time (in UTC) the expansion job started. */
  readonly startTimeUTC?: Date;
  /** The time (in UTC) when the expansion job completed. Only populated when job reaches a terminal state. */
  readonly completionTimeUTC?: Date;
}

export function expansionJobPropertiesStatusDeserializer(item: any): ExpansionJobPropertiesStatus {
  return {
    state: item["state"],
    statusCode: item["statusCode"],
    statusMessage: item["statusMessage"],
    percentComplete: item["percentComplete"],
    startTimeUTC: !item["startTimeUTC"] ? item["startTimeUTC"] : new Date(item["startTimeUTC"]),
    completionTimeUTC: !item["completionTimeUTC"]
      ? item["completionTimeUTC"]
      : new Date(item["completionTimeUTC"]),
  };
}

/** The operational state of the expansion job. InProgress indicates the expansion is still running. Completed indicates expansion finished successfully. Failed means the expansion was unable to complete due to a fatal error. Deleting indicates the expansion is being rolled back. */
export enum KnownExpansionJobStatusType {
  /** InProgress */
  InProgress = "InProgress",
  /** Completed */
  Completed = "Completed",
  /** Failed */
  Failed = "Failed",
  /** Deleting */
  Deleting = "Deleting",
  /** RollingBack */
  RollingBack = "RollingBack",
}

/**
 * The operational state of the expansion job. InProgress indicates the expansion is still running. Completed indicates expansion finished successfully. Failed means the expansion was unable to complete due to a fatal error. Deleting indicates the expansion is being rolled back. \
 * {@link KnownExpansionJobStatusType} can be used interchangeably with ExpansionJobStatusType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: InProgress \
 * **Completed**: Completed \
 * **Failed**: Failed \
 * **Deleting**: Deleting \
 * **RollingBack**: RollingBack
 */
export type ExpansionJobStatusType = string;

/** An expansion job update instance. */
export interface ExpansionJobUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function expansionJobUpdateSerializer(item: ExpansionJobUpdate): any {
  return { tags: item["tags"] };
}

/** Result of the request to list expansion jobs. It contains a list of expansion jobs and a URL link to get the next set of results. */
export interface _ExpansionJobsListResult {
  /** List of expansion jobs. */
  value?: ExpansionJob[];
  /** URL to get the next set of expansion job list results, if there are any. */
  nextLink?: string;
}

export function _expansionJobsListResultDeserializer(item: any): _ExpansionJobsListResult {
  return {
    value: !item["value"] ? item["value"] : expansionJobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function expansionJobArraySerializer(result: Array<ExpansionJob>): any[] {
  return result.map((item) => {
    return expansionJobSerializer(item);
  });
}

export function expansionJobArrayDeserializer(result: Array<ExpansionJob>): any[] {
  return result.map((item) => {
    return expansionJobDeserializer(item);
  });
}

/** The response from the List Cache SKUs operation. */
export interface _ResourceSkusResult {
  /** The list of SKUs available for the subscription. */
  readonly value?: ResourceSku[];
  /** The URI to fetch the next page of cache SKUs. */
  nextLink?: string;
}

export function _resourceSkusResultDeserializer(item: any): _ResourceSkusResult {
  return {
    value: !item["value"] ? item["value"] : resourceSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceSkuArrayDeserializer(result: Array<ResourceSku>): any[] {
  return result.map((item) => {
    return resourceSkuDeserializer(item);
  });
}

/** A resource SKU. */
export interface ResourceSku {
  /** The type of resource the SKU applies to. */
  readonly resourceType?: string;
  /** A list of capabilities of this SKU, such as throughput or ops/sec. */
  capabilities?: ResourceSkuCapabilities[];
  /** The set of locations where the SKU is available. This is the supported and registered Azure Geo Regions (e.g., West US, East US, Southeast Asia, etc.). */
  readonly locations?: string[];
  /** The set of locations where the SKU is available. */
  locationInfo?: ResourceSkuLocationInfo[];
  /** The name of this SKU. */
  name?: string;
  /** The restrictions preventing this SKU from being used. This is empty if there are no restrictions. */
  restrictions?: Restriction[];
}

export function resourceSkuDeserializer(item: any): ResourceSku {
  return {
    resourceType: item["resourceType"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : resourceSkuCapabilitiesArrayDeserializer(item["capabilities"]),
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    locationInfo: !item["locationInfo"]
      ? item["locationInfo"]
      : resourceSkuLocationInfoArrayDeserializer(item["locationInfo"]),
    name: item["name"],
    restrictions: !item["restrictions"]
      ? item["restrictions"]
      : restrictionArrayDeserializer(item["restrictions"]),
  };
}

export function resourceSkuCapabilitiesArrayDeserializer(
  result: Array<ResourceSkuCapabilities>,
): any[] {
  return result.map((item) => {
    return resourceSkuCapabilitiesDeserializer(item);
  });
}

/** A resource SKU capability. */
export interface ResourceSkuCapabilities {
  /** Name of a capability, such as ops/sec. */
  name?: string;
  /** Quantity, if the capability is measured by quantity. */
  value?: string;
}

export function resourceSkuCapabilitiesDeserializer(item: any): ResourceSkuCapabilities {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function resourceSkuLocationInfoArrayDeserializer(
  result: Array<ResourceSkuLocationInfo>,
): any[] {
  return result.map((item) => {
    return resourceSkuLocationInfoDeserializer(item);
  });
}

/** Resource SKU location information. */
export interface ResourceSkuLocationInfo {
  /** Location where this SKU is available. */
  location?: string;
  /** Zones if any. */
  zones?: string[];
}

export function resourceSkuLocationInfoDeserializer(item: any): ResourceSkuLocationInfo {
  return {
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function restrictionArrayDeserializer(result: Array<Restriction>): any[] {
  return result.map((item) => {
    return restrictionDeserializer(item);
  });
}

/** The restrictions preventing this SKU from being used. */
export interface Restriction {
  /** The type of restrictions. In this version, the only possible value for this is location. */
  readonly type?: string;
  /** The value of restrictions. If the restriction type is set to location, then this would be the different locations where the SKU is restricted. */
  readonly values?: string[];
  /** The reason for the restriction. As of now this can be "QuotaId" or "NotAvailableForSubscription". "QuotaId" is set when the SKU has requiredQuotas parameter as the subscription does not belong to that quota. "NotAvailableForSubscription" is related to capacity at the datacenter. */
  reasonCode?: ReasonCode;
}

export function restrictionDeserializer(item: any): Restriction {
  return {
    type: item["type"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
    reasonCode: item["reasonCode"],
  };
}

/** The reason for the restriction. As of now this can be "QuotaId" or "NotAvailableForSubscription". "QuotaId" is set when the SKU has requiredQuotas parameter as the subscription does not belong to that quota. "NotAvailableForSubscription" is related to capacity at the datacenter. */
export enum KnownReasonCode {
  /** QuotaId */
  QuotaId = "QuotaId",
  /** NotAvailableForSubscription */
  NotAvailableForSubscription = "NotAvailableForSubscription",
}

/**
 * The reason for the restriction. As of now this can be "QuotaId" or "NotAvailableForSubscription". "QuotaId" is set when the SKU has requiredQuotas parameter as the subscription does not belong to that quota. "NotAvailableForSubscription" is related to capacity at the datacenter. \
 * {@link KnownReasonCode} can be used interchangeably with ReasonCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **QuotaId**: QuotaId \
 * **NotAvailableForSubscription**: NotAvailableForSubscription
 */
export type ReasonCode = string;

/** A list of cache usage models. */
export interface _UsageModelsResult {
  /** The list of usage models available for the subscription. */
  value?: UsageModel[];
  /** The URI to fetch the next page of cache usage models. */
  nextLink?: string;
}

export function _usageModelsResultDeserializer(item: any): _UsageModelsResult {
  return {
    value: !item["value"] ? item["value"] : usageModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageModelArrayDeserializer(result: Array<UsageModel>): any[] {
  return result.map((item) => {
    return usageModelDeserializer(item);
  });
}

/** A usage model. */
export interface UsageModel {
  /** Localized information describing this usage model. */
  display?: UsageModelDisplay;
  /** Non-localized keyword name for this usage model. */
  modelName?: string;
  /** The type of Storage Target to which this model is applicable (only nfs3 as of this version). */
  targetType?: string;
}

export function usageModelDeserializer(item: any): UsageModel {
  return {
    display: !item["display"] ? item["display"] : usageModelDisplayDeserializer(item["display"]),
    modelName: item["modelName"],
    targetType: item["targetType"],
  };
}

/** Localized information describing this usage model. */
export interface UsageModelDisplay {
  /** String to display for this usage model. */
  description?: string;
}

export function usageModelDisplayDeserializer(item: any): UsageModelDisplay {
  return {
    description: item["description"],
  };
}

/** The status of operation. */
export interface AscOperation {
  /** The operation Id. */
  id?: string;
  /** The operation name. */
  name?: string;
  /** The start time of the operation. */
  startTime?: string;
  /** The end time of the operation. */
  endTime?: string;
  /** The status of the operation. */
  status?: string;
  /** The error detail of the operation if any. */
  error?: AscOperationErrorResponse;
  /** Additional operation-specific output. */
  output?: Record<string, any>;
}

export function ascOperationDeserializer(item: any): AscOperation {
  return {
    id: item["id"],
    name: item["name"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    status: item["status"],
    error: !item["error"] ? item["error"] : ascOperationErrorResponseDeserializer(item["error"]),
    ...(!item["properties"]
      ? item["properties"]
      : _ascOperationPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the format of Error response. */
export interface AscOperationErrorResponse {
  /** Error code */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
}

export function ascOperationErrorResponseDeserializer(item: any): AscOperationErrorResponse {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Additional operation-specific output. */
export interface AscOperationProperties {
  /** Additional operation-specific output. */
  output?: Record<string, any>;
}

export function ascOperationPropertiesDeserializer(item: any): AscOperationProperties {
  return {
    output: !item["output"]
      ? item["output"]
      : Object.fromEntries(Object.entries(item["output"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Result of the request to list resource usages. It contains a list of resource usages & limits and a URL link to get the next set of results. */
export interface _ResourceUsagesListResult {
  /** List of usages and limits for resources controlled by the Microsoft.StorageCache resource provider. */
  readonly value?: ResourceUsage[];
  /** URL to get the next set of resource usage list results if there are any. */
  readonly nextLink?: string;
}

export function _resourceUsagesListResultDeserializer(item: any): _ResourceUsagesListResult {
  return {
    value: !item["value"] ? item["value"] : resourceUsageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceUsageArrayDeserializer(result: Array<ResourceUsage>): any[] {
  return result.map((item) => {
    return resourceUsageDeserializer(item);
  });
}

/** The usage and limit (quota) for a resource. */
export interface ResourceUsage {
  /** The limit (quota) for this resource. */
  readonly limit?: number;
  /** Unit that the limit and usages are expressed in, such as 'Count'. */
  readonly unit?: string;
  /** The current usage of this resource. */
  readonly currentValue?: number;
  /** Naming information for this resource type. */
  readonly name?: ResourceUsageName;
}

export function resourceUsageDeserializer(item: any): ResourceUsage {
  return {
    limit: item["limit"],
    unit: item["unit"],
    currentValue: item["currentValue"],
    name: !item["name"] ? item["name"] : resourceUsageNameDeserializer(item["name"]),
  };
}

/** Naming information for this resource type. */
export interface ResourceUsageName {
  /** Canonical name for this resource type. */
  value?: string;
  /** Localized name for this resource type. */
  localizedValue?: string;
}

export function resourceUsageNameDeserializer(item: any): ResourceUsageName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-01-01 API version. */
  V20260101 = "2026-01-01",
}

export function _apiOperationPropertiesDeserializer(item: any) {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : apiOperationPropertiesServiceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

export function _cachePropertiesSerializer(item: Cache): any {
  return {
    cacheSizeGB: item["cacheSizeGB"],
    subnet: item["subnet"],
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : cacheUpgradeSettingsSerializer(item["upgradeSettings"]),
    networkSettings: !item["networkSettings"]
      ? item["networkSettings"]
      : cacheNetworkSettingsSerializer(item["networkSettings"]),
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : cacheEncryptionSettingsSerializer(item["encryptionSettings"]),
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : cacheSecuritySettingsSerializer(item["securitySettings"]),
    directoryServicesSettings: !item["directoryServicesSettings"]
      ? item["directoryServicesSettings"]
      : cacheDirectorySettingsSerializer(item["directoryServicesSettings"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    primingJobs: !item["primingJobs"]
      ? item["primingJobs"]
      : primingJobArraySerializer(item["primingJobs"]),
  };
}

export function _cachePropertiesDeserializer(item: any) {
  return {
    cacheSizeGB: item["cacheSizeGB"],
    health: !item["health"] ? item["health"] : cacheHealthDeserializer(item["health"]),
    mountAddresses: !item["mountAddresses"]
      ? item["mountAddresses"]
      : item["mountAddresses"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    subnet: item["subnet"],
    upgradeStatus: !item["upgradeStatus"]
      ? item["upgradeStatus"]
      : cacheUpgradeStatusDeserializer(item["upgradeStatus"]),
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : cacheUpgradeSettingsDeserializer(item["upgradeSettings"]),
    networkSettings: !item["networkSettings"]
      ? item["networkSettings"]
      : cacheNetworkSettingsDeserializer(item["networkSettings"]),
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : cacheEncryptionSettingsDeserializer(item["encryptionSettings"]),
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : cacheSecuritySettingsDeserializer(item["securitySettings"]),
    directoryServicesSettings: !item["directoryServicesSettings"]
      ? item["directoryServicesSettings"]
      : cacheDirectorySettingsDeserializer(item["directoryServicesSettings"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    primingJobs: !item["primingJobs"]
      ? item["primingJobs"]
      : primingJobArrayDeserializer(item["primingJobs"]),
    spaceAllocation: !item["spaceAllocation"]
      ? item["spaceAllocation"]
      : storageTargetSpaceAllocationArrayDeserializer(item["spaceAllocation"]),
  };
}

export function _storageTargetPropertiesSerializer(item: StorageTarget): any {
  return {
    junctions: !item["junctions"]
      ? item["junctions"]
      : namespaceJunctionArraySerializer(item["junctions"]),
    targetType: item["targetType"],
    state: item["state"],
    nfs3: !item["nfs3"] ? item["nfs3"] : nfs3TargetSerializer(item["nfs3"]),
    clfs: !item["clfs"] ? item["clfs"] : clfsTargetSerializer(item["clfs"]),
    unknown: !item["unknown"] ? item["unknown"] : unknownTargetSerializer(item["unknown"]),
    blobNfs: !item["blobNfs"] ? item["blobNfs"] : blobNfsTargetSerializer(item["blobNfs"]),
  };
}

export function _storageTargetPropertiesDeserializer(item: any) {
  return {
    junctions: !item["junctions"]
      ? item["junctions"]
      : namespaceJunctionArrayDeserializer(item["junctions"]),
    targetType: item["targetType"],
    provisioningState: item["provisioningState"],
    state: item["state"],
    nfs3: !item["nfs3"] ? item["nfs3"] : nfs3TargetDeserializer(item["nfs3"]),
    clfs: !item["clfs"] ? item["clfs"] : clfsTargetDeserializer(item["clfs"]),
    unknown: !item["unknown"] ? item["unknown"] : unknownTargetDeserializer(item["unknown"]),
    blobNfs: !item["blobNfs"] ? item["blobNfs"] : blobNfsTargetDeserializer(item["blobNfs"]),
    allocationPercentage: item["allocationPercentage"],
  };
}

export function _amlFilesystemPropertiesSerializer(item: AmlFilesystem): any {
  return {
    storageCapacityTiB: item["storageCapacityTiB"],
    filesystemSubnet: item["filesystemSubnet"],
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : amlFilesystemEncryptionSettingsSerializer(item["encryptionSettings"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : amlFilesystemPropertiesMaintenanceWindowSerializer(item["maintenanceWindow"]),
    hsm: !item["hsm"] ? item["hsm"] : amlFilesystemPropertiesHsmSerializer(item["hsm"]),
    rootSquashSettings: !item["rootSquashSettings"]
      ? item["rootSquashSettings"]
      : amlFilesystemRootSquashSettingsSerializer(item["rootSquashSettings"]),
  };
}

export function _amlFilesystemPropertiesDeserializer(item: any) {
  return {
    storageCapacityTiB: item["storageCapacityTiB"],
    currentStorageCapacityTiB: item["currentStorageCapacityTiB"],
    clusterUuid: item["clusterUuid"],
    health: !item["health"] ? item["health"] : amlFilesystemHealthDeserializer(item["health"]),
    provisioningState: item["provisioningState"],
    filesystemSubnet: item["filesystemSubnet"],
    clientInfo: !item["clientInfo"]
      ? item["clientInfo"]
      : amlFilesystemClientInfoDeserializer(item["clientInfo"]),
    throughputProvisionedMBps: item["throughputProvisionedMBps"],
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : amlFilesystemEncryptionSettingsDeserializer(item["encryptionSettings"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : amlFilesystemPropertiesMaintenanceWindowDeserializer(item["maintenanceWindow"]),
    hsm: !item["hsm"] ? item["hsm"] : amlFilesystemPropertiesHsmDeserializer(item["hsm"]),
    rootSquashSettings: !item["rootSquashSettings"]
      ? item["rootSquashSettings"]
      : amlFilesystemRootSquashSettingsDeserializer(item["rootSquashSettings"]),
  };
}

export function _amlFilesystemUpdatePropertiesSerializer(item: AmlFilesystemUpdate): any {
  return {
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : amlFilesystemEncryptionSettingsSerializer(item["encryptionSettings"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : amlFilesystemUpdatePropertiesMaintenanceWindowSerializer(item["maintenanceWindow"]),
    rootSquashSettings: !item["rootSquashSettings"]
      ? item["rootSquashSettings"]
      : amlFilesystemRootSquashSettingsSerializer(item["rootSquashSettings"]),
  };
}

export function _autoExportJobPropertiesStatusDeserializer(item: any) {
  return {
    state: item["state"],
    statusCode: item["statusCode"],
    statusMessage: item["statusMessage"],
    totalFilesExported: item["totalFilesExported"],
    totalMiBExported: item["totalMiBExported"],
    totalFilesFailed: item["totalFilesFailed"],
    exportIterationCount: item["exportIterationCount"],
    lastSuccessfulIterationCompletionTimeUTC: !item["lastSuccessfulIterationCompletionTimeUTC"]
      ? item["lastSuccessfulIterationCompletionTimeUTC"]
      : new Date(item["lastSuccessfulIterationCompletionTimeUTC"]),
    currentIterationFilesDiscovered: item["currentIterationFilesDiscovered"],
    currentIterationMiBDiscovered: item["currentIterationMiBDiscovered"],
    currentIterationFilesExported: item["currentIterationFilesExported"],
    currentIterationMiBExported: item["currentIterationMiBExported"],
    currentIterationFilesFailed: item["currentIterationFilesFailed"],
    lastStartedTimeUTC: !item["lastStartedTimeUTC"]
      ? item["lastStartedTimeUTC"]
      : new Date(item["lastStartedTimeUTC"]),
    lastCompletionTimeUTC: !item["lastCompletionTimeUTC"]
      ? item["lastCompletionTimeUTC"]
      : new Date(item["lastCompletionTimeUTC"]),
  };
}

export function _autoExportJobPropertiesSerializer(item: AutoExportJob): any {
  return {
    adminStatus: item["adminStatus"],
    autoExportPrefixes: !item["autoExportPrefixes"]
      ? item["autoExportPrefixes"]
      : item["autoExportPrefixes"].map((p: any) => {
          return p;
        }),
  };
}

export function _autoExportJobPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    adminStatus: item["adminStatus"],
    autoExportPrefixes: !item["autoExportPrefixes"]
      ? item["autoExportPrefixes"]
      : item["autoExportPrefixes"].map((p: any) => {
          return p;
        }),
    status: !item["status"]
      ? item["status"]
      : autoExportJobPropertiesStatusDeserializer(item["status"]),
  };
}

export function _autoExportJobUpdatePropertiesSerializer(item: AutoExportJobUpdate): any {
  return { adminStatus: item["adminStatus"] };
}

export function _importJobPropertiesStatusDeserializer(item: any) {
  return {
    state: item["state"],
    statusMessage: item["statusMessage"],
    totalBlobsWalked: item["totalBlobsWalked"],
    blobsWalkedPerSecond: item["blobsWalkedPerSecond"],
    totalBlobsImported: item["totalBlobsImported"],
    importedFiles: item["importedFiles"],
    importedDirectories: item["importedDirectories"],
    importedSymlinks: item["importedSymlinks"],
    preexistingFiles: item["preexistingFiles"],
    preexistingDirectories: item["preexistingDirectories"],
    preexistingSymlinks: item["preexistingSymlinks"],
    blobsImportedPerSecond: item["blobsImportedPerSecond"],
    lastCompletionTime: !item["lastCompletionTime"]
      ? item["lastCompletionTime"]
      : new Date(item["lastCompletionTime"]),
    lastStartedTime: !item["lastStartedTime"]
      ? item["lastStartedTime"]
      : new Date(item["lastStartedTime"]),
    totalErrors: item["totalErrors"],
    totalConflicts: item["totalConflicts"],
  };
}

export function _importJobPropertiesSerializer(item: ImportJob): any {
  return {
    adminStatus: item["adminStatus"],
    importPrefixes: !item["importPrefixes"]
      ? item["importPrefixes"]
      : item["importPrefixes"].map((p: any) => {
          return p;
        }),
    conflictResolutionMode: item["conflictResolutionMode"],
    maximumErrors: item["maximumErrors"],
  };
}

export function _importJobPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    adminStatus: item["adminStatus"],
    importPrefixes: !item["importPrefixes"]
      ? item["importPrefixes"]
      : item["importPrefixes"].map((p: any) => {
          return p;
        }),
    conflictResolutionMode: item["conflictResolutionMode"],
    maximumErrors: item["maximumErrors"],
    status: !item["status"]
      ? item["status"]
      : importJobPropertiesStatusDeserializer(item["status"]),
  };
}

export function _importJobUpdatePropertiesSerializer(item: ImportJobUpdate): any {
  return { adminStatus: item["adminStatus"] };
}

export function _autoImportJobPropertiesStatusDeserializer(item: any) {
  return {
    state: item["state"],
    statusCode: item["statusCode"],
    statusMessage: item["statusMessage"],
    scanStartTime: !item["scanStartTime"] ? item["scanStartTime"] : new Date(item["scanStartTime"]),
    scanEndTime: !item["scanEndTime"] ? item["scanEndTime"] : new Date(item["scanEndTime"]),
    totalBlobsWalked: item["totalBlobsWalked"],
    rateOfBlobWalk: item["rateOfBlobWalk"],
    totalBlobsImported: item["totalBlobsImported"],
    rateOfBlobImport: item["rateOfBlobImport"],
    importedFiles: item["importedFiles"],
    importedDirectories: item["importedDirectories"],
    importedSymlinks: item["importedSymlinks"],
    preexistingFiles: item["preexistingFiles"],
    preexistingDirectories: item["preexistingDirectories"],
    preexistingSymlinks: item["preexistingSymlinks"],
    totalErrors: item["totalErrors"],
    totalConflicts: item["totalConflicts"],
    blobSyncEvents: !item["blobSyncEvents"]
      ? item["blobSyncEvents"]
      : autoImportJobPropertiesStatusBlobSyncEventsDeserializer(item["blobSyncEvents"]),
    lastStartedTimeUTC: !item["lastStartedTimeUTC"]
      ? item["lastStartedTimeUTC"]
      : new Date(item["lastStartedTimeUTC"]),
    lastCompletionTimeUTC: !item["lastCompletionTimeUTC"]
      ? item["lastCompletionTimeUTC"]
      : new Date(item["lastCompletionTimeUTC"]),
  };
}

export function _autoImportJobPropertiesSerializer(item: AutoImportJob): any {
  return {
    adminStatus: item["adminStatus"],
    autoImportPrefixes: !item["autoImportPrefixes"]
      ? item["autoImportPrefixes"]
      : item["autoImportPrefixes"].map((p: any) => {
          return p;
        }),
    conflictResolutionMode: item["conflictResolutionMode"],
    enableDeletions: item["enableDeletions"],
    maximumErrors: item["maximumErrors"],
  };
}

export function _autoImportJobPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    adminStatus: item["adminStatus"],
    autoImportPrefixes: !item["autoImportPrefixes"]
      ? item["autoImportPrefixes"]
      : item["autoImportPrefixes"].map((p: any) => {
          return p;
        }),
    conflictResolutionMode: item["conflictResolutionMode"],
    enableDeletions: item["enableDeletions"],
    maximumErrors: item["maximumErrors"],
    status: !item["status"]
      ? item["status"]
      : autoImportJobPropertiesStatusDeserializer(item["status"]),
  };
}

export function _autoImportJobUpdatePropertiesSerializer(item: AutoImportJobUpdate): any {
  return { adminStatus: item["adminStatus"] };
}

export function _expansionJobPropertiesStatusDeserializer(item: any) {
  return {
    state: item["state"],
    statusCode: item["statusCode"],
    statusMessage: item["statusMessage"],
    percentComplete: item["percentComplete"],
    startTimeUTC: !item["startTimeUTC"] ? item["startTimeUTC"] : new Date(item["startTimeUTC"]),
    completionTimeUTC: !item["completionTimeUTC"]
      ? item["completionTimeUTC"]
      : new Date(item["completionTimeUTC"]),
  };
}

export function _expansionJobPropertiesSerializer(item: ExpansionJob): any {
  return { newStorageCapacityTiB: item["newStorageCapacityTiB"] };
}

export function _expansionJobPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    newStorageCapacityTiB: item["newStorageCapacityTiB"],
    status: !item["status"]
      ? item["status"]
      : expansionJobPropertiesStatusDeserializer(item["status"]),
  };
}

export function _ascOperationPropertiesDeserializer(item: any) {
  return {
    output: !item["output"]
      ? item["output"]
      : Object.fromEntries(Object.entries(item["output"]).map(([k, p]: [string, any]) => [k, p])),
  };
}
