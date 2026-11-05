// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

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

/** Azure Resource Manager tracked resource representing a NeuroShield instance. */
export interface NeuroShieldResource extends TrackedResource {
  /** Properties of the NeuroShield resource. */
  properties: NeuroShieldProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function neuroShieldResourceSerializer(item: NeuroShieldResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: neuroShieldPropertiesSerializer(item["properties"]),
  };
}

export function neuroShieldResourceDeserializer(item: any): NeuroShieldResource {
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
    properties: neuroShieldPropertiesDeserializer(item["properties"]),
    eTag: item["etag"],
  };
}

/** Properties of the NeuroShield resource. */
export interface NeuroShieldProperties {
  /** Provisioning state of the NeuroShield resource. */
  readonly provisioningState?: ProvisioningStateNeuroShield;
  /** System-generated globally unique identifier (GUID) for the NeuroShield resource. */
  readonly resourceGuid?: string;
  /**
   * Response mode that controls mitigation serving behavior. A full create or
   * update (PUT) request must specify Auto or Manual; there is no default.
   * Omitting responseMode from a PATCH request preserves the existing mode.
   */
  responseMode: NeuroShieldResponseMode;
  /**
   * Minimum severity level for mitigation generation. Omission in a full PUT
   * request resolves to Low; omission in PATCH preserves the value.
   */
  severityThreshold?: NeuroShieldSeverityThreshold;
  /**
   * Human-readable description of the NeuroShield resource. Omission in a full
   * PUT request resolves to an empty string. Control characters other than tab,
   * line feed, and carriage return are not allowed.
   */
  description?: string;
}

export function neuroShieldPropertiesSerializer(item: NeuroShieldProperties): any {
  return {
    responseMode: item["responseMode"],
    severityThreshold: item["severityThreshold"],
    description: item["description"],
  };
}

export function neuroShieldPropertiesDeserializer(item: any): NeuroShieldProperties {
  return {
    provisioningState: item["provisioningState"],
    resourceGuid: item["resourceGuid"],
    responseMode: item["responseMode"],
    severityThreshold: item["severityThreshold"],
    description: item["description"],
  };
}

/**
 * Provisioning states shared by NeuroShield resources. The non-terminal states are used by
 * asynchronous protected-resource operations; synchronous NeuroShield operations return only
 * terminal states.
 */
export enum KnownProvisioningStateNeuroShield {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Resource is being created. */
  Creating = "Creating",
  /** Resource is being updated. */
  Updating = "Updating",
  /** Resource is being deleted. */
  Deleting = "Deleting",
}

/**
 * Provisioning states shared by NeuroShield resources. The non-terminal states are used by
 * asynchronous protected-resource operations; synchronous NeuroShield operations return only
 * terminal states. \
 * {@link KnownProvisioningStateNeuroShield} can be used interchangeably with ProvisioningStateNeuroShield,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: Resource is being created. \
 * **Updating**: Resource is being updated. \
 * **Deleting**: Resource is being deleted.
 */
export type ProvisioningStateNeuroShield = string;

/** Response modes for mitigation serving behavior. */
export enum KnownNeuroShieldResponseMode {
  /** Automatically queues and serves mitigations. */
  Auto = "Auto",
  /** Requires explicit customer approval before serving mitigations. */
  Manual = "Manual",
}

/**
 * Response modes for mitigation serving behavior. \
 * {@link KnownNeuroShieldResponseMode} can be used interchangeably with NeuroShieldResponseMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Auto**: Automatically queues and serves mitigations. \
 * **Manual**: Requires explicit customer approval before serving mitigations.
 */
export type NeuroShieldResponseMode = string;

/** Severity threshold used for finding and mitigation generation. */
export enum KnownNeuroShieldSeverityThreshold {
  /** Critical severity threshold. */
  Critical = "Critical",
  /** High severity threshold. */
  High = "High",
  /** Medium severity threshold. */
  Medium = "Medium",
  /** Low severity threshold. */
  Low = "Low",
}

