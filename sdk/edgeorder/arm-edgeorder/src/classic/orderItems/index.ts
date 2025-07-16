// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EdgeOrderContext } from "../../api/edgeOrderContext.js";
import {
  OrderItemResource,
  OrderItemUpdateParameter,
  CancellationReason,
  ReturnOrderItemDetails,
  OkResponse,
} from "../../models/models.js";
import {
  OrderItemsReturnOptionalParams,
  OrderItemsCancelOptionalParams,
  OrderItemsListBySubscriptionOptionalParams,
  OrderItemsListByResourceGroupOptionalParams,
  OrderItemsDeleteOptionalParams,
  OrderItemsUpdateOptionalParams,
  OrderItemsCreateOptionalParams,
  OrderItemsGetOptionalParams,
} from "../../api/orderItems/options.js";
import {
  $return,
  cancel,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/orderItems/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OrderItems operations. */
export interface OrderItemsOperations {
  /** Return order item. */
  /**
   *  @fixme Return is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  return: (
    resourceGroupName: string,
    orderItemName: string,
    returnOrderItemDetails: ReturnOrderItemDetails,
    options?: OrderItemsReturnOptionalParams,
  ) => PollerLike<OperationState<OkResponse>, OkResponse>;
  /** Cancel order item. */
  cancel: (
    resourceGroupName: string,
    orderItemName: string,
    cancellationReason: CancellationReason,
    options?: OrderItemsCancelOptionalParams,
  ) => Promise<void>;
  /** List order items at subscription level. */
  listBySubscription: (
    options?: OrderItemsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<OrderItemResource>;
  /** List order items at resource group level. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: OrderItemsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<OrderItemResource>;
  /** Delete an order item. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    orderItemName: string,
    options?: OrderItemsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the properties of an existing order item. */
  update: (
    resourceGroupName: string,
    orderItemName: string,
    orderItemUpdateParameter: OrderItemUpdateParameter,
    options?: OrderItemsUpdateOptionalParams,
  ) => PollerLike<OperationState<OrderItemResource>, OrderItemResource>;
  /**
   * Create an order item. Existing order item cannot be updated with this api and should instead be updated with the Update order item
   * API.
   */
  create: (
    resourceGroupName: string,
    orderItemName: string,
    orderItemResource: OrderItemResource,
    options?: OrderItemsCreateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get an order item. */
  get: (
    resourceGroupName: string,
    orderItemName: string,
    options?: OrderItemsGetOptionalParams,
  ) => Promise<OrderItemResource>;
}

function _getOrderItems(context: EdgeOrderContext) {
  return {
    return: (
      resourceGroupName: string,
      orderItemName: string,
      returnOrderItemDetails: ReturnOrderItemDetails,
      options?: OrderItemsReturnOptionalParams,
    ) => $return(context, resourceGroupName, orderItemName, returnOrderItemDetails, options),
    cancel: (
      resourceGroupName: string,
      orderItemName: string,
      cancellationReason: CancellationReason,
      options?: OrderItemsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, orderItemName, cancellationReason, options),
    listBySubscription: (options?: OrderItemsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: OrderItemsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      orderItemName: string,
      options?: OrderItemsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, orderItemName, options),
    update: (
      resourceGroupName: string,
      orderItemName: string,
      orderItemUpdateParameter: OrderItemUpdateParameter,
      options?: OrderItemsUpdateOptionalParams,
    ) => update(context, resourceGroupName, orderItemName, orderItemUpdateParameter, options),
    create: (
      resourceGroupName: string,
      orderItemName: string,
      orderItemResource: OrderItemResource,
      options?: OrderItemsCreateOptionalParams,
    ) => create(context, resourceGroupName, orderItemName, orderItemResource, options),
    get: (
      resourceGroupName: string,
      orderItemName: string,
      options?: OrderItemsGetOptionalParams,
    ) => get(context, resourceGroupName, orderItemName, options),
  };
}

export function _getOrderItemsOperations(context: EdgeOrderContext): OrderItemsOperations {
  return {
    ..._getOrderItems(context),
  };
}
