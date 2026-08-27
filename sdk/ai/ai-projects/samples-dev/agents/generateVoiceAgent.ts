// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to generate a voice agent from high-level inputs.
 *
 * @summary Generate a voice agent with the AIProjectClient.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Generating a voice agent...");
  const agent = await project.agents.generateAgent({
    kind: "voice",
    name: "voice-agent-sample",
    goal: "Help users plan concise meeting agendas.",
    model_type: "self_deployed",
    model: deploymentName,
  });
  console.log(`Generated voice agent: ${agent.name}`);

  console.log("Deleting the generated voice agent...");
  await project.agents.delete(agent.name);
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
