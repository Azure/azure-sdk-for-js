// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageCacheManagementContext as Client } from "../index.js";
import type {
  RebalanceJob,
  RebalanceJobUpdate,
  _RebalanceJobsListResult,
} from "../../models/models.js";
import {
  rebalanceJobDeserializer,
  errorResponseDeserializer,
  rebalanceJobUpdateSerializer,
  _rebalanceJobsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RebalanceJobsListByAmlFilesystemOptionalParams,
  RebalanceJobsDeleteOptionalParams,
  RebalanceJobsUpdateOptionalParams,
  RebalanceJobsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByAmlFilesystemSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  options: RebalanceJobsListByAmlFilesystemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/rebalanceJobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
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

export async function _listByAmlFilesystemDeserialize(
  result: PathUncheckedResponse,
): Promise<_RebalanceJobsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _rebalanceJobsListResultDeserializer(result.body);
}

/** Returns all the rebalance jobs the user has access to under an AML File System. */
export function listByAmlFilesystem(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  options: RebalanceJobsListByAmlFilesystemOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RebalanceJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAmlFilesystemSend(context, resourceGroupName, amlFilesystemName, options),
    _listByAmlFilesystemDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-08-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  rebalanceJobName: string,
  options: RebalanceJobsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/rebalanceJobs/{rebalanceJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      rebalanceJobName: rebalanceJobName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
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

/** Schedules a rebalance job for deletion. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  rebalanceJobName: string,
  options: RebalanceJobsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, amlFilesystemName, rebalanceJobName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  rebalanceJobName: string,
  properties: RebalanceJobUpdate,
  options: RebalanceJobsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/rebalanceJobs/{rebalanceJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      rebalanceJobName: rebalanceJobName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: rebalanceJobUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<RebalanceJob> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return rebalanceJobDeserializer(result.body);
}

/** Update a rebalance job instance. */
export function update(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  rebalanceJobName: string,
  properties: RebalanceJobUpdate,
  options: RebalanceJobsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RebalanceJob>, RebalanceJob> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        amlFilesystemName,
        rebalanceJobName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-01",
  }) as PollerLike<OperationState<RebalanceJob>, RebalanceJob>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  rebalanceJobName: string,
  options: RebalanceJobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/rebalanceJobs/{rebalanceJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      rebalanceJobName: rebalanceJobName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RebalanceJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return rebalanceJobDeserializer(result.body);
}

/** Returns a rebalance job. */
export async function get(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  rebalanceJobName: string,
  options: RebalanceJobsGetOptionalParams = { requestOptions: {} },
): Promise<RebalanceJob> {
  const result = await _getSend(
    context,
    resourceGroupName,
    amlFilesystemName,
    rebalanceJobName,
    options,
  );
  return _getDeserialize(result);
}
