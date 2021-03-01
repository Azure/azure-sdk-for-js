import * as coreHttp from "@azure/core-http";
import { LROSYM, LROResponseInfo } from "../lro/models";

/** The List Compute Operation operation response. */
export interface ComputeOperationListResult {
  /**
   * The list of compute operations
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly value?: ComputeOperationValue[];
}

/** Describes the properties of a Compute Operation value. */
export interface ComputeOperationValue {
  /**
   * The origin of the compute operation.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly origin?: string;
  /**
   * The name of the compute operation.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * The display name of the compute operation.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly operation?: string;
  /**
   * The display name of the resource the operation applies to.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly resource?: string;
  /**
   * The description of the operation.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly description?: string;
  /**
   * The resource provider for the operation.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provider?: string;
}

export interface SubResource {
  /** Resource Id */
  id?: string;
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

/** Describes a virtual machine scale set sku. NOTE: If the new VM SKU is not supported on the hardware the scale set is currently on, you need to deallocate the VMs in the scale set before you modify the SKU name. */
export interface Sku {
  /** The sku name. */
  name?: string;
  /** Specifies the tier of virtual machines in a scale set.<br /><br /> Possible Values:<br /><br /> **Standard**<br /><br /> **Basic** */
  tier?: string;
  /** Specifies the number of virtual machines in the scale set. */
  capacity?: number;
}

/** The Resource model definition. */
export interface Resource {
  /**
   * Resource Id
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * Resource name
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * Resource type
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
  /** Resource location */
  location: string;
  /** Resource tags */
  tags?: { [propertyName: string]: string };
}

/** The Update Resource model definition. */
export interface UpdateResource {
  /** Resource tags */
  tags?: { [propertyName: string]: string };
}

/** The List Availability Set operation response. */
export interface AvailabilitySetListResult {
  /** The list of availability sets */
  value: AvailabilitySet[];
  /** The URI to fetch the next page of AvailabilitySets. Call ListNext() with this URI to fetch the next page of AvailabilitySets. */
  nextLink?: string;
}

/** The List Virtual Machine operation response. */
export interface VirtualMachineSizeListResult {
  /** The list of virtual machine sizes. */
  value?: VirtualMachineSize[];
}

/** Describes the properties of a VM size. */
export interface VirtualMachineSize {
  /** The name of the virtual machine size. */
  name?: string;
  /** The number of cores supported by the virtual machine size. */
  numberOfCores?: number;
  /** The OS disk size, in MB, allowed by the virtual machine size. */
  osDiskSizeInMB?: number;
  /** The resource disk size, in MB, allowed by the virtual machine size. */
  resourceDiskSizeInMB?: number;
  /** The amount of memory, in MB, supported by the virtual machine size. */
  memoryInMB?: number;
  /** The maximum number of data disks that can be attached to the virtual machine size. */
  maxDataDiskCount?: number;
}

/** The List Proximity Placement Group operation response. */
export interface ProximityPlacementGroupListResult {
  /** The list of proximity placement groups */
  value: ProximityPlacementGroup[];
  /** The URI to fetch the next page of proximity placement groups. */
  nextLink?: string;
}

export interface SubResourceReadOnly {
  /**
   * Resource Id
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
}

export interface DedicatedHostGroupInstanceView {
  /** List of instance view of the dedicated hosts under the dedicated host group. */
  hosts?: DedicatedHostInstanceViewWithName[];
}

/** The instance view of a dedicated host. */
export interface DedicatedHostInstanceView {
  /**
   * Specifies the unique id of the dedicated physical machine on which the dedicated host resides.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly assetId?: string;
  /** Unutilized capacity of the dedicated host. */
  availableCapacity?: DedicatedHostAvailableCapacity;
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
}

/** Dedicated host unutilized capacity. */
export interface DedicatedHostAvailableCapacity {
  /** The unutilized capacity of the dedicated host represented in terms of each VM size that is allowed to be deployed to the dedicated host. */
  allocatableVMs?: DedicatedHostAllocatableVM[];
}

/** Represents the dedicated host unutilized capacity in terms of a specific VM size. */
export interface DedicatedHostAllocatableVM {
  /** VM size in terms of which the unutilized capacity is represented. */
  vmSize?: string;
  /** Maximum number of VMs of size vmSize that can fit in the dedicated host's remaining capacity. */
  count?: number;
}

/** The List Dedicated Host Group with resource group response. */
export interface DedicatedHostGroupListResult {
  /** The list of dedicated host groups */
  value: DedicatedHostGroup[];
  /** The URI to fetch the next page of Dedicated Host Groups. Call ListNext() with this URI to fetch the next page of Dedicated Host Groups. */
  nextLink?: string;
}

/** The list dedicated host operation response. */
export interface DedicatedHostListResult {
  /** The list of dedicated hosts */
  value: DedicatedHost[];
  /** The URI to fetch the next page of dedicated hosts. Call ListNext() with this URI to fetch the next page of dedicated hosts. */
  nextLink?: string;
}

/** The list SSH public keys operation response. */
export interface SshPublicKeysGroupListResult {
  /** The list of SSH public keys */
  value: SshPublicKeyResource[];
  /** The URI to fetch the next page of SSH public keys. Call ListNext() with this URI to fetch the next page of SSH public keys. */
  nextLink?: string;
}

/** Response from generation of an SSH key pair. */
export interface SshPublicKeyGenerateKeyPairResult {
  /** Private key portion of the key pair used to authenticate to a virtual machine through ssh. The private key is returned in RFC3447 format and should be treated as a secret. */
  privateKey: string;
  /** Public key portion of the key pair used to authenticate to a virtual machine through ssh. The public key is in ssh-rsa format. */
  publicKey: string;
  /** The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{SshPublicKeyName} */
  id: string;
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

/** The List Extension operation response */
export interface VirtualMachineExtensionsListResult {
  /** The list of extensions */
  value?: VirtualMachineExtension[];
}

/** Used for establishing the purchase context of any 3rd Party artifact through MarketPlace. */
export interface PurchasePlan {
  /** The publisher ID. */
  publisher: string;
  /** The plan ID. */
  name: string;
  /** Specifies the product of the image from the marketplace. This is the same value as Offer under the imageReference element. */
  product: string;
}

/** Contains the os disk image information. */
export interface OSDiskImage {
  /** The operating system of the osDiskImage. */
  operatingSystem: OperatingSystemTypes;
}

/** Contains the data disk images information. */
export interface DataDiskImage {
  /**
   * Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly lun?: number;
}

/** Describes automatic OS upgrade properties on the image. */
export interface AutomaticOSUpgradeProperties {
  /** Specifies whether automatic OS upgrade is supported on the image. */
  automaticOSUpgradeSupported: boolean;
}

/** Specifies the disallowed configuration for a virtual machine image. */
export interface DisallowedConfiguration {
  /** VM disk types which are disallowed. */
  vmDiskType?: VmDiskTypes;
}

/** Specifies additional capabilities supported by the image */
export interface VirtualMachineImageFeature {
  /** The name of the feature. */
  name?: string;
  /** The corresponding value for the feature. */
  value?: string;
}

/** The complex type of the extended location. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name?: string;
  /** The type of the extended location. */
  type?: ExtendedLocationTypes;
}

/** An error response from the Compute service. */
export interface CloudError {
  /** Api error. */
  error?: ApiError;
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

/** Api error base. */
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
  exceptiontype?: string;
  /** The internal error message or exception dump. */
  errordetail?: string;
}

/** The List Usages operation response. */
export interface ListUsagesResult {
  /** The list of compute resource usages. */
  value: Usage[];
  /** The URI to fetch the next page of compute resource usage information. Call ListNext() with this to fetch the next page of compute resource usage information. */
  nextLink?: string;
}

/** Describes Compute Resource Usage. */
export interface Usage {
  /** An enum describing the unit of usage measurement. */
  unit: "Count";
  /** The current usage of the resource. */
  currentValue: number;
  /** The maximum permitted usage of the resource. */
  limit: number;
  /** The name of the type of usage. */
  name: UsageName;
}

/** The Usage Names. */
export interface UsageName {
  /** The name of the resource. */
  value?: string;
  /** The localized name of the resource. */
  localizedValue?: string;
}

/** The List Virtual Machine operation response. */
export interface VirtualMachineListResult {
  /** The list of virtual machines. */
  value: VirtualMachine[];
  /** The URI to fetch the next page of VMs. Call ListNext() with this URI to fetch the next page of Virtual Machines. */
  nextLink?: string;
}

/** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
export interface Plan {
  /** The plan ID. */
  name?: string;
  /** The publisher ID. */
  publisher?: string;
  /** Specifies the product of the image from the marketplace. This is the same value as Offer under the imageReference element. */
  product?: string;
  /** The promotion code. */
  promotionCode?: string;
}

/** Specifies the hardware settings for the virtual machine. */
export interface HardwareProfile {
  /** Specifies the size of the virtual machine. <br><br> The enum data type is currently deprecated and will be removed by December 23rd 2023. <br><br> Recommended way to get the list of available sizes is using these APIs: <br><br> [List all available virtual machine sizes in an availability set](https://docs.microsoft.com/rest/api/compute/availabilitysets/listavailablesizes) <br><br> [List all available virtual machine sizes in a region]( https://docs.microsoft.com/en-us/rest/api/compute/resourceskus/list) <br><br> [List all available virtual machine sizes for resizing](https://docs.microsoft.com/rest/api/compute/virtualmachines/listavailablesizes). For more information about virtual machine sizes, see [Sizes for virtual machines](https://docs.microsoft.com/en-us/azure/virtual-machines/sizes). <br><br> The available VM sizes depend on region and availability set. */
  vmSize?: VirtualMachineSizeTypes;
}

/** Specifies the storage settings for the virtual machine disks. */
export interface StorageProfile {
  /** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. */
  imageReference?: ImageReference;
  /** Specifies information about the operating system disk used by the virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-about-disks-vhds?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json). */
  osDisk?: OSDisk;
  /** Specifies the parameters that are used to add a data disk to a virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-about-disks-vhds?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json). */
  dataDisks?: DataDisk[];
}

/** Specifies information about the operating system disk used by the virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-about-disks-vhds?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json). */
export interface OSDisk {
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  osType?: OperatingSystemTypes;
  /** Specifies the encryption settings for the OS Disk. <br><br> Minimum api-version: 2015-06-15 */
  encryptionSettings?: DiskEncryptionSettings;
  /** The disk name. */
  name?: string;
  /** The virtual hard disk. */
  vhd?: VirtualHardDisk;
  /** The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. */
  image?: VirtualHardDisk;
  /** Specifies the caching requirements. <br><br> Possible values are: <br><br> **None** <br><br> **ReadOnly** <br><br> **ReadWrite** <br><br> Default: **None** for Standard storage. **ReadOnly** for Premium storage. */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies the ephemeral Disk Settings for the operating system disk used by the virtual machine. */
  diffDiskSettings?: DiffDiskSettings;
  /** Specifies how the virtual machine should be created.<br><br> Possible values are:<br><br> **Attach** \u2013 This value is used when you are using a specialized disk to create the virtual machine.<br><br> **FromImage** \u2013 This value is used when you are using an image to create the virtual machine. If you are using a platform image, you also use the imageReference element described above. If you are using a marketplace image, you  also use the plan element previously described. */
  createOption: DiskCreateOptionTypes;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. <br><br> This value cannot be larger than 1023 GB */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: ManagedDiskParameters;
}

/** Describes a Encryption Settings for a Disk */
export interface DiskEncryptionSettings {
  /** Specifies the location of the disk encryption key, which is a Key Vault Secret. */
  diskEncryptionKey?: KeyVaultSecretReference;
  /** Specifies the location of the key encryption key in Key Vault. */
  keyEncryptionKey?: KeyVaultKeyReference;
  /** Specifies whether disk encryption should be enabled on the virtual machine. */
  enabled?: boolean;
}

/** Describes a reference to Key Vault Secret */
export interface KeyVaultSecretReference {
  /** The URL referencing a secret in a Key Vault. */
  secretUrl: string;
  /** The relative URL of the Key Vault containing the secret. */
  sourceVault: SubResource;
}

/** Describes a reference to Key Vault Key */
export interface KeyVaultKeyReference {
  /** The URL referencing a key encryption key in Key Vault. */
  keyUrl: string;
  /** The relative URL of the Key Vault containing the key. */
  sourceVault: SubResource;
}

/** Describes the uri of a disk. */
export interface VirtualHardDisk {
  /** Specifies the virtual hard disk's uri. */
  uri?: string;
}

/** Describes the parameters of ephemeral disk settings that can be specified for operating system disk. <br><br> NOTE: The ephemeral disk settings can only be specified for managed disk. */
export interface DiffDiskSettings {
  /** Specifies the ephemeral disk settings for operating system disk. */
  option?: DiffDiskOptions;
  /** Specifies the ephemeral disk placement for operating system disk.<br><br> Possible values are: <br><br> **CacheDisk** <br><br> **ResourceDisk** <br><br> Default: **CacheDisk** if one is configured for the VM size otherwise **ResourceDisk** is used.<br><br> Refer to VM size documentation for Windows VM at https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sizes and Linux VM at https://docs.microsoft.com/en-us/azure/virtual-machines/linux/sizes to check which VM sizes exposes a cache disk. */
  placement?: DiffDiskPlacement;
}

/** Describes a data disk. */
export interface DataDisk {
  /** Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. */
  lun: number;
  /** The disk name. */
  name?: string;
  /** The virtual hard disk. */
  vhd?: VirtualHardDisk;
  /** The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. */
  image?: VirtualHardDisk;
  /** Specifies the caching requirements. <br><br> Possible values are: <br><br> **None** <br><br> **ReadOnly** <br><br> **ReadWrite** <br><br> Default: **None for Standard storage. ReadOnly for Premium storage** */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies how the virtual machine should be created.<br><br> Possible values are:<br><br> **Attach** \u2013 This value is used when you are using a specialized disk to create the virtual machine.<br><br> **FromImage** \u2013 This value is used when you are using an image to create the virtual machine. If you are using a platform image, you also use the imageReference element described above. If you are using a marketplace image, you  also use the plan element previously described. */
  createOption: DiskCreateOptionTypes;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. <br><br> This value cannot be larger than 1023 GB */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: ManagedDiskParameters;
  /** Specifies whether the data disk is in process of detachment from the VirtualMachine/VirtualMachineScaleset */
  toBeDetached?: boolean;
  /**
   * Specifies the Read-Write IOPS for the managed disk when StorageAccountType is UltraSSD_LRS. Returned only for VirtualMachine ScaleSet VM disks. Can be updated only via updates to the VirtualMachine Scale Set.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly diskIopsReadWrite?: number;
  /**
   * Specifies the bandwidth in MB per second for the managed disk when StorageAccountType is UltraSSD_LRS. Returned only for VirtualMachine ScaleSet VM disks. Can be updated only via updates to the VirtualMachine Scale Set.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly diskMBpsReadWrite?: number;
  /** Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values: **ForceDetach**. <br><br> detachOption: **ForceDetach** is applicable only for managed data disks. If a previous detachment attempt of the data disk did not complete due to an unexpected failure from the virtual machine and the disk is still not released then use force-detach as a last resort option to detach the disk forcibly from the VM. All writes might not have been flushed when using this detach behavior. <br><br> This feature is still in preview mode and is not supported for VirtualMachineScaleSet. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'. */
  detachOption?: DiskDetachOptionTypes;
}

/** Enables or disables a capability on the virtual machine or virtual machine scale set. */
export interface AdditionalCapabilities {
  /** The flag that enables or disables a capability to have one or more managed data disks with UltraSSD_LRS storage account type on the VM or VMSS. Managed disks with storage account type UltraSSD_LRS can be added to a virtual machine or virtual machine scale set only if this property is enabled. */
  ultraSSDEnabled?: boolean;
}

/** Specifies the operating system settings for the virtual machine. Some of the settings cannot be changed once VM is provisioned. */
export interface OSProfile {
  /** Specifies the host OS name of the virtual machine. <br><br> This name cannot be updated after the VM is created. <br><br> **Max-length (Windows):** 15 characters <br><br> **Max-length (Linux):** 64 characters. <br><br> For naming conventions and restrictions see [Azure infrastructure services implementation guidelines](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-infrastructure-subscription-accounts-guidelines?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json#1-naming-conventions). */
  computerName?: string;
  /** Specifies the name of the administrator account. <br><br> This property cannot be updated after the VM is created. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters  <br><br><li> For root access to the Linux VM, see [Using root privileges on Linux virtual machines in Azure](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-use-root-privileges?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json)<br><li> For a list of built-in system users on Linux that should not be used in this field, see [Selecting User Names for Linux on Azure](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-usernames?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json) */
  adminUsername?: string;
  /** Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-reset-rdp?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-using-vmaccess-extension?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json#reset-root-password) */
  adminPassword?: string;
  /** Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. <br><br> **Note: Do not pass any secrets or passwords in customData property** <br><br> This property cannot be updated after the VM is created. <br><br> customData is passed to the VM to be saved as a file, for more information see [Custom Data on Azure VMs](https://azure.microsoft.com/en-us/blog/custom-data-and-cloud-init-on-windows-azure/) <br><br> For using cloud-init for your Linux VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-using-cloud-init?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json) */
  customData?: string;
  /** Specifies Windows operating system settings on the virtual machine. */
  windowsConfiguration?: WindowsConfiguration;
  /** Specifies the Linux operating system settings on the virtual machine. <br><br>For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-endorsed-distros?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json) <br><br> For running non-endorsed distributions, see [Information for Non-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-create-upload-generic?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json). */
  linuxConfiguration?: LinuxConfiguration;
  /** Specifies set of certificates that should be installed onto the virtual machine. */
  secrets?: VaultSecretGroup[];
  /** Specifies whether extension operations should be allowed on the virtual machine. <br><br>This may only be set to False when no extensions are present on the virtual machine. */
  allowExtensionOperations?: boolean;
  /** Specifies whether the guest provision signal is required to infer provision success of the virtual machine.  **Note: This property is for private testing only, and all customers must not set the property to false.** */
  requireGuestProvisionSignal?: boolean;
}

/** Specifies Windows operating system settings on the virtual machine. */
export interface WindowsConfiguration {
  /** Indicates whether virtual machine agent should be provisioned on the virtual machine. <br><br> When this property is not specified in the request body, default behavior is to set it to true.  This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later. */
  provisionVMAgent?: boolean;
  /** Indicates whether Automatic Updates is enabled for the Windows virtual machine. Default value is true. <br><br> For virtual machine scale sets, this property can be updated and updates will take effect on OS reprovisioning. */
  enableAutomaticUpdates?: boolean;
  /** Specifies the time zone of the virtual machine. e.g. "Pacific Standard Time". <br><br> Possible values can be [TimeZoneInfo.Id](https://docs.microsoft.com/en-us/dotnet/api/system.timezoneinfo.id?#System_TimeZoneInfo_Id) value from time zones returned by [TimeZoneInfo.GetSystemTimeZones](https://docs.microsoft.com/en-us/dotnet/api/system.timezoneinfo.getsystemtimezones). */
  timeZone?: string;
  /** Specifies additional base-64 encoded XML formatted information that can be included in the Unattend.xml file, which is used by Windows Setup. */
  additionalUnattendContent?: AdditionalUnattendContent[];
  /** [Preview Feature] Specifies settings related to VM Guest Patching on Windows. */
  patchSettings?: PatchSettings;
  /** Specifies the Windows Remote Management listeners. This enables remote Windows PowerShell. */
  winRM?: WinRMConfiguration;
}

/** Specifies additional XML formatted information that can be included in the Unattend.xml file, which is used by Windows Setup. Contents are defined by setting name, component name, and the pass in which the content is applied. */
export interface AdditionalUnattendContent {
  /** The pass name. Currently, the only allowable value is OobeSystem. */
  passName?: "OobeSystem";
  /** The component name. Currently, the only allowable value is Microsoft-Windows-Shell-Setup. */
  componentName?: "Microsoft-Windows-Shell-Setup";
  /** Specifies the name of the setting to which the content applies. Possible values are: FirstLogonCommands and AutoLogon. */
  settingName?: SettingNames;
  /** Specifies the XML formatted content that is added to the unattend.xml file for the specified path and component. The XML must be less than 4KB and must include the root element for the setting or feature that is being inserted. */
  content?: string;
}

/** Specifies settings related to VM Guest Patching on Windows. */
export interface PatchSettings {
  /** Specifies the mode of VM Guest Patching to IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of patches to a virtual machine. You do this by applying patches manually inside the VM. In this mode, automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates must be false<br /><br /> **AutomaticByOS** - The virtual machine will automatically be updated by the OS. The property WindowsConfiguration.enableAutomaticUpdates must be true. <br /><br /> **AutomaticByPlatform** - the virtual machine will automatically updated by the platform. The properties provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true */
  patchMode?: WindowsVMGuestPatchMode;
  /** Enables customers to patch their Azure VMs without requiring a reboot. For enableHotpatching, the 'provisionVMAgent' must be set to true and 'patchMode' must be set to 'AutomaticByPlatform'. */
  enableHotpatching?: boolean;
}

/** Describes Windows Remote Management configuration of the VM */
export interface WinRMConfiguration {
  /** The list of Windows Remote Management listeners */
  listeners?: WinRMListener[];
}

/** Describes Protocol and thumbprint of Windows Remote Management listener */
export interface WinRMListener {
  /** Specifies the protocol of WinRM listener. <br><br> Possible values are: <br>**http** <br><br> **https** */
  protocol?: ProtocolTypes;
  /** This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be It is the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} */
  certificateUrl?: string;
}

/** Specifies the Linux operating system settings on the virtual machine. <br><br>For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-endorsed-distros?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json) <br><br> For running non-endorsed distributions, see [Information for Non-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-create-upload-generic?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json). */
export interface LinuxConfiguration {
  /** Specifies whether password authentication should be disabled. */
  disablePasswordAuthentication?: boolean;
  /** Specifies the ssh key configuration for a Linux OS. */
  ssh?: SshConfiguration;
  /** Indicates whether virtual machine agent should be provisioned on the virtual machine. <br><br> When this property is not specified in the request body, default behavior is to set it to true.  This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later. */
  provisionVMAgent?: boolean;
  /** [Preview Feature] Specifies settings related to VM Guest Patching on Linux. */
  patchSettings?: LinuxPatchSettings;
}

/** SSH configuration for Linux based VMs running on Azure */
export interface SshConfiguration {
  /** The list of SSH public keys used to authenticate with linux based VMs. */
  publicKeys?: SshPublicKey[];
}

/** Contains information about SSH certificate public key and the path on the Linux VM where the public key is placed. */
export interface SshPublicKey {
  /** Specifies the full path on the created VM where ssh public key is stored. If the file already exists, the specified key is appended to the file. Example: /home/user/.ssh/authorized_keys */
  path?: string;
  /** SSH public key certificate used to authenticate with the VM through ssh. The key needs to be at least 2048-bit and in ssh-rsa format. <br><br> For creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/mac-create-ssh-keys?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json). */
  keyData?: string;
}

/** Specifies settings related to VM Guest Patching on Linux. */
export interface LinuxPatchSettings {
  /** Specifies the mode of VM Guest Patching to IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - The virtual machine's default patching configuration is used. <br /><br /> **AutomaticByPlatform** - The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true */
  patchMode?: LinuxVMGuestPatchMode;
}

/** Describes a set of certificates which are all in the same Key Vault. */
export interface VaultSecretGroup {
  /** The relative URL of the Key Vault containing all of the certificates in VaultCertificates. */
  sourceVault?: SubResource;
  /** The list of key vault references in SourceVault which contain certificates. */
  vaultCertificates?: VaultCertificate[];
}

/** Describes a single certificate reference in a Key Vault, and where the certificate should reside on the VM. */
export interface VaultCertificate {
  /** This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be It is the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} */
  certificateUrl?: string;
  /** For Windows VMs, specifies the certificate store on the Virtual Machine to which the certificate should be added. The specified certificate store is implicitly in the LocalMachine account. <br><br>For Linux VMs, the certificate file is placed under the /var/lib/waagent directory, with the file name &lt;UppercaseThumbprint&gt;.crt for the X509 certificate file and &lt;UppercaseThumbprint&gt;.prv for private key. Both of these files are .pem formatted. */
  certificateStore?: string;
}

/** Specifies the network interfaces of the virtual machine. */
export interface NetworkProfile {
  /** Specifies the list of resource Ids for the network interfaces associated with the virtual machine. */
  networkInterfaces?: NetworkInterfaceReference[];
}

/** Specifies the Security profile settings for the virtual machine or virtual machine scale set. */
export interface SecurityProfile {
  /** Specifies the security settings like secure boot and vTPM used while creating the virtual machine. <br><br>Minimum api-version: 2020-12-01 */
  uefiSettings?: UefiSettings;
  /** This property can be used by user in the request to enable or disable the Host Encryption for the virtual machine or virtual machine scale set. This will enable the encryption for all the disks including Resource/Temp disk at host itself. <br><br> Default: The Encryption at host will be disabled unless this property is set to true for the resource. */
  encryptionAtHost?: boolean;
  /** Specifies the SecurityType of the virtual machine. It is set as TrustedLaunch to enable UefiSettings. <br><br> Default: UefiSettings will not be enabled unless this property is set as TrustedLaunch. */
  securityType?: "TrustedLaunch";
}

/** Specifies the security settings like secure boot and vTPM used while creating the virtual machine. <br><br>Minimum api-version: 2020-12-01 */
export interface UefiSettings {
  /** Specifies whether secure boot should be enabled on the virtual machine. <br><br>Minimum api-version: 2020-12-01 */
  secureBootEnabled?: boolean;
  /** Specifies whether vTPM should be enabled on the virtual machine. <br><br>Minimum api-version: 2020-12-01 */
  vTpmEnabled?: boolean;
}

/** Specifies the boot diagnostic settings state. <br><br>Minimum api-version: 2015-06-15. */
export interface DiagnosticsProfile {
  /** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. <br><br> You can easily view the output of your console log. <br><br> Azure also enables you to see a screenshot of the VM from the hypervisor. */
  bootDiagnostics?: BootDiagnostics;
}

/** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. <br><br> You can easily view the output of your console log. <br><br> Azure also enables you to see a screenshot of the VM from the hypervisor. */
export interface BootDiagnostics {
  /** Whether boot diagnostics should be enabled on the Virtual Machine. */
  enabled?: boolean;
  /** Uri of the storage account to use for placing the console output and screenshot. <br><br>If storageUri is not specified while enabling boot diagnostics, managed storage will be used. */
  storageUri?: string;
}

/** Specifies the billing related details of a Azure Spot VM or VMSS. <br><br>Minimum api-version: 2019-03-01. */
export interface BillingProfile {
  /** Specifies the maximum price you are willing to pay for a Azure Spot VM/VMSS. This price is in US Dollars. <br><br> This price will be compared with the current Azure Spot price for the VM size. Also, the prices are compared at the time of create/update of Azure Spot VM/VMSS and the operation will only succeed if  the maxPrice is greater than the current Azure Spot price. <br><br> The maxPrice will also be used for evicting a Azure Spot VM/VMSS if the current Azure Spot price goes beyond the maxPrice after creation of VM/VMSS. <br><br> Possible values are: <br><br> - Any decimal value greater than zero. Example: 0.01538 <br><br> -1 – indicates default price to be up-to on-demand. <br><br> You can set the maxPrice to -1 to indicate that the Azure Spot VM/VMSS should not be evicted for price reasons. Also, the default max price is -1 if it is not provided by you. <br><br>Minimum api-version: 2019-03-01. */
  maxPrice?: number;
}

/** The instance view of a virtual machine. */
export interface VirtualMachineInstanceView {
  /** Specifies the update domain of the virtual machine. */
  platformUpdateDomain?: number;
  /** Specifies the fault domain of the virtual machine. */
  platformFaultDomain?: number;
  /** The computer name assigned to the virtual machine. */
  computerName?: string;
  /** The Operating System running on the virtual machine. */
  osName?: string;
  /** The version of Operating System running on the virtual machine. */
  osVersion?: string;
  /** Specifies the HyperVGeneration Type associated with a resource */
  hyperVGeneration?: HyperVGenerationType;
  /** The Remote desktop certificate thumbprint. */
  rdpThumbPrint?: string;
  /** The VM Agent running on the virtual machine. */
  vmAgent?: VirtualMachineAgentInstanceView;
  /** The Maintenance Operation status on the virtual machine. */
  maintenanceRedeployStatus?: MaintenanceRedeployStatus;
  /** The virtual machine disk information. */
  disks?: DiskInstanceView[];
  /** The extensions information. */
  extensions?: VirtualMachineExtensionInstanceView[];
  /**
   * The health status for the VM.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly vmHealth?: VirtualMachineHealthStatus;
  /** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. <br><br> You can easily view the output of your console log. <br><br> Azure also enables you to see a screenshot of the VM from the hypervisor. */
  bootDiagnostics?: BootDiagnosticsInstanceView;
  /**
   * Resource id of the dedicated host, on which the virtual machine is allocated through automatic placement, when the virtual machine is associated with a dedicated host group that has automatic placement enabled. <br><br>Minimum api-version: 2020-06-01.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly assignedHost?: string;
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
  /** [Preview Feature] The status of virtual machine patch operations. */
  patchStatus?: VirtualMachinePatchStatus;
}

/** The instance view of the VM Agent running on the virtual machine. */
export interface VirtualMachineAgentInstanceView {
  /** The VM Agent full version. */
  vmAgentVersion?: string;
  /** The virtual machine extension handler instance view. */
  extensionHandlers?: VirtualMachineExtensionHandlerInstanceView[];
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
}

/** The instance view of a virtual machine extension handler. */
export interface VirtualMachineExtensionHandlerInstanceView {
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  type?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** The extension handler status. */
  status?: InstanceViewStatus;
}

/** Maintenance Operation Status. */
export interface MaintenanceRedeployStatus {
  /** True, if customer is allowed to perform Maintenance. */
  isCustomerInitiatedMaintenanceAllowed?: boolean;
  /** Start Time for the Pre Maintenance Window. */
  preMaintenanceWindowStartTime?: Date;
  /** End Time for the Pre Maintenance Window. */
  preMaintenanceWindowEndTime?: Date;
  /** Start Time for the Maintenance Window. */
  maintenanceWindowStartTime?: Date;
  /** End Time for the Maintenance Window. */
  maintenanceWindowEndTime?: Date;
  /** The Last Maintenance Operation Result Code. */
  lastOperationResultCode?: MaintenanceOperationResultCodeTypes;
  /** Message returned for the last Maintenance Operation. */
  lastOperationMessage?: string;
}

/** The instance view of the disk. */
export interface DiskInstanceView {
  /** The disk name. */
  name?: string;
  /** Specifies the encryption settings for the OS Disk. <br><br> Minimum api-version: 2015-06-15 */
  encryptionSettings?: DiskEncryptionSettings[];
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
}

/** The health status of the VM. */
export interface VirtualMachineHealthStatus {
  /**
   * The health status information for the VM.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly status?: InstanceViewStatus;
}

/** The instance view of a virtual machine boot diagnostics. */
export interface BootDiagnosticsInstanceView {
  /**
   * The console screenshot blob URI. <br><br>NOTE: This will **not** be set if boot diagnostics is currently enabled with managed storage.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly consoleScreenshotBlobUri?: string;
  /**
   * The serial console log blob Uri. <br><br>NOTE: This will **not** be set if boot diagnostics is currently enabled with managed storage.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly serialConsoleLogBlobUri?: string;
  /**
   * The boot diagnostics status information for the VM. <br><br> NOTE: It will be set only if there are errors encountered in enabling boot diagnostics.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly status?: InstanceViewStatus;
}

/** The status of virtual machine patch operations. */
export interface VirtualMachinePatchStatus {
  /** The available patch summary of the latest assessment operation for the virtual machine. */
  availablePatchSummary?: AvailablePatchSummary;
  /** The installation summary of the latest installation operation for the virtual machine. */
  lastPatchInstallationSummary?: LastPatchInstallationSummary;
  /**
   * The enablement status of the specified patchMode
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly configurationStatuses?: InstanceViewStatus[];
}

/** Describes the properties of an virtual machine instance view for available patch summary. */
export interface AvailablePatchSummary {
  /**
   * The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings."
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly status?: PatchOperationStatus;
  /**
   * The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly assessmentActivityId?: string;
  /**
   * The overall reboot status of the VM. It will be true when partially installed patches require a reboot to complete installation but the reboot has not yet occurred.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly rebootPending?: boolean;
  /**
   * The number of critical or security patches that have been detected as available and not yet installed.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly criticalAndSecurityPatchCount?: number;
  /**
   * The number of all available patches excluding critical and security.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly otherPatchCount?: number;
  /**
   * The UTC timestamp when the operation began.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly startTime?: Date;
  /**
   * The UTC timestamp when the operation began.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly lastModifiedTime?: Date;
  /**
   * The errors that were encountered during execution of the operation. The details array contains the list of them.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly error?: ApiError;
}

/** Describes the properties of the last installed patch summary. */
export interface LastPatchInstallationSummary {
  /**
   * The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings."
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly status?: PatchOperationStatus;
  /**
   * The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly installationActivityId?: string;
  /**
   * Describes whether the operation ran out of time before it completed all its intended actions
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly maintenanceWindowExceeded?: boolean;
  /**
   * The number of all available patches but not going to be installed because it didn't match a classification or inclusion list entry.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly notSelectedPatchCount?: number;
  /**
   * The number of all available patches but excluded explicitly by a customer-specified exclusion list match.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly excludedPatchCount?: number;
  /**
   * The number of all available patches expected to be installed over the course of the patch installation operation.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly pendingPatchCount?: number;
  /**
   * The count of patches that successfully installed.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly installedPatchCount?: number;
  /**
   * The count of patches that failed installation.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly failedPatchCount?: number;
  /**
   * The UTC timestamp when the operation began.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly startTime?: Date;
  /**
   * The UTC timestamp when the operation began.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly lastModifiedTime?: Date;
  /**
   * The errors that were encountered during execution of the operation. The details array contains the list of them.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly error?: ApiError;
}

/** Identity for the virtual machine. */
export interface VirtualMachineIdentity {
  /**
   * The principal id of virtual machine identity. This property will only be provided for a system assigned identity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly principalId?: string;
  /**
   * The tenant id associated with the virtual machine. This property will only be provided for a system assigned identity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tenantId?: string;
  /** The type of identity used for the virtual machine. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine. */
  type?: ResourceIdentityType;
  /** The list of user identities associated with the Virtual Machine. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: {
    [propertyName: string]: UserAssignedIdentitiesValue;
  };
}

export interface UserAssignedIdentitiesValue {
  /**
   * The principal id of user assigned identity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly principalId?: string;
  /**
   * The client id of user assigned identity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly clientId?: string;
}

/** The List Virtual Machine operation response. */
export interface VirtualMachineScaleSetListResult {
  /** The list of virtual machine scale sets. */
  value: VirtualMachineScaleSet[];
  /** The uri to fetch the next page of Virtual Machine Scale Sets. Call ListNext() with this to fetch the next page of VMSS. */
  nextLink?: string;
}

/** Describes an upgrade policy - automatic, manual, or rolling. */
export interface UpgradePolicy {
  /** Specifies the mode of an upgrade to virtual machines in the scale set.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of updates to virtual machines in the scale set. You do this by using the manualUpgrade action.<br /><br /> **Automatic** - All virtual machines in the scale set are  automatically updated at the same time. */
  mode?: UpgradeMode;
  /** The configuration parameters used while performing a rolling upgrade. */
  rollingUpgradePolicy?: RollingUpgradePolicy;
  /** Configuration parameters used for performing automatic OS Upgrade. */
  automaticOSUpgradePolicy?: AutomaticOSUpgradePolicy;
}

/** The configuration parameters used while performing a rolling upgrade. */
export interface RollingUpgradePolicy {
  /** The maximum percent of total virtual machine instances that will be upgraded simultaneously by the rolling upgrade in one batch. As this is a maximum, unhealthy instances in previous or future batches can cause the percentage of instances in a batch to decrease to ensure higher reliability. The default value for this parameter is 20%. */
  maxBatchInstancePercent?: number;
  /** The maximum percentage of the total virtual machine instances in the scale set that can be simultaneously unhealthy, either as a result of being upgraded, or by being found in an unhealthy state by the virtual machine health checks before the rolling upgrade aborts. This constraint will be checked prior to starting any batch. The default value for this parameter is 20%. */
  maxUnhealthyInstancePercent?: number;
  /** The maximum percentage of upgraded virtual machine instances that can be found to be in an unhealthy state. This check will happen after each batch is upgraded. If this percentage is ever exceeded, the rolling update aborts. The default value for this parameter is 20%. */
  maxUnhealthyUpgradedInstancePercent?: number;
  /** The wait time between completing the update for all virtual machines in one batch and starting the next batch. The time duration should be specified in ISO 8601 format. The default value is 0 seconds (PT0S). */
  pauseTimeBetweenBatches?: string;
  /** Allow VMSS to ignore AZ boundaries when constructing upgrade batches. Take into consideration the Update Domain and maxBatchInstancePercent to determine the batch size. */
  enableCrossZoneUpgrade?: boolean;
  /** Upgrade all unhealthy instances in a scale set before any healthy instances. */
  prioritizeUnhealthyInstances?: boolean;
}

/** The configuration parameters used for performing automatic OS upgrade. */
export interface AutomaticOSUpgradePolicy {
  /** Indicates whether OS upgrades should automatically be applied to scale set instances in a rolling fashion when a newer version of the OS image becomes available. Default value is false. <br><br> If this is set to true for Windows based scale sets, [enableAutomaticUpdates](https://docs.microsoft.com/dotnet/api/microsoft.azure.management.compute.models.windowsconfiguration.enableautomaticupdates?view=azure-dotnet) is automatically set to false and cannot be set to true. */
  enableAutomaticOSUpgrade?: boolean;
  /** Whether OS image rollback feature should be disabled. Default value is false. */
  disableAutomaticRollback?: boolean;
}

/** Specifies the configuration parameters for automatic repairs on the virtual machine scale set. */
export interface AutomaticRepairsPolicy {
  /** Specifies whether automatic repairs should be enabled on the virtual machine scale set. The default value is false. */
  enabled?: boolean;
  /** The amount of time for which automatic repairs are suspended due to a state change on VM. The grace time starts after the state change has completed. This helps avoid premature or accidental repairs. The time duration should be specified in ISO 8601 format. The minimum allowed grace period is 30 minutes (PT30M), which is also the default value. The maximum allowed grace period is 90 minutes (PT90M). */
  gracePeriod?: string;
}

/** Describes a virtual machine scale set virtual machine profile. */
export interface VirtualMachineScaleSetVMProfile {
  /** Specifies the operating system settings for the virtual machines in the scale set. */
  osProfile?: VirtualMachineScaleSetOSProfile;
  /** Specifies the storage settings for the virtual machine disks. */
  storageProfile?: VirtualMachineScaleSetStorageProfile;
  /** Specifies properties of the network interfaces of the virtual machines in the scale set. */
  networkProfile?: VirtualMachineScaleSetNetworkProfile;
  /** Specifies the Security related profile settings for the virtual machines in the scale set. */
  securityProfile?: SecurityProfile;
  /** Specifies the boot diagnostic settings state. <br><br>Minimum api-version: 2015-06-15. */
  diagnosticsProfile?: DiagnosticsProfile;
  /** Specifies a collection of settings for extensions installed on virtual machines in the scale set. */
  extensionProfile?: VirtualMachineScaleSetExtensionProfile;
  /** Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 */
  licenseType?: string;
  /** Specifies the priority for the virtual machines in the scale set. <br><br>Minimum api-version: 2017-10-30-preview */
  priority?: VirtualMachinePriorityTypes;
  /** Specifies the eviction policy for the Azure Spot virtual machine and Azure Spot scale set. <br><br>For Azure Spot virtual machines, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2019-03-01. <br><br>For Azure Spot scale sets, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2017-10-30-preview. */
  evictionPolicy?: VirtualMachineEvictionPolicyTypes;
  /** Specifies the billing related details of a Azure Spot VMSS. <br><br>Minimum api-version: 2019-03-01. */
  billingProfile?: BillingProfile;
  /** Specifies Scheduled Event related configurations. */
  scheduledEventsProfile?: ScheduledEventsProfile;
}

/** Describes a virtual machine scale set OS profile. */
export interface VirtualMachineScaleSetOSProfile {
  /** Specifies the computer name prefix for all of the virtual machines in the scale set. Computer name prefixes must be 1 to 15 characters long. */
  computerNamePrefix?: string;
  /** Specifies the name of the administrator account. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters  <br><br><li> For root access to the Linux VM, see [Using root privileges on Linux virtual machines in Azure](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-use-root-privileges?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json)<br><li> For a list of built-in system users on Linux that should not be used in this field, see [Selecting User Names for Linux on Azure](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-usernames?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json) */
  adminUsername?: string;
  /** Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-reset-rdp?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-using-vmaccess-extension?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json#reset-root-password) */
  adminPassword?: string;
  /** Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. <br><br> For using cloud-init for your VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-using-cloud-init?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json) */
  customData?: string;
  /** Specifies Windows operating system settings on the virtual machine. */
  windowsConfiguration?: WindowsConfiguration;
  /** Specifies the Linux operating system settings on the virtual machine. <br><br>For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-endorsed-distros?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json) <br><br> For running non-endorsed distributions, see [Information for Non-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-create-upload-generic?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json). */
  linuxConfiguration?: LinuxConfiguration;
  /** Specifies set of certificates that should be installed onto the virtual machines in the scale set. */
  secrets?: VaultSecretGroup[];
}

/** Describes a virtual machine scale set storage profile. */
export interface VirtualMachineScaleSetStorageProfile {
  /** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. */
  imageReference?: ImageReference;
  /** Specifies information about the operating system disk used by the virtual machines in the scale set. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-about-disks-vhds?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json). */
  osDisk?: VirtualMachineScaleSetOSDisk;
  /** Specifies the parameters that are used to add data disks to the virtual machines in the scale set. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-about-disks-vhds?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json). */
  dataDisks?: VirtualMachineScaleSetDataDisk[];
}

/** Describes a virtual machine scale set operating system disk. */
export interface VirtualMachineScaleSetOSDisk {
  /** The disk name. */
  name?: string;
  /** Specifies the caching requirements. <br><br> Possible values are: <br><br> **None** <br><br> **ReadOnly** <br><br> **ReadWrite** <br><br> Default: **None for Standard storage. ReadOnly for Premium storage** */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies how the virtual machines in the scale set should be created.<br><br> The only allowed value is: **FromImage** \u2013 This value is used when you are using an image to create the virtual machine. If you are using a platform image, you also use the imageReference element described above. If you are using a marketplace image, you  also use the plan element previously described. */
  createOption: DiskCreateOptionTypes;
  /** Specifies the ephemeral disk Settings for the operating system disk used by the virtual machine scale set. */
  diffDiskSettings?: DiffDiskSettings;
  /** Specifies the size of the operating system disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. <br><br> This value cannot be larger than 1023 GB */
  diskSizeGB?: number;
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  osType?: OperatingSystemTypes;
  /** Specifies information about the unmanaged user image to base the scale set on. */
  image?: VirtualHardDisk;
  /** Specifies the container urls that are used to store operating system disks for the scale set. */
  vhdContainers?: string[];
  /** The managed disk parameters. */
  managedDisk?: VirtualMachineScaleSetManagedDiskParameters;
}

/** Describes the parameters of a ScaleSet managed disk. */
export interface VirtualMachineScaleSetManagedDiskParameters {
  /** Specifies the storage account type for the managed disk. NOTE: UltraSSD_LRS can only be used with data disks, it cannot be used with OS Disk. */
  storageAccountType?: StorageAccountTypes;
  /** Specifies the customer managed disk encryption set resource id for the managed disk. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
}

/** Describes a virtual machine scale set data disk. */
export interface VirtualMachineScaleSetDataDisk {
  /** The disk name. */
  name?: string;
  /** Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. */
  lun: number;
  /** Specifies the caching requirements. <br><br> Possible values are: <br><br> **None** <br><br> **ReadOnly** <br><br> **ReadWrite** <br><br> Default: **None for Standard storage. ReadOnly for Premium storage** */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** The create option. */
  createOption: DiskCreateOptionTypes;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. <br><br> This value cannot be larger than 1023 GB */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: VirtualMachineScaleSetManagedDiskParameters;
  /** Specifies the Read-Write IOPS for the managed disk. Should be used only when StorageAccountType is UltraSSD_LRS. If not specified, a default value would be assigned based on diskSizeGB. */
  diskIopsReadWrite?: number;
  /** Specifies the bandwidth in MB per second for the managed disk. Should be used only when StorageAccountType is UltraSSD_LRS. If not specified, a default value would be assigned based on diskSizeGB. */
  diskMBpsReadWrite?: number;
}

/** Describes a virtual machine scale set network profile. */
export interface VirtualMachineScaleSetNetworkProfile {
  /** A reference to a load balancer probe used to determine the health of an instance in the virtual machine scale set. The reference will be in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes/{probeName}'. */
  healthProbe?: ApiEntityReference;
  /** The list of network configurations. */
  networkInterfaceConfigurations?: VirtualMachineScaleSetNetworkConfiguration[];
}

/** The API entity reference. */
export interface ApiEntityReference {
  /** The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/... */
  id?: string;
}

/** Describes a virtual machines scale sets network configuration's DNS settings. */
export interface VirtualMachineScaleSetNetworkConfigurationDnsSettings {
  /** List of DNS servers IP addresses */
  dnsServers?: string[];
}

/** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
export interface VirtualMachineScaleSetPublicIPAddressConfiguration {
  /** The publicIP address configuration name. */
  name: string;
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** The dns settings to be applied on the publicIP addresses . */
  dnsSettings?: VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings;
  /** The list of IP tags associated with the public IP address. */
  ipTags?: VirtualMachineScaleSetIpTag[];
  /** The PublicIPPrefix from which to allocate publicIP addresses. */
  publicIPPrefix?: SubResource;
  /** Available from Api-Version 2019-07-01 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'. */
  publicIPAddressVersion?: IPVersion;
}

/** Describes a virtual machines scale sets network configuration's DNS settings. */
export interface VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings {
  /** The Domain name label.The concatenation of the domain name label and vm index will be the domain name labels of the PublicIPAddress resources that will be created */
  domainNameLabel: string;
}

/** Contains the IP tag associated with the public IP address. */
export interface VirtualMachineScaleSetIpTag {
  /** IP tag type. Example: FirstPartyUsage. */
  ipTagType?: string;
  /** IP tag associated with the public IP. Example: SQL, Storage etc. */
  tag?: string;
}

/** Describes a virtual machine scale set extension profile. */
export interface VirtualMachineScaleSetExtensionProfile {
  /** The virtual machine scale set child extension resources. */
  extensions?: VirtualMachineScaleSetExtension[];
  /** Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). <br><br> Minimum api-version: 2020-06-01 */
  extensionsTimeBudget?: string;
}

export interface ScheduledEventsProfile {
  /** Specifies Terminate Scheduled Event related configurations. */
  terminateNotificationProfile?: TerminateNotificationProfile;
}

export interface TerminateNotificationProfile {
  /** Configurable length of time a Virtual Machine being deleted will have to potentially approve the Terminate Scheduled Event before the event is auto approved (timed out). The configuration must be specified in ISO 8601 format, the default value is 5 minutes (PT5M) */
  notBeforeTimeout?: string;
  /** Specifies whether the Terminate Scheduled event is enabled or disabled. */
  enable?: boolean;
}

/** Describes a scale-in policy for a virtual machine scale set. */
export interface ScaleInPolicy {
  /** The rules to be followed when scaling-in a virtual machine scale set. <br><br> Possible values are: <br><br> **Default** When a virtual machine scale set is scaled in, the scale set will first be balanced across zones if it is a zonal scale set. Then, it will be balanced across Fault Domains as far as possible. Within each Fault Domain, the virtual machines chosen for removal will be the newest ones that are not protected from scale-in. <br><br> **OldestVM** When a virtual machine scale set is being scaled-in, the oldest virtual machines that are not protected from scale-in will be chosen for removal. For zonal virtual machine scale sets, the scale set will first be balanced across zones. Within each zone, the oldest virtual machines that are not protected will be chosen for removal. <br><br> **NewestVM** When a virtual machine scale set is being scaled-in, the newest virtual machines that are not protected from scale-in will be chosen for removal. For zonal virtual machine scale sets, the scale set will first be balanced across zones. Within each zone, the newest virtual machines that are not protected will be chosen for removal. <br><br> */
  rules?: VirtualMachineScaleSetScaleInRules[];
}

/** Identity for the virtual machine scale set. */
export interface VirtualMachineScaleSetIdentity {
  /**
   * The principal id of virtual machine scale set identity. This property will only be provided for a system assigned identity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly principalId?: string;
  /**
   * The tenant id associated with the virtual machine scale set. This property will only be provided for a system assigned identity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tenantId?: string;
  /** The type of identity used for the virtual machine scale set. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine scale set. */
  type?: ResourceIdentityType;
  /** The list of user identities associated with the virtual machine scale set. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: {
    [propertyName: string]: VirtualMachineScaleSetIdentityUserAssignedIdentitiesValue;
  };
}

export interface VirtualMachineScaleSetIdentityUserAssignedIdentitiesValue {
  /**
   * The principal id of user assigned identity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly principalId?: string;
  /**
   * The client id of user assigned identity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly clientId?: string;
}

/** Describes a storage profile. */
export interface ImageStorageProfile {
  /** Specifies information about the operating system disk used by the virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-about-disks-vhds?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json). */
  osDisk?: ImageOSDisk;
  /** Specifies the parameters that are used to add a data disk to a virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-about-disks-vhds?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json). */
  dataDisks?: ImageDataDisk[];
  /** Specifies whether an image is zone resilient or not. Default is false. Zone resilient images can be created only in regions that provide Zone Redundant Storage (ZRS). */
  zoneResilient?: boolean;
}

/** Describes a image disk. */
export interface ImageDisk {
  /** The snapshot. */
  snapshot?: SubResource;
  /** The managedDisk. */
  managedDisk?: SubResource;
  /** The Virtual Hard Disk. */
  blobUri?: string;
  /** Specifies the caching requirements. <br><br> Possible values are: <br><br> **None** <br><br> **ReadOnly** <br><br> **ReadWrite** <br><br> Default: **None for Standard storage. ReadOnly for Premium storage** */
  caching?: CachingTypes;
  /** Specifies the size of empty data disks in gigabytes. This element can be used to overwrite the name of the disk in a virtual machine image. <br><br> This value cannot be larger than 1023 GB */
  diskSizeGB?: number;
  /** Specifies the storage account type for the managed disk. NOTE: UltraSSD_LRS can only be used with data disks, it cannot be used with OS Disk. */
  storageAccountType?: StorageAccountTypes;
  /** Specifies the customer managed disk encryption set resource id for the managed image disk. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
}

/** The List Image operation response. */
export interface ImageListResult {
  /** The list of Images. */
  value: Image[];
  /** The uri to fetch the next page of Images. Call ListNext() with this to fetch the next page of Images. */
  nextLink?: string;
}

/** Capture Virtual Machine parameters. */
export interface VirtualMachineCaptureParameters {
  /** The captured virtual hard disk's name prefix. */
  vhdPrefix: string;
  /** The destination container name. */
  destinationContainerName: string;
  /** Specifies whether to overwrite the destination virtual hard disk, in case of conflict. */
  overwriteVhds: boolean;
}

/** Parameters for Reimaging Virtual Machine. NOTE: Virtual Machine OS disk will always be reimaged */
export interface VirtualMachineReimageParameters {
  /** Specifies whether to reimage temp disk. Default value: false. Note: This temp disk reimage parameter is only supported for VM/VMSS with Ephemeral OS disk. */
  tempDisk?: boolean;
}

/** The SAS URIs of the console screenshot and serial log blobs. */
export interface RetrieveBootDiagnosticsDataResult {
  /**
   * The console screenshot blob URI
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly consoleScreenshotBlobUri?: string;
  /**
   * The serial console log blob URI.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly serialConsoleLogBlobUri?: string;
}

/** Describes the properties of an AssessPatches result. */
export interface VirtualMachineAssessPatchesResult {
  /**
   * The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings."
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly status?: PatchOperationStatus;
  /**
   * The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly assessmentActivityId?: string;
  /**
   * The overall reboot status of the VM. It will be true when partially installed patches require a reboot to complete installation but the reboot has not yet occurred.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly rebootPending?: boolean;
  /**
   * The number of critical or security patches that have been detected as available and not yet installed.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly criticalAndSecurityPatchCount?: number;
  /**
   * The number of all available patches excluding critical and security.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly otherPatchCount?: number;
  /**
   * The UTC timestamp when the operation began.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly startDateTime?: Date;
  /**
   * The list of patches that have been detected as available for installation.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly availablePatches?: VirtualMachineSoftwarePatchProperties[];
  /**
   * The errors that were encountered during execution of the operation. The details array contains the list of them.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly error?: ApiError;
}

/** Describes the properties of a Virtual Machine software patch. */
export interface VirtualMachineSoftwarePatchProperties {
  /**
   * A unique identifier for the patch.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly patchId?: string;
  /**
   * The friendly name of the patch.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * The version number of the patch. This property applies only to Linux patches.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly version?: string;
  /**
   * The KBID of the patch. Only applies to Windows patches.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly kbId?: string;
  /**
   * The classification(s) of the patch as provided by the patch publisher.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly classifications?: string[];
  /**
   * Describes the reboot requirements of the patch.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly rebootBehavior?: VMGuestPatchRebootBehavior;
  /**
   * The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly activityId?: string;
  /**
   * The UTC timestamp when the repository published this patch.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly publishedDate?: Date;
  /**
   * The UTC timestamp of the last update to this patch record.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly lastModifiedDateTime?: Date;
  /**
   * Describes the availability of a given patch.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly assessmentState?: PatchAssessmentState;
}

/** Input for InstallPatches as directly received by the API */
export interface VirtualMachineInstallPatchesParameters {
  /** Specifies the maximum amount of time that the operation will run. It must be an ISO 8601-compliant duration string such as PT4H (4 hours) */
  maximumDuration: string;
  /** Defines when it is acceptable to reboot a VM during a software update operation. */
  rebootSetting: VMGuestPatchRebootSetting;
  /** Input for InstallPatches on a Windows VM, as directly received by the API */
  windowsParameters?: WindowsParameters;
  /** Input for InstallPatches on a Linux VM, as directly received by the API */
  linuxParameters?: LinuxParameters;
}

/** Input for InstallPatches on a Windows VM, as directly received by the API */
export interface WindowsParameters {
  /** The update classifications to select when installing patches for Windows. */
  classificationsToInclude?: VMGuestPatchClassificationWindows[];
  /** Kbs to include in the patch operation */
  kbNumbersToInclude?: string[];
  /** Kbs to exclude in the patch operation */
  kbNumbersToExclude?: string[];
  /** Filters out Kbs that don't have an InstallationRebootBehavior of 'NeverReboots' when this is set to true. */
  excludeKbsRequiringReboot?: boolean;
  /** This is used to install patches that were published on or before this given max published date. */
  maxPatchPublishDate?: Date;
}

/** Input for InstallPatches on a Linux VM, as directly received by the API */
export interface LinuxParameters {
  /** The update classifications to select when installing patches for Linux. */
  classificationsToInclude?: VMGuestPatchClassificationLinux[];
  /** packages to include in the patch operation. Format: packageName_packageVersion */
  packageNameMasksToInclude?: string[];
  /** packages to exclude in the patch operation. Format: packageName_packageVersion */
  packageNameMasksToExclude?: string[];
  /** This is used as a maintenance run identifier for Auto VM Guest Patching in Linux. */
  maintenanceRunId?: string;
}

/** The result summary of an installation operation. */
export interface VirtualMachineInstallPatchesResult {
  /**
   * The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Failed", "Succeeded", "Unknown" or "CompletedWithWarnings."
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly status?: PatchOperationStatus;
  /**
   * The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly installationActivityId?: string;
  /**
   * The reboot state of the VM following completion of the operation.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly rebootStatus?: VMGuestPatchRebootStatus;
  /**
   * Whether the operation ran out of time before it completed all its intended actions.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly maintenanceWindowExceeded?: boolean;
  /**
   * The number of patches that were not installed due to the user blocking their installation.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly excludedPatchCount?: number;
  /**
   * The number of patches that were detected as available for install, but did not meet the operation's criteria.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly notSelectedPatchCount?: number;
  /**
   * The number of patches that were identified as meeting the installation criteria, but were not able to be installed. Typically this happens when maintenanceWindowExceeded == true.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly pendingPatchCount?: number;
  /**
   * The number of patches successfully installed.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly installedPatchCount?: number;
  /**
   * The number of patches that could not be installed due to some issue. See errors for details.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly failedPatchCount?: number;
  /**
   * The patches that were installed during the operation.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly patches?: PatchInstallationDetail[];
  /**
   * The UTC timestamp when the operation began.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly startDateTime?: Date;
  /**
   * The errors that were encountered during execution of the operation. The details array contains the list of them.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly error?: ApiError;
}

/** Information about a specific patch that was encountered during an installation action. */
export interface PatchInstallationDetail {
  /**
   * A unique identifier for the patch.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly patchId?: string;
  /**
   * The friendly name of the patch.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * The version string of the package. It may conform to Semantic Versioning. Only applies to Linux.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly version?: string;
  /**
   * The KBID of the patch. Only applies to Windows patches.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly kbId?: string;
  /**
   * The classification(s) of the patch as provided by the patch publisher.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly classifications?: string[];
  /**
   * The state of the patch after the installation operation completed.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly installationState?: PatchInstallationState;
}

/** Describes a virtual machine scale set virtual machine profile. */
export interface VirtualMachineScaleSetUpdateVMProfile {
  /** The virtual machine scale set OS profile. */
  osProfile?: VirtualMachineScaleSetUpdateOSProfile;
  /** The virtual machine scale set storage profile. */
  storageProfile?: VirtualMachineScaleSetUpdateStorageProfile;
  /** The virtual machine scale set network profile. */
  networkProfile?: VirtualMachineScaleSetUpdateNetworkProfile;
  /** The virtual machine scale set Security profile */
  securityProfile?: SecurityProfile;
  /** The virtual machine scale set diagnostics profile. */
  diagnosticsProfile?: DiagnosticsProfile;
  /** The virtual machine scale set extension profile. */
  extensionProfile?: VirtualMachineScaleSetExtensionProfile;
  /** The license type, which is for bring your own license scenario. */
  licenseType?: string;
  /** Specifies the billing related details of a Azure Spot VMSS. <br><br>Minimum api-version: 2019-03-01. */
  billingProfile?: BillingProfile;
  /** Specifies Scheduled Event related configurations. */
  scheduledEventsProfile?: ScheduledEventsProfile;
}

/** Describes a virtual machine scale set OS profile. */
export interface VirtualMachineScaleSetUpdateOSProfile {
  /** A base-64 encoded string of custom data. */
  customData?: string;
  /** The Windows Configuration of the OS profile. */
  windowsConfiguration?: WindowsConfiguration;
  /** The Linux Configuration of the OS profile. */
  linuxConfiguration?: LinuxConfiguration;
  /** The List of certificates for addition to the VM. */
  secrets?: VaultSecretGroup[];
}

/** Describes a virtual machine scale set storage profile. */
export interface VirtualMachineScaleSetUpdateStorageProfile {
  /** The image reference. */
  imageReference?: ImageReference;
  /** The OS disk. */
  osDisk?: VirtualMachineScaleSetUpdateOSDisk;
  /** The data disks. */
  dataDisks?: VirtualMachineScaleSetDataDisk[];
}

/** Describes virtual machine scale set operating system disk Update Object. This should be used for Updating VMSS OS Disk. */
export interface VirtualMachineScaleSetUpdateOSDisk {
  /** The caching type. */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies the size of the operating system disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. <br><br> This value cannot be larger than 1023 GB */
  diskSizeGB?: number;
  /** The Source User Image VirtualHardDisk. This VirtualHardDisk will be copied before using it to attach to the Virtual Machine. If SourceImage is provided, the destination VirtualHardDisk should not exist. */
  image?: VirtualHardDisk;
  /** The list of virtual hard disk container uris. */
  vhdContainers?: string[];
  /** The managed disk parameters. */
  managedDisk?: VirtualMachineScaleSetManagedDiskParameters;
}

/** Describes a virtual machine scale set network profile. */
export interface VirtualMachineScaleSetUpdateNetworkProfile {
  /** A reference to a load balancer probe used to determine the health of an instance in the virtual machine scale set. The reference will be in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes/{probeName}'. */
  healthProbe?: ApiEntityReference;
  /** The list of network configurations. */
  networkInterfaceConfigurations?: VirtualMachineScaleSetUpdateNetworkConfiguration[];
}

/** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
export interface VirtualMachineScaleSetUpdatePublicIPAddressConfiguration {
  /** The publicIP address configuration name. */
  name?: string;
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** The dns settings to be applied on the publicIP addresses . */
  dnsSettings?: VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings;
}

/** Specifies a list of virtual machine instance IDs from the VM scale set. */
export interface VirtualMachineScaleSetVMInstanceIDs {
  /** The virtual machine scale set instance ids. Omitting the virtual machine scale set instance ids will result in the operation being performed on all virtual machines in the virtual machine scale set. */
  instanceIds?: string[];
}

/** Specifies a list of virtual machine instance IDs from the VM scale set. */
export interface VirtualMachineScaleSetVMInstanceRequiredIDs {
  /** The virtual machine scale set instance ids. */
  instanceIds: string[];
}

/** The instance view of a virtual machine scale set. */
export interface VirtualMachineScaleSetInstanceView {
  /**
   * The instance view status summary for the virtual machine scale set.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly virtualMachine?: VirtualMachineScaleSetInstanceViewStatusesSummary;
  /**
   * The extensions information.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly extensions?: VirtualMachineScaleSetVMExtensionsSummary[];
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
  /**
   * The orchestration services information.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly orchestrationServices?: OrchestrationServiceSummary[];
}

/** Instance view statuses summary for virtual machines of a virtual machine scale set. */
export interface VirtualMachineScaleSetInstanceViewStatusesSummary {
  /**
   * The extensions information.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly statusesSummary?: VirtualMachineStatusCodeCount[];
}

/** The status code and count of the virtual machine scale set instance view status summary. */
export interface VirtualMachineStatusCodeCount {
  /**
   * The instance view status code.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly code?: string;
  /**
   * The number of instances having a particular status code.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly count?: number;
}

/** Extensions summary for virtual machines of a virtual machine scale set. */
export interface VirtualMachineScaleSetVMExtensionsSummary {
  /**
   * The extension name.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * The extensions information.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly statusesSummary?: VirtualMachineStatusCodeCount[];
}

/** Summary for an orchestration service of a virtual machine scale set. */
export interface OrchestrationServiceSummary {
  /**
   * The name of the service.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly serviceName?: OrchestrationServiceNames;
  /**
   * The current state of the service.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly serviceState?: OrchestrationServiceState;
}

/** The List VM scale set extension operation response. */
export interface VirtualMachineScaleSetExtensionListResult {
  /** The list of VM scale set extensions. */
  value: VirtualMachineScaleSetExtension[];
  /** The uri to fetch the next page of VM scale set extensions. Call ListNext() with this to fetch the next page of VM scale set extensions. */
  nextLink?: string;
}

/** The List Virtual Machine operation response. */
export interface VirtualMachineScaleSetListWithLinkResult {
  /** The list of virtual machine scale sets. */
  value: VirtualMachineScaleSet[];
  /** The uri to fetch the next page of Virtual Machine Scale Sets. Call ListNext() with this to fetch the next page of Virtual Machine Scale Sets. */
  nextLink?: string;
}

/** The Virtual Machine Scale Set List Skus operation response. */
export interface VirtualMachineScaleSetListSkusResult {
  /** The list of skus available for the virtual machine scale set. */
  value: VirtualMachineScaleSetSku[];
  /** The uri to fetch the next page of Virtual Machine Scale Set Skus. Call ListNext() with this to fetch the next page of VMSS Skus. */
  nextLink?: string;
}

/** Describes an available virtual machine scale set sku. */
export interface VirtualMachineScaleSetSku {
  /**
   * The type of resource the sku applies to.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly resourceType?: string;
  /**
   * The Sku.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly sku?: Sku;
  /**
   * Specifies the number of virtual machines in the scale set.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly capacity?: VirtualMachineScaleSetSkuCapacity;
}

/** Describes scaling information of a sku. */
export interface VirtualMachineScaleSetSkuCapacity {
  /**
   * The minimum capacity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly minimum?: number;
  /**
   * The maximum capacity that can be set.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly maximum?: number;
  /**
   * The default capacity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly defaultCapacity?: number;
  /**
   * The scale type applicable to the sku.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly scaleType?: VirtualMachineScaleSetSkuScaleType;
}

/** List of Virtual Machine Scale Set OS Upgrade History operation response. */
export interface VirtualMachineScaleSetListOSUpgradeHistory {
  /** The list of OS upgrades performed on the virtual machine scale set. */
  value: UpgradeOperationHistoricalStatusInfo[];
  /** The uri to fetch the next page of OS Upgrade History. Call ListNext() with this to fetch the next page of history of upgrades. */
  nextLink?: string;
}

/** Virtual Machine Scale Set OS Upgrade History operation response. */
export interface UpgradeOperationHistoricalStatusInfo {
  /**
   * Information about the properties of the upgrade operation.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly properties?: UpgradeOperationHistoricalStatusInfoProperties;
  /**
   * Resource type
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
  /**
   * Resource location
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly location?: string;
}

/** Describes each OS upgrade on the Virtual Machine Scale Set. */
export interface UpgradeOperationHistoricalStatusInfoProperties {
  /**
   * Information about the overall status of the upgrade operation.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly runningStatus?: UpgradeOperationHistoryStatus;
  /**
   * Counts of the VMs in each state.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly progress?: RollingUpgradeProgressInfo;
  /**
   * Error Details for this upgrade if there are any.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly error?: ApiError;
  /**
   * Invoker of the Upgrade Operation
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly startedBy?: UpgradeOperationInvoker;
  /**
   * Image Reference details
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly targetImageReference?: ImageReference;
  /**
   * Information about OS rollback if performed
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly rollbackInfo?: RollbackStatusInfo;
}

/** Information about the current running state of the overall upgrade. */
export interface UpgradeOperationHistoryStatus {
  /**
   * Code indicating the current status of the upgrade.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly code?: UpgradeState;
  /**
   * Start time of the upgrade.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly startTime?: Date;
  /**
   * End time of the upgrade.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly endTime?: Date;
}

/** Information about the number of virtual machine instances in each upgrade state. */
export interface RollingUpgradeProgressInfo {
  /**
   * The number of instances that have been successfully upgraded.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly successfulInstanceCount?: number;
  /**
   * The number of instances that have failed to be upgraded successfully.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly failedInstanceCount?: number;
  /**
   * The number of instances that are currently being upgraded.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly inProgressInstanceCount?: number;
  /**
   * The number of instances that have not yet begun to be upgraded.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly pendingInstanceCount?: number;
}

/** Information about rollback on failed VM instances after a OS Upgrade operation. */
export interface RollbackStatusInfo {
  /**
   * The number of instances which have been successfully rolled back.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly successfullyRolledbackInstanceCount?: number;
  /**
   * The number of instances which failed to rollback.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly failedRolledbackInstanceCount?: number;
  /**
   * Error details if OS rollback failed.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly rollbackError?: ApiError;
}

/** Information about the current running state of the overall upgrade. */
export interface RollingUpgradeRunningStatus {
  /**
   * Code indicating the current status of the upgrade.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly code?: RollingUpgradeStatusCode;
  /**
   * Start time of the upgrade.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly startTime?: Date;
  /**
   * The last action performed on the rolling upgrade.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly lastAction?: RollingUpgradeActionType;
  /**
   * Last action time of the upgrade.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly lastActionTime?: Date;
}

/** Response after calling a manual recovery walk */
export interface RecoveryWalkResponse {
  /**
   * Whether the recovery walk was performed
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly walkPerformed?: boolean;
  /**
   * The next update domain that needs to be walked. Null means walk spanning all update domains has been completed
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly nextPlatformUpdateDomain?: number;
}

export interface VMScaleSetConvertToSinglePlacementGroupInput {
  /** Id of the placement group in which you want future virtual machine instances to be placed. To query placement group Id, please use Virtual Machine Scale Set VMs - Get API. If not provided, the platform will choose one with maximum number of virtual machine instances. */
  activePlacementGroupId?: string;
}

/** The input for OrchestrationServiceState */
export interface OrchestrationServiceStateInput {
  /** The name of the service. */
  serviceName: OrchestrationServiceNames;
  /** The action to be performed. */
  action: OrchestrationServiceStateAction;
}

/** The List VMSS VM Extension operation response */
export interface VirtualMachineScaleSetVMExtensionsListResult {
  /** The list of VMSS VM extensions */
  value?: VirtualMachineScaleSetVMExtension[];
}

/** The instance view of a virtual machine scale set VM. */
export interface VirtualMachineScaleSetVMInstanceView {
  /** The Update Domain count. */
  platformUpdateDomain?: number;
  /** The Fault Domain count. */
  platformFaultDomain?: number;
  /** The Remote desktop certificate thumbprint. */
  rdpThumbPrint?: string;
  /** The VM Agent running on the virtual machine. */
  vmAgent?: VirtualMachineAgentInstanceView;
  /** The Maintenance Operation status on the virtual machine. */
  maintenanceRedeployStatus?: MaintenanceRedeployStatus;
  /** The disks information. */
  disks?: DiskInstanceView[];
  /** The extensions information. */
  extensions?: VirtualMachineExtensionInstanceView[];
  /**
   * The health status for the VM.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly vmHealth?: VirtualMachineHealthStatus;
  /** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. <br><br> You can easily view the output of your console log. <br><br> Azure also enables you to see a screenshot of the VM from the hypervisor. */
  bootDiagnostics?: BootDiagnosticsInstanceView;
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
  /**
   * Resource id of the dedicated host, on which the virtual machine is allocated through automatic placement, when the virtual machine is associated with a dedicated host group that has automatic placement enabled. <br><br>Minimum api-version: 2020-06-01.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly assignedHost?: string;
  /** The placement group in which the VM is running. If the VM is deallocated it will not have a placementGroupId. */
  placementGroupId?: string;
}

/** Describes a virtual machine scale set VM network profile. */
export interface VirtualMachineScaleSetVMNetworkProfileConfiguration {
  /** The list of network configurations. */
  networkInterfaceConfigurations?: VirtualMachineScaleSetNetworkConfiguration[];
}

/** The protection policy of a virtual machine scale set VM. */
export interface VirtualMachineScaleSetVMProtectionPolicy {
  /** Indicates that the virtual machine scale set VM shouldn't be considered for deletion during a scale-in operation. */
  protectFromScaleIn?: boolean;
  /** Indicates that model updates or actions (including scale-in) initiated on the virtual machine scale set should not be applied to the virtual machine scale set VM. */
  protectFromScaleSetActions?: boolean;
}

/** The List Virtual Machine Scale Set VMs operation response. */
export interface VirtualMachineScaleSetVMListResult {
  /** The list of virtual machine scale sets VMs. */
  value: VirtualMachineScaleSetVM[];
  /** The uri to fetch the next page of Virtual Machine Scale Set VMs. Call ListNext() with this to fetch the next page of VMSS VMs */
  nextLink?: string;
}

/** Api input base class for LogAnalytics Api. */
export interface LogAnalyticsInputBase {
  /** SAS Uri of the logging blob container to which LogAnalytics Api writes output logs to. */
  blobContainerSasUri: string;
  /** From time of the query */
  fromTime: Date;
  /** To time of the query */
  toTime: Date;
  /** Group query result by Throttle Policy applied. */
  groupByThrottlePolicy?: boolean;
  /** Group query result by Operation Name. */
  groupByOperationName?: boolean;
  /** Group query result by Resource Name. */
  groupByResourceName?: boolean;
  /** Group query result by Client Application ID. */
  groupByClientApplicationId?: boolean;
  /** Group query result by User Agent. */
  groupByUserAgent?: boolean;
}

/** LogAnalytics operation status response */
export interface LogAnalyticsOperationResult {
  /**
   * LogAnalyticsOutput
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly properties?: LogAnalyticsOutput;
}

/** LogAnalytics output properties */
export interface LogAnalyticsOutput {
  /**
   * Output file Uri path to blob container.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly output?: string;
}

/** The List Virtual Machine operation response. */
export interface RunCommandListResult {
  /** The list of virtual machine run commands. */
  value: RunCommandDocumentBase[];
  /** The uri to fetch the next page of run commands. Call ListNext() with this to fetch the next page of run commands. */
  nextLink?: string;
}

/** Describes the properties of a Run Command metadata. */
export interface RunCommandDocumentBase {
  /** The VM run command schema. */
  schema: string;
  /** The VM run command id. */
  id: string;
  /** The Operating System type. */
  osType: OperatingSystemTypes;
  /** The VM run command label. */
  label: string;
  /** The VM run command description. */
  description: string;
}

/** Describes the properties of a run command parameter. */
export interface RunCommandParameterDefinition {
  /** The run command parameter name. */
  name: string;
  /** The run command parameter type. */
  type: string;
  /** The run command parameter default value. */
  defaultValue?: string;
  /** The run command parameter required. */
  required?: boolean;
}

/** Capture Virtual Machine parameters. */
export interface RunCommandInput {
  /** The run command id. */
  commandId: string;
  /** Optional. The script to be executed.  When this value is given, the given script will override the default script of the command. */
  script?: string[];
  /** The run command parameters. */
  parameters?: RunCommandInputParameter[];
}

/** Describes the properties of a run command parameter. */
export interface RunCommandInputParameter {
  /** The run command parameter name. */
  name: string;
  /** The run command parameter value. */
  value: string;
}

export interface RunCommandResult {
  /** Run command operation response. */
  value?: InstanceViewStatus[];
}

/** Describes the script sources for run command. */
export interface VirtualMachineRunCommandScriptSource {
  /** Specifies the script content to be executed on the VM. */
  script?: string;
  /** Specifies the script download location. */
  scriptUri?: string;
  /** Specifies a commandId of predefined built-in script. */
  commandId?: string;
}

/** The instance view of a virtual machine run command. */
export interface VirtualMachineRunCommandInstanceView {
  /** Script execution status. */
  executionState?: ExecutionState;
  /** Communicate script configuration errors or execution messages. */
  executionMessage?: string;
  /** Exit code returned from script execution. */
  exitCode?: number;
  /** Script output stream. */
  output?: string;
  /** Script error stream. */
  error?: string;
  /** Script start time. */
  startTime?: Date;
  /** Script end time. */
  endTime?: Date;
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
}

/** The List run command operation response */
export interface VirtualMachineRunCommandsListResult {
  /** The list of run commands */
  value: VirtualMachineRunCommand[];
  /** The uri to fetch the next page of run commands. */
  nextLink?: string;
}

/** The List Resource Skus operation response. */
export interface ResourceSkusResult {
  /** The list of skus available for the subscription. */
  value: ResourceSku[];
  /** The URI to fetch the next page of Resource Skus. Call ListNext() with this URI to fetch the next page of Resource Skus */
  nextLink?: string;
}

/** Describes an available Compute SKU. */
export interface ResourceSku {
  /**
   * The type of resource the SKU applies to.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly resourceType?: string;
  /**
   * The name of SKU.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * Specifies the tier of virtual machines in a scale set.<br /><br /> Possible Values:<br /><br /> **Standard**<br /><br /> **Basic**
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tier?: string;
  /**
   * The Size of the SKU.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly size?: string;
  /**
   * The Family of this particular SKU.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly family?: string;
  /**
   * The Kind of resources that are supported in this SKU.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly kind?: string;
  /**
   * Specifies the number of virtual machines in the scale set.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly capacity?: ResourceSkuCapacity;
  /**
   * The set of locations that the SKU is available.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly locations?: string[];
  /**
   * A list of locations and availability zones in those locations where the SKU is available.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly locationInfo?: ResourceSkuLocationInfo[];
  /**
   * The api versions that support this SKU.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly apiVersions?: string[];
  /**
   * Metadata for retrieving price info.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly costs?: ResourceSkuCosts[];
  /**
   * A name value pair to describe the capability.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly capabilities?: ResourceSkuCapabilities[];
  /**
   * The restrictions because of which SKU cannot be used. This is empty if there are no restrictions.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly restrictions?: ResourceSkuRestrictions[];
}

/** Describes scaling information of a SKU. */
export interface ResourceSkuCapacity {
  /**
   * The minimum capacity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly minimum?: number;
  /**
   * The maximum capacity that can be set.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly maximum?: number;
  /**
   * The default capacity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly default?: number;
  /**
   * The scale type applicable to the sku.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly scaleType?: ResourceSkuCapacityScaleType;
}

export interface ResourceSkuLocationInfo {
  /**
   * Location of the SKU
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly location?: string;
  /**
   * List of availability zones where the SKU is supported.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly zones?: string[];
  /**
   * Details of capabilities available to a SKU in specific zones.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly zoneDetails?: ResourceSkuZoneDetails[];
}

/** Describes The zonal capabilities of a SKU. */
export interface ResourceSkuZoneDetails {
  /**
   * The set of zones that the SKU is available in with the specified capabilities.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string[];
  /**
   * A list of capabilities that are available for the SKU in the specified list of zones.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly capabilities?: ResourceSkuCapabilities[];
}

/** Describes The SKU capabilities object. */
export interface ResourceSkuCapabilities {
  /**
   * An invariant to describe the feature.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * An invariant if the feature is measured by quantity.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly value?: string;
}

/** Describes metadata for retrieving price info. */
export interface ResourceSkuCosts {
  /**
   * Used for querying price from commerce.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly meterID?: string;
  /**
   * The multiplier is needed to extend the base metered cost.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly quantity?: number;
  /**
   * An invariant to show the extended unit.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly extendedUnit?: string;
}

/** Describes scaling information of a SKU. */
export interface ResourceSkuRestrictions {
  /**
   * The type of restrictions.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: ResourceSkuRestrictionsType;
  /**
   * The value of restrictions. If the restriction type is set to location. This would be different locations where the SKU is restricted.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly values?: string[];
  /**
   * The information about the restriction where the SKU cannot be used.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly restrictionInfo?: ResourceSkuRestrictionInfo;
  /**
   * The reason for restriction.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly reasonCode?: ResourceSkuRestrictionsReasonCode;
}

export interface ResourceSkuRestrictionInfo {
  /**
   * Locations where the SKU is restricted
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly locations?: string[];
  /**
   * List of availability zones where the SKU is restricted.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly zones?: string[];
}

/** The disks sku name. Can be Standard_LRS, Premium_LRS, StandardSSD_LRS, or UltraSSD_LRS. */
export interface DiskSku {
  /** The sku name. */
  name?: DiskStorageAccountTypes;
  /**
   * The sku tier.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tier?: string;
}

/** Used for establishing the purchase context of any 3rd Party artifact through MarketPlace. */
export interface PurchasePlanAutoGenerated {
  /** The plan ID. */
  name: string;
  /** The publisher ID. */
  publisher: string;
  /** Specifies the product of the image from the marketplace. This is the same value as Offer under the imageReference element. */
  product: string;
  /** The Offer Promotion Code. */
  promotionCode?: string;
}

/** Data used when creating a disk. */
export interface CreationData {
  /** This enumerates the possible sources of a disk's creation. */
  createOption: DiskCreateOption;
  /** Required if createOption is Import. The Azure Resource Manager identifier of the storage account containing the blob to import as a disk. */
  storageAccountId?: string;
  /** Disk source information. */
  imageReference?: ImageDiskReference;
  /** Required if creating from a Gallery Image. The id of the ImageDiskReference will be the ARM id of the shared galley image version from which to create a disk. */
  galleryImageReference?: ImageDiskReference;
  /** If createOption is Import, this is the URI of a blob to be imported into a managed disk. */
  sourceUri?: string;
  /** If createOption is Copy, this is the ARM id of the source snapshot or disk. */
  sourceResourceId?: string;
  /**
   * If this field is set, this is the unique id identifying the source of this resource.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly sourceUniqueId?: string;
  /** If createOption is Upload, this is the size of the contents of the upload including the VHD footer. This value should be between 20972032 (20 MiB + 512 bytes for the VHD footer) and 35183298347520 bytes (32 TiB + 512 bytes for the VHD footer). */
  uploadSizeBytes?: number;
  /** Logical sector size in bytes for Ultra disks. Supported values are 512 ad 4096. 4096 is the default. */
  logicalSectorSize?: number;
}

/** The source image used for creating the disk. */
export interface ImageDiskReference {
  /** A relative uri containing either a Platform Image Repository or user image reference. */
  id: string;
  /** If the disk is created from an image's data disk, this is an index that indicates which of the data disks in the image to use. For OS disks, this field is null. */
  lun?: number;
}

/** Encryption settings for disk or snapshot */
export interface EncryptionSettingsCollection {
  /** Set this flag to true and provide DiskEncryptionKey and optional KeyEncryptionKey to enable encryption. Set this flag to false and remove DiskEncryptionKey and KeyEncryptionKey to disable encryption. If EncryptionSettings is null in the request object, the existing settings remain unchanged. */
  enabled: boolean;
  /** A collection of encryption settings, one for each disk volume. */
  encryptionSettings?: EncryptionSettingsElement[];
  /** Describes what type of encryption is used for the disks. Once this field is set, it cannot be overwritten. '1.0' corresponds to Azure Disk Encryption with AAD app.'1.1' corresponds to Azure Disk Encryption. */
  encryptionSettingsVersion?: string;
}

/** Encryption settings for one disk volume. */
export interface EncryptionSettingsElement {
  /** Key Vault Secret Url and vault id of the disk encryption key */
  diskEncryptionKey?: KeyVaultAndSecretReference;
  /** Key Vault Key Url and vault id of the key encryption key. KeyEncryptionKey is optional and when provided is used to unwrap the disk encryption key. */
  keyEncryptionKey?: KeyVaultAndKeyReference;
}

/** Key Vault Secret Url and vault id of the encryption key */
export interface KeyVaultAndSecretReference {
  /** Resource id of the KeyVault containing the key or secret */
  sourceVault: SourceVault;
  /** Url pointing to a key or secret in KeyVault */
  secretUrl: string;
}

/** The vault id is an Azure Resource Manager Resource id in the form /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName} */
export interface SourceVault {
  /** Resource Id */
  id?: string;
}

/** Key Vault Key Url and vault id of KeK, KeK is optional and when provided is used to unwrap the encryptionKey */
export interface KeyVaultAndKeyReference {
  /** Resource id of the KeyVault containing the key or secret */
  sourceVault: SourceVault;
  /** Url pointing to a key or secret in KeyVault */
  keyUrl: string;
}

/** Encryption at rest settings for disk or snapshot */
export interface Encryption {
  /** ResourceId of the disk encryption set to use for enabling encryption at rest. */
  diskEncryptionSetId?: string;
  /** The type of key used to encrypt the data of the disk. */
  type?: EncryptionType;
}

export interface ShareInfoElement {
  /**
   * A relative URI containing the ID of the VM that has the disk attached.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly vmUri?: string;
}

/** Disk update resource. */
export interface DiskUpdate {
  /** Resource tags */
  tags?: { [propertyName: string]: string };
  /** The disks sku name. Can be Standard_LRS, Premium_LRS, StandardSSD_LRS, or UltraSSD_LRS. */
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
  purchasePlan?: PurchasePlanAutoGenerated;
}

/** The List Disks operation response. */
export interface DiskList {
  /** A list of disks. */
  value: Disk[];
  /** The uri to fetch the next page of disks. Call ListNext() with this to fetch the next page of disks. */
  nextLink?: string;
}

/** Data used for requesting a SAS. */
export interface GrantAccessData {
  access: AccessLevel;
  /** Time duration in seconds until the SAS access expires. */
  durationInSeconds: number;
}

/** A disk access SAS uri. */
export interface AccessUri {
  /**
   * A SAS uri for accessing a disk.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly accessSAS?: string;
}

/** The snapshots sku name. Can be Standard_LRS, Premium_LRS, or Standard_ZRS. This is an optional parameter for incremental snapshot and the default behavior is the SKU will be set to the same sku as the previous snapshot */
export interface SnapshotSku {
  /** The sku name. */
  name?: SnapshotStorageAccountTypes;
  /**
   * The sku tier.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tier?: string;
}

/** Snapshot update resource. */
export interface SnapshotUpdate {
  /** Resource tags */
  tags?: { [propertyName: string]: string };
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
}

/** The List Snapshots operation response. */
export interface SnapshotList {
  /** A list of snapshots. */
  value: Snapshot[];
  /** The uri to fetch the next page of snapshots. Call ListNext() with this to fetch the next page of snapshots. */
  nextLink?: string;
}

/** The managed identity for the disk encryption set. It should be given permission on the key vault before it can be used to encrypt disks. */
export interface EncryptionSetIdentity {
  /** The type of Managed Identity used by the DiskEncryptionSet. Only SystemAssigned is supported for new creations. Disk Encryption Sets can be updated with Identity type None during migration of subscription to a new Azure Active Directory tenant; it will cause the encrypted resources to lose access to the keys. */
  type?: DiskEncryptionSetIdentityType;
  /**
   * The object id of the Managed Identity Resource. This will be sent to the RP from ARM via the x-ms-identity-principal-id header in the PUT request if the resource has a systemAssigned(implicit) identity
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly principalId?: string;
  /**
   * The tenant id of the Managed Identity Resource. This will be sent to the RP from ARM via the x-ms-client-tenant-id header in the PUT request if the resource has a systemAssigned(implicit) identity
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly tenantId?: string;
}

/** Key Vault Key Url to be used for server side encryption of Managed Disks and Snapshots */
export interface KeyForDiskEncryptionSet {
  /** Resource id of the KeyVault containing the key or secret. This property is optional and cannot be used if the KeyVault subscription is not the same as the Disk Encryption Set subscription. */
  sourceVault?: SourceVault;
  /** Fully versioned Key Url pointing to a key in KeyVault */
  keyUrl: string;
}

/** disk encryption set update resource. */
export interface DiskEncryptionSetUpdate {
  /** Resource tags */
  tags?: { [propertyName: string]: string };
  /** The type of key used to encrypt the data of the disk. */
  encryptionType?: DiskEncryptionSetType;
  /** Key Vault Key Url to be used for server side encryption of Managed Disks and Snapshots */
  activeKey?: KeyForDiskEncryptionSet;
}

/** The List disk encryption set operation response. */
export interface DiskEncryptionSetList {
  /** A list of disk encryption sets. */
  value: DiskEncryptionSet[];
  /** The uri to fetch the next page of disk encryption sets. Call ListNext() with this to fetch the next page of disk encryption sets. */
  nextLink?: string;
}

/** The List resources which are encrypted with the disk encryption set. */
export interface ResourceUriList {
  /** A list of IDs or Owner IDs of resources which are encrypted with the disk encryption set. */
  value: string[];
  /** The uri to fetch the next page of encrypted resources. Call ListNext() with this to fetch the next page of encrypted resources. */
  nextLink?: string;
}

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnection {
  /**
   * private endpoint connection Id
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * private endpoint connection name
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * private endpoint connection type
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
  /** The resource of private end point. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between DiskAccess and Virtual Network. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /**
   * The provisioning state of the private endpoint connection resource.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

/** The Private Endpoint resource. */
export interface PrivateEndpoint {
  /**
   * The ARM identifier for Private Endpoint
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
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

/** Used for updating a disk access resource. */
export interface DiskAccessUpdate {
  /** Resource tags */
  tags?: { [propertyName: string]: string };
}

/** The List disk access operation response. */
export interface DiskAccessList {
  /** A list of disk access resources. */
  value: DiskAccess[];
  /** The uri to fetch the next page of disk access resources. Call ListNext() with this to fetch the next page of disk access resources. */
  nextLink?: string;
}

/** A list of private link resources */
export interface PrivateLinkResourceListResult {
  /** Array of private link resources */
  value?: PrivateLinkResource[];
}

/** A private link resource */
export interface PrivateLinkResource {
  /**
   * private link resource Id
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * private link resource name
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * private link resource type
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
  /**
   * The private link resource group id.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly groupId?: string;
  /**
   * The private link resource required member names.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly requiredMembers?: string[];
  /** The private link resource DNS zone name. */
  requiredZoneNames?: string[];
}

/** A list of private link resources */
export interface PrivateEndpointConnectionListResult {
  /** Array of private endpoint connections */
  value?: PrivateEndpointConnection[];
  /** The uri to fetch the next page of snapshots. Call ListNext() with this to fetch the next page of snapshots. */
  nextLink?: string;
}

/** The ProxyOnly Resource model definition. */
export interface ProxyOnlyResource {
  /**
   * Resource Id
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * Resource name
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * Resource type
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
}

/** The List Disk Restore Points operation response. */
export interface DiskRestorePointList {
  /** A list of disk restore points. */
  value: DiskRestorePoint[];
  /** The uri to fetch the next page of disk restore points. Call ListNext() with this to fetch the next page of disk restore points. */
  nextLink?: string;
}

/** Describes the gallery unique name. */
export interface GalleryIdentifier {
  /**
   * The unique name of the Shared Image Gallery. This name is generated automatically by Azure.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly uniqueName?: string;
}

/** The Update Resource model definition. */
export interface UpdateResourceDefinition {
  /**
   * Resource Id
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly id?: string;
  /**
   * Resource name
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * Resource type
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
  /** Resource tags */
  tags?: { [propertyName: string]: string };
}

/** This is the gallery Image Definition identifier. */
export interface GalleryImageIdentifier {
  /** The name of the gallery Image Definition publisher. */
  publisher: string;
  /** The name of the gallery Image Definition offer. */
  offer: string;
  /** The name of the gallery Image Definition SKU. */
  sku: string;
}

/** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
export interface RecommendedMachineConfiguration {
  /** Describes the resource range. */
  vCPUs?: ResourceRange;
  /** Describes the resource range. */
  memory?: ResourceRange;
}

/** Describes the resource range. */
export interface ResourceRange {
  /** The minimum number of the resource. */
  min?: number;
  /** The maximum number of the resource. */
  max?: number;
}

/** Describes the disallowed disk types. */
export interface Disallowed {
  /** A list of disk types. */
  diskTypes?: string[];
}

/** Describes the gallery Image Definition purchase plan. This is used by marketplace images. */
export interface ImagePurchasePlan {
  /** The plan ID. */
  name?: string;
  /** The publisher ID. */
  publisher?: string;
  /** The product ID. */
  product?: string;
}

/** Describes the basic gallery artifact publishing profile. */
export interface GalleryArtifactPublishingProfileBase {
  /** The target regions where the Image Version is going to be replicated to. This property is updatable. */
  targetRegions?: TargetRegion[];
  /** The number of replicas of the Image Version to be created per region. This property would take effect for a region when regionalReplicaCount is not specified. This property is updatable. */
  replicaCount?: number;
  /** If set to true, Virtual Machines deployed from the latest version of the Image Definition won't use this Image Version. */
  excludeFromLatest?: boolean;
  /**
   * The timestamp for when the gallery Image Version is published.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly publishedDate?: Date;
  /** The end of life date of the gallery Image Version. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** Specifies the storage account type to be used to store the image. This property is not updatable. */
  storageAccountType?: StorageAccountType;
}

/** Describes the target region information. */
export interface TargetRegion {
  /** The name of the region. */
  name: string;
  /** The number of replicas of the Image Version to be created per region. This property is updatable. */
  regionalReplicaCount?: number;
  /** Specifies the storage account type to be used to store the image. This property is not updatable. */
  storageAccountType?: StorageAccountType;
  /** Optional. Allows users to provide customer managed keys for encrypting the OS and data disks in the gallery artifact. */
  encryption?: EncryptionImages;
}

/** Optional. Allows users to provide customer managed keys for encrypting the OS and data disks in the gallery artifact. */
export interface EncryptionImages {
  /** Contains encryption settings for an OS disk image. */
  osDiskImage?: OSDiskImageEncryption;
  /** A list of encryption specifications for data disk images. */
  dataDiskImages?: DataDiskImageEncryption[];
}

/** This is the disk image encryption base class. */
export interface DiskImageEncryption {
  /** A relative URI containing the resource ID of the disk encryption set. */
  diskEncryptionSetId?: string;
}

/** This is the storage profile of a Gallery Image Version. */
export interface GalleryImageVersionStorageProfile {
  /** The gallery artifact version source. */
  source?: GalleryArtifactVersionSource;
  /** This is the OS disk image. */
  osDiskImage?: GalleryOSDiskImage;
  /** A list of data disk images. */
  dataDiskImages?: GalleryDataDiskImage[];
}

/** The gallery artifact version source. */
export interface GalleryArtifactVersionSource {
  /** The id of the gallery artifact version source. Can specify a disk uri, snapshot uri, or user image. */
  id?: string;
}

/** This is the disk image base class. */
export interface GalleryDiskImage {
  /**
   * This property indicates the size of the VHD to be created.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly sizeInGB?: number;
  /** The host caching of the disk. Valid values are 'None', 'ReadOnly', and 'ReadWrite' */
  hostCaching?: HostCaching;
  /** The gallery artifact version source. */
  source?: GalleryArtifactVersionSource;
}

/** This is the replication status of the gallery Image Version. */
export interface ReplicationStatus {
  /**
   * This is the aggregated replication status based on all the regional replication status flags.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly aggregatedState?: AggregatedReplicationState;
  /**
   * This is a summary of replication status for each region.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly summary?: RegionalReplicationStatus[];
}

/** This is the regional replication status. */
export interface RegionalReplicationStatus {
  /**
   * The region to which the gallery Image Version is being replicated to.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly region?: string;
  /**
   * This is the regional replication state.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly state?: ReplicationState;
  /**
   * The details of the replication status.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly details?: string;
  /**
   * It indicates progress of the replication job.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly progress?: number;
}

/** The source image from which the Image Version is going to be created. */
export interface UserArtifactSource {
  /** Required. The mediaLink of the artifact, must be a readable storage page blob. */
  mediaLink: string;
  /** Optional. The defaultConfigurationLink of the artifact, must be a readable storage page blob. */
  defaultConfigurationLink?: string;
}

export interface UserArtifactManage {
  /** Required. The path and arguments to install the gallery application. This is limited to 4096 characters. */
  install: string;
  /** Required. The path and arguments to remove the gallery application. This is limited to 4096 characters. */
  remove: string;
  /** Optional. The path and arguments to update the gallery application. If not present, then update operation will invoke remove command on the previous version and install command on the current version of the gallery application. This is limited to 4096 characters. */
  update?: string;
}

/** The List Galleries operation response. */
export interface GalleryList {
  /** A list of galleries. */
  value: Gallery[];
  /** The uri to fetch the next page of galleries. Call ListNext() with this to fetch the next page of galleries. */
  nextLink?: string;
}

/** The List Gallery Images operation response. */
export interface GalleryImageList {
  /** A list of Shared Image Gallery images. */
  value: GalleryImage[];
  /** The uri to fetch the next page of Image Definitions in the Shared Image Gallery. Call ListNext() with this to fetch the next page of gallery Image Definitions. */
  nextLink?: string;
}

/** The List Gallery Image version operation response. */
export interface GalleryImageVersionList {
  /** A list of gallery Image Versions. */
  value: GalleryImageVersion[];
  /** The uri to fetch the next page of gallery Image Versions. Call ListNext() with this to fetch the next page of gallery Image Versions. */
  nextLink?: string;
}

/** The List Gallery Applications operation response. */
export interface GalleryApplicationList {
  /** A list of Gallery Applications. */
  value: GalleryApplication[];
  /** The uri to fetch the next page of Application Definitions in the Application Gallery. Call ListNext() with this to fetch the next page of gallery Application Definitions. */
  nextLink?: string;
}

/** The List Gallery Application version operation response. */
export interface GalleryApplicationVersionList {
  /** A list of gallery Application Versions. */
  value: GalleryApplicationVersion[];
  /** The uri to fetch the next page of gallery Application Versions. Call ListNext() with this to fetch the next page of gallery Application Versions. */
  nextLink?: string;
}

/** The source image from which the Image Version is going to be created. */
export interface GalleryArtifactSource {
  /** The managed artifact. */
  managedImage: ManagedArtifact;
}

/** The managed artifact. */
export interface ManagedArtifact {
  /** The managed artifact id. */
  id: string;
}

export type SubResourceWithColocationStatus = SubResource & {
  /** Describes colocation status of a resource in the Proximity Placement Group. */
  colocationStatus?: InstanceViewStatus;
};

/** Virtual machine image resource information. */
export type VirtualMachineImageResource = SubResource & {
  /** The name of the resource. */
  name: string;
  /** The supported Azure location of the resource. */
  location: string;
  /** Specifies the tags that are assigned to the virtual machine. For more information about using tags, see [Using tags to organize your Azure resources](https://docs.microsoft.com/azure/azure-resource-manager/resource-group-using-tags.md). */
  tags?: { [propertyName: string]: string };
  /** The extended location of the Virtual Machine. */
  extendedLocation?: ExtendedLocation;
};

/** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. NOTE: Image reference publisher and offer can only be set when you create the scale set. */
export type ImageReference = SubResource & {
  /** The image publisher. */
  publisher?: string;
  /** Specifies the offer of the platform image or marketplace image used to create the virtual machine. */
  offer?: string;
  /** The image SKU. */
  sku?: string;
  /** Specifies the version of the platform image or marketplace image used to create the virtual machine. The allowed formats are Major.Minor.Build or 'latest'. Major, Minor, and Build are decimal numbers. Specify 'latest' to use the latest version of an image available at deploy time. Even if you use 'latest', the VM image will not automatically update after deploy time even if a new version becomes available. */
  version?: string;
  /**
   * Specifies in decimal numbers, the version of platform image or marketplace image used to create the virtual machine. This readonly field differs from 'version', only if the value specified in 'version' field is 'latest'.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly exactVersion?: string;
};

/** Describes the parameter of customer managed disk encryption set resource id that can be specified for disk. <br><br> NOTE: The disk encryption set resource id can only be specified for managed disk. Please refer https://aka.ms/mdssewithcmkoverview for more details. */
export type DiskEncryptionSetParameters = SubResource & {};

/** The parameters of a managed disk. */
export type ManagedDiskParameters = SubResource & {
  /** Specifies the storage account type for the managed disk. NOTE: UltraSSD_LRS can only be used with data disks, it cannot be used with OS Disk. */
  storageAccountType?: StorageAccountTypes;
  /** Specifies the customer managed disk encryption set resource id for the managed disk. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
};

/** Describes a network interface reference. */
export type NetworkInterfaceReference = SubResource & {
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
};

/** Describes a virtual machine scale set network profile's IP configuration. */
export type VirtualMachineScaleSetIPConfiguration = SubResource & {
  /** The IP configuration name. */
  name: string;
  /** Specifies the identifier of the subnet. */
  subnet?: ApiEntityReference;
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** The publicIPAddressConfiguration. */
  publicIPAddressConfiguration?: VirtualMachineScaleSetPublicIPAddressConfiguration;
  /** Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. */
  privateIPAddressVersion?: IPVersion;
  /** Specifies an array of references to backend address pools of application gateways. A scale set can reference backend address pools of multiple application gateways. Multiple scale sets cannot use the same application gateway. */
  applicationGatewayBackendAddressPools?: SubResource[];
  /** Specifies an array of references to application security group. */
  applicationSecurityGroups?: SubResource[];
  /** Specifies an array of references to backend address pools of load balancers. A scale set can reference backend address pools of one public and one internal load balancer. Multiple scale sets cannot use the same basic sku load balancer. */
  loadBalancerBackendAddressPools?: SubResource[];
  /** Specifies an array of references to inbound Nat pools of the load balancers. A scale set can reference inbound nat pools of one public and one internal load balancer. Multiple scale sets cannot use the same basic sku load balancer. */
  loadBalancerInboundNatPools?: SubResource[];
};

/** Describes a virtual machine scale set network profile's network configurations. */
export type VirtualMachineScaleSetNetworkConfiguration = SubResource & {
  /** The network configuration name. */
  name: string;
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** Specifies whether the network interface is accelerated networking-enabled. */
  enableAcceleratedNetworking?: boolean;
  /** Specifies whether the network interface is FPGA networking-enabled. */
  enableFpga?: boolean;
  /** The network security group. */
  networkSecurityGroup?: SubResource;
  /** The dns settings to be applied on the network interfaces. */
  dnsSettings?: VirtualMachineScaleSetNetworkConfigurationDnsSettings;
  /** Specifies the IP configurations of the network interface. */
  ipConfigurations?: VirtualMachineScaleSetIPConfiguration[];
  /** Whether IP forwarding enabled on this NIC. */
  enableIPForwarding?: boolean;
};

/** Output of virtual machine capture operation. */
export type VirtualMachineCaptureResult = SubResource & {
  /**
   * the schema of the captured virtual machine
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly schema?: string;
  /**
   * the version of the content
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly contentVersion?: string;
  /**
   * parameters of the captured virtual machine
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly parameters?: any;
  /**
   * a list of resource items of the captured virtual machine
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly resources?: any[];
};

/** Describes a virtual machine scale set network profile's IP configuration. NOTE: The subnet of a scale set may be modified as long as the original subnet and the new subnet are in the same virtual network */
export type VirtualMachineScaleSetUpdateIPConfiguration = SubResource & {
  /** The IP configuration name. */
  name?: string;
  /** The subnet. */
  subnet?: ApiEntityReference;
  /** Specifies the primary IP Configuration in case the network interface has more than one IP Configuration. */
  primary?: boolean;
  /** The publicIPAddressConfiguration. */
  publicIPAddressConfiguration?: VirtualMachineScaleSetUpdatePublicIPAddressConfiguration;
  /** Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. */
  privateIPAddressVersion?: IPVersion;
  /** The application gateway backend address pools. */
  applicationGatewayBackendAddressPools?: SubResource[];
  /** Specifies an array of references to application security group. */
  applicationSecurityGroups?: SubResource[];
  /** The load balancer backend address pools. */
  loadBalancerBackendAddressPools?: SubResource[];
  /** The load balancer inbound nat pools. */
  loadBalancerInboundNatPools?: SubResource[];
};

/** Describes a virtual machine scale set network profile's network configurations. */
export type VirtualMachineScaleSetUpdateNetworkConfiguration = SubResource & {
  /** The network configuration name. */
  name?: string;
  /** Whether this is a primary NIC on a virtual machine. */
  primary?: boolean;
  /** Specifies whether the network interface is accelerated networking-enabled. */
  enableAcceleratedNetworking?: boolean;
  /** Specifies whether the network interface is FPGA networking-enabled. */
  enableFpga?: boolean;
  /** The network security group. */
  networkSecurityGroup?: SubResource;
  /** The dns settings to be applied on the network interfaces. */
  dnsSettings?: VirtualMachineScaleSetNetworkConfigurationDnsSettings;
  /** The virtual machine scale set IP Configuration. */
  ipConfigurations?: VirtualMachineScaleSetUpdateIPConfiguration[];
  /** Whether IP forwarding enabled on this NIC. */
  enableIPForwarding?: boolean;
};

/** Specifies information about the availability set that the virtual machine should be assigned to. Virtual machines specified in the same availability set are allocated to different nodes to maximize availability. For more information about availability sets, see [Manage the availability of virtual machines](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-manage-availability?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json). <br><br> For more information on Azure planned maintenance, see [Planned maintenance for virtual machines in Azure](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-planned-maintenance?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json) <br><br> Currently, a VM can only be added to availability set at creation time. An existing VM cannot be added to an availability set. */
export type AvailabilitySet = Resource & {
  /** Sku of the availability set, only name is required to be set. See AvailabilitySetSkuTypes for possible set of values. Use 'Aligned' for virtual machines with managed disks and 'Classic' for virtual machines with unmanaged disks. Default value is 'Classic'. */
  sku?: Sku;
  /** Update Domain count. */
  platformUpdateDomainCount?: number;
  /** Fault Domain count. */
  platformFaultDomainCount?: number;
  /** A list of references to all virtual machines in the availability set. */
  virtualMachines?: SubResource[];
  /** Specifies information about the proximity placement group that the availability set should be assigned to. <br><br>Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResource;
  /**
   * The resource status information.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly statuses?: InstanceViewStatus[];
};

/** Specifies information about the proximity placement group. */
export type ProximityPlacementGroup = Resource & {
  /** Specifies the type of the proximity placement group. <br><br> Possible values are: <br><br> **Standard** : Co-locate resources within an Azure region or Availability Zone. <br><br> **Ultra** : For future use. */
  proximityPlacementGroupType?: ProximityPlacementGroupType;
  /**
   * A list of references to all virtual machines in the proximity placement group.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly virtualMachines?: SubResourceWithColocationStatus[];
  /**
   * A list of references to all virtual machine scale sets in the proximity placement group.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly virtualMachineScaleSets?: SubResourceWithColocationStatus[];
  /**
   * A list of references to all availability sets in the proximity placement group.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly availabilitySets?: SubResourceWithColocationStatus[];
  /** Describes colocation status of the Proximity Placement Group. */
  colocationStatus?: InstanceViewStatus;
};

/** Specifies information about the dedicated host group that the dedicated hosts should be assigned to. <br><br> Currently, a dedicated host can only be added to a dedicated host group at creation time. An existing dedicated host cannot be added to another dedicated host group. */
export type DedicatedHostGroup = Resource & {
  /** Availability Zone to use for this host group. Only single zone is supported. The zone can be assigned only during creation. If not provided, the group supports all zones in the region. If provided, enforces each host in the group to be in the same zone. */
  zones?: string[];
  /** Number of fault domains that the host group can span. */
  platformFaultDomainCount?: number;
  /**
   * A list of references to all dedicated hosts in the dedicated host group.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly hosts?: SubResourceReadOnly[];
  /**
   * The dedicated host group instance view, which has the list of instance view of the dedicated hosts under the dedicated host group.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly instanceView?: DedicatedHostGroupInstanceView;
  /** Specifies whether virtual machines or virtual machine scale sets can be placed automatically on the dedicated host group. Automatic placement means resources are allocated on dedicated hosts, that are chosen by Azure, under the dedicated host group. The value is defaulted to 'false' when not provided. <br><br>Minimum api-version: 2020-06-01. */
  supportAutomaticPlacement?: boolean;
};

/** Specifies information about the Dedicated host. */
export type DedicatedHost = Resource & {
  /** SKU of the dedicated host for Hardware Generation and VM family. Only name is required to be set. List Microsoft.Compute SKUs for a list of possible values. */
  sku: Sku;
  /** Fault domain of the dedicated host within a dedicated host group. */
  platformFaultDomain?: number;
  /** Specifies whether the dedicated host should be replaced automatically in case of a failure. The value is defaulted to 'true' when not provided. */
  autoReplaceOnFailure?: boolean;
  /**
   * A unique id generated and assigned to the dedicated host by the platform. <br><br> Does not change throughout the lifetime of the host.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly hostId?: string;
  /**
   * A list of references to all virtual machines in the Dedicated Host.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly virtualMachines?: SubResourceReadOnly[];
  /** Specifies the software license type that will be applied to the VMs deployed on the dedicated host. <br><br> Possible values are: <br><br> **None** <br><br> **Windows_Server_Hybrid** <br><br> **Windows_Server_Perpetual** <br><br> Default: **None** */
  licenseType?: DedicatedHostLicenseTypes;
  /**
   * The date when the host was first provisioned.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningTime?: Date;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /**
   * The dedicated host instance view.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly instanceView?: DedicatedHostInstanceView;
};

/** Specifies information about the SSH public key. */
export type SshPublicKeyResource = Resource & {
  /** SSH public key used to authenticate to a virtual machine through ssh. If this property is not initially provided when the resource is created, the publicKey property will be populated when generateKeyPair is called. If the public key is provided upon resource creation, the provided public key needs to be at least 2048-bit and in ssh-rsa format. */
  publicKey?: string;
};

/** Describes a Virtual Machine Extension Image. */
export type VirtualMachineExtensionImage = Resource & {
  /** The operating system this extension supports. */
  operatingSystem?: string;
  /** The type of role (IaaS or PaaS) this extension supports. */
  computeRole?: string;
  /** The schema defined by publisher, where extension consumers should provide settings in a matching schema. */
  handlerSchema?: string;
  /** Whether the extension can be used on xRP VMScaleSets. By default existing extensions are usable on scalesets, but there might be cases where a publisher wants to explicitly indicate the extension is only enabled for CRP VMs but not VMSS. */
  vmScaleSetEnabled?: boolean;
  /** Whether the handler can support multiple extensions. */
  supportsMultipleExtensions?: boolean;
};

/** Describes a Virtual Machine Extension. */
export type VirtualMachineExtension = Resource & {
  /** How the extension handler should be forced to update even if the extension configuration has not changed. */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  typePropertiesType?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available. */
  enableAutomaticUpgrade?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: any;
  /** The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all. */
  protectedSettings?: any;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /** The virtual machine extension instance view. */
  instanceView?: VirtualMachineExtensionInstanceView;
};

/** Describes a Virtual Machine. */
export type VirtualMachine = Resource & {
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: Plan;
  /**
   * The virtual machine child extension resources.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly resources?: VirtualMachineExtension[];
  /** The identity of the virtual machine, if configured. */
  identity?: VirtualMachineIdentity;
  /** The virtual machine zones. */
  zones?: string[];
  /** The extended location of the Virtual Machine. */
  extendedLocation?: ExtendedLocation;
  /** Specifies the hardware settings for the virtual machine. */
  hardwareProfile?: HardwareProfile;
  /** Specifies the storage settings for the virtual machine disks. */
  storageProfile?: StorageProfile;
  /** Specifies additional capabilities enabled or disabled on the virtual machine. */
  additionalCapabilities?: AdditionalCapabilities;
  /** Specifies the operating system settings used while creating the virtual machine. Some of the settings cannot be changed once VM is provisioned. */
  osProfile?: OSProfile;
  /** Specifies the network interfaces of the virtual machine. */
  networkProfile?: NetworkProfile;
  /** Specifies the Security related profile settings for the virtual machine. */
  securityProfile?: SecurityProfile;
  /** Specifies the boot diagnostic settings state. <br><br>Minimum api-version: 2015-06-15. */
  diagnosticsProfile?: DiagnosticsProfile;
  /** Specifies information about the availability set that the virtual machine should be assigned to. Virtual machines specified in the same availability set are allocated to different nodes to maximize availability. For more information about availability sets, see [Manage the availability of virtual machines](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-manage-availability?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json). <br><br> For more information on Azure planned maintenance, see [Planned maintenance for virtual machines in Azure](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-planned-maintenance?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json) <br><br> Currently, a VM can only be added to availability set at creation time. The availability set to which the VM is being added should be under the same resource group as the availability set resource. An existing VM cannot be added to an availability set. <br><br>This property cannot exist along with a non-null properties.virtualMachineScaleSet reference. */
  availabilitySet?: SubResource;
  /** Specifies information about the virtual machine scale set that the virtual machine should be assigned to. Virtual machines specified in the same virtual machine scale set are allocated to different nodes to maximize availability. Currently, a VM can only be added to virtual machine scale set at creation time. An existing VM cannot be added to a virtual machine scale set. <br><br>This property cannot exist along with a non-null properties.availabilitySet reference. <br><br>Minimum api‐version: 2019‐03‐01 */
  virtualMachineScaleSet?: SubResource;
  /** Specifies information about the proximity placement group that the virtual machine should be assigned to. <br><br>Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResource;
  /** Specifies the priority for the virtual machine. <br><br>Minimum api-version: 2019-03-01 */
  priority?: VirtualMachinePriorityTypes;
  /** Specifies the eviction policy for the Azure Spot virtual machine and Azure Spot scale set. <br><br>For Azure Spot virtual machines, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2019-03-01. <br><br>For Azure Spot scale sets, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2017-10-30-preview. */
  evictionPolicy?: VirtualMachineEvictionPolicyTypes;
  /** Specifies the billing related details of a Azure Spot virtual machine. <br><br>Minimum api-version: 2019-03-01. */
  billingProfile?: BillingProfile;
  /** Specifies information about the dedicated host that the virtual machine resides in. <br><br>Minimum api-version: 2018-10-01. */
  host?: SubResource;
  /** Specifies information about the dedicated host group that the virtual machine resides in. <br><br>Minimum api-version: 2020-06-01. <br><br>NOTE: User cannot specify both host and hostGroup properties. */
  hostGroup?: SubResource;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /**
   * The virtual machine instance view.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly instanceView?: VirtualMachineInstanceView;
  /** Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 */
  licenseType?: string;
  /**
   * Specifies the VM unique ID which is a 128-bits identifier that is encoded and stored in all Azure IaaS VMs SMBIOS and can be read using platform BIOS commands.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly vmId?: string;
  /** Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). <br><br> Minimum api-version: 2020-06-01 */
  extensionsTimeBudget?: string;
  /** Specifies the scale set logical fault domain into which the Virtual Machine will be created. By default, the Virtual Machine will by automatically assigned to a fault domain that best maintains balance across available fault domains.<br><li>This is applicable only if the 'virtualMachineScaleSet' property of this Virtual Machine is set.<li>The Virtual Machine Scale Set that is referenced, must have 'platformFaultDomainCount' &gt; 1.<li>This property cannot be updated once the Virtual Machine is created.<li>Fault domain assignment can be viewed in the Virtual Machine Instance View.<br><br>Minimum api‐version: 2020‐12‐01 */
  platformFaultDomain?: number;
};

/** Describes a Virtual Machine Scale Set. */
export type VirtualMachineScaleSet = Resource & {
  /** The virtual machine scale set sku. */
  sku?: Sku;
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: Plan;
  /** The identity of the virtual machine scale set, if configured. */
  identity?: VirtualMachineScaleSetIdentity;
  /** The virtual machine scale set zones. NOTE: Availability zones can only be set when you create the scale set */
  zones?: string[];
  /** The extended location of the Virtual Machine Scale Set. */
  extendedLocation?: ExtendedLocation;
  /** The upgrade policy. */
  upgradePolicy?: UpgradePolicy;
  /** Policy for automatic repairs. */
  automaticRepairsPolicy?: AutomaticRepairsPolicy;
  /** The virtual machine profile. */
  virtualMachineProfile?: VirtualMachineScaleSetVMProfile;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /** Specifies whether the Virtual Machine Scale Set should be overprovisioned. */
  overprovision?: boolean;
  /** When Overprovision is enabled, extensions are launched only on the requested number of VMs which are finally kept. This property will hence ensure that the extensions do not run on the extra overprovisioned VMs. */
  doNotRunExtensionsOnOverprovisionedVMs?: boolean;
  /**
   * Specifies the ID which uniquely identifies a Virtual Machine Scale Set.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly uniqueId?: string;
  /** When true this limits the scale set to a single placement group, of max size 100 virtual machines. NOTE: If singlePlacementGroup is true, it may be modified to false. However, if singlePlacementGroup is false, it may not be modified to true. */
  singlePlacementGroup?: boolean;
  /** Whether to force strictly even Virtual Machine distribution cross x-zones in case there is zone outage. */
  zoneBalance?: boolean;
  /** Fault Domain count for each placement group. */
  platformFaultDomainCount?: number;
  /** Specifies information about the proximity placement group that the virtual machine scale set should be assigned to. <br><br>Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResource;
  /** Specifies information about the dedicated host group that the virtual machine scale set resides in. <br><br>Minimum api-version: 2020-06-01. */
  hostGroup?: SubResource;
  /** Specifies additional capabilities enabled or disabled on the Virtual Machines in the Virtual Machine Scale Set. For instance: whether the Virtual Machines have the capability to support attaching managed data disks with UltraSSD_LRS storage account type. */
  additionalCapabilities?: AdditionalCapabilities;
  /** Specifies the scale-in policy that decides which virtual machines are chosen for removal when a Virtual Machine Scale Set is scaled-in. */
  scaleInPolicy?: ScaleInPolicy;
  /** Specifies the orchestration mode for the virtual machine scale set. */
  orchestrationMode?: OrchestrationMode;
};

/** The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. */
export type Image = Resource & {
  /** The extended location of the Image. */
  extendedLocation?: ExtendedLocation;
  /** The source virtual machine from which Image is created. */
  sourceVirtualMachine?: SubResource;
  /** Specifies the storage settings for the virtual machine disks. */
  storageProfile?: ImageStorageProfile;
  /**
   * The provisioning state.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /** Gets the HyperVGenerationType of the VirtualMachine created from the image */
  hyperVGeneration?: HyperVGenerationTypes;
};

/** The status of the latest virtual machine scale set rolling upgrade. */
export type RollingUpgradeStatusInfo = Resource & {
  /**
   * The rolling upgrade policies applied for this upgrade.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly policy?: RollingUpgradePolicy;
  /**
   * Information about the current running state of the overall upgrade.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly runningStatus?: RollingUpgradeRunningStatus;
  /**
   * Information about the number of virtual machine instances in each upgrade state.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly progress?: RollingUpgradeProgressInfo;
  /**
   * Error details for this upgrade, if there are any.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly error?: ApiError;
};

/** Describes a virtual machine scale set virtual machine. */
export type VirtualMachineScaleSetVM = Resource & {
  /**
   * The virtual machine instance ID.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly instanceId?: string;
  /**
   * The virtual machine SKU.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly sku?: Sku;
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: Plan;
  /**
   * The virtual machine child extension resources.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly resources?: VirtualMachineExtension[];
  /**
   * The virtual machine zones.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly zones?: string[];
  /**
   * Specifies whether the latest model has been applied to the virtual machine.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly latestModelApplied?: boolean;
  /**
   * Azure VM unique ID.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly vmId?: string;
  /**
   * The virtual machine instance view.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly instanceView?: VirtualMachineScaleSetVMInstanceView;
  /** Specifies the hardware settings for the virtual machine. */
  hardwareProfile?: HardwareProfile;
  /** Specifies the storage settings for the virtual machine disks. */
  storageProfile?: StorageProfile;
  /** Specifies additional capabilities enabled or disabled on the virtual machine in the scale set. For instance: whether the virtual machine has the capability to support attaching managed data disks with UltraSSD_LRS storage account type. */
  additionalCapabilities?: AdditionalCapabilities;
  /** Specifies the operating system settings for the virtual machine. */
  osProfile?: OSProfile;
  /** Specifies the Security related profile settings for the virtual machine. */
  securityProfile?: SecurityProfile;
  /** Specifies the network interfaces of the virtual machine. */
  networkProfile?: NetworkProfile;
  /** Specifies the network profile configuration of the virtual machine. */
  networkProfileConfiguration?: VirtualMachineScaleSetVMNetworkProfileConfiguration;
  /** Specifies the boot diagnostic settings state. <br><br>Minimum api-version: 2015-06-15. */
  diagnosticsProfile?: DiagnosticsProfile;
  /** Specifies information about the availability set that the virtual machine should be assigned to. Virtual machines specified in the same availability set are allocated to different nodes to maximize availability. For more information about availability sets, see [Manage the availability of virtual machines](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-manage-availability?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json). <br><br> For more information on Azure planned maintenance, see [Planned maintenance for virtual machines in Azure](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-planned-maintenance?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json) <br><br> Currently, a VM can only be added to availability set at creation time. An existing VM cannot be added to an availability set. */
  availabilitySet?: SubResource;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /** Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 */
  licenseType?: string;
  /**
   * Specifies whether the model applied to the virtual machine is the model of the virtual machine scale set or the customized model for the virtual machine.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly modelDefinitionApplied?: string;
  /** Specifies the protection policy of the virtual machine. */
  protectionPolicy?: VirtualMachineScaleSetVMProtectionPolicy;
};

/** Describes a Virtual Machine run command. */
export type VirtualMachineRunCommand = Resource & {
  /** The source of the run command script. */
  source?: VirtualMachineRunCommandScriptSource;
  /** The parameters used by the script. */
  parameters?: RunCommandInputParameter[];
  /** The parameters used by the script. */
  protectedParameters?: RunCommandInputParameter[];
  /** Optional. If set to true, provisioning will complete as soon as the script starts and will not wait for script to complete. */
  asyncExecution?: boolean;
  /** Specifies the user account on the VM when executing the run command. */
  runAsUser?: string;
  /** Specifies the user account password on the VM when executing the run command. */
  runAsPassword?: string;
  /** The timeout in seconds to execute the run command. */
  timeoutInSeconds?: number;
  /** Specifies the Azure storage blob where script output stream will be uploaded. */
  outputBlobUri?: string;
  /** Specifies the Azure storage blob where script error stream will be uploaded. */
  errorBlobUri?: string;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /**
   * The virtual machine run command instance view.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly instanceView?: VirtualMachineRunCommandInstanceView;
};

/** Disk resource. */
export type Disk = Resource & {
  /**
   * A relative URI containing the ID of the VM that has the disk attached.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly managedBy?: string;
  /**
   * List of relative URIs containing the IDs of the VMs that have the disk attached. maxShares should be set to a value greater than one for disks to allow attaching them to multiple VMs.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly managedByExtended?: string[];
  /** The disks sku name. Can be Standard_LRS, Premium_LRS, StandardSSD_LRS, or UltraSSD_LRS. */
  sku?: DiskSku;
  /** The Logical zone list for Disk. */
  zones?: string[];
  /** The extended location where the disk will be created. Extended location cannot be changed. */
  extendedLocation?: ExtendedLocation;
  /**
   * The time when the disk was created.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly timeCreated?: Date;
  /** The Operating System type. */
  osType?: OperatingSystemTypes;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** Purchase plan information for the the image from which the OS disk was created. E.g. - {name: 2019-Datacenter, publisher: MicrosoftWindowsServer, product: WindowsServer} */
  purchasePlan?: PurchasePlanAutoGenerated;
  /** Disk source information. CreationData information cannot be changed after the disk has been created. */
  creationData?: CreationData;
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /**
   * The size of the disk in bytes. This field is read only.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly diskSizeBytes?: number;
  /**
   * Unique Guid identifying the resource.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly uniqueId?: string;
  /** Encryption settings collection used for Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollection;
  /**
   * The disk provisioning state.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /** The number of IOPS allowed for this disk; only settable for UltraSSD disks. One operation can transfer between 4k and 256k bytes. */
  diskIopsReadWrite?: number;
  /** The bandwidth allowed for this disk; only settable for UltraSSD disks. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadWrite?: number;
  /** The total number of IOPS that will be allowed across all VMs mounting the shared disk as ReadOnly. One operation can transfer between 4k and 256k bytes. */
  diskIopsReadOnly?: number;
  /** The total throughput (MBps) that will be allowed across all VMs mounting the shared disk as ReadOnly. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadOnly?: number;
  /**
   * The state of the disk.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly diskState?: DiskState;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: Encryption;
  /** The maximum number of VMs that can attach to the disk at the same time. Value greater than one indicates a disk that can be mounted on multiple VMs at the same time. */
  maxShares?: number;
  /**
   * Details of the list of all VMs that have the disk attached. maxShares should be set to a value greater than one for disks to allow attaching them to multiple VMs.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly shareInfo?: ShareInfoElement[];
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: NetworkAccessPolicy;
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Performance tier of the disk (e.g, P4, S10) as described here: https://azure.microsoft.com/en-us/pricing/details/managed-disks/. Does not apply to Ultra disks. */
  tier?: string;
  /** Set to true to enable bursting beyond the provisioned performance target of the disk. Bursting is disabled by default. Does not apply to Ultra disks. */
  burstingEnabled?: boolean;
};

/** Snapshot resource. */
export type Snapshot = Resource & {
  /**
   * Unused. Always Null.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly managedBy?: string;
  /** The snapshots sku name. Can be Standard_LRS, Premium_LRS, or Standard_ZRS. This is an optional parameter for incremental snapshot and the default behavior is the SKU will be set to the same sku as the previous snapshot */
  sku?: SnapshotSku;
  /** The extended location where the snapshot will be created. Extended location cannot be changed. */
  extendedLocation?: ExtendedLocation;
  /**
   * The time when the snapshot was created.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly timeCreated?: Date;
  /** The Operating System type. */
  osType?: OperatingSystemTypes;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** Purchase plan information for the image from which the source disk for the snapshot was originally created. */
  purchasePlan?: PurchasePlanAutoGenerated;
  /** Disk source information. CreationData information cannot be changed after the disk has been created. */
  creationData?: CreationData;
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /**
   * The size of the disk in bytes. This field is read only.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly diskSizeBytes?: number;
  /**
   * The state of the snapshot.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly diskState?: DiskState;
  /**
   * Unique Guid identifying the resource.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly uniqueId?: string;
  /** Encryption settings collection used be Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollection;
  /**
   * The disk provisioning state.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /** Whether a snapshot is incremental. Incremental snapshots on the same disk occupy less space than full snapshots and can be diffed. */
  incremental?: boolean;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: Encryption;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: NetworkAccessPolicy;
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
};

/** disk encryption set resource. */
export type DiskEncryptionSet = Resource & {
  /** The managed identity for the disk encryption set. It should be given permission on the key vault before it can be used to encrypt disks. */
  identity?: EncryptionSetIdentity;
  /** The type of key used to encrypt the data of the disk. */
  encryptionType?: DiskEncryptionSetType;
  /** The key vault key which is currently used by this disk encryption set. */
  activeKey?: KeyForDiskEncryptionSet;
  /**
   * A readonly collection of key vault keys previously used by this disk encryption set while a key rotation is in progress. It will be empty if there is no ongoing key rotation.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly previousKeys?: KeyForDiskEncryptionSet[];
  /**
   * The disk encryption set provisioning state.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
};

/** disk access resource. */
export type DiskAccess = Resource & {
  /**
   * A readonly collection of private endpoint connections created on the disk. Currently only one endpoint connection is supported.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /**
   * The disk access resource provisioning state.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /**
   * The time when the disk access was created.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly timeCreated?: Date;
};

/** Specifies information about the Shared Image Gallery that you want to create or update. */
export type Gallery = Resource & {
  /** The description of this Shared Image Gallery resource. This property is updatable. */
  description?: string;
  /** Describes the gallery unique name. */
  identifier?: GalleryIdentifier;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: GalleryPropertiesProvisioningState;
};

/** Specifies information about the gallery Image Definition that you want to create or update. */
export type GalleryImage = Resource & {
  /** The description of this gallery Image Definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement for the gallery Image Definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** This property allows you to specify the type of the OS that is included in the disk when creating a VM from a managed image. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  osType?: OperatingSystemTypes;
  /** This property allows the user to specify whether the virtual machines created under this image are 'Generalized' or 'Specialized'. */
  osState?: OperatingSystemStateTypes;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** The end of life date of the gallery Image Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This is the gallery Image Definition identifier. */
  identifier?: GalleryImageIdentifier;
  /** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
  recommended?: RecommendedMachineConfiguration;
  /** Describes the disallowed disk types. */
  disallowed?: Disallowed;
  /** Describes the gallery Image Definition purchase plan. This is used by marketplace images. */
  purchasePlan?: ImagePurchasePlan;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: GalleryImagePropertiesProvisioningState;
};

/** Specifies information about the gallery Image Version that you want to create or update. */
export type GalleryImageVersion = Resource & {
  /** The publishing profile of a gallery Image Version. */
  publishingProfile?: GalleryImageVersionPublishingProfile;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: GalleryImageVersionPropertiesProvisioningState;
  /** This is the storage profile of a Gallery Image Version. */
  storageProfile?: GalleryImageVersionStorageProfile;
  /**
   * This is the replication status of the gallery Image Version.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly replicationStatus?: ReplicationStatus;
};

/** Specifies information about the gallery Application Definition that you want to create or update. */
export type GalleryApplication = Resource & {
  /** The description of this gallery Application Definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement for the gallery Application Definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** The end of life date of the gallery Application Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This property allows you to specify the supported type of the OS that application is built for. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  supportedOSType?: OperatingSystemTypes;
};

/** Specifies information about the gallery Application Version that you want to create or update. */
export type GalleryApplicationVersion = Resource & {
  /** The publishing profile of a gallery image version. */
  publishingProfile?: GalleryApplicationVersionPublishingProfile;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: GalleryApplicationVersionPropertiesProvisioningState;
  /**
   * This is the replication status of the gallery Image Version.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly replicationStatus?: ReplicationStatus;
};

/** Specifies information about the availability set that the virtual machine should be assigned to. Only tags may be updated. */
export type AvailabilitySetUpdate = UpdateResource & {
  /** Sku of the availability set */
  sku?: Sku;
  /** Update Domain count. */
  platformUpdateDomainCount?: number;
  /** Fault Domain count. */
  platformFaultDomainCount?: number;
  /** A list of references to all virtual machines in the availability set. */
  virtualMachines?: SubResource[];
  /** Specifies information about the proximity placement group that the availability set should be assigned to. <br><br>Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResource;
  /**
   * The resource status information.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly statuses?: InstanceViewStatus[];
};

/** Specifies information about the proximity placement group. */
export type ProximityPlacementGroupUpdate = UpdateResource & {};

/** Specifies information about the dedicated host group that the dedicated host should be assigned to. Only tags may be updated. */
export type DedicatedHostGroupUpdate = UpdateResource & {
  /** Availability Zone to use for this host group. Only single zone is supported. The zone can be assigned only during creation. If not provided, the group supports all zones in the region. If provided, enforces each host in the group to be in the same zone. */
  zones?: string[];
  /** Number of fault domains that the host group can span. */
  platformFaultDomainCount?: number;
  /**
   * A list of references to all dedicated hosts in the dedicated host group.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly hosts?: SubResourceReadOnly[];
  /**
   * The dedicated host group instance view, which has the list of instance view of the dedicated hosts under the dedicated host group.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly instanceView?: DedicatedHostGroupInstanceView;
  /** Specifies whether virtual machines or virtual machine scale sets can be placed automatically on the dedicated host group. Automatic placement means resources are allocated on dedicated hosts, that are chosen by Azure, under the dedicated host group. The value is defaulted to 'false' when not provided. <br><br>Minimum api-version: 2020-06-01. */
  supportAutomaticPlacement?: boolean;
};

/** Specifies information about the dedicated host. Only tags, autoReplaceOnFailure and licenseType may be updated. */
export type DedicatedHostUpdate = UpdateResource & {
  /** Fault domain of the dedicated host within a dedicated host group. */
  platformFaultDomain?: number;
  /** Specifies whether the dedicated host should be replaced automatically in case of a failure. The value is defaulted to 'true' when not provided. */
  autoReplaceOnFailure?: boolean;
  /**
   * A unique id generated and assigned to the dedicated host by the platform. <br><br> Does not change throughout the lifetime of the host.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly hostId?: string;
  /**
   * A list of references to all virtual machines in the Dedicated Host.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly virtualMachines?: SubResourceReadOnly[];
  /** Specifies the software license type that will be applied to the VMs deployed on the dedicated host. <br><br> Possible values are: <br><br> **None** <br><br> **Windows_Server_Hybrid** <br><br> **Windows_Server_Perpetual** <br><br> Default: **None** */
  licenseType?: DedicatedHostLicenseTypes;
  /**
   * The date when the host was first provisioned.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningTime?: Date;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /**
   * The dedicated host instance view.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly instanceView?: DedicatedHostInstanceView;
};

/** Specifies information about the SSH public key. */
export type SshPublicKeyUpdateResource = UpdateResource & {
  /** SSH public key used to authenticate to a virtual machine through ssh. If this property is not initially provided when the resource is created, the publicKey property will be populated when generateKeyPair is called. If the public key is provided upon resource creation, the provided public key needs to be at least 2048-bit and in ssh-rsa format. */
  publicKey?: string;
};

/** Describes a Virtual Machine Extension. */
export type VirtualMachineExtensionUpdate = UpdateResource & {
  /** How the extension handler should be forced to update even if the extension configuration has not changed. */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  type?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available. */
  enableAutomaticUpgrade?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: any;
  /** The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all. */
  protectedSettings?: any;
};

/** The source user image virtual hard disk. Only tags may be updated. */
export type ImageUpdate = UpdateResource & {
  /** The source virtual machine from which Image is created. */
  sourceVirtualMachine?: SubResource;
  /** Specifies the storage settings for the virtual machine disks. */
  storageProfile?: ImageStorageProfile;
  /**
   * The provisioning state.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /** Gets the HyperVGenerationType of the VirtualMachine created from the image */
  hyperVGeneration?: HyperVGenerationTypes;
};

/** Describes a Virtual Machine Update. */
export type VirtualMachineUpdate = UpdateResource & {
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: Plan;
  /** The identity of the virtual machine, if configured. */
  identity?: VirtualMachineIdentity;
  /** The virtual machine zones. */
  zones?: string[];
  /** Specifies the hardware settings for the virtual machine. */
  hardwareProfile?: HardwareProfile;
  /** Specifies the storage settings for the virtual machine disks. */
  storageProfile?: StorageProfile;
  /** Specifies additional capabilities enabled or disabled on the virtual machine. */
  additionalCapabilities?: AdditionalCapabilities;
  /** Specifies the operating system settings used while creating the virtual machine. Some of the settings cannot be changed once VM is provisioned. */
  osProfile?: OSProfile;
  /** Specifies the network interfaces of the virtual machine. */
  networkProfile?: NetworkProfile;
  /** Specifies the Security related profile settings for the virtual machine. */
  securityProfile?: SecurityProfile;
  /** Specifies the boot diagnostic settings state. <br><br>Minimum api-version: 2015-06-15. */
  diagnosticsProfile?: DiagnosticsProfile;
  /** Specifies information about the availability set that the virtual machine should be assigned to. Virtual machines specified in the same availability set are allocated to different nodes to maximize availability. For more information about availability sets, see [Manage the availability of virtual machines](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-manage-availability?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json). <br><br> For more information on Azure planned maintenance, see [Planned maintenance for virtual machines in Azure](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-windows-planned-maintenance?toc=%2fazure%2fvirtual-machines%2fwindows%2ftoc.json) <br><br> Currently, a VM can only be added to availability set at creation time. The availability set to which the VM is being added should be under the same resource group as the availability set resource. An existing VM cannot be added to an availability set. <br><br>This property cannot exist along with a non-null properties.virtualMachineScaleSet reference. */
  availabilitySet?: SubResource;
  /** Specifies information about the virtual machine scale set that the virtual machine should be assigned to. Virtual machines specified in the same virtual machine scale set are allocated to different nodes to maximize availability. Currently, a VM can only be added to virtual machine scale set at creation time. An existing VM cannot be added to a virtual machine scale set. <br><br>This property cannot exist along with a non-null properties.availabilitySet reference. <br><br>Minimum api‐version: 2019‐03‐01 */
  virtualMachineScaleSet?: SubResource;
  /** Specifies information about the proximity placement group that the virtual machine should be assigned to. <br><br>Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResource;
  /** Specifies the priority for the virtual machine. <br><br>Minimum api-version: 2019-03-01 */
  priority?: VirtualMachinePriorityTypes;
  /** Specifies the eviction policy for the Azure Spot virtual machine and Azure Spot scale set. <br><br>For Azure Spot virtual machines, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2019-03-01. <br><br>For Azure Spot scale sets, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2017-10-30-preview. */
  evictionPolicy?: VirtualMachineEvictionPolicyTypes;
  /** Specifies the billing related details of a Azure Spot virtual machine. <br><br>Minimum api-version: 2019-03-01. */
  billingProfile?: BillingProfile;
  /** Specifies information about the dedicated host that the virtual machine resides in. <br><br>Minimum api-version: 2018-10-01. */
  host?: SubResource;
  /** Specifies information about the dedicated host group that the virtual machine resides in. <br><br>Minimum api-version: 2020-06-01. <br><br>NOTE: User cannot specify both host and hostGroup properties. */
  hostGroup?: SubResource;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /**
   * The virtual machine instance view.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly instanceView?: VirtualMachineInstanceView;
  /** Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 */
  licenseType?: string;
  /**
   * Specifies the VM unique ID which is a 128-bits identifier that is encoded and stored in all Azure IaaS VMs SMBIOS and can be read using platform BIOS commands.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly vmId?: string;
  /** Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). <br><br> Minimum api-version: 2020-06-01 */
  extensionsTimeBudget?: string;
  /** Specifies the scale set logical fault domain into which the Virtual Machine will be created. By default, the Virtual Machine will by automatically assigned to a fault domain that best maintains balance across available fault domains.<br><li>This is applicable only if the 'virtualMachineScaleSet' property of this Virtual Machine is set.<li>The Virtual Machine Scale Set that is referenced, must have 'platformFaultDomainCount' &gt; 1.<li>This property cannot be updated once the Virtual Machine is created.<li>Fault domain assignment can be viewed in the Virtual Machine Instance View.<br><br>Minimum api‐version: 2020‐12‐01 */
  platformFaultDomain?: number;
};

/** Describes a Virtual Machine Scale Set. */
export type VirtualMachineScaleSetUpdate = UpdateResource & {
  /** The virtual machine scale set sku. */
  sku?: Sku;
  /** The purchase plan when deploying a virtual machine scale set from VM Marketplace images. */
  plan?: Plan;
  /** The identity of the virtual machine scale set, if configured. */
  identity?: VirtualMachineScaleSetIdentity;
  /** The upgrade policy. */
  upgradePolicy?: UpgradePolicy;
  /** Policy for automatic repairs. */
  automaticRepairsPolicy?: AutomaticRepairsPolicy;
  /** The virtual machine profile. */
  virtualMachineProfile?: VirtualMachineScaleSetUpdateVMProfile;
  /** Specifies whether the Virtual Machine Scale Set should be overprovisioned. */
  overprovision?: boolean;
  /** When Overprovision is enabled, extensions are launched only on the requested number of VMs which are finally kept. This property will hence ensure that the extensions do not run on the extra overprovisioned VMs. */
  doNotRunExtensionsOnOverprovisionedVMs?: boolean;
  /** When true this limits the scale set to a single placement group, of max size 100 virtual machines. NOTE: If singlePlacementGroup is true, it may be modified to false. However, if singlePlacementGroup is false, it may not be modified to true. */
  singlePlacementGroup?: boolean;
  /** Specifies additional capabilities enabled or disabled on the Virtual Machines in the Virtual Machine Scale Set. For instance: whether the Virtual Machines have the capability to support attaching managed data disks with UltraSSD_LRS storage account type. */
  additionalCapabilities?: AdditionalCapabilities;
  /** Specifies the scale-in policy that decides which virtual machines are chosen for removal when a Virtual Machine Scale Set is scaled-in. */
  scaleInPolicy?: ScaleInPolicy;
  /** Specifies information about the proximity placement group that the virtual machine scale set should be assigned to. <br><br>Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResource;
};

/** Describes a Virtual Machine run command. */
export type VirtualMachineRunCommandUpdate = UpdateResource & {
  /** The source of the run command script. */
  source?: VirtualMachineRunCommandScriptSource;
  /** The parameters used by the script. */
  parameters?: RunCommandInputParameter[];
  /** The parameters used by the script. */
  protectedParameters?: RunCommandInputParameter[];
  /** Optional. If set to true, provisioning will complete as soon as the script starts and will not wait for script to complete. */
  asyncExecution?: boolean;
  /** Specifies the user account on the VM when executing the run command. */
  runAsUser?: string;
  /** Specifies the user account password on the VM when executing the run command. */
  runAsPassword?: string;
  /** The timeout in seconds to execute the run command. */
  timeoutInSeconds?: number;
  /** Specifies the Azure storage blob where script output stream will be uploaded. */
  outputBlobUri?: string;
  /** Specifies the Azure storage blob where script error stream will be uploaded. */
  errorBlobUri?: string;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /**
   * The virtual machine run command instance view.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly instanceView?: VirtualMachineRunCommandInstanceView;
};

/** Describes a Virtual Machine Scale Set Extension. */
export type VirtualMachineScaleSetExtension = SubResourceReadOnly & {
  /** The name of the extension. */
  name?: string;
  /**
   * Resource type
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
  /** If a value is provided and is different from the previous value, the extension handler will be forced to update even if the extension configuration has not changed. */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  typePropertiesType?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available. */
  enableAutomaticUpgrade?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: any;
  /** The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all. */
  protectedSettings?: any;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /** Collection of extension names after which this extension needs to be provisioned. */
  provisionAfterExtensions?: string[];
};

/** Describes a Virtual Machine Scale Set Extension. */
export type VirtualMachineScaleSetExtensionUpdate = SubResourceReadOnly & {
  /**
   * The name of the extension.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * Resource type
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
  /** If a value is provided and is different from the previous value, the extension handler will be forced to update even if the extension configuration has not changed. */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  typePropertiesType?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available. */
  enableAutomaticUpgrade?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: any;
  /** The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all. */
  protectedSettings?: any;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /** Collection of extension names after which this extension needs to be provisioned. */
  provisionAfterExtensions?: string[];
};

/** Describes a VMSS VM Extension. */
export type VirtualMachineScaleSetVMExtension = SubResourceReadOnly & {
  /**
   * The name of the extension.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * Resource type
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
  /** How the extension handler should be forced to update even if the extension configuration has not changed. */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  typePropertiesType?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available. */
  enableAutomaticUpgrade?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: any;
  /** The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all. */
  protectedSettings?: any;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: string;
  /** The virtual machine extension instance view. */
  instanceView?: VirtualMachineExtensionInstanceView;
};

/** Describes a VMSS VM Extension. */
export type VirtualMachineScaleSetVMExtensionUpdate = SubResourceReadOnly & {
  /**
   * The name of the extension.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
  /**
   * Resource type
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly type?: string;
  /** How the extension handler should be forced to update even if the extension configuration has not changed. */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  typePropertiesType?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available. */
  enableAutomaticUpgrade?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: any;
  /** The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all. */
  protectedSettings?: any;
};

/** The instance view of a dedicated host that includes the name of the dedicated host. It is used for the response to the instance view of a dedicated host group. */
export type DedicatedHostInstanceViewWithName = DedicatedHostInstanceView & {
  /**
   * The name of the dedicated host.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly name?: string;
};

/** Describes an Operating System disk. */
export type ImageOSDisk = ImageDisk & {
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from a custom image. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  osType: OperatingSystemTypes;
  /** The OS State. */
  osState: OperatingSystemStateTypes;
};

/** Describes a data disk. */
export type ImageDataDisk = ImageDisk & {
  /** Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. */
  lun: number;
};

/** Describes a Virtual Machine Scale Set VM Reimage Parameters. */
export type VirtualMachineScaleSetVMReimageParameters = VirtualMachineReimageParameters & {};

/** Api request input for LogAnalytics getRequestRateByInterval Api. */
export type RequestRateByIntervalInput = LogAnalyticsInputBase & {
  /** Interval value in minutes used to create LogAnalytics call rate logs. */
  intervalLength: IntervalInMins;
};

/** Api request input for LogAnalytics getThrottledRequests Api. */
export type ThrottledRequestsInput = LogAnalyticsInputBase & {};

/** Describes the properties of a Run Command. */
export type RunCommandDocument = RunCommandDocumentBase & {
  /** The script to be executed. */
  script: string[];
  /** The parameters used by the script. */
  parameters?: RunCommandParameterDefinition[];
};

/** Properties of disk restore point */
export type DiskRestorePoint = ProxyOnlyResource & {
  /**
   * The timestamp of restorePoint creation
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly timeCreated?: Date;
  /**
   * arm id of source disk
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly sourceResourceId?: string;
  /**
   * The Operating System type.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly osType?: OperatingSystemTypes;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** Purchase plan information for the the image from which the OS disk was created. */
  purchasePlan?: PurchasePlanAutoGenerated;
  /**
   * id of the backing snapshot's MIS family
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly familyId?: string;
  /**
   * unique incarnation id of the source disk
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly sourceUniqueId?: string;
  /**
   * Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly encryption?: Encryption;
};

/** Specifies information about the Shared Image Gallery that you want to update. */
export type GalleryUpdate = UpdateResourceDefinition & {
  /** The description of this Shared Image Gallery resource. This property is updatable. */
  description?: string;
  /** Describes the gallery unique name. */
  identifier?: GalleryIdentifier;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: GalleryPropertiesProvisioningState;
};

/** Specifies information about the gallery Image Definition that you want to update. */
export type GalleryImageUpdate = UpdateResourceDefinition & {
  /** The description of this gallery Image Definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement for the gallery Image Definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** This property allows you to specify the type of the OS that is included in the disk when creating a VM from a managed image. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  osType?: OperatingSystemTypes;
  /** This property allows the user to specify whether the virtual machines created under this image are 'Generalized' or 'Specialized'. */
  osState?: OperatingSystemStateTypes;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: HyperVGeneration;
  /** The end of life date of the gallery Image Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This is the gallery Image Definition identifier. */
  identifier?: GalleryImageIdentifier;
  /** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
  recommended?: RecommendedMachineConfiguration;
  /** Describes the disallowed disk types. */
  disallowed?: Disallowed;
  /** Describes the gallery Image Definition purchase plan. This is used by marketplace images. */
  purchasePlan?: ImagePurchasePlan;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: GalleryImagePropertiesProvisioningState;
};

/** Specifies information about the gallery Image Version that you want to update. */
export type GalleryImageVersionUpdate = UpdateResourceDefinition & {
  /** The publishing profile of a gallery Image Version. */
  publishingProfile?: GalleryImageVersionPublishingProfile;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: GalleryImageVersionPropertiesProvisioningState;
  /** This is the storage profile of a Gallery Image Version. */
  storageProfile?: GalleryImageVersionStorageProfile;
  /**
   * This is the replication status of the gallery Image Version.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly replicationStatus?: ReplicationStatus;
};

/** Specifies information about the gallery Application Definition that you want to update. */
export type GalleryApplicationUpdate = UpdateResourceDefinition & {
  /** The description of this gallery Application Definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement for the gallery Application Definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** The end of life date of the gallery Application Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date;
  /** This property allows you to specify the supported type of the OS that application is built for. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  supportedOSType?: OperatingSystemTypes;
};

/** Specifies information about the gallery Application Version that you want to update. */
export type GalleryApplicationVersionUpdate = UpdateResourceDefinition & {
  /** The publishing profile of a gallery image version. */
  publishingProfile?: GalleryApplicationVersionPublishingProfile;
  /**
   * The provisioning state, which only appears in the response.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly provisioningState?: GalleryApplicationVersionPropertiesProvisioningState;
  /**
   * This is the replication status of the gallery Image Version.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly replicationStatus?: ReplicationStatus;
};

/** The publishing profile of a gallery Image Version. */
export type GalleryImageVersionPublishingProfile = GalleryArtifactPublishingProfileBase & {};

/** The publishing profile of a gallery image version. */
export type GalleryApplicationVersionPublishingProfile = GalleryArtifactPublishingProfileBase & {
  /** The source image from which the Image Version is going to be created. */
  source: UserArtifactSource;
  manageActions?: UserArtifactManage;
  /** Optional. Whether or not this application reports health. */
  enableHealthCheck?: boolean;
};

/** Contains encryption settings for an OS disk image. */
export type OSDiskImageEncryption = DiskImageEncryption & {};

/** Contains encryption settings for a data disk image. */
export type DataDiskImageEncryption = DiskImageEncryption & {
  /** This property specifies the logical unit number of the data disk. This value is used to identify data disks within the Virtual Machine and therefore must be unique for each data disk attached to the Virtual Machine. */
  lun: number;
};

/** This is the OS disk image. */
export type GalleryOSDiskImage = GalleryDiskImage & {};

/** This is the data disk image. */
export type GalleryDataDiskImage = GalleryDiskImage & {
  /** This property specifies the logical unit number of the data disk. This value is used to identify data disks within the Virtual Machine and therefore must be unique for each data disk attached to the Virtual Machine. */
  lun: number;
};

/** Describes a Virtual Machine Image. */
export type VirtualMachineImage = VirtualMachineImageResource & {
  /** Used for establishing the purchase context of any 3rd Party artifact through MarketPlace. */
  plan?: PurchasePlan;
  /** Contains the os disk image information. */
  osDiskImage?: OSDiskImage;
  dataDiskImages?: DataDiskImage[];
  /** Describes automatic OS upgrade properties on the image. */
  automaticOSUpgradeProperties?: AutomaticOSUpgradeProperties;
  /** Specifies the HyperVGeneration Type */
  hyperVGeneration?: HyperVGenerationTypes;
  /** Specifies disallowed configuration for the VirtualMachine created from the image */
  disallowed?: DisallowedConfiguration;
  features?: VirtualMachineImageFeature[];
};

/** Describes a Virtual Machine Scale Set VM Reimage Parameters. */
export type VirtualMachineScaleSetReimageParameters = VirtualMachineScaleSetVMReimageParameters & {
  /** The virtual machine scale set instance ids. Omitting the virtual machine scale set instance ids will result in the operation being performed on all virtual machines in the virtual machine scale set. */
  instanceIds?: string[];
};

/** Known values of {@link ProximityPlacementGroupType} that the service accepts. */
export const enum KnownProximityPlacementGroupType {
  Standard = "Standard",
  Ultra = "Ultra"
}

/**
 * Defines values for ProximityPlacementGroupType. \
 * {@link KnownProximityPlacementGroupType} can be used interchangeably with ProximityPlacementGroupType,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Standard** \
 * **Ultra**
 */
export type ProximityPlacementGroupType = string;

/** Known values of {@link HyperVGenerationTypes} that the service accepts. */
export const enum KnownHyperVGenerationTypes {
  V1 = "V1",
  V2 = "V2"
}

/**
 * Defines values for HyperVGenerationTypes. \
 * {@link KnownHyperVGenerationTypes} can be used interchangeably with HyperVGenerationTypes,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **V1** \
 * **V2**
 */
export type HyperVGenerationTypes = string;

/** Known values of {@link VmDiskTypes} that the service accepts. */
export const enum KnownVmDiskTypes {
  None = "None",
  Unmanaged = "Unmanaged"
}

/**
 * Defines values for VmDiskTypes. \
 * {@link KnownVmDiskTypes} can be used interchangeably with VmDiskTypes,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **None** \
 * **Unmanaged**
 */
export type VmDiskTypes = string;

/** Known values of {@link ExtendedLocationTypes} that the service accepts. */
export const enum KnownExtendedLocationTypes {
  EdgeZone = "EdgeZone"
}

/**
 * Defines values for ExtendedLocationTypes. \
 * {@link KnownExtendedLocationTypes} can be used interchangeably with ExtendedLocationTypes,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **EdgeZone**
 */
export type ExtendedLocationTypes = string;

/** Known values of {@link VirtualMachineSizeTypes} that the service accepts. */
export const enum KnownVirtualMachineSizeTypes {
  BasicA0 = "Basic_A0",
  BasicA1 = "Basic_A1",
  BasicA2 = "Basic_A2",
  BasicA3 = "Basic_A3",
  BasicA4 = "Basic_A4",
  StandardA0 = "Standard_A0",
  StandardA1 = "Standard_A1",
  StandardA2 = "Standard_A2",
  StandardA3 = "Standard_A3",
  StandardA4 = "Standard_A4",
  StandardA5 = "Standard_A5",
  StandardA6 = "Standard_A6",
  StandardA7 = "Standard_A7",
  StandardA8 = "Standard_A8",
  StandardA9 = "Standard_A9",
  StandardA10 = "Standard_A10",
  StandardA11 = "Standard_A11",
  StandardA1V2 = "Standard_A1_v2",
  StandardA2V2 = "Standard_A2_v2",
  StandardA4V2 = "Standard_A4_v2",
  StandardA8V2 = "Standard_A8_v2",
  StandardA2MV2 = "Standard_A2m_v2",
  StandardA4MV2 = "Standard_A4m_v2",
  StandardA8MV2 = "Standard_A8m_v2",
  StandardB1S = "Standard_B1s",
  StandardB1Ms = "Standard_B1ms",
  StandardB2S = "Standard_B2s",
  StandardB2Ms = "Standard_B2ms",
  StandardB4Ms = "Standard_B4ms",
  StandardB8Ms = "Standard_B8ms",
  StandardD1 = "Standard_D1",
  StandardD2 = "Standard_D2",
  StandardD3 = "Standard_D3",
  StandardD4 = "Standard_D4",
  StandardD11 = "Standard_D11",
  StandardD12 = "Standard_D12",
  StandardD13 = "Standard_D13",
  StandardD14 = "Standard_D14",
  StandardD1V2 = "Standard_D1_v2",
  StandardD2V2 = "Standard_D2_v2",
  StandardD3V2 = "Standard_D3_v2",
  StandardD4V2 = "Standard_D4_v2",
  StandardD5V2 = "Standard_D5_v2",
  StandardD2V3 = "Standard_D2_v3",
  StandardD4V3 = "Standard_D4_v3",
  StandardD8V3 = "Standard_D8_v3",
  StandardD16V3 = "Standard_D16_v3",
  StandardD32V3 = "Standard_D32_v3",
  StandardD64V3 = "Standard_D64_v3",
  StandardD2SV3 = "Standard_D2s_v3",
  StandardD4SV3 = "Standard_D4s_v3",
  StandardD8SV3 = "Standard_D8s_v3",
  StandardD16SV3 = "Standard_D16s_v3",
  StandardD32SV3 = "Standard_D32s_v3",
  StandardD64SV3 = "Standard_D64s_v3",
  StandardD11V2 = "Standard_D11_v2",
  StandardD12V2 = "Standard_D12_v2",
  StandardD13V2 = "Standard_D13_v2",
  StandardD14V2 = "Standard_D14_v2",
  StandardD15V2 = "Standard_D15_v2",
  StandardDS1 = "Standard_DS1",
  StandardDS2 = "Standard_DS2",
  StandardDS3 = "Standard_DS3",
  StandardDS4 = "Standard_DS4",
  StandardDS11 = "Standard_DS11",
  StandardDS12 = "Standard_DS12",
  StandardDS13 = "Standard_DS13",
  StandardDS14 = "Standard_DS14",
  StandardDS1V2 = "Standard_DS1_v2",
  StandardDS2V2 = "Standard_DS2_v2",
  StandardDS3V2 = "Standard_DS3_v2",
  StandardDS4V2 = "Standard_DS4_v2",
  StandardDS5V2 = "Standard_DS5_v2",
  StandardDS11V2 = "Standard_DS11_v2",
  StandardDS12V2 = "Standard_DS12_v2",
  StandardDS13V2 = "Standard_DS13_v2",
  StandardDS14V2 = "Standard_DS14_v2",
  StandardDS15V2 = "Standard_DS15_v2",
  StandardDS134V2 = "Standard_DS13-4_v2",
  StandardDS132V2 = "Standard_DS13-2_v2",
  StandardDS148V2 = "Standard_DS14-8_v2",
  StandardDS144V2 = "Standard_DS14-4_v2",
  StandardE2V3 = "Standard_E2_v3",
  StandardE4V3 = "Standard_E4_v3",
  StandardE8V3 = "Standard_E8_v3",
  StandardE16V3 = "Standard_E16_v3",
  StandardE32V3 = "Standard_E32_v3",
  StandardE64V3 = "Standard_E64_v3",
  StandardE2SV3 = "Standard_E2s_v3",
  StandardE4SV3 = "Standard_E4s_v3",
  StandardE8SV3 = "Standard_E8s_v3",
  StandardE16SV3 = "Standard_E16s_v3",
  StandardE32SV3 = "Standard_E32s_v3",
  StandardE64SV3 = "Standard_E64s_v3",
  StandardE3216V3 = "Standard_E32-16_v3",
  StandardE328SV3 = "Standard_E32-8s_v3",
  StandardE6432SV3 = "Standard_E64-32s_v3",
  StandardE6416SV3 = "Standard_E64-16s_v3",
  StandardF1 = "Standard_F1",
  StandardF2 = "Standard_F2",
  StandardF4 = "Standard_F4",
  StandardF8 = "Standard_F8",
  StandardF16 = "Standard_F16",
  StandardF1S = "Standard_F1s",
  StandardF2S = "Standard_F2s",
  StandardF4S = "Standard_F4s",
  StandardF8S = "Standard_F8s",
  StandardF16S = "Standard_F16s",
  StandardF2SV2 = "Standard_F2s_v2",
  StandardF4SV2 = "Standard_F4s_v2",
  StandardF8SV2 = "Standard_F8s_v2",
  StandardF16SV2 = "Standard_F16s_v2",
  StandardF32SV2 = "Standard_F32s_v2",
  StandardF64SV2 = "Standard_F64s_v2",
  StandardF72SV2 = "Standard_F72s_v2",
  StandardG1 = "Standard_G1",
  StandardG2 = "Standard_G2",
  StandardG3 = "Standard_G3",
  StandardG4 = "Standard_G4",
  StandardG5 = "Standard_G5",
  StandardGS1 = "Standard_GS1",
  StandardGS2 = "Standard_GS2",
  StandardGS3 = "Standard_GS3",
  StandardGS4 = "Standard_GS4",
  StandardGS5 = "Standard_GS5",
  StandardGS48 = "Standard_GS4-8",
  StandardGS44 = "Standard_GS4-4",
  StandardGS516 = "Standard_GS5-16",
  StandardGS58 = "Standard_GS5-8",
  StandardH8 = "Standard_H8",
  StandardH16 = "Standard_H16",
  StandardH8M = "Standard_H8m",
  StandardH16M = "Standard_H16m",
  StandardH16R = "Standard_H16r",
  StandardH16Mr = "Standard_H16mr",
  StandardL4S = "Standard_L4s",
  StandardL8S = "Standard_L8s",
  StandardL16S = "Standard_L16s",
  StandardL32S = "Standard_L32s",
  StandardM64S = "Standard_M64s",
  StandardM64Ms = "Standard_M64ms",
  StandardM128S = "Standard_M128s",
  StandardM128Ms = "Standard_M128ms",
  StandardM6432Ms = "Standard_M64-32ms",
  StandardM6416Ms = "Standard_M64-16ms",
  StandardM12864Ms = "Standard_M128-64ms",
  StandardM12832Ms = "Standard_M128-32ms",
  StandardNC6 = "Standard_NC6",
  StandardNC12 = "Standard_NC12",
  StandardNC24 = "Standard_NC24",
  StandardNC24R = "Standard_NC24r",
  StandardNC6SV2 = "Standard_NC6s_v2",
  StandardNC12SV2 = "Standard_NC12s_v2",
  StandardNC24SV2 = "Standard_NC24s_v2",
  StandardNC24RsV2 = "Standard_NC24rs_v2",
  StandardNC6SV3 = "Standard_NC6s_v3",
  StandardNC12SV3 = "Standard_NC12s_v3",
  StandardNC24SV3 = "Standard_NC24s_v3",
  StandardNC24RsV3 = "Standard_NC24rs_v3",
  StandardND6S = "Standard_ND6s",
  StandardND12S = "Standard_ND12s",
  StandardND24S = "Standard_ND24s",
  StandardND24Rs = "Standard_ND24rs",
  StandardNV6 = "Standard_NV6",
  StandardNV12 = "Standard_NV12",
  StandardNV24 = "Standard_NV24"
}

/**
 * Defines values for VirtualMachineSizeTypes. \
 * {@link KnownVirtualMachineSizeTypes} can be used interchangeably with VirtualMachineSizeTypes,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Basic_A0** \
 * **Basic_A1** \
 * **Basic_A2** \
 * **Basic_A3** \
 * **Basic_A4** \
 * **Standard_A0** \
 * **Standard_A1** \
 * **Standard_A2** \
 * **Standard_A3** \
 * **Standard_A4** \
 * **Standard_A5** \
 * **Standard_A6** \
 * **Standard_A7** \
 * **Standard_A8** \
 * **Standard_A9** \
 * **Standard_A10** \
 * **Standard_A11** \
 * **Standard_A1_v2** \
 * **Standard_A2_v2** \
 * **Standard_A4_v2** \
 * **Standard_A8_v2** \
 * **Standard_A2m_v2** \
 * **Standard_A4m_v2** \
 * **Standard_A8m_v2** \
 * **Standard_B1s** \
 * **Standard_B1ms** \
 * **Standard_B2s** \
 * **Standard_B2ms** \
 * **Standard_B4ms** \
 * **Standard_B8ms** \
 * **Standard_D1** \
 * **Standard_D2** \
 * **Standard_D3** \
 * **Standard_D4** \
 * **Standard_D11** \
 * **Standard_D12** \
 * **Standard_D13** \
 * **Standard_D14** \
 * **Standard_D1_v2** \
 * **Standard_D2_v2** \
 * **Standard_D3_v2** \
 * **Standard_D4_v2** \
 * **Standard_D5_v2** \
 * **Standard_D2_v3** \
 * **Standard_D4_v3** \
 * **Standard_D8_v3** \
 * **Standard_D16_v3** \
 * **Standard_D32_v3** \
 * **Standard_D64_v3** \
 * **Standard_D2s_v3** \
 * **Standard_D4s_v3** \
 * **Standard_D8s_v3** \
 * **Standard_D16s_v3** \
 * **Standard_D32s_v3** \
 * **Standard_D64s_v3** \
 * **Standard_D11_v2** \
 * **Standard_D12_v2** \
 * **Standard_D13_v2** \
 * **Standard_D14_v2** \
 * **Standard_D15_v2** \
 * **Standard_DS1** \
 * **Standard_DS2** \
 * **Standard_DS3** \
 * **Standard_DS4** \
 * **Standard_DS11** \
 * **Standard_DS12** \
 * **Standard_DS13** \
 * **Standard_DS14** \
 * **Standard_DS1_v2** \
 * **Standard_DS2_v2** \
 * **Standard_DS3_v2** \
 * **Standard_DS4_v2** \
 * **Standard_DS5_v2** \
 * **Standard_DS11_v2** \
 * **Standard_DS12_v2** \
 * **Standard_DS13_v2** \
 * **Standard_DS14_v2** \
 * **Standard_DS15_v2** \
 * **Standard_DS13-4_v2** \
 * **Standard_DS13-2_v2** \
 * **Standard_DS14-8_v2** \
 * **Standard_DS14-4_v2** \
 * **Standard_E2_v3** \
 * **Standard_E4_v3** \
 * **Standard_E8_v3** \
 * **Standard_E16_v3** \
 * **Standard_E32_v3** \
 * **Standard_E64_v3** \
 * **Standard_E2s_v3** \
 * **Standard_E4s_v3** \
 * **Standard_E8s_v3** \
 * **Standard_E16s_v3** \
 * **Standard_E32s_v3** \
 * **Standard_E64s_v3** \
 * **Standard_E32-16_v3** \
 * **Standard_E32-8s_v3** \
 * **Standard_E64-32s_v3** \
 * **Standard_E64-16s_v3** \
 * **Standard_F1** \
 * **Standard_F2** \
 * **Standard_F4** \
 * **Standard_F8** \
 * **Standard_F16** \
 * **Standard_F1s** \
 * **Standard_F2s** \
 * **Standard_F4s** \
 * **Standard_F8s** \
 * **Standard_F16s** \
 * **Standard_F2s_v2** \
 * **Standard_F4s_v2** \
 * **Standard_F8s_v2** \
 * **Standard_F16s_v2** \
 * **Standard_F32s_v2** \
 * **Standard_F64s_v2** \
 * **Standard_F72s_v2** \
 * **Standard_G1** \
 * **Standard_G2** \
 * **Standard_G3** \
 * **Standard_G4** \
 * **Standard_G5** \
 * **Standard_GS1** \
 * **Standard_GS2** \
 * **Standard_GS3** \
 * **Standard_GS4** \
 * **Standard_GS5** \
 * **Standard_GS4-8** \
 * **Standard_GS4-4** \
 * **Standard_GS5-16** \
 * **Standard_GS5-8** \
 * **Standard_H8** \
 * **Standard_H16** \
 * **Standard_H8m** \
 * **Standard_H16m** \
 * **Standard_H16r** \
 * **Standard_H16mr** \
 * **Standard_L4s** \
 * **Standard_L8s** \
 * **Standard_L16s** \
 * **Standard_L32s** \
 * **Standard_M64s** \
 * **Standard_M64ms** \
 * **Standard_M128s** \
 * **Standard_M128ms** \
 * **Standard_M64-32ms** \
 * **Standard_M64-16ms** \
 * **Standard_M128-64ms** \
 * **Standard_M128-32ms** \
 * **Standard_NC6** \
 * **Standard_NC12** \
 * **Standard_NC24** \
 * **Standard_NC24r** \
 * **Standard_NC6s_v2** \
 * **Standard_NC12s_v2** \
 * **Standard_NC24s_v2** \
 * **Standard_NC24rs_v2** \
 * **Standard_NC6s_v3** \
 * **Standard_NC12s_v3** \
 * **Standard_NC24s_v3** \
 * **Standard_NC24rs_v3** \
 * **Standard_ND6s** \
 * **Standard_ND12s** \
 * **Standard_ND24s** \
 * **Standard_ND24rs** \
 * **Standard_NV6** \
 * **Standard_NV12** \
 * **Standard_NV24**
 */
export type VirtualMachineSizeTypes = string;

/** Known values of {@link DiffDiskOptions} that the service accepts. */
export const enum KnownDiffDiskOptions {
  Local = "Local"
}

/**
 * Defines values for DiffDiskOptions. \
 * {@link KnownDiffDiskOptions} can be used interchangeably with DiffDiskOptions,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Local**
 */
export type DiffDiskOptions = string;

/** Known values of {@link DiffDiskPlacement} that the service accepts. */
export const enum KnownDiffDiskPlacement {
  CacheDisk = "CacheDisk",
  ResourceDisk = "ResourceDisk"
}

/**
 * Defines values for DiffDiskPlacement. \
 * {@link KnownDiffDiskPlacement} can be used interchangeably with DiffDiskPlacement,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **CacheDisk** \
 * **ResourceDisk**
 */
export type DiffDiskPlacement = string;

/** Known values of {@link DiskCreateOptionTypes} that the service accepts. */
export const enum KnownDiskCreateOptionTypes {
  FromImage = "FromImage",
  Empty = "Empty",
  Attach = "Attach"
}

/**
 * Defines values for DiskCreateOptionTypes. \
 * {@link KnownDiskCreateOptionTypes} can be used interchangeably with DiskCreateOptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **FromImage** \
 * **Empty** \
 * **Attach**
 */
export type DiskCreateOptionTypes = string;

/** Known values of {@link StorageAccountTypes} that the service accepts. */
export const enum KnownStorageAccountTypes {
  StandardLRS = "Standard_LRS",
  PremiumLRS = "Premium_LRS",
  StandardSSDLRS = "StandardSSD_LRS",
  UltraSSDLRS = "UltraSSD_LRS"
}

/**
 * Defines values for StorageAccountTypes. \
 * {@link KnownStorageAccountTypes} can be used interchangeably with StorageAccountTypes,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Standard_LRS** \
 * **Premium_LRS** \
 * **StandardSSD_LRS** \
 * **UltraSSD_LRS**
 */
export type StorageAccountTypes = string;

/** Known values of {@link DiskDetachOptionTypes} that the service accepts. */
export const enum KnownDiskDetachOptionTypes {
  ForceDetach = "ForceDetach"
}

/**
 * Defines values for DiskDetachOptionTypes. \
 * {@link KnownDiskDetachOptionTypes} can be used interchangeably with DiskDetachOptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **ForceDetach**
 */
export type DiskDetachOptionTypes = string;

/** Known values of {@link WindowsVMGuestPatchMode} that the service accepts. */
export const enum KnownWindowsVMGuestPatchMode {
  Manual = "Manual",
  AutomaticByOS = "AutomaticByOS",
  AutomaticByPlatform = "AutomaticByPlatform"
}

/**
 * Defines values for WindowsVMGuestPatchMode. \
 * {@link KnownWindowsVMGuestPatchMode} can be used interchangeably with WindowsVMGuestPatchMode,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Manual** \
 * **AutomaticByOS** \
 * **AutomaticByPlatform**
 */
export type WindowsVMGuestPatchMode = string;

/** Known values of {@link LinuxVMGuestPatchMode} that the service accepts. */
export const enum KnownLinuxVMGuestPatchMode {
  ImageDefault = "ImageDefault",
  AutomaticByPlatform = "AutomaticByPlatform"
}

/**
 * Defines values for LinuxVMGuestPatchMode. \
 * {@link KnownLinuxVMGuestPatchMode} can be used interchangeably with LinuxVMGuestPatchMode,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **ImageDefault** \
 * **AutomaticByPlatform**
 */
export type LinuxVMGuestPatchMode = string;

/** Known values of {@link VirtualMachinePriorityTypes} that the service accepts. */
export const enum KnownVirtualMachinePriorityTypes {
  Regular = "Regular",
  Low = "Low",
  Spot = "Spot"
}

/**
 * Defines values for VirtualMachinePriorityTypes. \
 * {@link KnownVirtualMachinePriorityTypes} can be used interchangeably with VirtualMachinePriorityTypes,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Regular** \
 * **Low** \
 * **Spot**
 */
export type VirtualMachinePriorityTypes = string;

/** Known values of {@link VirtualMachineEvictionPolicyTypes} that the service accepts. */
export const enum KnownVirtualMachineEvictionPolicyTypes {
  Deallocate = "Deallocate",
  Delete = "Delete"
}

/**
 * Defines values for VirtualMachineEvictionPolicyTypes. \
 * {@link KnownVirtualMachineEvictionPolicyTypes} can be used interchangeably with VirtualMachineEvictionPolicyTypes,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Deallocate** \
 * **Delete**
 */
export type VirtualMachineEvictionPolicyTypes = string;

/** Known values of {@link HyperVGenerationType} that the service accepts. */
export const enum KnownHyperVGenerationType {
  V1 = "V1",
  V2 = "V2"
}

/**
 * Defines values for HyperVGenerationType. \
 * {@link KnownHyperVGenerationType} can be used interchangeably with HyperVGenerationType,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **V1** \
 * **V2**
 */
export type HyperVGenerationType = string;

/** Known values of {@link PatchOperationStatus} that the service accepts. */
export const enum KnownPatchOperationStatus {
  Unknown = "Unknown",
  InProgress = "InProgress",
  Failed = "Failed",
  Succeeded = "Succeeded",
  CompletedWithWarnings = "CompletedWithWarnings"
}

/**
 * Defines values for PatchOperationStatus. \
 * {@link KnownPatchOperationStatus} can be used interchangeably with PatchOperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Unknown** \
 * **InProgress** \
 * **Failed** \
 * **Succeeded** \
 * **CompletedWithWarnings**
 */
export type PatchOperationStatus = string;

/** Known values of {@link IPVersion} that the service accepts. */
export const enum KnownIPVersion {
  IPv4 = "IPv4",
  IPv6 = "IPv6"
}

/**
 * Defines values for IPVersion. \
 * {@link KnownIPVersion} can be used interchangeably with IPVersion,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **IPv4** \
 * **IPv6**
 */
export type IPVersion = string;

/** Known values of {@link VirtualMachineScaleSetScaleInRules} that the service accepts. */
export const enum KnownVirtualMachineScaleSetScaleInRules {
  Default = "Default",
  OldestVM = "OldestVM",
  NewestVM = "NewestVM"
}

/**
 * Defines values for VirtualMachineScaleSetScaleInRules. \
 * {@link KnownVirtualMachineScaleSetScaleInRules} can be used interchangeably with VirtualMachineScaleSetScaleInRules,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Default** \
 * **OldestVM** \
 * **NewestVM**
 */
export type VirtualMachineScaleSetScaleInRules = string;

/** Known values of {@link OrchestrationMode} that the service accepts. */
export const enum KnownOrchestrationMode {
  Uniform = "Uniform",
  Flexible = "Flexible"
}

/**
 * Defines values for OrchestrationMode. \
 * {@link KnownOrchestrationMode} can be used interchangeably with OrchestrationMode,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Uniform** \
 * **Flexible**
 */
export type OrchestrationMode = string;

/** Known values of {@link VMGuestPatchRebootBehavior} that the service accepts. */
export const enum KnownVMGuestPatchRebootBehavior {
  Unknown = "Unknown",
  NeverReboots = "NeverReboots",
  AlwaysRequiresReboot = "AlwaysRequiresReboot",
  CanRequestReboot = "CanRequestReboot"
}

/**
 * Defines values for VMGuestPatchRebootBehavior. \
 * {@link KnownVMGuestPatchRebootBehavior} can be used interchangeably with VMGuestPatchRebootBehavior,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Unknown** \
 * **NeverReboots** \
 * **AlwaysRequiresReboot** \
 * **CanRequestReboot**
 */
export type VMGuestPatchRebootBehavior = string;

/** Known values of {@link PatchAssessmentState} that the service accepts. */
export const enum KnownPatchAssessmentState {
  Unknown = "Unknown",
  Available = "Available"
}

/**
 * Defines values for PatchAssessmentState. \
 * {@link KnownPatchAssessmentState} can be used interchangeably with PatchAssessmentState,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Unknown** \
 * **Available**
 */
export type PatchAssessmentState = string;

/** Known values of {@link VMGuestPatchRebootSetting} that the service accepts. */
export const enum KnownVMGuestPatchRebootSetting {
  IfRequired = "IfRequired",
  Never = "Never",
  Always = "Always"
}

/**
 * Defines values for VMGuestPatchRebootSetting. \
 * {@link KnownVMGuestPatchRebootSetting} can be used interchangeably with VMGuestPatchRebootSetting,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **IfRequired** \
 * **Never** \
 * **Always**
 */
export type VMGuestPatchRebootSetting = string;

/** Known values of {@link VMGuestPatchClassificationWindows} that the service accepts. */
export const enum KnownVMGuestPatchClassificationWindows {
  Critical = "Critical",
  Security = "Security",
  UpdateRollUp = "UpdateRollUp",
  FeaturePack = "FeaturePack",
  ServicePack = "ServicePack",
  Definition = "Definition",
  Tools = "Tools",
  Updates = "Updates"
}

/**
 * Defines values for VMGuestPatchClassificationWindows. \
 * {@link KnownVMGuestPatchClassificationWindows} can be used interchangeably with VMGuestPatchClassificationWindows,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Critical** \
 * **Security** \
 * **UpdateRollUp** \
 * **FeaturePack** \
 * **ServicePack** \
 * **Definition** \
 * **Tools** \
 * **Updates**
 */
export type VMGuestPatchClassificationWindows = string;

/** Known values of {@link VMGuestPatchClassificationLinux} that the service accepts. */
export const enum KnownVMGuestPatchClassificationLinux {
  Critical = "Critical",
  Security = "Security",
  Other = "Other"
}

/**
 * Defines values for VMGuestPatchClassificationLinux. \
 * {@link KnownVMGuestPatchClassificationLinux} can be used interchangeably with VMGuestPatchClassificationLinux,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Critical** \
 * **Security** \
 * **Other**
 */
export type VMGuestPatchClassificationLinux = string;

/** Known values of {@link VMGuestPatchRebootStatus} that the service accepts. */
export const enum KnownVMGuestPatchRebootStatus {
  Unknown = "Unknown",
  NotNeeded = "NotNeeded",
  Required = "Required",
  Started = "Started",
  Failed = "Failed",
  Completed = "Completed"
}

/**
 * Defines values for VMGuestPatchRebootStatus. \
 * {@link KnownVMGuestPatchRebootStatus} can be used interchangeably with VMGuestPatchRebootStatus,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Unknown** \
 * **NotNeeded** \
 * **Required** \
 * **Started** \
 * **Failed** \
 * **Completed**
 */
export type VMGuestPatchRebootStatus = string;

/** Known values of {@link PatchInstallationState} that the service accepts. */
export const enum KnownPatchInstallationState {
  Unknown = "Unknown",
  Installed = "Installed",
  Failed = "Failed",
  Excluded = "Excluded",
  NotSelected = "NotSelected",
  Pending = "Pending"
}

/**
 * Defines values for PatchInstallationState. \
 * {@link KnownPatchInstallationState} can be used interchangeably with PatchInstallationState,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Unknown** \
 * **Installed** \
 * **Failed** \
 * **Excluded** \
 * **NotSelected** \
 * **Pending**
 */
export type PatchInstallationState = string;

/** Known values of {@link OrchestrationServiceNames} that the service accepts. */
export const enum KnownOrchestrationServiceNames {
  AutomaticRepairs = "AutomaticRepairs",
  DummyOrchestrationServiceName = "DummyOrchestrationServiceName"
}

/**
 * Defines values for OrchestrationServiceNames. \
 * {@link KnownOrchestrationServiceNames} can be used interchangeably with OrchestrationServiceNames,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **AutomaticRepairs** \
 * **DummyOrchestrationServiceName**
 */
export type OrchestrationServiceNames = string;

/** Known values of {@link OrchestrationServiceState} that the service accepts. */
export const enum KnownOrchestrationServiceState {
  NotRunning = "NotRunning",
  Running = "Running",
  Suspended = "Suspended"
}

/**
 * Defines values for OrchestrationServiceState. \
 * {@link KnownOrchestrationServiceState} can be used interchangeably with OrchestrationServiceState,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **NotRunning** \
 * **Running** \
 * **Suspended**
 */
export type OrchestrationServiceState = string;

/** Known values of {@link OrchestrationServiceStateAction} that the service accepts. */
export const enum KnownOrchestrationServiceStateAction {
  Resume = "Resume",
  Suspend = "Suspend"
}

/**
 * Defines values for OrchestrationServiceStateAction. \
 * {@link KnownOrchestrationServiceStateAction} can be used interchangeably with OrchestrationServiceStateAction,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Resume** \
 * **Suspend**
 */
export type OrchestrationServiceStateAction = string;

/** Known values of {@link ExecutionState} that the service accepts. */
export const enum KnownExecutionState {
  Unknown = "Unknown",
  Pending = "Pending",
  Running = "Running",
  Failed = "Failed",
  Succeeded = "Succeeded",
  TimedOut = "TimedOut",
  Canceled = "Canceled"
}

/**
 * Defines values for ExecutionState. \
 * {@link KnownExecutionState} can be used interchangeably with ExecutionState,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Unknown** \
 * **Pending** \
 * **Running** \
 * **Failed** \
 * **Succeeded** \
 * **TimedOut** \
 * **Canceled**
 */
export type ExecutionState = string;

/** Known values of {@link DiskStorageAccountTypes} that the service accepts. */
export const enum KnownDiskStorageAccountTypes {
  /** Standard HDD locally redundant storage. Best for backup, non-critical, and infrequent access. */
  StandardLRS = "Standard_LRS",
  /** Premium SSD locally redundant storage. Best for production and performance sensitive workloads. */
  PremiumLRS = "Premium_LRS",
  /** Standard SSD locally redundant storage. Best for web servers, lightly used enterprise applications and dev/test. */
  StandardSSDLRS = "StandardSSD_LRS",
  /** Ultra SSD locally redundant storage. Best for IO-intensive workloads such as SAP HANA, top tier databases (for example, SQL, Oracle), and other transaction-heavy workloads. */
  UltraSSDLRS = "UltraSSD_LRS"
}

/**
 * Defines values for DiskStorageAccountTypes. \
 * {@link KnownDiskStorageAccountTypes} can be used interchangeably with DiskStorageAccountTypes,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Standard_LRS**: Standard HDD locally redundant storage. Best for backup, non-critical, and infrequent access. \
 * **Premium_LRS**: Premium SSD locally redundant storage. Best for production and performance sensitive workloads. \
 * **StandardSSD_LRS**: Standard SSD locally redundant storage. Best for web servers, lightly used enterprise applications and dev\/test. \
 * **UltraSSD_LRS**: Ultra SSD locally redundant storage. Best for IO-intensive workloads such as SAP HANA, top tier databases (for example, SQL, Oracle), and other transaction-heavy workloads.
 */
export type DiskStorageAccountTypes = string;

/** Known values of {@link HyperVGeneration} that the service accepts. */
export const enum KnownHyperVGeneration {
  V1 = "V1",
  V2 = "V2"
}

/**
 * Defines values for HyperVGeneration. \
 * {@link KnownHyperVGeneration} can be used interchangeably with HyperVGeneration,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **V1** \
 * **V2**
 */
export type HyperVGeneration = string;

/** Known values of {@link DiskCreateOption} that the service accepts. */
export const enum KnownDiskCreateOption {
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
  Upload = "Upload"
}

/**
 * Defines values for DiskCreateOption. \
 * {@link KnownDiskCreateOption} can be used interchangeably with DiskCreateOption,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Empty**: Create an empty data disk of a size given by diskSizeGB. \
 * **Attach**: Disk will be attached to a VM. \
 * **FromImage**: Create a new disk from a platform image specified by the given imageReference or galleryImageReference. \
 * **Import**: Create a disk by importing from a blob specified by a sourceUri in a storage account specified by storageAccountId. \
 * **Copy**: Create a new disk or snapshot by copying from a disk or snapshot specified by the given sourceResourceId. \
 * **Restore**: Create a new disk by copying from a backup recovery point. \
 * **Upload**: Create a new disk by obtaining a write token and using it to directly upload the contents of the disk.
 */
export type DiskCreateOption = string;

/** Known values of {@link DiskState} that the service accepts. */
export const enum KnownDiskState {
  /** The disk is not being used and can be attached to a VM. */
  Unattached = "Unattached",
  /** The disk is currently mounted to a running VM. */
  Attached = "Attached",
  /** The disk is mounted to a stopped-deallocated VM */
  Reserved = "Reserved",
  /** The disk currently has an Active SAS Uri associated with it. */
  ActiveSAS = "ActiveSAS",
  /** A disk is ready to be created by upload by requesting a write token. */
  ReadyToUpload = "ReadyToUpload",
  /** A disk is created for upload and a write token has been issued for uploading to it. */
  ActiveUpload = "ActiveUpload"
}

/**
 * Defines values for DiskState. \
 * {@link KnownDiskState} can be used interchangeably with DiskState,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Unattached**: The disk is not being used and can be attached to a VM. \
 * **Attached**: The disk is currently mounted to a running VM. \
 * **Reserved**: The disk is mounted to a stopped-deallocated VM \
 * **ActiveSAS**: The disk currently has an Active SAS Uri associated with it. \
 * **ReadyToUpload**: A disk is ready to be created by upload by requesting a write token. \
 * **ActiveUpload**: A disk is created for upload and a write token has been issued for uploading to it.
 */
export type DiskState = string;

/** Known values of {@link EncryptionType} that the service accepts. */
export const enum KnownEncryptionType {
  /** Disk is encrypted at rest with Platform managed key. It is the default encryption type. This is not a valid encryption type for disk encryption sets. */
  EncryptionAtRestWithPlatformKey = "EncryptionAtRestWithPlatformKey",
  /** Disk is encrypted at rest with Customer managed key that can be changed and revoked by a customer. */
  EncryptionAtRestWithCustomerKey = "EncryptionAtRestWithCustomerKey",
  /** Disk is encrypted at rest with 2 layers of encryption. One of the keys is Customer managed and the other key is Platform managed. */
  EncryptionAtRestWithPlatformAndCustomerKeys = "EncryptionAtRestWithPlatformAndCustomerKeys"
}

/**
 * Defines values for EncryptionType. \
 * {@link KnownEncryptionType} can be used interchangeably with EncryptionType,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **EncryptionAtRestWithPlatformKey**: Disk is encrypted at rest with Platform managed key. It is the default encryption type. This is not a valid encryption type for disk encryption sets. \
 * **EncryptionAtRestWithCustomerKey**: Disk is encrypted at rest with Customer managed key that can be changed and revoked by a customer. \
 * **EncryptionAtRestWithPlatformAndCustomerKeys**: Disk is encrypted at rest with 2 layers of encryption. One of the keys is Customer managed and the other key is Platform managed.
 */
export type EncryptionType = string;

/** Known values of {@link NetworkAccessPolicy} that the service accepts. */
export const enum KnownNetworkAccessPolicy {
  /** The disk can be exported or uploaded to from any network. */
  AllowAll = "AllowAll",
  /** The disk can be exported or uploaded to using a DiskAccess resource's private endpoints. */
  AllowPrivate = "AllowPrivate",
  /** The disk cannot be exported. */
  DenyAll = "DenyAll"
}

/**
 * Defines values for NetworkAccessPolicy. \
 * {@link KnownNetworkAccessPolicy} can be used interchangeably with NetworkAccessPolicy,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **AllowAll**: The disk can be exported or uploaded to from any network. \
 * **AllowPrivate**: The disk can be exported or uploaded to using a DiskAccess resource's private endpoints. \
 * **DenyAll**: The disk cannot be exported.
 */
export type NetworkAccessPolicy = string;

/** Known values of {@link AccessLevel} that the service accepts. */
export const enum KnownAccessLevel {
  None = "None",
  Read = "Read",
  Write = "Write"
}

/**
 * Defines values for AccessLevel. \
 * {@link KnownAccessLevel} can be used interchangeably with AccessLevel,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **None** \
 * **Read** \
 * **Write**
 */
export type AccessLevel = string;

/** Known values of {@link SnapshotStorageAccountTypes} that the service accepts. */
export const enum KnownSnapshotStorageAccountTypes {
  /** Standard HDD locally redundant storage */
  StandardLRS = "Standard_LRS",
  /** Premium SSD locally redundant storage */
  PremiumLRS = "Premium_LRS",
  /** Standard zone redundant storage */
  StandardZRS = "Standard_ZRS"
}

/**
 * Defines values for SnapshotStorageAccountTypes. \
 * {@link KnownSnapshotStorageAccountTypes} can be used interchangeably with SnapshotStorageAccountTypes,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Standard_LRS**: Standard HDD locally redundant storage \
 * **Premium_LRS**: Premium SSD locally redundant storage \
 * **Standard_ZRS**: Standard zone redundant storage
 */
export type SnapshotStorageAccountTypes = string;

/** Known values of {@link DiskEncryptionSetIdentityType} that the service accepts. */
export const enum KnownDiskEncryptionSetIdentityType {
  SystemAssigned = "SystemAssigned",
  None = "None"
}

/**
 * Defines values for DiskEncryptionSetIdentityType. \
 * {@link KnownDiskEncryptionSetIdentityType} can be used interchangeably with DiskEncryptionSetIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **SystemAssigned** \
 * **None**
 */
export type DiskEncryptionSetIdentityType = string;

/** Known values of {@link DiskEncryptionSetType} that the service accepts. */
export const enum KnownDiskEncryptionSetType {
  /** Resource using diskEncryptionSet would be encrypted at rest with Customer managed key that can be changed and revoked by a customer. */
  EncryptionAtRestWithCustomerKey = "EncryptionAtRestWithCustomerKey",
  /** Resource using diskEncryptionSet would be encrypted at rest with two layers of encryption. One of the keys is Customer managed and the other key is Platform managed. */
  EncryptionAtRestWithPlatformAndCustomerKeys = "EncryptionAtRestWithPlatformAndCustomerKeys"
}

/**
 * Defines values for DiskEncryptionSetType. \
 * {@link KnownDiskEncryptionSetType} can be used interchangeably with DiskEncryptionSetType,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **EncryptionAtRestWithCustomerKey**: Resource using diskEncryptionSet would be encrypted at rest with Customer managed key that can be changed and revoked by a customer. \
 * **EncryptionAtRestWithPlatformAndCustomerKeys**: Resource using diskEncryptionSet would be encrypted at rest with two layers of encryption. One of the keys is Customer managed and the other key is Platform managed.
 */
export type DiskEncryptionSetType = string;

/** Known values of {@link PrivateEndpointServiceConnectionStatus} that the service accepts. */
export const enum KnownPrivateEndpointServiceConnectionStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected"
}

/**
 * Defines values for PrivateEndpointServiceConnectionStatus. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected**
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** Known values of {@link PrivateEndpointConnectionProvisioningState} that the service accepts. */
export const enum KnownPrivateEndpointConnectionProvisioningState {
  Succeeded = "Succeeded",
  Creating = "Creating",
  Deleting = "Deleting",
  Failed = "Failed"
}

/**
 * Defines values for PrivateEndpointConnectionProvisioningState. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Succeeded** \
 * **Creating** \
 * **Deleting** \
 * **Failed**
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** Known values of {@link GalleryPropertiesProvisioningState} that the service accepts. */
export const enum KnownGalleryPropertiesProvisioningState {
  Creating = "Creating",
  Updating = "Updating",
  Failed = "Failed",
  Succeeded = "Succeeded",
  Deleting = "Deleting",
  Migrating = "Migrating"
}

/**
 * Defines values for GalleryPropertiesProvisioningState. \
 * {@link KnownGalleryPropertiesProvisioningState} can be used interchangeably with GalleryPropertiesProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Creating** \
 * **Updating** \
 * **Failed** \
 * **Succeeded** \
 * **Deleting** \
 * **Migrating**
 */
export type GalleryPropertiesProvisioningState = string;

/** Known values of {@link GalleryImagePropertiesProvisioningState} that the service accepts. */
export const enum KnownGalleryImagePropertiesProvisioningState {
  Creating = "Creating",
  Updating = "Updating",
  Failed = "Failed",
  Succeeded = "Succeeded",
  Deleting = "Deleting",
  Migrating = "Migrating"
}

/**
 * Defines values for GalleryImagePropertiesProvisioningState. \
 * {@link KnownGalleryImagePropertiesProvisioningState} can be used interchangeably with GalleryImagePropertiesProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Creating** \
 * **Updating** \
 * **Failed** \
 * **Succeeded** \
 * **Deleting** \
 * **Migrating**
 */
export type GalleryImagePropertiesProvisioningState = string;

/** Known values of {@link StorageAccountType} that the service accepts. */
export const enum KnownStorageAccountType {
  StandardLRS = "Standard_LRS",
  StandardZRS = "Standard_ZRS",
  PremiumLRS = "Premium_LRS"
}

/**
 * Defines values for StorageAccountType. \
 * {@link KnownStorageAccountType} can be used interchangeably with StorageAccountType,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Standard_LRS** \
 * **Standard_ZRS** \
 * **Premium_LRS**
 */
export type StorageAccountType = string;

/** Known values of {@link GalleryImageVersionPropertiesProvisioningState} that the service accepts. */
export const enum KnownGalleryImageVersionPropertiesProvisioningState {
  Creating = "Creating",
  Updating = "Updating",
  Failed = "Failed",
  Succeeded = "Succeeded",
  Deleting = "Deleting",
  Migrating = "Migrating"
}

/**
 * Defines values for GalleryImageVersionPropertiesProvisioningState. \
 * {@link KnownGalleryImageVersionPropertiesProvisioningState} can be used interchangeably with GalleryImageVersionPropertiesProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Creating** \
 * **Updating** \
 * **Failed** \
 * **Succeeded** \
 * **Deleting** \
 * **Migrating**
 */
export type GalleryImageVersionPropertiesProvisioningState = string;

/** Known values of {@link AggregatedReplicationState} that the service accepts. */
export const enum KnownAggregatedReplicationState {
  Unknown = "Unknown",
  InProgress = "InProgress",
  Completed = "Completed",
  Failed = "Failed"
}

/**
 * Defines values for AggregatedReplicationState. \
 * {@link KnownAggregatedReplicationState} can be used interchangeably with AggregatedReplicationState,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Unknown** \
 * **InProgress** \
 * **Completed** \
 * **Failed**
 */
export type AggregatedReplicationState = string;

/** Known values of {@link ReplicationState} that the service accepts. */
export const enum KnownReplicationState {
  Unknown = "Unknown",
  Replicating = "Replicating",
  Completed = "Completed",
  Failed = "Failed"
}

/**
 * Defines values for ReplicationState. \
 * {@link KnownReplicationState} can be used interchangeably with ReplicationState,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Unknown** \
 * **Replicating** \
 * **Completed** \
 * **Failed**
 */
export type ReplicationState = string;

/** Known values of {@link ReplicationStatusTypes} that the service accepts. */
export const enum KnownReplicationStatusTypes {
  ReplicationStatus = "ReplicationStatus"
}

/**
 * Defines values for ReplicationStatusTypes. \
 * {@link KnownReplicationStatusTypes} can be used interchangeably with ReplicationStatusTypes,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **ReplicationStatus**
 */
export type ReplicationStatusTypes = string;

/** Known values of {@link GalleryApplicationVersionPropertiesProvisioningState} that the service accepts. */
export const enum KnownGalleryApplicationVersionPropertiesProvisioningState {
  Creating = "Creating",
  Updating = "Updating",
  Failed = "Failed",
  Succeeded = "Succeeded",
  Deleting = "Deleting",
  Migrating = "Migrating"
}

/**
 * Defines values for GalleryApplicationVersionPropertiesProvisioningState. \
 * {@link KnownGalleryApplicationVersionPropertiesProvisioningState} can be used interchangeably with GalleryApplicationVersionPropertiesProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Creating** \
 * **Updating** \
 * **Failed** \
 * **Succeeded** \
 * **Deleting** \
 * **Migrating**
 */
export type GalleryApplicationVersionPropertiesProvisioningState = string;

/** Known values of {@link AvailabilitySetSkuTypes} that the service accepts. */
export const enum KnownAvailabilitySetSkuTypes {
  Classic = "Classic",
  Aligned = "Aligned"
}

/**
 * Defines values for AvailabilitySetSkuTypes. \
 * {@link KnownAvailabilitySetSkuTypes} can be used interchangeably with AvailabilitySetSkuTypes,
 *  this enum contains the known values that the service supports.
 * ### Know values supported by the service
 * **Classic** \
 * **Aligned**
 */
export type AvailabilitySetSkuTypes = string;
/** Defines values for StatusLevelTypes. */
export type StatusLevelTypes = "Info" | "Warning" | "Error";
/** Defines values for DedicatedHostLicenseTypes. */
export type DedicatedHostLicenseTypes =
  | "None"
  | "Windows_Server_Hybrid"
  | "Windows_Server_Perpetual";
/** Defines values for OperatingSystemTypes. */
export type OperatingSystemTypes = "Windows" | "Linux";
/** Defines values for CachingTypes. */
export type CachingTypes = "None" | "ReadOnly" | "ReadWrite";
/** Defines values for SettingNames. */
export type SettingNames = "AutoLogon" | "FirstLogonCommands";
/** Defines values for ProtocolTypes. */
export type ProtocolTypes = "Http" | "Https";
/** Defines values for MaintenanceOperationResultCodeTypes. */
export type MaintenanceOperationResultCodeTypes =
  | "None"
  | "RetryLater"
  | "MaintenanceAborted"
  | "MaintenanceCompleted";
/** Defines values for ResourceIdentityType. */
export type ResourceIdentityType =
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | "None";
/** Defines values for UpgradeMode. */
export type UpgradeMode = "Automatic" | "Manual" | "Rolling";
/** Defines values for OperatingSystemStateTypes. */
export type OperatingSystemStateTypes = "Generalized" | "Specialized";
/** Defines values for VirtualMachineScaleSetSkuScaleType. */
export type VirtualMachineScaleSetSkuScaleType = "Automatic" | "None";
/** Defines values for UpgradeState. */
export type UpgradeState =
  | "RollingForward"
  | "Cancelled"
  | "Completed"
  | "Faulted";
/** Defines values for UpgradeOperationInvoker. */
export type UpgradeOperationInvoker = "Unknown" | "User" | "Platform";
/** Defines values for RollingUpgradeStatusCode. */
export type RollingUpgradeStatusCode =
  | "RollingForward"
  | "Cancelled"
  | "Completed"
  | "Faulted";
/** Defines values for RollingUpgradeActionType. */
export type RollingUpgradeActionType = "Start" | "Cancel";
/** Defines values for IntervalInMins. */
export type IntervalInMins =
  | "ThreeMins"
  | "FiveMins"
  | "ThirtyMins"
  | "SixtyMins";
/** Defines values for ResourceSkuCapacityScaleType. */
export type ResourceSkuCapacityScaleType = "Automatic" | "Manual" | "None";
/** Defines values for ResourceSkuRestrictionsType. */
export type ResourceSkuRestrictionsType = "Location" | "Zone";
/** Defines values for ResourceSkuRestrictionsReasonCode. */
export type ResourceSkuRestrictionsReasonCode =
  | "QuotaId"
  | "NotAvailableForSubscription";
/** Defines values for HostCaching. */
export type HostCaching = "None" | "ReadOnly" | "ReadWrite";

/** Contains response data for the list operation. */
export type OperationsListResponse = ComputeOperationListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ComputeOperationListResult;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type AvailabilitySetsCreateOrUpdateResponse = AvailabilitySet & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: AvailabilitySet;
  };
};

/** Contains response data for the update operation. */
export type AvailabilitySetsUpdateResponse = AvailabilitySet & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: AvailabilitySet;
  };
};

/** Contains response data for the get operation. */
export type AvailabilitySetsGetResponse = AvailabilitySet & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: AvailabilitySet;
  };
};

/** Optional parameters. */
export interface AvailabilitySetsListBySubscriptionOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply to the operation. Allowed values are 'instanceView'. */
  expand?: string;
}

/** Contains response data for the listBySubscription operation. */
export type AvailabilitySetsListBySubscriptionResponse = AvailabilitySetListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: AvailabilitySetListResult;
  };
};

/** Contains response data for the list operation. */
export type AvailabilitySetsListResponse = AvailabilitySetListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: AvailabilitySetListResult;
  };
};

/** Contains response data for the listAvailableSizes operation. */
export type AvailabilitySetsListAvailableSizesResponse = VirtualMachineSizeListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineSizeListResult;
  };
};

/** Optional parameters. */
export interface AvailabilitySetsListBySubscriptionNextOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply to the operation. Allowed values are 'instanceView'. */
  expand?: string;
}

/** Contains response data for the listBySubscriptionNext operation. */
export type AvailabilitySetsListBySubscriptionNextResponse = AvailabilitySetListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: AvailabilitySetListResult;
  };
};

/** Contains response data for the listNext operation. */
export type AvailabilitySetsListNextResponse = AvailabilitySetListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: AvailabilitySetListResult;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type ProximityPlacementGroupsCreateOrUpdateResponse = ProximityPlacementGroup & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ProximityPlacementGroup;
  };
};

/** Contains response data for the update operation. */
export type ProximityPlacementGroupsUpdateResponse = ProximityPlacementGroup & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ProximityPlacementGroup;
  };
};

/** Optional parameters. */
export interface ProximityPlacementGroupsGetOptionalParams
  extends coreHttp.OperationOptions {
  /** includeColocationStatus=true enables fetching the colocation status of all the resources in the proximity placement group. */
  includeColocationStatus?: string;
}

/** Contains response data for the get operation. */
export type ProximityPlacementGroupsGetResponse = ProximityPlacementGroup & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ProximityPlacementGroup;
  };
};

/** Contains response data for the listBySubscription operation. */
export type ProximityPlacementGroupsListBySubscriptionResponse = ProximityPlacementGroupListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ProximityPlacementGroupListResult;
  };
};

/** Contains response data for the listByResourceGroup operation. */
export type ProximityPlacementGroupsListByResourceGroupResponse = ProximityPlacementGroupListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ProximityPlacementGroupListResult;
  };
};

/** Contains response data for the listBySubscriptionNext operation. */
export type ProximityPlacementGroupsListBySubscriptionNextResponse = ProximityPlacementGroupListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ProximityPlacementGroupListResult;
  };
};

/** Contains response data for the listByResourceGroupNext operation. */
export type ProximityPlacementGroupsListByResourceGroupNextResponse = ProximityPlacementGroupListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ProximityPlacementGroupListResult;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type DedicatedHostGroupsCreateOrUpdateResponse = DedicatedHostGroup & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DedicatedHostGroup;
  };
};

/** Contains response data for the update operation. */
export type DedicatedHostGroupsUpdateResponse = DedicatedHostGroup & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DedicatedHostGroup;
  };
};

/** Contains response data for the get operation. */
export type DedicatedHostGroupsGetResponse = DedicatedHostGroup & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DedicatedHostGroup;
  };
};

/** Contains response data for the listByResourceGroup operation. */
export type DedicatedHostGroupsListByResourceGroupResponse = DedicatedHostGroupListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DedicatedHostGroupListResult;
  };
};

/** Contains response data for the listBySubscription operation. */
export type DedicatedHostGroupsListBySubscriptionResponse = DedicatedHostGroupListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DedicatedHostGroupListResult;
  };
};

/** Contains response data for the listByResourceGroupNext operation. */
export type DedicatedHostGroupsListByResourceGroupNextResponse = DedicatedHostGroupListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DedicatedHostGroupListResult;
  };
};

/** Contains response data for the listBySubscriptionNext operation. */
export type DedicatedHostGroupsListBySubscriptionNextResponse = DedicatedHostGroupListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DedicatedHostGroupListResult;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type DedicatedHostsCreateOrUpdateResponse = DedicatedHost & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DedicatedHost;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type DedicatedHostsUpdateResponse = DedicatedHost & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DedicatedHost;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the get operation. */
export type DedicatedHostsGetResponse = DedicatedHost & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DedicatedHost;
  };
};

/** Contains response data for the listByHostGroup operation. */
export type DedicatedHostsListByHostGroupResponse = DedicatedHostListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DedicatedHostListResult;
  };
};

/** Contains response data for the listByHostGroupNext operation. */
export type DedicatedHostsListByHostGroupNextResponse = DedicatedHostListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DedicatedHostListResult;
  };
};

/** Contains response data for the listBySubscription operation. */
export type SshPublicKeysListBySubscriptionResponse = SshPublicKeysGroupListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SshPublicKeysGroupListResult;
  };
};

/** Contains response data for the listByResourceGroup operation. */
export type SshPublicKeysListByResourceGroupResponse = SshPublicKeysGroupListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SshPublicKeysGroupListResult;
  };
};

/** Contains response data for the create operation. */
export type SshPublicKeysCreateResponse = SshPublicKeyResource & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SshPublicKeyResource;
  };
};

/** Contains response data for the update operation. */
export type SshPublicKeysUpdateResponse = SshPublicKeyResource & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SshPublicKeyResource;
  };
};

/** Contains response data for the get operation. */
export type SshPublicKeysGetResponse = SshPublicKeyResource & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SshPublicKeyResource;
  };
};

/** Contains response data for the generateKeyPair operation. */
export type SshPublicKeysGenerateKeyPairResponse = SshPublicKeyGenerateKeyPairResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SshPublicKeyGenerateKeyPairResult;
  };
};

/** Contains response data for the listBySubscriptionNext operation. */
export type SshPublicKeysListBySubscriptionNextResponse = SshPublicKeysGroupListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SshPublicKeysGroupListResult;
  };
};

/** Contains response data for the listByResourceGroupNext operation. */
export type SshPublicKeysListByResourceGroupNextResponse = SshPublicKeysGroupListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SshPublicKeysGroupListResult;
  };
};

/** Contains response data for the get operation. */
export type VirtualMachineExtensionImagesGetResponse = VirtualMachineExtensionImage & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineExtensionImage;
  };
};

/** Contains response data for the listTypes operation. */
export type VirtualMachineExtensionImagesListTypesResponse = VirtualMachineExtensionImage[] & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineExtensionImage[];
  };
};

