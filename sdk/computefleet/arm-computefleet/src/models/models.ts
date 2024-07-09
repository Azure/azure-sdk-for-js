// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { serializeRecord } from "../helpers/serializerHelpers.js";
import {
  TrackedResource as TrackedResourceRest,
  Fleet as FleetRest,
  FleetProperties as FleetPropertiesRest,
  SpotPriorityProfile as SpotPriorityProfileRest,
  RegularPriorityProfile as RegularPriorityProfileRest,
  VmSizeProfile as VmSizeProfileRest,
  ComputeProfile as ComputeProfileRest,
  BaseVirtualMachineProfile as BaseVirtualMachineProfileRest,
  VirtualMachineScaleSetOSProfile as VirtualMachineScaleSetOSProfileRest,
  WindowsConfiguration as WindowsConfigurationRest,
  AdditionalUnattendContent as AdditionalUnattendContentRest,
  PatchSettings as PatchSettingsRest,
  WindowsVMGuestPatchAutomaticByPlatformSettings as WindowsVMGuestPatchAutomaticByPlatformSettingsRest,
  WinRMConfiguration as WinRMConfigurationRest,
  WinRMListener as WinRMListenerRest,
  LinuxConfiguration as LinuxConfigurationRest,
  SshConfiguration as SshConfigurationRest,
  SshPublicKey as SshPublicKeyRest,
  LinuxPatchSettings as LinuxPatchSettingsRest,
  LinuxVMGuestPatchAutomaticByPlatformSettings as LinuxVMGuestPatchAutomaticByPlatformSettingsRest,
  VaultSecretGroup as VaultSecretGroupRest,
  SubResource as SubResourceRest,
  VaultCertificate as VaultCertificateRest,
  VirtualMachineScaleSetStorageProfile as VirtualMachineScaleSetStorageProfileRest,
  ImageReference as ImageReferenceRest,
  VirtualMachineScaleSetOSDisk as VirtualMachineScaleSetOSDiskRest,
  DiffDiskSettings as DiffDiskSettingsRest,
  VirtualHardDisk as VirtualHardDiskRest,
  VirtualMachineScaleSetManagedDiskParameters as VirtualMachineScaleSetManagedDiskParametersRest,
  DiskEncryptionSetParameters as DiskEncryptionSetParametersRest,
  VMDiskSecurityProfile as VMDiskSecurityProfileRest,
  VirtualMachineScaleSetDataDisk as VirtualMachineScaleSetDataDiskRest,
  VirtualMachineScaleSetNetworkProfile as VirtualMachineScaleSetNetworkProfileRest,
  ApiEntityReference as ApiEntityReferenceRest,
  VirtualMachineScaleSetNetworkConfiguration as VirtualMachineScaleSetNetworkConfigurationRest,
  VirtualMachineScaleSetNetworkConfigurationProperties as VirtualMachineScaleSetNetworkConfigurationPropertiesRest,
  VirtualMachineScaleSetNetworkConfigurationDnsSettings as VirtualMachineScaleSetNetworkConfigurationDnsSettingsRest,
  VirtualMachineScaleSetIPConfiguration as VirtualMachineScaleSetIPConfigurationRest,
  VirtualMachineScaleSetIPConfigurationProperties as VirtualMachineScaleSetIPConfigurationPropertiesRest,
  VirtualMachineScaleSetPublicIPAddressConfiguration as VirtualMachineScaleSetPublicIPAddressConfigurationRest,
  VirtualMachineScaleSetPublicIPAddressConfigurationProperties as VirtualMachineScaleSetPublicIPAddressConfigurationPropertiesRest,
  VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings as VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettingsRest,
  VirtualMachineScaleSetIpTag as VirtualMachineScaleSetIpTagRest,
  PublicIPAddressSku as PublicIPAddressSkuRest,
  SecurityProfile as SecurityProfileRest,
  UefiSettings as UefiSettingsRest,
  EncryptionIdentity as EncryptionIdentityRest,
  ProxyAgentSettings as ProxyAgentSettingsRest,
  DiagnosticsProfile as DiagnosticsProfileRest,
  BootDiagnostics as BootDiagnosticsRest,
  VirtualMachineScaleSetExtensionProfile as VirtualMachineScaleSetExtensionProfileRest,
  VirtualMachineScaleSetExtension as VirtualMachineScaleSetExtensionRest,
  VirtualMachineScaleSetExtensionProperties as VirtualMachineScaleSetExtensionPropertiesRest,
  KeyVaultSecretReference as KeyVaultSecretReferenceRest,
  ScheduledEventsProfile as ScheduledEventsProfileRest,
  TerminateNotificationProfile as TerminateNotificationProfileRest,
  OSImageNotificationProfile as OSImageNotificationProfileRest,
  CapacityReservationProfile as CapacityReservationProfileRest,
  ApplicationProfile as ApplicationProfileRest,
  VMGalleryApplication as VMGalleryApplicationRest,
  VirtualMachineScaleSetHardwareProfile as VirtualMachineScaleSetHardwareProfileRest,
  VMSizeProperties as VMSizePropertiesRest,
  ServiceArtifactReference as ServiceArtifactReferenceRest,
  SecurityPostureReference as SecurityPostureReferenceRest,
  VirtualMachineExtension as VirtualMachineExtensionRest,
  VirtualMachineExtensionProperties as VirtualMachineExtensionPropertiesRest,
  VirtualMachineExtensionInstanceView as VirtualMachineExtensionInstanceViewRest,
  InstanceViewStatus as InstanceViewStatusRest,
  ManagedServiceIdentity as ManagedServiceIdentityRest,
  Plan as PlanRest,
  FleetUpdate as FleetUpdateRest,
  ManagedServiceIdentityUpdate as ManagedServiceIdentityUpdateRest,
  ResourcePlanUpdate as ResourcePlanUpdateRest,
} from "../rest/index.js";

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

export function trackedResourceSerializer(
  item: TrackedResource,
): TrackedResourceRest {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
  };
}

/** An Compute Fleet resource */
export interface Fleet extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: FleetProperties;
  /** Zones in which the Compute Fleet is available */
  zones?: string[];
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Details of the resource plan. */
  plan?: Plan;
}

export function fleetSerializer(item: Fleet): FleetRest {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
    properties: !item.properties
      ? item.properties
      : fleetPropertiesSerializer(item.properties),
    zones: item["zones"],
    identity: !item.identity
      ? item.identity
      : managedServiceIdentitySerializer(item.identity),
    plan: !item.plan ? item.plan : planSerializer(item.plan),
  };
}

/** Details of the Compute Fleet. */
export interface FleetProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** Configuration Options for Spot instances in Compute Fleet. */
  spotPriorityProfile?: SpotPriorityProfile;
  /** Configuration Options for Regular instances in Compute Fleet. */
  regularPriorityProfile?: RegularPriorityProfile;
  /** List of VM sizes supported for Compute Fleet */
  vmSizesProfile: VmSizeProfile[];
  /** Compute Profile to use for running user's workloads. */
  computeProfile: ComputeProfile;
}

export function fleetPropertiesSerializer(
  item: FleetProperties,
): FleetPropertiesRest {
  return {
    spotPriorityProfile: !item.spotPriorityProfile
      ? item.spotPriorityProfile
      : spotPriorityProfileSerializer(item.spotPriorityProfile),
    regularPriorityProfile: !item.regularPriorityProfile
      ? item.regularPriorityProfile
      : regularPriorityProfileSerializer(item.regularPriorityProfile),
    vmSizesProfile: item["vmSizesProfile"].map(vmSizeProfileSerializer),
    computeProfile: computeProfileSerializer(item.computeProfile),
  };
}

/** Known values of {@link ResourceProvisioningState} that the service accepts. */
export enum KnownResourceProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The provisioning state of a resource type. \
 * {@link KnownResourceProvisioningState} can be used interchangeably with ResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed** \
 * **Canceled**
 */
export type ResourceProvisioningState = string;

/** Configuration Options for Spot instances in Compute Fleet. */
export interface SpotPriorityProfile {
  /** Total capacity to achieve. It is currently in terms of number of VMs. */
  capacity?: number;
  /** Minimum capacity to achieve which cannot be updated. If we will not be able to "guarantee" minimum capacity, we will reject the request in the sync path itself. */
  minCapacity?: number;
  /** Price per hour of each Spot VM will never exceed this. */
  maxPricePerVM?: number;
  /** Eviction Policy to follow when evicting Spot VMs. */
  evictionPolicy?: EvictionPolicy;
  /** Allocation strategy to follow when determining the VM sizes distribution for Spot VMs. */
  allocationStrategy?: SpotAllocationStrategy;
  /**
   * Flag to enable/disable continuous goal seeking for the desired capacity and restoration of evicted Spot VMs.
   * If maintain is enabled, AzureFleetRP will use all VM sizes in vmSizesProfile to create new VMs (if VMs are evicted deleted)
   * or update existing VMs with new VM sizes (if VMs are evicted deallocated or failed to allocate due to capacity constraint) in order to achieve the desired capacity.
   * Maintain is enabled by default.
   */
  maintain?: boolean;
}

export function spotPriorityProfileSerializer(
  item: SpotPriorityProfile,
): SpotPriorityProfileRest {
  return {
    capacity: item["capacity"],
    minCapacity: item["minCapacity"],
    maxPricePerVM: item["maxPricePerVM"],
    evictionPolicy: item["evictionPolicy"],
    allocationStrategy: item["allocationStrategy"],
    maintain: item["maintain"],
  };
}

/** Known values of {@link EvictionPolicy} that the service accepts. */
export enum KnownEvictionPolicy {
  /** Delete */
  Delete = "Delete",
  /** Deallocate */
  Deallocate = "Deallocate",
}

/**
 * Different kind of eviction policies \
 * {@link KnownEvictionPolicy} can be used interchangeably with EvictionPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete** \
 * **Deallocate**
 */
export type EvictionPolicy = string;

/** Known values of {@link SpotAllocationStrategy} that the service accepts. */
export enum KnownSpotAllocationStrategy {
  /** PriceCapacityOptimized */
  PriceCapacityOptimized = "PriceCapacityOptimized",
  /** LowestPrice */
  LowestPrice = "LowestPrice",
  /** CapacityOptimized */
  CapacityOptimized = "CapacityOptimized",
}

/**
 * Spot allocation strategy types for Compute Fleet \
 * {@link KnownSpotAllocationStrategy} can be used interchangeably with SpotAllocationStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PriceCapacityOptimized** \
 * **LowestPrice** \
 * **CapacityOptimized**
 */
export type SpotAllocationStrategy = string;

/** Configuration Options for Regular instances in Compute Fleet. */
export interface RegularPriorityProfile {
  /** Total capacity to achieve. It is currently in terms of number of VMs. */
  capacity?: number;
  /** Minimum capacity to achieve which cannot be updated. If we will not be able to "guarantee" minimum capacity, we will reject the request in the sync path itself. */
  minCapacity?: number;
  /** Allocation strategy to follow when determining the VM sizes distribution for Regular VMs. */
  allocationStrategy?: RegularPriorityAllocationStrategy;
}

export function regularPriorityProfileSerializer(
  item: RegularPriorityProfile,
): RegularPriorityProfileRest {
  return {
    capacity: item["capacity"],
    minCapacity: item["minCapacity"],
    allocationStrategy: item["allocationStrategy"],
  };
}

/** Known values of {@link RegularPriorityAllocationStrategy} that the service accepts. */
export enum KnownRegularPriorityAllocationStrategy {
  /** LowestPrice */
  LowestPrice = "LowestPrice",
  /** Prioritized */
  Prioritized = "Prioritized",
}

/**
 * Regular VM Allocation strategy types for Compute Fleet \
 * {@link KnownRegularPriorityAllocationStrategy} can be used interchangeably with RegularPriorityAllocationStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LowestPrice** \
 * **Prioritized**
 */
export type RegularPriorityAllocationStrategy = string;

/** Specifications about a VM Size. This will also contain the corresponding rank and weight in future. */
export interface VmSizeProfile {
  /** The Sku name (e.g. 'Standard_DS1_v2') */
  name: string;
  /**
   * The rank of the VM size. This is used with 'RegularPriorityAllocationStrategy.Prioritized'
   * The lower the number, the higher the priority. Starting with 0.
   */
  rank?: number;
}

export function vmSizeProfileSerializer(
  item: VmSizeProfile,
): VmSizeProfileRest {
  return {
    name: item["name"],
    rank: item["rank"],
  };
}

/** Compute Profile to use for running user's workloads. */
export interface ComputeProfile {
  /** Base Virtual Machine Profile Properties to be specified according to "specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/{computeApiVersion}/virtualMachineScaleSet.json#/definitions/VirtualMachineScaleSetVMProfile" */
  baseVirtualMachineProfile: BaseVirtualMachineProfile;
  /**
   * Specifies the Microsoft.Compute API version to use when creating underlying Virtual Machine scale sets and Virtual Machines.
   * The default value will be the latest supported computeApiVersion by Compute Fleet.
   */
  computeApiVersion?: string;
  /**
   * Specifies the number of fault domains to use when creating the underlying VMSS.
   * A fault domain is a logical group of hardware within an Azure datacenter.
   * VMs in the same fault domain share a common power source and network switch.
   * If not specified, defaults to 1, which represents "Max Spreading" (using as many fault domains as possible).
   * This property cannot be updated.
   */
  platformFaultDomainCount?: number;
}

export function computeProfileSerializer(
  item: ComputeProfile,
): ComputeProfileRest {
  return {
    baseVirtualMachineProfile: baseVirtualMachineProfileSerializer(
      item.baseVirtualMachineProfile,
    ),
    computeApiVersion: item["computeApiVersion"],
    platformFaultDomainCount: item["platformFaultDomainCount"],
  };
}

