// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import type { Agent, GenerateAgentRequest } from "../../../models/models.js";
import type { BetaAgentsCreateFromPromptOptionalParams } from "../../../api/beta/agents/options.js";
import { createFromPrompt } from "../../../api/beta/agents/operations.js";

/** Operations for managing agents. */
export interface BetaAgentsOperations {
  /**
   * Generates and creates an agent from kind-specific high-level inputs.
   * The generated definition remains fully editable through the standard agent versioning operations.
   */
  createFromPrompt: (
    body: GenerateAgentRequest,
    options?: BetaAgentsCreateFromPromptOptionalParams,
  ) => Promise<Agent>;
}

export function _getBetaAgentsOperations(context: AIProjectContext): BetaAgentsOperations {
  return {
    createFromPrompt: (
      body: GenerateAgentRequest,
      options?: BetaAgentsCreateFromPromptOptionalParams,
    ) => createFromPrompt(context, body, options),
  };
}
