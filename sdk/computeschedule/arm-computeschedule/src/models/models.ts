// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The deallocate request for resources */
export interface SubmitDeallocateRequest {
  /** The schedule for the request */
  schedule: Schedule;
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources: Resources;
  /** Correlationid item */
  correlationid: string;
}

export function submitDeallocateRequestSerializer(
  item: SubmitDeallocateRequest,
): Record<string, unknown> {
  return {
    schedule: scheduleSerializer(item.schedule),
    executionParameters: executionParametersSerializer(item.executionParameters),
    resources: resourcesSerializer(item.resources),
    correlationid: item["correlationid"],
  };
}

/** The schedule details for the user request */
export interface Schedule {
  /** The deadline for the operation */
  deadLine: string;
  /** The timezone for the operation */
  timeZone: string;
  /** The deadlinetype of the operation, this can either be InitiateAt or CompleteBy */
  deadlineType: DeadlineType;
}

export function scheduleSerializer(item: Schedule): Record<string, unknown> {
  return {
    deadLine: item["deadLine"],
    timeZone: item["timeZone"],
    deadlineType: item["deadlineType"],
  };
}

/** Known values of {@link DeadlineType} that the service accepts. */
export enum KnownDeadlineType {
  /** Unknown */
  Unknown = "Unknown",
  /** InitiateAt */
  InitiateAt = "InitiateAt",
  /** CompleteBy */
  CompleteBy = "CompleteBy",
}

/**
 * The types of deadlines supported by ScheduledActions \
 * {@link KnownDeadlineType} can be used interchangeably with DeadlineType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **InitiateAt** \
 * **CompleteBy**
 */
export type DeadlineType = string;

/** Extra details needed to run the user's request */
export interface ExecutionParameters {
  /** Details that could optimize the user's request */
  optimizationPreference?: OptimizationPreference;
  /** Retry policy the user can pass */
  retryPolicy?: RetryPolicy;
}

export function executionParametersSerializer(item: ExecutionParameters): Record<string, unknown> {
  return {
    optimizationPreference: item["optimizationPreference"],
    retryPolicy: !item.retryPolicy ? item.retryPolicy : retryPolicySerializer(item.retryPolicy),
  };
}

/** Known values of {@link OptimizationPreference} that the service accepts. */
export enum KnownOptimizationPreference {
  /** Cost */
  Cost = "Cost",
  /** Availability */
  Availability = "Availability",
  /** CostAvailabilityBalanced */
  CostAvailabilityBalanced = "CostAvailabilityBalanced",
}

/**
 * The preferences customers can select to optimize their requests to ScheduledActions \
 * {@link KnownOptimizationPreference} can be used interchangeably with OptimizationPreference,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cost** \
 * **Availability** \
 * **CostAvailabilityBalanced**
 */
export type OptimizationPreference = string;

/** The retry policy for the user request */
export interface RetryPolicy {
  /** Retry count for user request */
  retryCount?: number;
  /** Retry window in minutes for user request */
  retryWindowInMinutes?: number;
}

