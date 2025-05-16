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
  readonly info?: Record<string, any>;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: !item["info"] ? item["info"] : _errorAdditionalInfoInfoDeserializer(item["info"]),
  };
}

/** model interface _ErrorAdditionalInfoInfo */
export interface _ErrorAdditionalInfoInfo {}

export function _errorAdditionalInfoInfoDeserializer(item: any): _ErrorAdditionalInfoInfo {
  return item;
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

export function fleetSerializer(item: Fleet): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : fleetPropertiesSerializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
  };
}

export function fleetDeserializer(item: any): Fleet {
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
      : fleetPropertiesDeserializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
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
  /** Attribute based Fleet. */
  vmAttributes?: VMAttributes;
  /** Represents the configuration for additional locations where Fleet resources may be deployed. */
  additionalLocationsProfile?: AdditionalLocationsProfile;
  /** Compute Profile to use for running user's workloads. */
  computeProfile: ComputeProfile;
  /** Specifies the time at which the Compute Fleet is created. */
  readonly timeCreated?: Date;
  /** Specifies the ID which uniquely identifies a Compute Fleet. */
  readonly uniqueId?: string;
}

export function fleetPropertiesSerializer(item: FleetProperties): any {
  return {
    spotPriorityProfile: !item["spotPriorityProfile"]
      ? item["spotPriorityProfile"]
      : spotPriorityProfileSerializer(item["spotPriorityProfile"]),
    regularPriorityProfile: !item["regularPriorityProfile"]
      ? item["regularPriorityProfile"]
      : regularPriorityProfileSerializer(item["regularPriorityProfile"]),
    vmSizesProfile: vmSizeProfileArraySerializer(item["vmSizesProfile"]),
    vmAttributes: !item["vmAttributes"]
      ? item["vmAttributes"]
      : vmAttributesSerializer(item["vmAttributes"]),
    additionalLocationsProfile: !item["additionalLocationsProfile"]
      ? item["additionalLocationsProfile"]
      : additionalLocationsProfileSerializer(item["additionalLocationsProfile"]),
    computeProfile: computeProfileSerializer(item["computeProfile"]),
  };
}

export function fleetPropertiesDeserializer(item: any): FleetProperties {
  return {
    provisioningState: item["provisioningState"],
    spotPriorityProfile: !item["spotPriorityProfile"]
      ? item["spotPriorityProfile"]
      : spotPriorityProfileDeserializer(item["spotPriorityProfile"]),
    regularPriorityProfile: !item["regularPriorityProfile"]
      ? item["regularPriorityProfile"]
      : regularPriorityProfileDeserializer(item["regularPriorityProfile"]),
    vmSizesProfile: vmSizeProfileArrayDeserializer(item["vmSizesProfile"]),
    vmAttributes: !item["vmAttributes"]
      ? item["vmAttributes"]
      : vmAttributesDeserializer(item["vmAttributes"]),
    additionalLocationsProfile: !item["additionalLocationsProfile"]
      ? item["additionalLocationsProfile"]
      : additionalLocationsProfileDeserializer(item["additionalLocationsProfile"]),
    computeProfile: computeProfileDeserializer(item["computeProfile"]),
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    uniqueId: item["uniqueId"],
  };
}

/** The status of the current operation. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Initial creation in progress. */
  Creating = "Creating",
  /** Update in progress. */
  Updating = "Updating",
  /** Deletion in progress. */
  Deleting = "Deleting",
  /** Resource is being migrated from one subscription or resource group to another. */
  Migrating = "Migrating",
}

/**
 * The status of the current operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: Initial creation in progress. \
 * **Updating**: Update in progress. \
 * **Deleting**: Deletion in progress. \
 * **Migrating**: Resource is being migrated from one subscription or resource group to another.
 */
export type ProvisioningState = string;

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

export function spotPriorityProfileSerializer(item: SpotPriorityProfile): any {
  return {
    capacity: item["capacity"],
    minCapacity: item["minCapacity"],
    maxPricePerVM: item["maxPricePerVM"],
    evictionPolicy: item["evictionPolicy"],
    allocationStrategy: item["allocationStrategy"],
    maintain: item["maintain"],
  };
}

export function spotPriorityProfileDeserializer(item: any): SpotPriorityProfile {
  return {
    capacity: item["capacity"],
    minCapacity: item["minCapacity"],
    maxPricePerVM: item["maxPricePerVM"],
    evictionPolicy: item["evictionPolicy"],
    allocationStrategy: item["allocationStrategy"],
    maintain: item["maintain"],
  };
}

/** Different kind of eviction policies */
export enum KnownEvictionPolicy {
  /** When evicted, the Spot VM will be deleted and the corresponding capacity will be updated to reflect this. */
  Delete = "Delete",
  /** When evicted, the Spot VM will be deallocated/stopped */
  Deallocate = "Deallocate",
}

/**
 * Different kind of eviction policies \
 * {@link KnownEvictionPolicy} can be used interchangeably with EvictionPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete**: When evicted, the Spot VM will be deleted and the corresponding capacity will be updated to reflect this. \
 * **Deallocate**: When evicted, the Spot VM will be deallocated\/stopped
 */
export type EvictionPolicy = string;

/** Spot allocation strategy types for Compute Fleet */
export enum KnownSpotAllocationStrategy {
  /** Default. VM sizes distribution will be determined to optimize for both price and capacity. */
  PriceCapacityOptimized = "PriceCapacityOptimized",
  /** VM sizes distribution will be determined to optimize for price. Note: Capacity will still be considered here but will be given much less weight. */
  LowestPrice = "LowestPrice",
  /** VM sizes distribution will be determined to optimize for capacity. */
  CapacityOptimized = "CapacityOptimized",
}

/**
 * Spot allocation strategy types for Compute Fleet \
 * {@link KnownSpotAllocationStrategy} can be used interchangeably with SpotAllocationStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PriceCapacityOptimized**: Default. VM sizes distribution will be determined to optimize for both price and capacity. \
 * **LowestPrice**: VM sizes distribution will be determined to optimize for price. Note: Capacity will still be considered here but will be given much less weight. \
 * **CapacityOptimized**: VM sizes distribution will be determined to optimize for capacity.
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

export function regularPriorityProfileSerializer(item: RegularPriorityProfile): any {
  return {
    capacity: item["capacity"],
    minCapacity: item["minCapacity"],
    allocationStrategy: item["allocationStrategy"],
  };
}

export function regularPriorityProfileDeserializer(item: any): RegularPriorityProfile {
  return {
    capacity: item["capacity"],
    minCapacity: item["minCapacity"],
    allocationStrategy: item["allocationStrategy"],
  };
}

/** Regular VM Allocation strategy types for Compute Fleet */
export enum KnownRegularPriorityAllocationStrategy {
  /** Default. VM sizes distribution will be determined to optimize for price. */
  LowestPrice = "LowestPrice",
  /** VM sizes distribution will be determined to optimize for the 'priority' as specified for each vm size. */
  Prioritized = "Prioritized",
}

/**
 * Regular VM Allocation strategy types for Compute Fleet \
 * {@link KnownRegularPriorityAllocationStrategy} can be used interchangeably with RegularPriorityAllocationStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LowestPrice**: Default. VM sizes distribution will be determined to optimize for price. \
 * **Prioritized**: VM sizes distribution will be determined to optimize for the 'priority' as specified for each vm size.
 */
export type RegularPriorityAllocationStrategy = string;

export function vmSizeProfileArraySerializer(result: Array<VmSizeProfile>): any[] {
  return result.map((item) => {
    return vmSizeProfileSerializer(item);
  });
}

export function vmSizeProfileArrayDeserializer(result: Array<VmSizeProfile>): any[] {
  return result.map((item) => {
    return vmSizeProfileDeserializer(item);
  });
}

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

export function vmSizeProfileSerializer(item: VmSizeProfile): any {
  return { name: item["name"], rank: item["rank"] };
}

export function vmSizeProfileDeserializer(item: any): VmSizeProfile {
  return {
    name: item["name"],
    rank: item["rank"],
  };
}