/** Optional parameters. */
export interface VirtualMachineExtensionImagesListVersionsOptionalParams
  extends coreHttp.OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
  top?: number;
  orderby?: string;
}

/** Contains response data for the listVersions operation. */
export type VirtualMachineExtensionImagesListVersionsResponse = VirtualMachineExtensionImage[] & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineExtensionImage[];
  };
};

/** Contains response data for the createOrUpdate operation. */
export type VirtualMachineExtensionsCreateOrUpdateResponse = VirtualMachineExtension & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineExtension;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type VirtualMachineExtensionsUpdateResponse = VirtualMachineExtension & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineExtension;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Optional parameters. */
export interface VirtualMachineExtensionsGetOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Contains response data for the get operation. */
export type VirtualMachineExtensionsGetResponse = VirtualMachineExtension & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineExtension;
  };
};

/** Optional parameters. */
export interface VirtualMachineExtensionsListOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Contains response data for the list operation. */
export type VirtualMachineExtensionsListResponse = VirtualMachineExtensionsListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineExtensionsListResult;
  };
};

/** Contains response data for the get operation. */
export type VirtualMachineImagesGetResponse = VirtualMachineImage & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineImage;
  };
};

/** Optional parameters. */
export interface VirtualMachineImagesListOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
  top?: number;
  orderby?: string;
}

