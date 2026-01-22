// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import { list } from "../../api/operations/operations.js";
import type { OperationsListOptionalParams } from "../../api/operations/options.js";
import type { OperationDefinition } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<OperationDefinition>;
}

function _getOperations(context: ContainerRegistryManagementContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: ContainerRegistryManagementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
