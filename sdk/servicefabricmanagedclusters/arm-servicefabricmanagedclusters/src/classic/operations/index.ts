// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricContext } from "../../api/serviceFabricContext.js";
import { OperationResult } from "../../models/models.js";
import { OperationsListOptionalParams } from "../../api/operations/options.js";
import { list } from "../../api/operations/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Get the list of available Service Fabric resource provider API operations. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<OperationResult>;
}

function _getOperations(context: ServiceFabricContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(context: ServiceFabricContext): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
