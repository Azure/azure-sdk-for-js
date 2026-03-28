// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type { CopyJobGetResults, _CopyJobFeedResults } from "../../models/models.js";
import {
  copyJobGetResultsSerializer,
  copyJobGetResultsDeserializer,
  cloudErrorDeserializer,
  _copyJobFeedResultsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CopyJobsCompleteOptionalParams,
  CopyJobsCancelOptionalParams,
  CopyJobsResumeOptionalParams,
  CopyJobsPauseOptionalParams,
  CopyJobsListByDatabaseAccountOptionalParams,
  CopyJobsCreateOptionalParams,
  CopyJobsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _completeSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: CopyJobsCompleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/copyJobs/{jobName}/complete{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _completeDeserialize(
  result: PathUncheckedResponse,
): Promise<CopyJobGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return copyJobGetResultsDeserializer(result.body);
}

/** Completes an Online Copy Job. */
export async function complete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: CopyJobsCompleteOptionalParams = { requestOptions: {} },
): Promise<CopyJobGetResults> {
  const result = await _completeSend(context, resourceGroupName, accountName, jobName, options);
  return _completeDeserialize(result);
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: CopyJobsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/copyJobs/{jobName}/cancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _cancelDeserialize(
  result: PathUncheckedResponse,
): Promise<CopyJobGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return copyJobGetResultsDeserializer(result.body);
}

/** Cancels a Copy Job. */
export async function cancel(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: CopyJobsCancelOptionalParams = { requestOptions: {} },
): Promise<CopyJobGetResults> {
  const result = await _cancelSend(context, resourceGroupName, accountName, jobName, options);
  return _cancelDeserialize(result);
}

export function _resumeSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: CopyJobsResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/copyJobs/{jobName}/resume{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _resumeDeserialize(
  result: PathUncheckedResponse,
): Promise<CopyJobGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return copyJobGetResultsDeserializer(result.body);
}

/** Resumes a Copy Job. */
export async function resume(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: CopyJobsResumeOptionalParams = { requestOptions: {} },
): Promise<CopyJobGetResults> {
  const result = await _resumeSend(context, resourceGroupName, accountName, jobName, options);
  return _resumeDeserialize(result);
}

export function _pauseSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: CopyJobsPauseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/copyJobs/{jobName}/pause{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _pauseDeserialize(result: PathUncheckedResponse): Promise<CopyJobGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return copyJobGetResultsDeserializer(result.body);
}

/** Pause a Copy Job. */
export async function pause(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: CopyJobsPauseOptionalParams = { requestOptions: {} },
): Promise<CopyJobGetResults> {
  const result = await _pauseSend(context, resourceGroupName, accountName, jobName, options);
  return _pauseDeserialize(result);
}

export function _listByDatabaseAccountSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: CopyJobsListByDatabaseAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/copyJobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _listByDatabaseAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_CopyJobFeedResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _copyJobFeedResultsDeserializer(result.body);
}

/** Get a list of Copy jobs. */
export function listByDatabaseAccount(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: CopyJobsListByDatabaseAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CopyJobGetResults> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDatabaseAccountSend(context, resourceGroupName, accountName, options),
    _listByDatabaseAccountDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-11-01-preview",
    },
  );
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  jobCreateParameters: CopyJobGetResults,
  options: CopyJobsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/copyJobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: copyJobGetResultsSerializer(jobCreateParameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<CopyJobGetResults> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return copyJobGetResultsDeserializer(result.body);
}

/** Creates a Copy Job. */
export async function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  jobCreateParameters: CopyJobGetResults,
  options: CopyJobsCreateOptionalParams = { requestOptions: {} },
): Promise<CopyJobGetResults> {
  const result = await _createSend(
    context,
    resourceGroupName,
    accountName,
    jobName,
    jobCreateParameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: CopyJobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/copyJobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CopyJobGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return copyJobGetResultsDeserializer(result.body);
}

/** Get a Copy Job. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: CopyJobsGetOptionalParams = { requestOptions: {} },
): Promise<CopyJobGetResults> {
  const result = await _getSend(context, resourceGroupName, accountName, jobName, options);
  return _getDeserialize(result);
}
