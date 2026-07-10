// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  Agent,
  agentDeserializer,
  AgentVersion,
  agentVersionDeserializer,
  agentDefinitionUnionSerializer,
  AgentDefinitionUnion,
  agentBlueprintReferenceUnionSerializer,
  agentEndpointConfigSerializer,
  agentCardSerializer,
  apiErrorResponseDeserializer,
  DeleteAgentResponse,
  deleteAgentResponseDeserializer,
  _AgentsPagedResultAgentObject,
  _agentsPagedResultAgentObjectDeserializer,
  DeleteAgentVersionResponse,
  deleteAgentVersionResponseDeserializer,
  _AgentsPagedResultAgentVersionObject,
  _agentsPagedResultAgentVersionObjectDeserializer,
  CreateAgentVersionFromCodeContent,
  createAgentVersionFromCodeContentSerializer,
  versionIndicatorUnionSerializer,
  VersionIndicatorUnion,
  AgentSessionResource,
  agentSessionResourceDeserializer,
  _AgentsPagedResultAgentSessionResource,
  _agentsPagedResultAgentSessionResourceDeserializer,
  SessionLogEvent,
  sessionLogEventDeserializer,
  SessionFileWriteResponse,
  sessionFileWriteResponseDeserializer,
  _SessionDirectoryListResponse,
  _sessionDirectoryListResponseDeserializer,
  SessionDirectoryEntry,
  AgentsDownloadSessionFileResponse,
  AgentsDownloadAgentCodeResponse,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getBinaryStreamResponse } from "../../static-helpers/serialization/get-binary-stream-response.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AgentsDeleteSessionFileOptionalParams,
  AgentsListSessionFilesOptionalParams,
  AgentsDownloadSessionFileOptionalParams,
  AgentsUploadSessionFileOptionalParams,
  AgentsGetSessionLogStreamOptionalParams,
  AgentsListSessionsOptionalParams,
  AgentsStopSessionOptionalParams,
  AgentsDeleteSessionOptionalParams,
  AgentsGetSessionOptionalParams,
  AgentsCreateSessionOptionalParams,
  AgentsDisableOptionalParams,
  AgentsEnableOptionalParams,
  AgentsDownloadAgentCodeOptionalParams,
  AgentsCreateVersionFromCodeOptionalParams,
  AgentsPatchAgentObjectOptionalParams,
  AgentsListVersionsOptionalParams,
  AgentsDeleteVersionOptionalParams,
  AgentsGetVersionOptionalParams,
  AgentsCreateAgentVersionFromManifestOptionalParams,
  AgentsCreateVersionOptionalParams,
  AgentsListOptionalParams,
  AgentsDeleteOptionalParams,
  AgentsUpdateAgentFromManifestOptionalParams,
  AgentsCreateAgentFromManifestOptionalParams,
  AgentsUpdateAgentOptionalParams,
  AgentsCreateAgentOptionalParams,
  AgentsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _deleteSessionFileSend(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: AgentsDeleteSessionFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{agent_session_id}/files{?path,recursive,api%2Dversion}",
    {
      agent_name: agentName,
      agent_session_id: agentSessionId,
      path: path,
      recursive: options?.recursive,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path_1).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSessionFileDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/**
 * Deletes the specified file or directory from the session sandbox.
 * When `recursive` is false, deleting a non-empty directory returns 409 Conflict.
 */
export async function deleteSessionFile(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: AgentsDeleteSessionFileOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSessionFileSend(context, agentName, agentSessionId, path, options);
  return _deleteSessionFileDeserialize(result);
}

export function _listSessionFilesSend(
  context: Client,
  agentName: string,
  agentSessionId: string,
  options: AgentsListSessionFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{agent_session_id}/files{?path,limit,order,after,before,api%2Dversion}",
    {
      agent_name: agentName,
      agent_session_id: agentSessionId,
      path: options?.path,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listSessionFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<_SessionDirectoryListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _sessionDirectoryListResponseDeserializer(result.body);
}

/**
 * Returns files and directories at the specified path in the session sandbox.
 * The response includes only the immediate children of the target directory and defaults to the session home directory when no path is supplied.
 */
export function listSessionFiles(
  context: Client,
  agentName: string,
  agentSessionId: string,
  options: AgentsListSessionFilesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SessionDirectoryEntry> {
  return buildPagedAsyncIterator(
    context,
    () => _listSessionFilesSend(context, agentName, agentSessionId, options),
    _listSessionFilesDeserialize,
    ["200"],
    { itemName: "entries", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _downloadSessionFileSend(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: AgentsDownloadSessionFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{agent_session_id}/files/content{?path,api%2Dversion}",
    {
      agent_name: agentName,
      agent_session_id: agentSessionId,
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
      headers: { accept: "application/octet-stream", ...options.requestOptions?.headers },
    });
}

export async function _downloadSessionFileDeserialize(
  result: PathUncheckedResponse & AgentsDownloadSessionFileResponse,
): Promise<AgentsDownloadSessionFileResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/**
 * Downloads the file at the specified sandbox path as a binary stream.
 * The path is resolved relative to the session home directory.
 */
export async function downloadSessionFile(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  options: AgentsDownloadSessionFileOptionalParams = { requestOptions: {} },
): Promise<AgentsDownloadSessionFileResponse> {
  const result = await _downloadSessionFileSend(context, agentName, agentSessionId, path, options);
  return _downloadSessionFileDeserialize(result);
}

export function _uploadSessionFileSend(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  content: Uint8Array,
  options: AgentsUploadSessionFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{agent_session_id}/files/content{?path,api%2Dversion}",
    {
      agent_name: agentName,
      agent_session_id: agentSessionId,
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: content,
    });
}

export async function _uploadSessionFileDeserialize(
  result: PathUncheckedResponse,
): Promise<SessionFileWriteResponse> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sessionFileWriteResponseDeserializer(result.body);
}

/**
 * Uploads binary file content to the specified path in the session sandbox.
 * The service stores the file relative to the session home directory and rejects payloads larger than 50 MB.
 */
export async function uploadSessionFile(
  context: Client,
  agentName: string,
  agentSessionId: string,
  path: string,
  content: Uint8Array,
  options: AgentsUploadSessionFileOptionalParams = { requestOptions: {} },
): Promise<SessionFileWriteResponse> {
  const result = await _uploadSessionFileSend(
    context,
    agentName,
    agentSessionId,
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
  options: AgentsGetSessionLogStreamOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "text/event-stream", ...options.requestOptions?.headers },
    });
}

export async function _getSessionLogStreamDeserialize(
  result: PathUncheckedResponse,
): Promise<SessionLogEvent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return sessionLogEventDeserializer(result.body);
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
 */
export async function getSessionLogStream(
  context: Client,
  agentName: string,
  agentVersion: string,
  sessionId: string,
  options: AgentsGetSessionLogStreamOptionalParams = { requestOptions: {} },
): Promise<SessionLogEvent> {
  const result = await _getSessionLogStreamSend(
    context,
    agentName,
    agentVersion,
    sessionId,
    options,
  );
  return _getSessionLogStreamDeserialize(result);
}

export function _listSessionsSend(
  context: Client,
  agentName: string,
  options: AgentsListSessionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions{?limit,order,after,before,api%2Dversion}",
    {
      agent_name: agentName,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listSessionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentSessionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultAgentSessionResourceDeserializer(result.body);
}

/** Returns a paged collection of sessions associated with the specified agent endpoint. */
export function listSessions(
  context: Client,
  agentName: string,
  options: AgentsListSessionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentSessionResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSessionsSend(context, agentName, options),
    _listSessionsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _stopSessionSend(
  context: Client,
  agentName: string,
  sessionId: string,
  options: AgentsStopSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}:stop{?api%2Dversion}",
    {
      agent_name: agentName,
      session_id: sessionId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopSessionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Terminates the specified hosted agent session and returns 204 No Content when the request succeeds. */
export async function stopSession(
  context: Client,
  agentName: string,
  sessionId: string,
  options: AgentsStopSessionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSessionSend(context, agentName, sessionId, options);
  return _stopSessionDeserialize(result);
}

export function _deleteSessionSend(
  context: Client,
  agentName: string,
  sessionId: string,
  options: AgentsDeleteSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      session_id: sessionId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSessionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

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
  options: AgentsDeleteSessionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSessionSend(context, agentName, sessionId, options);
  return _deleteSessionDeserialize(result);
}

export function _getSessionSend(
  context: Client,
  agentName: string,
  sessionId: string,
  options: AgentsGetSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      session_id: sessionId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getSessionDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentSessionResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentSessionResourceDeserializer(result.body);
}

/** Retrieves the details of a hosted agent session by agent name and session identifier. */
export async function getSession(
  context: Client,
  agentName: string,
  sessionId: string,
  options: AgentsGetSessionOptionalParams = { requestOptions: {} },
): Promise<AgentSessionResource> {
  const result = await _getSessionSend(context, agentName, sessionId, options);
  return _getSessionDeserialize(result);
}

export function _createSessionSend(
  context: Client,
  agentName: string,
  versionIndicator: VersionIndicatorUnion,
  options: AgentsCreateSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
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
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentSessionResourceDeserializer(result.body);
}

/**
 * Creates a new session for an agent endpoint.
 * The endpoint resolves the backing agent version from `version_indicator` and
 * enforces session ownership using the provided user identity for session-mutating operations.
 */
export async function createSession(
  context: Client,
  agentName: string,
  versionIndicator: VersionIndicatorUnion,
  options: AgentsCreateSessionOptionalParams = { requestOptions: {} },
): Promise<AgentSessionResource> {
  const result = await _createSessionSend(context, agentName, versionIndicator, options);
  return _createSessionDeserialize(result);
}

export function _disableSend(
  context: Client,
  agentName: string,
  options: AgentsDisableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}:disable{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _disableDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/**
 * Disables the specified agent, preventing it from accepting new sessions or processing requests.
 * Existing active sessions are allowed to drain gracefully but no new sessions can be created.
 * This operation is idempotent — disabling an already-disabled agent returns success with no side effects.
 */
export async function disable(
  context: Client,
  agentName: string,
  options: AgentsDisableOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _disableSend(context, agentName, options);
  return _disableDeserialize(result);
}

export function _enableSend(
  context: Client,
  agentName: string,
  options: AgentsEnableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}:enable{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _enableDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/**
 * Enables the specified agent, allowing it to accept new sessions and process requests.
 * This operation is idempotent — enabling an already-enabled agent returns success with no side effects.
 */
export async function enable(
  context: Client,
  agentName: string,
  options: AgentsEnableOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _enableSend(context, agentName, options);
  return _enableDeserialize(result);
}

export function _downloadAgentCodeSend(
  context: Client,
  agentName: string,
  options: AgentsDownloadAgentCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/code:download{?agent_version,api%2Dversion}",
    {
      agent_name: agentName,
      agent_version: options?.agentVersion,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/zip", ...options.requestOptions?.headers },
    });
}

export async function _downloadAgentCodeDeserialize(
  result: PathUncheckedResponse & AgentsDownloadAgentCodeResponse,
): Promise<AgentsDownloadAgentCodeResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/**
 * Downloads the code zip for a code-based hosted agent.
 * Returns the previously-uploaded zip (`application/zip`).
 *
 * If `agent_version` is supplied, returns that version's code zip; otherwise
 * returns the latest version's code zip.
 *
 * The SHA-256 digest of the returned bytes matches the `content_hash` on the
 * resolved version's `code_configuration`.
 */
export async function downloadAgentCode(
  context: Client,
  agentName: string,
  options: AgentsDownloadAgentCodeOptionalParams = { requestOptions: {} },
): Promise<AgentsDownloadAgentCodeResponse> {
  const streamableMethod = _downloadAgentCodeSend(context, agentName, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadAgentCodeDeserialize(result);
}

export function _createVersionFromCodeSend(
  context: Client,
  agentName: string,
  codeZipSha256: string,
  content: CreateAgentVersionFromCodeContent,
  options: AgentsCreateVersionFromCodeOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "multipart/form-data",
      headers: {
        "x-ms-code-zip-sha256": codeZipSha256,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: createAgentVersionFromCodeContentSerializer(content),
    });
}

export async function _createVersionFromCodeDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentVersionDeserializer(result.body);
}

/**
 * Creates a new agent version from code. Uploads the code zip and creates a new version
 * for an existing agent. The SHA-256 hex digest of the zip is provided in the
 * `x-ms-code-zip-sha256` header for integrity and dedup.
 * The request body is multipart/form-data with a JSON metadata part and a binary code part (part order is irrelevant).
 * Maximum upload size is 250 MB.
 */
export async function createVersionFromCode(
  context: Client,
  agentName: string,
  codeZipSha256: string,
  content: CreateAgentVersionFromCodeContent,
  options: AgentsCreateVersionFromCodeOptionalParams = { requestOptions: {} },
): Promise<AgentVersion> {
  const result = await _createVersionFromCodeSend(
    context,
    agentName,
    codeZipSha256,
    content,
    options,
  );
  return _createVersionFromCodeDeserialize(result);
}

export function _patchAgentObjectSend(
  context: Client,
  agentName: string,
  options: AgentsPatchAgentObjectOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
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
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentDeserializer(result.body);
}

/** Applies a merge-patch update to the specified agent endpoint configuration. */
export async function patchAgentObject(
  context: Client,
  agentName: string,
  options: AgentsPatchAgentObjectOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _patchAgentObjectSend(context, agentName, options);
  return _patchAgentObjectDeserialize(result);
}

export function _listVersionsSend(
  context: Client,
  agentName: string,
  options: AgentsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions{?limit,order,after,before,include_drafts,api%2Dversion}",
    {
      agent_name: agentName,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      include_drafts: options?.includeDrafts,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultAgentVersionObjectDeserializer(result.body);
}

/** Returns a paged collection of versions for the specified agent. */
export function listVersions(
  context: Client,
  agentName: string,
  options: AgentsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AgentVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, agentName, options),
    _listVersionsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _deleteVersionSend(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: AgentsDeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}{?force,api%2Dversion}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
      force: options?.force,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _deleteVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteAgentVersionResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deleteAgentVersionResponseDeserializer(result.body);
}

/**
 * Deletes a specific version of an agent. For hosted agents, if the version has active
 * sessions, the request is rejected with HTTP 409 unless `force` is set to true. When
 * force is true, all sessions associated with this version are cascade-deleted.
 */
export async function deleteVersion(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: AgentsDeleteVersionOptionalParams = { requestOptions: {} },
): Promise<DeleteAgentVersionResponse> {
  const result = await _deleteVersionSend(context, agentName, agentVersion, options);
  return _deleteVersionDeserialize(result);
}

export function _getVersionSend(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: AgentsGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions/{agent_version}{?api%2Dversion}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getVersionDeserialize(result: PathUncheckedResponse): Promise<AgentVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentVersionDeserializer(result.body);
}

/** Retrieves the specified version of an agent by its agent name and version identifier. */
export async function getVersion(
  context: Client,
  agentName: string,
  agentVersion: string,
  options: AgentsGetVersionOptionalParams = { requestOptions: {} },
): Promise<AgentVersion> {
  const result = await _getVersionSend(context, agentName, agentVersion, options);
  return _getVersionDeserialize(result);
}

export function _createAgentVersionFromManifestSend(
  context: Client,
  agentName: string,
  manifestId: string,
  parameterValues: Record<string, any>,
  options: AgentsCreateAgentVersionFromManifestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/versions:import{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: {
        metadata: options?.metadata,
        description: options?.description,
        manifest_id: manifestId,
        parameter_values: parameterValues,
      },
    });
}

export async function _createAgentVersionFromManifestDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentVersionDeserializer(result.body);
}

/** Imports the provided manifest to create a new version for the specified agent. */
export async function createAgentVersionFromManifest(
  context: Client,
  agentName: string,
  manifestId: string,
  parameterValues: Record<string, any>,
  options: AgentsCreateAgentVersionFromManifestOptionalParams = { requestOptions: {} },
): Promise<AgentVersion> {
  const result = await _createAgentVersionFromManifestSend(
    context,
    agentName,
    manifestId,
    parameterValues,
    options,
  );
  return _createAgentVersionFromManifestDeserialize(result);
}

export function _createVersionSend(
  context: Client,
  agentName: string,
  definition: AgentDefinitionUnion,
  options: AgentsCreateVersionOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        metadata: options?.metadata,
        description: options?.description,
        definition: agentDefinitionUnionSerializer(definition),
        blueprint_reference: !options?.blueprintReference
          ? options?.blueprintReference
          : agentBlueprintReferenceUnionSerializer(options?.blueprintReference),
        draft: options?.draft,
      },
    });
}

