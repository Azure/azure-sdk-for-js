// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AgentsContext as Client } from "../index.js";
import type {
  _AgentsPagedResultVectorStoreFile,
  VectorStoreFileBatch,
  VectorStoreFile,
} from "../../models/models.js";
import {
  vectorStoreDataSourceArraySerializer,
  agentV1ErrorDeserializer,
  vectorStoreChunkingStrategyRequestUnionSerializer,
  _agentsPagedResultVectorStoreFileDeserializer,
  vectorStoreFileBatchDeserializer,
} from "../../models/models.js";
import type {
  VectorStoreFileBatchesListVectorStoreFileBatchFilesOptionalParams,
  VectorStoreFileBatchesCancelVectorStoreFileBatchOptionalParams,
  VectorStoreFileBatchesGetVectorStoreFileBatchOptionalParams,
  VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams,
} from "./options.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { OperationState, OperationStatus, PollerLike } from "@azure/core-lro";
import { createPoller } from "../poller.js";

export function _listVectorStoreFileBatchFilesSend(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: VectorStoreFileBatchesListVectorStoreFileBatchFilesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/file_batches/{batchId}/files{?filter,api-version,limit,order,after,before}",
    {
      vectorStoreId: vectorStoreId,
      batchId: batchId,
      filter: options?.filter,
      "api-version": context.apiVersion,
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

export async function _listVectorStoreFileBatchFilesDeserialize(
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

/** Returns a list of vector store files in a batch. */
export function listVectorStoreFileBatchFiles(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: VectorStoreFileBatchesListVectorStoreFileBatchFilesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VectorStoreFile> {
  return buildPagedAsyncIterator(
    context,
    () => _listVectorStoreFileBatchFilesSend(context, vectorStoreId, batchId, options),
    _listVectorStoreFileBatchFilesDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _cancelVectorStoreFileBatchSend(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: VectorStoreFileBatchesCancelVectorStoreFileBatchOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/file_batches/{batchId}/cancel{?api%2Dversion}",
    {
      vectorStoreId: vectorStoreId,
      batchId: batchId,
      "api%2Dversion": context.apiVersion,
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

export async function _cancelVectorStoreFileBatchDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreFileBatch> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return vectorStoreFileBatchDeserializer(result.body);
}

/** Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible. */
export async function cancelVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: VectorStoreFileBatchesCancelVectorStoreFileBatchOptionalParams = {
    requestOptions: {},
  },
): Promise<VectorStoreFileBatch> {
  const result = await _cancelVectorStoreFileBatchSend(context, vectorStoreId, batchId, options);
  return _cancelVectorStoreFileBatchDeserialize(result);
}

export function _getVectorStoreFileBatchSend(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: VectorStoreFileBatchesGetVectorStoreFileBatchOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/file_batches/{batchId}{?api%2Dversion}",
    {
      vectorStoreId: vectorStoreId,
      batchId: batchId,
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

export async function _getVectorStoreFileBatchDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreFileBatch> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return vectorStoreFileBatchDeserializer(result.body);
}

/** Retrieve a vector store file batch. */
export async function getVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: VectorStoreFileBatchesGetVectorStoreFileBatchOptionalParams = {
    requestOptions: {},
  },
): Promise<VectorStoreFileBatch> {
  const result = await _getVectorStoreFileBatchSend(context, vectorStoreId, batchId, options);
  return _getVectorStoreFileBatchDeserialize(result);
}

export function _createVectorStoreFileBatchSend(
  context: Client,
  vectorStoreId: string,
  options: VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/file_batches{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      file_ids: !options?.fileIds
        ? options?.fileIds
        : options?.fileIds.map((p: any) => {
            return p;
          }),
      data_sources: !options?.dataSources
        ? options?.dataSources
        : vectorStoreDataSourceArraySerializer(options?.dataSources),
      chunking_strategy: !options?.chunkingStrategy
        ? options?.chunkingStrategy
        : vectorStoreChunkingStrategyRequestUnionSerializer(options?.chunkingStrategy),
    },
  });
}

export async function _createVectorStoreFileBatchDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreFileBatch> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return vectorStoreFileBatchDeserializer(result.body);
}

/** Create a vector store file batch. */
export async function createVectorStoreFileBatchInternal(
  context: Client,
  vectorStoreId: string,
  options: VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams = {
    requestOptions: {},
  },
): Promise<VectorStoreFileBatch> {
  const result = await _createVectorStoreFileBatchSend(context, vectorStoreId, options);
  return _createVectorStoreFileBatchDeserialize(result);
}

/** Create a vector store file batch. */
export function createVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  options: VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VectorStoreFileBatch>, VectorStoreFileBatch> {
  return createPoller<VectorStoreFileBatch>({
    initOperation: async () => {
      return createVectorStoreFileBatchInternal(context, vectorStoreId, options);
    },
    pollOperation: async (currentResult: VectorStoreFileBatch) => {
      return getVectorStoreFileBatch(context, vectorStoreId, currentResult.id, options);
    },
    getOperationStatus: getLroOperationStatus,
    intervalInMs: options.pollingOptions?.intervalInMs,
  });
}

/** Create a vector store file batch and poll. */
export function createVectorStoreFileBatchAndPoll(
  context: Client,
  vectorStoreId: string,
  options: VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VectorStoreFileBatch>, VectorStoreFileBatch> {
  return createPoller<VectorStoreFileBatch>({
    initOperation: async () => {
      return createVectorStoreFileBatchInternal(context, vectorStoreId, options);
    },
    pollOperation: async (currentResult: VectorStoreFileBatch) => {
      return getVectorStoreFileBatch(context, vectorStoreId, currentResult.id, options);
    },
    getOperationStatus: getLroOperationStatus,
    intervalInMs: options.pollingOptions?.intervalInMs,
  });
}

function getLroOperationStatus(result: VectorStoreFileBatch): OperationStatus {
  switch (result.status) {
    case "in_progress":
      return "running";
    case "completed":
      return "succeeded";
    case "cancelled":
      return "canceled";
    default:
      return "failed";
  }
}
