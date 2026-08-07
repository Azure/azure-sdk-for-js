// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerInstanceManagementContext as Client } from "../index.js";
import type {
  _AiAgentsGroupListResult,
  AiAgentsGroup,
  AiAgentsGroupTagsUpdate,
  AiAgentsGroupAccessToken,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _aiAgentsGroupListResultDeserializer,
  aiAgentsGroupSerializer,
  aiAgentsGroupDeserializer,
  aiAgentsGroupTagsUpdateSerializer,
  aiAgentsGroupAccessTokenDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AiAgentsGroupsConnectOptionalParams,
  AiAgentsGroupsDeleteOptionalParams,
  AiAgentsGroupsUpdateOptionalParams,
  AiAgentsGroupsCreateOrUpdateOptionalParams,
  AiAgentsGroupsGetOptionalParams,
  AiAgentsGroupsListByResourceGroupOptionalParams,
  AiAgentsGroupsListBySubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _connectSend(
  context: Client,
  resourceGroupName: string,
  aiAgentsGroupName: string,
  options: AiAgentsGroupsConnectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/aiAgentsGroups/{aiAgentsGroupName}/connect{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiAgentsGroupName: aiAgentsGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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

export async function _connectDeserialize(
  result: PathUncheckedResponse,
): Promise<AiAgentsGroupAccessToken> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return aiAgentsGroupAccessTokenDeserializer(result.body);
}
/** Get an access token and endpoint for connecting to the AiAgentsGroup. */
export async function connect(
  context: Client,
  resourceGroupName: string,
  aiAgentsGroupName: string,
  options: AiAgentsGroupsConnectOptionalParams = { requestOptions: {} },
): Promise<AiAgentsGroupAccessToken> {
  const result = await _connectSend(context, resourceGroupName, aiAgentsGroupName, options);
  return _connectDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  aiAgentsGroupName: string,
  options: AiAgentsGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/aiAgentsGroups/{aiAgentsGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiAgentsGroupName: aiAgentsGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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
/** Delete an AiAgentsGroup */
export function $delete(
  context: Client,
  resourceGroupName: string,
  aiAgentsGroupName: string,
  options: AiAgentsGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, aiAgentsGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  aiAgentsGroupName: string,
  properties: AiAgentsGroupTagsUpdate,
  options: AiAgentsGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/aiAgentsGroups/{aiAgentsGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiAgentsGroupName: aiAgentsGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: aiAgentsGroupTagsUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AiAgentsGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return aiAgentsGroupDeserializer(result.body);
}
/** Update an AiAgentsGroup */
export function update(
  context: Client,
  resourceGroupName: string,
  aiAgentsGroupName: string,
  properties: AiAgentsGroupTagsUpdate,
  options: AiAgentsGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AiAgentsGroup>, AiAgentsGroup> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, aiAgentsGroupName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-01-preview",
  }) as PollerLike<OperationState<AiAgentsGroup>, AiAgentsGroup>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  aiAgentsGroupName: string,
  resource: AiAgentsGroup,
  options: AiAgentsGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/aiAgentsGroups/{aiAgentsGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiAgentsGroupName: aiAgentsGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: aiAgentsGroupSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AiAgentsGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return aiAgentsGroupDeserializer(result.body);
}
/** Create an AiAgentsGroup */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  aiAgentsGroupName: string,
  resource: AiAgentsGroup,
  options: AiAgentsGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AiAgentsGroup>, AiAgentsGroup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, aiAgentsGroupName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-08-01-preview",
  }) as PollerLike<OperationState<AiAgentsGroup>, AiAgentsGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  aiAgentsGroupName: string,
  options: AiAgentsGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/aiAgentsGroups/{aiAgentsGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiAgentsGroupName: aiAgentsGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AiAgentsGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return aiAgentsGroupDeserializer(result.body);
}
/** Get an AiAgentsGroup */
export async function get(
  context: Client,
  resourceGroupName: string,
  aiAgentsGroupName: string,
  options: AiAgentsGroupsGetOptionalParams = { requestOptions: {} },
): Promise<AiAgentsGroup> {
  const result = await _getSend(context, resourceGroupName, aiAgentsGroupName, options);
  return _getDeserialize(result);
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AiAgentsGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerInstance/aiAgentsGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AiAgentsGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _aiAgentsGroupListResultDeserializer(result.body);
}
/** List AiAgentsGroup resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AiAgentsGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AiAgentsGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-01-preview",
    },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: AiAgentsGroupsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerInstance/aiAgentsGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AiAgentsGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _aiAgentsGroupListResultDeserializer(result.body);
}
/** List AiAgentsGroup resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: AiAgentsGroupsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AiAgentsGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-01-preview",
    },
  );
}
