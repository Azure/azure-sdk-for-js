// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates creating, retrieving, updating, listing, and deleting a voice agent.
 *
 * @summary manages the lifecycle of a voice agent.
 */

import { VoiceAgentsClient } from "@azure/ai-voiceagents";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = getRequiredEnvironmentVariable("AZURE_VOICE_AGENTS_ENDPOINT");
const agentNamePrefix = getRequiredEnvironmentVariable("AZURE_VOICE_AGENTS_AGENT_NAME");
const agentName = `${agentNamePrefix.slice(0, 39)}-lifecycle-${Date.now()}`;
const modelName = process.env["AZURE_VOICE_AGENTS_MODEL"] ?? "gpt-realtime";
const preview = "VoiceAgents=V1Preview";

function getRequiredEnvironmentVariable(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Set ${name} before running this sample.`);
  }
  return value;
}

export async function main() {
  const client = new VoiceAgentsClient(projectEndpoint, new DefaultAzureCredential());
  let agentCreated = false;
  const definition = {
    kind: "voice",
    model_type: "managed",
    model: modelName,
    instructions: "You are a concise and helpful voice assistant.",
    output_modalities: ["text", "audio"],
    audio: {
      output: {
        format: { type: "audio/pcm", rate: 24000 },
        voice: { type: "azure-standard", name: "en-US-AvaNeural" },
      },
    },
  };

  try {
    const created = await client.voiceAgents.createVoiceAgent(preview, agentName, definition, {
      description: "Voice Agents JavaScript SDK lifecycle sample",
    });
    agentCreated = true;
    console.log(`Created ${created.name}, version ${created.versions.latest.version}`);

    const retrieved = await client.voiceAgents.getVoiceAgent(preview, agentName);
    console.log(`Retrieved ${retrieved.name}, state ${retrieved.state}`);

    const updated = await client.voiceAgents.updateVoiceAgent(preview, agentName, {
      ...definition,
      instructions: "You are a concise, friendly, and helpful voice assistant.",
    });
    console.log(`Updated ${updated.name}, version ${updated.versions.latest.version}`);

    console.log("Voice agents:");
    for await (const agent of client.voiceAgents.listVoiceAgents(preview, { limit: 20 })) {
      console.log(`- ${agent.name} (${agent.state})`);
    }
  } finally {
    if (agentCreated) {
      await client.voiceAgents.deleteVoiceAgent(preview, agentName);
      console.log(`Deleted ${agentName}`);
    }
  }
}

main().catch((error) => {
  console.error("The sample encountered an error:", error);
  process.exitCode = 1;
});
