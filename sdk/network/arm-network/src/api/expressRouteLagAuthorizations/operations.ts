// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  ExpressRouteAuthorizationKey,
  ExpressRouteLagAuthorization,
  _ExpressRouteLagAuthorizationListResult,
} from "../../models/network/models.js";
import {
  expressRouteAuthorizationKeyDeserializer,
  expressRouteLagAuthorizationSerializer,
  expressRouteLagAuthorizationDeserializer,
  _expressRouteLagAuthorizationListResultDeserializer,
} from "../../models/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExpressRouteLagAuthorizationsListKeysOptionalParams,
  ExpressRouteLagAuthorizationsListOptionalParams,
  ExpressRouteLagAuthorizationsDeleteOptionalParams,
  ExpressRouteLagAuthorizationsCreateOrUpdateOptionalParams,
  ExpressRouteLagAuthorizationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  authorizationName: string,
  options: ExpressRouteLagAuthorizationsListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags/{expressRouteLagName}/authorizations/{authorizationName}/listKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteLagName: expressRouteLagName,
      authorizationName: authorizationName,
      "api%2Dversion": "2026-03-01",
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

export async function _listKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteAuthorizationKey> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteAuthorizationKeyDeserializer(result.body);
}

/** Gets the authorization key associated with the specified express route LAG authorization. */
export async function listKeys(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  authorizationName: string,
  options: ExpressRouteLagAuthorizationsListKeysOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteAuthorizationKey> {
  const result = await _listKeysSend(
    context,
    resourceGroupName,
    expressRouteLagName,
    authorizationName,
    options,
  );
  return _listKeysDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  options: ExpressRouteLagAuthorizationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags/{expressRouteLagName}/authorizations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteLagName: expressRouteLagName,
      "api%2Dversion": "2026-03-01",
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
): Promise<_ExpressRouteLagAuthorizationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _expressRouteLagAuthorizationListResultDeserializer(result.body);
}

/** Gets all authorizations in an express route LAG. */
export function list(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  options: ExpressRouteLagAuthorizationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpressRouteLagAuthorization> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, expressRouteLagName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  authorizationName: string,
  options: ExpressRouteLagAuthorizationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags/{expressRouteLagName}/authorizations/{authorizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteLagName: expressRouteLagName,
      authorizationName: authorizationName,
      "api%2Dversion": "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified authorization from the specified express route LAG. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  authorizationName: string,
  options: ExpressRouteLagAuthorizationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, expressRouteLagName, authorizationName, options),
    resourceLocationConfig: "location",
    apiVersion: "2026-03-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  authorizationName: string,
  authorizationParameters: ExpressRouteLagAuthorization,
  options: ExpressRouteLagAuthorizationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags/{expressRouteLagName}/authorizations/{authorizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteLagName: expressRouteLagName,
      authorizationName: authorizationName,
      "api%2Dversion": "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: expressRouteLagAuthorizationSerializer(authorizationParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpressRouteLagAuthorization> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteLagAuthorizationDeserializer(result.body);
}

/** Creates or updates an authorization in the specified express route LAG. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  authorizationName: string,
  authorizationParameters: ExpressRouteLagAuthorization,
  options: ExpressRouteLagAuthorizationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExpressRouteLagAuthorization>, ExpressRouteLagAuthorization> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        expressRouteLagName,
        authorizationName,
        authorizationParameters,
        options,
      ),
    resourceLocationConfig: "original-uri",
    apiVersion: "2026-03-01",
  }) as PollerLike<OperationState<ExpressRouteLagAuthorization>, ExpressRouteLagAuthorization>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  authorizationName: string,
  options: ExpressRouteLagAuthorizationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/expressRouteLags/{expressRouteLagName}/authorizations/{authorizationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      expressRouteLagName: expressRouteLagName,
      authorizationName: authorizationName,
      "api%2Dversion": "2026-03-01",
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
): Promise<ExpressRouteLagAuthorization> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expressRouteLagAuthorizationDeserializer(result.body);
}

/** Gets the specified authorization from the specified express route LAG. */
export async function get(
  context: Client,
  resourceGroupName: string,
  expressRouteLagName: string,
  authorizationName: string,
  options: ExpressRouteLagAuthorizationsGetOptionalParams = { requestOptions: {} },
): Promise<ExpressRouteLagAuthorization> {
  const result = await _getSend(
    context,
    resourceGroupName,
    expressRouteLagName,
    authorizationName,
    options,
  );
  return _getDeserialize(result);
}
