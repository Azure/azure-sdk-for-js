// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Test Agent Infrastructure
 *
 * Provides utilities for creating and discovering Foundry agents
 * for integration testing with VoiceLive.
 *
 * Note: Agent creation/discovery requires DefaultAzureCredential which only works in Node.js.
 * In browser environments, these functions assume agents already exist and return the expected names.
 */

// Only import Node-specific modules in Node.js environment
const isNodeEnvironment = typeof self === "undefined";

/**
 * Default name for the VoiceLive integration test agent.
 * This agent is created once and reused across all test runs.
 */
export const TEST_AGENT_NAME = "VoiceLiveIntegrationTestAgentV2";

/**
 * Default instructions for the test agent.
 */
const DEFAULT_AGENT_INSTRUCTIONS =
  "You are a helpful math assistant. When asked a math question, solve it step by step and provide the answer.";

/**
 * Options for creating a test agent.
 */
export interface CreateAgentOptions {
  /** Custom instructions for the agent. Defaults to math assistant instructions. */
  instructions?: string;
  /** Model deployment name. Defaults to MODEL_DEPLOYMENT_NAME env var or "gpt-4o". */
  model?: string;
}

/**
 * Gets the project endpoint from environment variables.
 */
function getProjectEndpoint(): string {
  const endpoint = process.env.FOUNDRY_PROJECT_ENDPOINT;
  if (!endpoint) {
    throw new Error("Missing FOUNDRY_PROJECT_ENDPOINT environment variable");
  }
  return endpoint;
}

/**
 * Creates a Foundry agent with the specified name.
 * Note: This function only works in Node.js environments.
 *
 * @param agentName - Name for the agent (defaults to TEST_AGENT_NAME)
 * @param options - Optional configuration for the agent
 * @returns Promise resolving to the created agent name
 */
export async function createTestAgent(
  agentName: string = TEST_AGENT_NAME,
  options?: CreateAgentOptions,
): Promise<string> {
  // In browser environments, agent creation is not supported
  if (!isNodeEnvironment) {
    console.warn(`Browser environment: cannot create agent "${agentName}", returning name only`);
    return agentName;
  }

  const { AIProjectClient } = await import("@azure/ai-projects");
  const { DefaultAzureCredential } = await import("@azure/identity");

  const endpoint = getProjectEndpoint();
  const modelName = options?.model ?? process.env.MODEL_DEPLOYMENT_NAME ?? "gpt-4o";

  console.info(`Creating agent "${agentName}" with model: ${modelName} at endpoint: ${endpoint}`);
  const client = new AIProjectClient(endpoint, new DefaultAzureCredential());

  const definition = {
    kind: "prompt" as const,
    model: modelName,
    instructions: options?.instructions ?? DEFAULT_AGENT_INSTRUCTIONS,
  };

  const agentVersion = await client.agents.createVersion(agentName, definition);
  console.info(
    `Agent created (id: ${agentVersion.id}, name: ${agentVersion.name}, version: ${agentVersion.version})`,
  );

  return agentVersion.name;
}

/**
 * Finds a Foundry agent by name.
 * Note: This function only works in Node.js environments.
 *
 * @param agentName - Name of the agent to find (defaults to TEST_AGENT_NAME)
 * @returns Promise resolving to the agent name if found, or empty string if not found
 */
export async function findTestAgent(agentName: string = TEST_AGENT_NAME): Promise<string> {
  // In browser environments, assume agent exists
  if (!isNodeEnvironment) {
    console.log(`Browser environment: assuming agent "${agentName}" exists`);
    return agentName;
  }

  const { AIProjectClient } = await import("@azure/ai-projects");
  const { DefaultAzureCredential } = await import("@azure/identity");

  const endpoint = getProjectEndpoint();
  const client = new AIProjectClient(endpoint, new DefaultAzureCredential());
  console.info(`Searching for agent "${agentName}" at endpoint:`, endpoint);

  for await (const agent of client.agents.list()) {
    console.info(`Found agent: ${agent.name}`);
    if (agent.name === agentName) {
      return agent.name;
    }
  }

  console.info(`Agent "${agentName}" not found.`);
  return "";
}

/**
 * Gets or creates a Foundry agent by name.
 * First attempts to find an existing agent, creates one if not found.
 * In browser environments, assumes the agent already exists and returns the name.
 *
 * @param agentName - Name of the agent (defaults to TEST_AGENT_NAME)
 * @param options - Optional configuration used when creating a new agent
 * @returns Promise resolving to the agent name
 */
export async function getOrCreateTestAgent(
  agentName: string = TEST_AGENT_NAME,
  options?: CreateAgentOptions,
): Promise<string> {
  // In browser environments, assume agents already exist (created by Node tests)
  if (!isNodeEnvironment) {
    console.log(`Browser environment: assuming agent "${agentName}" exists`);
    return agentName;
  }

  const existingAgent = await findTestAgent(agentName);
  if (existingAgent) {
    return existingAgent;
  }

  return createTestAgent(agentName, options);
}
