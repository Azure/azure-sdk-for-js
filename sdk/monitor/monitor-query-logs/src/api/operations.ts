// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorQueryLogsContext as Client, LogsQueryBatchOptions } from "./index.js";
import type { QueryBody, BatchRequest } from "../models/models.js";
import type { LogsQueryBatchResult, LogsQueryResult } from "../models/public.js";
import {
  queryBodySerializer,
  queryResultsDeserializer,
  convertToLogsQueryResult,
  errorResponseDeserializer,
  batchRequestSerializer,
  batchResponseDeserializer,
  convertToLogsBatchResult,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type { ExecuteWithResourceIdOptionalParams, ExecuteOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _batchSend(
  context: Client,
  body: BatchRequest,
  options: LogsQueryBatchOptions = { requestOptions: {} },
): StreamableMethod {
  return context.path("/$batch").post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: batchRequestSerializer(body),
  });
}

export async function _batchDeserialize(
  result: PathUncheckedResponse,
): Promise<LogsQueryBatchResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  const internalResult = batchResponseDeserializer(result.body);
  return convertToLogsBatchResult(internalResult);
}

/**
 * Executes a batch of Analytics queries for data.
 * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/batch-queries)
 * is an example for using POST with an Analytics query.
 */
export async function batch(
  context: Client,
  body: BatchRequest,
  options: LogsQueryBatchOptions = { requestOptions: {} },
): Promise<LogsQueryBatchResult> {
  const result = await _batchSend(context, body, options);
  return _batchDeserialize(result);
}

export function _executeWithResourceIdSend(
  context: Client,
  resourceId: string,
  body: QueryBody,
  options: ExecuteWithResourceIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/query",
    {
      resourceId: resourceId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.prefer !== undefined ? { Prefer: options?.prefer } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: queryBodySerializer(body),
  });
}

export async function _executeWithResourceIdDeserialize(
  result: PathUncheckedResponse,
): Promise<LogsQueryResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return convertToLogsQueryResult(queryResultsDeserializer(result.body));
}

/**
 * Executes an Analytics query for data in the context of a resource.
 * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/azure-resource-queries)
 * is an example for using POST with an Analytics query.
 */
export async function executeWithResourceId(
  context: Client,
  resourceId: string,
  body: QueryBody,
  options: ExecuteWithResourceIdOptionalParams = { requestOptions: {} },
): Promise<LogsQueryResult> {
  const result = await _executeWithResourceIdSend(context, resourceId, body, options);
  return _executeWithResourceIdDeserialize(result);
}

export function _executeSend(
  context: Client,
  workspaceId: string,
  body: QueryBody,
  options: ExecuteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/workspaces/{workspaceId}/query",
    {
      workspaceId: workspaceId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.prefer !== undefined ? { Prefer: options?.prefer } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: queryBodySerializer(body),
  });
}

export async function _executeDeserialize(result: PathUncheckedResponse): Promise<LogsQueryResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return convertToLogsQueryResult(queryResultsDeserializer(result.body));
}

/**
 * Executes an Analytics query for data.
 * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/request-format)
 * is an example for using POST with an Analytics query.
 */
export async function execute(
  context: Client,
  workspaceId: string,
  body: QueryBody,
  options: ExecuteOptionalParams = { requestOptions: {} },
): Promise<LogsQueryResult> {
  const result = await _executeSend(context, workspaceId, body, options);
  return _executeDeserialize(result);
}
