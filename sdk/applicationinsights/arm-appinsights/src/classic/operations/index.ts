// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApplicationInsightsManagementContext } from "../../api/applicationInsightsManagementContext.js";
import { list } from "../../api/operations/operations.js";
import type { OperationsListOptionalParams } from "../../api/operations/options.js";
import type { Operation } from "../../models/workBookOperations/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operations operations. */
export interface OperationsOperations {
  /** List the operations for the provider */
  list: (options?: OperationsListOptionalParams) => PagedAsyncIterableIterator<Operation>;
}

function _getOperations(context: ApplicationInsightsManagementContext) {
  return {
    list: (options?: OperationsListOptionalParams) => list(context, options),
  };
}

export function _getOperationsOperations(
  context: ApplicationInsightsManagementContext,
): OperationsOperations {
  return {
    ..._getOperations(context),
  };
}
