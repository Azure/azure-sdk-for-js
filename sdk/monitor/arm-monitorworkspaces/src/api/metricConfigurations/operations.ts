// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  MetricConfigurationResource,
  _MetricConfigurationResourceListResult,
  _PagedMetricConfigurationResource,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  metricConfigurationResourceSerializer,
  metricConfigurationResourceDeserializer,
  _metricConfigurationResourceListResultDeserializer,
  _pagedMetricConfigurationResourceDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MetricConfigurationsListByMetricsContainerOptionalParams,
  MetricConfigurationsListByMetricNamespaceOptionalParams,
  MetricConfigurationsDeleteOptionalParams,
  MetricConfigurationsCreateOrUpdateOptionalParams,
  MetricConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByMetricsContainerSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  options: MetricConfigurationsListByMetricsContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/metricsContainers/{metricsContainerName}/metrics{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      metricsContainerName: metricsContainerName,
      "api%2Dversion": context.apiVersion ?? "2026-09-03-preview",
      "%24filter": options?.filter,
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

export async function _listByMetricsContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedMetricConfigurationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _pagedMetricConfigurationResourceDeserializer(result.body);
}

/**
 * Lists metrics across all namespaces in a metrics container. Resource
 * properties may be omitted in collection responses.
 */
export function listByMetricsContainer(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  options: MetricConfigurationsListByMetricsContainerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MetricConfigurationResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByMetricsContainerSend(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        metricsContainerName,
        options,
      ),
    _listByMetricsContainerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-03-preview",
    },
  );
}

export function _listByMetricNamespaceSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  encodedMetricNamespace: string,
  options: MetricConfigurationsListByMetricNamespaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/metricsContainers/{metricsContainerName}/namespaces/{encodedMetricNamespace}/metrics{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      metricsContainerName: metricsContainerName,
      encodedMetricNamespace: encodedMetricNamespace,
      "api%2Dversion": context.apiVersion ?? "2026-09-03-preview",
      "%24filter": options?.filter,
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

export async function _listByMetricNamespaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_MetricConfigurationResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _metricConfigurationResourceListResultDeserializer(result.body);
}

/**
 * Lists metrics in a metric namespace. Resource properties may be omitted
 * in collection responses.
 */
export function listByMetricNamespace(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  encodedMetricNamespace: string,
  options: MetricConfigurationsListByMetricNamespaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MetricConfigurationResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByMetricNamespaceSend(
        context,
        resourceGroupName,
        azureMonitorWorkspaceName,
        metricsContainerName,
        encodedMetricNamespace,
        options,
      ),
    _listByMetricNamespaceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-03-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  encodedMetricNamespace: string,
  encodedMetricName: string,
  options: MetricConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/metricsContainers/{metricsContainerName}/namespaces/{encodedMetricNamespace}/metrics/{encodedMetricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      metricsContainerName: metricsContainerName,
      encodedMetricNamespace: encodedMetricNamespace,
      encodedMetricName: encodedMetricName,
      "api%2Dversion": context.apiVersion ?? "2026-09-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a metric configuration. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  encodedMetricNamespace: string,
  encodedMetricName: string,
  options: MetricConfigurationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    metricsContainerName,
    encodedMetricNamespace,
    encodedMetricName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  encodedMetricNamespace: string,
  encodedMetricName: string,
  resource: MetricConfigurationResource,
  options: MetricConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/metricsContainers/{metricsContainerName}/namespaces/{encodedMetricNamespace}/metrics/{encodedMetricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      metricsContainerName: metricsContainerName,
      encodedMetricNamespace: encodedMetricNamespace,
      encodedMetricName: encodedMetricName,
      "api%2Dversion": context.apiVersion ?? "2026-09-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: metricConfigurationResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MetricConfigurationResource> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return metricConfigurationResourceDeserializer(result.body);
}

/** Creates or updates a metric configuration. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  encodedMetricNamespace: string,
  encodedMetricName: string,
  resource: MetricConfigurationResource,
  options: MetricConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<MetricConfigurationResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    metricsContainerName,
    encodedMetricNamespace,
    encodedMetricName,
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
  encodedMetricNamespace: string,
  encodedMetricName: string,
  options: MetricConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/metricsContainers/{metricsContainerName}/namespaces/{encodedMetricNamespace}/metrics/{encodedMetricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      metricsContainerName: metricsContainerName,
      encodedMetricNamespace: encodedMetricNamespace,
      encodedMetricName: encodedMetricName,
      "api%2Dversion": context.apiVersion ?? "2026-09-03-preview",
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
): Promise<MetricConfigurationResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return metricConfigurationResourceDeserializer(result.body);
}

/** Gets a metric configuration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  encodedMetricNamespace: string,
  encodedMetricName: string,
  options: MetricConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<MetricConfigurationResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    metricsContainerName,
    encodedMetricNamespace,
    encodedMetricName,
    options,
  );
  return _getDeserialize(result);
}
