// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type {
  CalculateCostResponse,
  CustomAIModel,
  _CustomAIModelListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  calculateCostResponseDeserializer,
  customAIModelSerializer,
  customAIModelDeserializer,
  _customAIModelListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CustomAIModelsCalculateCostOptionalParams,
  CustomAIModelsListOptionalParams,
  CustomAIModelsDeleteOptionalParams,
  CustomAIModelsCreateOrUpdateOptionalParams,
  CustomAIModelsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _calculateCostSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  customAIModelName: string,
  options: CustomAIModelsCalculateCostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/customAIModels/{customAIModelName}/calculateCost{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      customAIModelName: customAIModelName,
      "api%2Dversion": context.apiVersion ?? "2026-09-02-preview",
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

export async function _calculateCostDeserialize(
  result: PathUncheckedResponse,
): Promise<CalculateCostResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return calculateCostResponseDeserializer(result.body);
}

/** Returns a ranked list of GPU SKU pricing plans for deploying this custom model in the target region, each annotated with feasibility and per-replica hourly cost. Feasibility is determined by region availability, GPU quota, and model architecture fit (verified at registration time). `servingPerformanceEstimation` is omitted for custom models. No Azure or Kubernetes resources are provisioned. */
export async function calculateCost(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  customAIModelName: string,
  options: CustomAIModelsCalculateCostOptionalParams = { requestOptions: {} },
): Promise<CalculateCostResponse> {
  const result = await _calculateCostSend(
    context,
    resourceGroupName,
    aiManagerName,
    customAIModelName,
    options,
  );
  return _calculateCostDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  options: CustomAIModelsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/customAIModels{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      "api%2Dversion": context.apiVersion ?? "2026-09-02-preview",
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
): Promise<_CustomAIModelListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _customAIModelListResultDeserializer(result.body);
}

/** List CustomAIModel resources by AIManager */
export function list(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  options: CustomAIModelsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CustomAIModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, aiManagerName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  customAIModelName: string,
  options: CustomAIModelsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/customAIModels/{customAIModelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      customAIModelName: customAIModelName,
      "api%2Dversion": context.apiVersion ?? "2026-09-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
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

/** Delete a CustomAIModel */
export function $delete(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  customAIModelName: string,
  options: CustomAIModelsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, aiManagerName, customAIModelName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  customAIModelName: string,
  resource: CustomAIModel,
  options: CustomAIModelsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/customAIModels/{customAIModelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      customAIModelName: customAIModelName,
      "api%2Dversion": context.apiVersion ?? "2026-09-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: customAIModelSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CustomAIModel> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return customAIModelDeserializer(result.body);
}

/** Create or update a `CustomAIModel`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields (e.g. `description`), perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header. A PUT that changes the immutable `modelId` or `modelSourceResourceId` is rejected. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  customAIModelName: string,
  resource: CustomAIModel,
  options: CustomAIModelsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CustomAIModel>, CustomAIModel> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        aiManagerName,
        customAIModelName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-09-02-preview",
  }) as PollerLike<OperationState<CustomAIModel>, CustomAIModel>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  customAIModelName: string,
  options: CustomAIModelsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/aiManagers/{aiManagerName}/customAIModels/{customAIModelName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      aiManagerName: aiManagerName,
      customAIModelName: customAIModelName,
      "api%2Dversion": context.apiVersion ?? "2026-09-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CustomAIModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return customAIModelDeserializer(result.body);
}

/** Get a CustomAIModel */
export async function get(
  context: Client,
  resourceGroupName: string,
  aiManagerName: string,
  customAIModelName: string,
  options: CustomAIModelsGetOptionalParams = { requestOptions: {} },
): Promise<CustomAIModel> {
  const result = await _getSend(
    context,
    resourceGroupName,
    aiManagerName,
    customAIModelName,
    options,
  );
  return _getDeserialize(result);
}
