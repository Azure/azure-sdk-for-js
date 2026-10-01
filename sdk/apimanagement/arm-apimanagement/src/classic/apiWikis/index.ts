// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { list } from "../../api/apiWikis/operations.js";
import type { ApiWikisListOptionalParams } from "../../api/apiWikis/options.js";
import type { WikiContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiWikis operations. */
export interface ApiWikisOperations {
  /** Gets the wikis for an API specified by its identifier. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiWikisListOptionalParams,
  ) => PagedAsyncIterableIterator<WikiContract>;
}

function _getApiWikis(context: ApiManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiWikisListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, apiId, options),
  };
}

export function _getApiWikisOperations(context: ApiManagementContext): ApiWikisOperations {
  return {
    ..._getApiWikis(context),
  };
}
