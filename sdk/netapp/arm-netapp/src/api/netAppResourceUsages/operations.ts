// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type { _UsagesListResult, UsageResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _usagesListResultDeserializer,
  usageResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetAppResourceUsagesGetOptionalParams,
  NetAppResourceUsagesListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  location: string,
  usageType: string,
  options: NetAppResourceUsagesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/usages/{usageType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      usageType: usageType,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<UsageResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return usageResultDeserializer(result.body);
}

/** Get current subscription usage of the specific type */
export async function get(
  context: Client,
  location: string,
  usageType: string,
  options: NetAppResourceUsagesGetOptionalParams = { requestOptions: {} },
): Promise<UsageResult> {
  const result = await _getSend(context, location, usageType, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  location: string,
  options: NetAppResourceUsagesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/locations/{location}/usages{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_UsagesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _usagesListResultDeserializer(result.body);
}

/** Get current subscription usages */
export function list(
  context: Client,
  location: string,
  options: NetAppResourceUsagesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UsageResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
