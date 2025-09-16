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
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Playwright workspace resource. */
export interface PlaywrightWorkspace extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: PlaywrightWorkspaceProperties;
}

export function playwrightWorkspaceSerializer(item: PlaywrightWorkspace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : playwrightWorkspacePropertiesSerializer(item["properties"]),
  };
}

export function playwrightWorkspaceDeserializer(item: any): PlaywrightWorkspace {
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
      : playwrightWorkspacePropertiesDeserializer(item["properties"]),
  };
}

/** Playwright workspace resource properties. */
export interface PlaywrightWorkspaceProperties {
  /** The status of the last resource operation. */
  readonly provisioningState?: ProvisioningState;
  /** The workspace data plane service API URI. */
  readonly dataplaneUri?: string;
  /** Controls the connection region for client workers to cloud-hosted browsers. When enabled, workers connect to browsers in the closest Azure region for lower latency. When disabled, workers connect to browsers in the Azure region where the workspace was created. */
  regionalAffinity?: EnablementStatus;
  /** Enables the workspace to use local authentication through service access tokens for operations. */
  localAuth?: EnablementStatus;
  /** The workspace ID in GUID format. */
  readonly workspaceId?: string;
}

export function playwrightWorkspacePropertiesSerializer(item: PlaywrightWorkspaceProperties): any {
  return {
    regionalAffinity: item["regionalAffinity"],
    localAuth: item["localAuth"],
  };
}

export function playwrightWorkspacePropertiesDeserializer(
  item: any,
): PlaywrightWorkspaceProperties {
  return {
    provisioningState: item["provisioningState"],
    dataplaneUri: item["dataplaneUri"],
    regionalAffinity: item["regionalAffinity"],
    localAuth: item["localAuth"],
    workspaceId: item["workspaceId"],
  };
}

/** The status of the last resource operation. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Resource creation is in progress. */
  Creating = "Creating",
  /** Resource deletion is in progress. */
  Deleting = "Deleting",
  /** Request has been accepted for processing. */
  Accepted = "Accepted",
}

/**
 * The status of the last resource operation. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: Resource creation is in progress. \
 * **Deleting**: Resource deletion is in progress. \
 * **Accepted**: Request has been accepted for processing.
 */
export type ProvisioningState = string;

/** The enablement status of a feature. */
export enum KnownEnablementStatus {
  /** The feature is enabled. */
  Enabled = "Enabled",
  /** The feature is disabled. */
  Disabled = "Disabled",
}

/**
 * The enablement status of a feature. \
 * {@link KnownEnablementStatus} can be used interchangeably with EnablementStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: The feature is enabled. \
 * **Disabled**: The feature is disabled.
 */
export type EnablementStatus = string;

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

/** The type used for update operations of the PlaywrightWorkspace. */
export interface PlaywrightWorkspaceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: PlaywrightWorkspaceUpdateProperties;
}

