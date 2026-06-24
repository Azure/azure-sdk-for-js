// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
  ClusterMetricsConfiguration,
  clusterMetricsConfigurationSerializer,
  clusterMetricsConfigurationDeserializer,
  clusterMetricsConfigurationPatchParametersSerializer,
  _ClusterMetricsConfigurationList,
  _clusterMetricsConfigurationListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  MetricsConfigurationsListByClusterOptionalParams,
  MetricsConfigurationsDeleteOptionalParams,
  MetricsConfigurationsUpdateOptionalParams,
  MetricsConfigurationsCreateOrUpdateOptionalParams,
  MetricsConfigurationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByClusterSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: MetricsConfigurationsListByClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/metricsConfigurations{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listByClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_ClusterMetricsConfigurationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _clusterMetricsConfigurationListDeserializer(result.body);
}

/** Get a list of metrics configurations for the provided cluster. */
export function listByCluster(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: MetricsConfigurationsListByClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ClusterMetricsConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByClusterSend(context, resourceGroupName, clusterName, options),
    _listByClusterDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  metricsConfigurationName: string,
  options: MetricsConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/metricsConfigurations/{metricsConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      metricsConfigurationName: metricsConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Delete the metrics configuration of the provided cluster. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  metricsConfigurationName: string,
  options: MetricsConfigurationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, metricsConfigurationName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  metricsConfigurationName: string,
  options: MetricsConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/metricsConfigurations/{metricsConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      metricsConfigurationName: metricsConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: !options?.metricsConfigurationUpdateParameters
        ? options?.metricsConfigurationUpdateParameters
        : clusterMetricsConfigurationPatchParametersSerializer(
            options?.metricsConfigurationUpdateParameters,
          ),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterMetricsConfiguration> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterMetricsConfigurationDeserializer(result.body);
}

/** Patch properties of metrics configuration for the provided cluster, or update the tags associated with it. Properties and tag updates can be done independently. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  metricsConfigurationName: string,
  options: MetricsConfigurationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ClusterMetricsConfiguration>, ClusterMetricsConfiguration> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, clusterName, metricsConfigurationName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<ClusterMetricsConfiguration>, ClusterMetricsConfiguration>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  metricsConfigurationName: string,
  metricsConfigurationParameters: ClusterMetricsConfiguration,
  options: MetricsConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/metricsConfigurations/{metricsConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      metricsConfigurationName: metricsConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: clusterMetricsConfigurationSerializer(metricsConfigurationParameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterMetricsConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterMetricsConfigurationDeserializer(result.body);
}

/** Create new or update the existing metrics configuration of the provided cluster. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  metricsConfigurationName: string,
  metricsConfigurationParameters: ClusterMetricsConfiguration,
  options: MetricsConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ClusterMetricsConfiguration>, ClusterMetricsConfiguration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        clusterName,
        metricsConfigurationName,
        metricsConfigurationParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<ClusterMetricsConfiguration>, ClusterMetricsConfiguration>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  metricsConfigurationName: string,
  options: MetricsConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/metricsConfigurations/{metricsConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      metricsConfigurationName: metricsConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
): Promise<ClusterMetricsConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterMetricsConfigurationDeserializer(result.body);
}

/** Get metrics configuration of the provided cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  metricsConfigurationName: string,
  options: MetricsConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<ClusterMetricsConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    metricsConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
