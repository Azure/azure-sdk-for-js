// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AssistantCreationOptions,
  Assistant,
  ListResponseOf,
  AssistantModificationOptions,
  AssistantDeletionStatus,
  AssistantFile,
  AssistantFileDeletionStatus,
  AssistantThreadCreationOptions,
  AssistantMessage,
  AssistantMessageContent,
  AssistantRole,
  AssistantThread,
  ThreadDeletionStatus,
  AssistantMessageFile,
  AssistantRun,
  ToolOutputSubmission,
  CreateAndRunThreadOptions,
  RunStep,
  FilePurpose,
  FileListResponse,
  InputFile,
  FileDeletionStatus,
} from "../models/models.js";
import {
  AssistantsContext as Client,
  CancelRun200Response,
  CreateAssistant200Response,
  CreateAssistantFile200Response,
  CreateMessage200Response,
  CreateRun200Response,
  CreateThread200Response,
  CreateThreadAndRun200Response,
  DeleteAssistant200Response,
  DeleteAssistantFile200Response,
  DeleteFile200Response,
  DeleteThread200Response,
  ListAssistantFiles200Response,
  ListAssistants200Response,
  ListFiles200Response,
  ListMessageFiles200Response,
  ListMessages200Response,
  ListRuns200Response,
  ListRunSteps200Response,
  ModifyAssistant200Response,
  ModifyMessage200Response,
  ModifyRun200Response,
  ModifyThread200Response,
  RetrieveAssistant200Response,
  RetrieveAssistantFile200Response,
  RetrieveFile200Response,
  RetrieveFileContent200Response,
  RetrieveMessage200Response,
  RetrieveMessageFile200Response,
  RetrieveRun200Response,
  RetrieveRunStep200Response,
  RetrieveThread200Response,
  SubmitRunToolOutputs200Response,
  UploadFile200Response,
} from "../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { createFile } from "@azure/core-rest-pipeline";
import { stringToUint8Array } from "@azure/core-util";
import {
  AssistantsCreateAssistantOptions,
  AssistantsListAssistantsOptions,
  AssistantsRetrieveAssistantOptions,
  AssistantsModifyAssistantOptions,
  AssistantsDeleteAssistantOptions,
  AssistantsCreateAssistantFileOptions,
  AssistantsListAssistantFilesOptions,
  AssistantsRetrieveAssistantFileOptions,
  AssistantsDeleteAssistantFileOptions,
  AssistantThreadsCreateThreadOptions,
  AssistantThreadsRetrieveThreadOptions,
  AssistantThreadsModifyThreadOptions,
  AssistantThreadsDeleteThreadOptions,
  AssistantMessagesCreateMessageOptions,
  AssistantMessagesListMessagesOptions,
  AssistantMessagesRetrieveMessageOptions,
  AssistantMessagesModifyMessageOptions,
  AssistantMessagesListMessageFilesOptions,
  AssistantMessagesRetrieveMessageFileOptions,
  AssistantRunsCreateRunOptions,
  AssistantRunsListRunsOptions,
  AssistantRunsRetrieveRunOptions,
  AssistantRunsModifyRunOptions,
  AssistantRunsSubmitRunToolOutputsOptions,
  AssistantRunsCancelRunOptions,
  AssistantRunsCreateThreadAndRunOptions,
  RunStepsRetrieveRunStepOptions,
 RunStepsListRunStepsOptions,
  FilesListFilesOptions,
  FilesUploadFileOptions,
  FilesDeleteFileOptions,
  FilesRetrieveFileOptions,
  FilesRetrieveFileContentOptions,
} from "../models/options.js";

export function _createAssistantSend(
  context: Client,
  body: AssistantCreationOptions,
  options: AssistantsCreateAssistantOptions = { requestOptions: {} }
): StreamableMethod<CreateAssistant200Response> {
  return context
    .path("/assistants")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        model: body["model"],
        name: body["name"],
        description: body["description"],
        instructions: body["instructions"],
        tools: (body["tools"] ?? []).map((p) => ({ 
          type: p["type"],
          function: p["function"] || undefined
        })),
        file_ids: body["fileIds"],
        metadata: body["metadata"],
      },
    });
}

