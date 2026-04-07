// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  apiErrorResponseDeserializer,
  SessionFileWriteResponse,
  sessionFileWriteResponseDeserializer,
  SessionDirectoryListResponse,
  sessionDirectoryListResponseDeserializer,
  BetaAgentSessionFilesDownloadResponse,
} from "../../../models/models.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaAgentSessionFilesDeleteOptionalParams,
  BetaAgentSessionFilesListOptionalParams,
  BetaAgentSessionFilesDownloadOptionalParams,
  BetaAgentSessionFilesUploadOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentSessionFilesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}/files{?path,recursive,api%2Dversion}",
    {
      agent_name: agentName,
      session_id: sessionId,
      path: path,
      recursive: options?.recursive,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path_1)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/**
 * Delete a file or directory from the session sandbox.
 * If `recursive` is false (default) and the target is a non-empty directory, the API returns 409 Conflict.
 */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentSessionFilesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, agentName, sessionId, path, options);
  return _$deleteDeserialize(result);
}

export function _listSend(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentSessionFilesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}/files{?path,api%2Dversion}",
    {
      agent_name: agentName,
      session_id: sessionId,
      path: path,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path_1)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<SessionDirectoryListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return sessionDirectoryListResponseDeserializer(result.body);
}

/**
 * List files and directories at a given path in the session sandbox.
 * Returns only the immediate children of the specified directory (non-recursive).
 */
export async function list(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentSessionFilesListOptionalParams = { requestOptions: {} },
): Promise<SessionDirectoryListResponse> {
  const result = await _listSend(context, agentName, sessionId, path, options);
  return _listDeserialize(result);
}

export function _downloadSend(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentSessionFilesDownloadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}/files/content{?path,api%2Dversion}",
    {
      agent_name: agentName,
      session_id: sessionId,
      path: path,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path_1)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/octet-stream",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _downloadDeserialize(
  result: PathUncheckedResponse & BetaAgentSessionFilesDownloadResponse,
): Promise<BetaAgentSessionFilesDownloadResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Download a file from the session sandbox as a binary stream. */
export async function download(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentSessionFilesDownloadOptionalParams = { requestOptions: {} },
): Promise<BetaAgentSessionFilesDownloadResponse> {
  const result = await _downloadSend(context, agentName, sessionId, path, options);
  return _downloadDeserialize(result);
}

export function _uploadSend(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  content: Uint8Array,
  options: BetaAgentSessionFilesUploadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}/files/content{?path,api%2Dversion}",
    {
      agent_name: agentName,
      session_id: sessionId,
      path: path,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path_1)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/octet-stream",
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: content,
    });
}

export async function _uploadDeserialize(
  result: PathUncheckedResponse,
): Promise<SessionFileWriteResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return sessionFileWriteResponseDeserializer(result.body);
}

/**
 * Upload a file to the session sandbox via binary stream.
 * Maximum file size is 50 MB. Uploads exceeding this limit return 413 Payload Too Large.
 */
export async function upload(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  content: Uint8Array,
  options: BetaAgentSessionFilesUploadOptionalParams = { requestOptions: {} },
): Promise<SessionFileWriteResponse> {
  const result = await _uploadSend(context, agentName, sessionId, path, content, options);
  return _uploadDeserialize(result);
}
