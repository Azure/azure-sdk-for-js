// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceUpdateContext as Client } from "../index.js";
import {
  _UpdateList,
  _updateListDeserializer,
  Update,
  updateDeserializer,
  errorResponseDeserializer,
  ImportUpdateInputItem,
  UpdateOperation,
  updateOperationDeserializer,
  _StringsList,
  _stringsListDeserializer,
  UpdateFile,
  updateFileDeserializer,
  _UpdateOperationsList,
  _updateOperationsListDeserializer,
  importUpdateInputItemArraySerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DeviceUpdateGetOperationStatusOptionalParams,
  DeviceUpdateListOperationStatusesOptionalParams,
  DeviceUpdateGetFileOptionalParams,
  DeviceUpdateListFilesOptionalParams,
  DeviceUpdateListVersionsOptionalParams,
  DeviceUpdateListNamesOptionalParams,
  DeviceUpdateListProvidersOptionalParams,
  DeviceUpdateDeleteUpdateOptionalParams,
  DeviceUpdateGetUpdateOptionalParams,
  DeviceUpdateImportUpdateOptionalParams,
  DeviceUpdateListUpdatesOptionalParams,
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
  options: DeviceUpdateGetOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/updates/operations/{operationId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return updateOperationDeserializer(result.body);
}

/** Retrieve operation status. */
export async function getOperationStatus(
  context: Client,
  operationId: string,
  options: DeviceUpdateGetOperationStatusOptionalParams = { requestOptions: {} },
): Promise<UpdateOperation> {
  const result = await _getOperationStatusSend(context, operationId, options);
  return _getOperationStatusDeserialize(result);
}

export function _listOperationStatusesSend(
  context: Client,
  options: DeviceUpdateListOperationStatusesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/updates/operations{?api%2Dversion,filter,top}",
    {
      instanceId: context.instanceId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
      filter: options?.filter,
      top: options?.top,
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
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
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
  options: DeviceUpdateListOperationStatusesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<UpdateOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listOperationStatusesSend(context, options),
    _listOperationStatusesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _getFileSend(
  context: Client,
  provider: string,
  name: string,
  version: string,
  fileId: string,
  options: DeviceUpdateGetFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files/{fileId}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      provider: provider,
      name: name,
      version: version,
      fileId: fileId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
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
  options: DeviceUpdateGetFileOptionalParams = { requestOptions: {} },
): Promise<UpdateFile> {
  const result = await _getFileSend(context, provider, name, version, fileId, options);
  return _getFileDeserialize(result);
}

export function _listFilesSend(
  context: Client,
  provider: string,
  name: string,
  version: string,
  options: DeviceUpdateListFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      provider: provider,
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _stringsListDeserializer(result.body);
}

/** Get a list of all update file identifiers for the specified version. */
export function listFiles(
  context: Client,
  provider: string,
  name: string,
  version: string,
  options: DeviceUpdateListFilesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string> {
  return buildPagedAsyncIterator(
    context,
    () => _listFilesSend(context, provider, name, version, options),
    _listFilesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _listVersionsSend(
  context: Client,
  provider: string,
  name: string,
  options: DeviceUpdateListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions{?api%2Dversion,filter}",
    {
      instanceId: context.instanceId,
      provider: provider,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _stringsListDeserializer(result.body);
}

/** Get a list of all update versions that match the specified provider and name. */
export function listVersions(
  context: Client,
  provider: string,
  name: string,
  options: DeviceUpdateListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, provider, name, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _listNamesSend(
  context: Client,
  provider: string,
  options: DeviceUpdateListNamesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/updates/providers/{provider}/names{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      provider: provider,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _stringsListDeserializer(result.body);
}

/** Get a list of all update names that match the specified provider. */
export function listNames(
  context: Client,
  provider: string,
  options: DeviceUpdateListNamesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string> {
  return buildPagedAsyncIterator(
    context,
    () => _listNamesSend(context, provider, options),
    _listNamesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _listProvidersSend(
  context: Client,
  options: DeviceUpdateListProvidersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/updates/providers{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _stringsListDeserializer(result.body);
}

/**
 * Get a list of all update providers that have been imported to Device Update for
 * IoT Hub.
 */
export function listProviders(
  context: Client,
  options: DeviceUpdateListProvidersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<string> {
  return buildPagedAsyncIterator(
    context,
    () => _listProvidersSend(context, options),
    _listProvidersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _deleteUpdateSend(
  context: Client,
  provider: string,
  name: string,
  version: string,
  options: DeviceUpdateDeleteUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      provider: provider,
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
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
  options: DeviceUpdateDeleteUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteUpdateDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deleteUpdateSend(context, provider, name, version, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getUpdateSend(
  context: Client,
  provider: string,
  name: string,
  version: string,
  options: DeviceUpdateGetUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      provider: provider,
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return updateDeserializer(result.body);
}

/** Get a specific update version. */
export async function getUpdate(
  context: Client,
  provider: string,
  name: string,
  version: string,
  options: DeviceUpdateGetUpdateOptionalParams = { requestOptions: {} },
): Promise<Update> {
  const result = await _getUpdateSend(context, provider, name, version, options);
  return _getUpdateDeserialize(result);
}

export function _importUpdateSend(
  context: Client,
  updateToImport: ImportUpdateInputItem[],
  options: DeviceUpdateImportUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/updates:import{?api%2Dversion}",
    {
      instanceId: context.instanceId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: importUpdateInputItemArraySerializer(updateToImport),
  });
}

export async function _importUpdateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/**
 * Import new update version. This is a long-running-operation; use
 * Operation-Location response header value to check for operation status.
 */
export function importUpdate(
  context: Client,
  updateToImport: ImportUpdateInputItem[],
  options: DeviceUpdateImportUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _importUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _importUpdateSend(context, updateToImport, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listUpdatesSend(
  context: Client,
  options: DeviceUpdateListUpdatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/deviceUpdate/{instanceId}/updates{?api%2Dversion,search,filter}",
    {
      instanceId: context.instanceId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
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
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _updateListDeserializer(result.body);
}

/** Get a list of all updates that have been imported to Device Update for IoT Hub. */
export function listUpdates(
  context: Client,
  options: DeviceUpdateListUpdatesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Update> {
  return buildPagedAsyncIterator(
    context,
    () => _listUpdatesSend(context, options),
    _listUpdatesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}
