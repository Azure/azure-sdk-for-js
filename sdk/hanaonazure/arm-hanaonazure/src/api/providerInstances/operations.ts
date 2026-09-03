// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HanaManagementContext as Client } from "../index.js";
import type { ProviderInstance, _ProviderInstanceListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  providerInstanceSerializer,
  providerInstanceDeserializer,
  _providerInstanceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProviderInstancesListOptionalParams,
  ProviderInstancesDeleteOptionalParams,
  ProviderInstancesCreateOptionalParams,
  ProviderInstancesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  sapMonitorName: string,
  options: ProviderInstancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HanaOnAzure/sapMonitors/{sapMonitorName}/providerInstances{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProviderInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _providerInstanceListResultDeserializer(result.body);
}

/** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
export function list(
  context: Client,
  resourceGroupName: string,
  sapMonitorName: string,
  options: ProviderInstancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProviderInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, sapMonitorName, options),
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
  providerInstanceName: string,
  options: ProviderInstancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HanaOnAzure/sapMonitors/{sapMonitorName}/providerInstances/{providerInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapMonitorName: sapMonitorName,
      providerInstanceName: providerInstanceName,
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
  providerInstanceName: string,
  options: ProviderInstancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, sapMonitorName, providerInstanceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2020-02-07-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  sapMonitorName: string,
  providerInstanceName: string,
  providerInstanceParameter: ProviderInstance,
  options: ProviderInstancesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HanaOnAzure/sapMonitors/{sapMonitorName}/providerInstances/{providerInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapMonitorName: sapMonitorName,
      providerInstanceName: providerInstanceName,
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
    body: providerInstanceSerializer(providerInstanceParameter),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<ProviderInstance> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return providerInstanceDeserializer(result.body);
}

/** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
export function create(
  context: Client,
  resourceGroupName: string,
  sapMonitorName: string,
  providerInstanceName: string,
  providerInstanceParameter: ProviderInstance,
  options: ProviderInstancesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProviderInstance>, ProviderInstance> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        sapMonitorName,
        providerInstanceName,
        providerInstanceParameter,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2020-02-07-preview",
  }) as PollerLike<OperationState<ProviderInstance>, ProviderInstance>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  sapMonitorName: string,
  providerInstanceName: string,
  options: ProviderInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HanaOnAzure/sapMonitors/{sapMonitorName}/providerInstances/{providerInstanceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      sapMonitorName: sapMonitorName,
      providerInstanceName: providerInstanceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ProviderInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return providerInstanceDeserializer(result.body);
}

/** The product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023. */
export async function get(
  context: Client,
  resourceGroupName: string,
  sapMonitorName: string,
  providerInstanceName: string,
  options: ProviderInstancesGetOptionalParams = { requestOptions: {} },
): Promise<ProviderInstance> {
  const result = await _getSend(
    context,
    resourceGroupName,
    sapMonitorName,
    providerInstanceName,
    options,
  );
  return _getDeserialize(result);
}