/** Contains response data for the list operation. */
export type VirtualMachineImagesListResponse = VirtualMachineImageResource[] & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineImageResource[];
  };
};

/** Contains response data for the listOffers operation. */
export type VirtualMachineImagesListOffersResponse = VirtualMachineImageResource[] & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineImageResource[];
  };
};

/** Contains response data for the listPublishers operation. */
export type VirtualMachineImagesListPublishersResponse = VirtualMachineImageResource[] & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineImageResource[];
  };
};

/** Contains response data for the listSkus operation. */
export type VirtualMachineImagesListSkusResponse = VirtualMachineImageResource[] & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineImageResource[];
  };
};

/** Contains response data for the get operation. */
export type VirtualMachineImagesEdgeZoneGetResponse = VirtualMachineImage & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineImage;
  };
};

/** Optional parameters. */
export interface VirtualMachineImagesEdgeZoneListOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
  /** An integer value specifying the number of images to return that matches supplied values. */
  top?: number;
  /** Specifies the order of the results returned. Formatted as an OData query. */
  orderby?: string;
}

/** Contains response data for the list operation. */
export type VirtualMachineImagesEdgeZoneListResponse = VirtualMachineImageResource[] & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineImageResource[];
  };
};

/** Contains response data for the listOffers operation. */
export type VirtualMachineImagesEdgeZoneListOffersResponse = VirtualMachineImageResource[] & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineImageResource[];
  };
};