/** Describes the base virtual machine profile for fleet */
export interface BaseVirtualMachineProfile {
  /**
   * Specifies the operating system settings for the virtual machines in the scale
   * set.
   */
  osProfile?: VirtualMachineScaleSetOSProfile;
  /** Specifies the storage settings for the virtual machine disks. */
  storageProfile?: VirtualMachineScaleSetStorageProfile;
  /**
   * Specifies properties of the network interfaces of the virtual machines in the
   * scale set.
   */
  networkProfile?: VirtualMachineScaleSetNetworkProfile;
  /**
   * Specifies the Security related profile settings for the virtual machines in the
   * scale set.
   */
  securityProfile?: SecurityProfile;
  /** Specifies the boot diagnostic settings state. Minimum api-version: 2015-06-15. */
  diagnosticsProfile?: DiagnosticsProfile;
  /**
   * Specifies a collection of settings for extensions installed on virtual machines
   * in the scale set.
   */
  extensionProfile?: VirtualMachineScaleSetExtensionProfile;
  /**
   * Specifies that the image or disk that is being used was licensed on-premises.
   * <br><br> Possible values for Windows Server operating system are: <br><br>
   * Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux
   * Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS
   * (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for
   * Windows
   * Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing)
   * <br><br> [Azure Hybrid Use Benefit for Linux
   * Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux)
   * <br><br> Minimum api-version: 2015-06-15
   */
  licenseType?: string;
  /** Specifies Scheduled Event related configurations. */
  scheduledEventsProfile?: ScheduledEventsProfile;
  /**
   * UserData for the virtual machines in the scale set, which must be base-64
   * encoded. Customer should not pass any secrets in here. Minimum api-version:
   * 2021-03-01.
   */
  userData?: string;
  /**
   * Specifies the capacity reservation related details of a scale set. Minimum
   * api-version: 2021-04-01.
   */
  capacityReservation?: CapacityReservationProfile;
  /** Specifies the gallery applications that should be made available to the VM/VMSS */
  applicationProfile?: ApplicationProfile;
  /**
   * Specifies the hardware profile related details of a scale set. Minimum
   * api-version: 2021-11-01.
   */
  hardwareProfile?: VirtualMachineScaleSetHardwareProfile;
  /**
   * Specifies the service artifact reference id used to set same image version for
   * all virtual machines in the scale set when using 'latest' image version.
   * Minimum api-version: 2022-11-01
   */
  serviceArtifactReference?: ServiceArtifactReference;
  /**
   * Specifies the security posture to be used for all virtual machines in the scale
   * set. Minimum api-version: 2023-03-01
   */
  securityPostureReference?: SecurityPostureReference;
  /**
   * Specifies the time in which this VM profile for the Virtual Machine Scale Set
   * was created. Minimum API version for this property is 2023-09-01. This value
   * will be added to VMSS Flex VM tags when creating/updating the VMSS VM Profile
   * with minimum api-version 2023-09-01.
   */
  readonly timeCreated?: Date;
}

export function baseVirtualMachineProfileSerializer(
  item: BaseVirtualMachineProfile,
): BaseVirtualMachineProfileRest {
  return {
    osProfile: !item.osProfile
      ? item.osProfile
      : virtualMachineScaleSetOSProfileSerializer(item.osProfile),
    storageProfile: !item.storageProfile
      ? item.storageProfile
      : virtualMachineScaleSetStorageProfileSerializer(item.storageProfile),
    networkProfile: !item.networkProfile
      ? item.networkProfile
      : virtualMachineScaleSetNetworkProfileSerializer(item.networkProfile),
    securityProfile: !item.securityProfile
      ? item.securityProfile
      : securityProfileSerializer(item.securityProfile),
    diagnosticsProfile: !item.diagnosticsProfile
      ? item.diagnosticsProfile
      : diagnosticsProfileSerializer(item.diagnosticsProfile),
    extensionProfile: !item.extensionProfile
      ? item.extensionProfile
      : virtualMachineScaleSetExtensionProfileSerializer(item.extensionProfile),
    licenseType: item["licenseType"],
    scheduledEventsProfile: !item.scheduledEventsProfile
      ? item.scheduledEventsProfile
      : scheduledEventsProfileSerializer(item.scheduledEventsProfile),
    userData: item["userData"],
    capacityReservation: !item.capacityReservation
      ? item.capacityReservation
      : capacityReservationProfileSerializer(item.capacityReservation),
    applicationProfile: !item.applicationProfile
      ? item.applicationProfile
      : applicationProfileSerializer(item.applicationProfile),
    hardwareProfile: !item.hardwareProfile
      ? item.hardwareProfile
      : virtualMachineScaleSetHardwareProfileSerializer(item.hardwareProfile),
    serviceArtifactReference: !item.serviceArtifactReference
      ? item.serviceArtifactReference
      : serviceArtifactReferenceSerializer(item.serviceArtifactReference),
    securityPostureReference: !item.securityPostureReference
      ? item.securityPostureReference
      : securityPostureReferenceSerializer(item.securityPostureReference),
  };
}

/** Describes a virtual machine scale set OS profile. */
export interface VirtualMachineScaleSetOSProfile {
  /**
   * Specifies the computer name prefix for all of the virtual machines in the scale
   * set. Computer name prefixes must be 1 to 15 characters long.
   */
  computerNamePrefix?: string;
  /**
   * Specifies the name of the administrator account. <br><br> **Windows-only
   * restriction:** Cannot end in "." <br><br> **Disallowed values:**
   * "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3",
   * "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup",
   * "console", "david", "guest", "john", "owner", "root", "server", "sql",
   * "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5".
   * <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length
   * (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters
   */
  adminUsername?: string;
  /**
   * Specifies the password of the administrator account. <br><br> **Minimum-length
   * (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters
   * <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length
   * (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4
   * conditions below need to be fulfilled <br> Has lower characters <br>Has upper
   * characters <br> Has a digit <br> Has a special character (Regex match [\W_])
   * <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd",
   * "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1",
   * "Password22", "iloveyou!" <br><br> For resetting the password, see [How to
   * reset the Remote Desktop service or its login password in a Windows
   * VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp)
   * <br><br> For resetting root password, see [Manage users, SSH, and check or
   * repair disks on Azure Linux VMs using the VMAccess
   * Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection)
   */
  adminPassword?: string;
  /**
   * Specifies a base-64 encoded string of custom data. The base-64 encoded string
   * is decoded to a binary array that is saved as a file on the Virtual Machine.
   * The maximum length of the binary array is 65535 bytes. For using cloud-init for
   * your VM, see [Using cloud-init to customize a Linux VM during
   * creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init)
   */
  customData?: string;
  /** Specifies Windows operating system settings on the virtual machine. */
  windowsConfiguration?: WindowsConfiguration;
  /**
   * Specifies the Linux operating system settings on the virtual machine. For a
   * list of supported Linux distributions, see [Linux on Azure-Endorsed
   * Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros).
   */
  linuxConfiguration?: LinuxConfiguration;
  /**
   * Specifies set of certificates that should be installed onto the virtual
   * machines in the scale set. To install certificates on a virtual machine it is
   * recommended to use the [Azure Key Vault virtual machine extension for
   * Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux)
   * or the [Azure Key Vault virtual machine extension for
   * Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows).
   */
  secrets?: VaultSecretGroup[];
  /**
   * Specifies whether extension operations should be allowed on the virtual machine
   * scale set. This may only be set to False when no extensions are present on the
   * virtual machine scale set.
   */
  allowExtensionOperations?: boolean;
  /** Optional property which must either be set to True or omitted. */
  requireGuestProvisionSignal?: boolean;
}

export function virtualMachineScaleSetOSProfileSerializer(
  item: VirtualMachineScaleSetOSProfile,
): VirtualMachineScaleSetOSProfileRest {
  return {
    computerNamePrefix: item["computerNamePrefix"],
    adminUsername: item["adminUsername"],
    adminPassword: item["adminPassword"],
    customData: item["customData"],
    windowsConfiguration: !item.windowsConfiguration
      ? item.windowsConfiguration
      : windowsConfigurationSerializer(item.windowsConfiguration),
    linuxConfiguration: !item.linuxConfiguration
      ? item.linuxConfiguration
      : linuxConfigurationSerializer(item.linuxConfiguration),
    secrets:
      item["secrets"] === undefined
        ? item["secrets"]
        : item["secrets"].map(vaultSecretGroupSerializer),
    allowExtensionOperations: item["allowExtensionOperations"],
    requireGuestProvisionSignal: item["requireGuestProvisionSignal"],
  };
}

/** Specifies Windows operating system settings on the virtual machine. */
export interface WindowsConfiguration {
  /**
   * Indicates whether virtual machine agent should be provisioned on the virtual
   * machine. When this property is not specified in the request body, it is set to
   * true by default. This will ensure that VM Agent is installed on the VM so that
   * extensions can be added to the VM later.
   */
  provisionVMAgent?: boolean;
  /**
   * Indicates whether Automatic Updates is enabled for the Windows virtual machine.
   * Default value is true. For virtual machine scale sets, this property can be
   * updated and updates will take effect on OS reprovisioning.
   */
  enableAutomaticUpdates?: boolean;
  /**
   * Specifies the time zone of the virtual machine. e.g. "Pacific Standard Time".
   * Possible values can be
   * [TimeZoneInfo.Id](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.id?#System_TimeZoneInfo_Id)
   * value from time zones returned by
   * [TimeZoneInfo.GetSystemTimeZones](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.getsystemtimezones).
   */
  timeZone?: string;
  /**
   * Specifies additional base-64 encoded XML formatted information that can be
   * included in the Unattend.xml file, which is used by Windows Setup.
   */
  additionalUnattendContent?: AdditionalUnattendContent[];
  /** [Preview Feature] Specifies settings related to VM Guest Patching on Windows. */
  patchSettings?: PatchSettings;
  /**
   * Specifies the Windows Remote Management listeners. This enables remote Windows
   * PowerShell.
   */
  winRM?: WinRMConfiguration;
  /**
   * Indicates whether VMAgent Platform Updates is enabled for the Windows virtual
   * machine. Default value is false.
   */
  enableVMAgentPlatformUpdates?: boolean;
}

export function windowsConfigurationSerializer(
  item: WindowsConfiguration,
): WindowsConfigurationRest {
  return {
    provisionVMAgent: item["provisionVMAgent"],
    enableAutomaticUpdates: item["enableAutomaticUpdates"],
    timeZone: item["timeZone"],
    additionalUnattendContent:
      item["additionalUnattendContent"] === undefined
        ? item["additionalUnattendContent"]
        : item["additionalUnattendContent"].map(
            additionalUnattendContentSerializer,
          ),
    patchSettings: !item.patchSettings
      ? item.patchSettings
      : patchSettingsSerializer(item.patchSettings),
    winRM: !item.winRM ? item.winRM : winRMConfigurationSerializer(item.winRM),
    enableVMAgentPlatformUpdates: item["enableVMAgentPlatformUpdates"],
  };
}

/**
 * Specifies additional XML formatted information that can be included in the
 * Unattend.xml file, which is used by Windows Setup. Contents are defined by
 * setting name, component name, and the pass in which the content is applied.
 */
export interface AdditionalUnattendContent {
  /** The pass name. Currently, the only allowable value is OobeSystem. */
  passName?: "OobeSystem";
  /**
   * The component name. Currently, the only allowable value is
   * Microsoft-Windows-Shell-Setup.
   */
  componentName?: "Microsoft-Windows-Shell-Setup";
  /**
   * Specifies the name of the setting to which the content applies. Possible values
   * are: FirstLogonCommands and AutoLogon.
   */
  settingName?: SettingNames;
  /**
   * Specifies the XML formatted content that is added to the unattend.xml file for
   * the specified path and component. The XML must be less than 4KB and must
   * include the root element for the setting or feature that is being inserted.
   */
  content?: string;
}

export function additionalUnattendContentSerializer(
  item: AdditionalUnattendContent,
): AdditionalUnattendContentRest {
  return {
    passName: item["passName"],
    componentName: item["componentName"],
    settingName: item["settingName"],
    content: item["content"],
  };
}

/** Known values of {@link SettingNames} that the service accepts. */
export enum KnownSettingNames {
  /** AutoLogon */
  AutoLogon = "AutoLogon",
  /** FirstLogonCommands */
  FirstLogonCommands = "FirstLogonCommands",
}

/**
 * Specifies the name of the setting to which the content applies. Possible values
 * are: FirstLogonCommands and AutoLogon. \
 * {@link KnownSettingNames} can be used interchangeably with SettingNames,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AutoLogon** \
 * **FirstLogonCommands**
 */
export type SettingNames = string;

/** Specifies settings related to VM Guest Patching on Windows. */
export interface PatchSettings {
  /**
   * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual
   * machines associated to virtual machine scale set with OrchestrationMode as
   * Flexible.<br /><br /> Possible values are:<br /><br /> **Manual** - You
   * control the application of patches to a virtual machine. You do this by
   * applying patches manually inside the VM. In this mode, automatic updates are
   * disabled; the property WindowsConfiguration.enableAutomaticUpdates must be
   * false<br /><br /> **AutomaticByOS** - The virtual machine will automatically be
   * updated by the OS. The property WindowsConfiguration.enableAutomaticUpdates
   * must be true. <br /><br /> **AutomaticByPlatform** - the virtual machine will
   * automatically updated by the platform. The properties provisionVMAgent and
   * WindowsConfiguration.enableAutomaticUpdates must be true
   */
  patchMode?: WindowsVMGuestPatchMode;
  /**
   * Enables customers to patch their Azure VMs without requiring a reboot. For
   * enableHotpatching, the 'provisionVMAgent' must be set to true and 'patchMode'
   * must be set to 'AutomaticByPlatform'.
   */
  enableHotpatching?: boolean;
  /**
   * Specifies the mode of VM Guest patch assessment for the IaaS virtual
   * machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You
   * control the timing of patch assessments on a virtual machine.<br /><br />
   * **AutomaticByPlatform** - The platform will trigger periodic patch assessments.
   * The property provisionVMAgent must be true.
   */
  assessmentMode?: WindowsPatchAssessmentMode;
  /**
   * Specifies additional settings for patch mode AutomaticByPlatform in VM Guest
   * Patching on Windows.
   */
  automaticByPlatformSettings?: WindowsVMGuestPatchAutomaticByPlatformSettings;
}

