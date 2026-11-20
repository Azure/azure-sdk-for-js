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

/** Device Update instance details. */
export interface UpdateInstance extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: UpdateInstanceProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function updateInstanceSerializer(item: UpdateInstance): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : updateInstancePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function updateInstanceDeserializer(item: any): UpdateInstance {
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
      : updateInstancePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/**
 * Update Instance properties.
 *
 * All properties are read-only because resource state is managed exclusively
 * through the internal link* action endpoints.
 */
export interface UpdateInstanceProperties {
  /** Provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Service-facing address for ADR→ADU communication. */
  readonly serviceAddress?: string;
  /** Account linking state. Absent until first /link/initiate. */
  readonly linking?: AccountLinking;
}

export function updateInstancePropertiesSerializer(_item: UpdateInstanceProperties): any {
  return {};
}

export function updateInstancePropertiesDeserializer(item: any): UpdateInstanceProperties {
  return {
    provisioningState: item["provisioningState"],
    serviceAddress: item["serviceAddress"],
    linking: !item["linking"] ? item["linking"] : accountLinkingDeserializer(item["linking"]),
  };
}

/** Provisioning state. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Provisioning State Accepted */
  Accepted = "Accepted",
  /** Provisioning State Creating */
  Creating = "Creating",
  /** Provisioning State Deleting */
  Deleting = "Deleting",
}

/**
 * Provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Accepted**: Provisioning State Accepted \
 * **Creating**: Provisioning State Creating \
 * **Deleting**: Provisioning State Deleting
 */
export type ProvisioningState = string;

/** Account linking information. Present only after the first /link/initiate. */
export interface AccountLinking {
  /** The ARM resource ID of the linked Azure Device Registry namespace. */
  namespaceResourceId: string;
  /**
   * The current linking state. Absent before any link attempt (logical NotLinked state).
   * See AccountLinkingState for the full state machine and transition rules.
   */
  linkingState: AccountLinkingState;
}

export function accountLinkingDeserializer(item: any): AccountLinking {
  return {
    namespaceResourceId: item["namespaceResourceId"],
    linkingState: item["linkingState"],
  };
}

/**
 * Account linking state.
 *
 * Tracks the relationship between a linkable resource and an ADR namespace.
 * The property is absent before any link attempt; its presence indicates a link
 * has been initiated. NotLinked is a logical initial state, not a persisted value.
 */
export enum KnownAccountLinkingState {
  /** Link in progress. */
  InProgress = "InProgress",
  /** Successfully linked to a namespace. */
  Succeeded = "Succeeded",
  /**
   * Was linked; namespace was deleted. ADR sent namespaceDeleted. Terminal state — no
   * re-link is allowed. The resource is not auto-deleted; the customer must explicitly delete it.
   */
  Orphaned = "Orphaned",
}

/**
 * Account linking state.
 *
 * Tracks the relationship between a linkable resource and an ADR namespace.
 * The property is absent before any link attempt; its presence indicates a link
 * has been initiated. NotLinked is a logical initial state, not a persisted value. \
 * {@link KnownAccountLinkingState} can be used interchangeably with AccountLinkingState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress**: Link in progress. \
 * **Succeeded**: Successfully linked to a namespace. \
 * **Orphaned**: Was linked; namespace was deleted. ADR sent namespaceDeleted. Terminal state — no
 * re-link is allowed. The resource is not auto-deleted; the customer must explicitly delete it.
 */
export type AccountLinkingState = string;

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

/** Request payload used to update an existing Update Instance. */
export interface UpdateInstanceUpdate {
  /** List of key value pairs that describe the resource. This will overwrite the existing tags. */
  tags?: Record<string, string>;
  /** The type of identity used for the resource. */
  identity?: ManagedServiceIdentity;
}

