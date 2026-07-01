// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  bulkCancelOperations,
  bulkGetOperationsStatus,
  bulkDeleteOperation,
  bulkStartOperation,
  bulkHibernateOperation,
  bulkDeallocateOperation,
} from "../../api/virtualMachineBulkOperations/operations.js";
import type {
  VirtualMachineBulkOperationsBulkCancelOperationsOptionalParams,
  VirtualMachineBulkOperationsBulkGetOperationsStatusOptionalParams,
  VirtualMachineBulkOperationsBulkDeleteOperationOptionalParams,
  VirtualMachineBulkOperationsBulkStartOperationOptionalParams,
  VirtualMachineBulkOperationsBulkHibernateOperationOptionalParams,
  VirtualMachineBulkOperationsBulkDeallocateOperationOptionalParams,
} from "../../api/virtualMachineBulkOperations/options.js";
import type {
  ExecuteDeallocateContent,
  DeallocateResourceOperationResponse,
  ExecuteHibernateContent,
  HibernateResourceOperationResponse,
  ExecuteStartContent,
  StartResourceOperationResponse,
  ExecuteDeleteContent,
  DeleteResourceOperationResponse,
  GetOperationStatusContent,
  GetOperationStatusResponse,
  CancelOperationsContent,
  CancelOperationsResponse,
} from "../../models/models.js";

/** Interface representing a VirtualMachineBulkOperations operations. */
export interface VirtualMachineBulkOperationsOperations {
  /** BulkCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request */
  bulkCancelOperations: (
    resourceGroupName: string,
    location: string,
    requestBody: CancelOperationsContent,
    options?: VirtualMachineBulkOperationsBulkCancelOperationsOptionalParams,
  ) => Promise<CancelOperationsResponse>;
  /** BulkGetOperationsStatus: Polling endpoint to read status of operations performed on virtual machines */
  bulkGetOperationsStatus: (
    resourceGroupName: string,
    location: string,
    requestBody: GetOperationStatusContent,
    options?: VirtualMachineBulkOperationsBulkGetOperationsStatusOptionalParams,
  ) => Promise<GetOperationStatusResponse>;
  /** BulkDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  bulkDeleteOperation: (
    resourceGroupName: string,
    location: string,
    requestBody: ExecuteDeleteContent,
    options?: VirtualMachineBulkOperationsBulkDeleteOperationOptionalParams,
  ) => Promise<DeleteResourceOperationResponse>;
  /** BulkStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  bulkStartOperation: (
    resourceGroupName: string,
    location: string,
    requestBody: ExecuteStartContent,
    options?: VirtualMachineBulkOperationsBulkStartOperationOptionalParams,
  ) => Promise<StartResourceOperationResponse>;
  /** BulkHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  bulkHibernateOperation: (
    resourceGroupName: string,
    location: string,
    requestBody: ExecuteHibernateContent,
    options?: VirtualMachineBulkOperationsBulkHibernateOperationOptionalParams,
  ) => Promise<HibernateResourceOperationResponse>;
  /** BulkDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  bulkDeallocateOperation: (
    resourceGroupName: string,
    location: string,
    requestBody: ExecuteDeallocateContent,
    options?: VirtualMachineBulkOperationsBulkDeallocateOperationOptionalParams,
  ) => Promise<DeallocateResourceOperationResponse>;
}

function _getVirtualMachineBulkOperations(context: ComputeContext) {
  return {
    bulkCancelOperations: (
      resourceGroupName: string,
      location: string,
      requestBody: CancelOperationsContent,
      options?: VirtualMachineBulkOperationsBulkCancelOperationsOptionalParams,
    ) => bulkCancelOperations(context, resourceGroupName, location, requestBody, options),
    bulkGetOperationsStatus: (
      resourceGroupName: string,
      location: string,
      requestBody: GetOperationStatusContent,
      options?: VirtualMachineBulkOperationsBulkGetOperationsStatusOptionalParams,
    ) => bulkGetOperationsStatus(context, resourceGroupName, location, requestBody, options),
    bulkDeleteOperation: (
      resourceGroupName: string,
      location: string,
      requestBody: ExecuteDeleteContent,
      options?: VirtualMachineBulkOperationsBulkDeleteOperationOptionalParams,
    ) => bulkDeleteOperation(context, resourceGroupName, location, requestBody, options),
    bulkStartOperation: (
      resourceGroupName: string,
      location: string,
      requestBody: ExecuteStartContent,
      options?: VirtualMachineBulkOperationsBulkStartOperationOptionalParams,
    ) => bulkStartOperation(context, resourceGroupName, location, requestBody, options),
    bulkHibernateOperation: (
      resourceGroupName: string,
      location: string,
      requestBody: ExecuteHibernateContent,
      options?: VirtualMachineBulkOperationsBulkHibernateOperationOptionalParams,
    ) => bulkHibernateOperation(context, resourceGroupName, location, requestBody, options),
    bulkDeallocateOperation: (
      resourceGroupName: string,
      location: string,
      requestBody: ExecuteDeallocateContent,
      options?: VirtualMachineBulkOperationsBulkDeallocateOperationOptionalParams,
    ) => bulkDeallocateOperation(context, resourceGroupName, location, requestBody, options),
  };
}

export function _getVirtualMachineBulkOperationsOperations(
  context: ComputeContext,
): VirtualMachineBulkOperationsOperations {
  return {
    ..._getVirtualMachineBulkOperations(context),
  };
}
