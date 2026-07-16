// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a Prompt Agent that uses the
 * Fabric IQ preview tool.
 *
 * @summary Create an agent with FabricIQPreviewTool, send a query that leverages
 * Fabric IQ to search and retrieve information, and clean up resources.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");
const { withAgentVersionEndpoint } = require("../agentEndpointUtils.js");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";
const fabricIqProjectConnectionId =
  process.env["FABRIC_IQ_PROJECT_CONNECTION_ID"] || "<fabric iq project connection id>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const tool = {
    type: "fabric_iq_preview",
    project_connection_id: fabricIqProjectConnectionId,
    require_approval: "never",
  };

  console.log("Creating agent with FabricIQPreviewTool...");
  await withAgentVersionEndpoint(
    project,
    agentName,
    {
      kind: "prompt",
      model: deploymentName,
      instructions: "Use the available Fabric IQ tools to answer questions and perform tasks.",
      tools: [tool],
    },
    async (agent) => {
      console.log(
        `Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`,
      );
      const openAIClient = project.getOpenAIClient({
        azureConfig: { allowPreview: true, agentName },
      });

      const userInput = process.env["FABRIC_IQ_USER_INPUT"] || "Summarize the available datasets";
      console.log("\nSending request to agent...");

      const response = await openAIClient.responses.create({
        input: userInput,
      });

      console.log(`Agent response: ${response.output_text}`);
    },
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
