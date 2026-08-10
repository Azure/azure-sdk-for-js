// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VoiceAgentsContext as Client } from "../index.js";
import {
  apiErrorResponseDeserializer,
  agentBlueprintReferenceUnionSerializer,
  VoiceAgentDefinition,
  voiceAgentDefinitionSerializer,
  VoiceModelType,
  voiceAgentToolArraySerializer,
  agentEndpointConfigSerializer,
  agentCardSerializer,
  VoiceAgentObject,
  voiceAgentObjectDeserializer,
  VoiceAgentVersionObject,
  voiceAgentVersionObjectDeserializer,
  _AgentsPagedResultVoiceAgentObject,
  _agentsPagedResultVoiceAgentObjectDeserializer,
  VoiceAgentType,
  VoiceAgentUseCase,
  _AgentsPagedResultVoiceAgentVersionObject,
  _agentsPagedResultVoiceAgentVersionObjectDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  VoiceAgentsDeleteVoiceAgentVersionOptionalParams,
  VoiceAgentsGetVoiceAgentVersionOptionalParams,
  VoiceAgentsListVoiceAgentVersionsOptionalParams,
  VoiceAgentsCreateVoiceAgentVersionOptionalParams,
  VoiceAgentsGenerateVoiceAgentOptionalParams,
  VoiceAgentsDisableVoiceAgentOptionalParams,
  VoiceAgentsEnableVoiceAgentOptionalParams,
  VoiceAgentsDeleteVoiceAgentOptionalParams,
  VoiceAgentsUpdateVoiceAgentOptionalParams,
  VoiceAgentsGetVoiceAgentOptionalParams,
  VoiceAgentsListVoiceAgentsOptionalParams,
  VoiceAgentsCreateVoiceAgentOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _deleteVoiceAgentVersionSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  agentVersion: string,
  options: VoiceAgentsDeleteVoiceAgentVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/voice_agents/{agent_name}/versions/{agent_version}{?api%2Dversion}",
    {
      agent_name: agentName,
      agent_version: agentVersion,
      "api%2Dversion": context.apiVersion ?? "v1",
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

export async function _deleteVoiceAgentVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Deletes a specific version of a voice agent. */
export async function deleteVoiceAgentVersion(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  agentVersion: string,
  options: VoiceAgentsDeleteVoiceAgentVersionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVoiceAgentVersionSend(
    context,
    foundryFeatures,
    agentName,
    agentVersion,
    options,
  );
  return _deleteVoiceAgentVersionDeserialize(result);
}

export function _getVoiceAgentVersionSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  agentVersion: string,
  options: VoiceAgentsGetVoiceAgentVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/voice_agents/{agent_name}/versions/{agent_version}{?api%2Dversion}",
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
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getVoiceAgentVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<VoiceAgentVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceAgentVersionObjectDeserializer(result.body);
}
/** Retrieves the specified version of a voice agent by its agent name and version identifier. */
export async function getVoiceAgentVersion(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  agentVersion: string,
  options: VoiceAgentsGetVoiceAgentVersionOptionalParams = { requestOptions: {} },
): Promise<VoiceAgentVersionObject> {
  const result = await _getVoiceAgentVersionSend(
    context,
    foundryFeatures,
    agentName,
    agentVersion,
    options,
  );
  return _getVoiceAgentVersionDeserialize(result);
}

export function _listVoiceAgentVersionsSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: VoiceAgentsListVoiceAgentVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/voice_agents/{agent_name}/versions{?limit,order,after,before,include_drafts,api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listVoiceAgentVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultVoiceAgentVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultVoiceAgentVersionObjectDeserializer(result.body);
}
/** Returns a paged collection of versions for the specified voice agent. */
export function listVoiceAgentVersions(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: VoiceAgentsListVoiceAgentVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VoiceAgentVersionObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listVoiceAgentVersionsSend(context, foundryFeatures, agentName, options),
    _listVoiceAgentVersionsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _createVoiceAgentVersionSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  definition: VoiceAgentDefinition,
  options: VoiceAgentsCreateVoiceAgentVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/voice_agents/{agent_name}/versions{?api%2Dversion}",
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
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      metadata: options?.metadata,
      description: options?.description,
      blueprint_reference: !options?.blueprintReference
        ? options?.blueprintReference
        : agentBlueprintReferenceUnionSerializer(options?.blueprintReference),
      draft: options?.draft,
      definition: voiceAgentDefinitionSerializer(definition),
    },
  });
}