export async function _createVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentVersionDeserializer(result.body);
}

/** Creates a new version for the specified agent and returns the created version resource. */
export async function createVersion(
  context: Client,
  agentName: string,
  definition: AgentDefinitionUnion,
  options: AgentsCreateVersionOptionalParams = { requestOptions: {} },
): Promise<AgentVersion> {
  const result = await _createVersionSend(context, agentName, definition, options);
  return _createVersionDeserialize(result);
}

export function _listSend(
  context: Client,
  options: AgentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents{?kind,limit,order,after,before,api%2Dversion}",
    {
      kind: options?.kind,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultAgentObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultAgentObjectDeserializer(result.body);
}

/** Returns a paged collection of agent resources. */
export function list(
  context: Client,
  options: AgentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Agent> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _$deleteSend(
  context: Client,
  agentName: string,
  options: AgentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}{?force,api%2Dversion}",
    {
      agent_name: agentName,
      force: options?.force,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<DeleteAgentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return deleteAgentResponseDeserializer(result.body);
}

/**
 * Deletes an agent. For hosted agents, if any version has active sessions, the request
 * is rejected with HTTP 409 unless `force` is set to true. When force is true, all
 * associated sessions are cascade-deleted along with the agent and its versions.
 */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  agentName: string,
  options: AgentsDeleteOptionalParams = { requestOptions: {} },
): Promise<DeleteAgentResponse> {
  const result = await _$deleteSend(context, agentName, options);
  return _$deleteDeserialize(result);
}

export function _updateAgentFromManifestSend(
  context: Client,
  agentName: string,
  manifestId: string,
  parameterValues: Record<string, any>,
  options: AgentsUpdateAgentFromManifestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/import{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: {
        metadata: options?.metadata,
        description: options?.description,
        manifest_id: manifestId,
        parameter_values: parameterValues,
      },
    });
}

