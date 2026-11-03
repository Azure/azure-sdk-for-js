// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type { LogFile, _LogFileListResult, LogFileDownloadUrl } from "../../models/models.js";
import {
  errorResponseDeserializer,
  logFileDeserializer,
  _logFileListResultDeserializer,
  logFileDownloadUrlDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LogFilesListDownloadUrlsOptionalParams,
  LogFilesListOptionalParams,
  LogFilesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listDownloadUrlsSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  logFileName: string,
  options: LogFilesListDownloadUrlsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/logFiles/{logFileName}/listDownloadUrls{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      logFileName: logFileName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _listDownloadUrlsDeserialize(
  result: PathUncheckedResponse,
): Promise<LogFileDownloadUrl> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logFileDownloadUrlDeserializer(result.body);
}

/** Gets a short-lived signed URL for downloading a captured log file. The signed URL is returned only by this action so routine resource GET and LIST responses do not expose bearer credentials. */
export async function listDownloadUrls(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  logFileName: string,
  options: LogFilesListDownloadUrlsOptionalParams = { requestOptions: {} },
): Promise<LogFileDownloadUrl> {
  const result = await _listDownloadUrlsSend(
    context,
    resourceGroupName,
    clusterName,
    logFileName,
    options,
  );
  return _listDownloadUrlsDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: LogFilesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/logFiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_LogFileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _logFileListResultDeserializer(result.body);
}

/** Lists captured log files for a HorizonDB cluster. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: LogFilesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<LogFile> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  logFileName: string,
  options: LogFilesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/logFiles/{logFileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      logFileName: logFileName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<LogFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return logFileDeserializer(result.body);
}

/** Gets metadata for a captured HorizonDB log file. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  logFileName: string,
  options: LogFilesGetOptionalParams = { requestOptions: {} },
): Promise<LogFile> {
  const result = await _getSend(context, resourceGroupName, clusterName, logFileName, options);
  return _getDeserialize(result);
}