/** Contains response data for the listPublishers operation. */
export type VirtualMachineImagesEdgeZoneListPublishersResponse = VirtualMachineImageResource[] & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineImageResource[];
  };
};

/** Contains response data for the listSkus operation. */
export type VirtualMachineImagesEdgeZoneListSkusResponse = VirtualMachineImageResource[] & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineImageResource[];
  };
};

/** Contains response data for the list operation. */
export type UsageListResponse = ListUsagesResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ListUsagesResult;
  };
};

/** Contains response data for the listNext operation. */
export type UsageListNextResponse = ListUsagesResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ListUsagesResult;
  };
};

/** Contains response data for the listByLocation operation. */
export type VirtualMachinesListByLocationResponse = VirtualMachineListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineListResult;
  };
};

/** Contains response data for the capture operation. */
export type VirtualMachinesCaptureResponse = VirtualMachineCaptureResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineCaptureResult;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type VirtualMachinesCreateOrUpdateResponse = VirtualMachine & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachine;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type VirtualMachinesUpdateResponse = VirtualMachine & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachine;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Optional parameters. */
export interface VirtualMachinesDeleteOptionalParams
  extends coreHttp.OperationOptions {
  /** Optional parameter to force delete virtual machines.(Feature in Preview) */
  forceDeletion?: boolean;
}