export async function _updateAgentFromManifestDeserialize(
  result: PathUncheckedResponse,
): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentDeserializer(result.body);
}

/**
 * Updates the agent from a manifest by adding a new version if there are any changes to the agent definition.
 * If no changes, returns the existing agent version.
 */
export async function updateAgentFromManifest(
  context: Client,
  agentName: string,
  manifestId: string,
  parameterValues: Record<string, any>,
  options: AgentsUpdateAgentFromManifestOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _updateAgentFromManifestSend(
    context,
    agentName,
    manifestId,
    parameterValues,
    options,
  );
  return _updateAgentFromManifestDeserialize(result);
}

export function _createAgentFromManifestSend(
  context: Client,
  name: string,
  manifestId: string,
  parameterValues: Record<string, any>,
  options: AgentsCreateAgentFromManifestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents:import{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: {
        name: name,
        metadata: options?.metadata,
        description: options?.description,
        manifest_id: manifestId,
        parameter_values: parameterValues,
      },
    });
}

export async function _createAgentFromManifestDeserialize(
  result: PathUncheckedResponse,
): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentDeserializer(result.body);
}

/** Imports the provided manifest to create an agent and returns the created resource. */
export async function createAgentFromManifest(
  context: Client,
  name: string,
  manifestId: string,
  parameterValues: Record<string, any>,
  options: AgentsCreateAgentFromManifestOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _createAgentFromManifestSend(
    context,
    name,
    manifestId,
    parameterValues,
    options,
  );
  return _createAgentFromManifestDeserialize(result);
}

