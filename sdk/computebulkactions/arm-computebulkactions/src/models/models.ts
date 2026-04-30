// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

/** Location based type. */
export interface LocationBasedLaunchBulkInstancesOperation extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: LaunchBulkInstancesOperationProperties;
  /** Zones in which the LaunchBulkInstancesOperation is available */
  zones?: string[];
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Details of the resource plan. */
  plan?: Plan;
}

export function locationBasedLaunchBulkInstancesOperationSerializer(
  item: LocationBasedLaunchBulkInstancesOperation,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : launchBulkInstancesOperationPropertiesSerializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
  };
}

export function locationBasedLaunchBulkInstancesOperationDeserializer(
  item: any,
): LocationBasedLaunchBulkInstancesOperation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : launchBulkInstancesOperationPropertiesDeserializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    plan: !item["plan"] ? item["plan"] : planDeserializer(item["plan"]),
  };
}

/** Details of the LaunchBulkInstancesOperation. */
export interface LaunchBulkInstancesOperationProperties {
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
  /** Total capacity to achieve. It can be in terms of VMs or vCPUs. */
  capacity: number;
  /** Specifies capacity type for launching instances. It can be in terms of VMs or vCPUs. */
  capacityType?: CapacityType;
  /** Configuration Options for Regular or Spot instances in LaunchBulkInstancesOperation. */
  priorityProfile: PriorityProfile;
  /** List of VM sizes supported for LaunchBulkInstancesOperation */
  vmSizesProfile?: VmSizeProfile[];
  /** Attributes to launch instances. */
  vmAttributes?: VMAttributes;
  /** Compute Profile to configure the Virtual Machines. */
  computeProfile: ComputeProfile;
  /** Zone Allocation Policy for launching instances. */
  zoneAllocationPolicy?: ZoneAllocationPolicy;
  /** Retry policy the user can pass */
  retryPolicy?: RetryPolicy;
}

export function launchBulkInstancesOperationPropertiesSerializer(
  item: LaunchBulkInstancesOperationProperties,
): any {
  return {
    capacity: item["capacity"],
    capacityType: item["capacityType"],
    priorityProfile: priorityProfileSerializer(item["priorityProfile"]),
    vmSizesProfile: !item["vmSizesProfile"]
      ? item["vmSizesProfile"]
      : vmSizeProfileArraySerializer(item["vmSizesProfile"]),
    vmAttributes: !item["vmAttributes"]
      ? item["vmAttributes"]
      : vmAttributesSerializer(item["vmAttributes"]),
    computeProfile: computeProfileSerializer(item["computeProfile"]),
    zoneAllocationPolicy: !item["zoneAllocationPolicy"]
      ? item["zoneAllocationPolicy"]
      : zoneAllocationPolicySerializer(item["zoneAllocationPolicy"]),
    retryPolicy: !item["retryPolicy"]
      ? item["retryPolicy"]
      : retryPolicySerializer(item["retryPolicy"]),
  };
}

export function launchBulkInstancesOperationPropertiesDeserializer(
  item: any,
): LaunchBulkInstancesOperationProperties {
  return {
    provisioningState: item["provisioningState"],
    capacity: item["capacity"],
    capacityType: item["capacityType"],
    priorityProfile: priorityProfileDeserializer(item["priorityProfile"]),
    vmSizesProfile: !item["vmSizesProfile"]
      ? item["vmSizesProfile"]
      : vmSizeProfileArrayDeserializer(item["vmSizesProfile"]),
    vmAttributes: !item["vmAttributes"]
      ? item["vmAttributes"]
      : vmAttributesDeserializer(item["vmAttributes"]),
    computeProfile: computeProfileDeserializer(item["computeProfile"]),
    zoneAllocationPolicy: !item["zoneAllocationPolicy"]
      ? item["zoneAllocationPolicy"]
      : zoneAllocationPolicyDeserializer(item["zoneAllocationPolicy"]),
    retryPolicy: !item["retryPolicy"]
      ? item["retryPolicy"]
      : retryPolicyDeserializer(item["retryPolicy"]),
  };
}

/** The status of the LaunchBulkInstancesOperation. */
export enum KnownProvisioningState {
  /** Initial creation in progress. */
  Creating = "Creating",
  /** The operation has completed successfully. */
  Succeeded = "Succeeded",
  /** The operation has failed. */
  Failed = "Failed",
  /** Deletion in progress. */
  Deleting = "Deleting",
  /** The operation has been canceled. */
  Canceled = "Canceled",
}

/**
 * The status of the LaunchBulkInstancesOperation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Initial creation in progress. \
 * **Succeeded**: The operation has completed successfully. \
 * **Failed**: The operation has failed. \
 * **Deleting**: Deletion in progress. \
 * **Canceled**: The operation has been canceled.
 */
export type ProvisioningState = string;

/** Capacity types for LaunchBulkInstancesOperation. */
export enum KnownCapacityType {
  /** Default. VM is the default capacity type for LaunchBulkInstancesOperation where capacity is provisioned in terms of VMs. */
  VM = "VM",
  /** VCpu is the capacity type for LaunchBulkInstancesOperation where capacity is provisioned in terms of VCpus. If VCpu capacity is not exactly divisible by VCpu count in VMSizes, capacity in VCpus will be overprovisioned by default. */
  VCpu = "VCpu",
}

/**
 * Capacity types for LaunchBulkInstancesOperation. \
 * {@link KnownCapacityType} can be used interchangeably with CapacityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VM**: Default. VM is the default capacity type for LaunchBulkInstancesOperation where capacity is provisioned in terms of VMs. \
 * **VCpu**: VCpu is the capacity type for LaunchBulkInstancesOperation where capacity is provisioned in terms of VCpus. If VCpu capacity is not exactly divisible by VCpu count in VMSizes, capacity in VCpus will be overprovisioned by default.
 */
export type CapacityType = string;

/** Contains properties that are applicable to both Spot and Regular. */
export interface PriorityProfile {
  /** Specifies the type of Virtual Machine. */
  type?: VirtualMachineType;
  /** Price per hour of each Spot VM will never exceed this. */
  maxPricePerVM?: number;
  /** Eviction Policy to follow when evicting Spot VMs. */
  evictionPolicy?: EvictionPolicy;
  /** Allocation strategy to follow when determining the VM sizes distribution. */
  allocationStrategy?: AllocationStrategy;
}

export function priorityProfileSerializer(item: PriorityProfile): any {
  return {
    type: item["type"],
    maxPricePerVM: item["maxPricePerVM"],
    evictionPolicy: item["evictionPolicy"],
    allocationStrategy: item["allocationStrategy"],
  };
}

export function priorityProfileDeserializer(item: any): PriorityProfile {
  return {
    type: item["type"],
    maxPricePerVM: item["maxPricePerVM"],
    evictionPolicy: item["evictionPolicy"],
    allocationStrategy: item["allocationStrategy"],
  };
}

/** Specifies the priority type of virtual machines to launch. */
export enum KnownVirtualMachineType {
  /** Default. Regular/On-demand VMs will be launched */
  Regular = "Regular",
  /** Spot VMs will be launched. */
  Spot = "Spot",
}

/**
 * Specifies the priority type of virtual machines to launch. \
 * {@link KnownVirtualMachineType} can be used interchangeably with VirtualMachineType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regular**: Default. Regular\/On-demand VMs will be launched \
 * **Spot**: Spot VMs will be launched.
 */
export type VirtualMachineType = string;

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

/** Allocation strategy types for LaunchBulkInstancesOperation */
export enum KnownAllocationStrategy {
  /** Default. VM sizes distribution will be determined to optimize for price. Note: Capacity will still be considered here but will be given much less weight. */
  LowestPrice = "LowestPrice",
  /** VM sizes distribution will be determined to optimize for capacity. */
  CapacityOptimized = "CapacityOptimized",
  /** VM sizes distribution will be determined to optimize for the 'rank' specified for each vm size. */
  Prioritized = "Prioritized",
}

/**
 * Allocation strategy types for LaunchBulkInstancesOperation \
 * {@link KnownAllocationStrategy} can be used interchangeably with AllocationStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LowestPrice**: Default. VM sizes distribution will be determined to optimize for price. Note: Capacity will still be considered here but will be given much less weight. \
 * **CapacityOptimized**: VM sizes distribution will be determined to optimize for capacity. \
 * **Prioritized**: VM sizes distribution will be determined to optimize for the 'rank' specified for each vm size.
 */
export type AllocationStrategy = string;

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
   * The rank of the VM size. This is used with 'AllocationStrategy.Prioritized'
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

/** VMAttributes that will be used to filter VMSizes which will be used to launch instances. */
export interface VMAttributes {
  /** The range of vCpuCount specified from Min to Max. Must be specified if VMAttributes are specified, either Min or Max is required if specified. */
  vCpuCount: VMAttributeMinMaxInteger;
  /** The range of memory specified from Min to Max. Must be specified if VMAttributes are specified, either Min or Max is required if specified. */
  memoryInGiB: VMAttributeMinMaxDouble;
  /** The VM architecture types specified as a list. Must be specified if VMAttributes are specified. Must be compatible with image used. */
  architectureTypes: ArchitectureType[];
  /** The range of memory in GiB per vCPU specified from min to max. Optional parameter. Either Min or Max is required if specified. */
  memoryInGiBPerVCpu?: VMAttributeMinMaxDouble;
  /**
   * Specifies whether the VMSize supporting local storage should be used to launch instances or not.
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
  /** Specifies whether the VMSize supporting RDMA (Remote Direct Memory Access) should be used to build launch instances or not. */
  rdmaSupport?: VMAttributeSupport;
  /**
   * The range of RDMA (Remote Direct Memory Access) network interface count specified from Min to Max. Optional parameter. Either Min or Max is required if specified.
   * rdmaSupport should be set to "Included" or "Required" to use this VMAttribute.
   * If rdmaSupport is "Excluded", this VMAttribute can not be used.
   */
  rdmaNetworkInterfaceCount?: VMAttributeMinMaxInteger;
  /**
   * Specifies whether the VMSize supporting accelerator should be used to launch instances or not.
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
  /** The VM CPU manufacturers specified as a list. Optional parameter. */
  cpuManufacturers?: CpuManufacturer[];
  /** The hyperV generations specified as a list. Optional parameter. */
  hyperVGenerations?: HyperVGeneration[];
  /** Specifies whether the VMSize supporting burstable capability should be used to launch instances or not. */
  burstableSupport?: VMAttributeSupport;
  /** Specifies which VMSizes should be allowed while filtering on VMAttributes. Cannot be specified together with excludedVMSizes. Maximum of 10 VM sizes allowed. Optional parameter. */
  allowedVMSizes?: string[];
  /** Specifies which VMSizes should be excluded while filtering on VMAttributes. Cannot be specified together with allowedVMSizes. Maximum of 10 VM sizes allowed. Optional parameter. */
  excludedVMSizes?: string[];
}

