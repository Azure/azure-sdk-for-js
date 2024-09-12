// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../helpers/serializerHelpers.js";

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

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

/** Contains information about a standby container group pool as last known by the StandbyPool resource provider. */
export interface StandbyContainerGroupPoolRuntimeViewResource
  extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: StandbyContainerGroupPoolRuntimeViewResourceProperties;
}

/** Contains information about a standby pool as last known by the StandbyPool resource provider. */
export interface StandbyContainerGroupPoolRuntimeViewResourceProperties {
  /** A list containing the counts of container groups in each possible state, as known by the StandbyPool resource provider. */
  readonly instanceCountSummary: ContainerGroupInstanceCountSummary[];
  /** Displays the provisioning state of the standby pool */
  readonly provisioningState?: ProvisioningState;
}

/** Displays the counts of container groups in each state, as known by the StandbyPool resource provider. */
export interface ContainerGroupInstanceCountSummary {
  /** The count of pooled resources in each state. */
  instanceCountsByState: PoolResourceStateCount[];
}

/** Displays the counts of pooled resources in each state, as known by the StandbyPool resource provider. */
export interface PoolResourceStateCount {
  /** The state that the pooled resources count is for. */
  state: string;
  /** The count of pooled resources in the given state. */
  count: number;
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

/** The response of a StandbyContainerGroupPoolRuntimeViewResource list operation. */
export interface _StandbyContainerGroupPoolRuntimeViewResourceListResult {
  /** The StandbyContainerGroupPoolRuntimeViewResource items on this page */
  value: StandbyContainerGroupPoolRuntimeViewResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(
  item: TrackedResource,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
  };
}

/** A StandbyContainerGroupPoolResource. */
export interface StandbyContainerGroupPoolResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: StandbyContainerGroupPoolResourceProperties;
}

export function standbyContainerGroupPoolResourceSerializer(
  item: StandbyContainerGroupPoolResource,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
    properties: !item.properties
      ? item.properties
      : standbyContainerGroupPoolResourcePropertiesSerializer(item.properties),
  };
}

/** Details of the StandbyContainerGroupPool. */
export interface StandbyContainerGroupPoolResourceProperties {
  /** Specifies elasticity profile of standby container group pools. */
  elasticityProfile: StandbyContainerGroupPoolElasticityProfile;
  /** Specifies container group properties of standby container group pools. */
  containerGroupProperties: ContainerGroupProperties;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function standbyContainerGroupPoolResourcePropertiesSerializer(
  item: StandbyContainerGroupPoolResourceProperties,
): Record<string, unknown> {
  return {
    elasticityProfile: standbyContainerGroupPoolElasticityProfileSerializer(
      item.elasticityProfile,
    ),
    containerGroupProperties: containerGroupPropertiesSerializer(
      item.containerGroupProperties,
    ),
  };
}

/** Specifies the elasticity profile of the standby container group pools. */
export interface StandbyContainerGroupPoolElasticityProfile {
  /** Specifies maximum number of standby container groups in the standby pool. */
  maxReadyCapacity: number;
  /** Specifies refill policy of the pool. */
  refillPolicy?: RefillPolicy;
}

export function standbyContainerGroupPoolElasticityProfileSerializer(
  item: StandbyContainerGroupPoolElasticityProfile,
): Record<string, unknown> {
  return {
    maxReadyCapacity: item["maxReadyCapacity"],
    refillPolicy: item["refillPolicy"],
  };
}

/** Known values of {@link RefillPolicy} that the service accepts. */
export enum KnownRefillPolicy {
  /** always */
  always = "always",
}

/**
 * Refill policy of standby pool \
 * {@link KnownRefillPolicy} can be used interchangeably with RefillPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **always**
 */
export type RefillPolicy = string;

/** Details of the ContainerGroupProperties. */
export interface ContainerGroupProperties {
  /** Specifies container group profile of standby container groups. */
  containerGroupProfile: ContainerGroupProfile;
  /** Specifies subnet Ids for container group. */
  subnetIds?: Subnet[];
}

export function containerGroupPropertiesSerializer(
  item: ContainerGroupProperties,
): Record<string, unknown> {
  return {
    containerGroupProfile: containerGroupProfileSerializer(
      item.containerGroupProfile,
    ),
    subnetIds:
      item["subnetIds"] === undefined
        ? item["subnetIds"]
        : item["subnetIds"].map(subnetSerializer),
  };
}

/** Details of the ContainerGroupProfile. */
export interface ContainerGroupProfile {
  /** Specifies container group profile id of standby container groups. */
  id: string;
  /** Specifies revision of container group profile. */
  revision?: number;
}

export function containerGroupProfileSerializer(
  item: ContainerGroupProfile,
): Record<string, unknown> {
  return {
    id: item["id"],
    revision: item["revision"],
  };
}

/** Subnet of container group */
export interface Subnet {
  /** Specifies ARM resource id of the subnet. */
  id: string;
}

export function subnetSerializer(item: Subnet): Record<string, unknown> {
  return {
    id: item["id"],
  };
}

/** The type used for update operations of the StandbyContainerGroupPoolResource. */
export interface StandbyContainerGroupPoolResourceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: StandbyContainerGroupPoolResourceUpdateProperties;
}

