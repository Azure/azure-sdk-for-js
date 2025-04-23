// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext as Client } from "./index.js";
import {
  toolResourcesSerializer,
  vectorStoreDataSourceArraySerializer,
  vectorStoreDataSourceSerializer,
  vectorStoreConfigurationSerializer,
  toolDefinitionUnionArraySerializer,
  agentsApiResponseFormatOptionSerializer,
  Agent,
  agentDeserializer,
  OpenAIPageableListOfAgent,
  openAIPageableListOfAgentDeserializer,
  AgentDeletionStatus,
  agentDeletionStatusDeserializer,
  MessageRole,
  MessageInputContent,
  messageInputContentSerializer,
  messageAttachmentArraySerializer,
  threadMessageOptionsArraySerializer,
  AgentThread,
  agentThreadDeserializer,
  ThreadDeletionStatus,
  threadDeletionStatusDeserializer,
  OpenAIPageableListOfAgentThread,
  openAIPageableListOfAgentThreadDeserializer,
  ThreadMessage,
  threadMessageDeserializer,
  OpenAIPageableListOfThreadMessage,
  openAIPageableListOfThreadMessageDeserializer,
  truncationObjectSerializer,
  agentsApiToolChoiceOptionSerializer,
  ThreadRun,
  threadRunDeserializer,
  updateToolResourcesOptionsSerializer,
  OpenAIPageableListOfThreadRun,
  openAIPageableListOfThreadRunDeserializer,
  ToolOutput,
  toolOutputArraySerializer,
  agentThreadCreationOptionsSerializer,
  RunStep,
  runStepDeserializer,
  OpenAIPageableListOfRunStep,
  openAIPageableListOfRunStepDeserializer,
  FileListResponse,
  fileListResponseDeserializer,
  OpenAIFile,
  openAIFileDeserializer,
  FilePurpose,
  _uploadFileRequestSerializer,
  FileDeletionStatus,
  fileDeletionStatusDeserializer,
  OpenAIPageableListOfVectorStore,
  openAIPageableListOfVectorStoreDeserializer,
  VectorStore,
  vectorStoreDeserializer,
  vectorStoreExpirationPolicySerializer,
  vectorStoreChunkingStrategyRequestUnionSerializer,
  VectorStoreDeletionStatus,
  vectorStoreDeletionStatusDeserializer,
  OpenAIPageableListOfVectorStoreFile,
  openAIPageableListOfVectorStoreFileDeserializer,
  VectorStoreFile,
  vectorStoreFileDeserializer,
  VectorStoreFileDeletionStatus,
  vectorStoreFileDeletionStatusDeserializer,
  VectorStoreFileBatch,
  vectorStoreFileBatchDeserializer,
} from "../models/models.js";
import {
  ListVectorStoreFileBatchFilesOptionalParams,
  CancelVectorStoreFileBatchOptionalParams,
  GetVectorStoreFileBatchOptionalParams,
  CreateVectorStoreFileBatchOptionalParams,
  DeleteVectorStoreFileOptionalParams,
  GetVectorStoreFileOptionalParams,
  CreateVectorStoreFileOptionalParams,
  ListVectorStoreFilesOptionalParams,
  DeleteVectorStoreOptionalParams,
  ModifyVectorStoreOptionalParams,
  GetVectorStoreOptionalParams,
  CreateVectorStoreOptionalParams,
  ListVectorStoresOptionalParams,
  GetFileContentOptionalParams,
  GetFileOptionalParams,
  DeleteFileOptionalParams,
  UploadFileOptionalParams,
  ListFilesOptionalParams,
  ListRunStepsOptionalParams,
  GetRunStepOptionalParams,
  CreateThreadAndRunOptionalParams,
  CancelRunOptionalParams,
  SubmitToolOutputsToRunOptionalParams,
  UpdateRunOptionalParams,
  GetRunOptionalParams,
  ListRunsOptionalParams,
  CreateRunOptionalParams,
  UpdateMessageOptionalParams,
  GetMessageOptionalParams,
  ListMessagesOptionalParams,
  CreateMessageOptionalParams,
  ListThreadsOptionalParams,
  DeleteThreadOptionalParams,
  UpdateThreadOptionalParams,
  GetThreadOptionalParams,
  CreateThreadOptionalParams,
  DeleteAgentOptionalParams,
  UpdateAgentOptionalParams,
  GetAgentOptionalParams,
  ListAgentsOptionalParams,
  CreateAgentOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listVectorStoreFileBatchFilesSend(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: ListVectorStoreFileBatchFilesOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .get({
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
  options: ListVectorStoreFileBatchFilesOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfVectorStoreFile> {
  const result = await _listVectorStoreFileBatchFilesSend(
    context,
    vectorStoreId,
    batchId,
    options,
  );
  return _listVectorStoreFileBatchFilesDeserialize(result);
}

export function _cancelVectorStoreFileBatchSend(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: CancelVectorStoreFileBatchOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .post({
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
  options: CancelVectorStoreFileBatchOptionalParams = { requestOptions: {} },
): Promise<VectorStoreFileBatch> {
  const result = await _cancelVectorStoreFileBatchSend(
    context,
    vectorStoreId,
    batchId,
    options,
  );
  return _cancelVectorStoreFileBatchDeserialize(result);
}

export function _getVectorStoreFileBatchSend(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: GetVectorStoreFileBatchOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .get({
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
  options: GetVectorStoreFileBatchOptionalParams = { requestOptions: {} },
): Promise<VectorStoreFileBatch> {
  const result = await _getVectorStoreFileBatchSend(
    context,
    vectorStoreId,
    batchId,
    options,
  );
  return _getVectorStoreFileBatchDeserialize(result);
}

export function _createVectorStoreFileBatchSend(
  context: Client,
  vectorStoreId: string,
  options: CreateVectorStoreFileBatchOptionalParams = { requestOptions: {} },
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
        : vectorStoreChunkingStrategyRequestUnionSerializer(
            options?.chunkingStrategy,
          ),
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
export async function createVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  options: CreateVectorStoreFileBatchOptionalParams = { requestOptions: {} },
): Promise<VectorStoreFileBatch> {
  const result = await _createVectorStoreFileBatchSend(
    context,
    vectorStoreId,
    options,
  );
  return _createVectorStoreFileBatchDeserialize(result);
}

export function _deleteVectorStoreFileSend(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: DeleteVectorStoreFileOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .delete({
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
    throw createRestError(result);
  }

  return vectorStoreFileDeletionStatusDeserializer(result.body);
}

/**
 * Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted.
 * To delete the file, use the delete file endpoint.
 */
export async function deleteVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: DeleteVectorStoreFileOptionalParams = { requestOptions: {} },
): Promise<VectorStoreFileDeletionStatus> {
  const result = await _deleteVectorStoreFileSend(
    context,
    vectorStoreId,
    fileId,
    options,
  );
  return _deleteVectorStoreFileDeserialize(result);
}

export function _getVectorStoreFileSend(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: GetVectorStoreFileOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .get({
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
    throw createRestError(result);
  }

  return vectorStoreFileDeserializer(result.body);
}

/** Retrieves a vector store file. */
export async function getVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: GetVectorStoreFileOptionalParams = { requestOptions: {} },
): Promise<VectorStoreFile> {
  const result = await _getVectorStoreFileSend(
    context,
    vectorStoreId,
    fileId,
    options,
  );
  return _getVectorStoreFileDeserialize(result);
}

export function _createVectorStoreFileSend(
  context: Client,
  vectorStoreId: string,
  options: CreateVectorStoreFileOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .post({
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
          : vectorStoreChunkingStrategyRequestUnionSerializer(
              options?.chunkingStrategy,
            ),
      },
    });
}

export async function _createVectorStoreFileDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return vectorStoreFileDeserializer(result.body);
}

/** Create a vector store file by attaching a file to a vector store. */
export async function createVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  options: CreateVectorStoreFileOptionalParams = { requestOptions: {} },
): Promise<VectorStoreFile> {
  const result = await _createVectorStoreFileSend(
    context,
    vectorStoreId,
    options,
  );
  return _createVectorStoreFileDeserialize(result);
}

export function _listVectorStoreFilesSend(
  context: Client,
  vectorStoreId: string,
  options: ListVectorStoreFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/files{?api%2Dversion,filter,limit,order,after,before}",
    {
      vectorStoreId: vectorStoreId,
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listVectorStoreFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIPageableListOfVectorStoreFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return openAIPageableListOfVectorStoreFileDeserializer(result.body);
}

/** Returns a list of vector store files. */
export async function listVectorStoreFiles(
  context: Client,
  vectorStoreId: string,
  options: ListVectorStoreFilesOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfVectorStoreFile> {
  const result = await _listVectorStoreFilesSend(
    context,
    vectorStoreId,
    options,
  );
  return _listVectorStoreFilesDeserialize(result);
}

export function _deleteVectorStoreSend(
  context: Client,
  vectorStoreId: string,
  options: DeleteVectorStoreOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .delete({
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
    throw createRestError(result);
  }

  return vectorStoreDeletionStatusDeserializer(result.body);
}

/** Deletes the vector store object matching the specified ID. */
export async function deleteVectorStore(
  context: Client,
  vectorStoreId: string,
  options: DeleteVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStoreDeletionStatus> {
  const result = await _deleteVectorStoreSend(context, vectorStoreId, options);
  return _deleteVectorStoreDeserialize(result);
}

export function _modifyVectorStoreSend(
  context: Client,
  vectorStoreId: string,
  options: ModifyVectorStoreOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .post({
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
    throw createRestError(result);
  }

  return vectorStoreDeserializer(result.body);
}

/** The ID of the vector store to modify. */
export async function modifyVectorStore(
  context: Client,
  vectorStoreId: string,
  options: ModifyVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStore> {
  const result = await _modifyVectorStoreSend(context, vectorStoreId, options);
  return _modifyVectorStoreDeserialize(result);
}

export function _getVectorStoreSend(
  context: Client,
  vectorStoreId: string,
  options: GetVectorStoreOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .get({
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
    throw createRestError(result);
  }

  return vectorStoreDeserializer(result.body);
}

/** Returns the vector store object matching the specified ID. */
export async function getVectorStore(
  context: Client,
  vectorStoreId: string,
  options: GetVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStore> {
  const result = await _getVectorStoreSend(context, vectorStoreId, options);
  return _getVectorStoreDeserialize(result);
}

export function _createVectorStoreSend(
  context: Client,
  options: CreateVectorStoreOptionalParams = { requestOptions: {} },
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
        : vectorStoreChunkingStrategyRequestUnionSerializer(
            options?.chunkingStrategy,
          ),
      metadata: options?.metadata,
    },
  });
}

export async function _createVectorStoreDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return vectorStoreDeserializer(result.body);
}

/** Creates a vector store. */
export async function createVectorStore(
  context: Client,
  options: CreateVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStore> {
  const result = await _createVectorStoreSend(context, options);
  return _createVectorStoreDeserialize(result);
}

export function _listVectorStoresSend(
  context: Client,
  options: ListVectorStoresOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listVectorStoresDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIPageableListOfVectorStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return openAIPageableListOfVectorStoreDeserializer(result.body);
}

/** Returns a list of vector stores. */
export async function listVectorStores(
  context: Client,
  options: ListVectorStoresOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfVectorStore> {
  const result = await _listVectorStoresSend(context, options);
  return _listVectorStoresDeserialize(result);
}

export function _getFileContentSend(
  context: Client,
  fileId: string,
  options: GetFileContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files/{fileId}/content{?api%2Dversion}",
    {
      fileId: fileId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/octet-stream",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getFileContentDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return result.body;
}

/** Retrieves the raw content of a specific file. */
export async function getFileContent(
  context: Client,
  fileId: string,
  options: GetFileContentOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const result = await _getFileContentSend(context, fileId, options);
  return _getFileContentDeserialize(result);
}

export function _getFileSend(
  context: Client,
  fileId: string,
  options: GetFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files/{fileId}{?api%2Dversion}",
    {
      fileId: fileId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getFileDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return openAIFileDeserializer(result.body);
}

/** Returns information about a specific file. Does not retrieve file content. */
export async function getFile(
  context: Client,
  fileId: string,
  options: GetFileOptionalParams = { requestOptions: {} },
): Promise<OpenAIFile> {
  const result = await _getFileSend(context, fileId, options);
  return _getFileDeserialize(result);
}

export function _deleteFileSend(
  context: Client,
  fileId: string,
  options: DeleteFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files/{fileId}{?api%2Dversion}",
    {
      fileId: fileId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteFileDeserialize(
  result: PathUncheckedResponse,
): Promise<FileDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return fileDeletionStatusDeserializer(result.body);
}

/** Delete a previously uploaded file. */
export async function deleteFile(
  context: Client,
  fileId: string,
  options: DeleteFileOptionalParams = { requestOptions: {} },
): Promise<FileDeletionStatus> {
  const result = await _deleteFileSend(context, fileId, options);
  return _deleteFileDeserialize(result);
}

export function _uploadFileSend(
  context: Client,
  body: {
    file: __PLACEHOLDER_o291__;
    purpose: FilePurpose;
    filename?: string;
  },
  options: UploadFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "multipart/form-data",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: _uploadFileRequestSerializer(body),
    });
}

export async function _uploadFileDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return openAIFileDeserializer(result.body);
}

/** Uploads a file for use by other operations. */
export async function uploadFile(
  context: Client,
  body: {
    file: __PLACEHOLDER_o291__;
    purpose: FilePurpose;
    filename?: string;
  },
  options: UploadFileOptionalParams = { requestOptions: {} },
): Promise<OpenAIFile> {
  const result = await _uploadFileSend(context, body, options);
  return _uploadFileDeserialize(result);
}

export function _listFilesSend(
  context: Client,
  options: ListFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files{?api%2Dversion,purpose}",
    {
      "api%2Dversion": context.apiVersion,
      purpose: options?.purpose,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<FileListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return fileListResponseDeserializer(result.body);
}

/** Gets a list of previously uploaded files. */
export async function listFiles(
  context: Client,
  options: ListFilesOptionalParams = { requestOptions: {} },
): Promise<FileListResponse> {
  const result = await _listFilesSend(context, options);
  return _listFilesDeserialize(result);
}

export function _listRunStepsSend(
  context: Client,
  threadId: string,
  runId: string,
  options: ListRunStepsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}/steps{?api%2Dversion,include%5B%5D,limit,order,after,before}",
    {
      threadId: threadId,
      runId: runId,
      "api%2Dversion": context.apiVersion,
      "include%5B%5D": !options?.include
        ? options?.include
        : options?.include.map((p: any) => {
            return p;
          }),
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listRunStepsDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIPageableListOfRunStep> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return openAIPageableListOfRunStepDeserializer(result.body);
}

/** Gets a list of run steps from a thread run. */
export async function listRunSteps(
  context: Client,
  threadId: string,
  runId: string,
  options: ListRunStepsOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfRunStep> {
  const result = await _listRunStepsSend(context, threadId, runId, options);
  return _listRunStepsDeserialize(result);
}

export function _getRunStepSend(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options: GetRunStepOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}/steps/{stepId}{?api%2Dversion,include%5B%5D}",
    {
      threadId: threadId,
      runId: runId,
      stepId: stepId,
      "api%2Dversion": context.apiVersion,
      "include%5B%5D": !options?.include
        ? options?.include
        : options?.include.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getRunStepDeserialize(
  result: PathUncheckedResponse,
): Promise<RunStep> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return runStepDeserializer(result.body);
}

/** Gets a single run step from a thread run. */
export async function getRunStep(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options: GetRunStepOptionalParams = { requestOptions: {} },
): Promise<RunStep> {
  const result = await _getRunStepSend(
    context,
    threadId,
    runId,
    stepId,
    options,
  );
  return _getRunStepDeserialize(result);
}

export function _createThreadAndRunSend(
  context: Client,
  assistantId: string,
  options: CreateThreadAndRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/runs{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        assistant_id: assistantId,
        thread: !options?.thread
          ? options?.thread
          : agentThreadCreationOptionsSerializer(options?.thread),
        model: options?.model,
        instructions: options?.instructions,
        tools: !options?.tools
          ? options?.tools
          : toolDefinitionUnionArraySerializer(options?.tools),
        tool_resources: !options?.toolResources
          ? options?.toolResources
          : updateToolResourcesOptionsSerializer(options?.toolResources),
        stream: options?.stream,
        temperature: options?.temperature,
        top_p: options?.topP,
        max_prompt_tokens: options?.maxPromptTokens,
        max_completion_tokens: options?.maxCompletionTokens,
        truncation_strategy: !options?.truncationStrategy
          ? options?.truncationStrategy
          : truncationObjectSerializer(options?.truncationStrategy),
        tool_choice: !options?.toolChoice
          ? options?.toolChoice
          : agentsApiToolChoiceOptionSerializer(options?.toolChoice),
        response_format: !options?.responseFormat
          ? options?.responseFormat
          : agentsApiResponseFormatOptionSerializer(options?.responseFormat),
        parallel_tool_calls: options?.parallelToolCalls,
        metadata: options?.metadata,
      },
    });
}

export async function _createThreadAndRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadRunDeserializer(result.body);
}

/** Creates a new agent thread and immediately starts a run using that new thread. */
export async function createThreadAndRun(
  context: Client,
  assistantId: string,
  options: CreateThreadAndRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _createThreadAndRunSend(context, assistantId, options);
  return _createThreadAndRunDeserialize(result);
}

export function _cancelRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: CancelRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}/cancel{?api%2Dversion}",
    {
      threadId: threadId,
      runId: runId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _cancelRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadRunDeserializer(result.body);
}

/** Cancels a run of an in progress thread. */
export async function cancelRun(
  context: Client,
  threadId: string,
  runId: string,
  options: CancelRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _cancelRunSend(context, threadId, runId, options);
  return _cancelRunDeserialize(result);
}

export function _submitToolOutputsToRunSend(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: ToolOutput[],
  options: SubmitToolOutputsToRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}/submit_tool_outputs{?api%2Dversion}",
    {
      threadId: threadId,
      runId: runId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        tool_outputs: toolOutputArraySerializer(toolOutputs),
        stream: options?.stream,
      },
    });
}

export async function _submitToolOutputsToRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadRunDeserializer(result.body);
}

/** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
export async function submitToolOutputsToRun(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: ToolOutput[],
  options: SubmitToolOutputsToRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _submitToolOutputsToRunSend(
    context,
    threadId,
    runId,
    toolOutputs,
    options,
  );
  return _submitToolOutputsToRunDeserialize(result);
}

export function _updateRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: UpdateRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}{?api%2Dversion}",
    {
      threadId: threadId,
      runId: runId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: { metadata: options?.metadata },
    });
}

export async function _updateRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadRunDeserializer(result.body);
}

/** Modifies an existing thread run. */
export async function updateRun(
  context: Client,
  threadId: string,
  runId: string,
  options: UpdateRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _updateRunSend(context, threadId, runId, options);
  return _updateRunDeserialize(result);
}

export function _getRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: GetRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}{?api%2Dversion}",
    {
      threadId: threadId,
      runId: runId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadRunDeserializer(result.body);
}

/** Gets an existing run from an existing thread. */
export async function getRun(
  context: Client,
  threadId: string,
  runId: string,
  options: GetRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _getRunSend(context, threadId, runId, options);
  return _getRunDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  threadId: string,
  options: ListRunsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs{?api%2Dversion,limit,order,after,before}",
    {
      threadId: threadId,
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listRunsDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIPageableListOfThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return openAIPageableListOfThreadRunDeserializer(result.body);
}

/** Gets a list of runs for a specified thread. */
export async function listRuns(
  context: Client,
  threadId: string,
  options: ListRunsOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfThreadRun> {
  const result = await _listRunsSend(context, threadId, options);
  return _listRunsDeserialize(result);
}

export function _createRunSend(
  context: Client,
  threadId: string,
  assistantId: string,
  options: CreateRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs{?api%2Dversion,include%5B%5D}",
    {
      threadId: threadId,
      "api%2Dversion": context.apiVersion,
      "include%5B%5D": !options?.include
        ? options?.include
        : options?.include.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        assistant_id: assistantId,
        model: options?.model,
        instructions: options?.instructions,
        additional_instructions: options?.additionalInstructions,
        additional_messages: !options?.additionalMessages
          ? options?.additionalMessages
          : threadMessageOptionsArraySerializer(options?.additionalMessages),
        tools: !options?.tools
          ? options?.tools
          : toolDefinitionUnionArraySerializer(options?.tools),
        stream: options?.stream,
        temperature: options?.temperature,
        top_p: options?.topP,
        max_prompt_tokens: options?.maxPromptTokens,
        max_completion_tokens: options?.maxCompletionTokens,
        truncation_strategy: !options?.truncationStrategy
          ? options?.truncationStrategy
          : truncationObjectSerializer(options?.truncationStrategy),
        tool_choice: !options?.toolChoice
          ? options?.toolChoice
          : agentsApiToolChoiceOptionSerializer(options?.toolChoice),
        response_format: !options?.responseFormat
          ? options?.responseFormat
          : agentsApiResponseFormatOptionSerializer(options?.responseFormat),
        parallel_tool_calls: options?.parallelToolCalls,
        metadata: options?.metadata,
      },
    });
}

export async function _createRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadRunDeserializer(result.body);
}

/** Creates a new run for an agent thread. */
export async function createRun(
  context: Client,
  threadId: string,
  assistantId: string,
  options: CreateRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _createRunSend(context, threadId, assistantId, options);
  return _createRunDeserialize(result);
}

export function _updateMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: UpdateMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/messages/{messageId}{?api%2Dversion}",
    {
      threadId: threadId,
      messageId: messageId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: { metadata: options?.metadata },
    });
}

export async function _updateMessageDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadMessage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadMessageDeserializer(result.body);
}

