// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext as Client } from "../index.js";
import {
  vectorStoreConfigurationSerializer,
  agentV1ErrorDeserializer,
  _AgentsPagedResultVectorStore,
  _agentsPagedResultVectorStoreDeserializer,
  VectorStore,
  vectorStoreDeserializer,
  vectorStoreExpirationPolicySerializer,
  vectorStoreChunkingStrategyRequestUnionSerializer,
  VectorStoreDeletionStatus,
  vectorStoreDeletionStatusDeserializer,
} from "../../models/models.js";
import {
  VectorStoresDeleteVectorStoreOptionalParams,
  VectorStoresModifyVectorStoreOptionalParams,
  VectorStoresGetVectorStoreOptionalParams,
  VectorStoresCreateVectorStoreOptionalParams,
  VectorStoresListVectorStoresOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState, OperationStatus } from "@azure/core-lro";
import { createPoller } from "../poller.js";

export function _deleteVectorStoreSend(
  context: Client,
  vectorStoreId: string,
  options: VectorStoresDeleteVectorStoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}{?api%2Dversion}",
    {
      vectorStoreId: vectorStoreId,
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

export async function _deleteVectorStoreDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return vectorStoreDeletionStatusDeserializer(result.body);
}

/** Deletes the vector store object matching the specified ID. */
export async function deleteVectorStore(
  context: Client,
  vectorStoreId: string,
  options: VectorStoresDeleteVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStoreDeletionStatus> {
  const result = await _deleteVectorStoreSend(context, vectorStoreId, options);
  return _deleteVectorStoreDeserialize(result);
}

export function _modifyVectorStoreSend(
  context: Client,
  vectorStoreId: string,
  options: VectorStoresModifyVectorStoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}{?api-version}",
    {
      vectorStoreId: vectorStoreId,
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
    body: {
      name: options?.name,
      expires_after: !options?.expiresAfter
        ? options?.expiresAfter
        : vectorStoreExpirationPolicySerializer(options?.expiresAfter),
      metadata: options?.metadata,
    },
  });
}

export async function _modifyVectorStoreDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return vectorStoreDeserializer(result.body);
}

/** Modifies an existing vector store. */
export async function modifyVectorStore(
  context: Client,
  vectorStoreId: string,
  options: VectorStoresModifyVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStore> {
  const result = await _modifyVectorStoreSend(context, vectorStoreId, options);
  return _modifyVectorStoreDeserialize(result);
}

export function _getVectorStoreSend(
  context: Client,
  vectorStoreId: string,
  options: VectorStoresGetVectorStoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}{?api-version}",
    {
      vectorStoreId: vectorStoreId,
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

export async function _getVectorStoreDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return vectorStoreDeserializer(result.body);
}

/** Returns the vector store object matching the specified ID. */
export async function getVectorStore(
  context: Client,
  vectorStoreId: string,
  options: VectorStoresGetVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStore> {
  const result = await _getVectorStoreSend(context, vectorStoreId, options);
  return _getVectorStoreDeserialize(result);
}

export function _createVectorStoreSend(
  context: Client,
  options: VectorStoresCreateVectorStoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores{?api%2Dversion}",
    {
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
      name: options?.name,
      configuration: !options?.storeConfiguration
        ? options?.storeConfiguration
        : vectorStoreConfigurationSerializer(options?.storeConfiguration),
      expires_after: !options?.expiresAfter
        ? options?.expiresAfter
        : vectorStoreExpirationPolicySerializer(options?.expiresAfter),
      chunking_strategy: !options?.chunkingStrategy
        ? options?.chunkingStrategy
        : vectorStoreChunkingStrategyRequestUnionSerializer(options?.chunkingStrategy),
      metadata: options?.metadata,
    },
  });
}

export async function _createVectorStoreDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return vectorStoreDeserializer(result.body);
}

/** Creates a vector store. */
export async function createVectorStoreInternal(
  context: Client,
  options: VectorStoresCreateVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStore> {
  const result = await _createVectorStoreSend(context, options);
  return _createVectorStoreDeserialize(result);
}

/** Creates a vector store. */
export function createVectorStore(
  context: Client,
  options: VectorStoresCreateVectorStoreOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VectorStore>, VectorStore> {
  return createPoller<VectorStore>({
    initOperation: async () => {
      return createVectorStoreInternal(context, options);
    },
    pollOperation: async (currentResult: VectorStore) => {
      return getVectorStore(context, currentResult.id, options);
    },
    getOperationStatus: getLroOperationStatus,
    intervalInMs: options.pollingOptions?.intervalInMs,
  });
}

/**
 * Creates a vector store and poll.
 */
export function createVectorStoreAndPoll(
  context: Client,
  options: VectorStoresCreateVectorStoreOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VectorStore>, VectorStore> {
  return createPoller<VectorStore>({
    initOperation: async () => {
      return createVectorStoreInternal(context, options);
    },
    pollOperation: async (currentResult: VectorStore) => {
      return getVectorStore(context, currentResult.id, options);
    },
    getOperationStatus: getLroOperationStatus,
    intervalInMs: options.pollingOptions?.intervalInMs,
  });
}

export function _listVectorStoresSend(
  context: Client,
  options: VectorStoresListVectorStoresOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores{?api%2Dversion,limit,order,after,before}",
    {
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

export async function _listVectorStoresDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultVectorStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return _agentsPagedResultVectorStoreDeserializer(result.body);
}

/** Returns a list of vector stores. */
export function listVectorStores(
  context: Client,
  options: VectorStoresListVectorStoresOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VectorStore> {
  return buildPagedAsyncIterator(
    context,
    () => _listVectorStoresSend(context, options),
    _listVectorStoresDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

function getLroOperationStatus(result: VectorStore): OperationStatus {
  switch (result.status) {
    case "in_progress":
      return "running";
    case "completed":
      return "succeeded";
    case "expired":
      return "failed";
    default:
      return "failed";
  }
}
