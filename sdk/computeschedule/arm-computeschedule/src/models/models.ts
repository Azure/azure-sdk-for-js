// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ErrorModel } from "@azure-rest/core-client";

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

/** The deallocate request for resources */
export interface SubmitDeallocateRequest {
  /** The schedule for the request */
  schedule: Schedule;
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources: Resources;
  /** CorrelationId item */
  correlationId: string;
}

export function submitDeallocateRequestSerializer(item: SubmitDeallocateRequest): any {
  return {
    schedule: scheduleSerializer(item["schedule"]),
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    resources: resourcesSerializer(item["resources"]),
    correlationid: item["correlationId"],
  };
}

/** The schedule details for the user request */
export interface Schedule {
  /** The deadline for the operation */
  deadline?: string;
  /** The deadline for the operation */
  userRequestDeadline?: string;
  /** The timezone for the operation */
  timezone?: string;
  /** The timezone for the operation */
  userRequestTimezone?: string;
  /** The deadlinetype of the operation, this can either be InitiateAt or CompleteBy */
  deadlineType: DeadlineType;
}

export function scheduleSerializer(item: Schedule): any {
  return {
    deadline: item["deadline"],
    deadLine: item["userRequestDeadline"],
    timezone: item["timezone"],
    timeZone: item["userRequestTimezone"],
    deadlineType: item["deadlineType"],
  };
}

/** The types of deadlines supported by ScheduledActions */
export enum KnownDeadlineType {
  /** Default value of Unknown. */
  Unknown = "Unknown",
  /** Initiate the operation at the given deadline. */
  InitiateAt = "InitiateAt",
  /** Complete the operation by the given deadline. */
  CompleteBy = "CompleteBy",
}

/**
 * The types of deadlines supported by ScheduledActions \
 * {@link KnownDeadlineType} can be used interchangeably with DeadlineType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Default value of Unknown. \
 * **InitiateAt**: Initiate the operation at the given deadline. \
 * **CompleteBy**: Complete the operation by the given deadline.
 */
export type DeadlineType = string;

/** Extra details needed to run the user's request */
export interface ExecutionParameters {
  /** Details that could optimize the user's request */
  optimizationPreference?: OptimizationPreference;
  /** Retry policy the user can pass */
  retryPolicy?: RetryPolicy;
}

export function executionParametersSerializer(item: ExecutionParameters): any {
  return {
    optimizationPreference: item["optimizationPreference"],
    retryPolicy: !item["retryPolicy"]
      ? item["retryPolicy"]
      : retryPolicySerializer(item["retryPolicy"]),
  };
}

export function executionParametersDeserializer(item: any): ExecutionParameters {
  return {
    optimizationPreference: item["optimizationPreference"],
    retryPolicy: !item["retryPolicy"]
      ? item["retryPolicy"]
      : retryPolicyDeserializer(item["retryPolicy"]),
  };
}

/** The preferences customers can select to optimize their requests to ScheduledActions */
export enum KnownOptimizationPreference {
  /** Optimize while considering cost savings */
  Cost = "Cost",
  /** Optimize while considering availability of resources */
  Availability = "Availability",
  /** Optimize while considering a balance of cost and availability */
  CostAvailabilityBalanced = "CostAvailabilityBalanced",
}

/**
 * The preferences customers can select to optimize their requests to ScheduledActions \
 * {@link KnownOptimizationPreference} can be used interchangeably with OptimizationPreference,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cost**: Optimize while considering cost savings \
 * **Availability**: Optimize while considering availability of resources \
 * **CostAvailabilityBalanced**: Optimize while considering a balance of cost and availability
 */
export type OptimizationPreference = string;

/** The retry policy for the user request */
export interface RetryPolicy {
  /** Retry count for user request */
  retryCount?: number;
  /** Retry window in minutes for user request */
  retryWindowInMinutes?: number;
  /** Action to take on failure */
  onFailureAction?: ResourceOperationType;
}

export function retryPolicySerializer(item: RetryPolicy): any {
  return {
    retryCount: item["retryCount"],
    retryWindowInMinutes: item["retryWindowInMinutes"],
    onFailureAction: item["onFailureAction"],
  };
}

export function retryPolicyDeserializer(item: any): RetryPolicy {
  return {
    retryCount: item["retryCount"],
    retryWindowInMinutes: item["retryWindowInMinutes"],
    onFailureAction: item["onFailureAction"],
  };
}

/** The kind of operation types that can be performed on resources using ScheduledActions */
export enum KnownResourceOperationType {
  /** The default value for this enum type */
  Unknown = "Unknown",
  /** Start operations on the resources */
  Start = "Start",
  /** Deallocate operations on the resources */
  Deallocate = "Deallocate",
  /** Hibernate operations on the resources */
  Hibernate = "Hibernate",
  /** Create operations on the resources */
  Create = "Create",
  /** Delete operations on the resources */
  Delete = "Delete",
}

/**
 * The kind of operation types that can be performed on resources using ScheduledActions \
 * {@link KnownResourceOperationType} can be used interchangeably with ResourceOperationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The default value for this enum type \
 * **Start**: Start operations on the resources \
 * **Deallocate**: Deallocate operations on the resources \
 * **Hibernate**: Hibernate operations on the resources \
 * **Create**: Create operations on the resources \
 * **Delete**: Delete operations on the resources
 */
export type ResourceOperationType = string;

/** The resources needed for the user request */
export interface Resources {
  /** The resource ids used for the request */
  ids: string[];
}

export function resourcesSerializer(item: Resources): any {
  return {
    ids: item["ids"].map((p: any) => {
      return p;
    }),
  };
}

/** The response from a deallocate request */
export interface DeallocateResourceOperationResponse {
  /** The description of the operation response */
  description: string;
  /** The type of resources used in the deallocate request eg virtual machines */
  type: string;
  /** The location of the deallocate request eg westus */
  location: string;
  /** The results from the deallocate request if no errors exist */
  results?: ResourceOperation[];
}

export function deallocateResourceOperationResponseDeserializer(
  item: any,
): DeallocateResourceOperationResponse {
  return {
    description: item["description"],
    type: item["type"],
    location: item["location"],
    results: !item["results"]
      ? item["results"]
      : resourceOperationArrayDeserializer(item["results"]),
  };
}

export function resourceOperationArrayDeserializer(result: Array<ResourceOperation>): any[] {
  return result.map((item) => {
    return resourceOperationDeserializer(item);
  });
}

/** High level response from an operation on a resource */
export interface ResourceOperation {
  /** Unique identifier for the resource involved in the operation, eg ArmId */
  resourceId?: string;
  /** Resource level error code if it exists */
  errorCode?: string;
  /** Resource level error details if they exist */
  errorDetails?: string;
  /** Details of the operation performed on a resource */
  operation?: ResourceOperationDetails;
}

export function resourceOperationDeserializer(item: any): ResourceOperation {
  return {
    resourceId: item["resourceId"],
    errorCode: item["errorCode"],
    errorDetails: item["errorDetails"],
    operation: !item["operation"]
      ? item["operation"]
      : resourceOperationDetailsDeserializer(item["operation"]),
  };
}

/** The details of a response from an operation on a resource */
export interface ResourceOperationDetails {
  /** Operation identifier for the unique operation */
  operationId: string;
  /** Unique identifier for the resource involved in the operation, eg ArmId */
  resourceId?: string;
  /** Type of operation performed on the resources */
  opType?: ResourceOperationType;
  /** Subscription id attached to the request */
  subscriptionId?: string;
  /** Deadline for the operation */
  deadline?: string;
  /** Type of deadline of the operation */
  deadlineType?: DeadlineType;
  /** Current state of the operation */
  state?: OperationState;
  /** Timezone for the operation */
  timezone?: string;
  /** Timezone for the operation */
  operationTimezone?: string;
  /** Operation level errors if they exist */
  resourceOperationError?: ResourceOperationError;
  /** Fallback operation details if a fallback was performed */
  fallbackOperationInfo?: FallbackOperationInfo;
  /** Time the operation was complete if errors are null */
  completedAt?: string;
  /** Retry policy the user can pass */
  retryPolicy?: RetryPolicy;
}

export function resourceOperationDetailsDeserializer(item: any): ResourceOperationDetails {
  return {
    operationId: item["operationId"],
    resourceId: item["resourceId"],
    opType: item["opType"],
    subscriptionId: item["subscriptionId"],
    deadline: item["deadline"],
    deadlineType: item["deadlineType"],
    state: item["state"],
    timezone: item["timezone"],
    operationTimezone: item["timeZone"],
    resourceOperationError: !item["resourceOperationError"]
      ? item["resourceOperationError"]
      : resourceOperationErrorDeserializer(item["resourceOperationError"]),
    fallbackOperationInfo: !item["fallbackOperationInfo"]
      ? item["fallbackOperationInfo"]
      : fallbackOperationInfoDeserializer(item["fallbackOperationInfo"]),
    completedAt: item["completedAt"],
    retryPolicy: !item["retryPolicy"]
      ? item["retryPolicy"]
      : retryPolicyDeserializer(item["retryPolicy"]),
  };
}

/** Values that define the states of operations in Scheduled Actions */
export enum KnownOperationState {
  /** The default value for the operation state enum */
  Unknown = "Unknown",
  /** Operations that are pending scheduling */
  PendingScheduling = "PendingScheduling",
  /** Operations that have been scheduled */
  Scheduled = "Scheduled",
  /** Operations that are waiting to be executed */
  PendingExecution = "PendingExecution",
  /** Operations that are in the process of being executed */
  Executing = "Executing",
  /** Operations that suceeded */
  Succeeded = "Succeeded",
  /** Operations that have failed */
  Failed = "Failed",
  /** Operations that have been Cancelled by the user */
  Cancelled = "Cancelled",
  /** Operations that are blocked */
  Blocked = "Blocked",
}

/**
 * Values that define the states of operations in Scheduled Actions \
 * {@link KnownOperationState} can be used interchangeably with OperationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The default value for the operation state enum \
 * **PendingScheduling**: Operations that are pending scheduling \
 * **Scheduled**: Operations that have been scheduled \
 * **PendingExecution**: Operations that are waiting to be executed \
 * **Executing**: Operations that are in the process of being executed \
 * **Succeeded**: Operations that suceeded \
 * **Failed**: Operations that have failed \
 * **Cancelled**: Operations that have been Cancelled by the user \
 * **Blocked**: Operations that are blocked
 */
export type OperationState = string;

/** These describe errors that occur at the resource level */
export interface ResourceOperationError {
  /** Code for the error eg 404, 500 */
  errorCode: string;
  /** Detailed message about the error */
  errorDetails: string;
}

export function resourceOperationErrorDeserializer(item: any): ResourceOperationError {
  return {
    errorCode: item["errorCode"],
    errorDetails: item["errorDetails"],
  };
}

/** Describes the fallback operation that was performed */
export interface FallbackOperationInfo {
  /** The last operation type that was performed as a fallback */
  lastOpType: ResourceOperationType;
  /** The status of the fallback operation */
  status: string;
  /** The error code if the fallback operation failed */
  error?: ResourceOperationError;
}

export function fallbackOperationInfoDeserializer(item: any): FallbackOperationInfo {
  return {
    lastOpType: item["lastOpType"],
    status: item["status"],
    error: !item["error"] ? item["error"] : resourceOperationErrorDeserializer(item["error"]),
  };
}

/** This is the request for hibernate */
export interface SubmitHibernateRequest {
  /** The schedule for the request */
  schedule: Schedule;
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources: Resources;
  /** CorrelationId item */
  correlationId: string;
}

export function submitHibernateRequestSerializer(item: SubmitHibernateRequest): any {
  return {
    schedule: scheduleSerializer(item["schedule"]),
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    resources: resourcesSerializer(item["resources"]),
    correlationid: item["correlationId"],
  };
}

/** The response from a Hibernate request */
export interface HibernateResourceOperationResponse {
  /** The description of the operation response */
  description: string;
  /** The type of resources used in the Hibernate request eg virtual machines */
  type: string;
  /** The location of the Hibernate request eg westus */
  location: string;
  /** The results from the Hibernate request if no errors exist */
  results?: ResourceOperation[];
}

export function hibernateResourceOperationResponseDeserializer(
  item: any,
): HibernateResourceOperationResponse {
  return {
    description: item["description"],
    type: item["type"],
    location: item["location"],
    results: !item["results"]
      ? item["results"]
      : resourceOperationArrayDeserializer(item["results"]),
  };
}

/** This is the request for start */
export interface SubmitStartRequest {
  /** The schedule for the request */
  schedule: Schedule;
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources: Resources;
  /** CorrelationId item */
  correlationId: string;
}

export function submitStartRequestSerializer(item: SubmitStartRequest): any {
  return {
    schedule: scheduleSerializer(item["schedule"]),
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    resources: resourcesSerializer(item["resources"]),
    correlationid: item["correlationId"],
  };
}

/** The response from a start request */
export interface StartResourceOperationResponse {
  /** The description of the operation response */
  description: string;
  /** The type of resources used in the start request eg virtual machines */
  type: string;
  /** The location of the start request eg westus */
  location: string;
  /** The results from the start request if no errors exist */
  results?: ResourceOperation[];
}

export function startResourceOperationResponseDeserializer(
  item: any,
): StartResourceOperationResponse {
  return {
    description: item["description"],
    type: item["type"],
    location: item["location"],
    results: !item["results"]
      ? item["results"]
      : resourceOperationArrayDeserializer(item["results"]),
  };
}

/** The ExecuteDeallocateRequest request for executeDeallocate operations */
export interface ExecuteDeallocateRequest {
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources: Resources;
  /** CorrelationId item */
  correlationId: string;
}

export function executeDeallocateRequestSerializer(item: ExecuteDeallocateRequest): any {
  return {
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    resources: resourcesSerializer(item["resources"]),
    correlationid: item["correlationId"],
  };
}

/** The ExecuteHibernateRequest request for executeHibernate operations */
export interface ExecuteHibernateRequest {
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources: Resources;
  /** CorrelationId item */
  correlationId: string;
}

export function executeHibernateRequestSerializer(item: ExecuteHibernateRequest): any {
  return {
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    resources: resourcesSerializer(item["resources"]),
    correlationid: item["correlationId"],
  };
}

/** The ExecuteStartRequest request for executeStart operations */
export interface ExecuteStartRequest {
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources: Resources;
  /** CorrelationId item */
  correlationId: string;
}

export function executeStartRequestSerializer(item: ExecuteStartRequest): any {
  return {
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    resources: resourcesSerializer(item["resources"]),
    correlationid: item["correlationId"],
  };
}

/** The ExecuteCreateFlexRequest request for executeCreateFlex operations */
export interface ExecuteCreateFlexRequest {
  /** Resource creation payload with flex properties */
  resourceConfigParameters: ResourceProvisionFlexPayload;
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** Correlationid item */
  correlationId?: string;
}

export function executeCreateFlexRequestSerializer(item: ExecuteCreateFlexRequest): any {
  return {
    resourceConfigParameters: resourceProvisionFlexPayloadSerializer(
      item["resourceConfigParameters"],
    ),
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    correlationid: item["correlationId"],
  };
}

/** Resource creation data model for flex VM provisioning */
export interface ResourceProvisionFlexPayload {
  /** JSON object that contains VM properties that are common across all VMs in this batch */
  virtualMachineBaseProfile?: BulkVMConfiguration;
  /** JSON array that contains VM properties that should be overridden for each VM in the batch */
  virtualMachineOverrides?: BulkVMConfiguration[];
  /** Number of VMs to be created */
  resourceCount: number;
  /** If resourceOverrides doesn't contain name, service will create name based on prefix and resourceCount */
  resourcePrefix?: string;
  /** The flex properties for flexible VM creation */
  flexProperties: FlexProperties;
}

export function resourceProvisionFlexPayloadSerializer(item: ResourceProvisionFlexPayload): any {
  return {
    virtualMachineBaseProfile: !item["virtualMachineBaseProfile"]
      ? item["virtualMachineBaseProfile"]
      : bulkVMConfigurationSerializer(item["virtualMachineBaseProfile"]),
    virtualMachineOverrides: !item["virtualMachineOverrides"]
      ? item["virtualMachineOverrides"]
      : bulkVMConfigurationArraySerializer(item["virtualMachineOverrides"]),
    resourceCount: item["resourceCount"],
    resourcePrefix: item["resourcePrefix"],
    flexProperties: flexPropertiesSerializer(item["flexProperties"]),
  };
}

/** Specifies the configuration for a virtual machine operation */
export interface BulkVMConfiguration {
  /** Identifier for created virtual machine. If not passed, it will be created from resource prefix. */
  name?: string;
  /** Specifies the Microsoft.Compute API version to use when creating underlying Virtual Machines. */
  computeApiVersion?: string;
  /** Resource group name for the virtual machine. */
  resourceGroupName?: string;
  /** The availability zones. */
  zones?: string[];
  /** The marketplace image plan used for the virtual machine. */
  plan?: Plan;
  /** The identity of the virtual machine, if configured. */
  identity?: VirtualMachineIdentity;
  /** The extended location of the Virtual Machine. */
  extendedLocation?: ExtendedLocation;
  /** Placement constraints for virtual machine hardware placement. */
  placement?: Placement;
  /** Resource tags to apply to the virtual machines created by this bulk action. */
  tags?: Record<string, string>;
  /** Specifies the properties of the virtual machine to be created. */
  properties?: BulkActionVMProperties;
  /** Virtual Machine Extensions Array to be applied to the Virtual Machines. */
  vmExtensions?: BulkActionVMExtension[];
}

