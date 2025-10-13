// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import type {
  Configuration,
  _ConfigurationListResult,
  ConfigurationListForBatchUpdate,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  configurationSerializer,
  configurationDeserializer,
  _configurationListResultDeserializer,
  configurationListForBatchUpdateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConfigurationsBatchUpdateOptionalParams,
  ConfigurationsListByServerOptionalParams,
  ConfigurationsUpdateOptionalParams,
  ConfigurationsCreateOrUpdateOptionalParams,
  ConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _batchUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: ConfigurationListForBatchUpdate,
  options: ConfigurationsBatchUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/updateConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: configurationListForBatchUpdateSerializer(parameters),
  });
}

export async function _batchUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConfigurationListResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _configurationListResultDeserializer(result.body);
}

/** Update a list of configurations in a given server. */
export function batchUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  parameters: ConfigurationListForBatchUpdate,
  options: ConfigurationsBatchUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<_ConfigurationListResult>, _ConfigurationListResult> {
  return getLongRunningPoller(context, _batchUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _batchUpdateSend(context, resourceGroupName, serverName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<_ConfigurationListResult>, _ConfigurationListResult>;
}

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ConfigurationsListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/configurations{?api%2Dversion,tags,keyword,page,pageSize}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion,
      tags: options?.tags,
      keyword: options?.keyword,
      page: options?.page,
      pageSize: options?.pageSize,
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _configurationListResultDeserializer(result.body);
}

/** List all the configurations in a given server. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  options: ConfigurationsListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Configuration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  configurationName: string,
  parameters: Configuration,
  options: ConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      configurationName: configurationName,
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
    body: configurationSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Configuration> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return configurationDeserializer(result.body);
}

/** Updates a configuration of a server. */
export function update(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  configurationName: string,
  parameters: Configuration,
  options: ConfigurationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Configuration>, Configuration> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, serverName, configurationName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Configuration>, Configuration>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  configurationName: string,
  parameters: Configuration,
  options: ConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      configurationName: configurationName,
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
    body: configurationSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Configuration> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return configurationDeserializer(result.body);
}

/** Updates a configuration of a server. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  configurationName: string,
  parameters: Configuration,
  options: ConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Configuration>, Configuration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        serverName,
        configurationName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Configuration>, Configuration>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  configurationName: string,
  options: ConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforMySQL/flexibleServers/{serverName}/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      configurationName: configurationName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Configuration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return configurationDeserializer(result.body);
}

/** Gets information about a configuration of server. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  configurationName: string,
  options: ConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<Configuration> {
  const result = await _getSend(context, resourceGroupName, serverName, configurationName, options);
  return _getDeserialize(result);
}
