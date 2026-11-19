// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  _DefaultParameterGroupListResult,
  DefaultParameterGroup,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _defaultParameterGroupListResultDeserializer,
  defaultParameterGroupDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DefaultParameterGroupsGetOptionalParams,
  DefaultParameterGroupsListBySubscriptionAndRegionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  location: string,
  name: string,
  options: DefaultParameterGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HorizonDb/locations/{location}/parameterGroups/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<DefaultParameterGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return defaultParameterGroupDeserializer(result.body);
}

/** Gets a default parameter group available for a subscription in a specific region. Each PostgreSQL version has at most one default parameter group in a location. */
export async function get(
  context: Client,
  location: string,
  name: string,
  options: DefaultParameterGroupsGetOptionalParams = { requestOptions: {} },
): Promise<DefaultParameterGroup> {
  const result = await _getSend(context, location, name, options);
  return _getDeserialize(result);
}

export function _listBySubscriptionAndRegionSend(
  context: Client,
  location: string,
  options: DefaultParameterGroupsListBySubscriptionAndRegionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HorizonDb/locations/{location}/parameterGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _listBySubscriptionAndRegionDeserialize(
  result: PathUncheckedResponse,
): Promise<_DefaultParameterGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _defaultParameterGroupListResultDeserializer(result.body);
}

/** Lists default parameter groups available for a subscription in a specific region. The response contains at most one default parameter group for each PostgreSQL version. */
export function listBySubscriptionAndRegion(
  context: Client,
  location: string,
  options: DefaultParameterGroupsListBySubscriptionAndRegionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DefaultParameterGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionAndRegionSend(context, location, options),
    _listBySubscriptionAndRegionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}
