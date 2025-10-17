// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

/** Localized display information for and operation. */
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

/** Describes a Virtual Machine Scale Set. */
export interface VirtualMachineScaleSet extends TrackedResource {
  /** The virtual machine scale set sku. */
  sku?: Sku;
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: Plan;
  /** Describes the properties of a Virtual Machine Scale Set. */
  properties?: VirtualMachineScaleSetProperties;
  /** The identity of the virtual machine scale set, if configured. */
  identity?: VirtualMachineScaleSetIdentity;
  /** The availability zones. */
  zones?: string[];
  /** The extended location of the Virtual Machine Scale Set. */
  extendedLocation?: ExtendedLocation;
  /** Etag is property returned in Create/Update/Get response of the VMSS, so that customer can supply it in the header to ensure optimistic updates */
  readonly etag?: string;
  /** Placement section specifies the user-defined constraints for virtual machine scale set hardware placement. This property cannot be changed once VMSS is provisioned. Minimum api-version: 2025-04-01. */
  placement?: Placement;
}

export function virtualMachineScaleSetSerializer(item: VirtualMachineScaleSet): any {
  return {
    tags: item["tags"],
    location: item["location"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : virtualMachineScaleSetIdentitySerializer(item["identity"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    placement: !item["placement"] ? item["placement"] : placementSerializer(item["placement"]),
  };
}

export function virtualMachineScaleSetDeserializer(item: any): VirtualMachineScaleSet {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : virtualMachineScaleSetIdentityDeserializer(item["identity"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    etag: item["etag"],
    placement: !item["placement"] ? item["placement"] : placementDeserializer(item["placement"]),
  };
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

export function skuSerializer(item: Sku): any {
  return { name: item["name"], tier: item["tier"], capacity: item["capacity"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
    capacity: item["capacity"],
  };
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

export function planSerializer(item: Plan): any {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
  };
}

export function planDeserializer(item: any): Plan {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
  };
}

/** Describes the properties of a Virtual Machine Scale Set. */
export interface VirtualMachineScaleSetProperties {
  /** The upgrade policy. */
  upgradePolicy?: UpgradePolicy;
  /** The ScheduledEventsPolicy. */
  scheduledEventsPolicy?: ScheduledEventsPolicy;
  /** Policy for automatic repairs. */
  automaticRepairsPolicy?: AutomaticRepairsPolicy;
  /** The virtual machine profile. */
  virtualMachineProfile?: VirtualMachineScaleSetVMProfile;
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
  /** Specifies information about the proximity placement group that the virtual machine scale set should be assigned to. Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResource;
  /** Specifies information about the dedicated host group that the virtual machine scale set resides in. Minimum api-version: 2020-06-01. */
  hostGroup?: SubResource;
  /** Specifies additional capabilities enabled or disabled on the Virtual Machines in the Virtual Machine Scale Set. For instance: whether the Virtual Machines have the capability to support attaching managed data disks with UltraSSD_LRS storage account type. */
  additionalCapabilities?: AdditionalCapabilities;
  /** Specifies the policies applied when scaling in Virtual Machines in the Virtual Machine Scale Set. */
  scaleInPolicy?: ScaleInPolicy;
  /** Specifies the orchestration mode for the virtual machine scale set. */
  orchestrationMode?: OrchestrationMode;
  /** Specifies the Spot Restore properties for the virtual machine scale set. */
  spotRestorePolicy?: SpotRestorePolicy;
  /** Specifies the desired targets for mixing Spot and Regular priority VMs within the same VMSS Flex instance. */
  priorityMixPolicy?: PriorityMixPolicy;
  /** Specifies the time at which the Virtual Machine Scale Set resource was created. Minimum api-version: 2021-11-01. */
  readonly timeCreated?: Date;
  /** Optional property which must either be set to True or omitted. */
  constrainedMaximumCapacity?: boolean;
  /** Policy for Resiliency */
  resiliencyPolicy?: ResiliencyPolicy;
  /** Specifies the align mode between Virtual Machine Scale Set compute and storage Fault Domain count. */
  zonalPlatformFaultDomainAlignMode?: ZonalPlatformFaultDomainAlignMode;
  /** Specifies the sku profile for the virtual machine scale set. */
  skuProfile?: SkuProfile;
  /** Specifies the high speed interconnect placement for the virtual machine scale set. */
  highSpeedInterconnectPlacement?: HighSpeedInterconnectPlacement;
}

export function virtualMachineScaleSetPropertiesSerializer(
  item: VirtualMachineScaleSetProperties,
): any {
  return {
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : upgradePolicySerializer(item["upgradePolicy"]),
    scheduledEventsPolicy: !item["scheduledEventsPolicy"]
      ? item["scheduledEventsPolicy"]
      : scheduledEventsPolicySerializer(item["scheduledEventsPolicy"]),
    automaticRepairsPolicy: !item["automaticRepairsPolicy"]
      ? item["automaticRepairsPolicy"]
      : automaticRepairsPolicySerializer(item["automaticRepairsPolicy"]),
    virtualMachineProfile: !item["virtualMachineProfile"]
      ? item["virtualMachineProfile"]
      : virtualMachineScaleSetVMProfileSerializer(item["virtualMachineProfile"]),
    overprovision: item["overprovision"],
    doNotRunExtensionsOnOverprovisionedVMs: item["doNotRunExtensionsOnOverprovisionedVMs"],
    singlePlacementGroup: item["singlePlacementGroup"],
    zoneBalance: item["zoneBalance"],
    platformFaultDomainCount: item["platformFaultDomainCount"],
    proximityPlacementGroup: !item["proximityPlacementGroup"]
      ? item["proximityPlacementGroup"]
      : subResourceSerializer(item["proximityPlacementGroup"]),
    hostGroup: !item["hostGroup"] ? item["hostGroup"] : subResourceSerializer(item["hostGroup"]),
    additionalCapabilities: !item["additionalCapabilities"]
      ? item["additionalCapabilities"]
      : additionalCapabilitiesSerializer(item["additionalCapabilities"]),
    scaleInPolicy: !item["scaleInPolicy"]
      ? item["scaleInPolicy"]
      : scaleInPolicySerializer(item["scaleInPolicy"]),
    orchestrationMode: item["orchestrationMode"],
    spotRestorePolicy: !item["spotRestorePolicy"]
      ? item["spotRestorePolicy"]
      : spotRestorePolicySerializer(item["spotRestorePolicy"]),
    priorityMixPolicy: !item["priorityMixPolicy"]
      ? item["priorityMixPolicy"]
      : priorityMixPolicySerializer(item["priorityMixPolicy"]),
    constrainedMaximumCapacity: item["constrainedMaximumCapacity"],
    resiliencyPolicy: !item["resiliencyPolicy"]
      ? item["resiliencyPolicy"]
      : resiliencyPolicySerializer(item["resiliencyPolicy"]),
    zonalPlatformFaultDomainAlignMode: item["zonalPlatformFaultDomainAlignMode"],
    skuProfile: !item["skuProfile"] ? item["skuProfile"] : skuProfileSerializer(item["skuProfile"]),
    highSpeedInterconnectPlacement: item["highSpeedInterconnectPlacement"],
  };
}

export function virtualMachineScaleSetPropertiesDeserializer(
  item: any,
): VirtualMachineScaleSetProperties {
  return {
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : upgradePolicyDeserializer(item["upgradePolicy"]),
    scheduledEventsPolicy: !item["scheduledEventsPolicy"]
      ? item["scheduledEventsPolicy"]
      : scheduledEventsPolicyDeserializer(item["scheduledEventsPolicy"]),
    automaticRepairsPolicy: !item["automaticRepairsPolicy"]
      ? item["automaticRepairsPolicy"]
      : automaticRepairsPolicyDeserializer(item["automaticRepairsPolicy"]),
    virtualMachineProfile: !item["virtualMachineProfile"]
      ? item["virtualMachineProfile"]
      : virtualMachineScaleSetVMProfileDeserializer(item["virtualMachineProfile"]),
    provisioningState: item["provisioningState"],
    overprovision: item["overprovision"],
    doNotRunExtensionsOnOverprovisionedVMs: item["doNotRunExtensionsOnOverprovisionedVMs"],
    uniqueId: item["uniqueId"],
    singlePlacementGroup: item["singlePlacementGroup"],
    zoneBalance: item["zoneBalance"],
    platformFaultDomainCount: item["platformFaultDomainCount"],
    proximityPlacementGroup: !item["proximityPlacementGroup"]
      ? item["proximityPlacementGroup"]
      : subResourceDeserializer(item["proximityPlacementGroup"]),
    hostGroup: !item["hostGroup"] ? item["hostGroup"] : subResourceDeserializer(item["hostGroup"]),
    additionalCapabilities: !item["additionalCapabilities"]
      ? item["additionalCapabilities"]
      : additionalCapabilitiesDeserializer(item["additionalCapabilities"]),
    scaleInPolicy: !item["scaleInPolicy"]
      ? item["scaleInPolicy"]
      : scaleInPolicyDeserializer(item["scaleInPolicy"]),
    orchestrationMode: item["orchestrationMode"],
    spotRestorePolicy: !item["spotRestorePolicy"]
      ? item["spotRestorePolicy"]
      : spotRestorePolicyDeserializer(item["spotRestorePolicy"]),
    priorityMixPolicy: !item["priorityMixPolicy"]
      ? item["priorityMixPolicy"]
      : priorityMixPolicyDeserializer(item["priorityMixPolicy"]),
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    constrainedMaximumCapacity: item["constrainedMaximumCapacity"],
    resiliencyPolicy: !item["resiliencyPolicy"]
      ? item["resiliencyPolicy"]
      : resiliencyPolicyDeserializer(item["resiliencyPolicy"]),
    zonalPlatformFaultDomainAlignMode: item["zonalPlatformFaultDomainAlignMode"],
    skuProfile: !item["skuProfile"]
      ? item["skuProfile"]
      : skuProfileDeserializer(item["skuProfile"]),
    highSpeedInterconnectPlacement: item["highSpeedInterconnectPlacement"],
  };
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

export function upgradePolicySerializer(item: UpgradePolicy): any {
  return {
    mode: item["mode"],
    rollingUpgradePolicy: !item["rollingUpgradePolicy"]
      ? item["rollingUpgradePolicy"]
      : rollingUpgradePolicySerializer(item["rollingUpgradePolicy"]),
    automaticOSUpgradePolicy: !item["automaticOSUpgradePolicy"]
      ? item["automaticOSUpgradePolicy"]
      : automaticOSUpgradePolicySerializer(item["automaticOSUpgradePolicy"]),
  };
}

export function upgradePolicyDeserializer(item: any): UpgradePolicy {
  return {
    mode: item["mode"],
    rollingUpgradePolicy: !item["rollingUpgradePolicy"]
      ? item["rollingUpgradePolicy"]
      : rollingUpgradePolicyDeserializer(item["rollingUpgradePolicy"]),
    automaticOSUpgradePolicy: !item["automaticOSUpgradePolicy"]
      ? item["automaticOSUpgradePolicy"]
      : automaticOSUpgradePolicyDeserializer(item["automaticOSUpgradePolicy"]),
  };
}

/** Specifies the mode of an upgrade to virtual machines in the scale set.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of updates to virtual machines in the scale set. You do this by using the manualUpgrade action.<br /><br /> **Automatic** - All virtual machines in the scale set are  automatically updated at the same time. */
export type UpgradeMode = "Automatic" | "Manual" | "Rolling";

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
  /** Rollback failed instances to previous model if the Rolling Upgrade policy is violated. */
  rollbackFailedInstancesOnPolicyBreach?: boolean;
  /** Create new virtual machines to upgrade the scale set, rather than updating the existing virtual machines. Existing virtual machines will be deleted once the new virtual machines are created for each batch. */
  maxSurge?: boolean;
}

export function rollingUpgradePolicySerializer(item: RollingUpgradePolicy): any {
  return {
    maxBatchInstancePercent: item["maxBatchInstancePercent"],
    maxUnhealthyInstancePercent: item["maxUnhealthyInstancePercent"],
    maxUnhealthyUpgradedInstancePercent: item["maxUnhealthyUpgradedInstancePercent"],
    pauseTimeBetweenBatches: item["pauseTimeBetweenBatches"],
    enableCrossZoneUpgrade: item["enableCrossZoneUpgrade"],
    prioritizeUnhealthyInstances: item["prioritizeUnhealthyInstances"],
    rollbackFailedInstancesOnPolicyBreach: item["rollbackFailedInstancesOnPolicyBreach"],
    maxSurge: item["maxSurge"],
  };
}

export function rollingUpgradePolicyDeserializer(item: any): RollingUpgradePolicy {
  return {
    maxBatchInstancePercent: item["maxBatchInstancePercent"],
    maxUnhealthyInstancePercent: item["maxUnhealthyInstancePercent"],
    maxUnhealthyUpgradedInstancePercent: item["maxUnhealthyUpgradedInstancePercent"],
    pauseTimeBetweenBatches: item["pauseTimeBetweenBatches"],
    enableCrossZoneUpgrade: item["enableCrossZoneUpgrade"],
    prioritizeUnhealthyInstances: item["prioritizeUnhealthyInstances"],
    rollbackFailedInstancesOnPolicyBreach: item["rollbackFailedInstancesOnPolicyBreach"],
    maxSurge: item["maxSurge"],
  };
}

/** The configuration parameters used for performing automatic OS upgrade. */
export interface AutomaticOSUpgradePolicy {
  /** Indicates whether OS upgrades should automatically be applied to scale set instances in a rolling fashion when a newer version of the OS image becomes available. Default value is false. If this is set to true for Windows based scale sets, [enableAutomaticUpdates](https://docs.microsoft.com/dotnet/api/microsoft.azure.management.compute.models.windowsconfiguration.enableautomaticupdates?view=azure-dotnet) is automatically set to false and cannot be set to true. */
  enableAutomaticOSUpgrade?: boolean;
  /** Whether OS image rollback feature should be disabled. Default value is false. */
  disableAutomaticRollback?: boolean;
  /** Indicates whether rolling upgrade policy should be used during Auto OS Upgrade. Default value is false. Auto OS Upgrade will fallback to the default policy if no policy is defined on the VMSS. */
  useRollingUpgradePolicy?: boolean;
  /** Indicates whether Auto OS Upgrade should undergo deferral. Deferred OS upgrades will send advanced notifications on a per-VM basis that an OS upgrade from rolling upgrades is incoming, via the IMDS tag 'Platform.PendingOSUpgrade'. The upgrade then defers until the upgrade is approved via an ApproveRollingUpgrade call. */
  osRollingUpgradeDeferral?: boolean;
}

export function automaticOSUpgradePolicySerializer(item: AutomaticOSUpgradePolicy): any {
  return {
    enableAutomaticOSUpgrade: item["enableAutomaticOSUpgrade"],
    disableAutomaticRollback: item["disableAutomaticRollback"],
    useRollingUpgradePolicy: item["useRollingUpgradePolicy"],
    osRollingUpgradeDeferral: item["osRollingUpgradeDeferral"],
  };
}

export function automaticOSUpgradePolicyDeserializer(item: any): AutomaticOSUpgradePolicy {
  return {
    enableAutomaticOSUpgrade: item["enableAutomaticOSUpgrade"],
    disableAutomaticRollback: item["disableAutomaticRollback"],
    useRollingUpgradePolicy: item["useRollingUpgradePolicy"],
    osRollingUpgradeDeferral: item["osRollingUpgradeDeferral"],
  };
}

/** Specifies Redeploy, Reboot and ScheduledEventsAdditionalPublishingTargets Scheduled Event related configurations. */
export interface ScheduledEventsPolicy {
  /** The configuration parameters used while creating userInitiatedRedeploy scheduled event setting creation. */
  userInitiatedRedeploy?: UserInitiatedRedeploy;
  /** The configuration parameters used while creating userInitiatedReboot scheduled event setting creation. */
  userInitiatedReboot?: UserInitiatedReboot;
  /** The configuration parameters used while publishing scheduledEventsAdditionalPublishingTargets. */
  scheduledEventsAdditionalPublishingTargets?: ScheduledEventsAdditionalPublishingTargets;
  /** The configuration parameters used while creating AllInstancesDown scheduled event setting creation. */
  allInstancesDown?: AllInstancesDown;
}

export function scheduledEventsPolicySerializer(item: ScheduledEventsPolicy): any {
  return {
    userInitiatedRedeploy: !item["userInitiatedRedeploy"]
      ? item["userInitiatedRedeploy"]
      : userInitiatedRedeploySerializer(item["userInitiatedRedeploy"]),
    userInitiatedReboot: !item["userInitiatedReboot"]
      ? item["userInitiatedReboot"]
      : userInitiatedRebootSerializer(item["userInitiatedReboot"]),
    scheduledEventsAdditionalPublishingTargets: !item["scheduledEventsAdditionalPublishingTargets"]
      ? item["scheduledEventsAdditionalPublishingTargets"]
      : scheduledEventsAdditionalPublishingTargetsSerializer(
          item["scheduledEventsAdditionalPublishingTargets"],
        ),
    allInstancesDown: !item["allInstancesDown"]
      ? item["allInstancesDown"]
      : allInstancesDownSerializer(item["allInstancesDown"]),
  };
}

export function scheduledEventsPolicyDeserializer(item: any): ScheduledEventsPolicy {
  return {
    userInitiatedRedeploy: !item["userInitiatedRedeploy"]
      ? item["userInitiatedRedeploy"]
      : userInitiatedRedeployDeserializer(item["userInitiatedRedeploy"]),
    userInitiatedReboot: !item["userInitiatedReboot"]
      ? item["userInitiatedReboot"]
      : userInitiatedRebootDeserializer(item["userInitiatedReboot"]),
    scheduledEventsAdditionalPublishingTargets: !item["scheduledEventsAdditionalPublishingTargets"]
      ? item["scheduledEventsAdditionalPublishingTargets"]
      : scheduledEventsAdditionalPublishingTargetsDeserializer(
          item["scheduledEventsAdditionalPublishingTargets"],
        ),
    allInstancesDown: !item["allInstancesDown"]
      ? item["allInstancesDown"]
      : allInstancesDownDeserializer(item["allInstancesDown"]),
  };
}

/** Specifies Redeploy related Scheduled Event related configurations. */
export interface UserInitiatedRedeploy {
  /** Specifies Redeploy Scheduled Event related configurations. */
  automaticallyApprove?: boolean;
}

export function userInitiatedRedeploySerializer(item: UserInitiatedRedeploy): any {
  return { automaticallyApprove: item["automaticallyApprove"] };
}

export function userInitiatedRedeployDeserializer(item: any): UserInitiatedRedeploy {
  return {
    automaticallyApprove: item["automaticallyApprove"],
  };
}

/** Specifies Reboot related Scheduled Event related configurations. */
export interface UserInitiatedReboot {
  /** Specifies Reboot Scheduled Event related configurations. */
  automaticallyApprove?: boolean;
}

export function userInitiatedRebootSerializer(item: UserInitiatedReboot): any {
  return { automaticallyApprove: item["automaticallyApprove"] };
}

export function userInitiatedRebootDeserializer(item: any): UserInitiatedReboot {
  return {
    automaticallyApprove: item["automaticallyApprove"],
  };
}

/** model interface ScheduledEventsAdditionalPublishingTargets */
export interface ScheduledEventsAdditionalPublishingTargets {
  /** The configuration parameters used while creating eventGridAndResourceGraph Scheduled Event setting. */
  eventGridAndResourceGraph?: EventGridAndResourceGraph;
}

export function scheduledEventsAdditionalPublishingTargetsSerializer(
  item: ScheduledEventsAdditionalPublishingTargets,
): any {
  return {
    eventGridAndResourceGraph: !item["eventGridAndResourceGraph"]
      ? item["eventGridAndResourceGraph"]
      : eventGridAndResourceGraphSerializer(item["eventGridAndResourceGraph"]),
  };
}

export function scheduledEventsAdditionalPublishingTargetsDeserializer(
  item: any,
): ScheduledEventsAdditionalPublishingTargets {
  return {
    eventGridAndResourceGraph: !item["eventGridAndResourceGraph"]
      ? item["eventGridAndResourceGraph"]
      : eventGridAndResourceGraphDeserializer(item["eventGridAndResourceGraph"]),
  };
}

/** Specifies eventGridAndResourceGraph related Scheduled Event related configurations. */
export interface EventGridAndResourceGraph {
  /** Specifies if event grid and resource graph is enabled for Scheduled event related configurations. */
  enable?: boolean;
  /** Specifies the api-version to determine which Scheduled Events configuration schema version will be delivered. */
  scheduledEventsApiVersion?: string;
}

export function eventGridAndResourceGraphSerializer(item: EventGridAndResourceGraph): any {
  return {
    enable: item["enable"],
    scheduledEventsApiVersion: item["scheduledEventsApiVersion"],
  };
}

export function eventGridAndResourceGraphDeserializer(item: any): EventGridAndResourceGraph {
  return {
    enable: item["enable"],
    scheduledEventsApiVersion: item["scheduledEventsApiVersion"],
  };
}

/** Specifies if Scheduled Events should be auto-approved when all instances are down. */
export interface AllInstancesDown {
  /**
   * Specifies if Scheduled Events should be auto-approved when all instances are down.
   * its default value is true
   */
  automaticallyApprove?: boolean;
}

export function allInstancesDownSerializer(item: AllInstancesDown): any {
  return { automaticallyApprove: item["automaticallyApprove"] };
}

export function allInstancesDownDeserializer(item: any): AllInstancesDown {
  return {
    automaticallyApprove: item["automaticallyApprove"],
  };
}

/** Specifies the configuration parameters for automatic repairs on the virtual machine scale set. */
export interface AutomaticRepairsPolicy {
  /** Specifies whether automatic repairs should be enabled on the virtual machine scale set. The default value is false. */
  enabled?: boolean;
  /** The amount of time for which automatic repairs are suspended due to a state change on VM. The grace time starts after the state change has completed. This helps avoid premature or accidental repairs. The time duration should be specified in ISO 8601 format. The minimum allowed grace period is 10 minutes (PT10M), which is also the default value. The maximum allowed grace period is 90 minutes (PT90M). */
  gracePeriod?: string;
  /** Type of repair action (replace, restart, reimage) that will be used for repairing unhealthy virtual machines in the scale set. Default value is replace. */
  repairAction?: RepairAction;
}

export function automaticRepairsPolicySerializer(item: AutomaticRepairsPolicy): any {
  return {
    enabled: item["enabled"],
    gracePeriod: item["gracePeriod"],
    repairAction: item["repairAction"],
  };
}

export function automaticRepairsPolicyDeserializer(item: any): AutomaticRepairsPolicy {
  return {
    enabled: item["enabled"],
    gracePeriod: item["gracePeriod"],
    repairAction: item["repairAction"],
  };
}

/** Type of repair action (replace, restart, reimage) that will be used for repairing unhealthy virtual machines in the scale set. Default value is replace. */
export enum KnownRepairAction {
  /** Replace */
  Replace = "Replace",
  /** Restart */
  Restart = "Restart",
  /** Reimage */
  Reimage = "Reimage",
}

/**
 * Type of repair action (replace, restart, reimage) that will be used for repairing unhealthy virtual machines in the scale set. Default value is replace. \
 * {@link KnownRepairAction} can be used interchangeably with RepairAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Replace** \
 * **Restart** \
 * **Reimage**
 */
export type RepairAction = string;

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
  /** Specifies the boot diagnostic settings state. Minimum api-version: 2015-06-15. */
  diagnosticsProfile?: DiagnosticsProfile;
  /** Specifies a collection of settings for extensions installed on virtual machines in the scale set. */
  extensionProfile?: VirtualMachineScaleSetExtensionProfile;
  /** Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 */
  licenseType?: string;
  /** Specifies the priority for the virtual machines in the scale set. Minimum api-version: 2017-10-30-preview. */
  priority?: VirtualMachinePriorityTypes;
  /** Specifies the eviction policy for the Azure Spot virtual machine and Azure Spot scale set. For Azure Spot virtual machines, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2019-03-01. For Azure Spot scale sets, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2017-10-30-preview. */
  evictionPolicy?: VirtualMachineEvictionPolicyTypes;
  /** Specifies the billing related details of a Azure Spot VMSS. Minimum api-version: 2019-03-01. */
  billingProfile?: BillingProfile;
  /** Specifies Scheduled Event related configurations. */
  scheduledEventsProfile?: ScheduledEventsProfile;
  /** UserData for the virtual machines in the scale set, which must be base-64 encoded. Customer should not pass any secrets in here. Minimum api-version: 2021-03-01. */
  userData?: string;
  /** Specifies the capacity reservation related details of a scale set. Minimum api-version: 2021-04-01. */
  capacityReservation?: CapacityReservationProfile;
  /** Specifies the gallery applications that should be made available to the VM/VMSS */
  applicationProfile?: ApplicationProfile;
  /** Specifies the hardware profile related details of a scale set. Minimum api-version: 2021-11-01. */
  hardwareProfile?: VirtualMachineScaleSetHardwareProfile;
  /** Specifies the service artifact reference id used to set same image version for all virtual machines in the scale set when using 'latest' image version. Minimum api-version: 2022-11-01 */
  serviceArtifactReference?: ServiceArtifactReference;
  /** Specifies the security posture to be used in the scale set. Minimum api-version: 2023-03-01 */
  securityPostureReference?: SecurityPostureReference;
  /** Specifies the time in which this VM profile for the Virtual Machine Scale Set was created. This value will be added to VMSS Flex VM tags when creating/updating the VMSS VM Profile. Minimum API version for this property is 2023-09-01. */
  readonly timeCreated?: Date;
}

export function virtualMachineScaleSetVMProfileSerializer(
  item: VirtualMachineScaleSetVMProfile,
): any {
  return {
    osProfile: !item["osProfile"]
      ? item["osProfile"]
      : virtualMachineScaleSetOSProfileSerializer(item["osProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : virtualMachineScaleSetStorageProfileSerializer(item["storageProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : virtualMachineScaleSetNetworkProfileSerializer(item["networkProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileSerializer(item["securityProfile"]),
    diagnosticsProfile: !item["diagnosticsProfile"]
      ? item["diagnosticsProfile"]
      : diagnosticsProfileSerializer(item["diagnosticsProfile"]),
    extensionProfile: !item["extensionProfile"]
      ? item["extensionProfile"]
      : virtualMachineScaleSetExtensionProfileSerializer(item["extensionProfile"]),
    licenseType: item["licenseType"],
    priority: item["priority"],
    evictionPolicy: item["evictionPolicy"],
    billingProfile: !item["billingProfile"]
      ? item["billingProfile"]
      : billingProfileSerializer(item["billingProfile"]),
    scheduledEventsProfile: !item["scheduledEventsProfile"]
      ? item["scheduledEventsProfile"]
      : scheduledEventsProfileSerializer(item["scheduledEventsProfile"]),
    userData: item["userData"],
    capacityReservation: !item["capacityReservation"]
      ? item["capacityReservation"]
      : capacityReservationProfileSerializer(item["capacityReservation"]),
    applicationProfile: !item["applicationProfile"]
      ? item["applicationProfile"]
      : applicationProfileSerializer(item["applicationProfile"]),
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : virtualMachineScaleSetHardwareProfileSerializer(item["hardwareProfile"]),
    serviceArtifactReference: !item["serviceArtifactReference"]
      ? item["serviceArtifactReference"]
      : serviceArtifactReferenceSerializer(item["serviceArtifactReference"]),
    securityPostureReference: !item["securityPostureReference"]
      ? item["securityPostureReference"]
      : securityPostureReferenceSerializer(item["securityPostureReference"]),
  };
}

export function virtualMachineScaleSetVMProfileDeserializer(
  item: any,
): VirtualMachineScaleSetVMProfile {
  return {
    osProfile: !item["osProfile"]
      ? item["osProfile"]
      : virtualMachineScaleSetOSProfileDeserializer(item["osProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : virtualMachineScaleSetStorageProfileDeserializer(item["storageProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : virtualMachineScaleSetNetworkProfileDeserializer(item["networkProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileDeserializer(item["securityProfile"]),
    diagnosticsProfile: !item["diagnosticsProfile"]
      ? item["diagnosticsProfile"]
      : diagnosticsProfileDeserializer(item["diagnosticsProfile"]),
    extensionProfile: !item["extensionProfile"]
      ? item["extensionProfile"]
      : virtualMachineScaleSetExtensionProfileDeserializer(item["extensionProfile"]),
    licenseType: item["licenseType"],
    priority: item["priority"],
    evictionPolicy: item["evictionPolicy"],
    billingProfile: !item["billingProfile"]
      ? item["billingProfile"]
      : billingProfileDeserializer(item["billingProfile"]),
    scheduledEventsProfile: !item["scheduledEventsProfile"]
      ? item["scheduledEventsProfile"]
      : scheduledEventsProfileDeserializer(item["scheduledEventsProfile"]),
    userData: item["userData"],
    capacityReservation: !item["capacityReservation"]
      ? item["capacityReservation"]
      : capacityReservationProfileDeserializer(item["capacityReservation"]),
    applicationProfile: !item["applicationProfile"]
      ? item["applicationProfile"]
      : applicationProfileDeserializer(item["applicationProfile"]),
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : virtualMachineScaleSetHardwareProfileDeserializer(item["hardwareProfile"]),
    serviceArtifactReference: !item["serviceArtifactReference"]
      ? item["serviceArtifactReference"]
      : serviceArtifactReferenceDeserializer(item["serviceArtifactReference"]),
    securityPostureReference: !item["securityPostureReference"]
      ? item["securityPostureReference"]
      : securityPostureReferenceDeserializer(item["securityPostureReference"]),
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
  };
}

/** Describes a virtual machine scale set OS profile. */
export interface VirtualMachineScaleSetOSProfile {
  /** Specifies the computer name prefix for all of the virtual machines in the scale set. Computer name prefixes must be 1 to 15 characters long. */
  computerNamePrefix?: string;
  /** Specifies the name of the administrator account. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters */
  adminUsername?: string;
  /** Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection) */
  adminPassword?: string;
  /** Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. For using cloud-init for your VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init) */
  customData?: string;
  /** Specifies Windows operating system settings on the virtual machine. */
  windowsConfiguration?: WindowsConfiguration;
  /** Specifies the Linux operating system settings on the virtual machine. For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros). */
  linuxConfiguration?: LinuxConfiguration;
  /** Specifies set of certificates that should be installed onto the virtual machines in the scale set. To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  secrets?: VaultSecretGroup[];
  /** Specifies whether extension operations should be allowed on the virtual machine scale set. This may only be set to False when no extensions are present on the virtual machine scale set. */
  allowExtensionOperations?: boolean;
  /** Optional property which must either be set to True or omitted. */
  requireGuestProvisionSignal?: boolean;
}

export function virtualMachineScaleSetOSProfileSerializer(
  item: VirtualMachineScaleSetOSProfile,
): any {
  return {
    computerNamePrefix: item["computerNamePrefix"],
    adminUsername: item["adminUsername"],
    adminPassword: item["adminPassword"],
    customData: item["customData"],
    windowsConfiguration: !item["windowsConfiguration"]
      ? item["windowsConfiguration"]
      : windowsConfigurationSerializer(item["windowsConfiguration"]),
    linuxConfiguration: !item["linuxConfiguration"]
      ? item["linuxConfiguration"]
      : linuxConfigurationSerializer(item["linuxConfiguration"]),
    secrets: !item["secrets"] ? item["secrets"] : vaultSecretGroupArraySerializer(item["secrets"]),
    allowExtensionOperations: item["allowExtensionOperations"],
    requireGuestProvisionSignal: item["requireGuestProvisionSignal"],
  };
}

export function virtualMachineScaleSetOSProfileDeserializer(
  item: any,
): VirtualMachineScaleSetOSProfile {
  return {
    computerNamePrefix: item["computerNamePrefix"],
    adminUsername: item["adminUsername"],
    adminPassword: item["adminPassword"],
    customData: item["customData"],
    windowsConfiguration: !item["windowsConfiguration"]
      ? item["windowsConfiguration"]
      : windowsConfigurationDeserializer(item["windowsConfiguration"]),
    linuxConfiguration: !item["linuxConfiguration"]
      ? item["linuxConfiguration"]
      : linuxConfigurationDeserializer(item["linuxConfiguration"]),
    secrets: !item["secrets"]
      ? item["secrets"]
      : vaultSecretGroupArrayDeserializer(item["secrets"]),
    allowExtensionOperations: item["allowExtensionOperations"],
    requireGuestProvisionSignal: item["requireGuestProvisionSignal"],
  };
}

/** Specifies Windows operating system settings on the virtual machine. */
export interface WindowsConfiguration {
  /** Indicates whether virtual machine agent should be provisioned on the virtual machine. When this property is not specified in the request body, it is set to true by default. This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later. */
  provisionVMAgent?: boolean;
  /** Indicates whether Automatic Updates is enabled for the Windows virtual machine. Default value is true. For virtual machine scale sets, this property can be updated and updates will take effect on OS reprovisioning. */
  enableAutomaticUpdates?: boolean;
  /** Specifies the time zone of the virtual machine. e.g. "Pacific Standard Time". Possible values can be [TimeZoneInfo.Id](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.id?#System_TimeZoneInfo_Id) value from time zones returned by [TimeZoneInfo.GetSystemTimeZones](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.getsystemtimezones). */
  timeZone?: string;
  /** Specifies additional base-64 encoded XML formatted information that can be included in the Unattend.xml file, which is used by Windows Setup. */
  additionalUnattendContent?: AdditionalUnattendContent[];
  /** [Preview Feature] Specifies settings related to VM Guest Patching on Windows. */
  patchSettings?: PatchSettings;
  /** Specifies the Windows Remote Management listeners. This enables remote Windows PowerShell. */
  winRM?: WinRMConfiguration;
  /** Indicates whether VMAgent Platform Updates are enabled for the Windows Virtual Machine. */
  readonly enableVMAgentPlatformUpdates?: boolean;
}

export function windowsConfigurationSerializer(item: WindowsConfiguration): any {
  return {
    provisionVMAgent: item["provisionVMAgent"],
    enableAutomaticUpdates: item["enableAutomaticUpdates"],
    timeZone: item["timeZone"],
    additionalUnattendContent: !item["additionalUnattendContent"]
      ? item["additionalUnattendContent"]
      : additionalUnattendContentArraySerializer(item["additionalUnattendContent"]),
    patchSettings: !item["patchSettings"]
      ? item["patchSettings"]
      : patchSettingsSerializer(item["patchSettings"]),
    winRM: !item["winRM"] ? item["winRM"] : winRMConfigurationSerializer(item["winRM"]),
  };
}

export function windowsConfigurationDeserializer(item: any): WindowsConfiguration {
  return {
    provisionVMAgent: item["provisionVMAgent"],
    enableAutomaticUpdates: item["enableAutomaticUpdates"],
    timeZone: item["timeZone"],
    additionalUnattendContent: !item["additionalUnattendContent"]
      ? item["additionalUnattendContent"]
      : additionalUnattendContentArrayDeserializer(item["additionalUnattendContent"]),
    patchSettings: !item["patchSettings"]
      ? item["patchSettings"]
      : patchSettingsDeserializer(item["patchSettings"]),
    winRM: !item["winRM"] ? item["winRM"] : winRMConfigurationDeserializer(item["winRM"]),
    enableVMAgentPlatformUpdates: item["enableVMAgentPlatformUpdates"],
  };
}

export function additionalUnattendContentArraySerializer(
  result: Array<AdditionalUnattendContent>,
): any[] {
  return result.map((item) => {
    return additionalUnattendContentSerializer(item);
  });
}

export function additionalUnattendContentArrayDeserializer(
  result: Array<AdditionalUnattendContent>,
): any[] {
  return result.map((item) => {
    return additionalUnattendContentDeserializer(item);
  });
}

/** Specifies additional XML formatted information that can be included in the Unattend.xml file, which is used by Windows Setup. Contents are defined by setting name, component name, and the pass in which the content is applied. */
export interface AdditionalUnattendContent {
  /** The pass name. Currently, the only allowable value is OobeSystem. */
  passName?: PassNames;
  /** The component name. Currently, the only allowable value is Microsoft-Windows-Shell-Setup. */
  componentName?: ComponentNames;
  /** Specifies the name of the setting to which the content applies. Possible values are: FirstLogonCommands and AutoLogon. */
  settingName?: SettingNames;
  /** Specifies the XML formatted content that is added to the unattend.xml file for the specified path and component. The XML must be less than 4KB and must include the root element for the setting or feature that is being inserted. */
  content?: string;
}

export function additionalUnattendContentSerializer(item: AdditionalUnattendContent): any {
  return {
    passName: item["passName"],
    componentName: item["componentName"],
    settingName: item["settingName"],
    content: item["content"],
  };
}

export function additionalUnattendContentDeserializer(item: any): AdditionalUnattendContent {
  return {
    passName: item["passName"],
    componentName: item["componentName"],
    settingName: item["settingName"],
    content: item["content"],
  };
}

/** Type of PassNames */
export type PassNames = "OobeSystem";
/** The component name. Currently, the only allowable value is Microsoft-Windows-Shell-Setup. */
export type ComponentNames = "Microsoft-Windows-Shell-Setup";
/** Specifies the name of the setting to which the content applies. Possible values are: FirstLogonCommands and AutoLogon. */
export type SettingNames = "AutoLogon" | "FirstLogonCommands";

/** Specifies settings related to VM Guest Patching on Windows. */
export interface PatchSettings {
  /** Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of patches to a virtual machine. You do this by applying patches manually inside the VM. In this mode, automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates must be false<br /><br /> **AutomaticByOS** - The virtual machine will automatically be updated by the OS. The property WindowsConfiguration.enableAutomaticUpdates must be true. <br /><br /> **AutomaticByPlatform** - the virtual machine will automatically updated by the platform. The properties provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true */
  patchMode?: WindowsVMGuestPatchMode;
  /** Enables customers to patch their Azure VMs without requiring a reboot. For enableHotpatching, the 'provisionVMAgent' must be set to true and 'patchMode' must be set to 'AutomaticByPlatform'. */
  enableHotpatching?: boolean;
  /** Specifies the mode of VM Guest patch assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine.<br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
  assessmentMode?: WindowsPatchAssessmentMode;
  /** Specifies additional settings for patch mode AutomaticByPlatform in VM Guest Patching on Windows. */
  automaticByPlatformSettings?: WindowsVMGuestPatchAutomaticByPlatformSettings;
}

export function patchSettingsSerializer(item: PatchSettings): any {
  return {
    patchMode: item["patchMode"],
    enableHotpatching: item["enableHotpatching"],
    assessmentMode: item["assessmentMode"],
    automaticByPlatformSettings: !item["automaticByPlatformSettings"]
      ? item["automaticByPlatformSettings"]
      : windowsVMGuestPatchAutomaticByPlatformSettingsSerializer(
          item["automaticByPlatformSettings"],
        ),
  };
}

export function patchSettingsDeserializer(item: any): PatchSettings {
  return {
    patchMode: item["patchMode"],
    enableHotpatching: item["enableHotpatching"],
    assessmentMode: item["assessmentMode"],
    automaticByPlatformSettings: !item["automaticByPlatformSettings"]
      ? item["automaticByPlatformSettings"]
      : windowsVMGuestPatchAutomaticByPlatformSettingsDeserializer(
          item["automaticByPlatformSettings"],
        ),
  };
}

/** Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of patches to a virtual machine. You do this by applying patches manually inside the VM. In this mode, automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates must be false<br /><br /> **AutomaticByOS** - The virtual machine will automatically be updated by the OS. The property WindowsConfiguration.enableAutomaticUpdates must be true. <br /><br /> **AutomaticByPlatform** - the virtual machine will automatically updated by the platform. The properties provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true */
export enum KnownWindowsVMGuestPatchMode {
  /** Manual */
  Manual = "Manual",
  /** AutomaticByOS */
  AutomaticByOS = "AutomaticByOS",
  /** AutomaticByPlatform */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of patches to a virtual machine. You do this by applying patches manually inside the VM. In this mode, automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates must be false<br /><br /> **AutomaticByOS** - The virtual machine will automatically be updated by the OS. The property WindowsConfiguration.enableAutomaticUpdates must be true. <br /><br /> **AutomaticByPlatform** - the virtual machine will automatically updated by the platform. The properties provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true \
 * {@link KnownWindowsVMGuestPatchMode} can be used interchangeably with WindowsVMGuestPatchMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manual** \
 * **AutomaticByOS** \
 * **AutomaticByPlatform**
 */
export type WindowsVMGuestPatchMode = string;

/** Specifies the mode of VM Guest patch assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine.<br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
export enum KnownWindowsPatchAssessmentMode {
  /** ImageDefault */
  ImageDefault = "ImageDefault",
  /** AutomaticByPlatform */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest patch assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine.<br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. \
 * {@link KnownWindowsPatchAssessmentMode} can be used interchangeably with WindowsPatchAssessmentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault** \
 * **AutomaticByPlatform**
 */
export type WindowsPatchAssessmentMode = string;

/** Specifies additional settings to be applied when patch mode AutomaticByPlatform is selected in Windows patch settings. */
export interface WindowsVMGuestPatchAutomaticByPlatformSettings {
  /** Specifies the reboot setting for all AutomaticByPlatform patch installation operations. */
  rebootSetting?: WindowsVMGuestPatchAutomaticByPlatformRebootSetting;
  /** Enables customer to schedule patching without accidental upgrades */
  bypassPlatformSafetyChecksOnUserSchedule?: boolean;
}

export function windowsVMGuestPatchAutomaticByPlatformSettingsSerializer(
  item: WindowsVMGuestPatchAutomaticByPlatformSettings,
): any {
  return {
    rebootSetting: item["rebootSetting"],
    bypassPlatformSafetyChecksOnUserSchedule: item["bypassPlatformSafetyChecksOnUserSchedule"],
  };
}

export function windowsVMGuestPatchAutomaticByPlatformSettingsDeserializer(
  item: any,
): WindowsVMGuestPatchAutomaticByPlatformSettings {
  return {
    rebootSetting: item["rebootSetting"],
    bypassPlatformSafetyChecksOnUserSchedule: item["bypassPlatformSafetyChecksOnUserSchedule"],
  };
}

/** Specifies the reboot setting for all AutomaticByPlatform patch installation operations. */
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

export function winRMConfigurationSerializer(item: WinRMConfiguration): any {
  return {
    listeners: !item["listeners"]
      ? item["listeners"]
      : winRMListenerArraySerializer(item["listeners"]),
  };
}

export function winRMConfigurationDeserializer(item: any): WinRMConfiguration {
  return {
    listeners: !item["listeners"]
      ? item["listeners"]
      : winRMListenerArrayDeserializer(item["listeners"]),
  };
}

export function winRMListenerArraySerializer(result: Array<WinRMListener>): any[] {
  return result.map((item) => {
    return winRMListenerSerializer(item);
  });
}

export function winRMListenerArrayDeserializer(result: Array<WinRMListener>): any[] {
  return result.map((item) => {
    return winRMListenerDeserializer(item);
  });
}

/** Describes Protocol and thumbprint of Windows Remote Management listener */
export interface WinRMListener {
  /** Specifies the protocol of WinRM listener. Possible values are: **http,** **https.** */
  protocol?: ProtocolTypes;
  /** This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  certificateUrl?: string;
}

export function winRMListenerSerializer(item: WinRMListener): any {
  return { protocol: item["protocol"], certificateUrl: item["certificateUrl"] };
}

export function winRMListenerDeserializer(item: any): WinRMListener {
  return {
    protocol: item["protocol"],
    certificateUrl: item["certificateUrl"],
  };
}

/** Specifies the protocol of WinRM listener. Possible values are: **http,** **https.** */
export type ProtocolTypes = "Http" | "Https";

/** Specifies the Linux operating system settings on the virtual machine. For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros). */
export interface LinuxConfiguration {
  /** Specifies whether password authentication should be disabled. */
  disablePasswordAuthentication?: boolean;
  /** Specifies the ssh key configuration for a Linux OS. */
  ssh?: SshConfiguration;
  /** Indicates whether virtual machine agent should be provisioned on the virtual machine. When this property is not specified in the request body, default behavior is to set it to true. This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later. */
  provisionVMAgent?: boolean;
  /** [Preview Feature] Specifies settings related to VM Guest Patching on Linux. */
  patchSettings?: LinuxPatchSettings;
  /** Indicates whether VMAgent Platform Updates is enabled for the Linux virtual machine. Default value is false. */
  enableVMAgentPlatformUpdates?: boolean;
}

export function linuxConfigurationSerializer(item: LinuxConfiguration): any {
  return {
    disablePasswordAuthentication: item["disablePasswordAuthentication"],
    ssh: !item["ssh"] ? item["ssh"] : sshConfigurationSerializer(item["ssh"]),
    provisionVMAgent: item["provisionVMAgent"],
    patchSettings: !item["patchSettings"]
      ? item["patchSettings"]
      : linuxPatchSettingsSerializer(item["patchSettings"]),
    enableVMAgentPlatformUpdates: item["enableVMAgentPlatformUpdates"],
  };
}

export function linuxConfigurationDeserializer(item: any): LinuxConfiguration {
  return {
    disablePasswordAuthentication: item["disablePasswordAuthentication"],
    ssh: !item["ssh"] ? item["ssh"] : sshConfigurationDeserializer(item["ssh"]),
    provisionVMAgent: item["provisionVMAgent"],
    patchSettings: !item["patchSettings"]
      ? item["patchSettings"]
      : linuxPatchSettingsDeserializer(item["patchSettings"]),
    enableVMAgentPlatformUpdates: item["enableVMAgentPlatformUpdates"],
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
  /** SSH public key certificate used to authenticate with the VM through ssh. The key needs to be at least 2048-bit and in ssh-rsa format. For creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure]https://docs.microsoft.com/azure/virtual-machines/linux/create-ssh-keys-detailed). */
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

/** Specifies settings related to VM Guest Patching on Linux. */
export interface LinuxPatchSettings {
  /** Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - The virtual machine's default patching configuration is used. <br /><br /> **AutomaticByPlatform** - The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true */
  patchMode?: LinuxVMGuestPatchMode;
  /** Specifies the mode of VM Guest Patch Assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine. <br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
  assessmentMode?: LinuxPatchAssessmentMode;
  /** Specifies additional settings for patch mode AutomaticByPlatform in VM Guest Patching on Linux. */
  automaticByPlatformSettings?: LinuxVMGuestPatchAutomaticByPlatformSettings;
}

export function linuxPatchSettingsSerializer(item: LinuxPatchSettings): any {
  return {
    patchMode: item["patchMode"],
    assessmentMode: item["assessmentMode"],
    automaticByPlatformSettings: !item["automaticByPlatformSettings"]
      ? item["automaticByPlatformSettings"]
      : linuxVMGuestPatchAutomaticByPlatformSettingsSerializer(item["automaticByPlatformSettings"]),
  };
}

export function linuxPatchSettingsDeserializer(item: any): LinuxPatchSettings {
  return {
    patchMode: item["patchMode"],
    assessmentMode: item["assessmentMode"],
    automaticByPlatformSettings: !item["automaticByPlatformSettings"]
      ? item["automaticByPlatformSettings"]
      : linuxVMGuestPatchAutomaticByPlatformSettingsDeserializer(
          item["automaticByPlatformSettings"],
        ),
  };
}

/** Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - The virtual machine's default patching configuration is used. <br /><br /> **AutomaticByPlatform** - The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true */
export enum KnownLinuxVMGuestPatchMode {
  /** ImageDefault */
  ImageDefault = "ImageDefault",
  /** AutomaticByPlatform */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - The virtual machine's default patching configuration is used. <br /><br /> **AutomaticByPlatform** - The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true \
 * {@link KnownLinuxVMGuestPatchMode} can be used interchangeably with LinuxVMGuestPatchMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault** \
 * **AutomaticByPlatform**
 */
export type LinuxVMGuestPatchMode = string;

/** Specifies the mode of VM Guest Patch Assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine. <br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
export enum KnownLinuxPatchAssessmentMode {
  /** ImageDefault */
  ImageDefault = "ImageDefault",
  /** AutomaticByPlatform */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest Patch Assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine. <br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. \
 * {@link KnownLinuxPatchAssessmentMode} can be used interchangeably with LinuxPatchAssessmentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault** \
 * **AutomaticByPlatform**
 */
export type LinuxPatchAssessmentMode = string;

/** Specifies additional settings to be applied when patch mode AutomaticByPlatform is selected in Linux patch settings. */
export interface LinuxVMGuestPatchAutomaticByPlatformSettings {
  /** Specifies the reboot setting for all AutomaticByPlatform patch installation operations. */
  rebootSetting?: LinuxVMGuestPatchAutomaticByPlatformRebootSetting;
  /** Enables customer to schedule patching without accidental upgrades */
  bypassPlatformSafetyChecksOnUserSchedule?: boolean;
}

export function linuxVMGuestPatchAutomaticByPlatformSettingsSerializer(
  item: LinuxVMGuestPatchAutomaticByPlatformSettings,
): any {
  return {
    rebootSetting: item["rebootSetting"],
    bypassPlatformSafetyChecksOnUserSchedule: item["bypassPlatformSafetyChecksOnUserSchedule"],
  };
}

export function linuxVMGuestPatchAutomaticByPlatformSettingsDeserializer(
  item: any,
): LinuxVMGuestPatchAutomaticByPlatformSettings {
  return {
    rebootSetting: item["rebootSetting"],
    bypassPlatformSafetyChecksOnUserSchedule: item["bypassPlatformSafetyChecksOnUserSchedule"],
  };
}

/** Specifies the reboot setting for all AutomaticByPlatform patch installation operations. */
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
 * Specifies the reboot setting for all AutomaticByPlatform patch installation operations. \
 * {@link KnownLinuxVMGuestPatchAutomaticByPlatformRebootSetting} can be used interchangeably with LinuxVMGuestPatchAutomaticByPlatformRebootSetting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **IfRequired** \
 * **Never** \
 * **Always**
 */
export type LinuxVMGuestPatchAutomaticByPlatformRebootSetting = string;

export function vaultSecretGroupArraySerializer(result: Array<VaultSecretGroup>): any[] {
  return result.map((item) => {
    return vaultSecretGroupSerializer(item);
  });
}

export function vaultSecretGroupArrayDeserializer(result: Array<VaultSecretGroup>): any[] {
  return result.map((item) => {
    return vaultSecretGroupDeserializer(item);
  });
}

/** Describes a set of certificates which are all in the same Key Vault. */
export interface VaultSecretGroup {
  /** The relative URL of the Key Vault containing all of the certificates in VaultCertificates. */
  sourceVault?: SubResource;
  /** The list of key vault references in SourceVault which contain certificates. */
  vaultCertificates?: VaultCertificate[];
}

export function vaultSecretGroupSerializer(item: VaultSecretGroup): any {
  return {
    sourceVault: !item["sourceVault"]
      ? item["sourceVault"]
      : subResourceSerializer(item["sourceVault"]),
    vaultCertificates: !item["vaultCertificates"]
      ? item["vaultCertificates"]
      : vaultCertificateArraySerializer(item["vaultCertificates"]),
  };
}

export function vaultSecretGroupDeserializer(item: any): VaultSecretGroup {
  return {
    sourceVault: !item["sourceVault"]
      ? item["sourceVault"]
      : subResourceDeserializer(item["sourceVault"]),
    vaultCertificates: !item["vaultCertificates"]
      ? item["vaultCertificates"]
      : vaultCertificateArrayDeserializer(item["vaultCertificates"]),
  };
}

/** model interface SubResource */
export interface SubResource {
  /** Resource Id */
  id?: string;
}

export function subResourceSerializer(item: SubResource): any {
  return { id: item["id"] };
}

export function subResourceDeserializer(item: any): SubResource {
  return {
    id: item["id"],
  };
}

export function vaultCertificateArraySerializer(result: Array<VaultCertificate>): any[] {
  return result.map((item) => {
    return vaultCertificateSerializer(item);
  });
}

export function vaultCertificateArrayDeserializer(result: Array<VaultCertificate>): any[] {
  return result.map((item) => {
    return vaultCertificateDeserializer(item);
  });
}

/** Describes a single certificate reference in a Key Vault, and where the certificate should reside on the VM. */
export interface VaultCertificate {
  /** This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be It is the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  certificateUrl?: string;
  /** For Windows VMs, specifies the certificate store on the Virtual Machine to which the certificate should be added. The specified certificate store is implicitly in the LocalMachine account. For Linux VMs, the certificate file is placed under the /var/lib/waagent directory, with the file name &lt;UppercaseThumbprint&gt;.crt for the X509 certificate file and &lt;UppercaseThumbprint&gt;.prv for private key. Both of these files are .pem formatted. */
  certificateStore?: string;
}

export function vaultCertificateSerializer(item: VaultCertificate): any {
  return {
    certificateUrl: item["certificateUrl"],
    certificateStore: item["certificateStore"],
  };
}

export function vaultCertificateDeserializer(item: any): VaultCertificate {
  return {
    certificateUrl: item["certificateUrl"],
    certificateStore: item["certificateStore"],
  };
}

/** Describes a virtual machine scale set storage profile. */
export interface VirtualMachineScaleSetStorageProfile {
  /** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. */
  imageReference?: ImageReference;
  /** Specifies information about the operating system disk used by the virtual machines in the scale set. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  osDisk?: VirtualMachineScaleSetOSDisk;
  /** Specifies the parameters that are used to add data disks to the virtual machines in the scale set. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  dataDisks?: VirtualMachineScaleSetDataDisk[];
  /** Specifies the disk controller type configured for the virtual machines in the scale set. Minimum api-version: 2022-08-01 */
  diskControllerType?: DiskControllerTypes;
}

export function virtualMachineScaleSetStorageProfileSerializer(
  item: VirtualMachineScaleSetStorageProfile,
): any {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceSerializer(item["imageReference"]),
    osDisk: !item["osDisk"]
      ? item["osDisk"]
      : virtualMachineScaleSetOSDiskSerializer(item["osDisk"]),
    dataDisks: !item["dataDisks"]
      ? item["dataDisks"]
      : virtualMachineScaleSetDataDiskArraySerializer(item["dataDisks"]),
    diskControllerType: item["diskControllerType"],
  };
}

export function virtualMachineScaleSetStorageProfileDeserializer(
  item: any,
): VirtualMachineScaleSetStorageProfile {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceDeserializer(item["imageReference"]),
    osDisk: !item["osDisk"]
      ? item["osDisk"]
      : virtualMachineScaleSetOSDiskDeserializer(item["osDisk"]),
    dataDisks: !item["dataDisks"]
      ? item["dataDisks"]
      : virtualMachineScaleSetDataDiskArrayDeserializer(item["dataDisks"]),
    diskControllerType: item["diskControllerType"],
  };
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
  /** Specifies in decimal numbers, the version of platform image or marketplace image used to create the virtual machine. This readonly field differs from 'version', only if the value specified in 'version' field is 'latest'. */
  readonly exactVersion?: string;
  /** Specified the shared gallery image unique id for vm deployment. This can be fetched from shared gallery image GET call. */
  sharedGalleryImageId?: string;
  /** Specified the community gallery image unique id for vm deployment. This can be fetched from community gallery image GET call. */
  communityGalleryImageId?: string;
}

export function imageReferenceSerializer(item: ImageReference): any {
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

export function imageReferenceDeserializer(item: any): ImageReference {
  return {
    id: item["id"],
    publisher: item["publisher"],
    offer: item["offer"],
    sku: item["sku"],
    version: item["version"],
    exactVersion: item["exactVersion"],
    sharedGalleryImageId: item["sharedGalleryImageId"],
    communityGalleryImageId: item["communityGalleryImageId"],
  };
}

/** Describes a virtual machine scale set operating system disk. */
export interface VirtualMachineScaleSetOSDisk {
  /** The disk name. */
  name?: string;
  /** Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The default values are: **None for Standard storage. ReadOnly for Premium storage.** */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies how the virtual machines in the scale set should be created. The only allowed value is: **FromImage.** This value is used when you are using an image to create the virtual machine. If you are using a platform image, you also use the imageReference element described above. If you are using a marketplace image, you  also use the plan element previously described. */
  createOption: DiskCreateOptionTypes;
  /** Specifies the ephemeral disk Settings for the operating system disk used by the virtual machine scale set. */
  diffDiskSettings?: DiffDiskSettings;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023. */
  diskSizeGB?: number;
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. Possible values are: **Windows,** **Linux.** */
  osType?: OperatingSystemTypes;
  /** Specifies information about the unmanaged user image to base the scale set on. */
  image?: VirtualHardDisk;
  /** Specifies the container urls that are used to store operating system disks for the scale set. */
  vhdContainers?: string[];
  /** The managed disk parameters. */
  managedDisk?: VirtualMachineScaleSetManagedDiskParameters;
  /** Specifies whether OS Disk should be deleted or detached upon VMSS Flex deletion (This feature is available for VMSS with Flexible OrchestrationMode only). <br><br> Possible values: <br><br> **Delete** If this value is used, the OS disk is deleted when VMSS Flex VM is deleted.<br><br> **Detach** If this value is used, the OS disk is retained after VMSS Flex VM is deleted. <br><br> The default value is set to **Delete**. For an Ephemeral OS Disk, the default value is set to **Delete**. User cannot change the delete option for Ephemeral OS Disk. */
  deleteOption?: DiskDeleteOptionTypes;
}

export function virtualMachineScaleSetOSDiskSerializer(item: VirtualMachineScaleSetOSDisk): any {
  return {
    name: item["name"],
    caching: item["caching"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
    createOption: item["createOption"],
    diffDiskSettings: !item["diffDiskSettings"]
      ? item["diffDiskSettings"]
      : diffDiskSettingsSerializer(item["diffDiskSettings"]),
    diskSizeGB: item["diskSizeGB"],
    osType: item["osType"],
    image: !item["image"] ? item["image"] : virtualHardDiskSerializer(item["image"]),
    vhdContainers: !item["vhdContainers"]
      ? item["vhdContainers"]
      : item["vhdContainers"].map((p: any) => {
          return p;
        }),
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : virtualMachineScaleSetManagedDiskParametersSerializer(item["managedDisk"]),
    deleteOption: item["deleteOption"],
  };
}

export function virtualMachineScaleSetOSDiskDeserializer(item: any): VirtualMachineScaleSetOSDisk {
  return {
    name: item["name"],
    caching: item["caching"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
    createOption: item["createOption"],
    diffDiskSettings: !item["diffDiskSettings"]
      ? item["diffDiskSettings"]
      : diffDiskSettingsDeserializer(item["diffDiskSettings"]),
    diskSizeGB: item["diskSizeGB"],
    osType: item["osType"],
    image: !item["image"] ? item["image"] : virtualHardDiskDeserializer(item["image"]),
    vhdContainers: !item["vhdContainers"]
      ? item["vhdContainers"]
      : item["vhdContainers"].map((p: any) => {
          return p;
        }),
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : virtualMachineScaleSetManagedDiskParametersDeserializer(item["managedDisk"]),
    deleteOption: item["deleteOption"],
  };
}

/** Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The default values are: **None for Standard storage. ReadOnly for Premium storage** */
export type CachingTypes = "None" | "ReadOnly" | "ReadWrite";

/** Specifies how the virtual machine disk should be created. Possible values are **Attach:** This value is used when you are using a specialized disk to create the virtual machine. **FromImage:** This value is used when you are using an image to create the virtual machine. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described. **Empty:** This value is used when creating an empty data disk. **Copy:** This value is used to create a data disk from a snapshot or another disk. **Restore:** This value is used to create a data disk from a disk restore point. */
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
 * Specifies how the virtual machine disk should be created. Possible values are **Attach:** This value is used when you are using a specialized disk to create the virtual machine. **FromImage:** This value is used when you are using an image to create the virtual machine. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described. **Empty:** This value is used when creating an empty data disk. **Copy:** This value is used to create a data disk from a snapshot or another disk. **Restore:** This value is used to create a data disk from a disk restore point. \
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

/** Describes the parameters of ephemeral disk settings that can be specified for operating system disk. **Note:** The ephemeral disk settings can only be specified for managed disk. */
export interface DiffDiskSettings {
  /** Specifies the ephemeral disk settings for operating system disk. */
  option?: DiffDiskOptions;
  /** Specifies the ephemeral disk placement for operating system disk. Possible values are: **CacheDisk,** **ResourceDisk,** **NvmeDisk.** The defaulting behavior is: **CacheDisk** if one is configured for the VM size otherwise **ResourceDisk** or **NvmeDisk** is used. Refer to the VM size documentation for Windows VM at https://docs.microsoft.com/azure/virtual-machines/windows/sizes and Linux VM at https://docs.microsoft.com/azure/virtual-machines/linux/sizes to check which VM sizes exposes a cache disk. Minimum api-version for NvmeDisk: 2024-03-01. */
  placement?: DiffDiskPlacement;
}

export function diffDiskSettingsSerializer(item: DiffDiskSettings): any {
  return { option: item["option"], placement: item["placement"] };
}

export function diffDiskSettingsDeserializer(item: any): DiffDiskSettings {
  return {
    option: item["option"],
    placement: item["placement"],
  };
}

/** Specifies the ephemeral disk option for operating system disk. */
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

/** Specifies the ephemeral disk placement for operating system disk. This property can be used by user in the request to choose the location i.e, cache disk, resource disk or nvme disk space for Ephemeral OS disk provisioning. For more information on Ephemeral OS disk size requirements, please refer Ephemeral OS disk size requirements for Windows VM at https://docs.microsoft.com/azure/virtual-machines/windows/ephemeral-os-disks#size-requirements and Linux VM at https://docs.microsoft.com/azure/virtual-machines/linux/ephemeral-os-disks#size-requirements. Minimum api-version for NvmeDisk: 2024-03-01. */
export enum KnownDiffDiskPlacement {
  /** CacheDisk */
  CacheDisk = "CacheDisk",
  /** ResourceDisk */
  ResourceDisk = "ResourceDisk",
  /** NvmeDisk */
  NvmeDisk = "NvmeDisk",
}

/**
 * Specifies the ephemeral disk placement for operating system disk. This property can be used by user in the request to choose the location i.e, cache disk, resource disk or nvme disk space for Ephemeral OS disk provisioning. For more information on Ephemeral OS disk size requirements, please refer Ephemeral OS disk size requirements for Windows VM at https://docs.microsoft.com/azure/virtual-machines/windows/ephemeral-os-disks#size-requirements and Linux VM at https://docs.microsoft.com/azure/virtual-machines/linux/ephemeral-os-disks#size-requirements. Minimum api-version for NvmeDisk: 2024-03-01. \
 * {@link KnownDiffDiskPlacement} can be used interchangeably with DiffDiskPlacement,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CacheDisk** \
 * **ResourceDisk** \
 * **NvmeDisk**
 */
export type DiffDiskPlacement = string;
/** This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. Possible values are: **Windows,** **Linux.** */
export type OperatingSystemTypes = "Windows" | "Linux";

/** Describes the uri of a disk. */
export interface VirtualHardDisk {
  /** Specifies the virtual hard disk's uri. */
  uri?: string;
}

export function virtualHardDiskSerializer(item: VirtualHardDisk): any {
  return { uri: item["uri"] };
}

export function virtualHardDiskDeserializer(item: any): VirtualHardDisk {
  return {
    uri: item["uri"],
  };
}

/** Describes the parameters of a ScaleSet managed disk. */
export interface VirtualMachineScaleSetManagedDiskParameters {
  /** Specifies the storage account type for the managed disk. NOTE: UltraSSD_LRS can only be used with data disks, it cannot be used with OS Disk. */
  storageAccountType?: StorageAccountTypes;
  /** Specifies the customer managed disk encryption set resource id for the managed disk. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
  /** Specifies the security profile for the managed disk. */
  securityProfile?: VMDiskSecurityProfile;
}

export function virtualMachineScaleSetManagedDiskParametersSerializer(
  item: VirtualMachineScaleSetManagedDiskParameters,
): any {
  return {
    storageAccountType: item["storageAccountType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersSerializer(item["diskEncryptionSet"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : vmDiskSecurityProfileSerializer(item["securityProfile"]),
  };
}

export function virtualMachineScaleSetManagedDiskParametersDeserializer(
  item: any,
): VirtualMachineScaleSetManagedDiskParameters {
  return {
    storageAccountType: item["storageAccountType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersDeserializer(item["diskEncryptionSet"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : vmDiskSecurityProfileDeserializer(item["securityProfile"]),
  };
}

/** Specifies the storage account type for the managed disk. Managed OS disk storage account type can only be set when you create the scale set. NOTE: UltraSSD_LRS can only be used with data disks. It cannot be used with OS Disk. Standard_LRS uses Standard HDD. StandardSSD_LRS uses Standard SSD. Premium_LRS uses Premium SSD. UltraSSD_LRS uses Ultra disk. Premium_ZRS uses Premium SSD zone redundant storage. StandardSSD_ZRS uses Standard SSD zone redundant storage. For more information regarding disks supported for Windows Virtual Machines, refer to https://docs.microsoft.com/azure/virtual-machines/windows/disks-types and, for Linux Virtual Machines, refer to https://docs.microsoft.com/azure/virtual-machines/linux/disks-types */
export enum KnownStorageAccountTypes {
  /** Standard_LRS */
  StandardLRS = "Standard_LRS",
  /** Premium_LRS */
  PremiumLRS = "Premium_LRS",
  /** StandardSSD_LRS */
  StandardSSDLRS = "StandardSSD_LRS",
  /** UltraSSD_LRS */
  UltraSSDLRS = "UltraSSD_LRS",
  /** Premium_ZRS */
  PremiumZRS = "Premium_ZRS",
  /** StandardSSD_ZRS */
  StandardSSDZRS = "StandardSSD_ZRS",
  /** PremiumV2_LRS */
  PremiumV2LRS = "PremiumV2_LRS",
}

/**
 * Specifies the storage account type for the managed disk. Managed OS disk storage account type can only be set when you create the scale set. NOTE: UltraSSD_LRS can only be used with data disks. It cannot be used with OS Disk. Standard_LRS uses Standard HDD. StandardSSD_LRS uses Standard SSD. Premium_LRS uses Premium SSD. UltraSSD_LRS uses Ultra disk. Premium_ZRS uses Premium SSD zone redundant storage. StandardSSD_ZRS uses Standard SSD zone redundant storage. For more information regarding disks supported for Windows Virtual Machines, refer to https://docs.microsoft.com/azure/virtual-machines/windows/disks-types and, for Linux Virtual Machines, refer to https://docs.microsoft.com/azure/virtual-machines/linux/disks-types \
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

/** Describes the parameter of customer managed disk encryption set resource id that can be specified for disk. **Note:** The disk encryption set resource id can only be specified for managed disk. Please refer https://aka.ms/mdssewithcmkoverview for more details. */
export interface DiskEncryptionSetParameters extends SubResource {}

export function diskEncryptionSetParametersSerializer(item: DiskEncryptionSetParameters): any {
  return { id: item["id"] };
}

export function diskEncryptionSetParametersDeserializer(item: any): DiskEncryptionSetParameters {
  return {
    id: item["id"],
  };
}

/** Specifies the security profile settings for the managed disk. **Note:** It can only be set for Confidential VMs. */
export interface VMDiskSecurityProfile {
  /** Specifies the EncryptionType of the managed disk. It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob, VMGuestStateOnly for encryption of just the VMGuestState blob, and NonPersistedTPM for not persisting firmware state in the VMGuestState blob.. **Note:** It can be set for only Confidential VMs. */
  securityEncryptionType?: SecurityEncryptionTypes;
  /** Specifies the customer managed disk encryption set resource id for the managed disk that is used for Customer Managed Key encrypted ConfidentialVM OS Disk and VMGuest blob. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
}

export function vmDiskSecurityProfileSerializer(item: VMDiskSecurityProfile): any {
  return {
    securityEncryptionType: item["securityEncryptionType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersSerializer(item["diskEncryptionSet"]),
  };
}

export function vmDiskSecurityProfileDeserializer(item: any): VMDiskSecurityProfile {
  return {
    securityEncryptionType: item["securityEncryptionType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersDeserializer(item["diskEncryptionSet"]),
  };
}

/** Specifies the EncryptionType of the managed disk. It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob, VMGuestStateOnly for encryption of just the VMGuestState blob, and NonPersistedTPM for not persisting firmware state in the VMGuestState blob.. **Note:** It can be set for only Confidential VMs. */
export enum KnownSecurityEncryptionTypes {
  /** VMGuestStateOnly */
  VMGuestStateOnly = "VMGuestStateOnly",
  /** DiskWithVMGuestState */
  DiskWithVMGuestState = "DiskWithVMGuestState",
  /** NonPersistedTPM */
  NonPersistedTPM = "NonPersistedTPM",
}

/**
 * Specifies the EncryptionType of the managed disk. It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob, VMGuestStateOnly for encryption of just the VMGuestState blob, and NonPersistedTPM for not persisting firmware state in the VMGuestState blob.. **Note:** It can be set for only Confidential VMs. \
 * {@link KnownSecurityEncryptionTypes} can be used interchangeably with SecurityEncryptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VMGuestStateOnly** \
 * **DiskWithVMGuestState** \
 * **NonPersistedTPM**
 */
export type SecurityEncryptionTypes = string;

/** Specifies the behavior of the managed disk when the VM gets deleted, for example whether the managed disk is deleted or detached. Supported values are: **Delete.** If this value is used, the managed disk is deleted when VM gets deleted. **Detach.** If this value is used, the managed disk is retained after VM gets deleted. Minimum api-version: 2021-03-01. */
export enum KnownDiskDeleteOptionTypes {
  /** Delete */
  Delete = "Delete",
  /** Detach */
  Detach = "Detach",
}

/**
 * Specifies the behavior of the managed disk when the VM gets deleted, for example whether the managed disk is deleted or detached. Supported values are: **Delete.** If this value is used, the managed disk is deleted when VM gets deleted. **Detach.** If this value is used, the managed disk is retained after VM gets deleted. Minimum api-version: 2021-03-01. \
 * {@link KnownDiskDeleteOptionTypes} can be used interchangeably with DiskDeleteOptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete** \
 * **Detach**
 */
export type DiskDeleteOptionTypes = string;

export function virtualMachineScaleSetDataDiskArraySerializer(
  result: Array<VirtualMachineScaleSetDataDisk>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetDataDiskSerializer(item);
  });
}

export function virtualMachineScaleSetDataDiskArrayDeserializer(
  result: Array<VirtualMachineScaleSetDataDisk>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetDataDiskDeserializer(item);
  });
}

/** Describes a virtual machine scale set data disk. */
export interface VirtualMachineScaleSetDataDisk {
  /** The disk name. */
  name?: string;
  /** Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. */
  lun: number;
  /** Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The default values are: **None for Standard storage. ReadOnly for Premium storage.** */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** The create option. */
  createOption: DiskCreateOptionTypes;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property diskSizeGB is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023. */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: VirtualMachineScaleSetManagedDiskParameters;
  /** Specifies the Read-Write IOPS for the managed disk. Should be used only when StorageAccountType is UltraSSD_LRS. If not specified, a default value would be assigned based on diskSizeGB. */
  diskIopsReadWrite?: number;
  /** Specifies the bandwidth in MB per second for the managed disk. Should be used only when StorageAccountType is UltraSSD_LRS. If not specified, a default value would be assigned based on diskSizeGB. */
  diskMBpsReadWrite?: number;
  /** Specifies whether data disk should be deleted or detached upon VMSS Flex deletion (This feature is available for VMSS with Flexible OrchestrationMode only).<br><br> Possible values: <br><br> **Delete** If this value is used, the data disk is deleted when the VMSS Flex VM is deleted.<br><br> **Detach** If this value is used, the data disk is retained after VMSS Flex VM is deleted.<br><br> The default value is set to **Delete**. */
  deleteOption?: DiskDeleteOptionTypes;
}

export function virtualMachineScaleSetDataDiskSerializer(
  item: VirtualMachineScaleSetDataDisk,
): any {
  return {
    name: item["name"],
    lun: item["lun"],
    caching: item["caching"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
    createOption: item["createOption"],
    diskSizeGB: item["diskSizeGB"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : virtualMachineScaleSetManagedDiskParametersSerializer(item["managedDisk"]),
    diskIOPSReadWrite: item["diskIopsReadWrite"],
    diskMBpsReadWrite: item["diskMBpsReadWrite"],
    deleteOption: item["deleteOption"],
  };
}

export function virtualMachineScaleSetDataDiskDeserializer(
  item: any,
): VirtualMachineScaleSetDataDisk {
  return {
    name: item["name"],
    lun: item["lun"],
    caching: item["caching"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
    createOption: item["createOption"],
    diskSizeGB: item["diskSizeGB"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : virtualMachineScaleSetManagedDiskParametersDeserializer(item["managedDisk"]),
    diskIopsReadWrite: item["diskIOPSReadWrite"],
    diskMBpsReadWrite: item["diskMBpsReadWrite"],
    deleteOption: item["deleteOption"],
  };
}

/** Specifies the disk controller type configured for the VM and VirtualMachineScaleSet. This property is only supported for virtual machines whose operating system disk and VM sku supports Generation 2 (https://docs.microsoft.com/en-us/azure/virtual-machines/generation-2), please check the HyperVGenerations capability returned as part of VM sku capabilities in the response of Microsoft.Compute SKUs api for the region contains V2 (https://docs.microsoft.com/rest/api/compute/resourceskus/list). For more information about Disk Controller Types supported please refer to https://aka.ms/azure-diskcontrollertypes. */
export enum KnownDiskControllerTypes {
  /** SCSI */
  Scsi = "SCSI",
  /** NVMe */
  NVMe = "NVMe",
}

/**
 * Specifies the disk controller type configured for the VM and VirtualMachineScaleSet. This property is only supported for virtual machines whose operating system disk and VM sku supports Generation 2 (https://docs.microsoft.com/en-us/azure/virtual-machines/generation-2), please check the HyperVGenerations capability returned as part of VM sku capabilities in the response of Microsoft.Compute SKUs api for the region contains V2 (https://docs.microsoft.com/rest/api/compute/resourceskus/list). For more information about Disk Controller Types supported please refer to https://aka.ms/azure-diskcontrollertypes. \
 * {@link KnownDiskControllerTypes} can be used interchangeably with DiskControllerTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SCSI** \
 * **NVMe**
 */
export type DiskControllerTypes = string;

/** Describes a virtual machine scale set network profile. */
export interface VirtualMachineScaleSetNetworkProfile {
  /** A reference to a load balancer probe used to determine the health of an instance in the virtual machine scale set. The reference will be in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes/{probeName}'. */
  healthProbe?: ApiEntityReference;
  /** The list of network configurations. */
  networkInterfaceConfigurations?: VirtualMachineScaleSetNetworkConfiguration[];
  /** specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations for Virtual Machine Scale Set with orchestration mode 'Flexible' */
  networkApiVersion?: NetworkApiVersion;
}

export function virtualMachineScaleSetNetworkProfileSerializer(
  item: VirtualMachineScaleSetNetworkProfile,
): any {
  return {
    healthProbe: !item["healthProbe"]
      ? item["healthProbe"]
      : apiEntityReferenceSerializer(item["healthProbe"]),
    networkInterfaceConfigurations: !item["networkInterfaceConfigurations"]
      ? item["networkInterfaceConfigurations"]
      : virtualMachineScaleSetNetworkConfigurationArraySerializer(
          item["networkInterfaceConfigurations"],
        ),
    networkApiVersion: item["networkApiVersion"],
  };
}

export function virtualMachineScaleSetNetworkProfileDeserializer(
  item: any,
): VirtualMachineScaleSetNetworkProfile {
  return {
    healthProbe: !item["healthProbe"]
      ? item["healthProbe"]
      : apiEntityReferenceDeserializer(item["healthProbe"]),
    networkInterfaceConfigurations: !item["networkInterfaceConfigurations"]
      ? item["networkInterfaceConfigurations"]
      : virtualMachineScaleSetNetworkConfigurationArrayDeserializer(
          item["networkInterfaceConfigurations"],
        ),
    networkApiVersion: item["networkApiVersion"],
  };
}

/** The API entity reference. */
export interface ApiEntityReference {
  /** The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/... */
  id?: string;
}

export function apiEntityReferenceSerializer(item: ApiEntityReference): any {
  return { id: item["id"] };
}

export function apiEntityReferenceDeserializer(item: any): ApiEntityReference {
  return {
    id: item["id"],
  };
}

export function virtualMachineScaleSetNetworkConfigurationArraySerializer(
  result: Array<VirtualMachineScaleSetNetworkConfiguration>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetNetworkConfigurationSerializer(item);
  });
}

export function virtualMachineScaleSetNetworkConfigurationArrayDeserializer(
  result: Array<VirtualMachineScaleSetNetworkConfiguration>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetNetworkConfigurationDeserializer(item);
  });
}

/** Describes a virtual machine scale set network profile's network configurations. */
export interface VirtualMachineScaleSetNetworkConfiguration {
  /** The network configuration name. */
  name: string;
  /** Describes a virtual machine scale set network profile's IP configuration. */
  properties?: VirtualMachineScaleSetNetworkConfigurationProperties;
  /** Resource tags applied to the networkInterface address created by this NetworkInterfaceConfiguration */
  tags?: Record<string, string>;
}

export function virtualMachineScaleSetNetworkConfigurationSerializer(
  item: VirtualMachineScaleSetNetworkConfiguration,
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetNetworkConfigurationPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function virtualMachineScaleSetNetworkConfigurationDeserializer(
  item: any,
): VirtualMachineScaleSetNetworkConfiguration {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetNetworkConfigurationPropertiesDeserializer(item["properties"]),
    tags: item["tags"],
  };
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
  ipConfigurations: VirtualMachineScaleSetIPConfiguration[];
  /** Whether IP forwarding enabled on this NIC. */
  enableIPForwarding?: boolean;
  /** Specify what happens to the network interface when the VM is deleted */
  deleteOption?: DeleteOptions;
  /** Specifies whether the Auxiliary mode is enabled for the Network Interface resource. */
  auxiliaryMode?: NetworkInterfaceAuxiliaryMode;
  /** Specifies whether the Auxiliary sku is enabled for the Network Interface resource. */
  auxiliarySku?: NetworkInterfaceAuxiliarySku;
}

export function virtualMachineScaleSetNetworkConfigurationPropertiesSerializer(
  item: VirtualMachineScaleSetNetworkConfigurationProperties,
): any {
  return {
    primary: item["primary"],
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    disableTcpStateTracking: item["disableTcpStateTracking"],
    enableFpga: item["enableFpga"],
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : subResourceSerializer(item["networkSecurityGroup"]),
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : virtualMachineScaleSetNetworkConfigurationDnsSettingsSerializer(item["dnsSettings"]),
    ipConfigurations: virtualMachineScaleSetIPConfigurationArraySerializer(
      item["ipConfigurations"],
    ),
    enableIPForwarding: item["enableIPForwarding"],
    deleteOption: item["deleteOption"],
    auxiliaryMode: item["auxiliaryMode"],
    auxiliarySku: item["auxiliarySku"],
  };
}

export function virtualMachineScaleSetNetworkConfigurationPropertiesDeserializer(
  item: any,
): VirtualMachineScaleSetNetworkConfigurationProperties {
  return {
    primary: item["primary"],
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    disableTcpStateTracking: item["disableTcpStateTracking"],
    enableFpga: item["enableFpga"],
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : subResourceDeserializer(item["networkSecurityGroup"]),
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : virtualMachineScaleSetNetworkConfigurationDnsSettingsDeserializer(item["dnsSettings"]),
    ipConfigurations: virtualMachineScaleSetIPConfigurationArrayDeserializer(
      item["ipConfigurations"],
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
): any {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
  };
}

export function virtualMachineScaleSetNetworkConfigurationDnsSettingsDeserializer(
  item: any,
): VirtualMachineScaleSetNetworkConfigurationDnsSettings {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
  };
}

export function virtualMachineScaleSetIPConfigurationArraySerializer(
  result: Array<VirtualMachineScaleSetIPConfiguration>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetIPConfigurationSerializer(item);
  });
}

export function virtualMachineScaleSetIPConfigurationArrayDeserializer(
  result: Array<VirtualMachineScaleSetIPConfiguration>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetIPConfigurationDeserializer(item);
  });
}

/** Describes a virtual machine scale set network profile's IP configuration. */
export interface VirtualMachineScaleSetIPConfiguration {
  /** The IP configuration name. */
  name: string;
  /** Describes a virtual machine scale set network profile's IP configuration properties. */
  properties?: VirtualMachineScaleSetIPConfigurationProperties;
}

export function virtualMachineScaleSetIPConfigurationSerializer(
  item: VirtualMachineScaleSetIPConfiguration,
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetIPConfigurationPropertiesSerializer(item["properties"]),
  };
}

export function virtualMachineScaleSetIPConfigurationDeserializer(
  item: any,
): VirtualMachineScaleSetIPConfiguration {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetIPConfigurationPropertiesDeserializer(item["properties"]),
  };
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
  privateIPAddressVersion?: IPVersion;
  /** Specifies an array of references to backend address pools of application gateways. A scale set can reference backend address pools of multiple application gateways. Multiple scale sets cannot use the same application gateway. */
  applicationGatewayBackendAddressPools?: SubResource[];
  /** Specifies an array of references to application security group. */
  applicationSecurityGroups?: SubResource[];
  /** Specifies an array of references to backend address pools of load balancers. A scale set can reference backend address pools of one public and one internal load balancer. Multiple scale sets cannot use the same basic sku load balancer. */
  loadBalancerBackendAddressPools?: SubResource[];
  /** Specifies an array of references to inbound Nat pools of the load balancers. A scale set can reference inbound nat pools of one public and one internal load balancer. Multiple scale sets cannot use the same basic sku load balancer. */
  loadBalancerInboundNatPools?: SubResource[];
}

export function virtualMachineScaleSetIPConfigurationPropertiesSerializer(
  item: VirtualMachineScaleSetIPConfigurationProperties,
): any {
  return {
    subnet: !item["subnet"] ? item["subnet"] : apiEntityReferenceSerializer(item["subnet"]),
    primary: item["primary"],
    publicIPAddressConfiguration: !item["publicIPAddressConfiguration"]
      ? item["publicIPAddressConfiguration"]
      : virtualMachineScaleSetPublicIPAddressConfigurationSerializer(
          item["publicIPAddressConfiguration"],
        ),
    privateIPAddressVersion: item["privateIPAddressVersion"],
    applicationGatewayBackendAddressPools: !item["applicationGatewayBackendAddressPools"]
      ? item["applicationGatewayBackendAddressPools"]
      : subResourceArraySerializer(item["applicationGatewayBackendAddressPools"]),
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : subResourceArraySerializer(item["applicationSecurityGroups"]),
    loadBalancerBackendAddressPools: !item["loadBalancerBackendAddressPools"]
      ? item["loadBalancerBackendAddressPools"]
      : subResourceArraySerializer(item["loadBalancerBackendAddressPools"]),
    loadBalancerInboundNatPools: !item["loadBalancerInboundNatPools"]
      ? item["loadBalancerInboundNatPools"]
      : subResourceArraySerializer(item["loadBalancerInboundNatPools"]),
  };
}

export function virtualMachineScaleSetIPConfigurationPropertiesDeserializer(
  item: any,
): VirtualMachineScaleSetIPConfigurationProperties {
  return {
    subnet: !item["subnet"] ? item["subnet"] : apiEntityReferenceDeserializer(item["subnet"]),
    primary: item["primary"],
    publicIPAddressConfiguration: !item["publicIPAddressConfiguration"]
      ? item["publicIPAddressConfiguration"]
      : virtualMachineScaleSetPublicIPAddressConfigurationDeserializer(
          item["publicIPAddressConfiguration"],
        ),
    privateIPAddressVersion: item["privateIPAddressVersion"],
    applicationGatewayBackendAddressPools: !item["applicationGatewayBackendAddressPools"]
      ? item["applicationGatewayBackendAddressPools"]
      : subResourceArrayDeserializer(item["applicationGatewayBackendAddressPools"]),
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : subResourceArrayDeserializer(item["applicationSecurityGroups"]),
    loadBalancerBackendAddressPools: !item["loadBalancerBackendAddressPools"]
      ? item["loadBalancerBackendAddressPools"]
      : subResourceArrayDeserializer(item["loadBalancerBackendAddressPools"]),
    loadBalancerInboundNatPools: !item["loadBalancerInboundNatPools"]
      ? item["loadBalancerInboundNatPools"]
      : subResourceArrayDeserializer(item["loadBalancerInboundNatPools"]),
  };
}

/** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
export interface VirtualMachineScaleSetPublicIPAddressConfiguration {
  /** The publicIP address configuration name. */
  name: string;
  /** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
  properties?: VirtualMachineScaleSetPublicIPAddressConfigurationProperties;
  /** Describes the public IP Sku. It can only be set with OrchestrationMode as Flexible. */
  sku?: PublicIPAddressSku;
  /** Resource tags applied to the publicIP address created by this PublicIPAddressConfiguration */
  tags?: Record<string, string>;
}

export function virtualMachineScaleSetPublicIPAddressConfigurationSerializer(
  item: VirtualMachineScaleSetPublicIPAddressConfiguration,
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetPublicIPAddressConfigurationPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : publicIPAddressSkuSerializer(item["sku"]),
    tags: item["tags"],
  };
}

export function virtualMachineScaleSetPublicIPAddressConfigurationDeserializer(
  item: any,
): VirtualMachineScaleSetPublicIPAddressConfiguration {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetPublicIPAddressConfigurationPropertiesDeserializer(
          item["properties"],
        ),
    sku: !item["sku"] ? item["sku"] : publicIPAddressSkuDeserializer(item["sku"]),
    tags: item["tags"],
  };
}

/** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
export interface VirtualMachineScaleSetPublicIPAddressConfigurationProperties {
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
  /** Specify what happens to the public IP when the VM is deleted */
  deleteOption?: DeleteOptions;
}

export function virtualMachineScaleSetPublicIPAddressConfigurationPropertiesSerializer(
  item: VirtualMachineScaleSetPublicIPAddressConfigurationProperties,
): any {
  return {
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : virtualMachineScaleSetPublicIPAddressConfigurationDnsSettingsSerializer(
          item["dnsSettings"],
        ),
    ipTags: !item["ipTags"]
      ? item["ipTags"]
      : virtualMachineScaleSetIpTagArraySerializer(item["ipTags"]),
    publicIPPrefix: !item["publicIPPrefix"]
      ? item["publicIPPrefix"]
      : subResourceSerializer(item["publicIPPrefix"]),
    publicIPAddressVersion: item["publicIPAddressVersion"],
    deleteOption: item["deleteOption"],
  };
}

export function virtualMachineScaleSetPublicIPAddressConfigurationPropertiesDeserializer(
  item: any,
): VirtualMachineScaleSetPublicIPAddressConfigurationProperties {
  return {
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : virtualMachineScaleSetPublicIPAddressConfigurationDnsSettingsDeserializer(
          item["dnsSettings"],
        ),
    ipTags: !item["ipTags"]
      ? item["ipTags"]
      : virtualMachineScaleSetIpTagArrayDeserializer(item["ipTags"]),
    publicIPPrefix: !item["publicIPPrefix"]
      ? item["publicIPPrefix"]
      : subResourceDeserializer(item["publicIPPrefix"]),
    publicIPAddressVersion: item["publicIPAddressVersion"],
    deleteOption: item["deleteOption"],
  };
}

/** Describes a virtual machines scale sets network configuration's DNS settings. */
export interface VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings {
  /** The Domain name label.The concatenation of the domain name label and vm index will be the domain name labels of the PublicIPAddress resources that will be created */
  domainNameLabel: string;
  /** The Domain name label scope.The concatenation of the hashed domain name label that generated according to the policy from domain name label scope and vm index will be the domain name labels of the PublicIPAddress resources that will be created */
  domainNameLabelScope?: DomainNameLabelScopeTypes;
}

export function virtualMachineScaleSetPublicIPAddressConfigurationDnsSettingsSerializer(
  item: VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings,
): any {
  return {
    domainNameLabel: item["domainNameLabel"],
    domainNameLabelScope: item["domainNameLabelScope"],
  };
}

export function virtualMachineScaleSetPublicIPAddressConfigurationDnsSettingsDeserializer(
  item: any,
): VirtualMachineScaleSetPublicIPAddressConfigurationDnsSettings {
  return {
    domainNameLabel: item["domainNameLabel"],
    domainNameLabelScope: item["domainNameLabelScope"],
  };
}

/** The Domain name label scope.The concatenation of the hashed domain name label that generated according to the policy from domain name label scope and vm index will be the domain name labels of the PublicIPAddress resources that will be created */
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
 * The Domain name label scope.The concatenation of the hashed domain name label that generated according to the policy from domain name label scope and vm index will be the domain name labels of the PublicIPAddress resources that will be created \
 * {@link KnownDomainNameLabelScopeTypes} can be used interchangeably with DomainNameLabelScopeTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TenantReuse** \
 * **SubscriptionReuse** \
 * **ResourceGroupReuse** \
 * **NoReuse**
 */
export type DomainNameLabelScopeTypes = string;

export function virtualMachineScaleSetIpTagArraySerializer(
  result: Array<VirtualMachineScaleSetIpTag>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetIpTagSerializer(item);
  });
}

export function virtualMachineScaleSetIpTagArrayDeserializer(
  result: Array<VirtualMachineScaleSetIpTag>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetIpTagDeserializer(item);
  });
}

/** Contains the IP tag associated with the public IP address. */
export interface VirtualMachineScaleSetIpTag {
  /** IP tag type. Example: FirstPartyUsage. */
  ipTagType?: string;
  /** IP tag associated with the public IP. Example: SQL, Storage etc. */
  tag?: string;
}

export function virtualMachineScaleSetIpTagSerializer(item: VirtualMachineScaleSetIpTag): any {
  return { ipTagType: item["ipTagType"], tag: item["tag"] };
}

export function virtualMachineScaleSetIpTagDeserializer(item: any): VirtualMachineScaleSetIpTag {
  return {
    ipTagType: item["ipTagType"],
    tag: item["tag"],
  };
}

/** Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. */
export enum KnownIPVersion {
  /** IPv4 */
  IPv4 = "IPv4",
  /** IPv6 */
  IPv6 = "IPv6",
}

/**
 * Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. \
 * {@link KnownIPVersion} can be used interchangeably with IPVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4** \
 * **IPv6**
 */
export type IPVersion = string;

/** Specify what happens to the network interface when the VM is deleted */
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

/** Describes the public IP Sku. It can only be set with OrchestrationMode as Flexible. */
export interface PublicIPAddressSku {
  /** Specify public IP sku name */
  name?: PublicIPAddressSkuName;
  /** Specify public IP sku tier */
  tier?: PublicIPAddressSkuTier;
}

export function publicIPAddressSkuSerializer(item: PublicIPAddressSku): any {
  return { name: item["name"], tier: item["tier"] };
}

export function publicIPAddressSkuDeserializer(item: any): PublicIPAddressSku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** Specify public IP sku name */
export enum KnownPublicIPAddressSkuName {
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
}

/**
 * Specify public IP sku name \
 * {@link KnownPublicIPAddressSkuName} can be used interchangeably with PublicIPAddressSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic** \
 * **Standard**
 */
export type PublicIPAddressSkuName = string;

/** Specify public IP sku tier */
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

export function subResourceArraySerializer(result: Array<SubResource>): any[] {
  return result.map((item) => {
    return subResourceSerializer(item);
  });
}

export function subResourceArrayDeserializer(result: Array<SubResource>): any[] {
  return result.map((item) => {
    return subResourceDeserializer(item);
  });
}

/** Specifies whether the Auxiliary mode is enabled for the Network Interface resource. */
export enum KnownNetworkInterfaceAuxiliaryMode {
  /** None */
  None = "None",
  /** AcceleratedConnections */
  AcceleratedConnections = "AcceleratedConnections",
  /** Floating */
  Floating = "Floating",
}

/**
 * Specifies whether the Auxiliary mode is enabled for the Network Interface resource. \
 * {@link KnownNetworkInterfaceAuxiliaryMode} can be used interchangeably with NetworkInterfaceAuxiliaryMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **AcceleratedConnections** \
 * **Floating**
 */
export type NetworkInterfaceAuxiliaryMode = string;

/** Specifies whether the Auxiliary sku is enabled for the Network Interface resource. */
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
 * Specifies whether the Auxiliary sku is enabled for the Network Interface resource. \
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

/** specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations */
export enum KnownNetworkApiVersion {
  /** 2020-11-01 */
  _20201101 = "2020-11-01",
  /** 2022-11-01 */
  _20221101 = "2022-11-01",
}

/**
 * specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations \
 * {@link KnownNetworkApiVersion} can be used interchangeably with NetworkApiVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **2020-11-01** \
 * **2022-11-01**
 */
export type NetworkApiVersion = string;

/** Specifies the Security profile settings for the virtual machine or virtual machine scale set. */
export interface SecurityProfile {
  /** Specifies the security settings like secure boot and vTPM used while creating the virtual machine. Minimum api-version: 2020-12-01. */
  uefiSettings?: UefiSettings;
  /** This property can be used by user in the request to enable or disable the Host Encryption for the virtual machine or virtual machine scale set. This will enable the encryption for all the disks including Resource/Temp disk at host itself. The default behavior is: The Encryption at host will be disabled unless this property is set to true for the resource. */
  encryptionAtHost?: boolean;
  /** Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. The default behavior is: UefiSettings will not be enabled unless this property is set. */
  securityType?: SecurityTypes;
  /** Specifies the Managed Identity used by ADE to get access token for keyvault operations. */
  encryptionIdentity?: EncryptionIdentity;
  /** Specifies ProxyAgent settings while creating the virtual machine. Minimum api-version: 2023-09-01. */
  proxyAgentSettings?: ProxyAgentSettings;
}

export function securityProfileSerializer(item: SecurityProfile): any {
  return {
    uefiSettings: !item["uefiSettings"]
      ? item["uefiSettings"]
      : uefiSettingsSerializer(item["uefiSettings"]),
    encryptionAtHost: item["encryptionAtHost"],
    securityType: item["securityType"],
    encryptionIdentity: !item["encryptionIdentity"]
      ? item["encryptionIdentity"]
      : encryptionIdentitySerializer(item["encryptionIdentity"]),
    proxyAgentSettings: !item["proxyAgentSettings"]
      ? item["proxyAgentSettings"]
      : proxyAgentSettingsSerializer(item["proxyAgentSettings"]),
  };
}

export function securityProfileDeserializer(item: any): SecurityProfile {
  return {
    uefiSettings: !item["uefiSettings"]
      ? item["uefiSettings"]
      : uefiSettingsDeserializer(item["uefiSettings"]),
    encryptionAtHost: item["encryptionAtHost"],
    securityType: item["securityType"],
    encryptionIdentity: !item["encryptionIdentity"]
      ? item["encryptionIdentity"]
      : encryptionIdentityDeserializer(item["encryptionIdentity"]),
    proxyAgentSettings: !item["proxyAgentSettings"]
      ? item["proxyAgentSettings"]
      : proxyAgentSettingsDeserializer(item["proxyAgentSettings"]),
  };
}

/** Specifies the security settings like secure boot and vTPM used while creating the virtual machine. Minimum api-version: 2020-12-01. */
export interface UefiSettings {
  /** Specifies whether secure boot should be enabled on the virtual machine. Minimum api-version: 2020-12-01. */
  secureBootEnabled?: boolean;
  /** Specifies whether vTPM should be enabled on the virtual machine. Minimum api-version: 2020-12-01. */
  vTpmEnabled?: boolean;
}

export function uefiSettingsSerializer(item: UefiSettings): any {
  return {
    secureBootEnabled: item["secureBootEnabled"],
    vTpmEnabled: item["vTpmEnabled"],
  };
}

export function uefiSettingsDeserializer(item: any): UefiSettings {
  return {
    secureBootEnabled: item["secureBootEnabled"],
    vTpmEnabled: item["vTpmEnabled"],
  };
}

/** Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. The default behavior is: UefiSettings will not be enabled unless this property is set. */
export enum KnownSecurityTypes {
  /** TrustedLaunch */
  TrustedLaunch = "TrustedLaunch",
  /** ConfidentialVM */
  ConfidentialVM = "ConfidentialVM",
}

/**
 * Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. The default behavior is: UefiSettings will not be enabled unless this property is set. \
 * {@link KnownSecurityTypes} can be used interchangeably with SecurityTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TrustedLaunch** \
 * **ConfidentialVM**
 */
export type SecurityTypes = string;

/** Specifies the Managed Identity used by ADE to get access token for keyvault operations. */
export interface EncryptionIdentity {
  /** Specifies ARM Resource ID of one of the user identities associated with the VM. */
  userAssignedIdentityResourceId?: string;
}

export function encryptionIdentitySerializer(item: EncryptionIdentity): any {
  return {
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

export function encryptionIdentityDeserializer(item: any): EncryptionIdentity {
  return {
    userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"],
  };
}

/** Specifies ProxyAgent settings for the virtual machine or virtual machine scale set. Minimum api-version: 2023-09-01. */
export interface ProxyAgentSettings {
  /** Specifies whether ProxyAgent feature should be enabled on the virtual machine or virtual machine scale set. */
  enabled?: boolean;
  /** Specifies the mode that ProxyAgent will execute on. Warning: this property has been deprecated, please specify 'mode' under particular hostendpoint setting. */
  mode?: Mode;
  /** Increase the value of this property allows users to reset the key used for securing communication channel between guest and host. */
  keyIncarnationId?: number;
  /** Specifies the Wire Server endpoint settings while creating the virtual machine or virtual machine scale set. Minimum api-version: 2024-03-01. */
  wireServer?: HostEndpointSettings;
  /** Specifies the IMDS endpoint settings while creating the virtual machine or virtual machine scale set. Minimum api-version: 2024-03-01. */
  imds?: HostEndpointSettings;
  /** Specify whether to implicitly install the ProxyAgent Extension. This option is currently applicable only for Linux Os. */
  addProxyAgentExtension?: boolean;
}

export function proxyAgentSettingsSerializer(item: ProxyAgentSettings): any {
  return {
    enabled: item["enabled"],
    mode: item["mode"],
    keyIncarnationId: item["keyIncarnationId"],
    wireServer: !item["wireServer"]
      ? item["wireServer"]
      : hostEndpointSettingsSerializer(item["wireServer"]),
    imds: !item["imds"] ? item["imds"] : hostEndpointSettingsSerializer(item["imds"]),
    addProxyAgentExtension: item["addProxyAgentExtension"],
  };
}

export function proxyAgentSettingsDeserializer(item: any): ProxyAgentSettings {
  return {
    enabled: item["enabled"],
    mode: item["mode"],
    keyIncarnationId: item["keyIncarnationId"],
    wireServer: !item["wireServer"]
      ? item["wireServer"]
      : hostEndpointSettingsDeserializer(item["wireServer"]),
    imds: !item["imds"] ? item["imds"] : hostEndpointSettingsDeserializer(item["imds"]),
    addProxyAgentExtension: item["addProxyAgentExtension"],
  };
}

/** Specifies the mode that ProxyAgent will execute on if the feature is enabled. ProxyAgent will start to audit or monitor but not enforce access control over requests to host endpoints in Audit mode, while in Enforce mode it will enforce access control. The default value is Enforce mode. */
export enum KnownMode {
  /** Audit */
  Audit = "Audit",
  /** Enforce */
  Enforce = "Enforce",
}

/**
 * Specifies the mode that ProxyAgent will execute on if the feature is enabled. ProxyAgent will start to audit or monitor but not enforce access control over requests to host endpoints in Audit mode, while in Enforce mode it will enforce access control. The default value is Enforce mode. \
 * {@link KnownMode} can be used interchangeably with Mode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Audit** \
 * **Enforce**
 */
export type Mode = string;

/** Specifies particular host endpoint settings. */
export interface HostEndpointSettings {
  /** Specifies the execution mode. In Audit mode, the system acts as if it is enforcing the access control policy, including emitting access denial entries in the logs but it does not actually deny any requests to host endpoints. In Enforce mode, the system will enforce the access control and it is the recommended mode of operation. */
  mode?: Modes;
  /** Specifies the InVMAccessControlProfileVersion resource id in the format of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/inVMAccessControlProfiles/{profile}/versions/{version} */
  inVMAccessControlProfileReferenceId?: string;
}

export function hostEndpointSettingsSerializer(item: HostEndpointSettings): any {
  return {
    mode: item["mode"],
    inVMAccessControlProfileReferenceId: item["inVMAccessControlProfileReferenceId"],
  };
}

export function hostEndpointSettingsDeserializer(item: any): HostEndpointSettings {
  return {
    mode: item["mode"],
    inVMAccessControlProfileReferenceId: item["inVMAccessControlProfileReferenceId"],
  };
}

/** Specifies the execution mode. In Audit mode, the system acts as if it is enforcing the access control policy, including emitting access denial entries in the logs but it does not actually deny any requests to host endpoints. In Enforce mode, the system will enforce the access control and it is the recommended mode of operation. */
export enum KnownModes {
  /** Audit */
  Audit = "Audit",
  /** Enforce */
  Enforce = "Enforce",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Specifies the execution mode. In Audit mode, the system acts as if it is enforcing the access control policy, including emitting access denial entries in the logs but it does not actually deny any requests to host endpoints. In Enforce mode, the system will enforce the access control and it is the recommended mode of operation. \
 * {@link KnownModes} can be used interchangeably with Modes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Audit** \
 * **Enforce** \
 * **Disabled**
 */
export type Modes = string;

/** Specifies the boot diagnostic settings state. Minimum api-version: 2015-06-15. */
export interface DiagnosticsProfile {
  /** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. **NOTE**: If storageUri is being specified then ensure that the storage account is in the same region and subscription as the VM. You can easily view the output of your console log. Azure also enables you to see a screenshot of the VM from the hypervisor. */
  bootDiagnostics?: BootDiagnostics;
}

export function diagnosticsProfileSerializer(item: DiagnosticsProfile): any {
  return {
    bootDiagnostics: !item["bootDiagnostics"]
      ? item["bootDiagnostics"]
      : bootDiagnosticsSerializer(item["bootDiagnostics"]),
  };
}

export function diagnosticsProfileDeserializer(item: any): DiagnosticsProfile {
  return {
    bootDiagnostics: !item["bootDiagnostics"]
      ? item["bootDiagnostics"]
      : bootDiagnosticsDeserializer(item["bootDiagnostics"]),
  };
}

/** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. You can easily view the output of your console log. Azure also enables you to see a screenshot of the VM from the hypervisor. */
export interface BootDiagnostics {
  /** Whether boot diagnostics should be enabled on the Virtual Machine. */
  enabled?: boolean;
  /** Uri of the storage account to use for placing the console output and screenshot. If storageUri is not specified while enabling boot diagnostics, managed storage will be used. */
  storageUri?: string;
}

export function bootDiagnosticsSerializer(item: BootDiagnostics): any {
  return { enabled: item["enabled"], storageUri: item["storageUri"] };
}

export function bootDiagnosticsDeserializer(item: any): BootDiagnostics {
  return {
    enabled: item["enabled"],
    storageUri: item["storageUri"],
  };
}

/** Describes a virtual machine scale set extension profile. */
export interface VirtualMachineScaleSetExtensionProfile {
  /** The virtual machine scale set child extension resources. */
  extensions?: VirtualMachineScaleSetExtension[];
  /** Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). Minimum api-version: 2020-06-01. */
  extensionsTimeBudget?: string;
}

export function virtualMachineScaleSetExtensionProfileSerializer(
  item: VirtualMachineScaleSetExtensionProfile,
): any {
  return {
    extensions: !item["extensions"]
      ? item["extensions"]
      : virtualMachineScaleSetExtensionArraySerializer(item["extensions"]),
    extensionsTimeBudget: item["extensionsTimeBudget"],
  };
}

export function virtualMachineScaleSetExtensionProfileDeserializer(
  item: any,
): VirtualMachineScaleSetExtensionProfile {
  return {
    extensions: !item["extensions"]
      ? item["extensions"]
      : virtualMachineScaleSetExtensionArrayDeserializer(item["extensions"]),
    extensionsTimeBudget: item["extensionsTimeBudget"],
  };
}

export function virtualMachineScaleSetExtensionArraySerializer(
  result: Array<VirtualMachineScaleSetExtension>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetExtensionSerializer(item);
  });
}

export function virtualMachineScaleSetExtensionArrayDeserializer(
  result: Array<VirtualMachineScaleSetExtension>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetExtensionDeserializer(item);
  });
}

/** Describes a Virtual Machine Scale Set Extension. */
export interface VirtualMachineScaleSetExtension extends SubResourceReadOnly {
  /** Describes the properties of a Virtual Machine Scale Set Extension. */
  properties?: VirtualMachineScaleSetExtensionProperties;
  /** Resource type */
  readonly type?: string;
  /** Resource name */
  name?: string;
}

export function virtualMachineScaleSetExtensionSerializer(
  item: VirtualMachineScaleSetExtension,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetExtensionPropertiesSerializer(item["properties"]),
    name: item["name"],
  };
}

export function virtualMachineScaleSetExtensionDeserializer(
  item: any,
): VirtualMachineScaleSetExtension {
  return {
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetExtensionPropertiesDeserializer(item["properties"]),
    type: item["type"],
    name: item["name"],
  };
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
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** Collection of extension names after which this extension needs to be provisioned. */
  provisionAfterExtensions?: string[];
  /** Indicates whether failures stemming from the extension will be suppressed (Operational failures such as not connecting to the VM will not be suppressed regardless of this value). The default is false. */
  suppressFailures?: boolean;
  /** The extensions protected settings that are passed by reference, and consumed from key vault */
  protectedSettingsFromKeyVault?: KeyVaultSecretReference;
}

export function virtualMachineScaleSetExtensionPropertiesSerializer(
  item: VirtualMachineScaleSetExtensionProperties,
): any {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    provisionAfterExtensions: !item["provisionAfterExtensions"]
      ? item["provisionAfterExtensions"]
      : item["provisionAfterExtensions"].map((p: any) => {
          return p;
        }),
    suppressFailures: item["suppressFailures"],
    protectedSettingsFromKeyVault: !item["protectedSettingsFromKeyVault"]
      ? item["protectedSettingsFromKeyVault"]
      : keyVaultSecretReferenceSerializer(item["protectedSettingsFromKeyVault"]),
  };
}

export function virtualMachineScaleSetExtensionPropertiesDeserializer(
  item: any,
): VirtualMachineScaleSetExtensionProperties {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    provisioningState: item["provisioningState"],
    provisionAfterExtensions: !item["provisionAfterExtensions"]
      ? item["provisionAfterExtensions"]
      : item["provisionAfterExtensions"].map((p: any) => {
          return p;
        }),
    suppressFailures: item["suppressFailures"],
    protectedSettingsFromKeyVault: !item["protectedSettingsFromKeyVault"]
      ? item["protectedSettingsFromKeyVault"]
      : keyVaultSecretReferenceDeserializer(item["protectedSettingsFromKeyVault"]),
  };
}

/** Describes a reference to Key Vault Secret */
export interface KeyVaultSecretReference {
  /** The URL referencing a secret in a Key Vault. */
  secretUrl: string;
  /** The relative URL of the Key Vault containing the secret. */
  sourceVault: SubResource;
}

export function keyVaultSecretReferenceSerializer(item: KeyVaultSecretReference): any {
  return {
    secretUrl: item["secretUrl"],
    sourceVault: subResourceSerializer(item["sourceVault"]),
  };
}

export function keyVaultSecretReferenceDeserializer(item: any): KeyVaultSecretReference {
  return {
    secretUrl: item["secretUrl"],
    sourceVault: subResourceDeserializer(item["sourceVault"]),
  };
}

/** Specifies the priority for a standalone virtual machine or the virtual machines in the scale set. 'Low' enum will be deprecated in the future, please use 'Spot' as the enum to deploy Azure Spot VM/VMSS. */
export enum KnownVirtualMachinePriorityTypes {
  /** Regular */
  Regular = "Regular",
  /** Low */
  Low = "Low",
  /** Spot */
  Spot = "Spot",
}

/**
 * Specifies the priority for a standalone virtual machine or the virtual machines in the scale set. 'Low' enum will be deprecated in the future, please use 'Spot' as the enum to deploy Azure Spot VM/VMSS. \
 * {@link KnownVirtualMachinePriorityTypes} can be used interchangeably with VirtualMachinePriorityTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regular** \
 * **Low** \
 * **Spot**
 */
export type VirtualMachinePriorityTypes = string;

/** Specifies the eviction policy for the Azure Spot VM/VMSS */
export enum KnownVirtualMachineEvictionPolicyTypes {
  /** Deallocate */
  Deallocate = "Deallocate",
  /** Delete */
  Delete = "Delete",
}

/**
 * Specifies the eviction policy for the Azure Spot VM/VMSS \
 * {@link KnownVirtualMachineEvictionPolicyTypes} can be used interchangeably with VirtualMachineEvictionPolicyTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Deallocate** \
 * **Delete**
 */
export type VirtualMachineEvictionPolicyTypes = string;

/** Specifies the billing related details of a Azure Spot VM or VMSS. Minimum api-version: 2019-03-01. */
export interface BillingProfile {
  /** Specifies the maximum price you are willing to pay for a Azure Spot VM/VMSS. This price is in US Dollars. <br><br> This price will be compared with the current Azure Spot price for the VM size. Also, the prices are compared at the time of create/update of Azure Spot VM/VMSS and the operation will only succeed if  the maxPrice is greater than the current Azure Spot price. <br><br> The maxPrice will also be used for evicting a Azure Spot VM/VMSS if the current Azure Spot price goes beyond the maxPrice after creation of VM/VMSS. <br><br> Possible values are: <br><br> - Any decimal value greater than zero. Example: 0.01538 <br><br> -1 – indicates default price to be up-to on-demand. <br><br> You can set the maxPrice to -1 to indicate that the Azure Spot VM/VMSS should not be evicted for price reasons. Also, the default max price is -1 if it is not provided by you. <br><br>Minimum api-version: 2019-03-01. */
  maxPrice?: number;
}

export function billingProfileSerializer(item: BillingProfile): any {
  return { maxPrice: item["maxPrice"] };
}

export function billingProfileDeserializer(item: any): BillingProfile {
  return {
    maxPrice: item["maxPrice"],
  };
}

/** model interface ScheduledEventsProfile */
export interface ScheduledEventsProfile {
  /** Specifies Terminate Scheduled Event related configurations. */
  terminateNotificationProfile?: TerminateNotificationProfile;
  /** Specifies OS Image Scheduled Event related configurations. */
  osImageNotificationProfile?: OSImageNotificationProfile;
}

export function scheduledEventsProfileSerializer(item: ScheduledEventsProfile): any {
  return {
    terminateNotificationProfile: !item["terminateNotificationProfile"]
      ? item["terminateNotificationProfile"]
      : terminateNotificationProfileSerializer(item["terminateNotificationProfile"]),
    osImageNotificationProfile: !item["osImageNotificationProfile"]
      ? item["osImageNotificationProfile"]
      : osImageNotificationProfileSerializer(item["osImageNotificationProfile"]),
  };
}

export function scheduledEventsProfileDeserializer(item: any): ScheduledEventsProfile {
  return {
    terminateNotificationProfile: !item["terminateNotificationProfile"]
      ? item["terminateNotificationProfile"]
      : terminateNotificationProfileDeserializer(item["terminateNotificationProfile"]),
    osImageNotificationProfile: !item["osImageNotificationProfile"]
      ? item["osImageNotificationProfile"]
      : osImageNotificationProfileDeserializer(item["osImageNotificationProfile"]),
  };
}

/** model interface TerminateNotificationProfile */
export interface TerminateNotificationProfile {
  /** Configurable length of time a Virtual Machine being deleted will have to potentially approve the Terminate Scheduled Event before the event is auto approved (timed out). The configuration must be specified in ISO 8601 format, the default value is 5 minutes (PT5M) */
  notBeforeTimeout?: string;
  /** Specifies whether the Terminate Scheduled event is enabled or disabled. */
  enable?: boolean;
}

export function terminateNotificationProfileSerializer(item: TerminateNotificationProfile): any {
  return { notBeforeTimeout: item["notBeforeTimeout"], enable: item["enable"] };
}

export function terminateNotificationProfileDeserializer(item: any): TerminateNotificationProfile {
  return {
    notBeforeTimeout: item["notBeforeTimeout"],
    enable: item["enable"],
  };
}

/** model interface OSImageNotificationProfile */
export interface OSImageNotificationProfile {
  /** Length of time a Virtual Machine being reimaged or having its OS upgraded will have to potentially approve the OS Image Scheduled Event before the event is auto approved (timed out). The configuration is specified in ISO 8601 format, and the value must be 15 minutes (PT15M) */
  notBeforeTimeout?: string;
  /** Specifies whether the OS Image Scheduled event is enabled or disabled. */
  enable?: boolean;
}

export function osImageNotificationProfileSerializer(item: OSImageNotificationProfile): any {
  return { notBeforeTimeout: item["notBeforeTimeout"], enable: item["enable"] };
}

export function osImageNotificationProfileDeserializer(item: any): OSImageNotificationProfile {
  return {
    notBeforeTimeout: item["notBeforeTimeout"],
    enable: item["enable"],
  };
}

/** The parameters of a capacity reservation Profile. */
export interface CapacityReservationProfile {
  /** Specifies the capacity reservation group resource id that should be used for allocating the virtual machine or scaleset vm instances provided enough capacity has been reserved. Please refer to https://aka.ms/CapacityReservation for more details. */
  capacityReservationGroup?: SubResource;
}

export function capacityReservationProfileSerializer(item: CapacityReservationProfile): any {
  return {
    capacityReservationGroup: !item["capacityReservationGroup"]
      ? item["capacityReservationGroup"]
      : subResourceSerializer(item["capacityReservationGroup"]),
  };
}

export function capacityReservationProfileDeserializer(item: any): CapacityReservationProfile {
  return {
    capacityReservationGroup: !item["capacityReservationGroup"]
      ? item["capacityReservationGroup"]
      : subResourceDeserializer(item["capacityReservationGroup"]),
  };
}

/** Contains the list of gallery applications that should be made available to the VM/VMSS */
export interface ApplicationProfile {
  /** Specifies the gallery applications that should be made available to the VM/VMSS */
  galleryApplications?: VMGalleryApplication[];
}

export function applicationProfileSerializer(item: ApplicationProfile): any {
  return {
    galleryApplications: !item["galleryApplications"]
      ? item["galleryApplications"]
      : vmGalleryApplicationArraySerializer(item["galleryApplications"]),
  };
}

export function applicationProfileDeserializer(item: any): ApplicationProfile {
  return {
    galleryApplications: !item["galleryApplications"]
      ? item["galleryApplications"]
      : vmGalleryApplicationArrayDeserializer(item["galleryApplications"]),
  };
}

export function vmGalleryApplicationArraySerializer(result: Array<VMGalleryApplication>): any[] {
  return result.map((item) => {
    return vmGalleryApplicationSerializer(item);
  });
}

export function vmGalleryApplicationArrayDeserializer(result: Array<VMGalleryApplication>): any[] {
  return result.map((item) => {
    return vmGalleryApplicationDeserializer(item);
  });
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

export function vmGalleryApplicationSerializer(item: VMGalleryApplication): any {
  return {
    tags: item["tags"],
    order: item["order"],
    packageReferenceId: item["packageReferenceId"],
    configurationReference: item["configurationReference"],
    treatFailureAsDeploymentFailure: item["treatFailureAsDeploymentFailure"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
  };
}

export function vmGalleryApplicationDeserializer(item: any): VMGalleryApplication {
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
  /** Specifies the properties for customizing the size of the virtual machine. Minimum api-version: 2021-11-01. Please follow the instructions in [VM Customization](https://aka.ms/vmcustomization) for more details. */
  vmSizeProperties?: VMSizeProperties;
}

export function virtualMachineScaleSetHardwareProfileSerializer(
  item: VirtualMachineScaleSetHardwareProfile,
): any {
  return {
    vmSizeProperties: !item["vmSizeProperties"]
      ? item["vmSizeProperties"]
      : vmSizePropertiesSerializer(item["vmSizeProperties"]),
  };
}

export function virtualMachineScaleSetHardwareProfileDeserializer(
  item: any,
): VirtualMachineScaleSetHardwareProfile {
  return {
    vmSizeProperties: !item["vmSizeProperties"]
      ? item["vmSizeProperties"]
      : vmSizePropertiesDeserializer(item["vmSizeProperties"]),
  };
}

/** Specifies VM Size Property settings on the virtual machine. */
export interface VMSizeProperties {
  /** Specifies the number of vCPUs available for the VM. When this property is not specified in the request body the default behavior is to set it to the value of vCPUs available for that VM size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list). */
  vCPUsAvailable?: number;
  /** Specifies the vCPU to physical core ratio. When this property is not specified in the request body the default behavior is set to the value of vCPUsPerCore for the VM Size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list). **Setting this property to 1 also means that hyper-threading is disabled.** */
  vCPUsPerCore?: number;
}

export function vmSizePropertiesSerializer(item: VMSizeProperties): any {
  return {
    vCPUsAvailable: item["vCPUsAvailable"],
    vCPUsPerCore: item["vCPUsPerCore"],
  };
}

export function vmSizePropertiesDeserializer(item: any): VMSizeProperties {
  return {
    vCPUsAvailable: item["vCPUsAvailable"],
    vCPUsPerCore: item["vCPUsPerCore"],
  };
}

/** Specifies the service artifact reference id used to set same image version for all virtual machines in the scale set when using 'latest' image version. Minimum api-version: 2022-11-01 */
export interface ServiceArtifactReference {
  /** The service artifact reference id in the form of /subscriptions/{subscriptionId}/resourceGroups/{resourceGroup}/providers/Microsoft.Compute/galleries/{galleryName}/serviceArtifacts/{serviceArtifactName}/vmArtifactsProfiles/{vmArtifactsProfilesName} */
  id?: string;
}

export function serviceArtifactReferenceSerializer(item: ServiceArtifactReference): any {
  return { id: item["id"] };
}

export function serviceArtifactReferenceDeserializer(item: any): ServiceArtifactReference {
  return {
    id: item["id"],
  };
}

/** Specifies the security posture to be used in the scale set. Minimum api-version: 2023-03-01 */
export interface SecurityPostureReference {
  /** The security posture reference id in the form of /CommunityGalleries/{communityGalleryName}/securityPostures/{securityPostureName}/versions/{major.minor.patch}|latest */
  id: string;
  /** The list of virtual machine extension names to exclude when applying the security posture. */
  excludeExtensions?: string[];
  /** Whether the security posture can be overridden by the user. */
  isOverridable?: boolean;
}

export function securityPostureReferenceSerializer(item: SecurityPostureReference): any {
  return {
    id: item["id"],
    excludeExtensions: !item["excludeExtensions"]
      ? item["excludeExtensions"]
      : item["excludeExtensions"].map((p: any) => {
          return p;
        }),
    isOverridable: item["isOverridable"],
  };
}

export function securityPostureReferenceDeserializer(item: any): SecurityPostureReference {
  return {
    id: item["id"],
    excludeExtensions: !item["excludeExtensions"]
      ? item["excludeExtensions"]
      : item["excludeExtensions"].map((p: any) => {
          return p;
        }),
    isOverridable: item["isOverridable"],
  };
}

/** Enables or disables a capability on the virtual machine or virtual machine scale set. */
export interface AdditionalCapabilities {
  /** The flag that enables or disables a capability to have one or more managed data disks with UltraSSD_LRS storage account type on the VM or VMSS. Managed disks with storage account type UltraSSD_LRS can be added to a virtual machine or virtual machine scale set only if this property is enabled. */
  ultraSSDEnabled?: boolean;
  /** The flag that enables or disables hibernation capability on the VM. */
  hibernationEnabled?: boolean;
}

export function additionalCapabilitiesSerializer(item: AdditionalCapabilities): any {
  return {
    ultraSSDEnabled: item["ultraSSDEnabled"],
    hibernationEnabled: item["hibernationEnabled"],
  };
}

export function additionalCapabilitiesDeserializer(item: any): AdditionalCapabilities {
  return {
    ultraSSDEnabled: item["ultraSSDEnabled"],
    hibernationEnabled: item["hibernationEnabled"],
  };
}

/** Describes a scale-in policy for a virtual machine scale set. */
export interface ScaleInPolicy {
  /** The rules to be followed when scaling-in a virtual machine scale set. <br><br> Possible values are: <br><br> **Default** When a virtual machine scale set is scaled in, the scale set will first be balanced across zones if it is a zonal scale set. Then, it will be balanced across Fault Domains as far as possible. Within each Fault Domain, the virtual machines chosen for removal will be the newest ones that are not protected from scale-in. <br><br> **OldestVM** When a virtual machine scale set is being scaled-in, the oldest virtual machines that are not protected from scale-in will be chosen for removal. For zonal virtual machine scale sets, the scale set will first be balanced across zones. Within each zone, the oldest virtual machines that are not protected will be chosen for removal. <br><br> **NewestVM** When a virtual machine scale set is being scaled-in, the newest virtual machines that are not protected from scale-in will be chosen for removal. For zonal virtual machine scale sets, the scale set will first be balanced across zones. Within each zone, the newest virtual machines that are not protected will be chosen for removal. <br><br> */
  rules?: VirtualMachineScaleSetScaleInRules[];
  /** This property allows you to specify if virtual machines chosen for removal have to be force deleted when a virtual machine scale set is being scaled-in.(Feature in Preview) */
  forceDeletion?: boolean;
  /** This property allows you to prioritize the deletion of unhealthy and inactive VMs when a virtual machine scale set is being scaled-in.(Feature in Preview) */
  prioritizeUnhealthyVMs?: boolean;
}

export function scaleInPolicySerializer(item: ScaleInPolicy): any {
  return {
    rules: !item["rules"]
      ? item["rules"]
      : item["rules"].map((p: any) => {
          return p;
        }),
    forceDeletion: item["forceDeletion"],
    prioritizeUnhealthyVMs: item["prioritizeUnhealthyVMs"],
  };
}

export function scaleInPolicyDeserializer(item: any): ScaleInPolicy {
  return {
    rules: !item["rules"]
      ? item["rules"]
      : item["rules"].map((p: any) => {
          return p;
        }),
    forceDeletion: item["forceDeletion"],
    prioritizeUnhealthyVMs: item["prioritizeUnhealthyVMs"],
  };
}

/** Known values of {@link VirtualMachineScaleSetScaleInRules} that the service accepts. */
export enum KnownVirtualMachineScaleSetScaleInRules {
  /** Default */
  Default = "Default",
  /** OldestVM */
  OldestVM = "OldestVM",
  /** NewestVM */
  NewestVM = "NewestVM",
}

/** Type of VirtualMachineScaleSetScaleInRules */
export type VirtualMachineScaleSetScaleInRules = string;

/** Specifies the orchestration mode for the virtual machine scale set. */
export enum KnownOrchestrationMode {
  /** Uniform */
  Uniform = "Uniform",
  /** Flexible */
  Flexible = "Flexible",
}

/**
 * Specifies the orchestration mode for the virtual machine scale set. \
 * {@link KnownOrchestrationMode} can be used interchangeably with OrchestrationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Uniform** \
 * **Flexible**
 */
export type OrchestrationMode = string;

/** Specifies the Spot-Try-Restore properties for the virtual machine scale set. With this property customer can enable or disable automatic restore of the evicted Spot VMSS VM instances opportunistically based on capacity availability and pricing constraint. */
export interface SpotRestorePolicy {
  /** Enables the Spot-Try-Restore feature where evicted VMSS SPOT instances will be tried to be restored opportunistically based on capacity availability and pricing constraints */
  enabled?: boolean;
  /** Timeout value expressed as an ISO 8601 time duration after which the platform will not try to restore the VMSS SPOT instances */
  restoreTimeout?: string;
}

export function spotRestorePolicySerializer(item: SpotRestorePolicy): any {
  return { enabled: item["enabled"], restoreTimeout: item["restoreTimeout"] };
}

export function spotRestorePolicyDeserializer(item: any): SpotRestorePolicy {
  return {
    enabled: item["enabled"],
    restoreTimeout: item["restoreTimeout"],
  };
}

/** Specifies the target splits for Spot and Regular priority VMs within a scale set with flexible orchestration mode. With this property the customer is able to specify the base number of regular priority VMs created as the VMSS flex instance scales out and the split between Spot and Regular priority VMs after this base target has been reached. */
export interface PriorityMixPolicy {
  /** The base number of regular priority VMs that will be created in this scale set as it scales out. */
  baseRegularPriorityCount?: number;
  /** The percentage of VM instances, after the base regular priority count has been reached, that are expected to use regular priority. */
  regularPriorityPercentageAboveBase?: number;
}

export function priorityMixPolicySerializer(item: PriorityMixPolicy): any {
  return {
    baseRegularPriorityCount: item["baseRegularPriorityCount"],
    regularPriorityPercentageAboveBase: item["regularPriorityPercentageAboveBase"],
  };
}

export function priorityMixPolicyDeserializer(item: any): PriorityMixPolicy {
  return {
    baseRegularPriorityCount: item["baseRegularPriorityCount"],
    regularPriorityPercentageAboveBase: item["regularPriorityPercentageAboveBase"],
  };
}

/** Describes an resiliency policy - AutomaticZoneRebalancingPolicy, ResilientVMCreationPolicy and/or ResilientVMDeletionPolicy. */
export interface ResiliencyPolicy {
  /** The configuration parameters used while performing resilient VM creation. */
  resilientVMCreationPolicy?: ResilientVMCreationPolicy;
  /** The configuration parameters used while performing resilient VM deletion. */
  resilientVMDeletionPolicy?: ResilientVMDeletionPolicy;
  /** The configuration parameters used while performing automatic AZ balancing. */
  automaticZoneRebalancingPolicy?: AutomaticZoneRebalancingPolicy;
  /** The configuration parameters used while performing zone allocation. */
  zoneAllocationPolicy?: ZoneAllocationPolicy;
}

export function resiliencyPolicySerializer(item: ResiliencyPolicy): any {
  return {
    resilientVMCreationPolicy: !item["resilientVMCreationPolicy"]
      ? item["resilientVMCreationPolicy"]
      : resilientVMCreationPolicySerializer(item["resilientVMCreationPolicy"]),
    resilientVMDeletionPolicy: !item["resilientVMDeletionPolicy"]
      ? item["resilientVMDeletionPolicy"]
      : resilientVMDeletionPolicySerializer(item["resilientVMDeletionPolicy"]),
    automaticZoneRebalancingPolicy: !item["automaticZoneRebalancingPolicy"]
      ? item["automaticZoneRebalancingPolicy"]
      : automaticZoneRebalancingPolicySerializer(item["automaticZoneRebalancingPolicy"]),
    zoneAllocationPolicy: !item["zoneAllocationPolicy"]
      ? item["zoneAllocationPolicy"]
      : zoneAllocationPolicySerializer(item["zoneAllocationPolicy"]),
  };
}

export function resiliencyPolicyDeserializer(item: any): ResiliencyPolicy {
  return {
    resilientVMCreationPolicy: !item["resilientVMCreationPolicy"]
      ? item["resilientVMCreationPolicy"]
      : resilientVMCreationPolicyDeserializer(item["resilientVMCreationPolicy"]),
    resilientVMDeletionPolicy: !item["resilientVMDeletionPolicy"]
      ? item["resilientVMDeletionPolicy"]
      : resilientVMDeletionPolicyDeserializer(item["resilientVMDeletionPolicy"]),
    automaticZoneRebalancingPolicy: !item["automaticZoneRebalancingPolicy"]
      ? item["automaticZoneRebalancingPolicy"]
      : automaticZoneRebalancingPolicyDeserializer(item["automaticZoneRebalancingPolicy"]),
    zoneAllocationPolicy: !item["zoneAllocationPolicy"]
      ? item["zoneAllocationPolicy"]
      : zoneAllocationPolicyDeserializer(item["zoneAllocationPolicy"]),
  };
}

/** The configuration parameters used while performing resilient VM creation. */
export interface ResilientVMCreationPolicy {
  /** Specifies whether resilient VM creation should be enabled on the virtual machine scale set. The default value is false. */
  enabled?: boolean;
}

export function resilientVMCreationPolicySerializer(item: ResilientVMCreationPolicy): any {
  return { enabled: item["enabled"] };
}

export function resilientVMCreationPolicyDeserializer(item: any): ResilientVMCreationPolicy {
  return {
    enabled: item["enabled"],
  };
}

/** The configuration parameters used while performing resilient VM deletion. */
export interface ResilientVMDeletionPolicy {
  /** Specifies whether resilient VM deletion should be enabled on the virtual machine scale set. The default value is false. */
  enabled?: boolean;
}

export function resilientVMDeletionPolicySerializer(item: ResilientVMDeletionPolicy): any {
  return { enabled: item["enabled"] };
}

export function resilientVMDeletionPolicyDeserializer(item: any): ResilientVMDeletionPolicy {
  return {
    enabled: item["enabled"],
  };
}

/** The configuration parameters used while performing automatic AZ balancing. */
export interface AutomaticZoneRebalancingPolicy {
  /** Specifies whether Automatic AZ Balancing should be enabled on the virtual machine scale set. The default value is false. */
  enabled?: boolean;
  /** Type of rebalance strategy that will be used for rebalancing virtual machines in the scale set across availability zones. Default and only supported value for now is Recreate. */
  rebalanceStrategy?: RebalanceStrategy;
  /** Type of rebalance behavior that will be used for recreating virtual machines in the scale set across availability zones. Default and only supported value for now is CreateBeforeDelete. */
  rebalanceBehavior?: RebalanceBehavior;
}

export function automaticZoneRebalancingPolicySerializer(
  item: AutomaticZoneRebalancingPolicy,
): any {
  return {
    enabled: item["enabled"],
    rebalanceStrategy: item["rebalanceStrategy"],
    rebalanceBehavior: item["rebalanceBehavior"],
  };
}

export function automaticZoneRebalancingPolicyDeserializer(
  item: any,
): AutomaticZoneRebalancingPolicy {
  return {
    enabled: item["enabled"],
    rebalanceStrategy: item["rebalanceStrategy"],
    rebalanceBehavior: item["rebalanceBehavior"],
  };
}

/** Type of rebalance strategy that will be used for rebalancing virtual machines in the scale set across availability zones. Default and only supported value for now is Recreate. */
export enum KnownRebalanceStrategy {
  /** Recreate */
  Recreate = "Recreate",
}

/**
 * Type of rebalance strategy that will be used for rebalancing virtual machines in the scale set across availability zones. Default and only supported value for now is Recreate. \
 * {@link KnownRebalanceStrategy} can be used interchangeably with RebalanceStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Recreate**
 */
export type RebalanceStrategy = string;

/** Type of rebalance behavior that will be used for recreating virtual machines in the scale set across availability zones. Default and only supported value for now is CreateBeforeDelete. */
export enum KnownRebalanceBehavior {
  /** CreateBeforeDelete */
  CreateBeforeDelete = "CreateBeforeDelete",
}

/**
 * Type of rebalance behavior that will be used for recreating virtual machines in the scale set across availability zones. Default and only supported value for now is CreateBeforeDelete. \
 * {@link KnownRebalanceBehavior} can be used interchangeably with RebalanceBehavior,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CreateBeforeDelete**
 */
export type RebalanceBehavior = string;

/** The configuration parameters for zone allocation of a virtual machine scale set. */
export interface ZoneAllocationPolicy {
  /** The maximum number of availability zones to use if the ZonePlacementPolicy is 'Auto'. If not specified, all availability zones will be used. */
  maxZoneCount?: number;
  /** The configuration parameters used to limit the number of virtual machines per availability zone in the virtual machine scale set. */
  maxInstancePercentPerZonePolicy?: MaxInstancePercentPerZonePolicy;
}

export function zoneAllocationPolicySerializer(item: ZoneAllocationPolicy): any {
  return {
    maxZoneCount: item["maxZoneCount"],
    maxInstancePercentPerZonePolicy: !item["maxInstancePercentPerZonePolicy"]
      ? item["maxInstancePercentPerZonePolicy"]
      : maxInstancePercentPerZonePolicySerializer(item["maxInstancePercentPerZonePolicy"]),
  };
}

export function zoneAllocationPolicyDeserializer(item: any): ZoneAllocationPolicy {
  return {
    maxZoneCount: item["maxZoneCount"],
    maxInstancePercentPerZonePolicy: !item["maxInstancePercentPerZonePolicy"]
      ? item["maxInstancePercentPerZonePolicy"]
      : maxInstancePercentPerZonePolicyDeserializer(item["maxInstancePercentPerZonePolicy"]),
  };
}

/** The configuration parameters used to limit the number of virtual machines per availability zone in the virtual machine scale set. */
export interface MaxInstancePercentPerZonePolicy {
  /** Specifies whether maxInstancePercentPerZonePolicy should be enabled on the virtual machine scale set. */
  enabled?: boolean;
  /** Limit on the number of instances in each zone as a percentage of the total capacity of the virtual machine scale set. */
  value?: number;
}

export function maxInstancePercentPerZonePolicySerializer(
  item: MaxInstancePercentPerZonePolicy,
): any {
  return { enabled: item["enabled"], value: item["value"] };
}

export function maxInstancePercentPerZonePolicyDeserializer(
  item: any,
): MaxInstancePercentPerZonePolicy {
  return {
    enabled: item["enabled"],
    value: item["value"],
  };
}

/** Specifies the align mode between Virtual Machine Scale Set compute and storage Fault Domain count. */
export enum KnownZonalPlatformFaultDomainAlignMode {
  /** Aligned */
  Aligned = "Aligned",
  /** Unaligned */
  Unaligned = "Unaligned",
}

/**
 * Specifies the align mode between Virtual Machine Scale Set compute and storage Fault Domain count. \
 * {@link KnownZonalPlatformFaultDomainAlignMode} can be used interchangeably with ZonalPlatformFaultDomainAlignMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Aligned** \
 * **Unaligned**
 */
export type ZonalPlatformFaultDomainAlignMode = string;

/** Specifies the sku profile for the virtual machine scale set. With this property the customer is able to specify a list of VM sizes and an allocation strategy. */
export interface SkuProfile {
  /** Specifies the VM sizes for the virtual machine scale set. */
  vmSizes?: SkuProfileVMSize[];
  /** Specifies the allocation strategy for the virtual machine scale set based on which the VMs will be allocated. */
  allocationStrategy?: AllocationStrategy;
}

export function skuProfileSerializer(item: SkuProfile): any {
  return {
    vmSizes: !item["vmSizes"] ? item["vmSizes"] : skuProfileVMSizeArraySerializer(item["vmSizes"]),
    allocationStrategy: item["allocationStrategy"],
  };
}

export function skuProfileDeserializer(item: any): SkuProfile {
  return {
    vmSizes: !item["vmSizes"]
      ? item["vmSizes"]
      : skuProfileVMSizeArrayDeserializer(item["vmSizes"]),
    allocationStrategy: item["allocationStrategy"],
  };
}

export function skuProfileVMSizeArraySerializer(result: Array<SkuProfileVMSize>): any[] {
  return result.map((item) => {
    return skuProfileVMSizeSerializer(item);
  });
}

export function skuProfileVMSizeArrayDeserializer(result: Array<SkuProfileVMSize>): any[] {
  return result.map((item) => {
    return skuProfileVMSizeDeserializer(item);
  });
}

/** Specifies the VM Size. */
export interface SkuProfileVMSize {
  /** Specifies the name of the VM Size. */
  name?: string;
  /** Specifies the rank (a.k.a priority) associated with the VM Size. */
  rank?: number;
}

export function skuProfileVMSizeSerializer(item: SkuProfileVMSize): any {
  return { name: item["name"], rank: item["rank"] };
}

export function skuProfileVMSizeDeserializer(item: any): SkuProfileVMSize {
  return {
    name: item["name"],
    rank: item["rank"],
  };
}

/** Specifies the allocation strategy for the virtual machine scale set based on which the VMs will be allocated. */
export enum KnownAllocationStrategy {
  /** LowestPrice */
  LowestPrice = "LowestPrice",
  /** CapacityOptimized */
  CapacityOptimized = "CapacityOptimized",
  /** Prioritized */
  Prioritized = "Prioritized",
}

/**
 * Specifies the allocation strategy for the virtual machine scale set based on which the VMs will be allocated. \
 * {@link KnownAllocationStrategy} can be used interchangeably with AllocationStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LowestPrice** \
 * **CapacityOptimized** \
 * **Prioritized**
 */
export type AllocationStrategy = string;

/** Specifies the high speed interconnect placement for the virtual machine scale set. */
export enum KnownHighSpeedInterconnectPlacement {
  /** No high speed interconnect placement */
  None = "None",
  /** Trunk high speed interconnect placement */
  Trunk = "Trunk",
}

/**
 * Specifies the high speed interconnect placement for the virtual machine scale set. \
 * {@link KnownHighSpeedInterconnectPlacement} can be used interchangeably with HighSpeedInterconnectPlacement,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No high speed interconnect placement \
 * **Trunk**: Trunk high speed interconnect placement
 */
export type HighSpeedInterconnectPlacement = string;

/** Identity for the virtual machine scale set. */
export interface VirtualMachineScaleSetIdentity {
  /** The principal id of virtual machine scale set identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id associated with the virtual machine scale set. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of identity used for the virtual machine scale set. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine scale set. */
  type?: ResourceIdentityType;
  /** The list of user identities associated with the virtual machine scale set. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserAssignedIdentitiesValue>;
}

export function virtualMachineScaleSetIdentitySerializer(
  item: VirtualMachineScaleSetIdentity,
): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function virtualMachineScaleSetIdentityDeserializer(
  item: any,
): VirtualMachineScaleSetIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of identity used for the virtual machine scale set. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine scale set. */
export type ResourceIdentityType =
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

/** Describes the user-defined constraints for resource hardware placement. */
export interface Placement {
  /** Specifies the policy for resource's placement in availability zone. Possible values are: **Any** (used for Virtual Machines), **Auto** (used for Virtual Machine Scale Sets) - An availability zone will be automatically picked by system as part of resource creation. */
  zonePlacementPolicy?: ZonePlacementPolicyType;
  /** This property supplements the 'zonePlacementPolicy' property. If 'zonePlacementPolicy' is set to 'Any'/'Auto', availability zone selected by the system must be present in the list of availability zones passed with 'includeZones'. If 'includeZones' is not provided, all availability zones in region will be considered for selection. */
  includeZones?: string[];
  /** This property supplements the 'zonePlacementPolicy' property. If 'zonePlacementPolicy' is set to 'Any'/'Auto', availability zone selected by the system must not be present in the list of availability zones passed with 'excludeZones'. If 'excludeZones' is not provided, all availability zones in region will be considered for selection. */
  excludeZones?: string[];
}

export function placementSerializer(item: Placement): any {
  return {
    zonePlacementPolicy: item["zonePlacementPolicy"],
    includeZones: !item["includeZones"]
      ? item["includeZones"]
      : item["includeZones"].map((p: any) => {
          return p;
        }),
    excludeZones: !item["excludeZones"]
      ? item["excludeZones"]
      : item["excludeZones"].map((p: any) => {
          return p;
        }),
  };
}

export function placementDeserializer(item: any): Placement {
  return {
    zonePlacementPolicy: item["zonePlacementPolicy"],
    includeZones: !item["includeZones"]
      ? item["includeZones"]
      : item["includeZones"].map((p: any) => {
          return p;
        }),
    excludeZones: !item["excludeZones"]
      ? item["excludeZones"]
      : item["excludeZones"].map((p: any) => {
          return p;
        }),
  };
}

/** Specifies the policy for resource's placement in availability zone. Possible values are: **Any** (used for Virtual Machines), **Auto** (used for Virtual Machine Scale Sets) - An availability zone will be automatically picked by system as part of resource creation. */
export enum KnownZonePlacementPolicyType {
  /** Any */
  Any = "Any",
  /** Automatic zone placement in a Virtual Machine Scale Set. */
  Auto = "Auto",
}

/**
 * Specifies the policy for resource's placement in availability zone. Possible values are: **Any** (used for Virtual Machines), **Auto** (used for Virtual Machine Scale Sets) - An availability zone will be automatically picked by system as part of resource creation. \
 * {@link KnownZonePlacementPolicyType} can be used interchangeably with ZonePlacementPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Any** \
 * **Auto**: Automatic zone placement in a Virtual Machine Scale Set.
 */
export type ZonePlacementPolicyType = string;

/** model interface SubResourceReadOnly */
export interface SubResourceReadOnly {
  /** Resource Id */
  readonly id?: string;
}

export function subResourceReadOnlySerializer(item: SubResourceReadOnly): any {
  return item;
}

export function subResourceReadOnlyDeserializer(item: any): SubResourceReadOnly {
  return {
    id: item["id"],
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
    tags: item["tags"],
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
  /** The virtual machine scale set zones. */
  zones?: string[];
}

export function virtualMachineScaleSetUpdateSerializer(item: VirtualMachineScaleSetUpdate): any {
  return {
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetUpdatePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : virtualMachineScaleSetIdentitySerializer(item["identity"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
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
  /** Specifies the desired targets for mixing Spot and Regular priority VMs within the same VMSS Flex instance. */
  priorityMixPolicy?: PriorityMixPolicy;
  /** Specifies the Spot Restore properties for the virtual machine scale set. */
  spotRestorePolicy?: SpotRestorePolicy;
  /** Policy for Resiliency */
  resiliencyPolicy?: ResiliencyPolicy;
  /** Specifies the align mode between Virtual Machine Scale Set compute and storage Fault Domain count. */
  zonalPlatformFaultDomainAlignMode?: ZonalPlatformFaultDomainAlignMode;
  /** Specifies the sku profile for the virtual machine scale set. */
  skuProfile?: SkuProfile;
}

export function virtualMachineScaleSetUpdatePropertiesSerializer(
  item: VirtualMachineScaleSetUpdateProperties,
): any {
  return {
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : upgradePolicySerializer(item["upgradePolicy"]),
    automaticRepairsPolicy: !item["automaticRepairsPolicy"]
      ? item["automaticRepairsPolicy"]
      : automaticRepairsPolicySerializer(item["automaticRepairsPolicy"]),
    virtualMachineProfile: !item["virtualMachineProfile"]
      ? item["virtualMachineProfile"]
      : virtualMachineScaleSetUpdateVMProfileSerializer(item["virtualMachineProfile"]),
    overprovision: item["overprovision"],
    doNotRunExtensionsOnOverprovisionedVMs: item["doNotRunExtensionsOnOverprovisionedVMs"],
    singlePlacementGroup: item["singlePlacementGroup"],
    additionalCapabilities: !item["additionalCapabilities"]
      ? item["additionalCapabilities"]
      : additionalCapabilitiesSerializer(item["additionalCapabilities"]),
    scaleInPolicy: !item["scaleInPolicy"]
      ? item["scaleInPolicy"]
      : scaleInPolicySerializer(item["scaleInPolicy"]),
    proximityPlacementGroup: !item["proximityPlacementGroup"]
      ? item["proximityPlacementGroup"]
      : subResourceSerializer(item["proximityPlacementGroup"]),
    priorityMixPolicy: !item["priorityMixPolicy"]
      ? item["priorityMixPolicy"]
      : priorityMixPolicySerializer(item["priorityMixPolicy"]),
    spotRestorePolicy: !item["spotRestorePolicy"]
      ? item["spotRestorePolicy"]
      : spotRestorePolicySerializer(item["spotRestorePolicy"]),
    resiliencyPolicy: !item["resiliencyPolicy"]
      ? item["resiliencyPolicy"]
      : resiliencyPolicySerializer(item["resiliencyPolicy"]),
    zonalPlatformFaultDomainAlignMode: item["zonalPlatformFaultDomainAlignMode"],
    skuProfile: !item["skuProfile"] ? item["skuProfile"] : skuProfileSerializer(item["skuProfile"]),
  };
}

/** Describes a virtual machine scale set virtual machine profile. */
export interface VirtualMachineScaleSetUpdateVMProfile {
  /** The virtual machine scale set OS profile. */
  osProfile?: VirtualMachineScaleSetUpdateOSProfile;
  /** The virtual machine scale set storage profile. */
  storageProfile?: VirtualMachineScaleSetUpdateStorageProfile;
  /** The virtual machine scale set network profile. */
  networkProfile?: VirtualMachineScaleSetUpdateNetworkProfile;
  /** The virtual machine scale set security posture reference. */
  securityPostureReference?: SecurityPostureReferenceUpdate;
  /** The virtual machine scale set Security profile */
  securityProfile?: SecurityProfile;
  /** The virtual machine scale set diagnostics profile. */
  diagnosticsProfile?: DiagnosticsProfile;
  /** The virtual machine scale set extension profile. */
  extensionProfile?: VirtualMachineScaleSetExtensionProfile;
  /** The license type, which is for bring your own license scenario. */
  licenseType?: string;
  /** Specifies the billing related details of a Azure Spot VMSS. Minimum api-version: 2019-03-01. */
  billingProfile?: BillingProfile;
  /** Specifies Scheduled Event related configurations. */
  scheduledEventsProfile?: ScheduledEventsProfile;
  /** UserData for the VM, which must be base-64 encoded. Customer should not pass any secrets in here. <br><br>Minimum api-version: 2021-03-01 */
  userData?: string;
  /** Specifies the hardware profile related details of a scale set. Minimum api-version: 2021-11-01. */
  hardwareProfile?: VirtualMachineScaleSetHardwareProfile;
}

export function virtualMachineScaleSetUpdateVMProfileSerializer(
  item: VirtualMachineScaleSetUpdateVMProfile,
): any {
  return {
    osProfile: !item["osProfile"]
      ? item["osProfile"]
      : virtualMachineScaleSetUpdateOSProfileSerializer(item["osProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : virtualMachineScaleSetUpdateStorageProfileSerializer(item["storageProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : virtualMachineScaleSetUpdateNetworkProfileSerializer(item["networkProfile"]),
    securityPostureReference: !item["securityPostureReference"]
      ? item["securityPostureReference"]
      : securityPostureReferenceUpdateSerializer(item["securityPostureReference"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileSerializer(item["securityProfile"]),
    diagnosticsProfile: !item["diagnosticsProfile"]
      ? item["diagnosticsProfile"]
      : diagnosticsProfileSerializer(item["diagnosticsProfile"]),
    extensionProfile: !item["extensionProfile"]
      ? item["extensionProfile"]
      : virtualMachineScaleSetExtensionProfileSerializer(item["extensionProfile"]),
    licenseType: item["licenseType"],
    billingProfile: !item["billingProfile"]
      ? item["billingProfile"]
      : billingProfileSerializer(item["billingProfile"]),
    scheduledEventsProfile: !item["scheduledEventsProfile"]
      ? item["scheduledEventsProfile"]
      : scheduledEventsProfileSerializer(item["scheduledEventsProfile"]),
    userData: item["userData"],
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : virtualMachineScaleSetHardwareProfileSerializer(item["hardwareProfile"]),
  };
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

export function virtualMachineScaleSetUpdateOSProfileSerializer(
  item: VirtualMachineScaleSetUpdateOSProfile,
): any {
  return {
    customData: item["customData"],
    windowsConfiguration: !item["windowsConfiguration"]
      ? item["windowsConfiguration"]
      : windowsConfigurationSerializer(item["windowsConfiguration"]),
    linuxConfiguration: !item["linuxConfiguration"]
      ? item["linuxConfiguration"]
      : linuxConfigurationSerializer(item["linuxConfiguration"]),
    secrets: !item["secrets"] ? item["secrets"] : vaultSecretGroupArraySerializer(item["secrets"]),
  };
}

/** Describes a virtual machine scale set storage profile. */
export interface VirtualMachineScaleSetUpdateStorageProfile {
  /** The image reference. */
  imageReference?: ImageReference;
  /** The OS disk. */
  osDisk?: VirtualMachineScaleSetUpdateOSDisk;
  /** The data disks. */
  dataDisks?: VirtualMachineScaleSetDataDisk[];
  /** Specifies the disk controller type configured for the virtual machines in the scale set. **Note:** You need to deallocate the virtual machines in the scale set before updating its disk controller type based on the upgrade mode configured for the scale set. Minimum api-version: 2022-08-01 */
  diskControllerType?: DiskControllerTypes;
}

export function virtualMachineScaleSetUpdateStorageProfileSerializer(
  item: VirtualMachineScaleSetUpdateStorageProfile,
): any {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceSerializer(item["imageReference"]),
    osDisk: !item["osDisk"]
      ? item["osDisk"]
      : virtualMachineScaleSetUpdateOSDiskSerializer(item["osDisk"]),
    dataDisks: !item["dataDisks"]
      ? item["dataDisks"]
      : virtualMachineScaleSetDataDiskArraySerializer(item["dataDisks"]),
    diskControllerType: item["diskControllerType"],
  };
}

/** Describes virtual machine scale set operating system disk Update Object. This should be used for Updating VMSS OS Disk. */
export interface VirtualMachineScaleSetUpdateOSDisk {
  /** The caching type. */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies the ephemeral disk Settings for the operating system disk used by the virtual machine scale set. */
  diffDiskSettings?: DiffDiskSettings;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. <br><br> diskSizeGB is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023 */
  diskSizeGB?: number;
  /** The Source User Image VirtualHardDisk. This VirtualHardDisk will be copied before using it to attach to the Virtual Machine. If SourceImage is provided, the destination VirtualHardDisk should not exist. */
  image?: VirtualHardDisk;
  /** The list of virtual hard disk container uris. */
  vhdContainers?: string[];
  /** The managed disk parameters. */
  managedDisk?: VirtualMachineScaleSetManagedDiskParameters;
  /** Specifies whether OS Disk should be deleted or detached upon VMSS Flex deletion (This feature is available for VMSS with Flexible OrchestrationMode only). <br><br> Possible values: <br><br> **Delete** If this value is used, the OS disk is deleted when VMSS Flex VM is deleted.<br><br> **Detach** If this value is used, the OS disk is retained after VMSS Flex VM is deleted. <br><br> The default value is set to **Delete**. For an Ephemeral OS Disk, the default value is set to **Delete**. User cannot change the delete option for Ephemeral OS Disk. */
  deleteOption?: DiskDeleteOptionTypes;
}

export function virtualMachineScaleSetUpdateOSDiskSerializer(
  item: VirtualMachineScaleSetUpdateOSDisk,
): any {
  return {
    caching: item["caching"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
    diffDiskSettings: !item["diffDiskSettings"]
      ? item["diffDiskSettings"]
      : diffDiskSettingsSerializer(item["diffDiskSettings"]),
    diskSizeGB: item["diskSizeGB"],
    image: !item["image"] ? item["image"] : virtualHardDiskSerializer(item["image"]),
    vhdContainers: !item["vhdContainers"]
      ? item["vhdContainers"]
      : item["vhdContainers"].map((p: any) => {
          return p;
        }),
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : virtualMachineScaleSetManagedDiskParametersSerializer(item["managedDisk"]),
    deleteOption: item["deleteOption"],
  };
}

/** Describes a virtual machine scale set network profile. */
export interface VirtualMachineScaleSetUpdateNetworkProfile {
  /** A reference to a load balancer probe used to determine the health of an instance in the virtual machine scale set. The reference will be in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/probes/{probeName}'. */
  healthProbe?: ApiEntityReference;
  /** The list of network configurations. */
  networkInterfaceConfigurations?: VirtualMachineScaleSetUpdateNetworkConfiguration[];
  /** specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations for Virtual Machine Scale Set with orchestration mode 'Flexible' */
  networkApiVersion?: NetworkApiVersion;
}

export function virtualMachineScaleSetUpdateNetworkProfileSerializer(
  item: VirtualMachineScaleSetUpdateNetworkProfile,
): any {
  return {
    healthProbe: !item["healthProbe"]
      ? item["healthProbe"]
      : apiEntityReferenceSerializer(item["healthProbe"]),
    networkInterfaceConfigurations: !item["networkInterfaceConfigurations"]
      ? item["networkInterfaceConfigurations"]
      : virtualMachineScaleSetUpdateNetworkConfigurationArraySerializer(
          item["networkInterfaceConfigurations"],
        ),
    networkApiVersion: item["networkApiVersion"],
  };
}

export function virtualMachineScaleSetUpdateNetworkConfigurationArraySerializer(
  result: Array<VirtualMachineScaleSetUpdateNetworkConfiguration>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetUpdateNetworkConfigurationSerializer(item);
  });
}

/** Describes a virtual machine scale set network profile's network configurations. */
export interface VirtualMachineScaleSetUpdateNetworkConfiguration {
  /** The network configuration name. */
  name?: string;
  /** Describes a virtual machine scale set updatable network profile's IP configuration.Use this object for updating network profile's IP Configuration. */
  properties?: VirtualMachineScaleSetUpdateNetworkConfigurationProperties;
  /** Resource tags applied to the networkInterface address created by this NetworkInterfaceConfiguration */
  tags?: Record<string, string>;
}

export function virtualMachineScaleSetUpdateNetworkConfigurationSerializer(
  item: VirtualMachineScaleSetUpdateNetworkConfiguration,
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetUpdateNetworkConfigurationPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
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
  ipConfigurations?: VirtualMachineScaleSetUpdateIPConfiguration[];
  /** Whether IP forwarding enabled on this NIC. */
  enableIPForwarding?: boolean;
  /** Specify what happens to the network interface when the VM is deleted */
  deleteOption?: DeleteOptions;
  /** Specifies whether the Auxiliary mode is enabled for the Network Interface resource. */
  auxiliaryMode?: NetworkInterfaceAuxiliaryMode;
  /** Specifies whether the Auxiliary sku is enabled for the Network Interface resource. */
  auxiliarySku?: NetworkInterfaceAuxiliarySku;
}

export function virtualMachineScaleSetUpdateNetworkConfigurationPropertiesSerializer(
  item: VirtualMachineScaleSetUpdateNetworkConfigurationProperties,
): any {
  return {
    primary: item["primary"],
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    disableTcpStateTracking: item["disableTcpStateTracking"],
    enableFpga: item["enableFpga"],
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : subResourceSerializer(item["networkSecurityGroup"]),
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : virtualMachineScaleSetNetworkConfigurationDnsSettingsSerializer(item["dnsSettings"]),
    ipConfigurations: !item["ipConfigurations"]
      ? item["ipConfigurations"]
      : virtualMachineScaleSetUpdateIPConfigurationArraySerializer(item["ipConfigurations"]),
    enableIPForwarding: item["enableIPForwarding"],
    deleteOption: item["deleteOption"],
    auxiliaryMode: item["auxiliaryMode"],
    auxiliarySku: item["auxiliarySku"],
  };
}

export function virtualMachineScaleSetUpdateIPConfigurationArraySerializer(
  result: Array<VirtualMachineScaleSetUpdateIPConfiguration>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetUpdateIPConfigurationSerializer(item);
  });
}

/** Describes a virtual machine scale set network profile's IP configuration. NOTE: The subnet of a scale set may be modified as long as the original subnet and the new subnet are in the same virtual network */
export interface VirtualMachineScaleSetUpdateIPConfiguration {
  /** The IP configuration name. */
  name?: string;
  /** Describes a virtual machine scale set network profile's IP configuration properties. */
  properties?: VirtualMachineScaleSetUpdateIPConfigurationProperties;
}

export function virtualMachineScaleSetUpdateIPConfigurationSerializer(
  item: VirtualMachineScaleSetUpdateIPConfiguration,
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetUpdateIPConfigurationPropertiesSerializer(item["properties"]),
  };
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
  privateIPAddressVersion?: IPVersion;
  /** The application gateway backend address pools. */
  applicationGatewayBackendAddressPools?: SubResource[];
  /** Specifies an array of references to application security group. */
  applicationSecurityGroups?: SubResource[];
  /** The load balancer backend address pools. */
  loadBalancerBackendAddressPools?: SubResource[];
  /** The load balancer inbound nat pools. */
  loadBalancerInboundNatPools?: SubResource[];
}

export function virtualMachineScaleSetUpdateIPConfigurationPropertiesSerializer(
  item: VirtualMachineScaleSetUpdateIPConfigurationProperties,
): any {
  return {
    subnet: !item["subnet"] ? item["subnet"] : apiEntityReferenceSerializer(item["subnet"]),
    primary: item["primary"],
    publicIPAddressConfiguration: !item["publicIPAddressConfiguration"]
      ? item["publicIPAddressConfiguration"]
      : virtualMachineScaleSetUpdatePublicIPAddressConfigurationSerializer(
          item["publicIPAddressConfiguration"],
        ),
    privateIPAddressVersion: item["privateIPAddressVersion"],
    applicationGatewayBackendAddressPools: !item["applicationGatewayBackendAddressPools"]
      ? item["applicationGatewayBackendAddressPools"]
      : subResourceArraySerializer(item["applicationGatewayBackendAddressPools"]),
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : subResourceArraySerializer(item["applicationSecurityGroups"]),
    loadBalancerBackendAddressPools: !item["loadBalancerBackendAddressPools"]
      ? item["loadBalancerBackendAddressPools"]
      : subResourceArraySerializer(item["loadBalancerBackendAddressPools"]),
    loadBalancerInboundNatPools: !item["loadBalancerInboundNatPools"]
      ? item["loadBalancerInboundNatPools"]
      : subResourceArraySerializer(item["loadBalancerInboundNatPools"]),
  };
}

/** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
export interface VirtualMachineScaleSetUpdatePublicIPAddressConfiguration {
  /** The publicIP address configuration name. */
  name?: string;
  /** Describes a virtual machines scale set IP Configuration's PublicIPAddress configuration */
  properties?: VirtualMachineScaleSetUpdatePublicIPAddressConfigurationProperties;
  /** Resource tags applied to the publicIP address created by this PublicIPAddressConfiguration */
  tags?: Record<string, string>;
}

export function virtualMachineScaleSetUpdatePublicIPAddressConfigurationSerializer(
  item: VirtualMachineScaleSetUpdatePublicIPAddressConfiguration,
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetUpdatePublicIPAddressConfigurationPropertiesSerializer(
          item["properties"],
        ),
    tags: item["tags"],
  };
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
  deleteOption?: DeleteOptions;
}

export function virtualMachineScaleSetUpdatePublicIPAddressConfigurationPropertiesSerializer(
  item: VirtualMachineScaleSetUpdatePublicIPAddressConfigurationProperties,
): any {
  return {
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : virtualMachineScaleSetPublicIPAddressConfigurationDnsSettingsSerializer(
          item["dnsSettings"],
        ),
    publicIPPrefix: !item["publicIPPrefix"]
      ? item["publicIPPrefix"]
      : subResourceSerializer(item["publicIPPrefix"]),
    deleteOption: item["deleteOption"],
  };
}

/** Specifies the security posture to be used in the scale set. Minimum api-version: 2023-03-01 */
export interface SecurityPostureReferenceUpdate {
  /** The security posture reference id in the form of /CommunityGalleries/{communityGalleryName}/securityPostures/{securityPostureName}/versions/{major.minor.patch}|latest */
  id?: string;
  /** The list of virtual machine extension names to exclude when applying the security posture. */
  excludeExtensions?: string[];
  /** Whether the security posture can be overridden by the user. */
  isOverridable?: boolean;
}

export function securityPostureReferenceUpdateSerializer(
  item: SecurityPostureReferenceUpdate,
): any {
  return {
    id: item["id"],
    excludeExtensions: !item["excludeExtensions"]
      ? item["excludeExtensions"]
      : item["excludeExtensions"].map((p: any) => {
          return p;
        }),
    isOverridable: item["isOverridable"],
  };
}

/** The Update Resource model definition. */
export interface UpdateResource {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function updateResourceSerializer(item: UpdateResource): any {
  return { tags: item["tags"] };
}

/** The List Virtual Machine operation response. */
export interface _VirtualMachineScaleSetListResult {
  /** The list of virtual machine scale sets. */
  value: VirtualMachineScaleSet[];
  /** The uri to fetch the next page of Virtual Machine Scale Sets. Call ListNext() with this to fetch the next page of VMSS. */
  nextLink?: string;
}

export function _virtualMachineScaleSetListResultDeserializer(
  item: any,
): _VirtualMachineScaleSetListResult {
  return {
    value: virtualMachineScaleSetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualMachineScaleSetArraySerializer(
  result: Array<VirtualMachineScaleSet>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetSerializer(item);
  });
}

export function virtualMachineScaleSetArrayDeserializer(
  result: Array<VirtualMachineScaleSet>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetDeserializer(item);
  });
}

/** The List Virtual Machine operation response. */
export interface _VirtualMachineScaleSetListWithLinkResult {
  /** The list of virtual machine scale sets. */
  value: VirtualMachineScaleSet[];
  /** The uri to fetch the next page of Virtual Machine Scale Sets. Call ListNext() with this to fetch the next page of Virtual Machine Scale Sets. */
  nextLink?: string;
}

export function _virtualMachineScaleSetListWithLinkResultDeserializer(
  item: any,
): _VirtualMachineScaleSetListWithLinkResult {
  return {
    value: virtualMachineScaleSetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Specifies a list of virtual machine instance IDs from the VM scale set. */
export interface VirtualMachineScaleSetVMInstanceIDs {
  /** The virtual machine scale set instance ids. Omitting the virtual machine scale set instance ids will result in the operation being performed on all virtual machines in the virtual machine scale set. */
  instanceIds?: string[];
}

export function virtualMachineScaleSetVMInstanceIDsSerializer(
  item: VirtualMachineScaleSetVMInstanceIDs,
): any {
  return {
    instanceIds: !item["instanceIds"]
      ? item["instanceIds"]
      : item["instanceIds"].map((p: any) => {
          return p;
        }),
  };
}

/** model interface VMScaleSetConvertToSinglePlacementGroupInput */
export interface VMScaleSetConvertToSinglePlacementGroupInput {
  /** Id of the placement group in which you want future virtual machine instances to be placed. To query placement group Id, please use Virtual Machine Scale Set VMs - Get API. If not provided, the platform will choose one with maximum number of virtual machine instances. */
  activePlacementGroupId?: string;
}

export function vmScaleSetConvertToSinglePlacementGroupInputSerializer(
  item: VMScaleSetConvertToSinglePlacementGroupInput,
): any {
  return { activePlacementGroupId: item["activePlacementGroupId"] };
}

/** The request has succeeded. */
export interface OkResponse {}

export function okResponseDeserializer(item: any): OkResponse {
  return item;
}

/** Specifies a list of virtual machine instance IDs from the VM scale set. */
export interface VirtualMachineScaleSetVMInstanceRequiredIDs {
  /** The virtual machine scale set instance ids. */
  instanceIds: string[];
}

export function virtualMachineScaleSetVMInstanceRequiredIDsSerializer(
  item: VirtualMachineScaleSetVMInstanceRequiredIDs,
): any {
  return {
    instanceIds: item["instanceIds"].map((p: any) => {
      return p;
    }),
  };
}

/** Response after calling a manual recovery walk */
export interface RecoveryWalkResponse {
  /** Whether the recovery walk was performed */
  readonly walkPerformed?: boolean;
  /** The next update domain that needs to be walked. Null means walk spanning all update domains has been completed */
  readonly nextPlatformUpdateDomain?: number;
}

export function recoveryWalkResponseDeserializer(item: any): RecoveryWalkResponse {
  return {
    walkPerformed: item["walkPerformed"],
    nextPlatformUpdateDomain: item["nextPlatformUpdateDomain"],
  };
}

/** The instance view of a virtual machine scale set. */
export interface VirtualMachineScaleSetInstanceView {
  /** The instance view status summary for the virtual machine scale set. */
  readonly virtualMachine?: VirtualMachineScaleSetInstanceViewStatusesSummary;
  /** The extensions information. */
  readonly extensions?: VirtualMachineScaleSetVMExtensionsSummary[];
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
  /** The orchestration services information. */
  readonly orchestrationServices?: OrchestrationServiceSummary[];
}

export function virtualMachineScaleSetInstanceViewDeserializer(
  item: any,
): VirtualMachineScaleSetInstanceView {
  return {
    virtualMachine: !item["virtualMachine"]
      ? item["virtualMachine"]
      : virtualMachineScaleSetInstanceViewStatusesSummaryDeserializer(item["virtualMachine"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : virtualMachineScaleSetVMExtensionsSummaryArrayDeserializer(item["extensions"]),
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArrayDeserializer(item["statuses"]),
    orchestrationServices: !item["orchestrationServices"]
      ? item["orchestrationServices"]
      : orchestrationServiceSummaryArrayDeserializer(item["orchestrationServices"]),
  };
}

/** Instance view statuses summary for virtual machines of a virtual machine scale set. */
export interface VirtualMachineScaleSetInstanceViewStatusesSummary {
  /** The extensions information. */
  readonly statusesSummary?: VirtualMachineStatusCodeCount[];
}

export function virtualMachineScaleSetInstanceViewStatusesSummaryDeserializer(
  item: any,
): VirtualMachineScaleSetInstanceViewStatusesSummary {
  return {
    statusesSummary: !item["statusesSummary"]
      ? item["statusesSummary"]
      : virtualMachineStatusCodeCountArrayDeserializer(item["statusesSummary"]),
  };
}

export function virtualMachineStatusCodeCountArrayDeserializer(
  result: Array<VirtualMachineStatusCodeCount>,
): any[] {
  return result.map((item) => {
    return virtualMachineStatusCodeCountDeserializer(item);
  });
}

/** The status code and count of the virtual machine scale set instance view status summary. */
export interface VirtualMachineStatusCodeCount {
  /** The instance view status code. */
  readonly code?: string;
  /** The number of instances having a particular status code. */
  readonly count?: number;
}

export function virtualMachineStatusCodeCountDeserializer(
  item: any,
): VirtualMachineStatusCodeCount {
  return {
    code: item["code"],
    count: item["count"],
  };
}

export function virtualMachineScaleSetVMExtensionsSummaryArrayDeserializer(
  result: Array<VirtualMachineScaleSetVMExtensionsSummary>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetVMExtensionsSummaryDeserializer(item);
  });
}

/** Extensions summary for virtual machines of a virtual machine scale set. */
export interface VirtualMachineScaleSetVMExtensionsSummary {
  /** The extension name. */
  readonly name?: string;
  /** The extensions information. */
  readonly statusesSummary?: VirtualMachineStatusCodeCount[];
}

export function virtualMachineScaleSetVMExtensionsSummaryDeserializer(
  item: any,
): VirtualMachineScaleSetVMExtensionsSummary {
  return {
    name: item["name"],
    statusesSummary: !item["statusesSummary"]
      ? item["statusesSummary"]
      : virtualMachineStatusCodeCountArrayDeserializer(item["statusesSummary"]),
  };
}

export function instanceViewStatusArraySerializer(result: Array<InstanceViewStatus>): any[] {
  return result.map((item) => {
    return instanceViewStatusSerializer(item);
  });
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

export function instanceViewStatusSerializer(item: InstanceViewStatus): any {
  return {
    code: item["code"],
    level: item["level"],
    displayStatus: item["displayStatus"],
    message: item["message"],
    time: !item["time"] ? item["time"] : item["time"].toISOString(),
  };
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
export type StatusLevelTypes = "Info" | "Warning" | "Error";

export function orchestrationServiceSummaryArrayDeserializer(
  result: Array<OrchestrationServiceSummary>,
): any[] {
  return result.map((item) => {
    return orchestrationServiceSummaryDeserializer(item);
  });
}

/** Summary for an orchestration service of a virtual machine scale set. */
export interface OrchestrationServiceSummary {
  /** The name of the service. */
  readonly serviceName?: OrchestrationServiceNames;
  /** The current state of the service. */
  readonly serviceState?: OrchestrationServiceState;
  /** The latest operation status of the service. Minimum API version for this property is 2025-04-01. */
  readonly latestOperationStatus?: OrchestrationServiceOperationStatus;
  /** The last UTC time when the operation status changed. Minimum API version for this property is 2025-04-01. */
  readonly lastStatusChangeTime?: Date;
}

export function orchestrationServiceSummaryDeserializer(item: any): OrchestrationServiceSummary {
  return {
    serviceName: item["serviceName"],
    serviceState: item["serviceState"],
    latestOperationStatus: item["latestOperationStatus"],
    lastStatusChangeTime: !item["lastStatusChangeTime"]
      ? item["lastStatusChangeTime"]
      : new Date(item["lastStatusChangeTime"]),
  };
}

/** The name of the service. */
export enum KnownOrchestrationServiceNames {
  /** AutomaticRepairs */
  AutomaticRepairs = "AutomaticRepairs",
  /** AutomaticZoneRebalancing orchestration service. */
  AutomaticZoneRebalancing = "AutomaticZoneRebalancing",
}

/**
 * The name of the service. \
 * {@link KnownOrchestrationServiceNames} can be used interchangeably with OrchestrationServiceNames,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AutomaticRepairs** \
 * **AutomaticZoneRebalancing**: AutomaticZoneRebalancing orchestration service.
 */
export type OrchestrationServiceNames = string;

/** The current state of the service. */
export enum KnownOrchestrationServiceState {
  /** NotRunning */
  NotRunning = "NotRunning",
  /** Running */
  Running = "Running",
  /** Suspended */
  Suspended = "Suspended",
}

/**
 * The current state of the service. \
 * {@link KnownOrchestrationServiceState} can be used interchangeably with OrchestrationServiceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotRunning** \
 * **Running** \
 * **Suspended**
 */
export type OrchestrationServiceState = string;

/** The latest operation status of the service. */
export enum KnownOrchestrationServiceOperationStatus {
  /** InProgress orchestration service operation status. */
  InProgress = "InProgress",
  /** Completed orchestration service operation status. */
  Completed = "Completed",
}

/**
 * The latest operation status of the service. \
 * {@link KnownOrchestrationServiceOperationStatus} can be used interchangeably with OrchestrationServiceOperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: InProgress orchestration service operation status. \
 * **Completed**: Completed orchestration service operation status.
 */
export type OrchestrationServiceOperationStatus = string;

/** List of Virtual Machine Scale Set OS Upgrade History operation response. */
export interface _VirtualMachineScaleSetListOSUpgradeHistory {
  /** The list of OS upgrades performed on the virtual machine scale set. */
  value: UpgradeOperationHistoricalStatusInfo[];
  /** The uri to fetch the next page of OS Upgrade History. Call ListNext() with this to fetch the next page of history of upgrades. */
  nextLink?: string;
}

export function _virtualMachineScaleSetListOSUpgradeHistoryDeserializer(
  item: any,
): _VirtualMachineScaleSetListOSUpgradeHistory {
  return {
    value: upgradeOperationHistoricalStatusInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function upgradeOperationHistoricalStatusInfoArrayDeserializer(
  result: Array<UpgradeOperationHistoricalStatusInfo>,
): any[] {
  return result.map((item) => {
    return upgradeOperationHistoricalStatusInfoDeserializer(item);
  });
}

/** Virtual Machine Scale Set OS Upgrade History operation response. */
export interface UpgradeOperationHistoricalStatusInfo {
  /** Information about the properties of the upgrade operation. */
  readonly properties?: UpgradeOperationHistoricalStatusInfoProperties;
  /** Resource type */
  readonly type?: string;
  /** Resource location */
  readonly location?: string;
}

export function upgradeOperationHistoricalStatusInfoDeserializer(
  item: any,
): UpgradeOperationHistoricalStatusInfo {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : upgradeOperationHistoricalStatusInfoPropertiesDeserializer(item["properties"]),
    type: item["type"],
    location: item["location"],
  };
}

/** Describes each OS upgrade on the Virtual Machine Scale Set. */
export interface UpgradeOperationHistoricalStatusInfoProperties {
  /** Information about the overall status of the upgrade operation. */
  readonly runningStatus?: UpgradeOperationHistoryStatus;
  /** Counts of the VMs in each state. */
  readonly progress?: RollingUpgradeProgressInfo;
  /** Error Details for this upgrade if there are any. */
  readonly error?: ApiError;
  /** Invoker of the Upgrade Operation */
  readonly startedBy?: UpgradeOperationInvoker;
  /** Image Reference details */
  readonly targetImageReference?: ImageReference;
  /** Information about OS rollback if performed */
  readonly rollbackInfo?: RollbackStatusInfo;
}

export function upgradeOperationHistoricalStatusInfoPropertiesDeserializer(
  item: any,
): UpgradeOperationHistoricalStatusInfoProperties {
  return {
    runningStatus: !item["runningStatus"]
      ? item["runningStatus"]
      : upgradeOperationHistoryStatusDeserializer(item["runningStatus"]),
    progress: !item["progress"]
      ? item["progress"]
      : rollingUpgradeProgressInfoDeserializer(item["progress"]),
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
    startedBy: item["startedBy"],
    targetImageReference: !item["targetImageReference"]
      ? item["targetImageReference"]
      : imageReferenceDeserializer(item["targetImageReference"]),
    rollbackInfo: !item["rollbackInfo"]
      ? item["rollbackInfo"]
      : rollbackStatusInfoDeserializer(item["rollbackInfo"]),
  };
}

/** Information about the current running state of the overall upgrade. */
export interface UpgradeOperationHistoryStatus {
  /** Code indicating the current status of the upgrade. */
  readonly code?: UpgradeState;
  /** Start time of the upgrade. */
  readonly startTime?: Date;
  /** End time of the upgrade. */
  readonly endTime?: Date;
}

export function upgradeOperationHistoryStatusDeserializer(
  item: any,
): UpgradeOperationHistoryStatus {
  return {
    code: item["code"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
  };
}

/** Code indicating the current status of the upgrade. */
export type UpgradeState = "RollingForward" | "Cancelled" | "Completed" | "Faulted";

/** Information about the number of virtual machine instances in each upgrade state. */
export interface RollingUpgradeProgressInfo {
  /** The number of instances that have been successfully upgraded. */
  readonly successfulInstanceCount?: number;
  /** The number of instances that have failed to be upgraded successfully. */
  readonly failedInstanceCount?: number;
  /** The number of instances that are currently being upgraded. */
  readonly inProgressInstanceCount?: number;
  /** The number of instances that have not yet begun to be upgraded. */
  readonly pendingInstanceCount?: number;
}

export function rollingUpgradeProgressInfoDeserializer(item: any): RollingUpgradeProgressInfo {
  return {
    successfulInstanceCount: item["successfulInstanceCount"],
    failedInstanceCount: item["failedInstanceCount"],
    inProgressInstanceCount: item["inProgressInstanceCount"],
    pendingInstanceCount: item["pendingInstanceCount"],
  };
}

/** Invoker of the Upgrade Operation */
export type UpgradeOperationInvoker = "Unknown" | "User" | "Platform";

/** Information about rollback on failed VM instances after a OS Upgrade operation. */
export interface RollbackStatusInfo {
  /** The number of instances which have been successfully rolled back. */
  readonly successfullyRolledbackInstanceCount?: number;
  /** The number of instances which failed to rollback. */
  readonly failedRolledbackInstanceCount?: number;
  /** Error details if OS rollback failed. */
  readonly rollbackError?: ApiError;
}

export function rollbackStatusInfoDeserializer(item: any): RollbackStatusInfo {
  return {
    successfullyRolledbackInstanceCount: item["successfullyRolledbackInstanceCount"],
    failedRolledbackInstanceCount: item["failedRolledbackInstanceCount"],
    rollbackError: !item["rollbackError"]
      ? item["rollbackError"]
      : apiErrorDeserializer(item["rollbackError"]),
  };
}

/** Describes a Virtual Machine Scale Set VM Reimage Parameters. */
export interface VirtualMachineScaleSetReimageParameters
  extends VirtualMachineScaleSetVMReimageParameters {
  /** The virtual machine scale set instance ids. Omitting the virtual machine scale set instance ids will result in the operation being performed on all virtual machines in the virtual machine scale set. */
  instanceIds?: string[];
}

export function virtualMachineScaleSetReimageParametersSerializer(
  item: VirtualMachineScaleSetReimageParameters,
): any {
  return {
    forceUpdateOSDiskForEphemeral: item["forceUpdateOSDiskForEphemeral"],
    tempDisk: item["tempDisk"],
    exactVersion: item["exactVersion"],
    osProfile: !item["osProfile"]
      ? item["osProfile"]
      : osProfileProvisioningDataSerializer(item["osProfile"]),
    instanceIds: !item["instanceIds"]
      ? item["instanceIds"]
      : item["instanceIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Describes a Virtual Machine Scale Set VM Reimage Parameters. */
export interface VirtualMachineScaleSetVMReimageParameters extends VirtualMachineReimageParameters {
  /** Parameter to force update ephemeral OS disk for a virtual machine scale set VM */
  forceUpdateOSDiskForEphemeral?: boolean;
}

export function virtualMachineScaleSetVMReimageParametersSerializer(
  item: VirtualMachineScaleSetVMReimageParameters,
): any {
  return {
    tempDisk: item["tempDisk"],
    exactVersion: item["exactVersion"],
    osProfile: !item["osProfile"]
      ? item["osProfile"]
      : osProfileProvisioningDataSerializer(item["osProfile"]),
    forceUpdateOSDiskForEphemeral: item["forceUpdateOSDiskForEphemeral"],
  };
}

/** Parameters for Reimaging Virtual Machine. NOTE: Virtual Machine OS disk will always be reimaged */
export interface VirtualMachineReimageParameters {
  /** Specifies whether to reimage temp disk. Default value: false. Note: This temp disk reimage parameter is only supported for VM/VMSS with Ephemeral OS disk. */
  tempDisk?: boolean;
  /** Specifies in decimal number, the version the OS disk should be reimaged to. If exact version is not provided, the OS disk is reimaged to the existing version of OS Disk. */
  exactVersion?: string;
  /** Specifies information required for reimaging the non-ephemeral OS disk. */
  osProfile?: OSProfileProvisioningData;
}

export function virtualMachineReimageParametersSerializer(
  item: VirtualMachineReimageParameters,
): any {
  return {
    tempDisk: item["tempDisk"],
    exactVersion: item["exactVersion"],
    osProfile: !item["osProfile"]
      ? item["osProfile"]
      : osProfileProvisioningDataSerializer(item["osProfile"]),
  };
}

/** Additional parameters for Reimaging Non-Ephemeral Virtual Machine. */
export interface OSProfileProvisioningData {
  /** Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection) */
  adminPassword?: string;
  /** Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. **Note: Do not pass any secrets or passwords in customData property.** This property cannot be updated after the VM is created. The property customData is passed to the VM to be saved as a file, for more information see [Custom Data on Azure VMs](https://azure.microsoft.com/blog/custom-data-and-cloud-init-on-windows-azure/). If using cloud-init for your Linux VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init). */
  customData?: string;
}

export function osProfileProvisioningDataSerializer(item: OSProfileProvisioningData): any {
  return {
    adminPassword: item["adminPassword"],
    customData: item["customData"],
  };
}

/** The input for OrchestrationServiceState */
export interface OrchestrationServiceStateInput {
  /** The name of the service. */
  serviceName: OrchestrationServiceNames;
  /** The action to be performed. */
  action: OrchestrationServiceStateAction;
}

export function orchestrationServiceStateInputSerializer(
  item: OrchestrationServiceStateInput,
): any {
  return { serviceName: item["serviceName"], action: item["action"] };
}

/** The action to be performed. */
export enum KnownOrchestrationServiceStateAction {
  /** Resume */
  Resume = "Resume",
  /** Suspend */
  Suspend = "Suspend",
}

/**
 * The action to be performed. \
 * {@link KnownOrchestrationServiceStateAction} can be used interchangeably with OrchestrationServiceStateAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Resume** \
 * **Suspend**
 */
export type OrchestrationServiceStateAction = string;

/** The Virtual Machine Scale Set List Skus operation response. */
export interface _VirtualMachineScaleSetListSkusResult {
  /** The list of skus available for the virtual machine scale set. */
  value: VirtualMachineScaleSetSku[];
  /** The uri to fetch the next page of Virtual Machine Scale Set Skus. Call ListNext() with this to fetch the next page of VMSS Skus. */
  nextLink?: string;
}

export function _virtualMachineScaleSetListSkusResultDeserializer(
  item: any,
): _VirtualMachineScaleSetListSkusResult {
  return {
    value: virtualMachineScaleSetSkuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualMachineScaleSetSkuArrayDeserializer(
  result: Array<VirtualMachineScaleSetSku>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetSkuDeserializer(item);
  });
}

/** Describes an available virtual machine scale set sku. */
export interface VirtualMachineScaleSetSku {
  /** The type of resource the sku applies to. */
  readonly resourceType?: string;
  /** The Sku. */
  readonly sku?: Sku;
  /** Specifies the number of virtual machines in the scale set. */
  readonly capacity?: VirtualMachineScaleSetSkuCapacity;
}

export function virtualMachineScaleSetSkuDeserializer(item: any): VirtualMachineScaleSetSku {
  return {
    resourceType: item["resourceType"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    capacity: !item["capacity"]
      ? item["capacity"]
      : virtualMachineScaleSetSkuCapacityDeserializer(item["capacity"]),
  };
}

/** Describes scaling information of a sku. */
export interface VirtualMachineScaleSetSkuCapacity {
  /** The minimum capacity. */
  readonly minimum?: number;
  /** The maximum capacity that can be set. */
  readonly maximum?: number;
  /** The default capacity. */
  readonly defaultCapacity?: number;
  /** The scale type applicable to the sku. */
  readonly scaleType?: VirtualMachineScaleSetSkuScaleType;
}

export function virtualMachineScaleSetSkuCapacityDeserializer(
  item: any,
): VirtualMachineScaleSetSkuCapacity {
  return {
    minimum: item["minimum"],
    maximum: item["maximum"],
    defaultCapacity: item["defaultCapacity"],
    scaleType: item["scaleType"],
  };
}

/** The scale type applicable to the sku. */
export type VirtualMachineScaleSetSkuScaleType = "Automatic" | "None";

/** The input for ScaleOut */
export interface VMScaleSetScaleOutInput {
  /** Specifies the number of virtual machines in the scale set. */
  capacity: number;
  /** The input properties for ScaleOut */
  properties?: VMScaleSetScaleOutInputProperties;
}

export function vmScaleSetScaleOutInputSerializer(item: VMScaleSetScaleOutInput): any {
  return {
    capacity: item["capacity"],
    properties: !item["properties"]
      ? item["properties"]
      : vmScaleSetScaleOutInputPropertiesSerializer(item["properties"]),
  };
}

/** The input properties for ScaleOut */
export interface VMScaleSetScaleOutInputProperties {
  /** The zone in which the scale out is requested for the virtual machine scale set. */
  zone?: string;
}

export function vmScaleSetScaleOutInputPropertiesSerializer(
  item: VMScaleSetScaleOutInputProperties,
): any {
  return { zone: item["zone"] };
}

/** The status of the latest virtual machine scale set rolling upgrade. */
export interface RollingUpgradeStatusInfo extends TrackedResource {
  /** The status of the latest virtual machine scale set rolling upgrade. */
  properties?: RollingUpgradeStatusInfoProperties;
}

export function rollingUpgradeStatusInfoDeserializer(item: any): RollingUpgradeStatusInfo {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : rollingUpgradeStatusInfoPropertiesDeserializer(item["properties"]),
  };
}

/** The status of the latest virtual machine scale set rolling upgrade. */
export interface RollingUpgradeStatusInfoProperties {
  /** The rolling upgrade policies applied for this upgrade. */
  readonly policy?: RollingUpgradePolicy;
  /** Information about the current running state of the overall upgrade. */
  readonly runningStatus?: RollingUpgradeRunningStatus;
  /** Information about the number of virtual machine instances in each upgrade state. */
  readonly progress?: RollingUpgradeProgressInfo;
  /** Error details for this upgrade, if there are any. */
  readonly error?: ApiError;
}

export function rollingUpgradeStatusInfoPropertiesDeserializer(
  item: any,
): RollingUpgradeStatusInfoProperties {
  return {
    policy: !item["policy"] ? item["policy"] : rollingUpgradePolicyDeserializer(item["policy"]),
    runningStatus: !item["runningStatus"]
      ? item["runningStatus"]
      : rollingUpgradeRunningStatusDeserializer(item["runningStatus"]),
    progress: !item["progress"]
      ? item["progress"]
      : rollingUpgradeProgressInfoDeserializer(item["progress"]),
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
  };
}

/** Information about the current running state of the overall upgrade. */
export interface RollingUpgradeRunningStatus {
  /** Code indicating the current status of the upgrade. */
  readonly code?: RollingUpgradeStatusCode;
  /** Start time of the upgrade. */
  readonly startTime?: Date;
  /** The last action performed on the rolling upgrade. */
  readonly lastAction?: RollingUpgradeActionType;
  /** Last action time of the upgrade. */
  readonly lastActionTime?: Date;
}

export function rollingUpgradeRunningStatusDeserializer(item: any): RollingUpgradeRunningStatus {
  return {
    code: item["code"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    lastAction: item["lastAction"],
    lastActionTime: !item["lastActionTime"]
      ? item["lastActionTime"]
      : new Date(item["lastActionTime"]),
  };
}

/** Code indicating the current status of the upgrade. */
export type RollingUpgradeStatusCode = "RollingForward" | "Cancelled" | "Completed" | "Faulted";
/** The last action performed on the rolling upgrade. */
export type RollingUpgradeActionType = "Start" | "Cancel";

/** Describes a Virtual Machine Scale Set Extension. */
export interface VirtualMachineScaleSetExtensionUpdate extends SubResourceReadOnly {
  /** The name of the extension. */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Describes the properties of a Virtual Machine Scale Set Extension. */
  properties?: VirtualMachineScaleSetExtensionProperties;
}

export function virtualMachineScaleSetExtensionUpdateSerializer(
  item: VirtualMachineScaleSetExtensionUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetExtensionPropertiesSerializer(item["properties"]),
  };
}

/** The List VM scale set extension operation response. */
export interface _VirtualMachineScaleSetExtensionListResult {
  /** The list of VM scale set extensions. */
  value: VirtualMachineScaleSetExtension[];
  /** The uri to fetch the next page of VM scale set extensions. Call ListNext() with this to fetch the next page of VM scale set extensions. */
  nextLink?: string;
}

export function _virtualMachineScaleSetExtensionListResultDeserializer(
  item: any,
): _VirtualMachineScaleSetExtensionListResult {
  return {
    value: virtualMachineScaleSetExtensionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Describes a virtual machine scale set virtual machine. */
export interface VirtualMachineScaleSetVM extends TrackedResource {
  /** Describes the properties of a virtual machine scale set virtual machine. */
  properties?: VirtualMachineScaleSetVMProperties;
  /** The virtual machine instance ID. */
  readonly instanceId?: string;
  /** The virtual machine SKU. */
  readonly sku?: Sku;
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: Plan;
  /** The virtual machine child extension resources. */
  readonly resources?: VirtualMachineExtension[];
  /** The virtual machine zones. */
  readonly zones?: string[];
  /** The identity of the virtual machine, if configured. */
  identity?: VirtualMachineIdentity;
  /** Etag is property returned in Update/Get response of the VMSS VM, so that customer can supply it in the header to ensure optimistic updates. */
  readonly etag?: string;
}

export function virtualMachineScaleSetVMSerializer(item: VirtualMachineScaleSetVM): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetVMPropertiesSerializer(item["properties"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
    identity: !item["identity"]
      ? item["identity"]
      : virtualMachineIdentitySerializer(item["identity"]),
  };
}

export function virtualMachineScaleSetVMDeserializer(item: any): VirtualMachineScaleSetVM {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetVMPropertiesDeserializer(item["properties"]),
    instanceId: item["instanceId"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
    resources: !item["resources"]
      ? item["resources"]
      : virtualMachineExtensionArrayDeserializer(item["resources"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identity: !item["identity"]
      ? item["identity"]
      : virtualMachineIdentityDeserializer(item["identity"]),
    etag: item["etag"],
  };
}

/** Describes the properties of a virtual machine scale set virtual machine. */
export interface VirtualMachineScaleSetVMProperties {
  /** Specifies whether the latest model has been applied to the virtual machine. */
  readonly latestModelApplied?: boolean;
  /** Azure VM unique ID. */
  readonly vmId?: string;
  /** The virtual machine instance view. */
  readonly instanceView?: VirtualMachineScaleSetVMInstanceView;
  /** Specifies the hardware settings for the virtual machine. */
  hardwareProfile?: HardwareProfile;
  /** Specifies the resilient VM deletion status for the virtual machine. */
  resilientVMDeletionStatus?: ResilientVMDeletionStatus;
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
  /** Specifies the boot diagnostic settings state. Minimum api-version: 2015-06-15. */
  diagnosticsProfile?: DiagnosticsProfile;
  /** Specifies information about the availability set that the virtual machine should be assigned to. Virtual machines specified in the same availability set are allocated to different nodes to maximize availability. For more information about availability sets, see [Availability sets overview](https://docs.microsoft.com/azure/virtual-machines/availability-set-overview). For more information on Azure planned maintenance, see [Maintenance and updates for Virtual Machines in Azure](https://docs.microsoft.com/azure/virtual-machines/maintenance-and-updates). Currently, a VM can only be added to availability set at creation time. An existing VM cannot be added to an availability set. */
  availabilitySet?: SubResource;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 */
  licenseType?: string;
  /** Specifies whether the model applied to the virtual machine is the model of the virtual machine scale set or the customized model for the virtual machine. */
  readonly modelDefinitionApplied?: string;
  /** Specifies the protection policy of the virtual machine. */
  protectionPolicy?: VirtualMachineScaleSetVMProtectionPolicy;
  /** UserData for the VM, which must be base-64 encoded. Customer should not pass any secrets in here. Minimum api-version: 2021-03-01 */
  userData?: string;
  /** Specifies the time at which the Virtual Machine resource was created. Minimum api-version: 2021-11-01. */
  readonly timeCreated?: Date;
}

export function virtualMachineScaleSetVMPropertiesSerializer(
  item: VirtualMachineScaleSetVMProperties,
): any {
  return {
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hardwareProfileSerializer(item["hardwareProfile"]),
    resilientVMDeletionStatus: item["resilientVMDeletionStatus"],
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileSerializer(item["storageProfile"]),
    additionalCapabilities: !item["additionalCapabilities"]
      ? item["additionalCapabilities"]
      : additionalCapabilitiesSerializer(item["additionalCapabilities"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileSerializer(item["osProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileSerializer(item["securityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
    networkProfileConfiguration: !item["networkProfileConfiguration"]
      ? item["networkProfileConfiguration"]
      : virtualMachineScaleSetVMNetworkProfileConfigurationSerializer(
          item["networkProfileConfiguration"],
        ),
    diagnosticsProfile: !item["diagnosticsProfile"]
      ? item["diagnosticsProfile"]
      : diagnosticsProfileSerializer(item["diagnosticsProfile"]),
    availabilitySet: !item["availabilitySet"]
      ? item["availabilitySet"]
      : subResourceSerializer(item["availabilitySet"]),
    licenseType: item["licenseType"],
    protectionPolicy: !item["protectionPolicy"]
      ? item["protectionPolicy"]
      : virtualMachineScaleSetVMProtectionPolicySerializer(item["protectionPolicy"]),
    userData: item["userData"],
  };
}

export function virtualMachineScaleSetVMPropertiesDeserializer(
  item: any,
): VirtualMachineScaleSetVMProperties {
  return {
    latestModelApplied: item["latestModelApplied"],
    vmId: item["vmId"],
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : virtualMachineScaleSetVMInstanceViewDeserializer(item["instanceView"]),
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hardwareProfileDeserializer(item["hardwareProfile"]),
    resilientVMDeletionStatus: item["resilientVMDeletionStatus"],
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileDeserializer(item["storageProfile"]),
    additionalCapabilities: !item["additionalCapabilities"]
      ? item["additionalCapabilities"]
      : additionalCapabilitiesDeserializer(item["additionalCapabilities"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileDeserializer(item["osProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileDeserializer(item["securityProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileDeserializer(item["networkProfile"]),
    networkProfileConfiguration: !item["networkProfileConfiguration"]
      ? item["networkProfileConfiguration"]
      : virtualMachineScaleSetVMNetworkProfileConfigurationDeserializer(
          item["networkProfileConfiguration"],
        ),
    diagnosticsProfile: !item["diagnosticsProfile"]
      ? item["diagnosticsProfile"]
      : diagnosticsProfileDeserializer(item["diagnosticsProfile"]),
    availabilitySet: !item["availabilitySet"]
      ? item["availabilitySet"]
      : subResourceDeserializer(item["availabilitySet"]),
    provisioningState: item["provisioningState"],
    licenseType: item["licenseType"],
    modelDefinitionApplied: item["modelDefinitionApplied"],
    protectionPolicy: !item["protectionPolicy"]
      ? item["protectionPolicy"]
      : virtualMachineScaleSetVMProtectionPolicyDeserializer(item["protectionPolicy"]),
    userData: item["userData"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
  };
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
  /** The health status for the VM. */
  readonly vmHealth?: VirtualMachineHealthStatus;
  /** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. You can easily view the output of your console log. Azure also enables you to see a screenshot of the VM from the hypervisor. */
  bootDiagnostics?: BootDiagnosticsInstanceView;
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
  /** Resource id of the dedicated host, on which the virtual machine is allocated through automatic placement, when the virtual machine is associated with a dedicated host group that has automatic placement enabled. Minimum api-version: 2020-06-01. */
  readonly assignedHost?: string;
  /** The placement group in which the VM is running. If the VM is deallocated it will not have a placementGroupId. */
  placementGroupId?: string;
  /** Specifies the host OS name of the virtual machine. <br><br> This name cannot be updated after the VM is created. <br><br> **Max-length (Windows):** 15 characters <br><br> **Max-length (Linux):** 64 characters. <br><br> For naming conventions and restrictions see [Azure infrastructure services implementation guidelines](https://docs.microsoft.com/azure/virtual-machines/virtual-machines-linux-infrastructure-subscription-accounts-guidelines?toc=%2fazure%2fvirtual-machines%2flinux%2ftoc.json#1-naming-conventions). */
  computerName?: string;
  /** The Operating System running on the hybrid machine. */
  osName?: string;
  /** The version of Operating System running on the hybrid machine. */
  osVersion?: string;
  /** The hypervisor generation of the Virtual Machine [V1, V2] */
  hyperVGeneration?: HyperVGeneration;
}

export function virtualMachineScaleSetVMInstanceViewDeserializer(
  item: any,
): VirtualMachineScaleSetVMInstanceView {
  return {
    platformUpdateDomain: item["platformUpdateDomain"],
    platformFaultDomain: item["platformFaultDomain"],
    rdpThumbPrint: item["rdpThumbPrint"],
    vmAgent: !item["vmAgent"]
      ? item["vmAgent"]
      : virtualMachineAgentInstanceViewDeserializer(item["vmAgent"]),
    maintenanceRedeployStatus: !item["maintenanceRedeployStatus"]
      ? item["maintenanceRedeployStatus"]
      : maintenanceRedeployStatusDeserializer(item["maintenanceRedeployStatus"]),
    disks: !item["disks"] ? item["disks"] : diskInstanceViewArrayDeserializer(item["disks"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : virtualMachineExtensionInstanceViewArrayDeserializer(item["extensions"]),
    vmHealth: !item["vmHealth"]
      ? item["vmHealth"]
      : virtualMachineHealthStatusDeserializer(item["vmHealth"]),
    bootDiagnostics: !item["bootDiagnostics"]
      ? item["bootDiagnostics"]
      : bootDiagnosticsInstanceViewDeserializer(item["bootDiagnostics"]),
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArrayDeserializer(item["statuses"]),
    assignedHost: item["assignedHost"],
    placementGroupId: item["placementGroupId"],
    computerName: item["computerName"],
    osName: item["osName"],
    osVersion: item["osVersion"],
    hyperVGeneration: item["hyperVGeneration"],
  };
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

export function virtualMachineAgentInstanceViewDeserializer(
  item: any,
): VirtualMachineAgentInstanceView {
  return {
    vmAgentVersion: item["vmAgentVersion"],
    extensionHandlers: !item["extensionHandlers"]
      ? item["extensionHandlers"]
      : virtualMachineExtensionHandlerInstanceViewArrayDeserializer(item["extensionHandlers"]),
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArrayDeserializer(item["statuses"]),
  };
}

export function virtualMachineExtensionHandlerInstanceViewArrayDeserializer(
  result: Array<VirtualMachineExtensionHandlerInstanceView>,
): any[] {
  return result.map((item) => {
    return virtualMachineExtensionHandlerInstanceViewDeserializer(item);
  });
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

export function virtualMachineExtensionHandlerInstanceViewDeserializer(
  item: any,
): VirtualMachineExtensionHandlerInstanceView {
  return {
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    status: !item["status"] ? item["status"] : instanceViewStatusDeserializer(item["status"]),
  };
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

export function maintenanceRedeployStatusDeserializer(item: any): MaintenanceRedeployStatus {
  return {
    isCustomerInitiatedMaintenanceAllowed: item["isCustomerInitiatedMaintenanceAllowed"],
    preMaintenanceWindowStartTime: !item["preMaintenanceWindowStartTime"]
      ? item["preMaintenanceWindowStartTime"]
      : new Date(item["preMaintenanceWindowStartTime"]),
    preMaintenanceWindowEndTime: !item["preMaintenanceWindowEndTime"]
      ? item["preMaintenanceWindowEndTime"]
      : new Date(item["preMaintenanceWindowEndTime"]),
    maintenanceWindowStartTime: !item["maintenanceWindowStartTime"]
      ? item["maintenanceWindowStartTime"]
      : new Date(item["maintenanceWindowStartTime"]),
    maintenanceWindowEndTime: !item["maintenanceWindowEndTime"]
      ? item["maintenanceWindowEndTime"]
      : new Date(item["maintenanceWindowEndTime"]),
    lastOperationResultCode: item["lastOperationResultCode"],
    lastOperationMessage: item["lastOperationMessage"],
  };
}

/** The Last Maintenance Operation Result Code. */
export type MaintenanceOperationResultCodeTypes =
  | "None"
  | "RetryLater"
  | "MaintenanceAborted"
  | "MaintenanceCompleted";

export function diskInstanceViewArrayDeserializer(result: Array<DiskInstanceView>): any[] {
  return result.map((item) => {
    return diskInstanceViewDeserializer(item);
  });
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

export function diskInstanceViewDeserializer(item: any): DiskInstanceView {
  return {
    name: item["name"],
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : diskEncryptionSettingsArrayDeserializer(item["encryptionSettings"]),
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArrayDeserializer(item["statuses"]),
  };
}

export function diskEncryptionSettingsArraySerializer(
  result: Array<DiskEncryptionSettings>,
): any[] {
  return result.map((item) => {
    return diskEncryptionSettingsSerializer(item);
  });
}

export function diskEncryptionSettingsArrayDeserializer(
  result: Array<DiskEncryptionSettings>,
): any[] {
  return result.map((item) => {
    return diskEncryptionSettingsDeserializer(item);
  });
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

export function diskEncryptionSettingsSerializer(item: DiskEncryptionSettings): any {
  return {
    diskEncryptionKey: !item["diskEncryptionKey"]
      ? item["diskEncryptionKey"]
      : keyVaultSecretReferenceSerializer(item["diskEncryptionKey"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyVaultKeyReferenceSerializer(item["keyEncryptionKey"]),
    enabled: item["enabled"],
  };
}

export function diskEncryptionSettingsDeserializer(item: any): DiskEncryptionSettings {
  return {
    diskEncryptionKey: !item["diskEncryptionKey"]
      ? item["diskEncryptionKey"]
      : keyVaultSecretReferenceDeserializer(item["diskEncryptionKey"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyVaultKeyReferenceDeserializer(item["keyEncryptionKey"]),
    enabled: item["enabled"],
  };
}

/** Describes a reference to Key Vault Key */
export interface KeyVaultKeyReference {
  /** The URL referencing a key encryption key in Key Vault. */
  keyUrl: string;
  /** The relative URL of the Key Vault containing the key. */
  sourceVault: SubResource;
}

export function keyVaultKeyReferenceSerializer(item: KeyVaultKeyReference): any {
  return {
    keyUrl: item["keyUrl"],
    sourceVault: subResourceSerializer(item["sourceVault"]),
  };
}

export function keyVaultKeyReferenceDeserializer(item: any): KeyVaultKeyReference {
  return {
    keyUrl: item["keyUrl"],
    sourceVault: subResourceDeserializer(item["sourceVault"]),
  };
}

export function virtualMachineExtensionInstanceViewArraySerializer(
  result: Array<VirtualMachineExtensionInstanceView>,
): any[] {
  return result.map((item) => {
    return virtualMachineExtensionInstanceViewSerializer(item);
  });
}

export function virtualMachineExtensionInstanceViewArrayDeserializer(
  result: Array<VirtualMachineExtensionInstanceView>,
): any[] {
  return result.map((item) => {
    return virtualMachineExtensionInstanceViewDeserializer(item);
  });
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
): any {
  return {
    name: item["name"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    substatuses: !item["substatuses"]
      ? item["substatuses"]
      : instanceViewStatusArraySerializer(item["substatuses"]),
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArraySerializer(item["statuses"]),
  };
}

export function virtualMachineExtensionInstanceViewDeserializer(
  item: any,
): VirtualMachineExtensionInstanceView {
  return {
    name: item["name"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    substatuses: !item["substatuses"]
      ? item["substatuses"]
      : instanceViewStatusArrayDeserializer(item["substatuses"]),
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArrayDeserializer(item["statuses"]),
  };
}

/** The health status of the VM. */
export interface VirtualMachineHealthStatus {
  /** The health status information for the VM. */
  readonly status?: InstanceViewStatus;
}

export function virtualMachineHealthStatusDeserializer(item: any): VirtualMachineHealthStatus {
  return {
    status: !item["status"] ? item["status"] : instanceViewStatusDeserializer(item["status"]),
  };
}

/** The instance view of a virtual machine boot diagnostics. */
export interface BootDiagnosticsInstanceView {
  /** The console screenshot blob URI. **Note:** This will **not** be set if boot diagnostics is currently enabled with managed storage. */
  readonly consoleScreenshotBlobUri?: string;
  /** The serial console log blob Uri. **Note:** This will **not** be set if boot diagnostics is currently enabled with managed storage. */
  readonly serialConsoleLogBlobUri?: string;
  /** The boot diagnostics status information for the VM. **Note:** It will be set only if there are errors encountered in enabling boot diagnostics. */
  readonly status?: InstanceViewStatus;
}

export function bootDiagnosticsInstanceViewDeserializer(item: any): BootDiagnosticsInstanceView {
  return {
    consoleScreenshotBlobUri: item["consoleScreenshotBlobUri"],
    serialConsoleLogBlobUri: item["serialConsoleLogBlobUri"],
    status: !item["status"] ? item["status"] : instanceViewStatusDeserializer(item["status"]),
  };
}

/** The hypervisor generation of the Virtual Machine [V1, V2] */
export enum KnownHyperVGeneration {
  /** V1 */
  V1 = "V1",
  /** V2 */
  V2 = "V2",
}

/**
 * The hypervisor generation of the Virtual Machine [V1, V2] \
 * {@link KnownHyperVGeneration} can be used interchangeably with HyperVGeneration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **V1** \
 * **V2**
 */
export type HyperVGeneration = string;

/** Specifies the hardware settings for the virtual machine. */
export interface HardwareProfile {
  /** Specifies the size of the virtual machine. The enum data type is currently deprecated and will be removed by December 23rd 2023. The recommended way to get the list of available sizes is using these APIs: [List all available virtual machine sizes in an availability set](https://docs.microsoft.com/rest/api/compute/availabilitysets/listavailablesizes), [List all available virtual machine sizes in a region]( https://docs.microsoft.com/rest/api/compute/resourceskus/list), [List all available virtual machine sizes for resizing](https://docs.microsoft.com/rest/api/compute/virtualmachines/listavailablesizes). For more information about virtual machine sizes, see [Sizes for virtual machines](https://docs.microsoft.com/azure/virtual-machines/sizes). The available VM sizes depend on region and availability set. */
  vmSize?: VirtualMachineSizeTypes;
  /** Specifies the properties for customizing the size of the virtual machine. Minimum api-version: 2021-07-01. This feature is still in preview mode and is not supported for VirtualMachineScaleSet. Please follow the instructions in [VM Customization](https://aka.ms/vmcustomization) for more details. */
  vmSizeProperties?: VMSizeProperties;
}

export function hardwareProfileSerializer(item: HardwareProfile): any {
  return {
    vmSize: item["vmSize"],
    vmSizeProperties: !item["vmSizeProperties"]
      ? item["vmSizeProperties"]
      : vmSizePropertiesSerializer(item["vmSizeProperties"]),
  };
}

export function hardwareProfileDeserializer(item: any): HardwareProfile {
  return {
    vmSize: item["vmSize"],
    vmSizeProperties: !item["vmSizeProperties"]
      ? item["vmSizeProperties"]
      : vmSizePropertiesDeserializer(item["vmSizeProperties"]),
  };
}

/** Specifies the size of the virtual machine. The enum data type is currently deprecated and will be removed by December 23rd 2023. The recommended way to get the list of available sizes is using these APIs: [List all available virtual machine sizes in an availability set](https://docs.microsoft.com/rest/api/compute/availabilitysets/listavailablesizes), [List all available virtual machine sizes in a region]( https://docs.microsoft.com/rest/api/compute/resourceskus/list), [List all available virtual machine sizes for resizing](https://docs.microsoft.com/rest/api/compute/virtualmachines/listavailablesizes). For more information about virtual machine sizes, see [Sizes for virtual machines](https://docs.microsoft.com/azure/virtual-machines/sizes). The available VM sizes depend on region and availability set. */
export enum KnownVirtualMachineSizeTypes {
  /** Basic_A0 */
  BasicA0 = "Basic_A0",
  /** Basic_A1 */
  BasicA1 = "Basic_A1",
  /** Basic_A2 */
  BasicA2 = "Basic_A2",
  /** Basic_A3 */
  BasicA3 = "Basic_A3",
  /** Basic_A4 */
  BasicA4 = "Basic_A4",
  /** Standard_A0 */
  StandardA0 = "Standard_A0",
  /** Standard_A1 */
  StandardA1 = "Standard_A1",
  /** Standard_A2 */
  StandardA2 = "Standard_A2",
  /** Standard_A3 */
  StandardA3 = "Standard_A3",
  /** Standard_A4 */
  StandardA4 = "Standard_A4",
  /** Standard_A5 */
  StandardA5 = "Standard_A5",
  /** Standard_A6 */
  StandardA6 = "Standard_A6",
  /** Standard_A7 */
  StandardA7 = "Standard_A7",
  /** Standard_A8 */
  StandardA8 = "Standard_A8",
  /** Standard_A9 */
  StandardA9 = "Standard_A9",
  /** Standard_A10 */
  StandardA10 = "Standard_A10",
  /** Standard_A11 */
  StandardA11 = "Standard_A11",
  /** Standard_A1_v2 */
  StandardA1V2 = "Standard_A1_v2",
  /** Standard_A2_v2 */
  StandardA2V2 = "Standard_A2_v2",
  /** Standard_A4_v2 */
  StandardA4V2 = "Standard_A4_v2",
  /** Standard_A8_v2 */
  StandardA8V2 = "Standard_A8_v2",
  /** Standard_A2m_v2 */
  StandardA2MV2 = "Standard_A2m_v2",
  /** Standard_A4m_v2 */
  StandardA4MV2 = "Standard_A4m_v2",
  /** Standard_A8m_v2 */
  StandardA8MV2 = "Standard_A8m_v2",
  /** Standard_B1s */
  StandardB1S = "Standard_B1s",
  /** Standard_B1ms */
  StandardB1Ms = "Standard_B1ms",
  /** Standard_B2s */
  StandardB2S = "Standard_B2s",
  /** Standard_B2ms */
  StandardB2Ms = "Standard_B2ms",
  /** Standard_B4ms */
  StandardB4Ms = "Standard_B4ms",
  /** Standard_B8ms */
  StandardB8Ms = "Standard_B8ms",
  /** Standard_D1 */
  StandardD1 = "Standard_D1",
  /** Standard_D2 */
  StandardD2 = "Standard_D2",
  /** Standard_D3 */
  StandardD3 = "Standard_D3",
  /** Standard_D4 */
  StandardD4 = "Standard_D4",
  /** Standard_D11 */
  StandardD11 = "Standard_D11",
  /** Standard_D12 */
  StandardD12 = "Standard_D12",
  /** Standard_D13 */
  StandardD13 = "Standard_D13",
  /** Standard_D14 */
  StandardD14 = "Standard_D14",
  /** Standard_D1_v2 */
  StandardD1V2 = "Standard_D1_v2",
  /** Standard_D2_v2 */
  StandardD2V2 = "Standard_D2_v2",
  /** Standard_D3_v2 */
  StandardD3V2 = "Standard_D3_v2",
  /** Standard_D4_v2 */
  StandardD4V2 = "Standard_D4_v2",
  /** Standard_D5_v2 */
  StandardD5V2 = "Standard_D5_v2",
  /** Standard_D2_v3 */
  StandardD2V3 = "Standard_D2_v3",
  /** Standard_D4_v3 */
  StandardD4V3 = "Standard_D4_v3",
  /** Standard_D8_v3 */
  StandardD8V3 = "Standard_D8_v3",
  /** Standard_D16_v3 */
  StandardD16V3 = "Standard_D16_v3",
  /** Standard_D32_v3 */
  StandardD32V3 = "Standard_D32_v3",
  /** Standard_D64_v3 */
  StandardD64V3 = "Standard_D64_v3",
  /** Standard_D2s_v3 */
  StandardD2SV3 = "Standard_D2s_v3",
  /** Standard_D4s_v3 */
  StandardD4SV3 = "Standard_D4s_v3",
  /** Standard_D8s_v3 */
  StandardD8SV3 = "Standard_D8s_v3",
  /** Standard_D16s_v3 */
  StandardD16SV3 = "Standard_D16s_v3",
  /** Standard_D32s_v3 */
  StandardD32SV3 = "Standard_D32s_v3",
  /** Standard_D64s_v3 */
  StandardD64SV3 = "Standard_D64s_v3",
  /** Standard_D11_v2 */
  StandardD11V2 = "Standard_D11_v2",
  /** Standard_D12_v2 */
  StandardD12V2 = "Standard_D12_v2",
  /** Standard_D13_v2 */
  StandardD13V2 = "Standard_D13_v2",
  /** Standard_D14_v2 */
  StandardD14V2 = "Standard_D14_v2",
  /** Standard_D15_v2 */
  StandardD15V2 = "Standard_D15_v2",
  /** Standard_DS1 */
  StandardDS1 = "Standard_DS1",
  /** Standard_DS2 */
  StandardDS2 = "Standard_DS2",
  /** Standard_DS3 */
  StandardDS3 = "Standard_DS3",
  /** Standard_DS4 */
  StandardDS4 = "Standard_DS4",
  /** Standard_DS11 */
  StandardDS11 = "Standard_DS11",
  /** Standard_DS12 */
  StandardDS12 = "Standard_DS12",
  /** Standard_DS13 */
  StandardDS13 = "Standard_DS13",
  /** Standard_DS14 */
  StandardDS14 = "Standard_DS14",
  /** Standard_DS1_v2 */
  StandardDS1V2 = "Standard_DS1_v2",
  /** Standard_DS2_v2 */
  StandardDS2V2 = "Standard_DS2_v2",
  /** Standard_DS3_v2 */
  StandardDS3V2 = "Standard_DS3_v2",
  /** Standard_DS4_v2 */
  StandardDS4V2 = "Standard_DS4_v2",
  /** Standard_DS5_v2 */
  StandardDS5V2 = "Standard_DS5_v2",
  /** Standard_DS11_v2 */
  StandardDS11V2 = "Standard_DS11_v2",
  /** Standard_DS12_v2 */
  StandardDS12V2 = "Standard_DS12_v2",
  /** Standard_DS13_v2 */
  StandardDS13V2 = "Standard_DS13_v2",
  /** Standard_DS14_v2 */
  StandardDS14V2 = "Standard_DS14_v2",
  /** Standard_DS15_v2 */
  StandardDS15V2 = "Standard_DS15_v2",
  /** Standard_DS13-4_v2 */
  StandardDS134V2 = "Standard_DS13-4_v2",
  /** Standard_DS13-2_v2 */
  StandardDS132V2 = "Standard_DS13-2_v2",
  /** Standard_DS14-8_v2 */
  StandardDS148V2 = "Standard_DS14-8_v2",
  /** Standard_DS14-4_v2 */
  StandardDS144V2 = "Standard_DS14-4_v2",
  /** Standard_E2_v3 */
  StandardE2V3 = "Standard_E2_v3",
  /** Standard_E4_v3 */
  StandardE4V3 = "Standard_E4_v3",
  /** Standard_E8_v3 */
  StandardE8V3 = "Standard_E8_v3",
  /** Standard_E16_v3 */
  StandardE16V3 = "Standard_E16_v3",
  /** Standard_E32_v3 */
  StandardE32V3 = "Standard_E32_v3",
  /** Standard_E64_v3 */
  StandardE64V3 = "Standard_E64_v3",
  /** Standard_E2s_v3 */
  StandardE2SV3 = "Standard_E2s_v3",
  /** Standard_E4s_v3 */
  StandardE4SV3 = "Standard_E4s_v3",
  /** Standard_E8s_v3 */
  StandardE8SV3 = "Standard_E8s_v3",
  /** Standard_E16s_v3 */
  StandardE16SV3 = "Standard_E16s_v3",
  /** Standard_E32s_v3 */
  StandardE32SV3 = "Standard_E32s_v3",
  /** Standard_E64s_v3 */
  StandardE64SV3 = "Standard_E64s_v3",
  /** Standard_E32-16_v3 */
  StandardE3216V3 = "Standard_E32-16_v3",
  /** Standard_E32-8s_v3 */
  StandardE328SV3 = "Standard_E32-8s_v3",
  /** Standard_E64-32s_v3 */
  StandardE6432SV3 = "Standard_E64-32s_v3",
  /** Standard_E64-16s_v3 */
  StandardE6416SV3 = "Standard_E64-16s_v3",
  /** Standard_F1 */
  StandardF1 = "Standard_F1",
  /** Standard_F2 */
  StandardF2 = "Standard_F2",
  /** Standard_F4 */
  StandardF4 = "Standard_F4",
  /** Standard_F8 */
  StandardF8 = "Standard_F8",
  /** Standard_F16 */
  StandardF16 = "Standard_F16",
  /** Standard_F1s */
  StandardF1S = "Standard_F1s",
  /** Standard_F2s */
  StandardF2S = "Standard_F2s",
  /** Standard_F4s */
  StandardF4S = "Standard_F4s",
  /** Standard_F8s */
  StandardF8S = "Standard_F8s",
  /** Standard_F16s */
  StandardF16S = "Standard_F16s",
  /** Standard_F2s_v2 */
  StandardF2SV2 = "Standard_F2s_v2",
  /** Standard_F4s_v2 */
  StandardF4SV2 = "Standard_F4s_v2",
  /** Standard_F8s_v2 */
  StandardF8SV2 = "Standard_F8s_v2",
  /** Standard_F16s_v2 */
  StandardF16SV2 = "Standard_F16s_v2",
  /** Standard_F32s_v2 */
  StandardF32SV2 = "Standard_F32s_v2",
  /** Standard_F64s_v2 */
  StandardF64SV2 = "Standard_F64s_v2",
  /** Standard_F72s_v2 */
  StandardF72SV2 = "Standard_F72s_v2",
  /** Standard_G1 */
  StandardG1 = "Standard_G1",
  /** Standard_G2 */
  StandardG2 = "Standard_G2",
  /** Standard_G3 */
  StandardG3 = "Standard_G3",
  /** Standard_G4 */
  StandardG4 = "Standard_G4",
  /** Standard_G5 */
  StandardG5 = "Standard_G5",
  /** Standard_GS1 */
  StandardGS1 = "Standard_GS1",
  /** Standard_GS2 */
  StandardGS2 = "Standard_GS2",
  /** Standard_GS3 */
  StandardGS3 = "Standard_GS3",
  /** Standard_GS4 */
  StandardGS4 = "Standard_GS4",
  /** Standard_GS5 */
  StandardGS5 = "Standard_GS5",
  /** Standard_GS4-8 */
  StandardGS48 = "Standard_GS4-8",
  /** Standard_GS4-4 */
  StandardGS44 = "Standard_GS4-4",
  /** Standard_GS5-16 */
  StandardGS516 = "Standard_GS5-16",
  /** Standard_GS5-8 */
  StandardGS58 = "Standard_GS5-8",
  /** Standard_H8 */
  StandardH8 = "Standard_H8",
  /** Standard_H16 */
  StandardH16 = "Standard_H16",
  /** Standard_H8m */
  StandardH8M = "Standard_H8m",
  /** Standard_H16m */
  StandardH16M = "Standard_H16m",
  /** Standard_H16r */
  StandardH16R = "Standard_H16r",
  /** Standard_H16mr */
  StandardH16Mr = "Standard_H16mr",
  /** Standard_L4s */
  StandardL4S = "Standard_L4s",
  /** Standard_L8s */
  StandardL8S = "Standard_L8s",
  /** Standard_L16s */
  StandardL16S = "Standard_L16s",
  /** Standard_L32s */
  StandardL32S = "Standard_L32s",
  /** Standard_M64s */
  StandardM64S = "Standard_M64s",
  /** Standard_M64ms */
  StandardM64Ms = "Standard_M64ms",
  /** Standard_M128s */
  StandardM128S = "Standard_M128s",
  /** Standard_M128ms */
  StandardM128Ms = "Standard_M128ms",
  /** Standard_M64-32ms */
  StandardM6432Ms = "Standard_M64-32ms",
  /** Standard_M64-16ms */
  StandardM6416Ms = "Standard_M64-16ms",
  /** Standard_M128-64ms */
  StandardM12864Ms = "Standard_M128-64ms",
  /** Standard_M128-32ms */
  StandardM12832Ms = "Standard_M128-32ms",
  /** Standard_NC6 */
  StandardNC6 = "Standard_NC6",
  /** Standard_NC12 */
  StandardNC12 = "Standard_NC12",
  /** Standard_NC24 */
  StandardNC24 = "Standard_NC24",
  /** Standard_NC24r */
  StandardNC24R = "Standard_NC24r",
  /** Standard_NC6s_v2 */
  StandardNC6SV2 = "Standard_NC6s_v2",
  /** Standard_NC12s_v2 */
  StandardNC12SV2 = "Standard_NC12s_v2",
  /** Standard_NC24s_v2 */
  StandardNC24SV2 = "Standard_NC24s_v2",
  /** Standard_NC24rs_v2 */
  StandardNC24RsV2 = "Standard_NC24rs_v2",
  /** Standard_NC6s_v3 */
  StandardNC6SV3 = "Standard_NC6s_v3",
  /** Standard_NC12s_v3 */
  StandardNC12SV3 = "Standard_NC12s_v3",
  /** Standard_NC24s_v3 */
  StandardNC24SV3 = "Standard_NC24s_v3",
  /** Standard_NC24rs_v3 */
  StandardNC24RsV3 = "Standard_NC24rs_v3",
  /** Standard_ND6s */
  StandardND6S = "Standard_ND6s",
  /** Standard_ND12s */
  StandardND12S = "Standard_ND12s",
  /** Standard_ND24s */
  StandardND24S = "Standard_ND24s",
  /** Standard_ND24rs */
  StandardND24Rs = "Standard_ND24rs",
  /** Standard_NV6 */
  StandardNV6 = "Standard_NV6",
  /** Standard_NV12 */
  StandardNV12 = "Standard_NV12",
  /** Standard_NV24 */
  StandardNV24 = "Standard_NV24",
}

/**
 * Specifies the size of the virtual machine. The enum data type is currently deprecated and will be removed by December 23rd 2023. The recommended way to get the list of available sizes is using these APIs: [List all available virtual machine sizes in an availability set](https://docs.microsoft.com/rest/api/compute/availabilitysets/listavailablesizes), [List all available virtual machine sizes in a region]( https://docs.microsoft.com/rest/api/compute/resourceskus/list), [List all available virtual machine sizes for resizing](https://docs.microsoft.com/rest/api/compute/virtualmachines/listavailablesizes). For more information about virtual machine sizes, see [Sizes for virtual machines](https://docs.microsoft.com/azure/virtual-machines/sizes). The available VM sizes depend on region and availability set. \
 * {@link KnownVirtualMachineSizeTypes} can be used interchangeably with VirtualMachineSizeTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
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

/** Specifies the resilient VM deletion status for the virtual machine. */
export enum KnownResilientVMDeletionStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** InProgress */
  InProgress = "InProgress",
  /** Failed */
  Failed = "Failed",
}

/**
 * Specifies the resilient VM deletion status for the virtual machine. \
 * {@link KnownResilientVMDeletionStatus} can be used interchangeably with ResilientVMDeletionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled** \
 * **InProgress** \
 * **Failed**
 */
export type ResilientVMDeletionStatus = string;

/** Specifies the storage settings for the virtual machine disks. */
export interface StorageProfile {
  /** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. */
  imageReference?: ImageReference;
  /** Specifies information about the operating system disk used by the virtual machine. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  osDisk?: OSDisk;
  /** Specifies the parameters that are used to add a data disk to a virtual machine. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  dataDisks?: DataDisk[];
  /** Specifies the disk controller type configured for the VM. **Note:** This property will be set to the default disk controller type if not specified provided virtual machine is being created with 'hyperVGeneration' set to V2 based on the capabilities of the operating system disk and VM size from the the specified minimum api version. You need to deallocate the VM before updating its disk controller type unless you are updating the VM size in the VM configuration which implicitly deallocates and reallocates the VM. Minimum api-version: 2022-08-01. */
  diskControllerType?: DiskControllerTypes;
  /** Specifies whether the regional disks should be aligned/moved to the VM zone. This is applicable only for VMs with placement property set. Please note that this change is irreversible. Minimum api-version: 2024-11-01. */
  alignRegionalDisksToVMZone?: boolean;
}

export function storageProfileSerializer(item: StorageProfile): any {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceSerializer(item["imageReference"]),
    osDisk: !item["osDisk"] ? item["osDisk"] : osDiskSerializer(item["osDisk"]),
    dataDisks: !item["dataDisks"] ? item["dataDisks"] : dataDiskArraySerializer(item["dataDisks"]),
    diskControllerType: item["diskControllerType"],
    alignRegionalDisksToVMZone: item["alignRegionalDisksToVMZone"],
  };
}

export function storageProfileDeserializer(item: any): StorageProfile {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceDeserializer(item["imageReference"]),
    osDisk: !item["osDisk"] ? item["osDisk"] : osDiskDeserializer(item["osDisk"]),
    dataDisks: !item["dataDisks"]
      ? item["dataDisks"]
      : dataDiskArrayDeserializer(item["dataDisks"]),
    diskControllerType: item["diskControllerType"],
    alignRegionalDisksToVMZone: item["alignRegionalDisksToVMZone"],
  };
}

/** Specifies information about the operating system disk used by the virtual machine. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
export interface OSDisk {
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. Possible values are: **Windows,** **Linux.** */
  osType?: OperatingSystemTypes;
  /** Specifies the encryption settings for the OS Disk. Minimum api-version: 2015-06-15. */
  encryptionSettings?: DiskEncryptionSettings;
  /** The disk name. */
  name?: string;
  /** The virtual hard disk. */
  vhd?: VirtualHardDisk;
  /** The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. */
  image?: VirtualHardDisk;
  /** Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The defaulting behavior is: **None for Standard storage. ReadOnly for Premium storage.** */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies the ephemeral Disk Settings for the operating system disk used by the virtual machine. */
  diffDiskSettings?: DiffDiskSettings;
  /** Specifies how the virtual machine disk should be created. Possible values are **Attach:** This value is used when you are using a specialized disk to create the virtual machine. **FromImage:** This value is used when you are using an image to create the virtual machine. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described. */
  createOption: DiskCreateOptionTypes;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023. */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: ManagedDiskParameters;
  /** Specifies whether OS Disk should be deleted or detached upon VM deletion. Possible values are: **Delete.** If this value is used, the OS disk is deleted when VM is deleted. **Detach.** If this value is used, the os disk is retained after VM is deleted. The default value is set to **Detach**. For an ephemeral OS Disk, the default value is set to **Delete**. The user cannot change the delete option for an ephemeral OS Disk. */
  deleteOption?: DiskDeleteOptionTypes;
}

export function osDiskSerializer(item: OSDisk): any {
  return {
    osType: item["osType"],
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : diskEncryptionSettingsSerializer(item["encryptionSettings"]),
    name: item["name"],
    vhd: !item["vhd"] ? item["vhd"] : virtualHardDiskSerializer(item["vhd"]),
    image: !item["image"] ? item["image"] : virtualHardDiskSerializer(item["image"]),
    caching: item["caching"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
    diffDiskSettings: !item["diffDiskSettings"]
      ? item["diffDiskSettings"]
      : diffDiskSettingsSerializer(item["diffDiskSettings"]),
    createOption: item["createOption"],
    diskSizeGB: item["diskSizeGB"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskParametersSerializer(item["managedDisk"]),
    deleteOption: item["deleteOption"],
  };
}

export function osDiskDeserializer(item: any): OSDisk {
  return {
    osType: item["osType"],
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : diskEncryptionSettingsDeserializer(item["encryptionSettings"]),
    name: item["name"],
    vhd: !item["vhd"] ? item["vhd"] : virtualHardDiskDeserializer(item["vhd"]),
    image: !item["image"] ? item["image"] : virtualHardDiskDeserializer(item["image"]),
    caching: item["caching"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
    diffDiskSettings: !item["diffDiskSettings"]
      ? item["diffDiskSettings"]
      : diffDiskSettingsDeserializer(item["diffDiskSettings"]),
    createOption: item["createOption"],
    diskSizeGB: item["diskSizeGB"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskParametersDeserializer(item["managedDisk"]),
    deleteOption: item["deleteOption"],
  };
}

/** The parameters of a managed disk. */
export interface ManagedDiskParameters extends SubResource {
  /** Specifies the storage account type for the managed disk. NOTE: UltraSSD_LRS can only be used with data disks, it cannot be used with OS Disk. */
  storageAccountType?: StorageAccountTypes;
  /** Specifies the customer managed disk encryption set resource id for the managed disk. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
  /** Specifies the security profile for the managed disk. */
  securityProfile?: VMDiskSecurityProfile;
}

export function managedDiskParametersSerializer(item: ManagedDiskParameters): any {
  return {
    id: item["id"],
    storageAccountType: item["storageAccountType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersSerializer(item["diskEncryptionSet"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : vmDiskSecurityProfileSerializer(item["securityProfile"]),
  };
}

export function managedDiskParametersDeserializer(item: any): ManagedDiskParameters {
  return {
    id: item["id"],
    storageAccountType: item["storageAccountType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersDeserializer(item["diskEncryptionSet"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : vmDiskSecurityProfileDeserializer(item["securityProfile"]),
  };
}

export function dataDiskArraySerializer(result: Array<DataDisk>): any[] {
  return result.map((item) => {
    return dataDiskSerializer(item);
  });
}

export function dataDiskArrayDeserializer(result: Array<DataDisk>): any[] {
  return result.map((item) => {
    return dataDiskDeserializer(item);
  });
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
  /** Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The defaulting behavior is: **None for Standard storage. ReadOnly for Premium storage.** */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies how the virtual machine disk should be created. Possible values are **Attach:** This value is used when you are using a specialized disk to create the virtual machine. **FromImage:** This value is used when you are using an image to create the virtual machine data disk. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described. **Empty:** This value is used when creating an empty data disk. **Copy:** This value is used to create a data disk from a snapshot or another disk. **Restore:** This value is used to create a data disk from a disk restore point. */
  createOption: DiskCreateOptionTypes;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023. */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: ManagedDiskParameters;
  /** The source resource identifier. It can be a snapshot, or disk restore point from which to create a disk. */
  sourceResource?: ApiEntityReference;
  /** Specifies whether the data disk is in process of detachment from the VirtualMachine/VirtualMachineScaleset */
  toBeDetached?: boolean;
  /** Specifies the Read-Write IOPS for the managed disk when StorageAccountType is UltraSSD_LRS. Returned only for VirtualMachine ScaleSet VM disks. Can be updated only via updates to the VirtualMachine Scale Set. */
  readonly diskIopsReadWrite?: number;
  /** Specifies the bandwidth in MB per second for the managed disk when StorageAccountType is UltraSSD_LRS. Returned only for VirtualMachine ScaleSet VM disks. Can be updated only via updates to the VirtualMachine Scale Set. */
  readonly diskMBpsReadWrite?: number;
  /** Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values: **ForceDetach.** detachOption: **ForceDetach** is applicable only for managed data disks. If a previous detachment attempt of the data disk did not complete due to an unexpected failure from the virtual machine and the disk is still not released then use force-detach as a last resort option to detach the disk forcibly from the VM. All writes might not have been flushed when using this detach behavior. **This feature is still in preview**. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'. */
  detachOption?: DiskDetachOptionTypes;
  /** Specifies whether data disk should be deleted or detached upon VM deletion. Possible values are: **Delete.** If this value is used, the data disk is deleted when VM is deleted. **Detach.** If this value is used, the data disk is retained after VM is deleted. The default value is set to **Detach**. */
  deleteOption?: DiskDeleteOptionTypes;
}

export function dataDiskSerializer(item: DataDisk): any {
  return {
    lun: item["lun"],
    name: item["name"],
    vhd: !item["vhd"] ? item["vhd"] : virtualHardDiskSerializer(item["vhd"]),
    image: !item["image"] ? item["image"] : virtualHardDiskSerializer(item["image"]),
    caching: item["caching"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
    createOption: item["createOption"],
    diskSizeGB: item["diskSizeGB"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskParametersSerializer(item["managedDisk"]),
    sourceResource: !item["sourceResource"]
      ? item["sourceResource"]
      : apiEntityReferenceSerializer(item["sourceResource"]),
    toBeDetached: item["toBeDetached"],
    detachOption: item["detachOption"],
    deleteOption: item["deleteOption"],
  };
}

export function dataDiskDeserializer(item: any): DataDisk {
  return {
    lun: item["lun"],
    name: item["name"],
    vhd: !item["vhd"] ? item["vhd"] : virtualHardDiskDeserializer(item["vhd"]),
    image: !item["image"] ? item["image"] : virtualHardDiskDeserializer(item["image"]),
    caching: item["caching"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
    createOption: item["createOption"],
    diskSizeGB: item["diskSizeGB"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskParametersDeserializer(item["managedDisk"]),
    sourceResource: !item["sourceResource"]
      ? item["sourceResource"]
      : apiEntityReferenceDeserializer(item["sourceResource"]),
    toBeDetached: item["toBeDetached"],
    diskIopsReadWrite: item["diskIOPSReadWrite"],
    diskMBpsReadWrite: item["diskMBpsReadWrite"],
    detachOption: item["detachOption"],
    deleteOption: item["deleteOption"],
  };
}

/** Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values are: **ForceDetach.** detachOption: **ForceDetach** is applicable only for managed data disks. If a previous detachment attempt of the data disk did not complete due to an unexpected failure from the virtual machine and the disk is still not released then use force-detach as a last resort option to detach the disk forcibly from the VM. All writes might not have been flushed when using this detach behavior. **This feature is still in preview**. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'. */
export enum KnownDiskDetachOptionTypes {
  /** ForceDetach */
  ForceDetach = "ForceDetach",
}

/**
 * Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values are: **ForceDetach.** detachOption: **ForceDetach** is applicable only for managed data disks. If a previous detachment attempt of the data disk did not complete due to an unexpected failure from the virtual machine and the disk is still not released then use force-detach as a last resort option to detach the disk forcibly from the VM. All writes might not have been flushed when using this detach behavior. **This feature is still in preview**. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'. \
 * {@link KnownDiskDetachOptionTypes} can be used interchangeably with DiskDetachOptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ForceDetach**
 */
export type DiskDetachOptionTypes = string;

/** Specifies the operating system settings for the virtual machine. Some of the settings cannot be changed once VM is provisioned. */
export interface OSProfile {
  /** Specifies the host OS name of the virtual machine. This name cannot be updated after the VM is created. **Max-length (Windows):** 15 characters. **Max-length (Linux):** 64 characters. For naming conventions and restrictions see [Azure infrastructure services implementation guidelines](https://docs.microsoft.com/azure/azure-resource-manager/management/resource-name-rules). */
  computerName?: string;
  /** Specifies the name of the administrator account. <br><br> This property cannot be updated after the VM is created. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters. */
  adminUsername?: string;
  /** Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection) */
  adminPassword?: string;
  /** Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. **Note: Do not pass any secrets or passwords in customData property.** This property cannot be updated after the VM is created. The property 'customData' is passed to the VM to be saved as a file, for more information see [Custom Data on Azure VMs](https://azure.microsoft.com/blog/custom-data-and-cloud-init-on-windows-azure/). For using cloud-init for your Linux VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init). */
  customData?: string;
  /** Specifies Windows operating system settings on the virtual machine. */
  windowsConfiguration?: WindowsConfiguration;
  /** Specifies the Linux operating system settings on the virtual machine. For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros). */
  linuxConfiguration?: LinuxConfiguration;
  /** Specifies set of certificates that should be installed onto the virtual machine. To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  secrets?: VaultSecretGroup[];
  /** Specifies whether extension operations should be allowed on the virtual machine. This may only be set to False when no extensions are present on the virtual machine. */
  allowExtensionOperations?: boolean;
  /** Optional property which must either be set to True or omitted. */
  requireGuestProvisionSignal?: boolean;
}

export function osProfileSerializer(item: OSProfile): any {
  return {
    computerName: item["computerName"],
    adminUsername: item["adminUsername"],
    adminPassword: item["adminPassword"],
    customData: item["customData"],
    windowsConfiguration: !item["windowsConfiguration"]
      ? item["windowsConfiguration"]
      : windowsConfigurationSerializer(item["windowsConfiguration"]),
    linuxConfiguration: !item["linuxConfiguration"]
      ? item["linuxConfiguration"]
      : linuxConfigurationSerializer(item["linuxConfiguration"]),
    secrets: !item["secrets"] ? item["secrets"] : vaultSecretGroupArraySerializer(item["secrets"]),
    allowExtensionOperations: item["allowExtensionOperations"],
    requireGuestProvisionSignal: item["requireGuestProvisionSignal"],
  };
}

export function osProfileDeserializer(item: any): OSProfile {
  return {
    computerName: item["computerName"],
    adminUsername: item["adminUsername"],
    adminPassword: item["adminPassword"],
    customData: item["customData"],
    windowsConfiguration: !item["windowsConfiguration"]
      ? item["windowsConfiguration"]
      : windowsConfigurationDeserializer(item["windowsConfiguration"]),
    linuxConfiguration: !item["linuxConfiguration"]
      ? item["linuxConfiguration"]
      : linuxConfigurationDeserializer(item["linuxConfiguration"]),
    secrets: !item["secrets"]
      ? item["secrets"]
      : vaultSecretGroupArrayDeserializer(item["secrets"]),
    allowExtensionOperations: item["allowExtensionOperations"],
    requireGuestProvisionSignal: item["requireGuestProvisionSignal"],
  };
}

/** Specifies the network interfaces or the networking configuration of the virtual machine. */
export interface NetworkProfile {
  /** Specifies the list of resource Ids for the network interfaces associated with the virtual machine. */
  networkInterfaces?: NetworkInterfaceReference[];
  /** specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations */
  networkApiVersion?: NetworkApiVersion;
  /** Specifies the networking configurations that will be used to create the virtual machine networking resources. */
  networkInterfaceConfigurations?: VirtualMachineNetworkInterfaceConfiguration[];
}

export function networkProfileSerializer(item: NetworkProfile): any {
  return {
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceReferenceArraySerializer(item["networkInterfaces"]),
    networkApiVersion: item["networkApiVersion"],
    networkInterfaceConfigurations: !item["networkInterfaceConfigurations"]
      ? item["networkInterfaceConfigurations"]
      : virtualMachineNetworkInterfaceConfigurationArraySerializer(
          item["networkInterfaceConfigurations"],
        ),
  };
}

export function networkProfileDeserializer(item: any): NetworkProfile {
  return {
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceReferenceArrayDeserializer(item["networkInterfaces"]),
    networkApiVersion: item["networkApiVersion"],
    networkInterfaceConfigurations: !item["networkInterfaceConfigurations"]
      ? item["networkInterfaceConfigurations"]
      : virtualMachineNetworkInterfaceConfigurationArrayDeserializer(
          item["networkInterfaceConfigurations"],
        ),
  };
}

export function networkInterfaceReferenceArraySerializer(
  result: Array<NetworkInterfaceReference>,
): any[] {
  return result.map((item) => {
    return networkInterfaceReferenceSerializer(item);
  });
}

export function networkInterfaceReferenceArrayDeserializer(
  result: Array<NetworkInterfaceReference>,
): any[] {
  return result.map((item) => {
    return networkInterfaceReferenceDeserializer(item);
  });
}

/** Describes a network interface reference. */
export interface NetworkInterfaceReference extends SubResource {
  /** Describes a network interface reference properties. */
  properties?: NetworkInterfaceReferenceProperties;
}

export function networkInterfaceReferenceSerializer(item: NetworkInterfaceReference): any {
  return {
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : networkInterfaceReferencePropertiesSerializer(item["properties"]),
  };
}

export function networkInterfaceReferenceDeserializer(item: any): NetworkInterfaceReference {
  return {
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : networkInterfaceReferencePropertiesDeserializer(item["properties"]),
  };
}

/** Describes a network interface reference properties. */
export interface NetworkInterfaceReferenceProperties {
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** Specify what happens to the network interface when the VM is deleted */
  deleteOption?: DeleteOptions;
}

export function networkInterfaceReferencePropertiesSerializer(
  item: NetworkInterfaceReferenceProperties,
): any {
  return { primary: item["primary"], deleteOption: item["deleteOption"] };
}

export function networkInterfaceReferencePropertiesDeserializer(
  item: any,
): NetworkInterfaceReferenceProperties {
  return {
    primary: item["primary"],
    deleteOption: item["deleteOption"],
  };
}

export function virtualMachineNetworkInterfaceConfigurationArraySerializer(
  result: Array<VirtualMachineNetworkInterfaceConfiguration>,
): any[] {
  return result.map((item) => {
    return virtualMachineNetworkInterfaceConfigurationSerializer(item);
  });
}

export function virtualMachineNetworkInterfaceConfigurationArrayDeserializer(
  result: Array<VirtualMachineNetworkInterfaceConfiguration>,
): any[] {
  return result.map((item) => {
    return virtualMachineNetworkInterfaceConfigurationDeserializer(item);
  });
}

/** Describes a virtual machine network interface configurations. */
export interface VirtualMachineNetworkInterfaceConfiguration {
  /** The network interface configuration name. */
  name: string;
  /** Describes a virtual machine network profile's IP configuration. */
  properties?: VirtualMachineNetworkInterfaceConfigurationProperties;
  /** Resource tags applied to the networkInterface address created by this NetworkInterfaceConfiguration */
  tags?: Record<string, string>;
}

export function virtualMachineNetworkInterfaceConfigurationSerializer(
  item: VirtualMachineNetworkInterfaceConfiguration,
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineNetworkInterfaceConfigurationPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

export function virtualMachineNetworkInterfaceConfigurationDeserializer(
  item: any,
): VirtualMachineNetworkInterfaceConfiguration {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineNetworkInterfaceConfigurationPropertiesDeserializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Describes a virtual machine network profile's IP configuration. */
export interface VirtualMachineNetworkInterfaceConfigurationProperties {
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** Specify what happens to the network interface when the VM is deleted */
  deleteOption?: DeleteOptions;
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
  ipConfigurations: VirtualMachineNetworkInterfaceIPConfiguration[];
  dscpConfiguration?: SubResource;
  /** Specifies whether the Auxiliary mode is enabled for the Network Interface resource. */
  auxiliaryMode?: NetworkInterfaceAuxiliaryMode;
  /** Specifies whether the Auxiliary sku is enabled for the Network Interface resource. */
  auxiliarySku?: NetworkInterfaceAuxiliarySku;
}

export function virtualMachineNetworkInterfaceConfigurationPropertiesSerializer(
  item: VirtualMachineNetworkInterfaceConfigurationProperties,
): any {
  return {
    primary: item["primary"],
    deleteOption: item["deleteOption"],
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    disableTcpStateTracking: item["disableTcpStateTracking"],
    enableFpga: item["enableFpga"],
    enableIPForwarding: item["enableIPForwarding"],
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : subResourceSerializer(item["networkSecurityGroup"]),
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : virtualMachineNetworkInterfaceDnsSettingsConfigurationSerializer(item["dnsSettings"]),
    ipConfigurations: virtualMachineNetworkInterfaceIPConfigurationArraySerializer(
      item["ipConfigurations"],
    ),
    dscpConfiguration: !item["dscpConfiguration"]
      ? item["dscpConfiguration"]
      : subResourceSerializer(item["dscpConfiguration"]),
    auxiliaryMode: item["auxiliaryMode"],
    auxiliarySku: item["auxiliarySku"],
  };
}

export function virtualMachineNetworkInterfaceConfigurationPropertiesDeserializer(
  item: any,
): VirtualMachineNetworkInterfaceConfigurationProperties {
  return {
    primary: item["primary"],
    deleteOption: item["deleteOption"],
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    disableTcpStateTracking: item["disableTcpStateTracking"],
    enableFpga: item["enableFpga"],
    enableIPForwarding: item["enableIPForwarding"],
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : subResourceDeserializer(item["networkSecurityGroup"]),
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : virtualMachineNetworkInterfaceDnsSettingsConfigurationDeserializer(item["dnsSettings"]),
    ipConfigurations: virtualMachineNetworkInterfaceIPConfigurationArrayDeserializer(
      item["ipConfigurations"],
    ),
    dscpConfiguration: !item["dscpConfiguration"]
      ? item["dscpConfiguration"]
      : subResourceDeserializer(item["dscpConfiguration"]),
    auxiliaryMode: item["auxiliaryMode"],
    auxiliarySku: item["auxiliarySku"],
  };
}

/** Describes a virtual machines network configuration's DNS settings. */
export interface VirtualMachineNetworkInterfaceDnsSettingsConfiguration {
  /** List of DNS servers IP addresses */
  dnsServers?: string[];
}

export function virtualMachineNetworkInterfaceDnsSettingsConfigurationSerializer(
  item: VirtualMachineNetworkInterfaceDnsSettingsConfiguration,
): any {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
  };
}

export function virtualMachineNetworkInterfaceDnsSettingsConfigurationDeserializer(
  item: any,
): VirtualMachineNetworkInterfaceDnsSettingsConfiguration {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
  };
}

export function virtualMachineNetworkInterfaceIPConfigurationArraySerializer(
  result: Array<VirtualMachineNetworkInterfaceIPConfiguration>,
): any[] {
  return result.map((item) => {
    return virtualMachineNetworkInterfaceIPConfigurationSerializer(item);
  });
}

export function virtualMachineNetworkInterfaceIPConfigurationArrayDeserializer(
  result: Array<VirtualMachineNetworkInterfaceIPConfiguration>,
): any[] {
  return result.map((item) => {
    return virtualMachineNetworkInterfaceIPConfigurationDeserializer(item);
  });
}

/** Describes a virtual machine network profile's IP configuration. */
export interface VirtualMachineNetworkInterfaceIPConfiguration {
  /** The IP configuration name. */
  name: string;
  /** Describes a virtual machine network interface IP configuration properties. */
  properties?: VirtualMachineNetworkInterfaceIPConfigurationProperties;
}

export function virtualMachineNetworkInterfaceIPConfigurationSerializer(
  item: VirtualMachineNetworkInterfaceIPConfiguration,
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineNetworkInterfaceIPConfigurationPropertiesSerializer(item["properties"]),
  };
}

export function virtualMachineNetworkInterfaceIPConfigurationDeserializer(
  item: any,
): VirtualMachineNetworkInterfaceIPConfiguration {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineNetworkInterfaceIPConfigurationPropertiesDeserializer(item["properties"]),
  };
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
  privateIPAddressVersion?: IPVersions;
  /** Specifies an array of references to application security group. */
  applicationSecurityGroups?: SubResource[];
  /** Specifies an array of references to backend address pools of application gateways. A virtual machine can reference backend address pools of multiple application gateways. Multiple virtual machines cannot use the same application gateway. */
  applicationGatewayBackendAddressPools?: SubResource[];
  /** Specifies an array of references to backend address pools of load balancers. A virtual machine can reference backend address pools of one public and one internal load balancer. [Multiple virtual machines cannot use the same basic sku load balancer]. */
  loadBalancerBackendAddressPools?: SubResource[];
}

export function virtualMachineNetworkInterfaceIPConfigurationPropertiesSerializer(
  item: VirtualMachineNetworkInterfaceIPConfigurationProperties,
): any {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subResourceSerializer(item["subnet"]),
    primary: item["primary"],
    publicIPAddressConfiguration: !item["publicIPAddressConfiguration"]
      ? item["publicIPAddressConfiguration"]
      : virtualMachinePublicIPAddressConfigurationSerializer(item["publicIPAddressConfiguration"]),
    privateIPAddressVersion: item["privateIPAddressVersion"],
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : subResourceArraySerializer(item["applicationSecurityGroups"]),
    applicationGatewayBackendAddressPools: !item["applicationGatewayBackendAddressPools"]
      ? item["applicationGatewayBackendAddressPools"]
      : subResourceArraySerializer(item["applicationGatewayBackendAddressPools"]),
    loadBalancerBackendAddressPools: !item["loadBalancerBackendAddressPools"]
      ? item["loadBalancerBackendAddressPools"]
      : subResourceArraySerializer(item["loadBalancerBackendAddressPools"]),
  };
}

export function virtualMachineNetworkInterfaceIPConfigurationPropertiesDeserializer(
  item: any,
): VirtualMachineNetworkInterfaceIPConfigurationProperties {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subResourceDeserializer(item["subnet"]),
    primary: item["primary"],
    publicIPAddressConfiguration: !item["publicIPAddressConfiguration"]
      ? item["publicIPAddressConfiguration"]
      : virtualMachinePublicIPAddressConfigurationDeserializer(
          item["publicIPAddressConfiguration"],
        ),
    privateIPAddressVersion: item["privateIPAddressVersion"],
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : subResourceArrayDeserializer(item["applicationSecurityGroups"]),
    applicationGatewayBackendAddressPools: !item["applicationGatewayBackendAddressPools"]
      ? item["applicationGatewayBackendAddressPools"]
      : subResourceArrayDeserializer(item["applicationGatewayBackendAddressPools"]),
    loadBalancerBackendAddressPools: !item["loadBalancerBackendAddressPools"]
      ? item["loadBalancerBackendAddressPools"]
      : subResourceArrayDeserializer(item["loadBalancerBackendAddressPools"]),
  };
}

/** Describes a virtual machines IP Configuration's PublicIPAddress configuration */
export interface VirtualMachinePublicIPAddressConfiguration {
  /** The publicIP address configuration name. */
  name: string;
  /** Describes a virtual machines IP Configuration's PublicIPAddress configuration */
  properties?: VirtualMachinePublicIPAddressConfigurationProperties;
  /** Describes the public IP Sku. It can only be set with OrchestrationMode as Flexible. */
  sku?: PublicIPAddressSku;
  /** Resource tags applied to the publicIP address created by this PublicIPAddressConfiguration */
  tags?: Record<string, string>;
}

export function virtualMachinePublicIPAddressConfigurationSerializer(
  item: VirtualMachinePublicIPAddressConfiguration,
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachinePublicIPAddressConfigurationPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : publicIPAddressSkuSerializer(item["sku"]),
    tags: item["tags"],
  };
}

export function virtualMachinePublicIPAddressConfigurationDeserializer(
  item: any,
): VirtualMachinePublicIPAddressConfiguration {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachinePublicIPAddressConfigurationPropertiesDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : publicIPAddressSkuDeserializer(item["sku"]),
    tags: item["tags"],
  };
}

/** Describes a virtual machines IP Configuration's PublicIPAddress configuration */
export interface VirtualMachinePublicIPAddressConfigurationProperties {
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** Specify what happens to the public IP address when the VM is deleted */
  deleteOption?: DeleteOptions;
  /** The dns settings to be applied on the publicIP addresses . */
  dnsSettings?: VirtualMachinePublicIPAddressDnsSettingsConfiguration;
  /** The list of IP tags associated with the public IP address. */
  ipTags?: VirtualMachineIpTag[];
  /** The PublicIPPrefix from which to allocate publicIP addresses. */
  publicIPPrefix?: SubResource;
  /** Available from Api-Version 2019-07-01 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'. */
  publicIPAddressVersion?: IPVersions;
  /** Specify the public IP allocation type */
  publicIPAllocationMethod?: PublicIPAllocationMethod;
}

export function virtualMachinePublicIPAddressConfigurationPropertiesSerializer(
  item: VirtualMachinePublicIPAddressConfigurationProperties,
): any {
  return {
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    deleteOption: item["deleteOption"],
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : virtualMachinePublicIPAddressDnsSettingsConfigurationSerializer(item["dnsSettings"]),
    ipTags: !item["ipTags"] ? item["ipTags"] : virtualMachineIpTagArraySerializer(item["ipTags"]),
    publicIPPrefix: !item["publicIPPrefix"]
      ? item["publicIPPrefix"]
      : subResourceSerializer(item["publicIPPrefix"]),
    publicIPAddressVersion: item["publicIPAddressVersion"],
    publicIPAllocationMethod: item["publicIPAllocationMethod"],
  };
}

export function virtualMachinePublicIPAddressConfigurationPropertiesDeserializer(
  item: any,
): VirtualMachinePublicIPAddressConfigurationProperties {
  return {
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    deleteOption: item["deleteOption"],
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : virtualMachinePublicIPAddressDnsSettingsConfigurationDeserializer(item["dnsSettings"]),
    ipTags: !item["ipTags"] ? item["ipTags"] : virtualMachineIpTagArrayDeserializer(item["ipTags"]),
    publicIPPrefix: !item["publicIPPrefix"]
      ? item["publicIPPrefix"]
      : subResourceDeserializer(item["publicIPPrefix"]),
    publicIPAddressVersion: item["publicIPAddressVersion"],
    publicIPAllocationMethod: item["publicIPAllocationMethod"],
  };
}

/** Describes a virtual machines network configuration's DNS settings. */
export interface VirtualMachinePublicIPAddressDnsSettingsConfiguration {
  /** The Domain name label prefix of the PublicIPAddress resources that will be created. The generated name label is the concatenation of the domain name label and vm network profile unique ID. */
  domainNameLabel: string;
  /** The Domain name label scope of the PublicIPAddress resources that will be created. The generated name label is the concatenation of the hashed domain name label with policy according to the domain name label scope and vm network profile unique ID. */
  domainNameLabelScope?: DomainNameLabelScopeTypes;
}

export function virtualMachinePublicIPAddressDnsSettingsConfigurationSerializer(
  item: VirtualMachinePublicIPAddressDnsSettingsConfiguration,
): any {
  return {
    domainNameLabel: item["domainNameLabel"],
    domainNameLabelScope: item["domainNameLabelScope"],
  };
}

export function virtualMachinePublicIPAddressDnsSettingsConfigurationDeserializer(
  item: any,
): VirtualMachinePublicIPAddressDnsSettingsConfiguration {
  return {
    domainNameLabel: item["domainNameLabel"],
    domainNameLabelScope: item["domainNameLabelScope"],
  };
}

export function virtualMachineIpTagArraySerializer(result: Array<VirtualMachineIpTag>): any[] {
  return result.map((item) => {
    return virtualMachineIpTagSerializer(item);
  });
}

export function virtualMachineIpTagArrayDeserializer(result: Array<VirtualMachineIpTag>): any[] {
  return result.map((item) => {
    return virtualMachineIpTagDeserializer(item);
  });
}

/** Contains the IP tag associated with the public IP address. */
export interface VirtualMachineIpTag {
  /** IP tag type. Example: FirstPartyUsage. */
  ipTagType?: string;
  /** IP tag associated with the public IP. Example: SQL, Storage etc. */
  tag?: string;
}

export function virtualMachineIpTagSerializer(item: VirtualMachineIpTag): any {
  return { ipTagType: item["ipTagType"], tag: item["tag"] };
}

export function virtualMachineIpTagDeserializer(item: any): VirtualMachineIpTag {
  return {
    ipTagType: item["ipTagType"],
    tag: item["tag"],
  };
}

/** Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. */
export enum KnownIPVersions {
  /** IPv4 */
  IPv4 = "IPv4",
  /** IPv6 */
  IPv6 = "IPv6",
}

/**
 * Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. \
 * {@link KnownIPVersions} can be used interchangeably with IPVersions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4** \
 * **IPv6**
 */
export type IPVersions = string;

/** Specify the public IP allocation type */
export enum KnownPublicIPAllocationMethod {
  /** Dynamic */
  Dynamic = "Dynamic",
  /** Static */
  Static = "Static",
}

/**
 * Specify the public IP allocation type \
 * {@link KnownPublicIPAllocationMethod} can be used interchangeably with PublicIPAllocationMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Dynamic** \
 * **Static**
 */
export type PublicIPAllocationMethod = string;

/** Describes a virtual machine scale set VM network profile. */
export interface VirtualMachineScaleSetVMNetworkProfileConfiguration {
  /** The list of network configurations. */
  networkInterfaceConfigurations?: VirtualMachineScaleSetNetworkConfiguration[];
}

export function virtualMachineScaleSetVMNetworkProfileConfigurationSerializer(
  item: VirtualMachineScaleSetVMNetworkProfileConfiguration,
): any {
  return {
    networkInterfaceConfigurations: !item["networkInterfaceConfigurations"]
      ? item["networkInterfaceConfigurations"]
      : virtualMachineScaleSetNetworkConfigurationArraySerializer(
          item["networkInterfaceConfigurations"],
        ),
  };
}

export function virtualMachineScaleSetVMNetworkProfileConfigurationDeserializer(
  item: any,
): VirtualMachineScaleSetVMNetworkProfileConfiguration {
  return {
    networkInterfaceConfigurations: !item["networkInterfaceConfigurations"]
      ? item["networkInterfaceConfigurations"]
      : virtualMachineScaleSetNetworkConfigurationArrayDeserializer(
          item["networkInterfaceConfigurations"],
        ),
  };
}

/** The protection policy of a virtual machine scale set VM. */
export interface VirtualMachineScaleSetVMProtectionPolicy {
  /** Indicates that the virtual machine scale set VM shouldn't be considered for deletion during a scale-in operation. */
  protectFromScaleIn?: boolean;
  /** Indicates that model updates or actions (including scale-in) initiated on the virtual machine scale set should not be applied to the virtual machine scale set VM. */
  protectFromScaleSetActions?: boolean;
}

export function virtualMachineScaleSetVMProtectionPolicySerializer(
  item: VirtualMachineScaleSetVMProtectionPolicy,
): any {
  return {
    protectFromScaleIn: item["protectFromScaleIn"],
    protectFromScaleSetActions: item["protectFromScaleSetActions"],
  };
}

export function virtualMachineScaleSetVMProtectionPolicyDeserializer(
  item: any,
): VirtualMachineScaleSetVMProtectionPolicy {
  return {
    protectFromScaleIn: item["protectFromScaleIn"],
    protectFromScaleSetActions: item["protectFromScaleSetActions"],
  };
}

export function virtualMachineExtensionArraySerializer(
  result: Array<VirtualMachineExtension>,
): any[] {
  return result.map((item) => {
    return virtualMachineExtensionSerializer(item);
  });
}

export function virtualMachineExtensionArrayDeserializer(
  result: Array<VirtualMachineExtension>,
): any[] {
  return result.map((item) => {
    return virtualMachineExtensionDeserializer(item);
  });
}

/** Describes a Virtual Machine Extension. */
export interface VirtualMachineExtension extends TrackedResource {
  /** Describes the properties of a Virtual Machine Extension. */
  properties?: VirtualMachineExtensionProperties;
}

export function virtualMachineExtensionSerializer(item: VirtualMachineExtension): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineExtensionPropertiesSerializer(item["properties"]),
  };
}

export function virtualMachineExtensionDeserializer(item: any): VirtualMachineExtension {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineExtensionPropertiesDeserializer(item["properties"]),
  };
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
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The virtual machine extension instance view. */
  instanceView?: VirtualMachineExtensionInstanceView;
  /** Indicates whether failures stemming from the extension will be suppressed (Operational failures such as not connecting to the VM will not be suppressed regardless of this value). The default is false. */
  suppressFailures?: boolean;
  /** The extensions protected settings that are passed by reference, and consumed from key vault */
  protectedSettingsFromKeyVault?: KeyVaultSecretReference;
  /** Collection of extension names after which this extension needs to be provisioned. */
  provisionAfterExtensions?: string[];
}

export function virtualMachineExtensionPropertiesSerializer(
  item: VirtualMachineExtensionProperties,
): any {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : virtualMachineExtensionInstanceViewSerializer(item["instanceView"]),
    suppressFailures: item["suppressFailures"],
    protectedSettingsFromKeyVault: !item["protectedSettingsFromKeyVault"]
      ? item["protectedSettingsFromKeyVault"]
      : keyVaultSecretReferenceSerializer(item["protectedSettingsFromKeyVault"]),
    provisionAfterExtensions: !item["provisionAfterExtensions"]
      ? item["provisionAfterExtensions"]
      : item["provisionAfterExtensions"].map((p: any) => {
          return p;
        }),
  };
}

export function virtualMachineExtensionPropertiesDeserializer(
  item: any,
): VirtualMachineExtensionProperties {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    provisioningState: item["provisioningState"],
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : virtualMachineExtensionInstanceViewDeserializer(item["instanceView"]),
    suppressFailures: item["suppressFailures"],
    protectedSettingsFromKeyVault: !item["protectedSettingsFromKeyVault"]
      ? item["protectedSettingsFromKeyVault"]
      : keyVaultSecretReferenceDeserializer(item["protectedSettingsFromKeyVault"]),
    provisionAfterExtensions: !item["provisionAfterExtensions"]
      ? item["provisionAfterExtensions"]
      : item["provisionAfterExtensions"].map((p: any) => {
          return p;
        }),
  };
}

/** Identity for the virtual machine. */
export interface VirtualMachineIdentity {
  /** The principal id of virtual machine identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id associated with the virtual machine. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of identity used for the virtual machine. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine. */
  type?: ResourceIdentityType;
  /** The list of user identities associated with the Virtual Machine. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserAssignedIdentitiesValue>;
}

export function virtualMachineIdentitySerializer(item: VirtualMachineIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function virtualMachineIdentityDeserializer(item: any): VirtualMachineIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The List Virtual Machine Scale Set VMs operation response. */
export interface _VirtualMachineScaleSetVMListResult {
  /** The list of virtual machine scale sets VMs. */
  value: VirtualMachineScaleSetVM[];
  /** The uri to fetch the next page of Virtual Machine Scale Set VMs. Call ListNext() with this to fetch the next page of VMSS VMs. */
  nextLink?: string;
}

export function _virtualMachineScaleSetVMListResultDeserializer(
  item: any,
): _VirtualMachineScaleSetVMListResult {
  return {
    value: virtualMachineScaleSetVMArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualMachineScaleSetVMArraySerializer(
  result: Array<VirtualMachineScaleSetVM>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetVMSerializer(item);
  });
}

export function virtualMachineScaleSetVMArrayDeserializer(
  result: Array<VirtualMachineScaleSetVM>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetVMDeserializer(item);
  });
}

/** Specifies the input for attaching and detaching a list of managed data disks. */
export interface AttachDetachDataDisksRequest {
  /** The list of managed data disks to be attached. */
  dataDisksToAttach?: DataDisksToAttach[];
  /** The list of managed data disks to be detached. */
  dataDisksToDetach?: DataDisksToDetach[];
}

export function attachDetachDataDisksRequestSerializer(item: AttachDetachDataDisksRequest): any {
  return {
    dataDisksToAttach: !item["dataDisksToAttach"]
      ? item["dataDisksToAttach"]
      : dataDisksToAttachArraySerializer(item["dataDisksToAttach"]),
    dataDisksToDetach: !item["dataDisksToDetach"]
      ? item["dataDisksToDetach"]
      : dataDisksToDetachArraySerializer(item["dataDisksToDetach"]),
  };
}

export function dataDisksToAttachArraySerializer(result: Array<DataDisksToAttach>): any[] {
  return result.map((item) => {
    return dataDisksToAttachSerializer(item);
  });
}

/** Describes the data disk to be attached. */
export interface DataDisksToAttach {
  /** ID of the managed data disk. */
  diskId: string;
  /** The logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. If not specified, lun would be auto assigned. */
  lun?: number;
  /** Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The defaulting behavior is: **None for Standard storage. ReadOnly for Premium storage.** */
  caching?: CachingTypes;
  /** Specifies whether data disk should be deleted or detached upon VM deletion. Possible values are: **Delete.** If this value is used, the data disk is deleted when VM is deleted. **Detach.** If this value is used, the data disk is retained after VM is deleted. The default value is set to **Detach**. */
  deleteOption?: DiskDeleteOptionTypes;
  /** Specifies the customer managed disk encryption set resource id for the managed disk. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
}

export function dataDisksToAttachSerializer(item: DataDisksToAttach): any {
  return {
    diskId: item["diskId"],
    lun: item["lun"],
    caching: item["caching"],
    deleteOption: item["deleteOption"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersSerializer(item["diskEncryptionSet"]),
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
  };
}

export function dataDisksToDetachArraySerializer(result: Array<DataDisksToDetach>): any[] {
  return result.map((item) => {
    return dataDisksToDetachSerializer(item);
  });
}

/** Describes the data disk to be detached. */
export interface DataDisksToDetach {
  /** ID of the managed data disk. */
  diskId: string;
  /** Supported options available for Detach of a disk from a VM. Refer to DetachOption object reference for more details. */
  detachOption?: DiskDetachOptionTypes;
}

export function dataDisksToDetachSerializer(item: DataDisksToDetach): any {
  return { diskId: item["diskId"], detachOption: item["detachOption"] };
}

/** The SAS URIs of the console screenshot and serial log blobs. */
export interface RetrieveBootDiagnosticsDataResult {
  /** The console screenshot blob URI */
  readonly consoleScreenshotBlobUri?: string;
  /** The serial console log blob URI. */
  readonly serialConsoleLogBlobUri?: string;
}

export function retrieveBootDiagnosticsDataResultDeserializer(
  item: any,
): RetrieveBootDiagnosticsDataResult {
  return {
    consoleScreenshotBlobUri: item["consoleScreenshotBlobUri"],
    serialConsoleLogBlobUri: item["serialConsoleLogBlobUri"],
  };
}

/** Capture Virtual Machine parameters. */
export interface RunCommandInput {
  /** Specifies a commandId of predefined built-in script. Command IDs available for Linux are listed at https://aka.ms/RunCommandManagedLinux#available-commands, Windows at https://aka.ms/RunCommandManagedWindows#available-commands. */
  commandId: string;
  /** Optional. The script to be executed.  When this value is given, the given script will override the default script of the command. */
  script?: string[];
  /** The run command parameters. */
  parameters?: RunCommandInputParameter[];
}

export function runCommandInputSerializer(item: RunCommandInput): any {
  return {
    commandId: item["commandId"],
    script: !item["script"]
      ? item["script"]
      : item["script"].map((p: any) => {
          return p;
        }),
    parameters: !item["parameters"]
      ? item["parameters"]
      : runCommandInputParameterArraySerializer(item["parameters"]),
  };
}

export function runCommandInputParameterArraySerializer(
  result: Array<RunCommandInputParameter>,
): any[] {
  return result.map((item) => {
    return runCommandInputParameterSerializer(item);
  });
}

export function runCommandInputParameterArrayDeserializer(
  result: Array<RunCommandInputParameter>,
): any[] {
  return result.map((item) => {
    return runCommandInputParameterDeserializer(item);
  });
}

/** Describes the properties of a run command parameter. */
export interface RunCommandInputParameter {
  /** The run command parameter name. */
  name: string;
  /** The run command parameter value. */
  value: string;
}

export function runCommandInputParameterSerializer(item: RunCommandInputParameter): any {
  return { name: item["name"], value: item["value"] };
}

export function runCommandInputParameterDeserializer(item: any): RunCommandInputParameter {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** model interface RunCommandResult */
export interface RunCommandResult {
  /** Run command operation response. */
  value?: InstanceViewStatus[];
}

export function runCommandResultDeserializer(item: any): RunCommandResult {
  return {
    value: !item["value"] ? item["value"] : instanceViewStatusArrayDeserializer(item["value"]),
  };
}

/** Describes a VMSS VM Extension. */
export interface VirtualMachineScaleSetVMExtension extends SubResourceReadOnly {
  /** Describes the properties of a Virtual Machine Extension. */
  properties?: VirtualMachineExtensionProperties;
  /** The location of the extension. */
  location?: string;
  /** Resource type */
  readonly type?: string;
  /** Resource name */
  readonly name?: string;
}

export function virtualMachineScaleSetVMExtensionSerializer(
  item: VirtualMachineScaleSetVMExtension,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineExtensionPropertiesSerializer(item["properties"]),
    location: item["location"],
  };
}

export function virtualMachineScaleSetVMExtensionDeserializer(
  item: any,
): VirtualMachineScaleSetVMExtension {
  return {
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineExtensionPropertiesDeserializer(item["properties"]),
    location: item["location"],
    type: item["type"],
    name: item["name"],
  };
}

/** Describes a VMSS VM Extension. */
export interface VirtualMachineScaleSetVMExtensionUpdate extends SubResourceReadOnly {
  /** The name of the extension. */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Describes the properties of a Virtual Machine Extension. */
  properties?: VirtualMachineExtensionUpdateProperties;
}

export function virtualMachineScaleSetVMExtensionUpdateSerializer(
  item: VirtualMachineScaleSetVMExtensionUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineExtensionUpdatePropertiesSerializer(item["properties"]),
  };
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

export function virtualMachineExtensionUpdatePropertiesSerializer(
  item: VirtualMachineExtensionUpdateProperties,
): any {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    suppressFailures: item["suppressFailures"],
    protectedSettingsFromKeyVault: !item["protectedSettingsFromKeyVault"]
      ? item["protectedSettingsFromKeyVault"]
      : keyVaultSecretReferenceSerializer(item["protectedSettingsFromKeyVault"]),
  };
}

/** The List VMSS VM Extension operation response */
export interface _VirtualMachineScaleSetVMExtensionsListResult {
  /** The list of VMSS VM extensions */
  value?: VirtualMachineScaleSetVMExtension[];
}

export function _virtualMachineScaleSetVMExtensionsListResultDeserializer(
  item: any,
): _VirtualMachineScaleSetVMExtensionsListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : virtualMachineScaleSetVMExtensionArrayDeserializer(item["value"]),
  };
}

export function virtualMachineScaleSetVMExtensionArraySerializer(
  result: Array<VirtualMachineScaleSetVMExtension>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetVMExtensionSerializer(item);
  });
}

export function virtualMachineScaleSetVMExtensionArrayDeserializer(
  result: Array<VirtualMachineScaleSetVMExtension>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetVMExtensionDeserializer(item);
  });
}

/** Describes a Virtual Machine. */
export interface VirtualMachine extends TrackedResource {
  /** Describes the properties of a Virtual Machine. */
  properties?: VirtualMachineProperties;
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: Plan;
  /** The virtual machine child extension resources. */
  readonly resources?: VirtualMachineExtension[];
  /** The identity of the virtual machine, if configured. */
  identity?: VirtualMachineIdentity;
  /** The availability zones. */
  zones?: string[];
  /** The extended location of the Virtual Machine. */
  extendedLocation?: ExtendedLocation;
  /** ManagedBy is set to Virtual Machine Scale Set(VMSS) flex ARM resourceID, if the VM is part of the VMSS. This property is used by platform for internal resource group delete optimization. */
  readonly managedBy?: string;
  /** Etag is property returned in Create/Update/Get response of the VM, so that customer can supply it in the header to ensure optimistic updates. */
  readonly etag?: string;
  /** Placement section specifies the user-defined constraints for virtual machine hardware placement. This property cannot be changed once VM is provisioned. Minimum api-version: 2024-11-01. */
  placement?: Placement;
}

export function virtualMachineSerializer(item: VirtualMachine): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachinePropertiesSerializer(item["properties"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
    identity: !item["identity"]
      ? item["identity"]
      : virtualMachineIdentitySerializer(item["identity"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    placement: !item["placement"] ? item["placement"] : placementSerializer(item["placement"]),
  };
}

export function virtualMachineDeserializer(item: any): VirtualMachine {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachinePropertiesDeserializer(item["properties"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
    resources: !item["resources"]
      ? item["resources"]
      : virtualMachineExtensionArrayDeserializer(item["resources"]),
    identity: !item["identity"]
      ? item["identity"]
      : virtualMachineIdentityDeserializer(item["identity"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    managedBy: item["managedBy"],
    etag: item["etag"],
    placement: !item["placement"] ? item["placement"] : placementDeserializer(item["placement"]),
  };
}

/** Describes the properties of a Virtual Machine. */
export interface VirtualMachineProperties {
  /** Specifies the hardware settings for the virtual machine. */
  hardwareProfile?: HardwareProfile;
  /** Specifies Redeploy, Reboot and ScheduledEventsAdditionalPublishingTargets Scheduled Event related configurations for the virtual machine. */
  scheduledEventsPolicy?: ScheduledEventsPolicy;
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
  /** Specifies the boot diagnostic settings state. Minimum api-version: 2015-06-15. */
  diagnosticsProfile?: DiagnosticsProfile;
  /** Specifies information about the availability set that the virtual machine should be assigned to. Virtual machines specified in the same availability set are allocated to different nodes to maximize availability. For more information about availability sets, see [Availability sets overview](https://docs.microsoft.com/azure/virtual-machines/availability-set-overview). For more information on Azure planned maintenance, see [Maintenance and updates for Virtual Machines in Azure](https://docs.microsoft.com/azure/virtual-machines/maintenance-and-updates). Currently, a VM can only be added to availability set at creation time. The availability set to which the VM is being added should be under the same resource group as the availability set resource. An existing VM cannot be added to an availability set. This property cannot exist along with a non-null properties.virtualMachineScaleSet reference. */
  availabilitySet?: SubResource;
  /** Specifies information about the virtual machine scale set that the virtual machine should be assigned to. Virtual machines specified in the same virtual machine scale set are allocated to different nodes to maximize availability. Currently, a VM can only be added to virtual machine scale set at creation time. An existing VM cannot be added to a virtual machine scale set. This property cannot exist along with a non-null properties.availabilitySet reference. Minimum api‐version: 2019‐03‐01. */
  virtualMachineScaleSet?: SubResource;
  /** Specifies information about the proximity placement group that the virtual machine should be assigned to. Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResource;
  /** Specifies the priority for the virtual machine. Minimum api-version: 2019-03-01 */
  priority?: VirtualMachinePriorityTypes;
  /** Specifies the eviction policy for the Azure Spot virtual machine and Azure Spot scale set. For Azure Spot virtual machines, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2019-03-01. For Azure Spot scale sets, both 'Deallocate' and 'Delete' are supported and the minimum api-version is 2017-10-30-preview. */
  evictionPolicy?: VirtualMachineEvictionPolicyTypes;
  /** Specifies the billing related details of a Azure Spot virtual machine. Minimum api-version: 2019-03-01. */
  billingProfile?: BillingProfile;
  /** Specifies information about the dedicated host that the virtual machine resides in. Minimum api-version: 2018-10-01. */
  host?: SubResource;
  /** Specifies information about the dedicated host group that the virtual machine resides in. **Note:** User cannot specify both host and hostGroup properties. Minimum api-version: 2020-06-01. */
  hostGroup?: SubResource;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The virtual machine instance view. */
  readonly instanceView?: VirtualMachineInstanceView;
  /** Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 */
  licenseType?: string;
  /** Specifies the VM unique ID which is a 128-bits identifier that is encoded and stored in all Azure IaaS VMs SMBIOS and can be read using platform BIOS commands. */
  readonly vmId?: string;
  /** Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). Minimum api-version: 2020-06-01. */
  extensionsTimeBudget?: string;
  /** Specifies the scale set logical fault domain into which the Virtual Machine will be created. By default, the Virtual Machine will by automatically assigned to a fault domain that best maintains balance across available fault domains. This is applicable only if the 'virtualMachineScaleSet' property of this Virtual Machine is set. The Virtual Machine Scale Set that is referenced, must have 'platformFaultDomainCount' greater than 1. This property cannot be updated once the Virtual Machine is created. Fault domain assignment can be viewed in the Virtual Machine Instance View. Minimum api‐version: 2020‐12‐01. */
  platformFaultDomain?: number;
  /** Specifies Scheduled Event related configurations. */
  scheduledEventsProfile?: ScheduledEventsProfile;
  /** UserData for the VM, which must be base-64 encoded. Customer should not pass any secrets in here. Minimum api-version: 2021-03-01. */
  userData?: string;
  /** Specifies information about the capacity reservation that is used to allocate virtual machine. Minimum api-version: 2021-04-01. */
  capacityReservation?: CapacityReservationProfile;
  /** Specifies the gallery applications that should be made available to the VM/VMSS. */
  applicationProfile?: ApplicationProfile;
  /** Specifies the time at which the Virtual Machine resource was created. Minimum api-version: 2021-11-01. */
  readonly timeCreated?: Date;
}

export function virtualMachinePropertiesSerializer(item: VirtualMachineProperties): any {
  return {
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hardwareProfileSerializer(item["hardwareProfile"]),
    scheduledEventsPolicy: !item["scheduledEventsPolicy"]
      ? item["scheduledEventsPolicy"]
      : scheduledEventsPolicySerializer(item["scheduledEventsPolicy"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileSerializer(item["storageProfile"]),
    additionalCapabilities: !item["additionalCapabilities"]
      ? item["additionalCapabilities"]
      : additionalCapabilitiesSerializer(item["additionalCapabilities"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileSerializer(item["osProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileSerializer(item["securityProfile"]),
    diagnosticsProfile: !item["diagnosticsProfile"]
      ? item["diagnosticsProfile"]
      : diagnosticsProfileSerializer(item["diagnosticsProfile"]),
    availabilitySet: !item["availabilitySet"]
      ? item["availabilitySet"]
      : subResourceSerializer(item["availabilitySet"]),
    virtualMachineScaleSet: !item["virtualMachineScaleSet"]
      ? item["virtualMachineScaleSet"]
      : subResourceSerializer(item["virtualMachineScaleSet"]),
    proximityPlacementGroup: !item["proximityPlacementGroup"]
      ? item["proximityPlacementGroup"]
      : subResourceSerializer(item["proximityPlacementGroup"]),
    priority: item["priority"],
    evictionPolicy: item["evictionPolicy"],
    billingProfile: !item["billingProfile"]
      ? item["billingProfile"]
      : billingProfileSerializer(item["billingProfile"]),
    host: !item["host"] ? item["host"] : subResourceSerializer(item["host"]),
    hostGroup: !item["hostGroup"] ? item["hostGroup"] : subResourceSerializer(item["hostGroup"]),
    licenseType: item["licenseType"],
    extensionsTimeBudget: item["extensionsTimeBudget"],
    platformFaultDomain: item["platformFaultDomain"],
    scheduledEventsProfile: !item["scheduledEventsProfile"]
      ? item["scheduledEventsProfile"]
      : scheduledEventsProfileSerializer(item["scheduledEventsProfile"]),
    userData: item["userData"],
    capacityReservation: !item["capacityReservation"]
      ? item["capacityReservation"]
      : capacityReservationProfileSerializer(item["capacityReservation"]),
    applicationProfile: !item["applicationProfile"]
      ? item["applicationProfile"]
      : applicationProfileSerializer(item["applicationProfile"]),
  };
}

export function virtualMachinePropertiesDeserializer(item: any): VirtualMachineProperties {
  return {
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hardwareProfileDeserializer(item["hardwareProfile"]),
    scheduledEventsPolicy: !item["scheduledEventsPolicy"]
      ? item["scheduledEventsPolicy"]
      : scheduledEventsPolicyDeserializer(item["scheduledEventsPolicy"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileDeserializer(item["storageProfile"]),
    additionalCapabilities: !item["additionalCapabilities"]
      ? item["additionalCapabilities"]
      : additionalCapabilitiesDeserializer(item["additionalCapabilities"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileDeserializer(item["osProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileDeserializer(item["networkProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileDeserializer(item["securityProfile"]),
    diagnosticsProfile: !item["diagnosticsProfile"]
      ? item["diagnosticsProfile"]
      : diagnosticsProfileDeserializer(item["diagnosticsProfile"]),
    availabilitySet: !item["availabilitySet"]
      ? item["availabilitySet"]
      : subResourceDeserializer(item["availabilitySet"]),
    virtualMachineScaleSet: !item["virtualMachineScaleSet"]
      ? item["virtualMachineScaleSet"]
      : subResourceDeserializer(item["virtualMachineScaleSet"]),
    proximityPlacementGroup: !item["proximityPlacementGroup"]
      ? item["proximityPlacementGroup"]
      : subResourceDeserializer(item["proximityPlacementGroup"]),
    priority: item["priority"],
    evictionPolicy: item["evictionPolicy"],
    billingProfile: !item["billingProfile"]
      ? item["billingProfile"]
      : billingProfileDeserializer(item["billingProfile"]),
    host: !item["host"] ? item["host"] : subResourceDeserializer(item["host"]),
    hostGroup: !item["hostGroup"] ? item["hostGroup"] : subResourceDeserializer(item["hostGroup"]),
    provisioningState: item["provisioningState"],
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : virtualMachineInstanceViewDeserializer(item["instanceView"]),
    licenseType: item["licenseType"],
    vmId: item["vmId"],
    extensionsTimeBudget: item["extensionsTimeBudget"],
    platformFaultDomain: item["platformFaultDomain"],
    scheduledEventsProfile: !item["scheduledEventsProfile"]
      ? item["scheduledEventsProfile"]
      : scheduledEventsProfileDeserializer(item["scheduledEventsProfile"]),
    userData: item["userData"],
    capacityReservation: !item["capacityReservation"]
      ? item["capacityReservation"]
      : capacityReservationProfileDeserializer(item["capacityReservation"]),
    applicationProfile: !item["applicationProfile"]
      ? item["applicationProfile"]
      : applicationProfileDeserializer(item["applicationProfile"]),
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
  };
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
  /** The health status for the VM. */
  readonly vmHealth?: VirtualMachineHealthStatus;
  /** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. You can easily view the output of your console log. Azure also enables you to see a screenshot of the VM from the hypervisor. */
  bootDiagnostics?: BootDiagnosticsInstanceView;
  /** Resource id of the dedicated host, on which the virtual machine is allocated through automatic placement, when the virtual machine is associated with a dedicated host group that has automatic placement enabled. Minimum api-version: 2020-06-01. */
  readonly assignedHost?: string;
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
  /** [Preview Feature] The status of virtual machine patch operations. */
  patchStatus?: VirtualMachinePatchStatus;
  /** [Preview Feature] Specifies whether the VM is currently in or out of the Standby Pool. */
  readonly isVMInStandbyPool?: boolean;
}

export function virtualMachineInstanceViewDeserializer(item: any): VirtualMachineInstanceView {
  return {
    platformUpdateDomain: item["platformUpdateDomain"],
    platformFaultDomain: item["platformFaultDomain"],
    computerName: item["computerName"],
    osName: item["osName"],
    osVersion: item["osVersion"],
    hyperVGeneration: item["hyperVGeneration"],
    rdpThumbPrint: item["rdpThumbPrint"],
    vmAgent: !item["vmAgent"]
      ? item["vmAgent"]
      : virtualMachineAgentInstanceViewDeserializer(item["vmAgent"]),
    maintenanceRedeployStatus: !item["maintenanceRedeployStatus"]
      ? item["maintenanceRedeployStatus"]
      : maintenanceRedeployStatusDeserializer(item["maintenanceRedeployStatus"]),
    disks: !item["disks"] ? item["disks"] : diskInstanceViewArrayDeserializer(item["disks"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : virtualMachineExtensionInstanceViewArrayDeserializer(item["extensions"]),
    vmHealth: !item["vmHealth"]
      ? item["vmHealth"]
      : virtualMachineHealthStatusDeserializer(item["vmHealth"]),
    bootDiagnostics: !item["bootDiagnostics"]
      ? item["bootDiagnostics"]
      : bootDiagnosticsInstanceViewDeserializer(item["bootDiagnostics"]),
    assignedHost: item["assignedHost"],
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArrayDeserializer(item["statuses"]),
    patchStatus: !item["patchStatus"]
      ? item["patchStatus"]
      : virtualMachinePatchStatusDeserializer(item["patchStatus"]),
    isVMInStandbyPool: item["isVMInStandbyPool"],
  };
}

/** Specifies the HyperVGeneration Type associated with a resource */
export enum KnownHyperVGenerationType {
  /** V1 */
  V1 = "V1",
  /** V2 */
  V2 = "V2",
}

/**
 * Specifies the HyperVGeneration Type associated with a resource \
 * {@link KnownHyperVGenerationType} can be used interchangeably with HyperVGenerationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **V1** \
 * **V2**
 */
export type HyperVGenerationType = string;

/** The status of virtual machine patch operations. */
export interface VirtualMachinePatchStatus {
  /** The available patch summary of the latest assessment operation for the virtual machine. */
  availablePatchSummary?: AvailablePatchSummary;
  /** The installation summary of the latest installation operation for the virtual machine. */
  lastPatchInstallationSummary?: LastPatchInstallationSummary;
  /** The enablement status of the specified patchMode */
  readonly configurationStatuses?: InstanceViewStatus[];
}

export function virtualMachinePatchStatusDeserializer(item: any): VirtualMachinePatchStatus {
  return {
    availablePatchSummary: !item["availablePatchSummary"]
      ? item["availablePatchSummary"]
      : availablePatchSummaryDeserializer(item["availablePatchSummary"]),
    lastPatchInstallationSummary: !item["lastPatchInstallationSummary"]
      ? item["lastPatchInstallationSummary"]
      : lastPatchInstallationSummaryDeserializer(item["lastPatchInstallationSummary"]),
    configurationStatuses: !item["configurationStatuses"]
      ? item["configurationStatuses"]
      : instanceViewStatusArrayDeserializer(item["configurationStatuses"]),
  };
}

/** Describes the properties of an virtual machine instance view for available patch summary. */
export interface AvailablePatchSummary {
  /** The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings." */
  readonly status?: PatchOperationStatus;
  /** The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs. */
  readonly assessmentActivityId?: string;
  /** The overall reboot status of the VM. It will be true when partially installed patches require a reboot to complete installation but the reboot has not yet occurred. */
  readonly rebootPending?: boolean;
  /** The number of critical or security patches that have been detected as available and not yet installed. */
  readonly criticalAndSecurityPatchCount?: number;
  /** The number of all available patches excluding critical and security. */
  readonly otherPatchCount?: number;
  /** The UTC timestamp when the operation began. */
  readonly startTime?: Date;
  /** The UTC timestamp when the operation began. */
  readonly lastModifiedTime?: Date;
  /** The errors that were encountered during execution of the operation. The details array contains the list of them. */
  readonly error?: ApiError;
}

export function availablePatchSummaryDeserializer(item: any): AvailablePatchSummary {
  return {
    status: item["status"],
    assessmentActivityId: item["assessmentActivityId"],
    rebootPending: item["rebootPending"],
    criticalAndSecurityPatchCount: item["criticalAndSecurityPatchCount"],
    otherPatchCount: item["otherPatchCount"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
  };
}

/** The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings." */
export enum KnownPatchOperationStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** InProgress */
  InProgress = "InProgress",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** CompletedWithWarnings */
  CompletedWithWarnings = "CompletedWithWarnings",
}

/**
 * The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings." \
 * {@link KnownPatchOperationStatus} can be used interchangeably with PatchOperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **InProgress** \
 * **Failed** \
 * **Succeeded** \
 * **CompletedWithWarnings**
 */
export type PatchOperationStatus = string;

/** Describes the properties of the last installed patch summary. */
export interface LastPatchInstallationSummary {
  /** The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings." */
  readonly status?: PatchOperationStatus;
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
  readonly startTime?: Date;
  /** The UTC timestamp when the operation began. */
  readonly lastModifiedTime?: Date;
  /** The errors that were encountered during execution of the operation. The details array contains the list of them. */
  readonly error?: ApiError;
}

export function lastPatchInstallationSummaryDeserializer(item: any): LastPatchInstallationSummary {
  return {
    status: item["status"],
    installationActivityId: item["installationActivityId"],
    maintenanceWindowExceeded: item["maintenanceWindowExceeded"],
    notSelectedPatchCount: item["notSelectedPatchCount"],
    excludedPatchCount: item["excludedPatchCount"],
    pendingPatchCount: item["pendingPatchCount"],
    installedPatchCount: item["installedPatchCount"],
    failedPatchCount: item["failedPatchCount"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
  };
}

/** Describes a Virtual Machine Update. */
export interface VirtualMachineUpdate extends UpdateResource {
  /** Specifies information about the marketplace image used to create the virtual machine. This element is only used for marketplace images. Before you can use a marketplace image from an API, you must enable the image for programmatic use.  In the Azure portal, find the marketplace image that you want to use and then click **Want to deploy programmatically, Get Started ->**. Enter any required information and then click **Save**. */
  plan?: Plan;
  /** Describes the properties of a Virtual Machine. */
  properties?: VirtualMachineProperties;
  /** The identity of the virtual machine, if configured. */
  identity?: VirtualMachineIdentity;
  /** The virtual machine zones. */
  zones?: string[];
}

export function virtualMachineUpdateSerializer(item: VirtualMachineUpdate): any {
  return {
    tags: item["tags"],
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachinePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : virtualMachineIdentitySerializer(item["identity"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** The List Virtual Machine operation response. */
export interface _VirtualMachineListResult {
  /** The list of virtual machines. */
  value: VirtualMachine[];
  /** The URI to fetch the next page of VMs. Call ListNext() with this URI to fetch the next page of Virtual Machines. */
  nextLink?: string;
}

export function _virtualMachineListResultDeserializer(item: any): _VirtualMachineListResult {
  return {
    value: virtualMachineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualMachineArraySerializer(result: Array<VirtualMachine>): any[] {
  return result.map((item) => {
    return virtualMachineSerializer(item);
  });
}

export function virtualMachineArrayDeserializer(result: Array<VirtualMachine>): any[] {
  return result.map((item) => {
    return virtualMachineDeserializer(item);
  });
}

/** Describes the properties of an AssessPatches result. */
export interface VirtualMachineAssessPatchesResult {
  /** The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Unknown", "Failed", "Succeeded", or "CompletedWithWarnings." */
  readonly status?: PatchOperationStatus;
  /** The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs. */
  readonly assessmentActivityId?: string;
  /** The overall reboot status of the VM. It will be true when partially installed patches require a reboot to complete installation but the reboot has not yet occurred. */
  readonly rebootPending?: boolean;
  /** The number of critical or security patches that have been detected as available and not yet installed. */
  readonly criticalAndSecurityPatchCount?: number;
  /** The number of all available patches excluding critical and security. */
  readonly otherPatchCount?: number;
  /** The UTC timestamp when the operation began. */
  readonly startDateTime?: Date;
  /** The list of patches that have been detected as available for installation. */
  readonly availablePatches?: VirtualMachineSoftwarePatchProperties[];
  /** The errors that were encountered during execution of the operation. The details array contains the list of them. */
  readonly error?: ApiError;
}

export function virtualMachineAssessPatchesResultDeserializer(
  item: any,
): VirtualMachineAssessPatchesResult {
  return {
    status: item["status"],
    assessmentActivityId: item["assessmentActivityId"],
    rebootPending: item["rebootPending"],
    criticalAndSecurityPatchCount: item["criticalAndSecurityPatchCount"],
    otherPatchCount: item["otherPatchCount"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    availablePatches: !item["availablePatches"]
      ? item["availablePatches"]
      : virtualMachineSoftwarePatchPropertiesArrayDeserializer(item["availablePatches"]),
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
  };
}

export function virtualMachineSoftwarePatchPropertiesArrayDeserializer(
  result: Array<VirtualMachineSoftwarePatchProperties>,
): any[] {
  return result.map((item) => {
    return virtualMachineSoftwarePatchPropertiesDeserializer(item);
  });
}

/** Describes the properties of a Virtual Machine software patch. */
export interface VirtualMachineSoftwarePatchProperties {
  /** A unique identifier for the patch. */
  readonly patchId?: string;
  /** The friendly name of the patch. */
  readonly name?: string;
  /** The version number of the patch. This property applies only to Linux patches. */
  readonly version?: string;
  /** The KBID of the patch. Only applies to Windows patches. */
  readonly kbId?: string;
  /** The classification(s) of the patch as provided by the patch publisher. */
  readonly classifications?: string[];
  /** Describes the reboot requirements of the patch. */
  readonly rebootBehavior?: VMGuestPatchRebootBehavior;
  /** The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs. */
  readonly activityId?: string;
  /** The UTC timestamp when the repository published this patch. */
  readonly publishedDate?: Date;
  /** The UTC timestamp of the last update to this patch record. */
  readonly lastModifiedDateTime?: Date;
  /** Describes the availability of a given patch. */
  readonly assessmentState?: PatchAssessmentState;
}

export function virtualMachineSoftwarePatchPropertiesDeserializer(
  item: any,
): VirtualMachineSoftwarePatchProperties {
  return {
    patchId: item["patchId"],
    name: item["name"],
    version: item["version"],
    kbId: item["kbId"],
    classifications: !item["classifications"]
      ? item["classifications"]
      : item["classifications"].map((p: any) => {
          return p;
        }),
    rebootBehavior: item["rebootBehavior"],
    activityId: item["activityId"],
    publishedDate: !item["publishedDate"] ? item["publishedDate"] : new Date(item["publishedDate"]),
    lastModifiedDateTime: !item["lastModifiedDateTime"]
      ? item["lastModifiedDateTime"]
      : new Date(item["lastModifiedDateTime"]),
    assessmentState: item["assessmentState"],
  };
}

/** Describes the reboot requirements of the patch. */
export enum KnownVMGuestPatchRebootBehavior {
  /** Unknown */
  Unknown = "Unknown",
  /** NeverReboots */
  NeverReboots = "NeverReboots",
  /** AlwaysRequiresReboot */
  AlwaysRequiresReboot = "AlwaysRequiresReboot",
  /** CanRequestReboot */
  CanRequestReboot = "CanRequestReboot",
}

/**
 * Describes the reboot requirements of the patch. \
 * {@link KnownVMGuestPatchRebootBehavior} can be used interchangeably with VMGuestPatchRebootBehavior,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **NeverReboots** \
 * **AlwaysRequiresReboot** \
 * **CanRequestReboot**
 */
export type VMGuestPatchRebootBehavior = string;

/** Describes the availability of a given patch. */
export enum KnownPatchAssessmentState {
  /** Unknown */
  Unknown = "Unknown",
  /** Available */
  Available = "Available",
}

/**
 * Describes the availability of a given patch. \
 * {@link KnownPatchAssessmentState} can be used interchangeably with PatchAssessmentState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Available**
 */
export type PatchAssessmentState = string;

/** Capture Virtual Machine parameters. */
export interface VirtualMachineCaptureParameters {
  /** The captured virtual hard disk's name prefix. */
  vhdPrefix: string;
  /** The destination container name. */
  destinationContainerName: string;
  /** Specifies whether to overwrite the destination virtual hard disk, in case of conflict. */
  overwriteVhds: boolean;
}

export function virtualMachineCaptureParametersSerializer(
  item: VirtualMachineCaptureParameters,
): any {
  return {
    vhdPrefix: item["vhdPrefix"],
    destinationContainerName: item["destinationContainerName"],
    overwriteVhds: item["overwriteVhds"],
  };
}

/** Output of virtual machine capture operation. */
export interface VirtualMachineCaptureResult extends SubResource {
  /** the schema of the captured virtual machine */
  readonly schema?: string;
  /** the version of the content */
  readonly contentVersion?: string;
  /** parameters of the captured virtual machine */
  readonly parameters?: any;
  /** a list of resource items of the captured virtual machine */
  readonly resources?: any[];
}

export function virtualMachineCaptureResultDeserializer(item: any): VirtualMachineCaptureResult {
  return {
    id: item["id"],
    schema: item["$schema"],
    contentVersion: item["contentVersion"],
    parameters: item["parameters"],
    resources: !item["resources"]
      ? item["resources"]
      : item["resources"].map((p: any) => {
          return p;
        }),
  };
}

/** Input for InstallPatches as directly received by the API */
export interface VirtualMachineInstallPatchesParameters {
  /** Specifies the maximum amount of time that the operation will run. It must be an ISO 8601-compliant duration string such as PT4H (4 hours) */
  maximumDuration?: string;
  /** Defines when it is acceptable to reboot a VM during a software update operation. */
  rebootSetting: VMGuestPatchRebootSetting;
  /** Input for InstallPatches on a Windows VM, as directly received by the API */
  windowsParameters?: WindowsParameters;
  /** Input for InstallPatches on a Linux VM, as directly received by the API */
  linuxParameters?: LinuxParameters;
}

export function virtualMachineInstallPatchesParametersSerializer(
  item: VirtualMachineInstallPatchesParameters,
): any {
  return {
    maximumDuration: item["maximumDuration"],
    rebootSetting: item["rebootSetting"],
    windowsParameters: !item["windowsParameters"]
      ? item["windowsParameters"]
      : windowsParametersSerializer(item["windowsParameters"]),
    linuxParameters: !item["linuxParameters"]
      ? item["linuxParameters"]
      : linuxParametersSerializer(item["linuxParameters"]),
  };
}

/** Defines when it is acceptable to reboot a VM during a software update operation. */
export enum KnownVMGuestPatchRebootSetting {
  /** IfRequired */
  IfRequired = "IfRequired",
  /** Never */
  Never = "Never",
  /** Always */
  Always = "Always",
}

/**
 * Defines when it is acceptable to reboot a VM during a software update operation. \
 * {@link KnownVMGuestPatchRebootSetting} can be used interchangeably with VMGuestPatchRebootSetting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IfRequired** \
 * **Never** \
 * **Always**
 */
export type VMGuestPatchRebootSetting = string;

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
  /** This is used to include patches that match the given patch name masks. Alphanumeric strings and wildcard expressions consisting of * and ? are only supported as input values in the list. Null, empty and only whitespaces strings as inputs values are not supported. */
  patchNameMasksToInclude?: string[];
  /** This is used to exclude patches that match the given patch name masks. Alphanumeric strings and wildcard expressions consisting of * and ? are only supported as input values in the list. Null, empty and only whitespaces strings as inputs values are not supported. */
  patchNameMasksToExclude?: string[];
}

export function windowsParametersSerializer(item: WindowsParameters): any {
  return {
    classificationsToInclude: !item["classificationsToInclude"]
      ? item["classificationsToInclude"]
      : item["classificationsToInclude"].map((p: any) => {
          return p;
        }),
    kbNumbersToInclude: !item["kbNumbersToInclude"]
      ? item["kbNumbersToInclude"]
      : item["kbNumbersToInclude"].map((p: any) => {
          return p;
        }),
    kbNumbersToExclude: !item["kbNumbersToExclude"]
      ? item["kbNumbersToExclude"]
      : item["kbNumbersToExclude"].map((p: any) => {
          return p;
        }),
    excludeKbsRequiringReboot: item["excludeKbsRequiringReboot"],
    maxPatchPublishDate: !item["maxPatchPublishDate"]
      ? item["maxPatchPublishDate"]
      : item["maxPatchPublishDate"].toISOString(),
    patchNameMasksToInclude: !item["patchNameMasksToInclude"]
      ? item["patchNameMasksToInclude"]
      : item["patchNameMasksToInclude"].map((p: any) => {
          return p;
        }),
    patchNameMasksToExclude: !item["patchNameMasksToExclude"]
      ? item["patchNameMasksToExclude"]
      : item["patchNameMasksToExclude"].map((p: any) => {
          return p;
        }),
  };
}

/** Known values of {@link VMGuestPatchClassificationWindows} that the service accepts. */
export enum KnownVMGuestPatchClassificationWindows {
  /** Critical */
  Critical = "Critical",
  /** Security */
  Security = "Security",
  /** UpdateRollUp */
  UpdateRollUp = "UpdateRollUp",
  /** FeaturePack */
  FeaturePack = "FeaturePack",
  /** ServicePack */
  ServicePack = "ServicePack",
  /** Definition */
  Definition = "Definition",
  /** Tools */
  Tools = "Tools",
  /** Updates */
  Updates = "Updates",
}

/** Type of VMGuestPatchClassificationWindows */
export type VMGuestPatchClassificationWindows = string;

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

export function linuxParametersSerializer(item: LinuxParameters): any {
  return {
    classificationsToInclude: !item["classificationsToInclude"]
      ? item["classificationsToInclude"]
      : item["classificationsToInclude"].map((p: any) => {
          return p;
        }),
    packageNameMasksToInclude: !item["packageNameMasksToInclude"]
      ? item["packageNameMasksToInclude"]
      : item["packageNameMasksToInclude"].map((p: any) => {
          return p;
        }),
    packageNameMasksToExclude: !item["packageNameMasksToExclude"]
      ? item["packageNameMasksToExclude"]
      : item["packageNameMasksToExclude"].map((p: any) => {
          return p;
        }),
    maintenanceRunId: item["maintenanceRunId"],
  };
}

/** Known values of {@link VMGuestPatchClassificationLinux} that the service accepts. */
export enum KnownVMGuestPatchClassificationLinux {
  /** Critical */
  Critical = "Critical",
  /** Security */
  Security = "Security",
  /** Other */
  Other = "Other",
}

/** Type of VMGuestPatchClassificationLinux */
export type VMGuestPatchClassificationLinux = string;

/** The result summary of an installation operation. */
export interface VirtualMachineInstallPatchesResult {
  /** The overall success or failure status of the operation. It remains "InProgress" until the operation completes. At that point it will become "Failed", "Succeeded", "Unknown" or "CompletedWithWarnings." */
  readonly status?: PatchOperationStatus;
  /** The activity ID of the operation that produced this result. It is used to correlate across CRP and extension logs. */
  readonly installationActivityId?: string;
  /** The reboot state of the VM following completion of the operation. */
  readonly rebootStatus?: VMGuestPatchRebootStatus;
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
  readonly patches?: PatchInstallationDetail[];
  /** The UTC timestamp when the operation began. */
  readonly startDateTime?: Date;
  /** The errors that were encountered during execution of the operation. The details array contains the list of them. */
  readonly error?: ApiError;
}

export function virtualMachineInstallPatchesResultDeserializer(
  item: any,
): VirtualMachineInstallPatchesResult {
  return {
    status: item["status"],
    installationActivityId: item["installationActivityId"],
    rebootStatus: item["rebootStatus"],
    maintenanceWindowExceeded: item["maintenanceWindowExceeded"],
    excludedPatchCount: item["excludedPatchCount"],
    notSelectedPatchCount: item["notSelectedPatchCount"],
    pendingPatchCount: item["pendingPatchCount"],
    installedPatchCount: item["installedPatchCount"],
    failedPatchCount: item["failedPatchCount"],
    patches: !item["patches"]
      ? item["patches"]
      : patchInstallationDetailArrayDeserializer(item["patches"]),
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
  };
}

/** The reboot state of the VM following completion of the operation. */
export enum KnownVMGuestPatchRebootStatus {
  /** Unknown */
  Unknown = "Unknown",
  /** NotNeeded */
  NotNeeded = "NotNeeded",
  /** Required */
  Required = "Required",
  /** Started */
  Started = "Started",
  /** Failed */
  Failed = "Failed",
  /** Completed */
  Completed = "Completed",
}

/**
 * The reboot state of the VM following completion of the operation. \
 * {@link KnownVMGuestPatchRebootStatus} can be used interchangeably with VMGuestPatchRebootStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **NotNeeded** \
 * **Required** \
 * **Started** \
 * **Failed** \
 * **Completed**
 */
export type VMGuestPatchRebootStatus = string;

export function patchInstallationDetailArrayDeserializer(
  result: Array<PatchInstallationDetail>,
): any[] {
  return result.map((item) => {
    return patchInstallationDetailDeserializer(item);
  });
}

/** Information about a specific patch that was encountered during an installation action. */
export interface PatchInstallationDetail {
  /** A unique identifier for the patch. */
  readonly patchId?: string;
  /** The friendly name of the patch. */
  readonly name?: string;
  /** The version string of the package. It may conform to Semantic Versioning. Only applies to Linux. */
  readonly version?: string;
  /** The KBID of the patch. Only applies to Windows patches. */
  readonly kbId?: string;
  /** The classification(s) of the patch as provided by the patch publisher. */
  readonly classifications?: string[];
  /** The state of the patch after the installation operation completed. */
  readonly installationState?: PatchInstallationState;
}

export function patchInstallationDetailDeserializer(item: any): PatchInstallationDetail {
  return {
    patchId: item["patchId"],
    name: item["name"],
    version: item["version"],
    kbId: item["kbId"],
    classifications: !item["classifications"]
      ? item["classifications"]
      : item["classifications"].map((p: any) => {
          return p;
        }),
    installationState: item["installationState"],
  };
}

/** The state of the patch after the installation operation completed. */
export enum KnownPatchInstallationState {
  /** Unknown */
  Unknown = "Unknown",
  /** Installed */
  Installed = "Installed",
  /** Failed */
  Failed = "Failed",
  /** Excluded */
  Excluded = "Excluded",
  /** NotSelected */
  NotSelected = "NotSelected",
  /** Pending */
  Pending = "Pending",
}

/**
 * The state of the patch after the installation operation completed. \
 * {@link KnownPatchInstallationState} can be used interchangeably with PatchInstallationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Installed** \
 * **Failed** \
 * **Excluded** \
 * **NotSelected** \
 * **Pending**
 */
export type PatchInstallationState = string;

/** The List Virtual Machine operation response. */
export interface _VirtualMachineSizeListResult {
  /** The list of virtual machine sizes. */
  value?: VirtualMachineSize[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _virtualMachineSizeListResultDeserializer(
  item: any,
): _VirtualMachineSizeListResult {
  return {
    value: !item["value"] ? item["value"] : virtualMachineSizeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualMachineSizeArrayDeserializer(result: Array<VirtualMachineSize>): any[] {
  return result.map((item) => {
    return virtualMachineSizeDeserializer(item);
  });
}

/** Describes the properties of a VM size. */
export interface VirtualMachineSize {
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

export function virtualMachineSizeDeserializer(item: any): VirtualMachineSize {
  return {
    name: item["name"],
    numberOfCores: item["numberOfCores"],
    osDiskSizeInMB: item["osDiskSizeInMB"],
    resourceDiskSizeInMB: item["resourceDiskSizeInMB"],
    memoryInMB: item["memoryInMB"],
    maxDataDiskCount: item["maxDataDiskCount"],
  };
}

/** The input of virtual machine migration from Availability Set to Flexible Virtual Machine Scale Set. */
export interface MigrateVMToVirtualMachineScaleSetInput {
  /** The target zone of VM migration to Flexible Virtual Machine Scale Set. */
  targetZone?: string;
  /** The target compute fault domain of VM migration to Flexible Virtual Machine Scale Set. */
  targetFaultDomain?: number;
  /** The target Virtual Machine size of VM migration to Flexible Virtual Machine Scale Set. */
  targetVMSize?: string;
}

export function migrateVMToVirtualMachineScaleSetInputSerializer(
  item: MigrateVMToVirtualMachineScaleSetInput,
): any {
  return {
    targetZone: item["targetZone"],
    targetFaultDomain: item["targetFaultDomain"],
    targetVMSize: item["targetVMSize"],
  };
}

/** Describes a Virtual Machine Extension. */
export interface VirtualMachineExtensionUpdate extends UpdateResource {
  /** Describes the properties of a Virtual Machine Extension. */
  properties?: VirtualMachineExtensionUpdateProperties;
}

export function virtualMachineExtensionUpdateSerializer(item: VirtualMachineExtensionUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineExtensionUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The List Extension operation response */
export interface _VirtualMachineExtensionsListResult {
  /** The list of extensions */
  value?: VirtualMachineExtension[];
}

export function _virtualMachineExtensionsListResultDeserializer(
  item: any,
): _VirtualMachineExtensionsListResult {
  return {
    value: !item["value"] ? item["value"] : virtualMachineExtensionArrayDeserializer(item["value"]),
  };
}

/** Describes a Virtual Machine Extension Image. */
export interface VirtualMachineExtensionImage extends TrackedResource {
  /** Describes the properties of a Virtual Machine Extension Image. */
  properties?: VirtualMachineExtensionImageProperties;
}

export function virtualMachineExtensionImageDeserializer(item: any): VirtualMachineExtensionImage {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineExtensionImagePropertiesDeserializer(item["properties"]),
  };
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

export function virtualMachineExtensionImagePropertiesDeserializer(
  item: any,
): VirtualMachineExtensionImageProperties {
  return {
    operatingSystem: item["operatingSystem"],
    computeRole: item["computeRole"],
    handlerSchema: item["handlerSchema"],
    vmScaleSetEnabled: item["vmScaleSetEnabled"],
    supportsMultipleExtensions: item["supportsMultipleExtensions"],
  };
}

/** Specifies information about the availability set that the virtual machine should be assigned to. Virtual machines specified in the same availability set are allocated to different nodes to maximize availability. For more information about availability sets, see [Availability sets overview](https://docs.microsoft.com/azure/virtual-machines/availability-set-overview). For more information on Azure planned maintenance, see [Maintenance and updates for Virtual Machines in Azure](https://docs.microsoft.com/azure/virtual-machines/maintenance-and-updates). Currently, a VM can only be added to an availability set at creation time. An existing VM cannot be added to an availability set. */
export interface AvailabilitySet extends TrackedResource {
  /** The instance view of a resource. */
  properties?: AvailabilitySetProperties;
  /** Sku of the availability set, only name is required to be set. See AvailabilitySetSkuTypes for possible set of values. Use 'Aligned' for virtual machines with managed disks and 'Classic' for virtual machines with unmanaged disks. Default value is 'Classic'. */
  sku?: Sku;
}

export function availabilitySetSerializer(item: AvailabilitySet): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : availabilitySetPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function availabilitySetDeserializer(item: any): AvailabilitySet {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : availabilitySetPropertiesDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** The instance view of a resource. */
export interface AvailabilitySetProperties {
  /** Update Domain count. */
  platformUpdateDomainCount?: number;
  /** Fault Domain count. */
  platformFaultDomainCount?: number;
  /** A list of references to all virtual machines in the availability set. */
  virtualMachines?: SubResource[];
  /** Specifies information about the proximity placement group that the availability set should be assigned to. Minimum api-version: 2018-04-01. */
  proximityPlacementGroup?: SubResource;
  /** The resource status information. */
  readonly statuses?: InstanceViewStatus[];
  /** Specifies Redeploy, Reboot and ScheduledEventsAdditionalPublishingTargets Scheduled Event related configurations for the availability set. */
  scheduledEventsPolicy?: ScheduledEventsPolicy;
  /** Describes the migration properties on the Availability Set. */
  readonly virtualMachineScaleSetMigrationInfo?: VirtualMachineScaleSetMigrationInfo;
}

export function availabilitySetPropertiesSerializer(item: AvailabilitySetProperties): any {
  return {
    platformUpdateDomainCount: item["platformUpdateDomainCount"],
    platformFaultDomainCount: item["platformFaultDomainCount"],
    virtualMachines: !item["virtualMachines"]
      ? item["virtualMachines"]
      : subResourceArraySerializer(item["virtualMachines"]),
    proximityPlacementGroup: !item["proximityPlacementGroup"]
      ? item["proximityPlacementGroup"]
      : subResourceSerializer(item["proximityPlacementGroup"]),
    scheduledEventsPolicy: !item["scheduledEventsPolicy"]
      ? item["scheduledEventsPolicy"]
      : scheduledEventsPolicySerializer(item["scheduledEventsPolicy"]),
  };
}

export function availabilitySetPropertiesDeserializer(item: any): AvailabilitySetProperties {
  return {
    platformUpdateDomainCount: item["platformUpdateDomainCount"],
    platformFaultDomainCount: item["platformFaultDomainCount"],
    virtualMachines: !item["virtualMachines"]
      ? item["virtualMachines"]
      : subResourceArrayDeserializer(item["virtualMachines"]),
    proximityPlacementGroup: !item["proximityPlacementGroup"]
      ? item["proximityPlacementGroup"]
      : subResourceDeserializer(item["proximityPlacementGroup"]),
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArrayDeserializer(item["statuses"]),
    scheduledEventsPolicy: !item["scheduledEventsPolicy"]
      ? item["scheduledEventsPolicy"]
      : scheduledEventsPolicyDeserializer(item["scheduledEventsPolicy"]),
    virtualMachineScaleSetMigrationInfo: !item["virtualMachineScaleSetMigrationInfo"]
      ? item["virtualMachineScaleSetMigrationInfo"]
      : virtualMachineScaleSetMigrationInfoDeserializer(
          item["virtualMachineScaleSetMigrationInfo"],
        ),
  };
}

/** Describes the Availability Set properties related to migration to Flexible Virtual Machine Scale Set. */
export interface VirtualMachineScaleSetMigrationInfo {
  /** Indicates the target Virtual Machine ScaleSet properties upon triggering a seamless migration without downtime of the VMs via the ConvertToVirtualMachineScaleSet API. */
  readonly defaultVirtualMachineScaleSetInfo?: DefaultVirtualMachineScaleSetInfo;
  /** Specifies the Virtual Machine Scale Set that the Availability Set is migrated to. */
  readonly migrateToVirtualMachineScaleSet?: SubResource;
}

export function virtualMachineScaleSetMigrationInfoDeserializer(
  item: any,
): VirtualMachineScaleSetMigrationInfo {
  return {
    defaultVirtualMachineScaleSetInfo: !item["defaultVirtualMachineScaleSetInfo"]
      ? item["defaultVirtualMachineScaleSetInfo"]
      : defaultVirtualMachineScaleSetInfoDeserializer(item["defaultVirtualMachineScaleSetInfo"]),
    migrateToVirtualMachineScaleSet: !item["migrateToVirtualMachineScaleSet"]
      ? item["migrateToVirtualMachineScaleSet"]
      : subResourceDeserializer(item["migrateToVirtualMachineScaleSet"]),
  };
}

/** Indicates the target Virtual Machine ScaleSet properties upon triggering a seamless migration without downtime of the VMs via the ConvertToVirtualMachineScaleSet API. */
export interface DefaultVirtualMachineScaleSetInfo {
  /** Indicates if the the maximum capacity of the default migrated Virtual Machine Scale Set after its migration will be constrained to a limited number of VMs. */
  readonly constrainedMaximumCapacity?: boolean;
  /** The default Virtual Machine ScaleSet Uri that the Availability Set will be moved to upon triggering a seamless migration via the ConvertToVirtualMachineScaleSet API. */
  readonly defaultVirtualMachineScaleSet?: SubResource;
}

export function defaultVirtualMachineScaleSetInfoDeserializer(
  item: any,
): DefaultVirtualMachineScaleSetInfo {
  return {
    constrainedMaximumCapacity: item["constrainedMaximumCapacity"],
    defaultVirtualMachineScaleSet: !item["defaultVirtualMachineScaleSet"]
      ? item["defaultVirtualMachineScaleSet"]
      : subResourceDeserializer(item["defaultVirtualMachineScaleSet"]),
  };
}

/** Specifies information about the availability set that the virtual machine should be assigned to. Only tags may be updated. */
export interface AvailabilitySetUpdate extends UpdateResource {
  /** The instance view of a resource. */
  properties?: AvailabilitySetProperties;
  /** Sku of the availability set */
  sku?: Sku;
}

export function availabilitySetUpdateSerializer(item: AvailabilitySetUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : availabilitySetPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

/** The List Availability Set operation response. */
export interface _AvailabilitySetListResult {
  /** The list of availability sets. */
  value: AvailabilitySet[];
  /** The URI to fetch the next page of AvailabilitySets. Call ListNext() with this URI to fetch the next page of AvailabilitySets. */
  nextLink?: string;
}

export function _availabilitySetListResultDeserializer(item: any): _AvailabilitySetListResult {
  return {
    value: availabilitySetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function availabilitySetArraySerializer(result: Array<AvailabilitySet>): any[] {
  return result.map((item) => {
    return availabilitySetSerializer(item);
  });
}

export function availabilitySetArrayDeserializer(result: Array<AvailabilitySet>): any[] {
  return result.map((item) => {
    return availabilitySetDeserializer(item);
  });
}

/** Describes the Virtual Machine Scale Set to migrate from Availability Set. */
export interface MigrateToVirtualMachineScaleSetInput {
  /** Specifies information about the Virtual Machine Scale Set that the Availability Set should be migrated to. Minimum api‐version: 2024‐11‐01. */
  virtualMachineScaleSetFlexible: SubResource;
}

export function migrateToVirtualMachineScaleSetInputSerializer(
  item: MigrateToVirtualMachineScaleSetInput,
): any {
  return {
    virtualMachineScaleSetFlexible: subResourceSerializer(item["virtualMachineScaleSetFlexible"]),
  };
}

/** Describes the Virtual Machine Scale Set to convert from Availability Set. */
export interface ConvertToVirtualMachineScaleSetInput {
  /** Specifies information about the Virtual Machine Scale Set that the Availability Set should be converted to. */
  virtualMachineScaleSetName?: string;
}

export function convertToVirtualMachineScaleSetInputSerializer(
  item: ConvertToVirtualMachineScaleSetInput,
): any {
  return { virtualMachineScaleSetName: item["virtualMachineScaleSetName"] };
}

/** Specifies information about the proximity placement group. */
export interface ProximityPlacementGroup extends TrackedResource {
  /** Describes the properties of a Proximity Placement Group. */
  properties?: ProximityPlacementGroupProperties;
  /** The availability zones. */
  zones?: string[];
}

export function proximityPlacementGroupSerializer(item: ProximityPlacementGroup): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : proximityPlacementGroupPropertiesSerializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function proximityPlacementGroupDeserializer(item: any): ProximityPlacementGroup {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : proximityPlacementGroupPropertiesDeserializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Describes the properties of a Proximity Placement Group. */
export interface ProximityPlacementGroupProperties {
  /** Specifies the type of the proximity placement group. Possible values are: **Standard** : Co-locate resources within an Azure region or Availability Zone. **Ultra** : For future use. */
  proximityPlacementGroupType?: ProximityPlacementGroupType;
  /** A list of references to all virtual machines in the proximity placement group. */
  readonly virtualMachines?: SubResourceWithColocationStatus[];
  /** A list of references to all virtual machine scale sets in the proximity placement group. */
  readonly virtualMachineScaleSets?: SubResourceWithColocationStatus[];
  /** A list of references to all availability sets in the proximity placement group. */
  readonly availabilitySets?: SubResourceWithColocationStatus[];
  /** Describes colocation status of the Proximity Placement Group. */
  colocationStatus?: InstanceViewStatus;
  /** Specifies the user intent of the proximity placement group. */
  intent?: ProximityPlacementGroupPropertiesIntent;
}

export function proximityPlacementGroupPropertiesSerializer(
  item: ProximityPlacementGroupProperties,
): any {
  return {
    proximityPlacementGroupType: item["proximityPlacementGroupType"],
    colocationStatus: !item["colocationStatus"]
      ? item["colocationStatus"]
      : instanceViewStatusSerializer(item["colocationStatus"]),
    intent: !item["intent"]
      ? item["intent"]
      : proximityPlacementGroupPropertiesIntentSerializer(item["intent"]),
  };
}

export function proximityPlacementGroupPropertiesDeserializer(
  item: any,
): ProximityPlacementGroupProperties {
  return {
    proximityPlacementGroupType: item["proximityPlacementGroupType"],
    virtualMachines: !item["virtualMachines"]
      ? item["virtualMachines"]
      : subResourceWithColocationStatusArrayDeserializer(item["virtualMachines"]),
    virtualMachineScaleSets: !item["virtualMachineScaleSets"]
      ? item["virtualMachineScaleSets"]
      : subResourceWithColocationStatusArrayDeserializer(item["virtualMachineScaleSets"]),
    availabilitySets: !item["availabilitySets"]
      ? item["availabilitySets"]
      : subResourceWithColocationStatusArrayDeserializer(item["availabilitySets"]),
    colocationStatus: !item["colocationStatus"]
      ? item["colocationStatus"]
      : instanceViewStatusDeserializer(item["colocationStatus"]),
    intent: !item["intent"]
      ? item["intent"]
      : proximityPlacementGroupPropertiesIntentDeserializer(item["intent"]),
  };
}

/** Specifies the type of the proximity placement group. Possible values are: **Standard** : Co-locate resources within an Azure region or Availability Zone. **Ultra** : For future use. */
export enum KnownProximityPlacementGroupType {
  /** Standard */
  Standard = "Standard",
  /** Ultra */
  Ultra = "Ultra",
}

/**
 * Specifies the type of the proximity placement group. Possible values are: **Standard** : Co-locate resources within an Azure region or Availability Zone. **Ultra** : For future use. \
 * {@link KnownProximityPlacementGroupType} can be used interchangeably with ProximityPlacementGroupType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard** \
 * **Ultra**
 */
export type ProximityPlacementGroupType = string;

export function subResourceWithColocationStatusArrayDeserializer(
  result: Array<SubResourceWithColocationStatus>,
): any[] {
  return result.map((item) => {
    return subResourceWithColocationStatusDeserializer(item);
  });
}

/** model interface SubResourceWithColocationStatus */
export interface SubResourceWithColocationStatus extends SubResource {
  /** Describes colocation status of a resource in the Proximity Placement Group. */
  colocationStatus?: InstanceViewStatus;
}

export function subResourceWithColocationStatusDeserializer(
  item: any,
): SubResourceWithColocationStatus {
  return {
    id: item["id"],
    colocationStatus: !item["colocationStatus"]
      ? item["colocationStatus"]
      : instanceViewStatusDeserializer(item["colocationStatus"]),
  };
}

/** Specifies the user intent of the proximity placement group. */
export interface ProximityPlacementGroupPropertiesIntent {
  /** Specifies possible sizes of virtual machines that can be created in the proximity placement group. */
  vmSizes?: string[];
}

export function proximityPlacementGroupPropertiesIntentSerializer(
  item: ProximityPlacementGroupPropertiesIntent,
): any {
  return {
    vmSizes: !item["vmSizes"]
      ? item["vmSizes"]
      : item["vmSizes"].map((p: any) => {
          return p;
        }),
  };
}

export function proximityPlacementGroupPropertiesIntentDeserializer(
  item: any,
): ProximityPlacementGroupPropertiesIntent {
  return {
    vmSizes: !item["vmSizes"]
      ? item["vmSizes"]
      : item["vmSizes"].map((p: any) => {
          return p;
        }),
  };
}

/** Specifies information about the proximity placement group. */
export interface ProximityPlacementGroupUpdate extends UpdateResource {}

export function proximityPlacementGroupUpdateSerializer(item: ProximityPlacementGroupUpdate): any {
  return { tags: item["tags"] };
}

/** The List Proximity Placement Group operation response. */
export interface _ProximityPlacementGroupListResult {
  /** The list of proximity placement groups. */
  value: ProximityPlacementGroup[];
  /** The URI to fetch the next page of proximity placement groups. */
  nextLink?: string;
}

export function _proximityPlacementGroupListResultDeserializer(
  item: any,
): _ProximityPlacementGroupListResult {
  return {
    value: proximityPlacementGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function proximityPlacementGroupArraySerializer(
  result: Array<ProximityPlacementGroup>,
): any[] {
  return result.map((item) => {
    return proximityPlacementGroupSerializer(item);
  });
}

export function proximityPlacementGroupArrayDeserializer(
  result: Array<ProximityPlacementGroup>,
): any[] {
  return result.map((item) => {
    return proximityPlacementGroupDeserializer(item);
  });
}

/** Specifies information about the dedicated host group that the dedicated hosts should be assigned to. Currently, a dedicated host can only be added to a dedicated host group at creation time. An existing dedicated host cannot be added to another dedicated host group. */
export interface DedicatedHostGroup extends TrackedResource {
  /** Dedicated Host Group Properties. */
  properties?: DedicatedHostGroupProperties;
  /** The availability zones. */
  zones?: string[];
}

export function dedicatedHostGroupSerializer(item: DedicatedHostGroup): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : dedicatedHostGroupPropertiesSerializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function dedicatedHostGroupDeserializer(item: any): DedicatedHostGroup {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dedicatedHostGroupPropertiesDeserializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Dedicated Host Group Properties. */
export interface DedicatedHostGroupProperties {
  /** Number of fault domains that the host group can span. */
  platformFaultDomainCount: number;
  /** A list of references to all dedicated hosts in the dedicated host group. */
  readonly hosts?: SubResourceReadOnly[];
  /** The dedicated host group instance view, which has the list of instance view of the dedicated hosts under the dedicated host group. */
  readonly instanceView?: DedicatedHostGroupInstanceView;
  /** Specifies whether virtual machines or virtual machine scale sets can be placed automatically on the dedicated host group. Automatic placement means resources are allocated on dedicated hosts, that are chosen by Azure, under the dedicated host group. The value is defaulted to 'false' when not provided. Minimum api-version: 2020-06-01. */
  supportAutomaticPlacement?: boolean;
  /** Enables or disables a capability on the dedicated host group. Minimum api-version: 2022-03-01. */
  additionalCapabilities?: DedicatedHostGroupPropertiesAdditionalCapabilities;
}

export function dedicatedHostGroupPropertiesSerializer(item: DedicatedHostGroupProperties): any {
  return {
    platformFaultDomainCount: item["platformFaultDomainCount"],
    supportAutomaticPlacement: item["supportAutomaticPlacement"],
    additionalCapabilities: !item["additionalCapabilities"]
      ? item["additionalCapabilities"]
      : dedicatedHostGroupPropertiesAdditionalCapabilitiesSerializer(
          item["additionalCapabilities"],
        ),
  };
}

export function dedicatedHostGroupPropertiesDeserializer(item: any): DedicatedHostGroupProperties {
  return {
    platformFaultDomainCount: item["platformFaultDomainCount"],
    hosts: !item["hosts"] ? item["hosts"] : subResourceReadOnlyArrayDeserializer(item["hosts"]),
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : dedicatedHostGroupInstanceViewDeserializer(item["instanceView"]),
    supportAutomaticPlacement: item["supportAutomaticPlacement"],
    additionalCapabilities: !item["additionalCapabilities"]
      ? item["additionalCapabilities"]
      : dedicatedHostGroupPropertiesAdditionalCapabilitiesDeserializer(
          item["additionalCapabilities"],
        ),
  };
}

export function subResourceReadOnlyArraySerializer(result: Array<SubResourceReadOnly>): any[] {
  return result.map((item) => {
    return subResourceReadOnlySerializer(item);
  });
}

export function subResourceReadOnlyArrayDeserializer(result: Array<SubResourceReadOnly>): any[] {
  return result.map((item) => {
    return subResourceReadOnlyDeserializer(item);
  });
}

/** model interface DedicatedHostGroupInstanceView */
export interface DedicatedHostGroupInstanceView {
  /** List of instance view of the dedicated hosts under the dedicated host group. */
  hosts?: DedicatedHostInstanceViewWithName[];
}

export function dedicatedHostGroupInstanceViewDeserializer(
  item: any,
): DedicatedHostGroupInstanceView {
  return {
    hosts: !item["hosts"]
      ? item["hosts"]
      : dedicatedHostInstanceViewWithNameArrayDeserializer(item["hosts"]),
  };
}

export function dedicatedHostInstanceViewWithNameArrayDeserializer(
  result: Array<DedicatedHostInstanceViewWithName>,
): any[] {
  return result.map((item) => {
    return dedicatedHostInstanceViewWithNameDeserializer(item);
  });
}

/** The instance view of a dedicated host that includes the name of the dedicated host. It is used for the response to the instance view of a dedicated host group. */
export interface DedicatedHostInstanceViewWithName extends DedicatedHostInstanceView {
  /** The name of the dedicated host. */
  readonly name?: string;
}

export function dedicatedHostInstanceViewWithNameDeserializer(
  item: any,
): DedicatedHostInstanceViewWithName {
  return {
    assetId: item["assetId"],
    availableCapacity: !item["availableCapacity"]
      ? item["availableCapacity"]
      : dedicatedHostAvailableCapacityDeserializer(item["availableCapacity"]),
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArrayDeserializer(item["statuses"]),
    name: item["name"],
  };
}

/** Enables or disables a capability on the dedicated host group. Minimum api-version: 2022-03-01. */
export interface DedicatedHostGroupPropertiesAdditionalCapabilities {
  /** The flag that enables or disables a capability to have UltraSSD Enabled Virtual Machines on Dedicated Hosts of the Dedicated Host Group. For the Virtual Machines to be UltraSSD Enabled, UltraSSDEnabled flag for the resource needs to be set true as well. The value is defaulted to 'false' when not provided. Please refer to https://docs.microsoft.com/en-us/azure/virtual-machines/disks-enable-ultra-ssd for more details on Ultra SSD feature. **Note:** The ultraSSDEnabled setting can only be enabled for Host Groups that are created as zonal. Minimum api-version: 2022-03-01. */
  ultraSSDEnabled?: boolean;
}

export function dedicatedHostGroupPropertiesAdditionalCapabilitiesSerializer(
  item: DedicatedHostGroupPropertiesAdditionalCapabilities,
): any {
  return { ultraSSDEnabled: item["ultraSSDEnabled"] };
}

export function dedicatedHostGroupPropertiesAdditionalCapabilitiesDeserializer(
  item: any,
): DedicatedHostGroupPropertiesAdditionalCapabilities {
  return {
    ultraSSDEnabled: item["ultraSSDEnabled"],
  };
}

/** The instance view of a dedicated host. */
export interface DedicatedHostInstanceView {
  /** Specifies the unique id of the dedicated physical machine on which the dedicated host resides. */
  readonly assetId?: string;
  /** Unutilized capacity of the dedicated host. */
  availableCapacity?: DedicatedHostAvailableCapacity;
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
}

export function dedicatedHostInstanceViewDeserializer(item: any): DedicatedHostInstanceView {
  return {
    assetId: item["assetId"],
    availableCapacity: !item["availableCapacity"]
      ? item["availableCapacity"]
      : dedicatedHostAvailableCapacityDeserializer(item["availableCapacity"]),
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArrayDeserializer(item["statuses"]),
  };
}

/** Dedicated host unutilized capacity. */
export interface DedicatedHostAvailableCapacity {
  /** The unutilized capacity of the dedicated host represented in terms of each VM size that is allowed to be deployed to the dedicated host. */
  allocatableVMs?: DedicatedHostAllocatableVM[];
}

export function dedicatedHostAvailableCapacityDeserializer(
  item: any,
): DedicatedHostAvailableCapacity {
  return {
    allocatableVMs: !item["allocatableVMs"]
      ? item["allocatableVMs"]
      : dedicatedHostAllocatableVMArrayDeserializer(item["allocatableVMs"]),
  };
}

export function dedicatedHostAllocatableVMArrayDeserializer(
  result: Array<DedicatedHostAllocatableVM>,
): any[] {
  return result.map((item) => {
    return dedicatedHostAllocatableVMDeserializer(item);
  });
}

/** Represents the dedicated host unutilized capacity in terms of a specific VM size. */
export interface DedicatedHostAllocatableVM {
  /** VM size in terms of which the unutilized capacity is represented. */
  vmSize?: string;
  /** Maximum number of VMs of size vmSize that can fit in the dedicated host's remaining capacity. */
  count?: number;
}

export function dedicatedHostAllocatableVMDeserializer(item: any): DedicatedHostAllocatableVM {
  return {
    vmSize: item["vmSize"],
    count: item["count"],
  };
}

/** Specifies information about the dedicated host group that the dedicated host should be assigned to. Only tags may be updated. */
export interface DedicatedHostGroupUpdate extends UpdateResource {
  /** Dedicated Host Group Properties. */
  properties?: DedicatedHostGroupProperties;
  /** Availability Zone to use for this host group. Only single zone is supported. The zone can be assigned only during creation. If not provided, the group supports all zones in the region. If provided, enforces each host in the group to be in the same zone. */
  zones?: string[];
}

export function dedicatedHostGroupUpdateSerializer(item: DedicatedHostGroupUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : dedicatedHostGroupPropertiesSerializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** The List Dedicated Host Group with resource group response. */
export interface _DedicatedHostGroupListResult {
  /** The list of dedicated host groups. */
  value: DedicatedHostGroup[];
  /** The URI to fetch the next page of Dedicated Host Groups. Call ListNext() with this URI to fetch the next page of Dedicated Host Groups. */
  nextLink?: string;
}

export function _dedicatedHostGroupListResultDeserializer(
  item: any,
): _DedicatedHostGroupListResult {
  return {
    value: dedicatedHostGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dedicatedHostGroupArraySerializer(result: Array<DedicatedHostGroup>): any[] {
  return result.map((item) => {
    return dedicatedHostGroupSerializer(item);
  });
}

export function dedicatedHostGroupArrayDeserializer(result: Array<DedicatedHostGroup>): any[] {
  return result.map((item) => {
    return dedicatedHostGroupDeserializer(item);
  });
}

/** Specifies information about the Dedicated host. */
export interface DedicatedHost extends TrackedResource {
  /** Properties of the dedicated host. */
  properties?: DedicatedHostProperties;
  /** SKU of the dedicated host for Hardware Generation and VM family. Only name is required to be set. List Microsoft.Compute SKUs for a list of possible values. */
  sku: Sku;
}

export function dedicatedHostSerializer(item: DedicatedHost): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : dedicatedHostPropertiesSerializer(item["properties"]),
    sku: skuSerializer(item["sku"]),
  };
}

export function dedicatedHostDeserializer(item: any): DedicatedHost {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : dedicatedHostPropertiesDeserializer(item["properties"]),
    sku: skuDeserializer(item["sku"]),
  };
}

/** Properties of the dedicated host. */
export interface DedicatedHostProperties {
  /** Fault domain of the dedicated host within a dedicated host group. */
  platformFaultDomain?: number;
  /** Specifies whether the dedicated host should be replaced automatically in case of a failure. The value is defaulted to 'true' when not provided. */
  autoReplaceOnFailure?: boolean;
  /** A unique id generated and assigned to the dedicated host by the platform. Does not change throughout the lifetime of the host. */
  readonly hostId?: string;
  /** A list of references to all virtual machines in the Dedicated Host. */
  readonly virtualMachines?: SubResourceReadOnly[];
  /** Specifies the software license type that will be applied to the VMs deployed on the dedicated host. Possible values are: **None,** **Windows_Server_Hybrid,** **Windows_Server_Perpetual.** The default value is: **None.** */
  licenseType?: DedicatedHostLicenseTypes;
  /** The date when the host was first provisioned. */
  readonly provisioningTime?: Date;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The dedicated host instance view. */
  readonly instanceView?: DedicatedHostInstanceView;
  /** Specifies the time at which the Dedicated Host resource was created. Minimum api-version: 2021-11-01. */
  readonly timeCreated?: Date;
}

export function dedicatedHostPropertiesSerializer(item: DedicatedHostProperties): any {
  return {
    platformFaultDomain: item["platformFaultDomain"],
    autoReplaceOnFailure: item["autoReplaceOnFailure"],
    licenseType: item["licenseType"],
  };
}

export function dedicatedHostPropertiesDeserializer(item: any): DedicatedHostProperties {
  return {
    platformFaultDomain: item["platformFaultDomain"],
    autoReplaceOnFailure: item["autoReplaceOnFailure"],
    hostId: item["hostId"],
    virtualMachines: !item["virtualMachines"]
      ? item["virtualMachines"]
      : subResourceReadOnlyArrayDeserializer(item["virtualMachines"]),
    licenseType: item["licenseType"],
    provisioningTime: !item["provisioningTime"]
      ? item["provisioningTime"]
      : new Date(item["provisioningTime"]),
    provisioningState: item["provisioningState"],
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : dedicatedHostInstanceViewDeserializer(item["instanceView"]),
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
  };
}

/** Specifies the software license type that will be applied to the VMs deployed on the dedicated host. Possible values are: **None,** **Windows_Server_Hybrid,** **Windows_Server_Perpetual.** The default value is: **None.** */
export type DedicatedHostLicenseTypes =
  | "None"
  | "Windows_Server_Hybrid"
  | "Windows_Server_Perpetual";

/** Specifies information about the dedicated host. Only tags, autoReplaceOnFailure and licenseType may be updated. */
export interface DedicatedHostUpdate extends UpdateResource {
  /** Properties of the dedicated host. */
  properties?: DedicatedHostProperties;
  /** [List all available dedicated host sizes for resizing] (https://docs.microsoft.com/rest/api/compute/dedicated-hosts/listavailablesizes). Resizing can be only used to scale up DedicatedHost. Only name is required to be set. */
  sku?: Sku;
}

export function dedicatedHostUpdateSerializer(item: DedicatedHostUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : dedicatedHostPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

/** The list dedicated host operation response. */
export interface _DedicatedHostListResult {
  /** The list of dedicated hosts. */
  value: DedicatedHost[];
  /** The URI to fetch the next page of dedicated hosts. Call ListNext() with this URI to fetch the next page of dedicated hosts. */
  nextLink?: string;
}

export function _dedicatedHostListResultDeserializer(item: any): _DedicatedHostListResult {
  return {
    value: dedicatedHostArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dedicatedHostArraySerializer(result: Array<DedicatedHost>): any[] {
  return result.map((item) => {
    return dedicatedHostSerializer(item);
  });
}

export function dedicatedHostArrayDeserializer(result: Array<DedicatedHost>): any[] {
  return result.map((item) => {
    return dedicatedHostDeserializer(item);
  });
}

/** The List Dedicated Host sizes operation response. */
export interface _DedicatedHostSizeListResult {
  /** The list of dedicated host sizes. */
  value?: string[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _dedicatedHostSizeListResultDeserializer(item: any): _DedicatedHostSizeListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : item["value"].map((p: any) => {
          return p;
        }),
    nextLink: item["nextLink"],
  };
}

/** Specifies information about the SSH public key. */
export interface SshPublicKeyResource extends TrackedResource {
  /** Properties of the SSH public key. */
  properties?: SshPublicKeyResourceProperties;
}

export function sshPublicKeyResourceSerializer(item: SshPublicKeyResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : sshPublicKeyResourcePropertiesSerializer(item["properties"]),
  };
}

export function sshPublicKeyResourceDeserializer(item: any): SshPublicKeyResource {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : sshPublicKeyResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the SSH public key. */
export interface SshPublicKeyResourceProperties {
  /** SSH public key used to authenticate to a virtual machine through ssh. If this property is not initially provided when the resource is created, the publicKey property will be populated when generateKeyPair is called. If the public key is provided upon resource creation, the provided public key needs to be at least 2048-bit and in ssh-rsa format. */
  publicKey?: string;
}

export function sshPublicKeyResourcePropertiesSerializer(
  item: SshPublicKeyResourceProperties,
): any {
  return { publicKey: item["publicKey"] };
}

export function sshPublicKeyResourcePropertiesDeserializer(
  item: any,
): SshPublicKeyResourceProperties {
  return {
    publicKey: item["publicKey"],
  };
}

/** Specifies information about the SSH public key. */
export interface SshPublicKeyUpdateResource extends UpdateResource {
  /** Properties of the SSH public key. */
  properties?: SshPublicKeyResourceProperties;
}

export function sshPublicKeyUpdateResourceSerializer(item: SshPublicKeyUpdateResource): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : sshPublicKeyResourcePropertiesSerializer(item["properties"]),
  };
}

/** The list SSH public keys operation response. */
export interface _SshPublicKeysGroupListResult {
  /** The list of SSH public keys. */
  value: SshPublicKeyResource[];
  /** The URI to fetch the next page of SSH public keys. Call ListNext() with this URI to fetch the next page of SSH public keys. */
  nextLink?: string;
}

export function _sshPublicKeysGroupListResultDeserializer(
  item: any,
): _SshPublicKeysGroupListResult {
  return {
    value: sshPublicKeyResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sshPublicKeyResourceArraySerializer(result: Array<SshPublicKeyResource>): any[] {
  return result.map((item) => {
    return sshPublicKeyResourceSerializer(item);
  });
}

export function sshPublicKeyResourceArrayDeserializer(result: Array<SshPublicKeyResource>): any[] {
  return result.map((item) => {
    return sshPublicKeyResourceDeserializer(item);
  });
}

/** Parameters for GenerateSshKeyPair. */
export interface SshGenerateKeyPairInputParameters {
  /** The encryption type of the SSH keys to be generated. See SshEncryptionTypes for possible set of values. If not provided, will default to RSA */
  encryptionType?: SshEncryptionTypes;
}

export function sshGenerateKeyPairInputParametersSerializer(
  item: SshGenerateKeyPairInputParameters,
): any {
  return { encryptionType: item["encryptionType"] };
}

/** The encryption type of the SSH keys to be generated. See SshEncryptionTypes for possible set of values. If not provided, will default to RSA */
export enum KnownSshEncryptionTypes {
  /** RSA */
  RSA = "RSA",
  /** Ed25519 */
  Ed25519 = "Ed25519",
}

/**
 * The encryption type of the SSH keys to be generated. See SshEncryptionTypes for possible set of values. If not provided, will default to RSA \
 * {@link KnownSshEncryptionTypes} can be used interchangeably with SshEncryptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RSA** \
 * **Ed25519**
 */
export type SshEncryptionTypes = string;

/** Response from generation of an SSH key pair. */
export interface SshPublicKeyGenerateKeyPairResult {
  /** Private key portion of the key pair used to authenticate to a virtual machine through ssh. The private key is returned in RFC3447 format and should be treated as a secret. */
  privateKey: string;
  /** Public key portion of the key pair used to authenticate to a virtual machine through ssh. The public key is in ssh-rsa format. */
  publicKey: string;
  /** The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/{SshPublicKeyName} */
  id: string;
}

export function sshPublicKeyGenerateKeyPairResultDeserializer(
  item: any,
): SshPublicKeyGenerateKeyPairResult {
  return {
    privateKey: item["privateKey"],
    publicKey: item["publicKey"],
    id: item["id"],
  };
}

/** The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. */
export interface Image extends TrackedResource {
  /** Describes the properties of an Image. */
  properties?: ImageProperties;
  /** The extended location of the Image. */
  extendedLocation?: ExtendedLocation;
}

export function imageSerializer(item: Image): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : imagePropertiesSerializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
  };
}

export function imageDeserializer(item: any): Image {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : imagePropertiesDeserializer(item["properties"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Describes the properties of an Image. */
export interface ImageProperties {
  /** The source virtual machine from which Image is created. */
  sourceVirtualMachine?: SubResource;
  /** Specifies the storage settings for the virtual machine disks. */
  storageProfile?: ImageStorageProfile;
  /** The provisioning state. */
  readonly provisioningState?: string;
  /** Specifies the HyperVGenerationType of the VirtualMachine created from the image. From API Version 2019-03-01 if the image source is a blob, then we need the user to specify the value, if the source is managed resource like disk or snapshot, we may require the user to specify the property if we cannot deduce it from the source managed resource. */
  hyperVGeneration?: HyperVGenerationTypes;
}

export function imagePropertiesSerializer(item: ImageProperties): any {
  return {
    sourceVirtualMachine: !item["sourceVirtualMachine"]
      ? item["sourceVirtualMachine"]
      : subResourceSerializer(item["sourceVirtualMachine"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : imageStorageProfileSerializer(item["storageProfile"]),
    hyperVGeneration: item["hyperVGeneration"],
  };
}

export function imagePropertiesDeserializer(item: any): ImageProperties {
  return {
    sourceVirtualMachine: !item["sourceVirtualMachine"]
      ? item["sourceVirtualMachine"]
      : subResourceDeserializer(item["sourceVirtualMachine"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : imageStorageProfileDeserializer(item["storageProfile"]),
    provisioningState: item["provisioningState"],
    hyperVGeneration: item["hyperVGeneration"],
  };
}

/** Describes a storage profile. */
export interface ImageStorageProfile {
  /** Specifies information about the operating system disk used by the virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  osDisk?: ImageOSDisk;
  /** Specifies the parameters that are used to add a data disk to a virtual machine. <br><br> For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  dataDisks?: ImageDataDisk[];
  /** Specifies whether an image is zone resilient or not. Default is false. Zone resilient images can be created only in regions that provide Zone Redundant Storage (ZRS). */
  zoneResilient?: boolean;
}

export function imageStorageProfileSerializer(item: ImageStorageProfile): any {
  return {
    osDisk: !item["osDisk"] ? item["osDisk"] : imageOSDiskSerializer(item["osDisk"]),
    dataDisks: !item["dataDisks"]
      ? item["dataDisks"]
      : imageDataDiskArraySerializer(item["dataDisks"]),
    zoneResilient: item["zoneResilient"],
  };
}

export function imageStorageProfileDeserializer(item: any): ImageStorageProfile {
  return {
    osDisk: !item["osDisk"] ? item["osDisk"] : imageOSDiskDeserializer(item["osDisk"]),
    dataDisks: !item["dataDisks"]
      ? item["dataDisks"]
      : imageDataDiskArrayDeserializer(item["dataDisks"]),
    zoneResilient: item["zoneResilient"],
  };
}

/** Describes an Operating System disk. */
export interface ImageOSDisk extends ImageDisk {
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from a custom image. Possible values are: **Windows,** **Linux.** */
  osType: OperatingSystemTypes;
  /** The OS State. For managed images, use Generalized. */
  osState: OperatingSystemStateTypes;
}

export function imageOSDiskSerializer(item: ImageOSDisk): any {
  return {
    snapshot: !item["snapshot"] ? item["snapshot"] : subResourceSerializer(item["snapshot"]),
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : subResourceSerializer(item["managedDisk"]),
    blobUri: item["blobUri"],
    caching: item["caching"],
    diskSizeGB: item["diskSizeGB"],
    storageAccountType: item["storageAccountType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersSerializer(item["diskEncryptionSet"]),
    osType: item["osType"],
    osState: item["osState"],
  };
}

export function imageOSDiskDeserializer(item: any): ImageOSDisk {
  return {
    snapshot: !item["snapshot"] ? item["snapshot"] : subResourceDeserializer(item["snapshot"]),
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : subResourceDeserializer(item["managedDisk"]),
    blobUri: item["blobUri"],
    caching: item["caching"],
    diskSizeGB: item["diskSizeGB"],
    storageAccountType: item["storageAccountType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersDeserializer(item["diskEncryptionSet"]),
    osType: item["osType"],
    osState: item["osState"],
  };
}

/** The OS State. For managed images, use Generalized. */
export type OperatingSystemStateTypes = "Generalized" | "Specialized";

export function imageDataDiskArraySerializer(result: Array<ImageDataDisk>): any[] {
  return result.map((item) => {
    return imageDataDiskSerializer(item);
  });
}

export function imageDataDiskArrayDeserializer(result: Array<ImageDataDisk>): any[] {
  return result.map((item) => {
    return imageDataDiskDeserializer(item);
  });
}

/** Describes a data disk. */
export interface ImageDataDisk extends ImageDisk {
  /** Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. */
  lun: number;
}

export function imageDataDiskSerializer(item: ImageDataDisk): any {
  return {
    snapshot: !item["snapshot"] ? item["snapshot"] : subResourceSerializer(item["snapshot"]),
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : subResourceSerializer(item["managedDisk"]),
    blobUri: item["blobUri"],
    caching: item["caching"],
    diskSizeGB: item["diskSizeGB"],
    storageAccountType: item["storageAccountType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersSerializer(item["diskEncryptionSet"]),
    lun: item["lun"],
  };
}

export function imageDataDiskDeserializer(item: any): ImageDataDisk {
  return {
    snapshot: !item["snapshot"] ? item["snapshot"] : subResourceDeserializer(item["snapshot"]),
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : subResourceDeserializer(item["managedDisk"]),
    blobUri: item["blobUri"],
    caching: item["caching"],
    diskSizeGB: item["diskSizeGB"],
    storageAccountType: item["storageAccountType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersDeserializer(item["diskEncryptionSet"]),
    lun: item["lun"],
  };
}

/** Specifies the HyperVGeneration Type */
export enum KnownHyperVGenerationTypes {
  /** V1 */
  V1 = "V1",
  /** V2 */
  V2 = "V2",
}

/**
 * Specifies the HyperVGeneration Type \
 * {@link KnownHyperVGenerationTypes} can be used interchangeably with HyperVGenerationTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **V1** \
 * **V2**
 */
export type HyperVGenerationTypes = string;

/** Describes a image disk. */
export interface ImageDisk {
  /** The snapshot. */
  snapshot?: SubResource;
  /** The managedDisk. */
  managedDisk?: SubResource;
  /** The Virtual Hard Disk. */
  blobUri?: string;
  /** Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The default values are: **None for Standard storage. ReadOnly for Premium storage.** */
  caching?: CachingTypes;
  /** Specifies the size of empty data disks in gigabytes. This element can be used to overwrite the name of the disk in a virtual machine image. This value cannot be larger than 1023 GB. */
  diskSizeGB?: number;
  /** Specifies the storage account type for the managed disk. NOTE: UltraSSD_LRS can only be used with data disks, it cannot be used with OS Disk. */
  storageAccountType?: StorageAccountTypes;
  /** Specifies the customer managed disk encryption set resource id for the managed image disk. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
}

export function imageDiskSerializer(item: ImageDisk): any {
  return {
    snapshot: !item["snapshot"] ? item["snapshot"] : subResourceSerializer(item["snapshot"]),
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : subResourceSerializer(item["managedDisk"]),
    blobUri: item["blobUri"],
    caching: item["caching"],
    diskSizeGB: item["diskSizeGB"],
    storageAccountType: item["storageAccountType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersSerializer(item["diskEncryptionSet"]),
  };
}

export function imageDiskDeserializer(item: any): ImageDisk {
  return {
    snapshot: !item["snapshot"] ? item["snapshot"] : subResourceDeserializer(item["snapshot"]),
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : subResourceDeserializer(item["managedDisk"]),
    blobUri: item["blobUri"],
    caching: item["caching"],
    diskSizeGB: item["diskSizeGB"],
    storageAccountType: item["storageAccountType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersDeserializer(item["diskEncryptionSet"]),
  };
}

/** The source user image virtual hard disk. Only tags may be updated. */
export interface ImageUpdate extends UpdateResource {
  /** Describes the properties of an Image. */
  properties?: ImageProperties;
}

export function imageUpdateSerializer(item: ImageUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : imagePropertiesSerializer(item["properties"]),
  };
}

/** The List Image operation response. */
export interface _ImageListResult {
  /** The list of Images */
  value: Image[];
  /** The uri to fetch the next page of Images. Call ListNext() with this to fetch the next page of Images. */
  nextLink?: string;
}

export function _imageListResultDeserializer(item: any): _ImageListResult {
  return {
    value: imageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function imageArraySerializer(result: Array<Image>): any[] {
  return result.map((item) => {
    return imageSerializer(item);
  });
}

export function imageArrayDeserializer(result: Array<Image>): any[] {
  return result.map((item) => {
    return imageDeserializer(item);
  });
}

/** Create or update Restore Point collection parameters. */
export interface RestorePointCollection extends TrackedResource {
  /** The restore point collection properties. */
  properties?: RestorePointCollectionProperties;
}

export function restorePointCollectionSerializer(item: RestorePointCollection): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : restorePointCollectionPropertiesSerializer(item["properties"]),
  };
}

export function restorePointCollectionDeserializer(item: any): RestorePointCollection {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : restorePointCollectionPropertiesDeserializer(item["properties"]),
  };
}

/** The restore point collection properties. */
export interface RestorePointCollectionProperties {
  /** The properties of the source resource that this restore point collection is created from. */
  source?: RestorePointCollectionSourceProperties;
  /** The provisioning state of the restore point collection. */
  readonly provisioningState?: string;
  /** The unique id of the restore point collection. */
  readonly restorePointCollectionId?: string;
  /** A list containing all restore points created under this restore point collection. */
  readonly restorePoints?: RestorePoint[];
}

export function restorePointCollectionPropertiesSerializer(
  item: RestorePointCollectionProperties,
): any {
  return {
    source: !item["source"]
      ? item["source"]
      : restorePointCollectionSourcePropertiesSerializer(item["source"]),
  };
}

export function restorePointCollectionPropertiesDeserializer(
  item: any,
): RestorePointCollectionProperties {
  return {
    source: !item["source"]
      ? item["source"]
      : restorePointCollectionSourcePropertiesDeserializer(item["source"]),
    provisioningState: item["provisioningState"],
    restorePointCollectionId: item["restorePointCollectionId"],
    restorePoints: !item["restorePoints"]
      ? item["restorePoints"]
      : restorePointArrayDeserializer(item["restorePoints"]),
  };
}

/** The properties of the source resource that this restore point collection is created from. */
export interface RestorePointCollectionSourceProperties {
  /** Location of the source resource used to create this restore point collection. */
  readonly location?: string;
  /** Resource Id of the source resource used to create this restore point collection */
  id?: string;
}

export function restorePointCollectionSourcePropertiesSerializer(
  item: RestorePointCollectionSourceProperties,
): any {
  return { id: item["id"] };
}

export function restorePointCollectionSourcePropertiesDeserializer(
  item: any,
): RestorePointCollectionSourceProperties {
  return {
    location: item["location"],
    id: item["id"],
  };
}

export function restorePointArraySerializer(result: Array<RestorePoint>): any[] {
  return result.map((item) => {
    return restorePointSerializer(item);
  });
}

export function restorePointArrayDeserializer(result: Array<RestorePoint>): any[] {
  return result.map((item) => {
    return restorePointDeserializer(item);
  });
}

/** Restore Point details. */
export interface RestorePoint extends ProxyResource {
  /** The restore point properties. */
  properties?: RestorePointProperties;
}

export function restorePointSerializer(item: RestorePoint): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : restorePointPropertiesSerializer(item["properties"]),
  };
}

export function restorePointDeserializer(item: any): RestorePoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : restorePointPropertiesDeserializer(item["properties"]),
  };
}

/** The restore point properties. */
export interface RestorePointProperties {
  /** List of disk resource ids that the customer wishes to exclude from the restore point. If no disks are specified, all disks will be included. */
  excludeDisks?: ApiEntityReference[];
  /** Gets the details of the VM captured at the time of the restore point creation. */
  sourceMetadata?: RestorePointSourceMetadata;
  /** Gets the provisioning state of the restore point. */
  readonly provisioningState?: string;
  /** ConsistencyMode of the RestorePoint. Can be specified in the input while creating a restore point. For now, only CrashConsistent is accepted as a valid input. Please refer to https://aka.ms/RestorePoints for more details. */
  consistencyMode?: ConsistencyModeTypes;
  /** Gets the creation time of the restore point. */
  timeCreated?: Date;
  /** Resource Id of the source restore point from which a copy needs to be created. */
  sourceRestorePoint?: ApiEntityReference;
  /** The restore point instance view. */
  readonly instanceView?: RestorePointInstanceView;
}

export function restorePointPropertiesSerializer(item: RestorePointProperties): any {
  return {
    excludeDisks: !item["excludeDisks"]
      ? item["excludeDisks"]
      : apiEntityReferenceArraySerializer(item["excludeDisks"]),
    sourceMetadata: !item["sourceMetadata"]
      ? item["sourceMetadata"]
      : restorePointSourceMetadataSerializer(item["sourceMetadata"]),
    consistencyMode: item["consistencyMode"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : item["timeCreated"].toISOString(),
    sourceRestorePoint: !item["sourceRestorePoint"]
      ? item["sourceRestorePoint"]
      : apiEntityReferenceSerializer(item["sourceRestorePoint"]),
  };
}

export function restorePointPropertiesDeserializer(item: any): RestorePointProperties {
  return {
    excludeDisks: !item["excludeDisks"]
      ? item["excludeDisks"]
      : apiEntityReferenceArrayDeserializer(item["excludeDisks"]),
    sourceMetadata: !item["sourceMetadata"]
      ? item["sourceMetadata"]
      : restorePointSourceMetadataDeserializer(item["sourceMetadata"]),
    provisioningState: item["provisioningState"],
    consistencyMode: item["consistencyMode"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    sourceRestorePoint: !item["sourceRestorePoint"]
      ? item["sourceRestorePoint"]
      : apiEntityReferenceDeserializer(item["sourceRestorePoint"]),
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : restorePointInstanceViewDeserializer(item["instanceView"]),
  };
}

export function apiEntityReferenceArraySerializer(result: Array<ApiEntityReference>): any[] {
  return result.map((item) => {
    return apiEntityReferenceSerializer(item);
  });
}

export function apiEntityReferenceArrayDeserializer(result: Array<ApiEntityReference>): any[] {
  return result.map((item) => {
    return apiEntityReferenceDeserializer(item);
  });
}

/** Describes the properties of the Virtual Machine for which the restore point was created. The properties provided are a subset and the snapshot of the overall Virtual Machine properties captured at the time of the restore point creation. */
export interface RestorePointSourceMetadata {
  /** Gets the hardware profile. */
  readonly hardwareProfile?: HardwareProfile;
  /** Gets the storage profile. */
  storageProfile?: RestorePointSourceVMStorageProfile;
  /** Gets the OS profile. */
  readonly osProfile?: OSProfile;
  /** Gets the diagnostics profile. */
  readonly diagnosticsProfile?: DiagnosticsProfile;
  /** Gets the license type, which is for bring your own license scenario. */
  readonly licenseType?: string;
  /** Gets the virtual machine unique id. */
  readonly vmId?: string;
  /** Gets the security profile. */
  readonly securityProfile?: SecurityProfile;
  /** Location of the VM from which the restore point was created. */
  readonly location?: string;
  /** UserData associated with the source VM for which restore point is captured, which is a base-64 encoded value. */
  readonly userData?: string;
  /** HyperVGeneration of the source VM for which restore point is captured. */
  readonly hyperVGeneration?: HyperVGenerationTypes;
}

export function restorePointSourceMetadataSerializer(item: RestorePointSourceMetadata): any {
  return {
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : restorePointSourceVMStorageProfileSerializer(item["storageProfile"]),
  };
}

export function restorePointSourceMetadataDeserializer(item: any): RestorePointSourceMetadata {
  return {
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hardwareProfileDeserializer(item["hardwareProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : restorePointSourceVMStorageProfileDeserializer(item["storageProfile"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileDeserializer(item["osProfile"]),
    diagnosticsProfile: !item["diagnosticsProfile"]
      ? item["diagnosticsProfile"]
      : diagnosticsProfileDeserializer(item["diagnosticsProfile"]),
    licenseType: item["licenseType"],
    vmId: item["vmId"],
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileDeserializer(item["securityProfile"]),
    location: item["location"],
    userData: item["userData"],
    hyperVGeneration: item["hyperVGeneration"],
  };
}

/** Describes the storage profile. */
export interface RestorePointSourceVMStorageProfile {
  /** Gets the OS disk of the VM captured at the time of the restore point creation. */
  osDisk?: RestorePointSourceVmosDisk;
  /** Gets the data disks of the VM captured at the time of the restore point creation. */
  dataDisks?: RestorePointSourceVMDataDisk[];
  /** Gets the disk controller type of the VM captured at the time of the restore point creation. */
  readonly diskControllerType?: DiskControllerTypes;
}

export function restorePointSourceVMStorageProfileSerializer(
  item: RestorePointSourceVMStorageProfile,
): any {
  return {
    osDisk: !item["osDisk"] ? item["osDisk"] : restorePointSourceVmosDiskSerializer(item["osDisk"]),
    dataDisks: !item["dataDisks"]
      ? item["dataDisks"]
      : restorePointSourceVMDataDiskArraySerializer(item["dataDisks"]),
  };
}

export function restorePointSourceVMStorageProfileDeserializer(
  item: any,
): RestorePointSourceVMStorageProfile {
  return {
    osDisk: !item["osDisk"]
      ? item["osDisk"]
      : restorePointSourceVmosDiskDeserializer(item["osDisk"]),
    dataDisks: !item["dataDisks"]
      ? item["dataDisks"]
      : restorePointSourceVMDataDiskArrayDeserializer(item["dataDisks"]),
    diskControllerType: item["diskControllerType"],
  };
}

/** Describes an Operating System disk. */
export interface RestorePointSourceVmosDisk {
  /** Gets the Operating System type. */
  readonly osType?: OperatingSystemType;
  /** Gets the disk encryption settings. */
  readonly encryptionSettings?: DiskEncryptionSettings;
  /** Gets the disk name. */
  readonly name?: string;
  /** Gets the caching type. */
  readonly caching?: CachingTypes;
  /** Gets the disk size in GB. */
  readonly diskSizeGB?: number;
  /** Gets the managed disk details */
  managedDisk?: ManagedDiskParameters;
  /** Contains Disk Restore Point properties. */
  diskRestorePoint?: DiskRestorePointAttributes;
  /** Shows true if the disk is write-accelerator enabled. */
  readonly writeAcceleratorEnabled?: boolean;
}

export function restorePointSourceVmosDiskSerializer(item: RestorePointSourceVmosDisk): any {
  return {
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskParametersSerializer(item["managedDisk"]),
    diskRestorePoint: !item["diskRestorePoint"]
      ? item["diskRestorePoint"]
      : diskRestorePointAttributesSerializer(item["diskRestorePoint"]),
  };
}

export function restorePointSourceVmosDiskDeserializer(item: any): RestorePointSourceVmosDisk {
  return {
    osType: item["osType"],
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : diskEncryptionSettingsDeserializer(item["encryptionSettings"]),
    name: item["name"],
    caching: item["caching"],
    diskSizeGB: item["diskSizeGB"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskParametersDeserializer(item["managedDisk"]),
    diskRestorePoint: !item["diskRestorePoint"]
      ? item["diskRestorePoint"]
      : diskRestorePointAttributesDeserializer(item["diskRestorePoint"]),
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
  };
}

/** Gets the Operating System type. */
export enum KnownOperatingSystemType {
  /** Windows */
  Windows = "Windows",
  /** Linux */
  Linux = "Linux",
}

/**
 * Gets the Operating System type. \
 * {@link KnownOperatingSystemType} can be used interchangeably with OperatingSystemType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows** \
 * **Linux**
 */
export type OperatingSystemType = string;

/** Disk Restore Point details. */
export interface DiskRestorePointAttributes extends SubResourceReadOnly {
  /** Encryption at rest settings for disk restore point. It is an optional property that can be specified in the input while creating a restore point. */
  encryption?: RestorePointEncryption;
  /** Resource Id of the source disk restore point. */
  sourceDiskRestorePoint?: ApiEntityReference;
}

export function diskRestorePointAttributesSerializer(item: DiskRestorePointAttributes): any {
  return {
    encryption: !item["encryption"]
      ? item["encryption"]
      : restorePointEncryptionSerializer(item["encryption"]),
    sourceDiskRestorePoint: !item["sourceDiskRestorePoint"]
      ? item["sourceDiskRestorePoint"]
      : apiEntityReferenceSerializer(item["sourceDiskRestorePoint"]),
  };
}

export function diskRestorePointAttributesDeserializer(item: any): DiskRestorePointAttributes {
  return {
    id: item["id"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : restorePointEncryptionDeserializer(item["encryption"]),
    sourceDiskRestorePoint: !item["sourceDiskRestorePoint"]
      ? item["sourceDiskRestorePoint"]
      : apiEntityReferenceDeserializer(item["sourceDiskRestorePoint"]),
  };
}

/** Encryption at rest settings for disk restore point. It is an optional property that can be specified in the input while creating a restore point. */
export interface RestorePointEncryption {
  /** Describes the parameter of customer managed disk encryption set resource id that can be specified for disk. **Note:** The disk encryption set resource id can only be specified for managed disk. Please refer https://aka.ms/mdssewithcmkoverview for more details. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
  /** The type of key used to encrypt the data of the disk restore point. */
  type?: RestorePointEncryptionType;
}

export function restorePointEncryptionSerializer(item: RestorePointEncryption): any {
  return {
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersSerializer(item["diskEncryptionSet"]),
    type: item["type"],
  };
}

export function restorePointEncryptionDeserializer(item: any): RestorePointEncryption {
  return {
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersDeserializer(item["diskEncryptionSet"]),
    type: item["type"],
  };
}

/** The type of key used to encrypt the data of the disk restore point. */
export enum KnownRestorePointEncryptionType {
  /** Disk Restore Point is encrypted at rest with Platform managed key. */
  EncryptionAtRestWithPlatformKey = "EncryptionAtRestWithPlatformKey",
  /** Disk Restore Point is encrypted at rest with Customer managed key that can be changed and revoked by a customer. */
  EncryptionAtRestWithCustomerKey = "EncryptionAtRestWithCustomerKey",
  /** Disk Restore Point is encrypted at rest with 2 layers of encryption. One of the keys is Customer managed and the other key is Platform managed. */
  EncryptionAtRestWithPlatformAndCustomerKeys = "EncryptionAtRestWithPlatformAndCustomerKeys",
}

/**
 * The type of key used to encrypt the data of the disk restore point. \
 * {@link KnownRestorePointEncryptionType} can be used interchangeably with RestorePointEncryptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EncryptionAtRestWithPlatformKey**: Disk Restore Point is encrypted at rest with Platform managed key. \
 * **EncryptionAtRestWithCustomerKey**: Disk Restore Point is encrypted at rest with Customer managed key that can be changed and revoked by a customer. \
 * **EncryptionAtRestWithPlatformAndCustomerKeys**: Disk Restore Point is encrypted at rest with 2 layers of encryption. One of the keys is Customer managed and the other key is Platform managed.
 */
export type RestorePointEncryptionType = string;

export function restorePointSourceVMDataDiskArraySerializer(
  result: Array<RestorePointSourceVMDataDisk>,
): any[] {
  return result.map((item) => {
    return restorePointSourceVMDataDiskSerializer(item);
  });
}

export function restorePointSourceVMDataDiskArrayDeserializer(
  result: Array<RestorePointSourceVMDataDisk>,
): any[] {
  return result.map((item) => {
    return restorePointSourceVMDataDiskDeserializer(item);
  });
}

/** Describes a data disk. */
export interface RestorePointSourceVMDataDisk {
  /** Gets the logical unit number. */
  readonly lun?: number;
  /** Gets the disk name. */
  readonly name?: string;
  /** Gets the caching type. */
  readonly caching?: CachingTypes;
  /** Gets the initial disk size in GB for blank data disks, and the new desired size for existing OS and Data disks. */
  readonly diskSizeGB?: number;
  /** Contains the managed disk details. */
  managedDisk?: ManagedDiskParameters;
  /** Contains Disk Restore Point properties. */
  diskRestorePoint?: DiskRestorePointAttributes;
  /** Shows true if the disk is write-accelerator enabled. */
  readonly writeAcceleratorEnabled?: boolean;
}

export function restorePointSourceVMDataDiskSerializer(item: RestorePointSourceVMDataDisk): any {
  return {
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskParametersSerializer(item["managedDisk"]),
    diskRestorePoint: !item["diskRestorePoint"]
      ? item["diskRestorePoint"]
      : diskRestorePointAttributesSerializer(item["diskRestorePoint"]),
  };
}

export function restorePointSourceVMDataDiskDeserializer(item: any): RestorePointSourceVMDataDisk {
  return {
    lun: item["lun"],
    name: item["name"],
    caching: item["caching"],
    diskSizeGB: item["diskSizeGB"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskParametersDeserializer(item["managedDisk"]),
    diskRestorePoint: !item["diskRestorePoint"]
      ? item["diskRestorePoint"]
      : diskRestorePointAttributesDeserializer(item["diskRestorePoint"]),
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
  };
}

/** ConsistencyMode of the RestorePoint. Can be specified in the input while creating a restore point. For now, only CrashConsistent is accepted as a valid input. Please refer to https://aka.ms/RestorePoints for more details. */
export enum KnownConsistencyModeTypes {
  /** CrashConsistent */
  CrashConsistent = "CrashConsistent",
  /** FileSystemConsistent */
  FileSystemConsistent = "FileSystemConsistent",
  /** ApplicationConsistent */
  ApplicationConsistent = "ApplicationConsistent",
}

/**
 * ConsistencyMode of the RestorePoint. Can be specified in the input while creating a restore point. For now, only CrashConsistent is accepted as a valid input. Please refer to https://aka.ms/RestorePoints for more details. \
 * {@link KnownConsistencyModeTypes} can be used interchangeably with ConsistencyModeTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CrashConsistent** \
 * **FileSystemConsistent** \
 * **ApplicationConsistent**
 */
export type ConsistencyModeTypes = string;

/** The instance view of a restore point. */
export interface RestorePointInstanceView {
  /** The disk restore points information. */
  diskRestorePoints?: DiskRestorePointInstanceView[];
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
}

export function restorePointInstanceViewDeserializer(item: any): RestorePointInstanceView {
  return {
    diskRestorePoints: !item["diskRestorePoints"]
      ? item["diskRestorePoints"]
      : diskRestorePointInstanceViewArrayDeserializer(item["diskRestorePoints"]),
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArrayDeserializer(item["statuses"]),
  };
}

export function diskRestorePointInstanceViewArrayDeserializer(
  result: Array<DiskRestorePointInstanceView>,
): any[] {
  return result.map((item) => {
    return diskRestorePointInstanceViewDeserializer(item);
  });
}

/** The instance view of a disk restore point. */
export interface DiskRestorePointInstanceView {
  /** Disk restore point Id. */
  id?: string;
  /** The disk restore point replication status information. */
  replicationStatus?: DiskRestorePointReplicationStatus;
}

export function diskRestorePointInstanceViewDeserializer(item: any): DiskRestorePointInstanceView {
  return {
    id: item["id"],
    replicationStatus: !item["replicationStatus"]
      ? item["replicationStatus"]
      : diskRestorePointReplicationStatusDeserializer(item["replicationStatus"]),
  };
}

/** The instance view of a disk restore point. */
export interface DiskRestorePointReplicationStatus {
  /** The resource status information. */
  status?: InstanceViewStatus;
  /** Replication completion percentage. */
  completionPercent?: number;
}

export function diskRestorePointReplicationStatusDeserializer(
  item: any,
): DiskRestorePointReplicationStatus {
  return {
    status: !item["status"] ? item["status"] : instanceViewStatusDeserializer(item["status"]),
    completionPercent: item["completionPercent"],
  };
}

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

/** Update Restore Point collection parameters. */
export interface RestorePointCollectionUpdate extends UpdateResource {
  /** The restore point collection properties. */
  properties?: RestorePointCollectionProperties;
}

export function restorePointCollectionUpdateSerializer(item: RestorePointCollectionUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : restorePointCollectionPropertiesSerializer(item["properties"]),
  };
}

/** The List restore point collection operation response. */
export interface _RestorePointCollectionListResult {
  /** Gets the list of restore point collections. */
  value: RestorePointCollection[];
  /** The uri to fetch the next page of RestorePointCollections. Call ListNext() with this to fetch the next page of RestorePointCollections. */
  nextLink?: string;
}

export function _restorePointCollectionListResultDeserializer(
  item: any,
): _RestorePointCollectionListResult {
  return {
    value: restorePointCollectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function restorePointCollectionArraySerializer(
  result: Array<RestorePointCollection>,
): any[] {
  return result.map((item) => {
    return restorePointCollectionSerializer(item);
  });
}

export function restorePointCollectionArrayDeserializer(
  result: Array<RestorePointCollection>,
): any[] {
  return result.map((item) => {
    return restorePointCollectionDeserializer(item);
  });
}

/** Specifies information about the capacity reservation group that the capacity reservations should be assigned to. Currently, a capacity reservation can only be added to a capacity reservation group at creation time. An existing capacity reservation cannot be added or moved to another capacity reservation group. */
export interface CapacityReservationGroup extends TrackedResource {
  /** capacity reservation group Properties. */
  properties?: CapacityReservationGroupProperties;
  /** The availability zones. */
  zones?: string[];
}

export function capacityReservationGroupSerializer(item: CapacityReservationGroup): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : capacityReservationGroupPropertiesSerializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function capacityReservationGroupDeserializer(item: any): CapacityReservationGroup {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : capacityReservationGroupPropertiesDeserializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** capacity reservation group Properties. */
export interface CapacityReservationGroupProperties {
  /** A list of all capacity reservation resource ids that belong to capacity reservation group. */
  readonly capacityReservations?: SubResourceReadOnly[];
  /** A list of references to all virtual machines associated to the capacity reservation group. */
  readonly virtualMachinesAssociated?: SubResourceReadOnly[];
  /** The capacity reservation group instance view which has the list of instance views for all the capacity reservations that belong to the capacity reservation group. */
  readonly instanceView?: CapacityReservationGroupInstanceView;
  /** Specifies the settings to enable sharing across subscriptions for the capacity reservation group resource. The capacity reservation group resource can generally be shared across subscriptions belonging to a single Azure AAD tenant or across AAD tenants if there is a trust relationship established between the tenants.  Block capacity reservation does not support sharing across subscriptions. **Note:** Minimum api-version: 2023-09-01. Please refer to https://aka.ms/computereservationsharing for more details. */
  sharingProfile?: ResourceSharingProfile;
  /** Indicates the type of capacity reservation. Allowed values are 'Block' for block capacity reservations and 'Targeted' for reservations that enable a VM to consume a specific capacity reservation when a capacity reservation group is provided. The reservation type is immutable and cannot be changed after it is assigned. */
  reservationType?: ReservationType;
}

export function capacityReservationGroupPropertiesSerializer(
  item: CapacityReservationGroupProperties,
): any {
  return {
    sharingProfile: !item["sharingProfile"]
      ? item["sharingProfile"]
      : resourceSharingProfileSerializer(item["sharingProfile"]),
    reservationType: item["reservationType"],
  };
}

export function capacityReservationGroupPropertiesDeserializer(
  item: any,
): CapacityReservationGroupProperties {
  return {
    capacityReservations: !item["capacityReservations"]
      ? item["capacityReservations"]
      : subResourceReadOnlyArrayDeserializer(item["capacityReservations"]),
    virtualMachinesAssociated: !item["virtualMachinesAssociated"]
      ? item["virtualMachinesAssociated"]
      : subResourceReadOnlyArrayDeserializer(item["virtualMachinesAssociated"]),
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : capacityReservationGroupInstanceViewDeserializer(item["instanceView"]),
    sharingProfile: !item["sharingProfile"]
      ? item["sharingProfile"]
      : resourceSharingProfileDeserializer(item["sharingProfile"]),
    reservationType: item["reservationType"],
  };
}

/** model interface CapacityReservationGroupInstanceView */
export interface CapacityReservationGroupInstanceView {
  /** List of instance view of the capacity reservations under the capacity reservation group. */
  readonly capacityReservations?: CapacityReservationInstanceViewWithName[];
  /** List of the subscriptions that the capacity reservation group is shared with. **Note:** Minimum api-version: 2023-09-01. Please refer to https://aka.ms/computereservationsharing for more details. */
  readonly sharedSubscriptionIds?: SubResourceReadOnly[];
}

export function capacityReservationGroupInstanceViewDeserializer(
  item: any,
): CapacityReservationGroupInstanceView {
  return {
    capacityReservations: !item["capacityReservations"]
      ? item["capacityReservations"]
      : capacityReservationInstanceViewWithNameArrayDeserializer(item["capacityReservations"]),
    sharedSubscriptionIds: !item["sharedSubscriptionIds"]
      ? item["sharedSubscriptionIds"]
      : subResourceReadOnlyArrayDeserializer(item["sharedSubscriptionIds"]),
  };
}

export function capacityReservationInstanceViewWithNameArrayDeserializer(
  result: Array<CapacityReservationInstanceViewWithName>,
): any[] {
  return result.map((item) => {
    return capacityReservationInstanceViewWithNameDeserializer(item);
  });
}

/** The instance view of a capacity reservation that includes the name of the capacity reservation. It is used for the response to the instance view of a capacity reservation group. */
export interface CapacityReservationInstanceViewWithName extends CapacityReservationInstanceView {
  /** The name of the capacity reservation. */
  readonly name?: string;
}

export function capacityReservationInstanceViewWithNameDeserializer(
  item: any,
): CapacityReservationInstanceViewWithName {
  return {
    utilizationInfo: !item["utilizationInfo"]
      ? item["utilizationInfo"]
      : capacityReservationUtilizationDeserializer(item["utilizationInfo"]),
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArrayDeserializer(item["statuses"]),
    name: item["name"],
  };
}

/** model interface ResourceSharingProfile */
export interface ResourceSharingProfile {
  /** Specifies an array of subscription resource IDs that capacity reservation group is shared with. Block Capacity Reservations does not support sharing across subscriptions. **Note:** Minimum api-version: 2023-09-01. Please refer to https://aka.ms/computereservationsharing for more details. */
  subscriptionIds?: SubResource[];
}

export function resourceSharingProfileSerializer(item: ResourceSharingProfile): any {
  return {
    subscriptionIds: !item["subscriptionIds"]
      ? item["subscriptionIds"]
      : subResourceArraySerializer(item["subscriptionIds"]),
  };
}

export function resourceSharingProfileDeserializer(item: any): ResourceSharingProfile {
  return {
    subscriptionIds: !item["subscriptionIds"]
      ? item["subscriptionIds"]
      : subResourceArrayDeserializer(item["subscriptionIds"]),
  };
}

/** Indicates the type of capacity reservation. Allowed values are 'Block' for block capacity reservations and 'Targeted' for reservations that enable a VM to consume a specific capacity reservation when a capacity reservation group is provided. The reservation type is immutable and cannot be changed after it is assigned. */
export enum KnownReservationType {
  /** To consume on demand allocated capacity reservation when a capacity reservation group is provided. */
  Targeted = "Targeted",
  /** To consume scheduled allocated block capacity reservation when a capacity reservation group is provided. */
  Block = "Block",
}

/**
 * Indicates the type of capacity reservation. Allowed values are 'Block' for block capacity reservations and 'Targeted' for reservations that enable a VM to consume a specific capacity reservation when a capacity reservation group is provided. The reservation type is immutable and cannot be changed after it is assigned. \
 * {@link KnownReservationType} can be used interchangeably with ReservationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Targeted**: To consume on demand allocated capacity reservation when a capacity reservation group is provided. \
 * **Block**: To consume scheduled allocated block capacity reservation when a capacity reservation group is provided.
 */
export type ReservationType = string;

/** The instance view of a capacity reservation that provides as snapshot of the runtime properties of the capacity reservation that is managed by the platform and can change outside of control plane operations. */
export interface CapacityReservationInstanceView {
  /** Unutilized capacity of the capacity reservation. */
  utilizationInfo?: CapacityReservationUtilization;
  /** The resource status information. */
  statuses?: InstanceViewStatus[];
}

export function capacityReservationInstanceViewDeserializer(
  item: any,
): CapacityReservationInstanceView {
  return {
    utilizationInfo: !item["utilizationInfo"]
      ? item["utilizationInfo"]
      : capacityReservationUtilizationDeserializer(item["utilizationInfo"]),
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArrayDeserializer(item["statuses"]),
  };
}

/** Represents the capacity reservation utilization in terms of resources allocated. */
export interface CapacityReservationUtilization {
  /** The value provides the current capacity of the VM size which was reserved successfully and for which the customer is getting billed. Minimum api-version: 2022-08-01. */
  readonly currentCapacity?: number;
  /** A list of all virtual machines resource ids allocated against the capacity reservation. */
  readonly virtualMachinesAllocated?: SubResourceReadOnly[];
}

export function capacityReservationUtilizationDeserializer(
  item: any,
): CapacityReservationUtilization {
  return {
    currentCapacity: item["currentCapacity"],
    virtualMachinesAllocated: !item["virtualMachinesAllocated"]
      ? item["virtualMachinesAllocated"]
      : subResourceReadOnlyArrayDeserializer(item["virtualMachinesAllocated"]),
  };
}

/** Specifies information about the capacity reservation group. Only tags can be updated. */
export interface CapacityReservationGroupUpdate extends UpdateResource {
  /** capacity reservation group Properties. */
  properties?: CapacityReservationGroupProperties;
}

export function capacityReservationGroupUpdateSerializer(
  item: CapacityReservationGroupUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : capacityReservationGroupPropertiesSerializer(item["properties"]),
  };
}

/** The List capacity reservation group with resource group response. */
export interface _CapacityReservationGroupListResult {
  /** The list of capacity reservation groups. */
  value: CapacityReservationGroup[];
  /** The URI to fetch the next page of capacity reservation groups. Call ListNext() with this URI to fetch the next page of capacity reservation groups. */
  nextLink?: string;
}

export function _capacityReservationGroupListResultDeserializer(
  item: any,
): _CapacityReservationGroupListResult {
  return {
    value: capacityReservationGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function capacityReservationGroupArraySerializer(
  result: Array<CapacityReservationGroup>,
): any[] {
  return result.map((item) => {
    return capacityReservationGroupSerializer(item);
  });
}

export function capacityReservationGroupArrayDeserializer(
  result: Array<CapacityReservationGroup>,
): any[] {
  return result.map((item) => {
    return capacityReservationGroupDeserializer(item);
  });
}

/** Specifies information about the capacity reservation. */
export interface CapacityReservation extends TrackedResource {
  /** Properties of the Capacity reservation. */
  properties?: CapacityReservationProperties;
  /** SKU of the resource for which capacity needs be reserved. The SKU name and capacity is required to be set.  For Block capacity reservations, sku.capacity can only accept values 1, 2, 4, 8, 16, 32, 64. Currently VM Skus with the capability called 'CapacityReservationSupported' set to true are supported. When 'CapacityReservationSupported' is true, the SKU capability also specifies the 'SupportedCapacityReservationTypes', which lists the types of capacity reservations (such as Targeted or Block) that the SKU supports. Refer to List Microsoft.Compute SKUs in a region (https://docs.microsoft.com/rest/api/compute/resourceskus/list) for supported values. */
  sku: Sku;
  /** The availability zones. */
  zones?: string[];
}

export function capacityReservationSerializer(item: CapacityReservation): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : capacityReservationPropertiesSerializer(item["properties"]),
    sku: skuSerializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function capacityReservationDeserializer(item: any): CapacityReservation {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : capacityReservationPropertiesDeserializer(item["properties"]),
    sku: skuDeserializer(item["sku"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** Properties of the Capacity reservation. */
export interface CapacityReservationProperties {
  /** A unique id generated and assigned to the capacity reservation by the platform which does not change throughout the lifetime of the resource. */
  readonly reservationId?: string;
  /** Specifies the value of fault domain count that Capacity Reservation supports for requested VM size. **Note:** The fault domain count specified for a resource (like virtual machines scale set) must be less than or equal to this value if it deploys using capacity reservation. Minimum api-version: 2022-08-01. */
  readonly platformFaultDomainCount?: number;
  /** A list of all virtual machine resource ids that are associated with the capacity reservation. */
  readonly virtualMachinesAssociated?: SubResourceReadOnly[];
  /** The date time when the capacity reservation was last updated. */
  readonly provisioningTime?: Date;
  /** The provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** The Capacity reservation instance view. */
  readonly instanceView?: CapacityReservationInstanceView;
  /** Specifies the time at which the Capacity Reservation resource was created. Minimum api-version: 2021-11-01. */
  readonly timeCreated?: Date;
  /** Defines the schedule for Block-type capacity reservations. Specifies the schedule during which capacity reservation is active and VM or VMSS resource can be allocated using reservation. This property is required and only supported when the capacity reservation group type is 'Block'. The scheduleProfile, start, and end fields are immutable after creation. Minimum API version: 2025-04-01. Please refer to https://aka.ms/blockcapacityreservation for more details. */
  scheduleProfile?: ScheduleProfile;
}

export function capacityReservationPropertiesSerializer(item: CapacityReservationProperties): any {
  return {
    scheduleProfile: !item["scheduleProfile"]
      ? item["scheduleProfile"]
      : scheduleProfileSerializer(item["scheduleProfile"]),
  };
}

export function capacityReservationPropertiesDeserializer(
  item: any,
): CapacityReservationProperties {
  return {
    reservationId: item["reservationId"],
    platformFaultDomainCount: item["platformFaultDomainCount"],
    virtualMachinesAssociated: !item["virtualMachinesAssociated"]
      ? item["virtualMachinesAssociated"]
      : subResourceReadOnlyArrayDeserializer(item["virtualMachinesAssociated"]),
    provisioningTime: !item["provisioningTime"]
      ? item["provisioningTime"]
      : new Date(item["provisioningTime"]),
    provisioningState: item["provisioningState"],
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : capacityReservationInstanceViewDeserializer(item["instanceView"]),
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    scheduleProfile: !item["scheduleProfile"]
      ? item["scheduleProfile"]
      : scheduleProfileDeserializer(item["scheduleProfile"]),
  };
}

/** Defines the schedule for Block-type capacity reservations. Specifies the schedule during which capacity reservation is active and VM or VMSS resource can be allocated using reservation. This property is required and only supported when the capacity reservation group type is 'Block'. The scheduleProfile, start, and end fields are immutable after creation. Minimum API version: 2025-04-01. Please refer to https://aka.ms/blockcapacityreservation for more details. */
export interface ScheduleProfile {
  /** The required start date for block capacity reservations. Must be today or within 56 days in the future. For same-day scheduling, requests must be submitted before 11:30 AM UTC. Example: 2025-06-27. */
  start?: string;
  /** The required end date for block capacity reservations. Must be after the start date, with a duration of either 1–14 whole days or 3–26 whole weeks. Example: 2025-06-28. */
  end?: string;
}

export function scheduleProfileSerializer(item: ScheduleProfile): any {
  return { start: item["start"], end: item["end"] };
}

export function scheduleProfileDeserializer(item: any): ScheduleProfile {
  return {
    start: item["start"],
    end: item["end"],
  };
}

/** Specifies information about the capacity reservation. sku.capacity cannot be updated for Block Capacity Reservation. Tags can be update for all Capacity Reservation Types. */
export interface CapacityReservationUpdate extends UpdateResource {
  /** Properties of the Capacity reservation. */
  properties?: CapacityReservationProperties;
  /** SKU of the resource for which capacity needs be reserved. The SKU name and capacity is required to be set. Currently VM Skus with the capability called 'CapacityReservationSupported' set to true are supported. When 'CapacityReservationSupported' is true, the SKU capability also specifies the 'SupportedCapacityReservationTypes', which lists the types of capacity reservations (such as Targeted or Block) that the SKU supports. Refer to List Microsoft.Compute SKUs in a region (https://docs.microsoft.com/rest/api/compute/resourceskus/list) for supported values. **Note:** The SKU name and capacity cannot be updated for Block capacity reservations. */
  sku?: Sku;
}

export function capacityReservationUpdateSerializer(item: CapacityReservationUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : capacityReservationPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

/** The list capacity reservation operation response. */
export interface _CapacityReservationListResult {
  /** The list of capacity reservations. */
  value: CapacityReservation[];
  /** The URI to fetch the next page of capacity reservations. Call ListNext() with this URI to fetch the next page of capacity reservations. */
  nextLink?: string;
}

export function _capacityReservationListResultDeserializer(
  item: any,
): _CapacityReservationListResult {
  return {
    value: capacityReservationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function capacityReservationArraySerializer(result: Array<CapacityReservation>): any[] {
  return result.map((item) => {
    return capacityReservationSerializer(item);
  });
}

export function capacityReservationArrayDeserializer(result: Array<CapacityReservation>): any[] {
  return result.map((item) => {
    return capacityReservationDeserializer(item);
  });
}

/** Describes a Virtual Machine run command. */
export interface VirtualMachineRunCommand extends TrackedResource {
  /** Describes the properties of a Virtual Machine run command. */
  properties?: VirtualMachineRunCommandProperties;
}

export function virtualMachineRunCommandSerializer(item: VirtualMachineRunCommand): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineRunCommandPropertiesSerializer(item["properties"]),
  };
}

export function virtualMachineRunCommandDeserializer(item: any): VirtualMachineRunCommand {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineRunCommandPropertiesDeserializer(item["properties"]),
  };
}

/** Describes the properties of a Virtual Machine run command. */
export interface VirtualMachineRunCommandProperties {
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
  /** Specifies the Azure storage blob where script output stream will be uploaded. Use a SAS URI with read, append, create, write access OR use managed identity to provide the VM access to the blob. Refer outputBlobManagedIdentity parameter. */
  outputBlobUri?: string;
  /** Specifies the Azure storage blob where script error stream will be uploaded. Use a SAS URI with read, append, create, write access OR use managed identity to provide the VM access to the blob. Refer errorBlobManagedIdentity parameter. */
  errorBlobUri?: string;
  /** User-assigned managed identity that has access to outputBlobUri storage blob. Use an empty object in case of system-assigned identity. Make sure managed identity has been given access to blob's container with 'Storage Blob Data Contributor' role assignment. In case of user-assigned identity, make sure you add it under VM's identity. For more info on managed identity and Run Command, refer https://aka.ms/ManagedIdentity and https://aka.ms/RunCommandManaged */
  outputBlobManagedIdentity?: RunCommandManagedIdentity;
  /** User-assigned managed identity that has access to errorBlobUri storage blob. Use an empty object in case of system-assigned identity. Make sure managed identity has been given access to blob's container with 'Storage Blob Data Contributor' role assignment. In case of user-assigned identity, make sure you add it under VM's identity. For more info on managed identity and Run Command, refer https://aka.ms/ManagedIdentity and https://aka.ms/RunCommandManaged */
  errorBlobManagedIdentity?: RunCommandManagedIdentity;
  /** The provisioning state, which only appears in the response. If treatFailureAsDeploymentFailure set to true, any failure in the script will fail the deployment and ProvisioningState will be marked as Failed. If treatFailureAsDeploymentFailure set to false, ProvisioningState would only reflect whether the run command was run or not by the extensions platform, it would not indicate whether script failed in case of script failures. See instance view of run command in case of script failures to see executionMessage, output, error: https://aka.ms/runcommandmanaged#get-execution-status-and-results */
  readonly provisioningState?: string;
  /** The virtual machine run command instance view. */
  readonly instanceView?: VirtualMachineRunCommandInstanceView;
  /** Optional. If set to true, any failure in the script will fail the deployment and ProvisioningState will be marked as Failed. If set to false, ProvisioningState would only reflect whether the run command was run or not by the extensions platform, it would not indicate whether script failed in case of script failures. See instance view of run command in case of script failures to see executionMessage, output, error: https://aka.ms/runcommandmanaged#get-execution-status-and-results */
  treatFailureAsDeploymentFailure?: boolean;
}

export function virtualMachineRunCommandPropertiesSerializer(
  item: VirtualMachineRunCommandProperties,
): any {
  return {
    source: !item["source"]
      ? item["source"]
      : virtualMachineRunCommandScriptSourceSerializer(item["source"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : runCommandInputParameterArraySerializer(item["parameters"]),
    protectedParameters: !item["protectedParameters"]
      ? item["protectedParameters"]
      : runCommandInputParameterArraySerializer(item["protectedParameters"]),
    asyncExecution: item["asyncExecution"],
    runAsUser: item["runAsUser"],
    runAsPassword: item["runAsPassword"],
    timeoutInSeconds: item["timeoutInSeconds"],
    outputBlobUri: item["outputBlobUri"],
    errorBlobUri: item["errorBlobUri"],
    outputBlobManagedIdentity: !item["outputBlobManagedIdentity"]
      ? item["outputBlobManagedIdentity"]
      : runCommandManagedIdentitySerializer(item["outputBlobManagedIdentity"]),
    errorBlobManagedIdentity: !item["errorBlobManagedIdentity"]
      ? item["errorBlobManagedIdentity"]
      : runCommandManagedIdentitySerializer(item["errorBlobManagedIdentity"]),
    treatFailureAsDeploymentFailure: item["treatFailureAsDeploymentFailure"],
  };
}

export function virtualMachineRunCommandPropertiesDeserializer(
  item: any,
): VirtualMachineRunCommandProperties {
  return {
    source: !item["source"]
      ? item["source"]
      : virtualMachineRunCommandScriptSourceDeserializer(item["source"]),
    parameters: !item["parameters"]
      ? item["parameters"]
      : runCommandInputParameterArrayDeserializer(item["parameters"]),
    protectedParameters: !item["protectedParameters"]
      ? item["protectedParameters"]
      : runCommandInputParameterArrayDeserializer(item["protectedParameters"]),
    asyncExecution: item["asyncExecution"],
    runAsUser: item["runAsUser"],
    runAsPassword: item["runAsPassword"],
    timeoutInSeconds: item["timeoutInSeconds"],
    outputBlobUri: item["outputBlobUri"],
    errorBlobUri: item["errorBlobUri"],
    outputBlobManagedIdentity: !item["outputBlobManagedIdentity"]
      ? item["outputBlobManagedIdentity"]
      : runCommandManagedIdentityDeserializer(item["outputBlobManagedIdentity"]),
    errorBlobManagedIdentity: !item["errorBlobManagedIdentity"]
      ? item["errorBlobManagedIdentity"]
      : runCommandManagedIdentityDeserializer(item["errorBlobManagedIdentity"]),
    provisioningState: item["provisioningState"],
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : virtualMachineRunCommandInstanceViewDeserializer(item["instanceView"]),
    treatFailureAsDeploymentFailure: item["treatFailureAsDeploymentFailure"],
  };
}

/** Describes the script sources for run command. Use only one of these script sources: script, scriptUri, commandId, galleryScriptReferenceId. */
export interface VirtualMachineRunCommandScriptSource {
  /** Specifies the script content to be executed on the VM. */
  script?: string;
  /** Specifies the script download location. It can be either SAS URI of an Azure storage blob with read access or public URI. */
  scriptUri?: string;
  /** Specifies a commandId of predefined built-in script. Command IDs available for Linux are listed at https://aka.ms/RunCommandManagedLinux#available-commands, Windows at https://aka.ms/RunCommandManagedWindows#available-commands. */
  commandId?: string;
  /** User-assigned managed identity that has access to scriptUri in case of Azure storage blob. Use an empty object in case of system-assigned identity. Make sure the Azure storage blob exists, and managed identity has been given access to blob's container with 'Storage Blob Data Reader' role assignment. In case of user-assigned identity, make sure you add it under VM's identity. For more info on managed identity and Run Command, refer https://aka.ms/ManagedIdentity and https://aka.ms/RunCommandManaged. */
  scriptUriManagedIdentity?: RunCommandManagedIdentity;
  /** Optional. Specify which shell to use for running the script. These values must match those expected by the extension. Currently supported only for Windows VMs, script uses Powershell 7 when specified. Powershell 7 must be already installed on the machine to use Powershell7 parameter value. */
  scriptShell?: ScriptShellTypes;
  /** The resource ID of a Gallery Script version that needs to be executed. Example ID looks like /subscriptions/{subId}/resourceGroups/{rgName}/providers/Microsoft.Compute/galleries/{galleryName}/scripts/{scriptName}/versions/{version}. */
  galleryScriptReferenceId?: string;
}

export function virtualMachineRunCommandScriptSourceSerializer(
  item: VirtualMachineRunCommandScriptSource,
): any {
  return {
    script: item["script"],
    scriptUri: item["scriptUri"],
    commandId: item["commandId"],
    scriptUriManagedIdentity: !item["scriptUriManagedIdentity"]
      ? item["scriptUriManagedIdentity"]
      : runCommandManagedIdentitySerializer(item["scriptUriManagedIdentity"]),
    scriptShell: item["scriptShell"],
    galleryScriptReferenceId: item["galleryScriptReferenceId"],
  };
}

export function virtualMachineRunCommandScriptSourceDeserializer(
  item: any,
): VirtualMachineRunCommandScriptSource {
  return {
    script: item["script"],
    scriptUri: item["scriptUri"],
    commandId: item["commandId"],
    scriptUriManagedIdentity: !item["scriptUriManagedIdentity"]
      ? item["scriptUriManagedIdentity"]
      : runCommandManagedIdentityDeserializer(item["scriptUriManagedIdentity"]),
    scriptShell: item["scriptShell"],
    galleryScriptReferenceId: item["galleryScriptReferenceId"],
  };
}

/** Contains clientId or objectId (use only one, not both) of a user-assigned managed identity that has access to storage blob used in Run Command. Use an empty RunCommandManagedIdentity object in case of system-assigned identity. Make sure the Azure storage blob exists in case of scriptUri, and managed identity has been given access to blob's container with 'Storage Blob Data Reader' role assignment with scriptUri blob and 'Storage Blob Data Contributor' for Append blobs(outputBlobUri, errorBlobUri). In case of user assigned identity, make sure you add it under VM's identity. For more info on managed identity and Run Command, refer https://aka.ms/ManagedIdentity and https://aka.ms/RunCommandManaged. */
export interface RunCommandManagedIdentity {
  /** Client Id (GUID value) of the user-assigned managed identity. ObjectId should not be used if this is provided. */
  clientId?: string;
  /** Object Id (GUID value) of the user-assigned managed identity. ClientId should not be used if this is provided. */
  objectId?: string;
}

export function runCommandManagedIdentitySerializer(item: RunCommandManagedIdentity): any {
  return { clientId: item["clientId"], objectId: item["objectId"] };
}

export function runCommandManagedIdentityDeserializer(item: any): RunCommandManagedIdentity {
  return {
    clientId: item["clientId"],
    objectId: item["objectId"],
  };
}

/** Script shell types. */
export enum KnownScriptShellTypes {
  /** Default script shell type. */
  Default = "Default",
  /** Powershell7 script shell type. */
  Powershell7 = "Powershell7",
}

/**
 * Script shell types. \
 * {@link KnownScriptShellTypes} can be used interchangeably with ScriptShellTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Default script shell type. \
 * **Powershell7**: Powershell7 script shell type.
 */
export type ScriptShellTypes = string;

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

export function virtualMachineRunCommandInstanceViewDeserializer(
  item: any,
): VirtualMachineRunCommandInstanceView {
  return {
    executionState: item["executionState"],
    executionMessage: item["executionMessage"],
    exitCode: item["exitCode"],
    output: item["output"],
    error: item["error"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    statuses: !item["statuses"]
      ? item["statuses"]
      : instanceViewStatusArrayDeserializer(item["statuses"]),
  };
}

/** Script execution status. */
export enum KnownExecutionState {
  /** Unknown */
  Unknown = "Unknown",
  /** Pending */
  Pending = "Pending",
  /** Running */
  Running = "Running",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** TimedOut */
  TimedOut = "TimedOut",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Script execution status. \
 * {@link KnownExecutionState} can be used interchangeably with ExecutionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Pending** \
 * **Running** \
 * **Failed** \
 * **Succeeded** \
 * **TimedOut** \
 * **Canceled**
 */
export type ExecutionState = string;

/** Describes a Virtual Machine run command. */
export interface VirtualMachineRunCommandUpdate extends UpdateResource {
  /** Describes the properties of a Virtual Machine run command. */
  properties?: VirtualMachineRunCommandProperties;
}

export function virtualMachineRunCommandUpdateSerializer(
  item: VirtualMachineRunCommandUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineRunCommandPropertiesSerializer(item["properties"]),
  };
}

/** The List run command operation response */
export interface _VirtualMachineRunCommandsListResult {
  /** The list of run commands. */
  value: VirtualMachineRunCommand[];
  /** The uri to fetch the next page of run commands. */
  nextLink?: string;
}

export function _virtualMachineRunCommandsListResultDeserializer(
  item: any,
): _VirtualMachineRunCommandsListResult {
  return {
    value: virtualMachineRunCommandArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualMachineRunCommandArraySerializer(
  result: Array<VirtualMachineRunCommand>,
): any[] {
  return result.map((item) => {
    return virtualMachineRunCommandSerializer(item);
  });
}

export function virtualMachineRunCommandArrayDeserializer(
  result: Array<VirtualMachineRunCommand>,
): any[] {
  return result.map((item) => {
    return virtualMachineRunCommandDeserializer(item);
  });
}

/** The List Usages operation response. */
export interface _ListUsagesResult {
  /** The list of compute resource usages. */
  value: Usage[];
  /** The URI to fetch the next page of compute resource usage information. Call ListNext() with this to fetch the next page of compute resource usage information. */
  nextLink?: string;
}

export function _listUsagesResultDeserializer(item: any): _ListUsagesResult {
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

export function usageDeserializer(item: any): Usage {
  return {
    unit: item["unit"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    name: usageNameDeserializer(item["name"]),
  };
}

/** The Usage Names. */
export interface UsageName {
  /** The name of the resource. */
  value?: string;
  /** The localized name of the resource. */
  localizedValue?: string;
}

export function usageNameDeserializer(item: any): UsageName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
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

export function virtualMachineImageResourceDeserializer(item: any): VirtualMachineImageResource {
  return {
    id: item["id"],
    name: item["name"],
    location: item["location"],
    tags: item["tags"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
  };
}

/** Describes a Virtual Machine Image. */
export interface VirtualMachineImage extends VirtualMachineImageResource {
  /** Describes the properties of a Virtual Machine Image. */
  properties?: VirtualMachineImageProperties;
}

export function virtualMachineImageDeserializer(item: any): VirtualMachineImage {
  return {
    name: item["name"],
    location: item["location"],
    tags: item["tags"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineImagePropertiesDeserializer(item["properties"]),
  };
}

/** Describes the properties of a Virtual Machine Image. */
export interface VirtualMachineImageProperties {
  /** Used for establishing the purchase context of any 3rd Party artifact through MarketPlace. */
  plan?: PurchasePlan;
  /** Contains the os disk image information. */
  osDiskImage?: OSDiskImage;
  /** The list of data disk images information. */
  dataDiskImages?: DataDiskImage[];
  /** Describes automatic OS upgrade properties on the image. */
  automaticOSUpgradeProperties?: AutomaticOSUpgradeProperties;
  /** Specifies the HyperVGeneration Type */
  hyperVGeneration?: HyperVGenerationTypes;
  /** Specifies disallowed configuration for the VirtualMachine created from the image */
  disallowed?: DisallowedConfiguration;
  features?: VirtualMachineImageFeature[];
  /** Specifies the Architecture Type */
  architecture?: ArchitectureTypes;
  /** Describes image deprecation status properties on the image. */
  imageDeprecationStatus?: ImageDeprecationStatus;
}

export function virtualMachineImagePropertiesDeserializer(
  item: any,
): VirtualMachineImageProperties {
  return {
    plan: !item["plan"] ? item["plan"] : purchasePlanDeserializer(item["plan"]),
    osDiskImage: !item["osDiskImage"]
      ? item["osDiskImage"]
      : osDiskImageDeserializer(item["osDiskImage"]),
    dataDiskImages: !item["dataDiskImages"]
      ? item["dataDiskImages"]
      : dataDiskImageArrayDeserializer(item["dataDiskImages"]),
    automaticOSUpgradeProperties: !item["automaticOSUpgradeProperties"]
      ? item["automaticOSUpgradeProperties"]
      : automaticOSUpgradePropertiesDeserializer(item["automaticOSUpgradeProperties"]),
    hyperVGeneration: item["hyperVGeneration"],
    disallowed: !item["disallowed"]
      ? item["disallowed"]
      : disallowedConfigurationDeserializer(item["disallowed"]),
    features: !item["features"]
      ? item["features"]
      : virtualMachineImageFeatureArrayDeserializer(item["features"]),
    architecture: item["architecture"],
    imageDeprecationStatus: !item["imageDeprecationStatus"]
      ? item["imageDeprecationStatus"]
      : imageDeprecationStatusDeserializer(item["imageDeprecationStatus"]),
  };
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

export function purchasePlanDeserializer(item: any): PurchasePlan {
  return {
    publisher: item["publisher"],
    name: item["name"],
    product: item["product"],
  };
}

/** Contains the os disk image information. */
export interface OSDiskImage {
  /** The operating system of the osDiskImage. */
  operatingSystem: OperatingSystemTypes;
}

export function osDiskImageDeserializer(item: any): OSDiskImage {
  return {
    operatingSystem: item["operatingSystem"],
  };
}

export function dataDiskImageArrayDeserializer(result: Array<DataDiskImage>): any[] {
  return result.map((item) => {
    return dataDiskImageDeserializer(item);
  });
}

/** Contains the data disk images information. */
export interface DataDiskImage {
  /** Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. */
  readonly lun?: number;
}

export function dataDiskImageDeserializer(item: any): DataDiskImage {
  return {
    lun: item["lun"],
  };
}

/** Describes automatic OS upgrade properties on the image. */
export interface AutomaticOSUpgradeProperties {
  /** Specifies whether automatic OS upgrade is supported on the image. */
  automaticOSUpgradeSupported: boolean;
}

export function automaticOSUpgradePropertiesDeserializer(item: any): AutomaticOSUpgradeProperties {
  return {
    automaticOSUpgradeSupported: item["automaticOSUpgradeSupported"],
  };
}

/** Specifies the disallowed configuration for a virtual machine image. */
export interface DisallowedConfiguration {
  /** VM disk types which are disallowed. */
  vmDiskType?: VmDiskTypes;
}

export function disallowedConfigurationDeserializer(item: any): DisallowedConfiguration {
  return {
    vmDiskType: item["vmDiskType"],
  };
}

/** VM disk types which are disallowed. */
export enum KnownVmDiskTypes {
  /** None */
  None = "None",
  /** Unmanaged */
  Unmanaged = "Unmanaged",
}

/**
 * VM disk types which are disallowed. \
 * {@link KnownVmDiskTypes} can be used interchangeably with VmDiskTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Unmanaged**
 */
export type VmDiskTypes = string;

export function virtualMachineImageFeatureArrayDeserializer(
  result: Array<VirtualMachineImageFeature>,
): any[] {
  return result.map((item) => {
    return virtualMachineImageFeatureDeserializer(item);
  });
}

/** Specifies additional capabilities supported by the image */
export interface VirtualMachineImageFeature {
  /** The name of the feature. */
  name?: string;
  /** The corresponding value for the feature. */
  value?: string;
}

export function virtualMachineImageFeatureDeserializer(item: any): VirtualMachineImageFeature {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Specifies the Architecture Type */
export enum KnownArchitectureTypes {
  /** x64 */
  X64 = "x64",
  /** Arm64 */
  Arm64 = "Arm64",
}

/**
 * Specifies the Architecture Type \
 * {@link KnownArchitectureTypes} can be used interchangeably with ArchitectureTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **x64** \
 * **Arm64**
 */
export type ArchitectureTypes = string;

/** Describes image deprecation status properties on the image. */
export interface ImageDeprecationStatus {
  /** Describes the state of the image. */
  imageState?: ImageState;
  /** The time, in future, at which this image will be marked as deprecated. This scheduled time is chosen by the Publisher. */
  scheduledDeprecationTime?: Date;
  /** Describes the alternative option specified by the Publisher for this image when this image is deprecated. */
  alternativeOption?: AlternativeOption;
}

export function imageDeprecationStatusDeserializer(item: any): ImageDeprecationStatus {
  return {
    imageState: item["imageState"],
    scheduledDeprecationTime: !item["scheduledDeprecationTime"]
      ? item["scheduledDeprecationTime"]
      : new Date(item["scheduledDeprecationTime"]),
    alternativeOption: !item["alternativeOption"]
      ? item["alternativeOption"]
      : alternativeOptionDeserializer(item["alternativeOption"]),
  };
}

/** Describes the state of the image. */
export enum KnownImageState {
  /** Active */
  Active = "Active",
  /** ScheduledForDeprecation */
  ScheduledForDeprecation = "ScheduledForDeprecation",
  /** Deprecated */
  Deprecated = "Deprecated",
}

/**
 * Describes the state of the image. \
 * {@link KnownImageState} can be used interchangeably with ImageState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active** \
 * **ScheduledForDeprecation** \
 * **Deprecated**
 */
export type ImageState = string;

/** Describes the alternative option specified by the Publisher for this image when this image is deprecated. */
export interface AlternativeOption {
  /** Describes the type of the alternative option. */
  type?: AlternativeType;
  /** Indicates the alternative option value specified by the Publisher. This is the Offer name when the type is Offer or the Plan name when the type is Plan. */
  value?: string;
}

export function alternativeOptionDeserializer(item: any): AlternativeOption {
  return {
    type: item["type"],
    value: item["value"],
  };
}

/** Describes the type of the alternative option. */
export enum KnownAlternativeType {
  /** None */
  None = "None",
  /** Offer */
  Offer = "Offer",
  /** Plan */
  Plan = "Plan",
}

/**
 * Describes the type of the alternative option. \
 * {@link KnownAlternativeType} can be used interchangeably with AlternativeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Offer** \
 * **Plan**
 */
export type AlternativeType = string;

/** The List VmImages in EdgeZone operation response. */
export interface VmImagesInEdgeZoneListResult {
  /** The list of VMImages in EdgeZone */
  value?: VirtualMachineImageResource[];
  /** The URI to fetch the next page of VMImages in EdgeZone. Call ListNext() with this URI to fetch the next page of VmImages. */
  nextLink?: string;
}

export function vmImagesInEdgeZoneListResultDeserializer(item: any): VmImagesInEdgeZoneListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : virtualMachineImageResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualMachineImageResourceArrayDeserializer(
  result: Array<VirtualMachineImageResource>,
): any[] {
  return result.map((item) => {
    return virtualMachineImageResourceDeserializer(item);
  });
}

/** Api request input for LogAnalytics getRequestRateByInterval Api. */
export interface RequestRateByIntervalInput extends LogAnalyticsInputBase {
  /** Interval value in minutes used to create LogAnalytics call rate logs. */
  intervalLength: IntervalInMins;
}

export function requestRateByIntervalInputSerializer(item: RequestRateByIntervalInput): any {
  return {
    blobContainerSasUri: item["blobContainerSasUri"],
    fromTime: item["fromTime"].toISOString(),
    toTime: item["toTime"].toISOString(),
    groupByThrottlePolicy: item["groupByThrottlePolicy"],
    groupByOperationName: item["groupByOperationName"],
    groupByResourceName: item["groupByResourceName"],
    groupByClientApplicationId: item["groupByClientApplicationId"],
    groupByUserAgent: item["groupByUserAgent"],
    intervalLength: item["intervalLength"],
  };
}

/** Interval value in minutes used to create LogAnalytics call rate logs. */
export type IntervalInMins = "ThreeMins" | "FiveMins" | "ThirtyMins" | "SixtyMins";

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

export function logAnalyticsInputBaseSerializer(item: LogAnalyticsInputBase): any {
  return {
    blobContainerSasUri: item["blobContainerSasUri"],
    fromTime: item["fromTime"].toISOString(),
    toTime: item["toTime"].toISOString(),
    groupByThrottlePolicy: item["groupByThrottlePolicy"],
    groupByOperationName: item["groupByOperationName"],
    groupByResourceName: item["groupByResourceName"],
    groupByClientApplicationId: item["groupByClientApplicationId"],
    groupByUserAgent: item["groupByUserAgent"],
  };
}

/** Api request input for LogAnalytics getThrottledRequests Api. */
export interface ThrottledRequestsInput extends LogAnalyticsInputBase {}

export function throttledRequestsInputSerializer(item: ThrottledRequestsInput): any {
  return {
    blobContainerSasUri: item["blobContainerSasUri"],
    fromTime: item["fromTime"].toISOString(),
    toTime: item["toTime"].toISOString(),
    groupByThrottlePolicy: item["groupByThrottlePolicy"],
    groupByOperationName: item["groupByOperationName"],
    groupByResourceName: item["groupByResourceName"],
    groupByClientApplicationId: item["groupByClientApplicationId"],
    groupByUserAgent: item["groupByUserAgent"],
  };
}

/** The List Virtual Machine operation response. */
export interface _RunCommandListResult {
  /** The list of virtual machine run commands. */
  value: RunCommandDocumentBase[];
  /** The uri to fetch the next page of run commands. Call ListNext() with this to fetch the next page of run commands. */
  nextLink?: string;
}

export function _runCommandListResultDeserializer(item: any): _RunCommandListResult {
  return {
    value: runCommandDocumentBaseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function runCommandDocumentBaseArrayDeserializer(
  result: Array<RunCommandDocumentBase>,
): any[] {
  return result.map((item) => {
    return runCommandDocumentBaseDeserializer(item);
  });
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

export function runCommandDocumentBaseDeserializer(item: any): RunCommandDocumentBase {
  return {
    schema: item["$schema"],
    id: item["id"],
    osType: item["osType"],
    label: item["label"],
    description: item["description"],
  };
}

/** Describes the properties of a Run Command. */
export interface RunCommandDocument extends RunCommandDocumentBase {
  /** The script to be executed. */
  script: string[];
  /** The parameters used by the script. */
  parameters?: RunCommandParameterDefinition[];
}

export function runCommandDocumentDeserializer(item: any): RunCommandDocument {
  return {
    schema: item["$schema"],
    id: item["id"],
    osType: item["osType"],
    label: item["label"],
    description: item["description"],
    script: item["script"].map((p: any) => {
      return p;
    }),
    parameters: !item["parameters"]
      ? item["parameters"]
      : runCommandParameterDefinitionArrayDeserializer(item["parameters"]),
  };
}

export function runCommandParameterDefinitionArrayDeserializer(
  result: Array<RunCommandParameterDefinition>,
): any[] {
  return result.map((item) => {
    return runCommandParameterDefinitionDeserializer(item);
  });
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

export function runCommandParameterDefinitionDeserializer(
  item: any,
): RunCommandParameterDefinition {
  return {
    name: item["name"],
    type: item["type"],
    defaultValue: item["defaultValue"],
    required: item["required"],
  };
}

/** Known values of {@link ExpandTypesForGetVMScaleSets} that the service accepts. */
export enum KnownExpandTypesForGetVMScaleSets {
  /** userData */
  UserData = "userData",
}

/** Type of ExpandTypesForGetVMScaleSets */
export type ExpandTypesForGetVMScaleSets = string;
/** Type of InstanceViewTypes */
export type InstanceViewTypes = "instanceView" | "userData" | "resiliencyView";

/** Known values of {@link ExpandTypeForListVMs} that the service accepts. */
export enum KnownExpandTypeForListVMs {
  /** instanceView */
  InstanceView = "instanceView",
}

/** Type of ExpandTypeForListVMs */
export type ExpandTypeForListVMs = string;

/** Known values of {@link ExpandTypesForListVMs} that the service accepts. */
export enum KnownExpandTypesForListVMs {
  /** instanceView */
  InstanceView = "instanceView",
}

/** Type of ExpandTypesForListVMs */
export type ExpandTypesForListVMs = string;

/** Known values of {@link RestorePointCollectionExpandOptions} that the service accepts. */
export enum KnownRestorePointCollectionExpandOptions {
  /** restorePoints */
  RestorePoints = "restorePoints",
}

/** Type of RestorePointCollectionExpandOptions */
export type RestorePointCollectionExpandOptions = string;

/** Known values of {@link RestorePointExpandOptions} that the service accepts. */
export enum KnownRestorePointExpandOptions {
  /** instanceView */
  InstanceView = "instanceView",
}

/** Type of RestorePointExpandOptions */
export type RestorePointExpandOptions = string;

/** Known values of {@link CapacityReservationGroupInstanceViewTypes} that the service accepts. */
export enum KnownCapacityReservationGroupInstanceViewTypes {
  /** instanceView */
  InstanceView = "instanceView",
}

/** Type of CapacityReservationGroupInstanceViewTypes */
export type CapacityReservationGroupInstanceViewTypes = string;

/** Known values of {@link ExpandTypesForGetCapacityReservationGroups} that the service accepts. */
export enum KnownExpandTypesForGetCapacityReservationGroups {
  /** virtualMachineScaleSetVMs/$ref */
  VirtualMachineScaleSetVMsRef = "virtualMachineScaleSetVMs/$ref",
  /** virtualMachines/$ref */
  VirtualMachinesRef = "virtualMachines/$ref",
}

/** Type of ExpandTypesForGetCapacityReservationGroups */
export type ExpandTypesForGetCapacityReservationGroups = string;

/** Known values of {@link ResourceIdOptionsForGetCapacityReservationGroups} that the service accepts. */
export enum KnownResourceIdOptionsForGetCapacityReservationGroups {
  /** CreatedInSubscription */
  CreatedInSubscription = "CreatedInSubscription",
  /** SharedWithSubscription */
  SharedWithSubscription = "SharedWithSubscription",
  /** All */
  All = "All",
}

/** Type of ResourceIdOptionsForGetCapacityReservationGroups */
export type ResourceIdOptionsForGetCapacityReservationGroups = string;

/** Known values of {@link CapacityReservationInstanceViewTypes} that the service accepts. */
export enum KnownCapacityReservationInstanceViewTypes {
  /** instanceView */
  InstanceView = "instanceView",
}

/** Type of CapacityReservationInstanceViewTypes */
export type CapacityReservationInstanceViewTypes = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-11-01 API version. */
  V20241101 = "2024-11-01",
  /** The 2025-04-01 API version. */
  V20250401 = "2025-04-01",
}

export function virtualMachineImageArrayDeserializer(result: Array<VirtualMachineImage>): any[] {
  return result.map((item) => {
    return virtualMachineImageDeserializer(item);
  });
}

export function virtualMachineExtensionImageArrayDeserializer(
  result: Array<VirtualMachineExtensionImage>,
): any[] {
  return result.map((item) => {
    return virtualMachineExtensionImageDeserializer(item);
  });
}