/** Contains response data for the get operation. */
export type VirtualMachinesGetResponse = VirtualMachine & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachine;
  };
};

/** Contains response data for the instanceView operation. */
export type VirtualMachinesInstanceViewResponse = VirtualMachineInstanceView & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineInstanceView;
  };
};

/** Contains response data for the list operation. */
export type VirtualMachinesListResponse = VirtualMachineListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineListResult;
  };
};

/** Optional parameters. */
export interface VirtualMachinesListAllOptionalParams
  extends coreHttp.OperationOptions {
  /** statusOnly=true enables fetching run time status of all Virtual Machines in the subscription. */
  statusOnly?: string;
}

/** Contains response data for the listAll operation. */
export type VirtualMachinesListAllResponse = VirtualMachineListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineListResult;
  };
};

/** Contains response data for the listAvailableSizes operation. */
export type VirtualMachinesListAvailableSizesResponse = VirtualMachineSizeListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineSizeListResult;
  };
};

/** Optional parameters. */
export interface VirtualMachinesPowerOffOptionalParams
  extends coreHttp.OperationOptions {
  /** The parameter to request non-graceful VM shutdown. True value for this flag indicates non-graceful shutdown whereas false indicates otherwise. Default value for this flag is false if not specified */
  skipShutdown?: boolean;
}

