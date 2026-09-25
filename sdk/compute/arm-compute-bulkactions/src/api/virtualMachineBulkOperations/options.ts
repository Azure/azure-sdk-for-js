// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VirtualMachineBulkOperationsBulkListOperationErrorsOptionalParams extends OperationOptions {
  /** The number of minutes before the current time to include when listing bulk action errors. */
  lookbackInMinutes?: number;
}

/** Optional parameters. */
export interface VirtualMachineBulkOperationsBulkReimageOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineBulkOperationsBulkCancelOperationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineBulkOperationsBulkGetOperationsStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineBulkOperationsBulkDeleteOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineBulkOperationsBulkStartOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineBulkOperationsBulkHibernateOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface VirtualMachineBulkOperationsBulkDeallocateOperationOptionalParams extends OperationOptions {}
