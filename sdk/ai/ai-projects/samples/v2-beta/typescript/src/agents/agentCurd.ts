// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use basic agent operations from the Azure Agents service.
 *
 * @summary demonstrates how to use basic agent operations.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const projectClient = new AIProjectClient(projectEndpoint, credential);
  const agent1 = await projectClient.agents.createVersion("bg-crud-agent4", {
    kind: "prompt",
    model: modelDeploymentName,
  });
  console.log("Created agent id:", agent1.id, "version:", agent1.version, "name:", agent1.name);
  const agent2 = await projectClient.agents.createVersion("bg-crud-agent2", {
    kind: "prompt",
    model: modelDeploymentName,
  });
  console.log("Created agent id:", agent2.id, "version:", agent2.version, "name:", agent2.name);

  // Retrieve Agent by name and version
  const retrievedAgent1 = await projectClient.agents.getVersion(agent1.name, agent1.version);
  console.log(
    "Retrieved agent id:",
    retrievedAgent1.id,
    "version:",
    retrievedAgent1.version,
    "name:",
    retrievedAgent1.name,
  );
  // Retrieve Agent by name (latest version)
  const latestAgent1 = await projectClient.agents.get("bg-crud-agent1");
  console.log(
    "Retrieved latest agent id:",
    latestAgent1.id,
    "name:",
    latestAgent1.versions.latest.name,
  );

  // List all agents
  const allAgents = projectClient.agents.listVersions(agent1.name);
  console.log("List all agents:");
  for await (const item of allAgents) {
    console.log("Agent id:", item.id, "name:", item.name, "version:", item.version);
  }

  // Delete agent1
  const result1 = await projectClient.agents.deleteVersion(agent1.name, agent1.version);
  console.log(
    "Deleted agent name:",
    result1.name,
    "version:",
    agent1.version,
    "result:",
    result1.deleted,
  );
  // Delete agent2
  const result2 = await projectClient.agents.deleteVersion(agent2.name, agent2.version);
  console.log(
    "Deleted agent name:",
    result2.name,
    "version:",
    agent2.version,
    "result:",
    result2.deleted,
  );
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
