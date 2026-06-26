// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureBotServiceContext } from "../../api/azureBotServiceContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { OperationEntity } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<OperationEntity>;
}

function _getOperations(context: AzureBotServiceContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: AzureBotServiceContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
