// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { list } from "../../api/apiManagementOperations/operations.js";
import type { ApiManagementOperationsListOptionalParams } from "../../api/apiManagementOperations/options.js";
import type { Operation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiManagementOperations operations. */
export interface ApiManagementOperationsOperations {
  /** Lists all of the available REST API operations of the Microsoft.ApiManagement provider. */
  list: (
    options?: ApiManagementOperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Operation>;
}

function _getApiManagementOperations(context: ApiManagementContext) {
  return {
    list: (options?: ApiManagementOperationsListOptionalParams) => list(context, options),
  };
}

export function _getApiManagementOperationsOperations(
  context: ApiManagementContext,
): ApiManagementOperationsOperations {
  return {
    ..._getApiManagementOperations(context),
  };
}
