// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlaywrightManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  PlaywrightQuota,
  playwrightQuotaDeserializer,
  QuotaName,
  _PlaywrightQuotaListResult,
  _playwrightQuotaListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PlaywrightQuotasListBySubscriptionOptionalParams,
  PlaywrightQuotasGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  location: string,
  options: PlaywrightQuotasListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.LoadTestService/locations/{location}/playwrightQuotas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PlaywrightQuotaListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _playwrightQuotaListResultDeserializer(result.body);
}

/** Lists Playwright quota resources for a given subscription ID. */
export function listBySubscription(
  context: Client,
  location: string,
  options: PlaywrightQuotasListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<PlaywrightQuota> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, location, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  playwrightQuotaName: QuotaName,
  options: PlaywrightQuotasGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.LoadTestService/locations/{location}/playwrightQuotas/{playwrightQuotaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      playwrightQuotaName: playwrightQuotaName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PlaywrightQuota> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return playwrightQuotaDeserializer(result.body);
}

/** Gets a subscription-level location-based Playwright quota resource by name. */
export async function get(
  context: Client,
  location: string,
  playwrightQuotaName: QuotaName,
  options: PlaywrightQuotasGetOptionalParams = { requestOptions: {} },
): Promise<PlaywrightQuota> {
  const result = await _getSend(context, location, playwrightQuotaName, options);
  return _getDeserialize(result);
}
