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

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface FileSystemResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: FileSystemResourceProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function fileSystemResourceSerializer(item: FileSystemResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : fileSystemResourcePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function fileSystemResourceDeserializer(item: any): FileSystemResource {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : fileSystemResourcePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties specific to the Qumulo File System resource */
export interface FileSystemResourceProperties {
  /** Marketplace details */
  marketplaceDetails: MarketplaceDetails;
  /** Provisioning State of the resource */
  readonly provisioningState?: ProvisioningState;
  /** Storage Sku */
  storageSku: string;
  /** User Details */
  userDetails: UserDetails;
  /** Delegated subnet id for Vnet injection */
  delegatedSubnetId: string;
  /** Pre-Provisioned Performance of the Resource */
  performanceTier?: string;
  /** File system Id of the resource */
  clusterLoginUrl?: string;
  /** Private IPs of the resource */
  privateIPs?: string[];
  /** Initial administrator password of the resource */
  adminPassword: string;
  /** Availability zone */
  availabilityZone?: string;
}

export function fileSystemResourcePropertiesSerializer(item: FileSystemResourceProperties): any {
  return {
    marketplaceDetails: marketplaceDetailsSerializer(item["marketplaceDetails"]),
    storageSku: item["storageSku"],
    userDetails: userDetailsSerializer(item["userDetails"]),
    delegatedSubnetId: item["delegatedSubnetId"],
    performanceTier: item["performanceTier"],
    clusterLoginUrl: item["clusterLoginUrl"],
    privateIPs: !item["privateIPs"]
      ? item["privateIPs"]
      : item["privateIPs"].map((p: any) => {
          return p;
        }),
    adminPassword: item["adminPassword"],
    availabilityZone: item["availabilityZone"],
  };
}

export function fileSystemResourcePropertiesDeserializer(item: any): FileSystemResourceProperties {
  return {
    marketplaceDetails: marketplaceDetailsDeserializer(item["marketplaceDetails"]),
    provisioningState: item["provisioningState"],
    storageSku: item["storageSku"],
    userDetails: userDetailsDeserializer(item["userDetails"]),
    delegatedSubnetId: item["delegatedSubnetId"],
    performanceTier: item["performanceTier"],
    clusterLoginUrl: item["clusterLoginUrl"],
    privateIPs: !item["privateIPs"]
      ? item["privateIPs"]
      : item["privateIPs"].map((p: any) => {
          return p;
        }),
    adminPassword: item["adminPassword"],
    availabilityZone: item["availabilityZone"],
  };
}

/** MarketplaceDetails of Qumulo FileSystem resource */
export interface MarketplaceDetails {
  /** Marketplace Subscription Id */
  marketplaceSubscriptionId?: string;
  /** Plan Id */
  planId: string;
  /** Offer Id */
  offerId: string;
  /** Publisher Id */
  publisherId?: string;
  /** Term Unit */
  termUnit?: string;
  /** Marketplace subscription status */
  readonly marketplaceSubscriptionStatus?: MarketplaceSubscriptionStatus;
}

export function marketplaceDetailsSerializer(item: MarketplaceDetails): any {
  return {
    marketplaceSubscriptionId: item["marketplaceSubscriptionId"],
    planId: item["planId"],
    offerId: item["offerId"],
    publisherId: item["publisherId"],
    termUnit: item["termUnit"],
  };
}

export function marketplaceDetailsDeserializer(item: any): MarketplaceDetails {
  return {
    marketplaceSubscriptionId: item["marketplaceSubscriptionId"],
    planId: item["planId"],
    offerId: item["offerId"],
    publisherId: item["publisherId"],
    termUnit: item["termUnit"],
    marketplaceSubscriptionStatus: item["marketplaceSubscriptionStatus"],
  };
}

/** Marketplace subscription status of the file system resource */
export enum KnownMarketplaceSubscriptionStatus {
  /** Fulfillment has not started */
  PendingFulfillmentStart = "PendingFulfillmentStart",
  /** Marketplace offer is subscribed */
  Subscribed = "Subscribed",
  /** Marketplace offer is suspended because of non payment */
  Suspended = "Suspended",
  /** Marketplace offer is unsubscribed */
  Unsubscribed = "Unsubscribed",
}

/**
 * Marketplace subscription status of the file system resource \
 * {@link KnownMarketplaceSubscriptionStatus} can be used interchangeably with MarketplaceSubscriptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PendingFulfillmentStart**: Fulfillment has not started \
 * **Subscribed**: Marketplace offer is subscribed \
 * **Suspended**: Marketplace offer is suspended because of non payment \
 * **Unsubscribed**: Marketplace offer is unsubscribed
 */
export type MarketplaceSubscriptionStatus = string;

/** Provisioning State of the File system resource */
export enum KnownProvisioningState {
  /** File system resource creation request accepted */
  Accepted = "Accepted",
  /** File system resource creation started */
  Creating = "Creating",
  /** File system resource is being updated */
  Updating = "Updating",
  /** File system resource deletion started */
  Deleting = "Deleting",
  /** File system resource creation successful */
  Succeeded = "Succeeded",
  /** File system resource creation failed */
  Failed = "Failed",
  /** File system resource creation canceled */
  Canceled = "Canceled",
  /** File system resource is deleted */
  Deleted = "Deleted",
}

/**
 * Provisioning State of the File system resource \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: File system resource creation request accepted \
 * **Creating**: File system resource creation started \
 * **Updating**: File system resource is being updated \
 * **Deleting**: File system resource deletion started \
 * **Succeeded**: File system resource creation successful \
 * **Failed**: File system resource creation failed \
 * **Canceled**: File system resource creation canceled \
 * **Deleted**: File system resource is deleted
 */
export type ProvisioningState = string;

/** User Details of Qumulo FileSystem resource */
export interface UserDetails {
  /** User Email */
  email: string;
}

export function userDetailsSerializer(item: UserDetails): any {
  return { email: item["email"] };
}

export function userDetailsDeserializer(item: any): UserDetails {
  return {
    email: item["email"],
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
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
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

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
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

export function resourceSerializer(_item: Resource): any {
  return {};
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

/** The type used for update operations of the FileSystemResource. */
export interface FileSystemResourceUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The updatable properties of the FileSystemResource. */
  properties?: FileSystemResourceUpdateProperties;
}

export function fileSystemResourceUpdateSerializer(item: FileSystemResourceUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : fileSystemResourceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the FileSystemResource. */
export interface FileSystemResourceUpdateProperties {
  /** Marketplace details */
  marketplaceDetails?: MarketplaceDetails;
  /** User Details */
  userDetails?: UserDetails;
  /** Delegated subnet id for Vnet injection */
  delegatedSubnetId?: string;
  /** Pre-Provisioned Performance of the Resource */
  performanceTier?: string;
}

export function fileSystemResourceUpdatePropertiesSerializer(
  item: FileSystemResourceUpdateProperties,
): any {
  return {
    marketplaceDetails: !item["marketplaceDetails"]
      ? item["marketplaceDetails"]
      : marketplaceDetailsSerializer(item["marketplaceDetails"]),
    userDetails: !item["userDetails"]
      ? item["userDetails"]
      : userDetailsSerializer(item["userDetails"]),
    delegatedSubnetId: item["delegatedSubnetId"],
    performanceTier: item["performanceTier"],
  };
}

/** The response of a FileSystemResource list operation. */
export interface _FileSystemResourceListResult {
  /** The FileSystemResource items on this page */
  value: FileSystemResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fileSystemResourceListResultDeserializer(
  item: any,
): _FileSystemResourceListResult {
  return {
    value: fileSystemResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fileSystemResourceArraySerializer(result: Array<FileSystemResource>): any[] {
  return result.map((item) => {
    return fileSystemResourceSerializer(item);
  });
}

export function fileSystemResourceArrayDeserializer(result: Array<FileSystemResource>): any[] {
  return result.map((item) => {
    return fileSystemResourceDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-02-01 Stable API version. */
  V2Stable = "2024-06-19",
  /** The 2026-04-16 Stable API version. */
  V20260416 = "2026-04-16",
}
