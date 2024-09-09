// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../helpers/serializerHelpers.js";

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
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
  };
}

/** Fabric Capacity resource */
export interface FabricCapacity extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties: FabricCapacityProperties;
  /** The SKU details */
  sku: RpSku;
}

export function fabricCapacitySerializer(
  item: FabricCapacity,
): Record<string, unknown> {
  return {
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    location: item["location"],
    properties: fabricCapacityPropertiesSerializer(item.properties),
    sku: rpSkuSerializer(item.sku),
  };
}

/** The Microsoft Fabric capacity properties. */
export interface FabricCapacityProperties {
  /** The current deployment state of Microsoft Fabric resource. The provisioningState is to indicate states for resource provisioning. */
  readonly provisioningState?: ProvisioningState;
  /** The current state of Microsoft Fabric resource. The state is to indicate more states outside of resource provisioning. */
  readonly state?: ResourceState;
  /** The capacity administration */
  administration: CapacityAdministration;
}

export function fabricCapacityPropertiesSerializer(
  item: FabricCapacityProperties,
): Record<string, unknown> {
  return {
    administration: capacityAdministrationSerializer(item.administration),
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

/** Known values of {@link ResourceState} that the service accepts. */
export enum KnownResourceState {
  /** Active */
  Active = "Active",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Failed */
  Failed = "Failed",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Suspending */
  Suspending = "Suspending",
  /** Suspended */
  Suspended = "Suspended",
  /** Pausing */
  Pausing = "Pausing",
  /** Paused */
  Paused = "Paused",
  /** Resuming */
  Resuming = "Resuming",
  /** Scaling */
  Scaling = "Scaling",
  /** Preparing */
  Preparing = "Preparing",
}

/**
 * The state of the Fabric capacity resource. \
 * {@link KnownResourceState} can be used interchangeably with ResourceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active** \
 * **Provisioning** \
 * **Failed** \
 * **Updating** \
 * **Deleting** \
 * **Suspending** \
 * **Suspended** \
 * **Pausing** \
 * **Paused** \
 * **Resuming** \
 * **Scaling** \
 * **Preparing**
 */
export type ResourceState = string;

/** The administration properties of the Fabric capacity resource */
export interface CapacityAdministration {
  /** An array of administrator user identities. */
  members: string[];
}

export function capacityAdministrationSerializer(
  item: CapacityAdministration,
): Record<string, unknown> {
  return {
    members: item["members"],
  };
}

/** Represents the SKU name and Azure pricing tier for Microsoft Fabric capacity resource. */
export interface RpSku {
  /** The name of the SKU level. */
  name: string;
  /** The name of the Azure pricing tier to which the SKU applies. */
  tier: RpSkuTier;
}

export function rpSkuSerializer(item: RpSku): Record<string, unknown> {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** Known values of {@link RpSkuTier} that the service accepts. */
export enum KnownRpSkuTier {
  /** fabric */
  fabric = "Fabric",
}

/**
 * The name of the Azure pricing tier to which the SKU applies. \
 * {@link KnownRpSkuTier} can be used interchangeably with RpSkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Fabric**
 */
export type RpSkuTier = string;

/** The type used for update operations of the FabricCapacity. */
export interface FabricCapacityUpdate {
  /** The SKU details */
  sku?: RpSku;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: FabricCapacityUpdateProperties;
}

export function fabricCapacityUpdateSerializer(
  item: FabricCapacityUpdate,
): Record<string, unknown> {
  return {
    sku: !item.sku ? item.sku : rpSkuSerializer(item.sku),
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    properties: !item.properties
      ? item.properties
      : fabricCapacityUpdatePropertiesSerializer(item.properties),
  };
}

/** The updatable properties of the FabricCapacity. */
export interface FabricCapacityUpdateProperties {
  /** The capacity administration */
  administration?: CapacityAdministration;
}

export function fabricCapacityUpdatePropertiesSerializer(
  item: FabricCapacityUpdateProperties,
): Record<string, unknown> {
  return {
    administration: !item.administration
      ? item.administration
      : capacityAdministrationSerializer(item.administration),
  };
}

/** The response of a FabricCapacity list operation. */
export interface _FabricCapacityListResult {
  /** The FabricCapacity items on this page */
  value: FabricCapacity[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** The check availability request body. */
export interface CheckNameAvailabilityRequest {
  /** The name of the resource for which availability needs to be checked. */
  name?: string;
  /** The resource type. */
  type?: string;
}

export function checkNameAvailabilityRequestSerializer(
  item: CheckNameAvailabilityRequest,
): Record<string, unknown> {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The check availability result. */
export interface CheckNameAvailabilityResponse {
  /** Indicates if the resource name is available. */
  nameAvailable?: boolean;
  /** The reason why the given name is not available. */
  reason?: CheckNameAvailabilityReason;
  /** Detailed reason why the given name is not available. */
  message?: string;
}

/** Known values of {@link CheckNameAvailabilityReason} that the service accepts. */
export enum KnownCheckNameAvailabilityReason {
  /** Invalid */
  Invalid = "Invalid",
  /** AlreadyExists */
  AlreadyExists = "AlreadyExists",
}

/**
 * Possible reasons for a name not being available. \
 * {@link KnownCheckNameAvailabilityReason} can be used interchangeably with CheckNameAvailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **AlreadyExists**
 */
export type CheckNameAvailabilityReason = string;

/** An object that represents enumerating SKUs for existing resources */
export interface _RpSkuEnumerationForExistingResourceResult {
  /** The SKU details */
  value: RpSkuDetailsForExistingResource[];
  /** Url for the next page.  Null if no more pages available */
  nextLink?: string;
}

/** An object that represents SKU details for existing resources */
export interface RpSkuDetailsForExistingResource {
  /** The resource type */
  resourceType: string;
  /** The SKU details */
  sku: RpSku;
}

/** An object that represents enumerating SKUs for new resources. */
export interface _RpSkuEnumerationForNewResourceResult {
  /** The collection of available SKUs for new resources */
  value: RpSkuDetailsForNewResource[];
  /** Url for the next page.  Null if no more pages available */
  nextLink?: string;
}

/** The SKU details */
export interface RpSkuDetailsForNewResource {
  /** The resource type */
  resourceType: string;
  /** The SKU's name */
  name: string;
  /** The list of available locations for the SKU */
  locations: string[];
}

/** The available API versions. */
export type Versions = "2023-11-01";
/** Alias for ProvisioningState */
export type ProvisioningState =
  | ResourceProvisioningState
  | "Deleting"
  | "Provisioning"
  | "Updating"
  | string;