export function vmAttributesSerializer(item: VMAttributes): any {
  return {
    vCpuCount: vmAttributeMinMaxIntegerSerializer(item["vCpuCount"]),
    memoryInGiB: vmAttributeMinMaxDoubleSerializer(item["memoryInGiB"]),
    architectureTypes: item["architectureTypes"].map((p: any) => {
      return p;
    }),
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
    cpuManufacturers: !item["cpuManufacturers"]
      ? item["cpuManufacturers"]
      : item["cpuManufacturers"].map((p: any) => {
          return p;
        }),
    hyperVGenerations: !item["hyperVGenerations"]
      ? item["hyperVGenerations"]
      : item["hyperVGenerations"].map((p: any) => {
          return p;
        }),
    burstableSupport: item["burstableSupport"],
    allowedVMSizes: !item["allowedVMSizes"]
      ? item["allowedVMSizes"]
      : item["allowedVMSizes"].map((p: any) => {
          return p;
        }),
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
    architectureTypes: item["architectureTypes"].map((p: any) => {
      return p;
    }),
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
    cpuManufacturers: !item["cpuManufacturers"]
      ? item["cpuManufacturers"]
      : item["cpuManufacturers"].map((p: any) => {
          return p;
        }),
    hyperVGenerations: !item["hyperVGenerations"]
      ? item["hyperVGenerations"]
      : item["hyperVGenerations"].map((p: any) => {
          return p;
        }),
    burstableSupport: item["burstableSupport"],
    allowedVMSizes: !item["allowedVMSizes"]
      ? item["allowedVMSizes"]
      : item["allowedVMSizes"].map((p: any) => {
          return p;
        }),
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
  /** Minimum value. If not specified, no minimum filter is applied. */
  min?: number;
  /** Maximum value. Must be greater than zero. Double.MaxValue(1.7976931348623157E+308). */
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

/** Local storage disk types supported by Azure VMs. */
export enum KnownLocalStorageDiskType {
  /** HDD DiskType. */
  HDD = "HDD",
  /** SSD DiskType. */
  SSD = "SSD",
}

/**
 * Local storage disk types supported by Azure VMs. \
 * {@link KnownLocalStorageDiskType} can be used interchangeably with LocalStorageDiskType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HDD**: HDD DiskType. \
 * **SSD**: SSD DiskType.
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
 *       VMCategories defined for Azure VMs.
 *       See: https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/overview?tabs=breakdownseries%2Cgeneralsizelist%2Ccomputesizelist%2Cmemorysizelist%2Cstoragesizelist%2Cgpusizelist%2Cfpgasizelist%2Chpcsizelist#general-purpose
 */
export enum KnownVMCategory {
  /**     General purpose VM sizes provide balanced CPU-to-memory ratio. Ideal for testing and development, small to medium databases, and low to medium traffic web servers. */
  GeneralPurpose = "GeneralPurpose",
  /**     Compute optimized VM sizes have a high CPU-to-memory ratio. These sizes are good for medium traffic web servers, network appliances, batch processes, and application servers. */
  ComputeOptimized = "ComputeOptimized",
  /**     Memory optimized VM sizes offer a high memory-to-CPU ratio that is great for relational database servers, medium to large caches, and in-memory analytics. */
  MemoryOptimized = "MemoryOptimized",
  /**
   *     Storage optimized virtual machine (VM) sizes offer high disk throughput and IO, and are ideal for Big Data, SQL, NoSQL databases, data warehousing, and large transactional databases.
   *     Examples include Cassandra, MongoDB, Cloudera, and Redis.
   */
  StorageOptimized = "StorageOptimized",
  /**
   *     GPU optimized VM sizes are specialized virtual machines available with single, multiple, or fractional GPUs.
   *     These sizes are designed for compute-intensive, graphics-intensive, and visualization workloads.
   */
  GpuAccelerated = "GpuAccelerated",
  /**
   *     FPGA optimized VM sizes are specialized virtual machines available with single or multiple FPGA.
   *     These sizes are designed for compute-intensive workloads. This article provides information about the number and type of FPGA, vCPUs, data disks, and NICs.
   *     Storage throughput and network bandwidth are also included for each size in this grouping.
   */
  FpgaAccelerated = "FpgaAccelerated",
  /**
   *     Azure High Performance Compute VMs are optimized for various HPC workloads such as computational fluid dynamics, finite element analysis, frontend and backend EDA,
   *     rendering, molecular dynamics, computational geo science, weather simulation, and financial risk analysis.
   */
  HighPerformanceCompute = "HighPerformanceCompute",
}

/**
 *       VMCategories defined for Azure VMs.
 *       See: https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/overview?tabs=breakdownseries%2Cgeneralsizelist%2Ccomputesizelist%2Cmemorysizelist%2Cstoragesizelist%2Cgpusizelist%2Cfpgasizelist%2Chpcsizelist#general-purpose \
 * {@link KnownVMCategory} can be used interchangeably with VMCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GeneralPurpose**:     General purpose VM sizes provide balanced CPU-to-memory ratio. Ideal for testing and development, small to medium databases, and low to medium traffic web servers. \
 * **ComputeOptimized**:     Compute optimized VM sizes have a high CPU-to-memory ratio. These sizes are good for medium traffic web servers, network appliances, batch processes, and application servers. \
 * **MemoryOptimized**:     Memory optimized VM sizes offer a high memory-to-CPU ratio that is great for relational database servers, medium to large caches, and in-memory analytics. \
 * **StorageOptimized**:     Storage optimized virtual machine (VM) sizes offer high disk throughput and IO, and are ideal for Big Data, SQL, NoSQL databases, data warehousing, and large transactional databases.
 *     Examples include Cassandra, MongoDB, Cloudera, and Redis. \
 * **GpuAccelerated**:     GPU optimized VM sizes are specialized virtual machines available with single, multiple, or fractional GPUs.
 *     These sizes are designed for compute-intensive, graphics-intensive, and visualization workloads. \
 * **FpgaAccelerated**:     FPGA optimized VM sizes are specialized virtual machines available with single or multiple FPGA.
 *     These sizes are designed for compute-intensive workloads. This article provides information about the number and type of FPGA, vCPUs, data disks, and NICs.
 *     Storage throughput and network bandwidth are also included for each size in this grouping. \
 * **HighPerformanceCompute**:     Azure High Performance Compute VMs are optimized for various HPC workloads such as computational fluid dynamics, finite element analysis, frontend and backend EDA,
 *     rendering, molecular dynamics, computational geo science, weather simulation, and financial risk analysis.
 */
export type VMCategory = string;

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

/** HyperVGenerations supported by Azure VMs. */
export enum KnownHyperVGeneration {
  /** Gen1 hyperV. */
  Gen1 = "Gen1",
  /** Gen2 hyperV. */
  Gen2 = "Gen2",
}

/**
 * HyperVGenerations supported by Azure VMs. \
 * {@link KnownHyperVGeneration} can be used interchangeably with HyperVGeneration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Gen1**: Gen1 hyperV. \
 * **Gen2**: Gen2 hyperV.
 */
export type HyperVGeneration = string;

/** Compute Profile to configure the Virtual Machines. */
export interface ComputeProfile {
  /** Base Virtual Machine Profile Properties to be specified according to "specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/{computeApiVersion}/virtualMachine.json#/definitions/VirtualMachineProperties" */
  virtualMachineProfile: VirtualMachineProfile;
  /** Virtual Machine Extensions Array to be specified according to "specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/{computeApiVersion}/virtualMachine.json#/definitions/VirtualMachineExtension" */
  extensions?: VirtualMachineExtension[];
  /**
   * Specifies the Microsoft.Compute API version to use when creating underlying Virtual Machines.
   * The default value will be the latest supported computeApiVersion by LaunchBulkInstancesOperation.
   */
  computeApiVersion?: string;
}

export function computeProfileSerializer(item: ComputeProfile): any {
  return {
    virtualMachineProfile: virtualMachineProfileSerializer(item["virtualMachineProfile"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : virtualMachineExtensionArraySerializer(item["extensions"]),
    computeApiVersion: item["computeApiVersion"],
  };
}

export function computeProfileDeserializer(item: any): ComputeProfile {
  return {
    virtualMachineProfile: virtualMachineProfileDeserializer(item["virtualMachineProfile"]),
    extensions: !item["extensions"]
      ? item["extensions"]
      : virtualMachineExtensionArrayDeserializer(item["extensions"]),
    computeApiVersion: item["computeApiVersion"],
  };
}

/** Describes the properties of a Virtual Machine. */
export interface VirtualMachineProfile {
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
  /** Specifies the boot diagnostic settings state. Minimum compute api-version: 2015-06-15. */
  diagnosticsProfile?: DiagnosticsProfile;
  /** Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 */
  licenseType?: string;
  /** Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). Minimum compute api-version: 2020-06-01. */
  extensionsTimeBudget?: string;
  /** Specifies Scheduled Event related configurations. */
  scheduledEventsProfile?: ScheduledEventsProfile;
  /** UserData for the VM, which must be base-64 encoded. Customer should not pass any secrets in here. Minimum compute api-version: 2021-03-01. */
  userData?: string;
  /** Specifies information about the capacity reservation that is used to allocate virtual machine. Minimum compute api-version: 2021-04-01. */
  capacityReservation?: CapacityReservationProfile;
  /** Specifies the gallery applications that should be made available to the VM. */
  applicationProfile?: ApplicationProfile;
}

export function virtualMachineProfileSerializer(item: VirtualMachineProfile): any {
  return {
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
    licenseType: item["licenseType"],
    extensionsTimeBudget: item["extensionsTimeBudget"],
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

export function virtualMachineProfileDeserializer(item: any): VirtualMachineProfile {
  return {
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
    licenseType: item["licenseType"],
    extensionsTimeBudget: item["extensionsTimeBudget"],
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

/** Specifies additional publishing targets for scheduled events. */
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
  return { enable: item["enable"], scheduledEventsApiVersion: item["scheduledEventsApiVersion"] };
}

export function eventGridAndResourceGraphDeserializer(item: any): EventGridAndResourceGraph {
  return {
    enable: item["enable"],
    scheduledEventsApiVersion: item["scheduledEventsApiVersion"],
  };
}

/** Specifies if Scheduled Events should be auto-approved when all instances are down. */
export interface AllInstancesDown {
  /** Specifies if Scheduled Events should be auto-approved when all instances are down. Its default value is true. */
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
}

export function storageProfileSerializer(item: StorageProfile): any {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceSerializer(item["imageReference"]),
    osDisk: !item["osDisk"] ? item["osDisk"] : osDiskSerializer(item["osDisk"]),
    dataDisks: !item["dataDisks"] ? item["dataDisks"] : dataDiskArraySerializer(item["dataDisks"]),
    diskControllerType: item["diskControllerType"],
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
    sharedGalleryImageId: item["sharedGalleryImageId"],
    communityGalleryImageId: item["communityGalleryImageId"],
  };
}

/** Specifies information about the operating system disk used by the virtual machine. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
export interface OSDisk {
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. Possible values are: Windows, Linux. */
  osType?: OperatingSystemTypes;
  /** Specifies the encryption settings for the OS Disk. Minimum compute api-version: 2015-06-15. */
  encryptionSettings?: DiskEncryptionSettings;
  /** The disk name. */
  name?: string;
  /** The virtual hard disk. */
  vhd?: VirtualHardDisk;
  /** The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. */
  image?: VirtualHardDisk;
  /** Specifies the caching requirements. Possible values are: None, ReadOnly, ReadWrite. The defaulting behavior is: None for Standard storage. ReadOnly for Premium storage. */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies the ephemeral Disk Settings for the operating system disk used by the virtual machine. */
  diffDiskSettings?: DiffDiskSettings;
  /** Specifies how the virtual machine disk should be created. Possible values are Attach, FromImage. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described. */
  createOption: DiskCreateOptionTypes;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023. */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: ManagedDiskParameters;
  /** Specifies whether OS Disk should be deleted or detached upon VM deletion. Possible values are: Delete, Detach. The default value is set to Detach. For an ephemeral OS Disk, the default value is set to Delete. The user cannot change the delete option for an ephemeral OS Disk. */
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

/** This property allows you to specify the supported type of the OS that application is built for. Possible values are: **Windows,** **Linux.** */
export enum KnownOperatingSystemTypes {
  /** Windows OS */
  Windows = "Windows",
  /** Linux OS */
  Linux = "Linux",
}

/**
 * This property allows you to specify the supported type of the OS that application is built for. Possible values are: **Windows,** **Linux.** \
 * {@link KnownOperatingSystemTypes} can be used interchangeably with OperatingSystemTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows**: Windows OS \
 * **Linux**: Linux OS
 */
export type OperatingSystemTypes = string;

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

/** Describes a reference to Key Vault Secret */
export interface KeyVaultSecretReference {
  /** The URL referencing a secret in a Key Vault. */
  secretUrl: string;
  /** The relative URL of the Key Vault containing the secret. */
  sourceVault: SubResource;
}

export function keyVaultSecretReferenceSerializer(item: KeyVaultSecretReference): any {
  return { secretUrl: item["secretUrl"], sourceVault: subResourceSerializer(item["sourceVault"]) };
}

export function keyVaultSecretReferenceDeserializer(item: any): KeyVaultSecretReference {
  return {
    secretUrl: item["secretUrl"],
    sourceVault: subResourceDeserializer(item["sourceVault"]),
  };
}

/** Describes a reference to a sub-resource. */
export interface SubResource {
  /** The ID of the sub-resource. */
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

/** Describes a reference to Key Vault Key */
export interface KeyVaultKeyReference {
  /** The URL referencing a key encryption key in Key Vault. */
  keyUrl: string;
  /** The relative URL of the Key Vault containing the key. */
  sourceVault: SubResource;
}

export function keyVaultKeyReferenceSerializer(item: KeyVaultKeyReference): any {
  return { keyUrl: item["keyUrl"], sourceVault: subResourceSerializer(item["sourceVault"]) };
}

export function keyVaultKeyReferenceDeserializer(item: any): KeyVaultKeyReference {
  return {
    keyUrl: item["keyUrl"],
    sourceVault: subResourceDeserializer(item["sourceVault"]),
  };
}

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

/** Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The default values are: **None for Standard storage. ReadOnly for Premium storage** */
export enum KnownCachingTypes {
  /** Caching type:None */
  None = "None",
  /** Caching type:ReadOnly */
  ReadOnly = "ReadOnly",
  /** Caching type:ReadWrite */
  ReadWrite = "ReadWrite",
}

/**
 * Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The default values are: **None for Standard storage. ReadOnly for Premium storage** \
 * {@link KnownCachingTypes} can be used interchangeably with CachingTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Caching type:None \
 * **ReadOnly**: Caching type:ReadOnly \
 * **ReadWrite**: Caching type:ReadWrite
 */
export type CachingTypes = string;

/** Describes the parameters of ephemeral disk settings that can be specified for operating system disk. Note: The ephemeral disk settings can only be specified for managed disk. */
export interface DiffDiskSettings {
  /** Specifies the ephemeral disk settings for operating system disk. */
  option?: DiffDiskOptions;
  /** Specifies the ephemeral disk placement for operating system disk. Possible values are: CacheDisk, ResourceDisk, NvmeDisk. The defaulting behavior is: CacheDisk if one is configured for the VM size otherwise ResourceDisk or NvmeDisk is used. Minimum api-version for NvmeDisk: 2024-03-01. */
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
  /** Local Ephemeral disk option: Local */
  Local = "Local",
}

/**
 * Specifies the ephemeral disk option for operating system disk. \
 * {@link KnownDiffDiskOptions} can be used interchangeably with DiffDiskOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Local**: Local Ephemeral disk option: Local
 */
export type DiffDiskOptions = string;

/** Specifies the ephemeral disk placement for operating system disk. This property can be used by user in the request to choose the location i.e, cache disk, resource disk or nvme disk space for Ephemeral OS disk provisioning. For more information on Ephemeral OS disk size requirements, please refer Ephemeral OS disk size requirements for Windows VM at https://docs.microsoft.com/azure/virtual-machines/windows/ephemeral-os-disks#size-requirements and Linux VM at https://docs.microsoft.com/azure/virtual-machines/linux/ephemeral-os-disks#size-requirements. Minimum api-version for NvmeDisk: 2024-03-01. */
export enum KnownDiffDiskPlacement {
  /** CacheDisk disk placement */
  CacheDisk = "CacheDisk",
  /** ResourceDisk disk placement */
  ResourceDisk = "ResourceDisk",
  /** NvmeDisk disk placement */
  NvmeDisk = "NvmeDisk",
}

/**
 * Specifies the ephemeral disk placement for operating system disk. This property can be used by user in the request to choose the location i.e, cache disk, resource disk or nvme disk space for Ephemeral OS disk provisioning. For more information on Ephemeral OS disk size requirements, please refer Ephemeral OS disk size requirements for Windows VM at https://docs.microsoft.com/azure/virtual-machines/windows/ephemeral-os-disks#size-requirements and Linux VM at https://docs.microsoft.com/azure/virtual-machines/linux/ephemeral-os-disks#size-requirements. Minimum api-version for NvmeDisk: 2024-03-01. \
 * {@link KnownDiffDiskPlacement} can be used interchangeably with DiffDiskPlacement,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CacheDisk**: CacheDisk disk placement \
 * **ResourceDisk**: ResourceDisk disk placement \
 * **NvmeDisk**: NvmeDisk disk placement
 */
export type DiffDiskPlacement = string;

/** Specifies how the virtual machine disk should be created. Possible values are **Attach:** This value is used when you are using a specialized disk to create the virtual machine. **FromImage:** This value is used when you are using an image to create the virtual machine. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described. **Empty:** This value is used when creating an empty data disk. **Copy:** This value is used to create a data disk from a snapshot or another disk. **Restore:** This value is used to create a data disk from a disk restore point. */
export enum KnownDiskCreateOptionTypes {
  /** Create disk FromImage */
  FromImage = "FromImage",
  /** Empty value */
  Empty = "Empty",
  /** Create disk by Attach */
  Attach = "Attach",
  /** Create disk by Copy */
  Copy = "Copy",
  /** Create disk by Restore */
  Restore = "Restore",
}

/**
 * Specifies how the virtual machine disk should be created. Possible values are **Attach:** This value is used when you are using a specialized disk to create the virtual machine. **FromImage:** This value is used when you are using an image to create the virtual machine. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described. **Empty:** This value is used when creating an empty data disk. **Copy:** This value is used to create a data disk from a snapshot or another disk. **Restore:** This value is used to create a data disk from a disk restore point. \
 * {@link KnownDiskCreateOptionTypes} can be used interchangeably with DiskCreateOptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FromImage**: Create disk FromImage \
 * **Empty**: Empty value \
 * **Attach**: Create disk by Attach \
 * **Copy**: Create disk by Copy \
 * **Restore**: Create disk by Restore
 */
export type DiskCreateOptionTypes = string;

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

/** Specifies the storage account type for the managed disk. Managed OS disk storage account type can only be set when you create the scale set. NOTE: UltraSSD_LRS can only be used with data disks. It cannot be used with OS Disk. Standard_LRS uses Standard HDD. StandardSSD_LRS uses Standard SSD. Premium_LRS uses Premium SSD. UltraSSD_LRS uses Ultra disk. Premium_ZRS uses Premium SSD zone redundant storage. StandardSSD_ZRS uses Standard SSD zone redundant storage. For more information regarding disks supported for Windows Virtual Machines, refer to https://docs.microsoft.com/azure/virtual-machines/windows/disks-types and, for Linux Virtual Machines, refer to https://docs.microsoft.com/azure/virtual-machines/linux/disks-types */
export enum KnownStorageAccountTypes {
  /** Standard_LRS storage account type */
  StandardLRS = "Standard_LRS",
  /** Premium_LRS storage account type */
  PremiumLRS = "Premium_LRS",
  /** StandardSSD_LRS storage account type */
  StandardSSDLRS = "StandardSSD_LRS",
  /** UltraSSD_LRS storage account type */
  UltraSSDLRS = "UltraSSD_LRS",
  /** Premium_ZRS storage account type */
  PremiumZRS = "Premium_ZRS",
  /** StandardSSD_ZRS storage account type */
  StandardSSDZRS = "StandardSSD_ZRS",
  /** PremiumV2_LRS storage account type */
  PremiumV2LRS = "PremiumV2_LRS",
}

/**
 * Specifies the storage account type for the managed disk. Managed OS disk storage account type can only be set when you create the scale set. NOTE: UltraSSD_LRS can only be used with data disks. It cannot be used with OS Disk. Standard_LRS uses Standard HDD. StandardSSD_LRS uses Standard SSD. Premium_LRS uses Premium SSD. UltraSSD_LRS uses Ultra disk. Premium_ZRS uses Premium SSD zone redundant storage. StandardSSD_ZRS uses Standard SSD zone redundant storage. For more information regarding disks supported for Windows Virtual Machines, refer to https://docs.microsoft.com/azure/virtual-machines/windows/disks-types and, for Linux Virtual Machines, refer to https://docs.microsoft.com/azure/virtual-machines/linux/disks-types \
 * {@link KnownStorageAccountTypes} can be used interchangeably with StorageAccountTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS**: Standard_LRS storage account type \
 * **Premium_LRS**: Premium_LRS storage account type \
 * **StandardSSD_LRS**: StandardSSD_LRS storage account type \
 * **UltraSSD_LRS**: UltraSSD_LRS storage account type \
 * **Premium_ZRS**: Premium_ZRS storage account type \
 * **StandardSSD_ZRS**: StandardSSD_ZRS storage account type \
 * **PremiumV2_LRS**: PremiumV2_LRS storage account type
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
  /** VMGuestStateOnly encryption */
  VMGuestStateOnly = "VMGuestStateOnly",
  /** DiskWithVMGuestState encryption */
  DiskWithVMGuestState = "DiskWithVMGuestState",
  /** NonPersistedTPM encryption */
  NonPersistedTPM = "NonPersistedTPM",
}

/**
 * Specifies the EncryptionType of the managed disk. It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob, VMGuestStateOnly for encryption of just the VMGuestState blob, and NonPersistedTPM for not persisting firmware state in the VMGuestState blob.. **Note:** It can be set for only Confidential VMs. \
 * {@link KnownSecurityEncryptionTypes} can be used interchangeably with SecurityEncryptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VMGuestStateOnly**: VMGuestStateOnly encryption \
 * **DiskWithVMGuestState**: DiskWithVMGuestState encryption \
 * **NonPersistedTPM**: NonPersistedTPM encryption
 */
export type SecurityEncryptionTypes = string;

/** Specifies the behavior of the managed disk when the VM gets deleted, for example whether the managed disk is deleted or detached. Supported values are: **Delete.** If this value is used, the managed disk is deleted when VM gets deleted. **Detach.** If this value is used, the managed disk is retained after VM gets deleted. Minimum api-version: 2021-03-01. */
export enum KnownDiskDeleteOptionTypes {
  /** Delete the disk upon VM deletion */
  Delete = "Delete",
  /** Detach the disk upon VM deletion */
  Detach = "Detach",
}

/**
 * Specifies the behavior of the managed disk when the VM gets deleted, for example whether the managed disk is deleted or detached. Supported values are: **Delete.** If this value is used, the managed disk is deleted when VM gets deleted. **Detach.** If this value is used, the managed disk is retained after VM gets deleted. Minimum api-version: 2021-03-01. \
 * {@link KnownDiskDeleteOptionTypes} can be used interchangeably with DiskDeleteOptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete**: Delete the disk upon VM deletion \
 * **Detach**: Detach the disk upon VM deletion
 */
export type DiskDeleteOptionTypes = string;

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
  /** Specifies the caching requirements. Possible values are: None, ReadOnly, ReadWrite. The defaulting behavior is: None for Standard storage. ReadOnly for Premium storage. */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies how the virtual machine disk should be created. Possible values are Attach, FromImage, Empty, Copy, Restore. */
  createOption: DiskCreateOptionTypes;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023. */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: ManagedDiskParameters;
  /** The source resource identifier. It can be a snapshot, or disk restore point from which to create a disk. */
  sourceResource?: ApiEntityReference;
  /** Specifies whether the data disk is in process of detachment from the VirtualMachine/VirtualMachineScaleset. */
  toBeDetached?: boolean;
  /** Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values: ForceDetach. This feature is still in preview. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'. */
  detachOption?: DiskDetachOptionTypes;
  /** Specifies whether data disk should be deleted or detached upon VM deletion. Possible values are: Delete, Detach. The default value is set to Detach. */
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
    detachOption: item["detachOption"],
    deleteOption: item["deleteOption"],
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

/** Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values are: **ForceDetach.** detachOption: **ForceDetach** is applicable only for managed data disks. If a previous detachment attempt of the data disk did not complete due to an unexpected failure from the virtual machine and the disk is still not released then use force-detach as a last resort option to detach the disk forcibly from the VM. All writes might not have been flushed when using this detach behavior. **This feature is still in preview**. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'. */
export enum KnownDiskDetachOptionTypes {
  /** ForceDetach the disk */
  ForceDetach = "ForceDetach",
}

/**
 * Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values are: **ForceDetach.** detachOption: **ForceDetach** is applicable only for managed data disks. If a previous detachment attempt of the data disk did not complete due to an unexpected failure from the virtual machine and the disk is still not released then use force-detach as a last resort option to detach the disk forcibly from the VM. All writes might not have been flushed when using this detach behavior. **This feature is still in preview**. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'. \
 * {@link KnownDiskDetachOptionTypes} can be used interchangeably with DiskDetachOptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ForceDetach**: ForceDetach the disk
 */
export type DiskDetachOptionTypes = string;

/** Specifies the disk controller type configured for the VM and VirtualMachineScaleSet. This property is only supported for virtual machines whose operating system disk and VM sku supports Generation 2 (https://docs.microsoft.com/en-us/azure/virtual-machines/generation-2), please check the HyperVGenerations capability returned as part of VM sku capabilities in the response of Microsoft.Compute SKUs api for the region contains V2 (https://docs.microsoft.com/rest/api/compute/resourceskus/list). For more information about Disk Controller Types supported please refer to https://aka.ms/azure-diskcontrollertypes. */
export enum KnownDiskControllerTypes {
  /** SCSI disk controller type */
  Scsi = "SCSI",
  /** NVMe disk controller type */
  NVMe = "NVMe",
}

/**
 * Specifies the disk controller type configured for the VM and VirtualMachineScaleSet. This property is only supported for virtual machines whose operating system disk and VM sku supports Generation 2 (https://docs.microsoft.com/en-us/azure/virtual-machines/generation-2), please check the HyperVGenerations capability returned as part of VM sku capabilities in the response of Microsoft.Compute SKUs api for the region contains V2 (https://docs.microsoft.com/rest/api/compute/resourceskus/list). For more information about Disk Controller Types supported please refer to https://aka.ms/azure-diskcontrollertypes. \
 * {@link KnownDiskControllerTypes} can be used interchangeably with DiskControllerTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SCSI**: SCSI disk controller type \
 * **NVMe**: NVMe disk controller type
 */
export type DiskControllerTypes = string;

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
  passName?: "OobeSystem";
  /** The component name. Currently, the only allowable value is Microsoft-Windows-Shell-Setup. */
  componentName?: "Microsoft-Windows-Shell-Setup";
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

/** Specifies the name of the setting to which the content applies. Possible values are: FirstLogonCommands and AutoLogon. */
export enum KnownSettingNames {
  /** AutoLogon mode */
  AutoLogon = "AutoLogon",
  /** FirstLogonCommands mode */
  FirstLogonCommands = "FirstLogonCommands",
}

/**
 * Specifies the name of the setting to which the content applies. Possible values are: FirstLogonCommands and AutoLogon. \
 * {@link KnownSettingNames} can be used interchangeably with SettingNames,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AutoLogon**: AutoLogon mode \
 * **FirstLogonCommands**: FirstLogonCommands mode
 */
export type SettingNames = string;

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
  /** Manual VM guest patch mode */
  Manual = "Manual",
  /** AutomaticByOS VM guest patch mode */
  AutomaticByOS = "AutomaticByOS",
  /** AutomaticByPlatform VM guest patch mode */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of patches to a virtual machine. You do this by applying patches manually inside the VM. In this mode, automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates must be false<br /><br /> **AutomaticByOS** - The virtual machine will automatically be updated by the OS. The property WindowsConfiguration.enableAutomaticUpdates must be true. <br /><br /> **AutomaticByPlatform** - the virtual machine will automatically updated by the platform. The properties provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true \
 * {@link KnownWindowsVMGuestPatchMode} can be used interchangeably with WindowsVMGuestPatchMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manual**: Manual VM guest patch mode \
 * **AutomaticByOS**: AutomaticByOS VM guest patch mode \
 * **AutomaticByPlatform**: AutomaticByPlatform VM guest patch mode
 */
export type WindowsVMGuestPatchMode = string;

/** Specifies the mode of VM Guest patch assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine.<br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
export enum KnownWindowsPatchAssessmentMode {
  /** ImageDefault patch assessment mode */
  ImageDefault = "ImageDefault",
  /** AutomaticByPlatform patch assessment mode */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest patch assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine.<br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. \
 * {@link KnownWindowsPatchAssessmentMode} can be used interchangeably with WindowsPatchAssessmentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault**: ImageDefault patch assessment mode \
 * **AutomaticByPlatform**: AutomaticByPlatform patch assessment mode
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
  /** Reboot setting for Unknown */
  Unknown = "Unknown",
  /** Reboot setting for IfRequired */
  IfRequired = "IfRequired",
  /** Reboot setting for Never */
  Never = "Never",
  /** Reboot setting for Always */
  Always = "Always",
}

/**
 * Specifies the reboot setting for all AutomaticByPlatform patch installation operations. \
 * {@link KnownWindowsVMGuestPatchAutomaticByPlatformRebootSetting} can be used interchangeably with WindowsVMGuestPatchAutomaticByPlatformRebootSetting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Reboot setting for Unknown \
 * **IfRequired**: Reboot setting for IfRequired \
 * **Never**: Reboot setting for Never \
 * **Always**: Reboot setting for Always
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
export enum KnownProtocolTypes {
  /** Http protocol */
  Http = "Http",
  /** Https protocol */
  Https = "Https",
}

/**
 * Specifies the protocol of WinRM listener. Possible values are: **http,** **https.** \
 * {@link KnownProtocolTypes} can be used interchangeably with ProtocolTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Http**: Http protocol \
 * **Https**: Https protocol
 */
export type ProtocolTypes = string;

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
  /** ImageDefault linux VM guest patch mode */
  ImageDefault = "ImageDefault",
  /** AutomaticByPlatform linux VM guest patch mode */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - The virtual machine's default patching configuration is used. <br /><br /> **AutomaticByPlatform** - The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true \
 * {@link KnownLinuxVMGuestPatchMode} can be used interchangeably with LinuxVMGuestPatchMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault**: ImageDefault linux VM guest patch mode \
 * **AutomaticByPlatform**: AutomaticByPlatform linux VM guest patch mode
 */
export type LinuxVMGuestPatchMode = string;

/** Specifies the mode of VM Guest Patch Assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine. <br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
export enum KnownLinuxPatchAssessmentMode {
  /** ImageDefault mode */
  ImageDefault = "ImageDefault",
  /** AutomaticByPlatform mode */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest Patch Assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine. <br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. \
 * {@link KnownLinuxPatchAssessmentMode} can be used interchangeably with LinuxPatchAssessmentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault**: ImageDefault mode \
 * **AutomaticByPlatform**: AutomaticByPlatform mode
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
  /** Unknown reboot setting */
  Unknown = "Unknown",
  /** Reboot if required */
  IfRequired = "IfRequired",
  /** Never reboot */
  Never = "Never",
  /** Always reboot */
  Always = "Always",
}

/**
 * Specifies the reboot setting for all AutomaticByPlatform patch installation operations. \
 * {@link KnownLinuxVMGuestPatchAutomaticByPlatformRebootSetting} can be used interchangeably with LinuxVMGuestPatchAutomaticByPlatformRebootSetting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown reboot setting \
 * **IfRequired**: Reboot if required \
 * **Never**: Never reboot \
 * **Always**: Always reboot
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
  /** This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be It is the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  'data':'<Base64-encoded-certificate>',<br>  'dataType':'pfx',<br>  'password':'<pfx-file-password>'<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  certificateUrl?: string;
  /** For Windows VMs, specifies the certificate store on the Virtual Machine to which the certificate should be added. The specified certificate store is implicitly in the LocalMachine account. For Linux VMs, the certificate file is placed under the /var/lib/waagent directory, with the file name <UppercaseThumbprint>.crt for the X509 certificate file and <UppercaseThumbprint>.prv for private key. Both of these files are .pem formatted. */
  certificateStore?: string;
}

export function vaultCertificateSerializer(item: VaultCertificate): any {
  return { certificateUrl: item["certificateUrl"], certificateStore: item["certificateStore"] };
}

export function vaultCertificateDeserializer(item: any): VaultCertificate {
  return {
    certificateUrl: item["certificateUrl"],
    certificateStore: item["certificateStore"],
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

/** Specify what happens to the network interface when the VM is deleted */
export enum KnownDeleteOptions {
  /** Delete network interface when the VM is deleted */
  Delete = "Delete",
  /** Detach network interface when the VM is deleted */
  Detach = "Detach",
}

/**
 * Specify what happens to the network interface when the VM is deleted \
 * {@link KnownDeleteOptions} can be used interchangeably with DeleteOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete**: Delete network interface when the VM is deleted \
 * **Detach**: Detach network interface when the VM is deleted
 */
export type DeleteOptions = string;

/** Specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations */
export enum KnownNetworkApiVersion {
  /** 2020-11-01 version */
  _20201101 = "2020-11-01",
  /** 2022-11-01 version */
  _20221101 = "2022-11-01",
}

/**
 * Specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations \
 * {@link KnownNetworkApiVersion} can be used interchangeably with NetworkApiVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **2020-11-01**: 2020-11-01 version \
 * **2022-11-01**: 2022-11-01 version
 */
export type NetworkApiVersion = string;

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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
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
  /** The DSCP configuration for the network interface. */
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
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

/** The Domain name label scope.The concatenation of the hashed domain name label that generated according to the policy from domain name label scope and vm index will be the domain name labels of the PublicIPAddress resources that will be created */
export enum KnownDomainNameLabelScopeTypes {
  /** TenantReuse scope type */
  TenantReuse = "TenantReuse",
  /** SubscriptionReuse scope type */
  SubscriptionReuse = "SubscriptionReuse",
  /** ResourceGroupReuse scope type */
  ResourceGroupReuse = "ResourceGroupReuse",
  /** NoReuse scope type */
  NoReuse = "NoReuse",
}

/**
 * The Domain name label scope.The concatenation of the hashed domain name label that generated according to the policy from domain name label scope and vm index will be the domain name labels of the PublicIPAddress resources that will be created \
 * {@link KnownDomainNameLabelScopeTypes} can be used interchangeably with DomainNameLabelScopeTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TenantReuse**: TenantReuse scope type \
 * **SubscriptionReuse**: SubscriptionReuse scope type \
 * **ResourceGroupReuse**: ResourceGroupReuse scope type \
 * **NoReuse**: NoReuse scope type
 */
export type DomainNameLabelScopeTypes = string;

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

/** Available from compute Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'. */
export enum KnownIPVersions {
  /** IPv4 version */
  IPv4 = "IPv4",
  /** IPv6 version */
  IPv6 = "IPv6",
}

/**
 * Available from compute Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'. \
 * {@link KnownIPVersions} can be used interchangeably with IPVersions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**: IPv4 version \
 * **IPv6**: IPv6 version
 */
export type IPVersions = string;

/** Specify the public IP allocation type */
export enum KnownPublicIPAllocationMethod {
  /** Dynamic IP allocation */
  Dynamic = "Dynamic",
  /** Static IP allocation */
  Static = "Static",
}

/**
 * Specify the public IP allocation type \
 * {@link KnownPublicIPAllocationMethod} can be used interchangeably with PublicIPAllocationMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Dynamic**: Dynamic IP allocation \
 * **Static**: Static IP allocation
 */
export type PublicIPAllocationMethod = string;

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
  /** Basic IP sku name */
  Basic = "Basic",
  /** Standard IP sku name */
  Standard = "Standard",
}

/**
 * Specify public IP sku name \
 * {@link KnownPublicIPAddressSkuName} can be used interchangeably with PublicIPAddressSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Basic IP sku name \
 * **Standard**: Standard IP sku name
 */
export type PublicIPAddressSkuName = string;

/** Specify public IP sku tier */
export enum KnownPublicIPAddressSkuTier {
  /** Regional IP address sku tier */
  Regional = "Regional",
  /** Global IP address sku tier */
  Global = "Global",
}

/**
 * Specify public IP sku tier \
 * {@link KnownPublicIPAddressSkuTier} can be used interchangeably with PublicIPAddressSkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regional**: Regional IP address sku tier \
 * **Global**: Global IP address sku tier
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
  /** None mode */
  None = "None",
  /** AcceleratedConnections mode */
  AcceleratedConnections = "AcceleratedConnections",
  /** Floating mode */
  Floating = "Floating",
}

/**
 * Specifies whether the Auxiliary mode is enabled for the Network Interface resource. \
 * {@link KnownNetworkInterfaceAuxiliaryMode} can be used interchangeably with NetworkInterfaceAuxiliaryMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None mode \
 * **AcceleratedConnections**: AcceleratedConnections mode \
 * **Floating**: Floating mode
 */
export type NetworkInterfaceAuxiliaryMode = string;

/** Specifies whether the Auxiliary sku is enabled for the Network Interface resource. */
export enum KnownNetworkInterfaceAuxiliarySku {
  /** None: None sku */
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
 * Specifies whether the Auxiliary sku is enabled for the Network Interface resource. \
 * {@link KnownNetworkInterfaceAuxiliarySku} can be used interchangeably with NetworkInterfaceAuxiliarySku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None: None sku \
 * **A1**: A1 sku \
 * **A2**: A2 sku \
 * **A4**: A4 sku \
 * **A8**: A8 sku
 */
export type NetworkInterfaceAuxiliarySku = string;

/** Specifies the Security profile settings for the virtual machine or virtual machine scale set. */
export interface SecurityProfile {
  /** Specifies the security settings like secure boot and vTPM used while creating the virtual machine. Minimum compute api-version: 2020-12-01. */
  uefiSettings?: UefiSettings;
  /** This property can be used by user in the request to enable or disable the Host Encryption for the virtual machine or virtual machine scale set. This will enable the encryption for all the disks including Resource/Temp disk at host itself. The default behavior is: The Encryption at host will be disabled unless this property is set to true for the resource. */
  encryptionAtHost?: boolean;
  /** Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. The default behavior is: UefiSettings will not be enabled unless this property is set. */
  securityType?: SecurityTypes;
  /** Specifies the Managed Identity used by ADE to get access token for keyvault operations. */
  encryptionIdentity?: EncryptionIdentity;
  /** Specifies ProxyAgent settings while creating the virtual machine. Minimum compute api-version: 2023-09-01. */
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
  /** Specifies whether secure boot should be enabled on the virtual machine. Minimum compute api-version: 2020-12-01. */
  secureBootEnabled?: boolean;
  /** Specifies whether vTPM should be enabled on the virtual machine. Minimum compute api-version: 2020-12-01. */
  vTpmEnabled?: boolean;
}

export function uefiSettingsSerializer(item: UefiSettings): any {
  return { secureBootEnabled: item["secureBootEnabled"], vTpmEnabled: item["vTpmEnabled"] };
}

export function uefiSettingsDeserializer(item: any): UefiSettings {
  return {
    secureBootEnabled: item["secureBootEnabled"],
    vTpmEnabled: item["vTpmEnabled"],
  };
}

/** Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. The default behavior is: UefiSettings will not be enabled unless this property is set. */
export enum KnownSecurityTypes {
  /** TrustedLaunch security type */
  TrustedLaunch = "TrustedLaunch",
  /** ConfidentialVM security type */
  ConfidentialVM = "ConfidentialVM",
}

/**
 * Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. The default behavior is: UefiSettings will not be enabled unless this property is set. \
 * {@link KnownSecurityTypes} can be used interchangeably with SecurityTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TrustedLaunch**: TrustedLaunch security type \
 * **ConfidentialVM**: ConfidentialVM security type
 */
export type SecurityTypes = string;

/** Specifies the Managed Identity used by ADE to get access token for keyvault operations. */
export interface EncryptionIdentity {
  /** Specifies ARM Resource ID of one of the user identities associated with the VM. */
  userAssignedIdentityResourceId?: string;
}

export function encryptionIdentitySerializer(item: EncryptionIdentity): any {
  return { userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"] };
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
  /** Audit mode */
  Audit = "Audit",
  /** Enforce mode */
  Enforce = "Enforce",
}

/**
 * Specifies the mode that ProxyAgent will execute on if the feature is enabled. ProxyAgent will start to audit or monitor but not enforce access control over requests to host endpoints in Audit mode, while in Enforce mode it will enforce access control. The default value is Enforce mode. \
 * {@link KnownMode} can be used interchangeably with Mode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Audit**: Audit mode \
 * **Enforce**: Enforce mode
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
  /** Audit mode */
  Audit = "Audit",
  /** Enforce mode */
  Enforce = "Enforce",
  /** Disabled mode */
  Disabled = "Disabled",
}

/**
 * Specifies the execution mode. In Audit mode, the system acts as if it is enforcing the access control policy, including emitting access denial entries in the logs but it does not actually deny any requests to host endpoints. In Enforce mode, the system will enforce the access control and it is the recommended mode of operation. \
 * {@link KnownModes} can be used interchangeably with Modes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Audit**: Audit mode \
 * **Enforce**: Enforce mode \
 * **Disabled**: Disabled mode
 */
export type Modes = string;

/** Specifies the boot diagnostic settings state. Minimum compute api-version: 2015-06-15. */
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

/** Profile for the scheduled events. */
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

/** Profile properties for the Terminate Scheduled event. */
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

/** Profile for the OS Image Scheduled event. */
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
  /** Specifies the capacity reservation group resource id that should be used for allocating the virtual machine provided enough capacity has been reserved. Please refer to https://aka.ms/CapacityReservation for more details. */
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

/** Contains the list of gallery applications that should be made available to the VM */
export interface ApplicationProfile {
  /** Specifies the gallery applications that should be made available to the VM */
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

/** Defines a virtual machine extension. */
export interface VirtualMachineExtension {
  /** The name of the virtual machine extension. */
  name: string;
  /** Properties of the virtual machine extension. */
  properties: VirtualMachineExtensionProperties;
}

export function virtualMachineExtensionSerializer(item: VirtualMachineExtension): any {
  return {
    name: item["name"],
    properties: virtualMachineExtensionPropertiesSerializer(item["properties"]),
  };
}

export function virtualMachineExtensionDeserializer(item: any): VirtualMachineExtension {
  return {
    name: item["name"],
    properties: virtualMachineExtensionPropertiesDeserializer(item["properties"]),
  };
}

/** Describes the properties of a Virtual Machine Extension. */
export interface VirtualMachineExtensionProperties {
  /** How the extension handler should be forced to update even if the extension configuration has not changed. */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is 'CustomScriptExtension'. */
  type?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available. */
  enableAutomaticUpgrade?: boolean;
  /** JSON formatted public settings for the extension. */
  settings?: Record<string, any>;
  /** The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all. */
  protectedSettings?: Record<string, any>;
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
    settings: !item["settings"]
      ? item["settings"]
      : Object.fromEntries(Object.entries(item["settings"]).map(([k, p]: [string, any]) => [k, p])),
    protectedSettings: !item["protectedSettings"]
      ? item["protectedSettings"]
      : Object.fromEntries(
          Object.entries(item["protectedSettings"]).map(([k, p]: [string, any]) => [k, p]),
        ),
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

/** ZoneAllocationPolicy for LaunchBulkInstancesOperation. */
export interface ZoneAllocationPolicy {
  /** Distribution strategy used for zone allocation policy. */
  distributionStrategy: ZoneDistributionStrategy;
  /** Zone preferences, required when zone distribution strategy is Prioritized. */
  zonePreferences?: ZonePreference[];
}

export function zoneAllocationPolicySerializer(item: ZoneAllocationPolicy): any {
  return {
    distributionStrategy: item["distributionStrategy"],
    zonePreferences: !item["zonePreferences"]
      ? item["zonePreferences"]
      : zonePreferenceArraySerializer(item["zonePreferences"]),
  };
}

export function zoneAllocationPolicyDeserializer(item: any): ZoneAllocationPolicy {
  return {
    distributionStrategy: item["distributionStrategy"],
    zonePreferences: !item["zonePreferences"]
      ? item["zonePreferences"]
      : zonePreferenceArrayDeserializer(item["zonePreferences"]),
  };
}

/** Distribution strategies for LaunchBulkInstancesOperation zone allocation policy. */
export enum KnownZoneDistributionStrategy {
  /**
   *     Default. Launch instances in a single zone based on best effort.
   *     If capacity is not available, LaunchBulkInstancesOperation can allocate capacity in different zones.
   */
  BestEffortSingleZone = "BestEffortSingleZone",
  /**
   *     Launch instances based on zone preferences.
   *     Higher priority zones are filled first before allocating to lower priority zones.
   */
  Prioritized = "Prioritized",
  /**
   *     Balance launching instances across zones specified based on best effort.
   *     If capacity is not available, LaunchBulkInstancesOperation can deviate balancing across all zones.
   */
  BestEffortBalanced = "BestEffortBalanced",
  /** Launch instances across all provided zones, ensuring the difference between any two zones is no more than one instance. */
  StrictBalanced = "StrictBalanced",
}

/**
 * Distribution strategies for LaunchBulkInstancesOperation zone allocation policy. \
 * {@link KnownZoneDistributionStrategy} can be used interchangeably with ZoneDistributionStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BestEffortSingleZone**:     Default. Launch instances in a single zone based on best effort.
 *     If capacity is not available, LaunchBulkInstancesOperation can allocate capacity in different zones. \
 * **Prioritized**:     Launch instances based on zone preferences.
 *     Higher priority zones are filled first before allocating to lower priority zones. \
 * **BestEffortBalanced**:     Balance launching instances across zones specified based on best effort.
 *     If capacity is not available, LaunchBulkInstancesOperation can deviate balancing across all zones. \
 * **StrictBalanced**: Launch instances across all provided zones, ensuring the difference between any two zones is no more than one instance.
 */
export type ZoneDistributionStrategy = string;

export function zonePreferenceArraySerializer(result: Array<ZonePreference>): any[] {
  return result.map((item) => {
    return zonePreferenceSerializer(item);
  });
}

export function zonePreferenceArrayDeserializer(result: Array<ZonePreference>): any[] {
  return result.map((item) => {
    return zonePreferenceDeserializer(item);
  });
}

/** Zone preferences for LaunchBulkInstancesOperation zone allocation policy. */
export interface ZonePreference {
  /** Name of the zone. */
  zone: string;
  /**
   *     The rank of the zone. This is used with 'Prioritized' ZoneDistributionStrategy.
   *     The lower the number, the higher the priority, starting with 0.
   *     0 is the highest rank. If not specified, defaults to lowest rank.
   */
  rank?: number;
}

export function zonePreferenceSerializer(item: ZonePreference): any {
  return { zone: item["zone"], rank: item["rank"] };
}

export function zonePreferenceDeserializer(item: any): ZonePreference {
  return {
    zone: item["zone"],
    rank: item["rank"],
  };
}

/** The retry policy for the user request */
export interface RetryPolicy {
  /** Retry count for user request */
  retryCount?: number;
  /** Retry window in minutes for user request */
  retryWindowInMinutes?: number;
}

export function retryPolicySerializer(item: RetryPolicy): any {
  return { retryCount: item["retryCount"], retryWindowInMinutes: item["retryWindowInMinutes"] };
}

export function retryPolicyDeserializer(item: any): RetryPolicy {
  return {
    retryCount: item["retryCount"],
    retryWindowInMinutes: item["retryWindowInMinutes"],
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

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
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

/** List of LaunchBulkInstancesOperation resources. */
export interface _LaunchBulkInstancesOperationListResult {
  /** The list of LaunchBulkInstancesOperation resources. */
  value: LocationBasedLaunchBulkInstancesOperation[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _launchBulkInstancesOperationListResultDeserializer(
  item: any,
): _LaunchBulkInstancesOperationListResult {
  return {
    value: locationBasedLaunchBulkInstancesOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function locationBasedLaunchBulkInstancesOperationArraySerializer(
  result: Array<LocationBasedLaunchBulkInstancesOperation>,
): any[] {
  return result.map((item) => {
    return locationBasedLaunchBulkInstancesOperationSerializer(item);
  });
}

export function locationBasedLaunchBulkInstancesOperationArrayDeserializer(
  result: Array<LocationBasedLaunchBulkInstancesOperation>,
): any[] {
  return result.map((item) => {
    return locationBasedLaunchBulkInstancesOperationDeserializer(item);
  });
}

/** The response of a virtual machine list operation. */
export interface _VirtualMachineListResult {
  /** The Virtual Machine items on this page. */
  value: VirtualMachine[];
  /** The link to the next page of items. */
  nextLink?: string;
}

export function _virtualMachineListResultDeserializer(item: any): _VirtualMachineListResult {
  return {
    value: virtualMachineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function virtualMachineArrayDeserializer(result: Array<VirtualMachine>): any[] {
  return result.map((item) => {
    return virtualMachineDeserializer(item);
  });
}

/** An instant Fleet's virtual machine. */
export interface VirtualMachine {
  /** The name of the virtual machine. */
  readonly name: string;
  /** The compute RP resource id of the virtual machine. subscriptions/{subId}/resourceGroups/{rgName}/providers/Microsoft.Compute/virtualMachines/{vmName} */
  readonly id: string;
  /** Type of the virtual machine */
  readonly type?: string;
  /** This represents the operationStatus of the virtual machine in response to the last operation that was performed on it by Azure Fleet resource. */
  readonly operationStatus: VMOperationStatus;
  /** Error information when `operationStatus` is `Failed`. */
  readonly error?: ApiError;
}

export function virtualMachineDeserializer(item: any): VirtualMachine {
  return {
    name: item["name"],
    id: item["id"],
    type: item["type"],
    operationStatus: item["operationStatus"],
    error: !item["error"] ? item["error"] : apiErrorDeserializer(item["error"]),
  };
}

/** Virtual Machine operation status values. */
export enum KnownVMOperationStatus {
  /** Indicates that the virtual machine is either in the process of being created or is scheduled to be created. */
  Creating = "Creating",
  /** Indicates that the cancellation request was successful because the virtual machine had not been created yet. */
  Canceled = "Canceled",
  /** Indicates that the cancellation request could not be applied because the virtual machine had already been created. */
  CancelFailedStatusUnknown = "CancelFailedStatusUnknown",
  /** Indicates that the virtual machine operation failed. */
  Failed = "Failed",
  /** Indicates that the virtual machine operation completed successfully. */
  Succeeded = "Succeeded",
  /** Indicates that the virtual machine is being deleted. */
  Deleting = "Deleting",
  /** Indicates that the virtual machine operation is being cancelled. */
  Cancelling = "Cancelling",
}

/**
 * Virtual Machine operation status values. \
 * {@link KnownVMOperationStatus} can be used interchangeably with VMOperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Indicates that the virtual machine is either in the process of being created or is scheduled to be created. \
 * **Canceled**: Indicates that the cancellation request was successful because the virtual machine had not been created yet. \
 * **CancelFailedStatusUnknown**: Indicates that the cancellation request could not be applied because the virtual machine had already been created. \
 * **Failed**: Indicates that the virtual machine operation failed. \
 * **Succeeded**: Indicates that the virtual machine operation completed successfully. \
 * **Deleting**: Indicates that the virtual machine is being deleted. \
 * **Cancelling**: Indicates that the virtual machine operation is being cancelled.
 */
export type VMOperationStatus = string;

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

/** The ExecuteDeallocateRequest request for executeDeallocate operations */
export interface ExecuteDeallocateRequest {
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources?: Resources;
  /** CorrelationId item */
  correlationid: string;
}

export function executeDeallocateRequestSerializer(item: ExecuteDeallocateRequest): any {
  return {
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    resources: !item["resources"] ? item["resources"] : resourcesSerializer(item["resources"]),
    correlationid: item["correlationid"],
  };
}

/** Extra details needed to run the user's request */
export interface ExecutionParameters {
  /** Details that could optimize the user's request */
  optimizationPreference?: OptimizationPreference;
  /** Retry policy the user can pass */
  retryPolicy?: RetryPolicy;
}

export function executionParametersSerializer(item: ExecutionParameters): any {
  return {
    optimizationPreference: item["optimizationPreference"],
    retryPolicy: !item["retryPolicy"]
      ? item["retryPolicy"]
      : retryPolicySerializer(item["retryPolicy"]),
  };
}

/** The preferences customers can select to optimize their requests to Bulkactions */
export enum KnownOptimizationPreference {
  /** Optimize while considering cost savings */
  Cost = "Cost",
  /** Optimize while considering availability of resources */
  Availability = "Availability",
  /** Optimize while considering a balance of cost and availability */
  CostAvailabilityBalanced = "CostAvailabilityBalanced",
}

/**
 * The preferences customers can select to optimize their requests to Bulkactions \
 * {@link KnownOptimizationPreference} can be used interchangeably with OptimizationPreference,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cost**: Optimize while considering cost savings \
 * **Availability**: Optimize while considering availability of resources \
 * **CostAvailabilityBalanced**: Optimize while considering a balance of cost and availability
 */
export type OptimizationPreference = string;

/** The resources needed for the user request */
export interface Resources {
  /** The resource ids used for the request */
  ids: string[];
}

export function resourcesSerializer(item: Resources): any {
  return {
    ids: item["ids"].map((p: any) => {
      return p;
    }),
  };
}

/** The response from a deallocate request */
export interface DeallocateResourceOperationResponse {
  /** The description of the operation response */
  description: string;
  /** The type of resources used in the request eg virtual machines */
  type: string;
  /** The location of the request eg westus */
  location: string;
  /** The results from the request. */
  results?: ResourceOperation[];
}

export function deallocateResourceOperationResponseDeserializer(
  item: any,
): DeallocateResourceOperationResponse {
  return {
    description: item["description"],
    type: item["type"],
    location: item["location"],
    results: !item["results"]
      ? item["results"]
      : resourceOperationArrayDeserializer(item["results"]),
  };
}

export function resourceOperationArrayDeserializer(result: Array<ResourceOperation>): any[] {
  return result.map((item) => {
    return resourceOperationDeserializer(item);
  });
}

/** Top level response from an operation on a resource */
export interface ResourceOperation {
  /** Unique identifier for the resource involved in the operation, eg Azure Resource Manager ID */
  resourceId?: string;
  /** Resource level error code if it exists */
  errorCode?: string;
  /** Resource level error details if they exist */
  errorDetails?: string;
  /** Details of the operation performed on a resource */
  operation?: ResourceOperationDetails;
}

export function resourceOperationDeserializer(item: any): ResourceOperation {
  return {
    resourceId: item["resourceId"],
    errorCode: item["errorCode"],
    errorDetails: item["errorDetails"],
    operation: !item["operation"]
      ? item["operation"]
      : resourceOperationDetailsDeserializer(item["operation"]),
  };
}

/** The details of a response from an operation on a resource */
export interface ResourceOperationDetails {
  /** Operation identifier for the unique operation */
  operationId: string;
  /** Unique identifier for the resource involved in the operation, eg Azure Resource Manager ID */
  resourceId?: string;
  /** Type of operation performed on the resources */
  opType?: ResourceOperationType;
  /** Subscription id attached to the request */
  subscriptionId?: string;
  /** Deadline for the operation */
  deadline?: string;
  /** Type of deadline of the operation */
  deadlineType?: DeadlineType;
  /** Current state of the operation */
  state?: OperationState;
  /** Timezone for the operation */
  timezone?: string;
  /** Operation level errors if they exist */
  resourceOperationError?: ResourceOperationError;
  /** Time the operation was complete if errors are null */
  completedAt?: string;
  /** Retry policy the user can pass */
  retryPolicy?: RetryPolicy;
}

export function resourceOperationDetailsDeserializer(item: any): ResourceOperationDetails {
  return {
    operationId: item["operationId"],
    resourceId: item["resourceId"],
    opType: item["opType"],
    subscriptionId: item["subscriptionId"],
    deadline: item["deadline"],
    deadlineType: item["deadlineType"],
    state: item["state"],
    timezone: item["timezone"],
    resourceOperationError: !item["resourceOperationError"]
      ? item["resourceOperationError"]
      : resourceOperationErrorDeserializer(item["resourceOperationError"]),
    completedAt: item["completedAt"],
    retryPolicy: !item["retryPolicy"]
      ? item["retryPolicy"]
      : retryPolicyDeserializer(item["retryPolicy"]),
  };
}

/** The kind of operation types that can be performed on resources eg Virtual Machines, using BulkActions */
export enum KnownResourceOperationType {
  /** The default value for this enum type */
  Unknown = "Unknown",
  /** Start operations on the resources */
  Start = "Start",
  /** Deallocate operations on the resources */
  Deallocate = "Deallocate",
  /** Hibernate operations on the resources */
  Hibernate = "Hibernate",
  /** Create operations on the resources */
  Create = "Create",
  /** Delete operations on the resources */
  Delete = "Delete",
}

/**
 * The kind of operation types that can be performed on resources eg Virtual Machines, using BulkActions \
 * {@link KnownResourceOperationType} can be used interchangeably with ResourceOperationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The default value for this enum type \
 * **Start**: Start operations on the resources \
 * **Deallocate**: Deallocate operations on the resources \
 * **Hibernate**: Hibernate operations on the resources \
 * **Create**: Create operations on the resources \
 * **Delete**: Delete operations on the resources
 */
export type ResourceOperationType = string;

/** The types of deadlines supported by Bulkactions */
export enum KnownDeadlineType {
  /** Default value of Unknown. */
  Unknown = "Unknown",
  /** Initiate the operation at the given deadline. */
  InitiateAt = "InitiateAt",
  /** Complete the operation by the given deadline. */
  CompleteBy = "CompleteBy",
}

/**
 * The types of deadlines supported by Bulkactions \
 * {@link KnownDeadlineType} can be used interchangeably with DeadlineType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Default value of Unknown. \
 * **InitiateAt**: Initiate the operation at the given deadline. \
 * **CompleteBy**: Complete the operation by the given deadline.
 */
export type DeadlineType = string;

/** Values that define the states of operations in BulkActions */
export enum KnownOperationState {
  /** The default value for the operation state enum */
  Unknown = "Unknown",
  /** Operations that are pending scheduling */
  PendingScheduling = "PendingScheduling",
  /** Operations that have been scheduled */
  Scheduled = "Scheduled",
  /** Operations that are waiting to be executed */
  PendingExecution = "PendingExecution",
  /** Operations that are in the process of being executed */
  Executing = "Executing",
  /** Operations that succeeded */
  Succeeded = "Succeeded",
  /** Operations that have failed */
  Failed = "Failed",
  /** Operations that have been Cancelled by the user */
  Cancelled = "Cancelled",
  /** Operations that are blocked */
  Blocked = "Blocked",
}

/**
 * Values that define the states of operations in BulkActions \
 * {@link KnownOperationState} can be used interchangeably with OperationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The default value for the operation state enum \
 * **PendingScheduling**: Operations that are pending scheduling \
 * **Scheduled**: Operations that have been scheduled \
 * **PendingExecution**: Operations that are waiting to be executed \
 * **Executing**: Operations that are in the process of being executed \
 * **Succeeded**: Operations that succeeded \
 * **Failed**: Operations that have failed \
 * **Cancelled**: Operations that have been Cancelled by the user \
 * **Blocked**: Operations that are blocked
 */
export type OperationState = string;

/** These describe errors that occur at the resource level */
export interface ResourceOperationError {
  /** Code for the error eg 404, 500 */
  errorCode: string;
  /** Detailed message about the error */
  errorDetails: string;
}

export function resourceOperationErrorDeserializer(item: any): ResourceOperationError {
  return {
    errorCode: item["errorCode"],
    errorDetails: item["errorDetails"],
  };
}

/** The ExecuteHibernateRequest request for executeHibernate operations */
export interface ExecuteHibernateRequest {
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources?: Resources;
  /** CorrelationId item */
  correlationid: string;
}

export function executeHibernateRequestSerializer(item: ExecuteHibernateRequest): any {
  return {
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    resources: !item["resources"] ? item["resources"] : resourcesSerializer(item["resources"]),
    correlationid: item["correlationid"],
  };
}

/** The response from a Hibernate request */
export interface HibernateResourceOperationResponse {
  /** The description of the operation response */
  description: string;
  /** The type of resources used in the request eg virtual machines */
  type: string;
  /** The location of the request eg westus */
  location: string;
  /** The results from the request. */
  results?: ResourceOperation[];
}

export function hibernateResourceOperationResponseDeserializer(
  item: any,
): HibernateResourceOperationResponse {
  return {
    description: item["description"],
    type: item["type"],
    location: item["location"],
    results: !item["results"]
      ? item["results"]
      : resourceOperationArrayDeserializer(item["results"]),
  };
}

/** The ExecuteStartRequest request for executeStart operations */
export interface ExecuteStartRequest {
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources?: Resources;
  /** CorrelationId item */
  correlationid: string;
}

export function executeStartRequestSerializer(item: ExecuteStartRequest): any {
  return {
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    resources: !item["resources"] ? item["resources"] : resourcesSerializer(item["resources"]),
    correlationid: item["correlationid"],
  };
}

/** The response from a start request */
export interface StartResourceOperationResponse {
  /** The description of the operation response */
  description: string;
  /** The type of resources used in the request eg virtual machines */
  type: string;
  /** The location of the request eg westus */
  location: string;
  /** The results from the request. */
  results?: ResourceOperation[];
}

export function startResourceOperationResponseDeserializer(
  item: any,
): StartResourceOperationResponse {
  return {
    description: item["description"],
    type: item["type"],
    location: item["location"],
    results: !item["results"]
      ? item["results"]
      : resourceOperationArrayDeserializer(item["results"]),
  };
}

/** The ExecuteCreateRequest request for create operations */
export interface ExecuteCreateRequest {
  /** resource creation payload */
  resourceConfigParameters: ResourceProvisionPayload;
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** CorrelationId item */
  correlationid?: string;
}

export function executeCreateRequestSerializer(item: ExecuteCreateRequest): any {
  return {
    resourceConfigParameters: resourceProvisionPayloadSerializer(item["resourceConfigParameters"]),
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    correlationid: item["correlationid"],
  };
}

/** Resource creation data model */
export interface ResourceProvisionPayload {
  /** JSON object that contains VM properties that are common across all VMs in this batch (if you want to create 100 VMs in this request, and they all have same vmSize, then include vmSize in baseProfile) */
  baseProfile?: Record<string, any>;
  /** JSON array, that contains VM properties that should to be overridden for each VM in the batch (if you want to create 100 VMs, they all need a distinct computerName property, you pass computerNames for each VM in batch in this array), service will merge baseProfile with VM specific overrides and create a merged VMProfile. */
  resourceOverrides?: Record<string, any>[];
  /** Number of VMs to be created */
  resourceCount: number;
  /** if resourceOverrides doesn't contain "name", service will create name based of prefix and ResourceCount e.g. resourceprefix-0,resourceprefix-1.. */
  resourcePrefix?: string;
}

export function resourceProvisionPayloadSerializer(item: ResourceProvisionPayload): any {
  return {
    baseProfile: item["baseProfile"],
    resourceOverrides: !item["resourceOverrides"]
      ? item["resourceOverrides"]
      : item["resourceOverrides"].map((p: any) => {
          return p;
        }),
    resourceCount: item["resourceCount"],
    resourcePrefix: item["resourcePrefix"],
  };
}

/** The response from a create request */
export interface CreateResourceOperationResponse {
  /** The description of the operation response */
  description: string;
  /** The type of resources used in the request eg virtual machines */
  type: string;
  /** The location of the request eg westus */
  location: string;
  /** The results from the request. */
  results?: ResourceOperation[];
}

export function createResourceOperationResponseDeserializer(
  item: any,
): CreateResourceOperationResponse {
  return {
    description: item["description"],
    type: item["type"],
    location: item["location"],
    results: !item["results"]
      ? item["results"]
      : resourceOperationArrayDeserializer(item["results"]),
  };
}

/** The ExecuteDeleteRequest for delete VM operation */
export interface ExecuteDeleteRequest {
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources?: Resources;
  /** CorrelationId item */
  correlationid: string;
  /** Forced delete resource item */
  forceDeletion?: boolean;
}

export function executeDeleteRequestSerializer(item: ExecuteDeleteRequest): any {
  return {
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    resources: !item["resources"] ? item["resources"] : resourcesSerializer(item["resources"]),
    correlationid: item["correlationid"],
    forceDeletion: item["forceDeletion"],
  };
}

/** The response from a delete request */
export interface DeleteResourceOperationResponse {
  /** The description of the operation response */
  description: string;
  /** The type of resources used in the request eg virtual machines */
  type: string;
  /** The location of the request eg westus */
  location: string;
  /** The results from the request. */
  results?: ResourceOperation[];
}

export function deleteResourceOperationResponseDeserializer(
  item: any,
): DeleteResourceOperationResponse {
  return {
    description: item["description"],
    type: item["type"],
    location: item["location"],
    results: !item["results"]
      ? item["results"]
      : resourceOperationArrayDeserializer(item["results"]),
  };
}

/** This is the request to get operation status using operationids */
export interface GetOperationStatusRequest {
  /** The list of operation ids to get the status of */
  operationIds: string[];
  /** CorrelationId item */
  correlationid: string;
}

export function getOperationStatusRequestSerializer(item: GetOperationStatusRequest): any {
  return {
    operationIds: item["operationIds"].map((p: any) => {
      return p;
    }),
    correlationid: item["correlationid"],
  };
}

/** This is the response from a get operations status request */
export interface GetOperationStatusResponse {
  /** An array of resource operations based on their operation ids */
  results: ResourceOperation[];
}

export function getOperationStatusResponseDeserializer(item: any): GetOperationStatusResponse {
  return {
    results: resourceOperationArrayDeserializer(item["results"]),
  };
}

/** This is the request to cancel running operations in bulkactions using the operation ids */
export interface CancelOperationsRequest {
  /** The list of operation ids to cancel operations on */
  operationIds: string[];
  /** CorrelationId item */
  correlationid: string;
}

export function cancelOperationsRequestSerializer(item: CancelOperationsRequest): any {
  return {
    operationIds: item["operationIds"].map((p: any) => {
      return p;
    }),
    correlationid: item["correlationid"],
  };
}

/** This is the response from a cancel operations request */
export interface CancelOperationsResponse {
  /** An array of resource operations that were successfully cancelled */
  results: ResourceOperation[];
}

export function cancelOperationsResponseDeserializer(item: any): CancelOperationsResponse {
  return {
    results: resourceOperationArrayDeserializer(item["results"]),
  };
}

/** BulkActions API versions */
export enum KnownVersions {
  /** 2026-02-01-preview version */
  _20260201Preview = "2026-02-01-preview",
}