export function retryPolicySerializer(item: RetryPolicy): Record<string, unknown> {
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

export function resourcesSerializer(item: Resources): Record<string, unknown> {
  return {
    ids: item["ids"],
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

/** The details of a response from an operation on a resource */
export interface ResourceOperationDetails {
  /** Operation identifier for the unique operation */
  operationId: string;
  /** Unique identifier for the resource involved in the operation, eg ArmId */
  resourceId: string;
  /** Type of operation performed on the resources */
  opType: ResourceOperationType;
  /** Subscription id attached to the request */
  subscriptionId: string;
  /** Deadline for the operation */
  deadline: string;
  /** Type of deadline of the operation */
  deadlineType: DeadlineType;
  /** Current state of the operation */
  state: OperationState;
  /** Timezone for the operation */
  timeZone?: string;
  /** Operation level errors if they exist */
  resourceOperationError?: ResourceOperationError;
  /** Time the operation was complete if errors are null */
  completedAt?: string;
  /** Retry policy the user can pass */
  retryPolicy?: RetryPolicy;
}

/** Known values of {@link ResourceOperationType} that the service accepts. */
export enum KnownResourceOperationType {
  /** Unknown */
  Unknown = "Unknown",
  /** Start */
  Start = "Start",
  /** Deallocate */
  Deallocate = "Deallocate",
  /** Hibernate */
  Hibernate = "Hibernate",
}

/**
 * The kind of operation types that can be performed on resources using ScheduledActions \
 * {@link KnownResourceOperationType} can be used interchangeably with ResourceOperationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Start** \
 * **Deallocate** \
 * **Hibernate**
 */
export type ResourceOperationType = string;

/** Known values of {@link OperationState} that the service accepts. */
export enum KnownOperationState {
  /** Unknown */
  Unknown = "Unknown",
  /** PendingScheduling */
  PendingScheduling = "PendingScheduling",
  /** Scheduled */
  Scheduled = "Scheduled",
  /** PendingExecution */
  PendingExecution = "PendingExecution",
  /** Executing */
  Executing = "Executing",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Cancelled */
  Cancelled = "Cancelled",
  /** Blocked */
  Blocked = "Blocked",
}

/**
 * Values that define the states of operations in Scheduled Actions \
 * {@link KnownOperationState} can be used interchangeably with OperationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **PendingScheduling** \
 * **Scheduled** \
 * **PendingExecution** \
 * **Executing** \
 * **Succeeded** \
 * **Failed** \
 * **Cancelled** \
 * **Blocked**
 */
export type OperationState = string;

/** These describe errors that occur at the resource level */
export interface ResourceOperationError {
  /** Code for the error eg 404, 500 */
  errorCode: string;
  /** Detailed message about the error */
  errorDetails: string;
}

/** This is the request for hibernate */
export interface SubmitHibernateRequest {
  /** The schedule for the request */
  schedule: Schedule;
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources: Resources;
  /** Correlationid item */
  correlationid: string;
}

export function submitHibernateRequestSerializer(
  item: SubmitHibernateRequest,
): Record<string, unknown> {
  return {
    schedule: scheduleSerializer(item.schedule),
    executionParameters: executionParametersSerializer(item.executionParameters),
    resources: resourcesSerializer(item.resources),
    correlationid: item["correlationid"],
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

/** This is the request for start */
export interface SubmitStartRequest {
  /** The schedule for the request */
  schedule: Schedule;
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources: Resources;
  /** Correlationid item */
  correlationid: string;
}

export function submitStartRequestSerializer(item: SubmitStartRequest): Record<string, unknown> {
  return {
    schedule: scheduleSerializer(item.schedule),
    executionParameters: executionParametersSerializer(item.executionParameters),
    resources: resourcesSerializer(item.resources),
    correlationid: item["correlationid"],
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

/** The ExecuteDeallocateRequest request for executeDeallocate operations */
export interface ExecuteDeallocateRequest {
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources: Resources;
  /** Correlationid item */
  correlationid: string;
}

export function executeDeallocateRequestSerializer(
  item: ExecuteDeallocateRequest,
): Record<string, unknown> {
  return {
    executionParameters: executionParametersSerializer(item.executionParameters),
    resources: resourcesSerializer(item.resources),
    correlationid: item["correlationid"],
  };
}

/** The ExecuteHibernateRequest request for executeHibernate operations */
export interface ExecuteHibernateRequest {
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources: Resources;
  /** Correlationid item */
  correlationid: string;
}

export function executeHibernateRequestSerializer(
  item: ExecuteHibernateRequest,
): Record<string, unknown> {
  return {
    executionParameters: executionParametersSerializer(item.executionParameters),
    resources: resourcesSerializer(item.resources),
    correlationid: item["correlationid"],
  };
}

/** The ExecuteStartRequest request for executeStart operations */
export interface ExecuteStartRequest {
  /** The execution parameters for the request */
  executionParameters: ExecutionParameters;
  /** The resources for the request */
  resources: Resources;
  /** Correlationid item */
  correlationid: string;
}

export function executeStartRequestSerializer(item: ExecuteStartRequest): Record<string, unknown> {
  return {
    executionParameters: executionParametersSerializer(item.executionParameters),
    resources: resourcesSerializer(item.resources),
    correlationid: item["correlationid"],
  };
}

/** This is the request to get operation status using operationids */
export interface GetOperationStatusRequest {
  /** The list of operation ids to get the status of */
  operationIds: string[];
  /** Correlationid item */
  correlationid: string;
}

export function getOperationStatusRequestSerializer(
  item: GetOperationStatusRequest,
): Record<string, unknown> {
  return {
    operationIds: item["operationIds"],
    correlationid: item["correlationid"],
  };
}

/** This is the response from a get operations status request */
export interface GetOperationStatusResponse {
  /** An array of resource operations based on their operation ids */
  results: ResourceOperation[];
}

/** This is the request to cancel running operations in scheduled actions using the operation ids */
export interface CancelOperationsRequest {
  /** The list of operation ids to cancel operations on */
  operationIds: string[];
  /** Correlationid item */
  correlationid: string;
}

export function cancelOperationsRequestSerializer(
  item: CancelOperationsRequest,
): Record<string, unknown> {
  return {
    operationIds: item["operationIds"],
    correlationid: item["correlationid"],
  };
}

/** This is the response from a cancel operations request */
export interface CancelOperationsResponse {
  /** An array of resource operations that were successfully cancelled */
  results: ResourceOperation[];
}

/** This is the request to get errors per vm operations */
export interface GetOperationErrorsRequest {
  /** The list of operation ids to query errors of */
  operationIds: string[];
}

export function getOperationErrorsRequestSerializer(
  item: GetOperationErrorsRequest,
): Record<string, unknown> {
  return {
    operationIds: item["operationIds"],
  };
}

/** This is the response from a get operations errors request */
export interface GetOperationErrorsResponse {
  /** An array of operationids and their corresponding errors if any */
  results: OperationErrorsResult[];
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

/** This defines a list of operation errors associated with a unique operationId */
export interface OperationErrorDetails {
  /** The error code of the operation */
  errorCode: string;
  /** The error details of the operation */
  errorDetails: string;
  /** The timestamp of the error occurence */
  timeStamp: string;
  /** CRP operationid of the operation for deeper analysis */
  crpOperationId: string;
}

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
  User = "user",
  /** system */
  System = "system",
  /** user,system */
  UserSystem = "user,system",
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
