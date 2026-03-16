// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with Microsoft Fabric capabilities
 * using the MicrosoftFabricPreviewTool and synchronous Azure AI Projects client. The agent can query
 * Fabric data sources and provide responses based on data analysis.
 *
 * @summary This sample demonstrates how to create an agent with Microsoft Fabric tool capabilities,
 * send queries to Fabric data sources, and clean up resources.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
const readline = require("readline");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const fabricProjectConnectionId =
  process.env["FABRIC_PROJECT_CONNECTION_ID"] || "<fabric project connection id>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with Microsoft Fabric tool...");

  // Define Microsoft Fabric tool that connects to Fabric data sources
  const agent = await project.agents.createVersion("MyFabricAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant.",
    tools: [
      {
        type: "fabric_dataagent_preview",
        fabric_dataagent_preview: {
          project_connections: [
            {
              project_connection_id: fabricProjectConnectionId,
            },
          ],
        },
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Prompt user for input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const userInput = await new Promise((resolve) => {
    rl.question(
      "Enter your question for Fabric (Default: 'Tell me about sales records'): \n",
      (answer) => {
        rl.close();
        resolve(answer);
      },
    );
  });

  console.log("\nSending request to Fabric agent...");
  const response = await openAIClient.responses.create(
    {
      input: userInput || "Tell me about sales records",
    },
    {
      body: {
        agent: { name: agent.name, type: "agent_reference" },
        tool_choice: "required",
      },
    },
  );

  console.log(`\nResponse output: ${response.output_text}`);

  // Clean up resources by deleting the agent version
  // This prevents accumulation of unused resources in your project
  console.log("\nCleaning up resources...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");

  console.log("\nMicrosoft Fabric agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
