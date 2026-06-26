// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import { list } from "../../api/apiManagementOperations/operations.js";
import { ApiManagementOperationsListOptionalParams } from "../../api/apiManagementOperations/options.js";
import { Operation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
