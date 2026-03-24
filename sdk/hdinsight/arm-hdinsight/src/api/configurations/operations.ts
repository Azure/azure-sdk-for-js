// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HDInsightManagementContext as Client } from "../index.js";
import type { ClusterConfigurations } from "../../models/models.js";
import {
  errorResponseDeserializer,
  clusterConfigurationsDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConfigurationsGetOptionalParams,
  ConfigurationsUpdateOptionalParams,
  ConfigurationsListOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  options: ConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
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
): Promise<Record<string, string>> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return Object.fromEntries(Object.entries(result.body).map(([k, p]: [string, any]) => [k, p]));
}

/** The configuration object for the specified cluster. This API is not recommended and might be removed in the future. Please consider using List configurations API instead. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  options: ConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<Record<string, string>> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    configurationName,
    options,
  );
  return _getDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  parameters: Record<string, string>,
  options: ConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/configurations/{configurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      configurationName: configurationName,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: parameters,
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Configures the HTTP settings on the specified cluster. This API is deprecated, please use UpdateGatewaySettings in cluster endpoint instead. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  configurationName: string,
  parameters: Record<string, string>,
  options: ConfigurationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "204", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, clusterName, configurationName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/configurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterConfigurations> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return clusterConfigurationsDeserializer(result.body);
}

/** Gets all configuration information for an HDI cluster. */
export async function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ConfigurationsListOptionalParams = { requestOptions: {} },
): Promise<ClusterConfigurations> {
  const result = await _listSend(context, resourceGroupName, clusterName, options);
  return _listDeserialize(result);
}
