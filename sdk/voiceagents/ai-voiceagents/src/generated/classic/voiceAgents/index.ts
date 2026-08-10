// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VoiceAgentsContext } from "../../api/voiceAgentsContext.js";
import {
  deleteVoiceAgentVersion,
  getVoiceAgentVersion,
  listVoiceAgentVersions,
  createVoiceAgentVersion,
  generateVoiceAgent,
  disableVoiceAgent,
  enableVoiceAgent,
  deleteVoiceAgent,
  updateVoiceAgent,
  getVoiceAgent,
  listVoiceAgents,
  createVoiceAgent,
} from "../../api/voiceAgents/operations.js";
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
} from "../../api/voiceAgents/options.js";
import {
  VoiceAgentDefinition,
  VoiceModelType,
  VoiceAgentObject,
  VoiceAgentVersionObject,
  VoiceAgentType,
  VoiceAgentUseCase,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VoiceAgents operations. */
export interface VoiceAgentsOperations {
  /** Deletes a specific version of a voice agent. */
  deleteVoiceAgentVersion: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    agentVersion: string,
    options?: VoiceAgentsDeleteVoiceAgentVersionOptionalParams,
  ) => Promise<void>;
  /** Retrieves the specified version of a voice agent by its agent name and version identifier. */
  getVoiceAgentVersion: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    agentVersion: string,
    options?: VoiceAgentsGetVoiceAgentVersionOptionalParams,
  ) => Promise<VoiceAgentVersionObject>;
  /** Returns a paged collection of versions for the specified voice agent. */
  listVoiceAgentVersions: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    options?: VoiceAgentsListVoiceAgentVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceAgentVersionObject>;
  /** Creates a new version for the specified voice agent and returns the created version resource. */
  createVoiceAgentVersion: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    definition: VoiceAgentDefinition,
    options?: VoiceAgentsCreateVoiceAgentVersionOptionalParams,
  ) => Promise<VoiceAgentVersionObject>;
  /**
   * Generates and creates a voice agent from high-level inputs plus a natural-language goal.
   * The operation expands the goal into a full, editable definition, creates the agent through the standard
   * voice create path, and returns the created `VoiceAgentObject`. The caller can edit or override the
   * generated fields afterward through normal versioning.
   */
  generateVoiceAgent: (
    foundryFeatures: "VoiceAgents=V1Preview",
    name: string,
    modelType: VoiceModelType,
    model: string,
    agentType: VoiceAgentType,
    useCase: VoiceAgentUseCase,
    goal: string,
    options?: VoiceAgentsGenerateVoiceAgentOptionalParams,
  ) => Promise<VoiceAgentObject>;
  /**
   * Disables the specified voice agent, preventing it from accepting new requests.
   * This operation is idempotent — disabling an already-disabled voice agent returns success with no side effects.
   */
  disableVoiceAgent: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    options?: VoiceAgentsDisableVoiceAgentOptionalParams,
  ) => Promise<void>;
  /**
   * Enables the specified voice agent, allowing it to accept new requests.
   * This operation is idempotent — enabling an already-enabled voice agent returns success with no side effects.
   */
  enableVoiceAgent: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    options?: VoiceAgentsEnableVoiceAgentOptionalParams,
  ) => Promise<void>;
  /** Deletes a voice agent and all of its versions. */
  deleteVoiceAgent: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    options?: VoiceAgentsDeleteVoiceAgentOptionalParams,
  ) => Promise<void>;
  /**
   * Updates a voice agent by adding a new version if there are any changes to the agent definition.
   * If no changes, returns the existing agent version.
   */
  updateVoiceAgent: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    definition: VoiceAgentDefinition,
    options?: VoiceAgentsUpdateVoiceAgentOptionalParams,
  ) => Promise<VoiceAgentObject>;
  /** Retrieves a voice agent by its unique name. */
  getVoiceAgent: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    options?: VoiceAgentsGetVoiceAgentOptionalParams,
  ) => Promise<VoiceAgentObject>;
  /** Returns a paged collection of voice agents. */
  listVoiceAgents: (
    foundryFeatures: "VoiceAgents=V1Preview",
    options?: VoiceAgentsListVoiceAgentsOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceAgentObject>;
  /** Creates a new voice agent, or a new version of an existing one. */
  createVoiceAgent: (
    foundryFeatures: "VoiceAgents=V1Preview",
    name: string,
    definition: VoiceAgentDefinition,
    options?: VoiceAgentsCreateVoiceAgentOptionalParams,
  ) => Promise<VoiceAgentObject>;
}
function _getVoiceAgents(context: VoiceAgentsContext) {
  return {
    deleteVoiceAgentVersion: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      agentVersion: string,
      options?: VoiceAgentsDeleteVoiceAgentVersionOptionalParams,
    ) => deleteVoiceAgentVersion(context, foundryFeatures, agentName, agentVersion, options),
    getVoiceAgentVersion: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      agentVersion: string,
      options?: VoiceAgentsGetVoiceAgentVersionOptionalParams,
    ) => getVoiceAgentVersion(context, foundryFeatures, agentName, agentVersion, options),
    listVoiceAgentVersions: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      options?: VoiceAgentsListVoiceAgentVersionsOptionalParams,
    ) => listVoiceAgentVersions(context, foundryFeatures, agentName, options),
    createVoiceAgentVersion: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      definition: VoiceAgentDefinition,
      options?: VoiceAgentsCreateVoiceAgentVersionOptionalParams,
    ) => createVoiceAgentVersion(context, foundryFeatures, agentName, definition, options),
    generateVoiceAgent: (
      foundryFeatures: "VoiceAgents=V1Preview",
      name: string,
      modelType: VoiceModelType,
      model: string,
      agentType: VoiceAgentType,
      useCase: VoiceAgentUseCase,
      goal: string,
      options?: VoiceAgentsGenerateVoiceAgentOptionalParams,
    ) =>
      generateVoiceAgent(
        context,
        foundryFeatures,
        name,
        modelType,
        model,
        agentType,
        useCase,
        goal,
        options,
      ),
    disableVoiceAgent: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      options?: VoiceAgentsDisableVoiceAgentOptionalParams,
    ) => disableVoiceAgent(context, foundryFeatures, agentName, options),
    enableVoiceAgent: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      options?: VoiceAgentsEnableVoiceAgentOptionalParams,
    ) => enableVoiceAgent(context, foundryFeatures, agentName, options),
    deleteVoiceAgent: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      options?: VoiceAgentsDeleteVoiceAgentOptionalParams,
    ) => deleteVoiceAgent(context, foundryFeatures, agentName, options),
    updateVoiceAgent: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      definition: VoiceAgentDefinition,
      options?: VoiceAgentsUpdateVoiceAgentOptionalParams,
    ) => updateVoiceAgent(context, foundryFeatures, agentName, definition, options),
    getVoiceAgent: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      options?: VoiceAgentsGetVoiceAgentOptionalParams,
    ) => getVoiceAgent(context, foundryFeatures, agentName, options),
    listVoiceAgents: (
      foundryFeatures: "VoiceAgents=V1Preview",
      options?: VoiceAgentsListVoiceAgentsOptionalParams,
    ) => listVoiceAgents(context, foundryFeatures, options),
    createVoiceAgent: (
      foundryFeatures: "VoiceAgents=V1Preview",
      name: string,
      definition: VoiceAgentDefinition,
      options?: VoiceAgentsCreateVoiceAgentOptionalParams,
    ) => createVoiceAgent(context, foundryFeatures, name, definition, options),
  };
}
export function _getVoiceAgentsOperations(context: VoiceAgentsContext): VoiceAgentsOperations {
  return {
    ..._getVoiceAgents(context),
  };
}
