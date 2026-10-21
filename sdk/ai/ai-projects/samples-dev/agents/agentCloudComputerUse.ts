// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to configure an agent with the cloud computer use
 * preview tool. The project and model must support this preview tool.
 *
 * @summary Create and retrieve an agent with the cloud computer use preview tool.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import type { CloudComputerUsePreviewTool } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const tool: CloudComputerUsePreviewTool = { type: "cloud_computer_use_preview" };

  console.log("Creating an agent with the cloud computer use preview tool...");
  const agent = await project.agents.createVersion("cloud-computer-use-agent", {
    kind: "prompt",
    model: deploymentName,
    instructions: "Help the user with computer tasks using the available tool.",
    tools: [tool],
  });
  try {
    console.log("Retrieving the agent version...");
    const retrieved = await project.agents.getVersion(agent.name, agent.version);
    console.log("Agent definition:", retrieved.definition);
  } finally {
    console.log("Deleting the agent version...");
    await project.agents.deleteVersion(agent.name, agent.version);
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