export async function _createAssistantDeserialize(
  result: CreateAssistant200Response
): Promise<Assistant> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    name: result.body["name"],
    description: result.body["description"],
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: (result.body["tools"] ?? []).map((p) => ({ 
      type: p["type"],
      function: p["function"] || undefined })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

/** Creates an assistant with a model and instructions. */
export async function createAssistant(
  context: Client,
  body: AssistantCreationOptions,
  options: AssistantsCreateAssistantOptions = { requestOptions: {} }
): Promise<Assistant> {
  const result = await _createAssistantSend(context, body, options);
  return _createAssistantDeserialize(result);
}

export function _listAssistantsSend(
  context: Client,
  options: AssistantsListAssistantsOptions = { requestOptions: {} }
): StreamableMethod<ListAssistants200Response> {
  return context
    .path("/assistants")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listAssistantsDeserialize(
  result: ListAssistants200Response
): Promise<ListResponseOf<Assistant>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      object: p["object"],
      createdAt: new Date(p["created_at"]),
      name: p["name"],
      description: p["description"],
      model: p["model"],
      instructions: p["instructions"],
      tools: (p["tools"] ?? []).map((p) => ({ type: p["type"], function: p["function"] || undefined })),
      fileIds: p["file_ids"],
      metadata: p["metadata"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of assistants. */
export async function listAssistants(
  context: Client,
  options: AssistantsListAssistantsOptions = { requestOptions: {} }
): Promise<ListResponseOf<Assistant>> {
  const result = await _listAssistantsSend(context, options);
  return _listAssistantsDeserialize(result);
}

export function _retrieveAssistantSend(
  context: Client,
  assistantId: string,
  options: AssistantsRetrieveAssistantOptions = { requestOptions: {} }
): StreamableMethod<RetrieveAssistant200Response> {
  return context
    .path("/assistants/{assistantId}", assistantId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveAssistantDeserialize(
  result: RetrieveAssistant200Response
): Promise<Assistant> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    name: result.body["name"],
    description: result.body["description"],
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: (result.body["tools"] ?? []).map((p) => ({ type: p["type"], function: p["function"] || undefined })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

/** Retrieves an assistant. */
export async function retrieveAssistant(
  context: Client,
  assistantId: string,
  options: AssistantsRetrieveAssistantOptions = { requestOptions: {} }
): Promise<Assistant> {
  const result = await _retrieveAssistantSend(context, assistantId, options);
  return _retrieveAssistantDeserialize(result);
}

export function _modifyAssistantSend(
  context: Client,
  assistantId: string,
  modificationOptions: AssistantModificationOptions,
  options: AssistantsModifyAssistantOptions = { requestOptions: {} }
): StreamableMethod<ModifyAssistant200Response> {
  return context
    .path("/assistants/{assistantId}", assistantId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        model: modificationOptions["model"],
        name: modificationOptions["name"],
        description: modificationOptions["description"],
        instructions: modificationOptions["instructions"],
        tools: (modificationOptions["tools"] ?? []).map((p) => ({
          type: p["type"],
          function: p["function"] || undefined
        })),
        file_ids: modificationOptions["fileIds"],
        metadata: modificationOptions["metadata"],
      },
    });
}

export async function _modifyAssistantDeserialize(
  result: ModifyAssistant200Response
): Promise<Assistant> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    name: result.body["name"],
    description: result.body["description"],
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: (result.body["tools"] ?? []).map((p) => ({ type: p["type"], function: p["function"] || undefined })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

/** Modifies an assistant. */
export async function modifyAssistant(
  context: Client,
  assistantId: string,
  modificationOptions: AssistantModificationOptions,
  options: AssistantsModifyAssistantOptions = { requestOptions: {} }
): Promise<Assistant> {
  const result = await _modifyAssistantSend(
    context,
    assistantId,
    modificationOptions,
    options
  );
  return _modifyAssistantDeserialize(result);
}

export function _deleteAssistantSend(
  context: Client,
  assistantId: string,
  options: AssistantsDeleteAssistantOptions = { requestOptions: {} }
): StreamableMethod<DeleteAssistant200Response> {
  return context
    .path("/assistants/{assistantId}", assistantId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAssistantDeserialize(
  result: DeleteAssistant200Response
): Promise<AssistantDeletionStatus> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    deleted: result.body["deleted"],
  };
}

/** Deletes an assistant. */
export async function deleteAssistant(
  context: Client,
  assistantId: string,
  options: AssistantsDeleteAssistantOptions = { requestOptions: {} }
): Promise<AssistantDeletionStatus> {
  const result = await _deleteAssistantSend(context, assistantId, options);
  return _deleteAssistantDeserialize(result);
}

export function _createAssistantFileSend(
  context: Client,
  assistantId: string,
  fileId: string,
  options: AssistantsCreateAssistantFileOptions = { requestOptions: {} }
): StreamableMethod<CreateAssistantFile200Response> {
  return context
    .path("/assistants/{assistantId}/files", assistantId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { file_id: fileId },
    });
}

export async function _createAssistantFileDeserialize(
  result: CreateAssistantFile200Response
): Promise<AssistantFile> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    createdAt: new Date(result.body["created_at"]),
    assistantId: result.body["assistant_id"],
  };
}

/** Attaches a file to an assistant for use by tools that can read files. */
export async function createAssistantFile(
  context: Client,
  assistantId: string,
  fileId: string,
  options: AssistantsCreateAssistantFileOptions = { requestOptions: {} }
): Promise<AssistantFile> {
  const result = await _createAssistantFileSend(
    context,
    assistantId,
    fileId,
    options
  );
  return _createAssistantFileDeserialize(result);
}

export function _listAssistantFilesSend(
  context: Client,
  assistantId: string,
  options: AssistantsListAssistantFilesOptions = { requestOptions: {} }
): StreamableMethod<ListAssistantFiles200Response> {
  return context
    .path("/assistants/{assistantId}/files", assistantId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listAssistantFilesDeserialize(
  result: ListAssistantFiles200Response
): Promise<ListResponseOf<AssistantFile>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      object: p["object"],
      createdAt: new Date(p["created_at"]),
      assistantId: p["assistant_id"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of assistant files. */
export async function listAssistantFiles(
  context: Client,
  assistantId: string,
  options: AssistantsListAssistantFilesOptions = { requestOptions: {} }
): Promise<ListResponseOf<AssistantFile>> {
  const result = await _listAssistantFilesSend(context, assistantId, options);
  return _listAssistantFilesDeserialize(result);
}

export function _retrieveAssistantFileSend(
  context: Client,
  assistantId: string,
  fileId: string,
  options: AssistantsRetrieveAssistantFileOptions = { requestOptions: {} }
): StreamableMethod<RetrieveAssistantFile200Response> {
  return context
    .path("/assistants/{assistantId}/files/{fileId}", assistantId, fileId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveAssistantFileDeserialize(
  result: RetrieveAssistantFile200Response
): Promise<AssistantFile> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    createdAt: new Date(result.body["created_at"]),
    assistantId: result.body["assistant_id"],
  };
}

/** Retrieves a file attached to an assistant. */
export async function retrieveAssistantFile(
  context: Client,
  assistantId: string,
  fileId: string,
  options: AssistantsRetrieveAssistantFileOptions = { requestOptions: {} }
): Promise<AssistantFile> {
  const result = await _retrieveAssistantFileSend(
    context,
    assistantId,
    fileId,
    options
  );
  return _retrieveAssistantFileDeserialize(result);
}

export function _deleteAssistantFileSend(
  context: Client,
  assistantId: string,
  fileId: string,
  options: AssistantsDeleteAssistantFileOptions = { requestOptions: {} }
): StreamableMethod<DeleteAssistantFile200Response> {
  return context
    .path("/assistants/{assistantId}/files/{fileId}", assistantId, fileId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAssistantFileDeserialize(
  result: DeleteAssistantFile200Response
): Promise<AssistantFileDeletionStatus> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    deleted: result.body["deleted"],
  };
}

/** Deletes an assistant file. */
export async function deleteAssistantFile(
  context: Client,
  assistantId: string,
  fileId: string,
  options: AssistantsDeleteAssistantFileOptions = { requestOptions: {} }
): Promise<AssistantFileDeletionStatus> {
  const result = await _deleteAssistantFileSend(
    context,
    assistantId,
    fileId,
    options
  );
  return _deleteAssistantFileDeserialize(result);
}

export function _createThreadSend(
  context: Client,
  body: AssistantThreadCreationOptions,
  options: AssistantThreadsCreateThreadOptions = { requestOptions: {} }
): StreamableMethod<CreateThread200Response> {
  return context
    .path("/threads")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        messages: (body["messages"] ?? []).map((p) => ({
          role: p["role"],
          content: p["content"],
        })),
        metadata: body["metadata"],
      },
    });
}

export async function _createThreadDeserialize(
  result: CreateThread200Response
): Promise<AssistantThread> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    metadata: result.body["metadata"],
  };
}

