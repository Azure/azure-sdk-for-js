// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to generate a voice agent from a natural-language goal.
 *
 * @summary Generate and inspect a managed voice agent, then delete the sample agent.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

export async function main(): Promise<void> {
  // Set FOUNDRY_PROJECT_ENDPOINT in .env to a project with voice agents enabled.
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  if (!projectEndpoint) {
    throw new Error("Set FOUNDRY_PROJECT_ENDPOINT before running this sample.");
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const options = {
    requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
  };

  console.log("Generating a voice agent from a goal...");
  const agent = await project.beta.agents.generate({
    kind: "voice",
    name: `sample-generated-voice-${Date.now()}`,
    model_type: "managed",
    use_case: "Travel information",
    goal: "Help callers find information about public transport. Do not make bookings.",
  });
  try {
    console.log(`Generated agent: ${agent.name}`);
    const savedAgent = await project.agents.get(agent.name, options);
    console.log("Generated definition:", savedAgent.versions.latest.definition);
  } finally {
    console.log("Deleting the generated sample agent...");
    await project.agents.delete(agent.name, options);
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
