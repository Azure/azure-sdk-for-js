// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OrderItemsReturnOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OrderItemsCancelOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface OrderItemsListBySubscriptionOptionalParams extends OperationOptions {
  /** $filter is supported to filter based on order id and order Item Type. Filter supports only equals operation. */
  filter?: string;
  /** $expand is supported on parent device details, device details, forward shipping details and reverse shipping details parameters. Each of these can be provided as a comma separated list. Parent Device Details for order item provides details on the devices of the product, Device Details for order item provides details on the devices of the child configurations of the product, Forward and Reverse Shipping details provide forward and reverse shipping details respectively. */
  expand?: string;
  /** $skipToken is supported on Get list of order items, which provides the next page in the list of order items. */
  skipToken?: string;
  /** $top is supported on fetching list of resources. $top=10 means that the first 10 items in the list will be returned to the API caller. */
  top?: number;
}

/** Optional parameters. */
export interface OrderItemsListByResourceGroupOptionalParams extends OperationOptions {
  /** $filter is supported to filter based on order id and order Item Type. Filter supports only equals operation. */
  filter?: string;
  /** $expand is supported on parent device details, device details, forward shipping details and reverse shipping details parameters. Each of these can be provided as a comma separated list. Parent Device Details for order item provides details on the devices of the product, Device Details for order item provides details on the devices of the child configurations of the product, Forward and Reverse Shipping details provide forward and reverse shipping details respectively. */
  expand?: string;
  /** $skipToken is supported on Get list of order items, which provides the next page in the list of order items. */
  skipToken?: string;
  /** $top is supported on fetching list of resources. $top=10 means that the first 10 items in the list will be returned to the API caller. */
  top?: number;
}

/** Optional parameters. */
export interface OrderItemsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OrderItemsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Defines the If-Match condition. The patch will be performed only if the ETag of the order on the server matches this value. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface OrderItemsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface OrderItemsGetOptionalParams extends OperationOptions {
  /** $expand is supported on parent device details, device details, forward shipping details and reverse shipping details parameters. Each of these can be provided as a comma separated list. Parent Device Details for order item provides details on the devices of the product, Device Details for order item provides details on the devices of the child configurations of the product, Forward and Reverse Shipping details provide forward and reverse shipping details respectively. */
  expand?: string;
}