/** VMAttributes that will be used to filter VMSizes which will be used to build Fleet. */
export interface VMAttributes {
  /** The range of vCpuCount specified from Min to Max. Must be specified if VMAttributes are specified, either Min or Max is required if specified. */
  vCpuCount: VMAttributeMinMaxInteger;
  /** The range of memory specified from Min to Max. Must be specified if VMAttributes are specified, either Min or Max is required if specified. */
  memoryInGiB: VMAttributeMinMaxDouble;
  /** The range of memory in GiB per vCPU specified from min to max. Optional parameter. Either Min or Max is required if specified. */
  memoryInGiBPerVCpu?: VMAttributeMinMaxDouble;
  /**
   * Specifies whether the VMSize supporting local storage should be used to build Fleet or not.
   * Included - Default if not specified as most Azure VMs support local storage.
   */
  localStorageSupport?: VMAttributeSupport;
  /**
   * LocalStorageSupport should be set to "Included" or "Required" to use this VMAttribute.
   * If localStorageSupport is "Excluded", this VMAttribute can not be used.
   */
  localStorageInGiB?: VMAttributeMinMaxDouble;
  /**
   * The local storage disk types specified as a list. LocalStorageSupport should be set to "Included" or "Required" to use this VMAttribute.
   * If localStorageSupport is "Excluded", this VMAttribute can not be used.
   */
  localStorageDiskTypes?: LocalStorageDiskType[];
  /** The range of data disk count specified from Min to Max. Optional parameter. Either Min or Max is required if specified. */
  dataDiskCount?: VMAttributeMinMaxInteger;
  /** The range of network interface count specified from Min to Max. Optional parameter. Either Min or Max is required if specified. */
  networkInterfaceCount?: VMAttributeMinMaxInteger;
  /** The range of network bandwidth in Mbps specified from Min to Max. Optional parameter. Either Min or Max is required if specified. */
  networkBandwidthInMbps?: VMAttributeMinMaxDouble;
  /** Specifies whether the VMSize supporting RDMA (Remote Direct Memory Access) should be used to build Fleet or not. */
  rdmaSupport?: VMAttributeSupport;
  /**
   * The range of RDMA (Remote Direct Memory Access) network interface count specified from Min to Max. Optional parameter. Either Min or Max is required if specified.
   * rdmaSupport should be set to "Included" or "Required" to use this VMAttribute.
   * If rdmaSupport is "Excluded", this VMAttribute can not be used.
   */
  rdmaNetworkInterfaceCount?: VMAttributeMinMaxInteger;
  /**
   * Specifies whether the VMSize supporting accelerator should be used to build Fleet or not.
   * acceleratorSupport should be set to "Included" or "Required" to use this VMAttribute.
   * If acceleratorSupport is "Excluded", this VMAttribute can not be used.
   */
  acceleratorSupport?: VMAttributeSupport;
  /**
   * The accelerator manufacturers specified as a list.
   * acceleratorSupport should be set to "Included" or "Required" to use this VMAttribute.
   * If acceleratorSupport is "Excluded", this VMAttribute can not be used.
   */
  acceleratorManufacturers?: AcceleratorManufacturer[];
  /**
   * The accelerator types specified as a list. acceleratorSupport should be set to "Included" or "Required" to use this VMAttribute.
   * If acceleratorSupport is "Excluded", this VMAttribute can not be used.
   */
  acceleratorTypes?: AcceleratorType[];
  /**
   * The range of accelerator count specified from min to max. Optional parameter. Either Min or Max is required if specified.
   * acceleratorSupport should be set to "Included" or "Required" to use this VMAttribute.
   * If acceleratorSupport is "Excluded", this VMAttribute can not be used.
   */
  acceleratorCount?: VMAttributeMinMaxInteger;
  /** The VM category specified as a list. Optional parameter. */
  vmCategories?: VMCategory[];
  /** The VM architecture types specified as a list. Optional parameter. */
  architectureTypes?: ArchitectureType[];
  /** The VM CPU manufacturers specified as a list. Optional parameter. */
  cpuManufacturers?: CpuManufacturer[];
  /** Specifies whether the VMSize supporting burstable capability should be used to build Fleet or not. */
  burstableSupport?: VMAttributeSupport;
  /** Specifies which VMSizes should be excluded while building Fleet. Optional parameter. */
  excludedVMSizes?: string[];
}

export function vmAttributesSerializer(item: VMAttributes): any {
  return {
    vCpuCount: vmAttributeMinMaxIntegerSerializer(item["vCpuCount"]),
    memoryInGiB: vmAttributeMinMaxDoubleSerializer(item["memoryInGiB"]),
    memoryInGiBPerVCpu: !item["memoryInGiBPerVCpu"]
      ? item["memoryInGiBPerVCpu"]
      : vmAttributeMinMaxDoubleSerializer(item["memoryInGiBPerVCpu"]),
    localStorageSupport: item["localStorageSupport"],
    localStorageInGiB: !item["localStorageInGiB"]
      ? item["localStorageInGiB"]
      : vmAttributeMinMaxDoubleSerializer(item["localStorageInGiB"]),
    localStorageDiskTypes: !item["localStorageDiskTypes"]
      ? item["localStorageDiskTypes"]
      : item["localStorageDiskTypes"].map((p: any) => {
          return p;
        }),
    dataDiskCount: !item["dataDiskCount"]
      ? item["dataDiskCount"]
      : vmAttributeMinMaxIntegerSerializer(item["dataDiskCount"]),
    networkInterfaceCount: !item["networkInterfaceCount"]
      ? item["networkInterfaceCount"]
      : vmAttributeMinMaxIntegerSerializer(item["networkInterfaceCount"]),
    networkBandwidthInMbps: !item["networkBandwidthInMbps"]
      ? item["networkBandwidthInMbps"]
      : vmAttributeMinMaxDoubleSerializer(item["networkBandwidthInMbps"]),
    rdmaSupport: item["rdmaSupport"],
    rdmaNetworkInterfaceCount: !item["rdmaNetworkInterfaceCount"]
      ? item["rdmaNetworkInterfaceCount"]
      : vmAttributeMinMaxIntegerSerializer(item["rdmaNetworkInterfaceCount"]),
    acceleratorSupport: item["acceleratorSupport"],
    acceleratorManufacturers: !item["acceleratorManufacturers"]
      ? item["acceleratorManufacturers"]
      : item["acceleratorManufacturers"].map((p: any) => {
          return p;
        }),
    acceleratorTypes: !item["acceleratorTypes"]
      ? item["acceleratorTypes"]
      : item["acceleratorTypes"].map((p: any) => {
          return p;
        }),
    acceleratorCount: !item["acceleratorCount"]
      ? item["acceleratorCount"]
      : vmAttributeMinMaxIntegerSerializer(item["acceleratorCount"]),
    vmCategories: !item["vmCategories"]
      ? item["vmCategories"]
      : item["vmCategories"].map((p: any) => {
          return p;
        }),
    architectureTypes: !item["architectureTypes"]
      ? item["architectureTypes"]
      : item["architectureTypes"].map((p: any) => {
          return p;
        }),
    cpuManufacturers: !item["cpuManufacturers"]
      ? item["cpuManufacturers"]
      : item["cpuManufacturers"].map((p: any) => {
          return p;
        }),
    burstableSupport: item["burstableSupport"],
    excludedVMSizes: !item["excludedVMSizes"]
      ? item["excludedVMSizes"]
      : item["excludedVMSizes"].map((p: any) => {
          return p;
        }),
  };
}

