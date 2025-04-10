// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskContext } from "../../api/durableTaskContext.js";
import { Operation } from "../../models/models.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { list } from "../../api/operations/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: DurableTaskContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: DurableTaskContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
