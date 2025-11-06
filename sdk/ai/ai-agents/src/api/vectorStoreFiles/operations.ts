// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentsContext as Client } from "../index.js";
import type {
  _AgentsPagedResultVectorStoreFile,
  VectorStoreFile,
  VectorStoreFileDeletionStatus,
} from "../../models/models.js";
import {
  vectorStoreDataSourceSerializer,
  agentV1ErrorDeserializer,
  vectorStoreChunkingStrategyRequestUnionSerializer,
  _agentsPagedResultVectorStoreFileDeserializer,
  vectorStoreFileDeserializer,
  vectorStoreFileDeletionStatusDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VectorStoreFilesDeleteVectorStoreFileOptionalParams,
  VectorStoreFilesGetVectorStoreFileOptionalParams,
  VectorStoreFilesCreateVectorStoreFileOptionalParams,
  VectorStoreFilesListVectorStoreFilesOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _deleteVectorStoreFileSend(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: VectorStoreFilesDeleteVectorStoreFileOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/files/{fileId}{?api%2Dversion}",
    {
      vectorStoreId: vectorStoreId,
      fileId: fileId,
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

export async function _deleteVectorStoreFileDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreFileDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return vectorStoreFileDeletionStatusDeserializer(result.body);
}

/** Deletes a vector store file. This removes the file‐to‐store link (does not delete the file itself). */
export async function deleteVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: VectorStoreFilesDeleteVectorStoreFileOptionalParams = {
    requestOptions: {},
  },
): Promise<VectorStoreFileDeletionStatus> {
  const result = await _deleteVectorStoreFileSend(context, vectorStoreId, fileId, options);
  return _deleteVectorStoreFileDeserialize(result);
}

export function _getVectorStoreFileSend(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: VectorStoreFilesGetVectorStoreFileOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/files/{fileId}{?api%2Dversion}",
    {
      vectorStoreId: vectorStoreId,
      fileId: fileId,
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

export async function _getVectorStoreFileDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return vectorStoreFileDeserializer(result.body);
}

/** Retrieves a vector store file. */
export async function getVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: VectorStoreFilesGetVectorStoreFileOptionalParams = {
    requestOptions: {},
  },
): Promise<VectorStoreFile> {
  const result = await _getVectorStoreFileSend(context, vectorStoreId, fileId, options);
  return _getVectorStoreFileDeserialize(result);
}

export function _createVectorStoreFileSend(
  context: Client,
  vectorStoreId: string,
  options: VectorStoreFilesCreateVectorStoreFileOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/files{?api%2Dversion}",
    {
      vectorStoreId: vectorStoreId,
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
    body: {
      file_id: options?.fileId,
      data_source: !options?.dataSource
        ? options?.dataSource
        : vectorStoreDataSourceSerializer(options?.dataSource),
      chunking_strategy: !options?.chunkingStrategy
        ? options?.chunkingStrategy
        : vectorStoreChunkingStrategyRequestUnionSerializer(options?.chunkingStrategy),
    },
  });
}

export async function _createVectorStoreFileDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return vectorStoreFileDeserializer(result.body);
}

/** Create a vector store file by attaching a file to a vector store. */
export async function createVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  options: VectorStoreFilesCreateVectorStoreFileOptionalParams = {
    requestOptions: {},
  },
): Promise<VectorStoreFile> {
  const result = await _createVectorStoreFileSend(context, vectorStoreId, options);
  return _createVectorStoreFileDeserialize(result);
}

export function _listVectorStoreFilesSend(
  context: Client,
  vectorStoreId: string,
  options: VectorStoreFilesListVectorStoreFilesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/files{?filter,api%2Dversion,limit,order,after,before}",
    {
      vectorStoreId: vectorStoreId,
      filter: options?.filter,
      "api%2Dversion": context.apiVersion,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
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

export async function _listVectorStoreFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultVectorStoreFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultVectorStoreFileDeserializer(result.body);
}

/** Returns a list of vector store files. */
export function listVectorStoreFiles(
  context: Client,
  vectorStoreId: string,
  options: VectorStoreFilesListVectorStoreFilesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VectorStoreFile> {
  return buildPagedAsyncIterator(
    context,
    () => _listVectorStoreFilesSend(context, vectorStoreId, options),
    _listVectorStoreFilesDeserialize,
    ["200"],
    { itemName: "data" },
  );
}
