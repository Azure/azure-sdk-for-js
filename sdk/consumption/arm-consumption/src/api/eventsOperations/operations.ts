// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConsumptionManagementContext as Client } from "../index.js";
import type { _Events, EventSummary } from "../../models/models.js";
import { errorResponseDeserializer, _eventsDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EventsOperationsListByBillingAccountOptionalParams,
  EventsOperationsListByBillingProfileOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByBillingAccountSend(
  context: Client,
  billingAccountId: string,
  options: EventsOperationsListByBillingAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/providers/Microsoft.Consumption/events{?api%2Dversion,%24filter}",
    {
      billingAccountId: billingAccountId,
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

export async function _listByBillingAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_Events> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _eventsDeserializer(result.body);
}

/** Lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date. */
export function listByBillingAccount(
  context: Client,
  billingAccountId: string,
  options: EventsOperationsListByBillingAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventSummary> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBillingAccountSend(context, billingAccountId, options),
    _listByBillingAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-08-01" },
  );
}

export function _listByBillingProfileSend(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  startDate: string,
  endDate: string,
  options: EventsOperationsListByBillingProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Billing/billingAccounts/{billingAccountId}/billingProfiles/{billingProfileId}/providers/Microsoft.Consumption/events{?api%2Dversion,startDate,endDate}",
    {
      billingAccountId: billingAccountId,
      billingProfileId: billingProfileId,
      "api%2Dversion": context.apiVersion ?? "2024-08-01",
      startDate: startDate,
      endDate: endDate,
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
): Promise<_Events> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _eventsDeserializer(result.body);
}

/** Lists the events that decrements Azure credits or Microsoft Azure consumption commitment for a billing account or a billing profile for a given start and end date. */
export function listByBillingProfile(
  context: Client,
  billingAccountId: string,
  billingProfileId: string,
  startDate: string,
  endDate: string,
  options: EventsOperationsListByBillingProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EventSummary> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByBillingProfileSend(
        context,
        billingAccountId,
        billingProfileId,
        startDate,
        endDate,
        options,
      ),
    _listByBillingProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-08-01" },
  );
}
