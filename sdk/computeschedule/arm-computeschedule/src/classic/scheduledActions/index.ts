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
  GetOperationStatusRequest,
  GetOperationStatusResponse,
  CancelOperationsRequest,
  CancelOperationsResponse,
  GetOperationErrorsRequest,
  GetOperationErrorsResponse,
} from "../../models/models.js";
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
  ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
  ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
  ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
  ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
  ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
  ScheduledActionsVirtualMachinesGetOperationErrorsOptionalParams,
} from "../../models/options.js";

/** Interface representing a ScheduledActions operations. */
export interface ScheduledActionsOperations {
  /** virtualMachinesSubmitDeallocate: submitDeallocate for a virtual machine */
  virtualMachinesSubmitDeallocate: (
    locationparameter: string,
    requestBody: SubmitDeallocateRequest,
    options?: ScheduledActionsVirtualMachinesSubmitDeallocateOptionalParams,
  ) => Promise<DeallocateResourceOperationResponse>;
  /** virtualMachinesSubmitHibernate: submitHibernate for a virtual machine */
  virtualMachinesSubmitHibernate: (
    locationparameter: string,
    requestBody: SubmitHibernateRequest,
    options?: ScheduledActionsVirtualMachinesSubmitHibernateOptionalParams,
  ) => Promise<HibernateResourceOperationResponse>;
  /** virtualMachinesSubmitStart: submitStart for a virtual machine */
  virtualMachinesSubmitStart: (
    locationparameter: string,
    requestBody: SubmitStartRequest,
    options?: ScheduledActionsVirtualMachinesSubmitStartOptionalParams,
  ) => Promise<StartResourceOperationResponse>;
  /** virtualMachinesExecuteDeallocate: executeDeallocate for a virtual machine */
  virtualMachinesExecuteDeallocate: (
    locationparameter: string,
    requestBody: ExecuteDeallocateRequest,
    options?: ScheduledActionsVirtualMachinesExecuteDeallocateOptionalParams,
  ) => Promise<DeallocateResourceOperationResponse>;
  /** virtualMachinesExecuteHibernate: executeHibernate for a virtual machine */
  virtualMachinesExecuteHibernate: (
    locationparameter: string,
    requestBody: ExecuteHibernateRequest,
    options?: ScheduledActionsVirtualMachinesExecuteHibernateOptionalParams,
  ) => Promise<HibernateResourceOperationResponse>;
  /** virtualMachinesExecuteStart: executeStart for a virtual machine */
  virtualMachinesExecuteStart: (
    locationparameter: string,
    requestBody: ExecuteStartRequest,
    options?: ScheduledActionsVirtualMachinesExecuteStartOptionalParams,
  ) => Promise<StartResourceOperationResponse>;
  /** virtualMachinesGetOperationStatus: getOperationStatus for a virtual machine */
  virtualMachinesGetOperationStatus: (
    locationparameter: string,
    requestBody: GetOperationStatusRequest,
    options?: ScheduledActionsVirtualMachinesGetOperationStatusOptionalParams,
  ) => Promise<GetOperationStatusResponse>;
  /** virtualMachinesCancelOperations: cancelOperations for a virtual machine */
  virtualMachinesCancelOperations: (
    locationparameter: string,
    requestBody: CancelOperationsRequest,
    options?: ScheduledActionsVirtualMachinesCancelOperationsOptionalParams,
  ) => Promise<CancelOperationsResponse>;
  /** virtualMachinesGetOperationErrors: getOperationErrors associated with an operation on a virtual machine */
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
