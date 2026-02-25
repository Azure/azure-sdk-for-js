// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Api error. */
export interface ApiError {
  /** The Api error details */
  details?: Array<ApiErrorBase>;
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

/** Describes a Virtual Machine Scale Set. */
export interface VirtualMachineScaleSet extends Resource {
  /** The virtual machine scale set sku. */
  sku?: Sku;
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: Plan;
  /** Describes the properties of a Virtual Machine Scale Set. */
  properties?: VirtualMachineScaleSetProperties;
  /** The identity of the virtual machine scale set, if configured. */
  identity?: VirtualMachineScaleSetIdentity;
  /** The virtual machine scale set zones. NOTE: Availability zones can only be set when you create the scale set */
  zones?: Array<string>;
  /** The extended location of the Virtual Machine Scale Set. */
  extendedLocation?: ExtendedLocation;
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

/** Describes the properties of a Virtual Machine Scale Set. */
export interface VirtualMachineScaleSetProperties {
  /** The upgrade policy. */
  upgradePolicy?: UpgradePolicy;
  /** Policy for automatic repairs. */
  automaticRepairsPolicy?: AutomaticRepairsPolicy;
  /** The virtual machine profile. */
  virtualMachineProfile?: VirtualMachineScaleSetVMProfile;
  /** Specifies whether the Virtual Machine Scale Set should be overprovisioned. */
  overprovision?: boolean;
  /** When Overprovision is enabled, extensions are launched only on the requested number of VMs which are finally kept. This property will hence ensure that the extensions do not run on the extra overprovisioned VMs. */
  doNotRunExtensionsOnOverprovisionedVMs?: boolean;
  /** When true this limits the scale set to a single placement group, of max size 100 virtual machines. NOTE: If singlePlacementGroup is true, it may be modified to false. However, if singlePlacementGroup is false, it may not be modified to true. */
  singlePlacementGroup?: boolean;
  /** Whether to force strictly even Virtual Machine distribution cross x-zones in case there is zone outage. zoneBalance property can only be set if the zones property of the scale set contains more than one zone. If there are no zones or only one zone specified, then zoneBalance property should not be set. */
  zoneBalance?: boolean;
  /** Fault Domain count for each placement group. */
  platformFaultDomainCount?: number;
  /** Specifies information about the proximity placement group that the virtual machine scale set should be assigned to. <br><br>Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResource;
  /** Specifies information about the dedicated host group that the virtual machine scale set resides in. <br><br>Minimum api-version: 2020-06-01. */
  hostGroup?: SubResource;
  /** Specifies additional capabilities enabled or disabled on the Virtual Machines in the Virtual Machine Scale Set. For instance: whether the Virtual Machines have the capability to support attaching managed data disks with UltraSSD_LRS storage account type. */
  additionalCapabilities?: AdditionalCapabilities;
  /** Specifies the policies applied when scaling in Virtual Machines in the Virtual Machine Scale Set. */
  scaleInPolicy?: ScaleInPolicy;
  /** Specifies the orchestration mode for the virtual machine scale set. */
  orchestrationMode?: "Uniform" | "Flexible";
  /** Specifies the Spot Restore properties for the virtual machine scale set. */
  spotRestorePolicy?: SpotRestorePolicy;
  /** Specifies the desired targets for mixing Spot and Regular priority VMs within the same VMSS Flex instance. */
  priorityMixPolicy?: PriorityMixPolicy;
}

/** Describes an upgrade policy - automatic, manual, or rolling. */
export interface UpgradePolicy {
  /** Specifies the mode of an upgrade to virtual machines in the scale set.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of updates to virtual machines in the scale set. You do this by using the manualUpgrade action.<br /><br /> **Automatic** - All virtual machines in the scale set are  automatically updated at the same time. */
  mode?: "Automatic" | "Manual" | "Rolling";
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
  /** Indicates whether rolling upgrade policy should be used during Auto OS Upgrade. Default value is false. Auto OS Upgrade will fallback to the default policy if no policy is defined on the VMSS. */
  useRollingUpgradePolicy?: boolean;
}

/** Specifies the configuration parameters for automatic repairs on the virtual machine scale set. */
export interface AutomaticRepairsPolicy {
  /** Specifies whether automatic repairs should be enabled on the virtual machine scale set. The default value is false. */
  enabled?: boolean;
  /** The amount of time for which automatic repairs are suspended due to a state change on VM. The grace time starts after the state change has completed. This helps avoid premature or accidental repairs. The time duration should be specified in ISO 8601 format. The minimum allowed grace period is 10 minutes (PT10M), which is also the default value. The maximum allowed grace period is 90 minutes (PT90M). */
  gracePeriod?: string;
  /** Type of repair action (replace, restart, reimage) that will be used for repairing unhealthy virtual machines in the scale set. Default value is replace. */
  repairAction?: "Replace" | "Restart" | "Reimage";
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
  priority?: "Regular" | "Low" | "Spot";
  /** Specifies the eviction policy for the Azure Spot virtual machine and Azure Spot scale set. <br><br>For Azure Spot virtual machines, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2019-03-01. <br><br>For Azure Spot scale sets, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2017-10-30-preview. */
  evictionPolicy?: "Deallocate" | "Delete";
  /** Specifies the billing related details of a Azure Spot VMSS. <br><br>Minimum api-version: 2019-03-01. */
  billingProfile?: BillingProfile;
  /** Specifies Scheduled Event related configurations. */
  scheduledEventsProfile?: ScheduledEventsProfile;
  /** UserData for the virtual machines in the scale set, which must be base-64 encoded. Customer should not pass any secrets in here. <br><br>Minimum api-version: 2021-03-01 */
  userData?: string;
  /** Specifies the capacity reservation related details of a scale set. <br><br>Minimum api-version: 2021-04-01. */
  capacityReservation?: CapacityReservationProfile;
  /** Specifies the gallery applications that should be made available to the VM/VMSS */
  applicationProfile?: ApplicationProfile;
  /** Specifies the hardware profile related details of a scale set. <br><br>Minimum api-version: 2021-11-01. */
  hardwareProfile?: VirtualMachineScaleSetHardwareProfile;
}

/** Describes a virtual machine scale set OS profile. */
export interface VirtualMachineScaleSetOSProfile {
  /** Specifies the computer name prefix for all of the virtual machines in the scale set. Computer name prefixes must be 1 to 15 characters long. */
  computerNamePrefix?: string;
  /** Specifies the name of the administrator account. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters */
  adminUsername?: string;
  /** Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection) */
  adminPassword?: string;
  /** Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. <br><br> For using cloud-init for your VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init) */
  customData?: string;
  /** Specifies Windows operating system settings on the virtual machine. */
  windowsConfiguration?: WindowsConfiguration;
  /** Specifies the Linux operating system settings on the virtual machine. <br><br>For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros). */
  linuxConfiguration?: LinuxConfiguration;
  /** Specifies set of certificates that should be installed onto the virtual machines in the scale set. To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  secrets?: Array<VaultSecretGroup>;
  /** Specifies whether extension operations should be allowed on the virtual machine scale set. <br><br>This may only be set to False when no extensions are present on the virtual machine scale set. */
  allowExtensionOperations?: boolean;
}

/** Specifies Windows operating system settings on the virtual machine. */
export interface WindowsConfiguration {
  /** Indicates whether virtual machine agent should be provisioned on the virtual machine. <br><br> When this property is not specified in the request body, default behavior is to set it to true.  This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later. */
  provisionVMAgent?: boolean;
  /** Indicates whether Automatic Updates is enabled for the Windows virtual machine. Default value is true. <br><br> For virtual machine scale sets, this property can be updated and updates will take effect on OS reprovisioning. */
  enableAutomaticUpdates?: boolean;
  /** Specifies the time zone of the virtual machine. e.g. "Pacific Standard Time". <br><br> Possible values can be [TimeZoneInfo.Id](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.id?#System_TimeZoneInfo_Id) value from time zones returned by [TimeZoneInfo.GetSystemTimeZones](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.getsystemtimezones). */
  timeZone?: string;
  /** Specifies additional base-64 encoded XML formatted information that can be included in the Unattend.xml file, which is used by Windows Setup. */
  additionalUnattendContent?: Array<AdditionalUnattendContent>;
  /** [Preview Feature] Specifies settings related to VM Guest Patching on Windows. */
  patchSettings?: PatchSettings;
  /** Specifies the Windows Remote Management listeners. This enables remote Windows PowerShell. */
  winRM?: WinRMConfiguration;
  /** Indicates whether VMAgent Platform Updates is enabled for the Windows virtual machine. Default value is false. */
  enableVMAgentPlatformUpdates?: boolean;
}

/** Specifies additional XML formatted information that can be included in the Unattend.xml file, which is used by Windows Setup. Contents are defined by setting name, component name, and the pass in which the content is applied. */
export interface AdditionalUnattendContent {
  /** The pass name. Currently, the only allowable value is OobeSystem. */
  passName?: "OobeSystem";
  /** The component name. Currently, the only allowable value is Microsoft-Windows-Shell-Setup. */
  componentName?: "Microsoft-Windows-Shell-Setup";
  /** Specifies the name of the setting to which the content applies. Possible values are: FirstLogonCommands and AutoLogon. */
  settingName?: "AutoLogon" | "FirstLogonCommands";
  /** Specifies the XML formatted content that is added to the unattend.xml file for the specified path and component. The XML must be less than 4KB and must include the root element for the setting or feature that is being inserted. */
  content?: string;
}

/** Specifies settings related to VM Guest Patching on Windows. */
export interface PatchSettings {
  /** Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of patches to a virtual machine. You do this by applying patches manually inside the VM. In this mode, automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates must be false<br /><br /> **AutomaticByOS** - The virtual machine will automatically be updated by the OS. The property WindowsConfiguration.enableAutomaticUpdates must be true. <br /><br /> **AutomaticByPlatform** - the virtual machine will automatically updated by the platform. The properties provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true */
  patchMode?: "Manual" | "AutomaticByOS" | "AutomaticByPlatform";
  /** Enables customers to patch their Azure VMs without requiring a reboot. For enableHotpatching, the 'provisionVMAgent' must be set to true and 'patchMode' must be set to 'AutomaticByPlatform'. */
  enableHotpatching?: boolean;
  /** Specifies the mode of VM Guest patch assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine.<br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
  assessmentMode?: "ImageDefault" | "AutomaticByPlatform";
  /** Specifies additional settings for patch mode AutomaticByPlatform in VM Guest Patching on Windows. */
  automaticByPlatformSettings?: WindowsVMGuestPatchAutomaticByPlatformSettings;
}

/** Specifies additional settings to be applied when patch mode AutomaticByPlatform is selected in Windows patch settings. */
export interface WindowsVMGuestPatchAutomaticByPlatformSettings {
  /** Specifies the reboot setting for all AutomaticByPlatform patch installation operations. */
  rebootSetting?: "Unknown" | "IfRequired" | "Never" | "Always";
}

/** Describes Windows Remote Management configuration of the VM */
export interface WinRMConfiguration {
  /** The list of Windows Remote Management listeners */
  listeners?: Array<WinRMListener>;
}

/** Describes Protocol and thumbprint of Windows Remote Management listener */
export interface WinRMListener {
  /** Specifies the protocol of WinRM listener. <br><br> Possible values are: <br>**http** <br><br> **https** */
  protocol?: "Http" | "Https";
  /** This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be It is the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  certificateUrl?: string;
}

/** Specifies the Linux operating system settings on the virtual machine. <br><br>For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros). */
export interface LinuxConfiguration {
  /** Specifies whether password authentication should be disabled. */
  disablePasswordAuthentication?: boolean;
  /** Specifies the ssh key configuration for a Linux OS. */
  ssh?: SshConfiguration;
  /** Indicates whether virtual machine agent should be provisioned on the virtual machine. <br><br> When this property is not specified in the request body, default behavior is to set it to true.  This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later. */
  provisionVMAgent?: boolean;
  /** [Preview Feature] Specifies settings related to VM Guest Patching on Linux. */
  patchSettings?: LinuxPatchSettings;
  /** Indicates whether VMAgent Platform Updates is enabled for the Linux virtual machine. Default value is false. */
  enableVMAgentPlatformUpdates?: boolean;
}

/** SSH configuration for Linux based VMs running on Azure */
export interface SshConfiguration {
  /** The list of SSH public keys used to authenticate with linux based VMs. */
  publicKeys?: Array<SshPublicKey>;
}

/** Contains information about SSH certificate public key and the path on the Linux VM where the public key is placed. */
export interface SshPublicKey {
  /** Specifies the full path on the created VM where ssh public key is stored. If the file already exists, the specified key is appended to the file. Example: /home/user/.ssh/authorized_keys */
  path?: string;
  /** SSH public key certificate used to authenticate with the VM through ssh. The key needs to be at least 2048-bit and in ssh-rsa format. <br><br> For creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure]https://docs.microsoft.com/azure/virtual-machines/linux/create-ssh-keys-detailed). */
  keyData?: string;
}

/** Specifies settings related to VM Guest Patching on Linux. */
export interface LinuxPatchSettings {
  /** Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - The virtual machine's default patching configuration is used. <br /><br /> **AutomaticByPlatform** - The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true */
  patchMode?: "ImageDefault" | "AutomaticByPlatform";
  /** Specifies the mode of VM Guest Patch Assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine. <br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
  assessmentMode?: "ImageDefault" | "AutomaticByPlatform";
  /** Specifies additional settings for patch mode AutomaticByPlatform in VM Guest Patching on Linux. */
  automaticByPlatformSettings?: LinuxVMGuestPatchAutomaticByPlatformSettings;
}

/** Specifies additional settings to be applied when patch mode AutomaticByPlatform is selected in Linux patch settings. */
export interface LinuxVMGuestPatchAutomaticByPlatformSettings {
  /** Specifies the reboot setting for all AutomaticByPlatform patch installation operations. */
  rebootSetting?: "Unknown" | "IfRequired" | "Never" | "Always";
}

/** Describes a set of certificates which are all in the same Key Vault. */
export interface VaultSecretGroup {
  /** The relative URL of the Key Vault containing all of the certificates in VaultCertificates. */
  sourceVault?: SubResource;
  /** The list of key vault references in SourceVault which contain certificates. */
  vaultCertificates?: Array<VaultCertificate>;
}

export interface SubResource {
  /** Resource Id */
  id?: string;
}

/** Describes a single certificate reference in a Key Vault, and where the certificate should reside on the VM. */
export interface VaultCertificate {
  /** This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be It is the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  certificateUrl?: string;
  /** For Windows VMs, specifies the certificate store on the Virtual Machine to which the certificate should be added. The specified certificate store is implicitly in the LocalMachine account. <br><br>For Linux VMs, the certificate file is placed under the /var/lib/waagent directory, with the file name &lt;UppercaseThumbprint&gt;.crt for the X509 certificate file and &lt;UppercaseThumbprint&gt;.prv for private key. Both of these files are .pem formatted. */
  certificateStore?: string;
}

/** Describes a virtual machine scale set storage profile. */
export interface VirtualMachineScaleSetStorageProfile {
  /** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. */
  imageReference?: ImageReference;
  /** Specifies information about the operating system disk used by the virtual machines in the scale set. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  osDisk?: VirtualMachineScaleSetOSDisk;
  /** Specifies the parameters that are used to add data disks to the virtual machines in the scale set. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  dataDisks?: Array<VirtualMachineScaleSetDataDisk>;
  diskControllerType?: string;
}

/** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. NOTE: Image reference publisher and offer can only be set when you create the scale set. */
export interface ImageReference extends SubResource {
  /** The image publisher. */
  publisher?: string;
  /** Specifies the offer of the platform image or marketplace image used to create the virtual machine. */
  offer?: string;
  /** The image SKU. */
  sku?: string;
  /** Specifies the version of the platform image or marketplace image used to create the virtual machine. The allowed formats are Major.Minor.Build or 'latest'. Major, Minor, and Build are decimal numbers. Specify 'latest' to use the latest version of an image available at deploy time. Even if you use 'latest', the VM image will not automatically update after deploy time even if a new version becomes available. Please do not use field 'version' for gallery image deployment, gallery image should always use 'id' field for deployment, to use 'latest' version of gallery image, just set '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{imageName}' in the 'id' field without version input. */
  version?: string;
  /** Specified the shared gallery image unique id for vm deployment. This can be fetched from shared gallery image GET call. */
  sharedGalleryImageId?: string;
  /** Specified the community gallery image unique id for vm deployment. This can be fetched from community gallery image GET call. */
  communityGalleryImageId?: string;
}

/** Describes a virtual machine scale set operating system disk. */
export interface VirtualMachineScaleSetOSDisk {
  /** The disk name. */
  name?: string;
  /** Specifies the caching requirements. <br><br> Possible values are: <br><br> **None** <br><br> **ReadOnly** <br><br> **ReadWrite** <br><br> Default: **None for Standard storage. ReadOnly for Premium storage** */
  caching?: "None" | "ReadOnly" | "ReadWrite";
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies how the virtual machines in the scale set should be created.<br><br> The only allowed value is: **FromImage** \u2013 This value is used when you are using an image to create the virtual machine. If you are using a platform image, you also use the imageReference element described above. If you are using a marketplace image, you  also use the plan element previously described. */
  createOption: "FromImage" | "Empty" | "Attach";
  /** Specifies the ephemeral disk Settings for the operating system disk used by the virtual machine scale set. */
  diffDiskSettings?: DiffDiskSettings;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. <br><br> diskSizeGB is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023 */
  diskSizeGB?: number;
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  osType?: "Windows" | "Linux";
  /** Specifies information about the unmanaged user image to base the scale set on. */
  image?: VirtualHardDisk;
  /** Specifies the container urls that are used to store operating system disks for the scale set. */
  vhdContainers?: Array<string>;
  /** The managed disk parameters. */
  managedDisk?: VirtualMachineScaleSetManagedDiskParameters;
  /** Specifies whether OS Disk should be deleted or detached upon VMSS Flex deletion (This feature is available for VMSS with Flexible OrchestrationMode only). <br><br> Possible values: <br><br> **Delete** If this value is used, the OS disk is deleted when VMSS Flex VM is deleted.<br><br> **Detach** If this value is used, the OS disk is retained after VMSS Flex VM is deleted. <br><br> The default value is set to **Delete**. For an Ephemeral OS Disk, the default value is set to **Delete**. User cannot change the delete option for Ephemeral OS Disk. */
  deleteOption?: "Delete" | "Detach";
}

/** Describes the parameters of ephemeral disk settings that can be specified for operating system disk. <br><br> NOTE: The ephemeral disk settings can only be specified for managed disk. */
export interface DiffDiskSettings {
  /** Specifies the ephemeral disk settings for operating system disk. */
  option?: "Local";
  /** Specifies the ephemeral disk placement for operating system disk.<br><br> Possible values are: <br><br> **CacheDisk** <br><br> **ResourceDisk** <br><br> Default: **CacheDisk** if one is configured for the VM size otherwise **ResourceDisk** is used.<br><br> Refer to VM size documentation for Windows VM at https://docs.microsoft.com/azure/virtual-machines/windows/sizes and Linux VM at https://docs.microsoft.com/azure/virtual-machines/linux/sizes to check which VM sizes exposes a cache disk. */
  placement?: "CacheDisk" | "ResourceDisk";
}

/** Describes the uri of a disk. */
export interface VirtualHardDisk {
  /** Specifies the virtual hard disk's uri. */
  uri?: string;
}

/** Describes the parameters of a ScaleSet managed disk. */
export interface VirtualMachineScaleSetManagedDiskParameters {
  /** Specifies the storage account type for the managed disk. NOTE: UltraSSD_LRS can only be used with data disks, it cannot be used with OS Disk. */
  storageAccountType?:
    | "Standard_LRS"
    | "Premium_LRS"
    | "StandardSSD_LRS"
    | "UltraSSD_LRS"
    | "Premium_ZRS"
    | "StandardSSD_ZRS"
    | "PremiumV2_LRS";
  /** Specifies the customer managed disk encryption set resource id for the managed disk. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
  /** Specifies the security profile for the managed disk. */
  securityProfile?: VMDiskSecurityProfile;
}

/** Describes the parameter of customer managed disk encryption set resource id that can be specified for disk. <br><br> NOTE: The disk encryption set resource id can only be specified for managed disk. Please refer https://aka.ms/mdssewithcmkoverview for more details. */
export interface DiskEncryptionSetParameters extends SubResource {}

/** Specifies the security profile settings for the managed disk. <br><br> NOTE: It can only be set for Confidential VMs */
export interface VMDiskSecurityProfile {
  /** Specifies the EncryptionType of the managed disk. <br> It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob, and VMGuestStateOnly for encryption of just the VMGuestState blob. <br><br> NOTE: It can be set for only Confidential VMs. */
  securityEncryptionType?: "VMGuestStateOnly" | "DiskWithVMGuestState";
  /** Specifies the customer managed disk encryption set resource id for the managed disk that is used for Customer Managed Key encrypted ConfidentialVM OS Disk and VMGuest blob. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
}

/** Describes a virtual machine scale set data disk. */
export interface VirtualMachineScaleSetDataDisk {
  /** The disk name. */
  name?: string;
  /** Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. */
  lun: number;
  /** Specifies the caching requirements. <br><br> Possible values are: <br><br> **None** <br><br> **ReadOnly** <br><br> **ReadWrite** <br><br> Default: **None for Standard storage. ReadOnly for Premium storage** */
  caching?: "None" | "ReadOnly" | "ReadWrite";
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** The create option. */
  createOption: "FromImage" | "Empty" | "Attach";
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. <br><br> diskSizeGB is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023 */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: VirtualMachineScaleSetManagedDiskParameters;
  /** Specifies the Read-Write IOPS for the managed disk. Should be used only when StorageAccountType is UltraSSD_LRS. If not specified, a default value would be assigned based on diskSizeGB. */
  diskIOPSReadWrite?: number;
  /** Specifies the bandwidth in MB per second for the managed disk. Should be used only when StorageAccountType is UltraSSD_LRS. If not specified, a default value would be assigned based on diskSizeGB. */
  diskMBpsReadWrite?: number;
  /** Specifies whether data disk should be deleted or detached upon VMSS Flex deletion (This feature is available for VMSS with Flexible OrchestrationMode only).<br><br> Possible values: <br><br> **Delete** If this value is used, the data disk is deleted when the VMSS Flex VM is deleted.<br><br> **Detach** If this value is used, the data disk is retained after VMSS Flex VM is deleted.<br><br> The default value is set to **Delete**. */
  deleteOption?: "Delete" | "Detach";
}

/** Describes a virtual machine scale set network profile. */
export interface VirtualMachineScaleSetNetworkProfile {
  /** A reference to a load balancer probe used to determine the health of an instance in the virtual machine scale set. The reference will be in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes/{probeName}'. */
  healthProbe?: ApiEntityReference;
  /** The list of network configurations. */
  networkInterfaceConfigurations?: Array<VirtualMachineScaleSetNetworkConfiguration>;
  /** specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations for Virtual Machine Scale Set with orchestration mode 'Flexible' */
  networkApiVersion?: "2020-11-01";
}

/** The API entity reference. */
export interface ApiEntityReference {
  /** The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/... */
  id?: string;
}

/** Describes a virtual machine scale set network profile's network configurations. */
export interface VirtualMachineScaleSetNetworkConfiguration extends SubResource {
  /** The network configuration name. */
  name: string;
  /** Describes a virtual machine scale set network profile's IP configuration. */
  properties?: VirtualMachineScaleSetNetworkConfigurationProperties;
}

/** Describes a virtual machine scale set network profile's IP configuration. */
export interface VirtualMachineScaleSetNetworkConfigurationProperties {
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
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
  ipConfigurations: Array<VirtualMachineScaleSetIPConfiguration>;
  /** Whether IP forwarding enabled on this NIC. */
  enableIPForwarding?: boolean;
  /** Specify what happens to the network interface when the VM is deleted */
  deleteOption?: "Delete" | "Detach";
}

/** Describes a virtual machines scale sets network configuration's DNS settings. */
export interface VirtualMachineScaleSetNetworkConfigurationDnsSettings {
  /** List of DNS servers IP addresses */
  dnsServers?: Array<string>;
}

/** Describes a virtual machine scale set network profile's IP configuration. */
export interface VirtualMachineScaleSetIPConfiguration extends SubResource {
  /** The IP configuration name. */
  name: string;
  /** Describes a virtual machine scale set network profile's IP configuration properties. */
  properties?: VirtualMachineScaleSetIPConfigurationProperties;
}

/** Describes a virtual machine scale set network profile's IP configuration properties. */
export interface VirtualMachineScaleSetIPConfigurationProperties {
  /** Specifies the identifier of the subnet. */
  subnet?: ApiEntityReference;
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** The publicIPAddressConfiguration. */
  publicIPAddressConfiguration?: VirtualMachineScaleSetPublicIPAddressConfiguration;
  /** Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. */
  privateIPAddressVersion?: "IPv4" | "IPv6";
  /** Specifies an array of references to backend address pools of application gateways. A scale set can reference backend address pools of multiple application gateways. Multiple scale sets cannot use the same application gateway. */
  applicationGatewayBackendAddressPools?: Array<SubResource>;
  /** Specifies an array of references to application security group. */
  applicationSecurityGroups?: Array<SubResource>;
  /** Specifies an array of references to backend address pools of load balancers. A scale set can reference backend address pools of one public and one internal load balancer. Multiple scale sets cannot use the same basic sku load balancer. */
  loadBalancerBackendAddressPools?: Array<SubResource>;
  /** Specifies an array of references to inbound Nat pools of the load balancers. A scale set can reference inbound nat pools of one public and one internal load balancer. Multiple scale sets cannot use the same basic sku load balancer. */
  loadBalancerInboundNatPools?: Array<SubResource>;
}

/** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
export interface VirtualMachineScaleSetPublicIPAddressConfiguration {
  /** The publicIP address configuration name. */
  name: string;
  /** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
  properties?: VirtualMachineScaleSetPublicIPAddressConfigurationProperties;
  /** Describes the public IP Sku. It can only be set with OrchestrationMode as Flexible. */
  sku?: PublicIPAddressSku;
}

/** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
export interface VirtualMachineScaleSetPublicIPAddressConfigurationProperties {
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** The dns settings to be applied on the publicIP addresses . */
  dnsSettings?: VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings;
  /** The list of IP tags associated with the public IP address. */
  ipTags?: Array<VirtualMachineScaleSetIpTag>;
  /** The PublicIPPrefix from which to allocate publicIP addresses. */
  publicIPPrefix?: SubResource;
  /** Available from Api-Version 2019-07-01 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'. */
  publicIPAddressVersion?: "IPv4" | "IPv6";
  /** Specify what happens to the public IP when the VM is deleted */
  deleteOption?: "Delete" | "Detach";
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

/** Describes the public IP Sku. It can only be set with OrchestrationMode as Flexible. */
export interface PublicIPAddressSku {
  /** Specify public IP sku name */
  name?: "Basic" | "Standard";
  /** Specify public IP sku tier */
  tier?: "Regional" | "Global";
}

/** Specifies the Security profile settings for the virtual machine or virtual machine scale set. */
export interface SecurityProfile {
  /** Specifies the security settings like secure boot and vTPM used while creating the virtual machine. <br><br>Minimum api-version: 2020-12-01 */
  uefiSettings?: UefiSettings;
  /** This property can be used by user in the request to enable or disable the Host Encryption for the virtual machine or virtual machine scale set. This will enable the encryption for all the disks including Resource/Temp disk at host itself. <br><br> Default: The Encryption at host will be disabled unless this property is set to true for the resource. */
  encryptionAtHost?: boolean;
  /** Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. <br><br> Default: UefiSettings will not be enabled unless this property is set. */
  securityType?: "TrustedLaunch" | "ConfidentialVM";
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
  /** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. <br>**NOTE**: If storageUri is being specified then ensure that the storage account is in the same region and subscription as the VM. <br><br> You can easily view the output of your console log. <br><br> Azure also enables you to see a screenshot of the VM from the hypervisor. */
  bootDiagnostics?: BootDiagnostics;
}

/** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. <br><br> You can easily view the output of your console log. <br><br> Azure also enables you to see a screenshot of the VM from the hypervisor. */
export interface BootDiagnostics {
  /** Whether boot diagnostics should be enabled on the Virtual Machine. */
  enabled?: boolean;
  /** Uri of the storage account to use for placing the console output and screenshot. <br><br>If storageUri is not specified while enabling boot diagnostics, managed storage will be used. */
  storageUri?: string;
}

/** Describes a virtual machine scale set extension profile. */
export interface VirtualMachineScaleSetExtensionProfile {
  /** The virtual machine scale set child extension resources. */
  extensions?: Array<VirtualMachineScaleSetExtension>;
  /** Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). <br><br> Minimum api-version: 2020-06-01 */
  extensionsTimeBudget?: string;
}

/** Describes a Virtual Machine Scale Set Extension. */
export interface VirtualMachineScaleSetExtension extends SubResourceReadOnly {
  /** The name of the extension. */
  name?: string;
  /** Describes the properties of a Virtual Machine Scale Set Extension. */
  properties?: VirtualMachineScaleSetExtensionProperties;
}

/** Describes the properties of a Virtual Machine Scale Set Extension. */
export interface VirtualMachineScaleSetExtensionProperties {
  /** If a value is provided and is different from the previous value, the extension handler will be forced to update even if the extension configuration has not changed. */
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
  /** Collection of extension names after which this extension needs to be provisioned. */
  provisionAfterExtensions?: Array<string>;
  /** Indicates whether failures stemming from the extension will be suppressed (Operational failures such as not connecting to the VM will not be suppressed regardless of this value). The default is false. */
  suppressFailures?: boolean;
  /** The extensions protected settings that are passed by reference, and consumed from key vault */
  protectedSettingsFromKeyVault?: KeyVaultSecretReference;
}

/** Describes a reference to Key Vault Secret */
export interface KeyVaultSecretReference {
  /** The URL referencing a secret in a Key Vault. */
  secretUrl: string;
  /** The relative URL of the Key Vault containing the secret. */
  sourceVault: SubResource;
}

export interface SubResourceReadOnly {}

/** Specifies the billing related details of a Azure Spot VM or VMSS. <br><br>Minimum api-version: 2019-03-01. */
export interface BillingProfile {
  /** Specifies the maximum price you are willing to pay for a Azure Spot VM/VMSS. This price is in US Dollars. <br><br> This price will be compared with the current Azure Spot price for the VM size. Also, the prices are compared at the time of create/update of Azure Spot VM/VMSS and the operation will only succeed if  the maxPrice is greater than the current Azure Spot price. <br><br> The maxPrice will also be used for evicting a Azure Spot VM/VMSS if the current Azure Spot price goes beyond the maxPrice after creation of VM/VMSS. <br><br> Possible values are: <br><br> - Any decimal value greater than zero. Example: 0.01538 <br><br> -1 – indicates default price to be up-to on-demand. <br><br> You can set the maxPrice to -1 to indicate that the Azure Spot VM/VMSS should not be evicted for price reasons. Also, the default max price is -1 if it is not provided by you. <br><br>Minimum api-version: 2019-03-01. */
  maxPrice?: number;
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

/** The parameters of a capacity reservation Profile. */
export interface CapacityReservationProfile {
  /** Specifies the capacity reservation group resource id that should be used for allocating the virtual machine or scaleset vm instances provided enough capacity has been reserved. Please refer to https://aka.ms/CapacityReservation for more details. */
  capacityReservationGroup?: SubResource;
}

/** Contains the list of gallery applications that should be made available to the VM/VMSS */
export interface ApplicationProfile {
  /** Specifies the gallery applications that should be made available to the VM/VMSS */
  galleryApplications?: Array<VMGalleryApplication>;
}

/** Specifies the required information to reference a compute gallery application version */
export interface VMGalleryApplication {
  /** Optional, Specifies a passthrough value for more generic context. */
  tags?: string;
  /** Optional, Specifies the order in which the packages have to be installed */
  order?: number;
  /** Specifies the GalleryApplicationVersion resource id on the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{application}/versions/{version} */
  packageReferenceId: string;
  /** Optional, Specifies the uri to an azure blob that will replace the default configuration for the package if provided */
  configurationReference?: string;
  /** Optional, If true, any failure for any operation in the VmApplication will fail the deployment */
  treatFailureAsDeploymentFailure?: boolean;
  /** If set to true, when a new Gallery Application version is available in PIR/SIG, it will be automatically updated for the VM/VMSS */
  enableAutomaticUpgrade?: boolean;
}

/** Specifies the hardware settings for the virtual machine scale set. */
export interface VirtualMachineScaleSetHardwareProfile {
  /** Specifies the properties for customizing the size of the virtual machine. Minimum api-version: 2021-11-01. <br><br> Please follow the instructions in [VM Customization](https://aka.ms/vmcustomization) for more details. */
  vmSizeProperties?: VMSizeProperties;
}

/** Specifies VM Size Property settings on the virtual machine. */
export interface VMSizeProperties {
  /** Specifies the number of vCPUs available for the VM. <br><br> When this property is not specified in the request body the default behavior is to set it to the value of vCPUs available for that VM size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list) . */
  vCPUsAvailable?: number;
  /** Specifies the vCPU to physical core ratio. <br><br> When this property is not specified in the request body the default behavior is set to the value of vCPUsPerCore for the VM Size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list) <br><br> Setting this property to 1 also means that hyper-threading is disabled. */
  vCPUsPerCore?: number;
}

/** Enables or disables a capability on the virtual machine or virtual machine scale set. */
export interface AdditionalCapabilities {
  /** The flag that enables or disables a capability to have one or more managed data disks with UltraSSD_LRS storage account type on the VM or VMSS. Managed disks with storage account type UltraSSD_LRS can be added to a virtual machine or virtual machine scale set only if this property is enabled. */
  ultraSSDEnabled?: boolean;
  /** The flag that enables or disables hibernation capability on the VM. */
  hibernationEnabled?: boolean;
}

/** Describes a scale-in policy for a virtual machine scale set. */
export interface ScaleInPolicy {
  /** The rules to be followed when scaling-in a virtual machine scale set. <br><br> Possible values are: <br><br> **Default** When a virtual machine scale set is scaled in, the scale set will first be balanced across zones if it is a zonal scale set. Then, it will be balanced across Fault Domains as far as possible. Within each Fault Domain, the virtual machines chosen for removal will be the newest ones that are not protected from scale-in. <br><br> **OldestVM** When a virtual machine scale set is being scaled-in, the oldest virtual machines that are not protected from scale-in will be chosen for removal. For zonal virtual machine scale sets, the scale set will first be balanced across zones. Within each zone, the oldest virtual machines that are not protected will be chosen for removal. <br><br> **NewestVM** When a virtual machine scale set is being scaled-in, the newest virtual machines that are not protected from scale-in will be chosen for removal. For zonal virtual machine scale sets, the scale set will first be balanced across zones. Within each zone, the newest virtual machines that are not protected will be chosen for removal. <br><br> */
  rules?: Array<"Default" | "OldestVM" | "NewestVM">;
  /** This property allows you to specify if virtual machines chosen for removal have to be force deleted when a virtual machine scale set is being scaled-in.(Feature in Preview) */
  forceDeletion?: boolean;
}

/** Specifies the Spot-Try-Restore properties for the virtual machine scale set. <br><br> With this property customer can enable or disable automatic restore of the evicted Spot VMSS VM instances opportunistically based on capacity availability and pricing constraint. */
export interface SpotRestorePolicy {
  /** Enables the Spot-Try-Restore feature where evicted VMSS SPOT instances will be tried to be restored opportunistically based on capacity availability and pricing constraints */
  enabled?: boolean;
  /** Timeout value expressed as an ISO 8601 time duration after which the platform will not try to restore the VMSS SPOT instances */
  restoreTimeout?: string;
}

/** Specifies the target splits for Spot and Regular priority VMs within a scale set with flexible orchestration mode. <br><br>With this property the customer is able to specify the base number of regular priority VMs created as the VMSS flex instance scales out and the split between Spot and Regular priority VMs after this base target has been reached. */
export interface PriorityMixPolicy {
  /** The base number of regular priority VMs that will be created in this scale set as it scales out. */
  baseRegularPriorityCount?: number;
  /** The percentage of VM instances, after the base regular priority count has been reached, that are expected to use regular priority. */
  regularPriorityPercentageAboveBase?: number;
}

/** Identity for the virtual machine scale set. */
export interface VirtualMachineScaleSetIdentity {
  /** The type of identity used for the virtual machine scale set. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine scale set. */
  type?: "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";
  /** The list of user identities associated with the virtual machine scale set. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserAssignedIdentitiesValue>;
}

export interface UserAssignedIdentitiesValue {}

/** The complex type of the extended location. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name?: string;
  /** The type of the extended location. */
  type?: "EdgeZone";
}

/** The Resource model definition. */
export interface Resource {
  /** Resource location */
  location: string;
  /** Resource tags */
  tags?: Record<string, string>;
}

/** Describes a Virtual Machine Scale Set. */
export interface VirtualMachineScaleSetUpdate extends UpdateResource {
  /** The virtual machine scale set sku. */
  sku?: Sku;
  /** The purchase plan when deploying a virtual machine scale set from VM Marketplace images. */
  plan?: Plan;
  /** Describes the properties of a Virtual Machine Scale Set. */
  properties?: VirtualMachineScaleSetUpdateProperties;
  /** The identity of the virtual machine scale set, if configured. */
  identity?: VirtualMachineScaleSetIdentity;
}

/** Describes the properties of a Virtual Machine Scale Set. */
export interface VirtualMachineScaleSetUpdateProperties {
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
  /** Specifies the policies applied when scaling in Virtual Machines in the Virtual Machine Scale Set. */
  scaleInPolicy?: ScaleInPolicy;
  /** Specifies information about the proximity placement group that the virtual machine scale set should be assigned to. <br><br>Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResource;
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
  /** UserData for the VM, which must be base-64 encoded. Customer should not pass any secrets in here. <br><br>Minimum api-version: 2021-03-01 */
  userData?: string;
  /** Specifies the hardware profile related details of a scale set. <br><br>Minimum api-version: 2021-11-01. */
  hardwareProfile?: VirtualMachineScaleSetHardwareProfile;
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
  secrets?: Array<VaultSecretGroup>;
}

/** Describes a virtual machine scale set storage profile. */
export interface VirtualMachineScaleSetUpdateStorageProfile {
  /** The image reference. */
  imageReference?: ImageReference;
  /** The OS disk. */
  osDisk?: VirtualMachineScaleSetUpdateOSDisk;
  /** The data disks. */
  dataDisks?: Array<VirtualMachineScaleSetDataDisk>;
  diskControllerType?: string;
}

/** Describes virtual machine scale set operating system disk Update Object. This should be used for Updating VMSS OS Disk. */
export interface VirtualMachineScaleSetUpdateOSDisk {
  /** The caching type. */
  caching?: "None" | "ReadOnly" | "ReadWrite";
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. <br><br> diskSizeGB is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023 */
  diskSizeGB?: number;
  /** The Source User Image VirtualHardDisk. This VirtualHardDisk will be copied before using it to attach to the Virtual Machine. If SourceImage is provided, the destination VirtualHardDisk should not exist. */
  image?: VirtualHardDisk;
  /** The list of virtual hard disk container uris. */
  vhdContainers?: Array<string>;
  /** The managed disk parameters. */
  managedDisk?: VirtualMachineScaleSetManagedDiskParameters;
  /** Specifies whether OS Disk should be deleted or detached upon VMSS Flex deletion (This feature is available for VMSS with Flexible OrchestrationMode only). <br><br> Possible values: <br><br> **Delete** If this value is used, the OS disk is deleted when VMSS Flex VM is deleted.<br><br> **Detach** If this value is used, the OS disk is retained after VMSS Flex VM is deleted. <br><br> The default value is set to **Delete**. For an Ephemeral OS Disk, the default value is set to **Delete**. User cannot change the delete option for Ephemeral OS Disk. */
  deleteOption?: "Delete" | "Detach";
}

/** Describes a virtual machine scale set network profile. */
export interface VirtualMachineScaleSetUpdateNetworkProfile {
  /** A reference to a load balancer probe used to determine the health of an instance in the virtual machine scale set. The reference will be in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes/{probeName}'. */
  healthProbe?: ApiEntityReference;
  /** The list of network configurations. */
  networkInterfaceConfigurations?: Array<VirtualMachineScaleSetUpdateNetworkConfiguration>;
  /** specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations for Virtual Machine Scale Set with orchestration mode 'Flexible' */
  networkApiVersion?: "2020-11-01";
}

/** Describes a virtual machine scale set network profile's network configurations. */
export interface VirtualMachineScaleSetUpdateNetworkConfiguration extends SubResource {
  /** The network configuration name. */
  name?: string;
  /** Describes a virtual machine scale set updatable network profile's IP configuration.Use this object for updating network profile's IP Configuration. */
  properties?: VirtualMachineScaleSetUpdateNetworkConfigurationProperties;
}

/** Describes a virtual machine scale set updatable network profile's IP configuration.Use this object for updating network profile's IP Configuration. */
export interface VirtualMachineScaleSetUpdateNetworkConfigurationProperties {
  /** Whether this is a primary NIC on a virtual machine. */
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
  /** The virtual machine scale set IP Configuration. */
  ipConfigurations?: Array<VirtualMachineScaleSetUpdateIPConfiguration>;
  /** Whether IP forwarding enabled on this NIC. */
  enableIPForwarding?: boolean;
  /** Specify what happens to the network interface when the VM is deleted */
  deleteOption?: "Delete" | "Detach";
}

/** Describes a virtual machine scale set network profile's IP configuration. NOTE: The subnet of a scale set may be modified as long as the original subnet and the new subnet are in the same virtual network */
export interface VirtualMachineScaleSetUpdateIPConfiguration extends SubResource {
  /** The IP configuration name. */
  name?: string;
  /** Describes a virtual machine scale set network profile's IP configuration properties. */
  properties?: VirtualMachineScaleSetUpdateIPConfigurationProperties;
}

/** Describes a virtual machine scale set network profile's IP configuration properties. */
export interface VirtualMachineScaleSetUpdateIPConfigurationProperties {
  /** The subnet. */
  subnet?: ApiEntityReference;
  /** Specifies the primary IP Configuration in case the network interface has more than one IP Configuration. */
  primary?: boolean;
  /** The publicIPAddressConfiguration. */
  publicIPAddressConfiguration?: VirtualMachineScaleSetUpdatePublicIPAddressConfiguration;
  /** Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. */
  privateIPAddressVersion?: "IPv4" | "IPv6";
  /** The application gateway backend address pools. */
  applicationGatewayBackendAddressPools?: Array<SubResource>;
  /** Specifies an array of references to application security group. */
  applicationSecurityGroups?: Array<SubResource>;
  /** The load balancer backend address pools. */
  loadBalancerBackendAddressPools?: Array<SubResource>;
  /** The load balancer inbound nat pools. */
  loadBalancerInboundNatPools?: Array<SubResource>;
}

/** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
export interface VirtualMachineScaleSetUpdatePublicIPAddressConfiguration {
  /** The publicIP address configuration name. */
  name?: string;
  /** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
  properties?: VirtualMachineScaleSetUpdatePublicIPAddressConfigurationProperties;
}

/** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
export interface VirtualMachineScaleSetUpdatePublicIPAddressConfigurationProperties {
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** The dns settings to be applied on the publicIP addresses . */
  dnsSettings?: VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings;
  /** The PublicIPPrefix from which to allocate publicIP addresses. */
  publicIPPrefix?: SubResource;
  /** Specify what happens to the public IP when the VM is deleted */
  deleteOption?: "Delete" | "Detach";
}

/** The Update Resource model definition. */
export interface UpdateResource {
  /** Resource tags */
  tags?: Record<string, string>;
}

/** Specifies a list of virtual machine instance IDs from the VM scale set. */
export interface VirtualMachineScaleSetVMInstanceIDs {
  /** The virtual machine scale set instance ids. Omitting the virtual machine scale set instance ids will result in the operation being performed on all virtual machines in the virtual machine scale set. */
  instanceIds?: Array<string>;
}

/** Specifies a list of virtual machine instance IDs from the VM scale set. */
export interface VirtualMachineScaleSetVMInstanceRequiredIDs {
  /** The virtual machine scale set instance ids. */
  instanceIds: Array<string>;
}

/** Instance view status. */
export interface InstanceViewStatus {
  /** The status code. */
  code?: string;
  /** The level code. */
  level?: "Info" | "Warning" | "Error";
  /** The short localizable label for the status. */
  displayStatus?: string;
  /** The detailed status message, including for alerts and error messages. */
  message?: string;
  /** The time of the status. */
  time?: Date | string;
}

/** Describes a Virtual Machine Scale Set Extension. */
export interface VirtualMachineScaleSetExtensionUpdate extends SubResourceReadOnly {
  /** Describes the properties of a Virtual Machine Scale Set Extension. */
  properties?: VirtualMachineScaleSetExtensionProperties;
}

/** Information about the number of virtual machine instances in each upgrade state. */
export interface RollingUpgradeProgressInfo {}

/** Describes a Virtual Machine Scale Set VM Reimage Parameters. */
export interface VirtualMachineScaleSetReimageParameters extends VirtualMachineScaleSetVMReimageParameters {
  /** The virtual machine scale set instance ids. Omitting the virtual machine scale set instance ids will result in the operation being performed on all virtual machines in the virtual machine scale set. */
  instanceIds?: Array<string>;
}

/** Describes a Virtual Machine Scale Set VM Reimage Parameters. */
export interface VirtualMachineScaleSetVMReimageParameters extends VirtualMachineReimageParameters {}

/** Parameters for Reimaging Virtual Machine. NOTE: Virtual Machine OS disk will always be reimaged */
export interface VirtualMachineReimageParameters {
  /** Specifies whether to reimage temp disk. Default value: false. Note: This temp disk reimage parameter is only supported for VM/VMSS with Ephemeral OS disk. */
  tempDisk?: boolean;
}

/** The status of the latest virtual machine scale set rolling upgrade. */
export interface RollingUpgradeStatusInfo extends Resource {
  /** The status of the latest virtual machine scale set rolling upgrade. */
  properties?: RollingUpgradeStatusInfoProperties;
}

/** The status of the latest virtual machine scale set rolling upgrade. */
export interface RollingUpgradeStatusInfoProperties {}

/** Information about the current running state of the overall upgrade. */
export interface RollingUpgradeRunningStatus {}

export interface VMScaleSetConvertToSinglePlacementGroupInput {
  /** Id of the placement group in which you want future virtual machine instances to be placed. To query placement group Id, please use Virtual Machine Scale Set VMs - Get API. If not provided, the platform will choose one with maximum number of virtual machine instances. */
  activePlacementGroupId?: string;
}

/** The input for OrchestrationServiceState */
export interface OrchestrationServiceStateInput {
  /** The name of the service. */
  serviceName: "AutomaticRepairs";
  /** The action to be performed. */
  action: "Resume" | "Suspend";
}

/** Describes a VMSS VM Extension. */
export interface VirtualMachineScaleSetVMExtension extends SubResourceReadOnly {
  /** Describes the properties of a Virtual Machine Extension. */
  properties?: VirtualMachineExtensionProperties;
}

/** Describes the properties of a Virtual Machine Extension. */
export interface VirtualMachineExtensionProperties {
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
  /** The virtual machine extension instance view. */
  instanceView?: VirtualMachineExtensionInstanceView;
  /** Indicates whether failures stemming from the extension will be suppressed (Operational failures such as not connecting to the VM will not be suppressed regardless of this value). The default is false. */
  suppressFailures?: boolean;
  /** The extensions protected settings that are passed by reference, and consumed from key vault */
  protectedSettingsFromKeyVault?: KeyVaultSecretReference;
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
  substatuses?: Array<InstanceViewStatus>;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatus>;
}

/** Describes a VMSS VM Extension. */
export interface VirtualMachineScaleSetVMExtensionUpdate extends SubResourceReadOnly {
  /** Describes the properties of a Virtual Machine Extension. */
  properties?: VirtualMachineExtensionUpdateProperties;
}

/** Describes the properties of a Virtual Machine Extension. */
export interface VirtualMachineExtensionUpdateProperties {
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
  /** Indicates whether failures stemming from the extension will be suppressed (Operational failures such as not connecting to the VM will not be suppressed regardless of this value). The default is false. */
  suppressFailures?: boolean;
  /** The extensions protected settings that are passed by reference, and consumed from key vault */
  protectedSettingsFromKeyVault?: KeyVaultSecretReference;
}

/** Describes a virtual machine scale set virtual machine. */
export interface VirtualMachineScaleSetVM extends Resource {
  /** Describes the properties of a virtual machine scale set virtual machine. */
  properties?: VirtualMachineScaleSetVMProperties;
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: Plan;
  /** The identity of the virtual machine, if configured. */
  identity?: VirtualMachineIdentity;
}

/** Describes the properties of a virtual machine scale set virtual machine. */
export interface VirtualMachineScaleSetVMProperties {
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
  /** Specifies information about the availability set that the virtual machine should be assigned to. Virtual machines specified in the same availability set are allocated to different nodes to maximize availability. For more information about availability sets, see [Availability sets overview](https://docs.microsoft.com/azure/virtual-machines/availability-set-overview). <br><br> For more information on Azure planned maintenance, see [Maintenance and updates for Virtual Machines in Azure](https://docs.microsoft.com/azure/virtual-machines/maintenance-and-updates) <br><br> Currently, a VM can only be added to availability set at creation time. An existing VM cannot be added to an availability set. */
  availabilitySet?: SubResource;
  /** Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 */
  licenseType?: string;
  /** Specifies the protection policy of the virtual machine. */
  protectionPolicy?: VirtualMachineScaleSetVMProtectionPolicy;
  /** UserData for the VM, which must be base-64 encoded. Customer should not pass any secrets in here. <br><br>Minimum api-version: 2021-03-01 */
  userData?: string;
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
  disks?: Array<DiskInstanceView>;
  /** The extensions information. */
  extensions?: Array<VirtualMachineExtensionInstanceView>;
  /** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. <br><br> You can easily view the output of your console log. <br><br> Azure also enables you to see a screenshot of the VM from the hypervisor. */
  bootDiagnostics?: BootDiagnosticsInstanceView;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatus>;
  /** The placement group in which the VM is running. If the VM is deallocated it will not have a placementGroupId. */
  placementGroupId?: string;
}

/** The instance view of the VM Agent running on the virtual machine. */
export interface VirtualMachineAgentInstanceView {
  /** The VM Agent full version. */
  vmAgentVersion?: string;
  /** The virtual machine extension handler instance view. */
  extensionHandlers?: Array<VirtualMachineExtensionHandlerInstanceView>;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatus>;
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
  preMaintenanceWindowStartTime?: Date | string;
  /** End Time for the Pre Maintenance Window. */
  preMaintenanceWindowEndTime?: Date | string;
  /** Start Time for the Maintenance Window. */
  maintenanceWindowStartTime?: Date | string;
  /** End Time for the Maintenance Window. */
  maintenanceWindowEndTime?: Date | string;
  /** The Last Maintenance Operation Result Code. */
  lastOperationResultCode?: "None" | "RetryLater" | "MaintenanceAborted" | "MaintenanceCompleted";
  /** Message returned for the last Maintenance Operation. */
  lastOperationMessage?: string;
}

/** The instance view of the disk. */
export interface DiskInstanceView {
  /** The disk name. */
  name?: string;
  /** Specifies the encryption settings for the OS Disk. <br><br> Minimum api-version: 2015-06-15 */
  encryptionSettings?: Array<DiskEncryptionSettings>;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatus>;
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

/** Describes a reference to Key Vault Key */
export interface KeyVaultKeyReference {
  /** The URL referencing a key encryption key in Key Vault. */
  keyUrl: string;
  /** The relative URL of the Key Vault containing the key. */
  sourceVault: SubResource;
}

/** The health status of the VM. */
export interface VirtualMachineHealthStatus {}

/** The instance view of a virtual machine boot diagnostics. */
export interface BootDiagnosticsInstanceView {}

/** Specifies the hardware settings for the virtual machine. */
export interface HardwareProfile {
  /** Specifies the size of the virtual machine. <br><br> The enum data type is currently deprecated and will be removed by December 23rd 2023. <br><br> Recommended way to get the list of available sizes is using these APIs: <br><br> [List all available virtual machine sizes in an availability set](https://docs.microsoft.com/rest/api/compute/availabilitysets/listavailablesizes) <br><br> [List all available virtual machine sizes in a region]( https://docs.microsoft.com/rest/api/compute/resourceskus/list) <br><br> [List all available virtual machine sizes for resizing](https://docs.microsoft.com/rest/api/compute/virtualmachines/listavailablesizes). For more information about virtual machine sizes, see [Sizes for virtual machines](https://docs.microsoft.com/azure/virtual-machines/sizes). <br><br> The available VM sizes depend on region and availability set. */
  vmSize?:
    | "Basic_A0"
    | "Basic_A1"
    | "Basic_A2"
    | "Basic_A3"
    | "Basic_A4"
    | "Standard_A0"
    | "Standard_A1"
    | "Standard_A2"
    | "Standard_A3"
    | "Standard_A4"
    | "Standard_A5"
    | "Standard_A6"
    | "Standard_A7"
    | "Standard_A8"
    | "Standard_A9"
    | "Standard_A10"
    | "Standard_A11"
    | "Standard_A1_v2"
    | "Standard_A2_v2"
    | "Standard_A4_v2"
    | "Standard_A8_v2"
    | "Standard_A2m_v2"
    | "Standard_A4m_v2"
    | "Standard_A8m_v2"
    | "Standard_B1s"
    | "Standard_B1ms"
    | "Standard_B2s"
    | "Standard_B2ms"
    | "Standard_B4ms"
    | "Standard_B8ms"
    | "Standard_D1"
    | "Standard_D2"
    | "Standard_D3"
    | "Standard_D4"
    | "Standard_D11"
    | "Standard_D12"
    | "Standard_D13"
    | "Standard_D14"
    | "Standard_D1_v2"
    | "Standard_D2_v2"
    | "Standard_D3_v2"
    | "Standard_D4_v2"
    | "Standard_D5_v2"
    | "Standard_D2_v3"
    | "Standard_D4_v3"
    | "Standard_D8_v3"
    | "Standard_D16_v3"
    | "Standard_D32_v3"
    | "Standard_D64_v3"
    | "Standard_D2s_v3"
    | "Standard_D4s_v3"
    | "Standard_D8s_v3"
    | "Standard_D16s_v3"
    | "Standard_D32s_v3"
    | "Standard_D64s_v3"
    | "Standard_D11_v2"
    | "Standard_D12_v2"
    | "Standard_D13_v2"
    | "Standard_D14_v2"
    | "Standard_D15_v2"
    | "Standard_DS1"
    | "Standard_DS2"
    | "Standard_DS3"
    | "Standard_DS4"
    | "Standard_DS11"
    | "Standard_DS12"
    | "Standard_DS13"
    | "Standard_DS14"
    | "Standard_DS1_v2"
    | "Standard_DS2_v2"
    | "Standard_DS3_v2"
    | "Standard_DS4_v2"
    | "Standard_DS5_v2"
    | "Standard_DS11_v2"
    | "Standard_DS12_v2"
    | "Standard_DS13_v2"
    | "Standard_DS14_v2"
    | "Standard_DS15_v2"
    | "Standard_DS13-4_v2"
    | "Standard_DS13-2_v2"
    | "Standard_DS14-8_v2"
    | "Standard_DS14-4_v2"
    | "Standard_E2_v3"
    | "Standard_E4_v3"
    | "Standard_E8_v3"
    | "Standard_E16_v3"
    | "Standard_E32_v3"
    | "Standard_E64_v3"
    | "Standard_E2s_v3"
    | "Standard_E4s_v3"
    | "Standard_E8s_v3"
    | "Standard_E16s_v3"
    | "Standard_E32s_v3"
    | "Standard_E64s_v3"
    | "Standard_E32-16_v3"
    | "Standard_E32-8s_v3"
    | "Standard_E64-32s_v3"
    | "Standard_E64-16s_v3"
    | "Standard_F1"
    | "Standard_F2"
    | "Standard_F4"
    | "Standard_F8"
    | "Standard_F16"
    | "Standard_F1s"
    | "Standard_F2s"
    | "Standard_F4s"
    | "Standard_F8s"
    | "Standard_F16s"
    | "Standard_F2s_v2"
    | "Standard_F4s_v2"
    | "Standard_F8s_v2"
    | "Standard_F16s_v2"
    | "Standard_F32s_v2"
    | "Standard_F64s_v2"
    | "Standard_F72s_v2"
    | "Standard_G1"
    | "Standard_G2"
    | "Standard_G3"
    | "Standard_G4"
    | "Standard_G5"
    | "Standard_GS1"
    | "Standard_GS2"
    | "Standard_GS3"
    | "Standard_GS4"
    | "Standard_GS5"
    | "Standard_GS4-8"
    | "Standard_GS4-4"
    | "Standard_GS5-16"
    | "Standard_GS5-8"
    | "Standard_H8"
    | "Standard_H16"
    | "Standard_H8m"
    | "Standard_H16m"
    | "Standard_H16r"
    | "Standard_H16mr"
    | "Standard_L4s"
    | "Standard_L8s"
    | "Standard_L16s"
    | "Standard_L32s"
    | "Standard_M64s"
    | "Standard_M64ms"
    | "Standard_M128s"
    | "Standard_M128ms"
    | "Standard_M64-32ms"
    | "Standard_M64-16ms"
    | "Standard_M128-64ms"
    | "Standard_M128-32ms"
    | "Standard_NC6"
    | "Standard_NC12"
    | "Standard_NC24"
    | "Standard_NC24r"
    | "Standard_NC6s_v2"
    | "Standard_NC12s_v2"
    | "Standard_NC24s_v2"
    | "Standard_NC24rs_v2"
    | "Standard_NC6s_v3"
    | "Standard_NC12s_v3"
    | "Standard_NC24s_v3"
    | "Standard_NC24rs_v3"
    | "Standard_ND6s"
    | "Standard_ND12s"
    | "Standard_ND24s"
    | "Standard_ND24rs"
    | "Standard_NV6"
    | "Standard_NV12"
    | "Standard_NV24";
  /** Specifies the properties for customizing the size of the virtual machine. Minimum api-version: 2021-07-01. <br><br> This feature is still in preview mode and is not supported for VirtualMachineScaleSet. <br><br> Please follow the instructions in [VM Customization](https://aka.ms/vmcustomization) for more details. */
  vmSizeProperties?: VMSizeProperties;
}

/** Specifies the storage settings for the virtual machine disks. */
export interface StorageProfile {
  /** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. */
  imageReference?: ImageReference;
  /** Specifies information about the operating system disk used by the virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  osDisk?: OSDisk;
  /** Specifies the parameters that are used to add a data disk to a virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  dataDisks?: Array<DataDisk>;
  /** Specifies the disk controller type configured for the VM. <br><br>NOTE: This property will be set to the default disk controller type if not specified provided virtual machine is being created as a hyperVGeneration: V2 based on the capabilities of the operating system disk and VM size from the the specified minimum api version. <br>You need to deallocate the VM before updating its disk controller type unless you are updating the VM size in the VM configuration which implicitly deallocates and reallocates the VM. <br><br> Minimum api-version: 2022-08-01 */
  diskControllerType?: "SCSI" | "NVMe";
}

/** Specifies information about the operating system disk used by the virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
export interface OSDisk {
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  osType?: "Windows" | "Linux";
  /** Specifies the encryption settings for the OS Disk. <br><br> Minimum api-version: 2015-06-15 */
  encryptionSettings?: DiskEncryptionSettings;
  /** The disk name. */
  name?: string;
  /** The virtual hard disk. */
  vhd?: VirtualHardDisk;
  /** The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. */
  image?: VirtualHardDisk;
  /** Specifies the caching requirements. <br><br> Possible values are: <br><br> **None** <br><br> **ReadOnly** <br><br> **ReadWrite** <br><br> Default: **None** for Standard storage. **ReadOnly** for Premium storage. */
  caching?: "None" | "ReadOnly" | "ReadWrite";
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies the ephemeral Disk Settings for the operating system disk used by the virtual machine. */
  diffDiskSettings?: DiffDiskSettings;
  /** Specifies how the virtual machine should be created.<br><br> Possible values are:<br><br> **Attach** \u2013 This value is used when you are using a specialized disk to create the virtual machine.<br><br> **FromImage** \u2013 This value is used when you are using an image to create the virtual machine. If you are using a platform image, you also use the imageReference element described above. If you are using a marketplace image, you  also use the plan element previously described. */
  createOption: "FromImage" | "Empty" | "Attach";
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. <br><br> diskSizeGB is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023 */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: ManagedDiskParameters;
  /** Specifies whether OS Disk should be deleted or detached upon VM deletion. <br><br> Possible values: <br><br> **Delete** If this value is used, the OS disk is deleted when VM is deleted.<br><br> **Detach** If this value is used, the os disk is retained after VM is deleted. <br><br> The default value is set to **detach**. For an ephemeral OS Disk, the default value is set to **Delete**. User cannot change the delete option for ephemeral OS Disk. */
  deleteOption?: "Delete" | "Detach";
}

/** The parameters of a managed disk. */
export interface ManagedDiskParameters extends SubResource {
  /** Specifies the storage account type for the managed disk. NOTE: UltraSSD_LRS can only be used with data disks, it cannot be used with OS Disk. */
  storageAccountType?:
    | "Standard_LRS"
    | "Premium_LRS"
    | "StandardSSD_LRS"
    | "UltraSSD_LRS"
    | "Premium_ZRS"
    | "StandardSSD_ZRS"
    | "PremiumV2_LRS";
  /** Specifies the customer managed disk encryption set resource id for the managed disk. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
  /** Specifies the security profile for the managed disk. */
  securityProfile?: VMDiskSecurityProfile;
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
  caching?: "None" | "ReadOnly" | "ReadWrite";
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies how the virtual machine should be created.<br><br> Possible values are:<br><br> **Attach** \u2013 This value is used when you are using a specialized disk to create the virtual machine.<br><br> **FromImage** \u2013 This value is used when you are using an image to create the virtual machine. If you are using a platform image, you also use the imageReference element described above. If you are using a marketplace image, you  also use the plan element previously described. */
  createOption: "FromImage" | "Empty" | "Attach";
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. <br><br> diskSizeGB is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023 */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: ManagedDiskParameters;
  /** Specifies whether the data disk is in process of detachment from the VirtualMachine/VirtualMachineScaleset */
  toBeDetached?: boolean;
  /** Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values: **ForceDetach**. <br><br> detachOption: **ForceDetach** is applicable only for managed data disks. If a previous detachment attempt of the data disk did not complete due to an unexpected failure from the virtual machine and the disk is still not released then use force-detach as a last resort option to detach the disk forcibly from the VM. All writes might not have been flushed when using this detach behavior. <br><br> This feature is still in preview mode and is not supported for VirtualMachineScaleSet. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'. */
  detachOption?: "ForceDetach";
  /** Specifies whether data disk should be deleted or detached upon VM deletion.<br><br> Possible values: <br><br> **Delete** If this value is used, the data disk is deleted when VM is deleted.<br><br> **Detach** If this value is used, the data disk is retained after VM is deleted.<br><br> The default value is set to **detach** */
  deleteOption?: "Delete" | "Detach";
}

/** Specifies the operating system settings for the virtual machine. Some of the settings cannot be changed once VM is provisioned. */
export interface OSProfile {
  /** Specifies the host OS name of the virtual machine. <br><br> This name cannot be updated after the VM is created. <br><br> **Max-length (Windows):** 15 characters <br><br> **Max-length (Linux):** 64 characters. <br><br> For naming conventions and restrictions see [Azure infrastructure services implementation guidelines](https://docs.microsoft.com/azure/azure-resource-manager/management/resource-name-rules). */
  computerName?: string;
  /** Specifies the name of the administrator account. <br><br> This property cannot be updated after the VM is created. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters. */
  adminUsername?: string;
  /** Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection) */
  adminPassword?: string;
  /** Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. <br><br> **Note: Do not pass any secrets or passwords in customData property** <br><br> This property cannot be updated after the VM is created. <br><br> customData is passed to the VM to be saved as a file, for more information see [Custom Data on Azure VMs](https://azure.microsoft.com/blog/custom-data-and-cloud-init-on-windows-azure/) <br><br> For using cloud-init for your Linux VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init) */
  customData?: string;
  /** Specifies Windows operating system settings on the virtual machine. */
  windowsConfiguration?: WindowsConfiguration;
  /** Specifies the Linux operating system settings on the virtual machine. <br><br>For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros). */
  linuxConfiguration?: LinuxConfiguration;
  /** Specifies set of certificates that should be installed onto the virtual machine. To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  secrets?: Array<VaultSecretGroup>;
  /** Specifies whether extension operations should be allowed on the virtual machine. <br><br>This may only be set to False when no extensions are present on the virtual machine. */
  allowExtensionOperations?: boolean;
  /** Optional property which must either be set to True or omitted. */
  requireGuestProvisionSignal?: boolean;
}

/** Specifies the network interfaces or the networking configuration of the virtual machine. */
export interface NetworkProfile {
  /** Specifies the list of resource Ids for the network interfaces associated with the virtual machine. */
  networkInterfaces?: Array<NetworkInterfaceReference>;
  /** specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations */
  networkApiVersion?: "2020-11-01";
  /** Specifies the networking configurations that will be used to create the virtual machine networking resources. */
  networkInterfaceConfigurations?: Array<VirtualMachineNetworkInterfaceConfiguration>;
}

/** Describes a network interface reference. */
export interface NetworkInterfaceReference extends SubResource {
  /** Describes a network interface reference properties. */
  properties?: NetworkInterfaceReferenceProperties;
}

/** Describes a network interface reference properties. */
export interface NetworkInterfaceReferenceProperties {
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** Specify what happens to the network interface when the VM is deleted */
  deleteOption?: "Delete" | "Detach";
}

/** Describes a virtual machine network interface configurations. */
export interface VirtualMachineNetworkInterfaceConfiguration {
  /** The network interface configuration name. */
  name: string;
  /** Describes a virtual machine network profile's IP configuration. */
  properties?: VirtualMachineNetworkInterfaceConfigurationProperties;
}

/** Describes a virtual machine network profile's IP configuration. */
export interface VirtualMachineNetworkInterfaceConfigurationProperties {
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** Specify what happens to the network interface when the VM is deleted */
  deleteOption?: "Delete" | "Detach";
  /** Specifies whether the network interface is accelerated networking-enabled. */
  enableAcceleratedNetworking?: boolean;
  /** Specifies whether the network interface is disabled for tcp state tracking. */
  disableTcpStateTracking?: boolean;
  /** Specifies whether the network interface is FPGA networking-enabled. */
  enableFpga?: boolean;
  /** Whether IP forwarding enabled on this NIC. */
  enableIPForwarding?: boolean;
  /** The network security group. */
  networkSecurityGroup?: SubResource;
  /** The dns settings to be applied on the network interfaces. */
  dnsSettings?: VirtualMachineNetworkInterfaceDnsSettingsConfiguration;
  /** Specifies the IP configurations of the network interface. */
  ipConfigurations: Array<VirtualMachineNetworkInterfaceIPConfiguration>;
  dscpConfiguration?: SubResource;
}

/** Describes a virtual machines network configuration's DNS settings. */
export interface VirtualMachineNetworkInterfaceDnsSettingsConfiguration {
  /** List of DNS servers IP addresses */
  dnsServers?: Array<string>;
}

/** Describes a virtual machine network profile's IP configuration. */
export interface VirtualMachineNetworkInterfaceIPConfiguration {
  /** The IP configuration name. */
  name: string;
  /** Describes a virtual machine network interface IP configuration properties. */
  properties?: VirtualMachineNetworkInterfaceIPConfigurationProperties;
}

/** Describes a virtual machine network interface IP configuration properties. */
export interface VirtualMachineNetworkInterfaceIPConfigurationProperties {
  /** Specifies the identifier of the subnet. */
  subnet?: SubResource;
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** The publicIPAddressConfiguration. */
  publicIPAddressConfiguration?: VirtualMachinePublicIPAddressConfiguration;
  /** Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. */
  privateIPAddressVersion?: "IPv4" | "IPv6";
  /** Specifies an array of references to application security group. */
  applicationSecurityGroups?: Array<SubResource>;
  /** Specifies an array of references to backend address pools of application gateways. A virtual machine can reference backend address pools of multiple application gateways. Multiple virtual machines cannot use the same application gateway. */
  applicationGatewayBackendAddressPools?: Array<SubResource>;
  /** Specifies an array of references to backend address pools of load balancers. A virtual machine can reference backend address pools of one public and one internal load balancer. [Multiple virtual machines cannot use the same basic sku load balancer]. */
  loadBalancerBackendAddressPools?: Array<SubResource>;
}

/** Describes a virtual machines IP Configuration's PublicIPAddress configuration */
export interface VirtualMachinePublicIPAddressConfiguration {
  /** The publicIP address configuration name. */
  name: string;
  /** Describes a virtual machines IP Configuration's PublicIPAddress configuration */
  properties?: VirtualMachinePublicIPAddressConfigurationProperties;
  /** Describes the public IP Sku. It can only be set with OrchestrationMode as Flexible. */
  sku?: PublicIPAddressSku;
}

/** Describes a virtual machines IP Configuration's PublicIPAddress configuration */
export interface VirtualMachinePublicIPAddressConfigurationProperties {
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** Specify what happens to the public IP address when the VM is deleted */
  deleteOption?: "Delete" | "Detach";
  /** The dns settings to be applied on the publicIP addresses . */
  dnsSettings?: VirtualMachinePublicIPAddressDnsSettingsConfiguration;
  /** The list of IP tags associated with the public IP address. */
  ipTags?: Array<VirtualMachineIpTag>;
  /** The PublicIPPrefix from which to allocate publicIP addresses. */
  publicIPPrefix?: SubResource;
  /** Available from Api-Version 2019-07-01 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'. */
  publicIPAddressVersion?: "IPv4" | "IPv6";
  /** Specify the public IP allocation type */
  publicIPAllocationMethod?: "Dynamic" | "Static";
}

/** Describes a virtual machines network configuration's DNS settings. */
export interface VirtualMachinePublicIPAddressDnsSettingsConfiguration {
  /** The Domain name label prefix of the PublicIPAddress resources that will be created. The generated name label is the concatenation of the domain name label and vm network profile unique ID. */
  domainNameLabel: string;
}

/** Contains the IP tag associated with the public IP address. */
export interface VirtualMachineIpTag {
  /** IP tag type. Example: FirstPartyUsage. */
  ipTagType?: string;
  /** IP tag associated with the public IP. Example: SQL, Storage etc. */
  tag?: string;
}

/** Describes a virtual machine scale set VM network profile. */
export interface VirtualMachineScaleSetVMNetworkProfileConfiguration {
  /** The list of network configurations. */
  networkInterfaceConfigurations?: Array<VirtualMachineScaleSetNetworkConfiguration>;
}

/** The protection policy of a virtual machine scale set VM. */
export interface VirtualMachineScaleSetVMProtectionPolicy {
  /** Indicates that the virtual machine scale set VM shouldn't be considered for deletion during a scale-in operation. */
  protectFromScaleIn?: boolean;
  /** Indicates that model updates or actions (including scale-in) initiated on the virtual machine scale set should not be applied to the virtual machine scale set VM. */
  protectFromScaleSetActions?: boolean;
}

/** Describes a Virtual Machine Extension. */
export interface VirtualMachineExtension extends ResourceWithOptionalLocation {
  /** Describes the properties of a Virtual Machine Extension. */
  properties?: VirtualMachineExtensionProperties;
}

/** The Resource model definition with location property as optional. */
export interface ResourceWithOptionalLocation {
  /** Resource location */
  location?: string;
  /** Resource tags */
  tags?: Record<string, string>;
}

/** Identity for the virtual machine. */
export interface VirtualMachineIdentity {
  /** The type of identity used for the virtual machine. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine. */
  type?: "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";
  /** The list of user identities associated with the Virtual Machine. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserAssignedIdentitiesValue>;
}

/** Describes a Virtual Machine Extension. */
export interface VirtualMachineExtensionUpdate extends UpdateResource {
  /** Describes the properties of a Virtual Machine Extension. */
  properties?: VirtualMachineExtensionUpdateProperties;
}

/** Describes a Virtual Machine. */
export interface VirtualMachine extends Resource {
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: Plan;
  /** Describes the properties of a Virtual Machine. */
  properties?: VirtualMachineProperties;
  /** The identity of the virtual machine, if configured. */
  identity?: VirtualMachineIdentity;
  /** The virtual machine zones. */
  zones?: Array<string>;
  /** The extended location of the Virtual Machine. */
  extendedLocation?: ExtendedLocation;
}

/** Describes the properties of a Virtual Machine. */
export interface VirtualMachineProperties {
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
  /** Specifies information about the availability set that the virtual machine should be assigned to. Virtual machines specified in the same availability set are allocated to different nodes to maximize availability. For more information about availability sets, see [Availability sets overview](https://docs.microsoft.com/azure/virtual-machines/availability-set-overview). <br><br> For more information on Azure planned maintenance, see [Maintenance and updates for Virtual Machines in Azure](https://docs.microsoft.com/azure/virtual-machines/maintenance-and-updates) <br><br> Currently, a VM can only be added to availability set at creation time. The availability set to which the VM is being added should be under the same resource group as the availability set resource. An existing VM cannot be added to an availability set. <br><br>This property cannot exist along with a non-null properties.virtualMachineScaleSet reference. */
  availabilitySet?: SubResource;
  /** Specifies information about the virtual machine scale set that the virtual machine should be assigned to. Virtual machines specified in the same virtual machine scale set are allocated to different nodes to maximize availability. Currently, a VM can only be added to virtual machine scale set at creation time. An existing VM cannot be added to a virtual machine scale set. <br><br>This property cannot exist along with a non-null properties.availabilitySet reference. <br><br>Minimum api‐version: 2019‐03‐01 */
  virtualMachineScaleSet?: SubResource;
  /** Specifies information about the proximity placement group that the virtual machine should be assigned to. <br><br>Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResource;
  /** Specifies the priority for the virtual machine. <br><br>Minimum api-version: 2019-03-01 */
  priority?: "Regular" | "Low" | "Spot";
  /** Specifies the eviction policy for the Azure Spot virtual machine and Azure Spot scale set. <br><br>For Azure Spot virtual machines, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2019-03-01. <br><br>For Azure Spot scale sets, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2017-10-30-preview. */
  evictionPolicy?: "Deallocate" | "Delete";
  /** Specifies the billing related details of a Azure Spot virtual machine. <br><br>Minimum api-version: 2019-03-01. */
  billingProfile?: BillingProfile;
  /** Specifies information about the dedicated host that the virtual machine resides in. <br><br>Minimum api-version: 2018-10-01. */
  host?: SubResource;
  /** Specifies information about the dedicated host group that the virtual machine resides in. <br><br>Minimum api-version: 2020-06-01. <br><br>NOTE: User cannot specify both host and hostGroup properties. */
  hostGroup?: SubResource;
  /** Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 */
  licenseType?: string;
  /** Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). <br><br> Minimum api-version: 2020-06-01 */
  extensionsTimeBudget?: string;
  /** Specifies the scale set logical fault domain into which the Virtual Machine will be created. By default, the Virtual Machine will by automatically assigned to a fault domain that best maintains balance across available fault domains.<br><li>This is applicable only if the 'virtualMachineScaleSet' property of this Virtual Machine is set.<li>The Virtual Machine Scale Set that is referenced, must have 'platformFaultDomainCount' &gt; 1.<li>This property cannot be updated once the Virtual Machine is created.<li>Fault domain assignment can be viewed in the Virtual Machine Instance View.<br><br>Minimum api‐version: 2020‐12‐01 */
  platformFaultDomain?: number;
  /** Specifies Scheduled Event related configurations. */
  scheduledEventsProfile?: ScheduledEventsProfile;
  /** UserData for the VM, which must be base-64 encoded. Customer should not pass any secrets in here. <br><br>Minimum api-version: 2021-03-01 */
  userData?: string;
  /** Specifies information about the capacity reservation that is used to allocate virtual machine. <br><br>Minimum api-version: 2021-04-01. */
  capacityReservation?: CapacityReservationProfile;
  /** Specifies the gallery applications that should be made available to the VM/VMSS */
  applicationProfile?: ApplicationProfile;
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
  hyperVGeneration?: "V1" | "V2";
  /** The Remote desktop certificate thumbprint. */
  rdpThumbPrint?: string;
  /** The VM Agent running on the virtual machine. */
  vmAgent?: VirtualMachineAgentInstanceView;
  /** The Maintenance Operation status on the virtual machine. */
  maintenanceRedeployStatus?: MaintenanceRedeployStatus;
  /** The virtual machine disk information. */
  disks?: Array<DiskInstanceView>;
  /** The extensions information. */
  extensions?: Array<VirtualMachineExtensionInstanceView>;
  /** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. <br><br> You can easily view the output of your console log. <br><br> Azure also enables you to see a screenshot of the VM from the hypervisor. */
  bootDiagnostics?: BootDiagnosticsInstanceView;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatus>;
  /** [Preview Feature] The status of virtual machine patch operations. */
  patchStatus?: VirtualMachinePatchStatus;
}

/** The status of virtual machine patch operations. */
export interface VirtualMachinePatchStatus {
  /** The available patch summary of the latest assessment operation for the virtual machine. */
  availablePatchSummary?: AvailablePatchSummary;
  /** The installation summary of the latest installation operation for the virtual machine. */
  lastPatchInstallationSummary?: LastPatchInstallationSummary;
}

/** Describes the properties of an virtual machine instance view for available patch summary. */
export interface AvailablePatchSummary {}

/** Describes the properties of the last installed patch summary. */
export interface LastPatchInstallationSummary {}

/** Capture Virtual Machine parameters. */
export interface VirtualMachineCaptureParameters {
  /** The captured virtual hard disk's name prefix. */
  vhdPrefix: string;
  /** The destination container name. */
  destinationContainerName: string;
  /** Specifies whether to overwrite the destination virtual hard disk, in case of conflict. */
  overwriteVhds: boolean;
}

/** Output of virtual machine capture operation. */
export interface VirtualMachineCaptureResult extends SubResource {}

/** Describes a Virtual Machine Update. */
export interface VirtualMachineUpdate extends UpdateResource {
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: Plan;
  /** Describes the properties of a Virtual Machine. */
  properties?: VirtualMachineProperties;
  /** The identity of the virtual machine, if configured. */
  identity?: VirtualMachineIdentity;
  /** The virtual machine zones. */
  zones?: Array<string>;
}

/** Input for InstallPatches as directly received by the API */
export interface VirtualMachineInstallPatchesParameters {
  /** Specifies the maximum amount of time that the operation will run. It must be an ISO 8601-compliant duration string such as PT4H (4 hours) */
  maximumDuration?: string;
  /** Defines when it is acceptable to reboot a VM during a software update operation. */
  rebootSetting: "IfRequired" | "Never" | "Always";
  /** Input for InstallPatches on a Windows VM, as directly received by the API */
  windowsParameters?: WindowsParameters;
  /** Input for InstallPatches on a Linux VM, as directly received by the API */
  linuxParameters?: LinuxParameters;
}

/** Input for InstallPatches on a Windows VM, as directly received by the API */
export interface WindowsParameters {
  /** The update classifications to select when installing patches for Windows. */
  classificationsToInclude?: Array<
    | "Critical"
    | "Security"
    | "UpdateRollUp"
    | "FeaturePack"
    | "ServicePack"
    | "Definition"
    | "Tools"
    | "Updates"
  >;
  /** Kbs to include in the patch operation */
  kbNumbersToInclude?: Array<string>;
  /** Kbs to exclude in the patch operation */
  kbNumbersToExclude?: Array<string>;
  /** Filters out Kbs that don't have an InstallationRebootBehavior of 'NeverReboots' when this is set to true. */
  excludeKbsRequiringReboot?: boolean;
  /** This is used to install patches that were published on or before this given max published date. */
  maxPatchPublishDate?: Date | string;
}

/** Input for InstallPatches on a Linux VM, as directly received by the API */
export interface LinuxParameters {
  /** The update classifications to select when installing patches for Linux. */
  classificationsToInclude?: Array<"Critical" | "Security" | "Other">;
  /** packages to include in the patch operation. Format: packageName_packageVersion */
  packageNameMasksToInclude?: Array<string>;
  /** packages to exclude in the patch operation. Format: packageName_packageVersion */
  packageNameMasksToExclude?: Array<string>;
  /** This is used as a maintenance run identifier for Auto VM Guest Patching in Linux. */
  maintenanceRunId?: string;
}

/** Describes a Virtual Machine Image. */
export interface VirtualMachineImage extends VirtualMachineImageResource {
  /** Describes the properties of a Virtual Machine Image. */
  properties?: VirtualMachineImageProperties;
}

/** Describes the properties of a Virtual Machine Image. */
export interface VirtualMachineImageProperties {
  /** Used for establishing the purchase context of any 3rd Party artifact through MarketPlace. */
  plan?: PurchasePlan;
  /** Contains the os disk image information. */
  osDiskImage?: OSDiskImage;
  dataDiskImages?: Array<DataDiskImage>;
  /** Describes automatic OS upgrade properties on the image. */
  automaticOSUpgradeProperties?: AutomaticOSUpgradeProperties;
  /** Specifies the HyperVGeneration Type */
  hyperVGeneration?: "V1" | "V2";
  /** Specifies disallowed configuration for the VirtualMachine created from the image */
  disallowed?: DisallowedConfiguration;
  features?: Array<VirtualMachineImageFeature>;
  /** Specifies the Architecture Type */
  architecture?: "x64" | "Arm64";
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
  operatingSystem: "Windows" | "Linux";
}

/** Contains the data disk images information. */
export interface DataDiskImage {}

/** Describes automatic OS upgrade properties on the image. */
export interface AutomaticOSUpgradeProperties {
  /** Specifies whether automatic OS upgrade is supported on the image. */
  automaticOSUpgradeSupported: boolean;
}

/** Specifies the disallowed configuration for a virtual machine image. */
export interface DisallowedConfiguration {
  /** VM disk types which are disallowed. */
  vmDiskType?: "None" | "Unmanaged";
}

/** Specifies additional capabilities supported by the image */
export interface VirtualMachineImageFeature {
  /** The name of the feature. */
  name?: string;
  /** The corresponding value for the feature. */
  value?: string;
}

/** Virtual machine image resource information. */
export interface VirtualMachineImageResource extends SubResource {
  /** The name of the resource. */
  name: string;
  /** The supported Azure location of the resource. */
  location: string;
  /** Specifies the tags that are assigned to the virtual machine. For more information about using tags, see [Using tags to organize your Azure resources](https://docs.microsoft.com/azure/azure-resource-manager/resource-group-using-tags.md). */
  tags?: Record<string, string>;
  /** The extended location of the Virtual Machine. */
  extendedLocation?: ExtendedLocation;
}

/** Describes a Virtual Machine Extension Image. */
export interface VirtualMachineExtensionImage extends Resource {
  /** Describes the properties of a Virtual Machine Extension Image. */
  properties?: VirtualMachineExtensionImageProperties;
}

/** Describes the properties of a Virtual Machine Extension Image. */
export interface VirtualMachineExtensionImageProperties {
  /** The operating system this extension supports. */
  operatingSystem: string;
  /** The type of role (IaaS or PaaS) this extension supports. */
  computeRole: string;
  /** The schema defined by publisher, where extension consumers should provide settings in a matching schema. */
  handlerSchema: string;
  /** Whether the extension can be used on xRP VMScaleSets. By default existing extensions are usable on scalesets, but there might be cases where a publisher wants to explicitly indicate the extension is only enabled for CRP VMs but not VMSS. */
  vmScaleSetEnabled?: boolean;
  /** Whether the handler can support multiple extensions. */
  supportsMultipleExtensions?: boolean;
}

/** Specifies information about the availability set that the virtual machine should be assigned to. Virtual machines specified in the same availability set are allocated to different nodes to maximize availability. For more information about availability sets, see [Availability sets overview](https://docs.microsoft.com/azure/virtual-machines/availability-set-overview). <br><br> For more information on Azure planned maintenance, see [Maintenance and updates for Virtual Machines in Azure](https://docs.microsoft.com/azure/virtual-machines/maintenance-and-updates) <br><br> Currently, a VM can only be added to availability set at creation time. An existing VM cannot be added to an availability set. */
export interface AvailabilitySet extends Resource {
  /** The instance view of a resource. */
  properties?: AvailabilitySetProperties;
  /** Sku of the availability set, only name is required to be set. See AvailabilitySetSkuTypes for possible set of values. Use 'Aligned' for virtual machines with managed disks and 'Classic' for virtual machines with unmanaged disks. Default value is 'Classic'. */
  sku?: Sku;
}

/** The instance view of a resource. */
export interface AvailabilitySetProperties {
  /** Update Domain count. */
  platformUpdateDomainCount?: number;
  /** Fault Domain count. */
  platformFaultDomainCount?: number;
  /** A list of references to all virtual machines in the availability set. */
  virtualMachines?: Array<SubResource>;
  /** Specifies information about the proximity placement group that the availability set should be assigned to. <br><br>Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResource;
}

/** Specifies information about the availability set that the virtual machine should be assigned to. Only tags may be updated. */
export interface AvailabilitySetUpdate extends UpdateResource {
  /** The instance view of a resource. */
  properties?: AvailabilitySetProperties;
  /** Sku of the availability set */
  sku?: Sku;
}

/** Specifies information about the proximity placement group. */
export interface ProximityPlacementGroup extends Resource {
  /** Describes the properties of a Proximity Placement Group. */
  properties?: ProximityPlacementGroupProperties;
  /** Specifies the Availability Zone where virtual machine, virtual machine scale set or availability set associated with the  proximity placement group can be created. */
  zones?: Array<string>;
}

/** Describes the properties of a Proximity Placement Group. */
export interface ProximityPlacementGroupProperties {
  /** Specifies the type of the proximity placement group. <br><br> Possible values are: <br><br> **Standard** : Co-locate resources within an Azure region or Availability Zone. <br><br> **Ultra** : For future use. */
  proximityPlacementGroupType?: "Standard" | "Ultra";
  /** Describes colocation status of the Proximity Placement Group. */
  colocationStatus?: InstanceViewStatus;
  /** Specifies the user intent of the proximity placement group. */
  intent?: ProximityPlacementGroupPropertiesIntent;
}

export interface SubResourceWithColocationStatus extends SubResource {
  /** Describes colocation status of a resource in the Proximity Placement Group. */
  colocationStatus?: InstanceViewStatus;
}

/** Specifies the user intent of the proximity placement group. */
export interface ProximityPlacementGroupPropertiesIntent {
  /** Specifies possible sizes of virtual machines that can be created in the proximity placement group. */
  vmSizes?: Array<string>;
}

/** Specifies information about the proximity placement group. */
export interface ProximityPlacementGroupUpdate extends UpdateResource {}

/** Specifies information about the dedicated host group that the dedicated hosts should be assigned to. <br><br> Currently, a dedicated host can only be added to a dedicated host group at creation time. An existing dedicated host cannot be added to another dedicated host group. */
export interface DedicatedHostGroup extends Resource {
  /** Dedicated Host Group Properties. */
  properties?: DedicatedHostGroupProperties;
  /** Availability Zone to use for this host group. Only single zone is supported. The zone can be assigned only during creation. If not provided, the group supports all zones in the region. If provided, enforces each host in the group to be in the same zone. */
  zones?: Array<string>;
}

/** Dedicated Host Group Properties. */
export interface DedicatedHostGroupProperties {
  /** Number of fault domains that the host group can span. */
  platformFaultDomainCount: number;
  /** Specifies whether virtual machines or virtual machine scale sets can be placed automatically on the dedicated host group. Automatic placement means resources are allocated on dedicated hosts, that are chosen by Azure, under the dedicated host group. The value is defaulted to 'false' when not provided. <br><br>Minimum api-version: 2020-06-01. */
  supportAutomaticPlacement?: boolean;
  /** Enables or disables a capability on the dedicated host group.<br><br>Minimum api-version: 2022-03-01. */
  additionalCapabilities?: DedicatedHostGroupPropertiesAdditionalCapabilities;
}

export interface DedicatedHostGroupInstanceView {
  /** List of instance view of the dedicated hosts under the dedicated host group. */
  hosts?: Array<DedicatedHostInstanceViewWithName>;
}

/** The instance view of a dedicated host that includes the name of the dedicated host. It is used for the response to the instance view of a dedicated host group. */
export interface DedicatedHostInstanceViewWithName extends DedicatedHostInstanceView {}

/** The instance view of a dedicated host. */
export interface DedicatedHostInstanceView {
  /** Unutilized capacity of the dedicated host. */
  availableCapacity?: DedicatedHostAvailableCapacity;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatus>;
}

/** Dedicated host unutilized capacity. */
export interface DedicatedHostAvailableCapacity {
  /** The unutilized capacity of the dedicated host represented in terms of each VM size that is allowed to be deployed to the dedicated host. */
  allocatableVMs?: Array<DedicatedHostAllocatableVM>;
}

/** Represents the dedicated host unutilized capacity in terms of a specific VM size. */
export interface DedicatedHostAllocatableVM {
  /** VM size in terms of which the unutilized capacity is represented. */
  vmSize?: string;
  /** Maximum number of VMs of size vmSize that can fit in the dedicated host's remaining capacity. */
  count?: number;
}

/** Enables or disables a capability on the dedicated host group.<br><br>Minimum api-version: 2022-03-01. */
export interface DedicatedHostGroupPropertiesAdditionalCapabilities {
  /** The flag that enables or disables a capability to have UltraSSD Enabled Virtual Machines on Dedicated Hosts of the Dedicated Host Group. For the Virtual Machines to be UltraSSD Enabled, UltraSSDEnabled flag for the resource needs to be set true as well. The value is defaulted to 'false' when not provided. Please refer to https://docs.microsoft.com/en-us/azure/virtual-machines/disks-enable-ultra-ssd for more details on Ultra SSD feature. <br><br>NOTE: The ultraSSDEnabled setting can only be enabled for Host Groups that are created as zonal. <br><br>Minimum api-version: 2022-03-01. */
  ultraSSDEnabled?: boolean;
}

/** Specifies information about the dedicated host group that the dedicated host should be assigned to. Only tags may be updated. */
export interface DedicatedHostGroupUpdate extends UpdateResource {
  /** Dedicated Host Group Properties. */
  properties?: DedicatedHostGroupProperties;
  /** Availability Zone to use for this host group. Only single zone is supported. The zone can be assigned only during creation. If not provided, the group supports all zones in the region. If provided, enforces each host in the group to be in the same zone. */
  zones?: Array<string>;
}

/** Specifies information about the Dedicated host. */
export interface DedicatedHost extends Resource {
  /** Properties of the dedicated host. */
  properties?: DedicatedHostProperties;
  /** SKU of the dedicated host for Hardware Generation and VM family. Only name is required to be set. List Microsoft.Compute SKUs for a list of possible values. */
  sku: Sku;
}

/** Properties of the dedicated host. */
export interface DedicatedHostProperties {
  /** Fault domain of the dedicated host within a dedicated host group. */
  platformFaultDomain?: number;
  /** Specifies whether the dedicated host should be replaced automatically in case of a failure. The value is defaulted to 'true' when not provided. */
  autoReplaceOnFailure?: boolean;
  /** Specifies the software license type that will be applied to the VMs deployed on the dedicated host. <br><br> Possible values are: <br><br> **None** <br><br> **Windows_Server_Hybrid** <br><br> **Windows_Server_Perpetual** <br><br> Default: **None** */
  licenseType?: "None" | "Windows_Server_Hybrid" | "Windows_Server_Perpetual";
}

/** Specifies information about the dedicated host. Only tags, autoReplaceOnFailure and licenseType may be updated. */
export interface DedicatedHostUpdate extends UpdateResource {
  /** Properties of the dedicated host. */
  properties?: DedicatedHostProperties;
}

/** Specifies information about the SSH public key. */
export interface SshPublicKeyResource extends Resource {
  /** Properties of the SSH public key. */
  properties?: SshPublicKeyResourceProperties;
}

/** Properties of the SSH public key. */
export interface SshPublicKeyResourceProperties {
  /** SSH public key used to authenticate to a virtual machine through ssh. If this property is not initially provided when the resource is created, the publicKey property will be populated when generateKeyPair is called. If the public key is provided upon resource creation, the provided public key needs to be at least 2048-bit and in ssh-rsa format. */
  publicKey?: string;
}

/** Specifies information about the SSH public key. */
export interface SshPublicKeyUpdateResource extends UpdateResource {
  /** Properties of the SSH public key. */
  properties?: SshPublicKeyResourceProperties;
}

/** The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. */
export interface Image extends Resource {
  /** Describes the properties of an Image. */
  properties?: ImageProperties;
  /** The extended location of the Image. */
  extendedLocation?: ExtendedLocation;
}

/** Describes the properties of an Image. */
export interface ImageProperties {
  /** The source virtual machine from which Image is created. */
  sourceVirtualMachine?: SubResource;
  /** Specifies the storage settings for the virtual machine disks. */
  storageProfile?: ImageStorageProfile;
  /** Specifies the HyperVGenerationType of the VirtualMachine created from the image. From API Version 2019-03-01 if the image source is a blob, then we need the user to specify the value, if the source is managed resource like disk or snapshot, we may require the user to specify the property if we cannot deduce it from the source managed resource. */
  hyperVGeneration?: "V1" | "V2";
}

/** Describes a storage profile. */
export interface ImageStorageProfile {
  /** Specifies information about the operating system disk used by the virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  osDisk?: ImageOSDisk;
  /** Specifies the parameters that are used to add a data disk to a virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  dataDisks?: Array<ImageDataDisk>;
  /** Specifies whether an image is zone resilient or not. Default is false. Zone resilient images can be created only in regions that provide Zone Redundant Storage (ZRS). */
  zoneResilient?: boolean;
}

/** Describes an Operating System disk. */
export interface ImageOSDisk extends ImageDisk {
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from a custom image. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  osType: "Windows" | "Linux";
  /** The OS State. For managed images, use Generalized. */
  osState: "Generalized" | "Specialized";
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
  caching?: "None" | "ReadOnly" | "ReadWrite";
  /** Specifies the size of empty data disks in gigabytes. This element can be used to overwrite the name of the disk in a virtual machine image. <br><br> This value cannot be larger than 1023 GB */
  diskSizeGB?: number;
  /** Specifies the storage account type for the managed disk. NOTE: UltraSSD_LRS can only be used with data disks, it cannot be used with OS Disk. */
  storageAccountType?:
    | "Standard_LRS"
    | "Premium_LRS"
    | "StandardSSD_LRS"
    | "UltraSSD_LRS"
    | "Premium_ZRS"
    | "StandardSSD_ZRS"
    | "PremiumV2_LRS";
  /** Specifies the customer managed disk encryption set resource id for the managed image disk. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
}

/** Describes a data disk. */
export interface ImageDataDisk extends ImageDisk {
  /** Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. */
  lun: number;
}

/** The source user image virtual hard disk. Only tags may be updated. */
export interface ImageUpdate extends UpdateResource {
  /** Describes the properties of an Image. */
  properties?: ImageProperties;
}

/** Create or update Restore Point collection parameters. */
export interface RestorePointCollection extends Resource {
  /** The restore point collection properties. */
  properties?: RestorePointCollectionProperties;
}

/** The restore point collection properties. */
export interface RestorePointCollectionProperties {
  /** The properties of the source resource that this restore point collection is created from. */
  source?: RestorePointCollectionSourceProperties;
}

/** The properties of the source resource that this restore point collection is created from. */
export interface RestorePointCollectionSourceProperties {
  /** Resource Id of the source resource used to create this restore point collection */
  id?: string;
}

/** Restore Point details. */
export interface RestorePoint extends ProxyResource {
  /** The restore point properties. */
  properties?: RestorePointProperties;
}

/** The restore point properties. */
export interface RestorePointProperties {
  /** List of disk resource ids that the customer wishes to exclude from the restore point. If no disks are specified, all disks will be included. */
  excludeDisks?: Array<ApiEntityReference>;
  /** ConsistencyMode of the RestorePoint. Can be specified in the input while creating a restore point. For now, only CrashConsistent is accepted as a valid input. Please refer to https://aka.ms/RestorePoints for more details. */
  consistencyMode?: "CrashConsistent" | "FileSystemConsistent" | "ApplicationConsistent";
  /** Gets the creation time of the restore point. */
  timeCreated?: Date | string;
  /** Resource Id of the source restore point from which a copy needs to be created. */
  sourceRestorePoint?: ApiEntityReference;
}

/** Describes the properties of the Virtual Machine for which the restore point was created. The properties provided are a subset and the snapshot of the overall Virtual Machine properties captured at the time of the restore point creation. */
export interface RestorePointSourceMetadata {
  /** Gets the hardware profile. */
  hardwareProfile?: HardwareProfile;
  /** Gets the storage profile. */
  storageProfile?: RestorePointSourceVMStorageProfile;
  /** Gets the OS profile. */
  osProfile?: OSProfile;
  /** Gets the diagnostics profile. */
  diagnosticsProfile?: DiagnosticsProfile;
  /** Gets the license type, which is for bring your own license scenario. */
  licenseType?: string;
  /** Gets the virtual machine unique id. */
  vmId?: string;
  /** Gets the security profile. */
  securityProfile?: SecurityProfile;
  /** Location of the VM from which the restore point was created. */
  location?: string;
}

/** Describes the storage profile. */
export interface RestorePointSourceVMStorageProfile {
  /** Gets the OS disk of the VM captured at the time of the restore point creation. */
  osDisk?: RestorePointSourceVmosDisk;
  /** Gets the data disks of the VM captured at the time of the restore point creation. */
  dataDisks?: Array<RestorePointSourceVMDataDisk>;
}

/** Describes an Operating System disk. */
export interface RestorePointSourceVmosDisk {
  /** Gets the Operating System type. */
  osType?: "Windows" | "Linux";
  /** Gets the disk encryption settings. */
  encryptionSettings?: DiskEncryptionSettings;
  /** Gets the disk name. */
  name?: string;
  /** Gets the caching type. */
  caching?: "None" | "ReadOnly" | "ReadWrite";
  /** Gets the disk size in GB. */
  diskSizeGB?: number;
  /** Gets the managed disk details */
  managedDisk?: ManagedDiskParameters;
  /** Gets the disk restore point Id. */
  diskRestorePoint?: ApiEntityReference;
}

/** Describes a data disk. */
export interface RestorePointSourceVMDataDisk {
  /** Gets the logical unit number. */
  lun?: number;
  /** Gets the disk name. */
  name?: string;
  /** Gets the caching type. */
  caching?: "None" | "ReadOnly" | "ReadWrite";
  /** Gets the initial disk size in GB for blank data disks, and the new desired size for existing OS and Data disks. */
  diskSizeGB?: number;
  /** Gets the managed disk details */
  managedDisk?: ManagedDiskParameters;
  /** Gets the disk restore point Id. */
  diskRestorePoint?: ApiEntityReference;
}

/** The instance view of a restore point. */
export interface RestorePointInstanceView {
  /** The disk restore points information. */
  diskRestorePoints?: Array<DiskRestorePointInstanceView>;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatus>;
}

/** The instance view of a disk restore point. */
export interface DiskRestorePointInstanceView {
  /** Disk restore point Id. */
  id?: string;
  /** The disk restore point replication status information. */
  replicationStatus?: DiskRestorePointReplicationStatus;
}

/** The instance view of a disk restore point. */
export interface DiskRestorePointReplicationStatus {
  /** The resource status information. */
  status?: InstanceViewStatus;
  /** Replication completion percentage. */
  completionPercent?: number;
}

/** The resource model definition for an Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource {}

/** Update Restore Point collection parameters. */
export interface RestorePointCollectionUpdate extends UpdateResource {
  /** The restore point collection properties. */
  properties?: RestorePointCollectionProperties;
}

/** Specifies information about the capacity reservation group that the capacity reservations should be assigned to. <br><br> Currently, a capacity reservation can only be added to a capacity reservation group at creation time. An existing capacity reservation cannot be added or moved to another capacity reservation group. */
export interface CapacityReservationGroup extends Resource {
  /** capacity reservation group Properties. */
  properties?: CapacityReservationGroupProperties;
  /** Availability Zones to use for this capacity reservation group. The zones can be assigned only during creation. If not provided, the group supports only regional resources in the region. If provided, enforces each capacity reservation in the group to be in one of the zones. */
  zones?: Array<string>;
}

/** capacity reservation group Properties. */
export interface CapacityReservationGroupProperties {}

export interface CapacityReservationGroupInstanceView {}

/** The instance view of a capacity reservation that includes the name of the capacity reservation. It is used for the response to the instance view of a capacity reservation group. */
export interface CapacityReservationInstanceViewWithName extends CapacityReservationInstanceView {}

/** The instance view of a capacity reservation that provides as snapshot of the runtime properties of the capacity reservation that is managed by the platform and can change outside of control plane operations. */
export interface CapacityReservationInstanceView {
  /** Unutilized capacity of the capacity reservation. */
  utilizationInfo?: CapacityReservationUtilization;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatus>;
}

/** Represents the capacity reservation utilization in terms of resources allocated. */
export interface CapacityReservationUtilization {}

/** Specifies information about the capacity reservation group. Only tags can be updated. */
export interface CapacityReservationGroupUpdate extends UpdateResource {
  /** capacity reservation group Properties. */
  properties?: CapacityReservationGroupProperties;
}

/** Specifies information about the capacity reservation. */
export interface CapacityReservation extends Resource {
  /** Properties of the Capacity reservation. */
  properties?: CapacityReservationProperties;
  /** SKU of the resource for which capacity needs be reserved. The SKU name and capacity is required to be set. Currently VM Skus with the capability called 'CapacityReservationSupported' set to true are supported. Refer to List Microsoft.Compute SKUs in a region (https://docs.microsoft.com/rest/api/compute/resourceskus/list) for supported values. */
  sku: Sku;
  /** Availability Zone to use for this capacity reservation. The zone has to be single value and also should be part for the list of zones specified during the capacity reservation group creation. The zone can be assigned only during creation. If not provided, the reservation supports only non-zonal deployments. If provided, enforces VM/VMSS using this capacity reservation to be in same zone. */
  zones?: Array<string>;
}

/** Properties of the Capacity reservation. */
export interface CapacityReservationProperties {}

/** Specifies information about the capacity reservation. Only tags and sku.capacity can be updated. */
export interface CapacityReservationUpdate extends UpdateResource {
  /** Properties of the Capacity reservation. */
  properties?: CapacityReservationProperties;
  /** SKU of the resource for which capacity needs be reserved. The SKU name and capacity is required to be set. Currently VM Skus with the capability called 'CapacityReservationSupported' set to true are supported. Refer to List Microsoft.Compute SKUs in a region (https://docs.microsoft.com/rest/api/compute/resourceskus/list) for supported values. */
  sku?: Sku;
}

/** Api request input for LogAnalytics getRequestRateByInterval Api. */
export interface RequestRateByIntervalInput extends LogAnalyticsInputBase {
  /** Interval value in minutes used to create LogAnalytics call rate logs. */
  intervalLength: "ThreeMins" | "FiveMins" | "ThirtyMins" | "SixtyMins";
}

/** Api input base class for LogAnalytics Api. */
export interface LogAnalyticsInputBase {
  /** SAS Uri of the logging blob container to which LogAnalytics Api writes output logs to. */
  blobContainerSasUri: string;
  /** From time of the query */
  fromTime: Date | string;
  /** To time of the query */
  toTime: Date | string;
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

/** Api request input for LogAnalytics getThrottledRequests Api. */
export interface ThrottledRequestsInput extends LogAnalyticsInputBase {}

/** Capture Virtual Machine parameters. */
export interface RunCommandInput {
  /** The run command id. */
  commandId: string;
  /** Optional. The script to be executed.  When this value is given, the given script will override the default script of the command. */
  script?: Array<string>;
  /** The run command parameters. */
  parameters?: Array<RunCommandInputParameter>;
}

/** Describes the properties of a run command parameter. */
export interface RunCommandInputParameter {
  /** The run command parameter name. */
  name: string;
  /** The run command parameter value. */
  value: string;
}

/** Describes a Virtual Machine run command. */
export interface VirtualMachineRunCommand extends Resource {
  /** Describes the properties of a Virtual Machine run command. */
  properties?: VirtualMachineRunCommandProperties;
}

/** Describes the properties of a Virtual Machine run command. */
export interface VirtualMachineRunCommandProperties {
  /** The source of the run command script. */
  source?: VirtualMachineRunCommandScriptSource;
  /** The parameters used by the script. */
  parameters?: Array<RunCommandInputParameter>;
  /** The parameters used by the script. */
  protectedParameters?: Array<RunCommandInputParameter>;
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
  executionState?:
    | "Unknown"
    | "Pending"
    | "Running"
    | "Failed"
    | "Succeeded"
    | "TimedOut"
    | "Canceled";
  /** Communicate script configuration errors or execution messages. */
  executionMessage?: string;
  /** Exit code returned from script execution. */
  exitCode?: number;
  /** Script output stream. */
  output?: string;
  /** Script error stream. */
  error?: string;
  /** Script start time. */
  startTime?: Date | string;
  /** Script end time. */
  endTime?: Date | string;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatus>;
}

/** Describes a Virtual Machine run command. */
export interface VirtualMachineRunCommandUpdate extends UpdateResource {
  /** Describes the properties of a Virtual Machine run command. */
  properties?: VirtualMachineRunCommandProperties;
}

/** Disk resource. */
export interface Disk extends Resource {
  /** The disks sku name. Can be Standard_LRS, Premium_LRS, StandardSSD_LRS, UltraSSD_LRS, Premium_ZRS, StandardSSD_ZRS, or PremiumV2_LRS. */
  sku?: DiskSku;
  /** The Logical zone list for Disk. */
  zones?: Array<string>;
  /** The extended location where the disk will be created. Extended location cannot be changed. */
  extendedLocation?: ExtendedLocation;
  /** Disk resource properties. */
  properties?: DiskProperties;
}

/** The disks sku name. Can be Standard_LRS, Premium_LRS, StandardSSD_LRS, UltraSSD_LRS, Premium_ZRS, StandardSSD_ZRS, or PremiumV2_LRS. */
export interface DiskSku {
  /** The sku name. */
  name?:
    | "Standard_LRS"
    | "Premium_LRS"
    | "StandardSSD_LRS"
    | "UltraSSD_LRS"
    | "Premium_ZRS"
    | "StandardSSD_ZRS"
    | "PremiumV2_LRS";
}

/** Disk resource properties. */
export interface DiskProperties {
  /** The Operating System type. */
  osType?: "Windows" | "Linux";
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: "V1" | "V2";
  /** Purchase plan information for the the image from which the OS disk was created. E.g. - {name: 2019-Datacenter, publisher: MicrosoftWindowsServer, product: WindowsServer} */
  purchasePlan?: PurchasePlanAutoGenerated;
  /** List of supported capabilities for the image from which the OS disk was created. */
  supportedCapabilities?: SupportedCapabilities;
  /** Disk source information. CreationData information cannot be changed after the disk has been created. */
  creationData: CreationData;
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /** Encryption settings collection used for Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollection;
  /** The number of IOPS allowed for this disk; only settable for UltraSSD disks. One operation can transfer between 4k and 256k bytes. */
  diskIOPSReadWrite?: number;
  /** The bandwidth allowed for this disk; only settable for UltraSSD disks. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadWrite?: number;
  /** The total number of IOPS that will be allowed across all VMs mounting the shared disk as ReadOnly. One operation can transfer between 4k and 256k bytes. */
  diskIOPSReadOnly?: number;
  /** The total throughput (MBps) that will be allowed across all VMs mounting the shared disk as ReadOnly. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadOnly?: number;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: Encryption;
  /** The maximum number of VMs that can attach to the disk at the same time. Value greater than one indicates a disk that can be mounted on multiple VMs at the same time. */
  maxShares?: number;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: "AllowAll" | "AllowPrivate" | "DenyAll";
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Performance tier of the disk (e.g, P4, S10) as described here: https://azure.microsoft.com/en-us/pricing/details/managed-disks/. Does not apply to Ultra disks. */
  tier?: string;
  /** Set to true to enable bursting beyond the provisioned performance target of the disk. Bursting is disabled by default. Does not apply to Ultra disks. */
  burstingEnabled?: boolean;
  /** Indicates the OS on a disk supports hibernation. */
  supportsHibernation?: boolean;
  /** Contains the security related information for the resource. */
  securityProfile?: DiskSecurityProfile;
  /** Percentage complete for the background copy when a resource is created via the CopyStart operation. */
  completionPercent?: number;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: "Enabled" | "Disabled";
  /** Additional authentication requirements when exporting or uploading to a disk or snapshot. */
  dataAccessAuthMode?: "AzureActiveDirectory" | "None";
  /** Setting this property to true improves reliability and performance of data disks that are frequently (more than 5 times a day) by detached from one virtual machine and attached to another. This property should not be set for disks that are not detached and attached frequently as it causes the disks to not align with the fault domain of the virtual machine. */
  optimizedForFrequentAttach?: boolean;
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

/** List of supported capabilities persisted on the disk resource for VM use. */
export interface SupportedCapabilities {
  /** The disk controllers that an OS disk supports. If set it can be SCSI or SCSI, NVME or NVME, SCSI. */
  diskControllerTypes?: string;
  /** True if the image from which the OS disk is created supports accelerated networking. */
  acceleratedNetwork?: boolean;
  /** CPU architecture supported by an OS disk. */
  architecture?: "x64" | "Arm64";
}

/** Data used when creating a disk. */
export interface CreationData {
  /** This enumerates the possible sources of a disk's creation. */
  createOption:
    | "Empty"
    | "Attach"
    | "FromImage"
    | "Import"
    | "Copy"
    | "Restore"
    | "Upload"
    | "CopyStart"
    | "ImportSecure"
    | "UploadPreparedSecure";
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
  /** If createOption is Upload, this is the size of the contents of the upload including the VHD footer. This value should be between 20972032 (20 MiB + 512 bytes for the VHD footer) and 35183298347520 bytes (32 TiB + 512 bytes for the VHD footer). */
  uploadSizeBytes?: number;
  /** Logical sector size in bytes for Ultra disks. Supported values are 512 ad 4096. 4096 is the default. */
  logicalSectorSize?: number;
  /** If createOption is ImportSecure, this is the URI of a blob to be imported into VM guest state. */
  securityDataUri?: string;
  /** Set this flag to true to get a boost on the performance target of the disk deployed, see here on the respective performance target. This flag can only be set on disk creation time and cannot be disabled after enabled. */
  performancePlus?: boolean;
}

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

/** Encryption settings for disk or snapshot */
export interface EncryptionSettingsCollection {
  /** Set this flag to true and provide DiskEncryptionKey and optional KeyEncryptionKey to enable encryption. Set this flag to false and remove DiskEncryptionKey and KeyEncryptionKey to disable encryption. If EncryptionSettings is null in the request object, the existing settings remain unchanged. */
  enabled: boolean;
  /** A collection of encryption settings, one for each disk volume. */
  encryptionSettings?: Array<EncryptionSettingsElement>;
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
  type?:
    | "EncryptionAtRestWithPlatformKey"
    | "EncryptionAtRestWithCustomerKey"
    | "EncryptionAtRestWithPlatformAndCustomerKeys";
}

export interface ShareInfoElement {}

/** Properties of the disk for which update is pending. */
export interface PropertyUpdatesInProgress {
  /** The target performance tier of the disk if a tier change operation is in progress. */
  targetTier?: string;
}

/** Contains the security related information for the resource. */
export interface DiskSecurityProfile {
  /** Specifies the SecurityType of the VM. Applicable for OS disks only. */
  securityType?:
    | "TrustedLaunch"
    | "ConfidentialVM_VMGuestStateOnlyEncryptedWithPlatformKey"
    | "ConfidentialVM_DiskEncryptedWithPlatformKey"
    | "ConfidentialVM_DiskEncryptedWithCustomerKey";
  /** ResourceId of the disk encryption set associated to Confidential VM supported disk encrypted with customer managed key */
  secureVMDiskEncryptionSetId?: string;
}

/** Disk update resource. */
export interface DiskUpdate {
  /** Disk resource update properties. */
  properties?: DiskUpdateProperties;
  /** Resource tags */
  tags?: Record<string, string>;
  /** The disks sku name. Can be Standard_LRS, Premium_LRS, StandardSSD_LRS, UltraSSD_LRS, Premium_ZRS, StandardSSD_ZRS, or PremiumV2_LRS. */
  sku?: DiskSku;
}

/** Disk resource update properties. */
export interface DiskUpdateProperties {
  /** the Operating System type. */
  osType?: "Windows" | "Linux";
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /** Encryption settings collection used be Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollection;
  /** The number of IOPS allowed for this disk; only settable for UltraSSD disks. One operation can transfer between 4k and 256k bytes. */
  diskIOPSReadWrite?: number;
  /** The bandwidth allowed for this disk; only settable for UltraSSD disks. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadWrite?: number;
  /** The total number of IOPS that will be allowed across all VMs mounting the shared disk as ReadOnly. One operation can transfer between 4k and 256k bytes. */
  diskIOPSReadOnly?: number;
  /** The total throughput (MBps) that will be allowed across all VMs mounting the shared disk as ReadOnly. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadOnly?: number;
  /** The maximum number of VMs that can attach to the disk at the same time. Value greater than one indicates a disk that can be mounted on multiple VMs at the same time. */
  maxShares?: number;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: Encryption;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: "AllowAll" | "AllowPrivate" | "DenyAll";
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Performance tier of the disk (e.g, P4, S10) as described here: https://azure.microsoft.com/en-us/pricing/details/managed-disks/. Does not apply to Ultra disks. */
  tier?: string;
  /** Set to true to enable bursting beyond the provisioned performance target of the disk. Bursting is disabled by default. Does not apply to Ultra disks. */
  burstingEnabled?: boolean;
  /** Purchase plan information to be added on the OS disk */
  purchasePlan?: PurchasePlanAutoGenerated;
  /** List of supported capabilities to be added on the OS disk. */
  supportedCapabilities?: SupportedCapabilities;
  /** Indicates the OS on a disk supports hibernation. */
  supportsHibernation?: boolean;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: "Enabled" | "Disabled";
  /** Additional authentication requirements when exporting or uploading to a disk or snapshot. */
  dataAccessAuthMode?: "AzureActiveDirectory" | "None";
  /** Setting this property to true improves reliability and performance of data disks that are frequently (more than 5 times a day) by detached from one virtual machine and attached to another. This property should not be set for disks that are not detached and attached frequently as it causes the disks to not align with the fault domain of the virtual machine. */
  optimizedForFrequentAttach?: boolean;
}

/** Data used for requesting a SAS. */
export interface GrantAccessData {
  access: "None" | "Read" | "Write";
  /** Time duration in seconds until the SAS access expires. */
  durationInSeconds: number;
  /** Set this flag to true to get additional SAS for VM guest state */
  getSecureVMGuestStateSAS?: boolean;
}

/** disk access resource. */
export interface DiskAccess extends Resource {
  properties?: DiskAccessProperties;
  /** The extended location where the disk access will be created. Extended location cannot be changed. */
  extendedLocation?: ExtendedLocation;
}

export interface DiskAccessProperties {}

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnection {
  /** Resource properties. */
  properties?: PrivateEndpointConnectionProperties;
}

/** Properties of the PrivateEndpointConnectProperties. */
export interface PrivateEndpointConnectionProperties {
  /** A collection of information about the state of the connection between DiskAccess and Virtual Network. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
}

/** The Private Endpoint resource. */
export interface PrivateEndpoint {}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: "Pending" | "Approved" | "Rejected";
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

/** Used for updating a disk access resource. */
export interface DiskAccessUpdate {
  /** Resource tags */
  tags?: Record<string, string>;
}

/** disk encryption set resource. */
export interface DiskEncryptionSet extends Resource {
  /** The managed identity for the disk encryption set. It should be given permission on the key vault before it can be used to encrypt disks. */
  identity?: EncryptionSetIdentity;
  properties?: EncryptionSetProperties;
}

/** The managed identity for the disk encryption set. It should be given permission on the key vault before it can be used to encrypt disks. */
export interface EncryptionSetIdentity {
  /** The type of Managed Identity used by the DiskEncryptionSet. Only SystemAssigned is supported for new creations. Disk Encryption Sets can be updated with Identity type None during migration of subscription to a new Azure Active Directory tenant; it will cause the encrypted resources to lose access to the keys. */
  type?: "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";
  /** The list of user identities associated with the disk encryption set. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserAssignedIdentitiesValue>;
}

export interface EncryptionSetProperties {
  /** The type of key used to encrypt the data of the disk. */
  encryptionType?:
    | "EncryptionAtRestWithCustomerKey"
    | "EncryptionAtRestWithPlatformAndCustomerKeys"
    | "ConfidentialVmEncryptedWithCustomerKey";
  /** The key vault key which is currently used by this disk encryption set. */
  activeKey?: KeyForDiskEncryptionSet;
  /** Set this flag to true to enable auto-updating of this disk encryption set to the latest key version. */
  rotationToLatestKeyVersionEnabled?: boolean;
  /** Multi-tenant application client id to access key vault in a different tenant. Setting the value to 'None' will clear the property. */
  federatedClientId?: string;
}

/** Key Vault Key Url to be used for server side encryption of Managed Disks and Snapshots */
export interface KeyForDiskEncryptionSet {
  /** Resource id of the KeyVault containing the key or secret. This property is optional and cannot be used if the KeyVault subscription is not the same as the Disk Encryption Set subscription. */
  sourceVault?: SourceVault;
  /** Fully versioned Key Url pointing to a key in KeyVault. Version segment of the Url is required regardless of rotationToLatestKeyVersionEnabled value. */
  keyUrl: string;
}

/** disk encryption set update resource. */
export interface DiskEncryptionSetUpdate {
  /** disk encryption set resource update properties. */
  properties?: DiskEncryptionSetUpdateProperties;
  /** Resource tags */
  tags?: Record<string, string>;
  /** The managed identity for the disk encryption set. It should be given permission on the key vault before it can be used to encrypt disks. */
  identity?: EncryptionSetIdentity;
}

/** disk encryption set resource update properties. */
export interface DiskEncryptionSetUpdateProperties {
  /** The type of key used to encrypt the data of the disk. */
  encryptionType?:
    | "EncryptionAtRestWithCustomerKey"
    | "EncryptionAtRestWithPlatformAndCustomerKeys"
    | "ConfidentialVmEncryptedWithCustomerKey";
  /** Key Vault Key Url to be used for server side encryption of Managed Disks and Snapshots */
  activeKey?: KeyForDiskEncryptionSet;
  /** Set this flag to true to enable auto-updating of this disk encryption set to the latest key version. */
  rotationToLatestKeyVersionEnabled?: boolean;
  /** Multi-tenant application client id to access key vault in a different tenant. Setting the value to 'None' will clear the property. */
  federatedClientId?: string;
}

/** Snapshot resource. */
export interface Snapshot extends Resource {
  /** The snapshots sku name. Can be Standard_LRS, Premium_LRS, or Standard_ZRS. This is an optional parameter for incremental snapshot and the default behavior is the SKU will be set to the same sku as the previous snapshot */
  sku?: SnapshotSku;
  /** The extended location where the snapshot will be created. Extended location cannot be changed. */
  extendedLocation?: ExtendedLocation;
  /** Snapshot resource properties. */
  properties?: SnapshotProperties;
}

/** The snapshots sku name. Can be Standard_LRS, Premium_LRS, or Standard_ZRS. This is an optional parameter for incremental snapshot and the default behavior is the SKU will be set to the same sku as the previous snapshot */
export interface SnapshotSku {
  /** The sku name. */
  name?: "Standard_LRS" | "Premium_LRS" | "Standard_ZRS";
}

/** Snapshot resource properties. */
export interface SnapshotProperties {
  /** The Operating System type. */
  osType?: "Windows" | "Linux";
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: "V1" | "V2";
  /** Purchase plan information for the image from which the source disk for the snapshot was originally created. */
  purchasePlan?: PurchasePlanAutoGenerated;
  /** List of supported capabilities for the image from which the source disk from the snapshot was originally created. */
  supportedCapabilities?: SupportedCapabilities;
  /** Disk source information. CreationData information cannot be changed after the disk has been created. */
  creationData: CreationData;
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /** Encryption settings collection used be Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollection;
  /** Whether a snapshot is incremental. Incremental snapshots on the same disk occupy less space than full snapshots and can be diffed. */
  incremental?: boolean;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: Encryption;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: "AllowAll" | "AllowPrivate" | "DenyAll";
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Contains the security related information for the resource. */
  securityProfile?: DiskSecurityProfile;
  /** Indicates the OS on a snapshot supports hibernation. */
  supportsHibernation?: boolean;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: "Enabled" | "Disabled";
  /** Percentage complete for the background copy when a resource is created via the CopyStart operation. */
  completionPercent?: number;
  /** Indicates the error details if the background copy of a resource created via the CopyStart operation fails. */
  copyCompletionError?: CopyCompletionError;
  /** Additional authentication requirements when exporting or uploading to a disk or snapshot. */
  dataAccessAuthMode?: "AzureActiveDirectory" | "None";
}

/** Indicates the error details if the background copy of a resource created via the CopyStart operation fails. */
export interface CopyCompletionError {
  /** Indicates the error code if the background copy of a resource created via the CopyStart operation fails. */
  errorCode: "CopySourceNotFound";
  /** Indicates the error message if the background copy of a resource created via the CopyStart operation fails. */
  errorMessage: string;
}

/** Snapshot update resource. */
export interface SnapshotUpdate {
  /** Snapshot resource update properties. */
  properties?: SnapshotUpdateProperties;
  /** Resource tags */
  tags?: Record<string, string>;
  /** The snapshots sku name. Can be Standard_LRS, Premium_LRS, or Standard_ZRS. This is an optional parameter for incremental snapshot and the default behavior is the SKU will be set to the same sku as the previous snapshot */
  sku?: SnapshotSku;
}

/** Snapshot resource update properties. */
export interface SnapshotUpdateProperties {
  /** the Operating System type. */
  osType?: "Windows" | "Linux";
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /** Encryption settings collection used be Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollection;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: Encryption;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: "AllowAll" | "AllowPrivate" | "DenyAll";
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Indicates the OS on a snapshot supports hibernation. */
  supportsHibernation?: boolean;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: "Enabled" | "Disabled";
  /** Additional authentication requirements when exporting or uploading to a disk or snapshot. */
  dataAccessAuthMode?: "AzureActiveDirectory" | "None";
  /** List of supported capabilities for the image from which the OS disk was created. */
  supportedCapabilities?: SupportedCapabilities;
}

/** Specifies information about the Shared Image Gallery that you want to create or update. */
export interface Gallery extends Resource {
  /** Describes the properties of a Shared Image Gallery. */
  properties?: GalleryProperties;
}

/** Describes the properties of a Shared Image Gallery. */
export interface GalleryProperties {
  /** The description of this Shared Image Gallery resource. This property is updatable. */
  description?: string;
  /** Describes the gallery unique name. */
  identifier?: GalleryIdentifier;
  /** Profile for gallery sharing to subscription or tenant */
  sharingProfile?: SharingProfile;
  /** Contains information about the soft deletion policy of the gallery. */
  softDeletePolicy?: SoftDeletePolicy;
}

/** Describes the gallery unique name. */
export interface GalleryIdentifier {}

/** Profile for gallery sharing to subscription or tenant */
export interface SharingProfile {
  /** This property allows you to specify the permission of sharing gallery. <br><br> Possible values are: <br><br> **Private** <br><br> **Groups** <br><br> **Community** */
  permissions?: "Private" | "Groups" | "Community";
  /** Information of community gallery if current gallery is shared to community. */
  communityGalleryInfo?: CommunityGalleryInfo;
}

/** Group of the gallery sharing profile */
export interface SharingProfileGroup {
  /** This property allows you to specify the type of sharing group. <br><br> Possible values are: <br><br> **Subscriptions** <br><br> **AADTenants** */
  type?: "Subscriptions" | "AADTenants";
  /** A list of subscription/tenant ids the gallery is aimed to be shared to. */
  ids?: Array<string>;
}

/** Information of community gallery if current gallery is shared to community */
export interface CommunityGalleryInfo {
  /** The link to the publisher website. Visible to all users. */
  publisherUri?: string;
  /** Community gallery publisher support email. The email address of the publisher. Visible to all users. */
  publisherContact?: string;
  /** End-user license agreement for community gallery image. */
  eula?: string;
  /** The prefix of the gallery name that will be displayed publicly. Visible to all users. */
  publicNamePrefix?: string;
}

/** Contains information about the soft deletion policy of the gallery. */
export interface SoftDeletePolicy {
  /** Enables soft-deletion for resources in this gallery, allowing them to be recovered within retention time. */
  isSoftDeleteEnabled?: boolean;
}

/** Sharing status of current gallery. */
export interface SharingStatus {
  /** Summary of all regional sharing status. */
  summary?: Array<RegionalSharingStatus>;
}

/** Gallery regional sharing status */
export interface RegionalSharingStatus {
  /** Region name */
  region?: string;
  /** Details of gallery regional sharing failure. */
  details?: string;
}

/** Specifies information about the Shared Image Gallery that you want to update. */
export interface GalleryUpdate extends UpdateResourceDefinition {
  /** Describes the properties of a Shared Image Gallery. */
  properties?: GalleryProperties;
}

/** The Update Resource model definition. */
export interface UpdateResourceDefinition {
  /** Resource tags */
  tags?: Record<string, string>;
}

/** Specifies information about the gallery image definition that you want to create or update. */
export interface GalleryImage extends Resource {
  /** Describes the properties of a gallery image definition. */
  properties?: GalleryImageProperties;
}

/** Describes the properties of a gallery image definition. */
export interface GalleryImageProperties {
  /** The description of this gallery image definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement for the gallery image definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** This property allows you to specify the type of the OS that is included in the disk when creating a VM from a managed image. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  osType: "Windows" | "Linux";
  /** This property allows the user to specify whether the virtual machines created under this image are 'Generalized' or 'Specialized'. */
  osState: "Generalized" | "Specialized";
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: "V1" | "V2";
  /** The end of life date of the gallery image definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date | string;
  /** This is the gallery image definition identifier. */
  identifier: GalleryImageIdentifier;
  /** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
  recommended?: RecommendedMachineConfiguration;
  /** Describes the disallowed disk types. */
  disallowed?: Disallowed;
  /** Describes the gallery image definition purchase plan. This is used by marketplace images. */
  purchasePlan?: ImagePurchasePlan;
  /** A list of gallery image features. */
  features?: Array<GalleryImageFeature>;
  /** The architecture of the image. Applicable to OS disks only. */
  architecture?: "x64" | "Arm64";
}

/** This is the gallery image definition identifier. */
export interface GalleryImageIdentifier {
  /** The name of the gallery image definition publisher. */
  publisher: string;
  /** The name of the gallery image definition offer. */
  offer: string;
  /** The name of the gallery image definition SKU. */
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
  diskTypes?: Array<string>;
}

/** Describes the gallery image definition purchase plan. This is used by marketplace images. */
export interface ImagePurchasePlan {
  /** The plan ID. */
  name?: string;
  /** The publisher ID. */
  publisher?: string;
  /** The product ID. */
  product?: string;
}

/** A feature for gallery image. */
export interface GalleryImageFeature {
  /** The name of the gallery image feature. */
  name?: string;
  /** The value of the gallery image feature. */
  value?: string;
}

/** Specifies information about the gallery image definition that you want to update. */
export interface GalleryImageUpdate extends UpdateResourceDefinition {
  /** Describes the properties of a gallery image definition. */
  properties?: GalleryImageProperties;
}

/** Specifies information about the gallery image version that you want to create or update. */
export interface GalleryImageVersion extends Resource {
  /** Describes the properties of a gallery image version. */
  properties?: GalleryImageVersionProperties;
}

/** Describes the properties of a gallery image version. */
export interface GalleryImageVersionProperties {
  /** The publishing profile of a gallery image Version. */
  publishingProfile?: GalleryImageVersionPublishingProfile;
  /** This is the storage profile of a Gallery Image Version. */
  storageProfile: GalleryImageVersionStorageProfile;
}

/** The publishing profile of a gallery image Version. */
export interface GalleryImageVersionPublishingProfile extends GalleryArtifactPublishingProfileBase {}

/** Describes the basic gallery artifact publishing profile. */
export interface GalleryArtifactPublishingProfileBase {
  /** The target regions where the Image Version is going to be replicated to. This property is updatable. */
  targetRegions?: Array<TargetRegion>;
  /** The number of replicas of the Image Version to be created per region. This property would take effect for a region when regionalReplicaCount is not specified. This property is updatable. */
  replicaCount?: number;
  /** If set to true, Virtual Machines deployed from the latest version of the Image Definition won't use this Image Version. */
  excludeFromLatest?: boolean;
  /** The end of life date of the gallery image version. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date | string;
  /** Specifies the storage account type to be used to store the image. This property is not updatable. */
  storageAccountType?: "Standard_LRS" | "Standard_ZRS" | "Premium_LRS";
  /** Optional parameter which specifies the mode to be used for replication. This property is not updatable. */
  replicationMode?: "Full" | "Shallow";
  /** The target extended locations where the Image Version is going to be replicated to. This property is updatable. */
  targetExtendedLocations?: Array<GalleryTargetExtendedLocation>;
}

/** Describes the target region information. */
export interface TargetRegion {
  /** The name of the region. */
  name: string;
  /** The number of replicas of the Image Version to be created per region. This property is updatable. */
  regionalReplicaCount?: number;
  /** Specifies the storage account type to be used to store the image. This property is not updatable. */
  storageAccountType?: "Standard_LRS" | "Standard_ZRS" | "Premium_LRS";
  /** Optional. Allows users to provide customer managed keys for encrypting the OS and data disks in the gallery artifact. */
  encryption?: EncryptionImages;
}

/** Optional. Allows users to provide customer managed keys for encrypting the OS and data disks in the gallery artifact. */
export interface EncryptionImages {
  /** Contains encryption settings for an OS disk image. */
  osDiskImage?: OSDiskImageEncryption;
  /** A list of encryption specifications for data disk images. */
  dataDiskImages?: Array<DataDiskImageEncryption>;
}

/** Contains encryption settings for an OS disk image. */
export interface OSDiskImageEncryption extends DiskImageEncryption {
  /** This property specifies the security profile of an OS disk image. */
  securityProfile?: OSDiskImageSecurityProfile;
}

/** Contains security profile for an OS disk image. */
export interface OSDiskImageSecurityProfile {
  /** confidential VM encryption types */
  confidentialVMEncryptionType?:
    | "EncryptedVMGuestStateOnlyWithPmk"
    | "EncryptedWithPmk"
    | "EncryptedWithCmk";
  /** secure VM disk encryption set id */
  secureVMDiskEncryptionSetId?: string;
}

/** This is the disk image encryption base class. */
export interface DiskImageEncryption {
  /** A relative URI containing the resource ID of the disk encryption set. */
  diskEncryptionSetId?: string;
}

/** Contains encryption settings for a data disk image. */
export interface DataDiskImageEncryption extends DiskImageEncryption {
  /** This property specifies the logical unit number of the data disk. This value is used to identify data disks within the Virtual Machine and therefore must be unique for each data disk attached to the Virtual Machine. */
  lun: number;
}

export interface GalleryTargetExtendedLocation {
  /** The name of the region. */
  name?: string;
  /** The name of the extended location. */
  extendedLocation?: GalleryExtendedLocation;
  /** The number of replicas of the Image Version to be created per extended location. This property is updatable. */
  extendedLocationReplicaCount?: number;
  /** Specifies the storage account type to be used to store the image. This property is not updatable. */
  storageAccountType?: "Standard_LRS" | "Standard_ZRS" | "Premium_LRS";
  /** Optional. Allows users to provide customer managed keys for encrypting the OS and data disks in the gallery artifact. */
  encryption?: EncryptionImages;
}

/** The name of the extended location. */
export interface GalleryExtendedLocation {
  name?: string;
  /** It is type of the extended location. */
  type?: "EdgeZone" | "Unknown";
}

/** This is the storage profile of a Gallery Image Version. */
export interface GalleryImageVersionStorageProfile {
  /** The gallery artifact version source. */
  source?: GalleryArtifactVersionSource;
  /** This is the OS disk image. */
  osDiskImage?: GalleryOSDiskImage;
  /** A list of data disk images. */
  dataDiskImages?: Array<GalleryDataDiskImage>;
}

/** The gallery artifact version source. */
export interface GalleryArtifactVersionSource {
  /** The id of the gallery artifact version source. Can specify a disk uri, snapshot uri, user image or storage account resource. */
  id?: string;
  /** The uri of the gallery artifact version source. Currently used to specify vhd/blob source. */
  uri?: string;
}

/** This is the OS disk image. */
export interface GalleryOSDiskImage extends GalleryDiskImage {}

/** This is the disk image base class. */
export interface GalleryDiskImage {
  /** The host caching of the disk. Valid values are 'None', 'ReadOnly', and 'ReadWrite' */
  hostCaching?: "None" | "ReadOnly" | "ReadWrite";
  /** The gallery artifact version source. */
  source?: GalleryArtifactVersionSource;
}

/** This is the data disk image. */
export interface GalleryDataDiskImage extends GalleryDiskImage {
  /** This property specifies the logical unit number of the data disk. This value is used to identify data disks within the Virtual Machine and therefore must be unique for each data disk attached to the Virtual Machine. */
  lun: number;
}

/** This is the replication status of the gallery image version. */
export interface ReplicationStatus {}

/** This is the regional replication status. */
export interface RegionalReplicationStatus {}

/** Specifies information about the gallery image version that you want to update. */
export interface GalleryImageVersionUpdate extends UpdateResourceDefinition {
  /** Describes the properties of a gallery image version. */
  properties?: GalleryImageVersionProperties;
}

/** Specifies information about the gallery Application Definition that you want to create or update. */
export interface GalleryApplication extends Resource {
  /** Describes the properties of a gallery Application Definition. */
  properties?: GalleryApplicationProperties;
}

/** Describes the properties of a gallery Application Definition. */
export interface GalleryApplicationProperties {
  /** The description of this gallery Application Definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement for the gallery Application Definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** The end of life date of the gallery Application Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: Date | string;
  /** This property allows you to specify the supported type of the OS that application is built for. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  supportedOSType: "Windows" | "Linux";
}

/** Specifies information about the gallery Application Definition that you want to update. */
export interface GalleryApplicationUpdate extends UpdateResourceDefinition {
  /** Describes the properties of a gallery Application Definition. */
  properties?: GalleryApplicationProperties;
}

/** Specifies information about the gallery Application Version that you want to create or update. */
export interface GalleryApplicationVersion extends Resource {
  /** Describes the properties of a gallery image version. */
  properties?: GalleryApplicationVersionProperties;
}

/** Describes the properties of a gallery image version. */
export interface GalleryApplicationVersionProperties {
  /** The publishing profile of a gallery image version. */
  publishingProfile: GalleryApplicationVersionPublishingProfile;
}

/** The publishing profile of a gallery image version. */
export interface GalleryApplicationVersionPublishingProfile extends GalleryArtifactPublishingProfileBase {
  /** The source image from which the Image Version is going to be created. */
  source: UserArtifactSource;
  manageActions?: UserArtifactManage;
  /** Additional settings for the VM app that contains the target package and config file name when it is deployed to target VM or VM scale set. */
  settings?: UserArtifactSettings;
  /** Optional. Additional settings to pass to the vm-application-manager extension. For advanced use only. */
  advancedSettings?: Record<string, string>;
  /** Optional. Whether or not this application reports health. */
  enableHealthCheck?: boolean;
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

/** Additional settings for the VM app that contains the target package and config file name when it is deployed to target VM or VM scale set. */
export interface UserArtifactSettings {
  /** Optional. The name to assign the downloaded package file on the VM. This is limited to 4096 characters. If not specified, the package file will be named the same as the Gallery Application name. */
  packageFileName?: string;
  /** Optional. The name to assign the downloaded config file on the VM. This is limited to 4096 characters. If not specified, the config file will be named the Gallery Application name appended with "_config". */
  configFileName?: string;
}

/** Specifies information about the gallery Application Version that you want to update. */
export interface GalleryApplicationVersionUpdate extends UpdateResourceDefinition {
  /** Describes the properties of a gallery image version. */
  properties?: GalleryApplicationVersionProperties;
}

/** Specifies information about the gallery sharing profile update. */
export interface SharingUpdate {
  /** This property allows you to specify the operation type of gallery sharing update. <br><br> Possible values are: <br><br> **Add** <br><br> **Remove** <br><br> **Reset** */
  operationType: "Add" | "Remove" | "Reset" | "EnableCommunity";
  /** A list of sharing profile groups. */
  groups?: Array<SharingProfileGroup>;
}

/** Describes the cloud service role sku. */
export interface CloudServiceRoleSku {
  /** The sku name. NOTE: If the new SKU is not supported on the hardware the cloud service is currently on, you need to delete and recreate the cloud service or move back to the old sku. */
  name?: string;
  /** Specifies the tier of the cloud service. Possible Values are <br /><br /> **Standard** <br /><br /> **Basic** */
  tier?: string;
  /** Specifies the number of role instances in the cloud service. */
  capacity?: number;
}

/** Describes the cloud service. */
export interface CloudService {
  /** Resource location. */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Cloud service properties */
  properties?: CloudServiceProperties;
  /** The system meta data relating to this resource. */
  systemData?: SystemData;
}

/** Cloud service properties */
export interface CloudServiceProperties {
  /**
   * Specifies a URL that refers to the location of the service package in the Blob service. The service package URL can be Shared Access Signature (SAS) URI from any storage account.
   * This is a write-only property and is not returned in GET calls.
   */
  packageUrl?: string;
  /** Specifies the XML service configuration (.cscfg) for the cloud service. */
  configuration?: string;
  /**
   * Specifies a URL that refers to the location of the service configuration in the Blob service. The service package URL  can be Shared Access Signature (SAS) URI from any storage account.
   * This is a write-only property and is not returned in GET calls.
   */
  configurationUrl?: string;
  /**
   * (Optional) Indicates whether to start the cloud service immediately after it is created. The default value is `true`.
   * If false, the service model is still deployed, but the code is not run immediately. Instead, the service is PoweredOff until you call Start, at which time the service will be started. A deployed service still incurs charges, even if it is poweredoff.
   */
  startCloudService?: boolean;
  /**
   * (Optional) Indicates whether the role sku properties (roleProfile.roles.sku) specified in the model/template should override the role instance count and vm size specified in the .cscfg and .csdef respectively.
   * The default value is `false`.
   */
  allowModelOverride?: boolean;
  /**
   * Update mode for the cloud service. Role instances are allocated to update domains when the service is deployed. Updates can be initiated manually in each update domain or initiated automatically in all update domains.
   * Possible Values are <br /><br />**Auto**<br /><br />**Manual** <br /><br />**Simultaneous**<br /><br />
   * If not specified, the default value is Auto. If set to Manual, PUT UpdateDomain must be called to apply the update. If set to Auto, the update is automatically applied to each update domain in sequence.
   */
  upgradeMode?: "Auto" | "Manual" | "Simultaneous";
  /** Describes the role profile for the cloud service. */
  roleProfile?: CloudServiceRoleProfile;
  /** Describes the OS profile for the cloud service. */
  osProfile?: CloudServiceOsProfile;
  /** Network Profile for the cloud service. */
  networkProfile?: CloudServiceNetworkProfile;
  /** Describes a cloud service extension profile. */
  extensionProfile?: CloudServiceExtensionProfile;
}

/** Describes the role profile for the cloud service. */
export interface CloudServiceRoleProfile {
  /** List of roles for the cloud service. */
  roles?: Array<CloudServiceRoleProfileProperties>;
}

/** Describes the role properties. */
export interface CloudServiceRoleProfileProperties {
  /** Resource name. */
  name?: string;
  /** Describes the cloud service role sku. */
  sku?: CloudServiceRoleSku;
}

/** Describes the OS profile for the cloud service. */
export interface CloudServiceOsProfile {
  /** Specifies set of certificates that should be installed onto the role instances. */
  secrets?: Array<CloudServiceVaultSecretGroup>;
}

/** Describes a set of certificates which are all in the same Key Vault. */
export interface CloudServiceVaultSecretGroup {
  /** The relative URL of the Key Vault containing all of the certificates in VaultCertificates. */
  sourceVault?: SubResource;
  /** The list of key vault references in SourceVault which contain certificates. */
  vaultCertificates?: Array<CloudServiceVaultCertificate>;
}

/** Describes a single certificate reference in a Key Vault, and where the certificate should reside on the role instance. */
export interface CloudServiceVaultCertificate {
  /** This is the URL of a certificate that has been uploaded to Key Vault as a secret. */
  certificateUrl?: string;
}

/** Network Profile for the cloud service. */
export interface CloudServiceNetworkProfile {
  /** List of Load balancer configurations. Cloud service can have up to two load balancer configurations, corresponding to a Public Load Balancer and an Internal Load Balancer. */
  loadBalancerConfigurations?: Array<LoadBalancerConfiguration>;
  /**
   * Slot type for the cloud service.
   * Possible values are <br /><br />**Production**<br /><br />**Staging**<br /><br />
   * If not specified, the default value is Production.
   */
  slotType?: "Production" | "Staging";
  /** The id reference of the cloud service containing the target IP with which the subject cloud service can perform a swap. This property cannot be updated once it is set. The swappable cloud service referred by this id must be present otherwise an error will be thrown. */
  swappableCloudService?: SubResource;
}

/** Describes the load balancer configuration. */
export interface LoadBalancerConfiguration {
  /** Resource Id */
  id?: string;
  /** The name of the Load balancer */
  name: string;
  /** Properties of the load balancer configuration. */
  properties: LoadBalancerConfigurationProperties;
}

/** Describes the properties of the load balancer configuration. */
export interface LoadBalancerConfigurationProperties {
  /** Specifies the frontend IP to be used for the load balancer. Only IPv4 frontend IP address is supported. Each load balancer configuration must have exactly one frontend IP configuration. */
  frontendIPConfigurations: Array<LoadBalancerFrontendIPConfiguration>;
}

/** Specifies the frontend IP to be used for the load balancer. Only IPv4 frontend IP address is supported. Each load balancer configuration must have exactly one frontend IP configuration. */
export interface LoadBalancerFrontendIPConfiguration {
  /** The name of the resource that is unique within the set of frontend IP configurations used by the load balancer. This name can be used to access the resource. */
  name: string;
  /** Properties of load balancer frontend ip configuration. */
  properties: LoadBalancerFrontendIPConfigurationProperties;
}

/** Describes a cloud service IP Configuration */
export interface LoadBalancerFrontendIPConfigurationProperties {
  /** The reference to the public ip address resource. */
  publicIPAddress?: SubResource;
  /** The reference to the virtual network subnet resource. */
  subnet?: SubResource;
  /** The virtual network private IP address of the IP configuration. */
  privateIPAddress?: string;
}

/** Describes a cloud service extension profile. */
export interface CloudServiceExtensionProfile {
  /** List of extensions for the cloud service. */
  extensions?: Array<Extension>;
}

/** Describes a cloud service Extension. */
export interface Extension {
  /** The name of the extension. */
  name?: string;
  /** Extension Properties. */
  properties?: CloudServiceExtensionProperties;
}

/** Extension Properties. */
export interface CloudServiceExtensionProperties {
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension. */
  type?: string;
  /** Specifies the version of the extension. Specifies the version of the extension. If this element is not specified or an asterisk (*) is used as the value, the latest version of the extension is used. If the value is specified with a major version number and an asterisk as the minor version number (X.), the latest minor version of the specified major version is selected. If a major version number and a minor version number are specified (X.Y), the specific extension version is selected. If a version is specified, an auto-upgrade is performed on the role instance. */
  typeHandlerVersion?: string;
  /** Explicitly specify whether platform can automatically upgrade typeHandlerVersion to higher minor versions when they become available. */
  autoUpgradeMinorVersion?: boolean;
  /** Public settings for the extension. For JSON extensions, this is the JSON settings for the extension. For XML Extension (like RDP), this is the XML setting for the extension. */
  settings?: any;
  /** Protected settings for the extension which are encrypted before sent to the role instance. */
  protectedSettings?: any;
  /** Protected settings for the extension, referenced using KeyVault which are encrypted before sent to the role instance. */
  protectedSettingsFromKeyVault?: CloudServiceVaultAndSecretReference;
  /**
   * Tag to force apply the provided public and protected settings.
   * Changing the tag value allows for re-running the extension without changing any of the public or protected settings.
   * If forceUpdateTag is not changed, updates to public or protected settings would still be applied by the handler.
   * If neither forceUpdateTag nor any of public or protected settings change, extension would flow to the role instance with the same sequence-number, and
   * it is up to handler implementation whether to re-run it or not
   */
  forceUpdateTag?: string;
  /** Optional list of roles to apply this extension. If property is not specified or '*' is specified, extension is applied to all roles in the cloud service. */
  rolesAppliedTo?: Array<string>;
}

/** Protected settings for the extension, referenced using KeyVault which are encrypted before sent to the role instance. */
export interface CloudServiceVaultAndSecretReference {
  /** The ARM Resource ID of the Key Vault */
  sourceVault?: SubResource;
  /** Secret URL which contains the protected settings of the extension */
  secretUrl?: string;
}

/** The system meta data relating to this resource. */
export interface SystemData {}

export interface CloudServiceUpdate {
  /** Resource tags */
  tags?: Record<string, string>;
}

/** Specifies a list of role instances from the cloud service. */
export interface RoleInstances {
  /** List of cloud service role instance names. Value of '*' will signify all role instances of the cloud service. */
  roleInstances: Array<string>;
}

/** Defines an update domain for the cloud service. */
export interface UpdateDomain {}
