// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Generate a voice agent from a goal, inspect its definition, and clean up.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

export async function main(): Promise<void> {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"]?.trim();
  if (!projectEndpoint) {
    throw new Error("Set FOUNDRY_PROJECT_ENDPOINT before running this sample.");
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const options = {
    requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
  };

  console.log("Generating a voice agent...");
  const agent = await project.beta.agents.createFromPrompt(
    {
      kind: "voice",
      name: `sample-generated-voice-${Date.now()}`,
      model_type: "managed",
      use_case: "Travel information",
      goal: "Help callers find information about public transport. Do not make bookings.",
    },
    options,
  );
  try {
    console.log(`Generated agent: ${agent.name}`);
    const savedAgent = await project.agents.get(agent.name, options);
    console.log("Generated definition:", savedAgent.versions.latest.definition);
  } finally {
    console.log("Deleting the sample agent...");
    await project.agents.delete(agent.name, options);
  }
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