export function playwrightWorkspaceUpdateSerializer(item: PlaywrightWorkspaceUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : playwrightWorkspaceUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the PlaywrightWorkspace. */
export interface PlaywrightWorkspaceUpdateProperties {
  /** Controls the connection region for client workers to cloud-hosted browsers. When enabled, workers connect to browsers in the closest Azure region for lower latency. When disabled, workers connect to browsers in the Azure region where the workspace was created. */
  regionalAffinity?: EnablementStatus;
  /** Enables the workspace to use local authentication through service access tokens for operations. */
  localAuth?: EnablementStatus;
}

export function playwrightWorkspaceUpdatePropertiesSerializer(
  item: PlaywrightWorkspaceUpdateProperties,
): any {
  return {
    regionalAffinity: item["regionalAffinity"],
    localAuth: item["localAuth"],
  };
}

/** The response of a PlaywrightWorkspace list operation. */
export interface _PlaywrightWorkspaceListResult {
  /** The PlaywrightWorkspace items on this page */
  value: PlaywrightWorkspace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _playwrightWorkspaceListResultDeserializer(
  item: any,
): _PlaywrightWorkspaceListResult {
  return {
    value: playwrightWorkspaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function playwrightWorkspaceArraySerializer(result: Array<PlaywrightWorkspace>): any[] {
  return result.map((item) => {
    return playwrightWorkspaceSerializer(item);
  });
}

export function playwrightWorkspaceArrayDeserializer(result: Array<PlaywrightWorkspace>): any[] {
  return result.map((item) => {
    return playwrightWorkspaceDeserializer(item);
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

/** Subscription-level location-based Playwright quota resource. */
export interface PlaywrightQuota extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PlaywrightQuotaProperties;
}

export function playwrightQuotaDeserializer(item: any): PlaywrightQuota {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : playwrightQuotaPropertiesDeserializer(item["properties"]),
  };
}

/** Subscription-level location-based Playwright quota resource properties. */
export interface PlaywrightQuotaProperties {
  /** The subscription-level location-based Playwright quota free trial properties. */
  readonly freeTrial?: FreeTrialProperties;
  /** The status of the last resource operation. */
  readonly provisioningState?: ProvisioningState;
}

export function playwrightQuotaPropertiesDeserializer(item: any): PlaywrightQuotaProperties {
  return {
    freeTrial: !item["freeTrial"]
      ? item["freeTrial"]
      : freeTrialPropertiesDeserializer(item["freeTrial"]),
    provisioningState: item["provisioningState"],
  };
}

/** Subscription-level location-based Playwright quota free trial properties. */
export interface FreeTrialProperties {
  /** The workspace ID in GUID format that has free trial enabled in the subscription. */
  readonly workspaceId: string;
  /** The free trial state. */
  readonly state: FreeTrialState;
}

export function freeTrialPropertiesDeserializer(item: any): FreeTrialProperties {
  return {
    workspaceId: item["workspaceId"],
    state: item["state"],
  };
}

/** The free trial state. */
export enum KnownFreeTrialState {
  /** The free trial is active and available for use. */
  Active = "Active",
  /** The free trial has expired and is no longer available. */
  Expired = "Expired",
  /** The free trial is not applicable for this resource. */
  NotApplicable = "NotApplicable",
}

/**
 * The free trial state. \
 * {@link KnownFreeTrialState} can be used interchangeably with FreeTrialState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: The free trial is active and available for use. \
 * **Expired**: The free trial has expired and is no longer available. \
 * **NotApplicable**: The free trial is not applicable for this resource.
 */
export type FreeTrialState = string;

/** Available Playwright quota types. */
export enum KnownQuotaName {
  /** Quota for execution duration in minutes. */
  ExecutionMinutes = "ExecutionMinutes",
}

/**
 * Available Playwright quota types. \
 * {@link KnownQuotaName} can be used interchangeably with QuotaName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ExecutionMinutes**: Quota for execution duration in minutes.
 */
export type QuotaName = string;

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

/** The response of a PlaywrightQuota list operation. */
export interface _PlaywrightQuotaListResult {
  /** The PlaywrightQuota items on this page */
  value: PlaywrightQuota[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _playwrightQuotaListResultDeserializer(item: any): _PlaywrightQuotaListResult {
  return {
    value: playwrightQuotaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function playwrightQuotaArrayDeserializer(result: Array<PlaywrightQuota>): any[] {
  return result.map((item) => {
    return playwrightQuotaDeserializer(item);
  });
}

/** Playwright workspace quota resource. */
export interface PlaywrightWorkspaceQuota extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PlaywrightWorkspaceQuotaProperties;
}

export function playwrightWorkspaceQuotaDeserializer(item: any): PlaywrightWorkspaceQuota {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : playwrightWorkspaceQuotaPropertiesDeserializer(item["properties"]),
  };
}

/** Playwright workspace quota resource properties. */
export interface PlaywrightWorkspaceQuotaProperties {
  /** The Playwright workspace quota free trial properties. */
  readonly freeTrial?: PlaywrightWorkspaceFreeTrialProperties;
  /** The status of the last resource operation. */
  readonly provisioningState?: ProvisioningState;
}

export function playwrightWorkspaceQuotaPropertiesDeserializer(
  item: any,
): PlaywrightWorkspaceQuotaProperties {
  return {
    freeTrial: !item["freeTrial"]
      ? item["freeTrial"]
      : playwrightWorkspaceFreeTrialPropertiesDeserializer(item["freeTrial"]),
    provisioningState: item["provisioningState"],
  };
}

/** Playwright workspace quota free trial properties. */
export interface PlaywrightWorkspaceFreeTrialProperties {
  /** The free trial creation timestamp in UTC. */
  readonly createdAt: Date;
  /** The free trial expiration timestamp in UTC. */
  readonly expiryAt: Date;
  /** The allocated limit value (e.g., allocated free execution minutes). */
  readonly allocatedValue: number;
  /** The used value (e.g., used free execution minutes). */
  readonly usedValue: number;
  /** The percentage of the free trial quota used. */
  readonly percentageUsed: number;
}

export function playwrightWorkspaceFreeTrialPropertiesDeserializer(
  item: any,
): PlaywrightWorkspaceFreeTrialProperties {
  return {
    createdAt: new Date(item["createdAt"]),
    expiryAt: new Date(item["expiryAt"]),
    allocatedValue: item["allocatedValue"],
    usedValue: item["usedValue"],
    percentageUsed: item["percentageUsed"],
  };
}

/** The response of a PlaywrightWorkspaceQuota list operation. */
export interface _PlaywrightWorkspaceQuotaListResult {
  /** The PlaywrightWorkspaceQuota items on this page */
  value: PlaywrightWorkspaceQuota[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _playwrightWorkspaceQuotaListResultDeserializer(
  item: any,
): _PlaywrightWorkspaceQuotaListResult {
  return {
    value: playwrightWorkspaceQuotaArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function playwrightWorkspaceQuotaArrayDeserializer(
  result: Array<PlaywrightWorkspaceQuota>,
): any[] {
  return result.map((item) => {
    return playwrightWorkspaceQuotaDeserializer(item);
  });
}

/** Available versions of the Playwright Service Management API. */
export enum KnownVersions {
  /** Stable version 2025-09-01 with general availability features for Playwright workspace management. */
  V20250901 = "2025-09-01",
}