/** Modifies an existing message on an existing thread. */
export async function updateMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: UpdateMessageOptionalParams = { requestOptions: {} },
): Promise<ThreadMessage> {
  const result = await _updateMessageSend(
    context,
    threadId,
    messageId,
    options,
  );
  return _updateMessageDeserialize(result);
}

export function _getMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: GetMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/messages/{messageId}{?api%2Dversion}",
    {
      threadId: threadId,
      messageId: messageId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getMessageDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadMessage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadMessageDeserializer(result.body);
}

/** Gets an existing message from an existing thread. */
export async function getMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: GetMessageOptionalParams = { requestOptions: {} },
): Promise<ThreadMessage> {
  const result = await _getMessageSend(context, threadId, messageId, options);
  return _getMessageDeserialize(result);
}

export function _listMessagesSend(
  context: Client,
  threadId: string,
  options: ListMessagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/messages{?api%2Dversion,runId,limit,order,after,before}",
    {
      threadId: threadId,
      "api%2Dversion": context.apiVersion,
      runId: options?.runId,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listMessagesDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIPageableListOfThreadMessage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return openAIPageableListOfThreadMessageDeserializer(result.body);
}

/** Gets a list of messages that exist on a thread. */
export async function listMessages(
  context: Client,
  threadId: string,
  options: ListMessagesOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfThreadMessage> {
  const result = await _listMessagesSend(context, threadId, options);
  return _listMessagesDeserialize(result);
}

export function _createMessageSend(
  context: Client,
  threadId: string,
  role: MessageRole,
  content: MessageInputContent,
  options: CreateMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/messages{?api%2Dversion}",
    {
      threadId: threadId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        role: role,
        content: messageInputContentSerializer(content),
        attachments: !options?.attachments
          ? options?.attachments
          : messageAttachmentArraySerializer(options?.attachments),
        metadata: options?.metadata,
      },
    });
}

