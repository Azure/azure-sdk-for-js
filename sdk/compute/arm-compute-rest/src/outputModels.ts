// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The List Compute Operation operation response. */
export interface ComputeOperationListResultOutput {
  /** The list of compute operations */
  readonly value?: Array<ComputeOperationValueOutput>;
}

/** Describes the properties of a Compute Operation value. */
export interface ComputeOperationValueOutput {
  /** The origin of the compute operation. */
  readonly origin?: string;
  /** The name of the compute operation. */
  readonly name?: string;
  /** Describes the properties of a Compute Operation Value Display. */
  display?: ComputeOperationValueDisplayOutput;
}

/** Describes the properties of a Compute Operation Value Display. */
export interface ComputeOperationValueDisplayOutput {
  /** The display name of the compute operation. */
  readonly operation?: string;
  /** The display name of the resource the operation applies to. */
  readonly resource?: string;
  /** The description of the operation. */
  readonly description?: string;
  /** The resource provider for the operation. */
  readonly provider?: string;
}

/** An error response from the Compute service. */
export interface CloudErrorOutput {
  /** Api error. */
  error?: ApiErrorOutput;
}

/** Api error. */
export interface ApiErrorOutput {
  /** The Api error details */
  details?: Array<ApiErrorBaseOutput>;
  /** The Api inner error */
  innererror?: InnerErrorOutput;
  /** The error code. */
  code?: string;
  /** The target of the particular error. */
  target?: string;
  /** The error message. */
  message?: string;
}

/** Api error base. */
export interface ApiErrorBaseOutput {
  /** The error code. */
  code?: string;
  /** The target of the particular error. */
  target?: string;
  /** The error message. */
  message?: string;
}

/** Inner error details. */
export interface InnerErrorOutput {
  /** The exception type. */
  exceptiontype?: string;
  /** The internal error message or exception dump. */
  errordetail?: string;
}

/** The List Usages operation response. */
export interface ListUsagesResultOutput {
  /** The list of compute resource usages. */
  value: Array<UsageOutput>;
  /** The URI to fetch the next page of compute resource usage information. Call ListNext() with this to fetch the next page of compute resource usage information. */
  nextLink?: string;
}

/** Describes Compute Resource Usage. */
export interface UsageOutput {
  /** An enum describing the unit of usage measurement. */
  unit: "Count";
  /** The current usage of the resource. */
  currentValue: number;
  /** The maximum permitted usage of the resource. */
  limit: number;
  /** The name of the type of usage. */
  name: UsageNameOutput;
}

/** The Usage Names. */
export interface UsageNameOutput {
  /** The name of the resource. */
  value?: string;
  /** The localized name of the resource. */
  localizedValue?: string;
}

/** The List Virtual Machine operation response. */
export interface VirtualMachineSizeListResultOutput {
  /** The list of virtual machine sizes. */
  value?: Array<VirtualMachineSizeOutput>;
}

/** Describes the properties of a VM size. */
export interface VirtualMachineSizeOutput {
  /** The name of the virtual machine size. */
  name?: string;
  /** The number of cores supported by the virtual machine size. For Constrained vCPU capable VM sizes, this number represents the total vCPUs of quota that the VM uses. For accurate vCPU count, please refer to https://docs.microsoft.com/azure/virtual-machines/constrained-vcpu or https://docs.microsoft.com/rest/api/compute/resourceskus/list */
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

/** The List Virtual Machine operation response. */
export interface VirtualMachineScaleSetListResultOutput {
  /** The list of virtual machine scale sets. */
  value: Array<VirtualMachineScaleSetOutput>;
  /** The uri to fetch the next page of Virtual Machine Scale Sets. Call ListNext() with this to fetch the next page of VMSS. */
  nextLink?: string;
}

/** Describes a Virtual Machine Scale Set. */
export interface VirtualMachineScaleSetOutput extends ResourceOutput {
  /** The virtual machine scale set sku. */
  sku?: SkuOutput;
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: PlanOutput;
  /** Describes the properties of a Virtual Machine Scale Set. */
  properties?: VirtualMachineScaleSetPropertiesOutput;
  /** The identity of the virtual machine scale set, if configured. */
  identity?: VirtualMachineScaleSetIdentityOutput;
  /** The virtual machine scale set zones. NOTE: Availability zones can only be set when you create the scale set */
  zones?: Array<string>;
  /** The extended location of the Virtual Machine Scale Set. */
  extendedLocation?: ExtendedLocationOutput;
}

/** Describes a virtual machine scale set sku. NOTE: If the new VM SKU is not supported on the hardware the scale set is currently on, you need to deallocate the VMs in the scale set before you modify the SKU name. */
export interface SkuOutput {
  /** The sku name. */
  name?: string;
  /** Specifies the tier of virtual machines in a scale set.<br /><br /> Possible Values:<br /><br /> **Standard**<br /><br /> **Basic** */
  tier?: string;
  /** Specifies the number of virtual machines in the scale set. */
  capacity?: number;
}

/** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
export interface PlanOutput {
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
export interface VirtualMachineScaleSetPropertiesOutput {
  /** The upgrade policy. */
  upgradePolicy?: UpgradePolicyOutput;
  /** Policy for automatic repairs. */
  automaticRepairsPolicy?: AutomaticRepairsPolicyOutput;
  /** The virtual machine profile. */
  virtualMachineProfile?: VirtualMachineScaleSetVMProfileOutput;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** Specifies whether the Virtual Machine Scale Set should be overprovisioned. */
  overprovision?: boolean;
  /** When Overprovision is enabled, extensions are launched only on the requested number of VMs which are finally kept. This property will hence ensure that the extensions do not run on the extra overprovisioned VMs. */
  doNotRunExtensionsOnOverprovisionedVMs?: boolean;
  /** Specifies the ID which uniquely identifies a Virtual Machine Scale Set. */
  readonly uniqueId?: string;
  /** When true this limits the scale set to a single placement group, of max size 100 virtual machines. NOTE: If singlePlacementGroup is true, it may be modified to false. However, if singlePlacementGroup is false, it may not be modified to true. */
  singlePlacementGroup?: boolean;
  /** Whether to force strictly even Virtual Machine distribution cross x-zones in case there is zone outage. zoneBalance property can only be set if the zones property of the scale set contains more than one zone. If there are no zones or only one zone specified, then zoneBalance property should not be set. */
  zoneBalance?: boolean;
  /** Fault Domain count for each placement group. */
  platformFaultDomainCount?: number;
  /** Specifies information about the proximity placement group that the virtual machine scale set should be assigned to. <br><br>Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResourceOutput;
  /** Specifies information about the dedicated host group that the virtual machine scale set resides in. <br><br>Minimum api-version: 2020-06-01. */
  hostGroup?: SubResourceOutput;
  /** Specifies additional capabilities enabled or disabled on the Virtual Machines in the Virtual Machine Scale Set. For instance: whether the Virtual Machines have the capability to support attaching managed data disks with UltraSSD_LRS storage account type. */
  additionalCapabilities?: AdditionalCapabilitiesOutput;
  /** Specifies the policies applied when scaling in Virtual Machines in the Virtual Machine Scale Set. */
  scaleInPolicy?: ScaleInPolicyOutput;
  /** Specifies the orchestration mode for the virtual machine scale set. */
  orchestrationMode?: "Uniform" | "Flexible";
  /** Specifies the Spot Restore properties for the virtual machine scale set. */
  spotRestorePolicy?: SpotRestorePolicyOutput;
  /** Specifies the desired targets for mixing Spot and Regular priority VMs within the same VMSS Flex instance. */
  priorityMixPolicy?: PriorityMixPolicyOutput;
  /** Specifies the time at which the Virtual Machine Scale Set resource was created.<br><br>Minimum api-version: 2021-11-01. */
  readonly timeCreated?: string;
}

/** Describes an upgrade policy - automatic, manual, or rolling. */
export interface UpgradePolicyOutput {
  /** Specifies the mode of an upgrade to virtual machines in the scale set.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of updates to virtual machines in the scale set. You do this by using the manualUpgrade action.<br /><br /> **Automatic** - All virtual machines in the scale set are  automatically updated at the same time. */
  mode?: "Automatic" | "Manual" | "Rolling";
  /** The configuration parameters used while performing a rolling upgrade. */
  rollingUpgradePolicy?: RollingUpgradePolicyOutput;
  /** Configuration parameters used for performing automatic OS Upgrade. */
  automaticOSUpgradePolicy?: AutomaticOSUpgradePolicyOutput;
}

