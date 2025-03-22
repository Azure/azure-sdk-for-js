// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  AgentsCancelRunOptionalParams,
  AgentsCancelVectorStoreFileBatchOptionalParams,
  AgentsCreateAgentOptionalParams,
  AgentsCreateMessageOptionalParams,
  AgentsCreateRunOptionalParams,
  AgentsCreateThreadAndRunOptionalParams,
  AgentsCreateThreadOptionalParams,
  AgentsCreateVectorStoreFileBatchOptionalParams,
  AgentsCreateVectorStoreFileOptionalParams,
  AgentsCreateVectorStoreOptionalParams,
  AgentsDeleteAgentOptionalParams,
  AgentsDeleteFileOptionalParams,
  AgentsDeleteThreadOptionalParams,
  AgentsDeleteVectorStoreFileOptionalParams,
  AgentsDeleteVectorStoreOptionalParams,
  AgentsGetAgentOptionalParams,
  AgentsGetFileContentOptionalParams,
  AgentsGetFileOptionalParams,
  AgentsGetMessageOptionalParams,
  AgentsGetRunOptionalParams,
  AgentsGetRunStepOptionalParams,
  AgentsGetThreadOptionalParams,
  AgentsGetVectorStoreFileBatchOptionalParams,
  AgentsGetVectorStoreFileOptionalParams,
  AgentsGetVectorStoreOptionalParams,
  AgentsListAgentsOptionalParams,
  AgentsListFilesOptionalParams,
  AgentsListMessagesOptionalParams,
  AgentsListRunsOptionalParams,
  AgentsListRunStepsOptionalParams,
  AgentsListVectorStoreFileBatchFilesOptionalParams,
  AgentsListVectorStoreFilesOptionalParams,
  AgentsListVectorStoresOptionalParams,
  AgentsModifyVectorStoreOptionalParams,
  AgentsSubmitToolOutputsToRunOptionalParams,
  AgentsUpdateAgentOptionalParams,
  AgentsUpdateMessageOptionalParams,
  AgentsUpdateRunOptionalParams,
  AgentsUpdateThreadOptionalParams,
  AgentsUploadFileOptionalParams,
  AIProjectContext as Client,
} from "../index.js";
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
  messageAttachmentArraySerializer,
  threadMessageOptionsArraySerializer,
  AgentThread,
  agentThreadDeserializer,
  ThreadDeletionStatus,
  threadDeletionStatusDeserializer,
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
} from "../../models/agents/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";
import { AgentsPoller } from "./poller.js";
import type {
  AgentUploadFileWithPollingOptionalParams,
  AgentsCreateVectorStoreFileBatchWithPollingOptionalParams,
  AgentsCreateVectorStoreFileWithPollingOptionalParams,
  AgentsCreateVectorStoreWithPollingOptionalParams,
  AgentRunResponse,
} from "./customModels.ts";
import { AgentEventMessageStream } from "./streamingModels.js";
import { processStream } from "./streaming.js";
import { TracingUtility } from "./tracing.js";
import { traceEndCreateOrUpdateAgent, traceStartCreateOrUpdateAgent } from "./assistantsTrace.js";
import { traceStartCreateRun, traceEndCreateOrUpdateRun, traceStartSubmitToolOutputsToRun, traceEndSubmitToolOutputsToRun } from "./runTrace.js";
import { traceStartCreateThread, traceEndCreateThread } from "./threadsTrace.js";
import { traceStartCreateMessage, traceEndCreateMessage, traceStartListMessages, traceEndListMessages } from "./messagesTrace.js";
export function _listVectorStoreFileBatchFilesSend(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: AgentsListVectorStoreFileBatchFilesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/file_batches/{batchId}/files{?api-version,filter,limit,order,after,before}",
    {
      vectorStoreId: vectorStoreId,
      batchId: batchId,
      "api-version": context.apiVersion,
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
  options: AgentsListVectorStoreFileBatchFilesOptionalParams = {
    requestOptions: {},
  },
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
  options: AgentsCancelVectorStoreFileBatchOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/file_batches/{batchId}/cancel{?api-version}",
    {
      vectorStoreId: vectorStoreId,
      batchId: batchId,
      "api-version": context.apiVersion,
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
  options: AgentsCancelVectorStoreFileBatchOptionalParams = {
    requestOptions: {},
  },
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
  options: AgentsGetVectorStoreFileBatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/file_batches/{batchId}{?api-version}",
    {
      vectorStoreId: vectorStoreId,
      batchId: batchId,
      "api-version": context.apiVersion,
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
  options: AgentsGetVectorStoreFileBatchOptionalParams = { requestOptions: {} },
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
  options: AgentsCreateVectorStoreFileBatchOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/file_batches{?api-version}",
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
  options: AgentsCreateVectorStoreFileBatchWithPollingOptionalParams = {
    requestOptions: {},
  },
): Promise<VectorStoreFileBatch> {
  const result = await _createVectorStoreFileBatchSend(
    context,
    vectorStoreId,
    options,
  );
  return _createVectorStoreFileBatchDeserialize(result);
}

/** Create a vector store file batch and poll. */
export function createVectorStoreFileBatchAndPoll(
  context: Client,
  vectorStoreId: string,
  options: AgentsCreateVectorStoreFileBatchWithPollingOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  PollOperationState<VectorStoreFileBatch>,
  VectorStoreFileBatch
> {
  async function updateCreateVectorStoreFileBatchPoll(
    currentResult?: VectorStoreFileBatch,
  ): Promise<{ result: VectorStoreFileBatch; completed: boolean }> {
    let vectorStore: VectorStoreFileBatch;
    if (!currentResult) {
      vectorStore = await createVectorStoreFileBatch(context, vectorStoreId, options);
    } else {
      vectorStore = await getVectorStoreFileBatch(
        context,
        vectorStoreId,
        currentResult.id,
        options,
      );
    }
    return {
      result: vectorStore,
      completed: vectorStore.status !== "in_progress",
    };
  }

  async function cancelCreateVectorStoreFileBatchPoll(
    currentResult: VectorStoreFileBatch,
  ): Promise<boolean> {
    const result = await cancelVectorStoreFileBatch(context, vectorStoreId, currentResult.id);
    return result.status === "cancelled";
  }

  return new AgentsPoller<VectorStoreFileBatch>({
    update: updateCreateVectorStoreFileBatchPoll,
    cancel: cancelCreateVectorStoreFileBatchPoll,
    pollingOptions: options.pollingOptions,
  });
}

export function _deleteVectorStoreFileSend(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: AgentsDeleteVectorStoreFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/files/{fileId}{?api-version}",
    {
      vectorStoreId: vectorStoreId,
      fileId: fileId,
      "api-version": context.apiVersion,
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
  options: AgentsDeleteVectorStoreFileOptionalParams = { requestOptions: {} },
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
  options: AgentsGetVectorStoreFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/files/{fileId}{?api-version}",
    {
      vectorStoreId: vectorStoreId,
      fileId: fileId,
      "api-version": context.apiVersion,
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
  options: AgentsGetVectorStoreFileOptionalParams = { requestOptions: {} },
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
  options: AgentsCreateVectorStoreFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/files{?api-version}",
    {
      vectorStoreId: vectorStoreId,
      "api-version": context.apiVersion,
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
  options: AgentsCreateVectorStoreFileWithPollingOptionalParams = { requestOptions: {} },
): Promise<VectorStoreFile> {
  const result = await _createVectorStoreFileSend(
    context,
    vectorStoreId,
    options,
  );
  return _createVectorStoreFileDeserialize(result);
}

export function createVectorStoreFileAndPoll(
  context: Client,
  vectorStoreId: string,
  options: AgentsCreateVectorStoreFileWithPollingOptionalParams = { requestOptions: {} },
): PollerLike<PollOperationState<VectorStoreFile>, VectorStoreFile> {
  async function updateCreateVectorStoreFilePoll(
    currentResult?: VectorStoreFile,
  ): Promise<{ result: VectorStoreFile; completed: boolean }> {
    let vectorStoreFile: VectorStoreFile;
    if (!currentResult) {
      vectorStoreFile = await createVectorStoreFile(context, vectorStoreId, options);
    } else {
      vectorStoreFile = await getVectorStoreFile(context, vectorStoreId, currentResult.id, options);
    }
    return {
      result: vectorStoreFile,
      completed: vectorStoreFile.status !== "in_progress",
    };
  }

  return new AgentsPoller<VectorStoreFile>({
    update: updateCreateVectorStoreFilePoll,
    pollingOptions: options.pollingOptions,
  });
}

export function _listVectorStoreFilesSend(
  context: Client,
  vectorStoreId: string,
  options: AgentsListVectorStoreFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores/{vectorStoreId}/files{?api-version,filter,limit,order,after,before}",
    {
      vectorStoreId: vectorStoreId,
      "api-version": context.apiVersion,
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
  options: AgentsListVectorStoreFilesOptionalParams = { requestOptions: {} },
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
  options: AgentsDeleteVectorStoreOptionalParams = { requestOptions: {} },
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
  options: AgentsDeleteVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStoreDeletionStatus> {
  const result = await _deleteVectorStoreSend(context, vectorStoreId, options);
  return _deleteVectorStoreDeserialize(result);
}

export function _modifyVectorStoreSend(
  context: Client,
  vectorStoreId: string,
  options: AgentsModifyVectorStoreOptionalParams = { requestOptions: {} },
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
  options: AgentsModifyVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStore> {
  const result = await _modifyVectorStoreSend(context, vectorStoreId, options);
  return _modifyVectorStoreDeserialize(result);
}

export function _getVectorStoreSend(
  context: Client,
  vectorStoreId: string,
  options: AgentsGetVectorStoreOptionalParams = { requestOptions: {} },
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
  options: AgentsGetVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStore> {
  const result = await _getVectorStoreSend(context, vectorStoreId, options);
  return _getVectorStoreDeserialize(result);
}

export function _createVectorStoreSend(
  context: Client,
  options: AgentsCreateVectorStoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores{?api-version}",
    {
      "api-version": context.apiVersion,
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
  options: AgentsCreateVectorStoreWithPollingOptionalParams = { requestOptions: {} },
): Promise<VectorStore> {
  const result = await _createVectorStoreSend(context, options);
  return _createVectorStoreDeserialize(result);
}

export function createVectorStoreAndPoll(
  context: Client,
  options: AgentsCreateVectorStoreWithPollingOptionalParams = { requestOptions: {} },
): PollerLike<PollOperationState<VectorStore>, VectorStore> {
  async function updateCreateVectorStorePoll(
    currentResult?: VectorStore,
  ): Promise<{ result: VectorStore; completed: boolean }> {
    let vectorStore: VectorStore;
    if (!currentResult) {
      vectorStore = await createVectorStore(context, options);
    } else {
      const getOptions: AgentsGetVectorStoreOptionalParams = {
        ...operationOptionsToRequestParameters(options),
      };
      vectorStore = await getVectorStore(context, currentResult.id, getOptions);
    }
    return {
      result: vectorStore,
      completed: vectorStore.status !== "in_progress",
    };
  }

  return new AgentsPoller<VectorStore>({
    update: updateCreateVectorStorePoll,
    pollingOptions: options.pollingOptions,
  });
}

export function _listVectorStoresSend(
  context: Client,
  options: AgentsListVectorStoresOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/vector_stores{?api-version,limit,order,after,before}",
    {
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
  options: AgentsListVectorStoresOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfVectorStore> {
  const result = await _listVectorStoresSend(context, options);
  return _listVectorStoresDeserialize(result);
}

export function _getFileContentSend(
  context: Client,
  fileId: string,
  options: AgentsGetFileContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files/{fileId}/content{?api-version}",
    {
      fileId: fileId,
      "api-version": context.apiVersion,
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

export async function _getFileContentDeserialize(
  result: PathUncheckedResponse,
): Promise<Uint8Array> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return typeof result.body === "string"
    ? stringToUint8Array(result.body, "base64")
    : result.body;
}

/** Retrieves the raw content of a specific file. */
export async function getFileContent(
  context: Client,
  fileId: string,
  options: AgentsGetFileContentOptionalParams = { requestOptions: {} },
): Promise<Uint8Array> {
  const result = await _getFileContentSend(context, fileId, options);
  return _getFileContentDeserialize(result);
}

export function _getFileSend(
  context: Client,
  fileId: string,
  options: AgentsGetFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files/{fileId}{?api-version}",
    {
      fileId: fileId,
      "api-version": context.apiVersion,
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
  options: AgentsGetFileOptionalParams = { requestOptions: {} },
): Promise<OpenAIFile> {
  const result = await _getFileSend(context, fileId, options);
  return _getFileDeserialize(result);
}

export function _deleteFileSend(
  context: Client,
  fileId: string,
  options: AgentsDeleteFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files/{fileId}{?api-version}",
    {
      fileId: fileId,
      "api-version": context.apiVersion,
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
  options: AgentsDeleteFileOptionalParams = { requestOptions: {} },
): Promise<FileDeletionStatus> {
  const result = await _deleteFileSend(context, fileId, options);
  return _deleteFileDeserialize(result);
}

export function _uploadFileSend(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: AgentsUploadFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files{?api-version}",
    {
      "api-version": context.apiVersion,
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
      // body: {
      //   file: uint8ArrayToString(file, "base64"),
      //   purpose: purpose,
      //   filename: options?.filename,
      // },
      body: [
        { name: "file" as const, body: uint8ArrayToString(file, "base64"), filename: options?.filename ?? "test-file" },
        { name: "purpose" as const, body: purpose },
      ],
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
  file: Uint8Array,
  purpose: FilePurpose,
  options: AgentUploadFileWithPollingOptionalParams = { requestOptions: {} },
): Promise<OpenAIFile> {
  const result = await _uploadFileSend(context, file, purpose, options);
  return _uploadFileDeserialize(result);
}

export function uploadFileAndPoll(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: AgentUploadFileWithPollingOptionalParams = { requestOptions: {} },
): PollerLike<PollOperationState<OpenAIFile>, OpenAIFile> {
  async function updateUploadFileAndPoll(
    currentResult?: OpenAIFile,
  ): Promise<{ result: OpenAIFile; completed: boolean }> {
    let outputFile: OpenAIFile;
    if (!currentResult) {
      outputFile = await uploadFile(context, file, purpose, options);
    } else {
      outputFile = await getFile(context, currentResult.id, options);
    }
    return {
      result: outputFile,
      completed:
        outputFile.status === "uploaded" || outputFile.status === "processed" || outputFile.status === "deleted",
    };
  }

  return new AgentsPoller<OpenAIFile>({
    update: updateUploadFileAndPoll,
    pollingOptions: options.pollingOptions ?? {},
  });
};

export function _listFilesSend(
  context: Client,
  options: AgentsListFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/files{?api-version,purpose}",
    {
      "api-version": context.apiVersion,
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
  options: AgentsListFilesOptionalParams = { requestOptions: {} },
): Promise<FileListResponse> {
  const result = await _listFilesSend(context, options);
  return _listFilesDeserialize(result);
}

export function _listRunStepsSend(
  context: Client,
  threadId: string,
  runId: string,
  options: AgentsListRunStepsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}/steps{?api-version,include[],limit,order,after,before}",
    {
      threadId: threadId,
      runId: runId,
      "api-version": context.apiVersion,
      "include[]": !options?.include
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
  options: AgentsListRunStepsOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfRunStep> {
  const result = await _listRunStepsSend(context, threadId, runId, options);
  return _listRunStepsDeserialize(result);
}

export function _getRunStepSend(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options: AgentsGetRunStepOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}/steps/{stepId}{?api-version,include[]}",
    {
      threadId: threadId,
      runId: runId,
      stepId: stepId,
      "api-version": context.apiVersion,
      "include[]": !options?.include
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
  options: AgentsGetRunStepOptionalParams = { requestOptions: {} },
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
  agentId: string,
  options: AgentsCreateThreadAndRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/runs{?api-version}",
    {
      "api-version": context.apiVersion,
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
        assistant_id: agentId,
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
export function createThreadAndRun(
  context: Client,
  agentId: string,
  options: AgentsCreateThreadAndRunOptionalParams = { requestOptions: {} },
): AgentRunResponse {
  async function execCreateThreadAndRun(): Promise<ThreadRun> {
    const result = await _createThreadAndRunSend(context, agentId, options);
    return _createThreadAndRunDeserialize(result);
  }

  return {
    then: (onFulfilled, onRejected) => {
      options.stream = false;
      return execCreateThreadAndRun().then(onFulfilled, onRejected).catch(onRejected);
    },
    async stream(): Promise<AgentEventMessageStream> {
      options.stream = true;
      return processStream(_createThreadAndRunSend(context, agentId, options));
    }
  };

}

export function _cancelRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: AgentsCancelRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}/cancel{?api-version}",
    {
      threadId: threadId,
      runId: runId,
      "api-version": context.apiVersion,
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
  options: AgentsCancelRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _cancelRunSend(context, threadId, runId, options);
  return _cancelRunDeserialize(result);
}

export function _submitToolOutputsToRunSend(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: ToolOutput[],
  options: AgentsSubmitToolOutputsToRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}/submit_tool_outputs{?api-version}",
    {
      threadId: threadId,
      runId: runId,
      "api-version": context.apiVersion,
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
  options: AgentsSubmitToolOutputsToRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await TracingUtility.withSpan(
    "SubmitToolOutputsToRun",
    options,
    async (updateOptions) => {
      const _result = await _submitToolOutputsToRunSend(
        context,
        threadId,
        runId,
        toolOutputs,
        updateOptions,
      );
      return _submitToolOutputsToRunDeserialize(_result);
    },
    (span, updateOptions) => traceStartSubmitToolOutputsToRun(span, { ...updateOptions, toolOutputs }, threadId, runId),
    traceEndSubmitToolOutputsToRun
  );
  return result;
}

export function _updateRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: AgentsUpdateRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}{?api-version}",
    {
      threadId: threadId,
      runId: runId,
      "api-version": context.apiVersion,
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
  options: AgentsUpdateRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _updateRunSend(context, threadId, runId, options);
  return _updateRunDeserialize(result);
}

export function _getRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: AgentsGetRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs/{runId}{?api-version}",
    {
      threadId: threadId,
      runId: runId,
      "api-version": context.apiVersion,
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
  options: AgentsGetRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _getRunSend(context, threadId, runId, options);
  return _getRunDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  threadId: string,
  options: AgentsListRunsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs{?api-version,limit,order,after,before}",
    {
      threadId: threadId,
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
  options: AgentsListRunsOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfThreadRun> {
  const result = await _listRunsSend(context, threadId, options);
  return _listRunsDeserialize(result);
}

export function _createRunSend(
  context: Client,
  threadId: string,
  agentId: string,
  options: AgentsCreateRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/runs{?api-version,include[]}",
    {
      threadId: threadId,
      "api-version": context.apiVersion,
      "include[]": !options?.include
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
        assistant_id: agentId,
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
export function createRun(
  context: Client,
  threadId: string,
  assistantId: string,
  options: AgentsCreateRunOptionalParams = { requestOptions: {} },
): AgentRunResponse {

  const createRunOptions: AgentsCreateRunOptionalParams & { assistantId: string } = {
    ...options,
    assistantId
  };

  async function executeCreateRun(): Promise<ThreadRun> {
    const result = await TracingUtility.withSpan(
      "CreateRun",
      createRunOptions,
      async (updateOptions) => {
        const _result = await _createRunSend(context, threadId, assistantId, updateOptions);
        return _createRunDeserialize(_result)
      },
      (span, updateOptions) => traceStartCreateRun(span, updateOptions, threadId, assistantId),
      traceEndCreateOrUpdateRun,
    );
    return result;
  }

  return {
    then: (onFulfilled, onRejected) => {
      options.stream = false;
      return executeCreateRun().then(onFulfilled, onRejected).catch(onRejected);
    },
    async stream(): Promise<AgentEventMessageStream> {
      options.stream = true;
      return processStream(_createRunSend(context, threadId, assistantId, options))
    }
  };
}

export function _updateMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: AgentsUpdateMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/messages/{messageId}{?api-version}",
    {
      threadId: threadId,
      messageId: messageId,
      "api-version": context.apiVersion,
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
  options: AgentsUpdateMessageOptionalParams = { requestOptions: {} },
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
  options: AgentsGetMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/messages/{messageId}{?api-version}",
    {
      threadId: threadId,
      messageId: messageId,
      "api-version": context.apiVersion,
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
  options: AgentsGetMessageOptionalParams = { requestOptions: {} },
): Promise<ThreadMessage> {
  const result = await _getMessageSend(context, threadId, messageId, options);
  return _getMessageDeserialize(result);
}

export function _listMessagesSend(
  context: Client,
  threadId: string,
  options: AgentsListMessagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/messages{?api-version,runId,limit,order,after,before}",
    {
      threadId: threadId,
      "api-version": context.apiVersion,
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
  options: AgentsListMessagesOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfThreadMessage> {
  const result = await TracingUtility.withSpan(
    "ListMessages",
    options,
    async (updateOptions) => {
      const _result = await _listMessagesSend(context, threadId, updateOptions);
      return _listMessagesDeserialize(_result)
    },
    (span, updateOptions) => traceStartListMessages(span, threadId, { ...updateOptions }),
    traceEndListMessages,
  );
  return result;
}

export function _createMessageSend(
  context: Client,
  threadId: string,
  role: MessageRole,
  content: string,
  options: AgentsCreateMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/messages{?api-version}",
    {
      threadId: threadId,
      "api-version": context.apiVersion,
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
        content: content,
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
  content: string,
  options: AgentsCreateMessageOptionalParams = { requestOptions: {} },
): Promise<ThreadMessage> {
  const result = await TracingUtility.withSpan(
    "CreateMessage",
    options,
    async (updateOptions) => {
      const _result = await _createMessageSend(context, threadId, role, content, updateOptions);
      return _createMessageDeserialize(_result)
    },
    (span, updateOptions) => traceStartCreateMessage(span, threadId, { ...updateOptions, role, content }),
    traceEndCreateMessage,
  );
  return result;
}

export function _deleteThreadSend(
  context: Client,
  threadId: string,
  options: AgentsDeleteThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}{?api-version}",
    {
      threadId: threadId,
      "api-version": context.apiVersion,
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
  options: AgentsDeleteThreadOptionalParams = { requestOptions: {} },
): Promise<ThreadDeletionStatus> {
  const result = await _deleteThreadSend(context, threadId, options);
  return _deleteThreadDeserialize(result);
}

export function _updateThreadSend(
  context: Client,
  threadId: string,
  options: AgentsUpdateThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}{?api-version}",
    {
      threadId: threadId,
      "api-version": context.apiVersion,
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
  options: AgentsUpdateThreadOptionalParams = { requestOptions: {} },
): Promise<AgentThread> {
  const result = await _updateThreadSend(context, threadId, options);
  return _updateThreadDeserialize(result);
}

export function _getThreadSend(
  context: Client,
  threadId: string,
  options: AgentsGetThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}{?api-version}",
    {
      threadId: threadId,
      "api-version": context.apiVersion,
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
  options: AgentsGetThreadOptionalParams = { requestOptions: {} },
): Promise<AgentThread> {
  const result = await _getThreadSend(context, threadId, options);
  return _getThreadDeserialize(result);
}

export function _createThreadSend(
  context: Client,
  options: AgentsCreateThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads{?api-version}",
    {
      "api-version": context.apiVersion,
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
  options: AgentsCreateThreadOptionalParams = { requestOptions: {} },
): Promise<AgentThread> {
  const result = await TracingUtility.withSpan(
    "CreateThread",
    options,
    async (updateOptions) => {
      const _result = await _createThreadSend(context, updateOptions);
      return _createThreadDeserialize(_result)
    },
    traceStartCreateThread,
    traceEndCreateThread,
  );
  return result;
}

export function _deleteAgentSend(
  context: Client,
  agentId: string,
  options: AgentsDeleteAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants/{agentId}{?api-version}",
    {
      agentId: agentId,
      "api-version": context.apiVersion,
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
  agentId: string,
  options: AgentsDeleteAgentOptionalParams = { requestOptions: {} },
): Promise<AgentDeletionStatus> {
  const result = await _deleteAgentSend(context, agentId, options);
  return _deleteAgentDeserialize(result);
}

export function _updateAgentSend(
  context: Client,
  agentId: string,
  options: AgentsUpdateAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants/{agentId}{?api-version}",
    {
      agentId: agentId,
      "api-version": context.apiVersion,
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
  agentId: string,
  options: AgentsUpdateAgentOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _updateAgentSend(context, agentId, options);
  return _updateAgentDeserialize(result);
}

export function _getAgentSend(
  context: Client,
  agentId: string,
  options: AgentsGetAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants/{agentId}{?api-version}",
    {
      agentId: agentId,
      "api-version": context.apiVersion,
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
  agentId: string,
  options: AgentsGetAgentOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _getAgentSend(context, agentId, options);
  return _getAgentDeserialize(result);
}

export function _listAgentsSend(
  context: Client,
  options: AgentsListAgentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants{?api-version,limit,order,after,before}",
    {
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
  options: AgentsListAgentsOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfAgent> {
  const result = await _listAgentsSend(context, options);
  return _listAgentsDeserialize(result);
}

export function _createAgentSend(
  context: Client,
  model: string,
  options: AgentsCreateAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/assistants{?api-version}",
    {
      "api-version": context.apiVersion,
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
  options: AgentsCreateAgentOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const createOptions: AgentsCreateAgentOptionalParams = {
    ...operationOptionsToRequestParameters(options),
    ...options,
  };
  const result = await TracingUtility.withSpan(
    "createAgent",
    { ...createOptions, model },
    async (updateOptions) => {
      const _result = await _createAgentSend(context, model, updateOptions);
      return _createAgentDeserialize(_result);
    },
    traceStartCreateOrUpdateAgent,
    traceEndCreateOrUpdateAgent,
  );
  return result;
}