/** Optional parameters. */
export interface VirtualMachinesReimageOptionalParams
  extends coreHttp.OperationOptions {
  /** Parameters supplied to the Reimage Virtual Machine operation. */
  parameters?: VirtualMachineReimageParameters;
}

/** Optional parameters. */
export interface VirtualMachinesRetrieveBootDiagnosticsDataOptionalParams
  extends coreHttp.OperationOptions {
  /** Expiration duration in minutes for the SAS URIs with a value between 1 to 1440 minutes. <br><br>NOTE: If not specified, SAS URIs will be generated with a default expiration duration of 120 minutes. */
  sasUriExpirationTimeInMinutes?: number;
}

/** Contains response data for the retrieveBootDiagnosticsData operation. */
export type VirtualMachinesRetrieveBootDiagnosticsDataResponse = RetrieveBootDiagnosticsDataResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: RetrieveBootDiagnosticsDataResult;
  };
};

/** Contains response data for the assessPatches operation. */
export type VirtualMachinesAssessPatchesResponse = VirtualMachineAssessPatchesResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineAssessPatchesResult;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the installPatches operation. */
export type VirtualMachinesInstallPatchesResponse = VirtualMachineInstallPatchesResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineInstallPatchesResult;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the runCommand operation. */
export type VirtualMachinesRunCommandResponse = RunCommandResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: RunCommandResult;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the listByLocationNext operation. */
export type VirtualMachinesListByLocationNextResponse = VirtualMachineListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineListResult;
  };
};

