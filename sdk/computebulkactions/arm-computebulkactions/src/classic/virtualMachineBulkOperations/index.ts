// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  virtualMachinesCancelOperations,
  virtualMachinesGetOperationStatus,
  virtualMachinesExecuteDelete,
  virtualMachinesExecuteCreate,
  virtualMachinesExecuteStart,
  virtualMachinesExecuteHibernate,
  virtualMachinesExecuteDeallocate,
} from "../../api/virtualMachineBulkOperations/operations.js";
import type {
  VirtualMachineBulkOperationsVirtualMachinesCancelOperationsOptionalParams,
  VirtualMachineBulkOperationsVirtualMachinesGetOperationStatusOptionalParams,
  VirtualMachineBulkOperationsVirtualMachinesExecuteDeleteOptionalParams,
  VirtualMachineBulkOperationsVirtualMachinesExecuteCreateOptionalParams,
  VirtualMachineBulkOperationsVirtualMachinesExecuteStartOptionalParams,
  VirtualMachineBulkOperationsVirtualMachinesExecuteHibernateOptionalParams,
  VirtualMachineBulkOperationsVirtualMachinesExecuteDeallocateOptionalParams,
} from "../../api/virtualMachineBulkOperations/options.js";
import type {
  ExecuteDeallocateContent,
  DeallocateResourceOperationResponse,
  ExecuteHibernateContent,
  HibernateResourceOperationResponse,
  ExecuteStartContent,
  StartResourceOperationResponse,
  ExecuteCreateContent,
  CreateResourceOperationResponse,
  ExecuteDeleteContent,
  DeleteResourceOperationResponse,
  GetOperationStatusContent,
  GetOperationStatusResponse,
  CancelOperationsRequest,
  CancelOperationsResponse,
} from "../../models/models.js";

/** Interface representing a VirtualMachineBulkOperations operations. */
export interface VirtualMachineBulkOperationsOperations {
  /** VirtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request */
  virtualMachinesCancelOperations: (
    locationparameter: string,
    requestBody: CancelOperationsRequest,
    options?: VirtualMachineBulkOperationsVirtualMachinesCancelOperationsOptionalParams,
  ) => Promise<CancelOperationsResponse>;
  /** VirtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines */
  virtualMachinesGetOperationStatus: (
    locationparameter: string,
    requestBody: GetOperationStatusContent,
    options?: VirtualMachineBulkOperationsVirtualMachinesGetOperationStatusOptionalParams,
  ) => Promise<GetOperationStatusResponse>;
  /** VirtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteDelete: (
    locationparameter: string,
    requestBody: ExecuteDeleteContent,
    options?: VirtualMachineBulkOperationsVirtualMachinesExecuteDeleteOptionalParams,
  ) => Promise<DeleteResourceOperationResponse>;
  /** VirtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteCreate: (
    locationparameter: string,
    requestBody: ExecuteCreateContent,
    options?: VirtualMachineBulkOperationsVirtualMachinesExecuteCreateOptionalParams,
  ) => Promise<CreateResourceOperationResponse>;
  /** VirtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteStart: (
    locationparameter: string,
    requestBody: ExecuteStartContent,
    options?: VirtualMachineBulkOperationsVirtualMachinesExecuteStartOptionalParams,
  ) => Promise<StartResourceOperationResponse>;
  /** VirtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteHibernate: (
    locationparameter: string,
    requestBody: ExecuteHibernateContent,
    options?: VirtualMachineBulkOperationsVirtualMachinesExecuteHibernateOptionalParams,
  ) => Promise<HibernateResourceOperationResponse>;
  /** VirtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  virtualMachinesExecuteDeallocate: (
    locationparameter: string,
    requestBody: ExecuteDeallocateContent,
    options?: VirtualMachineBulkOperationsVirtualMachinesExecuteDeallocateOptionalParams,
  ) => Promise<DeallocateResourceOperationResponse>;
}

function _getVirtualMachineBulkOperations(context: ComputeContext) {
  return {
    virtualMachinesCancelOperations: (
      locationparameter: string,
      requestBody: CancelOperationsRequest,
      options?: VirtualMachineBulkOperationsVirtualMachinesCancelOperationsOptionalParams,
    ) => virtualMachinesCancelOperations(context, locationparameter, requestBody, options),
    virtualMachinesGetOperationStatus: (
      locationparameter: string,
      requestBody: GetOperationStatusContent,
      options?: VirtualMachineBulkOperationsVirtualMachinesGetOperationStatusOptionalParams,
    ) => virtualMachinesGetOperationStatus(context, locationparameter, requestBody, options),
    virtualMachinesExecuteDelete: (
      locationparameter: string,
      requestBody: ExecuteDeleteContent,
      options?: VirtualMachineBulkOperationsVirtualMachinesExecuteDeleteOptionalParams,
    ) => virtualMachinesExecuteDelete(context, locationparameter, requestBody, options),
    virtualMachinesExecuteCreate: (
      locationparameter: string,
      requestBody: ExecuteCreateContent,
      options?: VirtualMachineBulkOperationsVirtualMachinesExecuteCreateOptionalParams,
    ) => virtualMachinesExecuteCreate(context, locationparameter, requestBody, options),
    virtualMachinesExecuteStart: (
      locationparameter: string,
      requestBody: ExecuteStartContent,
      options?: VirtualMachineBulkOperationsVirtualMachinesExecuteStartOptionalParams,
    ) => virtualMachinesExecuteStart(context, locationparameter, requestBody, options),
    virtualMachinesExecuteHibernate: (
      locationparameter: string,
      requestBody: ExecuteHibernateContent,
      options?: VirtualMachineBulkOperationsVirtualMachinesExecuteHibernateOptionalParams,
    ) => virtualMachinesExecuteHibernate(context, locationparameter, requestBody, options),
    virtualMachinesExecuteDeallocate: (
      locationparameter: string,
      requestBody: ExecuteDeallocateContent,
      options?: VirtualMachineBulkOperationsVirtualMachinesExecuteDeallocateOptionalParams,
    ) => virtualMachinesExecuteDeallocate(context, locationparameter, requestBody, options),
  };
}

export function _getVirtualMachineBulkOperationsOperations(
  context: ComputeContext,
): VirtualMachineBulkOperationsOperations {
  return {
    ..._getVirtualMachineBulkOperations(context),
  };
}
