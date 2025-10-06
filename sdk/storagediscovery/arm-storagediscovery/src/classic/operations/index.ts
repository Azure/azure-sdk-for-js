// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageDiscoveryContext } from "../../api/storageDiscoveryContext.js";
import { list } from "../../api/operations/operations.js";
import type { OperationsListOptionalParams } from "../../api/operations/options.js";
import type { Operation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: StorageDiscoveryContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: StorageDiscoveryContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
