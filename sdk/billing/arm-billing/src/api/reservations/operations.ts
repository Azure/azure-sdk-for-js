// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type {
  Reservation,
  Patch,
  _ReservationList,
  _ReservationsListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  reservationDeserializer,
  patchSerializer,
  _reservationListDeserializer,
  _reservationsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReservationsListByBillingProfileOptionalParams,
  ReservationsListByBillingAccountOptionalParams,
  ReservationsListByReservationOrderOptionalParams,
  ReservationsUpdateByBillingAccountOptionalParams,
  ReservationsGetByReservationOrderOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByBillingProfileSend(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: ReservationsListByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/billingProfiles/{billingProfileName}/reservations{?api%2Dversion,filter,orderBy,skiptoken,refreshSummary,selectedState,take}",
    {
      billingAccountName: billingAccountName,
      billingProfileName: billingProfileName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      orderBy: options?.orderBy,
      skiptoken: options?.skiptoken,
      refreshSummary: options?.refreshSummary,
      selectedState: options?.selectedState,
      take: options?.take,
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

export async function _listByBillingProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReservationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _reservationsListResultDeserializer(result.body);
}

/** Lists the reservations for a billing profile and the roll up counts of reservations group by provisioning state. */
export function listByBillingProfile(
  context: Client,
  billingAccountName: string,
  billingProfileName: string,
  options: ReservationsListByBillingProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Reservation> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingProfileSend(context, billingAccountName, billingProfileName, options),
    _listByBillingProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: ReservationsListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/reservations{?api%2Dversion,filter,orderBy,skiptoken,refreshSummary,selectedState,take}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      orderBy: options?.orderBy,
      skiptoken: options?.skiptoken,
      refreshSummary: options?.refreshSummary,
      selectedState: options?.selectedState,
      take: options?.take,
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

export async function _listByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReservationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _reservationsListResultDeserializer(result.body);
}

/** Lists the reservations in the billing account and the roll up counts of reservations group by provisioning states. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: ReservationsListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Reservation> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingAccountSend(context, billingAccountName, options),
    _listByBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _listByReservationOrderSend(
  context: Client,
  billingAccountName: string,
  reservationOrderId: string,
  options: ReservationsListByReservationOrderOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/reservationOrders/{reservationOrderId}/reservations{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      reservationOrderId: reservationOrderId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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
): Promise<_ReservationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _reservationListDeserializer(result.body);
}

/** List Reservations within a single ReservationOrder in the billing account. */
export function listByReservationOrder(
  context: Client,
  billingAccountName: string,
  reservationOrderId: string,
  options: ReservationsListByReservationOrderOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Reservation> {
  return buildPagedAsyncIterator(
    context,
    () => _listByReservationOrderSend(context, billingAccountName, reservationOrderId, options),
    _listByReservationOrderDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _updateByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  reservationOrderId: string,
  reservationId: string,
  body: Patch,
  options: ReservationsUpdateByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/reservationOrders/{reservationOrderId}/reservations/{reservationId}{?api%2Dversion}",
    {
      billingAccountName: billingAccountName,
      reservationOrderId: reservationOrderId,
      reservationId: reservationId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: patchSerializer(body),
  });
}

export async function _updateByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<Reservation> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return reservationDeserializer(result.body);
}

/** Update reservation by billing account. */
export function updateByBillingAccount(
  context: Client,
  billingAccountName: string,
  reservationOrderId: string,
  reservationId: string,
  body: Patch,
  options: ReservationsUpdateByBillingAccountOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Reservation>, Reservation> {
  return getLongRunningPoller(context, _updateByBillingAccountDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateByBillingAccountSend(
        context,
        billingAccountName,
        reservationOrderId,
        reservationId,
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-04-01",
  }) as PollerLike<OperationState<Reservation>, Reservation>;
}

export function _getByReservationOrderSend(
  context: Client,
  billingAccountName: string,
  reservationOrderId: string,
  reservationId: string,
  options: ReservationsGetByReservationOrderOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/reservationOrders/{reservationOrderId}/reservations/{reservationId}{?api%2Dversion,expand}",
    {
      billingAccountName: billingAccountName,
      reservationOrderId: reservationOrderId,
      reservationId: reservationId,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      expand: options?.expand,
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

export async function _getByReservationOrderDeserialize(
  result: PathUncheckedResponse,
): Promise<Reservation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return reservationDeserializer(result.body);
}

/** Get specific Reservation details in the billing account. */
export async function getByReservationOrder(
  context: Client,
  billingAccountName: string,
  reservationOrderId: string,
  reservationId: string,
  options: ReservationsGetByReservationOrderOptionalParams = { requestOptions: {} },
): Promise<Reservation> {
  const result = await _getByReservationOrderSend(
    context,
    billingAccountName,
    reservationOrderId,
    reservationId,
    options,
  );
  return _getByReservationOrderDeserialize(result);
}
