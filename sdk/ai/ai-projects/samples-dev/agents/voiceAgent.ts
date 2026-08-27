// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to generate a voice agent from high-level inputs
 * using the AIProjectClient.
 *
 * @summary Generate a voice agent backed by a Foundry model deployment.
 * @azsdk-weight 100
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
    name: "my-voice-agent",
    model_type: "self_deployed",
    model: deploymentName,
    use_case: "Customer support",
    goal: "Answer customer questions clearly and concisely.",
  });

  const version = agent.versions.latest;
  console.log(`Generated voice agent ${agent.name}, version ${version.version}.`);

  await project.agents.deleteVersion(agent.name, version.version);
  console.log("Voice agent deleted.");
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