export function vmAttributesDeserializer(item: any): VMAttributes {
  return {
    vCpuCount: vmAttributeMinMaxIntegerDeserializer(item["vCpuCount"]),
    memoryInGiB: vmAttributeMinMaxDoubleDeserializer(item["memoryInGiB"]),
    memoryInGiBPerVCpu: !item["memoryInGiBPerVCpu"]
      ? item["memoryInGiBPerVCpu"]
      : vmAttributeMinMaxDoubleDeserializer(item["memoryInGiBPerVCpu"]),
    localStorageSupport: item["localStorageSupport"],
    localStorageInGiB: !item["localStorageInGiB"]
      ? item["localStorageInGiB"]
      : vmAttributeMinMaxDoubleDeserializer(item["localStorageInGiB"]),
    localStorageDiskTypes: !item["localStorageDiskTypes"]
      ? item["localStorageDiskTypes"]
      : item["localStorageDiskTypes"].map((p: any) => {
          return p;
        }),
    dataDiskCount: !item["dataDiskCount"]
      ? item["dataDiskCount"]
      : vmAttributeMinMaxIntegerDeserializer(item["dataDiskCount"]),
    networkInterfaceCount: !item["networkInterfaceCount"]
      ? item["networkInterfaceCount"]
      : vmAttributeMinMaxIntegerDeserializer(item["networkInterfaceCount"]),
    networkBandwidthInMbps: !item["networkBandwidthInMbps"]
      ? item["networkBandwidthInMbps"]
      : vmAttributeMinMaxDoubleDeserializer(item["networkBandwidthInMbps"]),
    rdmaSupport: item["rdmaSupport"],
    rdmaNetworkInterfaceCount: !item["rdmaNetworkInterfaceCount"]
      ? item["rdmaNetworkInterfaceCount"]
      : vmAttributeMinMaxIntegerDeserializer(item["rdmaNetworkInterfaceCount"]),
    acceleratorSupport: item["acceleratorSupport"],
    acceleratorManufacturers: !item["acceleratorManufacturers"]
      ? item["acceleratorManufacturers"]
      : item["acceleratorManufacturers"].map((p: any) => {
          return p;
        }),
    acceleratorTypes: !item["acceleratorTypes"]
      ? item["acceleratorTypes"]
      : item["acceleratorTypes"].map((p: any) => {
          return p;
        }),
    acceleratorCount: !item["acceleratorCount"]
      ? item["acceleratorCount"]
      : vmAttributeMinMaxIntegerDeserializer(item["acceleratorCount"]),
    vmCategories: !item["vmCategories"]
      ? item["vmCategories"]
      : item["vmCategories"].map((p: any) => {
          return p;
        }),
    architectureTypes: !item["architectureTypes"]
      ? item["architectureTypes"]
      : item["architectureTypes"].map((p: any) => {
          return p;
        }),
    cpuManufacturers: !item["cpuManufacturers"]
      ? item["cpuManufacturers"]
      : item["cpuManufacturers"].map((p: any) => {
          return p;
        }),
    burstableSupport: item["burstableSupport"],
    excludedVMSizes: !item["excludedVMSizes"]
      ? item["excludedVMSizes"]
      : item["excludedVMSizes"].map((p: any) => {
          return p;
        }),
  };
}

/** While retrieving VMSizes from CRS, Min = 0 (uint.MinValue) if not specified, Max = 4294967295 (uint.MaxValue) if not specified. This allows to filter VMAttributes on all available VMSizes. */
export interface VMAttributeMinMaxInteger {
  /** Min VMSize from CRS, Min = 0 (uint.MinValue) if not specified. */
  min?: number;
  /** Max VMSize from CRS, Max = 4294967295 (uint.MaxValue) if not specified. */
  max?: number;
}

export function vmAttributeMinMaxIntegerSerializer(item: VMAttributeMinMaxInteger): any {
  return { min: item["min"], max: item["max"] };
}

export function vmAttributeMinMaxIntegerDeserializer(item: any): VMAttributeMinMaxInteger {
  return {
    min: item["min"],
    max: item["max"],
  };
}

/** VMAttributes using double values. */
export interface VMAttributeMinMaxDouble {
  /** Minimum value. default 0. Double.MinValue() */
  min?: number;
  /** Maximum value. Double.MaxValue(1.7976931348623157E+308) */
  max?: number;
}

export function vmAttributeMinMaxDoubleSerializer(item: VMAttributeMinMaxDouble): any {
  return { min: item["min"], max: item["max"] };
}

export function vmAttributeMinMaxDoubleDeserializer(item: any): VMAttributeMinMaxDouble {
  return {
    min: item["min"],
    max: item["max"],
  };
}

/** VMSizes supported by Azure VMs. Included is a union of Excluded and Required. */
export enum KnownVMAttributeSupport {
  /** All VMSizes having the feature support will be excluded. */
  Excluded = "Excluded",
  /**  VMSizes that have the feature support and that do not have the feature support will be used. Included is a union of Excluded and Required. */
  Included = "Included",
  /** Only the VMSizes having the feature support will be used. */
  Required = "Required",
}

/**
 * VMSizes supported by Azure VMs. Included is a union of Excluded and Required. \
 * {@link KnownVMAttributeSupport} can be used interchangeably with VMAttributeSupport,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Excluded**: All VMSizes having the feature support will be excluded. \
 * **Included**:  VMSizes that have the feature support and that do not have the feature support will be used. Included is a union of Excluded and Required. \
 * **Required**: Only the VMSizes having the feature support will be used.
 */
export type VMAttributeSupport = string;

/** Different kind of Local storage disk types supported by Azure VMs. */
export enum KnownLocalStorageDiskType {
  /** HDD DiskType. */
  HDD = "HDD",
  /** SDD DiskType. */
  SSD = "SSD",
}

/**
 * Different kind of Local storage disk types supported by Azure VMs. \
 * {@link KnownLocalStorageDiskType} can be used interchangeably with LocalStorageDiskType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HDD**: HDD DiskType. \
 * **SSD**: SDD DiskType.
 */
export type LocalStorageDiskType = string;

/** Accelerator manufacturers supported by Azure VMs. */
export enum KnownAcceleratorManufacturer {
  /** AMD GpuType */
  AMD = "AMD",
  /** Nvidia GpuType */
  Nvidia = "Nvidia",
  /** Xilinx GpuType */
  Xilinx = "Xilinx",
}

/**
 * Accelerator manufacturers supported by Azure VMs. \
 * {@link KnownAcceleratorManufacturer} can be used interchangeably with AcceleratorManufacturer,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AMD**: AMD GpuType \
 * **Nvidia**: Nvidia GpuType \
 * **Xilinx**: Xilinx GpuType
 */
export type AcceleratorManufacturer = string;

/** Accelerator types supported by Azure VMs. */
export enum KnownAcceleratorType {
  /** GPU Accelerator */
  GPU = "GPU",
  /** FPGA Accelerator */
  Fpga = "FPGA",
}

/**
 * Accelerator types supported by Azure VMs. \
 * {@link KnownAcceleratorType} can be used interchangeably with AcceleratorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GPU**: GPU Accelerator \
 * **FPGA**: FPGA Accelerator
 */
export type AcceleratorType = string;

/**
 * VMCategories defined for Azure VMs.
 * See: https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/overview?tabs=breakdownseries%2Cgeneralsizelist%2Ccomputesizelist%2Cmemorysizelist%2Cstoragesizelist%2Cgpusizelist%2Cfpgasizelist%2Chpcsizelist#general-purpose
 */
export enum KnownVMCategory {
  /** General purpose VM sizes provide balanced CPU-to-memory ratio. Ideal for testing and development, small to medium databases, and low to medium traffic web servers. */
  GeneralPurpose = "GeneralPurpose",
  /** Compute optimized VM sizes have a high CPU-to-memory ratio. These sizes are good for medium traffic web servers, network appliances, batch processes, and application servers. */
  ComputeOptimized = "ComputeOptimized",
  /** Memory optimized VM sizes offer a high memory-to-CPU ratio that is great for relational database servers, medium to large caches, and in-memory analytics. */
  MemoryOptimized = "MemoryOptimized",
  /**
   * Storage optimized virtual machine (VM) sizes offer high disk throughput and IO, and are ideal for Big Data, SQL, NoSQL databases, data warehousing, and large transactional databases.
   * Examples include Cassandra, MongoDB, Cloudera, and Redis.
   */
  StorageOptimized = "StorageOptimized",
  /**
   * GPU optimized VM sizes are specialized virtual machines available with single, multiple, or fractional GPUs.
   * These sizes are designed for compute-intensive, graphics-intensive, and visualization workloads.
   */
  GpuAccelerated = "GpuAccelerated",
  /**
   * FPGA optimized VM sizes are specialized virtual machines available with single or multiple FPGA.
   * These sizes are designed for compute-intensive workloads. This article provides information about the number and type of FPGA, vCPUs, data disks, and NICs.
   * Storage throughput and network bandwidth are also included for each size in this grouping.
   */
  FpgaAccelerated = "FpgaAccelerated",
  /**
   * Azure High Performance Compute VMs are optimized for various HPC workloads such as computational fluid dynamics, finite element analysis, frontend and backend EDA,
   * rendering, molecular dynamics, computational geo science, weather simulation, and financial risk analysis.
   */
  HighPerformanceCompute = "HighPerformanceCompute",
}

