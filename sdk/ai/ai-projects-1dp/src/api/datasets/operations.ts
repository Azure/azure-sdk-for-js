// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  _PagedDatasetVersion,
  _pagedDatasetVersionDeserializer,
  datasetVersionUnionSerializer,
  datasetVersionUnionDeserializer,
  DatasetVersionUnion,
  PendingUploadRequest,
  pendingUploadRequestSerializer,
  PendingUploadResponse,
  pendingUploadResponseDeserializer,
  _getCredentialsRequestSerializer,
  AssetCredentialResponse,
  assetCredentialResponseDeserializer,
} from "../../models/models.js";
import {
  DatasetsGetCredentialsOptionalParams,
  DatasetsStartPendingUploadVersionOptionalParams,
  DatasetsCreateVersionOptionalParams,
  DatasetsDeleteVersionOptionalParams,
  DatasetsGetVersionOptionalParams,
  DatasetsListLatestOptionalParams,
  DatasetsListVersionsOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getCredentialsSend(
  context: Client,
  name: string,
  version: string,
  body: Record<string, any>,
  options: DatasetsGetCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}/credentials{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: _getCredentialsRequestSerializer(body),
  });
}

export async function _getCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<AssetCredentialResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return assetCredentialResponseDeserializer(result.body);
}

/** Get download sas for dataset version. */
export async function getCredentials(
  context: Client,
  name: string,
  version: string,
  body: Record<string, any>,
  options: DatasetsGetCredentialsOptionalParams = { requestOptions: {} },
): Promise<AssetCredentialResponse> {
  const result = await _getCredentialsSend(
    context,
    name,
    version,
    body,
    options,
  );
  return _getCredentialsDeserialize(result);
}

export function _startPendingUploadVersionSend(
  context: Client,
  name: string,
  version: string,
  body: PendingUploadRequest,
  options: DatasetsStartPendingUploadVersionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}/startPendingUpload{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: pendingUploadRequestSerializer(body),
  });
}

export async function _startPendingUploadVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<PendingUploadResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return pendingUploadResponseDeserializer(result.body);
}

/** Start a new or get an existing pending upload of a dataset for a specific version. */
export async function startPendingUploadVersion(
  context: Client,
  name: string,
  version: string,
  body: PendingUploadRequest,
  options: DatasetsStartPendingUploadVersionOptionalParams = {
    requestOptions: {},
  },
): Promise<PendingUploadResponse> {
  const result = await _startPendingUploadVersionSend(context, name, version, body, options);
  return _startPendingUploadVersionDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  name: string,
  version: string,
  body: DatasetVersionUnion,
  options: DatasetsCreateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: datasetVersionUnionSerializer(body),
  });
}

export async function _createVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<DatasetVersionUnion> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return datasetVersionUnionDeserializer(result.body);
}

/** Create a new or replace an existing DatasetVersion with the given version id */
export async function createVersion(
  context: Client,
  name: string,
  version: string,
  body: DatasetVersionUnion,
  options: DatasetsCreateVersionOptionalParams = { requestOptions: {} },
): Promise<DatasetVersionUnion> {
  const result = await _createVersionSend(context, name, version, body, options);
  return _createVersionDeserialize(result);
}

export function _deleteVersionSend(
  context: Client,
  name: string,
  version: string,
  options: DatasetsDeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteVersionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the specific version of the DatasetVersion */
export async function deleteVersion(
  context: Client,
  name: string,
  version: string,
  options: DatasetsDeleteVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVersionSend(context, name, version, options);
  return _deleteVersionDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  name: string,
  version: string,
  options: DatasetsGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}{?api%2Dversion}",
    {
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<DatasetVersionUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return datasetVersionUnionDeserializer(result.body);
}

/** Get the specific version of the DatasetVersion */
export async function getVersion(
  context: Client,
  name: string,
  version: string,
  options: DatasetsGetVersionOptionalParams = { requestOptions: {} },
): Promise<DatasetVersionUnion> {
  const result = await _getVersionSend(context, name, version, options);
  return _getVersionDeserialize(result);
}

export function _listLatestSend(
  context: Client,
  options: DatasetsListLatestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets{?api%2Dversion,top,skip,tags,listViewType}",
    {
      "api%2Dversion": context.apiVersion,
      top: options?.top,
      skip: options?.skip,
      tags: options?.tags,
      listViewType: options?.listViewType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listLatestDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDatasetVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDatasetVersionDeserializer(result.body);
}

/** List the latest version of each DatasetVersion */
export function listLatest(
  context: Client,
  options: DatasetsListLatestOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatasetVersionUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listLatestSend(context, options),
    _listLatestDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listVersionsSend(
  context: Client,
  name: string,
  options: DatasetsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions{?api%2Dversion,top,skip,tags,listViewType}",
    {
      name: name,
      "api%2Dversion": context.apiVersion,
      top: options?.top,
      skip: options?.skip,
      tags: options?.tags,
      listViewType: options?.listViewType,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDatasetVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDatasetVersionDeserializer(result.body);
}

/** List all versions of the given DatasetVersion */
export function listVersions(
  context: Client,
  name: string,
  options: DatasetsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatasetVersionUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, name, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
