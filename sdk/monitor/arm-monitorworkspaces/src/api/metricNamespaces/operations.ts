// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type {
  MetricNamespaceResource,
  _MetricNamespaceResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  metricNamespaceResourceDeserializer,
  _metricNamespaceResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  MetricNamespacesListByMetricsContainerOptionalParams,
  MetricNamespacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByMetricsContainerSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  options: MetricNamespacesListByMetricsContainerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/metricsContainers/{metricsContainerName}/namespaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      metricsContainerName: metricsContainerName,
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

export async function _listByMetricsContainerDeserialize(
  result: PathUncheckedResponse,
): Promise<_MetricNamespaceResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _metricNamespaceResourceListResultDeserializer(result.body);
}

/**
 * Lists metric namespaces for an Azure Monitor Workspace. Resource
 * properties may be omitted in collection responses.
 */
export function listByMetricsContainer(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  options: MetricNamespacesListByMetricsContainerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MetricNamespaceResource> {
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

export function _getSend(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  encodedMetricNamespace: string,
  options: MetricNamespacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Monitor/accounts/{azureMonitorWorkspaceName}/metricsContainers/{metricsContainerName}/namespaces/{encodedMetricNamespace}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureMonitorWorkspaceName: azureMonitorWorkspaceName,
      metricsContainerName: metricsContainerName,
      encodedMetricNamespace: encodedMetricNamespace,
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
): Promise<MetricNamespaceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return metricNamespaceResourceDeserializer(result.body);
}

/** Gets a metric namespace. */
export async function get(
  context: Client,
  resourceGroupName: string,
  azureMonitorWorkspaceName: string,
  metricsContainerName: string,
  encodedMetricNamespace: string,
  options: MetricNamespacesGetOptionalParams = { requestOptions: {} },
): Promise<MetricNamespaceResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    azureMonitorWorkspaceName,
    metricsContainerName,
    encodedMetricNamespace,
    options,
  );
  return _getDeserialize(result);
}
