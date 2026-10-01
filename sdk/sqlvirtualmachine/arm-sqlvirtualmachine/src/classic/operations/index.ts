// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlVirtualMachineManagementContext } from "../../api/sqlVirtualMachineManagementContext.js";
import { list } from "../../api/operations/operations.js";
import type { OperationsListOptionalParams } from "../../api/operations/options.js";
import type { Operation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Lists all of the available SQL Virtual Machine Rest API operations. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: SqlVirtualMachineManagementContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: SqlVirtualMachineManagementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
