// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeZonesContext } from "../../api/edgeZonesContext.js";
import { list, OperationsListOptionalParams } from "../../api/operations/index.js";
import { Operation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: EdgeZonesContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: EdgeZonesContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
