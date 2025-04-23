// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ComputeScheduleClient } from "./computeScheduleClient.js";
export {
  SubmitDeallocateRequest,
  Schedule,
  KnownDeadlineType,
  DeadlineType,
  ExecutionParameters,
  KnownOptimizationPreference,
  OptimizationPreference,
  RetryPolicy,
  Resources,
  DeallocateResourceOperationResponse,
  ResourceOperation,
  ResourceOperationDetails,
  KnownResourceOperationType,
  ResourceOperationType,
  KnownOperationState,
  OperationState,
  ResourceOperationError,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  SubmitHibernateRequest,
  HibernateResourceOperationResponse,
  SubmitStartRequest,
  StartResourceOperationResponse,
  ExecuteDeallocateRequest,
  ExecuteHibernateRequest,
  ExecuteStartRequest,
  GetOperationStatusRequest,
  GetOperationStatusResponse,
  CancelOperationsRequest,
  CancelOperationsResponse,
  GetOperationErrorsRequest,
  GetOperationErrorsResponse,
  OperationErrorsResult,
  OperationErrorDetails,
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  KnownVersions,
} from "./models/index.js";
export {
  ComputeScheduleClientOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
  ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
  ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
  ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
  ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
  OperationsListOptionalParams,
} from "./api/index.js";
export { OperationsOperations, ScheduledActionsOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
