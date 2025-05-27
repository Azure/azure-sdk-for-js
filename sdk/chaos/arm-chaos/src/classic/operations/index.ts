// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { Operation } from "../../models/models.js";
import { OperationsListAllOptionalParams } from "../../api/operations/options.js";
import { listAll } from "../../api/operations/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  listAll: (options?: OperationsListAllOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: ChaosManagementContext) {
  return {
    listAll: (options?: OperationsListAllOptionalParams) => listAll(context, options),
  };
}

export function _getOperationsOperations(context: ChaosManagementContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