/** The configuration parameters used while performing a rolling upgrade. */
export interface RollingUpgradePolicyOutput {
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
export interface AutomaticOSUpgradePolicyOutput {
  /** Indicates whether OS upgrades should automatically be applied to scale set instances in a rolling fashion when a newer version of the OS image becomes available. Default value is false. <br><br> If this is set to true for Windows based scale sets, [enableAutomaticUpdates](https://docs.microsoft.com/dotnet/api/microsoft.azure.management.compute.models.windowsconfiguration.enableautomaticupdates?view=azure-dotnet) is automatically set to false and cannot be set to true. */
  enableAutomaticOSUpgrade?: boolean;
  /** Whether OS image rollback feature should be disabled. Default value is false. */
  disableAutomaticRollback?: boolean;
  /** Indicates whether rolling upgrade policy should be used during Auto OS Upgrade. Default value is false. Auto OS Upgrade will fallback to the default policy if no policy is defined on the VMSS. */
  useRollingUpgradePolicy?: boolean;
}

/** Specifies the configuration parameters for automatic repairs on the virtual machine scale set. */
export interface AutomaticRepairsPolicyOutput {
  /** Specifies whether automatic repairs should be enabled on the virtual machine scale set. The default value is false. */
  enabled?: boolean;
  /** The amount of time for which automatic repairs are suspended due to a state change on VM. The grace time starts after the state change has completed. This helps avoid premature or accidental repairs. The time duration should be specified in ISO 8601 format. The minimum allowed grace period is 10 minutes (PT10M), which is also the default value. The maximum allowed grace period is 90 minutes (PT90M). */
  gracePeriod?: string;
  /** Type of repair action (replace, restart, reimage) that will be used for repairing unhealthy virtual machines in the scale set. Default value is replace. */
  repairAction?: "Replace" | "Restart" | "Reimage";
}

/** Describes a virtual machine scale set virtual machine profile. */
export interface VirtualMachineScaleSetVMProfileOutput {
  /** Specifies the operating system settings for the virtual machines in the scale set. */
  osProfile?: VirtualMachineScaleSetOSProfileOutput;
  /** Specifies the storage settings for the virtual machine disks. */
  storageProfile?: VirtualMachineScaleSetStorageProfileOutput;
  /** Specifies properties of the network interfaces of the virtual machines in the scale set. */
  networkProfile?: VirtualMachineScaleSetNetworkProfileOutput;
  /** Specifies the Security related profile settings for the virtual machines in the scale set. */
  securityProfile?: SecurityProfileOutput;
  /** Specifies the boot diagnostic settings state. <br><br>Minimum api-version: 2015-06-15. */
  diagnosticsProfile?: DiagnosticsProfileOutput;
  /** Specifies a collection of settings for extensions installed on virtual machines in the scale set. */
  extensionProfile?: VirtualMachineScaleSetExtensionProfileOutput;
  /** Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 */
  licenseType?: string;
  /** Specifies the priority for the virtual machines in the scale set. <br><br>Minimum api-version: 2017-10-30-preview */
  priority?: "Regular" | "Low" | "Spot";
  /** Specifies the eviction policy for the Azure Spot virtual machine and Azure Spot scale set. <br><br>For Azure Spot virtual machines, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2019-03-01. <br><br>For Azure Spot scale sets, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2017-10-30-preview. */
  evictionPolicy?: "Deallocate" | "Delete";
  /** Specifies the billing related details of a Azure Spot VMSS. <br><br>Minimum api-version: 2019-03-01. */
  billingProfile?: BillingProfileOutput;
  /** Specifies Scheduled Event related configurations. */
  scheduledEventsProfile?: ScheduledEventsProfileOutput;
  /** UserData for the virtual machines in the scale set, which must be base-64 encoded. Customer should not pass any secrets in here. <br><br>Minimum api-version: 2021-03-01 */
  userData?: string;
  /** Specifies the capacity reservation related details of a scale set. <br><br>Minimum api-version: 2021-04-01. */
  capacityReservation?: CapacityReservationProfileOutput;
  /** Specifies the gallery applications that should be made available to the VM/VMSS */
  applicationProfile?: ApplicationProfileOutput;
  /** Specifies the hardware profile related details of a scale set. <br><br>Minimum api-version: 2021-11-01. */
  hardwareProfile?: VirtualMachineScaleSetHardwareProfileOutput;
}

/** Describes a virtual machine scale set OS profile. */
export interface VirtualMachineScaleSetOSProfileOutput {
  /** Specifies the computer name prefix for all of the virtual machines in the scale set. Computer name prefixes must be 1 to 15 characters long. */
  computerNamePrefix?: string;
  /** Specifies the name of the administrator account. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters */
  adminUsername?: string;
  /** Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection) */
  adminPassword?: string;
  /** Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. <br><br> For using cloud-init for your VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init) */
  customData?: string;
  /** Specifies Windows operating system settings on the virtual machine. */
  windowsConfiguration?: WindowsConfigurationOutput;
  /** Specifies the Linux operating system settings on the virtual machine. <br><br>For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros). */
  linuxConfiguration?: LinuxConfigurationOutput;
  /** Specifies set of certificates that should be installed onto the virtual machines in the scale set. To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  secrets?: Array<VaultSecretGroupOutput>;
  /** Specifies whether extension operations should be allowed on the virtual machine scale set. <br><br>This may only be set to False when no extensions are present on the virtual machine scale set. */
  allowExtensionOperations?: boolean;
}

/** Specifies Windows operating system settings on the virtual machine. */
export interface WindowsConfigurationOutput {
  /** Indicates whether virtual machine agent should be provisioned on the virtual machine. <br><br> When this property is not specified in the request body, default behavior is to set it to true.  This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later. */
  provisionVMAgent?: boolean;
  /** Indicates whether Automatic Updates is enabled for the Windows virtual machine. Default value is true. <br><br> For virtual machine scale sets, this property can be updated and updates will take effect on OS reprovisioning. */
  enableAutomaticUpdates?: boolean;
  /** Specifies the time zone of the virtual machine. e.g. "Pacific Standard Time". <br><br> Possible values can be [TimeZoneInfo.Id](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.id?#System_TimeZoneInfo_Id) value from time zones returned by [TimeZoneInfo.GetSystemTimeZones](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.getsystemtimezones). */
  timeZone?: string;
  /** Specifies additional base-64 encoded XML formatted information that can be included in the Unattend.xml file, which is used by Windows Setup. */
  additionalUnattendContent?: Array<AdditionalUnattendContentOutput>;
  /** [Preview Feature] Specifies settings related to VM Guest Patching on Windows. */
  patchSettings?: PatchSettingsOutput;
  /** Specifies the Windows Remote Management listeners. This enables remote Windows PowerShell. */
  winRM?: WinRMConfigurationOutput;
  /** Indicates whether VMAgent Platform Updates is enabled for the Windows virtual machine. Default value is false. */
  enableVMAgentPlatformUpdates?: boolean;
}

/** Specifies additional XML formatted information that can be included in the Unattend.xml file, which is used by Windows Setup. Contents are defined by setting name, component name, and the pass in which the content is applied. */
export interface AdditionalUnattendContentOutput {
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
export interface PatchSettingsOutput {
  /** Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of patches to a virtual machine. You do this by applying patches manually inside the VM. In this mode, automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates must be false<br /><br /> **AutomaticByOS** - The virtual machine will automatically be updated by the OS. The property WindowsConfiguration.enableAutomaticUpdates must be true. <br /><br /> **AutomaticByPlatform** - the virtual machine will automatically updated by the platform. The properties provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true */
  patchMode?: "Manual" | "AutomaticByOS" | "AutomaticByPlatform";
  /** Enables customers to patch their Azure VMs without requiring a reboot. For enableHotpatching, the 'provisionVMAgent' must be set to true and 'patchMode' must be set to 'AutomaticByPlatform'. */
  enableHotpatching?: boolean;
  /** Specifies the mode of VM Guest patch assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine.<br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
  assessmentMode?: "ImageDefault" | "AutomaticByPlatform";
  /** Specifies additional settings for patch mode AutomaticByPlatform in VM Guest Patching on Windows. */
  automaticByPlatformSettings?: WindowsVMGuestPatchAutomaticByPlatformSettingsOutput;
}

/** Specifies additional settings to be applied when patch mode AutomaticByPlatform is selected in Windows patch settings. */
export interface WindowsVMGuestPatchAutomaticByPlatformSettingsOutput {
  /** Specifies the reboot setting for all AutomaticByPlatform patch installation operations. */
  rebootSetting?: "Unknown" | "IfRequired" | "Never" | "Always";
}

/** Describes Windows Remote Management configuration of the VM */
export interface WinRMConfigurationOutput {
  /** The list of Windows Remote Management listeners */
  listeners?: Array<WinRMListenerOutput>;
}

/** Describes Protocol and thumbprint of Windows Remote Management listener */
export interface WinRMListenerOutput {
  /** Specifies the protocol of WinRM listener. <br><br> Possible values are: <br>**http** <br><br> **https** */
  protocol?: "Http" | "Https";
  /** This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be It is the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  certificateUrl?: string;
}

/** Specifies the Linux operating system settings on the virtual machine. <br><br>For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros). */
export interface LinuxConfigurationOutput {
  /** Specifies whether password authentication should be disabled. */
  disablePasswordAuthentication?: boolean;
  /** Specifies the ssh key configuration for a Linux OS. */
  ssh?: SshConfigurationOutput;
  /** Indicates whether virtual machine agent should be provisioned on the virtual machine. <br><br> When this property is not specified in the request body, default behavior is to set it to true.  This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later. */
  provisionVMAgent?: boolean;
  /** [Preview Feature] Specifies settings related to VM Guest Patching on Linux. */
  patchSettings?: LinuxPatchSettingsOutput;
  /** Indicates whether VMAgent Platform Updates is enabled for the Linux virtual machine. Default value is false. */
  enableVMAgentPlatformUpdates?: boolean;
}

/** SSH configuration for Linux based VMs running on Azure */
export interface SshConfigurationOutput {
  /** The list of SSH public keys used to authenticate with linux based VMs. */
  publicKeys?: Array<SshPublicKeyOutput>;
}

/** Contains information about SSH certificate public key and the path on the Linux VM where the public key is placed. */
export interface SshPublicKeyOutput {
  /** Specifies the full path on the created VM where ssh public key is stored. If the file already exists, the specified key is appended to the file. Example: /home/user/.ssh/authorized_keys */
  path?: string;
  /** SSH public key certificate used to authenticate with the VM through ssh. The key needs to be at least 2048-bit and in ssh-rsa format. <br><br> For creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure]https://docs.microsoft.com/azure/virtual-machines/linux/create-ssh-keys-detailed). */
  keyData?: string;
}

/** Specifies settings related to VM Guest Patching on Linux. */
export interface LinuxPatchSettingsOutput {
  /** Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - The virtual machine's default patching configuration is used. <br /><br /> **AutomaticByPlatform** - The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true */
  patchMode?: "ImageDefault" | "AutomaticByPlatform";
  /** Specifies the mode of VM Guest Patch Assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine. <br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
  assessmentMode?: "ImageDefault" | "AutomaticByPlatform";
  /** Specifies additional settings for patch mode AutomaticByPlatform in VM Guest Patching on Linux. */
  automaticByPlatformSettings?: LinuxVMGuestPatchAutomaticByPlatformSettingsOutput;
}

/** Specifies additional settings to be applied when patch mode AutomaticByPlatform is selected in Linux patch settings. */
export interface LinuxVMGuestPatchAutomaticByPlatformSettingsOutput {
  /** Specifies the reboot setting for all AutomaticByPlatform patch installation operations. */
  rebootSetting?: "Unknown" | "IfRequired" | "Never" | "Always";
}

/** Describes a set of certificates which are all in the same Key Vault. */
export interface VaultSecretGroupOutput {
  /** The relative URL of the Key Vault containing all of the certificates in VaultCertificates. */
  sourceVault?: SubResourceOutput;
  /** The list of key vault references in SourceVault which contain certificates. */
  vaultCertificates?: Array<VaultCertificateOutput>;
}

export interface SubResourceOutput {
  /** Resource Id */
  id?: string;
}

/** Describes a single certificate reference in a Key Vault, and where the certificate should reside on the VM. */
export interface VaultCertificateOutput {
  /** This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be It is the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  certificateUrl?: string;
  /** For Windows VMs, specifies the certificate store on the Virtual Machine to which the certificate should be added. The specified certificate store is implicitly in the LocalMachine account. <br><br>For Linux VMs, the certificate file is placed under the /var/lib/waagent directory, with the file name &lt;UppercaseThumbprint&gt;.crt for the X509 certificate file and &lt;UppercaseThumbprint&gt;.prv for private key. Both of these files are .pem formatted. */
  certificateStore?: string;
}

/** Describes a virtual machine scale set storage profile. */
export interface VirtualMachineScaleSetStorageProfileOutput {
  /** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. */
  imageReference?: ImageReferenceOutput;
  /** Specifies information about the operating system disk used by the virtual machines in the scale set. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  osDisk?: VirtualMachineScaleSetOSDiskOutput;
  /** Specifies the parameters that are used to add data disks to the virtual machines in the scale set. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  dataDisks?: Array<VirtualMachineScaleSetDataDiskOutput>;
  diskControllerType?: string;
}

/** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. NOTE: Image reference publisher and offer can only be set when you create the scale set. */
export interface ImageReferenceOutput extends SubResourceOutput {
  /** The image publisher. */
  publisher?: string;
  /** Specifies the offer of the platform image or marketplace image used to create the virtual machine. */
  offer?: string;
  /** The image SKU. */
  sku?: string;
  /** Specifies the version of the platform image or marketplace image used to create the virtual machine. The allowed formats are Major.Minor.Build or 'latest'. Major, Minor, and Build are decimal numbers. Specify 'latest' to use the latest version of an image available at deploy time. Even if you use 'latest', the VM image will not automatically update after deploy time even if a new version becomes available. Please do not use field 'version' for gallery image deployment, gallery image should always use 'id' field for deployment, to use 'latest' version of gallery image, just set '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{imageName}' in the 'id' field without version input. */
  version?: string;
  /** Specifies in decimal numbers, the version of platform image or marketplace image used to create the virtual machine. This readonly field differs from 'version', only if the value specified in 'version' field is 'latest'. */
  readonly exactVersion?: string;
  /** Specified the shared gallery image unique id for vm deployment. This can be fetched from shared gallery image GET call. */
  sharedGalleryImageId?: string;
  /** Specified the community gallery image unique id for vm deployment. This can be fetched from community gallery image GET call. */
  communityGalleryImageId?: string;
}

/** Describes a virtual machine scale set operating system disk. */
export interface VirtualMachineScaleSetOSDiskOutput {
  /** The disk name. */
  name?: string;
  /** Specifies the caching requirements. <br><br> Possible values are: <br><br> **None** <br><br> **ReadOnly** <br><br> **ReadWrite** <br><br> Default: **None for Standard storage. ReadOnly for Premium storage** */
  caching?: "None" | "ReadOnly" | "ReadWrite";
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies how the virtual machines in the scale set should be created.<br><br> The only allowed value is: **FromImage** \u2013 This value is used when you are using an image to create the virtual machine. If you are using a platform image, you also use the imageReference element described above. If you are using a marketplace image, you  also use the plan element previously described. */
  createOption: "FromImage" | "Empty" | "Attach";
  /** Specifies the ephemeral disk Settings for the operating system disk used by the virtual machine scale set. */
  diffDiskSettings?: DiffDiskSettingsOutput;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. <br><br> diskSizeGB is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023 */
  diskSizeGB?: number;
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  osType?: "Windows" | "Linux";
  /** Specifies information about the unmanaged user image to base the scale set on. */
  image?: VirtualHardDiskOutput;
  /** Specifies the container urls that are used to store operating system disks for the scale set. */
  vhdContainers?: Array<string>;
  /** The managed disk parameters. */
  managedDisk?: VirtualMachineScaleSetManagedDiskParametersOutput;
  /** Specifies whether OS Disk should be deleted or detached upon VMSS Flex deletion (This feature is available for VMSS with Flexible OrchestrationMode only). <br><br> Possible values: <br><br> **Delete** If this value is used, the OS disk is deleted when VMSS Flex VM is deleted.<br><br> **Detach** If this value is used, the OS disk is retained after VMSS Flex VM is deleted. <br><br> The default value is set to **Delete**. For an Ephemeral OS Disk, the default value is set to **Delete**. User cannot change the delete option for Ephemeral OS Disk. */
  deleteOption?: "Delete" | "Detach";
}

/** Describes the parameters of ephemeral disk settings that can be specified for operating system disk. <br><br> NOTE: The ephemeral disk settings can only be specified for managed disk. */
export interface DiffDiskSettingsOutput {
  /** Specifies the ephemeral disk settings for operating system disk. */
  option?: "Local";
  /** Specifies the ephemeral disk placement for operating system disk.<br><br> Possible values are: <br><br> **CacheDisk** <br><br> **ResourceDisk** <br><br> Default: **CacheDisk** if one is configured for the VM size otherwise **ResourceDisk** is used.<br><br> Refer to VM size documentation for Windows VM at https://docs.microsoft.com/azure/virtual-machines/windows/sizes and Linux VM at https://docs.microsoft.com/azure/virtual-machines/linux/sizes to check which VM sizes exposes a cache disk. */
  placement?: "CacheDisk" | "ResourceDisk";
}

/** Describes the uri of a disk. */
export interface VirtualHardDiskOutput {
  /** Specifies the virtual hard disk's uri. */
  uri?: string;
}

/** Describes the parameters of a ScaleSet managed disk. */
export interface VirtualMachineScaleSetManagedDiskParametersOutput {
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
  diskEncryptionSet?: DiskEncryptionSetParametersOutput;
  /** Specifies the security profile for the managed disk. */
  securityProfile?: VMDiskSecurityProfileOutput;
}

/** Describes the parameter of customer managed disk encryption set resource id that can be specified for disk. <br><br> NOTE: The disk encryption set resource id can only be specified for managed disk. Please refer https://aka.ms/mdssewithcmkoverview for more details. */
export interface DiskEncryptionSetParametersOutput extends SubResourceOutput {}

/** Specifies the security profile settings for the managed disk. <br><br> NOTE: It can only be set for Confidential VMs */
export interface VMDiskSecurityProfileOutput {
  /** Specifies the EncryptionType of the managed disk. <br> It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob, and VMGuestStateOnly for encryption of just the VMGuestState blob. <br><br> NOTE: It can be set for only Confidential VMs. */
  securityEncryptionType?: "VMGuestStateOnly" | "DiskWithVMGuestState";
  /** Specifies the customer managed disk encryption set resource id for the managed disk that is used for Customer Managed Key encrypted ConfidentialVM OS Disk and VMGuest blob. */
  diskEncryptionSet?: DiskEncryptionSetParametersOutput;
}

/** Describes a virtual machine scale set data disk. */
export interface VirtualMachineScaleSetDataDiskOutput {
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
  managedDisk?: VirtualMachineScaleSetManagedDiskParametersOutput;
  /** Specifies the Read-Write IOPS for the managed disk. Should be used only when StorageAccountType is UltraSSD_LRS. If not specified, a default value would be assigned based on diskSizeGB. */
  diskIOPSReadWrite?: number;
  /** Specifies the bandwidth in MB per second for the managed disk. Should be used only when StorageAccountType is UltraSSD_LRS. If not specified, a default value would be assigned based on diskSizeGB. */
  diskMBpsReadWrite?: number;
  /** Specifies whether data disk should be deleted or detached upon VMSS Flex deletion (This feature is available for VMSS with Flexible OrchestrationMode only).<br><br> Possible values: <br><br> **Delete** If this value is used, the data disk is deleted when the VMSS Flex VM is deleted.<br><br> **Detach** If this value is used, the data disk is retained after VMSS Flex VM is deleted.<br><br> The default value is set to **Delete**. */
  deleteOption?: "Delete" | "Detach";
}

/** Describes a virtual machine scale set network profile. */
export interface VirtualMachineScaleSetNetworkProfileOutput {
  /** A reference to a load balancer probe used to determine the health of an instance in the virtual machine scale set. The reference will be in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes/{probeName}'. */
  healthProbe?: ApiEntityReferenceOutput;
  /** The list of network configurations. */
  networkInterfaceConfigurations?: Array<VirtualMachineScaleSetNetworkConfigurationOutput>;
  /** specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations for Virtual Machine Scale Set with orchestration mode 'Flexible' */
  networkApiVersion?: "2020-11-01";
}

/** The API entity reference. */
export interface ApiEntityReferenceOutput {
  /** The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/... */
  id?: string;
}

/** Describes a virtual machine scale set network profile's network configurations. */
export interface VirtualMachineScaleSetNetworkConfigurationOutput extends SubResourceOutput {
  /** The network configuration name. */
  name: string;
  /** Describes a virtual machine scale set network profile's IP configuration. */
  properties?: VirtualMachineScaleSetNetworkConfigurationPropertiesOutput;
}

/** Describes a virtual machine scale set network profile's IP configuration. */
export interface VirtualMachineScaleSetNetworkConfigurationPropertiesOutput {
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** Specifies whether the network interface is accelerated networking-enabled. */
  enableAcceleratedNetworking?: boolean;
  /** Specifies whether the network interface is disabled for tcp state tracking. */
  disableTcpStateTracking?: boolean;
  /** Specifies whether the network interface is FPGA networking-enabled. */
  enableFpga?: boolean;
  /** The network security group. */
  networkSecurityGroup?: SubResourceOutput;
  /** The dns settings to be applied on the network interfaces. */
  dnsSettings?: VirtualMachineScaleSetNetworkConfigurationDnsSettingsOutput;
  /** Specifies the IP configurations of the network interface. */
  ipConfigurations: Array<VirtualMachineScaleSetIPConfigurationOutput>;
  /** Whether IP forwarding enabled on this NIC. */
  enableIPForwarding?: boolean;
  /** Specify what happens to the network interface when the VM is deleted */
  deleteOption?: "Delete" | "Detach";
}

/** Describes a virtual machines scale sets network configuration's DNS settings. */
export interface VirtualMachineScaleSetNetworkConfigurationDnsSettingsOutput {
  /** List of DNS servers IP addresses */
  dnsServers?: Array<string>;
}

/** Describes a virtual machine scale set network profile's IP configuration. */
export interface VirtualMachineScaleSetIPConfigurationOutput extends SubResourceOutput {
  /** The IP configuration name. */
  name: string;
  /** Describes a virtual machine scale set network profile's IP configuration properties. */
  properties?: VirtualMachineScaleSetIPConfigurationPropertiesOutput;
}

/** Describes a virtual machine scale set network profile's IP configuration properties. */
export interface VirtualMachineScaleSetIPConfigurationPropertiesOutput {
  /** Specifies the identifier of the subnet. */
  subnet?: ApiEntityReferenceOutput;
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** The publicIPAddressConfiguration. */
  publicIPAddressConfiguration?: VirtualMachineScaleSetPublicIPAddressConfigurationOutput;
  /** Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. */
  privateIPAddressVersion?: "IPv4" | "IPv6";
  /** Specifies an array of references to backend address pools of application gateways. A scale set can reference backend address pools of multiple application gateways. Multiple scale sets cannot use the same application gateway. */
  applicationGatewayBackendAddressPools?: Array<SubResourceOutput>;
  /** Specifies an array of references to application security group. */
  applicationSecurityGroups?: Array<SubResourceOutput>;
  /** Specifies an array of references to backend address pools of load balancers. A scale set can reference backend address pools of one public and one internal load balancer. Multiple scale sets cannot use the same basic sku load balancer. */
  loadBalancerBackendAddressPools?: Array<SubResourceOutput>;
  /** Specifies an array of references to inbound Nat pools of the load balancers. A scale set can reference inbound nat pools of one public and one internal load balancer. Multiple scale sets cannot use the same basic sku load balancer. */
  loadBalancerInboundNatPools?: Array<SubResourceOutput>;
}

/** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
export interface VirtualMachineScaleSetPublicIPAddressConfigurationOutput {
  /** The publicIP address configuration name. */
  name: string;
  /** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
  properties?: VirtualMachineScaleSetPublicIPAddressConfigurationPropertiesOutput;
  /** Describes the public IP Sku. It can only be set with OrchestrationMode as Flexible. */
  sku?: PublicIPAddressSkuOutput;
}

/** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
export interface VirtualMachineScaleSetPublicIPAddressConfigurationPropertiesOutput {
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** The dns settings to be applied on the publicIP addresses . */
  dnsSettings?: VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettingsOutput;
  /** The list of IP tags associated with the public IP address. */
  ipTags?: Array<VirtualMachineScaleSetIpTagOutput>;
  /** The PublicIPPrefix from which to allocate publicIP addresses. */
  publicIPPrefix?: SubResourceOutput;
  /** Available from Api-Version 2019-07-01 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'. */
  publicIPAddressVersion?: "IPv4" | "IPv6";
  /** Specify what happens to the public IP when the VM is deleted */
  deleteOption?: "Delete" | "Detach";
}

/** Describes a virtual machines scale sets network configuration's DNS settings. */
export interface VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettingsOutput {
  /** The Domain name label.The concatenation of the domain name label and vm index will be the domain name labels of the PublicIPAddress resources that will be created */
  domainNameLabel: string;
}

/** Contains the IP tag associated with the public IP address. */
export interface VirtualMachineScaleSetIpTagOutput {
  /** IP tag type. Example: FirstPartyUsage. */
  ipTagType?: string;
  /** IP tag associated with the public IP. Example: SQL, Storage etc. */
  tag?: string;
}

/** Describes the public IP Sku. It can only be set with OrchestrationMode as Flexible. */
export interface PublicIPAddressSkuOutput {
  /** Specify public IP sku name */
  name?: "Basic" | "Standard";
  /** Specify public IP sku tier */
  tier?: "Regional" | "Global";
}

/** Specifies the Security profile settings for the virtual machine or virtual machine scale set. */
export interface SecurityProfileOutput {
  /** Specifies the security settings like secure boot and vTPM used while creating the virtual machine. <br><br>Minimum api-version: 2020-12-01 */
  uefiSettings?: UefiSettingsOutput;
  /** This property can be used by user in the request to enable or disable the Host Encryption for the virtual machine or virtual machine scale set. This will enable the encryption for all the disks including Resource/Temp disk at host itself. <br><br> Default: The Encryption at host will be disabled unless this property is set to true for the resource. */
  encryptionAtHost?: boolean;
  /** Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. <br><br> Default: UefiSettings will not be enabled unless this property is set. */
  securityType?: "TrustedLaunch" | "ConfidentialVM";
}

/** Specifies the security settings like secure boot and vTPM used while creating the virtual machine. <br><br>Minimum api-version: 2020-12-01 */
export interface UefiSettingsOutput {
  /** Specifies whether secure boot should be enabled on the virtual machine. <br><br>Minimum api-version: 2020-12-01 */
  secureBootEnabled?: boolean;
  /** Specifies whether vTPM should be enabled on the virtual machine. <br><br>Minimum api-version: 2020-12-01 */
  vTpmEnabled?: boolean;
}

/** Specifies the boot diagnostic settings state. <br><br>Minimum api-version: 2015-06-15. */
export interface DiagnosticsProfileOutput {
  /** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. <br>**NOTE**: If storageUri is being specified then ensure that the storage account is in the same region and subscription as the VM. <br><br> You can easily view the output of your console log. <br><br> Azure also enables you to see a screenshot of the VM from the hypervisor. */
  bootDiagnostics?: BootDiagnosticsOutput;
}

/** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. <br><br> You can easily view the output of your console log. <br><br> Azure also enables you to see a screenshot of the VM from the hypervisor. */
export interface BootDiagnosticsOutput {
  /** Whether boot diagnostics should be enabled on the Virtual Machine. */
  enabled?: boolean;
  /** Uri of the storage account to use for placing the console output and screenshot. <br><br>If storageUri is not specified while enabling boot diagnostics, managed storage will be used. */
  storageUri?: string;
}

/** Describes a virtual machine scale set extension profile. */
export interface VirtualMachineScaleSetExtensionProfileOutput {
  /** The virtual machine scale set child extension resources. */
  extensions?: Array<VirtualMachineScaleSetExtensionOutput>;
  /** Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). <br><br> Minimum api-version: 2020-06-01 */
  extensionsTimeBudget?: string;
}

/** Describes a Virtual Machine Scale Set Extension. */
export interface VirtualMachineScaleSetExtensionOutput extends SubResourceReadOnlyOutput {
  /** The name of the extension. */
  name?: string;
  /** Resource type */
  readonly type?: string;
  /** Describes the properties of a Virtual Machine Scale Set Extension. */
  properties?: VirtualMachineScaleSetExtensionPropertiesOutput;
}

/** Describes the properties of a Virtual Machine Scale Set Extension. */
export interface VirtualMachineScaleSetExtensionPropertiesOutput {
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
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** Collection of extension names after which this extension needs to be provisioned. */
  provisionAfterExtensions?: Array<string>;
  /** Indicates whether failures stemming from the extension will be suppressed (Operational failures such as not connecting to the VM will not be suppressed regardless of this value). The default is false. */
  suppressFailures?: boolean;
  /** The extensions protected settings that are passed by reference, and consumed from key vault */
  protectedSettingsFromKeyVault?: KeyVaultSecretReferenceOutput;
}

/** Describes a reference to Key Vault Secret */
export interface KeyVaultSecretReferenceOutput {
  /** The URL referencing a secret in a Key Vault. */
  secretUrl: string;
  /** The relative URL of the Key Vault containing the secret. */
  sourceVault: SubResourceOutput;
}

export interface SubResourceReadOnlyOutput {
  /** Resource Id */
  readonly id?: string;
}

/** Specifies the billing related details of a Azure Spot VM or VMSS. <br><br>Minimum api-version: 2019-03-01. */
export interface BillingProfileOutput {
  /** Specifies the maximum price you are willing to pay for a Azure Spot VM/VMSS. This price is in US Dollars. <br><br> This price will be compared with the current Azure Spot price for the VM size. Also, the prices are compared at the time of create/update of Azure Spot VM/VMSS and the operation will only succeed if  the maxPrice is greater than the current Azure Spot price. <br><br> The maxPrice will also be used for evicting a Azure Spot VM/VMSS if the current Azure Spot price goes beyond the maxPrice after creation of VM/VMSS. <br><br> Possible values are: <br><br> - Any decimal value greater than zero. Example: 0.01538 <br><br> -1 – indicates default price to be up-to on-demand. <br><br> You can set the maxPrice to -1 to indicate that the Azure Spot VM/VMSS should not be evicted for price reasons. Also, the default max price is -1 if it is not provided by you. <br><br>Minimum api-version: 2019-03-01. */
  maxPrice?: number;
}

export interface ScheduledEventsProfileOutput {
  /** Specifies Terminate Scheduled Event related configurations. */
  terminateNotificationProfile?: TerminateNotificationProfileOutput;
}

export interface TerminateNotificationProfileOutput {
  /** Configurable length of time a Virtual Machine being deleted will have to potentially approve the Terminate Scheduled Event before the event is auto approved (timed out). The configuration must be specified in ISO 8601 format, the default value is 5 minutes (PT5M) */
  notBeforeTimeout?: string;
  /** Specifies whether the Terminate Scheduled event is enabled or disabled. */
  enable?: boolean;
}

/** The parameters of a capacity reservation Profile. */
export interface CapacityReservationProfileOutput {
  /** Specifies the capacity reservation group resource id that should be used for allocating the virtual machine or scaleset vm instances provided enough capacity has been reserved. Please refer to https://aka.ms/CapacityReservation for more details. */
  capacityReservationGroup?: SubResourceOutput;
}

/** Contains the list of gallery applications that should be made available to the VM/VMSS */
export interface ApplicationProfileOutput {
  /** Specifies the gallery applications that should be made available to the VM/VMSS */
  galleryApplications?: Array<VMGalleryApplicationOutput>;
}

/** Specifies the required information to reference a compute gallery application version */
export interface VMGalleryApplicationOutput {
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
export interface VirtualMachineScaleSetHardwareProfileOutput {
  /** Specifies the properties for customizing the size of the virtual machine. Minimum api-version: 2021-11-01. <br><br> Please follow the instructions in [VM Customization](https://aka.ms/vmcustomization) for more details. */
  vmSizeProperties?: VMSizePropertiesOutput;
}

/** Specifies VM Size Property settings on the virtual machine. */
export interface VMSizePropertiesOutput {
  /** Specifies the number of vCPUs available for the VM. <br><br> When this property is not specified in the request body the default behavior is to set it to the value of vCPUs available for that VM size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list) . */
  vCPUsAvailable?: number;
  /** Specifies the vCPU to physical core ratio. <br><br> When this property is not specified in the request body the default behavior is set to the value of vCPUsPerCore for the VM Size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list) <br><br> Setting this property to 1 also means that hyper-threading is disabled. */
  vCPUsPerCore?: number;
}

/** Enables or disables a capability on the virtual machine or virtual machine scale set. */
export interface AdditionalCapabilitiesOutput {
  /** The flag that enables or disables a capability to have one or more managed data disks with UltraSSD_LRS storage account type on the VM or VMSS. Managed disks with storage account type UltraSSD_LRS can be added to a virtual machine or virtual machine scale set only if this property is enabled. */
  ultraSSDEnabled?: boolean;
  /** The flag that enables or disables hibernation capability on the VM. */
  hibernationEnabled?: boolean;
}

/** Describes a scale-in policy for a virtual machine scale set. */
export interface ScaleInPolicyOutput {
  /** The rules to be followed when scaling-in a virtual machine scale set. <br><br> Possible values are: <br><br> **Default** When a virtual machine scale set is scaled in, the scale set will first be balanced across zones if it is a zonal scale set. Then, it will be balanced across Fault Domains as far as possible. Within each Fault Domain, the virtual machines chosen for removal will be the newest ones that are not protected from scale-in. <br><br> **OldestVM** When a virtual machine scale set is being scaled-in, the oldest virtual machines that are not protected from scale-in will be chosen for removal. For zonal virtual machine scale sets, the scale set will first be balanced across zones. Within each zone, the oldest virtual machines that are not protected will be chosen for removal. <br><br> **NewestVM** When a virtual machine scale set is being scaled-in, the newest virtual machines that are not protected from scale-in will be chosen for removal. For zonal virtual machine scale sets, the scale set will first be balanced across zones. Within each zone, the newest virtual machines that are not protected will be chosen for removal. <br><br> */
  rules?: Array<"Default" | "OldestVM" | "NewestVM">;
  /** This property allows you to specify if virtual machines chosen for removal have to be force deleted when a virtual machine scale set is being scaled-in.(Feature in Preview) */
  forceDeletion?: boolean;
}

/** Specifies the Spot-Try-Restore properties for the virtual machine scale set. <br><br> With this property customer can enable or disable automatic restore of the evicted Spot VMSS VM instances opportunistically based on capacity availability and pricing constraint. */
export interface SpotRestorePolicyOutput {
  /** Enables the Spot-Try-Restore feature where evicted VMSS SPOT instances will be tried to be restored opportunistically based on capacity availability and pricing constraints */
  enabled?: boolean;
  /** Timeout value expressed as an ISO 8601 time duration after which the platform will not try to restore the VMSS SPOT instances */
  restoreTimeout?: string;
}

/** Specifies the target splits for Spot and Regular priority VMs within a scale set with flexible orchestration mode. <br><br>With this property the customer is able to specify the base number of regular priority VMs created as the VMSS flex instance scales out and the split between Spot and Regular priority VMs after this base target has been reached. */
export interface PriorityMixPolicyOutput {
  /** The base number of regular priority VMs that will be created in this scale set as it scales out. */
  baseRegularPriorityCount?: number;
  /** The percentage of VM instances, after the base regular priority count has been reached, that are expected to use regular priority. */
  regularPriorityPercentageAboveBase?: number;
}

/** Identity for the virtual machine scale set. */
export interface VirtualMachineScaleSetIdentityOutput {
  /** The principal id of virtual machine scale set identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id associated with the virtual machine scale set. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of identity used for the virtual machine scale set. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine scale set. */
  type?: "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";
  /** The list of user identities associated with the virtual machine scale set. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserAssignedIdentitiesValueOutput>;
}

export interface UserAssignedIdentitiesValueOutput {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

/** The complex type of the extended location. */
export interface ExtendedLocationOutput {
  /** The name of the extended location. */
  name?: string;
  /** The type of the extended location. */
  type?: "EdgeZone";
}

/** The Resource model definition. */
export interface ResourceOutput {
  /** Resource Id */
  readonly id?: string;
  /** Resource name */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Resource location */
  location: string;
  /** Resource tags */
  tags?: Record<string, string>;
}

/** Describes a virtual machine scale set network profile's network configurations. */
export interface VirtualMachineScaleSetUpdateNetworkConfigurationOutput extends SubResourceOutput {
  /** The network configuration name. */
  name?: string;
  /** Describes a virtual machine scale set updatable network profile's IP configuration.Use this object for updating network profile's IP Configuration. */
  properties?: VirtualMachineScaleSetUpdateNetworkConfigurationPropertiesOutput;
}

/** Describes a virtual machine scale set updatable network profile's IP configuration.Use this object for updating network profile's IP Configuration. */
export interface VirtualMachineScaleSetUpdateNetworkConfigurationPropertiesOutput {
  /** Whether this is a primary NIC on a virtual machine. */
  primary?: boolean;
  /** Specifies whether the network interface is accelerated networking-enabled. */
  enableAcceleratedNetworking?: boolean;
  /** Specifies whether the network interface is disabled for tcp state tracking. */
  disableTcpStateTracking?: boolean;
  /** Specifies whether the network interface is FPGA networking-enabled. */
  enableFpga?: boolean;
  /** The network security group. */
  networkSecurityGroup?: SubResourceOutput;
  /** The dns settings to be applied on the network interfaces. */
  dnsSettings?: VirtualMachineScaleSetNetworkConfigurationDnsSettingsOutput;
  /** The virtual machine scale set IP Configuration. */
  ipConfigurations?: Array<VirtualMachineScaleSetUpdateIPConfigurationOutput>;
  /** Whether IP forwarding enabled on this NIC. */
  enableIPForwarding?: boolean;
  /** Specify what happens to the network interface when the VM is deleted */
  deleteOption?: "Delete" | "Detach";
}

/** Describes a virtual machine scale set network profile's IP configuration. NOTE: The subnet of a scale set may be modified as long as the original subnet and the new subnet are in the same virtual network */
export interface VirtualMachineScaleSetUpdateIPConfigurationOutput extends SubResourceOutput {
  /** The IP configuration name. */
  name?: string;
  /** Describes a virtual machine scale set network profile's IP configuration properties. */
  properties?: VirtualMachineScaleSetUpdateIPConfigurationPropertiesOutput;
}

/** Describes a virtual machine scale set network profile's IP configuration properties. */
export interface VirtualMachineScaleSetUpdateIPConfigurationPropertiesOutput {
  /** The subnet. */
  subnet?: ApiEntityReferenceOutput;
  /** Specifies the primary IP Configuration in case the network interface has more than one IP Configuration. */
  primary?: boolean;
  /** The publicIPAddressConfiguration. */
  publicIPAddressConfiguration?: VirtualMachineScaleSetUpdatePublicIPAddressConfigurationOutput;
  /** Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. */
  privateIPAddressVersion?: "IPv4" | "IPv6";
  /** The application gateway backend address pools. */
  applicationGatewayBackendAddressPools?: Array<SubResourceOutput>;
  /** Specifies an array of references to application security group. */
  applicationSecurityGroups?: Array<SubResourceOutput>;
  /** The load balancer backend address pools. */
  loadBalancerBackendAddressPools?: Array<SubResourceOutput>;
  /** The load balancer inbound nat pools. */
  loadBalancerInboundNatPools?: Array<SubResourceOutput>;
}

/** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
export interface VirtualMachineScaleSetUpdatePublicIPAddressConfigurationOutput {
  /** The publicIP address configuration name. */
  name?: string;
  /** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
  properties?: VirtualMachineScaleSetUpdatePublicIPAddressConfigurationPropertiesOutput;
}

/** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
export interface VirtualMachineScaleSetUpdatePublicIPAddressConfigurationPropertiesOutput {
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** The dns settings to be applied on the publicIP addresses . */
  dnsSettings?: VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettingsOutput;
  /** The PublicIPPrefix from which to allocate publicIP addresses. */
  publicIPPrefix?: SubResourceOutput;
  /** Specify what happens to the public IP when the VM is deleted */
  deleteOption?: "Delete" | "Detach";
}

/** The instance view of a virtual machine scale set. */
export interface VirtualMachineScaleSetInstanceViewOutput {
  /** The instance view status summary for the virtual machine scale set. */
  readonly virtualMachine?: VirtualMachineScaleSetInstanceViewStatusesSummaryOutput;
  /** The extensions information. */
  readonly extensions?: Array<VirtualMachineScaleSetVMExtensionsSummaryOutput>;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatusOutput>;
  /** The orchestration services information. */
  readonly orchestrationServices?: Array<OrchestrationServiceSummaryOutput>;
}

/** Instance view statuses summary for virtual machines of a virtual machine scale set. */
export interface VirtualMachineScaleSetInstanceViewStatusesSummaryOutput {
  /** The extensions information. */
  readonly statusesSummary?: Array<VirtualMachineStatusCodeCountOutput>;
}

/** The status code and count of the virtual machine scale set instance view status summary. */
export interface VirtualMachineStatusCodeCountOutput {
  /** The instance view status code. */
  readonly code?: string;
  /** The number of instances having a particular status code. */
  readonly count?: number;
}

/** Extensions summary for virtual machines of a virtual machine scale set. */
export interface VirtualMachineScaleSetVMExtensionsSummaryOutput {
  /** The extension name. */
  readonly name?: string;
  /** The extensions information. */
  readonly statusesSummary?: Array<VirtualMachineStatusCodeCountOutput>;
}

/** Instance view status. */
export interface InstanceViewStatusOutput {
  /** The status code. */
  code?: string;
  /** The level code. */
  level?: "Info" | "Warning" | "Error";
  /** The short localizable label for the status. */
  displayStatus?: string;
  /** The detailed status message, including for alerts and error messages. */
  message?: string;
  /** The time of the status. */
  time?: string;
}

/** Summary for an orchestration service of a virtual machine scale set. */
export interface OrchestrationServiceSummaryOutput {
  /** The name of the service. */
  readonly serviceName?: "AutomaticRepairs";
  /** The current state of the service. */
  readonly serviceState?: "NotRunning" | "Running" | "Suspended";
}

/** Describes a Virtual Machine Scale Set Extension. */
export interface VirtualMachineScaleSetExtensionUpdateOutput extends SubResourceReadOnlyOutput {
  /** The name of the extension. */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Describes the properties of a Virtual Machine Scale Set Extension. */
  properties?: VirtualMachineScaleSetExtensionPropertiesOutput;
}

/** The List VM scale set extension operation response. */
export interface VirtualMachineScaleSetExtensionListResultOutput {
  /** The list of VM scale set extensions. */
  value: Array<VirtualMachineScaleSetExtensionOutput>;
  /** The uri to fetch the next page of VM scale set extensions. Call ListNext() with this to fetch the next page of VM scale set extensions. */
  nextLink?: string;
}

/** The List Virtual Machine operation response. */
export interface VirtualMachineScaleSetListWithLinkResultOutput {
  /** The list of virtual machine scale sets. */
  value: Array<VirtualMachineScaleSetOutput>;
  /** The uri to fetch the next page of Virtual Machine Scale Sets. Call ListNext() with this to fetch the next page of Virtual Machine Scale Sets. */
  nextLink?: string;
}

/** The Virtual Machine Scale Set List Skus operation response. */
export interface VirtualMachineScaleSetListSkusResultOutput {
  /** The list of skus available for the virtual machine scale set. */
  value: Array<VirtualMachineScaleSetSkuOutput>;
  /** The uri to fetch the next page of Virtual Machine Scale Set Skus. Call ListNext() with this to fetch the next page of VMSS Skus. */
  nextLink?: string;
}

/** Describes an available virtual machine scale set sku. */
export interface VirtualMachineScaleSetSkuOutput {
  /** The type of resource the sku applies to. */
  readonly resourceType?: string;
  /** The Sku. */
  readonly sku?: SkuOutput;
  /** Specifies the number of virtual machines in the scale set. */
  readonly capacity?: VirtualMachineScaleSetSkuCapacityOutput;
}

/** Describes scaling information of a sku. */
export interface VirtualMachineScaleSetSkuCapacityOutput {
  /** The minimum capacity. */
  readonly minimum?: number;
  /** The maximum capacity that can be set. */
  readonly maximum?: number;
  /** The default capacity. */
  readonly defaultCapacity?: number;
  /** The scale type applicable to the sku. */
  readonly scaleType?: "Automatic" | "None";
}

/** List of Virtual Machine Scale Set OS Upgrade History operation response. */
export interface VirtualMachineScaleSetListOSUpgradeHistoryOutput {
  /** The list of OS upgrades performed on the virtual machine scale set. */
  value: Array<UpgradeOperationHistoricalStatusInfoOutput>;
  /** The uri to fetch the next page of OS Upgrade History. Call ListNext() with this to fetch the next page of history of upgrades. */
  nextLink?: string;
}

/** Virtual Machine Scale Set OS Upgrade History operation response. */
export interface UpgradeOperationHistoricalStatusInfoOutput {
  /** Information about the properties of the upgrade operation. */
  readonly properties?: UpgradeOperationHistoricalStatusInfoPropertiesOutput;
  /** Resource type */
  readonly type?: string;
  /** Resource location */
  readonly location?: string;
}

/** Describes each OS upgrade on the Virtual Machine Scale Set. */
export interface UpgradeOperationHistoricalStatusInfoPropertiesOutput {
  /** Information about the overall status of the upgrade operation. */
  readonly runningStatus?: UpgradeOperationHistoryStatusOutput;
  /** Counts of the VMs in each state. */
  readonly progress?: RollingUpgradeProgressInfoOutput;
  /** Error Details for this upgrade if there are any. */
  readonly error?: ApiErrorOutput;
  /** Invoker of the Upgrade Operation */
  readonly startedBy?: "Unknown" | "User" | "Platform";
  /** Image Reference details */
  readonly targetImageReference?: ImageReferenceOutput;
  /** Information about OS rollback if performed */
  readonly rollbackInfo?: RollbackStatusInfoOutput;
}

/** Information about the current running state of the overall upgrade. */
export interface UpgradeOperationHistoryStatusOutput {
  /** Code indicating the current status of the upgrade. */
  readonly code?: "RollingForward" | "Cancelled" | "Completed" | "Faulted";
  /** Start time of the upgrade. */
  readonly startTime?: string;
  /** End time of the upgrade. */
  readonly endTime?: string;
}

/** Information about the number of virtual machine instances in each upgrade state. */
export interface RollingUpgradeProgressInfoOutput {
  /** The number of instances that have been successfully upgraded. */
  readonly successfulInstanceCount?: number;
  /** The number of instances that have failed to be upgraded successfully. */
  readonly failedInstanceCount?: number;
  /** The number of instances that are currently being upgraded. */
  readonly inProgressInstanceCount?: number;
  /** The number of instances that have not yet begun to be upgraded. */
  readonly pendingInstanceCount?: number;
}

/** Information about rollback on failed VM instances after a OS Upgrade operation. */
export interface RollbackStatusInfoOutput {
  /** The number of instances which have been successfully rolled back. */
  readonly successfullyRolledbackInstanceCount?: number;
  /** The number of instances which failed to rollback. */
  readonly failedRolledbackInstanceCount?: number;
  /** Error details if OS rollback failed. */
  readonly rollbackError?: ApiErrorOutput;
}

/** The status of the latest virtual machine scale set rolling upgrade. */
export interface RollingUpgradeStatusInfoOutput extends ResourceOutput {
  /** The status of the latest virtual machine scale set rolling upgrade. */
  properties?: RollingUpgradeStatusInfoPropertiesOutput;
}

/** The status of the latest virtual machine scale set rolling upgrade. */
export interface RollingUpgradeStatusInfoPropertiesOutput {
  /** The rolling upgrade policies applied for this upgrade. */
  readonly policy?: RollingUpgradePolicyOutput;
  /** Information about the current running state of the overall upgrade. */
  readonly runningStatus?: RollingUpgradeRunningStatusOutput;
  /** Information about the number of virtual machine instances in each upgrade state. */
  readonly progress?: RollingUpgradeProgressInfoOutput;
  /** Error details for this upgrade, if there are any. */
  readonly error?: ApiErrorOutput;
}

/** Information about the current running state of the overall upgrade. */
export interface RollingUpgradeRunningStatusOutput {
  /** Code indicating the current status of the upgrade. */
  readonly code?: "RollingForward" | "Cancelled" | "Completed" | "Faulted";
  /** Start time of the upgrade. */
  readonly startTime?: string;
  /** The last action performed on the rolling upgrade. */
  readonly lastAction?: "Start" | "Cancel";
  /** Last action time of the upgrade. */
  readonly lastActionTime?: string;
}

/** Response after calling a manual recovery walk */
export interface RecoveryWalkResponseOutput {
  /** Whether the recovery walk was performed */
  readonly walkPerformed?: boolean;
  /** The next update domain that needs to be walked. Null means walk spanning all update domains has been completed */
  readonly nextPlatformUpdateDomain?: number;
}

/** Describes a VMSS VM Extension. */
export interface VirtualMachineScaleSetVMExtensionOutput extends SubResourceReadOnlyOutput {
  /** The name of the extension. */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Describes the properties of a Virtual Machine Extension. */
  properties?: VirtualMachineExtensionPropertiesOutput;
}

/** Describes the properties of a Virtual Machine Extension. */
export interface VirtualMachineExtensionPropertiesOutput {
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
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The virtual machine extension instance view. */
  instanceView?: VirtualMachineExtensionInstanceViewOutput;
  /** Indicates whether failures stemming from the extension will be suppressed (Operational failures such as not connecting to the VM will not be suppressed regardless of this value). The default is false. */
  suppressFailures?: boolean;
  /** The extensions protected settings that are passed by reference, and consumed from key vault */
  protectedSettingsFromKeyVault?: KeyVaultSecretReferenceOutput;
}

/** The instance view of a virtual machine extension. */
export interface VirtualMachineExtensionInstanceViewOutput {
  /** The virtual machine extension name. */
  name?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  type?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** The resource status information. */
  substatuses?: Array<InstanceViewStatusOutput>;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatusOutput>;
}

/** Describes a VMSS VM Extension. */
export interface VirtualMachineScaleSetVMExtensionUpdateOutput extends SubResourceReadOnlyOutput {
  /** The name of the extension. */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Describes the properties of a Virtual Machine Extension. */
  properties?: VirtualMachineExtensionUpdatePropertiesOutput;
}

/** Describes the properties of a Virtual Machine Extension. */
export interface VirtualMachineExtensionUpdatePropertiesOutput {
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
  protectedSettingsFromKeyVault?: KeyVaultSecretReferenceOutput;
}

/** The List VMSS VM Extension operation response */
export interface VirtualMachineScaleSetVMExtensionsListResultOutput {
  /** The list of VMSS VM extensions */
  value?: Array<VirtualMachineScaleSetVMExtensionOutput>;
}

/** Describes a virtual machine scale set virtual machine. */
export interface VirtualMachineScaleSetVMOutput extends ResourceOutput {
  /** The virtual machine instance ID. */
  readonly instanceId?: string;
  /** The virtual machine SKU. */
  readonly sku?: SkuOutput;
  /** Describes the properties of a virtual machine scale set virtual machine. */
  properties?: VirtualMachineScaleSetVMPropertiesOutput;
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: PlanOutput;
  /** The virtual machine child extension resources. */
  readonly resources?: Array<VirtualMachineExtensionOutput>;
  /** The virtual machine zones. */
  readonly zones?: Array<string>;
  /** The identity of the virtual machine, if configured. */
  identity?: VirtualMachineIdentityOutput;
}

/** Describes the properties of a virtual machine scale set virtual machine. */
export interface VirtualMachineScaleSetVMPropertiesOutput {
  /** Specifies whether the latest model has been applied to the virtual machine. */
  readonly latestModelApplied?: boolean;
  /** Azure VM unique ID. */
  readonly vmId?: string;
  /** The virtual machine instance view. */
  readonly instanceView?: VirtualMachineScaleSetVMInstanceViewOutput;
  /** Specifies the hardware settings for the virtual machine. */
  hardwareProfile?: HardwareProfileOutput;
  /** Specifies the storage settings for the virtual machine disks. */
  storageProfile?: StorageProfileOutput;
  /** Specifies additional capabilities enabled or disabled on the virtual machine in the scale set. For instance: whether the virtual machine has the capability to support attaching managed data disks with UltraSSD_LRS storage account type. */
  additionalCapabilities?: AdditionalCapabilitiesOutput;
  /** Specifies the operating system settings for the virtual machine. */
  osProfile?: OSProfileOutput;
  /** Specifies the Security related profile settings for the virtual machine. */
  securityProfile?: SecurityProfileOutput;
  /** Specifies the network interfaces of the virtual machine. */
  networkProfile?: NetworkProfileOutput;
  /** Specifies the network profile configuration of the virtual machine. */
  networkProfileConfiguration?: VirtualMachineScaleSetVMNetworkProfileConfigurationOutput;
  /** Specifies the boot diagnostic settings state. <br><br>Minimum api-version: 2015-06-15. */
  diagnosticsProfile?: DiagnosticsProfileOutput;
  /** Specifies information about the availability set that the virtual machine should be assigned to. Virtual machines specified in the same availability set are allocated to different nodes to maximize availability. For more information about availability sets, see [Availability sets overview](https://docs.microsoft.com/azure/virtual-machines/availability-set-overview). <br><br> For more information on Azure planned maintenance, see [Maintenance and updates for Virtual Machines in Azure](https://docs.microsoft.com/azure/virtual-machines/maintenance-and-updates) <br><br> Currently, a VM can only be added to availability set at creation time. An existing VM cannot be added to an availability set. */
  availabilitySet?: SubResourceOutput;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 */
  licenseType?: string;
  /** Specifies whether the model applied to the virtual machine is the model of the virtual machine scale set or the customized model for the virtual machine. */
  readonly modelDefinitionApplied?: string;
  /** Specifies the protection policy of the virtual machine. */
  protectionPolicy?: VirtualMachineScaleSetVMProtectionPolicyOutput;
  /** UserData for the VM, which must be base-64 encoded. Customer should not pass any secrets in here. <br><br>Minimum api-version: 2021-03-01 */
  userData?: string;
}

/** The instance view of a virtual machine scale set VM. */
export interface VirtualMachineScaleSetVMInstanceViewOutput {
  /** The Update Domain count. */
  platformUpdateDomain?: number;
  /** The Fault Domain count. */
  platformFaultDomain?: number;
  /** The Remote desktop certificate thumbprint. */
  rdpThumbPrint?: string;
  /** The VM Agent running on the virtual machine. */
  vmAgent?: VirtualMachineAgentInstanceViewOutput;
  /** The Maintenance Operation status on the virtual machine. */
  maintenanceRedeployStatus?: MaintenanceRedeployStatusOutput;
  /** The disks information. */
  disks?: Array<DiskInstanceViewOutput>;
  /** The extensions information. */
  extensions?: Array<VirtualMachineExtensionInstanceViewOutput>;
  /** The health status for the VM. */
  readonly vmHealth?: VirtualMachineHealthStatusOutput;
  /** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. <br><br> You can easily view the output of your console log. <br><br> Azure also enables you to see a screenshot of the VM from the hypervisor. */
  bootDiagnostics?: BootDiagnosticsInstanceViewOutput;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatusOutput>;
  /** Resource id of the dedicated host, on which the virtual machine is allocated through automatic placement, when the virtual machine is associated with a dedicated host group that has automatic placement enabled. <br><br>Minimum api-version: 2020-06-01. */
  readonly assignedHost?: string;
  /** The placement group in which the VM is running. If the VM is deallocated it will not have a placementGroupId. */
  placementGroupId?: string;
}

/** The instance view of the VM Agent running on the virtual machine. */
export interface VirtualMachineAgentInstanceViewOutput {
  /** The VM Agent full version. */
  vmAgentVersion?: string;
  /** The virtual machine extension handler instance view. */
  extensionHandlers?: Array<VirtualMachineExtensionHandlerInstanceViewOutput>;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatusOutput>;
}

/** The instance view of a virtual machine extension handler. */
export interface VirtualMachineExtensionHandlerInstanceViewOutput {
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  type?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** The extension handler status. */
  status?: InstanceViewStatusOutput;
}

/** Maintenance Operation Status. */
export interface MaintenanceRedeployStatusOutput {
  /** True, if customer is allowed to perform Maintenance. */
  isCustomerInitiatedMaintenanceAllowed?: boolean;
  /** Start Time for the Pre Maintenance Window. */
  preMaintenanceWindowStartTime?: string;
  /** End Time for the Pre Maintenance Window. */
  preMaintenanceWindowEndTime?: string;
  /** Start Time for the Maintenance Window. */
  maintenanceWindowStartTime?: string;
  /** End Time for the Maintenance Window. */
  maintenanceWindowEndTime?: string;
  /** The Last Maintenance Operation Result Code. */
  lastOperationResultCode?: "None" | "RetryLater" | "MaintenanceAborted" | "MaintenanceCompleted";
  /** Message returned for the last Maintenance Operation. */
  lastOperationMessage?: string;
}

/** The instance view of the disk. */
export interface DiskInstanceViewOutput {
  /** The disk name. */
  name?: string;
  /** Specifies the encryption settings for the OS Disk. <br><br> Minimum api-version: 2015-06-15 */
  encryptionSettings?: Array<DiskEncryptionSettingsOutput>;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatusOutput>;
}

/** Describes a Encryption Settings for a Disk */
export interface DiskEncryptionSettingsOutput {
  /** Specifies the location of the disk encryption key, which is a Key Vault Secret. */
  diskEncryptionKey?: KeyVaultSecretReferenceOutput;
  /** Specifies the location of the key encryption key in Key Vault. */
  keyEncryptionKey?: KeyVaultKeyReferenceOutput;
  /** Specifies whether disk encryption should be enabled on the virtual machine. */
  enabled?: boolean;
}

/** Describes a reference to Key Vault Key */
export interface KeyVaultKeyReferenceOutput {
  /** The URL referencing a key encryption key in Key Vault. */
  keyUrl: string;
  /** The relative URL of the Key Vault containing the key. */
  sourceVault: SubResourceOutput;
}

/** The health status of the VM. */
export interface VirtualMachineHealthStatusOutput {
  /** The health status information for the VM. */
  readonly status?: InstanceViewStatusOutput;
}

/** The instance view of a virtual machine boot diagnostics. */
export interface BootDiagnosticsInstanceViewOutput {
  /** The console screenshot blob URI. <br><br>NOTE: This will **not** be set if boot diagnostics is currently enabled with managed storage. */
  readonly consoleScreenshotBlobUri?: string;
  /** The serial console log blob Uri. <br><br>NOTE: This will **not** be set if boot diagnostics is currently enabled with managed storage. */
  readonly serialConsoleLogBlobUri?: string;
  /** The boot diagnostics status information for the VM. <br><br> NOTE: It will be set only if there are errors encountered in enabling boot diagnostics. */
  readonly status?: InstanceViewStatusOutput;
}

/** Specifies the hardware settings for the virtual machine. */
export interface HardwareProfileOutput {
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
  vmSizeProperties?: VMSizePropertiesOutput;
}

/** Specifies the storage settings for the virtual machine disks. */
export interface StorageProfileOutput {
  /** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. */
  imageReference?: ImageReferenceOutput;
  /** Specifies information about the operating system disk used by the virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  osDisk?: OSDiskOutput;
  /** Specifies the parameters that are used to add a data disk to a virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  dataDisks?: Array<DataDiskOutput>;
  /** Specifies the disk controller type configured for the VM. <br><br>NOTE: This property will be set to the default disk controller type if not specified provided virtual machine is being created as a hyperVGeneration: V2 based on the capabilities of the operating system disk and VM size from the the specified minimum api version. <br>You need to deallocate the VM before updating its disk controller type unless you are updating the VM size in the VM configuration which implicitly deallocates and reallocates the VM. <br><br> Minimum api-version: 2022-08-01 */
  diskControllerType?: "SCSI" | "NVMe";
}

/** Specifies information about the operating system disk used by the virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
export interface OSDiskOutput {
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  osType?: "Windows" | "Linux";
  /** Specifies the encryption settings for the OS Disk. <br><br> Minimum api-version: 2015-06-15 */
  encryptionSettings?: DiskEncryptionSettingsOutput;
  /** The disk name. */
  name?: string;
  /** The virtual hard disk. */
  vhd?: VirtualHardDiskOutput;
  /** The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. */
  image?: VirtualHardDiskOutput;
  /** Specifies the caching requirements. <br><br> Possible values are: <br><br> **None** <br><br> **ReadOnly** <br><br> **ReadWrite** <br><br> Default: **None** for Standard storage. **ReadOnly** for Premium storage. */
  caching?: "None" | "ReadOnly" | "ReadWrite";
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies the ephemeral Disk Settings for the operating system disk used by the virtual machine. */
  diffDiskSettings?: DiffDiskSettingsOutput;
  /** Specifies how the virtual machine should be created.<br><br> Possible values are:<br><br> **Attach** \u2013 This value is used when you are using a specialized disk to create the virtual machine.<br><br> **FromImage** \u2013 This value is used when you are using an image to create the virtual machine. If you are using a platform image, you also use the imageReference element described above. If you are using a marketplace image, you  also use the plan element previously described. */
  createOption: "FromImage" | "Empty" | "Attach";
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. <br><br> diskSizeGB is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023 */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: ManagedDiskParametersOutput;
  /** Specifies whether OS Disk should be deleted or detached upon VM deletion. <br><br> Possible values: <br><br> **Delete** If this value is used, the OS disk is deleted when VM is deleted.<br><br> **Detach** If this value is used, the os disk is retained after VM is deleted. <br><br> The default value is set to **detach**. For an ephemeral OS Disk, the default value is set to **Delete**. User cannot change the delete option for ephemeral OS Disk. */
  deleteOption?: "Delete" | "Detach";
}

/** The parameters of a managed disk. */
export interface ManagedDiskParametersOutput extends SubResourceOutput {
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
  diskEncryptionSet?: DiskEncryptionSetParametersOutput;
  /** Specifies the security profile for the managed disk. */
  securityProfile?: VMDiskSecurityProfileOutput;
}

/** Describes a data disk. */
export interface DataDiskOutput {
  /** Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. */
  lun: number;
  /** The disk name. */
  name?: string;
  /** The virtual hard disk. */
  vhd?: VirtualHardDiskOutput;
  /** The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. */
  image?: VirtualHardDiskOutput;
  /** Specifies the caching requirements. <br><br> Possible values are: <br><br> **None** <br><br> **ReadOnly** <br><br> **ReadWrite** <br><br> Default: **None for Standard storage. ReadOnly for Premium storage** */
  caching?: "None" | "ReadOnly" | "ReadWrite";
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies how the virtual machine should be created.<br><br> Possible values are:<br><br> **Attach** \u2013 This value is used when you are using a specialized disk to create the virtual machine.<br><br> **FromImage** \u2013 This value is used when you are using an image to create the virtual machine. If you are using a platform image, you also use the imageReference element described above. If you are using a marketplace image, you  also use the plan element previously described. */
  createOption: "FromImage" | "Empty" | "Attach";
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. <br><br> diskSizeGB is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023 */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: ManagedDiskParametersOutput;
  /** Specifies whether the data disk is in process of detachment from the VirtualMachine/VirtualMachineScaleset */
  toBeDetached?: boolean;
  /** Specifies the Read-Write IOPS for the managed disk when StorageAccountType is UltraSSD_LRS. Returned only for VirtualMachine ScaleSet VM disks. Can be updated only via updates to the VirtualMachine Scale Set. */
  readonly diskIOPSReadWrite?: number;
  /** Specifies the bandwidth in MB per second for the managed disk when StorageAccountType is UltraSSD_LRS. Returned only for VirtualMachine ScaleSet VM disks. Can be updated only via updates to the VirtualMachine Scale Set. */
  readonly diskMBpsReadWrite?: number;
  /** Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values: **ForceDetach**. <br><br> detachOption: **ForceDetach** is applicable only for managed data disks. If a previous detachment attempt of the data disk did not complete due to an unexpected failure from the virtual machine and the disk is still not released then use force-detach as a last resort option to detach the disk forcibly from the VM. All writes might not have been flushed when using this detach behavior. <br><br> This feature is still in preview mode and is not supported for VirtualMachineScaleSet. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'. */
  detachOption?: "ForceDetach";
  /** Specifies whether data disk should be deleted or detached upon VM deletion.<br><br> Possible values: <br><br> **Delete** If this value is used, the data disk is deleted when VM is deleted.<br><br> **Detach** If this value is used, the data disk is retained after VM is deleted.<br><br> The default value is set to **detach** */
  deleteOption?: "Delete" | "Detach";
}

/** Specifies the operating system settings for the virtual machine. Some of the settings cannot be changed once VM is provisioned. */
export interface OSProfileOutput {
  /** Specifies the host OS name of the virtual machine. <br><br> This name cannot be updated after the VM is created. <br><br> **Max-length (Windows):** 15 characters <br><br> **Max-length (Linux):** 64 characters. <br><br> For naming conventions and restrictions see [Azure infrastructure services implementation guidelines](https://docs.microsoft.com/azure/azure-resource-manager/management/resource-name-rules). */
  computerName?: string;
  /** Specifies the name of the administrator account. <br><br> This property cannot be updated after the VM is created. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters. */
  adminUsername?: string;
  /** Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection) */
  adminPassword?: string;
  /** Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. <br><br> **Note: Do not pass any secrets or passwords in customData property** <br><br> This property cannot be updated after the VM is created. <br><br> customData is passed to the VM to be saved as a file, for more information see [Custom Data on Azure VMs](https://azure.microsoft.com/blog/custom-data-and-cloud-init-on-windows-azure/) <br><br> For using cloud-init for your Linux VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init) */
  customData?: string;
  /** Specifies Windows operating system settings on the virtual machine. */
  windowsConfiguration?: WindowsConfigurationOutput;
  /** Specifies the Linux operating system settings on the virtual machine. <br><br>For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros). */
  linuxConfiguration?: LinuxConfigurationOutput;
  /** Specifies set of certificates that should be installed onto the virtual machine. To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  secrets?: Array<VaultSecretGroupOutput>;
  /** Specifies whether extension operations should be allowed on the virtual machine. <br><br>This may only be set to False when no extensions are present on the virtual machine. */
  allowExtensionOperations?: boolean;
  /** Optional property which must either be set to True or omitted. */
  requireGuestProvisionSignal?: boolean;
}

/** Specifies the network interfaces or the networking configuration of the virtual machine. */
export interface NetworkProfileOutput {
  /** Specifies the list of resource Ids for the network interfaces associated with the virtual machine. */
  networkInterfaces?: Array<NetworkInterfaceReferenceOutput>;
  /** specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations */
  networkApiVersion?: "2020-11-01";
  /** Specifies the networking configurations that will be used to create the virtual machine networking resources. */
  networkInterfaceConfigurations?: Array<VirtualMachineNetworkInterfaceConfigurationOutput>;
}

/** Describes a network interface reference. */
export interface NetworkInterfaceReferenceOutput extends SubResourceOutput {
  /** Describes a network interface reference properties. */
  properties?: NetworkInterfaceReferencePropertiesOutput;
}

/** Describes a network interface reference properties. */
export interface NetworkInterfaceReferencePropertiesOutput {
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** Specify what happens to the network interface when the VM is deleted */
  deleteOption?: "Delete" | "Detach";
}

/** Describes a virtual machine network interface configurations. */
export interface VirtualMachineNetworkInterfaceConfigurationOutput {
  /** The network interface configuration name. */
  name: string;
  /** Describes a virtual machine network profile's IP configuration. */
  properties?: VirtualMachineNetworkInterfaceConfigurationPropertiesOutput;
}

/** Describes a virtual machine network profile's IP configuration. */
export interface VirtualMachineNetworkInterfaceConfigurationPropertiesOutput {
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
  networkSecurityGroup?: SubResourceOutput;
  /** The dns settings to be applied on the network interfaces. */
  dnsSettings?: VirtualMachineNetworkInterfaceDnsSettingsConfigurationOutput;
  /** Specifies the IP configurations of the network interface. */
  ipConfigurations: Array<VirtualMachineNetworkInterfaceIPConfigurationOutput>;
  dscpConfiguration?: SubResourceOutput;
}

/** Describes a virtual machines network configuration's DNS settings. */
export interface VirtualMachineNetworkInterfaceDnsSettingsConfigurationOutput {
  /** List of DNS servers IP addresses */
  dnsServers?: Array<string>;
}

/** Describes a virtual machine network profile's IP configuration. */
export interface VirtualMachineNetworkInterfaceIPConfigurationOutput {
  /** The IP configuration name. */
  name: string;
  /** Describes a virtual machine network interface IP configuration properties. */
  properties?: VirtualMachineNetworkInterfaceIPConfigurationPropertiesOutput;
}

/** Describes a virtual machine network interface IP configuration properties. */
export interface VirtualMachineNetworkInterfaceIPConfigurationPropertiesOutput {
  /** Specifies the identifier of the subnet. */
  subnet?: SubResourceOutput;
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** The publicIPAddressConfiguration. */
  publicIPAddressConfiguration?: VirtualMachinePublicIPAddressConfigurationOutput;
  /** Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. */
  privateIPAddressVersion?: "IPv4" | "IPv6";
  /** Specifies an array of references to application security group. */
  applicationSecurityGroups?: Array<SubResourceOutput>;
  /** Specifies an array of references to backend address pools of application gateways. A virtual machine can reference backend address pools of multiple application gateways. Multiple virtual machines cannot use the same application gateway. */
  applicationGatewayBackendAddressPools?: Array<SubResourceOutput>;
  /** Specifies an array of references to backend address pools of load balancers. A virtual machine can reference backend address pools of one public and one internal load balancer. [Multiple virtual machines cannot use the same basic sku load balancer]. */
  loadBalancerBackendAddressPools?: Array<SubResourceOutput>;
}

/** Describes a virtual machines IP Configuration's PublicIPAddress configuration */
export interface VirtualMachinePublicIPAddressConfigurationOutput {
  /** The publicIP address configuration name. */
  name: string;
  /** Describes a virtual machines IP Configuration's PublicIPAddress configuration */
  properties?: VirtualMachinePublicIPAddressConfigurationPropertiesOutput;
  /** Describes the public IP Sku. It can only be set with OrchestrationMode as Flexible. */
  sku?: PublicIPAddressSkuOutput;
}

/** Describes a virtual machines IP Configuration's PublicIPAddress configuration */
export interface VirtualMachinePublicIPAddressConfigurationPropertiesOutput {
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** Specify what happens to the public IP address when the VM is deleted */
  deleteOption?: "Delete" | "Detach";
  /** The dns settings to be applied on the publicIP addresses . */
  dnsSettings?: VirtualMachinePublicIPAddressDnsSettingsConfigurationOutput;
  /** The list of IP tags associated with the public IP address. */
  ipTags?: Array<VirtualMachineIpTagOutput>;
  /** The PublicIPPrefix from which to allocate publicIP addresses. */
  publicIPPrefix?: SubResourceOutput;
  /** Available from Api-Version 2019-07-01 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'. */
  publicIPAddressVersion?: "IPv4" | "IPv6";
  /** Specify the public IP allocation type */
  publicIPAllocationMethod?: "Dynamic" | "Static";
}

/** Describes a virtual machines network configuration's DNS settings. */
export interface VirtualMachinePublicIPAddressDnsSettingsConfigurationOutput {
  /** The Domain name label prefix of the PublicIPAddress resources that will be created. The generated name label is the concatenation of the domain name label and vm network profile unique ID. */
  domainNameLabel: string;
}

/** Contains the IP tag associated with the public IP address. */
export interface VirtualMachineIpTagOutput {
  /** IP tag type. Example: FirstPartyUsage. */
  ipTagType?: string;
  /** IP tag associated with the public IP. Example: SQL, Storage etc. */
  tag?: string;
}

/** Describes a virtual machine scale set VM network profile. */
export interface VirtualMachineScaleSetVMNetworkProfileConfigurationOutput {
  /** The list of network configurations. */
  networkInterfaceConfigurations?: Array<VirtualMachineScaleSetNetworkConfigurationOutput>;
}

/** The protection policy of a virtual machine scale set VM. */
export interface VirtualMachineScaleSetVMProtectionPolicyOutput {
  /** Indicates that the virtual machine scale set VM shouldn't be considered for deletion during a scale-in operation. */
  protectFromScaleIn?: boolean;
  /** Indicates that model updates or actions (including scale-in) initiated on the virtual machine scale set should not be applied to the virtual machine scale set VM. */
  protectFromScaleSetActions?: boolean;
}

/** Describes a Virtual Machine Extension. */
export interface VirtualMachineExtensionOutput extends ResourceWithOptionalLocationOutput {
  /** Describes the properties of a Virtual Machine Extension. */
  properties?: VirtualMachineExtensionPropertiesOutput;
}

/** The Resource model definition with location property as optional. */
export interface ResourceWithOptionalLocationOutput {
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
}

/** Identity for the virtual machine. */
export interface VirtualMachineIdentityOutput {
  /** The principal id of virtual machine identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id associated with the virtual machine. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of identity used for the virtual machine. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine. */
  type?: "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";
  /** The list of user identities associated with the Virtual Machine. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserAssignedIdentitiesValueOutput>;
}

/** The List Virtual Machine Scale Set VMs operation response. */
export interface VirtualMachineScaleSetVMListResultOutput {
  /** The list of virtual machine scale sets VMs. */
  value: Array<VirtualMachineScaleSetVMOutput>;
  /** The uri to fetch the next page of Virtual Machine Scale Set VMs. Call ListNext() with this to fetch the next page of VMSS VMs */
  nextLink?: string;
}

/** The SAS URIs of the console screenshot and serial log blobs. */
export interface RetrieveBootDiagnosticsDataResultOutput {
  /** The console screenshot blob URI */
  readonly consoleScreenshotBlobUri?: string;
  /** The serial console log blob URI. */
  readonly serialConsoleLogBlobUri?: string;
}

/** The List Extension operation response */
export interface VirtualMachineExtensionsListResultOutput {
  /** The list of extensions */
  value?: Array<VirtualMachineExtensionOutput>;
}

/** The List Virtual Machine operation response. */
export interface VirtualMachineListResultOutput {
  /** The list of virtual machines. */
  value: Array<VirtualMachineOutput>;
  /** The URI to fetch the next page of VMs. Call ListNext() with this URI to fetch the next page of Virtual Machines. */
  nextLink?: string;
}

/** Describes a Virtual Machine. */
export interface VirtualMachineOutput extends ResourceOutput {
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: PlanOutput;
  /** Describes the properties of a Virtual Machine. */
  properties?: VirtualMachinePropertiesOutput;
  /** The virtual machine child extension resources. */
  readonly resources?: Array<VirtualMachineExtensionOutput>;
  /** The identity of the virtual machine, if configured. */
  identity?: VirtualMachineIdentityOutput;
  /** The virtual machine zones. */
  zones?: Array<string>;
  /** The extended location of the Virtual Machine. */
  extendedLocation?: ExtendedLocationOutput;
}

/** Describes the properties of a Virtual Machine. */
export interface VirtualMachinePropertiesOutput {
  /** Specifies the hardware settings for the virtual machine. */
  hardwareProfile?: HardwareProfileOutput;
  /** Specifies the storage settings for the virtual machine disks. */
  storageProfile?: StorageProfileOutput;
  /** Specifies additional capabilities enabled or disabled on the virtual machine. */
  additionalCapabilities?: AdditionalCapabilitiesOutput;
  /** Specifies the operating system settings used while creating the virtual machine. Some of the settings cannot be changed once VM is provisioned. */
  osProfile?: OSProfileOutput;
  /** Specifies the network interfaces of the virtual machine. */
  networkProfile?: NetworkProfileOutput;
  /** Specifies the Security related profile settings for the virtual machine. */
  securityProfile?: SecurityProfileOutput;
  /** Specifies the boot diagnostic settings state. <br><br>Minimum api-version: 2015-06-15. */
  diagnosticsProfile?: DiagnosticsProfileOutput;
  /** Specifies information about the availability set that the virtual machine should be assigned to. Virtual machines specified in the same availability set are allocated to different nodes to maximize availability. For more information about availability sets, see [Availability sets overview](https://docs.microsoft.com/azure/virtual-machines/availability-set-overview). <br><br> For more information on Azure planned maintenance, see [Maintenance and updates for Virtual Machines in Azure](https://docs.microsoft.com/azure/virtual-machines/maintenance-and-updates) <br><br> Currently, a VM can only be added to availability set at creation time. The availability set to which the VM is being added should be under the same resource group as the availability set resource. An existing VM cannot be added to an availability set. <br><br>This property cannot exist along with a non-null properties.virtualMachineScaleSet reference. */
  availabilitySet?: SubResourceOutput;
  /** Specifies information about the virtual machine scale set that the virtual machine should be assigned to. Virtual machines specified in the same virtual machine scale set are allocated to different nodes to maximize availability. Currently, a VM can only be added to virtual machine scale set at creation time. An existing VM cannot be added to a virtual machine scale set. <br><br>This property cannot exist along with a non-null properties.availabilitySet reference. <br><br>Minimum api‐version: 2019‐03‐01 */
  virtualMachineScaleSet?: SubResourceOutput;
  /** Specifies information about the proximity placement group that the virtual machine should be assigned to. <br><br>Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResourceOutput;
  /** Specifies the priority for the virtual machine. <br><br>Minimum api-version: 2019-03-01 */
  priority?: "Regular" | "Low" | "Spot";
  /** Specifies the eviction policy for the Azure Spot virtual machine and Azure Spot scale set. <br><br>For Azure Spot virtual machines, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2019-03-01. <br><br>For Azure Spot scale sets, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2017-10-30-preview. */
  evictionPolicy?: "Deallocate" | "Delete";
  /** Specifies the billing related details of a Azure Spot virtual machine. <br><br>Minimum api-version: 2019-03-01. */
  billingProfile?: BillingProfileOutput;
  /** Specifies information about the dedicated host that the virtual machine resides in. <br><br>Minimum api-version: 2018-10-01. */
  host?: SubResourceOutput;
  /** Specifies information about the dedicated host group that the virtual machine resides in. <br><br>Minimum api-version: 2020-06-01. <br><br>NOTE: User cannot specify both host and hostGroup properties. */
  hostGroup?: SubResourceOutput;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The virtual machine instance view. */
  readonly instanceView?: VirtualMachineInstanceViewOutput;
  /** Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 */
  licenseType?: string;
  /** Specifies the VM unique ID which is a 128-bits identifier that is encoded and stored in all Azure IaaS VMs SMBIOS and can be read using platform BIOS commands. */
  readonly vmId?: string;
  /** Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). <br><br> Minimum api-version: 2020-06-01 */
  extensionsTimeBudget?: string;
  /** Specifies the scale set logical fault domain into which the Virtual Machine will be created. By default, the Virtual Machine will by automatically assigned to a fault domain that best maintains balance across available fault domains.<br><li>This is applicable only if the 'virtualMachineScaleSet' property of this Virtual Machine is set.<li>The Virtual Machine Scale Set that is referenced, must have 'platformFaultDomainCount' &gt; 1.<li>This property cannot be updated once the Virtual Machine is created.<li>Fault domain assignment can be viewed in the Virtual Machine Instance View.<br><br>Minimum api‐version: 2020‐12‐01 */
  platformFaultDomain?: number;
  /** Specifies Scheduled Event related configurations. */
  scheduledEventsProfile?: ScheduledEventsProfileOutput;
  /** UserData for the VM, which must be base-64 encoded. Customer should not pass any secrets in here. <br><br>Minimum api-version: 2021-03-01 */
  userData?: string;
  /** Specifies information about the capacity reservation that is used to allocate virtual machine. <br><br>Minimum api-version: 2021-04-01. */
  capacityReservation?: CapacityReservationProfileOutput;
  /** Specifies the gallery applications that should be made available to the VM/VMSS */
  applicationProfile?: ApplicationProfileOutput;
  /** Specifies the time at which the Virtual Machine resource was created.<br><br>Minimum api-version: 2021-11-01. */
  readonly timeCreated?: string;
}

/** The instance view of a virtual machine. */
export interface VirtualMachineInstanceViewOutput {
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
  vmAgent?: VirtualMachineAgentInstanceViewOutput;
  /** The Maintenance Operation status on the virtual machine. */
  maintenanceRedeployStatus?: MaintenanceRedeployStatusOutput;
  /** The virtual machine disk information. */
  disks?: Array<DiskInstanceViewOutput>;
  /** The extensions information. */
  extensions?: Array<VirtualMachineExtensionInstanceViewOutput>;
  /** The health status for the VM. */
  readonly vmHealth?: VirtualMachineHealthStatusOutput;
  /** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. <br><br> You can easily view the output of your console log. <br><br> Azure also enables you to see a screenshot of the VM from the hypervisor. */
  bootDiagnostics?: BootDiagnosticsInstanceViewOutput;
  /** Resource id of the dedicated host, on which the virtual machine is allocated through automatic placement, when the virtual machine is associated with a dedicated host group that has automatic placement enabled. <br><br>Minimum api-version: 2020-06-01. */
  readonly assignedHost?: string;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatusOutput>;
  /** [Preview Feature] The status of virtual machine patch operations. */
  patchStatus?: VirtualMachinePatchStatusOutput;
}

/** The status of virtual machine patch operations. */
export interface VirtualMachinePatchStatusOutput {
  /** The available patch summary of the latest assessment operation for the virtual machine. */
  availablePatchSummary?: AvailablePatchSummaryOutput;
  /** The installation summary of the latest installation operation for the virtual machine. */
  lastPatchInstallationSummary?: LastPatchInstallationSummaryOutput;
  /** The enablement status of the specified patchMode */
  readonly configurationStatuses?: Array<InstanceViewStatusOutput>;
}

/** Describes the properties of an virtual machine instance view for available patch summary. */
export interface AvailablePatchSummaryOutput {
  /** The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings." */
  readonly status?: "Unknown" | "InProgress" | "Failed" | "Succeeded" | "CompletedWithWarnings";
  /** The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs. */
  readonly assessmentActivityId?: string;
  /** The overall reboot status of the VM. It will be true when partially installed patches require a reboot to complete installation but the reboot has not yet occurred. */
  readonly rebootPending?: boolean;
  /** The number of critical or security patches that have been detected as available and not yet installed. */
  readonly criticalAndSecurityPatchCount?: number;
  /** The number of all available patches excluding critical and security. */
  readonly otherPatchCount?: number;
  /** The UTC timestamp when the operation began. */
  readonly startTime?: string;
  /** The UTC timestamp when the operation began. */
  readonly lastModifiedTime?: string;
  /** The errors that were encountered during execution of the operation. The details array contains the list of them. */
  readonly error?: ApiErrorOutput;
}

/** Describes the properties of the last installed patch summary. */
export interface LastPatchInstallationSummaryOutput {
  /** The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings." */
  readonly status?: "Unknown" | "InProgress" | "Failed" | "Succeeded" | "CompletedWithWarnings";
  /** The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs. */
  readonly installationActivityId?: string;
  /** Describes whether the operation ran out of time before it completed all its intended actions */
  readonly maintenanceWindowExceeded?: boolean;
  /** The number of all available patches but not going to be installed because it didn't match a classification or inclusion list entry. */
  readonly notSelectedPatchCount?: number;
  /** The number of all available patches but excluded explicitly by a customer-specified exclusion list match. */
  readonly excludedPatchCount?: number;
  /** The number of all available patches expected to be installed over the course of the patch installation operation. */
  readonly pendingPatchCount?: number;
  /** The count of patches that successfully installed. */
  readonly installedPatchCount?: number;
  /** The count of patches that failed installation. */
  readonly failedPatchCount?: number;
  /** The UTC timestamp when the operation began. */
  readonly startTime?: string;
  /** The UTC timestamp when the operation began. */
  readonly lastModifiedTime?: string;
  /** The errors that were encountered during execution of the operation. The details array contains the list of them. */
  readonly error?: ApiErrorOutput;
}

/** Output of virtual machine capture operation. */
export interface VirtualMachineCaptureResultOutput extends SubResourceOutput {
  /** the schema of the captured virtual machine */
  readonly $schema?: string;
  /** the version of the content */
  readonly contentVersion?: string;
  /** parameters of the captured virtual machine */
  readonly parameters?: any;
  /** a list of resource items of the captured virtual machine */
  readonly resources?: Array<any>;
}

/** Describes the properties of an AssessPatches result. */
export interface VirtualMachineAssessPatchesResultOutput {
  /** The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings." */
  readonly status?: "Unknown" | "InProgress" | "Failed" | "Succeeded" | "CompletedWithWarnings";
  /** The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs. */
  readonly assessmentActivityId?: string;
  /** The overall reboot status of the VM. It will be true when partially installed patches require a reboot to complete installation but the reboot has not yet occurred. */
  readonly rebootPending?: boolean;
  /** The number of critical or security patches that have been detected as available and not yet installed. */
  readonly criticalAndSecurityPatchCount?: number;
  /** The number of all available patches excluding critical and security. */
  readonly otherPatchCount?: number;
  /** The UTC timestamp when the operation began. */
  readonly startDateTime?: string;
  /** The list of patches that have been detected as available for installation. */
  readonly availablePatches?: Array<VirtualMachineSoftwarePatchPropertiesOutput>;
  /** The errors that were encountered during execution of the operation. The details array contains the list of them. */
  readonly error?: ApiErrorOutput;
}

/** Describes the properties of a Virtual Machine software patch. */
export interface VirtualMachineSoftwarePatchPropertiesOutput {
  /** A unique identifier for the patch. */
  readonly patchId?: string;
  /** The friendly name of the patch. */
  readonly name?: string;
  /** The version number of the patch. This property applies only to Linux patches. */
  readonly version?: string;
  /** The KBID of the patch. Only applies to Windows patches. */
  readonly kbId?: string;
  /** The classification(s) of the patch as provided by the patch publisher. */
  readonly classifications?: Array<string>;
  /** Describes the reboot requirements of the patch. */
  readonly rebootBehavior?:
    | "Unknown"
    | "NeverReboots"
    | "AlwaysRequiresReboot"
    | "CanRequestReboot";
  /** The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs. */
  readonly activityId?: string;
  /** The UTC timestamp when the repository published this patch. */
  readonly publishedDate?: string;
  /** The UTC timestamp of the last update to this patch record. */
  readonly lastModifiedDateTime?: string;
  /** Describes the availability of a given patch. */
  readonly assessmentState?: "Unknown" | "Available";
}

/** The result summary of an installation operation. */
export interface VirtualMachineInstallPatchesResultOutput {
  /** The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Failed", "Succeeded", "Unknown" or "CompletedWithWarnings." */
  readonly status?: "Unknown" | "InProgress" | "Failed" | "Succeeded" | "CompletedWithWarnings";
  /** The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs. */
  readonly installationActivityId?: string;
  /** The reboot state of the VM following completion of the operation. */
  readonly rebootStatus?: "Unknown" | "NotNeeded" | "Required" | "Started" | "Failed" | "Completed";
  /** Whether the operation ran out of time before it completed all its intended actions. */
  readonly maintenanceWindowExceeded?: boolean;
  /** The number of patches that were not installed due to the user blocking their installation. */
  readonly excludedPatchCount?: number;
  /** The number of patches that were detected as available for install, but did not meet the operation's criteria. */
  readonly notSelectedPatchCount?: number;
  /** The number of patches that were identified as meeting the installation criteria, but were not able to be installed. Typically this happens when maintenanceWindowExceeded == true. */
  readonly pendingPatchCount?: number;
  /** The number of patches successfully installed. */
  readonly installedPatchCount?: number;
  /** The number of patches that could not be installed due to some issue. See errors for details. */
  readonly failedPatchCount?: number;
  /** The patches that were installed during the operation. */
  readonly patches?: Array<PatchInstallationDetailOutput>;
  /** The UTC timestamp when the operation began. */
  readonly startDateTime?: string;
  /** The errors that were encountered during execution of the operation. The details array contains the list of them. */
  readonly error?: ApiErrorOutput;
}

/** Information about a specific patch that was encountered during an installation action. */
export interface PatchInstallationDetailOutput {
  /** A unique identifier for the patch. */
  readonly patchId?: string;
  /** The friendly name of the patch. */
  readonly name?: string;
  /** The version string of the package. It may conform to Semantic Versioning. Only applies to Linux. */
  readonly version?: string;
  /** The KBID of the patch. Only applies to Windows patches. */
  readonly kbId?: string;
  /** The classification(s) of the patch as provided by the patch publisher. */
  readonly classifications?: Array<string>;
  /** The state of the patch after the installation operation completed. */
  readonly installationState?:
    | "Unknown"
    | "Installed"
    | "Failed"
    | "Excluded"
    | "NotSelected"
    | "Pending";
}

/** Describes a Virtual Machine Image. */
export interface VirtualMachineImageOutput extends VirtualMachineImageResourceOutput {
  /** Describes the properties of a Virtual Machine Image. */
  properties?: VirtualMachineImagePropertiesOutput;
}

/** Describes the properties of a Virtual Machine Image. */
export interface VirtualMachineImagePropertiesOutput {
  /** Used for establishing the purchase context of any 3rd Party artifact through MarketPlace. */
  plan?: PurchasePlanOutput;
  /** Contains the os disk image information. */
  osDiskImage?: OSDiskImageOutput;
  dataDiskImages?: Array<DataDiskImageOutput>;
  /** Describes automatic OS upgrade properties on the image. */
  automaticOSUpgradeProperties?: AutomaticOSUpgradePropertiesOutput;
  /** Specifies the HyperVGeneration Type */
  hyperVGeneration?: "V1" | "V2";
  /** Specifies disallowed configuration for the VirtualMachine created from the image */
  disallowed?: DisallowedConfigurationOutput;
  features?: Array<VirtualMachineImageFeatureOutput>;
  /** Specifies the Architecture Type */
  architecture?: "x64" | "Arm64";
}

/** Used for establishing the purchase context of any 3rd Party artifact through MarketPlace. */
export interface PurchasePlanOutput {
  /** The publisher ID. */
  publisher: string;
  /** The plan ID. */
  name: string;
  /** Specifies the product of the image from the marketplace. This is the same value as Offer under the imageReference element. */
  product: string;
}

/** Contains the os disk image information. */
export interface OSDiskImageOutput {
  /** The operating system of the osDiskImage. */
  operatingSystem: "Windows" | "Linux";
}

/** Contains the data disk images information. */
export interface DataDiskImageOutput {
  /** Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. */
  readonly lun?: number;
}

/** Describes automatic OS upgrade properties on the image. */
export interface AutomaticOSUpgradePropertiesOutput {
  /** Specifies whether automatic OS upgrade is supported on the image. */
  automaticOSUpgradeSupported: boolean;
}

/** Specifies the disallowed configuration for a virtual machine image. */
export interface DisallowedConfigurationOutput {
  /** VM disk types which are disallowed. */
  vmDiskType?: "None" | "Unmanaged";
}

/** Specifies additional capabilities supported by the image */
export interface VirtualMachineImageFeatureOutput {
  /** The name of the feature. */
  name?: string;
  /** The corresponding value for the feature. */
  value?: string;
}

/** Virtual machine image resource information. */
export interface VirtualMachineImageResourceOutput extends SubResourceOutput {
  /** The name of the resource. */
  name: string;
  /** The supported Azure location of the resource. */
  location: string;
  /** Specifies the tags that are assigned to the virtual machine. For more information about using tags, see [Using tags to organize your Azure resources](https://docs.microsoft.com/azure/azure-resource-manager/resource-group-using-tags.md). */
  tags?: Record<string, string>;
  /** The extended location of the Virtual Machine. */
  extendedLocation?: ExtendedLocationOutput;
}

/** The List VmImages in EdgeZone operation response. */
export interface VmImagesInEdgeZoneListResultOutput {
  /** The list of VMImages in EdgeZone */
  value?: Array<VirtualMachineImageResourceOutput>;
  /** The URI to fetch the next page of VMImages in EdgeZone. Call ListNext() with this URI to fetch the next page of VmImages. */
  nextLink?: string;
}

/** Describes a Virtual Machine Extension Image. */
export interface VirtualMachineExtensionImageOutput extends ResourceOutput {
  /** Describes the properties of a Virtual Machine Extension Image. */
  properties?: VirtualMachineExtensionImagePropertiesOutput;
}

/** Describes the properties of a Virtual Machine Extension Image. */
export interface VirtualMachineExtensionImagePropertiesOutput {
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
export interface AvailabilitySetOutput extends ResourceOutput {
  /** The instance view of a resource. */
  properties?: AvailabilitySetPropertiesOutput;
  /** Sku of the availability set, only name is required to be set. See AvailabilitySetSkuTypes for possible set of values. Use 'Aligned' for virtual machines with managed disks and 'Classic' for virtual machines with unmanaged disks. Default value is 'Classic'. */
  sku?: SkuOutput;
}

/** The instance view of a resource. */
export interface AvailabilitySetPropertiesOutput {
  /** Update Domain count. */
  platformUpdateDomainCount?: number;
  /** Fault Domain count. */
  platformFaultDomainCount?: number;
  /** A list of references to all virtual machines in the availability set. */
  virtualMachines?: Array<SubResourceOutput>;
  /** Specifies information about the proximity placement group that the availability set should be assigned to. <br><br>Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResourceOutput;
  /** The resource status information. */
  readonly statuses?: Array<InstanceViewStatusOutput>;
}

/** The List Availability Set operation response. */
export interface AvailabilitySetListResultOutput {
  /** The list of availability sets */
  value: Array<AvailabilitySetOutput>;
  /** The URI to fetch the next page of AvailabilitySets. Call ListNext() with this URI to fetch the next page of AvailabilitySets. */
  nextLink?: string;
}

/** Specifies information about the proximity placement group. */
export interface ProximityPlacementGroupOutput extends ResourceOutput {
  /** Describes the properties of a Proximity Placement Group. */
  properties?: ProximityPlacementGroupPropertiesOutput;
  /** Specifies the Availability Zone where virtual machine, virtual machine scale set or availability set associated with the  proximity placement group can be created. */
  zones?: Array<string>;
}

/** Describes the properties of a Proximity Placement Group. */
export interface ProximityPlacementGroupPropertiesOutput {
  /** Specifies the type of the proximity placement group. <br><br> Possible values are: <br><br> **Standard** : Co-locate resources within an Azure region or Availability Zone. <br><br> **Ultra** : For future use. */
  proximityPlacementGroupType?: "Standard" | "Ultra";
  /** A list of references to all virtual machines in the proximity placement group. */
  readonly virtualMachines?: Array<SubResourceWithColocationStatusOutput>;
  /** A list of references to all virtual machine scale sets in the proximity placement group. */
  readonly virtualMachineScaleSets?: Array<SubResourceWithColocationStatusOutput>;
  /** A list of references to all availability sets in the proximity placement group. */
  readonly availabilitySets?: Array<SubResourceWithColocationStatusOutput>;
  /** Describes colocation status of the Proximity Placement Group. */
  colocationStatus?: InstanceViewStatusOutput;
  /** Specifies the user intent of the proximity placement group. */
  intent?: ProximityPlacementGroupPropertiesIntentOutput;
}

export interface SubResourceWithColocationStatusOutput extends SubResourceOutput {
  /** Describes colocation status of a resource in the Proximity Placement Group. */
  colocationStatus?: InstanceViewStatusOutput;
}

/** Specifies the user intent of the proximity placement group. */
export interface ProximityPlacementGroupPropertiesIntentOutput {
  /** Specifies possible sizes of virtual machines that can be created in the proximity placement group. */
  vmSizes?: Array<string>;
}

/** The List Proximity Placement Group operation response. */
export interface ProximityPlacementGroupListResultOutput {
  /** The list of proximity placement groups */
  value: Array<ProximityPlacementGroupOutput>;
  /** The URI to fetch the next page of proximity placement groups. */
  nextLink?: string;
}

/** Specifies information about the dedicated host group that the dedicated hosts should be assigned to. <br><br> Currently, a dedicated host can only be added to a dedicated host group at creation time. An existing dedicated host cannot be added to another dedicated host group. */
export interface DedicatedHostGroupOutput extends ResourceOutput {
  /** Dedicated Host Group Properties. */
  properties?: DedicatedHostGroupPropertiesOutput;
  /** Availability Zone to use for this host group. Only single zone is supported. The zone can be assigned only during creation. If not provided, the group supports all zones in the region. If provided, enforces each host in the group to be in the same zone. */
  zones?: Array<string>;
}

/** Dedicated Host Group Properties. */
export interface DedicatedHostGroupPropertiesOutput {
  /** Number of fault domains that the host group can span. */
  platformFaultDomainCount: number;
  /** A list of references to all dedicated hosts in the dedicated host group. */
  readonly hosts?: Array<SubResourceReadOnlyOutput>;
  /** The dedicated host group instance view, which has the list of instance view of the dedicated hosts under the dedicated host group. */
  readonly instanceView?: DedicatedHostGroupInstanceViewOutput;
  /** Specifies whether virtual machines or virtual machine scale sets can be placed automatically on the dedicated host group. Automatic placement means resources are allocated on dedicated hosts, that are chosen by Azure, under the dedicated host group. The value is defaulted to 'false' when not provided. <br><br>Minimum api-version: 2020-06-01. */
  supportAutomaticPlacement?: boolean;
  /** Enables or disables a capability on the dedicated host group.<br><br>Minimum api-version: 2022-03-01. */
  additionalCapabilities?: DedicatedHostGroupPropertiesAdditionalCapabilitiesOutput;
}

export interface DedicatedHostGroupInstanceViewOutput {
  /** List of instance view of the dedicated hosts under the dedicated host group. */
  hosts?: Array<DedicatedHostInstanceViewWithNameOutput>;
}

/** The instance view of a dedicated host that includes the name of the dedicated host. It is used for the response to the instance view of a dedicated host group. */
export interface DedicatedHostInstanceViewWithNameOutput extends DedicatedHostInstanceViewOutput {
  /** The name of the dedicated host. */
  readonly name?: string;
}

/** The instance view of a dedicated host. */
export interface DedicatedHostInstanceViewOutput {
  /** Specifies the unique id of the dedicated physical machine on which the dedicated host resides. */
  readonly assetId?: string;
  /** Unutilized capacity of the dedicated host. */
  availableCapacity?: DedicatedHostAvailableCapacityOutput;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatusOutput>;
}

/** Dedicated host unutilized capacity. */
export interface DedicatedHostAvailableCapacityOutput {
  /** The unutilized capacity of the dedicated host represented in terms of each VM size that is allowed to be deployed to the dedicated host. */
  allocatableVMs?: Array<DedicatedHostAllocatableVMOutput>;
}

/** Represents the dedicated host unutilized capacity in terms of a specific VM size. */
export interface DedicatedHostAllocatableVMOutput {
  /** VM size in terms of which the unutilized capacity is represented. */
  vmSize?: string;
  /** Maximum number of VMs of size vmSize that can fit in the dedicated host's remaining capacity. */
  count?: number;
}

/** Enables or disables a capability on the dedicated host group.<br><br>Minimum api-version: 2022-03-01. */
export interface DedicatedHostGroupPropertiesAdditionalCapabilitiesOutput {
  /** The flag that enables or disables a capability to have UltraSSD Enabled Virtual Machines on Dedicated Hosts of the Dedicated Host Group. For the Virtual Machines to be UltraSSD Enabled, UltraSSDEnabled flag for the resource needs to be set true as well. The value is defaulted to 'false' when not provided. Please refer to https://docs.microsoft.com/en-us/azure/virtual-machines/disks-enable-ultra-ssd for more details on Ultra SSD feature. <br><br>NOTE: The ultraSSDEnabled setting can only be enabled for Host Groups that are created as zonal. <br><br>Minimum api-version: 2022-03-01. */
  ultraSSDEnabled?: boolean;
}

/** The List Dedicated Host Group with resource group response. */
export interface DedicatedHostGroupListResultOutput {
  /** The list of dedicated host groups */
  value: Array<DedicatedHostGroupOutput>;
  /** The URI to fetch the next page of Dedicated Host Groups. Call ListNext() with this URI to fetch the next page of Dedicated Host Groups. */
  nextLink?: string;
}

/** Specifies information about the Dedicated host. */
export interface DedicatedHostOutput extends ResourceOutput {
  /** Properties of the dedicated host. */
  properties?: DedicatedHostPropertiesOutput;
  /** SKU of the dedicated host for Hardware Generation and VM family. Only name is required to be set. List Microsoft.Compute SKUs for a list of possible values. */
  sku: SkuOutput;
}

/** Properties of the dedicated host. */
export interface DedicatedHostPropertiesOutput {
  /** Fault domain of the dedicated host within a dedicated host group. */
  platformFaultDomain?: number;
  /** Specifies whether the dedicated host should be replaced automatically in case of a failure. The value is defaulted to 'true' when not provided. */
  autoReplaceOnFailure?: boolean;
  /** A unique id generated and assigned to the dedicated host by the platform. <br><br> Does not change throughout the lifetime of the host. */
  readonly hostId?: string;
  /** A list of references to all virtual machines in the Dedicated Host. */
  readonly virtualMachines?: Array<SubResourceReadOnlyOutput>;
  /** Specifies the software license type that will be applied to the VMs deployed on the dedicated host. <br><br> Possible values are: <br><br> **None** <br><br> **Windows_Server_Hybrid** <br><br> **Windows_Server_Perpetual** <br><br> Default: **None** */
  licenseType?: "None" | "Windows_Server_Hybrid" | "Windows_Server_Perpetual";
  /** The date when the host was first provisioned. */
  readonly provisioningTime?: string;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The dedicated host instance view. */
  readonly instanceView?: DedicatedHostInstanceViewOutput;
  /** Specifies the time at which the Dedicated Host resource was created.<br><br>Minimum api-version: 2021-11-01. */
  readonly timeCreated?: string;
}

/** The list dedicated host operation response. */
export interface DedicatedHostListResultOutput {
  /** The list of dedicated hosts */
  value: Array<DedicatedHostOutput>;
  /** The URI to fetch the next page of dedicated hosts. Call ListNext() with this URI to fetch the next page of dedicated hosts. */
  nextLink?: string;
}

/** The list SSH public keys operation response. */
export interface SshPublicKeysGroupListResultOutput {
  /** The list of SSH public keys */
  value: Array<SshPublicKeyResourceOutput>;
  /** The URI to fetch the next page of SSH public keys. Call ListNext() with this URI to fetch the next page of SSH public keys. */
  nextLink?: string;
}

/** Specifies information about the SSH public key. */
export interface SshPublicKeyResourceOutput extends ResourceOutput {
  /** Properties of the SSH public key. */
  properties?: SshPublicKeyResourcePropertiesOutput;
}

/** Properties of the SSH public key. */
export interface SshPublicKeyResourcePropertiesOutput {
  /** SSH public key used to authenticate to a virtual machine through ssh. If this property is not initially provided when the resource is created, the publicKey property will be populated when generateKeyPair is called. If the public key is provided upon resource creation, the provided public key needs to be at least 2048-bit and in ssh-rsa format. */
  publicKey?: string;
}

/** Response from generation of an SSH key pair. */
export interface SshPublicKeyGenerateKeyPairResultOutput {
  /** Private key portion of the key pair used to authenticate to a virtual machine through ssh. The private key is returned in RFC3447 format and should be treated as a secret. */
  privateKey: string;
  /** Public key portion of the key pair used to authenticate to a virtual machine through ssh. The public key is in ssh-rsa format. */
  publicKey: string;
  /** The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{SshPublicKeyName} */
  id: string;
}

/** The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. */
export interface ImageOutput extends ResourceOutput {
  /** Describes the properties of an Image. */
  properties?: ImagePropertiesOutput;
  /** The extended location of the Image. */
  extendedLocation?: ExtendedLocationOutput;
}

/** Describes the properties of an Image. */
export interface ImagePropertiesOutput {
  /** The source virtual machine from which Image is created. */
  sourceVirtualMachine?: SubResourceOutput;
  /** Specifies the storage settings for the virtual machine disks. */
  storageProfile?: ImageStorageProfileOutput;
  /** The provisioning state. */
  readonly provisioningState?: string;
  /** Specifies the HyperVGenerationType of the VirtualMachine created from the image. From API Version 2019-03-01 if the image source is a blob, then we need the user to specify the value, if the source is managed resource like disk or snapshot, we may require the user to specify the property if we cannot deduce it from the source managed resource. */
  hyperVGeneration?: "V1" | "V2";
}

/** Describes a storage profile. */
export interface ImageStorageProfileOutput {
  /** Specifies information about the operating system disk used by the virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  osDisk?: ImageOSDiskOutput;
  /** Specifies the parameters that are used to add a data disk to a virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  dataDisks?: Array<ImageDataDiskOutput>;
  /** Specifies whether an image is zone resilient or not. Default is false. Zone resilient images can be created only in regions that provide Zone Redundant Storage (ZRS). */
  zoneResilient?: boolean;
}

/** Describes an Operating System disk. */
export interface ImageOSDiskOutput extends ImageDiskOutput {
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from a custom image. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  osType: "Windows" | "Linux";
  /** The OS State. For managed images, use Generalized. */
  osState: "Generalized" | "Specialized";
}

/** Describes a image disk. */
export interface ImageDiskOutput {
  /** The snapshot. */
  snapshot?: SubResourceOutput;
  /** The managedDisk. */
  managedDisk?: SubResourceOutput;
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
  diskEncryptionSet?: DiskEncryptionSetParametersOutput;
}

/** Describes a data disk. */
export interface ImageDataDiskOutput extends ImageDiskOutput {
  /** Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. */
  lun: number;
}

/** The List Image operation response. */
export interface ImageListResultOutput {
  /** The list of Images. */
  value: Array<ImageOutput>;
  /** The uri to fetch the next page of Images. Call ListNext() with this to fetch the next page of Images. */
  nextLink?: string;
}

/** Create or update Restore Point collection parameters. */
export interface RestorePointCollectionOutput extends ResourceOutput {
  /** The restore point collection properties. */
  properties?: RestorePointCollectionPropertiesOutput;
}

/** The restore point collection properties. */
export interface RestorePointCollectionPropertiesOutput {
  /** The properties of the source resource that this restore point collection is created from. */
  source?: RestorePointCollectionSourcePropertiesOutput;
  /** The provisioning state of the restore point collection. */
  readonly provisioningState?: string;
  /** The unique id of the restore point collection. */
  readonly restorePointCollectionId?: string;
  /** A list containing all restore points created under this restore point collection. */
  readonly restorePoints?: Array<RestorePointOutput>;
}

/** The properties of the source resource that this restore point collection is created from. */
export interface RestorePointCollectionSourcePropertiesOutput {
  /** Location of the source resource used to create this restore point collection. */
  readonly location?: string;
  /** Resource Id of the source resource used to create this restore point collection */
  id?: string;
}

/** Restore Point details. */
export interface RestorePointOutput extends ProxyResourceOutput {
  /** The restore point properties. */
  properties?: RestorePointPropertiesOutput;
}

/** The restore point properties. */
export interface RestorePointPropertiesOutput {
  /** List of disk resource ids that the customer wishes to exclude from the restore point. If no disks are specified, all disks will be included. */
  excludeDisks?: Array<ApiEntityReferenceOutput>;
  /** Gets the details of the VM captured at the time of the restore point creation. */
  readonly sourceMetadata?: RestorePointSourceMetadataOutput;
  /** Gets the provisioning state of the restore point. */
  readonly provisioningState?: string;
  /** ConsistencyMode of the RestorePoint. Can be specified in the input while creating a restore point. For now, only CrashConsistent is accepted as a valid input. Please refer to https://aka.ms/RestorePoints for more details. */
  consistencyMode?: "CrashConsistent" | "FileSystemConsistent" | "ApplicationConsistent";
  /** Gets the creation time of the restore point. */
  timeCreated?: string;
  /** Resource Id of the source restore point from which a copy needs to be created. */
  sourceRestorePoint?: ApiEntityReferenceOutput;
  /** The restore point instance view. */
  readonly instanceView?: RestorePointInstanceViewOutput;
}

/** Describes the properties of the Virtual Machine for which the restore point was created. The properties provided are a subset and the snapshot of the overall Virtual Machine properties captured at the time of the restore point creation. */
export interface RestorePointSourceMetadataOutput {
  /** Gets the hardware profile. */
  hardwareProfile?: HardwareProfileOutput;
  /** Gets the storage profile. */
  storageProfile?: RestorePointSourceVMStorageProfileOutput;
  /** Gets the OS profile. */
  osProfile?: OSProfileOutput;
  /** Gets the diagnostics profile. */
  diagnosticsProfile?: DiagnosticsProfileOutput;
  /** Gets the license type, which is for bring your own license scenario. */
  licenseType?: string;
  /** Gets the virtual machine unique id. */
  vmId?: string;
  /** Gets the security profile. */
  securityProfile?: SecurityProfileOutput;
  /** Location of the VM from which the restore point was created. */
  location?: string;
}

/** Describes the storage profile. */
export interface RestorePointSourceVMStorageProfileOutput {
  /** Gets the OS disk of the VM captured at the time of the restore point creation. */
  osDisk?: RestorePointSourceVmosDiskOutput;
  /** Gets the data disks of the VM captured at the time of the restore point creation. */
  dataDisks?: Array<RestorePointSourceVMDataDiskOutput>;
}

/** Describes an Operating System disk. */
export interface RestorePointSourceVmosDiskOutput {
  /** Gets the Operating System type. */
  osType?: "Windows" | "Linux";
  /** Gets the disk encryption settings. */
  encryptionSettings?: DiskEncryptionSettingsOutput;
  /** Gets the disk name. */
  name?: string;
  /** Gets the caching type. */
  caching?: "None" | "ReadOnly" | "ReadWrite";
  /** Gets the disk size in GB. */
  diskSizeGB?: number;
  /** Gets the managed disk details */
  managedDisk?: ManagedDiskParametersOutput;
  /** Gets the disk restore point Id. */
  diskRestorePoint?: ApiEntityReferenceOutput;
}

/** Describes a data disk. */
export interface RestorePointSourceVMDataDiskOutput {
  /** Gets the logical unit number. */
  lun?: number;
  /** Gets the disk name. */
  name?: string;
  /** Gets the caching type. */
  caching?: "None" | "ReadOnly" | "ReadWrite";
  /** Gets the initial disk size in GB for blank data disks, and the new desired size for existing OS and Data disks. */
  diskSizeGB?: number;
  /** Gets the managed disk details */
  managedDisk?: ManagedDiskParametersOutput;
  /** Gets the disk restore point Id. */
  diskRestorePoint?: ApiEntityReferenceOutput;
}

/** The instance view of a restore point. */
export interface RestorePointInstanceViewOutput {
  /** The disk restore points information. */
  diskRestorePoints?: Array<DiskRestorePointInstanceViewOutput>;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatusOutput>;
}

/** The instance view of a disk restore point. */
export interface DiskRestorePointInstanceViewOutput {
  /** Disk restore point Id. */
  id?: string;
  /** The disk restore point replication status information. */
  replicationStatus?: DiskRestorePointReplicationStatusOutput;
}

/** The instance view of a disk restore point. */
export interface DiskRestorePointReplicationStatusOutput {
  /** The resource status information. */
  status?: InstanceViewStatusOutput;
  /** Replication completion percentage. */
  completionPercent?: number;
}

/** The resource model definition for an Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResourceOutput {
  /** Resource Id */
  readonly id?: string;
  /** Resource name */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
}

/** The List restore point collection operation response. */
export interface RestorePointCollectionListResultOutput {
  /** Gets the list of restore point collections. */
  value?: Array<RestorePointCollectionOutput>;
  /** The uri to fetch the next page of RestorePointCollections. Call ListNext() with this to fetch the next page of RestorePointCollections */
  nextLink?: string;
}

/** Specifies information about the capacity reservation group that the capacity reservations should be assigned to. <br><br> Currently, a capacity reservation can only be added to a capacity reservation group at creation time. An existing capacity reservation cannot be added or moved to another capacity reservation group. */
export interface CapacityReservationGroupOutput extends ResourceOutput {
  /** capacity reservation group Properties. */
  properties?: CapacityReservationGroupPropertiesOutput;
  /** Availability Zones to use for this capacity reservation group. The zones can be assigned only during creation. If not provided, the group supports only regional resources in the region. If provided, enforces each capacity reservation in the group to be in one of the zones. */
  zones?: Array<string>;
}

/** capacity reservation group Properties. */
export interface CapacityReservationGroupPropertiesOutput {
  /** A list of all capacity reservation resource ids that belong to capacity reservation group. */
  readonly capacityReservations?: Array<SubResourceReadOnlyOutput>;
  /** A list of references to all virtual machines associated to the capacity reservation group. */
  readonly virtualMachinesAssociated?: Array<SubResourceReadOnlyOutput>;
  /** The capacity reservation group instance view which has the list of instance views for all the capacity reservations that belong to the capacity reservation group. */
  readonly instanceView?: CapacityReservationGroupInstanceViewOutput;
}

export interface CapacityReservationGroupInstanceViewOutput {
  /** List of instance view of the capacity reservations under the capacity reservation group. */
  readonly capacityReservations?: Array<CapacityReservationInstanceViewWithNameOutput>;
}

/** The instance view of a capacity reservation that includes the name of the capacity reservation. It is used for the response to the instance view of a capacity reservation group. */
export interface CapacityReservationInstanceViewWithNameOutput extends CapacityReservationInstanceViewOutput {
  /** The name of the capacity reservation. */
  readonly name?: string;
}

/** The instance view of a capacity reservation that provides as snapshot of the runtime properties of the capacity reservation that is managed by the platform and can change outside of control plane operations. */
export interface CapacityReservationInstanceViewOutput {
  /** Unutilized capacity of the capacity reservation. */
  utilizationInfo?: CapacityReservationUtilizationOutput;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatusOutput>;
}

/** Represents the capacity reservation utilization in terms of resources allocated. */
export interface CapacityReservationUtilizationOutput {
  /** The value provides the current capacity of the VM size which was reserved successfully and for which the customer is getting billed.<br><br>Minimum api-version: 2022-08-01. */
  readonly currentCapacity?: number;
  /** A list of all virtual machines resource ids allocated against the capacity reservation. */
  readonly virtualMachinesAllocated?: Array<SubResourceReadOnlyOutput>;
}

/** The List capacity reservation group with resource group response. */
export interface CapacityReservationGroupListResultOutput {
  /** The list of capacity reservation groups */
  value: Array<CapacityReservationGroupOutput>;
  /** The URI to fetch the next page of capacity reservation groups. Call ListNext() with this URI to fetch the next page of capacity reservation groups. */
  nextLink?: string;
}

/** Specifies information about the capacity reservation. */
export interface CapacityReservationOutput extends ResourceOutput {
  /** Properties of the Capacity reservation. */
  properties?: CapacityReservationPropertiesOutput;
  /** SKU of the resource for which capacity needs be reserved. The SKU name and capacity is required to be set. Currently VM Skus with the capability called 'CapacityReservationSupported' set to true are supported. Refer to List Microsoft.Compute SKUs in a region (https://docs.microsoft.com/rest/api/compute/resourceskus/list) for supported values. */
  sku: SkuOutput;
  /** Availability Zone to use for this capacity reservation. The zone has to be single value and also should be part for the list of zones specified during the capacity reservation group creation. The zone can be assigned only during creation. If not provided, the reservation supports only non-zonal deployments. If provided, enforces VM/VMSS using this capacity reservation to be in same zone. */
  zones?: Array<string>;
}

/** Properties of the Capacity reservation. */
export interface CapacityReservationPropertiesOutput {
  /** A unique id generated and assigned to the capacity reservation by the platform which does not change throughout the lifetime of the resource. */
  readonly reservationId?: string;
  /** Specifies the value of fault domain count that Capacity Reservation supports for requested VM size.<br>NOTE: The fault domain count specified for a resource (like virtual machines scale set) must be less than or equal to this value if it deploys using capacity reservation.<br><br>Minimum api-version: 2022-08-01. */
  readonly platformFaultDomainCount?: number;
  /** A list of all virtual machine resource ids that are associated with the capacity reservation. */
  readonly virtualMachinesAssociated?: Array<SubResourceReadOnlyOutput>;
  /** The date time when the capacity reservation was last updated. */
  readonly provisioningTime?: string;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The Capacity reservation instance view. */
  readonly instanceView?: CapacityReservationInstanceViewOutput;
  /** Specifies the time at which the Capacity Reservation resource was created.<br><br>Minimum api-version: 2021-11-01. */
  readonly timeCreated?: string;
}

/** The list capacity reservation operation response. */
export interface CapacityReservationListResultOutput {
  /** The list of capacity reservations */
  value: Array<CapacityReservationOutput>;
  /** The URI to fetch the next page of capacity reservations. Call ListNext() with this URI to fetch the next page of capacity reservations. */
  nextLink?: string;
}

/** LogAnalytics operation status response */
export interface LogAnalyticsOperationResultOutput {
  /** LogAnalyticsOutput */
  readonly properties?: LogAnalyticsOutputOutput;
}

/** LogAnalytics output properties */
export interface LogAnalyticsOutputOutput {
  /** Output file Uri path to blob container. */
  readonly output?: string;
}

/** The List Virtual Machine operation response. */
export interface RunCommandListResultOutput {
  /** The list of virtual machine run commands. */
  value: Array<RunCommandDocumentBaseOutput>;
  /** The uri to fetch the next page of run commands. Call ListNext() with this to fetch the next page of run commands. */
  nextLink?: string;
}

/** Describes the properties of a Run Command metadata. */
export interface RunCommandDocumentBaseOutput {
  /** The VM run command schema. */
  $schema: string;
  /** The VM run command id. */
  id: string;
  /** The Operating System type. */
  osType: "Windows" | "Linux";
  /** The VM run command label. */
  label: string;
  /** The VM run command description. */
  description: string;
}

/** Describes the properties of a Run Command. */
export interface RunCommandDocumentOutput extends RunCommandDocumentBaseOutput {
  /** The script to be executed. */
  script: Array<string>;
  /** The parameters used by the script. */
  parameters?: Array<RunCommandParameterDefinitionOutput>;
}

/** Describes the properties of a run command parameter. */
export interface RunCommandParameterDefinitionOutput {
  /** The run command parameter name. */
  name: string;
  /** The run command parameter type. */
  type: string;
  /** The run command parameter default value. */
  defaultValue?: string;
  /** The run command parameter required. */
  required?: boolean;
}

/** Describes the properties of a run command parameter. */
export interface RunCommandInputParameterOutput {
  /** The run command parameter name. */
  name: string;
  /** The run command parameter value. */
  value: string;
}

export interface RunCommandResultOutput {
  /** Run command operation response. */
  value?: Array<InstanceViewStatusOutput>;
}

/** Describes a Virtual Machine run command. */
export interface VirtualMachineRunCommandOutput extends ResourceOutput {
  /** Describes the properties of a Virtual Machine run command. */
  properties?: VirtualMachineRunCommandPropertiesOutput;
}

/** Describes the properties of a Virtual Machine run command. */
export interface VirtualMachineRunCommandPropertiesOutput {
  /** The source of the run command script. */
  source?: VirtualMachineRunCommandScriptSourceOutput;
  /** The parameters used by the script. */
  parameters?: Array<RunCommandInputParameterOutput>;
  /** The parameters used by the script. */
  protectedParameters?: Array<RunCommandInputParameterOutput>;
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
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The virtual machine run command instance view. */
  readonly instanceView?: VirtualMachineRunCommandInstanceViewOutput;
}

/** Describes the script sources for run command. */
export interface VirtualMachineRunCommandScriptSourceOutput {
  /** Specifies the script content to be executed on the VM. */
  script?: string;
  /** Specifies the script download location. */
  scriptUri?: string;
  /** Specifies a commandId of predefined built-in script. */
  commandId?: string;
}

/** The instance view of a virtual machine run command. */
export interface VirtualMachineRunCommandInstanceViewOutput {
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
  startTime?: string;
  /** Script end time. */
  endTime?: string;
  /** The resource status information. */
  statuses?: Array<InstanceViewStatusOutput>;
}

/** The List run command operation response */
export interface VirtualMachineRunCommandsListResultOutput {
  /** The list of run commands */
  value: Array<VirtualMachineRunCommandOutput>;
  /** The uri to fetch the next page of run commands. */
  nextLink?: string;
}

/** Disk resource. */
export interface DiskOutput extends ResourceOutput {
  /** A relative URI containing the ID of the VM that has the disk attached. */
  readonly managedBy?: string;
  /** List of relative URIs containing the IDs of the VMs that have the disk attached. maxShares should be set to a value greater than one for disks to allow attaching them to multiple VMs. */
  readonly managedByExtended?: Array<string>;
  /** The disks sku name. Can be Standard_LRS, Premium_LRS, StandardSSD_LRS, UltraSSD_LRS, Premium_ZRS, StandardSSD_ZRS, or PremiumV2_LRS. */
  sku?: DiskSkuOutput;
  /** The Logical zone list for Disk. */
  zones?: Array<string>;
  /** The extended location where the disk will be created. Extended location cannot be changed. */
  extendedLocation?: ExtendedLocationOutput;
  /** Disk resource properties. */
  properties?: DiskPropertiesOutput;
}

/** The disks sku name. Can be Standard_LRS, Premium_LRS, StandardSSD_LRS, UltraSSD_LRS, Premium_ZRS, StandardSSD_ZRS, or PremiumV2_LRS. */
export interface DiskSkuOutput {
  /** The sku name. */
  name?:
    | "Standard_LRS"
    | "Premium_LRS"
    | "StandardSSD_LRS"
    | "UltraSSD_LRS"
    | "Premium_ZRS"
    | "StandardSSD_ZRS"
    | "PremiumV2_LRS";
  /** The sku tier. */
  readonly tier?: string;
}

/** Disk resource properties. */
export interface DiskPropertiesOutput {
  /** The time when the disk was created. */
  readonly timeCreated?: string;
  /** The Operating System type. */
  osType?: "Windows" | "Linux";
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: "V1" | "V2";
  /** Purchase plan information for the the image from which the OS disk was created. E.g. - {name: 2019-Datacenter, publisher: MicrosoftWindowsServer, product: WindowsServer} */
  purchasePlan?: PurchasePlanAutoGeneratedOutput;
  /** List of supported capabilities for the image from which the OS disk was created. */
  supportedCapabilities?: SupportedCapabilitiesOutput;
  /** Disk source information. CreationData information cannot be changed after the disk has been created. */
  creationData: CreationDataOutput;
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /** The size of the disk in bytes. This field is read only. */
  readonly diskSizeBytes?: number;
  /** Unique Guid identifying the resource. */
  readonly uniqueId?: string;
  /** Encryption settings collection used for Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollectionOutput;
  /** The disk provisioning state. */
  readonly provisioningState?: string;
  /** The number of IOPS allowed for this disk; only settable for UltraSSD disks. One operation can transfer between 4k and 256k bytes. */
  diskIOPSReadWrite?: number;
  /** The bandwidth allowed for this disk; only settable for UltraSSD disks. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadWrite?: number;
  /** The total number of IOPS that will be allowed across all VMs mounting the shared disk as ReadOnly. One operation can transfer between 4k and 256k bytes. */
  diskIOPSReadOnly?: number;
  /** The total throughput (MBps) that will be allowed across all VMs mounting the shared disk as ReadOnly. MBps means millions of bytes per second - MB here uses the ISO notation, of powers of 10. */
  diskMBpsReadOnly?: number;
  /** The state of the disk. */
  readonly diskState?:
    | "Unattached"
    | "Attached"
    | "Reserved"
    | "Frozen"
    | "ActiveSAS"
    | "ActiveSASFrozen"
    | "ReadyToUpload"
    | "ActiveUpload";
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: EncryptionOutput;
  /** The maximum number of VMs that can attach to the disk at the same time. Value greater than one indicates a disk that can be mounted on multiple VMs at the same time. */
  maxShares?: number;
  /** Details of the list of all VMs that have the disk attached. maxShares should be set to a value greater than one for disks to allow attaching them to multiple VMs. */
  readonly shareInfo?: Array<ShareInfoElementOutput>;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: "AllowAll" | "AllowPrivate" | "DenyAll";
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Latest time when bursting was last enabled on a disk. */
  readonly burstingEnabledTime?: string;
  /** Performance tier of the disk (e.g, P4, S10) as described here: https://azure.microsoft.com/en-us/pricing/details/managed-disks/. Does not apply to Ultra disks. */
  tier?: string;
  /** Set to true to enable bursting beyond the provisioned performance target of the disk. Bursting is disabled by default. Does not apply to Ultra disks. */
  burstingEnabled?: boolean;
  /** Properties of the disk for which update is pending. */
  readonly propertyUpdatesInProgress?: PropertyUpdatesInProgressOutput;
  /** Indicates the OS on a disk supports hibernation. */
  supportsHibernation?: boolean;
  /** Contains the security related information for the resource. */
  securityProfile?: DiskSecurityProfileOutput;
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
export interface PurchasePlanAutoGeneratedOutput {
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
export interface SupportedCapabilitiesOutput {
  /** The disk controllers that an OS disk supports. If set it can be SCSI or SCSI, NVME or NVME, SCSI. */
  diskControllerTypes?: string;
  /** True if the image from which the OS disk is created supports accelerated networking. */
  acceleratedNetwork?: boolean;
  /** CPU architecture supported by an OS disk. */
  architecture?: "x64" | "Arm64";
}

/** Data used when creating a disk. */
export interface CreationDataOutput {
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
  imageReference?: ImageDiskReferenceOutput;
  /** Required if creating from a Gallery Image. The id/sharedGalleryImageId/communityGalleryImageId of the ImageDiskReference will be the ARM id of the shared galley image version from which to create a disk. */
  galleryImageReference?: ImageDiskReferenceOutput;
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
  /** Set this flag to true to get a boost on the performance target of the disk deployed, see here on the respective performance target. This flag can only be set on disk creation time and cannot be disabled after enabled. */
  performancePlus?: boolean;
}

/** The source image used for creating the disk. */
export interface ImageDiskReferenceOutput {
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
export interface EncryptionSettingsCollectionOutput {
  /** Set this flag to true and provide DiskEncryptionKey and optional KeyEncryptionKey to enable encryption. Set this flag to false and remove DiskEncryptionKey and KeyEncryptionKey to disable encryption. If EncryptionSettings is null in the request object, the existing settings remain unchanged. */
  enabled: boolean;
  /** A collection of encryption settings, one for each disk volume. */
  encryptionSettings?: Array<EncryptionSettingsElementOutput>;
  /** Describes what type of encryption is used for the disks. Once this field is set, it cannot be overwritten. '1.0' corresponds to Azure Disk Encryption with AAD app.'1.1' corresponds to Azure Disk Encryption. */
  encryptionSettingsVersion?: string;
}

/** Encryption settings for one disk volume. */
export interface EncryptionSettingsElementOutput {
  /** Key Vault Secret Url and vault id of the disk encryption key */
  diskEncryptionKey?: KeyVaultAndSecretReferenceOutput;
  /** Key Vault Key Url and vault id of the key encryption key. KeyEncryptionKey is optional and when provided is used to unwrap the disk encryption key. */
  keyEncryptionKey?: KeyVaultAndKeyReferenceOutput;
}

/** Key Vault Secret Url and vault id of the encryption key */
export interface KeyVaultAndSecretReferenceOutput {
  /** Resource id of the KeyVault containing the key or secret */
  sourceVault: SourceVaultOutput;
  /** Url pointing to a key or secret in KeyVault */
  secretUrl: string;
}

/** The vault id is an Azure Resource Manager Resource id in the form /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName} */
export interface SourceVaultOutput {
  /** Resource Id */
  id?: string;
}

/** Key Vault Key Url and vault id of KeK, KeK is optional and when provided is used to unwrap the encryptionKey */
export interface KeyVaultAndKeyReferenceOutput {
  /** Resource id of the KeyVault containing the key or secret */
  sourceVault: SourceVaultOutput;
  /** Url pointing to a key or secret in KeyVault */
  keyUrl: string;
}

/** Encryption at rest settings for disk or snapshot */
export interface EncryptionOutput {
  /** ResourceId of the disk encryption set to use for enabling encryption at rest. */
  diskEncryptionSetId?: string;
  /** The type of key used to encrypt the data of the disk. */
  type?:
    | "EncryptionAtRestWithPlatformKey"
    | "EncryptionAtRestWithCustomerKey"
    | "EncryptionAtRestWithPlatformAndCustomerKeys";
}

export interface ShareInfoElementOutput {
  /** A relative URI containing the ID of the VM that has the disk attached. */
  readonly vmUri?: string;
}

/** Properties of the disk for which update is pending. */
export interface PropertyUpdatesInProgressOutput {
  /** The target performance tier of the disk if a tier change operation is in progress. */
  targetTier?: string;
}

/** Contains the security related information for the resource. */
export interface DiskSecurityProfileOutput {
  /** Specifies the SecurityType of the VM. Applicable for OS disks only. */
  securityType?:
    | "TrustedLaunch"
    | "ConfidentialVM_VMGuestStateOnlyEncryptedWithPlatformKey"
    | "ConfidentialVM_DiskEncryptedWithPlatformKey"
    | "ConfidentialVM_DiskEncryptedWithCustomerKey";
  /** ResourceId of the disk encryption set associated to Confidential VM supported disk encrypted with customer managed key */
  secureVMDiskEncryptionSetId?: string;
}

/** The List Disks operation response. */
export interface DiskListOutput {
  /** A list of disks. */
  value: Array<DiskOutput>;
  /** The uri to fetch the next page of disks. Call ListNext() with this to fetch the next page of disks. */
  nextLink?: string;
}

/** A disk access SAS uri. */
export interface AccessUriOutput {
  /** A SAS uri for accessing a disk. */
  readonly accessSAS?: string;
  /** A SAS uri for accessing a VM guest state. */
  readonly securityDataAccessSAS?: string;
}

/** disk access resource. */
export interface DiskAccessOutput extends ResourceOutput {
  properties?: DiskAccessPropertiesOutput;
  /** The extended location where the disk access will be created. Extended location cannot be changed. */
  extendedLocation?: ExtendedLocationOutput;
}

export interface DiskAccessPropertiesOutput {
  /** A readonly collection of private endpoint connections created on the disk. Currently only one endpoint connection is supported. */
  readonly privateEndpointConnections?: Array<PrivateEndpointConnectionOutput>;
  /** The disk access resource provisioning state. */
  readonly provisioningState?: string;
  /** The time when the disk access was created. */
  readonly timeCreated?: string;
}

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnectionOutput {
  /** Resource properties. */
  properties?: PrivateEndpointConnectionPropertiesOutput;
  /** private endpoint connection Id */
  readonly id?: string;
  /** private endpoint connection name */
  readonly name?: string;
  /** private endpoint connection type */
  readonly type?: string;
}

/** Properties of the PrivateEndpointConnectProperties. */
export interface PrivateEndpointConnectionPropertiesOutput {
  /** The resource of private end point. */
  readonly privateEndpoint?: PrivateEndpointOutput;
  /** A collection of information about the state of the connection between DiskAccess and Virtual Network. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionStateOutput;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: "Succeeded" | "Creating" | "Deleting" | "Failed";
}

/** The Private Endpoint resource. */
export interface PrivateEndpointOutput {
  /** The ARM identifier for Private Endpoint */
  readonly id?: string;
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionStateOutput {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: "Pending" | "Approved" | "Rejected";
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

/** The List disk access operation response. */
export interface DiskAccessListOutput {
  /** A list of disk access resources. */
  value: Array<DiskAccessOutput>;
  /** The uri to fetch the next page of disk access resources. Call ListNext() with this to fetch the next page of disk access resources. */
  nextLink?: string;
}

/** A list of private link resources */
export interface PrivateLinkResourceListResultOutput {
  /** Array of private link resources */
  value?: Array<PrivateLinkResourceOutput>;
}

/** A private link resource */
export interface PrivateLinkResourceOutput {
  /** Resource properties. */
  properties?: PrivateLinkResourcePropertiesOutput;
  /** private link resource Id */
  readonly id?: string;
  /** private link resource name */
  readonly name?: string;
  /** private link resource type */
  readonly type?: string;
}

/** Properties of a private link resource. */
export interface PrivateLinkResourcePropertiesOutput {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: Array<string>;
  /** The private link resource DNS zone name. */
  requiredZoneNames?: Array<string>;
}

/** A list of private link resources */
export interface PrivateEndpointConnectionListResultOutput {
  /** Array of private endpoint connections */
  value?: Array<PrivateEndpointConnectionOutput>;
  /** The uri to fetch the next page of snapshots. Call ListNext() with this to fetch the next page of snapshots. */
  nextLink?: string;
}

/** disk encryption set resource. */
export interface DiskEncryptionSetOutput extends ResourceOutput {
  /** The managed identity for the disk encryption set. It should be given permission on the key vault before it can be used to encrypt disks. */
  identity?: EncryptionSetIdentityOutput;
  properties?: EncryptionSetPropertiesOutput;
}

/** The managed identity for the disk encryption set. It should be given permission on the key vault before it can be used to encrypt disks. */
export interface EncryptionSetIdentityOutput {
  /** The type of Managed Identity used by the DiskEncryptionSet. Only SystemAssigned is supported for new creations. Disk Encryption Sets can be updated with Identity type None during migration of subscription to a new Azure Active Directory tenant; it will cause the encrypted resources to lose access to the keys. */
  type?: "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";
  /** The object id of the Managed Identity Resource. This will be sent to the RP from ARM via the x-ms-identity-principal-id header in the PUT request if the resource has a systemAssigned(implicit) identity */
  readonly principalId?: string;
  /** The tenant id of the Managed Identity Resource. This will be sent to the RP from ARM via the x-ms-client-tenant-id header in the PUT request if the resource has a systemAssigned(implicit) identity */
  readonly tenantId?: string;
  /** The list of user identities associated with the disk encryption set. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserAssignedIdentitiesValueOutput>;
}

export interface EncryptionSetPropertiesOutput {
  /** The type of key used to encrypt the data of the disk. */
  encryptionType?:
    | "EncryptionAtRestWithCustomerKey"
    | "EncryptionAtRestWithPlatformAndCustomerKeys"
    | "ConfidentialVmEncryptedWithCustomerKey";
  /** The key vault key which is currently used by this disk encryption set. */
  activeKey?: KeyForDiskEncryptionSetOutput;
  /** A readonly collection of key vault keys previously used by this disk encryption set while a key rotation is in progress. It will be empty if there is no ongoing key rotation. */
  readonly previousKeys?: Array<KeyForDiskEncryptionSetOutput>;
  /** The disk encryption set provisioning state. */
  readonly provisioningState?: string;
  /** Set this flag to true to enable auto-updating of this disk encryption set to the latest key version. */
  rotationToLatestKeyVersionEnabled?: boolean;
  /** The time when the active key of this disk encryption set was updated. */
  readonly lastKeyRotationTimestamp?: string;
  /** The error that was encountered during auto-key rotation. If an error is present, then auto-key rotation will not be attempted until the error on this disk encryption set is fixed. */
  readonly autoKeyRotationError?: ApiErrorOutput;
  /** Multi-tenant application client id to access key vault in a different tenant. Setting the value to 'None' will clear the property. */
  federatedClientId?: string;
}

/** Key Vault Key Url to be used for server side encryption of Managed Disks and Snapshots */
export interface KeyForDiskEncryptionSetOutput {
  /** Resource id of the KeyVault containing the key or secret. This property is optional and cannot be used if the KeyVault subscription is not the same as the Disk Encryption Set subscription. */
  sourceVault?: SourceVaultOutput;
  /** Fully versioned Key Url pointing to a key in KeyVault. Version segment of the Url is required regardless of rotationToLatestKeyVersionEnabled value. */
  keyUrl: string;
}

/** The List disk encryption set operation response. */
export interface DiskEncryptionSetListOutput {
  /** A list of disk encryption sets. */
  value: Array<DiskEncryptionSetOutput>;
  /** The uri to fetch the next page of disk encryption sets. Call ListNext() with this to fetch the next page of disk encryption sets. */
  nextLink?: string;
}

/** The List resources which are encrypted with the disk encryption set. */
export interface ResourceUriListOutput {
  /** A list of IDs or Owner IDs of resources which are encrypted with the disk encryption set. */
  value: Array<string>;
  /** The uri to fetch the next page of encrypted resources. Call ListNext() with this to fetch the next page of encrypted resources. */
  nextLink?: string;
}

/** Properties of disk restore point */
export interface DiskRestorePointOutput extends ProxyOnlyResourceOutput {
  /** Properties of an incremental disk restore point */
  properties?: DiskRestorePointPropertiesOutput;
}

/** Properties of an incremental disk restore point */
export interface DiskRestorePointPropertiesOutput {
  /** The timestamp of restorePoint creation */
  readonly timeCreated?: string;
  /** arm id of source disk or source disk restore point. */
  readonly sourceResourceId?: string;
  /** The Operating System type. */
  readonly osType?: "Windows" | "Linux";
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: "V1" | "V2";
  /** Purchase plan information for the the image from which the OS disk was created. */
  purchasePlan?: PurchasePlanAutoGeneratedOutput;
  /** List of supported capabilities for the image from which the OS disk was created. */
  supportedCapabilities?: SupportedCapabilitiesOutput;
  /** id of the backing snapshot's MIS family */
  readonly familyId?: string;
  /** unique incarnation id of the source disk */
  readonly sourceUniqueId?: string;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  readonly encryption?: EncryptionOutput;
  /** Indicates the OS on a disk supports hibernation. */
  supportsHibernation?: boolean;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: "AllowAll" | "AllowPrivate" | "DenyAll";
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: "Enabled" | "Disabled";
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Percentage complete for the background copy of disk restore point when source resource is from a different region. */
  completionPercent?: number;
  /** Replication state of disk restore point when source resource is from a different region. */
  readonly replicationState?: string;
  /** Location of source disk or source disk restore point when source resource is from a different region. */
  readonly sourceResourceLocation?: string;
  /** Contains the security related information for the resource. */
  securityProfile?: DiskSecurityProfileOutput;
}

/** The ProxyOnly Resource model definition. */
export interface ProxyOnlyResourceOutput {
  /** Resource Id */
  readonly id?: string;
  /** Resource name */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
}

/** The List Disk Restore Points operation response. */
export interface DiskRestorePointListOutput {
  /** A list of disk restore points. */
  value: Array<DiskRestorePointOutput>;
  /** The uri to fetch the next page of disk restore points. Call ListNext() with this to fetch the next page of disk restore points. */
  nextLink?: string;
}

/** Snapshot resource. */
export interface SnapshotOutput extends ResourceOutput {
  /** Unused. Always Null. */
  readonly managedBy?: string;
  /** The snapshots sku name. Can be Standard_LRS, Premium_LRS, or Standard_ZRS. This is an optional parameter for incremental snapshot and the default behavior is the SKU will be set to the same sku as the previous snapshot */
  sku?: SnapshotSkuOutput;
  /** The extended location where the snapshot will be created. Extended location cannot be changed. */
  extendedLocation?: ExtendedLocationOutput;
  /** Snapshot resource properties. */
  properties?: SnapshotPropertiesOutput;
}

/** The snapshots sku name. Can be Standard_LRS, Premium_LRS, or Standard_ZRS. This is an optional parameter for incremental snapshot and the default behavior is the SKU will be set to the same sku as the previous snapshot */
export interface SnapshotSkuOutput {
  /** The sku name. */
  name?: "Standard_LRS" | "Premium_LRS" | "Standard_ZRS";
  /** The sku tier. */
  readonly tier?: string;
}

/** Snapshot resource properties. */
export interface SnapshotPropertiesOutput {
  /** The time when the snapshot was created. */
  readonly timeCreated?: string;
  /** The Operating System type. */
  osType?: "Windows" | "Linux";
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: "V1" | "V2";
  /** Purchase plan information for the image from which the source disk for the snapshot was originally created. */
  purchasePlan?: PurchasePlanAutoGeneratedOutput;
  /** List of supported capabilities for the image from which the source disk from the snapshot was originally created. */
  supportedCapabilities?: SupportedCapabilitiesOutput;
  /** Disk source information. CreationData information cannot be changed after the disk has been created. */
  creationData: CreationDataOutput;
  /** If creationData.createOption is Empty, this field is mandatory and it indicates the size of the disk to create. If this field is present for updates or creation with other options, it indicates a resize. Resizes are only allowed if the disk is not attached to a running VM, and can only increase the disk's size. */
  diskSizeGB?: number;
  /** The size of the disk in bytes. This field is read only. */
  readonly diskSizeBytes?: number;
  /** The state of the snapshot. */
  readonly diskState?:
    | "Unattached"
    | "Attached"
    | "Reserved"
    | "Frozen"
    | "ActiveSAS"
    | "ActiveSASFrozen"
    | "ReadyToUpload"
    | "ActiveUpload";
  /** Unique Guid identifying the resource. */
  readonly uniqueId?: string;
  /** Encryption settings collection used be Azure Disk Encryption, can contain multiple encryption settings per disk or snapshot. */
  encryptionSettingsCollection?: EncryptionSettingsCollectionOutput;
  /** The disk provisioning state. */
  readonly provisioningState?: string;
  /** Whether a snapshot is incremental. Incremental snapshots on the same disk occupy less space than full snapshots and can be diffed. */
  incremental?: boolean;
  /** Incremental snapshots for a disk share an incremental snapshot family id. The Get Page Range Diff API can only be called on incremental snapshots with the same family id. */
  readonly incrementalSnapshotFamilyId?: string;
  /** Encryption property can be used to encrypt data at rest with customer managed keys or platform managed keys. */
  encryption?: EncryptionOutput;
  /** Policy for accessing the disk via network. */
  networkAccessPolicy?: "AllowAll" | "AllowPrivate" | "DenyAll";
  /** ARM id of the DiskAccess resource for using private endpoints on disks. */
  diskAccessId?: string;
  /** Contains the security related information for the resource. */
  securityProfile?: DiskSecurityProfileOutput;
  /** Indicates the OS on a snapshot supports hibernation. */
  supportsHibernation?: boolean;
  /** Policy for controlling export on the disk. */
  publicNetworkAccess?: "Enabled" | "Disabled";
  /** Percentage complete for the background copy when a resource is created via the CopyStart operation. */
  completionPercent?: number;
  /** Indicates the error details if the background copy of a resource created via the CopyStart operation fails. */
  copyCompletionError?: CopyCompletionErrorOutput;
  /** Additional authentication requirements when exporting or uploading to a disk or snapshot. */
  dataAccessAuthMode?: "AzureActiveDirectory" | "None";
}

/** Indicates the error details if the background copy of a resource created via the CopyStart operation fails. */
export interface CopyCompletionErrorOutput {
  /** Indicates the error code if the background copy of a resource created via the CopyStart operation fails. */
  errorCode: "CopySourceNotFound";
  /** Indicates the error message if the background copy of a resource created via the CopyStart operation fails. */
  errorMessage: string;
}

/** The List Snapshots operation response. */
export interface SnapshotListOutput {
  /** A list of snapshots. */
  value: Array<SnapshotOutput>;
  /** The uri to fetch the next page of snapshots. Call ListNext() with this to fetch the next page of snapshots. */
  nextLink?: string;
}

/** The List Resource Skus operation response. */
export interface ResourceSkusResultOutput {
  /** The list of skus available for the subscription. */
  value: Array<ResourceSkuOutput>;
  /** The URI to fetch the next page of Resource Skus. Call ListNext() with this URI to fetch the next page of Resource Skus */
  nextLink?: string;
}

/** Describes an available Compute SKU. */
export interface ResourceSkuOutput {
  /** The type of resource the SKU applies to. */
  readonly resourceType?: string;
  /** The name of SKU. */
  readonly name?: string;
  /** Specifies the tier of virtual machines in a scale set.<br /><br /> Possible Values:<br /><br /> **Standard**<br /><br /> **Basic** */
  readonly tier?: string;
  /** The Size of the SKU. */
  readonly size?: string;
  /** The Family of this particular SKU. */
  readonly family?: string;
  /** The Kind of resources that are supported in this SKU. */
  readonly kind?: string;
  /** Specifies the number of virtual machines in the scale set. */
  readonly capacity?: ResourceSkuCapacityOutput;
  /** The set of locations that the SKU is available. */
  readonly locations?: Array<string>;
  /** A list of locations and availability zones in those locations where the SKU is available. */
  readonly locationInfo?: Array<ResourceSkuLocationInfoOutput>;
  /** The api versions that support this SKU. */
  readonly apiVersions?: Array<string>;
  /** Metadata for retrieving price info. */
  readonly costs?: Array<ResourceSkuCostsOutput>;
  /** A name value pair to describe the capability. */
  readonly capabilities?: Array<ResourceSkuCapabilitiesOutput>;
  /** The restrictions because of which SKU cannot be used. This is empty if there are no restrictions. */
  readonly restrictions?: Array<ResourceSkuRestrictionsOutput>;
}

/** Describes scaling information of a SKU. */
export interface ResourceSkuCapacityOutput {
  /** The minimum capacity. */
  readonly minimum?: number;
  /** The maximum capacity that can be set. */
  readonly maximum?: number;
  /** The default capacity. */
  readonly default?: number;
  /** The scale type applicable to the sku. */
  readonly scaleType?: "Automatic" | "Manual" | "None";
}

/** Describes an available Compute SKU Location Information. */
export interface ResourceSkuLocationInfoOutput {
  /** Location of the SKU */
  readonly location?: string;
  /** List of availability zones where the SKU is supported. */
  readonly zones?: Array<string>;
  /** Details of capabilities available to a SKU in specific zones. */
  readonly zoneDetails?: Array<ResourceSkuZoneDetailsOutput>;
  /** The names of extended locations. */
  readonly extendedLocations?: Array<string>;
  /** The type of the extended location. */
  readonly type?: "EdgeZone";
}

/** Describes The zonal capabilities of a SKU. */
export interface ResourceSkuZoneDetailsOutput {
  /** The set of zones that the SKU is available in with the specified capabilities. */
  readonly name?: Array<string>;
  /** A list of capabilities that are available for the SKU in the specified list of zones. */
  readonly capabilities?: Array<ResourceSkuCapabilitiesOutput>;
}

/** Describes The SKU capabilities object. */
export interface ResourceSkuCapabilitiesOutput {
  /** An invariant to describe the feature. */
  readonly name?: string;
  /** An invariant if the feature is measured by quantity. */
  readonly value?: string;
}

/** Describes metadata for retrieving price info. */
export interface ResourceSkuCostsOutput {
  /** Used for querying price from commerce. */
  readonly meterID?: string;
  /** The multiplier is needed to extend the base metered cost. */
  readonly quantity?: number;
  /** An invariant to show the extended unit. */
  readonly extendedUnit?: string;
}

/** Describes scaling information of a SKU. */
export interface ResourceSkuRestrictionsOutput {
  /** The type of restrictions. */
  readonly type?: "Location" | "Zone";
  /** The value of restrictions. If the restriction type is set to location. This would be different locations where the SKU is restricted. */
  readonly values?: Array<string>;
  /** The information about the restriction where the SKU cannot be used. */
  readonly restrictionInfo?: ResourceSkuRestrictionInfoOutput;
  /** The reason for restriction. */
  readonly reasonCode?: "QuotaId" | "NotAvailableForSubscription";
}

/** Describes an available Compute SKU Restriction Information. */
export interface ResourceSkuRestrictionInfoOutput {
  /** Locations where the SKU is restricted */
  readonly locations?: Array<string>;
  /** List of availability zones where the SKU is restricted. */
  readonly zones?: Array<string>;
}

/** Specifies information about the Shared Image Gallery that you want to create or update. */
export interface GalleryOutput extends ResourceOutput {
  /** Describes the properties of a Shared Image Gallery. */
  properties?: GalleryPropertiesOutput;
}

/** Describes the properties of a Shared Image Gallery. */
export interface GalleryPropertiesOutput {
  /** The description of this Shared Image Gallery resource. This property is updatable. */
  description?: string;
  /** Describes the gallery unique name. */
  identifier?: GalleryIdentifierOutput;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?:
    | "Creating"
    | "Updating"
    | "Failed"
    | "Succeeded"
    | "Deleting"
    | "Migrating";
  /** Profile for gallery sharing to subscription or tenant */
  sharingProfile?: SharingProfileOutput;
  /** Contains information about the soft deletion policy of the gallery. */
  softDeletePolicy?: SoftDeletePolicyOutput;
  /** Sharing status of current gallery. */
  readonly sharingStatus?: SharingStatusOutput;
}

/** Describes the gallery unique name. */
export interface GalleryIdentifierOutput {
  /** The unique name of the Shared Image Gallery. This name is generated automatically by Azure. */
  readonly uniqueName?: string;
}

/** Profile for gallery sharing to subscription or tenant */
export interface SharingProfileOutput {
  /** This property allows you to specify the permission of sharing gallery. <br><br> Possible values are: <br><br> **Private** <br><br> **Groups** <br><br> **Community** */
  permissions?: "Private" | "Groups" | "Community";
  /** A list of sharing profile groups. */
  readonly groups?: Array<SharingProfileGroupOutput>;
  /** Information of community gallery if current gallery is shared to community. */
  communityGalleryInfo?: CommunityGalleryInfoOutput;
}

/** Group of the gallery sharing profile */
export interface SharingProfileGroupOutput {
  /** This property allows you to specify the type of sharing group. <br><br> Possible values are: <br><br> **Subscriptions** <br><br> **AADTenants** */
  type?: "Subscriptions" | "AADTenants";
  /** A list of subscription/tenant ids the gallery is aimed to be shared to. */
  ids?: Array<string>;
}

/** Information of community gallery if current gallery is shared to community */
export interface CommunityGalleryInfoOutput {
  /** The link to the publisher website. Visible to all users. */
  publisherUri?: string;
  /** Community gallery publisher support email. The email address of the publisher. Visible to all users. */
  publisherContact?: string;
  /** End-user license agreement for community gallery image. */
  eula?: string;
  /** The prefix of the gallery name that will be displayed publicly. Visible to all users. */
  publicNamePrefix?: string;
  /** Contains info about whether community gallery sharing is enabled. */
  readonly communityGalleryEnabled?: boolean;
  /** Community gallery public name list. */
  readonly publicNames?: Array<string>;
}

/** Contains information about the soft deletion policy of the gallery. */
export interface SoftDeletePolicyOutput {
  /** Enables soft-deletion for resources in this gallery, allowing them to be recovered within retention time. */
  isSoftDeleteEnabled?: boolean;
}

/** Sharing status of current gallery. */
export interface SharingStatusOutput {
  /** Aggregated sharing state of current gallery. */
  readonly aggregatedState?: "Succeeded" | "InProgress" | "Failed" | "Unknown";
  /** Summary of all regional sharing status. */
  summary?: Array<RegionalSharingStatusOutput>;
}

/** Gallery regional sharing status */
export interface RegionalSharingStatusOutput {
  /** Region name */
  region?: string;
  /** Gallery sharing state in current region */
  readonly state?: "Succeeded" | "InProgress" | "Failed" | "Unknown";
  /** Details of gallery regional sharing failure. */
  details?: string;
}

/** Specifies information about the gallery image definition that you want to create or update. */
export interface GalleryImageOutput extends ResourceOutput {
  /** Describes the properties of a gallery image definition. */
  properties?: GalleryImagePropertiesOutput;
}

/** Describes the properties of a gallery image definition. */
export interface GalleryImagePropertiesOutput {
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
  endOfLifeDate?: string;
  /** This is the gallery image definition identifier. */
  identifier: GalleryImageIdentifierOutput;
  /** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
  recommended?: RecommendedMachineConfigurationOutput;
  /** Describes the disallowed disk types. */
  disallowed?: DisallowedOutput;
  /** Describes the gallery image definition purchase plan. This is used by marketplace images. */
  purchasePlan?: ImagePurchasePlanOutput;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?:
    | "Creating"
    | "Updating"
    | "Failed"
    | "Succeeded"
    | "Deleting"
    | "Migrating";
  /** A list of gallery image features. */
  features?: Array<GalleryImageFeatureOutput>;
  /** The architecture of the image. Applicable to OS disks only. */
  architecture?: "x64" | "Arm64";
}

/** This is the gallery image definition identifier. */
export interface GalleryImageIdentifierOutput {
  /** The name of the gallery image definition publisher. */
  publisher: string;
  /** The name of the gallery image definition offer. */
  offer: string;
  /** The name of the gallery image definition SKU. */
  sku: string;
}

/** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
export interface RecommendedMachineConfigurationOutput {
  /** Describes the resource range. */
  vCPUs?: ResourceRangeOutput;
  /** Describes the resource range. */
  memory?: ResourceRangeOutput;
}

/** Describes the resource range. */
export interface ResourceRangeOutput {
  /** The minimum number of the resource. */
  min?: number;
  /** The maximum number of the resource. */
  max?: number;
}

/** Describes the disallowed disk types. */
export interface DisallowedOutput {
  /** A list of disk types. */
  diskTypes?: Array<string>;
}

/** Describes the gallery image definition purchase plan. This is used by marketplace images. */
export interface ImagePurchasePlanOutput {
  /** The plan ID. */
  name?: string;
  /** The publisher ID. */
  publisher?: string;
  /** The product ID. */
  product?: string;
}

/** A feature for gallery image. */
export interface GalleryImageFeatureOutput {
  /** The name of the gallery image feature. */
  name?: string;
  /** The value of the gallery image feature. */
  value?: string;
}

/** Specifies information about the gallery image version that you want to create or update. */
export interface GalleryImageVersionOutput extends ResourceOutput {
  /** Describes the properties of a gallery image version. */
  properties?: GalleryImageVersionPropertiesOutput;
}

/** Describes the properties of a gallery image version. */
export interface GalleryImageVersionPropertiesOutput {
  /** The publishing profile of a gallery image Version. */
  publishingProfile?: GalleryImageVersionPublishingProfileOutput;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?:
    | "Creating"
    | "Updating"
    | "Failed"
    | "Succeeded"
    | "Deleting"
    | "Migrating";
  /** This is the storage profile of a Gallery Image Version. */
  storageProfile: GalleryImageVersionStorageProfileOutput;
  /** This is the replication status of the gallery image version. */
  readonly replicationStatus?: ReplicationStatusOutput;
}

/** The publishing profile of a gallery image Version. */
export interface GalleryImageVersionPublishingProfileOutput extends GalleryArtifactPublishingProfileBaseOutput {}

/** Describes the basic gallery artifact publishing profile. */
export interface GalleryArtifactPublishingProfileBaseOutput {
  /** The target regions where the Image Version is going to be replicated to. This property is updatable. */
  targetRegions?: Array<TargetRegionOutput>;
  /** The number of replicas of the Image Version to be created per region. This property would take effect for a region when regionalReplicaCount is not specified. This property is updatable. */
  replicaCount?: number;
  /** If set to true, Virtual Machines deployed from the latest version of the Image Definition won't use this Image Version. */
  excludeFromLatest?: boolean;
  /** The timestamp for when the gallery image version is published. */
  readonly publishedDate?: string;
  /** The end of life date of the gallery image version. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: string;
  /** Specifies the storage account type to be used to store the image. This property is not updatable. */
  storageAccountType?: "Standard_LRS" | "Standard_ZRS" | "Premium_LRS";
  /** Optional parameter which specifies the mode to be used for replication. This property is not updatable. */
  replicationMode?: "Full" | "Shallow";
  /** The target extended locations where the Image Version is going to be replicated to. This property is updatable. */
  targetExtendedLocations?: Array<GalleryTargetExtendedLocationOutput>;
}

/** Describes the target region information. */
export interface TargetRegionOutput {
  /** The name of the region. */
  name: string;
  /** The number of replicas of the Image Version to be created per region. This property is updatable. */
  regionalReplicaCount?: number;
  /** Specifies the storage account type to be used to store the image. This property is not updatable. */
  storageAccountType?: "Standard_LRS" | "Standard_ZRS" | "Premium_LRS";
  /** Optional. Allows users to provide customer managed keys for encrypting the OS and data disks in the gallery artifact. */
  encryption?: EncryptionImagesOutput;
}

/** Optional. Allows users to provide customer managed keys for encrypting the OS and data disks in the gallery artifact. */
export interface EncryptionImagesOutput {
  /** Contains encryption settings for an OS disk image. */
  osDiskImage?: OSDiskImageEncryptionOutput;
  /** A list of encryption specifications for data disk images. */
  dataDiskImages?: Array<DataDiskImageEncryptionOutput>;
}

/** Contains encryption settings for an OS disk image. */
export interface OSDiskImageEncryptionOutput extends DiskImageEncryptionOutput {
  /** This property specifies the security profile of an OS disk image. */
  securityProfile?: OSDiskImageSecurityProfileOutput;
}

/** Contains security profile for an OS disk image. */
export interface OSDiskImageSecurityProfileOutput {
  /** confidential VM encryption types */
  confidentialVMEncryptionType?:
    | "EncryptedVMGuestStateOnlyWithPmk"
    | "EncryptedWithPmk"
    | "EncryptedWithCmk";
  /** secure VM disk encryption set id */
  secureVMDiskEncryptionSetId?: string;
}

/** This is the disk image encryption base class. */
export interface DiskImageEncryptionOutput {
  /** A relative URI containing the resource ID of the disk encryption set. */
  diskEncryptionSetId?: string;
}

/** Contains encryption settings for a data disk image. */
export interface DataDiskImageEncryptionOutput extends DiskImageEncryptionOutput {
  /** This property specifies the logical unit number of the data disk. This value is used to identify data disks within the Virtual Machine and therefore must be unique for each data disk attached to the Virtual Machine. */
  lun: number;
}

export interface GalleryTargetExtendedLocationOutput {
  /** The name of the region. */
  name?: string;
  /** The name of the extended location. */
  extendedLocation?: GalleryExtendedLocationOutput;
  /** The number of replicas of the Image Version to be created per extended location. This property is updatable. */
  extendedLocationReplicaCount?: number;
  /** Specifies the storage account type to be used to store the image. This property is not updatable. */
  storageAccountType?: "Standard_LRS" | "Standard_ZRS" | "Premium_LRS";
  /** Optional. Allows users to provide customer managed keys for encrypting the OS and data disks in the gallery artifact. */
  encryption?: EncryptionImagesOutput;
}

/** The name of the extended location. */
export interface GalleryExtendedLocationOutput {
  name?: string;
  /** It is type of the extended location. */
  type?: "EdgeZone" | "Unknown";
}

/** This is the storage profile of a Gallery Image Version. */
export interface GalleryImageVersionStorageProfileOutput {
  /** The gallery artifact version source. */
  source?: GalleryArtifactVersionSourceOutput;
  /** This is the OS disk image. */
  osDiskImage?: GalleryOSDiskImageOutput;
  /** A list of data disk images. */
  dataDiskImages?: Array<GalleryDataDiskImageOutput>;
}

/** The gallery artifact version source. */
export interface GalleryArtifactVersionSourceOutput {
  /** The id of the gallery artifact version source. Can specify a disk uri, snapshot uri, user image or storage account resource. */
  id?: string;
  /** The uri of the gallery artifact version source. Currently used to specify vhd/blob source. */
  uri?: string;
}

/** This is the OS disk image. */
export interface GalleryOSDiskImageOutput extends GalleryDiskImageOutput {}

/** This is the disk image base class. */
export interface GalleryDiskImageOutput {
  /** This property indicates the size of the VHD to be created. */
  readonly sizeInGB?: number;
  /** The host caching of the disk. Valid values are 'None', 'ReadOnly', and 'ReadWrite' */
  hostCaching?: "None" | "ReadOnly" | "ReadWrite";
  /** The gallery artifact version source. */
  source?: GalleryArtifactVersionSourceOutput;
}

/** This is the data disk image. */
export interface GalleryDataDiskImageOutput extends GalleryDiskImageOutput {
  /** This property specifies the logical unit number of the data disk. This value is used to identify data disks within the Virtual Machine and therefore must be unique for each data disk attached to the Virtual Machine. */
  lun: number;
}

/** This is the replication status of the gallery image version. */
export interface ReplicationStatusOutput {
  /** This is the aggregated replication status based on all the regional replication status flags. */
  readonly aggregatedState?: "Unknown" | "InProgress" | "Completed" | "Failed";
  /** This is a summary of replication status for each region. */
  readonly summary?: Array<RegionalReplicationStatusOutput>;
}

/** This is the regional replication status. */
export interface RegionalReplicationStatusOutput {
  /** The region to which the gallery image version is being replicated to. */
  readonly region?: string;
  /** This is the regional replication state. */
  readonly state?: "Unknown" | "Replicating" | "Completed" | "Failed";
  /** The details of the replication status. */
  readonly details?: string;
  /** It indicates progress of the replication job. */
  readonly progress?: number;
}

/** Specifies information about the gallery Application Definition that you want to create or update. */
export interface GalleryApplicationOutput extends ResourceOutput {
  /** Describes the properties of a gallery Application Definition. */
  properties?: GalleryApplicationPropertiesOutput;
}

/** Describes the properties of a gallery Application Definition. */
export interface GalleryApplicationPropertiesOutput {
  /** The description of this gallery Application Definition resource. This property is updatable. */
  description?: string;
  /** The Eula agreement for the gallery Application Definition. */
  eula?: string;
  /** The privacy statement uri. */
  privacyStatementUri?: string;
  /** The release note uri. */
  releaseNoteUri?: string;
  /** The end of life date of the gallery Application Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: string;
  /** This property allows you to specify the supported type of the OS that application is built for. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  supportedOSType: "Windows" | "Linux";
}

/** Specifies information about the gallery Application Version that you want to create or update. */
export interface GalleryApplicationVersionOutput extends ResourceOutput {
  /** Describes the properties of a gallery image version. */
  properties?: GalleryApplicationVersionPropertiesOutput;
}

/** Describes the properties of a gallery image version. */
export interface GalleryApplicationVersionPropertiesOutput {
  /** The publishing profile of a gallery image version. */
  publishingProfile: GalleryApplicationVersionPublishingProfileOutput;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?:
    | "Creating"
    | "Updating"
    | "Failed"
    | "Succeeded"
    | "Deleting"
    | "Migrating";
  /** This is the replication status of the gallery image version. */
  readonly replicationStatus?: ReplicationStatusOutput;
}

/** The publishing profile of a gallery image version. */
export interface GalleryApplicationVersionPublishingProfileOutput extends GalleryArtifactPublishingProfileBaseOutput {
  /** The source image from which the Image Version is going to be created. */
  source: UserArtifactSourceOutput;
  manageActions?: UserArtifactManageOutput;
  /** Additional settings for the VM app that contains the target package and config file name when it is deployed to target VM or VM scale set. */
  settings?: UserArtifactSettingsOutput;
  /** Optional. Additional settings to pass to the vm-application-manager extension. For advanced use only. */
  advancedSettings?: Record<string, string>;
  /** Optional. Whether or not this application reports health. */
  enableHealthCheck?: boolean;
}

/** The source image from which the Image Version is going to be created. */
export interface UserArtifactSourceOutput {
  /** Required. The mediaLink of the artifact, must be a readable storage page blob. */
  mediaLink: string;
  /** Optional. The defaultConfigurationLink of the artifact, must be a readable storage page blob. */
  defaultConfigurationLink?: string;
}

export interface UserArtifactManageOutput {
  /** Required. The path and arguments to install the gallery application. This is limited to 4096 characters. */
  install: string;
  /** Required. The path and arguments to remove the gallery application. This is limited to 4096 characters. */
  remove: string;
  /** Optional. The path and arguments to update the gallery application. If not present, then update operation will invoke remove command on the previous version and install command on the current version of the gallery application. This is limited to 4096 characters. */
  update?: string;
}

/** Additional settings for the VM app that contains the target package and config file name when it is deployed to target VM or VM scale set. */
export interface UserArtifactSettingsOutput {
  /** Optional. The name to assign the downloaded package file on the VM. This is limited to 4096 characters. If not specified, the package file will be named the same as the Gallery Application name. */
  packageFileName?: string;
  /** Optional. The name to assign the downloaded config file on the VM. This is limited to 4096 characters. If not specified, the config file will be named the Gallery Application name appended with "_config". */
  configFileName?: string;
}

/** The List Galleries operation response. */
export interface GalleryListOutput {
  /** A list of galleries. */
  value: Array<GalleryOutput>;
  /** The uri to fetch the next page of galleries. Call ListNext() with this to fetch the next page of galleries. */
  nextLink?: string;
}

/** The List Gallery Images operation response. */
export interface GalleryImageListOutput {
  /** A list of Shared Image Gallery images. */
  value: Array<GalleryImageOutput>;
  /** The uri to fetch the next page of Image Definitions in the Shared Image Gallery. Call ListNext() with this to fetch the next page of gallery image definitions. */
  nextLink?: string;
}

/** The List Gallery Image version operation response. */
export interface GalleryImageVersionListOutput {
  /** A list of gallery image versions. */
  value: Array<GalleryImageVersionOutput>;
  /** The uri to fetch the next page of gallery image versions. Call ListNext() with this to fetch the next page of gallery image versions. */
  nextLink?: string;
}

/** The List Gallery Applications operation response. */
export interface GalleryApplicationListOutput {
  /** A list of Gallery Applications. */
  value: Array<GalleryApplicationOutput>;
  /** The uri to fetch the next page of Application Definitions in the Application Gallery. Call ListNext() with this to fetch the next page of gallery Application Definitions. */
  nextLink?: string;
}

/** The List Gallery Application version operation response. */
export interface GalleryApplicationVersionListOutput {
  /** A list of gallery Application Versions. */
  value: Array<GalleryApplicationVersionOutput>;
  /** The uri to fetch the next page of gallery Application Versions. Call ListNext() with this to fetch the next page of gallery Application Versions. */
  nextLink?: string;
}

/** Specifies information about the gallery sharing profile update. */
export interface SharingUpdateOutput {
  /** This property allows you to specify the operation type of gallery sharing update. <br><br> Possible values are: <br><br> **Add** <br><br> **Remove** <br><br> **Reset** */
  operationType: "Add" | "Remove" | "Reset" | "EnableCommunity";
  /** A list of sharing profile groups. */
  groups?: Array<SharingProfileGroupOutput>;
}

/** The List Shared Galleries operation response. */
export interface SharedGalleryListOutput {
  /** A list of shared galleries. */
  value: Array<SharedGalleryOutput>;
  /** The uri to fetch the next page of shared galleries. Call ListNext() with this to fetch the next page of shared galleries. */
  nextLink?: string;
}

/** Specifies information about the Shared Gallery that you want to create or update. */
export interface SharedGalleryOutput extends PirSharedGalleryResourceOutput {}

/** Base information about the shared gallery resource in pir. */
export interface PirSharedGalleryResourceOutput extends PirResourceOutput {
  /** The identifier information of shared gallery. */
  identifier?: SharedGalleryIdentifierOutput;
}

/** The identifier information of shared gallery. */
export interface SharedGalleryIdentifierOutput {
  /** The unique id of this shared gallery. */
  uniqueId?: string;
}

/** The Resource model definition. */
export interface PirResourceOutput {
  /** Resource name */
  readonly name?: string;
  /** Resource location */
  readonly location?: string;
}

/** The List Shared Gallery Images operation response. */
export interface SharedGalleryImageListOutput {
  /** A list of shared gallery images. */
  value: Array<SharedGalleryImageOutput>;
  /** The uri to fetch the next page of shared gallery images. Call ListNext() with this to fetch the next page of shared gallery images. */
  nextLink?: string;
}

/** Specifies information about the gallery image definition that you want to create or update. */
export interface SharedGalleryImageOutput extends PirSharedGalleryResourceOutput {
  /** Describes the properties of a gallery image definition. */
  properties?: SharedGalleryImagePropertiesOutput;
}

/** Describes the properties of a gallery image definition. */
export interface SharedGalleryImagePropertiesOutput {
  /** This property allows you to specify the type of the OS that is included in the disk when creating a VM from a managed image. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  osType: "Windows" | "Linux";
  /** This property allows the user to specify whether the virtual machines created under this image are 'Generalized' or 'Specialized'. */
  osState: "Generalized" | "Specialized";
  /** The end of life date of the gallery image definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: string;
  /** This is the gallery image definition identifier. */
  identifier: GalleryImageIdentifierOutput;
  /** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
  recommended?: RecommendedMachineConfigurationOutput;
  /** Describes the disallowed disk types. */
  disallowed?: DisallowedOutput;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: "V1" | "V2";
  /** A list of gallery image features. */
  features?: Array<GalleryImageFeatureOutput>;
  /** Describes the gallery image definition purchase plan. This is used by marketplace images. */
  purchasePlan?: ImagePurchasePlanOutput;
  /** The architecture of the image. Applicable to OS disks only. */
  architecture?: "x64" | "Arm64";
}

/** The List Shared Gallery Image versions operation response. */
export interface SharedGalleryImageVersionListOutput {
  /** A list of shared gallery images versions. */
  value: Array<SharedGalleryImageVersionOutput>;
  /** The uri to fetch the next page of shared gallery image versions. Call ListNext() with this to fetch the next page of shared gallery image versions. */
  nextLink?: string;
}

/** Specifies information about the gallery image version that you want to create or update. */
export interface SharedGalleryImageVersionOutput extends PirSharedGalleryResourceOutput {
  /** Describes the properties of a gallery image version. */
  properties?: SharedGalleryImageVersionPropertiesOutput;
}

/** Describes the properties of a gallery image version. */
export interface SharedGalleryImageVersionPropertiesOutput {
  /** The published date of the gallery image version Definition. This property can be used for decommissioning purposes. This property is updatable. */
  publishedDate?: string;
  /** The end of life date of the gallery image version Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: string;
  /** If set to true, Virtual Machines deployed from the latest version of the Image Definition won't use this Image Version. */
  excludeFromLatest?: boolean;
  /** Describes the storage profile of the image version. */
  storageProfile?: SharedGalleryImageVersionStorageProfileOutput;
}

/** This is the storage profile of a Gallery Image Version. */
export interface SharedGalleryImageVersionStorageProfileOutput {
  /** This is the OS disk image. */
  osDiskImage?: SharedGalleryOSDiskImageOutput;
  /** A list of data disk images. */
  dataDiskImages?: Array<SharedGalleryDataDiskImageOutput>;
}

/** This is the OS disk image. */
export interface SharedGalleryOSDiskImageOutput extends SharedGalleryDiskImageOutput {}

/** This is the disk image base class. */
export interface SharedGalleryDiskImageOutput {
  /** This property indicates the size of the VHD to be created. */
  readonly diskSizeGB?: number;
  /** The host caching of the disk. Valid values are 'None', 'ReadOnly', and 'ReadWrite' */
  hostCaching?: "None" | "ReadOnly" | "ReadWrite";
}

/** This is the data disk image. */
export interface SharedGalleryDataDiskImageOutput extends SharedGalleryDiskImageOutput {
  /** This property specifies the logical unit number of the data disk. This value is used to identify data disks within the Virtual Machine and therefore must be unique for each data disk attached to the Virtual Machine. */
  lun: number;
}

/** Specifies information about the Community Gallery that you want to create or update. */
export interface CommunityGalleryOutput extends PirCommunityGalleryResourceOutput {}

/** Base information about the community gallery resource in pir. */
export interface PirCommunityGalleryResourceOutput {
  /** Resource name */
  readonly name?: string;
  /** Resource location */
  readonly location?: string;
  /** Resource type */
  readonly type?: string;
  /** The identifier information of community gallery. */
  identifier?: CommunityGalleryIdentifierOutput;
}

/** The identifier information of community gallery. */
export interface CommunityGalleryIdentifierOutput {
  /** The unique id of this community gallery. */
  uniqueId?: string;
}

/** Specifies information about the gallery image definition that you want to create or update. */
export interface CommunityGalleryImageOutput extends PirCommunityGalleryResourceOutput {
  /** Describes the properties of a gallery image definition. */
  properties?: CommunityGalleryImagePropertiesOutput;
}

/** Describes the properties of a gallery image definition. */
export interface CommunityGalleryImagePropertiesOutput {
  /** This property allows you to specify the type of the OS that is included in the disk when creating a VM from a managed image. <br><br> Possible values are: <br><br> **Windows** <br><br> **Linux** */
  osType: "Windows" | "Linux";
  /** This property allows the user to specify whether the virtual machines created under this image are 'Generalized' or 'Specialized'. */
  osState: "Generalized" | "Specialized";
  /** The end of life date of the gallery image definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: string;
  /** This is the gallery image definition identifier. */
  identifier: GalleryImageIdentifierOutput;
  /** The properties describe the recommended machine configuration for this Image Definition. These properties are updatable. */
  recommended?: RecommendedMachineConfigurationOutput;
  /** Describes the disallowed disk types. */
  disallowed?: DisallowedOutput;
  /** The hypervisor generation of the Virtual Machine. Applicable to OS disks only. */
  hyperVGeneration?: "V1" | "V2";
  /** A list of gallery image features. */
  features?: Array<GalleryImageFeatureOutput>;
  /** Describes the gallery image definition purchase plan. This is used by marketplace images. */
  purchasePlan?: ImagePurchasePlanOutput;
  /** The architecture of the image. Applicable to OS disks only. */
  architecture?: "x64" | "Arm64";
  /** Privacy statement uri for the current community gallery image. */
  privacyStatementUri?: string;
  /** End-user license agreement for the current community gallery image. */
  eula?: string;
}

/** Specifies information about the gallery image version that you want to create or update. */
export interface CommunityGalleryImageVersionOutput extends PirCommunityGalleryResourceOutput {
  /** Describes the properties of a gallery image version. */
  properties?: CommunityGalleryImageVersionPropertiesOutput;
}

/** Describes the properties of a gallery image version. */
export interface CommunityGalleryImageVersionPropertiesOutput {
  /** The published date of the gallery image version Definition. This property can be used for decommissioning purposes. This property is updatable. */
  publishedDate?: string;
  /** The end of life date of the gallery image version Definition. This property can be used for decommissioning purposes. This property is updatable. */
  endOfLifeDate?: string;
  /** If set to true, Virtual Machines deployed from the latest version of the Image Definition won't use this Image Version. */
  excludeFromLatest?: boolean;
  /** Describes the storage profile of the image version. */
  storageProfile?: SharedGalleryImageVersionStorageProfileOutput;
}

/** The List Community Gallery Images operation response. */
export interface CommunityGalleryImageListOutput {
  /** A list of community gallery images. */
  value: Array<CommunityGalleryImageOutput>;
  /** The uri to fetch the next page of community gallery images. Call ListNext() with this to fetch the next page of community gallery images. */
  nextLink?: string;
}

/** The List Community Gallery Image versions operation response. */
export interface CommunityGalleryImageVersionListOutput {
  /** A list of community gallery image versions. */
  value: Array<CommunityGalleryImageVersionOutput>;
  /** The uri to fetch the next page of community gallery image versions. Call ListNext() with this to fetch the next page of community gallery image versions. */
  nextLink?: string;
}

/** Describes the cloud service role instance. */
export interface RoleInstanceOutput {
  /** Resource Id */
  readonly id?: string;
  /** Resource Name. */
  readonly name?: string;
  /** Resource Type. */
  readonly type?: string;
  /** Resource Location. */
  readonly location?: string;
  /** Resource tags. */
  readonly tags?: Record<string, string>;
  /** The role instance SKU. */
  sku?: InstanceSkuOutput;
  /** Role instance properties. */
  properties?: RoleInstancePropertiesOutput;
}

/** The role instance SKU. */
export interface InstanceSkuOutput {
  /** The sku name. */
  readonly name?: string;
  /** The tier of the cloud service role instance. */
  readonly tier?: string;
}

/** Role instance properties. */
export interface RoleInstancePropertiesOutput {
  /** Describes the network profile for the role instance. */
  networkProfile?: RoleInstanceNetworkProfileOutput;
  /** The instance view of the role instance. */
  instanceView?: RoleInstanceViewOutput;
}

/** Describes the network profile for the role instance. */
export interface RoleInstanceNetworkProfileOutput {
  /** Specifies the list of resource Ids for the network interfaces associated with the role instance. */
  readonly networkInterfaces?: Array<SubResourceOutput>;
}

/** The instance view of the role instance. */
export interface RoleInstanceViewOutput {
  /** The Update Domain. */
  readonly platformUpdateDomain?: number;
  /** The Fault Domain. */
  readonly platformFaultDomain?: number;
  /** Specifies a unique identifier generated internally for the cloud service associated with this role instance. <br /><br /> NOTE: If you are using Azure Diagnostics extension, this property can be used as 'DeploymentId' for querying details. */
  readonly privateId?: string;
  readonly statuses?: Array<ResourceInstanceViewStatusOutput>;
}

/** Instance view status. */
export interface ResourceInstanceViewStatusOutput {
  /** The status code. */
  readonly code?: string;
  /** The short localizable label for the status. */
  readonly displayStatus?: string;
  /** The detailed status message, including for alerts and error messages. */
  readonly message?: string;
  /** The time of the status. */
  readonly time?: string;
  /** The level code. */
  level?: "Info" | "Warning" | "Error";
}

/** The list operation result. */
export interface RoleInstanceListResultOutput {
  /** The list of resources. */
  value: Array<RoleInstanceOutput>;
  /** The URI to fetch the next page of resources. Use this to get the next page of resources. Do this till nextLink is null to fetch all the resources. */
  nextLink?: string;
}

/** Describes a role of the cloud service. */
export interface CloudServiceRoleOutput {
  /** Resource id */
  readonly id?: string;
  /** Resource name */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Resource location */
  readonly location?: string;
  /** Describes the cloud service role sku. */
  sku?: CloudServiceRoleSkuOutput;
  /** The cloud service role properties. */
  properties?: CloudServiceRolePropertiesOutput;
}

/** Describes the cloud service role sku. */
export interface CloudServiceRoleSkuOutput {
  /** The sku name. NOTE: If the new SKU is not supported on the hardware the cloud service is currently on, you need to delete and recreate the cloud service or move back to the old sku. */
  name?: string;
  /** Specifies the tier of the cloud service. Possible Values are <br /><br /> **Standard** <br /><br /> **Basic** */
  tier?: string;
  /** Specifies the number of role instances in the cloud service. */
  capacity?: number;
}

/** The cloud service role properties. */
export interface CloudServiceRolePropertiesOutput {
  /** Specifies the ID which uniquely identifies a cloud service role. */
  readonly uniqueId?: string;
}

/** The list operation result. */
export interface CloudServiceRoleListResultOutput {
  /** The list of resources. */
  value: Array<CloudServiceRoleOutput>;
  /** The URI to fetch the next page of resources. Use this to get the next page of resources. Do this till nextLink is null to fetch all the resources. */
  nextLink?: string;
}

/** Describes the cloud service. */
export interface CloudServiceOutput {
  /** Resource Id. */
  readonly id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** Resource location. */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Cloud service properties */
  properties?: CloudServicePropertiesOutput;
  /** The system meta data relating to this resource. */
  systemData?: SystemDataOutput;
}

/** Cloud service properties */
export interface CloudServicePropertiesOutput {
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
  roleProfile?: CloudServiceRoleProfileOutput;
  /** Describes the OS profile for the cloud service. */
  osProfile?: CloudServiceOsProfileOutput;
  /** Network Profile for the cloud service. */
  networkProfile?: CloudServiceNetworkProfileOutput;
  /** Describes a cloud service extension profile. */
  extensionProfile?: CloudServiceExtensionProfileOutput;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The unique identifier for the cloud service. */
  readonly uniqueId?: string;
}

/** Describes the role profile for the cloud service. */
export interface CloudServiceRoleProfileOutput {
  /** List of roles for the cloud service. */
  roles?: Array<CloudServiceRoleProfilePropertiesOutput>;
}

/** Describes the role properties. */
export interface CloudServiceRoleProfilePropertiesOutput {
  /** Resource name. */
  name?: string;
  /** Describes the cloud service role sku. */
  sku?: CloudServiceRoleSkuOutput;
}

/** Describes the OS profile for the cloud service. */
export interface CloudServiceOsProfileOutput {
  /** Specifies set of certificates that should be installed onto the role instances. */
  secrets?: Array<CloudServiceVaultSecretGroupOutput>;
}

/** Describes a set of certificates which are all in the same Key Vault. */
export interface CloudServiceVaultSecretGroupOutput {
  /** The relative URL of the Key Vault containing all of the certificates in VaultCertificates. */
  sourceVault?: SubResourceOutput;
  /** The list of key vault references in SourceVault which contain certificates. */
  vaultCertificates?: Array<CloudServiceVaultCertificateOutput>;
}

/** Describes a single certificate reference in a Key Vault, and where the certificate should reside on the role instance. */
export interface CloudServiceVaultCertificateOutput {
  /** This is the URL of a certificate that has been uploaded to Key Vault as a secret. */
  certificateUrl?: string;
}

/** Network Profile for the cloud service. */
export interface CloudServiceNetworkProfileOutput {
  /** List of Load balancer configurations. Cloud service can have up to two load balancer configurations, corresponding to a Public Load Balancer and an Internal Load Balancer. */
  loadBalancerConfigurations?: Array<LoadBalancerConfigurationOutput>;
  /**
   * Slot type for the cloud service.
   * Possible values are <br /><br />**Production**<br /><br />**Staging**<br /><br />
   * If not specified, the default value is Production.
   */
  slotType?: "Production" | "Staging";
  /** The id reference of the cloud service containing the target IP with which the subject cloud service can perform a swap. This property cannot be updated once it is set. The swappable cloud service referred by this id must be present otherwise an error will be thrown. */
  swappableCloudService?: SubResourceOutput;
}

/** Describes the load balancer configuration. */
export interface LoadBalancerConfigurationOutput {
  /** Resource Id */
  id?: string;
  /** The name of the Load balancer */
  name: string;
  /** Properties of the load balancer configuration. */
  properties: LoadBalancerConfigurationPropertiesOutput;
}

/** Describes the properties of the load balancer configuration. */
export interface LoadBalancerConfigurationPropertiesOutput {
  /** Specifies the frontend IP to be used for the load balancer. Only IPv4 frontend IP address is supported. Each load balancer configuration must have exactly one frontend IP configuration. */
  frontendIPConfigurations: Array<LoadBalancerFrontendIPConfigurationOutput>;
}

/** Specifies the frontend IP to be used for the load balancer. Only IPv4 frontend IP address is supported. Each load balancer configuration must have exactly one frontend IP configuration. */
export interface LoadBalancerFrontendIPConfigurationOutput {
  /** The name of the resource that is unique within the set of frontend IP configurations used by the load balancer. This name can be used to access the resource. */
  name: string;
  /** Properties of load balancer frontend ip configuration. */
  properties: LoadBalancerFrontendIPConfigurationPropertiesOutput;
}

/** Describes a cloud service IP Configuration */
export interface LoadBalancerFrontendIPConfigurationPropertiesOutput {
  /** The reference to the public ip address resource. */
  publicIPAddress?: SubResourceOutput;
  /** The reference to the virtual network subnet resource. */
  subnet?: SubResourceOutput;
  /** The virtual network private IP address of the IP configuration. */
  privateIPAddress?: string;
}

/** Describes a cloud service extension profile. */
export interface CloudServiceExtensionProfileOutput {
  /** List of extensions for the cloud service. */
  extensions?: Array<ExtensionOutput>;
}

/** Describes a cloud service Extension. */
export interface ExtensionOutput {
  /** The name of the extension. */
  name?: string;
  /** Extension Properties. */
  properties?: CloudServiceExtensionPropertiesOutput;
}

/** Extension Properties. */
export interface CloudServiceExtensionPropertiesOutput {
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
  protectedSettingsFromKeyVault?: CloudServiceVaultAndSecretReferenceOutput;
  /**
   * Tag to force apply the provided public and protected settings.
   * Changing the tag value allows for re-running the extension without changing any of the public or protected settings.
   * If forceUpdateTag is not changed, updates to public or protected settings would still be applied by the handler.
   * If neither forceUpdateTag nor any of public or protected settings change, extension would flow to the role instance with the same sequence-number, and
   * it is up to handler implementation whether to re-run it or not
   */
  forceUpdateTag?: string;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** Optional list of roles to apply this extension. If property is not specified or '*' is specified, extension is applied to all roles in the cloud service. */
  rolesAppliedTo?: Array<string>;
}

/** Protected settings for the extension, referenced using KeyVault which are encrypted before sent to the role instance. */
export interface CloudServiceVaultAndSecretReferenceOutput {
  /** The ARM Resource ID of the Key Vault */
  sourceVault?: SubResourceOutput;
  /** Secret URL which contains the protected settings of the extension */
  secretUrl?: string;
}

/** The system meta data relating to this resource. */
export interface SystemDataOutput {
  /** Specifies the time in UTC at which the Cloud Service (extended support) resource was created. <br />Minimum api-version: 2022-04-04. */
  readonly createdAt?: string;
  /** Specifies the time in UTC at which the Cloud Service (extended support) resource was last modified. <br />Minimum api-version: 2022-04-04. */
  readonly lastModifiedAt?: string;
}

/** InstanceView of CloudService as a whole */
export interface CloudServiceInstanceViewOutput {
  /** Instance view statuses. */
  roleInstance?: InstanceViewStatusesSummaryOutput;
  /** The version of the SDK that was used to generate the package for the cloud service. */
  readonly sdkVersion?: string;
  /** Specifies a list of unique identifiers generated internally for the cloud service. <br /><br /> NOTE: If you are using Azure Diagnostics extension, this property can be used as 'DeploymentId' for querying details. */
  readonly privateIds?: Array<string>;
  readonly statuses?: Array<ResourceInstanceViewStatusOutput>;
}

/** Instance view statuses. */
export interface InstanceViewStatusesSummaryOutput {
  /** The summary. */
  readonly statusesSummary?: Array<StatusCodeCountOutput>;
}

/** The status code and count of the cloud service instance view statuses */
export interface StatusCodeCountOutput {
  /** The instance view status code */
  readonly code?: string;
  /** Number of instances having this status code */
  readonly count?: number;
}

/** The list operation result. */
export interface CloudServiceListResultOutput {
  /** The list of resources. */
  value: Array<CloudServiceOutput>;
  /** The URI to fetch the next page of resources. Use this to get the next page of resources. Do this till nextLink is null to fetch all the resources. */
  nextLink?: string;
}

/** Defines an update domain for the cloud service. */
export interface UpdateDomainOutput {
  /** Resource Id */
  readonly id?: string;
  /** Resource Name */
  readonly name?: string;
}

/** The list operation result. */
export interface UpdateDomainListResultOutput {
  /** The list of resources. */
  value: Array<UpdateDomainOutput>;
  /** The URI to fetch the next page of resources. Use this to get the next page of resources. Do this till nextLink is null to fetch all the resources. */
  nextLink?: string;
}

/** Describes a cloud service OS version. */
export interface OSVersionOutput {
  /** Resource Id. */
  readonly id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** Resource location. */
  readonly location?: string;
  /** OS version properties. */
  properties?: OSVersionPropertiesOutput;
}

/** OS version properties. */
export interface OSVersionPropertiesOutput {
  /** The family of this OS version. */
  readonly family?: string;
  /** The family label of this OS version. */
  readonly familyLabel?: string;
  /** The OS version. */
  readonly version?: string;
  /** The OS version label. */
  readonly label?: string;
  /** Specifies whether this is the default OS version for its family. */
  readonly isDefault?: boolean;
  /** Specifies whether this OS version is active. */
  readonly isActive?: boolean;
}

/** The list operation result. */
export interface OSVersionListResultOutput {
  /** The list of resources. */
  value: Array<OSVersionOutput>;
  /** The URI to fetch the next page of resources. Use this to get the next page of resources. Do this till nextLink is null to fetch all the resources. */
  nextLink?: string;
}

/** Describes a cloud service OS family. */
export interface OSFamilyOutput {
  /** Resource Id. */
  readonly id?: string;
  /** Resource name. */
  readonly name?: string;
  /** Resource type. */
  readonly type?: string;
  /** Resource location. */
  readonly location?: string;
  /** OS family properties. */
  properties?: OSFamilyPropertiesOutput;
}

/** OS family properties. */
export interface OSFamilyPropertiesOutput {
  /** The OS family name. */
  readonly name?: string;
  /** The OS family label. */
  readonly label?: string;
  /** List of OS versions belonging to this family. */
  readonly versions?: Array<OSVersionPropertiesBaseOutput>;
}

/** Configuration view of an OS version. */
export interface OSVersionPropertiesBaseOutput {
  /** The OS version. */
  readonly version?: string;
  /** The OS version label. */
  readonly label?: string;
  /** Specifies whether this is the default OS version for its family. */
  readonly isDefault?: boolean;
  /** Specifies whether this OS version is active. */
  readonly isActive?: boolean;
}

/** The list operation result. */
export interface OSFamilyListResultOutput {
  /** The list of resources. */
  value: Array<OSFamilyOutput>;
  /** The URI to fetch the next page of resources. Use this to get the next page of resources. Do this till nextLink is null to fetch all the resources. */
  nextLink?: string;
}