/** Creates a new thread for an assistant. */
export async function createThread(
  context: Client,
  body: AssistantThreadCreationOptions,
  options: AssistantThreadsCreateThreadOptions = { requestOptions: {} }
): Promise<AssistantThread> {
  const result = await _createThreadSend(context, body, options);
  return _createThreadDeserialize(result);
}

export function _retrieveThreadSend(
  context: Client,
  threadId: string,
  options: AssistantThreadsRetrieveThreadOptions = { requestOptions: {} }
): StreamableMethod<RetrieveThread200Response> {
  return context
    .path("/threads/{threadId}", threadId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveThreadDeserialize(
  result: RetrieveThread200Response
): Promise<AssistantThread> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    metadata: result.body["metadata"],
  };
}

/** Retrieves an existing thread for an assistant. */
export async function retrieveThread(
  context: Client,
  threadId: string,
  options: AssistantThreadsRetrieveThreadOptions = { requestOptions: {} }
): Promise<AssistantThread> {
  const result = await _retrieveThreadSend(context, threadId, options);
  return _retrieveThreadDeserialize(result);
}

export function _modifyThreadSend(
  context: Client,
  threadId: string,
  options: AssistantThreadsModifyThreadOptions = { requestOptions: {} }
): StreamableMethod<ModifyThread200Response> {
  return context
    .path("/threads/{threadId}", threadId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { metadata: options?.metadata },
    });
}