/**
 * Severity threshold used for finding and mitigation generation. \
 * {@link KnownNeuroShieldSeverityThreshold} can be used interchangeably with NeuroShieldSeverityThreshold,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Critical**: Critical severity threshold. \
 * **High**: High severity threshold. \
 * **Medium**: Medium severity threshold. \
 * **Low**: Low severity threshold.
 */
export type NeuroShieldSeverityThreshold = string;

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

/** Patch request body for updating a NeuroShield resource. */
export interface NeuroShieldPatch {
  /** Resource tags. */
  tags?: Record<string, any>;
  /** Patch properties for the NeuroShield resource. */
  properties?: NeuroShieldPatchProperties;
}

export function neuroShieldPatchSerializer(item: NeuroShieldPatch): any {
  return {
    tags: !item["tags"] ? item["tags"] : serializeRecord(item["tags"]),
    properties: !item["properties"]
      ? item["properties"]
      : neuroShieldPatchPropertiesSerializer(item["properties"]),
  };
}

/** Properties to patch on a NeuroShield resource. */
export interface NeuroShieldPatchProperties {
  /** Response mode that controls mitigation serving behavior. */
  responseMode?: NeuroShieldResponseMode;
  /** Minimum severity level for mitigation generation. */
  severityThreshold?: NeuroShieldSeverityThreshold;
  /** Human-readable description of the NeuroShield resource. */
  description?: string;
}

export function neuroShieldPatchPropertiesSerializer(item: NeuroShieldPatchProperties): any {
  return {
    responseMode: item["responseMode"],
    severityThreshold: item["severityThreshold"],
    description: item["description"],
  };
}