export function updateInstanceUpdateSerializer(item: UpdateInstanceUpdate): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** The response of a UpdateInstance list operation. */
export interface _UpdateInstanceListResult {
  /** The UpdateInstance items on this page */
  value: UpdateInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _updateInstanceListResultDeserializer(item: any): _UpdateInstanceListResult {
  return {
    value: updateInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function updateInstanceArraySerializer(result: Array<UpdateInstance>): any[] {
  return result.map((item) => {
    return updateInstanceSerializer(item);
  });
}

export function updateInstanceArrayDeserializer(result: Array<UpdateInstance>): any[] {
  return result.map((item) => {
    return updateInstanceDeserializer(item);
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
export interface CheckNameAvailabilityResult {
  /** Indicates if the resource name is available. */
  nameAvailable?: boolean;
  /** The reason why the given name is not available. */
  reason?: CheckNameAvailabilityReason;
  /** Detailed reason why the given name is not available. */
  message?: string;
}

export function checkNameAvailabilityResultDeserializer(item: any): CheckNameAvailabilityResult {
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

/** Request body for /link/preflight. */
export interface LinkPreflightRequest {
  /** ARM resource ID of the namespace. Resource stores this for ARM property visibility and optional best-effort deletion notification. */
  namespaceResourceId: string;
  /** Globally unique namespace identifier for backend operations. */
  namespaceUuid: string;
  /** Managed Identity the resource should use for ADR communication. */
  inboundCallerIdentity: InboundCallerIdentity;
}

export function linkPreflightRequestSerializer(item: LinkPreflightRequest): any {
  return {
    namespaceResourceId: item["namespaceResourceId"],
    namespaceUuid: item["namespaceUuid"],
    inboundCallerIdentity: inboundCallerIdentitySerializer(item["inboundCallerIdentity"]),
  };
}

/** Identity information for inbound calls from Azure Device Registry. */
export interface InboundCallerIdentity {
  /** The type of managed identity. */
  type: ManagedServiceIdentityType;
  /** ARM resource ID of the user-assigned managed identity. Required when type is "UserAssigned". */
  userAssignedIdentity?: string;
}

export function inboundCallerIdentitySerializer(item: InboundCallerIdentity): any {
  return { type: item["type"], userAssignedIdentity: item["userAssignedIdentity"] };
}

/** Response body for /link/preflight. */
export interface LinkPreflightResponse {
  /** Ready if all readiness checks pass, NotReady if any blocking error exists. */
  status: LinkPreflightStatus;
  /** Array of blocking conditions when status is NotReady. */
  errors?: ErrorDetail[];
  /** Array of non-blocking conditions ADR surfaces to the customer (e.g., edge/module presence per C3). May appear with either Ready or NotReady. */
  warnings?: ErrorDetail[];
  /** Resource-defined sub-object for resource-internal data not available via ARM GET. */
  metadata?: LinkedResourceMetadata;
}

export function linkPreflightResponseDeserializer(item: any): LinkPreflightResponse {
  return {
    status: item["status"],
    errors: !item["errors"] ? item["errors"] : errorDetailArrayDeserializer(item["errors"]),
    warnings: !item["warnings"] ? item["warnings"] : errorDetailArrayDeserializer(item["warnings"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : linkedResourceMetadataDeserializer(item["metadata"]),
  };
}

/** Readiness status for preflight check. */
export enum KnownLinkPreflightStatus {
  /** All readiness checks pass. */
  Ready = "Ready",
  /** One or more blocking errors exist. */
  NotReady = "NotReady",
}

/**
 * Readiness status for preflight check. \
 * {@link KnownLinkPreflightStatus} can be used interchangeably with LinkPreflightStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ready**: All readiness checks pass. \
 * **NotReady**: One or more blocking errors exist.
 */
export type LinkPreflightStatus = string;

/** Metadata returned by the preflight check. */
export interface LinkedResourceMetadata {
  /** Total number of devices in the hub. */
  deviceCount?: number;
}

export function linkedResourceMetadataDeserializer(item: any): LinkedResourceMetadata {
  return {
    deviceCount: item["deviceCount"],
  };
}

/** Request body for /link/initiate. */
export interface LinkInitiateRequest {
  /** ARM resource ID of the namespace. */
  namespaceResourceId: string;
  /** Globally unique namespace identifier for backend operations. */
  namespaceUuid: string;
  /** Data-plane address of the ADR namespace. */
  dataAddress: string;
  /** Managed Identity the resource should use for ADR communication. */
  inboundCallerIdentity: InboundCallerIdentity;
}

export function linkInitiateRequestSerializer(item: LinkInitiateRequest): any {
  return {
    namespaceResourceId: item["namespaceResourceId"],
    namespaceUuid: item["namespaceUuid"],
    dataAddress: item["dataAddress"],
    inboundCallerIdentity: inboundCallerIdentitySerializer(item["inboundCallerIdentity"]),
  };
}

/**
 * Request body for /link/notify. Idempotent: a duplicate notification matching the
 * resource's current linkingState returns 200 with no further state change, making
 * it safe for ADR to retry after transient failures.
 */
export interface LinkNotifyRequest {
  /** The action to perform on the linking state. */
  action: LinkNotifyAction;
  /**
   * Error code describing the failure. Required when action is "fail"; ignored otherwise.
   * Tracked on ADR's LRO for diagnostics.
   */
  errorCode?: string;
  /**
   * Human-readable reason for the failure. Required when action is "fail"; ignored otherwise.
   * Tracked on ADR's LRO for diagnostics.
   */
  reason?: string;
}

export function linkNotifyRequestSerializer(item: LinkNotifyRequest): any {
  return { action: item["action"], errorCode: item["errorCode"], reason: item["reason"] };
}

/** Link notify action type. */
export enum KnownLinkNotifyAction {
  /**
   * Commit the linking operation (InProgress → Succeeded). Resource starts
   * linked behavior.
   */
  Commit = "commit",
  /** Report that the linking operation failed. */
  Fail = "fail",
  /**
   * The linked namespace was deleted (Succeeded → Orphaned). Terminal. Resource enters an
   * unusable state: devices are wiped, linked behavior stops, no re-link allowed.
   */
  NamespaceDeleted = "namespaceDeleted",
}

/**
 * Link notify action type. \
 * {@link KnownLinkNotifyAction} can be used interchangeably with LinkNotifyAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **commit**: Commit the linking operation (InProgress → Succeeded). Resource starts
 * linked behavior. \
 * **fail**: Report that the linking operation failed. \
 * **namespaceDeleted**: The linked namespace was deleted (Succeeded → Orphaned). Terminal. Resource enters an
 * unusable state: devices are wiped, linked behavior stops, no re-link allowed.
 */
export type LinkNotifyAction = string;

/** Request body for /link/update. Acts as a PATCH — only provided properties are applied. */
export interface LinkUpdateRequest {
  /** ARM resource ID of the namespace. */
  namespaceResourceId?: string;
  /** Globally unique namespace identifier for backend operations. */
  namespaceUuid?: string;
  /** ADR data-plane address for the namespace. Resource uses this for post-link runtime communication (device sync, provisioning). */
  dataAddress?: string;
  /** User or Managed Identity for inbound calls from Azure Device Registry. */
  inboundCallerIdentity?: InboundCallerIdentity;
}

export function linkUpdateRequestSerializer(item: LinkUpdateRequest): any {
  return {
    namespaceResourceId: item["namespaceResourceId"],
    namespaceUuid: item["namespaceUuid"],
    dataAddress: item["dataAddress"],
    inboundCallerIdentity: !item["inboundCallerIdentity"]
      ? item["inboundCallerIdentity"]
      : inboundCallerIdentitySerializer(item["inboundCallerIdentity"]),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-11-02-preview API version. */
  V20261102Preview = "2026-11-02-preview",
}
