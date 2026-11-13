// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext as Client } from "../index.js";
import type {
  ComputeConfig,
  ComputeConfigUpdate,
  _ComputeConfigListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  computeConfigSerializer,
  computeConfigDeserializer,
  computeConfigUpdateSerializer,
  _computeConfigListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ComputeConfigsListByResourceGroupOptionalParams,
  ComputeConfigsDeleteOptionalParams,
  ComputeConfigsUpdateOptionalParams,
  ComputeConfigsCreateOrUpdateOptionalParams,
  ComputeConfigsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  options: ComputeConfigsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/computeConfigs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ComputeConfigListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _computeConfigListResultDeserializer(result.body);
}

/** Lists compute configs in a cloud. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  options: ComputeConfigsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ComputeConfig> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, cloudName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  computeConfigName: string,
  options: ComputeConfigsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/computeConfigs/{computeConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      computeConfigName: computeConfigName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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

/** Deletes a compute config. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  computeConfigName: string,
  options: ComputeConfigsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, cloudName, computeConfigName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  computeConfigName: string,
  properties: ComputeConfigUpdate,
  options: ComputeConfigsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/computeConfigs/{computeConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      computeConfigName: computeConfigName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: computeConfigUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ComputeConfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return computeConfigDeserializer(result.body);
}

/** Updates a compute config. */
export async function update(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  computeConfigName: string,
  properties: ComputeConfigUpdate,
  options: ComputeConfigsUpdateOptionalParams = { requestOptions: {} },
): Promise<ComputeConfig> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    cloudName,
    computeConfigName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  computeConfigName: string,
  resource: ComputeConfig,
  options: ComputeConfigsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/computeConfigs/{computeConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      computeConfigName: computeConfigName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: computeConfigSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ComputeConfig> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return computeConfigDeserializer(result.body);
}

/** Creates or updates a compute config. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  computeConfigName: string,
  resource: ComputeConfig,
  options: ComputeConfigsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ComputeConfig>, ComputeConfig> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        cloudName,
        computeConfigName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-09-01",
  }) as PollerLike<OperationState<ComputeConfig>, ComputeConfig>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  computeConfigName: string,
  options: ComputeConfigsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/computeConfigs/{computeConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      computeConfigName: computeConfigName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ComputeConfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return computeConfigDeserializer(result.body);
}

/** Gets a compute config. */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  computeConfigName: string,
  options: ComputeConfigsGetOptionalParams = { requestOptions: {} },
): Promise<ComputeConfig> {
  const result = await _getSend(context, resourceGroupName, cloudName, computeConfigName, options);
  return _getDeserialize(result);
}