/** The response of a NeuroShieldResource list operation. */
export interface _NeuroShieldResourceListResult {
  /** The NeuroShieldResource items on this page */
  value: NeuroShieldResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _neuroShieldResourceListResultDeserializer(
  item: any,
): _NeuroShieldResourceListResult {
  return {
    value: neuroShieldResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function neuroShieldResourceArraySerializer(result: Array<NeuroShieldResource>): any[] {
  return result.map((item) => {
    return neuroShieldResourceSerializer(item);
  });
}

export function neuroShieldResourceArrayDeserializer(result: Array<NeuroShieldResource>): any[] {
  return result.map((item) => {
    return neuroShieldResourceDeserializer(item);
  });
}

/** The response of a NeuroShieldSummary list operation. */
export interface _NeuroShieldSummaryListResult {
  /** The NeuroShieldSummary items on this page */
  value: NeuroShieldSummary[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _neuroShieldSummaryListResultDeserializer(
  item: any,
): _NeuroShieldSummaryListResult {
  return {
    value: neuroShieldSummaryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function neuroShieldSummaryArrayDeserializer(result: Array<NeuroShieldSummary>): any[] {
  return result.map((item) => {
    return neuroShieldSummaryDeserializer(item);
  });
}

/** Azure Resource Manager read-only singleton proxy child resource exposing the aggregate fleet overview for a NeuroShield resource. */
export interface NeuroShieldSummary extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties: NeuroShieldSummaryProperties;
}

export function neuroShieldSummaryDeserializer(item: any): NeuroShieldSummary {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: neuroShieldSummaryPropertiesDeserializer(item["properties"]),
  };
}

/** Aggregate fleet overview counts for a NeuroShield resource. */
export interface NeuroShieldSummaryProperties {
  /**
   * Provisioning state of the computed summary resource. A successful read reports
   * Succeeded; this does not represent the status of the findings or mitigations counted.
   */
  readonly provisioningState?: ResourceProvisioningState;
  /** Number of protected resources. */
  protectedCount: number;
  /** Number of protected resources with a current agent assessment. */
  scannedProtectedCount: number;
  /** Number of active findings. */
  activeFindings: number;
  /** Number of active critical-severity findings. */
  criticalFindings: number;
  /** Number of active high-severity findings. */
  highFindings: number;
  /** Number of active medium-severity findings. */
  mediumFindings: number;
  /** Number of active low-severity findings. */
  lowFindings: number;
  /** Number of findings blocked by agent communication failures. */
  unreachableFindings: number;
  /** Number of mitigations awaiting customer approval. */
  awaitingApprovalMitigations: number;
  /** Number of mitigations queued for execution. */
  queuedMitigations: number;
  /** Number of mitigations whose execution is in progress. */
  inProgressMitigations: number;
  /** Number of mitigations that completed successfully. */
  succeededMitigations: number;
  /** Number of mitigations whose execution or rollback failed. */
  failedMitigations: number;
  /** Number of mitigations whose rollback is in progress. */
  rollbackInProgressMitigations: number;
}

export function neuroShieldSummaryPropertiesDeserializer(item: any): NeuroShieldSummaryProperties {
  return {
    provisioningState: item["provisioningState"],
    protectedCount: item["protectedCount"],
    scannedProtectedCount: item["scannedProtectedCount"],
    activeFindings: item["activeFindings"],
    criticalFindings: item["criticalFindings"],
    highFindings: item["highFindings"],
    mediumFindings: item["mediumFindings"],
    lowFindings: item["lowFindings"],
    unreachableFindings: item["unreachableFindings"],
    awaitingApprovalMitigations: item["awaitingApprovalMitigations"],
    queuedMitigations: item["queuedMitigations"],
    inProgressMitigations: item["inProgressMitigations"],
    succeededMitigations: item["succeededMitigations"],
    failedMitigations: item["failedMitigations"],
    rollbackInProgressMitigations: item["rollbackInProgressMitigations"],
  };
}

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

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
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

/** Azure Resource Manager proxy child resource representing a protected resource. */
export interface NeuroShieldProtectedResource extends ProxyResource {
  /** Properties of the protected resource. */
  properties: NeuroShieldProtectedResourceProperties;
}

export function neuroShieldProtectedResourceSerializer(item: NeuroShieldProtectedResource): any {
  return { properties: neuroShieldProtectedResourcePropertiesSerializer(item["properties"]) };
}

export function neuroShieldProtectedResourceDeserializer(item: any): NeuroShieldProtectedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: neuroShieldProtectedResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a protected resource. */
export interface NeuroShieldProtectedResourceProperties {
  /** Provisioning state of the protected resource. */
  readonly provisioningState?: ProvisioningStateNeuroShield;
  /** Azure Resource Manager resource ID of the target virtual machine or virtual machine scale set. */
  targetResourceId: string;
  /**
   * The optional customer VM or VMSS identity used by the Neuron agent. Omission
   * and explicit None are accepted on create. SystemAssigned requires nonzero
   * principalId and tenantId; UserAssigned requires exactly one non-null dictionary
   * entry with nonzero principalId and clientId and no top-level IDs. The declared
   * combined identity kind is rejected. Caller-supplied identifiers are returned
   * on read; service-side verification of their association with the target remains
   * required. Omission on update preserves the stored identity; a supplied identity
   * must be unchanged. Explicit None cannot clear an existing identity. Changing
   * identity requires deleting and recreating the protected resource.
   */
  targetIdentity?: NeuroShieldProtectedResourceIdentity;
  /** Approximate health of the Neuron agent, derived from its most recent authenticated data-plane signal. */
  readonly agentHealth?: NeuroShieldAgentHealth;
  /** The current on-demand inventory upload request, when one is active. */
  readonly inventoryUploadRequest?: NeuroShieldInventoryUploadRequestMetadata;
}

export function neuroShieldProtectedResourcePropertiesSerializer(
  item: NeuroShieldProtectedResourceProperties,
): any {
  return {
    targetResourceId: item["targetResourceId"],
    targetIdentity: !item["targetIdentity"]
      ? item["targetIdentity"]
      : neuroShieldProtectedResourceIdentitySerializer(item["targetIdentity"]),
  };
}

export function neuroShieldProtectedResourcePropertiesDeserializer(
  item: any,
): NeuroShieldProtectedResourceProperties {
  return {
    provisioningState: item["provisioningState"],
    targetResourceId: item["targetResourceId"],
    targetIdentity: !item["targetIdentity"]
      ? item["targetIdentity"]
      : neuroShieldProtectedResourceIdentityDeserializer(item["targetIdentity"]),
    agentHealth: !item["agentHealth"]
      ? item["agentHealth"]
      : neuroShieldAgentHealthDeserializer(item["agentHealth"]),
    inventoryUploadRequest: !item["inventoryUploadRequest"]
      ? item["inventoryUploadRequest"]
      : neuroShieldInventoryUploadRequestMetadataDeserializer(item["inventoryUploadRequest"]),
  };
}

/**
 * Caller-supplied identity of the target VM or VMSS, retained on the protected resource.
 * These identifiers are not independently resolved or verified by this API contract.
 */
export interface NeuroShieldProtectedResourceIdentity {
  /**
   * Microsoft Entra service principal ID of the target's system-assigned identity.
   * A nonzero value is required for SystemAssigned; omit for UserAssigned.
   */
  principalId?: string;
  /**
   * Microsoft Entra tenant ID of the target's system-assigned identity.
   * A nonzero value is required for SystemAssigned; omit for UserAssigned.
   */
  tenantId?: string;
  /**
   * Type of the target identity. None, SystemAssigned, and UserAssigned are supported.
   * The declared combined system/user-assigned value is rejected by the operation.
   * There is no default when an identity object is supplied.
   */
  type: ManagedServiceIdentityType;
  /**
   * User-assigned identities keyed by Azure Resource Manager resource ID.
   * For UserAssigned, supply exactly one non-null entry with a nonblank key and
   * nonzero principalId and clientId. Other identity kinds reject a nonempty map.
   */
  userAssignedIdentities?: Record<string, any>;
}

export function neuroShieldProtectedResourceIdentitySerializer(
  item: NeuroShieldProtectedResourceIdentity,
): any {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : serializeRecord(
          item["userAssignedIdentities"],
          undefined,
          neuroShieldProtectedResourceUserAssignedIdentitySerializer,
        ),
  };
}

export function neuroShieldProtectedResourceIdentityDeserializer(
  item: any,
): NeuroShieldProtectedResourceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : serializeRecord(
          item["userAssignedIdentities"],
          [],
          neuroShieldProtectedResourceUserAssignedIdentityDeserializer,
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

/** Caller-supplied identifiers of a user-assigned identity associated with the target. */
export interface NeuroShieldProtectedResourceUserAssignedIdentity {
  /**
   * Microsoft Entra service principal ID of the target's user-assigned identity.
   * A non-null, nonzero value is required when using UserAssigned.
   */
  principalId?: string;
  /**
   * Microsoft Entra client ID of the target's user-assigned identity.
   * A non-null, nonzero value is required when using UserAssigned.
   */
  clientId?: string;
}

export function neuroShieldProtectedResourceUserAssignedIdentitySerializer(
  item: NeuroShieldProtectedResourceUserAssignedIdentity,
): any {
  return { principalId: item["principalId"], clientId: item["clientId"] };
}

export function neuroShieldProtectedResourceUserAssignedIdentityDeserializer(
  item: any,
): NeuroShieldProtectedResourceUserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Approximate Neuron agent liveness projected onto a protected resource. */
export interface NeuroShieldAgentHealth {
  /** The most recent time a liveness signal was observed. The value is absent until the first signal is received. */
  readonly lastSeenTime?: Date;
}

export function neuroShieldAgentHealthDeserializer(item: any): NeuroShieldAgentHealth {
  return {
    lastSeenTime: !item["lastSeenTime"] ? item["lastSeenTime"] : new Date(item["lastSeenTime"]),
  };
}

/** A server-owned request for the Neuron agents associated with a protected resource to upload fresh inventory. */
export interface NeuroShieldInventoryUploadRequestMetadata {
  /** The stable identifier for the request. */
  readonly requestId: string;
  /** The time when the resource provider accepted the request. */
  readonly requestedAt: Date;
  /** The time after which Neuron agents must stop observing the request. */
  readonly expiresAt: Date;
}

export function neuroShieldInventoryUploadRequestMetadataDeserializer(
  item: any,
): NeuroShieldInventoryUploadRequestMetadata {
  return {
    requestId: item["requestId"],
    requestedAt: new Date(item["requestedAt"]),
    expiresAt: new Date(item["expiresAt"]),
  };
}

/** The response of a NeuroShieldProtectedResource list operation. */
export interface _NeuroShieldProtectedResourceListResult {
  /** The NeuroShieldProtectedResource items on this page */
  value: NeuroShieldProtectedResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _neuroShieldProtectedResourceListResultDeserializer(
  item: any,
): _NeuroShieldProtectedResourceListResult {
  return {
    value: neuroShieldProtectedResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function neuroShieldProtectedResourceArraySerializer(
  result: Array<NeuroShieldProtectedResource>,
): any[] {
  return result.map((item) => {
    return neuroShieldProtectedResourceSerializer(item);
  });
}

export function neuroShieldProtectedResourceArrayDeserializer(
  result: Array<NeuroShieldProtectedResource>,
): any[] {
  return result.map((item) => {
    return neuroShieldProtectedResourceDeserializer(item);
  });
}

/** The result of requesting a fresh inventory upload. */
export interface NeuroShieldInventoryUploadRequestResult {
  /** The stable identifier for the accepted request. */
  requestId: string;
  /** The time when the resource provider accepted the request. */
  requestedAt: Date;
  /** The time when the request expires. */
  expiresAt: Date;
  /** Indicates whether an existing unexpired request was reused. */
  deduplicated: boolean;
}

export function neuroShieldInventoryUploadRequestResultDeserializer(
  item: any,
): NeuroShieldInventoryUploadRequestResult {
  return {
    requestId: item["requestId"],
    requestedAt: new Date(item["requestedAt"]),
    expiresAt: new Date(item["expiresAt"]),
    deduplicated: item["deduplicated"],
  };
}

/** Azure Resource Manager proxy child resource representing a finding. */
export interface NeuroShieldFinding extends ProxyResource {
  /** Properties of the finding resource. */
  properties: NeuroShieldFindingProperties;
}

export function neuroShieldFindingDeserializer(item: any): NeuroShieldFinding {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: neuroShieldFindingPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a finding resource. */
export interface NeuroShieldFindingProperties {
  /**
   * Provisioning state of the service-generated finding. A successfully materialized
   * finding reports Succeeded, independently of its runtime operational status.
   */
  readonly provisioningState?: ResourceProvisioningState;
  /** Common Vulnerabilities and Exposures (CVE) identifier associated with this finding. */
  readonly cveId: string;
  /** Fully qualified Azure Resource Manager resource ID of the affected virtual machine or virtual machine scale set instance. */
  readonly virtualMachineArmId: string;
  /** Severity of the finding. */
  readonly severity: NeuroShieldSeverityThreshold;
  /** Description of the finding. */
  readonly description: string;
  /** Explanation of why the virtual machine is affected, including the matching evidence. */
  readonly reason: string;
  /** Detection timestamp for the finding. */
  readonly detectedTime?: Date;
  /** Runtime operational status of the finding. */
  readonly status: NeuroShieldFindingStatus;
}

export function neuroShieldFindingPropertiesDeserializer(item: any): NeuroShieldFindingProperties {
  return {
    provisioningState: item["provisioningState"],
    cveId: item["cveId"],
    virtualMachineArmId: item["virtualMachineArmId"],
    severity: item["severity"],
    description: item["description"],
    reason: item["reason"],
    detectedTime: !item["detectedTime"] ? item["detectedTime"] : new Date(item["detectedTime"]),
    status: item["status"],
  };
}

/** Runtime operational status for findings. */
export enum KnownNeuroShieldFindingStatus {
  /** Candidate mitigations were generated and are waiting for explicit approval. */
  AwaitingApproval = "AwaitingApproval",
  /** No mitigation has resolved the finding yet. */
  Active = "Active",
  /** One or more mitigation actions are currently running. */
  MitigationInProgress = "MitigationInProgress",
  /** The finding has at least one successful mitigation. */
  Mitigated = "Mitigated",
  /** Pre-execution validation determined that the vulnerability is no longer present. */
  Skipped = "Skipped",
  /** All mitigations were attempted without successful resolution. */
  MitigationsExhausted = "MitigationsExhausted",
  /** Mitigation execution is blocked by communication failure. */
  Unreachable = "Unreachable",
}

/**
 * Runtime operational status for findings. \
 * {@link KnownNeuroShieldFindingStatus} can be used interchangeably with NeuroShieldFindingStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AwaitingApproval**: Candidate mitigations were generated and are waiting for explicit approval. \
 * **Active**: No mitigation has resolved the finding yet. \
 * **MitigationInProgress**: One or more mitigation actions are currently running. \
 * **Mitigated**: The finding has at least one successful mitigation. \
 * **Skipped**: Pre-execution validation determined that the vulnerability is no longer present. \
 * **MitigationsExhausted**: All mitigations were attempted without successful resolution. \
 * **Unreachable**: Mitigation execution is blocked by communication failure.
 */
export type NeuroShieldFindingStatus = string;

/** The response of a NeuroShieldFinding list operation. */
export interface _NeuroShieldFindingListResult {
  /** The NeuroShieldFinding items on this page */
  value: NeuroShieldFinding[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _neuroShieldFindingListResultDeserializer(
  item: any,
): _NeuroShieldFindingListResult {
  return {
    value: neuroShieldFindingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function neuroShieldFindingArrayDeserializer(result: Array<NeuroShieldFinding>): any[] {
  return result.map((item) => {
    return neuroShieldFindingDeserializer(item);
  });
}

/** Mitigations updated by a Finding action. */
export interface NeuroShieldMitigationActionResult {
  /** The complete set of mitigations updated by the action. */
  value: NeuroShieldMitigation[];
}

export function neuroShieldMitigationActionResultDeserializer(
  item: any,
): NeuroShieldMitigationActionResult {
  return {
    value: neuroShieldMitigationArrayDeserializer(item["value"]),
  };
}

export function neuroShieldMitigationArrayDeserializer(
  result: Array<NeuroShieldMitigation>,
): any[] {
  return result.map((item) => {
    return neuroShieldMitigationDeserializer(item);
  });
}

/** Azure Resource Manager proxy child resource representing a mitigation. */
export interface NeuroShieldMitigation extends ProxyResource {
  /** Properties of the mitigation resource. */
  properties: NeuroShieldMitigationProperties;
}

export function neuroShieldMitigationDeserializer(item: any): NeuroShieldMitigation {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: neuroShieldMitigationPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of a mitigation resource. */
export interface NeuroShieldMitigationProperties {
  /**
   * Provisioning state of the service-generated mitigation. A successfully materialized
   * mitigation reports Succeeded, independently of its runtime execution or rollback status.
   */
  readonly provisioningState?: ResourceProvisioningState;
  /** Resource identifier of the associated finding. */
  readonly findingId: string;
  /** Common Vulnerabilities and Exposures (CVE) identifier addressed by this mitigation. */
  readonly cveId: string;
  /** Fully qualified Azure Resource Manager resource ID of the virtual machine targeted by this mitigation. */
  readonly virtualMachineArmId: string;
  /**
   * Relative recommendation priority among mitigations for the same finding.
   * Rank 1 has the highest priority, followed by consecutive ranks 2, 3, and so on.
   * Ranks are assigned across all sibling mitigations before pagination or filtering,
   * with ties broken by ordinal mitigation resource name. A mitigation has the same
   * rank in GET, list, and action responses for an unchanged set of sibling priorities.
   * Ranks can change when sibling priorities or membership change. Rank is not a
   * confidence measure or a guarantee of mitigation safety or success.
   */
  readonly rank: number;
  /** User-friendly description of the commands executed by this mitigation. */
  readonly commandsSummary: string;
  /** Indicates whether rollback is available for this mitigation. */
  readonly isRollbackable: boolean;
  /** Runtime operational status of the mitigation. */
  readonly status: NeuroShieldMitigationStatus;
  /** Human-readable details for the current mitigation status. */
  readonly statusDetails?: string;
  /** Timestamp when the mitigation was applied. */
  readonly appliedTime?: Date;
}

export function neuroShieldMitigationPropertiesDeserializer(
  item: any,
): NeuroShieldMitigationProperties {
  return {
    provisioningState: item["provisioningState"],
    findingId: item["findingId"],
    cveId: item["cveId"],
    virtualMachineArmId: item["virtualMachineArmId"],
    rank: item["rank"],
    commandsSummary: item["commandsSummary"],
    isRollbackable: item["isRollbackable"],
    status: item["status"],
    statusDetails: item["statusDetails"],
    appliedTime: !item["appliedTime"] ? item["appliedTime"] : new Date(item["appliedTime"]),
  };
}

/** Runtime operational status for mitigations. */
export enum KnownNeuroShieldMitigationStatus {
  /** Mitigation is queued for execution. */
  Queued = "Queued",
  /** Mitigation is waiting for explicit approval. */
  AwaitingApproval = "AwaitingApproval",
  /** Mitigation execution is in progress. */
  InProgress = "InProgress",
  /** Mitigation completed successfully. */
  Succeeded = "Succeeded",
  /** Mitigation was not applied because validation determined it was unnecessary. */
  Skipped = "Skipped",
  /** Mitigation execution failed. */
  Failed = "Failed",
  /** Rollback execution is in progress. */
  RollbackInProgress = "RollbackInProgress",
  /** Mitigation rollback completed successfully. */
  RolledBack = "RolledBack",
  /** Mitigation rollback failed. */
  RollbackFailed = "RollbackFailed",
}

/**
 * Runtime operational status for mitigations. \
 * {@link KnownNeuroShieldMitigationStatus} can be used interchangeably with NeuroShieldMitigationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Queued**: Mitigation is queued for execution. \
 * **AwaitingApproval**: Mitigation is waiting for explicit approval. \
 * **InProgress**: Mitigation execution is in progress. \
 * **Succeeded**: Mitigation completed successfully. \
 * **Skipped**: Mitigation was not applied because validation determined it was unnecessary. \
 * **Failed**: Mitigation execution failed. \
 * **RollbackInProgress**: Rollback execution is in progress. \
 * **RolledBack**: Mitigation rollback completed successfully. \
 * **RollbackFailed**: Mitigation rollback failed.
 */
export type NeuroShieldMitigationStatus = string;

/** The response of a NeuroShieldMitigation list operation. */
export interface _NeuroShieldMitigationListResult {
  /** The NeuroShieldMitigation items on this page */
  value: NeuroShieldMitigation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _neuroShieldMitigationListResultDeserializer(
  item: any,
): _NeuroShieldMitigationListResult {
  return {
    value: neuroShieldMitigationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** 2026-10-01-preview version */
  V20261001Preview = "2026-10-01-preview",
}
