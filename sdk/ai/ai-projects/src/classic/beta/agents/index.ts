// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import type { Agent, GenerateAgentRequest } from "../../../models/models.js";
import type { BetaAgentsCreateFromPromptOptionalParams } from "../../../api/beta/agents/options.js";
import { createFromPrompt } from "../../../api/beta/agents/operations.js";
import type { ResolvedTracingConfig } from "../../../tracing/configuration.js";
import { traceVoiceAgentOperation } from "../../../tracing/voiceAgentTracing.js";

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

export function _getBetaAgentsOperations(
  context: AIProjectContext,
  tracingConfig?: ResolvedTracingConfig,
): BetaAgentsOperations {
  return {
    createFromPrompt: (
      body: GenerateAgentRequest,
      options?: BetaAgentsCreateFromPromptOptionalParams,
    ) =>
      traceVoiceAgentOperation(
        "create_agent",
        context.endpoint,
        tracingConfig,
        () => createFromPrompt(context, body, options),
        (agent) => ({ "gen_ai.agent.name": agent.name, "gen_ai.agent.id": agent.id }),
      ),
  };
}
