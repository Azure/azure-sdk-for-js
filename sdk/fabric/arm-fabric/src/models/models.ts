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

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Fabric Capacity resource */
export interface FabricCapacity extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties: FabricCapacityProperties;
  /** The SKU details */
  sku: RpSku;
}

export function fabricCapacitySerializer(item: FabricCapacity): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: fabricCapacityPropertiesSerializer(item["properties"]),
    sku: rpSkuSerializer(item["sku"]),
  };
}

export function fabricCapacityDeserializer(item: any): FabricCapacity {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: fabricCapacityPropertiesDeserializer(item["properties"]),
    sku: rpSkuDeserializer(item["sku"]),
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

export function fabricCapacityPropertiesSerializer(item: FabricCapacityProperties): any {
  return {
    administration: capacityAdministrationSerializer(item["administration"]),
  };
}

export function fabricCapacityPropertiesDeserializer(item: any): FabricCapacityProperties {
  return {
    provisioningState: !item["provisioningState"]
      ? item["provisioningState"]
      : provisioningStateDeserializer(item["provisioningState"]),
    state: item["state"],
    administration: capacityAdministrationDeserializer(item["administration"]),
  };
}

/** Known values of {@link ProvisioningState} that the service accepts. */
export enum KnownProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleting */
  Deleting = "Deleting",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Updating */
  Updating = "Updating",
}

/**
 * The provisioning state of a resource type. \
 * {@link KnownProvisioningState} can be used interchangeably with ResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Deleting** \
 * **Provisioning** \
 * **Updating**
 */
/** Alias for ProvisioningState */
export type ProvisioningState = string;
export function provisioningStateSerializer(item: ProvisioningState): any {
  return item;
}

export function provisioningStateDeserializer(item: any): ProvisioningState {
  return item;
}

/** The state of the Fabric capacity resource. */
export enum KnownResourceState {
  /** Resource is active */
  Active = "Active",
  /** Resource is provisioning */
  Provisioning = "Provisioning",
  /** Resource is failed */
  Failed = "Failed",
  /** Resource is updating */
  Updating = "Updating",
  /** Resource is deleting */
  Deleting = "Deleting",
  /** Resource is suspending */
  Suspending = "Suspending",
  /** Resource is suspended */
  Suspended = "Suspended",
  /** Resource is pausing */
  Pausing = "Pausing",
  /** Resource is paused */
  Paused = "Paused",
  /** Resource is resuming */
  Resuming = "Resuming",
  /** Resource is scaling */
  Scaling = "Scaling",
  /** Resource is preparing */
  Preparing = "Preparing",
}

/**
 * The state of the Fabric capacity resource. \
 * {@link KnownResourceState} can be used interchangeably with ResourceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Resource is active \
 * **Provisioning**: Resource is provisioning \
 * **Failed**: Resource is failed \
 * **Updating**: Resource is updating \
 * **Deleting**: Resource is deleting \
 * **Suspending**: Resource is suspending \
 * **Suspended**: Resource is suspended \
 * **Pausing**: Resource is pausing \
 * **Paused**: Resource is paused \
 * **Resuming**: Resource is resuming \
 * **Scaling**: Resource is scaling \
 * **Preparing**: Resource is preparing
 */
export type ResourceState = string;

/** The administration properties of the Fabric capacity resource */
export interface CapacityAdministration {
  /** An array of administrator user identities. */
  members: string[];
}

export function capacityAdministrationSerializer(item: CapacityAdministration): any {
  return {
    members: item["members"].map((p: any) => {
      return p;
    }),
  };
}

export function capacityAdministrationDeserializer(item: any): CapacityAdministration {
  return {
    members: item["members"].map((p: any) => {
      return p;
    }),
  };
}

/** Represents the SKU name and Azure pricing tier for Microsoft Fabric capacity resource. */
export interface RpSku {
  /** The name of the SKU level. */
  name: string;
  /** The name of the Azure pricing tier to which the SKU applies. */
  tier: RpSkuTier;
}

export function rpSkuSerializer(item: RpSku): any {
  return { name: item["name"], tier: item["tier"] };
}

export function rpSkuDeserializer(item: any): RpSku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** The name of the Azure pricing tier to which the SKU applies. */
export enum KnownRpSkuTier {
  /** Fabric tier */
  Fabric = "Fabric",
}

/**
 * The name of the Azure pricing tier to which the SKU applies. \
 * {@link KnownRpSkuTier} can be used interchangeably with RpSkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Fabric**: Fabric tier
 */
export type RpSkuTier = string;

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

