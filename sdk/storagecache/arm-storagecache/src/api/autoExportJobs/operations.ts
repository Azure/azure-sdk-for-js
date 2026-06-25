// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  AutoExportJob,
  autoExportJobSerializer,
  autoExportJobDeserializer,
  errorResponseDeserializer,
  AutoExportJobUpdate,
  autoExportJobUpdateSerializer,
  _AutoExportJobsListResult,
  _autoExportJobsListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AutoExportJobsListByAmlFilesystemOptionalParams,
  AutoExportJobsDeleteOptionalParams,
  AutoExportJobsUpdateOptionalParams,
  AutoExportJobsCreateOrUpdateOptionalParams,
  AutoExportJobsGetOptionalParams,
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
  options: AutoExportJobsListByAmlFilesystemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoExportJobs{?api%2Dversion}",
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
): Promise<_AutoExportJobsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _autoExportJobsListResultDeserializer(result.body);
}

/** Returns all the auto export jobs the user has access to under an AML File System. */
export function listByAmlFilesystem(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  options: AutoExportJobsListByAmlFilesystemOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AutoExportJob> {
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
  autoExportJobName: string,
  options: AutoExportJobsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoExportJobs/{autoExportJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      autoExportJobName: autoExportJobName,
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

/** Schedules an auto export job for deletion. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoExportJobName: string,
  options: AutoExportJobsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, amlFilesystemName, autoExportJobName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoExportJobName: string,
  autoExportJob: AutoExportJobUpdate,
  options: AutoExportJobsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoExportJobs/{autoExportJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      autoExportJobName: autoExportJobName,
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
      body: autoExportJobUpdateSerializer(autoExportJob),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AutoExportJob> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return autoExportJobDeserializer(result.body);
}

/** Update an auto export job instance. */
export function update(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoExportJobName: string,
  autoExportJob: AutoExportJobUpdate,
  options: AutoExportJobsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AutoExportJob>, AutoExportJob> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoExportJobName,
        autoExportJob,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<AutoExportJob>, AutoExportJob>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoExportJobName: string,
  autoExportJob: AutoExportJob,
  options: AutoExportJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoExportJobs/{autoExportJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      autoExportJobName: autoExportJobName,
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
      body: autoExportJobSerializer(autoExportJob),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AutoExportJob> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return autoExportJobDeserializer(result.body);
}

/** Create or update an auto export job. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoExportJobName: string,
  autoExportJob: AutoExportJob,
  options: AutoExportJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AutoExportJob>, AutoExportJob> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        amlFilesystemName,
        autoExportJobName,
        autoExportJob,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<AutoExportJob>, AutoExportJob>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoExportJobName: string,
  options: AutoExportJobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/autoExportJobs/{autoExportJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      autoExportJobName: autoExportJobName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AutoExportJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return autoExportJobDeserializer(result.body);
}

/** Returns an auto export job. */
export async function get(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  autoExportJobName: string,
  options: AutoExportJobsGetOptionalParams = { requestOptions: {} },
): Promise<AutoExportJob> {
  const result = await _getSend(
    context,
    resourceGroupName,
    amlFilesystemName,
    autoExportJobName,
    options,
  );
  return _getDeserialize(result);
}
