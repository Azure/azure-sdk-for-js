// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  Agent,
  AgentVersion,
  CreateAgentFromCodeContent,
  CreateAgentVersionFromCodeContent,
  VersionIndicatorUnion,
  AgentSessionResource,
  _AgentsPagedResultAgentSessionResource,
  SessionFileWriteResponse,
  SessionDirectoryListResponse,
  BetaAgentsDownloadSessionFileResponse,
  BetaAgentsGetSessionLogStreamResponse,
  BetaAgentsDownloadAgentCodeResponse,
  BetaAgentsDownloadAgentVersionCodeResponse,
} from "../../../models/models.js";
import {
  agentDeserializer,
  agentVersionDeserializer,
  agentEndpointConfigSerializer,
  agentCardSerializer,
  apiErrorResponseDeserializer,
  createAgentFromCodeContentSerializer,
  createAgentVersionFromCodeContentSerializer,
  versionIndicatorUnionSerializer,
  agentSessionResourceDeserializer,
  _agentsPagedResultAgentSessionResourceDeserializer,
  sessionFileWriteResponseDeserializer,
  sessionDirectoryListResponseDeserializer,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { getBinaryStreamResponse } from "../../../static-helpers/serialization/get-binary-stream-response.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  BetaAgentsDeleteSessionFileOptionalParams,
  BetaAgentsGetSessionFilesOptionalParams,
  BetaAgentsDownloadSessionFileOptionalParams,
  BetaAgentsUploadSessionFileOptionalParams,
  BetaAgentsGetSessionLogStreamOptionalParams,
  BetaAgentsListSessionsOptionalParams,
  BetaAgentsDeleteSessionOptionalParams,
  BetaAgentsGetSessionOptionalParams,
  BetaAgentsCreateSessionOptionalParams,
  BetaAgentsDownloadAgentCodeOptionalParams,
  BetaAgentsDownloadAgentVersionCodeOptionalParams,
  BetaAgentsCreateAgentVersionFromCodeOptionalParams,
  BetaAgentsPatchAgentObjectOptionalParams,
  BetaAgentsUpdateAgentFromCodeOptionalParams,
  BetaAgentsCreateAgentFromCodeOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _deleteSessionFileSend(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentsDeleteSessionFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview";
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}/files{?path,recursive,api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      path: path,
      recursive: options?.recursive,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path_1).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteSessionFileDeserialize(result: PathUncheckedResponse): Promise<void> {
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
export async function deleteSessionFile(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentsDeleteSessionFileOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSessionFileSend(context, agentName, sessionId, path, options);
  return _deleteSessionFileDeserialize(result);
}

export function _getSessionFilesSend(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentsGetSessionFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview";
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}/files{?path,api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      path: path,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path_1).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSessionFilesDeserialize(
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
export async function getSessionFiles(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentsGetSessionFilesOptionalParams = { requestOptions: {} },
): Promise<SessionDirectoryListResponse> {
  const result = await _getSessionFilesSend(context, agentName, sessionId, path, options);
  return _getSessionFilesDeserialize(result);
}

export function _downloadSessionFileSend(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentsDownloadSessionFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";

  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}/files/content{?path,api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      path: path,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path_1).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/octet-stream",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _downloadSessionFileDeserialize(
  result: PathUncheckedResponse & BetaAgentsDownloadSessionFileResponse,
): Promise<BetaAgentsDownloadSessionFileResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Download a file from the session sandbox as a binary stream. */
export async function downloadSessionFile(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentsDownloadSessionFileOptionalParams = { requestOptions: {} },
): Promise<BetaAgentsDownloadSessionFileResponse> {
  const streamableMethod = _downloadSessionFileSend(context, agentName, sessionId, path, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadSessionFileDeserialize(result);
}

export function _uploadSessionFileSend(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  content: Uint8Array,
  options: BetaAgentsUploadSessionFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";

  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}/files/content{?path,api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      path: path,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path_1).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/octet-stream",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: content,
  });
}

