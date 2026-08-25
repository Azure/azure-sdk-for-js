// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a Prompt Agent that uses the
 * Web IQ preview tool.
 *
 * @summary Create an agent with WebIQPreviewTool, send a query that leverages
 * Web IQ to browse and retrieve information from the web, and clean up resources.
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient, type WebIQPreviewTool } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const webIqProjectConnectionId =
  process.env["WEBIQ_CONNECTION_ID"] || "<web iq project connection id>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  const tool: WebIQPreviewTool = {
    type: "web_iq_preview",
    project_connection_id: webIqProjectConnectionId,
    // Set to "never" so the sample runs unattended; omit this property to let the
    // service default to "always" and require approval before each action.
    require_approval: "never",
  };

  console.log("Creating agent with WebIQPreviewTool...");
  const agent = await project.agents.createVersion("MyWebIQAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions: "Use the available Web IQ tools to answer questions and perform tasks.",
    tools: [tool],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  const userInput = "Summarize the latest release notes published on the Azure SDK blog.";
  console.log("\nSending request to agent...");

  const response = await openAIClient.responses.create(
    {
      input: userInput,
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
