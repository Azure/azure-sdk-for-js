// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to configure post-call delivery for a voice agent.
 *
 * @summary Create a voice agent with Event Grid and routine post-call destinations.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

export async function main(): Promise<void> {
  // The deployment must support voice. Create the Event Grid connection and routine first.
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  const deploymentName = process.env["FOUNDRY_MODEL_NAME"];
  const connectionName = process.env["FOUNDRY_EVENT_GRID_CONNECTION_NAME"];
  const routineName = process.env["FOUNDRY_POST_CALL_ROUTINE_NAME"];
  if (!projectEndpoint || !deploymentName || !connectionName || !routineName) {
    throw new Error(
      "Set FOUNDRY_PROJECT_ENDPOINT, FOUNDRY_MODEL_NAME, FOUNDRY_EVENT_GRID_CONNECTION_NAME, and FOUNDRY_POST_CALL_ROUTINE_NAME before running this sample.",
    );
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const options = {
    requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
  };

  console.log("Creating a voice agent with post-call delivery...");
  const agent = await project.agents.createVersion(
    `sample-voice-post-call-${Date.now()}`,
    {
      kind: "voice",
      model_type: "self_deployed",
      model: deploymentName,
      instructions: "Help callers find public transport information. Keep answers short.",
      output_modalities: ["audio"],
      post_call: {
        destinations: [
          { type: "event_grid", connection_name: connectionName },
          { type: "routine", name: routineName },
        ],
        // The transcript is always delivered. Omit include: audio is unsupported in this preview.
      },
      store: false,
    },
    options,
  );
  try {
    console.log(`Created voice agent: ${agent.name}, version: ${agent.version}`);
    const version = await project.agents.getVersion(agent.name, agent.version, options);
    if ("post_call" in version.definition) {
      console.log("Post-call delivery:", version.definition.post_call);
    }
    // Delivery occurs after a voice session ends; this sample only configures the agent.
  } finally {
    console.log("Deleting the sample agent...");
    await project.agents.delete(agent.name, options);
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
