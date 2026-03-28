// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type {
  DataTransferJobGetResults,
  CreateJobRequest,
  _DataTransferJobFeedResults,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  dataTransferJobGetResultsDeserializer,
  createJobRequestSerializer,
  _dataTransferJobFeedResultsDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DataTransferJobsCompleteOptionalParams,
  DataTransferJobsCancelOptionalParams,
  DataTransferJobsResumeOptionalParams,
  DataTransferJobsPauseOptionalParams,
  DataTransferJobsListByDatabaseAccountOptionalParams,
  DataTransferJobsCreateOptionalParams,
  DataTransferJobsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _completeSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: DataTransferJobsCompleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/dataTransferJobs/{jobName}/complete{?api%2Dversion}",
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
): Promise<DataTransferJobGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return dataTransferJobGetResultsDeserializer(result.body);
}

/** Completes a Data Transfer Online Job. */
export async function complete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: DataTransferJobsCompleteOptionalParams = { requestOptions: {} },
): Promise<DataTransferJobGetResults> {
  const result = await _completeSend(context, resourceGroupName, accountName, jobName, options);
  return _completeDeserialize(result);
}

export function _cancelSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: DataTransferJobsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/dataTransferJobs/{jobName}/cancel{?api%2Dversion}",
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
): Promise<DataTransferJobGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return dataTransferJobGetResultsDeserializer(result.body);
}

/** Cancels a Data Transfer Job. */
export async function cancel(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: DataTransferJobsCancelOptionalParams = { requestOptions: {} },
): Promise<DataTransferJobGetResults> {
  const result = await _cancelSend(context, resourceGroupName, accountName, jobName, options);
  return _cancelDeserialize(result);
}

export function _resumeSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: DataTransferJobsResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/dataTransferJobs/{jobName}/resume{?api%2Dversion}",
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
): Promise<DataTransferJobGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return dataTransferJobGetResultsDeserializer(result.body);
}

/** Resumes a Data Transfer Job. */
export async function resume(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: DataTransferJobsResumeOptionalParams = { requestOptions: {} },
): Promise<DataTransferJobGetResults> {
  const result = await _resumeSend(context, resourceGroupName, accountName, jobName, options);
  return _resumeDeserialize(result);
}

export function _pauseSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: DataTransferJobsPauseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/dataTransferJobs/{jobName}/pause{?api%2Dversion}",
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

export async function _pauseDeserialize(
  result: PathUncheckedResponse,
): Promise<DataTransferJobGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return dataTransferJobGetResultsDeserializer(result.body);
}

/** Pause a Data Transfer Job. */
export async function pause(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: DataTransferJobsPauseOptionalParams = { requestOptions: {} },
): Promise<DataTransferJobGetResults> {
  const result = await _pauseSend(context, resourceGroupName, accountName, jobName, options);
  return _pauseDeserialize(result);
}

export function _listByDatabaseAccountSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DataTransferJobsListByDatabaseAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/dataTransferJobs{?api%2Dversion}",
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
): Promise<_DataTransferJobFeedResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _dataTransferJobFeedResultsDeserializer(result.body);
}

/** Get a list of Data Transfer jobs. */
export function listByDatabaseAccount(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: DataTransferJobsListByDatabaseAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DataTransferJobGetResults> {
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
  jobCreateParameters: CreateJobRequest,
  options: DataTransferJobsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/dataTransferJobs/{jobName}{?api%2Dversion}",
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
    body: createJobRequestSerializer(jobCreateParameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<DataTransferJobGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return dataTransferJobGetResultsDeserializer(result.body);
}

/** Creates a Data Transfer Job. */
export async function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  jobCreateParameters: CreateJobRequest,
  options: DataTransferJobsCreateOptionalParams = { requestOptions: {} },
): Promise<DataTransferJobGetResults> {
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
  options: DataTransferJobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/dataTransferJobs/{jobName}{?api%2Dversion}",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<DataTransferJobGetResults> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return dataTransferJobGetResultsDeserializer(result.body);
}

/** Get a Data Transfer Job. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  jobName: string,
  options: DataTransferJobsGetOptionalParams = { requestOptions: {} },
): Promise<DataTransferJobGetResults> {
  const result = await _getSend(context, resourceGroupName, accountName, jobName, options);
  return _getDeserialize(result);
}
