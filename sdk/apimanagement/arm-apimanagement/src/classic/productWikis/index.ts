// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { list } from "../../api/productWikis/operations.js";
import type { ProductWikisListOptionalParams } from "../../api/productWikis/options.js";
import type { WikiContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProductWikis operations. */
export interface ProductWikisOperations {
  /** Gets the details of the Wiki for a Product specified by its identifier. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    options?: ProductWikisListOptionalParams,
  ) => PagedAsyncIterableIterator<WikiContract>;
}

function _getProductWikis(context: ApiManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      options?: ProductWikisListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, productId, options),
  };
}

export function _getProductWikisOperations(context: ApiManagementContext): ProductWikisOperations {
  return {
    ..._getProductWikis(context),
  };
}
