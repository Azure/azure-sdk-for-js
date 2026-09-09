// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistrySoftwareUpdateContext as Client } from "../index.js";
import {
  _UpdateList,
  _updateListDeserializer,
  Update,
  updateDeserializer,
  ImportUpdateRequest,
  importUpdateRequestSerializer,
  UpdateOperation,
  updateOperationDeserializer,
  _StringsList,
  _stringsListDeserializer,
  UpdateFile,
  updateFileDeserializer,
  _UpdateOperationsList,
  _updateOperationsListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SoftwareUpdateGetOperationStatusOptionalParams,
  SoftwareUpdateListOperationStatusesOptionalParams,
  SoftwareUpdateGetFileOptionalParams,
  SoftwareUpdateListFilesOptionalParams,
  SoftwareUpdateListVersionsOptionalParams,
  SoftwareUpdateListNamesOptionalParams,
  SoftwareUpdateListProvidersOptionalParams,
  SoftwareUpdateDeleteUpdateOptionalParams,
  SoftwareUpdateGetUpdateOptionalParams,
  SoftwareUpdateImportUpdateOptionalParams,
  SoftwareUpdateListUpdatesOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _getOperationStatusSend(
  context: Client,
  operationId: string,
  options: SoftwareUpdateGetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/updates/operations/{operationId}{?api%2Dversion}",
    {
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<UpdateOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return updateOperationDeserializer(result.body);
}

/** Retrieve operation status. */
export async function getOperationStatus(
  context: Client,
  operationId: string,
  options: SoftwareUpdateGetOperationStatusOptionalParams = { requestOptions: {} },
): Promise<UpdateOperation> {
  const result = await _getOperationStatusSend(context, operationId, options);
  return _getOperationStatusDeserialize(result);
}

export function _listOperationStatusesSend(
  context: Client,
  options: SoftwareUpdateListOperationStatusesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/updates/operations{?api%2Dversion,filter,maxpagesize}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
      filter: options?.filter,
      maxpagesize: options?.maxPageSize,
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

export async function _listOperationStatusesDeserialize(
  result: PathUncheckedResponse,
): Promise<_UpdateOperationsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _updateOperationsListDeserializer(result.body);
}

/**
 * Get a list of all import update operations. Completed operations are kept for 7
 * days before auto-deleted. Delete operations are not returned by this API
 * version.
 */
export function listOperationStatuses(
  context: Client,
  options: SoftwareUpdateListOperationStatusesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UpdateOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listOperationStatusesSend(context, options),
    _listOperationStatusesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-02-preview",
    },
  );
}

export function _getFileSend(
  context: Client,
  provider: string,
  name: string,
  version: string,
  fileId: string,
  options: SoftwareUpdateGetFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/updates/providers/{provider}/names/{name}/versions/{version}/files/{fileId}{?api%2Dversion}",
    {
      provider: provider,
      name: name,
      version: version,
      fileId: fileId,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getFileDeserialize(result: PathUncheckedResponse): Promise<UpdateFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return updateFileDeserializer(result.body);
}

/** Get a specific update file from the version. */
export async function getFile(
  context: Client,
  provider: string,
  name: string,
  version: string,
  fileId: string,
  options: SoftwareUpdateGetFileOptionalParams = { requestOptions: {} },
): Promise<UpdateFile> {
  const result = await _getFileSend(context, provider, name, version, fileId, options);
  return _getFileDeserialize(result);
}

export function _listFilesSend(
  context: Client,
  provider: string,
  name: string,
  version: string,
  options: SoftwareUpdateListFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/updates/providers/{provider}/names/{name}/versions/{version}/files{?api%2Dversion}",
    {
      provider: provider,
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
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

export async function _listFilesDeserialize(result: PathUncheckedResponse): Promise<_StringsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _stringsListDeserializer(result.body);
}

/** Get a list of all update file identifiers for the specified version. */
export function listFiles(
  context: Client,
  provider: string,
  name: string,
  version: string,
  options: SoftwareUpdateListFilesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string> {
  return buildPagedAsyncIterator(
    context,
    () => _listFilesSend(context, provider, name, version, options),
    _listFilesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-02-preview",
    },
  );
}

export function _listVersionsSend(
  context: Client,
  provider: string,
  name: string,
  options: SoftwareUpdateListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/updates/providers/{provider}/names/{name}/versions{?api%2Dversion,filter}",
    {
      provider: provider,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
      filter: options?.filter,
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

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_StringsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _stringsListDeserializer(result.body);
}

/** Get a list of all update versions that match the specified provider and name. */
export function listVersions(
  context: Client,
  provider: string,
  name: string,
  options: SoftwareUpdateListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, provider, name, options),
    _listVersionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-02-preview",
    },
  );
}

