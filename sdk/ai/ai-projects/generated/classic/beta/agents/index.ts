// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import { createFromPrompt } from "../../../api/beta/agents/operations.js";
import { BetaAgentsCreateFromPromptOptionalParams } from "../../../api/beta/agents/options.js";
import { Agent, GenerateAgentRequest } from "../../../models/models.js";

/** Interface representing a BetaAgents operations. */
export interface BetaAgentsOperations {
  /**
   * Generates and creates an agent from kind-specific high-level inputs.
   * The generated definition remains fully editable through the standard agent versioning operations.
   */
  createFromPrompt: (
    foundryFeatures: "VoiceAgents=V1Preview",
    body: GenerateAgentRequest,
    options?: BetaAgentsCreateFromPromptOptionalParams,
  ) => Promise<Agent>;
}

function _getBetaAgents(context: AIProjectContext) {
  return {
    createFromPrompt: (
      foundryFeatures: "VoiceAgents=V1Preview",
      body: GenerateAgentRequest,
      options?: BetaAgentsCreateFromPromptOptionalParams,
    ) => createFromPrompt(context, foundryFeatures, body, options),
  };
}

export function _getBetaAgentsOperations(context: AIProjectContext): BetaAgentsOperations {
  return {
    ..._getBetaAgents(context),
  };
}
