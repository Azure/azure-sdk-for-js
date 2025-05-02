// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext as Client } from "../index.js";
import {
  vectorStoreDataSourceArraySerializer,
  vectorStoreChunkingStrategyRequestUnionSerializer,
  OpenAIPageableListOfVectorStoreFile,
  openAIPageableListOfVectorStoreFileDeserializer,
  VectorStoreFileBatch,
  vectorStoreFileBatchDeserializer,
} from "../../models/models.js";
import {
  VectorStoreFileBatchesListVectorStoreFileBatchFilesOptionalParams,
  VectorStoreFileBatchesCancelVectorStoreFileBatchOptionalParams,
  VectorStoreFileBatchesGetVectorStoreFileBatchOptionalParams,
  VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { OperationState, OperationStatus, PollerLike } from "@azure/core-lro";
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
    "/vector_stores/{vectorStoreId}/file_batches/{batchId}/files{?api%2Dversion,filter,limit,order,after,before}",
    {
      vectorStoreId: vectorStoreId,
      batchId: batchId,
      "api%2Dversion": context.apiVersion,
      filter: options?.filter,
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
): Promise<OpenAIPageableListOfVectorStoreFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return openAIPageableListOfVectorStoreFileDeserializer(result.body);
}

/** Returns a list of vector store files in a batch. */
export async function listVectorStoreFileBatchFiles(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: VectorStoreFileBatchesListVectorStoreFileBatchFilesOptionalParams = {
    requestOptions: {},
  },
): Promise<OpenAIPageableListOfVectorStoreFile> {
  const result = await _listVectorStoreFileBatchFilesSend(context, vectorStoreId, batchId, options);
  return _listVectorStoreFileBatchFilesDeserialize(result);
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
    throw createRestError(result);
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
    throw createRestError(result);
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
    throw createRestError(result);
  }

  return vectorStoreFileBatchDeserializer(result.body);
}

/** Create a vector store file batch. */
export async function createVectorStoreFileBatchInternal(
  context: Client,
  vectorStoreId: string,
  options: VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams = { requestOptions: {} },
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
