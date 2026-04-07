// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type { SubscriptionUsage, _SubscriptionUsageListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  subscriptionUsageDeserializer,
  _subscriptionUsageListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SubscriptionUsagesListByLocationOptionalParams,
  SubscriptionUsagesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByLocationSend(
  context: Client,
  locationName: string,
  options: SubscriptionUsagesListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/usages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<_SubscriptionUsageListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _subscriptionUsageListResultDeserializer(result.body);
}

/** Gets all subscription usage metrics in a given location. */
export function listByLocation(
  context: Client,
  locationName: string,
  options: SubscriptionUsagesListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SubscriptionUsage> {
  return buildPagedAsyncIterator(
    context,
    () => _listByLocationSend(context, locationName, options),
    _listByLocationDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  locationName: string,
  usageName: string,
  options: SubscriptionUsagesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/usages/{usageName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      usageName: usageName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SubscriptionUsage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return subscriptionUsageDeserializer(result.body);
}

/** Gets a subscription usage metric. */
export async function get(
  context: Client,
  locationName: string,
  usageName: string,
  options: SubscriptionUsagesGetOptionalParams = { requestOptions: {} },
): Promise<SubscriptionUsage> {
  const result = await _getSend(context, locationName, usageName, options);
  return _getDeserialize(result);
}
