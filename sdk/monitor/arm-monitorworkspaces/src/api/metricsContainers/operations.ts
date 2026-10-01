// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  MetricsContainerResource,
  metricsContainerResourceSerializer,
  metricsContainerResourceDeserializer,
  _MetricsContainerResourceListResult,
  _metricsContainerResourceListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  MetricsContainersListByAzureMonitorWorkspaceOptionalParams,
  MetricsContainersCreateOrUpdateOptionalParams,
  MetricsContainersGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByAzureMonitorWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  options: MetricsContainersListByAzureMonitorWorkspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/metricsContainers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
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

export async function _listByAzureMonitorWorkspaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_MetricsContainerResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _metricsContainerResourceListResultDeserializer(result.body);
}

/** Lists metrics containers for a monitoring account. */
export function listByAzureMonitorWorkspace(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  options: MetricsContainersListByAzureMonitorWorkspaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MetricsContainerResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByAzureMonitorWorkspaceSend(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        options,
      ),
    _listByAzureMonitorWorkspaceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-10-03" },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  resource: MetricsContainerResource,
  options: MetricsContainersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/metricsContainers/{metricsContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      metricsContainerName: metricsContainerName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: metricsContainerResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MetricsContainerResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return metricsContainerResourceDeserializer(result.body);
}

/** Creates or updates metrics container settings for a monitoring account. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  resource: MetricsContainerResource,
  options: MetricsContainersCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<MetricsContainerResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    metricsContainerName,
    resource,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  options: MetricsContainersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/metricsContainers/{metricsContainerName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      metricsContainerName: metricsContainerName,
      "api%2Dversion": context.apiVersion ?? "2025-10-03",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MetricsContainerResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return metricsContainerResourceDeserializer(result.body);
}

/** Gets metrics container settings for a monitoring account. */
export async function get(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  options: MetricsContainersGetOptionalParams = { requestOptions: {} },
): Promise<MetricsContainerResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    metricsContainerName,
    options,
  );
  return _getDeserialize(result);
}