export async function _createMessageDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadMessage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadMessageDeserializer(result.body);
}

/** Creates a new message on a specified thread. */
export async function createMessage(
  context: Client,
  threadId: string,
  role: MessageRole,
  content: MessageInputContent,
  options: CreateMessageOptionalParams = { requestOptions: {} },
): Promise<ThreadMessage> {
  const result = await _createMessageSend(
    context,
    threadId,
    role,
    content,
    options,
  );
  return _createMessageDeserialize(result);
}

export function _listThreadsSend(
  context: Client,
  options: ListThreadsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads{?api%2Dversion,limit,order,after,before}",
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listThreadsDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIPageableListOfAgentThread> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return openAIPageableListOfAgentThreadDeserializer(result.body);
}

/** Gets a list of threads that were previously created. */
export async function listThreads(
  context: Client,
  options: ListThreadsOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfAgentThread> {
  const result = await _listThreadsSend(context, options);
  return _listThreadsDeserialize(result);
}

export function _deleteThreadSend(
  context: Client,
  threadId: string,
  options: DeleteThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}{?api%2Dversion}",
    {
      threadId: threadId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteThreadDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return threadDeletionStatusDeserializer(result.body);
}

/** Deletes an existing thread. */
export async function deleteThread(
  context: Client,
  threadId: string,
  options: DeleteThreadOptionalParams = { requestOptions: {} },
): Promise<ThreadDeletionStatus> {
  const result = await _deleteThreadSend(context, threadId, options);
  return _deleteThreadDeserialize(result);
}

export function _updateThreadSend(
  context: Client,
  threadId: string,
  options: UpdateThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}{?api%2Dversion}",
    {
      threadId: threadId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        tool_resources: !options?.toolResources
          ? options?.toolResources
          : toolResourcesSerializer(options?.toolResources),
        metadata: options?.metadata,
      },
    });
}

