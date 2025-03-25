// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic agent operations.
 *
 */

import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  const agent = await client.agents.createAgent("gpt-4o", {
    name: "my-agent",
    instructions: "You are helpful agent",
  });

  console.log(`Created agent, agent ID : ${agent.id}`);

  await client.agents.deleteAgent(agent.id);

  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