export async function _createVoiceAgentVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<VoiceAgentVersionObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceAgentVersionObjectDeserializer(result.body);
}
/** Creates a new version for the specified voice agent and returns the created version resource. */
export async function createVoiceAgentVersion(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  definition: VoiceAgentDefinition,
  options: VoiceAgentsCreateVoiceAgentVersionOptionalParams = { requestOptions: {} },
): Promise<VoiceAgentVersionObject> {
  const result = await _createVoiceAgentVersionSend(
    context,
    foundryFeatures,
    agentName,
    definition,
    options,
  );
  return _createVoiceAgentVersionDeserialize(result);
}

export function _generateVoiceAgentSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  name: string,
  modelType: VoiceModelType,
  model: string,
  agentType: VoiceAgentType,
  useCase: VoiceAgentUseCase,
  goal: string,
  options: VoiceAgentsGenerateVoiceAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/voice_agents:generate{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
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
      name: name,
      model_type: modelType,
      model: model,
      agent_type: agentType,
      use_case: useCase,
      goal: goal,
      description: options?.description,
      tools: !options?.tools ? options?.tools : voiceAgentToolArraySerializer(options?.tools),
      draft: options?.draft,
    },
  });
}

export async function _generateVoiceAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<VoiceAgentObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceAgentObjectDeserializer(result.body);
}
/**
 * Generates and creates a voice agent from high-level inputs plus a natural-language goal.
 * The operation expands the goal into a full, editable definition, creates the agent through the standard
 * voice create path, and returns the created `VoiceAgentObject`. The caller can edit or override the
 * generated fields afterward through normal versioning.
 */
export async function generateVoiceAgent(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  name: string,
  modelType: VoiceModelType,
  model: string,
  agentType: VoiceAgentType,
  useCase: VoiceAgentUseCase,
  goal: string,
  options: VoiceAgentsGenerateVoiceAgentOptionalParams = { requestOptions: {} },
): Promise<VoiceAgentObject> {
  const result = await _generateVoiceAgentSend(
    context,
    foundryFeatures,
    name,
    modelType,
    model,
    agentType,
    useCase,
    goal,
    options,
  );
  return _generateVoiceAgentDeserialize(result);
}

export function _disableVoiceAgentSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: VoiceAgentsDisableVoiceAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/voice_agents/{agent_name}:disable{?api%2Dversion}",
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
    headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
  });
}

export async function _disableVoiceAgentDeserialize(result: PathUncheckedResponse): Promise<void> {
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
 * Disables the specified voice agent, preventing it from accepting new requests.
 * This operation is idempotent — disabling an already-disabled voice agent returns success with no side effects.
 */
export async function disableVoiceAgent(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: VoiceAgentsDisableVoiceAgentOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _disableVoiceAgentSend(context, foundryFeatures, agentName, options);
  return _disableVoiceAgentDeserialize(result);
}

export function _enableVoiceAgentSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: VoiceAgentsEnableVoiceAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/voice_agents/{agent_name}:enable{?api%2Dversion}",
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
    headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
  });
}

