// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageCacheManagementContext as Client } from "../index.js";
import type {
  AutoImportJob,
  AutoImportJobUpdate,
  _AutoImportJobsListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  errorResponseDeserializer,
  autoImportJobSerializer,
  autoImportJobDeserializer,
  autoImportJobUpdateSerializer,
  _autoImportJobsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AutoImportJobsListByAmlFilesystemOptionalParams,
  AutoImportJobsDeleteOptionalParams,
  AutoImportJobsUpdateOptionalParams,
  AutoImportJobsCreateOrUpdateOptionalParams,
  AutoImportJobsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByAmlFilesystemSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  options: AutoImportJobsListByAmlFilesystemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoImportJobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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
): Promise<_AutoImportJobsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _autoImportJobsListResultDeserializer(result.body);
}

/** Returns all the auto import jobs the user has access to under an AML File System. */
export function listByAmlFilesystem(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  options: AutoImportJobsListByAmlFilesystemOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AutoImportJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAmlFilesystemSend(context, resourceGroupName, amlFilesystemName, options),
    _listByAmlFilesystemDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-01-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoImportJobName: string,
  options: AutoImportJobsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoImportJobs/{autoImportJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      autoImportJobName: autoImportJobName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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

/** Schedules an auto import job for deletion. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoImportJobName: string,
  options: AutoImportJobsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, amlFilesystemName, autoImportJobName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoImportJobName: string,
  autoImportJob: AutoImportJobUpdate,
  options: AutoImportJobsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoImportJobs/{autoImportJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      autoImportJobName: autoImportJobName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: autoImportJobUpdateSerializer(autoImportJob),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AutoImportJob> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return autoImportJobDeserializer(result.body);
}

/** Update an auto import job instance. */
export function update(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoImportJobName: string,
  autoImportJob: AutoImportJobUpdate,
  options: AutoImportJobsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AutoImportJob>, AutoImportJob> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoImportJobName,
        autoImportJob,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<AutoImportJob>, AutoImportJob>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoImportJobName: string,
  autoImportJob: AutoImportJob,
  options: AutoImportJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoImportJobs/{autoImportJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      autoImportJobName: autoImportJobName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: autoImportJobSerializer(autoImportJob),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AutoImportJob> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return autoImportJobDeserializer(result.body);
}

/** Create or update an auto import job. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoImportJobName: string,
  autoImportJob: AutoImportJob,
  options: AutoImportJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AutoImportJob>, AutoImportJob> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoImportJobName,
        autoImportJob,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<AutoImportJob>, AutoImportJob>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoImportJobName: string,
  options: AutoImportJobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoImportJobs/{autoImportJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      autoImportJobName: autoImportJobName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AutoImportJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return autoImportJobDeserializer(result.body);
}

/** Returns an auto import job. */
export async function get(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoImportJobName: string,
  options: AutoImportJobsGetOptionalParams = { requestOptions: {} },
): Promise<AutoImportJob> {
  const result = await _getSend(
    context,
    resourceGroupName,
    amlFilesystemName,
    autoImportJobName,
    options,
  );
  return _getDeserialize(result);
}
