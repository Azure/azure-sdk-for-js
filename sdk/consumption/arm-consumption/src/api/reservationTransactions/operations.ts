// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConsumptionManagementContext as Client } from "../index.js";
import type {
  _ReservationTransactionsListResult,
  ReservationTransaction,
  _ModernReservationTransactionsListResult,
  ModernReservationTransaction,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _reservationTransactionsListResultDeserializer,
  _modernReservationTransactionsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReservationTransactionsListByBillingProfileOptionalParams,
  ReservationTransactionsListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByBillingProfileSend(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  options: ReservationTransactionsListByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.Consumption/reservationTransactions{?api%2Dversion,%24filter}",
    {
      billingAccountId: billingAccountId,
      billingProfileId: billingProfileId,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      "%24filter": options?.filter,
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
): Promise<_ModernReservationTransactionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _modernReservationTransactionsListResultDeserializer(result.body);
}

/** List of transactions for reserved instances on billing profile scope. The refund transactions are posted along with its purchase transaction (i.e. in the purchase billing month). For example, The refund is requested in May 2021. This refund transaction will have event date as May 2021 but the billing month as April 2020 when the reservation purchase was made. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges. */
export function listByBillingProfile(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  options: ReservationTransactionsListByBillingProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ModernReservationTransaction> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingProfileSend(context, billingAccountId, billingProfileId, options),
    _listByBillingProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-08-01" },
  );
}

export function _listSend(
  context: Client,
  billingAccountId: string,
  options: ReservationTransactionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.Consumption/reservationTransactions{?api%2Dversion,%24filter,useMarkupIfPartner,previewMarkupPercentage}",
    {
      billingAccountId: billingAccountId,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      "%24filter": options?.filter,
      useMarkupIfPartner: options?.useMarkupIfPartner,
      previewMarkupPercentage: options?.previewMarkupPercentage,
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
): Promise<_ReservationTransactionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _reservationTransactionsListResultDeserializer(result.body);
}

/** List of transactions for reserved instances on billing account scope. Note: The refund transactions are posted along with its purchase transaction (i.e. in the purchase billing month). For example, The refund is requested in May 2021. This refund transaction will have event date as May 2021 but the billing month as April 2020 when the reservation purchase was made. Note: ARM has a payload size limit of 12MB, so currently callers get 400 when the response size exceeds the ARM limit. In such cases, API call should be made with smaller date ranges. */
export function list(
  context: Client,
  billingAccountId: string,
  options: ReservationTransactionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReservationTransaction> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, billingAccountId, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-08-01" },
  );
}
