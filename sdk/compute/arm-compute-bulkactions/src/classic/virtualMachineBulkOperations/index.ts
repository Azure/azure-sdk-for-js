// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext } from "../../api/computeContext.js";
import {
  bulkAcknowledgeOperationErrors,
  bulkListOperationErrors,
  bulkReimageOperation,
  bulkCancelOperations,
  bulkGetOperationsStatus,
  bulkDeleteOperation,
  bulkVdiFlexCreateOperation,
  bulkCreateOperation,
  bulkStartOperation,
  bulkHibernateOperation,
  bulkDeallocateOperation,
} from "../../api/virtualMachineBulkOperations/operations.js";
import type {
  VirtualMachineBulkOperationsBulkAcknowledgeOperationErrorsOptionalParams,
  VirtualMachineBulkOperationsBulkListOperationErrorsOptionalParams,
  VirtualMachineBulkOperationsBulkReimageOperationOptionalParams,
  VirtualMachineBulkOperationsBulkCancelOperationsOptionalParams,
  VirtualMachineBulkOperationsBulkGetOperationsStatusOptionalParams,
  VirtualMachineBulkOperationsBulkDeleteOperationOptionalParams,
  VirtualMachineBulkOperationsBulkVdiFlexCreateOperationOptionalParams,
  VirtualMachineBulkOperationsBulkCreateOperationOptionalParams,
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
  ExecuteCreateContent,
  CreateResourceOperationResponse,
  ExecuteVdiCreateRequest,
  ExecuteDeleteContent,
  DeleteResourceOperationResponse,
  GetOperationStatusContent,
  GetOperationStatusResponse,
  CancelOperationsContent,
  CancelOperationsResponse,
  ExecuteReimageRequest,
  ReimageResourceOperationResponse,
  AcknowledgeBulkOperationErrorsRequest,
  AcknowledgeBulkOperationErrorsResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VirtualMachineBulkOperations operations. */
export interface VirtualMachineBulkOperationsOperations {
  /** BulkAcknowledgeOperationErrors: Acknowledge bulk operation errors for a resource group */
  bulkAcknowledgeOperationErrors: (
    resourceGroupName: string,
    location: string,
    body: AcknowledgeBulkOperationErrorsRequest,
    options?: VirtualMachineBulkOperationsBulkAcknowledgeOperationErrorsOptionalParams,
  ) => Promise<AcknowledgeBulkOperationErrorsResponse>;
  /** BulkListOperationErrors: List bulk operation errors for a resource group */
  bulkListOperationErrors: (
    resourceGroupName: string,
    location: string,
    options?: VirtualMachineBulkOperationsBulkListOperationErrorsOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceOperation>;
  /** BulkReimage: Execute reimage operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  bulkReimageOperation: (
    resourceGroupName: string,
    location: string,
    requestBody: ExecuteReimageRequest,
    options?: VirtualMachineBulkOperationsBulkReimageOperationOptionalParams,
  ) => Promise<ReimageResourceOperationResponse>;
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
  /** BulkVdiFlexCreate: Bulk create  operation for a batch of virtual machines, this operation supports flex properties to give options on Sku and zone selection. */
  bulkVdiFlexCreateOperation: (
    resourceGroupName: string,
    location: string,
    requestBody: ExecuteVdiCreateRequest,
    options?: VirtualMachineBulkOperationsBulkVdiFlexCreateOperationOptionalParams,
  ) => Promise<CreateResourceOperationResponse>;
  /** BulkCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. */
  bulkCreateOperation: (
    resourceGroupName: string,
    location: string,
    requestBody: ExecuteCreateContent,
    options?: VirtualMachineBulkOperationsBulkCreateOperationOptionalParams,
  ) => Promise<CreateResourceOperationResponse>;
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
    bulkAcknowledgeOperationErrors: (
      resourceGroupName: string,
      location: string,
      body: AcknowledgeBulkOperationErrorsRequest,
      options?: VirtualMachineBulkOperationsBulkAcknowledgeOperationErrorsOptionalParams,
    ) => bulkAcknowledgeOperationErrors(context, resourceGroupName, location, body, options),
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
    bulkVdiFlexCreateOperation: (
      resourceGroupName: string,
      location: string,
      requestBody: ExecuteVdiCreateRequest,
      options?: VirtualMachineBulkOperationsBulkVdiFlexCreateOperationOptionalParams,
    ) => bulkVdiFlexCreateOperation(context, resourceGroupName, location, requestBody, options),
    bulkCreateOperation: (
      resourceGroupName: string,
      location: string,
      requestBody: ExecuteCreateContent,
      options?: VirtualMachineBulkOperationsBulkCreateOperationOptionalParams,
    ) => bulkCreateOperation(context, resourceGroupName, location, requestBody, options),
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
