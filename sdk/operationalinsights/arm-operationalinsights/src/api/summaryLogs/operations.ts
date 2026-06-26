// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SummaryLogs,
  summaryLogsSerializer,
  summaryLogsDeserializer,
  _SummaryLogsListResult,
  _summaryLogsListResultDeserializer,
  SummaryLogsRetryBin,
  summaryLogsRetryBinSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SummaryLogsRetryBinOptionalParams,
  SummaryLogsStopOptionalParams,
  SummaryLogsStartOptionalParams,
  SummaryLogsListByWorkspaceOptionalParams,
  SummaryLogsDeleteOptionalParams,
  SummaryLogsCreateOrUpdateOptionalParams,
  SummaryLogsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _retryBinSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  summaryLogsName: string,
  parameters: SummaryLogsRetryBin,
  options: SummaryLogsRetryBinOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/summaryLogs/{summaryLogsName}/retrybin{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      summaryLogsName: summaryLogsName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: summaryLogsRetryBinSerializer(parameters),
    });
}

export async function _retryBinDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Retries a failed Summary rule bin. */
export function retryBin(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  summaryLogsName: string,
  parameters: SummaryLogsRetryBin,
  options: SummaryLogsRetryBinOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _retryBinDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _retryBinSend(
        context,
        resourceGroupName,
        workspaceName,
        summaryLogsName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  summaryLogsName: string,
  options: SummaryLogsStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/summaryLogs/{summaryLogsName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      summaryLogsName: summaryLogsName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Stops an active Summary rule. */
export async function stop(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  summaryLogsName: string,
  options: SummaryLogsStopOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSend(
    context,
    resourceGroupName,
    workspaceName,
    summaryLogsName,
    options,
  );
  return _stopDeserialize(result);
}

export function _startSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  summaryLogsName: string,
  options: SummaryLogsStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/summaryLogs/{summaryLogsName}/start{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      summaryLogsName: summaryLogsName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Starts an inactive Summary rule. */
export function start(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  summaryLogsName: string,
  options: SummaryLogsStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, resourceGroupName, workspaceName, summaryLogsName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listByWorkspaceSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: SummaryLogsListByWorkspaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/summaryLogs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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

export async function _listByWorkspaceDeserialize(
  result: PathUncheckedResponse,
): Promise<_SummaryLogsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _summaryLogsListResultDeserializer(result.body);
}

/** Gets all summary rules for the specified Log Analytics workspace. */
export function listByWorkspace(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: SummaryLogsListByWorkspaceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SummaryLogs> {
  return buildPagedAsyncIterator(
    context,
    () => _listByWorkspaceSend(context, resourceGroupName, workspaceName, options),
    _listByWorkspaceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  summaryLogsName: string,
  options: SummaryLogsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/summaryLogs/{summaryLogsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      summaryLogsName: summaryLogsName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes Log Analytics workspace Summary rules. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  summaryLogsName: string,
  options: SummaryLogsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, workspaceName, summaryLogsName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  summaryLogsName: string,
  parameters: SummaryLogs,
  options: SummaryLogsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/summaryLogs/{summaryLogsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      summaryLogsName: summaryLogsName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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
      body: summaryLogsSerializer(parameters),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SummaryLogs> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return summaryLogsDeserializer(result.body);
}

/** Creates or updates Log Analytics workspace Summary rules. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  summaryLogsName: string,
  parameters: SummaryLogs,
  options: SummaryLogsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SummaryLogs>, SummaryLogs> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        workspaceName,
        summaryLogsName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-01",
  }) as PollerLike<OperationState<SummaryLogs>, SummaryLogs>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  summaryLogsName: string,
  options: SummaryLogsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/summaryLogs/{summaryLogsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      summaryLogsName: summaryLogsName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SummaryLogs> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return summaryLogsDeserializer(result.body);
}

/** Gets Log Analytics workspace Summary rules. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  summaryLogsName: string,
  options: SummaryLogsGetOptionalParams = { requestOptions: {} },
): Promise<SummaryLogs> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    summaryLogsName,
    options,
  );
  return _getDeserialize(result);
}