export async function _updateThreadDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentThread> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return agentThreadDeserializer(result.body);
}

/** Modifies an existing thread. */
export async function updateThread(
  context: Client,
  threadId: string,
  options: UpdateThreadOptionalParams = { requestOptions: {} },
): Promise<AgentThread> {
  const result = await _updateThreadSend(context, threadId, options);
  return _updateThreadDeserialize(result);
}

export function _getThreadSend(
  context: Client,
  threadId: string,
  options: GetThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}{?api%2Dversion}",
    {
      threadId: threadId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getThreadDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentThread> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return agentThreadDeserializer(result.body);
}

/** Gets information about an existing thread. */
export async function getThread(
  context: Client,
  threadId: string,
  options: GetThreadOptionalParams = { requestOptions: {} },
): Promise<AgentThread> {
  const result = await _getThreadSend(context, threadId, options);
  return _getThreadDeserialize(result);
}

export function _createThreadSend(
  context: Client,
  options: CreateThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        messages: !options?.messages
          ? options?.messages
          : threadMessageOptionsArraySerializer(options?.messages),
        tool_resources: !options?.toolResources
          ? options?.toolResources
          : toolResourcesSerializer(options?.toolResources),
        metadata: options?.metadata,
      },
    });
}

export async function _createThreadDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentThread> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return agentThreadDeserializer(result.body);
}

