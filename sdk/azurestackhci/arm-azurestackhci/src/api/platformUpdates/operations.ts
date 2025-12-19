// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext as Client } from "../index.js";
import type { PlatformUpdate, _PlatformUpdateListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  platformUpdateDeserializer,
  _platformUpdateListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PlatformUpdatesListOptionalParams,
  PlatformUpdatesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  location: string,
  options: PlatformUpdatesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/locations/{location}/platformUpdates{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PlatformUpdateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _platformUpdateListResultDeserializer(result.body);
}

/** List all platform updates. */
export function list(
  context: Client,
  location: string,
  options: PlatformUpdatesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PlatformUpdate> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, location, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  location: string,
  platformUpdateName: string,
  options: PlatformUpdatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/locations/{location}/platformUpdates/{platformUpdateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      platformUpdateName: platformUpdateName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PlatformUpdate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return platformUpdateDeserializer(result.body);
}

/** Get a platform update. */
export async function get(
  context: Client,
  location: string,
  platformUpdateName: string,
  options: PlatformUpdatesGetOptionalParams = { requestOptions: {} },
): Promise<PlatformUpdate> {
  const result = await _getSend(context, location, platformUpdateName, options);
  return _getDeserialize(result);
}