export function standbyContainerGroupPoolResourceUpdateSerializer(
  item: StandbyContainerGroupPoolResourceUpdate,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    properties: !item.properties
      ? item.properties
      : standbyContainerGroupPoolResourceUpdatePropertiesSerializer(
          item.properties,
        ),
  };
}

/** The updatable properties of the StandbyContainerGroupPoolResource. */
export interface StandbyContainerGroupPoolResourceUpdateProperties {
  /** Specifies elasticity profile of standby container group pools. */
  elasticityProfile?: StandbyContainerGroupPoolElasticityProfile;
  /** Specifies container group properties of standby container group pools. */
  containerGroupProperties?: ContainerGroupProperties;
}

export function standbyContainerGroupPoolResourceUpdatePropertiesSerializer(
  item: StandbyContainerGroupPoolResourceUpdateProperties,
): Record<string, unknown> {
  return {
    elasticityProfile: !item.elasticityProfile
      ? item.elasticityProfile
      : standbyContainerGroupPoolElasticityProfileSerializer(
          item.elasticityProfile,
        ),
    containerGroupProperties: !item.containerGroupProperties
      ? item.containerGroupProperties
      : containerGroupPropertiesSerializer(item.containerGroupProperties),
  };
}

/** The response of a StandbyContainerGroupPoolResource list operation. */
export interface _StandbyContainerGroupPoolResourceListResult {
  /** The StandbyContainerGroupPoolResource items on this page */
  value: StandbyContainerGroupPoolResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Contains information about a standby virtual machine pool as last known by the StandbyPool resource provider. */
export interface StandbyVirtualMachinePoolRuntimeViewResource
  extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: StandbyVirtualMachinePoolRuntimeViewResourceProperties;
}

/** Contains information about a standby pool as last known by the StandbyPool resource provider. */
export interface StandbyVirtualMachinePoolRuntimeViewResourceProperties {
  /**
   * A list containing the counts of virtual machines in each possible power state for each zone if enabled, as known by the StandbyPool resource provider.
   * If zones are not enabled on the attached VMSS, the list will contain a single entry with null zone values.
   * Note: any updates to pool resources outside of StandbyPoolRP (i.e deleting a VM through portal) are not reflected here.
   * Note: any resources in the Running state may still be installing extensions / not fully provisioned.
   */
  readonly instanceCountSummary: VirtualMachineInstanceCountSummary[];
  /** Displays the provisioning state of the standby pool */
  readonly provisioningState?: ProvisioningState;
}

/**
 * Contains the counts of VMs in each power state in a given zone, fault domain, as known by the StandbyPool resource provider.
 * Note: any updates to pool resources outside of StandbyPoolRP (i.e deleting a VM through portal) are not reflected here.
 * Note: any resources in the Running state may still be installing extensions / not fully provisioned.
 */
export interface VirtualMachineInstanceCountSummary {
  /** The zone that the provided counts are in. This is null if zones are not enabled on the attached VMSS. */
  zone?: number;
  /** The count of pooled resources in each state for the given zone. */
  instanceCountsByState: PoolResourceStateCount[];
}

/** The response of a StandbyVirtualMachinePoolRuntimeViewResource list operation. */
export interface _StandbyVirtualMachinePoolRuntimeViewResourceListResult {
  /** The StandbyVirtualMachinePoolRuntimeViewResource items on this page */
  value: StandbyVirtualMachinePoolRuntimeViewResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface StandbyVirtualMachineResource extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: StandbyVirtualMachineResourceProperties;
}

/** Details of the StandbyVirtualMachine. */
export interface StandbyVirtualMachineResourceProperties {
  /** Resource id of the virtual machine. */
  virtualMachineResourceId: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

/** The response of a StandbyVirtualMachineResource list operation. */
export interface _StandbyVirtualMachineResourceListResult {
  /** The StandbyVirtualMachineResource items on this page */
  value: StandbyVirtualMachineResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** A StandbyVirtualMachinePoolResource. */
export interface StandbyVirtualMachinePoolResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: StandbyVirtualMachinePoolResourceProperties;
}

export function standbyVirtualMachinePoolResourceSerializer(
  item: StandbyVirtualMachinePoolResource,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
    properties: !item.properties
      ? item.properties
      : standbyVirtualMachinePoolResourcePropertiesSerializer(item.properties),
  };
}

