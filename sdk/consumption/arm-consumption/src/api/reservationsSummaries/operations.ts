// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsumptionManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  _ReservationSummariesListResult,
  _reservationSummariesListResultDeserializer,
  ReservationSummary,
  Datagrain,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ReservationsSummariesListOptionalParams,
  ReservationsSummariesListByReservationOrderAndReservationOptionalParams,
  ReservationsSummariesListByReservationOrderOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceScope: string,
  grain: Datagrain,
  options: ReservationsSummariesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceScope}/providers/Microsoft.Consumption/reservationSummaries{?api%2Dversion,grain,startDate,endDate,%24filter,reservationId,reservationOrderId}",
    {
      resourceScope: resourceScope,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      grain: grain,
      startDate: options?.startDate,
      endDate: options?.endDate,
      "%24filter": options?.filter,
      reservationId: options?.reservationId,
      reservationOrderId: options?.reservationOrderId,
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
): Promise<_ReservationSummariesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _reservationSummariesListResultDeserializer(result.body);
}

/** Lists the reservations summaries for the defined scope daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges. */
export function list(
  context: Client,
  resourceScope: string,
  grain: Datagrain,
  options: ReservationsSummariesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReservationSummary> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceScope, grain, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-08-01" },
  );
}

export function _listByReservationOrderAndReservationSend(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  grain: Datagrain,
  options: ReservationsSummariesListByReservationOrderAndReservationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationorders/{reservationOrderId}/reservations/{reservationId}/providers/Microsoft.Consumption/reservationSummaries{?api%2Dversion,grain,%24filter}",
    {
      reservationOrderId: reservationOrderId,
      reservationId: reservationId,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      grain: grain,
      "%24filter": options?.filter,
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

export async function _listByReservationOrderAndReservationDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReservationSummariesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _reservationSummariesListResultDeserializer(result.body);
}

/** Lists the reservations summaries for daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges. */
export function listByReservationOrderAndReservation(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  grain: Datagrain,
  options: ReservationsSummariesListByReservationOrderAndReservationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ReservationSummary> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByReservationOrderAndReservationSend(
        context,
        reservationOrderId,
        reservationId,
        grain,
        options,
      ),
    _listByReservationOrderAndReservationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-08-01" },
  );
}

export function _listByReservationOrderSend(
  context: Client,
  reservationOrderId: string,
  grain: Datagrain,
  options: ReservationsSummariesListByReservationOrderOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationorders/{reservationOrderId}/providers/Microsoft.Consumption/reservationSummaries{?api%2Dversion,grain,%24filter}",
    {
      reservationOrderId: reservationOrderId,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      grain: grain,
      "%24filter": options?.filter,
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

export async function _listByReservationOrderDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReservationSummariesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _reservationSummariesListResultDeserializer(result.body);
}

/** Lists the reservations summaries for daily or monthly grain. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges. */
export function listByReservationOrder(
  context: Client,
  reservationOrderId: string,
  grain: Datagrain,
  options: ReservationsSummariesListByReservationOrderOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReservationSummary> {
  return buildPagedAsyncIterator(
    context,
    () => _listByReservationOrderSend(context, reservationOrderId, grain, options),
    _listByReservationOrderDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-08-01" },
  );
}
