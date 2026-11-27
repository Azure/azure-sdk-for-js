// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type {
  _ServerFarmSiloCollection,
  ServerFarmSilo,
  ServerFarmSiloTagsUpdate,
  ServerFarmSiloVnetIntegrationsResult,
} from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  _serverFarmSiloCollectionDeserializer,
  serverFarmSiloSerializer,
  serverFarmSiloDeserializer,
  serverFarmSiloTagsUpdateSerializer,
  serverFarmSiloVnetIntegrationsResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServerFarmSiloResourcesGetServerFarmSiloVnetIntegrationsOptionalParams,
  ServerFarmSiloResourcesDeleteServerFarmSiloOptionalParams,
  ServerFarmSiloResourcesUpdateServerFarmSiloOptionalParams,
  ServerFarmSiloResourcesCreateOrUpdateServerFarmSiloOptionalParams,
  ServerFarmSiloResourcesGetServerFarmSiloOptionalParams,
  ServerFarmSiloResourcesListServerFarmSilosOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getServerFarmSiloVnetIntegrationsSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: ServerFarmSiloResourcesGetServerFarmSiloVnetIntegrationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/silos/{siloName}/virtualNetworkIntegrations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      siloName: siloName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
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

export async function _getServerFarmSiloVnetIntegrationsDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerFarmSiloVnetIntegrationsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverFarmSiloVnetIntegrationsResultDeserializer(result.body);
}

/** Gets the virtual network integrations associated with an App Service plan silo. */
export async function getServerFarmSiloVnetIntegrations(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: ServerFarmSiloResourcesGetServerFarmSiloVnetIntegrationsOptionalParams = {
    requestOptions: {},
  },
): Promise<ServerFarmSiloVnetIntegrationsResult> {
  const result = await _getServerFarmSiloVnetIntegrationsSend(
    context,
    resourceGroupName,
    name,
    siloName,
    options,
  );
  return _getServerFarmSiloVnetIntegrationsDeserialize(result);
}

export function _deleteServerFarmSiloSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: ServerFarmSiloResourcesDeleteServerFarmSiloOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/silos/{siloName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      siloName: siloName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteServerFarmSiloDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a silo for an App Service plan. */
export function deleteServerFarmSilo(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: ServerFarmSiloResourcesDeleteServerFarmSiloOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteServerFarmSiloDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteServerFarmSiloSend(context, resourceGroupName, name, siloName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateServerFarmSiloSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  properties: ServerFarmSiloTagsUpdate,
  options: ServerFarmSiloResourcesUpdateServerFarmSiloOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/silos/{siloName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      siloName: siloName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serverFarmSiloTagsUpdateSerializer(properties),
  });
}

export async function _updateServerFarmSiloDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerFarmSilo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverFarmSiloDeserializer(result.body);
}

/** Updates only the tags of an App Service plan silo. Silo configuration and provisioning state are not modified. */
export async function updateServerFarmSilo(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  properties: ServerFarmSiloTagsUpdate,
  options: ServerFarmSiloResourcesUpdateServerFarmSiloOptionalParams = { requestOptions: {} },
): Promise<ServerFarmSilo> {
  const result = await _updateServerFarmSiloSend(
    context,
    resourceGroupName,
    name,
    siloName,
    properties,
    options,
  );
  return _updateServerFarmSiloDeserialize(result);
}

export function _createOrUpdateServerFarmSiloSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  resource: ServerFarmSilo,
  options: ServerFarmSiloResourcesCreateOrUpdateServerFarmSiloOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/silos/{siloName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      siloName: siloName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: serverFarmSiloSerializer(resource),
  });
}

export async function _createOrUpdateServerFarmSiloDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerFarmSilo> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverFarmSiloDeserializer(result.body);
}

/** Creates or updates a silo for an App Service plan. Returns 202 with polling headers when background work is queued, or 200 when no update is needed. */
export function createOrUpdateServerFarmSilo(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  resource: ServerFarmSilo,
  options: ServerFarmSiloResourcesCreateOrUpdateServerFarmSiloOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ServerFarmSilo>, ServerFarmSilo> {
  return getLongRunningPoller(
    context,
    _createOrUpdateServerFarmSiloDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateServerFarmSiloSend(
          context,
          resourceGroupName,
          name,
          siloName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
      apiVersion: context.apiVersion ?? "2026-08-01",
    },
  ) as PollerLike<OperationState<ServerFarmSilo>, ServerFarmSilo>;
}

export function _getServerFarmSiloSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: ServerFarmSiloResourcesGetServerFarmSiloOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/silos/{siloName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      siloName: siloName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
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

export async function _getServerFarmSiloDeserialize(
  result: PathUncheckedResponse,
): Promise<ServerFarmSilo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serverFarmSiloDeserializer(result.body);
}

/** Gets a specific silo for an App Service plan. */
export async function getServerFarmSilo(
  context: Client,
  resourceGroupName: string,
  name: string,
  siloName: string,
  options: ServerFarmSiloResourcesGetServerFarmSiloOptionalParams = { requestOptions: {} },
): Promise<ServerFarmSilo> {
  const result = await _getServerFarmSiloSend(context, resourceGroupName, name, siloName, options);
  return _getServerFarmSiloDeserialize(result);
}

export function _listServerFarmSilosSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ServerFarmSiloResourcesListServerFarmSilosOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/serverfarms/{name}/silos{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
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

export async function _listServerFarmSilosDeserialize(
  result: PathUncheckedResponse,
): Promise<_ServerFarmSiloCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _serverFarmSiloCollectionDeserializer(result.body);
}

/** Gets all silos for an App Service plan. */
export function listServerFarmSilos(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ServerFarmSiloResourcesListServerFarmSilosOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServerFarmSilo> {
  return buildPagedAsyncIterator(
    context,
    () => _listServerFarmSilosSend(context, resourceGroupName, name, options),
    _listServerFarmSilosDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-08-01" },
  );
}