/**
 * VMCategories defined for Azure VMs.
 * See: https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/overview?tabs=breakdownseries%2Cgeneralsizelist%2Ccomputesizelist%2Cmemorysizelist%2Cstoragesizelist%2Cgpusizelist%2Cfpgasizelist%2Chpcsizelist#general-purpose \
 * {@link KnownVMCategory} can be used interchangeably with VMCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GeneralPurpose**: General purpose VM sizes provide balanced CPU-to-memory ratio. Ideal for testing and development, small to medium databases, and low to medium traffic web servers. \
 * **ComputeOptimized**: Compute optimized VM sizes have a high CPU-to-memory ratio. These sizes are good for medium traffic web servers, network appliances, batch processes, and application servers. \
 * **MemoryOptimized**: Memory optimized VM sizes offer a high memory-to-CPU ratio that is great for relational database servers, medium to large caches, and in-memory analytics. \
 * **StorageOptimized**: Storage optimized virtual machine (VM) sizes offer high disk throughput and IO, and are ideal for Big Data, SQL, NoSQL databases, data warehousing, and large transactional databases.
 * Examples include Cassandra, MongoDB, Cloudera, and Redis. \
 * **GpuAccelerated**: GPU optimized VM sizes are specialized virtual machines available with single, multiple, or fractional GPUs.
 * These sizes are designed for compute-intensive, graphics-intensive, and visualization workloads. \
 * **FpgaAccelerated**: FPGA optimized VM sizes are specialized virtual machines available with single or multiple FPGA.
 * These sizes are designed for compute-intensive workloads. This article provides information about the number and type of FPGA, vCPUs, data disks, and NICs.
 * Storage throughput and network bandwidth are also included for each size in this grouping. \
 * **HighPerformanceCompute**: Azure High Performance Compute VMs are optimized for various HPC workloads such as computational fluid dynamics, finite element analysis, frontend and backend EDA,
 * rendering, molecular dynamics, computational geo science, weather simulation, and financial risk analysis.
 */
export type VMCategory = string;

/** Architecture types supported by Azure VMs. */
export enum KnownArchitectureType {
  /** ARM64 Architecture */
  ARM64 = "ARM64",
  /** X64 Architecture */
  X64 = "X64",
}

/**
 * Architecture types supported by Azure VMs. \
 * {@link KnownArchitectureType} can be used interchangeably with ArchitectureType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ARM64**: ARM64 Architecture \
 * **X64**: X64 Architecture
 */
export type ArchitectureType = string;

/** Cpu Manufacturers  supported by Azure VMs. */
export enum KnownCpuManufacturer {
  /** Intel CPU. */
  Intel = "Intel",
  /** AMD CPU. */
  AMD = "AMD",
  /** Microsoft CPU. */
  Microsoft = "Microsoft",
  /** Ampere CPU. */
  Ampere = "Ampere",
}

/**
 * Cpu Manufacturers  supported by Azure VMs. \
 * {@link KnownCpuManufacturer} can be used interchangeably with CpuManufacturer,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Intel**: Intel CPU. \
 * **AMD**: AMD CPU. \
 * **Microsoft**: Microsoft CPU. \
 * **Ampere**: Ampere CPU.
 */
export type CpuManufacturer = string;

/** Represents the configuration for additional locations where Fleet resources may be deployed. */
export interface AdditionalLocationsProfile {
  /** The list of location profiles. */
  locationProfiles: LocationProfile[];
}

export function additionalLocationsProfileSerializer(item: AdditionalLocationsProfile): any {
  return {
    locationProfiles: locationProfileArraySerializer(item["locationProfiles"]),
  };
}

export function additionalLocationsProfileDeserializer(item: any): AdditionalLocationsProfile {
  return {
    locationProfiles: locationProfileArrayDeserializer(item["locationProfiles"]),
  };
}

export function locationProfileArraySerializer(result: Array<LocationProfile>): any[] {
  return result.map((item) => {
    return locationProfileSerializer(item);
  });
}

export function locationProfileArrayDeserializer(result: Array<LocationProfile>): any[] {
  return result.map((item) => {
    return locationProfileDeserializer(item);
  });
}

/** Represents the profile for a single additional location in the Fleet. The location and the virtualMachineProfileOverride (optional). */
export interface LocationProfile {
  /** The ARM location name of the additional region. If LocationProfile is specified, then location is required. */
  location: string;
  /**
   * An override for computeProfile.baseVirtualMachineProfile specific to this region.
   * This override is merged with the base virtual machine profile to define the final virtual machine profile for the resources deployed in this location.
   */
  virtualMachineProfileOverride?: BaseVirtualMachineProfile;
}

export function locationProfileSerializer(item: LocationProfile): any {
  return {
    location: item["location"],
    virtualMachineProfileOverride: !item["virtualMachineProfileOverride"]
      ? item["virtualMachineProfileOverride"]
      : baseVirtualMachineProfileSerializer(item["virtualMachineProfileOverride"]),
  };
}

