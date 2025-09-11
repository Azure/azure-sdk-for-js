// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ComputeScheduleClient } from "./computeScheduleClient.js";
export {
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
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
  SubmitHibernateRequest,
  HibernateResourceOperationResponse,
  SubmitStartRequest,
  StartResourceOperationResponse,
  ExecuteDeallocateRequest,
  ExecuteHibernateRequest,
  ExecuteStartRequest,
  ExecuteCreateRequest,
  ResourceProvisionPayload,
  CreateResourceOperationResponse,
  ExecuteDeleteRequest,
  DeleteResourceOperationResponse,
  GetOperationStatusRequest,
  GetOperationStatusResponse,
  CancelOperationsRequest,
  CancelOperationsResponse,
  GetOperationErrorsRequest,
  GetOperationErrorsResponse,
  OperationErrorsResult,
  OperationErrorDetails,
  KnownVersions,
} from "./models/index.js";
export { ComputeScheduleClientOptionalParams } from "./api/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
  ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
  ScheduledActionsVirtualMachinesExecuteDeleteOptionalParams,
  ScheduledActionsVirtualMachinesExecuteCreateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
  ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
  ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
} from "./api/scheduledActions/index.js";
export { OperationsOperations, ScheduledActionsOperations } from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
