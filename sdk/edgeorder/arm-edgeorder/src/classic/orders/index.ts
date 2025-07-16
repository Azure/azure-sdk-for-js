// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeOrderContext } from "../../api/edgeOrderContext.js";
import { OrderResource } from "../../models/models.js";
import {
  OrdersListByResourceGroupOptionalParams,
  OrdersListBySubscriptionOptionalParams,
  OrdersGetOptionalParams,
} from "../../api/orders/options.js";
import { listByResourceGroup, listBySubscription, get } from "../../api/orders/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Orders operations. */
export interface OrdersOperations {
  /** List orders at resource group level. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: OrdersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<OrderResource>;
  /** List orders at subscription level. */
  listBySubscription: (
    options?: OrdersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<OrderResource>;
  /** Get an order. */
  get: (
    resourceGroupName: string,
    location: string,
    orderName: string,
    options?: OrdersGetOptionalParams,
  ) => Promise<OrderResource>;
}

function _getOrders(context: EdgeOrderContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: OrdersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    listBySubscription: (options?: OrdersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    get: (
      resourceGroupName: string,
      location: string,
      orderName: string,
      options?: OrdersGetOptionalParams,
    ) => get(context, resourceGroupName, location, orderName, options),
  };
}

export function _getOrdersOperations(context: EdgeOrderContext): OrdersOperations {
  return {
    ..._getOrders(context),
  };
}
