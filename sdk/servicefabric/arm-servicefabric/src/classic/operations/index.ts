// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagementContext } from "../../api/serviceFabricManagementContext.js";
import { list } from "../../api/operations/operations.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { OperationResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Get the list of available Service Fabric resource provider API operations. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<OperationResult>;
}

function _getOperations(context: ServiceFabricManagementContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: ServiceFabricManagementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
