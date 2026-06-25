// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  errorResponseDeserializer,
  ImportJob,
  importJobSerializer,
  importJobDeserializer,
  ImportJobUpdate,
  importJobUpdateSerializer,
  _ImportJobsListResult,
  _importJobsListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ImportJobsListByAmlFilesystemOptionalParams,
  ImportJobsDeleteOptionalParams,
  ImportJobsUpdateOptionalParams,
  ImportJobsCreateOrUpdateOptionalParams,
  ImportJobsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByAmlFilesystemSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  options: ImportJobsListByAmlFilesystemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/importJobs{?api%2Dversion}",
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByAmlFilesystemDeserialize(
  result: PathUncheckedResponse,
): Promise<_ImportJobsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _importJobsListResultDeserializer(result.body);
}

/** Returns all import jobs the user has access to under an AML File System. */
export function listByAmlFilesystem(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  options: ImportJobsListByAmlFilesystemOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ImportJob> {
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
  importJobName: string,
  options: ImportJobsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/importJobs/{importJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      importJobName: importJobName,
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

/** Schedules an import job for deletion. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  importJobName: string,
  options: ImportJobsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, amlFilesystemName, importJobName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  importJobName: string,
  importJob: ImportJobUpdate,
  options: ImportJobsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/importJobs/{importJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      importJobName: importJobName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: importJobUpdateSerializer(importJob),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ImportJob> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return importJobDeserializer(result.body);
}

/** Update an import job instance. */
export function update(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  importJobName: string,
  importJob: ImportJobUpdate,
  options: ImportJobsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ImportJob>, ImportJob> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, amlFilesystemName, importJobName, importJob, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<ImportJob>, ImportJob>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  importJobName: string,
  importJob: ImportJob,
  options: ImportJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/importJobs/{importJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      importJobName: importJobName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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
      body: importJobSerializer(importJob),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ImportJob> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return importJobDeserializer(result.body);
}

/** Create or update an import job. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  importJobName: string,
  importJob: ImportJob,
  options: ImportJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ImportJob>, ImportJob> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        amlFilesystemName,
        importJobName,
        importJob,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<ImportJob>, ImportJob>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  importJobName: string,
  options: ImportJobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/importJobs/{importJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      importJobName: importJobName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ImportJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return importJobDeserializer(result.body);
}

/** Returns an import job. */
export async function get(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  importJobName: string,
  options: ImportJobsGetOptionalParams = { requestOptions: {} },
): Promise<ImportJob> {
  const result = await _getSend(
    context,
    resourceGroupName,
    amlFilesystemName,
    importJobName,
    options,
  );
  return _getDeserialize(result);
}
