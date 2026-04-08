// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type {
  Agent,
  VersionIndicatorUnion,
  AgentSessionResource,
  _AgentsPagedResultAgentSessionResource,
  SessionFileWriteResponse,
  SessionDirectoryListResponse,
  ManagedAgentIdentityBlueprint,
  PagedManagedAgentIdentityBlueprint,
  BetaAgentsDownloadSessionFileResponse,
} from "../../../models/models.js";
import {
  agentDeserializer,
  agentEndpointSerializer,
  agentCardSerializer,
  apiErrorResponseDeserializer,
  versionIndicatorUnionSerializer,
  agentSessionResourceDeserializer,
  _agentsPagedResultAgentSessionResourceDeserializer,
  sessionFileWriteResponseDeserializer,
  sessionDirectoryListResponseDeserializer,
  managedAgentIdentityBlueprintDeserializer,
  pagedManagedAgentIdentityBlueprintDeserializer,
  KnownApiVersions,
} from "../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type {
  ListManagedIdentityBlueprintsOptionalParams,
  DeleteManagedIdentityBlueprintOptionalParams,
  GetManagedIdentityBlueprintOptionalParams,
  CreateOrUpdateManagedIdentityBlueprintOptionalParams,
  BetaAgentsDeleteSessionFileOptionalParams,
  BetaAgentsListSessionFilesOptionalParams,
  BetaAgentsDownloadSessionFileOptionalParams,
  BetaAgentsUploadSessionFileOptionalParams,
  BetaAgentsListSessionsOptionalParams,
  BetaAgentsDeleteSessionOptionalParams,
  BetaAgentsGetSessionOptionalParams,
  BetaAgentsCreateSessionOptionalParams,
  BetaAgentsPatchAgentObjectOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listManagedIdentityBlueprintsSend(
  context: Client,
  options: ListManagedIdentityBlueprintsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/managedAgentIdentityBlueprints{?order,limit,api-version}",
    {
      order: options?.order,
      limit: options?.limit,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
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

export async function _listManagedIdentityBlueprintsDeserialize(
  result: PathUncheckedResponse,
): Promise<PagedManagedAgentIdentityBlueprint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return pagedManagedAgentIdentityBlueprintDeserializer(result.body);
}

export async function listManagedIdentityBlueprints(
  context: Client,
  options: ListManagedIdentityBlueprintsOptionalParams = { requestOptions: {} },
): Promise<PagedManagedAgentIdentityBlueprint> {
  const result = await _listManagedIdentityBlueprintsSend(context, options);
  return _listManagedIdentityBlueprintsDeserialize(result);
}

export function _deleteManagedIdentityBlueprintSend(
  context: Client,
  blueprintName: string,
  options: DeleteManagedIdentityBlueprintOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/managedAgentIdentityBlueprints/{blueprint_name}{?api-version}",
    {
      blueprint_name: blueprintName,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
  });
}

export async function _deleteManagedIdentityBlueprintDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a managed agent identity blueprint by name. */
export async function deleteManagedIdentityBlueprint(
  context: Client,
  blueprintName: string,
  options: DeleteManagedIdentityBlueprintOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteManagedIdentityBlueprintSend(context, blueprintName, options);
  return _deleteManagedIdentityBlueprintDeserialize(result);
}

export function _getManagedIdentityBlueprintSend(
  context: Client,
  blueprintName: string,
  options: GetManagedIdentityBlueprintOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/managedAgentIdentityBlueprints/{blueprint_name}{?api-version}",
    {
      blueprint_name: blueprintName,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
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

export async function _getManagedIdentityBlueprintDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedAgentIdentityBlueprint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return managedAgentIdentityBlueprintDeserializer(result.body);
}

/** Retrieves a managed agent identity blueprint by name. */
export async function getManagedIdentityBlueprint(
  context: Client,
  blueprintName: string,
  options: GetManagedIdentityBlueprintOptionalParams = { requestOptions: {} },
): Promise<ManagedAgentIdentityBlueprint> {
  const result = await _getManagedIdentityBlueprintSend(context, blueprintName, options);
  return _getManagedIdentityBlueprintDeserialize(result);
}

export function _createOrUpdateManagedIdentityBlueprintSend(
  context: Client,
  blueprintName: string,
  name: string,
  options: CreateOrUpdateManagedIdentityBlueprintOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "AgentEndpoints=V1Preview";
  const path = expandUrlTemplate(
    "/managedAgentIdentityBlueprints/{blueprint_name}{?api-version}",
    {
      blueprint_name: blueprintName,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: { name: name },
  });
}

export async function _createOrUpdateManagedIdentityBlueprintDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedAgentIdentityBlueprint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = apiErrorResponseDeserializer(result.body);

    throw error;
  }

  return managedAgentIdentityBlueprintDeserializer(result.body);
}

