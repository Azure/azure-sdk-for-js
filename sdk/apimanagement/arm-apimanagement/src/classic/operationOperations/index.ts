// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByTags } from "../../api/operationOperations/operations.js";
import type { OperationOperationsListByTagsOptionalParams } from "../../api/operationOperations/options.js";
import type { TagResourceContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a OperationOperations operations. */
export interface OperationOperationsOperations {
  /** Lists a collection of operations associated with tags. */
  listByTags: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: OperationOperationsListByTagsOptionalParams,
  ) => PagedAsyncIterableIterator<TagResourceContract>;
}

function _getOperationOperations(context: ApiManagementContext) {
  return {
    listByTags: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: OperationOperationsListByTagsOptionalParams,
    ) => listByTags(context, resourceGroupName, serviceName, apiId, options),
  };
}

export function _getOperationOperationsOperations(
  context: ApiManagementContext,
): OperationOperationsOperations {
  return {
    ..._getOperationOperations(context),
  };
}
