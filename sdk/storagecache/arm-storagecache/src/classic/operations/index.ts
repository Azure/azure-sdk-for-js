// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementContext } from "../../api/storageCacheManagementContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { ApiOperation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Lists all of the available Resource Provider operations. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<ApiOperation>;
}

function _getOperations(context: StorageCacheManagementContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: StorageCacheManagementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
