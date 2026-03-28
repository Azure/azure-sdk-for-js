// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByTags } from "../../api/operation/operations.js";
import type { OperationListByTagsOptionalParams } from "../../api/operation/options.js";
import type { TagResourceContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Operation operations. */
export interface OperationOperations {
  /** Lists a collection of operations associated with tags. */
  listByTags: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: OperationListByTagsOptionalParams,
  ) => PagedAsyncIterableIterator<TagResourceContract>;
}

function _getOperation(context: ApiManagementContext) {
  return {
    listByTags: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: OperationListByTagsOptionalParams,
    ) => listByTags(context, resourceGroupName, serviceName, apiId, options),
  };
}

export function _getOperationOperations(context: ApiManagementContext): OperationOperations {
  return {
    ..._getOperation(context),
  };
}
