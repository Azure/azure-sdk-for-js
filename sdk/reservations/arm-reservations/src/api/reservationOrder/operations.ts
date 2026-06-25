// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPIContext as Client } from "../index.js";
import {
  errorDeserializer,
  PurchaseRequest,
  purchaseRequestSerializer,
  ReservationOrderResponse,
  reservationOrderResponseDeserializer,
  _ReservationOrderList,
  _reservationOrderListDeserializer,
  ChangeDirectoryRequest,
  changeDirectoryRequestSerializer,
  ChangeDirectoryResponse,
  changeDirectoryResponseDeserializer,
  CalculatePriceResponse,
  calculatePriceResponseDeserializer,
} from "../../models/reservations/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ReservationOrderCalculateOptionalParams,
  ReservationOrderChangeDirectoryOptionalParams,
  ReservationOrderListOptionalParams,
  ReservationOrderPurchaseOptionalParams,
  ReservationOrderGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _calculateSend(
  context: Client,
  body: PurchaseRequest,
  options: ReservationOrderCalculateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/calculatePrice{?api%2Dversion}",
    {
      "api%2Dversion": "2022-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: purchaseRequestSerializer(body),
    });
}

export async function _calculateDeserialize(
  result: PathUncheckedResponse,
): Promise<CalculatePriceResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return calculatePriceResponseDeserializer(result.body);
}

/** Calculate price for placing a `ReservationOrder`. */
export async function calculate(
  context: Client,
  body: PurchaseRequest,
  options: ReservationOrderCalculateOptionalParams = { requestOptions: {} },
): Promise<CalculatePriceResponse> {
  const result = await _calculateSend(context, body, options);
  return _calculateDeserialize(result);
}

export function _changeDirectorySend(
  context: Client,
  reservationOrderId: string,
  body: ChangeDirectoryRequest,
  options: ReservationOrderChangeDirectoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}/changeDirectory{?api%2Dversion}",
    {
      reservationOrderId: reservationOrderId,
      "api%2Dversion": "2022-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: changeDirectoryRequestSerializer(body),
    });
}

export async function _changeDirectoryDeserialize(
  result: PathUncheckedResponse,
): Promise<ChangeDirectoryResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return changeDirectoryResponseDeserializer(result.body);
}

/** Change directory (tenant) of `ReservationOrder` and all `Reservation` under it to specified tenant id */
export async function changeDirectory(
  context: Client,
  reservationOrderId: string,
  body: ChangeDirectoryRequest,
  options: ReservationOrderChangeDirectoryOptionalParams = { requestOptions: {} },
): Promise<ChangeDirectoryResponse> {
  const result = await _changeDirectorySend(context, reservationOrderId, body, options);
  return _changeDirectoryDeserialize(result);
}

export function _listSend(
  context: Client,
  options: ReservationOrderListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders{?api%2Dversion}",
    {
      "api%2Dversion": "2022-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReservationOrderList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return _reservationOrderListDeserializer(result.body);
}

/** List of all the `ReservationOrder`s that the user has access to in the current tenant. */
export function list(
  context: Client,
  options: ReservationOrderListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReservationOrderResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-11-01" },
  );
}

export function _purchaseSend(
  context: Client,
  reservationOrderId: string,
  body: PurchaseRequest,
  options: ReservationOrderPurchaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}{?api%2Dversion}",
    {
      reservationOrderId: reservationOrderId,
      "api%2Dversion": "2022-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: purchaseRequestSerializer(body),
    });
}

export async function _purchaseDeserialize(
  result: PathUncheckedResponse,
): Promise<ReservationOrderResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return reservationOrderResponseDeserializer(result.body);
}

/** Purchase `ReservationOrder` and create resource under the specified URI. */
export function purchase(
  context: Client,
  reservationOrderId: string,
  body: PurchaseRequest,
  options: ReservationOrderPurchaseOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReservationOrderResponse>, ReservationOrderResponse> {
  return getLongRunningPoller(context, _purchaseDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _purchaseSend(context, reservationOrderId, body, options),
    resourceLocationConfig: "location",
    apiVersion: "2022-11-01",
  }) as PollerLike<OperationState<ReservationOrderResponse>, ReservationOrderResponse>;
}

export function _getSend(
  context: Client,
  reservationOrderId: string,
  options: ReservationOrderGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationOrders/{reservationOrderId}{?api%2Dversion,%24expand}",
    {
      reservationOrderId: reservationOrderId,
      "api%2Dversion": "2022-11-01",
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ReservationOrderResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDeserializer(result.body);
    }

    throw error;
  }

  return reservationOrderResponseDeserializer(result.body);
}

/** Get the details of the `ReservationOrder`. */
export async function get(
  context: Client,
  reservationOrderId: string,
  options: ReservationOrderGetOptionalParams = { requestOptions: {} },
): Promise<ReservationOrderResponse> {
  const result = await _getSend(context, reservationOrderId, options);
  return _getDeserialize(result);
}
