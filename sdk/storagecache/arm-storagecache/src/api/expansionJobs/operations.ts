// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  errorResponseDeserializer,
  ExpansionJob,
  expansionJobSerializer,
  expansionJobDeserializer,
  ExpansionJobUpdate,
  expansionJobUpdateSerializer,
  _ExpansionJobsListResult,
  _expansionJobsListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ExpansionJobsListByAmlFilesystemOptionalParams,
  ExpansionJobsDeleteOptionalParams,
  ExpansionJobsUpdateOptionalParams,
  ExpansionJobsCreateOrUpdateOptionalParams,
  ExpansionJobsGetOptionalParams,
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
  options: ExpansionJobsListByAmlFilesystemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/expansionJobs{?api%2Dversion}",
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
): Promise<_ExpansionJobsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _expansionJobsListResultDeserializer(result.body);
}

/** Returns all the expansion jobs the user has access to under an AML File System. */
export function listByAmlFilesystem(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  options: ExpansionJobsListByAmlFilesystemOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExpansionJob> {
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
  expansionJobName: string,
  options: ExpansionJobsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/expansionJobs/{expansionJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      expansionJobName: expansionJobName,
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

/** Schedules an expansion job for deletion. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  expansionJobName: string,
  options: ExpansionJobsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, amlFilesystemName, expansionJobName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  expansionJobName: string,
  expansionJob: ExpansionJobUpdate,
  options: ExpansionJobsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/expansionJobs/{expansionJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      expansionJobName: expansionJobName,
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
      body: expansionJobUpdateSerializer(expansionJob),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ExpansionJob> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return expansionJobDeserializer(result.body);
}

/** Update an expansion job instance. */
export function update(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  expansionJobName: string,
  expansionJob: ExpansionJobUpdate,
  options: ExpansionJobsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExpansionJob>, ExpansionJob> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        amlFilesystemName,
        expansionJobName,
        expansionJob,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<ExpansionJob>, ExpansionJob>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  expansionJobName: string,
  expansionJob: ExpansionJob,
  options: ExpansionJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/expansionJobs/{expansionJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      expansionJobName: expansionJobName,
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
      body: expansionJobSerializer(expansionJob),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExpansionJob> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return expansionJobDeserializer(result.body);
}

/** Create or update an expansion job. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  expansionJobName: string,
  expansionJob: ExpansionJob,
  options: ExpansionJobsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExpansionJob>, ExpansionJob> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        amlFilesystemName,
        expansionJobName,
        expansionJob,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-01",
  }) as PollerLike<OperationState<ExpansionJob>, ExpansionJob>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  expansionJobName: string,
  options: ExpansionJobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageCache/amlFilesystems/{amlFilesystemName}/expansionJobs/{expansionJobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      amlFilesystemName: amlFilesystemName,
      expansionJobName: expansionJobName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExpansionJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return expansionJobDeserializer(result.body);
}

/** Returns an expansion job. */
export async function get(
  context: Client,
  resourceGroupName: string,
  amlFilesystemName: string,
  expansionJobName: string,
  options: ExpansionJobsGetOptionalParams = { requestOptions: {} },
): Promise<ExpansionJob> {
  const result = await _getSend(
    context,
    resourceGroupName,
    amlFilesystemName,
    expansionJobName,
    options,
  );
  return _getDeserialize(result);
}
