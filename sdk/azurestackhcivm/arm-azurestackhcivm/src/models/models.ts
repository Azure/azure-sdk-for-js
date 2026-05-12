// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The gallery images resource definition. */
export interface GalleryImage extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: GalleryImageProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function galleryImageSerializer(item: GalleryImage): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : galleryImagePropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function galleryImageDeserializer(item: any): GalleryImage {
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
      : galleryImagePropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Properties under the gallery image resource */
export interface GalleryImageProperties {
  /** Storage ContainerID of the storage container to be used for gallery image */
  containerId?: string;
  /** location of the image the gallery image should be created from */
  imagePath?: string;
  /** Operating system type that the gallery image uses [Windows, Linux] */
  osType: OperatingSystemTypes;
  /** Datasource for the gallery image when provisioning with cloud-init [NoCloud, Azure] */
  cloudInitDataSource?: CloudInitDataSource;
  /** The hypervisor generation of the Virtual Machine [V1, V2] */
  hyperVGeneration?: HyperVGeneration;
  /** This is the gallery image definition identifier. */
  identifier?: GalleryImageIdentifier;
  /** Specifies information about the gallery image version that you want to create or update. */
  version?: GalleryImageVersion;
  /** Provisioning state of the gallery image. */
  readonly provisioningState?: ProvisioningStateEnum;
  /** The observed state of gallery images */
  readonly status?: GalleryImageStatus;
  /** Resource ID of the source virtual machine from whose OS disk the gallery image is created. */
  sourceVirtualMachineId?: string;
}

export function galleryImagePropertiesSerializer(item: GalleryImageProperties): any {
  return {
    containerId: item["containerId"],
    imagePath: item["imagePath"],
    osType: item["osType"],
    cloudInitDataSource: item["cloudInitDataSource"],
    hyperVGeneration: item["hyperVGeneration"],
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryImageIdentifierSerializer(item["identifier"]),
    version: !item["version"] ? item["version"] : galleryImageVersionSerializer(item["version"]),
    sourceVirtualMachineId: item["sourceVirtualMachineId"],
  };
}

export function galleryImagePropertiesDeserializer(item: any): GalleryImageProperties {
  return {
    containerId: item["containerId"],
    imagePath: item["imagePath"],
    osType: item["osType"],
    cloudInitDataSource: item["cloudInitDataSource"],
    hyperVGeneration: item["hyperVGeneration"],
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryImageIdentifierDeserializer(item["identifier"]),
    version: !item["version"] ? item["version"] : galleryImageVersionDeserializer(item["version"]),
    provisioningState: item["provisioningState"],
    status: !item["status"] ? item["status"] : galleryImageStatusDeserializer(item["status"]),
    sourceVirtualMachineId: item["sourceVirtualMachineId"],
  };
}

/** Operating system type that the gallery image uses [Windows, Linux] */
export enum KnownOperatingSystemTypes {
  /** Windows operating system */
  Windows = "Windows",
  /** Linux operating system */
  Linux = "Linux",
}

/**
 * Operating system type that the gallery image uses [Windows, Linux] \
 * {@link KnownOperatingSystemTypes} can be used interchangeably with OperatingSystemTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows**: Windows operating system \
 * **Linux**: Linux operating system
 */
export type OperatingSystemTypes = string;

/** Datasource for the gallery image when provisioning with cloud-init [NoCloud, Azure] */
export enum KnownCloudInitDataSource {
  /** NoCloud is used as the datasource */
  NoCloud = "NoCloud",
  /** Azure is used as the datasource */
  Azure = "Azure",
}

/**
 * Datasource for the gallery image when provisioning with cloud-init [NoCloud, Azure] \
 * {@link KnownCloudInitDataSource} can be used interchangeably with CloudInitDataSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoCloud**: NoCloud is used as the datasource \
 * **Azure**: Azure is used as the datasource
 */
export type CloudInitDataSource = string;

/** The hypervisor generation of the Virtual Machine [V1, V2] */
export enum KnownHyperVGeneration {
  /** Generation 1 (V1) hypervisor */
  V1 = "V1",
  /** Generation 2 (V2) hypervisor */
  V2 = "V2",
  /** Not applicable/determined by platform */
  NA = "NA",
}

/**
 * The hypervisor generation of the Virtual Machine [V1, V2] \
 * {@link KnownHyperVGeneration} can be used interchangeably with HyperVGeneration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **V1**: Generation 1 (V1) hypervisor \
 * **V2**: Generation 2 (V2) hypervisor \
 * **NA**: Not applicable\/determined by platform
 */
export type HyperVGeneration = string;

/** This is the gallery image definition identifier. */
export interface GalleryImageIdentifier {
  /** The name of the gallery image definition publisher. */
  publisher: string;
  /** The name of the gallery image definition offer. */
  offer: string;
  /** The name of the gallery image definition SKU. */
  sku: string;
}

export function galleryImageIdentifierSerializer(item: GalleryImageIdentifier): any {
  return { publisher: item["publisher"], offer: item["offer"], sku: item["sku"] };
}

export function galleryImageIdentifierDeserializer(item: any): GalleryImageIdentifier {
  return {
    publisher: item["publisher"],
    offer: item["offer"],
    sku: item["sku"],
  };
}

/** Specifies information about the gallery image version that you want to create or update. */
export interface GalleryImageVersion {
  /** This is the version of the gallery image. */
  name?: string;
  /** This is the storage profile of a Gallery Image Version. */
  storageProfile?: GalleryImageVersionStorageProfile;
}

export function galleryImageVersionSerializer(item: GalleryImageVersion): any {
  return {
    name: item["name"],
    properties: areAllPropsUndefined(item, ["storageProfile"])
      ? undefined
      : _galleryImageVersionPropertiesSerializer(item),
  };
}

export function galleryImageVersionDeserializer(item: any): GalleryImageVersion {
  return {
    name: item["name"],
    ...(!item["properties"]
      ? item["properties"]
      : _galleryImageVersionPropertiesDeserializer(item["properties"])),
  };
}

/** Describes the properties of a gallery image version. */
export interface GalleryImageVersionProperties {
  /** This is the storage profile of a Gallery Image Version. */
  storageProfile: GalleryImageVersionStorageProfile;
}

export function galleryImageVersionPropertiesSerializer(item: GalleryImageVersionProperties): any {
  return { storageProfile: galleryImageVersionStorageProfileSerializer(item["storageProfile"]) };
}

export function galleryImageVersionPropertiesDeserializer(
  item: any,
): GalleryImageVersionProperties {
  return {
    storageProfile: galleryImageVersionStorageProfileDeserializer(item["storageProfile"]),
  };
}

/** This is the storage profile of a Gallery Image Version. */
export interface GalleryImageVersionStorageProfile {
  /** This is the OS disk image. */
  osDiskImage?: GalleryOSDiskImage;
}

export function galleryImageVersionStorageProfileSerializer(
  item: GalleryImageVersionStorageProfile,
): any {
  return {
    osDiskImage: !item["osDiskImage"]
      ? item["osDiskImage"]
      : galleryOSDiskImageSerializer(item["osDiskImage"]),
  };
}

export function galleryImageVersionStorageProfileDeserializer(
  item: any,
): GalleryImageVersionStorageProfile {
  return {
    osDiskImage: !item["osDiskImage"]
      ? item["osDiskImage"]
      : galleryOSDiskImageDeserializer(item["osDiskImage"]),
  };
}

/** This is the OS disk image. */
export interface GalleryOSDiskImage {
  /** This property indicates the size of the VHD to be created. */
  readonly sizeInMB?: number;
}

export function galleryOSDiskImageSerializer(_item: GalleryOSDiskImage): any {
  return {};
}

export function galleryOSDiskImageDeserializer(item: any): GalleryOSDiskImage {
  return {
    sizeInMB: item["sizeInMB"],
  };
}

/** Provisioning state of the resource. */
export enum KnownProvisioningStateEnum {
  /** Provisioning has succeeded */
  Succeeded = "Succeeded",
  /** Provisioning has failed */
  Failed = "Failed",
  /** Provisioning is in progress */
  InProgress = "InProgress",
  /** Provisioning has been accepted */
  Accepted = "Accepted",
  /** Deletion of the resource is in progress */
  Deleting = "Deleting",
  /** Provisioning has been canceled */
  Canceled = "Canceled",
}

/**
 * Provisioning state of the resource. \
 * {@link KnownProvisioningStateEnum} can be used interchangeably with ProvisioningStateEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Provisioning has succeeded \
 * **Failed**: Provisioning has failed \
 * **InProgress**: Provisioning is in progress \
 * **Accepted**: Provisioning has been accepted \
 * **Deleting**: Deletion of the resource is in progress \
 * **Canceled**: Provisioning has been canceled
 */
export type ProvisioningStateEnum = string;

/** The observed state of gallery images */
export interface GalleryImageStatus {
  /** GalleryImage provisioning error code */
  errorCode?: string;
  /** Descriptive error message */
  errorMessage?: string;
  /** provisioning status of the gallery image */
  provisioningStatus?: GalleryImageStatusProvisioningStatus;
  /** The download status of the gallery image */
  downloadStatus?: GalleryImageStatusDownloadStatus;
  /** The progress of the operation in percentage */
  progressPercentage?: number;
}

export function galleryImageStatusDeserializer(item: any): GalleryImageStatus {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : galleryImageStatusProvisioningStatusDeserializer(item["provisioningStatus"]),
    downloadStatus: !item["downloadStatus"]
      ? item["downloadStatus"]
      : galleryImageStatusDownloadStatusDeserializer(item["downloadStatus"]),
    progressPercentage: item["progressPercentage"],
  };
}

/** The status of the operation performed on the gallery image */
export interface GalleryImageStatusProvisioningStatus {
  /** The ID of the operation performed on the gallery image */
  operationId?: string;
  /** The status of the operation performed on the gallery image [Succeeded, Failed, InProgress] */
  status?: Status;
}

export function galleryImageStatusProvisioningStatusDeserializer(
  item: any,
): GalleryImageStatusProvisioningStatus {
  return {
    operationId: item["operationId"],
    status: item["status"],
  };
}

/** The status of the operation performed on the resource [Succeeded, Failed, InProgress] */
export enum KnownStatus {
  /** Operation succeeded */
  Succeeded = "Succeeded",
  /** Operation failed */
  Failed = "Failed",
  /** Operation is in progress */
  InProgress = "InProgress",
}

/**
 * The status of the operation performed on the resource [Succeeded, Failed, InProgress] \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Operation succeeded \
 * **Failed**: Operation failed \
 * **InProgress**: Operation is in progress
 */
export type Status = string;

/** The download status of the gallery image */
export interface GalleryImageStatusDownloadStatus {
  /** The downloaded sized of the image in MB */
  downloadSizeInMB?: number;
}

export function galleryImageStatusDownloadStatusDeserializer(
  item: any,
): GalleryImageStatusDownloadStatus {
  return {
    downloadSizeInMB: item["downloadSizeInMB"],
  };
}