export function locationProfileDeserializer(item: any): LocationProfile {
  return {
    location: item["location"],
    virtualMachineProfileOverride: !item["virtualMachineProfileOverride"]
      ? item["virtualMachineProfileOverride"]
      : baseVirtualMachineProfileDeserializer(item["virtualMachineProfileOverride"]),
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
  /** Specifies the boot diagnostic settings state. */
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
   * Server](https://learn.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing)
   * <br><br> [Azure Hybrid Use Benefit for Linux
   * Server](https://learn.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux)
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
   * with minimum api-version 2023-09-01. Examples: "2024-07-01T00:00:01.1234567+00:00"
   */
  readonly timeCreated?: Date;
}

export function baseVirtualMachineProfileSerializer(item: BaseVirtualMachineProfile): any {
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

export function baseVirtualMachineProfileDeserializer(item: any): BaseVirtualMachineProfile {
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
   * VM](https://learn.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp)
   * <br><br> For resetting root password, see [Manage users, SSH, and check or
   * repair disks on Azure Linux VMs using the VMAccess
   * Extension](https://learn.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection)
   */
  adminPassword?: string;
  /**
   * Specifies a base-64 encoded string of custom data. The base-64 encoded string
   * is decoded to a binary array that is saved as a file on the Virtual Machine.
   * The maximum length of the binary array is 65535 bytes. For using cloud-init for
   * your VM, see [Using cloud-init to customize a Linux VM during
   * creation](https://learn.microsoft.com/azure/virtual-machines/linux/using-cloud-init)
   */
  customData?: string;
  /** Specifies Windows operating system settings on the virtual machine. */
  windowsConfiguration?: WindowsConfiguration;
  /**
   * Specifies the Linux operating system settings on the virtual machine. For a
   * list of supported Linux distributions, see [Linux on Azure-Endorsed
   * Distributions](https://learn.microsoft.com/azure/virtual-machines/linux/endorsed-distros).
   */
  linuxConfiguration?: LinuxConfiguration;
  /**
   * Specifies set of certificates that should be installed onto the virtual
   * machines in the scale set. To install certificates on a virtual machine it is
   * recommended to use the [Azure Key Vault virtual machine extension for
   * Linux](https://learn.microsoft.com/azure/virtual-machines/extensions/key-vault-linux)
   * or the [Azure Key Vault virtual machine extension for
   * Windows](https://learn.microsoft.com/azure/virtual-machines/extensions/key-vault-windows).
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
   * [TimeZoneInfo.Id](https://learn.microsoft.com/dotnet/api/system.timezoneinfo.id?#System_TimeZoneInfo_Id)
   * value from time zones returned by
   * [TimeZoneInfo.GetSystemTimeZones](https://learn.microsoft.com/dotnet/api/system.timezoneinfo.getsystemtimezones).
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
    enableVMAgentPlatformUpdates: item["enableVMAgentPlatformUpdates"],
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

/**
 * Specifies the name of the setting to which the content applies. Possible values
 * are: FirstLogonCommands and AutoLogon.
 */
export enum KnownSettingNames {
  /** AutoLogon setting */
  AutoLogon = "AutoLogon",
  /** FirstLogonCommands setting */
  FirstLogonCommands = "FirstLogonCommands",
}

/**
 * Specifies the name of the setting to which the content applies. Possible values
 * are: FirstLogonCommands and AutoLogon. \
 * {@link KnownSettingNames} can be used interchangeably with SettingNames,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AutoLogon**: AutoLogon setting \
 * **FirstLogonCommands**: FirstLogonCommands setting
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

/**
 * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual
 * machines associated to virtual machine scale set with OrchestrationMode as
 * Flexible.
 */
export enum KnownWindowsVMGuestPatchMode {
  /**
   * You control the application of patches to a virtual machine.
   * You do this by applying patches manually inside the VM. In this mode,
   * automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates
   * must be false
   */
  Manual = "Manual",
  /**
   * The virtual machine will automatically be updated by the OS.
   * The property WindowsConfiguration.enableAutomaticUpdates must be true.
   */
  AutomaticByOS = "AutomaticByOS",
  /**
   * The virtual machine will automatically updated by the platform. The properties
   * provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true.
   */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual
 * machines associated to virtual machine scale set with OrchestrationMode as
 * Flexible. \
 * {@link KnownWindowsVMGuestPatchMode} can be used interchangeably with WindowsVMGuestPatchMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manual**: You control the application of patches to a virtual machine.
 * You do this by applying patches manually inside the VM. In this mode,
 * automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates
 * must be false \
 * **AutomaticByOS**: The virtual machine will automatically be updated by the OS.
 * The property WindowsConfiguration.enableAutomaticUpdates must be true. \
 * **AutomaticByPlatform**: The virtual machine will automatically updated by the platform. The properties
 * provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true.
 */
export type WindowsVMGuestPatchMode = string;

/** Specifies the mode of VM Guest patch assessment for the IaaS virtual machine. */
export enum KnownWindowsPatchAssessmentMode {
  /** You control the timing of patch assessments on a virtual machine. */
  ImageDefault = "ImageDefault",
  /** The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest patch assessment for the IaaS virtual machine. \
 * {@link KnownWindowsPatchAssessmentMode} can be used interchangeably with WindowsPatchAssessmentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault**: You control the timing of patch assessments on a virtual machine. \
 * **AutomaticByPlatform**: The platform will trigger periodic patch assessments. The property provisionVMAgent must be true.
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
  /** Unknown Reboot setting */
  Unknown = "Unknown",
  /** IfRequired Reboot setting */
  IfRequired = "IfRequired",
  /** Never Reboot setting */
  Never = "Never",
  /** Always Reboot setting */
  Always = "Always",
}

/**
 * Specifies the reboot setting for all AutomaticByPlatform patch installation operations. \
 * {@link KnownWindowsVMGuestPatchAutomaticByPlatformRebootSetting} can be used interchangeably with WindowsVMGuestPatchAutomaticByPlatformRebootSetting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown Reboot setting \
 * **IfRequired**: IfRequired Reboot setting \
 * **Never**: Never Reboot setting \
 * **Always**: Always Reboot setting
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
  /**
   * Specifies the protocol of WinRM listener. Possible values are: **http,**
   * **https.**
   */
  protocol?: ProtocolTypes;
  /**
   * This is the URL of a certificate that has been uploaded to Key Vault as a
   * secret. For adding a secret to the Key Vault, see [Add a key or secret to the
   * key
   * vault](https://learn.microsoft.com/azure/key-vault/key-vault-get-started/#add).
   * In this case, your certificate needs to be the Base64 encoding of the following
   * JSON Object which is encoded in UTF-8: <br><br> {<br>
   * "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>
   * "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual
   * machine it is recommended to use the [Azure Key Vault virtual machine extension
   * for
   * Linux](https://learn.microsoft.com/azure/virtual-machines/extensions/key-vault-linux)
   * or the [Azure Key Vault virtual machine extension for
   * Windows](https://learn.microsoft.com/azure/virtual-machines/extensions/key-vault-windows).
   */
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

/**
 * Specifies the protocol of WinRM listener. Possible values are: **http,**
 * **https.**
 */
export enum KnownProtocolTypes {
  /** Http protocol */
  Http = "Http",
  /** Https protocol */
  Https = "Https",
}

/**
 * Specifies the protocol of WinRM listener. Possible values are: **http,**
 * **https.** \
 * {@link KnownProtocolTypes} can be used interchangeably with ProtocolTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Http**: Http protocol \
 * **Https**: Https protocol
 */
export type ProtocolTypes = string;

/**
 * Specifies the Linux operating system settings on the virtual machine. For a
 * list of supported Linux distributions, see [Linux on Azure-Endorsed
 * Distributions](https://learn.microsoft.com/azure/virtual-machines/linux/endorsed-distros).
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
   * Azure]https://learn.microsoft.com/azure/virtual-machines/linux/create-ssh-keys-detailed).
   */
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

/**
 * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual
 * machines associated to virtual machine scale set with OrchestrationMode as
 * Flexible.
 */
export enum KnownLinuxVMGuestPatchMode {
  /** The virtual machine's default patching configuration is used. */
  ImageDefault = "ImageDefault",
  /** The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true. */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual
 * machines associated to virtual machine scale set with OrchestrationMode as
 * Flexible. \
 * {@link KnownLinuxVMGuestPatchMode} can be used interchangeably with LinuxVMGuestPatchMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault**: The virtual machine's default patching configuration is used. \
 * **AutomaticByPlatform**: The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true.
 */
export type LinuxVMGuestPatchMode = string;

/**
 * Specifies the mode of VM Guest Patch Assessment for the IaaS virtual
 * machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You
 * control the timing of patch assessments on a virtual machine. <br /><br />
 * **AutomaticByPlatform** - The platform will trigger periodic patch assessments.
 * The property provisionVMAgent must be true.
 */
export enum KnownLinuxPatchAssessmentMode {
  /** You control the timing of patch assessments on a virtual machine. */
  ImageDefault = "ImageDefault",
  /** The platform will trigger periodic patch assessments.The property provisionVMAgent must be true. */
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
 * **ImageDefault**: You control the timing of patch assessments on a virtual machine. \
 * **AutomaticByPlatform**: The platform will trigger periodic patch assessments.The property provisionVMAgent must be true.
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

/**
 * Specifies the reboot setting for all AutomaticByPlatform patch installation
 * operations.
 */
export enum KnownLinuxVMGuestPatchAutomaticByPlatformRebootSetting {
  /** Unknown Reboot setting */
  Unknown = "Unknown",
  /** IfRequired Reboot setting */
  IfRequired = "IfRequired",
  /** Never Reboot setting */
  Never = "Never",
  /** Always Reboot setting */
  Always = "Always",
}

/**
 * Specifies the reboot setting for all AutomaticByPlatform patch installation
 * operations. \
 * {@link KnownLinuxVMGuestPatchAutomaticByPlatformRebootSetting} can be used interchangeably with LinuxVMGuestPatchAutomaticByPlatformRebootSetting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown Reboot setting \
 * **IfRequired**: IfRequired Reboot setting \
 * **Never**: Never Reboot setting \
 * **Always**: Always Reboot setting
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
  /**
   * The relative URL of the Key Vault containing all of the certificates in
   * VaultCertificates.
   */
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

/** Describes SubResource */
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

/**
 * Describes a single certificate reference in a Key Vault, and where the
 * certificate should reside on the VM.
 */
export interface VaultCertificate {
  /**
   * This is the URL of a certificate that has been uploaded to Key Vault as a
   * secret. For adding a secret to the Key Vault, see [Add a key or secret to the
   * key
   * vault](https://learn.microsoft.com/azure/key-vault/key-vault-get-started/#add).
   * In this case, your certificate needs to be It is the Base64 encoding of the
   * following JSON Object which is encoded in UTF-8: <br><br> {<br>
   * "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>
   * "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual
   * machine it is recommended to use the [Azure Key Vault virtual machine extension
   * for
   * Linux](https://learn.microsoft.com/azure/virtual-machines/extensions/key-vault-linux)
   * or the [Azure Key Vault virtual machine extension for
   * Windows](https://learn.microsoft.com/azure/virtual-machines/extensions/key-vault-windows).
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
   * machines](https://learn.microsoft.com/azure/virtual-machines/managed-disks-overview).
   */
  osDisk?: VirtualMachineScaleSetOSDisk;
  /**
   * Specifies the parameters that are used to add data disks to the virtual
   * machines in the scale set. For more information about disks, see [About disks
   * and VHDs for Azure virtual
   * machines](https://learn.microsoft.com/azure/virtual-machines/managed-disks-overview).
   */
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

/** Specifies the caching requirements. */
export enum KnownCachingTypes {
  /** 'None' is default for Standard Storage */
  None = "None",
  /** 'ReadOnly' is default for Premium Storage */
  ReadOnly = "ReadOnly",
  /** 'ReadWrite' is default for OS Disk */
  ReadWrite = "ReadWrite",
}

/**
 * Specifies the caching requirements. \
 * {@link KnownCachingTypes} can be used interchangeably with CachingTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: 'None' is default for Standard Storage \
 * **ReadOnly**: 'ReadOnly' is default for Premium Storage \
 * **ReadWrite**: 'ReadWrite' is default for OS Disk
 */
export type CachingTypes = string;

/** Specifies how the virtual machine should be created. */
export enum KnownDiskCreateOptionTypes {
  /**
   * This value is used when you are using an image to create the virtual machine.
   * If you are using a platform image, you also use the imageReference element
   * described above. If you are using a marketplace image, you also use the
   * plan element previously described.
   */
  FromImage = "FromImage",
  /** This value is used when creating an empty data disk. */
  Empty = "Empty",
  /** This value is used when you are using a specialized disk to create the virtual machine. */
  Attach = "Attach",
  /** This value is used to create a data disk from a snapshot or another disk. */
  Copy = "Copy",
  /** This value is used to create a data disk from a disk restore point. */
  Restore = "Restore",
}

/**
 * Specifies how the virtual machine should be created. \
 * {@link KnownDiskCreateOptionTypes} can be used interchangeably with DiskCreateOptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FromImage**: This value is used when you are using an image to create the virtual machine.
 * If you are using a platform image, you also use the imageReference element
 * described above. If you are using a marketplace image, you also use the
 * plan element previously described. \
 * **Empty**: This value is used when creating an empty data disk. \
 * **Attach**: This value is used when you are using a specialized disk to create the virtual machine. \
 * **Copy**: This value is used to create a data disk from a snapshot or another disk. \
 * **Restore**: This value is used to create a data disk from a disk restore point.
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
   * https://learn.microsoft.com/azure/virtual-machines/windows/sizes and Linux VM at
   * https://learn.microsoft.com/azure/virtual-machines/linux/sizes to check which VM
   * sizes exposes a cache disk.
   */
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
  /** Local Option. */
  Local = "Local",
}

/**
 * Specifies the ephemeral disk option for operating system disk. \
 * {@link KnownDiffDiskOptions} can be used interchangeably with DiffDiskOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Local**: Local Option.
 */
export type DiffDiskOptions = string;

/**
 * Specifies the ephemeral disk placement for operating system disk. This property
 * can be used by user in the request to choose the location i.e, cache disk or
 * resource disk space for Ephemeral OS disk provisioning. For more information on
 * Ephemeral OS disk size requirements, please refer Ephemeral OS disk size
 * requirements for Windows VM at
 * https://learn.microsoft.com/azure/virtual-machines/windows/ephemeral-os-disks#size-requirements
 * and Linux VM at
 * https://learn.microsoft.com/azure/virtual-machines/linux/ephemeral-os-disks#size-requirements
 * Minimum api-version for NvmeDisk: 2024-03-01.
 */
export enum KnownDiffDiskPlacement {
  /** CacheDisk option. */
  CacheDisk = "CacheDisk",
  /** Resource Disk option. */
  ResourceDisk = "ResourceDisk",
  /** NvmeDisk option. */
  NvmeDisk = "NvmeDisk",
}

/**
 * Specifies the ephemeral disk placement for operating system disk. This property
 * can be used by user in the request to choose the location i.e, cache disk or
 * resource disk space for Ephemeral OS disk provisioning. For more information on
 * Ephemeral OS disk size requirements, please refer Ephemeral OS disk size
 * requirements for Windows VM at
 * https://learn.microsoft.com/azure/virtual-machines/windows/ephemeral-os-disks#size-requirements
 * and Linux VM at
 * https://learn.microsoft.com/azure/virtual-machines/linux/ephemeral-os-disks#size-requirements
 * Minimum api-version for NvmeDisk: 2024-03-01. \
 * {@link KnownDiffDiskPlacement} can be used interchangeably with DiffDiskPlacement,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CacheDisk**: CacheDisk option. \
 * **ResourceDisk**: Resource Disk option. \
 * **NvmeDisk**: NvmeDisk option.
 */
export type DiffDiskPlacement = string;

/**
 * This property allows you to specify the type of the OS that is included in the
 * disk if creating a VM from user-image or a specialized VHD. Possible values
 * are: **Windows,** **Linux.**
 */
export enum KnownOperatingSystemTypes {
  /** Windows OS type */
  Windows = "Windows",
  /** Linux OS type */
  Linux = "Linux",
}

/**
 * This property allows you to specify the type of the OS that is included in the
 * disk if creating a VM from user-image or a specialized VHD. Possible values
 * are: **Windows,** **Linux.** \
 * {@link KnownOperatingSystemTypes} can be used interchangeably with OperatingSystemTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows**: Windows OS type \
 * **Linux**: Linux OS type
 */
export type OperatingSystemTypes = string;

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

/**
 * Specifies the storage account type for the managed disk. Managed OS disk
 * storage account type can only be set when you create the scale set. NOTE:
 * UltraSSD_LRS can only be used with data disks. It cannot be used with OS Disk.
 * Standard_LRS uses Standard HDD. StandardSSD_LRS uses Standard SSD. Premium_LRS
 * uses Premium SSD. UltraSSD_LRS uses Ultra disk. Premium_ZRS uses Premium SSD
 * zone redundant storage. StandardSSD_ZRS uses Standard SSD zone redundant
 * storage. For more information regarding disks supported for Windows Virtual
 * Machines, refer to
 * https://learn.microsoft.com/azure/virtual-machines/windows/disks-types and, for
 * Linux Virtual Machines, refer to
 * https://learn.microsoft.com/azure/virtual-machines/linux/disks-types
 */
export enum KnownStorageAccountTypes {
  /** Standard_LRS option. */
  StandardLRS = "Standard_LRS",
  /** Premium_LRS option. */
  PremiumLRS = "Premium_LRS",
  /** StandardSSD_LRS option. */
  StandardSSDLRS = "StandardSSD_LRS",
  /** UltraSSD_LRS option. */
  UltraSSDLRS = "UltraSSD_LRS",
  /** Premium_ZRS option. */
  PremiumZRS = "Premium_ZRS",
  /** StandardSSD_ZRS option. */
  StandardSSDZRS = "StandardSSD_ZRS",
  /** PremiumV2_LRS option. */
  PremiumV2LRS = "PremiumV2_LRS",
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
 * https://learn.microsoft.com/azure/virtual-machines/windows/disks-types and, for
 * Linux Virtual Machines, refer to
 * https://learn.microsoft.com/azure/virtual-machines/linux/disks-types \
 * {@link KnownStorageAccountTypes} can be used interchangeably with StorageAccountTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS**: Standard_LRS option. \
 * **Premium_LRS**: Premium_LRS option. \
 * **StandardSSD_LRS**: StandardSSD_LRS option. \
 * **UltraSSD_LRS**: UltraSSD_LRS option. \
 * **Premium_ZRS**: Premium_ZRS option. \
 * **StandardSSD_ZRS**: StandardSSD_ZRS option. \
 * **PremiumV2_LRS**: PremiumV2_LRS option.
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

export function diskEncryptionSetParametersSerializer(item: DiskEncryptionSetParameters): any {
  return { id: item["id"] };
}

export function diskEncryptionSetParametersDeserializer(item: any): DiskEncryptionSetParameters {
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

/**
 * Specifies the EncryptionType of the managed disk.
 * **Note:** It can be set for only Confidential VMs.
 */
export enum KnownSecurityEncryptionTypes {
  /**
   * EncryptionType of the managed disk is set to VMGuestStateOnly for encryption
   * of just the VMGuestState blob.
   */
  VMGuestStateOnly = "VMGuestStateOnly",
  /**
   * EncryptionType of the managed disk is set to DiskWithVMGuestState for encryption
   * of the managed disk along with VMGuestState blob.
   */
  DiskWithVMGuestState = "DiskWithVMGuestState",
  /**
   * EncryptionType of the managed disk is set to NonPersistedTPM for not persisting
   * firmware state in the VMGuestState blob.
   */
  NonPersistedTPM = "NonPersistedTPM",
}

/**
 * Specifies the EncryptionType of the managed disk.
 * **Note:** It can be set for only Confidential VMs. \
 * {@link KnownSecurityEncryptionTypes} can be used interchangeably with SecurityEncryptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VMGuestStateOnly**: EncryptionType of the managed disk is set to VMGuestStateOnly for encryption
 * of just the VMGuestState blob. \
 * **DiskWithVMGuestState**: EncryptionType of the managed disk is set to DiskWithVMGuestState for encryption
 * of the managed disk along with VMGuestState blob. \
 * **NonPersistedTPM**: EncryptionType of the managed disk is set to NonPersistedTPM for not persisting
 * firmware state in the VMGuestState blob.
 */
export type SecurityEncryptionTypes = string;

/**
 * Specifies the behavior of the managed disk when the VM gets deleted, for
 * example whether the managed disk is deleted or detached. Supported values are:
 * **Delete.** If this value is used, the managed disk is deleted when VM gets
 * deleted. **Detach.** If this value is used, the managed disk is retained after
 * VM gets deleted. Minimum api-version: 2021-03-01.
 */
export enum KnownDiskDeleteOptionTypes {
  /** If this value is used, the managed disk is deleted when VM gets deleted. */
  Delete = "Delete",
  /** If this value is used, the managed disk is retained after VM gets deleted. */
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
 * **Delete**: If this value is used, the managed disk is deleted when VM gets deleted. \
 * **Detach**: If this value is used, the managed disk is retained after VM gets deleted.
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
  diskIopsReadWrite?: number;
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

/**
 * Specifies the disk controller type configured for the VM and
 * VirtualMachineScaleSet. This property is only supported for virtual machines
 * whose operating system disk and VM sku supports Generation 2
 * (https://learn.microsoft.com/en-us/azure/virtual-machines/generation-2), please
 * check the HyperVGenerations capability returned as part of VM sku capabilities
 * in the response of Microsoft.Compute SKUs api for the region contains V2
 * (https://learn.microsoft.com/rest/api/compute/resourceskus/list). For more
 * information about Disk Controller Types supported please refer to
 * https://aka.ms/azure-diskcontrollertypes.
 */
export enum KnownDiskControllerTypes {
  /** SCSI disk type */
  Scsi = "SCSI",
  /** NVMe disk type */
  NVMe = "NVMe",
}

/**
 * Specifies the disk controller type configured for the VM and
 * VirtualMachineScaleSet. This property is only supported for virtual machines
 * whose operating system disk and VM sku supports Generation 2
 * (https://learn.microsoft.com/en-us/azure/virtual-machines/generation-2), please
 * check the HyperVGenerations capability returned as part of VM sku capabilities
 * in the response of Microsoft.Compute SKUs api for the region contains V2
 * (https://learn.microsoft.com/rest/api/compute/resourceskus/list). For more
 * information about Disk Controller Types supported please refer to
 * https://aka.ms/azure-diskcontrollertypes. \
 * {@link KnownDiskControllerTypes} can be used interchangeably with DiskControllerTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SCSI**: SCSI disk type \
 * **NVMe**: NVMe disk type
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
  /**
   * The ARM resource id in the form of
   * /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/...
   */
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
}

export function virtualMachineScaleSetNetworkConfigurationSerializer(
  item: VirtualMachineScaleSetNetworkConfiguration,
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetNetworkConfigurationPropertiesSerializer(item["properties"]),
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
  /**
   * Describes a virtual machine scale set network profile's IP configuration
   * properties.
   */
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
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetPublicIPAddressConfigurationPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : publicIPAddressSkuSerializer(item["sku"]),
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

/**
 * The Domain name label scope.The concatenation of the hashed domain name label
 * that generated according to the policy from domain name label scope and vm
 * index will be the domain name labels of the PublicIPAddress resources that will
 * be created
 */
export enum KnownDomainNameLabelScopeTypes {
  /** TenantReuse type */
  TenantReuse = "TenantReuse",
  /** SubscriptionReuse type */
  SubscriptionReuse = "SubscriptionReuse",
  /** ResourceGroupReuse type */
  ResourceGroupReuse = "ResourceGroupReuse",
  /** NoReuse type */
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
 * **TenantReuse**: TenantReuse type \
 * **SubscriptionReuse**: SubscriptionReuse type \
 * **ResourceGroupReuse**: ResourceGroupReuse type \
 * **NoReuse**: NoReuse type
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

/**
 * Available from Api-Version 2017-03-30 onwards, it represents whether the
 * specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible
 * values are: 'IPv4' and 'IPv6'.
 */
export enum KnownIPVersion {
  /** IPv4 version */
  IPv4 = "IPv4",
  /** IPv6 version */
  IPv6 = "IPv6",
}

/**
 * Available from Api-Version 2017-03-30 onwards, it represents whether the
 * specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible
 * values are: 'IPv4' and 'IPv6'. \
 * {@link KnownIPVersion} can be used interchangeably with IPVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**: IPv4 version \
 * **IPv6**: IPv6 version
 */
export type IPVersion = string;

/** Specify what happens to the network interface when the VM is deleted */
export enum KnownDeleteOptions {
  /** Delete Option */
  Delete = "Delete",
  /** Detach Option */
  Detach = "Detach",
}

/**
 * Specify what happens to the network interface when the VM is deleted \
 * {@link KnownDeleteOptions} can be used interchangeably with DeleteOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete**: Delete Option \
 * **Detach**: Detach Option
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

export function publicIPAddressSkuSerializer(item: PublicIPAddressSku): any {
  return { name: item["name"], tier: item["tier"] };
}

export function publicIPAddressSkuDeserializer(item: any): PublicIPAddressSku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** Specify public IP sku name. */
export enum KnownPublicIPAddressSkuName {
  /** Basic sku name */
  Basic = "Basic",
  /** Standard sku name */
  Standard = "Standard",
}

/**
 * Specify public IP sku name. \
 * {@link KnownPublicIPAddressSkuName} can be used interchangeably with PublicIPAddressSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Basic sku name \
 * **Standard**: Standard sku name
 */
export type PublicIPAddressSkuName = string;

/** Specify public IP sku tier */
export enum KnownPublicIPAddressSkuTier {
  /** Regional sku tier */
  Regional = "Regional",
  /** Global sku tier */
  Global = "Global",
}

/**
 * Specify public IP sku tier \
 * {@link KnownPublicIPAddressSkuTier} can be used interchangeably with PublicIPAddressSkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regional**: Regional sku tier \
 * **Global**: Global sku tier
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

/**
 * Specifies whether the Auxiliary mode is enabled for the Network Interface
 * resource.
 */
export enum KnownNetworkInterfaceAuxiliaryMode {
  /** None Mode */
  None = "None",
  /** AcceleratedConnections Mode */
  AcceleratedConnections = "AcceleratedConnections",
  /** Floating Mode */
  Floating = "Floating",
}

/**
 * Specifies whether the Auxiliary mode is enabled for the Network Interface
 * resource. \
 * {@link KnownNetworkInterfaceAuxiliaryMode} can be used interchangeably with NetworkInterfaceAuxiliaryMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None Mode \
 * **AcceleratedConnections**: AcceleratedConnections Mode \
 * **Floating**: Floating Mode
 */
export type NetworkInterfaceAuxiliaryMode = string;

/**
 * Specifies whether the Auxiliary sku is enabled for the Network Interface
 * resource.
 */
export enum KnownNetworkInterfaceAuxiliarySku {
  /** no sku */
  None = "None",
  /** A1 sku */
  A1 = "A1",
  /** A2 sku */
  A2 = "A2",
  /** A4 sku */
  A4 = "A4",
  /** A8 sku */
  A8 = "A8",
}

/**
 * Specifies whether the Auxiliary sku is enabled for the Network Interface
 * resource. \
 * {@link KnownNetworkInterfaceAuxiliarySku} can be used interchangeably with NetworkInterfaceAuxiliarySku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: no sku \
 * **A1**: A1 sku \
 * **A2**: A2 sku \
 * **A4**: A4 sku \
 * **A8**: A8 sku
 */
export type NetworkInterfaceAuxiliarySku = string;

/**
 * specifies the Microsoft.Network API version used when creating networking
 * resources in the Network Interface Configurations for Virtual Machine Scale Set
 * with orchestration mode 'Flexible'
 */
export enum KnownNetworkApiVersion {
  /** Initial version supported. Later versions are supported as well. */
  V20201101 = "2020-11-01",
}

/**
 * specifies the Microsoft.Network API version used when creating networking
 * resources in the Network Interface Configurations for Virtual Machine Scale Set
 * with orchestration mode 'Flexible' \
 * {@link KnownNetworkApiVersion} can be used interchangeably with NetworkApiVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **2020-11-01**: Initial version supported. Later versions are supported as well.
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

/**
 * Specifies the SecurityType of the virtual machine. It has to be set to any
 * specified value to enable UefiSettings. The default behavior is: UefiSettings
 * will not be enabled unless this property is set.
 */
export enum KnownSecurityTypes {
  /** TrustedLaunch security type */
  TrustedLaunch = "TrustedLaunch",
  /** ConfidentialVM security type */
  ConfidentialVM = "ConfidentialVM",
}

/**
 * Specifies the SecurityType of the virtual machine. It has to be set to any
 * specified value to enable UefiSettings. The default behavior is: UefiSettings
 * will not be enabled unless this property is set. \
 * {@link KnownSecurityTypes} can be used interchangeably with SecurityTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TrustedLaunch**: TrustedLaunch security type \
 * **ConfidentialVM**: ConfidentialVM security type
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

export function proxyAgentSettingsSerializer(item: ProxyAgentSettings): any {
  return {
    enabled: item["enabled"],
    mode: item["mode"],
    keyIncarnationId: item["keyIncarnationId"],
  };
}

export function proxyAgentSettingsDeserializer(item: any): ProxyAgentSettings {
  return {
    enabled: item["enabled"],
    mode: item["mode"],
    keyIncarnationId: item["keyIncarnationId"],
  };
}

/**
 * Specifies the mode that ProxyAgent will execute on if the feature is enabled.
 * ProxyAgent will start to audit or monitor but not enforce access control over
 * requests to host endpoints in Audit mode, while in Enforce mode it will enforce
 * access control. The default value is Enforce mode.
 */
export enum KnownMode {
  /** Audit Mode */
  Audit = "Audit",
  /** Enforce Mode */
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
 * **Audit**: Audit Mode \
 * **Enforce**: Enforce Mode
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
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetExtensionPropertiesSerializer(item["properties"]),
  };
}

export function virtualMachineScaleSetExtensionDeserializer(
  item: any,
): VirtualMachineScaleSetExtension {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineScaleSetExtensionPropertiesDeserializer(item["properties"]),
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

/** Specifies Scheduled Event related configurations. */
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

export function terminateNotificationProfileSerializer(item: TerminateNotificationProfile): any {
  return { notBeforeTimeout: item["notBeforeTimeout"], enable: item["enable"] };
}

export function terminateNotificationProfileDeserializer(item: any): TerminateNotificationProfile {
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
  /**
   * Specifies the capacity reservation group resource id that should be used for
   * allocating the virtual machine or scaleset vm instances provided enough
   * capacity has been reserved. Please refer to https://aka.ms/CapacityReservation
   * for more details.
   */
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

/**
 * Contains the list of gallery applications that should be made available to the
 * VM/VMSS
 */
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
  /**
   * Specifies the properties for customizing the size of the virtual machine.
   * Minimum api-version: 2021-11-01. Please follow the instructions in [VM
   * Customization](https://aka.ms/vmcustomization) for more details.
   */
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
  /**
   * Specifies the number of vCPUs available for the VM. When this property is not
   * specified in the request body the default behavior is to set it to the value of
   * vCPUs available for that VM size exposed in api response of [List all available
   * virtual machine sizes in a
   * region](https://learn.microsoft.com/en-us/rest/api/compute/resource-skus/list).
   */
  vCPUsAvailable?: number;
  /**
   * Specifies the vCPU to physical core ratio. When this property is not specified
   * in the request body the default behavior is set to the value of vCPUsPerCore
   * for the VM Size exposed in api response of [List all available virtual machine
   * sizes in a
   * region](https://learn.microsoft.com/en-us/rest/api/compute/resource-skus/list).
   * **Setting this property to 1 also means that hyper-threading is disabled.**
   */
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

export function serviceArtifactReferenceSerializer(item: ServiceArtifactReference): any {
  return { id: item["id"] };
}

export function serviceArtifactReferenceDeserializer(item: any): ServiceArtifactReference {
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
   * List of virtual machine extension names to exclude when applying the security
   * posture.
   */
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
  /**
   * Specifies VMSS and VM API entity models support two additional capabilities as of today: ultraSSDEnabled and hibernationEnabled.
   * ultraSSDEnabled: Enables UltraSSD_LRS storage account type on the VMSS VMs.
   * hibernationEnabled: Enables the hibernation capability on the VMSS VMs.
   * Default value is null if not specified. This property cannot be updated once set.
   */
  additionalVirtualMachineCapabilities?: AdditionalCapabilities;
}

export function computeProfileSerializer(item: ComputeProfile): any {
  return {
    baseVirtualMachineProfile: baseVirtualMachineProfileSerializer(
      item["baseVirtualMachineProfile"],
    ),
    computeApiVersion: item["computeApiVersion"],
    platformFaultDomainCount: item["platformFaultDomainCount"],
    additionalVirtualMachineCapabilities: !item["additionalVirtualMachineCapabilities"]
      ? item["additionalVirtualMachineCapabilities"]
      : additionalCapabilitiesSerializer(item["additionalVirtualMachineCapabilities"]),
  };
}

export function computeProfileDeserializer(item: any): ComputeProfile {
  return {
    baseVirtualMachineProfile: baseVirtualMachineProfileDeserializer(
      item["baseVirtualMachineProfile"],
    ),
    computeApiVersion: item["computeApiVersion"],
    platformFaultDomainCount: item["platformFaultDomainCount"],
    additionalVirtualMachineCapabilities: !item["additionalVirtualMachineCapabilities"]
      ? item["additionalVirtualMachineCapabilities"]
      : additionalCapabilitiesDeserializer(item["additionalVirtualMachineCapabilities"]),
  };
}

/** AdditionalCapabilities for VM. */
export interface AdditionalCapabilities {
  /**
   * The flag that enables or disables a capability to have one or more managed data disks with UltraSSD_LRS storage account type on the VM or VMSS.
   * Managed disks with storage account type UltraSSD_LRS can be added to a virtual machine or virtual machine scale set only if this property is enabled.
   */
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

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
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
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    clientId: item["clientId"],
    principalId: item["principalId"],
  };
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

export function planSerializer(item: Plan): any {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

export function planDeserializer(item: any): Plan {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

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

export function fleetUpdateSerializer(item: FleetUpdate): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityUpdateSerializer(item["identity"]),
    plan: !item["plan"] ? item["plan"] : resourcePlanUpdateSerializer(item["plan"]),
    properties: !item["properties"]
      ? item["properties"]
      : fleetPropertiesSerializer(item["properties"]),
  };
}

/** The template for adding optional properties. */
export interface ManagedServiceIdentityUpdate {
  /** The type of managed identity assigned to this resource. */
  type?: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function managedServiceIdentityUpdateSerializer(item: ManagedServiceIdentityUpdate): any {
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
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

export function resourcePlanUpdateSerializer(item: ResourcePlanUpdate): any {
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

export function _fleetListResultDeserializer(item: any): _FleetListResult {
  return {
    value: fleetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fleetArraySerializer(result: Array<Fleet>): any[] {
  return result.map((item) => {
    return fleetSerializer(item);
  });
}

export function fleetArrayDeserializer(result: Array<Fleet>): any[] {
  return result.map((item) => {
    return fleetDeserializer(item);
  });
}

/** The response of a VirtualMachineScaleSet list operation. */
export interface _VirtualMachineScaleSetListResult {
  /** The VirtualMachineScaleSet items on this page */
  value: VirtualMachineScaleSet[];
  /** The link to the next page of items */
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

export function virtualMachineScaleSetArrayDeserializer(
  result: Array<VirtualMachineScaleSet>,
): any[] {
  return result.map((item) => {
    return virtualMachineScaleSetDeserializer(item);
  });
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

export function virtualMachineScaleSetDeserializer(item: any): VirtualMachineScaleSet {
  return {
    id: item["id"],
    type: item["type"],
    operationStatus: item["operationStatus"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
  };
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

export function apiErrorDeserializer(item: any): ApiError {
  return {
    code: item["code"],
    target: item["target"],
    message: item["message"],
    details: !item["details"] ? item["details"] : apiErrorBaseArrayDeserializer(item["details"]),
    innererror: !item["innererror"]
      ? item["innererror"]
      : innerErrorDeserializer(item["innererror"]),
  };
}

export function apiErrorBaseArrayDeserializer(result: Array<ApiErrorBase>): any[] {
  return result.map((item) => {
    return apiErrorBaseDeserializer(item);
  });
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
  exceptionType?: string;
  /** The internal error message or exception dump. */
  errorDetail?: string;
}

export function innerErrorDeserializer(item: any): InnerError {
  return {
    exceptionType: item["exceptionType"],
    errorDetail: item["errorDetail"],
  };
}

/** Api versions */
export enum KnownVersions {
  /** Public Api version */
  V20241101 = "2024-11-01",
}
