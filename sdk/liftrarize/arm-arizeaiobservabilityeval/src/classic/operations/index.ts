// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ObservabilityEvalContext } from "../../api/observabilityEvalContext.js";
import type { Operation } from "../../models/models.js";
import type { OperationsListOptionalParams } from "../../api/operations/options.js";
import { list } from "../../api/operations/operations.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: ObservabilityEvalContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: ObservabilityEvalContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
