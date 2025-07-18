// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageContext } from "../../api/storageContext.js";
import { Operation } from "../../models/models.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { list } from "../../api/operations/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (
    options?: OperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: StorageContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: StorageContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