export function bulkVMConfigurationSerializer(item: BulkVMConfiguration): any {
  return {
    name: item["name"],
    computeApiVersion: item["computeApiVersion"] ?? "2026-04-15-preview",
    resourceGroupName: item["resourceGroupName"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    plan: !item["plan"] ? item["plan"] : planSerializer(item["plan"]),
    identity: !item["identity"]
      ? item["identity"]
      : virtualMachineIdentitySerializer(item["identity"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    placement: !item["placement"] ? item["placement"] : placementSerializer(item["placement"]),
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : bulkActionVMPropertiesSerializer(item["properties"]),
    vmExtensions: !item["vmExtensions"]
      ? item["vmExtensions"]
      : bulkActionVMExtensionArraySerializer(item["vmExtensions"]),
  };
}

/** Plan for the resource. */
export interface Plan {
  /** A user defined name of the 3rd Party Artifact that is being procured. */
  name: string;
  /** The publisher of the 3rd Party Artifact that is being bought. E.g. NewRelic */
  publisher: string;
  /** The 3rd Party artifact that is being procured. E.g. NewRelic. Product maps to the OfferID specified for the artifact at the time of Data Market onboarding. */
  product: string;
  /** A publisher provided promotion code as provisioned in Data Market for the said product/artifact. */
  promotionCode?: string;
  /** The version of the desired product/artifact. */
  version?: string;
}

export function planSerializer(item: Plan): any {
  return {
    name: item["name"],
    publisher: item["publisher"],
    product: item["product"],
    promotionCode: item["promotionCode"],
    version: item["version"],
  };
}

/** Identity for the virtual machine. */
export interface VirtualMachineIdentity {
  /** The principal id of virtual machine identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id associated with the virtual machine. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of identity used for the virtual machine. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine. */
  type?: ResourceIdentityType;
  /** The list of user identities associated with the Virtual Machine. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserAssignedIdentitiesValue>;
}

export function virtualMachineIdentitySerializer(item: VirtualMachineIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentitiesValueRecordSerializer(item["userAssignedIdentities"]),
  };
}

/** The type of identity used for the virtual machine scale set. The type 'SystemAssigned, UserAssigned' includes both an implicitly created identity and a set of user assigned identities. The type 'None' will remove any identities from the virtual machine scale set. */
export type ResourceIdentityType =
  "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";

export function userAssignedIdentitiesValueRecordSerializer(
  item: Record<string, UserAssignedIdentitiesValue>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitiesValueSerializer(item[key]);
  });
  return result;
}

/** model interface UserAssignedIdentitiesValue */
export interface UserAssignedIdentitiesValue {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitiesValueSerializer(_item: UserAssignedIdentitiesValue): any {
  return {};
}

/** The complex type of the extended location. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name: string;
  /** The type of the extended location. */
  type: ExtendedLocationType;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { name: item["name"], type: item["type"] };
}

/** The supported ExtendedLocation types. */
export enum KnownExtendedLocationType {
  /** Azure Edge Zones location type */
  EdgeZone = "EdgeZone",
  /** Azure Custom Locations type */
  CustomLocation = "CustomLocation",
}

/**
 * The supported ExtendedLocation types. \
 * {@link KnownExtendedLocationType} can be used interchangeably with ExtendedLocationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EdgeZone**: Azure Edge Zones location type \
 * **CustomLocation**: Azure Custom Locations type
 */
export type ExtendedLocationType = string;

/** Describes the user-defined constraints for resource hardware placement. */
export interface Placement {
  /** Specifies the policy for resource's placement in availability zone. Possible values are: **Any** (used for Virtual Machines), **Auto** (used for Virtual Machine Scale Sets) - An availability zone will be automatically picked by system as part of resource creation. */
  zonePlacementPolicy?: ZonePlacementPolicyType;
  /** This property supplements the 'zonePlacementPolicy' property. If 'zonePlacementPolicy' is set to 'Any'/'Auto', availability zone selected by the system must be present in the list of availability zones passed with 'includeZones'. If 'includeZones' is not provided, all availability zones in region will be considered for selection. */
  includeZones?: string[];
  /** This property supplements the 'zonePlacementPolicy' property. If 'zonePlacementPolicy' is set to 'Any'/'Auto', availability zone selected by the system must not be present in the list of availability zones passed with 'excludeZones'. If 'excludeZones' is not provided, all availability zones in region will be considered for selection. */
  excludeZones?: string[];
}

export function placementSerializer(item: Placement): any {
  return {
    zonePlacementPolicy: item["zonePlacementPolicy"],
    includeZones: !item["includeZones"]
      ? item["includeZones"]
      : item["includeZones"].map((p: any) => {
          return p;
        }),
    excludeZones: !item["excludeZones"]
      ? item["excludeZones"]
      : item["excludeZones"].map((p: any) => {
          return p;
        }),
  };
}

/** Specifies the policy for resource's placement in availability zone. Possible values are: **Any** (used for Virtual Machines), **Auto** (used for Virtual Machine Scale Sets) - An availability zone will be automatically picked by system as part of resource creation. */
export enum KnownZonePlacementPolicyType {
  /** Any */
  Any = "Any",
  /** The platform automatically selects an availability zone based on the request. */
  Auto = "Auto",
}

/**
 * Specifies the policy for resource's placement in availability zone. Possible values are: **Any** (used for Virtual Machines), **Auto** (used for Virtual Machine Scale Sets) - An availability zone will be automatically picked by system as part of resource creation. \
 * {@link KnownZonePlacementPolicyType} can be used interchangeably with ZonePlacementPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Any** \
 * **Auto**: The platform automatically selects an availability zone based on the request.
 */
export type ZonePlacementPolicyType = string;

/** Describes the properties of a Virtual Machine for create. */
export interface BulkActionVMProperties {
  /** Specifies Redeploy, Reboot and ScheduledEventsAdditionalPublishingTargets Scheduled Event related configurations for the virtual machine. */
  scheduledEventsPolicy?: ScheduledEventsPolicy;
  /** Specifies the storage settings for the virtual machine disks. */
  storageProfile?: StorageProfile;
  /** Specifies additional capabilities enabled or disabled on the virtual machine. */
  additionalCapabilities?: AdditionalCapabilities;
  /** Specifies the operating system settings used while creating the virtual machine. Some of the settings cannot be changed once VM is provisioned. */
  osProfile?: OSProfile;
  /** Specifies the network interfaces of the virtual machine. */
  networkProfile?: NetworkProfile;
  /** Specifies the hardware profile for the virtual machine. */
  hardwareProfile?: HardwareProfile;
  /** Specifies the Security related profile settings for the virtual machine. */
  securityProfile?: SecurityProfile;
  /** Specifies the boot diagnostic settings state. Minimum compute api-version: 2015-06-15. */
  diagnosticsProfile?: DiagnosticsProfile;
  /** Specifies that the image or disk that is being used was licensed on-premises. <br><br> Possible values for Windows Server operating system are: <br><br> Windows_Client <br><br> Windows_Server <br><br> Possible values for Linux Server operating system are: <br><br> RHEL_BYOS (for RHEL) <br><br> SLES_BYOS (for SUSE) <br><br> For more information, see [Azure Hybrid Use Benefit for Windows Server](https://docs.microsoft.com/azure/virtual-machines/windows/hybrid-use-benefit-licensing) <br><br> [Azure Hybrid Use Benefit for Linux Server](https://docs.microsoft.com/azure/virtual-machines/linux/azure-hybrid-benefit-linux) <br><br> Minimum api-version: 2015-06-15 */
  licenseType?: string;
  /** Specifies the time alloted for all extensions to start. The time duration should be between 15 minutes and 120 minutes (inclusive) and should be specified in ISO 8601 format. The default value is 90 minutes (PT1H30M). Minimum compute api-version: 2020-06-01. */
  extensionsTimeBudget?: string;
  /** Specifies Scheduled Event related configurations. */
  scheduledEventsProfile?: ScheduledEventsProfile;
  /** UserData for the VM, which must be base-64 encoded. Customer should not pass any secrets in here. Minimum compute api-version: 2021-03-01. */
  userData?: string;
  /** Specifies information about the capacity reservation that is used to allocate virtual machine. Minimum compute api-version: 2021-04-01. */
  capacityReservation?: CapacityReservationProfile;
  /** Specifies the gallery applications that should be made available to the VM. */
  applicationProfile?: ApplicationProfile;
}

export function bulkActionVMPropertiesSerializer(item: BulkActionVMProperties): any {
  return {
    scheduledEventsPolicy: !item["scheduledEventsPolicy"]
      ? item["scheduledEventsPolicy"]
      : scheduledEventsPolicySerializer(item["scheduledEventsPolicy"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileSerializer(item["storageProfile"]),
    additionalCapabilities: !item["additionalCapabilities"]
      ? item["additionalCapabilities"]
      : additionalCapabilitiesSerializer(item["additionalCapabilities"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileSerializer(item["osProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hardwareProfileSerializer(item["hardwareProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : securityProfileSerializer(item["securityProfile"]),
    diagnosticsProfile: !item["diagnosticsProfile"]
      ? item["diagnosticsProfile"]
      : diagnosticsProfileSerializer(item["diagnosticsProfile"]),
    licenseType: item["licenseType"],
    extensionsTimeBudget: item["extensionsTimeBudget"],
    scheduledEventsProfile: !item["scheduledEventsProfile"]
      ? item["scheduledEventsProfile"]
      : scheduledEventsProfileSerializer(item["scheduledEventsProfile"]),
    userData: item["userData"],
    capacityReservation: !item["capacityReservation"]
      ? item["capacityReservation"]
      : capacityReservationProfileSerializer(item["capacityReservation"]),
    applicationProfile: !item["applicationProfile"]
      ? item["applicationProfile"]
      : applicationProfileSerializer(item["applicationProfile"]),
  };
}

/** Specifies Redeploy, Reboot and ScheduledEventsAdditionalPublishingTargets Scheduled Event related configurations. */
export interface ScheduledEventsPolicy {
  /** The configuration parameters used while creating userInitiatedRedeploy scheduled event setting creation. */
  userInitiatedRedeploy?: UserInitiatedRedeploy;
  /** The configuration parameters used while creating userInitiatedReboot scheduled event setting creation. */
  userInitiatedReboot?: UserInitiatedReboot;
  /** The configuration parameters used while publishing scheduledEventsAdditionalPublishingTargets. */
  scheduledEventsAdditionalPublishingTargets?: ScheduledEventsAdditionalPublishingTargets;
  /** The configuration parameters used while creating AllInstancesDown scheduled event setting creation. */
  allInstancesDown?: AllInstancesDown;
}

export function scheduledEventsPolicySerializer(item: ScheduledEventsPolicy): any {
  return {
    userInitiatedRedeploy: !item["userInitiatedRedeploy"]
      ? item["userInitiatedRedeploy"]
      : userInitiatedRedeploySerializer(item["userInitiatedRedeploy"]),
    userInitiatedReboot: !item["userInitiatedReboot"]
      ? item["userInitiatedReboot"]
      : userInitiatedRebootSerializer(item["userInitiatedReboot"]),
    scheduledEventsAdditionalPublishingTargets: !item["scheduledEventsAdditionalPublishingTargets"]
      ? item["scheduledEventsAdditionalPublishingTargets"]
      : scheduledEventsAdditionalPublishingTargetsSerializer(
          item["scheduledEventsAdditionalPublishingTargets"],
        ),
    allInstancesDown: !item["allInstancesDown"]
      ? item["allInstancesDown"]
      : allInstancesDownSerializer(item["allInstancesDown"]),
  };
}

/** Specifies Redeploy related Scheduled Event related configurations. */
export interface UserInitiatedRedeploy {
  /** Specifies Redeploy Scheduled Event related configurations. */
  automaticallyApprove?: boolean;
}

export function userInitiatedRedeploySerializer(item: UserInitiatedRedeploy): any {
  return { automaticallyApprove: item["automaticallyApprove"] };
}

/** Specifies Reboot related Scheduled Event related configurations. */
export interface UserInitiatedReboot {
  /** Specifies Reboot Scheduled Event related configurations. */
  automaticallyApprove?: boolean;
}

export function userInitiatedRebootSerializer(item: UserInitiatedReboot): any {
  return { automaticallyApprove: item["automaticallyApprove"] };
}

/** Specifies additional publishing targets for scheduled events. */
export interface ScheduledEventsAdditionalPublishingTargets {
  /** The configuration parameters used while creating eventGridAndResourceGraph Scheduled Event setting. */
  eventGridAndResourceGraph?: EventGridAndResourceGraph;
}

export function scheduledEventsAdditionalPublishingTargetsSerializer(
  item: ScheduledEventsAdditionalPublishingTargets,
): any {
  return {
    eventGridAndResourceGraph: !item["eventGridAndResourceGraph"]
      ? item["eventGridAndResourceGraph"]
      : eventGridAndResourceGraphSerializer(item["eventGridAndResourceGraph"]),
  };
}

/** Specifies eventGridAndResourceGraph related Scheduled Event related configurations. */
export interface EventGridAndResourceGraph {
  /** Specifies if event grid and resource graph is enabled for Scheduled event related configurations. */
  enable?: boolean;
  /** Specifies the api-version to determine which Scheduled Events configuration schema version will be delivered. */
  scheduledEventsApiVersion?: string;
}

export function eventGridAndResourceGraphSerializer(item: EventGridAndResourceGraph): any {
  return {
    enable: item["enable"],
    scheduledEventsApiVersion: item["scheduledEventsApiVersion"] ?? "2026-04-15-preview",
  };
}

/** Specifies if Scheduled Events should be auto-approved when all instances are down. */
export interface AllInstancesDown {
  /** Specifies if Scheduled Events should be auto-approved when all instances are down. Its default value is true. */
  automaticallyApprove?: boolean;
}

export function allInstancesDownSerializer(item: AllInstancesDown): any {
  return { automaticallyApprove: item["automaticallyApprove"] };
}

/** Specifies the storage settings for the virtual machine disks. */
export interface StorageProfile {
  /** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. */
  imageReference?: ImageReference;
  /** Specifies information about the operating system disk used by the virtual machine. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  osDisk?: OSDisk;
  /** Specifies the parameters that are used to add a data disk to a virtual machine. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
  dataDisks?: DataDisk[];
  /** Specifies the disk controller type configured for the VM. **Note:** This property will be set to the default disk controller type if not specified provided virtual machine is being created with 'hyperVGeneration' set to V2 based on the capabilities of the operating system disk and VM size from the the specified minimum api version. You need to deallocate the VM before updating its disk controller type unless you are updating the VM size in the VM configuration which implicitly deallocates and reallocates the VM. Minimum api-version: 2022-08-01. */
  diskControllerType?: DiskControllerTypes;
}

export function storageProfileSerializer(item: StorageProfile): any {
  return {
    imageReference: !item["imageReference"]
      ? item["imageReference"]
      : imageReferenceSerializer(item["imageReference"]),
    osDisk: !item["osDisk"] ? item["osDisk"] : osDiskSerializer(item["osDisk"]),
    dataDisks: !item["dataDisks"] ? item["dataDisks"] : dataDiskArraySerializer(item["dataDisks"]),
    diskControllerType: item["diskControllerType"],
  };
}

/** Specifies information about the image to use. You can specify information about platform images, marketplace images, or virtual machine images. This element is required when you want to use a platform image, marketplace image, or virtual machine image, but is not used in other creation operations. NOTE: Image reference publisher and offer can only be set when you create the scale set. */
export interface ImageReference extends SubResource {
  /** The image publisher. */
  publisher?: string;
  /** Specifies the offer of the platform image or marketplace image used to create the virtual machine. */
  offer?: string;
  /** The image SKU. */
  sku?: string;
  /** Specifies the version of the platform image or marketplace image used to create the virtual machine. The allowed formats are Major.Minor.Build or 'latest'. Major, Minor, and Build are decimal numbers. Specify 'latest' to use the latest version of an image available at deploy time. Even if you use 'latest', the VM image will not automatically update after deploy time even if a new version becomes available. Please do not use field 'version' for gallery image deployment, gallery image should always use 'id' field for deployment, to use 'latest' version of gallery image, just set '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/images/{imageName}' in the 'id' field without version input. */
  version?: string;
  /** Specified the shared gallery image unique id for vm deployment. This can be fetched from shared gallery image GET call. */
  sharedGalleryImageId?: string;
  /** Specified the community gallery image unique id for vm deployment. This can be fetched from community gallery image GET call. */
  communityGalleryImageId?: string;
}

export function imageReferenceSerializer(item: ImageReference): any {
  return {
    id: item["id"],
    publisher: item["publisher"],
    offer: item["offer"],
    sku: item["sku"],
    version: item["version"],
    sharedGalleryImageId: item["sharedGalleryImageId"],
    communityGalleryImageId: item["communityGalleryImageId"],
  };
}

/** Specifies information about the operating system disk used by the virtual machine. For more information about disks, see [About disks and VHDs for Azure virtual machines](https://docs.microsoft.com/azure/virtual-machines/managed-disks-overview). */
export interface OSDisk {
  /** This property allows you to specify the type of the OS that is included in the disk if creating a VM from user-image or a specialized VHD. Possible values are: Windows, Linux. */
  osType?: OperatingSystemTypes;
  /** Specifies the encryption settings for the OS Disk. Minimum compute api-version: 2015-06-15. */
  encryptionSettings?: DiskEncryptionSettings;
  /** The disk name. */
  name?: string;
  /** The virtual hard disk. */
  vhd?: VirtualHardDisk;
  /** The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. */
  image?: VirtualHardDisk;
  /** Specifies the caching requirements. Possible values are: None, ReadOnly, ReadWrite. The defaulting behavior is: None for Standard storage. ReadOnly for Premium storage. */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies the ephemeral Disk Settings for the operating system disk used by the virtual machine. */
  diffDiskSettings?: DiffDiskSettings;
  /** Specifies how the virtual machine disk should be created. Possible values are Attach, FromImage. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described. */
  createOption: DiskCreateOptionTypes;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023. */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: ManagedDiskParameters;
  /** Specifies whether OS Disk should be deleted or detached upon VM deletion. Possible values are: Delete, Detach. The default value is set to Detach. For an ephemeral OS Disk, the default value is set to Delete. The user cannot change the delete option for an ephemeral OS Disk. */
  deleteOption?: DiskDeleteOptionTypes;
}

export function osDiskSerializer(item: OSDisk): any {
  return {
    osType: item["osType"],
    encryptionSettings: !item["encryptionSettings"]
      ? item["encryptionSettings"]
      : diskEncryptionSettingsSerializer(item["encryptionSettings"]),
    name: item["name"],
    vhd: !item["vhd"] ? item["vhd"] : virtualHardDiskSerializer(item["vhd"]),
    image: !item["image"] ? item["image"] : virtualHardDiskSerializer(item["image"]),
    caching: item["caching"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
    diffDiskSettings: !item["diffDiskSettings"]
      ? item["diffDiskSettings"]
      : diffDiskSettingsSerializer(item["diffDiskSettings"]),
    createOption: item["createOption"],
    diskSizeGB: item["diskSizeGB"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskParametersSerializer(item["managedDisk"]),
    deleteOption: item["deleteOption"],
  };
}

/** This property allows you to specify the supported type of the OS that application is built for. Possible values are: **Windows,** **Linux.** */
export enum KnownOperatingSystemTypes {
  /** Windows OS */
  Windows = "Windows",
  /** Linux OS */
  Linux = "Linux",
}

/**
 * This property allows you to specify the supported type of the OS that application is built for. Possible values are: **Windows,** **Linux.** \
 * {@link KnownOperatingSystemTypes} can be used interchangeably with OperatingSystemTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows**: Windows OS \
 * **Linux**: Linux OS
 */
export type OperatingSystemTypes = string;

/** Describes a Encryption Settings for a Disk */
export interface DiskEncryptionSettings {
  /** Specifies the location of the disk encryption key, which is a Key Vault Secret. */
  diskEncryptionKey?: KeyVaultSecretReference;
  /** Specifies the location of the key encryption key in Key Vault. */
  keyEncryptionKey?: KeyVaultKeyReference;
  /** Specifies whether disk encryption should be enabled on the virtual machine. */
  enabled?: boolean;
}

export function diskEncryptionSettingsSerializer(item: DiskEncryptionSettings): any {
  return {
    diskEncryptionKey: !item["diskEncryptionKey"]
      ? item["diskEncryptionKey"]
      : keyVaultSecretReferenceSerializer(item["diskEncryptionKey"]),
    keyEncryptionKey: !item["keyEncryptionKey"]
      ? item["keyEncryptionKey"]
      : keyVaultKeyReferenceSerializer(item["keyEncryptionKey"]),
    enabled: item["enabled"],
  };
}

/** Describes a reference to Key Vault Secret */
export interface KeyVaultSecretReference {
  /** The URL referencing a secret in a Key Vault. */
  secretUrl: string;
  /** The relative URL of the Key Vault containing the secret. */
  sourceVault: SubResource;
}

export function keyVaultSecretReferenceSerializer(item: KeyVaultSecretReference): any {
  return { secretUrl: item["secretUrl"], sourceVault: subResourceSerializer(item["sourceVault"]) };
}

/** Describes a reference to a sub-resource. */
export interface SubResource {
  /** The ID of the sub-resource. */
  id?: string;
}

export function subResourceSerializer(item: SubResource): any {
  return { id: item["id"] };
}

/** Describes a reference to Key Vault Key */
export interface KeyVaultKeyReference {
  /** The URL referencing a key encryption key in Key Vault. */
  keyUrl: string;
  /** The relative URL of the Key Vault containing the key. */
  sourceVault: SubResource;
}

export function keyVaultKeyReferenceSerializer(item: KeyVaultKeyReference): any {
  return { keyUrl: item["keyUrl"], sourceVault: subResourceSerializer(item["sourceVault"]) };
}

/** Describes the uri of a disk. */
export interface VirtualHardDisk {
  /** Specifies the virtual hard disk's uri. */
  uri?: string;
}

export function virtualHardDiskSerializer(item: VirtualHardDisk): any {
  return { uri: item["uri"] };
}

/** Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The default values are: **None for Standard storage. ReadOnly for Premium storage** */
export enum KnownCachingTypes {
  /** Caching type:None */
  None = "None",
  /** Caching type:ReadOnly */
  ReadOnly = "ReadOnly",
  /** Caching type:ReadWrite */
  ReadWrite = "ReadWrite",
}

/**
 * Specifies the caching requirements. Possible values are: **None,** **ReadOnly,** **ReadWrite.** The default values are: **None for Standard storage. ReadOnly for Premium storage** \
 * {@link KnownCachingTypes} can be used interchangeably with CachingTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Caching type:None \
 * **ReadOnly**: Caching type:ReadOnly \
 * **ReadWrite**: Caching type:ReadWrite
 */
export type CachingTypes = string;

/** Describes the parameters of ephemeral disk settings that can be specified for operating system disk. Note: The ephemeral disk settings can only be specified for managed disk. */
export interface DiffDiskSettings {
  /** Specifies the ephemeral disk settings for operating system disk. */
  option?: DiffDiskOptions;
  /** Specifies the ephemeral disk placement for operating system disk. Possible values are: CacheDisk, ResourceDisk, NvmeDisk. The defaulting behavior is: CacheDisk if one is configured for the VM size otherwise ResourceDisk or NvmeDisk is used. Minimum api-version for NvmeDisk: 2024-03-01. */
  placement?: DiffDiskPlacement;
}

export function diffDiskSettingsSerializer(item: DiffDiskSettings): any {
  return { option: item["option"], placement: item["placement"] };
}

/** Specifies the ephemeral disk option for operating system disk. */
export enum KnownDiffDiskOptions {
  /** Local Ephemeral disk option: Local */
  Local = "Local",
}

/**
 * Specifies the ephemeral disk option for operating system disk. \
 * {@link KnownDiffDiskOptions} can be used interchangeably with DiffDiskOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Local**: Local Ephemeral disk option: Local
 */
export type DiffDiskOptions = string;

/** Specifies the ephemeral disk placement for operating system disk. This property can be used by user in the request to choose the location i.e, cache disk, resource disk or nvme disk space for Ephemeral OS disk provisioning. For more information on Ephemeral OS disk size requirements, please refer Ephemeral OS disk size requirements for Windows VM at https://docs.microsoft.com/azure/virtual-machines/windows/ephemeral-os-disks#size-requirements and Linux VM at https://docs.microsoft.com/azure/virtual-machines/linux/ephemeral-os-disks#size-requirements. Minimum api-version for NvmeDisk: 2024-03-01. */
export enum KnownDiffDiskPlacement {
  /** CacheDisk disk placement */
  CacheDisk = "CacheDisk",
  /** ResourceDisk disk placement */
  ResourceDisk = "ResourceDisk",
  /** NvmeDisk disk placement */
  NvmeDisk = "NvmeDisk",
}

/**
 * Specifies the ephemeral disk placement for operating system disk. This property can be used by user in the request to choose the location i.e, cache disk, resource disk or nvme disk space for Ephemeral OS disk provisioning. For more information on Ephemeral OS disk size requirements, please refer Ephemeral OS disk size requirements for Windows VM at https://docs.microsoft.com/azure/virtual-machines/windows/ephemeral-os-disks#size-requirements and Linux VM at https://docs.microsoft.com/azure/virtual-machines/linux/ephemeral-os-disks#size-requirements. Minimum api-version for NvmeDisk: 2024-03-01. \
 * {@link KnownDiffDiskPlacement} can be used interchangeably with DiffDiskPlacement,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CacheDisk**: CacheDisk disk placement \
 * **ResourceDisk**: ResourceDisk disk placement \
 * **NvmeDisk**: NvmeDisk disk placement
 */
export type DiffDiskPlacement = string;

/** Specifies how the virtual machine disk should be created. Possible values are **Attach:** This value is used when you are using a specialized disk to create the virtual machine. **FromImage:** This value is used when you are using an image to create the virtual machine. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described. **Empty:** This value is used when creating an empty data disk. **Copy:** This value is used to create a data disk from a snapshot or another disk. **Restore:** This value is used to create a data disk from a disk restore point. */
export enum KnownDiskCreateOptionTypes {
  /** Create disk FromImage */
  FromImage = "FromImage",
  /** Empty value */
  Empty = "Empty",
  /** Create disk by Attach */
  Attach = "Attach",
  /** Create disk by Copy */
  Copy = "Copy",
  /** Create disk by Restore */
  Restore = "Restore",
}

/**
 * Specifies how the virtual machine disk should be created. Possible values are **Attach:** This value is used when you are using a specialized disk to create the virtual machine. **FromImage:** This value is used when you are using an image to create the virtual machine. If you are using a platform image, you should also use the imageReference element described above. If you are using a marketplace image, you should also use the plan element previously described. **Empty:** This value is used when creating an empty data disk. **Copy:** This value is used to create a data disk from a snapshot or another disk. **Restore:** This value is used to create a data disk from a disk restore point. \
 * {@link KnownDiskCreateOptionTypes} can be used interchangeably with DiskCreateOptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FromImage**: Create disk FromImage \
 * **Empty**: Empty value \
 * **Attach**: Create disk by Attach \
 * **Copy**: Create disk by Copy \
 * **Restore**: Create disk by Restore
 */
export type DiskCreateOptionTypes = string;

/** The parameters of a managed disk. */
export interface ManagedDiskParameters extends SubResource {
  /** Specifies the storage account type for the managed disk. NOTE: UltraSSD_LRS can only be used with data disks, it cannot be used with OS Disk. */
  storageAccountType?: StorageAccountTypes;
  /** Specifies the customer managed disk encryption set resource id for the managed disk. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
  /** Specifies the security profile for the managed disk. */
  securityProfile?: VMDiskSecurityProfile;
}

export function managedDiskParametersSerializer(item: ManagedDiskParameters): any {
  return {
    id: item["id"],
    storageAccountType: item["storageAccountType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersSerializer(item["diskEncryptionSet"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : vmDiskSecurityProfileSerializer(item["securityProfile"]),
  };
}

/** Specifies the storage account type for the managed disk. Managed OS disk storage account type can only be set when you create the scale set. NOTE: UltraSSD_LRS can only be used with data disks. It cannot be used with OS Disk. Standard_LRS uses Standard HDD. StandardSSD_LRS uses Standard SSD. Premium_LRS uses Premium SSD. UltraSSD_LRS uses Ultra disk. Premium_ZRS uses Premium SSD zone redundant storage. StandardSSD_ZRS uses Standard SSD zone redundant storage. For more information regarding disks supported for Windows Virtual Machines, refer to https://docs.microsoft.com/azure/virtual-machines/windows/disks-types and, for Linux Virtual Machines, refer to https://docs.microsoft.com/azure/virtual-machines/linux/disks-types */
export enum KnownStorageAccountTypes {
  /** Standard_LRS storage account type */
  StandardLRS = "Standard_LRS",
  /** Premium_LRS storage account type */
  PremiumLRS = "Premium_LRS",
  /** StandardSSD_LRS storage account type */
  StandardSSDLRS = "StandardSSD_LRS",
  /** UltraSSD_LRS storage account type */
  UltraSSDLRS = "UltraSSD_LRS",
  /** Premium_ZRS storage account type */
  PremiumZRS = "Premium_ZRS",
  /** StandardSSD_ZRS storage account type */
  StandardSSDZRS = "StandardSSD_ZRS",
  /** PremiumV2_LRS storage account type */
  PremiumV2LRS = "PremiumV2_LRS",
}

/**
 * Specifies the storage account type for the managed disk. Managed OS disk storage account type can only be set when you create the scale set. NOTE: UltraSSD_LRS can only be used with data disks. It cannot be used with OS Disk. Standard_LRS uses Standard HDD. StandardSSD_LRS uses Standard SSD. Premium_LRS uses Premium SSD. UltraSSD_LRS uses Ultra disk. Premium_ZRS uses Premium SSD zone redundant storage. StandardSSD_ZRS uses Standard SSD zone redundant storage. For more information regarding disks supported for Windows Virtual Machines, refer to https://docs.microsoft.com/azure/virtual-machines/windows/disks-types and, for Linux Virtual Machines, refer to https://docs.microsoft.com/azure/virtual-machines/linux/disks-types \
 * {@link KnownStorageAccountTypes} can be used interchangeably with StorageAccountTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS**: Standard_LRS storage account type \
 * **Premium_LRS**: Premium_LRS storage account type \
 * **StandardSSD_LRS**: StandardSSD_LRS storage account type \
 * **UltraSSD_LRS**: UltraSSD_LRS storage account type \
 * **Premium_ZRS**: Premium_ZRS storage account type \
 * **StandardSSD_ZRS**: StandardSSD_ZRS storage account type \
 * **PremiumV2_LRS**: PremiumV2_LRS storage account type
 */
export type StorageAccountTypes = string;

/** Describes the parameter of customer managed disk encryption set resource id that can be specified for disk. **Note:** The disk encryption set resource id can only be specified for managed disk. Please refer https://aka.ms/mdssewithcmkoverview for more details. */
export interface DiskEncryptionSetParameters extends SubResource {}

export function diskEncryptionSetParametersSerializer(item: DiskEncryptionSetParameters): any {
  return { id: item["id"] };
}

/** Specifies the security profile settings for the managed disk. **Note:** It can only be set for Confidential VMs. */
export interface VMDiskSecurityProfile {
  /** Specifies the EncryptionType of the managed disk. It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob, VMGuestStateOnly for encryption of just the VMGuestState blob, and NonPersistedTPM for not persisting firmware state in the VMGuestState blob.. **Note:** It can be set for only Confidential VMs. */
  securityEncryptionType?: SecurityEncryptionTypes;
  /** Specifies the customer managed disk encryption set resource id for the managed disk that is used for Customer Managed Key encrypted ConfidentialVM OS Disk and VMGuest blob. */
  diskEncryptionSet?: DiskEncryptionSetParameters;
}

export function vmDiskSecurityProfileSerializer(item: VMDiskSecurityProfile): any {
  return {
    securityEncryptionType: item["securityEncryptionType"],
    diskEncryptionSet: !item["diskEncryptionSet"]
      ? item["diskEncryptionSet"]
      : diskEncryptionSetParametersSerializer(item["diskEncryptionSet"]),
  };
}

/** Specifies the EncryptionType of the managed disk. It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob, VMGuestStateOnly for encryption of just the VMGuestState blob, and NonPersistedTPM for not persisting firmware state in the VMGuestState blob.. **Note:** It can be set for only Confidential VMs. */
export enum KnownSecurityEncryptionTypes {
  /** VMGuestStateOnly encryption */
  VMGuestStateOnly = "VMGuestStateOnly",
  /** DiskWithVMGuestState encryption */
  DiskWithVMGuestState = "DiskWithVMGuestState",
  /** NonPersistedTPM encryption */
  NonPersistedTPM = "NonPersistedTPM",
}

/**
 * Specifies the EncryptionType of the managed disk. It is set to DiskWithVMGuestState for encryption of the managed disk along with VMGuestState blob, VMGuestStateOnly for encryption of just the VMGuestState blob, and NonPersistedTPM for not persisting firmware state in the VMGuestState blob.. **Note:** It can be set for only Confidential VMs. \
 * {@link KnownSecurityEncryptionTypes} can be used interchangeably with SecurityEncryptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VMGuestStateOnly**: VMGuestStateOnly encryption \
 * **DiskWithVMGuestState**: DiskWithVMGuestState encryption \
 * **NonPersistedTPM**: NonPersistedTPM encryption
 */
export type SecurityEncryptionTypes = string;

/** Specifies the behavior of the managed disk when the VM gets deleted, for example whether the managed disk is deleted or detached. Supported values are: **Delete.** If this value is used, the managed disk is deleted when VM gets deleted. **Detach.** If this value is used, the managed disk is retained after VM gets deleted. Minimum api-version: 2021-03-01. */
export enum KnownDiskDeleteOptionTypes {
  /** Delete the disk upon VM deletion */
  Delete = "Delete",
  /** Detach the disk upon VM deletion */
  Detach = "Detach",
}

/**
 * Specifies the behavior of the managed disk when the VM gets deleted, for example whether the managed disk is deleted or detached. Supported values are: **Delete.** If this value is used, the managed disk is deleted when VM gets deleted. **Detach.** If this value is used, the managed disk is retained after VM gets deleted. Minimum api-version: 2021-03-01. \
 * {@link KnownDiskDeleteOptionTypes} can be used interchangeably with DiskDeleteOptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete**: Delete the disk upon VM deletion \
 * **Detach**: Detach the disk upon VM deletion
 */
export type DiskDeleteOptionTypes = string;

export function dataDiskArraySerializer(result: Array<DataDisk>): any[] {
  return result.map((item) => {
    return dataDiskSerializer(item);
  });
}

/** Describes a data disk. */
export interface DataDisk {
  /** Specifies the logical unit number of the data disk. This value is used to identify data disks within the VM and therefore must be unique for each data disk attached to a VM. */
  lun: number;
  /** The disk name. */
  name?: string;
  /** The virtual hard disk. */
  vhd?: VirtualHardDisk;
  /** The source user image virtual hard disk. The virtual hard disk will be copied before being attached to the virtual machine. If SourceImage is provided, the destination virtual hard drive must not exist. */
  image?: VirtualHardDisk;
  /** Specifies the caching requirements. Possible values are: None, ReadOnly, ReadWrite. The defaulting behavior is: None for Standard storage. ReadOnly for Premium storage. */
  caching?: CachingTypes;
  /** Specifies whether writeAccelerator should be enabled or disabled on the disk. */
  writeAcceleratorEnabled?: boolean;
  /** Specifies how the virtual machine disk should be created. Possible values are Attach, FromImage, Empty, Copy, Restore. */
  createOption: DiskCreateOptionTypes;
  /** Specifies the size of an empty data disk in gigabytes. This element can be used to overwrite the size of the disk in a virtual machine image. The property 'diskSizeGB' is the number of bytes x 1024^3 for the disk and the value cannot be larger than 1023. */
  diskSizeGB?: number;
  /** The managed disk parameters. */
  managedDisk?: ManagedDiskParameters;
  /** The source resource identifier. It can be a snapshot, or disk restore point from which to create a disk. */
  sourceResource?: ApiEntityReference;
  /** Specifies whether the data disk is in process of detachment from the VirtualMachine/VirtualMachineScaleset. */
  toBeDetached?: boolean;
  /** Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values: ForceDetach. This feature is still in preview. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'. */
  detachOption?: DiskDetachOptionTypes;
  /** Specifies whether data disk should be deleted or detached upon VM deletion. Possible values are: Delete, Detach. The default value is set to Detach. */
  deleteOption?: DiskDeleteOptionTypes;
}

export function dataDiskSerializer(item: DataDisk): any {
  return {
    lun: item["lun"],
    name: item["name"],
    vhd: !item["vhd"] ? item["vhd"] : virtualHardDiskSerializer(item["vhd"]),
    image: !item["image"] ? item["image"] : virtualHardDiskSerializer(item["image"]),
    caching: item["caching"],
    writeAcceleratorEnabled: item["writeAcceleratorEnabled"],
    createOption: item["createOption"],
    diskSizeGB: item["diskSizeGB"],
    managedDisk: !item["managedDisk"]
      ? item["managedDisk"]
      : managedDiskParametersSerializer(item["managedDisk"]),
    sourceResource: !item["sourceResource"]
      ? item["sourceResource"]
      : apiEntityReferenceSerializer(item["sourceResource"]),
    toBeDetached: item["toBeDetached"],
    detachOption: item["detachOption"],
    deleteOption: item["deleteOption"],
  };
}

/** The API entity reference. */
export interface ApiEntityReference {
  /** The ARM resource id in the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/... */
  id?: string;
}

export function apiEntityReferenceSerializer(item: ApiEntityReference): any {
  return { id: item["id"] };
}

/** Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values are: **ForceDetach.** detachOption: **ForceDetach** is applicable only for managed data disks. If a previous detachment attempt of the data disk did not complete due to an unexpected failure from the virtual machine and the disk is still not released then use force-detach as a last resort option to detach the disk forcibly from the VM. All writes might not have been flushed when using this detach behavior. **This feature is still in preview**. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'. */
export enum KnownDiskDetachOptionTypes {
  /** ForceDetach the disk */
  ForceDetach = "ForceDetach",
}

/**
 * Specifies the detach behavior to be used while detaching a disk or which is already in the process of detachment from the virtual machine. Supported values are: **ForceDetach.** detachOption: **ForceDetach** is applicable only for managed data disks. If a previous detachment attempt of the data disk did not complete due to an unexpected failure from the virtual machine and the disk is still not released then use force-detach as a last resort option to detach the disk forcibly from the VM. All writes might not have been flushed when using this detach behavior. **This feature is still in preview**. To force-detach a data disk update toBeDetached to 'true' along with setting detachOption: 'ForceDetach'. \
 * {@link KnownDiskDetachOptionTypes} can be used interchangeably with DiskDetachOptionTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ForceDetach**: ForceDetach the disk
 */
export type DiskDetachOptionTypes = string;

/** Specifies the disk controller type configured for the VM and VirtualMachineScaleSet. This property is only supported for virtual machines whose operating system disk and VM sku supports Generation 2 (https://docs.microsoft.com/en-us/azure/virtual-machines/generation-2), please check the HyperVGenerations capability returned as part of VM sku capabilities in the response of Microsoft.Compute SKUs api for the region contains V2 (https://docs.microsoft.com/rest/api/compute/resourceskus/list). For more information about Disk Controller Types supported please refer to https://aka.ms/azure-diskcontrollertypes. */
export enum KnownDiskControllerTypes {
  /** SCSI disk controller type */
  Scsi = "SCSI",
  /** NVMe disk controller type */
  NVMe = "NVMe",
}

/**
 * Specifies the disk controller type configured for the VM and VirtualMachineScaleSet. This property is only supported for virtual machines whose operating system disk and VM sku supports Generation 2 (https://docs.microsoft.com/en-us/azure/virtual-machines/generation-2), please check the HyperVGenerations capability returned as part of VM sku capabilities in the response of Microsoft.Compute SKUs api for the region contains V2 (https://docs.microsoft.com/rest/api/compute/resourceskus/list). For more information about Disk Controller Types supported please refer to https://aka.ms/azure-diskcontrollertypes. \
 * {@link KnownDiskControllerTypes} can be used interchangeably with DiskControllerTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SCSI**: SCSI disk controller type \
 * **NVMe**: NVMe disk controller type
 */
export type DiskControllerTypes = string;

/** Enables or disables a capability on the virtual machine or virtual machine scale set. */
export interface AdditionalCapabilities {
  /** The flag that enables or disables a capability to have one or more managed data disks with UltraSSD_LRS storage account type on the VM or VMSS. Managed disks with storage account type UltraSSD_LRS can be added to a virtual machine or virtual machine scale set only if this property is enabled. */
  ultraSSDEnabled?: boolean;
  /** The flag that enables or disables hibernation capability on the VM. */
  hibernationEnabled?: boolean;
}

export function additionalCapabilitiesSerializer(item: AdditionalCapabilities): any {
  return {
    ultraSSDEnabled: item["ultraSSDEnabled"],
    hibernationEnabled: item["hibernationEnabled"],
  };
}

/** Specifies the operating system settings for the virtual machine. Some of the settings cannot be changed once VM is provisioned. */
export interface OSProfile {
  /** Specifies the host OS name of the virtual machine. This name cannot be updated after the VM is created. **Max-length (Windows):** 15 characters. **Max-length (Linux):** 64 characters. For naming conventions and restrictions see [Azure infrastructure services implementation guidelines](https://docs.microsoft.com/azure/azure-resource-manager/management/resource-name-rules). */
  computerName?: string;
  /** Specifies the name of the administrator account. <br><br> This property cannot be updated after the VM is created. <br><br> **Windows-only restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length (Linux):** 1  character <br><br> **Max-length (Linux):** 64 characters <br><br> **Max-length (Windows):** 20 characters. */
  adminUsername?: string;
  /** Specifies the password of the administrator account. <br><br> **Minimum-length (Windows):** 8 characters <br><br> **Minimum-length (Linux):** 6 characters <br><br> **Max-length (Windows):** 123 characters <br><br> **Max-length (Linux):** 72 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" <br><br> For resetting the password, see [How to reset the Remote Desktop service or its login password in a Windows VM](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/reset-rdp) <br><br> For resetting root password, see [Manage users, SSH, and check or repair disks on Azure Linux VMs using the VMAccess Extension](https://docs.microsoft.com/troubleshoot/azure/virtual-machines/troubleshoot-ssh-connection) */
  adminPassword?: string;
  /** Specifies a base-64 encoded string of custom data. The base-64 encoded string is decoded to a binary array that is saved as a file on the Virtual Machine. The maximum length of the binary array is 65535 bytes. **Note: Do not pass any secrets or passwords in customData property.** This property cannot be updated after the VM is created. The property 'customData' is passed to the VM to be saved as a file, for more information see [Custom Data on Azure VMs](https://azure.microsoft.com/blog/custom-data-and-cloud-init-on-windows-azure/). For using cloud-init for your Linux VM, see [Using cloud-init to customize a Linux VM during creation](https://docs.microsoft.com/azure/virtual-machines/linux/using-cloud-init). */
  customData?: string;
  /** Specifies Windows operating system settings on the virtual machine. */
  windowsConfiguration?: WindowsConfiguration;
  /** Specifies the Linux operating system settings on the virtual machine. For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros). */
  linuxConfiguration?: LinuxConfiguration;
  /** Specifies set of certificates that should be installed onto the virtual machine. To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  secrets?: VaultSecretGroup[];
  /** Specifies whether extension operations should be allowed on the virtual machine. This may only be set to False when no extensions are present on the virtual machine. */
  allowExtensionOperations?: boolean;
  /** Optional property which must either be set to True or omitted. */
  requireGuestProvisionSignal?: boolean;
}

export function osProfileSerializer(item: OSProfile): any {
  return {
    computerName: item["computerName"],
    adminUsername: item["adminUsername"],
    adminPassword: item["adminPassword"],
    customData: item["customData"],
    windowsConfiguration: !item["windowsConfiguration"]
      ? item["windowsConfiguration"]
      : windowsConfigurationSerializer(item["windowsConfiguration"]),
    linuxConfiguration: !item["linuxConfiguration"]
      ? item["linuxConfiguration"]
      : linuxConfigurationSerializer(item["linuxConfiguration"]),
    secrets: !item["secrets"] ? item["secrets"] : vaultSecretGroupArraySerializer(item["secrets"]),
    allowExtensionOperations: item["allowExtensionOperations"],
    requireGuestProvisionSignal: item["requireGuestProvisionSignal"],
  };
}

/** Specifies Windows operating system settings on the virtual machine. */
export interface WindowsConfiguration {
  /** Indicates whether virtual machine agent should be provisioned on the virtual machine. When this property is not specified in the request body, it is set to true by default. This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later. */
  provisionVMAgent?: boolean;
  /** Indicates whether Automatic Updates is enabled for the Windows virtual machine. Default value is true. For virtual machine scale sets, this property can be updated and updates will take effect on OS reprovisioning. */
  enableAutomaticUpdates?: boolean;
  /** Specifies the time zone of the virtual machine. e.g. "Pacific Standard Time". Possible values can be [TimeZoneInfo.Id](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.id?#System_TimeZoneInfo_Id) value from time zones returned by [TimeZoneInfo.GetSystemTimeZones](https://docs.microsoft.com/dotnet/api/system.timezoneinfo.getsystemtimezones). */
  timeZone?: string;
  /** Specifies additional base-64 encoded XML formatted information that can be included in the Unattend.xml file, which is used by Windows Setup. */
  additionalUnattendContent?: AdditionalUnattendContent[];
  /** [Preview Feature] Specifies settings related to VM Guest Patching on Windows. */
  patchSettings?: PatchSettings;
  /** Specifies the Windows Remote Management listeners. This enables remote Windows PowerShell. */
  winRM?: WinRMConfiguration;
}

export function windowsConfigurationSerializer(item: WindowsConfiguration): any {
  return {
    provisionVMAgent: item["provisionVMAgent"],
    enableAutomaticUpdates: item["enableAutomaticUpdates"],
    timeZone: item["timeZone"],
    additionalUnattendContent: !item["additionalUnattendContent"]
      ? item["additionalUnattendContent"]
      : additionalUnattendContentArraySerializer(item["additionalUnattendContent"]),
    patchSettings: !item["patchSettings"]
      ? item["patchSettings"]
      : patchSettingsSerializer(item["patchSettings"]),
    winRM: !item["winRM"] ? item["winRM"] : winRMConfigurationSerializer(item["winRM"]),
  };
}

export function additionalUnattendContentArraySerializer(
  result: Array<AdditionalUnattendContent>,
): any[] {
  return result.map((item) => {
    return additionalUnattendContentSerializer(item);
  });
}

/** Specifies additional XML formatted information that can be included in the Unattend.xml file, which is used by Windows Setup. Contents are defined by setting name, component name, and the pass in which the content is applied. */
export interface AdditionalUnattendContent {
  /** The pass name. Currently, the only allowable value is OobeSystem. */
  passName?: "OobeSystem";
  /** The component name. Currently, the only allowable value is Microsoft-Windows-Shell-Setup. */
  componentName?: "Microsoft-Windows-Shell-Setup";
  /** Specifies the name of the setting to which the content applies. Possible values are: FirstLogonCommands and AutoLogon. */
  settingName?: SettingNames;
  /** Specifies the XML formatted content that is added to the unattend.xml file for the specified path and component. The XML must be less than 4KB and must include the root element for the setting or feature that is being inserted. */
  content?: string;
}

export function additionalUnattendContentSerializer(item: AdditionalUnattendContent): any {
  return {
    passName: item["passName"],
    componentName: item["componentName"],
    settingName: item["settingName"],
    content: item["content"],
  };
}

/** Specifies the name of the setting to which the content applies. Possible values are: FirstLogonCommands and AutoLogon. */
export enum KnownSettingNames {
  /** AutoLogon mode */
  AutoLogon = "AutoLogon",
  /** FirstLogonCommands mode */
  FirstLogonCommands = "FirstLogonCommands",
}

/**
 * Specifies the name of the setting to which the content applies. Possible values are: FirstLogonCommands and AutoLogon. \
 * {@link KnownSettingNames} can be used interchangeably with SettingNames,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AutoLogon**: AutoLogon mode \
 * **FirstLogonCommands**: FirstLogonCommands mode
 */
export type SettingNames = string;

/** Specifies settings related to VM Guest Patching on Windows. */
export interface PatchSettings {
  /** Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of patches to a virtual machine. You do this by applying patches manually inside the VM. In this mode, automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates must be false<br /><br /> **AutomaticByOS** - The virtual machine will automatically be updated by the OS. The property WindowsConfiguration.enableAutomaticUpdates must be true. <br /><br /> **AutomaticByPlatform** - the virtual machine will automatically updated by the platform. The properties provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true */
  patchMode?: WindowsVMGuestPatchMode;
  /** Enables customers to patch their Azure VMs without requiring a reboot. For enableHotpatching, the 'provisionVMAgent' must be set to true and 'patchMode' must be set to 'AutomaticByPlatform'. */
  enableHotpatching?: boolean;
  /** Specifies the mode of VM Guest patch assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine.<br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
  assessmentMode?: WindowsPatchAssessmentMode;
  /** Specifies additional settings for patch mode AutomaticByPlatform in VM Guest Patching on Windows. */
  automaticByPlatformSettings?: WindowsVMGuestPatchAutomaticByPlatformSettings;
}

export function patchSettingsSerializer(item: PatchSettings): any {
  return {
    patchMode: item["patchMode"],
    enableHotpatching: item["enableHotpatching"],
    assessmentMode: item["assessmentMode"],
    automaticByPlatformSettings: !item["automaticByPlatformSettings"]
      ? item["automaticByPlatformSettings"]
      : windowsVMGuestPatchAutomaticByPlatformSettingsSerializer(
          item["automaticByPlatformSettings"],
        ),
  };
}

/** Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of patches to a virtual machine. You do this by applying patches manually inside the VM. In this mode, automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates must be false<br /><br /> **AutomaticByOS** - The virtual machine will automatically be updated by the OS. The property WindowsConfiguration.enableAutomaticUpdates must be true. <br /><br /> **AutomaticByPlatform** - the virtual machine will automatically updated by the platform. The properties provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true */
export enum KnownWindowsVMGuestPatchMode {
  /** Manual VM guest patch mode */
  Manual = "Manual",
  /** AutomaticByOS VM guest patch mode */
  AutomaticByOS = "AutomaticByOS",
  /** AutomaticByPlatform VM guest patch mode */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **Manual** - You  control the application of patches to a virtual machine. You do this by applying patches manually inside the VM. In this mode, automatic updates are disabled; the property WindowsConfiguration.enableAutomaticUpdates must be false<br /><br /> **AutomaticByOS** - The virtual machine will automatically be updated by the OS. The property WindowsConfiguration.enableAutomaticUpdates must be true. <br /><br /> **AutomaticByPlatform** - the virtual machine will automatically updated by the platform. The properties provisionVMAgent and WindowsConfiguration.enableAutomaticUpdates must be true \
 * {@link KnownWindowsVMGuestPatchMode} can be used interchangeably with WindowsVMGuestPatchMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manual**: Manual VM guest patch mode \
 * **AutomaticByOS**: AutomaticByOS VM guest patch mode \
 * **AutomaticByPlatform**: AutomaticByPlatform VM guest patch mode
 */
export type WindowsVMGuestPatchMode = string;

/** Specifies the mode of VM Guest patch assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine.<br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
export enum KnownWindowsPatchAssessmentMode {
  /** ImageDefault patch assessment mode */
  ImageDefault = "ImageDefault",
  /** AutomaticByPlatform patch assessment mode */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest patch assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine.<br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. \
 * {@link KnownWindowsPatchAssessmentMode} can be used interchangeably with WindowsPatchAssessmentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault**: ImageDefault patch assessment mode \
 * **AutomaticByPlatform**: AutomaticByPlatform patch assessment mode
 */
export type WindowsPatchAssessmentMode = string;

/** Specifies additional settings to be applied when patch mode AutomaticByPlatform is selected in Windows patch settings. */
export interface WindowsVMGuestPatchAutomaticByPlatformSettings {
  /** Specifies the reboot setting for all AutomaticByPlatform patch installation operations. */
  rebootSetting?: WindowsVMGuestPatchAutomaticByPlatformRebootSetting;
  /** Enables customer to schedule patching without accidental upgrades */
  bypassPlatformSafetyChecksOnUserSchedule?: boolean;
}

export function windowsVMGuestPatchAutomaticByPlatformSettingsSerializer(
  item: WindowsVMGuestPatchAutomaticByPlatformSettings,
): any {
  return {
    rebootSetting: item["rebootSetting"],
    bypassPlatformSafetyChecksOnUserSchedule: item["bypassPlatformSafetyChecksOnUserSchedule"],
  };
}

/** Specifies the reboot setting for all AutomaticByPlatform patch installation operations. */
export enum KnownWindowsVMGuestPatchAutomaticByPlatformRebootSetting {
  /** Reboot setting for Unknown */
  Unknown = "Unknown",
  /** Reboot setting for IfRequired */
  IfRequired = "IfRequired",
  /** Reboot setting for Never */
  Never = "Never",
  /** Reboot setting for Always */
  Always = "Always",
}

/**
 * Specifies the reboot setting for all AutomaticByPlatform patch installation operations. \
 * {@link KnownWindowsVMGuestPatchAutomaticByPlatformRebootSetting} can be used interchangeably with WindowsVMGuestPatchAutomaticByPlatformRebootSetting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Reboot setting for Unknown \
 * **IfRequired**: Reboot setting for IfRequired \
 * **Never**: Reboot setting for Never \
 * **Always**: Reboot setting for Always
 */
export type WindowsVMGuestPatchAutomaticByPlatformRebootSetting = string;

/** Describes Windows Remote Management configuration of the VM */
export interface WinRMConfiguration {
  /** The list of Windows Remote Management listeners */
  listeners?: WinRMListener[];
}

export function winRMConfigurationSerializer(item: WinRMConfiguration): any {
  return {
    listeners: !item["listeners"]
      ? item["listeners"]
      : winRMListenerArraySerializer(item["listeners"]),
  };
}

export function winRMListenerArraySerializer(result: Array<WinRMListener>): any[] {
  return result.map((item) => {
    return winRMListenerSerializer(item);
  });
}

/** Describes Protocol and thumbprint of Windows Remote Management listener */
export interface WinRMListener {
  /** Specifies the protocol of WinRM listener. Possible values are: **http,** **https.** */
  protocol?: ProtocolTypes;
  /** This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  "data":"<Base64-encoded-certificate>",<br>  "dataType":"pfx",<br>  "password":"<pfx-file-password>"<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  certificateUrl?: string;
}

export function winRMListenerSerializer(item: WinRMListener): any {
  return { protocol: item["protocol"], certificateUrl: item["certificateUrl"] };
}

/** Specifies the protocol of WinRM listener. Possible values are: **http,** **https.** */
export enum KnownProtocolTypes {
  /** Http protocol */
  Http = "Http",
  /** Https protocol */
  Https = "Https",
}

/**
 * Specifies the protocol of WinRM listener. Possible values are: **http,** **https.** \
 * {@link KnownProtocolTypes} can be used interchangeably with ProtocolTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Http**: Http protocol \
 * **Https**: Https protocol
 */
export type ProtocolTypes = string;

/** Specifies the Linux operating system settings on the virtual machine. For a list of supported Linux distributions, see [Linux on Azure-Endorsed Distributions](https://docs.microsoft.com/azure/virtual-machines/linux/endorsed-distros). */
export interface LinuxConfiguration {
  /** Specifies whether password authentication should be disabled. */
  disablePasswordAuthentication?: boolean;
  /** Specifies the ssh key configuration for a Linux OS. */
  ssh?: SshConfiguration;
  /** Indicates whether virtual machine agent should be provisioned on the virtual machine. When this property is not specified in the request body, default behavior is to set it to true. This will ensure that VM Agent is installed on the VM so that extensions can be added to the VM later. */
  provisionVMAgent?: boolean;
  /** [Preview Feature] Specifies settings related to VM Guest Patching on Linux. */
  patchSettings?: LinuxPatchSettings;
  /** Indicates whether VMAgent Platform Updates is enabled for the Linux virtual machine. Default value is false. */
  enableVMAgentPlatformUpdates?: boolean;
}

export function linuxConfigurationSerializer(item: LinuxConfiguration): any {
  return {
    disablePasswordAuthentication: item["disablePasswordAuthentication"],
    ssh: !item["ssh"] ? item["ssh"] : sshConfigurationSerializer(item["ssh"]),
    provisionVMAgent: item["provisionVMAgent"],
    patchSettings: !item["patchSettings"]
      ? item["patchSettings"]
      : linuxPatchSettingsSerializer(item["patchSettings"]),
    enableVMAgentPlatformUpdates: item["enableVMAgentPlatformUpdates"],
  };
}

/** SSH configuration for Linux based VMs running on Azure */
export interface SshConfiguration {
  /** The list of SSH public keys used to authenticate with linux based VMs. */
  publicKeys?: SshPublicKey[];
}

export function sshConfigurationSerializer(item: SshConfiguration): any {
  return {
    publicKeys: !item["publicKeys"]
      ? item["publicKeys"]
      : sshPublicKeyArraySerializer(item["publicKeys"]),
  };
}

export function sshPublicKeyArraySerializer(result: Array<SshPublicKey>): any[] {
  return result.map((item) => {
    return sshPublicKeySerializer(item);
  });
}

/** Contains information about SSH certificate public key and the path on the Linux VM where the public key is placed. */
export interface SshPublicKey {
  /** Specifies the full path on the created VM where ssh public key is stored. If the file already exists, the specified key is appended to the file. Example: /home/user/.ssh/authorized_keys */
  path?: string;
  /** SSH public key certificate used to authenticate with the VM through ssh. The key needs to be at least 2048-bit and in ssh-rsa format. For creating ssh keys, see [Create SSH keys on Linux and Mac for Linux VMs in Azure]https://docs.microsoft.com/azure/virtual-machines/linux/create-ssh-keys-detailed). */
  keyData?: string;
}

export function sshPublicKeySerializer(item: SshPublicKey): any {
  return { path: item["path"], keyData: item["keyData"] };
}

/** Specifies settings related to VM Guest Patching on Linux. */
export interface LinuxPatchSettings {
  /** Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - The virtual machine's default patching configuration is used. <br /><br /> **AutomaticByPlatform** - The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true */
  patchMode?: LinuxVMGuestPatchMode;
  /** Specifies the mode of VM Guest Patch Assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine. <br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
  assessmentMode?: LinuxPatchAssessmentMode;
  /** Specifies additional settings for patch mode AutomaticByPlatform in VM Guest Patching on Linux. */
  automaticByPlatformSettings?: LinuxVMGuestPatchAutomaticByPlatformSettings;
}

export function linuxPatchSettingsSerializer(item: LinuxPatchSettings): any {
  return {
    patchMode: item["patchMode"],
    assessmentMode: item["assessmentMode"],
    automaticByPlatformSettings: !item["automaticByPlatformSettings"]
      ? item["automaticByPlatformSettings"]
      : linuxVMGuestPatchAutomaticByPlatformSettingsSerializer(item["automaticByPlatformSettings"]),
  };
}

/** Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - The virtual machine's default patching configuration is used. <br /><br /> **AutomaticByPlatform** - The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true */
export enum KnownLinuxVMGuestPatchMode {
  /** ImageDefault linux VM guest patch mode */
  ImageDefault = "ImageDefault",
  /** AutomaticByPlatform linux VM guest patch mode */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest Patching to IaaS virtual machine or virtual machines associated to virtual machine scale set with OrchestrationMode as Flexible.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - The virtual machine's default patching configuration is used. <br /><br /> **AutomaticByPlatform** - The virtual machine will be automatically updated by the platform. The property provisionVMAgent must be true \
 * {@link KnownLinuxVMGuestPatchMode} can be used interchangeably with LinuxVMGuestPatchMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault**: ImageDefault linux VM guest patch mode \
 * **AutomaticByPlatform**: AutomaticByPlatform linux VM guest patch mode
 */
export type LinuxVMGuestPatchMode = string;

/** Specifies the mode of VM Guest Patch Assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine. <br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. */
export enum KnownLinuxPatchAssessmentMode {
  /** ImageDefault mode */
  ImageDefault = "ImageDefault",
  /** AutomaticByPlatform mode */
  AutomaticByPlatform = "AutomaticByPlatform",
}

/**
 * Specifies the mode of VM Guest Patch Assessment for the IaaS virtual machine.<br /><br /> Possible values are:<br /><br /> **ImageDefault** - You control the timing of patch assessments on a virtual machine. <br /><br /> **AutomaticByPlatform** - The platform will trigger periodic patch assessments. The property provisionVMAgent must be true. \
 * {@link KnownLinuxPatchAssessmentMode} can be used interchangeably with LinuxPatchAssessmentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ImageDefault**: ImageDefault mode \
 * **AutomaticByPlatform**: AutomaticByPlatform mode
 */
export type LinuxPatchAssessmentMode = string;

/** Specifies additional settings to be applied when patch mode AutomaticByPlatform is selected in Linux patch settings. */
export interface LinuxVMGuestPatchAutomaticByPlatformSettings {
  /** Specifies the reboot setting for all AutomaticByPlatform patch installation operations. */
  rebootSetting?: LinuxVMGuestPatchAutomaticByPlatformRebootSetting;
  /** Enables customer to schedule patching without accidental upgrades */
  bypassPlatformSafetyChecksOnUserSchedule?: boolean;
}

export function linuxVMGuestPatchAutomaticByPlatformSettingsSerializer(
  item: LinuxVMGuestPatchAutomaticByPlatformSettings,
): any {
  return {
    rebootSetting: item["rebootSetting"],
    bypassPlatformSafetyChecksOnUserSchedule: item["bypassPlatformSafetyChecksOnUserSchedule"],
  };
}

/** Specifies the reboot setting for all AutomaticByPlatform patch installation operations. */
export enum KnownLinuxVMGuestPatchAutomaticByPlatformRebootSetting {
  /** Unknown reboot setting */
  Unknown = "Unknown",
  /** Reboot if required */
  IfRequired = "IfRequired",
  /** Never reboot */
  Never = "Never",
  /** Always reboot */
  Always = "Always",
}

/**
 * Specifies the reboot setting for all AutomaticByPlatform patch installation operations. \
 * {@link KnownLinuxVMGuestPatchAutomaticByPlatformRebootSetting} can be used interchangeably with LinuxVMGuestPatchAutomaticByPlatformRebootSetting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown reboot setting \
 * **IfRequired**: Reboot if required \
 * **Never**: Never reboot \
 * **Always**: Always reboot
 */
export type LinuxVMGuestPatchAutomaticByPlatformRebootSetting = string;

export function vaultSecretGroupArraySerializer(result: Array<VaultSecretGroup>): any[] {
  return result.map((item) => {
    return vaultSecretGroupSerializer(item);
  });
}

/** Describes a set of certificates which are all in the same Key Vault. */
export interface VaultSecretGroup {
  /** The relative URL of the Key Vault containing all of the certificates in VaultCertificates. */
  sourceVault?: SubResource;
  /** The list of key vault references in SourceVault which contain certificates. */
  vaultCertificates?: VaultCertificate[];
}

export function vaultSecretGroupSerializer(item: VaultSecretGroup): any {
  return {
    sourceVault: !item["sourceVault"]
      ? item["sourceVault"]
      : subResourceSerializer(item["sourceVault"]),
    vaultCertificates: !item["vaultCertificates"]
      ? item["vaultCertificates"]
      : vaultCertificateArraySerializer(item["vaultCertificates"]),
  };
}

export function vaultCertificateArraySerializer(result: Array<VaultCertificate>): any[] {
  return result.map((item) => {
    return vaultCertificateSerializer(item);
  });
}

/** Describes a single certificate reference in a Key Vault, and where the certificate should reside on the VM. */
export interface VaultCertificate {
  /** This is the URL of a certificate that has been uploaded to Key Vault as a secret. For adding a secret to the Key Vault, see [Add a key or secret to the key vault](https://docs.microsoft.com/azure/key-vault/key-vault-get-started/#add). In this case, your certificate needs to be It is the Base64 encoding of the following JSON Object which is encoded in UTF-8: <br><br> {<br>  'data':'<Base64-encoded-certificate>',<br>  'dataType':'pfx',<br>  'password':'<pfx-file-password>'<br>} <br> To install certificates on a virtual machine it is recommended to use the [Azure Key Vault virtual machine extension for Linux](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-linux) or the [Azure Key Vault virtual machine extension for Windows](https://docs.microsoft.com/azure/virtual-machines/extensions/key-vault-windows). */
  certificateUrl?: string;
  /** For Windows VMs, specifies the certificate store on the Virtual Machine to which the certificate should be added. The specified certificate store is implicitly in the LocalMachine account. For Linux VMs, the certificate file is placed under the /var/lib/waagent directory, with the file name <UppercaseThumbprint>.crt for the X509 certificate file and <UppercaseThumbprint>.prv for private key. Both of these files are .pem formatted. */
  certificateStore?: string;
}

export function vaultCertificateSerializer(item: VaultCertificate): any {
  return { certificateUrl: item["certificateUrl"], certificateStore: item["certificateStore"] };
}

/** Specifies the network interfaces or the networking configuration of the virtual machine. */
export interface NetworkProfile {
  /** Specifies the list of resource Ids for the network interfaces associated with the virtual machine. */
  networkInterfaces?: NetworkInterfaceReference[];
  /** specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations */
  networkApiVersion?: NetworkApiVersion;
  /** Specifies the networking configurations that will be used to create the virtual machine networking resources. */
  networkInterfaceConfigurations?: VirtualMachineNetworkInterfaceConfiguration[];
}

export function networkProfileSerializer(item: NetworkProfile): any {
  return {
    networkInterfaces: !item["networkInterfaces"]
      ? item["networkInterfaces"]
      : networkInterfaceReferenceArraySerializer(item["networkInterfaces"]),
    networkApiVersion: item["networkApiVersion"] ?? "2026-04-15-preview",
    networkInterfaceConfigurations: !item["networkInterfaceConfigurations"]
      ? item["networkInterfaceConfigurations"]
      : virtualMachineNetworkInterfaceConfigurationArraySerializer(
          item["networkInterfaceConfigurations"],
        ),
  };
}

export function networkInterfaceReferenceArraySerializer(
  result: Array<NetworkInterfaceReference>,
): any[] {
  return result.map((item) => {
    return networkInterfaceReferenceSerializer(item);
  });
}

/** Describes a network interface reference. */
export interface NetworkInterfaceReference extends SubResource {
  /** Describes a network interface reference properties. */
  properties?: NetworkInterfaceReferenceProperties;
}

export function networkInterfaceReferenceSerializer(item: NetworkInterfaceReference): any {
  return {
    id: item["id"],
    properties: !item["properties"]
      ? item["properties"]
      : networkInterfaceReferencePropertiesSerializer(item["properties"]),
  };
}

/** Describes a network interface reference properties. */
export interface NetworkInterfaceReferenceProperties {
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** Specify what happens to the network interface when the VM is deleted */
  deleteOption?: DeleteOptions;
}

export function networkInterfaceReferencePropertiesSerializer(
  item: NetworkInterfaceReferenceProperties,
): any {
  return { primary: item["primary"], deleteOption: item["deleteOption"] };
}

/** Specify what happens to the network interface when the VM is deleted */
export enum KnownDeleteOptions {
  /** Delete network interface when the VM is deleted */
  Delete = "Delete",
  /** Detach network interface when the VM is deleted */
  Detach = "Detach",
}

/**
 * Specify what happens to the network interface when the VM is deleted \
 * {@link KnownDeleteOptions} can be used interchangeably with DeleteOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete**: Delete network interface when the VM is deleted \
 * **Detach**: Detach network interface when the VM is deleted
 */
export type DeleteOptions = string;

/** Specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations */
export enum KnownNetworkApiVersion {
  /** 2020-11-01 version */
  NetworkApiVersion20201101 = "2020-11-01",
  /** 2022-11-01 version */
  NetworkApiVersion20221101 = "2022-11-01",
}

/**
 * Specifies the Microsoft.Network API version used when creating networking resources in the Network Interface Configurations \
 * {@link KnownNetworkApiVersion} can be used interchangeably with NetworkApiVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **2020-11-01**: 2020-11-01 version \
 * **2022-11-01**: 2022-11-01 version
 */
export type NetworkApiVersion = string;

export function virtualMachineNetworkInterfaceConfigurationArraySerializer(
  result: Array<VirtualMachineNetworkInterfaceConfiguration>,
): any[] {
  return result.map((item) => {
    return virtualMachineNetworkInterfaceConfigurationSerializer(item);
  });
}

/** Describes a virtual machine network interface configurations. */
export interface VirtualMachineNetworkInterfaceConfiguration {
  /** The network interface configuration name. */
  name: string;
  /** Describes a virtual machine network profile's IP configuration. */
  properties?: VirtualMachineNetworkInterfaceConfigurationProperties;
  /** Resource tags applied to the networkInterface address created by this NetworkInterfaceConfiguration */
  tags?: Record<string, string>;
}

export function virtualMachineNetworkInterfaceConfigurationSerializer(
  item: VirtualMachineNetworkInterfaceConfiguration,
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineNetworkInterfaceConfigurationPropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Describes a virtual machine network profile's IP configuration. */
export interface VirtualMachineNetworkInterfaceConfigurationProperties {
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** Specify what happens to the network interface when the VM is deleted */
  deleteOption?: DeleteOptions;
  /** Specifies whether the network interface is accelerated networking-enabled. */
  enableAcceleratedNetworking?: boolean;
  /** Specifies whether the network interface is disabled for tcp state tracking. */
  disableTcpStateTracking?: boolean;
  /** Specifies whether the network interface is FPGA networking-enabled. */
  enableFpga?: boolean;
  /** Whether IP forwarding enabled on this NIC. */
  enableIPForwarding?: boolean;
  /** The network security group. */
  networkSecurityGroup?: SubResource;
  /** The dns settings to be applied on the network interfaces. */
  dnsSettings?: VirtualMachineNetworkInterfaceDnsSettingsConfiguration;
  /** Specifies the IP configurations of the network interface. */
  ipConfigurations: VirtualMachineNetworkInterfaceIPConfiguration[];
  /** The DSCP configuration for the network interface. */
  dscpConfiguration?: SubResource;
  /** Specifies whether the Auxiliary mode is enabled for the Network Interface resource. */
  auxiliaryMode?: NetworkInterfaceAuxiliaryMode;
  /** Specifies whether the Auxiliary sku is enabled for the Network Interface resource. */
  auxiliarySku?: NetworkInterfaceAuxiliarySku;
}

export function virtualMachineNetworkInterfaceConfigurationPropertiesSerializer(
  item: VirtualMachineNetworkInterfaceConfigurationProperties,
): any {
  return {
    primary: item["primary"],
    deleteOption: item["deleteOption"],
    enableAcceleratedNetworking: item["enableAcceleratedNetworking"],
    disableTcpStateTracking: item["disableTcpStateTracking"],
    enableFpga: item["enableFpga"],
    enableIPForwarding: item["enableIPForwarding"],
    networkSecurityGroup: !item["networkSecurityGroup"]
      ? item["networkSecurityGroup"]
      : subResourceSerializer(item["networkSecurityGroup"]),
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : virtualMachineNetworkInterfaceDnsSettingsConfigurationSerializer(item["dnsSettings"]),
    ipConfigurations: virtualMachineNetworkInterfaceIPConfigurationArraySerializer(
      item["ipConfigurations"],
    ),
    dscpConfiguration: !item["dscpConfiguration"]
      ? item["dscpConfiguration"]
      : subResourceSerializer(item["dscpConfiguration"]),
    auxiliaryMode: item["auxiliaryMode"],
    auxiliarySku: item["auxiliarySku"],
  };
}

/** Describes a virtual machines network configuration's DNS settings. */
export interface VirtualMachineNetworkInterfaceDnsSettingsConfiguration {
  /** List of DNS servers IP addresses */
  dnsServers?: string[];
}

export function virtualMachineNetworkInterfaceDnsSettingsConfigurationSerializer(
  item: VirtualMachineNetworkInterfaceDnsSettingsConfiguration,
): any {
  return {
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
  };
}

export function virtualMachineNetworkInterfaceIPConfigurationArraySerializer(
  result: Array<VirtualMachineNetworkInterfaceIPConfiguration>,
): any[] {
  return result.map((item) => {
    return virtualMachineNetworkInterfaceIPConfigurationSerializer(item);
  });
}

/** Describes a virtual machine network profile's IP configuration. */
export interface VirtualMachineNetworkInterfaceIPConfiguration {
  /** The IP configuration name. */
  name: string;
  /** Describes a virtual machine network interface IP configuration properties. */
  properties?: VirtualMachineNetworkInterfaceIPConfigurationProperties;
}

export function virtualMachineNetworkInterfaceIPConfigurationSerializer(
  item: VirtualMachineNetworkInterfaceIPConfiguration,
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachineNetworkInterfaceIPConfigurationPropertiesSerializer(item["properties"]),
  };
}

/** Describes a virtual machine network interface IP configuration properties. */
export interface VirtualMachineNetworkInterfaceIPConfigurationProperties {
  /** Specifies the identifier of the subnet. */
  subnet?: SubResource;
  /** Specifies the primary network interface in case the virtual machine has more than 1 network interface. */
  primary?: boolean;
  /** The publicIPAddressConfiguration. */
  publicIPAddressConfiguration?: VirtualMachinePublicIPAddressConfiguration;
  /** Available from Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4.  Possible values are: 'IPv4' and 'IPv6'. */
  privateIPAddressVersion?: IPVersions;
  /** Specifies an array of references to application security group. */
  applicationSecurityGroups?: SubResource[];
  /** Specifies an array of references to backend address pools of application gateways. A virtual machine can reference backend address pools of multiple application gateways. Multiple virtual machines cannot use the same application gateway. */
  applicationGatewayBackendAddressPools?: SubResource[];
  /** Specifies an array of references to backend address pools of load balancers. A virtual machine can reference backend address pools of one public and one internal load balancer. [Multiple virtual machines cannot use the same basic sku load balancer]. */
  loadBalancerBackendAddressPools?: SubResource[];
}

export function virtualMachineNetworkInterfaceIPConfigurationPropertiesSerializer(
  item: VirtualMachineNetworkInterfaceIPConfigurationProperties,
): any {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subResourceSerializer(item["subnet"]),
    primary: item["primary"],
    publicIPAddressConfiguration: !item["publicIPAddressConfiguration"]
      ? item["publicIPAddressConfiguration"]
      : virtualMachinePublicIPAddressConfigurationSerializer(item["publicIPAddressConfiguration"]),
    privateIPAddressVersion: item["privateIPAddressVersion"],
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : subResourceArraySerializer(item["applicationSecurityGroups"]),
    applicationGatewayBackendAddressPools: !item["applicationGatewayBackendAddressPools"]
      ? item["applicationGatewayBackendAddressPools"]
      : subResourceArraySerializer(item["applicationGatewayBackendAddressPools"]),
    loadBalancerBackendAddressPools: !item["loadBalancerBackendAddressPools"]
      ? item["loadBalancerBackendAddressPools"]
      : subResourceArraySerializer(item["loadBalancerBackendAddressPools"]),
  };
}

/** Describes a virtual machines IP Configuration's PublicIPAddress configuration */
export interface VirtualMachinePublicIPAddressConfiguration {
  /** The publicIP address configuration name. */
  name: string;
  /** Describes a virtual machines IP Configuration's PublicIPAddress configuration */
  properties?: VirtualMachinePublicIPAddressConfigurationProperties;
  /** Describes the public IP Sku. It can only be set with OrchestrationMode as Flexible. */
  sku?: PublicIPAddressSku;
  /** Resource tags applied to the publicIP address created by this PublicIPAddressConfiguration */
  tags?: Record<string, string>;
}

export function virtualMachinePublicIPAddressConfigurationSerializer(
  item: VirtualMachinePublicIPAddressConfiguration,
): any {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : virtualMachinePublicIPAddressConfigurationPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : publicIPAddressSkuSerializer(item["sku"]),
    tags: item["tags"],
  };
}

/** Describes a virtual machines IP Configuration's PublicIPAddress configuration */
export interface VirtualMachinePublicIPAddressConfigurationProperties {
  /** The idle timeout of the public IP address. */
  idleTimeoutInMinutes?: number;
  /** Specify what happens to the public IP address when the VM is deleted */
  deleteOption?: DeleteOptions;
  /** The dns settings to be applied on the publicIP addresses . */
  dnsSettings?: VirtualMachinePublicIPAddressDnsSettingsConfiguration;
  /** The list of IP tags associated with the public IP address. */
  ipTags?: VirtualMachineIpTag[];
  /** The PublicIPPrefix from which to allocate publicIP addresses. */
  publicIPPrefix?: SubResource;
  /** Available from Api-Version 2019-07-01 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'. */
  publicIPAddressVersion?: IPVersions;
  /** Specify the public IP allocation type */
  publicIPAllocationMethod?: PublicIPAllocationMethod;
}

export function virtualMachinePublicIPAddressConfigurationPropertiesSerializer(
  item: VirtualMachinePublicIPAddressConfigurationProperties,
): any {
  return {
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    deleteOption: item["deleteOption"],
    dnsSettings: !item["dnsSettings"]
      ? item["dnsSettings"]
      : virtualMachinePublicIPAddressDnsSettingsConfigurationSerializer(item["dnsSettings"]),
    ipTags: !item["ipTags"] ? item["ipTags"] : virtualMachineIpTagArraySerializer(item["ipTags"]),
    publicIPPrefix: !item["publicIPPrefix"]
      ? item["publicIPPrefix"]
      : subResourceSerializer(item["publicIPPrefix"]),
    publicIPAddressVersion: item["publicIPAddressVersion"],
    publicIPAllocationMethod: item["publicIPAllocationMethod"],
  };
}

/** Describes a virtual machines network configuration's DNS settings. */
export interface VirtualMachinePublicIPAddressDnsSettingsConfiguration {
  /** The Domain name label prefix of the PublicIPAddress resources that will be created. The generated name label is the concatenation of the domain name label and vm network profile unique ID. */
  domainNameLabel: string;
  /** The Domain name label scope of the PublicIPAddress resources that will be created. The generated name label is the concatenation of the hashed domain name label with policy according to the domain name label scope and vm network profile unique ID. */
  domainNameLabelScope?: DomainNameLabelScopeTypes;
}

export function virtualMachinePublicIPAddressDnsSettingsConfigurationSerializer(
  item: VirtualMachinePublicIPAddressDnsSettingsConfiguration,
): any {
  return {
    domainNameLabel: item["domainNameLabel"],
    domainNameLabelScope: item["domainNameLabelScope"],
  };
}

/** The Domain name label scope.The concatenation of the hashed domain name label that generated according to the policy from domain name label scope and vm index will be the domain name labels of the PublicIPAddress resources that will be created */
export enum KnownDomainNameLabelScopeTypes {
  /** TenantReuse scope type */
  TenantReuse = "TenantReuse",
  /** SubscriptionReuse scope type */
  SubscriptionReuse = "SubscriptionReuse",
  /** ResourceGroupReuse scope type */
  ResourceGroupReuse = "ResourceGroupReuse",
  /** NoReuse scope type */
  NoReuse = "NoReuse",
}

/**
 * The Domain name label scope.The concatenation of the hashed domain name label that generated according to the policy from domain name label scope and vm index will be the domain name labels of the PublicIPAddress resources that will be created \
 * {@link KnownDomainNameLabelScopeTypes} can be used interchangeably with DomainNameLabelScopeTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TenantReuse**: TenantReuse scope type \
 * **SubscriptionReuse**: SubscriptionReuse scope type \
 * **ResourceGroupReuse**: ResourceGroupReuse scope type \
 * **NoReuse**: NoReuse scope type
 */
export type DomainNameLabelScopeTypes = string;

export function virtualMachineIpTagArraySerializer(result: Array<VirtualMachineIpTag>): any[] {
  return result.map((item) => {
    return virtualMachineIpTagSerializer(item);
  });
}

/** Contains the IP tag associated with the public IP address. */
export interface VirtualMachineIpTag {
  /** IP tag type. Example: FirstPartyUsage. */
  ipTagType?: string;
  /** IP tag associated with the public IP. Example: SQL, Storage etc. */
  tag?: string;
}

export function virtualMachineIpTagSerializer(item: VirtualMachineIpTag): any {
  return { ipTagType: item["ipTagType"], tag: item["tag"] };
}

/** Available from compute Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'. */
export enum KnownIPVersions {
  /** IPv4 version */
  IPv4 = "IPv4",
  /** IPv6 version */
  IPv6 = "IPv6",
}

/**
 * Available from compute Api-Version 2017-03-30 onwards, it represents whether the specific ipconfiguration is IPv4 or IPv6. Default is taken as IPv4. Possible values are: 'IPv4' and 'IPv6'. \
 * {@link KnownIPVersions} can be used interchangeably with IPVersions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**: IPv4 version \
 * **IPv6**: IPv6 version
 */
export type IPVersions = string;

/** Specify the public IP allocation type */
export enum KnownPublicIPAllocationMethod {
  /** Dynamic IP allocation */
  Dynamic = "Dynamic",
  /** Static IP allocation */
  Static = "Static",
}

/**
 * Specify the public IP allocation type \
 * {@link KnownPublicIPAllocationMethod} can be used interchangeably with PublicIPAllocationMethod,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Dynamic**: Dynamic IP allocation \
 * **Static**: Static IP allocation
 */
export type PublicIPAllocationMethod = string;

/** Describes the public IP Sku. It can only be set with OrchestrationMode as Flexible. */
export interface PublicIPAddressSku {
  /** Specify public IP sku name */
  name?: PublicIPAddressSkuName;
  /** Specify public IP sku tier */
  tier?: PublicIPAddressSkuTier;
}

export function publicIPAddressSkuSerializer(item: PublicIPAddressSku): any {
  return { name: item["name"], tier: item["tier"] };
}

/** Specify public IP sku name */
export enum KnownPublicIPAddressSkuName {
  /** Basic IP sku name */
  Basic = "Basic",
  /** Standard IP sku name */
  Standard = "Standard",
}

/**
 * Specify public IP sku name \
 * {@link KnownPublicIPAddressSkuName} can be used interchangeably with PublicIPAddressSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Basic IP sku name \
 * **Standard**: Standard IP sku name
 */
export type PublicIPAddressSkuName = string;

/** Specify public IP sku tier */
export enum KnownPublicIPAddressSkuTier {
  /** Regional IP address sku tier */
  Regional = "Regional",
  /** Global IP address sku tier */
  Global = "Global",
}

/**
 * Specify public IP sku tier \
 * {@link KnownPublicIPAddressSkuTier} can be used interchangeably with PublicIPAddressSkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regional**: Regional IP address sku tier \
 * **Global**: Global IP address sku tier
 */
export type PublicIPAddressSkuTier = string;

export function subResourceArraySerializer(result: Array<SubResource>): any[] {
  return result.map((item) => {
    return subResourceSerializer(item);
  });
}

/** Specifies whether the Auxiliary mode is enabled for the Network Interface resource. */
export enum KnownNetworkInterfaceAuxiliaryMode {
  /** None mode */
  None = "None",
  /** AcceleratedConnections mode */
  AcceleratedConnections = "AcceleratedConnections",
  /** Floating mode */
  Floating = "Floating",
}

/**
 * Specifies whether the Auxiliary mode is enabled for the Network Interface resource. \
 * {@link KnownNetworkInterfaceAuxiliaryMode} can be used interchangeably with NetworkInterfaceAuxiliaryMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None mode \
 * **AcceleratedConnections**: AcceleratedConnections mode \
 * **Floating**: Floating mode
 */
export type NetworkInterfaceAuxiliaryMode = string;

/** Specifies whether the Auxiliary sku is enabled for the Network Interface resource. */
export enum KnownNetworkInterfaceAuxiliarySku {
  /** None: None sku */
  None = "None",
  /** A1 sku */
  A1 = "A1",
  /** A2 sku */
  A2 = "A2",
  /** A4 sku */
  A4 = "A4",
  /** A8 sku */
  A8 = "A8",
}

/**
 * Specifies whether the Auxiliary sku is enabled for the Network Interface resource. \
 * {@link KnownNetworkInterfaceAuxiliarySku} can be used interchangeably with NetworkInterfaceAuxiliarySku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None: None sku \
 * **A1**: A1 sku \
 * **A2**: A2 sku \
 * **A4**: A4 sku \
 * **A8**: A8 sku
 */
export type NetworkInterfaceAuxiliarySku = string;

/** Specifies the hardware profile for the virtual machine. */
export interface HardwareProfile {
  /** Specifies the size of the virtual machine. The enum data type is currently deprecated and will be removed by December 23rd 2023. The recommended way to get the list of available sizes is using these APIs: [List all available virtual machine sizes in an availability set](https://docs.microsoft.com/rest/api/compute/availabilitysets/listavailablesizes), [List all available virtual machine sizes in a region]( https://docs.microsoft.com/rest/api/compute/resourceskus/list), [List all available virtual machine sizes for resizing](https://docs.microsoft.com/rest/api/compute/virtualmachines/listavailablesizes). For more information about virtual machine sizes, see [Sizes for virtual machines](https://docs.microsoft.com/azure/virtual-machines/sizes). The available VM sizes depend on region and availability set. */
  vmSize?: string;
  /** Specifies the properties for customizing the size of the virtual machine. Minimum api-version: 2021-07-01. This feature is still in preview mode and is not supported for VirtualMachineScaleSet. Please follow the instructions in [VM Customization](https://aka.ms/vmcustomization) for more details. */
  vmSizeProperties?: VmSizeProperties;
}

export function hardwareProfileSerializer(item: HardwareProfile): any {
  return {
    vmSize: item["vmSize"],
    vmSizeProperties: !item["vmSizeProperties"]
      ? item["vmSizeProperties"]
      : vmSizePropertiesSerializer(item["vmSizeProperties"]),
  };
}

/** Specifies VM Size Property settings on the virtual machine. */
export interface VmSizeProperties {
  /** Specifies the number of vCPUs available for the VM. When this property is not specified in the request body the default behavior is to set it to the value of vCPUs available for that VM size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list). */
  vCpusAvailable?: number;
  /** Specifies the vCPU to physical core ratio. When this property is not specified in the request body the default behavior is set to the value of vCPUsPerCore for the VM Size exposed in api response of [List all available virtual machine sizes in a region](https://docs.microsoft.com/en-us/rest/api/compute/resource-skus/list). **Setting this property to 1 also means that hyper-threading is disabled.** */
  vCpusPerCore?: number;
}

export function vmSizePropertiesSerializer(item: VmSizeProperties): any {
  return { vCpusAvailable: item["vCpusAvailable"], vCpusPerCore: item["vCpusPerCore"] };
}

/** Specifies the Security profile settings for the virtual machine or virtual machine scale set. */
export interface SecurityProfile {
  /** Specifies the security settings like secure boot and vTPM used while creating the virtual machine. Minimum compute api-version: 2020-12-01. */
  uefiSettings?: UefiSettings;
  /** This property can be used by user in the request to enable or disable the Host Encryption for the virtual machine or virtual machine scale set. This will enable the encryption for all the disks including Resource/Temp disk at host itself. The default behavior is: The Encryption at host will be disabled unless this property is set to true for the resource. */
  encryptionAtHost?: boolean;
  /** Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. The default behavior is: UefiSettings will not be enabled unless this property is set. */
  securityType?: SecurityTypes;
  /** Specifies the Managed Identity used by ADE to get access token for keyvault operations. */
  encryptionIdentity?: EncryptionIdentity;
  /** Specifies ProxyAgent settings while creating the virtual machine. Minimum compute api-version: 2023-09-01. */
  proxyAgentSettings?: ProxyAgentSettings;
}

export function securityProfileSerializer(item: SecurityProfile): any {
  return {
    uefiSettings: !item["uefiSettings"]
      ? item["uefiSettings"]
      : uefiSettingsSerializer(item["uefiSettings"]),
    encryptionAtHost: item["encryptionAtHost"],
    securityType: item["securityType"],
    encryptionIdentity: !item["encryptionIdentity"]
      ? item["encryptionIdentity"]
      : encryptionIdentitySerializer(item["encryptionIdentity"]),
    proxyAgentSettings: !item["proxyAgentSettings"]
      ? item["proxyAgentSettings"]
      : proxyAgentSettingsSerializer(item["proxyAgentSettings"]),
  };
}

/** Specifies the security settings like secure boot and vTPM used while creating the virtual machine. Minimum api-version: 2020-12-01. */
export interface UefiSettings {
  /** Specifies whether secure boot should be enabled on the virtual machine. Minimum compute api-version: 2020-12-01. */
  secureBootEnabled?: boolean;
  /** Specifies whether vTPM should be enabled on the virtual machine. Minimum compute api-version: 2020-12-01. */
  vTpmEnabled?: boolean;
}

export function uefiSettingsSerializer(item: UefiSettings): any {
  return { secureBootEnabled: item["secureBootEnabled"], vTpmEnabled: item["vTpmEnabled"] };
}

/** Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. The default behavior is: UefiSettings will not be enabled unless this property is set. */
export enum KnownSecurityTypes {
  /** TrustedLaunch security type */
  TrustedLaunch = "TrustedLaunch",
  /** ConfidentialVM security type */
  ConfidentialVM = "ConfidentialVM",
}

/**
 * Specifies the SecurityType of the virtual machine. It has to be set to any specified value to enable UefiSettings. The default behavior is: UefiSettings will not be enabled unless this property is set. \
 * {@link KnownSecurityTypes} can be used interchangeably with SecurityTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TrustedLaunch**: TrustedLaunch security type \
 * **ConfidentialVM**: ConfidentialVM security type
 */
export type SecurityTypes = string;

/** Specifies the Managed Identity used by ADE to get access token for keyvault operations. */
export interface EncryptionIdentity {
  /** Specifies ARM Resource ID of one of the user identities associated with the VM. */
  userAssignedIdentityResourceId?: string;
}

export function encryptionIdentitySerializer(item: EncryptionIdentity): any {
  return { userAssignedIdentityResourceId: item["userAssignedIdentityResourceId"] };
}

/** Specifies ProxyAgent settings for the virtual machine or virtual machine scale set. Minimum api-version: 2023-09-01. */
export interface ProxyAgentSettings {
  /** Specifies whether ProxyAgent feature should be enabled on the virtual machine or virtual machine scale set. */
  enabled?: boolean;
  /** Specifies the mode that ProxyAgent will execute on. Warning: this property has been deprecated, please specify 'mode' under particular hostendpoint setting. */
  mode?: Mode;
  /** Increase the value of this property allows users to reset the key used for securing communication channel between guest and host. */
  keyIncarnationId?: number;
  /** Specifies the Wire Server endpoint settings while creating the virtual machine or virtual machine scale set. Minimum api-version: 2024-03-01. */
  wireServer?: HostEndpointSettings;
  /** Specifies the IMDS endpoint settings while creating the virtual machine or virtual machine scale set. Minimum api-version: 2024-03-01. */
  imds?: HostEndpointSettings;
  /** Specify whether to implicitly install the ProxyAgent Extension. This option is currently applicable only for Linux Os. */
  addProxyAgentExtension?: boolean;
}

export function proxyAgentSettingsSerializer(item: ProxyAgentSettings): any {
  return {
    enabled: item["enabled"],
    mode: item["mode"],
    keyIncarnationId: item["keyIncarnationId"],
    wireServer: !item["wireServer"]
      ? item["wireServer"]
      : hostEndpointSettingsSerializer(item["wireServer"]),
    imds: !item["imds"] ? item["imds"] : hostEndpointSettingsSerializer(item["imds"]),
    addProxyAgentExtension: item["addProxyAgentExtension"],
  };
}

/** Specifies the mode that ProxyAgent will execute on if the feature is enabled. ProxyAgent will start to audit or monitor but not enforce access control over requests to host endpoints in Audit mode, while in Enforce mode it will enforce access control. The default value is Enforce mode. */
export enum KnownMode {
  /** Audit mode */
  Audit = "Audit",
  /** Enforce mode */
  Enforce = "Enforce",
}

/**
 * Specifies the mode that ProxyAgent will execute on if the feature is enabled. ProxyAgent will start to audit or monitor but not enforce access control over requests to host endpoints in Audit mode, while in Enforce mode it will enforce access control. The default value is Enforce mode. \
 * {@link KnownMode} can be used interchangeably with Mode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Audit**: Audit mode \
 * **Enforce**: Enforce mode
 */
export type Mode = string;

/** Specifies particular host endpoint settings. */
export interface HostEndpointSettings {
  /** Specifies the execution mode. In Audit mode, the system acts as if it is enforcing the access control policy, including emitting access denial entries in the logs but it does not actually deny any requests to host endpoints. In Enforce mode, the system will enforce the access control and it is the recommended mode of operation. */
  mode?: Modes;
  /** Specifies the InVMAccessControlProfileVersion resource id in the format of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/inVMAccessControlProfiles/{profile}/versions/{version} */
  inVMAccessControlProfileReferenceId?: string;
}

export function hostEndpointSettingsSerializer(item: HostEndpointSettings): any {
  return {
    mode: item["mode"],
    inVMAccessControlProfileReferenceId: item["inVMAccessControlProfileReferenceId"],
  };
}

/** Specifies the execution mode. In Audit mode, the system acts as if it is enforcing the access control policy, including emitting access denial entries in the logs but it does not actually deny any requests to host endpoints. In Enforce mode, the system will enforce the access control and it is the recommended mode of operation. */
export enum KnownModes {
  /** Audit mode */
  Audit = "Audit",
  /** Enforce mode */
  Enforce = "Enforce",
  /** Disabled mode */
  Disabled = "Disabled",
}

/**
 * Specifies the execution mode. In Audit mode, the system acts as if it is enforcing the access control policy, including emitting access denial entries in the logs but it does not actually deny any requests to host endpoints. In Enforce mode, the system will enforce the access control and it is the recommended mode of operation. \
 * {@link KnownModes} can be used interchangeably with Modes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Audit**: Audit mode \
 * **Enforce**: Enforce mode \
 * **Disabled**: Disabled mode
 */
export type Modes = string;

/** Specifies the boot diagnostic settings state. Minimum compute api-version: 2015-06-15. */
export interface DiagnosticsProfile {
  /** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. **NOTE**: If storageUri is being specified then ensure that the storage account is in the same region and subscription as the VM. You can easily view the output of your console log. Azure also enables you to see a screenshot of the VM from the hypervisor. */
  bootDiagnostics?: BootDiagnostics;
}

export function diagnosticsProfileSerializer(item: DiagnosticsProfile): any {
  return {
    bootDiagnostics: !item["bootDiagnostics"]
      ? item["bootDiagnostics"]
      : bootDiagnosticsSerializer(item["bootDiagnostics"]),
  };
}

/** Boot Diagnostics is a debugging feature which allows you to view Console Output and Screenshot to diagnose VM status. You can easily view the output of your console log. Azure also enables you to see a screenshot of the VM from the hypervisor. */
export interface BootDiagnostics {
  /** Whether boot diagnostics should be enabled on the Virtual Machine. */
  enabled?: boolean;
  /** Uri of the storage account to use for placing the console output and screenshot. If storageUri is not specified while enabling boot diagnostics, managed storage will be used. */
  storageUri?: string;
}

export function bootDiagnosticsSerializer(item: BootDiagnostics): any {
  return { enabled: item["enabled"], storageUri: item["storageUri"] };
}

/** Profile for the scheduled events. */
export interface ScheduledEventsProfile {
  /** Specifies Terminate Scheduled Event related configurations. */
  terminateNotificationProfile?: TerminateNotificationProfile;
  /** Specifies OS Image Scheduled Event related configurations. */
  osImageNotificationProfile?: OSImageNotificationProfile;
}

export function scheduledEventsProfileSerializer(item: ScheduledEventsProfile): any {
  return {
    terminateNotificationProfile: !item["terminateNotificationProfile"]
      ? item["terminateNotificationProfile"]
      : terminateNotificationProfileSerializer(item["terminateNotificationProfile"]),
    osImageNotificationProfile: !item["osImageNotificationProfile"]
      ? item["osImageNotificationProfile"]
      : osImageNotificationProfileSerializer(item["osImageNotificationProfile"]),
  };
}

/** Profile properties for the Terminate Scheduled event. */
export interface TerminateNotificationProfile {
  /** Configurable length of time a Virtual Machine being deleted will have to potentially approve the Terminate Scheduled Event before the event is auto approved (timed out). The configuration must be specified in ISO 8601 format, the default value is 5 minutes (PT5M) */
  notBeforeTimeout?: string;
  /** Specifies whether the Terminate Scheduled event is enabled or disabled. */
  enable?: boolean;
}

export function terminateNotificationProfileSerializer(item: TerminateNotificationProfile): any {
  return { notBeforeTimeout: item["notBeforeTimeout"], enable: item["enable"] };
}

/** Profile for the OS Image Scheduled event. */
export interface OSImageNotificationProfile {
  /** Length of time a Virtual Machine being reimaged or having its OS upgraded will have to potentially approve the OS Image Scheduled Event before the event is auto approved (timed out). The configuration is specified in ISO 8601 format, and the value must be 15 minutes (PT15M) */
  notBeforeTimeout?: string;
  /** Specifies whether the OS Image Scheduled event is enabled or disabled. */
  enable?: boolean;
}

export function osImageNotificationProfileSerializer(item: OSImageNotificationProfile): any {
  return { notBeforeTimeout: item["notBeforeTimeout"], enable: item["enable"] };
}

/** The parameters of a capacity reservation Profile. */
export interface CapacityReservationProfile {
  /** Specifies the capacity reservation group resource id that should be used for allocating the virtual machine provided enough capacity has been reserved. Please refer to https://aka.ms/CapacityReservation for more details. */
  capacityReservationGroup?: SubResource;
}

export function capacityReservationProfileSerializer(item: CapacityReservationProfile): any {
  return {
    capacityReservationGroup: !item["capacityReservationGroup"]
      ? item["capacityReservationGroup"]
      : subResourceSerializer(item["capacityReservationGroup"]),
  };
}

/** Contains the list of gallery applications that should be made available to the VM */
export interface ApplicationProfile {
  /** Specifies the gallery applications that should be made available to the VM */
  galleryApplications?: VMGalleryApplication[];
}

export function applicationProfileSerializer(item: ApplicationProfile): any {
  return {
    galleryApplications: !item["galleryApplications"]
      ? item["galleryApplications"]
      : vmGalleryApplicationArraySerializer(item["galleryApplications"]),
  };
}

export function vmGalleryApplicationArraySerializer(result: Array<VMGalleryApplication>): any[] {
  return result.map((item) => {
    return vmGalleryApplicationSerializer(item);
  });
}

/** Specifies the required information to reference a compute gallery application version */
export interface VMGalleryApplication {
  /** Optional, Specifies a passthrough value for more generic context. */
  tags?: string;
  /** Optional, Specifies the order in which the packages have to be installed */
  order?: number;
  /** Specifies the GalleryApplicationVersion resource id on the form of /subscriptions/{SubscriptionId}/resourceGroups/{ResourceGroupName}/providers/Microsoft.Compute/galleries/{galleryName}/applications/{application}/versions/{version} */
  packageReferenceId: string;
  /** Optional, Specifies the uri to an azure blob that will replace the default configuration for the package if provided */
  configurationReference?: string;
  /** Optional, If true, any failure for any operation in the VmApplication will fail the deployment */
  treatFailureAsDeploymentFailure?: boolean;
  /** If set to true, when a new Gallery Application version is available in PIR/SIG, it will be automatically updated for the VM/VMSS */
  enableAutomaticUpgrade?: boolean;
}

export function vmGalleryApplicationSerializer(item: VMGalleryApplication): any {
  return {
    tags: item["tags"],
    order: item["order"],
    packageReferenceId: item["packageReferenceId"],
    configurationReference: item["configurationReference"],
    treatFailureAsDeploymentFailure: item["treatFailureAsDeploymentFailure"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
  };
}

export function bulkActionVMExtensionArraySerializer(result: Array<BulkActionVMExtension>): any[] {
  return result.map((item) => {
    return bulkActionVMExtensionSerializer(item);
  });
}

/** Defines a virtual machine extension. */
export interface BulkActionVMExtension {
  /** The name of the virtual machine extension. */
  name: string;
  /** Properties of the virtual machine extension. */
  properties: BulkActionVmExtensionProperties;
}

export function bulkActionVMExtensionSerializer(item: BulkActionVMExtension): any {
  return {
    name: item["name"],
    properties: bulkActionVmExtensionPropertiesSerializer(item["properties"]),
  };
}

/** Describes the properties of a Virtual Machine Extension. */
export interface BulkActionVmExtensionProperties {
  /** How the extension handler should be forced to update even if the extension configuration has not changed. */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is 'CustomScriptExtension'. */
  type?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version of the extension available. */
  enableAutomaticUpgrade?: boolean;
  /** JSON formatted public settings for the extension. */
  settings?: Record<string, any>;
  /** The extension can contain either protectedSettings or protectedSettingsFromKeyVault or no protected settings at all. */
  protectedSettings?: Record<string, any>;
  /** Indicates whether failures stemming from the extension will be suppressed (Operational failures such as not connecting to the VM will not be suppressed regardless of this value). The default is false. */
  suppressFailures?: boolean;
  /** The extensions protected settings that are passed by reference, and consumed from key vault */
  protectedSettingsFromKeyVault?: KeyVaultSecretReference;
  /** Collection of extension names after which this extension needs to be provisioned. */
  provisionAfterExtensions?: string[];
}

export function bulkActionVmExtensionPropertiesSerializer(
  item: BulkActionVmExtensionProperties,
): any {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    suppressFailures: item["suppressFailures"],
    protectedSettingsFromKeyVault: !item["protectedSettingsFromKeyVault"]
      ? item["protectedSettingsFromKeyVault"]
      : keyVaultSecretReferenceSerializer(item["protectedSettingsFromKeyVault"]),
    provisionAfterExtensions: !item["provisionAfterExtensions"]
      ? item["provisionAfterExtensions"]
      : item["provisionAfterExtensions"].map((p: any) => {
          return p;
        }),
  };
}

export function bulkVMConfigurationArraySerializer(result: Array<BulkVMConfiguration>): any[] {
  return result.map((item) => {
    return bulkVMConfigurationSerializer(item);
  });
}

/** The flex properties for flexible VM creation */
export interface FlexProperties {
  /** The list of VM size profiles to use for flex creation */
  vmSizeProfiles: VmSizeProfile[];
  /** The operating system type for the VMs */
  osType: OsType;
  /** The priority profile for VM allocation */
  priorityProfile: PriorityProfile;
  /** The zone allocation policy for distributing VMs across availability zones */
  zoneAllocationPolicy?: ZoneAllocationPolicy;
}

export function flexPropertiesSerializer(item: FlexProperties): any {
  return {
    vmSizeProfiles: vmSizeProfileArraySerializer(item["vmSizeProfiles"]),
    osType: item["osType"],
    priorityProfile: priorityProfileSerializer(item["priorityProfile"]),
    zoneAllocationPolicy: !item["zoneAllocationPolicy"]
      ? item["zoneAllocationPolicy"]
      : zoneAllocationPolicySerializer(item["zoneAllocationPolicy"]),
  };
}

export function vmSizeProfileArraySerializer(result: Array<VmSizeProfile>): any[] {
  return result.map((item) => {
    return vmSizeProfileSerializer(item);
  });
}

/** A VM size profile with a name and rank for flex VM creation */
export interface VmSizeProfile {
  /** The name of the VM size, eg Standard_D2ads_v5 */
  name: string;
  /** The rank of this VM size in the priority order */
  rank?: number;
}

export function vmSizeProfileSerializer(item: VmSizeProfile): any {
  return { name: item["name"], rank: item["rank"] };
}

/** The supported operating system types for flex VM creation */
export enum KnownOsType {
  /** Windows operating system */
  Windows = "Windows",
  /** Linux operating system */
  Linux = "Linux",
}

/**
 * The supported operating system types for flex VM creation \
 * {@link KnownOsType} can be used interchangeably with OsType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows**: Windows operating system \
 * **Linux**: Linux operating system
 */
export type OsType = string;

/** The priority profile for flex VM creation */
export interface PriorityProfile {
  /** The priority type for VM allocation */
  type?: PriorityType;
  /** The allocation strategy for VM size selection */
  allocationStrategy?: AllocationStrategy;
}

export function priorityProfileSerializer(item: PriorityProfile): any {
  return { type: item["type"], allocationStrategy: item["allocationStrategy"] };
}

/** The priority type for VM allocation */
export enum KnownPriorityType {
  /** Regular priority VMs */
  Regular = "Regular",
  /** Spot priority VMs */
  Spot = "Spot",
}

/**
 * The priority type for VM allocation \
 * {@link KnownPriorityType} can be used interchangeably with PriorityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regular**: Regular priority VMs \
 * **Spot**: Spot priority VMs
 */
export type PriorityType = string;

/** The allocation strategy for VM size selection */
export enum KnownAllocationStrategy {
  /** Platform prioritizes VM sizes with the lowest hourly cost */
  LowestPrice = "LowestPrice",
  /** Customer specifies a rank for each VM size, platform uses VM sizes in rank order */
  Prioritized = "Prioritized",
  /** Platform prioritizes VM sizes with the highest available capacity first */
  CapacityOptimized = "CapacityOptimized",
}

/**
 * The allocation strategy for VM size selection \
 * {@link KnownAllocationStrategy} can be used interchangeably with AllocationStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LowestPrice**: Platform prioritizes VM sizes with the lowest hourly cost \
 * **Prioritized**: Customer specifies a rank for each VM size, platform uses VM sizes in rank order \
 * **CapacityOptimized**: Platform prioritizes VM sizes with the highest available capacity first
 */
export type AllocationStrategy = string;

/** The zone allocation policy for distributing VMs across availability zones */
export interface ZoneAllocationPolicy {
  /** The distribution strategy for zone allocation */
  distributionStrategy: DistributionStrategy;
  /** The zone preferences for allocation priority */
  zonePreferences?: ZonePreference[];
}

export function zoneAllocationPolicySerializer(item: ZoneAllocationPolicy): any {
  return {
    distributionStrategy: item["distributionStrategy"],
    zonePreferences: !item["zonePreferences"]
      ? item["zonePreferences"]
      : zonePreferenceArraySerializer(item["zonePreferences"]),
  };
}

/** The distribution strategy for zone allocation */
export enum KnownDistributionStrategy {
  /** Platform attempts to place as many VMs as possible in a single zone, falls back to multiple zones if needed */
  BestEffortSingleZone = "BestEffortSingleZone",
  /** Platform uses customer-provided zone rankings to allocate VMs */
  Prioritized = "Prioritized",
  /** Platform attempts to evenly distribute VMs across all available zones with best effort */
  BestEffortBalanced = "BestEffortBalanced",
  /** Platform must evenly distribute VMs across zones, request is rejected if exact balance cannot be achieved */
  StrictBalanced = "StrictBalanced",
}

/**
 * The distribution strategy for zone allocation \
 * {@link KnownDistributionStrategy} can be used interchangeably with DistributionStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BestEffortSingleZone**: Platform attempts to place as many VMs as possible in a single zone, falls back to multiple zones if needed \
 * **Prioritized**: Platform uses customer-provided zone rankings to allocate VMs \
 * **BestEffortBalanced**: Platform attempts to evenly distribute VMs across all available zones with best effort \
 * **StrictBalanced**: Platform must evenly distribute VMs across zones, request is rejected if exact balance cannot be achieved
 */
export type DistributionStrategy = string;

export function zonePreferenceArraySerializer(result: Array<ZonePreference>): any[] {
  return result.map((item) => {
    return zonePreferenceSerializer(item);
  });
}

/** A zone preference with a zone identifier and rank */
export interface ZonePreference {
  /** The zone identifier */
  zone: string;
  /** The rank of this zone in the priority order */
  rank?: number;
}

export function zonePreferenceSerializer(item: ZonePreference): any {
  return { zone: item["zone"], rank: item["rank"] };
}

/** The response from a create flex request */
export interface CreateFlexResourceOperationResponse {
  /** The description of the operation response */
  description: string;
  /** The type of resources used in the create flex request eg virtual machines */
  type: string;
  /** The location of the create flex request eg westus */
  location: string;
  /** The results from the create flex request if no errors exist */
  results?: ResourceOperation[];
}

export function createFlexResourceOperationResponseDeserializer(
  item: any,
): CreateFlexResourceOperationResponse {
  return {
    description: item["description"],
    type: item["type"],
    location: item["location"],
    results: !item["results"]
      ? item["results"]
      : resourceOperationArrayDeserializer(item["results"]),
  };
}

/** The ExecuteCreateRequest request for create operations */
export interface ExecuteCreateRequest {
  /** resource creation payload */
  resourceConfigParameters: ResourceProvisionPayload;
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** CorrelationId item */
  correlationId?: string;
}

export function executeCreateRequestSerializer(item: ExecuteCreateRequest): any {
  return {
    resourceConfigParameters: resourceProvisionPayloadSerializer(item["resourceConfigParameters"]),
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    correlationid: item["correlationId"],
  };
}

/** Resource creation data model */
export interface ResourceProvisionPayload {
  /** Virtual machine profile object that contains VM properties that are common across all VMs in this batch  (if you want to create 100 VMs in this request, and they all have same vmSize, then include vmSize in baseProfile) */
  virtualMachineBaseProfile?: BulkVMConfiguration;
  /** Virtual machine profile array that contains VM properties that needs to be overridden for each VM in the batch (if you want to create 100 VMs, they all need a distinct computerName property, you pass computerNames for each VM in batch in this array), service will merge baseProfile with VM specific overrides and create a merged VMProfile. */
  virtualMachineOverrides?: BulkVMConfiguration[];
  /** Number of VMs to be created */
  resourceCount: number;
  /** if resourceOverrides doesn't contain "name", service will create name based of prefix and ResourceCount e.g. resourceprefix-0,resourceprefix-1.. */
  resourcePrefix?: string;
}

export function resourceProvisionPayloadSerializer(item: ResourceProvisionPayload): any {
  return {
    virtualMachineBaseProfile: !item["virtualMachineBaseProfile"]
      ? item["virtualMachineBaseProfile"]
      : bulkVMConfigurationSerializer(item["virtualMachineBaseProfile"]),
    virtualMachineOverrides: !item["virtualMachineOverrides"]
      ? item["virtualMachineOverrides"]
      : bulkVMConfigurationArraySerializer(item["virtualMachineOverrides"]),
    resourceCount: item["resourceCount"],
    resourcePrefix: item["resourcePrefix"],
  };
}

/** The response from a create request */
export interface CreateResourceOperationResponse {
  /** The description of the operation response */
  description: string;
  /** The type of resources used in the create request eg virtual machines */
  type: string;
  /** The location of the start request eg westus */
  location: string;
  /** The results from the start request if no errors exist */
  results?: ResourceOperation[];
}

export function createResourceOperationResponseDeserializer(
  item: any,
): CreateResourceOperationResponse {
  return {
    description: item["description"],
    type: item["type"],
    location: item["location"],
    results: !item["results"]
      ? item["results"]
      : resourceOperationArrayDeserializer(item["results"]),
  };
}

/** The ExecuteDeleteRequest for delete VM operation */
export interface ExecuteDeleteRequest {
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources: Resources;
  /** CorrelationId item */
  correlationId?: string;
  /** Forced delete resource item */
  forceDeletion?: boolean;
}

export function executeDeleteRequestSerializer(item: ExecuteDeleteRequest): any {
  return {
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    resources: resourcesSerializer(item["resources"]),
    correlationid: item["correlationId"],
    forceDeletion: item["forceDeletion"],
  };
}

/** The response from a delete request */
export interface DeleteResourceOperationResponse {
  /** The description of the operation response */
  description: string;
  /** The type of resources used in the delete request eg virtual machines */
  type: string;
  /** The location of the start request eg westus */
  location: string;
  /** The results from the start request if no errors exist */
  results?: ResourceOperation[];
}

export function deleteResourceOperationResponseDeserializer(
  item: any,
): DeleteResourceOperationResponse {
  return {
    description: item["description"],
    type: item["type"],
    location: item["location"],
    results: !item["results"]
      ? item["results"]
      : resourceOperationArrayDeserializer(item["results"]),
  };
}

/** This is the request to get operation status using operationids */
export interface GetOperationStatusRequest {
  /** The list of operation ids to get the status of */
  operationIds: string[];
  /** CorrelationId item */
  correlationId: string;
}

export function getOperationStatusRequestSerializer(item: GetOperationStatusRequest): any {
  return {
    operationIds: item["operationIds"].map((p: any) => {
      return p;
    }),
    correlationid: item["correlationId"],
  };
}

/** This is the response from a get operations status request */
export interface GetOperationStatusResponse {
  /** An array of resource operations based on their operation ids */
  results: ResourceOperation[];
}

export function getOperationStatusResponseDeserializer(item: any): GetOperationStatusResponse {
  return {
    results: resourceOperationArrayDeserializer(item["results"]),
  };
}

/** This is the request to cancel running operations in scheduled actions using the operation ids */
export interface CancelOperationsRequest {
  /** The list of operation ids to cancel operations on */
  operationIds: string[];
  /** CorrelationId item */
  correlationId: string;
}

export function cancelOperationsRequestSerializer(item: CancelOperationsRequest): any {
  return {
    operationIds: item["operationIds"].map((p: any) => {
      return p;
    }),
    correlationid: item["correlationId"],
  };
}

/** This is the response from a cancel operations request */
export interface CancelOperationsResponse {
  /** An array of resource operations that were successfully cancelled */
  results: ResourceOperation[];
}

export function cancelOperationsResponseDeserializer(item: any): CancelOperationsResponse {
  return {
    results: resourceOperationArrayDeserializer(item["results"]),
  };
}

/** This is the request to get errors per vm operations */
export interface GetOperationErrorsRequest {
  /** The list of operation ids to query errors of */
  operationIds: string[];
}

export function getOperationErrorsRequestSerializer(item: GetOperationErrorsRequest): any {
  return {
    operationIds: item["operationIds"].map((p: any) => {
      return p;
    }),
  };
}

/** This is the response from a get operations errors request */
export interface GetOperationErrorsResponse {
  /** An array of operationids and their corresponding errors if any */
  results: OperationErrorsResult[];
}

export function getOperationErrorsResponseDeserializer(item: any): GetOperationErrorsResponse {
  return {
    results: operationErrorsResultArrayDeserializer(item["results"]),
  };
}

export function operationErrorsResultArrayDeserializer(
  result: Array<OperationErrorsResult>,
): any[] {
  return result.map((item) => {
    return operationErrorsResultDeserializer(item);
  });
}

/** This is the first level of operation errors from the request when clients get errors per vm operation */
export interface OperationErrorsResult {
  /** The operationId identifying a vm operation */
  operationId?: string;
  /** The creation time of the error result */
  creationTime?: string;
  /** The activation time of a vm operation */
  activationTime?: string;
  /** The completion time of the operation if the operation was completed */
  completedAt?: string;
  /** A list of errors associated with the operationid */
  operationErrors?: OperationErrorDetails[];
  /** Request level error code */
  requestErrorCode?: string;
  /** Request level error details */
  requestErrorDetails?: string;
}

export function operationErrorsResultDeserializer(item: any): OperationErrorsResult {
  return {
    operationId: item["operationId"],
    creationTime: item["creationTime"],
    activationTime: item["activationTime"],
    completedAt: item["completedAt"],
    operationErrors: !item["operationErrors"]
      ? item["operationErrors"]
      : operationErrorDetailsArrayDeserializer(item["operationErrors"]),
    requestErrorCode: item["requestErrorCode"],
    requestErrorDetails: item["requestErrorDetails"],
  };
}

export function operationErrorDetailsArrayDeserializer(
  result: Array<OperationErrorDetails>,
): any[] {
  return result.map((item) => {
    return operationErrorDetailsDeserializer(item);
  });
}

/** This defines a list of operation errors associated with a unique operationId */
export interface OperationErrorDetails {
  /** The error code of the operation */
  errorCode: string;
  /** The error details of the operation */
  errorDetails: string;
  /** The timestamp of the error occurence */
  timestamp?: string;
  /** The timestamp of the error occurence */
  errorDetailsTimestamp?: string;
  /** The compute operationid of the Start/Deallocate/Hibernate request */
  azureOperationName?: string;
  /** The compute operationid of the Start/Deallocate/Hibernate request */
  crpOperationId?: string;
}

export function operationErrorDetailsDeserializer(item: any): OperationErrorDetails {
  return {
    errorCode: item["errorCode"],
    errorDetails: item["errorDetails"],
    timestamp: item["timestamp"],
    errorDetailsTimestamp: item["timeStamp"],
    azureOperationName: item["azureOperationName"],
    crpOperationId: item["crpOperationId"],
  };
}

/** The scheduled action resource */
export interface ScheduledAction extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: ScheduledActionProperties;
}

export function scheduledActionSerializer(item: ScheduledAction): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : scheduledActionPropertiesSerializer(item["properties"]),
  };
}

export function scheduledActionDeserializer(item: any): ScheduledAction {
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
      : scheduledActionPropertiesDeserializer(item["properties"]),
  };
}

/** Scheduled action properties */
export interface ScheduledActionProperties {
  /** The type of resource the scheduled action is targeting */
  resourceType: ResourceType;
  /** The action the scheduled action should perform in the resources */
  actionType: ScheduledActionType;
  /** The time which the scheduled action is supposed to start running */
  startTime: string;
  /** The time when the scheduled action is supposed to stop scheduling */
  endTime?: string;
  /** The schedule the scheduled action is supposed to follow */
  schedule: ScheduledActionsSchedule;
  /** The notification settings for the scheduled action */
  notificationSettings: NotificationProperties[];
  /** Tell if the scheduled action is disabled or not */
  disabled?: boolean;
  /** The status of the last provisioning operation performed on the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function scheduledActionPropertiesSerializer(item: ScheduledActionProperties): any {
  return {
    resourceType: item["resourceType"],
    actionType: item["actionType"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    schedule: scheduledActionsScheduleSerializer(item["schedule"]),
    notificationSettings: notificationPropertiesArraySerializer(item["notificationSettings"]),
    disabled: item["disabled"],
  };
}

export function scheduledActionPropertiesDeserializer(item: any): ScheduledActionProperties {
  return {
    resourceType: item["resourceType"],
    actionType: item["actionType"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    schedule: scheduledActionsScheduleDeserializer(item["schedule"]),
    notificationSettings: notificationPropertiesArrayDeserializer(item["notificationSettings"]),
    disabled: item["disabled"],
    provisioningState: item["provisioningState"],
  };
}

/** The type of resource being targeted */
export enum KnownResourceType {
  /** Resources defined are Virtual Machines */
  VirtualMachine = "VirtualMachine",
  /** Resources defined are Virtual Machines Scale Sets */
  VirtualMachineScaleSet = "VirtualMachineScaleSet",
}

/**
 * The type of resource being targeted \
 * {@link KnownResourceType} can be used interchangeably with ResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VirtualMachine**: Resources defined are Virtual Machines \
 * **VirtualMachineScaleSet**: Resources defined are Virtual Machines Scale Sets
 */
export type ResourceType = string;

/** Specify which action user wants to be performed on the resources */
export enum KnownScheduledActionType {
  /** Perform a start action on the specified resources */
  Start = "Start",
  /** Perform a deallocate action on the specified resources */
  Deallocate = "Deallocate",
  /** Perform hibernate and deallocate on the specified resources */
  Hibernate = "Hibernate",
}

/**
 * Specify which action user wants to be performed on the resources \
 * {@link KnownScheduledActionType} can be used interchangeably with ScheduledActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Start**: Perform a start action on the specified resources \
 * **Deallocate**: Perform a deallocate action on the specified resources \
 * **Hibernate**: Perform hibernate and deallocate on the specified resources
 */
export type ScheduledActionType = string;

/** Specify the schedule in which the scheduled action is supposed to follow */
export interface ScheduledActionsSchedule {
  /** The time the scheduled action is supposed to run on */
  scheduledTime: string;
  /** The timezone the scheduled time is specified on */
  timeZone: string;
  /** The week days the scheduled action is supposed to run on */
  requestedWeekDays: WeekDay[];
  /** The months the scheduled action is supposed to run on */
  requestedMonths: Month[];
  /** The days of the month the scheduled action is supposed to run on. If empty, it means it will run on every day of the month. */
  requestedDaysOfTheMonth: number[];
  /** The execution parameters the scheduled action is supposed to follow */
  executionParameters?: ExecutionParameters;
  /** The type of deadline the scheduled action is supposed to follow for the schedule. If no value is passed, it will default to InitiateAt. */
  deadlineType?: DeadlineType;
}

export function scheduledActionsScheduleSerializer(item: ScheduledActionsSchedule): any {
  return {
    scheduledTime: item["scheduledTime"],
    timeZone: item["timeZone"],
    requestedWeekDays: item["requestedWeekDays"].map((p: any) => {
      return p;
    }),
    requestedMonths: item["requestedMonths"].map((p: any) => {
      return p;
    }),
    requestedDaysOfTheMonth: item["requestedDaysOfTheMonth"].map((p: any) => {
      return p;
    }),
    executionParameters: !item["executionParameters"]
      ? item["executionParameters"]
      : executionParametersSerializer(item["executionParameters"]),
    deadlineType: item["deadlineType"],
  };
}

export function scheduledActionsScheduleDeserializer(item: any): ScheduledActionsSchedule {
  return {
    scheduledTime: item["scheduledTime"],
    timeZone: item["timeZone"],
    requestedWeekDays: item["requestedWeekDays"].map((p: any) => {
      return p;
    }),
    requestedMonths: item["requestedMonths"].map((p: any) => {
      return p;
    }),
    requestedDaysOfTheMonth: item["requestedDaysOfTheMonth"].map((p: any) => {
      return p;
    }),
    executionParameters: !item["executionParameters"]
      ? item["executionParameters"]
      : executionParametersDeserializer(item["executionParameters"]),
    deadlineType: item["deadlineType"],
  };
}

/** Representation of the possible selection of days in a week in a gregorian calendar */
export enum KnownWeekDay {
  /** Monday weekday. */
  Monday = "Monday",
  /** Tuesday weekday. */
  Tuesday = "Tuesday",
  /** Wednesday weekday. */
  Wednesday = "Wednesday",
  /** Thursday weekday. */
  Thursday = "Thursday",
  /** Friday weekday. */
  Friday = "Friday",
  /** Saturday weekday. */
  Saturday = "Saturday",
  /** Sunday weekday. */
  Sunday = "Sunday",
  /** All week days */
  All = "All",
}

/**
 * Representation of the possible selection of days in a week in a gregorian calendar \
 * {@link KnownWeekDay} can be used interchangeably with WeekDay,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Monday**: Monday weekday. \
 * **Tuesday**: Tuesday weekday. \
 * **Wednesday**: Wednesday weekday. \
 * **Thursday**: Thursday weekday. \
 * **Friday**: Friday weekday. \
 * **Saturday**: Saturday weekday. \
 * **Sunday**: Sunday weekday. \
 * **All**: All week days
 */
export type WeekDay = string;

/** Representation of the months available selection in a gregorian calendar */
export enum KnownMonth {
  /** The January month. */
  January = "January",
  /** The February month. */
  February = "February",
  /** The March month. */
  March = "March",
  /** The April month. */
  April = "April",
  /** The May month. */
  May = "May",
  /** The June month. */
  June = "June",
  /** The July month. */
  July = "July",
  /** The August month. */
  August = "August",
  /** The September month. */
  September = "September",
  /** The October month. */
  October = "October",
  /** The November month. */
  November = "November",
  /** The December month. */
  December = "December",
  /** All months */
  All = "All",
}

/**
 * Representation of the months available selection in a gregorian calendar \
 * {@link KnownMonth} can be used interchangeably with Month,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **January**: The January month. \
 * **February**: The February month. \
 * **March**: The March month. \
 * **April**: The April month. \
 * **May**: The May month. \
 * **June**: The June month. \
 * **July**: The July month. \
 * **August**: The August month. \
 * **September**: The September month. \
 * **October**: The October month. \
 * **November**: The November month. \
 * **December**: The December month. \
 * **All**: All months
 */
export type Month = string;

export function notificationPropertiesArraySerializer(
  result: Array<NotificationProperties>,
): any[] {
  return result.map((item) => {
    return notificationPropertiesSerializer(item);
  });
}

export function notificationPropertiesArrayDeserializer(
  result: Array<NotificationProperties>,
): any[] {
  return result.map((item) => {
    return notificationPropertiesDeserializer(item);
  });
}

/** The information about notifications to be send to about upcoming operations. */
export interface NotificationProperties {
  /** Where the notification should be sent. For email, it should follow email format. */
  destination: string;
  /** Type of notification to be sent. */
  type: NotificationType;
  /** The language the notification should be sent on. */
  language: Language;
  /** Tells if the notification is enabled or not. */
  disabled?: boolean;
}

export function notificationPropertiesSerializer(item: NotificationProperties): any {
  return {
    destination: item["destination"],
    type: item["type"],
    language: item["language"],
    disabled: item["disabled"],
  };
}

export function notificationPropertiesDeserializer(item: any): NotificationProperties {
  return {
    destination: item["destination"],
    type: item["type"],
    language: item["language"],
    disabled: item["disabled"],
  };
}

/** The type of notification supported */
export enum KnownNotificationType {
  /** Notify through e-mail */
  Email = "Email",
}

/**
 * The type of notification supported \
 * {@link KnownNotificationType} can be used interchangeably with NotificationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Email**: Notify through e-mail
 */
export type NotificationType = string;

/** The notification languages currently supported */
export enum KnownLanguage {
  /** American english language */
  EnUs = "en-us",
}

/**
 * The notification languages currently supported \
 * {@link KnownLanguage} can be used interchangeably with Language,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **en-us**: American english language
 */
export type Language = string;

/** Provisioning state */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** Resource is being deleted. */
  Deleting = "Deleting",
}

/**
 * Provisioning state \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Deleting**: Resource is being deleted.
 */
export type ProvisioningState = string;

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

/** The type used for update operations of the ScheduledAction. */
export interface ScheduledActionUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: ScheduledActionUpdateProperties;
}

export function scheduledActionUpdateSerializer(item: ScheduledActionUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : scheduledActionUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the ScheduledAction. */
export interface ScheduledActionUpdateProperties {
  /** The type of resource the scheduled action is targeting */
  resourceType?: ResourceType;
  /** The action the scheduled action should perform in the resources */
  actionType?: ScheduledActionType;
  /** The time which the scheduled action is supposed to start running */
  startTime?: string;
  /** The time when the scheduled action is supposed to stop scheduling */
  endTime?: string;
  /** The schedule the scheduled action is supposed to follow */
  schedule?: ScheduledActionsSchedule;
  /** The notification settings for the scheduled action */
  notificationSettings?: NotificationProperties[];
  /** Tell if the scheduled action is disabled or not */
  disabled?: boolean;
}

export function scheduledActionUpdatePropertiesSerializer(
  item: ScheduledActionUpdateProperties,
): any {
  return {
    resourceType: item["resourceType"],
    actionType: item["actionType"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    schedule: !item["schedule"]
      ? item["schedule"]
      : scheduledActionsScheduleSerializer(item["schedule"]),
    notificationSettings: !item["notificationSettings"]
      ? item["notificationSettings"]
      : notificationPropertiesArraySerializer(item["notificationSettings"]),
    disabled: item["disabled"],
  };
}

/** The response of a ScheduledAction list operation. */
export interface _ScheduledActionListResult {
  /** The ScheduledAction items on this page */
  value: ScheduledAction[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scheduledActionListResultDeserializer(item: any): _ScheduledActionListResult {
  return {
    value: scheduledActionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scheduledActionArraySerializer(result: Array<ScheduledAction>): any[] {
  return result.map((item) => {
    return scheduledActionSerializer(item);
  });
}

export function scheduledActionArrayDeserializer(result: Array<ScheduledAction>): any[] {
  return result.map((item) => {
    return scheduledActionDeserializer(item);
  });
}

/** Paged collection of ScheduledActionResource items */
export interface _ResourceListResponse {
  /** The ScheduledActionResource items on this page */
  value: ScheduledActionResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _resourceListResponseDeserializer(item: any): _ResourceListResponse {
  return {
    value: scheduledActionResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scheduledActionResourceArrayDeserializer(
  result: Array<ScheduledActionResource>,
): any[] {
  return result.map((item) => {
    return scheduledActionResourceDeserializer(item);
  });
}

/** Represents an scheduled action resource metadata. */
export interface ScheduledActionResource {
  /** The name of the resource */
  readonly name: string;
  /** The compute RP resource id of the resource in the scheduled actions scope. */
  readonly id: string;
  /** The type of resource */
  readonly type?: string;
  /**
   * The ARM Id of the resource.
   * "subscriptions/{subId}/resourceGroups/{rgName}/providers/Microsoft.Compute/virtualMachines/{vmName}"
   */
  resourceId: string;
  /** The desired notification settings for the specified resource. */
  notificationSettings?: NotificationProperties[];
}

export function scheduledActionResourceDeserializer(item: any): ScheduledActionResource {
  return {
    name: item["name"],
    id: item["id"],
    type: item["type"],
    resourceId: item["resourceId"],
    notificationSettings: !item["notificationSettings"]
      ? item["notificationSettings"]
      : notificationPropertiesArrayDeserializer(item["notificationSettings"]),
  };
}

/** Request model to attach a list of scheduled action resources. */
export interface ResourceAttachRequestInput {
  /** List of resources to be attached/patched */
  resources: ScheduledActionResourceInput[];
}

export function resourceAttachRequestInputSerializer(item: ResourceAttachRequestInput): any {
  return { resources: scheduledActionResourceInputArraySerializer(item["resources"]) };
}

export function scheduledActionResourceInputArraySerializer(
  result: Array<ScheduledActionResourceInput>,
): any[] {
  return result.map((item) => {
    return scheduledActionResourceInputSerializer(item);
  });
}

/** Represents a scheduled action resource input for write operations. */
export interface ScheduledActionResourceInput {
  /**
   * The ARM Id of the resource.
   * "subscriptions/{subId}/resourceGroups/{rgName}/providers/Microsoft.Compute/virtualMachines/{vmName}"
   */
  resourceId: string;
  /** The desired notification settings for the specified resource. */
  notificationSettings?: NotificationProperties[];
}

export function scheduledActionResourceInputSerializer(item: ScheduledActionResourceInput): any {
  return {
    resourceId: item["resourceId"],
    notificationSettings: !item["notificationSettings"]
      ? item["notificationSettings"]
      : notificationPropertiesArraySerializer(item["notificationSettings"]),
  };
}

/** The response from scheduled action resource requests, which contains the status of each resource */
export interface RecurringActionsResourceOperationResult {
  /** The total number of resources operated on */
  totalResources: number;
  /** The resource status of for each resource */
  resourcesStatuses: ResourceStatus[];
}

export function recurringActionsResourceOperationResultDeserializer(
  item: any,
): RecurringActionsResourceOperationResult {
  return {
    totalResources: item["totalResources"],
    resourcesStatuses: resourceStatusArrayDeserializer(item["resourcesStatuses"]),
  };
}

export function resourceStatusArrayDeserializer(result: Array<ResourceStatus>): any[] {
  return result.map((item) => {
    return resourceStatusDeserializer(item);
  });
}

/** The status of a resource after a resource level operation was performed */
export interface ResourceStatus {
  /** The arm identifier of the resource */
  resourceId: string;
  /** The state the resource is currently on */
  status: ResourceOperationStatus;
  /** Errors encountered while trying to perform */
  error?: ErrorModel;
}

export function resourceStatusDeserializer(item: any): ResourceStatus {
  return {
    resourceId: item["resourceId"],
    status: item["status"],
    error: !item["error"] ? item["error"] : item["error"],
  };
}

/** The state the resource is on after the resource operation is applied */
export enum KnownResourceOperationStatus {
  /** The resource operation was successful */
  Succeeded = "Succeeded",
  /** The resource operation has failed. */
  Failed = "Failed",
}

/**
 * The state the resource is on after the resource operation is applied \
 * {@link KnownResourceOperationStatus} can be used interchangeably with ResourceOperationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: The resource operation was successful \
 * **Failed**: The resource operation has failed.
 */
export type ResourceOperationStatus = string;

/** Request model to detach a list of scheduled action resources. */
export interface ResourceDetachRequest {
  /** List of resources to be detached */
  resources: string[];
}

export function resourceDetachRequestSerializer(item: ResourceDetachRequest): any {
  return {
    resources: item["resources"].map((p: any) => {
      return p;
    }),
  };
}

/** Request model perform a resource operation in a list of resources */
export interface ResourcePatchRequestInput {
  /** The list of resources we watch to patch */
  resources: ScheduledActionResourceInput[];
}

export function resourcePatchRequestInputSerializer(item: ResourcePatchRequestInput): any {
  return { resources: scheduledActionResourceInputArraySerializer(item["resources"]) };
}

/** The request to cancel an occurrence. */
export interface CancelOccurrenceRequest {
  /** The resources the cancellation should act on. If no resource is passed in the list, Scheduled Action will cancel the occurrence for all resources. */
  resourceIds: string[];
}

export function cancelOccurrenceRequestSerializer(item: CancelOccurrenceRequest): any {
  return {
    resourceIds: item["resourceIds"].map((p: any) => {
      return p;
    }),
  };
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface Occurrence extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: OccurrenceProperties;
}

export function occurrenceDeserializer(item: any): Occurrence {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : occurrencePropertiesDeserializer(item["properties"]),
  };
}

/** Properties for an occurrence */
export interface OccurrenceProperties {
  /** The time the occurrence is scheduled for. This value can be changed by calling the delay API */
  readonly scheduledTime: Date;
  /** The result for occurrences that achieved a terminal state */
  readonly resultSummary: OccurrenceResultSummary;
  /** The aggregated provisioning state of the occurrence */
  readonly provisioningState?: OccurrenceState;
}

export function occurrencePropertiesDeserializer(item: any): OccurrenceProperties {
  return {
    scheduledTime: new Date(item["scheduledTime"]),
    resultSummary: occurrenceResultSummaryDeserializer(item["resultSummary"]),
    provisioningState: item["provisioningState"],
  };
}

/** The summarized provisioning result of an occurrence */
export interface OccurrenceResultSummary {
  /** The total number of resources that the occurrence was supposed to act on. */
  total: number;
  /** The summarized status of the resources. */
  statuses: ResourceResultSummary[];
}

export function occurrenceResultSummaryDeserializer(item: any): OccurrenceResultSummary {
  return {
    total: item["total"],
    statuses: resourceResultSummaryArrayDeserializer(item["statuses"]),
  };
}

export function resourceResultSummaryArrayDeserializer(
  result: Array<ResourceResultSummary>,
): any[] {
  return result.map((item) => {
    return resourceResultSummaryDeserializer(item);
  });
}

/** The status of the resources */
export interface ResourceResultSummary {
  /** The error code for those resources. In case of success, code is populated with Success. */
  code: string;
  /** The number of resources that the code applies to. */
  count: number;
  /** The error details for the resources. Not populated on success cases. */
  errorDetails?: ErrorModel;
}

export function resourceResultSummaryDeserializer(item: any): ResourceResultSummary {
  return {
    code: item["code"],
    count: item["count"],
    errorDetails: !item["errorDetails"] ? item["errorDetails"] : item["errorDetails"],
  };
}

/** The state the occurrence is at a given time */
export enum KnownOccurrenceState {
  /** The occurrence was created */
  Created = "Created",
  /** The occurrence is being rescheduled */
  Rescheduling = "Rescheduling",
  /** The occurrence has been scheduled */
  Scheduled = "Scheduled",
  /** The occurrence has successfully ran */
  Succeeded = "Succeeded",
  /** The occurrence has failed during its scheduling */
  Failed = "Failed",
  /** The occurrence is going through cancellation */
  Cancelling = "Cancelling",
  /** The occurrence has been canceled */
  Canceled = "Canceled",
}

/**
 * The state the occurrence is at a given time \
 * {@link KnownOccurrenceState} can be used interchangeably with OccurrenceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Created**: The occurrence was created \
 * **Rescheduling**: The occurrence is being rescheduled \
 * **Scheduled**: The occurrence has been scheduled \
 * **Succeeded**: The occurrence has successfully ran \
 * **Failed**: The occurrence has failed during its scheduling \
 * **Cancelling**: The occurrence is going through cancellation \
 * **Canceled**: The occurrence has been canceled
 */
export type OccurrenceState = string;

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

/** The response of a ScheduledActionResources list operation. */
export interface _ScheduledActionResourcesListResult {
  /** The ScheduledActionResources items on this page */
  value: ScheduledActionResources[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _scheduledActionResourcesListResultDeserializer(
  item: any,
): _ScheduledActionResourcesListResult {
  return {
    value: scheduledActionResourcesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function scheduledActionResourcesArrayDeserializer(
  result: Array<ScheduledActionResources>,
): any[] {
  return result.map((item) => {
    return scheduledActionResourcesDeserializer(item);
  });
}

/** The scheduled action extension */
export interface ScheduledActionResources extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: ScheduledActionsExtensionProperties;
}

export function scheduledActionResourcesDeserializer(item: any): ScheduledActionResources {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : scheduledActionsExtensionPropertiesDeserializer(item["properties"]),
  };
}

/** Scheduled action extension properties */
export interface ScheduledActionsExtensionProperties {
  /** The type of resource the scheduled action is targeting */
  resourceType: ResourceType;
  /** The action the scheduled action should perform in the resources */
  actionType: ScheduledActionType;
  /** The time which the scheduled action is supposed to start running */
  startTime: string;
  /** The time when the scheduled action is supposed to stop scheduling */
  endTime?: string;
  /** The schedule the scheduled action is supposed to follow */
  schedule: ScheduledActionsSchedule;
  /** The notification settings for the scheduled action */
  notificationSettings: NotificationProperties[];
  /** Tell if the scheduled action is disabled or not */
  disabled?: boolean;
  /** The status of the last provisioning operation performed on the resource. */
  readonly provisioningState?: ProvisioningState;
  /** The notification settings for the scheduled action at a resource level. Resource level notification settings are scope to specific resources only and submitted through attach requests. */
  readonly resourceNotificationSettings?: NotificationProperties[];
}

export function scheduledActionsExtensionPropertiesDeserializer(
  item: any,
): ScheduledActionsExtensionProperties {
  return {
    resourceType: item["resourceType"],
    actionType: item["actionType"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    schedule: scheduledActionsScheduleDeserializer(item["schedule"]),
    notificationSettings: notificationPropertiesArrayDeserializer(item["notificationSettings"]),
    disabled: item["disabled"],
    provisioningState: item["provisioningState"],
    resourceNotificationSettings: !item["resourceNotificationSettings"]
      ? item["resourceNotificationSettings"]
      : notificationPropertiesArrayDeserializer(item["resourceNotificationSettings"]),
  };
}

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceDeserializer(item: any): ExtensionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The response of a Occurrence list operation. */
export interface _OccurrenceListResult {
  /** The Occurrence items on this page */
  value: Occurrence[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _occurrenceListResultDeserializer(item: any): _OccurrenceListResult {
  return {
    value: occurrenceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function occurrenceArrayDeserializer(result: Array<Occurrence>): any[] {
  return result.map((item) => {
    return occurrenceDeserializer(item);
  });
}

/** Paged collection of OccurrenceResource items */
export interface _OccurrenceResourceListResponse {
  /** The OccurrenceResource items on this page */
  value: OccurrenceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _occurrenceResourceListResponseDeserializer(
  item: any,
): _OccurrenceResourceListResponse {
  return {
    value: occurrenceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function occurrenceResourceArrayDeserializer(result: Array<OccurrenceResource>): any[] {
  return result.map((item) => {
    return occurrenceResourceDeserializer(item);
  });
}

/** Represents an scheduled action resource metadata. */
export interface OccurrenceResource {
  /** The name of the resource */
  readonly name: string;
  /** The compute RP resource id of the resource in the scheduled actions scope. */
  readonly id: string;
  /** The type of resource */
  readonly type?: string;
  /**
   * The ARM Id of the resource.
   * "subscriptions/{subId}/resourceGroups/{rgName}/providers/Microsoft.Compute/virtualMachines/{vmName}"
   */
  resourceId: string;
  /** The desired notification settings for the specified resource. */
  notificationSettings?: NotificationProperties[];
  /** The time the occurrence is scheduled for the resource. */
  readonly scheduledTime: Date;
  /** The current state of the resource */
  readonly provisioningState?: ResourceProvisioningState;
  /** Error details for the resource. Only populated if resource is in failed state. */
  readonly errorDetails?: ErrorModel;
}

export function occurrenceResourceDeserializer(item: any): OccurrenceResource {
  return {
    name: item["name"],
    id: item["id"],
    type: item["type"],
    resourceId: item["resourceId"],
    notificationSettings: !item["notificationSettings"]
      ? item["notificationSettings"]
      : notificationPropertiesArrayDeserializer(item["notificationSettings"]),
    scheduledTime: new Date(item["scheduledTime"]),
    provisioningState: item["provisioningState"],
    errorDetails: !item["errorDetails"] ? item["errorDetails"] : item["errorDetails"],
  };
}

/** Request to ask for a delay in an occurrence, delay should be set to client local time eg (ACST) 2025-05-30T22:03:00+09:30, (PST) 2025-05-30T06:35:00-07:00 */
export interface DelayRequest {
  /** The exact time to delay the operations to */
  delay: string;
  /** The resources that should be delayed. If empty, the delay will apply to the all resources in the occurrence. */
  resourceIds: string[];
}

export function delayRequestSerializer(item: DelayRequest): any {
  return {
    delay: item["delay"],
    resourceIds: item["resourceIds"].map((p: any) => {
      return p;
    }),
  };
}

/** The response of a OccurrenceExtensionResource list operation. */
export interface _OccurrenceExtensionResourceListResult {
  /** The OccurrenceExtensionResource items on this page */
  value: OccurrenceExtensionResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _occurrenceExtensionResourceListResultDeserializer(
  item: any,
): _OccurrenceExtensionResourceListResult {
  return {
    value: occurrenceExtensionResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function occurrenceExtensionResourceArrayDeserializer(
  result: Array<OccurrenceExtensionResource>,
): any[] {
  return result.map((item) => {
    return occurrenceExtensionResourceDeserializer(item);
  });
}

/** The scheduled action extension */
export interface OccurrenceExtensionResource extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: OccurrenceExtensionProperties;
}

export function occurrenceExtensionResourceDeserializer(item: any): OccurrenceExtensionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : occurrenceExtensionPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the occurrence extension */
export interface OccurrenceExtensionProperties {
  /**
   * The ARM Id of the resource.
   * "subscriptions/{subId}/resourceGroups/{rgName}/providers/Microsoft.Compute/virtualMachines/{vmName}"
   */
  resourceId: string;
  /** The desired notification settings for the specified resource. */
  notificationSettings?: NotificationProperties[];
  /** The time the occurrence is scheduled for the resource. Specified in UTC. */
  readonly scheduledTime: Date;
  /** The current state of the resource */
  readonly provisioningState?: ResourceProvisioningState;
  /** Error details for the resource. Only populated if resource is in failed state. */
  readonly errorDetails?: ErrorModel;
  /** The arm identifier of the scheduled action the occurrence belongs to */
  scheduledActionId: string;
}

export function occurrenceExtensionPropertiesDeserializer(
  item: any,
): OccurrenceExtensionProperties {
  return {
    resourceId: item["resourceId"],
    notificationSettings: !item["notificationSettings"]
      ? item["notificationSettings"]
      : notificationPropertiesArrayDeserializer(item["notificationSettings"]),
    scheduledTime: new Date(item["scheduledTime"]),
    provisioningState: item["provisioningState"],
    errorDetails: !item["errorDetails"] ? item["errorDetails"] : item["errorDetails"],
    scheduledActionId: item["scheduledActionId"],
  };
}

/** ComputeSchedule API versions */
export enum KnownVersions {
  /** 2024-08-15-preview version */
  Versions20240815Preview = "2024-08-15-preview",
  /** 2024-10-01 version */
  "V2024-10-01" = "2024-10-01",
  /** 2025-05-01 version */
  V20250501 = "2025-05-01",
  /** 2025-04-15-preview version */
  Versions20250415Preview = "2025-04-15-preview",
  /** 2026-01-01-preview version */
  Versions20260101Preview = "2026-01-01-preview",
  /** 2026-03-01-preview version */
  Versions20260301Preview = "2026-03-01-preview",
  /** 2026-04-15-preview version */
  Versions20260415Preview = "2026-04-15-preview",
}