export function _listNamesSend(
  context: Client,
  provider: string,
  options: SoftwareUpdateListNamesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/updates/providers/{provider}/names{?api%2Dversion}",
    {
      provider: provider,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
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

export async function _listNamesDeserialize(result: PathUncheckedResponse): Promise<_StringsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _stringsListDeserializer(result.body);
}

/** Get a list of all update names that match the specified provider. */
export function listNames(
  context: Client,
  provider: string,
  options: SoftwareUpdateListNamesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string> {
  return buildPagedAsyncIterator(
    context,
    () => _listNamesSend(context, provider, options),
    _listNamesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-02-preview",
    },
  );
}

export function _listProvidersSend(
  context: Client,
  options: SoftwareUpdateListProvidersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/updates/providers{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
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

export async function _listProvidersDeserialize(
  result: PathUncheckedResponse,
): Promise<_StringsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _stringsListDeserializer(result.body);
}

/**
 * Get a list of all update providers that have been imported to Software Update for
 * Device Registry.
 */
export function listProviders(
  context: Client,
  options: SoftwareUpdateListProvidersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string> {
  return buildPagedAsyncIterator(
    context,
    () => _listProvidersSend(context, options),
    _listProvidersDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-02-preview",
    },
  );
}

export function _deleteUpdateSend(
  context: Client,
  provider: string,
  name: string,
  version: string,
  options: SoftwareUpdateDeleteUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/updates/providers/{provider}/names/{name}/versions/{version}{?api%2Dversion}",
    {
      provider: provider,
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteUpdateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/**
 * Delete a specific update version. This is a long-running-operation; use
 * Operation-Location response header value to check for operation status.
 */
export function deleteUpdate(
  context: Client,
  provider: string,
  name: string,
  version: string,
  options: SoftwareUpdateDeleteUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteUpdateDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deleteUpdateSend(context, provider, name, version, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2026-11-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getUpdateSend(
  context: Client,
  provider: string,
  name: string,
  version: string,
  options: SoftwareUpdateGetUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/updates/providers/{provider}/names/{name}/versions/{version}{?api%2Dversion}",
    {
      provider: provider,
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getUpdateDeserialize(result: PathUncheckedResponse): Promise<Update> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return updateDeserializer(result.body);
}

/** Get a specific update version. */
export async function getUpdate(
  context: Client,
  provider: string,
  name: string,
  version: string,
  options: SoftwareUpdateGetUpdateOptionalParams = { requestOptions: {} },
): Promise<Update> {
  const result = await _getUpdateSend(context, provider, name, version, options);
  return _getUpdateDeserialize(result);
}

export function _importUpdateSend(
  context: Client,
  importUpdateRequest: ImportUpdateRequest,
  options: SoftwareUpdateImportUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/updates:import{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: importUpdateRequestSerializer(importUpdateRequest),
  });
}

export async function _importUpdateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/**
 * Import new update version. This is a long-running-operation; use
 * Operation-Location response header value to check for operation status.
 */
export function importUpdate(
  context: Client,
  importUpdateRequest: ImportUpdateRequest,
  options: SoftwareUpdateImportUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _importUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _importUpdateSend(context, importUpdateRequest, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2026-11-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listUpdatesSend(
  context: Client,
  options: SoftwareUpdateListUpdatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/updates{?api%2Dversion,search,filter}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-11-02-preview",
      search: options?.search,
      filter: options?.filter,
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

export async function _listUpdatesDeserialize(result: PathUncheckedResponse): Promise<_UpdateList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _updateListDeserializer(result.body);
}

/**
 * Get a list of all updates that have been imported to Software Update for Device
 * Registry.
 */
export function listUpdates(
  context: Client,
  options: SoftwareUpdateListUpdatesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Update> {
  return buildPagedAsyncIterator(
    context,
    () => _listUpdatesSend(context, options),
    _listUpdatesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-11-02-preview",
    },
  );
}
