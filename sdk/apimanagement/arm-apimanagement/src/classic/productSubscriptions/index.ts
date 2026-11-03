// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { list } from "../../api/productSubscriptions/operations.js";
import type { ProductSubscriptionsListOptionalParams } from "../../api/productSubscriptions/options.js";
import type { SubscriptionContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProductSubscriptions operations. */
export interface ProductSubscriptionsOperations {
  /** Lists the collection of subscriptions to the specified product. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    productId: string,
    options?: ProductSubscriptionsListOptionalParams,
  ) => PagedAsyncIterableIterator<SubscriptionContract>;
}

function _getProductSubscriptions(context: ApiManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      serviceName: string,
      productId: string,
      options?: ProductSubscriptionsListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, productId, options),
  };
}

export function _getProductSubscriptionsOperations(
  context: ApiManagementContext,
): ProductSubscriptionsOperations {
  return {
    ..._getProductSubscriptions(context),
  };
}
