// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HanaManagementContext as Client } from "../index.js";
import type { SapMonitor, Tags, _SapMonitorListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  sapMonitorSerializer,
  sapMonitorDeserializer,
  tagsSerializer,
  _sapMonitorListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SapMonitorsListOptionalParams,
  SapMonitorsDeleteOptionalParams,
  SapMonitorsUpdateOptionalParams,
  SapMonitorsCreateOptionalParams,
  SapMonitorsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  options: SapMonitorsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HanaOnAzure/sapMonitors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2020-02-07-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SapMonitorListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sapMonitorListResultDeserializer(result.body);
}

/** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
export function list(
  context: Client,
  options: SapMonitorsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SapMonitor> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2020-02-07-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  sapMonitorName: string,
  options: SapMonitorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HanaOnAzure/sapMonitors/{sapMonitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapMonitorName: sapMonitorName,
      "api%2Dversion": context.apiVersion ?? "2020-02-07-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  sapMonitorName: string,
  options: SapMonitorsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, sapMonitorName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2020-02-07-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  sapMonitorName: string,
  tagsParameter: Tags,
  options: SapMonitorsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HanaOnAzure/sapMonitors/{sapMonitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapMonitorName: sapMonitorName,
      "api%2Dversion": context.apiVersion ?? "2020-02-07-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsSerializer(tagsParameter),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SapMonitor> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sapMonitorDeserializer(result.body);
}

/** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
export async function update(
  context: Client,
  resourceGroupName: string,
  sapMonitorName: string,
  tagsParameter: Tags,
  options: SapMonitorsUpdateOptionalParams = { requestOptions: {} },
): Promise<SapMonitor> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    sapMonitorName,
    tagsParameter,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  sapMonitorName: string,
  sapMonitorParameter: SapMonitor,
  options: SapMonitorsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HanaOnAzure/sapMonitors/{sapMonitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapMonitorName: sapMonitorName,
      "api%2Dversion": context.apiVersion ?? "2020-02-07-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: sapMonitorSerializer(sapMonitorParameter),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<SapMonitor> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sapMonitorDeserializer(result.body);
}

/** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
export function create(
  context: Client,
  resourceGroupName: string,
  sapMonitorName: string,
  sapMonitorParameter: SapMonitor,
  options: SapMonitorsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SapMonitor>, SapMonitor> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, sapMonitorName, sapMonitorParameter, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2020-02-07-preview",
  }) as PollerLike<OperationState<SapMonitor>, SapMonitor>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sapMonitorName: string,
  options: SapMonitorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HanaOnAzure/sapMonitors/{sapMonitorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapMonitorName: sapMonitorName,
      "api%2Dversion": context.apiVersion ?? "2020-02-07-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SapMonitor> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sapMonitorDeserializer(result.body);
}

/** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
export async function get(
  context: Client,
  resourceGroupName: string,
  sapMonitorName: string,
  options: SapMonitorsGetOptionalParams = { requestOptions: {} },
): Promise<SapMonitor> {
  const result = await _getSend(context, resourceGroupName, sapMonitorName, options);
  return _getDeserialize(result);
}
