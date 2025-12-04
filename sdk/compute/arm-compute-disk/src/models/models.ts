// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Disk resource. */
export interface Disk extends TrackedResource {
  /** A relative URI containing the ID of the VM that has the disk attached. */
  readonly managedBy?: string;
  /** List of relative URIs containing the IDs of the VMs that have the disk attached. maxShares should be set to a value greater than one for disks to allow attaching them to multiple VMs. */
  readonly managedByExtended?: string[];
  /** The disks sku name. Can be Standard_LRS, Premium_LRS, StandardSSD_LRS, UltraSSD_LRS, Premium_ZRS, StandardSSD_ZRS, or PremiumV2_LRS. */
  sku?: DiskSku;
  /** The Logical zone list for Disk. */
  zones?: string[];
  /** The extended location where the disk will be created. Extended location cannot be changed. */
  extendedLocation?: ExtendedLocation;
  /** The time when the disk was created. */
  readonly timeCreated?: Date;
  /** The Operating System type. */
  osType?: OperatingSystemTypes;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** Purchase plan information for the the image from which the OS disk was created. E.g. - {name: 2019-Datacenter, publisher: MicrosoftWindowsServer, product: WindowsServer} */
  purchasePlan?: DiskPurchasePlan;
  /** List of supported capabilities for the image from which the OS disk was created. */
  supportedCapabilities?: SupportedCapabilities;
  /** Disk source information. CreationData information cannot be changed after the disk has been created. */
  creationData?: CreationData;
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /** The size of the disk in bytes. This field is read only. */
  readonly diskSizeBytes?: number;
  /** Unique Guid identifying the resource. */
  readonly uniqueId?: string;
  /** Encryption settings collection used for Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollection;
  /** The disk provisioning state. */
  readonly provisioningState?: string;
  /** The number of IOPS allowed for this disk; only settable for UltraSSD disks. One operation can transfer between 4k and 256k bytes. */
  diskIopsReadWrite?: number;
  /** The bandwidth allowed for this disk; only settable for UltraSSD disks. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadWrite?: number;
  /** The total number of IOPS that will be allowed across all VMs mounting the shared disk as ReadOnly. One operation can transfer between 4k and 256k bytes. */
  diskIopsReadOnly?: number;
  /** The total throughput (MBps) that will be allowed across all VMs mounting the shared disk as ReadOnly. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadOnly?: number;
  /** The state of the disk. */
  readonly diskState?: DiskState;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: Encryption;
  /** The maximum number of VMs that can attach to the disk at the same time. Value greater than one indicates a disk that can be mounted on multiple VMs at the same time. */
  maxShares?: number;
  /** Details of the list of all VMs that have the disk attached. maxShares should be set to a value greater than one for disks to allow attaching them to multiple VMs. */
  readonly shareInfo?: ShareInfoElement[];
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: NetworkAccessPolicy;
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Latest time when bursting was last enabled on a disk. */
  readonly burstingEnabledTime?: Date;
  /** Performance tier of the disk (e.g, P4, S10) as described here: https://azure.microsoft.com/en-us/pricing/details/managed-disks/. Does not apply to Ultra disks. */
  tier?: string;
  /** Set to true to enable bursting beyond the provisioned performance target of the disk. Bursting is disabled by default. Does not apply to Ultra disks. */
  burstingEnabled?: boolean;
  /** Properties of the disk for which update is pending. */
  readonly propertyUpdatesInProgress?: PropertyUpdatesInProgress;
  /** Indicates the OS on a disk supports hibernation. */
  supportsHibernation?: boolean;
  /** Contains the security related information for the resource. */
  securityProfile?: DiskSecurityProfile;
  /** Percentage complete for the background copy when a resource is created via the CopyStart operation. */
  completionPercent?: number;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Additional authentication requirements when exporting or uploading to a disk or snapshot. */
  dataAccessAuthMode?: DataAccessAuthMode;
  /** Setting this property to true improves reliability and performance of data disks that are frequently (more than 5 times a day) by detached from one virtual machine and attached to another. This property should not be set for disks that are not detached and attached frequently as it causes the disks to not align with the fault domain of the virtual machine. */
  optimizedForFrequentAttach?: boolean;
  /** The UTC time when the ownership state of the disk was last changed i.e., the time the disk was last attached or detached from a VM or the time when the VM to which the disk was attached was deallocated or started. */
  readonly lastOwnershipUpdateTime?: Date;
  /** Determines how platform treats disk failures */
  availabilityPolicy?: AvailabilityPolicy;
}

