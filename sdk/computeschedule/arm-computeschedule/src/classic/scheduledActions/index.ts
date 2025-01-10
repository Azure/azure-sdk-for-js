// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleContext } from "../../api/computeScheduleContext.js";
import {
  ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
  ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
  ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
} from "../../api/options.js";
import {
  scheduledActionsVirtualMachinesSubmitDeallocate,
  scheduledActionsVirtualMachinesSubmitHibernate,
  scheduledActionsVirtualMachinesSubmitStart,
  scheduledActionsVirtualMachinesExecuteDeallocate,
  scheduledActionsVirtualMachinesExecuteHibernate,
  scheduledActionsVirtualMachinesExecuteStart,
  scheduledActionsVirtualMachinesGetOperationStatus,
  scheduledActionsVirtualMachinesCancelOperations,
  scheduledActionsVirtualMachinesGetOperationErrors,
} from "../../api/scheduledActions/index.js";
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
  GetOperationStatusRequest,
  GetOperationStatusResponse,
  CancelOperationsRequest,
  CancelOperationsResponse,
  GetOperationErrorsRequest,
  GetOperationErrorsResponse,
} from "../../models/models.js";

/** Interface representing a ScheduledActions operations. */
export interface ScheduledActionsOperations {
  /** VirtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future. */
  virtualMachinesSubmitDeallocate: (
    locationparameter: string,
    requestBody: SubmitDeallocateRequest,
    options?: ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
  ) => Promise<DeallocateResourceOperationResponse>;
  /** VirtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future. */
  virtualMachinesSubmitHibernate: (
    locationparameter: string,
    requestBody: SubmitHibernateRequest,
    options?: ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
  ) => Promise<HibernateResourceOperationResponse>;
  /** VirtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future. */
  virtualMachinesSubmitStart: (
    locationparameter: string,
    requestBody: SubmitStartRequest,
    options?: ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
  ) => Promise<StartResourceOperationResponse>;
  /** VirtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteDeallocate: (
    locationparameter: string,
    requestBody: ExecuteDeallocateRequest,
    options?: ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ) => Promise<DeallocateResourceOperationResponse>;
  /** VirtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteHibernate: (
    locationparameter: string,
    requestBody: ExecuteHibernateRequest,
    options?: ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
  ) => Promise<HibernateResourceOperationResponse>;
  /** VirtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteStart: (
    locationparameter: string,
    requestBody: ExecuteStartRequest,
    options?: ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
  ) => Promise<StartResourceOperationResponse>;
  /** VirtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines */
  virtualMachinesGetOperationStatus: (
    locationparameter: string,
    requestBody: GetOperationStatusRequest,
    options?: ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
  ) => Promise<GetOperationStatusResponse>;
  /** VirtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request */
  virtualMachinesCancelOperations: (
    locationparameter: string,
    requestBody: CancelOperationsRequest,
    options?: ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
  ) => Promise<CancelOperationsResponse>;
  /** VirtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist. */
  virtualMachinesGetOperationErrors: (
    locationparameter: string,
    requestBody: GetOperationErrorsRequest,
    options?: ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
  ) => Promise<GetOperationErrorsResponse>;
}

export function getScheduledActions(
  context: ComputeScheduleContext,
  subscriptionId: string,
) {
  return {
    virtualMachinesSubmitDeallocate: (
      locationparameter: string,
      requestBody: SubmitDeallocateRequest,
      options?: ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
    ) =>
      scheduledActionsVirtualMachinesSubmitDeallocate(
        context,
        subscriptionId,
        locationparameter,
        requestBody,
        options,
      ),
    virtualMachinesSubmitHibernate: (
      locationparameter: string,
      requestBody: SubmitHibernateRequest,
      options?: ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
    ) =>
      scheduledActionsVirtualMachinesSubmitHibernate(
        context,
        subscriptionId,
        locationparameter,
        requestBody,
        options,
      ),
    virtualMachinesSubmitStart: (
      locationparameter: string,
      requestBody: SubmitStartRequest,
      options?: ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
    ) =>
      scheduledActionsVirtualMachinesSubmitStart(
        context,
        subscriptionId,
        locationparameter,
        requestBody,
        options,
      ),
    virtualMachinesExecuteDeallocate: (
      locationparameter: string,
      requestBody: ExecuteDeallocateRequest,
      options?: ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
    ) =>
      scheduledActionsVirtualMachinesExecuteDeallocate(
        context,
        subscriptionId,
        locationparameter,
        requestBody,
        options,
      ),
    virtualMachinesExecuteHibernate: (
      locationparameter: string,
      requestBody: ExecuteHibernateRequest,
      options?: ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
    ) =>
      scheduledActionsVirtualMachinesExecuteHibernate(
        context,
        subscriptionId,
        locationparameter,
        requestBody,
        options,
      ),
    virtualMachinesExecuteStart: (
      locationparameter: string,
      requestBody: ExecuteStartRequest,
      options?: ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
    ) =>
      scheduledActionsVirtualMachinesExecuteStart(
        context,
        subscriptionId,
        locationparameter,
        requestBody,
        options,
      ),
    virtualMachinesGetOperationStatus: (
      locationparameter: string,
      requestBody: GetOperationStatusRequest,
      options?: ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
    ) =>
      scheduledActionsVirtualMachinesGetOperationStatus(
        context,
        subscriptionId,
        locationparameter,
        requestBody,
        options,
      ),
    virtualMachinesCancelOperations: (
      locationparameter: string,
      requestBody: CancelOperationsRequest,
      options?: ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
    ) =>
      scheduledActionsVirtualMachinesCancelOperations(
        context,
        subscriptionId,
        locationparameter,
        requestBody,
        options,
      ),
    virtualMachinesGetOperationErrors: (
      locationparameter: string,
      requestBody: GetOperationErrorsRequest,
      options?: ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
    ) =>
      scheduledActionsVirtualMachinesGetOperationErrors(
        context,
        subscriptionId,
        locationparameter,
        requestBody,
        options,
      ),
  };
}

export function getScheduledActionsOperations(
  context: ComputeScheduleContext,
  subscriptionId: string,
): ScheduledActionsOperations {
  return {
    ...getScheduledActions(context, subscriptionId),
  };
}