export async function _uploadSessionFileDeserialize(
  result: PathUncheckedResponse,
): Promise<SessionFileWriteResponse> {
  const expectedStatuses = ["200", "201"];
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
export async function uploadSessionFile(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  content: Uint8Array,
  options: BetaAgentsUploadSessionFileOptionalParams = { requestOptions: {} },
): Promise<SessionFileWriteResponse> {
  const result = await _uploadSessionFileSend(
    context,
    agentName,
    sessionId,
    path,
    content,
    options,
  );
  return _uploadSessionFileDeserialize(result);
}

export function _getSessionLogStreamSend(
  context: Client,
  agentName: string,
  agentVersion: string,
  sessionId: string,
  options: BetaAgentsGetSessionLogStreamOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/sessions/{session_id}:logstream{?api%2Dversion}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
      session_id: sessionId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "text/event-stream",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSessionLogStreamDeserialize(
  result: PathUncheckedResponse & BetaAgentsGetSessionLogStreamResponse,
): Promise<BetaAgentsGetSessionLogStreamResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/**
 * Streams console logs (stdout / stderr) for a specific hosted agent session
 * as a Server-Sent Events (SSE) stream.
 *
 * Each SSE frame contains:
 * - `event`: always `"log"`
 * - `data`: a plain-text log line (currently JSON-formatted, but the schema
 * is not contractual and may include additional keys or change format
 * over time — clients should treat it as an opaque string)
 *
 * Example SSE frames:
 * ```
 * event: log
 * data: {"timestamp":"2026-03-10T09:33:17.121Z","stream":"stdout","message":"Starting FoundryCBAgent server on port 8088"}
 *
 * event: log
 * data: {"timestamp":"2026-03-10T09:33:17.130Z","stream":"stderr","message":"INFO: Application startup complete."}
 *
 * event: log
 * data: {"timestamp":"2026-03-10T09:34:52.714Z","stream":"status","message":"Successfully connected to container"}
 *
 * event: log
 * data: {"timestamp":"2026-03-10T09:35:52.714Z","stream":"status","message":"No logs since last 60 seconds"}
 * ```
 *
 * The stream remains open until the client disconnects or the server
 * terminates the connection. Clients should handle reconnection as needed.
 *
 * The returned `readableStreamBody` (Node.js) or `blobBody` (browser) exposes
 * the raw SSE byte stream. Callers are responsible for parsing the individual
 * `event:` / `data:` frames.
 */
export async function getSessionLogStream(
  context: Client,
  agentName: string,
  agentVersion: string,
  sessionId: string,
  options: BetaAgentsGetSessionLogStreamOptionalParams = { requestOptions: {} },
): Promise<BetaAgentsGetSessionLogStreamResponse> {
  const streamableMethod = _getSessionLogStreamSend(
    context,
    agentName,
    agentVersion,
    sessionId,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getSessionLogStreamDeserialize(result);
}

export function _listSessionsSend(
  context: Client,
  agentName: string,
  options: BetaAgentsListSessionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions{?limit,order,after,before,api-version}",
    {
      agent_name: agentName,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listSessionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentSessionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return _agentsPagedResultAgentSessionResourceDeserializer(result.body);
}

/** Returns a list of sessions for the specified agent. */
export function listSessions(
  context: Client,
  agentName: string,
  options: BetaAgentsListSessionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentSessionResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSessionsSend(context, agentName, options),
    _listSessionsDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion,
      nextPageRequestOptions: {
        headers: { "foundry-features": "HostedAgents=V1Preview,AgentEndpoints=V1Preview" },
      },
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
    },
  );
}

export function _deleteSessionSend(
  context: Client,
  agentName: string,
  sessionId: string,
  options: BetaAgentsDeleteSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}{?api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deleteSessionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/**
 * Deletes a session synchronously.
 * Returns 204 No Content when the session is deleted or does not exist.
 */
export async function deleteSession(
  context: Client,
  agentName: string,
  sessionId: string,
  options: BetaAgentsDeleteSessionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSessionSend(context, agentName, sessionId, options);
  return _deleteSessionDeserialize(result);
}

export function _getSessionSend(
  context: Client,
  agentName: string,
  sessionId: string,
  options: BetaAgentsGetSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}{?api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getSessionDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentSessionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return agentSessionResourceDeserializer(result.body);
}

/** Retrieves a session by ID. */
export async function getSession(
  context: Client,
  agentName: string,
  sessionId: string,
  options: BetaAgentsGetSessionOptionalParams = { requestOptions: {} },
): Promise<AgentSessionResource> {
  const result = await _getSessionSend(context, agentName, sessionId, options);
  return _getSessionDeserialize(result);
}

export function _createSessionSend(
  context: Client,
  agentName: string,
  versionIndicator: VersionIndicatorUnion,
  options: BetaAgentsCreateSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions{?api-version}",
    {
      agent_name: agentName,
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
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      agent_session_id: options?.agentSessionId,
      version_indicator: versionIndicatorUnionSerializer(versionIndicator),
    },
  });
}

export async function _createSessionDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentSessionResource> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return agentSessionResourceDeserializer(result.body);
}

