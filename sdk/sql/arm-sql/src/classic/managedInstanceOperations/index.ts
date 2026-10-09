// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  cancel,
  listByManagedInstance,
  get,
} from "../../api/managedInstanceOperations/operations.js";
import type {
  ManagedInstanceOperationsCancelOptionalParams,
  ManagedInstanceOperationsListByManagedInstanceOptionalParams,
  ManagedInstanceOperationsGetOptionalParams,
} from "../../api/managedInstanceOperations/options.js";
import type { ManagedInstanceOperation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedInstanceOperations operations. */
export interface ManagedInstanceOperationsOperations {
  /** Cancels the asynchronous operation on the managed instance. */
  cancel: (
    resourceGroupName: string,
    managedInstanceName: string,
    operationId: string,
    options?: ManagedInstanceOperationsCancelOptionalParams,
  ) => Promise<void>;
  /** Gets a list of operations performed on the managed instance. */
  listByManagedInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstanceOperationsListByManagedInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstanceOperation>;
  /** Gets a management operation on a managed instance. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    operationId: string,
    options?: ManagedInstanceOperationsGetOptionalParams,
  ) => Promise<ManagedInstanceOperation>;
}

function _getManagedInstanceOperations(context: SqlManagementContext) {
  return {
    cancel: (
      resourceGroupName: string,
      managedInstanceName: string,
      operationId: string,
      options?: ManagedInstanceOperationsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, managedInstanceName, operationId, options),
    listByManagedInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstanceOperationsListByManagedInstanceOptionalParams,
    ) => listByManagedInstance(context, resourceGroupName, managedInstanceName, options),
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      operationId: string,
      options?: ManagedInstanceOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, operationId, options),
  };
}

export function _getManagedInstanceOperationsOperations(
  context: SqlManagementContext,
): ManagedInstanceOperationsOperations {
  return {
    ..._getManagedInstanceOperations(context),
  };
}
