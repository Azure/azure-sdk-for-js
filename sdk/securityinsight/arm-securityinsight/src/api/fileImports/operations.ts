// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type { FileImport, _FileImportList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  fileImportSerializer,
  fileImportDeserializer,
  _fileImportListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FileImportsListOptionalParams,
  FileImportsDeleteOptionalParams,
  FileImportsCreateOptionalParams,
  FileImportsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: FileImportsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/fileImports{?api%2Dversion,%24filter,%24orderby,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
      "%24filter": options?.filter,
      "%24orderby": options?.orderby,
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_FileImportList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _fileImportListDeserializer(result.body);
}

/** Gets all file imports. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: FileImportsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FileImport> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  fileImportId: string,
  options: FileImportsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/fileImports/{fileImportId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      fileImportId: fileImportId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<FileImport> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return fileImportDeserializer(result.body);
}

/** Delete the file import. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  fileImportId: string,
  options: FileImportsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FileImport>, FileImport> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, workspaceName, fileImportId, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-01-preview",
  }) as PollerLike<OperationState<FileImport>, FileImport>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  fileImportId: string,
  fileImport: FileImport,
  options: FileImportsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/fileImports/{fileImportId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      fileImportId: fileImportId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: fileImportSerializer(fileImport),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<FileImport> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return fileImportDeserializer(result.body);
}

/** Creates the file import. */
export async function create(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  fileImportId: string,
  fileImport: FileImport,
  options: FileImportsCreateOptionalParams = { requestOptions: {} },
): Promise<FileImport> {
  const result = await _createSend(
    context,
    resourceGroupName,
    workspaceName,
    fileImportId,
    fileImport,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  fileImportId: string,
  options: FileImportsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/fileImports/{fileImportId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      fileImportId: fileImportId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FileImport> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return fileImportDeserializer(result.body);
}

/** Gets a file import. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  fileImportId: string,
  options: FileImportsGetOptionalParams = { requestOptions: {} },
): Promise<FileImport> {
  const result = await _getSend(context, resourceGroupName, workspaceName, fileImportId, options);
  return _getDeserialize(result);
}
