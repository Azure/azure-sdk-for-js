// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  InferenceEndpoint,
  _InferenceEndpointTrackedResourceArmPaginatedResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  inferenceEndpointSerializer,
  inferenceEndpointDeserializer,
  _inferenceEndpointTrackedResourceArmPaginatedResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  InferenceEndpointsListOptionalParams,
  InferenceEndpointsDeleteOptionalParams,
  InferenceEndpointsUpdateOptionalParams,
  InferenceEndpointsCreateOrUpdateOptionalParams,
  InferenceEndpointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  options: InferenceEndpointsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/endpoints{?api%2Dversion,count,%24skip,tags,properties,orderBy}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
      count: options?.count,
      "%24skip": options?.skip,
      tags: options?.tags,
      properties: options?.properties,
      orderBy: options?.orderBy,
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
): Promise<_InferenceEndpointTrackedResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _inferenceEndpointTrackedResourceArmPaginatedResultDeserializer(result.body);
}

/** List Inference Endpoints. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  options: InferenceEndpointsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InferenceEndpoint> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, poolName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  endpointName: string,
  options: InferenceEndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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

/** Delete InferenceEndpoint (asynchronous). */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  endpointName: string,
  options: InferenceEndpointsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, workspaceName, poolName, endpointName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  endpointName: string,
  options: InferenceEndpointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<InferenceEndpoint> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return inferenceEndpointDeserializer(result.body);
}

/** Update InferenceEndpoint (asynchronous). */
export function update(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  endpointName: string,
  options: InferenceEndpointsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InferenceEndpoint>, InferenceEndpoint> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, workspaceName, poolName, endpointName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<InferenceEndpoint>, InferenceEndpoint>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  endpointName: string,
  body: InferenceEndpoint,
  options: InferenceEndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: inferenceEndpointSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<InferenceEndpoint> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return inferenceEndpointDeserializer(result.body);
}

/** Create or update InferenceEndpoint (asynchronous). */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  endpointName: string,
  body: InferenceEndpoint,
  options: InferenceEndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InferenceEndpoint>, InferenceEndpoint> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        workspaceName,
        poolName,
        endpointName,
        body,
        options,
      ),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<OperationState<InferenceEndpoint>, InferenceEndpoint>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  endpointName: string,
  options: InferenceEndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/inferencePools/{poolName}/endpoints/{endpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      poolName: poolName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<InferenceEndpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return inferenceEndpointDeserializer(result.body);
}

/** Get InferenceEndpoint. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  poolName: string,
  endpointName: string,
  options: InferenceEndpointsGetOptionalParams = { requestOptions: {} },
): Promise<InferenceEndpoint> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    poolName,
    endpointName,
    options,
  );
  return _getDeserialize(result);
}
