// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Create and inspect a voice agent with a greeting and conversation storage disabled.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

export async function main(): Promise<void> {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"]?.trim();
  // Use a deployment that supports realtime or cascaded voice.
  const modelName = process.env["FOUNDRY_MODEL_NAME"]?.trim();
  if (!projectEndpoint || !modelName) {
    throw new Error(
      "Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_MODEL_NAME before running this sample.",
    );
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Creating a voice agent version...");
  const options = {
    requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
  };
  const agent = await project.agents.createVersion(
    `sample-voice-${Date.now()}`,
    {
      kind: "voice",
      model_type: "self_deployed",
      model: modelName,
      instructions: "Help callers find public transport information. Keep answers short.",
      greeting: { type: "template", text: "Hello! How can I help with your journey?" },
      output_modalities: ["audio"],
      store: false,
    },
    options,
  );
  try {
    console.log(`Created voice agent: ${agent.name}, version: ${agent.version}`);
    const version = await project.agents.getVersion(agent.name, agent.version, options);
    if ("greeting" in version.definition) {
      console.log("Voice greeting:", version.definition.greeting);
    }
    if ("store" in version.definition) {
      console.log("Conversation storage enabled:", version.definition.store);
    }
    console.log("Agent configured. No voice session was opened.");
  } finally {
    console.log("Deleting the sample agent...");
    await project.agents.delete(agent.name, options);
  }
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
