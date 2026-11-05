// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a Prompt Agent that uses the
 * Web IQ preview tool.
 *
 * @summary Create an agent with WebIQPreviewTool, send a query that leverages
 * Web IQ to search and retrieve web information, and clean up resources.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const webIqProjectConnectionId =
  process.env["WEB_IQ_PROJECT_CONNECTION_ID"] || "<web iq project connection id>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  const tool = {
    type: "web_iq_preview",
    project_connection_id: webIqProjectConnectionId,
    require_approval: "never",
  };

  console.log("Creating agent with WebIQPreviewTool...");
  const agent = await project.agents.createVersion("MyWebIQAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions: "Use the available Web IQ tool to answer the user's question.",
    tools: [tool],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  const userInput = "What are the latest developments in cloud computing?";
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

module.exports = { main };
