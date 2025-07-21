// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceContext as Client } from "../index.js";
import {
  errorDeserializer,
  BotChannel,
  botChannelSerializer,
  botChannelDeserializer,
  _ChannelResponseList,
  _channelResponseListDeserializer,
  ListChannelWithKeysResponse,
  listChannelWithKeysResponseDeserializer,
  ChannelName,
} from "../../models/models.js";
import {
  ChannelsListWithKeysOptionalParams,
  ChannelsListByResourceGroupOptionalParams,
  ChannelsDeleteOptionalParams,
  ChannelsUpdateOptionalParams,
  ChannelsCreateOptionalParams,
  ChannelsGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listWithKeysSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  channelName: ChannelName,
  options: ChannelsListWithKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/channels/{channelName}/listChannelWithKeys{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      channelName: channelName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listWithKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<ListChannelWithKeysResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return listChannelWithKeysResponseDeserializer(result.body);
}

/** Lists a Channel registration for a Bot Service including secrets */
export async function listWithKeys(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  channelName: ChannelName,
  options: ChannelsListWithKeysOptionalParams = { requestOptions: {} },
): Promise<ListChannelWithKeysResponse> {
  const result = await _listWithKeysSend(
    context,
    resourceGroupName,
    resourceName,
    channelName,
    options,
  );
  return _listWithKeysDeserialize(result);
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ChannelsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/channels{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ChannelResponseList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return _channelResponseListDeserializer(result.body);
}

/** Returns all the Channel registrations of a particular BotService resource */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ChannelsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BotChannel> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, resourceName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  channelName: string,
  options: ChannelsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/channels/{channelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      channelName: channelName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a Channel registration from a Bot Service */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  channelName: string,
  options: ChannelsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, resourceName, channelName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  channelName: ChannelName,
  parameters: BotChannel,
  options: ChannelsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/channels/{channelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      channelName: channelName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: botChannelSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<BotChannel> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return botChannelDeserializer(result.body);
}

/** Updates a Channel registration for a Bot Service */
export async function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  channelName: ChannelName,
  parameters: BotChannel,
  options: ChannelsUpdateOptionalParams = { requestOptions: {} },
): Promise<BotChannel> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    resourceName,
    channelName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  channelName: ChannelName,
  parameters: BotChannel,
  options: ChannelsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/channels/{channelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      channelName: channelName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: botChannelSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<BotChannel> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return botChannelDeserializer(result.body);
}

/** Creates a Channel registration for a Bot Service */
export async function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  channelName: ChannelName,
  parameters: BotChannel,
  options: ChannelsCreateOptionalParams = { requestOptions: {} },
): Promise<BotChannel> {
  const result = await _createSend(
    context,
    resourceGroupName,
    resourceName,
    channelName,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  channelName: string,
  options: ChannelsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/channels/{channelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      channelName: channelName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BotChannel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return botChannelDeserializer(result.body);
}

/** Returns a BotService Channel registration specified by the parameters. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  channelName: string,
  options: ChannelsGetOptionalParams = { requestOptions: {} },
): Promise<BotChannel> {
  const result = await _getSend(context, resourceGroupName, resourceName, channelName, options);
  return _getDeserialize(result);
}