/** Contains response data for the listNext operation. */
export type VirtualMachinesListNextResponse = VirtualMachineListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineListResult;
  };
};

/** Optional parameters. */
export interface VirtualMachinesListAllNextOptionalParams
  extends coreHttp.OperationOptions {
  /** statusOnly=true enables fetching run time status of all Virtual Machines in the subscription. */
  statusOnly?: string;
}

/** Contains response data for the listAllNext operation. */
export type VirtualMachinesListAllNextResponse = VirtualMachineListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineListResult;
  };
};

/** Contains response data for the listByLocation operation. */
export type VirtualMachineScaleSetsListByLocationResponse = VirtualMachineScaleSetListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetListResult;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type VirtualMachineScaleSetsCreateOrUpdateResponse = VirtualMachineScaleSet & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSet;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type VirtualMachineScaleSetsUpdateResponse = VirtualMachineScaleSet & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSet;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Optional parameters. */
export interface VirtualMachineScaleSetsDeleteOptionalParams
  extends coreHttp.OperationOptions {
  /** Optional parameter to force delete a VM scale set. (Feature in Preview) */
  forceDeletion?: boolean;
}

/** Contains response data for the get operation. */
export type VirtualMachineScaleSetsGetResponse = VirtualMachineScaleSet & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSet;
  };
};

