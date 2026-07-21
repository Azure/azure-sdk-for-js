// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByApis } from "../../api/apiProduct/operations.js";
import type { ApiProductListByApisOptionalParams } from "../../api/apiProduct/options.js";
import type { ProductContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ApiProduct operations. */
export interface ApiProductOperations {
  /** Lists all Products, which the API is part of. */
  listByApis: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: ApiProductListByApisOptionalParams,
  ) => PagedAsyncIterableIterator<ProductContract>;
}

function _getApiProduct(context: ApiManagementContext) {
  return {
    listByApis: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: ApiProductListByApisOptionalParams,
    ) => listByApis(context, resourceGroupName, serviceName, apiId, options),
  };
}

export function _getApiProductOperations(context: ApiManagementContext): ApiProductOperations {
  return {
    ..._getApiProduct(context),
  };
}
