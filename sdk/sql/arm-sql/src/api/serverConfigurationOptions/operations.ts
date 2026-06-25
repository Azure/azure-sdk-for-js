// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ServerConfigurationOption,
  serverConfigurationOptionSerializer,
  serverConfigurationOptionDeserializer,
  ServerConfigurationOptionName,
  _ServerConfigurationOptionListResult,
  _serverConfigurationOptionListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ServerConfigurationOptionsListByManagedInstanceOptionalParams,
  ServerConfigurationOptionsCreateOrUpdateOptionalParams,
  ServerConfigurationOptionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByManagedInstanceSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ServerConfigurationOptionsListByManagedInstanceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/serverConfigurationOptions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByManagedInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ServerConfigurationOptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _serverConfigurationOptionListResultDeserializer(result.body);
}

/** Gets a list of managed instance server configuration options. */
export function listByManagedInstance(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  options: ServerConfigurationOptionsListByManagedInstanceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServerConfigurationOption> {
  return buildPagedAsyncIterator(
    context,
    () => _listByManagedInstanceSend(context, resourceGroupName, managedInstanceName, options),
    _listByManagedInstanceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-01-01" },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  serverConfigurationOptionName: ServerConfigurationOptionName,
  parameters: ServerConfigurationOption,
  options: ServerConfigurationOptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/serverConfigurationOptions/{serverConfigurationOptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      serverConfigurationOptionName: serverConfigurationOptionName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: serverConfigurationOptionSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerConfigurationOption> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverConfigurationOptionDeserializer(result.body);
}

/** Updates managed instance server configuration option. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  serverConfigurationOptionName: ServerConfigurationOptionName,
  parameters: ServerConfigurationOption,
  options: ServerConfigurationOptionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServerConfigurationOption>, ServerConfigurationOption> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        managedInstanceName,
        serverConfigurationOptionName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-01",
  }) as PollerLike<OperationState<ServerConfigurationOption>, ServerConfigurationOption>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  serverConfigurationOptionName: ServerConfigurationOptionName,
  options: ServerConfigurationOptionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/serverConfigurationOptions/{serverConfigurationOptionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      serverConfigurationOptionName: serverConfigurationOptionName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerConfigurationOption> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverConfigurationOptionDeserializer(result.body);
}

/** Gets managed instance server configuration option. */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  serverConfigurationOptionName: ServerConfigurationOptionName,
  options: ServerConfigurationOptionsGetOptionalParams = { requestOptions: {} },
): Promise<ServerConfigurationOption> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    serverConfigurationOptionName,
    options,
  );
  return _getDeserialize(result);
}