export async function _enableVoiceAgentDeserialize(result: PathUncheckedResponse): Promise<void> {
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
 * Enables the specified voice agent, allowing it to accept new requests.
 * This operation is idempotent — enabling an already-enabled voice agent returns success with no side effects.
 */
export async function enableVoiceAgent(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: VoiceAgentsEnableVoiceAgentOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _enableVoiceAgentSend(context, foundryFeatures, agentName, options);
  return _enableVoiceAgentDeserialize(result);
}

export function _deleteVoiceAgentSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: VoiceAgentsDeleteVoiceAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/voice_agents/{agent_name}{?api%2Dversion}",
    {
      agent_name: agentName,
      "api%2Dversion": context.apiVersion ?? "v1",
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

export async function _deleteVoiceAgentDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/** Deletes a voice agent and all of its versions. */
export async function deleteVoiceAgent(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: VoiceAgentsDeleteVoiceAgentOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteVoiceAgentSend(context, foundryFeatures, agentName, options);
  return _deleteVoiceAgentDeserialize(result);
}

export function _updateVoiceAgentSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  definition: VoiceAgentDefinition,
  options: VoiceAgentsUpdateVoiceAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/voice_agents/{agent_name}{?api%2Dversion}",
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
    contentType: "application/json",
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      metadata: options?.metadata,
      description: options?.description,
      blueprint_reference: !options?.blueprintReference
        ? options?.blueprintReference
        : agentBlueprintReferenceUnionSerializer(options?.blueprintReference),
      definition: voiceAgentDefinitionSerializer(definition),
    },
  });
}

export async function _updateVoiceAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<VoiceAgentObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceAgentObjectDeserializer(result.body);
}
/**
 * Updates a voice agent by adding a new version if there are any changes to the agent definition.
 * If no changes, returns the existing agent version.
 */
export async function updateVoiceAgent(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  definition: VoiceAgentDefinition,
  options: VoiceAgentsUpdateVoiceAgentOptionalParams = { requestOptions: {} },
): Promise<VoiceAgentObject> {
  const result = await _updateVoiceAgentSend(
    context,
    foundryFeatures,
    agentName,
    definition,
    options,
  );
  return _updateVoiceAgentDeserialize(result);
}

export function _getVoiceAgentSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: VoiceAgentsGetVoiceAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/voice_agents/{agent_name}{?api%2Dversion}",
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
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getVoiceAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<VoiceAgentObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceAgentObjectDeserializer(result.body);
}
/** Retrieves a voice agent by its unique name. */
export async function getVoiceAgent(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: VoiceAgentsGetVoiceAgentOptionalParams = { requestOptions: {} },
): Promise<VoiceAgentObject> {
  const result = await _getVoiceAgentSend(context, foundryFeatures, agentName, options);
  return _getVoiceAgentDeserialize(result);
}

export function _listVoiceAgentsSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  options: VoiceAgentsListVoiceAgentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/voice_agents{?limit,order,after,before,api%2Dversion}",
    {
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listVoiceAgentsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultVoiceAgentObject> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultVoiceAgentObjectDeserializer(result.body);
}
/** Returns a paged collection of voice agents. */
export function listVoiceAgents(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  options: VoiceAgentsListVoiceAgentsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VoiceAgentObject> {
  return buildPagedAsyncIterator(
    context,
    () => _listVoiceAgentsSend(context, foundryFeatures, options),
    _listVoiceAgentsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _createVoiceAgentSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  name: string,
  definition: VoiceAgentDefinition,
  options: VoiceAgentsCreateVoiceAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/voice_agents{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
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
      name: name,
      state: options?.state,
      metadata: options?.metadata,
      description: options?.description,
      blueprint_reference: !options?.blueprintReference
        ? options?.blueprintReference
        : agentBlueprintReferenceUnionSerializer(options?.blueprintReference),
      draft: options?.draft,
      definition: voiceAgentDefinitionSerializer(definition),
      agent_endpoint: !options?.agentEndpoint
        ? options?.agentEndpoint
        : agentEndpointConfigSerializer(options?.agentEndpoint),
      agent_card: !options?.agentCard
        ? options?.agentCard
        : agentCardSerializer(options?.agentCard),
    },
  });
}

export async function _createVoiceAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<VoiceAgentObject> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceAgentObjectDeserializer(result.body);
}
/** Creates a new voice agent, or a new version of an existing one. */
export async function createVoiceAgent(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  name: string,
  definition: VoiceAgentDefinition,
  options: VoiceAgentsCreateVoiceAgentOptionalParams = { requestOptions: {} },
): Promise<VoiceAgentObject> {
  const result = await _createVoiceAgentSend(context, foundryFeatures, name, definition, options);
  return _createVoiceAgentDeserialize(result);
}