export function _updateAgentSend(
  context: Client,
  agentName: string,
  definition: AgentDefinitionUnion,
  options: AgentsUpdateAgentOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        metadata: options?.metadata,
        description: options?.description,
        definition: agentDefinitionUnionSerializer(definition),
        blueprint_reference: !options?.blueprintReference
          ? options?.blueprintReference
          : agentBlueprintReferenceUnionSerializer(options?.blueprintReference),
      },
    });
}

export async function _updateAgentDeserialize(result: PathUncheckedResponse): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentDeserializer(result.body);
}

/**
 * Updates the agent by adding a new version if there are any changes to the agent definition.
 * If no changes, returns the existing agent version.
 */
export async function updateAgent(
  context: Client,
  agentName: string,
  definition: AgentDefinitionUnion,
  options: AgentsUpdateAgentOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _updateAgentSend(context, agentName, definition, options);
  return _updateAgentDeserialize(result);
}

export function _createAgentSend(
  context: Client,
  name: string,
  definition: AgentDefinitionUnion,
  options: AgentsCreateAgentOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: {
        name: name,
        state: options?.state,
        metadata: options?.metadata,
        description: options?.description,
        definition: agentDefinitionUnionSerializer(definition),
        blueprint_reference: !options?.blueprintReference
          ? options?.blueprintReference
          : agentBlueprintReferenceUnionSerializer(options?.blueprintReference),
        draft: options?.draft,
        agent_endpoint: !options?.agentEndpoint
          ? options?.agentEndpoint
          : agentEndpointConfigSerializer(options?.agentEndpoint),
        agent_card: !options?.agentCard
          ? options?.agentCard
          : agentCardSerializer(options?.agentCard),
      },
    });
}

export async function _createAgentDeserialize(result: PathUncheckedResponse): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentDeserializer(result.body);
}

/** Creates a new agent or a new version of an existing agent. */
export async function createAgent(
  context: Client,
  name: string,
  definition: AgentDefinitionUnion,
  options: AgentsCreateAgentOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _createAgentSend(context, name, definition, options);
  return _createAgentDeserialize(result);
}

export function _getSend(
  context: Client,
  agentName: string,
  options: AgentsGetOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentDeserializer(result.body);
}

/** Retrieves an agent definition by its unique name. */
export async function get(
  context: Client,
  agentName: string,
  options: AgentsGetOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _getSend(context, agentName, options);
  return _getDeserialize(result);
}
