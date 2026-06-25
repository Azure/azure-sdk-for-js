// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceContext } from "../../api/containerServiceContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { OperationValue } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Gets a list of operations. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<OperationValue>;
}

function _getOperations(context: ContainerServiceContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: ContainerServiceContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
