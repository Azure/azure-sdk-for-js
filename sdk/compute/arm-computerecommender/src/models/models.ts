// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
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

/** Contains metadata of the SkuMixPlacement scoring resource */
export interface SkuMixPlacementBase extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: SkuMixPlacementProperties;
}

export function skuMixPlacementBaseDeserializer(item: any): SkuMixPlacementBase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : skuMixPlacementPropertiesDeserializer(item["properties"]),
  };
}

/** Contains properties of the SkuMixPlacement resource. */
export interface SkuMixPlacementProperties {
  /** Describes what resource types are supported by the mix placement scoring service. */
  supportedResourceTypes?: string[];
}

export function skuMixPlacementPropertiesDeserializer(item: any): SkuMixPlacementProperties {
  return {
    supportedResourceTypes: !item["supportedResourceTypes"]
      ? item["supportedResourceTypes"]
      : item["supportedResourceTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

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

/** Sku Mix Placement API request. */
export interface SkuMixPlacementRequest {
  /** Optional logical zones to consider (e.g. ["1","2","3"]). Omitted or empty implies regional deployment. */
  zones?: string[];
  /** All capacity-related properties. */
  capacityProfile: SkuMixPlacementCapacityProfile;
  /** Describes how the service should choose candidate VM sizes. */
  instanceDescription: SkuMixPlacementInstanceDescription;
}

export function skuMixPlacementRequestSerializer(item: SkuMixPlacementRequest): any {
  return {
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    capacityProfile: skuMixPlacementCapacityProfileSerializer(item["capacityProfile"]),
    instanceDescription: skuMixPlacementInstanceDescriptionSerializer(item["instanceDescription"]),
  };
}

/** Capacity-related properties for the placement request. */
export interface SkuMixPlacementCapacityProfile {
  /** The capacity to run the workload. For VMs: [1..10,000]. For vCPUs: [1..100,000]. */
  capacity: number;
  /** The unit type for the capacity value. */
  capacityType: SkuMixPlacementCapacityType;
  /** The priority of the VMs to allocate. */
  priority: SkuMixPlacementPriority;
  /** Required when priority is Spot. Contains spot-specific configuration. */
  spotPriorityProfile?: SkuMixPlacementSpotPriorityProfile;
  /** The allocation strategy for determining the optimal SKU split. */
  allocationStrategy?: SkuMixPlacementAllocationStrategy;
  /** The OS type. Required when allocationStrategy is LowestPrice because pricing varies by OS. */
  osType?: SkuMixPlacementOSType;
  /** Zone allocation policy. Default: BestEffortBalanced. */
  zoneAllocationPolicy?: SkuMixPlacementZoneAllocationPolicy;
}

export function skuMixPlacementCapacityProfileSerializer(
  item: SkuMixPlacementCapacityProfile,
): any {
  return {
    capacity: item["capacity"],
    capacityType: item["capacityType"],
    priority: item["priority"],
    spotPriorityProfile: !item["spotPriorityProfile"]
      ? item["spotPriorityProfile"]
      : skuMixPlacementSpotPriorityProfileSerializer(item["spotPriorityProfile"]),
    allocationStrategy: item["allocationStrategy"],
    osType: item["osType"],
    zoneAllocationPolicy: !item["zoneAllocationPolicy"]
      ? item["zoneAllocationPolicy"]
      : skuMixPlacementZoneAllocationPolicySerializer(item["zoneAllocationPolicy"]),
  };
}

/** The unit type for the capacity value. */
export enum KnownSkuMixPlacementCapacityType {
  /** Capacity measured in number of VMs. */
  Vm = "VM",
  /** Capacity measured in number of vCPUs. */
  VCpu = "VCpu",
}

/**
 * The unit type for the capacity value. \
 * {@link KnownSkuMixPlacementCapacityType} can be used interchangeably with SkuMixPlacementCapacityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VM**: Capacity measured in number of VMs. \
 * **VCpu**: Capacity measured in number of vCPUs.
 */
export type SkuMixPlacementCapacityType = string;

/** Priority levels for VM allocation. */
export enum KnownSkuMixPlacementPriority {
  /** Regular priority VMs with guaranteed capacity. */
  Regular = "Regular",
  /** Spot priority VMs with lower cost but potential eviction. */
  Spot = "Spot",
}

/**
 * Priority levels for VM allocation. \
 * {@link KnownSkuMixPlacementPriority} can be used interchangeably with SkuMixPlacementPriority,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regular**: Regular priority VMs with guaranteed capacity. \
 * **Spot**: Spot priority VMs with lower cost but potential eviction.
 */
export type SkuMixPlacementPriority = string;

/** Spot priority configuration. Required when priority is Spot. */
export interface SkuMixPlacementSpotPriorityProfile {
  /** Maximum price per VM the customer is willing to pay. Default: -1 (no price restriction). */
  maxPricePerVm?: number;
}

export function skuMixPlacementSpotPriorityProfileSerializer(
  item: SkuMixPlacementSpotPriorityProfile,
): any {
  return { maxPricePerVm: item["maxPricePerVm"] };
}

/** Allocation strategy for determining the optimal SKU split. */
export enum KnownSkuMixPlacementAllocationStrategy {
  /** VMs allocated to optimize for lowest price. */
  LowestPrice = "LowestPrice",
  /** VMs allocated based on customer-specified rank for each VM size. */
  Prioritized = "Prioritized",
  /** VMs allocated to optimize for lowest eviction rate (Spot only). */
  EvictionOptimized = "EvictionOptimized",
}

/**
 * Allocation strategy for determining the optimal SKU split. \
 * {@link KnownSkuMixPlacementAllocationStrategy} can be used interchangeably with SkuMixPlacementAllocationStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LowestPrice**: VMs allocated to optimize for lowest price. \
 * **Prioritized**: VMs allocated based on customer-specified rank for each VM size. \
 * **EvictionOptimized**: VMs allocated to optimize for lowest eviction rate (Spot only).
 */
export type SkuMixPlacementAllocationStrategy = string;

/** The OS type of the VMs. */
export enum KnownSkuMixPlacementOSType {
  /** Windows OS. */
  Windows = "Windows",
  /** Linux OS. */
  Linux = "Linux",
}

/**
 * The OS type of the VMs. \
 * {@link KnownSkuMixPlacementOSType} can be used interchangeably with SkuMixPlacementOSType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows**: Windows OS. \
 * **Linux**: Linux OS.
 */
export type SkuMixPlacementOSType = string;

/** Zone allocation policy for the placement request. */
export interface SkuMixPlacementZoneAllocationPolicy {
  /** Distribution strategy for allocating capacity across zones. */
  distributionStrategy?: SkuMixPlacementZonalDistributionStrategy;
  /** Per-zone allocation preferences. Used with the Prioritized strategy. */
  zonePreferences?: SkuMixPlacementZonePreference[];
}

export function skuMixPlacementZoneAllocationPolicySerializer(
  item: SkuMixPlacementZoneAllocationPolicy,
): any {
  return {
    distributionStrategy: item["distributionStrategy"],
    zonePreferences: !item["zonePreferences"]
      ? item["zonePreferences"]
      : skuMixPlacementZonePreferenceArraySerializer(item["zonePreferences"]),
  };
}

/** Strategy for distributing capacity across availability zones. */
export enum KnownSkuMixPlacementZonalDistributionStrategy {
  /** Capacity distributed across zones on a best-effort balanced basis. */
  BestEffortBalanced = "BestEffortBalanced",
  /** Zones filled based on zone preferences/rank. Higher priority zones filled first. */
  Prioritized = "Prioritized",
  /** Capacity allocated within a single zone on a best-effort basis; may spill across zones if single-zone capacity is insufficient. */
  BestEffortSingleZone = "BestEffortSingleZone",
}

/**
 * Strategy for distributing capacity across availability zones. \
 * {@link KnownSkuMixPlacementZonalDistributionStrategy} can be used interchangeably with SkuMixPlacementZonalDistributionStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BestEffortBalanced**: Capacity distributed across zones on a best-effort balanced basis. \
 * **Prioritized**: Zones filled based on zone preferences\/rank. Higher priority zones filled first. \
 * **BestEffortSingleZone**: Capacity allocated within a single zone on a best-effort basis; may spill across zones if single-zone capacity is insufficient.
 */
export type SkuMixPlacementZonalDistributionStrategy = string;

export function skuMixPlacementZonePreferenceArraySerializer(
  result: Array<SkuMixPlacementZonePreference>,
): any[] {
  return result.map((item) => {
    return skuMixPlacementZonePreferenceSerializer(item);
  });
}

/** Per-zone allocation preference. */
export interface SkuMixPlacementZonePreference {
  /** Logical zone (e.g. "1", "2", "3"). */
  zone: string;
  /** Rank of the zone. Lower values = higher priority (0 is highest). */
  rank?: number;
  /** Best-effort limit to avoid allocating more than this count within the zone. Used with the Prioritized strategy. */
  targetMaxCapacity?: number;
}

export function skuMixPlacementZonePreferenceSerializer(item: SkuMixPlacementZonePreference): any {
  return { zone: item["zone"], rank: item["rank"], targetMaxCapacity: item["targetMaxCapacity"] };
}

/** Describes which VM sizes to consider. */
export interface SkuMixPlacementInstanceDescription {
  /** The list of VM sizes to consider for placement. */
  vmSizes: SkuMixPlacementVMSize[];
}

export function skuMixPlacementInstanceDescriptionSerializer(
  item: SkuMixPlacementInstanceDescription,
): any {
  return { vmSizes: skuMixPlacementVMSizeArraySerializer(item["vmSizes"]) };
}

export function skuMixPlacementVMSizeArraySerializer(result: Array<SkuMixPlacementVMSize>): any[] {
  return result.map((item) => {
    return skuMixPlacementVMSizeSerializer(item);
  });
}

/** A VM size with optional rank for prioritization. */
export interface SkuMixPlacementVMSize {
  /** SKU name (e.g. Standard_D2s_v3). */
  name: string;
  /** Rank of the VM size. Lower = higher priority (starting at 0). Only valid with Prioritized strategy. */
  rank?: number;
}

export function skuMixPlacementVMSizeSerializer(item: SkuMixPlacementVMSize): any {
  return { name: item["name"], rank: item["rank"] };
}

/** Sku Mix Placement API response. */
export interface SkuMixPlacementResponse {
  /** List of placement choice recommendations. */
  placementChoices: SkuMixPlacementDeploymentChoice[];
  /** Date/time until which the recommendations are valid. Callers should request fresh recommendations after this time. */
  validUntil?: Date;
  /** Indicates whether the response is a complete or partial fulfillment. */
  partialFulfillmentReason: SkuMixPlacementPartialFulfillmentReason;
}

export function skuMixPlacementResponseDeserializer(item: any): SkuMixPlacementResponse {
  return {
    placementChoices: skuMixPlacementDeploymentChoiceArrayDeserializer(item["placementChoices"]),
    validUntil: !item["validUntil"] ? item["validUntil"] : new Date(item["validUntil"]),
    partialFulfillmentReason: item["partialFulfillmentReason"],
  };
}

export function skuMixPlacementDeploymentChoiceArrayDeserializer(
  result: Array<SkuMixPlacementDeploymentChoice>,
): any[] {
  return result.map((item) => {
    return skuMixPlacementDeploymentChoiceDeserializer(item);
  });
}

/** A single deployment choice recommendation. */
export interface SkuMixPlacementDeploymentChoice {
  /** Unique identifier for this deployment choice. */
  id: string;
  /** Placement score from 0 to 9 (inclusive). Higher is better. */
  score: number;
  /** The list of VM size / zone allocations that make up this deployment choice. */
  skuSplit: SkuMixPlacementItem[];
}

export function skuMixPlacementDeploymentChoiceDeserializer(
  item: any,
): SkuMixPlacementDeploymentChoice {
  return {
    id: item["id"],
    score: item["score"],
    skuSplit: skuMixPlacementItemArrayDeserializer(item["skuSplit"]),
  };
}

export function skuMixPlacementItemArrayDeserializer(result: Array<SkuMixPlacementItem>): any[] {
  return result.map((item) => {
    return skuMixPlacementItemDeserializer(item);
  });
}

/** A single VM size allocation within a deployment choice. */
export interface SkuMixPlacementItem {
  /** VM size name (e.g. Standard_D2s_v3). */
  name: string;
  /** Priority of this allocation (Regular or Spot). */
  priority: SkuMixPlacementPriority;
  /** Lower range of recommended allocation capacity. */
  capacity: number;
  /** Upper range of recommended allocation capacity. */
  capacityMax?: number;
  /** Logical zone (e.g. "1", "2", "3"). Omitted or empty for regional deployments. */
  zone?: string;
}

export function skuMixPlacementItemDeserializer(item: any): SkuMixPlacementItem {
  return {
    name: item["name"],
    priority: item["priority"],
    capacity: item["capacity"],
    capacityMax: item["capacityMax"],
    zone: item["zone"],
  };
}

/** Reason for partial fulfillment of the requested capacity. */
export enum KnownSkuMixPlacementPartialFulfillmentReason {
  /** Full capacity was fulfilled. */
  None = "None",
  /** Not enough allocable capacity was available. */
  InsufficientCapacity = "InsufficientCapacity",
  /** Not enough quota was available. */
  InsufficientQuota = "InsufficientQuota",
}

/**
 * Reason for partial fulfillment of the requested capacity. \
 * {@link KnownSkuMixPlacementPartialFulfillmentReason} can be used interchangeably with SkuMixPlacementPartialFulfillmentReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Full capacity was fulfilled. \
 * **InsufficientCapacity**: Not enough allocable capacity was available. \
 * **InsufficientQuota**: Not enough quota was available.
 */
export type SkuMixPlacementPartialFulfillmentReason = string;

/** Contains metadata of a diagnostic type */
export interface ComputeDiagnosticBase extends ProxyResource {
  /** Contains additional properties of a diagnostic */
  properties?: DiagnosticProperties;
}

export function computeDiagnosticBaseDeserializer(item: any): ComputeDiagnosticBase {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : diagnosticPropertiesDeserializer(item["properties"]),
  };
}

/** Contains additional properties of a diagnostic */
export interface DiagnosticProperties {
  /** Describes what are the supported resource types for a diagnostic. */
  supportedResourceTypes?: string[];
}

export function diagnosticPropertiesDeserializer(item: any): DiagnosticProperties {
  return {
    supportedResourceTypes: !item["supportedResourceTypes"]
      ? item["supportedResourceTypes"]
      : item["supportedResourceTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** SpotPlacementScores API Input. */
export interface SpotPlacementScoresInput {
  /** The desired regions */
  desiredLocations?: string[];
  /** The desired virtual machine SKU sizes. */
  desiredSizes?: ResourceSize[];
  /** Desired instance count per region/zone based on the scope. */
  desiredCount?: number;
  /** Defines if the scope is zonal or regional. */
  availabilityZones?: boolean;
}

export function spotPlacementScoresInputSerializer(item: SpotPlacementScoresInput): any {
  return {
    desiredLocations: !item["desiredLocations"]
      ? item["desiredLocations"]
      : item["desiredLocations"].map((p: any) => {
          return p;
        }),
    desiredSizes: !item["desiredSizes"]
      ? item["desiredSizes"]
      : resourceSizeArraySerializer(item["desiredSizes"]),
    desiredCount: item["desiredCount"],
    availabilityZones: item["availabilityZones"],
  };
}

export function resourceSizeArraySerializer(result: Array<ResourceSize>): any[] {
  return result.map((item) => {
    return resourceSizeSerializer(item);
  });
}

export function resourceSizeArrayDeserializer(result: Array<ResourceSize>): any[] {
  return result.map((item) => {
    return resourceSizeDeserializer(item);
  });
}

/** SpotPlacementRecommender API response. */
export interface ResourceSize {
  /** The resource's CRP virtual machine SKU size. */
  sku?: string;
}

export function resourceSizeSerializer(item: ResourceSize): any {
  return { sku: item["sku"] };
}

export function resourceSizeDeserializer(item: any): ResourceSize {
  return {
    sku: item["sku"],
  };
}

/** SpotPlacementScores API response. */
export interface SpotPlacementScoresResponse {
  /** The desired regions */
  desiredLocations?: string[];
  /** The desired virtual machine SKU sizes. */
  desiredSizes?: ResourceSize[];
  /** Desired instance count per region/zone based on the scope. */
  desiredCount?: number;
  /** Defines if the scope is zonal or regional. */
  availabilityZones?: boolean;
  /** A placement score indicating the likelihood of successfully allocating the specified Spot VM(s), as well as the expected lifetimes of the Spot VM(s) after allocation. */
  placementScores?: PlacementScore[];
}

export function spotPlacementScoresResponseDeserializer(item: any): SpotPlacementScoresResponse {
  return {
    desiredLocations: !item["desiredLocations"]
      ? item["desiredLocations"]
      : item["desiredLocations"].map((p: any) => {
          return p;
        }),
    desiredSizes: !item["desiredSizes"]
      ? item["desiredSizes"]
      : resourceSizeArrayDeserializer(item["desiredSizes"]),
    desiredCount: item["desiredCount"],
    availabilityZones: item["availabilityZones"],
    placementScores: !item["placementScores"]
      ? item["placementScores"]
      : placementScoreArrayDeserializer(item["placementScores"]),
  };
}

export function placementScoreArrayDeserializer(result: Array<PlacementScore>): any[] {
  return result.map((item) => {
    return placementScoreDeserializer(item);
  });
}

/** The spot placement score for sku/region/zone combination. */
export interface PlacementScore {
  /** The resource's CRP virtual machine SKU size. */
  sku?: string;
  /** The region. */
  region?: string;
  /** The availability zone. */
  availabilityZone?: string;
  /** A placement score indicating the likelihood of successfully allocating the specified Spot VM(s), as well as the expected lifetimes of the Spot VM(s) after allocation. */
  score?: string;
  /** Whether the desired quota is available. */
  isQuotaAvailable?: boolean;
}

export function placementScoreDeserializer(item: any): PlacementScore {
  return {
    sku: item["sku"],
    region: item["region"],
    availabilityZone: item["availabilityZone"],
    score: item["score"],
    isQuotaAvailable: item["isQuotaAvailable"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-06-05 API version. */
  V20250605 = "2025-06-05",
  /** The 2026-05-05-preview API version. */
  V20260505Preview = "2026-05-05-preview",
}
