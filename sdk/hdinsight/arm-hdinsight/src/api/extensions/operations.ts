// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HDInsightManagementContext as Client } from "../index.js";
import type {
  AsyncOperationResult,
  ClusterMonitoringRequest,
  ClusterMonitoringResponse,
  AzureMonitorRequest,
  AzureMonitorResponse,
  Extension,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  asyncOperationResultDeserializer,
  clusterMonitoringRequestSerializer,
  clusterMonitoringResponseDeserializer,
  azureMonitorRequestSerializer,
  azureMonitorResponseDeserializer,
  extensionSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExtensionsGetAzureAsyncOperationStatusOptionalParams,
  ExtensionsDeleteOptionalParams,
  ExtensionsGetOptionalParams,
  ExtensionsCreateOptionalParams,
  ExtensionsDisableAzureMonitorAgentOptionalParams,
  ExtensionsGetAzureMonitorAgentStatusOptionalParams,
  ExtensionsEnableAzureMonitorAgentOptionalParams,
  ExtensionsDisableAzureMonitorOptionalParams,
  ExtensionsGetAzureMonitorStatusOptionalParams,
  ExtensionsEnableAzureMonitorOptionalParams,
  ExtensionsDisableMonitoringOptionalParams,
  ExtensionsGetMonitoringStatusOptionalParams,
  ExtensionsEnableMonitoringOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getAzureAsyncOperationStatusSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  extensionName: string,
  operationId: string,
  options: ExtensionsGetAzureAsyncOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/extensions/{extensionName}/azureAsyncOperations/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      extensionName: extensionName,
      operationId: operationId,
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

export async function _getAzureAsyncOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<AsyncOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return asyncOperationResultDeserializer(result.body);
}