export async function _modifyThreadDeserialize(
  result: ModifyThread200Response
): Promise<AssistantThread> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    metadata: result.body["metadata"],
  };
}

/** Modifies an existing thread for an assistant. */
export async function modifyThread(
  context: Client,
  threadId: string,
  options: AssistantThreadsModifyThreadOptions = { requestOptions: {} }
): Promise<AssistantThread> {
  const result = await _modifyThreadSend(context, threadId, options);
  return _modifyThreadDeserialize(result);
}

export function _deleteThreadSend(
  context: Client,
  threadId: string,
  options: AssistantThreadsDeleteThreadOptions = { requestOptions: {} }
): StreamableMethod<DeleteThread200Response> {
  return context
    .path("/threads/{threadId}", threadId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteThreadDeserialize(
  result: DeleteThread200Response
): Promise<ThreadDeletionStatus> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    deleted: result.body["deleted"],
  };
}

/** Deletes a thread. */
export async function deleteThread(
  context: Client,
  threadId: string,
  options: AssistantThreadsDeleteThreadOptions = { requestOptions: {} }
): Promise<ThreadDeletionStatus> {
  const result = await _deleteThreadSend(context, threadId, options);
  return _deleteThreadDeserialize(result);
}

export function _createMessageSend(
  context: Client,
  threadId: string,
  role: AssistantRole,
  content: string,
  options: AssistantMessagesCreateMessageOptions = { requestOptions: {} }
): StreamableMethod<CreateMessage200Response> {
  return context
    .path("/threads/{threadId}/messages", threadId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        role: role,
        content: content,
        file_ids: options?.fileIds,
        metadata: options?.metadata,
      },
    });
}

export async function _createMessageDeserialize(
  result: CreateMessage200Response
): Promise<AssistantMessage> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: (result.body["content"] ?? []).map((p) => ({
      type: p["type"],
      text: p["text"] || undefined,
      fileIds: p["file_ids"] || undefined,
      metadata: p["metadata"] || undefined,
      imageFile: p["image_file"] || undefined
    } as AssistantMessageContent )),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    metadata: result.body["metadata"],
  };
}

/** Returns a list of messages from a thread. */
export async function createMessage(
  context: Client,
  threadId: string,
  role: AssistantRole,
  content: string,
  options: AssistantMessagesCreateMessageOptions = { requestOptions: {} }
): Promise<AssistantMessage> {
  const result = await _createMessageSend(
    context,
    threadId,
    role,
    content,
    options
  );
  return _createMessageDeserialize(result);
}

export function _listMessagesSend(
  context: Client,
  threadId: string,
  options: AssistantMessagesListMessagesOptions = { requestOptions: {} }
): StreamableMethod<ListMessages200Response> {
  return context
    .path("/threads/{threadId}/messages", threadId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listMessagesDeserialize(
  result: ListMessages200Response
): Promise<ListResponseOf<AssistantMessage>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      object: p["object"],
      createdAt: new Date(p["created_at"]),
      threadId: p["thread_id"],
      role: p["role"],
      content: (p["content"] ?? []).map((p) => ({
        type: p["type"],
        text: p["text"] || undefined, 
        fileIds: p["file_ids"] || undefined, 
        metadata: p["metadata"] || undefined, 
        imageFile: p["image_file"] || undefined
      } as AssistantMessageContent )),
      assistantId: p["assistant_id"],
      runId: p["run_id"],
      metadata: p["metadata"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of messages from a thread. */
export async function listMessages(
  context: Client,
  threadId: string,
  options: AssistantMessagesListMessagesOptions = { requestOptions: {} }
): Promise<ListResponseOf<AssistantMessage>> {
  const result = await _listMessagesSend(context, threadId, options);
  return _listMessagesDeserialize(result);
}

export function _retrieveMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: AssistantMessagesRetrieveMessageOptions = { requestOptions: {} }
): StreamableMethod<RetrieveMessage200Response> {
  return context
    .path("/threads/{threadId}/messages/{messageId}", threadId, messageId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveMessageDeserialize(
  result: RetrieveMessage200Response
): Promise<AssistantMessage> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: (result.body["content"] ?? []).map((p) => ({
      type: p["type"],
      text: p["text"] || undefined, 
      fileIds: p["file_ids"] || undefined, 
      metadata: p["metadata"] || undefined, 
      imageFile: p["image_file"] || undefined
    } as AssistantMessageContent )),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    metadata: result.body["metadata"],
  };
}

/** Retrieves a message associated with a thread. */
export async function retrieveMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: AssistantMessagesRetrieveMessageOptions = { requestOptions: {} }
): Promise<AssistantMessage> {
  const result = await _retrieveMessageSend(
    context,
    threadId,
    messageId,
    options
  );
  return _retrieveMessageDeserialize(result);
}

export function _modifyMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: AssistantMessagesModifyMessageOptions = { requestOptions: {} }
): StreamableMethod<ModifyMessage200Response> {
  return context
    .path("/threads/{threadId}/messages/{messageId}", threadId, messageId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { metadata: options?.metadata },
    });
}