/** Optional parameters. */
export interface VirtualMachineScaleSetsDeallocateOptionalParams
  extends coreHttp.OperationOptions {
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsDeleteInstancesOptionalParams
  extends coreHttp.OperationOptions {
  /** Optional parameter to force delete virtual machines from the VM scale set. (Feature in Preview) */
  forceDeletion?: boolean;
}

/** Contains response data for the getInstanceView operation. */
export type VirtualMachineScaleSetsGetInstanceViewResponse = VirtualMachineScaleSetInstanceView & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetInstanceView;
  };
};

/** Contains response data for the list operation. */
export type VirtualMachineScaleSetsListResponse = VirtualMachineScaleSetListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetListResult;
  };
};

/** Contains response data for the listAll operation. */
export type VirtualMachineScaleSetsListAllResponse = VirtualMachineScaleSetListWithLinkResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetListWithLinkResult;
  };
};

/** Contains response data for the listSkus operation. */
export type VirtualMachineScaleSetsListSkusResponse = VirtualMachineScaleSetListSkusResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetListSkusResult;
  };
};

/** Contains response data for the getOSUpgradeHistory operation. */
export type VirtualMachineScaleSetsGetOSUpgradeHistoryResponse = VirtualMachineScaleSetListOSUpgradeHistory & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetListOSUpgradeHistory;
  };
};

/** Optional parameters. */
export interface VirtualMachineScaleSetsPowerOffOptionalParams
  extends coreHttp.OperationOptions {
  /** The parameter to request non-graceful VM shutdown. True value for this flag indicates non-graceful shutdown whereas false indicates otherwise. Default value for this flag is false if not specified */
  skipShutdown?: boolean;
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsRestartOptionalParams
  extends coreHttp.OperationOptions {
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsStartOptionalParams
  extends coreHttp.OperationOptions {
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsRedeployOptionalParams
  extends coreHttp.OperationOptions {
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsPerformMaintenanceOptionalParams
  extends coreHttp.OperationOptions {
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsReimageOptionalParams
  extends coreHttp.OperationOptions {
  /** Parameters for Reimaging VM ScaleSet. */
  vmScaleSetReimageInput?: VirtualMachineScaleSetReimageParameters;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetsReimageAllOptionalParams
  extends coreHttp.OperationOptions {
  /** A list of virtual machine instance IDs from the VM scale set. */
  vmInstanceIDs?: VirtualMachineScaleSetVMInstanceIDs;
}

/** Contains response data for the forceRecoveryServiceFabricPlatformUpdateDomainWalk operation. */
export type VirtualMachineScaleSetsForceRecoveryServiceFabricPlatformUpdateDomainWalkResponse = RecoveryWalkResponse & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: RecoveryWalkResponse;
  };
};

/** Contains response data for the listByLocationNext operation. */
export type VirtualMachineScaleSetsListByLocationNextResponse = VirtualMachineScaleSetListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetListResult;
  };
};

/** Contains response data for the listNext operation. */
export type VirtualMachineScaleSetsListNextResponse = VirtualMachineScaleSetListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetListResult;
  };
};

/** Contains response data for the listAllNext operation. */
export type VirtualMachineScaleSetsListAllNextResponse = VirtualMachineScaleSetListWithLinkResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetListWithLinkResult;
  };
};

/** Contains response data for the listSkusNext operation. */
export type VirtualMachineScaleSetsListSkusNextResponse = VirtualMachineScaleSetListSkusResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetListSkusResult;
  };
};

/** Contains response data for the getOSUpgradeHistoryNext operation. */
export type VirtualMachineScaleSetsGetOSUpgradeHistoryNextResponse = VirtualMachineScaleSetListOSUpgradeHistory & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetListOSUpgradeHistory;
  };
};

/** Contains response data for the list operation. */
export type VirtualMachineSizesListResponse = VirtualMachineSizeListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineSizeListResult;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type ImagesCreateOrUpdateResponse = Image & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Image;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type ImagesUpdateResponse = Image & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Image;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Optional parameters. */
export interface ImagesGetOptionalParams extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Contains response data for the get operation. */
export type ImagesGetResponse = Image & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Image;
  };
};

/** Contains response data for the listByResourceGroup operation. */
export type ImagesListByResourceGroupResponse = ImageListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ImageListResult;
  };
};

/** Contains response data for the list operation. */
export type ImagesListResponse = ImageListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ImageListResult;
  };
};

/** Contains response data for the listByResourceGroupNext operation. */
export type ImagesListByResourceGroupNextResponse = ImageListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ImageListResult;
  };
};

/** Contains response data for the listNext operation. */
export type ImagesListNextResponse = ImageListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ImageListResult;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type VirtualMachineScaleSetExtensionsCreateOrUpdateResponse = VirtualMachineScaleSetExtension & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetExtension;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type VirtualMachineScaleSetExtensionsUpdateResponse = VirtualMachineScaleSetExtension & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetExtension;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Optional parameters. */
export interface VirtualMachineScaleSetExtensionsGetOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Contains response data for the get operation. */
export type VirtualMachineScaleSetExtensionsGetResponse = VirtualMachineScaleSetExtension & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetExtension;
  };
};

/** Contains response data for the list operation. */
export type VirtualMachineScaleSetExtensionsListResponse = VirtualMachineScaleSetExtensionListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetExtensionListResult;
  };
};

/** Contains response data for the listNext operation. */
export type VirtualMachineScaleSetExtensionsListNextResponse = VirtualMachineScaleSetExtensionListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetExtensionListResult;
  };
};

/** Contains response data for the getLatest operation. */
export type VirtualMachineScaleSetRollingUpgradesGetLatestResponse = RollingUpgradeStatusInfo & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: RollingUpgradeStatusInfo;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type VirtualMachineScaleSetVMExtensionsCreateOrUpdateResponse = VirtualMachineScaleSetVMExtension & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetVMExtension;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type VirtualMachineScaleSetVMExtensionsUpdateResponse = VirtualMachineScaleSetVMExtension & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetVMExtension;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Optional parameters. */
export interface VirtualMachineScaleSetVMExtensionsGetOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Contains response data for the get operation. */
export type VirtualMachineScaleSetVMExtensionsGetResponse = VirtualMachineScaleSetVMExtension & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetVMExtension;
  };
};

/** Optional parameters. */
export interface VirtualMachineScaleSetVMExtensionsListOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Contains response data for the list operation. */
export type VirtualMachineScaleSetVMExtensionsListResponse = VirtualMachineScaleSetVMExtensionsListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetVMExtensionsListResult;
  };
};

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsReimageOptionalParams
  extends coreHttp.OperationOptions {
  /** Parameters for the Reimaging Virtual machine in ScaleSet. */
  vmScaleSetVMReimageInput?: VirtualMachineScaleSetVMReimageParameters;
}

/** Contains response data for the update operation. */
export type VirtualMachineScaleSetVMsUpdateResponse = VirtualMachineScaleSetVM & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetVM;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsDeleteOptionalParams
  extends coreHttp.OperationOptions {
  /** Optional parameter to force delete a virtual machine from a VM scale set. (Feature in Preview) */
  forceDeletion?: boolean;
}

/** Contains response data for the get operation. */
export type VirtualMachineScaleSetVMsGetResponse = VirtualMachineScaleSetVM & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetVM;
  };
};

/** Contains response data for the getInstanceView operation. */
export type VirtualMachineScaleSetVMsGetInstanceViewResponse = VirtualMachineScaleSetVMInstanceView & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetVMInstanceView;
  };
};

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsListOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply to the operation. Allowed values are 'instanceView'. */
  expand?: string;
  /** The filter to apply to the operation. Allowed values are 'startswith(instanceView/statuses/code, 'PowerState') eq true', 'properties/latestModelApplied eq true', 'properties/latestModelApplied eq false'. */
  filter?: string;
  /** The list parameters. Allowed values are 'instanceView', 'instanceView/statuses'. */
  select?: string;
}

/** Contains response data for the list operation. */
export type VirtualMachineScaleSetVMsListResponse = VirtualMachineScaleSetVMListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetVMListResult;
  };
};

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsPowerOffOptionalParams
  extends coreHttp.OperationOptions {
  /** The parameter to request non-graceful VM shutdown. True value for this flag indicates non-graceful shutdown whereas false indicates otherwise. Default value for this flag is false if not specified */
  skipShutdown?: boolean;
}

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataOptionalParams
  extends coreHttp.OperationOptions {
  /** Expiration duration in minutes for the SAS URIs with a value between 1 to 1440 minutes. <br><br>NOTE: If not specified, SAS URIs will be generated with a default expiration duration of 120 minutes. */
  sasUriExpirationTimeInMinutes?: number;
}

/** Contains response data for the retrieveBootDiagnosticsData operation. */
export type VirtualMachineScaleSetVMsRetrieveBootDiagnosticsDataResponse = RetrieveBootDiagnosticsDataResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: RetrieveBootDiagnosticsDataResult;
  };
};

/** Contains response data for the runCommand operation. */
export type VirtualMachineScaleSetVMsRunCommandResponse = RunCommandResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: RunCommandResult;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Optional parameters. */
export interface VirtualMachineScaleSetVMsListNextOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply to the operation. Allowed values are 'instanceView'. */
  expand?: string;
  /** The filter to apply to the operation. Allowed values are 'startswith(instanceView/statuses/code, 'PowerState') eq true', 'properties/latestModelApplied eq true', 'properties/latestModelApplied eq false'. */
  filter?: string;
  /** The list parameters. Allowed values are 'instanceView', 'instanceView/statuses'. */
  select?: string;
}

/** Contains response data for the listNext operation. */
export type VirtualMachineScaleSetVMsListNextResponse = VirtualMachineScaleSetVMListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineScaleSetVMListResult;
  };
};

/** Contains response data for the exportRequestRateByInterval operation. */
export type LogAnalyticsExportRequestRateByIntervalResponse = LogAnalyticsOperationResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: LogAnalyticsOperationResult;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the exportThrottledRequests operation. */
export type LogAnalyticsExportThrottledRequestsResponse = LogAnalyticsOperationResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: LogAnalyticsOperationResult;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the list operation. */
export type VirtualMachineRunCommandsListResponse = RunCommandListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: RunCommandListResult;
  };
};

/** Contains response data for the get operation. */
export type VirtualMachineRunCommandsGetResponse = RunCommandDocument & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: RunCommandDocument;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type VirtualMachineRunCommandsCreateOrUpdateResponse = VirtualMachineRunCommand & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineRunCommand;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type VirtualMachineRunCommandsUpdateResponse = VirtualMachineRunCommand & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineRunCommand;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Optional parameters. */
export interface VirtualMachineRunCommandsGetByVirtualMachineOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Contains response data for the getByVirtualMachine operation. */
export type VirtualMachineRunCommandsGetByVirtualMachineResponse = VirtualMachineRunCommand & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineRunCommand;
  };
};

/** Optional parameters. */
export interface VirtualMachineRunCommandsListByVirtualMachineOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Contains response data for the listByVirtualMachine operation. */
export type VirtualMachineRunCommandsListByVirtualMachineResponse = VirtualMachineRunCommandsListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineRunCommandsListResult;
  };
};

/** Contains response data for the listNext operation. */
export type VirtualMachineRunCommandsListNextResponse = RunCommandListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: RunCommandListResult;
  };
};

/** Optional parameters. */
export interface VirtualMachineRunCommandsListByVirtualMachineNextOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Contains response data for the listByVirtualMachineNext operation. */
export type VirtualMachineRunCommandsListByVirtualMachineNextResponse = VirtualMachineRunCommandsListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineRunCommandsListResult;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type VirtualMachineScaleSetVMRunCommandsCreateOrUpdateResponse = VirtualMachineRunCommand & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineRunCommand;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type VirtualMachineScaleSetVMRunCommandsUpdateResponse = VirtualMachineRunCommand & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineRunCommand;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Optional parameters. */
export interface VirtualMachineScaleSetVMRunCommandsGetOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Contains response data for the get operation. */
export type VirtualMachineScaleSetVMRunCommandsGetResponse = VirtualMachineRunCommand & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineRunCommand;
  };
};

/** Optional parameters. */
export interface VirtualMachineScaleSetVMRunCommandsListOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Contains response data for the list operation. */
export type VirtualMachineScaleSetVMRunCommandsListResponse = VirtualMachineRunCommandsListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineRunCommandsListResult;
  };
};

/** Optional parameters. */
export interface VirtualMachineScaleSetVMRunCommandsListNextOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: string;
}

/** Contains response data for the listNext operation. */
export type VirtualMachineScaleSetVMRunCommandsListNextResponse = VirtualMachineRunCommandsListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: VirtualMachineRunCommandsListResult;
  };
};

/** Optional parameters. */
export interface ResourceSkusListOptionalParams
  extends coreHttp.OperationOptions {
  /** The filter to apply on the operation. Only **location** filter is supported currently. */
  filter?: string;
}

/** Contains response data for the list operation. */
export type ResourceSkusListResponse = ResourceSkusResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ResourceSkusResult;
  };
};

/** Optional parameters. */
export interface ResourceSkusListNextOptionalParams
  extends coreHttp.OperationOptions {
  /** The filter to apply on the operation. Only **location** filter is supported currently. */
  filter?: string;
}

/** Contains response data for the listNext operation. */
export type ResourceSkusListNextResponse = ResourceSkusResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ResourceSkusResult;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type DisksCreateOrUpdateResponse = Disk & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Disk;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type DisksUpdateResponse = Disk & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Disk;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the get operation. */
export type DisksGetResponse = Disk & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Disk;
  };
};

/** Contains response data for the listByResourceGroup operation. */
export type DisksListByResourceGroupResponse = DiskList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskList;
  };
};

/** Contains response data for the list operation. */
export type DisksListResponse = DiskList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskList;
  };
};

/** Contains response data for the grantAccess operation. */
export type DisksGrantAccessResponse = AccessUri & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: AccessUri;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the listByResourceGroupNext operation. */
export type DisksListByResourceGroupNextResponse = DiskList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskList;
  };
};

/** Contains response data for the listNext operation. */
export type DisksListNextResponse = DiskList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskList;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type SnapshotsCreateOrUpdateResponse = Snapshot & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Snapshot;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type SnapshotsUpdateResponse = Snapshot & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Snapshot;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the get operation. */
export type SnapshotsGetResponse = Snapshot & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Snapshot;
  };
};

/** Contains response data for the listByResourceGroup operation. */
export type SnapshotsListByResourceGroupResponse = SnapshotList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SnapshotList;
  };
};

/** Contains response data for the list operation. */
export type SnapshotsListResponse = SnapshotList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SnapshotList;
  };
};

/** Contains response data for the grantAccess operation. */
export type SnapshotsGrantAccessResponse = AccessUri & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: AccessUri;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the listByResourceGroupNext operation. */
export type SnapshotsListByResourceGroupNextResponse = SnapshotList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SnapshotList;
  };
};

/** Contains response data for the listNext operation. */
export type SnapshotsListNextResponse = SnapshotList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: SnapshotList;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type DiskEncryptionSetsCreateOrUpdateResponse = DiskEncryptionSet & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskEncryptionSet;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type DiskEncryptionSetsUpdateResponse = DiskEncryptionSet & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskEncryptionSet;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the get operation. */
export type DiskEncryptionSetsGetResponse = DiskEncryptionSet & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskEncryptionSet;
  };
};

/** Contains response data for the listByResourceGroup operation. */
export type DiskEncryptionSetsListByResourceGroupResponse = DiskEncryptionSetList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskEncryptionSetList;
  };
};

/** Contains response data for the list operation. */
export type DiskEncryptionSetsListResponse = DiskEncryptionSetList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskEncryptionSetList;
  };
};

/** Contains response data for the listAssociatedResources operation. */
export type DiskEncryptionSetsListAssociatedResourcesResponse = ResourceUriList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ResourceUriList;
  };
};

/** Contains response data for the listByResourceGroupNext operation. */
export type DiskEncryptionSetsListByResourceGroupNextResponse = DiskEncryptionSetList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskEncryptionSetList;
  };
};

/** Contains response data for the listNext operation. */
export type DiskEncryptionSetsListNextResponse = DiskEncryptionSetList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskEncryptionSetList;
  };
};

/** Contains response data for the listAssociatedResourcesNext operation. */
export type DiskEncryptionSetsListAssociatedResourcesNextResponse = ResourceUriList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: ResourceUriList;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type DiskAccessesCreateOrUpdateResponse = DiskAccess & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskAccess;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type DiskAccessesUpdateResponse = DiskAccess & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskAccess;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the get operation. */
export type DiskAccessesGetResponse = DiskAccess & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskAccess;
  };
};

/** Contains response data for the listByResourceGroup operation. */
export type DiskAccessesListByResourceGroupResponse = DiskAccessList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskAccessList;
  };
};

/** Contains response data for the list operation. */
export type DiskAccessesListResponse = DiskAccessList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskAccessList;
  };
};

/** Contains response data for the getPrivateLinkResources operation. */
export type DiskAccessesGetPrivateLinkResourcesResponse = PrivateLinkResourceListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: PrivateLinkResourceListResult;
  };
};

/** Contains response data for the updateAPrivateEndpointConnection operation. */
export type DiskAccessesUpdateAPrivateEndpointConnectionResponse = PrivateEndpointConnection & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: PrivateEndpointConnection;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the getAPrivateEndpointConnection operation. */
export type DiskAccessesGetAPrivateEndpointConnectionResponse = PrivateEndpointConnection & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: PrivateEndpointConnection;
  };
};

/** Contains response data for the listPrivateEndpointConnections operation. */
export type DiskAccessesListPrivateEndpointConnectionsResponse = PrivateEndpointConnectionListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: PrivateEndpointConnectionListResult;
  };
};

/** Contains response data for the listByResourceGroupNext operation. */
export type DiskAccessesListByResourceGroupNextResponse = DiskAccessList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskAccessList;
  };
};

/** Contains response data for the listNext operation. */
export type DiskAccessesListNextResponse = DiskAccessList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskAccessList;
  };
};

/** Contains response data for the listPrivateEndpointConnectionsNext operation. */
export type DiskAccessesListPrivateEndpointConnectionsNextResponse = PrivateEndpointConnectionListResult & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: PrivateEndpointConnectionListResult;
  };
};

/** Contains response data for the get operation. */
export type DiskRestorePointGetResponse = DiskRestorePoint & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskRestorePoint;
  };
};

/** Contains response data for the listByRestorePoint operation. */
export type DiskRestorePointListByRestorePointResponse = DiskRestorePointList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskRestorePointList;
  };
};

/** Contains response data for the listByRestorePointNext operation. */
export type DiskRestorePointListByRestorePointNextResponse = DiskRestorePointList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: DiskRestorePointList;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type GalleriesCreateOrUpdateResponse = Gallery & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Gallery;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type GalleriesUpdateResponse = Gallery & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Gallery;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the get operation. */
export type GalleriesGetResponse = Gallery & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: Gallery;
  };
};

/** Contains response data for the listByResourceGroup operation. */
export type GalleriesListByResourceGroupResponse = GalleryList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryList;
  };
};

/** Contains response data for the list operation. */
export type GalleriesListResponse = GalleryList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryList;
  };
};

/** Contains response data for the listByResourceGroupNext operation. */
export type GalleriesListByResourceGroupNextResponse = GalleryList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryList;
  };
};

/** Contains response data for the listNext operation. */
export type GalleriesListNextResponse = GalleryList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryList;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type GalleryImagesCreateOrUpdateResponse = GalleryImage & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryImage;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type GalleryImagesUpdateResponse = GalleryImage & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryImage;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the get operation. */
export type GalleryImagesGetResponse = GalleryImage & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryImage;
  };
};

/** Contains response data for the listByGallery operation. */
export type GalleryImagesListByGalleryResponse = GalleryImageList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryImageList;
  };
};

/** Contains response data for the listByGalleryNext operation. */
export type GalleryImagesListByGalleryNextResponse = GalleryImageList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryImageList;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type GalleryImageVersionsCreateOrUpdateResponse = GalleryImageVersion & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryImageVersion;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type GalleryImageVersionsUpdateResponse = GalleryImageVersion & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryImageVersion;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Optional parameters. */
export interface GalleryImageVersionsGetOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: ReplicationStatusTypes;
}

/** Contains response data for the get operation. */
export type GalleryImageVersionsGetResponse = GalleryImageVersion & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryImageVersion;
  };
};

/** Contains response data for the listByGalleryImage operation. */
export type GalleryImageVersionsListByGalleryImageResponse = GalleryImageVersionList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryImageVersionList;
  };
};

/** Contains response data for the listByGalleryImageNext operation. */
export type GalleryImageVersionsListByGalleryImageNextResponse = GalleryImageVersionList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryImageVersionList;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type GalleryApplicationsCreateOrUpdateResponse = GalleryApplication & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryApplication;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type GalleryApplicationsUpdateResponse = GalleryApplication & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryApplication;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the get operation. */
export type GalleryApplicationsGetResponse = GalleryApplication & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryApplication;
  };
};

/** Contains response data for the listByGallery operation. */
export type GalleryApplicationsListByGalleryResponse = GalleryApplicationList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryApplicationList;
  };
};

/** Contains response data for the listByGalleryNext operation. */
export type GalleryApplicationsListByGalleryNextResponse = GalleryApplicationList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryApplicationList;
  };
};

/** Contains response data for the createOrUpdate operation. */
export type GalleryApplicationVersionsCreateOrUpdateResponse = GalleryApplicationVersion & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryApplicationVersion;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Contains response data for the update operation. */
export type GalleryApplicationVersionsUpdateResponse = GalleryApplicationVersion & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryApplicationVersion;
    /** The parsed HTTP response headers. */
    [LROSYM]: LROResponseInfo;
  };
};

/** Optional parameters. */
export interface GalleryApplicationVersionsGetOptionalParams
  extends coreHttp.OperationOptions {
  /** The expand expression to apply on the operation. */
  expand?: ReplicationStatusTypes;
}

/** Contains response data for the get operation. */
export type GalleryApplicationVersionsGetResponse = GalleryApplicationVersion & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryApplicationVersion;
  };
};

/** Contains response data for the listByGalleryApplication operation. */
export type GalleryApplicationVersionsListByGalleryApplicationResponse = GalleryApplicationVersionList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryApplicationVersionList;
  };
};

/** Contains response data for the listByGalleryApplicationNext operation. */
export type GalleryApplicationVersionsListByGalleryApplicationNextResponse = GalleryApplicationVersionList & {
  /** The underlying HTTP response. */
  _response: coreHttp.HttpResponse & {
    /** The response body as text (string format) */
    bodyAsText: string;

    /** The response body as parsed JSON or XML */
    parsedBody: GalleryApplicationVersionList;
  };
};

/** Optional parameters. */
export interface ComputeManagementClientOptionalParams
  extends coreHttp.ServiceClientOptions {
  /** server parameter */
  $host?: string;
  /** Overrides client endpoint. */
  endpoint?: string;
}
