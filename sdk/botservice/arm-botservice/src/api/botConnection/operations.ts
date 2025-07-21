// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BotServiceContext as Client } from "../index.js";
import {
  errorDeserializer,
  ConnectionSetting,
  connectionSettingSerializer,
  connectionSettingDeserializer,
  _ConnectionSettingResponseList,
  _connectionSettingResponseListDeserializer,
  ServiceProviderResponseList,
  serviceProviderResponseListDeserializer,
} from "../../models/models.js";
import {
  BotConnectionListServiceProvidersOptionalParams,
  BotConnectionListWithSecretsOptionalParams,
  BotConnectionListByBotServiceOptionalParams,
  BotConnectionDeleteOptionalParams,
  BotConnectionUpdateOptionalParams,
  BotConnectionCreateOptionalParams,
  BotConnectionGetOptionalParams,
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

export function _listServiceProvidersSend(
  context: Client,
  options: BotConnectionListServiceProvidersOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.BotService/listAuthServiceProviders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listServiceProvidersDeserialize(
  result: PathUncheckedResponse,
): Promise<ServiceProviderResponseList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return serviceProviderResponseListDeserializer(result.body);
}

/** Lists the available Service Providers for creating Connection Settings */
export async function listServiceProviders(
  context: Client,
  options: BotConnectionListServiceProvidersOptionalParams = {
    requestOptions: {},
  },
): Promise<ServiceProviderResponseList> {
  const result = await _listServiceProvidersSend(context, options);
  return _listServiceProvidersDeserialize(result);
}

export function _listWithSecretsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  connectionName: string,
  options: BotConnectionListWithSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/connections/{connectionName}/listWithSecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      connectionName: connectionName,
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

export async function _listWithSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return connectionSettingDeserializer(result.body);
}

/** Get a Connection Setting registration for a Bot Service */
export async function listWithSecrets(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  connectionName: string,
  options: BotConnectionListWithSecretsOptionalParams = { requestOptions: {} },
): Promise<ConnectionSetting> {
  const result = await _listWithSecretsSend(
    context,
    resourceGroupName,
    resourceName,
    connectionName,
    options,
  );
  return _listWithSecretsDeserialize(result);
}

export function _listByBotServiceSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: BotConnectionListByBotServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/connections{?api%2Dversion}",
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

export async function _listByBotServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectionSettingResponseList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return _connectionSettingResponseListDeserializer(result.body);
}

/** Returns all the Connection Settings registered to a particular BotService resource */
export function listByBotService(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: BotConnectionListByBotServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectionSetting> {
  return buildPagedAsyncIterator(
    context,
    () => _listByBotServiceSend(context, resourceGroupName, resourceName, options),
    _listByBotServiceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  connectionName: string,
  options: BotConnectionDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      connectionName: connectionName,
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

/** Deletes a Connection Setting registration for a Bot Service */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  connectionName: string,
  options: BotConnectionDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    resourceName,
    connectionName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  connectionName: string,
  parameters: ConnectionSetting,
  options: BotConnectionUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      connectionName: connectionName,
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
    body: connectionSettingSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionSetting> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return connectionSettingDeserializer(result.body);
}

/** Updates a Connection Setting registration for a Bot Service */
export async function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  connectionName: string,
  parameters: ConnectionSetting,
  options: BotConnectionUpdateOptionalParams = { requestOptions: {} },
): Promise<ConnectionSetting> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    resourceName,
    connectionName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  connectionName: string,
  parameters: ConnectionSetting,
  options: BotConnectionCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      connectionName: connectionName,
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
    body: connectionSettingSerializer(parameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectionSetting> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return connectionSettingDeserializer(result.body);
}

/** Register a new Auth Connection for a Bot Service */
export async function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  connectionName: string,
  parameters: ConnectionSetting,
  options: BotConnectionCreateOptionalParams = { requestOptions: {} },
): Promise<ConnectionSetting> {
  const result = await _createSend(
    context,
    resourceGroupName,
    resourceName,
    connectionName,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  connectionName: string,
  options: BotConnectionGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.BotService/botServices/{resourceName}/connections/{connectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      connectionName: connectionName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ConnectionSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);
    throw error;
  }

  return connectionSettingDeserializer(result.body);
}

/** Get a Connection Setting registration for a Bot Service */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  connectionName: string,
  options: BotConnectionGetOptionalParams = { requestOptions: {} },
): Promise<ConnectionSetting> {
  const result = await _getSend(context, resourceGroupName, resourceName, connectionName, options);
  return _getDeserialize(result);
}
