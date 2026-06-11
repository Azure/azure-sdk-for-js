// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BulkActionsVirtualMachinesCancelOperationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkActionsVirtualMachinesGetOperationStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkActionsVirtualMachinesExecuteDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkActionsVirtualMachinesExecuteCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkActionsVirtualMachinesExecuteStartOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkActionsVirtualMachinesExecuteHibernateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkActionsVirtualMachinesExecuteDeallocateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkActionsListVirtualMachinesOptionalParams extends OperationOptions {
  /** Filter expression to filter the virtual machines. */
  filter?: string;
  /** Skip token for pagination. Uses the token from a previous response to fetch the next page of results. */
  skiptoken?: string;
}

/** Optional parameters. */
export interface BulkActionsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkActionsListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkActionsCancelOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BulkActionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** When true, deletes all virtual machines created by this BulkAction Operation. */
  deleteInstances?: boolean;
}

/** Optional parameters. */
export interface BulkActionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface BulkActionsGetOperationStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BulkActionsGetOptionalParams extends OperationOptions {}