export function patchSettingsSerializer(
  item: PatchSettings,
): PatchSettingsRest {
  return {
    patchMode: item["patchMode"],
    enableHotpatching: item["enableHotpatching"],
    assessmentMode: item["assessmentMode"],
    automaticByPlatformSettings: !item.automaticByPlatformSettings
      ? item.automaticByPlatformSettings
      : windowsVMGuestPatchAutomaticByPlatformSettingsSerializer(
          item.automaticByPlatformSettings,
        ),
  };
}

/** Known values of {@link WindowsVMGuestPatchMode} that the service accepts. */
export enum KnownWindowsVMGuestPatchMode {
  /** Manual */
  Manual = "Manual",
  /** AutomaticByOS */
  AutomaticByOS = "AutomaticByOS",
  /** AutomaticByPlatform */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual
 * machines associated to virtual machine scale set with OrchestrationMode as
 * Flexible. \
 * {@link KnownWindowsVMGuestPatchMode} can be used interchangeably with WindowsVMGuestPatchMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manual** \
 * **AutomaticByOS** \
 * **AutomaticByPlatform**
 */
export type WindowsVMGuestPatchMode = string;

/** Known values of {@link WindowsPatchAssessmentMode} that the service accepts. */
export enum KnownWindowsPatchAssessmentMode {
  /** ImageDefault */
  ImageDefault = "ImageDefault",
  /** AutomaticByPlatform */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest patch assessment for the IaaS virtual machine. \
 * {@link KnownWindowsPatchAssessmentMode} can be used interchangeably with WindowsPatchAssessmentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault** \
 * **AutomaticByPlatform**
 */
export type WindowsPatchAssessmentMode = string;

/**
 * Specifies additional settings to be applied when patch mode AutomaticByPlatform
 * is selected in Windows patch settings.
 */
export interface WindowsVMGuestPatchAutomaticByPlatformSettings {
  /**
   * Specifies the reboot setting for all AutomaticByPlatform patch installation
   * operations.
   */
  rebootSetting?: WindowsVMGuestPatchAutomaticByPlatformRebootSetting;
  /** Enables customer to schedule patching without accidental upgrades */
  bypassPlatformSafetyChecksOnUserSchedule?: boolean;
}

export function windowsVMGuestPatchAutomaticByPlatformSettingsSerializer(
  item: WindowsVMGuestPatchAutomaticByPlatformSettings,
): WindowsVMGuestPatchAutomaticByPlatformSettingsRest {
  return {
    rebootSetting: item["rebootSetting"],
    bypassPlatformSafetyChecksOnUserSchedule:
      item["bypassPlatformSafetyChecksOnUserSchedule"],
  };
}

/** Known values of {@link WindowsVMGuestPatchAutomaticByPlatformRebootSetting} that the service accepts. */
export enum KnownWindowsVMGuestPatchAutomaticByPlatformRebootSetting {
  /** Unknown */
  Unknown = "Unknown",
  /** IfRequired */
  IfRequired = "IfRequired",
  /** Never */
  Never = "Never",
  /** Always */
  Always = "Always",
}

/**
 * Specifies the reboot setting for all AutomaticByPlatform patch installation operations. \
 * {@link KnownWindowsVMGuestPatchAutomaticByPlatformRebootSetting} can be used interchangeably with WindowsVMGuestPatchAutomaticByPlatformRebootSetting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **IfRequired** \
 * **Never** \
 * **Always**
 */
export type WindowsVMGuestPatchAutomaticByPlatformRebootSetting = string;

/** Describes Windows Remote Management configuration of the VM */
export interface WinRMConfiguration {
  /** The list of Windows Remote Management listeners */
  listeners?: WinRMListener[];
}

export function winRMConfigurationSerializer(
  item: WinRMConfiguration,
): WinRMConfigurationRest {
  return {
    listeners:
      item["listeners"] === undefined
        ? item["listeners"]
        : item["listeners"].map(winRMListenerSerializer),
  };
}

/** Describes Protocol and thumbprint of Windows Remote Management listener */
export interface WinRMListener {
  /**
   * Specifies the protocol of WinRM listener. Possible values are: **http,**
   * **https.**
   */
  protocol?: ProtocolTypes;
  /**
   * This is the URL of a certificate that has been uploaded to Key Vault as a
   * secret. For adding a secret to the Key Vault, see [Add a key or secret to the
   * key
   * vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add).
   * In this case, your certificate needs to be the Base64 encoding of the following
   * JSON Object which is encoded in UTF-8: <br><br> {<br>
   * "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>
   * "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual
   * machine it is recommended to use the [Azure Key Vault virtual machine extension
   * for
   * Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux)
   * or the [Azure Key Vault virtual machine extension for
   * Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows).
   */
  certificateUrl?: string;
}

export function winRMListenerSerializer(
  item: WinRMListener,
): WinRMListenerRest {
  return {
    protocol: item["protocol"],
    certificateUrl: item["certificateUrl"],
  };
}

/** Known values of {@link ProtocolTypes} that the service accepts. */
export enum KnownProtocolTypes {
  /** Http */
  Http = "Http",
  /** Https */
  Https = "Https",
}

/**
 * Specifies the protocol of WinRM listener. Possible values are: **http,**
 * **https.** \
 * {@link KnownProtocolTypes} can be used interchangeably with ProtocolTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Http** \
 * **Https**
 */
export type ProtocolTypes = string;

/**
 * Specifies the Linux operating system settings on the virtual machine. For a
 * list of supported Linux distributions, see [Linux on Azure-Endorsed
 * Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros).
 */
export interface LinuxConfiguration {
  /** Specifies whether password authentication should be disabled. */
  disablePasswordAuthentication?: boolean;
  /** Specifies the ssh key configuration for a Linux OS. */
  ssh?: SshConfiguration;
  /**
   * Indicates whether virtual machine agent should be provisioned on the virtual
   * machine. When this property is not specified in the request body, default
   * behavior is to set it to true. This will ensure that VM Agent is installed on
   * the VM so that extensions can be added to the VM later.
   */
  provisionVMAgent?: boolean;
  /** [Preview Feature] Specifies settings related to VM Guest Patching on Linux. */
  patchSettings?: LinuxPatchSettings;
  /**
   * Indicates whether VMAgent Platform Updates is enabled for the Linux virtual
   * machine. Default value is false.
   */
  enableVMAgentPlatformUpdates?: boolean;
}

export function linuxConfigurationSerializer(
  item: LinuxConfiguration,
): LinuxConfigurationRest {
  return {
    disablePasswordAuthentication: item["disablePasswordAuthentication"],
    ssh: !item.ssh ? item.ssh : sshConfigurationSerializer(item.ssh),
    provisionVMAgent: item["provisionVMAgent"],
    patchSettings: !item.patchSettings
      ? item.patchSettings
      : linuxPatchSettingsSerializer(item.patchSettings),
    enableVMAgentPlatformUpdates: item["enableVMAgentPlatformUpdates"],
  };
}

/** SSH configuration for Linux based VMs running on Azure */
export interface SshConfiguration {
  /** The list of SSH public keys used to authenticate with linux based VMs. */
  publicKeys?: SshPublicKey[];
}

export function sshConfigurationSerializer(
  item: SshConfiguration,
): SshConfigurationRest {
  return {
    publicKeys:
      item["publicKeys"] === undefined
        ? item["publicKeys"]
        : item["publicKeys"].map(sshPublicKeySerializer),
  };
}

/**
 * Contains information about SSH certificate public key and the path on the Linux
 * VM where the public key is placed.
 */
export interface SshPublicKey {
  /**
   * Specifies the full path on the created VM where ssh public key is stored. If
   * the file already exists, the specified key is appended to the file. Example:
   * /home/user/.ssh/authorized_keys
   */
  path?: string;
  /**
   * SSH public key certificate used to authenticate with the VM through ssh. The
   * key needs to be at least 2048-bit and in ssh-rsa format. For creating ssh keys,
   * see [Create SSH keys on Linux and Mac for Linux VMs in
   * Azure]https://docs.microsoft.com/azure/virtual-machines/linux/create-ssh-keys-detailed).
   */
  keyData?: string;
}

export function sshPublicKeySerializer(item: SshPublicKey): SshPublicKeyRest {
  return {
    path: item["path"],
    keyData: item["keyData"],
  };
}

/** Specifies settings related to VM Guest Patching on Linux. */
export interface LinuxPatchSettings {
  /**
   * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual
   * machines associated to virtual machine scale set with OrchestrationMode as
   * Flexible.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - The
   * virtual machine's default patching configuration is used. <br /><br />
   * **AutomaticByPlatform** - The virtual machine will be automatically updated by
   * the platform. The property provisionVMAgent must be true
   */
  patchMode?: LinuxVMGuestPatchMode;
  /**
   * Specifies the mode of VM Guest Patch Assessment for the IaaS virtual
   * machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You
   * control the timing of patch assessments on a virtual machine. <br /><br />
   * **AutomaticByPlatform** - The platform will trigger periodic patch assessments.
   * The property provisionVMAgent must be true.
   */
  assessmentMode?: LinuxPatchAssessmentMode;
  /**
   * Specifies additional settings for patch mode AutomaticByPlatform in VM Guest
   * Patching on Linux.
   */
  automaticByPlatformSettings?: LinuxVMGuestPatchAutomaticByPlatformSettings;
}

export function linuxPatchSettingsSerializer(
  item: LinuxPatchSettings,
): LinuxPatchSettingsRest {
  return {
    patchMode: item["patchMode"],
    assessmentMode: item["assessmentMode"],
    automaticByPlatformSettings: !item.automaticByPlatformSettings
      ? item.automaticByPlatformSettings
      : linuxVMGuestPatchAutomaticByPlatformSettingsSerializer(
          item.automaticByPlatformSettings,
        ),
  };
}

/** Known values of {@link LinuxVMGuestPatchMode} that the service accepts. */
export enum KnownLinuxVMGuestPatchMode {
  /** ImageDefault */
  ImageDefault = "ImageDefault",
  /** AutomaticByPlatform */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual
 * machines associated to virtual machine scale set with OrchestrationMode as
 * Flexible. \
 * {@link KnownLinuxVMGuestPatchMode} can be used interchangeably with LinuxVMGuestPatchMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault** \
 * **AutomaticByPlatform**
 */
export type LinuxVMGuestPatchMode = string;

/** Known values of {@link LinuxPatchAssessmentMode} that the service accepts. */
export enum KnownLinuxPatchAssessmentMode {
  /** ImageDefault */
  ImageDefault = "ImageDefault",
  /** AutomaticByPlatform */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest Patch Assessment for the IaaS virtual
 * machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You
 * control the timing of patch assessments on a virtual machine. <br /><br />
 * **AutomaticByPlatform** - The platform will trigger periodic patch assessments.
 * The property provisionVMAgent must be true. \
 * {@link KnownLinuxPatchAssessmentMode} can be used interchangeably with LinuxPatchAssessmentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault** \
 * **AutomaticByPlatform**
 */
export type LinuxPatchAssessmentMode = string;

/**
 * Specifies additional settings to be applied when patch mode AutomaticByPlatform
 * is selected in Linux patch settings.
 */
export interface LinuxVMGuestPatchAutomaticByPlatformSettings {
  /**
   * Specifies the reboot setting for all AutomaticByPlatform patch installation
   * operations.
   */
  rebootSetting?: LinuxVMGuestPatchAutomaticByPlatformRebootSetting;
  /** Enables customer to schedule patching without accidental upgrades */
  bypassPlatformSafetyChecksOnUserSchedule?: boolean;
}

export function linuxVMGuestPatchAutomaticByPlatformSettingsSerializer(
  item: LinuxVMGuestPatchAutomaticByPlatformSettings,
): LinuxVMGuestPatchAutomaticByPlatformSettingsRest {
  return {
    rebootSetting: item["rebootSetting"],
    bypassPlatformSafetyChecksOnUserSchedule:
      item["bypassPlatformSafetyChecksOnUserSchedule"],
  };
}

/** Known values of {@link LinuxVMGuestPatchAutomaticByPlatformRebootSetting} that the service accepts. */
export enum KnownLinuxVMGuestPatchAutomaticByPlatformRebootSetting {
  /** Unknown */
  Unknown = "Unknown",
  /** IfRequired */
  IfRequired = "IfRequired",
  /** Never */
  Never = "Never",
  /** Always */
  Always = "Always",
}

/**
 * Specifies the reboot setting for all AutomaticByPlatform patch installation
 * operations. \
 * {@link KnownLinuxVMGuestPatchAutomaticByPlatformRebootSetting} can be used interchangeably with LinuxVMGuestPatchAutomaticByPlatformRebootSetting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **IfRequired** \
 * **Never** \
 * **Always**
 */
export type LinuxVMGuestPatchAutomaticByPlatformRebootSetting = string;

/** Describes a set of certificates which are all in the same Key Vault. */
export interface VaultSecretGroup {
  /**
   * The relative URL of the Key Vault containing all of the certificates in
   * VaultCertificates.
   */
  sourceVault?: SubResource;
  /** The list of key vault references in SourceVault which contain certificates. */
  vaultCertificates?: VaultCertificate[];
}

export function vaultSecretGroupSerializer(
  item: VaultSecretGroup,
): VaultSecretGroupRest {
  return {
    sourceVault: !item.sourceVault
      ? item.sourceVault
      : subResourceSerializer(item.sourceVault),
    vaultCertificates:
      item["vaultCertificates"] === undefined
        ? item["vaultCertificates"]
        : item["vaultCertificates"].map(vaultCertificateSerializer),
  };
}

/** Describes SubResource */
export interface SubResource {
  /** Resource Id */
  id?: string;
}

export function subResourceSerializer(item: SubResource): SubResourceRest {
  return {
    id: item["id"],
  };
}

/**
 * Describes a single certificate reference in a Key Vault, and where the
 * certificate should reside on the VM.
 */
export interface VaultCertificate {
  /**
   * This is the URL of a certificate that has been uploaded to Key Vault as a
   * secret. For adding a secret to the Key Vault, see [Add a key or secret to the
   * key
   * vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add).
   * In this case, your certificate needs to be It is the Base64 encoding of the
   * following JSON Object which is encoded in UTF-8: <br><br> {<br>
   * "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>
   * "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual
   * machine it is recommended to use the [Azure Key Vault virtual machine extension
   * for
   * Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux)
   * or the [Azure Key Vault virtual machine extension for
   * Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows).
   */
  certificateUrl?: string;
  /**
   * For Windows VMs, specifies the certificate store on the Virtual Machine to
   * which the certificate should be added. The specified certificate store is
   * implicitly in the LocalMachine account. For Linux VMs, the certificate file is
   * placed under the /var/lib/waagent directory, with the file name
   * &lt;UppercaseThumbprint&gt;.crt for the X509 certificate file and
   * &lt;UppercaseThumbprint&gt;.prv for private key. Both of these files are .pem
   * formatted.
   */
  certificateStore?: string;
}

export function vaultCertificateSerializer(
  item: VaultCertificate,
): VaultCertificateRest {
  return {
    certificateUrl: item["certificateUrl"],
    certificateStore: item["certificateStore"],
  };
}

/** Describes a virtual machine scale set storage profile. */
export interface VirtualMachineScaleSetStorageProfile {
  /**
   * Specifies information about the image to use. You can specify information about
   * platform images, marketplace images, or virtual machine images. This element is
   * required when you want to use a platform image, marketplace image, or virtual
   * machine image, but is not used in other creation operations.
   */
  imageReference?: ImageReference;
  /**
   * Specifies information about the operating system disk used by the virtual
   * machines in the scale set. For more information about disks, see [About disks
   * and VHDs for Azure virtual
   * machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview).
   */
  osDisk?: VirtualMachineScaleSetOSDisk;
  /**
   * Specifies the parameters that are used to add data disks to the virtual
   * machines in the scale set. For more information about disks, see [About disks
   * and VHDs for Azure virtual
   * machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview).
   */
  dataDisks?: VirtualMachineScaleSetDataDisk[];
  /** Specifies the disk controller type configured for the virtual machines in the scale set. Minimum api-version: 2022-08-01 */
  diskControllerType?: DiskControllerTypes;
}

export function virtualMachineScaleSetStorageProfileSerializer(
  item: VirtualMachineScaleSetStorageProfile,
): VirtualMachineScaleSetStorageProfileRest {
  return {
    imageReference: !item.imageReference
      ? item.imageReference
      : imageReferenceSerializer(item.imageReference),
    osDisk: !item.osDisk
      ? item.osDisk
      : virtualMachineScaleSetOSDiskSerializer(item.osDisk),
    dataDisks:
      item["dataDisks"] === undefined
        ? item["dataDisks"]
        : item["dataDisks"].map(virtualMachineScaleSetDataDiskSerializer),
    diskControllerType: item["diskControllerType"],
  };
}

/**
 * Specifies information about the image to use. You can specify information about
 * platform images, marketplace images, or virtual machine images. This element is
 * required when you want to use a platform image, marketplace image, or virtual
 * machine image, but is not used in other creation operations. NOTE: Image
 * reference publisher and offer can only be set when you create the scale set.
 */
export interface ImageReference {
  /** Resource Id */
  id?: string;
  /** The image publisher. */
  publisher?: string;
  /**
   * Specifies the offer of the platform image or marketplace image used to create
   * the virtual machine.
   */
  offer?: string;
  /** The image SKU. */
  sku?: string;
  /**
   * Specifies the version of the platform image or marketplace image used to create
   * the virtual machine. The allowed formats are Major.Minor.Build or 'latest'.
   * Major, Minor, and Build are decimal numbers. Specify 'latest' to use the latest
   * version of an image available at deploy time. Even if you use 'latest', the VM
   * image will not automatically update after deploy time even if a new version
   * becomes available. Please do not use field 'version' for gallery image
   * deployment, gallery image should always use 'id' field for deployment, to use 'latest'
   * version of gallery image, just set
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{imageName}'
   * in the 'id' field without version input.
   */
  version?: string;
  /**
   * Specifies in decimal numbers, the version of platform image or marketplace
   * image used to create the virtual machine. This readonly field differs from 'version',
   * only if the value specified in 'version' field is 'latest'.
   */
  readonly exactVersion?: string;
  /**
   * Specified the shared gallery image unique id for vm deployment. This can be
   * fetched from shared gallery image GET call.
   */
  sharedGalleryImageId?: string;
  /**
   * Specified the community gallery image unique id for vm deployment. This can be
   * fetched from community gallery image GET call.
   */
  communityGalleryImageId?: string;
}

export function imageReferenceSerializer(
  item: ImageReference,
): ImageReferenceRest {
  return {
    id: item["id"],
    publisher: item["publisher"],
    offer: item["offer"],
    sku: item["sku"],
    version: item["version"],
    sharedGalleryImageId: item["sharedGalleryImageId"],
    communityGalleryImageId: item["communityGalleryImageId"],
  };
}

/** Describes a virtual machine scale set operating system disk. */
export interface VirtualMachineScaleSetOSDisk {
  /** The disk name. */
  name?: string;
  /**
   * Specifies the caching requirements. Possible values are: **None,**
   * **ReadOnly,** **ReadWrite.** The default values are: **None for Standard
   * storage. ReadOnly for Premium storage.**
   */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /**
   * Specifies how the virtual machines in the scale set should be created. The only
   * allowed value is: **FromImage.** This value is used when you are using an image
   * to create the virtual machine. If you are using a platform image, you also use
   * the imageReference element described above. If you are using a marketplace
   * image, you  also use the plan element previously described.
   */
  createOption: DiskCreateOptionTypes;
  /**
   * Specifies the ephemeral disk Settings for the operating system disk used by the
   * virtual machine scale set.
   */
  diffDiskSettings?: DiffDiskSettings;
  /**
   * Specifies the size of an empty data disk in gigabytes. This element can be used
   * to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB'
   * is the number of bytes x 1024^3 for the disk and the value cannot
   * be larger than 1023.
   */
  diskSizeGB?: number;
  /**
   * This property allows you to specify the type of the OS that is included in the
   * disk if creating a VM from user-image or a specialized VHD. Possible values
   * are: **Windows,** **Linux.**
   */
  osType?: OperatingSystemTypes;
  /** Specifies information about the unmanaged user image to base the scale set on. */
  image?: VirtualHardDisk;
  /**
   * Specifies the container urls that are used to store operating system disks for
   * the scale set.
   */
  vhdContainers?: string[];
  /** The managed disk parameters. */
  managedDisk?: VirtualMachineScaleSetManagedDiskParameters;
  /**
   * Specifies whether OS Disk should be deleted or detached upon VMSS Flex deletion
   * (This feature is available for VMSS with Flexible OrchestrationMode only).
   * <br><br> Possible values: <br><br> **Delete** If this value is used, the OS
   * disk is deleted when VMSS Flex VM is deleted.<br><br> **Detach** If this value
   * is used, the OS disk is retained after VMSS Flex VM is deleted. <br><br> The
   * default value is set to **Delete**. For an Ephemeral OS Disk, the default value
   * is set to **Delete**. User cannot change the delete option for Ephemeral OS
   * Disk.
   */
  deleteOption?: DiskDeleteOptionTypes;
}

export function virtualMachineScaleSetOSDiskSerializer(
  item: VirtualMachineScaleSetOSDisk,
): VirtualMachineScaleSetOSDiskRest {
  return {
    name: item["name"],
    caching: item["caching"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
    createOption: item["createOption"],
    diffDiskSettings: !item.diffDiskSettings
      ? item.diffDiskSettings
      : diffDiskSettingsSerializer(item.diffDiskSettings),
    diskSizeGB: item["diskSizeGB"],
    osType: item["osType"],
    image: !item.image ? item.image : virtualHardDiskSerializer(item.image),
    vhdContainers: item["vhdContainers"],
    managedDisk: !item.managedDisk
      ? item.managedDisk
      : virtualMachineScaleSetManagedDiskParametersSerializer(item.managedDisk),
    deleteOption: item["deleteOption"],
  };
}

/** Known values of {@link CachingTypes} that the service accepts. */
export enum KnownCachingTypes {
  /** None */
  None = "None",
  /** ReadOnly */
  ReadOnly = "ReadOnly",
  /** ReadWrite */
  ReadWrite = "ReadWrite",
}

/**
 * Specifies the caching requirements. \
 * {@link KnownCachingTypes} can be used interchangeably with CachingTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **ReadOnly** \
 * **ReadWrite**
 */
export type CachingTypes = string;

/** Known values of {@link DiskCreateOptionTypes} that the service accepts. */
export enum KnownDiskCreateOptionTypes {
  /** FromImage */
  FromImage = "FromImage",
  /** Empty */
  Empty = "Empty",
  /** Attach */
  Attach = "Attach",
  /** Copy */
  Copy = "Copy",
  /** Restore */
  Restore = "Restore",
}

/**
 * Specifies how the virtual machine should be created. \
 * {@link KnownDiskCreateOptionTypes} can be used interchangeably with DiskCreateOptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FromImage** \
 * **Empty** \
 * **Attach** \
 * **Copy** \
 * **Restore**
 */
export type DiskCreateOptionTypes = string;

/**
 * Describes the parameters of ephemeral disk settings that can be specified for
 * operating system disk. **Note:** The ephemeral disk settings can only be
 * specified for managed disk.
 */
export interface DiffDiskSettings {
  /** Specifies the ephemeral disk settings for operating system disk. */
  option?: DiffDiskOptions;
  /**
   * Specifies the ephemeral disk placement for operating system disk. Possible
   * values are: **CacheDisk,** **ResourceDisk.** The defaulting behavior is:
   * **CacheDisk** if one is configured for the VM size otherwise **ResourceDisk**
   * is used. Refer to the VM size documentation for Windows VM at
   * https://docs.microsoft.com/azure/virtual-machines/windows/sizes and Linux VM at
   * https://docs.microsoft.com/azure/virtual-machines/linux/sizes to check which VM
   * sizes exposes a cache disk.
   */
  placement?: DiffDiskPlacement;
}

export function diffDiskSettingsSerializer(
  item: DiffDiskSettings,
): DiffDiskSettingsRest {
  return {
    option: item["option"],
    placement: item["placement"],
  };
}

/** Known values of {@link DiffDiskOptions} that the service accepts. */
export enum KnownDiffDiskOptions {
  /** Local */
  Local = "Local",
}

/**
 * Specifies the ephemeral disk option for operating system disk. \
 * {@link KnownDiffDiskOptions} can be used interchangeably with DiffDiskOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Local**
 */
export type DiffDiskOptions = string;

/** Known values of {@link DiffDiskPlacement} that the service accepts. */
export enum KnownDiffDiskPlacement {
  /** CacheDisk */
  CacheDisk = "CacheDisk",
  /** ResourceDisk */
  ResourceDisk = "ResourceDisk",
  /** NvmeDisk */
  NvmeDisk = "NvmeDisk",
}

/**
 * Specifies the ephemeral disk placement for operating system disk. This property
 * can be used by user in the request to choose the location i.e, cache disk or
 * resource disk space for Ephemeral OS disk provisioning. For more information on
 * Ephemeral OS disk size requirements, please refer Ephemeral OS disk size
 * requirements for Windows VM at
 * https://docs.microsoft.com/azure/virtual-machines/windows/ephemeral-os-disks#size-requirements
 * and Linux VM at
 * https://docs.microsoft.com/azure/virtual-machines/linux/ephemeral-os-disks#size-requirements
 * Minimum api-version for NvmeDisk: 2024-03-01. \
 * {@link KnownDiffDiskPlacement} can be used interchangeably with DiffDiskPlacement,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CacheDisk** \
 * **ResourceDisk** \
 * **NvmeDisk**
 */
export type DiffDiskPlacement = string;

/** Known values of {@link OperatingSystemTypes} that the service accepts. */
export enum KnownOperatingSystemTypes {
  /** Windows */
  Windows = "Windows",
  /** Linux */
  Linux = "Linux",
}

/**
 * This property allows you to specify the type of the OS that is included in the
 * disk if creating a VM from user-image or a specialized VHD. Possible values
 * are: **Windows,** **Linux.** \
 * {@link KnownOperatingSystemTypes} can be used interchangeably with OperatingSystemTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows** \
 * **Linux**
 */
export type OperatingSystemTypes = string;

/** Describes the uri of a disk. */
export interface VirtualHardDisk {
  /** Specifies the virtual hard disk's uri. */
  uri?: string;
}

export function virtualHardDiskSerializer(
  item: VirtualHardDisk,
): VirtualHardDiskRest {
  return {
    uri: item["uri"],
  };
}

/** Describes the parameters of a ScaleSet managed disk. */
export interface VirtualMachineScaleSetManagedDiskParameters {
  /**
   * Specifies the storage account type for the managed disk. NOTE: UltraSSD_LRS can
   * only be used with data disks, it cannot be used with OS Disk.
   */
  storageAccountType?: StorageAccountTypes;
  /**
   * Specifies the customer managed disk encryption set resource id for the managed
   * disk.
   */
  diskEncryptionSet?: DiskEncryptionSetParameters;
  /** Specifies the security profile for the managed disk. */
  securityProfile?: VMDiskSecurityProfile;
}

export function virtualMachineScaleSetManagedDiskParametersSerializer(
  item: VirtualMachineScaleSetManagedDiskParameters,
): VirtualMachineScaleSetManagedDiskParametersRest {
  return {
    storageAccountType: item["storageAccountType"],
    diskEncryptionSet: !item.diskEncryptionSet
      ? item.diskEncryptionSet
      : diskEncryptionSetParametersSerializer(item.diskEncryptionSet),
    securityProfile: !item.securityProfile
      ? item.securityProfile
      : vMDiskSecurityProfileSerializer(item.securityProfile),
  };
}

/** Known values of {@link StorageAccountTypes} that the service accepts. */
export enum KnownStorageAccountTypes {
  /** Standard_LRS */
  Standard_LRS = "Standard_LRS",
  /** Premium_LRS */
  Premium_LRS = "Premium_LRS",
  /** StandardSSD_LRS */
  StandardSSD_LRS = "StandardSSD_LRS",
  /** UltraSSD_LRS */
  UltraSSD_LRS = "UltraSSD_LRS",
  /** Premium_ZRS */
  Premium_ZRS = "Premium_ZRS",
  /** StandardSSD_ZRS */
  StandardSSD_ZRS = "StandardSSD_ZRS",
  /** PremiumV2_LRS */
  PremiumV2_LRS = "PremiumV2_LRS",
}

/**
 * Specifies the storage account type for the managed disk. Managed OS disk
 * storage account type can only be set when you create the scale set. NOTE:
 * UltraSSD_LRS can only be used with data disks. It cannot be used with OS Disk.
 * Standard_LRS uses Standard HDD. StandardSSD_LRS uses Standard SSD. Premium_LRS
 * uses Premium SSD. UltraSSD_LRS uses Ultra disk. Premium_ZRS uses Premium SSD
 * zone redundant storage. StandardSSD_ZRS uses Standard SSD zone redundant
 * storage. For more information regarding disks supported for Windows Virtual
 * Machines, refer to
 * https://docs.microsoft.com/azure/virtual-machines/windows/disks-types and, for
 * Linux Virtual Machines, refer to
 * https://docs.microsoft.com/azure/virtual-machines/linux/disks-types \
 * {@link KnownStorageAccountTypes} can be used interchangeably with StorageAccountTypes,
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
export type StorageAccountTypes = string;

/**
 * Describes the parameter of customer managed disk encryption set resource id
 * that can be specified for disk. **Note:** The disk encryption set resource id
 * can only be specified for managed disk. Please refer
 * https://aka.ms/mdssewithcmkoverview for more details.
 */
export interface DiskEncryptionSetParameters {
  /** Resource Id */
  id?: string;
}

export function diskEncryptionSetParametersSerializer(
  item: DiskEncryptionSetParameters,
): DiskEncryptionSetParametersRest {
  return {
    id: item["id"],
  };
}

/**
 * Specifies the security profile settings for the managed disk. **Note:** It can
 * only be set for Confidential VMs.
 */
export interface VMDiskSecurityProfile {
  /**
   * Specifies the EncryptionType of the managed disk. It is set to
   * DiskWithVMGuestState for encryption of the managed disk along with VMGuestState
   * blob, VMGuestStateOnly for encryption of just the VMGuestState blob, and
   * NonPersistedTPM for not persisting firmware state in the VMGuestState blob..
   * **Note:** It can be set for only Confidential VMs.
   */
  securityEncryptionType?: SecurityEncryptionTypes;
  /**
   * Specifies the customer managed disk encryption set resource id for the managed
   * disk that is used for Customer Managed Key encrypted ConfidentialVM OS Disk and
   * VMGuest blob.
   */
  diskEncryptionSet?: DiskEncryptionSetParameters;
}

export function vMDiskSecurityProfileSerializer(
  item: VMDiskSecurityProfile,
): VMDiskSecurityProfileRest {
  return {
    securityEncryptionType: item["securityEncryptionType"],
    diskEncryptionSet: !item.diskEncryptionSet
      ? item.diskEncryptionSet
      : diskEncryptionSetParametersSerializer(item.diskEncryptionSet),
  };
}

/** Known values of {@link SecurityEncryptionTypes} that the service accepts. */
export enum KnownSecurityEncryptionTypes {
  /** VMGuestStateOnly */
  VMGuestStateOnly = "VMGuestStateOnly",
  /** DiskWithVMGuestState */
  DiskWithVMGuestState = "DiskWithVMGuestState",
  /** NonPersistedTPM */
  NonPersistedTPM = "NonPersistedTPM",
}

/**
 * Specifies the EncryptionType of the managed disk.
 * **Note:** It can be set for only Confidential VMs. \
 * {@link KnownSecurityEncryptionTypes} can be used interchangeably with SecurityEncryptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VMGuestStateOnly** \
 * **DiskWithVMGuestState** \
 * **NonPersistedTPM**
 */
export type SecurityEncryptionTypes = string;

/** Known values of {@link DiskDeleteOptionTypes} that the service accepts. */
export enum KnownDiskDeleteOptionTypes {
  /** Delete */
  Delete = "Delete",
  /** Detach */
  Detach = "Detach",
}

/**
 * Specifies the behavior of the managed disk when the VM gets deleted, for
 * example whether the managed disk is deleted or detached. Supported values are:
 * **Delete.** If this value is used, the managed disk is deleted when VM gets
 * deleted. **Detach.** If this value is used, the managed disk is retained after
 * VM gets deleted. Minimum api-version: 2021-03-01. \
 * {@link KnownDiskDeleteOptionTypes} can be used interchangeably with DiskDeleteOptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete** \
 * **Detach**
 */
export type DiskDeleteOptionTypes = string;

/** Describes a virtual machine scale set data disk. */
export interface VirtualMachineScaleSetDataDisk {
  /** The disk name. */
  name?: string;
  /**
   * Specifies the logical unit number of the data disk. This value is used to
   * identify data disks within the VM and therefore must be unique for each data
   * disk attached to a VM.
   */
  lun: number;
  /**
   * Specifies the caching requirements. Possible values are: **None,**
   * **ReadOnly,** **ReadWrite.** The default values are: **None for Standard
   * storage. ReadOnly for Premium storage.**
   */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** The create option. */
  createOption: DiskCreateOptionTypes;
  /**
   * Specifies the size of an empty data disk in gigabytes. This element can be used
   * to overwrite the size of the disk in a virtual machine image. The property
   * diskSizeGB is the number of bytes x 1024^3 for the disk and the value cannot be
   * larger than 1023.
   */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: VirtualMachineScaleSetManagedDiskParameters;
  /**
   * Specifies the Read-Write IOPS for the managed disk. Should be used only when
   * StorageAccountType is UltraSSD_LRS. If not specified, a default value would be
   * assigned based on diskSizeGB.
   */
  diskIOPSReadWrite?: number;
  /**
   * Specifies the bandwidth in MB per second for the managed disk. Should be used
   * only when StorageAccountType is UltraSSD_LRS. If not specified, a default value
   * would be assigned based on diskSizeGB.
   */
  diskMBpsReadWrite?: number;
  /**
   * Specifies whether data disk should be deleted or detached upon VMSS Flex
   * deletion (This feature is available for VMSS with Flexible OrchestrationMode
   * only).<br><br> Possible values: <br><br> **Delete** If this value is used, the
   * data disk is deleted when the VMSS Flex VM is deleted.<br><br> **Detach** If
   * this value is used, the data disk is retained after VMSS Flex VM is
   * deleted.<br><br> The default value is set to **Delete**.
   */
  deleteOption?: DiskDeleteOptionTypes;
}

export function virtualMachineScaleSetDataDiskSerializer(
  item: VirtualMachineScaleSetDataDisk,
): VirtualMachineScaleSetDataDiskRest {
  return {
    name: item["name"],
    lun: item["lun"],
    caching: item["caching"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
    createOption: item["createOption"],
    diskSizeGB: item["diskSizeGB"],
    managedDisk: !item.managedDisk
      ? item.managedDisk
      : virtualMachineScaleSetManagedDiskParametersSerializer(item.managedDisk),
    diskIOPSReadWrite: item["diskIOPSReadWrite"],
    diskMBpsReadWrite: item["diskMBpsReadWrite"],
    deleteOption: item["deleteOption"],
  };
}

/** Known values of {@link DiskControllerTypes} that the service accepts. */
export enum KnownDiskControllerTypes {
  /** SCSI */
  SCSI = "SCSI",
  /** NVMe */
  NVMe = "NVMe",
}

/**
 * Specifies the disk controller type configured for the VM and
 * VirtualMachineScaleSet. This property is only supported for virtual machines
 * whose operating system disk and VM sku supports Generation 2
 * (https://docs.microsoft.com/en-us/azure/virtual-machines/generation-2), please
 * check the HyperVGenerations capability returned as part of VM sku capabilities
 * in the response of Microsoft.Compute SKUs api for the region contains V2
 * (https://docs.microsoft.com/rest/api/compute/resourceskus/list). For more
 * information about Disk Controller Types supported please refer to
 * https://aka.ms/azure-diskcontrollertypes. \
 * {@link KnownDiskControllerTypes} can be used interchangeably with DiskControllerTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SCSI** \
 * **NVMe**
 */
export type DiskControllerTypes = string;

/** Describes a virtual machine scale set network profile. */
export interface VirtualMachineScaleSetNetworkProfile {
  /**
   * A reference to a load balancer probe used to determine the health of an
   * instance in the virtual machine scale set. The reference will be in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes/{probeName}'.
   */
  healthProbe?: ApiEntityReference;
  /** The list of network configurations. */
  networkInterfaceConfigurations?: VirtualMachineScaleSetNetworkConfiguration[];
  /**
   * specifies the Microsoft.Network API version used when creating networking
   * resources in the Network Interface Configurations for Virtual Machine Scale Set
   * with orchestration mode 'Flexible'
   */
  networkApiVersion?: NetworkApiVersion;
}

export function virtualMachineScaleSetNetworkProfileSerializer(
  item: VirtualMachineScaleSetNetworkProfile,
): VirtualMachineScaleSetNetworkProfileRest {
  return {
    healthProbe: !item.healthProbe
      ? item.healthProbe
      : apiEntityReferenceSerializer(item.healthProbe),
    networkInterfaceConfigurations:
      item["networkInterfaceConfigurations"] === undefined
        ? item["networkInterfaceConfigurations"]
        : item["networkInterfaceConfigurations"].map(
            virtualMachineScaleSetNetworkConfigurationSerializer,
          ),
    networkApiVersion: item["networkApiVersion"],
  };
}

/** The API entity reference. */
export interface ApiEntityReference {
  /**
   * The ARM resource id in the form of
   * /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/...
   */
  id?: string;
}

export function apiEntityReferenceSerializer(
  item: ApiEntityReference,
): ApiEntityReferenceRest {
  return {
    id: item["id"],
  };
}

/** Describes a virtual machine scale set network profile's network configurations. */
export interface VirtualMachineScaleSetNetworkConfiguration {
  /** The network configuration name. */
  name: string;
  /** Describes a virtual machine scale set network profile's IP configuration. */
  properties?: VirtualMachineScaleSetNetworkConfigurationProperties;
}

export function virtualMachineScaleSetNetworkConfigurationSerializer(
  item: VirtualMachineScaleSetNetworkConfiguration,
): VirtualMachineScaleSetNetworkConfigurationRest {
  return {
    name: item["name"],
    properties: !item.properties
      ? item.properties
      : virtualMachineScaleSetNetworkConfigurationPropertiesSerializer(
          item.properties,
        ),
  };
}

/** Describes a virtual machine scale set network profile's IP configuration. */
export interface VirtualMachineScaleSetNetworkConfigurationProperties {
  /**
   * Specifies the primary network interface in case the virtual machine has more
   * than 1 network interface.
   */
  primary?: boolean;
  /** Specifies whether the network interface is accelerated networking-enabled. */
  enableAcceleratedNetworking?: boolean;
  /** Specifies whether the network interface is disabled for tcp state tracking. */
  disableTcpStateTracking?: boolean;
  /** Specifies whether the network interface is FPGA networking-enabled. */
  enableFpga?: boolean;
  /** The network security group. */
  networkSecurityGroup?: SubResource;
  /** The dns settings to be applied on the network interfaces. */
  dnsSettings?: VirtualMachineScaleSetNetworkConfigurationDnsSettings;
  /** Specifies the IP configurations of the network interface. */
  ipConfigurations: VirtualMachineScaleSetIPConfiguration[];
  /** Whether IP forwarding enabled on this NIC. */
  enableIPForwarding?: boolean;
  /** Specify what happens to the network interface when the VM is deleted */
  deleteOption?: DeleteOptions;
  /**
   * Specifies whether the Auxiliary mode is enabled for the Network Interface
   * resource.
   */
  auxiliaryMode?: NetworkInterfaceAuxiliaryMode;
  /**
   * Specifies whether the Auxiliary sku is enabled for the Network Interface
   * resource.
   */
  auxiliarySku?: NetworkInterfaceAuxiliarySku;
}

export function virtualMachineScaleSetNetworkConfigurationPropertiesSerializer(
  item: VirtualMachineScaleSetNetworkConfigurationProperties,
): VirtualMachineScaleSetNetworkConfigurationPropertiesRest {
  return {
    primary: item["primary"],
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    disableTcpStateTracking: item["disableTcpStateTracking"],
    enableFpga: item["enableFpga"],
    networkSecurityGroup: !item.networkSecurityGroup
      ? item.networkSecurityGroup
      : subResourceSerializer(item.networkSecurityGroup),
    dnsSettings: !item.dnsSettings
      ? item.dnsSettings
      : virtualMachineScaleSetNetworkConfigurationDnsSettingsSerializer(
          item.dnsSettings,
        ),
    ipConfigurations: item["ipConfigurations"].map(
      virtualMachineScaleSetIPConfigurationSerializer,
    ),
    enableIPForwarding: item["enableIPForwarding"],
    deleteOption: item["deleteOption"],
    auxiliaryMode: item["auxiliaryMode"],
    auxiliarySku: item["auxiliarySku"],
  };
}

/** Describes a virtual machines scale sets network configuration's DNS settings. */
export interface VirtualMachineScaleSetNetworkConfigurationDnsSettings {
  /** List of DNS servers IP addresses */
  dnsServers?: string[];
}

export function virtualMachineScaleSetNetworkConfigurationDnsSettingsSerializer(
  item: VirtualMachineScaleSetNetworkConfigurationDnsSettings,
): VirtualMachineScaleSetNetworkConfigurationDnsSettingsRest {
  return {
    dnsServers: item["dnsServers"],
  };
}

/** Describes a virtual machine scale set network profile's IP configuration. */
export interface VirtualMachineScaleSetIPConfiguration {
  /** The IP configuration name. */
  name: string;
  /**
   * Describes a virtual machine scale set network profile's IP configuration
   * properties.
   */
  properties?: VirtualMachineScaleSetIPConfigurationProperties;
}

export function virtualMachineScaleSetIPConfigurationSerializer(
  item: VirtualMachineScaleSetIPConfiguration,
): VirtualMachineScaleSetIPConfigurationRest {
  return {
    name: item["name"],
    properties: !item.properties
      ? item.properties
      : virtualMachineScaleSetIPConfigurationPropertiesSerializer(
          item.properties,
        ),
  };
}

/**
 * Describes a virtual machine scale set network profile's IP configuration
 * properties.
 */
export interface VirtualMachineScaleSetIPConfigurationProperties {
  /** Specifies the identifier of the subnet. */
  subnet?: ApiEntityReference;
  /**
   * Specifies the primary network interface in case the virtual machine has more
   * than 1 network interface.
   */
  primary?: boolean;
  /** The publicIPAddressConfiguration. */
  publicIPAddressConfiguration?: VirtualMachineScaleSetPublicIPAddressConfiguration;
  /**
   * Available from Api-Version 2017-03-30 onwards, it represents whether the
   * specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible
   * values are: 'IPv4' and 'IPv6'.
   */
  privateIPAddressVersion?: IPVersion;
  /**
   * Specifies an array of references to backend address pools of application
   * gateways. A scale set can reference backend address pools of multiple
   * application gateways. Multiple scale sets cannot use the same application
   * gateway.
   */
  applicationGatewayBackendAddressPools?: SubResource[];
  /** Specifies an array of references to application security group. */
  applicationSecurityGroups?: SubResource[];
  /**
   * Specifies an array of references to backend address pools of load balancers. A
   * scale set can reference backend address pools of one public and one internal
   * load balancer. Multiple scale sets cannot use the same basic sku load balancer.
   */
  loadBalancerBackendAddressPools?: SubResource[];
  /**
   * Specifies an array of references to inbound Nat pools of the load balancers. A
   * scale set can reference inbound nat pools of one public and one internal load
   * balancer. Multiple scale sets cannot use the same basic sku load balancer.
   */
  loadBalancerInboundNatPools?: SubResource[];
}

export function virtualMachineScaleSetIPConfigurationPropertiesSerializer(
  item: VirtualMachineScaleSetIPConfigurationProperties,
): VirtualMachineScaleSetIPConfigurationPropertiesRest {
  return {
    subnet: !item.subnet
      ? item.subnet
      : apiEntityReferenceSerializer(item.subnet),
    primary: item["primary"],
    publicIPAddressConfiguration: !item.publicIPAddressConfiguration
      ? item.publicIPAddressConfiguration
      : virtualMachineScaleSetPublicIPAddressConfigurationSerializer(
          item.publicIPAddressConfiguration,
        ),
    privateIPAddressVersion: item["privateIPAddressVersion"],
    applicationGatewayBackendAddressPools:
      item["applicationGatewayBackendAddressPools"] === undefined
        ? item["applicationGatewayBackendAddressPools"]
        : item["applicationGatewayBackendAddressPools"].map(
            subResourceSerializer,
          ),
    applicationSecurityGroups:
      item["applicationSecurityGroups"] === undefined
        ? item["applicationSecurityGroups"]
        : item["applicationSecurityGroups"].map(subResourceSerializer),
    loadBalancerBackendAddressPools:
      item["loadBalancerBackendAddressPools"] === undefined
        ? item["loadBalancerBackendAddressPools"]
        : item["loadBalancerBackendAddressPools"].map(subResourceSerializer),
    loadBalancerInboundNatPools:
      item["loadBalancerInboundNatPools"] === undefined
        ? item["loadBalancerInboundNatPools"]
        : item["loadBalancerInboundNatPools"].map(subResourceSerializer),
  };
}

/**
 * Describes a virtual machines scale set IP Configuration's PublicIPAddress
 * configuration
 */
export interface VirtualMachineScaleSetPublicIPAddressConfiguration {
  /** The publicIP address configuration name. */
  name: string;
  /**
   * Describes a virtual machines scale set IP Configuration's PublicIPAddress
   * configuration
   */
  properties?: VirtualMachineScaleSetPublicIPAddressConfigurationProperties;
  /**
   * Describes the public IP Sku. It can only be set with OrchestrationMode as
   * Flexible.
   */
  sku?: PublicIPAddressSku;
}

export function virtualMachineScaleSetPublicIPAddressConfigurationSerializer(
  item: VirtualMachineScaleSetPublicIPAddressConfiguration,
): VirtualMachineScaleSetPublicIPAddressConfigurationRest {
  return {
    name: item["name"],
    properties: !item.properties
      ? item.properties
      : virtualMachineScaleSetPublicIPAddressConfigurationPropertiesSerializer(
          item.properties,
        ),
    sku: !item.sku ? item.sku : publicIPAddressSkuSerializer(item.sku),
  };
}

/**
 * Describes a virtual machines scale set IP Configuration's PublicIPAddress
 * configuration
 */
export interface VirtualMachineScaleSetPublicIPAddressConfigurationProperties {
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** The dns settings to be applied on the publicIP addresses . */
  dnsSettings?: VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings;
  /** The list of IP tags associated with the public IP address. */
  ipTags?: VirtualMachineScaleSetIpTag[];
  /** The PublicIPPrefix from which to allocate publicIP addresses. */
  publicIPPrefix?: SubResource;
  /**
   * Available from Api-Version 2019-07-01 onwards, it represents whether the
   * specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible
   * values are: 'IPv4' and 'IPv6'.
   */
  publicIPAddressVersion?: IPVersion;
  /** Specify what happens to the public IP when the VM is deleted */
  deleteOption?: DeleteOptions;
}

export function virtualMachineScaleSetPublicIPAddressConfigurationPropertiesSerializer(
  item: VirtualMachineScaleSetPublicIPAddressConfigurationProperties,
): VirtualMachineScaleSetPublicIPAddressConfigurationPropertiesRest {
  return {
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    dnsSettings: !item.dnsSettings
      ? item.dnsSettings
      : virtualMachineScaleSetPublicIPAddressConfigurationDnsSettingsSerializer(
          item.dnsSettings,
        ),
    ipTags:
      item["ipTags"] === undefined
        ? item["ipTags"]
        : item["ipTags"].map(virtualMachineScaleSetIpTagSerializer),
    publicIPPrefix: !item.publicIPPrefix
      ? item.publicIPPrefix
      : subResourceSerializer(item.publicIPPrefix),
    publicIPAddressVersion: item["publicIPAddressVersion"],
    deleteOption: item["deleteOption"],
  };
}

/** Describes a virtual machines scale sets network configuration's DNS settings. */
export interface VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings {
  /**
   * The Domain name label.The concatenation of the domain name label and vm index
   * will be the domain name labels of the PublicIPAddress resources that will be
   * created
   */
  domainNameLabel: string;
  /**
   * The Domain name label scope.The concatenation of the hashed domain name label
   * that generated according to the policy from domain name label scope and vm
   * index will be the domain name labels of the PublicIPAddress resources that will
   * be created
   */
  domainNameLabelScope?: DomainNameLabelScopeTypes;
}

export function virtualMachineScaleSetPublicIPAddressConfigurationDnsSettingsSerializer(
  item: VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings,
): VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettingsRest {
  return {
    domainNameLabel: item["domainNameLabel"],
    domainNameLabelScope: item["domainNameLabelScope"],
  };
}

/** Known values of {@link DomainNameLabelScopeTypes} that the service accepts. */
export enum KnownDomainNameLabelScopeTypes {
  /** TenantReuse */
  TenantReuse = "TenantReuse",
  /** SubscriptionReuse */
  SubscriptionReuse = "SubscriptionReuse",
  /** ResourceGroupReuse */
  ResourceGroupReuse = "ResourceGroupReuse",
  /** NoReuse */
  NoReuse = "NoReuse",
}

/**
 * The Domain name label scope.The concatenation of the hashed domain name label
 * that generated according to the policy from domain name label scope and vm
 * index will be the domain name labels of the PublicIPAddress resources that will
 * be created \
 * {@link KnownDomainNameLabelScopeTypes} can be used interchangeably with DomainNameLabelScopeTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TenantReuse** \
 * **SubscriptionReuse** \
 * **ResourceGroupReuse** \
 * **NoReuse**
 */
export type DomainNameLabelScopeTypes = string;

/** Contains the IP tag associated with the public IP address. */
export interface VirtualMachineScaleSetIpTag {
  /** IP tag type. Example: FirstPartyUsage. */
  ipTagType?: string;
  /** IP tag associated with the public IP. Example: SQL, Storage etc. */
  tag?: string;
}

export function virtualMachineScaleSetIpTagSerializer(
  item: VirtualMachineScaleSetIpTag,
): VirtualMachineScaleSetIpTagRest {
  return {
    ipTagType: item["ipTagType"],
    tag: item["tag"],
  };
}

/** Known values of {@link IPVersion} that the service accepts. */
export enum KnownIPVersion {
  /** IPv4 */
  IPv4 = "IPv4",
  /** IPv6 */
  IPv6 = "IPv6",
}

/**
 * Available from Api-Version 2017-03-30 onwards, it represents whether the
 * specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible
 * values are: 'IPv4' and 'IPv6'. \
 * {@link KnownIPVersion} can be used interchangeably with IPVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4** \
 * **IPv6**
 */
export type IPVersion = string;

/** Known values of {@link DeleteOptions} that the service accepts. */
export enum KnownDeleteOptions {
  /** Delete */
  Delete = "Delete",
  /** Detach */
  Detach = "Detach",
}

/**
 * Specify what happens to the network interface when the VM is deleted \
 * {@link KnownDeleteOptions} can be used interchangeably with DeleteOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete** \
 * **Detach**
 */
export type DeleteOptions = string;

/**
 * Describes the public IP Sku. It can only be set with OrchestrationMode as
 * Flexible.
 */
export interface PublicIPAddressSku {
  /** Specify public IP sku name */
  name?: PublicIPAddressSkuName;
  /** Specify public IP sku tier */
  tier?: PublicIPAddressSkuTier;
}

export function publicIPAddressSkuSerializer(
  item: PublicIPAddressSku,
): PublicIPAddressSkuRest {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** Known values of {@link PublicIPAddressSkuName} that the service accepts. */
export enum KnownPublicIPAddressSkuName {
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
}

/**
 * Specify public IP sku name. \
 * {@link KnownPublicIPAddressSkuName} can be used interchangeably with PublicIPAddressSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic** \
 * **Standard**
 */
export type PublicIPAddressSkuName = string;

/** Known values of {@link PublicIPAddressSkuTier} that the service accepts. */
export enum KnownPublicIPAddressSkuTier {
  /** Regional */
  Regional = "Regional",
  /** Global */
  Global = "Global",
}

/**
 * Specify public IP sku tier \
 * {@link KnownPublicIPAddressSkuTier} can be used interchangeably with PublicIPAddressSkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regional** \
 * **Global**
 */
export type PublicIPAddressSkuTier = string;

/** Known values of {@link NetworkInterfaceAuxiliaryMode} that the service accepts. */
export enum KnownNetworkInterfaceAuxiliaryMode {
  /** None */
  None = "None",
  /** AcceleratedConnections */
  AcceleratedConnections = "AcceleratedConnections",
  /** Floating */
  Floating = "Floating",
}

/**
 * Specifies whether the Auxiliary mode is enabled for the Network Interface
 * resource. \
 * {@link KnownNetworkInterfaceAuxiliaryMode} can be used interchangeably with NetworkInterfaceAuxiliaryMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **AcceleratedConnections** \
 * **Floating**
 */
export type NetworkInterfaceAuxiliaryMode = string;

/** Known values of {@link NetworkInterfaceAuxiliarySku} that the service accepts. */
export enum KnownNetworkInterfaceAuxiliarySku {
  /** None */
  None = "None",
  /** A1 */
  A1 = "A1",
  /** A2 */
  A2 = "A2",
  /** A4 */
  A4 = "A4",
  /** A8 */
  A8 = "A8",
}

/**
 * Specifies whether the Auxiliary sku is enabled for the Network Interface
 * resource. \
 * {@link KnownNetworkInterfaceAuxiliarySku} can be used interchangeably with NetworkInterfaceAuxiliarySku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **A1** \
 * **A2** \
 * **A4** \
 * **A8**
 */
export type NetworkInterfaceAuxiliarySku = string;

/** Known values of {@link NetworkApiVersion} that the service accepts. */
export enum KnownNetworkApiVersion {
  /** 2020-11-01 */
  "2020-11-01" = "2020-11-01",
}

/**
 * specifies the Microsoft.Network API version used when creating networking
 * resources in the Network Interface Configurations for Virtual Machine Scale Set
 * with orchestration mode 'Flexible' \
 * {@link KnownNetworkApiVersion} can be used interchangeably with NetworkApiVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **2020-11-01**
 */
export type NetworkApiVersion = string;

/**
 * Specifies the Security profile settings for the virtual machine or virtual
 * machine scale set.
 */
export interface SecurityProfile {
  /**
   * Specifies the security settings like secure boot and vTPM used while creating
   * the virtual machine. Minimum api-version: 2020-12-01.
   */
  uefiSettings?: UefiSettings;
  /**
   * This property can be used by user in the request to enable or disable the Host
   * Encryption for the virtual machine or virtual machine scale set. This will
   * enable the encryption for all the disks including Resource/Temp disk at host
   * itself. The default behavior is: The Encryption at host will be disabled unless
   * this property is set to true for the resource.
   */
  encryptionAtHost?: boolean;
  /**
   * Specifies the SecurityType of the virtual machine. It has to be set to any
   * specified value to enable UefiSettings. The default behavior is: UefiSettings
   * will not be enabled unless this property is set.
   */
  securityType?: SecurityTypes;
  /**
   * Specifies the Managed Identity used by ADE to get access token for keyvault
   * operations.
   */
  encryptionIdentity?: EncryptionIdentity;
  /**
   * Specifies ProxyAgent settings while creating the virtual machine. Minimum
   * api-version: 2023-09-01.
   */
  proxyAgentSettings?: ProxyAgentSettings;
}

export function securityProfileSerializer(
  item: SecurityProfile,
): SecurityProfileRest {
  return {
    uefiSettings: !item.uefiSettings
      ? item.uefiSettings
      : uefiSettingsSerializer(item.uefiSettings),
    encryptionAtHost: item["encryptionAtHost"],
    securityType: item["securityType"],
    encryptionIdentity: !item.encryptionIdentity
      ? item.encryptionIdentity
      : encryptionIdentitySerializer(item.encryptionIdentity),
    proxyAgentSettings: !item.proxyAgentSettings
      ? item.proxyAgentSettings
      : proxyAgentSettingsSerializer(item.proxyAgentSettings),
  };
}

/**
 * Specifies the security settings like secure boot and vTPM used while creating
 * the virtual machine. Minimum api-version: 2020-12-01.
 */
export interface UefiSettings {
  /**
   * Specifies whether secure boot should be enabled on the virtual machine. Minimum
   * api-version: 2020-12-01.
   */
  secureBootEnabled?: boolean;
  /**
   * Specifies whether vTPM should be enabled on the virtual machine. Minimum
   * api-version: 2020-12-01.
   */
  vTpmEnabled?: boolean;
}

export function uefiSettingsSerializer(item: UefiSettings): UefiSettingsRest {
  return {
    secureBootEnabled: item["secureBootEnabled"],
    vTpmEnabled: item["vTpmEnabled"],
  };
}

/** Known values of {@link SecurityTypes} that the service accepts. */
export enum KnownSecurityTypes {
  /** TrustedLaunch */
  TrustedLaunch = "TrustedLaunch",
  /** ConfidentialVM */
  ConfidentialVM = "ConfidentialVM",
}

/**
 * Specifies the SecurityType of the virtual machine. It has to be set to any
 * specified value to enable UefiSettings. The default behavior is: UefiSettings
 * will not be enabled unless this property is set. \
 * {@link KnownSecurityTypes} can be used interchangeably with SecurityTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TrustedLaunch** \
 * **ConfidentialVM**
 */
export type SecurityTypes = string;

/**
 * Specifies the Managed Identity used by ADE to get access token for keyvault
 * operations.
 */
export interface EncryptionIdentity {
  /** Specifies ARM Resource ID of one of the user identities associated with the VM. */
  userAssignedIdentityResourceId?: string;
}

export function encryptionIdentitySerializer(
  item: EncryptionIdentity,
): EncryptionIdentityRest {
  return {
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

/**
 * Specifies ProxyAgent settings while creating the virtual machine. Minimum
 * api-version: 2023-09-01.
 */
export interface ProxyAgentSettings {
  /**
   * Specifies whether ProxyAgent feature should be enabled on the virtual machine
   * or virtual machine scale set.
   */
  enabled?: boolean;
  /**
   * Specifies the mode that ProxyAgent will execute on if the feature is enabled.
   * ProxyAgent will start to audit or monitor but not enforce access control over
   * requests to host endpoints in Audit mode, while in Enforce mode it will enforce
   * access control. The default value is Enforce mode.
   */
  mode?: Mode;
  /**
   * Increase the value of this property allows user to reset the key used for
   * securing communication channel between guest and host.
   */
  keyIncarnationId?: number;
}

export function proxyAgentSettingsSerializer(
  item: ProxyAgentSettings,
): ProxyAgentSettingsRest {
  return {
    enabled: item["enabled"],
    mode: item["mode"],
    keyIncarnationId: item["keyIncarnationId"],
  };
}

/** Known values of {@link Mode} that the service accepts. */
export enum KnownMode {
  /** Audit */
  Audit = "Audit",
  /** Enforce */
  Enforce = "Enforce",
}

/**
 * Specifies the mode that ProxyAgent will execute on if the feature is enabled.
 * ProxyAgent will start to audit or monitor but not enforce access control over
 * requests to host endpoints in Audit mode, while in Enforce mode it will enforce
 * access control. The default value is Enforce mode. \
 * {@link KnownMode} can be used interchangeably with Mode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Audit** \
 * **Enforce**
 */
export type Mode = string;

/** Specifies the boot diagnostic settings state. Minimum api-version: 2015-06-15. */
export interface DiagnosticsProfile {
  /**
   * Boot Diagnostics is a debugging feature which allows you to view Console Output
   * and Screenshot to diagnose VM status. **NOTE**: If storageUri is being
   * specified then ensure that the storage account is in the same region and
   * subscription as the VM. You can easily view the output of your console log.
   * Azure also enables you to see a screenshot of the VM from the hypervisor.
   */
  bootDiagnostics?: BootDiagnostics;
}

export function diagnosticsProfileSerializer(
  item: DiagnosticsProfile,
): DiagnosticsProfileRest {
  return {
    bootDiagnostics: !item.bootDiagnostics
      ? item.bootDiagnostics
      : bootDiagnosticsSerializer(item.bootDiagnostics),
  };
}

/**
 * Boot Diagnostics is a debugging feature which allows you to view Console Output
 * and Screenshot to diagnose VM status. You can easily view the output of your
 * console log. Azure also enables you to see a screenshot of the VM from the
 * hypervisor.
 */
export interface BootDiagnostics {
  /** Whether boot diagnostics should be enabled on the Virtual Machine. */
  enabled?: boolean;
  /**
   * Uri of the storage account to use for placing the console output and
   * screenshot. If storageUri is not specified while enabling boot diagnostics,
   * managed storage will be used.
   */
  storageUri?: string;
}

export function bootDiagnosticsSerializer(
  item: BootDiagnostics,
): BootDiagnosticsRest {
  return {
    enabled: item["enabled"],
    storageUri: item["storageUri"],
  };
}

/** Describes a virtual machine scale set extension profile. */
export interface VirtualMachineScaleSetExtensionProfile {
  /** The virtual machine scale set child extension resources. */
  extensions?: VirtualMachineScaleSetExtension[];
  /**
   * Specifies the time alloted for all extensions to start. The time duration
   * should be between 15 minutes and 120 minutes (inclusive) and should be
   * specified in ISO 8601 format. The default value is 90 minutes (PT1H30M).
   * Minimum api-version: 2020-06-01.
   */
  extensionsTimeBudget?: string;
}

export function virtualMachineScaleSetExtensionProfileSerializer(
  item: VirtualMachineScaleSetExtensionProfile,
): VirtualMachineScaleSetExtensionProfileRest {
  return {
    extensions:
      item["extensions"] === undefined
        ? item["extensions"]
        : item["extensions"].map(virtualMachineScaleSetExtensionSerializer),
    extensionsTimeBudget: item["extensionsTimeBudget"],
  };
}

/** Describes a Virtual Machine Scale Set Extension. */
export interface VirtualMachineScaleSetExtension {
  /** Resource Id */
  readonly id?: string;
  /** The name of the extension. */
  name?: string;
  /** Resource type */
  readonly type?: string;
  /** Describes the properties of a Virtual Machine Scale Set Extension. */
  properties?: VirtualMachineScaleSetExtensionProperties;
}

export function virtualMachineScaleSetExtensionSerializer(
  item: VirtualMachineScaleSetExtension,
): VirtualMachineScaleSetExtensionRest {
  return {
    name: item["name"],
    properties: !item.properties
      ? item.properties
      : virtualMachineScaleSetExtensionPropertiesSerializer(item.properties),
  };
}

/** Describes the properties of a Virtual Machine Scale Set Extension. */
export interface VirtualMachineScaleSetExtensionProperties {
  /**
   * If a value is provided and is different from the previous value, the extension
   * handler will be forced to update even if the extension configuration has not
   * changed.
   */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  type?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /**
   * Indicates whether the extension should use a newer minor version if one is
   * available at deployment time. Once deployed, however, the extension will not
   * upgrade minor versions unless redeployed, even with this property set to true.
   */
  autoUpgradeMinorVersion?: boolean;
  /**
   * Indicates whether the extension should be automatically upgraded by the
   * platform if there is a newer version of the extension available.
   */
  enableAutomaticUpgrade?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: Record<string, any>;
  /**
   * The extension can contain either protectedSettings or
   * protectedSettingsFromKeyVault or no protected settings at all.
   */
  protectedSettings?: Record<string, any>;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /**
   * Collection of extension names after which this extension needs to be
   * provisioned.
   */
  provisionAfterExtensions?: string[];
  /**
   * Indicates whether failures stemming from the extension will be suppressed
   * (Operational failures such as not connecting to the VM will not be suppressed
   * regardless of this value). The default is false.
   */
  suppressFailures?: boolean;
  /**
   * The extensions protected settings that are passed by reference, and consumed
   * from key vault
   */
  protectedSettingsFromKeyVault?: KeyVaultSecretReference;
}

export function virtualMachineScaleSetExtensionPropertiesSerializer(
  item: VirtualMachineScaleSetExtensionProperties,
): VirtualMachineScaleSetExtensionPropertiesRest {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    settings: !item.settings
      ? item.settings
      : (serializeRecord(item.settings as any) as any),
    protectedSettings: !item.protectedSettings
      ? item.protectedSettings
      : (serializeRecord(item.protectedSettings as any) as any),
    provisionAfterExtensions: item["provisionAfterExtensions"],
    suppressFailures: item["suppressFailures"],
    protectedSettingsFromKeyVault: !item.protectedSettingsFromKeyVault
      ? item.protectedSettingsFromKeyVault
      : keyVaultSecretReferenceSerializer(item.protectedSettingsFromKeyVault),
  };
}

/** Describes a reference to Key Vault Secret */
export interface KeyVaultSecretReference {
  /** The URL referencing a secret in a Key Vault. */
  secretUrl: string;
  /** The relative URL of the Key Vault containing the secret. */
  sourceVault: SubResource;
}

export function keyVaultSecretReferenceSerializer(
  item: KeyVaultSecretReference,
): KeyVaultSecretReferenceRest {
  return {
    secretUrl: item["secretUrl"],
    sourceVault: subResourceSerializer(item.sourceVault),
  };
}

/** Specifies Scheduled Event related configurations. */
export interface ScheduledEventsProfile {
  /** Specifies Terminate Scheduled Event related configurations. */
  terminateNotificationProfile?: TerminateNotificationProfile;
  /** Specifies OS Image Scheduled Event related configurations. */
  osImageNotificationProfile?: OSImageNotificationProfile;
}

export function scheduledEventsProfileSerializer(
  item: ScheduledEventsProfile,
): ScheduledEventsProfileRest {
  return {
    terminateNotificationProfile: !item.terminateNotificationProfile
      ? item.terminateNotificationProfile
      : terminateNotificationProfileSerializer(
          item.terminateNotificationProfile,
        ),
    osImageNotificationProfile: !item.osImageNotificationProfile
      ? item.osImageNotificationProfile
      : oSImageNotificationProfileSerializer(item.osImageNotificationProfile),
  };
}

/** Specifies Terminate Scheduled Event related configurations. */
export interface TerminateNotificationProfile {
  /**
   * Configurable length of time a Virtual Machine being deleted will have to
   * potentially approve the Terminate Scheduled Event before the event is auto
   * approved (timed out). The configuration must be specified in ISO 8601 format,
   * the default value is 5 minutes (PT5M)
   */
  notBeforeTimeout?: string;
  /** Specifies whether the Terminate Scheduled event is enabled or disabled. */
  enable?: boolean;
}

export function terminateNotificationProfileSerializer(
  item: TerminateNotificationProfile,
): TerminateNotificationProfileRest {
  return {
    notBeforeTimeout: item["notBeforeTimeout"],
    enable: item["enable"],
  };
}

/** Specifies OS Image Scheduled Event related configurations. */
export interface OSImageNotificationProfile {
  /**
   * Length of time a Virtual Machine being reimaged or having its OS upgraded will
   * have to potentially approve the OS Image Scheduled Event before the event is
   * auto approved (timed out). The configuration is specified in ISO 8601 format,
   * and the value must not exceed 15 minutes (PT15M)
   */
  notBeforeTimeout?: string;
  /** Specifies whether the OS Image Scheduled event is enabled or disabled. */
  enable?: boolean;
}

export function oSImageNotificationProfileSerializer(
  item: OSImageNotificationProfile,
): OSImageNotificationProfileRest {
  return {
    notBeforeTimeout: item["notBeforeTimeout"],
    enable: item["enable"],
  };
}

/** The parameters of a capacity reservation Profile. */
export interface CapacityReservationProfile {
  /**
   * Specifies the capacity reservation group resource id that should be used for
   * allocating the virtual machine or scaleset vm instances provided enough
   * capacity has been reserved. Please refer to https://aka.ms/CapacityReservation
   * for more details.
   */
  capacityReservationGroup?: SubResource;
}

export function capacityReservationProfileSerializer(
  item: CapacityReservationProfile,
): CapacityReservationProfileRest {
  return {
    capacityReservationGroup: !item.capacityReservationGroup
      ? item.capacityReservationGroup
      : subResourceSerializer(item.capacityReservationGroup),
  };
}

/**
 * Contains the list of gallery applications that should be made available to the
 * VM/VMSS
 */
export interface ApplicationProfile {
  /** Specifies the gallery applications that should be made available to the VM/VMSS */
  galleryApplications?: VMGalleryApplication[];
}

export function applicationProfileSerializer(
  item: ApplicationProfile,
): ApplicationProfileRest {
  return {
    galleryApplications:
      item["galleryApplications"] === undefined
        ? item["galleryApplications"]
        : item["galleryApplications"].map(vMGalleryApplicationSerializer),
  };
}

/**
 * Specifies the required information to reference a compute gallery application
 * version
 */
export interface VMGalleryApplication {
  /** Optional, Specifies a passthrough value for more generic context. */
  tags?: string;
  /** Optional, Specifies the order in which the packages have to be installed */
  order?: number;
  /**
   * Specifies the GalleryApplicationVersion resource id on the form of
   * /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{application}/versions/{version}
   */
  packageReferenceId: string;
  /**
   * Optional, Specifies the uri to an azure blob that will replace the default
   * configuration for the package if provided
   */
  configurationReference?: string;
  /**
   * Optional, If true, any failure for any operation in the VmApplication will fail
   * the deployment
   */
  treatFailureAsDeploymentFailure?: boolean;
  /**
   * If set to true, when a new Gallery Application version is available in PIR/SIG,
   * it will be automatically updated for the VM/VMSS
   */
  enableAutomaticUpgrade?: boolean;
}

export function vMGalleryApplicationSerializer(
  item: VMGalleryApplication,
): VMGalleryApplicationRest {
  return {
    tags: item["tags"],
    order: item["order"],
    packageReferenceId: item["packageReferenceId"],
    configurationReference: item["configurationReference"],
    treatFailureAsDeploymentFailure: item["treatFailureAsDeploymentFailure"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
  };
}

/** Specifies the hardware settings for the virtual machine scale set. */
export interface VirtualMachineScaleSetHardwareProfile {
  /**
   * Specifies the properties for customizing the size of the virtual machine.
   * Minimum api-version: 2021-11-01. Please follow the instructions in [VM
   * Customization](https://aka.ms/vmcustomization) for more details.
   */
  vmSizeProperties?: VMSizeProperties;
}

export function virtualMachineScaleSetHardwareProfileSerializer(
  item: VirtualMachineScaleSetHardwareProfile,
): VirtualMachineScaleSetHardwareProfileRest {
  return {
    vmSizeProperties: !item.vmSizeProperties
      ? item.vmSizeProperties
      : vMSizePropertiesSerializer(item.vmSizeProperties),
  };
}

/** Specifies VM Size Property settings on the virtual machine. */
export interface VMSizeProperties {
  /**
   * Specifies the number of vCPUs available for the VM. When this property is not
   * specified in the request body the default behavior is to set it to the value of
   * vCPUs available for that VM size exposed in api response of [List all available
   * virtual machine sizes in a
   * region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list).
   */
  vCPUsAvailable?: number;
  /**
   * Specifies the vCPU to physical core ratio. When this property is not specified
   * in the request body the default behavior is set to the value of vCPUsPerCore
   * for the VM Size exposed in api response of [List all available virtual machine
   * sizes in a
   * region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list).
   * **Setting this property to 1 also means that hyper-threading is disabled.**
   */
  vCPUsPerCore?: number;
}

export function vMSizePropertiesSerializer(
  item: VMSizeProperties,
): VMSizePropertiesRest {
  return {
    vCPUsAvailable: item["vCPUsAvailable"],
    vCPUsPerCore: item["vCPUsPerCore"],
  };
}

/**
 * Specifies the service artifact reference id used to set same image version for
 * all virtual machines in the scale set when using 'latest' image version.
 * Minimum api-version: 2022-11-01
 */
export interface ServiceArtifactReference {
  /**
   * The service artifact reference id in the form of
   * /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/galleries/{galleryName}/serviceArtifacts/{serviceArtifactName}/vmArtifactsProfiles/{vmArtifactsProfilesName}
   */
  id?: string;
}

export function serviceArtifactReferenceSerializer(
  item: ServiceArtifactReference,
): ServiceArtifactReferenceRest {
  return {
    id: item["id"],
  };
}

/**
 * Specifies the security posture to be used for all virtual machines in the scale
 * set. Minimum api-version: 2023-03-01
 */
export interface SecurityPostureReference {
  /**
   * The security posture reference id in the form of
   * /CommunityGalleries/{communityGalleryName}/securityPostures/{securityPostureName}/versions/{major.minor.patch}|{major.*}|latest
   */
  id?: string;
  /**
   * List of virtual machine extensions to exclude when applying the Security
   * Posture.
   */
  excludeExtensions?: VirtualMachineExtension[];
}

export function securityPostureReferenceSerializer(
  item: SecurityPostureReference,
): SecurityPostureReferenceRest {
  return {
    id: item["id"],
    excludeExtensions:
      item["excludeExtensions"] === undefined
        ? item["excludeExtensions"]
        : item["excludeExtensions"].map(virtualMachineExtensionSerializer),
  };
}

/** Describes a Virtual Machine Extension. */
export interface VirtualMachineExtension {
  /** Resource location */
  location?: string;
  /** Resource Id */
  readonly id?: string;
  /** Resource name */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Resource tags */
  tags?: Record<string, string>;
  /** Describes the properties of a Virtual Machine Extension. */
  properties?: VirtualMachineExtensionProperties;
}

export function virtualMachineExtensionSerializer(
  item: VirtualMachineExtension,
): VirtualMachineExtensionRest {
  return {
    location: item["location"],
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    properties: !item.properties
      ? item.properties
      : virtualMachineExtensionPropertiesSerializer(item.properties),
  };
}

/** Describes the properties of a Virtual Machine Extension. */
export interface VirtualMachineExtensionProperties {
  /**
   * How the extension handler should be forced to update even if the extension
   * configuration has not changed.
   */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  type?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /**
   * Indicates whether the extension should use a newer minor version if one is
   * available at deployment time. Once deployed, however, the extension will not
   * upgrade minor versions unless redeployed, even with this property set to true.
   */
  autoUpgradeMinorVersion?: boolean;
  /**
   * Indicates whether the extension should be automatically upgraded by the
   * platform if there is a newer version of the extension available.
   */
  enableAutomaticUpgrade?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: Record<string, any>;
  /**
   * The extension can contain either protectedSettings or
   * protectedSettingsFromKeyVault or no protected settings at all.
   */
  protectedSettings?: Record<string, any>;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The virtual machine extension instance view. */
  instanceView?: VirtualMachineExtensionInstanceView;
  /**
   * Indicates whether failures stemming from the extension will be suppressed
   * (Operational failures such as not connecting to the VM will not be suppressed
   * regardless of this value). The default is false.
   */
  suppressFailures?: boolean;
  /**
   * The extensions protected settings that are passed by reference, and consumed
   * from key vault
   */
  protectedSettingsFromKeyVault?: KeyVaultSecretReference;
  /**
   * Collection of extension names after which this extension needs to be
   * provisioned.
   */
  provisionAfterExtensions?: string[];
}

export function virtualMachineExtensionPropertiesSerializer(
  item: VirtualMachineExtensionProperties,
): VirtualMachineExtensionPropertiesRest {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    settings: !item.settings
      ? item.settings
      : (serializeRecord(item.settings as any) as any),
    protectedSettings: !item.protectedSettings
      ? item.protectedSettings
      : (serializeRecord(item.protectedSettings as any) as any),
    instanceView: !item.instanceView
      ? item.instanceView
      : virtualMachineExtensionInstanceViewSerializer(item.instanceView),
    suppressFailures: item["suppressFailures"],
    protectedSettingsFromKeyVault: !item.protectedSettingsFromKeyVault
      ? item.protectedSettingsFromKeyVault
      : keyVaultSecretReferenceSerializer(item.protectedSettingsFromKeyVault),
    provisionAfterExtensions: item["provisionAfterExtensions"],
  };
}

/** The instance view of a virtual machine extension. */
export interface VirtualMachineExtensionInstanceView {
  /** The virtual machine extension name. */
  name?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  type?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** The resource status information. */
  substatuses?: InstanceViewStatus[];
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
}

export function virtualMachineExtensionInstanceViewSerializer(
  item: VirtualMachineExtensionInstanceView,
): VirtualMachineExtensionInstanceViewRest {
  return {
    name: item["name"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    substatuses:
      item["substatuses"] === undefined
        ? item["substatuses"]
        : item["substatuses"].map(instanceViewStatusSerializer),
    statuses:
      item["statuses"] === undefined
        ? item["statuses"]
        : item["statuses"].map(instanceViewStatusSerializer),
  };
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

export function instanceViewStatusSerializer(
  item: InstanceViewStatus,
): InstanceViewStatusRest {
  return {
    code: item["code"],
    level: item["level"],
    displayStatus: item["displayStatus"],
    message: item["message"],
    time: item["time"]?.toISOString(),
  };
}

/** Known values of {@link StatusLevelTypes} that the service accepts. */
export enum KnownStatusLevelTypes {
  /** Info */
  Info = "Info",
  /** Warning */
  Warning = "Warning",
  /** Error */
  Error = "Error",
}

/**
 * The level code. \
 * {@link KnownStatusLevelTypes} can be used interchangeably with StatusLevelTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Info** \
 * **Warning** \
 * **Error**
 */
export type StatusLevelTypes = string;

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity> | null;
}

export function managedServiceIdentitySerializer(
  item: ManagedServiceIdentity,
): ManagedServiceIdentityRest {
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
  /** SystemAssigned,UserAssigned */
  "SystemAssigned,UserAssigned" = "SystemAssigned,UserAssigned",
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

/** Plan for the resource. */
export interface Plan {
  /** A user defined name of the 3rd Party Artifact that is being procured. */
  name: string;
  /** The publisher of the 3rd Party Artifact that is being bought. E.g. NewRelic */
  publisher: string;
  /** The 3rd Party artifact that is being procured. E.g. NewRelic. Product maps to the OfferID specified for the artifact at the time of Data Market onboarding. */
  product: string;
  /** A publisher provided promotion code as provisioned in Data Market for the said product/artifact. */
  promotionCode?: string;
  /** The version of the desired product/artifact. */
  version?: string;
}

export function planSerializer(item: Plan): PlanRest {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

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

/** Fleet Update Model */
export interface FleetUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Updatable managed service identity */
  identity?: ManagedServiceIdentityUpdate;
  /** Updatable resource plan */
  plan?: ResourcePlanUpdate;
  /** RP-specific updatable properties */
  properties?: FleetProperties;
}

export function fleetUpdateSerializer(item: FleetUpdate): FleetUpdateRest {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    identity: !item.identity
      ? item.identity
      : managedServiceIdentityUpdateSerializer(item.identity),
    plan: !item.plan ? item.plan : resourcePlanUpdateSerializer(item.plan),
    properties: !item.properties
      ? item.properties
      : fleetPropertiesSerializer(item.properties),
  };
}

/** The template for adding optional properties. */
export interface ManagedServiceIdentityUpdate {
  /** The type of managed identity assigned to this resource. */
  type?: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity> | null;
}

export function managedServiceIdentityUpdateSerializer(
  item: ManagedServiceIdentityUpdate,
): ManagedServiceIdentityUpdateRest {
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

/** The template for adding optional properties. */
export interface ResourcePlanUpdate {
  /** A user defined name of the 3rd Party Artifact that is being procured. */
  name?: string;
  /** The publisher of the 3rd Party Artifact that is being bought. E.g. NewRelic */
  publisher?: string;
  /** The 3rd Party artifact that is being procured. E.g. NewRelic. Product maps to the OfferID specified for the artifact at the time of Data Market onboarding. */
  product?: string;
  /** A publisher provided promotion code as provisioned in Data Market for the said product/artifact. */
  promotionCode?: string;
  /** The version of the desired product/artifact. */
  version?: string;
}

export function resourcePlanUpdateSerializer(
  item: ResourcePlanUpdate,
): ResourcePlanUpdateRest {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

/** The response of a Fleet list operation. */
export interface _FleetListResult {
  /** The Fleet items on this page */
  value: Fleet[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** The response of a VirtualMachineScaleSet list operation. */
export interface VirtualMachineScaleSetListResult {
  /** The VirtualMachineScaleSet items on this page */
  value: VirtualMachineScaleSet[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** An AzureFleet's virtualMachineScaleSet */
export interface VirtualMachineScaleSet {
  /**
   * The compute RP resource id of the virtualMachineScaleSet
   * "subscriptions/{subId}/resourceGroups/{rgName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}"
   */
  readonly id: string;
  /** Type of the virtualMachineScaleSet */
  readonly type?: string;
  /** This represents the operationStatus of the VMSS in response to the last operation that was performed on it by Azure Fleet resource. */
  readonly operationStatus: ProvisioningState;
  /** Error Information when `operationStatus` is `Failed` */
  readonly error?: ApiError;
}

/** ApiError for Fleet */
export interface ApiError {
  /** The error code. */
  code?: string;
  /** The target of the particular error. */
  target?: string;
  /** The error message. */
  message?: string;
  /** The API error details */
  details?: ApiErrorBase[];
  /** The API inner error */
  innererror?: InnerError;
}

/** API error base. */
export interface ApiErrorBase {
  /** The error code. */
  code?: string;
  /** The target of the particular error. */
  target?: string;
  /** The error message. */
  message?: string;
}

/** Inner error details. */
export interface InnerError {
  /** The exception type. */
  exceptionType?: string;
  /** The internal error message or exception dump. */
  errorDetail?: string;
}

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
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionType;
}

/** Localized display information for and operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  description?: string;
}

/** Known values of {@link Origin} that the service accepts. */
export enum KnownOrigin {
  /** user */
  user = "user",
  /** system */
  system = "system",
  /** user,system */
  "user,system" = "user,system",
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
/** Api versions */
export type Versions = "2023-11-01-preview" | "2024-05-01-preview";
/** Alias for ProvisioningState */
export type ProvisioningState =
  | string
  | ResourceProvisioningState
  | "Creating"
  | "Updating"
  | "Deleting"
  | "Migrating";
