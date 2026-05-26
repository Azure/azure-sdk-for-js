// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type { RaiContentFilter, _RaiContentFilterListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  raiContentFilterDeserializer,
  _raiContentFilterListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RaiContentFiltersListOptionalParams,
  RaiContentFiltersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  options: RaiContentFiltersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/raiContentFilters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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
): Promise<_RaiContentFilterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _raiContentFilterListResultDeserializer(result.body);
}

/** List Content Filters types. */
export function list(
  context: Client,
  location: string,
  options: RaiContentFiltersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RaiContentFilter> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-15-preview",
    },
  );
}

export function _getSend(
  context: Client,
  location: string,
  filterName: string,
  options: RaiContentFiltersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/raiContentFilters/{filterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      filterName: filterName,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RaiContentFilter> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return raiContentFilterDeserializer(result.body);
}

/** Get Content Filters by Name. */
export async function get(
  context: Client,
  location: string,
  filterName: string,
  options: RaiContentFiltersGetOptionalParams = { requestOptions: {} },
): Promise<RaiContentFilter> {
  const result = await _getSend(context, location, filterName, options);
  return _getDeserialize(result);
}