export async function _modifyMessageDeserialize(
  result: ModifyMessage200Response
): Promise<AssistantMessage> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: (result.body["content"] ?? []).map((p) => ({
      type: p["type"],
      text: p["text"] || undefined, 
      fileIds: p["file_ids"] || undefined, 
      metadata: p["metadata"] || undefined, 
      image_file: p["image_file"] || undefined
    } as AssistantMessageContent )),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    metadata: result.body["metadata"],
  };
}

/** Modifies an existing message associated with a thread. */
export async function modifyMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: AssistantMessagesModifyMessageOptions = { requestOptions: {} }
): Promise<AssistantMessage> {
  const result = await _modifyMessageSend(
    context,
    threadId,
    messageId,
    options
  );
  return _modifyMessageDeserialize(result);
}

export function _listMessageFilesSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: AssistantMessagesListMessageFilesOptions = { requestOptions: {} }
): StreamableMethod<ListMessageFiles200Response> {
  return context
    .path("/threads/{threadId}/messages/{messageId}/files", threadId, messageId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listMessageFilesDeserialize(
  result: ListMessageFiles200Response
): Promise<ListResponseOf<AssistantMessageFile>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      object: p["object"],
      createdAt: new Date(p["created_at"]),
      messageId: p["message_id"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of files associated with a message from a thread. */
export async function listMessageFiles(
  context: Client,
  threadId: string,
  messageId: string,
  options: AssistantMessagesListMessageFilesOptions = { requestOptions: {} }
): Promise<ListResponseOf<AssistantMessageFile>> {
  const result = await _listMessageFilesSend(
    context,
    threadId,
    messageId,
    options
  );
  return _listMessageFilesDeserialize(result);
}

export function _retrieveMessageFileSend(
  context: Client,
  threadId: string,
  messageId: string,
  fileId: string,
  options: AssistantMessagesRetrieveMessageFileOptions = { requestOptions: {} }
): StreamableMethod<RetrieveMessageFile200Response> {
  return context
    .path(
      "/threads/{threadId}/messages/{messageId}/files/{fileId}",
      threadId,
      messageId,
      fileId
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveMessageFileDeserialize(
  result: RetrieveMessageFile200Response
): Promise<AssistantMessageFile> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    createdAt: new Date(result.body["created_at"]),
    messageId: result.body["message_id"],
  };
}

/** Retrieves a file attached to a message within a thread. */
export async function retrieveMessageFile(
  context: Client,
  threadId: string,
  messageId: string,
  fileId: string,
  options: AssistantMessagesRetrieveMessageFileOptions = { requestOptions: {} }
): Promise<AssistantMessageFile> {
  const result = await _retrieveMessageFileSend(
    context,
    threadId,
    messageId,
    fileId,
    options
  );
  return _retrieveMessageFileDeserialize(result);
}

export function _createRunSend(
  context: Client,
  threadId: string,
  assistantId: string,
  options: AssistantRunsCreateRunOptions = { requestOptions: {} }
): StreamableMethod<CreateRun200Response> {
  return context
    .path("/threads/{threadId}/runs", threadId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        assistant_id: assistantId,
        model: options?.model,
        instructions: options?.instructions,
        tools: (options?.tools ?? []).map((p) => ({ type: p["type"], function: p["function"] || undefined })),
        metadata: options?.metadata,
      },
    });
}

export async function _createRunDeserialize(
  result: CreateRun200Response
): Promise<AssistantRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : { type: result.body.required_action?.["type"],
          submitToolOutputs: {
            toolCalls: result.body.required_action?.submit_tool_outputs?.["tool_calls"]
          } || undefined,
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: (result.body["tools"] ?? []).map((p) => ({ type: p["type"], function: p["function"] || undefined })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
  };
}

/** Creates a new run for an assistant thread. */
export async function createRun(
  context: Client,
  threadId: string,
  assistantId: string,
  options: AssistantRunsCreateRunOptions = { requestOptions: {} }
): Promise<AssistantRun> {
  const result = await _createRunSend(context, threadId, assistantId, options);
  return _createRunDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  threadId: string,
  options: AssistantRunsListRunsOptions = { requestOptions: {} }
): StreamableMethod<ListRuns200Response> {
  return context
    .path("/threads/{threadId}/runs", threadId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listRunsDeserialize(
  result: ListRuns200Response
): Promise<ListResponseOf<AssistantRun>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      object: p["object"],
      threadId: p["thread_id"],
      assistantId: p["assistant_id"],
      status: p["status"],
      requiredAction: !p.required_action
        ? undefined
        : { type: p.required_action?.["type"],
          submitToolOutputs: {
            toolCalls: p.required_action?.submit_tool_outputs?.["tool_calls"]
          } || undefined,
        },
      lastError: !p.last_error
        ? undefined
        : { code: p.last_error?.["code"], message: p.last_error?.["message"] },
      model: p["model"],
      instructions: p["instructions"],
      tools: (p["tools"] ?? []).map((p) => ({ type: p["type"], function: p["function"] || undefined })),
      fileIds: p["file_ids"],
      metadata: p["metadata"],
      createdAt: new Date(p["created_at"]),
      expiresAt: p["expires_at"] === null ? null : new Date(p["expires_at"]),
      startedAt: p["started_at"] === null ? null : new Date(p["started_at"]),
      completedAt:
        p["completed_at"] === null ? null : new Date(p["completed_at"]),
      cancelledAt:
        p["cancelled_at"] === null ? null : new Date(p["cancelled_at"]),
      failedAt: p["failed_at"] === null ? null : new Date(p["failed_at"]),
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of runs associated with an assistant thread. */
export async function listRuns(
  context: Client,
  threadId: string,
  options: AssistantRunsListRunsOptions = { requestOptions: {} }
): Promise<ListResponseOf<AssistantRun>> {
  const result = await _listRunsSend(context, threadId, options);
  return _listRunsDeserialize(result);
}

export function _retrieveRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: AssistantRunsRetrieveRunOptions = { requestOptions: {} }
): StreamableMethod<RetrieveRun200Response> {
  return context
    .path("/threads/{threadId}/runs/{runId}", threadId, runId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveRunDeserialize(
  result: RetrieveRun200Response
): Promise<AssistantRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : { type: result.body.required_action?.["type"],
          submitToolOutputs: {
            toolCalls: result.body.required_action?.submit_tool_outputs?.["tool_calls"]
          } || undefined,
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: (result.body["tools"] ?? []).map((p) => ({ type: p["type"], function: p["function"] || undefined })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
  };
}

/** Retrieves an existing run associated with an assistant thread. */
export async function retrieveRun(
  context: Client,
  threadId: string,
  runId: string,
  options: AssistantRunsRetrieveRunOptions = { requestOptions: {} }
): Promise<AssistantRun> {
  const result = await _retrieveRunSend(context, threadId, runId, options);
  return _retrieveRunDeserialize(result);
}

export function _modifyRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: AssistantRunsModifyRunOptions = { requestOptions: {} }
): StreamableMethod<ModifyRun200Response> {
  return context
    .path("/threads/{threadId}/runs/{runId}", threadId, runId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { metadata: options?.metadata },
    });
}

export async function _modifyRunDeserialize(
  result: ModifyRun200Response
): Promise<AssistantRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : { type: result.body.required_action?.["type"],
          submitToolOutputs: {
            toolCalls: result.body.required_action?.submit_tool_outputs?.["tool_calls"]
          } || undefined,
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: (result.body["tools"] ?? []).map((p) => ({ type: p["type"], function: p["function"] || undefined })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
  };
}

/** Modifies an existing run associated with an assistant thread. */
export async function modifyRun(
  context: Client,
  threadId: string,
  runId: string,
  options: AssistantRunsModifyRunOptions = { requestOptions: {} }
): Promise<AssistantRun> {
  const result = await _modifyRunSend(context, threadId, runId, options);
  return _modifyRunDeserialize(result);
}

export function _submitRunToolOutputsSend(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: ToolOutputSubmission[],
  options: AssistantRunsSubmitRunToolOutputsOptions = { requestOptions: {} }
): StreamableMethod<SubmitRunToolOutputs200Response> {
  return context
    .path(
      "/threads/{threadId}/runs/{runId}/submit_tool_outputs",
      threadId,
      runId
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        tool_outputs: (toolOutputs ?? []).map((p) => ({
          tool_call_id: p["toolCallId"],
          output: p["output"],
        })),
      },
    });
}