/** Details of the StandbyVirtualMachinePool. */
export interface StandbyVirtualMachinePoolResourceProperties {
  /** Specifies the elasticity profile of the standby virtual machine pools. */
  elasticityProfile?: StandbyVirtualMachinePoolElasticityProfile;
  /** Specifies the desired state of virtual machines in the pool. */
  virtualMachineState: VirtualMachineState;
  /** Specifies the fully qualified resource ID of a virtual machine scale set the pool is attached to. */
  attachedVirtualMachineScaleSetId?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function standbyVirtualMachinePoolResourcePropertiesSerializer(
  item: StandbyVirtualMachinePoolResourceProperties,
): Record<string, unknown> {
  return {
    elasticityProfile: !item.elasticityProfile
      ? item.elasticityProfile
      : standbyVirtualMachinePoolElasticityProfileSerializer(
          item.elasticityProfile,
        ),
    virtualMachineState: item["virtualMachineState"],
    attachedVirtualMachineScaleSetId: item["attachedVirtualMachineScaleSetId"],
  };
}

/** Details of the elasticity profile. */
export interface StandbyVirtualMachinePoolElasticityProfile {
  /** Specifies the maximum number of virtual machines in the standby virtual machine pool. */
  maxReadyCapacity: number;
  /** Specifies the desired minimum number of virtual machines in the standby virtual machine pool. MinReadyCapacity cannot exceed MaxReadyCapacity. */
  minReadyCapacity?: number;
}

export function standbyVirtualMachinePoolElasticityProfileSerializer(
  item: StandbyVirtualMachinePoolElasticityProfile,
): Record<string, unknown> {
  return {
    maxReadyCapacity: item["maxReadyCapacity"],
    minReadyCapacity: item["minReadyCapacity"],
  };
}

/** Known values of {@link VirtualMachineState} that the service accepts. */
export enum KnownVirtualMachineState {
  /** Running */
  Running = "Running",
  /** Deallocated */
  Deallocated = "Deallocated",
}

/**
 * State of standby virtual machines \
 * {@link KnownVirtualMachineState} can be used interchangeably with VirtualMachineState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running** \
 * **Deallocated**
 */
export type VirtualMachineState = string;

/** The type used for update operations of the StandbyVirtualMachinePoolResource. */
export interface StandbyVirtualMachinePoolResourceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: StandbyVirtualMachinePoolResourceUpdateProperties;
}

export function standbyVirtualMachinePoolResourceUpdateSerializer(
  item: StandbyVirtualMachinePoolResourceUpdate,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    properties: !item.properties
      ? item.properties
      : standbyVirtualMachinePoolResourceUpdatePropertiesSerializer(
          item.properties,
        ),
  };
}

/** The updatable properties of the StandbyVirtualMachinePoolResource. */
export interface StandbyVirtualMachinePoolResourceUpdateProperties {
  /** Specifies the elasticity profile of the standby virtual machine pools. */
  elasticityProfile?: StandbyVirtualMachinePoolElasticityProfile;
  /** Specifies the desired state of virtual machines in the pool. */
  virtualMachineState?: VirtualMachineState;
  /** Specifies the fully qualified resource ID of a virtual machine scale set the pool is attached to. */
  attachedVirtualMachineScaleSetId?: string;
}

export function standbyVirtualMachinePoolResourceUpdatePropertiesSerializer(
  item: StandbyVirtualMachinePoolResourceUpdateProperties,
): Record<string, unknown> {
  return {
    elasticityProfile: !item.elasticityProfile
      ? item.elasticityProfile
      : standbyVirtualMachinePoolElasticityProfileSerializer(
          item.elasticityProfile,
        ),
    virtualMachineState: item["virtualMachineState"],
    attachedVirtualMachineScaleSetId: item["attachedVirtualMachineScaleSetId"],
  };
}

/** The response of a StandbyVirtualMachinePoolResource list operation. */
export interface _StandbyVirtualMachinePoolResourceListResult {
  /** The StandbyVirtualMachinePoolResource items on this page */
  value: StandbyVirtualMachinePoolResource[];
  /** The link to the next page of items */
  nextLink?: string;
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
  readonly display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionType;
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
/** Supported API Versions for Microsoft.StandbyPool */
export type Versions =
  | "2023-12-01-preview"
  | "2024-03-01-preview"
  | "2024-03-01";
/** Alias for ProvisioningState */
export type ProvisioningState = string | ResourceProvisioningState | "Deleting";
