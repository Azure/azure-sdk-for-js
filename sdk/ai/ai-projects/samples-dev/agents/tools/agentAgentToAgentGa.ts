// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent that talks to another agent through the
 * generally available Agent-to-Agent (A2A) tool. Unlike `A2APreviewTool`, `A2ATool` requires the
 * A2A protocol version (https://a2a-protocol.org/latest/) that the remote agent implements, and
 * the remote agent can be addressed either by a project connection or directly by its base URL.
 *
 * @summary Create an agent with the GA A2A tool, run a request against the remote agent, and
 * clean up resources.
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient, type A2ATool } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const a2aProjectConnectionId =
  process.env["A2A_PROJECT_CONNECTION_ID"] || "<a2a project connection id>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  const tool: A2ATool = {
    type: "a2a",
    // The connection holds the base URL and the credentials used to reach the remote agent.
    // Alternatively, set `base_url` (and optionally `agent_card_path`) to address the agent directly.
    project_connection_id: a2aProjectConnectionId,
    a2a_version: "1.0",
  };

  console.log("Creating agent with A2ATool...");
  const agent = await project.agents.createVersion("MyA2AGaAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions: "Delegate to the connected agent whenever it can answer the question.",
    tools: [tool],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  console.log("\nSending request to agent...");
  const response = await openAIClient.responses.create(
    {
      input: "What can the connected agent do?",
    },
    {
      body: {
        agent_reference: { name: agent.name, version: agent.version, type: "agent_reference" },
      },
    },
  );

  console.log(`Agent response: ${response.output_text}`);

  // Clean up the agent version so unused versions don't accumulate in the project.
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
