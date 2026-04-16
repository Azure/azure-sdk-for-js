// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A Storage Discovery Workspace resource. This resource configures the collection of storage account metrics. */
export interface StorageDiscoveryWorkspace extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: StorageDiscoveryWorkspaceProperties;
}

export function storageDiscoveryWorkspaceSerializer(item: StorageDiscoveryWorkspace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : storageDiscoveryWorkspacePropertiesSerializer(item["properties"]),
  };
}

export function storageDiscoveryWorkspaceDeserializer(item: any): StorageDiscoveryWorkspace {
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
      : storageDiscoveryWorkspacePropertiesDeserializer(item["properties"]),
  };
}

/** Storage Discovery Workspace Properties */
export interface StorageDiscoveryWorkspaceProperties {
  /** The storage discovery sku */
  sku?: StorageDiscoverySku;
  /** The description of the storage discovery workspace */
  description?: string;
  /** The view level storage discovery data estate */
  workspaceRoots: string[];
  /** The scopes of the storage discovery workspace. */
  scopes: StorageDiscoveryScope[];
  /** The status of the last operation. */
  readonly provisioningState?: ResourceProvisioningState;
}

export function storageDiscoveryWorkspacePropertiesSerializer(
  item: StorageDiscoveryWorkspaceProperties,
): any {
  return {
    sku: item["sku"],
    description: item["description"],
    workspaceRoots: item["workspaceRoots"].map((p: any) => {
      return p;
    }),
    scopes: storageDiscoveryScopeArraySerializer(item["scopes"]),
  };
}

export function storageDiscoveryWorkspacePropertiesDeserializer(
  item: any,
): StorageDiscoveryWorkspaceProperties {
  return {
    sku: item["sku"],
    description: item["description"],
    workspaceRoots: item["workspaceRoots"].map((p: any) => {
      return p;
    }),
    scopes: storageDiscoveryScopeArrayDeserializer(item["scopes"]),
    provisioningState: item["provisioningState"],
  };
}

/** Storage Discovery Sku */
export enum KnownStorageDiscoverySku {
  /** Standard Sku */
  Standard = "Standard",
  /** Free Sku */
  Free = "Free",
}

/**
 * Storage Discovery Sku \
 * {@link KnownStorageDiscoverySku} can be used interchangeably with StorageDiscoverySku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: Standard Sku \
 * **Free**: Free Sku
 */
export type StorageDiscoverySku = string;

export function storageDiscoveryScopeArraySerializer(result: Array<StorageDiscoveryScope>): any[] {
  return result.map((item) => {
    return storageDiscoveryScopeSerializer(item);
  });
}

export function storageDiscoveryScopeArrayDeserializer(
  result: Array<StorageDiscoveryScope>,
): any[] {
  return result.map((item) => {
    return storageDiscoveryScopeDeserializer(item);
  });
}

/** Storage Discovery Scope. This had added validations */
export interface StorageDiscoveryScope {
  /** Display name of the collection */
  displayName: string;
  /** Resource types for the collection */
  resourceTypes: StorageDiscoveryResourceType[];
  /** The storage account tags keys to filter */
  tagKeysOnly?: string[];
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function storageDiscoveryScopeSerializer(item: StorageDiscoveryScope): any {
  return {
    displayName: item["displayName"],
    resourceTypes: item["resourceTypes"].map((p: any) => {
      return p;
    }),
    tagKeysOnly: !item["tagKeysOnly"]
      ? item["tagKeysOnly"]
      : item["tagKeysOnly"].map((p: any) => {
          return p;
        }),
    tags: item["tags"],
  };
}

export function storageDiscoveryScopeDeserializer(item: any): StorageDiscoveryScope {
  return {
    displayName: item["displayName"],
    resourceTypes: item["resourceTypes"].map((p: any) => {
      return p;
    }),
    tagKeysOnly: !item["tagKeysOnly"]
      ? item["tagKeysOnly"]
      : item["tagKeysOnly"].map((p: any) => {
          return p;
        }),
    tags: item["tags"],
  };
}

/** Storage Discovery Resource Type */
export enum KnownStorageDiscoveryResourceType {
  /** Storage Account Resource Type */
  StorageAccounts = "Microsoft.Storage/storageAccounts",
}

/**
 * Storage Discovery Resource Type \
 * {@link KnownStorageDiscoveryResourceType} can be used interchangeably with StorageDiscoveryResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.Storage\/storageAccounts**: Storage Account Resource Type
 */
export type StorageDiscoveryResourceType = string;

/** The provisioning state of a resource type. */
export enum KnownResourceProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of a resource type. \
 * {@link KnownResourceProvisioningState} can be used interchangeably with ResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled.
 */
export type ResourceProvisioningState = string;

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

/** The template for adding updateable properties. */
export interface StorageDiscoveryWorkspaceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: StorageDiscoveryWorkspacePropertiesUpdate;
}

export function storageDiscoveryWorkspaceUpdateSerializer(
  item: StorageDiscoveryWorkspaceUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : storageDiscoveryWorkspacePropertiesUpdateSerializer(item["properties"]),
  };
}

/** The template for adding updateable properties. */
export interface StorageDiscoveryWorkspacePropertiesUpdate {
  /** The storage discovery sku */
  sku?: StorageDiscoverySku;
  /** The description of the storage discovery workspace */
  description?: string;
  /** The view level storage discovery data estate */
  workspaceRoots?: string[];
  /** The scopes of the storage discovery workspace. */
  scopes?: StorageDiscoveryScope[];
}

export function storageDiscoveryWorkspacePropertiesUpdateSerializer(
  item: StorageDiscoveryWorkspacePropertiesUpdate,
): any {
  return {
    sku: item["sku"],
    description: item["description"],
    workspaceRoots: !item["workspaceRoots"]
      ? item["workspaceRoots"]
      : item["workspaceRoots"].map((p: any) => {
          return p;
        }),
    scopes: !item["scopes"] ? item["scopes"] : storageDiscoveryScopeArraySerializer(item["scopes"]),
  };
}

/** The response of a StorageDiscoveryWorkspace list operation. */
export interface _StorageDiscoveryWorkspaceListResult {
  /** The StorageDiscoveryWorkspace items on this page */
  value: StorageDiscoveryWorkspace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storageDiscoveryWorkspaceListResultDeserializer(
  item: any,
): _StorageDiscoveryWorkspaceListResult {
  return {
    value: storageDiscoveryWorkspaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageDiscoveryWorkspaceArraySerializer(
  result: Array<StorageDiscoveryWorkspace>,
): any[] {
  return result.map((item) => {
    return storageDiscoveryWorkspaceSerializer(item);
  });
}

export function storageDiscoveryWorkspaceArrayDeserializer(
  result: Array<StorageDiscoveryWorkspace>,
): any[] {
  return result.map((item) => {
    return storageDiscoveryWorkspaceDeserializer(item);
  });
}

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

/** Known values of {@link ApiVersion} that the service accepts. */
export enum KnownApiVersion {
  /** 2025-09-01 */
  V20250901 = "2025-09-01",
}
