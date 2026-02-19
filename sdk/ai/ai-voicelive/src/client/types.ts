// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Configuration for creating a session with an agent as the main AI actor.
 *
 * When using an agent session, the agent's configuration (tools, instructions,
 * temperature, etc.) is managed in the Foundry portal, not in session code.
 *
 * @remarks
 * This is distinct from {@link AgentConfig} which represents agent information
 * returned by the service in session responses.
 */
export interface AgentSessionConfig {
  /** The name of the Foundry agent to use */
  agentName: string;
  /** The name of the Azure AI project which the agent belongs to */
  projectName: string;
  /** The version of the agent to use. If not specified, the latest version will be used. */
  agentVersion?: string;
  /** The conversation ID to continue. If not specified, a new conversation will be created. */
  conversationId?: string;
  /**
   * The client ID of a user-assigned managed identity used for authenticating to the Foundry Agent service.
   * If not specified, the system-assigned managed identity will be used.
   */
  authenticationIdentityClientId?: string;
  /**
   * The Foundry resource name to use for cross-resource agent mode.
   * When set, the agent service endpoint will use this resource instead of the one from the connection URL.
   */
  foundryResourceOverride?: string;
}

/**
 * Target for a Voice Live session, specifying either a model or an agent.
 *
 * Use `{ model: string }` for model-centric sessions where the LLM is the main actor.
 * Use `{ agent: AgentSessionConfig }` for agent-centric sessions where the agent is the main actor.
 *
 * @example Model-centric session
 * ```typescript snippet:CreateSessionModelTarget
 * import { DefaultAzureCredential } from "@azure/identity";
 * import { VoiceLiveClient } from "@azure/ai-voicelive";
 *
 * const credential = new DefaultAzureCredential();
 * const endpoint = "https://your-resource.cognitiveservices.azure.com";
 * const client = new VoiceLiveClient(endpoint, credential);
 *
 * const session = client.createSession({ model: "gpt-4o-realtime-preview" });
 * ```
 *
 * @example Agent-centric session
 * ```typescript snippet:CreateSessionAgentTarget
 * import { DefaultAzureCredential } from "@azure/identity";
 * import { VoiceLiveClient } from "@azure/ai-voicelive";
 *
 * const credential = new DefaultAzureCredential();
 * const endpoint = "https://your-resource.cognitiveservices.azure.com";
 * const client = new VoiceLiveClient(endpoint, credential);
 *
 * const session = client.createSession({
 *   agent: { agentName: "my-agent", projectName: "my-project" },
 * });
 * ```
 */
export type SessionTarget =
  | { model: string; agent?: never }
  | { agent: AgentSessionConfig; model?: never };

/**
 * Type guard to check if a SessionTarget specifies an agent session.
 * @param target - The session target to check
 * @returns True if the target specifies an agent session
 */
export function isAgentSessionTarget(
  target: SessionTarget,
): target is { agent: AgentSessionConfig; model?: never } {
  return "agent" in target && target.agent !== undefined;
}

/**
 * Type guard to check if a SessionTarget specifies a model session.
 * @param target - The session target to check
 * @returns True if the target specifies a model session
 */
export function isModelSessionTarget(
  target: SessionTarget,
): target is { model: string; agent?: never } {
  return "model" in target && target.model !== undefined;
}
