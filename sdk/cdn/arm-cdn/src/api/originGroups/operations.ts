// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type {
  OriginGroup,
  OriginGroupUpdateParameters,
  _OriginGroupListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  originGroupSerializer,
  originGroupDeserializer,
  originGroupUpdateParametersSerializer,
  _originGroupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  OriginGroupsListByEndpointOptionalParams,
  OriginGroupsDeleteOptionalParams,
  OriginGroupsUpdateOptionalParams,
  OriginGroupsCreateOptionalParams,
  OriginGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByEndpointSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: OriginGroupsListByEndpointOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/originGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
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

export async function _listByEndpointDeserialize(
  result: PathUncheckedResponse,
): Promise<_OriginGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _originGroupListResultDeserializer(result.body);
}

/** Lists all of the existing origin groups within an endpoint. */
export function listByEndpoint(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  options: OriginGroupsListByEndpointOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OriginGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEndpointSend(context, resourceGroupName, profileName, endpointName, options),
    _listByEndpointDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  originGroupName: string,
  options: OriginGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/originGroups/{originGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      originGroupName: originGroupName,
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

/** Deletes an existing origin group within an endpoint. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  originGroupName: string,
  options: OriginGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, profileName, endpointName, originGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  originGroupName: string,
  originGroupUpdateProperties: OriginGroupUpdateParameters,
  options: OriginGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/originGroups/{originGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      originGroupName: originGroupName,
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
    body: originGroupUpdateParametersSerializer(originGroupUpdateProperties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<OriginGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return originGroupDeserializer(result.body);
}

/** Updates an existing origin group within an endpoint. */
export function update(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  originGroupName: string,
  originGroupUpdateProperties: OriginGroupUpdateParameters,
  options: OriginGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OriginGroup>, OriginGroup> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        originGroupName,
        originGroupUpdateProperties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<OriginGroup>, OriginGroup>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  originGroupName: string,
  originGroup: OriginGroup,
  options: OriginGroupsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/originGroups/{originGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
      originGroupName: originGroupName,
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
    body: originGroupSerializer(originGroup),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<OriginGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return originGroupDeserializer(result.body);
}

/** Creates a new origin group within the specified endpoint. */
export function create(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  originGroupName: string,
  originGroup: OriginGroup,
  options: OriginGroupsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OriginGroup>, OriginGroup> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        profileName,
        endpointName,
        originGroupName,
        originGroup,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<OriginGroup>, OriginGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  originGroupName: string,
  options: OriginGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/endpoints/{endpointName}/originGroups/{originGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      endpointName: endpointName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<OriginGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return originGroupDeserializer(result.body);
}

/** Gets an existing origin group within an endpoint. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  endpointName: string,
  originGroupName: string,
  options: OriginGroupsGetOptionalParams = { requestOptions: {} },
): Promise<OriginGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    profileName,
    endpointName,
    originGroupName,
    options,
  );
  return _getDeserialize(result);
}
