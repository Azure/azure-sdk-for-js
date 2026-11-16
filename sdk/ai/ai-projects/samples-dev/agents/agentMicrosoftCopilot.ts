// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to configure a prompt agent with the Microsoft
 * Copilot managed harness and built-in tool overrides. The project must have
 * access to the Microsoft Copilot private preview.
 *
 * @summary Create a prompt agent with the Microsoft Copilot harness and toolset.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Creating a prompt agent with the Microsoft Copilot harness...");
  const agent = await project.agents.createVersion(
    "microsoft-copilot-agent",
    {
      kind: "prompt",
      model: deploymentName,
      instructions: "Help the user research questions using the available web tool.",
      harness: { type: "microsoft_copilot_preview" },
      tools: [
        {
          type: "microsoft_copilot_toolset_preview",
          default_config: { enabled: false },
          configs: [{ name: "web", enabled: true }],
        },
      ],
    },
    { foundryFeatures: "MicrosoftCopilot=V1Preview" },
  );

  try {
    console.log(`Created agent ${agent.name} version ${agent.version}.`);
    const version = await project.agents.getVersion(agent.name, agent.version);
    console.log("Agent definition:", version.definition);
  } finally {
    console.log("Cleaning up the agent version...");
    await project.agents.deleteVersion(agent.name, agent.version);
    console.log("Agent version deleted.");
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
