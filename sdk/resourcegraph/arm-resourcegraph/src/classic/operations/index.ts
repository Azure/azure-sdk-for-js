// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceGraphContext } from "../../api/resourceGraphContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { Operation } from "../../models/resourceGraphApi/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: ResourceGraphContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: ResourceGraphContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