/** Gets the async operation status. */
export async function getAzureAsyncOperationStatus(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  extensionName: string,
  operationId: string,
  options: ExtensionsGetAzureAsyncOperationStatusOptionalParams = { requestOptions: {} },
): Promise<AsyncOperationResult> {
  const result = await _getAzureAsyncOperationStatusSend(
    context,
    resourceGroupName,
    clusterName,
    extensionName,
    operationId,
    options,
  );
  return _getAzureAsyncOperationStatusDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  extensionName: string,
  options: ExtensionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/extensions/{extensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      extensionName: extensionName,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
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

/** Deletes the specified extension for HDInsight cluster. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  extensionName: string,
  options: ExtensionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, clusterName, extensionName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  extensionName: string,
  options: ExtensionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/extensions/{extensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      extensionName: extensionName,
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
): Promise<ClusterMonitoringResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return clusterMonitoringResponseDeserializer(result.body);
}

/** Gets the extension properties for the specified HDInsight cluster extension. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  extensionName: string,
  options: ExtensionsGetOptionalParams = { requestOptions: {} },
): Promise<ClusterMonitoringResponse> {
  const result = await _getSend(context, resourceGroupName, clusterName, extensionName, options);
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  extensionName: string,
  parameters: Extension,
  options: ExtensionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/extensions/{extensionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      extensionName: extensionName,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: extensionSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Creates an HDInsight cluster extension. */
export function create(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  extensionName: string,
  parameters: Extension,
  options: ExtensionsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _createDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, clusterName, extensionName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _disableAzureMonitorAgentSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ExtensionsDisableAzureMonitorAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/extensions/azureMonitorAgent{?api%2Dversion}",
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
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableAzureMonitorAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Disables the Azure Monitor Agent on the HDInsight cluster. */
export function disableAzureMonitorAgent(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ExtensionsDisableAzureMonitorAgentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _disableAzureMonitorAgentDeserialize,
    ["200", "204", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _disableAzureMonitorAgentSend(context, resourceGroupName, clusterName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-01-15-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _getAzureMonitorAgentStatusSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ExtensionsGetAzureMonitorAgentStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/extensions/azureMonitorAgent{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getAzureMonitorAgentStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureMonitorResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return azureMonitorResponseDeserializer(result.body);
}

/** Gets the status of Azure Monitor Agent on the HDInsight cluster. */
export async function getAzureMonitorAgentStatus(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ExtensionsGetAzureMonitorAgentStatusOptionalParams = { requestOptions: {} },
): Promise<AzureMonitorResponse> {
  const result = await _getAzureMonitorAgentStatusSend(
    context,
    resourceGroupName,
    clusterName,
    options,
  );
  return _getAzureMonitorAgentStatusDeserialize(result);
}

export function _enableAzureMonitorAgentSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: AzureMonitorRequest,
  options: ExtensionsEnableAzureMonitorAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/extensions/azureMonitorAgent{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: azureMonitorRequestSerializer(parameters),
  });
}

export async function _enableAzureMonitorAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Enables the Azure Monitor Agent on the HDInsight cluster. */
export function enableAzureMonitorAgent(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: AzureMonitorRequest,
  options: ExtensionsEnableAzureMonitorAgentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _enableAzureMonitorAgentDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _enableAzureMonitorAgentSend(context, resourceGroupName, clusterName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _disableAzureMonitorSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ExtensionsDisableAzureMonitorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/extensions/azureMonitor{?api%2Dversion}",
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
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableAzureMonitorDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Disables the Azure Monitor on the HDInsight cluster. */
export function disableAzureMonitor(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ExtensionsDisableAzureMonitorOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _disableAzureMonitorDeserialize, ["200", "204", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _disableAzureMonitorSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getAzureMonitorStatusSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ExtensionsGetAzureMonitorStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/extensions/azureMonitor{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getAzureMonitorStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureMonitorResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return azureMonitorResponseDeserializer(result.body);
}

/** Gets the status of Azure Monitor on the HDInsight cluster. */
export async function getAzureMonitorStatus(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ExtensionsGetAzureMonitorStatusOptionalParams = { requestOptions: {} },
): Promise<AzureMonitorResponse> {
  const result = await _getAzureMonitorStatusSend(context, resourceGroupName, clusterName, options);
  return _getAzureMonitorStatusDeserialize(result);
}

export function _enableAzureMonitorSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: AzureMonitorRequest,
  options: ExtensionsEnableAzureMonitorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/extensions/azureMonitor{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: azureMonitorRequestSerializer(parameters),
  });
}

export async function _enableAzureMonitorDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Enables the Azure Monitor on the HDInsight cluster. */
export function enableAzureMonitor(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: AzureMonitorRequest,
  options: ExtensionsEnableAzureMonitorOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _enableAzureMonitorDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _enableAzureMonitorSend(context, resourceGroupName, clusterName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _disableMonitoringSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ExtensionsDisableMonitoringOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/extensions/clustermonitoring{?api%2Dversion}",
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
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableMonitoringDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Disables the Operations Management Suite (OMS) on the HDInsight cluster. */
export function disableMonitoring(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ExtensionsDisableMonitoringOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _disableMonitoringDeserialize, ["200", "204", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _disableMonitoringSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getMonitoringStatusSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ExtensionsGetMonitoringStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/extensions/clustermonitoring{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getMonitoringStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterMonitoringResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return clusterMonitoringResponseDeserializer(result.body);
}

/** Gets the status of Operations Management Suite (OMS) on the HDInsight cluster. */
export async function getMonitoringStatus(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ExtensionsGetMonitoringStatusOptionalParams = { requestOptions: {} },
): Promise<ClusterMonitoringResponse> {
  const result = await _getMonitoringStatusSend(context, resourceGroupName, clusterName, options);
  return _getMonitoringStatusDeserialize(result);
}

export function _enableMonitoringSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: ClusterMonitoringRequest,
  options: ExtensionsEnableMonitoringOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HDInsight/clusters/{clusterName}/extensions/clustermonitoring{?api%2Dversion}",
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
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: clusterMonitoringRequestSerializer(parameters),
  });
}

export async function _enableMonitoringDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Enables the Operations Management Suite (OMS) on the HDInsight cluster. */
export function enableMonitoring(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  parameters: ClusterMonitoringRequest,
  options: ExtensionsEnableMonitoringOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _enableMonitoringDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _enableMonitoringSend(context, resourceGroupName, clusterName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-01-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}
