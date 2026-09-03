// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  FileShareSnapshot,
  fileShareSnapshotSerializer,
  fileShareSnapshotDeserializer,
  FileShareSnapshotUpdate,
  fileShareSnapshotUpdateSerializer,
  _FileShareSnapshotListResult,
  _fileShareSnapshotListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  FileShareSnapshotsListByFileShareOptionalParams,
  FileShareSnapshotsDeleteFileShareSnapshotOptionalParams,
  FileShareSnapshotsUpdateFileShareSnapshotOptionalParams,
  FileShareSnapshotsCreateOrUpdateFileShareSnapshotOptionalParams,
  FileShareSnapshotsGetFileShareSnapshotOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByFileShareSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: FileShareSnapshotsListByFileShareOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.FileShares/fileShares/{resourceName}/fileShareSnapshots{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
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

export async function _listByFileShareDeserialize(
  result: PathUncheckedResponse,
): Promise<_FileShareSnapshotListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _fileShareSnapshotListResultDeserializer(result.body);
}

/** List FileShareSnapshot by FileShare. */
export function listByFileShare(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: FileShareSnapshotsListByFileShareOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FileShareSnapshot> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFileShareSend(context, resourceGroupName, resourceName, options),
    _listByFileShareDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-06-01" },
  );
}

export function _deleteFileShareSnapshotSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  name: string,
  options: FileShareSnapshotsDeleteFileShareSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.FileShares/fileShares/{resourceName}/fileShareSnapshots/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteFileShareSnapshotDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a FileShareSnapshot. */
export function deleteFileShareSnapshot(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  name: string,
  options: FileShareSnapshotsDeleteFileShareSnapshotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteFileShareSnapshotDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteFileShareSnapshotSend(context, resourceGroupName, resourceName, name, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateFileShareSnapshotSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  name: string,
  properties: FileShareSnapshotUpdate,
  options: FileShareSnapshotsUpdateFileShareSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.FileShares/fileShares/{resourceName}/fileShareSnapshots/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: fileShareSnapshotUpdateSerializer(properties),
  });
}

export async function _updateFileShareSnapshotDeserialize(
  result: PathUncheckedResponse,
): Promise<FileShareSnapshot> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return fileShareSnapshotDeserializer(result.body);
}

/** Update a FileShareSnapshot. */
export function updateFileShareSnapshot(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  name: string,
  properties: FileShareSnapshotUpdate,
  options: FileShareSnapshotsUpdateFileShareSnapshotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FileShareSnapshot>, FileShareSnapshot> {
  return getLongRunningPoller(context, _updateFileShareSnapshotDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateFileShareSnapshotSend(
        context,
        resourceGroupName,
        resourceName,
        name,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-01",
  }) as PollerLike<OperationState<FileShareSnapshot>, FileShareSnapshot>;
}

export function _createOrUpdateFileShareSnapshotSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  name: string,
  resource: FileShareSnapshot,
  options: FileShareSnapshotsCreateOrUpdateFileShareSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.FileShares/fileShares/{resourceName}/fileShareSnapshots/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: fileShareSnapshotSerializer(resource),
  });
}

export async function _createOrUpdateFileShareSnapshotDeserialize(
  result: PathUncheckedResponse,
): Promise<FileShareSnapshot> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return fileShareSnapshotDeserializer(result.body);
}

/** Create a FileShareSnapshot. */
export function createOrUpdateFileShareSnapshot(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  name: string,
  resource: FileShareSnapshot,
  options: FileShareSnapshotsCreateOrUpdateFileShareSnapshotOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FileShareSnapshot>, FileShareSnapshot> {
  return getLongRunningPoller(
    context,
    _createOrUpdateFileShareSnapshotDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateFileShareSnapshotSend(
          context,
          resourceGroupName,
          resourceName,
          name,
          resource,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-06-01",
    },
  ) as PollerLike<OperationState<FileShareSnapshot>, FileShareSnapshot>;
}

export function _getFileShareSnapshotSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  name: string,
  options: FileShareSnapshotsGetFileShareSnapshotOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.FileShares/fileShares/{resourceName}/fileShareSnapshots/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      name: name,
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

export async function _getFileShareSnapshotDeserialize(
  result: PathUncheckedResponse,
): Promise<FileShareSnapshot> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return fileShareSnapshotDeserializer(result.body);
}

/** Get a FileShareSnapshot */
export async function getFileShareSnapshot(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  name: string,
  options: FileShareSnapshotsGetFileShareSnapshotOptionalParams = { requestOptions: {} },
): Promise<FileShareSnapshot> {
  const result = await _getFileShareSnapshotSend(
    context,
    resourceGroupName,
    resourceName,
    name,
    options,
  );
  return _getFileShareSnapshotDeserialize(result);
}
