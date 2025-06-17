// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Agent, AgentsClient, CreateAgentOptionalParams } from "@azure/ai-agents";
import "dotenv/config";
import { getTool } from "./createTool.js";

const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";
// Create an agent
export async function createAgent(
  client: AgentsClient,
  tools: Array<
    | "azure-ai-search"
    | "bing-grounding"
    | { "connected-agent": { id: string; name: string; description: string } }
  > = [],
  name?: string,
  instructions?: string,
  options: CreateAgentOptionalParams = {},
): Promise<Agent> {
  const { tools: agentTools, toolResources } = getTool(tools);
  const instructionsProp = instructions ?? "You are a helpful agent.";

  const nextOptions: CreateAgentOptionalParams = {
    ...options,
    tools: [...(options.tools ?? []), ...agentTools],
    toolResources: toolResources ?? options.toolResources,
  };

  const agent = await client.createAgent(modelDeploymentName, {
    name: name ?? "my-agent",
    instructions: instructionsProp,
    ...nextOptions,
  });
  return agent;
}

export async function createSimpleAgent(
  client: AgentsClient,
  name?: string,
  instructions?: string,
): Promise<Agent> {
  const agent = await client.createAgent(modelDeploymentName, {
    name: name ?? "my-agent",
    instructions: instructions ?? "You are helpful agent",
  });
  console.log(`Created agent, agent ID : ${agent.id}`);
  return agent;
}
