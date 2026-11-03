// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext as Client } from "../index.js";
import type {
  Channel,
  ChannelUpdateParameters,
  _ChannelsListResult,
  EventSubscriptionFullUrl,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  channelSerializer,
  channelDeserializer,
  channelUpdateParametersSerializer,
  _channelsListResultDeserializer,
  eventSubscriptionFullUrlDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ChannelsGetFullUrlOptionalParams,
  ChannelsListByPartnerNamespaceOptionalParams,
  ChannelsDeleteOptionalParams,
  ChannelsUpdateOptionalParams,
  ChannelsCreateOrUpdateOptionalParams,
  ChannelsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getFullUrlSend(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  channelName: string,
  options: ChannelsGetFullUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/channels/{channelName}/getFullUrl{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerNamespaceName: partnerNamespaceName,
      channelName: channelName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _getFullUrlDeserialize(
  result: PathUncheckedResponse,
): Promise<EventSubscriptionFullUrl> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return eventSubscriptionFullUrlDeserializer(result.body);
}

/** Get the full endpoint URL of a partner destination channel. */
export async function getFullUrl(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  channelName: string,
  options: ChannelsGetFullUrlOptionalParams = { requestOptions: {} },
): Promise<EventSubscriptionFullUrl> {
  const result = await _getFullUrlSend(
    context,
    resourceGroupName,
    partnerNamespaceName,
    channelName,
    options,
  );
  return _getFullUrlDeserialize(result);
}

export function _listByPartnerNamespaceSend(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  options: ChannelsListByPartnerNamespaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/channels{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerNamespaceName: partnerNamespaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
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

export async function _listByPartnerNamespaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ChannelsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _channelsListResultDeserializer(result.body);
}

/** List all the channels in a partner namespace. */
export function listByPartnerNamespace(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  options: ChannelsListByPartnerNamespaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Channel> {
  return buildPagedAsyncIterator(
    context,
    () => _listByPartnerNamespaceSend(context, resourceGroupName, partnerNamespaceName, options),
    _listByPartnerNamespaceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  channelName: string,
  options: ChannelsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/channels/{channelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerNamespaceName: partnerNamespaceName,
      channelName: channelName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete an existing channel. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  channelName: string,
  options: ChannelsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, partnerNamespaceName, channelName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  channelName: string,
  channelUpdateParameters: ChannelUpdateParameters,
  options: ChannelsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/channels/{channelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerNamespaceName: partnerNamespaceName,
      channelName: channelName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: channelUpdateParametersSerializer(channelUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Synchronously updates a channel with the specified parameters. */
export async function update(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  channelName: string,
  channelUpdateParameters: ChannelUpdateParameters,
  options: ChannelsUpdateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    partnerNamespaceName,
    channelName,
    channelUpdateParameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  channelName: string,
  channelInfo: Channel,
  options: ChannelsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/channels/{channelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerNamespaceName: partnerNamespaceName,
      channelName: channelName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: channelSerializer(channelInfo),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Channel> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return channelDeserializer(result.body);
}

/** Synchronously creates or updates a new channel with the specified parameters. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  channelName: string,
  channelInfo: Channel,
  options: ChannelsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<Channel> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    partnerNamespaceName,
    channelName,
    channelInfo,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  channelName: string,
  options: ChannelsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerNamespaces/{partnerNamespaceName}/channels/{channelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerNamespaceName: partnerNamespaceName,
      channelName: channelName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Channel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return channelDeserializer(result.body);
}

/** Get properties of a channel. */
export async function get(
  context: Client,
  resourceGroupName: string,
  partnerNamespaceName: string,
  channelName: string,
  options: ChannelsGetOptionalParams = { requestOptions: {} },
): Promise<Channel> {
  const result = await _getSend(
    context,
    resourceGroupName,
    partnerNamespaceName,
    channelName,
    options,
  );
  return _getDeserialize(result);
}
