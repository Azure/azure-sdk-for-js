// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ErrorModel } from "@azure-rest/core-client";

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
}

export function retryPolicySerializer(item: RetryPolicy): any {
  return {
    retryCount: item["retryCount"],
    retryWindowInMinutes: item["retryWindowInMinutes"],
  };
}

export function retryPolicyDeserializer(item: any): RetryPolicy {
  return {
    retryCount: item["retryCount"],
    retryWindowInMinutes: item["retryWindowInMinutes"],
  };
}

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
    completedAt: item["completedAt"],
    retryPolicy: !item["retryPolicy"]
      ? item["retryPolicy"]
      : retryPolicyDeserializer(item["retryPolicy"]),
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
}

/**
 * The kind of operation types that can be performed on resources using ScheduledActions \
 * {@link KnownResourceOperationType} can be used interchangeably with ResourceOperationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The default value for this enum type \
 * **Start**: Start operations on the resources \
 * **Deallocate**: Deallocate operations on the resources \
 * **Hibernate**: Hibernate operations on the resources
 */
export type ResourceOperationType = string;

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

/** The ExecuteCreateRequest request for create operations */
export interface ExecuteCreateRequest {
  /** resource creation payload */
  resourceConfigParameters: ResourceProvisionPayload;
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** CorrelationId item */
  correlationid?: string;
}

export function executeCreateRequestSerializer(item: ExecuteCreateRequest): any {
  return {
    resourceConfigParameters: resourceProvisionPayloadSerializer(item["resourceConfigParameters"]),
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    correlationid: item["correlationid"],
  };
}

/** Resource creation data model */
export interface ResourceProvisionPayload {
  /** JSON object that contains VM properties that are common across all VMs in this batch (if you want to create 100 VMs in this request, and they all have same vmSize, then include vmSize in baseProfile) */
  baseProfile?: Record<string, any>;
  /** JSON array, that contains VM properties that should to be overridden for each VM in the batch (if you want to create 100 VMs, they all need a distinct computerName property, you pass computerNames for each VM in batch in this array), service will merge baseProfile with VM specific overrides and create a merged VMProfile. */
  resourceOverrides?: Record<string, any>[];
  /** Number of VMs to be created */
  resourceCount: number;
  /** if resourceOverrides doesn't contain "name", service will create name based of prefix and ResourceCount e.g. resourceprefix-0,resourceprefix-1.. */
  resourcePrefix?: string;
}

export function resourceProvisionPayloadSerializer(item: ResourceProvisionPayload): any {
  return {
    baseProfile: item["baseProfile"],
    resourceOverrides: !item["resourceOverrides"]
      ? item["resourceOverrides"]
      : item["resourceOverrides"].map((p: any) => {
          return p;
        }),
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
  correlationid?: string;
  /** Forced delete resource item */
  forceDeletion?: boolean;
}

export function executeDeleteRequestSerializer(item: ExecuteDeleteRequest): any {
  return {
    executionParameters: executionParametersSerializer(item["executionParameters"]),
    resources: resourcesSerializer(item["resources"]),
    correlationid: item["correlationid"],
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
export interface ResourceAttachRequest {
  /** List of resources to be attached/patched */
  resources: ScheduledActionResourceCreate[];
}

export function resourceAttachRequestSerializer(item: ResourceAttachRequest): any {
  return {
    resources: scheduledActionResourceCreateArraySerializer(item["resources"]),
  };
}

export function scheduledActionResourceCreateArraySerializer(
  result: Array<ScheduledActionResourceCreate>,
): any[] {
  return result.map((item) => {
    return scheduledActionResourceCreateSerializer(item);
  });
}

/** Represents an scheduled action resource metadata. */
export interface ScheduledActionResourceCreate {
  /**
   * The ARM Id of the resource.
   * "subscriptions/{subId}/resourceGroups/{rgName}/providers/Microsoft.Compute/virtualMachines/{vmName}"
   */
  resourceId: string;
  /** The desired notification settings for the specified resource. */
  notificationSettings?: NotificationProperties[];
}

export function scheduledActionResourceCreateSerializer(item: ScheduledActionResourceCreate): any {
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
export interface ResourcePatchRequest {
  /** The list of resources we watch to patch */
  resources: ScheduledActionResourceCreate[];
}

export function resourcePatchRequestSerializer(item: ResourcePatchRequest): any {
  return {
    resources: scheduledActionResourceCreateArraySerializer(item["resources"]),
  };
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
  properties?: ScheduledActionProperties;
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
      : scheduledActionPropertiesDeserializer(item["properties"]),
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
  V20240815Preview = "2024-08-15-preview",
  /** 2024-10-01 version */
  "V2024-10-01" = "2024-10-01",
  /** 2025-05-01 version */
  V20250501 = "2025-05-01",
  /** 2025-04-15-preview version */
  V20250415Preview = "2025-04-15-preview",
}
