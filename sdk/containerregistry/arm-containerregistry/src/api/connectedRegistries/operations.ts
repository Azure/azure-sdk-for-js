// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext as Client } from "../index.js";
import type {
  ConnectedRegistry,
  ConnectedRegistryUpdateParameters,
  _ConnectedRegistryListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  connectedRegistrySerializer,
  connectedRegistryDeserializer,
  connectedRegistryUpdateParametersSerializer,
  _connectedRegistryListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConnectedRegistriesDeactivateOptionalParams,
  ConnectedRegistriesListOptionalParams,
  ConnectedRegistriesDeleteOptionalParams,
  ConnectedRegistriesUpdateOptionalParams,
  ConnectedRegistriesCreateOptionalParams,
  ConnectedRegistriesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _deactivateSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  connectedRegistryName: string,
  options: ConnectedRegistriesDeactivateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/connectedRegistries/{connectedRegistryName}/deactivate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      connectedRegistryName: connectedRegistryName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _deactivateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deactivates the connected registry instance. */
export function deactivate(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  connectedRegistryName: string,
  options: ConnectedRegistriesDeactivateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deactivateDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deactivateSend(context, resourceGroupName, registryName, connectedRegistryName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: ConnectedRegistriesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/connectedRegistries{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      "api%2Dversion": context.apiVersion,
      "%24filter": options?.filter,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ConnectedRegistryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _connectedRegistryListResultDeserializer(result.body);
}

/** Lists all connected registries for the specified container registry. */
export function list(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  options: ConnectedRegistriesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConnectedRegistry> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, registryName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  connectedRegistryName: string,
  options: ConnectedRegistriesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/connectedRegistries/{connectedRegistryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      connectedRegistryName: connectedRegistryName,
      "api%2Dversion": context.apiVersion,
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

/** Deletes a connected registry from a container registry. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  connectedRegistryName: string,
  options: ConnectedRegistriesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, registryName, connectedRegistryName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  connectedRegistryName: string,
  connectedRegistryUpdateParameters: ConnectedRegistryUpdateParameters,
  options: ConnectedRegistriesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/connectedRegistries/{connectedRegistryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      connectedRegistryName: connectedRegistryName,
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
    body: connectedRegistryUpdateParametersSerializer(connectedRegistryUpdateParameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectedRegistry> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return connectedRegistryDeserializer(result.body);
}

/** Updates a connected registry with the specified parameters. */
export function update(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  connectedRegistryName: string,
  connectedRegistryUpdateParameters: ConnectedRegistryUpdateParameters,
  options: ConnectedRegistriesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConnectedRegistry>, ConnectedRegistry> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        registryName,
        connectedRegistryName,
        connectedRegistryUpdateParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ConnectedRegistry>, ConnectedRegistry>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  connectedRegistryName: string,
  connectedRegistryCreateParameters: ConnectedRegistry,
  options: ConnectedRegistriesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/connectedRegistries/{connectedRegistryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      connectedRegistryName: connectedRegistryName,
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
    body: connectedRegistrySerializer(connectedRegistryCreateParameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ConnectedRegistry> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return connectedRegistryDeserializer(result.body);
}

/** Creates a connected registry for a container registry with the specified parameters. */
export function create(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  connectedRegistryName: string,
  connectedRegistryCreateParameters: ConnectedRegistry,
  options: ConnectedRegistriesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ConnectedRegistry>, ConnectedRegistry> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        registryName,
        connectedRegistryName,
        connectedRegistryCreateParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ConnectedRegistry>, ConnectedRegistry>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  connectedRegistryName: string,
  options: ConnectedRegistriesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/{registryName}/connectedRegistries/{connectedRegistryName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      registryName: registryName,
      connectedRegistryName: connectedRegistryName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ConnectedRegistry> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return connectedRegistryDeserializer(result.body);
}

/** Gets the properties of the connected registry. */
export async function get(
  context: Client,
  resourceGroupName: string,
  registryName: string,
  connectedRegistryName: string,
  options: ConnectedRegistriesGetOptionalParams = { requestOptions: {} },
): Promise<ConnectedRegistry> {
  const result = await _getSend(
    context,
    resourceGroupName,
    registryName,
    connectedRegistryName,
    options,
  );
  return _getDeserialize(result);
}