/** Creates a new thread. Threads contain messages and can be run by agents. */
export async function createThread(
  context: Client,
  options: CreateThreadOptionalParams = { requestOptions: {} },
): Promise<AgentThread> {
  const result = await _createThreadSend(context, options);
  return _createThreadDeserialize(result);
}

export function _deleteAgentSend(
  context: Client,
  assistantId: string,
  options: DeleteAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants/{assistantId}{?api%2Dversion}",
    {
      assistantId: assistantId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return agentDeletionStatusDeserializer(result.body);
}

/** Deletes an agent. */
export async function deleteAgent(
  context: Client,
  assistantId: string,
  options: DeleteAgentOptionalParams = { requestOptions: {} },
): Promise<AgentDeletionStatus> {
  const result = await _deleteAgentSend(context, assistantId, options);
  return _deleteAgentDeserialize(result);
}

export function _updateAgentSend(
  context: Client,
  assistantId: string,
  options: UpdateAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants/{assistantId}{?api%2Dversion}",
    {
      assistantId: assistantId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        model: options?.model,
        name: options?.name,
        description: options?.description,
        instructions: options?.instructions,
        tools: !options?.tools
          ? options?.tools
          : toolDefinitionUnionArraySerializer(options?.tools),
        tool_resources: !options?.toolResources
          ? options?.toolResources
          : toolResourcesSerializer(options?.toolResources),
        temperature: options?.temperature,
        top_p: options?.topP,
        response_format: !options?.responseFormat
          ? options?.responseFormat
          : agentsApiResponseFormatOptionSerializer(options?.responseFormat),
        metadata: options?.metadata,
      },
    });
}

