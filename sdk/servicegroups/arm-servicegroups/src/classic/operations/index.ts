// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceGroupsManagementContext } from "../../api/serviceGroupsManagementContext.js";
import { list } from "../../api/operations/operations.js";
import type { OperationsListOptionalParams } from "../../api/operations/options.js";
import type { Operation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** Lists all available REST API operations for the Microsoft.Management resource provider. */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: ServiceGroupsManagementContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: ServiceGroupsManagementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
