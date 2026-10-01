// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataboundariesManegementContext } from "../../api/databoundariesManegementContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { Operation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: DataboundariesManegementContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: DataboundariesManegementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
