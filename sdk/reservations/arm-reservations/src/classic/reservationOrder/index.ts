// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureReservationAPIContext } from "../../api/azureReservationAPIContext.js";
import {
  calculate,
  changeDirectory,
  list,
  purchase,
  get,
} from "../../api/reservationOrder/operations.js";
import type {
  ReservationOrderCalculateOptionalParams,
  ReservationOrderChangeDirectoryOptionalParams,
  ReservationOrderListOptionalParams,
  ReservationOrderPurchaseOptionalParams,
  ReservationOrderGetOptionalParams,
} from "../../api/reservationOrder/options.js";
import type {
  PurchaseRequest,
  ReservationOrderResponse,
  ChangeDirectoryRequest,
  ChangeDirectoryResponse,
  CalculatePriceResponse,
} from "../../models/reservations/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReservationOrder operations. */
export interface ReservationOrderOperations {
  /** Calculate price for placing a `ReservationOrder`. */
  calculate: (
    body: PurchaseRequest,
    options?: ReservationOrderCalculateOptionalParams,
  ) => Promise<CalculatePriceResponse>;
  /** Change directory (tenant) of `ReservationOrder` and all `Reservation` under it to specified tenant id */
  changeDirectory: (
    reservationOrderId: string,
    body: ChangeDirectoryRequest,
    options?: ReservationOrderChangeDirectoryOptionalParams,
  ) => Promise<ChangeDirectoryResponse>;
  /** List of all the `ReservationOrder`s that the user has access to in the current tenant. */
  list: (
    options?: ReservationOrderListOptionalParams,
  ) => PagedAsyncIterableIterator<ReservationOrderResponse>;
  /** Purchase `ReservationOrder` and create resource under the specified URI. */
  purchase: (
    reservationOrderId: string,
    body: PurchaseRequest,
    options?: ReservationOrderPurchaseOptionalParams,
  ) => PollerLike<OperationState<ReservationOrderResponse>, ReservationOrderResponse>;
  /** @deprecated use purchase instead */
  beginPurchase: (
    reservationOrderId: string,
    body: PurchaseRequest,
    options?: ReservationOrderPurchaseOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ReservationOrderResponse>, ReservationOrderResponse>
  >;
  /** @deprecated use purchase instead */
  beginPurchaseAndWait: (
    reservationOrderId: string,
    body: PurchaseRequest,
    options?: ReservationOrderPurchaseOptionalParams,
  ) => Promise<ReservationOrderResponse>;
  /** Get the details of the `ReservationOrder`. */
  get: (
    reservationOrderId: string,
    options?: ReservationOrderGetOptionalParams,
  ) => Promise<ReservationOrderResponse>;
}

function _getReservationOrder(context: AzureReservationAPIContext) {
  return {
    calculate: (body: PurchaseRequest, options?: ReservationOrderCalculateOptionalParams) =>
      calculate(context, body, options),
    changeDirectory: (
      reservationOrderId: string,
      body: ChangeDirectoryRequest,
      options?: ReservationOrderChangeDirectoryOptionalParams,
    ) => changeDirectory(context, reservationOrderId, body, options),
    list: (options?: ReservationOrderListOptionalParams) => list(context, options),
    purchase: (
      reservationOrderId: string,
      body: PurchaseRequest,
      options?: ReservationOrderPurchaseOptionalParams,
    ) => purchase(context, reservationOrderId, body, options),
    beginPurchase: async (
      reservationOrderId: string,
      body: PurchaseRequest,
      options?: ReservationOrderPurchaseOptionalParams,
    ) => {
      const poller = purchase(context, reservationOrderId, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPurchaseAndWait: async (
      reservationOrderId: string,
      body: PurchaseRequest,
      options?: ReservationOrderPurchaseOptionalParams,
    ) => {
      return await purchase(context, reservationOrderId, body, options);
    },
    get: (reservationOrderId: string, options?: ReservationOrderGetOptionalParams) =>
      get(context, reservationOrderId, options),
  };
}

export function _getReservationOrderOperations(
  context: AzureReservationAPIContext,
): ReservationOrderOperations {
  return {
    ..._getReservationOrder(context),
  };
}
