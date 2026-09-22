// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBForPostgreSQLContext as Client } from "../index.js";
import type {
  Configuration,
  _ClusterConfigurationListResult,
  _ServerConfigurationListResult,
  ServerConfiguration,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  configurationDeserializer,
  _clusterConfigurationListResultDeserializer,
  _serverConfigurationListResultDeserializer,
  serverConfigurationSerializer,
  serverConfigurationDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConfigurationsUpdateOnCoordinatorOptionalParams,
  ConfigurationsGetCoordinatorOptionalParams,
  ConfigurationsUpdateOnNodeOptionalParams,
  ConfigurationsGetNodeOptionalParams,
  ConfigurationsListByServerOptionalParams,
  ConfigurationsListByClusterOptionalParams,
  ConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _updateOnCoordinatorSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  parameters: ServerConfiguration,
  options: ConfigurationsUpdateOnCoordinatorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/serverGroupsv2/{clusterName}/coordinatorConfigurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2023-03-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serverConfigurationSerializer(parameters),
  });
}

export async function _updateOnCoordinatorDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverConfigurationDeserializer(result.body);
}

/** Updates configuration of coordinator in a cluster */
export function updateOnCoordinator(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  parameters: ServerConfiguration,
  options: ConfigurationsUpdateOnCoordinatorOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServerConfiguration>, ServerConfiguration> {
  return getLongRunningPoller(context, _updateOnCoordinatorDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateOnCoordinatorSend(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2023-03-02-preview",
  }) as PollerLike<OperationState<ServerConfiguration>, ServerConfiguration>;
}

export function _getCoordinatorSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  options: ConfigurationsGetCoordinatorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/serverGroupsv2/{clusterName}/coordinatorConfigurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2023-03-02-preview",
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

export async function _getCoordinatorDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverConfigurationDeserializer(result.body);
}

/** Gets information of a configuration for coordinator. */
export async function getCoordinator(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  options: ConfigurationsGetCoordinatorOptionalParams = { requestOptions: {} },
): Promise<ServerConfiguration> {
  const result = await _getCoordinatorSend(
    context,
    resourceGroupName,
    clusterName,
    configurationName,
    options,
  );
  return _getCoordinatorDeserialize(result);
}

export function _updateOnNodeSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  parameters: ServerConfiguration,
  options: ConfigurationsUpdateOnNodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/serverGroupsv2/{clusterName}/nodeConfigurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2023-03-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serverConfigurationSerializer(parameters),
  });
}

export async function _updateOnNodeDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverConfigurationDeserializer(result.body);
}

/** Updates configuration of worker nodes in a cluster */
export function updateOnNode(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  parameters: ServerConfiguration,
  options: ConfigurationsUpdateOnNodeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServerConfiguration>, ServerConfiguration> {
  return getLongRunningPoller(context, _updateOnNodeDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateOnNodeSend(
        context,
        resourceGroupName,
        clusterName,
        configurationName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2023-03-02-preview",
  }) as PollerLike<OperationState<ServerConfiguration>, ServerConfiguration>;
}

export function _getNodeSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  options: ConfigurationsGetNodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/serverGroupsv2/{clusterName}/nodeConfigurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2023-03-02-preview",
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

export async function _getNodeDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverConfigurationDeserializer(result.body);
}

/** Gets information of a configuration for worker nodes. */
export async function getNode(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  options: ConfigurationsGetNodeOptionalParams = { requestOptions: {} },
): Promise<ServerConfiguration> {
  const result = await _getNodeSend(
    context,
    resourceGroupName,
    clusterName,
    configurationName,
    options,
  );
  return _getNodeDeserialize(result);
}

export function _listByServerSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  serverName: string,
  options: ConfigurationsListByServerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/serverGroupsv2/{clusterName}/servers/{serverName}/configurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      serverName: serverName,
      "api%2Dversion": context.apiVersion ?? "2023-03-02-preview",
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

export async function _listByServerDeserialize(
  result: PathUncheckedResponse,
): Promise<_ServerConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _serverConfigurationListResultDeserializer(result.body);
}

/** List all the configurations of a server in cluster. */
export function listByServer(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  serverName: string,
  options: ConfigurationsListByServerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServerConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServerSend(context, resourceGroupName, clusterName, serverName, options),
    _listByServerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2023-03-02-preview",
    },
  );
}

export function _listByClusterSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ConfigurationsListByClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/serverGroupsv2/{clusterName}/configurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2023-03-02-preview",
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

export async function _listByClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_ClusterConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _clusterConfigurationListResultDeserializer(result.body);
}

/** List all the configurations of a cluster. */
export function listByCluster(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ConfigurationsListByClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Configuration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByClusterSend(context, resourceGroupName, clusterName, options),
    _listByClusterDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2023-03-02-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  options: ConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DBforPostgreSQL/serverGroupsv2/{clusterName}/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2023-03-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Configuration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return configurationDeserializer(result.body);
}

/** Gets information of a configuration for coordinator and nodes. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  options: ConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<Configuration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    configurationName,
    options,
  );
  return _getDeserialize(result);
}