export async function _submitRunToolOutputsDeserialize(
  result: SubmitRunToolOutputs200Response
): Promise<AssistantRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : { type: result.body.required_action?.["type"],
          submitToolOutputs: {
            toolCalls: result.body.required_action?.submit_tool_outputs?.["tool_calls"]
          } || undefined,
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: (result.body["tools"] ?? []).map((p) => ({ type: p["type"], function: p["function"] || undefined })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
  };
}

/** Submits outputs from tool calls as requested by a run with a status of 'requires_action' with required_action.type of 'submit_tool_outputs'. */
export async function submitRunToolOutputs(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: ToolOutputSubmission[],
  options: AssistantRunsSubmitRunToolOutputsOptions = { requestOptions: {} }
): Promise<AssistantRun> {
  const result = await _submitRunToolOutputsSend(
    context,
    threadId,
    runId,
    toolOutputs,
    options
  );
  return _submitRunToolOutputsDeserialize(result);
}

export function _cancelRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: AssistantRunsCancelRunOptions = { requestOptions: {} }
): StreamableMethod<CancelRun200Response> {
  return context
    .path("/threads/{threadId}/runs/{runId}/cancel", threadId, runId)
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelRunDeserialize(
  result: CancelRun200Response
): Promise<AssistantRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : { type: result.body.required_action?.["type"],
          submitToolOutputs: {
            toolCalls: result.body.required_action?.submit_tool_outputs?.["tool_calls"]
          } || undefined,
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: (result.body["tools"] ?? []).map((p) => ({ type: p["type"], function: p["function"] || undefined })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
  };
}

/** Cancels a run associated with an assistant thread. */
export async function cancelRun(
  context: Client,
  threadId: string,
  runId: string,
  options: AssistantRunsCancelRunOptions = { requestOptions: {} }
): Promise<AssistantRun> {
  const result = await _cancelRunSend(context, threadId, runId, options);
  return _cancelRunDeserialize(result);
}

export function _createThreadAndRunSend(
  context: Client,
  body: CreateAndRunThreadOptions,
  options: AssistantRunsCreateThreadAndRunOptions = { requestOptions: {} }
): StreamableMethod<CreateThreadAndRun200Response> {
  return context
    .path("/threads/runs")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        assistant_id: body["assistantId"],
        thread: !body.thread
          ? undefined
          : {
              messages: (body.thread?.["messages"] ?? []).map((p) => ({
                role: p["role"],
                content: p["content"],
              })),
              metadata: body.thread?.["metadata"],
            },
        model: body["model"],
        instructions: body["instructions"],
        tools: (body["tools"] ?? []).map((p) => ({ type: p["type"], function: p["function"] || undefined })),
        metadata: body["metadata"],
      },
    });
}

