// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type { DeletedServer, _DeletedServerListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  deletedServerDeserializer,
  _deletedServerListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DeletedServersListOptionalParams,
  DeletedServersRecoverOptionalParams,
  DeletedServersListByLocationOptionalParams,
  DeletedServersGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  options: DeletedServersListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/deletedServers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeletedServerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _deletedServerListResultDeserializer(result.body);
}

/** Gets a list of all deleted servers in a subscription. */
export function list(
  context: Client,
  options: DeletedServersListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedServer> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _recoverSend(
  context: Client,
  locationName: string,
  deletedServerName: string,
  options: DeletedServersRecoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/deletedServers/{deletedServerName}/recover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      deletedServerName: deletedServerName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _recoverDeserialize(result: PathUncheckedResponse): Promise<DeletedServer> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return deletedServerDeserializer(result.body);
}

/** Recovers a deleted server. */
export function recover(
  context: Client,
  locationName: string,
  deletedServerName: string,
  options: DeletedServersRecoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeletedServer>, DeletedServer> {
  return getLongRunningPoller(context, _recoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _recoverSend(context, locationName, deletedServerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<OperationState<DeletedServer>, DeletedServer>;
}

export function _listByLocationSend(
  context: Client,
  locationName: string,
  options: DeletedServersListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/deletedServers{?api%2Dversion}",
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
): Promise<_DeletedServerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _deletedServerListResultDeserializer(result.body);
}

/** Gets a list of deleted servers for a location. */
export function listByLocation(
  context: Client,
  locationName: string,
  options: DeletedServersListByLocationOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedServer> {
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
  deletedServerName: string,
  options: DeletedServersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/deletedServers/{deletedServerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      deletedServerName: deletedServerName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DeletedServer> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return deletedServerDeserializer(result.body);
}

/** Gets a deleted server. */
export async function get(
  context: Client,
  locationName: string,
  deletedServerName: string,
  options: DeletedServersGetOptionalParams = { requestOptions: {} },
): Promise<DeletedServer> {
  const result = await _getSend(context, locationName, deletedServerName, options);
  return _getDeserialize(result);
}