/** The type used for update operations of the FabricCapacity. */
export interface FabricCapacityUpdate {
  /** The SKU details */
  sku?: RpSku;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: FabricCapacityUpdateProperties;
}

export function fabricCapacityUpdateSerializer(item: FabricCapacityUpdate): any {
  return {
    sku: !item["sku"] ? item["sku"] : rpSkuSerializer(item["sku"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : fabricCapacityUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the FabricCapacity. */
export interface FabricCapacityUpdateProperties {
  /** The capacity administration */
  administration?: CapacityAdministration;
}

export function fabricCapacityUpdatePropertiesSerializer(
  item: FabricCapacityUpdateProperties,
): any {
  return {
    administration: !item["administration"]
      ? item["administration"]
      : capacityAdministrationSerializer(item["administration"]),
  };
}

/** The response of a FabricCapacity list operation. */
export interface _FabricCapacityListResult {
  /** The FabricCapacity items on this page */
  value: FabricCapacity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fabricCapacityListResultDeserializer(item: any): _FabricCapacityListResult {
  return {
    value: fabricCapacityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fabricCapacityArraySerializer(result: Array<FabricCapacity>): any[] {
  return result.map((item) => {
    return fabricCapacitySerializer(item);
  });
}

export function fabricCapacityArrayDeserializer(result: Array<FabricCapacity>): any[] {
  return result.map((item) => {
    return fabricCapacityDeserializer(item);
  });
}

/** The check availability request body. */
export interface CheckNameAvailabilityRequest {
  /** The name of the resource for which availability needs to be checked. */
  name?: string;
  /** The resource type. */
  type?: string;
}

export function checkNameAvailabilityRequestSerializer(item: CheckNameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
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

export function checkNameAvailabilityResponseDeserializer(
  item: any,
): CheckNameAvailabilityResponse {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Possible reasons for a name not being available. */
export enum KnownCheckNameAvailabilityReason {
  /** Name is invalid. */
  Invalid = "Invalid",
  /** Name already exists. */
  AlreadyExists = "AlreadyExists",
}

/**
 * Possible reasons for a name not being available. \
 * {@link KnownCheckNameAvailabilityReason} can be used interchangeably with CheckNameAvailabilityReason,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Name is invalid. \
 * **AlreadyExists**: Name already exists.
 */
export type CheckNameAvailabilityReason = string;

/** An object that represents enumerating SKUs for existing resources */
export interface _RpSkuEnumerationForExistingResourceResult {
  /** The SKU details */
  value: RpSkuDetailsForExistingResource[];
  /** Url for the next page.  Null if no more pages available */
  nextLink?: string;
}

export function _rpSkuEnumerationForExistingResourceResultDeserializer(
  item: any,
): _RpSkuEnumerationForExistingResourceResult {
  return {
    value: rpSkuDetailsForExistingResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** An object that represents SKU details for existing resources */
export interface RpSkuDetailsForExistingResource {
  /** The resource type */
  resourceType: string;
  /** The SKU details */
  sku: RpSku;
}

export function rpSkuDetailsForExistingResourceDeserializer(
  item: any,
): RpSkuDetailsForExistingResource {
  return {
    resourceType: item["resourceType"],
    sku: rpSkuDeserializer(item["sku"]),
  };
}

export function rpSkuDetailsForExistingResourceArrayDeserializer(
  result: Array<RpSkuDetailsForExistingResource>,
): any[] {
  return result.map((item) => {
    return rpSkuDetailsForExistingResourceDeserializer(item);
  });
}

/** An object that represents enumerating SKUs for new resources. */
export interface _RpSkuEnumerationForNewResourceResult {
  /** The collection of available SKUs for new resources */
  value: RpSkuDetailsForNewResource[];
  /** Url for the next page.  Null if no more pages available */
  nextLink?: string;
}

export function _rpSkuEnumerationForNewResourceResultDeserializer(
  item: any,
): _RpSkuEnumerationForNewResourceResult {
  return {
    value: rpSkuDetailsForNewResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
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

export function rpSkuDetailsForNewResourceDeserializer(item: any): RpSkuDetailsForNewResource {
  return {
    resourceType: item["resourceType"],
    name: item["name"],
    locations: item["locations"].map((p: any) => {
      return p;
    }),
  };
}

export function rpSkuDetailsForNewResourceArrayDeserializer(
  result: Array<RpSkuDetailsForNewResource>,
): any[] {
  return result.map((item) => {
    return rpSkuDetailsForNewResourceDeserializer(item);
  });
}