export function diskSerializer(item: Disk): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "osType",
      "hyperVGeneration",
      "purchasePlan",
      "supportedCapabilities",
      "creationData",
      "diskSizeGB",
      "encryptionSettingsCollection",
      "diskIOPSReadWrite",
      "diskMBpsReadWrite",
      "diskIOPSReadOnly",
      "diskMBpsReadOnly",
      "encryption",
      "maxShares",
      "networkAccessPolicy",
      "diskAccessId",
      "tier",
      "burstingEnabled",
      "supportsHibernation",
      "securityProfile",
      "completionPercent",
      "publicNetworkAccess",
      "dataAccessAuthMode",
      "optimizedForFrequentAttach",
      "availabilityPolicy",
    ])
      ? undefined
      : _diskPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : diskSkuSerializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function diskDeserializer(item: any): Disk {
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
    ...(!item["properties"] ? item["properties"] : _diskPropertiesDeserializer(item["properties"])),
    managedBy: item["managedBy"],
    managedByExtended: !item["managedByExtended"]
      ? item["managedByExtended"]
      : item["managedByExtended"].map((p: any) => {
          return p;
        }),
    sku: !item["sku"] ? item["sku"] : diskSkuDeserializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Disk resource properties. */
export interface DiskProperties {
  /** The time when the disk was created. */
  readonly timeCreated?: Date;
  /** The Operating System type. */
  osType?: OperatingSystemTypes;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** Purchase plan information for the the image from which the OS disk was created. E.g. - {name: 2019-Datacenter, publisher: MicrosoftWindowsServer, product: WindowsServer} */
  purchasePlan?: DiskPurchasePlan;
  /** List of supported capabilities for the image from which the OS disk was created. */
  supportedCapabilities?: SupportedCapabilities;
  /** Disk source information. CreationData information cannot be changed after the disk has been created. */
  creationData: CreationData;
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /** The size of the disk in bytes. This field is read only. */
  readonly diskSizeBytes?: number;
  /** Unique Guid identifying the resource. */
  readonly uniqueId?: string;
  /** Encryption settings collection used for Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollection;
  /** The disk provisioning state. */
  readonly provisioningState?: string;
  /** The number of IOPS allowed for this disk; only settable for UltraSSD disks. One operation can transfer between 4k and 256k bytes. */
  diskIopsReadWrite?: number;
  /** The bandwidth allowed for this disk; only settable for UltraSSD disks. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadWrite?: number;
  /** The total number of IOPS that will be allowed across all VMs mounting the shared disk as ReadOnly. One operation can transfer between 4k and 256k bytes. */
  diskIopsReadOnly?: number;
  /** The total throughput (MBps) that will be allowed across all VMs mounting the shared disk as ReadOnly. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadOnly?: number;
  /** The state of the disk. */
  readonly diskState?: DiskState;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: Encryption;
  /** The maximum number of VMs that can attach to the disk at the same time. Value greater than one indicates a disk that can be mounted on multiple VMs at the same time. */
  maxShares?: number;
  /** Details of the list of all VMs that have the disk attached. maxShares should be set to a value greater than one for disks to allow attaching them to multiple VMs. */
  readonly shareInfo?: ShareInfoElement[];
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: NetworkAccessPolicy;
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Latest time when bursting was last enabled on a disk. */
  readonly burstingEnabledTime?: Date;
  /** Performance tier of the disk (e.g, P4, S10) as described here: https://azure.microsoft.com/en-us/pricing/details/managed-disks/. Does not apply to Ultra disks. */
  tier?: string;
  /** Set to true to enable bursting beyond the provisioned performance target of the disk. Bursting is disabled by default. Does not apply to Ultra disks. */
  burstingEnabled?: boolean;
  /** Properties of the disk for which update is pending. */
  readonly propertyUpdatesInProgress?: PropertyUpdatesInProgress;
  /** Indicates the OS on a disk supports hibernation. */
  supportsHibernation?: boolean;
  /** Contains the security related information for the resource. */
  securityProfile?: DiskSecurityProfile;
  /** Percentage complete for the background copy when a resource is created via the CopyStart operation. */
  completionPercent?: number;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Additional authentication requirements when exporting or uploading to a disk or snapshot. */
  dataAccessAuthMode?: DataAccessAuthMode;
  /** Setting this property to true improves reliability and performance of data disks that are frequently (more than 5 times a day) by detached from one virtual machine and attached to another. This property should not be set for disks that are not detached and attached frequently as it causes the disks to not align with the fault domain of the virtual machine. */
  optimizedForFrequentAttach?: boolean;
  /** The UTC time when the ownership state of the disk was last changed i.e., the time the disk was last attached or detached from a VM or the time when the VM to which the disk was attached was deallocated or started. */
  readonly lastOwnershipUpdateTime?: Date;
  /** Determines how platform treats disk failures */
  availabilityPolicy?: AvailabilityPolicy;
}

export function diskPropertiesSerializer(item: DiskProperties): any {
  return {
    osType: item["osType"],
    hyperVGeneration: item["hyperVGeneration"],
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : diskPurchasePlanSerializer(item["purchasePlan"]),
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : supportedCapabilitiesSerializer(item["supportedCapabilities"]),
    creationData: creationDataSerializer(item["creationData"]),
    diskSizeGB: item["diskSizeGB"],
    encryptionSettingsCollection: !item["encryptionSettingsCollection"]
      ? item["encryptionSettingsCollection"]
      : encryptionSettingsCollectionSerializer(item["encryptionSettingsCollection"]),
    diskIOPSReadWrite: item["diskIopsReadWrite"],
    diskMBpsReadWrite: item["diskMBpsReadWrite"],
    diskIOPSReadOnly: item["diskIopsReadOnly"],
    diskMBpsReadOnly: item["diskMBpsReadOnly"],
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    maxShares: item["maxShares"],
    networkAccessPolicy: item["networkAccessPolicy"],
    diskAccessId: item["diskAccessId"],
    tier: item["tier"],
    burstingEnabled: item["burstingEnabled"],
    supportsHibernation: item["supportsHibernation"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : diskSecurityProfileSerializer(item["securityProfile"]),
    completionPercent: item["completionPercent"],
    publicNetworkAccess: item["publicNetworkAccess"],
    dataAccessAuthMode: item["dataAccessAuthMode"],
    optimizedForFrequentAttach: item["optimizedForFrequentAttach"],
    availabilityPolicy: !item["availabilityPolicy"]
      ? item["availabilityPolicy"]
      : availabilityPolicySerializer(item["availabilityPolicy"]),
  };
}

export function diskPropertiesDeserializer(item: any): DiskProperties {
  return {
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    osType: item["osType"],
    hyperVGeneration: item["hyperVGeneration"],
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : diskPurchasePlanDeserializer(item["purchasePlan"]),
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : supportedCapabilitiesDeserializer(item["supportedCapabilities"]),
    creationData: creationDataDeserializer(item["creationData"]),
    diskSizeGB: item["diskSizeGB"],
    diskSizeBytes: item["diskSizeBytes"],
    uniqueId: item["uniqueId"],
    encryptionSettingsCollection: !item["encryptionSettingsCollection"]
      ? item["encryptionSettingsCollection"]
      : encryptionSettingsCollectionDeserializer(item["encryptionSettingsCollection"]),
    provisioningState: item["provisioningState"],
    diskIopsReadWrite: item["diskIOPSReadWrite"],
    diskMBpsReadWrite: item["diskMBpsReadWrite"],
    diskIopsReadOnly: item["diskIOPSReadOnly"],
    diskMBpsReadOnly: item["diskMBpsReadOnly"],
    diskState: item["diskState"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    maxShares: item["maxShares"],
    shareInfo: !item["shareInfo"]
      ? item["shareInfo"]
      : shareInfoElementArrayDeserializer(item["shareInfo"]),
    networkAccessPolicy: item["networkAccessPolicy"],
    diskAccessId: item["diskAccessId"],
    burstingEnabledTime: !item["burstingEnabledTime"]
      ? item["burstingEnabledTime"]
      : new Date(item["burstingEnabledTime"]),
    tier: item["tier"],
    burstingEnabled: item["burstingEnabled"],
    propertyUpdatesInProgress: !item["propertyUpdatesInProgress"]
      ? item["propertyUpdatesInProgress"]
      : propertyUpdatesInProgressDeserializer(item["propertyUpdatesInProgress"]),
    supportsHibernation: item["supportsHibernation"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : diskSecurityProfileDeserializer(item["securityProfile"]),
    completionPercent: item["completionPercent"],
    publicNetworkAccess: item["publicNetworkAccess"],
    dataAccessAuthMode: item["dataAccessAuthMode"],
    optimizedForFrequentAttach: item["optimizedForFrequentAttach"],
    lastOwnershipUpdateTime: !item["LastOwnershipUpdateTime"]
      ? item["LastOwnershipUpdateTime"]
      : new Date(item["LastOwnershipUpdateTime"]),
    availabilityPolicy: !item["availabilityPolicy"]
      ? item["availabilityPolicy"]
      : availabilityPolicyDeserializer(item["availabilityPolicy"]),
  };
}

/** The Operating System type. */
export type OperatingSystemTypes = "Windows" | "Linux";

/** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
export enum KnownHyperVGeneration {
  /** V1 */
  V1 = "V1",
  /** V2 */
  V2 = "V2",
}

/**
 * The hypervisor generation of the Virtual Machine. Applicable to OS disks only. \
 * {@link KnownHyperVGeneration} can be used interchangeably with HyperVGeneration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **V1** \
 * **V2**
 */
export type HyperVGeneration = string;

/** Used for establishing the purchase context of any 3rd Party artifact through MarketPlace. */
export interface DiskPurchasePlan {
  /** The plan ID. */
  name: string;
  /** The publisher ID. */
  publisher: string;
  /** Specifies the product of the image from the marketplace. This is the same value as Offer under the imageReference element. */
  product: string;
  /** The Offer Promotion Code. */
  promotionCode?: string;
}

export function diskPurchasePlanSerializer(item: DiskPurchasePlan): any {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
  };
}

export function diskPurchasePlanDeserializer(item: any): DiskPurchasePlan {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
  };
}

/** List of supported capabilities persisted on the disk resource for VM use. */
export interface SupportedCapabilities {
  /** The disk controllers that an OS disk supports. If set it can be SCSI or SCSI, NVME or NVME, SCSI. */
  diskControllerTypes?: string;
  /** True if the image from which the OS disk is created supports accelerated networking. */
  acceleratedNetwork?: boolean;
  /** CPU architecture supported by an OS disk. */
  architecture?: Architecture;
  /** Refers to the security capability of the disk supported to create a Trusted launch or Confidential VM */
  supportedSecurityOption?: SupportedSecurityOption;
}

export function supportedCapabilitiesSerializer(item: SupportedCapabilities): any {
  return {
    diskControllerTypes: item["diskControllerTypes"],
    acceleratedNetwork: item["acceleratedNetwork"],
    architecture: item["architecture"],
    supportedSecurityOption: item["supportedSecurityOption"],
  };
}

export function supportedCapabilitiesDeserializer(item: any): SupportedCapabilities {
  return {
    diskControllerTypes: item["diskControllerTypes"],
    acceleratedNetwork: item["acceleratedNetwork"],
    architecture: item["architecture"],
    supportedSecurityOption: item["supportedSecurityOption"],
  };
}

/** CPU architecture supported by an OS disk. */
export enum KnownArchitecture {
  /** x64 */
  X64 = "x64",
  /** Arm64 */
  Arm64 = "Arm64",
}

/**
 * CPU architecture supported by an OS disk. \
 * {@link KnownArchitecture} can be used interchangeably with Architecture,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **x64** \
 * **Arm64**
 */
export type Architecture = string;

/** Refers to the security capability of the disk supported to create a Trusted launch or Confidential VM */
export enum KnownSupportedSecurityOption {
  /** The disk supports creating Trusted Launch VMs. */
  TrustedLaunchSupported = "TrustedLaunchSupported",
  /** The disk supports creating both Trusted Launch and Confidential VMs. */
  TrustedLaunchAndConfidentialVMSupported = "TrustedLaunchAndConfidentialVMSupported",
}

/**
 * Refers to the security capability of the disk supported to create a Trusted launch or Confidential VM \
 * {@link KnownSupportedSecurityOption} can be used interchangeably with SupportedSecurityOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TrustedLaunchSupported**: The disk supports creating Trusted Launch VMs. \
 * **TrustedLaunchAndConfidentialVMSupported**: The disk supports creating both Trusted Launch and Confidential VMs.
 */
export type SupportedSecurityOption = string;

/** Data used when creating a disk. */
export interface CreationData {
  /** This enumerates the possible sources of a disk's creation. */
  createOption: DiskCreateOption;
  /** Required if createOption is Import. The Azure Resource Manager identifier of the storage account containing the blob to import as a disk. */
  storageAccountId?: string;
  /** Disk source information for PIR or user images. */
  imageReference?: ImageDiskReference;
  /** Required if creating from a Gallery Image. The id/sharedGalleryImageId/communityGalleryImageId of the ImageDiskReference will be the ARM id of the shared galley image version from which to create a disk. */
  galleryImageReference?: ImageDiskReference;
  /** If createOption is Import, this is the URI of a blob to be imported into a managed disk. */
  sourceUri?: string;
  /** If createOption is Copy, this is the ARM id of the source snapshot or disk. */
  sourceResourceId?: string;
  /** If this field is set, this is the unique id identifying the source of this resource. */
  readonly sourceUniqueId?: string;
  /** If createOption is Upload, this is the size of the contents of the upload including the VHD footer. This value should be between 20972032 (20 MiB + 512 bytes for the VHD footer) and 35183298347520 bytes (32 TiB + 512 bytes for the VHD footer). */
  uploadSizeBytes?: number;
  /** Logical sector size in bytes for Ultra disks. Supported values are 512 ad 4096. 4096 is the default. */
  logicalSectorSize?: number;
  /** If createOption is ImportSecure, this is the URI of a blob to be imported into VM guest state. */
  securityDataUri?: string;
  /** If createOption is ImportSecure, this is the URI of a blob to be imported into VM metadata for Confidential VM. */
  securityMetadataUri?: string;
  /** Set this flag to true to get a boost on the performance target of the disk deployed, see here on the respective performance target. This flag can only be set on disk creation time and cannot be disabled after enabled. */
  performancePlus?: boolean;
  /** Required if createOption is CopyFromSanSnapshot. This is the ARM id of the source elastic san volume snapshot. */
  elasticSanResourceId?: string;
  /** If this field is set on a snapshot and createOption is CopyStart, the snapshot will be copied at a quicker speed. */
  provisionedBandwidthCopySpeed?: ProvisionedBandwidthCopyOption;
  /** For snapshots created from Premium SSD v2 or Ultra disk, this property determines the time in minutes the snapshot is retained for instant access to enable faster restore. */
  instantAccessDurationMinutes?: number;
}

export function creationDataSerializer(item: CreationData): any {
  return {
    createOption: item["createOption"],
    storageAccountId: item["storageAccountId"],
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageDiskReferenceSerializer(item["imageReference"]),
    galleryImageReference: !item["galleryImageReference"]
      ? item["galleryImageReference"]
      : imageDiskReferenceSerializer(item["galleryImageReference"]),
    sourceUri: item["sourceUri"],
    sourceResourceId: item["sourceResourceId"],
    uploadSizeBytes: item["uploadSizeBytes"],
    logicalSectorSize: item["logicalSectorSize"],
    securityDataUri: item["securityDataUri"],
    securityMetadataUri: item["securityMetadataUri"],
    performancePlus: item["performancePlus"],
    elasticSanResourceId: item["elasticSanResourceId"],
    provisionedBandwidthCopySpeed: item["provisionedBandwidthCopySpeed"],
    instantAccessDurationMinutes: item["instantAccessDurationMinutes"],
  };
}

export function creationDataDeserializer(item: any): CreationData {
  return {
    createOption: item["createOption"],
    storageAccountId: item["storageAccountId"],
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageDiskReferenceDeserializer(item["imageReference"]),
    galleryImageReference: !item["galleryImageReference"]
      ? item["galleryImageReference"]
      : imageDiskReferenceDeserializer(item["galleryImageReference"]),
    sourceUri: item["sourceUri"],
    sourceResourceId: item["sourceResourceId"],
    sourceUniqueId: item["sourceUniqueId"],
    uploadSizeBytes: item["uploadSizeBytes"],
    logicalSectorSize: item["logicalSectorSize"],
    securityDataUri: item["securityDataUri"],
    securityMetadataUri: item["securityMetadataUri"],
    performancePlus: item["performancePlus"],
    elasticSanResourceId: item["elasticSanResourceId"],
    provisionedBandwidthCopySpeed: item["provisionedBandwidthCopySpeed"],
    instantAccessDurationMinutes: item["instantAccessDurationMinutes"],
  };
}

/** This enumerates the possible sources of a disk's creation. */
export enum KnownDiskCreateOption {
  /** Create an empty data disk of a size given by diskSizeGB. */
  Empty = "Empty",
  /** Disk will be attached to a VM. */
  Attach = "Attach",
  /** Create a new disk from a platform image specified by the given imageReference or galleryImageReference. */
  FromImage = "FromImage",
  /** Create a disk by importing from a blob specified by a sourceUri in a storage account specified by storageAccountId. */
  Import = "Import",
  /** Create a new disk or snapshot by copying from a disk or snapshot specified by the given sourceResourceId. */
  Copy = "Copy",
  /** Create a new disk by copying from a backup recovery point. */
  Restore = "Restore",
  /** Create a new disk by obtaining a write token and using it to directly upload the contents of the disk. */
  Upload = "Upload",
  /** Create a new disk by using a deep copy process, where the resource creation is considered complete only after all data has been copied from the source. */
  CopyStart = "CopyStart",
  /** Similar to Import create option. Create a new Trusted Launch VM or Confidential VM supported disk by importing additional blobs for VM guest state specified by securityDataUri and VM metadata specified by securityMetadataUri in storage account specified by storageAccountId. The VM metadata is optional and only required for certain Confidential VM configurations and not required for Trusted Launch VM. */
  ImportSecure = "ImportSecure",
  /** Similar to Upload create option. Create a new Trusted Launch VM or Confidential VM supported disk and upload using write token in disk, VM guest state and VM metadata. The VM metadata is optional and only required for certain Confidential VM configurations and not required for Trusted Launch VM. */
  UploadPreparedSecure = "UploadPreparedSecure",
  /** Create a new disk by exporting from elastic san volume snapshot */
  CopyFromSanSnapshot = "CopyFromSanSnapshot",
}

/**
 * This enumerates the possible sources of a disk's creation. \
 * {@link KnownDiskCreateOption} can be used interchangeably with DiskCreateOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Empty**: Create an empty data disk of a size given by diskSizeGB. \
 * **Attach**: Disk will be attached to a VM. \
 * **FromImage**: Create a new disk from a platform image specified by the given imageReference or galleryImageReference. \
 * **Import**: Create a disk by importing from a blob specified by a sourceUri in a storage account specified by storageAccountId. \
 * **Copy**: Create a new disk or snapshot by copying from a disk or snapshot specified by the given sourceResourceId. \
 * **Restore**: Create a new disk by copying from a backup recovery point. \
 * **Upload**: Create a new disk by obtaining a write token and using it to directly upload the contents of the disk. \
 * **CopyStart**: Create a new disk by using a deep copy process, where the resource creation is considered complete only after all data has been copied from the source. \
 * **ImportSecure**: Similar to Import create option. Create a new Trusted Launch VM or Confidential VM supported disk by importing additional blobs for VM guest state specified by securityDataUri and VM metadata specified by securityMetadataUri in storage account specified by storageAccountId. The VM metadata is optional and only required for certain Confidential VM configurations and not required for Trusted Launch VM. \
 * **UploadPreparedSecure**: Similar to Upload create option. Create a new Trusted Launch VM or Confidential VM supported disk and upload using write token in disk, VM guest state and VM metadata. The VM metadata is optional and only required for certain Confidential VM configurations and not required for Trusted Launch VM. \
 * **CopyFromSanSnapshot**: Create a new disk by exporting from elastic san volume snapshot
 */
export type DiskCreateOption = string;

/** The source image used for creating the disk. */
export interface ImageDiskReference {
  /** A relative uri containing either a Platform Image Repository, user image, or Azure Compute Gallery image reference. */
  id?: string;
  /** A relative uri containing a direct shared Azure Compute Gallery image reference. */
  sharedGalleryImageId?: string;
  /** A relative uri containing a community Azure Compute Gallery image reference. */
  communityGalleryImageId?: string;
  /** If the disk is created from an image's data disk, this is an index that indicates which of the data disks in the image to use. For OS disks, this field is null. */
  lun?: number;
}

export function imageDiskReferenceSerializer(item: ImageDiskReference): any {
  return {
    id: item["id"],
    sharedGalleryImageId: item["sharedGalleryImageId"],
    communityGalleryImageId: item["communityGalleryImageId"],
    lun: item["lun"],
  };
}

export function imageDiskReferenceDeserializer(item: any): ImageDiskReference {
  return {
    id: item["id"],
    sharedGalleryImageId: item["sharedGalleryImageId"],
    communityGalleryImageId: item["communityGalleryImageId"],
    lun: item["lun"],
  };
}

/** If this field is set on a snapshot and createOption is CopyStart, the snapshot will be copied at a quicker speed. */
export enum KnownProvisionedBandwidthCopyOption {
  /** None */
  None = "None",
  /** Enhanced */
  Enhanced = "Enhanced",
}

/**
 * If this field is set on a snapshot and createOption is CopyStart, the snapshot will be copied at a quicker speed. \
 * {@link KnownProvisionedBandwidthCopyOption} can be used interchangeably with ProvisionedBandwidthCopyOption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Enhanced**
 */
export type ProvisionedBandwidthCopyOption = string;

/** Encryption settings for disk or snapshot */
export interface EncryptionSettingsCollection {
  /** Set this flag to true and provide DiskEncryptionKey and optional KeyEncryptionKey to enable encryption. Set this flag to false and remove DiskEncryptionKey and KeyEncryptionKey to disable encryption. If EncryptionSettings is null in the request object, the existing settings remain unchanged. */
  enabled: boolean;
  /** A collection of encryption settings, one for each disk volume. */
  encryptionSettings?: EncryptionSettingsElement[];
  /** Describes what type of encryption is used for the disks. Once this field is set, it cannot be overwritten. '1.0' corresponds to Azure Disk Encryption with AAD app.'1.1' corresponds to Azure Disk Encryption. */
  encryptionSettingsVersion?: string;
}

export function encryptionSettingsCollectionSerializer(item: EncryptionSettingsCollection): any {
  return {
    enabled: item["enabled"],
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : encryptionSettingsElementArraySerializer(item["encryptionSettings"]),
    encryptionSettingsVersion: item["encryptionSettingsVersion"],
  };
}

export function encryptionSettingsCollectionDeserializer(item: any): EncryptionSettingsCollection {
  return {
    enabled: item["enabled"],
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : encryptionSettingsElementArrayDeserializer(item["encryptionSettings"]),
    encryptionSettingsVersion: item["encryptionSettingsVersion"],
  };
}

export function encryptionSettingsElementArraySerializer(
  result: Array<EncryptionSettingsElement>,
): any[] {
  return result.map((item) => {
    return encryptionSettingsElementSerializer(item);
  });
}

export function encryptionSettingsElementArrayDeserializer(
  result: Array<EncryptionSettingsElement>,
): any[] {
  return result.map((item) => {
    return encryptionSettingsElementDeserializer(item);
  });
}

/** Encryption settings for one disk volume. */
export interface EncryptionSettingsElement {
  /** Key Vault Secret Url and vault id of the disk encryption key */
  diskEncryptionKey?: KeyVaultAndSecretReference;
  /** Key Vault Key Url and vault id of the key encryption key. KeyEncryptionKey is optional and when provided is used to unwrap the disk encryption key. */
  keyEncryptionKey?: KeyVaultAndKeyReference;
}

export function encryptionSettingsElementSerializer(item: EncryptionSettingsElement): any {
  return {
    diskEncryptionKey: !item["diskEncryptionKey"]
      ? item["diskEncryptionKey"]
      : keyVaultAndSecretReferenceSerializer(item["diskEncryptionKey"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyVaultAndKeyReferenceSerializer(item["keyEncryptionKey"]),
  };
}

export function encryptionSettingsElementDeserializer(item: any): EncryptionSettingsElement {
  return {
    diskEncryptionKey: !item["diskEncryptionKey"]
      ? item["diskEncryptionKey"]
      : keyVaultAndSecretReferenceDeserializer(item["diskEncryptionKey"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyVaultAndKeyReferenceDeserializer(item["keyEncryptionKey"]),
  };
}

/** Key Vault Secret Url and vault id of the encryption key */
export interface KeyVaultAndSecretReference {
  /** Resource id of the KeyVault containing the key or secret */
  sourceVault: SourceVault;
  /** Url pointing to a key or secret in KeyVault */
  secretUrl: string;
}

export function keyVaultAndSecretReferenceSerializer(item: KeyVaultAndSecretReference): any {
  return { sourceVault: sourceVaultSerializer(item["sourceVault"]), secretUrl: item["secretUrl"] };
}

export function keyVaultAndSecretReferenceDeserializer(item: any): KeyVaultAndSecretReference {
  return {
    sourceVault: sourceVaultDeserializer(item["sourceVault"]),
    secretUrl: item["secretUrl"],
  };
}

/** The vault id is an Azure Resource Manager Resource id in the form /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName} */
export interface SourceVault {
  /** Resource Id */
  id?: string;
}

export function sourceVaultSerializer(item: SourceVault): any {
  return { id: item["id"] };
}

export function sourceVaultDeserializer(item: any): SourceVault {
  return {
    id: item["id"],
  };
}

/** Key Vault Key Url and vault id of KeK, KeK is optional and when provided is used to unwrap the encryptionKey */
export interface KeyVaultAndKeyReference {
  /** Resource id of the KeyVault containing the key or secret */
  sourceVault: SourceVault;
  /** Url pointing to a key or secret in KeyVault */
  keyUrl: string;
}

export function keyVaultAndKeyReferenceSerializer(item: KeyVaultAndKeyReference): any {
  return { sourceVault: sourceVaultSerializer(item["sourceVault"]), keyUrl: item["keyUrl"] };
}

export function keyVaultAndKeyReferenceDeserializer(item: any): KeyVaultAndKeyReference {
  return {
    sourceVault: sourceVaultDeserializer(item["sourceVault"]),
    keyUrl: item["keyUrl"],
  };
}

/** This enumerates the possible state of the disk. */
export enum KnownDiskState {
  /** The disk is not being used and can be attached to a VM. */
  Unattached = "Unattached",
  /** The disk is currently attached to a running VM. */
  Attached = "Attached",
  /** The disk is attached to a stopped-deallocated VM. */
  Reserved = "Reserved",
  /** The disk is attached to a VM which is in hibernated state. */
  Frozen = "Frozen",
  /** The disk currently has an Active SAS Uri associated with it. */
  ActiveSAS = "ActiveSAS",
  /** The disk is attached to a VM in hibernated state and has an active SAS URI associated with it. */
  ActiveSASFrozen = "ActiveSASFrozen",
  /** A disk is ready to be created by upload by requesting a write token. */
  ReadyToUpload = "ReadyToUpload",
  /** A disk is created for upload and a write token has been issued for uploading to it. */
  ActiveUpload = "ActiveUpload",
}

/**
 * This enumerates the possible state of the disk. \
 * {@link KnownDiskState} can be used interchangeably with DiskState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unattached**: The disk is not being used and can be attached to a VM. \
 * **Attached**: The disk is currently attached to a running VM. \
 * **Reserved**: The disk is attached to a stopped-deallocated VM. \
 * **Frozen**: The disk is attached to a VM which is in hibernated state. \
 * **ActiveSAS**: The disk currently has an Active SAS Uri associated with it. \
 * **ActiveSASFrozen**: The disk is attached to a VM in hibernated state and has an active SAS URI associated with it. \
 * **ReadyToUpload**: A disk is ready to be created by upload by requesting a write token. \
 * **ActiveUpload**: A disk is created for upload and a write token has been issued for uploading to it.
 */
export type DiskState = string;

/** Encryption at rest settings for disk or snapshot */
export interface Encryption {
  /** ResourceId of the disk encryption set to use for enabling encryption at rest. */
  diskEncryptionSetId?: string;
  /** The type of key used to encrypt the data of the disk. */
  type?: EncryptionType;
}

export function encryptionSerializer(item: Encryption): any {
  return { diskEncryptionSetId: item["diskEncryptionSetId"], type: item["type"] };
}

export function encryptionDeserializer(item: any): Encryption {
  return {
    diskEncryptionSetId: item["diskEncryptionSetId"],
    type: item["type"],
  };
}

/** The type of key used to encrypt the data of the disk. */
export enum KnownEncryptionType {
  /** Disk is encrypted at rest with Platform managed key. It is the default encryption type. This is not a valid encryption type for disk encryption sets. */
  EncryptionAtRestWithPlatformKey = "EncryptionAtRestWithPlatformKey",
  /** Disk is encrypted at rest with Customer managed key that can be changed and revoked by a customer. */
  EncryptionAtRestWithCustomerKey = "EncryptionAtRestWithCustomerKey",
  /** Disk is encrypted at rest with 2 layers of encryption. One of the keys is Customer managed and the other key is Platform managed. */
  EncryptionAtRestWithPlatformAndCustomerKeys = "EncryptionAtRestWithPlatformAndCustomerKeys",
}

/**
 * The type of key used to encrypt the data of the disk. \
 * {@link KnownEncryptionType} can be used interchangeably with EncryptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EncryptionAtRestWithPlatformKey**: Disk is encrypted at rest with Platform managed key. It is the default encryption type. This is not a valid encryption type for disk encryption sets. \
 * **EncryptionAtRestWithCustomerKey**: Disk is encrypted at rest with Customer managed key that can be changed and revoked by a customer. \
 * **EncryptionAtRestWithPlatformAndCustomerKeys**: Disk is encrypted at rest with 2 layers of encryption. One of the keys is Customer managed and the other key is Platform managed.
 */
export type EncryptionType = string;

export function shareInfoElementArrayDeserializer(result: Array<ShareInfoElement>): any[] {
  return result.map((item) => {
    return shareInfoElementDeserializer(item);
  });
}

/** model interface ShareInfoElement */
export interface ShareInfoElement {
  /** A relative URI containing the ID of the VM that has the disk attached. */
  readonly vmUri?: string;
}

export function shareInfoElementDeserializer(item: any): ShareInfoElement {
  return {
    vmUri: item["vmUri"],
  };
}

/** Policy for accessing the disk via network. */
export enum KnownNetworkAccessPolicy {
  /** The disk can be exported or uploaded to from any network. */
  AllowAll = "AllowAll",
  /** The disk can be exported or uploaded to using a DiskAccess resource's private endpoints. */
  AllowPrivate = "AllowPrivate",
  /** The disk cannot be exported. */
  DenyAll = "DenyAll",
}

/**
 * Policy for accessing the disk via network. \
 * {@link KnownNetworkAccessPolicy} can be used interchangeably with NetworkAccessPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllowAll**: The disk can be exported or uploaded to from any network. \
 * **AllowPrivate**: The disk can be exported or uploaded to using a DiskAccess resource's private endpoints. \
 * **DenyAll**: The disk cannot be exported.
 */
export type NetworkAccessPolicy = string;

/** Properties of the disk for which update is pending. */
export interface PropertyUpdatesInProgress {
  /** The target performance tier of the disk if a tier change operation is in progress. */
  targetTier?: string;
}

export function propertyUpdatesInProgressDeserializer(item: any): PropertyUpdatesInProgress {
  return {
    targetTier: item["targetTier"],
  };
}

/** Contains the security related information for the resource. */
export interface DiskSecurityProfile {
  /** Specifies the SecurityType of the VM. Applicable for OS disks only. */
  securityType?: DiskSecurityTypes;
  /** ResourceId of the disk encryption set associated to Confidential VM supported disk encrypted with customer managed key */
  secureVMDiskEncryptionSetId?: string;
}

export function diskSecurityProfileSerializer(item: DiskSecurityProfile): any {
  return {
    securityType: item["securityType"],
    secureVMDiskEncryptionSetId: item["secureVMDiskEncryptionSetId"],
  };
}

export function diskSecurityProfileDeserializer(item: any): DiskSecurityProfile {
  return {
    securityType: item["securityType"],
    secureVMDiskEncryptionSetId: item["secureVMDiskEncryptionSetId"],
  };
}

/** Specifies the SecurityType of the VM. Applicable for OS disks only. */
export enum KnownDiskSecurityTypes {
  /** Trusted Launch provides security features such as secure boot and virtual Trusted Platform Module (vTPM) */
  TrustedLaunch = "TrustedLaunch",
  /** Indicates Confidential VM disk with only VM guest state encrypted */
  ConfidentialVMVMGuestStateOnlyEncryptedWithPlatformKey = "ConfidentialVM_VMGuestStateOnlyEncryptedWithPlatformKey",
  /** Indicates Confidential VM disk with both OS disk and VM guest state encrypted with a platform managed key */
  ConfidentialVMDiskEncryptedWithPlatformKey = "ConfidentialVM_DiskEncryptedWithPlatformKey",
  /** Indicates Confidential VM disk with both OS disk and VM guest state encrypted with a customer managed key */
  ConfidentialVMDiskEncryptedWithCustomerKey = "ConfidentialVM_DiskEncryptedWithCustomerKey",
  /** Indicates Confidential VM disk with a ephemeral vTPM. vTPM state is not persisted across VM reboots. */
  ConfidentialVMNonPersistedTPM = "ConfidentialVM_NonPersistedTPM",
}

/**
 * Specifies the SecurityType of the VM. Applicable for OS disks only. \
 * {@link KnownDiskSecurityTypes} can be used interchangeably with DiskSecurityTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TrustedLaunch**: Trusted Launch provides security features such as secure boot and virtual Trusted Platform Module (vTPM) \
 * **ConfidentialVM_VMGuestStateOnlyEncryptedWithPlatformKey**: Indicates Confidential VM disk with only VM guest state encrypted \
 * **ConfidentialVM_DiskEncryptedWithPlatformKey**: Indicates Confidential VM disk with both OS disk and VM guest state encrypted with a platform managed key \
 * **ConfidentialVM_DiskEncryptedWithCustomerKey**: Indicates Confidential VM disk with both OS disk and VM guest state encrypted with a customer managed key \
 * **ConfidentialVM_NonPersistedTPM**: Indicates Confidential VM disk with a ephemeral vTPM. vTPM state is not persisted across VM reboots.
 */
export type DiskSecurityTypes = string;

/** Policy for controlling export on the disk. */
export enum KnownPublicNetworkAccess {
  /** You can generate a SAS URI to access the underlying data of the disk publicly on the internet when NetworkAccessPolicy is set to AllowAll. You can access the data via the SAS URI only from your trusted Azure VNET when NetworkAccessPolicy is set to AllowPrivate. */
  Enabled = "Enabled",
  /** You cannot access the underlying data of the disk publicly on the internet even when NetworkAccessPolicy is set to AllowAll. You can access the data via the SAS URI only from your trusted Azure VNET when NetworkAccessPolicy is set to AllowPrivate. */
  Disabled = "Disabled",
}

/**
 * Policy for controlling export on the disk. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: You can generate a SAS URI to access the underlying data of the disk publicly on the internet when NetworkAccessPolicy is set to AllowAll. You can access the data via the SAS URI only from your trusted Azure VNET when NetworkAccessPolicy is set to AllowPrivate. \
 * **Disabled**: You cannot access the underlying data of the disk publicly on the internet even when NetworkAccessPolicy is set to AllowAll. You can access the data via the SAS URI only from your trusted Azure VNET when NetworkAccessPolicy is set to AllowPrivate.
 */
export type PublicNetworkAccess = string;

/** Additional authentication requirements when exporting or uploading to a disk or snapshot. */
export enum KnownDataAccessAuthMode {
  /** When export/upload URL is used, the system checks if the user has an identity in Azure Active Directory and has necessary permissions to export/upload the data. Please refer to aka.ms/DisksAzureADAuth. */
  AzureActiveDirectory = "AzureActiveDirectory",
  /** No additional authentication would be performed when accessing export/upload URL. */
  None = "None",
}

/**
 * Additional authentication requirements when exporting or uploading to a disk or snapshot. \
 * {@link KnownDataAccessAuthMode} can be used interchangeably with DataAccessAuthMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureActiveDirectory**: When export\/upload URL is used, the system checks if the user has an identity in Azure Active Directory and has necessary permissions to export\/upload the data. Please refer to aka.ms\/DisksAzureADAuth. \
 * **None**: No additional authentication would be performed when accessing export\/upload URL.
 */
export type DataAccessAuthMode = string;

/** In the case of an availability or connectivity issue with the data disk, specify the behavior of your VM */
export interface AvailabilityPolicy {
  /** Determines on how to handle disks with slow I/O. */
  actionOnDiskDelay?: AvailabilityPolicyDiskDelay;
}

export function availabilityPolicySerializer(item: AvailabilityPolicy): any {
  return { actionOnDiskDelay: item["actionOnDiskDelay"] };
}

export function availabilityPolicyDeserializer(item: any): AvailabilityPolicy {
  return {
    actionOnDiskDelay: item["actionOnDiskDelay"],
  };
}

/** Determines on how to handle disks with slow I/O. */
export enum KnownAvailabilityPolicyDiskDelay {
  /** Defaults to behavior without av policy specified, which is VM restart upon slow disk io. */
  None = "None",
  /** Upon a disk io failure or slow response, try detaching then reattaching the disk. */
  AutomaticReattach = "AutomaticReattach",
}

/**
 * Determines on how to handle disks with slow I/O. \
 * {@link KnownAvailabilityPolicyDiskDelay} can be used interchangeably with AvailabilityPolicyDiskDelay,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Defaults to behavior without av policy specified, which is VM restart upon slow disk io. \
 * **AutomaticReattach**: Upon a disk io failure or slow response, try detaching then reattaching the disk.
 */
export type AvailabilityPolicyDiskDelay = string;

/** The disks sku name. Can be Standard_LRS, Premium_LRS, StandardSSD_LRS, UltraSSD_LRS, Premium_ZRS, StandardSSD_ZRS, or PremiumV2_LRS. */
export interface DiskSku {
  /** The sku name. */
  name?: DiskStorageAccountTypes;
  /** The sku tier. */
  readonly tier?: string;
}

export function diskSkuSerializer(item: DiskSku): any {
  return { name: item["name"] };
}

export function diskSkuDeserializer(item: any): DiskSku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** The sku name. */
export enum KnownDiskStorageAccountTypes {
  /** Standard HDD locally redundant storage. Best for backup, non-critical, and infrequent access. */
  StandardLRS = "Standard_LRS",
  /** Premium SSD locally redundant storage. Best for production and performance sensitive workloads. */
  PremiumLRS = "Premium_LRS",
  /** Standard SSD locally redundant storage. Best for web servers, lightly used enterprise applications and dev/test. */
  StandardSSDLRS = "StandardSSD_LRS",
  /** Ultra SSD locally redundant storage. Best for IO-intensive workloads such as SAP HANA, top tier databases (for example, SQL, Oracle), and other transaction-heavy workloads. */
  UltraSSDLRS = "UltraSSD_LRS",
  /** Premium SSD zone redundant storage. Best for the production workloads that need storage resiliency against zone failures. */
  PremiumZRS = "Premium_ZRS",
  /** Standard SSD zone redundant storage. Best for web servers, lightly used enterprise applications and dev/test that need storage resiliency against zone failures. */
  StandardSSDZRS = "StandardSSD_ZRS",
  /** Premium SSD v2 locally redundant storage. Best for production and performance-sensitive workloads that consistently require low latency and high IOPS and throughput. */
  PremiumV2LRS = "PremiumV2_LRS",
}

/**
 * The sku name. \
 * {@link KnownDiskStorageAccountTypes} can be used interchangeably with DiskStorageAccountTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS**: Standard HDD locally redundant storage. Best for backup, non-critical, and infrequent access. \
 * **Premium_LRS**: Premium SSD locally redundant storage. Best for production and performance sensitive workloads. \
 * **StandardSSD_LRS**: Standard SSD locally redundant storage. Best for web servers, lightly used enterprise applications and dev\/test. \
 * **UltraSSD_LRS**: Ultra SSD locally redundant storage. Best for IO-intensive workloads such as SAP HANA, top tier databases (for example, SQL, Oracle), and other transaction-heavy workloads. \
 * **Premium_ZRS**: Premium SSD zone redundant storage. Best for the production workloads that need storage resiliency against zone failures. \
 * **StandardSSD_ZRS**: Standard SSD zone redundant storage. Best for web servers, lightly used enterprise applications and dev\/test that need storage resiliency against zone failures. \
 * **PremiumV2_LRS**: Premium SSD v2 locally redundant storage. Best for production and performance-sensitive workloads that consistently require low latency and high IOPS and throughput.
 */
export type DiskStorageAccountTypes = string;

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
  /** EdgeZone */
  EdgeZone = "EdgeZone",
}

/**
 * The type of extendedLocation. \
 * {@link KnownExtendedLocationTypes} can be used interchangeably with ExtendedLocationTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EdgeZone**
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

/** An error response from the Compute service. */
export interface CloudError {
  /** Api error. */
  error?: ApiError;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
  };
}

/** Api error. */
export interface ApiError {
  /** The Api error details */
  details?: ApiErrorBase[];
  /** The Api inner error */
  innererror?: InnerError;
  /** The error code. */
  code?: string;
  /** The target of the particular error. */
  target?: string;
  /** The error message. */
  message?: string;
}

export function apiErrorDeserializer(item: any): ApiError {
  return {
    details: !item["details"] ? item["details"] : apiErrorBaseArrayDeserializer(item["details"]),
    innererror: !item["innererror"]
      ? item["innererror"]
      : innerErrorDeserializer(item["innererror"]),
    code: item["code"],
    target: item["target"],
    message: item["message"],
  };
}

export function apiErrorBaseArrayDeserializer(result: Array<ApiErrorBase>): any[] {
  return result.map((item) => {
    return apiErrorBaseDeserializer(item);
  });
}

/** Api error base. */
export interface ApiErrorBase {
  /** The error code. */
  code?: string;
  /** The target of the particular error. */
  target?: string;
  /** The error message. */
  message?: string;
}

export function apiErrorBaseDeserializer(item: any): ApiErrorBase {
  return {
    code: item["code"],
    target: item["target"],
    message: item["message"],
  };
}

/** Inner error details. */
export interface InnerError {
  /** The exception type. */
  exceptiontype?: string;
  /** The internal error message or exception dump. */
  errordetail?: string;
}

export function innerErrorDeserializer(item: any): InnerError {
  return {
    exceptiontype: item["exceptiontype"],
    errordetail: item["errordetail"],
  };
}

/** Disk update resource. */
export interface DiskUpdate {
  /** Resource tags */
  tags?: Record<string, string>;
  /** The disks sku name. Can be Standard_LRS, Premium_LRS, StandardSSD_LRS, UltraSSD_LRS, Premium_ZRS, StandardSSD_ZRS, or PremiumV2_LRS. */
  sku?: DiskSku;
  /** the Operating System type. */
  osType?: OperatingSystemTypes;
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /** Encryption settings collection used be Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollection;
  /** The number of IOPS allowed for this disk; only settable for UltraSSD disks. One operation can transfer between 4k and 256k bytes. */
  diskIopsReadWrite?: number;
  /** The bandwidth allowed for this disk; only settable for UltraSSD disks. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadWrite?: number;
  /** The total number of IOPS that will be allowed across all VMs mounting the shared disk as ReadOnly. One operation can transfer between 4k and 256k bytes. */
  diskIopsReadOnly?: number;
  /** The total throughput (MBps) that will be allowed across all VMs mounting the shared disk as ReadOnly. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadOnly?: number;
  /** The maximum number of VMs that can attach to the disk at the same time. Value greater than one indicates a disk that can be mounted on multiple VMs at the same time. */
  maxShares?: number;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: Encryption;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: NetworkAccessPolicy;
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Performance tier of the disk (e.g, P4, S10) as described here: https://azure.microsoft.com/en-us/pricing/details/managed-disks/. Does not apply to Ultra disks. */
  tier?: string;
  /** Set to true to enable bursting beyond the provisioned performance target of the disk. Bursting is disabled by default. Does not apply to Ultra disks. */
  burstingEnabled?: boolean;
  /** Purchase plan information to be added on the OS disk */
  purchasePlan?: DiskPurchasePlan;
  /** List of supported capabilities to be added on the OS disk. */
  supportedCapabilities?: SupportedCapabilities;
  /** Properties of the disk for which update is pending. */
  readonly propertyUpdatesInProgress?: PropertyUpdatesInProgress;
  /** Indicates the OS on a disk supports hibernation. */
  supportsHibernation?: boolean;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Additional authentication requirements when exporting or uploading to a disk or snapshot. */
  dataAccessAuthMode?: DataAccessAuthMode;
  /** Setting this property to true improves reliability and performance of data disks that are frequently (more than 5 times a day) by detached from one virtual machine and attached to another. This property should not be set for disks that are not detached and attached frequently as it causes the disks to not align with the fault domain of the virtual machine. */
  optimizedForFrequentAttach?: boolean;
  /** Determines how platform treats disk failures */
  availabilityPolicy?: AvailabilityPolicy;
}

export function diskUpdateSerializer(item: DiskUpdate): any {
  return {
    properties: areAllPropsUndefined(item, [
      "osType",
      "diskSizeGB",
      "encryptionSettingsCollection",
      "diskIOPSReadWrite",
      "diskMBpsReadWrite",
      "diskIOPSReadOnly",
      "diskMBpsReadOnly",
      "maxShares",
      "encryption",
      "networkAccessPolicy",
      "diskAccessId",
      "tier",
      "burstingEnabled",
      "purchasePlan",
      "supportedCapabilities",
      "supportsHibernation",
      "publicNetworkAccess",
      "dataAccessAuthMode",
      "optimizedForFrequentAttach",
      "availabilityPolicy",
    ])
      ? undefined
      : _diskUpdatePropertiesSerializer(item),
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : diskSkuSerializer(item["sku"]),
  };
}

/** Disk resource update properties. */
export interface DiskUpdateProperties {
  /** the Operating System type. */
  osType?: OperatingSystemTypes;
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /** Encryption settings collection used be Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollection;
  /** The number of IOPS allowed for this disk; only settable for UltraSSD disks. One operation can transfer between 4k and 256k bytes. */
  diskIopsReadWrite?: number;
  /** The bandwidth allowed for this disk; only settable for UltraSSD disks. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadWrite?: number;
  /** The total number of IOPS that will be allowed across all VMs mounting the shared disk as ReadOnly. One operation can transfer between 4k and 256k bytes. */
  diskIopsReadOnly?: number;
  /** The total throughput (MBps) that will be allowed across all VMs mounting the shared disk as ReadOnly. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadOnly?: number;
  /** The maximum number of VMs that can attach to the disk at the same time. Value greater than one indicates a disk that can be mounted on multiple VMs at the same time. */
  maxShares?: number;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: Encryption;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: NetworkAccessPolicy;
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Performance tier of the disk (e.g, P4, S10) as described here: https://azure.microsoft.com/en-us/pricing/details/managed-disks/. Does not apply to Ultra disks. */
  tier?: string;
  /** Set to true to enable bursting beyond the provisioned performance target of the disk. Bursting is disabled by default. Does not apply to Ultra disks. */
  burstingEnabled?: boolean;
  /** Purchase plan information to be added on the OS disk */
  purchasePlan?: DiskPurchasePlan;
  /** List of supported capabilities to be added on the OS disk. */
  supportedCapabilities?: SupportedCapabilities;
  /** Properties of the disk for which update is pending. */
  readonly propertyUpdatesInProgress?: PropertyUpdatesInProgress;
  /** Indicates the OS on a disk supports hibernation. */
  supportsHibernation?: boolean;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Additional authentication requirements when exporting or uploading to a disk or snapshot. */
  dataAccessAuthMode?: DataAccessAuthMode;
  /** Setting this property to true improves reliability and performance of data disks that are frequently (more than 5 times a day) by detached from one virtual machine and attached to another. This property should not be set for disks that are not detached and attached frequently as it causes the disks to not align with the fault domain of the virtual machine. */
  optimizedForFrequentAttach?: boolean;
  /** Determines how platform treats disk failures */
  availabilityPolicy?: AvailabilityPolicy;
}

export function diskUpdatePropertiesSerializer(item: DiskUpdateProperties): any {
  return {
    osType: item["osType"],
    diskSizeGB: item["diskSizeGB"],
    encryptionSettingsCollection: !item["encryptionSettingsCollection"]
      ? item["encryptionSettingsCollection"]
      : encryptionSettingsCollectionSerializer(item["encryptionSettingsCollection"]),
    diskIOPSReadWrite: item["diskIopsReadWrite"],
    diskMBpsReadWrite: item["diskMBpsReadWrite"],
    diskIOPSReadOnly: item["diskIopsReadOnly"],
    diskMBpsReadOnly: item["diskMBpsReadOnly"],
    maxShares: item["maxShares"],
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    networkAccessPolicy: item["networkAccessPolicy"],
    diskAccessId: item["diskAccessId"],
    tier: item["tier"],
    burstingEnabled: item["burstingEnabled"],
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : diskPurchasePlanSerializer(item["purchasePlan"]),
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : supportedCapabilitiesSerializer(item["supportedCapabilities"]),
    supportsHibernation: item["supportsHibernation"],
    publicNetworkAccess: item["publicNetworkAccess"],
    dataAccessAuthMode: item["dataAccessAuthMode"],
    optimizedForFrequentAttach: item["optimizedForFrequentAttach"],
    availabilityPolicy: !item["availabilityPolicy"]
      ? item["availabilityPolicy"]
      : availabilityPolicySerializer(item["availabilityPolicy"]),
  };
}

/** The List Disks operation response. */
export interface _DiskList {
  /** The Disk items on this page */
  value: Disk[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _diskListDeserializer(item: any): _DiskList {
  return {
    value: diskArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function diskArraySerializer(result: Array<Disk>): any[] {
  return result.map((item) => {
    return diskSerializer(item);
  });
}

export function diskArrayDeserializer(result: Array<Disk>): any[] {
  return result.map((item) => {
    return diskDeserializer(item);
  });
}

/** Data used for requesting a SAS. */
export interface GrantAccessData {
  /** The Access Level, accepted values include None, Read, Write. */
  access: AccessLevel;
  /** Time duration in seconds until the SAS access expires. */
  durationInSeconds: number;
  /** Set this flag to true to get additional SAS for VM guest state */
  getSecureVMGuestStateSAS?: boolean;
  /** Used to specify the file format when making request for SAS on a VHDX file format snapshot */
  fileFormat?: FileFormat;
}

export function grantAccessDataSerializer(item: GrantAccessData): any {
  return {
    access: item["access"],
    durationInSeconds: item["durationInSeconds"],
    getSecureVMGuestStateSAS: item["getSecureVMGuestStateSAS"],
    fileFormat: item["fileFormat"],
  };
}

/** The Access Level, accepted values include None, Read, Write. */
export enum KnownAccessLevel {
  /** None */
  None = "None",
  /** Read */
  Read = "Read",
  /** Write */
  Write = "Write",
}

/**
 * The Access Level, accepted values include None, Read, Write. \
 * {@link KnownAccessLevel} can be used interchangeably with AccessLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Read** \
 * **Write**
 */
export type AccessLevel = string;

/** Used to specify the file format when making request for SAS on a VHDX file format snapshot */
export enum KnownFileFormat {
  /** A VHD file is a disk image file in the Virtual Hard Disk file format. */
  VHD = "VHD",
  /** A VHDX file is a disk image file in the Virtual Hard Disk v2 file format. */
  Vhdx = "VHDX",
}

/**
 * Used to specify the file format when making request for SAS on a VHDX file format snapshot \
 * {@link KnownFileFormat} can be used interchangeably with FileFormat,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VHD**: A VHD file is a disk image file in the Virtual Hard Disk file format. \
 * **VHDX**: A VHDX file is a disk image file in the Virtual Hard Disk v2 file format.
 */
export type FileFormat = string;

/** A disk access SAS uri. */
export interface AccessUri {
  /** A SAS uri for accessing a disk. */
  readonly accessSAS?: string;
  /** A SAS uri for accessing a VM guest state. */
  readonly securityDataAccessSAS?: string;
  /** A SAS uri for accessing a VM metadata. */
  readonly securityMetadataAccessSAS?: string;
}

export function accessUriDeserializer(item: any): AccessUri {
  return {
    accessSAS: item["accessSAS"],
    securityDataAccessSAS: item["securityDataAccessSAS"],
    securityMetadataAccessSAS: item["securityMetadataAccessSAS"],
  };
}

/** disk access resource. */
export interface DiskAccess extends TrackedResource {
  /** The extended location where the disk access will be created. Extended location cannot be changed. */
  extendedLocation?: ExtendedLocation;
  /** A readonly collection of private endpoint connections created on the disk. Currently only one endpoint connection is supported. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The disk access resource provisioning state. */
  readonly provisioningState?: string;
  /** The time when the disk access was created. */
  readonly timeCreated?: Date;
}

export function diskAccessSerializer(item: DiskAccess): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: undefined,
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function diskAccessDeserializer(item: any): DiskAccess {
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
      : _diskAccessPropertiesDeserializer(item["properties"])),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** model interface DiskAccessProperties */
export interface DiskAccessProperties {
  /** A readonly collection of private endpoint connections created on the disk. Currently only one endpoint connection is supported. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** The disk access resource provisioning state. */
  readonly provisioningState?: string;
  /** The time when the disk access was created. */
  readonly timeCreated?: Date;
}

export function diskAccessPropertiesSerializer(item: DiskAccessProperties): any {
  return item;
}

export function diskAccessPropertiesDeserializer(item: any): DiskAccessProperties {
  return {
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
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

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The resource of private end point. */
  readonly privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between DiskAccess and Virtual Network. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateLinkServiceConnectionState"])
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

/** Properties of the PrivateEndpointConnectProperties. */
export interface PrivateEndpointConnectionProperties {
  /** The resource of private end point. */
  readonly privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between DiskAccess and Virtual Network. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
  };
}

/** The Private Endpoint resource. */
export interface PrivateEndpoint {
  /** The ARM identifier for Private Endpoint */
  readonly id?: string;
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
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
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
 * **Rejected**
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
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
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Creating** \
 * **Deleting** \
 * **Failed**
 */
export type PrivateEndpointConnectionProvisioningState = string;

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

/** Used for updating a disk access resource. */
export interface DiskAccessUpdate {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function diskAccessUpdateSerializer(item: DiskAccessUpdate): any {
  return { tags: item["tags"] };
}

/** The List disk access operation response. */
export interface _DiskAccessList {
  /** The DiskAccess items on this page */
  value: DiskAccess[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _diskAccessListDeserializer(item: any): _DiskAccessList {
  return {
    value: diskAccessArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function diskAccessArraySerializer(result: Array<DiskAccess>): any[] {
  return result.map((item) => {
    return diskAccessSerializer(item);
  });
}

export function diskAccessArrayDeserializer(result: Array<DiskAccess>): any[] {
  return result.map((item) => {
    return diskAccessDeserializer(item);
  });
}

/** A list of private link resources */
export interface PrivateLinkResourceListResult {
  /** Array of private link resources */
  value?: PrivateLinkResource[];
}

export function privateLinkResourceListResultDeserializer(
  item: any,
): PrivateLinkResourceListResult {
  return {
    value: !item["value"] ? item["value"] : privateLinkResourceArrayDeserializer(item["value"]),
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private link resource */
export interface PrivateLinkResource {
  /** private link resource Id */
  readonly id?: string;
  /** private link resource name */
  readonly name?: string;
  /** private link resource type */
  readonly type?: string;
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource DNS zone name. */
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

/** A list of private link resources */
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

/** disk encryption set resource. */
export interface DiskEncryptionSet extends TrackedResource {
  /** The managed identity for the disk encryption set. It should be given permission on the key vault before it can be used to encrypt disks. */
  identity?: EncryptionSetIdentity;
  /** The type of key used to encrypt the data of the disk. */
  encryptionType?: DiskEncryptionSetType;
  /** The key vault key which is currently used by this disk encryption set. */
  activeKey?: KeyForDiskEncryptionSet;
  /** A readonly collection of key vault keys previously used by this disk encryption set while a key rotation is in progress. It will be empty if there is no ongoing key rotation. */
  readonly previousKeys?: KeyForDiskEncryptionSet[];
  /** The disk encryption set provisioning state. */
  readonly provisioningState?: string;
  /** Set this flag to true to enable auto-updating of this disk encryption set to the latest key version. */
  rotationToLatestKeyVersionEnabled?: boolean;
  /** The time when the active key of this disk encryption set was updated. */
  readonly lastKeyRotationTimestamp?: Date;
  /** The error that was encountered during auto-key rotation. If an error is present, then auto-key rotation will not be attempted until the error on this disk encryption set is fixed. */
  readonly autoKeyRotationError?: ApiError;
  /** Multi-tenant application client id to access key vault in a different tenant. Setting the value to 'None' will clear the property. */
  federatedClientId?: string;
}

export function diskEncryptionSetSerializer(item: DiskEncryptionSet): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "encryptionType",
      "activeKey",
      "rotationToLatestKeyVersionEnabled",
      "federatedClientId",
    ])
      ? undefined
      : _diskEncryptionSetPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : encryptionSetIdentitySerializer(item["identity"]),
  };
}

export function diskEncryptionSetDeserializer(item: any): DiskEncryptionSet {
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
      : _diskEncryptionSetPropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : encryptionSetIdentityDeserializer(item["identity"]),
  };
}

/** model interface EncryptionSetProperties */
export interface EncryptionSetProperties {
  /** The type of key used to encrypt the data of the disk. */
  encryptionType?: DiskEncryptionSetType;
  /** The key vault key which is currently used by this disk encryption set. */
  activeKey?: KeyForDiskEncryptionSet;
  /** A readonly collection of key vault keys previously used by this disk encryption set while a key rotation is in progress. It will be empty if there is no ongoing key rotation. */
  readonly previousKeys?: KeyForDiskEncryptionSet[];
  /** The disk encryption set provisioning state. */
  readonly provisioningState?: string;
  /** Set this flag to true to enable auto-updating of this disk encryption set to the latest key version. */
  rotationToLatestKeyVersionEnabled?: boolean;
  /** The time when the active key of this disk encryption set was updated. */
  readonly lastKeyRotationTimestamp?: Date;
  /** The error that was encountered during auto-key rotation. If an error is present, then auto-key rotation will not be attempted until the error on this disk encryption set is fixed. */
  readonly autoKeyRotationError?: ApiError;
  /** Multi-tenant application client id to access key vault in a different tenant. Setting the value to 'None' will clear the property. */
  federatedClientId?: string;
}

export function encryptionSetPropertiesSerializer(item: EncryptionSetProperties): any {
  return {
    encryptionType: item["encryptionType"],
    activeKey: !item["activeKey"]
      ? item["activeKey"]
      : keyForDiskEncryptionSetSerializer(item["activeKey"]),
    rotationToLatestKeyVersionEnabled: item["rotationToLatestKeyVersionEnabled"],
    federatedClientId: item["federatedClientId"],
  };
}

export function encryptionSetPropertiesDeserializer(item: any): EncryptionSetProperties {
  return {
    encryptionType: item["encryptionType"],
    activeKey: !item["activeKey"]
      ? item["activeKey"]
      : keyForDiskEncryptionSetDeserializer(item["activeKey"]),
    previousKeys: !item["previousKeys"]
      ? item["previousKeys"]
      : keyForDiskEncryptionSetArrayDeserializer(item["previousKeys"]),
    provisioningState: item["provisioningState"],
    rotationToLatestKeyVersionEnabled: item["rotationToLatestKeyVersionEnabled"],
    lastKeyRotationTimestamp: !item["lastKeyRotationTimestamp"]
      ? item["lastKeyRotationTimestamp"]
      : new Date(item["lastKeyRotationTimestamp"]),
    autoKeyRotationError: !item["autoKeyRotationError"]
      ? item["autoKeyRotationError"]
      : apiErrorDeserializer(item["autoKeyRotationError"]),
    federatedClientId: item["federatedClientId"],
  };
}

/** The type of key used to encrypt the data of the disk. */
export enum KnownDiskEncryptionSetType {
  /** Resource using diskEncryptionSet would be encrypted at rest with Customer managed key that can be changed and revoked by a customer. */
  EncryptionAtRestWithCustomerKey = "EncryptionAtRestWithCustomerKey",
  /** Resource using diskEncryptionSet would be encrypted at rest with two layers of encryption. One of the keys is Customer managed and the other key is Platform managed. */
  EncryptionAtRestWithPlatformAndCustomerKeys = "EncryptionAtRestWithPlatformAndCustomerKeys",
  /** Confidential VM supported disk and VM guest state would be encrypted with customer managed key. */
  ConfidentialVmEncryptedWithCustomerKey = "ConfidentialVmEncryptedWithCustomerKey",
}

/**
 * The type of key used to encrypt the data of the disk. \
 * {@link KnownDiskEncryptionSetType} can be used interchangeably with DiskEncryptionSetType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EncryptionAtRestWithCustomerKey**: Resource using diskEncryptionSet would be encrypted at rest with Customer managed key that can be changed and revoked by a customer. \
 * **EncryptionAtRestWithPlatformAndCustomerKeys**: Resource using diskEncryptionSet would be encrypted at rest with two layers of encryption. One of the keys is Customer managed and the other key is Platform managed. \
 * **ConfidentialVmEncryptedWithCustomerKey**: Confidential VM supported disk and VM guest state would be encrypted with customer managed key.
 */
export type DiskEncryptionSetType = string;

/** Key Vault Key Url to be used for server side encryption of Managed Disks and Snapshots */
export interface KeyForDiskEncryptionSet {
  /** Resource id of the KeyVault containing the key or secret. This property is optional and cannot be used if the KeyVault subscription is not the same as the Disk Encryption Set subscription. */
  sourceVault?: SourceVault;
  /** Fully versioned Key Url pointing to a key in KeyVault. Version segment of the Url is required regardless of rotationToLatestKeyVersionEnabled value. */
  keyUrl: string;
}

export function keyForDiskEncryptionSetSerializer(item: KeyForDiskEncryptionSet): any {
  return {
    sourceVault: !item["sourceVault"]
      ? item["sourceVault"]
      : sourceVaultSerializer(item["sourceVault"]),
    keyUrl: item["keyUrl"],
  };
}

export function keyForDiskEncryptionSetDeserializer(item: any): KeyForDiskEncryptionSet {
  return {
    sourceVault: !item["sourceVault"]
      ? item["sourceVault"]
      : sourceVaultDeserializer(item["sourceVault"]),
    keyUrl: item["keyUrl"],
  };
}

export function keyForDiskEncryptionSetArraySerializer(
  result: Array<KeyForDiskEncryptionSet>,
): any[] {
  return result.map((item) => {
    return keyForDiskEncryptionSetSerializer(item);
  });
}

export function keyForDiskEncryptionSetArrayDeserializer(
  result: Array<KeyForDiskEncryptionSet>,
): any[] {
  return result.map((item) => {
    return keyForDiskEncryptionSetDeserializer(item);
  });
}

/** The managed identity for the disk encryption set. It should be given permission on the key vault before it can be used to encrypt disks. */
export interface EncryptionSetIdentity {
  /** The type of Managed Identity used by the DiskEncryptionSet. Only SystemAssigned is supported for new creations. Disk Encryption Sets can be updated with Identity type None during migration of subscription to a new Azure Active Directory tenant; it will cause the encrypted resources to lose access to the keys. */
  type?: DiskEncryptionSetIdentityType;
  /** The object id of the Managed Identity Resource. This will be sent to the RP from ARM via the x-ms-identity-principal-id header in the PUT request if the resource has a systemAssigned(implicit) identity */
  readonly principalId?: string;
  /** The tenant id of the Managed Identity Resource. This will be sent to the RP from ARM via the x-ms-client-tenant-id header in the PUT request if the resource has a systemAssigned(implicit) identity */
  readonly tenantId?: string;
  /** The list of user identities associated with the disk encryption set. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserAssignedIdentitiesValue>;
}

export function encryptionSetIdentitySerializer(item: EncryptionSetIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function encryptionSetIdentityDeserializer(item: any): EncryptionSetIdentity {
  return {
    type: item["type"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of Managed Identity used by the DiskEncryptionSet. Only SystemAssigned is supported for new creations. Disk Encryption Sets can be updated with Identity type None during migration of subscription to a new Azure Active Directory tenant; it will cause the encrypted resources to lose access to the keys. */
export enum KnownDiskEncryptionSetIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssigned, UserAssigned */
  SystemAssignedUserAssigned = "SystemAssigned, UserAssigned",
  /** None */
  None = "None",
}

/**
 * The type of Managed Identity used by the DiskEncryptionSet. Only SystemAssigned is supported for new creations. Disk Encryption Sets can be updated with Identity type None during migration of subscription to a new Azure Active Directory tenant; it will cause the encrypted resources to lose access to the keys. \
 * {@link KnownDiskEncryptionSetIdentityType} can be used interchangeably with DiskEncryptionSetIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned** \
 * **UserAssigned** \
 * **SystemAssigned, UserAssigned** \
 * **None**
 */
export type DiskEncryptionSetIdentityType = string;

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
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitiesValueSerializer(item: UserAssignedIdentitiesValue): any {
  return item;
}

export function userAssignedIdentitiesValueDeserializer(item: any): UserAssignedIdentitiesValue {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** disk encryption set update resource. */
export interface DiskEncryptionSetUpdate {
  /** Resource tags */
  tags?: Record<string, string>;
  /** The managed identity for the disk encryption set. It should be given permission on the key vault before it can be used to encrypt disks. */
  identity?: EncryptionSetIdentity;
  /** The type of key used to encrypt the data of the disk. */
  encryptionType?: DiskEncryptionSetType;
  /** Key Vault Key Url to be used for server side encryption of Managed Disks and Snapshots */
  activeKey?: KeyForDiskEncryptionSet;
  /** Set this flag to true to enable auto-updating of this disk encryption set to the latest key version. */
  rotationToLatestKeyVersionEnabled?: boolean;
  /** Multi-tenant application client id to access key vault in a different tenant. Setting the value to 'None' will clear the property. */
  federatedClientId?: string;
}

export function diskEncryptionSetUpdateSerializer(item: DiskEncryptionSetUpdate): any {
  return {
    properties: areAllPropsUndefined(item, [
      "encryptionType",
      "activeKey",
      "rotationToLatestKeyVersionEnabled",
      "federatedClientId",
    ])
      ? undefined
      : _diskEncryptionSetUpdatePropertiesSerializer(item),
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : encryptionSetIdentitySerializer(item["identity"]),
  };
}

/** disk encryption set resource update properties. */
export interface DiskEncryptionSetUpdateProperties {
  /** The type of key used to encrypt the data of the disk. */
  encryptionType?: DiskEncryptionSetType;
  /** Key Vault Key Url to be used for server side encryption of Managed Disks and Snapshots */
  activeKey?: KeyForDiskEncryptionSet;
  /** Set this flag to true to enable auto-updating of this disk encryption set to the latest key version. */
  rotationToLatestKeyVersionEnabled?: boolean;
  /** Multi-tenant application client id to access key vault in a different tenant. Setting the value to 'None' will clear the property. */
  federatedClientId?: string;
}

export function diskEncryptionSetUpdatePropertiesSerializer(
  item: DiskEncryptionSetUpdateProperties,
): any {
  return {
    encryptionType: item["encryptionType"],
    activeKey: !item["activeKey"]
      ? item["activeKey"]
      : keyForDiskEncryptionSetSerializer(item["activeKey"]),
    rotationToLatestKeyVersionEnabled: item["rotationToLatestKeyVersionEnabled"],
    federatedClientId: item["federatedClientId"],
  };
}

/** The List disk encryption set operation response. */
export interface _DiskEncryptionSetList {
  /** The DiskEncryptionSet items on this page */
  value: DiskEncryptionSet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _diskEncryptionSetListDeserializer(item: any): _DiskEncryptionSetList {
  return {
    value: diskEncryptionSetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function diskEncryptionSetArraySerializer(result: Array<DiskEncryptionSet>): any[] {
  return result.map((item) => {
    return diskEncryptionSetSerializer(item);
  });
}

export function diskEncryptionSetArrayDeserializer(result: Array<DiskEncryptionSet>): any[] {
  return result.map((item) => {
    return diskEncryptionSetDeserializer(item);
  });
}

/** The List resources which are encrypted with the disk encryption set. */
export interface _ResourceUriList {
  /** A list of IDs or Owner IDs of resources which are encrypted with the disk encryption set. */
  value: string[];
  /** The uri to fetch the next page of encrypted resources. Call ListNext() with this to fetch the next page of encrypted resources. */
  nextLink?: string;
}

export function _resourceUriListDeserializer(item: any): _ResourceUriList {
  return {
    value: item["value"].map((p: any) => {
      return p;
    }),
    nextLink: item["nextLink"],
  };
}

/** Snapshot resource. */
export interface Snapshot extends TrackedResource {
  /** Unused. Always Null. */
  readonly managedBy?: string;
  /** The snapshots sku name. Can be Standard_LRS, Premium_LRS, or Standard_ZRS. This is an optional parameter for incremental snapshot and the default behavior is the SKU will be set to the same sku as the previous snapshot */
  sku?: SnapshotSku;
  /** The extended location where the snapshot will be created. Extended location cannot be changed. */
  extendedLocation?: ExtendedLocation;
  /** The time when the snapshot was created. */
  readonly timeCreated?: Date;
  /** The Operating System type. */
  osType?: OperatingSystemTypes;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** Purchase plan information for the image from which the source disk for the snapshot was originally created. */
  purchasePlan?: DiskPurchasePlan;
  /** List of supported capabilities for the image from which the source disk from the snapshot was originally created. */
  supportedCapabilities?: SupportedCapabilities;
  /** Disk source information. CreationData information cannot be changed after the disk has been created. */
  creationData?: CreationData;
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /** The size of the disk in bytes. This field is read only. */
  readonly diskSizeBytes?: number;
  /** The state of the snapshot. */
  readonly diskState?: DiskState;
  /** Unique Guid identifying the resource. */
  readonly uniqueId?: string;
  /** Encryption settings collection used be Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollection;
  /** The disk provisioning state. */
  readonly provisioningState?: string;
  /** Whether a snapshot is incremental. Incremental snapshots on the same disk occupy less space than full snapshots and can be diffed. */
  incremental?: boolean;
  /** Incremental snapshots for a disk share an incremental snapshot family id. The Get Page Range Diff API can only be called on incremental snapshots with the same family id. */
  readonly incrementalSnapshotFamilyId?: string;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: Encryption;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: NetworkAccessPolicy;
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Contains the security related information for the resource. */
  securityProfile?: DiskSecurityProfile;
  /** Indicates the OS on a snapshot supports hibernation. */
  supportsHibernation?: boolean;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Percentage complete for the background copy when a resource is created via the CopyStart operation. */
  completionPercent?: number;
  /** Indicates the error details if the background copy of a resource created via the CopyStart operation fails. */
  copyCompletionError?: CopyCompletionError;
  /** Additional authentication requirements when exporting or uploading to a disk or snapshot. */
  dataAccessAuthMode?: DataAccessAuthMode;
  /** The state of snapshot which determines the access availability of the snapshot. */
  readonly snapshotAccessState?: SnapshotAccessState;
}

export function snapshotSerializer(item: Snapshot): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "osType",
      "hyperVGeneration",
      "purchasePlan",
      "supportedCapabilities",
      "creationData",
      "diskSizeGB",
      "encryptionSettingsCollection",
      "incremental",
      "encryption",
      "networkAccessPolicy",
      "diskAccessId",
      "securityProfile",
      "supportsHibernation",
      "publicNetworkAccess",
      "completionPercent",
      "copyCompletionError",
      "dataAccessAuthMode",
    ])
      ? undefined
      : _snapshotPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : snapshotSkuSerializer(item["sku"]),
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
    ...(!item["properties"]
      ? item["properties"]
      : _snapshotPropertiesDeserializer(item["properties"])),
    managedBy: item["managedBy"],
    sku: !item["sku"] ? item["sku"] : snapshotSkuDeserializer(item["sku"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Snapshot resource properties. */
export interface SnapshotProperties {
  /** The time when the snapshot was created. */
  readonly timeCreated?: Date;
  /** The Operating System type. */
  osType?: OperatingSystemTypes;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** Purchase plan information for the image from which the source disk for the snapshot was originally created. */
  purchasePlan?: DiskPurchasePlan;
  /** List of supported capabilities for the image from which the source disk from the snapshot was originally created. */
  supportedCapabilities?: SupportedCapabilities;
  /** Disk source information. CreationData information cannot be changed after the disk has been created. */
  creationData: CreationData;
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /** The size of the disk in bytes. This field is read only. */
  readonly diskSizeBytes?: number;
  /** The state of the snapshot. */
  readonly diskState?: DiskState;
  /** Unique Guid identifying the resource. */
  readonly uniqueId?: string;
  /** Encryption settings collection used be Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollection;
  /** The disk provisioning state. */
  readonly provisioningState?: string;
  /** Whether a snapshot is incremental. Incremental snapshots on the same disk occupy less space than full snapshots and can be diffed. */
  incremental?: boolean;
  /** Incremental snapshots for a disk share an incremental snapshot family id. The Get Page Range Diff API can only be called on incremental snapshots with the same family id. */
  readonly incrementalSnapshotFamilyId?: string;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: Encryption;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: NetworkAccessPolicy;
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Contains the security related information for the resource. */
  securityProfile?: DiskSecurityProfile;
  /** Indicates the OS on a snapshot supports hibernation. */
  supportsHibernation?: boolean;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Percentage complete for the background copy when a resource is created via the CopyStart operation. */
  completionPercent?: number;
  /** Indicates the error details if the background copy of a resource created via the CopyStart operation fails. */
  copyCompletionError?: CopyCompletionError;
  /** Additional authentication requirements when exporting or uploading to a disk or snapshot. */
  dataAccessAuthMode?: DataAccessAuthMode;
  /** The state of snapshot which determines the access availability of the snapshot. */
  readonly snapshotAccessState?: SnapshotAccessState;
}

export function snapshotPropertiesSerializer(item: SnapshotProperties): any {
  return {
    osType: item["osType"],
    hyperVGeneration: item["hyperVGeneration"],
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : diskPurchasePlanSerializer(item["purchasePlan"]),
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : supportedCapabilitiesSerializer(item["supportedCapabilities"]),
    creationData: creationDataSerializer(item["creationData"]),
    diskSizeGB: item["diskSizeGB"],
    encryptionSettingsCollection: !item["encryptionSettingsCollection"]
      ? item["encryptionSettingsCollection"]
      : encryptionSettingsCollectionSerializer(item["encryptionSettingsCollection"]),
    incremental: item["incremental"],
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    networkAccessPolicy: item["networkAccessPolicy"],
    diskAccessId: item["diskAccessId"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : diskSecurityProfileSerializer(item["securityProfile"]),
    supportsHibernation: item["supportsHibernation"],
    publicNetworkAccess: item["publicNetworkAccess"],
    completionPercent: item["completionPercent"],
    copyCompletionError: !item["copyCompletionError"]
      ? item["copyCompletionError"]
      : copyCompletionErrorSerializer(item["copyCompletionError"]),
    dataAccessAuthMode: item["dataAccessAuthMode"],
  };
}

export function snapshotPropertiesDeserializer(item: any): SnapshotProperties {
  return {
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    osType: item["osType"],
    hyperVGeneration: item["hyperVGeneration"],
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : diskPurchasePlanDeserializer(item["purchasePlan"]),
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : supportedCapabilitiesDeserializer(item["supportedCapabilities"]),
    creationData: creationDataDeserializer(item["creationData"]),
    diskSizeGB: item["diskSizeGB"],
    diskSizeBytes: item["diskSizeBytes"],
    diskState: item["diskState"],
    uniqueId: item["uniqueId"],
    encryptionSettingsCollection: !item["encryptionSettingsCollection"]
      ? item["encryptionSettingsCollection"]
      : encryptionSettingsCollectionDeserializer(item["encryptionSettingsCollection"]),
    provisioningState: item["provisioningState"],
    incremental: item["incremental"],
    incrementalSnapshotFamilyId: item["incrementalSnapshotFamilyId"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    networkAccessPolicy: item["networkAccessPolicy"],
    diskAccessId: item["diskAccessId"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : diskSecurityProfileDeserializer(item["securityProfile"]),
    supportsHibernation: item["supportsHibernation"],
    publicNetworkAccess: item["publicNetworkAccess"],
    completionPercent: item["completionPercent"],
    copyCompletionError: !item["copyCompletionError"]
      ? item["copyCompletionError"]
      : copyCompletionErrorDeserializer(item["copyCompletionError"]),
    dataAccessAuthMode: item["dataAccessAuthMode"],
    snapshotAccessState: item["snapshotAccessState"],
  };
}

/** Indicates the error details if the background copy of a resource created via the CopyStart operation fails. */
export interface CopyCompletionError {
  /** Indicates the error code if the background copy of a resource created via the CopyStart operation fails. */
  errorCode: CopyCompletionErrorReason;
  /** Indicates the error message if the background copy of a resource created via the CopyStart operation fails. */
  errorMessage: string;
}

export function copyCompletionErrorSerializer(item: CopyCompletionError): any {
  return { errorCode: item["errorCode"], errorMessage: item["errorMessage"] };
}

export function copyCompletionErrorDeserializer(item: any): CopyCompletionError {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
  };
}

/** Indicates the error code if the background copy of a resource created via the CopyStart operation fails. */
export enum KnownCopyCompletionErrorReason {
  /** Indicates that the source snapshot was deleted while the background copy of the resource created via CopyStart operation was in progress. */
  CopySourceNotFound = "CopySourceNotFound",
}

/**
 * Indicates the error code if the background copy of a resource created via the CopyStart operation fails. \
 * {@link KnownCopyCompletionErrorReason} can be used interchangeably with CopyCompletionErrorReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CopySourceNotFound**: Indicates that the source snapshot was deleted while the background copy of the resource created via CopyStart operation was in progress.
 */
export type CopyCompletionErrorReason = string;

/** The state of snapshot which determines the access availability of the snapshot. */
export enum KnownSnapshotAccessState {
  /** Default value. */
  Unknown = "Unknown",
  /** The snapshot cannot be used for restore, copy or download to offline. */
  Pending = "Pending",
  /** The snapshot can be used for restore, copy to different region, and download to offline. */
  Available = "Available",
  /** The snapshot can be used for restoring disks with fast performance but cannot be copied or downloaded. */
  InstantAccess = "InstantAccess",
  /** The snapshot can be used for restoring disks with fast performance, copied and downloaded. */
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
 * **InstantAccess**: The snapshot can be used for restoring disks with fast performance but cannot be copied or downloaded. \
 * **AvailableWithInstantAccess**: The snapshot can be used for restoring disks with fast performance, copied and downloaded.
 */
export type SnapshotAccessState = string;

/** The snapshots sku name. Can be Standard_LRS, Premium_LRS, or Standard_ZRS. This is an optional parameter for incremental snapshot and the default behavior is the SKU will be set to the same sku as the previous snapshot */
export interface SnapshotSku {
  /** The sku name. */
  name?: SnapshotStorageAccountTypes;
  /** The sku tier. */
  readonly tier?: string;
}

export function snapshotSkuSerializer(item: SnapshotSku): any {
  return { name: item["name"] };
}

export function snapshotSkuDeserializer(item: any): SnapshotSku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** The sku name. */
export enum KnownSnapshotStorageAccountTypes {
  /** Standard HDD locally redundant storage */
  StandardLRS = "Standard_LRS",
  /** Premium SSD locally redundant storage */
  PremiumLRS = "Premium_LRS",
  /** Standard zone redundant storage */
  StandardZRS = "Standard_ZRS",
}

/**
 * The sku name. \
 * {@link KnownSnapshotStorageAccountTypes} can be used interchangeably with SnapshotStorageAccountTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS**: Standard HDD locally redundant storage \
 * **Premium_LRS**: Premium SSD locally redundant storage \
 * **Standard_ZRS**: Standard zone redundant storage
 */
export type SnapshotStorageAccountTypes = string;

/** Snapshot update resource. */
export interface SnapshotUpdate {
  /** Resource tags */
  tags?: Record<string, string>;
  /** The snapshots sku name. Can be Standard_LRS, Premium_LRS, or Standard_ZRS. This is an optional parameter for incremental snapshot and the default behavior is the SKU will be set to the same sku as the previous snapshot */
  sku?: SnapshotSku;
  /** the Operating System type. */
  osType?: OperatingSystemTypes;
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /** Encryption settings collection used be Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollection;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: Encryption;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: NetworkAccessPolicy;
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Indicates the OS on a snapshot supports hibernation. */
  supportsHibernation?: boolean;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Additional authentication requirements when exporting or uploading to a disk or snapshot. */
  dataAccessAuthMode?: DataAccessAuthMode;
  /** List of supported capabilities for the image from which the OS disk was created. */
  supportedCapabilities?: SupportedCapabilities;
  /** The state of snapshot which determines the access availability of the snapshot. */
  readonly snapshotAccessState?: SnapshotAccessState;
}

export function snapshotUpdateSerializer(item: SnapshotUpdate): any {
  return {
    properties: areAllPropsUndefined(item, [
      "osType",
      "diskSizeGB",
      "encryptionSettingsCollection",
      "encryption",
      "networkAccessPolicy",
      "diskAccessId",
      "supportsHibernation",
      "publicNetworkAccess",
      "dataAccessAuthMode",
      "supportedCapabilities",
    ])
      ? undefined
      : _snapshotUpdatePropertiesSerializer(item),
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : snapshotSkuSerializer(item["sku"]),
  };
}

/** Snapshot resource update properties. */
export interface SnapshotUpdateProperties {
  /** the Operating System type. */
  osType?: OperatingSystemTypes;
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /** Encryption settings collection used be Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollection;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: Encryption;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: NetworkAccessPolicy;
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Indicates the OS on a snapshot supports hibernation. */
  supportsHibernation?: boolean;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Additional authentication requirements when exporting or uploading to a disk or snapshot. */
  dataAccessAuthMode?: DataAccessAuthMode;
  /** List of supported capabilities for the image from which the OS disk was created. */
  supportedCapabilities?: SupportedCapabilities;
  /** The state of snapshot which determines the access availability of the snapshot. */
  readonly snapshotAccessState?: SnapshotAccessState;
}

export function snapshotUpdatePropertiesSerializer(item: SnapshotUpdateProperties): any {
  return {
    osType: item["osType"],
    diskSizeGB: item["diskSizeGB"],
    encryptionSettingsCollection: !item["encryptionSettingsCollection"]
      ? item["encryptionSettingsCollection"]
      : encryptionSettingsCollectionSerializer(item["encryptionSettingsCollection"]),
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    networkAccessPolicy: item["networkAccessPolicy"],
    diskAccessId: item["diskAccessId"],
    supportsHibernation: item["supportsHibernation"],
    publicNetworkAccess: item["publicNetworkAccess"],
    dataAccessAuthMode: item["dataAccessAuthMode"],
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : supportedCapabilitiesSerializer(item["supportedCapabilities"]),
  };
}

/** The List Snapshots operation response. */
export interface _SnapshotList {
  /** A list of snapshots. */
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

/** Properties of disk restore point */
export interface DiskRestorePoint extends ProxyResource {
  /** The timestamp of restorePoint creation */
  readonly timeCreated?: Date;
  /** arm id of source disk or source disk restore point. */
  readonly sourceResourceId?: string;
  /** The Operating System type. */
  readonly osType?: OperatingSystemTypes;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** Purchase plan information for the the image from which the OS disk was created. */
  purchasePlan?: DiskPurchasePlan;
  /** List of supported capabilities for the image from which the OS disk was created. */
  supportedCapabilities?: SupportedCapabilities;
  /** id of the backing snapshot's MIS family */
  readonly familyId?: string;
  /** unique incarnation id of the source disk */
  readonly sourceUniqueId?: string;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  readonly encryption?: Encryption;
  /** Indicates the OS on a disk supports hibernation. */
  supportsHibernation?: boolean;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: NetworkAccessPolicy;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Percentage complete for the background copy of disk restore point when source resource is from a different region. */
  completionPercent?: number;
  /** Replication state of disk restore point when source resource is from a different region. */
  readonly replicationState?: string;
  /** Location of source disk or source disk restore point when source resource is from a different region. */
  readonly sourceResourceLocation?: string;
  /** Contains the security related information for the resource. */
  securityProfile?: DiskSecurityProfile;
  /** Logical sector size in bytes for disk restore points of UltraSSD_LRS and PremiumV2_LRS disks. Supported values are 512 and 4096. 4096 is the default. */
  readonly logicalSectorSize?: number;
}

export function diskRestorePointDeserializer(item: any): DiskRestorePoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _diskRestorePointPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of an incremental disk restore point */
export interface DiskRestorePointProperties {
  /** The timestamp of restorePoint creation */
  readonly timeCreated?: Date;
  /** arm id of source disk or source disk restore point. */
  readonly sourceResourceId?: string;
  /** The Operating System type. */
  readonly osType?: OperatingSystemTypes;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** Purchase plan information for the the image from which the OS disk was created. */
  purchasePlan?: DiskPurchasePlan;
  /** List of supported capabilities for the image from which the OS disk was created. */
  supportedCapabilities?: SupportedCapabilities;
  /** id of the backing snapshot's MIS family */
  readonly familyId?: string;
  /** unique incarnation id of the source disk */
  readonly sourceUniqueId?: string;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  readonly encryption?: Encryption;
  /** Indicates the OS on a disk supports hibernation. */
  supportsHibernation?: boolean;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: NetworkAccessPolicy;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Percentage complete for the background copy of disk restore point when source resource is from a different region. */
  completionPercent?: number;
  /** Replication state of disk restore point when source resource is from a different region. */
  readonly replicationState?: string;
  /** Location of source disk or source disk restore point when source resource is from a different region. */
  readonly sourceResourceLocation?: string;
  /** Contains the security related information for the resource. */
  securityProfile?: DiskSecurityProfile;
  /** Logical sector size in bytes for disk restore points of UltraSSD_LRS and PremiumV2_LRS disks. Supported values are 512 and 4096. 4096 is the default. */
  readonly logicalSectorSize?: number;
}

export function diskRestorePointPropertiesDeserializer(item: any): DiskRestorePointProperties {
  return {
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    sourceResourceId: item["sourceResourceId"],
    osType: item["osType"],
    hyperVGeneration: item["hyperVGeneration"],
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : diskPurchasePlanDeserializer(item["purchasePlan"]),
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : supportedCapabilitiesDeserializer(item["supportedCapabilities"]),
    familyId: item["familyId"],
    sourceUniqueId: item["sourceUniqueId"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    supportsHibernation: item["supportsHibernation"],
    networkAccessPolicy: item["networkAccessPolicy"],
    publicNetworkAccess: item["publicNetworkAccess"],
    diskAccessId: item["diskAccessId"],
    completionPercent: item["completionPercent"],
    replicationState: item["replicationState"],
    sourceResourceLocation: item["sourceResourceLocation"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : diskSecurityProfileDeserializer(item["securityProfile"]),
    logicalSectorSize: item["logicalSectorSize"],
  };
}

/** The List Disk Restore Points operation response. */
export interface _DiskRestorePointList {
  /** The DiskRestorePoint items on this page */
  value: DiskRestorePoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _diskRestorePointListDeserializer(item: any): _DiskRestorePointList {
  return {
    value: diskRestorePointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function diskRestorePointArrayDeserializer(result: Array<DiskRestorePoint>): any[] {
  return result.map((item) => {
    return diskRestorePointDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-03-02 API version. */
  V20240302 = "2024-03-02",
  /** The 2025-01-02 API version. */
  V20250102 = "2025-01-02",
}

export function _diskPropertiesSerializer(item: Disk): any {
  return {
    osType: item["osType"],
    hyperVGeneration: item["hyperVGeneration"],
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : diskPurchasePlanSerializer(item["purchasePlan"]),
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : supportedCapabilitiesSerializer(item["supportedCapabilities"]),
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataSerializer(item["creationData"]),
    diskSizeGB: item["diskSizeGB"],
    encryptionSettingsCollection: !item["encryptionSettingsCollection"]
      ? item["encryptionSettingsCollection"]
      : encryptionSettingsCollectionSerializer(item["encryptionSettingsCollection"]),
    diskIOPSReadWrite: item["diskIopsReadWrite"],
    diskMBpsReadWrite: item["diskMBpsReadWrite"],
    diskIOPSReadOnly: item["diskIopsReadOnly"],
    diskMBpsReadOnly: item["diskMBpsReadOnly"],
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    maxShares: item["maxShares"],
    networkAccessPolicy: item["networkAccessPolicy"],
    diskAccessId: item["diskAccessId"],
    tier: item["tier"],
    burstingEnabled: item["burstingEnabled"],
    supportsHibernation: item["supportsHibernation"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : diskSecurityProfileSerializer(item["securityProfile"]),
    completionPercent: item["completionPercent"],
    publicNetworkAccess: item["publicNetworkAccess"],
    dataAccessAuthMode: item["dataAccessAuthMode"],
    optimizedForFrequentAttach: item["optimizedForFrequentAttach"],
    availabilityPolicy: !item["availabilityPolicy"]
      ? item["availabilityPolicy"]
      : availabilityPolicySerializer(item["availabilityPolicy"]),
  };
}

export function _diskPropertiesDeserializer(item: any) {
  return {
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    osType: item["osType"],
    hyperVGeneration: item["hyperVGeneration"],
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : diskPurchasePlanDeserializer(item["purchasePlan"]),
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : supportedCapabilitiesDeserializer(item["supportedCapabilities"]),
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataDeserializer(item["creationData"]),
    diskSizeGB: item["diskSizeGB"],
    diskSizeBytes: item["diskSizeBytes"],
    uniqueId: item["uniqueId"],
    encryptionSettingsCollection: !item["encryptionSettingsCollection"]
      ? item["encryptionSettingsCollection"]
      : encryptionSettingsCollectionDeserializer(item["encryptionSettingsCollection"]),
    provisioningState: item["provisioningState"],
    diskIopsReadWrite: item["diskIOPSReadWrite"],
    diskMBpsReadWrite: item["diskMBpsReadWrite"],
    diskIopsReadOnly: item["diskIOPSReadOnly"],
    diskMBpsReadOnly: item["diskMBpsReadOnly"],
    diskState: item["diskState"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    maxShares: item["maxShares"],
    shareInfo: !item["shareInfo"]
      ? item["shareInfo"]
      : shareInfoElementArrayDeserializer(item["shareInfo"]),
    networkAccessPolicy: item["networkAccessPolicy"],
    diskAccessId: item["diskAccessId"],
    burstingEnabledTime: !item["burstingEnabledTime"]
      ? item["burstingEnabledTime"]
      : new Date(item["burstingEnabledTime"]),
    tier: item["tier"],
    burstingEnabled: item["burstingEnabled"],
    propertyUpdatesInProgress: !item["propertyUpdatesInProgress"]
      ? item["propertyUpdatesInProgress"]
      : propertyUpdatesInProgressDeserializer(item["propertyUpdatesInProgress"]),
    supportsHibernation: item["supportsHibernation"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : diskSecurityProfileDeserializer(item["securityProfile"]),
    completionPercent: item["completionPercent"],
    publicNetworkAccess: item["publicNetworkAccess"],
    dataAccessAuthMode: item["dataAccessAuthMode"],
    optimizedForFrequentAttach: item["optimizedForFrequentAttach"],
    lastOwnershipUpdateTime: !item["LastOwnershipUpdateTime"]
      ? item["LastOwnershipUpdateTime"]
      : new Date(item["LastOwnershipUpdateTime"]),
    availabilityPolicy: !item["availabilityPolicy"]
      ? item["availabilityPolicy"]
      : availabilityPolicyDeserializer(item["availabilityPolicy"]),
  };
}

export function _diskUpdatePropertiesSerializer(item: DiskUpdate): any {
  return {
    osType: item["osType"],
    diskSizeGB: item["diskSizeGB"],
    encryptionSettingsCollection: !item["encryptionSettingsCollection"]
      ? item["encryptionSettingsCollection"]
      : encryptionSettingsCollectionSerializer(item["encryptionSettingsCollection"]),
    diskIOPSReadWrite: item["diskIopsReadWrite"],
    diskMBpsReadWrite: item["diskMBpsReadWrite"],
    diskIOPSReadOnly: item["diskIopsReadOnly"],
    diskMBpsReadOnly: item["diskMBpsReadOnly"],
    maxShares: item["maxShares"],
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    networkAccessPolicy: item["networkAccessPolicy"],
    diskAccessId: item["diskAccessId"],
    tier: item["tier"],
    burstingEnabled: item["burstingEnabled"],
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : diskPurchasePlanSerializer(item["purchasePlan"]),
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : supportedCapabilitiesSerializer(item["supportedCapabilities"]),
    supportsHibernation: item["supportsHibernation"],
    publicNetworkAccess: item["publicNetworkAccess"],
    dataAccessAuthMode: item["dataAccessAuthMode"],
    optimizedForFrequentAttach: item["optimizedForFrequentAttach"],
    availabilityPolicy: !item["availabilityPolicy"]
      ? item["availabilityPolicy"]
      : availabilityPolicySerializer(item["availabilityPolicy"]),
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _diskAccessPropertiesSerializer(item: DiskAccess): any {
  return item;
}

export function _diskAccessPropertiesDeserializer(item: any) {
  return {
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    provisioningState: item["provisioningState"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
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

export function _diskEncryptionSetPropertiesSerializer(item: DiskEncryptionSet): any {
  return {
    encryptionType: item["encryptionType"],
    activeKey: !item["activeKey"]
      ? item["activeKey"]
      : keyForDiskEncryptionSetSerializer(item["activeKey"]),
    rotationToLatestKeyVersionEnabled: item["rotationToLatestKeyVersionEnabled"],
    federatedClientId: item["federatedClientId"],
  };
}

export function _diskEncryptionSetPropertiesDeserializer(item: any) {
  return {
    encryptionType: item["encryptionType"],
    activeKey: !item["activeKey"]
      ? item["activeKey"]
      : keyForDiskEncryptionSetDeserializer(item["activeKey"]),
    previousKeys: !item["previousKeys"]
      ? item["previousKeys"]
      : keyForDiskEncryptionSetArrayDeserializer(item["previousKeys"]),
    provisioningState: item["provisioningState"],
    rotationToLatestKeyVersionEnabled: item["rotationToLatestKeyVersionEnabled"],
    lastKeyRotationTimestamp: !item["lastKeyRotationTimestamp"]
      ? item["lastKeyRotationTimestamp"]
      : new Date(item["lastKeyRotationTimestamp"]),
    autoKeyRotationError: !item["autoKeyRotationError"]
      ? item["autoKeyRotationError"]
      : apiErrorDeserializer(item["autoKeyRotationError"]),
    federatedClientId: item["federatedClientId"],
  };
}

export function _diskEncryptionSetUpdatePropertiesSerializer(item: DiskEncryptionSetUpdate): any {
  return {
    encryptionType: item["encryptionType"],
    activeKey: !item["activeKey"]
      ? item["activeKey"]
      : keyForDiskEncryptionSetSerializer(item["activeKey"]),
    rotationToLatestKeyVersionEnabled: item["rotationToLatestKeyVersionEnabled"],
    federatedClientId: item["federatedClientId"],
  };
}

export function _snapshotPropertiesSerializer(item: Snapshot): any {
  return {
    osType: item["osType"],
    hyperVGeneration: item["hyperVGeneration"],
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : diskPurchasePlanSerializer(item["purchasePlan"]),
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : supportedCapabilitiesSerializer(item["supportedCapabilities"]),
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataSerializer(item["creationData"]),
    diskSizeGB: item["diskSizeGB"],
    encryptionSettingsCollection: !item["encryptionSettingsCollection"]
      ? item["encryptionSettingsCollection"]
      : encryptionSettingsCollectionSerializer(item["encryptionSettingsCollection"]),
    incremental: item["incremental"],
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    networkAccessPolicy: item["networkAccessPolicy"],
    diskAccessId: item["diskAccessId"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : diskSecurityProfileSerializer(item["securityProfile"]),
    supportsHibernation: item["supportsHibernation"],
    publicNetworkAccess: item["publicNetworkAccess"],
    completionPercent: item["completionPercent"],
    copyCompletionError: !item["copyCompletionError"]
      ? item["copyCompletionError"]
      : copyCompletionErrorSerializer(item["copyCompletionError"]),
    dataAccessAuthMode: item["dataAccessAuthMode"],
  };
}

export function _snapshotPropertiesDeserializer(item: any) {
  return {
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    osType: item["osType"],
    hyperVGeneration: item["hyperVGeneration"],
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : diskPurchasePlanDeserializer(item["purchasePlan"]),
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : supportedCapabilitiesDeserializer(item["supportedCapabilities"]),
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataDeserializer(item["creationData"]),
    diskSizeGB: item["diskSizeGB"],
    diskSizeBytes: item["diskSizeBytes"],
    diskState: item["diskState"],
    uniqueId: item["uniqueId"],
    encryptionSettingsCollection: !item["encryptionSettingsCollection"]
      ? item["encryptionSettingsCollection"]
      : encryptionSettingsCollectionDeserializer(item["encryptionSettingsCollection"]),
    provisioningState: item["provisioningState"],
    incremental: item["incremental"],
    incrementalSnapshotFamilyId: item["incrementalSnapshotFamilyId"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    networkAccessPolicy: item["networkAccessPolicy"],
    diskAccessId: item["diskAccessId"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : diskSecurityProfileDeserializer(item["securityProfile"]),
    supportsHibernation: item["supportsHibernation"],
    publicNetworkAccess: item["publicNetworkAccess"],
    completionPercent: item["completionPercent"],
    copyCompletionError: !item["copyCompletionError"]
      ? item["copyCompletionError"]
      : copyCompletionErrorDeserializer(item["copyCompletionError"]),
    dataAccessAuthMode: item["dataAccessAuthMode"],
    snapshotAccessState: item["snapshotAccessState"],
  };
}

export function _snapshotUpdatePropertiesSerializer(item: SnapshotUpdate): any {
  return {
    osType: item["osType"],
    diskSizeGB: item["diskSizeGB"],
    encryptionSettingsCollection: !item["encryptionSettingsCollection"]
      ? item["encryptionSettingsCollection"]
      : encryptionSettingsCollectionSerializer(item["encryptionSettingsCollection"]),
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    networkAccessPolicy: item["networkAccessPolicy"],
    diskAccessId: item["diskAccessId"],
    supportsHibernation: item["supportsHibernation"],
    publicNetworkAccess: item["publicNetworkAccess"],
    dataAccessAuthMode: item["dataAccessAuthMode"],
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : supportedCapabilitiesSerializer(item["supportedCapabilities"]),
  };
}

export function _diskRestorePointPropertiesDeserializer(item: any) {
  return {
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    sourceResourceId: item["sourceResourceId"],
    osType: item["osType"],
    hyperVGeneration: item["hyperVGeneration"],
    purchasePlan: !item["purchasePlan"]
      ? item["purchasePlan"]
      : diskPurchasePlanDeserializer(item["purchasePlan"]),
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : supportedCapabilitiesDeserializer(item["supportedCapabilities"]),
    familyId: item["familyId"],
    sourceUniqueId: item["sourceUniqueId"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    supportsHibernation: item["supportsHibernation"],
    networkAccessPolicy: item["networkAccessPolicy"],
    publicNetworkAccess: item["publicNetworkAccess"],
    diskAccessId: item["diskAccessId"],
    completionPercent: item["completionPercent"],
    replicationState: item["replicationState"],
    sourceResourceLocation: item["sourceResourceLocation"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : diskSecurityProfileDeserializer(item["securityProfile"]),
    logicalSectorSize: item["logicalSectorSize"],
  };
}
