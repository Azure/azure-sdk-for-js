// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import {
  listDCAccessCode,
  listByDataBoxEdgeDevice,
  $delete,
  createOrUpdate,
  get,
} from "../../api/orders/operations.js";
import {
  OrdersListDCAccessCodeOptionalParams,
  OrdersListByDataBoxEdgeDeviceOptionalParams,
  OrdersDeleteOptionalParams,
  OrdersCreateOrUpdateOptionalParams,
  OrdersGetOptionalParams,
} from "../../api/orders/options.js";
import { Order, DCAccessCode } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Orders operations. */
export interface OrdersOperations {
  /** Gets the DCAccess Code */
  listDCAccessCode: (
    deviceName: string,
    resourceGroupName: string,
    options?: OrdersListDCAccessCodeOptionalParams,
  ) => Promise<DCAccessCode>;
  /** Lists all the orders related to a Data Box Edge/Data Box Gateway device. */
  listByDataBoxEdgeDevice: (
    deviceName: string,
    resourceGroupName: string,
    options?: OrdersListByDataBoxEdgeDeviceOptionalParams,
  ) => PagedAsyncIterableIterator<Order>;
  /** Deletes the order related to the device. */
  delete: (
    deviceName: string,
    resourceGroupName: string,
    options?: OrdersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    deviceName: string,
    resourceGroupName: string,
    options?: OrdersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    deviceName: string,
    resourceGroupName: string,
    options?: OrdersDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an order. */
  createOrUpdate: (
    deviceName: string,
    resourceGroupName: string,
    order: Order,
    options?: OrdersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Order>, Order>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    deviceName: string,
    resourceGroupName: string,
    order: Order,
    options?: OrdersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Order>, Order>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    deviceName: string,
    resourceGroupName: string,
    order: Order,
    options?: OrdersCreateOrUpdateOptionalParams,
  ) => Promise<Order>;
  /** Gets a specific order by name. */
  get: (
    deviceName: string,
    resourceGroupName: string,
    options?: OrdersGetOptionalParams,
  ) => Promise<Order>;
}

function _getOrders(context: DataBoxEdgeManagementContext) {
  return {
    listDCAccessCode: (
      deviceName: string,
      resourceGroupName: string,
      options?: OrdersListDCAccessCodeOptionalParams,
    ) => listDCAccessCode(context, deviceName, resourceGroupName, options),
    listByDataBoxEdgeDevice: (
      deviceName: string,
      resourceGroupName: string,
      options?: OrdersListByDataBoxEdgeDeviceOptionalParams,
    ) => listByDataBoxEdgeDevice(context, deviceName, resourceGroupName, options),
    delete: (deviceName: string, resourceGroupName: string, options?: OrdersDeleteOptionalParams) =>
      $delete(context, deviceName, resourceGroupName, options),
    beginDelete: async (
      deviceName: string,
      resourceGroupName: string,
      options?: OrdersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, deviceName, resourceGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      deviceName: string,
      resourceGroupName: string,
      options?: OrdersDeleteOptionalParams,
    ) => {
      return await $delete(context, deviceName, resourceGroupName, options);
    },
    createOrUpdate: (
      deviceName: string,
      resourceGroupName: string,
      order: Order,
      options?: OrdersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, deviceName, resourceGroupName, order, options),
    beginCreateOrUpdate: async (
      deviceName: string,
      resourceGroupName: string,
      order: Order,
      options?: OrdersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, deviceName, resourceGroupName, order, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      deviceName: string,
      resourceGroupName: string,
      order: Order,
      options?: OrdersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, deviceName, resourceGroupName, order, options);
    },
    get: (deviceName: string, resourceGroupName: string, options?: OrdersGetOptionalParams) =>
      get(context, deviceName, resourceGroupName, options),
  };
}

export function _getOrdersOperations(context: DataBoxEdgeManagementContext): OrdersOperations {
  return {
    ..._getOrders(context),
  };
}