/** The complex type of the extended location. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name?: string;
  /** The type of the extended location. */
  type?: ExtendedLocationTypes;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { name: item["name"], type: item["type"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The type of extendedLocation. */
export enum KnownExtendedLocationTypes {
  /** Custom extended location type */
  CustomLocation = "CustomLocation",
}

/**
 * The type of extendedLocation. \
 * {@link KnownExtendedLocationTypes} can be used interchangeably with ExtendedLocationTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CustomLocation**: Custom extended location type
 */
export type ExtendedLocationTypes = string;

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

/** The type used for updating tags in GalleryImage resources. */
export interface GalleryImageTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function galleryImageTagsUpdateSerializer(item: GalleryImageTagsUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a GalleryImage list operation. */
export interface _GalleryImageListResult {
  /** The GalleryImage items on this page */
  value: GalleryImage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _galleryImageListResultDeserializer(item: any): _GalleryImageListResult {
  return {
    value: galleryImageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function galleryImageArraySerializer(result: Array<GalleryImage>): any[] {
  return result.map((item) => {
    return galleryImageSerializer(item);
  });
}

export function galleryImageArrayDeserializer(result: Array<GalleryImage>): any[] {
  return result.map((item) => {
    return galleryImageDeserializer(item);
  });
}

/** The logical network resource definition. */
export interface LogicalNetwork extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: LogicalNetworkProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function logicalNetworkSerializer(item: LogicalNetwork): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : logicalNetworkPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function logicalNetworkDeserializer(item: any): LogicalNetwork {
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
      : logicalNetworkPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Properties under the logical network resource */
export interface LogicalNetworkProperties {
  /** DhcpOptions contains an array of DNS servers available to VMs deployed in the logical network. Standard DHCP option for a subnet overrides logical network DHCP options. */
  dhcpOptions?: LogicalNetworkPropertiesDhcpOptions;
  /** Managed network fabric l2/l3 ISD for this logical network. If set empty, the logical network remains entirely local. */
  fabricNetworkConfiguration?: ManagedNetworkFabricArmReference;
  /** Subnet - list of subnets under the logical network */
  subnets?: Subnet[];
  /** Provisioning state of the logical network. */
  readonly provisioningState?: ProvisioningStateEnum;
  /** name of the network switch to be used for VMs */
  vmSwitchName?: string;
  /** The observed state of logical networks */
  readonly status?: LogicalNetworkStatus;
  /** Type of the Logical Network */
  readonly networkType?: LogicalNetworkTypeEnum;
}

export function logicalNetworkPropertiesSerializer(item: LogicalNetworkProperties): any {
  return {
    dhcpOptions: !item["dhcpOptions"]
      ? item["dhcpOptions"]
      : logicalNetworkPropertiesDhcpOptionsSerializer(item["dhcpOptions"]),
    fabricNetworkConfiguration: !item["fabricNetworkConfiguration"]
      ? item["fabricNetworkConfiguration"]
      : managedNetworkFabricArmReferenceSerializer(item["fabricNetworkConfiguration"]),
    subnets: !item["subnets"] ? item["subnets"] : subnetArraySerializer(item["subnets"]),
    vmSwitchName: item["vmSwitchName"],
  };
}

export function logicalNetworkPropertiesDeserializer(item: any): LogicalNetworkProperties {
  return {
    dhcpOptions: !item["dhcpOptions"]
      ? item["dhcpOptions"]
      : logicalNetworkPropertiesDhcpOptionsDeserializer(item["dhcpOptions"]),
    fabricNetworkConfiguration: !item["fabricNetworkConfiguration"]
      ? item["fabricNetworkConfiguration"]
      : managedNetworkFabricArmReferenceDeserializer(item["fabricNetworkConfiguration"]),
    subnets: !item["subnets"] ? item["subnets"] : subnetArrayDeserializer(item["subnets"]),
    provisioningState: item["provisioningState"],
    vmSwitchName: item["vmSwitchName"],
    status: !item["status"] ? item["status"] : logicalNetworkStatusDeserializer(item["status"]),
    networkType: item["networkType"],
  };
}

/** DhcpOptions contains an array of DNS servers available to VMs deployed in the logical network. Standard DHCP option for a subnet overrides logical network DHCP options. */
export interface LogicalNetworkPropertiesDhcpOptions {
  /** The list of DNS servers IP addresses. */
  dnsServers?: string[];
}

export function logicalNetworkPropertiesDhcpOptionsSerializer(
  item: LogicalNetworkPropertiesDhcpOptions,
): any {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
  };
}

export function logicalNetworkPropertiesDhcpOptionsDeserializer(
  item: any,
): LogicalNetworkPropertiesDhcpOptions {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
  };
}

/** The Azure Resource ID for a Managed Network Fabric L2ISD or L3ISD internal network */
export interface ManagedNetworkFabricArmReference {
  /** The Azure Resource ID for a Managed Network Fabric L2ISD or L3ISD internal network */
  resourceId?: string;
}

export function managedNetworkFabricArmReferenceSerializer(
  item: ManagedNetworkFabricArmReference,
): any {
  return { resourceId: item["resourceId"] };
}

export function managedNetworkFabricArmReferenceDeserializer(
  item: any,
): ManagedNetworkFabricArmReference {
  return {
    resourceId: item["resourceId"],
  };
}

export function subnetArraySerializer(result: Array<Subnet>): any[] {
  return result.map((item) => {
    return subnetSerializer(item);
  });
}

export function subnetArrayDeserializer(result: Array<Subnet>): any[] {
  return result.map((item) => {
    return subnetDeserializer(item);
  });
}

/** Properties of the subnet. */
export interface Subnet {
  /** Name - The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** The address prefix for the subnet: Cidr for this subnet - IPv4, IPv6. */
  addressPrefix?: string;
  /** List of address prefixes for the subnet. */
  addressPrefixes?: string[];
  /** IPAllocationMethod - The IP address allocation method. Possible values include: 'Static', 'Dynamic' */
  ipAllocationMethod?: IpAllocationMethodEnum;
  /** IPConfigurationReferences - list of IPConfigurationReferences */
  ipConfigurationReferences?: SubnetIpConfigurationReference[];
  /** NetworkSecurityGroup - Network Security Group attached to the logical network. */
  networkSecurityGroup?: NetworkSecurityGroupArmReference;
  /** Route table resource. */
  routeTable?: RouteTable;
  /** network associated pool of IP Addresses */
  ipPools?: IPPool[];
  /** Vlan to use for the subnet */
  vlan?: number;
  /** Provisioning state of the subnet resource. */
  readonly provisioningState?: ProvisioningStateEnum;
}

export function subnetSerializer(item: Subnet): any {
  return {
    properties: areAllPropsUndefined(item, [
      "addressPrefix",
      "addressPrefixes",
      "ipAllocationMethod",
      "ipConfigurationReferences",
      "networkSecurityGroup",
      "routeTable",
      "ipPools",
      "vlan",
    ])
      ? undefined
      : _subnetPropertiesSerializer(item),
    name: item["name"],
  };
}

export function subnetDeserializer(item: any): Subnet {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _subnetPropertiesDeserializer(item["properties"])),
    name: item["name"],
  };
}

/** Properties of the subnet. */
export interface SubnetProperties {
  /** The address prefix for the subnet: Cidr for this subnet - IPv4, IPv6. */
  addressPrefix?: string;
  /** List of address prefixes for the subnet. */
  addressPrefixes?: string[];
  /** IPAllocationMethod - The IP address allocation method. Possible values include: 'Static', 'Dynamic' */
  ipAllocationMethod?: IpAllocationMethodEnum;
  /** IPConfigurationReferences - list of IPConfigurationReferences */
  ipConfigurationReferences?: SubnetIpConfigurationReference[];
  /** NetworkSecurityGroup - Network Security Group attached to the logical network. */
  networkSecurityGroup?: NetworkSecurityGroupArmReference;
  /** Route table resource. */
  routeTable?: RouteTable;
  /** network associated pool of IP Addresses */
  ipPools?: IPPool[];
  /** Vlan to use for the subnet */
  vlan?: number;
  /** Provisioning state of the subnet resource. */
  readonly provisioningState?: ProvisioningStateEnum;
}

export function subnetPropertiesSerializer(item: SubnetProperties): any {
  return {
    addressPrefix: item["addressPrefix"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    ipAllocationMethod: item["ipAllocationMethod"],
    ipConfigurationReferences: !item["ipConfigurationReferences"]
      ? item["ipConfigurationReferences"]
      : subnetIpConfigurationReferenceArraySerializer(item["ipConfigurationReferences"]),
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupArmReferenceSerializer(item["networkSecurityGroup"]),
    routeTable: !item["routeTable"] ? item["routeTable"] : routeTableSerializer(item["routeTable"]),
    ipPools: !item["ipPools"] ? item["ipPools"] : ipPoolArraySerializer(item["ipPools"]),
    vlan: item["vlan"],
  };
}

export function subnetPropertiesDeserializer(item: any): SubnetProperties {
  return {
    addressPrefix: item["addressPrefix"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    ipAllocationMethod: item["ipAllocationMethod"],
    ipConfigurationReferences: !item["ipConfigurationReferences"]
      ? item["ipConfigurationReferences"]
      : subnetIpConfigurationReferenceArrayDeserializer(item["ipConfigurationReferences"]),
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupArmReferenceDeserializer(item["networkSecurityGroup"]),
    routeTable: !item["routeTable"]
      ? item["routeTable"]
      : routeTableDeserializer(item["routeTable"]),
    ipPools: !item["ipPools"] ? item["ipPools"] : ipPoolArrayDeserializer(item["ipPools"]),
    vlan: item["vlan"],
    provisioningState: item["provisioningState"],
  };
}

/** IPAllocationMethod - The IP address allocation method. Possible values include: 'Static', 'Dynamic' */
export enum KnownIpAllocationMethodEnum {
  /** Dynamic IP allocation method */
  Dynamic = "Dynamic",
  /** Static IP allocation method */
  Static = "Static",
}

/**
 * IPAllocationMethod - The IP address allocation method. Possible values include: 'Static', 'Dynamic' \
 * {@link KnownIpAllocationMethodEnum} can be used interchangeably with IpAllocationMethodEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Dynamic**: Dynamic IP allocation method \
 * **Static**: Static IP allocation method
 */
export type IpAllocationMethodEnum = string;

export function subnetIpConfigurationReferenceArraySerializer(
  result: Array<SubnetIpConfigurationReference>,
): any[] {
  return result.map((item) => {
    return subnetIpConfigurationReferenceSerializer(item);
  });
}

export function subnetIpConfigurationReferenceArrayDeserializer(
  result: Array<SubnetIpConfigurationReference>,
): any[] {
  return result.map((item) => {
    return subnetIpConfigurationReferenceDeserializer(item);
  });
}

/** The Azure Resource ID for a Network Interface. */
export interface SubnetIpConfigurationReference {
  /** The Azure Resource ID for a Network Interface. */
  id?: string;
}

export function subnetIpConfigurationReferenceSerializer(
  item: SubnetIpConfigurationReference,
): any {
  return { ID: item["id"] };
}

export function subnetIpConfigurationReferenceDeserializer(
  item: any,
): SubnetIpConfigurationReference {
  return {
    id: item["ID"],
  };
}

/** The Azure Resource ID for a Network Security Group. */
export interface NetworkSecurityGroupArmReference {
  /** The Azure Resource ID for a Network Security Group. */
  id?: string;
}

export function networkSecurityGroupArmReferenceSerializer(
  item: NetworkSecurityGroupArmReference,
): any {
  return { id: item["id"] };
}

export function networkSecurityGroupArmReferenceDeserializer(
  item: any,
): NetworkSecurityGroupArmReference {
  return {
    id: item["id"],
  };
}

/** Route table resource. */
export interface RouteTable {
  /** A unique read-only string that changes whenever the resource is updated. */
  readonly etag?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** Collection of routes contained within a route table. */
  routes?: Route[];
}

export function routeTableSerializer(item: RouteTable): any {
  return {
    properties: areAllPropsUndefined(item, ["routes"])
      ? undefined
      : _routeTablePropertiesSerializer(item),
  };
}

export function routeTableDeserializer(item: any): RouteTable {
  return {
    etag: item["etag"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _routeTablePropertiesDeserializer(item["properties"])),
  };
}

/** RouteTablePropertiesFormat - Route Table resource. */
export interface RouteTableProperties {
  /** Collection of routes contained within a route table. */
  routes?: Route[];
}

export function routeTablePropertiesSerializer(item: RouteTableProperties): any {
  return { routes: !item["routes"] ? item["routes"] : routeArraySerializer(item["routes"]) };
}

export function routeTablePropertiesDeserializer(item: any): RouteTableProperties {
  return {
    routes: !item["routes"] ? item["routes"] : routeArrayDeserializer(item["routes"]),
  };
}

export function routeArraySerializer(result: Array<Route>): any[] {
  return result.map((item) => {
    return routeSerializer(item);
  });
}

export function routeArrayDeserializer(result: Array<Route>): any[] {
  return result.map((item) => {
    return routeDeserializer(item);
  });
}

/** Route - Route resource. */
export interface Route {
  /** Name - name of the subnet */
  name?: string;
  /** The destination CIDR to which the route applies. */
  addressPrefix?: string;
  /** The IP address packets should be forwarded to. Next hop values are only allowed in routes where the next hop type is VirtualAppliance. */
  nextHopIpAddress?: string;
}

export function routeSerializer(item: Route): any {
  return {
    properties: areAllPropsUndefined(item, ["addressPrefix", "nextHopIpAddress"])
      ? undefined
      : _routePropertiesSerializer(item),
    name: item["name"],
  };
}

export function routeDeserializer(item: any): Route {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _routePropertiesDeserializer(item["properties"])),
    name: item["name"],
  };
}

/** RoutePropertiesFormat - Route resource. */
export interface RouteProperties {
  /** The destination CIDR to which the route applies. */
  addressPrefix?: string;
  /** The IP address packets should be forwarded to. Next hop values are only allowed in routes where the next hop type is VirtualAppliance. */
  nextHopIpAddress?: string;
}

export function routePropertiesSerializer(item: RouteProperties): any {
  return { addressPrefix: item["addressPrefix"], nextHopIpAddress: item["nextHopIpAddress"] };
}

export function routePropertiesDeserializer(item: any): RouteProperties {
  return {
    addressPrefix: item["addressPrefix"],
    nextHopIpAddress: item["nextHopIpAddress"],
  };
}

export function ipPoolArraySerializer(result: Array<IPPool>): any[] {
  return result.map((item) => {
    return ipPoolSerializer(item);
  });
}

export function ipPoolArrayDeserializer(result: Array<IPPool>): any[] {
  return result.map((item) => {
    return ipPoolDeserializer(item);
  });
}

/** Describes IPPool */
export interface IPPool {
  /** Name of the IP-Pool */
  name?: string;
  /** Type of the IP Pool [vm, vippool] */
  ipPoolType?: IPPoolTypeEnum;
  /** Start of the IP address pool */
  start?: string;
  /** End of the IP address pool */
  end?: string;
  /** IPPool info */
  info?: IPPoolInfo;
}

export function ipPoolSerializer(item: IPPool): any {
  return {
    name: item["name"],
    ipPoolType: item["ipPoolType"],
    start: item["start"],
    end: item["end"],
    info: !item["info"] ? item["info"] : ipPoolInfoSerializer(item["info"]),
  };
}

export function ipPoolDeserializer(item: any): IPPool {
  return {
    name: item["name"],
    ipPoolType: item["ipPoolType"],
    start: item["start"],
    end: item["end"],
    info: !item["info"] ? item["info"] : ipPoolInfoDeserializer(item["info"]),
  };
}

/** Type of the IP Pool [vm, vippool] */
export enum KnownIPPoolTypeEnum {
  /** Virtual Machine IP Pool */
  Vm = "vm",
  /** VIP Pool */
  Vippool = "vippool",
}

/**
 * Type of the IP Pool [vm, vippool] \
 * {@link KnownIPPoolTypeEnum} can be used interchangeably with IPPoolTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **vm**: Virtual Machine IP Pool \
 * **vippool**: VIP Pool
 */
export type IPPoolTypeEnum = string;

/** IP Pool info */
export interface IPPoolInfo {
  /** Number of IP addresses allocated from the IP Pool */
  readonly used?: string;
  /** Number of IP addresses available in the IP Pool */
  readonly available?: string;
}

export function ipPoolInfoSerializer(_item: IPPoolInfo): any {
  return {};
}

export function ipPoolInfoDeserializer(item: any): IPPoolInfo {
  return {
    used: item["used"],
    available: item["available"],
  };
}

/** The observed state of logical networks */
export interface LogicalNetworkStatus {
  /** LogicalNetwork provisioning error code */
  errorCode?: string;
  /** Descriptive error message */
  errorMessage?: string;
  /** Logical network provisioning status */
  provisioningStatus?: LogicalNetworkStatusProvisioningStatus;
  /** Enhanced fabric integration status with detailed health monitoring and connectivity state. */
  fabricIntegration?: FabricIntegrationStatus;
}

export function logicalNetworkStatusDeserializer(item: any): LogicalNetworkStatus {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : logicalNetworkStatusProvisioningStatusDeserializer(item["provisioningStatus"]),
    fabricIntegration: !item["fabricIntegration"]
      ? item["fabricIntegration"]
      : fabricIntegrationStatusDeserializer(item["fabricIntegration"]),
  };
}

/** Describes the status of the provisioning. */
export interface LogicalNetworkStatusProvisioningStatus {
  /** The ID of the operation performed on the logical network */
  operationId?: string;
  /** The status of the operation performed on the logical network [Succeeded, Failed, InProgress] */
  status?: Status;
}

export function logicalNetworkStatusProvisioningStatusDeserializer(
  item: any,
): LogicalNetworkStatusProvisioningStatus {
  return {
    operationId: item["operationId"],
    status: item["status"],
  };
}

/** Enhanced fabric integration status with detailed health monitoring and connectivity state. */
export interface FabricIntegrationStatus {
  /** Current fabric integration state. */
  readonly state?: FabricIntegrationStateEnum;
  /** Health status of the fabric connection. */
  readonly health?: FabricConnectionHealthEnum;
  /** Timestamp of the last fabric health check as ISO 8601 string */
  readonly lastChecked?: Date;
  /** Type of fabric resource referenced. */
  readonly resourceType?: FabricResourceTypeEnum;
  /** Issues raised by fabric */
  readonly issues?: FabricIssue[];
}

export function fabricIntegrationStatusDeserializer(item: any): FabricIntegrationStatus {
  return {
    state: item["state"],
    health: item["health"],
    lastChecked: !item["lastChecked"] ? item["lastChecked"] : new Date(item["lastChecked"]),
    resourceType: item["resourceType"],
    issues: !item["issues"] ? item["issues"] : fabricIssueArrayDeserializer(item["issues"]),
  };
}

/** Fabric integration state type */
export enum KnownFabricIntegrationStateEnum {
  /** Fabric integration state - connected type */
  Connected = "Connected",
  /** Fabric integration state - disconnected type */
  Disconnected = "Disconnected",
  /** Fabric integration state - misconfigured type */
  Misconfigured = "Misconfigured",
  /** Fabric integration state - notapplicable type */
  NotApplicable = "NotApplicable",
  /** Fabric integration state - connecting type */
  Connecting = "Connecting",
}

/**
 * Fabric integration state type \
 * {@link KnownFabricIntegrationStateEnum} can be used interchangeably with FabricIntegrationStateEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Connected**: Fabric integration state - connected type \
 * **Disconnected**: Fabric integration state - disconnected type \
 * **Misconfigured**: Fabric integration state - misconfigured type \
 * **NotApplicable**: Fabric integration state - notapplicable type \
 * **Connecting**: Fabric integration state - connecting type
 */
export type FabricIntegrationStateEnum = string;

/** Fabric connection health state type */
export enum KnownFabricConnectionHealthEnum {
  /** Fabric connection health state - healthy type */
  Healthy = "Healthy",
  /** Fabric connection health state - warning type */
  Warning = "Warning",
  /** Fabric connection health state - error type */
  Error = "Error",
  /** Fabric connection health state - unknown type */
  Unknown = "Unknown",
}

/**
 * Fabric connection health state type \
 * {@link KnownFabricConnectionHealthEnum} can be used interchangeably with FabricConnectionHealthEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy**: Fabric connection health state - healthy type \
 * **Warning**: Fabric connection health state - warning type \
 * **Error**: Fabric connection health state - error type \
 * **Unknown**: Fabric connection health state - unknown type
 */
export type FabricConnectionHealthEnum = string;

/** Fabric resource type */
export enum KnownFabricResourceTypeEnum {
  /** Fabric resource of L2IsolationDomain type */
  L2IsolationDomain = "L2IsolationDomain",
  /** Fabric resource of L3InternalNetwork type */
  L3InternalNetwork = "L3InternalNetwork",
}

/**
 * Fabric resource type \
 * {@link KnownFabricResourceTypeEnum} can be used interchangeably with FabricResourceTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **L2IsolationDomain**: Fabric resource of L2IsolationDomain type \
 * **L3InternalNetwork**: Fabric resource of L3InternalNetwork type
 */
export type FabricResourceTypeEnum = string;

export function fabricIssueArrayDeserializer(result: Array<FabricIssue>): any[] {
  return result.map((item) => {
    return fabricIssueDeserializer(item);
  });
}

/** Issues exposed by managed network fabric */
export interface FabricIssue {
  /** Specific error/warning code. */
  readonly code?: string;
  /** issue severity */
  readonly severity?: string;
  /** Description of the issue */
  readonly message?: string;
  /** specific property or resource that has the issue */
  readonly target?: string;
  /** Timestamp of the issue as ISO 8601 string */
  readonly timestamp?: Date;
}

export function fabricIssueDeserializer(item: any): FabricIssue {
  return {
    code: item["code"],
    severity: item["severity"],
    message: item["message"],
    target: item["target"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
  };
}

/** Type of Logical Network */
export enum KnownLogicalNetworkTypeEnum {
  /** Logical Network of type Workload */
  Workload = "Workload",
  /** Logical Network of type Infrastructure */
  Infrastructure = "Infrastructure",
}

/**
 * Type of Logical Network \
 * {@link KnownLogicalNetworkTypeEnum} can be used interchangeably with LogicalNetworkTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Workload**: Logical Network of type Workload \
 * **Infrastructure**: Logical Network of type Infrastructure
 */
export type LogicalNetworkTypeEnum = string;

/** The logical network resource patch definition. */
export interface LogicalNetworksUpdateRequest {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function logicalNetworksUpdateRequestSerializer(item: LogicalNetworksUpdateRequest): any {
  return { tags: item["tags"] };
}

/** The response of a LogicalNetwork list operation. */
export interface _LogicalNetworkListResult {
  /** The LogicalNetwork items on this page */
  value: LogicalNetwork[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _logicalNetworkListResultDeserializer(item: any): _LogicalNetworkListResult {
  return {
    value: logicalNetworkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function logicalNetworkArraySerializer(result: Array<LogicalNetwork>): any[] {
  return result.map((item) => {
    return logicalNetworkSerializer(item);
  });
}

export function logicalNetworkArrayDeserializer(result: Array<LogicalNetwork>): any[] {
  return result.map((item) => {
    return logicalNetworkDeserializer(item);
  });
}

/** The marketplace gallery image resource definition. */
export interface MarketplaceGalleryImage extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: MarketplaceGalleryImageProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function marketplaceGalleryImageSerializer(item: MarketplaceGalleryImage): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : marketplaceGalleryImagePropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function marketplaceGalleryImageDeserializer(item: any): MarketplaceGalleryImage {
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
      : marketplaceGalleryImagePropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Properties under the marketplace gallery image resource */
export interface MarketplaceGalleryImageProperties {
  /** Storage ContainerID of the storage container to be used for marketplace gallery image */
  containerId?: string;
  /** Operating system type that the gallery image uses [Windows, Linux] */
  osType: OperatingSystemTypes;
  /** Datasource for the gallery image when provisioning with cloud-init [NoCloud, Azure] */
  cloudInitDataSource?: CloudInitDataSource;
  /** The hypervisor generation of the Virtual Machine [V1, V2] */
  hyperVGeneration?: HyperVGeneration;
  /** This is the gallery image definition identifier. */
  identifier?: GalleryImageIdentifier;
  /** Specifies information about the gallery image version that you want to create or update. */
  version?: GalleryImageVersion;
  /** Provisioning state of the marketplace gallery image. */
  readonly provisioningState?: ProvisioningStateEnum;
  /** The observed state of marketplace gallery images */
  readonly status?: MarketplaceGalleryImageStatus;
}

export function marketplaceGalleryImagePropertiesSerializer(
  item: MarketplaceGalleryImageProperties,
): any {
  return {
    containerId: item["containerId"],
    osType: item["osType"],
    cloudInitDataSource: item["cloudInitDataSource"],
    hyperVGeneration: item["hyperVGeneration"],
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryImageIdentifierSerializer(item["identifier"]),
    version: !item["version"] ? item["version"] : galleryImageVersionSerializer(item["version"]),
  };
}

export function marketplaceGalleryImagePropertiesDeserializer(
  item: any,
): MarketplaceGalleryImageProperties {
  return {
    containerId: item["containerId"],
    osType: item["osType"],
    cloudInitDataSource: item["cloudInitDataSource"],
    hyperVGeneration: item["hyperVGeneration"],
    identifier: !item["identifier"]
      ? item["identifier"]
      : galleryImageIdentifierDeserializer(item["identifier"]),
    version: !item["version"] ? item["version"] : galleryImageVersionDeserializer(item["version"]),
    provisioningState: item["provisioningState"],
    status: !item["status"]
      ? item["status"]
      : marketplaceGalleryImageStatusDeserializer(item["status"]),
  };
}

/** The observed state of marketplace gallery images */
export interface MarketplaceGalleryImageStatus {
  /** MarketplaceGalleryImage provisioning error code */
  errorCode?: string;
  /** Descriptive error message */
  errorMessage?: string;
  /** Provisioning status of marketplace gallery image */
  provisioningStatus?: MarketplaceGalleryImageStatusProvisioningStatus;
  /** The download status of the gallery image */
  downloadStatus?: MarketplaceGalleryImageStatusDownloadStatus;
  /** The progress of the operation in percentage */
  progressPercentage?: number;
}

export function marketplaceGalleryImageStatusDeserializer(
  item: any,
): MarketplaceGalleryImageStatus {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : marketplaceGalleryImageStatusProvisioningStatusDeserializer(item["provisioningStatus"]),
    downloadStatus: !item["downloadStatus"]
      ? item["downloadStatus"]
      : marketplaceGalleryImageStatusDownloadStatusDeserializer(item["downloadStatus"]),
    progressPercentage: item["progressPercentage"],
  };
}

/** Marketplace GalleryImage provisioning status */
export interface MarketplaceGalleryImageStatusProvisioningStatus {
  /** The ID of the operation performed on the gallery image */
  operationId?: string;
  /** The status of the operation performed on the gallery image [Succeeded, Failed, InProgress] */
  status?: Status;
}

export function marketplaceGalleryImageStatusProvisioningStatusDeserializer(
  item: any,
): MarketplaceGalleryImageStatusProvisioningStatus {
  return {
    operationId: item["operationId"],
    status: item["status"],
  };
}

/** The download status of the gallery image */
export interface MarketplaceGalleryImageStatusDownloadStatus {
  /** The downloaded sized of the image in MB */
  downloadSizeInMB?: number;
}

export function marketplaceGalleryImageStatusDownloadStatusDeserializer(
  item: any,
): MarketplaceGalleryImageStatusDownloadStatus {
  return {
    downloadSizeInMB: item["downloadSizeInMB"],
  };
}

/** The type used for updating tags in MarketplaceGalleryImage resources. */
export interface MarketplaceGalleryImageTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function marketplaceGalleryImageTagsUpdateSerializer(
  item: MarketplaceGalleryImageTagsUpdate,
): any {
  return { tags: item["tags"] };
}

/** The response of a MarketplaceGalleryImage list operation. */
export interface _MarketplaceGalleryImageListResult {
  /** The MarketplaceGalleryImage items on this page */
  value: MarketplaceGalleryImage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _marketplaceGalleryImageListResultDeserializer(
  item: any,
): _MarketplaceGalleryImageListResult {
  return {
    value: marketplaceGalleryImageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function marketplaceGalleryImageArraySerializer(
  result: Array<MarketplaceGalleryImage>,
): any[] {
  return result.map((item) => {
    return marketplaceGalleryImageSerializer(item);
  });
}

export function marketplaceGalleryImageArrayDeserializer(
  result: Array<MarketplaceGalleryImage>,
): any[] {
  return result.map((item) => {
    return marketplaceGalleryImageDeserializer(item);
  });
}

/** The network interface resource definition. */
export interface NetworkInterface extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: NetworkInterfaceProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function networkInterfaceSerializer(item: NetworkInterface): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : networkInterfacePropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function networkInterfaceDeserializer(item: any): NetworkInterface {
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
      : networkInterfacePropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Properties under the network interface resource */
export interface NetworkInterfaceProperties {
  /** IPConfigurations - A list of IPConfigurations of the network interface. */
  ipConfigurations?: IPConfiguration[];
  /** MacAddress - The MAC address of the network interface. */
  macAddress?: string;
  /** DNS Settings for the interface */
  dnsSettings?: InterfaceDNSSettings;
  /** Boolean indicating whether this is a existing local network interface or if one should be created. */
  createFromLocal?: boolean;
  /** Provisioning state of the network interface. */
  readonly provisioningState?: ProvisioningStateEnum;
  /** The observed state of network interfaces */
  readonly status?: NetworkInterfaceStatus;
  /** NetworkSecurityGroup - Network Security Group attached to the network interface. */
  networkSecurityGroup?: NetworkSecurityGroupArmReference;
  /** This setting is applicable only when SDN is supported and enabled in the environment. Indicates whether SDN policies should be bypassed for this network interface. By default, SDN is enabled. Set this value to true only if you want to disable SDN for the network interface. */
  bypassSdnPolicies?: boolean;
}

export function networkInterfacePropertiesSerializer(item: NetworkInterfaceProperties): any {
  return {
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : ipConfigurationArraySerializer(item["ipConfigurations"]),
    macAddress: item["macAddress"],
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : interfaceDNSSettingsSerializer(item["dnsSettings"]),
    createFromLocal: item["createFromLocal"],
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupArmReferenceSerializer(item["networkSecurityGroup"]),
    bypassSdnPolicies: item["bypassSdnPolicies"],
  };
}

export function networkInterfacePropertiesDeserializer(item: any): NetworkInterfaceProperties {
  return {
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : ipConfigurationArrayDeserializer(item["ipConfigurations"]),
    macAddress: item["macAddress"],
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : interfaceDNSSettingsDeserializer(item["dnsSettings"]),
    createFromLocal: item["createFromLocal"],
    provisioningState: item["provisioningState"],
    status: !item["status"] ? item["status"] : networkInterfaceStatusDeserializer(item["status"]),
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupArmReferenceDeserializer(item["networkSecurityGroup"]),
    bypassSdnPolicies: item["bypassSdnPolicies"],
  };
}

export function ipConfigurationArraySerializer(result: Array<IPConfiguration>): any[] {
  return result.map((item) => {
    return ipConfigurationSerializer(item);
  });
}

export function ipConfigurationArrayDeserializer(result: Array<IPConfiguration>): any[] {
  return result.map((item) => {
    return ipConfigurationDeserializer(item);
  });
}

/** InterfaceIPConfiguration IPConfiguration in a network interface. */
export interface IPConfiguration {
  /** Name - The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** InterfaceIPConfigurationPropertiesFormat properties of IP configuration. */
  properties?: IPConfigurationProperties;
}

export function ipConfigurationSerializer(item: IPConfiguration): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : ipConfigurationPropertiesSerializer(item["properties"]),
  };
}

export function ipConfigurationDeserializer(item: any): IPConfiguration {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : ipConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** InterfaceIPConfigurationPropertiesFormat properties of IP configuration. */
export interface IPConfigurationProperties {
  /** Gateway for network interface */
  readonly gateway?: string;
  /** prefixLength for network interface */
  readonly prefixLength?: string;
  /** PrivateIPAddress - Private IP address of the IP configuration. */
  privateIPAddress?: string;
  /** Subnet - Name of Subnet bound to the IP configuration. */
  subnet?: LogicalNetworkArmReference;
}

export function ipConfigurationPropertiesSerializer(item: IPConfigurationProperties): any {
  return {
    privateIPAddress: item["privateIPAddress"],
    subnet: !item["subnet"] ? item["subnet"] : logicalNetworkArmReferenceSerializer(item["subnet"]),
  };
}

export function ipConfigurationPropertiesDeserializer(item: any): IPConfigurationProperties {
  return {
    gateway: item["gateway"],
    prefixLength: item["prefixLength"],
    privateIPAddress: item["privateIPAddress"],
    subnet: !item["subnet"]
      ? item["subnet"]
      : logicalNetworkArmReferenceDeserializer(item["subnet"]),
  };
}

/** The Azure Resource ID for a Logical Network. */
export interface LogicalNetworkArmReference {
  /** The Azure Resource ID for a Logical Network. */
  id?: string;
}

export function logicalNetworkArmReferenceSerializer(item: LogicalNetworkArmReference): any {
  return { id: item["id"] };
}

export function logicalNetworkArmReferenceDeserializer(item: any): LogicalNetworkArmReference {
  return {
    id: item["id"],
  };
}

/** DNS Settings of the interface */
export interface InterfaceDNSSettings {
  /** List of DNS server IP Addresses for the interface */
  dnsServers?: string[];
}

export function interfaceDNSSettingsSerializer(item: InterfaceDNSSettings): any {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
  };
}

export function interfaceDNSSettingsDeserializer(item: any): InterfaceDNSSettings {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
  };
}

/** The observed state of network interfaces */
export interface NetworkInterfaceStatus {
  /** NetworkInterface provisioning error code */
  errorCode?: string;
  /** Descriptive error message */
  errorMessage?: string;
  /** Network interface provisioning status */
  provisioningStatus?: NetworkInterfaceStatusProvisioningStatus;
}

export function networkInterfaceStatusDeserializer(item: any): NetworkInterfaceStatus {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : networkInterfaceStatusProvisioningStatusDeserializer(item["provisioningStatus"]),
  };
}

/** Network interface provisioning status */
export interface NetworkInterfaceStatusProvisioningStatus {
  /** The ID of the operation performed on the network interface */
  operationId?: string;
  /** The status of the operation performed on the network interface [Succeeded, Failed, InProgress] */
  status?: Status;
}

export function networkInterfaceStatusProvisioningStatusDeserializer(
  item: any,
): NetworkInterfaceStatusProvisioningStatus {
  return {
    operationId: item["operationId"],
    status: item["status"],
  };
}

/** The network interface resource patch definition. */
export interface NetworkInterfacesUpdateRequest {
  /** Resource tags */
  tags?: Record<string, string>;
  /** Defines the resource properties for the update. */
  properties?: NetworkInterfacesUpdateProperties;
}

export function networkInterfacesUpdateRequestSerializer(
  item: NetworkInterfacesUpdateRequest,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : networkInterfacesUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Defines the resource properties for the update. */
export interface NetworkInterfacesUpdateProperties {
  /** NetworkSecurityGroup - Network Security Group attached to the network interface. */
  networkSecurityGroup?: NetworkSecurityGroupArmReference;
  /** DNS Settings for the interface */
  dnsSettings?: InterfaceDNSSettings;
  /** This setting is applicable only when SDN is supported and enabled in the environment. Indicates whether SDN policies should be bypassed for this network interface. By default, SDN is enabled. Set this value to true only if you want to disable SDN for the network interface. */
  bypassSdnPolicies?: boolean;
}

export function networkInterfacesUpdatePropertiesSerializer(
  item: NetworkInterfacesUpdateProperties,
): any {
  return {
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupArmReferenceSerializer(item["networkSecurityGroup"]),
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : interfaceDNSSettingsSerializer(item["dnsSettings"]),
    bypassSdnPolicies: item["bypassSdnPolicies"],
  };
}

/** The response of a NetworkInterface list operation. */
export interface _NetworkInterfaceListResult {
  /** The NetworkInterface items on this page */
  value: NetworkInterface[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkInterfaceListResultDeserializer(item: any): _NetworkInterfaceListResult {
  return {
    value: networkInterfaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkInterfaceArraySerializer(result: Array<NetworkInterface>): any[] {
  return result.map((item) => {
    return networkInterfaceSerializer(item);
  });
}

export function networkInterfaceArrayDeserializer(result: Array<NetworkInterface>): any[] {
  return result.map((item) => {
    return networkInterfaceDeserializer(item);
  });
}

/** NetworkSecurityGroup resource. */
export interface NetworkSecurityGroup extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: NetworkSecurityGroupProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function networkSecurityGroupSerializer(item: NetworkSecurityGroup): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : networkSecurityGroupPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function networkSecurityGroupDeserializer(item: any): NetworkSecurityGroup {
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
      : networkSecurityGroupPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    eTag: item["eTag"],
  };
}

/** Network Security Group resource. */
export interface NetworkSecurityGroupProperties {
  /** A collection of references to network interfaces that are currently using this NSG. */
  readonly networkInterfaces?: NetworkInterfaceArmReference[];
  /** A collection of references to logical networks that are currently using this NSG */
  readonly subnets?: LogicalNetworkArmReference[];
  /** The provisioning state of the network security group resource. */
  readonly provisioningState?: ProvisioningStateEnum;
  /** The observed state of Network Security Group */
  readonly status?: NetworkSecurityGroupStatus;
}

export function networkSecurityGroupPropertiesSerializer(
  _item: NetworkSecurityGroupProperties,
): any {
  return {};
}

export function networkSecurityGroupPropertiesDeserializer(
  item: any,
): NetworkSecurityGroupProperties {
  return {
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArmReferenceArrayDeserializer(item["networkInterfaces"]),
    subnets: !item["subnets"]
      ? item["subnets"]
      : logicalNetworkArmReferenceArrayDeserializer(item["subnets"]),
    provisioningState: item["provisioningState"],
    status: !item["status"]
      ? item["status"]
      : networkSecurityGroupStatusDeserializer(item["status"]),
  };
}

export function networkInterfaceArmReferenceArraySerializer(
  result: Array<NetworkInterfaceArmReference>,
): any[] {
  return result.map((item) => {
    return networkInterfaceArmReferenceSerializer(item);
  });
}

export function networkInterfaceArmReferenceArrayDeserializer(
  result: Array<NetworkInterfaceArmReference>,
): any[] {
  return result.map((item) => {
    return networkInterfaceArmReferenceDeserializer(item);
  });
}

/** The Azure Resource ID for a Network Interface. */
export interface NetworkInterfaceArmReference {
  /** The Azure Resource ID for a Network Interface. */
  id?: string;
}

export function networkInterfaceArmReferenceSerializer(item: NetworkInterfaceArmReference): any {
  return { id: item["id"] };
}

export function networkInterfaceArmReferenceDeserializer(item: any): NetworkInterfaceArmReference {
  return {
    id: item["id"],
  };
}

export function logicalNetworkArmReferenceArraySerializer(
  result: Array<LogicalNetworkArmReference>,
): any[] {
  return result.map((item) => {
    return logicalNetworkArmReferenceSerializer(item);
  });
}

export function logicalNetworkArmReferenceArrayDeserializer(
  result: Array<LogicalNetworkArmReference>,
): any[] {
  return result.map((item) => {
    return logicalNetworkArmReferenceDeserializer(item);
  });
}

/** The observed state of network security group */
export interface NetworkSecurityGroupStatus {
  /** NetworkSecurityGroup provisioning error code */
  errorCode?: string;
  /** Descriptive error message */
  errorMessage?: string;
  /** network security group provisioning status */
  provisioningStatus?: NetworkSecurityGroupStatusProvisioningStatus;
}

export function networkSecurityGroupStatusDeserializer(item: any): NetworkSecurityGroupStatus {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : networkSecurityGroupStatusProvisioningStatusDeserializer(item["provisioningStatus"]),
  };
}

/** network security group provisioning status */
export interface NetworkSecurityGroupStatusProvisioningStatus {
  /** The ID of the operation performed on the network security group */
  operationId?: string;
  /** The status of the operation performed on the network security group [Succeeded, Failed, InProgress] */
  status?: Status;
}

export function networkSecurityGroupStatusProvisioningStatusDeserializer(
  item: any,
): NetworkSecurityGroupStatusProvisioningStatus {
  return {
    operationId: item["operationId"],
    status: item["status"],
  };
}

/** The type used for updating tags in NetworkSecurityGroup resources. */
export interface NetworkSecurityGroupTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function networkSecurityGroupTagsUpdateSerializer(
  item: NetworkSecurityGroupTagsUpdate,
): any {
  return { tags: item["tags"] };
}

/** The response of a NetworkSecurityGroup list operation. */
export interface _NetworkSecurityGroupListResult {
  /** The NetworkSecurityGroup items on this page */
  value: NetworkSecurityGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkSecurityGroupListResultDeserializer(
  item: any,
): _NetworkSecurityGroupListResult {
  return {
    value: networkSecurityGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkSecurityGroupArraySerializer(result: Array<NetworkSecurityGroup>): any[] {
  return result.map((item) => {
    return networkSecurityGroupSerializer(item);
  });
}

export function networkSecurityGroupArrayDeserializer(result: Array<NetworkSecurityGroup>): any[] {
  return result.map((item) => {
    return networkSecurityGroupDeserializer(item);
  });
}

/** Security Rule resource. */
export interface SecurityRule extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SecurityRuleProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function securityRuleSerializer(item: SecurityRule): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : securityRulePropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function securityRuleDeserializer(item: any): SecurityRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : securityRulePropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Security rule resource. */
export interface SecurityRuleProperties {
  /** A description for this rule. Restricted to 140 chars. */
  description?: string;
  /** Network protocol this rule applies to. */
  protocol: SecurityRuleProtocol;
  /** The CIDR or source IP ranges. */
  sourceAddressPrefixes?: string[];
  /** The destination address prefixes. CIDR or destination IP ranges. */
  destinationAddressPrefixes?: string[];
  /** The source port ranges. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports. */
  sourcePortRanges?: string[];
  /** The destination port ranges. Integer or range between 0 and 65535. Asterisk '*' can also be used to match all ports. */
  destinationPortRanges?: string[];
  /** The network traffic is allowed or denied. */
  access: SecurityRuleAccess;
  /** The priority of the rule. The value can be between 100 and 4096. The priority number must be unique for each rule in the collection. The lower the priority number, the higher the priority of the rule. */
  priority: number;
  /** The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic. */
  direction: SecurityRuleDirection;
  /** Provisioning state of the SR */
  readonly provisioningState?: ProvisioningStateEnum;
}

export function securityRulePropertiesSerializer(item: SecurityRuleProperties): any {
  return {
    description: item["description"],
    protocol: item["protocol"],
    sourceAddressPrefixes: !item["sourceAddressPrefixes"]
      ? item["sourceAddressPrefixes"]
      : item["sourceAddressPrefixes"].map((p: any) => {
          return p;
        }),
    destinationAddressPrefixes: !item["destinationAddressPrefixes"]
      ? item["destinationAddressPrefixes"]
      : item["destinationAddressPrefixes"].map((p: any) => {
          return p;
        }),
    sourcePortRanges: !item["sourcePortRanges"]
      ? item["sourcePortRanges"]
      : item["sourcePortRanges"].map((p: any) => {
          return p;
        }),
    destinationPortRanges: !item["destinationPortRanges"]
      ? item["destinationPortRanges"]
      : item["destinationPortRanges"].map((p: any) => {
          return p;
        }),
    access: item["access"],
    priority: item["priority"],
    direction: item["direction"],
  };
}

export function securityRulePropertiesDeserializer(item: any): SecurityRuleProperties {
  return {
    description: item["description"],
    protocol: item["protocol"],
    sourceAddressPrefixes: !item["sourceAddressPrefixes"]
      ? item["sourceAddressPrefixes"]
      : item["sourceAddressPrefixes"].map((p: any) => {
          return p;
        }),
    destinationAddressPrefixes: !item["destinationAddressPrefixes"]
      ? item["destinationAddressPrefixes"]
      : item["destinationAddressPrefixes"].map((p: any) => {
          return p;
        }),
    sourcePortRanges: !item["sourcePortRanges"]
      ? item["sourcePortRanges"]
      : item["sourcePortRanges"].map((p: any) => {
          return p;
        }),
    destinationPortRanges: !item["destinationPortRanges"]
      ? item["destinationPortRanges"]
      : item["destinationPortRanges"].map((p: any) => {
          return p;
        }),
    access: item["access"],
    priority: item["priority"],
    direction: item["direction"],
    provisioningState: item["provisioningState"],
  };
}

/** Network protocol this rule applies to. */
export enum KnownSecurityRuleProtocol {
  /** Transmission Control Protocol */
  Tcp = "Tcp",
  /** User Datagram Protocol */
  Udp = "Udp",
  /** Internet Control Message Protocol */
  Icmp = "Icmp",
  /** Wildcard rule for all protocols */
  Asterisk = "*",
}

/**
 * Network protocol this rule applies to. \
 * {@link KnownSecurityRuleProtocol} can be used interchangeably with SecurityRuleProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Tcp**: Transmission Control Protocol \
 * **Udp**: User Datagram Protocol \
 * **Icmp**: Internet Control Message Protocol \
 * *****: Wildcard rule for all protocols
 */
export type SecurityRuleProtocol = string;

/** Whether network traffic is allowed or denied. */
export enum KnownSecurityRuleAccess {
  /** Network traffic is allowed */
  Allow = "Allow",
  /** Network traffic is denied */
  Deny = "Deny",
}

/**
 * Whether network traffic is allowed or denied. \
 * {@link KnownSecurityRuleAccess} can be used interchangeably with SecurityRuleAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**: Network traffic is allowed \
 * **Deny**: Network traffic is denied
 */
export type SecurityRuleAccess = string;

/** The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic. */
export enum KnownSecurityRuleDirection {
  /** Rule is evaluated on incoming traffic */
  Inbound = "Inbound",
  /** Rule is evaluated on outgoing traffic */
  Outbound = "Outbound",
}

/**
 * The direction of the rule. The direction specifies if rule will be evaluated on incoming or outgoing traffic. \
 * {@link KnownSecurityRuleDirection} can be used interchangeably with SecurityRuleDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inbound**: Rule is evaluated on incoming traffic \
 * **Outbound**: Rule is evaluated on outgoing traffic
 */
export type SecurityRuleDirection = string;

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

/** The response of a SecurityRule list operation. */
export interface _SecurityRuleListResult {
  /** The SecurityRule items on this page */
  value: SecurityRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _securityRuleListResultDeserializer(item: any): _SecurityRuleListResult {
  return {
    value: securityRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securityRuleArraySerializer(result: Array<SecurityRule>): any[] {
  return result.map((item) => {
    return securityRuleSerializer(item);
  });
}

export function securityRuleArrayDeserializer(result: Array<SecurityRule>): any[] {
  return result.map((item) => {
    return securityRuleDeserializer(item);
  });
}

/** The snapshot resource definition. */
export interface Snapshot extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SnapshotProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function snapshotSerializer(item: Snapshot): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : snapshotPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function snapshotDeserializer(item: any): Snapshot {
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
      : snapshotPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Properties under the snapshot resource */
export interface SnapshotProperties {
  /** Data used when creating a snapshot */
  creationData?: CreationData;
  /** The time when the snapshot was created. */
  readonly timeCreated?: Date;
  /** The size of the disk in bytes. */
  readonly diskSizeBytes?: number;
  /** Unique identifier for the snapshot. */
  readonly uniqueId?: string;
  /** Provisioning state of the snapshot. */
  readonly provisioningState?: ProvisioningStateEnum;
  /** The observed state of snapshots */
  readonly status?: SnapshotStatus;
}

export function snapshotPropertiesSerializer(item: SnapshotProperties): any {
  return {
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataSerializer(item["creationData"]),
  };
}

export function snapshotPropertiesDeserializer(item: any): SnapshotProperties {
  return {
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataDeserializer(item["creationData"]),
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    diskSizeBytes: item["diskSizeBytes"],
    uniqueId: item["uniqueId"],
    provisioningState: item["provisioningState"],
    status: !item["status"] ? item["status"] : snapshotStatusDeserializer(item["status"]),
  };
}

/** Data used when creating a disk or snapshot */
export interface CreationData {
  /** This enumerates the possible sources of a disk's creation */
  createOption: DiskCreateOption;
  /** ARM ID of the source resource used for disk creation. Required when createOption is Copy */
  sourceResourceId?: string;
  /** Unique ID of the source resource used for disk creation. Read-only and not required for disk creation. */
  readonly sourceUniqueId?: string;
}

export function creationDataSerializer(item: CreationData): any {
  return { createOption: item["createOption"], sourceResourceId: item["sourceResourceId"] };
}

export function creationDataDeserializer(item: any): CreationData {
  return {
    createOption: item["createOption"],
    sourceResourceId: item["sourceResourceId"],
    sourceUniqueId: item["sourceUniqueId"],
  };
}

/** Disk creation option values [Copy, Empty] */
export enum KnownDiskCreateOption {
  /** Create a disk by copying from a source resource */
  Copy = "Copy",
  /** Create an empty disk */
  Empty = "Empty",
}

/**
 * Disk creation option values [Copy, Empty] \
 * {@link KnownDiskCreateOption} can be used interchangeably with DiskCreateOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Copy**: Create a disk by copying from a source resource \
 * **Empty**: Create an empty disk
 */
export type DiskCreateOption = string;

/** The observed state of snapshots */
export interface SnapshotStatus {
  /** Snapshot provisioning error code */
  errorCode?: string;
  /** Descriptive error message */
  errorMessage?: string;
  /** Provisioning status of the snapshot */
  provisioningStatus?: SnapshotStatusProvisioningStatus;
}

export function snapshotStatusDeserializer(item: any): SnapshotStatus {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : snapshotStatusProvisioningStatusDeserializer(item["provisioningStatus"]),
  };
}

/** Snapshot Status provisioning status */
export interface SnapshotStatusProvisioningStatus {
  /** The ID of the operation performed on the snapshot */
  operationId?: string;
  /** The status of the operation performed on the snapshot [Succeeded, Failed, InProgress] */
  status?: Status;
}

export function snapshotStatusProvisioningStatusDeserializer(
  item: any,
): SnapshotStatusProvisioningStatus {
  return {
    operationId: item["operationId"],
    status: item["status"],
  };
}

/** The type used for updating tags in Snapshot resources. */
export interface SnapshotTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function snapshotTagsUpdateSerializer(item: SnapshotTagsUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a Snapshot list operation. */
export interface _SnapshotListResult {
  /** The Snapshot items on this page */
  value: Snapshot[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _snapshotListResultDeserializer(item: any): _SnapshotListResult {
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

/** The storage container resource definition. */
export interface StorageContainer extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: StorageContainerProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function storageContainerSerializer(item: StorageContainer): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : storageContainerPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function storageContainerDeserializer(item: any): StorageContainer {
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
      : storageContainerPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Properties under the storage container resource */
export interface StorageContainerProperties {
  /** Path of the storage container on the disk */
  path: string;
  /** Provisioning state of the storage container. */
  readonly provisioningState?: ProvisioningStateEnum;
  /** The observed state of storage containers */
  readonly status?: StorageContainerStatus;
}

export function storageContainerPropertiesSerializer(item: StorageContainerProperties): any {
  return { path: item["path"] };
}

export function storageContainerPropertiesDeserializer(item: any): StorageContainerProperties {
  return {
    path: item["path"],
    provisioningState: item["provisioningState"],
    status: !item["status"] ? item["status"] : storageContainerStatusDeserializer(item["status"]),
  };
}

/** The observed state of storage containers */
export interface StorageContainerStatus {
  /** StorageContainer provisioning error code */
  errorCode?: string;
  /** Descriptive error message */
  errorMessage?: string;
  /** Amount of space available on the disk in MB */
  availableSizeMB?: number;
  /** Total size of the disk in MB */
  containerSizeMB?: number;
  /** Storage container's provisioning status */
  provisioningStatus?: StorageContainerStatusProvisioningStatus;
}

export function storageContainerStatusDeserializer(item: any): StorageContainerStatus {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    availableSizeMB: item["availableSizeMB"],
    containerSizeMB: item["containerSizeMB"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : storageContainerStatusProvisioningStatusDeserializer(item["provisioningStatus"]),
  };
}

/** Storage container provisioning status */
export interface StorageContainerStatusProvisioningStatus {
  /** The ID of the operation performed on the storage container */
  operationId?: string;
  /** The status of the operation performed on the storage container [Succeeded, Failed, InProgress] */
  status?: Status;
}

export function storageContainerStatusProvisioningStatusDeserializer(
  item: any,
): StorageContainerStatusProvisioningStatus {
  return {
    operationId: item["operationId"],
    status: item["status"],
  };
}

/** The type used for updating tags in StorageContainer resources. */
export interface StorageContainerTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function storageContainerTagsUpdateSerializer(item: StorageContainerTagsUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a StorageContainer list operation. */
export interface _StorageContainerListResult {
  /** The StorageContainer items on this page */
  value: StorageContainer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storageContainerListResultDeserializer(item: any): _StorageContainerListResult {
  return {
    value: storageContainerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageContainerArraySerializer(result: Array<StorageContainer>): any[] {
  return result.map((item) => {
    return storageContainerSerializer(item);
  });
}

export function storageContainerArrayDeserializer(result: Array<StorageContainer>): any[] {
  return result.map((item) => {
    return storageContainerDeserializer(item);
  });
}

/** The virtual hard disk resource definition. */
export interface VirtualHardDisk extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: VirtualHardDiskProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function virtualHardDiskSerializer(item: VirtualHardDisk): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualHardDiskPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function virtualHardDiskDeserializer(item: any): VirtualHardDisk {
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
      : virtualHardDiskPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Properties under the virtual hard disk resource */
export interface VirtualHardDiskProperties {
  /** Block size in bytes */
  blockSizeBytes?: number;
  /** Data used when creating a virtual hard disk */
  creationData?: CreationData;
  /** Size of the disk in GB */
  diskSizeGB?: number;
  /** Boolean for enabling dynamic sizing on the virtual hard disk */
  dynamic?: boolean;
  /** Logical sector in bytes */
  logicalSectorBytes?: number;
  /** Physical sector in bytes */
  physicalSectorBytes?: number;
  /** URL for downloading or accessing the virtual hard disk. This URL points to a secure link from where the VHD can be downloaded or accessed directly. */
  downloadUrl?: string;
  /** The hypervisor generation of the Virtual Machine [V1, V2] */
  hyperVGeneration?: HyperVGeneration;
  /** The format of the actual VHD file [vhd, vhdx] */
  diskFileFormat?: DiskFileFormat;
  /** Boolean indicating whether it is an existing local hard disk or if one should be created. */
  createFromLocal?: boolean;
  /** Absolute path of the VHD. This is only applicable when createFromLocal is true. */
  localVhdPath?: string;
  /** Provisioning state of the virtual hard disk. */
  readonly provisioningState?: ProvisioningStateEnum;
  /** Storage ContainerID of the storage container to be used for VHD */
  containerId?: string;
  /** The observed state of virtual hard disks */
  readonly status?: VirtualHardDiskStatus;
  /** The maximum number of VMs that can attach to the disk at the same time. Value greater than one indicates a disk that can be mounted on multiple VMs at the same time. */
  maxShares?: number;
}

export function virtualHardDiskPropertiesSerializer(item: VirtualHardDiskProperties): any {
  return {
    blockSizeBytes: item["blockSizeBytes"],
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataSerializer(item["creationData"]),
    diskSizeGB: item["diskSizeGB"],
    dynamic: item["dynamic"],
    logicalSectorBytes: item["logicalSectorBytes"],
    physicalSectorBytes: item["physicalSectorBytes"],
    downloadUrl: item["downloadUrl"],
    hyperVGeneration: item["hyperVGeneration"],
    diskFileFormat: item["diskFileFormat"],
    createFromLocal: item["createFromLocal"],
    localVhdPath: item["localVhdPath"],
    containerId: item["containerId"],
    maxShares: item["maxShares"],
  };
}

export function virtualHardDiskPropertiesDeserializer(item: any): VirtualHardDiskProperties {
  return {
    blockSizeBytes: item["blockSizeBytes"],
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataDeserializer(item["creationData"]),
    diskSizeGB: item["diskSizeGB"],
    dynamic: item["dynamic"],
    logicalSectorBytes: item["logicalSectorBytes"],
    physicalSectorBytes: item["physicalSectorBytes"],
    downloadUrl: item["downloadUrl"],
    hyperVGeneration: item["hyperVGeneration"],
    diskFileFormat: item["diskFileFormat"],
    createFromLocal: item["createFromLocal"],
    localVhdPath: item["localVhdPath"],
    provisioningState: item["provisioningState"],
    containerId: item["containerId"],
    status: !item["status"] ? item["status"] : virtualHardDiskStatusDeserializer(item["status"]),
    maxShares: item["maxShares"],
  };
}

/** The format of the actual VHD file [vhd, vhdx] */
export enum KnownDiskFileFormat {
  /** VHDX file format */
  Vhdx = "vhdx",
  /** VHD file format */
  Vhd = "vhd",
}

/**
 * The format of the actual VHD file [vhd, vhdx] \
 * {@link KnownDiskFileFormat} can be used interchangeably with DiskFileFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **vhdx**: VHDX file format \
 * **vhd**: VHD file format
 */
export type DiskFileFormat = string;

/** The observed state of virtual hard disks */
export interface VirtualHardDiskStatus {
  /** VirtualHardDisk provisioning error code */
  errorCode?: string;
  /** Descriptive error message */
  errorMessage?: string;
  /** Provisioning status of the vhd */
  provisioningStatus?: VirtualHardDiskStatusProvisioningStatus;
  /** The download status of the virtual hard disk */
  downloadStatus?: VirtualHardDiskDownloadStatus;
  /** The upload status of the virtual hard disk */
  uploadStatus?: VirtualHardDiskUploadStatus;
  /** Azure Resource IDs of the VMs that are consuming the VHD. */
  managedBy?: string[];
  /** Unique Guid identifying the resource. */
  uniqueId?: string;
}

export function virtualHardDiskStatusDeserializer(item: any): VirtualHardDiskStatus {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : virtualHardDiskStatusProvisioningStatusDeserializer(item["provisioningStatus"]),
    downloadStatus: !item["downloadStatus"]
      ? item["downloadStatus"]
      : virtualHardDiskDownloadStatusDeserializer(item["downloadStatus"]),
    uploadStatus: !item["uploadStatus"]
      ? item["uploadStatus"]
      : virtualHardDiskUploadStatusDeserializer(item["uploadStatus"]),
    managedBy: !item["managedBy"]
      ? item["managedBy"]
      : item["managedBy"].map((p: any) => {
          return p;
        }),
    uniqueId: item["uniqueId"],
  };
}

/** VHD Status provisioning status */
export interface VirtualHardDiskStatusProvisioningStatus {
  /** The ID of the operation performed on the virtual hard disk */
  operationId?: string;
  /** The status of the operation performed on the virtual hard disk [Succeeded, Failed, InProgress] */
  status?: Status;
}

export function virtualHardDiskStatusProvisioningStatusDeserializer(
  item: any,
): VirtualHardDiskStatusProvisioningStatus {
  return {
    operationId: item["operationId"],
    status: item["status"],
  };
}

/** The download status of the virtual hard disk */
export interface VirtualHardDiskDownloadStatus {
  /** The downloaded sized of the virtual hard disk in MB */
  downloadedSizeInMB?: number;
  /** The status of Uploading virtual hard disk [Succeeded, Failed, InProgress] */
  status?: Status;
  /** The progress of the operation in percentage */
  progressPercentage?: number;
}

export function virtualHardDiskDownloadStatusDeserializer(
  item: any,
): VirtualHardDiskDownloadStatus {
  return {
    downloadedSizeInMB: item["downloadedSizeInMB"],
    status: item["status"],
    progressPercentage: item["progressPercentage"],
  };
}

/** The upload status of the virtual hard disk */
export interface VirtualHardDiskUploadStatus {
  /** The uploaded sized of the virtual hard disk in MB */
  uploadedSizeInMB?: number;
  /** The status of Uploading virtual hard disk [Succeeded, Failed, InProgress] */
  status?: Status;
  /** The progress of the operation in percentage */
  progressPercentage?: number;
  /** VirtualHardDisk upload error code */
  errorCode?: string;
  /** Descriptive upload error message */
  errorMessage?: string;
}

export function virtualHardDiskUploadStatusDeserializer(item: any): VirtualHardDiskUploadStatus {
  return {
    uploadedSizeInMB: item["uploadedSizeInMB"],
    status: item["status"],
    progressPercentage: item["progressPercentage"],
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
  };
}

/** The virtual hard disk resource patch definition. */
export interface VirtualHardDisksUpdateRequest {
  /** Resource tags */
  tags?: Record<string, string>;
  /** Defines the resource properties for the update. */
  properties?: VirtualHardDisksUpdateProperties;
}

export function virtualHardDisksUpdateRequestSerializer(item: VirtualHardDisksUpdateRequest): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualHardDisksUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Defines the resource properties for the update. */
export interface VirtualHardDisksUpdateProperties {
  /** Size of the disk in GB */
  diskSizeGB?: number;
}

export function virtualHardDisksUpdatePropertiesSerializer(
  item: VirtualHardDisksUpdateProperties,
): any {
  return { diskSizeGB: item["diskSizeGB"] };
}

/** The response of a VirtualHardDisk list operation. */
export interface _VirtualHardDiskListResult {
  /** The VirtualHardDisk items on this page */
  value: VirtualHardDisk[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualHardDiskListResultDeserializer(item: any): _VirtualHardDiskListResult {
  return {
    value: virtualHardDiskArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualHardDiskArraySerializer(result: Array<VirtualHardDisk>): any[] {
  return result.map((item) => {
    return virtualHardDiskSerializer(item);
  });
}

export function virtualHardDiskArrayDeserializer(result: Array<VirtualHardDisk>): any[] {
  return result.map((item) => {
    return virtualHardDiskDeserializer(item);
  });
}

/** Request for uploading virtual hard disk. */
export interface VirtualHardDiskUploadRequest {
  /** The Azure managed disk SAS URL to upload the virtual hard disk to. */
  azureManagedDiskUploadUrl: string;
}

export function virtualHardDiskUploadRequestSerializer(item: VirtualHardDiskUploadRequest): any {
  return { azureManagedDiskUploadUrl: item["azureManagedDiskUploadUrl"] };
}

/** Response for uploading virtual hard disk. */
export interface VirtualHardDiskUploadResponse {
  /** The Azure Resource ID for a Virtual Hard Disk. */
  virtualHardDiskId?: string;
  /** The upload status of the virtual hard disk */
  uploadStatus?: VirtualHardDiskUploadStatus;
}

export function virtualHardDiskUploadResponseDeserializer(
  item: any,
): VirtualHardDiskUploadResponse {
  return {
    virtualHardDiskId: item["virtualHardDiskId"],
    uploadStatus: !item["uploadStatus"]
      ? item["uploadStatus"]
      : virtualHardDiskUploadStatusDeserializer(item["uploadStatus"]),
  };
}

/** The virtual machine instance resource definition. */
export interface VirtualMachineInstance extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: VirtualMachineInstanceProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function virtualMachineInstanceSerializer(item: VirtualMachineInstance): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineInstancePropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function virtualMachineInstanceDeserializer(item: any): VirtualMachineInstance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineInstancePropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties under the virtual machine instance resource */
export interface VirtualMachineInstanceProperties {
  /** HardwareProfile - Specifies the hardware settings for the virtual machine instance. */
  hardwareProfile?: VirtualMachineInstancePropertiesHardwareProfile;
  /** PlacementProfile - Specifies the placement related settings for the virtual machine. */
  placementProfile?: VirtualMachineInstancePropertiesPlacementProfile;
  /** NetworkProfile - describes the network configuration the virtual machine instance */
  networkProfile?: VirtualMachineInstancePropertiesNetworkProfile;
  /** OsProfile - describes the configuration of the operating system and sets login data */
  osProfile?: VirtualMachineInstancePropertiesOsProfile;
  /** SecurityProfile - Specifies the security settings for the virtual machine instance. */
  securityProfile?: VirtualMachineInstancePropertiesSecurityProfile;
  /** StorageProfile - contains information about the disks and storage information for the virtual machine instance */
  storageProfile?: VirtualMachineInstancePropertiesStorageProfile;
  /** HTTP Proxy configuration for the VM. */
  httpProxyConfig?: HttpProxyConfiguration;
  /** Boolean indicating whether this is an existing local virtual machine or if one should be created. */
  createFromLocal?: boolean;
  /** HyperV name of the VM. This is only applicable when createFromLocal is true. */
  localVmName?: string;
  /** Provisioning state of the virtual machine instance. */
  readonly provisioningState?: ProvisioningStateEnum;
  /** The virtual machine instance view. */
  readonly instanceView?: VirtualMachineInstanceView;
  /** The observed state of virtual machine instances */
  readonly status?: VirtualMachineInstanceStatus;
  /** Guest agent install status. */
  guestAgentInstallStatus?: GuestAgentInstallStatus;
  /** Unique identifier for the vm resource. */
  readonly vmId?: string;
  /** Unique identifier defined by ARC to identify the guest of the VM. */
  resourceUid?: string;
  /** Unique identifier for the Hyper-V VM resource. */
  readonly hyperVVmId?: string;
  /** Name of the host node that the VM is on. */
  readonly hostNodeName?: string;
  /** Name of the host node that the VM is on. */
  readonly hostNodeIpAddress?: string;
}

export function virtualMachineInstancePropertiesSerializer(
  item: VirtualMachineInstanceProperties,
): any {
  return {
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : virtualMachineInstancePropertiesHardwareProfileSerializer(item["hardwareProfile"]),
    placementProfile: !item["placementProfile"]
      ? item["placementProfile"]
      : virtualMachineInstancePropertiesPlacementProfileSerializer(item["placementProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : virtualMachineInstancePropertiesNetworkProfileSerializer(item["networkProfile"]),
    osProfile: !item["osProfile"]
      ? item["osProfile"]
      : virtualMachineInstancePropertiesOsProfileSerializer(item["osProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : virtualMachineInstancePropertiesSecurityProfileSerializer(item["securityProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : virtualMachineInstancePropertiesStorageProfileSerializer(item["storageProfile"]),
    httpProxyConfig: !item["httpProxyConfig"]
      ? item["httpProxyConfig"]
      : httpProxyConfigurationSerializer(item["httpProxyConfig"]),
    createFromLocal: item["createFromLocal"],
    localVmName: item["localVmName"],
    guestAgentInstallStatus: !item["guestAgentInstallStatus"]
      ? item["guestAgentInstallStatus"]
      : guestAgentInstallStatusSerializer(item["guestAgentInstallStatus"]),
    resourceUid: item["resourceUid"],
  };
}

export function virtualMachineInstancePropertiesDeserializer(
  item: any,
): VirtualMachineInstanceProperties {
  return {
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : virtualMachineInstancePropertiesHardwareProfileDeserializer(item["hardwareProfile"]),
    placementProfile: !item["placementProfile"]
      ? item["placementProfile"]
      : virtualMachineInstancePropertiesPlacementProfileDeserializer(item["placementProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : virtualMachineInstancePropertiesNetworkProfileDeserializer(item["networkProfile"]),
    osProfile: !item["osProfile"]
      ? item["osProfile"]
      : virtualMachineInstancePropertiesOsProfileDeserializer(item["osProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : virtualMachineInstancePropertiesSecurityProfileDeserializer(item["securityProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : virtualMachineInstancePropertiesStorageProfileDeserializer(item["storageProfile"]),
    httpProxyConfig: !item["httpProxyConfig"]
      ? item["httpProxyConfig"]
      : httpProxyConfigurationDeserializer(item["httpProxyConfig"]),
    createFromLocal: item["createFromLocal"],
    localVmName: item["localVmName"],
    provisioningState: item["provisioningState"],
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : virtualMachineInstanceViewDeserializer(item["instanceView"]),
    status: !item["status"]
      ? item["status"]
      : virtualMachineInstanceStatusDeserializer(item["status"]),
    guestAgentInstallStatus: !item["guestAgentInstallStatus"]
      ? item["guestAgentInstallStatus"]
      : guestAgentInstallStatusDeserializer(item["guestAgentInstallStatus"]),
    vmId: item["vmId"],
    resourceUid: item["resourceUid"],
    hyperVVmId: item["hyperVVmId"],
    hostNodeName: item["hostNodeName"],
    hostNodeIpAddress: item["hostNodeIpAddress"],
  };
}

/** HardwareProfile - Specifies the hardware settings for the virtual machine instance. */
export interface VirtualMachineInstancePropertiesHardwareProfile {
  /** Enum of VM Sizes */
  vmSize?: VmSizeEnum;
  /** number of processors for the virtual machine instance */
  processors?: number;
  /** RAM in MB for the virtual machine instance */
  memoryMB?: number;
  /** Dynamic memory config */
  dynamicMemoryConfig?: VirtualMachineInstancePropertiesHardwareProfileDynamicMemoryConfig;
  /** virtualMachineGPUs - list of gpus to be attached to the virtual machine instance */
  virtualMachineGPUs?: VirtualMachineInstancePropertiesHardwareProfileVirtualMachineGPU[];
}

export function virtualMachineInstancePropertiesHardwareProfileSerializer(
  item: VirtualMachineInstancePropertiesHardwareProfile,
): any {
  return {
    vmSize: item["vmSize"],
    processors: item["processors"],
    memoryMB: item["memoryMB"],
    dynamicMemoryConfig: !item["dynamicMemoryConfig"]
      ? item["dynamicMemoryConfig"]
      : virtualMachineInstancePropertiesHardwareProfileDynamicMemoryConfigSerializer(
          item["dynamicMemoryConfig"],
        ),
    virtualMachineGPUs: !item["virtualMachineGPUs"]
      ? item["virtualMachineGPUs"]
      : virtualMachineInstancePropertiesHardwareProfileVirtualMachineGPUArraySerializer(
          item["virtualMachineGPUs"],
        ),
  };
}

export function virtualMachineInstancePropertiesHardwareProfileDeserializer(
  item: any,
): VirtualMachineInstancePropertiesHardwareProfile {
  return {
    vmSize: item["vmSize"],
    processors: item["processors"],
    memoryMB: item["memoryMB"],
    dynamicMemoryConfig: !item["dynamicMemoryConfig"]
      ? item["dynamicMemoryConfig"]
      : virtualMachineInstancePropertiesHardwareProfileDynamicMemoryConfigDeserializer(
          item["dynamicMemoryConfig"],
        ),
    virtualMachineGPUs: !item["virtualMachineGPUs"]
      ? item["virtualMachineGPUs"]
      : virtualMachineInstancePropertiesHardwareProfileVirtualMachineGPUArrayDeserializer(
          item["virtualMachineGPUs"],
        ),
  };
}

/** VM Sizes */
export enum KnownVmSizeEnum {
  /** Default virtual machine size */
  Default = "Default",
  /** Standard A2 v2 virtual machine size */
  StandardA2V2 = "Standard_A2_v2",
  /** Standard A4 v2 virtual machine size */
  StandardA4V2 = "Standard_A4_v2",
  /** Standard D2s v3 virtual machine size */
  StandardD2SV3 = "Standard_D2s_v3",
  /** Standard D4s v3 virtual machine size */
  StandardD4SV3 = "Standard_D4s_v3",
  /** Standard D8s v3 virtual machine size */
  StandardD8SV3 = "Standard_D8s_v3",
  /** Standard D16s v3 virtual machine size */
  StandardD16SV3 = "Standard_D16s_v3",
  /** Standard D32s v3 virtual machine size */
  StandardD32SV3 = "Standard_D32s_v3",
  /** Standard DS2 v2 virtual machine size */
  StandardDS2V2 = "Standard_DS2_v2",
  /** Standard DS3 v2 virtual machine size */
  StandardDS3V2 = "Standard_DS3_v2",
  /** Standard DS4 v2 virtual machine size */
  StandardDS4V2 = "Standard_DS4_v2",
  /** Standard DS5 v2 virtual machine size */
  StandardDS5V2 = "Standard_DS5_v2",
  /** Standard DS13 v2 virtual machine size */
  StandardDS13V2 = "Standard_DS13_v2",
  /** Standard K8S v1 virtual machine size */
  StandardK8SV1 = "Standard_K8S_v1",
  /** Standard K8S2 v1 virtual machine size */
  StandardK8S2V1 = "Standard_K8S2_v1",
  /** Standard K8S3 v1 virtual machine size */
  StandardK8S3V1 = "Standard_K8S3_v1",
  /** Standard K8S4 v1 virtual machine size */
  StandardK8S4V1 = "Standard_K8S4_v1",
  /** Standard NK6 virtual machine size */
  StandardNK6 = "Standard_NK6",
  /** Standard NK12 virtual machine size */
  StandardNK12 = "Standard_NK12",
  /** Standard NV6 virtual machine size */
  StandardNV6 = "Standard_NV6",
  /** Standard NV12 virtual machine size */
  StandardNV12 = "Standard_NV12",
  /** Standard K8S5 v1 virtual machine size */
  StandardK8S5V1 = "Standard_K8S5_v1",
  /** Custom virtual machine size */
  Custom = "Custom",
}

/**
 * VM Sizes \
 * {@link KnownVmSizeEnum} can be used interchangeably with VmSizeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default virtual machine size \
 * **Standard_A2_v2**: Standard A2 v2 virtual machine size \
 * **Standard_A4_v2**: Standard A4 v2 virtual machine size \
 * **Standard_D2s_v3**: Standard D2s v3 virtual machine size \
 * **Standard_D4s_v3**: Standard D4s v3 virtual machine size \
 * **Standard_D8s_v3**: Standard D8s v3 virtual machine size \
 * **Standard_D16s_v3**: Standard D16s v3 virtual machine size \
 * **Standard_D32s_v3**: Standard D32s v3 virtual machine size \
 * **Standard_DS2_v2**: Standard DS2 v2 virtual machine size \
 * **Standard_DS3_v2**: Standard DS3 v2 virtual machine size \
 * **Standard_DS4_v2**: Standard DS4 v2 virtual machine size \
 * **Standard_DS5_v2**: Standard DS5 v2 virtual machine size \
 * **Standard_DS13_v2**: Standard DS13 v2 virtual machine size \
 * **Standard_K8S_v1**: Standard K8S v1 virtual machine size \
 * **Standard_K8S2_v1**: Standard K8S2 v1 virtual machine size \
 * **Standard_K8S3_v1**: Standard K8S3 v1 virtual machine size \
 * **Standard_K8S4_v1**: Standard K8S4 v1 virtual machine size \
 * **Standard_NK6**: Standard NK6 virtual machine size \
 * **Standard_NK12**: Standard NK12 virtual machine size \
 * **Standard_NV6**: Standard NV6 virtual machine size \
 * **Standard_NV12**: Standard NV12 virtual machine size \
 * **Standard_K8S5_v1**: Standard K8S5 v1 virtual machine size \
 * **Custom**: Custom virtual machine size
 */
export type VmSizeEnum = string;

/** Dynamic memory config */
export interface VirtualMachineInstancePropertiesHardwareProfileDynamicMemoryConfig {
  /** Maximum memory in MB */
  maximumMemoryMB?: number;
  /** Minimum memory in MB */
  minimumMemoryMB?: number;
  /** Defines the amount of extra memory that should be reserved for a virtual machine instance at runtime, as a percentage of the total memory that the virtual machine instance is thought to need. This only applies to virtual systems with dynamic memory enabled. This property can be in the range of 5 to 2000. */
  targetMemoryBuffer?: number;
}

export function virtualMachineInstancePropertiesHardwareProfileDynamicMemoryConfigSerializer(
  item: VirtualMachineInstancePropertiesHardwareProfileDynamicMemoryConfig,
): any {
  return {
    maximumMemoryMB: item["maximumMemoryMB"],
    minimumMemoryMB: item["minimumMemoryMB"],
    targetMemoryBuffer: item["targetMemoryBuffer"],
  };
}

export function virtualMachineInstancePropertiesHardwareProfileDynamicMemoryConfigDeserializer(
  item: any,
): VirtualMachineInstancePropertiesHardwareProfileDynamicMemoryConfig {
  return {
    maximumMemoryMB: item["maximumMemoryMB"],
    minimumMemoryMB: item["minimumMemoryMB"],
    targetMemoryBuffer: item["targetMemoryBuffer"],
  };
}

export function virtualMachineInstancePropertiesHardwareProfileVirtualMachineGPUArraySerializer(
  result: Array<VirtualMachineInstancePropertiesHardwareProfileVirtualMachineGPU>,
): any[] {
  return result.map((item) => {
    return virtualMachineInstancePropertiesHardwareProfileVirtualMachineGPUSerializer(item);
  });
}

export function virtualMachineInstancePropertiesHardwareProfileVirtualMachineGPUArrayDeserializer(
  result: Array<VirtualMachineInstancePropertiesHardwareProfileVirtualMachineGPU>,
): any[] {
  return result.map((item) => {
    return virtualMachineInstancePropertiesHardwareProfileVirtualMachineGPUDeserializer(item);
  });
}

/** GPU properties - describes the GPU configuration. */
export interface VirtualMachineInstancePropertiesHardwareProfileVirtualMachineGPU {
  /** GPU assignment type */
  assignmentType: GpuAssignmentTypeEnum;
  /** Size of gpu partition in MB for GPU-P */
  partitionSizeMB?: number;
  /** Name of the GPU */
  gpuName?: string;
}

export function virtualMachineInstancePropertiesHardwareProfileVirtualMachineGPUSerializer(
  item: VirtualMachineInstancePropertiesHardwareProfileVirtualMachineGPU,
): any {
  return {
    assignmentType: item["assignmentType"],
    partitionSizeMB: item["partitionSizeMB"],
    gpuName: item["gpuName"],
  };
}

export function virtualMachineInstancePropertiesHardwareProfileVirtualMachineGPUDeserializer(
  item: any,
): VirtualMachineInstancePropertiesHardwareProfileVirtualMachineGPU {
  return {
    assignmentType: item["assignmentType"],
    partitionSizeMB: item["partitionSizeMB"],
    gpuName: item["gpuName"],
  };
}

/** Gpu Assignment types */
export enum KnownGpuAssignmentTypeEnum {
  /** Attach Graphics Processing Unit (GPU) using Discrete Device Assignment (DDA) */
  GpuDDA = "GpuDDA",
  /** Attach Graphics Processing Unit (GPU) using GPU Partitioning */
  GpuP = "GpuP",
}

/**
 * Gpu Assignment types \
 * {@link KnownGpuAssignmentTypeEnum} can be used interchangeably with GpuAssignmentTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GpuDDA**: Attach Graphics Processing Unit (GPU) using Discrete Device Assignment (DDA) \
 * **GpuP**: Attach Graphics Processing Unit (GPU) using GPU Partitioning
 */
export type GpuAssignmentTypeEnum = string;

/** PlacementProfile - Specifies the placement related settings for the virtual machine. */
export interface VirtualMachineInstancePropertiesPlacementProfile {
  /** The zone in which the VM should be placed in. */
  zone?: string;
  /** Specifies whether VM can only failover strictly within the zone it was placed in */
  strictPlacementPolicy?: boolean;
}

export function virtualMachineInstancePropertiesPlacementProfileSerializer(
  item: VirtualMachineInstancePropertiesPlacementProfile,
): any {
  return { zone: item["zone"], strictPlacementPolicy: item["strictPlacementPolicy"] };
}

export function virtualMachineInstancePropertiesPlacementProfileDeserializer(
  item: any,
): VirtualMachineInstancePropertiesPlacementProfile {
  return {
    zone: item["zone"],
    strictPlacementPolicy: item["strictPlacementPolicy"],
  };
}

/** NetworkProfile - describes the network configuration the virtual machine instance */
export interface VirtualMachineInstancePropertiesNetworkProfile {
  /** NetworkInterfaces - list of network interfaces to be attached to the virtual machine instance */
  networkInterfaces?: NetworkInterfaceArmReference[];
}

export function virtualMachineInstancePropertiesNetworkProfileSerializer(
  item: VirtualMachineInstancePropertiesNetworkProfile,
): any {
  return {
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArmReferenceArraySerializer(item["networkInterfaces"]),
  };
}

export function virtualMachineInstancePropertiesNetworkProfileDeserializer(
  item: any,
): VirtualMachineInstancePropertiesNetworkProfile {
  return {
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArmReferenceArrayDeserializer(item["networkInterfaces"]),
  };
}

/** OsProfile - describes the configuration of the operating system and sets login data */
export interface VirtualMachineInstancePropertiesOsProfile {
  /** AdminPassword - admin password */
  adminPassword?: string;
  /** AdminUsername - admin username */
  adminUsername?: string;
  /** ComputerName - name of the compute */
  computerName?: string;
  /** LinuxConfiguration - linux specific configuration values for the virtual machine instance */
  linuxConfiguration?: VirtualMachineInstancePropertiesOsProfileLinuxConfiguration;
  /** Windows Configuration for the virtual machine instance */
  windowsConfiguration?: VirtualMachineInstancePropertiesOsProfileWindowsConfiguration;
}

export function virtualMachineInstancePropertiesOsProfileSerializer(
  item: VirtualMachineInstancePropertiesOsProfile,
): any {
  return {
    adminPassword: item["adminPassword"],
    adminUsername: item["adminUsername"],
    computerName: item["computerName"],
    linuxConfiguration: !item["linuxConfiguration"]
      ? item["linuxConfiguration"]
      : virtualMachineInstancePropertiesOsProfileLinuxConfigurationSerializer(
          item["linuxConfiguration"],
        ),
    windowsConfiguration: !item["windowsConfiguration"]
      ? item["windowsConfiguration"]
      : virtualMachineInstancePropertiesOsProfileWindowsConfigurationSerializer(
          item["windowsConfiguration"],
        ),
  };
}

export function virtualMachineInstancePropertiesOsProfileDeserializer(
  item: any,
): VirtualMachineInstancePropertiesOsProfile {
  return {
    adminPassword: item["adminPassword"],
    adminUsername: item["adminUsername"],
    computerName: item["computerName"],
    linuxConfiguration: !item["linuxConfiguration"]
      ? item["linuxConfiguration"]
      : virtualMachineInstancePropertiesOsProfileLinuxConfigurationDeserializer(
          item["linuxConfiguration"],
        ),
    windowsConfiguration: !item["windowsConfiguration"]
      ? item["windowsConfiguration"]
      : virtualMachineInstancePropertiesOsProfileWindowsConfigurationDeserializer(
          item["windowsConfiguration"],
        ),
  };
}

/** LinuxConfiguration - linux specific configuration values for the virtual machine instance */
export interface VirtualMachineInstancePropertiesOsProfileLinuxConfiguration {
  /** DisablePasswordAuthentication - whether password authentication should be disabled */
  disablePasswordAuthentication?: boolean;
  /** Specifies the ssh key configuration for a Linux OS. */
  ssh?: SshConfiguration;
  /** Used to indicate whether Arc for Servers agent onboarding should be triggered during the virtual machine instance creation process. */
  provisionVMAgent?: boolean;
  /** Used to indicate whether the VM Config Agent should be installed during the virtual machine creation process. */
  provisionVMConfigAgent?: boolean;
}

export function virtualMachineInstancePropertiesOsProfileLinuxConfigurationSerializer(
  item: VirtualMachineInstancePropertiesOsProfileLinuxConfiguration,
): any {
  return {
    disablePasswordAuthentication: item["disablePasswordAuthentication"],
    ssh: !item["ssh"] ? item["ssh"] : sshConfigurationSerializer(item["ssh"]),
    provisionVMAgent: item["provisionVMAgent"],
    provisionVMConfigAgent: item["provisionVMConfigAgent"],
  };
}

export function virtualMachineInstancePropertiesOsProfileLinuxConfigurationDeserializer(
  item: any,
): VirtualMachineInstancePropertiesOsProfileLinuxConfiguration {
  return {
    disablePasswordAuthentication: item["disablePasswordAuthentication"],
    ssh: !item["ssh"] ? item["ssh"] : sshConfigurationDeserializer(item["ssh"]),
    provisionVMAgent: item["provisionVMAgent"],
    provisionVMConfigAgent: item["provisionVMConfigAgent"],
  };
}

/** SSH configuration for Linux based VMs running on Azure */
export interface SshConfiguration {
  /** The list of SSH public keys used to authenticate with linux based VMs. */
  publicKeys?: SshPublicKey[];
}

export function sshConfigurationSerializer(item: SshConfiguration): any {
  return {
    publicKeys: !item["publicKeys"]
      ? item["publicKeys"]
      : sshPublicKeyArraySerializer(item["publicKeys"]),
  };
}

export function sshConfigurationDeserializer(item: any): SshConfiguration {
  return {
    publicKeys: !item["publicKeys"]
      ? item["publicKeys"]
      : sshPublicKeyArrayDeserializer(item["publicKeys"]),
  };
}

export function sshPublicKeyArraySerializer(result: Array<SshPublicKey>): any[] {
  return result.map((item) => {
    return sshPublicKeySerializer(item);
  });
}

export function sshPublicKeyArrayDeserializer(result: Array<SshPublicKey>): any[] {
  return result.map((item) => {
    return sshPublicKeyDeserializer(item);
  });
}

/** Contains information about SSH certificate public key and the path on the Linux VM where the public key is placed. */
export interface SshPublicKey {
  /** Specifies the full path on the created VM where ssh public key is stored. If the file already exists, the specified key is appended to the file. Example: /home/user/.ssh/authorized_keys */
  path?: string;
  /** SSH public key certificate used to authenticate with the VM through ssh. The key needs to be at least 2048-bit and in ssh-rsa format. <br><br> For creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure]https://learn.microsoft.com/azure/virtual-machines/linux/create-ssh-keys-detailed). */
  keyData?: string;
}

export function sshPublicKeySerializer(item: SshPublicKey): any {
  return { path: item["path"], keyData: item["keyData"] };
}

export function sshPublicKeyDeserializer(item: any): SshPublicKey {
  return {
    path: item["path"],
    keyData: item["keyData"],
  };
}

/** Windows Configuration for the virtual machine instance */
export interface VirtualMachineInstancePropertiesOsProfileWindowsConfiguration {
  /** Whether to EnableAutomaticUpdates on the machine */
  enableAutomaticUpdates?: boolean;
  /** Specifies the ssh key configuration for Windows OS. */
  ssh?: SshConfiguration;
  /** TimeZone for the virtual machine instance */
  timeZone?: string;
  /** Used to indicate whether Arc for Servers agent onboarding should be triggered during the virtual machine instance creation process. */
  provisionVMAgent?: boolean;
  /** Used to indicate whether the VM Config Agent should be installed during the virtual machine creation process. */
  provisionVMConfigAgent?: boolean;
}

export function virtualMachineInstancePropertiesOsProfileWindowsConfigurationSerializer(
  item: VirtualMachineInstancePropertiesOsProfileWindowsConfiguration,
): any {
  return {
    enableAutomaticUpdates: item["enableAutomaticUpdates"],
    ssh: !item["ssh"] ? item["ssh"] : sshConfigurationSerializer(item["ssh"]),
    timeZone: item["timeZone"],
    provisionVMAgent: item["provisionVMAgent"],
    provisionVMConfigAgent: item["provisionVMConfigAgent"],
  };
}

export function virtualMachineInstancePropertiesOsProfileWindowsConfigurationDeserializer(
  item: any,
): VirtualMachineInstancePropertiesOsProfileWindowsConfiguration {
  return {
    enableAutomaticUpdates: item["enableAutomaticUpdates"],
    ssh: !item["ssh"] ? item["ssh"] : sshConfigurationDeserializer(item["ssh"]),
    timeZone: item["timeZone"],
    provisionVMAgent: item["provisionVMAgent"],
    provisionVMConfigAgent: item["provisionVMConfigAgent"],
  };
}

/** SecurityProfile - Specifies the security settings for the virtual machine instance. */
export interface VirtualMachineInstancePropertiesSecurityProfile {
  /** Enable TPM flag */
  enableTPM?: boolean;
  /** Uefi settings of the virtual machine instance */
  uefiSettings?: VirtualMachineInstancePropertiesSecurityProfileUefiSettings;
  /** Specifies the SecurityType of the virtual machine. EnableTPM and SecureBootEnabled must be set to true for SecurityType to function. */
  securityType?: SecurityTypes;
}

export function virtualMachineInstancePropertiesSecurityProfileSerializer(
  item: VirtualMachineInstancePropertiesSecurityProfile,
): any {
  return {
    enableTPM: item["enableTPM"],
    uefiSettings: !item["uefiSettings"]
      ? item["uefiSettings"]
      : virtualMachineInstancePropertiesSecurityProfileUefiSettingsSerializer(item["uefiSettings"]),
    securityType: item["securityType"],
  };
}

export function virtualMachineInstancePropertiesSecurityProfileDeserializer(
  item: any,
): VirtualMachineInstancePropertiesSecurityProfile {
  return {
    enableTPM: item["enableTPM"],
    uefiSettings: !item["uefiSettings"]
      ? item["uefiSettings"]
      : virtualMachineInstancePropertiesSecurityProfileUefiSettingsDeserializer(
          item["uefiSettings"],
        ),
    securityType: item["securityType"],
  };
}

/** Uefi settings - Specifies whether secure boot should be enabled on the virtual machine instance. */
export interface VirtualMachineInstancePropertiesSecurityProfileUefiSettings {
  /** Specifies whether secure boot should be enabled on the virtual machine instance. */
  secureBootEnabled?: boolean;
}

export function virtualMachineInstancePropertiesSecurityProfileUefiSettingsSerializer(
  item: VirtualMachineInstancePropertiesSecurityProfileUefiSettings,
): any {
  return { secureBootEnabled: item["secureBootEnabled"] };
}

export function virtualMachineInstancePropertiesSecurityProfileUefiSettingsDeserializer(
  item: any,
): VirtualMachineInstancePropertiesSecurityProfileUefiSettings {
  return {
    secureBootEnabled: item["secureBootEnabled"],
  };
}

/** Specifies the SecurityType of the virtual machine. EnableTPM and SecureBootEnabled must be set to true for SecurityType to function. */
export enum KnownSecurityTypes {
  /** Trusted Launch security type */
  TrustedLaunch = "TrustedLaunch",
  /** Confidential VM security type */
  ConfidentialVM = "ConfidentialVM",
}

/**
 * Specifies the SecurityType of the virtual machine. EnableTPM and SecureBootEnabled must be set to true for SecurityType to function. \
 * {@link KnownSecurityTypes} can be used interchangeably with SecurityTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TrustedLaunch**: Trusted Launch security type \
 * **ConfidentialVM**: Confidential VM security type
 */
export type SecurityTypes = string;

/** StorageProfile - contains information about the disks and storage information for the virtual machine instance */
export interface VirtualMachineInstancePropertiesStorageProfile {
  /** adds data disks to the virtual machine instance */
  dataDisks?: VirtualHardDiskArmReference[];
  /** Which Image to use for the virtual machine instance */
  imageReference?: ImageArmReference;
  /** VHD to attach as OS disk */
  osDisk?: VirtualMachineInstancePropertiesStorageProfileOsDisk;
  /** Id of the storage container that hosts the VM configuration file */
  vmConfigStoragePathId?: string;
}

export function virtualMachineInstancePropertiesStorageProfileSerializer(
  item: VirtualMachineInstancePropertiesStorageProfile,
): any {
  return {
    dataDisks: !item["dataDisks"]
      ? item["dataDisks"]
      : virtualHardDiskArmReferenceArraySerializer(item["dataDisks"]),
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageArmReferenceSerializer(item["imageReference"]),
    osDisk: !item["osDisk"]
      ? item["osDisk"]
      : virtualMachineInstancePropertiesStorageProfileOsDiskSerializer(item["osDisk"]),
    vmConfigStoragePathId: item["vmConfigStoragePathId"],
  };
}

export function virtualMachineInstancePropertiesStorageProfileDeserializer(
  item: any,
): VirtualMachineInstancePropertiesStorageProfile {
  return {
    dataDisks: !item["dataDisks"]
      ? item["dataDisks"]
      : virtualHardDiskArmReferenceArrayDeserializer(item["dataDisks"]),
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageArmReferenceDeserializer(item["imageReference"]),
    osDisk: !item["osDisk"]
      ? item["osDisk"]
      : virtualMachineInstancePropertiesStorageProfileOsDiskDeserializer(item["osDisk"]),
    vmConfigStoragePathId: item["vmConfigStoragePathId"],
  };
}

export function virtualHardDiskArmReferenceArraySerializer(
  result: Array<VirtualHardDiskArmReference>,
): any[] {
  return result.map((item) => {
    return virtualHardDiskArmReferenceSerializer(item);
  });
}

export function virtualHardDiskArmReferenceArrayDeserializer(
  result: Array<VirtualHardDiskArmReference>,
): any[] {
  return result.map((item) => {
    return virtualHardDiskArmReferenceDeserializer(item);
  });
}

/** The Azure Resource ID for a Virtual Hard Disk. */
export interface VirtualHardDiskArmReference {
  /** The Azure Resource ID for a Virtual Hard Disk. */
  id?: string;
}

export function virtualHardDiskArmReferenceSerializer(item: VirtualHardDiskArmReference): any {
  return { id: item["id"] };
}

export function virtualHardDiskArmReferenceDeserializer(item: any): VirtualHardDiskArmReference {
  return {
    id: item["id"],
  };
}

/** The Azure Resource ID for a Gallery Image. */
export interface ImageArmReference {
  /** The Azure Resource ID for an image resource used by the virtual machine instance. */
  id?: string;
}

export function imageArmReferenceSerializer(item: ImageArmReference): any {
  return { id: item["id"] };
}

export function imageArmReferenceDeserializer(item: any): ImageArmReference {
  return {
    id: item["id"],
  };
}

/** VHD to attach as OS disk */
export interface VirtualMachineInstancePropertiesStorageProfileOsDisk {
  /** The Azure Resource ID for a Virtual Hard Disk. */
  id?: string;
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. Possible values are: Windows, Linux. */
  osType?: OperatingSystemTypes;
  /** The managed disk parameters. */
  managedDisk?: VirtualMachineInstanceManagedDiskParameters;
}

export function virtualMachineInstancePropertiesStorageProfileOsDiskSerializer(
  item: VirtualMachineInstancePropertiesStorageProfileOsDisk,
): any {
  return {
    id: item["id"],
    osType: item["osType"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : virtualMachineInstanceManagedDiskParametersSerializer(item["managedDisk"]),
  };
}

export function virtualMachineInstancePropertiesStorageProfileOsDiskDeserializer(
  item: any,
): VirtualMachineInstancePropertiesStorageProfileOsDisk {
  return {
    id: item["id"],
    osType: item["osType"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : virtualMachineInstanceManagedDiskParametersDeserializer(item["managedDisk"]),
  };
}

/** The parameters of a managed disk. */
export interface VirtualMachineInstanceManagedDiskParameters {
  /** Specifies the security profile for the managed disk. */
  securityProfile?: VMDiskSecurityProfile;
}

export function virtualMachineInstanceManagedDiskParametersSerializer(
  item: VirtualMachineInstanceManagedDiskParameters,
): any {
  return {
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : vmDiskSecurityProfileSerializer(item["securityProfile"]),
  };
}

export function virtualMachineInstanceManagedDiskParametersDeserializer(
  item: any,
): VirtualMachineInstanceManagedDiskParameters {
  return {
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : vmDiskSecurityProfileDeserializer(item["securityProfile"]),
  };
}

/** Specifies the security profile settings for the managed disk. NOTE: It can only be set for Confidential VMs */
export interface VMDiskSecurityProfile {
  /** Specifies the EncryptionType of the managed disk. It is set to NonPersistedTPM for not persisting firmware state in the VMGuestState blob. NOTE: It can be set for only Confidential VMs. */
  securityEncryptionType?: SecurityEncryptionType;
}

export function vmDiskSecurityProfileSerializer(item: VMDiskSecurityProfile): any {
  return { securityEncryptionType: item["securityEncryptionType"] };
}

export function vmDiskSecurityProfileDeserializer(item: any): VMDiskSecurityProfile {
  return {
    securityEncryptionType: item["securityEncryptionType"],
  };
}

/** Encryption type of the managed disk enum. */
export enum KnownSecurityEncryptionType {
  /** Non-persisted TPM encryption type */
  NonPersistedTPM = "NonPersistedTPM",
}

/**
 * Encryption type of the managed disk enum. \
 * {@link KnownSecurityEncryptionType} can be used interchangeably with SecurityEncryptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NonPersistedTPM**: Non-persisted TPM encryption type
 */
export type SecurityEncryptionType = string;

/** HTTP Proxy configuration for the VM. */
export interface HttpProxyConfiguration {
  /** The HTTP proxy server endpoint to use. */
  httpProxy?: string;
  /** The HTTPS proxy server endpoint to use. */
  httpsProxy?: string;
  /** The endpoints that should not go through proxy. */
  noProxy?: string[];
  /** Alternative CA cert to use for connecting to proxy servers. */
  trustedCa?: string;
}

export function httpProxyConfigurationSerializer(item: HttpProxyConfiguration): any {
  return {
    httpProxy: item["httpProxy"],
    httpsProxy: item["httpsProxy"],
    noProxy: !item["noProxy"]
      ? item["noProxy"]
      : item["noProxy"].map((p: any) => {
          return p;
        }),
    trustedCa: item["trustedCa"],
  };
}

export function httpProxyConfigurationDeserializer(item: any): HttpProxyConfiguration {
  return {
    httpProxy: item["httpProxy"],
    httpsProxy: item["httpsProxy"],
    noProxy: !item["noProxy"]
      ? item["noProxy"]
      : item["noProxy"].map((p: any) => {
          return p;
        }),
    trustedCa: item["trustedCa"],
  };
}

/** The instance view of a virtual machine. */
export interface VirtualMachineInstanceView {
  /** The VM Config Agent running on the virtual machine. */
  vmAgent?: VirtualMachineConfigAgentInstanceView;
}

export function virtualMachineInstanceViewDeserializer(item: any): VirtualMachineInstanceView {
  return {
    vmAgent: !item["vmAgent"]
      ? item["vmAgent"]
      : virtualMachineConfigAgentInstanceViewDeserializer(item["vmAgent"]),
  };
}

/** The instance view of the VM Config Agent running on the virtual machine. */
export interface VirtualMachineConfigAgentInstanceView {
  /** The VM Config Agent full version. */
  vmConfigAgentVersion?: string;
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
}

export function virtualMachineConfigAgentInstanceViewDeserializer(
  item: any,
): VirtualMachineConfigAgentInstanceView {
  return {
    vmConfigAgentVersion: item["vmConfigAgentVersion"],
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArrayDeserializer(item["statuses"]),
  };
}

export function instanceViewStatusArrayDeserializer(result: Array<InstanceViewStatus>): any[] {
  return result.map((item) => {
    return instanceViewStatusDeserializer(item);
  });
}

/** Instance view status. */
export interface InstanceViewStatus {
  /** The status code. */
  code?: string;
  /** The level code. */
  level?: StatusLevelTypes;
  /** The short localizable label for the status. */
  displayStatus?: string;
  /** The detailed status message, including for alerts and error messages. */
  message?: string;
  /** The time of the status. */
  time?: Date;
}

export function instanceViewStatusDeserializer(item: any): InstanceViewStatus {
  return {
    code: item["code"],
    level: item["level"],
    displayStatus: item["displayStatus"],
    message: item["message"],
    time: !item["time"] ? item["time"] : new Date(item["time"]),
  };
}

/** The level code. */
export enum KnownStatusLevelTypes {
  /** Informational status level */
  Info = "Info",
  /** Warning status level */
  Warning = "Warning",
  /** Error status level */
  Error = "Error",
}

/**
 * The level code. \
 * {@link KnownStatusLevelTypes} can be used interchangeably with StatusLevelTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Info**: Informational status level \
 * **Warning**: Warning status level \
 * **Error**: Error status level
 */
export type StatusLevelTypes = string;

/** The observed state of virtual machine instances */
export interface VirtualMachineInstanceStatus {
  /** VirtualMachine provisioning error code */
  errorCode?: string;
  /** Descriptive error message */
  errorMessage?: string;
  /** The power state of the virtual machine instance */
  powerState?: PowerStateEnum;
  /** Provisioning status of the virtual machine instance */
  provisioningStatus?: VirtualMachineInstanceStatusProvisioningStatus;
}

export function virtualMachineInstanceStatusDeserializer(item: any): VirtualMachineInstanceStatus {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    powerState: item["powerState"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : virtualMachineInstanceStatusProvisioningStatusDeserializer(item["provisioningStatus"]),
  };
}

/** The power state of the virtual machine instance */
export enum KnownPowerStateEnum {
  /** Virtual machine deallocated */
  Deallocated = "Deallocated",
  /** Virtual machine deallocating */
  Deallocating = "Deallocating",
  /** Virtual machine running */
  Running = "Running",
  /** Virtual machine starting */
  Starting = "Starting",
  /** Virtual machine stopped */
  Stopped = "Stopped",
  /** Virtual machine stopping */
  Stopping = "Stopping",
  /** Virtual machine paused */
  Paused = "Paused",
  /** Virtual machine Saved, */
  Saved = "Saved",
  /** Power state of the virtual machine is unknown */
  Unknown = "Unknown",
}

/**
 * The power state of the virtual machine instance \
 * {@link KnownPowerStateEnum} can be used interchangeably with PowerStateEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Deallocated**: Virtual machine deallocated \
 * **Deallocating**: Virtual machine deallocating \
 * **Running**: Virtual machine running \
 * **Starting**: Virtual machine starting \
 * **Stopped**: Virtual machine stopped \
 * **Stopping**: Virtual machine stopping \
 * **Paused**: Virtual machine paused \
 * **Saved**: Virtual machine Saved, \
 * **Unknown**: Power state of the virtual machine is unknown
 */
export type PowerStateEnum = string;

/** Virtual machine instance provisioning status. */
export interface VirtualMachineInstanceStatusProvisioningStatus {
  /** The ID of the operation performed on the virtual machine instance */
  operationId?: string;
  /** The status of the operation performed on the virtual machine instance [Succeeded, Failed, InProgress] */
  status?: Status;
}

export function virtualMachineInstanceStatusProvisioningStatusDeserializer(
  item: any,
): VirtualMachineInstanceStatusProvisioningStatus {
  return {
    operationId: item["operationId"],
    status: item["status"],
  };
}

/** Defines the status of a guest agent installation. */
export interface GuestAgentInstallStatus {
  /** Specifies the VM's unique SMBIOS ID. */
  readonly vmUuid?: string;
  /** The installation status of the hybrid machine agent installation. */
  readonly status?: StatusTypes;
  /** The time of the last status change. */
  readonly lastStatusChange?: Date;
  /** The hybrid machine agent full version. */
  readonly agentVersion?: string;
  /** Details about the error state. */
  readonly errorDetails?: ErrorDetail[];
}

export function guestAgentInstallStatusSerializer(_item: GuestAgentInstallStatus): any {
  return {};
}

export function guestAgentInstallStatusDeserializer(item: any): GuestAgentInstallStatus {
  return {
    vmUuid: item["vmUuid"],
    status: item["status"],
    lastStatusChange: !item["lastStatusChange"]
      ? item["lastStatusChange"]
      : new Date(item["lastStatusChange"]),
    agentVersion: item["agentVersion"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : errorDetailArrayDeserializer(item["errorDetails"]),
  };
}

/** The installation status of the hybrid machine agent installation. */
export enum KnownStatusTypes {
  /** Installation succeeded */
  Succeeded = "Succeeded",
  /** Installation in progress */
  InProgress = "InProgress",
  /** Installation failed */
  Failed = "Failed",
}

/**
 * The installation status of the hybrid machine agent installation. \
 * {@link KnownStatusTypes} can be used interchangeably with StatusTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Installation succeeded \
 * **InProgress**: Installation in progress \
 * **Failed**: Installation failed
 */
export type StatusTypes = string;

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

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceSerializer(_item: ExtensionResource): any {
  return {};
}

export function extensionResourceDeserializer(item: any): ExtensionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The virtual machine instance resource patch definition. */
export interface VirtualMachineInstanceUpdateRequest {
  /** Defines the resource properties for the update. */
  properties?: VirtualMachineInstanceUpdateProperties;
  /** Identity for the resource. */
  identity?: Identity;
}

export function virtualMachineInstanceUpdateRequestSerializer(
  item: VirtualMachineInstanceUpdateRequest,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineInstanceUpdatePropertiesSerializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
  };
}

/** Defines the resource properties for the update. */
export interface VirtualMachineInstanceUpdateProperties {
  /** HardwareProfile - Specifies the hardware settings for the virtual machine instance. */
  hardwareProfile?: HardwareProfileUpdate;
  /** StorageProfile - Specifies the storage settings for the virtual machine instance. */
  storageProfile?: StorageProfileUpdate;
  /** NetworkProfile - describes the network update configuration the virtual machine instance */
  networkProfile?: NetworkProfileUpdate;
  /** OsProfile - describes the update configuration of the operating system */
  osProfile?: OsProfileUpdate;
}

export function virtualMachineInstanceUpdatePropertiesSerializer(
  item: VirtualMachineInstanceUpdateProperties,
): any {
  return {
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hardwareProfileUpdateSerializer(item["hardwareProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileUpdateSerializer(item["storageProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileUpdateSerializer(item["networkProfile"]),
    osProfile: !item["osProfile"]
      ? item["osProfile"]
      : osProfileUpdateSerializer(item["osProfile"]),
  };
}

/** HardwareProfile - Specifies the hardware settings for the virtual machine instance. */
export interface HardwareProfileUpdate {
  /** VM Size Enum */
  vmSize?: VmSizeEnum;
  /** number of processors for the virtual machine instance */
  processors?: number;
  /** RAM in MB for the virtual machine instance */
  memoryMB?: number;
  /** virtualMachineGPUs - updated list of GPUs on the virtual machine instance */
  virtualMachineGPUs?: VirtualMachineInstancePropertiesHardwareProfileVirtualMachineGPU[];
}

export function hardwareProfileUpdateSerializer(item: HardwareProfileUpdate): any {
  return {
    vmSize: item["vmSize"],
    processors: item["processors"],
    memoryMB: item["memoryMB"],
    virtualMachineGPUs: !item["virtualMachineGPUs"]
      ? item["virtualMachineGPUs"]
      : virtualMachineInstancePropertiesHardwareProfileVirtualMachineGPUArraySerializer(
          item["virtualMachineGPUs"],
        ),
  };
}

/** Storage profile update */
export interface StorageProfileUpdate {
  /** adds data disks to the virtual machine instance for the update call */
  dataDisks?: VirtualHardDiskArmReference[];
}

export function storageProfileUpdateSerializer(item: StorageProfileUpdate): any {
  return {
    dataDisks: !item["dataDisks"]
      ? item["dataDisks"]
      : virtualHardDiskArmReferenceArraySerializer(item["dataDisks"]),
  };
}

/** NetworkProfile - describes the network update configuration the virtual machine instance */
export interface NetworkProfileUpdate {
  /** NetworkInterfaces - list of network interfaces to be attached to the virtual machine instance */
  networkInterfaces?: NetworkInterfaceArmReference[];
}

export function networkProfileUpdateSerializer(item: NetworkProfileUpdate): any {
  return {
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceArmReferenceArraySerializer(item["networkInterfaces"]),
  };
}

/** OsProfile - describes the update configuration of the operating system */
export interface OsProfileUpdate {
  /** ComputerName - name of the computer */
  computerName?: string;
  /** Linux configuration properties */
  linuxConfiguration?: OsProfileUpdateLinuxConfiguration;
  /** Windows configuration properties */
  windowsConfiguration?: OsProfileUpdateWindowsConfiguration;
}

export function osProfileUpdateSerializer(item: OsProfileUpdate): any {
  return {
    computerName: item["computerName"],
    linuxConfiguration: !item["linuxConfiguration"]
      ? item["linuxConfiguration"]
      : osProfileUpdateLinuxConfigurationSerializer(item["linuxConfiguration"]),
    windowsConfiguration: !item["windowsConfiguration"]
      ? item["windowsConfiguration"]
      : osProfileUpdateWindowsConfigurationSerializer(item["windowsConfiguration"]),
  };
}

/** OSProfile update linux configuration */
export interface OsProfileUpdateLinuxConfiguration {
  /** Used to indicate whether Arc for Servers agent onboarding should be triggered during the virtual machine instance creation process. */
  provisionVMAgent?: boolean;
  /** Used to indicate whether the VM Config Agent should be installed during the virtual machine creation process. */
  provisionVMConfigAgent?: boolean;
}

export function osProfileUpdateLinuxConfigurationSerializer(
  item: OsProfileUpdateLinuxConfiguration,
): any {
  return {
    provisionVMAgent: item["provisionVMAgent"],
    provisionVMConfigAgent: item["provisionVMConfigAgent"],
  };
}

/** OSProfile update windows configuration */
export interface OsProfileUpdateWindowsConfiguration {
  /** Used to indicate whether Arc for Servers agent onboarding should be triggered during the virtual machine instance creation process. */
  provisionVMAgent?: boolean;
  /** Used to indicate whether the VM Config Agent should be installed during the virtual machine creation process. */
  provisionVMConfigAgent?: boolean;
}

export function osProfileUpdateWindowsConfigurationSerializer(
  item: OsProfileUpdateWindowsConfiguration,
): any {
  return {
    provisionVMAgent: item["provisionVMAgent"],
    provisionVMConfigAgent: item["provisionVMConfigAgent"],
  };
}

/** Identity for the resource. */
export interface Identity {
  /** The principal ID of resource identity. The value must be an UUID. */
  readonly principalId?: string;
  /** The tenant ID of resource. The value must be an UUID. */
  readonly tenantId?: string;
  /** The identity type. */
  type?: "SystemAssigned";
}

export function identitySerializer(item: Identity): any {
  return { type: item["type"] };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** The response of a VirtualMachineInstance list operation. */
export interface _VirtualMachineInstanceListResult {
  /** The VirtualMachineInstance items on this page */
  value: VirtualMachineInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualMachineInstanceListResultDeserializer(
  item: any,
): _VirtualMachineInstanceListResult {
  return {
    value: virtualMachineInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualMachineInstanceArraySerializer(
  result: Array<VirtualMachineInstance>,
): any[] {
  return result.map((item) => {
    return virtualMachineInstanceSerializer(item);
  });
}

export function virtualMachineInstanceArrayDeserializer(
  result: Array<VirtualMachineInstance>,
): any[] {
  return result.map((item) => {
    return virtualMachineInstanceDeserializer(item);
  });
}

/** The operation gracefully shuts down a virtual machine by requesting the operating system to shut down. The virtual machine can be restarted with the same provisioned resources. To force an immediate shut down, see the skipShutdown flag. */
export interface PowerOffVirtualMachineOptions {
  /** Indicates whether to perform an immediate shut down. When set to true, the VM is forcefully shut down. If not specified, the default value is false, and the operation attempts a graceful shut down of the VM. */
  skipShutdown?: boolean;
}

export function powerOffVirtualMachineOptionsSerializer(item: PowerOffVirtualMachineOptions): any {
  return { skipShutdown: item["skipShutdown"] };
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

/** Defines the HybridIdentityMetadata. */
export interface HybridIdentityMetadata extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: HybridIdentityMetadataProperties;
}

export function hybridIdentityMetadataDeserializer(item: any): HybridIdentityMetadata {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : hybridIdentityMetadataPropertiesDeserializer(item["properties"]),
  };
}

/** Defines the resource properties. */
export interface HybridIdentityMetadataProperties {
  /** The unique identifier for the resource. */
  resourceUid?: string;
  /** The Public Key. */
  publicKey?: string;
  /** Identity for the resource. */
  readonly identity?: Identity;
  /** Provisioning state of the virtual machine instance. */
  readonly provisioningState?: ProvisioningStateEnum;
}

export function hybridIdentityMetadataPropertiesDeserializer(
  item: any,
): HybridIdentityMetadataProperties {
  return {
    resourceUid: item["resourceUid"],
    publicKey: item["publicKey"],
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
    provisioningState: item["provisioningState"],
  };
}

/** The response of a HybridIdentityMetadata list operation. */
export interface _HybridIdentityMetadataListResult {
  /** The HybridIdentityMetadata items on this page */
  value: HybridIdentityMetadata[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _hybridIdentityMetadataListResultDeserializer(
  item: any,
): _HybridIdentityMetadataListResult {
  return {
    value: hybridIdentityMetadataArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function hybridIdentityMetadataArrayDeserializer(
  result: Array<HybridIdentityMetadata>,
): any[] {
  return result.map((item) => {
    return hybridIdentityMetadataDeserializer(item);
  });
}

/** The attestation status of the virtual machine */
export interface AttestationStatus extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: AttestationStatusProperties;
}

export function attestationStatusDeserializer(item: any): AttestationStatus {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : attestationStatusPropertiesDeserializer(item["properties"]),
  };
}

/** Defines the attestation status properties */
export interface AttestationStatusProperties {
  /** The status of whether secure boot is enabled. */
  readonly attestSecureBootEnabled?: AttestSecureBootPropertyEnum;
  /** The status of whether attestation certificate is validated. */
  readonly attestationCertValidated?: AttestCertPropertyEnum;
  /** The status of whether the list of boot integrity properties is validated. */
  readonly bootIntegrityValidated?: AttestBootIntegrityPropertyEnum;
  /** kernel version string for Linux VM. */
  readonly linuxKernelVersion?: string;
  /** The health status of attestation validation and parsing */
  readonly healthStatus?: AttestHealthStatusEnum;
  /** The time stamp of the last time attestation token is validated by relying party service. */
  readonly timestamp?: string;
  /** The error message of attestation validation and parsing */
  readonly errorMessage?: string;
  /** Provisioning state of the virtual machine instance. */
  readonly provisioningState?: ProvisioningStateEnum;
  /** The hardware platform information from attestation token. This only applies to Confidential VM. */
  readonly attestHardwarePlatform?: AttestHWPlatformEnum;
  /** The managed disk security encryption type from attestation token. This only applies to Confidential VM. */
  readonly attestDiskSecurityEncryptionType?: AttestDiskSecurityEncryptionTypeEnum;
}

export function attestationStatusPropertiesDeserializer(item: any): AttestationStatusProperties {
  return {
    attestSecureBootEnabled: item["attestSecureBootEnabled"],
    attestationCertValidated: item["attestationCertValidated"],
    bootIntegrityValidated: item["bootIntegrityValidated"],
    linuxKernelVersion: item["linuxKernelVersion"],
    healthStatus: item["healthStatus"],
    timestamp: item["timestamp"],
    errorMessage: item["errorMessage"],
    provisioningState: item["provisioningState"],
    attestHardwarePlatform: item["attestHardwarePlatform"],
    attestDiskSecurityEncryptionType: item["attestDiskSecurityEncryptionType"],
  };
}

/** The status of whether secure boot is enabled. */
export enum KnownAttestSecureBootPropertyEnum {
  /** Secure boot enabled */
  Enabled = "Enabled",
  /** Secure boot disabled */
  Disabled = "Disabled",
  /** Secure boot status is unknown */
  Unknown = "Unknown",
}

/**
 * The status of whether secure boot is enabled. \
 * {@link KnownAttestSecureBootPropertyEnum} can be used interchangeably with AttestSecureBootPropertyEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Secure boot enabled \
 * **Disabled**: Secure boot disabled \
 * **Unknown**: Secure boot status is unknown
 */
export type AttestSecureBootPropertyEnum = string;

/** The status of whether attestation certificate is validated. */
export enum KnownAttestCertPropertyEnum {
  /** Attestation certificate is valid */
  Valid = "Valid",
  /** Attestation certificate is invalid */
  Invalid = "Invalid",
  /** Attestation certificate status is unknown */
  Unknown = "Unknown",
}

/**
 * The status of whether attestation certificate is validated. \
 * {@link KnownAttestCertPropertyEnum} can be used interchangeably with AttestCertPropertyEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Valid**: Attestation certificate is valid \
 * **Invalid**: Attestation certificate is invalid \
 * **Unknown**: Attestation certificate status is unknown
 */
export type AttestCertPropertyEnum = string;

/** The status of whether the list of boot integrity properties is validated. */
export enum KnownAttestBootIntegrityPropertyEnum {
  /** Boot integrity properties are valid */
  Valid = "Valid",
  /** Boot integrity properties are invalid */
  Invalid = "Invalid",
  /** Boot integrity properties status is unknown */
  Unknown = "Unknown",
}

/**
 * The status of whether the list of boot integrity properties is validated. \
 * {@link KnownAttestBootIntegrityPropertyEnum} can be used interchangeably with AttestBootIntegrityPropertyEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Valid**: Boot integrity properties are valid \
 * **Invalid**: Boot integrity properties are invalid \
 * **Unknown**: Boot integrity properties status is unknown
 */
export type AttestBootIntegrityPropertyEnum = string;

/** The health status of attestation validation and parsing */
export enum KnownAttestHealthStatusEnum {
  /** Attestation validation and parsing pending */
  Pending = "Pending",
  /** Attestation validation and parsing healthy */
  Healthy = "Healthy",
  /** Attestation validation and parsing unhealthy */
  Unhealthy = "Unhealthy",
  /** Attestation validation and parsing status is unknown */
  Unknown = "Unknown",
}

/**
 * The health status of attestation validation and parsing \
 * {@link KnownAttestHealthStatusEnum} can be used interchangeably with AttestHealthStatusEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Attestation validation and parsing pending \
 * **Healthy**: Attestation validation and parsing healthy \
 * **Unhealthy**: Attestation validation and parsing unhealthy \
 * **Unknown**: Attestation validation and parsing status is unknown
 */
export type AttestHealthStatusEnum = string;

/** Defines type of hardware platform from attestation token. */
export enum KnownAttestHWPlatformEnum {
  /** AttestHWPlatform is Secure Encrypted Virtualization Secure Nested Paging (SEVSNP) */
  Sevsnp = "SEVSNP",
  /** AttestHWPlatform is unknown */
  Unknown = "Unknown",
}

/**
 * Defines type of hardware platform from attestation token. \
 * {@link KnownAttestHWPlatformEnum} can be used interchangeably with AttestHWPlatformEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SEVSNP**: AttestHWPlatform is Secure Encrypted Virtualization Secure Nested Paging (SEVSNP) \
 * **Unknown**: AttestHWPlatform is unknown
 */
export type AttestHWPlatformEnum = string;

/** Defines type of managed disk security encryption type from attestation token. */
export enum KnownAttestDiskSecurityEncryptionTypeEnum {
  /** Disk security encryption type is non-persisted Trusted Platform Module (TPM) */
  NonPersistedTPM = "NonPersistedTPM",
  /** Disk security encryption type is unknown */
  Unknown = "Unknown",
}

/**
 * Defines type of managed disk security encryption type from attestation token. \
 * {@link KnownAttestDiskSecurityEncryptionTypeEnum} can be used interchangeably with AttestDiskSecurityEncryptionTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NonPersistedTPM**: Disk security encryption type is non-persisted Trusted Platform Module (TPM) \
 * **Unknown**: Disk security encryption type is unknown
 */
export type AttestDiskSecurityEncryptionTypeEnum = string;

/** Defines the GuestAgent. */
export interface GuestAgent extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: GuestAgentProperties;
}

export function guestAgentSerializer(item: GuestAgent): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : guestAgentPropertiesSerializer(item["properties"]),
  };
}

export function guestAgentDeserializer(item: any): GuestAgent {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : guestAgentPropertiesDeserializer(item["properties"]),
  };
}

/** Defines the resource properties. */
export interface GuestAgentProperties {
  /** Username / Password Credentials to provision guest agent. */
  credentials?: GuestCredential;
  /** The guest agent provisioning action. */
  provisioningAction?: ProvisioningAction;
  /** The guest agent status. */
  readonly status?: string;
  /** Provisioning state of the virtual machine instance. */
  readonly provisioningState?: ProvisioningStateEnum;
}

export function guestAgentPropertiesSerializer(item: GuestAgentProperties): any {
  return {
    credentials: !item["credentials"]
      ? item["credentials"]
      : guestCredentialSerializer(item["credentials"]),
    provisioningAction: item["provisioningAction"],
  };
}

export function guestAgentPropertiesDeserializer(item: any): GuestAgentProperties {
  return {
    credentials: !item["credentials"]
      ? item["credentials"]
      : guestCredentialDeserializer(item["credentials"]),
    provisioningAction: item["provisioningAction"],
    status: item["status"],
    provisioningState: item["provisioningState"],
  };
}

/** Username / Password Credentials to connect to guest. */
export interface GuestCredential {
  /** The username to connect with the guest. */
  username?: string;
  /** The password to connect with the guest. */
  password?: string;
}

export function guestCredentialSerializer(item: GuestCredential): any {
  return { username: item["username"], password: item["password"] };
}

export function guestCredentialDeserializer(item: any): GuestCredential {
  return {
    username: item["username"],
    password: item["password"],
  };
}

/** Defines the different types of operations for guest agent. */
export enum KnownProvisioningAction {
  /** Install guest agent */
  Install = "install",
  /** Uninstall guest agent */
  Uninstall = "uninstall",
  /** Repair guest agent */
  Repair = "repair",
}

/**
 * Defines the different types of operations for guest agent. \
 * {@link KnownProvisioningAction} can be used interchangeably with ProvisioningAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **install**: Install guest agent \
 * **uninstall**: Uninstall guest agent \
 * **repair**: Repair guest agent
 */
export type ProvisioningAction = string;

/** The response of a GuestAgent list operation. */
export interface _GuestAgentListResult {
  /** The GuestAgent items on this page */
  value: GuestAgent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _guestAgentListResultDeserializer(item: any): _GuestAgentListResult {
  return {
    value: guestAgentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function guestAgentArraySerializer(result: Array<GuestAgent>): any[] {
  return result.map((item) => {
    return guestAgentSerializer(item);
  });
}

export function guestAgentArrayDeserializer(result: Array<GuestAgent>): any[] {
  return result.map((item) => {
    return guestAgentDeserializer(item);
  });
}

/** The virtual network resource definition. */
export interface VirtualNetwork extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: VirtualNetworkProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function virtualNetworkSerializer(item: VirtualNetwork): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualNetworkPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function virtualNetworkDeserializer(item: any): VirtualNetwork {
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
      : virtualNetworkPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Virtual network resource properties */
export interface VirtualNetworkProperties {
  /** Virtual Network address space. All subnets must be within the defined range. */
  addressSpace: VirtualNetworkAddressSpace;
  /** Virtual Network DHCP options. Inherited by all subnets and VMs. */
  dhcpOptions: VirtualNetworkDhcpOptions;
  /** The provisioning state of the virtual network resource. */
  readonly provisioningState?: ProvisioningStateEnum;
  /** The observed status of Virtual Network */
  status?: VirtualNetworkStatus;
}

export function virtualNetworkPropertiesSerializer(item: VirtualNetworkProperties): any {
  return {
    addressSpace: virtualNetworkAddressSpaceSerializer(item["addressSpace"]),
    dhcpOptions: virtualNetworkDhcpOptionsSerializer(item["dhcpOptions"]),
    status: !item["status"] ? item["status"] : virtualNetworkStatusSerializer(item["status"]),
  };
}

export function virtualNetworkPropertiesDeserializer(item: any): VirtualNetworkProperties {
  return {
    addressSpace: virtualNetworkAddressSpaceDeserializer(item["addressSpace"]),
    dhcpOptions: virtualNetworkDhcpOptionsDeserializer(item["dhcpOptions"]),
    provisioningState: item["provisioningState"],
    status: !item["status"] ? item["status"] : virtualNetworkStatusDeserializer(item["status"]),
  };
}

/** Address Space Information */
export interface VirtualNetworkAddressSpace {
  /** A list of one or more CIDR blocks that define the address space. */
  addressPrefixes: string[];
}

export function virtualNetworkAddressSpaceSerializer(item: VirtualNetworkAddressSpace): any {
  return {
    addressPrefixes: item["addressPrefixes"].map((p: any) => {
      return p;
    }),
  };
}

export function virtualNetworkAddressSpaceDeserializer(item: any): VirtualNetworkAddressSpace {
  return {
    addressPrefixes: item["addressPrefixes"].map((p: any) => {
      return p;
    }),
  };
}

/** DHCP options for virtual networks */
export interface VirtualNetworkDhcpOptions {
  /** An array of DNS server IP addresses that VMs or wokloads in the vnet can inherit */
  dnsServers?: string[];
}

export function virtualNetworkDhcpOptionsSerializer(item: VirtualNetworkDhcpOptions): any {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
  };
}

export function virtualNetworkDhcpOptionsDeserializer(item: any): VirtualNetworkDhcpOptions {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
  };
}

/** The observed status of the virtual network */
export interface VirtualNetworkStatus {
  /** VirtualNetwork provisioning error code */
  errorCode?: string;
  /** Descriptive error message */
  errorMessage?: string;
  /** virtual network provisioning status */
  provisioningStatus?: VirtualNetworkStatusProvisioningStatus;
}

export function virtualNetworkStatusSerializer(item: VirtualNetworkStatus): any {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : virtualNetworkStatusProvisioningStatusSerializer(item["provisioningStatus"]),
  };
}

export function virtualNetworkStatusDeserializer(item: any): VirtualNetworkStatus {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : virtualNetworkStatusProvisioningStatusDeserializer(item["provisioningStatus"]),
  };
}

/** Status of virtual network operations */
export interface VirtualNetworkStatusProvisioningStatus {
  /** The ID of the operation performed on the virtual network */
  operationId?: string;
  /** The status of the operation performed on the virtual network [Succeeded, Failed, InProgress] */
  status?: Status;
}

export function virtualNetworkStatusProvisioningStatusSerializer(
  item: VirtualNetworkStatusProvisioningStatus,
): any {
  return { operationId: item["operationId"], status: item["status"] };
}

export function virtualNetworkStatusProvisioningStatusDeserializer(
  item: any,
): VirtualNetworkStatusProvisioningStatus {
  return {
    operationId: item["operationId"],
    status: item["status"],
  };
}

/** The type used for updating tags in VirtualNetwork resources. */
export interface VirtualNetworkTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function virtualNetworkTagsUpdateSerializer(item: VirtualNetworkTagsUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a VirtualNetwork list operation. */
export interface _VirtualNetworkListResult {
  /** The VirtualNetwork items on this page */
  value: VirtualNetwork[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualNetworkListResultDeserializer(item: any): _VirtualNetworkListResult {
  return {
    value: virtualNetworkArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualNetworkArraySerializer(result: Array<VirtualNetwork>): any[] {
  return result.map((item) => {
    return virtualNetworkSerializer(item);
  });
}

export function virtualNetworkArrayDeserializer(result: Array<VirtualNetwork>): any[] {
  return result.map((item) => {
    return virtualNetworkDeserializer(item);
  });
}

/** The virtual network resource definition. */
export interface VirtualNetworkSubnet extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: VirtualNetworkSubnetProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function virtualNetworkSubnetSerializer(item: VirtualNetworkSubnet): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : virtualNetworkSubnetPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function virtualNetworkSubnetDeserializer(item: any): VirtualNetworkSubnet {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : virtualNetworkSubnetPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** VirtualNetwork subnet resource */
export interface VirtualNetworkSubnetProperties {
  /** Subnet CIDR */
  addressPrefix: string;
  /** Network Security Group attached to the subnet. */
  networkSecurityGroup?: NetworkSecurityGroupArmReference;
  /** Nat Gateway attached to the subnet for non-vnet traffic. */
  natGateway?: NatGatewayArmReference;
  /** RouteTable defining custom routes for the subnet. */
  routeTable?: RouteTable;
  /** List of ip configurations for the subnet */
  readonly ipConfigurations?: VirtualNetworkSubnetIpConfigurationReference[];
  /** The provisioning state of the virtual network subnet resource. */
  readonly provisioningState?: ProvisioningStateEnum;
  /** The observed status of the virtual network subnet resource. */
  readonly status?: VirtualNetworkSubnetStatus;
}

export function virtualNetworkSubnetPropertiesSerializer(
  item: VirtualNetworkSubnetProperties,
): any {
  return {
    addressPrefix: item["addressPrefix"],
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupArmReferenceSerializer(item["networkSecurityGroup"]),
    natGateway: !item["natGateway"]
      ? item["natGateway"]
      : natGatewayArmReferenceSerializer(item["natGateway"]),
    routeTable: !item["routeTable"] ? item["routeTable"] : routeTableSerializer(item["routeTable"]),
  };
}

export function virtualNetworkSubnetPropertiesDeserializer(
  item: any,
): VirtualNetworkSubnetProperties {
  return {
    addressPrefix: item["addressPrefix"],
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupArmReferenceDeserializer(item["networkSecurityGroup"]),
    natGateway: !item["natGateway"]
      ? item["natGateway"]
      : natGatewayArmReferenceDeserializer(item["natGateway"]),
    routeTable: !item["routeTable"]
      ? item["routeTable"]
      : routeTableDeserializer(item["routeTable"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : virtualNetworkSubnetIpConfigurationReferenceArrayDeserializer(item["ipConfigurations"]),
    provisioningState: item["provisioningState"],
    status: !item["status"]
      ? item["status"]
      : virtualNetworkSubnetStatusDeserializer(item["status"]),
  };
}

/** The ARM ID for a Network Security Group. */
export interface NatGatewayArmReference {
  /** The ARM ID for a Network Security Group. */
  resourceId?: string;
}

export function natGatewayArmReferenceSerializer(item: NatGatewayArmReference): any {
  return { resourceId: item["resourceId"] };
}

export function natGatewayArmReferenceDeserializer(item: any): NatGatewayArmReference {
  return {
    resourceId: item["resourceId"],
  };
}

export function virtualNetworkSubnetIpConfigurationReferenceArrayDeserializer(
  result: Array<VirtualNetworkSubnetIpConfigurationReference>,
): any[] {
  return result.map((item) => {
    return virtualNetworkSubnetIpConfigurationReferenceDeserializer(item);
  });
}

/** The Azure Resource ID for a resource consuming IP on a subnet */
export interface VirtualNetworkSubnetIpConfigurationReference {
  /** The Azure Resource ID for a Network Interface. */
  id?: string;
}

export function virtualNetworkSubnetIpConfigurationReferenceDeserializer(
  item: any,
): VirtualNetworkSubnetIpConfigurationReference {
  return {
    id: item["id"],
  };
}

/** Status of virtual network subnet operations */
export interface VirtualNetworkSubnetStatus {
  /** VirtualNetworkSubnet provisioning error code */
  errorCode?: string;
  /** Descriptive error message */
  errorMessage?: string;
  /** Public IP provisioning status */
  provisioningStatus?: VirtualNetworkSubnetStatusProvisioningStatus;
}

export function virtualNetworkSubnetStatusDeserializer(item: any): VirtualNetworkSubnetStatus {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : virtualNetworkSubnetStatusProvisioningStatusDeserializer(item["provisioningStatus"]),
  };
}

/** Status of virtual network subnet operations */
export interface VirtualNetworkSubnetStatusProvisioningStatus {
  /** The ID of the operation performed on the virtual network subnet */
  operationId?: string;
  /** The status of the operation performed on the virtual network subnet [Succeeded, Failed, InProgress] */
  status?: Status;
}

export function virtualNetworkSubnetStatusProvisioningStatusDeserializer(
  item: any,
): VirtualNetworkSubnetStatusProvisioningStatus {
  return {
    operationId: item["operationId"],
    status: item["status"],
  };
}

/** The virtual network subnet resource patch definition. */
export interface VirtualNetworkSubnetUpdateRequest {
  /** properties to update */
  properties?: VirtualNetworkSubnetUpdateProperties;
}

export function virtualNetworkSubnetUpdateRequestSerializer(
  item: VirtualNetworkSubnetUpdateRequest,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : virtualNetworkSubnetUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The virtual network subnet resource patch properties definition. */
export interface VirtualNetworkSubnetUpdateProperties {
  /** NetworkSecurityGroup - Network Security Group attached to the subnet. */
  networkSecurityGroup?: NetworkSecurityGroupArmReference;
  /** NatGateway - NatGateway attached to the subnet. */
  natGateway?: NatGatewayArmReference;
}

export function virtualNetworkSubnetUpdatePropertiesSerializer(
  item: VirtualNetworkSubnetUpdateProperties,
): any {
  return {
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupArmReferenceSerializer(item["networkSecurityGroup"]),
    natGateway: !item["natGateway"]
      ? item["natGateway"]
      : natGatewayArmReferenceSerializer(item["natGateway"]),
  };
}

/** The response of a VirtualNetworkSubnet list operation. */
export interface _VirtualNetworkSubnetListResult {
  /** The VirtualNetworkSubnet items on this page */
  value: VirtualNetworkSubnet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _virtualNetworkSubnetListResultDeserializer(
  item: any,
): _VirtualNetworkSubnetListResult {
  return {
    value: virtualNetworkSubnetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualNetworkSubnetArraySerializer(result: Array<VirtualNetworkSubnet>): any[] {
  return result.map((item) => {
    return virtualNetworkSubnetSerializer(item);
  });
}

export function virtualNetworkSubnetArrayDeserializer(result: Array<VirtualNetworkSubnet>): any[] {
  return result.map((item) => {
    return virtualNetworkSubnetDeserializer(item);
  });
}

/** The publicIP resource definition. */
export interface PublicIPAddress extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: PublicIPAddressProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function publicIPAddressSerializer(item: PublicIPAddress): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : publicIPAddressPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function publicIPAddressDeserializer(item: any): PublicIPAddress {
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
      : publicIPAddressPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Public IP Properties resource. */
export interface PublicIPAddressProperties {
  /** Whether the public IP is v4 or v6. Defaults to IPv4 */
  publicIPAddressVersion?: PublicIPAddressType;
  /** ipAllocationScope: Azure Reference to a particular IP Pool (ALM) or a LogicalNetwork (ALL) for allocating public IP */
  ipAllocationScope?: string;
  /** IP Address. This is static. If the user specifies, we allocate that otherwise allocate from logical network address space. */
  ipAddress?: string;
  /** network interface or LoadBalancer frontendIPconfiguration using this public IP */
  readonly ipConfiguration?: IPConfigurationArmReference;
  /** natGateway using this public IP */
  readonly natGateway?: NatGatewayArmReference;
  /** Provisioning state of the public IP */
  readonly provisioningState?: ProvisioningStateEnum;
}

export function publicIPAddressPropertiesSerializer(item: PublicIPAddressProperties): any {
  return {
    publicIPAddressVersion: item["publicIPAddressVersion"],
    ipAllocationScope: item["ipAllocationScope"],
    ipAddress: item["ipAddress"],
  };
}

export function publicIPAddressPropertiesDeserializer(item: any): PublicIPAddressProperties {
  return {
    publicIPAddressVersion: item["publicIPAddressVersion"],
    ipAllocationScope: item["ipAllocationScope"],
    ipAddress: item["ipAddress"],
    ipConfiguration: !item["ipConfiguration"]
      ? item["ipConfiguration"]
      : ipConfigurationArmReferenceDeserializer(item["ipConfiguration"]),
    natGateway: !item["natGateway"]
      ? item["natGateway"]
      : natGatewayArmReferenceDeserializer(item["natGateway"]),
    provisioningState: item["provisioningState"],
  };
}

/** Type of public IP addresses */
export enum KnownPublicIPAddressType {
  /** IPv4 IP Address */
  IPv4 = "IPv4",
  /** IPv6 IP Address */
  IPv6 = "IPv6",
}

/**
 * Type of public IP addresses \
 * {@link KnownPublicIPAddressType} can be used interchangeably with PublicIPAddressType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**: IPv4 IP Address \
 * **IPv6**: IPv6 IP Address
 */
export type PublicIPAddressType = string;

/** The Azure Resource ID of an IPConfiguration resource */
export interface IPConfigurationArmReference {
  /** The Azure Resource ID of an IPConfiguration resource */
  resourceId?: string;
}

export function ipConfigurationArmReferenceSerializer(item: IPConfigurationArmReference): any {
  return { resourceId: item["resourceId"] };
}

export function ipConfigurationArmReferenceDeserializer(item: any): IPConfigurationArmReference {
  return {
    resourceId: item["resourceId"],
  };
}

/** The type used for updating tags in PublicIPAddress resources. */
export interface PublicIPAddressTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function publicIPAddressTagsUpdateSerializer(item: PublicIPAddressTagsUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a PublicIPAddress list operation. */
export interface _PublicIPAddressListResult {
  /** The PublicIPAddress items on this page */
  value: PublicIPAddress[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _publicIPAddressListResultDeserializer(item: any): _PublicIPAddressListResult {
  return {
    value: publicIPAddressArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function publicIPAddressArraySerializer(result: Array<PublicIPAddress>): any[] {
  return result.map((item) => {
    return publicIPAddressSerializer(item);
  });
}

export function publicIPAddressArrayDeserializer(result: Array<PublicIPAddress>): any[] {
  return result.map((item) => {
    return publicIPAddressDeserializer(item);
  });
}

/** The NatGateway resource definition. */
export interface NatGateway extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: NatGatewayProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function natGatewaySerializer(item: NatGateway): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : natGatewayPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function natGatewayDeserializer(item: any): NatGateway {
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
      : natGatewayPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Nat Gateway resource properties */
export interface NatGatewayProperties {
  /** List of public ip addresses that the gateway can use for NAT. */
  publicIPAddresses?: PublicIPAddressArmReference[];
  /** List of subnets associated with the nat gateway. These can only be vnet subnets and must be from the same vnet */
  readonly subnets?: VirtualNetworkSubnetArmReference[];
  /** Provisioning state of the public IP */
  readonly provisioningState?: ProvisioningStateEnum;
  /** The observed state of Nat Gateway */
  readonly status?: NatGatewayStatus;
}

export function natGatewayPropertiesSerializer(item: NatGatewayProperties): any {
  return {
    publicIPAddresses: !item["publicIPAddresses"]
      ? item["publicIPAddresses"]
      : publicIPAddressArmReferenceArraySerializer(item["publicIPAddresses"]),
  };
}

export function natGatewayPropertiesDeserializer(item: any): NatGatewayProperties {
  return {
    publicIPAddresses: !item["publicIPAddresses"]
      ? item["publicIPAddresses"]
      : publicIPAddressArmReferenceArrayDeserializer(item["publicIPAddresses"]),
    subnets: !item["subnets"]
      ? item["subnets"]
      : virtualNetworkSubnetArmReferenceArrayDeserializer(item["subnets"]),
    provisioningState: item["provisioningState"],
    status: !item["status"] ? item["status"] : natGatewayStatusDeserializer(item["status"]),
  };
}

export function publicIPAddressArmReferenceArraySerializer(
  result: Array<PublicIPAddressArmReference>,
): any[] {
  return result.map((item) => {
    return publicIPAddressArmReferenceSerializer(item);
  });
}

export function publicIPAddressArmReferenceArrayDeserializer(
  result: Array<PublicIPAddressArmReference>,
): any[] {
  return result.map((item) => {
    return publicIPAddressArmReferenceDeserializer(item);
  });
}

/** The Azure Resource ID of a Public IP resource */
export interface PublicIPAddressArmReference {
  /** The Azure Resource ID of a Public IP resource */
  resourceId?: string;
}

export function publicIPAddressArmReferenceSerializer(item: PublicIPAddressArmReference): any {
  return { resourceId: item["resourceId"] };
}

export function publicIPAddressArmReferenceDeserializer(item: any): PublicIPAddressArmReference {
  return {
    resourceId: item["resourceId"],
  };
}

export function virtualNetworkSubnetArmReferenceArraySerializer(
  result: Array<VirtualNetworkSubnetArmReference>,
): any[] {
  return result.map((item) => {
    return virtualNetworkSubnetArmReferenceSerializer(item);
  });
}

export function virtualNetworkSubnetArmReferenceArrayDeserializer(
  result: Array<VirtualNetworkSubnetArmReference>,
): any[] {
  return result.map((item) => {
    return virtualNetworkSubnetArmReferenceDeserializer(item);
  });
}

/** The Azure Resource ID for a Virtual Network subnet */
export interface VirtualNetworkSubnetArmReference {
  /** The Azure Resource ID for a Virtual Network subnet. */
  resourceId?: string;
}

export function virtualNetworkSubnetArmReferenceSerializer(
  item: VirtualNetworkSubnetArmReference,
): any {
  return { resourceId: item["resourceId"] };
}

export function virtualNetworkSubnetArmReferenceDeserializer(
  item: any,
): VirtualNetworkSubnetArmReference {
  return {
    resourceId: item["resourceId"],
  };
}

/** Nat Gateway resource status */
export interface NatGatewayStatus {
  /** NatGateway provisioning error code */
  errorCode?: string;
  /** Descriptive error message */
  errorMessage?: string;
  /** NatGateway provisioning status */
  provisioningStatus?: NatGatewayStatusProvisioningStatus;
}

export function natGatewayStatusDeserializer(item: any): NatGatewayStatus {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : natGatewayStatusProvisioningStatusDeserializer(item["provisioningStatus"]),
  };
}

/** Provisioning status of Nat Gateway */
export interface NatGatewayStatusProvisioningStatus {
  /** The ID of the operation performed on the nat gateway */
  operationId?: string;
  /** The status of the operation performed on the nat gateway [Succeeded, Failed, InProgress] */
  status?: Status;
}

export function natGatewayStatusProvisioningStatusDeserializer(
  item: any,
): NatGatewayStatusProvisioningStatus {
  return {
    operationId: item["operationId"],
    status: item["status"],
  };
}

/** The type used for updating tags in NatGateway resources. */
export interface NatGatewayTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function natGatewayTagsUpdateSerializer(item: NatGatewayTagsUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a NatGateway list operation. */
export interface _NatGatewayListResult {
  /** The NatGateway items on this page */
  value: NatGateway[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _natGatewayListResultDeserializer(item: any): _NatGatewayListResult {
  return {
    value: natGatewayArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function natGatewayArraySerializer(result: Array<NatGateway>): any[] {
  return result.map((item) => {
    return natGatewaySerializer(item);
  });
}

export function natGatewayArrayDeserializer(result: Array<NatGateway>): any[] {
  return result.map((item) => {
    return natGatewayDeserializer(item);
  });
}

/** The inbound rule resource definition. */
export interface InboundRule extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: InboundRuleProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function inboundRuleSerializer(item: InboundRule): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : inboundRulePropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function inboundRuleDeserializer(item: any): InboundRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : inboundRulePropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Inbound rule properties - extends InboundNATRuleProperties with additional status tracking */
export interface InboundRuleProperties {
  /** Protocol for the NAT rule */
  protocol: InboundNATRuleProtocol;
  /** Frontend Port for the inbound rule */
  frontendPort: number;
  /** backend Port for the inbound rule */
  backendPort: number;
  /** IP configuration for the target backend. */
  backendIPConfiguration: IPConfigurationArmReference;
  /** Public IP Address for this NAT rule */
  publicIPAddress: PublicIPAddressArmReference;
  /** Provisioning state of the inbound rule */
  readonly provisioningState?: ProvisioningStateEnum;
  /** The observed state of Inbound Rule */
  readonly status?: InboundRuleStatus;
}

export function inboundRulePropertiesSerializer(item: InboundRuleProperties): any {
  return {
    protocol: item["protocol"],
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
    backendIPConfiguration: ipConfigurationArmReferenceSerializer(item["backendIPConfiguration"]),
    publicIPAddress: publicIPAddressArmReferenceSerializer(item["publicIPAddress"]),
  };
}

export function inboundRulePropertiesDeserializer(item: any): InboundRuleProperties {
  return {
    protocol: item["protocol"],
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
    backendIPConfiguration: ipConfigurationArmReferenceDeserializer(item["backendIPConfiguration"]),
    publicIPAddress: publicIPAddressArmReferenceDeserializer(item["publicIPAddress"]),
    provisioningState: item["provisioningState"],
    status: !item["status"] ? item["status"] : inboundRuleStatusDeserializer(item["status"]),
  };
}

/** Protocol for inbound NAT rules */
export enum KnownInboundNATRuleProtocol {
  /** TCP - load balance only tcp traffic */
  TCP = "Tcp",
  /** Udp - load balance only UDP traffic */
  UDP = "Udp",
}

/**
 * Protocol for inbound NAT rules \
 * {@link KnownInboundNATRuleProtocol} can be used interchangeably with InboundNATRuleProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Tcp**: TCP - load balance only tcp traffic \
 * **Udp**: Udp - load balance only UDP traffic
 */
export type InboundNATRuleProtocol = string;

/** The observed state of inbound rule */
export interface InboundRuleStatus {
  /** InboundRule provisioning error code */
  errorCode?: string;
  /** Descriptive error message */
  errorMessage?: string;
  /** InboundRule provisioning status */
  provisioningStatus?: InboundRuleStatusProvisioningStatus;
}

export function inboundRuleStatusDeserializer(item: any): InboundRuleStatus {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : inboundRuleStatusProvisioningStatusDeserializer(item["provisioningStatus"]),
  };
}

/** Provisioning status of Inbound Rule */
export interface InboundRuleStatusProvisioningStatus {
  /** The ID of the operation performed on the inbound rule */
  operationId?: string;
  /** The status of the operation performed on the inbound rule [Succeeded, Failed, InProgress] */
  status?: Status;
}

export function inboundRuleStatusProvisioningStatusDeserializer(
  item: any,
): InboundRuleStatusProvisioningStatus {
  return {
    operationId: item["operationId"],
    status: item["status"],
  };
}

/** The response of a InboundRule list operation. */
export interface _InboundRuleListResult {
  /** The InboundRule items on this page */
  value: InboundRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _inboundRuleListResultDeserializer(item: any): _InboundRuleListResult {
  return {
    value: inboundRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function inboundRuleArraySerializer(result: Array<InboundRule>): any[] {
  return result.map((item) => {
    return inboundRuleSerializer(item);
  });
}

export function inboundRuleArrayDeserializer(result: Array<InboundRule>): any[] {
  return result.map((item) => {
    return inboundRuleDeserializer(item);
  });
}

/** The LoadBalancer resource definition. */
export interface LoadBalancer extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: LoadBalancerProperties;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
}

export function loadBalancerSerializer(item: LoadBalancer): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : loadBalancerPropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function loadBalancerDeserializer(item: any): LoadBalancer {
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
      : loadBalancerPropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Load Balancer resource properties */
export interface LoadBalancerProperties {
  /** Frontend IPs for the loadbalancer. */
  frontendIPConfigurations: FrontendIPConfiguration[];
  /** backendAddressPools for the loadbalancer */
  backendAddressPools?: BackendAddressPool[];
  /** load balancer rules */
  loadBalancingRules?: LoadBalancerRule[];
  /** load balancer health probes */
  probes?: Probe[];
  /** Provisioning state of the Load Balancer */
  readonly provisioningState?: ProvisioningStateEnum;
  /** observed state of the load balancer */
  readonly status?: LoadBalancerStatus;
}

export function loadBalancerPropertiesSerializer(item: LoadBalancerProperties): any {
  return {
    frontendIPConfigurations: frontendIPConfigurationArraySerializer(
      item["frontendIPConfigurations"],
    ),
    backendAddressPools: !item["backendAddressPools"]
      ? item["backendAddressPools"]
      : backendAddressPoolArraySerializer(item["backendAddressPools"]),
    loadBalancingRules: !item["loadBalancingRules"]
      ? item["loadBalancingRules"]
      : loadBalancerRuleArraySerializer(item["loadBalancingRules"]),
    probes: !item["probes"] ? item["probes"] : probeArraySerializer(item["probes"]),
  };
}

export function loadBalancerPropertiesDeserializer(item: any): LoadBalancerProperties {
  return {
    frontendIPConfigurations: frontendIPConfigurationArrayDeserializer(
      item["frontendIPConfigurations"],
    ),
    backendAddressPools: !item["backendAddressPools"]
      ? item["backendAddressPools"]
      : backendAddressPoolArrayDeserializer(item["backendAddressPools"]),
    loadBalancingRules: !item["loadBalancingRules"]
      ? item["loadBalancingRules"]
      : loadBalancerRuleArrayDeserializer(item["loadBalancingRules"]),
    probes: !item["probes"] ? item["probes"] : probeArrayDeserializer(item["probes"]),
    provisioningState: item["provisioningState"],
    status: !item["status"] ? item["status"] : loadBalancerStatusDeserializer(item["status"]),
  };
}

export function frontendIPConfigurationArraySerializer(
  result: Array<FrontendIPConfiguration>,
): any[] {
  return result.map((item) => {
    return frontendIPConfigurationSerializer(item);
  });
}

export function frontendIPConfigurationArrayDeserializer(
  result: Array<FrontendIPConfiguration>,
): any[] {
  return result.map((item) => {
    return frontendIPConfigurationDeserializer(item);
  });
}

/** FrontendIP Configuration object for a load balancer. */
export interface FrontendIPConfiguration {
  /** name for the frontend IP configuration. */
  name: string;
  /** properties for this frontendIPConfiguration */
  properties: FrontendIPConfigurationProperties;
}

export function frontendIPConfigurationSerializer(item: FrontendIPConfiguration): any {
  return {
    name: item["name"],
    properties: frontendIPConfigurationPropertiesSerializer(item["properties"]),
  };
}

export function frontendIPConfigurationDeserializer(item: any): FrontendIPConfiguration {
  return {
    name: item["name"],
    properties: frontendIPConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** FrontendIP Configuration object for a load balancer. */
export interface FrontendIPConfigurationProperties {
  /** Private IP Address that was allocated (dynamic) or is to be allocated (static) from the subnet. */
  privateIPAddress?: string;
  /** privateIPAllocationMethod - set to Static for requesting a specific IP */
  privateIPAllocationMethod?: IpAllocationMethodEnum;
  /** subnet - the subnet from which to allocate the private IP */
  subnet?: VirtualNetworkSubnetArmReference;
  /** Public IP */
  publicIPAddress?: PublicIPAddressArmReference;
}

export function frontendIPConfigurationPropertiesSerializer(
  item: FrontendIPConfigurationProperties,
): any {
  return {
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    subnet: !item["subnet"]
      ? item["subnet"]
      : virtualNetworkSubnetArmReferenceSerializer(item["subnet"]),
    publicIPAddress: !item["publicIPAddress"]
      ? item["publicIPAddress"]
      : publicIPAddressArmReferenceSerializer(item["publicIPAddress"]),
  };
}

export function frontendIPConfigurationPropertiesDeserializer(
  item: any,
): FrontendIPConfigurationProperties {
  return {
    privateIPAddress: item["privateIPAddress"],
    privateIPAllocationMethod: item["privateIPAllocationMethod"],
    subnet: !item["subnet"]
      ? item["subnet"]
      : virtualNetworkSubnetArmReferenceDeserializer(item["subnet"]),
    publicIPAddress: !item["publicIPAddress"]
      ? item["publicIPAddress"]
      : publicIPAddressArmReferenceDeserializer(item["publicIPAddress"]),
  };
}

export function backendAddressPoolArraySerializer(result: Array<BackendAddressPool>): any[] {
  return result.map((item) => {
    return backendAddressPoolSerializer(item);
  });
}

export function backendAddressPoolArrayDeserializer(result: Array<BackendAddressPool>): any[] {
  return result.map((item) => {
    return backendAddressPoolDeserializer(item);
  });
}

/** Backend address pool for the load balancer. */
export interface BackendAddressPool {
  /** name of the backend pool. */
  name: string;
  /** properties for the backend pool */
  properties: BackendAddressPoolProperties;
}

export function backendAddressPoolSerializer(item: BackendAddressPool): any {
  return {
    name: item["name"],
    properties: backendAddressPoolPropertiesSerializer(item["properties"]),
  };
}

export function backendAddressPoolDeserializer(item: any): BackendAddressPool {
  return {
    name: item["name"],
    properties: backendAddressPoolPropertiesDeserializer(item["properties"]),
  };
}

/** Backend address pool for the load balancer. */
export interface BackendAddressPoolProperties {
  /** List of backend addresses for the backend pool */
  loadBalancerBackendAddresses?: LoadBalancerBackendAddress[];
  /** Reference to the virtual network for this backend pool. Mutually exclusive with logicalNetwork */
  virtualNetwork?: VirtualNetworkArmReference;
  /** Reference to the logical network for this backend pool. Mutually exclusive with virtualNetwork */
  logicalNetwork?: LogicalNetworkArmReference;
}

export function backendAddressPoolPropertiesSerializer(item: BackendAddressPoolProperties): any {
  return {
    loadBalancerBackendAddresses: !item["loadBalancerBackendAddresses"]
      ? item["loadBalancerBackendAddresses"]
      : loadBalancerBackendAddressArraySerializer(item["loadBalancerBackendAddresses"]),
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : virtualNetworkArmReferenceSerializer(item["virtualNetwork"]),
    logicalNetwork: !item["logicalNetwork"]
      ? item["logicalNetwork"]
      : logicalNetworkArmReferenceSerializer(item["logicalNetwork"]),
  };
}

export function backendAddressPoolPropertiesDeserializer(item: any): BackendAddressPoolProperties {
  return {
    loadBalancerBackendAddresses: !item["loadBalancerBackendAddresses"]
      ? item["loadBalancerBackendAddresses"]
      : loadBalancerBackendAddressArrayDeserializer(item["loadBalancerBackendAddresses"]),
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : virtualNetworkArmReferenceDeserializer(item["virtualNetwork"]),
    logicalNetwork: !item["logicalNetwork"]
      ? item["logicalNetwork"]
      : logicalNetworkArmReferenceDeserializer(item["logicalNetwork"]),
  };
}

export function loadBalancerBackendAddressArraySerializer(
  result: Array<LoadBalancerBackendAddress>,
): any[] {
  return result.map((item) => {
    return loadBalancerBackendAddressSerializer(item);
  });
}

export function loadBalancerBackendAddressArrayDeserializer(
  result: Array<LoadBalancerBackendAddress>,
): any[] {
  return result.map((item) => {
    return loadBalancerBackendAddressDeserializer(item);
  });
}

/** LoadBalancer Backend Address */
export interface LoadBalancerBackendAddress {
  /** name of the backend address */
  name: string;
  /** backend address properties */
  properties: LoadBalancerBackendAddressProperties;
}

export function loadBalancerBackendAddressSerializer(item: LoadBalancerBackendAddress): any {
  return {
    name: item["name"],
    properties: loadBalancerBackendAddressPropertiesSerializer(item["properties"]),
  };
}

export function loadBalancerBackendAddressDeserializer(item: any): LoadBalancerBackendAddress {
  return {
    name: item["name"],
    properties: loadBalancerBackendAddressPropertiesDeserializer(item["properties"]),
  };
}

/** LoadBalancer Backend Address properties */
export interface LoadBalancerBackendAddressProperties {
  /** admin state - if set to false, the address is removed from the pool */
  adminState?: LoadBalancerBackendAddressAdminState;
  /** IP address of the backend target. Populated automatically from the referenced IP configuration. */
  readonly ipAddress?: string;
  /** Reference to the subnet containing the backend address. Populated automatically from the referenced IP configuration. Mutually exclusive with logicalNetwork. */
  readonly subnet?: VirtualNetworkSubnetArmReference;
  /** Reference to the virtual network containing the backend address. Populated automatically from the referenced IP configuration. Mutually exclusive with logicalNetwork. */
  readonly virtualNetwork?: VirtualNetworkArmReference;
  /** Reference to the logical network containing this backend address. Populated automatically from the referenced IP configuration. Mutually exclusive with subnet and virtualNetwork. */
  readonly logicalNetwork?: LogicalNetworkArmReference;
  /** Nic Based backend-ip association */
  networkInterfaceIPConfiguration?: IPConfigurationArmReference;
}

export function loadBalancerBackendAddressPropertiesSerializer(
  item: LoadBalancerBackendAddressProperties,
): any {
  return {
    adminState: item["adminState"],
    networkInterfaceIPConfiguration: !item["networkInterfaceIPConfiguration"]
      ? item["networkInterfaceIPConfiguration"]
      : ipConfigurationArmReferenceSerializer(item["networkInterfaceIPConfiguration"]),
  };
}

export function loadBalancerBackendAddressPropertiesDeserializer(
  item: any,
): LoadBalancerBackendAddressProperties {
  return {
    adminState: item["adminState"],
    ipAddress: item["ipAddress"],
    subnet: !item["subnet"]
      ? item["subnet"]
      : virtualNetworkSubnetArmReferenceDeserializer(item["subnet"]),
    virtualNetwork: !item["virtualNetwork"]
      ? item["virtualNetwork"]
      : virtualNetworkArmReferenceDeserializer(item["virtualNetwork"]),
    logicalNetwork: !item["logicalNetwork"]
      ? item["logicalNetwork"]
      : logicalNetworkArmReferenceDeserializer(item["logicalNetwork"]),
    networkInterfaceIPConfiguration: !item["networkInterfaceIPConfiguration"]
      ? item["networkInterfaceIPConfiguration"]
      : ipConfigurationArmReferenceDeserializer(item["networkInterfaceIPConfiguration"]),
  };
}

/** Backend Address Admin states */
export enum KnownLoadBalancerBackendAddressAdminState {
  /** Up - forced admin state up */
  Up = "Up",
  /** Down - forced admin state down */
  Down = "Down",
}

/**
 * Backend Address Admin states \
 * {@link KnownLoadBalancerBackendAddressAdminState} can be used interchangeably with LoadBalancerBackendAddressAdminState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Up**: Up - forced admin state up \
 * **Down**: Down - forced admin state down
 */
export type LoadBalancerBackendAddressAdminState = string;

/** The Azure Resource ID for a Virtual Network */
export interface VirtualNetworkArmReference {
  /** The Azure Resource ID for a Virtual Network. */
  resourceId?: string;
}

export function virtualNetworkArmReferenceSerializer(item: VirtualNetworkArmReference): any {
  return { resourceId: item["resourceId"] };
}

export function virtualNetworkArmReferenceDeserializer(item: any): VirtualNetworkArmReference {
  return {
    resourceId: item["resourceId"],
  };
}

export function loadBalancerRuleArraySerializer(result: Array<LoadBalancerRule>): any[] {
  return result.map((item) => {
    return loadBalancerRuleSerializer(item);
  });
}

export function loadBalancerRuleArrayDeserializer(result: Array<LoadBalancerRule>): any[] {
  return result.map((item) => {
    return loadBalancerRuleDeserializer(item);
  });
}

/** LoadBalancer Rules */
export interface LoadBalancerRule {
  /** name of the load balancer rule */
  name: string;
  /** load balancer rule properties */
  properties: LoadBalancerRuleProperties;
}

export function loadBalancerRuleSerializer(item: LoadBalancerRule): any {
  return {
    name: item["name"],
    properties: loadBalancerRulePropertiesSerializer(item["properties"]),
  };
}

export function loadBalancerRuleDeserializer(item: any): LoadBalancerRule {
  return {
    name: item["name"],
    properties: loadBalancerRulePropertiesDeserializer(item["properties"]),
  };
}

/** Properties for LoadBalancerRules */
export interface LoadBalancerRuleProperties {
  /** arm reference to frontend IP being used by this LB */
  frontendIPConfiguration: LoadBalancerFrontendIPConfigurationReference;
  /** arm reference to backend pool being used by ths pool */
  backendAddressPool: LoadBalancerBackendAddressPoolReference;
  /** Frontend port to accept connections */
  frontendPort: number;
  /** backendPort to forward connections */
  backendPort: number;
  /** IP Protocol that the rule must load-balance */
  protocol: LoadBalancerRuleTransportProtocol;
  /** Reference for the health probe for this connection */
  probe?: LoadBalancerProbeReference;
  /** SessionPersistence: Default (5-tuple), SourceIP(2-tuple), sourceIPProtocol(3-tuple) */
  loadDistribution?: LoadBalancerRuleSessionPersistenceType;
  /** Time for which connections are preserved before being torn down. */
  idleTimeoutInMinutes?: number;
}

export function loadBalancerRulePropertiesSerializer(item: LoadBalancerRuleProperties): any {
  return {
    frontendIPConfiguration: loadBalancerFrontendIPConfigurationReferenceSerializer(
      item["frontendIPConfiguration"],
    ),
    backendAddressPool: loadBalancerBackendAddressPoolReferenceSerializer(
      item["backendAddressPool"],
    ),
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
    protocol: item["protocol"],
    probe: !item["probe"] ? item["probe"] : loadBalancerProbeReferenceSerializer(item["probe"]),
    loadDistribution: item["loadDistribution"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
  };
}

export function loadBalancerRulePropertiesDeserializer(item: any): LoadBalancerRuleProperties {
  return {
    frontendIPConfiguration: loadBalancerFrontendIPConfigurationReferenceDeserializer(
      item["frontendIPConfiguration"],
    ),
    backendAddressPool: loadBalancerBackendAddressPoolReferenceDeserializer(
      item["backendAddressPool"],
    ),
    frontendPort: item["frontendPort"],
    backendPort: item["backendPort"],
    protocol: item["protocol"],
    probe: !item["probe"] ? item["probe"] : loadBalancerProbeReferenceDeserializer(item["probe"]),
    loadDistribution: item["loadDistribution"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
  };
}

/** Reference to a LoadBalancer Frontend IPConfiguration */
export interface LoadBalancerFrontendIPConfigurationReference {
  /** name of the frontnedIPConfiguration */
  name: string;
}

export function loadBalancerFrontendIPConfigurationReferenceSerializer(
  item: LoadBalancerFrontendIPConfigurationReference,
): any {
  return { name: item["name"] };
}

export function loadBalancerFrontendIPConfigurationReferenceDeserializer(
  item: any,
): LoadBalancerFrontendIPConfigurationReference {
  return {
    name: item["name"],
  };
}

/** Reference to a LoadBalancer backend address pool reference */
export interface LoadBalancerBackendAddressPoolReference {
  /** name of the backend address pool */
  name: string;
}

export function loadBalancerBackendAddressPoolReferenceSerializer(
  item: LoadBalancerBackendAddressPoolReference,
): any {
  return { name: item["name"] };
}

export function loadBalancerBackendAddressPoolReferenceDeserializer(
  item: any,
): LoadBalancerBackendAddressPoolReference {
  return {
    name: item["name"],
  };
}

/** Protocol for load balancing rules */
export enum KnownLoadBalancerRuleTransportProtocol {
  /** TCP - load balance only tcp traffic */
  TCP = "Tcp",
  /** Udp - load balance only UDP traffic */
  UDP = "Udp",
  /** All - load balance all UDP and TCP traffic */
  All = "All",
}

/**
 * Protocol for load balancing rules \
 * {@link KnownLoadBalancerRuleTransportProtocol} can be used interchangeably with LoadBalancerRuleTransportProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Tcp**: TCP - load balance only tcp traffic \
 * **Udp**: Udp - load balance only UDP traffic \
 * **All**: All - load balance all UDP and TCP traffic
 */
export type LoadBalancerRuleTransportProtocol = string;

/** Reference to a LoadBalancer health probe */
export interface LoadBalancerProbeReference {
  /** name of the health probe */
  name: string;
}

export function loadBalancerProbeReferenceSerializer(item: LoadBalancerProbeReference): any {
  return { name: item["name"] };
}

export function loadBalancerProbeReferenceDeserializer(item: any): LoadBalancerProbeReference {
  return {
    name: item["name"],
  };
}

/** Type of session persistence [Default, SourceIP, SourceIPProtocol] */
export enum KnownLoadBalancerRuleSessionPersistenceType {
  /** Default - 5-tuple hashing */
  Default = "Default",
  /** Source IP - 2-tuple hashing looking at src-dst ip */
  SourceIP = "SourceIP",
  /** SourceIPProtocol - 3-tuple hashing looking at src-dst ip and ip protocol */
  SourceIPProtocol = "SourceIPProtocol",
}

/**
 * Type of session persistence [Default, SourceIP, SourceIPProtocol] \
 * {@link KnownLoadBalancerRuleSessionPersistenceType} can be used interchangeably with LoadBalancerRuleSessionPersistenceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default - 5-tuple hashing \
 * **SourceIP**: Source IP - 2-tuple hashing looking at src-dst ip \
 * **SourceIPProtocol**: SourceIPProtocol - 3-tuple hashing looking at src-dst ip and ip protocol
 */
export type LoadBalancerRuleSessionPersistenceType = string;

export function probeArraySerializer(result: Array<Probe>): any[] {
  return result.map((item) => {
    return probeSerializer(item);
  });
}

export function probeArrayDeserializer(result: Array<Probe>): any[] {
  return result.map((item) => {
    return probeDeserializer(item);
  });
}

/** Load balancer health probes */
export interface Probe {
  /** name of the load balancer health probe */
  name: string;
  /** load balancer rule properties */
  properties: ProbeProperties;
}

export function probeSerializer(item: Probe): any {
  return { name: item["name"], properties: probePropertiesSerializer(item["properties"]) };
}

export function probeDeserializer(item: any): Probe {
  return {
    name: item["name"],
    properties: probePropertiesDeserializer(item["properties"]),
  };
}

/** properties for LoadBalancer health probes */
export interface ProbeProperties {
  /** Protocol for this probe: Can be Tcp or Http - Diverges from Azure where Https is also an option */
  protocol: LoadBalancerProbeProtocol;
  /** Port on the backend address to probe */
  port: number;
  /** For http probes, specify the request path e.g. /health */
  requestPath?: string;
  /** Probe interval in seconds (5-300) default 15 */
  intervalInSeconds?: number;
  /** number of consecutive probe failures before marking unhealthy (1-20) default 2 */
  numberOfProbes?: number;
}

export function probePropertiesSerializer(item: ProbeProperties): any {
  return {
    protocol: item["protocol"],
    port: item["port"],
    requestPath: item["requestPath"],
    intervalInSeconds: item["intervalInSeconds"],
    numberOfProbes: item["numberOfProbes"],
  };
}

export function probePropertiesDeserializer(item: any): ProbeProperties {
  return {
    protocol: item["protocol"],
    port: item["port"],
    requestPath: item["requestPath"],
    intervalInSeconds: item["intervalInSeconds"],
    numberOfProbes: item["numberOfProbes"],
  };
}

/** Protocol for health probes */
export enum KnownLoadBalancerProbeProtocol {
  /** TCP - TCP port checking */
  TCP = "Tcp",
  /** HTTP - HTTP request */
  Http = "Http",
}

/**
 * Protocol for health probes \
 * {@link KnownLoadBalancerProbeProtocol} can be used interchangeably with LoadBalancerProbeProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Tcp**: TCP - TCP port checking \
 * **Http**: HTTP - HTTP request
 */
export type LoadBalancerProbeProtocol = string;

/** The observed status of the virtual network */
export interface LoadBalancerStatus {
  /** LoadBalancer provisioning error code */
  errorCode?: string;
  /** Descriptive error message */
  errorMessage?: string;
  /** virtual network provisioning status */
  provisioningStatus?: LoadBalancerStatusProvisioningStatus;
}

export function loadBalancerStatusDeserializer(item: any): LoadBalancerStatus {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
    provisioningStatus: !item["provisioningStatus"]
      ? item["provisioningStatus"]
      : loadBalancerStatusProvisioningStatusDeserializer(item["provisioningStatus"]),
  };
}

/** Status of load balancer operations */
export interface LoadBalancerStatusProvisioningStatus {
  /** The ID of the operation performed on the load balancer */
  operationId?: string;
  /** The status of the operation performed on the loadbalancer [Succeeded, Failed, InProgress] */
  status?: Status;
}

export function loadBalancerStatusProvisioningStatusDeserializer(
  item: any,
): LoadBalancerStatusProvisioningStatus {
  return {
    operationId: item["operationId"],
    status: item["status"],
  };
}

/** The type used for updating tags in LoadBalancer resources. */
export interface LoadBalancerTagsUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function loadBalancerTagsUpdateSerializer(item: LoadBalancerTagsUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a LoadBalancer list operation. */
export interface _LoadBalancerListResult {
  /** The LoadBalancer items on this page */
  value: LoadBalancer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _loadBalancerListResultDeserializer(item: any): _LoadBalancerListResult {
  return {
    value: loadBalancerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function loadBalancerArraySerializer(result: Array<LoadBalancer>): any[] {
  return result.map((item) => {
    return loadBalancerSerializer(item);
  });
}

export function loadBalancerArrayDeserializer(result: Array<LoadBalancer>): any[] {
  return result.map((item) => {
    return loadBalancerDeserializer(item);
  });
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

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-02-01-preview API version. */
  V20240201Preview = "2024-02-01-preview",
  /** The 2024-05-01-preview API version. */
  V20240501Preview = "2024-05-01-preview",
  /** The 2024-08-01-preview API version. */
  V20240801Preview = "2024-08-01-preview",
  /** The 2024-10-01-preview API version. */
  V20241001Preview = "2024-10-01-preview",
  /** The 2025-02-01-preview API version. */
  V20250201Preview = "2025-02-01-preview",
  /** The 2025-04-01-preview API version. */
  V20250401Preview = "2025-04-01-preview",
  /** The 2025-06-01-preview API version. */
  V20250601Preview = "2025-06-01-preview",
  /** The 2025-09-01-preview API version. */
  V20250901Preview = "2025-09-01-preview",
  /** The 2026-02-01-preview API version. */
  V20260201Preview = "2026-02-01-preview",
  /** The 2026-04-01-preview API version. */
  V20260401Preview = "2026-04-01-preview",
}

export function _galleryImageVersionPropertiesSerializer(item: GalleryImageVersion): any {
  return {
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : galleryImageVersionStorageProfileSerializer(item["storageProfile"]),
  };
}

export function _galleryImageVersionPropertiesDeserializer(item: any) {
  return {
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : galleryImageVersionStorageProfileDeserializer(item["storageProfile"]),
  };
}

export function _routePropertiesSerializer(item: Route): any {
  return { addressPrefix: item["addressPrefix"], nextHopIpAddress: item["nextHopIpAddress"] };
}

export function _routePropertiesDeserializer(item: any) {
  return {
    addressPrefix: item["addressPrefix"],
    nextHopIpAddress: item["nextHopIpAddress"],
  };
}

export function _routeTablePropertiesSerializer(item: RouteTable): any {
  return { routes: !item["routes"] ? item["routes"] : routeArraySerializer(item["routes"]) };
}

export function _routeTablePropertiesDeserializer(item: any) {
  return {
    routes: !item["routes"] ? item["routes"] : routeArrayDeserializer(item["routes"]),
  };
}

export function _subnetPropertiesSerializer(item: Subnet): any {
  return {
    addressPrefix: item["addressPrefix"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    ipAllocationMethod: item["ipAllocationMethod"],
    ipConfigurationReferences: !item["ipConfigurationReferences"]
      ? item["ipConfigurationReferences"]
      : subnetIpConfigurationReferenceArraySerializer(item["ipConfigurationReferences"]),
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupArmReferenceSerializer(item["networkSecurityGroup"]),
    routeTable: !item["routeTable"] ? item["routeTable"] : routeTableSerializer(item["routeTable"]),
    ipPools: !item["ipPools"] ? item["ipPools"] : ipPoolArraySerializer(item["ipPools"]),
    vlan: item["vlan"],
  };
}

export function _subnetPropertiesDeserializer(item: any) {
  return {
    addressPrefix: item["addressPrefix"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    ipAllocationMethod: item["ipAllocationMethod"],
    ipConfigurationReferences: !item["ipConfigurationReferences"]
      ? item["ipConfigurationReferences"]
      : subnetIpConfigurationReferenceArrayDeserializer(item["ipConfigurationReferences"]),
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : networkSecurityGroupArmReferenceDeserializer(item["networkSecurityGroup"]),
    routeTable: !item["routeTable"]
      ? item["routeTable"]
      : routeTableDeserializer(item["routeTable"]),
    ipPools: !item["ipPools"] ? item["ipPools"] : ipPoolArrayDeserializer(item["ipPools"]),
    vlan: item["vlan"],
    provisioningState: item["provisioningState"],
  };
}
