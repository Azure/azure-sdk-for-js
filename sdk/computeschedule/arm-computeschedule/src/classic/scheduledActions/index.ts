// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleContext } from "../../api/computeScheduleContext.js";
import {
  SubmitDeallocateRequest,
  DeallocateResourceOperationResponse,
  SubmitHibernateRequest,
  HibernateResourceOperationResponse,
  SubmitStartRequest,
  StartResourceOperationResponse,
  ExecuteDeallocateRequest,
  ExecuteHibernateRequest,
  ExecuteStartRequest,
  ExecuteCreateRequest,
  CreateResourceOperationResponse,
  ExecuteDeleteRequest,
  DeleteResourceOperationResponse,
  GetOperationStatusRequest,
  GetOperationStatusResponse,
  CancelOperationsRequest,
  CancelOperationsResponse,
  GetOperationErrorsRequest,
  GetOperationErrorsResponse,
} from "../../models/models.js";
import {
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
} from "../../api/scheduledActions/options.js";
import {
  virtualMachinesGetOperationErrors,
  virtualMachinesCancelOperations,
  virtualMachinesGetOperationStatus,
  virtualMachinesExecuteDelete,
  virtualMachinesExecuteCreate,
  virtualMachinesExecuteStart,
  virtualMachinesExecuteHibernate,
  virtualMachinesExecuteDeallocate,
  virtualMachinesSubmitStart,
  virtualMachinesSubmitHibernate,
  virtualMachinesSubmitDeallocate,
} from "../../api/scheduledActions/operations.js";

/** Interface representing a ScheduledActions operations. */
export interface ScheduledActionsOperations {
  /** VirtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist. */
  virtualMachinesGetOperationErrors: (
    locationparameter: string,
    requestBody: GetOperationErrorsRequest,
    options?: ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
  ) => Promise<GetOperationErrorsResponse>;
  /** VirtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request */
  virtualMachinesCancelOperations: (
    locationparameter: string,
    requestBody: CancelOperationsRequest,
    options?: ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
  ) => Promise<CancelOperationsResponse>;
  /** VirtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines */
  virtualMachinesGetOperationStatus: (
    locationparameter: string,
    requestBody: GetOperationStatusRequest,
    options?: ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
  ) => Promise<GetOperationStatusResponse>;
  /** VirtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteDelete: (
    locationparameter: string,
    requestBody: ExecuteDeleteRequest,
    options?: ScheduledActionsVirtualMachinesExecuteDeleteOptionalParams,
  ) => Promise<DeleteResourceOperationResponse>;
  /** VirtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteCreate: (
    locationparameter: string,
    requestBody: ExecuteCreateRequest,
    options?: ScheduledActionsVirtualMachinesExecuteCreateOptionalParams,
  ) => Promise<CreateResourceOperationResponse>;
  /** VirtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteStart: (
    locationparameter: string,
    requestBody: ExecuteStartRequest,
    options?: ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
  ) => Promise<StartResourceOperationResponse>;
  /** VirtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteHibernate: (
    locationparameter: string,
    requestBody: ExecuteHibernateRequest,
    options?: ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
  ) => Promise<HibernateResourceOperationResponse>;
  /** VirtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteDeallocate: (
    locationparameter: string,
    requestBody: ExecuteDeallocateRequest,
    options?: ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ) => Promise<DeallocateResourceOperationResponse>;
  /** VirtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future. */
  virtualMachinesSubmitStart: (
    locationparameter: string,
    requestBody: SubmitStartRequest,
    options?: ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
  ) => Promise<StartResourceOperationResponse>;
  /** VirtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future. */
  virtualMachinesSubmitHibernate: (
    locationparameter: string,
    requestBody: SubmitHibernateRequest,
    options?: ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
  ) => Promise<HibernateResourceOperationResponse>;
  /** VirtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future. */
  virtualMachinesSubmitDeallocate: (
    locationparameter: string,
    requestBody: SubmitDeallocateRequest,
    options?: ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
  ) => Promise<DeallocateResourceOperationResponse>;
}

function _getScheduledActions(context: ComputeScheduleContext) {
  return {
    virtualMachinesGetOperationErrors: (
      locationparameter: string,
      requestBody: GetOperationErrorsRequest,
      options?: ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
    ) => virtualMachinesGetOperationErrors(context, locationparameter, requestBody, options),
    virtualMachinesCancelOperations: (
      locationparameter: string,
      requestBody: CancelOperationsRequest,
      options?: ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
    ) => virtualMachinesCancelOperations(context, locationparameter, requestBody, options),
    virtualMachinesGetOperationStatus: (
      locationparameter: string,
      requestBody: GetOperationStatusRequest,
      options?: ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
    ) => virtualMachinesGetOperationStatus(context, locationparameter, requestBody, options),
    virtualMachinesExecuteDelete: (
      locationparameter: string,
      requestBody: ExecuteDeleteRequest,
      options?: ScheduledActionsVirtualMachinesExecuteDeleteOptionalParams,
    ) => virtualMachinesExecuteDelete(context, locationparameter, requestBody, options),
    virtualMachinesExecuteCreate: (
      locationparameter: string,
      requestBody: ExecuteCreateRequest,
      options?: ScheduledActionsVirtualMachinesExecuteCreateOptionalParams,
    ) => virtualMachinesExecuteCreate(context, locationparameter, requestBody, options),
    virtualMachinesExecuteStart: (
      locationparameter: string,
      requestBody: ExecuteStartRequest,
      options?: ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
    ) => virtualMachinesExecuteStart(context, locationparameter, requestBody, options),
    virtualMachinesExecuteHibernate: (
      locationparameter: string,
      requestBody: ExecuteHibernateRequest,
      options?: ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
    ) => virtualMachinesExecuteHibernate(context, locationparameter, requestBody, options),
    virtualMachinesExecuteDeallocate: (
      locationparameter: string,
      requestBody: ExecuteDeallocateRequest,
      options?: ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
    ) => virtualMachinesExecuteDeallocate(context, locationparameter, requestBody, options),
    virtualMachinesSubmitStart: (
      locationparameter: string,
      requestBody: SubmitStartRequest,
      options?: ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
    ) => virtualMachinesSubmitStart(context, locationparameter, requestBody, options),
    virtualMachinesSubmitHibernate: (
      locationparameter: string,
      requestBody: SubmitHibernateRequest,
      options?: ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
    ) => virtualMachinesSubmitHibernate(context, locationparameter, requestBody, options),
    virtualMachinesSubmitDeallocate: (
      locationparameter: string,
      requestBody: SubmitDeallocateRequest,
      options?: ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
    ) => virtualMachinesSubmitDeallocate(context, locationparameter, requestBody, options),
  };
}

export function _getScheduledActionsOperations(
  context: ComputeScheduleContext,
): ScheduledActionsOperations {
  return {
    ..._getScheduledActions(context),
  };
}
