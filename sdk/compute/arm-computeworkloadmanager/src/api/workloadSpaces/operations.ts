// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadManagerContext as Client } from "../index.js";
import type {
  WorkloadSpace,
  WorkloadSpaceUpdate,
  _WorkloadSpaceListResult,
} from "../../models/models.js";
import {
  workloadSpaceSerializer,
  workloadSpaceDeserializer,
  errorResponseDeserializer,
  workloadSpaceUpdateSerializer,
  _workloadSpaceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkloadSpacesListBySubscriptionOptionalParams,
  WorkloadSpacesListByResourceGroupOptionalParams,
  WorkloadSpacesDeleteOptionalParams,
  WorkloadSpacesUpdateOptionalParams,
  WorkloadSpacesCreateOrUpdateOptionalParams,
  WorkloadSpacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: WorkloadSpacesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/workloadSpaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-11-01-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkloadSpaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _workloadSpaceListResultDeserializer(result.body);
}

/** Lists workload spaces in a subscription. */
export function listBySubscription(
  context: Client,
  options: WorkloadSpacesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkloadSpace> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: WorkloadSpacesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01-preview",
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
): Promise<_WorkloadSpaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _workloadSpaceListResultDeserializer(result.body);
}

/** Lists workload spaces in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: WorkloadSpacesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WorkloadSpace> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  options: WorkloadSpacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01-preview",
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

/** Deletes a workload space and its owned resources. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  options: WorkloadSpacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, spaceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  properties: WorkloadSpaceUpdate,
  options: WorkloadSpacesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workloadSpaceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<WorkloadSpace> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workloadSpaceDeserializer(result.body);
}

/** Updates mutable workload space properties. */
export function update(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  properties: WorkloadSpaceUpdate,
  options: WorkloadSpacesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WorkloadSpace>, WorkloadSpace> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, spaceName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-11-01-preview",
  }) as PollerLike<OperationState<WorkloadSpace>, WorkloadSpace>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  resource: WorkloadSpace,
  options: WorkloadSpacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workloadSpaceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkloadSpace> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workloadSpaceDeserializer(result.body);
}

/** Creates or replaces a workload space. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  resource: WorkloadSpace,
  options: WorkloadSpacesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WorkloadSpace>, WorkloadSpace> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, spaceName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-11-01-preview",
  }) as PollerLike<OperationState<WorkloadSpace>, WorkloadSpace>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  options: WorkloadSpacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/workloadSpaces/{spaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      spaceName: spaceName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<WorkloadSpace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workloadSpaceDeserializer(result.body);
}

/** Gets a workload space. */
export async function get(
  context: Client,
  resourceGroupName: string,
  spaceName: string,
  options: WorkloadSpacesGetOptionalParams = { requestOptions: {} },
): Promise<WorkloadSpace> {
  const result = await _getSend(context, resourceGroupName, spaceName, options);
  return _getDeserialize(result);
}
