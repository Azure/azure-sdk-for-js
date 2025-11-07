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
  DatasetCredential,
  datasetCredentialDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DatasetsGetCredentialsOptionalParams,
  DatasetsPendingUploadOptionalParams,
  DatasetsCreateOrUpdateOptionalParams,
  DatasetsDeleteOptionalParams,
  DatasetsGetOptionalParams,
  DatasetsListOptionalParams,
  DatasetsListVersionsOptionalParams,
} from "./options.js";
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
  options: DatasetsGetCredentialsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}/credentials{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getCredentialsDeserialize(
  result: PathUncheckedResponse,
): Promise<DatasetCredential> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return datasetCredentialDeserializer(result.body);
}

/** Get the SAS credential to access the storage account associated with a Dataset version. */
export async function getCredentials(
  context: Client,
  name: string,
  version: string,
  options: DatasetsGetCredentialsOptionalParams = { requestOptions: {} },
): Promise<DatasetCredential> {
  const result = await _getCredentialsSend(context, name, version, options);
  return _getCredentialsDeserialize(result);
}

export function _pendingUploadSend(
  context: Client,
  name: string,
  pendingUploadRequest: PendingUploadRequest,
  version: string,
  options: DatasetsPendingUploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}/startPendingUpload{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
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
    body: pendingUploadRequestSerializer(pendingUploadRequest),
  });
}

export async function _pendingUploadDeserialize(
  result: PathUncheckedResponse,
): Promise<PendingUploadResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return pendingUploadResponseDeserializer(result.body);
}

/** Start a new or get an existing pending upload of a dataset for a specific version. */
export async function pendingUpload(
  context: Client,
  name: string,
  pendingUploadRequest: PendingUploadRequest,
  version: string,
  options: DatasetsPendingUploadOptionalParams = { requestOptions: {} },
): Promise<PendingUploadResponse> {
  const result = await _pendingUploadSend(context, name, pendingUploadRequest, version, options);
  return _pendingUploadDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  name: string,
  datasetVersion: DatasetVersionUnion,
  version: string,
  options: DatasetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: datasetVersionUnionSerializer(datasetVersion),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DatasetVersionUnion> {
  const expectedStatuses = ["201", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return datasetVersionUnionDeserializer(result.body);
}

/** Create a new or update an existing DatasetVersion with the given version id */
export async function createOrUpdate(
  context: Client,
  name: string,
  datasetVersion: DatasetVersionUnion,
  version: string,
  options: DatasetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DatasetVersionUnion> {
  const result = await _createOrUpdateSend(context, name, datasetVersion, version, options);
  return _createOrUpdateDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  name: string,
  version: string,
  options: DatasetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete the specific version of the DatasetVersion. The service returns 204 No Content if the DatasetVersion was deleted successfully or if the DatasetVersion does not exist. */
export async function $delete(
  context: Client,
  name: string,
  version: string,
  options: DatasetsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, name, version, options);
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  name: string,
  version: string,
  options: DatasetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets/{name}/versions/{version}{?api-version}",
    {
      name: name,
      version: version,
      "api-version": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DatasetVersionUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return datasetVersionUnionDeserializer(result.body);
}

/** Get the specific version of the DatasetVersion. The service returns 404 Not Found error if the DatasetVersion does not exist. */
export async function get(
  context: Client,
  name: string,
  version: string,
  options: DatasetsGetOptionalParams = { requestOptions: {} },
): Promise<DatasetVersionUnion> {
  const result = await _getSend(context, name, version, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  options: DatasetsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/datasets{?api-version}",
    {
      "api-version": context.apiVersion,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDatasetVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedDatasetVersionDeserializer(result.body);
}

/** List the latest version of each DatasetVersion */
export function list(
  context: Client,
  options: DatasetsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DatasetVersionUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
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
    "/datasets/{name}/versions{?api-version}",
    {
      name: name,
      "api-version": context.apiVersion,
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
