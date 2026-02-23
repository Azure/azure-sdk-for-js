// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppConfigurationManagementContext as Client } from "../index.js";
import type {
  ConfigurationStore,
  ConfigurationStoreUpdateParameters,
  _ConfigurationStoreListResult,
  _ApiKeyListResult,
  ApiKey,
  RegenerateKeyParameters,
  DeletedConfigurationStore,
  _DeletedConfigurationStoreListResult,
} from "../../models/models.js";
import {
  configurationStoreSerializer,
  configurationStoreDeserializer,
  errorResponseDeserializer,
  configurationStoreUpdateParametersSerializer,
  _configurationStoreListResultDeserializer,
  _apiKeyListResultDeserializer,
  apiKeyDeserializer,
  regenerateKeyParametersSerializer,
  deletedConfigurationStoreDeserializer,
  _deletedConfigurationStoreListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConfigurationStoresListDeletedOptionalParams,
  ConfigurationStoresPurgeDeletedOptionalParams,
  ConfigurationStoresGetDeletedOptionalParams,
  ConfigurationStoresRegenerateKeyOptionalParams,
  ConfigurationStoresListKeysOptionalParams,
  ConfigurationStoresListOptionalParams,
  ConfigurationStoresListByResourceGroupOptionalParams,
  ConfigurationStoresDeleteOptionalParams,
  ConfigurationStoresUpdateOptionalParams,
  ConfigurationStoresCreateOptionalParams,
  ConfigurationStoresGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listDeletedSend(
  context: Client,
  options: ConfigurationStoresListDeletedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AppConfiguration/deletedConfigurationStores{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listDeletedDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeletedConfigurationStoreListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _deletedConfigurationStoreListResultDeserializer(result.body);
}

/** Gets information about the deleted configuration stores in a subscription. */
export function listDeleted(
  context: Client,
  options: ConfigurationStoresListDeletedOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedConfigurationStore> {
  return buildPagedAsyncIterator(
    context,
    () => _listDeletedSend(context, options),
    _listDeletedDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _purgeDeletedSend(
  context: Client,
  location: string,
  configStoreName: string,
  options: ConfigurationStoresPurgeDeletedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AppConfiguration/locations/{location}/deletedConfigurationStores/{configStoreName}/purge{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      configStoreName: configStoreName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _purgeDeletedDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Permanently deletes the specified configuration store. */
export function purgeDeleted(
  context: Client,
  location: string,
  configStoreName: string,
  options: ConfigurationStoresPurgeDeletedOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _purgeDeletedDeserialize, ["202", "200", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _purgeDeletedSend(context, location, configStoreName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getDeletedSend(
  context: Client,
  location: string,
  configStoreName: string,
  options: ConfigurationStoresGetDeletedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AppConfiguration/locations/{location}/deletedConfigurationStores/{configStoreName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      configStoreName: configStoreName,
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

export async function _getDeletedDeserialize(
  result: PathUncheckedResponse,
): Promise<DeletedConfigurationStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deletedConfigurationStoreDeserializer(result.body);
}

/** Gets a deleted Azure app configuration store. */
export async function getDeleted(
  context: Client,
  location: string,
  configStoreName: string,
  options: ConfigurationStoresGetDeletedOptionalParams = { requestOptions: {} },
): Promise<DeletedConfigurationStore> {
  const result = await _getDeletedSend(context, location, configStoreName, options);
  return _getDeletedDeserialize(result);
}

export function _regenerateKeySend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  regenerateKeyParameters: RegenerateKeyParameters,
  options: ConfigurationStoresRegenerateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/regenerateKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: regenerateKeyParametersSerializer(regenerateKeyParameters),
  });
}

export async function _regenerateKeyDeserialize(result: PathUncheckedResponse): Promise<ApiKey> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return apiKeyDeserializer(result.body);
}

/** Regenerates an access key for the specified configuration store. */
export async function regenerateKey(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  regenerateKeyParameters: RegenerateKeyParameters,
  options: ConfigurationStoresRegenerateKeyOptionalParams = { requestOptions: {} },
): Promise<ApiKey> {
  const result = await _regenerateKeySend(
    context,
    resourceGroupName,
    configStoreName,
    regenerateKeyParameters,
    options,
  );
  return _regenerateKeyDeserialize(result);
}

export function _listKeysSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  options: ConfigurationStoresListKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}/listKeys{?api%2Dversion,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      "api%2Dversion": context.apiVersion,
      "%24skipToken": options?.skipToken,
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
): Promise<_ApiKeyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _apiKeyListResultDeserializer(result.body);
}

/** Lists the access key for the specified configuration store. */
export function listKeys(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  options: ConfigurationStoresListKeysOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ApiKey> {
  return buildPagedAsyncIterator(
    context,
    () => _listKeysSend(context, resourceGroupName, configStoreName, options),
    _listKeysDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listSend(
  context: Client,
  options: ConfigurationStoresListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AppConfiguration/configurationStores{?api%2Dversion,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      "%24skipToken": options?.skipToken,
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
): Promise<_ConfigurationStoreListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _configurationStoreListResultDeserializer(result.body);
}

/** Lists the configuration stores for a given subscription. */
export function list(
  context: Client,
  options: ConfigurationStoresListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConfigurationStore> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ConfigurationStoresListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores{?api%2Dversion,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
      "%24skipToken": options?.skipToken,
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
): Promise<_ConfigurationStoreListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _configurationStoreListResultDeserializer(result.body);
}

/** Lists the configuration stores for a given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ConfigurationStoresListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConfigurationStore> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  options: ConfigurationStoresDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a configuration store. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  options: ConfigurationStoresDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, configStoreName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  configStoreUpdateParameters: ConfigurationStoreUpdateParameters,
  options: ConfigurationStoresUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: configurationStoreUpdateParametersSerializer(configStoreUpdateParameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfigurationStore> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return configurationStoreDeserializer(result.body);
}

/** Updates a configuration store with the specified parameters. */
export function update(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  configStoreUpdateParameters: ConfigurationStoreUpdateParameters,
  options: ConfigurationStoresUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConfigurationStore>, ConfigurationStore> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        configStoreName,
        configStoreUpdateParameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ConfigurationStore>, ConfigurationStore>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  configStoreCreationParameters: ConfigurationStore,
  options: ConfigurationStoresCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: configurationStoreSerializer(configStoreCreationParameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ConfigurationStore> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return configurationStoreDeserializer(result.body);
}

/** Creates a configuration store with the specified parameters. */
export function create(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  configStoreCreationParameters: ConfigurationStore,
  options: ConfigurationStoresCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConfigurationStore>, ConfigurationStore> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        configStoreName,
        configStoreCreationParameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ConfigurationStore>, ConfigurationStore>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  options: ConfigurationStoresGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/{configStoreName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      configStoreName: configStoreName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ConfigurationStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return configurationStoreDeserializer(result.body);
}

/** Gets the properties of the specified configuration store. */
export async function get(
  context: Client,
  resourceGroupName: string,
  configStoreName: string,
  options: ConfigurationStoresGetOptionalParams = { requestOptions: {} },
): Promise<ConfigurationStore> {
  const result = await _getSend(context, resourceGroupName, configStoreName, options);
  return _getDeserialize(result);
}
