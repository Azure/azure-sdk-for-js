// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Object with a list of the resources that need to be moved and the resource group they should be moved to. */
export interface CsmMoveResourceEnvelope {
  targetResourceGroup?: string;
  resources?: string[];
}

export function csmMoveResourceEnvelopeSerializer(item: CsmMoveResourceEnvelope): any {
  return {
    targetResourceGroup: item["targetResourceGroup"],
    resources: !item["resources"]
      ? item["resources"]
      : item["resources"].map((p: any) => {
          return p;
        }),
  };
}

/** App Service error response. */
export interface DefaultErrorResponse {
  /** Error model. */
  readonly error?: DefaultErrorResponseError;
}

export function defaultErrorResponseDeserializer(item: any): DefaultErrorResponse {
  return {
    error: !item["error"] ? item["error"] : defaultErrorResponseErrorDeserializer(item["error"]),
  };
}

/** Error model. */
export interface DefaultErrorResponseError {
  /** Standardized string to programmatically identify the error. */
  readonly code?: string;
  /** Detailed error description and debugging information. */
  readonly message?: string;
  /** Detailed error description and debugging information. */
  readonly target?: string;
  details?: DefaultErrorResponseErrorDetailsItem[];
  /** More information to debug error. */
  readonly innererror?: string;
}

export function defaultErrorResponseErrorDeserializer(item: any): DefaultErrorResponseError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : defaultErrorResponseErrorDetailsItemArrayDeserializer(item["details"]),
    innererror: item["innererror"],
  };
}

export function defaultErrorResponseErrorDetailsItemArrayDeserializer(
  result: Array<DefaultErrorResponseErrorDetailsItem>,
): any[] {
  return result.map((item) => {
    return defaultErrorResponseErrorDetailsItemDeserializer(item);
  });
}

/** Detailed errors. */
export interface DefaultErrorResponseErrorDetailsItem {
  /** Standardized string to programmatically identify the error. */
  readonly code?: string;
  /** Detailed error description and debugging information. */
  readonly message?: string;
  /** Detailed error description and debugging information. */
  readonly target?: string;
}

export function defaultErrorResponseErrorDetailsItemDeserializer(
  item: any,
): DefaultErrorResponseErrorDetailsItem {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}

/** Resource validation request content. */
export interface ValidateRequest {
  /** Resource name to verify. */
  name: string;
  /** Resource type used for verification. */
  type: ValidateResourceTypes;
  /** Expected location of the resource. */
  location: string;
  /** ARM resource ID of an App Service plan that would host the app. */
  serverFarmId?: string;
  /** Name of the target SKU for the App Service plan. */
  skuName?: string;
  /** <code>true</code> if App Service plan is for Linux workers; otherwise, <code>false</code>. */
  needLinuxWorkers?: boolean;
  /** <code>true</code> if App Service plan is for Spot instances; otherwise, <code>false</code>. */
  isSpot?: boolean;
  /** Target capacity of the App Service plan (number of VMs). */
  capacity?: number;
  /** Name of App Service Environment where app or App Service plan should be created. */
  hostingEnvironment?: string;
  /** <code>true</code> if App Service plan is running as a windows container */
  isXenon?: boolean;
  /** Base URL of the container registry */
  containerRegistryBaseUrl?: string;
  /** Username for to access the container registry */
  containerRegistryUsername?: string;
  /** Password for to access the container registry */
  containerRegistryPassword?: string;
  /** Repository name (image name) */
  containerImageRepository?: string;
  /** Image tag */
  containerImageTag?: string;
  /** Platform (windows or linux) */
  containerImagePlatform?: string;
  /** App Service Environment Properties */
  appServiceEnvironment?: AppServiceEnvironment;
}

export function validateRequestSerializer(item: ValidateRequest): any {
  return {
    name: item["name"],
    type: item["type"],
    location: item["location"],
    properties: _validateRequestPropertiesSerializer(item),
  };
}

/** Resource type used for verification. */
export enum KnownValidateResourceTypes {
  /** ServerFarm */
  ServerFarm = "ServerFarm",
  /** Site */
  Site = "Site",
  /** Microsoft.Web/hostingEnvironments */
  MicrosoftWebHostingEnvironments = "Microsoft.Web/hostingEnvironments",
}

/**
 * Resource type used for verification. \
 * {@link KnownValidateResourceTypes} can be used interchangeably with ValidateResourceTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServerFarm** \
 * **Site** \
 * **Microsoft.Web\/hostingEnvironments**
 */
export type ValidateResourceTypes = string;

/** App properties used for validation. */
export interface ValidateProperties {
  /** ARM resource ID of an App Service plan that would host the app. */
  serverFarmId?: string;
  /** Name of the target SKU for the App Service plan. */
  skuName?: string;
  /** <code>true</code> if App Service plan is for Linux workers; otherwise, <code>false</code>. */
  needLinuxWorkers?: boolean;
  /** <code>true</code> if App Service plan is for Spot instances; otherwise, <code>false</code>. */
  isSpot?: boolean;
  /** Target capacity of the App Service plan (number of VMs). */
  capacity?: number;
  /** Name of App Service Environment where app or App Service plan should be created. */
  hostingEnvironment?: string;
  /** <code>true</code> if App Service plan is running as a windows container */
  isXenon?: boolean;
  /** Base URL of the container registry */
  containerRegistryBaseUrl?: string;
  /** Username for to access the container registry */
  containerRegistryUsername?: string;
  /** Password for to access the container registry */
  containerRegistryPassword?: string;
  /** Repository name (image name) */
  containerImageRepository?: string;
  /** Image tag */
  containerImageTag?: string;
  /** Platform (windows or linux) */
  containerImagePlatform?: string;
  /** App Service Environment Properties */
  appServiceEnvironment?: AppServiceEnvironment;
}

export function validatePropertiesSerializer(item: ValidateProperties): any {
  return {
    serverFarmId: item["serverFarmId"],
    skuName: item["skuName"],
    needLinuxWorkers: item["needLinuxWorkers"],
    isSpot: item["isSpot"],
    capacity: item["capacity"],
    hostingEnvironment: item["hostingEnvironment"],
    isXenon: item["isXenon"],
    containerRegistryBaseUrl: item["containerRegistryBaseUrl"],
    containerRegistryUsername: item["containerRegistryUsername"],
    containerRegistryPassword: item["containerRegistryPassword"],
    containerImageRepository: item["containerImageRepository"],
    containerImageTag: item["containerImageTag"],
    containerImagePlatform: item["containerImagePlatform"],
    appServiceEnvironment: !item["appServiceEnvironment"]
      ? item["appServiceEnvironment"]
      : appServiceEnvironmentSerializer(item["appServiceEnvironment"]),
  };
}

/** Description of an App Service Environment. */
export interface AppServiceEnvironment {
  /** Provisioning state of the App Service Environment. */
  readonly provisioningState?: ProvisioningState;
  /** Current status of the App Service Environment. */
  readonly status?: HostingEnvironmentStatus;
  /** Description of the Virtual Network. */
  virtualNetwork: VirtualNetworkProfile;
  /** Specifies which endpoints to serve internally in the Virtual Network for the App Service Environment. */
  internalLoadBalancingMode?: LoadBalancingMode;
  /** Front-end VM size, e.g. "Medium", "Large". */
  multiSize?: string;
  /** Number of front-end instances. */
  readonly multiRoleCount?: number;
  /** Number of IP SSL addresses reserved for the App Service Environment. */
  ipsslAddressCount?: number;
  /** DNS suffix of the App Service Environment. */
  dnsSuffix?: string;
  /** Maximum number of VMs in the App Service Environment. */
  readonly maximumNumberOfMachines?: number;
  /** Scale factor for front-ends. */
  frontEndScaleFactor?: number;
  /**
   * <code>true</code> if the App Service Environment is suspended; otherwise, <code>false</code>. The environment can be suspended, e.g. when the management endpoint is no longer available
   * (most likely because NSG blocked the incoming traffic).
   */
  readonly suspended?: boolean;
  /** Custom settings for changing the behavior of the App Service Environment. */
  clusterSettings?: NameValuePair[];
  /** User added ip ranges to whitelist on ASE db */
  userWhitelistedIpRanges?: string[];
  /** Flag that displays whether an ASE has linux workers or not */
  readonly hasLinuxWorkers?: boolean;
  /** Upgrade Preference */
  upgradePreference?: UpgradePreference;
  /** Dedicated Host Count */
  dedicatedHostCount?: number;
  /** Whether or not this App Service Environment is zone-redundant. */
  zoneRedundant?: boolean;
  /** Full view of the custom domain suffix configuration for ASEv3. */
  customDnsSuffixConfiguration?: CustomDnsSuffixConfiguration;
  /** Full view of networking configuration for an ASE. */
  networkingConfiguration?: AseV3NetworkingConfiguration;
  /** Whether an upgrade is available for this App Service Environment. */
  readonly upgradeAvailability?: UpgradeAvailability;
}

export function appServiceEnvironmentSerializer(item: AppServiceEnvironment): any {
  return {
    virtualNetwork: virtualNetworkProfileSerializer(item["virtualNetwork"]),
    internalLoadBalancingMode: item["internalLoadBalancingMode"],
    multiSize: item["multiSize"],
    ipsslAddressCount: item["ipsslAddressCount"],
    dnsSuffix: item["dnsSuffix"],
    frontEndScaleFactor: item["frontEndScaleFactor"],
    clusterSettings: !item["clusterSettings"]
      ? item["clusterSettings"]
      : nameValuePairArraySerializer(item["clusterSettings"]),
    userWhitelistedIpRanges: !item["userWhitelistedIpRanges"]
      ? item["userWhitelistedIpRanges"]
      : item["userWhitelistedIpRanges"].map((p: any) => {
          return p;
        }),
    upgradePreference: item["upgradePreference"],
    dedicatedHostCount: item["dedicatedHostCount"],
    zoneRedundant: item["zoneRedundant"],
    customDnsSuffixConfiguration: !item["customDnsSuffixConfiguration"]
      ? item["customDnsSuffixConfiguration"]
      : customDnsSuffixConfigurationSerializer(item["customDnsSuffixConfiguration"]),
    networkingConfiguration: !item["networkingConfiguration"]
      ? item["networkingConfiguration"]
      : aseV3NetworkingConfigurationSerializer(item["networkingConfiguration"]),
  };
}

export function appServiceEnvironmentDeserializer(item: any): AppServiceEnvironment {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    virtualNetwork: virtualNetworkProfileDeserializer(item["virtualNetwork"]),
    internalLoadBalancingMode: item["internalLoadBalancingMode"],
    multiSize: item["multiSize"],
    multiRoleCount: item["multiRoleCount"],
    ipsslAddressCount: item["ipsslAddressCount"],
    dnsSuffix: item["dnsSuffix"],
    maximumNumberOfMachines: item["maximumNumberOfMachines"],
    frontEndScaleFactor: item["frontEndScaleFactor"],
    suspended: item["suspended"],
    clusterSettings: !item["clusterSettings"]
      ? item["clusterSettings"]
      : nameValuePairArrayDeserializer(item["clusterSettings"]),
    userWhitelistedIpRanges: !item["userWhitelistedIpRanges"]
      ? item["userWhitelistedIpRanges"]
      : item["userWhitelistedIpRanges"].map((p: any) => {
          return p;
        }),
    hasLinuxWorkers: item["hasLinuxWorkers"],
    upgradePreference: item["upgradePreference"],
    dedicatedHostCount: item["dedicatedHostCount"],
    zoneRedundant: item["zoneRedundant"],
    customDnsSuffixConfiguration: !item["customDnsSuffixConfiguration"]
      ? item["customDnsSuffixConfiguration"]
      : customDnsSuffixConfigurationDeserializer(item["customDnsSuffixConfiguration"]),
    networkingConfiguration: !item["networkingConfiguration"]
      ? item["networkingConfiguration"]
      : aseV3NetworkingConfigurationDeserializer(item["networkingConfiguration"]),
    upgradeAvailability: item["upgradeAvailability"],
  };
}

/** Provisioning state of the App Service Plan. */
export type ProvisioningState = "Succeeded" | "Failed" | "Canceled" | "InProgress" | "Deleting";
/** Current status of the App Service Environment. */
export type HostingEnvironmentStatus = "Preparing" | "Ready" | "Scaling" | "Deleting";

/** Specification for using a Virtual Network. */
export interface VirtualNetworkProfile {
  /** Resource id of the Virtual Network. */
  id: string;
  /** Name of the Virtual Network (read-only). */
  readonly name?: string;
  /** Resource type of the Virtual Network (read-only). */
  readonly type?: string;
  /** Subnet within the Virtual Network. */
  subnet?: string;
}

export function virtualNetworkProfileSerializer(item: VirtualNetworkProfile): any {
  return { id: item["id"], subnet: item["subnet"] };
}

export function virtualNetworkProfileDeserializer(item: any): VirtualNetworkProfile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    subnet: item["subnet"],
  };
}

/** Specifies which endpoints to serve internally in the Virtual Network for the App Service Environment. */
export enum KnownLoadBalancingMode {
  /** None */
  None = "None",
  /** Web */
  Web = "Web",
  /** Publishing */
  Publishing = "Publishing",
  /** Web, Publishing */
  WebPublishing = "Web, Publishing",
}

/**
 * Specifies which endpoints to serve internally in the Virtual Network for the App Service Environment. \
 * {@link KnownLoadBalancingMode} can be used interchangeably with LoadBalancingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Web** \
 * **Publishing** \
 * **Web, Publishing**
 */
export type LoadBalancingMode = string;

export function nameValuePairArraySerializer(result: Array<NameValuePair>): any[] {
  return result.map((item) => {
    return nameValuePairSerializer(item);
  });
}

export function nameValuePairArrayDeserializer(result: Array<NameValuePair>): any[] {
  return result.map((item) => {
    return nameValuePairDeserializer(item);
  });
}

/** Name value pair. */
export interface NameValuePair {
  /** Pair name. */
  name?: string;
  /** Pair value. */
  value?: string;
}

export function nameValuePairSerializer(item: NameValuePair): any {
  return { name: item["name"], value: item["value"] };
}

export function nameValuePairDeserializer(item: any): NameValuePair {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Upgrade Preference */
export enum KnownUpgradePreference {
  /** No preference on when this App Service Environment will be upgraded */
  None = "None",
  /** This App Service Environment will be upgraded before others in the same region that have Upgrade Preference 'Late' */
  Early = "Early",
  /** This App Service Environment will be upgraded after others in the same region that have Upgrade Preference 'Early' */
  Late = "Late",
  /** ASEv3 only. Once an upgrade is available, this App Service Environment will wait 10 days for the upgrade to be manually initiated. After 10 days the upgrade will begin automatically */
  Manual = "Manual",
}

/**
 * Upgrade Preference \
 * {@link KnownUpgradePreference} can be used interchangeably with UpgradePreference,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No preference on when this App Service Environment will be upgraded \
 * **Early**: This App Service Environment will be upgraded before others in the same region that have Upgrade Preference 'Late' \
 * **Late**: This App Service Environment will be upgraded after others in the same region that have Upgrade Preference 'Early' \
 * **Manual**: ASEv3 only. Once an upgrade is available, this App Service Environment will wait 10 days for the upgrade to be manually initiated. After 10 days the upgrade will begin automatically
 */
export type UpgradePreference = string;

/** Full view of the custom domain suffix configuration for ASEv3. */
export interface CustomDnsSuffixConfiguration extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  readonly provisioningState?: CustomDnsSuffixProvisioningState;
  readonly provisioningDetails?: string;
  /** The default custom domain suffix to use for all sites deployed on the ASE. */
  dnsSuffix?: string;
  /** The URL referencing the Azure Key Vault certificate secret that should be used as the default SSL/TLS certificate for sites with the custom domain suffix. */
  certificateUrl?: string;
  /** The user-assigned identity to use for resolving the key vault certificate reference. If not specified, the system-assigned ASE identity will be used if available. */
  keyVaultReferenceIdentity?: string;
}

export function customDnsSuffixConfigurationSerializer(item: CustomDnsSuffixConfiguration): any {
  return {
    properties: areAllPropsUndefined(item, [
      "dnsSuffix",
      "certificateUrl",
      "keyVaultReferenceIdentity",
    ])
      ? undefined
      : _customDnsSuffixConfigurationPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function customDnsSuffixConfigurationDeserializer(item: any): CustomDnsSuffixConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _customDnsSuffixConfigurationPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** CustomDnsSuffixConfiguration resource specific properties */
export interface CustomDnsSuffixConfigurationProperties {
  readonly provisioningState?: CustomDnsSuffixProvisioningState;
  readonly provisioningDetails?: string;
  /** The default custom domain suffix to use for all sites deployed on the ASE. */
  dnsSuffix?: string;
  /** The URL referencing the Azure Key Vault certificate secret that should be used as the default SSL/TLS certificate for sites with the custom domain suffix. */
  certificateUrl?: string;
  /** The user-assigned identity to use for resolving the key vault certificate reference. If not specified, the system-assigned ASE identity will be used if available. */
  keyVaultReferenceIdentity?: string;
}

export function customDnsSuffixConfigurationPropertiesSerializer(
  item: CustomDnsSuffixConfigurationProperties,
): any {
  return {
    dnsSuffix: item["dnsSuffix"],
    certificateUrl: item["certificateUrl"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
  };
}

export function customDnsSuffixConfigurationPropertiesDeserializer(
  item: any,
): CustomDnsSuffixConfigurationProperties {
  return {
    provisioningState: item["provisioningState"],
    provisioningDetails: item["provisioningDetails"],
    dnsSuffix: item["dnsSuffix"],
    certificateUrl: item["certificateUrl"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
  };
}

/** Type of CustomDnsSuffixProvisioningState */
export type CustomDnsSuffixProvisioningState = "Succeeded" | "Failed" | "Degraded" | "InProgress";

/** Full view of networking configuration for an ASE. */
export interface AseV3NetworkingConfiguration extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  readonly windowsOutboundIpAddresses?: string[];
  readonly linuxOutboundIpAddresses?: string[];
  readonly externalInboundIpAddresses?: string[];
  readonly internalInboundIpAddresses?: string[];
  /** Property to enable and disable new private endpoint connection creation on ASE */
  allowNewPrivateEndpointConnections?: boolean;
  /** Property to enable and disable FTP on ASEV3 */
  ftpEnabled?: boolean;
  /** Property to enable and disable Remote Debug on ASEV3 */
  remoteDebugEnabled?: boolean;
  /** Customer provided Inbound IP Address. Only able to be set on Ase create. */
  inboundIpAddressOverride?: string;
}

export function aseV3NetworkingConfigurationSerializer(item: AseV3NetworkingConfiguration): any {
  return {
    properties: areAllPropsUndefined(item, [
      "allowNewPrivateEndpointConnections",
      "ftpEnabled",
      "remoteDebugEnabled",
      "inboundIpAddressOverride",
    ])
      ? undefined
      : _aseV3NetworkingConfigurationPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function aseV3NetworkingConfigurationDeserializer(item: any): AseV3NetworkingConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _aseV3NetworkingConfigurationPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** AseV3NetworkingConfiguration resource specific properties */
export interface AseV3NetworkingConfigurationProperties {
  readonly windowsOutboundIpAddresses?: string[];
  readonly linuxOutboundIpAddresses?: string[];
  readonly externalInboundIpAddresses?: string[];
  readonly internalInboundIpAddresses?: string[];
  /** Property to enable and disable new private endpoint connection creation on ASE */
  allowNewPrivateEndpointConnections?: boolean;
  /** Property to enable and disable FTP on ASEV3 */
  ftpEnabled?: boolean;
  /** Property to enable and disable Remote Debug on ASEV3 */
  remoteDebugEnabled?: boolean;
  /** Customer provided Inbound IP Address. Only able to be set on Ase create. */
  inboundIpAddressOverride?: string;
}

export function aseV3NetworkingConfigurationPropertiesSerializer(
  item: AseV3NetworkingConfigurationProperties,
): any {
  return {
    allowNewPrivateEndpointConnections: item["allowNewPrivateEndpointConnections"],
    ftpEnabled: item["ftpEnabled"],
    remoteDebugEnabled: item["remoteDebugEnabled"],
    inboundIpAddressOverride: item["inboundIpAddressOverride"],
  };
}

export function aseV3NetworkingConfigurationPropertiesDeserializer(
  item: any,
): AseV3NetworkingConfigurationProperties {
  return {
    windowsOutboundIpAddresses: !item["windowsOutboundIpAddresses"]
      ? item["windowsOutboundIpAddresses"]
      : item["windowsOutboundIpAddresses"].map((p: any) => {
          return p;
        }),
    linuxOutboundIpAddresses: !item["linuxOutboundIpAddresses"]
      ? item["linuxOutboundIpAddresses"]
      : item["linuxOutboundIpAddresses"].map((p: any) => {
          return p;
        }),
    externalInboundIpAddresses: !item["externalInboundIpAddresses"]
      ? item["externalInboundIpAddresses"]
      : item["externalInboundIpAddresses"].map((p: any) => {
          return p;
        }),
    internalInboundIpAddresses: !item["internalInboundIpAddresses"]
      ? item["internalInboundIpAddresses"]
      : item["internalInboundIpAddresses"].map((p: any) => {
          return p;
        }),
    allowNewPrivateEndpointConnections: item["allowNewPrivateEndpointConnections"],
    ftpEnabled: item["ftpEnabled"],
    remoteDebugEnabled: item["remoteDebugEnabled"],
    inboundIpAddressOverride: item["inboundIpAddressOverride"],
  };
}

/** Whether an upgrade is available for this App Service Environment. */
export enum KnownUpgradeAvailability {
  /** No upgrade is currently available for this App Service Environment */
  None = "None",
  /** An upgrade is ready to be manually initiated on this App Service Environment */
  Ready = "Ready",
}

/**
 * Whether an upgrade is available for this App Service Environment. \
 * {@link KnownUpgradeAvailability} can be used interchangeably with UpgradeAvailability,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No upgrade is currently available for this App Service Environment \
 * **Ready**: An upgrade is ready to be manually initiated on this App Service Environment
 */
export type UpgradeAvailability = string;

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

/** Describes the result of resource validation. */
export interface ValidateResponse {
  /** Result of validation. */
  status?: string;
  /** Error details for the case when validation fails. */
  error?: ValidateResponseError;
}

export function validateResponseDeserializer(item: any): ValidateResponse {
  return {
    status: item["status"],
    error: !item["error"] ? item["error"] : validateResponseErrorDeserializer(item["error"]),
  };
}

/** Error details for when validation fails. */
export interface ValidateResponseError {
  /** Validation error code. */
  code?: string;
  /** Validation error message. */
  message?: string;
}

export function validateResponseErrorDeserializer(item: any): ValidateResponseError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/**
 * List of available locations (regions or App Service Environments) for
 * deployment of App Service resources.
 */
export interface DeploymentLocations {
  /** Available regions. */
  locations?: GeoRegion[];
  /** Available App Service Environments with full descriptions of the environments. */
  hostingEnvironments?: AppServiceEnvironment[];
  /** Available App Service Environments with basic information. */
  hostingEnvironmentDeploymentInfos?: HostingEnvironmentDeploymentInfo[];
}

export function deploymentLocationsDeserializer(item: any): DeploymentLocations {
  return {
    locations: !item["locations"]
      ? item["locations"]
      : geoRegionArrayDeserializer(item["locations"]),
    hostingEnvironments: !item["hostingEnvironments"]
      ? item["hostingEnvironments"]
      : appServiceEnvironmentArrayDeserializer(item["hostingEnvironments"]),
    hostingEnvironmentDeploymentInfos: !item["hostingEnvironmentDeploymentInfos"]
      ? item["hostingEnvironmentDeploymentInfos"]
      : hostingEnvironmentDeploymentInfoArrayDeserializer(
          item["hostingEnvironmentDeploymentInfos"],
        ),
  };
}

export function geoRegionArrayDeserializer(result: Array<GeoRegion>): any[] {
  return result.map((item) => {
    return geoRegionDeserializer(item);
  });
}

/** Geographical region. */
export interface GeoRegion extends ProxyOnlyResource {
  /** Region description. */
  readonly description?: string;
  /** Display name for region. */
  readonly displayName?: string;
  /** Display name for region. */
  readonly orgDomain?: string;
}

export function geoRegionDeserializer(item: any): GeoRegion {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _geoRegionPropertiesDeserializer(item["properties"])),
  };
}

/** GeoRegion resource specific properties */
export interface GeoRegionProperties {
  /** Region description. */
  readonly description?: string;
  /** Display name for region. */
  readonly displayName?: string;
  /** Display name for region. */
  readonly orgDomain?: string;
}

export function geoRegionPropertiesDeserializer(item: any): GeoRegionProperties {
  return {
    description: item["description"],
    displayName: item["displayName"],
    orgDomain: item["orgDomain"],
  };
}

export function appServiceEnvironmentArraySerializer(result: Array<AppServiceEnvironment>): any[] {
  return result.map((item) => {
    return appServiceEnvironmentSerializer(item);
  });
}

export function appServiceEnvironmentArrayDeserializer(
  result: Array<AppServiceEnvironment>,
): any[] {
  return result.map((item) => {
    return appServiceEnvironmentDeserializer(item);
  });
}

export function hostingEnvironmentDeploymentInfoArrayDeserializer(
  result: Array<HostingEnvironmentDeploymentInfo>,
): any[] {
  return result.map((item) => {
    return hostingEnvironmentDeploymentInfoDeserializer(item);
  });
}

/** Information needed to create resources on an App Service Environment. */
export interface HostingEnvironmentDeploymentInfo {
  /** Name of the App Service Environment. */
  name?: string;
  /** Location of the App Service Environment. */
  location?: string;
}

export function hostingEnvironmentDeploymentInfoDeserializer(
  item: any,
): HostingEnvironmentDeploymentInfo {
  return {
    name: item["name"],
    location: item["location"],
  };
}

/** Azure proxy only resource. This resource is not tracked by Azure Resource Manager. */
export interface ProxyOnlyResource {
  /** Resource Id. */
  readonly id?: string;
  /** Resource Name. */
  readonly name?: string;
  /** Kind of resource. */
  kind?: string;
  /** Resource type. */
  readonly type?: string;
}

export function proxyOnlyResourceSerializer(item: ProxyOnlyResource): any {
  return { kind: item["kind"] };
}

export function proxyOnlyResourceDeserializer(item: any): ProxyOnlyResource {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
  };
}

/** Collection of ASE regions. */
export interface _AseRegionCollection {
  /** The AseRegion items on this page */
  value: AseRegion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _aseRegionCollectionDeserializer(item: any): _AseRegionCollection {
  return {
    value: aseRegionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function aseRegionArrayDeserializer(result: Array<AseRegion>): any[] {
  return result.map((item) => {
    return aseRegionDeserializer(item);
  });
}

/** ASE region. */
export interface AseRegion extends ProxyOnlyResource {
  /** Display name for region. */
  readonly displayName?: string;
  /** Is region standard. */
  readonly standard?: boolean;
  /** Dedicated host enabled. */
  readonly dedicatedHost?: boolean;
  /** Zone redundant deployment enabled. */
  readonly zoneRedundant?: boolean;
  /** Available Skus in region. */
  availableSku?: string[];
  /** Available OSs in region. */
  availableOS?: string[];
}

export function aseRegionDeserializer(item: any): AseRegion {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _aseRegionPropertiesDeserializer(item["properties"])),
  };
}

/** ASE region resource specific properties */
export interface AseRegionProperties {
  /** Display name for region. */
  readonly displayName?: string;
  /** Is region standard. */
  readonly standard?: boolean;
  /** Dedicated host enabled. */
  readonly dedicatedHost?: boolean;
  /** Zone redundant deployment enabled. */
  readonly zoneRedundant?: boolean;
  /** Available Skus in region. */
  availableSku?: string[];
  /** Available OSs in region. */
  availableOS?: string[];
}

export function aseRegionPropertiesDeserializer(item: any): AseRegionProperties {
  return {
    displayName: item["displayName"],
    standard: item["standard"],
    dedicatedHost: item["dedicatedHost"],
    zoneRedundant: item["zoneRedundant"],
    availableSku: !item["availableSku"]
      ? item["availableSku"]
      : item["availableSku"].map((p: any) => {
          return p;
        }),
    availableOS: !item["availableOS"]
      ? item["availableOS"]
      : item["availableOS"].map((p: any) => {
          return p;
        }),
  };
}

/** Collection of Billing Meters */
export interface _BillingMeterCollection {
  /** The BillingMeter items on this page */
  value: BillingMeter[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _billingMeterCollectionDeserializer(item: any): _BillingMeterCollection {
  return {
    value: billingMeterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function billingMeterArrayDeserializer(result: Array<BillingMeter>): any[] {
  return result.map((item) => {
    return billingMeterDeserializer(item);
  });
}

/** App Service billing entity that contains information about meter which the Azure billing system utilizes to charge users for services. */
export interface BillingMeter extends ProxyOnlyResource {
  /** Meter GUID onboarded in Commerce */
  meterId?: string;
  /** Azure Location of billable resource */
  billingLocation?: string;
  /** Short Name from App Service Azure pricing Page */
  shortName?: string;
  /** Friendly name of the meter */
  friendlyName?: string;
  /** App Service ResourceType meter used for */
  resourceType?: string;
  /** App Service OS type meter used for */
  osType?: string;
  /** Meter Multiplier */
  multiplier?: number;
}

export function billingMeterDeserializer(item: any): BillingMeter {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _billingMeterPropertiesDeserializer(item["properties"])),
  };
}

/** BillingMeter resource specific properties */
export interface BillingMeterProperties {
  /** Meter GUID onboarded in Commerce */
  meterId?: string;
  /** Azure Location of billable resource */
  billingLocation?: string;
  /** Short Name from App Service Azure pricing Page */
  shortName?: string;
  /** Friendly name of the meter */
  friendlyName?: string;
  /** App Service ResourceType meter used for */
  resourceType?: string;
  /** App Service OS type meter used for */
  osType?: string;
  /** Meter Multiplier */
  multiplier?: number;
}

export function billingMeterPropertiesDeserializer(item: any): BillingMeterProperties {
  return {
    meterId: item["meterId"],
    billingLocation: item["billingLocation"],
    shortName: item["shortName"],
    friendlyName: item["friendlyName"],
    resourceType: item["resourceType"],
    osType: item["osType"],
    multiplier: item["multiplier"],
  };
}

/** Resource name availability request content. */
export interface ResourceNameAvailabilityRequest {
  /** Resource name to verify. */
  name: string;
  /** Resource type used for verification. */
  type: CheckNameResourceTypes;
  /** Is fully qualified domain name. */
  isFqdn?: boolean;
  /** Azure Resource Manager ID of the customer's selected Container Apps Environment on which to host the Function app. This must be of the form /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/managedEnvironments/{managedEnvironmentName} */
  environmentId?: string;
}

export function resourceNameAvailabilityRequestSerializer(
  item: ResourceNameAvailabilityRequest,
): any {
  return {
    name: item["name"],
    type: item["type"],
    isFqdn: item["isFqdn"],
    environmentId: item["environmentId"],
  };
}

/** Resource type used for verification. */
export enum KnownCheckNameResourceTypes {
  /** Site */
  Site = "Site",
  /** Slot */
  Slot = "Slot",
  /** HostingEnvironment */
  HostingEnvironment = "HostingEnvironment",
  /** PublishingUser */
  PublishingUser = "PublishingUser",
  /** Microsoft.Web/sites */
  MicrosoftWebSites = "Microsoft.Web/sites",
  /** Microsoft.Web/sites/slots */
  MicrosoftWebSitesSlots = "Microsoft.Web/sites/slots",
  /** Microsoft.Web/hostingEnvironments */
  MicrosoftWebHostingEnvironments = "Microsoft.Web/hostingEnvironments",
  /** Microsoft.Web/publishingUsers */
  MicrosoftWebPublishingUsers = "Microsoft.Web/publishingUsers",
}

/**
 * Resource type used for verification. \
 * {@link KnownCheckNameResourceTypes} can be used interchangeably with CheckNameResourceTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Site** \
 * **Slot** \
 * **HostingEnvironment** \
 * **PublishingUser** \
 * **Microsoft.Web\/sites** \
 * **Microsoft.Web\/sites\/slots** \
 * **Microsoft.Web\/hostingEnvironments** \
 * **Microsoft.Web\/publishingUsers**
 */
export type CheckNameResourceTypes = string;

/** Information regarding availability of a resource name. */
export interface ResourceNameAvailability {
  /** <code>true</code> indicates name is valid and available. <code>false</code> indicates the name is invalid, unavailable, or both. */
  nameAvailable?: boolean;
  /** <code>Invalid</code> indicates the name provided does not match Azure App Service naming requirements. <code>AlreadyExists</code> indicates that the name is already in use and is therefore unavailable. */
  reason?: InAvailabilityReasonType;
  /** If reason == invalid, provide the user with the reason why the given name is invalid, and provide the resource naming requirements so that the user can select a valid name. If reason == AlreadyExists, explain that resource name is already in use, and direct them to select a different name. */
  message?: string;
}

export function resourceNameAvailabilityDeserializer(item: any): ResourceNameAvailability {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** <code>Invalid</code> indicates the name provided does not match Azure App Service naming requirements. <code>AlreadyExists</code> indicates that the name is already in use and is therefore unavailable. */
export enum KnownInAvailabilityReasonType {
  /** Invalid */
  Invalid = "Invalid",
  /** AlreadyExists */
  AlreadyExists = "AlreadyExists",
}

/**
 * <code>Invalid</code> indicates the name provided does not match Azure App Service naming requirements. <code>AlreadyExists</code> indicates that the name is already in use and is therefore unavailable. \
 * {@link KnownInAvailabilityReasonType} can be used interchangeably with InAvailabilityReasonType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **AlreadyExists**
 */
export type InAvailabilityReasonType = string;

/** Collection of custom hostname sites */
export interface _CustomHostnameSitesCollection {
  /** The CustomHostnameSites items on this page */
  value: CustomHostnameSites[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _customHostnameSitesCollectionDeserializer(
  item: any,
): _CustomHostnameSitesCollection {
  return {
    value: customHostnameSitesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function customHostnameSitesArrayDeserializer(result: Array<CustomHostnameSites>): any[] {
  return result.map((item) => {
    return customHostnameSitesDeserializer(item);
  });
}

/** A hostname and its assigned sites */
export interface CustomHostnameSites extends ProxyOnlyResource {
  customHostname?: string;
  region?: string;
  siteResourceIds?: Identifier[];
}

export function customHostnameSitesDeserializer(item: any): CustomHostnameSites {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _customHostnameSitesPropertiesDeserializer(item["properties"])),
  };
}

/** CustomHostnameSites resource specific properties */
export interface CustomHostnameSitesProperties {
  customHostname?: string;
  region?: string;
  siteResourceIds?: Identifier[];
}

export function customHostnameSitesPropertiesDeserializer(
  item: any,
): CustomHostnameSitesProperties {
  return {
    customHostname: item["customHostname"],
    region: item["region"],
    siteResourceIds: !item["siteResourceIds"]
      ? item["siteResourceIds"]
      : identifierArrayDeserializer(item["siteResourceIds"]),
  };
}

export function identifierArraySerializer(result: Array<Identifier>): any[] {
  return result.map((item) => {
    return identifierSerializer(item);
  });
}

export function identifierArrayDeserializer(result: Array<Identifier>): any[] {
  return result.map((item) => {
    return identifierDeserializer(item);
  });
}

/** A domain specific resource identifier. */
export interface Identifier extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** String representation of the identity. */
  value?: string;
}

export function identifierSerializer(item: Identifier): any {
  return {
    properties: areAllPropsUndefined(item, ["value"])
      ? undefined
      : _identifierPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function identifierDeserializer(item: any): Identifier {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _identifierPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** Identifier resource specific properties */
export interface IdentifierProperties {
  /** String representation of the identity. */
  value?: string;
}

export function identifierPropertiesSerializer(item: IdentifierProperties): any {
  return { id: item["value"] };
}

export function identifierPropertiesDeserializer(item: any): IdentifierProperties {
  return {
    value: item["id"],
  };
}

/** Collection of geographical regions. */
export interface _GeoRegionCollection {
  /** The GeoRegion items on this page */
  value: GeoRegion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _geoRegionCollectionDeserializer(item: any): _GeoRegionCollection {
  return {
    value: geoRegionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Identifies an object. */
export interface NameIdentifier {
  /** Name of the object. */
  name?: string;
}

export function nameIdentifierSerializer(item: NameIdentifier): any {
  return { name: item["name"] };
}

/** Collection of identifiers. */
export interface _IdentifierCollection {
  /** The Identifier items on this page */
  value: Identifier[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _identifierCollectionDeserializer(item: any): _IdentifierCollection {
  return {
    value: identifierArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** model interface DnlResourceNameAvailabilityRequest */
export interface DnlResourceNameAvailabilityRequest {
  /** Resource group name */
  resourceGroupName?: string;
  /**
   * Indicates the endpoint name reuse scope.The default value is TenantReuse.
   * Supported values are TenantReuse, SubscriptionReuse, ResourceGroupReuse, NoReuse
   */
  autoGeneratedDomainNameLabelScope?: string;
  /** Resource name to verify. */
  name: string;
  /** Resource type used for verification. */
  type: CheckNameResourceTypes;
}

export function dnlResourceNameAvailabilityRequestSerializer(
  item: DnlResourceNameAvailabilityRequest,
): any {
  return {
    resourceGroupName: item["resourceGroupName"],
    autoGeneratedDomainNameLabelScope: item["autoGeneratedDomainNameLabelScope"],
    name: item["name"],
    type: item["type"],
  };
}

/** Information regarding availability of a resource name for DNL apps with regionalized default hostnames. */
export interface DnlResourceNameAvailability {
  hostName?: string;
  /** <code>true</code> indicates name is valid and available. <code>false</code> indicates the name is invalid, unavailable, or both. */
  nameAvailable?: boolean;
  /** <code>Invalid</code> indicates the name provided does not match Azure App Service naming requirements. <code>AlreadyExists</code> indicates that the name is already in use and is therefore unavailable. */
  reason?: InAvailabilityReasonType;
  /** If reason == invalid, provide the user with the reason why the given name is invalid, and provide the resource naming requirements so that the user can select a valid name. If reason == AlreadyExists, explain that resource name is already in use, and direct them to select a different name. */
  message?: string;
}

export function dnlResourceNameAvailabilityDeserializer(item: any): DnlResourceNameAvailability {
  return {
    hostName: item["hostName"],
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Collection of premier add-on offers. */
export interface _PremierAddOnOfferCollection {
  /** The PremierAddOnOffer items on this page */
  value: PremierAddOnOffer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _premierAddOnOfferCollectionDeserializer(item: any): _PremierAddOnOfferCollection {
  return {
    value: premierAddOnOfferArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function premierAddOnOfferArrayDeserializer(result: Array<PremierAddOnOffer>): any[] {
  return result.map((item) => {
    return premierAddOnOfferDeserializer(item);
  });
}

/** Premier add-on offer. */
export interface PremierAddOnOffer extends ProxyOnlyResource {
  /** Premier add on SKU. */
  sku?: string;
  /** Premier add on offer Product. */
  product?: string;
  /** Premier add on offer Vendor. */
  vendor?: string;
  /** <code>true</code> if promotion code is required; otherwise, <code>false</code>. */
  promoCodeRequired?: boolean;
  /** Premier add on offer Quota. */
  quota?: number;
  /** App Service plans this offer is restricted to. */
  webHostingPlanRestrictions?: AppServicePlanRestrictions;
  /** Privacy policy URL. */
  privacyPolicyUrl?: string;
  /** Legal terms URL. */
  legalTermsUrl?: string;
  /** Marketplace publisher. */
  marketplacePublisher?: string;
  /** Marketplace offer. */
  marketplaceOffer?: string;
}

export function premierAddOnOfferDeserializer(item: any): PremierAddOnOffer {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _premierAddOnOfferPropertiesDeserializer(item["properties"])),
  };
}

/** PremierAddOnOffer resource specific properties */
export interface PremierAddOnOfferProperties {
  /** Premier add on SKU. */
  sku?: string;
  /** Premier add on offer Product. */
  product?: string;
  /** Premier add on offer Vendor. */
  vendor?: string;
  /** <code>true</code> if promotion code is required; otherwise, <code>false</code>. */
  promoCodeRequired?: boolean;
  /** Premier add on offer Quota. */
  quota?: number;
  /** App Service plans this offer is restricted to. */
  webHostingPlanRestrictions?: AppServicePlanRestrictions;
  /** Privacy policy URL. */
  privacyPolicyUrl?: string;
  /** Legal terms URL. */
  legalTermsUrl?: string;
  /** Marketplace publisher. */
  marketplacePublisher?: string;
  /** Marketplace offer. */
  marketplaceOffer?: string;
}

export function premierAddOnOfferPropertiesDeserializer(item: any): PremierAddOnOfferProperties {
  return {
    sku: item["sku"],
    product: item["product"],
    vendor: item["vendor"],
    promoCodeRequired: item["promoCodeRequired"],
    quota: item["quota"],
    webHostingPlanRestrictions: item["webHostingPlanRestrictions"],
    privacyPolicyUrl: item["privacyPolicyUrl"],
    legalTermsUrl: item["legalTermsUrl"],
    marketplacePublisher: item["marketplacePublisher"],
    marketplaceOffer: item["marketplaceOffer"],
  };
}

/** App Service plans this offer is restricted to. */
export type AppServicePlanRestrictions =
  | "None"
  | "Free"
  | "Shared"
  | "Basic"
  | "Standard"
  | "Premium";

/** Collection of SKU information. */
export interface SkuInfos {
  /** Resource type that this SKU applies to. */
  resourceType?: string;
  /** List of SKUs the subscription is able to use. */
  skus?: GlobalCsmSkuDescription[];
}

export function skuInfosDeserializer(item: any): SkuInfos {
  return {
    resourceType: item["resourceType"],
    skus: !item["skus"] ? item["skus"] : globalCsmSkuDescriptionArrayDeserializer(item["skus"]),
  };
}

export function globalCsmSkuDescriptionArrayDeserializer(
  result: Array<GlobalCsmSkuDescription>,
): any[] {
  return result.map((item) => {
    return globalCsmSkuDescriptionDeserializer(item);
  });
}

/** A Global SKU Description. */
export interface GlobalCsmSkuDescription {
  /** Name of the resource SKU. */
  name?: string;
  /** Service Tier of the resource SKU. */
  tier?: string;
  /** Size specifier of the resource SKU. */
  size?: string;
  /** Family code of the resource SKU. */
  family?: string;
  /** Min, max, and default scale values of the SKU. */
  capacity?: SkuCapacity;
  /** Locations of the SKU. */
  locations?: string[];
  /** Capabilities of the SKU, e.g., is traffic manager enabled? */
  capabilities?: Capability[];
}

export function globalCsmSkuDescriptionDeserializer(item: any): GlobalCsmSkuDescription {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: !item["capacity"] ? item["capacity"] : skuCapacityDeserializer(item["capacity"]),
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : capabilityArrayDeserializer(item["capabilities"]),
  };
}

/** Description of the App Service plan scale options. */
export interface SkuCapacity {
  /** Minimum number of workers for this App Service plan SKU. */
  minimum?: number;
  /** Maximum number of workers for this App Service plan SKU. */
  maximum?: number;
  /** Maximum number of Elastic workers for this App Service plan SKU. */
  elasticMaximum?: number;
  /** Default number of workers for this App Service plan SKU. */
  default?: number;
  /** Available scale configurations for an App Service plan. */
  scaleType?: string;
}

export function skuCapacitySerializer(item: SkuCapacity): any {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    elasticMaximum: item["elasticMaximum"],
    default: item["default"],
    scaleType: item["scaleType"],
  };
}

export function skuCapacityDeserializer(item: any): SkuCapacity {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    elasticMaximum: item["elasticMaximum"],
    default: item["default"],
    scaleType: item["scaleType"],
  };
}

export function capabilityArraySerializer(result: Array<Capability>): any[] {
  return result.map((item) => {
    return capabilitySerializer(item);
  });
}

export function capabilityArrayDeserializer(result: Array<Capability>): any[] {
  return result.map((item) => {
    return capabilityDeserializer(item);
  });
}

/** Describes the capabilities/features allowed for a specific SKU. */
export interface Capability {
  /** Name of the SKU capability. */
  name?: string;
  /** Value of the SKU capability. */
  value?: string;
  /** Reason of the SKU capability. */
  reason?: string;
}

export function capabilitySerializer(item: Capability): any {
  return { name: item["name"], value: item["value"], reason: item["reason"] };
}

export function capabilityDeserializer(item: any): Capability {
  return {
    name: item["name"],
    value: item["value"],
    reason: item["reason"],
  };
}

/** The required set of inputs to validate a VNET */
export interface VnetParameters extends ProxyOnlyResource {
  /** The Resource Group of the VNET to be validated */
  vnetResourceGroup?: string;
  /** The name of the VNET to be validated */
  vnetName?: string;
  /** The subnet name to be validated */
  vnetSubnetName?: string;
  /** The ARM Resource ID of the subnet to validate */
  subnetResourceId?: string;
}

export function vnetParametersSerializer(item: VnetParameters): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "vnetResourceGroup",
      "vnetName",
      "vnetSubnetName",
      "subnetResourceId",
    ])
      ? undefined
      : _vnetParametersPropertiesSerializer(item),
  };
}

/** VnetParameters resource specific properties */
export interface VnetParametersProperties {
  /** The Resource Group of the VNET to be validated */
  vnetResourceGroup?: string;
  /** The name of the VNET to be validated */
  vnetName?: string;
  /** The subnet name to be validated */
  vnetSubnetName?: string;
  /** The ARM Resource ID of the subnet to validate */
  subnetResourceId?: string;
}

export function vnetParametersPropertiesSerializer(item: VnetParametersProperties): any {
  return {
    vnetResourceGroup: item["vnetResourceGroup"],
    vnetName: item["vnetName"],
    vnetSubnetName: item["vnetSubnetName"],
    subnetResourceId: item["subnetResourceId"],
  };
}

/** A class that describes the reason for a validation failure. */
export interface VnetValidationFailureDetails extends ProxyOnlyResource {
  /** Text describing the validation outcome. */
  message?: string;
  /** A flag describing whether or not validation failed. */
  failed?: boolean;
  /** A list of tests that failed in the validation. */
  failedTests?: VnetValidationTestFailure[];
  /** A list of warnings generated during validation. */
  warnings?: VnetValidationTestFailure[];
}

export function vnetValidationFailureDetailsDeserializer(item: any): VnetValidationFailureDetails {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _vnetValidationFailureDetailsPropertiesDeserializer(item["properties"])),
  };
}

/** VnetValidationFailureDetails resource specific properties */
export interface VnetValidationFailureDetailsProperties {
  /** Text describing the validation outcome. */
  message?: string;
  /** A flag describing whether or not validation failed. */
  failed?: boolean;
  /** A list of tests that failed in the validation. */
  failedTests?: VnetValidationTestFailure[];
  /** A list of warnings generated during validation. */
  warnings?: VnetValidationTestFailure[];
}

export function vnetValidationFailureDetailsPropertiesDeserializer(
  item: any,
): VnetValidationFailureDetailsProperties {
  return {
    message: item["message"],
    failed: item["failed"],
    failedTests: !item["failedTests"]
      ? item["failedTests"]
      : vnetValidationTestFailureArrayDeserializer(item["failedTests"]),
    warnings: !item["warnings"]
      ? item["warnings"]
      : vnetValidationTestFailureArrayDeserializer(item["warnings"]),
  };
}

export function vnetValidationTestFailureArrayDeserializer(
  result: Array<VnetValidationTestFailure>,
): any[] {
  return result.map((item) => {
    return vnetValidationTestFailureDeserializer(item);
  });
}

/** A class that describes a test that failed during NSG and UDR validation. */
export interface VnetValidationTestFailure extends ProxyOnlyResource {
  /** The name of the test that failed. */
  testName?: string;
  /** The details of what caused the failure, e.g. the blocking rule name, etc. */
  details?: string;
}

export function vnetValidationTestFailureDeserializer(item: any): VnetValidationTestFailure {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _vnetValidationTestFailurePropertiesDeserializer(item["properties"])),
  };
}

/** VnetValidationTestFailure resource specific properties */
export interface VnetValidationTestFailureProperties {
  /** The name of the test that failed. */
  testName?: string;
  /** The details of what caused the failure, e.g. the blocking rule name, etc. */
  details?: string;
}

export function vnetValidationTestFailurePropertiesDeserializer(
  item: any,
): VnetValidationTestFailureProperties {
  return {
    testName: item["testName"],
    details: item["details"],
  };
}

/** User credentials used for publishing activity. */
export interface User extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Username used for publishing. */
  publishingUserName?: string;
  /** Password used for publishing. */
  publishingPassword?: string;
  /** Password hash used for publishing. */
  publishingPasswordHash?: string;
  /** Password hash salt used for publishing. */
  publishingPasswordHashSalt?: string;
  /** Url of SCM site. */
  scmUri?: string;
}

export function userSerializer(item: User): any {
  return {
    properties: areAllPropsUndefined(item, [
      "publishingUserName",
      "publishingPassword",
      "publishingPasswordHash",
      "publishingPasswordHashSalt",
      "scmUri",
    ])
      ? undefined
      : _userPropertiesSerializer(item),
    kind: item["kind"],
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
    ...(!item["properties"] ? item["properties"] : _userPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** User resource specific properties */
export interface UserProperties {
  /** Username used for publishing. */
  publishingUserName: string;
  /** Password used for publishing. */
  publishingPassword?: string;
  /** Password hash used for publishing. */
  publishingPasswordHash?: string;
  /** Password hash salt used for publishing. */
  publishingPasswordHashSalt?: string;
  /** Url of SCM site. */
  scmUri?: string;
}

export function userPropertiesSerializer(item: UserProperties): any {
  return {
    publishingUserName: item["publishingUserName"],
    publishingPassword: item["publishingPassword"],
    publishingPasswordHash: item["publishingPasswordHash"],
    publishingPasswordHashSalt: item["publishingPasswordHashSalt"],
    scmUri: item["scmUri"],
  };
}

export function userPropertiesDeserializer(item: any): UserProperties {
  return {
    publishingUserName: item["publishingUserName"],
    publishingPassword: item["publishingPassword"],
    publishingPasswordHash: item["publishingPasswordHash"],
    publishingPasswordHashSalt: item["publishingPasswordHashSalt"],
    scmUri: item["scmUri"],
  };
}

/** The source control OAuth token. */
export interface SourceControl extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** OAuth access token. */
  token?: string;
  /** OAuth access token secret. */
  tokenSecret?: string;
  /** OAuth refresh token. */
  refreshToken?: string;
  /** OAuth token expiration. */
  expirationTime?: Date;
}

export function sourceControlSerializer(item: SourceControl): any {
  return {
    properties: areAllPropsUndefined(item, [
      "token",
      "tokenSecret",
      "refreshToken",
      "expirationTime",
    ])
      ? undefined
      : _sourceControlPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function sourceControlDeserializer(item: any): SourceControl {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _sourceControlPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** SourceControl resource specific properties */
export interface SourceControlProperties {
  /** OAuth access token. */
  token?: string;
  /** OAuth access token secret. */
  tokenSecret?: string;
  /** OAuth refresh token. */
  refreshToken?: string;
  /** OAuth token expiration. */
  expirationTime?: Date;
}

export function sourceControlPropertiesSerializer(item: SourceControlProperties): any {
  return {
    token: item["token"],
    tokenSecret: item["tokenSecret"],
    refreshToken: item["refreshToken"],
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : item["expirationTime"].toISOString(),
  };
}

export function sourceControlPropertiesDeserializer(item: any): SourceControlProperties {
  return {
    token: item["token"],
    tokenSecret: item["tokenSecret"],
    refreshToken: item["refreshToken"],
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
  };
}

/** Collection of source controls. */
export interface _SourceControlCollection {
  /** The SourceControl items on this page */
  value: SourceControl[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sourceControlCollectionDeserializer(item: any): _SourceControlCollection {
  return {
    value: sourceControlArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sourceControlArraySerializer(result: Array<SourceControl>): any[] {
  return result.map((item) => {
    return sourceControlSerializer(item);
  });
}

export function sourceControlArrayDeserializer(result: Array<SourceControl>): any[] {
  return result.map((item) => {
    return sourceControlDeserializer(item);
  });
}

/** Worker pool of an App Service Environment ARM resource. */
export interface WorkerPoolResource extends ProxyResource {
  /** Description of a SKU for a scalable resource. */
  sku?: SkuDescription;
  /** Kind of resource. If the resource is an app, you can refer to https://github.com/Azure/app-service-linux-docs/blob/master/Things_You_Should_Know/kind_property.md#app-service-resource-kind-reference for details supported values for kind. */
  kind?: string;
  /** Worker size ID for referencing this worker pool. */
  workerSizeId?: number;
  /** Shared or dedicated app hosting. */
  computeMode?: ComputeModeOptions;
  /** VM size of the worker pool instances. */
  workerSize?: string;
  /** Number of instances in the worker pool. */
  workerCount?: number;
  /** Names of all instances in the worker pool (read only). */
  readonly instanceNames?: string[];
}

export function workerPoolResourceSerializer(item: WorkerPoolResource): any {
  return {
    properties: areAllPropsUndefined(item, [
      "workerSizeId",
      "computeMode",
      "workerSize",
      "workerCount",
    ])
      ? undefined
      : _workerPoolResourcePropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : skuDescriptionSerializer(item["sku"]),
    kind: item["kind"],
  };
}

export function workerPoolResourceDeserializer(item: any): WorkerPoolResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _workerPoolResourcePropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDescriptionDeserializer(item["sku"]),
    kind: item["kind"],
  };
}

/** Worker pool of an App Service Environment. */
export interface WorkerPool {
  /** Worker size ID for referencing this worker pool. */
  workerSizeId?: number;
  /** Shared or dedicated app hosting. */
  computeMode?: ComputeModeOptions;
  /** VM size of the worker pool instances. */
  workerSize?: string;
  /** Number of instances in the worker pool. */
  workerCount?: number;
  /** Names of all instances in the worker pool (read only). */
  readonly instanceNames?: string[];
}

export function workerPoolSerializer(item: WorkerPool): any {
  return {
    workerSizeId: item["workerSizeId"],
    computeMode: item["computeMode"],
    workerSize: item["workerSize"],
    workerCount: item["workerCount"],
  };
}

export function workerPoolDeserializer(item: any): WorkerPool {
  return {
    workerSizeId: item["workerSizeId"],
    computeMode: item["computeMode"],
    workerSize: item["workerSize"],
    workerCount: item["workerCount"],
    instanceNames: !item["instanceNames"]
      ? item["instanceNames"]
      : item["instanceNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Shared/dedicated workers. */
export type ComputeModeOptions = "Shared" | "Dedicated" | "Dynamic";

/** Description of a SKU for a scalable resource. */
export interface SkuDescription {
  /** Name of the resource SKU. */
  name?: string;
  /** Service tier of the resource SKU. */
  tier?: string;
  /** Size specifier of the resource SKU. */
  size?: string;
  /** Family code of the resource SKU. */
  family?: string;
  /** Current number of instances assigned to the resource. */
  capacity?: number;
  /** Min, max, and default scale values of the SKU. */
  skuCapacity?: SkuCapacity;
  /** Locations of the SKU. */
  locations?: string[];
  /** Capabilities of the SKU, e.g., is traffic manager enabled? */
  capabilities?: Capability[];
}

export function skuDescriptionSerializer(item: SkuDescription): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
    skuCapacity: !item["skuCapacity"]
      ? item["skuCapacity"]
      : skuCapacitySerializer(item["skuCapacity"]),
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : capabilityArraySerializer(item["capabilities"]),
  };
}

export function skuDescriptionDeserializer(item: any): SkuDescription {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
    skuCapacity: !item["skuCapacity"]
      ? item["skuCapacity"]
      : skuCapacityDeserializer(item["skuCapacity"]),
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : capabilityArrayDeserializer(item["capabilities"]),
  };
}

/** Collection of worker pools. */
export interface _WorkerPoolCollection {
  /** The WorkerPoolResource items on this page */
  value: WorkerPoolResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workerPoolCollectionDeserializer(item: any): _WorkerPoolCollection {
  return {
    value: workerPoolResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workerPoolResourceArraySerializer(result: Array<WorkerPoolResource>): any[] {
  return result.map((item) => {
    return workerPoolResourceSerializer(item);
  });
}

export function workerPoolResourceArrayDeserializer(result: Array<WorkerPoolResource>): any[] {
  return result.map((item) => {
    return workerPoolResourceDeserializer(item);
  });
}

/** Collection of metric definitions. */
export interface _ResourceMetricDefinitionCollection {
  /** The ResourceMetricDefinition items on this page */
  value: ResourceMetricDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resourceMetricDefinitionCollectionDeserializer(
  item: any,
): _ResourceMetricDefinitionCollection {
  return {
    value: resourceMetricDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceMetricDefinitionArrayDeserializer(
  result: Array<ResourceMetricDefinition>,
): any[] {
  return result.map((item) => {
    return resourceMetricDefinitionDeserializer(item);
  });
}

/** Metadata for the metrics. */
export interface ResourceMetricDefinition extends ProxyOnlyResource {
  /** Unit of the metric. */
  readonly unit?: string;
  /** Primary aggregation type. */
  readonly primaryAggregationType?: string;
  /** List of time grains supported for the metric together with retention period. */
  readonly metricAvailabilities?: ResourceMetricAvailability[];
  /** Resource URI. */
  readonly resourceUri?: string;
  /** Resource metric definition properties. */
  readonly properties?: Record<string, string>;
}

export function resourceMetricDefinitionDeserializer(item: any): ResourceMetricDefinition {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _resourceMetricDefinitionPropertiesDeserializer(item["properties"])),
  };
}

/** ResourceMetricDefinition resource specific properties */
export interface ResourceMetricDefinitionProperties {
  /** Unit of the metric. */
  readonly unit?: string;
  /** Primary aggregation type. */
  readonly primaryAggregationType?: string;
  /** List of time grains supported for the metric together with retention period. */
  readonly metricAvailabilities?: ResourceMetricAvailability[];
  /** Resource URI. */
  readonly resourceUri?: string;
  /** Resource metric definition properties. */
  readonly properties?: Record<string, string>;
}

export function resourceMetricDefinitionPropertiesDeserializer(
  item: any,
): ResourceMetricDefinitionProperties {
  return {
    unit: item["unit"],
    primaryAggregationType: item["primaryAggregationType"],
    metricAvailabilities: !item["metricAvailabilities"]
      ? item["metricAvailabilities"]
      : resourceMetricAvailabilityArrayDeserializer(item["metricAvailabilities"]),
    resourceUri: item["resourceUri"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function resourceMetricAvailabilityArrayDeserializer(
  result: Array<ResourceMetricAvailability>,
): any[] {
  return result.map((item) => {
    return resourceMetricAvailabilityDeserializer(item);
  });
}

/** Metrics availability and retention. */
export interface ResourceMetricAvailability {
  /** Time grain . */
  readonly timeGrain?: string;
  /** Retention period for the current time grain. */
  readonly retention?: string;
}

export function resourceMetricAvailabilityDeserializer(item: any): ResourceMetricAvailability {
  return {
    timeGrain: item["timeGrain"],
    retention: item["retention"],
  };
}

/** Paged collection of SkuInfo items */
export interface _SkuInfoCollection {
  /** The SkuInfo items on this page */
  value: SkuInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _skuInfoCollectionDeserializer(item: any): _SkuInfoCollection {
  return {
    value: skuInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function skuInfoArrayDeserializer(result: Array<SkuInfo>): any[] {
  return result.map((item) => {
    return skuInfoDeserializer(item);
  });
}

/** SKU discovery information. */
export interface SkuInfo {
  /** Resource type that this SKU applies to. */
  resourceType?: string;
  /** Name and tier of the SKU. */
  sku?: SkuDescription;
  /** Min, max, and default scale values of the SKU. */
  capacity?: SkuCapacity;
}

export function skuInfoDeserializer(item: any): SkuInfo {
  return {
    resourceType: item["resourceType"],
    sku: !item["sku"] ? item["sku"] : skuDescriptionDeserializer(item["sku"]),
    capacity: !item["capacity"] ? item["capacity"] : skuCapacityDeserializer(item["capacity"]),
  };
}

/** Collection of usages. */
export interface _UsageCollection {
  /** The Usage items on this page */
  value: Usage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _usageCollectionDeserializer(item: any): _UsageCollection {
  return {
    value: usageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageArrayDeserializer(result: Array<Usage>): any[] {
  return result.map((item) => {
    return usageDeserializer(item);
  });
}

/** Usage of the quota resource. */
export interface Usage extends ProxyOnlyResource {
  /** Friendly name shown in the UI. */
  readonly displayName?: string;
  /** Name of the quota resource. */
  readonly resourceName?: string;
  /** Units of measurement for the quota resource. */
  readonly unit?: string;
  /** The current value of the resource counter. */
  readonly currentValue?: number;
  /** The resource limit. */
  readonly limit?: number;
  /** Next reset time for the resource counter. */
  readonly nextResetTime?: Date;
  /** Compute mode used for this usage. */
  readonly computeMode?: ComputeModeOptions;
  /** Site mode used for this usage. */
  readonly siteMode?: string;
}

export function usageDeserializer(item: any): Usage {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _usagePropertiesDeserializer(item["properties"])),
  };
}

/** Usage resource specific properties */
export interface UsageProperties {
  /** Friendly name shown in the UI. */
  readonly displayName?: string;
  /** Name of the quota resource. */
  readonly resourceName?: string;
  /** Units of measurement for the quota resource. */
  readonly unit?: string;
  /** The current value of the resource counter. */
  readonly currentValue?: number;
  /** The resource limit. */
  readonly limit?: number;
  /** Next reset time for the resource counter. */
  readonly nextResetTime?: Date;
  /** Compute mode used for this usage. */
  readonly computeMode?: ComputeModeOptions;
  /** Site mode used for this usage. */
  readonly siteMode?: string;
}

export function usagePropertiesDeserializer(item: any): UsageProperties {
  return {
    displayName: item["displayName"],
    resourceName: item["resourceName"],
    unit: item["unit"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    nextResetTime: !item["nextResetTime"] ? item["nextResetTime"] : new Date(item["nextResetTime"]),
    computeMode: item["computeMode"],
    siteMode: item["siteMode"],
  };
}

/** App Service Environment ARM resource. */
export interface AppServiceEnvironmentResource extends TrackedResource {
  /** Kind of resource. If the resource is an app, you can refer to https://github.com/Azure/app-service-linux-docs/blob/master/Things_You_Should_Know/kind_property.md#app-service-resource-kind-reference for details supported values for kind. */
  kind?: string;
  /** Provisioning state of the App Service Environment. */
  readonly provisioningState?: ProvisioningState;
  /** Current status of the App Service Environment. */
  readonly status?: HostingEnvironmentStatus;
  /** Description of the Virtual Network. */
  virtualNetwork?: VirtualNetworkProfile;
  /** Specifies which endpoints to serve internally in the Virtual Network for the App Service Environment. */
  internalLoadBalancingMode?: LoadBalancingMode;
  /** Front-end VM size, e.g. "Medium", "Large". */
  multiSize?: string;
  /** Number of front-end instances. */
  readonly multiRoleCount?: number;
  /** Number of IP SSL addresses reserved for the App Service Environment. */
  ipsslAddressCount?: number;
  /** DNS suffix of the App Service Environment. */
  dnsSuffix?: string;
  /** Maximum number of VMs in the App Service Environment. */
  readonly maximumNumberOfMachines?: number;
  /** Scale factor for front-ends. */
  frontEndScaleFactor?: number;
  /**
   * <code>true</code> if the App Service Environment is suspended; otherwise, <code>false</code>. The environment can be suspended, e.g. when the management endpoint is no longer available
   * (most likely because NSG blocked the incoming traffic).
   */
  readonly suspended?: boolean;
  /** Custom settings for changing the behavior of the App Service Environment. */
  clusterSettings?: NameValuePair[];
  /** User added ip ranges to whitelist on ASE db */
  userWhitelistedIpRanges?: string[];
  /** Flag that displays whether an ASE has linux workers or not */
  readonly hasLinuxWorkers?: boolean;
  /** Upgrade Preference */
  upgradePreference?: UpgradePreference;
  /** Dedicated Host Count */
  dedicatedHostCount?: number;
  /** Whether or not this App Service Environment is zone-redundant. */
  zoneRedundant?: boolean;
  /** Full view of the custom domain suffix configuration for ASEv3. */
  customDnsSuffixConfiguration?: CustomDnsSuffixConfiguration;
  /** Full view of networking configuration for an ASE. */
  networkingConfiguration?: AseV3NetworkingConfiguration;
  /** Whether an upgrade is available for this App Service Environment. */
  readonly upgradeAvailability?: UpgradeAvailability;
}

export function appServiceEnvironmentResourceSerializer(item: AppServiceEnvironmentResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "virtualNetwork",
      "internalLoadBalancingMode",
      "multiSize",
      "ipsslAddressCount",
      "dnsSuffix",
      "frontEndScaleFactor",
      "clusterSettings",
      "userWhitelistedIpRanges",
      "upgradePreference",
      "dedicatedHostCount",
      "zoneRedundant",
      "customDnsSuffixConfiguration",
      "networkingConfiguration",
    ])
      ? undefined
      : _appServiceEnvironmentResourcePropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function appServiceEnvironmentResourceDeserializer(
  item: any,
): AppServiceEnvironmentResource {
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
      : _appServiceEnvironmentResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
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

/** ARM resource for a app service environment. */
export interface AppServiceEnvironmentPatchResource extends ProxyOnlyResource {
  /** Provisioning state of the App Service Environment. */
  readonly provisioningState?: ProvisioningState;
  /** Current status of the App Service Environment. */
  readonly status?: HostingEnvironmentStatus;
  /** Description of the Virtual Network. */
  virtualNetwork?: VirtualNetworkProfile;
  /** Specifies which endpoints to serve internally in the Virtual Network for the App Service Environment. */
  internalLoadBalancingMode?: LoadBalancingMode;
  /** Front-end VM size, e.g. "Medium", "Large". */
  multiSize?: string;
  /** Number of front-end instances. */
  readonly multiRoleCount?: number;
  /** Number of IP SSL addresses reserved for the App Service Environment. */
  ipsslAddressCount?: number;
  /** DNS suffix of the App Service Environment. */
  dnsSuffix?: string;
  /** Maximum number of VMs in the App Service Environment. */
  readonly maximumNumberOfMachines?: number;
  /** Scale factor for front-ends. */
  frontEndScaleFactor?: number;
  /**
   * <code>true</code> if the App Service Environment is suspended; otherwise, <code>false</code>. The environment can be suspended, e.g. when the management endpoint is no longer available
   * (most likely because NSG blocked the incoming traffic).
   */
  readonly suspended?: boolean;
  /** Custom settings for changing the behavior of the App Service Environment. */
  clusterSettings?: NameValuePair[];
  /** User added ip ranges to whitelist on ASE db */
  userWhitelistedIpRanges?: string[];
  /** Flag that displays whether an ASE has linux workers or not */
  readonly hasLinuxWorkers?: boolean;
  /** Upgrade Preference */
  upgradePreference?: UpgradePreference;
  /** Dedicated Host Count */
  dedicatedHostCount?: number;
  /** Whether or not this App Service Environment is zone-redundant. */
  zoneRedundant?: boolean;
  /** Full view of the custom domain suffix configuration for ASEv3. */
  customDnsSuffixConfiguration?: CustomDnsSuffixConfiguration;
  /** Full view of networking configuration for an ASE. */
  networkingConfiguration?: AseV3NetworkingConfiguration;
  /** Whether an upgrade is available for this App Service Environment. */
  readonly upgradeAvailability?: UpgradeAvailability;
}

export function appServiceEnvironmentPatchResourceSerializer(
  item: AppServiceEnvironmentPatchResource,
): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "virtualNetwork",
      "internalLoadBalancingMode",
      "multiSize",
      "ipsslAddressCount",
      "dnsSuffix",
      "frontEndScaleFactor",
      "clusterSettings",
      "userWhitelistedIpRanges",
      "upgradePreference",
      "dedicatedHostCount",
      "zoneRedundant",
      "customDnsSuffixConfiguration",
      "networkingConfiguration",
    ])
      ? undefined
      : _appServiceEnvironmentPatchResourcePropertiesSerializer(item),
  };
}

/** Collection of App Service Environments. */
export interface _AppServiceEnvironmentCollection {
  /** The AppServiceEnvironmentResource items on this page */
  value: AppServiceEnvironmentResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _appServiceEnvironmentCollectionDeserializer(
  item: any,
): _AppServiceEnvironmentCollection {
  return {
    value: appServiceEnvironmentResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function appServiceEnvironmentResourceArraySerializer(
  result: Array<AppServiceEnvironmentResource>,
): any[] {
  return result.map((item) => {
    return appServiceEnvironmentResourceSerializer(item);
  });
}

export function appServiceEnvironmentResourceArrayDeserializer(
  result: Array<AppServiceEnvironmentResource>,
): any[] {
  return result.map((item) => {
    return appServiceEnvironmentResourceDeserializer(item);
  });
}

/** Paged collection of StampCapacity items */
export interface _StampCapacityCollection {
  /** The StampCapacity items on this page */
  value: StampCapacity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _stampCapacityCollectionDeserializer(item: any): _StampCapacityCollection {
  return {
    value: stampCapacityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function stampCapacityArrayDeserializer(result: Array<StampCapacity>): any[] {
  return result.map((item) => {
    return stampCapacityDeserializer(item);
  });
}

/** Stamp capacity information. */
export interface StampCapacity {
  /** Name of the stamp. */
  name?: string;
  /** Available capacity (# of machines, bytes of storage etc...). */
  availableCapacity?: number;
  /** Total capacity (# of machines, bytes of storage etc...). */
  totalCapacity?: number;
  /** Name of the unit. */
  unit?: string;
  /** Shared/dedicated workers. */
  computeMode?: ComputeModeOptions;
  /** Size of the machines. */
  workerSize?: WorkerSizeOptions;
  /**
   * Size ID of machines:
   * 0 - Small
   * 1 - Medium
   * 2 - Large
   */
  workerSizeId?: number;
  /**
   * If <code>true</code>, it includes basic apps.
   * Basic apps are not used for capacity allocation.
   */
  excludeFromCapacityAllocation?: boolean;
  /** <code>true</code> if capacity is applicable for all apps; otherwise, <code>false</code>. */
  isApplicableForAllComputeModes?: boolean;
  /** Shared or Dedicated. */
  siteMode?: string;
  /** Is this a linux stamp capacity */
  isLinux?: boolean;
}

export function stampCapacityDeserializer(item: any): StampCapacity {
  return {
    name: item["name"],
    availableCapacity: item["availableCapacity"],
    totalCapacity: item["totalCapacity"],
    unit: item["unit"],
    computeMode: item["computeMode"],
    workerSize: item["workerSize"],
    workerSizeId: item["workerSizeId"],
    excludeFromCapacityAllocation: item["excludeFromCapacityAllocation"],
    isApplicableForAllComputeModes: item["isApplicableForAllComputeModes"],
    siteMode: item["siteMode"],
    isLinux: item["isLinux"],
  };
}

/** Size of the machines. */
export type WorkerSizeOptions =
  | "Small"
  | "Medium"
  | "Large"
  | "D1"
  | "D2"
  | "D3"
  | "SmallV3"
  | "MediumV3"
  | "LargeV3"
  | "NestedSmall"
  | "NestedSmallLinux"
  | "Default";

/** Collection of App Service apps. */
export interface _WebAppCollection {
  /** The Site items on this page */
  value: Site[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _webAppCollectionDeserializer(item: any): _WebAppCollection {
  return {
    value: siteArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function siteArraySerializer(result: Array<Site>): any[] {
  return result.map((item) => {
    return siteSerializer(item);
  });
}

export function siteArrayDeserializer(result: Array<Site>): any[] {
  return result.map((item) => {
    return siteDeserializer(item);
  });
}

/** A web app, a mobile app backend, or an API app. */
export interface Site extends TrackedResource {
  /** Managed service identity. */
  identity?: ManagedServiceIdentity;
  /** Extended Location. */
  extendedLocation?: ExtendedLocation;
  /** Kind of resource. If the resource is an app, you can refer to https://github.com/Azure/app-service-linux-docs/blob/master/Things_You_Should_Know/kind_property.md#app-service-resource-kind-reference for details supported values for kind. */
  kind?: string;
  /** Current state of the app. */
  readonly state?: string;
  /** Hostnames associated with the app. */
  readonly hostNames?: string[];
  /** Name of the repository site. */
  readonly repositorySiteName?: string;
  /** State indicating whether the app has exceeded its quota usage. Read-only. */
  readonly usageState?: UsageState;
  /** <code>true</code> if the app is enabled; otherwise, <code>false</code>. Setting this value to false disables the app (takes the app offline). */
  enabled?: boolean;
  /**
   * Enabled hostnames for the app.Hostnames need to be assigned (see HostNames) AND enabled. Otherwise,
   * the app is not served on those hostnames.
   */
  readonly enabledHostNames?: string[];
  /** Management information availability state for the app. */
  readonly availabilityState?: SiteAvailabilityState;
  /** Hostname SSL states are used to manage the SSL bindings for app's hostnames. */
  hostNameSslStates?: HostNameSslState[];
  /** Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}". */
  serverFarmId?: string;
  /** <code>true</code> if reserved; otherwise, <code>false</code>. */
  reserved?: boolean;
  /** Obsolete: Hyper-V sandbox. */
  isXenon?: boolean;
  /** Hyper-V sandbox. */
  hyperV?: boolean;
  /** Last time the app was modified, in UTC. Read-only. */
  readonly lastModifiedTimeUtc?: Date;
  /** Property to configure various DNS related settings for a site. */
  dnsConfiguration?: SiteDnsConfig;
  /** Property to configure various outbound traffic routing options over virtual network for a site */
  outboundVnetRouting?: OutboundVnetRouting;
  /** Configuration of an App Service app. This property is not returned in response to normal create and read requests since it may contain sensitive information. */
  siteConfig?: SiteConfig;
  /** Configuration specific of the Azure Function app. */
  functionAppConfig?: FunctionAppConfig;
  /** Dapr configuration of the app. */
  daprConfig?: DaprConfig;
  /** Workload profile name for function app to execute on. */
  workloadProfileName?: string;
  /** Function app resource requirements. */
  resourceConfig?: ResourceConfig;
  /** Azure Traffic Manager hostnames associated with the app. Read-only. */
  readonly trafficManagerHostNames?: string[];
  /** <code>true</code> to stop SCM (KUDU) site when the app is stopped; otherwise, <code>false</code>. The default is <code>false</code>. */
  scmSiteAlsoStopped?: boolean;
  /** Specifies which deployment slot this app will swap into. Read-only. */
  readonly targetSwapSlot?: string;
  /** App Service Environment to use for the app. */
  hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /** <code>true</code> to enable client affinity; <code>false</code> to stop sending session affinity cookies, which route client requests in the same session to the same instance. Default is <code>true</code>. */
  clientAffinityEnabled?: boolean;
  /** <code>true</code> to enable client affinity partitioning using CHIPS cookies, this will add the <code>partitioned</code> property to the affinity cookies; <code>false</code> to stop sending partitioned affinity cookies. Default is <code>false</code>. */
  clientAffinityPartitioningEnabled?: boolean;
  /** <code>true</code> to override client affinity cookie domain with X-Forwarded-Host request header. <code>false</code> to use default domain. Default is <code>false</code>. */
  clientAffinityProxyEnabled?: boolean;
  /** <code>true</code> to enable client certificate authentication (TLS mutual authentication); otherwise, <code>false</code>. Default is <code>false</code>. */
  clientCertEnabled?: boolean;
  /**
   * This composes with ClientCertEnabled setting.
   * - ClientCertEnabled: false means ClientCert is ignored.
   * - ClientCertEnabled: true and ClientCertMode: Required means ClientCert is required.
   * - ClientCertEnabled: true and ClientCertMode: Optional means ClientCert is optional or accepted.
   */
  clientCertMode?: ClientCertMode;
  /** client certificate authentication comma-separated exclusion paths */
  clientCertExclusionPaths?: string;
  /** Specifies the IP mode of the app. */
  ipMode?: IPMode;
  /** Whether to use end to end encryption between the FrontEnd and the Worker */
  endToEndEncryptionEnabled?: boolean;
  /** Whether to enable ssh access. */
  sshEnabled?: boolean;
  /**
   * <code>true</code> to disable the public hostnames of the app; otherwise, <code>false</code>.
   * If <code>true</code>, the app is only accessible via API management process.
   */
  hostNamesDisabled?: boolean;
  /** Unique identifier that verifies the custom domains assigned to the app. Customer will add this id to a txt record for verification. */
  customDomainVerificationId?: string;
  /** List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from tenants that site can be hosted with current settings. Read-only. */
  readonly outboundIpAddresses?: string;
  /** List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from all tenants except dataComponent. Read-only. */
  readonly possibleOutboundIpAddresses?: string;
  /** Size of the function container. */
  containerSize?: number;
  /** Maximum allowed daily memory-time quota (applicable on dynamic apps only). */
  dailyMemoryTimeQuota?: number;
  /** App suspended till in case memory-time quota is exceeded. */
  readonly suspendedTill?: Date;
  /**
   * Maximum number of workers.
   * This only applies to Functions container.
   */
  readonly maxNumberOfWorkers?: number;
  /** If specified during app creation, the app is cloned from a source app. */
  cloningInfo?: CloningInfo;
  /** Name of the resource group the app belongs to. Read-only. */
  readonly resourceGroup?: string;
  /** <code>true</code> if the app is a default container; otherwise, <code>false</code>. */
  readonly isDefaultContainer?: boolean;
  /** Default hostname of the app. Read-only. */
  readonly defaultHostName?: string;
  /** Status of the last deployment slot swap operation. */
  readonly slotSwapStatus?: SlotSwapStatus;
  /**
   * HttpsOnly: configures a web site to accept only https requests. Issues redirect for
   * http requests
   */
  httpsOnly?: boolean;
  /** Site redundancy mode */
  redundancyMode?: RedundancyMode;
  /** Specifies an operation id if this site has a pending operation. */
  readonly inProgressOperationId?: string;
  /** Property to allow or block all public traffic. Allowed Values: 'Enabled', 'Disabled' or an empty string. */
  publicNetworkAccess?: string;
  /** Checks if Customer provided storage account is required */
  storageAccountRequired?: boolean;
  /** Identity to use for Key Vault Reference authentication. */
  keyVaultReferenceIdentity?: string;
  /** Specifies the scope of uniqueness for the default hostname during resource creation */
  autoGeneratedDomainNameLabelScope?: AutoGeneratedDomainNameLabelScope;
  /**
   * Azure Resource Manager ID of the Virtual network and subnet to be joined by Regional VNET Integration.
   * This must be of the form /subscriptions/{subscriptionName}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}
   */
  virtualNetworkSubnetId?: string;
  /** Azure Resource Manager ID of the customer's selected Managed Environment on which to host this app. This must be of the form /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/managedEnvironments/{managedEnvironmentName} */
  managedEnvironmentId?: string;
  /** Current SKU of application based on associated App Service Plan. Some valid SKU values are Free, Shared, Basic, Dynamic, FlexConsumption, Standard, Premium, PremiumV2, PremiumV3, Isolated, IsolatedV2 */
  readonly sku?: string;
}

export function siteSerializer(item: Site): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "enabled",
      "hostNameSslStates",
      "serverFarmId",
      "reserved",
      "isXenon",
      "hyperV",
      "dnsConfiguration",
      "outboundVnetRouting",
      "siteConfig",
      "functionAppConfig",
      "daprConfig",
      "workloadProfileName",
      "resourceConfig",
      "scmSiteAlsoStopped",
      "hostingEnvironmentProfile",
      "clientAffinityEnabled",
      "clientAffinityPartitioningEnabled",
      "clientAffinityProxyEnabled",
      "clientCertEnabled",
      "clientCertMode",
      "clientCertExclusionPaths",
      "ipMode",
      "endToEndEncryptionEnabled",
      "sshEnabled",
      "hostNamesDisabled",
      "customDomainVerificationId",
      "containerSize",
      "dailyMemoryTimeQuota",
      "cloningInfo",
      "httpsOnly",
      "redundancyMode",
      "publicNetworkAccess",
      "storageAccountRequired",
      "keyVaultReferenceIdentity",
      "autoGeneratedDomainNameLabelScope",
      "virtualNetworkSubnetId",
      "managedEnvironmentId",
    ])
      ? undefined
      : _sitePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    kind: item["kind"],
  };
}

export function siteDeserializer(item: any): Site {
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
    ...(!item["properties"] ? item["properties"] : _sitePropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    kind: item["kind"],
  };
}

/** Site resource specific properties */
export interface SiteProperties {
  /** Current state of the app. */
  readonly state?: string;
  /** Hostnames associated with the app. */
  readonly hostNames?: string[];
  /** Name of the repository site. */
  readonly repositorySiteName?: string;
  /** State indicating whether the app has exceeded its quota usage. Read-only. */
  readonly usageState?: UsageState;
  /** <code>true</code> if the app is enabled; otherwise, <code>false</code>. Setting this value to false disables the app (takes the app offline). */
  enabled?: boolean;
  /**
   * Enabled hostnames for the app.Hostnames need to be assigned (see HostNames) AND enabled. Otherwise,
   * the app is not served on those hostnames.
   */
  readonly enabledHostNames?: string[];
  /** Management information availability state for the app. */
  readonly availabilityState?: SiteAvailabilityState;
  /** Hostname SSL states are used to manage the SSL bindings for app's hostnames. */
  hostNameSslStates?: HostNameSslState[];
  /** Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}". */
  serverFarmId?: string;
  /** <code>true</code> if reserved; otherwise, <code>false</code>. */
  reserved?: boolean;
  /** Obsolete: Hyper-V sandbox. */
  isXenon?: boolean;
  /** Hyper-V sandbox. */
  hyperV?: boolean;
  /** Last time the app was modified, in UTC. Read-only. */
  readonly lastModifiedTimeUtc?: Date;
  /** Property to configure various DNS related settings for a site. */
  dnsConfiguration?: SiteDnsConfig;
  /** Property to configure various outbound traffic routing options over virtual network for a site */
  outboundVnetRouting?: OutboundVnetRouting;
  /** Configuration of an App Service app. This property is not returned in response to normal create and read requests since it may contain sensitive information. */
  siteConfig?: SiteConfig;
  /** Configuration specific of the Azure Function app. */
  functionAppConfig?: FunctionAppConfig;
  /** Dapr configuration of the app. */
  daprConfig?: DaprConfig;
  /** Workload profile name for function app to execute on. */
  workloadProfileName?: string;
  /** Function app resource requirements. */
  resourceConfig?: ResourceConfig;
  /** Azure Traffic Manager hostnames associated with the app. Read-only. */
  readonly trafficManagerHostNames?: string[];
  /** <code>true</code> to stop SCM (KUDU) site when the app is stopped; otherwise, <code>false</code>. The default is <code>false</code>. */
  scmSiteAlsoStopped?: boolean;
  /** Specifies which deployment slot this app will swap into. Read-only. */
  readonly targetSwapSlot?: string;
  /** App Service Environment to use for the app. */
  hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /** <code>true</code> to enable client affinity; <code>false</code> to stop sending session affinity cookies, which route client requests in the same session to the same instance. Default is <code>true</code>. */
  clientAffinityEnabled?: boolean;
  /** <code>true</code> to enable client affinity partitioning using CHIPS cookies, this will add the <code>partitioned</code> property to the affinity cookies; <code>false</code> to stop sending partitioned affinity cookies. Default is <code>false</code>. */
  clientAffinityPartitioningEnabled?: boolean;
  /** <code>true</code> to override client affinity cookie domain with X-Forwarded-Host request header. <code>false</code> to use default domain. Default is <code>false</code>. */
  clientAffinityProxyEnabled?: boolean;
  /** <code>true</code> to enable client certificate authentication (TLS mutual authentication); otherwise, <code>false</code>. Default is <code>false</code>. */
  clientCertEnabled?: boolean;
  /**
   * This composes with ClientCertEnabled setting.
   * - ClientCertEnabled: false means ClientCert is ignored.
   * - ClientCertEnabled: true and ClientCertMode: Required means ClientCert is required.
   * - ClientCertEnabled: true and ClientCertMode: Optional means ClientCert is optional or accepted.
   */
  clientCertMode?: ClientCertMode;
  /** client certificate authentication comma-separated exclusion paths */
  clientCertExclusionPaths?: string;
  /** Specifies the IP mode of the app. */
  ipMode?: IPMode;
  /** Whether to use end to end encryption between the FrontEnd and the Worker */
  endToEndEncryptionEnabled?: boolean;
  /** Whether to enable ssh access. */
  sshEnabled?: boolean;
  /**
   * <code>true</code> to disable the public hostnames of the app; otherwise, <code>false</code>.
   * If <code>true</code>, the app is only accessible via API management process.
   */
  hostNamesDisabled?: boolean;
  /** Unique identifier that verifies the custom domains assigned to the app. Customer will add this id to a txt record for verification. */
  customDomainVerificationId?: string;
  /** List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from tenants that site can be hosted with current settings. Read-only. */
  readonly outboundIpAddresses?: string;
  /** List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from all tenants except dataComponent. Read-only. */
  readonly possibleOutboundIpAddresses?: string;
  /** Size of the function container. */
  containerSize?: number;
  /** Maximum allowed daily memory-time quota (applicable on dynamic apps only). */
  dailyMemoryTimeQuota?: number;
  /** App suspended till in case memory-time quota is exceeded. */
  readonly suspendedTill?: Date;
  /**
   * Maximum number of workers.
   * This only applies to Functions container.
   */
  readonly maxNumberOfWorkers?: number;
  /** If specified during app creation, the app is cloned from a source app. */
  cloningInfo?: CloningInfo;
  /** Name of the resource group the app belongs to. Read-only. */
  readonly resourceGroup?: string;
  /** <code>true</code> if the app is a default container; otherwise, <code>false</code>. */
  readonly isDefaultContainer?: boolean;
  /** Default hostname of the app. Read-only. */
  readonly defaultHostName?: string;
  /** Status of the last deployment slot swap operation. */
  readonly slotSwapStatus?: SlotSwapStatus;
  /**
   * HttpsOnly: configures a web site to accept only https requests. Issues redirect for
   * http requests
   */
  httpsOnly?: boolean;
  /** Site redundancy mode */
  redundancyMode?: RedundancyMode;
  /** Specifies an operation id if this site has a pending operation. */
  readonly inProgressOperationId?: string;
  /** Property to allow or block all public traffic. Allowed Values: 'Enabled', 'Disabled' or an empty string. */
  publicNetworkAccess?: string;
  /** Checks if Customer provided storage account is required */
  storageAccountRequired?: boolean;
  /** Identity to use for Key Vault Reference authentication. */
  keyVaultReferenceIdentity?: string;
  /** Specifies the scope of uniqueness for the default hostname during resource creation */
  autoGeneratedDomainNameLabelScope?: AutoGeneratedDomainNameLabelScope;
  /**
   * Azure Resource Manager ID of the Virtual network and subnet to be joined by Regional VNET Integration.
   * This must be of the form /subscriptions/{subscriptionName}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}
   */
  virtualNetworkSubnetId?: string;
  /** Azure Resource Manager ID of the customer's selected Managed Environment on which to host this app. This must be of the form /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.App/managedEnvironments/{managedEnvironmentName} */
  managedEnvironmentId?: string;
  /** Current SKU of application based on associated App Service Plan. Some valid SKU values are Free, Shared, Basic, Dynamic, FlexConsumption, Standard, Premium, PremiumV2, PremiumV3, Isolated, IsolatedV2 */
  readonly sku?: string;
}

export function sitePropertiesSerializer(item: SiteProperties): any {
  return {
    enabled: item["enabled"],
    hostNameSslStates: !item["hostNameSslStates"]
      ? item["hostNameSslStates"]
      : hostNameSslStateArraySerializer(item["hostNameSslStates"]),
    serverFarmId: item["serverFarmId"],
    reserved: item["reserved"],
    isXenon: item["isXenon"],
    hyperV: item["hyperV"],
    dnsConfiguration: !item["dnsConfiguration"]
      ? item["dnsConfiguration"]
      : siteDnsConfigSerializer(item["dnsConfiguration"]),
    outboundVnetRouting: !item["outboundVnetRouting"]
      ? item["outboundVnetRouting"]
      : outboundVnetRoutingSerializer(item["outboundVnetRouting"]),
    siteConfig: !item["siteConfig"] ? item["siteConfig"] : siteConfigSerializer(item["siteConfig"]),
    functionAppConfig: !item["functionAppConfig"]
      ? item["functionAppConfig"]
      : functionAppConfigSerializer(item["functionAppConfig"]),
    daprConfig: !item["daprConfig"] ? item["daprConfig"] : daprConfigSerializer(item["daprConfig"]),
    workloadProfileName: item["workloadProfileName"],
    resourceConfig: !item["resourceConfig"]
      ? item["resourceConfig"]
      : resourceConfigSerializer(item["resourceConfig"]),
    scmSiteAlsoStopped: item["scmSiteAlsoStopped"],
    hostingEnvironmentProfile: !item["hostingEnvironmentProfile"]
      ? item["hostingEnvironmentProfile"]
      : hostingEnvironmentProfileSerializer(item["hostingEnvironmentProfile"]),
    clientAffinityEnabled: item["clientAffinityEnabled"],
    clientAffinityPartitioningEnabled: item["clientAffinityPartitioningEnabled"],
    clientAffinityProxyEnabled: item["clientAffinityProxyEnabled"],
    clientCertEnabled: item["clientCertEnabled"],
    clientCertMode: item["clientCertMode"],
    clientCertExclusionPaths: item["clientCertExclusionPaths"],
    ipMode: item["ipMode"],
    endToEndEncryptionEnabled: item["endToEndEncryptionEnabled"],
    sshEnabled: item["sshEnabled"],
    hostNamesDisabled: item["hostNamesDisabled"],
    customDomainVerificationId: item["customDomainVerificationId"],
    containerSize: item["containerSize"],
    dailyMemoryTimeQuota: item["dailyMemoryTimeQuota"],
    cloningInfo: !item["cloningInfo"]
      ? item["cloningInfo"]
      : cloningInfoSerializer(item["cloningInfo"]),
    httpsOnly: item["httpsOnly"],
    redundancyMode: item["redundancyMode"],
    publicNetworkAccess: item["publicNetworkAccess"],
    storageAccountRequired: item["storageAccountRequired"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
    autoGeneratedDomainNameLabelScope: item["autoGeneratedDomainNameLabelScope"],
    virtualNetworkSubnetId: item["virtualNetworkSubnetId"],
    managedEnvironmentId: item["managedEnvironmentId"],
  };
}

export function sitePropertiesDeserializer(item: any): SiteProperties {
  return {
    state: item["state"],
    hostNames: !item["hostNames"]
      ? item["hostNames"]
      : item["hostNames"].map((p: any) => {
          return p;
        }),
    repositorySiteName: item["repositorySiteName"],
    usageState: item["usageState"],
    enabled: item["enabled"],
    enabledHostNames: !item["enabledHostNames"]
      ? item["enabledHostNames"]
      : item["enabledHostNames"].map((p: any) => {
          return p;
        }),
    availabilityState: item["availabilityState"],
    hostNameSslStates: !item["hostNameSslStates"]
      ? item["hostNameSslStates"]
      : hostNameSslStateArrayDeserializer(item["hostNameSslStates"]),
    serverFarmId: item["serverFarmId"],
    reserved: item["reserved"],
    isXenon: item["isXenon"],
    hyperV: item["hyperV"],
    lastModifiedTimeUtc: !item["lastModifiedTimeUtc"]
      ? item["lastModifiedTimeUtc"]
      : new Date(item["lastModifiedTimeUtc"]),
    dnsConfiguration: !item["dnsConfiguration"]
      ? item["dnsConfiguration"]
      : siteDnsConfigDeserializer(item["dnsConfiguration"]),
    outboundVnetRouting: !item["outboundVnetRouting"]
      ? item["outboundVnetRouting"]
      : outboundVnetRoutingDeserializer(item["outboundVnetRouting"]),
    siteConfig: !item["siteConfig"]
      ? item["siteConfig"]
      : siteConfigDeserializer(item["siteConfig"]),
    functionAppConfig: !item["functionAppConfig"]
      ? item["functionAppConfig"]
      : functionAppConfigDeserializer(item["functionAppConfig"]),
    daprConfig: !item["daprConfig"]
      ? item["daprConfig"]
      : daprConfigDeserializer(item["daprConfig"]),
    workloadProfileName: item["workloadProfileName"],
    resourceConfig: !item["resourceConfig"]
      ? item["resourceConfig"]
      : resourceConfigDeserializer(item["resourceConfig"]),
    trafficManagerHostNames: !item["trafficManagerHostNames"]
      ? item["trafficManagerHostNames"]
      : item["trafficManagerHostNames"].map((p: any) => {
          return p;
        }),
    scmSiteAlsoStopped: item["scmSiteAlsoStopped"],
    targetSwapSlot: item["targetSwapSlot"],
    hostingEnvironmentProfile: !item["hostingEnvironmentProfile"]
      ? item["hostingEnvironmentProfile"]
      : hostingEnvironmentProfileDeserializer(item["hostingEnvironmentProfile"]),
    clientAffinityEnabled: item["clientAffinityEnabled"],
    clientAffinityPartitioningEnabled: item["clientAffinityPartitioningEnabled"],
    clientAffinityProxyEnabled: item["clientAffinityProxyEnabled"],
    clientCertEnabled: item["clientCertEnabled"],
    clientCertMode: item["clientCertMode"],
    clientCertExclusionPaths: item["clientCertExclusionPaths"],
    ipMode: item["ipMode"],
    endToEndEncryptionEnabled: item["endToEndEncryptionEnabled"],
    sshEnabled: item["sshEnabled"],
    hostNamesDisabled: item["hostNamesDisabled"],
    customDomainVerificationId: item["customDomainVerificationId"],
    outboundIpAddresses: item["outboundIpAddresses"],
    possibleOutboundIpAddresses: item["possibleOutboundIpAddresses"],
    containerSize: item["containerSize"],
    dailyMemoryTimeQuota: item["dailyMemoryTimeQuota"],
    suspendedTill: !item["suspendedTill"] ? item["suspendedTill"] : new Date(item["suspendedTill"]),
    maxNumberOfWorkers: item["maxNumberOfWorkers"],
    cloningInfo: !item["cloningInfo"]
      ? item["cloningInfo"]
      : cloningInfoDeserializer(item["cloningInfo"]),
    resourceGroup: item["resourceGroup"],
    isDefaultContainer: item["isDefaultContainer"],
    defaultHostName: item["defaultHostName"],
    slotSwapStatus: !item["slotSwapStatus"]
      ? item["slotSwapStatus"]
      : slotSwapStatusDeserializer(item["slotSwapStatus"]),
    httpsOnly: item["httpsOnly"],
    redundancyMode: item["redundancyMode"],
    inProgressOperationId: item["inProgressOperationId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    storageAccountRequired: item["storageAccountRequired"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
    autoGeneratedDomainNameLabelScope: item["autoGeneratedDomainNameLabelScope"],
    virtualNetworkSubnetId: item["virtualNetworkSubnetId"],
    managedEnvironmentId: item["managedEnvironmentId"],
    sku: item["sku"],
  };
}

/** State indicating whether the app has exceeded its quota usage. Read-only. */
export type UsageState = "Normal" | "Exceeded";
/** Management information availability state for the app. */
export type SiteAvailabilityState = "Normal" | "Limited" | "DisasterRecoveryMode";

export function hostNameSslStateArraySerializer(result: Array<HostNameSslState>): any[] {
  return result.map((item) => {
    return hostNameSslStateSerializer(item);
  });
}

export function hostNameSslStateArrayDeserializer(result: Array<HostNameSslState>): any[] {
  return result.map((item) => {
    return hostNameSslStateDeserializer(item);
  });
}

/** SSL-enabled hostname. */
export interface HostNameSslState {
  /** Hostname. */
  name?: string;
  /** SSL type. */
  sslState?: SslState;
  /** Virtual IP address assigned to the hostname if IP based SSL is enabled. */
  virtualIP?: string;
  /** SSL certificate thumbprint. */
  thumbprint?: string;
  /** Set to <code>true</code> to update existing hostname. */
  toUpdate?: boolean;
  /** Indicates whether the hostname is a standard or repository hostname. */
  hostType?: HostType;
}

export function hostNameSslStateSerializer(item: HostNameSslState): any {
  return {
    name: item["name"],
    sslState: item["sslState"],
    virtualIP: item["virtualIP"],
    thumbprint: item["thumbprint"],
    toUpdate: item["toUpdate"],
    hostType: item["hostType"],
  };
}

export function hostNameSslStateDeserializer(item: any): HostNameSslState {
  return {
    name: item["name"],
    sslState: item["sslState"],
    virtualIP: item["virtualIP"],
    thumbprint: item["thumbprint"],
    toUpdate: item["toUpdate"],
    hostType: item["hostType"],
  };
}

/** SSL type */
export type SslState = "Disabled" | "SniEnabled" | "IpBasedEnabled";
/** Indicates whether the hostname is a standard or repository hostname. */
export type HostType = "Standard" | "Repository";

/** model interface SiteDnsConfig */
export interface SiteDnsConfig {
  /** List of custom DNS servers to be used by an app for lookups. Maximum 5 dns servers can be set. */
  dnsServers?: string[];
  /** Alternate DNS server to be used by apps. This property replicates the WEBSITE_DNS_ALT_SERVER app setting. */
  dnsAltServer?: string;
  /** Timeout for a single dns lookup in seconds. Allowed range: 1-30. Default is 3. */
  dnsRetryAttemptTimeout?: number;
  /** Total number of retries for dns lookup. Allowed range: 1-5. Default is 3. */
  dnsRetryAttemptCount?: number;
  /** Custom time for DNS to be cached in seconds. Allowed range: 0-60. Default is 30 seconds. 0 means caching disabled. */
  dnsMaxCacheTimeout?: number;
  /** Indicates that sites using Virtual network custom DNS servers are still sorting the list of DNS servers. Read-Only. */
  readonly dnsLegacySortOrder?: boolean;
}

export function siteDnsConfigSerializer(item: SiteDnsConfig): any {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    dnsAltServer: item["dnsAltServer"],
    dnsRetryAttemptTimeout: item["dnsRetryAttemptTimeout"],
    dnsRetryAttemptCount: item["dnsRetryAttemptCount"],
    dnsMaxCacheTimeout: item["dnsMaxCacheTimeout"],
  };
}

export function siteDnsConfigDeserializer(item: any): SiteDnsConfig {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    dnsAltServer: item["dnsAltServer"],
    dnsRetryAttemptTimeout: item["dnsRetryAttemptTimeout"],
    dnsRetryAttemptCount: item["dnsRetryAttemptCount"],
    dnsMaxCacheTimeout: item["dnsMaxCacheTimeout"],
    dnsLegacySortOrder: item["dnsLegacySortOrder"],
  };
}

/** Outbound traffic options over virtual network. */
export interface OutboundVnetRouting {
  /** Enables all other routing options defined in OutboundVnetRouting if this setting is set to true. */
  allTraffic?: boolean;
  /** This causes all outbound traffic to have Virtual Network Security Groups and User Defined Routes applied. Previously called VnetRouteAllEnabled. */
  applicationTraffic?: boolean;
  /** Enables accessing content over virtual network. Previously called VnetContentShareEnabled */
  contentShareTraffic?: boolean;
  /** Enables pulling image over Virtual Network. Previously called VnetImagePullEnabled. */
  imagePullTraffic?: boolean;
  /** Enables Backup and Restore operations over virtual network. Previously called VnetBackupRestoreEnabled */
  backupRestoreTraffic?: boolean;
}

export function outboundVnetRoutingSerializer(item: OutboundVnetRouting): any {
  return {
    allTraffic: item["allTraffic"],
    applicationTraffic: item["applicationTraffic"],
    contentShareTraffic: item["contentShareTraffic"],
    imagePullTraffic: item["imagePullTraffic"],
    backupRestoreTraffic: item["backupRestoreTraffic"],
  };
}

export function outboundVnetRoutingDeserializer(item: any): OutboundVnetRouting {
  return {
    allTraffic: item["allTraffic"],
    applicationTraffic: item["applicationTraffic"],
    contentShareTraffic: item["contentShareTraffic"],
    imagePullTraffic: item["imagePullTraffic"],
    backupRestoreTraffic: item["backupRestoreTraffic"],
  };
}

/** Configuration of an App Service app. */
export interface SiteConfig {
  /** Number of workers. */
  numberOfWorkers?: number;
  /** Default documents. */
  defaultDocuments?: string[];
  /** .NET Framework version. */
  netFrameworkVersion?: string;
  /** Version of PHP. */
  phpVersion?: string;
  /** Version of Python. */
  pythonVersion?: string;
  /** Version of Node.js. */
  nodeVersion?: string;
  /** Version of PowerShell. */
  powerShellVersion?: string;
  /** Linux App Framework and version */
  linuxFxVersion?: string;
  /** Xenon App Framework and version */
  windowsFxVersion?: string;
  /** <code>true</code> if request tracing is enabled; otherwise, <code>false</code>. */
  requestTracingEnabled?: boolean;
  /** Request tracing expiration time. */
  requestTracingExpirationTime?: Date;
  /** <code>true</code> if remote debugging is enabled; otherwise, <code>false</code>. */
  remoteDebuggingEnabled?: boolean;
  /** Remote debugging version. */
  remoteDebuggingVersion?: string;
  /** <code>true</code> if HTTP logging is enabled; otherwise, <code>false</code>. */
  httpLoggingEnabled?: boolean;
  /** Flag to use Managed Identity Creds for ACR pull */
  acrUseManagedIdentityCreds?: boolean;
  /** If using user managed identity, the user managed identity ClientId */
  acrUserManagedIdentityID?: string;
  /** HTTP logs directory size limit. */
  logsDirectorySizeLimit?: number;
  /** <code>true</code> if detailed error logging is enabled; otherwise, <code>false</code>. */
  detailedErrorLoggingEnabled?: boolean;
  /** Publishing user name. */
  publishingUsername?: string;
  /** Application settings. This property is not returned in response to normal create and read requests since it may contain sensitive information. */
  appSettings?: NameValuePair[];
  /** Application metadata. This property cannot be retrieved, since it may contain secrets. */
  metadata?: NameValuePair[];
  /** Connection strings. This property is not returned in response to normal create and read requests since it may contain sensitive information. */
  connectionStrings?: ConnStringInfo[];
  /** Site MachineKey. */
  readonly machineKey?: SiteMachineKey;
  /** Handler mappings. */
  handlerMappings?: HandlerMapping[];
  /** Document root. */
  documentRoot?: string;
  /** SCM type. */
  scmType?: ScmType;
  /** <code>true</code> to use 32-bit worker process; otherwise, <code>false</code>. */
  use32BitWorkerProcess?: boolean;
  /** <code>true</code> if WebSocket is enabled; otherwise, <code>false</code>. */
  webSocketsEnabled?: boolean;
  /** <code>true</code> if Always On is enabled; otherwise, <code>false</code>. */
  alwaysOn?: boolean;
  /** Java version. */
  javaVersion?: string;
  /** Java container. */
  javaContainer?: string;
  /** Java container version. */
  javaContainerVersion?: string;
  /** App command line to launch. */
  appCommandLine?: string;
  /** Managed pipeline mode. */
  managedPipelineMode?: ManagedPipelineMode;
  /** Virtual applications. */
  virtualApplications?: VirtualApplication[];
  /** Site load balancing. */
  loadBalancing?: SiteLoadBalancing;
  /** This is work around for polymorphic types. */
  experiments?: Experiments;
  /** Site limits. */
  limits?: SiteLimits;
  /** <code>true</code> if Auto Heal is enabled; otherwise, <code>false</code>. */
  autoHealEnabled?: boolean;
  /** Auto Heal rules. */
  autoHealRules?: AutoHealRules;
  /** Tracing options. */
  tracingOptions?: string;
  /** Virtual Network name. */
  vnetName?: string;
  /** Virtual Network Route All enabled. This causes all outbound traffic to have Virtual Network Security Groups and User Defined Routes applied. */
  vnetRouteAllEnabled?: boolean;
  /** The number of private ports assigned to this app. These will be assigned dynamically on runtime. */
  vnetPrivatePortsCount?: number;
  /** Cross-Origin Resource Sharing (CORS) settings. */
  cors?: CorsSettings;
  /** Push endpoint settings. */
  push?: PushSettings;
  /** Information about the formal API definition for the app. */
  apiDefinition?: ApiDefinitionInfo;
  /** Azure API management settings linked to the app. */
  apiManagementConfig?: ApiManagementConfig;
  /** Auto-swap slot name. */
  autoSwapSlotName?: string;
  /** <code>true</code> to enable local MySQL; otherwise, <code>false</code>. */
  localMySqlEnabled?: boolean;
  /** Managed Service Identity Id */
  managedServiceIdentityId?: number;
  /** Explicit Managed Service Identity Id */
  xManagedServiceIdentityId?: number;
  /** Identity to use for Key Vault Reference authentication. */
  keyVaultReferenceIdentity?: string;
  /** IP security restrictions for main. */
  ipSecurityRestrictions?: IpSecurityRestriction[];
  /** Default action for main access restriction if no rules are matched. */
  ipSecurityRestrictionsDefaultAction?: DefaultAction;
  /** IP security restrictions for scm. */
  scmIpSecurityRestrictions?: IpSecurityRestriction[];
  /** Default action for scm access restriction if no rules are matched. */
  scmIpSecurityRestrictionsDefaultAction?: DefaultAction;
  /** IP security restrictions for scm to use main. */
  scmIpSecurityRestrictionsUseMain?: boolean;
  /** Http20Enabled: configures a web site to allow clients to connect over http2.0 */
  http20Enabled?: boolean;
  /** Http20ProxyFlag: Configures a website to allow http2.0 to pass be proxied all the way to the app. 0 = disabled, 1 = pass through all http2 traffic, 2 = pass through gRPC only. */
  http20ProxyFlag?: number;
  /** MinTlsVersion: configures the minimum version of TLS required for SSL requests */
  minTlsVersion?: SupportedTlsVersions;
  /** The minimum strength TLS cipher suite allowed for an application */
  minTlsCipherSuite?: TlsCipherSuites;
  /** ScmMinTlsVersion: configures the minimum version of TLS required for SSL requests for SCM site */
  scmMinTlsVersion?: SupportedTlsVersions;
  /** State of FTP / FTPS service */
  ftpsState?: FtpsState;
  /**
   * Number of preWarmed instances.
   * This setting only applies to the Consumption and Elastic Plans
   */
  preWarmedInstanceCount?: number;
  /**
   * Maximum number of workers that a site can scale out to.
   * This setting only applies to the Consumption and Elastic Premium Plans
   */
  functionAppScaleLimit?: number;
  /**
   * Maximum number of workers that a site can scale out to.
   * This setting only applies to apps in plans where ElasticScaleEnabled is <code>true</code>
   */
  elasticWebAppScaleLimit?: number;
  /** Health check path */
  healthCheckPath?: string;
  /**
   * Gets or sets a value indicating whether functions runtime scale monitoring is enabled. When enabled,
   * the ScaleController will not monitor event sources directly, but will instead call to the
   * runtime to get scale status.
   */
  functionsRuntimeScaleMonitoringEnabled?: boolean;
  /** Sets the time zone a site uses for generating timestamps. Compatible with Linux and Windows App Service. Setting the WEBSITE_TIME_ZONE app setting takes precedence over this config. For Linux, expects tz database values https://www.iana.org/time-zones (for a quick reference see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). For Windows, expects one of the time zones listed under HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Time Zones */
  websiteTimeZone?: string;
  /**
   * Number of minimum instance count for a site
   * This setting only applies to the Elastic Plans
   */
  minimumElasticInstanceCount?: number;
  /** List of Azure Storage Accounts. */
  azureStorageAccounts?: Record<string, AzureStorageInfoValue>;
  /** Property to allow or block all public traffic. */
  publicNetworkAccess?: string;
}

export function siteConfigSerializer(item: SiteConfig): any {
  return {
    numberOfWorkers: item["numberOfWorkers"],
    defaultDocuments: !item["defaultDocuments"]
      ? item["defaultDocuments"]
      : item["defaultDocuments"].map((p: any) => {
          return p;
        }),
    netFrameworkVersion: item["netFrameworkVersion"],
    phpVersion: item["phpVersion"],
    pythonVersion: item["pythonVersion"],
    nodeVersion: item["nodeVersion"],
    powerShellVersion: item["powerShellVersion"],
    linuxFxVersion: item["linuxFxVersion"],
    windowsFxVersion: item["windowsFxVersion"],
    requestTracingEnabled: item["requestTracingEnabled"],
    requestTracingExpirationTime: !item["requestTracingExpirationTime"]
      ? item["requestTracingExpirationTime"]
      : item["requestTracingExpirationTime"].toISOString(),
    remoteDebuggingEnabled: item["remoteDebuggingEnabled"],
    remoteDebuggingVersion: item["remoteDebuggingVersion"],
    httpLoggingEnabled: item["httpLoggingEnabled"],
    acrUseManagedIdentityCreds: item["acrUseManagedIdentityCreds"],
    acrUserManagedIdentityID: item["acrUserManagedIdentityID"],
    logsDirectorySizeLimit: item["logsDirectorySizeLimit"],
    detailedErrorLoggingEnabled: item["detailedErrorLoggingEnabled"],
    publishingUsername: item["publishingUsername"],
    appSettings: !item["appSettings"]
      ? item["appSettings"]
      : nameValuePairArraySerializer(item["appSettings"]),
    metadata: !item["metadata"] ? item["metadata"] : nameValuePairArraySerializer(item["metadata"]),
    connectionStrings: !item["connectionStrings"]
      ? item["connectionStrings"]
      : connStringInfoArraySerializer(item["connectionStrings"]),
    handlerMappings: !item["handlerMappings"]
      ? item["handlerMappings"]
      : handlerMappingArraySerializer(item["handlerMappings"]),
    documentRoot: item["documentRoot"],
    scmType: item["scmType"],
    use32BitWorkerProcess: item["use32BitWorkerProcess"],
    webSocketsEnabled: item["webSocketsEnabled"],
    alwaysOn: item["alwaysOn"],
    javaVersion: item["javaVersion"],
    javaContainer: item["javaContainer"],
    javaContainerVersion: item["javaContainerVersion"],
    appCommandLine: item["appCommandLine"],
    managedPipelineMode: item["managedPipelineMode"],
    virtualApplications: !item["virtualApplications"]
      ? item["virtualApplications"]
      : virtualApplicationArraySerializer(item["virtualApplications"]),
    loadBalancing: item["loadBalancing"],
    experiments: !item["experiments"]
      ? item["experiments"]
      : experimentsSerializer(item["experiments"]),
    limits: !item["limits"] ? item["limits"] : siteLimitsSerializer(item["limits"]),
    autoHealEnabled: item["autoHealEnabled"],
    autoHealRules: !item["autoHealRules"]
      ? item["autoHealRules"]
      : autoHealRulesSerializer(item["autoHealRules"]),
    tracingOptions: item["tracingOptions"],
    vnetName: item["vnetName"],
    vnetRouteAllEnabled: item["vnetRouteAllEnabled"],
    vnetPrivatePortsCount: item["vnetPrivatePortsCount"],
    cors: !item["cors"] ? item["cors"] : corsSettingsSerializer(item["cors"]),
    push: !item["push"] ? item["push"] : pushSettingsSerializer(item["push"]),
    apiDefinition: !item["apiDefinition"]
      ? item["apiDefinition"]
      : apiDefinitionInfoSerializer(item["apiDefinition"]),
    apiManagementConfig: !item["apiManagementConfig"]
      ? item["apiManagementConfig"]
      : apiManagementConfigSerializer(item["apiManagementConfig"]),
    autoSwapSlotName: item["autoSwapSlotName"],
    localMySqlEnabled: item["localMySqlEnabled"],
    managedServiceIdentityId: item["managedServiceIdentityId"],
    xManagedServiceIdentityId: item["xManagedServiceIdentityId"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
    ipSecurityRestrictions: !item["ipSecurityRestrictions"]
      ? item["ipSecurityRestrictions"]
      : ipSecurityRestrictionArraySerializer(item["ipSecurityRestrictions"]),
    ipSecurityRestrictionsDefaultAction: item["ipSecurityRestrictionsDefaultAction"],
    scmIpSecurityRestrictions: !item["scmIpSecurityRestrictions"]
      ? item["scmIpSecurityRestrictions"]
      : ipSecurityRestrictionArraySerializer(item["scmIpSecurityRestrictions"]),
    scmIpSecurityRestrictionsDefaultAction: item["scmIpSecurityRestrictionsDefaultAction"],
    scmIpSecurityRestrictionsUseMain: item["scmIpSecurityRestrictionsUseMain"],
    http20Enabled: item["http20Enabled"],
    http20ProxyFlag: item["http20ProxyFlag"],
    minTlsVersion: item["minTlsVersion"],
    minTlsCipherSuite: item["minTlsCipherSuite"],
    scmMinTlsVersion: item["scmMinTlsVersion"],
    ftpsState: item["ftpsState"],
    preWarmedInstanceCount: item["preWarmedInstanceCount"],
    functionAppScaleLimit: item["functionAppScaleLimit"],
    elasticWebAppScaleLimit: item["elasticWebAppScaleLimit"],
    healthCheckPath: item["healthCheckPath"],
    functionsRuntimeScaleMonitoringEnabled: item["functionsRuntimeScaleMonitoringEnabled"],
    websiteTimeZone: item["websiteTimeZone"],
    minimumElasticInstanceCount: item["minimumElasticInstanceCount"],
    azureStorageAccounts: !item["azureStorageAccounts"]
      ? item["azureStorageAccounts"]
      : azureStorageInfoValueRecordSerializer(item["azureStorageAccounts"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function siteConfigDeserializer(item: any): SiteConfig {
  return {
    numberOfWorkers: item["numberOfWorkers"],
    defaultDocuments: !item["defaultDocuments"]
      ? item["defaultDocuments"]
      : item["defaultDocuments"].map((p: any) => {
          return p;
        }),
    netFrameworkVersion: item["netFrameworkVersion"],
    phpVersion: item["phpVersion"],
    pythonVersion: item["pythonVersion"],
    nodeVersion: item["nodeVersion"],
    powerShellVersion: item["powerShellVersion"],
    linuxFxVersion: item["linuxFxVersion"],
    windowsFxVersion: item["windowsFxVersion"],
    requestTracingEnabled: item["requestTracingEnabled"],
    requestTracingExpirationTime: !item["requestTracingExpirationTime"]
      ? item["requestTracingExpirationTime"]
      : new Date(item["requestTracingExpirationTime"]),
    remoteDebuggingEnabled: item["remoteDebuggingEnabled"],
    remoteDebuggingVersion: item["remoteDebuggingVersion"],
    httpLoggingEnabled: item["httpLoggingEnabled"],
    acrUseManagedIdentityCreds: item["acrUseManagedIdentityCreds"],
    acrUserManagedIdentityID: item["acrUserManagedIdentityID"],
    logsDirectorySizeLimit: item["logsDirectorySizeLimit"],
    detailedErrorLoggingEnabled: item["detailedErrorLoggingEnabled"],
    publishingUsername: item["publishingUsername"],
    appSettings: !item["appSettings"]
      ? item["appSettings"]
      : nameValuePairArrayDeserializer(item["appSettings"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : nameValuePairArrayDeserializer(item["metadata"]),
    connectionStrings: !item["connectionStrings"]
      ? item["connectionStrings"]
      : connStringInfoArrayDeserializer(item["connectionStrings"]),
    machineKey: !item["machineKey"]
      ? item["machineKey"]
      : siteMachineKeyDeserializer(item["machineKey"]),
    handlerMappings: !item["handlerMappings"]
      ? item["handlerMappings"]
      : handlerMappingArrayDeserializer(item["handlerMappings"]),
    documentRoot: item["documentRoot"],
    scmType: item["scmType"],
    use32BitWorkerProcess: item["use32BitWorkerProcess"],
    webSocketsEnabled: item["webSocketsEnabled"],
    alwaysOn: item["alwaysOn"],
    javaVersion: item["javaVersion"],
    javaContainer: item["javaContainer"],
    javaContainerVersion: item["javaContainerVersion"],
    appCommandLine: item["appCommandLine"],
    managedPipelineMode: item["managedPipelineMode"],
    virtualApplications: !item["virtualApplications"]
      ? item["virtualApplications"]
      : virtualApplicationArrayDeserializer(item["virtualApplications"]),
    loadBalancing: item["loadBalancing"],
    experiments: !item["experiments"]
      ? item["experiments"]
      : experimentsDeserializer(item["experiments"]),
    limits: !item["limits"] ? item["limits"] : siteLimitsDeserializer(item["limits"]),
    autoHealEnabled: item["autoHealEnabled"],
    autoHealRules: !item["autoHealRules"]
      ? item["autoHealRules"]
      : autoHealRulesDeserializer(item["autoHealRules"]),
    tracingOptions: item["tracingOptions"],
    vnetName: item["vnetName"],
    vnetRouteAllEnabled: item["vnetRouteAllEnabled"],
    vnetPrivatePortsCount: item["vnetPrivatePortsCount"],
    cors: !item["cors"] ? item["cors"] : corsSettingsDeserializer(item["cors"]),
    push: !item["push"] ? item["push"] : pushSettingsDeserializer(item["push"]),
    apiDefinition: !item["apiDefinition"]
      ? item["apiDefinition"]
      : apiDefinitionInfoDeserializer(item["apiDefinition"]),
    apiManagementConfig: !item["apiManagementConfig"]
      ? item["apiManagementConfig"]
      : apiManagementConfigDeserializer(item["apiManagementConfig"]),
    autoSwapSlotName: item["autoSwapSlotName"],
    localMySqlEnabled: item["localMySqlEnabled"],
    managedServiceIdentityId: item["managedServiceIdentityId"],
    xManagedServiceIdentityId: item["xManagedServiceIdentityId"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
    ipSecurityRestrictions: !item["ipSecurityRestrictions"]
      ? item["ipSecurityRestrictions"]
      : ipSecurityRestrictionArrayDeserializer(item["ipSecurityRestrictions"]),
    ipSecurityRestrictionsDefaultAction: item["ipSecurityRestrictionsDefaultAction"],
    scmIpSecurityRestrictions: !item["scmIpSecurityRestrictions"]
      ? item["scmIpSecurityRestrictions"]
      : ipSecurityRestrictionArrayDeserializer(item["scmIpSecurityRestrictions"]),
    scmIpSecurityRestrictionsDefaultAction: item["scmIpSecurityRestrictionsDefaultAction"],
    scmIpSecurityRestrictionsUseMain: item["scmIpSecurityRestrictionsUseMain"],
    http20Enabled: item["http20Enabled"],
    http20ProxyFlag: item["http20ProxyFlag"],
    minTlsVersion: item["minTlsVersion"],
    minTlsCipherSuite: item["minTlsCipherSuite"],
    scmMinTlsVersion: item["scmMinTlsVersion"],
    ftpsState: item["ftpsState"],
    preWarmedInstanceCount: item["preWarmedInstanceCount"],
    functionAppScaleLimit: item["functionAppScaleLimit"],
    elasticWebAppScaleLimit: item["elasticWebAppScaleLimit"],
    healthCheckPath: item["healthCheckPath"],
    functionsRuntimeScaleMonitoringEnabled: item["functionsRuntimeScaleMonitoringEnabled"],
    websiteTimeZone: item["websiteTimeZone"],
    minimumElasticInstanceCount: item["minimumElasticInstanceCount"],
    azureStorageAccounts: !item["azureStorageAccounts"]
      ? item["azureStorageAccounts"]
      : azureStorageInfoValueRecordDeserializer(item["azureStorageAccounts"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function connStringInfoArraySerializer(result: Array<ConnStringInfo>): any[] {
  return result.map((item) => {
    return connStringInfoSerializer(item);
  });
}

export function connStringInfoArrayDeserializer(result: Array<ConnStringInfo>): any[] {
  return result.map((item) => {
    return connStringInfoDeserializer(item);
  });
}

/** Database connection string information. */
export interface ConnStringInfo {
  /** Name of connection string. */
  name?: string;
  /** Connection string value. */
  connectionString?: string;
  /** Type of database. */
  type?: ConnectionStringType;
}

export function connStringInfoSerializer(item: ConnStringInfo): any {
  return { name: item["name"], connectionString: item["connectionString"], type: item["type"] };
}

export function connStringInfoDeserializer(item: any): ConnStringInfo {
  return {
    name: item["name"],
    connectionString: item["connectionString"],
    type: item["type"],
  };
}

/** Type of database. */
export type ConnectionStringType =
  | "MySql"
  | "SQLServer"
  | "SQLAzure"
  | "Custom"
  | "NotificationHub"
  | "ServiceBus"
  | "EventHub"
  | "ApiHub"
  | "DocDb"
  | "RedisCache"
  | "PostgreSQL";

/** MachineKey of an app. */
export interface SiteMachineKey {
  /** MachineKey validation. */
  validation?: string;
  /** Validation key. */
  validationKey?: string;
  /** Algorithm used for decryption. */
  decryption?: string;
  /** Decryption key. */
  decryptionKey?: string;
}

export function siteMachineKeyDeserializer(item: any): SiteMachineKey {
  return {
    validation: item["validation"],
    validationKey: item["validationKey"],
    decryption: item["decryption"],
    decryptionKey: item["decryptionKey"],
  };
}

export function handlerMappingArraySerializer(result: Array<HandlerMapping>): any[] {
  return result.map((item) => {
    return handlerMappingSerializer(item);
  });
}

export function handlerMappingArrayDeserializer(result: Array<HandlerMapping>): any[] {
  return result.map((item) => {
    return handlerMappingDeserializer(item);
  });
}

/**
 * The IIS handler mappings used to define which handler processes HTTP requests with certain extension.
 * For example, it is used to configure php-cgi.exe process to handle all HTTP requests with *.php extension.
 */
export interface HandlerMapping {
  /** Requests with this extension will be handled using the specified FastCGI application. */
  extension?: string;
  /** The absolute path to the FastCGI application. */
  scriptProcessor?: string;
  /** Command-line arguments to be passed to the script processor. */
  arguments?: string;
}

export function handlerMappingSerializer(item: HandlerMapping): any {
  return {
    extension: item["extension"],
    scriptProcessor: item["scriptProcessor"],
    arguments: item["arguments"],
  };
}

export function handlerMappingDeserializer(item: any): HandlerMapping {
  return {
    extension: item["extension"],
    scriptProcessor: item["scriptProcessor"],
    arguments: item["arguments"],
  };
}

/** SCM type. */
export enum KnownScmType {
  /** None */
  None = "None",
  /** Dropbox */
  Dropbox = "Dropbox",
  /** Tfs */
  Tfs = "Tfs",
  /** LocalGit */
  LocalGit = "LocalGit",
  /** GitHub */
  GitHub = "GitHub",
  /** CodePlexGit */
  CodePlexGit = "CodePlexGit",
  /** CodePlexHg */
  CodePlexHg = "CodePlexHg",
  /** BitbucketGit */
  BitbucketGit = "BitbucketGit",
  /** BitbucketHg */
  BitbucketHg = "BitbucketHg",
  /** ExternalGit */
  ExternalGit = "ExternalGit",
  /** ExternalHg */
  ExternalHg = "ExternalHg",
  /** OneDrive */
  OneDrive = "OneDrive",
  /** VSO */
  VSO = "VSO",
  /** VSTSRM */
  Vstsrm = "VSTSRM",
}

/**
 * SCM type. \
 * {@link KnownScmType} can be used interchangeably with ScmType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Dropbox** \
 * **Tfs** \
 * **LocalGit** \
 * **GitHub** \
 * **CodePlexGit** \
 * **CodePlexHg** \
 * **BitbucketGit** \
 * **BitbucketHg** \
 * **ExternalGit** \
 * **ExternalHg** \
 * **OneDrive** \
 * **VSO** \
 * **VSTSRM**
 */
export type ScmType = string;
/** Managed pipeline mode. */
export type ManagedPipelineMode = "Integrated" | "Classic";

export function virtualApplicationArraySerializer(result: Array<VirtualApplication>): any[] {
  return result.map((item) => {
    return virtualApplicationSerializer(item);
  });
}

export function virtualApplicationArrayDeserializer(result: Array<VirtualApplication>): any[] {
  return result.map((item) => {
    return virtualApplicationDeserializer(item);
  });
}

/** Virtual application in an app. */
export interface VirtualApplication {
  /** Virtual path. */
  virtualPath?: string;
  /** Physical path. */
  physicalPath?: string;
  /** <code>true</code> if preloading is enabled; otherwise, <code>false</code>. */
  preloadEnabled?: boolean;
  /** Virtual directories for virtual application. */
  virtualDirectories?: VirtualDirectory[];
}

export function virtualApplicationSerializer(item: VirtualApplication): any {
  return {
    virtualPath: item["virtualPath"],
    physicalPath: item["physicalPath"],
    preloadEnabled: item["preloadEnabled"],
    virtualDirectories: !item["virtualDirectories"]
      ? item["virtualDirectories"]
      : virtualDirectoryArraySerializer(item["virtualDirectories"]),
  };
}

export function virtualApplicationDeserializer(item: any): VirtualApplication {
  return {
    virtualPath: item["virtualPath"],
    physicalPath: item["physicalPath"],
    preloadEnabled: item["preloadEnabled"],
    virtualDirectories: !item["virtualDirectories"]
      ? item["virtualDirectories"]
      : virtualDirectoryArrayDeserializer(item["virtualDirectories"]),
  };
}

export function virtualDirectoryArraySerializer(result: Array<VirtualDirectory>): any[] {
  return result.map((item) => {
    return virtualDirectorySerializer(item);
  });
}

export function virtualDirectoryArrayDeserializer(result: Array<VirtualDirectory>): any[] {
  return result.map((item) => {
    return virtualDirectoryDeserializer(item);
  });
}

/** Directory for virtual application. */
export interface VirtualDirectory {
  /** Path to virtual application. */
  virtualPath?: string;
  /** Physical path. */
  physicalPath?: string;
}

export function virtualDirectorySerializer(item: VirtualDirectory): any {
  return { virtualPath: item["virtualPath"], physicalPath: item["physicalPath"] };
}

export function virtualDirectoryDeserializer(item: any): VirtualDirectory {
  return {
    virtualPath: item["virtualPath"],
    physicalPath: item["physicalPath"],
  };
}

/** Site load balancing. */
export type SiteLoadBalancing =
  | "WeightedRoundRobin"
  | "LeastRequests"
  | "LeastResponseTime"
  | "WeightedTotalTraffic"
  | "RequestHash"
  | "PerSiteRoundRobin"
  | "LeastRequestsWithTieBreaker";

/** Routing rules in production experiments. */
export interface Experiments {
  /** List of ramp-up rules. */
  rampUpRules?: RampUpRule[];
}

export function experimentsSerializer(item: Experiments): any {
  return {
    rampUpRules: !item["rampUpRules"]
      ? item["rampUpRules"]
      : rampUpRuleArraySerializer(item["rampUpRules"]),
  };
}

export function experimentsDeserializer(item: any): Experiments {
  return {
    rampUpRules: !item["rampUpRules"]
      ? item["rampUpRules"]
      : rampUpRuleArrayDeserializer(item["rampUpRules"]),
  };
}

export function rampUpRuleArraySerializer(result: Array<RampUpRule>): any[] {
  return result.map((item) => {
    return rampUpRuleSerializer(item);
  });
}

export function rampUpRuleArrayDeserializer(result: Array<RampUpRule>): any[] {
  return result.map((item) => {
    return rampUpRuleDeserializer(item);
  });
}

/** Routing rules for ramp up testing. This rule allows to redirect static traffic % to a slot or to gradually change routing % based on performance. */
export interface RampUpRule {
  /** Hostname of a slot to which the traffic will be redirected if decided to. E.g. myapp-stage.azurewebsites.net. */
  actionHostName?: string;
  /** Percentage of the traffic which will be redirected to <code>ActionHostName</code>. */
  reroutePercentage?: number;
  /**
   * In auto ramp up scenario this is the step to add/remove from <code>ReroutePercentage</code> until it reaches \n<code>MinReroutePercentage</code> or
   * <code>MaxReroutePercentage</code>. Site metrics are checked every N minutes specified in <code>ChangeIntervalInMinutes</code>.\nCustom decision algorithm
   * can be provided in TiPCallback site extension which URL can be specified in <code>ChangeDecisionCallbackUrl</code>.
   */
  changeStep?: number;
  /** Specifies interval in minutes to reevaluate ReroutePercentage. */
  changeIntervalInMinutes?: number;
  /** Specifies lower boundary above which ReroutePercentage will stay. */
  minReroutePercentage?: number;
  /** Specifies upper boundary below which ReroutePercentage will stay. */
  maxReroutePercentage?: number;
  /** Custom decision algorithm can be provided in TiPCallback site extension which URL can be specified. */
  changeDecisionCallbackUrl?: string;
  /** Name of the routing rule. The recommended name would be to point to the slot which will receive the traffic in the experiment. */
  name?: string;
}

export function rampUpRuleSerializer(item: RampUpRule): any {
  return {
    actionHostName: item["actionHostName"],
    reroutePercentage: item["reroutePercentage"],
    changeStep: item["changeStep"],
    changeIntervalInMinutes: item["changeIntervalInMinutes"],
    minReroutePercentage: item["minReroutePercentage"],
    maxReroutePercentage: item["maxReroutePercentage"],
    changeDecisionCallbackUrl: item["changeDecisionCallbackUrl"],
    name: item["name"],
  };
}

export function rampUpRuleDeserializer(item: any): RampUpRule {
  return {
    actionHostName: item["actionHostName"],
    reroutePercentage: item["reroutePercentage"],
    changeStep: item["changeStep"],
    changeIntervalInMinutes: item["changeIntervalInMinutes"],
    minReroutePercentage: item["minReroutePercentage"],
    maxReroutePercentage: item["maxReroutePercentage"],
    changeDecisionCallbackUrl: item["changeDecisionCallbackUrl"],
    name: item["name"],
  };
}

/** Metric limits set on an app. */
export interface SiteLimits {
  /** Maximum allowed CPU usage percentage. */
  maxPercentageCpu?: number;
  /** Maximum allowed memory usage in MB. */
  maxMemoryInMb?: number;
  /** Maximum allowed disk size usage in MB. */
  maxDiskSizeInMb?: number;
}

export function siteLimitsSerializer(item: SiteLimits): any {
  return {
    maxPercentageCpu: item["maxPercentageCpu"],
    maxMemoryInMb: item["maxMemoryInMb"],
    maxDiskSizeInMb: item["maxDiskSizeInMb"],
  };
}

export function siteLimitsDeserializer(item: any): SiteLimits {
  return {
    maxPercentageCpu: item["maxPercentageCpu"],
    maxMemoryInMb: item["maxMemoryInMb"],
    maxDiskSizeInMb: item["maxDiskSizeInMb"],
  };
}

/** Rules that can be defined for auto-heal. */
export interface AutoHealRules {
  /** Conditions that describe when to execute the auto-heal actions. */
  triggers?: AutoHealTriggers;
  /** Actions to be executed when a rule is triggered. */
  actions?: AutoHealActions;
}

export function autoHealRulesSerializer(item: AutoHealRules): any {
  return {
    triggers: !item["triggers"] ? item["triggers"] : autoHealTriggersSerializer(item["triggers"]),
    actions: !item["actions"] ? item["actions"] : autoHealActionsSerializer(item["actions"]),
  };
}

export function autoHealRulesDeserializer(item: any): AutoHealRules {
  return {
    triggers: !item["triggers"] ? item["triggers"] : autoHealTriggersDeserializer(item["triggers"]),
    actions: !item["actions"] ? item["actions"] : autoHealActionsDeserializer(item["actions"]),
  };
}

/** Triggers for auto-heal. */
export interface AutoHealTriggers {
  /** A rule based on total requests. */
  requests?: RequestsBasedTrigger;
  /** A rule based on private bytes. */
  privateBytesInKB?: number;
  /** A rule based on status codes. */
  statusCodes?: StatusCodesBasedTrigger[];
  /** A rule based on request execution time. */
  slowRequests?: SlowRequestsBasedTrigger;
  /** A rule based on multiple Slow Requests Rule with path */
  slowRequestsWithPath?: SlowRequestsBasedTrigger[];
  /** A rule based on status codes ranges. */
  statusCodesRange?: StatusCodesRangeBasedTrigger[];
}

export function autoHealTriggersSerializer(item: AutoHealTriggers): any {
  return {
    requests: !item["requests"]
      ? item["requests"]
      : requestsBasedTriggerSerializer(item["requests"]),
    privateBytesInKB: item["privateBytesInKB"],
    statusCodes: !item["statusCodes"]
      ? item["statusCodes"]
      : statusCodesBasedTriggerArraySerializer(item["statusCodes"]),
    slowRequests: !item["slowRequests"]
      ? item["slowRequests"]
      : slowRequestsBasedTriggerSerializer(item["slowRequests"]),
    slowRequestsWithPath: !item["slowRequestsWithPath"]
      ? item["slowRequestsWithPath"]
      : slowRequestsBasedTriggerArraySerializer(item["slowRequestsWithPath"]),
    statusCodesRange: !item["statusCodesRange"]
      ? item["statusCodesRange"]
      : statusCodesRangeBasedTriggerArraySerializer(item["statusCodesRange"]),
  };
}

export function autoHealTriggersDeserializer(item: any): AutoHealTriggers {
  return {
    requests: !item["requests"]
      ? item["requests"]
      : requestsBasedTriggerDeserializer(item["requests"]),
    privateBytesInKB: item["privateBytesInKB"],
    statusCodes: !item["statusCodes"]
      ? item["statusCodes"]
      : statusCodesBasedTriggerArrayDeserializer(item["statusCodes"]),
    slowRequests: !item["slowRequests"]
      ? item["slowRequests"]
      : slowRequestsBasedTriggerDeserializer(item["slowRequests"]),
    slowRequestsWithPath: !item["slowRequestsWithPath"]
      ? item["slowRequestsWithPath"]
      : slowRequestsBasedTriggerArrayDeserializer(item["slowRequestsWithPath"]),
    statusCodesRange: !item["statusCodesRange"]
      ? item["statusCodesRange"]
      : statusCodesRangeBasedTriggerArrayDeserializer(item["statusCodesRange"]),
  };
}

/** Trigger based on total requests. */
export interface RequestsBasedTrigger {
  /** Request Count. */
  count?: number;
  /** Time interval. */
  timeInterval?: string;
}

export function requestsBasedTriggerSerializer(item: RequestsBasedTrigger): any {
  return { count: item["count"], timeInterval: item["timeInterval"] };
}

export function requestsBasedTriggerDeserializer(item: any): RequestsBasedTrigger {
  return {
    count: item["count"],
    timeInterval: item["timeInterval"],
  };
}

export function statusCodesBasedTriggerArraySerializer(
  result: Array<StatusCodesBasedTrigger>,
): any[] {
  return result.map((item) => {
    return statusCodesBasedTriggerSerializer(item);
  });
}

export function statusCodesBasedTriggerArrayDeserializer(
  result: Array<StatusCodesBasedTrigger>,
): any[] {
  return result.map((item) => {
    return statusCodesBasedTriggerDeserializer(item);
  });
}

/** Trigger based on status code. */
export interface StatusCodesBasedTrigger {
  /** HTTP status code. */
  status?: number;
  /** Request Sub Status. */
  subStatus?: number;
  /** Win32 error code. */
  win32Status?: number;
  /** Request Count. */
  count?: number;
  /** Time interval. */
  timeInterval?: string;
  /** Request Path */
  path?: string;
}

export function statusCodesBasedTriggerSerializer(item: StatusCodesBasedTrigger): any {
  return {
    status: item["status"],
    subStatus: item["subStatus"],
    win32Status: item["win32Status"],
    count: item["count"],
    timeInterval: item["timeInterval"],
    path: item["path"],
  };
}

export function statusCodesBasedTriggerDeserializer(item: any): StatusCodesBasedTrigger {
  return {
    status: item["status"],
    subStatus: item["subStatus"],
    win32Status: item["win32Status"],
    count: item["count"],
    timeInterval: item["timeInterval"],
    path: item["path"],
  };
}

/** Trigger based on request execution time. */
export interface SlowRequestsBasedTrigger {
  /** Time taken. */
  timeTaken?: string;
  /** Request Path. */
  path?: string;
  /** Request Count. */
  count?: number;
  /** Time interval. */
  timeInterval?: string;
}

export function slowRequestsBasedTriggerSerializer(item: SlowRequestsBasedTrigger): any {
  return {
    timeTaken: item["timeTaken"],
    path: item["path"],
    count: item["count"],
    timeInterval: item["timeInterval"],
  };
}

export function slowRequestsBasedTriggerDeserializer(item: any): SlowRequestsBasedTrigger {
  return {
    timeTaken: item["timeTaken"],
    path: item["path"],
    count: item["count"],
    timeInterval: item["timeInterval"],
  };
}

export function slowRequestsBasedTriggerArraySerializer(
  result: Array<SlowRequestsBasedTrigger>,
): any[] {
  return result.map((item) => {
    return slowRequestsBasedTriggerSerializer(item);
  });
}

export function slowRequestsBasedTriggerArrayDeserializer(
  result: Array<SlowRequestsBasedTrigger>,
): any[] {
  return result.map((item) => {
    return slowRequestsBasedTriggerDeserializer(item);
  });
}

export function statusCodesRangeBasedTriggerArraySerializer(
  result: Array<StatusCodesRangeBasedTrigger>,
): any[] {
  return result.map((item) => {
    return statusCodesRangeBasedTriggerSerializer(item);
  });
}

export function statusCodesRangeBasedTriggerArrayDeserializer(
  result: Array<StatusCodesRangeBasedTrigger>,
): any[] {
  return result.map((item) => {
    return statusCodesRangeBasedTriggerDeserializer(item);
  });
}

/** Trigger based on range of status codes. */
export interface StatusCodesRangeBasedTrigger {
  /** HTTP status code. */
  statusCodes?: string;
  path?: string;
  /** Request Count. */
  count?: number;
  /** Time interval. */
  timeInterval?: string;
}

export function statusCodesRangeBasedTriggerSerializer(item: StatusCodesRangeBasedTrigger): any {
  return {
    statusCodes: item["statusCodes"],
    path: item["path"],
    count: item["count"],
    timeInterval: item["timeInterval"],
  };
}

export function statusCodesRangeBasedTriggerDeserializer(item: any): StatusCodesRangeBasedTrigger {
  return {
    statusCodes: item["statusCodes"],
    path: item["path"],
    count: item["count"],
    timeInterval: item["timeInterval"],
  };
}

/** Actions which to take by the auto-heal module when a rule is triggered. */
export interface AutoHealActions {
  /** Predefined action to be taken. */
  actionType?: AutoHealActionType;
  /** Custom action to be taken. */
  customAction?: AutoHealCustomAction;
  /**
   * Minimum time the process must execute
   * before taking the action
   */
  minProcessExecutionTime?: string;
}

export function autoHealActionsSerializer(item: AutoHealActions): any {
  return {
    actionType: item["actionType"],
    customAction: !item["customAction"]
      ? item["customAction"]
      : autoHealCustomActionSerializer(item["customAction"]),
    minProcessExecutionTime: item["minProcessExecutionTime"],
  };
}

export function autoHealActionsDeserializer(item: any): AutoHealActions {
  return {
    actionType: item["actionType"],
    customAction: !item["customAction"]
      ? item["customAction"]
      : autoHealCustomActionDeserializer(item["customAction"]),
    minProcessExecutionTime: item["minProcessExecutionTime"],
  };
}

/** Predefined action to be taken. */
export type AutoHealActionType = "Recycle" | "LogEvent" | "CustomAction";

/**
 * Custom action to be executed
 * when an auto heal rule is triggered.
 */
export interface AutoHealCustomAction {
  /** Executable to be run. */
  exe?: string;
  /** Parameters for the executable. */
  parameters?: string;
}

export function autoHealCustomActionSerializer(item: AutoHealCustomAction): any {
  return { exe: item["exe"], parameters: item["parameters"] };
}

export function autoHealCustomActionDeserializer(item: any): AutoHealCustomAction {
  return {
    exe: item["exe"],
    parameters: item["parameters"],
  };
}

/** Cross-Origin Resource Sharing (CORS) settings for the app. */
export interface CorsSettings {
  /**
   * Gets or sets the list of origins that should be allowed to make cross-origin
   * calls (for example: http://example.com:12345). Use "*" to allow all.
   */
  allowedOrigins?: string[];
  /**
   * Gets or sets whether CORS requests with credentials are allowed. See
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Requests_with_credentials
   * for more details.
   */
  supportCredentials?: boolean;
}

export function corsSettingsSerializer(item: CorsSettings): any {
  return {
    allowedOrigins: !item["allowedOrigins"]
      ? item["allowedOrigins"]
      : item["allowedOrigins"].map((p: any) => {
          return p;
        }),
    supportCredentials: item["supportCredentials"],
  };
}

export function corsSettingsDeserializer(item: any): CorsSettings {
  return {
    allowedOrigins: !item["allowedOrigins"]
      ? item["allowedOrigins"]
      : item["allowedOrigins"].map((p: any) => {
          return p;
        }),
    supportCredentials: item["supportCredentials"],
  };
}

/** Push settings for the App. */
export interface PushSettings extends ProxyOnlyResource {
  /** Gets or sets a flag indicating whether the Push endpoint is enabled. */
  isPushEnabled?: boolean;
  /** Gets or sets a JSON string containing a list of tags that are whitelisted for use by the push registration endpoint. */
  tagWhitelistJson?: string;
  /**
   * Gets or sets a JSON string containing a list of tags that require user authentication to be used in the push registration endpoint.
   * Tags can consist of alphanumeric characters and the following:
   * '_', '@', '#', '.', ':', '-'.
   * Validation should be performed at the PushRequestHandler.
   */
  tagsRequiringAuth?: string;
  /** Gets or sets a JSON string containing a list of dynamic tags that will be evaluated from user claims in the push registration endpoint. */
  dynamicTagsJson?: string;
}

export function pushSettingsSerializer(item: PushSettings): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "isPushEnabled",
      "tagWhitelistJson",
      "tagsRequiringAuth",
      "dynamicTagsJson",
    ])
      ? undefined
      : _pushSettingsPropertiesSerializer(item),
  };
}

export function pushSettingsDeserializer(item: any): PushSettings {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _pushSettingsPropertiesDeserializer(item["properties"])),
  };
}

/** PushSettings resource specific properties */
export interface PushSettingsProperties {
  /** Gets or sets a flag indicating whether the Push endpoint is enabled. */
  isPushEnabled: boolean;
  /** Gets or sets a JSON string containing a list of tags that are whitelisted for use by the push registration endpoint. */
  tagWhitelistJson?: string;
  /**
   * Gets or sets a JSON string containing a list of tags that require user authentication to be used in the push registration endpoint.
   * Tags can consist of alphanumeric characters and the following:
   * '_', '@', '#', '.', ':', '-'.
   * Validation should be performed at the PushRequestHandler.
   */
  tagsRequiringAuth?: string;
  /** Gets or sets a JSON string containing a list of dynamic tags that will be evaluated from user claims in the push registration endpoint. */
  dynamicTagsJson?: string;
}

export function pushSettingsPropertiesSerializer(item: PushSettingsProperties): any {
  return {
    isPushEnabled: item["isPushEnabled"],
    tagWhitelistJson: item["tagWhitelistJson"],
    tagsRequiringAuth: item["tagsRequiringAuth"],
    dynamicTagsJson: item["dynamicTagsJson"],
  };
}

export function pushSettingsPropertiesDeserializer(item: any): PushSettingsProperties {
  return {
    isPushEnabled: item["isPushEnabled"],
    tagWhitelistJson: item["tagWhitelistJson"],
    tagsRequiringAuth: item["tagsRequiringAuth"],
    dynamicTagsJson: item["dynamicTagsJson"],
  };
}

/** Information about the formal API definition for the app. */
export interface ApiDefinitionInfo {
  /** The URL of the API definition. */
  url?: string;
}

export function apiDefinitionInfoSerializer(item: ApiDefinitionInfo): any {
  return { url: item["url"] };
}

export function apiDefinitionInfoDeserializer(item: any): ApiDefinitionInfo {
  return {
    url: item["url"],
  };
}

/** Azure API management (APIM) configuration linked to the app. */
export interface ApiManagementConfig {
  /** APIM-Api Identifier. */
  id?: string;
}

export function apiManagementConfigSerializer(item: ApiManagementConfig): any {
  return { id: item["id"] };
}

export function apiManagementConfigDeserializer(item: any): ApiManagementConfig {
  return {
    id: item["id"],
  };
}

export function ipSecurityRestrictionArraySerializer(result: Array<IpSecurityRestriction>): any[] {
  return result.map((item) => {
    return ipSecurityRestrictionSerializer(item);
  });
}

export function ipSecurityRestrictionArrayDeserializer(
  result: Array<IpSecurityRestriction>,
): any[] {
  return result.map((item) => {
    return ipSecurityRestrictionDeserializer(item);
  });
}

/** IP security restriction on an app. */
export interface IpSecurityRestriction {
  /**
   * IP address the security restriction is valid for.
   * It can be in form of pure ipv4 address (required SubnetMask property) or
   * CIDR notation such as ipv4/mask (leading bit match). For CIDR,
   * SubnetMask property must not be specified.
   */
  ipAddress?: string;
  /** Subnet mask for the range of IP addresses the restriction is valid for. */
  subnetMask?: string;
  /** Virtual network resource id */
  vnetSubnetResourceId?: string;
  /** (internal) Vnet traffic tag */
  vnetTrafficTag?: number;
  /** (internal) Subnet traffic tag */
  subnetTrafficTag?: number;
  /** Allow or Deny access for this IP range. */
  action?: string;
  /** Defines what this IP filter will be used for. This is to support IP filtering on proxies. */
  tag?: IpFilterTag;
  /** Priority of IP restriction rule. */
  priority?: number;
  /** IP restriction rule name. */
  name?: string;
  /** IP restriction rule description. */
  description?: string;
  /**
   * IP restriction rule headers.
   * X-Forwarded-Host (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Host#Examples).
   * The matching logic is ..
   * - If the property is null or empty (default), all hosts(or lack of) are allowed.
   * - A value is compared using ordinal-ignore-case (excluding port number).
   * - Subdomain wildcards are permitted but don't match the root domain. For example, *.contoso.com matches the subdomain foo.contoso.com
   * but not the root domain contoso.com or multi-level foo.bar.contoso.com
   * - Unicode host names are allowed but are converted to Punycode for matching.
   *
   * X-Forwarded-For (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For#Examples).
   * The matching logic is ..
   * - If the property is null or empty (default), any forwarded-for chains (or lack of) are allowed.
   * - If any address (excluding port number) in the chain (comma separated) matches the CIDR defined by the property.
   *
   * X-Azure-FDID and X-FD-HealthProbe.
   * The matching logic is exact match.
   */
  headers?: Record<string, string[]>;
}

export function ipSecurityRestrictionSerializer(item: IpSecurityRestriction): any {
  return {
    ipAddress: item["ipAddress"],
    subnetMask: item["subnetMask"],
    vnetSubnetResourceId: item["vnetSubnetResourceId"],
    vnetTrafficTag: item["vnetTrafficTag"],
    subnetTrafficTag: item["subnetTrafficTag"],
    action: item["action"],
    tag: item["tag"],
    priority: item["priority"],
    name: item["name"],
    description: item["description"],
    headers: item["headers"],
  };
}

export function ipSecurityRestrictionDeserializer(item: any): IpSecurityRestriction {
  return {
    ipAddress: item["ipAddress"],
    subnetMask: item["subnetMask"],
    vnetSubnetResourceId: item["vnetSubnetResourceId"],
    vnetTrafficTag: item["vnetTrafficTag"],
    subnetTrafficTag: item["subnetTrafficTag"],
    action: item["action"],
    tag: item["tag"],
    priority: item["priority"],
    name: item["name"],
    description: item["description"],
    headers: !item["headers"]
      ? item["headers"]
      : Object.fromEntries(
          Object.entries(item["headers"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
  };
}

/** Defines what this IP filter will be used for. This is to support IP filtering on proxies. */
export enum KnownIpFilterTag {
  /** Default */
  Default = "Default",
  /** XffProxy */
  XffProxy = "XffProxy",
  /** ServiceTag */
  ServiceTag = "ServiceTag",
}

/**
 * Defines what this IP filter will be used for. This is to support IP filtering on proxies. \
 * {@link KnownIpFilterTag} can be used interchangeably with IpFilterTag,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **XffProxy** \
 * **ServiceTag**
 */
export type IpFilterTag = string;

/** Default action for main access restriction if no rules are matched. */
export enum KnownDefaultAction {
  /** Allow */
  Allow = "Allow",
  /** Deny */
  Deny = "Deny",
}

/**
 * Default action for main access restriction if no rules are matched. \
 * {@link KnownDefaultAction} can be used interchangeably with DefaultAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow** \
 * **Deny**
 */
export type DefaultAction = string;

/** MinTlsVersion: configures the minimum version of TLS required for SSL requests */
export enum KnownSupportedTlsVersions {
  /** 1.0 */
  One0 = "1.0",
  /** 1.1 */
  One1 = "1.1",
  /** 1.2 */
  One2 = "1.2",
  /** 1.3 */
  One3 = "1.3",
}

/**
 * MinTlsVersion: configures the minimum version of TLS required for SSL requests \
 * {@link KnownSupportedTlsVersions} can be used interchangeably with SupportedTlsVersions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **1.0** \
 * **1.1** \
 * **1.2** \
 * **1.3**
 */
export type SupportedTlsVersions = string;

/** The minimum strength TLS cipher suite allowed for an application */
export enum KnownTlsCipherSuites {
  /** TLS_AES_256_GCM_SHA384 */
  TLSAES256GCMSHA384 = "TLS_AES_256_GCM_SHA384",
  /** TLS_AES_128_GCM_SHA256 */
  TLSAES128GCMSHA256 = "TLS_AES_128_GCM_SHA256",
  /** TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384 */
  TLSEcdheEcdsaWithAES256GCMSHA384 = "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384",
  /** TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256 */
  TLSEcdheEcdsaWithAES128CBCSHA256 = "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256",
  /** TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256 */
  TLSEcdheEcdsaWithAES128GCMSHA256 = "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256",
  /** TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 */
  TLSEcdheRSAWithAES256GCMSHA384 = "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
  /** TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 */
  TLSEcdheRSAWithAES128GCMSHA256 = "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
  /** TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384 */
  TLSEcdheRSAWithAES256CBCSHA384 = "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384",
  /** TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256 */
  TLSEcdheRSAWithAES128CBCSHA256 = "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256",
  /** TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA */
  TLSEcdheRSAWithAES256CBCSHA = "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA",
  /** TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA */
  TLSEcdheRSAWithAES128CBCSHA = "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA",
  /** TLS_RSA_WITH_AES_256_GCM_SHA384 */
  TLSRSAWithAES256GCMSHA384 = "TLS_RSA_WITH_AES_256_GCM_SHA384",
  /** TLS_RSA_WITH_AES_128_GCM_SHA256 */
  TLSRSAWithAES128GCMSHA256 = "TLS_RSA_WITH_AES_128_GCM_SHA256",
  /** TLS_RSA_WITH_AES_256_CBC_SHA256 */
  TLSRSAWithAES256CBCSHA256 = "TLS_RSA_WITH_AES_256_CBC_SHA256",
  /** TLS_RSA_WITH_AES_128_CBC_SHA256 */
  TLSRSAWithAES128CBCSHA256 = "TLS_RSA_WITH_AES_128_CBC_SHA256",
  /** TLS_RSA_WITH_AES_256_CBC_SHA */
  TLSRSAWithAES256CBCSHA = "TLS_RSA_WITH_AES_256_CBC_SHA",
  /** TLS_RSA_WITH_AES_128_CBC_SHA */
  TLSRSAWithAES128CBCSHA = "TLS_RSA_WITH_AES_128_CBC_SHA",
}

/**
 * The minimum strength TLS cipher suite allowed for an application \
 * {@link KnownTlsCipherSuites} can be used interchangeably with TlsCipherSuites,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TLS_AES_256_GCM_SHA384** \
 * **TLS_AES_128_GCM_SHA256** \
 * **TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384** \
 * **TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256** \
 * **TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256** \
 * **TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384** \
 * **TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256** \
 * **TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384** \
 * **TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256** \
 * **TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA** \
 * **TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA** \
 * **TLS_RSA_WITH_AES_256_GCM_SHA384** \
 * **TLS_RSA_WITH_AES_128_GCM_SHA256** \
 * **TLS_RSA_WITH_AES_256_CBC_SHA256** \
 * **TLS_RSA_WITH_AES_128_CBC_SHA256** \
 * **TLS_RSA_WITH_AES_256_CBC_SHA** \
 * **TLS_RSA_WITH_AES_128_CBC_SHA**
 */
export type TlsCipherSuites = string;

/** State of FTP / FTPS service */
export enum KnownFtpsState {
  /** AllAllowed */
  AllAllowed = "AllAllowed",
  /** FtpsOnly */
  FtpsOnly = "FtpsOnly",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * State of FTP / FTPS service \
 * {@link KnownFtpsState} can be used interchangeably with FtpsState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllAllowed** \
 * **FtpsOnly** \
 * **Disabled**
 */
export type FtpsState = string;

export function azureStorageInfoValueRecordSerializer(
  item: Record<string, AzureStorageInfoValue>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : azureStorageInfoValueSerializer(item[key]);
  });
  return result;
}

export function azureStorageInfoValueRecordDeserializer(
  item: Record<string, any>,
): Record<string, AzureStorageInfoValue> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : azureStorageInfoValueDeserializer(item[key]);
  });
  return result;
}

/** Azure Files or Blob Storage access information value for dictionary storage. */
export interface AzureStorageInfoValue {
  /** Type of storage. */
  type?: AzureStorageType;
  /** Name of the storage account. */
  accountName?: string;
  /** Name of the file share (container name, for Blob storage). */
  shareName?: string;
  /** Access key for the storage account. */
  accessKey?: string;
  /** Path to mount the storage within the site's runtime environment. */
  mountPath?: string;
  /** State of the storage account. */
  readonly state?: AzureStorageState;
  /** Mounting protocol to use for the storage account. */
  protocol?: AzureStorageProtocol;
}

export function azureStorageInfoValueSerializer(item: AzureStorageInfoValue): any {
  return {
    type: item["type"],
    accountName: item["accountName"],
    shareName: item["shareName"],
    accessKey: item["accessKey"],
    mountPath: item["mountPath"],
    protocol: item["protocol"],
  };
}

export function azureStorageInfoValueDeserializer(item: any): AzureStorageInfoValue {
  return {
    type: item["type"],
    accountName: item["accountName"],
    shareName: item["shareName"],
    accessKey: item["accessKey"],
    mountPath: item["mountPath"],
    state: item["state"],
    protocol: item["protocol"],
  };
}

/** Type of storage. */
export type AzureStorageType = "AzureFiles" | "AzureBlob";
/** State of the storage account. */
export type AzureStorageState = "Ok" | "InvalidCredentials" | "InvalidShare" | "NotValidated";

/** Mounting protocol to use for the storage account. */
export enum KnownAzureStorageProtocol {
  /** Smb */
  Smb = "Smb",
  /** Http */
  Http = "Http",
  /** Nfs */
  Nfs = "Nfs",
}

/**
 * Mounting protocol to use for the storage account. \
 * {@link KnownAzureStorageProtocol} can be used interchangeably with AzureStorageProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Smb** \
 * **Http** \
 * **Nfs**
 */
export type AzureStorageProtocol = string;

/** Function app configuration. */
export interface FunctionAppConfig {
  /** Function app deployment configuration. */
  deployment?: FunctionsDeployment;
  /** Function app runtime settings. */
  runtime?: FunctionsRuntime;
  /** Function app scale and concurrency settings. */
  scaleAndConcurrency?: FunctionsScaleAndConcurrency;
  /** Function app site update strategy configuration. */
  siteUpdateStrategy?: FunctionsSiteUpdateStrategy;
}

export function functionAppConfigSerializer(item: FunctionAppConfig): any {
  return {
    deployment: !item["deployment"]
      ? item["deployment"]
      : functionsDeploymentSerializer(item["deployment"]),
    runtime: !item["runtime"] ? item["runtime"] : functionsRuntimeSerializer(item["runtime"]),
    scaleAndConcurrency: !item["scaleAndConcurrency"]
      ? item["scaleAndConcurrency"]
      : functionsScaleAndConcurrencySerializer(item["scaleAndConcurrency"]),
    siteUpdateStrategy: !item["siteUpdateStrategy"]
      ? item["siteUpdateStrategy"]
      : functionsSiteUpdateStrategySerializer(item["siteUpdateStrategy"]),
  };
}

export function functionAppConfigDeserializer(item: any): FunctionAppConfig {
  return {
    deployment: !item["deployment"]
      ? item["deployment"]
      : functionsDeploymentDeserializer(item["deployment"]),
    runtime: !item["runtime"] ? item["runtime"] : functionsRuntimeDeserializer(item["runtime"]),
    scaleAndConcurrency: !item["scaleAndConcurrency"]
      ? item["scaleAndConcurrency"]
      : functionsScaleAndConcurrencyDeserializer(item["scaleAndConcurrency"]),
    siteUpdateStrategy: !item["siteUpdateStrategy"]
      ? item["siteUpdateStrategy"]
      : functionsSiteUpdateStrategyDeserializer(item["siteUpdateStrategy"]),
  };
}

/** Configuration section for the function app deployment. */
export interface FunctionsDeployment {
  /** Storage for deployed package used by the function app. */
  storage?: FunctionsDeploymentStorage;
}

export function functionsDeploymentSerializer(item: FunctionsDeployment): any {
  return {
    storage: !item["storage"]
      ? item["storage"]
      : functionsDeploymentStorageSerializer(item["storage"]),
  };
}

export function functionsDeploymentDeserializer(item: any): FunctionsDeployment {
  return {
    storage: !item["storage"]
      ? item["storage"]
      : functionsDeploymentStorageDeserializer(item["storage"]),
  };
}

/** Storage for deployed package used by the function app. */
export interface FunctionsDeploymentStorage {
  /** Property to select Azure Storage type. Available options: blobContainer. */
  type?: FunctionsDeploymentStorageType;
  /** Property to set the URL for the selected Azure Storage type. Example: For blobContainer, the value could be https://<storageAccountName>.blob.core.windows.net/<containerName>. */
  value?: string;
  /** Authentication method to access the storage account for deployment. */
  authentication?: FunctionsDeploymentStorageAuthentication;
}

export function functionsDeploymentStorageSerializer(item: FunctionsDeploymentStorage): any {
  return {
    type: item["type"],
    value: item["value"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : functionsDeploymentStorageAuthenticationSerializer(item["authentication"]),
  };
}

export function functionsDeploymentStorageDeserializer(item: any): FunctionsDeploymentStorage {
  return {
    type: item["type"],
    value: item["value"],
    authentication: !item["authentication"]
      ? item["authentication"]
      : functionsDeploymentStorageAuthenticationDeserializer(item["authentication"]),
  };
}

/** Property to select Azure Storage type. Available options: blobContainer. */
export enum KnownFunctionsDeploymentStorageType {
  /** blobContainer */
  BlobContainer = "blobContainer",
}

/**
 * Property to select Azure Storage type. Available options: blobContainer. \
 * {@link KnownFunctionsDeploymentStorageType} can be used interchangeably with FunctionsDeploymentStorageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **blobContainer**
 */
export type FunctionsDeploymentStorageType = string;

/** Authentication method to access the storage account for deployment. */
export interface FunctionsDeploymentStorageAuthentication {
  /** Property to select authentication type to access the selected storage account. Available options: SystemAssignedIdentity, UserAssignedIdentity, StorageAccountConnectionString. */
  type?: AuthenticationType;
  /** Use this property for UserAssignedIdentity. Set the resource ID of the identity. Do not set a value for this property when using other authentication type. */
  userAssignedIdentityResourceId?: string;
  /** Use this property for StorageAccountConnectionString. Set the name of the app setting that has the storage account connection string. Do not set a value for this property when using other authentication type. */
  storageAccountConnectionStringName?: string;
}

export function functionsDeploymentStorageAuthenticationSerializer(
  item: FunctionsDeploymentStorageAuthentication,
): any {
  return {
    type: item["type"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
    storageAccountConnectionStringName: item["storageAccountConnectionStringName"],
  };
}

export function functionsDeploymentStorageAuthenticationDeserializer(
  item: any,
): FunctionsDeploymentStorageAuthentication {
  return {
    type: item["type"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
    storageAccountConnectionStringName: item["storageAccountConnectionStringName"],
  };
}

/** Property to select authentication type to access the selected storage account. Available options: SystemAssignedIdentity, UserAssignedIdentity, StorageAccountConnectionString. */
export enum KnownAuthenticationType {
  /** SystemAssignedIdentity */
  SystemAssignedIdentity = "SystemAssignedIdentity",
  /** UserAssignedIdentity */
  UserAssignedIdentity = "UserAssignedIdentity",
  /** StorageAccountConnectionString */
  StorageAccountConnectionString = "StorageAccountConnectionString",
}

/**
 * Property to select authentication type to access the selected storage account. Available options: SystemAssignedIdentity, UserAssignedIdentity, StorageAccountConnectionString. \
 * {@link KnownAuthenticationType} can be used interchangeably with AuthenticationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssignedIdentity** \
 * **UserAssignedIdentity** \
 * **StorageAccountConnectionString**
 */
export type AuthenticationType = string;

/** Function app runtime name and version. */
export interface FunctionsRuntime {
  /** Function app runtime name. Available options: dotnet-isolated, node, java, powershell, python, custom */
  name?: RuntimeName;
  /** Function app runtime version. Example: 8 (for dotnet-isolated) */
  version?: string;
}

export function functionsRuntimeSerializer(item: FunctionsRuntime): any {
  return { name: item["name"], version: item["version"] };
}

export function functionsRuntimeDeserializer(item: any): FunctionsRuntime {
  return {
    name: item["name"],
    version: item["version"],
  };
}

/** Function app runtime name. Available options: dotnet-isolated, node, java, powershell, python, custom */
export enum KnownRuntimeName {
  /** dotnet-isolated */
  DotnetIsolated = "dotnet-isolated",
  /** node */
  Node = "node",
  /** java */
  Java = "java",
  /** powershell */
  Powershell = "powershell",
  /** python */
  Python = "python",
  /** custom */
  Custom = "custom",
}

/**
 * Function app runtime name. Available options: dotnet-isolated, node, java, powershell, python, custom \
 * {@link KnownRuntimeName} can be used interchangeably with RuntimeName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **dotnet-isolated** \
 * **node** \
 * **java** \
 * **powershell** \
 * **python** \
 * **custom**
 */
export type RuntimeName = string;

/** Scale and concurrency settings for the function app. */
export interface FunctionsScaleAndConcurrency {
  /** 'Always Ready' configuration for the function app. */
  alwaysReady?: FunctionsAlwaysReadyConfig[];
  /** The maximum number of instances for the function app. */
  maximumInstanceCount?: number;
  /** Set the amount of memory allocated to each instance of the function app in MB. CPU and network bandwidth are allocated proportionally. */
  instanceMemoryMB?: number;
  /** Scale and concurrency settings for the function app triggers. */
  triggers?: FunctionsScaleAndConcurrencyTriggers;
}

export function functionsScaleAndConcurrencySerializer(item: FunctionsScaleAndConcurrency): any {
  return {
    alwaysReady: !item["alwaysReady"]
      ? item["alwaysReady"]
      : functionsAlwaysReadyConfigArraySerializer(item["alwaysReady"]),
    maximumInstanceCount: item["maximumInstanceCount"],
    instanceMemoryMB: item["instanceMemoryMB"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : functionsScaleAndConcurrencyTriggersSerializer(item["triggers"]),
  };
}

export function functionsScaleAndConcurrencyDeserializer(item: any): FunctionsScaleAndConcurrency {
  return {
    alwaysReady: !item["alwaysReady"]
      ? item["alwaysReady"]
      : functionsAlwaysReadyConfigArrayDeserializer(item["alwaysReady"]),
    maximumInstanceCount: item["maximumInstanceCount"],
    instanceMemoryMB: item["instanceMemoryMB"],
    triggers: !item["triggers"]
      ? item["triggers"]
      : functionsScaleAndConcurrencyTriggersDeserializer(item["triggers"]),
  };
}

export function functionsAlwaysReadyConfigArraySerializer(
  result: Array<FunctionsAlwaysReadyConfig>,
): any[] {
  return result.map((item) => {
    return functionsAlwaysReadyConfigSerializer(item);
  });
}

export function functionsAlwaysReadyConfigArrayDeserializer(
  result: Array<FunctionsAlwaysReadyConfig>,
): any[] {
  return result.map((item) => {
    return functionsAlwaysReadyConfigDeserializer(item);
  });
}

/** Sets the number of 'Always Ready' instances for a function group or a specific function. */
export interface FunctionsAlwaysReadyConfig {
  /** Either a function group or a function name is required. For additional information see https://aka.ms/flexconsumption/alwaysready. */
  name?: string;
  /** Sets the number of 'Always Ready' instances for a given function group or a specific function. For additional information see https://aka.ms/flexconsumption/alwaysready. */
  instanceCount?: number;
}

export function functionsAlwaysReadyConfigSerializer(item: FunctionsAlwaysReadyConfig): any {
  return { name: item["name"], instanceCount: item["instanceCount"] };
}

export function functionsAlwaysReadyConfigDeserializer(item: any): FunctionsAlwaysReadyConfig {
  return {
    name: item["name"],
    instanceCount: item["instanceCount"],
  };
}

/** Scale and concurrency settings for the function app triggers. */
export interface FunctionsScaleAndConcurrencyTriggers {
  /** Scale and concurrency settings for the HTTP trigger. */
  http?: FunctionsScaleAndConcurrencyTriggersHttp;
}

export function functionsScaleAndConcurrencyTriggersSerializer(
  item: FunctionsScaleAndConcurrencyTriggers,
): any {
  return {
    http: !item["http"]
      ? item["http"]
      : functionsScaleAndConcurrencyTriggersHttpSerializer(item["http"]),
  };
}

export function functionsScaleAndConcurrencyTriggersDeserializer(
  item: any,
): FunctionsScaleAndConcurrencyTriggers {
  return {
    http: !item["http"]
      ? item["http"]
      : functionsScaleAndConcurrencyTriggersHttpDeserializer(item["http"]),
  };
}

/** Scale and concurrency settings for the HTTP trigger. */
export interface FunctionsScaleAndConcurrencyTriggersHttp {
  /** The maximum number of concurrent HTTP trigger invocations per instance. */
  perInstanceConcurrency?: number;
}

export function functionsScaleAndConcurrencyTriggersHttpSerializer(
  item: FunctionsScaleAndConcurrencyTriggersHttp,
): any {
  return { perInstanceConcurrency: item["perInstanceConcurrency"] };
}

export function functionsScaleAndConcurrencyTriggersHttpDeserializer(
  item: any,
): FunctionsScaleAndConcurrencyTriggersHttp {
  return {
    perInstanceConcurrency: item["perInstanceConcurrency"],
  };
}

/** Function app site update strategy configuration for deployments and site config updates. */
export interface FunctionsSiteUpdateStrategy {
  /** Function app site update strategy type. Available options: Recreate, RollingUpdate */
  type?: SiteUpdateStrategyType;
}

export function functionsSiteUpdateStrategySerializer(item: FunctionsSiteUpdateStrategy): any {
  return { type: item["type"] };
}

export function functionsSiteUpdateStrategyDeserializer(item: any): FunctionsSiteUpdateStrategy {
  return {
    type: item["type"],
  };
}

/** Function app site update strategy type. Available options: Recreate, RollingUpdate */
export enum KnownSiteUpdateStrategyType {
  /**
   * If the app is under load and a deployment or site state update occurs, all pods will be removed
   * and will need to be Recreated all at once. This is the default behavior.
   */
  Recreate = "Recreate",
  /**
   * If the app is under load and a deployment or site state update occurs, pods will be drained in
   * batches and gradually replaced, thus minimizing impact to throughput.
   */
  RollingUpdate = "RollingUpdate",
}

/**
 * Function app site update strategy type. Available options: Recreate, RollingUpdate \
 * {@link KnownSiteUpdateStrategyType} can be used interchangeably with SiteUpdateStrategyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Recreate**: If the app is under load and a deployment or site state update occurs, all pods will be removed
 * and will need to be Recreated all at once. This is the default behavior. \
 * **RollingUpdate**: If the app is under load and a deployment or site state update occurs, pods will be drained in
 * batches and gradually replaced, thus minimizing impact to throughput.
 */
export type SiteUpdateStrategyType = string;

/** App Dapr configuration. */
export interface DaprConfig {
  /** Boolean indicating if the Dapr side car is enabled */
  enabled?: boolean;
  /** Dapr application identifier */
  appId?: string;
  /** Tells Dapr which port your application is listening on */
  appPort?: number;
  /** Dapr max size of http header read buffer in KB to handle when sending multi-KB headers. Default is 65KB. */
  httpReadBufferSize?: number;
  /** Increasing max size of request body http servers parameter in MB to handle uploading of big files. Default is 4 MB. */
  httpMaxRequestSize?: number;
  /** Sets the log level for the Dapr sidecar. Allowed values are debug, info, warn, error. Default is info. */
  logLevel?: DaprLogLevel;
  /** Enables API logging for the Dapr sidecar */
  enableApiLogging?: boolean;
}

export function daprConfigSerializer(item: DaprConfig): any {
  return {
    enabled: item["enabled"],
    appId: item["appId"],
    appPort: item["appPort"],
    httpReadBufferSize: item["httpReadBufferSize"],
    httpMaxRequestSize: item["httpMaxRequestSize"],
    logLevel: item["logLevel"],
    enableApiLogging: item["enableApiLogging"],
  };
}

export function daprConfigDeserializer(item: any): DaprConfig {
  return {
    enabled: item["enabled"],
    appId: item["appId"],
    appPort: item["appPort"],
    httpReadBufferSize: item["httpReadBufferSize"],
    httpMaxRequestSize: item["httpMaxRequestSize"],
    logLevel: item["logLevel"],
    enableApiLogging: item["enableApiLogging"],
  };
}

/** Sets the log level for the Dapr sidecar. Allowed values are debug, info, warn, error. Default is info. */
export enum KnownDaprLogLevel {
  /** info */
  Info = "info",
  /** debug */
  Debug = "debug",
  /** warn */
  Warn = "warn",
  /** error */
  Error = "error",
}

/**
 * Sets the log level for the Dapr sidecar. Allowed values are debug, info, warn, error. Default is info. \
 * {@link KnownDaprLogLevel} can be used interchangeably with DaprLogLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **info** \
 * **debug** \
 * **warn** \
 * **error**
 */
export type DaprLogLevel = string;

/** Function app resource requirements. */
export interface ResourceConfig {
  /** Required CPU in cores, e.g. 0.5 */
  cpu?: number;
  /** Required memory, e.g. "1Gi" */
  memory?: string;
}

export function resourceConfigSerializer(item: ResourceConfig): any {
  return { cpu: item["cpu"], memory: item["memory"] };
}

export function resourceConfigDeserializer(item: any): ResourceConfig {
  return {
    cpu: item["cpu"],
    memory: item["memory"],
  };
}

/** Specification for an App Service Environment to use for this resource. */
export interface HostingEnvironmentProfile {
  /** Resource ID of the App Service Environment. */
  id?: string;
  /** Name of the App Service Environment. */
  readonly name?: string;
  /** Resource type of the App Service Environment. */
  readonly type?: string;
}

export function hostingEnvironmentProfileSerializer(item: HostingEnvironmentProfile): any {
  return { id: item["id"] };
}

export function hostingEnvironmentProfileDeserializer(item: any): HostingEnvironmentProfile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/**
 * This composes with ClientCertEnabled setting.
 * - ClientCertEnabled: false means ClientCert is ignored.
 * - ClientCertEnabled: true and ClientCertMode: Required means ClientCert is required.
 * - ClientCertEnabled: true and ClientCertMode: Optional means ClientCert is optional or accepted.
 */
export type ClientCertMode = "Required" | "Optional" | "OptionalInteractiveUser";
/** Specifies the IP mode of the app. */
export type IPMode = "IPv4" | "IPv6" | "IPv4AndIPv6";

/** Information needed for cloning operation. */
export interface CloningInfo {
  /**
   * Correlation ID of cloning operation. This ID ties multiple cloning operations
   * together to use the same snapshot.
   */
  correlationId?: string;
  /** <code>true</code> to overwrite destination app; otherwise, <code>false</code>. */
  overwrite?: boolean;
  /** <code>true</code> to clone custom hostnames from source app; otherwise, <code>false</code>. */
  cloneCustomHostNames?: boolean;
  /** <code>true</code> to clone source control from source app; otherwise, <code>false</code>. */
  cloneSourceControl?: boolean;
  /**
   * ARM resource ID of the source app. App resource ID is of the form
   * /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName} for production slots and
   * /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slotName} for other slots.
   */
  sourceWebAppId: string;
  /** Location of source app ex: West US or North Europe */
  sourceWebAppLocation?: string;
  /** App Service Environment. */
  hostingEnvironment?: string;
  /**
   * Application setting overrides for cloned app. If specified, these settings override the settings cloned
   * from source app. Otherwise, application settings from source app are retained.
   */
  appSettingsOverrides?: Record<string, string>;
  /** <code>true</code> to configure load balancing for source and destination app. */
  configureLoadBalancing?: boolean;
  /**
   * ARM resource ID of the Traffic Manager profile to use, if it exists. Traffic Manager resource ID is of the form
   * /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficManagerProfiles/{profileName}.
   */
  trafficManagerProfileId?: string;
  /** Name of Traffic Manager profile to create. This is only needed if Traffic Manager profile does not already exist. */
  trafficManagerProfileName?: string;
}

export function cloningInfoSerializer(item: CloningInfo): any {
  return {
    correlationId: item["correlationId"],
    overwrite: item["overwrite"],
    cloneCustomHostNames: item["cloneCustomHostNames"],
    cloneSourceControl: item["cloneSourceControl"],
    sourceWebAppId: item["sourceWebAppId"],
    sourceWebAppLocation: item["sourceWebAppLocation"],
    hostingEnvironment: item["hostingEnvironment"],
    appSettingsOverrides: item["appSettingsOverrides"],
    configureLoadBalancing: item["configureLoadBalancing"],
    trafficManagerProfileId: item["trafficManagerProfileId"],
    trafficManagerProfileName: item["trafficManagerProfileName"],
  };
}

export function cloningInfoDeserializer(item: any): CloningInfo {
  return {
    correlationId: item["correlationId"],
    overwrite: item["overwrite"],
    cloneCustomHostNames: item["cloneCustomHostNames"],
    cloneSourceControl: item["cloneSourceControl"],
    sourceWebAppId: item["sourceWebAppId"],
    sourceWebAppLocation: item["sourceWebAppLocation"],
    hostingEnvironment: item["hostingEnvironment"],
    appSettingsOverrides: !item["appSettingsOverrides"]
      ? item["appSettingsOverrides"]
      : Object.fromEntries(
          Object.entries(item["appSettingsOverrides"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    configureLoadBalancing: item["configureLoadBalancing"],
    trafficManagerProfileId: item["trafficManagerProfileId"],
    trafficManagerProfileName: item["trafficManagerProfileName"],
  };
}

/** The status of the last successful slot swap operation. */
export interface SlotSwapStatus {
  /** The time the last successful slot swap completed. */
  readonly timestampUtc?: Date;
  /** The source slot of the last swap operation. */
  readonly sourceSlotName?: string;
  /** The destination slot of the last swap operation. */
  readonly destinationSlotName?: string;
}

export function slotSwapStatusDeserializer(item: any): SlotSwapStatus {
  return {
    timestampUtc: !item["timestampUtc"] ? item["timestampUtc"] : new Date(item["timestampUtc"]),
    sourceSlotName: item["sourceSlotName"],
    destinationSlotName: item["destinationSlotName"],
  };
}

/** Site redundancy mode */
export type RedundancyMode = "None" | "Manual" | "Failover" | "ActiveActive" | "GeoRedundant";
/** Specifies the scope of uniqueness for the default hostname during resource creation */
export type AutoGeneratedDomainNameLabelScope =
  | "TenantReuse"
  | "SubscriptionReuse"
  | "ResourceGroupReuse"
  | "NoReuse";

/** Managed service identity. */
export interface ManagedServiceIdentity {
  /** Type of managed service identity. */
  type?: ManagedServiceIdentityType;
  /** Tenant of managed service identity. */
  readonly tenantId?: string;
  /** Principal Id of managed service identity. */
  readonly principalId?: string;
  /** The list of user assigned identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName} */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    type: item["type"],
    tenantId: item["tenantId"],
    principalId: item["principalId"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Type of managed service identity. */
export type ManagedServiceIdentityType =
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | "None";

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

/** User Assigned identity. */
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

/** Extended Location. */
export interface ExtendedLocation {
  /** Name of extended location. */
  name?: string;
  /** Type of extended location. */
  readonly type?: string;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { name: item["name"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** Diagnostics for an App Service Environment. */
export interface HostingEnvironmentDiagnostics {
  /** Name/identifier of the diagnostics. */
  name?: string;
  /** Diagnostics output. */
  diagnosticsOutput?: string;
}

export function hostingEnvironmentDiagnosticsDeserializer(
  item: any,
): HostingEnvironmentDiagnostics {
  return {
    name: item["name"],
    diagnosticsOutput: item["diagnosticsOutput"],
  };
}

/** Collection of Inbound Environment Endpoints */
export interface _InboundEnvironmentEndpointCollection {
  /** The InboundEnvironmentEndpoint items on this page */
  value: InboundEnvironmentEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _inboundEnvironmentEndpointCollectionDeserializer(
  item: any,
): _InboundEnvironmentEndpointCollection {
  return {
    value: inboundEnvironmentEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function inboundEnvironmentEndpointArrayDeserializer(
  result: Array<InboundEnvironmentEndpoint>,
): any[] {
  return result.map((item) => {
    return inboundEnvironmentEndpointDeserializer(item);
  });
}

/** The IP Addresses and Ports that require inbound network access to and within the subnet of the App Service Environment. */
export interface InboundEnvironmentEndpoint {
  /** Short text describing the purpose of the network traffic. */
  description?: string;
  /** The IP addresses that network traffic will originate from in cidr notation. */
  endpoints?: string[];
  /** The ports that network traffic will arrive to the App Service Environment at. */
  ports?: string[];
}

export function inboundEnvironmentEndpointDeserializer(item: any): InboundEnvironmentEndpoint {
  return {
    description: item["description"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : item["endpoints"].map((p: any) => {
          return p;
        }),
    ports: !item["ports"]
      ? item["ports"]
      : item["ports"].map((p: any) => {
          return p;
        }),
  };
}

/** An operation on a resource. */
export interface Operation {
  /** Operation ID. */
  id?: string;
  /** Operation name. */
  name?: string;
  /** The current status of the operation. */
  status?: OperationStatus;
  /** Any errors associate with the operation. */
  errors?: ErrorEntity[];
  /** Time when operation has started. */
  createdTime?: Date;
  /** Time when operation has been updated. */
  modifiedTime?: Date;
  /** Time when operation will expire. */
  expirationTime?: Date;
  /** Applicable only for stamp operation ids. */
  geoMasterOperationId?: string;
}

export function operationDeserializer(item: any): Operation {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    errors: !item["errors"] ? item["errors"] : errorEntityArrayDeserializer(item["errors"]),
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    modifiedTime: !item["modifiedTime"] ? item["modifiedTime"] : new Date(item["modifiedTime"]),
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
    geoMasterOperationId: item["geoMasterOperationId"],
  };
}

/** The current status of the operation. */
export type OperationStatus = "InProgress" | "Failed" | "Succeeded" | "TimedOut" | "Created";

export function errorEntityArrayDeserializer(result: Array<ErrorEntity>): any[] {
  return result.map((item) => {
    return errorEntityDeserializer(item);
  });
}

/** Body of the error response returned from the API. */
export interface ErrorEntity {
  /** Type of error. */
  extendedCode?: string;
  /** Message template. */
  messageTemplate?: string;
  /** Parameters for the template. */
  parameters?: string[];
  /** Inner errors. */
  innerErrors?: ErrorEntity[];
  /** Error Details. */
  details?: ErrorEntity[];
  /** The error target. */
  target?: string;
  /** Basic error code. */
  code?: string;
  /** Any details of the error. */
  message?: string;
}

export function errorEntityDeserializer(item: any): ErrorEntity {
  return {
    extendedCode: item["extendedCode"],
    messageTemplate: item["messageTemplate"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : item["parameters"].map((p: any) => {
          return p;
        }),
    innerErrors: !item["innerErrors"]
      ? item["innerErrors"]
      : errorEntityArrayDeserializer(item["innerErrors"]),
    details: !item["details"] ? item["details"] : errorEntityArrayDeserializer(item["details"]),
    target: item["target"],
    code: item["code"],
    message: item["message"],
  };
}

/** Paged collection of OutboundEnvironmentEndpoint items */
export interface _OutboundEnvironmentEndpointCollection {
  /** The OutboundEnvironmentEndpoint items on this page */
  value: OutboundEnvironmentEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _outboundEnvironmentEndpointCollectionDeserializer(
  item: any,
): _OutboundEnvironmentEndpointCollection {
  return {
    value: outboundEnvironmentEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function outboundEnvironmentEndpointArrayDeserializer(
  result: Array<OutboundEnvironmentEndpoint>,
): any[] {
  return result.map((item) => {
    return outboundEnvironmentEndpointDeserializer(item);
  });
}

/** Endpoints accessed for a common purpose that the App Service Environment requires outbound network access to. */
export interface OutboundEnvironmentEndpoint {
  /** The type of service accessed by the App Service Environment, e.g., Azure Storage, Azure SQL Database, and Azure Active Directory. */
  category?: string;
  /** The endpoints that the App Service Environment reaches the service at. */
  endpoints?: EndpointDependency[];
}

export function outboundEnvironmentEndpointDeserializer(item: any): OutboundEnvironmentEndpoint {
  return {
    category: item["category"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointDependencyArrayDeserializer(item["endpoints"]),
  };
}

export function endpointDependencyArrayDeserializer(result: Array<EndpointDependency>): any[] {
  return result.map((item) => {
    return endpointDependencyDeserializer(item);
  });
}

/** A domain name that a service is reached at, including details of the current connection status. */
export interface EndpointDependency {
  /** The domain name of the dependency. */
  domainName?: string;
  /** The IP Addresses and Ports used when connecting to DomainName. */
  endpointDetails?: EndpointDetail[];
}

export function endpointDependencyDeserializer(item: any): EndpointDependency {
  return {
    domainName: item["domainName"],
    endpointDetails: !item["endpointDetails"]
      ? item["endpointDetails"]
      : endpointDetailArrayDeserializer(item["endpointDetails"]),
  };
}

export function endpointDetailArrayDeserializer(result: Array<EndpointDetail>): any[] {
  return result.map((item) => {
    return endpointDetailDeserializer(item);
  });
}

/** Current TCP connectivity information from the App Service Environment to a single endpoint. */
export interface EndpointDetail {
  /** An IP Address that Domain Name currently resolves to. */
  ipAddress?: string;
  /** The port an endpoint is connected to. */
  port?: number;
  /** The time in milliseconds it takes for a TCP connection to be created from the App Service Environment to this IpAddress at this Port. */
  latency?: number;
  /** Whether it is possible to create a TCP connection from the App Service Environment to this IpAddress at this Port. */
  isAccessible?: boolean;
}

export function endpointDetailDeserializer(item: any): EndpointDetail {
  return {
    ipAddress: item["ipAddress"],
    port: item["port"],
    latency: item["latency"],
    isAccessible: item["isAccessible"],
  };
}

/** Wrapper for a collection of private link resources */
export interface PrivateLinkResourcesWrapper {
  value: PrivateLinkResource[];
}

export function privateLinkResourcesWrapperDeserializer(item: any): PrivateLinkResourcesWrapper {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private link resource */
export interface PrivateLinkResource {
  id: string;
  /** Name of a private link resource */
  name: string;
  type: string;
  /** Properties of a private link resource */
  properties: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a private link resource */
export interface PrivateLinkResourceProperties {
  /** GroupId of a private link resource */
  readonly groupId?: string;
  /** RequiredMembers of a private link resource */
  readonly requiredMembers?: string[];
  /** RequiredZoneNames of a private link resource */
  readonly requiredZoneNames?: string[];
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

/** Collection of App Service plans. */
export interface _AppServicePlanCollection {
  /** The AppServicePlan items on this page */
  value: AppServicePlan[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _appServicePlanCollectionDeserializer(item: any): _AppServicePlanCollection {
  return {
    value: appServicePlanArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function appServicePlanArraySerializer(result: Array<AppServicePlan>): any[] {
  return result.map((item) => {
    return appServicePlanSerializer(item);
  });
}

export function appServicePlanArrayDeserializer(result: Array<AppServicePlan>): any[] {
  return result.map((item) => {
    return appServicePlanDeserializer(item);
  });
}

/** App Service plan. */
export interface AppServicePlan extends TrackedResource {
  /** Description of a SKU for a scalable resource. */
  sku?: SkuDescription;
  /** Extended Location. */
  extendedLocation?: ExtendedLocation;
  /** Kind of resource. If the resource is an app, you can refer to https://github.com/Azure/app-service-linux-docs/blob/master/Things_You_Should_Know/kind_property.md#app-service-resource-kind-reference for details supported values for kind. */
  kind?: string;
  /** Managed service identity. */
  identity?: ManagedServiceIdentity;
  /** Target worker tier assigned to the App Service plan. */
  workerTierName?: string;
  /** App Service plan status. */
  readonly status?: StatusOptions;
  /** App Service plan subscription. */
  readonly subscription?: string;
  /** Specification for the App Service Environment to use for the App Service plan. */
  hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /** Maximum number of instances that can be assigned to this App Service plan. */
  readonly maximumNumberOfWorkers?: number;
  /** The number of instances that are assigned to this App Service plan. */
  readonly numberOfWorkers?: number;
  /** Geographical location for the App Service plan. */
  readonly geoRegion?: string;
  /**
   * If <code>true</code>, apps assigned to this App Service plan can be scaled independently.
   * If <code>false</code>, apps assigned to this App Service plan will scale to all instances of the plan.
   */
  perSiteScaling?: boolean;
  /** ServerFarm supports ElasticScale. Apps in this plan will scale as if the ServerFarm was ElasticPremium sku */
  elasticScaleEnabled?: boolean;
  /** Maximum number of total workers allowed for this ElasticScaleEnabled App Service Plan */
  maximumElasticWorkerCount?: number;
  /** Number of apps assigned to this App Service plan. */
  readonly numberOfSites?: number;
  /** If <code>true</code>, this App Service Plan owns spot instances. */
  isSpot?: boolean;
  /** The time when the server farm expires. Valid only if it is a spot server farm. */
  spotExpirationTime?: Date;
  /** The time when the server farm free offer expires. */
  freeOfferExpirationTime?: Date;
  /** Resource group of the App Service plan. */
  readonly resourceGroup?: string;
  /** If Linux app service plan <code>true</code>, <code>false</code> otherwise. */
  reserved?: boolean;
  /** Obsolete: If Hyper-V container app service plan <code>true</code>, <code>false</code> otherwise. */
  isXenon?: boolean;
  /** If Hyper-V container app service plan <code>true</code>, <code>false</code> otherwise. */
  hyperV?: boolean;
  /** Scaling worker count. */
  targetWorkerCount?: number;
  /** Scaling worker size ID. */
  targetWorkerSizeId?: number;
  /** Provisioning state of the App Service Plan. */
  readonly provisioningState?: ProvisioningState;
  /** Specification for the Kubernetes Environment to use for the App Service plan. */
  kubeEnvironmentProfile?: KubeEnvironmentProfile;
  /**
   * If <code>true</code>, this App Service Plan will perform availability zone balancing.
   * If <code>false</code>, this App Service Plan will not perform availability zone balancing.
   */
  zoneRedundant?: boolean;
  /**
   * If <code>true</code>, this App Service Plan will attempt to scale asynchronously if there are insufficient workers to scale synchronously.
   * If <code>false</code>, this App Service Plan will only attempt sync scaling.
   */
  asyncScalingEnabled?: boolean;
  /** Identity to use by platform for various features and integrations using managed identity. */
  planDefaultIdentity?: DefaultIdentity;
  /** Whether this server farm is in custom mode. */
  isCustomMode?: boolean;
  /** Registry adapters associated with this App Service plan. */
  registryAdapters?: RegistryAdapter[];
  /** Install scripts associated with this App Service plan. */
  installScripts?: InstallScript[];
  /** All network settings for the server farm. */
  network?: ServerFarmNetworkSettings;
  /** Storage mounts associated with this App Service plan. */
  storageMounts?: StorageMount[];
  /**
   * If <code>true</code>, RDP access is enabled for this App Service plan. Only applicable for IsCustomMode ASPs.
   * If <code>false</code>, RDP access is disabled.
   */
  rdpEnabled?: boolean;
}

export function appServicePlanSerializer(item: AppServicePlan): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "workerTierName",
      "hostingEnvironmentProfile",
      "perSiteScaling",
      "elasticScaleEnabled",
      "maximumElasticWorkerCount",
      "isSpot",
      "spotExpirationTime",
      "freeOfferExpirationTime",
      "reserved",
      "isXenon",
      "hyperV",
      "targetWorkerCount",
      "targetWorkerSizeId",
      "kubeEnvironmentProfile",
      "zoneRedundant",
      "asyncScalingEnabled",
      "planDefaultIdentity",
      "isCustomMode",
      "registryAdapters",
      "installScripts",
      "network",
      "storageMounts",
      "rdpEnabled",
    ])
      ? undefined
      : _appServicePlanPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : skuDescriptionSerializer(item["sku"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    kind: item["kind"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function appServicePlanDeserializer(item: any): AppServicePlan {
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
      : _appServicePlanPropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDescriptionDeserializer(item["sku"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    kind: item["kind"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** AppServicePlan resource specific properties */
export interface AppServicePlanProperties {
  /** Target worker tier assigned to the App Service plan. */
  workerTierName?: string;
  /** App Service plan status. */
  readonly status?: StatusOptions;
  /** App Service plan subscription. */
  readonly subscription?: string;
  /** Specification for the App Service Environment to use for the App Service plan. */
  hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /** Maximum number of instances that can be assigned to this App Service plan. */
  readonly maximumNumberOfWorkers?: number;
  /** The number of instances that are assigned to this App Service plan. */
  readonly numberOfWorkers?: number;
  /** Geographical location for the App Service plan. */
  readonly geoRegion?: string;
  /**
   * If <code>true</code>, apps assigned to this App Service plan can be scaled independently.
   * If <code>false</code>, apps assigned to this App Service plan will scale to all instances of the plan.
   */
  perSiteScaling?: boolean;
  /** ServerFarm supports ElasticScale. Apps in this plan will scale as if the ServerFarm was ElasticPremium sku */
  elasticScaleEnabled?: boolean;
  /** Maximum number of total workers allowed for this ElasticScaleEnabled App Service Plan */
  maximumElasticWorkerCount?: number;
  /** Number of apps assigned to this App Service plan. */
  readonly numberOfSites?: number;
  /** If <code>true</code>, this App Service Plan owns spot instances. */
  isSpot?: boolean;
  /** The time when the server farm expires. Valid only if it is a spot server farm. */
  spotExpirationTime?: Date;
  /** The time when the server farm free offer expires. */
  freeOfferExpirationTime?: Date;
  /** Resource group of the App Service plan. */
  readonly resourceGroup?: string;
  /** If Linux app service plan <code>true</code>, <code>false</code> otherwise. */
  reserved?: boolean;
  /** Obsolete: If Hyper-V container app service plan <code>true</code>, <code>false</code> otherwise. */
  isXenon?: boolean;
  /** If Hyper-V container app service plan <code>true</code>, <code>false</code> otherwise. */
  hyperV?: boolean;
  /** Scaling worker count. */
  targetWorkerCount?: number;
  /** Scaling worker size ID. */
  targetWorkerSizeId?: number;
  /** Provisioning state of the App Service Plan. */
  readonly provisioningState?: ProvisioningState;
  /** Specification for the Kubernetes Environment to use for the App Service plan. */
  kubeEnvironmentProfile?: KubeEnvironmentProfile;
  /**
   * If <code>true</code>, this App Service Plan will perform availability zone balancing.
   * If <code>false</code>, this App Service Plan will not perform availability zone balancing.
   */
  zoneRedundant?: boolean;
  /**
   * If <code>true</code>, this App Service Plan will attempt to scale asynchronously if there are insufficient workers to scale synchronously.
   * If <code>false</code>, this App Service Plan will only attempt sync scaling.
   */
  asyncScalingEnabled?: boolean;
  /** Identity to use by platform for various features and integrations using managed identity. */
  planDefaultIdentity?: DefaultIdentity;
  /** Whether this server farm is in custom mode. */
  isCustomMode?: boolean;
  /** Registry adapters associated with this App Service plan. */
  registryAdapters?: RegistryAdapter[];
  /** Install scripts associated with this App Service plan. */
  installScripts?: InstallScript[];
  /** All network settings for the server farm. */
  network?: ServerFarmNetworkSettings;
  /** Storage mounts associated with this App Service plan. */
  storageMounts?: StorageMount[];
  /**
   * If <code>true</code>, RDP access is enabled for this App Service plan. Only applicable for IsCustomMode ASPs.
   * If <code>false</code>, RDP access is disabled.
   */
  rdpEnabled?: boolean;
}

export function appServicePlanPropertiesSerializer(item: AppServicePlanProperties): any {
  return {
    workerTierName: item["workerTierName"],
    hostingEnvironmentProfile: !item["hostingEnvironmentProfile"]
      ? item["hostingEnvironmentProfile"]
      : hostingEnvironmentProfileSerializer(item["hostingEnvironmentProfile"]),
    perSiteScaling: item["perSiteScaling"],
    elasticScaleEnabled: item["elasticScaleEnabled"],
    maximumElasticWorkerCount: item["maximumElasticWorkerCount"],
    isSpot: item["isSpot"],
    spotExpirationTime: !item["spotExpirationTime"]
      ? item["spotExpirationTime"]
      : item["spotExpirationTime"].toISOString(),
    freeOfferExpirationTime: !item["freeOfferExpirationTime"]
      ? item["freeOfferExpirationTime"]
      : item["freeOfferExpirationTime"].toISOString(),
    reserved: item["reserved"],
    isXenon: item["isXenon"],
    hyperV: item["hyperV"],
    targetWorkerCount: item["targetWorkerCount"],
    targetWorkerSizeId: item["targetWorkerSizeId"],
    kubeEnvironmentProfile: !item["kubeEnvironmentProfile"]
      ? item["kubeEnvironmentProfile"]
      : kubeEnvironmentProfileSerializer(item["kubeEnvironmentProfile"]),
    zoneRedundant: item["zoneRedundant"],
    asyncScalingEnabled: item["asyncScalingEnabled"],
    planDefaultIdentity: !item["planDefaultIdentity"]
      ? item["planDefaultIdentity"]
      : defaultIdentitySerializer(item["planDefaultIdentity"]),
    isCustomMode: item["isCustomMode"],
    registryAdapters: !item["registryAdapters"]
      ? item["registryAdapters"]
      : registryAdapterArraySerializer(item["registryAdapters"]),
    installScripts: !item["installScripts"]
      ? item["installScripts"]
      : installScriptArraySerializer(item["installScripts"]),
    network: !item["network"]
      ? item["network"]
      : serverFarmNetworkSettingsSerializer(item["network"]),
    storageMounts: !item["storageMounts"]
      ? item["storageMounts"]
      : storageMountArraySerializer(item["storageMounts"]),
    rdpEnabled: item["rdpEnabled"],
  };
}

export function appServicePlanPropertiesDeserializer(item: any): AppServicePlanProperties {
  return {
    workerTierName: item["workerTierName"],
    status: item["status"],
    subscription: item["subscription"],
    hostingEnvironmentProfile: !item["hostingEnvironmentProfile"]
      ? item["hostingEnvironmentProfile"]
      : hostingEnvironmentProfileDeserializer(item["hostingEnvironmentProfile"]),
    maximumNumberOfWorkers: item["maximumNumberOfWorkers"],
    numberOfWorkers: item["numberOfWorkers"],
    geoRegion: item["geoRegion"],
    perSiteScaling: item["perSiteScaling"],
    elasticScaleEnabled: item["elasticScaleEnabled"],
    maximumElasticWorkerCount: item["maximumElasticWorkerCount"],
    numberOfSites: item["numberOfSites"],
    isSpot: item["isSpot"],
    spotExpirationTime: !item["spotExpirationTime"]
      ? item["spotExpirationTime"]
      : new Date(item["spotExpirationTime"]),
    freeOfferExpirationTime: !item["freeOfferExpirationTime"]
      ? item["freeOfferExpirationTime"]
      : new Date(item["freeOfferExpirationTime"]),
    resourceGroup: item["resourceGroup"],
    reserved: item["reserved"],
    isXenon: item["isXenon"],
    hyperV: item["hyperV"],
    targetWorkerCount: item["targetWorkerCount"],
    targetWorkerSizeId: item["targetWorkerSizeId"],
    provisioningState: item["provisioningState"],
    kubeEnvironmentProfile: !item["kubeEnvironmentProfile"]
      ? item["kubeEnvironmentProfile"]
      : kubeEnvironmentProfileDeserializer(item["kubeEnvironmentProfile"]),
    zoneRedundant: item["zoneRedundant"],
    asyncScalingEnabled: item["asyncScalingEnabled"],
    planDefaultIdentity: !item["planDefaultIdentity"]
      ? item["planDefaultIdentity"]
      : defaultIdentityDeserializer(item["planDefaultIdentity"]),
    isCustomMode: item["isCustomMode"],
    registryAdapters: !item["registryAdapters"]
      ? item["registryAdapters"]
      : registryAdapterArrayDeserializer(item["registryAdapters"]),
    installScripts: !item["installScripts"]
      ? item["installScripts"]
      : installScriptArrayDeserializer(item["installScripts"]),
    network: !item["network"]
      ? item["network"]
      : serverFarmNetworkSettingsDeserializer(item["network"]),
    storageMounts: !item["storageMounts"]
      ? item["storageMounts"]
      : storageMountArrayDeserializer(item["storageMounts"]),
    rdpEnabled: item["rdpEnabled"],
  };
}

/** App Service plan status. */
export type StatusOptions = "Ready" | "Pending" | "Creating";

/** Specification for a Kubernetes Environment to use for this resource. */
export interface KubeEnvironmentProfile {
  /** Resource ID of the Kubernetes Environment. */
  id?: string;
  /** Name of the Kubernetes Environment. */
  readonly name?: string;
  /** Resource type of the Kubernetes Environment. */
  readonly type?: string;
}

export function kubeEnvironmentProfileSerializer(item: KubeEnvironmentProfile): any {
  return { id: item["id"] };
}

export function kubeEnvironmentProfileDeserializer(item: any): KubeEnvironmentProfile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** model interface DefaultIdentity */
export interface DefaultIdentity {
  identityType?: ManagedServiceIdentityType;
  userAssignedIdentityResourceId?: string;
}

export function defaultIdentitySerializer(item: DefaultIdentity): any {
  return {
    identityType: item["identityType"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

export function defaultIdentityDeserializer(item: any): DefaultIdentity {
  return {
    identityType: item["identityType"],
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

export function registryAdapterArraySerializer(result: Array<RegistryAdapter>): any[] {
  return result.map((item) => {
    return registryAdapterSerializer(item);
  });
}

export function registryAdapterArrayDeserializer(result: Array<RegistryAdapter>): any[] {
  return result.map((item) => {
    return registryAdapterDeserializer(item);
  });
}

/** Server farm registry adapter configuration. */
export interface RegistryAdapter {
  /** Registry key for the adapter. */
  registryKey?: string;
  /** Type of the registry adapter. */
  type?: RegistryAdapterType;
  /** Key vault reference to the value that will be placed in the registry location */
  keyVaultSecretReference?: KeyVaultReferenceWithStatus;
}

export function registryAdapterSerializer(item: RegistryAdapter): any {
  return {
    registryKey: item["registryKey"],
    type: item["type"],
    keyVaultSecretReference: !item["keyVaultSecretReference"]
      ? item["keyVaultSecretReference"]
      : keyVaultReferenceWithStatusSerializer(item["keyVaultSecretReference"]),
  };
}

export function registryAdapterDeserializer(item: any): RegistryAdapter {
  return {
    registryKey: item["registryKey"],
    type: item["type"],
    keyVaultSecretReference: !item["keyVaultSecretReference"]
      ? item["keyVaultSecretReference"]
      : keyVaultReferenceWithStatusDeserializer(item["keyVaultSecretReference"]),
  };
}

/** Type of the registry adapter. */
export enum KnownRegistryAdapterType {
  /** Binary */
  Binary = "Binary",
  /** String */
  String = "String",
  /** Expand_String */
  ExpandString = "Expand_String",
  /** Multi_String */
  MultiString = "Multi_String",
  /** DWord */
  DWord = "DWord",
  /** QWord */
  QWord = "QWord",
}

/**
 * Type of the registry adapter. \
 * {@link KnownRegistryAdapterType} can be used interchangeably with RegistryAdapterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Binary** \
 * **String** \
 * **Expand_String** \
 * **Multi_String** \
 * **DWord** \
 * **QWord**
 */
export type RegistryAdapterType = string;

/** Object to hold key vault reference and the resolution status */
export interface KeyVaultReferenceWithStatus {
  /** Key vault secret URI. */
  secretUri?: string;
  /** Reference status of the key vault secret. */
  referenceStatus?: string;
}

export function keyVaultReferenceWithStatusSerializer(item: KeyVaultReferenceWithStatus): any {
  return { secretUri: item["secretUri"], referenceStatus: item["referenceStatus"] };
}

export function keyVaultReferenceWithStatusDeserializer(item: any): KeyVaultReferenceWithStatus {
  return {
    secretUri: item["secretUri"],
    referenceStatus: item["referenceStatus"],
  };
}

export function installScriptArraySerializer(result: Array<InstallScript>): any[] {
  return result.map((item) => {
    return installScriptSerializer(item);
  });
}

export function installScriptArrayDeserializer(result: Array<InstallScript>): any[] {
  return result.map((item) => {
    return installScriptDeserializer(item);
  });
}

/** Server farm install script configuration. */
export interface InstallScript {
  /** Name of the install script. */
  name?: string;
  /** Source of the install script. */
  source?: InstallScriptSource;
}

export function installScriptSerializer(item: InstallScript): any {
  return {
    name: item["name"],
    source: !item["source"] ? item["source"] : installScriptSourceSerializer(item["source"]),
  };
}

export function installScriptDeserializer(item: any): InstallScript {
  return {
    name: item["name"],
    source: !item["source"] ? item["source"] : installScriptSourceDeserializer(item["source"]),
  };
}

/** Object to hold install script reference. */
export interface InstallScriptSource {
  /** Install script source URI where the install script file will be fetched from. */
  sourceUri?: string;
  /** Type of the install script. */
  type?: InstallScriptType;
}

export function installScriptSourceSerializer(item: InstallScriptSource): any {
  return { sourceUri: item["sourceUri"], type: item["type"] };
}

export function installScriptSourceDeserializer(item: any): InstallScriptSource {
  return {
    sourceUri: item["sourceUri"],
    type: item["type"],
  };
}

/** Type of the install script. */
export enum KnownInstallScriptType {
  /** RemoteAzureBlob */
  RemoteAzureBlob = "RemoteAzureBlob",
  /** PlatformStorage */
  PlatformStorage = "PlatformStorage",
}

/**
 * Type of the install script. \
 * {@link KnownInstallScriptType} can be used interchangeably with InstallScriptType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RemoteAzureBlob** \
 * **PlatformStorage**
 */
export type InstallScriptType = string;

/** Network settings for an app service plan. */
export interface ServerFarmNetworkSettings {
  /** Azure Resource Manager ID of the Virtual network and subnet to be joined by Regional VNET Integration. This must be of the form /subscriptions/{subscriptionName}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName} */
  virtualNetworkSubnetId?: string;
}

export function serverFarmNetworkSettingsSerializer(item: ServerFarmNetworkSettings): any {
  return { virtualNetworkSubnetId: item["virtualNetworkSubnetId"] };
}

export function serverFarmNetworkSettingsDeserializer(item: any): ServerFarmNetworkSettings {
  return {
    virtualNetworkSubnetId: item["virtualNetworkSubnetId"],
  };
}

export function storageMountArraySerializer(result: Array<StorageMount>): any[] {
  return result.map((item) => {
    return storageMountSerializer(item);
  });
}

export function storageMountArrayDeserializer(result: Array<StorageMount>): any[] {
  return result.map((item) => {
    return storageMountDeserializer(item);
  });
}

/** Server farm storage mount configuration. */
export interface StorageMount {
  /** Name of the storage mount. */
  name?: string;
  /** Type of the storage mount. */
  type?: StorageMountType;
  /** Source of the fileshare/storage. */
  source?: string;
  /** Path on worker where storage will be mounted. */
  destinationPath?: string;
  /** KV reference to the credentials to connect to the share. */
  credentialsKeyVaultReference?: KeyVaultReferenceWithStatus;
}

export function storageMountSerializer(item: StorageMount): any {
  return {
    name: item["name"],
    type: item["type"],
    source: item["source"],
    destinationPath: item["destinationPath"],
    credentialsKeyVaultReference: !item["credentialsKeyVaultReference"]
      ? item["credentialsKeyVaultReference"]
      : keyVaultReferenceWithStatusSerializer(item["credentialsKeyVaultReference"]),
  };
}

export function storageMountDeserializer(item: any): StorageMount {
  return {
    name: item["name"],
    type: item["type"],
    source: item["source"],
    destinationPath: item["destinationPath"],
    credentialsKeyVaultReference: !item["credentialsKeyVaultReference"]
      ? item["credentialsKeyVaultReference"]
      : keyVaultReferenceWithStatusDeserializer(item["credentialsKeyVaultReference"]),
  };
}

/** Type of the storage mount. */
export enum KnownStorageMountType {
  /** AzureFiles */
  AzureFiles = "AzureFiles",
  /** LocalStorage */
  LocalStorage = "LocalStorage",
  /** FileShare */
  FileShare = "FileShare",
}

/**
 * Type of the storage mount. \
 * {@link KnownStorageMountType} can be used interchangeably with StorageMountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureFiles** \
 * **LocalStorage** \
 * **FileShare**
 */
export type StorageMountType = string;

/** Paged collection of CsmUsageQuota items */
export interface _CsmUsageQuotaCollection {
  /** The CsmUsageQuota items on this page */
  value: CsmUsageQuota[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _csmUsageQuotaCollectionDeserializer(item: any): _CsmUsageQuotaCollection {
  return {
    value: csmUsageQuotaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function csmUsageQuotaArrayDeserializer(result: Array<CsmUsageQuota>): any[] {
  return result.map((item) => {
    return csmUsageQuotaDeserializer(item);
  });
}

/** Usage of the quota resource. */
export interface CsmUsageQuota {
  /** Units of measurement for the quota resource. */
  unit?: string;
  /** Next reset time for the resource counter. */
  nextResetTime?: Date;
  /** The current value of the resource counter. */
  currentValue?: number;
  /** The resource limit. */
  limit?: number;
  /** Quota name. */
  name?: LocalizableString;
}

export function csmUsageQuotaDeserializer(item: any): CsmUsageQuota {
  return {
    unit: item["unit"],
    nextResetTime: !item["nextResetTime"] ? item["nextResetTime"] : new Date(item["nextResetTime"]),
    currentValue: item["currentValue"],
    limit: item["limit"],
    name: !item["name"] ? item["name"] : localizableStringDeserializer(item["name"]),
  };
}

/** Localizable string object containing the name and a localized value. */
export interface LocalizableString {
  /** Non-localized name. */
  value?: string;
  /** Localized name. */
  localizedValue?: string;
}

export function localizableStringDeserializer(item: any): LocalizableString {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** Describes main public IP address and any extra virtual IPs. */
export interface AddressResponse extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Main public virtual IP. */
  serviceIpAddress?: string;
  /** Virtual Network internal IP address of the App Service Environment if it is in internal load-balancing mode. */
  internalIpAddress?: string;
  /** IP addresses appearing on outbound connections. */
  outboundIpAddresses?: string[];
  /** Additional virtual IPs. */
  vipMappings?: VirtualIPMapping[];
}

export function addressResponseDeserializer(item: any): AddressResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _addressResponsePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** AddressResponse resource specific properties */
export interface AddressResponseProperties {
  /** Main public virtual IP. */
  serviceIpAddress?: string;
  /** Virtual Network internal IP address of the App Service Environment if it is in internal load-balancing mode. */
  internalIpAddress?: string;
  /** IP addresses appearing on outbound connections. */
  outboundIpAddresses?: string[];
  /** Additional virtual IPs. */
  vipMappings?: VirtualIPMapping[];
}

export function addressResponsePropertiesDeserializer(item: any): AddressResponseProperties {
  return {
    serviceIpAddress: item["serviceIpAddress"],
    internalIpAddress: item["internalIpAddress"],
    outboundIpAddresses: !item["outboundIpAddresses"]
      ? item["outboundIpAddresses"]
      : item["outboundIpAddresses"].map((p: any) => {
          return p;
        }),
    vipMappings: !item["vipMappings"]
      ? item["vipMappings"]
      : virtualIPMappingArrayDeserializer(item["vipMappings"]),
  };
}

export function virtualIPMappingArrayDeserializer(result: Array<VirtualIPMapping>): any[] {
  return result.map((item) => {
    return virtualIPMappingDeserializer(item);
  });
}

/** Virtual IP mapping. */
export interface VirtualIPMapping {
  /** Virtual IP address. */
  virtualIP?: string;
  /** Internal HTTP port. */
  internalHttpPort?: number;
  /** Internal HTTPS port. */
  internalHttpsPort?: number;
  /** Is virtual IP mapping in use. */
  inUse?: boolean;
  /** name of the service that virtual IP is assigned to */
  serviceName?: string;
}

export function virtualIPMappingDeserializer(item: any): VirtualIPMapping {
  return {
    virtualIP: item["virtualIP"],
    internalHttpPort: item["internalHttpPort"],
    internalHttpsPort: item["internalHttpsPort"],
    inUse: item["inUse"],
    serviceName: item["serviceName"],
  };
}

/** Remote Private Endpoint Connection ARM resource. */
export interface RemotePrivateEndpointConnectionARMResource extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  readonly provisioningState?: string;
  /** PrivateEndpoint of a remote private endpoint connection */
  privateEndpoint?: ArmIdWrapper;
  /** The state of a private link connection */
  privateLinkServiceConnectionState?: PrivateLinkConnectionState;
  /** Private IPAddresses mapped to the remote private endpoint */
  ipAddresses?: string[];
}

export function remotePrivateEndpointConnectionARMResourceSerializer(
  item: RemotePrivateEndpointConnectionARMResource,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "privateEndpoint",
      "privateLinkServiceConnectionState",
      "ipAddresses",
    ])
      ? undefined
      : _remotePrivateEndpointConnectionARMResourcePropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function remotePrivateEndpointConnectionARMResourceDeserializer(
  item: any,
): RemotePrivateEndpointConnectionARMResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _remotePrivateEndpointConnectionARMResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** RemotePrivateEndpointConnectionARMResource resource specific properties */
export interface RemotePrivateEndpointConnectionARMResourceProperties {
  readonly provisioningState?: string;
  /** PrivateEndpoint of a remote private endpoint connection */
  privateEndpoint?: ArmIdWrapper;
  /** The state of a private link connection */
  privateLinkServiceConnectionState?: PrivateLinkConnectionState;
  /** Private IPAddresses mapped to the remote private endpoint */
  ipAddresses?: string[];
}

export function remotePrivateEndpointConnectionARMResourcePropertiesSerializer(
  item: RemotePrivateEndpointConnectionARMResourceProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : armIdWrapperSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : item["ipAddresses"].map((p: any) => {
          return p;
        }),
  };
}

export function remotePrivateEndpointConnectionARMResourcePropertiesDeserializer(
  item: any,
): RemotePrivateEndpointConnectionARMResourceProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : armIdWrapperDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : item["ipAddresses"].map((p: any) => {
          return p;
        }),
  };
}

/** A wrapper for an ARM resource id */
export interface ArmIdWrapper {
  readonly id?: string;
}

export function armIdWrapperSerializer(item: ArmIdWrapper): any {
  return item;
}

export function armIdWrapperDeserializer(item: any): ArmIdWrapper {
  return {
    id: item["id"],
  };
}

/** The state of a private link connection */
export interface PrivateLinkConnectionState {
  /** Status of a private link connection */
  status?: string;
  /** Description of a private link connection */
  description?: string;
  /** ActionsRequired for a private link connection */
  actionsRequired?: string;
}

export function privateLinkConnectionStateSerializer(item: PrivateLinkConnectionState): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateLinkConnectionStateDeserializer(item: any): PrivateLinkConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** Paged collection of RemotePrivateEndpointConnectionARMResource items */
export interface _PrivateEndpointConnectionCollection {
  /** The RemotePrivateEndpointConnectionARMResource items on this page */
  value: RemotePrivateEndpointConnectionARMResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionCollectionDeserializer(
  item: any,
): _PrivateEndpointConnectionCollection {
  return {
    value: remotePrivateEndpointConnectionARMResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function remotePrivateEndpointConnectionARMResourceArraySerializer(
  result: Array<RemotePrivateEndpointConnectionARMResource>,
): any[] {
  return result.map((item) => {
    return remotePrivateEndpointConnectionARMResourceSerializer(item);
  });
}

export function remotePrivateEndpointConnectionARMResourceArrayDeserializer(
  result: Array<RemotePrivateEndpointConnectionARMResource>,
): any[] {
  return result.map((item) => {
    return remotePrivateEndpointConnectionARMResourceDeserializer(item);
  });
}

/** Represents a recommendation rule that the recommendation engine can perform. */
export interface RecommendationRule extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Unique name of the rule. */
  recommendationName?: string;
  /** UI friendly name of the rule. */
  displayName?: string;
  /** Localized name of the rule (Good for UI). */
  message?: string;
  /**
   * Recommendation ID of an associated recommendation object tied to the rule, if exists.
   * If such an object doesn't exist, it is set to null.
   */
  recommendationId?: string;
  /** Localized detailed description of the rule. */
  description?: string;
  /** Name of action that is recommended by this rule in string. */
  actionName?: string;
  /** Level of impact indicating how critical this rule is. */
  level?: NotificationLevel;
  /** List of available channels that this rule applies. */
  channels?: Channels;
  /** The list of category tags that this recommendation rule belongs to. */
  readonly categoryTags?: string[];
  /** True if this is associated with a dynamically added rule */
  isDynamic?: boolean;
  /** Extension name of the portal if exists. Applicable to dynamic rule only. */
  extensionName?: string;
  /** Deep link to a blade on the portal. Applicable to dynamic rule only. */
  bladeName?: string;
  /** Forward link to an external document associated with the rule. Applicable to dynamic rule only. */
  forwardLink?: string;
}

export function recommendationRuleDeserializer(item: any): RecommendationRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _recommendationRulePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** RecommendationRule resource specific properties */
export interface RecommendationRuleProperties {
  /** Unique name of the rule. */
  recommendationName?: string;
  /** UI friendly name of the rule. */
  displayName?: string;
  /** Localized name of the rule (Good for UI). */
  message?: string;
  /**
   * Recommendation ID of an associated recommendation object tied to the rule, if exists.
   * If such an object doesn't exist, it is set to null.
   */
  recommendationId?: string;
  /** Localized detailed description of the rule. */
  description?: string;
  /** Name of action that is recommended by this rule in string. */
  actionName?: string;
  /** Level of impact indicating how critical this rule is. */
  level?: NotificationLevel;
  /** List of available channels that this rule applies. */
  channels?: Channels;
  /** The list of category tags that this recommendation rule belongs to. */
  readonly categoryTags?: string[];
  /** True if this is associated with a dynamically added rule */
  isDynamic?: boolean;
  /** Extension name of the portal if exists. Applicable to dynamic rule only. */
  extensionName?: string;
  /** Deep link to a blade on the portal. Applicable to dynamic rule only. */
  bladeName?: string;
  /** Forward link to an external document associated with the rule. Applicable to dynamic rule only. */
  forwardLink?: string;
}

export function recommendationRulePropertiesDeserializer(item: any): RecommendationRuleProperties {
  return {
    recommendationName: item["recommendationName"],
    displayName: item["displayName"],
    message: item["message"],
    recommendationId: item["recommendationId"],
    description: item["description"],
    actionName: item["actionName"],
    level: item["level"],
    channels: item["channels"],
    categoryTags: !item["categoryTags"]
      ? item["categoryTags"]
      : item["categoryTags"].map((p: any) => {
          return p;
        }),
    isDynamic: item["isDynamic"],
    extensionName: item["extensionName"],
    bladeName: item["bladeName"],
    forwardLink: item["forwardLink"],
  };
}

/** Level indicating how critical this recommendation can impact. */
export type NotificationLevel = "Critical" | "Warning" | "Information" | "NonUrgentSuggestion";
/** List of channels that this recommendation can apply. */
export type Channels = "Notification" | "Api" | "Email" | "Webhook" | "All";

/** Collection of recommendations. */
export interface _RecommendationCollection {
  /** The Recommendation items on this page */
  value: Recommendation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _recommendationCollectionDeserializer(item: any): _RecommendationCollection {
  return {
    value: recommendationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function recommendationArrayDeserializer(result: Array<Recommendation>): any[] {
  return result.map((item) => {
    return recommendationDeserializer(item);
  });
}

/** Represents a recommendation result generated by the recommendation engine. */
export interface Recommendation extends ProxyOnlyResource {
  /** Timestamp when this instance was created. */
  creationTime?: Date;
  /** A GUID value that each recommendation object is associated with. */
  recommendationId?: string;
  /** Full ARM resource ID string that this recommendation object is associated with. */
  resourceId?: string;
  /** Name of a resource type this recommendation applies, e.g. Subscription, ServerFarm, Site. */
  resourceScope?: ResourceScopeType;
  /** Unique name of the rule. */
  ruleName?: string;
  /** UI friendly name of the rule (may not be unique). */
  displayName?: string;
  /** Recommendation text. */
  message?: string;
  /** Level indicating how critical this recommendation can impact. */
  level?: NotificationLevel;
  /** List of channels that this recommendation can apply. */
  channels?: Channels;
  /** The list of category tags that this recommendation belongs to. */
  readonly categoryTags?: string[];
  /** Name of action recommended by this object. */
  actionName?: string;
  /** True if this recommendation is still valid (i.e. "actionable"). False if it is invalid. */
  enabled?: number;
  /** The list of states of this recommendation. If it's null then it should be considered "Active". */
  states?: string[];
  /** The beginning time in UTC of a range that the recommendation refers to. */
  startTime?: Date;
  /** The end time in UTC of a range that the recommendation refers to. */
  endTime?: Date;
  /** When to notify this recommendation next in UTC. Null means that this will never be notified anymore. */
  nextNotificationTime?: Date;
  /** Date and time in UTC when this notification expires. */
  notificationExpirationTime?: Date;
  /** Last timestamp in UTC this instance was actually notified. Null means that this recommendation hasn't been notified yet. */
  notifiedTime?: Date;
  /** A metric value measured by the rule. */
  score?: number;
  /** True if this is associated with a dynamically added rule */
  isDynamic?: boolean;
  /** Extension name of the portal if exists. */
  extensionName?: string;
  /** Deep link to a blade on the portal. */
  bladeName?: string;
  /** Forward link to an external document associated with the rule. */
  forwardLink?: string;
}

export function recommendationDeserializer(item: any): Recommendation {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _recommendationPropertiesDeserializer(item["properties"])),
  };
}

/** Recommendation resource specific properties */
export interface RecommendationProperties {
  /** Timestamp when this instance was created. */
  creationTime?: Date;
  /** A GUID value that each recommendation object is associated with. */
  recommendationId?: string;
  /** Full ARM resource ID string that this recommendation object is associated with. */
  resourceId?: string;
  /** Name of a resource type this recommendation applies, e.g. Subscription, ServerFarm, Site. */
  resourceScope?: ResourceScopeType;
  /** Unique name of the rule. */
  ruleName?: string;
  /** UI friendly name of the rule (may not be unique). */
  displayName?: string;
  /** Recommendation text. */
  message?: string;
  /** Level indicating how critical this recommendation can impact. */
  level?: NotificationLevel;
  /** List of channels that this recommendation can apply. */
  channels?: Channels;
  /** The list of category tags that this recommendation belongs to. */
  readonly categoryTags?: string[];
  /** Name of action recommended by this object. */
  actionName?: string;
  /** True if this recommendation is still valid (i.e. "actionable"). False if it is invalid. */
  enabled?: number;
  /** The list of states of this recommendation. If it's null then it should be considered "Active". */
  states?: string[];
  /** The beginning time in UTC of a range that the recommendation refers to. */
  startTime?: Date;
  /** The end time in UTC of a range that the recommendation refers to. */
  endTime?: Date;
  /** When to notify this recommendation next in UTC. Null means that this will never be notified anymore. */
  nextNotificationTime?: Date;
  /** Date and time in UTC when this notification expires. */
  notificationExpirationTime?: Date;
  /** Last timestamp in UTC this instance was actually notified. Null means that this recommendation hasn't been notified yet. */
  notifiedTime?: Date;
  /** A metric value measured by the rule. */
  score?: number;
  /** True if this is associated with a dynamically added rule */
  isDynamic?: boolean;
  /** Extension name of the portal if exists. */
  extensionName?: string;
  /** Deep link to a blade on the portal. */
  bladeName?: string;
  /** Forward link to an external document associated with the rule. */
  forwardLink?: string;
}

export function recommendationPropertiesDeserializer(item: any): RecommendationProperties {
  return {
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    recommendationId: item["recommendationId"],
    resourceId: item["resourceId"],
    resourceScope: item["resourceScope"],
    ruleName: item["ruleName"],
    displayName: item["displayName"],
    message: item["message"],
    level: item["level"],
    channels: item["channels"],
    categoryTags: !item["categoryTags"]
      ? item["categoryTags"]
      : item["categoryTags"].map((p: any) => {
          return p;
        }),
    actionName: item["actionName"],
    enabled: item["enabled"],
    states: !item["states"]
      ? item["states"]
      : item["states"].map((p: any) => {
          return p;
        }),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    nextNotificationTime: !item["nextNotificationTime"]
      ? item["nextNotificationTime"]
      : new Date(item["nextNotificationTime"]),
    notificationExpirationTime: !item["notificationExpirationTime"]
      ? item["notificationExpirationTime"]
      : new Date(item["notificationExpirationTime"]),
    notifiedTime: !item["notifiedTime"] ? item["notifiedTime"] : new Date(item["notifiedTime"]),
    score: item["score"],
    isDynamic: item["isDynamic"],
    extensionName: item["extensionName"],
    bladeName: item["bladeName"],
    forwardLink: item["forwardLink"],
  };
}

/** Name of a resource type this recommendation applies, e.g. Subscription, ServerFarm, Site. */
export enum KnownResourceScopeType {
  /** ServerFarm */
  ServerFarm = "ServerFarm",
  /** Subscription */
  Subscription = "Subscription",
  /** WebSite */
  WebSite = "WebSite",
}

/**
 * Name of a resource type this recommendation applies, e.g. Subscription, ServerFarm, Site. \
 * {@link KnownResourceScopeType} can be used interchangeably with ResourceScopeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServerFarm** \
 * **Subscription** \
 * **WebSite**
 */
export type ResourceScopeType = string;

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface StaticSiteARMResource extends TrackedResource {
  /** Kind of resource. */
  kind?: string;
  /** Description of a SKU for a scalable resource. */
  sku?: SkuDescription;
  /** Managed service identity. */
  identity?: ManagedServiceIdentity;
  /** The default autogenerated hostname for the static site. */
  readonly defaultHostname?: string;
  /** URL for the repository of the static site. */
  repositoryUrl?: string;
  /** The target branch in the repository. */
  branch?: string;
  /** The custom domains associated with this static site. */
  readonly customDomains?: string[];
  /** A user's github repository token. This is used to setup the Github Actions workflow file and API secrets. */
  repositoryToken?: string;
  /** Build properties to configure on the repository. */
  buildProperties?: StaticSiteBuildProperties;
  /** Private endpoint connections */
  readonly privateEndpointConnections?: ResponseMessageEnvelopeRemotePrivateEndpointConnection[];
  /** State indicating whether staging environments are allowed or not allowed for a static web app. */
  stagingEnvironmentPolicy?: StagingEnvironmentPolicy;
  /** <code>false</code> if config file is locked for this static web app; otherwise, <code>true</code>. */
  allowConfigFileUpdates?: boolean;
  /** Template options for generating a new repository. */
  templateProperties?: StaticSiteTemplateOptions;
  /** The content distribution endpoint for the static site. */
  readonly contentDistributionEndpoint?: string;
  /** Identity to use for Key Vault Reference authentication. */
  readonly keyVaultReferenceIdentity?: string;
  /** User provided function apps registered with the static site */
  readonly userProvidedFunctionApps?: StaticSiteUserProvidedFunctionApp[];
  /** Backends linked to the static side */
  readonly linkedBackends?: StaticSiteLinkedBackend[];
  /** The provider that submitted the last deployment to the primary environment of the static site. */
  provider?: string;
  /** State indicating the status of the enterprise grade CDN serving traffic to the static web app. */
  enterpriseGradeCdnStatus?: EnterpriseGradeCdnStatus;
  /** State indicating whether public traffic are allowed or not for a static web app. Allowed Values: 'Enabled', 'Disabled' or an empty string. */
  publicNetworkAccess?: string;
  /** Database connections for the static site */
  readonly databaseConnections?: DatabaseConnectionOverview[];
}

export function staticSiteARMResourceSerializer(item: StaticSiteARMResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "repositoryUrl",
      "branch",
      "repositoryToken",
      "buildProperties",
      "stagingEnvironmentPolicy",
      "allowConfigFileUpdates",
      "templateProperties",
      "provider",
      "enterpriseGradeCdnStatus",
      "publicNetworkAccess",
    ])
      ? undefined
      : _staticSiteARMResourcePropertiesSerializer(item),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuDescriptionSerializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function staticSiteARMResourceDeserializer(item: any): StaticSiteARMResource {
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
      : _staticSiteARMResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : skuDescriptionDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** A static site. */
export interface StaticSite {
  /** The default autogenerated hostname for the static site. */
  readonly defaultHostname?: string;
  /** URL for the repository of the static site. */
  repositoryUrl?: string;
  /** The target branch in the repository. */
  branch?: string;
  /** The custom domains associated with this static site. */
  readonly customDomains?: string[];
  /** A user's github repository token. This is used to setup the Github Actions workflow file and API secrets. */
  repositoryToken?: string;
  /** Build properties to configure on the repository. */
  buildProperties?: StaticSiteBuildProperties;
  /** Private endpoint connections */
  readonly privateEndpointConnections?: ResponseMessageEnvelopeRemotePrivateEndpointConnection[];
  /** State indicating whether staging environments are allowed or not allowed for a static web app. */
  stagingEnvironmentPolicy?: StagingEnvironmentPolicy;
  /** <code>false</code> if config file is locked for this static web app; otherwise, <code>true</code>. */
  allowConfigFileUpdates?: boolean;
  /** Template options for generating a new repository. */
  templateProperties?: StaticSiteTemplateOptions;
  /** The content distribution endpoint for the static site. */
  readonly contentDistributionEndpoint?: string;
  /** Identity to use for Key Vault Reference authentication. */
  readonly keyVaultReferenceIdentity?: string;
  /** User provided function apps registered with the static site */
  readonly userProvidedFunctionApps?: StaticSiteUserProvidedFunctionApp[];
  /** Backends linked to the static side */
  readonly linkedBackends?: StaticSiteLinkedBackend[];
  /** The provider that submitted the last deployment to the primary environment of the static site. */
  provider?: string;
  /** State indicating the status of the enterprise grade CDN serving traffic to the static web app. */
  enterpriseGradeCdnStatus?: EnterpriseGradeCdnStatus;
  /** State indicating whether public traffic are allowed or not for a static web app. Allowed Values: 'Enabled', 'Disabled' or an empty string. */
  publicNetworkAccess?: string;
  /** Database connections for the static site */
  readonly databaseConnections?: DatabaseConnectionOverview[];
}

export function staticSiteSerializer(item: StaticSite): any {
  return {
    repositoryUrl: item["repositoryUrl"],
    branch: item["branch"],
    repositoryToken: item["repositoryToken"],
    buildProperties: !item["buildProperties"]
      ? item["buildProperties"]
      : staticSiteBuildPropertiesSerializer(item["buildProperties"]),
    stagingEnvironmentPolicy: item["stagingEnvironmentPolicy"],
    allowConfigFileUpdates: item["allowConfigFileUpdates"],
    templateProperties: !item["templateProperties"]
      ? item["templateProperties"]
      : staticSiteTemplateOptionsSerializer(item["templateProperties"]),
    provider: item["provider"],
    enterpriseGradeCdnStatus: item["enterpriseGradeCdnStatus"],
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function staticSiteDeserializer(item: any): StaticSite {
  return {
    defaultHostname: item["defaultHostname"],
    repositoryUrl: item["repositoryUrl"],
    branch: item["branch"],
    customDomains: !item["customDomains"]
      ? item["customDomains"]
      : item["customDomains"].map((p: any) => {
          return p;
        }),
    repositoryToken: item["repositoryToken"],
    buildProperties: !item["buildProperties"]
      ? item["buildProperties"]
      : staticSiteBuildPropertiesDeserializer(item["buildProperties"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : responseMessageEnvelopeRemotePrivateEndpointConnectionArrayDeserializer(
          item["privateEndpointConnections"],
        ),
    stagingEnvironmentPolicy: item["stagingEnvironmentPolicy"],
    allowConfigFileUpdates: item["allowConfigFileUpdates"],
    templateProperties: !item["templateProperties"]
      ? item["templateProperties"]
      : staticSiteTemplateOptionsDeserializer(item["templateProperties"]),
    contentDistributionEndpoint: item["contentDistributionEndpoint"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
    userProvidedFunctionApps: !item["userProvidedFunctionApps"]
      ? item["userProvidedFunctionApps"]
      : staticSiteUserProvidedFunctionAppArrayDeserializer(item["userProvidedFunctionApps"]),
    linkedBackends: !item["linkedBackends"]
      ? item["linkedBackends"]
      : staticSiteLinkedBackendArrayDeserializer(item["linkedBackends"]),
    provider: item["provider"],
    enterpriseGradeCdnStatus: item["enterpriseGradeCdnStatus"],
    publicNetworkAccess: item["publicNetworkAccess"],
    databaseConnections: !item["databaseConnections"]
      ? item["databaseConnections"]
      : databaseConnectionOverviewArrayDeserializer(item["databaseConnections"]),
  };
}

/** Build properties for the static site. */
export interface StaticSiteBuildProperties {
  /** The path to the app code within the repository. */
  appLocation?: string;
  /** The path to the api code within the repository. */
  apiLocation?: string;
  /** Deprecated: The path of the app artifacts after building (deprecated in favor of OutputLocation) */
  appArtifactLocation?: string;
  /** The output path of the app after building. */
  outputLocation?: string;
  /** A custom command to run during deployment of the static content application. */
  appBuildCommand?: string;
  /** A custom command to run during deployment of the Azure Functions API application. */
  apiBuildCommand?: string;
  /** Skip Github Action workflow generation. */
  skipGithubActionWorkflowGeneration?: boolean;
  /** Github Action secret name override. */
  githubActionSecretNameOverride?: string;
}

export function staticSiteBuildPropertiesSerializer(item: StaticSiteBuildProperties): any {
  return {
    appLocation: item["appLocation"],
    apiLocation: item["apiLocation"],
    appArtifactLocation: item["appArtifactLocation"],
    outputLocation: item["outputLocation"],
    appBuildCommand: item["appBuildCommand"],
    apiBuildCommand: item["apiBuildCommand"],
    skipGithubActionWorkflowGeneration: item["skipGithubActionWorkflowGeneration"],
    githubActionSecretNameOverride: item["githubActionSecretNameOverride"],
  };
}

export function staticSiteBuildPropertiesDeserializer(item: any): StaticSiteBuildProperties {
  return {
    appLocation: item["appLocation"],
    apiLocation: item["apiLocation"],
    appArtifactLocation: item["appArtifactLocation"],
    outputLocation: item["outputLocation"],
    appBuildCommand: item["appBuildCommand"],
    apiBuildCommand: item["apiBuildCommand"],
    skipGithubActionWorkflowGeneration: item["skipGithubActionWorkflowGeneration"],
    githubActionSecretNameOverride: item["githubActionSecretNameOverride"],
  };
}

export function responseMessageEnvelopeRemotePrivateEndpointConnectionArrayDeserializer(
  result: Array<ResponseMessageEnvelopeRemotePrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return responseMessageEnvelopeRemotePrivateEndpointConnectionDeserializer(item);
  });
}

/** Message envelope that contains the common Azure resource manager properties and the resource provider specific content. */
export interface ResponseMessageEnvelopeRemotePrivateEndpointConnection {
  /**
   * Resource Id. Typically ID is populated only for responses to GET requests. Caller is responsible for passing in this
   * value for GET requests only.
   * For example: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupId}/providers/Microsoft.Web/sites/{sitename}
   */
  id?: string;
  /** Name of resource. */
  name?: string;
  /** Type of resource e.g "Microsoft.Web/sites". */
  type?: string;
  /** Geographical region resource belongs to e.g. SouthCentralUS, SouthEastAsia. */
  location?: string;
  /** Tags associated with resource. */
  tags?: Record<string, string>;
  /** Azure resource manager plan. */
  plan?: ArmPlan;
  /** Resource specific properties. */
  properties?: RemotePrivateEndpointConnection;
  /** SKU description of the resource. */
  sku?: SkuDescription;
  /** Azure-AsyncOperation Status info. */
  status?: string;
  /** Azure-AsyncOperation Error info. */
  error?: ErrorEntity;
  /** MSI resource */
  identity?: ManagedServiceIdentity;
  /** Logical Availability Zones the service is hosted in */
  zones?: string[];
}

export function responseMessageEnvelopeRemotePrivateEndpointConnectionDeserializer(
  item: any,
): ResponseMessageEnvelopeRemotePrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    plan: !item["plan"] ? item["plan"] : armPlanDeserializer(item["plan"]),
    properties: !item["properties"]
      ? item["properties"]
      : remotePrivateEndpointConnectionDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuDescriptionDeserializer(item["sku"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : errorEntityDeserializer(item["error"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** The plan object in Azure Resource Manager, represents a marketplace plan. */
export interface ArmPlan {
  /** The name. */
  name?: string;
  /** The publisher. */
  publisher?: string;
  /** The product. */
  product?: string;
  /** The promotion code. */
  promotionCode?: string;
  /** Version of product. */
  version?: string;
}

export function armPlanDeserializer(item: any): ArmPlan {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

/** A remote private endpoint connection */
export interface RemotePrivateEndpointConnection extends ProxyOnlyResource {
  readonly provisioningState?: string;
  /** PrivateEndpoint of a remote private endpoint connection */
  privateEndpoint?: ArmIdWrapper;
  /** The state of a private link connection */
  privateLinkServiceConnectionState?: PrivateLinkConnectionState;
  /** Private IPAddresses mapped to the remote private endpoint */
  ipAddresses?: string[];
}

export function remotePrivateEndpointConnectionDeserializer(
  item: any,
): RemotePrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _remotePrivateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** RemotePrivateEndpointConnection resource specific properties */
export interface RemotePrivateEndpointConnectionProperties {
  readonly provisioningState?: string;
  /** PrivateEndpoint of a remote private endpoint connection */
  privateEndpoint?: ArmIdWrapper;
  /** The state of a private link connection */
  privateLinkServiceConnectionState?: PrivateLinkConnectionState;
  /** Private IPAddresses mapped to the remote private endpoint */
  ipAddresses?: string[];
}

export function remotePrivateEndpointConnectionPropertiesDeserializer(
  item: any,
): RemotePrivateEndpointConnectionProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : armIdWrapperDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : item["ipAddresses"].map((p: any) => {
          return p;
        }),
  };
}

/** State indicating whether staging environments are allowed or not allowed for a static web app. */
export type StagingEnvironmentPolicy = "Enabled" | "Disabled";

/** Template Options for the static site. */
export interface StaticSiteTemplateOptions {
  /** URL of the template repository. The newly generated repository will be based on this one. */
  templateRepositoryUrl?: string;
  /** Owner of the newly generated repository. */
  owner?: string;
  /** Name of the newly generated repository. */
  repositoryName?: string;
  /** Description of the newly generated repository. */
  description?: string;
  /** Whether or not the newly generated repository is a private repository. Defaults to false (i.e. public). */
  isPrivate?: boolean;
}

export function staticSiteTemplateOptionsSerializer(item: StaticSiteTemplateOptions): any {
  return {
    templateRepositoryUrl: item["templateRepositoryUrl"],
    owner: item["owner"],
    repositoryName: item["repositoryName"],
    description: item["description"],
    isPrivate: item["isPrivate"],
  };
}

export function staticSiteTemplateOptionsDeserializer(item: any): StaticSiteTemplateOptions {
  return {
    templateRepositoryUrl: item["templateRepositoryUrl"],
    owner: item["owner"],
    repositoryName: item["repositoryName"],
    description: item["description"],
    isPrivate: item["isPrivate"],
  };
}

export function staticSiteUserProvidedFunctionAppArrayDeserializer(
  result: Array<StaticSiteUserProvidedFunctionApp>,
): any[] {
  return result.map((item) => {
    return staticSiteUserProvidedFunctionAppDeserializer(item);
  });
}

/** A static site user provided function. */
export interface StaticSiteUserProvidedFunctionApp extends ProxyOnlyResource {
  /** The resource id of the function app registered with the static site */
  functionAppResourceId?: string;
  /** The region of the function app registered with the static site */
  functionAppRegion?: string;
  /** The date and time on which the function app was registered with the static site. */
  readonly createdOn?: Date;
}

export function staticSiteUserProvidedFunctionAppDeserializer(
  item: any,
): StaticSiteUserProvidedFunctionApp {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _staticSiteUserProvidedFunctionAppPropertiesDeserializer(item["properties"])),
  };
}

/** StaticSiteUserProvidedFunctionApp resource specific properties */
export interface StaticSiteUserProvidedFunctionAppProperties {
  /** The resource id of the function app registered with the static site */
  functionAppResourceId?: string;
  /** The region of the function app registered with the static site */
  functionAppRegion?: string;
  /** The date and time on which the function app was registered with the static site. */
  readonly createdOn?: Date;
}

export function staticSiteUserProvidedFunctionAppPropertiesDeserializer(
  item: any,
): StaticSiteUserProvidedFunctionAppProperties {
  return {
    functionAppResourceId: item["functionAppResourceId"],
    functionAppRegion: item["functionAppRegion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
  };
}

export function staticSiteLinkedBackendArrayDeserializer(
  result: Array<StaticSiteLinkedBackend>,
): any[] {
  return result.map((item) => {
    return staticSiteLinkedBackendDeserializer(item);
  });
}

/** Static Site Linked Backend ARM resource. */
export interface StaticSiteLinkedBackend {
  /** The resource id of the backend linked to the static site */
  backendResourceId?: string;
  /** The region of the backend linked to the static site */
  region?: string;
  /** The date and time on which the backend was linked to the static site. */
  readonly createdOn?: Date;
  /** The provisioning state of the linking process. */
  readonly provisioningState?: string;
}

export function staticSiteLinkedBackendDeserializer(item: any): StaticSiteLinkedBackend {
  return {
    backendResourceId: item["backendResourceId"],
    region: item["region"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    provisioningState: item["provisioningState"],
  };
}

/** State indicating the status of the enterprise grade CDN serving traffic to the static web app. */
export enum KnownEnterpriseGradeCdnStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Enabling */
  Enabling = "Enabling",
  /** Disabled */
  Disabled = "Disabled",
  /** Disabling */
  Disabling = "Disabling",
}

/**
 * State indicating the status of the enterprise grade CDN serving traffic to the static web app. \
 * {@link KnownEnterpriseGradeCdnStatus} can be used interchangeably with EnterpriseGradeCdnStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Enabling** \
 * **Disabled** \
 * **Disabling**
 */
export type EnterpriseGradeCdnStatus = string;

export function databaseConnectionOverviewArrayDeserializer(
  result: Array<DatabaseConnectionOverview>,
): any[] {
  return result.map((item) => {
    return databaseConnectionOverviewDeserializer(item);
  });
}

/** Static Site Database Connection overview. */
export interface DatabaseConnectionOverview {
  /** The resource id of the database. */
  readonly resourceId?: string;
  /** If present, the identity is used in conjunction with connection string to connect to the database. Use of the system-assigned managed identity is indicated with the string 'SystemAssigned', while use of a user-assigned managed identity is indicated with the resource id of the managed identity resource. */
  readonly connectionIdentity?: string;
  /** The region of the database resource. */
  readonly region?: string;
  /** A list of configuration files associated with this database connection. */
  readonly configurationFiles?: StaticSiteDatabaseConnectionConfigurationFileOverview[];
  /** If present, the name of this database connection resource. */
  readonly name?: string;
}

export function databaseConnectionOverviewDeserializer(item: any): DatabaseConnectionOverview {
  return {
    resourceId: item["resourceId"],
    connectionIdentity: item["connectionIdentity"],
    region: item["region"],
    configurationFiles: !item["configurationFiles"]
      ? item["configurationFiles"]
      : staticSiteDatabaseConnectionConfigurationFileOverviewArrayDeserializer(
          item["configurationFiles"],
        ),
    name: item["name"],
  };
}

export function staticSiteDatabaseConnectionConfigurationFileOverviewArrayDeserializer(
  result: Array<StaticSiteDatabaseConnectionConfigurationFileOverview>,
): any[] {
  return result.map((item) => {
    return staticSiteDatabaseConnectionConfigurationFileOverviewDeserializer(item);
  });
}

/** A database connection configuration file */
export interface StaticSiteDatabaseConnectionConfigurationFileOverview {
  /** The name of the configuration file. */
  readonly fileName?: string;
  /** The Base64 encoding of the file contents. */
  readonly contents?: string;
  /** The type of configuration file. */
  readonly type?: string;
}

export function staticSiteDatabaseConnectionConfigurationFileOverviewDeserializer(
  item: any,
): StaticSiteDatabaseConnectionConfigurationFileOverview {
  return {
    fileName: item["fileName"],
    contents: item["contents"],
    type: item["type"],
  };
}

/** ARM resource for a static site when patching */
export interface StaticSitePatchResource extends ProxyOnlyResource {
  /** The default autogenerated hostname for the static site. */
  readonly defaultHostname?: string;
  /** URL for the repository of the static site. */
  repositoryUrl?: string;
  /** The target branch in the repository. */
  branch?: string;
  /** The custom domains associated with this static site. */
  readonly customDomains?: string[];
  /** A user's github repository token. This is used to setup the Github Actions workflow file and API secrets. */
  repositoryToken?: string;
  /** Build properties to configure on the repository. */
  buildProperties?: StaticSiteBuildProperties;
  /** Private endpoint connections */
  readonly privateEndpointConnections?: ResponseMessageEnvelopeRemotePrivateEndpointConnection[];
  /** State indicating whether staging environments are allowed or not allowed for a static web app. */
  stagingEnvironmentPolicy?: StagingEnvironmentPolicy;
  /** <code>false</code> if config file is locked for this static web app; otherwise, <code>true</code>. */
  allowConfigFileUpdates?: boolean;
  /** Template options for generating a new repository. */
  templateProperties?: StaticSiteTemplateOptions;
  /** The content distribution endpoint for the static site. */
  readonly contentDistributionEndpoint?: string;
  /** Identity to use for Key Vault Reference authentication. */
  readonly keyVaultReferenceIdentity?: string;
  /** User provided function apps registered with the static site */
  readonly userProvidedFunctionApps?: StaticSiteUserProvidedFunctionApp[];
  /** Backends linked to the static side */
  readonly linkedBackends?: StaticSiteLinkedBackend[];
  /** The provider that submitted the last deployment to the primary environment of the static site. */
  provider?: string;
  /** State indicating the status of the enterprise grade CDN serving traffic to the static web app. */
  enterpriseGradeCdnStatus?: EnterpriseGradeCdnStatus;
  /** State indicating whether public traffic are allowed or not for a static web app. Allowed Values: 'Enabled', 'Disabled' or an empty string. */
  publicNetworkAccess?: string;
  /** Database connections for the static site */
  readonly databaseConnections?: DatabaseConnectionOverview[];
}

export function staticSitePatchResourceSerializer(item: StaticSitePatchResource): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "repositoryUrl",
      "branch",
      "repositoryToken",
      "buildProperties",
      "stagingEnvironmentPolicy",
      "allowConfigFileUpdates",
      "templateProperties",
      "provider",
      "enterpriseGradeCdnStatus",
      "publicNetworkAccess",
    ])
      ? undefined
      : _staticSitePatchResourcePropertiesSerializer(item),
  };
}

/** Collection of static sites. */
export interface _StaticSiteCollection {
  /** The StaticSiteARMResource items on this page */
  value: StaticSiteARMResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _staticSiteCollectionDeserializer(item: any): _StaticSiteCollection {
  return {
    value: staticSiteARMResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function staticSiteARMResourceArraySerializer(result: Array<StaticSiteARMResource>): any[] {
  return result.map((item) => {
    return staticSiteARMResourceSerializer(item);
  });
}

export function staticSiteARMResourceArrayDeserializer(
  result: Array<StaticSiteARMResource>,
): any[] {
  return result.map((item) => {
    return staticSiteARMResourceDeserializer(item);
  });
}

/** Collection of static site custom users. */
export interface _StaticSiteUserCollection {
  /** The StaticSiteUserARMResource items on this page */
  value: StaticSiteUserARMResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _staticSiteUserCollectionDeserializer(item: any): _StaticSiteUserCollection {
  return {
    value: staticSiteUserARMResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function staticSiteUserARMResourceArraySerializer(
  result: Array<StaticSiteUserARMResource>,
): any[] {
  return result.map((item) => {
    return staticSiteUserARMResourceSerializer(item);
  });
}

export function staticSiteUserARMResourceArrayDeserializer(
  result: Array<StaticSiteUserARMResource>,
): any[] {
  return result.map((item) => {
    return staticSiteUserARMResourceDeserializer(item);
  });
}

/** Static Site User ARM resource. */
export interface StaticSiteUserARMResource extends ProxyOnlyResource {
  /** The identity provider for the static site user. */
  readonly provider?: string;
  /** The user id for the static site user. */
  readonly userId?: string;
  /** The display name for the static site user. */
  readonly displayName?: string;
  /** The roles for the static site user, in free-form string format */
  roles?: string;
}

export function staticSiteUserARMResourceSerializer(item: StaticSiteUserARMResource): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["roles"])
      ? undefined
      : _staticSiteUserARMResourcePropertiesSerializer(item),
  };
}

export function staticSiteUserARMResourceDeserializer(item: any): StaticSiteUserARMResource {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _staticSiteUserARMResourcePropertiesDeserializer(item["properties"])),
  };
}

/** StaticSiteUserARMResource resource specific properties */
export interface StaticSiteUserARMResourceProperties {
  /** The identity provider for the static site user. */
  readonly provider?: string;
  /** The user id for the static site user. */
  readonly userId?: string;
  /** The display name for the static site user. */
  readonly displayName?: string;
  /** The roles for the static site user, in free-form string format */
  roles?: string;
}

export function staticSiteUserARMResourcePropertiesSerializer(
  item: StaticSiteUserARMResourceProperties,
): any {
  return { roles: item["roles"] };
}

export function staticSiteUserARMResourcePropertiesDeserializer(
  item: any,
): StaticSiteUserARMResourceProperties {
  return {
    provider: item["provider"],
    userId: item["userId"],
    displayName: item["displayName"],
    roles: item["roles"],
  };
}

/** String dictionary resource. */
export interface StringDictionary extends ProxyOnlyResource {
  /** Settings. */
  properties?: Record<string, string>;
}

export function stringDictionarySerializer(item: StringDictionary): any {
  return { kind: item["kind"], properties: item["properties"] };
}

export function stringDictionaryDeserializer(item: any): StringDictionary {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Static sites user roles invitation resource. */
export interface StaticSiteUserInvitationRequestResource extends ProxyOnlyResource {
  /** The domain name for the static site custom domain. */
  domain?: string;
  /** The identity provider for the static site user. */
  provider?: string;
  /** The user id for the static site user. */
  userDetails?: string;
  /** The roles for the static site user, in free-form string format */
  roles?: string;
  /** The number of hours the sas token stays valid */
  numHoursToExpiration?: number;
}

export function staticSiteUserInvitationRequestResourceSerializer(
  item: StaticSiteUserInvitationRequestResource,
): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "domain",
      "provider",
      "userDetails",
      "roles",
      "numHoursToExpiration",
    ])
      ? undefined
      : _staticSiteUserInvitationRequestResourcePropertiesSerializer(item),
  };
}

/** StaticSiteUserInvitationRequestResource resource specific properties */
export interface StaticSiteUserInvitationRequestResourceProperties {
  /** The domain name for the static site custom domain. */
  domain?: string;
  /** The identity provider for the static site user. */
  provider?: string;
  /** The user id for the static site user. */
  userDetails?: string;
  /** The roles for the static site user, in free-form string format */
  roles?: string;
  /** The number of hours the sas token stays valid */
  numHoursToExpiration?: number;
}

export function staticSiteUserInvitationRequestResourcePropertiesSerializer(
  item: StaticSiteUserInvitationRequestResourceProperties,
): any {
  return {
    domain: item["domain"],
    provider: item["provider"],
    userDetails: item["userDetails"],
    roles: item["roles"],
    numHoursToExpiration: item["numHoursToExpiration"],
  };
}

/** Static sites user roles invitation link resource. */
export interface StaticSiteUserInvitationResponseResource extends ProxyOnlyResource {
  /** The expiration time of the invitation */
  readonly expiresOn?: Date;
  /** The url for the invitation link */
  readonly invitationUrl?: string;
}

export function staticSiteUserInvitationResponseResourceDeserializer(
  item: any,
): StaticSiteUserInvitationResponseResource {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _staticSiteUserInvitationResponseResourcePropertiesDeserializer(item["properties"])),
  };
}

/** StaticSiteUserInvitationResponseResource resource specific properties */
export interface StaticSiteUserInvitationResponseResourceProperties {
  /** The expiration time of the invitation */
  readonly expiresOn?: Date;
  /** The url for the invitation link */
  readonly invitationUrl?: string;
}

export function staticSiteUserInvitationResponseResourcePropertiesDeserializer(
  item: any,
): StaticSiteUserInvitationResponseResourceProperties {
  return {
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : new Date(item["expiresOn"]),
    invitationUrl: item["invitationUrl"],
  };
}

/** Collection of static site functions. */
export interface _StaticSiteFunctionOverviewCollection {
  /** The StaticSiteFunctionOverviewARMResource items on this page */
  value: StaticSiteFunctionOverviewARMResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _staticSiteFunctionOverviewCollectionDeserializer(
  item: any,
): _StaticSiteFunctionOverviewCollection {
  return {
    value: staticSiteFunctionOverviewARMResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function staticSiteFunctionOverviewARMResourceArrayDeserializer(
  result: Array<StaticSiteFunctionOverviewARMResource>,
): any[] {
  return result.map((item) => {
    return staticSiteFunctionOverviewARMResourceDeserializer(item);
  });
}

/** Static Site Function Overview ARM resource. */
export interface StaticSiteFunctionOverviewARMResource extends ProxyOnlyResource {
  /** The name for the function */
  readonly functionName?: string;
  /** The trigger type of the function */
  readonly triggerType?: TriggerTypes;
}

export function staticSiteFunctionOverviewARMResourceDeserializer(
  item: any,
): StaticSiteFunctionOverviewARMResource {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _staticSiteFunctionOverviewARMResourcePropertiesDeserializer(item["properties"])),
  };
}

/** StaticSiteFunctionOverviewARMResource resource specific properties */
export interface StaticSiteFunctionOverviewARMResourceProperties {
  /** The name for the function */
  readonly functionName?: string;
  /** The trigger type of the function */
  readonly triggerType?: TriggerTypes;
}

export function staticSiteFunctionOverviewARMResourcePropertiesDeserializer(
  item: any,
): StaticSiteFunctionOverviewARMResourceProperties {
  return {
    functionName: item["functionName"],
    triggerType: item["triggerType"],
  };
}

/** The trigger type of the function */
export enum KnownTriggerTypes {
  /** HttpTrigger */
  HttpTrigger = "HttpTrigger",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * The trigger type of the function \
 * {@link KnownTriggerTypes} can be used interchangeably with TriggerTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HttpTrigger** \
 * **Unknown**
 */
export type TriggerTypes = string;

/** String list resource. */
export interface StringList extends ProxyOnlyResource {
  /** List of string resources. */
  properties?: string[];
}

export function stringListDeserializer(item: any): StringList {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : item["properties"].map((p: any) => {
          return p;
        }),
  };
}

/** Static Site Reset Properties ARM resource. */
export interface StaticSiteResetPropertiesARMResource extends ProxyOnlyResource {
  /** The token which proves admin privileges to the repository. */
  repositoryToken?: string;
  /** Determines whether the repository should be updated with the new properties. */
  shouldUpdateRepository?: boolean;
}

export function staticSiteResetPropertiesARMResourceSerializer(
  item: StaticSiteResetPropertiesARMResource,
): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["repositoryToken", "shouldUpdateRepository"])
      ? undefined
      : _staticSiteResetPropertiesARMResourcePropertiesSerializer(item),
  };
}

/** StaticSiteResetPropertiesARMResource resource specific properties */
export interface StaticSiteResetPropertiesARMResourceProperties {
  /** The token which proves admin privileges to the repository. */
  repositoryToken?: string;
  /** Determines whether the repository should be updated with the new properties. */
  shouldUpdateRepository?: boolean;
}

export function staticSiteResetPropertiesARMResourcePropertiesSerializer(
  item: StaticSiteResetPropertiesARMResourceProperties,
): any {
  return {
    repositoryToken: item["repositoryToken"],
    shouldUpdateRepository: item["shouldUpdateRepository"],
  };
}

/** Collection of static site database connections. */
export interface _DatabaseConnectionCollection {
  /** The DatabaseConnection items on this page */
  value: DatabaseConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _databaseConnectionCollectionDeserializer(
  item: any,
): _DatabaseConnectionCollection {
  return {
    value: databaseConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function databaseConnectionArraySerializer(result: Array<DatabaseConnection>): any[] {
  return result.map((item) => {
    return databaseConnectionSerializer(item);
  });
}

export function databaseConnectionArrayDeserializer(result: Array<DatabaseConnection>): any[] {
  return result.map((item) => {
    return databaseConnectionDeserializer(item);
  });
}

/** Static Site Database Connection resource. */
export interface DatabaseConnection extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** The resource id of the database. */
  resourceId?: string;
  /** If present, the identity is used in conjunction with connection string to connect to the database. Use of the system-assigned managed identity is indicated with the string 'SystemAssigned', while use of a user-assigned managed identity is indicated with the resource id of the managed identity resource. */
  connectionIdentity?: string;
  /** The connection string to use to connect to the database. */
  connectionString?: string;
  /** The region of the database resource. */
  region?: string;
  /** A list of configuration files associated with this database connection. */
  readonly configurationFiles?: StaticSiteDatabaseConnectionConfigurationFileOverview[];
}

export function databaseConnectionSerializer(item: DatabaseConnection): any {
  return {
    properties: areAllPropsUndefined(item, [
      "resourceId",
      "connectionIdentity",
      "connectionString",
      "region",
    ])
      ? undefined
      : _databaseConnectionPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function databaseConnectionDeserializer(item: any): DatabaseConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _databaseConnectionPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** DatabaseConnection resource specific properties */
export interface DatabaseConnectionProperties {
  /** The resource id of the database. */
  resourceId: string;
  /** If present, the identity is used in conjunction with connection string to connect to the database. Use of the system-assigned managed identity is indicated with the string 'SystemAssigned', while use of a user-assigned managed identity is indicated with the resource id of the managed identity resource. */
  connectionIdentity?: string;
  /** The connection string to use to connect to the database. */
  connectionString?: string;
  /** The region of the database resource. */
  region: string;
  /** A list of configuration files associated with this database connection. */
  readonly configurationFiles?: StaticSiteDatabaseConnectionConfigurationFileOverview[];
}

export function databaseConnectionPropertiesSerializer(item: DatabaseConnectionProperties): any {
  return {
    resourceId: item["resourceId"],
    connectionIdentity: item["connectionIdentity"],
    connectionString: item["connectionString"],
    region: item["region"],
  };
}

export function databaseConnectionPropertiesDeserializer(item: any): DatabaseConnectionProperties {
  return {
    resourceId: item["resourceId"],
    connectionIdentity: item["connectionIdentity"],
    connectionString: item["connectionString"],
    region: item["region"],
    configurationFiles: !item["configurationFiles"]
      ? item["configurationFiles"]
      : staticSiteDatabaseConnectionConfigurationFileOverviewArrayDeserializer(
          item["configurationFiles"],
        ),
  };
}

/** Static site zip deployment ARM resource. */
export interface StaticSiteZipDeploymentARMResource extends ProxyOnlyResource {
  /** URL for the zipped app content */
  appZipUrl?: string;
  /** URL for the zipped api content */
  apiZipUrl?: string;
  /** A title to label the deployment */
  deploymentTitle?: string;
  /** The provider submitting this deployment */
  provider?: string;
  /** The language of the api content, if it exists */
  functionLanguage?: string;
}

export function staticSiteZipDeploymentARMResourceSerializer(
  item: StaticSiteZipDeploymentARMResource,
): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "appZipUrl",
      "apiZipUrl",
      "deploymentTitle",
      "provider",
      "functionLanguage",
    ])
      ? undefined
      : _staticSiteZipDeploymentARMResourcePropertiesSerializer(item),
  };
}

/** A static site zip deployment. */
export interface StaticSiteZipDeployment {
  /** URL for the zipped app content */
  appZipUrl?: string;
  /** URL for the zipped api content */
  apiZipUrl?: string;
  /** A title to label the deployment */
  deploymentTitle?: string;
  /** The provider submitting this deployment */
  provider?: string;
  /** The language of the api content, if it exists */
  functionLanguage?: string;
}

export function staticSiteZipDeploymentSerializer(item: StaticSiteZipDeployment): any {
  return {
    appZipUrl: item["appZipUrl"],
    apiZipUrl: item["apiZipUrl"],
    deploymentTitle: item["deploymentTitle"],
    provider: item["provider"],
    functionLanguage: item["functionLanguage"],
  };
}

/** Static Site Build ARM resource. */
export interface StaticSiteBuildARMResource extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** An identifier for the static site build. */
  readonly buildId?: string;
  /** The source branch. */
  readonly sourceBranch?: string;
  /** The title of a pull request that a static site build is related to. */
  readonly pullRequestTitle?: string;
  /** The hostname for a static site build. */
  readonly hostname?: string;
  /** When this build was created. */
  readonly createdTimeUtc?: Date;
  /** When this build was updated. */
  readonly lastUpdatedOn?: Date;
  /** The status of the static site build. */
  readonly status?: BuildStatus;
  /** User provided function apps registered with the static site build */
  readonly userProvidedFunctionApps?: StaticSiteUserProvidedFunctionApp[];
  /** Backends linked to the static side build */
  readonly linkedBackends?: StaticSiteLinkedBackend[];
  /** Database connections for the static site build */
  readonly databaseConnections?: DatabaseConnectionOverview[];
}

export function staticSiteBuildARMResourceDeserializer(item: any): StaticSiteBuildARMResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _staticSiteBuildARMResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** StaticSiteBuildARMResource resource specific properties */
export interface StaticSiteBuildARMResourceProperties {
  /** An identifier for the static site build. */
  readonly buildId?: string;
  /** The source branch. */
  readonly sourceBranch?: string;
  /** The title of a pull request that a static site build is related to. */
  readonly pullRequestTitle?: string;
  /** The hostname for a static site build. */
  readonly hostname?: string;
  /** When this build was created. */
  readonly createdTimeUtc?: Date;
  /** When this build was updated. */
  readonly lastUpdatedOn?: Date;
  /** The status of the static site build. */
  readonly status?: BuildStatus;
  /** User provided function apps registered with the static site build */
  readonly userProvidedFunctionApps?: StaticSiteUserProvidedFunctionApp[];
  /** Backends linked to the static side build */
  readonly linkedBackends?: StaticSiteLinkedBackend[];
  /** Database connections for the static site build */
  readonly databaseConnections?: DatabaseConnectionOverview[];
}

export function staticSiteBuildARMResourcePropertiesDeserializer(
  item: any,
): StaticSiteBuildARMResourceProperties {
  return {
    buildId: item["buildId"],
    sourceBranch: item["sourceBranch"],
    pullRequestTitle: item["pullRequestTitle"],
    hostname: item["hostname"],
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
    status: item["status"],
    userProvidedFunctionApps: !item["userProvidedFunctionApps"]
      ? item["userProvidedFunctionApps"]
      : staticSiteUserProvidedFunctionAppArrayDeserializer(item["userProvidedFunctionApps"]),
    linkedBackends: !item["linkedBackends"]
      ? item["linkedBackends"]
      : staticSiteLinkedBackendArrayDeserializer(item["linkedBackends"]),
    databaseConnections: !item["databaseConnections"]
      ? item["databaseConnections"]
      : databaseConnectionOverviewArrayDeserializer(item["databaseConnections"]),
  };
}

/** The status of the static site build. */
export enum KnownBuildStatus {
  /** WaitingForDeployment */
  WaitingForDeployment = "WaitingForDeployment",
  /** Uploading */
  Uploading = "Uploading",
  /** Deploying */
  Deploying = "Deploying",
  /** Ready */
  Ready = "Ready",
  /** Failed */
  Failed = "Failed",
  /** Deleting */
  Deleting = "Deleting",
  /** Detached */
  Detached = "Detached",
}

/**
 * The status of the static site build. \
 * {@link KnownBuildStatus} can be used interchangeably with BuildStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WaitingForDeployment** \
 * **Uploading** \
 * **Deploying** \
 * **Ready** \
 * **Failed** \
 * **Deleting** \
 * **Detached**
 */
export type BuildStatus = string;

/** Collection of static site builds. */
export interface _StaticSiteBuildCollection {
  /** The StaticSiteBuildARMResource items on this page */
  value: StaticSiteBuildARMResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _staticSiteBuildCollectionDeserializer(item: any): _StaticSiteBuildCollection {
  return {
    value: staticSiteBuildARMResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function staticSiteBuildARMResourceArrayDeserializer(
  result: Array<StaticSiteBuildARMResource>,
): any[] {
  return result.map((item) => {
    return staticSiteBuildARMResourceDeserializer(item);
  });
}

/** Static Site Database Connection Request Properties resource when patching */
export interface DatabaseConnectionPatchRequest {
  /** The resource id of the database. */
  resourceId?: string;
  /** If present, the identity is used in conjunction with connection string to connect to the database. Use of the system-assigned managed identity is indicated with the string 'SystemAssigned', while use of a user-assigned managed identity is indicated with the resource id of the managed identity resource. */
  connectionIdentity?: string;
  /** The connection string to use to connect to the database. */
  connectionString?: string;
  /** The region of the database resource. */
  region?: string;
}

export function databaseConnectionPatchRequestSerializer(
  item: DatabaseConnectionPatchRequest,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "resourceId",
      "connectionIdentity",
      "connectionString",
      "region",
    ])
      ? undefined
      : _databaseConnectionPatchRequestPropertiesSerializer(item),
  };
}

/** DatabaseConnectionPatchRequest resource specific properties */
export interface DatabaseConnectionPatchRequestProperties {
  /** The resource id of the database. */
  resourceId?: string;
  /** If present, the identity is used in conjunction with connection string to connect to the database. Use of the system-assigned managed identity is indicated with the string 'SystemAssigned', while use of a user-assigned managed identity is indicated with the resource id of the managed identity resource. */
  connectionIdentity?: string;
  /** The connection string to use to connect to the database. */
  connectionString?: string;
  /** The region of the database resource. */
  region?: string;
}

export function databaseConnectionPatchRequestPropertiesSerializer(
  item: DatabaseConnectionPatchRequestProperties,
): any {
  return {
    resourceId: item["resourceId"],
    connectionIdentity: item["connectionIdentity"],
    connectionString: item["connectionString"],
    region: item["region"],
  };
}

/** Static Site User Provided Function App ARM resource. */
export interface StaticSiteUserProvidedFunctionAppARMResource extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** The resource id of the function app registered with the static site */
  functionAppResourceId?: string;
  /** The region of the function app registered with the static site */
  functionAppRegion?: string;
  /** The date and time on which the function app was registered with the static site. */
  readonly createdOn?: Date;
}

export function staticSiteUserProvidedFunctionAppARMResourceSerializer(
  item: StaticSiteUserProvidedFunctionAppARMResource,
): any {
  return {
    properties: areAllPropsUndefined(item, ["functionAppResourceId", "functionAppRegion"])
      ? undefined
      : _staticSiteUserProvidedFunctionAppARMResourcePropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function staticSiteUserProvidedFunctionAppARMResourceDeserializer(
  item: any,
): StaticSiteUserProvidedFunctionAppARMResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _staticSiteUserProvidedFunctionAppARMResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** StaticSiteUserProvidedFunctionAppARMResource resource specific properties */
export interface StaticSiteUserProvidedFunctionAppARMResourceProperties {
  /** The resource id of the function app registered with the static site */
  functionAppResourceId?: string;
  /** The region of the function app registered with the static site */
  functionAppRegion?: string;
  /** The date and time on which the function app was registered with the static site. */
  readonly createdOn?: Date;
}

export function staticSiteUserProvidedFunctionAppARMResourcePropertiesSerializer(
  item: StaticSiteUserProvidedFunctionAppARMResourceProperties,
): any {
  return {
    functionAppResourceId: item["functionAppResourceId"],
    functionAppRegion: item["functionAppRegion"],
  };
}

export function staticSiteUserProvidedFunctionAppARMResourcePropertiesDeserializer(
  item: any,
): StaticSiteUserProvidedFunctionAppARMResourceProperties {
  return {
    functionAppResourceId: item["functionAppResourceId"],
    functionAppRegion: item["functionAppRegion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
  };
}

/** Collection of static site user provided function apps. */
export interface _StaticSiteUserProvidedFunctionAppsCollection {
  /** The StaticSiteUserProvidedFunctionAppARMResource items on this page */
  value: StaticSiteUserProvidedFunctionAppARMResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _staticSiteUserProvidedFunctionAppsCollectionDeserializer(
  item: any,
): _StaticSiteUserProvidedFunctionAppsCollection {
  return {
    value: staticSiteUserProvidedFunctionAppARMResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function staticSiteUserProvidedFunctionAppARMResourceArraySerializer(
  result: Array<StaticSiteUserProvidedFunctionAppARMResource>,
): any[] {
  return result.map((item) => {
    return staticSiteUserProvidedFunctionAppARMResourceSerializer(item);
  });
}

export function staticSiteUserProvidedFunctionAppARMResourceArrayDeserializer(
  result: Array<StaticSiteUserProvidedFunctionAppARMResource>,
): any[] {
  return result.map((item) => {
    return staticSiteUserProvidedFunctionAppARMResourceDeserializer(item);
  });
}

/** Static site basic auth properties ARM resource. */
export interface StaticSiteBasicAuthPropertiesARMResource extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** The password for basic auth. */
  password?: string;
  /** Url to the secret in Key Vault. */
  secretUrl?: string;
  /** State indicating if basic auth is enabled and for what environments it is active. */
  applicableEnvironmentsMode?: string;
  /** The list of enabled environments for Basic Auth if ApplicableEnvironmentsMode is set to SpecifiedEnvironments. */
  environments?: string[];
  /** State indicating if basic auth has a secret and what type it is. */
  readonly secretState?: string;
}

export function staticSiteBasicAuthPropertiesARMResourceSerializer(
  item: StaticSiteBasicAuthPropertiesARMResource,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "password",
      "secretUrl",
      "applicableEnvironmentsMode",
      "environments",
    ])
      ? undefined
      : _staticSiteBasicAuthPropertiesARMResourcePropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function staticSiteBasicAuthPropertiesARMResourceDeserializer(
  item: any,
): StaticSiteBasicAuthPropertiesARMResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _staticSiteBasicAuthPropertiesARMResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** StaticSiteBasicAuthPropertiesARMResource resource specific properties */
export interface StaticSiteBasicAuthPropertiesARMResourceProperties {
  /** The password for basic auth. */
  password?: string;
  /** Url to the secret in Key Vault. */
  secretUrl?: string;
  /** State indicating if basic auth is enabled and for what environments it is active. */
  applicableEnvironmentsMode: string;
  /** The list of enabled environments for Basic Auth if ApplicableEnvironmentsMode is set to SpecifiedEnvironments. */
  environments?: string[];
  /** State indicating if basic auth has a secret and what type it is. */
  readonly secretState?: string;
}

export function staticSiteBasicAuthPropertiesARMResourcePropertiesSerializer(
  item: StaticSiteBasicAuthPropertiesARMResourceProperties,
): any {
  return {
    password: item["password"],
    secretUrl: item["secretUrl"],
    applicableEnvironmentsMode: item["applicableEnvironmentsMode"],
    environments: !item["environments"]
      ? item["environments"]
      : item["environments"].map((p: any) => {
          return p;
        }),
  };
}

export function staticSiteBasicAuthPropertiesARMResourcePropertiesDeserializer(
  item: any,
): StaticSiteBasicAuthPropertiesARMResourceProperties {
  return {
    password: item["password"],
    secretUrl: item["secretUrl"],
    applicableEnvironmentsMode: item["applicableEnvironmentsMode"],
    environments: !item["environments"]
      ? item["environments"]
      : item["environments"].map((p: any) => {
          return p;
        }),
    secretState: item["secretState"],
  };
}

/** Known values of {@link BasicAuthName} that the service accepts. */
export enum KnownBasicAuthName {
  /** default */
  Default = "default",
}

/** Type of BasicAuthName */
export type BasicAuthName = string;

/** Collection of static site basic auth. */
export interface _StaticSiteBasicAuthPropertiesCollection {
  /** The StaticSiteBasicAuthPropertiesARMResource items on this page */
  value: StaticSiteBasicAuthPropertiesARMResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _staticSiteBasicAuthPropertiesCollectionDeserializer(
  item: any,
): _StaticSiteBasicAuthPropertiesCollection {
  return {
    value: staticSiteBasicAuthPropertiesARMResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function staticSiteBasicAuthPropertiesARMResourceArraySerializer(
  result: Array<StaticSiteBasicAuthPropertiesARMResource>,
): any[] {
  return result.map((item) => {
    return staticSiteBasicAuthPropertiesARMResourceSerializer(item);
  });
}

export function staticSiteBasicAuthPropertiesARMResourceArrayDeserializer(
  result: Array<StaticSiteBasicAuthPropertiesARMResource>,
): any[] {
  return result.map((item) => {
    return staticSiteBasicAuthPropertiesARMResourceDeserializer(item);
  });
}

/** Static Site Custom Domain Overview ARM resource. */
export interface StaticSiteCustomDomainOverviewARMResource extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** The domain name for the static site custom domain. */
  readonly domainName?: string;
  /** The date and time on which the custom domain was created for the static site. */
  readonly createdOn?: Date;
  /** The status of the custom domain */
  readonly status?: CustomDomainStatus;
  /** The TXT record validation token */
  readonly validationToken?: string;
  readonly errorMessage?: string;
}

export function staticSiteCustomDomainOverviewARMResourceDeserializer(
  item: any,
): StaticSiteCustomDomainOverviewARMResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _staticSiteCustomDomainOverviewARMResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** StaticSiteCustomDomainOverviewARMResource resource specific properties */
export interface StaticSiteCustomDomainOverviewARMResourceProperties {
  /** The domain name for the static site custom domain. */
  readonly domainName?: string;
  /** The date and time on which the custom domain was created for the static site. */
  readonly createdOn?: Date;
  /** The status of the custom domain */
  readonly status?: CustomDomainStatus;
  /** The TXT record validation token */
  readonly validationToken?: string;
  readonly errorMessage?: string;
}

export function staticSiteCustomDomainOverviewARMResourcePropertiesDeserializer(
  item: any,
): StaticSiteCustomDomainOverviewARMResourceProperties {
  return {
    domainName: item["domainName"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    status: item["status"],
    validationToken: item["validationToken"],
    errorMessage: item["errorMessage"],
  };
}

/** The status of the custom domain */
export enum KnownCustomDomainStatus {
  /** RetrievingValidationToken */
  RetrievingValidationToken = "RetrievingValidationToken",
  /** Validating */
  Validating = "Validating",
  /** Adding */
  Adding = "Adding",
  /** Ready */
  Ready = "Ready",
  /** Failed */
  Failed = "Failed",
  /** Deleting */
  Deleting = "Deleting",
  /** Unhealthy */
  Unhealthy = "Unhealthy",
}

/**
 * The status of the custom domain \
 * {@link KnownCustomDomainStatus} can be used interchangeably with CustomDomainStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RetrievingValidationToken** \
 * **Validating** \
 * **Adding** \
 * **Ready** \
 * **Failed** \
 * **Deleting** \
 * **Unhealthy**
 */
export type CustomDomainStatus = string;

/** Static Site Custom Domain Request Properties ARM resource. */
export interface StaticSiteCustomDomainRequestPropertiesARMResource extends ProxyOnlyResource {
  /** Validation method for adding a custom domain */
  validationMethod?: string;
}

export function staticSiteCustomDomainRequestPropertiesARMResourceSerializer(
  item: StaticSiteCustomDomainRequestPropertiesARMResource,
): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["validationMethod"])
      ? undefined
      : _staticSiteCustomDomainRequestPropertiesARMResourcePropertiesSerializer(item),
  };
}

/** StaticSiteCustomDomainRequestPropertiesARMResource resource specific properties */
export interface StaticSiteCustomDomainRequestPropertiesARMResourceProperties {
  /** Validation method for adding a custom domain */
  validationMethod?: string;
}

export function staticSiteCustomDomainRequestPropertiesARMResourcePropertiesSerializer(
  item: StaticSiteCustomDomainRequestPropertiesARMResourceProperties,
): any {
  return { validationMethod: item["validationMethod"] };
}

/** Collection of static site custom domains. */
export interface _StaticSiteCustomDomainOverviewCollection {
  /** The StaticSiteCustomDomainOverviewARMResource items on this page */
  value: StaticSiteCustomDomainOverviewARMResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _staticSiteCustomDomainOverviewCollectionDeserializer(
  item: any,
): _StaticSiteCustomDomainOverviewCollection {
  return {
    value: staticSiteCustomDomainOverviewARMResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function staticSiteCustomDomainOverviewARMResourceArrayDeserializer(
  result: Array<StaticSiteCustomDomainOverviewARMResource>,
): any[] {
  return result.map((item) => {
    return staticSiteCustomDomainOverviewARMResourceDeserializer(item);
  });
}

/** Static Site Linked Backend ARM resource. */
export interface StaticSiteLinkedBackendARMResource extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** The resource id of the backend linked to the static site */
  backendResourceId?: string;
  /** The region of the backend linked to the static site */
  region?: string;
  /** The date and time on which the backend was linked to the static site. */
  readonly createdOn?: Date;
  /** The provisioning state of the linking process. */
  readonly provisioningState?: string;
}

export function staticSiteLinkedBackendARMResourceSerializer(
  item: StaticSiteLinkedBackendARMResource,
): any {
  return {
    properties: areAllPropsUndefined(item, ["backendResourceId", "region"])
      ? undefined
      : _staticSiteLinkedBackendARMResourcePropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function staticSiteLinkedBackendARMResourceDeserializer(
  item: any,
): StaticSiteLinkedBackendARMResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _staticSiteLinkedBackendARMResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** StaticSiteLinkedBackendARMResource resource specific properties */
export interface StaticSiteLinkedBackendARMResourceProperties {
  /** The resource id of the backend linked to the static site */
  backendResourceId?: string;
  /** The region of the backend linked to the static site */
  region?: string;
  /** The date and time on which the backend was linked to the static site. */
  readonly createdOn?: Date;
  /** The provisioning state of the linking process. */
  readonly provisioningState?: string;
}

export function staticSiteLinkedBackendARMResourcePropertiesSerializer(
  item: StaticSiteLinkedBackendARMResourceProperties,
): any {
  return { backendResourceId: item["backendResourceId"], region: item["region"] };
}

export function staticSiteLinkedBackendARMResourcePropertiesDeserializer(
  item: any,
): StaticSiteLinkedBackendARMResourceProperties {
  return {
    backendResourceId: item["backendResourceId"],
    region: item["region"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    provisioningState: item["provisioningState"],
  };
}

/** Collection of static site linked backends. */
export interface _StaticSiteLinkedBackendsCollection {
  /** The StaticSiteLinkedBackendARMResource items on this page */
  value: StaticSiteLinkedBackendARMResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _staticSiteLinkedBackendsCollectionDeserializer(
  item: any,
): _StaticSiteLinkedBackendsCollection {
  return {
    value: staticSiteLinkedBackendARMResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function staticSiteLinkedBackendARMResourceArraySerializer(
  result: Array<StaticSiteLinkedBackendARMResource>,
): any[] {
  return result.map((item) => {
    return staticSiteLinkedBackendARMResourceSerializer(item);
  });
}

export function staticSiteLinkedBackendARMResourceArrayDeserializer(
  result: Array<StaticSiteLinkedBackendARMResource>,
): any[] {
  return result.map((item) => {
    return staticSiteLinkedBackendARMResourceDeserializer(item);
  });
}

/** Request entity for previewing the Static Site workflow */
export interface StaticSitesWorkflowPreviewRequest extends ProxyOnlyResource {
  /** URL for the repository of the static site. */
  repositoryUrl?: string;
  /** The target branch in the repository. */
  branch?: string;
  /** Build properties to configure on the repository. */
  buildProperties?: StaticSiteBuildProperties;
}

export function staticSitesWorkflowPreviewRequestSerializer(
  item: StaticSitesWorkflowPreviewRequest,
): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["repositoryUrl", "branch", "buildProperties"])
      ? undefined
      : _staticSitesWorkflowPreviewRequestPropertiesSerializer(item),
  };
}

/** StaticSitesWorkflowPreviewRequest resource specific properties */
export interface StaticSitesWorkflowPreviewRequestProperties {
  /** URL for the repository of the static site. */
  repositoryUrl?: string;
  /** The target branch in the repository. */
  branch?: string;
  /** Build properties to configure on the repository. */
  buildProperties?: StaticSiteBuildProperties;
}

export function staticSitesWorkflowPreviewRequestPropertiesSerializer(
  item: StaticSitesWorkflowPreviewRequestProperties,
): any {
  return {
    repositoryUrl: item["repositoryUrl"],
    branch: item["branch"],
    buildProperties: !item["buildProperties"]
      ? item["buildProperties"]
      : staticSiteBuildPropertiesSerializer(item["buildProperties"]),
  };
}

/** Preview for the Static Site Workflow to be generated */
export interface StaticSitesWorkflowPreview extends ProxyOnlyResource {
  /** The path for the workflow file to be generated */
  readonly path?: string;
  /** The contents for the workflow file to be generated */
  readonly contents?: string;
}

export function staticSitesWorkflowPreviewDeserializer(item: any): StaticSitesWorkflowPreview {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _staticSitesWorkflowPreviewPropertiesDeserializer(item["properties"])),
  };
}

/** StaticSitesWorkflowPreview resource specific properties */
export interface StaticSitesWorkflowPreviewProperties {
  /** The path for the workflow file to be generated */
  readonly path?: string;
  /** The contents for the workflow file to be generated */
  readonly contents?: string;
}

export function staticSitesWorkflowPreviewPropertiesDeserializer(
  item: any,
): StaticSitesWorkflowPreviewProperties {
  return {
    path: item["path"],
    contents: item["contents"],
  };
}

/** ARM resource for a site. */
export interface SitePatchResource extends ProxyOnlyResource {
  /** Managed service identity. */
  identity?: ManagedServiceIdentity;
  /** Current state of the app. */
  readonly state?: string;
  /** Hostnames associated with the app. */
  readonly hostNames?: string[];
  /** Name of the repository site. */
  readonly repositorySiteName?: string;
  /** State indicating whether the app has exceeded its quota usage. Read-only. */
  readonly usageState?: UsageState;
  /** <code>true</code> if the app is enabled; otherwise, <code>false</code>. Setting this value to false disables the app (takes the app offline). */
  enabled?: boolean;
  /**
   * Enabled hostnames for the app.Hostnames need to be assigned (see HostNames) AND enabled. Otherwise,
   * the app is not served on those hostnames.
   */
  readonly enabledHostNames?: string[];
  /** Management information availability state for the app. */
  readonly availabilityState?: SiteAvailabilityState;
  /** Hostname SSL states are used to manage the SSL bindings for app's hostnames. */
  hostNameSslStates?: HostNameSslState[];
  /** Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}". */
  serverFarmId?: string;
  /** <code>true</code> if reserved; otherwise, <code>false</code>. */
  reserved?: boolean;
  /** Obsolete: Hyper-V sandbox. */
  isXenon?: boolean;
  /** Hyper-V sandbox. */
  hyperV?: boolean;
  /** Last time the app was modified, in UTC. Read-only. */
  readonly lastModifiedTimeUtc?: Date;
  /** Property to configure various DNS related settings for a site. */
  dnsConfiguration?: SiteDnsConfig;
  /** Configuration of the app. */
  siteConfig?: SiteConfig;
  /** Azure Traffic Manager hostnames associated with the app. Read-only. */
  readonly trafficManagerHostNames?: string[];
  /** <code>true</code> to stop SCM (KUDU) site when the app is stopped; otherwise, <code>false</code>. The default is <code>false</code>. */
  scmSiteAlsoStopped?: boolean;
  /** Specifies which deployment slot this app will swap into. Read-only. */
  readonly targetSwapSlot?: string;
  /** App Service Environment to use for the app. */
  hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /** <code>true</code> to enable client affinity; <code>false</code> to stop sending session affinity cookies, which route client requests in the same session to the same instance. Default is <code>true</code>. */
  clientAffinityEnabled?: boolean;
  /** <code>true</code> to override client affinity cookie domain with X-Forwarded-Host request header. <code>false</code> to use default domain. Default is <code>false</code>. */
  clientAffinityProxyEnabled?: boolean;
  /** <code>true</code> to enable client certificate authentication (TLS mutual authentication); otherwise, <code>false</code>. Default is <code>false</code>. */
  clientCertEnabled?: boolean;
  /**
   * This composes with ClientCertEnabled setting.
   * - ClientCertEnabled: false means ClientCert is ignored.
   * - ClientCertEnabled: true and ClientCertMode: Required means ClientCert is required.
   * - ClientCertEnabled: true and ClientCertMode: Optional means ClientCert is optional or accepted.
   */
  clientCertMode?: ClientCertMode;
  /** client certificate authentication comma-separated exclusion paths */
  clientCertExclusionPaths?: string;
  /** <code>true</code> to disable the public hostnames of the app; otherwise, <code>false</code>.\n If <code>true</code>, the app is only accessible via API management process. */
  hostNamesDisabled?: boolean;
  /** Unique identifier that verifies the custom domains assigned to the app. Customer will add this id to a txt record for verification. */
  customDomainVerificationId?: string;
  /** List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from tenants that site can be hosted with current settings. Read-only. */
  readonly outboundIpAddresses?: string;
  /** List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from all tenants except dataComponent. Read-only. */
  readonly possibleOutboundIpAddresses?: string;
  /** Size of the function container. */
  containerSize?: number;
  /** Maximum allowed daily memory-time quota (applicable on dynamic apps only). */
  dailyMemoryTimeQuota?: number;
  /** App suspended till in case memory-time quota is exceeded. */
  readonly suspendedTill?: Date;
  /**
   * Maximum number of workers.
   * This only applies to Functions container.
   */
  readonly maxNumberOfWorkers?: number;
  /** If specified during app creation, the app is cloned from a source app. */
  cloningInfo?: CloningInfo;
  /** Name of the resource group the app belongs to. Read-only. */
  readonly resourceGroup?: string;
  /** <code>true</code> if the app is a default container; otherwise, <code>false</code>. */
  readonly isDefaultContainer?: boolean;
  /** Default hostname of the app. Read-only. */
  readonly defaultHostName?: string;
  /** Status of the last deployment slot swap operation. */
  readonly slotSwapStatus?: SlotSwapStatus;
  /**
   * HttpsOnly: configures a web site to accept only https requests. Issues redirect for
   * http requests
   */
  httpsOnly?: boolean;
  /** Site redundancy mode */
  redundancyMode?: RedundancyMode;
  /** Specifies an operation id if this site has a pending operation. */
  readonly inProgressOperationId?: string;
  /** Property to allow or block all public traffic. Allowed Values: 'Enabled', 'Disabled' or an empty string. */
  publicNetworkAccess?: string;
  /** Checks if Customer provided storage account is required */
  storageAccountRequired?: boolean;
  /** Identity to use for Key Vault Reference authentication. */
  keyVaultReferenceIdentity?: string;
  /**
   * Azure Resource Manager ID of the Virtual network and subnet to be joined by Regional VNET Integration.
   * This must be of the form /subscriptions/{subscriptionName}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}
   */
  virtualNetworkSubnetId?: string;
}

export function sitePatchResourceSerializer(item: SitePatchResource): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "enabled",
      "hostNameSslStates",
      "serverFarmId",
      "reserved",
      "isXenon",
      "hyperV",
      "dnsConfiguration",
      "siteConfig",
      "scmSiteAlsoStopped",
      "hostingEnvironmentProfile",
      "clientAffinityEnabled",
      "clientAffinityProxyEnabled",
      "clientCertEnabled",
      "clientCertMode",
      "clientCertExclusionPaths",
      "hostNamesDisabled",
      "customDomainVerificationId",
      "containerSize",
      "dailyMemoryTimeQuota",
      "cloningInfo",
      "httpsOnly",
      "redundancyMode",
      "publicNetworkAccess",
      "storageAccountRequired",
      "keyVaultReferenceIdentity",
      "virtualNetworkSubnetId",
    ])
      ? undefined
      : _sitePatchResourcePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** SitePatchResource resource specific properties */
export interface SitePatchResourceProperties {
  /** Current state of the app. */
  readonly state?: string;
  /** Hostnames associated with the app. */
  readonly hostNames?: string[];
  /** Name of the repository site. */
  readonly repositorySiteName?: string;
  /** State indicating whether the app has exceeded its quota usage. Read-only. */
  readonly usageState?: UsageState;
  /** <code>true</code> if the app is enabled; otherwise, <code>false</code>. Setting this value to false disables the app (takes the app offline). */
  enabled?: boolean;
  /**
   * Enabled hostnames for the app.Hostnames need to be assigned (see HostNames) AND enabled. Otherwise,
   * the app is not served on those hostnames.
   */
  readonly enabledHostNames?: string[];
  /** Management information availability state for the app. */
  readonly availabilityState?: SiteAvailabilityState;
  /** Hostname SSL states are used to manage the SSL bindings for app's hostnames. */
  hostNameSslStates?: HostNameSslState[];
  /** Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}". */
  serverFarmId?: string;
  /** <code>true</code> if reserved; otherwise, <code>false</code>. */
  reserved?: boolean;
  /** Obsolete: Hyper-V sandbox. */
  isXenon?: boolean;
  /** Hyper-V sandbox. */
  hyperV?: boolean;
  /** Last time the app was modified, in UTC. Read-only. */
  readonly lastModifiedTimeUtc?: Date;
  /** Property to configure various DNS related settings for a site. */
  dnsConfiguration?: SiteDnsConfig;
  /** Configuration of the app. */
  siteConfig?: SiteConfig;
  /** Azure Traffic Manager hostnames associated with the app. Read-only. */
  readonly trafficManagerHostNames?: string[];
  /** <code>true</code> to stop SCM (KUDU) site when the app is stopped; otherwise, <code>false</code>. The default is <code>false</code>. */
  scmSiteAlsoStopped?: boolean;
  /** Specifies which deployment slot this app will swap into. Read-only. */
  readonly targetSwapSlot?: string;
  /** App Service Environment to use for the app. */
  hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /** <code>true</code> to enable client affinity; <code>false</code> to stop sending session affinity cookies, which route client requests in the same session to the same instance. Default is <code>true</code>. */
  clientAffinityEnabled?: boolean;
  /** <code>true</code> to override client affinity cookie domain with X-Forwarded-Host request header. <code>false</code> to use default domain. Default is <code>false</code>. */
  clientAffinityProxyEnabled?: boolean;
  /** <code>true</code> to enable client certificate authentication (TLS mutual authentication); otherwise, <code>false</code>. Default is <code>false</code>. */
  clientCertEnabled?: boolean;
  /**
   * This composes with ClientCertEnabled setting.
   * - ClientCertEnabled: false means ClientCert is ignored.
   * - ClientCertEnabled: true and ClientCertMode: Required means ClientCert is required.
   * - ClientCertEnabled: true and ClientCertMode: Optional means ClientCert is optional or accepted.
   */
  clientCertMode?: ClientCertMode;
  /** client certificate authentication comma-separated exclusion paths */
  clientCertExclusionPaths?: string;
  /** <code>true</code> to disable the public hostnames of the app; otherwise, <code>false</code>.\n If <code>true</code>, the app is only accessible via API management process. */
  hostNamesDisabled?: boolean;
  /** Unique identifier that verifies the custom domains assigned to the app. Customer will add this id to a txt record for verification. */
  customDomainVerificationId?: string;
  /** List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from tenants that site can be hosted with current settings. Read-only. */
  readonly outboundIpAddresses?: string;
  /** List of IP addresses that the app uses for outbound connections (e.g. database access). Includes VIPs from all tenants except dataComponent. Read-only. */
  readonly possibleOutboundIpAddresses?: string;
  /** Size of the function container. */
  containerSize?: number;
  /** Maximum allowed daily memory-time quota (applicable on dynamic apps only). */
  dailyMemoryTimeQuota?: number;
  /** App suspended till in case memory-time quota is exceeded. */
  readonly suspendedTill?: Date;
  /**
   * Maximum number of workers.
   * This only applies to Functions container.
   */
  readonly maxNumberOfWorkers?: number;
  /** If specified during app creation, the app is cloned from a source app. */
  cloningInfo?: CloningInfo;
  /** Name of the resource group the app belongs to. Read-only. */
  readonly resourceGroup?: string;
  /** <code>true</code> if the app is a default container; otherwise, <code>false</code>. */
  readonly isDefaultContainer?: boolean;
  /** Default hostname of the app. Read-only. */
  readonly defaultHostName?: string;
  /** Status of the last deployment slot swap operation. */
  readonly slotSwapStatus?: SlotSwapStatus;
  /**
   * HttpsOnly: configures a web site to accept only https requests. Issues redirect for
   * http requests
   */
  httpsOnly?: boolean;
  /** Site redundancy mode */
  redundancyMode?: RedundancyMode;
  /** Specifies an operation id if this site has a pending operation. */
  readonly inProgressOperationId?: string;
  /** Property to allow or block all public traffic. Allowed Values: 'Enabled', 'Disabled' or an empty string. */
  publicNetworkAccess?: string;
  /** Checks if Customer provided storage account is required */
  storageAccountRequired?: boolean;
  /** Identity to use for Key Vault Reference authentication. */
  keyVaultReferenceIdentity?: string;
  /**
   * Azure Resource Manager ID of the Virtual network and subnet to be joined by Regional VNET Integration.
   * This must be of the form /subscriptions/{subscriptionName}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}
   */
  virtualNetworkSubnetId?: string;
}

export function sitePatchResourcePropertiesSerializer(item: SitePatchResourceProperties): any {
  return {
    enabled: item["enabled"],
    hostNameSslStates: !item["hostNameSslStates"]
      ? item["hostNameSslStates"]
      : hostNameSslStateArraySerializer(item["hostNameSslStates"]),
    serverFarmId: item["serverFarmId"],
    reserved: item["reserved"],
    isXenon: item["isXenon"],
    hyperV: item["hyperV"],
    dnsConfiguration: !item["dnsConfiguration"]
      ? item["dnsConfiguration"]
      : siteDnsConfigSerializer(item["dnsConfiguration"]),
    siteConfig: !item["siteConfig"] ? item["siteConfig"] : siteConfigSerializer(item["siteConfig"]),
    scmSiteAlsoStopped: item["scmSiteAlsoStopped"],
    hostingEnvironmentProfile: !item["hostingEnvironmentProfile"]
      ? item["hostingEnvironmentProfile"]
      : hostingEnvironmentProfileSerializer(item["hostingEnvironmentProfile"]),
    clientAffinityEnabled: item["clientAffinityEnabled"],
    clientAffinityProxyEnabled: item["clientAffinityProxyEnabled"],
    clientCertEnabled: item["clientCertEnabled"],
    clientCertMode: item["clientCertMode"],
    clientCertExclusionPaths: item["clientCertExclusionPaths"],
    hostNamesDisabled: item["hostNamesDisabled"],
    customDomainVerificationId: item["customDomainVerificationId"],
    containerSize: item["containerSize"],
    dailyMemoryTimeQuota: item["dailyMemoryTimeQuota"],
    cloningInfo: !item["cloningInfo"]
      ? item["cloningInfo"]
      : cloningInfoSerializer(item["cloningInfo"]),
    httpsOnly: item["httpsOnly"],
    redundancyMode: item["redundancyMode"],
    publicNetworkAccess: item["publicNetworkAccess"],
    storageAccountRequired: item["storageAccountRequired"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
    virtualNetworkSubnetId: item["virtualNetworkSubnetId"],
  };
}

/** Custom domain analysis. */
export interface CustomHostnameAnalysisResult extends ProxyOnlyResource {
  /** <code>true</code> if hostname is already verified; otherwise, <code>false</code>. */
  readonly isHostnameAlreadyVerified?: boolean;
  /** DNS verification test result. */
  readonly customDomainVerificationTest?: DnsVerificationTestResult;
  /** Raw failure information if DNS verification fails. */
  readonly customDomainVerificationFailureInfo?: ErrorEntity;
  /** <code>true</code> if there is a conflict on a scale unit; otherwise, <code>false</code>. */
  readonly hasConflictOnScaleUnit?: boolean;
  /** <code>true</code> if there is a conflict across subscriptions; otherwise, <code>false</code>. */
  readonly hasConflictAcrossSubscription?: boolean;
  /** Name of the conflicting app on scale unit if it's within the same subscription. */
  readonly conflictingAppResourceId?: string;
  /** CName records controller can see for this hostname. */
  cNameRecords?: string[];
  /** TXT records controller can see for this hostname. */
  txtRecords?: string[];
  /** A records controller can see for this hostname. */
  aRecords?: string[];
  /** Alternate CName records controller can see for this hostname. */
  alternateCNameRecords?: string[];
  /** Alternate TXT records controller can see for this hostname. */
  alternateTxtRecords?: string[];
}

export function customHostnameAnalysisResultDeserializer(item: any): CustomHostnameAnalysisResult {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _customHostnameAnalysisResultPropertiesDeserializer(item["properties"])),
  };
}

/** CustomHostnameAnalysisResult resource specific properties */
export interface CustomHostnameAnalysisResultProperties {
  /** <code>true</code> if hostname is already verified; otherwise, <code>false</code>. */
  readonly isHostnameAlreadyVerified?: boolean;
  /** DNS verification test result. */
  readonly customDomainVerificationTest?: DnsVerificationTestResult;
  /** Raw failure information if DNS verification fails. */
  readonly customDomainVerificationFailureInfo?: ErrorEntity;
  /** <code>true</code> if there is a conflict on a scale unit; otherwise, <code>false</code>. */
  readonly hasConflictOnScaleUnit?: boolean;
  /** <code>true</code> if there is a conflict across subscriptions; otherwise, <code>false</code>. */
  readonly hasConflictAcrossSubscription?: boolean;
  /** Name of the conflicting app on scale unit if it's within the same subscription. */
  readonly conflictingAppResourceId?: string;
  /** CName records controller can see for this hostname. */
  cNameRecords?: string[];
  /** TXT records controller can see for this hostname. */
  txtRecords?: string[];
  /** A records controller can see for this hostname. */
  aRecords?: string[];
  /** Alternate CName records controller can see for this hostname. */
  alternateCNameRecords?: string[];
  /** Alternate TXT records controller can see for this hostname. */
  alternateTxtRecords?: string[];
}

export function customHostnameAnalysisResultPropertiesDeserializer(
  item: any,
): CustomHostnameAnalysisResultProperties {
  return {
    isHostnameAlreadyVerified: item["isHostnameAlreadyVerified"],
    customDomainVerificationTest: item["customDomainVerificationTest"],
    customDomainVerificationFailureInfo: !item["customDomainVerificationFailureInfo"]
      ? item["customDomainVerificationFailureInfo"]
      : errorEntityDeserializer(item["customDomainVerificationFailureInfo"]),
    hasConflictOnScaleUnit: item["hasConflictOnScaleUnit"],
    hasConflictAcrossSubscription: item["hasConflictAcrossSubscription"],
    conflictingAppResourceId: item["conflictingAppResourceId"],
    cNameRecords: !item["cNameRecords"]
      ? item["cNameRecords"]
      : item["cNameRecords"].map((p: any) => {
          return p;
        }),
    txtRecords: !item["txtRecords"]
      ? item["txtRecords"]
      : item["txtRecords"].map((p: any) => {
          return p;
        }),
    aRecords: !item["aRecords"]
      ? item["aRecords"]
      : item["aRecords"].map((p: any) => {
          return p;
        }),
    alternateCNameRecords: !item["alternateCNameRecords"]
      ? item["alternateCNameRecords"]
      : item["alternateCNameRecords"].map((p: any) => {
          return p;
        }),
    alternateTxtRecords: !item["alternateTxtRecords"]
      ? item["alternateTxtRecords"]
      : item["alternateTxtRecords"].map((p: any) => {
          return p;
        }),
  };
}

/** DNS verification test result. */
export type DnsVerificationTestResult = "Passed" | "Failed" | "Skipped";

/** Deployment slot parameters. */
export interface CsmSlotEntity {
  /** Destination deployment slot during swap operation. */
  targetSlot: string;
  /** <code>true</code> to preserve Virtual Network to the slot during swap; otherwise, <code>false</code>. */
  preserveVnet: boolean;
}

export function csmSlotEntitySerializer(item: CsmSlotEntity): any {
  return { targetSlot: item["targetSlot"], preserveVnet: item["preserveVnet"] };
}

/** Description of a backup which will be performed. */
export interface BackupRequest extends ProxyOnlyResource {
  /** Name of the backup. */
  backupName?: string;
  /** True if the backup schedule is enabled (must be included in that case), false if the backup schedule should be disabled. */
  enabled?: boolean;
  /** SAS URL to the container. */
  storageAccountUrl?: string;
  /** Schedule for the backup if it is executed periodically. */
  backupSchedule?: BackupSchedule;
  /** Databases included in the backup. */
  databases?: DatabaseBackupSetting[];
}

export function backupRequestSerializer(item: BackupRequest): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "backupName",
      "enabled",
      "storageAccountUrl",
      "backupSchedule",
      "databases",
    ])
      ? undefined
      : _backupRequestPropertiesSerializer(item),
  };
}

export function backupRequestDeserializer(item: any): BackupRequest {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _backupRequestPropertiesDeserializer(item["properties"])),
  };
}

/** BackupRequest resource specific properties */
export interface BackupRequestProperties {
  /** Name of the backup. */
  backupName?: string;
  /** True if the backup schedule is enabled (must be included in that case), false if the backup schedule should be disabled. */
  enabled?: boolean;
  /** SAS URL to the container. */
  storageAccountUrl: string;
  /** Schedule for the backup if it is executed periodically. */
  backupSchedule?: BackupSchedule;
  /** Databases included in the backup. */
  databases?: DatabaseBackupSetting[];
}

export function backupRequestPropertiesSerializer(item: BackupRequestProperties): any {
  return {
    backupName: item["backupName"],
    enabled: item["enabled"],
    storageAccountUrl: item["storageAccountUrl"],
    backupSchedule: !item["backupSchedule"]
      ? item["backupSchedule"]
      : backupScheduleSerializer(item["backupSchedule"]),
    databases: !item["databases"]
      ? item["databases"]
      : databaseBackupSettingArraySerializer(item["databases"]),
  };
}

export function backupRequestPropertiesDeserializer(item: any): BackupRequestProperties {
  return {
    backupName: item["backupName"],
    enabled: item["enabled"],
    storageAccountUrl: item["storageAccountUrl"],
    backupSchedule: !item["backupSchedule"]
      ? item["backupSchedule"]
      : backupScheduleDeserializer(item["backupSchedule"]),
    databases: !item["databases"]
      ? item["databases"]
      : databaseBackupSettingArrayDeserializer(item["databases"]),
  };
}

/** Description of a backup schedule. Describes how often should be the backup performed and what should be the retention policy. */
export interface BackupSchedule {
  /** How often the backup should be executed (e.g. for weekly backup, this should be set to 7 and FrequencyUnit should be set to Day) */
  frequencyInterval: number;
  /** The unit of time for how often the backup should be executed (e.g. for weekly backup, this should be set to Day and FrequencyInterval should be set to 7) */
  frequencyUnit: FrequencyUnit;
  /** True if the retention policy should always keep at least one backup in the storage account, regardless how old it is; false otherwise. */
  keepAtLeastOneBackup: boolean;
  /** After how many days backups should be deleted. */
  retentionPeriodInDays: number;
  /** When the schedule should start working. */
  startTime?: Date;
  /** Last time when this schedule was triggered. */
  readonly lastExecutionTime?: Date;
}

export function backupScheduleSerializer(item: BackupSchedule): any {
  return {
    frequencyInterval: item["frequencyInterval"],
    frequencyUnit: item["frequencyUnit"],
    keepAtLeastOneBackup: item["keepAtLeastOneBackup"],
    retentionPeriodInDays: item["retentionPeriodInDays"],
    startTime: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
  };
}

export function backupScheduleDeserializer(item: any): BackupSchedule {
  return {
    frequencyInterval: item["frequencyInterval"],
    frequencyUnit: item["frequencyUnit"],
    keepAtLeastOneBackup: item["keepAtLeastOneBackup"],
    retentionPeriodInDays: item["retentionPeriodInDays"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    lastExecutionTime: !item["lastExecutionTime"]
      ? item["lastExecutionTime"]
      : new Date(item["lastExecutionTime"]),
  };
}

/** The unit of time for how often the backup should be executed (e.g. for weekly backup, this should be set to Day and FrequencyInterval should be set to 7) */
export type FrequencyUnit = "Day" | "Hour";

export function databaseBackupSettingArraySerializer(result: Array<DatabaseBackupSetting>): any[] {
  return result.map((item) => {
    return databaseBackupSettingSerializer(item);
  });
}

export function databaseBackupSettingArrayDeserializer(
  result: Array<DatabaseBackupSetting>,
): any[] {
  return result.map((item) => {
    return databaseBackupSettingDeserializer(item);
  });
}

/** Database backup settings. */
export interface DatabaseBackupSetting {
  /** Database type (e.g. SqlAzure / MySql). */
  databaseType: DatabaseType;
  name?: string;
  /**
   * Contains a connection string name that is linked to the SiteConfig.ConnectionStrings.
   * This is used during restore with overwrite connection strings options.
   */
  connectionStringName?: string;
  /** Contains a connection string to a database which is being backed up or restored. If the restore should happen to a new database, the database name inside is the new one. */
  connectionString?: string;
}

export function databaseBackupSettingSerializer(item: DatabaseBackupSetting): any {
  return {
    databaseType: item["databaseType"],
    name: item["name"],
    connectionStringName: item["connectionStringName"],
    connectionString: item["connectionString"],
  };
}

export function databaseBackupSettingDeserializer(item: any): DatabaseBackupSetting {
  return {
    databaseType: item["databaseType"],
    name: item["name"],
    connectionStringName: item["connectionStringName"],
    connectionString: item["connectionString"],
  };
}

/** Database type (e.g. SqlAzure / MySql). */
export enum KnownDatabaseType {
  /** SqlAzure */
  SqlAzure = "SqlAzure",
  /** MySql */
  MySql = "MySql",
  /** LocalMySql */
  LocalMySql = "LocalMySql",
  /** PostgreSql */
  PostgreSql = "PostgreSql",
}

/**
 * Database type (e.g. SqlAzure / MySql). \
 * {@link KnownDatabaseType} can be used interchangeably with DatabaseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SqlAzure** \
 * **MySql** \
 * **LocalMySql** \
 * **PostgreSql**
 */
export type DatabaseType = string;

/** Backup description. */
export interface BackupItem extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Id of the backup. */
  readonly backupId?: number;
  /** SAS URL for the storage account container which contains this backup. */
  readonly storageAccountUrl?: string;
  /** Name of the blob which contains data for this backup. */
  readonly blobName?: string;
  /** Name of this backup. */
  readonly namePropertiesName?: string;
  /** Backup status. */
  readonly status?: BackupItemStatus;
  /** Size of the backup in bytes. */
  readonly sizeInBytes?: number;
  /** Timestamp of the backup creation. */
  readonly created?: Date;
  /** Details regarding this backup. Might contain an error message. */
  readonly log?: string;
  /** List of databases included in the backup. */
  readonly databases?: DatabaseBackupSetting[];
  /** True if this backup has been created due to a schedule being triggered. */
  readonly scheduled?: boolean;
  /** Timestamp of a last restore operation which used this backup. */
  readonly lastRestoreTimeStamp?: Date;
  /** Timestamp when this backup finished. */
  readonly finishedTimeStamp?: Date;
  /** Unique correlation identifier. Please use this along with the timestamp while communicating with Azure support. */
  readonly correlationId?: string;
  /** Size of the original web app which has been backed up. */
  readonly websiteSizeInBytes?: number;
}

export function backupItemDeserializer(item: any): BackupItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _backupItemPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** BackupItem resource specific properties */
export interface BackupItemProperties {
  /** Id of the backup. */
  readonly backupId?: number;
  /** SAS URL for the storage account container which contains this backup. */
  readonly storageAccountUrl?: string;
  /** Name of the blob which contains data for this backup. */
  readonly blobName?: string;
  /** Name of this backup. */
  readonly name?: string;
  /** Backup status. */
  readonly status?: BackupItemStatus;
  /** Size of the backup in bytes. */
  readonly sizeInBytes?: number;
  /** Timestamp of the backup creation. */
  readonly created?: Date;
  /** Details regarding this backup. Might contain an error message. */
  readonly log?: string;
  /** List of databases included in the backup. */
  readonly databases?: DatabaseBackupSetting[];
  /** True if this backup has been created due to a schedule being triggered. */
  readonly scheduled?: boolean;
  /** Timestamp of a last restore operation which used this backup. */
  readonly lastRestoreTimeStamp?: Date;
  /** Timestamp when this backup finished. */
  readonly finishedTimeStamp?: Date;
  /** Unique correlation identifier. Please use this along with the timestamp while communicating with Azure support. */
  readonly correlationId?: string;
  /** Size of the original web app which has been backed up. */
  readonly websiteSizeInBytes?: number;
}

export function backupItemPropertiesDeserializer(item: any): BackupItemProperties {
  return {
    backupId: item["id"],
    storageAccountUrl: item["storageAccountUrl"],
    blobName: item["blobName"],
    name: item["name"],
    status: item["status"],
    sizeInBytes: item["sizeInBytes"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    log: item["log"],
    databases: !item["databases"]
      ? item["databases"]
      : databaseBackupSettingArrayDeserializer(item["databases"]),
    scheduled: item["scheduled"],
    lastRestoreTimeStamp: !item["lastRestoreTimeStamp"]
      ? item["lastRestoreTimeStamp"]
      : new Date(item["lastRestoreTimeStamp"]),
    finishedTimeStamp: !item["finishedTimeStamp"]
      ? item["finishedTimeStamp"]
      : new Date(item["finishedTimeStamp"]),
    correlationId: item["correlationId"],
    websiteSizeInBytes: item["websiteSizeInBytes"],
  };
}

/** Backup status. */
export type BackupItemStatus =
  | "InProgress"
  | "Failed"
  | "Succeeded"
  | "TimedOut"
  | "Created"
  | "Skipped"
  | "PartiallySucceeded"
  | "DeleteInProgress"
  | "DeleteFailed"
  | "Deleted";

/** Configuration settings for the Azure App Service Authentication / Authorization feature. */
export interface SiteAuthSettings extends ProxyOnlyResource {
  /** <code>true</code> if the Authentication / Authorization feature is enabled for the current app; otherwise, <code>false</code>. */
  enabled?: boolean;
  /**
   * The RuntimeVersion of the Authentication / Authorization feature in use for the current app.
   * The setting in this value can control the behavior of certain features in the Authentication / Authorization module.
   */
  runtimeVersion?: string;
  /** The action to take when an unauthenticated client attempts to access the app. */
  unauthenticatedClientAction?: UnauthenticatedClientAction;
  /**
   * <code>true</code> to durably store platform-specific security tokens that are obtained during login flows; otherwise, <code>false</code>.
   * The default is <code>false</code>.
   */
  tokenStoreEnabled?: boolean;
  /**
   * External URLs that can be redirected to as part of logging in or logging out of the app. Note that the query string part of the URL is ignored.
   * This is an advanced setting typically only needed by Windows Store application backends.
   * Note that URLs within the current domain are always implicitly allowed.
   */
  allowedExternalRedirectUrls?: string[];
  /**
   * The default authentication provider to use when multiple providers are configured.
   * This setting is only needed if multiple providers are configured and the unauthenticated client
   * action is set to "RedirectToLoginPage".
   */
  defaultProvider?: BuiltInAuthenticationProvider;
  /**
   * The number of hours after session token expiration that a session token can be used to
   * call the token refresh API. The default is 72 hours.
   */
  tokenRefreshExtensionHours?: number;
  /**
   * The Client ID of this relying party application, known as the client_id.
   * This setting is required for enabling OpenID Connection authentication with Azure Active Directory or
   * other 3rd party OpenID Connect providers.
   * More information on OpenID Connect: http://openid.net/specs/openid-connect-core-1_0.html
   */
  clientId?: string;
  /**
   * The Client Secret of this relying party application (in Azure Active Directory, this is also referred to as the Key).
   * This setting is optional. If no client secret is configured, the OpenID Connect implicit auth flow is used to authenticate end users.
   * Otherwise, the OpenID Connect Authorization Code Flow is used to authenticate end users.
   * More information on OpenID Connect: http://openid.net/specs/openid-connect-core-1_0.html
   */
  clientSecret?: string;
  /** The app setting name that contains the client secret of the relying party application. */
  clientSecretSettingName?: string;
  /**
   * An alternative to the client secret, that is the thumbprint of a certificate used for signing purposes. This property acts as
   * a replacement for the Client Secret. It is also optional.
   */
  clientSecretCertificateThumbprint?: string;
  /**
   * The OpenID Connect Issuer URI that represents the entity which issues access tokens for this application.
   * When using Azure Active Directory, this value is the URI of the directory tenant, e.g. `https://sts.windows.net/{tenant-guid}/`.
   * This URI is a case-sensitive identifier for the token issuer.
   * More information on OpenID Connect Discovery: http://openid.net/specs/openid-connect-discovery-1_0.html
   */
  issuer?: string;
  /** Gets a value indicating whether the issuer should be a valid HTTPS url and be validated as such. */
  validateIssuer?: boolean;
  /**
   * Allowed audience values to consider when validating JSON Web Tokens issued by
   * Azure Active Directory. Note that the <code>ClientID</code> value is always considered an
   * allowed audience, regardless of this setting.
   */
  allowedAudiences?: string[];
  /**
   * Login parameters to send to the OpenID Connect authorization endpoint when
   * a user logs in. Each parameter must be in the form "key=value".
   */
  additionalLoginParams?: string[];
  /** Gets a JSON string containing the Azure AD Acl settings. */
  aadClaimsAuthorization?: string;
  /**
   * The OpenID Connect Client ID for the Google web application.
   * This setting is required for enabling Google Sign-In.
   * Google Sign-In documentation: https://developers.google.com/identity/sign-in/web/
   */
  googleClientId?: string;
  /**
   * The client secret associated with the Google web application.
   * This setting is required for enabling Google Sign-In.
   * Google Sign-In documentation: https://developers.google.com/identity/sign-in/web/
   */
  googleClientSecret?: string;
  /**
   * The app setting name that contains the client secret associated with
   * the Google web application.
   */
  googleClientSecretSettingName?: string;
  /**
   * The OAuth 2.0 scopes that will be requested as part of Google Sign-In authentication.
   * This setting is optional. If not specified, "openid", "profile", and "email" are used as default scopes.
   * Google Sign-In documentation: https://developers.google.com/identity/sign-in/web/
   */
  googleOAuthScopes?: string[];
  /**
   * The App ID of the Facebook app used for login.
   * This setting is required for enabling Facebook Login.
   * Facebook Login documentation: https://developers.facebook.com/docs/facebook-login
   */
  facebookAppId?: string;
  /**
   * The App Secret of the Facebook app used for Facebook Login.
   * This setting is required for enabling Facebook Login.
   * Facebook Login documentation: https://developers.facebook.com/docs/facebook-login
   */
  facebookAppSecret?: string;
  /** The app setting name that contains the app secret used for Facebook Login. */
  facebookAppSecretSettingName?: string;
  /**
   * The OAuth 2.0 scopes that will be requested as part of Facebook Login authentication.
   * This setting is optional.
   * Facebook Login documentation: https://developers.facebook.com/docs/facebook-login
   */
  facebookOAuthScopes?: string[];
  /**
   * The Client Id of the GitHub app used for login.
   * This setting is required for enabling Github login
   */
  gitHubClientId?: string;
  /**
   * The Client Secret of the GitHub app used for Github Login.
   * This setting is required for enabling Github login.
   */
  gitHubClientSecret?: string;
  /**
   * The app setting name that contains the client secret of the Github
   * app used for GitHub Login.
   */
  gitHubClientSecretSettingName?: string;
  /**
   * The OAuth 2.0 scopes that will be requested as part of GitHub Login authentication.
   * This setting is optional
   */
  gitHubOAuthScopes?: string[];
  /**
   * The OAuth 1.0a consumer key of the Twitter application used for sign-in.
   * This setting is required for enabling Twitter Sign-In.
   * Twitter Sign-In documentation: https://dev.twitter.com/web/sign-in
   */
  twitterConsumerKey?: string;
  /**
   * The OAuth 1.0a consumer secret of the Twitter application used for sign-in.
   * This setting is required for enabling Twitter Sign-In.
   * Twitter Sign-In documentation: https://dev.twitter.com/web/sign-in
   */
  twitterConsumerSecret?: string;
  /**
   * The app setting name that contains the OAuth 1.0a consumer secret of the Twitter
   * application used for sign-in.
   */
  twitterConsumerSecretSettingName?: string;
  /**
   * The OAuth 2.0 client ID that was created for the app used for authentication.
   * This setting is required for enabling Microsoft Account authentication.
   * Microsoft Account OAuth documentation: https://dev.onedrive.com/auth/msa_oauth.htm
   */
  microsoftAccountClientId?: string;
  /**
   * The OAuth 2.0 client secret that was created for the app used for authentication.
   * This setting is required for enabling Microsoft Account authentication.
   * Microsoft Account OAuth documentation: https://dev.onedrive.com/auth/msa_oauth.htm
   */
  microsoftAccountClientSecret?: string;
  /**
   * The app setting name containing the OAuth 2.0 client secret that was created for the
   * app used for authentication.
   */
  microsoftAccountClientSecretSettingName?: string;
  /**
   * The OAuth 2.0 scopes that will be requested as part of Microsoft Account authentication.
   * This setting is optional. If not specified, "wl.basic" is used as the default scope.
   * Microsoft Account Scopes and permissions documentation: https://msdn.microsoft.com/en-us/library/dn631845.aspx
   */
  microsoftAccountOAuthScopes?: string[];
  /**
   * "true" if the auth config settings should be read from a file,
   * "false" otherwise
   */
  isAuthFromFile?: string;
  /**
   * The path of the config file containing auth settings.
   * If the path is relative, base will the site's root directory.
   */
  authFilePath?: string;
  /**
   * The ConfigVersion of the Authentication / Authorization feature in use for the current app.
   * The setting in this value can control the behavior of the control plane for Authentication / Authorization.
   */
  configVersion?: string;
}

export function siteAuthSettingsSerializer(item: SiteAuthSettings): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "enabled",
      "runtimeVersion",
      "unauthenticatedClientAction",
      "tokenStoreEnabled",
      "allowedExternalRedirectUrls",
      "defaultProvider",
      "tokenRefreshExtensionHours",
      "clientId",
      "clientSecret",
      "clientSecretSettingName",
      "clientSecretCertificateThumbprint",
      "issuer",
      "validateIssuer",
      "allowedAudiences",
      "additionalLoginParams",
      "aadClaimsAuthorization",
      "googleClientId",
      "googleClientSecret",
      "googleClientSecretSettingName",
      "googleOAuthScopes",
      "facebookAppId",
      "facebookAppSecret",
      "facebookAppSecretSettingName",
      "facebookOAuthScopes",
      "gitHubClientId",
      "gitHubClientSecret",
      "gitHubClientSecretSettingName",
      "gitHubOAuthScopes",
      "twitterConsumerKey",
      "twitterConsumerSecret",
      "twitterConsumerSecretSettingName",
      "microsoftAccountClientId",
      "microsoftAccountClientSecret",
      "microsoftAccountClientSecretSettingName",
      "microsoftAccountOAuthScopes",
      "isAuthFromFile",
      "authFilePath",
      "configVersion",
    ])
      ? undefined
      : _siteAuthSettingsPropertiesSerializer(item),
  };
}

export function siteAuthSettingsDeserializer(item: any): SiteAuthSettings {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _siteAuthSettingsPropertiesDeserializer(item["properties"])),
  };
}

/** SiteAuthSettings resource specific properties */
export interface SiteAuthSettingsProperties {
  /** <code>true</code> if the Authentication / Authorization feature is enabled for the current app; otherwise, <code>false</code>. */
  enabled?: boolean;
  /**
   * The RuntimeVersion of the Authentication / Authorization feature in use for the current app.
   * The setting in this value can control the behavior of certain features in the Authentication / Authorization module.
   */
  runtimeVersion?: string;
  /** The action to take when an unauthenticated client attempts to access the app. */
  unauthenticatedClientAction?: UnauthenticatedClientAction;
  /**
   * <code>true</code> to durably store platform-specific security tokens that are obtained during login flows; otherwise, <code>false</code>.
   * The default is <code>false</code>.
   */
  tokenStoreEnabled?: boolean;
  /**
   * External URLs that can be redirected to as part of logging in or logging out of the app. Note that the query string part of the URL is ignored.
   * This is an advanced setting typically only needed by Windows Store application backends.
   * Note that URLs within the current domain are always implicitly allowed.
   */
  allowedExternalRedirectUrls?: string[];
  /**
   * The default authentication provider to use when multiple providers are configured.
   * This setting is only needed if multiple providers are configured and the unauthenticated client
   * action is set to "RedirectToLoginPage".
   */
  defaultProvider?: BuiltInAuthenticationProvider;
  /**
   * The number of hours after session token expiration that a session token can be used to
   * call the token refresh API. The default is 72 hours.
   */
  tokenRefreshExtensionHours?: number;
  /**
   * The Client ID of this relying party application, known as the client_id.
   * This setting is required for enabling OpenID Connection authentication with Azure Active Directory or
   * other 3rd party OpenID Connect providers.
   * More information on OpenID Connect: http://openid.net/specs/openid-connect-core-1_0.html
   */
  clientId?: string;
  /**
   * The Client Secret of this relying party application (in Azure Active Directory, this is also referred to as the Key).
   * This setting is optional. If no client secret is configured, the OpenID Connect implicit auth flow is used to authenticate end users.
   * Otherwise, the OpenID Connect Authorization Code Flow is used to authenticate end users.
   * More information on OpenID Connect: http://openid.net/specs/openid-connect-core-1_0.html
   */
  clientSecret?: string;
  /** The app setting name that contains the client secret of the relying party application. */
  clientSecretSettingName?: string;
  /**
   * An alternative to the client secret, that is the thumbprint of a certificate used for signing purposes. This property acts as
   * a replacement for the Client Secret. It is also optional.
   */
  clientSecretCertificateThumbprint?: string;
  /**
   * The OpenID Connect Issuer URI that represents the entity which issues access tokens for this application.
   * When using Azure Active Directory, this value is the URI of the directory tenant, e.g. `https://sts.windows.net/{tenant-guid}/`.
   * This URI is a case-sensitive identifier for the token issuer.
   * More information on OpenID Connect Discovery: http://openid.net/specs/openid-connect-discovery-1_0.html
   */
  issuer?: string;
  /** Gets a value indicating whether the issuer should be a valid HTTPS url and be validated as such. */
  validateIssuer?: boolean;
  /**
   * Allowed audience values to consider when validating JSON Web Tokens issued by
   * Azure Active Directory. Note that the <code>ClientID</code> value is always considered an
   * allowed audience, regardless of this setting.
   */
  allowedAudiences?: string[];
  /**
   * Login parameters to send to the OpenID Connect authorization endpoint when
   * a user logs in. Each parameter must be in the form "key=value".
   */
  additionalLoginParams?: string[];
  /** Gets a JSON string containing the Azure AD Acl settings. */
  aadClaimsAuthorization?: string;
  /**
   * The OpenID Connect Client ID for the Google web application.
   * This setting is required for enabling Google Sign-In.
   * Google Sign-In documentation: https://developers.google.com/identity/sign-in/web/
   */
  googleClientId?: string;
  /**
   * The client secret associated with the Google web application.
   * This setting is required for enabling Google Sign-In.
   * Google Sign-In documentation: https://developers.google.com/identity/sign-in/web/
   */
  googleClientSecret?: string;
  /**
   * The app setting name that contains the client secret associated with
   * the Google web application.
   */
  googleClientSecretSettingName?: string;
  /**
   * The OAuth 2.0 scopes that will be requested as part of Google Sign-In authentication.
   * This setting is optional. If not specified, "openid", "profile", and "email" are used as default scopes.
   * Google Sign-In documentation: https://developers.google.com/identity/sign-in/web/
   */
  googleOAuthScopes?: string[];
  /**
   * The App ID of the Facebook app used for login.
   * This setting is required for enabling Facebook Login.
   * Facebook Login documentation: https://developers.facebook.com/docs/facebook-login
   */
  facebookAppId?: string;
  /**
   * The App Secret of the Facebook app used for Facebook Login.
   * This setting is required for enabling Facebook Login.
   * Facebook Login documentation: https://developers.facebook.com/docs/facebook-login
   */
  facebookAppSecret?: string;
  /** The app setting name that contains the app secret used for Facebook Login. */
  facebookAppSecretSettingName?: string;
  /**
   * The OAuth 2.0 scopes that will be requested as part of Facebook Login authentication.
   * This setting is optional.
   * Facebook Login documentation: https://developers.facebook.com/docs/facebook-login
   */
  facebookOAuthScopes?: string[];
  /**
   * The Client Id of the GitHub app used for login.
   * This setting is required for enabling Github login
   */
  gitHubClientId?: string;
  /**
   * The Client Secret of the GitHub app used for Github Login.
   * This setting is required for enabling Github login.
   */
  gitHubClientSecret?: string;
  /**
   * The app setting name that contains the client secret of the Github
   * app used for GitHub Login.
   */
  gitHubClientSecretSettingName?: string;
  /**
   * The OAuth 2.0 scopes that will be requested as part of GitHub Login authentication.
   * This setting is optional
   */
  gitHubOAuthScopes?: string[];
  /**
   * The OAuth 1.0a consumer key of the Twitter application used for sign-in.
   * This setting is required for enabling Twitter Sign-In.
   * Twitter Sign-In documentation: https://dev.twitter.com/web/sign-in
   */
  twitterConsumerKey?: string;
  /**
   * The OAuth 1.0a consumer secret of the Twitter application used for sign-in.
   * This setting is required for enabling Twitter Sign-In.
   * Twitter Sign-In documentation: https://dev.twitter.com/web/sign-in
   */
  twitterConsumerSecret?: string;
  /**
   * The app setting name that contains the OAuth 1.0a consumer secret of the Twitter
   * application used for sign-in.
   */
  twitterConsumerSecretSettingName?: string;
  /**
   * The OAuth 2.0 client ID that was created for the app used for authentication.
   * This setting is required for enabling Microsoft Account authentication.
   * Microsoft Account OAuth documentation: https://dev.onedrive.com/auth/msa_oauth.htm
   */
  microsoftAccountClientId?: string;
  /**
   * The OAuth 2.0 client secret that was created for the app used for authentication.
   * This setting is required for enabling Microsoft Account authentication.
   * Microsoft Account OAuth documentation: https://dev.onedrive.com/auth/msa_oauth.htm
   */
  microsoftAccountClientSecret?: string;
  /**
   * The app setting name containing the OAuth 2.0 client secret that was created for the
   * app used for authentication.
   */
  microsoftAccountClientSecretSettingName?: string;
  /**
   * The OAuth 2.0 scopes that will be requested as part of Microsoft Account authentication.
   * This setting is optional. If not specified, "wl.basic" is used as the default scope.
   * Microsoft Account Scopes and permissions documentation: https://msdn.microsoft.com/en-us/library/dn631845.aspx
   */
  microsoftAccountOAuthScopes?: string[];
  /**
   * "true" if the auth config settings should be read from a file,
   * "false" otherwise
   */
  isAuthFromFile?: string;
  /**
   * The path of the config file containing auth settings.
   * If the path is relative, base will the site's root directory.
   */
  authFilePath?: string;
  /**
   * The ConfigVersion of the Authentication / Authorization feature in use for the current app.
   * The setting in this value can control the behavior of the control plane for Authentication / Authorization.
   */
  configVersion?: string;
}

export function siteAuthSettingsPropertiesSerializer(item: SiteAuthSettingsProperties): any {
  return {
    enabled: item["enabled"],
    runtimeVersion: item["runtimeVersion"],
    unauthenticatedClientAction: item["unauthenticatedClientAction"],
    tokenStoreEnabled: item["tokenStoreEnabled"],
    allowedExternalRedirectUrls: !item["allowedExternalRedirectUrls"]
      ? item["allowedExternalRedirectUrls"]
      : item["allowedExternalRedirectUrls"].map((p: any) => {
          return p;
        }),
    defaultProvider: item["defaultProvider"],
    tokenRefreshExtensionHours: item["tokenRefreshExtensionHours"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    clientSecretSettingName: item["clientSecretSettingName"],
    clientSecretCertificateThumbprint: item["clientSecretCertificateThumbprint"],
    issuer: item["issuer"],
    validateIssuer: item["validateIssuer"],
    allowedAudiences: !item["allowedAudiences"]
      ? item["allowedAudiences"]
      : item["allowedAudiences"].map((p: any) => {
          return p;
        }),
    additionalLoginParams: !item["additionalLoginParams"]
      ? item["additionalLoginParams"]
      : item["additionalLoginParams"].map((p: any) => {
          return p;
        }),
    aadClaimsAuthorization: item["aadClaimsAuthorization"],
    googleClientId: item["googleClientId"],
    googleClientSecret: item["googleClientSecret"],
    googleClientSecretSettingName: item["googleClientSecretSettingName"],
    googleOAuthScopes: !item["googleOAuthScopes"]
      ? item["googleOAuthScopes"]
      : item["googleOAuthScopes"].map((p: any) => {
          return p;
        }),
    facebookAppId: item["facebookAppId"],
    facebookAppSecret: item["facebookAppSecret"],
    facebookAppSecretSettingName: item["facebookAppSecretSettingName"],
    facebookOAuthScopes: !item["facebookOAuthScopes"]
      ? item["facebookOAuthScopes"]
      : item["facebookOAuthScopes"].map((p: any) => {
          return p;
        }),
    gitHubClientId: item["gitHubClientId"],
    gitHubClientSecret: item["gitHubClientSecret"],
    gitHubClientSecretSettingName: item["gitHubClientSecretSettingName"],
    gitHubOAuthScopes: !item["gitHubOAuthScopes"]
      ? item["gitHubOAuthScopes"]
      : item["gitHubOAuthScopes"].map((p: any) => {
          return p;
        }),
    twitterConsumerKey: item["twitterConsumerKey"],
    twitterConsumerSecret: item["twitterConsumerSecret"],
    twitterConsumerSecretSettingName: item["twitterConsumerSecretSettingName"],
    microsoftAccountClientId: item["microsoftAccountClientId"],
    microsoftAccountClientSecret: item["microsoftAccountClientSecret"],
    microsoftAccountClientSecretSettingName: item["microsoftAccountClientSecretSettingName"],
    microsoftAccountOAuthScopes: !item["microsoftAccountOAuthScopes"]
      ? item["microsoftAccountOAuthScopes"]
      : item["microsoftAccountOAuthScopes"].map((p: any) => {
          return p;
        }),
    isAuthFromFile: item["isAuthFromFile"],
    authFilePath: item["authFilePath"],
    configVersion: item["configVersion"],
  };
}

export function siteAuthSettingsPropertiesDeserializer(item: any): SiteAuthSettingsProperties {
  return {
    enabled: item["enabled"],
    runtimeVersion: item["runtimeVersion"],
    unauthenticatedClientAction: item["unauthenticatedClientAction"],
    tokenStoreEnabled: item["tokenStoreEnabled"],
    allowedExternalRedirectUrls: !item["allowedExternalRedirectUrls"]
      ? item["allowedExternalRedirectUrls"]
      : item["allowedExternalRedirectUrls"].map((p: any) => {
          return p;
        }),
    defaultProvider: item["defaultProvider"],
    tokenRefreshExtensionHours: item["tokenRefreshExtensionHours"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    clientSecretSettingName: item["clientSecretSettingName"],
    clientSecretCertificateThumbprint: item["clientSecretCertificateThumbprint"],
    issuer: item["issuer"],
    validateIssuer: item["validateIssuer"],
    allowedAudiences: !item["allowedAudiences"]
      ? item["allowedAudiences"]
      : item["allowedAudiences"].map((p: any) => {
          return p;
        }),
    additionalLoginParams: !item["additionalLoginParams"]
      ? item["additionalLoginParams"]
      : item["additionalLoginParams"].map((p: any) => {
          return p;
        }),
    aadClaimsAuthorization: item["aadClaimsAuthorization"],
    googleClientId: item["googleClientId"],
    googleClientSecret: item["googleClientSecret"],
    googleClientSecretSettingName: item["googleClientSecretSettingName"],
    googleOAuthScopes: !item["googleOAuthScopes"]
      ? item["googleOAuthScopes"]
      : item["googleOAuthScopes"].map((p: any) => {
          return p;
        }),
    facebookAppId: item["facebookAppId"],
    facebookAppSecret: item["facebookAppSecret"],
    facebookAppSecretSettingName: item["facebookAppSecretSettingName"],
    facebookOAuthScopes: !item["facebookOAuthScopes"]
      ? item["facebookOAuthScopes"]
      : item["facebookOAuthScopes"].map((p: any) => {
          return p;
        }),
    gitHubClientId: item["gitHubClientId"],
    gitHubClientSecret: item["gitHubClientSecret"],
    gitHubClientSecretSettingName: item["gitHubClientSecretSettingName"],
    gitHubOAuthScopes: !item["gitHubOAuthScopes"]
      ? item["gitHubOAuthScopes"]
      : item["gitHubOAuthScopes"].map((p: any) => {
          return p;
        }),
    twitterConsumerKey: item["twitterConsumerKey"],
    twitterConsumerSecret: item["twitterConsumerSecret"],
    twitterConsumerSecretSettingName: item["twitterConsumerSecretSettingName"],
    microsoftAccountClientId: item["microsoftAccountClientId"],
    microsoftAccountClientSecret: item["microsoftAccountClientSecret"],
    microsoftAccountClientSecretSettingName: item["microsoftAccountClientSecretSettingName"],
    microsoftAccountOAuthScopes: !item["microsoftAccountOAuthScopes"]
      ? item["microsoftAccountOAuthScopes"]
      : item["microsoftAccountOAuthScopes"].map((p: any) => {
          return p;
        }),
    isAuthFromFile: item["isAuthFromFile"],
    authFilePath: item["authFilePath"],
    configVersion: item["configVersion"],
  };
}

/** The action to take when an unauthenticated client attempts to access the app. */
export type UnauthenticatedClientAction = "RedirectToLoginPage" | "AllowAnonymous";
/**
 * The default authentication provider to use when multiple providers are configured.
 * This setting is only needed if multiple providers are configured and the unauthenticated client
 * action is set to "RedirectToLoginPage".
 */
export type BuiltInAuthenticationProvider =
  | "AzureActiveDirectory"
  | "Facebook"
  | "Google"
  | "MicrosoftAccount"
  | "Twitter"
  | "Github";

/** AzureStorageInfo dictionary resource. */
export interface AzureStoragePropertyDictionaryResource extends ProxyOnlyResource {
  /** Azure storage accounts. */
  properties?: Record<string, AzureStorageInfoValue>;
}

export function azureStoragePropertyDictionaryResourceSerializer(
  item: AzureStoragePropertyDictionaryResource,
): any {
  return {
    kind: item["kind"],
    properties: !item["properties"]
      ? item["properties"]
      : azureStorageInfoValueRecordSerializer(item["properties"]),
  };
}

export function azureStoragePropertyDictionaryResourceDeserializer(
  item: any,
): AzureStoragePropertyDictionaryResource {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : azureStorageInfoValueRecordDeserializer(item["properties"]),
  };
}

/** String dictionary resource. */
export interface ConnectionStringDictionary extends ProxyOnlyResource {
  /** Connection strings. */
  properties?: Record<string, ConnStringValueTypePair>;
}

export function connectionStringDictionarySerializer(item: ConnectionStringDictionary): any {
  return {
    kind: item["kind"],
    properties: !item["properties"]
      ? item["properties"]
      : connStringValueTypePairRecordSerializer(item["properties"]),
  };
}

export function connectionStringDictionaryDeserializer(item: any): ConnectionStringDictionary {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : connStringValueTypePairRecordDeserializer(item["properties"]),
  };
}

export function connStringValueTypePairRecordSerializer(
  item: Record<string, ConnStringValueTypePair>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : connStringValueTypePairSerializer(item[key]);
  });
  return result;
}

export function connStringValueTypePairRecordDeserializer(
  item: Record<string, any>,
): Record<string, ConnStringValueTypePair> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : connStringValueTypePairDeserializer(item[key]);
  });
  return result;
}

/** Database connection string value to type pair. */
export interface ConnStringValueTypePair {
  /** Value of pair. */
  value: string;
  /** Type of database. */
  type: ConnectionStringType;
}

export function connStringValueTypePairSerializer(item: ConnStringValueTypePair): any {
  return { value: item["value"], type: item["type"] };
}

export function connStringValueTypePairDeserializer(item: any): ConnStringValueTypePair {
  return {
    value: item["value"],
    type: item["type"],
  };
}

/** Description of a restore request. */
export interface RestoreRequest extends ProxyOnlyResource {
  /** SAS URL to the container. */
  storageAccountUrl?: string;
  /** Name of a blob which contains the backup. */
  blobName?: string;
  /** <code>true</code> if the restore operation can overwrite target app; otherwise, <code>false</code>. <code>true</code> is needed if trying to restore over an existing app. */
  overwrite?: boolean;
  /** Name of an app. */
  siteName?: string;
  /** Collection of databases which should be restored. This list has to match the list of databases included in the backup. */
  databases?: DatabaseBackupSetting[];
  /** Changes a logic when restoring an app with custom domains. <code>true</code> to remove custom domains automatically. If <code>false</code>, custom domains are added to \nthe app's object when it is being restored, but that might fail due to conflicts during the operation. */
  ignoreConflictingHostNames?: boolean;
  /** Ignore the databases and only restore the site content */
  ignoreDatabases?: boolean;
  /** Specify app service plan that will own restored site. */
  appServicePlan?: string;
  /** Operation type. */
  operationType?: BackupRestoreOperationType;
  /** <code>true</code> if SiteConfig.ConnectionStrings should be set in new app; otherwise, <code>false</code>. */
  adjustConnectionStrings?: boolean;
  /** App Service Environment name, if needed (only when restoring an app to an App Service Environment). */
  hostingEnvironment?: string;
}

export function restoreRequestSerializer(item: RestoreRequest): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "storageAccountUrl",
      "blobName",
      "overwrite",
      "siteName",
      "databases",
      "ignoreConflictingHostNames",
      "ignoreDatabases",
      "appServicePlan",
      "operationType",
      "adjustConnectionStrings",
      "hostingEnvironment",
    ])
      ? undefined
      : _restoreRequestPropertiesSerializer(item),
  };
}

export function restoreRequestDeserializer(item: any): RestoreRequest {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _restoreRequestPropertiesDeserializer(item["properties"])),
  };
}

/** RestoreRequest resource specific properties */
export interface RestoreRequestProperties {
  /** SAS URL to the container. */
  storageAccountUrl: string;
  /** Name of a blob which contains the backup. */
  blobName?: string;
  /** <code>true</code> if the restore operation can overwrite target app; otherwise, <code>false</code>. <code>true</code> is needed if trying to restore over an existing app. */
  overwrite: boolean;
  /** Name of an app. */
  siteName?: string;
  /** Collection of databases which should be restored. This list has to match the list of databases included in the backup. */
  databases?: DatabaseBackupSetting[];
  /** Changes a logic when restoring an app with custom domains. <code>true</code> to remove custom domains automatically. If <code>false</code>, custom domains are added to \nthe app's object when it is being restored, but that might fail due to conflicts during the operation. */
  ignoreConflictingHostNames?: boolean;
  /** Ignore the databases and only restore the site content */
  ignoreDatabases?: boolean;
  /** Specify app service plan that will own restored site. */
  appServicePlan?: string;
  /** Operation type. */
  operationType?: BackupRestoreOperationType;
  /** <code>true</code> if SiteConfig.ConnectionStrings should be set in new app; otherwise, <code>false</code>. */
  adjustConnectionStrings?: boolean;
  /** App Service Environment name, if needed (only when restoring an app to an App Service Environment). */
  hostingEnvironment?: string;
}

export function restoreRequestPropertiesSerializer(item: RestoreRequestProperties): any {
  return {
    storageAccountUrl: item["storageAccountUrl"],
    blobName: item["blobName"],
    overwrite: item["overwrite"],
    siteName: item["siteName"],
    databases: !item["databases"]
      ? item["databases"]
      : databaseBackupSettingArraySerializer(item["databases"]),
    ignoreConflictingHostNames: item["ignoreConflictingHostNames"],
    ignoreDatabases: item["ignoreDatabases"],
    appServicePlan: item["appServicePlan"],
    operationType: item["operationType"],
    adjustConnectionStrings: item["adjustConnectionStrings"],
    hostingEnvironment: item["hostingEnvironment"],
  };
}

export function restoreRequestPropertiesDeserializer(item: any): RestoreRequestProperties {
  return {
    storageAccountUrl: item["storageAccountUrl"],
    blobName: item["blobName"],
    overwrite: item["overwrite"],
    siteName: item["siteName"],
    databases: !item["databases"]
      ? item["databases"]
      : databaseBackupSettingArrayDeserializer(item["databases"]),
    ignoreConflictingHostNames: item["ignoreConflictingHostNames"],
    ignoreDatabases: item["ignoreDatabases"],
    appServicePlan: item["appServicePlan"],
    operationType: item["operationType"],
    adjustConnectionStrings: item["adjustConnectionStrings"],
    hostingEnvironment: item["hostingEnvironment"],
  };
}

/** Operation type. */
export type BackupRestoreOperationType =
  | "Default"
  | "Clone"
  | "Relocation"
  | "Snapshot"
  | "CloudFS";

/** Functions host level keys. */
export interface HostKeys {
  /** Secret key. */
  masterKey?: string;
  /** Host level function keys. */
  functionKeys?: Record<string, string>;
  /** System keys. */
  systemKeys?: Record<string, string>;
}

export function hostKeysDeserializer(item: any): HostKeys {
  return {
    masterKey: item["masterKey"],
    functionKeys: !item["functionKeys"]
      ? item["functionKeys"]
      : Object.fromEntries(
          Object.entries(item["functionKeys"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    systemKeys: !item["systemKeys"]
      ? item["systemKeys"]
      : Object.fromEntries(
          Object.entries(item["systemKeys"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Function key info. */
export interface KeyInfo {
  /** Key name */
  name?: string;
  /** Key value */
  value?: string;
}

export function keyInfoSerializer(item: KeyInfo): any {
  return { name: item["name"], value: item["value"] };
}

export function keyInfoDeserializer(item: any): KeyInfo {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Hybrid Connection contract. This is used to configure a Hybrid Connection. */
export interface HybridConnection extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** The name of the Service Bus namespace. */
  serviceBusNamespace?: string;
  /** The name of the Service Bus relay. */
  relayName?: string;
  /** The ARM URI to the Service Bus relay. */
  relayArmUri?: string;
  /** The hostname of the endpoint. */
  hostname?: string;
  /** The port of the endpoint. */
  port?: number;
  /** The name of the Service Bus key which has Send permissions. This is used to authenticate to Service Bus. */
  sendKeyName?: string;
  /**
   * The value of the Service Bus key. This is used to authenticate to Service Bus. In ARM this key will not be returned
   * normally, use the POST /listKeys API instead.
   */
  sendKeyValue?: string;
  /** The suffix for the service bus endpoint. By default this is .servicebus.windows.net */
  serviceBusSuffix?: string;
}

export function hybridConnectionSerializer(item: HybridConnection): any {
  return {
    properties: areAllPropsUndefined(item, [
      "serviceBusNamespace",
      "relayName",
      "relayArmUri",
      "hostname",
      "port",
      "sendKeyName",
      "sendKeyValue",
      "serviceBusSuffix",
    ])
      ? undefined
      : _hybridConnectionPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function hybridConnectionDeserializer(item: any): HybridConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _hybridConnectionPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** HybridConnection resource specific properties */
export interface HybridConnectionProperties {
  /** The name of the Service Bus namespace. */
  serviceBusNamespace?: string;
  /** The name of the Service Bus relay. */
  relayName?: string;
  /** The ARM URI to the Service Bus relay. */
  relayArmUri?: string;
  /** The hostname of the endpoint. */
  hostname?: string;
  /** The port of the endpoint. */
  port?: number;
  /** The name of the Service Bus key which has Send permissions. This is used to authenticate to Service Bus. */
  sendKeyName?: string;
  /**
   * The value of the Service Bus key. This is used to authenticate to Service Bus. In ARM this key will not be returned
   * normally, use the POST /listKeys API instead.
   */
  sendKeyValue?: string;
  /** The suffix for the service bus endpoint. By default this is .servicebus.windows.net */
  serviceBusSuffix?: string;
}

export function hybridConnectionPropertiesSerializer(item: HybridConnectionProperties): any {
  return {
    serviceBusNamespace: item["serviceBusNamespace"],
    relayName: item["relayName"],
    relayArmUri: item["relayArmUri"],
    hostname: item["hostname"],
    port: item["port"],
    sendKeyName: item["sendKeyName"],
    sendKeyValue: item["sendKeyValue"],
    serviceBusSuffix: item["serviceBusSuffix"],
  };
}

export function hybridConnectionPropertiesDeserializer(item: any): HybridConnectionProperties {
  return {
    serviceBusNamespace: item["serviceBusNamespace"],
    relayName: item["relayName"],
    relayArmUri: item["relayArmUri"],
    hostname: item["hostname"],
    port: item["port"],
    sendKeyName: item["sendKeyName"],
    sendKeyValue: item["sendKeyValue"],
    serviceBusSuffix: item["serviceBusSuffix"],
  };
}

/** Hybrid Connection for an App Service app. */
export interface RelayServiceConnectionEntity extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  entityName?: string;
  entityConnectionString?: string;
  resourceType?: string;
  resourceConnectionString?: string;
  hostname?: string;
  port?: number;
  biztalkUri?: string;
}

export function relayServiceConnectionEntitySerializer(item: RelayServiceConnectionEntity): any {
  return {
    properties: areAllPropsUndefined(item, [
      "entityName",
      "entityConnectionString",
      "resourceType",
      "resourceConnectionString",
      "hostname",
      "port",
      "biztalkUri",
    ])
      ? undefined
      : _relayServiceConnectionEntityPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function relayServiceConnectionEntityDeserializer(item: any): RelayServiceConnectionEntity {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _relayServiceConnectionEntityPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** RelayServiceConnectionEntity resource specific properties */
export interface RelayServiceConnectionEntityProperties {
  entityName?: string;
  entityConnectionString?: string;
  resourceType?: string;
  resourceConnectionString?: string;
  hostname?: string;
  port?: number;
  biztalkUri?: string;
}

export function relayServiceConnectionEntityPropertiesSerializer(
  item: RelayServiceConnectionEntityProperties,
): any {
  return {
    entityName: item["entityName"],
    entityConnectionString: item["entityConnectionString"],
    resourceType: item["resourceType"],
    resourceConnectionString: item["resourceConnectionString"],
    hostname: item["hostname"],
    port: item["port"],
    biztalkUri: item["biztalkUri"],
  };
}

export function relayServiceConnectionEntityPropertiesDeserializer(
  item: any,
): RelayServiceConnectionEntityProperties {
  return {
    entityName: item["entityName"],
    entityConnectionString: item["entityConnectionString"],
    resourceType: item["resourceType"],
    resourceConnectionString: item["resourceConnectionString"],
    hostname: item["hostname"],
    port: item["port"],
    biztalkUri: item["biztalkUri"],
  };
}

/** Represents whether or not an app is cloneable. */
export interface SiteCloneability {
  /** Name of app. */
  result?: CloneAbilityResult;
  /** List of features enabled on app that prevent cloning. */
  blockingFeatures?: SiteCloneabilityCriterion[];
  /**
   * List of features enabled on app that are non-blocking but cannot be cloned. The app can still be cloned
   * but the features in this list will not be set up on cloned app.
   */
  unsupportedFeatures?: SiteCloneabilityCriterion[];
  /** List of blocking application characteristics. */
  blockingCharacteristics?: SiteCloneabilityCriterion[];
}

export function siteCloneabilityDeserializer(item: any): SiteCloneability {
  return {
    result: item["result"],
    blockingFeatures: !item["blockingFeatures"]
      ? item["blockingFeatures"]
      : siteCloneabilityCriterionArrayDeserializer(item["blockingFeatures"]),
    unsupportedFeatures: !item["unsupportedFeatures"]
      ? item["unsupportedFeatures"]
      : siteCloneabilityCriterionArrayDeserializer(item["unsupportedFeatures"]),
    blockingCharacteristics: !item["blockingCharacteristics"]
      ? item["blockingCharacteristics"]
      : siteCloneabilityCriterionArrayDeserializer(item["blockingCharacteristics"]),
  };
}

/** Name of app. */
export type CloneAbilityResult = "Cloneable" | "PartiallyCloneable" | "NotCloneable";

export function siteCloneabilityCriterionArrayDeserializer(
  result: Array<SiteCloneabilityCriterion>,
): any[] {
  return result.map((item) => {
    return siteCloneabilityCriterionDeserializer(item);
  });
}

/** An app cloneability criterion. */
export interface SiteCloneabilityCriterion {
  /** Name of criterion. */
  name?: string;
  /** Description of criterion. */
  description?: string;
}

export function siteCloneabilityCriterionDeserializer(item: any): SiteCloneabilityCriterion {
  return {
    name: item["name"],
    description: item["description"],
  };
}

/** Collection of backup items. */
export interface _BackupItemCollection {
  /** The BackupItem items on this page */
  value: BackupItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _backupItemCollectionDeserializer(item: any): _BackupItemCollection {
  return {
    value: backupItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function backupItemArrayDeserializer(result: Array<BackupItem>): any[] {
  return result.map((item) => {
    return backupItemDeserializer(item);
  });
}

/** Function secrets. */
export interface FunctionSecrets {
  /** Secret key. */
  key?: string;
  /** Trigger URL. */
  triggerUrl?: string;
}

export function functionSecretsDeserializer(item: any): FunctionSecrets {
  return {
    key: item["key"],
    triggerUrl: item["trigger_url"],
  };
}

/** Network trace */
export interface NetworkTrace {
  /** Local file path for the captured network trace file. */
  path?: string;
  /** Current status of the network trace operation, same as Operation.Status (InProgress/Succeeded/Failed). */
  status?: string;
  /** Detailed message of a network trace operation, e.g. error message in case of failure. */
  message?: string;
}

export function networkTraceDeserializer(item: any): NetworkTrace {
  return {
    path: item["path"],
    status: item["status"],
    message: item["message"],
  };
}

/** Collection of performance monitor counters. */
export interface _PerfMonCounterCollection {
  /** The PerfMonResponse items on this page */
  value: PerfMonResponse[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _perfMonCounterCollectionDeserializer(item: any): _PerfMonCounterCollection {
  return {
    value: perfMonResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function perfMonResponseArrayDeserializer(result: Array<PerfMonResponse>): any[] {
  return result.map((item) => {
    return perfMonResponseDeserializer(item);
  });
}

/** Performance monitor API response. */
export interface PerfMonResponse {
  /** The response code. */
  code?: string;
  /** The message. */
  message?: string;
  /** The performance monitor counters. */
  data?: PerfMonSet;
}

export function perfMonResponseDeserializer(item: any): PerfMonResponse {
  return {
    code: item["code"],
    message: item["message"],
    data: !item["data"] ? item["data"] : perfMonSetDeserializer(item["data"]),
  };
}

/** Metric information. */
export interface PerfMonSet {
  /** Unique key name of the counter. */
  name?: string;
  /** Start time of the period. */
  startTime?: Date;
  /** End time of the period. */
  endTime?: Date;
  /** Presented time grain. */
  timeGrain?: string;
  /** Collection of workers that are active during this time. */
  values?: PerfMonSample[];
}

export function perfMonSetDeserializer(item: any): PerfMonSet {
  return {
    name: item["name"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    timeGrain: item["timeGrain"],
    values: !item["values"] ? item["values"] : perfMonSampleArrayDeserializer(item["values"]),
  };
}

export function perfMonSampleArrayDeserializer(result: Array<PerfMonSample>): any[] {
  return result.map((item) => {
    return perfMonSampleDeserializer(item);
  });
}

/** Performance monitor sample in a set. */
export interface PerfMonSample {
  /** Point in time for which counter was measured. */
  time?: Date;
  /** Name of the server on which the measurement is made. */
  instanceName?: string;
  /** Value of counter at a certain time. */
  value?: number;
}

export function perfMonSampleDeserializer(item: any): PerfMonSample {
  return {
    time: !item["time"] ? item["time"] : new Date(item["time"]),
    instanceName: item["instanceName"],
    value: item["value"],
  };
}

/** Used for getting PHP error logging flag. */
export interface SitePhpErrorLogFlag extends ProxyOnlyResource {
  /** Local log_errors setting. */
  localLogErrors?: string;
  /** Master log_errors setting. */
  masterLogErrors?: string;
  /** Local log_errors_max_len setting. */
  localLogErrorsMaxLength?: string;
  /** Master log_errors_max_len setting. */
  masterLogErrorsMaxLength?: string;
}

export function sitePhpErrorLogFlagDeserializer(item: any): SitePhpErrorLogFlag {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _sitePhpErrorLogFlagPropertiesDeserializer(item["properties"])),
  };
}

/** SitePhpErrorLogFlag resource specific properties */
export interface SitePhpErrorLogFlagProperties {
  /** Local log_errors setting. */
  localLogErrors?: string;
  /** Master log_errors setting. */
  masterLogErrors?: string;
  /** Local log_errors_max_len setting. */
  localLogErrorsMaxLength?: string;
  /** Master log_errors_max_len setting. */
  masterLogErrorsMaxLength?: string;
}

export function sitePhpErrorLogFlagPropertiesDeserializer(
  item: any,
): SitePhpErrorLogFlagProperties {
  return {
    localLogErrors: item["localLogErrors"],
    masterLogErrors: item["masterLogErrors"],
    localLogErrorsMaxLength: item["localLogErrorsMaxLength"],
    masterLogErrorsMaxLength: item["masterLogErrorsMaxLength"],
  };
}

/** Premier add-on. */
export interface PremierAddOn extends TrackedResource {
  /** Kind of resource. */
  kind?: string;
  /** Premier add on SKU. */
  sku?: string;
  /** Premier add on Product. */
  product?: string;
  /** Premier add on Vendor. */
  vendor?: string;
  /** Premier add on Marketplace publisher. */
  marketplacePublisher?: string;
  /** Premier add on Marketplace offer. */
  marketplaceOffer?: string;
}

export function premierAddOnSerializer(item: PremierAddOn): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "sku",
      "product",
      "vendor",
      "marketplacePublisher",
      "marketplaceOffer",
    ])
      ? undefined
      : _premierAddOnPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function premierAddOnDeserializer(item: any): PremierAddOn {
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
      : _premierAddOnPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** PremierAddOn resource specific properties */
export interface PremierAddOnProperties {
  /** Premier add on SKU. */
  sku?: string;
  /** Premier add on Product. */
  product?: string;
  /** Premier add on Vendor. */
  vendor?: string;
  /** Premier add on Marketplace publisher. */
  marketplacePublisher?: string;
  /** Premier add on Marketplace offer. */
  marketplaceOffer?: string;
}

export function premierAddOnPropertiesSerializer(item: PremierAddOnProperties): any {
  return {
    sku: item["sku"],
    product: item["product"],
    vendor: item["vendor"],
    marketplacePublisher: item["marketplacePublisher"],
    marketplaceOffer: item["marketplaceOffer"],
  };
}

export function premierAddOnPropertiesDeserializer(item: any): PremierAddOnProperties {
  return {
    sku: item["sku"],
    product: item["product"],
    vendor: item["vendor"],
    marketplacePublisher: item["marketplacePublisher"],
    marketplaceOffer: item["marketplaceOffer"],
  };
}

/** Publishing options for requested profile. */
export interface CsmPublishingProfileOptions {
  /**
   * Name of the format. Valid values are:
   * FileZilla3
   * WebDeploy -- default
   * Ftp
   */
  format?: PublishingProfileFormat;
  /** Include the DisasterRecover endpoint if true */
  includeDisasterRecoveryEndpoints?: boolean;
}

export function csmPublishingProfileOptionsSerializer(item: CsmPublishingProfileOptions): any {
  return {
    format: item["format"],
    includeDisasterRecoveryEndpoints: item["includeDisasterRecoveryEndpoints"],
  };
}

/**
 * Name of the format. Valid values are:
 * FileZilla3
 * WebDeploy -- default
 * Ftp
 */
export enum KnownPublishingProfileFormat {
  /** FileZilla3 */
  FileZilla3 = "FileZilla3",
  /** WebDeploy */
  WebDeploy = "WebDeploy",
  /** Ftp */
  Ftp = "Ftp",
}

/**
 * Name of the format. Valid values are:
 * FileZilla3
 * WebDeploy -- default
 * Ftp \
 * {@link KnownPublishingProfileFormat} can be used interchangeably with PublishingProfileFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FileZilla3** \
 * **WebDeploy** \
 * **Ftp**
 */
export type PublishingProfileFormat = string;

/** Details about restoring a deleted app. */
export interface DeletedAppRestoreRequest extends ProxyOnlyResource {
  /**
   * ARM resource ID of the deleted app. Example:
   * /subscriptions/{subId}/providers/Microsoft.Web/deletedSites/{deletedSiteId}
   */
  deletedSiteId?: string;
  /** If true, deleted site configuration, in addition to content, will be restored. */
  recoverConfiguration?: boolean;
  /**
   * Point in time to restore the deleted app from, formatted as a DateTime string.
   * If unspecified, default value is the time that the app was deleted.
   */
  snapshotTime?: string;
  /** If true, the snapshot is retrieved from DRSecondary endpoint. */
  useDRSecondary?: boolean;
}

export function deletedAppRestoreRequestSerializer(item: DeletedAppRestoreRequest): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "deletedSiteId",
      "recoverConfiguration",
      "snapshotTime",
      "useDRSecondary",
    ])
      ? undefined
      : _deletedAppRestoreRequestPropertiesSerializer(item),
  };
}

/** DeletedAppRestoreRequest resource specific properties */
export interface DeletedAppRestoreRequestProperties {
  /**
   * ARM resource ID of the deleted app. Example:
   * /subscriptions/{subId}/providers/Microsoft.Web/deletedSites/{deletedSiteId}
   */
  deletedSiteId?: string;
  /** If true, deleted site configuration, in addition to content, will be restored. */
  recoverConfiguration?: boolean;
  /**
   * Point in time to restore the deleted app from, formatted as a DateTime string.
   * If unspecified, default value is the time that the app was deleted.
   */
  snapshotTime?: string;
  /** If true, the snapshot is retrieved from DRSecondary endpoint. */
  useDRSecondary?: boolean;
}

export function deletedAppRestoreRequestPropertiesSerializer(
  item: DeletedAppRestoreRequestProperties,
): any {
  return {
    deletedSiteId: item["deletedSiteId"],
    recoverConfiguration: item["recoverConfiguration"],
    snapshotTime: item["snapshotTime"],
    useDRSecondary: item["useDRSecondary"],
  };
}

/** Details about app recovery operation. */
export interface SnapshotRestoreRequest extends ProxyOnlyResource {
  /** Point in time in which the app restore should be done, formatted as a DateTime string. */
  snapshotTime?: string;
  /**
   * Optional. Specifies the web app that snapshot contents will be retrieved from.
   * If empty, the targeted web app will be used as the source.
   */
  recoverySource?: SnapshotRecoverySource;
  /** If <code>true</code> the restore operation can overwrite source app; otherwise, <code>false</code>. */
  overwrite?: boolean;
  /** If true, site configuration, in addition to content, will be reverted. */
  recoverConfiguration?: boolean;
  /**
   * If true, custom hostname conflicts will be ignored when recovering to a target web app.
   * This setting is only necessary when RecoverConfiguration is enabled.
   */
  ignoreConflictingHostNames?: boolean;
  /** If true, the snapshot is retrieved from DRSecondary endpoint. */
  useDRSecondary?: boolean;
}

export function snapshotRestoreRequestSerializer(item: SnapshotRestoreRequest): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "snapshotTime",
      "recoverySource",
      "overwrite",
      "recoverConfiguration",
      "ignoreConflictingHostNames",
      "useDRSecondary",
    ])
      ? undefined
      : _snapshotRestoreRequestPropertiesSerializer(item),
  };
}

/** SnapshotRestoreRequest resource specific properties */
export interface SnapshotRestoreRequestProperties {
  /** Point in time in which the app restore should be done, formatted as a DateTime string. */
  snapshotTime?: string;
  /**
   * Optional. Specifies the web app that snapshot contents will be retrieved from.
   * If empty, the targeted web app will be used as the source.
   */
  recoverySource?: SnapshotRecoverySource;
  /** If <code>true</code> the restore operation can overwrite source app; otherwise, <code>false</code>. */
  overwrite: boolean;
  /** If true, site configuration, in addition to content, will be reverted. */
  recoverConfiguration?: boolean;
  /**
   * If true, custom hostname conflicts will be ignored when recovering to a target web app.
   * This setting is only necessary when RecoverConfiguration is enabled.
   */
  ignoreConflictingHostNames?: boolean;
  /** If true, the snapshot is retrieved from DRSecondary endpoint. */
  useDRSecondary?: boolean;
}

export function snapshotRestoreRequestPropertiesSerializer(
  item: SnapshotRestoreRequestProperties,
): any {
  return {
    snapshotTime: item["snapshotTime"],
    recoverySource: !item["recoverySource"]
      ? item["recoverySource"]
      : snapshotRecoverySourceSerializer(item["recoverySource"]),
    overwrite: item["overwrite"],
    recoverConfiguration: item["recoverConfiguration"],
    ignoreConflictingHostNames: item["ignoreConflictingHostNames"],
    useDRSecondary: item["useDRSecondary"],
  };
}

/** Specifies the web app that snapshot contents will be retrieved from. */
export interface SnapshotRecoverySource {
  /** Geographical location of the source web app, e.g. SouthEastAsia, SouthCentralUS */
  location?: string;
  /**
   * ARM resource ID of the source app.
   * /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName} for production slots and
   * /subscriptions/{subId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{siteName}/slots/{slotName} for other slots.
   */
  id?: string;
}

export function snapshotRecoverySourceSerializer(item: SnapshotRecoverySource): any {
  return { location: item["location"], id: item["id"] };
}

/** Collection of slot differences. */
export interface _SlotDifferenceCollection {
  /** The SlotDifference items on this page */
  value: SlotDifference[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _slotDifferenceCollectionDeserializer(item: any): _SlotDifferenceCollection {
  return {
    value: slotDifferenceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function slotDifferenceArrayDeserializer(result: Array<SlotDifference>): any[] {
  return result.map((item) => {
    return slotDifferenceDeserializer(item);
  });
}

/** A setting difference between two deployment slots of an app. */
export interface SlotDifference extends ProxyOnlyResource {
  /** Level of the difference: Information, Warning or Error. */
  readonly level?: string;
  /** The type of the setting: General, AppSetting or ConnectionString. */
  readonly settingType?: string;
  /** Rule that describes how to process the setting difference during a slot swap. */
  readonly diffRule?: string;
  /** Name of the setting. */
  readonly settingName?: string;
  /** Value of the setting in the current slot. */
  readonly valueInCurrentSlot?: string;
  /** Value of the setting in the target slot. */
  readonly valueInTargetSlot?: string;
  /** Description of the setting difference. */
  readonly description?: string;
}

export function slotDifferenceDeserializer(item: any): SlotDifference {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _slotDifferencePropertiesDeserializer(item["properties"])),
  };
}

/** SlotDifference resource specific properties */
export interface SlotDifferenceProperties {
  /** Level of the difference: Information, Warning or Error. */
  readonly level?: string;
  /** The type of the setting: General, AppSetting or ConnectionString. */
  readonly settingType?: string;
  /** Rule that describes how to process the setting difference during a slot swap. */
  readonly diffRule?: string;
  /** Name of the setting. */
  readonly settingName?: string;
  /** Value of the setting in the current slot. */
  readonly valueInCurrentSlot?: string;
  /** Value of the setting in the target slot. */
  readonly valueInTargetSlot?: string;
  /** Description of the setting difference. */
  readonly description?: string;
}

export function slotDifferencePropertiesDeserializer(item: any): SlotDifferenceProperties {
  return {
    level: item["level"],
    settingType: item["settingType"],
    diffRule: item["diffRule"],
    settingName: item["settingName"],
    valueInCurrentSlot: item["valueInCurrentSlot"],
    valueInTargetSlot: item["valueInTargetSlot"],
    description: item["description"],
  };
}

/** Collection of snapshots which can be used to revert an app to a previous time. */
export interface _SnapshotCollection {
  /** The Snapshot items on this page */
  value: Snapshot[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _snapshotCollectionDeserializer(item: any): _SnapshotCollection {
  return {
    value: snapshotArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function snapshotArrayDeserializer(result: Array<Snapshot>): any[] {
  return result.map((item) => {
    return snapshotDeserializer(item);
  });
}

/** A snapshot of an app. */
export interface Snapshot extends ProxyOnlyResource {
  /** The time the snapshot was taken. */
  readonly time?: string;
}

export function snapshotDeserializer(item: any): Snapshot {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _snapshotPropertiesDeserializer(item["properties"])),
  };
}

/** Snapshot resource specific properties */
export interface SnapshotProperties {
  /** The time the snapshot was taken. */
  readonly time?: string;
}

export function snapshotPropertiesDeserializer(item: any): SnapshotProperties {
  return {
    time: item["time"],
  };
}

/** The workflow filter. */
export interface WorkflowArtifacts {
  /** Application settings of the workflow. */
  appSettings?: any;
  /** Files of the app. */
  files?: Record<string, any>;
  /** Files of the app to delete. */
  filesToDelete?: string[];
}

export function workflowArtifactsSerializer(item: WorkflowArtifacts): any {
  return {
    appSettings: item["appSettings"],
    files: item["files"],
    filesToDelete: !item["filesToDelete"]
      ? item["filesToDelete"]
      : item["filesToDelete"].map((p: any) => {
          return p;
        }),
  };
}

/** Workflow properties definition. */
export interface WorkflowEnvelope extends ProxyResource {
  /** Additional workflow properties. */
  properties?: WorkflowEnvelopeProperties;
  /** The resource kind. */
  kind?: string;
  /** The resource location. */
  location?: string;
}

export function workflowEnvelopeDeserializer(item: any): WorkflowEnvelope {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workflowEnvelopePropertiesDeserializer(item["properties"]),
    kind: item["kind"],
    location: item["location"],
  };
}

/** Additional workflow properties. */
export interface WorkflowEnvelopeProperties {
  /** Gets or sets the files. */
  files?: Record<string, any>;
  /** Gets or sets the state of the workflow. */
  flowState?: WorkflowState;
  /** Gets or sets workflow health. */
  health?: WorkflowHealth;
}

export function workflowEnvelopePropertiesDeserializer(item: any): WorkflowEnvelopeProperties {
  return {
    files: !item["files"]
      ? item["files"]
      : Object.fromEntries(Object.entries(item["files"]).map(([k, p]: [string, any]) => [k, p])),
    flowState: item["flowState"],
    health: !item["health"] ? item["health"] : workflowHealthDeserializer(item["health"]),
  };
}

/** The workflow state. */
export enum KnownWorkflowState {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Completed */
  Completed = "Completed",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** Deleted */
  Deleted = "Deleted",
  /** Suspended */
  Suspended = "Suspended",
}

/**
 * The workflow state. \
 * {@link KnownWorkflowState} can be used interchangeably with WorkflowState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Completed** \
 * **Enabled** \
 * **Disabled** \
 * **Deleted** \
 * **Suspended**
 */
export type WorkflowState = string;

/** Represents the workflow health. */
export interface WorkflowHealth {
  /** Gets or sets the workflow health state. */
  state: WorkflowHealthState;
  /** Gets or sets the workflow error. */
  error?: ErrorEntity;
}

export function workflowHealthDeserializer(item: any): WorkflowHealth {
  return {
    state: item["state"],
    error: !item["error"] ? item["error"] : errorEntityDeserializer(item["error"]),
  };
}

/** Gets or sets the workflow health state. */
export type WorkflowHealthState = "NotSpecified" | "Healthy" | "Unhealthy" | "Unknown";

/** Virtual Network information ARM resource. */
export interface VnetInfoResource extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** The Virtual Network's resource ID. */
  vnetResourceId?: string;
  /** The client certificate thumbprint. */
  readonly certThumbprint?: string;
  /** A certificate file (.cer) blob containing the public key of the private key used to authenticate a \nPoint-To-Site VPN connection. */
  certBlob?: string;
  /** The routes that this Virtual Network connection uses. */
  readonly routes?: VnetRoute[];
  /** <code>true</code> if a resync is required; otherwise, <code>false</code>. */
  readonly resyncRequired?: boolean;
  /** DNS servers to be used by this Virtual Network. This should be a comma-separated list of IP addresses. */
  dnsServers?: string;
  /** Flag that is used to denote if this is VNET injection */
  isSwift?: boolean;
}

export function vnetInfoResourceSerializer(item: VnetInfoResource): any {
  return {
    properties: areAllPropsUndefined(item, ["vnetResourceId", "certBlob", "dnsServers", "isSwift"])
      ? undefined
      : _vnetInfoResourcePropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function vnetInfoResourceDeserializer(item: any): VnetInfoResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _vnetInfoResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** Virtual Network information contract. */
export interface VnetInfo {
  /** The Virtual Network's resource ID. */
  vnetResourceId?: string;
  /** The client certificate thumbprint. */
  readonly certThumbprint?: string;
  /** A certificate file (.cer) blob containing the public key of the private key used to authenticate a \nPoint-To-Site VPN connection. */
  certBlob?: string;
  /** The routes that this Virtual Network connection uses. */
  readonly routes?: VnetRoute[];
  /** <code>true</code> if a resync is required; otherwise, <code>false</code>. */
  readonly resyncRequired?: boolean;
  /** DNS servers to be used by this Virtual Network. This should be a comma-separated list of IP addresses. */
  dnsServers?: string;
  /** Flag that is used to denote if this is VNET injection */
  isSwift?: boolean;
}

export function vnetInfoSerializer(item: VnetInfo): any {
  return {
    vnetResourceId: item["vnetResourceId"],
    certBlob: item["certBlob"],
    dnsServers: item["dnsServers"],
    isSwift: item["isSwift"],
  };
}

export function vnetInfoDeserializer(item: any): VnetInfo {
  return {
    vnetResourceId: item["vnetResourceId"],
    certThumbprint: item["certThumbprint"],
    certBlob: item["certBlob"],
    routes: !item["routes"] ? item["routes"] : vnetRouteArrayDeserializer(item["routes"]),
    resyncRequired: item["resyncRequired"],
    dnsServers: item["dnsServers"],
    isSwift: item["isSwift"],
  };
}

export function vnetRouteArraySerializer(result: Array<VnetRoute>): any[] {
  return result.map((item) => {
    return vnetRouteSerializer(item);
  });
}

export function vnetRouteArrayDeserializer(result: Array<VnetRoute>): any[] {
  return result.map((item) => {
    return vnetRouteDeserializer(item);
  });
}

/** Virtual Network route contract used to pass routing information for a Virtual Network. */
export interface VnetRoute extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** The starting address for this route. This may also include a CIDR notation, in which case the end address must not be specified. */
  startAddress?: string;
  /** The ending address for this route. If the start address is specified in CIDR notation, this must be omitted. */
  endAddress?: string;
  /**
   * The type of route this is:
   * DEFAULT - By default, every app has routes to the local address ranges specified by RFC1918
   * INHERITED - Routes inherited from the real Virtual Network routes
   * STATIC - Static route set on the app only
   *
   * These values will be used for syncing an app's routes with those from a Virtual Network.
   */
  routeType?: RouteType;
}

export function vnetRouteSerializer(item: VnetRoute): any {
  return {
    properties: areAllPropsUndefined(item, ["startAddress", "endAddress", "routeType"])
      ? undefined
      : _vnetRoutePropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function vnetRouteDeserializer(item: any): VnetRoute {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _vnetRoutePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** VnetRoute resource specific properties */
export interface VnetRouteProperties {
  /** The starting address for this route. This may also include a CIDR notation, in which case the end address must not be specified. */
  startAddress?: string;
  /** The ending address for this route. If the start address is specified in CIDR notation, this must be omitted. */
  endAddress?: string;
  /**
   * The type of route this is:
   * DEFAULT - By default, every app has routes to the local address ranges specified by RFC1918
   * INHERITED - Routes inherited from the real Virtual Network routes
   * STATIC - Static route set on the app only
   *
   * These values will be used for syncing an app's routes with those from a Virtual Network.
   */
  routeType?: RouteType;
}

export function vnetRoutePropertiesSerializer(item: VnetRouteProperties): any {
  return {
    startAddress: item["startAddress"],
    endAddress: item["endAddress"],
    routeType: item["routeType"],
  };
}

export function vnetRoutePropertiesDeserializer(item: any): VnetRouteProperties {
  return {
    startAddress: item["startAddress"],
    endAddress: item["endAddress"],
    routeType: item["routeType"],
  };
}

/**
 * The type of route this is:
 * DEFAULT - By default, every app has routes to the local address ranges specified by RFC1918
 * INHERITED - Routes inherited from the real Virtual Network routes
 * STATIC - Static route set on the app only
 *
 * These values will be used for syncing an app's routes with those from a Virtual Network.
 */
export enum KnownRouteType {
  /** DEFAULT */
  Default = "DEFAULT",
  /** INHERITED */
  Inherited = "INHERITED",
  /** STATIC */
  Static = "STATIC",
}

/**
 * The type of route this is:
 * DEFAULT - By default, every app has routes to the local address ranges specified by RFC1918
 * INHERITED - Routes inherited from the real Virtual Network routes
 * STATIC - Static route set on the app only
 *
 * These values will be used for syncing an app's routes with those from a Virtual Network. \
 * {@link KnownRouteType} can be used interchangeably with RouteType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DEFAULT** \
 * **INHERITED** \
 * **STATIC**
 */
export type RouteType = string;

/** The Virtual Network gateway contract. This is used to give the Virtual Network gateway access to the VPN package. */
export interface VnetGateway extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** The Virtual Network name. */
  vnetName?: string;
  /** The URI where the VPN package can be downloaded. */
  vpnPackageUri?: string;
}

export function vnetGatewaySerializer(item: VnetGateway): any {
  return {
    properties: areAllPropsUndefined(item, ["vnetName", "vpnPackageUri"])
      ? undefined
      : _vnetGatewayPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function vnetGatewayDeserializer(item: any): VnetGateway {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _vnetGatewayPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** VnetGateway resource specific properties */
export interface VnetGatewayProperties {
  /** The Virtual Network name. */
  vnetName?: string;
  /** The URI where the VPN package can be downloaded. */
  vpnPackageUri: string;
}

export function vnetGatewayPropertiesSerializer(item: VnetGatewayProperties): any {
  return { vnetName: item["vnetName"], vpnPackageUri: item["vpnPackageUri"] };
}

export function vnetGatewayPropertiesDeserializer(item: any): VnetGatewayProperties {
  return {
    vnetName: item["vnetName"],
    vpnPackageUri: item["vpnPackageUri"],
  };
}

/** Options for app content migration. */
export interface StorageMigrationOptions extends ProxyOnlyResource {
  /** AzureFiles connection string. */
  azurefilesConnectionString?: string;
  /** AzureFiles share. */
  azurefilesShare?: string;
  /** <code>true</code>if the app should be switched over; otherwise, <code>false</code>. */
  switchSiteAfterMigration?: boolean;
  /** <code>true</code> if the app should be read only during copy operation; otherwise, <code>false</code>. */
  blockWriteAccessToSite?: boolean;
}

export function storageMigrationOptionsSerializer(item: StorageMigrationOptions): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "azurefilesConnectionString",
      "azurefilesShare",
      "switchSiteAfterMigration",
      "blockWriteAccessToSite",
    ])
      ? undefined
      : _storageMigrationOptionsPropertiesSerializer(item),
  };
}

/** StorageMigrationOptions resource specific properties */
export interface StorageMigrationOptionsProperties {
  /** AzureFiles connection string. */
  azurefilesConnectionString: string;
  /** AzureFiles share. */
  azurefilesShare: string;
  /** <code>true</code>if the app should be switched over; otherwise, <code>false</code>. */
  switchSiteAfterMigration?: boolean;
  /** <code>true</code> if the app should be read only during copy operation; otherwise, <code>false</code>. */
  blockWriteAccessToSite?: boolean;
}

export function storageMigrationOptionsPropertiesSerializer(
  item: StorageMigrationOptionsProperties,
): any {
  return {
    azurefilesConnectionString: item["azurefilesConnectionString"],
    azurefilesShare: item["azurefilesShare"],
    switchSiteAfterMigration: item["switchSiteAfterMigration"],
    blockWriteAccessToSite: item["blockWriteAccessToSite"],
  };
}

/** Response for a migration of app content request. */
export interface StorageMigrationResponse extends ProxyOnlyResource {
  /** When server starts the migration process, it will return an operation ID identifying that particular migration operation. */
  readonly operationId?: string;
}

export function storageMigrationResponseDeserializer(item: any): StorageMigrationResponse {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _storageMigrationResponsePropertiesDeserializer(item["properties"])),
  };
}

/** StorageMigrationResponse resource specific properties */
export interface StorageMigrationResponseProperties {
  /** When server starts the migration process, it will return an operation ID identifying that particular migration operation. */
  readonly operationId?: string;
}

export function storageMigrationResponsePropertiesDeserializer(
  item: any,
): StorageMigrationResponseProperties {
  return {
    operationId: item["operationId"],
  };
}

/** MySQL migration request. */
export interface MigrateMySqlRequest extends ProxyOnlyResource {
  /** Connection string to the remote MySQL database. */
  connectionString?: string;
  /** The type of migration operation to be done */
  migrationType?: MySqlMigrationType;
}

export function migrateMySqlRequestSerializer(item: MigrateMySqlRequest): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, ["connectionString", "migrationType"])
      ? undefined
      : _migrateMySqlRequestPropertiesSerializer(item),
  };
}

/** MigrateMySqlRequest resource specific properties */
export interface MigrateMySqlRequestProperties {
  /** Connection string to the remote MySQL database. */
  connectionString: string;
  /** The type of migration operation to be done */
  migrationType: MySqlMigrationType;
}

export function migrateMySqlRequestPropertiesSerializer(item: MigrateMySqlRequestProperties): any {
  return { connectionString: item["connectionString"], migrationType: item["migrationType"] };
}

/** The type of migration operation to be done */
export type MySqlMigrationType = "LocalToRemote" | "RemoteToLocal";

/** Publishing Credentials Policies parameters. */
export interface CsmPublishingCredentialsPoliciesEntity extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** <code>true</code> to allow access to a publishing method; otherwise, <code>false</code>. */
  allow?: boolean;
}

export function csmPublishingCredentialsPoliciesEntitySerializer(
  item: CsmPublishingCredentialsPoliciesEntity,
): any {
  return {
    properties: areAllPropsUndefined(item, ["allow"])
      ? undefined
      : _csmPublishingCredentialsPoliciesEntityPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function csmPublishingCredentialsPoliciesEntityDeserializer(
  item: any,
): CsmPublishingCredentialsPoliciesEntity {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _csmPublishingCredentialsPoliciesEntityPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** CsmPublishingCredentialsPoliciesEntity resource specific properties */
export interface CsmPublishingCredentialsPoliciesEntityProperties {
  /** <code>true</code> to allow access to a publishing method; otherwise, <code>false</code>. */
  allow: boolean;
}

export function csmPublishingCredentialsPoliciesEntityPropertiesSerializer(
  item: CsmPublishingCredentialsPoliciesEntityProperties,
): any {
  return { allow: item["allow"] };
}

export function csmPublishingCredentialsPoliciesEntityPropertiesDeserializer(
  item: any,
): CsmPublishingCredentialsPoliciesEntityProperties {
  return {
    allow: item["allow"],
  };
}

/** Publishing Credentials Policies entity collection ARM resource. */
export interface _PublishingCredentialsPoliciesCollection {
  /** The CsmPublishingCredentialsPoliciesEntity items on this page */
  value: CsmPublishingCredentialsPoliciesEntity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _publishingCredentialsPoliciesCollectionDeserializer(
  item: any,
): _PublishingCredentialsPoliciesCollection {
  return {
    value: csmPublishingCredentialsPoliciesEntityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function csmPublishingCredentialsPoliciesEntityArraySerializer(
  result: Array<CsmPublishingCredentialsPoliciesEntity>,
): any[] {
  return result.map((item) => {
    return csmPublishingCredentialsPoliciesEntitySerializer(item);
  });
}

export function csmPublishingCredentialsPoliciesEntityArrayDeserializer(
  result: Array<CsmPublishingCredentialsPoliciesEntity>,
): any[] {
  return result.map((item) => {
    return csmPublishingCredentialsPoliciesEntityDeserializer(item);
  });
}

/** Configuration settings for the Azure App Service Authentication / Authorization V2 feature. */
export interface SiteAuthSettingsV2 extends ProxyResource {
  /** Kind of resource. If the resource is an app, you can refer to https://github.com/Azure/app-service-linux-docs/blob/master/Things_You_Should_Know/kind_property.md#app-service-resource-kind-reference for details supported values for kind. */
  kind?: string;
  /** The configuration settings of the platform of App Service Authentication/Authorization. */
  platform?: AuthPlatform;
  /** The configuration settings that determines the validation flow of users using App Service Authentication/Authorization. */
  globalValidation?: GlobalValidation;
  /** The configuration settings of each of the identity providers used to configure App Service Authentication/Authorization. */
  identityProviders?: IdentityProviders;
  /** The configuration settings of the login flow of users using App Service Authentication/Authorization. */
  login?: Login;
  /** The configuration settings of the HTTP requests for authentication and authorization requests made against App Service Authentication/Authorization. */
  httpSettings?: HttpSettings;
}

export function siteAuthSettingsV2Serializer(item: SiteAuthSettingsV2): any {
  return {
    properties: areAllPropsUndefined(item, [
      "platform",
      "globalValidation",
      "identityProviders",
      "login",
      "httpSettings",
    ])
      ? undefined
      : _siteAuthSettingsV2PropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function siteAuthSettingsV2Deserializer(item: any): SiteAuthSettingsV2 {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _siteAuthSettingsV2PropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** SiteAuthSettingsV2 resource specific properties */
export interface SiteAuthSettingsV2Properties {
  /** The configuration settings of the platform of App Service Authentication/Authorization. */
  platform?: AuthPlatform;
  /** The configuration settings that determines the validation flow of users using App Service Authentication/Authorization. */
  globalValidation?: GlobalValidation;
  /** The configuration settings of each of the identity providers used to configure App Service Authentication/Authorization. */
  identityProviders?: IdentityProviders;
  /** The configuration settings of the login flow of users using App Service Authentication/Authorization. */
  login?: Login;
  /** The configuration settings of the HTTP requests for authentication and authorization requests made against App Service Authentication/Authorization. */
  httpSettings?: HttpSettings;
}

export function siteAuthSettingsV2PropertiesSerializer(item: SiteAuthSettingsV2Properties): any {
  return {
    platform: !item["platform"] ? item["platform"] : authPlatformSerializer(item["platform"]),
    globalValidation: !item["globalValidation"]
      ? item["globalValidation"]
      : globalValidationSerializer(item["globalValidation"]),
    identityProviders: !item["identityProviders"]
      ? item["identityProviders"]
      : identityProvidersSerializer(item["identityProviders"]),
    login: !item["login"] ? item["login"] : loginSerializer(item["login"]),
    httpSettings: !item["httpSettings"]
      ? item["httpSettings"]
      : httpSettingsSerializer(item["httpSettings"]),
  };
}

export function siteAuthSettingsV2PropertiesDeserializer(item: any): SiteAuthSettingsV2Properties {
  return {
    platform: !item["platform"] ? item["platform"] : authPlatformDeserializer(item["platform"]),
    globalValidation: !item["globalValidation"]
      ? item["globalValidation"]
      : globalValidationDeserializer(item["globalValidation"]),
    identityProviders: !item["identityProviders"]
      ? item["identityProviders"]
      : identityProvidersDeserializer(item["identityProviders"]),
    login: !item["login"] ? item["login"] : loginDeserializer(item["login"]),
    httpSettings: !item["httpSettings"]
      ? item["httpSettings"]
      : httpSettingsDeserializer(item["httpSettings"]),
  };
}

/** The configuration settings of the platform of App Service Authentication/Authorization. */
export interface AuthPlatform {
  /** <code>true</code> if the Authentication / Authorization feature is enabled for the current app; otherwise, <code>false</code>. */
  enabled?: boolean;
  /**
   * The RuntimeVersion of the Authentication / Authorization feature in use for the current app.
   * The setting in this value can control the behavior of certain features in the Authentication / Authorization module.
   */
  runtimeVersion?: string;
  /**
   * The path of the config file containing auth settings if they come from a file.
   * If the path is relative, base will the site's root directory.
   */
  configFilePath?: string;
}

export function authPlatformSerializer(item: AuthPlatform): any {
  return {
    enabled: item["enabled"],
    runtimeVersion: item["runtimeVersion"],
    configFilePath: item["configFilePath"],
  };
}

export function authPlatformDeserializer(item: any): AuthPlatform {
  return {
    enabled: item["enabled"],
    runtimeVersion: item["runtimeVersion"],
    configFilePath: item["configFilePath"],
  };
}

/** The configuration settings that determines the validation flow of users using App Service Authentication/Authorization. */
export interface GlobalValidation {
  /** <code>true</code> if the authentication flow is required any request is made; otherwise, <code>false</code>. */
  requireAuthentication?: boolean;
  /** The action to take when an unauthenticated client attempts to access the app. */
  unauthenticatedClientAction?: UnauthenticatedClientActionV2;
  /**
   * The default authentication provider to use when multiple providers are configured.
   * This setting is only needed if multiple providers are configured and the unauthenticated client
   * action is set to "RedirectToLoginPage".
   */
  redirectToProvider?: string;
  /** The paths for which unauthenticated flow would not be redirected to the login page. */
  excludedPaths?: string[];
}

export function globalValidationSerializer(item: GlobalValidation): any {
  return {
    requireAuthentication: item["requireAuthentication"],
    unauthenticatedClientAction: item["unauthenticatedClientAction"],
    redirectToProvider: item["redirectToProvider"],
    excludedPaths: !item["excludedPaths"]
      ? item["excludedPaths"]
      : item["excludedPaths"].map((p: any) => {
          return p;
        }),
  };
}

export function globalValidationDeserializer(item: any): GlobalValidation {
  return {
    requireAuthentication: item["requireAuthentication"],
    unauthenticatedClientAction: item["unauthenticatedClientAction"],
    redirectToProvider: item["redirectToProvider"],
    excludedPaths: !item["excludedPaths"]
      ? item["excludedPaths"]
      : item["excludedPaths"].map((p: any) => {
          return p;
        }),
  };
}

/** The action to take when an unauthenticated client attempts to access the app. */
export type UnauthenticatedClientActionV2 =
  | "RedirectToLoginPage"
  | "AllowAnonymous"
  | "Return401"
  | "Return403";

/** The configuration settings of each of the identity providers used to configure App Service Authentication/Authorization. */
export interface IdentityProviders {
  /** The configuration settings of the Azure Active directory provider. */
  azureActiveDirectory?: AzureActiveDirectory;
  /** The configuration settings of the Facebook provider. */
  facebook?: Facebook;
  /** The configuration settings of the GitHub provider. */
  gitHub?: GitHub;
  /** The configuration settings of the Google provider. */
  google?: Google;
  /** The configuration settings of the legacy Microsoft Account provider. */
  legacyMicrosoftAccount?: LegacyMicrosoftAccount;
  /** The configuration settings of the Twitter provider. */
  twitter?: Twitter;
  /** The configuration settings of the Apple provider. */
  apple?: Apple;
  /** The configuration settings of the Azure Static Web Apps provider. */
  azureStaticWebApps?: AzureStaticWebApps;
  /**
   * The map of the name of the alias of each custom Open ID Connect provider to the
   * configuration settings of the custom Open ID Connect provider.
   */
  customOpenIdConnectProviders?: Record<string, CustomOpenIdConnectProvider>;
}

export function identityProvidersSerializer(item: IdentityProviders): any {
  return {
    azureActiveDirectory: !item["azureActiveDirectory"]
      ? item["azureActiveDirectory"]
      : azureActiveDirectorySerializer(item["azureActiveDirectory"]),
    facebook: !item["facebook"] ? item["facebook"] : facebookSerializer(item["facebook"]),
    gitHub: !item["gitHub"] ? item["gitHub"] : gitHubSerializer(item["gitHub"]),
    google: !item["google"] ? item["google"] : googleSerializer(item["google"]),
    legacyMicrosoftAccount: !item["legacyMicrosoftAccount"]
      ? item["legacyMicrosoftAccount"]
      : legacyMicrosoftAccountSerializer(item["legacyMicrosoftAccount"]),
    twitter: !item["twitter"] ? item["twitter"] : twitterSerializer(item["twitter"]),
    apple: !item["apple"] ? item["apple"] : appleSerializer(item["apple"]),
    azureStaticWebApps: !item["azureStaticWebApps"]
      ? item["azureStaticWebApps"]
      : azureStaticWebAppsSerializer(item["azureStaticWebApps"]),
    customOpenIdConnectProviders: !item["customOpenIdConnectProviders"]
      ? item["customOpenIdConnectProviders"]
      : customOpenIdConnectProviderRecordSerializer(item["customOpenIdConnectProviders"]),
  };
}

export function identityProvidersDeserializer(item: any): IdentityProviders {
  return {
    azureActiveDirectory: !item["azureActiveDirectory"]
      ? item["azureActiveDirectory"]
      : azureActiveDirectoryDeserializer(item["azureActiveDirectory"]),
    facebook: !item["facebook"] ? item["facebook"] : facebookDeserializer(item["facebook"]),
    gitHub: !item["gitHub"] ? item["gitHub"] : gitHubDeserializer(item["gitHub"]),
    google: !item["google"] ? item["google"] : googleDeserializer(item["google"]),
    legacyMicrosoftAccount: !item["legacyMicrosoftAccount"]
      ? item["legacyMicrosoftAccount"]
      : legacyMicrosoftAccountDeserializer(item["legacyMicrosoftAccount"]),
    twitter: !item["twitter"] ? item["twitter"] : twitterDeserializer(item["twitter"]),
    apple: !item["apple"] ? item["apple"] : appleDeserializer(item["apple"]),
    azureStaticWebApps: !item["azureStaticWebApps"]
      ? item["azureStaticWebApps"]
      : azureStaticWebAppsDeserializer(item["azureStaticWebApps"]),
    customOpenIdConnectProviders: !item["customOpenIdConnectProviders"]
      ? item["customOpenIdConnectProviders"]
      : customOpenIdConnectProviderRecordDeserializer(item["customOpenIdConnectProviders"]),
  };
}

/** The configuration settings of the Azure Active directory provider. */
export interface AzureActiveDirectory {
  /** <code>false</code> if the Azure Active Directory provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the Azure Active Directory app registration. */
  registration?: AzureActiveDirectoryRegistration;
  /** The configuration settings of the Azure Active Directory login flow. */
  login?: AzureActiveDirectoryLogin;
  /** The configuration settings of the Azure Active Directory token validation flow. */
  validation?: AzureActiveDirectoryValidation;
  /**
   * Gets a value indicating whether the Azure AD configuration was auto-provisioned using 1st party tooling.
   * This is an internal flag primarily intended to support the Azure Management Portal. Users should not
   * read or write to this property.
   */
  isAutoProvisioned?: boolean;
}

export function azureActiveDirectorySerializer(item: AzureActiveDirectory): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : azureActiveDirectoryRegistrationSerializer(item["registration"]),
    login: !item["login"] ? item["login"] : azureActiveDirectoryLoginSerializer(item["login"]),
    validation: !item["validation"]
      ? item["validation"]
      : azureActiveDirectoryValidationSerializer(item["validation"]),
    isAutoProvisioned: item["isAutoProvisioned"],
  };
}

export function azureActiveDirectoryDeserializer(item: any): AzureActiveDirectory {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : azureActiveDirectoryRegistrationDeserializer(item["registration"]),
    login: !item["login"] ? item["login"] : azureActiveDirectoryLoginDeserializer(item["login"]),
    validation: !item["validation"]
      ? item["validation"]
      : azureActiveDirectoryValidationDeserializer(item["validation"]),
    isAutoProvisioned: item["isAutoProvisioned"],
  };
}

/** The configuration settings of the Azure Active Directory app registration. */
export interface AzureActiveDirectoryRegistration {
  /**
   * The OpenID Connect Issuer URI that represents the entity which issues access tokens for this application.
   * When using Azure Active Directory, this value is the URI of the directory tenant, e.g. `https://login.microsoftonline.com/v2.0/{tenant-guid}/`.
   * This URI is a case-sensitive identifier for the token issuer.
   * More information on OpenID Connect Discovery: http://openid.net/specs/openid-connect-discovery-1_0.html
   */
  openIdIssuer?: string;
  /**
   * The Client ID of this relying party application, known as the client_id.
   * This setting is required for enabling OpenID Connection authentication with Azure Active Directory or
   * other 3rd party OpenID Connect providers.
   * More information on OpenID Connect: http://openid.net/specs/openid-connect-core-1_0.html
   */
  clientId?: string;
  /** The app setting name that contains the client secret of the relying party application. */
  clientSecretSettingName?: string;
  /**
   * An alternative to the client secret, that is the thumbprint of a certificate used for signing purposes. This property acts as
   * a replacement for the Client Secret. It is also optional.
   */
  clientSecretCertificateThumbprint?: string;
  /**
   * An alternative to the client secret thumbprint, that is the subject alternative name of a certificate used for signing purposes. This property acts as
   * a replacement for the Client Secret Certificate Thumbprint. It is also optional.
   */
  clientSecretCertificateSubjectAlternativeName?: string;
  /**
   * An alternative to the client secret thumbprint, that is the issuer of a certificate used for signing purposes. This property acts as
   * a replacement for the Client Secret Certificate Thumbprint. It is also optional.
   */
  clientSecretCertificateIssuer?: string;
}

export function azureActiveDirectoryRegistrationSerializer(
  item: AzureActiveDirectoryRegistration,
): any {
  return {
    openIdIssuer: item["openIdIssuer"],
    clientId: item["clientId"],
    clientSecretSettingName: item["clientSecretSettingName"],
    clientSecretCertificateThumbprint: item["clientSecretCertificateThumbprint"],
    clientSecretCertificateSubjectAlternativeName:
      item["clientSecretCertificateSubjectAlternativeName"],
    clientSecretCertificateIssuer: item["clientSecretCertificateIssuer"],
  };
}

export function azureActiveDirectoryRegistrationDeserializer(
  item: any,
): AzureActiveDirectoryRegistration {
  return {
    openIdIssuer: item["openIdIssuer"],
    clientId: item["clientId"],
    clientSecretSettingName: item["clientSecretSettingName"],
    clientSecretCertificateThumbprint: item["clientSecretCertificateThumbprint"],
    clientSecretCertificateSubjectAlternativeName:
      item["clientSecretCertificateSubjectAlternativeName"],
    clientSecretCertificateIssuer: item["clientSecretCertificateIssuer"],
  };
}

/** The configuration settings of the Azure Active Directory login flow. */
export interface AzureActiveDirectoryLogin {
  /**
   * Login parameters to send to the OpenID Connect authorization endpoint when
   * a user logs in. Each parameter must be in the form "key=value".
   */
  loginParameters?: string[];
  /** <code>true</code> if the www-authenticate provider should be omitted from the request; otherwise, <code>false</code>. */
  disableWWWAuthenticate?: boolean;
}

export function azureActiveDirectoryLoginSerializer(item: AzureActiveDirectoryLogin): any {
  return {
    loginParameters: !item["loginParameters"]
      ? item["loginParameters"]
      : item["loginParameters"].map((p: any) => {
          return p;
        }),
    disableWWWAuthenticate: item["disableWWWAuthenticate"],
  };
}

export function azureActiveDirectoryLoginDeserializer(item: any): AzureActiveDirectoryLogin {
  return {
    loginParameters: !item["loginParameters"]
      ? item["loginParameters"]
      : item["loginParameters"].map((p: any) => {
          return p;
        }),
    disableWWWAuthenticate: item["disableWWWAuthenticate"],
  };
}

/** The configuration settings of the Azure Active Directory token validation flow. */
export interface AzureActiveDirectoryValidation {
  /** The configuration settings of the checks that should be made while validating the JWT Claims. */
  jwtClaimChecks?: JwtClaimChecks;
  /** The list of audiences that can make successful authentication/authorization requests. */
  allowedAudiences?: string[];
  /** The configuration settings of the default authorization policy. */
  defaultAuthorizationPolicy?: DefaultAuthorizationPolicy;
}

export function azureActiveDirectoryValidationSerializer(
  item: AzureActiveDirectoryValidation,
): any {
  return {
    jwtClaimChecks: !item["jwtClaimChecks"]
      ? item["jwtClaimChecks"]
      : jwtClaimChecksSerializer(item["jwtClaimChecks"]),
    allowedAudiences: !item["allowedAudiences"]
      ? item["allowedAudiences"]
      : item["allowedAudiences"].map((p: any) => {
          return p;
        }),
    defaultAuthorizationPolicy: !item["defaultAuthorizationPolicy"]
      ? item["defaultAuthorizationPolicy"]
      : defaultAuthorizationPolicySerializer(item["defaultAuthorizationPolicy"]),
  };
}

export function azureActiveDirectoryValidationDeserializer(
  item: any,
): AzureActiveDirectoryValidation {
  return {
    jwtClaimChecks: !item["jwtClaimChecks"]
      ? item["jwtClaimChecks"]
      : jwtClaimChecksDeserializer(item["jwtClaimChecks"]),
    allowedAudiences: !item["allowedAudiences"]
      ? item["allowedAudiences"]
      : item["allowedAudiences"].map((p: any) => {
          return p;
        }),
    defaultAuthorizationPolicy: !item["defaultAuthorizationPolicy"]
      ? item["defaultAuthorizationPolicy"]
      : defaultAuthorizationPolicyDeserializer(item["defaultAuthorizationPolicy"]),
  };
}

/** The configuration settings of the checks that should be made while validating the JWT Claims. */
export interface JwtClaimChecks {
  /** The list of the allowed groups. */
  allowedGroups?: string[];
  /** The list of the allowed client applications. */
  allowedClientApplications?: string[];
}

export function jwtClaimChecksSerializer(item: JwtClaimChecks): any {
  return {
    allowedGroups: !item["allowedGroups"]
      ? item["allowedGroups"]
      : item["allowedGroups"].map((p: any) => {
          return p;
        }),
    allowedClientApplications: !item["allowedClientApplications"]
      ? item["allowedClientApplications"]
      : item["allowedClientApplications"].map((p: any) => {
          return p;
        }),
  };
}

export function jwtClaimChecksDeserializer(item: any): JwtClaimChecks {
  return {
    allowedGroups: !item["allowedGroups"]
      ? item["allowedGroups"]
      : item["allowedGroups"].map((p: any) => {
          return p;
        }),
    allowedClientApplications: !item["allowedClientApplications"]
      ? item["allowedClientApplications"]
      : item["allowedClientApplications"].map((p: any) => {
          return p;
        }),
  };
}

/** The configuration settings of the Azure Active Directory default authorization policy. */
export interface DefaultAuthorizationPolicy {
  /** The configuration settings of the Azure Active Directory allowed principals. */
  allowedPrincipals?: AllowedPrincipals;
  /** The configuration settings of the Azure Active Directory allowed applications. */
  allowedApplications?: string[];
}

export function defaultAuthorizationPolicySerializer(item: DefaultAuthorizationPolicy): any {
  return {
    allowedPrincipals: !item["allowedPrincipals"]
      ? item["allowedPrincipals"]
      : allowedPrincipalsSerializer(item["allowedPrincipals"]),
    allowedApplications: !item["allowedApplications"]
      ? item["allowedApplications"]
      : item["allowedApplications"].map((p: any) => {
          return p;
        }),
  };
}

export function defaultAuthorizationPolicyDeserializer(item: any): DefaultAuthorizationPolicy {
  return {
    allowedPrincipals: !item["allowedPrincipals"]
      ? item["allowedPrincipals"]
      : allowedPrincipalsDeserializer(item["allowedPrincipals"]),
    allowedApplications: !item["allowedApplications"]
      ? item["allowedApplications"]
      : item["allowedApplications"].map((p: any) => {
          return p;
        }),
  };
}

/** The configuration settings of the Azure Active Directory allowed principals. */
export interface AllowedPrincipals {
  /** The list of the allowed groups. */
  groups?: string[];
  /** The list of the allowed identities. */
  identities?: string[];
}

export function allowedPrincipalsSerializer(item: AllowedPrincipals): any {
  return {
    groups: !item["groups"]
      ? item["groups"]
      : item["groups"].map((p: any) => {
          return p;
        }),
    identities: !item["identities"]
      ? item["identities"]
      : item["identities"].map((p: any) => {
          return p;
        }),
  };
}

export function allowedPrincipalsDeserializer(item: any): AllowedPrincipals {
  return {
    groups: !item["groups"]
      ? item["groups"]
      : item["groups"].map((p: any) => {
          return p;
        }),
    identities: !item["identities"]
      ? item["identities"]
      : item["identities"].map((p: any) => {
          return p;
        }),
  };
}

/** The configuration settings of the Facebook provider. */
export interface Facebook {
  /** <code>false</code> if the Facebook provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the Facebook provider. */
  registration?: AppRegistration;
  /** The version of the Facebook api to be used while logging in. */
  graphApiVersion?: string;
  /** The configuration settings of the login flow. */
  login?: LoginScopes;
}

export function facebookSerializer(item: Facebook): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : appRegistrationSerializer(item["registration"]),
    graphApiVersion: item["graphApiVersion"],
    login: !item["login"] ? item["login"] : loginScopesSerializer(item["login"]),
  };
}

export function facebookDeserializer(item: any): Facebook {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : appRegistrationDeserializer(item["registration"]),
    graphApiVersion: item["graphApiVersion"],
    login: !item["login"] ? item["login"] : loginScopesDeserializer(item["login"]),
  };
}

/** The configuration settings of the app registration for providers that have app ids and app secrets */
export interface AppRegistration {
  /** The App ID of the app used for login. */
  appId?: string;
  /** The app setting name that contains the app secret. */
  appSecretSettingName?: string;
}

export function appRegistrationSerializer(item: AppRegistration): any {
  return { appId: item["appId"], appSecretSettingName: item["appSecretSettingName"] };
}

export function appRegistrationDeserializer(item: any): AppRegistration {
  return {
    appId: item["appId"],
    appSecretSettingName: item["appSecretSettingName"],
  };
}

/** The configuration settings of the login flow, including the scopes that should be requested. */
export interface LoginScopes {
  /** A list of the scopes that should be requested while authenticating. */
  scopes?: string[];
}

export function loginScopesSerializer(item: LoginScopes): any {
  return {
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

export function loginScopesDeserializer(item: any): LoginScopes {
  return {
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

/** The configuration settings of the GitHub provider. */
export interface GitHub {
  /** <code>false</code> if the GitHub provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the GitHub provider. */
  registration?: ClientRegistration;
  /** The configuration settings of the login flow. */
  login?: LoginScopes;
}

export function gitHubSerializer(item: GitHub): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : clientRegistrationSerializer(item["registration"]),
    login: !item["login"] ? item["login"] : loginScopesSerializer(item["login"]),
  };
}

export function gitHubDeserializer(item: any): GitHub {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : clientRegistrationDeserializer(item["registration"]),
    login: !item["login"] ? item["login"] : loginScopesDeserializer(item["login"]),
  };
}

/** The configuration settings of the app registration for providers that have client ids and client secrets */
export interface ClientRegistration {
  /** The Client ID of the app used for login. */
  clientId?: string;
  /** The app setting name that contains the client secret. */
  clientSecretSettingName?: string;
}

export function clientRegistrationSerializer(item: ClientRegistration): any {
  return { clientId: item["clientId"], clientSecretSettingName: item["clientSecretSettingName"] };
}

export function clientRegistrationDeserializer(item: any): ClientRegistration {
  return {
    clientId: item["clientId"],
    clientSecretSettingName: item["clientSecretSettingName"],
  };
}

/** The configuration settings of the Google provider. */
export interface Google {
  /** <code>false</code> if the Google provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the Google provider. */
  registration?: ClientRegistration;
  /** The configuration settings of the login flow. */
  login?: LoginScopes;
  /** The configuration settings of the Azure Active Directory token validation flow. */
  validation?: AllowedAudiencesValidation;
}

export function googleSerializer(item: Google): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : clientRegistrationSerializer(item["registration"]),
    login: !item["login"] ? item["login"] : loginScopesSerializer(item["login"]),
    validation: !item["validation"]
      ? item["validation"]
      : allowedAudiencesValidationSerializer(item["validation"]),
  };
}

export function googleDeserializer(item: any): Google {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : clientRegistrationDeserializer(item["registration"]),
    login: !item["login"] ? item["login"] : loginScopesDeserializer(item["login"]),
    validation: !item["validation"]
      ? item["validation"]
      : allowedAudiencesValidationDeserializer(item["validation"]),
  };
}

/** The configuration settings of the Allowed Audiences validation flow. */
export interface AllowedAudiencesValidation {
  /** The configuration settings of the allowed list of audiences from which to validate the JWT token. */
  allowedAudiences?: string[];
}

export function allowedAudiencesValidationSerializer(item: AllowedAudiencesValidation): any {
  return {
    allowedAudiences: !item["allowedAudiences"]
      ? item["allowedAudiences"]
      : item["allowedAudiences"].map((p: any) => {
          return p;
        }),
  };
}

export function allowedAudiencesValidationDeserializer(item: any): AllowedAudiencesValidation {
  return {
    allowedAudiences: !item["allowedAudiences"]
      ? item["allowedAudiences"]
      : item["allowedAudiences"].map((p: any) => {
          return p;
        }),
  };
}

/** The configuration settings of the legacy Microsoft Account provider. */
export interface LegacyMicrosoftAccount {
  /** <code>false</code> if the legacy Microsoft Account provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the legacy Microsoft Account provider. */
  registration?: ClientRegistration;
  /** The configuration settings of the login flow. */
  login?: LoginScopes;
  /** The configuration settings of the legacy Microsoft Account provider token validation flow. */
  validation?: AllowedAudiencesValidation;
}

export function legacyMicrosoftAccountSerializer(item: LegacyMicrosoftAccount): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : clientRegistrationSerializer(item["registration"]),
    login: !item["login"] ? item["login"] : loginScopesSerializer(item["login"]),
    validation: !item["validation"]
      ? item["validation"]
      : allowedAudiencesValidationSerializer(item["validation"]),
  };
}

export function legacyMicrosoftAccountDeserializer(item: any): LegacyMicrosoftAccount {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : clientRegistrationDeserializer(item["registration"]),
    login: !item["login"] ? item["login"] : loginScopesDeserializer(item["login"]),
    validation: !item["validation"]
      ? item["validation"]
      : allowedAudiencesValidationDeserializer(item["validation"]),
  };
}

/** The configuration settings of the Twitter provider. */
export interface Twitter {
  /** <code>false</code> if the Twitter provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the Twitter provider. */
  registration?: TwitterRegistration;
}

export function twitterSerializer(item: Twitter): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : twitterRegistrationSerializer(item["registration"]),
  };
}

export function twitterDeserializer(item: any): Twitter {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : twitterRegistrationDeserializer(item["registration"]),
  };
}

/** The configuration settings of the app registration for the Twitter provider. */
export interface TwitterRegistration {
  /**
   * The OAuth 1.0a consumer key of the Twitter application used for sign-in.
   * This setting is required for enabling Twitter Sign-In.
   * Twitter Sign-In documentation: https://dev.twitter.com/web/sign-in
   */
  consumerKey?: string;
  /**
   * The app setting name that contains the OAuth 1.0a consumer secret of the Twitter
   * application used for sign-in.
   */
  consumerSecretSettingName?: string;
}

export function twitterRegistrationSerializer(item: TwitterRegistration): any {
  return {
    consumerKey: item["consumerKey"],
    consumerSecretSettingName: item["consumerSecretSettingName"],
  };
}

export function twitterRegistrationDeserializer(item: any): TwitterRegistration {
  return {
    consumerKey: item["consumerKey"],
    consumerSecretSettingName: item["consumerSecretSettingName"],
  };
}

/** The configuration settings of the Apple provider. */
export interface Apple {
  /** <code>false</code> if the Apple provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the Apple registration. */
  registration?: AppleRegistration;
  /** The configuration settings of the login flow. */
  login?: LoginScopes;
}

export function appleSerializer(item: Apple): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : appleRegistrationSerializer(item["registration"]),
    login: !item["login"] ? item["login"] : loginScopesSerializer(item["login"]),
  };
}

export function appleDeserializer(item: any): Apple {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : appleRegistrationDeserializer(item["registration"]),
    login: !item["login"] ? item["login"] : loginScopesDeserializer(item["login"]),
  };
}

/** The configuration settings of the registration for the Apple provider */
export interface AppleRegistration {
  /** The Client ID of the app used for login. */
  clientId?: string;
  /** The app setting name that contains the client secret. */
  clientSecretSettingName?: string;
}

export function appleRegistrationSerializer(item: AppleRegistration): any {
  return { clientId: item["clientId"], clientSecretSettingName: item["clientSecretSettingName"] };
}

export function appleRegistrationDeserializer(item: any): AppleRegistration {
  return {
    clientId: item["clientId"],
    clientSecretSettingName: item["clientSecretSettingName"],
  };
}

/** The configuration settings of the Azure Static Web Apps provider. */
export interface AzureStaticWebApps {
  /** <code>false</code> if the Azure Static Web Apps provider should not be enabled despite the set registration; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the Azure Static Web Apps registration. */
  registration?: AzureStaticWebAppsRegistration;
}

export function azureStaticWebAppsSerializer(item: AzureStaticWebApps): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : azureStaticWebAppsRegistrationSerializer(item["registration"]),
  };
}

export function azureStaticWebAppsDeserializer(item: any): AzureStaticWebApps {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : azureStaticWebAppsRegistrationDeserializer(item["registration"]),
  };
}

/** The configuration settings of the registration for the Azure Static Web Apps provider */
export interface AzureStaticWebAppsRegistration {
  /** The Client ID of the app used for login. */
  clientId?: string;
}

export function azureStaticWebAppsRegistrationSerializer(
  item: AzureStaticWebAppsRegistration,
): any {
  return { clientId: item["clientId"] };
}

export function azureStaticWebAppsRegistrationDeserializer(
  item: any,
): AzureStaticWebAppsRegistration {
  return {
    clientId: item["clientId"],
  };
}

export function customOpenIdConnectProviderRecordSerializer(
  item: Record<string, CustomOpenIdConnectProvider>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : customOpenIdConnectProviderSerializer(item[key]);
  });
  return result;
}

export function customOpenIdConnectProviderRecordDeserializer(
  item: Record<string, any>,
): Record<string, CustomOpenIdConnectProvider> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : customOpenIdConnectProviderDeserializer(item[key]);
  });
  return result;
}

/** The configuration settings of the custom Open ID Connect provider. */
export interface CustomOpenIdConnectProvider {
  /** <code>false</code> if the custom Open ID provider provider should not be enabled; otherwise, <code>true</code>. */
  enabled?: boolean;
  /** The configuration settings of the app registration for the custom Open ID Connect provider. */
  registration?: OpenIdConnectRegistration;
  /** The configuration settings of the login flow of the custom Open ID Connect provider. */
  login?: OpenIdConnectLogin;
}

export function customOpenIdConnectProviderSerializer(item: CustomOpenIdConnectProvider): any {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : openIdConnectRegistrationSerializer(item["registration"]),
    login: !item["login"] ? item["login"] : openIdConnectLoginSerializer(item["login"]),
  };
}

export function customOpenIdConnectProviderDeserializer(item: any): CustomOpenIdConnectProvider {
  return {
    enabled: item["enabled"],
    registration: !item["registration"]
      ? item["registration"]
      : openIdConnectRegistrationDeserializer(item["registration"]),
    login: !item["login"] ? item["login"] : openIdConnectLoginDeserializer(item["login"]),
  };
}

/** The configuration settings of the app registration for the custom Open ID Connect provider. */
export interface OpenIdConnectRegistration {
  /** The client id of the custom Open ID Connect provider. */
  clientId?: string;
  /** The authentication credentials of the custom Open ID Connect provider. */
  clientCredential?: OpenIdConnectClientCredential;
  /** The configuration settings of the endpoints used for the custom Open ID Connect provider. */
  openIdConnectConfiguration?: OpenIdConnectConfig;
}

export function openIdConnectRegistrationSerializer(item: OpenIdConnectRegistration): any {
  return {
    clientId: item["clientId"],
    clientCredential: !item["clientCredential"]
      ? item["clientCredential"]
      : openIdConnectClientCredentialSerializer(item["clientCredential"]),
    openIdConnectConfiguration: !item["openIdConnectConfiguration"]
      ? item["openIdConnectConfiguration"]
      : openIdConnectConfigSerializer(item["openIdConnectConfiguration"]),
  };
}

export function openIdConnectRegistrationDeserializer(item: any): OpenIdConnectRegistration {
  return {
    clientId: item["clientId"],
    clientCredential: !item["clientCredential"]
      ? item["clientCredential"]
      : openIdConnectClientCredentialDeserializer(item["clientCredential"]),
    openIdConnectConfiguration: !item["openIdConnectConfiguration"]
      ? item["openIdConnectConfiguration"]
      : openIdConnectConfigDeserializer(item["openIdConnectConfiguration"]),
  };
}

/** The authentication client credentials of the custom Open ID Connect provider. */
export interface OpenIdConnectClientCredential {
  /** The method that should be used to authenticate the user. */
  method?: "ClientSecretPost";
  /** The app setting that contains the client secret for the custom Open ID Connect provider. */
  clientSecretSettingName?: string;
}

export function openIdConnectClientCredentialSerializer(item: OpenIdConnectClientCredential): any {
  return { method: item["method"], clientSecretSettingName: item["clientSecretSettingName"] };
}

export function openIdConnectClientCredentialDeserializer(
  item: any,
): OpenIdConnectClientCredential {
  return {
    method: item["method"],
    clientSecretSettingName: item["clientSecretSettingName"],
  };
}

/** The configuration settings of the endpoints used for the custom Open ID Connect provider. */
export interface OpenIdConnectConfig {
  /** The endpoint to be used to make an authorization request. */
  authorizationEndpoint?: string;
  /** The endpoint to be used to request a token. */
  tokenEndpoint?: string;
  /** The endpoint that issues the token. */
  issuer?: string;
  /** The endpoint that provides the keys necessary to validate the token. */
  certificationUri?: string;
  /** The endpoint that contains all the configuration endpoints for the provider. */
  wellKnownOpenIdConfiguration?: string;
}

export function openIdConnectConfigSerializer(item: OpenIdConnectConfig): any {
  return {
    authorizationEndpoint: item["authorizationEndpoint"],
    tokenEndpoint: item["tokenEndpoint"],
    issuer: item["issuer"],
    certificationUri: item["certificationUri"],
    wellKnownOpenIdConfiguration: item["wellKnownOpenIdConfiguration"],
  };
}

export function openIdConnectConfigDeserializer(item: any): OpenIdConnectConfig {
  return {
    authorizationEndpoint: item["authorizationEndpoint"],
    tokenEndpoint: item["tokenEndpoint"],
    issuer: item["issuer"],
    certificationUri: item["certificationUri"],
    wellKnownOpenIdConfiguration: item["wellKnownOpenIdConfiguration"],
  };
}

/** The configuration settings of the login flow of the custom Open ID Connect provider. */
export interface OpenIdConnectLogin {
  /** The name of the claim that contains the users name. */
  nameClaimType?: string;
  /** A list of the scopes that should be requested while authenticating. */
  scopes?: string[];
}

export function openIdConnectLoginSerializer(item: OpenIdConnectLogin): any {
  return {
    nameClaimType: item["nameClaimType"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

export function openIdConnectLoginDeserializer(item: any): OpenIdConnectLogin {
  return {
    nameClaimType: item["nameClaimType"],
    scopes: !item["scopes"]
      ? item["scopes"]
      : item["scopes"].map((p: any) => {
          return p;
        }),
  };
}

/** The configuration settings of the login flow of users using App Service Authentication/Authorization. */
export interface Login {
  /** The routes that specify the endpoints used for login and logout requests. */
  routes?: LoginRoutes;
  /** The configuration settings of the token store. */
  tokenStore?: TokenStore;
  /** <code>true</code> if the fragments from the request are preserved after the login request is made; otherwise, <code>false</code>. */
  preserveUrlFragmentsForLogins?: boolean;
  /**
   * External URLs that can be redirected to as part of logging in or logging out of the app. Note that the query string part of the URL is ignored.
   * This is an advanced setting typically only needed by Windows Store application backends.
   * Note that URLs within the current domain are always implicitly allowed.
   */
  allowedExternalRedirectUrls?: string[];
  /** The configuration settings of the session cookie's expiration. */
  cookieExpiration?: CookieExpiration;
  /** The configuration settings of the nonce used in the login flow. */
  nonce?: Nonce;
}

export function loginSerializer(item: Login): any {
  return {
    routes: !item["routes"] ? item["routes"] : loginRoutesSerializer(item["routes"]),
    tokenStore: !item["tokenStore"] ? item["tokenStore"] : tokenStoreSerializer(item["tokenStore"]),
    preserveUrlFragmentsForLogins: item["preserveUrlFragmentsForLogins"],
    allowedExternalRedirectUrls: !item["allowedExternalRedirectUrls"]
      ? item["allowedExternalRedirectUrls"]
      : item["allowedExternalRedirectUrls"].map((p: any) => {
          return p;
        }),
    cookieExpiration: !item["cookieExpiration"]
      ? item["cookieExpiration"]
      : cookieExpirationSerializer(item["cookieExpiration"]),
    nonce: !item["nonce"] ? item["nonce"] : nonceSerializer(item["nonce"]),
  };
}

export function loginDeserializer(item: any): Login {
  return {
    routes: !item["routes"] ? item["routes"] : loginRoutesDeserializer(item["routes"]),
    tokenStore: !item["tokenStore"]
      ? item["tokenStore"]
      : tokenStoreDeserializer(item["tokenStore"]),
    preserveUrlFragmentsForLogins: item["preserveUrlFragmentsForLogins"],
    allowedExternalRedirectUrls: !item["allowedExternalRedirectUrls"]
      ? item["allowedExternalRedirectUrls"]
      : item["allowedExternalRedirectUrls"].map((p: any) => {
          return p;
        }),
    cookieExpiration: !item["cookieExpiration"]
      ? item["cookieExpiration"]
      : cookieExpirationDeserializer(item["cookieExpiration"]),
    nonce: !item["nonce"] ? item["nonce"] : nonceDeserializer(item["nonce"]),
  };
}

/** The routes that specify the endpoints used for login and logout requests. */
export interface LoginRoutes {
  /** The endpoint at which a logout request should be made. */
  logoutEndpoint?: string;
}

export function loginRoutesSerializer(item: LoginRoutes): any {
  return { logoutEndpoint: item["logoutEndpoint"] };
}

export function loginRoutesDeserializer(item: any): LoginRoutes {
  return {
    logoutEndpoint: item["logoutEndpoint"],
  };
}

/** The configuration settings of the token store. */
export interface TokenStore {
  /**
   * <code>true</code> to durably store platform-specific security tokens that are obtained during login flows; otherwise, <code>false</code>.
   * The default is <code>false</code>.
   */
  enabled?: boolean;
  /**
   * The number of hours after session token expiration that a session token can be used to
   * call the token refresh API. The default is 72 hours.
   */
  tokenRefreshExtensionHours?: number;
  /** The configuration settings of the storage of the tokens if a file system is used. */
  fileSystem?: FileSystemTokenStore;
  /** The configuration settings of the storage of the tokens if blob storage is used. */
  azureBlobStorage?: BlobStorageTokenStore;
}

export function tokenStoreSerializer(item: TokenStore): any {
  return {
    enabled: item["enabled"],
    tokenRefreshExtensionHours: item["tokenRefreshExtensionHours"],
    fileSystem: !item["fileSystem"]
      ? item["fileSystem"]
      : fileSystemTokenStoreSerializer(item["fileSystem"]),
    azureBlobStorage: !item["azureBlobStorage"]
      ? item["azureBlobStorage"]
      : blobStorageTokenStoreSerializer(item["azureBlobStorage"]),
  };
}

export function tokenStoreDeserializer(item: any): TokenStore {
  return {
    enabled: item["enabled"],
    tokenRefreshExtensionHours: item["tokenRefreshExtensionHours"],
    fileSystem: !item["fileSystem"]
      ? item["fileSystem"]
      : fileSystemTokenStoreDeserializer(item["fileSystem"]),
    azureBlobStorage: !item["azureBlobStorage"]
      ? item["azureBlobStorage"]
      : blobStorageTokenStoreDeserializer(item["azureBlobStorage"]),
  };
}

/** The configuration settings of the storage of the tokens if a file system is used. */
export interface FileSystemTokenStore {
  /** The directory in which the tokens will be stored. */
  directory?: string;
}

export function fileSystemTokenStoreSerializer(item: FileSystemTokenStore): any {
  return { directory: item["directory"] };
}

export function fileSystemTokenStoreDeserializer(item: any): FileSystemTokenStore {
  return {
    directory: item["directory"],
  };
}

/** The configuration settings of the storage of the tokens if blob storage is used. */
export interface BlobStorageTokenStore {
  /** The name of the app setting containing the SAS URL of the blob storage containing the tokens. */
  sasUrlSettingName?: string;
}

export function blobStorageTokenStoreSerializer(item: BlobStorageTokenStore): any {
  return { sasUrlSettingName: item["sasUrlSettingName"] };
}

export function blobStorageTokenStoreDeserializer(item: any): BlobStorageTokenStore {
  return {
    sasUrlSettingName: item["sasUrlSettingName"],
  };
}

/** The configuration settings of the session cookie's expiration. */
export interface CookieExpiration {
  /** The convention used when determining the session cookie's expiration. */
  convention?: CookieExpirationConvention;
  /** The time after the request is made when the session cookie should expire. */
  timeToExpiration?: string;
}

export function cookieExpirationSerializer(item: CookieExpiration): any {
  return { convention: item["convention"], timeToExpiration: item["timeToExpiration"] };
}

export function cookieExpirationDeserializer(item: any): CookieExpiration {
  return {
    convention: item["convention"],
    timeToExpiration: item["timeToExpiration"],
  };
}

/** The convention used when determining the session cookie's expiration. */
export type CookieExpirationConvention = "FixedTime" | "IdentityProviderDerived";

/** The configuration settings of the nonce used in the login flow. */
export interface Nonce {
  /** <code>false</code> if the nonce should not be validated while completing the login flow; otherwise, <code>true</code>. */
  validateNonce?: boolean;
  /** The time after the request is made when the nonce should expire. */
  nonceExpirationInterval?: string;
}

export function nonceSerializer(item: Nonce): any {
  return {
    validateNonce: item["validateNonce"],
    nonceExpirationInterval: item["nonceExpirationInterval"],
  };
}

export function nonceDeserializer(item: any): Nonce {
  return {
    validateNonce: item["validateNonce"],
    nonceExpirationInterval: item["nonceExpirationInterval"],
  };
}

/** The configuration settings of the HTTP requests for authentication and authorization requests made against App Service Authentication/Authorization. */
export interface HttpSettings {
  /** <code>false</code> if the authentication/authorization responses not having the HTTPS scheme are permissible; otherwise, <code>true</code>. */
  requireHttps?: boolean;
  /** The configuration settings of the paths HTTP requests. */
  routes?: HttpSettingsRoutes;
  /** The configuration settings of a forward proxy used to make the requests. */
  forwardProxy?: ForwardProxy;
}

export function httpSettingsSerializer(item: HttpSettings): any {
  return {
    requireHttps: item["requireHttps"],
    routes: !item["routes"] ? item["routes"] : httpSettingsRoutesSerializer(item["routes"]),
    forwardProxy: !item["forwardProxy"]
      ? item["forwardProxy"]
      : forwardProxySerializer(item["forwardProxy"]),
  };
}

export function httpSettingsDeserializer(item: any): HttpSettings {
  return {
    requireHttps: item["requireHttps"],
    routes: !item["routes"] ? item["routes"] : httpSettingsRoutesDeserializer(item["routes"]),
    forwardProxy: !item["forwardProxy"]
      ? item["forwardProxy"]
      : forwardProxyDeserializer(item["forwardProxy"]),
  };
}

/** The configuration settings of the paths HTTP requests. */
export interface HttpSettingsRoutes {
  /** The prefix that should precede all the authentication/authorization paths. */
  apiPrefix?: string;
}

export function httpSettingsRoutesSerializer(item: HttpSettingsRoutes): any {
  return { apiPrefix: item["apiPrefix"] };
}

export function httpSettingsRoutesDeserializer(item: any): HttpSettingsRoutes {
  return {
    apiPrefix: item["apiPrefix"],
  };
}

/** The configuration settings of a forward proxy used to make the requests. */
export interface ForwardProxy {
  /** The convention used to determine the url of the request made. */
  convention?: ForwardProxyConvention;
  /** The name of the header containing the host of the request. */
  customHostHeaderName?: string;
  /** The name of the header containing the scheme of the request. */
  customProtoHeaderName?: string;
}

export function forwardProxySerializer(item: ForwardProxy): any {
  return {
    convention: item["convention"],
    customHostHeaderName: item["customHostHeaderName"],
    customProtoHeaderName: item["customProtoHeaderName"],
  };
}

export function forwardProxyDeserializer(item: any): ForwardProxy {
  return {
    convention: item["convention"],
    customHostHeaderName: item["customHostHeaderName"],
    customProtoHeaderName: item["customProtoHeaderName"],
  };
}

/** The convention used to determine the url of the request made. */
export type ForwardProxyConvention = "NoProxy" | "Standard" | "Custom";

/** Description of site key vault references. */
export interface ApiKVReference extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  reference?: string;
  status?: ResolveStatus;
  vaultName?: string;
  secretName?: string;
  secretVersion?: string;
  /** Managed service identity. */
  identityType?: ManagedServiceIdentity;
  details?: string;
  source?: "KeyVault";
  activeVersion?: string;
}

export function apiKVReferenceDeserializer(item: any): ApiKVReference {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _apiKVReferencePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** ApiKVReference resource specific properties */
export interface ApiKVReferenceProperties {
  reference?: string;
  status?: ResolveStatus;
  vaultName?: string;
  secretName?: string;
  secretVersion?: string;
  /** Managed service identity. */
  identityType?: ManagedServiceIdentity;
  details?: string;
  source?: "KeyVault";
  activeVersion?: string;
}

export function apiKVReferencePropertiesDeserializer(item: any): ApiKVReferenceProperties {
  return {
    reference: item["reference"],
    status: item["status"],
    vaultName: item["vaultName"],
    secretName: item["secretName"],
    secretVersion: item["secretVersion"],
    identityType: !item["identityType"]
      ? item["identityType"]
      : managedServiceIdentityDeserializer(item["identityType"]),
    details: item["details"],
    source: item["source"],
    activeVersion: item["activeVersion"],
  };
}

/** Type of ResolveStatus */
export type ResolveStatus =
  | "Initialized"
  | "Resolved"
  | "InvalidSyntax"
  | "MSINotEnabled"
  | "VaultNotFound"
  | "SecretNotFound"
  | "SecretVersionNotFound"
  | "AccessToKeyVaultDenied"
  | "OtherReasons"
  | "FetchTimedOut"
  | "UnauthorizedClient";

/** Paged collection of ApiKVReference items */
export interface _ApiKVReferenceCollection {
  /** The ApiKVReference items on this page */
  value: ApiKVReference[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _apiKVReferenceCollectionDeserializer(item: any): _ApiKVReferenceCollection {
  return {
    value: apiKVReferenceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function apiKVReferenceArrayDeserializer(result: Array<ApiKVReference>): any[] {
  return result.map((item) => {
    return apiKVReferenceDeserializer(item);
  });
}

/** Configuration of App Service site logs. */
export interface SiteLogsConfig extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Application logs configuration. */
  applicationLogs?: ApplicationLogsConfig;
  /** HTTP logs configuration. */
  httpLogs?: HttpLogsConfig;
  /** Failed requests tracing configuration. */
  failedRequestsTracing?: EnabledConfig;
  /** Detailed error messages configuration. */
  detailedErrorMessages?: EnabledConfig;
}

export function siteLogsConfigSerializer(item: SiteLogsConfig): any {
  return {
    properties: areAllPropsUndefined(item, [
      "applicationLogs",
      "httpLogs",
      "failedRequestsTracing",
      "detailedErrorMessages",
    ])
      ? undefined
      : _siteLogsConfigPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function siteLogsConfigDeserializer(item: any): SiteLogsConfig {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _siteLogsConfigPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** SiteLogsConfig resource specific properties */
export interface SiteLogsConfigProperties {
  /** Application logs configuration. */
  applicationLogs?: ApplicationLogsConfig;
  /** HTTP logs configuration. */
  httpLogs?: HttpLogsConfig;
  /** Failed requests tracing configuration. */
  failedRequestsTracing?: EnabledConfig;
  /** Detailed error messages configuration. */
  detailedErrorMessages?: EnabledConfig;
}

export function siteLogsConfigPropertiesSerializer(item: SiteLogsConfigProperties): any {
  return {
    applicationLogs: !item["applicationLogs"]
      ? item["applicationLogs"]
      : applicationLogsConfigSerializer(item["applicationLogs"]),
    httpLogs: !item["httpLogs"] ? item["httpLogs"] : httpLogsConfigSerializer(item["httpLogs"]),
    failedRequestsTracing: !item["failedRequestsTracing"]
      ? item["failedRequestsTracing"]
      : enabledConfigSerializer(item["failedRequestsTracing"]),
    detailedErrorMessages: !item["detailedErrorMessages"]
      ? item["detailedErrorMessages"]
      : enabledConfigSerializer(item["detailedErrorMessages"]),
  };
}

export function siteLogsConfigPropertiesDeserializer(item: any): SiteLogsConfigProperties {
  return {
    applicationLogs: !item["applicationLogs"]
      ? item["applicationLogs"]
      : applicationLogsConfigDeserializer(item["applicationLogs"]),
    httpLogs: !item["httpLogs"] ? item["httpLogs"] : httpLogsConfigDeserializer(item["httpLogs"]),
    failedRequestsTracing: !item["failedRequestsTracing"]
      ? item["failedRequestsTracing"]
      : enabledConfigDeserializer(item["failedRequestsTracing"]),
    detailedErrorMessages: !item["detailedErrorMessages"]
      ? item["detailedErrorMessages"]
      : enabledConfigDeserializer(item["detailedErrorMessages"]),
  };
}

/** Application logs configuration. */
export interface ApplicationLogsConfig {
  /** Application logs to file system configuration. */
  fileSystem?: FileSystemApplicationLogsConfig;
  /** Application logs to azure table storage configuration. */
  azureTableStorage?: AzureTableStorageApplicationLogsConfig;
  /** Application logs to blob storage configuration. */
  azureBlobStorage?: AzureBlobStorageApplicationLogsConfig;
}

export function applicationLogsConfigSerializer(item: ApplicationLogsConfig): any {
  return {
    fileSystem: !item["fileSystem"]
      ? item["fileSystem"]
      : fileSystemApplicationLogsConfigSerializer(item["fileSystem"]),
    azureTableStorage: !item["azureTableStorage"]
      ? item["azureTableStorage"]
      : azureTableStorageApplicationLogsConfigSerializer(item["azureTableStorage"]),
    azureBlobStorage: !item["azureBlobStorage"]
      ? item["azureBlobStorage"]
      : azureBlobStorageApplicationLogsConfigSerializer(item["azureBlobStorage"]),
  };
}

export function applicationLogsConfigDeserializer(item: any): ApplicationLogsConfig {
  return {
    fileSystem: !item["fileSystem"]
      ? item["fileSystem"]
      : fileSystemApplicationLogsConfigDeserializer(item["fileSystem"]),
    azureTableStorage: !item["azureTableStorage"]
      ? item["azureTableStorage"]
      : azureTableStorageApplicationLogsConfigDeserializer(item["azureTableStorage"]),
    azureBlobStorage: !item["azureBlobStorage"]
      ? item["azureBlobStorage"]
      : azureBlobStorageApplicationLogsConfigDeserializer(item["azureBlobStorage"]),
  };
}

/** Application logs to file system configuration. */
export interface FileSystemApplicationLogsConfig {
  /** Log level. */
  level?: LogLevel;
}

export function fileSystemApplicationLogsConfigSerializer(
  item: FileSystemApplicationLogsConfig,
): any {
  return { level: item["level"] };
}

export function fileSystemApplicationLogsConfigDeserializer(
  item: any,
): FileSystemApplicationLogsConfig {
  return {
    level: item["level"],
  };
}

/** Log level. */
export type LogLevel = "Off" | "Verbose" | "Information" | "Warning" | "Error";

/** Application logs to Azure table storage configuration. */
export interface AzureTableStorageApplicationLogsConfig {
  /** Log level. */
  level?: LogLevel;
  /** SAS URL to an Azure table with add/query/delete permissions. */
  sasUrl: string;
}

export function azureTableStorageApplicationLogsConfigSerializer(
  item: AzureTableStorageApplicationLogsConfig,
): any {
  return { level: item["level"], sasUrl: item["sasUrl"] };
}

export function azureTableStorageApplicationLogsConfigDeserializer(
  item: any,
): AzureTableStorageApplicationLogsConfig {
  return {
    level: item["level"],
    sasUrl: item["sasUrl"],
  };
}

/** Application logs azure blob storage configuration. */
export interface AzureBlobStorageApplicationLogsConfig {
  /** Log level. */
  level?: LogLevel;
  /** SAS url to a azure blob container with read/write/list/delete permissions. */
  sasUrl?: string;
  /**
   * Retention in days.
   * Remove blobs older than X days.
   * 0 or lower means no retention.
   */
  retentionInDays?: number;
}

export function azureBlobStorageApplicationLogsConfigSerializer(
  item: AzureBlobStorageApplicationLogsConfig,
): any {
  return { level: item["level"], sasUrl: item["sasUrl"], retentionInDays: item["retentionInDays"] };
}

export function azureBlobStorageApplicationLogsConfigDeserializer(
  item: any,
): AzureBlobStorageApplicationLogsConfig {
  return {
    level: item["level"],
    sasUrl: item["sasUrl"],
    retentionInDays: item["retentionInDays"],
  };
}

/** Http logs configuration. */
export interface HttpLogsConfig {
  /** Http logs to file system configuration. */
  fileSystem?: FileSystemHttpLogsConfig;
  /** Http logs to azure blob storage configuration. */
  azureBlobStorage?: AzureBlobStorageHttpLogsConfig;
}

export function httpLogsConfigSerializer(item: HttpLogsConfig): any {
  return {
    fileSystem: !item["fileSystem"]
      ? item["fileSystem"]
      : fileSystemHttpLogsConfigSerializer(item["fileSystem"]),
    azureBlobStorage: !item["azureBlobStorage"]
      ? item["azureBlobStorage"]
      : azureBlobStorageHttpLogsConfigSerializer(item["azureBlobStorage"]),
  };
}

export function httpLogsConfigDeserializer(item: any): HttpLogsConfig {
  return {
    fileSystem: !item["fileSystem"]
      ? item["fileSystem"]
      : fileSystemHttpLogsConfigDeserializer(item["fileSystem"]),
    azureBlobStorage: !item["azureBlobStorage"]
      ? item["azureBlobStorage"]
      : azureBlobStorageHttpLogsConfigDeserializer(item["azureBlobStorage"]),
  };
}

/** Http logs to file system configuration. */
export interface FileSystemHttpLogsConfig {
  /**
   * Maximum size in megabytes that http log files can use.
   * When reached old log files will be removed to make space for new ones.
   * Value can range between 25 and 100.
   */
  retentionInMb?: number;
  /**
   * Retention in days.
   * Remove files older than X days.
   * 0 or lower means no retention.
   */
  retentionInDays?: number;
  /** True if configuration is enabled, false if it is disabled and null if configuration is not set. */
  enabled?: boolean;
}

export function fileSystemHttpLogsConfigSerializer(item: FileSystemHttpLogsConfig): any {
  return {
    retentionInMb: item["retentionInMb"],
    retentionInDays: item["retentionInDays"],
    enabled: item["enabled"],
  };
}

export function fileSystemHttpLogsConfigDeserializer(item: any): FileSystemHttpLogsConfig {
  return {
    retentionInMb: item["retentionInMb"],
    retentionInDays: item["retentionInDays"],
    enabled: item["enabled"],
  };
}

/** Http logs to azure blob storage configuration. */
export interface AzureBlobStorageHttpLogsConfig {
  /** SAS url to a azure blob container with read/write/list/delete permissions. */
  sasUrl?: string;
  /**
   * Retention in days.
   * Remove blobs older than X days.
   * 0 or lower means no retention.
   */
  retentionInDays?: number;
  /** True if configuration is enabled, false if it is disabled and null if configuration is not set. */
  enabled?: boolean;
}

export function azureBlobStorageHttpLogsConfigSerializer(
  item: AzureBlobStorageHttpLogsConfig,
): any {
  return {
    sasUrl: item["sasUrl"],
    retentionInDays: item["retentionInDays"],
    enabled: item["enabled"],
  };
}

export function azureBlobStorageHttpLogsConfigDeserializer(
  item: any,
): AzureBlobStorageHttpLogsConfig {
  return {
    sasUrl: item["sasUrl"],
    retentionInDays: item["retentionInDays"],
    enabled: item["enabled"],
  };
}

/** Enabled configuration. */
export interface EnabledConfig {
  /** True if configuration is enabled, false if it is disabled and null if configuration is not set. */
  enabled?: boolean;
}

export function enabledConfigSerializer(item: EnabledConfig): any {
  return { enabled: item["enabled"] };
}

export function enabledConfigDeserializer(item: any): EnabledConfig {
  return {
    enabled: item["enabled"],
  };
}

/** Slot Config names azure resource. */
export interface SlotConfigNamesResource extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** List of connection string names. */
  connectionStringNames?: string[];
  /** List of application settings names. */
  appSettingNames?: string[];
  /** List of external Azure storage account identifiers. */
  azureStorageConfigNames?: string[];
}

export function slotConfigNamesResourceSerializer(item: SlotConfigNamesResource): any {
  return {
    properties: areAllPropsUndefined(item, [
      "connectionStringNames",
      "appSettingNames",
      "azureStorageConfigNames",
    ])
      ? undefined
      : _slotConfigNamesResourcePropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function slotConfigNamesResourceDeserializer(item: any): SlotConfigNamesResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _slotConfigNamesResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/**
 * Names for connection strings, application settings, and external Azure storage account configuration
 * identifiers to be marked as sticky to the deployment slot and not moved during a swap operation.
 * This is valid for all deployment slots in an app.
 */
export interface SlotConfigNames {
  /** List of connection string names. */
  connectionStringNames?: string[];
  /** List of application settings names. */
  appSettingNames?: string[];
  /** List of external Azure storage account identifiers. */
  azureStorageConfigNames?: string[];
}

export function slotConfigNamesSerializer(item: SlotConfigNames): any {
  return {
    connectionStringNames: !item["connectionStringNames"]
      ? item["connectionStringNames"]
      : item["connectionStringNames"].map((p: any) => {
          return p;
        }),
    appSettingNames: !item["appSettingNames"]
      ? item["appSettingNames"]
      : item["appSettingNames"].map((p: any) => {
          return p;
        }),
    azureStorageConfigNames: !item["azureStorageConfigNames"]
      ? item["azureStorageConfigNames"]
      : item["azureStorageConfigNames"].map((p: any) => {
          return p;
        }),
  };
}

export function slotConfigNamesDeserializer(item: any): SlotConfigNames {
  return {
    connectionStringNames: !item["connectionStringNames"]
      ? item["connectionStringNames"]
      : item["connectionStringNames"].map((p: any) => {
          return p;
        }),
    appSettingNames: !item["appSettingNames"]
      ? item["appSettingNames"]
      : item["appSettingNames"].map((p: any) => {
          return p;
        }),
    azureStorageConfigNames: !item["azureStorageConfigNames"]
      ? item["azureStorageConfigNames"]
      : item["azureStorageConfigNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Web app configuration ARM resource. */
export interface SiteConfigResource extends ProxyResource {
  /** Kind of resource. If the resource is an app, you can refer to https://github.com/Azure/app-service-linux-docs/blob/master/Things_You_Should_Know/kind_property.md#app-service-resource-kind-reference for details supported values for kind. */
  kind?: string;
  /** Number of workers. */
  numberOfWorkers?: number;
  /** Default documents. */
  defaultDocuments?: string[];
  /** .NET Framework version. */
  netFrameworkVersion?: string;
  /** Version of PHP. */
  phpVersion?: string;
  /** Version of Python. */
  pythonVersion?: string;
  /** Version of Node.js. */
  nodeVersion?: string;
  /** Version of PowerShell. */
  powerShellVersion?: string;
  /** Linux App Framework and version */
  linuxFxVersion?: string;
  /** Xenon App Framework and version */
  windowsFxVersion?: string;
  /** <code>true</code> if request tracing is enabled; otherwise, <code>false</code>. */
  requestTracingEnabled?: boolean;
  /** Request tracing expiration time. */
  requestTracingExpirationTime?: Date;
  /** <code>true</code> if remote debugging is enabled; otherwise, <code>false</code>. */
  remoteDebuggingEnabled?: boolean;
  /** Remote debugging version. */
  remoteDebuggingVersion?: string;
  /** <code>true</code> if HTTP logging is enabled; otherwise, <code>false</code>. */
  httpLoggingEnabled?: boolean;
  /** Flag to use Managed Identity Creds for ACR pull */
  acrUseManagedIdentityCreds?: boolean;
  /** If using user managed identity, the user managed identity ClientId */
  acrUserManagedIdentityID?: string;
  /** HTTP logs directory size limit. */
  logsDirectorySizeLimit?: number;
  /** <code>true</code> if detailed error logging is enabled; otherwise, <code>false</code>. */
  detailedErrorLoggingEnabled?: boolean;
  /** Publishing user name. */
  publishingUsername?: string;
  /** Application settings. This property is not returned in response to normal create and read requests since it may contain sensitive information. */
  appSettings?: NameValuePair[];
  /** Application metadata. This property cannot be retrieved, since it may contain secrets. */
  metadata?: NameValuePair[];
  /** Connection strings. This property is not returned in response to normal create and read requests since it may contain sensitive information. */
  connectionStrings?: ConnStringInfo[];
  /** Site MachineKey. */
  readonly machineKey?: SiteMachineKey;
  /** Handler mappings. */
  handlerMappings?: HandlerMapping[];
  /** Document root. */
  documentRoot?: string;
  /** SCM type. */
  scmType?: ScmType;
  /** <code>true</code> to use 32-bit worker process; otherwise, <code>false</code>. */
  use32BitWorkerProcess?: boolean;
  /** <code>true</code> if WebSocket is enabled; otherwise, <code>false</code>. */
  webSocketsEnabled?: boolean;
  /** <code>true</code> if Always On is enabled; otherwise, <code>false</code>. */
  alwaysOn?: boolean;
  /** Java version. */
  javaVersion?: string;
  /** Java container. */
  javaContainer?: string;
  /** Java container version. */
  javaContainerVersion?: string;
  /** App command line to launch. */
  appCommandLine?: string;
  /** Managed pipeline mode. */
  managedPipelineMode?: ManagedPipelineMode;
  /** Virtual applications. */
  virtualApplications?: VirtualApplication[];
  /** Site load balancing. */
  loadBalancing?: SiteLoadBalancing;
  /** This is work around for polymorphic types. */
  experiments?: Experiments;
  /** Site limits. */
  limits?: SiteLimits;
  /** <code>true</code> if Auto Heal is enabled; otherwise, <code>false</code>. */
  autoHealEnabled?: boolean;
  /** Auto Heal rules. */
  autoHealRules?: AutoHealRules;
  /** Tracing options. */
  tracingOptions?: string;
  /** Virtual Network name. */
  vnetName?: string;
  /** Virtual Network Route All enabled. This causes all outbound traffic to have Virtual Network Security Groups and User Defined Routes applied. */
  vnetRouteAllEnabled?: boolean;
  /** The number of private ports assigned to this app. These will be assigned dynamically on runtime. */
  vnetPrivatePortsCount?: number;
  /** Cross-Origin Resource Sharing (CORS) settings. */
  cors?: CorsSettings;
  /** Push endpoint settings. */
  push?: PushSettings;
  /** Information about the formal API definition for the app. */
  apiDefinition?: ApiDefinitionInfo;
  /** Azure API management settings linked to the app. */
  apiManagementConfig?: ApiManagementConfig;
  /** Auto-swap slot name. */
  autoSwapSlotName?: string;
  /** <code>true</code> to enable local MySQL; otherwise, <code>false</code>. */
  localMySqlEnabled?: boolean;
  /** Managed Service Identity Id */
  managedServiceIdentityId?: number;
  /** Explicit Managed Service Identity Id */
  xManagedServiceIdentityId?: number;
  /** Identity to use for Key Vault Reference authentication. */
  keyVaultReferenceIdentity?: string;
  /** IP security restrictions for main. */
  ipSecurityRestrictions?: IpSecurityRestriction[];
  /** Default action for main access restriction if no rules are matched. */
  ipSecurityRestrictionsDefaultAction?: DefaultAction;
  /** IP security restrictions for scm. */
  scmIpSecurityRestrictions?: IpSecurityRestriction[];
  /** Default action for scm access restriction if no rules are matched. */
  scmIpSecurityRestrictionsDefaultAction?: DefaultAction;
  /** IP security restrictions for scm to use main. */
  scmIpSecurityRestrictionsUseMain?: boolean;
  /** Http20Enabled: configures a web site to allow clients to connect over http2.0 */
  http20Enabled?: boolean;
  /** Http20ProxyFlag: Configures a website to allow http2.0 to pass be proxied all the way to the app. 0 = disabled, 1 = pass through all http2 traffic, 2 = pass through gRPC only. */
  http20ProxyFlag?: number;
  /** MinTlsVersion: configures the minimum version of TLS required for SSL requests */
  minTlsVersion?: SupportedTlsVersions;
  /** The minimum strength TLS cipher suite allowed for an application */
  minTlsCipherSuite?: TlsCipherSuites;
  /** ScmMinTlsVersion: configures the minimum version of TLS required for SSL requests for SCM site */
  scmMinTlsVersion?: SupportedTlsVersions;
  /** State of FTP / FTPS service */
  ftpsState?: FtpsState;
  /**
   * Number of preWarmed instances.
   * This setting only applies to the Consumption and Elastic Plans
   */
  preWarmedInstanceCount?: number;
  /**
   * Maximum number of workers that a site can scale out to.
   * This setting only applies to the Consumption and Elastic Premium Plans
   */
  functionAppScaleLimit?: number;
  /**
   * Maximum number of workers that a site can scale out to.
   * This setting only applies to apps in plans where ElasticScaleEnabled is <code>true</code>
   */
  elasticWebAppScaleLimit?: number;
  /** Health check path */
  healthCheckPath?: string;
  /**
   * Gets or sets a value indicating whether functions runtime scale monitoring is enabled. When enabled,
   * the ScaleController will not monitor event sources directly, but will instead call to the
   * runtime to get scale status.
   */
  functionsRuntimeScaleMonitoringEnabled?: boolean;
  /** Sets the time zone a site uses for generating timestamps. Compatible with Linux and Windows App Service. Setting the WEBSITE_TIME_ZONE app setting takes precedence over this config. For Linux, expects tz database values https://www.iana.org/time-zones (for a quick reference see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). For Windows, expects one of the time zones listed under HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Time Zones */
  websiteTimeZone?: string;
  /**
   * Number of minimum instance count for a site
   * This setting only applies to the Elastic Plans
   */
  minimumElasticInstanceCount?: number;
  /** List of Azure Storage Accounts. */
  azureStorageAccounts?: Record<string, AzureStorageInfoValue>;
  /** Property to allow or block all public traffic. */
  publicNetworkAccess?: string;
}

export function siteConfigResourceSerializer(item: SiteConfigResource): any {
  return {
    properties: areAllPropsUndefined(item, [
      "numberOfWorkers",
      "defaultDocuments",
      "netFrameworkVersion",
      "phpVersion",
      "pythonVersion",
      "nodeVersion",
      "powerShellVersion",
      "linuxFxVersion",
      "windowsFxVersion",
      "requestTracingEnabled",
      "requestTracingExpirationTime",
      "remoteDebuggingEnabled",
      "remoteDebuggingVersion",
      "httpLoggingEnabled",
      "acrUseManagedIdentityCreds",
      "acrUserManagedIdentityID",
      "logsDirectorySizeLimit",
      "detailedErrorLoggingEnabled",
      "publishingUsername",
      "appSettings",
      "metadata",
      "connectionStrings",
      "handlerMappings",
      "documentRoot",
      "scmType",
      "use32BitWorkerProcess",
      "webSocketsEnabled",
      "alwaysOn",
      "javaVersion",
      "javaContainer",
      "javaContainerVersion",
      "appCommandLine",
      "managedPipelineMode",
      "virtualApplications",
      "loadBalancing",
      "experiments",
      "limits",
      "autoHealEnabled",
      "autoHealRules",
      "tracingOptions",
      "vnetName",
      "vnetRouteAllEnabled",
      "vnetPrivatePortsCount",
      "cors",
      "push",
      "apiDefinition",
      "apiManagementConfig",
      "autoSwapSlotName",
      "localMySqlEnabled",
      "managedServiceIdentityId",
      "xManagedServiceIdentityId",
      "keyVaultReferenceIdentity",
      "ipSecurityRestrictions",
      "ipSecurityRestrictionsDefaultAction",
      "scmIpSecurityRestrictions",
      "scmIpSecurityRestrictionsDefaultAction",
      "scmIpSecurityRestrictionsUseMain",
      "http20Enabled",
      "http20ProxyFlag",
      "minTlsVersion",
      "minTlsCipherSuite",
      "scmMinTlsVersion",
      "ftpsState",
      "preWarmedInstanceCount",
      "functionAppScaleLimit",
      "elasticWebAppScaleLimit",
      "healthCheckPath",
      "functionsRuntimeScaleMonitoringEnabled",
      "websiteTimeZone",
      "minimumElasticInstanceCount",
      "azureStorageAccounts",
      "publicNetworkAccess",
    ])
      ? undefined
      : _siteConfigResourcePropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function siteConfigResourceDeserializer(item: any): SiteConfigResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _siteConfigResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** Collection of metadata for the app configuration snapshots that can be restored. */
export interface _SiteConfigurationSnapshotInfoCollection {
  /** The SiteConfigurationSnapshotInfo items on this page */
  value: SiteConfigurationSnapshotInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _siteConfigurationSnapshotInfoCollectionDeserializer(
  item: any,
): _SiteConfigurationSnapshotInfoCollection {
  return {
    value: siteConfigurationSnapshotInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function siteConfigurationSnapshotInfoArrayDeserializer(
  result: Array<SiteConfigurationSnapshotInfo>,
): any[] {
  return result.map((item) => {
    return siteConfigurationSnapshotInfoDeserializer(item);
  });
}

/** A snapshot of a web app configuration. */
export interface SiteConfigurationSnapshotInfo extends ProxyOnlyResource {
  /** The time the snapshot was taken. */
  readonly time?: Date;
  /** The id of the snapshot */
  readonly snapshotId?: number;
}

export function siteConfigurationSnapshotInfoDeserializer(
  item: any,
): SiteConfigurationSnapshotInfo {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _siteConfigurationSnapshotInfoPropertiesDeserializer(item["properties"])),
  };
}

/** SiteConfigurationSnapshotInfo resource specific properties */
export interface SiteConfigurationSnapshotInfoProperties {
  /** The time the snapshot was taken. */
  readonly time?: Date;
  /** The id of the snapshot */
  readonly snapshotId?: number;
}

export function siteConfigurationSnapshotInfoPropertiesDeserializer(
  item: any,
): SiteConfigurationSnapshotInfoProperties {
  return {
    time: !item["time"] ? item["time"] : new Date(item["time"]),
    snapshotId: item["snapshotId"],
  };
}

/** Collection of site configurations. */
export interface _SiteConfigResourceCollection {
  /** The SiteConfigResource items on this page */
  value: SiteConfigResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _siteConfigResourceCollectionDeserializer(
  item: any,
): _SiteConfigResourceCollection {
  return {
    value: siteConfigResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function siteConfigResourceArraySerializer(result: Array<SiteConfigResource>): any[] {
  return result.map((item) => {
    return siteConfigResourceSerializer(item);
  });
}

export function siteConfigResourceArrayDeserializer(result: Array<SiteConfigResource>): any[] {
  return result.map((item) => {
    return siteConfigResourceDeserializer(item);
  });
}

/** Continuous Web Job Information. */
export interface ContinuousWebJob extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Job status. */
  status?: ContinuousWebJobStatus;
  /** Detailed status. */
  detailedStatus?: string;
  /** Log URL. */
  logUrl?: string;
  /** Run command. */
  runCommand?: string;
  /** Job URL. */
  url?: string;
  /** Extra Info URL. */
  extraInfoUrl?: string;
  /** Job type. */
  webJobType?: WebJobType;
  /** Error information. */
  error?: string;
  /** Using SDK? */
  usingSdk?: boolean;
  /** Job settings. */
  settings?: Record<string, any>;
}

export function continuousWebJobDeserializer(item: any): ContinuousWebJob {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _continuousWebJobPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** ContinuousWebJob resource specific properties */
export interface ContinuousWebJobProperties {
  /** Job status. */
  status?: ContinuousWebJobStatus;
  /** Detailed status. */
  detailedStatus?: string;
  /** Log URL. */
  logUrl?: string;
  /** Run command. */
  runCommand?: string;
  /** Job URL. */
  url?: string;
  /** Extra Info URL. */
  extraInfoUrl?: string;
  /** Job type. */
  webJobType?: WebJobType;
  /** Error information. */
  error?: string;
  /** Using SDK? */
  usingSdk?: boolean;
  /** Job settings. */
  settings?: Record<string, any>;
}

export function continuousWebJobPropertiesDeserializer(item: any): ContinuousWebJobProperties {
  return {
    status: item["status"],
    detailedStatus: item["detailed_status"],
    logUrl: item["log_url"],
    runCommand: item["run_command"],
    url: item["url"],
    extraInfoUrl: item["extra_info_url"],
    webJobType: item["web_job_type"],
    error: item["error"],
    usingSdk: item["using_sdk"],
    settings: !item["settings"]
      ? item["settings"]
      : Object.fromEntries(Object.entries(item["settings"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Job status. */
export type ContinuousWebJobStatus =
  | "Initializing"
  | "Starting"
  | "Running"
  | "PendingRestart"
  | "Stopped";
/** Job type. */
export type WebJobType = "Continuous" | "Triggered";

/** Collection of Kudu continuous web job information elements. */
export interface _ContinuousWebJobCollection {
  /** The ContinuousWebJob items on this page */
  value: ContinuousWebJob[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _continuousWebJobCollectionDeserializer(item: any): _ContinuousWebJobCollection {
  return {
    value: continuousWebJobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function continuousWebJobArrayDeserializer(result: Array<ContinuousWebJob>): any[] {
  return result.map((item) => {
    return continuousWebJobDeserializer(item);
  });
}

/** Deployment status response payload. */
export interface CsmDeploymentStatus extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Deployment operation id. */
  deploymentId?: string;
  /** Deployment build status. */
  status?: DeploymentBuildStatus;
  /** Number of site instances currently being provisioned. */
  numberOfInstancesInProgress?: number;
  /** Number of site instances provisioned successfully. */
  numberOfInstancesSuccessful?: number;
  /** Number of site instances failed to provision. */
  numberOfInstancesFailed?: number;
  /** List of URLs pointing to logs for instances which failed to provision. */
  failedInstancesLogs?: string[];
  /** List of errors. */
  errors?: ErrorEntity[];
}

export function csmDeploymentStatusDeserializer(item: any): CsmDeploymentStatus {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _csmDeploymentStatusPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** CsmDeploymentStatus resource specific properties */
export interface CsmDeploymentStatusProperties {
  /** Deployment operation id. */
  deploymentId?: string;
  /** Deployment build status. */
  status?: DeploymentBuildStatus;
  /** Number of site instances currently being provisioned. */
  numberOfInstancesInProgress?: number;
  /** Number of site instances provisioned successfully. */
  numberOfInstancesSuccessful?: number;
  /** Number of site instances failed to provision. */
  numberOfInstancesFailed?: number;
  /** List of URLs pointing to logs for instances which failed to provision. */
  failedInstancesLogs?: string[];
  /** List of errors. */
  errors?: ErrorEntity[];
}

export function csmDeploymentStatusPropertiesDeserializer(
  item: any,
): CsmDeploymentStatusProperties {
  return {
    deploymentId: item["deploymentId"],
    status: item["status"],
    numberOfInstancesInProgress: item["numberOfInstancesInProgress"],
    numberOfInstancesSuccessful: item["numberOfInstancesSuccessful"],
    numberOfInstancesFailed: item["numberOfInstancesFailed"],
    failedInstancesLogs: !item["failedInstancesLogs"]
      ? item["failedInstancesLogs"]
      : item["failedInstancesLogs"].map((p: any) => {
          return p;
        }),
    errors: !item["errors"] ? item["errors"] : errorEntityArrayDeserializer(item["errors"]),
  };
}

/** Deployment build status. */
export enum KnownDeploymentBuildStatus {
  /** TimedOut */
  TimedOut = "TimedOut",
  /** RuntimeFailed */
  RuntimeFailed = "RuntimeFailed",
  /** BuildAborted */
  BuildAborted = "BuildAborted",
  /** BuildFailed */
  BuildFailed = "BuildFailed",
  /** BuildRequestReceived */
  BuildRequestReceived = "BuildRequestReceived",
  /** BuildPending */
  BuildPending = "BuildPending",
  /** BuildInProgress */
  BuildInProgress = "BuildInProgress",
  /** BuildSuccessful */
  BuildSuccessful = "BuildSuccessful",
  /** PostBuildRestartRequired */
  PostBuildRestartRequired = "PostBuildRestartRequired",
  /** StartPolling */
  StartPolling = "StartPolling",
  /** StartPollingWithRestart */
  StartPollingWithRestart = "StartPollingWithRestart",
  /** RuntimeStarting */
  RuntimeStarting = "RuntimeStarting",
  /** RuntimeSuccessful */
  RuntimeSuccessful = "RuntimeSuccessful",
}

/**
 * Deployment build status. \
 * {@link KnownDeploymentBuildStatus} can be used interchangeably with DeploymentBuildStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TimedOut** \
 * **RuntimeFailed** \
 * **BuildAborted** \
 * **BuildFailed** \
 * **BuildRequestReceived** \
 * **BuildPending** \
 * **BuildInProgress** \
 * **BuildSuccessful** \
 * **PostBuildRestartRequired** \
 * **StartPolling** \
 * **StartPollingWithRestart** \
 * **RuntimeStarting** \
 * **RuntimeSuccessful**
 */
export type DeploymentBuildStatus = string;

/** Deployment status collection ARM resource. */
export interface _CsmDeploymentStatusCollection {
  /** The CsmDeploymentStatus items on this page */
  value: CsmDeploymentStatus[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _csmDeploymentStatusCollectionDeserializer(
  item: any,
): _CsmDeploymentStatusCollection {
  return {
    value: csmDeploymentStatusArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function csmDeploymentStatusArrayDeserializer(result: Array<CsmDeploymentStatus>): any[] {
  return result.map((item) => {
    return csmDeploymentStatusDeserializer(item);
  });
}

/** User credentials used for publishing activity. */
export interface Deployment extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Deployment status. */
  status?: number;
  /** Details about deployment status. */
  message?: string;
  /** Who authored the deployment. */
  author?: string;
  /** Who performed the deployment. */
  deployer?: string;
  /** Author email. */
  authorEmail?: string;
  /** Start time. */
  startTime?: Date;
  /** End time. */
  endTime?: Date;
  /** True if deployment is currently active, false if completed and null if not started. */
  active?: boolean;
  /** Details on deployment. */
  details?: string;
}

export function deploymentSerializer(item: Deployment): any {
  return {
    properties: areAllPropsUndefined(item, [
      "status",
      "message",
      "author",
      "deployer",
      "authorEmail",
      "startTime",
      "endTime",
      "active",
      "details",
    ])
      ? undefined
      : _deploymentPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function deploymentDeserializer(item: any): Deployment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _deploymentPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** Deployment resource specific properties */
export interface DeploymentProperties {
  /** Deployment status. */
  status?: number;
  /** Details about deployment status. */
  message?: string;
  /** Who authored the deployment. */
  author?: string;
  /** Who performed the deployment. */
  deployer?: string;
  /** Author email. */
  authorEmail?: string;
  /** Start time. */
  startTime?: Date;
  /** End time. */
  endTime?: Date;
  /** True if deployment is currently active, false if completed and null if not started. */
  active?: boolean;
  /** Details on deployment. */
  details?: string;
}

export function deploymentPropertiesSerializer(item: DeploymentProperties): any {
  return {
    status: item["status"],
    message: item["message"],
    author: item["author"],
    deployer: item["deployer"],
    author_email: item["authorEmail"],
    start_time: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
    end_time: !item["endTime"] ? item["endTime"] : item["endTime"].toISOString(),
    active: item["active"],
    details: item["details"],
  };
}

export function deploymentPropertiesDeserializer(item: any): DeploymentProperties {
  return {
    status: item["status"],
    message: item["message"],
    author: item["author"],
    deployer: item["deployer"],
    authorEmail: item["author_email"],
    startTime: !item["start_time"] ? item["start_time"] : new Date(item["start_time"]),
    endTime: !item["end_time"] ? item["end_time"] : new Date(item["end_time"]),
    active: item["active"],
    details: item["details"],
  };
}

/** Collection of app deployments. */
export interface _DeploymentCollection {
  /** The Deployment items on this page */
  value: Deployment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deploymentCollectionDeserializer(item: any): _DeploymentCollection {
  return {
    value: deploymentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deploymentArraySerializer(result: Array<Deployment>): any[] {
  return result.map((item) => {
    return deploymentSerializer(item);
  });
}

export function deploymentArrayDeserializer(result: Array<Deployment>): any[] {
  return result.map((item) => {
    return deploymentDeserializer(item);
  });
}

/** MSDeploy ARM response */
export interface MSDeployStatus extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Username of deployer */
  readonly deployer?: string;
  /** Provisioning state */
  readonly provisioningState?: MSDeployProvisioningState;
  /** Start time of deploy operation */
  readonly startTime?: Date;
  /** End time of deploy operation */
  readonly endTime?: Date;
  /** Whether the deployment operation has completed */
  readonly complete?: boolean;
}

export function msDeployStatusDeserializer(item: any): MSDeployStatus {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _msDeployStatusPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** MSDeployStatus resource specific properties */
export interface MSDeployStatusProperties {
  /** Username of deployer */
  readonly deployer?: string;
  /** Provisioning state */
  readonly provisioningState?: MSDeployProvisioningState;
  /** Start time of deploy operation */
  readonly startTime?: Date;
  /** End time of deploy operation */
  readonly endTime?: Date;
  /** Whether the deployment operation has completed */
  readonly complete?: boolean;
}

export function msDeployStatusPropertiesDeserializer(item: any): MSDeployStatusProperties {
  return {
    deployer: item["deployer"],
    provisioningState: item["provisioningState"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    complete: item["complete"],
  };
}

/** Provisioning state */
export type MSDeployProvisioningState =
  | "accepted"
  | "running"
  | "succeeded"
  | "failed"
  | "canceled";

/** MSDeploy ARM PUT information */
export interface MSDeploy extends ProxyOnlyResource {
  /** Package URI */
  packageUri?: string;
  /** SQL Connection String */
  connectionString?: string;
  /** Database Type */
  dbType?: string;
  /** URI of MSDeploy Parameters file. Must not be set if SetParameters is used. */
  setParametersXmlFileUri?: string;
  /** MSDeploy Parameters. Must not be set if SetParametersXmlFileUri is used. */
  setParameters?: Record<string, string>;
  /**
   * Controls whether the MSDeploy operation skips the App_Data directory.
   * If set to <code>true</code>, the existing App_Data directory on the destination
   * will not be deleted, and any App_Data directory in the source will be ignored.
   * Setting is <code>false</code> by default.
   */
  skipAppData?: boolean;
  /**
   * Sets the AppOffline rule while the MSDeploy operation executes.
   * Setting is <code>false</code> by default.
   */
  appOffline?: boolean;
  /** List of Add-On packages. Add-On packages implicitly enable the Do Not Delete MSDeploy rule. */
  addOnPackages?: MSDeployCore[];
}

export function msDeploySerializer(item: MSDeploy): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "packageUri",
      "connectionString",
      "dbType",
      "setParametersXmlFileUri",
      "setParameters",
      "skipAppData",
      "appOffline",
      "addOnPackages",
    ])
      ? undefined
      : _msDeployPropertiesSerializer(item),
  };
}

/** MSDeploy ARM PUT information properties */
export interface MSDeployProperties extends MSDeployCore {
  /** List of Add-On packages. Add-On packages implicitly enable the Do Not Delete MSDeploy rule. */
  addOnPackages?: MSDeployCore[];
}

export function msDeployPropertiesSerializer(item: MSDeployProperties): any {
  return {
    packageUri: item["packageUri"],
    connectionString: item["connectionString"],
    dbType: item["dbType"],
    setParametersXmlFileUri: item["setParametersXmlFileUri"],
    setParameters: item["setParameters"],
    skipAppData: item["skipAppData"],
    appOffline: item["appOffline"],
    addOnPackages: !item["addOnPackages"]
      ? item["addOnPackages"]
      : msDeployCoreArraySerializer(item["addOnPackages"]),
  };
}

export function msDeployCoreArraySerializer(result: Array<MSDeployCore>): any[] {
  return result.map((item) => {
    return msDeployCoreSerializer(item);
  });
}

/** MSDeploy ARM PUT core information */
export interface MSDeployCore {
  /** Package URI */
  packageUri?: string;
  /** SQL Connection String */
  connectionString?: string;
  /** Database Type */
  dbType?: string;
  /** URI of MSDeploy Parameters file. Must not be set if SetParameters is used. */
  setParametersXmlFileUri?: string;
  /** MSDeploy Parameters. Must not be set if SetParametersXmlFileUri is used. */
  setParameters?: Record<string, string>;
  /**
   * Controls whether the MSDeploy operation skips the App_Data directory.
   * If set to <code>true</code>, the existing App_Data directory on the destination
   * will not be deleted, and any App_Data directory in the source will be ignored.
   * Setting is <code>false</code> by default.
   */
  skipAppData?: boolean;
  /**
   * Sets the AppOffline rule while the MSDeploy operation executes.
   * Setting is <code>false</code> by default.
   */
  appOffline?: boolean;
}

export function msDeployCoreSerializer(item: MSDeployCore): any {
  return {
    packageUri: item["packageUri"],
    connectionString: item["connectionString"],
    dbType: item["dbType"],
    setParametersXmlFileUri: item["setParametersXmlFileUri"],
    setParameters: item["setParameters"],
    skipAppData: item["skipAppData"],
    appOffline: item["appOffline"],
  };
}

/** MSDeploy log */
export interface MSDeployLog extends ProxyOnlyResource {
  /** List of log entry messages */
  readonly entries?: MSDeployLogEntry[];
}

export function msDeployLogDeserializer(item: any): MSDeployLog {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _msDeployLogPropertiesDeserializer(item["properties"])),
  };
}

/** MSDeployLog resource specific properties */
export interface MSDeployLogProperties {
  /** List of log entry messages */
  readonly entries?: MSDeployLogEntry[];
}

export function msDeployLogPropertiesDeserializer(item: any): MSDeployLogProperties {
  return {
    entries: !item["entries"]
      ? item["entries"]
      : msDeployLogEntryArrayDeserializer(item["entries"]),
  };
}

export function msDeployLogEntryArrayDeserializer(result: Array<MSDeployLogEntry>): any[] {
  return result.map((item) => {
    return msDeployLogEntryDeserializer(item);
  });
}

/** MSDeploy log entry */
export interface MSDeployLogEntry {
  /** Timestamp of log entry */
  readonly time?: Date;
  /** Log entry type */
  readonly type?: MSDeployLogEntryType;
  /** Log entry message */
  readonly message?: string;
}

export function msDeployLogEntryDeserializer(item: any): MSDeployLogEntry {
  return {
    time: !item["time"] ? item["time"] : new Date(item["time"]),
    type: item["type"],
    message: item["message"],
  };
}

/** Log entry type */
export type MSDeployLogEntryType = "Message" | "Warning" | "Error";

/** Function information. */
export interface FunctionEnvelope extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Function App ID. */
  functionAppId?: string;
  /** Script root path URI. */
  scriptRootPathHref?: string;
  /** Script URI. */
  scriptHref?: string;
  /** Config URI. */
  configHref?: string;
  /** Test data URI. */
  testDataHref?: string;
  /** Secrets file URI. */
  secretsFileHref?: string;
  /** Function URI. */
  href?: string;
  /** Config information. */
  config?: any;
  /** File list. */
  files?: Record<string, string>;
  /** Test data used when testing via the Azure Portal. */
  testData?: string;
  /** The invocation URL */
  invokeUrlTemplate?: string;
  /** The function language */
  language?: string;
  /** Gets or sets a value indicating whether the function is disabled */
  isDisabled?: boolean;
}

export function functionEnvelopeSerializer(item: FunctionEnvelope): any {
  return {
    properties: areAllPropsUndefined(item, [
      "functionAppId",
      "scriptRootPathHref",
      "scriptHref",
      "configHref",
      "testDataHref",
      "secretsFileHref",
      "href",
      "config",
      "files",
      "testData",
      "invokeUrlTemplate",
      "language",
      "isDisabled",
    ])
      ? undefined
      : _functionEnvelopePropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function functionEnvelopeDeserializer(item: any): FunctionEnvelope {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _functionEnvelopePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** FunctionEnvelope resource specific properties */
export interface FunctionEnvelopeProperties {
  /** Function App ID. */
  functionAppId?: string;
  /** Script root path URI. */
  scriptRootPathHref?: string;
  /** Script URI. */
  scriptHref?: string;
  /** Config URI. */
  configHref?: string;
  /** Test data URI. */
  testDataHref?: string;
  /** Secrets file URI. */
  secretsFileHref?: string;
  /** Function URI. */
  href?: string;
  /** Config information. */
  config?: any;
  /** File list. */
  files?: Record<string, string>;
  /** Test data used when testing via the Azure Portal. */
  testData?: string;
  /** The invocation URL */
  invokeUrlTemplate?: string;
  /** The function language */
  language?: string;
  /** Gets or sets a value indicating whether the function is disabled */
  isDisabled?: boolean;
}

export function functionEnvelopePropertiesSerializer(item: FunctionEnvelopeProperties): any {
  return {
    function_app_id: item["functionAppId"],
    script_root_path_href: item["scriptRootPathHref"],
    script_href: item["scriptHref"],
    config_href: item["configHref"],
    test_data_href: item["testDataHref"],
    secrets_file_href: item["secretsFileHref"],
    href: item["href"],
    config: item["config"],
    files: item["files"],
    test_data: item["testData"],
    invoke_url_template: item["invokeUrlTemplate"],
    language: item["language"],
    isDisabled: item["isDisabled"],
  };
}

export function functionEnvelopePropertiesDeserializer(item: any): FunctionEnvelopeProperties {
  return {
    functionAppId: item["function_app_id"],
    scriptRootPathHref: item["script_root_path_href"],
    scriptHref: item["script_href"],
    configHref: item["config_href"],
    testDataHref: item["test_data_href"],
    secretsFileHref: item["secrets_file_href"],
    href: item["href"],
    config: item["config"],
    files: !item["files"]
      ? item["files"]
      : Object.fromEntries(Object.entries(item["files"]).map(([k, p]: [string, any]) => [k, p])),
    testData: item["test_data"],
    invokeUrlTemplate: item["invoke_url_template"],
    language: item["language"],
    isDisabled: item["isDisabled"],
  };
}

/** Collection of Kudu function information elements. */
export interface _FunctionEnvelopeCollection {
  /** The FunctionEnvelope items on this page */
  value: FunctionEnvelope[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _functionEnvelopeCollectionDeserializer(item: any): _FunctionEnvelopeCollection {
  return {
    value: functionEnvelopeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function functionEnvelopeArraySerializer(result: Array<FunctionEnvelope>): any[] {
  return result.map((item) => {
    return functionEnvelopeSerializer(item);
  });
}

export function functionEnvelopeArrayDeserializer(result: Array<FunctionEnvelope>): any[] {
  return result.map((item) => {
    return functionEnvelopeDeserializer(item);
  });
}

/** A hostname binding object. */
export interface HostNameBinding extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** App Service app name. */
  siteName?: string;
  /** Fully qualified ARM domain resource URI. */
  domainId?: string;
  /** Azure resource name. */
  azureResourceName?: string;
  /** Azure resource type. */
  azureResourceType?: AzureResourceType;
  /** Custom DNS record type. */
  customHostNameDnsRecordType?: CustomHostNameDnsRecordType;
  /** Hostname type. */
  hostNameType?: HostNameType;
  /** SSL type */
  sslState?: SslState;
  /** SSL certificate thumbprint */
  thumbprint?: string;
  /** Virtual IP address assigned to the hostname if IP based SSL is enabled. */
  readonly virtualIP?: string;
}

export function hostNameBindingSerializer(item: HostNameBinding): any {
  return {
    properties: areAllPropsUndefined(item, [
      "siteName",
      "domainId",
      "azureResourceName",
      "azureResourceType",
      "customHostNameDnsRecordType",
      "hostNameType",
      "sslState",
      "thumbprint",
    ])
      ? undefined
      : _hostNameBindingPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function hostNameBindingDeserializer(item: any): HostNameBinding {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _hostNameBindingPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** HostNameBinding resource specific properties */
export interface HostNameBindingProperties {
  /** App Service app name. */
  siteName?: string;
  /** Fully qualified ARM domain resource URI. */
  domainId?: string;
  /** Azure resource name. */
  azureResourceName?: string;
  /** Azure resource type. */
  azureResourceType?: AzureResourceType;
  /** Custom DNS record type. */
  customHostNameDnsRecordType?: CustomHostNameDnsRecordType;
  /** Hostname type. */
  hostNameType?: HostNameType;
  /** SSL type */
  sslState?: SslState;
  /** SSL certificate thumbprint */
  thumbprint?: string;
  /** Virtual IP address assigned to the hostname if IP based SSL is enabled. */
  readonly virtualIP?: string;
}

export function hostNameBindingPropertiesSerializer(item: HostNameBindingProperties): any {
  return {
    siteName: item["siteName"],
    domainId: item["domainId"],
    azureResourceName: item["azureResourceName"],
    azureResourceType: item["azureResourceType"],
    customHostNameDnsRecordType: item["customHostNameDnsRecordType"],
    hostNameType: item["hostNameType"],
    sslState: item["sslState"],
    thumbprint: item["thumbprint"],
  };
}

export function hostNameBindingPropertiesDeserializer(item: any): HostNameBindingProperties {
  return {
    siteName: item["siteName"],
    domainId: item["domainId"],
    azureResourceName: item["azureResourceName"],
    azureResourceType: item["azureResourceType"],
    customHostNameDnsRecordType: item["customHostNameDnsRecordType"],
    hostNameType: item["hostNameType"],
    sslState: item["sslState"],
    thumbprint: item["thumbprint"],
    virtualIP: item["virtualIP"],
  };
}

/** Azure resource type. */
export type AzureResourceType = "Website" | "TrafficManager";
/** Custom DNS record type. */
export type CustomHostNameDnsRecordType = "CName" | "A";
/** Hostname type. */
export type HostNameType = "Verified" | "Managed";

/** Collection of hostname bindings. */
export interface _HostNameBindingCollection {
  /** The HostNameBinding items on this page */
  value: HostNameBinding[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _hostNameBindingCollectionDeserializer(item: any): _HostNameBindingCollection {
  return {
    value: hostNameBindingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function hostNameBindingArraySerializer(result: Array<HostNameBinding>): any[] {
  return result.map((item) => {
    return hostNameBindingSerializer(item);
  });
}

export function hostNameBindingArrayDeserializer(result: Array<HostNameBinding>): any[] {
  return result.map((item) => {
    return hostNameBindingDeserializer(item);
  });
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface WebSiteInstanceStatus extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  state?: SiteRuntimeState;
  /** Link to the GetStatusApi in Kudu */
  statusUrl?: string;
  /** Link to the Diagnose and Solve Portal */
  detectorUrl?: string;
  /** Link to the console to web app instance */
  consoleUrl?: string;
  /** Link to the console to web app instance */
  healthCheckUrl?: string;
  /** Dictionary of <ContainerInfo> */
  containers?: Record<string, ContainerInfo>;
  /** The physical zone that the instance is in */
  physicalZone?: string;
}

export function webSiteInstanceStatusDeserializer(item: any): WebSiteInstanceStatus {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _webSiteInstanceStatusPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** WebSiteInstanceStatus resource specific properties */
export interface WebSiteInstanceStatusProperties {
  state?: SiteRuntimeState;
  /** Link to the GetStatusApi in Kudu */
  statusUrl?: string;
  /** Link to the Diagnose and Solve Portal */
  detectorUrl?: string;
  /** Link to the console to web app instance */
  consoleUrl?: string;
  /** Link to the console to web app instance */
  healthCheckUrl?: string;
  /** Dictionary of <ContainerInfo> */
  containers?: Record<string, ContainerInfo>;
  /** The physical zone that the instance is in */
  physicalZone?: string;
}

export function webSiteInstanceStatusPropertiesDeserializer(
  item: any,
): WebSiteInstanceStatusProperties {
  return {
    state: item["state"],
    statusUrl: item["statusUrl"],
    detectorUrl: item["detectorUrl"],
    consoleUrl: item["consoleUrl"],
    healthCheckUrl: item["healthCheckUrl"],
    containers: !item["containers"]
      ? item["containers"]
      : containerInfoRecordDeserializer(item["containers"]),
    physicalZone: item["physicalZone"],
  };
}

/** Type of SiteRuntimeState */
export type SiteRuntimeState = "READY" | "STOPPED" | "UNKNOWN";

export function containerInfoRecordDeserializer(
  item: Record<string, any>,
): Record<string, ContainerInfo> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : containerInfoDeserializer(item[key]);
  });
  return result;
}

/** model interface ContainerInfo */
export interface ContainerInfo {
  currentTimeStamp?: Date;
  previousTimeStamp?: Date;
  currentCpuStats?: ContainerCpuStatistics;
  previousCpuStats?: ContainerCpuStatistics;
  memoryStats?: ContainerMemoryStatistics;
  name?: string;
  id?: string;
  eth0?: ContainerNetworkInterfaceStatistics;
}

export function containerInfoDeserializer(item: any): ContainerInfo {
  return {
    currentTimeStamp: !item["currentTimeStamp"]
      ? item["currentTimeStamp"]
      : new Date(item["currentTimeStamp"]),
    previousTimeStamp: !item["previousTimeStamp"]
      ? item["previousTimeStamp"]
      : new Date(item["previousTimeStamp"]),
    currentCpuStats: !item["currentCpuStats"]
      ? item["currentCpuStats"]
      : containerCpuStatisticsDeserializer(item["currentCpuStats"]),
    previousCpuStats: !item["previousCpuStats"]
      ? item["previousCpuStats"]
      : containerCpuStatisticsDeserializer(item["previousCpuStats"]),
    memoryStats: !item["memoryStats"]
      ? item["memoryStats"]
      : containerMemoryStatisticsDeserializer(item["memoryStats"]),
    name: item["name"],
    id: item["id"],
    eth0: !item["eth0"]
      ? item["eth0"]
      : containerNetworkInterfaceStatisticsDeserializer(item["eth0"]),
  };
}

/** model interface ContainerCpuStatistics */
export interface ContainerCpuStatistics {
  cpuUsage?: ContainerCpuUsage;
  systemCpuUsage?: number;
  onlineCpuCount?: number;
  throttlingData?: ContainerThrottlingData;
}

export function containerCpuStatisticsDeserializer(item: any): ContainerCpuStatistics {
  return {
    cpuUsage: !item["cpuUsage"]
      ? item["cpuUsage"]
      : containerCpuUsageDeserializer(item["cpuUsage"]),
    systemCpuUsage: item["systemCpuUsage"],
    onlineCpuCount: item["onlineCpuCount"],
    throttlingData: !item["throttlingData"]
      ? item["throttlingData"]
      : containerThrottlingDataDeserializer(item["throttlingData"]),
  };
}

/** model interface ContainerCpuUsage */
export interface ContainerCpuUsage {
  totalUsage?: number;
  perCpuUsage?: number[];
  kernelModeUsage?: number;
  userModeUsage?: number;
}

export function containerCpuUsageDeserializer(item: any): ContainerCpuUsage {
  return {
    totalUsage: item["totalUsage"],
    perCpuUsage: !item["perCpuUsage"]
      ? item["perCpuUsage"]
      : item["perCpuUsage"].map((p: any) => {
          return p;
        }),
    kernelModeUsage: item["kernelModeUsage"],
    userModeUsage: item["userModeUsage"],
  };
}

/** model interface ContainerThrottlingData */
export interface ContainerThrottlingData {
  periods?: number;
  throttledPeriods?: number;
  throttledTime?: number;
}

export function containerThrottlingDataDeserializer(item: any): ContainerThrottlingData {
  return {
    periods: item["periods"],
    throttledPeriods: item["throttledPeriods"],
    throttledTime: item["throttledTime"],
  };
}

/** model interface ContainerMemoryStatistics */
export interface ContainerMemoryStatistics {
  usage?: number;
  maxUsage?: number;
  limit?: number;
}

export function containerMemoryStatisticsDeserializer(item: any): ContainerMemoryStatistics {
  return {
    usage: item["usage"],
    maxUsage: item["maxUsage"],
    limit: item["limit"],
  };
}

/** model interface ContainerNetworkInterfaceStatistics */
export interface ContainerNetworkInterfaceStatistics {
  rxBytes?: number;
  rxPackets?: number;
  rxErrors?: number;
  rxDropped?: number;
  txBytes?: number;
  txPackets?: number;
  txErrors?: number;
  txDropped?: number;
}

export function containerNetworkInterfaceStatisticsDeserializer(
  item: any,
): ContainerNetworkInterfaceStatistics {
  return {
    rxBytes: item["rxBytes"],
    rxPackets: item["rxPackets"],
    rxErrors: item["rxErrors"],
    rxDropped: item["rxDropped"],
    txBytes: item["txBytes"],
    txPackets: item["txPackets"],
    txErrors: item["txErrors"],
    txDropped: item["txDropped"],
  };
}

/** Collection of app instances. */
export interface _WebAppInstanceStatusCollection {
  /** The WebSiteInstanceStatus items on this page */
  value: WebSiteInstanceStatus[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _webAppInstanceStatusCollectionDeserializer(
  item: any,
): _WebAppInstanceStatusCollection {
  return {
    value: webSiteInstanceStatusArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function webSiteInstanceStatusArrayDeserializer(
  result: Array<WebSiteInstanceStatus>,
): any[] {
  return result.map((item) => {
    return webSiteInstanceStatusDeserializer(item);
  });
}

/** Process Information. */
export interface ProcessInfo extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** ARM Identifier for deployment. */
  readonly identifier?: number;
  /** Deployment name. */
  deploymentName?: string;
  /** HRef URI. */
  href?: string;
  /** Minidump URI. */
  minidump?: string;
  /** Is profile running? */
  isProfileRunning?: boolean;
  /** Is the IIS Profile running? */
  isIisProfileRunning?: boolean;
  /** IIS Profile timeout (seconds). */
  iisProfileTimeoutInSeconds?: number;
  /** Parent process. */
  parent?: string;
  /** Child process list. */
  children?: string[];
  /** Thread list. */
  threads?: ProcessThreadInfo[];
  /** List of open files. */
  openFileHandles?: string[];
  /** List of modules. */
  modules?: ProcessModuleInfo[];
  /** File name of this process. */
  fileName?: string;
  /** Command line. */
  commandLine?: string;
  /** User name. */
  userName?: string;
  /** Handle count. */
  handleCount?: number;
  /** Module count. */
  moduleCount?: number;
  /** Thread count. */
  threadCount?: number;
  /** Start time. */
  startTime?: Date;
  /** Total CPU time. */
  totalCpuTime?: string;
  /** User CPU time. */
  userCpuTime?: string;
  /** Privileged CPU time. */
  privilegedCpuTime?: string;
  /** Working set. */
  workingSet?: number;
  /** Peak working set. */
  peakWorkingSet?: number;
  /** Private memory size. */
  privateMemory?: number;
  /** Virtual memory size. */
  virtualMemory?: number;
  /** Peak virtual memory usage. */
  peakVirtualMemory?: number;
  /** Paged system memory. */
  pagedSystemMemory?: number;
  /** Non-paged system memory. */
  nonPagedSystemMemory?: number;
  /** Paged memory. */
  pagedMemory?: number;
  /** Peak paged memory. */
  peakPagedMemory?: number;
  /** Time stamp. */
  timeStamp?: Date;
  /** List of environment variables. */
  environmentVariables?: Record<string, string>;
  /** Is this the SCM site? */
  isScmSite?: boolean;
  /** Is this a Web Job? */
  isWebjob?: boolean;
  /** Description of process. */
  description?: string;
}

export function processInfoDeserializer(item: any): ProcessInfo {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _processInfoPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** ProcessInfo resource specific properties */
export interface ProcessInfoProperties {
  /** ARM Identifier for deployment. */
  readonly identifier?: number;
  /** Deployment name. */
  deploymentName?: string;
  /** HRef URI. */
  href?: string;
  /** Minidump URI. */
  minidump?: string;
  /** Is profile running? */
  isProfileRunning?: boolean;
  /** Is the IIS Profile running? */
  isIisProfileRunning?: boolean;
  /** IIS Profile timeout (seconds). */
  iisProfileTimeoutInSeconds?: number;
  /** Parent process. */
  parent?: string;
  /** Child process list. */
  children?: string[];
  /** Thread list. */
  threads?: ProcessThreadInfo[];
  /** List of open files. */
  openFileHandles?: string[];
  /** List of modules. */
  modules?: ProcessModuleInfo[];
  /** File name of this process. */
  fileName?: string;
  /** Command line. */
  commandLine?: string;
  /** User name. */
  userName?: string;
  /** Handle count. */
  handleCount?: number;
  /** Module count. */
  moduleCount?: number;
  /** Thread count. */
  threadCount?: number;
  /** Start time. */
  startTime?: Date;
  /** Total CPU time. */
  totalCpuTime?: string;
  /** User CPU time. */
  userCpuTime?: string;
  /** Privileged CPU time. */
  privilegedCpuTime?: string;
  /** Working set. */
  workingSet?: number;
  /** Peak working set. */
  peakWorkingSet?: number;
  /** Private memory size. */
  privateMemory?: number;
  /** Virtual memory size. */
  virtualMemory?: number;
  /** Peak virtual memory usage. */
  peakVirtualMemory?: number;
  /** Paged system memory. */
  pagedSystemMemory?: number;
  /** Non-paged system memory. */
  nonPagedSystemMemory?: number;
  /** Paged memory. */
  pagedMemory?: number;
  /** Peak paged memory. */
  peakPagedMemory?: number;
  /** Time stamp. */
  timeStamp?: Date;
  /** List of environment variables. */
  environmentVariables?: Record<string, string>;
  /** Is this the SCM site? */
  isScmSite?: boolean;
  /** Is this a Web Job? */
  isWebjob?: boolean;
  /** Description of process. */
  description?: string;
}

export function processInfoPropertiesDeserializer(item: any): ProcessInfoProperties {
  return {
    identifier: item["identifier"],
    deploymentName: item["deployment_name"],
    href: item["href"],
    minidump: item["minidump"],
    isProfileRunning: item["is_profile_running"],
    isIisProfileRunning: item["is_iis_profile_running"],
    iisProfileTimeoutInSeconds: item["iis_profile_timeout_in_seconds"],
    parent: item["parent"],
    children: !item["children"]
      ? item["children"]
      : item["children"].map((p: any) => {
          return p;
        }),
    threads: !item["threads"]
      ? item["threads"]
      : processThreadInfoArrayDeserializer(item["threads"]),
    openFileHandles: !item["open_file_handles"]
      ? item["open_file_handles"]
      : item["open_file_handles"].map((p: any) => {
          return p;
        }),
    modules: !item["modules"]
      ? item["modules"]
      : processModuleInfoArrayDeserializer(item["modules"]),
    fileName: item["file_name"],
    commandLine: item["command_line"],
    userName: item["user_name"],
    handleCount: item["handle_count"],
    moduleCount: item["module_count"],
    threadCount: item["thread_count"],
    startTime: !item["start_time"] ? item["start_time"] : new Date(item["start_time"]),
    totalCpuTime: item["total_cpu_time"],
    userCpuTime: item["user_cpu_time"],
    privilegedCpuTime: item["privileged_cpu_time"],
    workingSet: item["working_set"],
    peakWorkingSet: item["peak_working_set"],
    privateMemory: item["private_memory"],
    virtualMemory: item["virtual_memory"],
    peakVirtualMemory: item["peak_virtual_memory"],
    pagedSystemMemory: item["paged_system_memory"],
    nonPagedSystemMemory: item["non_paged_system_memory"],
    pagedMemory: item["paged_memory"],
    peakPagedMemory: item["peak_paged_memory"],
    timeStamp: !item["time_stamp"] ? item["time_stamp"] : new Date(item["time_stamp"]),
    environmentVariables: !item["environment_variables"]
      ? item["environment_variables"]
      : Object.fromEntries(
          Object.entries(item["environment_variables"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    isScmSite: item["is_scm_site"],
    isWebjob: item["is_webjob"],
    description: item["description"],
  };
}

export function processThreadInfoArrayDeserializer(result: Array<ProcessThreadInfo>): any[] {
  return result.map((item) => {
    return processThreadInfoDeserializer(item);
  });
}

/** Process Thread Information. */
export interface ProcessThreadInfo extends ProxyOnlyResource {
  /** Site extension ID. */
  readonly identifier?: number;
  /** HRef URI. */
  href?: string;
  /** Process URI. */
  process?: string;
  /** Start address. */
  startAddress?: string;
  /** Current thread priority. */
  currentPriority?: number;
  /** Thread priority level. */
  priorityLevel?: string;
  /** Base priority. */
  basePriority?: number;
  /** Start time. */
  startTime?: Date;
  /** Total processor time. */
  totalProcessorTime?: string;
  /** User processor time. */
  userProcessorTime?: string;
  /** Thread state. */
  state?: string;
  /** Wait reason. */
  waitReason?: string;
}

export function processThreadInfoDeserializer(item: any): ProcessThreadInfo {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _processThreadInfoPropertiesDeserializer(item["properties"])),
  };
}

/** ProcessThreadInfo resource specific properties */
export interface ProcessThreadInfoProperties {
  /** Site extension ID. */
  readonly identifier?: number;
  /** HRef URI. */
  href?: string;
  /** Process URI. */
  process?: string;
  /** Start address. */
  startAddress?: string;
  /** Current thread priority. */
  currentPriority?: number;
  /** Thread priority level. */
  priorityLevel?: string;
  /** Base priority. */
  basePriority?: number;
  /** Start time. */
  startTime?: Date;
  /** Total processor time. */
  totalProcessorTime?: string;
  /** User processor time. */
  userProcessorTime?: string;
  /** Thread state. */
  state?: string;
  /** Wait reason. */
  waitReason?: string;
}

export function processThreadInfoPropertiesDeserializer(item: any): ProcessThreadInfoProperties {
  return {
    identifier: item["identifier"],
    href: item["href"],
    process: item["process"],
    startAddress: item["start_address"],
    currentPriority: item["current_priority"],
    priorityLevel: item["priority_level"],
    basePriority: item["base_priority"],
    startTime: !item["start_time"] ? item["start_time"] : new Date(item["start_time"]),
    totalProcessorTime: item["total_processor_time"],
    userProcessorTime: item["user_processor_time"],
    state: item["state"],
    waitReason: item["wait_reason"],
  };
}

export function processModuleInfoArrayDeserializer(result: Array<ProcessModuleInfo>): any[] {
  return result.map((item) => {
    return processModuleInfoDeserializer(item);
  });
}

/** Process Module Information. */
export interface ProcessModuleInfo extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Base address. Used as module identifier in ARM resource URI. */
  baseAddress?: string;
  /** File name. */
  fileName?: string;
  /** HRef URI. */
  href?: string;
  /** File path. */
  filePath?: string;
  /** Module memory size. */
  moduleMemorySize?: number;
  /** File version. */
  fileVersion?: string;
  /** File description. */
  fileDescription?: string;
  /** Product name. */
  product?: string;
  /** Product version. */
  productVersion?: string;
  /** Is debug? */
  isDebug?: boolean;
  /** Module language (locale). */
  language?: string;
}

export function processModuleInfoDeserializer(item: any): ProcessModuleInfo {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _processModuleInfoPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** ProcessModuleInfo resource specific properties */
export interface ProcessModuleInfoProperties {
  /** Base address. Used as module identifier in ARM resource URI. */
  baseAddress?: string;
  /** File name. */
  fileName?: string;
  /** HRef URI. */
  href?: string;
  /** File path. */
  filePath?: string;
  /** Module memory size. */
  moduleMemorySize?: number;
  /** File version. */
  fileVersion?: string;
  /** File description. */
  fileDescription?: string;
  /** Product name. */
  product?: string;
  /** Product version. */
  productVersion?: string;
  /** Is debug? */
  isDebug?: boolean;
  /** Module language (locale). */
  language?: string;
}

export function processModuleInfoPropertiesDeserializer(item: any): ProcessModuleInfoProperties {
  return {
    baseAddress: item["base_address"],
    fileName: item["file_name"],
    href: item["href"],
    filePath: item["file_path"],
    moduleMemorySize: item["module_memory_size"],
    fileVersion: item["file_version"],
    fileDescription: item["file_description"],
    product: item["product"],
    productVersion: item["product_version"],
    isDebug: item["is_debug"],
    language: item["language"],
  };
}

/** Collection of Kudu process information elements. */
export interface _ProcessInfoCollection {
  /** The ProcessInfo items on this page */
  value: ProcessInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _processInfoCollectionDeserializer(item: any): _ProcessInfoCollection {
  return {
    value: processInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function processInfoArrayDeserializer(result: Array<ProcessInfo>): any[] {
  return result.map((item) => {
    return processInfoDeserializer(item);
  });
}

/** Collection of Kudu thread information elements. */
export interface _ProcessThreadInfoCollection {
  /** The ProcessThreadInfo items on this page */
  value: ProcessThreadInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _processThreadInfoCollectionDeserializer(item: any): _ProcessThreadInfoCollection {
  return {
    value: processThreadInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Collection of Kudu thread information elements. */
export interface _ProcessModuleInfoCollection {
  /** The ProcessModuleInfo items on this page */
  value: ProcessModuleInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _processModuleInfoCollectionDeserializer(item: any): _ProcessModuleInfoCollection {
  return {
    value: processModuleInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** MySQL migration status. */
export interface MigrateMySqlStatus extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Status of the migration task. */
  readonly migrationOperationStatus?: OperationStatus;
  /** Operation ID for the migration task. */
  readonly operationId?: string;
  /** True if the web app has in app MySql enabled */
  readonly localMySqlEnabled?: boolean;
}

export function migrateMySqlStatusDeserializer(item: any): MigrateMySqlStatus {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _migrateMySqlStatusPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** MigrateMySqlStatus resource specific properties */
export interface MigrateMySqlStatusProperties {
  /** Status of the migration task. */
  readonly migrationOperationStatus?: OperationStatus;
  /** Operation ID for the migration task. */
  readonly operationId?: string;
  /** True if the web app has in app MySql enabled */
  readonly localMySqlEnabled?: boolean;
}

export function migrateMySqlStatusPropertiesDeserializer(item: any): MigrateMySqlStatusProperties {
  return {
    migrationOperationStatus: item["migrationOperationStatus"],
    operationId: item["operationId"],
    localMySqlEnabled: item["localMySqlEnabled"],
  };
}

/** Swift Virtual Network Contract. This is used to enable the new Swift way of doing virtual network integration. */
export interface SwiftVirtualNetwork extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** The Virtual Network subnet's resource ID. This is the subnet that this Web App will join. This subnet must have a delegation to Microsoft.Web/serverFarms defined first. */
  subnetResourceId?: string;
  /** A flag that specifies if the scale unit this Web App is on supports Swift integration. */
  swiftSupported?: boolean;
}

export function swiftVirtualNetworkSerializer(item: SwiftVirtualNetwork): any {
  return {
    properties: areAllPropsUndefined(item, ["subnetResourceId", "swiftSupported"])
      ? undefined
      : _swiftVirtualNetworkPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function swiftVirtualNetworkDeserializer(item: any): SwiftVirtualNetwork {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _swiftVirtualNetworkPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** SwiftVirtualNetwork resource specific properties */
export interface SwiftVirtualNetworkProperties {
  /** The Virtual Network subnet's resource ID. This is the subnet that this Web App will join. This subnet must have a delegation to Microsoft.Web/serverFarms defined first. */
  subnetResourceId?: string;
  /** A flag that specifies if the scale unit this Web App is on supports Swift integration. */
  swiftSupported?: boolean;
}

export function swiftVirtualNetworkPropertiesSerializer(item: SwiftVirtualNetworkProperties): any {
  return { subnetResourceId: item["subnetResourceId"], swiftSupported: item["swiftSupported"] };
}

export function swiftVirtualNetworkPropertiesDeserializer(
  item: any,
): SwiftVirtualNetworkProperties {
  return {
    subnetResourceId: item["subnetResourceId"],
    swiftSupported: item["swiftSupported"],
  };
}

/** Full view of network features for an app (presently VNET integration and Hybrid Connections). */
export interface NetworkFeatures extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** The Virtual Network name. */
  readonly virtualNetworkName?: string;
  /** The Virtual Network summary view. */
  readonly virtualNetworkConnection?: VnetInfo;
  /** The Hybrid Connections summary view. */
  readonly hybridConnections?: RelayServiceConnectionEntity[];
  /** The Hybrid Connection V2 (Service Bus) view. */
  readonly hybridConnectionsV2?: HybridConnection[];
}

export function networkFeaturesDeserializer(item: any): NetworkFeatures {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _networkFeaturesPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** NetworkFeatures resource specific properties */
export interface NetworkFeaturesProperties {
  /** The Virtual Network name. */
  readonly virtualNetworkName?: string;
  /** The Virtual Network summary view. */
  readonly virtualNetworkConnection?: VnetInfo;
  /** The Hybrid Connections summary view. */
  readonly hybridConnections?: RelayServiceConnectionEntity[];
  /** The Hybrid Connection V2 (Service Bus) view. */
  readonly hybridConnectionsV2?: HybridConnection[];
}

export function networkFeaturesPropertiesDeserializer(item: any): NetworkFeaturesProperties {
  return {
    virtualNetworkName: item["virtualNetworkName"],
    virtualNetworkConnection: !item["virtualNetworkConnection"]
      ? item["virtualNetworkConnection"]
      : vnetInfoDeserializer(item["virtualNetworkConnection"]),
    hybridConnections: !item["hybridConnections"]
      ? item["hybridConnections"]
      : relayServiceConnectionEntityArrayDeserializer(item["hybridConnections"]),
    hybridConnectionsV2: !item["hybridConnectionsV2"]
      ? item["hybridConnectionsV2"]
      : hybridConnectionArrayDeserializer(item["hybridConnectionsV2"]),
  };
}

export function relayServiceConnectionEntityArraySerializer(
  result: Array<RelayServiceConnectionEntity>,
): any[] {
  return result.map((item) => {
    return relayServiceConnectionEntitySerializer(item);
  });
}

export function relayServiceConnectionEntityArrayDeserializer(
  result: Array<RelayServiceConnectionEntity>,
): any[] {
  return result.map((item) => {
    return relayServiceConnectionEntityDeserializer(item);
  });
}

export function hybridConnectionArraySerializer(result: Array<HybridConnection>): any[] {
  return result.map((item) => {
    return hybridConnectionSerializer(item);
  });
}

export function hybridConnectionArrayDeserializer(result: Array<HybridConnection>): any[] {
  return result.map((item) => {
    return hybridConnectionDeserializer(item);
  });
}

/** ARM resource for a PremierAddOn. */
export interface PremierAddOnPatchResource extends ProxyOnlyResource {
  /** Premier add on SKU. */
  sku?: string;
  /** Premier add on Product. */
  product?: string;
  /** Premier add on Vendor. */
  vendor?: string;
  /** Premier add on Marketplace publisher. */
  marketplacePublisher?: string;
  /** Premier add on Marketplace offer. */
  marketplaceOffer?: string;
}

export function premierAddOnPatchResourceSerializer(item: PremierAddOnPatchResource): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "sku",
      "product",
      "vendor",
      "marketplacePublisher",
      "marketplaceOffer",
    ])
      ? undefined
      : _premierAddOnPatchResourcePropertiesSerializer(item),
  };
}

/** PremierAddOnPatchResource resource specific properties */
export interface PremierAddOnPatchResourceProperties {
  /** Premier add on SKU. */
  sku?: string;
  /** Premier add on Product. */
  product?: string;
  /** Premier add on Vendor. */
  vendor?: string;
  /** Premier add on Marketplace publisher. */
  marketplacePublisher?: string;
  /** Premier add on Marketplace offer. */
  marketplaceOffer?: string;
}

export function premierAddOnPatchResourcePropertiesSerializer(
  item: PremierAddOnPatchResourceProperties,
): any {
  return {
    sku: item["sku"],
    product: item["product"],
    vendor: item["vendor"],
    marketplacePublisher: item["marketplacePublisher"],
    marketplaceOffer: item["marketplaceOffer"],
  };
}

/** Description of the parameters of Private Access for a Web Site. */
export interface PrivateAccess extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Whether private access is enabled or not. */
  enabled?: boolean;
  /** The Virtual Networks (and subnets) allowed to access the site privately. */
  virtualNetworks?: PrivateAccessVirtualNetwork[];
}

export function privateAccessSerializer(item: PrivateAccess): any {
  return {
    properties: areAllPropsUndefined(item, ["enabled", "virtualNetworks"])
      ? undefined
      : _privateAccessPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function privateAccessDeserializer(item: any): PrivateAccess {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateAccessPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** PrivateAccess resource specific properties */
export interface PrivateAccessProperties {
  /** Whether private access is enabled or not. */
  enabled?: boolean;
  /** The Virtual Networks (and subnets) allowed to access the site privately. */
  virtualNetworks?: PrivateAccessVirtualNetwork[];
}

export function privateAccessPropertiesSerializer(item: PrivateAccessProperties): any {
  return {
    enabled: item["enabled"],
    virtualNetworks: !item["virtualNetworks"]
      ? item["virtualNetworks"]
      : privateAccessVirtualNetworkArraySerializer(item["virtualNetworks"]),
  };
}

export function privateAccessPropertiesDeserializer(item: any): PrivateAccessProperties {
  return {
    enabled: item["enabled"],
    virtualNetworks: !item["virtualNetworks"]
      ? item["virtualNetworks"]
      : privateAccessVirtualNetworkArrayDeserializer(item["virtualNetworks"]),
  };
}

export function privateAccessVirtualNetworkArraySerializer(
  result: Array<PrivateAccessVirtualNetwork>,
): any[] {
  return result.map((item) => {
    return privateAccessVirtualNetworkSerializer(item);
  });
}

export function privateAccessVirtualNetworkArrayDeserializer(
  result: Array<PrivateAccessVirtualNetwork>,
): any[] {
  return result.map((item) => {
    return privateAccessVirtualNetworkDeserializer(item);
  });
}

/** Description of a Virtual Network that is useable for private site access. */
export interface PrivateAccessVirtualNetwork {
  /** The name of the Virtual Network. */
  name?: string;
  /** The key (ID) of the Virtual Network. */
  key?: number;
  /** The ARM uri of the Virtual Network */
  resourceId?: string;
  /** A List of subnets that access is allowed to on this Virtual Network. An empty array (but not null) is interpreted to mean that all subnets are allowed within this Virtual Network. */
  subnets?: PrivateAccessSubnet[];
}

export function privateAccessVirtualNetworkSerializer(item: PrivateAccessVirtualNetwork): any {
  return {
    name: item["name"],
    key: item["key"],
    resourceId: item["resourceId"],
    subnets: !item["subnets"]
      ? item["subnets"]
      : privateAccessSubnetArraySerializer(item["subnets"]),
  };
}

export function privateAccessVirtualNetworkDeserializer(item: any): PrivateAccessVirtualNetwork {
  return {
    name: item["name"],
    key: item["key"],
    resourceId: item["resourceId"],
    subnets: !item["subnets"]
      ? item["subnets"]
      : privateAccessSubnetArrayDeserializer(item["subnets"]),
  };
}

export function privateAccessSubnetArraySerializer(result: Array<PrivateAccessSubnet>): any[] {
  return result.map((item) => {
    return privateAccessSubnetSerializer(item);
  });
}

export function privateAccessSubnetArrayDeserializer(result: Array<PrivateAccessSubnet>): any[] {
  return result.map((item) => {
    return privateAccessSubnetDeserializer(item);
  });
}

/** Description of a Virtual Network subnet that is useable for private site access. */
export interface PrivateAccessSubnet {
  /** The name of the subnet. */
  name?: string;
  /** The key (ID) of the subnet. */
  key?: number;
}

export function privateAccessSubnetSerializer(item: PrivateAccessSubnet): any {
  return { name: item["name"], key: item["key"] };
}

export function privateAccessSubnetDeserializer(item: any): PrivateAccessSubnet {
  return {
    name: item["name"],
    key: item["key"],
  };
}

/** Public certificate object */
export interface PublicCertificate extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Public Certificate byte array */
  blob?: Uint8Array;
  /** Public Certificate Location */
  publicCertificateLocation?: PublicCertificateLocation;
  /** Certificate Thumbprint */
  readonly thumbprint?: string;
}

export function publicCertificateSerializer(item: PublicCertificate): any {
  return {
    properties: areAllPropsUndefined(item, ["blob", "publicCertificateLocation"])
      ? undefined
      : _publicCertificatePropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function publicCertificateDeserializer(item: any): PublicCertificate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _publicCertificatePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** PublicCertificate resource specific properties */
export interface PublicCertificateProperties {
  /** Public Certificate byte array */
  blob?: Uint8Array;
  /** Public Certificate Location */
  publicCertificateLocation?: PublicCertificateLocation;
  /** Certificate Thumbprint */
  readonly thumbprint?: string;
}

export function publicCertificatePropertiesSerializer(item: PublicCertificateProperties): any {
  return {
    blob: !item["blob"] ? item["blob"] : uint8ArrayToString(item["blob"], "base64"),
    publicCertificateLocation: item["publicCertificateLocation"],
  };
}

export function publicCertificatePropertiesDeserializer(item: any): PublicCertificateProperties {
  return {
    blob: !item["blob"]
      ? item["blob"]
      : typeof item["blob"] === "string"
        ? stringToUint8Array(item["blob"], "base64")
        : item["blob"],
    publicCertificateLocation: item["publicCertificateLocation"],
    thumbprint: item["thumbprint"],
  };
}

/** Public Certificate Location */
export type PublicCertificateLocation = "CurrentUserMy" | "LocalMachineMy" | "Unknown";

/** Collection of public certificates */
export interface _PublicCertificateCollection {
  /** The PublicCertificate items on this page */
  value: PublicCertificate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _publicCertificateCollectionDeserializer(item: any): _PublicCertificateCollection {
  return {
    value: publicCertificateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function publicCertificateArraySerializer(result: Array<PublicCertificate>): any[] {
  return result.map((item) => {
    return publicCertificateSerializer(item);
  });
}

export function publicCertificateArrayDeserializer(result: Array<PublicCertificate>): any[] {
  return result.map((item) => {
    return publicCertificateDeserializer(item);
  });
}

/** Container of a site */
export interface SiteContainer extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Image Name */
  image?: string;
  /** Target Port */
  targetPort?: string;
  /** <code>true</code> if the container is the main site container; <code>false</code> otherwise. */
  isMain?: boolean;
  /** StartUp Command */
  startUpCommand?: string;
  /** Auth Type */
  authType?: AuthType;
  /** User Name */
  userName?: string;
  /** Password Secret */
  passwordSecret?: string;
  /** UserManagedIdentity ClientId */
  userManagedIdentityClientId?: string;
  /** Created Time */
  readonly createdTime?: Date;
  /** Last Modified Time */
  readonly lastModifiedTime?: Date;
  /** List of volume mounts */
  volumeMounts?: VolumeMount[];
  /** <code>true</code> if all AppSettings and ConnectionStrings have to be passed to the container as environment variables; <code>false</code> otherwise. */
  inheritAppSettingsAndConnectionStrings?: boolean;
  /** List of environment variables */
  environmentVariables?: EnvironmentVariable[];
}

export function siteContainerSerializer(item: SiteContainer): any {
  return {
    properties: areAllPropsUndefined(item, [
      "image",
      "targetPort",
      "isMain",
      "startUpCommand",
      "authType",
      "userName",
      "passwordSecret",
      "userManagedIdentityClientId",
      "volumeMounts",
      "inheritAppSettingsAndConnectionStrings",
      "environmentVariables",
    ])
      ? undefined
      : _siteContainerPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function siteContainerDeserializer(item: any): SiteContainer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _siteContainerPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** SiteContainer resource specific properties */
export interface SiteContainerProperties {
  /** Image Name */
  image: string;
  /** Target Port */
  targetPort?: string;
  /** <code>true</code> if the container is the main site container; <code>false</code> otherwise. */
  isMain: boolean;
  /** StartUp Command */
  startUpCommand?: string;
  /** Auth Type */
  authType?: AuthType;
  /** User Name */
  userName?: string;
  /** Password Secret */
  passwordSecret?: string;
  /** UserManagedIdentity ClientId */
  userManagedIdentityClientId?: string;
  /** Created Time */
  readonly createdTime?: Date;
  /** Last Modified Time */
  readonly lastModifiedTime?: Date;
  /** List of volume mounts */
  volumeMounts?: VolumeMount[];
  /** <code>true</code> if all AppSettings and ConnectionStrings have to be passed to the container as environment variables; <code>false</code> otherwise. */
  inheritAppSettingsAndConnectionStrings?: boolean;
  /** List of environment variables */
  environmentVariables?: EnvironmentVariable[];
}

export function siteContainerPropertiesSerializer(item: SiteContainerProperties): any {
  return {
    image: item["image"],
    targetPort: item["targetPort"],
    isMain: item["isMain"],
    startUpCommand: item["startUpCommand"],
    authType: item["authType"],
    userName: item["userName"],
    passwordSecret: item["passwordSecret"],
    userManagedIdentityClientId: item["userManagedIdentityClientId"],
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArraySerializer(item["volumeMounts"]),
    inheritAppSettingsAndConnectionStrings: item["inheritAppSettingsAndConnectionStrings"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : environmentVariableArraySerializer(item["environmentVariables"]),
  };
}

export function siteContainerPropertiesDeserializer(item: any): SiteContainerProperties {
  return {
    image: item["image"],
    targetPort: item["targetPort"],
    isMain: item["isMain"],
    startUpCommand: item["startUpCommand"],
    authType: item["authType"],
    userName: item["userName"],
    passwordSecret: item["passwordSecret"],
    userManagedIdentityClientId: item["userManagedIdentityClientId"],
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArrayDeserializer(item["volumeMounts"]),
    inheritAppSettingsAndConnectionStrings: item["inheritAppSettingsAndConnectionStrings"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : environmentVariableArrayDeserializer(item["environmentVariables"]),
  };
}

/** Auth Type */
export type AuthType = "Anonymous" | "UserCredentials" | "SystemIdentity" | "UserAssigned";

export function volumeMountArraySerializer(result: Array<VolumeMount>): any[] {
  return result.map((item) => {
    return volumeMountSerializer(item);
  });
}

export function volumeMountArrayDeserializer(result: Array<VolumeMount>): any[] {
  return result.map((item) => {
    return volumeMountDeserializer(item);
  });
}

/** model interface VolumeMount */
export interface VolumeMount {
  /** Sub path in the volume where volume is mounted from. */
  volumeSubPath: string;
  /** Target path on the container where volume is mounted on */
  containerMountPath: string;
  /** Config Data to be mounted on the volume */
  data?: string;
  /** Boolean to specify if the mount is read only on the container */
  readOnly?: boolean;
}

export function volumeMountSerializer(item: VolumeMount): any {
  return {
    volumeSubPath: item["volumeSubPath"],
    containerMountPath: item["containerMountPath"],
    data: item["data"],
    readOnly: item["readOnly"],
  };
}

export function volumeMountDeserializer(item: any): VolumeMount {
  return {
    volumeSubPath: item["volumeSubPath"],
    containerMountPath: item["containerMountPath"],
    data: item["data"],
    readOnly: item["readOnly"],
  };
}

export function environmentVariableArraySerializer(result: Array<EnvironmentVariable>): any[] {
  return result.map((item) => {
    return environmentVariableSerializer(item);
  });
}

export function environmentVariableArrayDeserializer(result: Array<EnvironmentVariable>): any[] {
  return result.map((item) => {
    return environmentVariableDeserializer(item);
  });
}

/** model interface EnvironmentVariable */
export interface EnvironmentVariable {
  /** Environment variable name */
  name: string;
  /** The value of this environment variable must be the name of an AppSetting. The actual value of the environment variable in container will be retrieved from the specified AppSetting at runtime. If the AppSetting is not found, the value will be set to an empty string in the container at runtime. */
  value: string;
}

export function environmentVariableSerializer(item: EnvironmentVariable): any {
  return { name: item["name"], value: item["value"] };
}

export function environmentVariableDeserializer(item: any): EnvironmentVariable {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Collection of site containers */
export interface _SiteContainerCollection {
  /** The SiteContainer items on this page */
  value: SiteContainer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _siteContainerCollectionDeserializer(item: any): _SiteContainerCollection {
  return {
    value: siteContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function siteContainerArraySerializer(result: Array<SiteContainer>): any[] {
  return result.map((item) => {
    return siteContainerSerializer(item);
  });
}

export function siteContainerArrayDeserializer(result: Array<SiteContainer>): any[] {
  return result.map((item) => {
    return siteContainerDeserializer(item);
  });
}

/** Site Extension Information. */
export interface SiteExtensionInfo extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Site extension ID. */
  extensionId?: string;
  title?: string;
  /** Site extension type. */
  extensionType?: SiteExtensionType;
  /** Summary description. */
  summary?: string;
  /** Detailed description. */
  description?: string;
  /** Version information. */
  version?: string;
  /** Extension URL. */
  extensionUrl?: string;
  /** Project URL. */
  projectUrl?: string;
  /** Icon URL. */
  iconUrl?: string;
  /** License URL. */
  licenseUrl?: string;
  /** Feed URL. */
  feedUrl?: string;
  /** List of authors. */
  authors?: string[];
  /** Installer command line parameters. */
  installerCommandLineParams?: string;
  /** Published timestamp. */
  publishedDateTime?: Date;
  /** Count of downloads. */
  downloadCount?: number;
  /** <code>true</code> if the local version is the latest version; <code>false</code> otherwise. */
  localIsLatestVersion?: boolean;
  /** Local path. */
  localPath?: string;
  /** Installed timestamp. */
  installedDateTime?: Date;
  /** Provisioning state. */
  provisioningState?: string;
  /** Site Extension comment. */
  comment?: string;
}

export function siteExtensionInfoDeserializer(item: any): SiteExtensionInfo {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _siteExtensionInfoPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** SiteExtensionInfo resource specific properties */
export interface SiteExtensionInfoProperties {
  /** Site extension ID. */
  extensionId?: string;
  title?: string;
  /** Site extension type. */
  extensionType?: SiteExtensionType;
  /** Summary description. */
  summary?: string;
  /** Detailed description. */
  description?: string;
  /** Version information. */
  version?: string;
  /** Extension URL. */
  extensionUrl?: string;
  /** Project URL. */
  projectUrl?: string;
  /** Icon URL. */
  iconUrl?: string;
  /** License URL. */
  licenseUrl?: string;
  /** Feed URL. */
  feedUrl?: string;
  /** List of authors. */
  authors?: string[];
  /** Installer command line parameters. */
  installerCommandLineParams?: string;
  /** Published timestamp. */
  publishedDateTime?: Date;
  /** Count of downloads. */
  downloadCount?: number;
  /** <code>true</code> if the local version is the latest version; <code>false</code> otherwise. */
  localIsLatestVersion?: boolean;
  /** Local path. */
  localPath?: string;
  /** Installed timestamp. */
  installedDateTime?: Date;
  /** Provisioning state. */
  provisioningState?: string;
  /** Site Extension comment. */
  comment?: string;
}

export function siteExtensionInfoPropertiesDeserializer(item: any): SiteExtensionInfoProperties {
  return {
    extensionId: item["extension_id"],
    title: item["title"],
    extensionType: item["extension_type"],
    summary: item["summary"],
    description: item["description"],
    version: item["version"],
    extensionUrl: item["extension_url"],
    projectUrl: item["project_url"],
    iconUrl: item["icon_url"],
    licenseUrl: item["license_url"],
    feedUrl: item["feed_url"],
    authors: !item["authors"]
      ? item["authors"]
      : item["authors"].map((p: any) => {
          return p;
        }),
    installerCommandLineParams: item["installer_command_line_params"],
    publishedDateTime: !item["published_date_time"]
      ? item["published_date_time"]
      : new Date(item["published_date_time"]),
    downloadCount: item["download_count"],
    localIsLatestVersion: item["local_is_latest_version"],
    localPath: item["local_path"],
    installedDateTime: !item["installed_date_time"]
      ? item["installed_date_time"]
      : new Date(item["installed_date_time"]),
    provisioningState: item["provisioningState"],
    comment: item["comment"],
  };
}

/** Site extension type. */
export type SiteExtensionType = "Gallery" | "WebRoot";

/** Collection of Kudu site extension information elements. */
export interface _SiteExtensionInfoCollection {
  /** The SiteExtensionInfo items on this page */
  value: SiteExtensionInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _siteExtensionInfoCollectionDeserializer(item: any): _SiteExtensionInfoCollection {
  return {
    value: siteExtensionInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function siteExtensionInfoArrayDeserializer(result: Array<SiteExtensionInfo>): any[] {
  return result.map((item) => {
    return siteExtensionInfoDeserializer(item);
  });
}

/** Source control configuration for an app. */
export interface SiteSourceControl extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Repository or source control URL. */
  repoUrl?: string;
  /** Name of branch to use for deployment. */
  branch?: string;
  /** <code>true</code> to limit to manual integration; <code>false</code> to enable continuous integration (which configures webhooks into online repos like GitHub). */
  isManualIntegration?: boolean;
  /** <code>true</code> if this is deployed via GitHub action. */
  isGitHubAction?: boolean;
  /** <code>true</code> to enable deployment rollback; otherwise, <code>false</code>. */
  deploymentRollbackEnabled?: boolean;
  /** <code>true</code> for a Mercurial repository; <code>false</code> for a Git repository. */
  isMercurial?: boolean;
  /** If GitHub Action is selected, than the associated configuration. */
  gitHubActionConfiguration?: GitHubActionConfiguration;
}

export function siteSourceControlSerializer(item: SiteSourceControl): any {
  return {
    properties: areAllPropsUndefined(item, [
      "repoUrl",
      "branch",
      "isManualIntegration",
      "isGitHubAction",
      "deploymentRollbackEnabled",
      "isMercurial",
      "gitHubActionConfiguration",
    ])
      ? undefined
      : _siteSourceControlPropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function siteSourceControlDeserializer(item: any): SiteSourceControl {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _siteSourceControlPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** SiteSourceControl resource specific properties */
export interface SiteSourceControlProperties {
  /** Repository or source control URL. */
  repoUrl?: string;
  /** Name of branch to use for deployment. */
  branch?: string;
  /** <code>true</code> to limit to manual integration; <code>false</code> to enable continuous integration (which configures webhooks into online repos like GitHub). */
  isManualIntegration?: boolean;
  /** <code>true</code> if this is deployed via GitHub action. */
  isGitHubAction?: boolean;
  /** <code>true</code> to enable deployment rollback; otherwise, <code>false</code>. */
  deploymentRollbackEnabled?: boolean;
  /** <code>true</code> for a Mercurial repository; <code>false</code> for a Git repository. */
  isMercurial?: boolean;
  /** If GitHub Action is selected, than the associated configuration. */
  gitHubActionConfiguration?: GitHubActionConfiguration;
}

export function siteSourceControlPropertiesSerializer(item: SiteSourceControlProperties): any {
  return {
    repoUrl: item["repoUrl"],
    branch: item["branch"],
    isManualIntegration: item["isManualIntegration"],
    isGitHubAction: item["isGitHubAction"],
    deploymentRollbackEnabled: item["deploymentRollbackEnabled"],
    isMercurial: item["isMercurial"],
    gitHubActionConfiguration: !item["gitHubActionConfiguration"]
      ? item["gitHubActionConfiguration"]
      : gitHubActionConfigurationSerializer(item["gitHubActionConfiguration"]),
  };
}

export function siteSourceControlPropertiesDeserializer(item: any): SiteSourceControlProperties {
  return {
    repoUrl: item["repoUrl"],
    branch: item["branch"],
    isManualIntegration: item["isManualIntegration"],
    isGitHubAction: item["isGitHubAction"],
    deploymentRollbackEnabled: item["deploymentRollbackEnabled"],
    isMercurial: item["isMercurial"],
    gitHubActionConfiguration: !item["gitHubActionConfiguration"]
      ? item["gitHubActionConfiguration"]
      : gitHubActionConfigurationDeserializer(item["gitHubActionConfiguration"]),
  };
}

/** The GitHub action configuration. */
export interface GitHubActionConfiguration {
  /** GitHub Action code configuration. */
  codeConfiguration?: GitHubActionCodeConfiguration;
  /** GitHub Action container configuration. */
  containerConfiguration?: GitHubActionContainerConfiguration;
  /** This will help determine the workflow configuration to select. */
  isLinux?: boolean;
  /** Workflow option to determine whether the workflow file should be generated and written to the repository. */
  generateWorkflowFile?: boolean;
}

export function gitHubActionConfigurationSerializer(item: GitHubActionConfiguration): any {
  return {
    codeConfiguration: !item["codeConfiguration"]
      ? item["codeConfiguration"]
      : gitHubActionCodeConfigurationSerializer(item["codeConfiguration"]),
    containerConfiguration: !item["containerConfiguration"]
      ? item["containerConfiguration"]
      : gitHubActionContainerConfigurationSerializer(item["containerConfiguration"]),
    isLinux: item["isLinux"],
    generateWorkflowFile: item["generateWorkflowFile"],
  };
}

export function gitHubActionConfigurationDeserializer(item: any): GitHubActionConfiguration {
  return {
    codeConfiguration: !item["codeConfiguration"]
      ? item["codeConfiguration"]
      : gitHubActionCodeConfigurationDeserializer(item["codeConfiguration"]),
    containerConfiguration: !item["containerConfiguration"]
      ? item["containerConfiguration"]
      : gitHubActionContainerConfigurationDeserializer(item["containerConfiguration"]),
    isLinux: item["isLinux"],
    generateWorkflowFile: item["generateWorkflowFile"],
  };
}

/** The GitHub action code configuration. */
export interface GitHubActionCodeConfiguration {
  /** Runtime stack is used to determine the workflow file content for code base apps. */
  runtimeStack?: string;
  /** Runtime version is used to determine what build version to set in the workflow file. */
  runtimeVersion?: string;
}

export function gitHubActionCodeConfigurationSerializer(item: GitHubActionCodeConfiguration): any {
  return { runtimeStack: item["runtimeStack"], runtimeVersion: item["runtimeVersion"] };
}

export function gitHubActionCodeConfigurationDeserializer(
  item: any,
): GitHubActionCodeConfiguration {
  return {
    runtimeStack: item["runtimeStack"],
    runtimeVersion: item["runtimeVersion"],
  };
}

/** The GitHub action container configuration. */
export interface GitHubActionContainerConfiguration {
  /** The server URL for the container registry where the build will be hosted. */
  serverUrl?: string;
  /** The image name for the build. */
  imageName?: string;
  /** The username used to upload the image to the container registry. */
  username?: string;
  /** The password used to upload the image to the container registry. */
  password?: string;
}

export function gitHubActionContainerConfigurationSerializer(
  item: GitHubActionContainerConfiguration,
): any {
  return {
    serverUrl: item["serverUrl"],
    imageName: item["imageName"],
    username: item["username"],
    password: item["password"],
  };
}

export function gitHubActionContainerConfigurationDeserializer(
  item: any,
): GitHubActionContainerConfiguration {
  return {
    serverUrl: item["serverUrl"],
    imageName: item["imageName"],
    username: item["username"],
    password: item["password"],
  };
}

/** Triggered Web Job Information. */
export interface TriggeredWebJob extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Latest job run information. */
  latestRun?: TriggeredJobRun;
  /** History URL. */
  historyUrl?: string;
  /** Scheduler Logs URL. */
  schedulerLogsUrl?: string;
  /** Run command. */
  runCommand?: string;
  /** Job URL. */
  url?: string;
  /** Extra Info URL. */
  extraInfoUrl?: string;
  /** Job type. */
  webJobType?: WebJobType;
  /** Error information. */
  error?: string;
  /** Using SDK? */
  usingSdk?: boolean;
  /** Property to allow or block all public traffic. Allowed Values: 'Enabled', 'Disabled' or an empty string. */
  publicNetworkAccess?: string;
  /** Checks if Customer provided storage account is required */
  storageAccountRequired?: boolean;
  /** Job settings. */
  settings?: Record<string, any>;
}

export function triggeredWebJobDeserializer(item: any): TriggeredWebJob {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _triggeredWebJobPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** TriggeredWebJob resource specific properties */
export interface TriggeredWebJobProperties {
  /** Latest job run information. */
  latestRun?: TriggeredJobRun;
  /** History URL. */
  historyUrl?: string;
  /** Scheduler Logs URL. */
  schedulerLogsUrl?: string;
  /** Run command. */
  runCommand?: string;
  /** Job URL. */
  url?: string;
  /** Extra Info URL. */
  extraInfoUrl?: string;
  /** Job type. */
  webJobType?: WebJobType;
  /** Error information. */
  error?: string;
  /** Using SDK? */
  usingSdk?: boolean;
  /** Property to allow or block all public traffic. Allowed Values: 'Enabled', 'Disabled' or an empty string. */
  publicNetworkAccess?: string;
  /** Checks if Customer provided storage account is required */
  storageAccountRequired?: boolean;
  /** Job settings. */
  settings?: Record<string, any>;
}

export function triggeredWebJobPropertiesDeserializer(item: any): TriggeredWebJobProperties {
  return {
    latestRun: !item["latest_run"]
      ? item["latest_run"]
      : triggeredJobRunDeserializer(item["latest_run"]),
    historyUrl: item["history_url"],
    schedulerLogsUrl: item["scheduler_logs_url"],
    runCommand: item["run_command"],
    url: item["url"],
    extraInfoUrl: item["extra_info_url"],
    webJobType: item["web_job_type"],
    error: item["error"],
    usingSdk: item["using_sdk"],
    publicNetworkAccess: item["publicNetworkAccess"],
    storageAccountRequired: item["storageAccountRequired"],
    settings: !item["settings"]
      ? item["settings"]
      : Object.fromEntries(Object.entries(item["settings"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Triggered Web Job Run Information. */
export interface TriggeredJobRun {
  /** Job ID. */
  webJobId?: string;
  /** Job name. */
  webJobName?: string;
  /** Job status. */
  status?: TriggeredWebJobStatus;
  /** Start time. */
  startTime?: Date;
  /** End time. */
  endTime?: Date;
  /** Job duration. */
  duration?: string;
  /** Output URL. */
  outputUrl?: string;
  /** Error URL. */
  errorUrl?: string;
  /** Job URL. */
  url?: string;
  /** Job name. */
  jobName?: string;
  /** Job trigger. */
  trigger?: string;
}

export function triggeredJobRunDeserializer(item: any): TriggeredJobRun {
  return {
    webJobId: item["web_job_id"],
    webJobName: item["web_job_name"],
    status: item["status"],
    startTime: !item["start_time"] ? item["start_time"] : new Date(item["start_time"]),
    endTime: !item["end_time"] ? item["end_time"] : new Date(item["end_time"]),
    duration: item["duration"],
    outputUrl: item["output_url"],
    errorUrl: item["error_url"],
    url: item["url"],
    jobName: item["job_name"],
    trigger: item["trigger"],
  };
}

/** Job status. */
export type TriggeredWebJobStatus = "Success" | "Failed" | "Error";

/** Collection of Kudu continuous web job information elements. */
export interface _TriggeredWebJobCollection {
  /** The TriggeredWebJob items on this page */
  value: TriggeredWebJob[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _triggeredWebJobCollectionDeserializer(item: any): _TriggeredWebJobCollection {
  return {
    value: triggeredWebJobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function triggeredWebJobArrayDeserializer(result: Array<TriggeredWebJob>): any[] {
  return result.map((item) => {
    return triggeredWebJobDeserializer(item);
  });
}

/** Triggered Web Job History. List of Triggered Web Job Run Information elements. */
export interface TriggeredJobHistory extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** List of triggered web job runs. */
  runs?: TriggeredJobRun[];
}

export function triggeredJobHistoryDeserializer(item: any): TriggeredJobHistory {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _triggeredJobHistoryPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** TriggeredJobHistory resource specific properties */
export interface TriggeredJobHistoryProperties {
  /** List of triggered web job runs. */
  runs?: TriggeredJobRun[];
}

export function triggeredJobHistoryPropertiesDeserializer(
  item: any,
): TriggeredJobHistoryProperties {
  return {
    runs: !item["runs"] ? item["runs"] : triggeredJobRunArrayDeserializer(item["runs"]),
  };
}

export function triggeredJobRunArrayDeserializer(result: Array<TriggeredJobRun>): any[] {
  return result.map((item) => {
    return triggeredJobRunDeserializer(item);
  });
}

/** Collection of Kudu continuous web job information elements. */
export interface _TriggeredJobHistoryCollection {
  /** The TriggeredJobHistory items on this page */
  value: TriggeredJobHistory[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _triggeredJobHistoryCollectionDeserializer(
  item: any,
): _TriggeredJobHistoryCollection {
  return {
    value: triggeredJobHistoryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function triggeredJobHistoryArrayDeserializer(result: Array<TriggeredJobHistory>): any[] {
  return result.map((item) => {
    return triggeredJobHistoryDeserializer(item);
  });
}

/** Web Job Information. */
export interface WebJob extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Run command. */
  runCommand?: string;
  /** Job URL. */
  url?: string;
  /** Extra Info URL. */
  extraInfoUrl?: string;
  /** Job type. */
  webJobType?: WebJobType;
  /** Error information. */
  error?: string;
  /** Using SDK? */
  usingSdk?: boolean;
  /** Job settings. */
  settings?: Record<string, any>;
}

export function webJobDeserializer(item: any): WebJob {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _webJobPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** WebJob resource specific properties */
export interface WebJobProperties {
  /** Run command. */
  runCommand?: string;
  /** Job URL. */
  url?: string;
  /** Extra Info URL. */
  extraInfoUrl?: string;
  /** Job type. */
  webJobType?: WebJobType;
  /** Error information. */
  error?: string;
  /** Using SDK? */
  usingSdk?: boolean;
  /** Job settings. */
  settings?: Record<string, any>;
}

export function webJobPropertiesDeserializer(item: any): WebJobProperties {
  return {
    runCommand: item["run_command"],
    url: item["url"],
    extraInfoUrl: item["extra_info_url"],
    webJobType: item["web_job_type"],
    error: item["error"],
    usingSdk: item["using_sdk"],
    settings: !item["settings"]
      ? item["settings"]
      : Object.fromEntries(Object.entries(item["settings"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Collection of Kudu web job information elements. */
export interface _WebJobCollection {
  /** The WebJob items on this page */
  value: WebJob[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _webJobCollectionDeserializer(item: any): _WebJobCollection {
  return {
    value: webJobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function webJobArrayDeserializer(result: Array<WebJob>): any[] {
  return result.map((item) => {
    return webJobDeserializer(item);
  });
}

/** Collection of Kudu workflow information elements. */
export interface _WorkflowEnvelopeCollection {
  /** The WorkflowEnvelope items on this page */
  value: WorkflowEnvelope[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workflowEnvelopeCollectionDeserializer(item: any): _WorkflowEnvelopeCollection {
  return {
    value: workflowEnvelopeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workflowEnvelopeArrayDeserializer(result: Array<WorkflowEnvelope>): any[] {
  return result.map((item) => {
    return workflowEnvelopeDeserializer(item);
  });
}

/** Server Farm RDP connection details. */
export interface ServerFarmRdpDetails {
  /** The RDP password for the server farm. */
  rdpPassword?: string;
  /** The RDP password expiry date. */
  rdpPasswordExpiry?: Date;
}

export function serverFarmRdpDetailsDeserializer(item: any): ServerFarmRdpDetails {
  return {
    rdpPassword: item["rdpPassword"],
    rdpPasswordExpiry: !item["rdpPasswordExpiry"]
      ? item["rdpPasswordExpiry"]
      : new Date(item["rdpPasswordExpiry"]),
  };
}

/** Represents instance details for an app service plan. */
export interface ServerFarmInstanceDetails {
  /** The server farm name. */
  serverFarmName?: string;
  /** The list of server farm instances. */
  instances?: ServerFarmInstance[];
  /** The total number of instances. */
  instanceCount?: number;
}

export function serverFarmInstanceDetailsDeserializer(item: any): ServerFarmInstanceDetails {
  return {
    serverFarmName: item["serverFarmName"],
    instances: !item["instances"]
      ? item["instances"]
      : serverFarmInstanceArrayDeserializer(item["instances"]),
    instanceCount: item["instanceCount"],
  };
}

export function serverFarmInstanceArrayDeserializer(result: Array<ServerFarmInstance>): any[] {
  return result.map((item) => {
    return serverFarmInstanceDeserializer(item);
  });
}

/** Represents details of a single instance in a server farm. */
export interface ServerFarmInstance {
  /** The instance name. */
  instanceName?: string;
  /** The instance IP address. */
  ipAddress?: string;
  /** The instance status. */
  status?: string;
}

export function serverFarmInstanceDeserializer(item: any): ServerFarmInstance {
  return {
    instanceName: item["instanceName"],
    ipAddress: item["ipAddress"],
    status: item["status"],
  };
}

/** ARM resource for a app service plan. */
export interface AppServicePlanPatchResource extends ProxyOnlyResource {
  /** Managed service identity. */
  identity?: ManagedServiceIdentity;
  /** Target worker tier assigned to the App Service plan. */
  workerTierName?: string;
  /** App Service plan status. */
  readonly status?: StatusOptions;
  /** App Service plan subscription. */
  readonly subscription?: string;
  /** Specification for the App Service Environment to use for the App Service plan. */
  hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /** Maximum number of instances that can be assigned to this App Service plan. */
  readonly maximumNumberOfWorkers?: number;
  /** The number of instances that are assigned to this App Service plan. */
  readonly numberOfWorkers?: number;
  /** Geographical location for the App Service plan. */
  readonly geoRegion?: string;
  /**
   * If <code>true</code>, apps assigned to this App Service plan can be scaled independently.
   * If <code>false</code>, apps assigned to this App Service plan will scale to all instances of the plan.
   */
  perSiteScaling?: boolean;
  /** ServerFarm supports ElasticScale. Apps in this plan will scale as if the ServerFarm was ElasticPremium sku */
  elasticScaleEnabled?: boolean;
  /** Maximum number of total workers allowed for this ElasticScaleEnabled App Service Plan */
  maximumElasticWorkerCount?: number;
  /** Number of apps assigned to this App Service plan. */
  readonly numberOfSites?: number;
  /** If <code>true</code>, this App Service Plan owns spot instances. */
  isSpot?: boolean;
  /** The time when the server farm expires. Valid only if it is a spot server farm. */
  spotExpirationTime?: Date;
  /** The time when the server farm free offer expires. */
  freeOfferExpirationTime?: Date;
  /** Resource group of the App Service plan. */
  readonly resourceGroup?: string;
  /** If Linux app service plan <code>true</code>, <code>false</code> otherwise. */
  reserved?: boolean;
  /** Obsolete: If Hyper-V container app service plan <code>true</code>, <code>false</code> otherwise. */
  isXenon?: boolean;
  /** If Hyper-V container app service plan <code>true</code>, <code>false</code> otherwise. */
  hyperV?: boolean;
  /** Scaling worker count. */
  targetWorkerCount?: number;
  /** Scaling worker size ID. */
  targetWorkerSizeId?: number;
  /** Provisioning state of the App Service Plan. */
  readonly provisioningState?: ProvisioningState;
  /** Specification for the Kubernetes Environment to use for the App Service plan. */
  kubeEnvironmentProfile?: KubeEnvironmentProfile;
  /**
   * If <code>true</code>, this App Service Plan will perform availability zone balancing.
   * If <code>false</code>, this App Service Plan will not perform availability zone balancing.
   */
  zoneRedundant?: boolean;
}

export function appServicePlanPatchResourceSerializer(item: AppServicePlanPatchResource): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "workerTierName",
      "hostingEnvironmentProfile",
      "perSiteScaling",
      "elasticScaleEnabled",
      "maximumElasticWorkerCount",
      "isSpot",
      "spotExpirationTime",
      "freeOfferExpirationTime",
      "reserved",
      "isXenon",
      "hyperV",
      "targetWorkerCount",
      "targetWorkerSizeId",
      "kubeEnvironmentProfile",
      "zoneRedundant",
    ])
      ? undefined
      : _appServicePlanPatchResourcePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** AppServicePlanPatchResource resource specific properties */
export interface AppServicePlanPatchResourceProperties {
  /** Target worker tier assigned to the App Service plan. */
  workerTierName?: string;
  /** App Service plan status. */
  readonly status?: StatusOptions;
  /** App Service plan subscription. */
  readonly subscription?: string;
  /** Specification for the App Service Environment to use for the App Service plan. */
  hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /** Maximum number of instances that can be assigned to this App Service plan. */
  readonly maximumNumberOfWorkers?: number;
  /** The number of instances that are assigned to this App Service plan. */
  readonly numberOfWorkers?: number;
  /** Geographical location for the App Service plan. */
  readonly geoRegion?: string;
  /**
   * If <code>true</code>, apps assigned to this App Service plan can be scaled independently.
   * If <code>false</code>, apps assigned to this App Service plan will scale to all instances of the plan.
   */
  perSiteScaling?: boolean;
  /** ServerFarm supports ElasticScale. Apps in this plan will scale as if the ServerFarm was ElasticPremium sku */
  elasticScaleEnabled?: boolean;
  /** Maximum number of total workers allowed for this ElasticScaleEnabled App Service Plan */
  maximumElasticWorkerCount?: number;
  /** Number of apps assigned to this App Service plan. */
  readonly numberOfSites?: number;
  /** If <code>true</code>, this App Service Plan owns spot instances. */
  isSpot?: boolean;
  /** The time when the server farm expires. Valid only if it is a spot server farm. */
  spotExpirationTime?: Date;
  /** The time when the server farm free offer expires. */
  freeOfferExpirationTime?: Date;
  /** Resource group of the App Service plan. */
  readonly resourceGroup?: string;
  /** If Linux app service plan <code>true</code>, <code>false</code> otherwise. */
  reserved?: boolean;
  /** Obsolete: If Hyper-V container app service plan <code>true</code>, <code>false</code> otherwise. */
  isXenon?: boolean;
  /** If Hyper-V container app service plan <code>true</code>, <code>false</code> otherwise. */
  hyperV?: boolean;
  /** Scaling worker count. */
  targetWorkerCount?: number;
  /** Scaling worker size ID. */
  targetWorkerSizeId?: number;
  /** Provisioning state of the App Service Plan. */
  readonly provisioningState?: ProvisioningState;
  /** Specification for the Kubernetes Environment to use for the App Service plan. */
  kubeEnvironmentProfile?: KubeEnvironmentProfile;
  /**
   * If <code>true</code>, this App Service Plan will perform availability zone balancing.
   * If <code>false</code>, this App Service Plan will not perform availability zone balancing.
   */
  zoneRedundant?: boolean;
}

export function appServicePlanPatchResourcePropertiesSerializer(
  item: AppServicePlanPatchResourceProperties,
): any {
  return {
    workerTierName: item["workerTierName"],
    hostingEnvironmentProfile: !item["hostingEnvironmentProfile"]
      ? item["hostingEnvironmentProfile"]
      : hostingEnvironmentProfileSerializer(item["hostingEnvironmentProfile"]),
    perSiteScaling: item["perSiteScaling"],
    elasticScaleEnabled: item["elasticScaleEnabled"],
    maximumElasticWorkerCount: item["maximumElasticWorkerCount"],
    isSpot: item["isSpot"],
    spotExpirationTime: !item["spotExpirationTime"]
      ? item["spotExpirationTime"]
      : item["spotExpirationTime"].toISOString(),
    freeOfferExpirationTime: !item["freeOfferExpirationTime"]
      ? item["freeOfferExpirationTime"]
      : item["freeOfferExpirationTime"].toISOString(),
    reserved: item["reserved"],
    isXenon: item["isXenon"],
    hyperV: item["hyperV"],
    targetWorkerCount: item["targetWorkerCount"],
    targetWorkerSizeId: item["targetWorkerSizeId"],
    kubeEnvironmentProfile: !item["kubeEnvironmentProfile"]
      ? item["kubeEnvironmentProfile"]
      : kubeEnvironmentProfileSerializer(item["kubeEnvironmentProfile"]),
    zoneRedundant: item["zoneRedundant"],
  };
}

/** Collection of hostname bindings. */
export interface _HybridConnectionCollection {
  /** The HybridConnection items on this page */
  value: HybridConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _hybridConnectionCollectionDeserializer(item: any): _HybridConnectionCollection {
  return {
    value: hybridConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Hybrid Connection key contract. This has the send key name and value for a Hybrid Connection. */
export interface HybridConnectionKey extends ProxyOnlyResource {
  /** The name of the send key. */
  readonly sendKeyName?: string;
  /** The value of the send key. */
  readonly sendKeyValue?: string;
}

export function hybridConnectionKeyDeserializer(item: any): HybridConnectionKey {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _hybridConnectionKeyPropertiesDeserializer(item["properties"])),
  };
}

/** HybridConnectionKey resource specific properties */
export interface HybridConnectionKeyProperties {
  /** The name of the send key. */
  readonly sendKeyName?: string;
  /** The value of the send key. */
  readonly sendKeyValue?: string;
}

export function hybridConnectionKeyPropertiesDeserializer(
  item: any,
): HybridConnectionKeyProperties {
  return {
    sendKeyName: item["sendKeyName"],
    sendKeyValue: item["sendKeyValue"],
  };
}

/** Collection of resources. */
export interface _ResourceCollection {
  /** Collection of resources. */
  value: string[];
  /** Link to next page of resources. */
  nextLink?: string;
}

export function _resourceCollectionDeserializer(item: any): _ResourceCollection {
  return {
    value: item["value"].map((p: any) => {
      return p;
    }),
    nextLink: item["nextLink"],
  };
}

/** Hybrid Connection limits contract. This is used to return the plan limits of Hybrid Connections. */
export interface HybridConnectionLimits extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** The current number of Hybrid Connections. */
  readonly current?: number;
  /** The maximum number of Hybrid Connections allowed. */
  readonly maximum?: number;
}

export function hybridConnectionLimitsDeserializer(item: any): HybridConnectionLimits {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _hybridConnectionLimitsPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** HybridConnectionLimits resource specific properties */
export interface HybridConnectionLimitsProperties {
  /** The current number of Hybrid Connections. */
  readonly current?: number;
  /** The maximum number of Hybrid Connections allowed. */
  readonly maximum?: number;
}

export function hybridConnectionLimitsPropertiesDeserializer(
  item: any,
): HybridConnectionLimitsProperties {
  return {
    current: item["current"],
    maximum: item["maximum"],
  };
}

/** SSL certificate for an app. */
export interface Certificate extends TrackedResource {
  /** Kind of resource. If the resource is an app, you can refer to https://github.com/Azure/app-service-linux-docs/blob/master/Things_You_Should_Know/kind_property.md#app-service-resource-kind-reference for details supported values for kind. */
  kind?: string;
  /** Certificate password. */
  password?: string;
  /** Friendly name of the certificate. */
  readonly friendlyName?: string;
  /** Subject name of the certificate. */
  readonly subjectName?: string;
  /** Host names the certificate applies to. */
  hostNames?: string[];
  /** Pfx blob. */
  pfxBlob?: Uint8Array;
  /** App name. */
  readonly siteName?: string;
  /** Self link. */
  readonly selfLink?: string;
  /** Certificate issuer. */
  readonly issuer?: string;
  /** Certificate issue Date. */
  readonly issueDate?: Date;
  /** Certificate expiration date. */
  readonly expirationDate?: Date;
  /** Certificate thumbprint. */
  readonly thumbprint?: string;
  /** Is the certificate valid?. */
  readonly valid?: boolean;
  /** Raw bytes of .cer file */
  readonly cerBlob?: Uint8Array;
  /** Public key hash. */
  readonly publicKeyHash?: string;
  /** Specification for the App Service Environment to use for the certificate. */
  readonly hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /** Azure Key Vault Csm resource Id. */
  keyVaultId?: string;
  /** Azure Key Vault secret name. */
  keyVaultSecretName?: string;
  /** Status of the Key Vault secret. */
  readonly keyVaultSecretStatus?: KeyVaultSecretStatus;
  /** Resource ID of the associated App Service plan. */
  serverFarmId?: string;
  /** CNAME of the certificate to be issued via free certificate */
  canonicalName?: string;
  /** Method of domain validation for free cert */
  domainValidationMethod?: string;
}

export function certificateSerializer(item: Certificate): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "password",
      "hostNames",
      "pfxBlob",
      "keyVaultId",
      "keyVaultSecretName",
      "serverFarmId",
      "canonicalName",
      "domainValidationMethod",
    ])
      ? undefined
      : _certificatePropertiesSerializer(item),
    kind: item["kind"],
  };
}

export function certificateDeserializer(item: any): Certificate {
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
      : _certificatePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** Certificate resource specific properties */
export interface CertificateProperties {
  /** Certificate password. */
  password?: string;
  /** Friendly name of the certificate. */
  readonly friendlyName?: string;
  /** Subject name of the certificate. */
  readonly subjectName?: string;
  /** Host names the certificate applies to. */
  hostNames?: string[];
  /** Pfx blob. */
  pfxBlob?: Uint8Array;
  /** App name. */
  readonly siteName?: string;
  /** Self link. */
  readonly selfLink?: string;
  /** Certificate issuer. */
  readonly issuer?: string;
  /** Certificate issue Date. */
  readonly issueDate?: Date;
  /** Certificate expiration date. */
  readonly expirationDate?: Date;
  /** Certificate thumbprint. */
  readonly thumbprint?: string;
  /** Is the certificate valid?. */
  readonly valid?: boolean;
  /** Raw bytes of .cer file */
  readonly cerBlob?: Uint8Array;
  /** Public key hash. */
  readonly publicKeyHash?: string;
  /** Specification for the App Service Environment to use for the certificate. */
  readonly hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /** Azure Key Vault Csm resource Id. */
  keyVaultId?: string;
  /** Azure Key Vault secret name. */
  keyVaultSecretName?: string;
  /** Status of the Key Vault secret. */
  readonly keyVaultSecretStatus?: KeyVaultSecretStatus;
  /** Resource ID of the associated App Service plan. */
  serverFarmId?: string;
  /** CNAME of the certificate to be issued via free certificate */
  canonicalName?: string;
  /** Method of domain validation for free cert */
  domainValidationMethod?: string;
}

export function certificatePropertiesSerializer(item: CertificateProperties): any {
  return {
    password: item["password"],
    hostNames: !item["hostNames"]
      ? item["hostNames"]
      : item["hostNames"].map((p: any) => {
          return p;
        }),
    pfxBlob: !item["pfxBlob"] ? item["pfxBlob"] : uint8ArrayToString(item["pfxBlob"], "base64"),
    keyVaultId: item["keyVaultId"],
    keyVaultSecretName: item["keyVaultSecretName"],
    serverFarmId: item["serverFarmId"],
    canonicalName: item["canonicalName"],
    domainValidationMethod: item["domainValidationMethod"],
  };
}

export function certificatePropertiesDeserializer(item: any): CertificateProperties {
  return {
    password: item["password"],
    friendlyName: item["friendlyName"],
    subjectName: item["subjectName"],
    hostNames: !item["hostNames"]
      ? item["hostNames"]
      : item["hostNames"].map((p: any) => {
          return p;
        }),
    pfxBlob: !item["pfxBlob"]
      ? item["pfxBlob"]
      : typeof item["pfxBlob"] === "string"
        ? stringToUint8Array(item["pfxBlob"], "base64")
        : item["pfxBlob"],
    siteName: item["siteName"],
    selfLink: item["selfLink"],
    issuer: item["issuer"],
    issueDate: !item["issueDate"] ? item["issueDate"] : new Date(item["issueDate"]),
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    thumbprint: item["thumbprint"],
    valid: item["valid"],
    cerBlob: !item["cerBlob"]
      ? item["cerBlob"]
      : typeof item["cerBlob"] === "string"
        ? stringToUint8Array(item["cerBlob"], "base64")
        : item["cerBlob"],
    publicKeyHash: item["publicKeyHash"],
    hostingEnvironmentProfile: !item["hostingEnvironmentProfile"]
      ? item["hostingEnvironmentProfile"]
      : hostingEnvironmentProfileDeserializer(item["hostingEnvironmentProfile"]),
    keyVaultId: item["keyVaultId"],
    keyVaultSecretName: item["keyVaultSecretName"],
    keyVaultSecretStatus: item["keyVaultSecretStatus"],
    serverFarmId: item["serverFarmId"],
    canonicalName: item["canonicalName"],
    domainValidationMethod: item["domainValidationMethod"],
  };
}

/** Status of the Key Vault secret. */
export type KeyVaultSecretStatus =
  | "Initialized"
  | "WaitingOnCertificateOrder"
  | "Succeeded"
  | "CertificateOrderFailed"
  | "OperationNotPermittedOnKeyVault"
  | "AzureServiceUnauthorizedToAccessKeyVault"
  | "KeyVaultDoesNotExist"
  | "KeyVaultSecretDoesNotExist"
  | "UnknownError"
  | "ExternalPrivateKey"
  | "Unknown";

/** ARM resource for a certificate. */
export interface CertificatePatchResource extends ProxyOnlyResource {
  /** Certificate password. */
  readonly password?: string;
  /** Friendly name of the certificate. */
  readonly friendlyName?: string;
  /** Subject name of the certificate. */
  readonly subjectName?: string;
  /** Host names the certificate applies to. */
  hostNames?: string[];
  /** Pfx blob. */
  pfxBlob?: Uint8Array;
  /** App name. */
  readonly siteName?: string;
  /** Self link. */
  readonly selfLink?: string;
  /** Certificate issuer. */
  readonly issuer?: string;
  /** Certificate issue Date. */
  readonly issueDate?: Date;
  /** Certificate expiration date. */
  readonly expirationDate?: Date;
  /** Certificate thumbprint. */
  readonly thumbprint?: string;
  /** Is the certificate valid?. */
  readonly valid?: boolean;
  /** Raw bytes of .cer file */
  readonly cerBlob?: Uint8Array;
  /** Public key hash. */
  readonly publicKeyHash?: string;
  /** Specification for the App Service Environment to use for the certificate. */
  readonly hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /** Key Vault Csm resource Id. */
  keyVaultId?: string;
  /** Key Vault secret name. */
  keyVaultSecretName?: string;
  /** Status of the Key Vault secret. */
  readonly keyVaultSecretStatus?: KeyVaultSecretStatus;
  /** Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}". */
  serverFarmId?: string;
  /** CNAME of the certificate to be issued via free certificate */
  canonicalName?: string;
  /** Method of domain validation for free cert */
  domainValidationMethod?: string;
}

export function certificatePatchResourceSerializer(item: CertificatePatchResource): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "hostNames",
      "pfxBlob",
      "keyVaultId",
      "keyVaultSecretName",
      "serverFarmId",
      "canonicalName",
      "domainValidationMethod",
    ])
      ? undefined
      : _certificatePatchResourcePropertiesSerializer(item),
  };
}

/** CertificatePatchResource resource specific properties */
export interface CertificatePatchResourceProperties {
  /** Certificate password. */
  readonly password?: string;
  /** Friendly name of the certificate. */
  readonly friendlyName?: string;
  /** Subject name of the certificate. */
  readonly subjectName?: string;
  /** Host names the certificate applies to. */
  hostNames?: string[];
  /** Pfx blob. */
  pfxBlob?: Uint8Array;
  /** App name. */
  readonly siteName?: string;
  /** Self link. */
  readonly selfLink?: string;
  /** Certificate issuer. */
  readonly issuer?: string;
  /** Certificate issue Date. */
  readonly issueDate?: Date;
  /** Certificate expiration date. */
  readonly expirationDate?: Date;
  /** Certificate thumbprint. */
  readonly thumbprint?: string;
  /** Is the certificate valid?. */
  readonly valid?: boolean;
  /** Raw bytes of .cer file */
  readonly cerBlob?: Uint8Array;
  /** Public key hash. */
  readonly publicKeyHash?: string;
  /** Specification for the App Service Environment to use for the certificate. */
  readonly hostingEnvironmentProfile?: HostingEnvironmentProfile;
  /** Key Vault Csm resource Id. */
  keyVaultId?: string;
  /** Key Vault secret name. */
  keyVaultSecretName?: string;
  /** Status of the Key Vault secret. */
  readonly keyVaultSecretStatus?: KeyVaultSecretStatus;
  /** Resource ID of the associated App Service plan, formatted as: "/subscriptions/{subscriptionID}/resourceGroups/{groupName}/providers/Microsoft.Web/serverfarms/{appServicePlanName}". */
  serverFarmId?: string;
  /** CNAME of the certificate to be issued via free certificate */
  canonicalName?: string;
  /** Method of domain validation for free cert */
  domainValidationMethod?: string;
}

export function certificatePatchResourcePropertiesSerializer(
  item: CertificatePatchResourceProperties,
): any {
  return {
    hostNames: !item["hostNames"]
      ? item["hostNames"]
      : item["hostNames"].map((p: any) => {
          return p;
        }),
    pfxBlob: !item["pfxBlob"] ? item["pfxBlob"] : uint8ArrayToString(item["pfxBlob"], "base64"),
    keyVaultId: item["keyVaultId"],
    keyVaultSecretName: item["keyVaultSecretName"],
    serverFarmId: item["serverFarmId"],
    canonicalName: item["canonicalName"],
    domainValidationMethod: item["domainValidationMethod"],
  };
}

/** Collection of certificates. */
export interface _CertificateCollection {
  /** The Certificate items on this page */
  value: Certificate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _certificateCollectionDeserializer(item: any): _CertificateCollection {
  return {
    value: certificateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function certificateArraySerializer(result: Array<Certificate>): any[] {
  return result.map((item) => {
    return certificateSerializer(item);
  });
}

export function certificateArrayDeserializer(result: Array<Certificate>): any[] {
  return result.map((item) => {
    return certificateDeserializer(item);
  });
}

/** A deleted app. */
export interface DeletedSite extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Numeric id for the deleted site */
  readonly deletedSiteId?: number;
  /** Time in UTC when the app was deleted. */
  readonly deletedTimestamp?: string;
  /** Subscription containing the deleted site */
  readonly subscription?: string;
  /** ResourceGroup that contained the deleted site */
  readonly resourceGroup?: string;
  /** Name of the deleted site */
  readonly deletedSiteName?: string;
  /** Slot of the deleted site */
  readonly slot?: string;
  /** Kind of site that was deleted */
  readonly kindPropertiesKind?: string;
  /** Geo Region of the deleted site */
  readonly geoRegionName?: string;
}

export function deletedSiteDeserializer(item: any): DeletedSite {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _deletedSitePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** DeletedSite resource specific properties */
export interface DeletedSiteProperties {
  /** Numeric id for the deleted site */
  readonly deletedSiteId?: number;
  /** Time in UTC when the app was deleted. */
  readonly deletedTimestamp?: string;
  /** Subscription containing the deleted site */
  readonly subscription?: string;
  /** ResourceGroup that contained the deleted site */
  readonly resourceGroup?: string;
  /** Name of the deleted site */
  readonly deletedSiteName?: string;
  /** Slot of the deleted site */
  readonly slot?: string;
  /** Kind of site that was deleted */
  readonly kind?: string;
  /** Geo Region of the deleted site */
  readonly geoRegionName?: string;
}

export function deletedSitePropertiesDeserializer(item: any): DeletedSiteProperties {
  return {
    deletedSiteId: item["deletedSiteId"],
    deletedTimestamp: item["deletedTimestamp"],
    subscription: item["subscription"],
    resourceGroup: item["resourceGroup"],
    deletedSiteName: item["deletedSiteName"],
    slot: item["slot"],
    kind: item["kind"],
    geoRegionName: item["geoRegionName"],
  };
}

/** Class representing Response from Detector */
export interface DetectorResponse extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** metadata for the detector */
  metadata?: DetectorInfo;
  /** Data Set */
  dataset?: DiagnosticData[];
  /** Indicates status of the most severe insight. */
  status?: Status;
  /** Additional configuration for different data providers to be used by the UI */
  dataProvidersMetadata?: DataProviderMetadata[];
  /** Suggested utterances where the detector can be applicable. */
  suggestedUtterances?: QueryUtterancesResults;
}

export function detectorResponseDeserializer(item: any): DetectorResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _detectorResponsePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** DetectorResponse resource specific properties */
export interface DetectorResponseProperties {
  /** metadata for the detector */
  metadata?: DetectorInfo;
  /** Data Set */
  dataset?: DiagnosticData[];
  /** Indicates status of the most severe insight. */
  status?: Status;
  /** Additional configuration for different data providers to be used by the UI */
  dataProvidersMetadata?: DataProviderMetadata[];
  /** Suggested utterances where the detector can be applicable. */
  suggestedUtterances?: QueryUtterancesResults;
}

export function detectorResponsePropertiesDeserializer(item: any): DetectorResponseProperties {
  return {
    metadata: !item["metadata"] ? item["metadata"] : detectorInfoDeserializer(item["metadata"]),
    dataset: !item["dataset"] ? item["dataset"] : diagnosticDataArrayDeserializer(item["dataset"]),
    status: !item["status"] ? item["status"] : statusDeserializer(item["status"]),
    dataProvidersMetadata: !item["dataProvidersMetadata"]
      ? item["dataProvidersMetadata"]
      : dataProviderMetadataArrayDeserializer(item["dataProvidersMetadata"]),
    suggestedUtterances: !item["suggestedUtterances"]
      ? item["suggestedUtterances"]
      : queryUtterancesResultsDeserializer(item["suggestedUtterances"]),
  };
}

/** Definition of Detector */
export interface DetectorInfo {
  /** Id of detector */
  readonly id?: string;
  /** Name of detector */
  readonly name?: string;
  /** Short description of the detector and its purpose. */
  readonly description?: string;
  /** Author of the detector. */
  readonly author?: string;
  /** Problem category. This serves for organizing group for detectors. */
  readonly category?: string;
  /** List of Support Topics for which this detector is enabled. */
  readonly supportTopicList?: SupportTopic[];
  /** Analysis Types for which this detector should apply to. */
  readonly analysisType?: string[];
  /** Whether this detector is an Analysis Detector or not. */
  readonly type?: DetectorType;
  /** Defines score of a detector to power ML based matching. */
  readonly score?: number;
}

export function detectorInfoDeserializer(item: any): DetectorInfo {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    author: item["author"],
    category: item["category"],
    supportTopicList: !item["supportTopicList"]
      ? item["supportTopicList"]
      : supportTopicArrayDeserializer(item["supportTopicList"]),
    analysisType: !item["analysisType"]
      ? item["analysisType"]
      : item["analysisType"].map((p: any) => {
          return p;
        }),
    type: item["type"],
    score: item["score"],
  };
}

export function supportTopicArrayDeserializer(result: Array<SupportTopic>): any[] {
  return result.map((item) => {
    return supportTopicDeserializer(item);
  });
}

/** Defines a unique Support Topic */
export interface SupportTopic {
  /** Support Topic Id */
  readonly id?: string;
  /** Unique resource Id */
  readonly pesId?: string;
}

export function supportTopicDeserializer(item: any): SupportTopic {
  return {
    id: item["id"],
    pesId: item["pesId"],
  };
}

/** Whether this detector is an Analysis Detector or not. */
export type DetectorType = "Detector" | "Analysis" | "CategoryOverview";

export function diagnosticDataArrayDeserializer(result: Array<DiagnosticData>): any[] {
  return result.map((item) => {
    return diagnosticDataDeserializer(item);
  });
}

/** Set of data with rendering instructions */
export interface DiagnosticData {
  /** Data in table form */
  table?: DataTableResponseObject;
  /** Properties that describe how the table should be rendered */
  renderingProperties?: Rendering;
}

export function diagnosticDataDeserializer(item: any): DiagnosticData {
  return {
    table: !item["table"] ? item["table"] : dataTableResponseObjectDeserializer(item["table"]),
    renderingProperties: !item["renderingProperties"]
      ? item["renderingProperties"]
      : renderingDeserializer(item["renderingProperties"]),
  };
}

/** Data Table which defines columns and raw row values */
export interface DataTableResponseObject {
  /** Name of the table */
  tableName?: string;
  /** List of columns with data types */
  columns?: DataTableResponseColumn[];
  /** Raw row values */
  rows?: string[][];
}

export function dataTableResponseObjectDeserializer(item: any): DataTableResponseObject {
  return {
    tableName: item["tableName"],
    columns: !item["columns"]
      ? item["columns"]
      : dataTableResponseColumnArrayDeserializer(item["columns"]),
    rows: !item["rows"]
      ? item["rows"]
      : item["rows"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
  };
}

export function dataTableResponseColumnArrayDeserializer(
  result: Array<DataTableResponseColumn>,
): any[] {
  return result.map((item) => {
    return dataTableResponseColumnDeserializer(item);
  });
}

/** Column definition */
export interface DataTableResponseColumn {
  /** Name of the column */
  columnName?: string;
  /** Data type which looks like 'String' or 'Int32'. */
  dataType?: string;
  /** Column Type */
  columnType?: string;
}

export function dataTableResponseColumnDeserializer(item: any): DataTableResponseColumn {
  return {
    columnName: item["columnName"],
    dataType: item["dataType"],
    columnType: item["columnType"],
  };
}

/** Instructions for rendering the data */
export interface Rendering {
  /** Rendering Type */
  type?: RenderingType;
  /** Title of data */
  title?: string;
  /** Description of the data that will help it be interpreted */
  description?: string;
}

export function renderingDeserializer(item: any): Rendering {
  return {
    type: item["type"],
    title: item["title"],
    description: item["description"],
  };
}

/** Rendering Type */
export type RenderingType =
  | "NoGraph"
  | "Table"
  | "TimeSeries"
  | "TimeSeriesPerInstance"
  | "PieChart"
  | "DataSummary"
  | "Email"
  | "Insights"
  | "DynamicInsight"
  | "Markdown"
  | "Detector"
  | "DropDown"
  | "Card"
  | "Solution"
  | "Guage"
  | "Form"
  | "ChangeSets"
  | "ChangeAnalysisOnboarding"
  | "ChangesView"
  | "AppInsight"
  | "DependencyGraph"
  | "DownTime"
  | "SummaryCard"
  | "SearchComponent"
  | "AppInsightEnablement";

/** Identify the status of the most severe insight generated by the detector. */
export interface Status {
  /** Descriptive message. */
  message?: string;
  /** Level of the most severe insight generated by the detector. */
  statusId?: InsightStatus;
}

export function statusDeserializer(item: any): Status {
  return {
    message: item["message"],
    statusId: item["statusId"],
  };
}

/** Level of the most severe insight generated by the detector. */
export type InsightStatus = "Critical" | "Warning" | "Info" | "Success" | "None";

export function dataProviderMetadataArrayDeserializer(result: Array<DataProviderMetadata>): any[] {
  return result.map((item) => {
    return dataProviderMetadataDeserializer(item);
  });
}

/** Additional configuration for a data providers */
export interface DataProviderMetadata {
  providerName?: string;
  /** Settings for the data provider */
  readonly propertyBag?: KeyValuePairStringObject[];
}

export function dataProviderMetadataDeserializer(item: any): DataProviderMetadata {
  return {
    providerName: item["providerName"],
    propertyBag: !item["propertyBag"]
      ? item["propertyBag"]
      : keyValuePairStringObjectArrayDeserializer(item["propertyBag"]),
  };
}

export function keyValuePairStringObjectArrayDeserializer(
  result: Array<KeyValuePairStringObject>,
): any[] {
  return result.map((item) => {
    return keyValuePairStringObjectDeserializer(item);
  });
}

/** model interface KeyValuePairStringObject */
export interface KeyValuePairStringObject {
  readonly key?: string;
  /** Any object */
  readonly value?: any;
}

export function keyValuePairStringObjectDeserializer(item: any): KeyValuePairStringObject {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** Suggested utterances where the detector can be applicable */
export interface QueryUtterancesResults {
  /** Search Query. */
  query?: string;
  /** Array of utterance results for search query. */
  results?: QueryUtterancesResult[];
}

export function queryUtterancesResultsDeserializer(item: any): QueryUtterancesResults {
  return {
    query: item["query"],
    results: !item["results"]
      ? item["results"]
      : queryUtterancesResultArrayDeserializer(item["results"]),
  };
}

export function queryUtterancesResultArrayDeserializer(
  result: Array<QueryUtterancesResult>,
): any[] {
  return result.map((item) => {
    return queryUtterancesResultDeserializer(item);
  });
}

/** Result for utterances query. */
export interface QueryUtterancesResult {
  /** A sample utterance. */
  sampleUtterance?: SampleUtterance;
  /** Score of a sample utterance. */
  score?: number;
}

export function queryUtterancesResultDeserializer(item: any): QueryUtterancesResult {
  return {
    sampleUtterance: !item["sampleUtterance"]
      ? item["sampleUtterance"]
      : sampleUtteranceDeserializer(item["sampleUtterance"]),
    score: item["score"],
  };
}

/** Sample utterance. */
export interface SampleUtterance {
  /** Text attribute of sample utterance. */
  text?: string;
  /** Links attribute of sample utterance. */
  links?: string[];
  /** Question id of sample utterance (for stackoverflow questions titles). */
  qid?: string;
}

export function sampleUtteranceDeserializer(item: any): SampleUtterance {
  return {
    text: item["text"],
    links: !item["links"]
      ? item["links"]
      : item["links"].map((p: any) => {
          return p;
        }),
    qid: item["qid"],
  };
}

/** Collection of detector responses */
export interface _DetectorResponseCollection {
  /** The DetectorResponse items on this page */
  value: DetectorResponse[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _detectorResponseCollectionDeserializer(item: any): _DetectorResponseCollection {
  return {
    value: detectorResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function detectorResponseArrayDeserializer(result: Array<DetectorResponse>): any[] {
  return result.map((item) => {
    return detectorResponseDeserializer(item);
  });
}

/** Class representing detector definition */
export interface DiagnosticCategory extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Description of the diagnostic category */
  readonly description?: string;
}

export function diagnosticCategoryDeserializer(item: any): DiagnosticCategory {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _diagnosticCategoryPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** DiagnosticCategory resource specific properties */
export interface DiagnosticCategoryProperties {
  /** Description of the diagnostic category */
  readonly description?: string;
}

export function diagnosticCategoryPropertiesDeserializer(item: any): DiagnosticCategoryProperties {
  return {
    description: item["description"],
  };
}

/** Collection of Diagnostic Categories */
export interface _DiagnosticCategoryCollection {
  /** The DiagnosticCategory items on this page */
  value: DiagnosticCategory[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _diagnosticCategoryCollectionDeserializer(
  item: any,
): _DiagnosticCategoryCollection {
  return {
    value: diagnosticCategoryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function diagnosticCategoryArrayDeserializer(result: Array<DiagnosticCategory>): any[] {
  return result.map((item) => {
    return diagnosticCategoryDeserializer(item);
  });
}

/** Definition of Analysis */
export interface AnalysisDefinition extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Description of the Analysis */
  readonly description?: string;
}

export function analysisDefinitionDeserializer(item: any): AnalysisDefinition {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _analysisDefinitionPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** AnalysisDefinition resource specific properties */
export interface AnalysisDefinitionProperties {
  /** Description of the Analysis */
  readonly description?: string;
}

export function analysisDefinitionPropertiesDeserializer(item: any): AnalysisDefinitionProperties {
  return {
    description: item["description"],
  };
}

/** Collection of Diagnostic Analyses */
export interface _DiagnosticAnalysisCollection {
  /** The AnalysisDefinition items on this page */
  value: AnalysisDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _diagnosticAnalysisCollectionDeserializer(
  item: any,
): _DiagnosticAnalysisCollection {
  return {
    value: analysisDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function analysisDefinitionArrayDeserializer(result: Array<AnalysisDefinition>): any[] {
  return result.map((item) => {
    return analysisDefinitionDeserializer(item);
  });
}

/** Class representing a diagnostic analysis done on an application */
export interface DiagnosticAnalysis extends ProxyOnlyResource {
  /** Start time of the period */
  startTime?: Date;
  /** End time of the period */
  endTime?: Date;
  /** List of time periods. */
  abnormalTimePeriods?: AbnormalTimePeriod[];
  /** Data by each detector */
  payload?: AnalysisData[];
  /** Data by each detector for detectors that did not corelate */
  nonCorrelatedDetectors?: DetectorDefinition[];
}

export function diagnosticAnalysisDeserializer(item: any): DiagnosticAnalysis {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _diagnosticAnalysisPropertiesDeserializer(item["properties"])),
  };
}

/** DiagnosticAnalysis resource specific properties */
export interface DiagnosticAnalysisProperties {
  /** Start time of the period */
  startTime?: Date;
  /** End time of the period */
  endTime?: Date;
  /** List of time periods. */
  abnormalTimePeriods?: AbnormalTimePeriod[];
  /** Data by each detector */
  payload?: AnalysisData[];
  /** Data by each detector for detectors that did not corelate */
  nonCorrelatedDetectors?: DetectorDefinition[];
}

export function diagnosticAnalysisPropertiesDeserializer(item: any): DiagnosticAnalysisProperties {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    abnormalTimePeriods: !item["abnormalTimePeriods"]
      ? item["abnormalTimePeriods"]
      : abnormalTimePeriodArrayDeserializer(item["abnormalTimePeriods"]),
    payload: !item["payload"] ? item["payload"] : analysisDataArrayDeserializer(item["payload"]),
    nonCorrelatedDetectors: !item["nonCorrelatedDetectors"]
      ? item["nonCorrelatedDetectors"]
      : detectorDefinitionArrayDeserializer(item["nonCorrelatedDetectors"]),
  };
}

export function abnormalTimePeriodArrayDeserializer(result: Array<AbnormalTimePeriod>): any[] {
  return result.map((item) => {
    return abnormalTimePeriodDeserializer(item);
  });
}

/** Class representing Abnormal Time Period identified in diagnosis */
export interface AbnormalTimePeriod {
  /** Start time of the downtime */
  startTime?: Date;
  /** End time of the downtime */
  endTime?: Date;
  /** List of Possible Cause of downtime */
  events?: DetectorAbnormalTimePeriod[];
  /** List of proposed solutions */
  solutions?: Solution[];
}

export function abnormalTimePeriodDeserializer(item: any): AbnormalTimePeriod {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    events: !item["events"]
      ? item["events"]
      : detectorAbnormalTimePeriodArrayDeserializer(item["events"]),
    solutions: !item["solutions"]
      ? item["solutions"]
      : solutionArrayDeserializer(item["solutions"]),
  };
}

export function detectorAbnormalTimePeriodArrayDeserializer(
  result: Array<DetectorAbnormalTimePeriod>,
): any[] {
  return result.map((item) => {
    return detectorAbnormalTimePeriodDeserializer(item);
  });
}

/** Class representing Abnormal Time Period detected. */
export interface DetectorAbnormalTimePeriod {
  /** Start time of the correlated event */
  startTime?: Date;
  /** End time of the correlated event */
  endTime?: Date;
  /** Message describing the event */
  message?: string;
  /** Represents the name of the Detector */
  source?: string;
  /** Represents the rank of the Detector */
  priority?: number;
  /** Downtime metadata */
  metaData?: NameValuePair[][];
  /** Represents the type of the Detector */
  type?: IssueType;
  /** List of proposed solutions */
  solutions?: Solution[];
}

export function detectorAbnormalTimePeriodDeserializer(item: any): DetectorAbnormalTimePeriod {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    message: item["message"],
    source: item["source"],
    priority: item["priority"],
    metaData: !item["metaData"]
      ? item["metaData"]
      : nameValuePairArrayArrayDeserializer(item["metaData"]),
    type: item["type"],
    solutions: !item["solutions"]
      ? item["solutions"]
      : solutionArrayDeserializer(item["solutions"]),
  };
}

export function nameValuePairArrayArraySerializer(result: Array<Array<NameValuePair>>): any[] {
  return result.map((item) => {
    return nameValuePairArraySerializer(item);
  });
}

export function nameValuePairArrayArrayDeserializer(result: Array<Array<NameValuePair>>): any[] {
  return result.map((item) => {
    return nameValuePairArrayDeserializer(item);
  });
}

/** Represents the type of the Detector */
export type IssueType =
  | "ServiceIncident"
  | "AppDeployment"
  | "AppCrash"
  | "RuntimeIssueDetected"
  | "AseDeployment"
  | "UserIssue"
  | "PlatformIssue"
  | "Other";

export function solutionArrayDeserializer(result: Array<Solution>): any[] {
  return result.map((item) => {
    return solutionDeserializer(item);
  });
}

/** Class Representing Solution for problems detected. */
export interface Solution {
  /** Solution Id. */
  id?: number;
  /** Display Name of the solution */
  displayName?: string;
  /** Order of the solution. */
  order?: number;
  /** Description of the solution */
  description?: string;
  /** Type of Solution */
  type?: SolutionType;
  /** Solution Data. */
  data?: NameValuePair[][];
  /** Solution Metadata. */
  metadata?: NameValuePair[][];
}

export function solutionDeserializer(item: any): Solution {
  return {
    id: item["id"],
    displayName: item["displayName"],
    order: item["order"],
    description: item["description"],
    type: item["type"],
    data: !item["data"] ? item["data"] : nameValuePairArrayArrayDeserializer(item["data"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : nameValuePairArrayArrayDeserializer(item["metadata"]),
  };
}

/** Type of Solution */
export type SolutionType = "QuickSolution" | "DeepInvestigation" | "BestPractices";

export function analysisDataArrayDeserializer(result: Array<AnalysisData>): any[] {
  return result.map((item) => {
    return analysisDataDeserializer(item);
  });
}

/** Class Representing Detector Evidence used for analysis */
export interface AnalysisData {
  /** Name of the Detector */
  source?: string;
  /** Detector Definition */
  detectorDefinition?: DetectorDefinition;
  /** Source Metrics */
  metrics?: DiagnosticMetricSet[];
  /** Additional Source Data */
  data?: NameValuePair[][];
  /** Detector Meta Data */
  detectorMetaData?: ResponseMetaData;
}

export function analysisDataDeserializer(item: any): AnalysisData {
  return {
    source: item["source"],
    detectorDefinition: !item["detectorDefinition"]
      ? item["detectorDefinition"]
      : detectorDefinitionDeserializer(item["detectorDefinition"]),
    metrics: !item["metrics"]
      ? item["metrics"]
      : diagnosticMetricSetArrayDeserializer(item["metrics"]),
    data: !item["data"] ? item["data"] : nameValuePairArrayArrayDeserializer(item["data"]),
    detectorMetaData: !item["detectorMetaData"]
      ? item["detectorMetaData"]
      : responseMetaDataDeserializer(item["detectorMetaData"]),
  };
}

/** Class representing detector definition */
export interface DetectorDefinition {
  /** Display name of the detector */
  readonly displayName?: string;
  /** Description of the detector */
  readonly description?: string;
  /** Detector Rank */
  readonly rank?: number;
  /** Flag representing whether detector is enabled or not. */
  readonly isEnabled?: boolean;
}

export function detectorDefinitionDeserializer(item: any): DetectorDefinition {
  return {
    displayName: item["displayName"],
    description: item["description"],
    rank: item["rank"],
    isEnabled: item["isEnabled"],
  };
}

export function diagnosticMetricSetArrayDeserializer(result: Array<DiagnosticMetricSet>): any[] {
  return result.map((item) => {
    return diagnosticMetricSetDeserializer(item);
  });
}

/** Class representing Diagnostic Metric information */
export interface DiagnosticMetricSet {
  /** Name of the metric */
  name?: string;
  /** Metric's unit */
  unit?: string;
  /** Start time of the period */
  startTime?: Date;
  /** End time of the period */
  endTime?: Date;
  /** Presented time grain. Supported grains at the moment are PT1M, PT1H, P1D */
  timeGrain?: string;
  /** Collection of metric values for the selected period based on the {Microsoft.Web.Hosting.Administration.DiagnosticMetricSet.TimeGrain} */
  values?: DiagnosticMetricSample[];
}

export function diagnosticMetricSetDeserializer(item: any): DiagnosticMetricSet {
  return {
    name: item["name"],
    unit: item["unit"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    timeGrain: item["timeGrain"],
    values: !item["values"]
      ? item["values"]
      : diagnosticMetricSampleArrayDeserializer(item["values"]),
  };
}

export function diagnosticMetricSampleArrayDeserializer(
  result: Array<DiagnosticMetricSample>,
): any[] {
  return result.map((item) => {
    return diagnosticMetricSampleDeserializer(item);
  });
}

/** Class representing Diagnostic Metric */
export interface DiagnosticMetricSample {
  /** Time at which metric is measured */
  timestamp?: Date;
  /**
   * Role Instance. Null if this counter is not per instance
   * This is returned and should be whichever instance name we desire to be returned
   * i.e. CPU and Memory return RDWORKERNAME (LargeDed..._IN_0)
   * where RDWORKERNAME is Machine name below and RoleInstance name in parenthesis
   */
  roleInstance?: string;
  /** Total value of the metric. If multiple measurements are made this will have sum of all. */
  total?: number;
  /** Maximum of the metric sampled during the time period */
  maximum?: number;
  /** Minimum of the metric sampled during the time period */
  minimum?: number;
  /** Whether the values are aggregates across all workers or not */
  isAggregated?: boolean;
}

export function diagnosticMetricSampleDeserializer(item: any): DiagnosticMetricSample {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    roleInstance: item["roleInstance"],
    total: item["total"],
    maximum: item["maximum"],
    minimum: item["minimum"],
    isAggregated: item["isAggregated"],
  };
}

/** model interface ResponseMetaData */
export interface ResponseMetaData {
  /** Source of the Data */
  dataSource?: DataSource;
}

export function responseMetaDataDeserializer(item: any): ResponseMetaData {
  return {
    dataSource: !item["dataSource"]
      ? item["dataSource"]
      : dataSourceDeserializer(item["dataSource"]),
  };
}

/** Class representing data source used by the detectors */
export interface DataSource {
  /** Instructions if any for the data source */
  instructions?: string[];
  /** Datasource Uri Links */
  dataSourceUri?: NameValuePair[];
}

export function dataSourceDeserializer(item: any): DataSource {
  return {
    instructions: !item["instructions"]
      ? item["instructions"]
      : item["instructions"].map((p: any) => {
          return p;
        }),
    dataSourceUri: !item["dataSourceUri"]
      ? item["dataSourceUri"]
      : nameValuePairArrayDeserializer(item["dataSourceUri"]),
  };
}

export function detectorDefinitionArrayDeserializer(result: Array<DetectorDefinition>): any[] {
  return result.map((item) => {
    return detectorDefinitionDeserializer(item);
  });
}

/** ARM resource for a detector definition */
export interface DetectorDefinitionResource extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** Display name of the detector */
  readonly displayName?: string;
  /** Description of the detector */
  readonly description?: string;
  /** Detector Rank */
  readonly rank?: number;
  /** Flag representing whether detector is enabled or not. */
  readonly isEnabled?: boolean;
}

export function detectorDefinitionResourceDeserializer(item: any): DetectorDefinitionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _detectorDefinitionResourcePropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** Collection of Diagnostic Detectors */
export interface _DiagnosticDetectorCollection {
  /** The DetectorDefinitionResource items on this page */
  value: DetectorDefinitionResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _diagnosticDetectorCollectionDeserializer(
  item: any,
): _DiagnosticDetectorCollection {
  return {
    value: detectorDefinitionResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function detectorDefinitionResourceArrayDeserializer(
  result: Array<DetectorDefinitionResource>,
): any[] {
  return result.map((item) => {
    return detectorDefinitionResourceDeserializer(item);
  });
}

/** Class representing Response from Diagnostic Detectors */
export interface DiagnosticDetectorResponse extends ProxyOnlyResource {
  /** Start time of the period */
  startTime?: Date;
  /** End time of the period */
  endTime?: Date;
  /** Flag representing Issue was detected. */
  issueDetected?: boolean;
  /** Detector's definition */
  detectorDefinition?: DetectorDefinition;
  /** Metrics provided by the detector */
  metrics?: DiagnosticMetricSet[];
  /** List of Correlated events found by the detector */
  abnormalTimePeriods?: DetectorAbnormalTimePeriod[];
  /** Additional Data that detector wants to send. */
  data?: NameValuePair[][];
  /** Meta Data */
  responseMetaData?: ResponseMetaData;
}

export function diagnosticDetectorResponseDeserializer(item: any): DiagnosticDetectorResponse {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _diagnosticDetectorResponsePropertiesDeserializer(item["properties"])),
  };
}

/** DiagnosticDetectorResponse resource specific properties */
export interface DiagnosticDetectorResponseProperties {
  /** Start time of the period */
  startTime?: Date;
  /** End time of the period */
  endTime?: Date;
  /** Flag representing Issue was detected. */
  issueDetected?: boolean;
  /** Detector's definition */
  detectorDefinition?: DetectorDefinition;
  /** Metrics provided by the detector */
  metrics?: DiagnosticMetricSet[];
  /** List of Correlated events found by the detector */
  abnormalTimePeriods?: DetectorAbnormalTimePeriod[];
  /** Additional Data that detector wants to send. */
  data?: NameValuePair[][];
  /** Meta Data */
  responseMetaData?: ResponseMetaData;
}

export function diagnosticDetectorResponsePropertiesDeserializer(
  item: any,
): DiagnosticDetectorResponseProperties {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    issueDetected: item["issueDetected"],
    detectorDefinition: !item["detectorDefinition"]
      ? item["detectorDefinition"]
      : detectorDefinitionDeserializer(item["detectorDefinition"]),
    metrics: !item["metrics"]
      ? item["metrics"]
      : diagnosticMetricSetArrayDeserializer(item["metrics"]),
    abnormalTimePeriods: !item["abnormalTimePeriods"]
      ? item["abnormalTimePeriods"]
      : detectorAbnormalTimePeriodArrayDeserializer(item["abnormalTimePeriods"]),
    data: !item["data"] ? item["data"] : nameValuePairArrayArrayDeserializer(item["data"]),
    responseMetaData: !item["responseMetaData"]
      ? item["responseMetaData"]
      : responseMetaDataDeserializer(item["responseMetaData"]),
  };
}

/** A Kubernetes cluster specialized for web workloads by Azure App Service */
export interface KubeEnvironment extends TrackedResource {
  /** Extended Location. */
  extendedLocation?: ExtendedLocation;
  /** Kind of resource. */
  kind?: string;
  /** Provisioning state of the Kubernetes Environment. */
  readonly provisioningState?: KubeEnvironmentProvisioningState;
  /** Any errors that occurred during deployment or deployment validation */
  readonly deploymentErrors?: string;
  /** Only visible within Vnet/Subnet */
  internalLoadBalancerEnabled?: boolean;
  /** Default Domain Name for the cluster */
  readonly defaultDomain?: string;
  /** Static IP of the KubeEnvironment */
  staticIp?: string;
  /** Type of Kubernetes Environment. Only supported for Container App Environments with value as Managed */
  environmentType?: string;
  /**
   * Cluster configuration which determines the ARC cluster
   * components types. Eg: Choosing between BuildService kind,
   * FrontEnd Service ArtifactsStorageType etc.
   */
  arcConfiguration?: ArcConfiguration;
  /**
   * Cluster configuration which enables the log daemon to export
   * app logs to a destination. Currently only "log-analytics" is
   * supported
   */
  appLogsConfiguration?: AppLogsConfiguration;
  /** Cluster configuration for Container Apps Environments to configure Dapr Instrumentation Key and VNET Configuration */
  containerAppsConfiguration?: ContainerAppsConfiguration;
  aksResourceID?: string;
}

export function kubeEnvironmentSerializer(item: KubeEnvironment): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "internalLoadBalancerEnabled",
      "staticIp",
      "environmentType",
      "arcConfiguration",
      "appLogsConfiguration",
      "containerAppsConfiguration",
      "aksResourceID",
    ])
      ? undefined
      : _kubeEnvironmentPropertiesSerializer(item),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    kind: item["kind"],
  };
}

export function kubeEnvironmentDeserializer(item: any): KubeEnvironment {
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
      : _kubeEnvironmentPropertiesDeserializer(item["properties"])),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    kind: item["kind"],
  };
}

/** KubeEnvironment resource specific properties */
export interface KubeEnvironmentProperties {
  /** Provisioning state of the Kubernetes Environment. */
  readonly provisioningState?: KubeEnvironmentProvisioningState;
  /** Any errors that occurred during deployment or deployment validation */
  readonly deploymentErrors?: string;
  /** Only visible within Vnet/Subnet */
  internalLoadBalancerEnabled?: boolean;
  /** Default Domain Name for the cluster */
  readonly defaultDomain?: string;
  /** Static IP of the KubeEnvironment */
  staticIp?: string;
  /** Type of Kubernetes Environment. Only supported for Container App Environments with value as Managed */
  environmentType?: string;
  /**
   * Cluster configuration which determines the ARC cluster
   * components types. Eg: Choosing between BuildService kind,
   * FrontEnd Service ArtifactsStorageType etc.
   */
  arcConfiguration?: ArcConfiguration;
  /**
   * Cluster configuration which enables the log daemon to export
   * app logs to a destination. Currently only "log-analytics" is
   * supported
   */
  appLogsConfiguration?: AppLogsConfiguration;
  /** Cluster configuration for Container Apps Environments to configure Dapr Instrumentation Key and VNET Configuration */
  containerAppsConfiguration?: ContainerAppsConfiguration;
  aksResourceID?: string;
}

export function kubeEnvironmentPropertiesSerializer(item: KubeEnvironmentProperties): any {
  return {
    internalLoadBalancerEnabled: item["internalLoadBalancerEnabled"],
    staticIp: item["staticIp"],
    environmentType: item["environmentType"],
    arcConfiguration: !item["arcConfiguration"]
      ? item["arcConfiguration"]
      : arcConfigurationSerializer(item["arcConfiguration"]),
    appLogsConfiguration: !item["appLogsConfiguration"]
      ? item["appLogsConfiguration"]
      : appLogsConfigurationSerializer(item["appLogsConfiguration"]),
    containerAppsConfiguration: !item["containerAppsConfiguration"]
      ? item["containerAppsConfiguration"]
      : containerAppsConfigurationSerializer(item["containerAppsConfiguration"]),
    aksResourceID: item["aksResourceID"],
  };
}

export function kubeEnvironmentPropertiesDeserializer(item: any): KubeEnvironmentProperties {
  return {
    provisioningState: item["provisioningState"],
    deploymentErrors: item["deploymentErrors"],
    internalLoadBalancerEnabled: item["internalLoadBalancerEnabled"],
    defaultDomain: item["defaultDomain"],
    staticIp: item["staticIp"],
    environmentType: item["environmentType"],
    arcConfiguration: !item["arcConfiguration"]
      ? item["arcConfiguration"]
      : arcConfigurationDeserializer(item["arcConfiguration"]),
    appLogsConfiguration: !item["appLogsConfiguration"]
      ? item["appLogsConfiguration"]
      : appLogsConfigurationDeserializer(item["appLogsConfiguration"]),
    containerAppsConfiguration: !item["containerAppsConfiguration"]
      ? item["containerAppsConfiguration"]
      : containerAppsConfigurationDeserializer(item["containerAppsConfiguration"]),
    aksResourceID: item["aksResourceID"],
  };
}

/** Provisioning state of the Kubernetes Environment. */
export type KubeEnvironmentProvisioningState =
  | "Succeeded"
  | "Failed"
  | "Canceled"
  | "Waiting"
  | "InitializationInProgress"
  | "InfrastructureSetupInProgress"
  | "InfrastructureSetupComplete"
  | "ScheduledForDelete"
  | "UpgradeRequested"
  | "UpgradeFailed";

/** model interface ArcConfiguration */
export interface ArcConfiguration {
  artifactsStorageType?: StorageType;
  artifactStorageClassName?: string;
  artifactStorageMountPath?: string;
  artifactStorageNodeName?: string;
  artifactStorageAccessMode?: string;
  frontEndServiceConfiguration?: FrontEndConfiguration;
  kubeConfig?: string;
}

export function arcConfigurationSerializer(item: ArcConfiguration): any {
  return {
    artifactsStorageType: item["artifactsStorageType"],
    artifactStorageClassName: item["artifactStorageClassName"],
    artifactStorageMountPath: item["artifactStorageMountPath"],
    artifactStorageNodeName: item["artifactStorageNodeName"],
    artifactStorageAccessMode: item["artifactStorageAccessMode"],
    frontEndServiceConfiguration: !item["frontEndServiceConfiguration"]
      ? item["frontEndServiceConfiguration"]
      : frontEndConfigurationSerializer(item["frontEndServiceConfiguration"]),
    kubeConfig: item["kubeConfig"],
  };
}

export function arcConfigurationDeserializer(item: any): ArcConfiguration {
  return {
    artifactsStorageType: item["artifactsStorageType"],
    artifactStorageClassName: item["artifactStorageClassName"],
    artifactStorageMountPath: item["artifactStorageMountPath"],
    artifactStorageNodeName: item["artifactStorageNodeName"],
    artifactStorageAccessMode: item["artifactStorageAccessMode"],
    frontEndServiceConfiguration: !item["frontEndServiceConfiguration"]
      ? item["frontEndServiceConfiguration"]
      : frontEndConfigurationDeserializer(item["frontEndServiceConfiguration"]),
    kubeConfig: item["kubeConfig"],
  };
}

/** Type of StorageType */
export type StorageType = "LocalNode" | "NetworkFileSystem";

/** model interface FrontEndConfiguration */
export interface FrontEndConfiguration {
  kind?: FrontEndServiceType;
}

export function frontEndConfigurationSerializer(item: FrontEndConfiguration): any {
  return { kind: item["kind"] };
}

export function frontEndConfigurationDeserializer(item: any): FrontEndConfiguration {
  return {
    kind: item["kind"],
  };
}

/** Type of FrontEndServiceType */
export type FrontEndServiceType = "NodePort" | "LoadBalancer";

/** model interface AppLogsConfiguration */
export interface AppLogsConfiguration {
  destination?: string;
  logAnalyticsConfiguration?: LogAnalyticsConfiguration;
}

export function appLogsConfigurationSerializer(item: AppLogsConfiguration): any {
  return {
    destination: item["destination"],
    logAnalyticsConfiguration: !item["logAnalyticsConfiguration"]
      ? item["logAnalyticsConfiguration"]
      : logAnalyticsConfigurationSerializer(item["logAnalyticsConfiguration"]),
  };
}

export function appLogsConfigurationDeserializer(item: any): AppLogsConfiguration {
  return {
    destination: item["destination"],
    logAnalyticsConfiguration: !item["logAnalyticsConfiguration"]
      ? item["logAnalyticsConfiguration"]
      : logAnalyticsConfigurationDeserializer(item["logAnalyticsConfiguration"]),
  };
}

/** model interface LogAnalyticsConfiguration */
export interface LogAnalyticsConfiguration {
  customerId?: string;
  sharedKey?: string;
}

export function logAnalyticsConfigurationSerializer(item: LogAnalyticsConfiguration): any {
  return { customerId: item["customerId"], sharedKey: item["sharedKey"] };
}

export function logAnalyticsConfigurationDeserializer(item: any): LogAnalyticsConfiguration {
  return {
    customerId: item["customerId"],
    sharedKey: item["sharedKey"],
  };
}

/** model interface ContainerAppsConfiguration */
export interface ContainerAppsConfiguration {
  /** Azure Monitor instrumentation key used by Dapr to export Service to Service communication telemetry */
  daprAIInstrumentationKey?: string;
  /** IP range in CIDR notation that can be reserved for environment infrastructure IP addresses. It must not overlap with any other Subnet IP ranges. */
  platformReservedCidr?: string;
  /** An IP address from the IP range defined by platformReservedCidr that will be reserved for the internal DNS server */
  platformReservedDnsIP?: string;
  /** Resource ID of a subnet for control plane infrastructure components. This subnet must be in the same VNET as the subnet defined in appSubnetResourceId. Must not overlap with the IP range defined in platformReservedCidr, if defined. */
  controlPlaneSubnetResourceId?: string;
  /** Resource ID of a subnet for control plane infrastructure components. This subnet must be in the same VNET as the subnet defined in appSubnetResourceId. Must not overlap with the IP range defined in platformReservedCidr, if defined. */
  appSubnetResourceId?: string;
  /** CIDR notation IP range assigned to the Docker bridge network. It must not overlap with any Subnet IP ranges or the IP range defined in platformReservedCidr, if defined. */
  dockerBridgeCidr?: string;
}

export function containerAppsConfigurationSerializer(item: ContainerAppsConfiguration): any {
  return {
    daprAIInstrumentationKey: item["daprAIInstrumentationKey"],
    platformReservedCidr: item["platformReservedCidr"],
    platformReservedDnsIP: item["platformReservedDnsIP"],
    controlPlaneSubnetResourceId: item["controlPlaneSubnetResourceId"],
    appSubnetResourceId: item["appSubnetResourceId"],
    dockerBridgeCidr: item["dockerBridgeCidr"],
  };
}

export function containerAppsConfigurationDeserializer(item: any): ContainerAppsConfiguration {
  return {
    daprAIInstrumentationKey: item["daprAIInstrumentationKey"],
    platformReservedCidr: item["platformReservedCidr"],
    platformReservedDnsIP: item["platformReservedDnsIP"],
    controlPlaneSubnetResourceId: item["controlPlaneSubnetResourceId"],
    appSubnetResourceId: item["appSubnetResourceId"],
    dockerBridgeCidr: item["dockerBridgeCidr"],
  };
}

/** ARM resource for a KubeEnvironment when patching */
export interface KubeEnvironmentPatchResource extends ProxyOnlyResource {
  /** Provisioning state of the Kubernetes Environment. */
  readonly provisioningState?: KubeEnvironmentProvisioningState;
  /** Any errors that occurred during deployment or deployment validation */
  readonly deploymentErrors?: string;
  /** Only visible within Vnet/Subnet */
  internalLoadBalancerEnabled?: boolean;
  /** Default Domain Name for the cluster */
  readonly defaultDomain?: string;
  /** Static IP of the KubeEnvironment */
  staticIp?: string;
  /**
   * Cluster configuration which determines the ARC cluster
   * components types. Eg: Choosing between BuildService kind,
   * FrontEnd Service ArtifactsStorageType etc.
   */
  arcConfiguration?: ArcConfiguration;
  /**
   * Cluster configuration which enables the log daemon to export
   * app logs to a destination. Currently only "log-analytics" is
   * supported
   */
  appLogsConfiguration?: AppLogsConfiguration;
  /** Cluster configuration for Container Apps Environments to configure Dapr Instrumentation Key and VNET Configuration */
  containerAppsConfiguration?: ContainerAppsConfiguration;
  aksResourceID?: string;
}

export function kubeEnvironmentPatchResourceSerializer(item: KubeEnvironmentPatchResource): any {
  return {
    kind: item["kind"],
    properties: areAllPropsUndefined(item, [
      "internalLoadBalancerEnabled",
      "staticIp",
      "arcConfiguration",
      "appLogsConfiguration",
      "containerAppsConfiguration",
      "aksResourceID",
    ])
      ? undefined
      : _kubeEnvironmentPatchResourcePropertiesSerializer(item),
  };
}

/** KubeEnvironmentPatchResource resource specific properties */
export interface KubeEnvironmentPatchResourceProperties {
  /** Provisioning state of the Kubernetes Environment. */
  readonly provisioningState?: KubeEnvironmentProvisioningState;
  /** Any errors that occurred during deployment or deployment validation */
  readonly deploymentErrors?: string;
  /** Only visible within Vnet/Subnet */
  internalLoadBalancerEnabled?: boolean;
  /** Default Domain Name for the cluster */
  readonly defaultDomain?: string;
  /** Static IP of the KubeEnvironment */
  staticIp?: string;
  /**
   * Cluster configuration which determines the ARC cluster
   * components types. Eg: Choosing between BuildService kind,
   * FrontEnd Service ArtifactsStorageType etc.
   */
  arcConfiguration?: ArcConfiguration;
  /**
   * Cluster configuration which enables the log daemon to export
   * app logs to a destination. Currently only "log-analytics" is
   * supported
   */
  appLogsConfiguration?: AppLogsConfiguration;
  /** Cluster configuration for Container Apps Environments to configure Dapr Instrumentation Key and VNET Configuration */
  containerAppsConfiguration?: ContainerAppsConfiguration;
  aksResourceID?: string;
}

export function kubeEnvironmentPatchResourcePropertiesSerializer(
  item: KubeEnvironmentPatchResourceProperties,
): any {
  return {
    internalLoadBalancerEnabled: item["internalLoadBalancerEnabled"],
    staticIp: item["staticIp"],
    arcConfiguration: !item["arcConfiguration"]
      ? item["arcConfiguration"]
      : arcConfigurationSerializer(item["arcConfiguration"]),
    appLogsConfiguration: !item["appLogsConfiguration"]
      ? item["appLogsConfiguration"]
      : appLogsConfigurationSerializer(item["appLogsConfiguration"]),
    containerAppsConfiguration: !item["containerAppsConfiguration"]
      ? item["containerAppsConfiguration"]
      : containerAppsConfigurationSerializer(item["containerAppsConfiguration"]),
    aksResourceID: item["aksResourceID"],
  };
}

/** Collection of Kubernetes Environments */
export interface _KubeEnvironmentCollection {
  /** The KubeEnvironment items on this page */
  value: KubeEnvironment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _kubeEnvironmentCollectionDeserializer(item: any): _KubeEnvironmentCollection {
  return {
    value: kubeEnvironmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function kubeEnvironmentArraySerializer(result: Array<KubeEnvironment>): any[] {
  return result.map((item) => {
    return kubeEnvironmentSerializer(item);
  });
}

export function kubeEnvironmentArrayDeserializer(result: Array<KubeEnvironment>): any[] {
  return result.map((item) => {
    return kubeEnvironmentDeserializer(item);
  });
}

/** The workflow run. */
export interface WorkflowRun extends ProxyResource {
  /** Gets the wait end time. */
  readonly waitEndTime?: Date;
  /** Gets the start time. */
  readonly startTime?: Date;
  /** Gets the end time. */
  readonly endTime?: Date;
  /** Gets the status. */
  readonly status?: WorkflowStatus;
  /** Gets the code. */
  readonly code?: string;
  /** Gets the error. */
  readonly error?: any;
  /** Gets the correlation id. */
  readonly correlationId?: string;
  /** The run correlation. */
  correlation?: Correlation;
  /** Gets the reference to workflow version. */
  readonly workflow?: ResourceReference;
  /** Gets the fired trigger. */
  readonly trigger?: WorkflowRunTrigger;
  /** Gets the outputs. */
  readonly outputs?: Record<string, WorkflowOutputParameter>;
  /** Gets the response of the flow run. */
  readonly response?: WorkflowRunTrigger;
}

export function workflowRunDeserializer(item: any): WorkflowRun {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _workflowRunPropertiesDeserializer(item["properties"])),
  };
}

/** The workflow run properties. */
export interface WorkflowRunProperties {
  /** Gets the wait end time. */
  readonly waitEndTime?: Date;
  /** Gets the start time. */
  readonly startTime?: Date;
  /** Gets the end time. */
  readonly endTime?: Date;
  /** Gets the status. */
  readonly status?: WorkflowStatus;
  /** Gets the code. */
  readonly code?: string;
  /** Gets the error. */
  readonly error?: any;
  /** Gets the correlation id. */
  readonly correlationId?: string;
  /** The run correlation. */
  correlation?: Correlation;
  /** Gets the reference to workflow version. */
  readonly workflow?: ResourceReference;
  /** Gets the fired trigger. */
  readonly trigger?: WorkflowRunTrigger;
  /** Gets the outputs. */
  readonly outputs?: Record<string, WorkflowOutputParameter>;
  /** Gets the response of the flow run. */
  readonly response?: WorkflowRunTrigger;
}

export function workflowRunPropertiesDeserializer(item: any): WorkflowRunProperties {
  return {
    waitEndTime: !item["waitEndTime"] ? item["waitEndTime"] : new Date(item["waitEndTime"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    status: item["status"],
    code: item["code"],
    error: item["error"],
    correlationId: item["correlationId"],
    correlation: !item["correlation"]
      ? item["correlation"]
      : correlationDeserializer(item["correlation"]),
    workflow: !item["workflow"]
      ? item["workflow"]
      : resourceReferenceDeserializer(item["workflow"]),
    trigger: !item["trigger"] ? item["trigger"] : workflowRunTriggerDeserializer(item["trigger"]),
    outputs: !item["outputs"]
      ? item["outputs"]
      : workflowOutputParameterRecordDeserializer(item["outputs"]),
    response: !item["response"]
      ? item["response"]
      : workflowRunTriggerDeserializer(item["response"]),
  };
}

/** The workflow status. */
export enum KnownWorkflowStatus {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Paused */
  Paused = "Paused",
  /** Running */
  Running = "Running",
  /** Waiting */
  Waiting = "Waiting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Skipped */
  Skipped = "Skipped",
  /** Suspended */
  Suspended = "Suspended",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** Failed */
  Failed = "Failed",
  /** Faulted */
  Faulted = "Faulted",
  /** TimedOut */
  TimedOut = "TimedOut",
  /** Aborted */
  Aborted = "Aborted",
  /** Ignored */
  Ignored = "Ignored",
}

/**
 * The workflow status. \
 * {@link KnownWorkflowStatus} can be used interchangeably with WorkflowStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Paused** \
 * **Running** \
 * **Waiting** \
 * **Succeeded** \
 * **Skipped** \
 * **Suspended** \
 * **Cancelled** \
 * **Failed** \
 * **Faulted** \
 * **TimedOut** \
 * **Aborted** \
 * **Ignored**
 */
export type WorkflowStatus = string;

/** The correlation property. */
export interface Correlation {
  /** The client tracking id. */
  clientTrackingId?: string;
}

export function correlationDeserializer(item: any): Correlation {
  return {
    clientTrackingId: item["clientTrackingId"],
  };
}

/** The resource reference. */
export interface ResourceReference {
  /** The resource id. */
  id?: string;
  /** Gets the resource name. */
  readonly name?: string;
  /** Gets the resource type. */
  readonly type?: string;
}

export function resourceReferenceSerializer(item: ResourceReference): any {
  return { id: item["id"] };
}

export function resourceReferenceDeserializer(item: any): ResourceReference {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** The workflow run trigger. */
export interface WorkflowRunTrigger {
  /** Gets the name. */
  readonly name?: string;
  /** Gets the inputs. */
  readonly inputs?: any;
  /** Gets the link to inputs. */
  readonly inputsLink?: ContentLink;
  /** Gets the outputs. */
  readonly outputs?: any;
  /** Gets the link to outputs. */
  readonly outputsLink?: ContentLink;
  /** Gets the scheduled time. */
  readonly scheduledTime?: Date;
  /** Gets the start time. */
  readonly startTime?: Date;
  /** Gets the end time. */
  readonly endTime?: Date;
  /** Gets the tracking id. */
  readonly trackingId?: string;
  /** The run correlation. */
  correlation?: Correlation;
  /** Gets the code. */
  readonly code?: string;
  /** Gets the status. */
  readonly status?: WorkflowStatus;
  /** Gets the error. */
  readonly error?: any;
  /** Gets the tracked properties. */
  readonly trackedProperties?: any;
}

export function workflowRunTriggerDeserializer(item: any): WorkflowRunTrigger {
  return {
    name: item["name"],
    inputs: item["inputs"],
    inputsLink: !item["inputsLink"]
      ? item["inputsLink"]
      : contentLinkDeserializer(item["inputsLink"]),
    outputs: item["outputs"],
    outputsLink: !item["outputsLink"]
      ? item["outputsLink"]
      : contentLinkDeserializer(item["outputsLink"]),
    scheduledTime: !item["scheduledTime"] ? item["scheduledTime"] : new Date(item["scheduledTime"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    trackingId: item["trackingId"],
    correlation: !item["correlation"]
      ? item["correlation"]
      : correlationDeserializer(item["correlation"]),
    code: item["code"],
    status: item["status"],
    error: item["error"],
    trackedProperties: item["trackedProperties"],
  };
}

/** The content link. */
export interface ContentLink {
  /** The content link URI. */
  uri?: string;
  /** The content version. */
  readonly contentVersion?: string;
  /** The content size. */
  readonly contentSize?: number;
  /** The content hash. */
  readonly contentHash?: ContentHash;
  /** The metadata. */
  readonly metadata?: any;
}

export function contentLinkDeserializer(item: any): ContentLink {
  return {
    uri: item["uri"],
    contentVersion: item["contentVersion"],
    contentSize: item["contentSize"],
    contentHash: !item["contentHash"]
      ? item["contentHash"]
      : contentHashDeserializer(item["contentHash"]),
    metadata: item["metadata"],
  };
}

/** The content hash. */
export interface ContentHash {
  /** The algorithm of the content hash. */
  algorithm?: string;
  /** The value of the content hash. */
  value?: string;
}

export function contentHashDeserializer(item: any): ContentHash {
  return {
    algorithm: item["algorithm"],
    value: item["value"],
  };
}

export function workflowOutputParameterRecordDeserializer(
  item: Record<string, any>,
): Record<string, WorkflowOutputParameter> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : workflowOutputParameterDeserializer(item[key]);
  });
  return result;
}

/** The workflow output parameter. */
export interface WorkflowOutputParameter extends WorkflowParameter {
  /** Gets the error. */
  readonly error?: any;
}

export function workflowOutputParameterDeserializer(item: any): WorkflowOutputParameter {
  return {
    type: item["type"],
    value: item["value"],
    metadata: item["metadata"],
    description: item["description"],
    error: item["error"],
  };
}

/** The workflow parameters. */
export interface WorkflowParameter {
  /** The type. */
  type?: ParameterType;
  /** The value. */
  value?: any;
  /** The metadata. */
  metadata?: any;
  /** The description. */
  description?: string;
}

export function workflowParameterSerializer(item: WorkflowParameter): any {
  return {
    type: item["type"],
    value: item["value"],
    metadata: item["metadata"],
    description: item["description"],
  };
}

export function workflowParameterDeserializer(item: any): WorkflowParameter {
  return {
    type: item["type"],
    value: item["value"],
    metadata: item["metadata"],
    description: item["description"],
  };
}

/** The parameter type. */
export enum KnownParameterType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** String */
  String = "String",
  /** SecureString */
  SecureString = "SecureString",
  /** Int */
  Int = "Int",
  /** Float */
  Float = "Float",
  /** Bool */
  Bool = "Bool",
  /** Array */
  Array = "Array",
  /** Object */
  Object = "Object",
  /** SecureObject */
  SecureObject = "SecureObject",
}

/**
 * The parameter type. \
 * {@link KnownParameterType} can be used interchangeably with ParameterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **String** \
 * **SecureString** \
 * **Int** \
 * **Float** \
 * **Bool** \
 * **Array** \
 * **Object** \
 * **SecureObject**
 */
export type ParameterType = string;

/** Error response indicates Logic service is not able to process the incoming request. The error property contains the error details. */
export interface WorkflowErrorResponse {
  /** The error properties. */
  error?: ErrorProperties;
}

export function workflowErrorResponseDeserializer(item: any): WorkflowErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorPropertiesDeserializer(item["error"]),
  };
}

/** Error properties indicate why the Logic service was not able to process the incoming request. The reason is provided in the error message. */
export interface ErrorProperties {
  /** Error code. */
  code?: string;
  /** Error message indicating why the operation failed. */
  message?: string;
}

export function errorPropertiesDeserializer(item: any): ErrorProperties {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The response of a WorkflowRun list operation. */
export interface _WorkflowRunListResult {
  /** The WorkflowRun items on this page */
  value: WorkflowRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workflowRunListResultDeserializer(item: any): _WorkflowRunListResult {
  return {
    value: workflowRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workflowRunArrayDeserializer(result: Array<WorkflowRun>): any[] {
  return result.map((item) => {
    return workflowRunDeserializer(item);
  });
}

/** The workflow run action. */
export interface WorkflowRunAction extends ProxyResource {
  /** Gets the start time. */
  readonly startTime?: Date;
  /** Gets the end time. */
  readonly endTime?: Date;
  /** Gets the status. */
  readonly status?: WorkflowStatus;
  /** Gets the code. */
  readonly code?: string;
  /** Gets the error. */
  readonly error?: any;
  /** Gets the tracking id. */
  readonly trackingId?: string;
  /** The correlation properties. */
  correlation?: RunActionCorrelation;
  /** Gets the link to inputs. */
  readonly inputsLink?: ContentLink;
  /** Gets the link to outputs. */
  readonly outputsLink?: ContentLink;
  /** Gets the tracked properties. */
  readonly trackedProperties?: any;
  /** Gets the retry histories. */
  retryHistory?: RetryHistory[];
}

export function workflowRunActionDeserializer(item: any): WorkflowRunAction {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _workflowRunActionPropertiesDeserializer(item["properties"])),
  };
}

/** The workflow run action properties. */
export interface WorkflowRunActionProperties {
  /** Gets the start time. */
  readonly startTime?: Date;
  /** Gets the end time. */
  readonly endTime?: Date;
  /** Gets the status. */
  readonly status?: WorkflowStatus;
  /** Gets the code. */
  readonly code?: string;
  /** Gets the error. */
  readonly error?: any;
  /** Gets the tracking id. */
  readonly trackingId?: string;
  /** The correlation properties. */
  correlation?: RunActionCorrelation;
  /** Gets the link to inputs. */
  readonly inputsLink?: ContentLink;
  /** Gets the link to outputs. */
  readonly outputsLink?: ContentLink;
  /** Gets the tracked properties. */
  readonly trackedProperties?: any;
  /** Gets the retry histories. */
  retryHistory?: RetryHistory[];
}

export function workflowRunActionPropertiesDeserializer(item: any): WorkflowRunActionProperties {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    status: item["status"],
    code: item["code"],
    error: item["error"],
    trackingId: item["trackingId"],
    correlation: !item["correlation"]
      ? item["correlation"]
      : runActionCorrelationDeserializer(item["correlation"]),
    inputsLink: !item["inputsLink"]
      ? item["inputsLink"]
      : contentLinkDeserializer(item["inputsLink"]),
    outputsLink: !item["outputsLink"]
      ? item["outputsLink"]
      : contentLinkDeserializer(item["outputsLink"]),
    trackedProperties: item["trackedProperties"],
    retryHistory: !item["retryHistory"]
      ? item["retryHistory"]
      : retryHistoryArrayDeserializer(item["retryHistory"]),
  };
}

/** The workflow run action correlation properties. */
export interface RunActionCorrelation extends RunCorrelation {
  /** The action tracking identifier. */
  actionTrackingId?: string;
}

export function runActionCorrelationDeserializer(item: any): RunActionCorrelation {
  return {
    clientTrackingId: item["clientTrackingId"],
    clientKeywords: !item["clientKeywords"]
      ? item["clientKeywords"]
      : item["clientKeywords"].map((p: any) => {
          return p;
        }),
    actionTrackingId: item["actionTrackingId"],
  };
}

export function retryHistoryArrayDeserializer(result: Array<RetryHistory>): any[] {
  return result.map((item) => {
    return retryHistoryDeserializer(item);
  });
}

/** The retry history. */
export interface RetryHistory {
  /** Gets the start time. */
  startTime?: Date;
  /** Gets the end time. */
  endTime?: Date;
  /** Gets the status code. */
  code?: string;
  /** Gets the client request Id. */
  clientRequestId?: string;
  /** Gets the service request Id. */
  serviceRequestId?: string;
  /** Gets the error response. */
  error?: WorkflowErrorResponse;
}

export function retryHistoryDeserializer(item: any): RetryHistory {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    code: item["code"],
    clientRequestId: item["clientRequestId"],
    serviceRequestId: item["serviceRequestId"],
    error: !item["error"] ? item["error"] : workflowErrorResponseDeserializer(item["error"]),
  };
}

/** The correlation properties. */
export interface RunCorrelation {
  /** The client tracking identifier. */
  clientTrackingId?: string;
  /** The client keywords. */
  clientKeywords?: string[];
}

export function runCorrelationDeserializer(item: any): RunCorrelation {
  return {
    clientTrackingId: item["clientTrackingId"],
    clientKeywords: !item["clientKeywords"]
      ? item["clientKeywords"]
      : item["clientKeywords"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a WorkflowRunAction list operation. */
export interface _WorkflowRunActionListResult {
  /** The WorkflowRunAction items on this page */
  value: WorkflowRunAction[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workflowRunActionListResultDeserializer(item: any): _WorkflowRunActionListResult {
  return {
    value: workflowRunActionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workflowRunActionArrayDeserializer(result: Array<WorkflowRunAction>): any[] {
  return result.map((item) => {
    return workflowRunActionDeserializer(item);
  });
}

/** The expression traces. */
export interface _ExpressionTraces {
  value?: any;
  inputs?: ExpressionRoot[];
  /** The link used to get the next page of recommendations. */
  nextLink?: string;
}

export function _expressionTracesDeserializer(item: any): _ExpressionTraces {
  return {
    value: item["value"],
    inputs: !item["inputs"] ? item["inputs"] : expressionRootArrayDeserializer(item["inputs"]),
    nextLink: item["nextLink"],
  };
}

export function expressionRootArrayDeserializer(result: Array<ExpressionRoot>): any[] {
  return result.map((item) => {
    return expressionRootDeserializer(item);
  });
}

/** The expression root. */
export interface ExpressionRoot extends Expression {
  /** The path. */
  path?: string;
}

export function expressionRootDeserializer(item: any): ExpressionRoot {
  return {
    text: item["text"],
    value: item["value"],
    subexpressions: !item["subexpressions"]
      ? item["subexpressions"]
      : expressionArrayDeserializer(item["subexpressions"]),
    error: !item["error"] ? item["error"] : azureResourceErrorInfoDeserializer(item["error"]),
    path: item["path"],
  };
}

/** The expression. */
export interface Expression {
  /** The text. */
  text?: string;
  /** Anything */
  value?: any;
  /** The sub expressions. */
  subexpressions?: Expression[];
  /** The azure resource error info. */
  error?: AzureResourceErrorInfo;
}

export function expressionDeserializer(item: any): Expression {
  return {
    text: item["text"],
    value: item["value"],
    subexpressions: !item["subexpressions"]
      ? item["subexpressions"]
      : expressionArrayDeserializer(item["subexpressions"]),
    error: !item["error"] ? item["error"] : azureResourceErrorInfoDeserializer(item["error"]),
  };
}

export function expressionArrayDeserializer(result: Array<Expression>): any[] {
  return result.map((item) => {
    return expressionDeserializer(item);
  });
}

/** The azure resource error info. */
export interface AzureResourceErrorInfo extends ErrorInfo {
  /** The error message. */
  message: string;
  /** The error details. */
  details?: AzureResourceErrorInfo[];
}

export function azureResourceErrorInfoDeserializer(item: any): AzureResourceErrorInfo {
  return {
    code: item["code"],
    message: item["message"],
    details: !item["details"]
      ? item["details"]
      : azureResourceErrorInfoArrayDeserializer(item["details"]),
  };
}

export function azureResourceErrorInfoArrayDeserializer(
  result: Array<AzureResourceErrorInfo>,
): any[] {
  return result.map((item) => {
    return azureResourceErrorInfoDeserializer(item);
  });
}

/** The error info. */
export interface ErrorInfo {
  /** The error code. */
  code: string;
}

export function errorInfoDeserializer(item: any): ErrorInfo {
  return {
    code: item["code"],
  };
}

/** The workflow run action repetition definition. */
export interface WorkflowRunActionRepetitionDefinition extends TrackedResource {
  /** Gets the tracking id. */
  readonly trackingId?: string;
  /** Gets the inputs. */
  readonly inputs?: any;
  /** Gets the link to inputs. */
  readonly inputsLink?: ContentLink;
  /** Gets the outputs. */
  readonly outputs?: any;
  /** Gets the link to outputs. */
  readonly outputsLink?: ContentLink;
  /** Gets the tracked properties. */
  readonly trackedProperties?: any;
  /** Gets the retry histories. */
  retryHistory?: RetryHistory[];
  iterationCount?: number;
  /** The start time of the workflow scope repetition. */
  startTime?: Date;
  /** The end time of the workflow scope repetition. */
  endTime?: Date;
  /** The correlation properties. */
  correlation?: RunActionCorrelation;
  /** The status of the workflow scope repetition. */
  status?: WorkflowStatus;
  /** The workflow scope repetition code. */
  code?: string;
  /** Anything */
  error?: any;
  /** The repetition indexes. */
  repetitionIndexes?: RepetitionIndex[];
}

export function workflowRunActionRepetitionDefinitionDeserializer(
  item: any,
): WorkflowRunActionRepetitionDefinition {
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
    ..._workflowRunActionRepetitionDefinitionPropertiesDeserializer(item["properties"]),
  };
}

/** The workflow run action repetition properties definition. */
export interface WorkflowRunActionRepetitionProperties extends OperationResult {
  /** The repetition indexes. */
  repetitionIndexes?: RepetitionIndex[];
}

export function workflowRunActionRepetitionPropertiesDeserializer(
  item: any,
): WorkflowRunActionRepetitionProperties {
  return {
    trackingId: item["trackingId"],
    inputs: item["inputs"],
    inputsLink: !item["inputsLink"]
      ? item["inputsLink"]
      : contentLinkDeserializer(item["inputsLink"]),
    outputs: item["outputs"],
    outputsLink: !item["outputsLink"]
      ? item["outputsLink"]
      : contentLinkDeserializer(item["outputsLink"]),
    trackedProperties: item["trackedProperties"],
    retryHistory: !item["retryHistory"]
      ? item["retryHistory"]
      : retryHistoryArrayDeserializer(item["retryHistory"]),
    iterationCount: item["iterationCount"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    correlation: !item["correlation"]
      ? item["correlation"]
      : runActionCorrelationDeserializer(item["correlation"]),
    status: item["status"],
    code: item["code"],
    error: item["error"],
    repetitionIndexes: !item["repetitionIndexes"]
      ? item["repetitionIndexes"]
      : repetitionIndexArrayDeserializer(item["repetitionIndexes"]),
  };
}

export function repetitionIndexArrayDeserializer(result: Array<RepetitionIndex>): any[] {
  return result.map((item) => {
    return repetitionIndexDeserializer(item);
  });
}

/** The workflow run action repetition index. */
export interface RepetitionIndex {
  /** The scope. */
  scopeName?: string;
  /** The index. */
  itemIndex: number;
}

export function repetitionIndexDeserializer(item: any): RepetitionIndex {
  return {
    scopeName: item["scopeName"],
    itemIndex: item["itemIndex"],
  };
}

/** The operation result definition. */
export interface OperationResult extends OperationResultProperties {
  /** Gets the tracking id. */
  readonly trackingId?: string;
  /** Gets the inputs. */
  readonly inputs?: any;
  /** Gets the link to inputs. */
  readonly inputsLink?: ContentLink;
  /** Gets the outputs. */
  readonly outputs?: any;
  /** Gets the link to outputs. */
  readonly outputsLink?: ContentLink;
  /** Gets the tracked properties. */
  readonly trackedProperties?: any;
  /** Gets the retry histories. */
  retryHistory?: RetryHistory[];
  iterationCount?: number;
}

export function operationResultDeserializer(item: any): OperationResult {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    correlation: !item["correlation"]
      ? item["correlation"]
      : runActionCorrelationDeserializer(item["correlation"]),
    status: item["status"],
    code: item["code"],
    error: item["error"],
    trackingId: item["trackingId"],
    inputs: item["inputs"],
    inputsLink: !item["inputsLink"]
      ? item["inputsLink"]
      : contentLinkDeserializer(item["inputsLink"]),
    outputs: item["outputs"],
    outputsLink: !item["outputsLink"]
      ? item["outputsLink"]
      : contentLinkDeserializer(item["outputsLink"]),
    trackedProperties: item["trackedProperties"],
    retryHistory: !item["retryHistory"]
      ? item["retryHistory"]
      : retryHistoryArrayDeserializer(item["retryHistory"]),
    iterationCount: item["iterationCount"],
  };
}

/** The run operation result properties. */
export interface OperationResultProperties {
  /** The start time of the workflow scope repetition. */
  startTime?: Date;
  /** The end time of the workflow scope repetition. */
  endTime?: Date;
  /** The correlation properties. */
  correlation?: RunActionCorrelation;
  /** The status of the workflow scope repetition. */
  status?: WorkflowStatus;
  /** The workflow scope repetition code. */
  code?: string;
  /** Anything */
  error?: any;
}

export function operationResultPropertiesDeserializer(item: any): OperationResultProperties {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    correlation: !item["correlation"]
      ? item["correlation"]
      : runActionCorrelationDeserializer(item["correlation"]),
    status: item["status"],
    code: item["code"],
    error: item["error"],
  };
}

/** A collection of workflow run action repetitions. */
export interface _WorkflowRunActionRepetitionDefinitionCollection {
  /** The WorkflowRunActionRepetitionDefinition items on this page */
  value: WorkflowRunActionRepetitionDefinition[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workflowRunActionRepetitionDefinitionCollectionDeserializer(
  item: any,
): _WorkflowRunActionRepetitionDefinitionCollection {
  return {
    value: workflowRunActionRepetitionDefinitionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workflowRunActionRepetitionDefinitionArrayDeserializer(
  result: Array<WorkflowRunActionRepetitionDefinition>,
): any[] {
  return result.map((item) => {
    return workflowRunActionRepetitionDefinitionDeserializer(item);
  });
}

/** The workflow trigger. */
export interface WorkflowTrigger extends ProxyResource {
  /** Gets the provisioning state. */
  readonly provisioningState?: WorkflowTriggerProvisioningState;
  /** Gets the created time. */
  readonly createdTime?: Date;
  /** Gets the changed time. */
  readonly changedTime?: Date;
  /** Gets the state. */
  readonly state?: WorkflowState;
  /** Gets the status. */
  readonly status?: WorkflowStatus;
  /** Gets the last execution time. */
  readonly lastExecutionTime?: Date;
  /** Gets the next execution time. */
  readonly nextExecutionTime?: Date;
  /** Gets the workflow trigger recurrence. */
  readonly recurrence?: WorkflowTriggerRecurrence;
  /** Gets the reference to workflow. */
  readonly workflow?: ResourceReference;
}

export function workflowTriggerDeserializer(item: any): WorkflowTrigger {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _workflowTriggerPropertiesDeserializer(item["properties"])),
  };
}

/** The workflow trigger properties. */
export interface WorkflowTriggerProperties {
  /** Gets the provisioning state. */
  readonly provisioningState?: WorkflowTriggerProvisioningState;
  /** Gets the created time. */
  readonly createdTime?: Date;
  /** Gets the changed time. */
  readonly changedTime?: Date;
  /** Gets the state. */
  readonly state?: WorkflowState;
  /** Gets the status. */
  readonly status?: WorkflowStatus;
  /** Gets the last execution time. */
  readonly lastExecutionTime?: Date;
  /** Gets the next execution time. */
  readonly nextExecutionTime?: Date;
  /** Gets the workflow trigger recurrence. */
  readonly recurrence?: WorkflowTriggerRecurrence;
  /** Gets the reference to workflow. */
  readonly workflow?: ResourceReference;
}

export function workflowTriggerPropertiesDeserializer(item: any): WorkflowTriggerProperties {
  return {
    provisioningState: item["provisioningState"],
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    changedTime: !item["changedTime"] ? item["changedTime"] : new Date(item["changedTime"]),
    state: item["state"],
    status: item["status"],
    lastExecutionTime: !item["lastExecutionTime"]
      ? item["lastExecutionTime"]
      : new Date(item["lastExecutionTime"]),
    nextExecutionTime: !item["nextExecutionTime"]
      ? item["nextExecutionTime"]
      : new Date(item["nextExecutionTime"]),
    recurrence: !item["recurrence"]
      ? item["recurrence"]
      : workflowTriggerRecurrenceDeserializer(item["recurrence"]),
    workflow: !item["workflow"]
      ? item["workflow"]
      : resourceReferenceDeserializer(item["workflow"]),
  };
}

/** The workflow trigger provisioning state. */
export enum KnownWorkflowTriggerProvisioningState {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Accepted */
  Accepted = "Accepted",
  /** Running */
  Running = "Running",
  /** Ready */
  Ready = "Ready",
  /** Creating */
  Creating = "Creating",
  /** Created */
  Created = "Created",
  /** Deleting */
  Deleting = "Deleting",
  /** Deleted */
  Deleted = "Deleted",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Moving */
  Moving = "Moving",
  /** Updating */
  Updating = "Updating",
  /** Registering */
  Registering = "Registering",
  /** Registered */
  Registered = "Registered",
  /** Unregistering */
  Unregistering = "Unregistering",
  /** Unregistered */
  Unregistered = "Unregistered",
  /** Completed */
  Completed = "Completed",
}

/**
 * The workflow trigger provisioning state. \
 * {@link KnownWorkflowTriggerProvisioningState} can be used interchangeably with WorkflowTriggerProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Accepted** \
 * **Running** \
 * **Ready** \
 * **Creating** \
 * **Created** \
 * **Deleting** \
 * **Deleted** \
 * **Canceled** \
 * **Failed** \
 * **Succeeded** \
 * **Moving** \
 * **Updating** \
 * **Registering** \
 * **Registered** \
 * **Unregistering** \
 * **Unregistered** \
 * **Completed**
 */
export type WorkflowTriggerProvisioningState = string;

/** The workflow trigger recurrence. */
export interface WorkflowTriggerRecurrence {
  /** The frequency. */
  frequency?: RecurrenceFrequency;
  /** The interval. */
  interval?: number;
  /** The start time. */
  startTime?: string;
  /** The end time. */
  endTime?: string;
  /** The time zone. */
  timeZone?: string;
  /** The recurrence schedule. */
  schedule?: RecurrenceSchedule;
}

export function workflowTriggerRecurrenceDeserializer(item: any): WorkflowTriggerRecurrence {
  return {
    frequency: item["frequency"],
    interval: item["interval"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    timeZone: item["timeZone"],
    schedule: !item["schedule"]
      ? item["schedule"]
      : recurrenceScheduleDeserializer(item["schedule"]),
  };
}

/** The recurrence frequency. */
export enum KnownRecurrenceFrequency {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Second */
  Second = "Second",
  /** Minute */
  Minute = "Minute",
  /** Hour */
  Hour = "Hour",
  /** Day */
  Day = "Day",
  /** Week */
  Week = "Week",
  /** Month */
  Month = "Month",
  /** Year */
  Year = "Year",
}

/**
 * The recurrence frequency. \
 * {@link KnownRecurrenceFrequency} can be used interchangeably with RecurrenceFrequency,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Second** \
 * **Minute** \
 * **Hour** \
 * **Day** \
 * **Week** \
 * **Month** \
 * **Year**
 */
export type RecurrenceFrequency = string;

/** The recurrence schedule. */
export interface RecurrenceSchedule {
  /** The minutes. */
  minutes?: number[];
  /** The hours. */
  hours?: number[];
  /** The days of the week. */
  weekDays?: DaysOfWeek[];
  /** The month days. */
  monthDays?: number[];
  /** The monthly occurrences. */
  monthlyOccurrences?: RecurrenceScheduleOccurrence[];
}

export function recurrenceScheduleDeserializer(item: any): RecurrenceSchedule {
  return {
    minutes: !item["minutes"]
      ? item["minutes"]
      : item["minutes"].map((p: any) => {
          return p;
        }),
    hours: !item["hours"]
      ? item["hours"]
      : item["hours"].map((p: any) => {
          return p;
        }),
    weekDays: !item["weekDays"]
      ? item["weekDays"]
      : item["weekDays"].map((p: any) => {
          return p;
        }),
    monthDays: !item["monthDays"]
      ? item["monthDays"]
      : item["monthDays"].map((p: any) => {
          return p;
        }),
    monthlyOccurrences: !item["monthlyOccurrences"]
      ? item["monthlyOccurrences"]
      : recurrenceScheduleOccurrenceArrayDeserializer(item["monthlyOccurrences"]),
  };
}

/** Type of DaysOfWeek */
export type DaysOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export function recurrenceScheduleOccurrenceArrayDeserializer(
  result: Array<RecurrenceScheduleOccurrence>,
): any[] {
  return result.map((item) => {
    return recurrenceScheduleOccurrenceDeserializer(item);
  });
}

/** The recurrence schedule occurrence. */
export interface RecurrenceScheduleOccurrence {
  /** The day of the week. */
  day?: DayOfWeek;
  /** The occurrence. */
  occurrence?: number;
}

export function recurrenceScheduleOccurrenceDeserializer(item: any): RecurrenceScheduleOccurrence {
  return {
    day: item["day"],
    occurrence: item["occurrence"],
  };
}

/** The day of the week. */
export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

/** The response of a WorkflowTrigger list operation. */
export interface _WorkflowTriggerListResult {
  /** The WorkflowTrigger items on this page */
  value: WorkflowTrigger[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workflowTriggerListResultDeserializer(item: any): _WorkflowTriggerListResult {
  return {
    value: workflowTriggerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workflowTriggerArrayDeserializer(result: Array<WorkflowTrigger>): any[] {
  return result.map((item) => {
    return workflowTriggerDeserializer(item);
  });
}

/** The workflow trigger callback URL. */
export interface WorkflowTriggerCallbackUrl {
  /** Gets the workflow trigger callback URL. */
  readonly value?: string;
  /** Gets the workflow trigger callback URL HTTP method. */
  readonly method?: string;
  /** Gets the workflow trigger callback URL base path. */
  readonly basePath?: string;
  /** Gets the workflow trigger callback URL relative path. */
  readonly relativePath?: string;
  /** Gets the workflow trigger callback URL relative path parameters. */
  relativePathParameters?: string[];
  /** Gets the workflow trigger callback URL query parameters. */
  queries?: WorkflowTriggerListCallbackUrlQueries;
}

export function workflowTriggerCallbackUrlDeserializer(item: any): WorkflowTriggerCallbackUrl {
  return {
    value: item["value"],
    method: item["method"],
    basePath: item["basePath"],
    relativePath: item["relativePath"],
    relativePathParameters: !item["relativePathParameters"]
      ? item["relativePathParameters"]
      : item["relativePathParameters"].map((p: any) => {
          return p;
        }),
    queries: !item["queries"]
      ? item["queries"]
      : workflowTriggerListCallbackUrlQueriesDeserializer(item["queries"]),
  };
}

/** Gets the workflow trigger callback URL query parameters. */
export interface WorkflowTriggerListCallbackUrlQueries {
  /** The api version. */
  apiVersion?: string;
  /** The SAS permissions. */
  sp?: string;
  /** The SAS version. */
  sv?: string;
  /** The SAS signature. */
  sig?: string;
  /** The SAS timestamp. */
  se?: string;
}

export function workflowTriggerListCallbackUrlQueriesDeserializer(
  item: any,
): WorkflowTriggerListCallbackUrlQueries {
  return {
    apiVersion: item["api-version"],
    sp: item["sp"],
    sv: item["sv"],
    sig: item["sig"],
    se: item["se"],
  };
}

/** The JSON schema. */
export interface JsonSchema {
  /** The JSON title. */
  title?: string;
  /** The JSON content. */
  content?: string;
}

export function jsonSchemaDeserializer(item: any): JsonSchema {
  return {
    title: item["title"],
    content: item["content"],
  };
}

/** The workflow trigger history. */
export interface WorkflowTriggerHistory extends ProxyResource {
  /** Gets the start time. */
  readonly startTime?: Date;
  /** Gets the end time. */
  readonly endTime?: Date;
  /** The scheduled time. */
  readonly scheduledTime?: Date;
  /** Gets the status. */
  readonly status?: WorkflowStatus;
  /** Gets the code. */
  readonly code?: string;
  /** Gets the error. */
  readonly error?: any;
  /** Gets the tracking id. */
  readonly trackingId?: string;
  /** The run correlation. */
  correlation?: Correlation;
  /** Gets the link to input parameters. */
  readonly inputsLink?: ContentLink;
  /** Gets the link to output parameters. */
  readonly outputsLink?: ContentLink;
  /** The value indicating whether trigger was fired. */
  readonly fired?: boolean;
  /** Gets the reference to workflow run. */
  readonly run?: ResourceReference;
}

export function workflowTriggerHistoryDeserializer(item: any): WorkflowTriggerHistory {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _workflowTriggerHistoryPropertiesDeserializer(item["properties"])),
  };
}

/** The workflow trigger history properties. */
export interface WorkflowTriggerHistoryProperties {
  /** Gets the start time. */
  readonly startTime?: Date;
  /** Gets the end time. */
  readonly endTime?: Date;
  /** The scheduled time. */
  readonly scheduledTime?: Date;
  /** Gets the status. */
  readonly status?: WorkflowStatus;
  /** Gets the code. */
  readonly code?: string;
  /** Gets the error. */
  readonly error?: any;
  /** Gets the tracking id. */
  readonly trackingId?: string;
  /** The run correlation. */
  correlation?: Correlation;
  /** Gets the link to input parameters. */
  readonly inputsLink?: ContentLink;
  /** Gets the link to output parameters. */
  readonly outputsLink?: ContentLink;
  /** The value indicating whether trigger was fired. */
  readonly fired?: boolean;
  /** Gets the reference to workflow run. */
  readonly run?: ResourceReference;
}

export function workflowTriggerHistoryPropertiesDeserializer(
  item: any,
): WorkflowTriggerHistoryProperties {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    scheduledTime: !item["scheduledTime"] ? item["scheduledTime"] : new Date(item["scheduledTime"]),
    status: item["status"],
    code: item["code"],
    error: item["error"],
    trackingId: item["trackingId"],
    correlation: !item["correlation"]
      ? item["correlation"]
      : correlationDeserializer(item["correlation"]),
    inputsLink: !item["inputsLink"]
      ? item["inputsLink"]
      : contentLinkDeserializer(item["inputsLink"]),
    outputsLink: !item["outputsLink"]
      ? item["outputsLink"]
      : contentLinkDeserializer(item["outputsLink"]),
    fired: item["fired"],
    run: !item["run"] ? item["run"] : resourceReferenceDeserializer(item["run"]),
  };
}

/** The response of a WorkflowTriggerHistory list operation. */
export interface _WorkflowTriggerHistoryListResult {
  /** The WorkflowTriggerHistory items on this page */
  value: WorkflowTriggerHistory[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workflowTriggerHistoryListResultDeserializer(
  item: any,
): _WorkflowTriggerHistoryListResult {
  return {
    value: workflowTriggerHistoryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workflowTriggerHistoryArrayDeserializer(
  result: Array<WorkflowTriggerHistory>,
): any[] {
  return result.map((item) => {
    return workflowTriggerHistoryDeserializer(item);
  });
}

/** The workflow version. */
export interface WorkflowVersion extends TrackedResource {
  /** The provisioning state. */
  readonly provisioningState?: WorkflowProvisioningState;
  /** Gets the created time. */
  readonly createdTime?: Date;
  /** Gets the changed time. */
  readonly changedTime?: Date;
  /** The state. */
  state?: WorkflowState;
  /** Gets the version. */
  readonly version?: string;
  /** Gets the access endpoint. */
  readonly accessEndpoint?: string;
  /** The endpoints configuration. */
  endpointsConfiguration?: FlowEndpointsConfiguration;
  /** The access control configuration. */
  accessControl?: FlowAccessControlConfiguration;
  /** The sku. */
  readonly sku?: WorkflowSku;
  /** The integration account. */
  integrationAccount?: ResourceReference;
  /** The definition. */
  definition?: any;
  /** The parameters. */
  parameters?: Record<string, WorkflowParameter>;
}

export function workflowVersionDeserializer(item: any): WorkflowVersion {
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
      : _workflowVersionPropertiesDeserializer(item["properties"])),
  };
}

/** The workflow version properties. */
export interface WorkflowVersionProperties {
  /** The provisioning state. */
  readonly provisioningState?: WorkflowProvisioningState;
  /** Gets the created time. */
  readonly createdTime?: Date;
  /** Gets the changed time. */
  readonly changedTime?: Date;
  /** The state. */
  state?: WorkflowState;
  /** Gets the version. */
  readonly version?: string;
  /** Gets the access endpoint. */
  readonly accessEndpoint?: string;
  /** The endpoints configuration. */
  endpointsConfiguration?: FlowEndpointsConfiguration;
  /** The access control configuration. */
  accessControl?: FlowAccessControlConfiguration;
  /** The sku. */
  readonly sku?: WorkflowSku;
  /** The integration account. */
  integrationAccount?: ResourceReference;
  /** The definition. */
  definition?: any;
  /** The parameters. */
  parameters?: Record<string, WorkflowParameter>;
}

export function workflowVersionPropertiesDeserializer(item: any): WorkflowVersionProperties {
  return {
    provisioningState: item["provisioningState"],
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    changedTime: !item["changedTime"] ? item["changedTime"] : new Date(item["changedTime"]),
    state: item["state"],
    version: item["version"],
    accessEndpoint: item["accessEndpoint"],
    endpointsConfiguration: !item["endpointsConfiguration"]
      ? item["endpointsConfiguration"]
      : flowEndpointsConfigurationDeserializer(item["endpointsConfiguration"]),
    accessControl: !item["accessControl"]
      ? item["accessControl"]
      : flowAccessControlConfigurationDeserializer(item["accessControl"]),
    sku: !item["sku"] ? item["sku"] : workflowSkuDeserializer(item["sku"]),
    integrationAccount: !item["integrationAccount"]
      ? item["integrationAccount"]
      : resourceReferenceDeserializer(item["integrationAccount"]),
    definition: item["definition"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : workflowParameterRecordDeserializer(item["parameters"]),
  };
}

/** The workflow provisioning state. */
export enum KnownWorkflowProvisioningState {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Accepted */
  Accepted = "Accepted",
  /** Running */
  Running = "Running",
  /** Ready */
  Ready = "Ready",
  /** Creating */
  Creating = "Creating",
  /** Created */
  Created = "Created",
  /** Deleting */
  Deleting = "Deleting",
  /** Deleted */
  Deleted = "Deleted",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Moving */
  Moving = "Moving",
  /** Updating */
  Updating = "Updating",
  /** Registering */
  Registering = "Registering",
  /** Registered */
  Registered = "Registered",
  /** Unregistering */
  Unregistering = "Unregistering",
  /** Unregistered */
  Unregistered = "Unregistered",
  /** Completed */
  Completed = "Completed",
  /** Renewing */
  Renewing = "Renewing",
  /** Pending */
  Pending = "Pending",
  /** Waiting */
  Waiting = "Waiting",
  /** InProgress */
  InProgress = "InProgress",
}

/**
 * The workflow provisioning state. \
 * {@link KnownWorkflowProvisioningState} can be used interchangeably with WorkflowProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Accepted** \
 * **Running** \
 * **Ready** \
 * **Creating** \
 * **Created** \
 * **Deleting** \
 * **Deleted** \
 * **Canceled** \
 * **Failed** \
 * **Succeeded** \
 * **Moving** \
 * **Updating** \
 * **Registering** \
 * **Registered** \
 * **Unregistering** \
 * **Unregistered** \
 * **Completed** \
 * **Renewing** \
 * **Pending** \
 * **Waiting** \
 * **InProgress**
 */
export type WorkflowProvisioningState = string;

/** The endpoints configuration. */
export interface FlowEndpointsConfiguration {
  /** The workflow endpoints. */
  workflow?: FlowEndpoints;
  /** The connector endpoints. */
  connector?: FlowEndpoints;
}

export function flowEndpointsConfigurationSerializer(item: FlowEndpointsConfiguration): any {
  return {
    workflow: !item["workflow"] ? item["workflow"] : flowEndpointsSerializer(item["workflow"]),
    connector: !item["connector"] ? item["connector"] : flowEndpointsSerializer(item["connector"]),
  };
}

export function flowEndpointsConfigurationDeserializer(item: any): FlowEndpointsConfiguration {
  return {
    workflow: !item["workflow"] ? item["workflow"] : flowEndpointsDeserializer(item["workflow"]),
    connector: !item["connector"]
      ? item["connector"]
      : flowEndpointsDeserializer(item["connector"]),
  };
}

/** The flow endpoints configuration. */
export interface FlowEndpoints {
  /** The outgoing ip address. */
  outgoingIpAddresses?: IpAddress[];
  /** The access endpoint ip address. */
  accessEndpointIpAddresses?: IpAddress[];
}

export function flowEndpointsSerializer(item: FlowEndpoints): any {
  return {
    outgoingIpAddresses: !item["outgoingIpAddresses"]
      ? item["outgoingIpAddresses"]
      : ipAddressArraySerializer(item["outgoingIpAddresses"]),
    accessEndpointIpAddresses: !item["accessEndpointIpAddresses"]
      ? item["accessEndpointIpAddresses"]
      : ipAddressArraySerializer(item["accessEndpointIpAddresses"]),
  };
}

export function flowEndpointsDeserializer(item: any): FlowEndpoints {
  return {
    outgoingIpAddresses: !item["outgoingIpAddresses"]
      ? item["outgoingIpAddresses"]
      : ipAddressArrayDeserializer(item["outgoingIpAddresses"]),
    accessEndpointIpAddresses: !item["accessEndpointIpAddresses"]
      ? item["accessEndpointIpAddresses"]
      : ipAddressArrayDeserializer(item["accessEndpointIpAddresses"]),
  };
}

export function ipAddressArraySerializer(result: Array<IpAddress>): any[] {
  return result.map((item) => {
    return ipAddressSerializer(item);
  });
}

export function ipAddressArrayDeserializer(result: Array<IpAddress>): any[] {
  return result.map((item) => {
    return ipAddressDeserializer(item);
  });
}

/** The ip address. */
export interface IpAddress {
  /** The address. */
  address?: string;
}

export function ipAddressSerializer(item: IpAddress): any {
  return { address: item["address"] };
}

export function ipAddressDeserializer(item: any): IpAddress {
  return {
    address: item["address"],
  };
}

/** The access control configuration. */
export interface FlowAccessControlConfiguration {
  /** The access control configuration for invoking workflow triggers. */
  triggers?: FlowAccessControlConfigurationPolicy;
  /** The access control configuration for accessing workflow run contents. */
  contents?: FlowAccessControlConfigurationPolicy;
  /** The access control configuration for workflow actions. */
  actions?: FlowAccessControlConfigurationPolicy;
  /** The access control configuration for workflow management. */
  workflowManagement?: FlowAccessControlConfigurationPolicy;
}

export function flowAccessControlConfigurationSerializer(
  item: FlowAccessControlConfiguration,
): any {
  return {
    triggers: !item["triggers"]
      ? item["triggers"]
      : flowAccessControlConfigurationPolicySerializer(item["triggers"]),
    contents: !item["contents"]
      ? item["contents"]
      : flowAccessControlConfigurationPolicySerializer(item["contents"]),
    actions: !item["actions"]
      ? item["actions"]
      : flowAccessControlConfigurationPolicySerializer(item["actions"]),
    workflowManagement: !item["workflowManagement"]
      ? item["workflowManagement"]
      : flowAccessControlConfigurationPolicySerializer(item["workflowManagement"]),
  };
}

export function flowAccessControlConfigurationDeserializer(
  item: any,
): FlowAccessControlConfiguration {
  return {
    triggers: !item["triggers"]
      ? item["triggers"]
      : flowAccessControlConfigurationPolicyDeserializer(item["triggers"]),
    contents: !item["contents"]
      ? item["contents"]
      : flowAccessControlConfigurationPolicyDeserializer(item["contents"]),
    actions: !item["actions"]
      ? item["actions"]
      : flowAccessControlConfigurationPolicyDeserializer(item["actions"]),
    workflowManagement: !item["workflowManagement"]
      ? item["workflowManagement"]
      : flowAccessControlConfigurationPolicyDeserializer(item["workflowManagement"]),
  };
}

/** The access control configuration policy. */
export interface FlowAccessControlConfigurationPolicy {
  /** The allowed caller IP address ranges. */
  allowedCallerIpAddresses?: IpAddressRange[];
  /** The authentication policies for workflow. */
  openAuthenticationPolicies?: OpenAuthenticationAccessPolicies;
}

export function flowAccessControlConfigurationPolicySerializer(
  item: FlowAccessControlConfigurationPolicy,
): any {
  return {
    allowedCallerIpAddresses: !item["allowedCallerIpAddresses"]
      ? item["allowedCallerIpAddresses"]
      : ipAddressRangeArraySerializer(item["allowedCallerIpAddresses"]),
    openAuthenticationPolicies: !item["openAuthenticationPolicies"]
      ? item["openAuthenticationPolicies"]
      : openAuthenticationAccessPoliciesSerializer(item["openAuthenticationPolicies"]),
  };
}

export function flowAccessControlConfigurationPolicyDeserializer(
  item: any,
): FlowAccessControlConfigurationPolicy {
  return {
    allowedCallerIpAddresses: !item["allowedCallerIpAddresses"]
      ? item["allowedCallerIpAddresses"]
      : ipAddressRangeArrayDeserializer(item["allowedCallerIpAddresses"]),
    openAuthenticationPolicies: !item["openAuthenticationPolicies"]
      ? item["openAuthenticationPolicies"]
      : openAuthenticationAccessPoliciesDeserializer(item["openAuthenticationPolicies"]),
  };
}

export function ipAddressRangeArraySerializer(result: Array<IpAddressRange>): any[] {
  return result.map((item) => {
    return ipAddressRangeSerializer(item);
  });
}

export function ipAddressRangeArrayDeserializer(result: Array<IpAddressRange>): any[] {
  return result.map((item) => {
    return ipAddressRangeDeserializer(item);
  });
}

/** The ip address range. */
export interface IpAddressRange {
  /** The IP address range. */
  addressRange?: string;
}

export function ipAddressRangeSerializer(item: IpAddressRange): any {
  return { addressRange: item["addressRange"] };
}

export function ipAddressRangeDeserializer(item: any): IpAddressRange {
  return {
    addressRange: item["addressRange"],
  };
}

/** AuthenticationPolicy of type Open. */
export interface OpenAuthenticationAccessPolicies {
  /** Open authentication policies. */
  policies?: Record<string, OpenAuthenticationAccessPolicy>;
}

export function openAuthenticationAccessPoliciesSerializer(
  item: OpenAuthenticationAccessPolicies,
): any {
  return {
    policies: !item["policies"]
      ? item["policies"]
      : openAuthenticationAccessPolicyRecordSerializer(item["policies"]),
  };
}

export function openAuthenticationAccessPoliciesDeserializer(
  item: any,
): OpenAuthenticationAccessPolicies {
  return {
    policies: !item["policies"]
      ? item["policies"]
      : openAuthenticationAccessPolicyRecordDeserializer(item["policies"]),
  };
}

export function openAuthenticationAccessPolicyRecordSerializer(
  item: Record<string, OpenAuthenticationAccessPolicy>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : openAuthenticationAccessPolicySerializer(item[key]);
  });
  return result;
}

export function openAuthenticationAccessPolicyRecordDeserializer(
  item: Record<string, any>,
): Record<string, OpenAuthenticationAccessPolicy> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : openAuthenticationAccessPolicyDeserializer(item[key]);
  });
  return result;
}

/** Open authentication access policy defined by user. */
export interface OpenAuthenticationAccessPolicy {
  /** Type of provider for OAuth. */
  type?: OpenAuthenticationProviderType;
  /** The access policy claims. */
  claims?: OpenAuthenticationPolicyClaim[];
}

export function openAuthenticationAccessPolicySerializer(
  item: OpenAuthenticationAccessPolicy,
): any {
  return {
    type: item["type"],
    claims: !item["claims"]
      ? item["claims"]
      : openAuthenticationPolicyClaimArraySerializer(item["claims"]),
  };
}

export function openAuthenticationAccessPolicyDeserializer(
  item: any,
): OpenAuthenticationAccessPolicy {
  return {
    type: item["type"],
    claims: !item["claims"]
      ? item["claims"]
      : openAuthenticationPolicyClaimArrayDeserializer(item["claims"]),
  };
}

/** Open authentication policy provider type. */
export enum KnownOpenAuthenticationProviderType {
  /** AAD */
  AAD = "AAD",
}

/**
 * Open authentication policy provider type. \
 * {@link KnownOpenAuthenticationProviderType} can be used interchangeably with OpenAuthenticationProviderType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AAD**
 */
export type OpenAuthenticationProviderType = string;

export function openAuthenticationPolicyClaimArraySerializer(
  result: Array<OpenAuthenticationPolicyClaim>,
): any[] {
  return result.map((item) => {
    return openAuthenticationPolicyClaimSerializer(item);
  });
}

export function openAuthenticationPolicyClaimArrayDeserializer(
  result: Array<OpenAuthenticationPolicyClaim>,
): any[] {
  return result.map((item) => {
    return openAuthenticationPolicyClaimDeserializer(item);
  });
}

/** Open authentication policy claim. */
export interface OpenAuthenticationPolicyClaim {
  /** The name of the claim. */
  name?: string;
  /** The value of the claim. */
  value?: string;
}

export function openAuthenticationPolicyClaimSerializer(item: OpenAuthenticationPolicyClaim): any {
  return { name: item["name"], value: item["value"] };
}

export function openAuthenticationPolicyClaimDeserializer(
  item: any,
): OpenAuthenticationPolicyClaim {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** The sku type. */
export interface WorkflowSku {
  /** The name. */
  name: WorkflowSkuName;
  /** The reference to plan. */
  plan?: ResourceReference;
}

export function workflowSkuDeserializer(item: any): WorkflowSku {
  return {
    name: item["name"],
    plan: !item["plan"] ? item["plan"] : resourceReferenceDeserializer(item["plan"]),
  };
}

/** The sku name. */
export enum KnownWorkflowSkuName {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Free */
  Free = "Free",
  /** Shared */
  Shared = "Shared",
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
  /** Premium */
  Premium = "Premium",
}

/**
 * The sku name. \
 * {@link KnownWorkflowSkuName} can be used interchangeably with WorkflowSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Free** \
 * **Shared** \
 * **Basic** \
 * **Standard** \
 * **Premium**
 */
export type WorkflowSkuName = string;

export function workflowParameterRecordSerializer(
  item: Record<string, WorkflowParameter>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : workflowParameterSerializer(item[key]);
  });
  return result;
}

export function workflowParameterRecordDeserializer(
  item: Record<string, any>,
): Record<string, WorkflowParameter> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : workflowParameterDeserializer(item[key]);
  });
  return result;
}

/** The response of a WorkflowVersion list operation. */
export interface _WorkflowVersionListResult {
  /** The WorkflowVersion items on this page */
  value: WorkflowVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workflowVersionListResultDeserializer(item: any): _WorkflowVersionListResult {
  return {
    value: workflowVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workflowVersionArrayDeserializer(result: Array<WorkflowVersion>): any[] {
  return result.map((item) => {
    return workflowVersionDeserializer(item);
  });
}

/** Collection of Azure resource manager operation metadata. */
export interface _CsmOperationCollection {
  /** Collection of resources. */
  value: CsmOperationDescription[];
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

export function _csmOperationCollectionDeserializer(item: any): _CsmOperationCollection {
  return {
    value: csmOperationDescriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function csmOperationDescriptionArrayDeserializer(
  result: Array<CsmOperationDescription>,
): any[] {
  return result.map((item) => {
    return csmOperationDescriptionDeserializer(item);
  });
}

/** Description of an operation available for Microsoft.Web resource provider. */
export interface CsmOperationDescription {
  name?: string;
  isDataAction?: boolean;
  /** Meta data about operation used for display in portal. */
  display?: CsmOperationDisplay;
  origin?: string;
  /** Properties available for a Microsoft.Web resource provider operation. */
  properties?: CsmOperationDescriptionProperties;
}

export function csmOperationDescriptionDeserializer(item: any): CsmOperationDescription {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : csmOperationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: !item["properties"]
      ? item["properties"]
      : csmOperationDescriptionPropertiesDeserializer(item["properties"]),
  };
}

/** Meta data about operation used for display in portal. */
export interface CsmOperationDisplay {
  provider?: string;
  resource?: string;
  operation?: string;
  description?: string;
}

export function csmOperationDisplayDeserializer(item: any): CsmOperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Properties available for a Microsoft.Web resource provider operation. */
export interface CsmOperationDescriptionProperties {
  /** Resource metrics service provided by Microsoft.Insights resource provider. */
  serviceSpecification?: ServiceSpecification;
}

export function csmOperationDescriptionPropertiesDeserializer(
  item: any,
): CsmOperationDescriptionProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** Resource metrics service provided by Microsoft.Insights resource provider. */
export interface ServiceSpecification {
  metricSpecifications?: MetricSpecification[];
  logSpecifications?: LogSpecification[];
}

export function serviceSpecificationDeserializer(item: any): ServiceSpecification {
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

/** Definition of a single resource metric. */
export interface MetricSpecification {
  name?: string;
  displayName?: string;
  displayDescription?: string;
  unit?: string;
  aggregationType?: string;
  supportsInstanceLevelAggregation?: boolean;
  enableRegionalMdmAccount?: boolean;
  sourceMdmAccount?: string;
  sourceMdmNamespace?: string;
  metricFilterPattern?: string;
  fillGapWithZero?: boolean;
  isInternal?: boolean;
  dimensions?: Dimension[];
  category?: string;
  availabilities?: MetricAvailability[];
  supportedTimeGrainTypes?: string[];
  supportedAggregationTypes?: string[];
}

export function metricSpecificationDeserializer(item: any): MetricSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    aggregationType: item["aggregationType"],
    supportsInstanceLevelAggregation: item["supportsInstanceLevelAggregation"],
    enableRegionalMdmAccount: item["enableRegionalMdmAccount"],
    sourceMdmAccount: item["sourceMdmAccount"],
    sourceMdmNamespace: item["sourceMdmNamespace"],
    metricFilterPattern: item["metricFilterPattern"],
    fillGapWithZero: item["fillGapWithZero"],
    isInternal: item["isInternal"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : dimensionArrayDeserializer(item["dimensions"]),
    category: item["category"],
    availabilities: !item["availabilities"]
      ? item["availabilities"]
      : metricAvailabilityArrayDeserializer(item["availabilities"]),
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

export function dimensionArrayDeserializer(result: Array<Dimension>): any[] {
  return result.map((item) => {
    return dimensionDeserializer(item);
  });
}

/**
 * Dimension of a resource metric. For e.g. instance specific HTTP requests for a web app,
 * where instance name is dimension of the metric HTTP request
 */
export interface Dimension {
  name?: string;
  displayName?: string;
  internalName?: string;
  toBeExportedForShoebox?: boolean;
}

export function dimensionDeserializer(item: any): Dimension {
  return {
    name: item["name"],
    displayName: item["displayName"],
    internalName: item["internalName"],
    toBeExportedForShoebox: item["toBeExportedForShoebox"],
  };
}

export function metricAvailabilityArrayDeserializer(result: Array<MetricAvailability>): any[] {
  return result.map((item) => {
    return metricAvailabilityDeserializer(item);
  });
}

/** Retention policy of a resource metric. */
export interface MetricAvailability {
  timeGrain?: string;
  blobDuration?: string;
}

export function metricAvailabilityDeserializer(item: any): MetricAvailability {
  return {
    timeGrain: item["timeGrain"],
    blobDuration: item["blobDuration"],
  };
}

export function logSpecificationArrayDeserializer(result: Array<LogSpecification>): any[] {
  return result.map((item) => {
    return logSpecificationDeserializer(item);
  });
}

/** Log Definition of a single resource metric. */
export interface LogSpecification {
  name?: string;
  displayName?: string;
  blobDuration?: string;
  logFilterPattern?: string;
}

export function logSpecificationDeserializer(item: any): LogSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    blobDuration: item["blobDuration"],
    logFilterPattern: item["logFilterPattern"],
  };
}

/** Collection of Application Stacks */
export interface _ApplicationStackCollection {
  /** The ApplicationStackResource items on this page */
  value: ApplicationStackResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applicationStackCollectionDeserializer(item: any): _ApplicationStackCollection {
  return {
    value: applicationStackResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationStackResourceArrayDeserializer(
  result: Array<ApplicationStackResource>,
): any[] {
  return result.map((item) => {
    return applicationStackResourceDeserializer(item);
  });
}

/** ARM resource for a ApplicationStack. */
export interface ApplicationStackResource extends ProxyOnlyResource {
  /** Application stack name. */
  namePropertiesName?: string;
  /** Application stack display name. */
  display?: string;
  /** Application stack dependency. */
  dependency?: string;
  /** List of major versions available. */
  majorVersions?: StackMajorVersion[];
  /** List of frameworks associated with application stack. */
  frameworks?: ApplicationStack[];
  /** <code>true</code> if this is the stack is deprecated; otherwise, <code>false</code>. */
  isDeprecated?: ApplicationStack[];
}

export function applicationStackResourceDeserializer(item: any): ApplicationStackResource {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _applicationStackResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Application stack. */
export interface ApplicationStack {
  /** Application stack name. */
  name?: string;
  /** Application stack display name. */
  display?: string;
  /** Application stack dependency. */
  dependency?: string;
  /** List of major versions available. */
  majorVersions?: StackMajorVersion[];
  /** List of frameworks associated with application stack. */
  frameworks?: ApplicationStack[];
  /** <code>true</code> if this is the stack is deprecated; otherwise, <code>false</code>. */
  isDeprecated?: ApplicationStack[];
}

export function applicationStackDeserializer(item: any): ApplicationStack {
  return {
    name: item["name"],
    display: item["display"],
    dependency: item["dependency"],
    majorVersions: !item["majorVersions"]
      ? item["majorVersions"]
      : stackMajorVersionArrayDeserializer(item["majorVersions"]),
    frameworks: !item["frameworks"]
      ? item["frameworks"]
      : applicationStackArrayDeserializer(item["frameworks"]),
    isDeprecated: !item["isDeprecated"]
      ? item["isDeprecated"]
      : applicationStackArrayDeserializer(item["isDeprecated"]),
  };
}

export function stackMajorVersionArrayDeserializer(result: Array<StackMajorVersion>): any[] {
  return result.map((item) => {
    return stackMajorVersionDeserializer(item);
  });
}

/** Application stack major version. */
export interface StackMajorVersion {
  /** Application stack major version (display only). */
  displayVersion?: string;
  /** Application stack major version (runtime only). */
  runtimeVersion?: string;
  /** <code>true</code> if this is the default major version; otherwise, <code>false</code>. */
  isDefault?: boolean;
  /** Minor versions associated with the major version. */
  minorVersions?: StackMinorVersion[];
  /** <code>true</code> if this supports Application Insights; otherwise, <code>false</code>. */
  applicationInsights?: boolean;
  /** <code>true</code> if this stack is in Preview, otherwise <code>false</code>. */
  isPreview?: boolean;
  /** <code>true</code> if this stack has been deprecated, otherwise <code>false</code>. */
  isDeprecated?: boolean;
  /** <code>true</code> if this stack should be hidden for new customers on portal, otherwise <code>false</code>. */
  isHidden?: boolean;
  /**
   * <appSettings>
   * <appSetting name="FUNCTIONS_WORKER_RUNTIME" value="dotnet" />
   * </appSettings>
   * Example: All the function apps need AppSetting: "FUNCTIONS_WORKER_RUNTIME" to be set stack name
   */
  appSettingsDictionary?: Record<string, any>;
  /**
   * <siteConfigProperties>
   * <siteConfigProperty name="Use32BitWorkerProcess" value="false" />
   * </siteConfigProperties>
   * Example: All Linux Function Apps, need Use32BitWorkerProcess to be set to 0
   */
  siteConfigPropertiesDictionary?: Record<string, any>;
}

export function stackMajorVersionDeserializer(item: any): StackMajorVersion {
  return {
    displayVersion: item["displayVersion"],
    runtimeVersion: item["runtimeVersion"],
    isDefault: item["isDefault"],
    minorVersions: !item["minorVersions"]
      ? item["minorVersions"]
      : stackMinorVersionArrayDeserializer(item["minorVersions"]),
    applicationInsights: item["applicationInsights"],
    isPreview: item["isPreview"],
    isDeprecated: item["isDeprecated"],
    isHidden: item["isHidden"],
    appSettingsDictionary: !item["appSettingsDictionary"]
      ? item["appSettingsDictionary"]
      : Object.fromEntries(
          Object.entries(item["appSettingsDictionary"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    siteConfigPropertiesDictionary: !item["siteConfigPropertiesDictionary"]
      ? item["siteConfigPropertiesDictionary"]
      : Object.fromEntries(
          Object.entries(item["siteConfigPropertiesDictionary"]).map(([k, p]: [string, any]) => [
            k,
            p,
          ]),
        ),
  };
}

export function stackMinorVersionArrayDeserializer(result: Array<StackMinorVersion>): any[] {
  return result.map((item) => {
    return stackMinorVersionDeserializer(item);
  });
}

/** Application stack minor version. */
export interface StackMinorVersion {
  /** Application stack minor version (display only). */
  displayVersion?: string;
  /** Application stack minor version (runtime only). */
  runtimeVersion?: string;
  /** <code>true</code> if this is the default minor version; otherwise, <code>false</code>. */
  isDefault?: boolean;
  /** <code>true</code> if this supports Remote Debugging, otherwise <code>false</code>. */
  isRemoteDebuggingEnabled?: boolean;
}

export function stackMinorVersionDeserializer(item: any): StackMinorVersion {
  return {
    displayVersion: item["displayVersion"],
    runtimeVersion: item["runtimeVersion"],
    isDefault: item["isDefault"],
    isRemoteDebuggingEnabled: item["isRemoteDebuggingEnabled"],
  };
}

export function applicationStackArrayDeserializer(result: Array<ApplicationStack>): any[] {
  return result.map((item) => {
    return applicationStackDeserializer(item);
  });
}

/** Collection of Function app Stacks */
export interface _FunctionAppStackCollection {
  /** The FunctionAppStack items on this page */
  value: FunctionAppStack[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _functionAppStackCollectionDeserializer(item: any): _FunctionAppStackCollection {
  return {
    value: functionAppStackArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function functionAppStackArrayDeserializer(result: Array<FunctionAppStack>): any[] {
  return result.map((item) => {
    return functionAppStackDeserializer(item);
  });
}

/** Function App Stack. */
export interface FunctionAppStack extends ProxyOnlyResource {
  /** Function App stack location. */
  readonly location?: string;
  /** Function App stack (display only). */
  readonly displayText?: string;
  /** Function App stack name. */
  readonly value?: string;
  /** List of major versions available. */
  readonly majorVersions?: FunctionAppMajorVersion[];
  /** Function App stack preferred OS. */
  readonly preferredOs?: StackPreferredOs;
}

export function functionAppStackDeserializer(item: any): FunctionAppStack {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    location: item["location"],
    ...(!item["properties"]
      ? item["properties"]
      : _functionAppStackPropertiesDeserializer(item["properties"])),
  };
}

/** FunctionAppStack resource specific properties */
export interface FunctionAppStackProperties {
  /** Function App stack (display only). */
  readonly displayText?: string;
  /** Function App stack name. */
  readonly value?: string;
  /** List of major versions available. */
  readonly majorVersions?: FunctionAppMajorVersion[];
  /** Function App stack preferred OS. */
  readonly preferredOs?: StackPreferredOs;
}

export function functionAppStackPropertiesDeserializer(item: any): FunctionAppStackProperties {
  return {
    displayText: item["displayText"],
    value: item["value"],
    majorVersions: !item["majorVersions"]
      ? item["majorVersions"]
      : functionAppMajorVersionArrayDeserializer(item["majorVersions"]),
    preferredOs: item["preferredOs"],
  };
}

export function functionAppMajorVersionArrayDeserializer(
  result: Array<FunctionAppMajorVersion>,
): any[] {
  return result.map((item) => {
    return functionAppMajorVersionDeserializer(item);
  });
}

/** Function App stack major version. */
export interface FunctionAppMajorVersion {
  /** Function App stack major version (display only). */
  readonly displayText?: string;
  /** Function App stack major version name. */
  readonly value?: string;
  /** Minor versions associated with the major version. */
  readonly minorVersions?: FunctionAppMinorVersion[];
}

export function functionAppMajorVersionDeserializer(item: any): FunctionAppMajorVersion {
  return {
    displayText: item["displayText"],
    value: item["value"],
    minorVersions: !item["minorVersions"]
      ? item["minorVersions"]
      : functionAppMinorVersionArrayDeserializer(item["minorVersions"]),
  };
}

export function functionAppMinorVersionArrayDeserializer(
  result: Array<FunctionAppMinorVersion>,
): any[] {
  return result.map((item) => {
    return functionAppMinorVersionDeserializer(item);
  });
}

/** Function App stack minor version. */
export interface FunctionAppMinorVersion {
  /** Function App stack (display only). */
  readonly displayText?: string;
  /** Function App stack name. */
  readonly value?: string;
  /** Settings associated with the minor version. */
  readonly stackSettings?: FunctionAppRuntimes;
}

export function functionAppMinorVersionDeserializer(item: any): FunctionAppMinorVersion {
  return {
    displayText: item["displayText"],
    value: item["value"],
    stackSettings: !item["stackSettings"]
      ? item["stackSettings"]
      : functionAppRuntimesDeserializer(item["stackSettings"]),
  };
}

/** Function App stack runtimes. */
export interface FunctionAppRuntimes {
  /** Linux-specific settings associated with the minor version. */
  readonly linuxRuntimeSettings?: FunctionAppRuntimeSettings;
  /** Windows-specific settings associated with the minor version. */
  readonly windowsRuntimeSettings?: FunctionAppRuntimeSettings;
}

export function functionAppRuntimesDeserializer(item: any): FunctionAppRuntimes {
  return {
    linuxRuntimeSettings: !item["linuxRuntimeSettings"]
      ? item["linuxRuntimeSettings"]
      : functionAppRuntimeSettingsDeserializer(item["linuxRuntimeSettings"]),
    windowsRuntimeSettings: !item["windowsRuntimeSettings"]
      ? item["windowsRuntimeSettings"]
      : functionAppRuntimeSettingsDeserializer(item["windowsRuntimeSettings"]),
  };
}

/** Function App runtime settings. */
export interface FunctionAppRuntimeSettings {
  /** Function App stack minor version (runtime only). */
  readonly runtimeVersion?: string;
  /** <code>true</code> if remote debugging is supported for the stack; otherwise, <code>false</code>. */
  readonly remoteDebuggingSupported?: boolean;
  /** Application Insights settings associated with the minor version. */
  readonly appInsightsSettings?: AppInsightsWebAppStackSettings;
  /** GitHub Actions settings associated with the minor version. */
  readonly gitHubActionSettings?: GitHubActionWebAppStackSettings;
  /** Application settings associated with the minor version. */
  readonly appSettingsDictionary?: Record<string, string>;
  /** Configuration settings associated with the minor version. */
  readonly siteConfigPropertiesDictionary?: SiteConfigPropertiesDictionary;
  /** List of supported Functions extension versions. */
  readonly supportedFunctionsExtensionVersions?: string[];
  /** <code>true</code> if the stack is in preview; otherwise, <code>false</code>. */
  readonly isPreview?: boolean;
  /** <code>true</code> if the stack is deprecated; otherwise, <code>false</code>. */
  readonly isDeprecated?: boolean;
  /** <code>true</code> if the stack should be hidden; otherwise, <code>false</code>. */
  readonly isHidden?: boolean;
  /** End-of-life date for the minor version. */
  readonly endOfLifeDate?: Date;
  /** <code>true</code> if the stack version is auto-updated; otherwise, <code>false</code>. */
  readonly isAutoUpdate?: boolean;
  /** <code>true</code> if the minor version is early-access; otherwise, <code>false</code>. */
  readonly isEarlyAccess?: boolean;
  /** <code>true</code> if the minor version the default; otherwise, <code>false</code>. */
  readonly isDefault?: boolean;
}

export function functionAppRuntimeSettingsDeserializer(item: any): FunctionAppRuntimeSettings {
  return {
    runtimeVersion: item["runtimeVersion"],
    remoteDebuggingSupported: item["remoteDebuggingSupported"],
    appInsightsSettings: !item["appInsightsSettings"]
      ? item["appInsightsSettings"]
      : appInsightsWebAppStackSettingsDeserializer(item["appInsightsSettings"]),
    gitHubActionSettings: !item["gitHubActionSettings"]
      ? item["gitHubActionSettings"]
      : gitHubActionWebAppStackSettingsDeserializer(item["gitHubActionSettings"]),
    appSettingsDictionary: !item["appSettingsDictionary"]
      ? item["appSettingsDictionary"]
      : Object.fromEntries(
          Object.entries(item["appSettingsDictionary"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    siteConfigPropertiesDictionary: !item["siteConfigPropertiesDictionary"]
      ? item["siteConfigPropertiesDictionary"]
      : siteConfigPropertiesDictionaryDeserializer(item["siteConfigPropertiesDictionary"]),
    supportedFunctionsExtensionVersions: !item["supportedFunctionsExtensionVersions"]
      ? item["supportedFunctionsExtensionVersions"]
      : item["supportedFunctionsExtensionVersions"].map((p: any) => {
          return p;
        }),
    isPreview: item["isPreview"],
    isDeprecated: item["isDeprecated"],
    isHidden: item["isHidden"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    isAutoUpdate: item["isAutoUpdate"],
    isEarlyAccess: item["isEarlyAccess"],
    isDefault: item["isDefault"],
  };
}

/** App Insights Web App stack settings. */
export interface AppInsightsWebAppStackSettings {
  /** <code>true</code> if remote Application Insights is supported for the stack; otherwise, <code>false</code>. */
  readonly isSupported?: boolean;
  /** <code>true</code> if Application Insights is disabled by default for the stack; otherwise, <code>false</code>. */
  readonly isDefaultOff?: boolean;
}

export function appInsightsWebAppStackSettingsDeserializer(
  item: any,
): AppInsightsWebAppStackSettings {
  return {
    isSupported: item["isSupported"],
    isDefaultOff: item["isDefaultOff"],
  };
}

/** GitHub Actions Web App stack settings. */
export interface GitHubActionWebAppStackSettings {
  /** <code>true</code> if GitHub Actions is supported for the stack; otherwise, <code>false</code>. */
  readonly isSupported?: boolean;
  /** The minor version that is supported for GitHub Actions. */
  readonly supportedVersion?: string;
}

export function gitHubActionWebAppStackSettingsDeserializer(
  item: any,
): GitHubActionWebAppStackSettings {
  return {
    isSupported: item["isSupported"],
    supportedVersion: item["supportedVersion"],
  };
}

/** Site config properties dictionary. */
export interface SiteConfigPropertiesDictionary {
  /** <code>true</code> if use32BitWorkerProcess should be set to true for the stack; otherwise, <code>false</code>. */
  readonly use32BitWorkerProcess?: boolean;
  /** LinuxFxVersion configuration setting. */
  readonly linuxFxVersion?: string;
  /** JavaVersion configuration setting. */
  readonly javaVersion?: string;
  /** PowerShellVersion configuration setting. */
  readonly powerShellVersion?: string;
}

export function siteConfigPropertiesDictionaryDeserializer(
  item: any,
): SiteConfigPropertiesDictionary {
  return {
    use32BitWorkerProcess: item["use32BitWorkerProcess"],
    linuxFxVersion: item["linuxFxVersion"],
    javaVersion: item["javaVersion"],
    powerShellVersion: item["powerShellVersion"],
  };
}

/** Function App stack preferred OS. */
export type StackPreferredOs = "Windows" | "Linux";

/** Collection of Web app Stacks */
export interface _WebAppStackCollection {
  /** The WebAppStack items on this page */
  value: WebAppStack[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _webAppStackCollectionDeserializer(item: any): _WebAppStackCollection {
  return {
    value: webAppStackArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function webAppStackArrayDeserializer(result: Array<WebAppStack>): any[] {
  return result.map((item) => {
    return webAppStackDeserializer(item);
  });
}

/** Web App stack. */
export interface WebAppStack extends ProxyOnlyResource {
  /** Web App stack location. */
  readonly location?: string;
  /** Web App stack (display only). */
  readonly displayText?: string;
  /** Web App stack name. */
  readonly value?: string;
  /** List of major versions available. */
  readonly majorVersions?: WebAppMajorVersion[];
  /** Web App stack preferred OS. */
  readonly preferredOs?: StackPreferredOs;
}

export function webAppStackDeserializer(item: any): WebAppStack {
  return {
    id: item["id"],
    name: item["name"],
    kind: item["kind"],
    type: item["type"],
    location: item["location"],
    ...(!item["properties"]
      ? item["properties"]
      : _webAppStackPropertiesDeserializer(item["properties"])),
  };
}

/** WebAppStack resource specific properties */
export interface WebAppStackProperties {
  /** Web App stack (display only). */
  readonly displayText?: string;
  /** Web App stack name. */
  readonly value?: string;
  /** List of major versions available. */
  readonly majorVersions?: WebAppMajorVersion[];
  /** Web App stack preferred OS. */
  readonly preferredOs?: StackPreferredOs;
}

export function webAppStackPropertiesDeserializer(item: any): WebAppStackProperties {
  return {
    displayText: item["displayText"],
    value: item["value"],
    majorVersions: !item["majorVersions"]
      ? item["majorVersions"]
      : webAppMajorVersionArrayDeserializer(item["majorVersions"]),
    preferredOs: item["preferredOs"],
  };
}

export function webAppMajorVersionArrayDeserializer(result: Array<WebAppMajorVersion>): any[] {
  return result.map((item) => {
    return webAppMajorVersionDeserializer(item);
  });
}

/** Web App stack major version. */
export interface WebAppMajorVersion {
  /** Web App stack major version (display only). */
  readonly displayText?: string;
  /** Web App stack major version name. */
  readonly value?: string;
  /** Minor versions associated with the major version. */
  readonly minorVersions?: WebAppMinorVersion[];
}

export function webAppMajorVersionDeserializer(item: any): WebAppMajorVersion {
  return {
    displayText: item["displayText"],
    value: item["value"],
    minorVersions: !item["minorVersions"]
      ? item["minorVersions"]
      : webAppMinorVersionArrayDeserializer(item["minorVersions"]),
  };
}

export function webAppMinorVersionArrayDeserializer(result: Array<WebAppMinorVersion>): any[] {
  return result.map((item) => {
    return webAppMinorVersionDeserializer(item);
  });
}

/** Web App stack minor version. */
export interface WebAppMinorVersion {
  /** Web App stack minor version (display only). */
  readonly displayText?: string;
  /** Web App stack major version name. */
  readonly value?: string;
  /** Settings associated with the minor version. */
  readonly stackSettings?: WebAppRuntimes;
}

export function webAppMinorVersionDeserializer(item: any): WebAppMinorVersion {
  return {
    displayText: item["displayText"],
    value: item["value"],
    stackSettings: !item["stackSettings"]
      ? item["stackSettings"]
      : webAppRuntimesDeserializer(item["stackSettings"]),
  };
}

/** Web App stack runtimes. */
export interface WebAppRuntimes {
  /** Linux-specific settings associated with the minor version. */
  readonly linuxRuntimeSettings?: WebAppRuntimeSettings;
  /** Windows-specific settings associated with the minor version. */
  readonly windowsRuntimeSettings?: WebAppRuntimeSettings;
  /** Linux-specific settings associated with the Java container minor version. */
  readonly linuxContainerSettings?: LinuxJavaContainerSettings;
  /** Windows-specific settings associated with the Java container minor version. */
  readonly windowsContainerSettings?: WindowsJavaContainerSettings;
}

export function webAppRuntimesDeserializer(item: any): WebAppRuntimes {
  return {
    linuxRuntimeSettings: !item["linuxRuntimeSettings"]
      ? item["linuxRuntimeSettings"]
      : webAppRuntimeSettingsDeserializer(item["linuxRuntimeSettings"]),
    windowsRuntimeSettings: !item["windowsRuntimeSettings"]
      ? item["windowsRuntimeSettings"]
      : webAppRuntimeSettingsDeserializer(item["windowsRuntimeSettings"]),
    linuxContainerSettings: !item["linuxContainerSettings"]
      ? item["linuxContainerSettings"]
      : linuxJavaContainerSettingsDeserializer(item["linuxContainerSettings"]),
    windowsContainerSettings: !item["windowsContainerSettings"]
      ? item["windowsContainerSettings"]
      : windowsJavaContainerSettingsDeserializer(item["windowsContainerSettings"]),
  };
}

/** Web App runtime settings. */
export interface WebAppRuntimeSettings {
  /** Web App stack minor version (runtime only). */
  readonly runtimeVersion?: string;
  /** <code>true</code> if remote debugging is supported for the stack; otherwise, <code>false</code>. */
  readonly remoteDebuggingSupported?: boolean;
  /** Application Insights settings associated with the minor version. */
  readonly appInsightsSettings?: AppInsightsWebAppStackSettings;
  /** GitHub Actions settings associated with the minor version. */
  readonly gitHubActionSettings?: GitHubActionWebAppStackSettings;
  /** <code>true</code> if the stack is in preview; otherwise, <code>false</code>. */
  readonly isPreview?: boolean;
  /** <code>true</code> if the stack is deprecated; otherwise, <code>false</code>. */
  readonly isDeprecated?: boolean;
  /** <code>true</code> if the stack should be hidden; otherwise, <code>false</code>. */
  readonly isHidden?: boolean;
  /** End-of-life date for the minor version. */
  readonly endOfLifeDate?: Date;
  /** <code>true</code> if the stack version is auto-updated; otherwise, <code>false</code>. */
  readonly isAutoUpdate?: boolean;
  /** <code>true</code> if the minor version is early-access; otherwise, <code>false</code>. */
  readonly isEarlyAccess?: boolean;
}

export function webAppRuntimeSettingsDeserializer(item: any): WebAppRuntimeSettings {
  return {
    runtimeVersion: item["runtimeVersion"],
    remoteDebuggingSupported: item["remoteDebuggingSupported"],
    appInsightsSettings: !item["appInsightsSettings"]
      ? item["appInsightsSettings"]
      : appInsightsWebAppStackSettingsDeserializer(item["appInsightsSettings"]),
    gitHubActionSettings: !item["gitHubActionSettings"]
      ? item["gitHubActionSettings"]
      : gitHubActionWebAppStackSettingsDeserializer(item["gitHubActionSettings"]),
    isPreview: item["isPreview"],
    isDeprecated: item["isDeprecated"],
    isHidden: item["isHidden"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    isAutoUpdate: item["isAutoUpdate"],
    isEarlyAccess: item["isEarlyAccess"],
  };
}

/** Linux Java Container settings. */
export interface LinuxJavaContainerSettings {
  /** Java 11 version (runtime only). */
  readonly java11Runtime?: string;
  /** Java 8 version (runtime only). */
  readonly java8Runtime?: string;
  /** <code>true</code> if the stack is in preview; otherwise, <code>false</code>. */
  readonly isPreview?: boolean;
  /** <code>true</code> if the stack is deprecated; otherwise, <code>false</code>. */
  readonly isDeprecated?: boolean;
  /** <code>true</code> if the stack should be hidden; otherwise, <code>false</code>. */
  readonly isHidden?: boolean;
  /** End-of-life date for the minor version. */
  readonly endOfLifeDate?: Date;
  /** <code>true</code> if the stack version is auto-updated; otherwise, <code>false</code>. */
  readonly isAutoUpdate?: boolean;
  /** <code>true</code> if the minor version is early-access; otherwise, <code>false</code>. */
  readonly isEarlyAccess?: boolean;
}

export function linuxJavaContainerSettingsDeserializer(item: any): LinuxJavaContainerSettings {
  return {
    java11Runtime: item["java11Runtime"],
    java8Runtime: item["java8Runtime"],
    isPreview: item["isPreview"],
    isDeprecated: item["isDeprecated"],
    isHidden: item["isHidden"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    isAutoUpdate: item["isAutoUpdate"],
    isEarlyAccess: item["isEarlyAccess"],
  };
}

/** Windows Java Container settings. */
export interface WindowsJavaContainerSettings {
  /** Java container (runtime only). */
  readonly javaContainer?: string;
  /** Java container version (runtime only). */
  readonly javaContainerVersion?: string;
  /** <code>true</code> if the stack is in preview; otherwise, <code>false</code>. */
  readonly isPreview?: boolean;
  /** <code>true</code> if the stack is deprecated; otherwise, <code>false</code>. */
  readonly isDeprecated?: boolean;
  /** <code>true</code> if the stack should be hidden; otherwise, <code>false</code>. */
  readonly isHidden?: boolean;
  /** End-of-life date for the minor version. */
  readonly endOfLifeDate?: Date;
  /** <code>true</code> if the stack version is auto-updated; otherwise, <code>false</code>. */
  readonly isAutoUpdate?: boolean;
  /** <code>true</code> if the minor version is early-access; otherwise, <code>false</code>. */
  readonly isEarlyAccess?: boolean;
}

export function windowsJavaContainerSettingsDeserializer(item: any): WindowsJavaContainerSettings {
  return {
    javaContainer: item["javaContainer"],
    javaContainerVersion: item["javaContainerVersion"],
    isPreview: item["isPreview"],
    isDeprecated: item["isDeprecated"],
    isHidden: item["isHidden"],
    endOfLifeDate: !item["endOfLifeDate"] ? item["endOfLifeDate"] : new Date(item["endOfLifeDate"]),
    isAutoUpdate: item["isAutoUpdate"],
    isEarlyAccess: item["isEarlyAccess"],
  };
}

/** Collection of deleted apps. */
export interface _DeletedWebAppCollection {
  /** The DeletedSite items on this page */
  value: DeletedSite[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deletedWebAppCollectionDeserializer(item: any): _DeletedWebAppCollection {
  return {
    value: deletedSiteArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deletedSiteArrayDeserializer(result: Array<DeletedSite>): any[] {
  return result.map((item) => {
    return deletedSiteDeserializer(item);
  });
}

/** Used for getting ResourceHealthCheck settings. */
export interface ResourceHealthMetadata extends ProxyResource {
  /** Kind of resource. */
  kind?: string;
  /** The category that the resource matches in the RHC Policy File */
  category?: string;
  /** Is there a health signal for the resource */
  signalAvailability?: boolean;
}

export function resourceHealthMetadataDeserializer(item: any): ResourceHealthMetadata {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _resourceHealthMetadataPropertiesDeserializer(item["properties"])),
    kind: item["kind"],
  };
}

/** ResourceHealthMetadata resource specific properties */
export interface ResourceHealthMetadataProperties {
  /** The category that the resource matches in the RHC Policy File */
  category?: string;
  /** Is there a health signal for the resource */
  signalAvailability?: boolean;
}

export function resourceHealthMetadataPropertiesDeserializer(
  item: any,
): ResourceHealthMetadataProperties {
  return {
    category: item["category"],
    signalAvailability: item["signalAvailability"],
  };
}

/** Collection of resource health metadata. */
export interface _ResourceHealthMetadataCollection {
  /** The ResourceHealthMetadata items on this page */
  value: ResourceHealthMetadata[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resourceHealthMetadataCollectionDeserializer(
  item: any,
): _ResourceHealthMetadataCollection {
  return {
    value: resourceHealthMetadataArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function resourceHealthMetadataArrayDeserializer(
  result: Array<ResourceHealthMetadata>,
): any[] {
  return result.map((item) => {
    return resourceHealthMetadataDeserializer(item);
  });
}

/** The access key regenerate action content. */
export interface RegenerateActionParameter {
  /** The key type. */
  keyType?: KeyType;
}

export function regenerateActionParameterSerializer(item: RegenerateActionParameter): any {
  return { keyType: item["keyType"] };
}

/** The key type. */
export enum KnownKeyType {
  /** NotSpecified */
  NotSpecified = "NotSpecified",
  /** Primary */
  Primary = "Primary",
  /** Secondary */
  Secondary = "Secondary",
}

/**
 * The key type. \
 * {@link KnownKeyType} can be used interchangeably with KeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified** \
 * **Primary** \
 * **Secondary**
 */
export type KeyType = string;

/** The workflow type. */
export interface Workflow extends WorkflowResource {
  /** Managed service identity. */
  identity?: ManagedServiceIdentity;
  /** Gets the provisioning state. */
  readonly provisioningState?: WorkflowProvisioningState;
  /** Gets the created time. */
  readonly createdTime?: Date;
  /** Gets the changed time. */
  readonly changedTime?: Date;
  /** The state. */
  state?: WorkflowState;
  /** Gets the version. */
  readonly version?: string;
  /** Gets the access endpoint. */
  readonly accessEndpoint?: string;
  /** The endpoints configuration. */
  endpointsConfiguration?: FlowEndpointsConfiguration;
  /** The access control configuration. */
  accessControl?: FlowAccessControlConfiguration;
  /** The sku. */
  readonly sku?: WorkflowSku;
  /** The integration account. */
  integrationAccount?: ResourceReference;
  /** The integration service environment. */
  integrationServiceEnvironment?: ResourceReference;
  /** The definition. */
  definition?: any;
  /** The parameters. */
  parameters?: Record<string, WorkflowParameter>;
  /** The workflow kind. */
  kind?: Kind;
}

export function workflowSerializer(item: Workflow): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "state",
      "endpointsConfiguration",
      "accessControl",
      "integrationAccount",
      "integrationServiceEnvironment",
      "definition",
      "parameters",
      "kind",
    ])
      ? undefined
      : _workflowPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** The workflow properties. */
export interface WorkflowProperties {
  /** Gets the provisioning state. */
  readonly provisioningState?: WorkflowProvisioningState;
  /** Gets the created time. */
  readonly createdTime?: Date;
  /** Gets the changed time. */
  readonly changedTime?: Date;
  /** The state. */
  state?: WorkflowState;
  /** Gets the version. */
  readonly version?: string;
  /** Gets the access endpoint. */
  readonly accessEndpoint?: string;
  /** The endpoints configuration. */
  endpointsConfiguration?: FlowEndpointsConfiguration;
  /** The access control configuration. */
  accessControl?: FlowAccessControlConfiguration;
  /** The sku. */
  readonly sku?: WorkflowSku;
  /** The integration account. */
  integrationAccount?: ResourceReference;
  /** The integration service environment. */
  integrationServiceEnvironment?: ResourceReference;
  /** The definition. */
  definition?: any;
  /** The parameters. */
  parameters?: Record<string, WorkflowParameter>;
  /** The workflow kind. */
  kind?: Kind;
}

export function workflowPropertiesSerializer(item: WorkflowProperties): any {
  return {
    state: item["state"],
    endpointsConfiguration: !item["endpointsConfiguration"]
      ? item["endpointsConfiguration"]
      : flowEndpointsConfigurationSerializer(item["endpointsConfiguration"]),
    accessControl: !item["accessControl"]
      ? item["accessControl"]
      : flowAccessControlConfigurationSerializer(item["accessControl"]),
    integrationAccount: !item["integrationAccount"]
      ? item["integrationAccount"]
      : resourceReferenceSerializer(item["integrationAccount"]),
    integrationServiceEnvironment: !item["integrationServiceEnvironment"]
      ? item["integrationServiceEnvironment"]
      : resourceReferenceSerializer(item["integrationServiceEnvironment"]),
    definition: item["definition"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : workflowParameterRecordSerializer(item["parameters"]),
    kind: item["kind"],
  };
}

/** The workflow kind. */
export enum KnownKind {
  /** Stateful */
  Stateful = "Stateful",
  /** Stateless */
  Stateless = "Stateless",
}

/**
 * The workflow kind. \
 * {@link KnownKind} can be used interchangeably with Kind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Stateful** \
 * **Stateless**
 */
export type Kind = string;

/** The base resource type. */
export interface WorkflowResource {
  /** The resource id. */
  readonly id?: string;
  /** Gets the resource name. */
  readonly name?: string;
  /** Gets the resource type. */
  readonly type?: string;
  /** The resource location. */
  location?: string;
  /** The resource tags. */
  tags?: Record<string, string>;
}

export function workflowResourceSerializer(item: WorkflowResource): any {
  return { location: item["location"], tags: item["tags"] };
}

/** The request history. */
export interface RequestHistory extends TrackedResource {
  /** The request history properties. */
  properties?: RequestHistoryProperties;
}

export function requestHistoryDeserializer(item: any): RequestHistory {
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
      : requestHistoryPropertiesDeserializer(item["properties"]),
  };
}

/** The request history. */
export interface RequestHistoryProperties {
  /** The time the request started. */
  startTime?: Date;
  /** The time the request ended. */
  endTime?: Date;
  /** The request. */
  request?: Request;
  /** The response. */
  response?: Response;
}

export function requestHistoryPropertiesDeserializer(item: any): RequestHistoryProperties {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    request: !item["request"] ? item["request"] : requestDeserializer(item["request"]),
    response: !item["response"] ? item["response"] : responseDeserializer(item["response"]),
  };
}

/** A request. */
export interface Request {
  /** A list of all the headers attached to the request. */
  headers?: any;
  /** The destination for the request. */
  uri?: string;
  /** The HTTP method used for the request. */
  method?: string;
}

export function requestDeserializer(item: any): Request {
  return {
    headers: item["headers"],
    uri: item["uri"],
    method: item["method"],
  };
}

/** A response. */
export interface Response {
  /** A list of all the headers attached to the response. */
  headers?: any;
  /** The status code of the response. */
  statusCode?: number;
  /** Details on the location of the body content. */
  bodyLink?: ContentLink;
}

export function responseDeserializer(item: any): Response {
  return {
    headers: item["headers"],
    statusCode: item["statusCode"],
    bodyLink: !item["bodyLink"] ? item["bodyLink"] : contentLinkDeserializer(item["bodyLink"]),
  };
}

/** The response of a RequestHistory list operation. */
export interface _RequestHistoryListResult {
  /** The RequestHistory items on this page */
  value: RequestHistory[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _requestHistoryListResultDeserializer(item: any): _RequestHistoryListResult {
  return {
    value: requestHistoryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function requestHistoryArrayDeserializer(result: Array<RequestHistory>): any[] {
  return result.map((item) => {
    return requestHistoryDeserializer(item);
  });
}

/** Known values of {@link SkuName} that the service accepts. */
export enum KnownSkuName {
  /** Free */
  Free = "Free",
  /** Shared */
  Shared = "Shared",
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
  /** Premium */
  Premium = "Premium",
  /** Dynamic */
  Dynamic = "Dynamic",
  /** Isolated */
  Isolated = "Isolated",
  /** IsolatedV2 */
  IsolatedV2 = "IsolatedV2",
  /** PremiumV2 */
  PremiumV2 = "PremiumV2",
  /** PremiumV3 */
  PremiumV3 = "PremiumV3",
  /** PremiumContainer */
  PremiumContainer = "PremiumContainer",
  /** ElasticPremium */
  ElasticPremium = "ElasticPremium",
  /** ElasticIsolated */
  ElasticIsolated = "ElasticIsolated",
  /** FlexConsumption */
  FlexConsumption = "FlexConsumption",
}

/** Type of SkuName */
export type SkuName = string;

/** Known values of {@link ProviderOsTypeSelected} that the service accepts. */
export enum KnownProviderOsTypeSelected {
  /** Windows */
  Windows = "Windows",
  /** Linux */
  Linux = "Linux",
  /** WindowsFunctions */
  WindowsFunctions = "WindowsFunctions",
  /** LinuxFunctions */
  LinuxFunctions = "LinuxFunctions",
  /** All */
  All = "All",
}

/** Type of ProviderOsTypeSelected */
export type ProviderOsTypeSelected = string;

/** Known values of {@link ProviderStackOsType} that the service accepts. */
export enum KnownProviderStackOsType {
  /** Windows */
  Windows = "Windows",
  /** Linux */
  Linux = "Linux",
  /** All */
  All = "All",
}

/** Type of ProviderStackOsType */
export type ProviderStackOsType = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-03-01 API version. */
  V20250301 = "2025-03-01",
  /** The 2025-05-01 API version. */
  V20250501 = "2025-05-01",
}

export function vnetInfoResourceArraySerializer(result: Array<VnetInfoResource>): any[] {
  return result.map((item) => {
    return vnetInfoResourceSerializer(item);
  });
}

export function vnetInfoResourceArrayDeserializer(result: Array<VnetInfoResource>): any[] {
  return result.map((item) => {
    return vnetInfoResourceDeserializer(item);
  });
}

export function networkTraceArrayDeserializer(result: Array<NetworkTrace>): any[] {
  return result.map((item) => {
    return networkTraceDeserializer(item);
  });
}

export function hostingEnvironmentDiagnosticsArrayDeserializer(
  result: Array<HostingEnvironmentDiagnostics>,
): any[] {
  return result.map((item) => {
    return hostingEnvironmentDiagnosticsDeserializer(item);
  });
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

export function _customDnsSuffixConfigurationPropertiesSerializer(
  item: CustomDnsSuffixConfiguration,
): any {
  return {
    dnsSuffix: item["dnsSuffix"],
    certificateUrl: item["certificateUrl"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
  };
}

export function _customDnsSuffixConfigurationPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    provisioningDetails: item["provisioningDetails"],
    dnsSuffix: item["dnsSuffix"],
    certificateUrl: item["certificateUrl"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
  };
}

export function _aseV3NetworkingConfigurationPropertiesSerializer(
  item: AseV3NetworkingConfiguration,
): any {
  return {
    allowNewPrivateEndpointConnections: item["allowNewPrivateEndpointConnections"],
    ftpEnabled: item["ftpEnabled"],
    remoteDebugEnabled: item["remoteDebugEnabled"],
    inboundIpAddressOverride: item["inboundIpAddressOverride"],
  };
}

export function _aseV3NetworkingConfigurationPropertiesDeserializer(item: any) {
  return {
    windowsOutboundIpAddresses: !item["windowsOutboundIpAddresses"]
      ? item["windowsOutboundIpAddresses"]
      : item["windowsOutboundIpAddresses"].map((p: any) => {
          return p;
        }),
    linuxOutboundIpAddresses: !item["linuxOutboundIpAddresses"]
      ? item["linuxOutboundIpAddresses"]
      : item["linuxOutboundIpAddresses"].map((p: any) => {
          return p;
        }),
    externalInboundIpAddresses: !item["externalInboundIpAddresses"]
      ? item["externalInboundIpAddresses"]
      : item["externalInboundIpAddresses"].map((p: any) => {
          return p;
        }),
    internalInboundIpAddresses: !item["internalInboundIpAddresses"]
      ? item["internalInboundIpAddresses"]
      : item["internalInboundIpAddresses"].map((p: any) => {
          return p;
        }),
    allowNewPrivateEndpointConnections: item["allowNewPrivateEndpointConnections"],
    ftpEnabled: item["ftpEnabled"],
    remoteDebugEnabled: item["remoteDebugEnabled"],
    inboundIpAddressOverride: item["inboundIpAddressOverride"],
  };
}

export function _validateRequestPropertiesSerializer(item: ValidateRequest): any {
  return {
    serverFarmId: item["serverFarmId"],
    skuName: item["skuName"],
    needLinuxWorkers: item["needLinuxWorkers"],
    isSpot: item["isSpot"],
    capacity: item["capacity"],
    hostingEnvironment: item["hostingEnvironment"],
    isXenon: item["isXenon"],
    containerRegistryBaseUrl: item["containerRegistryBaseUrl"],
    containerRegistryUsername: item["containerRegistryUsername"],
    containerRegistryPassword: item["containerRegistryPassword"],
    containerImageRepository: item["containerImageRepository"],
    containerImageTag: item["containerImageTag"],
    containerImagePlatform: item["containerImagePlatform"],
    appServiceEnvironment: !item["appServiceEnvironment"]
      ? item["appServiceEnvironment"]
      : appServiceEnvironmentSerializer(item["appServiceEnvironment"]),
  };
}

export function _geoRegionPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
    displayName: item["displayName"],
    orgDomain: item["orgDomain"],
  };
}

export function _aseRegionPropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    standard: item["standard"],
    dedicatedHost: item["dedicatedHost"],
    zoneRedundant: item["zoneRedundant"],
    availableSku: !item["availableSku"]
      ? item["availableSku"]
      : item["availableSku"].map((p: any) => {
          return p;
        }),
    availableOS: !item["availableOS"]
      ? item["availableOS"]
      : item["availableOS"].map((p: any) => {
          return p;
        }),
  };
}

export function _billingMeterPropertiesDeserializer(item: any) {
  return {
    meterId: item["meterId"],
    billingLocation: item["billingLocation"],
    shortName: item["shortName"],
    friendlyName: item["friendlyName"],
    resourceType: item["resourceType"],
    osType: item["osType"],
    multiplier: item["multiplier"],
  };
}

export function _identifierPropertiesSerializer(item: Identifier): any {
  return { id: item["value"] };
}

export function _identifierPropertiesDeserializer(item: any) {
  return {
    value: item["id"],
  };
}

export function _customHostnameSitesPropertiesDeserializer(item: any) {
  return {
    customHostname: item["customHostname"],
    region: item["region"],
    siteResourceIds: !item["siteResourceIds"]
      ? item["siteResourceIds"]
      : identifierArrayDeserializer(item["siteResourceIds"]),
  };
}

export function _premierAddOnOfferPropertiesDeserializer(item: any) {
  return {
    sku: item["sku"],
    product: item["product"],
    vendor: item["vendor"],
    promoCodeRequired: item["promoCodeRequired"],
    quota: item["quota"],
    webHostingPlanRestrictions: item["webHostingPlanRestrictions"],
    privacyPolicyUrl: item["privacyPolicyUrl"],
    legalTermsUrl: item["legalTermsUrl"],
    marketplacePublisher: item["marketplacePublisher"],
    marketplaceOffer: item["marketplaceOffer"],
  };
}

export function _vnetParametersPropertiesSerializer(item: VnetParameters): any {
  return {
    vnetResourceGroup: item["vnetResourceGroup"],
    vnetName: item["vnetName"],
    vnetSubnetName: item["vnetSubnetName"],
    subnetResourceId: item["subnetResourceId"],
  };
}

export function _vnetValidationTestFailurePropertiesDeserializer(item: any) {
  return {
    testName: item["testName"],
    details: item["details"],
  };
}

export function _vnetValidationFailureDetailsPropertiesDeserializer(item: any) {
  return {
    message: item["message"],
    failed: item["failed"],
    failedTests: !item["failedTests"]
      ? item["failedTests"]
      : vnetValidationTestFailureArrayDeserializer(item["failedTests"]),
    warnings: !item["warnings"]
      ? item["warnings"]
      : vnetValidationTestFailureArrayDeserializer(item["warnings"]),
  };
}

export function _userPropertiesSerializer(item: User): any {
  return {
    publishingUserName: item["publishingUserName"],
    publishingPassword: item["publishingPassword"],
    publishingPasswordHash: item["publishingPasswordHash"],
    publishingPasswordHashSalt: item["publishingPasswordHashSalt"],
    scmUri: item["scmUri"],
  };
}

export function _userPropertiesDeserializer(item: any) {
  return {
    publishingUserName: item["publishingUserName"],
    publishingPassword: item["publishingPassword"],
    publishingPasswordHash: item["publishingPasswordHash"],
    publishingPasswordHashSalt: item["publishingPasswordHashSalt"],
    scmUri: item["scmUri"],
  };
}

export function _sourceControlPropertiesSerializer(item: SourceControl): any {
  return {
    token: item["token"],
    tokenSecret: item["tokenSecret"],
    refreshToken: item["refreshToken"],
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : item["expirationTime"].toISOString(),
  };
}

export function _sourceControlPropertiesDeserializer(item: any) {
  return {
    token: item["token"],
    tokenSecret: item["tokenSecret"],
    refreshToken: item["refreshToken"],
    expirationTime: !item["expirationTime"]
      ? item["expirationTime"]
      : new Date(item["expirationTime"]),
  };
}

export function _workerPoolResourcePropertiesSerializer(item: WorkerPoolResource): any {
  return {
    workerSizeId: item["workerSizeId"],
    computeMode: item["computeMode"],
    workerSize: item["workerSize"],
    workerCount: item["workerCount"],
  };
}

export function _workerPoolResourcePropertiesDeserializer(item: any) {
  return {
    workerSizeId: item["workerSizeId"],
    computeMode: item["computeMode"],
    workerSize: item["workerSize"],
    workerCount: item["workerCount"],
    instanceNames: !item["instanceNames"]
      ? item["instanceNames"]
      : item["instanceNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _resourceMetricDefinitionPropertiesDeserializer(item: any) {
  return {
    unit: item["unit"],
    primaryAggregationType: item["primaryAggregationType"],
    metricAvailabilities: !item["metricAvailabilities"]
      ? item["metricAvailabilities"]
      : resourceMetricAvailabilityArrayDeserializer(item["metricAvailabilities"]),
    resourceUri: item["resourceUri"],
    properties: !item["properties"]
      ? item["properties"]
      : Object.fromEntries(
          Object.entries(item["properties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function _usagePropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    resourceName: item["resourceName"],
    unit: item["unit"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    nextResetTime: !item["nextResetTime"] ? item["nextResetTime"] : new Date(item["nextResetTime"]),
    computeMode: item["computeMode"],
    siteMode: item["siteMode"],
  };
}

export function _appServiceEnvironmentResourcePropertiesSerializer(
  item: AppServiceEnvironmentResource,
): any {
  return {
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : virtualNetworkProfileSerializer(item["virtualNetwork"]),
    internalLoadBalancingMode: item["internalLoadBalancingMode"],
    multiSize: item["multiSize"],
    ipsslAddressCount: item["ipsslAddressCount"],
    dnsSuffix: item["dnsSuffix"],
    frontEndScaleFactor: item["frontEndScaleFactor"],
    clusterSettings: !item["clusterSettings"]
      ? item["clusterSettings"]
      : nameValuePairArraySerializer(item["clusterSettings"]),
    userWhitelistedIpRanges: !item["userWhitelistedIpRanges"]
      ? item["userWhitelistedIpRanges"]
      : item["userWhitelistedIpRanges"].map((p: any) => {
          return p;
        }),
    upgradePreference: item["upgradePreference"],
    dedicatedHostCount: item["dedicatedHostCount"],
    zoneRedundant: item["zoneRedundant"],
    customDnsSuffixConfiguration: !item["customDnsSuffixConfiguration"]
      ? item["customDnsSuffixConfiguration"]
      : customDnsSuffixConfigurationSerializer(item["customDnsSuffixConfiguration"]),
    networkingConfiguration: !item["networkingConfiguration"]
      ? item["networkingConfiguration"]
      : aseV3NetworkingConfigurationSerializer(item["networkingConfiguration"]),
  };
}

export function _appServiceEnvironmentResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : virtualNetworkProfileDeserializer(item["virtualNetwork"]),
    internalLoadBalancingMode: item["internalLoadBalancingMode"],
    multiSize: item["multiSize"],
    multiRoleCount: item["multiRoleCount"],
    ipsslAddressCount: item["ipsslAddressCount"],
    dnsSuffix: item["dnsSuffix"],
    maximumNumberOfMachines: item["maximumNumberOfMachines"],
    frontEndScaleFactor: item["frontEndScaleFactor"],
    suspended: item["suspended"],
    clusterSettings: !item["clusterSettings"]
      ? item["clusterSettings"]
      : nameValuePairArrayDeserializer(item["clusterSettings"]),
    userWhitelistedIpRanges: !item["userWhitelistedIpRanges"]
      ? item["userWhitelistedIpRanges"]
      : item["userWhitelistedIpRanges"].map((p: any) => {
          return p;
        }),
    hasLinuxWorkers: item["hasLinuxWorkers"],
    upgradePreference: item["upgradePreference"],
    dedicatedHostCount: item["dedicatedHostCount"],
    zoneRedundant: item["zoneRedundant"],
    customDnsSuffixConfiguration: !item["customDnsSuffixConfiguration"]
      ? item["customDnsSuffixConfiguration"]
      : customDnsSuffixConfigurationDeserializer(item["customDnsSuffixConfiguration"]),
    networkingConfiguration: !item["networkingConfiguration"]
      ? item["networkingConfiguration"]
      : aseV3NetworkingConfigurationDeserializer(item["networkingConfiguration"]),
    upgradeAvailability: item["upgradeAvailability"],
  };
}

export function _appServiceEnvironmentPatchResourcePropertiesSerializer(
  item: AppServiceEnvironmentPatchResource,
): any {
  return {
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : virtualNetworkProfileSerializer(item["virtualNetwork"]),
    internalLoadBalancingMode: item["internalLoadBalancingMode"],
    multiSize: item["multiSize"],
    ipsslAddressCount: item["ipsslAddressCount"],
    dnsSuffix: item["dnsSuffix"],
    frontEndScaleFactor: item["frontEndScaleFactor"],
    clusterSettings: !item["clusterSettings"]
      ? item["clusterSettings"]
      : nameValuePairArraySerializer(item["clusterSettings"]),
    userWhitelistedIpRanges: !item["userWhitelistedIpRanges"]
      ? item["userWhitelistedIpRanges"]
      : item["userWhitelistedIpRanges"].map((p: any) => {
          return p;
        }),
    upgradePreference: item["upgradePreference"],
    dedicatedHostCount: item["dedicatedHostCount"],
    zoneRedundant: item["zoneRedundant"],
    customDnsSuffixConfiguration: !item["customDnsSuffixConfiguration"]
      ? item["customDnsSuffixConfiguration"]
      : customDnsSuffixConfigurationSerializer(item["customDnsSuffixConfiguration"]),
    networkingConfiguration: !item["networkingConfiguration"]
      ? item["networkingConfiguration"]
      : aseV3NetworkingConfigurationSerializer(item["networkingConfiguration"]),
  };
}

export function _appServiceEnvironmentPatchResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : virtualNetworkProfileDeserializer(item["virtualNetwork"]),
    internalLoadBalancingMode: item["internalLoadBalancingMode"],
    multiSize: item["multiSize"],
    multiRoleCount: item["multiRoleCount"],
    ipsslAddressCount: item["ipsslAddressCount"],
    dnsSuffix: item["dnsSuffix"],
    maximumNumberOfMachines: item["maximumNumberOfMachines"],
    frontEndScaleFactor: item["frontEndScaleFactor"],
    suspended: item["suspended"],
    clusterSettings: !item["clusterSettings"]
      ? item["clusterSettings"]
      : nameValuePairArrayDeserializer(item["clusterSettings"]),
    userWhitelistedIpRanges: !item["userWhitelistedIpRanges"]
      ? item["userWhitelistedIpRanges"]
      : item["userWhitelistedIpRanges"].map((p: any) => {
          return p;
        }),
    hasLinuxWorkers: item["hasLinuxWorkers"],
    upgradePreference: item["upgradePreference"],
    dedicatedHostCount: item["dedicatedHostCount"],
    zoneRedundant: item["zoneRedundant"],
    customDnsSuffixConfiguration: !item["customDnsSuffixConfiguration"]
      ? item["customDnsSuffixConfiguration"]
      : customDnsSuffixConfigurationDeserializer(item["customDnsSuffixConfiguration"]),
    networkingConfiguration: !item["networkingConfiguration"]
      ? item["networkingConfiguration"]
      : aseV3NetworkingConfigurationDeserializer(item["networkingConfiguration"]),
    upgradeAvailability: item["upgradeAvailability"],
  };
}

export function _pushSettingsPropertiesSerializer(item: PushSettings): any {
  return {
    isPushEnabled: item["isPushEnabled"],
    tagWhitelistJson: item["tagWhitelistJson"],
    tagsRequiringAuth: item["tagsRequiringAuth"],
    dynamicTagsJson: item["dynamicTagsJson"],
  };
}

export function _pushSettingsPropertiesDeserializer(item: any) {
  return {
    isPushEnabled: item["isPushEnabled"],
    tagWhitelistJson: item["tagWhitelistJson"],
    tagsRequiringAuth: item["tagsRequiringAuth"],
    dynamicTagsJson: item["dynamicTagsJson"],
  };
}

export function _sitePropertiesSerializer(item: Site): any {
  return {
    enabled: item["enabled"],
    hostNameSslStates: !item["hostNameSslStates"]
      ? item["hostNameSslStates"]
      : hostNameSslStateArraySerializer(item["hostNameSslStates"]),
    serverFarmId: item["serverFarmId"],
    reserved: item["reserved"],
    isXenon: item["isXenon"],
    hyperV: item["hyperV"],
    dnsConfiguration: !item["dnsConfiguration"]
      ? item["dnsConfiguration"]
      : siteDnsConfigSerializer(item["dnsConfiguration"]),
    outboundVnetRouting: !item["outboundVnetRouting"]
      ? item["outboundVnetRouting"]
      : outboundVnetRoutingSerializer(item["outboundVnetRouting"]),
    siteConfig: !item["siteConfig"] ? item["siteConfig"] : siteConfigSerializer(item["siteConfig"]),
    functionAppConfig: !item["functionAppConfig"]
      ? item["functionAppConfig"]
      : functionAppConfigSerializer(item["functionAppConfig"]),
    daprConfig: !item["daprConfig"] ? item["daprConfig"] : daprConfigSerializer(item["daprConfig"]),
    workloadProfileName: item["workloadProfileName"],
    resourceConfig: !item["resourceConfig"]
      ? item["resourceConfig"]
      : resourceConfigSerializer(item["resourceConfig"]),
    scmSiteAlsoStopped: item["scmSiteAlsoStopped"],
    hostingEnvironmentProfile: !item["hostingEnvironmentProfile"]
      ? item["hostingEnvironmentProfile"]
      : hostingEnvironmentProfileSerializer(item["hostingEnvironmentProfile"]),
    clientAffinityEnabled: item["clientAffinityEnabled"],
    clientAffinityPartitioningEnabled: item["clientAffinityPartitioningEnabled"],
    clientAffinityProxyEnabled: item["clientAffinityProxyEnabled"],
    clientCertEnabled: item["clientCertEnabled"],
    clientCertMode: item["clientCertMode"],
    clientCertExclusionPaths: item["clientCertExclusionPaths"],
    ipMode: item["ipMode"],
    endToEndEncryptionEnabled: item["endToEndEncryptionEnabled"],
    sshEnabled: item["sshEnabled"],
    hostNamesDisabled: item["hostNamesDisabled"],
    customDomainVerificationId: item["customDomainVerificationId"],
    containerSize: item["containerSize"],
    dailyMemoryTimeQuota: item["dailyMemoryTimeQuota"],
    cloningInfo: !item["cloningInfo"]
      ? item["cloningInfo"]
      : cloningInfoSerializer(item["cloningInfo"]),
    httpsOnly: item["httpsOnly"],
    redundancyMode: item["redundancyMode"],
    publicNetworkAccess: item["publicNetworkAccess"],
    storageAccountRequired: item["storageAccountRequired"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
    autoGeneratedDomainNameLabelScope: item["autoGeneratedDomainNameLabelScope"],
    virtualNetworkSubnetId: item["virtualNetworkSubnetId"],
    managedEnvironmentId: item["managedEnvironmentId"],
  };
}

export function _sitePropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    hostNames: !item["hostNames"]
      ? item["hostNames"]
      : item["hostNames"].map((p: any) => {
          return p;
        }),
    repositorySiteName: item["repositorySiteName"],
    usageState: item["usageState"],
    enabled: item["enabled"],
    enabledHostNames: !item["enabledHostNames"]
      ? item["enabledHostNames"]
      : item["enabledHostNames"].map((p: any) => {
          return p;
        }),
    availabilityState: item["availabilityState"],
    hostNameSslStates: !item["hostNameSslStates"]
      ? item["hostNameSslStates"]
      : hostNameSslStateArrayDeserializer(item["hostNameSslStates"]),
    serverFarmId: item["serverFarmId"],
    reserved: item["reserved"],
    isXenon: item["isXenon"],
    hyperV: item["hyperV"],
    lastModifiedTimeUtc: !item["lastModifiedTimeUtc"]
      ? item["lastModifiedTimeUtc"]
      : new Date(item["lastModifiedTimeUtc"]),
    dnsConfiguration: !item["dnsConfiguration"]
      ? item["dnsConfiguration"]
      : siteDnsConfigDeserializer(item["dnsConfiguration"]),
    outboundVnetRouting: !item["outboundVnetRouting"]
      ? item["outboundVnetRouting"]
      : outboundVnetRoutingDeserializer(item["outboundVnetRouting"]),
    siteConfig: !item["siteConfig"]
      ? item["siteConfig"]
      : siteConfigDeserializer(item["siteConfig"]),
    functionAppConfig: !item["functionAppConfig"]
      ? item["functionAppConfig"]
      : functionAppConfigDeserializer(item["functionAppConfig"]),
    daprConfig: !item["daprConfig"]
      ? item["daprConfig"]
      : daprConfigDeserializer(item["daprConfig"]),
    workloadProfileName: item["workloadProfileName"],
    resourceConfig: !item["resourceConfig"]
      ? item["resourceConfig"]
      : resourceConfigDeserializer(item["resourceConfig"]),
    trafficManagerHostNames: !item["trafficManagerHostNames"]
      ? item["trafficManagerHostNames"]
      : item["trafficManagerHostNames"].map((p: any) => {
          return p;
        }),
    scmSiteAlsoStopped: item["scmSiteAlsoStopped"],
    targetSwapSlot: item["targetSwapSlot"],
    hostingEnvironmentProfile: !item["hostingEnvironmentProfile"]
      ? item["hostingEnvironmentProfile"]
      : hostingEnvironmentProfileDeserializer(item["hostingEnvironmentProfile"]),
    clientAffinityEnabled: item["clientAffinityEnabled"],
    clientAffinityPartitioningEnabled: item["clientAffinityPartitioningEnabled"],
    clientAffinityProxyEnabled: item["clientAffinityProxyEnabled"],
    clientCertEnabled: item["clientCertEnabled"],
    clientCertMode: item["clientCertMode"],
    clientCertExclusionPaths: item["clientCertExclusionPaths"],
    ipMode: item["ipMode"],
    endToEndEncryptionEnabled: item["endToEndEncryptionEnabled"],
    sshEnabled: item["sshEnabled"],
    hostNamesDisabled: item["hostNamesDisabled"],
    customDomainVerificationId: item["customDomainVerificationId"],
    outboundIpAddresses: item["outboundIpAddresses"],
    possibleOutboundIpAddresses: item["possibleOutboundIpAddresses"],
    containerSize: item["containerSize"],
    dailyMemoryTimeQuota: item["dailyMemoryTimeQuota"],
    suspendedTill: !item["suspendedTill"] ? item["suspendedTill"] : new Date(item["suspendedTill"]),
    maxNumberOfWorkers: item["maxNumberOfWorkers"],
    cloningInfo: !item["cloningInfo"]
      ? item["cloningInfo"]
      : cloningInfoDeserializer(item["cloningInfo"]),
    resourceGroup: item["resourceGroup"],
    isDefaultContainer: item["isDefaultContainer"],
    defaultHostName: item["defaultHostName"],
    slotSwapStatus: !item["slotSwapStatus"]
      ? item["slotSwapStatus"]
      : slotSwapStatusDeserializer(item["slotSwapStatus"]),
    httpsOnly: item["httpsOnly"],
    redundancyMode: item["redundancyMode"],
    inProgressOperationId: item["inProgressOperationId"],
    publicNetworkAccess: item["publicNetworkAccess"],
    storageAccountRequired: item["storageAccountRequired"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
    autoGeneratedDomainNameLabelScope: item["autoGeneratedDomainNameLabelScope"],
    virtualNetworkSubnetId: item["virtualNetworkSubnetId"],
    managedEnvironmentId: item["managedEnvironmentId"],
    sku: item["sku"],
  };
}

export function _appServicePlanPropertiesSerializer(item: AppServicePlan): any {
  return {
    workerTierName: item["workerTierName"],
    hostingEnvironmentProfile: !item["hostingEnvironmentProfile"]
      ? item["hostingEnvironmentProfile"]
      : hostingEnvironmentProfileSerializer(item["hostingEnvironmentProfile"]),
    perSiteScaling: item["perSiteScaling"],
    elasticScaleEnabled: item["elasticScaleEnabled"],
    maximumElasticWorkerCount: item["maximumElasticWorkerCount"],
    isSpot: item["isSpot"],
    spotExpirationTime: !item["spotExpirationTime"]
      ? item["spotExpirationTime"]
      : item["spotExpirationTime"].toISOString(),
    freeOfferExpirationTime: !item["freeOfferExpirationTime"]
      ? item["freeOfferExpirationTime"]
      : item["freeOfferExpirationTime"].toISOString(),
    reserved: item["reserved"],
    isXenon: item["isXenon"],
    hyperV: item["hyperV"],
    targetWorkerCount: item["targetWorkerCount"],
    targetWorkerSizeId: item["targetWorkerSizeId"],
    kubeEnvironmentProfile: !item["kubeEnvironmentProfile"]
      ? item["kubeEnvironmentProfile"]
      : kubeEnvironmentProfileSerializer(item["kubeEnvironmentProfile"]),
    zoneRedundant: item["zoneRedundant"],
    asyncScalingEnabled: item["asyncScalingEnabled"],
    planDefaultIdentity: !item["planDefaultIdentity"]
      ? item["planDefaultIdentity"]
      : defaultIdentitySerializer(item["planDefaultIdentity"]),
    isCustomMode: item["isCustomMode"],
    registryAdapters: !item["registryAdapters"]
      ? item["registryAdapters"]
      : registryAdapterArraySerializer(item["registryAdapters"]),
    installScripts: !item["installScripts"]
      ? item["installScripts"]
      : installScriptArraySerializer(item["installScripts"]),
    network: !item["network"]
      ? item["network"]
      : serverFarmNetworkSettingsSerializer(item["network"]),
    storageMounts: !item["storageMounts"]
      ? item["storageMounts"]
      : storageMountArraySerializer(item["storageMounts"]),
    rdpEnabled: item["rdpEnabled"],
  };
}

export function _appServicePlanPropertiesDeserializer(item: any) {
  return {
    workerTierName: item["workerTierName"],
    status: item["status"],
    subscription: item["subscription"],
    hostingEnvironmentProfile: !item["hostingEnvironmentProfile"]
      ? item["hostingEnvironmentProfile"]
      : hostingEnvironmentProfileDeserializer(item["hostingEnvironmentProfile"]),
    maximumNumberOfWorkers: item["maximumNumberOfWorkers"],
    numberOfWorkers: item["numberOfWorkers"],
    geoRegion: item["geoRegion"],
    perSiteScaling: item["perSiteScaling"],
    elasticScaleEnabled: item["elasticScaleEnabled"],
    maximumElasticWorkerCount: item["maximumElasticWorkerCount"],
    numberOfSites: item["numberOfSites"],
    isSpot: item["isSpot"],
    spotExpirationTime: !item["spotExpirationTime"]
      ? item["spotExpirationTime"]
      : new Date(item["spotExpirationTime"]),
    freeOfferExpirationTime: !item["freeOfferExpirationTime"]
      ? item["freeOfferExpirationTime"]
      : new Date(item["freeOfferExpirationTime"]),
    resourceGroup: item["resourceGroup"],
    reserved: item["reserved"],
    isXenon: item["isXenon"],
    hyperV: item["hyperV"],
    targetWorkerCount: item["targetWorkerCount"],
    targetWorkerSizeId: item["targetWorkerSizeId"],
    provisioningState: item["provisioningState"],
    kubeEnvironmentProfile: !item["kubeEnvironmentProfile"]
      ? item["kubeEnvironmentProfile"]
      : kubeEnvironmentProfileDeserializer(item["kubeEnvironmentProfile"]),
    zoneRedundant: item["zoneRedundant"],
    asyncScalingEnabled: item["asyncScalingEnabled"],
    planDefaultIdentity: !item["planDefaultIdentity"]
      ? item["planDefaultIdentity"]
      : defaultIdentityDeserializer(item["planDefaultIdentity"]),
    isCustomMode: item["isCustomMode"],
    registryAdapters: !item["registryAdapters"]
      ? item["registryAdapters"]
      : registryAdapterArrayDeserializer(item["registryAdapters"]),
    installScripts: !item["installScripts"]
      ? item["installScripts"]
      : installScriptArrayDeserializer(item["installScripts"]),
    network: !item["network"]
      ? item["network"]
      : serverFarmNetworkSettingsDeserializer(item["network"]),
    storageMounts: !item["storageMounts"]
      ? item["storageMounts"]
      : storageMountArrayDeserializer(item["storageMounts"]),
    rdpEnabled: item["rdpEnabled"],
  };
}

export function _addressResponsePropertiesDeserializer(item: any) {
  return {
    serviceIpAddress: item["serviceIpAddress"],
    internalIpAddress: item["internalIpAddress"],
    outboundIpAddresses: !item["outboundIpAddresses"]
      ? item["outboundIpAddresses"]
      : item["outboundIpAddresses"].map((p: any) => {
          return p;
        }),
    vipMappings: !item["vipMappings"]
      ? item["vipMappings"]
      : virtualIPMappingArrayDeserializer(item["vipMappings"]),
  };
}

export function _remotePrivateEndpointConnectionARMResourcePropertiesSerializer(
  item: RemotePrivateEndpointConnectionARMResource,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : armIdWrapperSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : item["ipAddresses"].map((p: any) => {
          return p;
        }),
  };
}

export function _remotePrivateEndpointConnectionARMResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : armIdWrapperDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : item["ipAddresses"].map((p: any) => {
          return p;
        }),
  };
}

export function _recommendationRulePropertiesDeserializer(item: any) {
  return {
    recommendationName: item["recommendationName"],
    displayName: item["displayName"],
    message: item["message"],
    recommendationId: item["recommendationId"],
    description: item["description"],
    actionName: item["actionName"],
    level: item["level"],
    channels: item["channels"],
    categoryTags: !item["categoryTags"]
      ? item["categoryTags"]
      : item["categoryTags"].map((p: any) => {
          return p;
        }),
    isDynamic: item["isDynamic"],
    extensionName: item["extensionName"],
    bladeName: item["bladeName"],
    forwardLink: item["forwardLink"],
  };
}

export function _recommendationPropertiesDeserializer(item: any) {
  return {
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    recommendationId: item["recommendationId"],
    resourceId: item["resourceId"],
    resourceScope: item["resourceScope"],
    ruleName: item["ruleName"],
    displayName: item["displayName"],
    message: item["message"],
    level: item["level"],
    channels: item["channels"],
    categoryTags: !item["categoryTags"]
      ? item["categoryTags"]
      : item["categoryTags"].map((p: any) => {
          return p;
        }),
    actionName: item["actionName"],
    enabled: item["enabled"],
    states: !item["states"]
      ? item["states"]
      : item["states"].map((p: any) => {
          return p;
        }),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    nextNotificationTime: !item["nextNotificationTime"]
      ? item["nextNotificationTime"]
      : new Date(item["nextNotificationTime"]),
    notificationExpirationTime: !item["notificationExpirationTime"]
      ? item["notificationExpirationTime"]
      : new Date(item["notificationExpirationTime"]),
    notifiedTime: !item["notifiedTime"] ? item["notifiedTime"] : new Date(item["notifiedTime"]),
    score: item["score"],
    isDynamic: item["isDynamic"],
    extensionName: item["extensionName"],
    bladeName: item["bladeName"],
    forwardLink: item["forwardLink"],
  };
}

export function _remotePrivateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : armIdWrapperDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : item["ipAddresses"].map((p: any) => {
          return p;
        }),
  };
}

export function _staticSiteUserProvidedFunctionAppPropertiesDeserializer(item: any) {
  return {
    functionAppResourceId: item["functionAppResourceId"],
    functionAppRegion: item["functionAppRegion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
  };
}

export function _staticSiteARMResourcePropertiesSerializer(item: StaticSiteARMResource): any {
  return {
    repositoryUrl: item["repositoryUrl"],
    branch: item["branch"],
    repositoryToken: item["repositoryToken"],
    buildProperties: !item["buildProperties"]
      ? item["buildProperties"]
      : staticSiteBuildPropertiesSerializer(item["buildProperties"]),
    stagingEnvironmentPolicy: item["stagingEnvironmentPolicy"],
    allowConfigFileUpdates: item["allowConfigFileUpdates"],
    templateProperties: !item["templateProperties"]
      ? item["templateProperties"]
      : staticSiteTemplateOptionsSerializer(item["templateProperties"]),
    provider: item["provider"],
    enterpriseGradeCdnStatus: item["enterpriseGradeCdnStatus"],
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function _staticSiteARMResourcePropertiesDeserializer(item: any) {
  return {
    defaultHostname: item["defaultHostname"],
    repositoryUrl: item["repositoryUrl"],
    branch: item["branch"],
    customDomains: !item["customDomains"]
      ? item["customDomains"]
      : item["customDomains"].map((p: any) => {
          return p;
        }),
    repositoryToken: item["repositoryToken"],
    buildProperties: !item["buildProperties"]
      ? item["buildProperties"]
      : staticSiteBuildPropertiesDeserializer(item["buildProperties"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : responseMessageEnvelopeRemotePrivateEndpointConnectionArrayDeserializer(
          item["privateEndpointConnections"],
        ),
    stagingEnvironmentPolicy: item["stagingEnvironmentPolicy"],
    allowConfigFileUpdates: item["allowConfigFileUpdates"],
    templateProperties: !item["templateProperties"]
      ? item["templateProperties"]
      : staticSiteTemplateOptionsDeserializer(item["templateProperties"]),
    contentDistributionEndpoint: item["contentDistributionEndpoint"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
    userProvidedFunctionApps: !item["userProvidedFunctionApps"]
      ? item["userProvidedFunctionApps"]
      : staticSiteUserProvidedFunctionAppArrayDeserializer(item["userProvidedFunctionApps"]),
    linkedBackends: !item["linkedBackends"]
      ? item["linkedBackends"]
      : staticSiteLinkedBackendArrayDeserializer(item["linkedBackends"]),
    provider: item["provider"],
    enterpriseGradeCdnStatus: item["enterpriseGradeCdnStatus"],
    publicNetworkAccess: item["publicNetworkAccess"],
    databaseConnections: !item["databaseConnections"]
      ? item["databaseConnections"]
      : databaseConnectionOverviewArrayDeserializer(item["databaseConnections"]),
  };
}

export function _staticSitePatchResourcePropertiesSerializer(item: StaticSitePatchResource): any {
  return {
    repositoryUrl: item["repositoryUrl"],
    branch: item["branch"],
    repositoryToken: item["repositoryToken"],
    buildProperties: !item["buildProperties"]
      ? item["buildProperties"]
      : staticSiteBuildPropertiesSerializer(item["buildProperties"]),
    stagingEnvironmentPolicy: item["stagingEnvironmentPolicy"],
    allowConfigFileUpdates: item["allowConfigFileUpdates"],
    templateProperties: !item["templateProperties"]
      ? item["templateProperties"]
      : staticSiteTemplateOptionsSerializer(item["templateProperties"]),
    provider: item["provider"],
    enterpriseGradeCdnStatus: item["enterpriseGradeCdnStatus"],
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function _staticSitePatchResourcePropertiesDeserializer(item: any) {
  return {
    defaultHostname: item["defaultHostname"],
    repositoryUrl: item["repositoryUrl"],
    branch: item["branch"],
    customDomains: !item["customDomains"]
      ? item["customDomains"]
      : item["customDomains"].map((p: any) => {
          return p;
        }),
    repositoryToken: item["repositoryToken"],
    buildProperties: !item["buildProperties"]
      ? item["buildProperties"]
      : staticSiteBuildPropertiesDeserializer(item["buildProperties"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : responseMessageEnvelopeRemotePrivateEndpointConnectionArrayDeserializer(
          item["privateEndpointConnections"],
        ),
    stagingEnvironmentPolicy: item["stagingEnvironmentPolicy"],
    allowConfigFileUpdates: item["allowConfigFileUpdates"],
    templateProperties: !item["templateProperties"]
      ? item["templateProperties"]
      : staticSiteTemplateOptionsDeserializer(item["templateProperties"]),
    contentDistributionEndpoint: item["contentDistributionEndpoint"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
    userProvidedFunctionApps: !item["userProvidedFunctionApps"]
      ? item["userProvidedFunctionApps"]
      : staticSiteUserProvidedFunctionAppArrayDeserializer(item["userProvidedFunctionApps"]),
    linkedBackends: !item["linkedBackends"]
      ? item["linkedBackends"]
      : staticSiteLinkedBackendArrayDeserializer(item["linkedBackends"]),
    provider: item["provider"],
    enterpriseGradeCdnStatus: item["enterpriseGradeCdnStatus"],
    publicNetworkAccess: item["publicNetworkAccess"],
    databaseConnections: !item["databaseConnections"]
      ? item["databaseConnections"]
      : databaseConnectionOverviewArrayDeserializer(item["databaseConnections"]),
  };
}

export function _staticSiteUserARMResourcePropertiesSerializer(
  item: StaticSiteUserARMResource,
): any {
  return { roles: item["roles"] };
}

export function _staticSiteUserARMResourcePropertiesDeserializer(item: any) {
  return {
    provider: item["provider"],
    userId: item["userId"],
    displayName: item["displayName"],
    roles: item["roles"],
  };
}

export function _staticSiteUserInvitationRequestResourcePropertiesSerializer(
  item: StaticSiteUserInvitationRequestResource,
): any {
  return {
    domain: item["domain"],
    provider: item["provider"],
    userDetails: item["userDetails"],
    roles: item["roles"],
    numHoursToExpiration: item["numHoursToExpiration"],
  };
}

export function _staticSiteUserInvitationResponseResourcePropertiesDeserializer(item: any) {
  return {
    expiresOn: !item["expiresOn"] ? item["expiresOn"] : new Date(item["expiresOn"]),
    invitationUrl: item["invitationUrl"],
  };
}

export function _staticSiteFunctionOverviewARMResourcePropertiesDeserializer(item: any) {
  return {
    functionName: item["functionName"],
    triggerType: item["triggerType"],
  };
}

export function _staticSiteResetPropertiesARMResourcePropertiesSerializer(
  item: StaticSiteResetPropertiesARMResource,
): any {
  return {
    repositoryToken: item["repositoryToken"],
    shouldUpdateRepository: item["shouldUpdateRepository"],
  };
}

export function _databaseConnectionPropertiesSerializer(item: DatabaseConnection): any {
  return {
    resourceId: item["resourceId"],
    connectionIdentity: item["connectionIdentity"],
    connectionString: item["connectionString"],
    region: item["region"],
  };
}

export function _databaseConnectionPropertiesDeserializer(item: any) {
  return {
    resourceId: item["resourceId"],
    connectionIdentity: item["connectionIdentity"],
    connectionString: item["connectionString"],
    region: item["region"],
    configurationFiles: !item["configurationFiles"]
      ? item["configurationFiles"]
      : staticSiteDatabaseConnectionConfigurationFileOverviewArrayDeserializer(
          item["configurationFiles"],
        ),
  };
}

export function _staticSiteZipDeploymentARMResourcePropertiesSerializer(
  item: StaticSiteZipDeploymentARMResource,
): any {
  return {
    appZipUrl: item["appZipUrl"],
    apiZipUrl: item["apiZipUrl"],
    deploymentTitle: item["deploymentTitle"],
    provider: item["provider"],
    functionLanguage: item["functionLanguage"],
  };
}

export function _staticSiteBuildARMResourcePropertiesDeserializer(item: any) {
  return {
    buildId: item["buildId"],
    sourceBranch: item["sourceBranch"],
    pullRequestTitle: item["pullRequestTitle"],
    hostname: item["hostname"],
    createdTimeUtc: !item["createdTimeUtc"]
      ? item["createdTimeUtc"]
      : new Date(item["createdTimeUtc"]),
    lastUpdatedOn: !item["lastUpdatedOn"] ? item["lastUpdatedOn"] : new Date(item["lastUpdatedOn"]),
    status: item["status"],
    userProvidedFunctionApps: !item["userProvidedFunctionApps"]
      ? item["userProvidedFunctionApps"]
      : staticSiteUserProvidedFunctionAppArrayDeserializer(item["userProvidedFunctionApps"]),
    linkedBackends: !item["linkedBackends"]
      ? item["linkedBackends"]
      : staticSiteLinkedBackendArrayDeserializer(item["linkedBackends"]),
    databaseConnections: !item["databaseConnections"]
      ? item["databaseConnections"]
      : databaseConnectionOverviewArrayDeserializer(item["databaseConnections"]),
  };
}

export function _databaseConnectionPatchRequestPropertiesSerializer(
  item: DatabaseConnectionPatchRequest,
): any {
  return {
    resourceId: item["resourceId"],
    connectionIdentity: item["connectionIdentity"],
    connectionString: item["connectionString"],
    region: item["region"],
  };
}

export function _staticSiteUserProvidedFunctionAppARMResourcePropertiesSerializer(
  item: StaticSiteUserProvidedFunctionAppARMResource,
): any {
  return {
    functionAppResourceId: item["functionAppResourceId"],
    functionAppRegion: item["functionAppRegion"],
  };
}

export function _staticSiteUserProvidedFunctionAppARMResourcePropertiesDeserializer(item: any) {
  return {
    functionAppResourceId: item["functionAppResourceId"],
    functionAppRegion: item["functionAppRegion"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
  };
}

export function _staticSiteBasicAuthPropertiesARMResourcePropertiesSerializer(
  item: StaticSiteBasicAuthPropertiesARMResource,
): any {
  return {
    password: item["password"],
    secretUrl: item["secretUrl"],
    applicableEnvironmentsMode: item["applicableEnvironmentsMode"],
    environments: !item["environments"]
      ? item["environments"]
      : item["environments"].map((p: any) => {
          return p;
        }),
  };
}

export function _staticSiteBasicAuthPropertiesARMResourcePropertiesDeserializer(item: any) {
  return {
    password: item["password"],
    secretUrl: item["secretUrl"],
    applicableEnvironmentsMode: item["applicableEnvironmentsMode"],
    environments: !item["environments"]
      ? item["environments"]
      : item["environments"].map((p: any) => {
          return p;
        }),
    secretState: item["secretState"],
  };
}

export function _staticSiteCustomDomainOverviewARMResourcePropertiesDeserializer(item: any) {
  return {
    domainName: item["domainName"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    status: item["status"],
    validationToken: item["validationToken"],
    errorMessage: item["errorMessage"],
  };
}

export function _staticSiteCustomDomainRequestPropertiesARMResourcePropertiesSerializer(
  item: StaticSiteCustomDomainRequestPropertiesARMResource,
): any {
  return { validationMethod: item["validationMethod"] };
}

export function _staticSiteLinkedBackendARMResourcePropertiesSerializer(
  item: StaticSiteLinkedBackendARMResource,
): any {
  return { backendResourceId: item["backendResourceId"], region: item["region"] };
}

export function _staticSiteLinkedBackendARMResourcePropertiesDeserializer(item: any) {
  return {
    backendResourceId: item["backendResourceId"],
    region: item["region"],
    createdOn: !item["createdOn"] ? item["createdOn"] : new Date(item["createdOn"]),
    provisioningState: item["provisioningState"],
  };
}

export function _staticSitesWorkflowPreviewRequestPropertiesSerializer(
  item: StaticSitesWorkflowPreviewRequest,
): any {
  return {
    repositoryUrl: item["repositoryUrl"],
    branch: item["branch"],
    buildProperties: !item["buildProperties"]
      ? item["buildProperties"]
      : staticSiteBuildPropertiesSerializer(item["buildProperties"]),
  };
}

export function _staticSitesWorkflowPreviewPropertiesDeserializer(item: any) {
  return {
    path: item["path"],
    contents: item["contents"],
  };
}

export function _sitePatchResourcePropertiesSerializer(item: SitePatchResource): any {
  return {
    enabled: item["enabled"],
    hostNameSslStates: !item["hostNameSslStates"]
      ? item["hostNameSslStates"]
      : hostNameSslStateArraySerializer(item["hostNameSslStates"]),
    serverFarmId: item["serverFarmId"],
    reserved: item["reserved"],
    isXenon: item["isXenon"],
    hyperV: item["hyperV"],
    dnsConfiguration: !item["dnsConfiguration"]
      ? item["dnsConfiguration"]
      : siteDnsConfigSerializer(item["dnsConfiguration"]),
    siteConfig: !item["siteConfig"] ? item["siteConfig"] : siteConfigSerializer(item["siteConfig"]),
    scmSiteAlsoStopped: item["scmSiteAlsoStopped"],
    hostingEnvironmentProfile: !item["hostingEnvironmentProfile"]
      ? item["hostingEnvironmentProfile"]
      : hostingEnvironmentProfileSerializer(item["hostingEnvironmentProfile"]),
    clientAffinityEnabled: item["clientAffinityEnabled"],
    clientAffinityProxyEnabled: item["clientAffinityProxyEnabled"],
    clientCertEnabled: item["clientCertEnabled"],
    clientCertMode: item["clientCertMode"],
    clientCertExclusionPaths: item["clientCertExclusionPaths"],
    hostNamesDisabled: item["hostNamesDisabled"],
    customDomainVerificationId: item["customDomainVerificationId"],
    containerSize: item["containerSize"],
    dailyMemoryTimeQuota: item["dailyMemoryTimeQuota"],
    cloningInfo: !item["cloningInfo"]
      ? item["cloningInfo"]
      : cloningInfoSerializer(item["cloningInfo"]),
    httpsOnly: item["httpsOnly"],
    redundancyMode: item["redundancyMode"],
    publicNetworkAccess: item["publicNetworkAccess"],
    storageAccountRequired: item["storageAccountRequired"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
    virtualNetworkSubnetId: item["virtualNetworkSubnetId"],
  };
}

export function _customHostnameAnalysisResultPropertiesDeserializer(item: any) {
  return {
    isHostnameAlreadyVerified: item["isHostnameAlreadyVerified"],
    customDomainVerificationTest: item["customDomainVerificationTest"],
    customDomainVerificationFailureInfo: !item["customDomainVerificationFailureInfo"]
      ? item["customDomainVerificationFailureInfo"]
      : errorEntityDeserializer(item["customDomainVerificationFailureInfo"]),
    hasConflictOnScaleUnit: item["hasConflictOnScaleUnit"],
    hasConflictAcrossSubscription: item["hasConflictAcrossSubscription"],
    conflictingAppResourceId: item["conflictingAppResourceId"],
    cNameRecords: !item["cNameRecords"]
      ? item["cNameRecords"]
      : item["cNameRecords"].map((p: any) => {
          return p;
        }),
    txtRecords: !item["txtRecords"]
      ? item["txtRecords"]
      : item["txtRecords"].map((p: any) => {
          return p;
        }),
    aRecords: !item["aRecords"]
      ? item["aRecords"]
      : item["aRecords"].map((p: any) => {
          return p;
        }),
    alternateCNameRecords: !item["alternateCNameRecords"]
      ? item["alternateCNameRecords"]
      : item["alternateCNameRecords"].map((p: any) => {
          return p;
        }),
    alternateTxtRecords: !item["alternateTxtRecords"]
      ? item["alternateTxtRecords"]
      : item["alternateTxtRecords"].map((p: any) => {
          return p;
        }),
  };
}

export function _backupRequestPropertiesSerializer(item: BackupRequest): any {
  return {
    backupName: item["backupName"],
    enabled: item["enabled"],
    storageAccountUrl: item["storageAccountUrl"],
    backupSchedule: !item["backupSchedule"]
      ? item["backupSchedule"]
      : backupScheduleSerializer(item["backupSchedule"]),
    databases: !item["databases"]
      ? item["databases"]
      : databaseBackupSettingArraySerializer(item["databases"]),
  };
}

export function _backupRequestPropertiesDeserializer(item: any) {
  return {
    backupName: item["backupName"],
    enabled: item["enabled"],
    storageAccountUrl: item["storageAccountUrl"],
    backupSchedule: !item["backupSchedule"]
      ? item["backupSchedule"]
      : backupScheduleDeserializer(item["backupSchedule"]),
    databases: !item["databases"]
      ? item["databases"]
      : databaseBackupSettingArrayDeserializer(item["databases"]),
  };
}

export function _backupItemPropertiesDeserializer(item: any) {
  return {
    backupId: item["id"],
    storageAccountUrl: item["storageAccountUrl"],
    blobName: item["blobName"],
    namePropertiesName: item["name"],
    status: item["status"],
    sizeInBytes: item["sizeInBytes"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    log: item["log"],
    databases: !item["databases"]
      ? item["databases"]
      : databaseBackupSettingArrayDeserializer(item["databases"]),
    scheduled: item["scheduled"],
    lastRestoreTimeStamp: !item["lastRestoreTimeStamp"]
      ? item["lastRestoreTimeStamp"]
      : new Date(item["lastRestoreTimeStamp"]),
    finishedTimeStamp: !item["finishedTimeStamp"]
      ? item["finishedTimeStamp"]
      : new Date(item["finishedTimeStamp"]),
    correlationId: item["correlationId"],
    websiteSizeInBytes: item["websiteSizeInBytes"],
  };
}

export function _siteAuthSettingsPropertiesSerializer(item: SiteAuthSettings): any {
  return {
    enabled: item["enabled"],
    runtimeVersion: item["runtimeVersion"],
    unauthenticatedClientAction: item["unauthenticatedClientAction"],
    tokenStoreEnabled: item["tokenStoreEnabled"],
    allowedExternalRedirectUrls: !item["allowedExternalRedirectUrls"]
      ? item["allowedExternalRedirectUrls"]
      : item["allowedExternalRedirectUrls"].map((p: any) => {
          return p;
        }),
    defaultProvider: item["defaultProvider"],
    tokenRefreshExtensionHours: item["tokenRefreshExtensionHours"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    clientSecretSettingName: item["clientSecretSettingName"],
    clientSecretCertificateThumbprint: item["clientSecretCertificateThumbprint"],
    issuer: item["issuer"],
    validateIssuer: item["validateIssuer"],
    allowedAudiences: !item["allowedAudiences"]
      ? item["allowedAudiences"]
      : item["allowedAudiences"].map((p: any) => {
          return p;
        }),
    additionalLoginParams: !item["additionalLoginParams"]
      ? item["additionalLoginParams"]
      : item["additionalLoginParams"].map((p: any) => {
          return p;
        }),
    aadClaimsAuthorization: item["aadClaimsAuthorization"],
    googleClientId: item["googleClientId"],
    googleClientSecret: item["googleClientSecret"],
    googleClientSecretSettingName: item["googleClientSecretSettingName"],
    googleOAuthScopes: !item["googleOAuthScopes"]
      ? item["googleOAuthScopes"]
      : item["googleOAuthScopes"].map((p: any) => {
          return p;
        }),
    facebookAppId: item["facebookAppId"],
    facebookAppSecret: item["facebookAppSecret"],
    facebookAppSecretSettingName: item["facebookAppSecretSettingName"],
    facebookOAuthScopes: !item["facebookOAuthScopes"]
      ? item["facebookOAuthScopes"]
      : item["facebookOAuthScopes"].map((p: any) => {
          return p;
        }),
    gitHubClientId: item["gitHubClientId"],
    gitHubClientSecret: item["gitHubClientSecret"],
    gitHubClientSecretSettingName: item["gitHubClientSecretSettingName"],
    gitHubOAuthScopes: !item["gitHubOAuthScopes"]
      ? item["gitHubOAuthScopes"]
      : item["gitHubOAuthScopes"].map((p: any) => {
          return p;
        }),
    twitterConsumerKey: item["twitterConsumerKey"],
    twitterConsumerSecret: item["twitterConsumerSecret"],
    twitterConsumerSecretSettingName: item["twitterConsumerSecretSettingName"],
    microsoftAccountClientId: item["microsoftAccountClientId"],
    microsoftAccountClientSecret: item["microsoftAccountClientSecret"],
    microsoftAccountClientSecretSettingName: item["microsoftAccountClientSecretSettingName"],
    microsoftAccountOAuthScopes: !item["microsoftAccountOAuthScopes"]
      ? item["microsoftAccountOAuthScopes"]
      : item["microsoftAccountOAuthScopes"].map((p: any) => {
          return p;
        }),
    isAuthFromFile: item["isAuthFromFile"],
    authFilePath: item["authFilePath"],
    configVersion: item["configVersion"],
  };
}

export function _siteAuthSettingsPropertiesDeserializer(item: any) {
  return {
    enabled: item["enabled"],
    runtimeVersion: item["runtimeVersion"],
    unauthenticatedClientAction: item["unauthenticatedClientAction"],
    tokenStoreEnabled: item["tokenStoreEnabled"],
    allowedExternalRedirectUrls: !item["allowedExternalRedirectUrls"]
      ? item["allowedExternalRedirectUrls"]
      : item["allowedExternalRedirectUrls"].map((p: any) => {
          return p;
        }),
    defaultProvider: item["defaultProvider"],
    tokenRefreshExtensionHours: item["tokenRefreshExtensionHours"],
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    clientSecretSettingName: item["clientSecretSettingName"],
    clientSecretCertificateThumbprint: item["clientSecretCertificateThumbprint"],
    issuer: item["issuer"],
    validateIssuer: item["validateIssuer"],
    allowedAudiences: !item["allowedAudiences"]
      ? item["allowedAudiences"]
      : item["allowedAudiences"].map((p: any) => {
          return p;
        }),
    additionalLoginParams: !item["additionalLoginParams"]
      ? item["additionalLoginParams"]
      : item["additionalLoginParams"].map((p: any) => {
          return p;
        }),
    aadClaimsAuthorization: item["aadClaimsAuthorization"],
    googleClientId: item["googleClientId"],
    googleClientSecret: item["googleClientSecret"],
    googleClientSecretSettingName: item["googleClientSecretSettingName"],
    googleOAuthScopes: !item["googleOAuthScopes"]
      ? item["googleOAuthScopes"]
      : item["googleOAuthScopes"].map((p: any) => {
          return p;
        }),
    facebookAppId: item["facebookAppId"],
    facebookAppSecret: item["facebookAppSecret"],
    facebookAppSecretSettingName: item["facebookAppSecretSettingName"],
    facebookOAuthScopes: !item["facebookOAuthScopes"]
      ? item["facebookOAuthScopes"]
      : item["facebookOAuthScopes"].map((p: any) => {
          return p;
        }),
    gitHubClientId: item["gitHubClientId"],
    gitHubClientSecret: item["gitHubClientSecret"],
    gitHubClientSecretSettingName: item["gitHubClientSecretSettingName"],
    gitHubOAuthScopes: !item["gitHubOAuthScopes"]
      ? item["gitHubOAuthScopes"]
      : item["gitHubOAuthScopes"].map((p: any) => {
          return p;
        }),
    twitterConsumerKey: item["twitterConsumerKey"],
    twitterConsumerSecret: item["twitterConsumerSecret"],
    twitterConsumerSecretSettingName: item["twitterConsumerSecretSettingName"],
    microsoftAccountClientId: item["microsoftAccountClientId"],
    microsoftAccountClientSecret: item["microsoftAccountClientSecret"],
    microsoftAccountClientSecretSettingName: item["microsoftAccountClientSecretSettingName"],
    microsoftAccountOAuthScopes: !item["microsoftAccountOAuthScopes"]
      ? item["microsoftAccountOAuthScopes"]
      : item["microsoftAccountOAuthScopes"].map((p: any) => {
          return p;
        }),
    isAuthFromFile: item["isAuthFromFile"],
    authFilePath: item["authFilePath"],
    configVersion: item["configVersion"],
  };
}

export function _restoreRequestPropertiesSerializer(item: RestoreRequest): any {
  return {
    storageAccountUrl: item["storageAccountUrl"],
    blobName: item["blobName"],
    overwrite: item["overwrite"],
    siteName: item["siteName"],
    databases: !item["databases"]
      ? item["databases"]
      : databaseBackupSettingArraySerializer(item["databases"]),
    ignoreConflictingHostNames: item["ignoreConflictingHostNames"],
    ignoreDatabases: item["ignoreDatabases"],
    appServicePlan: item["appServicePlan"],
    operationType: item["operationType"],
    adjustConnectionStrings: item["adjustConnectionStrings"],
    hostingEnvironment: item["hostingEnvironment"],
  };
}

export function _restoreRequestPropertiesDeserializer(item: any) {
  return {
    storageAccountUrl: item["storageAccountUrl"],
    blobName: item["blobName"],
    overwrite: item["overwrite"],
    siteName: item["siteName"],
    databases: !item["databases"]
      ? item["databases"]
      : databaseBackupSettingArrayDeserializer(item["databases"]),
    ignoreConflictingHostNames: item["ignoreConflictingHostNames"],
    ignoreDatabases: item["ignoreDatabases"],
    appServicePlan: item["appServicePlan"],
    operationType: item["operationType"],
    adjustConnectionStrings: item["adjustConnectionStrings"],
    hostingEnvironment: item["hostingEnvironment"],
  };
}

export function _hybridConnectionPropertiesSerializer(item: HybridConnection): any {
  return {
    serviceBusNamespace: item["serviceBusNamespace"],
    relayName: item["relayName"],
    relayArmUri: item["relayArmUri"],
    hostname: item["hostname"],
    port: item["port"],
    sendKeyName: item["sendKeyName"],
    sendKeyValue: item["sendKeyValue"],
    serviceBusSuffix: item["serviceBusSuffix"],
  };
}

export function _hybridConnectionPropertiesDeserializer(item: any) {
  return {
    serviceBusNamespace: item["serviceBusNamespace"],
    relayName: item["relayName"],
    relayArmUri: item["relayArmUri"],
    hostname: item["hostname"],
    port: item["port"],
    sendKeyName: item["sendKeyName"],
    sendKeyValue: item["sendKeyValue"],
    serviceBusSuffix: item["serviceBusSuffix"],
  };
}

export function _relayServiceConnectionEntityPropertiesSerializer(
  item: RelayServiceConnectionEntity,
): any {
  return {
    entityName: item["entityName"],
    entityConnectionString: item["entityConnectionString"],
    resourceType: item["resourceType"],
    resourceConnectionString: item["resourceConnectionString"],
    hostname: item["hostname"],
    port: item["port"],
    biztalkUri: item["biztalkUri"],
  };
}

export function _relayServiceConnectionEntityPropertiesDeserializer(item: any) {
  return {
    entityName: item["entityName"],
    entityConnectionString: item["entityConnectionString"],
    resourceType: item["resourceType"],
    resourceConnectionString: item["resourceConnectionString"],
    hostname: item["hostname"],
    port: item["port"],
    biztalkUri: item["biztalkUri"],
  };
}

export function _sitePhpErrorLogFlagPropertiesDeserializer(item: any) {
  return {
    localLogErrors: item["localLogErrors"],
    masterLogErrors: item["masterLogErrors"],
    localLogErrorsMaxLength: item["localLogErrorsMaxLength"],
    masterLogErrorsMaxLength: item["masterLogErrorsMaxLength"],
  };
}

export function _premierAddOnPropertiesSerializer(item: PremierAddOn): any {
  return {
    sku: item["sku"],
    product: item["product"],
    vendor: item["vendor"],
    marketplacePublisher: item["marketplacePublisher"],
    marketplaceOffer: item["marketplaceOffer"],
  };
}

export function _premierAddOnPropertiesDeserializer(item: any) {
  return {
    sku: item["sku"],
    product: item["product"],
    vendor: item["vendor"],
    marketplacePublisher: item["marketplacePublisher"],
    marketplaceOffer: item["marketplaceOffer"],
  };
}

export function _deletedAppRestoreRequestPropertiesSerializer(item: DeletedAppRestoreRequest): any {
  return {
    deletedSiteId: item["deletedSiteId"],
    recoverConfiguration: item["recoverConfiguration"],
    snapshotTime: item["snapshotTime"],
    useDRSecondary: item["useDRSecondary"],
  };
}

export function _snapshotRestoreRequestPropertiesSerializer(item: SnapshotRestoreRequest): any {
  return {
    snapshotTime: item["snapshotTime"],
    recoverySource: !item["recoverySource"]
      ? item["recoverySource"]
      : snapshotRecoverySourceSerializer(item["recoverySource"]),
    overwrite: item["overwrite"],
    recoverConfiguration: item["recoverConfiguration"],
    ignoreConflictingHostNames: item["ignoreConflictingHostNames"],
    useDRSecondary: item["useDRSecondary"],
  };
}

export function _slotDifferencePropertiesDeserializer(item: any) {
  return {
    level: item["level"],
    settingType: item["settingType"],
    diffRule: item["diffRule"],
    settingName: item["settingName"],
    valueInCurrentSlot: item["valueInCurrentSlot"],
    valueInTargetSlot: item["valueInTargetSlot"],
    description: item["description"],
  };
}

export function _snapshotPropertiesDeserializer(item: any) {
  return {
    time: item["time"],
  };
}

export function _vnetRoutePropertiesSerializer(item: VnetRoute): any {
  return {
    startAddress: item["startAddress"],
    endAddress: item["endAddress"],
    routeType: item["routeType"],
  };
}

export function _vnetRoutePropertiesDeserializer(item: any) {
  return {
    startAddress: item["startAddress"],
    endAddress: item["endAddress"],
    routeType: item["routeType"],
  };
}

export function _vnetInfoResourcePropertiesSerializer(item: VnetInfoResource): any {
  return {
    vnetResourceId: item["vnetResourceId"],
    certBlob: item["certBlob"],
    dnsServers: item["dnsServers"],
    isSwift: item["isSwift"],
  };
}

export function _vnetInfoResourcePropertiesDeserializer(item: any) {
  return {
    vnetResourceId: item["vnetResourceId"],
    certThumbprint: item["certThumbprint"],
    certBlob: item["certBlob"],
    routes: !item["routes"] ? item["routes"] : vnetRouteArrayDeserializer(item["routes"]),
    resyncRequired: item["resyncRequired"],
    dnsServers: item["dnsServers"],
    isSwift: item["isSwift"],
  };
}

export function _vnetGatewayPropertiesSerializer(item: VnetGateway): any {
  return { vnetName: item["vnetName"], vpnPackageUri: item["vpnPackageUri"] };
}

export function _vnetGatewayPropertiesDeserializer(item: any) {
  return {
    vnetName: item["vnetName"],
    vpnPackageUri: item["vpnPackageUri"],
  };
}

export function _storageMigrationOptionsPropertiesSerializer(item: StorageMigrationOptions): any {
  return {
    azurefilesConnectionString: item["azurefilesConnectionString"],
    azurefilesShare: item["azurefilesShare"],
    switchSiteAfterMigration: item["switchSiteAfterMigration"],
    blockWriteAccessToSite: item["blockWriteAccessToSite"],
  };
}

export function _storageMigrationResponsePropertiesDeserializer(item: any) {
  return {
    operationId: item["operationId"],
  };
}

export function _migrateMySqlRequestPropertiesSerializer(item: MigrateMySqlRequest): any {
  return { connectionString: item["connectionString"], migrationType: item["migrationType"] };
}

export function _csmPublishingCredentialsPoliciesEntityPropertiesSerializer(
  item: CsmPublishingCredentialsPoliciesEntity,
): any {
  return { allow: item["allow"] };
}

export function _csmPublishingCredentialsPoliciesEntityPropertiesDeserializer(item: any) {
  return {
    allow: item["allow"],
  };
}

export function _siteAuthSettingsV2PropertiesSerializer(item: SiteAuthSettingsV2): any {
  return {
    platform: !item["platform"] ? item["platform"] : authPlatformSerializer(item["platform"]),
    globalValidation: !item["globalValidation"]
      ? item["globalValidation"]
      : globalValidationSerializer(item["globalValidation"]),
    identityProviders: !item["identityProviders"]
      ? item["identityProviders"]
      : identityProvidersSerializer(item["identityProviders"]),
    login: !item["login"] ? item["login"] : loginSerializer(item["login"]),
    httpSettings: !item["httpSettings"]
      ? item["httpSettings"]
      : httpSettingsSerializer(item["httpSettings"]),
  };
}

export function _siteAuthSettingsV2PropertiesDeserializer(item: any) {
  return {
    platform: !item["platform"] ? item["platform"] : authPlatformDeserializer(item["platform"]),
    globalValidation: !item["globalValidation"]
      ? item["globalValidation"]
      : globalValidationDeserializer(item["globalValidation"]),
    identityProviders: !item["identityProviders"]
      ? item["identityProviders"]
      : identityProvidersDeserializer(item["identityProviders"]),
    login: !item["login"] ? item["login"] : loginDeserializer(item["login"]),
    httpSettings: !item["httpSettings"]
      ? item["httpSettings"]
      : httpSettingsDeserializer(item["httpSettings"]),
  };
}

export function _apiKVReferencePropertiesDeserializer(item: any) {
  return {
    reference: item["reference"],
    status: item["status"],
    vaultName: item["vaultName"],
    secretName: item["secretName"],
    secretVersion: item["secretVersion"],
    identityType: !item["identityType"]
      ? item["identityType"]
      : managedServiceIdentityDeserializer(item["identityType"]),
    details: item["details"],
    source: item["source"],
    activeVersion: item["activeVersion"],
  };
}

export function _siteLogsConfigPropertiesSerializer(item: SiteLogsConfig): any {
  return {
    applicationLogs: !item["applicationLogs"]
      ? item["applicationLogs"]
      : applicationLogsConfigSerializer(item["applicationLogs"]),
    httpLogs: !item["httpLogs"] ? item["httpLogs"] : httpLogsConfigSerializer(item["httpLogs"]),
    failedRequestsTracing: !item["failedRequestsTracing"]
      ? item["failedRequestsTracing"]
      : enabledConfigSerializer(item["failedRequestsTracing"]),
    detailedErrorMessages: !item["detailedErrorMessages"]
      ? item["detailedErrorMessages"]
      : enabledConfigSerializer(item["detailedErrorMessages"]),
  };
}

export function _siteLogsConfigPropertiesDeserializer(item: any) {
  return {
    applicationLogs: !item["applicationLogs"]
      ? item["applicationLogs"]
      : applicationLogsConfigDeserializer(item["applicationLogs"]),
    httpLogs: !item["httpLogs"] ? item["httpLogs"] : httpLogsConfigDeserializer(item["httpLogs"]),
    failedRequestsTracing: !item["failedRequestsTracing"]
      ? item["failedRequestsTracing"]
      : enabledConfigDeserializer(item["failedRequestsTracing"]),
    detailedErrorMessages: !item["detailedErrorMessages"]
      ? item["detailedErrorMessages"]
      : enabledConfigDeserializer(item["detailedErrorMessages"]),
  };
}

export function _slotConfigNamesResourcePropertiesSerializer(item: SlotConfigNamesResource): any {
  return {
    connectionStringNames: !item["connectionStringNames"]
      ? item["connectionStringNames"]
      : item["connectionStringNames"].map((p: any) => {
          return p;
        }),
    appSettingNames: !item["appSettingNames"]
      ? item["appSettingNames"]
      : item["appSettingNames"].map((p: any) => {
          return p;
        }),
    azureStorageConfigNames: !item["azureStorageConfigNames"]
      ? item["azureStorageConfigNames"]
      : item["azureStorageConfigNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _slotConfigNamesResourcePropertiesDeserializer(item: any) {
  return {
    connectionStringNames: !item["connectionStringNames"]
      ? item["connectionStringNames"]
      : item["connectionStringNames"].map((p: any) => {
          return p;
        }),
    appSettingNames: !item["appSettingNames"]
      ? item["appSettingNames"]
      : item["appSettingNames"].map((p: any) => {
          return p;
        }),
    azureStorageConfigNames: !item["azureStorageConfigNames"]
      ? item["azureStorageConfigNames"]
      : item["azureStorageConfigNames"].map((p: any) => {
          return p;
        }),
  };
}

export function _siteConfigResourcePropertiesSerializer(item: SiteConfigResource): any {
  return {
    numberOfWorkers: item["numberOfWorkers"],
    defaultDocuments: !item["defaultDocuments"]
      ? item["defaultDocuments"]
      : item["defaultDocuments"].map((p: any) => {
          return p;
        }),
    netFrameworkVersion: item["netFrameworkVersion"],
    phpVersion: item["phpVersion"],
    pythonVersion: item["pythonVersion"],
    nodeVersion: item["nodeVersion"],
    powerShellVersion: item["powerShellVersion"],
    linuxFxVersion: item["linuxFxVersion"],
    windowsFxVersion: item["windowsFxVersion"],
    requestTracingEnabled: item["requestTracingEnabled"],
    requestTracingExpirationTime: !item["requestTracingExpirationTime"]
      ? item["requestTracingExpirationTime"]
      : item["requestTracingExpirationTime"].toISOString(),
    remoteDebuggingEnabled: item["remoteDebuggingEnabled"],
    remoteDebuggingVersion: item["remoteDebuggingVersion"],
    httpLoggingEnabled: item["httpLoggingEnabled"],
    acrUseManagedIdentityCreds: item["acrUseManagedIdentityCreds"],
    acrUserManagedIdentityID: item["acrUserManagedIdentityID"],
    logsDirectorySizeLimit: item["logsDirectorySizeLimit"],
    detailedErrorLoggingEnabled: item["detailedErrorLoggingEnabled"],
    publishingUsername: item["publishingUsername"],
    appSettings: !item["appSettings"]
      ? item["appSettings"]
      : nameValuePairArraySerializer(item["appSettings"]),
    metadata: !item["metadata"] ? item["metadata"] : nameValuePairArraySerializer(item["metadata"]),
    connectionStrings: !item["connectionStrings"]
      ? item["connectionStrings"]
      : connStringInfoArraySerializer(item["connectionStrings"]),
    handlerMappings: !item["handlerMappings"]
      ? item["handlerMappings"]
      : handlerMappingArraySerializer(item["handlerMappings"]),
    documentRoot: item["documentRoot"],
    scmType: item["scmType"],
    use32BitWorkerProcess: item["use32BitWorkerProcess"],
    webSocketsEnabled: item["webSocketsEnabled"],
    alwaysOn: item["alwaysOn"],
    javaVersion: item["javaVersion"],
    javaContainer: item["javaContainer"],
    javaContainerVersion: item["javaContainerVersion"],
    appCommandLine: item["appCommandLine"],
    managedPipelineMode: item["managedPipelineMode"],
    virtualApplications: !item["virtualApplications"]
      ? item["virtualApplications"]
      : virtualApplicationArraySerializer(item["virtualApplications"]),
    loadBalancing: item["loadBalancing"],
    experiments: !item["experiments"]
      ? item["experiments"]
      : experimentsSerializer(item["experiments"]),
    limits: !item["limits"] ? item["limits"] : siteLimitsSerializer(item["limits"]),
    autoHealEnabled: item["autoHealEnabled"],
    autoHealRules: !item["autoHealRules"]
      ? item["autoHealRules"]
      : autoHealRulesSerializer(item["autoHealRules"]),
    tracingOptions: item["tracingOptions"],
    vnetName: item["vnetName"],
    vnetRouteAllEnabled: item["vnetRouteAllEnabled"],
    vnetPrivatePortsCount: item["vnetPrivatePortsCount"],
    cors: !item["cors"] ? item["cors"] : corsSettingsSerializer(item["cors"]),
    push: !item["push"] ? item["push"] : pushSettingsSerializer(item["push"]),
    apiDefinition: !item["apiDefinition"]
      ? item["apiDefinition"]
      : apiDefinitionInfoSerializer(item["apiDefinition"]),
    apiManagementConfig: !item["apiManagementConfig"]
      ? item["apiManagementConfig"]
      : apiManagementConfigSerializer(item["apiManagementConfig"]),
    autoSwapSlotName: item["autoSwapSlotName"],
    localMySqlEnabled: item["localMySqlEnabled"],
    managedServiceIdentityId: item["managedServiceIdentityId"],
    xManagedServiceIdentityId: item["xManagedServiceIdentityId"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
    ipSecurityRestrictions: !item["ipSecurityRestrictions"]
      ? item["ipSecurityRestrictions"]
      : ipSecurityRestrictionArraySerializer(item["ipSecurityRestrictions"]),
    ipSecurityRestrictionsDefaultAction: item["ipSecurityRestrictionsDefaultAction"],
    scmIpSecurityRestrictions: !item["scmIpSecurityRestrictions"]
      ? item["scmIpSecurityRestrictions"]
      : ipSecurityRestrictionArraySerializer(item["scmIpSecurityRestrictions"]),
    scmIpSecurityRestrictionsDefaultAction: item["scmIpSecurityRestrictionsDefaultAction"],
    scmIpSecurityRestrictionsUseMain: item["scmIpSecurityRestrictionsUseMain"],
    http20Enabled: item["http20Enabled"],
    http20ProxyFlag: item["http20ProxyFlag"],
    minTlsVersion: item["minTlsVersion"],
    minTlsCipherSuite: item["minTlsCipherSuite"],
    scmMinTlsVersion: item["scmMinTlsVersion"],
    ftpsState: item["ftpsState"],
    preWarmedInstanceCount: item["preWarmedInstanceCount"],
    functionAppScaleLimit: item["functionAppScaleLimit"],
    elasticWebAppScaleLimit: item["elasticWebAppScaleLimit"],
    healthCheckPath: item["healthCheckPath"],
    functionsRuntimeScaleMonitoringEnabled: item["functionsRuntimeScaleMonitoringEnabled"],
    websiteTimeZone: item["websiteTimeZone"],
    minimumElasticInstanceCount: item["minimumElasticInstanceCount"],
    azureStorageAccounts: !item["azureStorageAccounts"]
      ? item["azureStorageAccounts"]
      : azureStorageInfoValueRecordSerializer(item["azureStorageAccounts"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function _siteConfigResourcePropertiesDeserializer(item: any) {
  return {
    numberOfWorkers: item["numberOfWorkers"],
    defaultDocuments: !item["defaultDocuments"]
      ? item["defaultDocuments"]
      : item["defaultDocuments"].map((p: any) => {
          return p;
        }),
    netFrameworkVersion: item["netFrameworkVersion"],
    phpVersion: item["phpVersion"],
    pythonVersion: item["pythonVersion"],
    nodeVersion: item["nodeVersion"],
    powerShellVersion: item["powerShellVersion"],
    linuxFxVersion: item["linuxFxVersion"],
    windowsFxVersion: item["windowsFxVersion"],
    requestTracingEnabled: item["requestTracingEnabled"],
    requestTracingExpirationTime: !item["requestTracingExpirationTime"]
      ? item["requestTracingExpirationTime"]
      : new Date(item["requestTracingExpirationTime"]),
    remoteDebuggingEnabled: item["remoteDebuggingEnabled"],
    remoteDebuggingVersion: item["remoteDebuggingVersion"],
    httpLoggingEnabled: item["httpLoggingEnabled"],
    acrUseManagedIdentityCreds: item["acrUseManagedIdentityCreds"],
    acrUserManagedIdentityID: item["acrUserManagedIdentityID"],
    logsDirectorySizeLimit: item["logsDirectorySizeLimit"],
    detailedErrorLoggingEnabled: item["detailedErrorLoggingEnabled"],
    publishingUsername: item["publishingUsername"],
    appSettings: !item["appSettings"]
      ? item["appSettings"]
      : nameValuePairArrayDeserializer(item["appSettings"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : nameValuePairArrayDeserializer(item["metadata"]),
    connectionStrings: !item["connectionStrings"]
      ? item["connectionStrings"]
      : connStringInfoArrayDeserializer(item["connectionStrings"]),
    machineKey: !item["machineKey"]
      ? item["machineKey"]
      : siteMachineKeyDeserializer(item["machineKey"]),
    handlerMappings: !item["handlerMappings"]
      ? item["handlerMappings"]
      : handlerMappingArrayDeserializer(item["handlerMappings"]),
    documentRoot: item["documentRoot"],
    scmType: item["scmType"],
    use32BitWorkerProcess: item["use32BitWorkerProcess"],
    webSocketsEnabled: item["webSocketsEnabled"],
    alwaysOn: item["alwaysOn"],
    javaVersion: item["javaVersion"],
    javaContainer: item["javaContainer"],
    javaContainerVersion: item["javaContainerVersion"],
    appCommandLine: item["appCommandLine"],
    managedPipelineMode: item["managedPipelineMode"],
    virtualApplications: !item["virtualApplications"]
      ? item["virtualApplications"]
      : virtualApplicationArrayDeserializer(item["virtualApplications"]),
    loadBalancing: item["loadBalancing"],
    experiments: !item["experiments"]
      ? item["experiments"]
      : experimentsDeserializer(item["experiments"]),
    limits: !item["limits"] ? item["limits"] : siteLimitsDeserializer(item["limits"]),
    autoHealEnabled: item["autoHealEnabled"],
    autoHealRules: !item["autoHealRules"]
      ? item["autoHealRules"]
      : autoHealRulesDeserializer(item["autoHealRules"]),
    tracingOptions: item["tracingOptions"],
    vnetName: item["vnetName"],
    vnetRouteAllEnabled: item["vnetRouteAllEnabled"],
    vnetPrivatePortsCount: item["vnetPrivatePortsCount"],
    cors: !item["cors"] ? item["cors"] : corsSettingsDeserializer(item["cors"]),
    push: !item["push"] ? item["push"] : pushSettingsDeserializer(item["push"]),
    apiDefinition: !item["apiDefinition"]
      ? item["apiDefinition"]
      : apiDefinitionInfoDeserializer(item["apiDefinition"]),
    apiManagementConfig: !item["apiManagementConfig"]
      ? item["apiManagementConfig"]
      : apiManagementConfigDeserializer(item["apiManagementConfig"]),
    autoSwapSlotName: item["autoSwapSlotName"],
    localMySqlEnabled: item["localMySqlEnabled"],
    managedServiceIdentityId: item["managedServiceIdentityId"],
    xManagedServiceIdentityId: item["xManagedServiceIdentityId"],
    keyVaultReferenceIdentity: item["keyVaultReferenceIdentity"],
    ipSecurityRestrictions: !item["ipSecurityRestrictions"]
      ? item["ipSecurityRestrictions"]
      : ipSecurityRestrictionArrayDeserializer(item["ipSecurityRestrictions"]),
    ipSecurityRestrictionsDefaultAction: item["ipSecurityRestrictionsDefaultAction"],
    scmIpSecurityRestrictions: !item["scmIpSecurityRestrictions"]
      ? item["scmIpSecurityRestrictions"]
      : ipSecurityRestrictionArrayDeserializer(item["scmIpSecurityRestrictions"]),
    scmIpSecurityRestrictionsDefaultAction: item["scmIpSecurityRestrictionsDefaultAction"],
    scmIpSecurityRestrictionsUseMain: item["scmIpSecurityRestrictionsUseMain"],
    http20Enabled: item["http20Enabled"],
    http20ProxyFlag: item["http20ProxyFlag"],
    minTlsVersion: item["minTlsVersion"],
    minTlsCipherSuite: item["minTlsCipherSuite"],
    scmMinTlsVersion: item["scmMinTlsVersion"],
    ftpsState: item["ftpsState"],
    preWarmedInstanceCount: item["preWarmedInstanceCount"],
    functionAppScaleLimit: item["functionAppScaleLimit"],
    elasticWebAppScaleLimit: item["elasticWebAppScaleLimit"],
    healthCheckPath: item["healthCheckPath"],
    functionsRuntimeScaleMonitoringEnabled: item["functionsRuntimeScaleMonitoringEnabled"],
    websiteTimeZone: item["websiteTimeZone"],
    minimumElasticInstanceCount: item["minimumElasticInstanceCount"],
    azureStorageAccounts: !item["azureStorageAccounts"]
      ? item["azureStorageAccounts"]
      : azureStorageInfoValueRecordDeserializer(item["azureStorageAccounts"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function _siteConfigurationSnapshotInfoPropertiesDeserializer(item: any) {
  return {
    time: !item["time"] ? item["time"] : new Date(item["time"]),
    snapshotId: item["snapshotId"],
  };
}

export function _continuousWebJobPropertiesDeserializer(item: any) {
  return {
    status: item["status"],
    detailedStatus: item["detailed_status"],
    logUrl: item["log_url"],
    runCommand: item["run_command"],
    url: item["url"],
    extraInfoUrl: item["extra_info_url"],
    webJobType: item["web_job_type"],
    error: item["error"],
    usingSdk: item["using_sdk"],
    settings: !item["settings"]
      ? item["settings"]
      : Object.fromEntries(Object.entries(item["settings"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function _csmDeploymentStatusPropertiesDeserializer(item: any) {
  return {
    deploymentId: item["deploymentId"],
    status: item["status"],
    numberOfInstancesInProgress: item["numberOfInstancesInProgress"],
    numberOfInstancesSuccessful: item["numberOfInstancesSuccessful"],
    numberOfInstancesFailed: item["numberOfInstancesFailed"],
    failedInstancesLogs: !item["failedInstancesLogs"]
      ? item["failedInstancesLogs"]
      : item["failedInstancesLogs"].map((p: any) => {
          return p;
        }),
    errors: !item["errors"] ? item["errors"] : errorEntityArrayDeserializer(item["errors"]),
  };
}

export function _deploymentPropertiesSerializer(item: Deployment): any {
  return {
    status: item["status"],
    message: item["message"],
    author: item["author"],
    deployer: item["deployer"],
    author_email: item["authorEmail"],
    start_time: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
    end_time: !item["endTime"] ? item["endTime"] : item["endTime"].toISOString(),
    active: item["active"],
    details: item["details"],
  };
}

export function _deploymentPropertiesDeserializer(item: any) {
  return {
    status: item["status"],
    message: item["message"],
    author: item["author"],
    deployer: item["deployer"],
    authorEmail: item["author_email"],
    startTime: !item["start_time"] ? item["start_time"] : new Date(item["start_time"]),
    endTime: !item["end_time"] ? item["end_time"] : new Date(item["end_time"]),
    active: item["active"],
    details: item["details"],
  };
}

export function _msDeployStatusPropertiesDeserializer(item: any) {
  return {
    deployer: item["deployer"],
    provisioningState: item["provisioningState"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    complete: item["complete"],
  };
}

export function _msDeployPropertiesSerializer(item: MSDeploy): any {
  return {
    packageUri: item["packageUri"],
    connectionString: item["connectionString"],
    dbType: item["dbType"],
    setParametersXmlFileUri: item["setParametersXmlFileUri"],
    setParameters: item["setParameters"],
    skipAppData: item["skipAppData"],
    appOffline: item["appOffline"],
    addOnPackages: !item["addOnPackages"]
      ? item["addOnPackages"]
      : msDeployCoreArraySerializer(item["addOnPackages"]),
  };
}

export function _msDeployLogPropertiesDeserializer(item: any) {
  return {
    entries: !item["entries"]
      ? item["entries"]
      : msDeployLogEntryArrayDeserializer(item["entries"]),
  };
}

export function _functionEnvelopePropertiesSerializer(item: FunctionEnvelope): any {
  return {
    function_app_id: item["functionAppId"],
    script_root_path_href: item["scriptRootPathHref"],
    script_href: item["scriptHref"],
    config_href: item["configHref"],
    test_data_href: item["testDataHref"],
    secrets_file_href: item["secretsFileHref"],
    href: item["href"],
    config: item["config"],
    files: item["files"],
    test_data: item["testData"],
    invoke_url_template: item["invokeUrlTemplate"],
    language: item["language"],
    isDisabled: item["isDisabled"],
  };
}

export function _functionEnvelopePropertiesDeserializer(item: any) {
  return {
    functionAppId: item["function_app_id"],
    scriptRootPathHref: item["script_root_path_href"],
    scriptHref: item["script_href"],
    configHref: item["config_href"],
    testDataHref: item["test_data_href"],
    secretsFileHref: item["secrets_file_href"],
    href: item["href"],
    config: item["config"],
    files: !item["files"]
      ? item["files"]
      : Object.fromEntries(Object.entries(item["files"]).map(([k, p]: [string, any]) => [k, p])),
    testData: item["test_data"],
    invokeUrlTemplate: item["invoke_url_template"],
    language: item["language"],
    isDisabled: item["isDisabled"],
  };
}

export function _hostNameBindingPropertiesSerializer(item: HostNameBinding): any {
  return {
    siteName: item["siteName"],
    domainId: item["domainId"],
    azureResourceName: item["azureResourceName"],
    azureResourceType: item["azureResourceType"],
    customHostNameDnsRecordType: item["customHostNameDnsRecordType"],
    hostNameType: item["hostNameType"],
    sslState: item["sslState"],
    thumbprint: item["thumbprint"],
  };
}

export function _hostNameBindingPropertiesDeserializer(item: any) {
  return {
    siteName: item["siteName"],
    domainId: item["domainId"],
    azureResourceName: item["azureResourceName"],
    azureResourceType: item["azureResourceType"],
    customHostNameDnsRecordType: item["customHostNameDnsRecordType"],
    hostNameType: item["hostNameType"],
    sslState: item["sslState"],
    thumbprint: item["thumbprint"],
    virtualIP: item["virtualIP"],
  };
}

export function _webSiteInstanceStatusPropertiesDeserializer(item: any) {
  return {
    state: item["state"],
    statusUrl: item["statusUrl"],
    detectorUrl: item["detectorUrl"],
    consoleUrl: item["consoleUrl"],
    healthCheckUrl: item["healthCheckUrl"],
    containers: !item["containers"]
      ? item["containers"]
      : containerInfoRecordDeserializer(item["containers"]),
    physicalZone: item["physicalZone"],
  };
}

export function _processThreadInfoPropertiesDeserializer(item: any) {
  return {
    identifier: item["identifier"],
    href: item["href"],
    process: item["process"],
    startAddress: item["start_address"],
    currentPriority: item["current_priority"],
    priorityLevel: item["priority_level"],
    basePriority: item["base_priority"],
    startTime: !item["start_time"] ? item["start_time"] : new Date(item["start_time"]),
    totalProcessorTime: item["total_processor_time"],
    userProcessorTime: item["user_processor_time"],
    state: item["state"],
    waitReason: item["wait_reason"],
  };
}

export function _processModuleInfoPropertiesDeserializer(item: any) {
  return {
    baseAddress: item["base_address"],
    fileName: item["file_name"],
    href: item["href"],
    filePath: item["file_path"],
    moduleMemorySize: item["module_memory_size"],
    fileVersion: item["file_version"],
    fileDescription: item["file_description"],
    product: item["product"],
    productVersion: item["product_version"],
    isDebug: item["is_debug"],
    language: item["language"],
  };
}

export function _processInfoPropertiesDeserializer(item: any) {
  return {
    identifier: item["identifier"],
    deploymentName: item["deployment_name"],
    href: item["href"],
    minidump: item["minidump"],
    isProfileRunning: item["is_profile_running"],
    isIisProfileRunning: item["is_iis_profile_running"],
    iisProfileTimeoutInSeconds: item["iis_profile_timeout_in_seconds"],
    parent: item["parent"],
    children: !item["children"]
      ? item["children"]
      : item["children"].map((p: any) => {
          return p;
        }),
    threads: !item["threads"]
      ? item["threads"]
      : processThreadInfoArrayDeserializer(item["threads"]),
    openFileHandles: !item["open_file_handles"]
      ? item["open_file_handles"]
      : item["open_file_handles"].map((p: any) => {
          return p;
        }),
    modules: !item["modules"]
      ? item["modules"]
      : processModuleInfoArrayDeserializer(item["modules"]),
    fileName: item["file_name"],
    commandLine: item["command_line"],
    userName: item["user_name"],
    handleCount: item["handle_count"],
    moduleCount: item["module_count"],
    threadCount: item["thread_count"],
    startTime: !item["start_time"] ? item["start_time"] : new Date(item["start_time"]),
    totalCpuTime: item["total_cpu_time"],
    userCpuTime: item["user_cpu_time"],
    privilegedCpuTime: item["privileged_cpu_time"],
    workingSet: item["working_set"],
    peakWorkingSet: item["peak_working_set"],
    privateMemory: item["private_memory"],
    virtualMemory: item["virtual_memory"],
    peakVirtualMemory: item["peak_virtual_memory"],
    pagedSystemMemory: item["paged_system_memory"],
    nonPagedSystemMemory: item["non_paged_system_memory"],
    pagedMemory: item["paged_memory"],
    peakPagedMemory: item["peak_paged_memory"],
    timeStamp: !item["time_stamp"] ? item["time_stamp"] : new Date(item["time_stamp"]),
    environmentVariables: !item["environment_variables"]
      ? item["environment_variables"]
      : Object.fromEntries(
          Object.entries(item["environment_variables"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    isScmSite: item["is_scm_site"],
    isWebjob: item["is_webjob"],
    description: item["description"],
  };
}

export function _migrateMySqlStatusPropertiesDeserializer(item: any) {
  return {
    migrationOperationStatus: item["migrationOperationStatus"],
    operationId: item["operationId"],
    localMySqlEnabled: item["localMySqlEnabled"],
  };
}

export function _swiftVirtualNetworkPropertiesSerializer(item: SwiftVirtualNetwork): any {
  return { subnetResourceId: item["subnetResourceId"], swiftSupported: item["swiftSupported"] };
}

export function _swiftVirtualNetworkPropertiesDeserializer(item: any) {
  return {
    subnetResourceId: item["subnetResourceId"],
    swiftSupported: item["swiftSupported"],
  };
}

export function _networkFeaturesPropertiesDeserializer(item: any) {
  return {
    virtualNetworkName: item["virtualNetworkName"],
    virtualNetworkConnection: !item["virtualNetworkConnection"]
      ? item["virtualNetworkConnection"]
      : vnetInfoDeserializer(item["virtualNetworkConnection"]),
    hybridConnections: !item["hybridConnections"]
      ? item["hybridConnections"]
      : relayServiceConnectionEntityArrayDeserializer(item["hybridConnections"]),
    hybridConnectionsV2: !item["hybridConnectionsV2"]
      ? item["hybridConnectionsV2"]
      : hybridConnectionArrayDeserializer(item["hybridConnectionsV2"]),
  };
}

export function _premierAddOnPatchResourcePropertiesSerializer(
  item: PremierAddOnPatchResource,
): any {
  return {
    sku: item["sku"],
    product: item["product"],
    vendor: item["vendor"],
    marketplacePublisher: item["marketplacePublisher"],
    marketplaceOffer: item["marketplaceOffer"],
  };
}

export function _privateAccessPropertiesSerializer(item: PrivateAccess): any {
  return {
    enabled: item["enabled"],
    virtualNetworks: !item["virtualNetworks"]
      ? item["virtualNetworks"]
      : privateAccessVirtualNetworkArraySerializer(item["virtualNetworks"]),
  };
}

export function _privateAccessPropertiesDeserializer(item: any) {
  return {
    enabled: item["enabled"],
    virtualNetworks: !item["virtualNetworks"]
      ? item["virtualNetworks"]
      : privateAccessVirtualNetworkArrayDeserializer(item["virtualNetworks"]),
  };
}

export function _publicCertificatePropertiesSerializer(item: PublicCertificate): any {
  return {
    blob: !item["blob"] ? item["blob"] : uint8ArrayToString(item["blob"], "base64"),
    publicCertificateLocation: item["publicCertificateLocation"],
  };
}

export function _publicCertificatePropertiesDeserializer(item: any) {
  return {
    blob: !item["blob"]
      ? item["blob"]
      : typeof item["blob"] === "string"
        ? stringToUint8Array(item["blob"], "base64")
        : item["blob"],
    publicCertificateLocation: item["publicCertificateLocation"],
    thumbprint: item["thumbprint"],
  };
}

export function _siteContainerPropertiesSerializer(item: SiteContainer): any {
  return {
    image: item["image"],
    targetPort: item["targetPort"],
    isMain: item["isMain"],
    startUpCommand: item["startUpCommand"],
    authType: item["authType"],
    userName: item["userName"],
    passwordSecret: item["passwordSecret"],
    userManagedIdentityClientId: item["userManagedIdentityClientId"],
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArraySerializer(item["volumeMounts"]),
    inheritAppSettingsAndConnectionStrings: item["inheritAppSettingsAndConnectionStrings"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : environmentVariableArraySerializer(item["environmentVariables"]),
  };
}

export function _siteContainerPropertiesDeserializer(item: any) {
  return {
    image: item["image"],
    targetPort: item["targetPort"],
    isMain: item["isMain"],
    startUpCommand: item["startUpCommand"],
    authType: item["authType"],
    userName: item["userName"],
    passwordSecret: item["passwordSecret"],
    userManagedIdentityClientId: item["userManagedIdentityClientId"],
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    volumeMounts: !item["volumeMounts"]
      ? item["volumeMounts"]
      : volumeMountArrayDeserializer(item["volumeMounts"]),
    inheritAppSettingsAndConnectionStrings: item["inheritAppSettingsAndConnectionStrings"],
    environmentVariables: !item["environmentVariables"]
      ? item["environmentVariables"]
      : environmentVariableArrayDeserializer(item["environmentVariables"]),
  };
}

export function _siteExtensionInfoPropertiesDeserializer(item: any) {
  return {
    extensionId: item["extension_id"],
    title: item["title"],
    extensionType: item["extension_type"],
    summary: item["summary"],
    description: item["description"],
    version: item["version"],
    extensionUrl: item["extension_url"],
    projectUrl: item["project_url"],
    iconUrl: item["icon_url"],
    licenseUrl: item["license_url"],
    feedUrl: item["feed_url"],
    authors: !item["authors"]
      ? item["authors"]
      : item["authors"].map((p: any) => {
          return p;
        }),
    installerCommandLineParams: item["installer_command_line_params"],
    publishedDateTime: !item["published_date_time"]
      ? item["published_date_time"]
      : new Date(item["published_date_time"]),
    downloadCount: item["download_count"],
    localIsLatestVersion: item["local_is_latest_version"],
    localPath: item["local_path"],
    installedDateTime: !item["installed_date_time"]
      ? item["installed_date_time"]
      : new Date(item["installed_date_time"]),
    provisioningState: item["provisioningState"],
    comment: item["comment"],
  };
}

export function _siteSourceControlPropertiesSerializer(item: SiteSourceControl): any {
  return {
    repoUrl: item["repoUrl"],
    branch: item["branch"],
    isManualIntegration: item["isManualIntegration"],
    isGitHubAction: item["isGitHubAction"],
    deploymentRollbackEnabled: item["deploymentRollbackEnabled"],
    isMercurial: item["isMercurial"],
    gitHubActionConfiguration: !item["gitHubActionConfiguration"]
      ? item["gitHubActionConfiguration"]
      : gitHubActionConfigurationSerializer(item["gitHubActionConfiguration"]),
  };
}

export function _siteSourceControlPropertiesDeserializer(item: any) {
  return {
    repoUrl: item["repoUrl"],
    branch: item["branch"],
    isManualIntegration: item["isManualIntegration"],
    isGitHubAction: item["isGitHubAction"],
    deploymentRollbackEnabled: item["deploymentRollbackEnabled"],
    isMercurial: item["isMercurial"],
    gitHubActionConfiguration: !item["gitHubActionConfiguration"]
      ? item["gitHubActionConfiguration"]
      : gitHubActionConfigurationDeserializer(item["gitHubActionConfiguration"]),
  };
}

export function _triggeredWebJobPropertiesDeserializer(item: any) {
  return {
    latestRun: !item["latest_run"]
      ? item["latest_run"]
      : triggeredJobRunDeserializer(item["latest_run"]),
    historyUrl: item["history_url"],
    schedulerLogsUrl: item["scheduler_logs_url"],
    runCommand: item["run_command"],
    url: item["url"],
    extraInfoUrl: item["extra_info_url"],
    webJobType: item["web_job_type"],
    error: item["error"],
    usingSdk: item["using_sdk"],
    publicNetworkAccess: item["publicNetworkAccess"],
    storageAccountRequired: item["storageAccountRequired"],
    settings: !item["settings"]
      ? item["settings"]
      : Object.fromEntries(Object.entries(item["settings"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function _triggeredJobHistoryPropertiesDeserializer(item: any) {
  return {
    runs: !item["runs"] ? item["runs"] : triggeredJobRunArrayDeserializer(item["runs"]),
  };
}

export function _webJobPropertiesDeserializer(item: any) {
  return {
    runCommand: item["run_command"],
    url: item["url"],
    extraInfoUrl: item["extra_info_url"],
    webJobType: item["web_job_type"],
    error: item["error"],
    usingSdk: item["using_sdk"],
    settings: !item["settings"]
      ? item["settings"]
      : Object.fromEntries(Object.entries(item["settings"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function _appServicePlanPatchResourcePropertiesSerializer(
  item: AppServicePlanPatchResource,
): any {
  return {
    workerTierName: item["workerTierName"],
    hostingEnvironmentProfile: !item["hostingEnvironmentProfile"]
      ? item["hostingEnvironmentProfile"]
      : hostingEnvironmentProfileSerializer(item["hostingEnvironmentProfile"]),
    perSiteScaling: item["perSiteScaling"],
    elasticScaleEnabled: item["elasticScaleEnabled"],
    maximumElasticWorkerCount: item["maximumElasticWorkerCount"],
    isSpot: item["isSpot"],
    spotExpirationTime: !item["spotExpirationTime"]
      ? item["spotExpirationTime"]
      : item["spotExpirationTime"].toISOString(),
    freeOfferExpirationTime: !item["freeOfferExpirationTime"]
      ? item["freeOfferExpirationTime"]
      : item["freeOfferExpirationTime"].toISOString(),
    reserved: item["reserved"],
    isXenon: item["isXenon"],
    hyperV: item["hyperV"],
    targetWorkerCount: item["targetWorkerCount"],
    targetWorkerSizeId: item["targetWorkerSizeId"],
    kubeEnvironmentProfile: !item["kubeEnvironmentProfile"]
      ? item["kubeEnvironmentProfile"]
      : kubeEnvironmentProfileSerializer(item["kubeEnvironmentProfile"]),
    zoneRedundant: item["zoneRedundant"],
  };
}

export function _hybridConnectionKeyPropertiesDeserializer(item: any) {
  return {
    sendKeyName: item["sendKeyName"],
    sendKeyValue: item["sendKeyValue"],
  };
}

export function _hybridConnectionLimitsPropertiesDeserializer(item: any) {
  return {
    current: item["current"],
    maximum: item["maximum"],
  };
}

export function _certificatePropertiesSerializer(item: Certificate): any {
  return {
    password: item["password"],
    hostNames: !item["hostNames"]
      ? item["hostNames"]
      : item["hostNames"].map((p: any) => {
          return p;
        }),
    pfxBlob: !item["pfxBlob"] ? item["pfxBlob"] : uint8ArrayToString(item["pfxBlob"], "base64"),
    keyVaultId: item["keyVaultId"],
    keyVaultSecretName: item["keyVaultSecretName"],
    serverFarmId: item["serverFarmId"],
    canonicalName: item["canonicalName"],
    domainValidationMethod: item["domainValidationMethod"],
  };
}

export function _certificatePropertiesDeserializer(item: any) {
  return {
    password: item["password"],
    friendlyName: item["friendlyName"],
    subjectName: item["subjectName"],
    hostNames: !item["hostNames"]
      ? item["hostNames"]
      : item["hostNames"].map((p: any) => {
          return p;
        }),
    pfxBlob: !item["pfxBlob"]
      ? item["pfxBlob"]
      : typeof item["pfxBlob"] === "string"
        ? stringToUint8Array(item["pfxBlob"], "base64")
        : item["pfxBlob"],
    siteName: item["siteName"],
    selfLink: item["selfLink"],
    issuer: item["issuer"],
    issueDate: !item["issueDate"] ? item["issueDate"] : new Date(item["issueDate"]),
    expirationDate: !item["expirationDate"]
      ? item["expirationDate"]
      : new Date(item["expirationDate"]),
    thumbprint: item["thumbprint"],
    valid: item["valid"],
    cerBlob: !item["cerBlob"]
      ? item["cerBlob"]
      : typeof item["cerBlob"] === "string"
        ? stringToUint8Array(item["cerBlob"], "base64")
        : item["cerBlob"],
    publicKeyHash: item["publicKeyHash"],
    hostingEnvironmentProfile: !item["hostingEnvironmentProfile"]
      ? item["hostingEnvironmentProfile"]
      : hostingEnvironmentProfileDeserializer(item["hostingEnvironmentProfile"]),
    keyVaultId: item["keyVaultId"],
    keyVaultSecretName: item["keyVaultSecretName"],
    keyVaultSecretStatus: item["keyVaultSecretStatus"],
    serverFarmId: item["serverFarmId"],
    canonicalName: item["canonicalName"],
    domainValidationMethod: item["domainValidationMethod"],
  };
}

export function _certificatePatchResourcePropertiesSerializer(item: CertificatePatchResource): any {
  return {
    hostNames: !item["hostNames"]
      ? item["hostNames"]
      : item["hostNames"].map((p: any) => {
          return p;
        }),
    pfxBlob: !item["pfxBlob"] ? item["pfxBlob"] : uint8ArrayToString(item["pfxBlob"], "base64"),
    keyVaultId: item["keyVaultId"],
    keyVaultSecretName: item["keyVaultSecretName"],
    serverFarmId: item["serverFarmId"],
    canonicalName: item["canonicalName"],
    domainValidationMethod: item["domainValidationMethod"],
  };
}

export function _deletedSitePropertiesDeserializer(item: any) {
  return {
    deletedSiteId: item["deletedSiteId"],
    deletedTimestamp: item["deletedTimestamp"],
    subscription: item["subscription"],
    resourceGroup: item["resourceGroup"],
    deletedSiteName: item["deletedSiteName"],
    slot: item["slot"],
    kindPropertiesKind: item["kind"],
    geoRegionName: item["geoRegionName"],
  };
}

export function _detectorResponsePropertiesDeserializer(item: any) {
  return {
    metadata: !item["metadata"] ? item["metadata"] : detectorInfoDeserializer(item["metadata"]),
    dataset: !item["dataset"] ? item["dataset"] : diagnosticDataArrayDeserializer(item["dataset"]),
    status: !item["status"] ? item["status"] : statusDeserializer(item["status"]),
    dataProvidersMetadata: !item["dataProvidersMetadata"]
      ? item["dataProvidersMetadata"]
      : dataProviderMetadataArrayDeserializer(item["dataProvidersMetadata"]),
    suggestedUtterances: !item["suggestedUtterances"]
      ? item["suggestedUtterances"]
      : queryUtterancesResultsDeserializer(item["suggestedUtterances"]),
  };
}

export function _diagnosticCategoryPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
  };
}

export function _analysisDefinitionPropertiesDeserializer(item: any) {
  return {
    description: item["description"],
  };
}

export function _diagnosticAnalysisPropertiesDeserializer(item: any) {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    abnormalTimePeriods: !item["abnormalTimePeriods"]
      ? item["abnormalTimePeriods"]
      : abnormalTimePeriodArrayDeserializer(item["abnormalTimePeriods"]),
    payload: !item["payload"] ? item["payload"] : analysisDataArrayDeserializer(item["payload"]),
    nonCorrelatedDetectors: !item["nonCorrelatedDetectors"]
      ? item["nonCorrelatedDetectors"]
      : detectorDefinitionArrayDeserializer(item["nonCorrelatedDetectors"]),
  };
}

export function _detectorDefinitionResourcePropertiesDeserializer(item: any) {
  return {
    displayName: item["displayName"],
    description: item["description"],
    rank: item["rank"],
    isEnabled: item["isEnabled"],
  };
}

export function _diagnosticDetectorResponsePropertiesDeserializer(item: any) {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    issueDetected: item["issueDetected"],
    detectorDefinition: !item["detectorDefinition"]
      ? item["detectorDefinition"]
      : detectorDefinitionDeserializer(item["detectorDefinition"]),
    metrics: !item["metrics"]
      ? item["metrics"]
      : diagnosticMetricSetArrayDeserializer(item["metrics"]),
    abnormalTimePeriods: !item["abnormalTimePeriods"]
      ? item["abnormalTimePeriods"]
      : detectorAbnormalTimePeriodArrayDeserializer(item["abnormalTimePeriods"]),
    data: !item["data"] ? item["data"] : nameValuePairArrayArrayDeserializer(item["data"]),
    responseMetaData: !item["responseMetaData"]
      ? item["responseMetaData"]
      : responseMetaDataDeserializer(item["responseMetaData"]),
  };
}

export function _kubeEnvironmentPropertiesSerializer(item: KubeEnvironment): any {
  return {
    internalLoadBalancerEnabled: item["internalLoadBalancerEnabled"],
    staticIp: item["staticIp"],
    environmentType: item["environmentType"],
    arcConfiguration: !item["arcConfiguration"]
      ? item["arcConfiguration"]
      : arcConfigurationSerializer(item["arcConfiguration"]),
    appLogsConfiguration: !item["appLogsConfiguration"]
      ? item["appLogsConfiguration"]
      : appLogsConfigurationSerializer(item["appLogsConfiguration"]),
    containerAppsConfiguration: !item["containerAppsConfiguration"]
      ? item["containerAppsConfiguration"]
      : containerAppsConfigurationSerializer(item["containerAppsConfiguration"]),
    aksResourceID: item["aksResourceID"],
  };
}

export function _kubeEnvironmentPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    deploymentErrors: item["deploymentErrors"],
    internalLoadBalancerEnabled: item["internalLoadBalancerEnabled"],
    defaultDomain: item["defaultDomain"],
    staticIp: item["staticIp"],
    environmentType: item["environmentType"],
    arcConfiguration: !item["arcConfiguration"]
      ? item["arcConfiguration"]
      : arcConfigurationDeserializer(item["arcConfiguration"]),
    appLogsConfiguration: !item["appLogsConfiguration"]
      ? item["appLogsConfiguration"]
      : appLogsConfigurationDeserializer(item["appLogsConfiguration"]),
    containerAppsConfiguration: !item["containerAppsConfiguration"]
      ? item["containerAppsConfiguration"]
      : containerAppsConfigurationDeserializer(item["containerAppsConfiguration"]),
    aksResourceID: item["aksResourceID"],
  };
}

export function _kubeEnvironmentPatchResourcePropertiesSerializer(
  item: KubeEnvironmentPatchResource,
): any {
  return {
    internalLoadBalancerEnabled: item["internalLoadBalancerEnabled"],
    staticIp: item["staticIp"],
    arcConfiguration: !item["arcConfiguration"]
      ? item["arcConfiguration"]
      : arcConfigurationSerializer(item["arcConfiguration"]),
    appLogsConfiguration: !item["appLogsConfiguration"]
      ? item["appLogsConfiguration"]
      : appLogsConfigurationSerializer(item["appLogsConfiguration"]),
    containerAppsConfiguration: !item["containerAppsConfiguration"]
      ? item["containerAppsConfiguration"]
      : containerAppsConfigurationSerializer(item["containerAppsConfiguration"]),
    aksResourceID: item["aksResourceID"],
  };
}

export function _workflowRunPropertiesDeserializer(item: any) {
  return {
    waitEndTime: !item["waitEndTime"] ? item["waitEndTime"] : new Date(item["waitEndTime"]),
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    status: item["status"],
    code: item["code"],
    error: item["error"],
    correlationId: item["correlationId"],
    correlation: !item["correlation"]
      ? item["correlation"]
      : correlationDeserializer(item["correlation"]),
    workflow: !item["workflow"]
      ? item["workflow"]
      : resourceReferenceDeserializer(item["workflow"]),
    trigger: !item["trigger"] ? item["trigger"] : workflowRunTriggerDeserializer(item["trigger"]),
    outputs: !item["outputs"]
      ? item["outputs"]
      : workflowOutputParameterRecordDeserializer(item["outputs"]),
    response: !item["response"]
      ? item["response"]
      : workflowRunTriggerDeserializer(item["response"]),
  };
}

export function _workflowRunActionPropertiesDeserializer(item: any) {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    status: item["status"],
    code: item["code"],
    error: item["error"],
    trackingId: item["trackingId"],
    correlation: !item["correlation"]
      ? item["correlation"]
      : runActionCorrelationDeserializer(item["correlation"]),
    inputsLink: !item["inputsLink"]
      ? item["inputsLink"]
      : contentLinkDeserializer(item["inputsLink"]),
    outputsLink: !item["outputsLink"]
      ? item["outputsLink"]
      : contentLinkDeserializer(item["outputsLink"]),
    trackedProperties: item["trackedProperties"],
    retryHistory: !item["retryHistory"]
      ? item["retryHistory"]
      : retryHistoryArrayDeserializer(item["retryHistory"]),
  };
}

export function _workflowRunActionRepetitionDefinitionPropertiesDeserializer(item: any) {
  return {
    trackingId: item["trackingId"],
    inputs: item["inputs"],
    inputsLink: !item["inputsLink"]
      ? item["inputsLink"]
      : contentLinkDeserializer(item["inputsLink"]),
    outputs: item["outputs"],
    outputsLink: !item["outputsLink"]
      ? item["outputsLink"]
      : contentLinkDeserializer(item["outputsLink"]),
    trackedProperties: item["trackedProperties"],
    retryHistory: !item["retryHistory"]
      ? item["retryHistory"]
      : retryHistoryArrayDeserializer(item["retryHistory"]),
    iterationCount: item["iterationCount"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    correlation: !item["correlation"]
      ? item["correlation"]
      : runActionCorrelationDeserializer(item["correlation"]),
    status: item["status"],
    code: item["code"],
    error: item["error"],
    repetitionIndexes: !item["repetitionIndexes"]
      ? item["repetitionIndexes"]
      : repetitionIndexArrayDeserializer(item["repetitionIndexes"]),
  };
}

export function _workflowTriggerPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    changedTime: !item["changedTime"] ? item["changedTime"] : new Date(item["changedTime"]),
    state: item["state"],
    status: item["status"],
    lastExecutionTime: !item["lastExecutionTime"]
      ? item["lastExecutionTime"]
      : new Date(item["lastExecutionTime"]),
    nextExecutionTime: !item["nextExecutionTime"]
      ? item["nextExecutionTime"]
      : new Date(item["nextExecutionTime"]),
    recurrence: !item["recurrence"]
      ? item["recurrence"]
      : workflowTriggerRecurrenceDeserializer(item["recurrence"]),
    workflow: !item["workflow"]
      ? item["workflow"]
      : resourceReferenceDeserializer(item["workflow"]),
  };
}

export function _workflowTriggerHistoryPropertiesDeserializer(item: any) {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    scheduledTime: !item["scheduledTime"] ? item["scheduledTime"] : new Date(item["scheduledTime"]),
    status: item["status"],
    code: item["code"],
    error: item["error"],
    trackingId: item["trackingId"],
    correlation: !item["correlation"]
      ? item["correlation"]
      : correlationDeserializer(item["correlation"]),
    inputsLink: !item["inputsLink"]
      ? item["inputsLink"]
      : contentLinkDeserializer(item["inputsLink"]),
    outputsLink: !item["outputsLink"]
      ? item["outputsLink"]
      : contentLinkDeserializer(item["outputsLink"]),
    fired: item["fired"],
    run: !item["run"] ? item["run"] : resourceReferenceDeserializer(item["run"]),
  };
}

export function _workflowVersionPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    changedTime: !item["changedTime"] ? item["changedTime"] : new Date(item["changedTime"]),
    state: item["state"],
    version: item["version"],
    accessEndpoint: item["accessEndpoint"],
    endpointsConfiguration: !item["endpointsConfiguration"]
      ? item["endpointsConfiguration"]
      : flowEndpointsConfigurationDeserializer(item["endpointsConfiguration"]),
    accessControl: !item["accessControl"]
      ? item["accessControl"]
      : flowAccessControlConfigurationDeserializer(item["accessControl"]),
    sku: !item["sku"] ? item["sku"] : workflowSkuDeserializer(item["sku"]),
    integrationAccount: !item["integrationAccount"]
      ? item["integrationAccount"]
      : resourceReferenceDeserializer(item["integrationAccount"]),
    definition: item["definition"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : workflowParameterRecordDeserializer(item["parameters"]),
  };
}

export function _applicationStackResourcePropertiesDeserializer(item: any) {
  return {
    namePropertiesName: item["name"],
    display: item["display"],
    dependency: item["dependency"],
    majorVersions: !item["majorVersions"]
      ? item["majorVersions"]
      : stackMajorVersionArrayDeserializer(item["majorVersions"]),
    frameworks: !item["frameworks"]
      ? item["frameworks"]
      : applicationStackArrayDeserializer(item["frameworks"]),
    isDeprecated: !item["isDeprecated"]
      ? item["isDeprecated"]
      : applicationStackArrayDeserializer(item["isDeprecated"]),
  };
}

export function _functionAppStackPropertiesDeserializer(item: any) {
  return {
    displayText: item["displayText"],
    value: item["value"],
    majorVersions: !item["majorVersions"]
      ? item["majorVersions"]
      : functionAppMajorVersionArrayDeserializer(item["majorVersions"]),
    preferredOs: item["preferredOs"],
  };
}

export function _webAppStackPropertiesDeserializer(item: any) {
  return {
    displayText: item["displayText"],
    value: item["value"],
    majorVersions: !item["majorVersions"]
      ? item["majorVersions"]
      : webAppMajorVersionArrayDeserializer(item["majorVersions"]),
    preferredOs: item["preferredOs"],
  };
}

export function _resourceHealthMetadataPropertiesDeserializer(item: any) {
  return {
    category: item["category"],
    signalAvailability: item["signalAvailability"],
  };
}

export function _workflowPropertiesSerializer(item: Workflow): any {
  return {
    state: item["state"],
    endpointsConfiguration: !item["endpointsConfiguration"]
      ? item["endpointsConfiguration"]
      : flowEndpointsConfigurationSerializer(item["endpointsConfiguration"]),
    accessControl: !item["accessControl"]
      ? item["accessControl"]
      : flowAccessControlConfigurationSerializer(item["accessControl"]),
    integrationAccount: !item["integrationAccount"]
      ? item["integrationAccount"]
      : resourceReferenceSerializer(item["integrationAccount"]),
    integrationServiceEnvironment: !item["integrationServiceEnvironment"]
      ? item["integrationServiceEnvironment"]
      : resourceReferenceSerializer(item["integrationServiceEnvironment"]),
    definition: item["definition"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : workflowParameterRecordSerializer(item["parameters"]),
    kind: item["kind"],
  };
}

export type GlobalGetDeletedWebAppSnapshotsResponse = { body: Snapshot[] };

export type AppServicePlansListRoutesForVnetResponse = { body: VnetRoute[] };

export type AppServicePlansGetRouteForVnetResponse = { body: VnetRoute[] };

export type AppServicePlansListVnetsResponse = { body: VnetInfoResource[] };

export type AppServicePlansGetServerFarmSkusResponse = { body: any };

export type AppServicePlansListCapabilitiesResponse = { body: Capability[] };

export type WebAppsGetProcessDumpSlotResponse = { body: Uint8Array };

export type WebAppsGetInstanceProcessDumpSlotResponse = { body: Uint8Array };

export type WebAppsGetProcessDumpResponse = { body: Uint8Array };

export type WebAppsGetInstanceProcessDumpResponse = { body: Uint8Array };

export type WebAppsListPublishingProfileXmlWithSecretsResponse = { body: Uint8Array };

export type WebAppsGetNetworkTracesV2Response = { body: NetworkTrace[] };

export type WebAppsGetNetworkTraceOperationV2Response = { body: NetworkTrace[] };

export type WebAppsGetNetworkTracesResponse = { body: NetworkTrace[] };

export type WebAppsStartWebSiteNetworkTraceResponse = { body: string };

export type WebAppsGetNetworkTraceOperationResponse = { body: NetworkTrace[] };

export type WebAppsUpdateMachineKeyResponse = { body: any };

export type WebAppsGetFunctionsAdminTokenResponse = { body: string };

export type WebAppsCreateOneDeployOperationResponse = { body: any };

export type WebAppsGetOneDeployStatusResponse = { body: any };

export type WebAppsGetContainerLogsZipResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeJS.ReadableStream;
};

export type WebAppsGetWebSiteContainerLogsResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeJS.ReadableStream;
};

export type WebAppsListVnetConnectionsResponse = { body: VnetInfoResource[] };

export type WebAppsListVnetConnectionsSlotResponse = { body: VnetInfoResource[] };

export type WebAppsListPublishingProfileXmlWithSecretsSlotResponse = { body: Uint8Array };

export type WebAppsGetNetworkTracesSlotV2Response = { body: NetworkTrace[] };

export type WebAppsGetNetworkTraceOperationSlotV2Response = { body: NetworkTrace[] };

export type WebAppsGetNetworkTracesSlotResponse = { body: NetworkTrace[] };

export type WebAppsStartWebSiteNetworkTraceSlotResponse = { body: string };

export type WebAppsGetNetworkTraceOperationSlotResponse = { body: NetworkTrace[] };

export type WebAppsGetFunctionsAdminTokenSlotResponse = { body: string };

export type WebAppsGetContainerLogsZipSlotResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeJS.ReadableStream;
};

export type WebAppsGetWebSiteContainerLogsSlotResponse = {
  /**
   * BROWSER ONLY
   *
   * The response body as a browser Blob.
   * Always `undefined` in node.js.
   */
  blobBody?: Promise<Blob>;
  /**
   * NODEJS ONLY
   *
   * The response body as a node.js Readable stream.
   * Always `undefined` in the browser.
   */
  readableStreamBody?: NodeJS.ReadableStream;
};

export type AppServiceEnvironmentsDeleteAseCustomDnsSuffixConfigurationResponse = { body: any };

export type AppServiceEnvironmentsListOperationsResponse = { body: Operation[] };

export type AppServiceEnvironmentsListDiagnosticsResponse = {
  body: HostingEnvironmentDiagnostics[];
};
