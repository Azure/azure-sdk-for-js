// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and delete an agent using the Azure AI Projects SDK.
 * @summary Create and delete an agent.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";

async function main() {
  const client = new AIProjectClient(endpoint, new DefaultAzureCredential());
  const agent = await client.agents.createAgent("gpt-4o", {
    name: "my-agent",
    instructions: "You are a helpful agent",
  });

  console.log(`Created agent, agent ID : ${agent.id}`);

  await client.agents.deleteAgent(agent.id);

  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