/**
 * Creates a new session for an agent endpoint.
 * The endpoint resolves the backing agent version from `version_indicator` and
 * enforces session ownership using the provided isolation key for session-mutating operations.
 */
export async function createSession(
  context: Client,
  agentName: string,
  versionIndicator: VersionIndicatorUnion,
  options: BetaAgentsCreateSessionOptionalParams = { requestOptions: {} },
): Promise<AgentSessionResource> {
  const result = await _createSessionSend(context, agentName, versionIndicator, options);
  return _createSessionDeserialize(result);
}

export function _downloadAgentCodeSend(
  context: Client,
  agentName: string,
  options: BetaAgentsDownloadAgentCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/code:download{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/zip",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _downloadAgentCodeDeserialize(
  result: PathUncheckedResponse & BetaAgentsDownloadAgentCodeResponse,
): Promise<BetaAgentsDownloadAgentCodeResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/**
 * Download the code zip for the latest version of a code-based hosted agent.
 * Returns the previously-uploaded zip (`application/zip`).
 * The SHA-256 digest of the returned bytes matches the `content_hash` on the latest version's `code_configuration`.
 */
export async function downloadAgentCode(
  context: Client,
  agentName: string,
  options: BetaAgentsDownloadAgentCodeOptionalParams = { requestOptions: {} },
): Promise<BetaAgentsDownloadAgentCodeResponse> {
  const streamableMethod = _downloadAgentCodeSend(context, agentName, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadAgentCodeDeserialize(result);
}

export function _downloadAgentVersionCodeSend(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: BetaAgentsDownloadAgentVersionCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}/code:download{?api%2Dversion}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/zip",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _downloadAgentVersionCodeDeserialize(
  result: PathUncheckedResponse & BetaAgentsDownloadAgentVersionCodeResponse,
): Promise<BetaAgentsDownloadAgentVersionCodeResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/**
 * Download the code zip for a specific version of a code-based hosted agent.
 * Returns the previously-uploaded zip (`application/zip`).
 * The SHA-256 digest of the returned bytes matches the `content_hash` on the agent version's `code_configuration`.
 */
export async function downloadAgentVersionCode(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: BetaAgentsDownloadAgentVersionCodeOptionalParams = { requestOptions: {} },
): Promise<BetaAgentsDownloadAgentVersionCodeResponse> {
  const streamableMethod = _downloadAgentVersionCodeSend(context, agentName, agentVersion, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadAgentVersionCodeDeserialize(result);
}

export function _createAgentVersionFromCodeSend(
  context: Client,
  agentName: string,
  codeZipSha256: string,
  body: CreateAgentVersionFromCodeContent,
  options: BetaAgentsCreateAgentVersionFromCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "multipart/form-data",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "x-ms-code-zip-sha256": codeZipSha256,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: createAgentVersionFromCodeContentSerializer(body),
  });
}

export async function _createAgentVersionFromCodeDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return agentVersionDeserializer(result.body);
}

export async function createAgentVersionFromCode(
  context: Client,
  agentName: string,
  codeZipSha256: string,
  body: CreateAgentVersionFromCodeContent,
  options: BetaAgentsCreateAgentVersionFromCodeOptionalParams = { requestOptions: {} },
): Promise<AgentVersion> {
  const result = await _createAgentVersionFromCodeSend(
    context,
    agentName,
    codeZipSha256,
    body,
    options,
  );
  return _createAgentVersionFromCodeDeserialize(result);
}

export function _patchAgentObjectSend(
  context: Client,
  agentName: string,
  options: BetaAgentsPatchAgentObjectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "HostedAgents=V1Preview,AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}{?api-version}",
    {
      agent_name: agentName,
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
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      agent_endpoint: !options?.agentEndpoint
        ? options?.agentEndpoint
        : agentEndpointConfigSerializer(options?.agentEndpoint),
      agent_card: !options?.agentCard
        ? options?.agentCard
        : agentCardSerializer(options?.agentCard),
    },
  });
}

export async function _patchAgentObjectDeserialize(result: PathUncheckedResponse): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return agentDeserializer(result.body);
}

/** Updates an agent endpoint. */
export async function patchAgentObject(
  context: Client,
  agentName: string,
  options: BetaAgentsPatchAgentObjectOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _patchAgentObjectSend(context, agentName, options);
  return _patchAgentObjectDeserialize(result);
}

export function _updateAgentFromCodeSend(
  context: Client,
  agentName: string,
  codeZipSha256: string,
  body: CreateAgentVersionFromCodeContent,
  options: BetaAgentsUpdateAgentFromCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "multipart/form-data",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "x-ms-code-zip-sha256": codeZipSha256,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: createAgentVersionFromCodeContentSerializer(body),
  });
}

export async function _updateAgentFromCodeDeserialize(
  result: PathUncheckedResponse,
): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return agentDeserializer(result.body);
}

/**
 * Updates a code-based agent by uploading new code and creating a new version.
 * If the code and definition are unchanged (matched by x-ms-code-zip-sha256 header), returns the existing version.
 * The request body is multipart/form-data with a JSON metadata part and a binary code part (part order is irrelevant).
 * Maximum upload size is 250 MB.
 */
export async function updateAgentFromCode(
  context: Client,
  agentName: string,
  codeZipSha256: string,
  body: CreateAgentVersionFromCodeContent,
  options: BetaAgentsUpdateAgentFromCodeOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _updateAgentFromCodeSend(context, agentName, codeZipSha256, body, options);
  return _updateAgentFromCodeDeserialize(result);
}

export function _createAgentFromCodeSend(
  context: Client,
  agentName: string,
  codeZipSha256: string,
  body: CreateAgentFromCodeContent,
  options: BetaAgentsCreateAgentFromCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "multipart/form-data",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "x-ms-agent-name": agentName,
      "x-ms-code-zip-sha256": codeZipSha256,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: createAgentFromCodeContentSerializer(body),
  });
}

export async function _createAgentFromCodeDeserialize(
  result: PathUncheckedResponse,
): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return agentDeserializer(result.body);
}

/**
 * Creates a new code-based agent. Uploads the code zip and creates the agent in a single call.
 * The agent name is provided in the `x-ms-agent-name` header since POST /agents has no name in the URL path.
 * The SHA-256 hex digest of the zip is provided in the `x-ms-code-zip-sha256` header for integrity and dedup.
 * The request body is multipart/form-data with a JSON metadata part and a binary code part (part order is irrelevant).
 * Maximum upload size is 250 MB.
 */
export async function createAgentFromCode(
  context: Client,
  agentName: string,
  codeZipSha256: string,
  body: CreateAgentFromCodeContent,
  options: BetaAgentsCreateAgentFromCodeOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _createAgentFromCodeSend(context, agentName, codeZipSha256, body, options);
  return _createAgentFromCodeDeserialize(result);
}
