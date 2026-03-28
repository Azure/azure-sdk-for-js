// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingManagementContext as Client } from "../index.js";
import type { ReservationOrder, _ReservationOrderList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  reservationOrderDeserializer,
  _reservationOrderListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReservationOrdersListByBillingAccountOptionalParams,
  ReservationOrdersGetByBillingAccountOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  options: ReservationOrdersListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/reservationOrders{?api%2Dversion,filter,orderBy,skiptoken}",
    {
      billingAccountName: billingAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      filter: options?.filter,
      orderBy: options?.orderBy,
      skiptoken: options?.skiptoken,
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
): Promise<_ReservationOrderList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _reservationOrderListDeserializer(result.body);
}

/** List all the ReservationOrders in the billing account. */
export function listByBillingAccount(
  context: Client,
  billingAccountName: string,
  options: ReservationOrdersListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReservationOrder> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingAccountSend(context, billingAccountName, options),
    _listByBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _getByBillingAccountSend(
  context: Client,
  billingAccountName: string,
  reservationOrderId: string,
  options: ReservationOrdersGetByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountName}/reservationOrders/{reservationOrderId}{?api%2Dversion,expand}",
    {
      billingAccountName: billingAccountName,
      reservationOrderId: reservationOrderId,
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

export async function _getByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<ReservationOrder> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return reservationOrderDeserializer(result.body);
}

/** Get the details of the ReservationOrder in the billing account. */
export async function getByBillingAccount(
  context: Client,
  billingAccountName: string,
  reservationOrderId: string,
  options: ReservationOrdersGetByBillingAccountOptionalParams = { requestOptions: {} },
): Promise<ReservationOrder> {
  const result = await _getByBillingAccountSend(
    context,
    billingAccountName,
    reservationOrderId,
    options,
  );
  return _getByBillingAccountDeserialize(result);
}
