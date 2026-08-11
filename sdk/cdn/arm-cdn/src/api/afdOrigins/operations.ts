// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type {
  AFDOrigin,
  AFDOriginUpdateParameters,
  _AFDOriginListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  afdOriginSerializer,
  afdOriginDeserializer,
  afdOriginUpdateParametersSerializer,
  _afdOriginListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AFDOriginsListByOriginGroupOptionalParams,
  AFDOriginsDeleteOptionalParams,
  AFDOriginsUpdateOptionalParams,
  AFDOriginsCreateOptionalParams,
  AFDOriginsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByOriginGroupSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  options: AFDOriginsListByOriginGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}/origins{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      originGroupName: originGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _listByOriginGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AFDOriginListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _afdOriginListResultDeserializer(result.body);
}

/** Lists all of the existing origins within an origin group. */
export function listByOriginGroup(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  options: AFDOriginsListByOriginGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AFDOrigin> {
  return buildPagedAsyncIterator(
    context,
    () => _listByOriginGroupSend(context, resourceGroupName, profileName, originGroupName, options),
    _listByOriginGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  originName: string,
  options: AFDOriginsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}/origins/{originName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      originGroupName: originGroupName,
      originName: originName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an existing origin within an origin group. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  originName: string,
  options: AFDOriginsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, profileName, originGroupName, originName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  originName: string,
  originUpdateProperties: AFDOriginUpdateParameters,
  options: AFDOriginsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}/origins/{originName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      originGroupName: originGroupName,
      originName: originName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: afdOriginUpdateParametersSerializer(originUpdateProperties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AFDOrigin> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return afdOriginDeserializer(result.body);
}

/** Updates an existing origin within an origin group. */
export function update(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  originName: string,
  originUpdateProperties: AFDOriginUpdateParameters,
  options: AFDOriginsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AFDOrigin>, AFDOrigin> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originName,
        originUpdateProperties,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<AFDOrigin>, AFDOrigin>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  originName: string,
  origin: AFDOrigin,
  options: AFDOriginsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}/origins/{originName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      originGroupName: originGroupName,
      originName: originName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: afdOriginSerializer(origin),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<AFDOrigin> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return afdOriginDeserializer(result.body);
}

/** Creates a new origin within the specified origin group. */
export function create(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  originName: string,
  origin: AFDOrigin,
  options: AFDOriginsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AFDOrigin>, AFDOrigin> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originName,
        origin,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<AFDOrigin>, AFDOrigin>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  originName: string,
  options: AFDOriginsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}/origins/{originName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      originGroupName: originGroupName,
      originName: originName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AFDOrigin> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return afdOriginDeserializer(result.body);
}

/** Gets an existing origin within an origin group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  originName: string,
  options: AFDOriginsGetOptionalParams = { requestOptions: {} },
): Promise<AFDOrigin> {
  const result = await _getSend(
    context,
    resourceGroupName,
    profileName,
    originGroupName,
    originName,
    options,
  );
  return _getDeserialize(result);
}