export async function _createThreadAndRunDeserialize(
  result: CreateThreadAndRun200Response
): Promise<AssistantRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : { type: result.body.required_action?.["type"],
          submitToolOutputs: {
            toolCalls: result.body.required_action?.submit_tool_outputs?.["tool_calls"]
          } || undefined,
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: (result.body["tools"] ?? []).map((p) => ({ type: p["type"], function: p["function"] || undefined })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
  };
}

/** Creates a new assistant thread and immediately starts a run using that new thread. */
export async function createThreadAndRun(
  context: Client,
  body: CreateAndRunThreadOptions,
  options: AssistantRunsCreateThreadAndRunOptions = { requestOptions: {} }
): Promise<AssistantRun> {
  const result = await _createThreadAndRunSend(context, body, options);
  return _createThreadAndRunDeserialize(result);
}

export function _retrieveRunStepSend(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options: RunStepsRetrieveRunStepOptions = { requestOptions: {} }
): StreamableMethod<RetrieveRunStep200Response> {
  return context
    .path(
      "/threads/{threadId}/runs/{runId}/steps/{stepId}",
      threadId,
      runId,
      stepId
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveRunStepDeserialize(
  result: RetrieveRunStep200Response
): Promise<RunStep> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    assistantId: result.body["assistant_id"],
    threadId: result.body["thread_id"],
    runId: result.body["run_id"],
    status: result.body["status"],
    stepDetails: { type: result.body.step_details["type"] },
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"],
            message: result.body.last_error["message"],
          },
    createdAt: new Date(result.body["created_at"]),
    expiredAt:
      result.body["expired_at"] === null
        ? null
        : new Date(result.body["expired_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
    metadata: result.body["metadata"],
  };
}

/** Retrieves a single run step associated with an assistant thread run. */
export async function retrieveRunStep(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options: RunStepsRetrieveRunStepOptions = { requestOptions: {} }
): Promise<RunStep> {
  const result = await _retrieveRunStepSend(
    context,
    threadId,
    runId,
    stepId,
    options
  );
  return _retrieveRunStepDeserialize(result);
}

export function _listRunStepsSend(
  context: Client,
  threadId: string,
  runId: string,
  options:RunStepsListRunStepsOptions = { requestOptions: {} }
): StreamableMethod<ListRunSteps200Response> {
  return context
    .path("/threads/{threadId}/runs/{runId}/steps", threadId, runId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listRunStepsDeserialize(
  result: ListRunSteps200Response
): Promise<ListResponseOf<RunStep>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      object: p["object"],
      assistantId: p["assistant_id"],
      threadId: p["thread_id"],
      runId: p["run_id"],
      status: p["status"],
      stepDetails: { type: p.step_details["type"] },
      lastError:
        p.last_error === null
          ? null
          : { code: p.last_error["code"], message: p.last_error["message"] },
      createdAt: new Date(p["created_at"]),
      expiredAt: p["expired_at"] === null ? null : new Date(p["expired_at"]),
      completedAt:
        p["completed_at"] === null ? null : new Date(p["completed_at"]),
      cancelledAt:
        p["cancelled_at"] === null ? null : new Date(p["cancelled_at"]),
      failedAt: p["failed_at"] === null ? null : new Date(p["failed_at"]),
      metadata: p["metadata"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of run steps associated an assistant thread run. */
export async function listRunSteps(
  context: Client,
  threadId: string,
  runId: string,
  options:RunStepsListRunStepsOptions = { requestOptions: {} }
): Promise<ListResponseOf<RunStep>> {
  const result = await _listRunStepsSend(context, threadId, runId, options);
  return _listRunStepsDeserialize(result);
}

export function _listFilesSend(
  context: Client,
  options: FilesListFilesOptions = { requestOptions: {} }
): StreamableMethod<ListFiles200Response> {
  return context
    .path("/files")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { purpose: options?.purpose },
    });
}

export async function _listFilesDeserialize(
  result: ListFiles200Response
): Promise<FileListResponse> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    data: (result.body["data"] ?? []).map((p) => ({
      object: p["object"],
      id: p["id"],
      bytes: p["bytes"],
      filename: p["filename"],
      createdAt: new Date(p["created_at"]),
      purpose: p["purpose"],
    })),
  };
}

