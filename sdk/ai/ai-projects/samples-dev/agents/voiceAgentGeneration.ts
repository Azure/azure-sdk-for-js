// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Generate a voice agent from a use case, inspect its definition, and delete the agent.
 * Requires a voice-capable deployment in FOUNDRY_MODEL_NAME and access to the
 * VoiceAgents=V1Preview feature. This sample does not start a voice session.
 *
 * @summary Generate and inspect a voice agent using the standard agent lifecycle.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

export async function main(): Promise<void> {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  const model = process.env["FOUNDRY_MODEL_NAME"];
  if (!projectEndpoint || !model) {
    throw new Error(
      "Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_MODEL_NAME to a voice-capable deployment.",
    );
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const name = `voice-generation-sample-${Date.now()}`;
  console.log("Generating a voice agent...");
  const agent = await project.agents.generateAgent({
    kind: "voice",
    name,
    model_type: "self_deployed",
    model,
    use_case: "Answer questions about a bookstore's opening hours.",
    goal: "Explain that the bookstore is open from 9 AM to 5 PM on weekdays.",
  });
  try {
    console.log(`Generated agent: ${agent.name}`);
    const retrieved = await project.agents.get(agent.name);
    console.log(`Generated definition kind: ${retrieved.versions.latest.definition.kind}`);
    console.log("The generated definition can be edited using project.agents.createVersion.");
  } finally {
    console.log("Deleting the generated agent...");
    await project.agents.delete(agent.name, {
      requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
    });
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