export async function createOrUpdateManagedIdentityBlueprint(
  context: Client,
  blueprintName: string,
  name: string,
  options: CreateOrUpdateManagedIdentityBlueprintOptionalParams = { requestOptions: {} },
): Promise<ManagedAgentIdentityBlueprint> {
  const result = await _createOrUpdateManagedIdentityBlueprintSend(
    context,
    blueprintName,
    name,
    options,
  );
  return _createOrUpdateManagedIdentityBlueprintDeserialize(result);
}

export function _deleteSessionFileSend(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentsDeleteSessionFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}/files{?path,recursive,api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      path: path,
      recursive: options?.recursive,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path_1).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
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

export function _listSessionFilesSend(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentsListSessionFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}/files{?path,api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      path: path,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path_1).get({
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

export async function _listSessionFilesDeserialize(
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
export async function listSessionFiles(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentsListSessionFilesOptionalParams = { requestOptions: {} },
): Promise<SessionDirectoryListResponse> {
  const result = await _listSessionFilesSend(context, agentName, sessionId, path, options);
  return _listSessionFilesDeserialize(result);
}

export function _downloadSessionFileSend(
  context: Client,
  agentName: string,
  sessionId: string,
  path: string,
  options: BetaAgentsDownloadSessionFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}/files/content{?path,api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      path: path,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path_1).get({
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
  const result = await _downloadSessionFileSend(context, agentName, sessionId, path, options);
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
  const path_1 = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}/files/content{?path,api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      path: path,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path_1).put({
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

export async function _uploadSessionFileDeserialize(
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

export function _listSessionsSend(
  context: Client,
  agentName: string,
  options: BetaAgentsListSessionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions{?limit,order,after,before,api-version}",
    {
      agent_name: agentName,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
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
    { itemName: "data", apiVersion: context.apiVersion ?? KnownApiVersions.v1 },
  );
}

export function _deleteSessionSend(
  context: Client,
  agentName: string,
  sessionId: string,
  isolationKey: string,
  options: BetaAgentsDeleteSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}{?api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "x-session-isolation-key": isolationKey,
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
  isolationKey: string,
  options: BetaAgentsDeleteSessionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteSessionSend(context, agentName, sessionId, isolationKey, options);
  return _deleteSessionDeserialize(result);
}

export function _getSessionSend(
  context: Client,
  agentName: string,
  sessionId: string,
  options: BetaAgentsGetSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions/{session_id}{?api-version}",
    {
      agent_name: agentName,
      session_id: sessionId,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
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
  isolationKey: string,
  versionIndicator: VersionIndicatorUnion,
  options: BetaAgentsCreateSessionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/sessions{?api-version}",
    {
      agent_name: agentName,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      "x-session-isolation-key": isolationKey,
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
  isolationKey: string,
  versionIndicator: VersionIndicatorUnion,
  options: BetaAgentsCreateSessionOptionalParams = { requestOptions: {} },
): Promise<AgentSessionResource> {
  const result = await _createSessionSend(
    context,
    agentName,
    isolationKey,
    versionIndicator,
    options,
  );
  return _createSessionDeserialize(result);
}

export function _patchAgentObjectSend(
  context: Client,
  agentName: string,
  options: BetaAgentsPatchAgentObjectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}{?api-version}",
    {
      agent_name: agentName,
      "api-version": context.apiVersion ?? KnownApiVersions.v1,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/merge-patch+json",
    headers: {
      ...(options?.foundryFeatures !== undefined
        ? { "foundry-features": options?.foundryFeatures }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      agent_endpoint: !options?.agentEndpoint
        ? options?.agentEndpoint
        : agentEndpointSerializer(options?.agentEndpoint),
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