/** Returns a list of files that belong to the user's organization. */
export async function listFiles(
  context: Client,
  options: FilesListFilesOptions = { requestOptions: {} }
): Promise<FileListResponse> {
  const result = await _listFilesSend(context, options);
  return _listFilesDeserialize(result);
}

export function _uploadFileSend(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: FilesUploadFileOptions = { requestOptions: {} }
): StreamableMethod<UploadFile200Response> {
  return context
    .path("/files")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: (options.contentType as any) ?? "multipart/form-data",
      body: {
        file: createFile(file, options?.filename || "unknown.txt"),
        purpose: purpose,
      },
    });
}

export async function _uploadFileDeserialize(
  result: UploadFile200Response
): Promise<InputFile> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    bytes: result.body["bytes"],
    filename: result.body["filename"],
    createdAt: new Date(result.body["created_at"]),
    purpose: result.body["purpose"],
  };
}

/** Upload a file that can be used across various endpoints. */
export async function uploadFile(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: FilesUploadFileOptions = { requestOptions: {} }
): Promise<InputFile> {
  const result = await _uploadFileSend(context, file, purpose, options);
  return _uploadFileDeserialize(result);
}

export function _deleteFileSend(
  context: Client,
  fileId: string,
  options: FilesDeleteFileOptions = { requestOptions: {} }
): StreamableMethod<DeleteFile200Response> {
  return context
    .path("/files/{fileId}", fileId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteFileDeserialize(
  result: DeleteFile200Response
): Promise<FileDeletionStatus> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    deleted: result.body["deleted"],
    id: result.body["id"],
  };
}

/** Delete a previously uploaded file. */
export async function deleteFile(
  context: Client,
  fileId: string,
  options: FilesDeleteFileOptions = { requestOptions: {} }
): Promise<FileDeletionStatus> {
  const result = await _deleteFileSend(context, fileId, options);
  return _deleteFileDeserialize(result);
}

export function _retrieveFileSend(
  context: Client,
  fileId: string,
  options: FilesRetrieveFileOptions = { requestOptions: {} }
): StreamableMethod<RetrieveFile200Response> {
  return context
    .path("/files/{fileId}", fileId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveFileDeserialize(
  result: RetrieveFile200Response
): Promise<InputFile> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    bytes: result.body["bytes"],
    filename: result.body["filename"],
    createdAt: new Date(result.body["created_at"]),
    purpose: result.body["purpose"],
  };
}

/** Returns information about a specific file. Does not retrieve file content. */
export async function retrieveFile(
  context: Client,
  fileId: string,
  options: FilesRetrieveFileOptions = { requestOptions: {} }
): Promise<InputFile> {
  const result = await _retrieveFileSend(context, fileId, options);
  return _retrieveFileDeserialize(result);
}

export function _retrieveFileContentSend(
  context: Client,
  fileId: string,
  options: FilesRetrieveFileContentOptions = { requestOptions: {} }
): StreamableMethod<RetrieveFileContent200Response> {
  return context
    .path("/files/{fileId}/content", fileId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveFileContentDeserialize(
  result: RetrieveFileContent200Response
): Promise<Uint8Array> {
  if (result.status !== "200") {
    throw result.body;
  }

  return typeof result.body === "string"
    ? stringToUint8Array(result.body, "base64")
    : result.body;
}

/** Returns the contents of a specified file. */
export async function retrieveFileContent(
  context: Client,
  fileId: string,
  options: FilesRetrieveFileContentOptions = { requestOptions: {} }
): Promise<Uint8Array> {
  const result = await _retrieveFileContentSend(context, fileId, options);
  return _retrieveFileContentDeserialize(result);
}