export async function _updateAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return agentDeserializer(result.body);
}

/** Modifies an existing agent. */
export async function updateAgent(
  context: Client,
  assistantId: string,
  options: UpdateAgentOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _updateAgentSend(context, assistantId, options);
  return _updateAgentDeserialize(result);
}

export function _getAgentSend(
  context: Client,
  assistantId: string,
  options: GetAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants/{assistantId}{?api%2Dversion}",
    {
      assistantId: assistantId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return agentDeserializer(result.body);
}

/** Retrieves an existing agent. */
export async function getAgent(
  context: Client,
  assistantId: string,
  options: GetAgentOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _getAgentSend(context, assistantId, options);
  return _getAgentDeserialize(result);
}

export function _listAgentsSend(
  context: Client,
  options: ListAgentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants{?api%2Dversion,limit,order,after,before}",
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listAgentsDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIPageableListOfAgent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return openAIPageableListOfAgentDeserializer(result.body);
}

/** Gets a list of agents that were previously created. */
export async function listAgents(
  context: Client,
  options: ListAgentsOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfAgent> {
  const result = await _listAgentsSend(context, options);
  return _listAgentsDeserialize(result);
}

export function _createAgentSend(
  context: Client,
  model: string,
  options: CreateAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        model: model,
        name: options?.name,
        description: options?.description,
        instructions: options?.instructions,
        tools: !options?.tools
          ? options?.tools
          : toolDefinitionUnionArraySerializer(options?.tools),
        tool_resources: !options?.toolResources
          ? options?.toolResources
          : toolResourcesSerializer(options?.toolResources),
        temperature: options?.temperature,
        top_p: options?.topP,
        response_format: !options?.responseFormat
          ? options?.responseFormat
          : agentsApiResponseFormatOptionSerializer(options?.responseFormat),
        metadata: options?.metadata,
      },
    });
}

export async function _createAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return agentDeserializer(result.body);
}

/** Creates a new agent. */
export async function createAgent(
  context: Client,
  model: string,
  options: CreateAgentOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _createAgentSend(context, model, options);
  return _createAgentDeserialize(result);
}
