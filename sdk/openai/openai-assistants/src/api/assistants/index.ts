// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { StreamableMethod, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import {
  Assistant,
  AssistantCreationOptions,
  AssistantDeletionStatus,
  AssistantFile,
  AssistantFileDeletionStatus,
  AssistantModificationOptions,
  ListResponseOf,
} from "../../models/models.js";
import {
  AssistantsCreateAssistantFileOptions,
  AssistantsCreateAssistantOptions,
  AssistantsDeleteAssistantFileOptions,
  AssistantsDeleteAssistantOptions,
  AssistantsListAssistantFilesOptions,
  AssistantsListAssistantsOptions,
  AssistantsModifyAssistantOptions,
  AssistantsRetrieveAssistantFileOptions,
  AssistantsRetrieveAssistantOptions,
} from "../../models/options.js";
import {
  AssistantsContext as Client,
  CreateAssistant200Response,
  CreateAssistantFile200Response,
  DeleteAssistant200Response,
  DeleteAssistantFile200Response,
  ListAssistantFiles200Response,
  ListAssistants200Response,
  ModifyAssistant200Response,
  RetrieveAssistant200Response,
  RetrieveAssistantFile200Response,
} from "../../rest/index.js";

export function _createAssistantSend(
  context: Client,
  body: AssistantCreationOptions,
  options: AssistantsCreateAssistantOptions = { requestOptions: {} }
): StreamableMethod<CreateAssistant200Response> {
  return context.path("/assistants").post({
    ...operationOptionsToRequestParameters(options),
    body: {
      model: body["model"],
      name: body["name"],
      description: body["description"],
      instructions: body["instructions"],
      tools: !body["tools"]
          ? body["tools"]
          : body["tools"].map((p) => ({
            type: p["type"],
            function: p["function"]
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
    createdAt: new Date(result.body["created_at"]),
    name: result.body["name"],
    description: result.body["description"],
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p) => ({ type: p["type"] })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

/** Creates a new assistant. */
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
  return context.path("/assistants").get({
    ...operationOptionsToRequestParameters(options),
    queryParameters: {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
  });
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
    createdAt: new Date(result.body["created_at"]),
    name: result.body["name"],
    description: result.body["description"],
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p) => ({ type: p["type"] })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

/** Retrieves an existing assistant. */
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
  return context.path("/assistants/{assistantId}", assistantId).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      model: modificationOptions["model"],
      name: modificationOptions["name"],
      description: modificationOptions["description"],
      instructions: modificationOptions["instructions"],
      tools: !modificationOptions["tools"]
        ? modificationOptions["tools"]
        : modificationOptions["tools"].map((p) => ({ type: p["type"] })),
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
    createdAt: new Date(result.body["created_at"]),
    name: result.body["name"],
    description: result.body["description"],
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p) => ({ type: p["type"] })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

/** Modifies an existing assistant. */
export async function modifyAssistant(
  context: Client,
  assistantId: string,
  modificationOptions: AssistantModificationOptions,
  options: AssistantsModifyAssistantOptions = { requestOptions: {} }
): Promise<Assistant> {
  const result = await _modifyAssistantSend(context, assistantId, modificationOptions, options);
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
  return context.path("/assistants/{assistantId}/files", assistantId).post({
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

/** Attaches a previously uploaded file to an assistant for use by tools that can read files. */
export async function createAssistantFile(
  context: Client,
  assistantId: string,
  fileId: string,
  options: AssistantsCreateAssistantFileOptions = { requestOptions: {} }
): Promise<AssistantFile> {
  const result = await _createAssistantFileSend(context, assistantId, fileId, options);
  return _createAssistantFileDeserialize(result);
}

export function _listAssistantFilesSend(
  context: Client,
  assistantId: string,
  options: AssistantsListAssistantFilesOptions = { requestOptions: {} }
): StreamableMethod<ListAssistantFiles200Response> {
  return context.path("/assistants/{assistantId}/files", assistantId).get({
    ...operationOptionsToRequestParameters(options),
    queryParameters: {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
  });
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
  const result = await _retrieveAssistantFileSend(context, assistantId, fileId, options);
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

/**
 * Unlinks a previously attached file from an assistant, rendering it unavailable for use by tools that can read
 * files.
 */
export async function deleteAssistantFile(
  context: Client,
  assistantId: string,
  fileId: string,
  options: AssistantsDeleteAssistantFileOptions = { requestOptions: {} }
): Promise<AssistantFileDeletionStatus> {
  const result = await _deleteAssistantFileSend(context, assistantId, fileId, options);
  return _deleteAssistantFileDeserialize(result);
}

export async function _listAssistantsDeserialize(
  result: ListAssistants200Response
): Promise<ListResponseOf<Assistant>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
      createdAt: new Date(p["created_at"]),
      name: p["name"],
      description: p["description"],
      model: p["model"],
      instructions: p["instructions"],
      tools: (p["tools"] ?? []).map((p) => ({
        type: p["type"],
        function: p["function"] || undefined,
      })),
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

export async function _listAssistantFilesDeserialize(
  result: ListAssistantFiles200Response
): Promise<ListResponseOf<AssistantFile>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
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
