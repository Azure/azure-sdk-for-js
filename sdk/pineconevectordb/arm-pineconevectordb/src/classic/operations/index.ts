// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VectorDbContext } from "../../api/vectorDbContext.js";
import type { Operation } from "../../models/models.js";
import type { OperationsListOptionalParams } from "../../api/operations/options.js";
import { list } from "../../api/operations/operations.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: VectorDbContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: VectorDbContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
