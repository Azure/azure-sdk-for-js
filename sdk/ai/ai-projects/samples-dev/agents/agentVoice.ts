// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Create a GA voice agent with a greeting and disabled storage; optionally enable preview post-call notifications.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import type { VoiceAgentPostCallDestinationUnion } from "@azure/ai-projects";
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
  const postCallDestinations: VoiceAgentPostCallDestinationUnion[] = [];
  // Optionally name an existing Event Grid connection or routine in this project.
  const eventGridConnection = process.env["FOUNDRY_POST_CALL_EVENT_GRID_CONNECTION"];
  const routineName = process.env["FOUNDRY_POST_CALL_ROUTINE_NAME"];
  if (eventGridConnection) {
    postCallDestinations.push({ type: "event_grid", connection_name: eventGridConnection });
  }
  if (routineName) {
    postCallDestinations.push({ type: "routine", name: routineName });
  }
  // Post-call delivery is preview. This sample requests transcripts only, not recording URLs.

  console.log("Creating a voice agent version...");
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
      post_call: postCallDestinations.length ? { destinations: postCallDestinations } : undefined,
    },
    {
      // Realtime/cascaded definitions are GA; only the optional post_call configuration needs opt-in.
      foundryFeatures: postCallDestinations.length ? "VoiceAgents=V1Preview" : undefined,
    },
  );
  try {
    console.log(`Created voice agent: ${agent.name}, version: ${agent.version}`);
    const version = await project.agents.getVersion(agent.name, agent.version);
    if ("greeting" in version.definition) {
      console.log("Voice greeting:", version.definition.greeting);
    }
    if ("store" in version.definition) {
      console.log("Conversation storage enabled:", version.definition.store);
    }
    if ("post_call" in version.definition) {
      console.log("Post-call delivery:", version.definition.post_call);
    }
    console.log("Agent configured. No voice session was opened.");
  } finally {
    console.log("Deleting the sample agent...");
    await project.agents.delete(agent.name);
  }
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
