// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConsumptionManagementContext as Client } from "../index.js";
import type { _ReservationDetailsListResult, ReservationDetail } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _reservationDetailsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReservationsDetailsListOptionalParams,
  ReservationsDetailsListByReservationOrderAndReservationOptionalParams,
  ReservationsDetailsListByReservationOrderOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceScope: string,
  options: ReservationsDetailsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceScope}/providers/Microsoft.Consumption/reservationDetails{?api%2Dversion,startDate,endDate,%24filter,reservationId,reservationOrderId}",
    {
      resourceScope: resourceScope,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReservationDetailsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _reservationDetailsListResultDeserializer(result.body);
}

/** Lists the reservations details for provided date range. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. If the data size is too large, customers may also get 504 as the API timed out preparing the data. In such cases, API call should be made with smaller date ranges or a call to Generate Reservation Details Report API should be made as it is asynchronous and will not run into response size time outs. */
export function list(
  context: Client,
  resourceScope: string,
  options: ReservationsDetailsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReservationDetail> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceScope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-08-01" },
  );
}

export function _listByReservationOrderAndReservationSend(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  filter: string,
  options: ReservationsDetailsListByReservationOrderAndReservationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationorders/{reservationOrderId}/reservations/{reservationId}/providers/Microsoft.Consumption/reservationDetails{?api%2Dversion,%24filter}",
    {
      reservationOrderId: reservationOrderId,
      reservationId: reservationId,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      "%24filter": filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByReservationOrderAndReservationDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReservationDetailsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _reservationDetailsListResultDeserializer(result.body);
}

/** Lists the reservations details for provided date range. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. If the data size is too large, customers may also get 504 as the API timed out preparing the data. In such cases, API call should be made with smaller date ranges or a call to Generate Reservation Details Report API should be made as it is asynchronous and will not run into response size time outs. */
export function listByReservationOrderAndReservation(
  context: Client,
  reservationOrderId: string,
  reservationId: string,
  filter: string,
  options: ReservationsDetailsListByReservationOrderAndReservationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ReservationDetail> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByReservationOrderAndReservationSend(
        context,
        reservationOrderId,
        reservationId,
        filter,
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
  filter: string,
  options: ReservationsDetailsListByReservationOrderOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Capacity/reservationorders/{reservationOrderId}/providers/Microsoft.Consumption/reservationDetails{?api%2Dversion,%24filter}",
    {
      reservationOrderId: reservationOrderId,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      "%24filter": filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByReservationOrderDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReservationDetailsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _reservationDetailsListResultDeserializer(result.body);
}

/** Lists the reservations details for provided date range. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. If the data size is too large, customers may also get 504 as the API timed out preparing the data. In such cases, API call should be made with smaller date ranges or a call to Generate Reservation Details Report API should be made as it is asynchronous and will not run into response size time outs. */
export function listByReservationOrder(
  context: Client,
  reservationOrderId: string,
  filter: string,
  options: ReservationsDetailsListByReservationOrderOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReservationDetail> {
  return buildPagedAsyncIterator(
    context,
    () => _listByReservationOrderSend(context, reservationOrderId, filter, options),
    _listByReservationOrderDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-08-01" },
  );
}
