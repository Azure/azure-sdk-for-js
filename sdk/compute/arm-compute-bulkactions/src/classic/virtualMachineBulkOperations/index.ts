// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  bulkListOperationErrors,
  bulkReimageOperation,
  bulkCancelOperations,
  bulkGetOperationsStatus,
  bulkDeleteOperation,
  bulkStartOperation,
  bulkHibernateOperation,
  bulkDeallocateOperation,
} from "../../api/virtualMachineBulkOperations/operations.js";
import type {
  VirtualMachineBulkOperationsBulkListOperationErrorsOptionalParams,
  VirtualMachineBulkOperationsBulkReimageOperationOptionalParams,
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
  ResourceOperation,
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
  ExecuteReimageRequest,
  ReimageResourceOperationResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VirtualMachineBulkOperations operations. */
export interface VirtualMachineBulkOperationsOperations {
  /** List recent errors for operations in a resource group. */
  bulkListOperationErrors: (
    resourceGroupName: string,
    location: string,
    options?: VirtualMachineBulkOperationsBulkListOperationErrorsOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceOperation>;
  /**
   * This feature is currently in preview.
   *
   * Reimage one or more virtual machines. Reimaging is destructive and can replace operating system disk contents. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates.
   */
  bulkReimageOperation: (
    resourceGroupName: string,
    location: string,
    requestBody: ExecuteReimageRequest,
    options?: VirtualMachineBulkOperationsBulkReimageOperationOptionalParams,
  ) => Promise<ReimageResourceOperationResponse>;
  /** Cancel one or more Bulk Actions operations by Bulk Action Operation Ids. Cancellation is best effort and work that has already completed is not reversed. */
  bulkCancelOperations: (
    resourceGroupName: string,
    location: string,
    requestBody: CancelOperationsContent,
    options?: VirtualMachineBulkOperationsBulkCancelOperationsOptionalParams,
  ) => Promise<CancelOperationsResponse>;
  /** Get the current status of one or more operations identified by their Bulk Action Operation Ids. */
  bulkGetOperationsStatus: (
    resourceGroupName: string,
    location: string,
    requestBody: GetOperationStatusContent,
    options?: VirtualMachineBulkOperationsBulkGetOperationsStatusOptionalParams,
  ) => Promise<GetOperationStatusResponse>;
  /** Delete one or more virtual machines. This operation is destructive. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. */
  bulkDeleteOperation: (
    resourceGroupName: string,
    location: string,
    requestBody: ExecuteDeleteContent,
    options?: VirtualMachineBulkOperationsBulkDeleteOperationOptionalParams,
  ) => Promise<DeleteResourceOperationResponse>;
  /** Start one or more virtual machines. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. */
  bulkStartOperation: (
    resourceGroupName: string,
    location: string,
    requestBody: ExecuteStartContent,
    options?: VirtualMachineBulkOperationsBulkStartOperationOptionalParams,
  ) => Promise<StartResourceOperationResponse>;
  /** Hibernate one or more virtual machines that support hibernation. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. */
  bulkHibernateOperation: (
    resourceGroupName: string,
    location: string,
    requestBody: ExecuteHibernateContent,
    options?: VirtualMachineBulkOperationsBulkHibernateOperationOptionalParams,
  ) => Promise<HibernateResourceOperationResponse>;
  /** Deallocate one or more virtual machines. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. */
  bulkDeallocateOperation: (
    resourceGroupName: string,
    location: string,
    requestBody: ExecuteDeallocateContent,
    options?: VirtualMachineBulkOperationsBulkDeallocateOperationOptionalParams,
  ) => Promise<DeallocateResourceOperationResponse>;
}

function _getVirtualMachineBulkOperations(context: ComputeContext) {
  return {
    bulkListOperationErrors: (
      resourceGroupName: string,
      location: string,
      options?: VirtualMachineBulkOperationsBulkListOperationErrorsOptionalParams,
    ) => bulkListOperationErrors(context, resourceGroupName, location, options),
    bulkReimageOperation: (
      resourceGroupName: string,
      location: string,
      requestBody: ExecuteReimageRequest,
      options?: VirtualMachineBulkOperationsBulkReimageOperationOptionalParams,
    ) => bulkReimageOperation(context, resourceGroupName, location, requestBody, options),
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
