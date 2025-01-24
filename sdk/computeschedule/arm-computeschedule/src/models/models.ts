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
  user = "user",
  /** Indicates the operation is initiated by a system. */
  system = "system",
  /** Indicates the operation is initiated by a user or system. */
  "user,system" = "user,system",
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

/** ComputeSchedule API versions */
export enum KnownVersions {
  /** 2024-10-01 version */
  "2024-10-01" = "2024-10-01",
}
