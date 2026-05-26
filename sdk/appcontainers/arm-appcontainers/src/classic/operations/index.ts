// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { OperationDetail } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Lists all of the available RP operations. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<OperationDetail>;
}

function _getOperations(context: ContainerAppsAPIContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: ContainerAppsAPIContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
