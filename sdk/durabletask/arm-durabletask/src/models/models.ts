// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A Task Hub resource belonging to the scheduler */
export interface TaskHub extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: TaskHubProperties;
}

export function taskHubSerializer(item: TaskHub): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : taskHubPropertiesSerializer(item["properties"]),
  };
}

export function taskHubDeserializer(item: any): TaskHub {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : taskHubPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of Task Hub */
export interface TaskHubProperties {
  /** The status of the last operation */
  readonly provisioningState?: ProvisioningState;
  /** URL of the durable task scheduler dashboard */
  readonly dashboardUrl?: string;
}

export function taskHubPropertiesSerializer(item: TaskHubProperties): any {
  return item;
}

export function taskHubPropertiesDeserializer(item: any): TaskHubProperties {
  return {
    provisioningState: item["provisioningState"],
    dashboardUrl: item["dashboardUrl"],
  };
}

/** The status of the current operation */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource is being provisioned */
  Provisioning = "Provisioning",
  /** The resource is updating */
  Updating = "Updating",
  /** The resource is being deleted */
  Deleting = "Deleting",
  /** The resource create request has been accepted */
  Accepted = "Accepted",
}

/**
 * The status of the current operation \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: The resource is being provisioned \
 * **Updating**: The resource is updating \
 * **Deleting**: The resource is being deleted \
 * **Accepted**: The resource create request has been accepted
 */
export type ProvisioningState = string;

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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
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

/** The response of a TaskHub list operation. */
export interface _TaskHubListResult {
  /** The TaskHub items on this page */
  value: TaskHub[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _taskHubListResultDeserializer(item: any): _TaskHubListResult {
  return {
    value: taskHubArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function taskHubArraySerializer(result: Array<TaskHub>): any[] {
  return result.map((item) => {
    return taskHubSerializer(item);
  });
}

export function taskHubArrayDeserializer(result: Array<TaskHub>): any[] {
  return result.map((item) => {
    return taskHubDeserializer(item);
  });
}

/** A Durable Task Scheduler resource */
export interface Scheduler extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SchedulerProperties;
}

export function schedulerSerializer(item: Scheduler): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : schedulerPropertiesSerializer(item["properties"]),
  };
}

export function schedulerDeserializer(item: any): Scheduler {
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
      : schedulerPropertiesDeserializer(item["properties"]),
  };
}

/** Details of the Scheduler */
export interface SchedulerProperties {
  /** The status of the last operation */
  readonly provisioningState?: ProvisioningState;
  /** URL of the durable task scheduler */
  readonly endpoint?: string;
  /** IP allow list for durable task scheduler. Values can be IPv4, IPv6 or CIDR */
  ipAllowlist: string[];
  /** SKU of the durable task scheduler */
  sku: SchedulerSku;
}

export function schedulerPropertiesSerializer(item: SchedulerProperties): any {
  return {
    ipAllowlist: item["ipAllowlist"].map((p: any) => {
      return p;
    }),
    sku: schedulerSkuSerializer(item["sku"]),
  };
}

export function schedulerPropertiesDeserializer(item: any): SchedulerProperties {
  return {
    provisioningState: item["provisioningState"],
    endpoint: item["endpoint"],
    ipAllowlist: item["ipAllowlist"].map((p: any) => {
      return p;
    }),
    sku: schedulerSkuDeserializer(item["sku"]),
  };
}

/** The SKU (Stock Keeping Unit) assigned to this durable task scheduler */
export interface SchedulerSku {
  /** The name of the SKU */
  name: string;
  /** The SKU capacity. This allows scale out/in for the resource and impacts zone redundancy */
  capacity?: number;
  /** Indicates whether the current SKU configuration is zone redundant */
  readonly redundancyState?: RedundancyState;
}

export function schedulerSkuSerializer(item: SchedulerSku): any {
  return { name: item["name"], capacity: item["capacity"] };
}

export function schedulerSkuDeserializer(item: any): SchedulerSku {
  return {
    name: item["name"],
    capacity: item["capacity"],
    redundancyState: item["redundancyState"],
  };
}

/** The state of the resource redundancy */
export enum KnownRedundancyState {
  /** The resource is not redundant */
  None = "None",
  /** The resource is zone redundant */
  Zone = "Zone",
}

/**
 * The state of the resource redundancy \
 * {@link KnownRedundancyState} can be used interchangeably with RedundancyState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: The resource is not redundant \
 * **Zone**: The resource is zone redundant
 */
export type RedundancyState = string;

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

/** The response of a Scheduler list operation. */
export interface _SchedulerListResult {
  /** The Scheduler items on this page */
  value: Scheduler[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schedulerListResultDeserializer(item: any): _SchedulerListResult {
  return {
    value: schedulerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function schedulerArraySerializer(result: Array<Scheduler>): any[] {
  return result.map((item) => {
    return schedulerSerializer(item);
  });
}

export function schedulerArrayDeserializer(result: Array<Scheduler>): any[] {
  return result.map((item) => {
    return schedulerDeserializer(item);
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

/** API Versions */
export enum KnownVersions {
  /** 2024-10-01-preview */
  V20241001Preview = "2024-10-01-preview",
}
