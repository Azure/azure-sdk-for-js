// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VoiceAgentsClient, type VoiceAgentDefinition } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = "https://example.services.ai.azure.com/api/projects/my-project";
const agentName = "support-agent";
const preview = "VoiceAgents=V1Preview" as const;

async function manageVoiceAgent(): Promise<void> {
  const client = new VoiceAgentsClient(endpoint, new DefaultAzureCredential());
  const definition: VoiceAgentDefinition = {
    kind: "voice",
    model_type: "managed",
    model: "gpt-realtime",
    instructions: "Help customers with concise, spoken answers.",
    output_modalities: ["text", "audio"],
  };

  const created = await client.voiceAgents.createVoiceAgent(preview, agentName, definition);
  await client.voiceAgents.getVoiceAgent(preview, created.name);

  for await (const agent of client.voiceAgents.listVoiceAgents(preview)) {
    console.log(agent.name, agent.state);
  }
}

async function streamVoiceAgent(): Promise<void> {
  const client = new VoiceAgentsClient(endpoint, new DefaultAzureCredential());
  const agent = await client.voiceAgents.getVoiceAgent(preview, agentName);
  const connection = await client.streaming.connect(agent.name);

  try {
    await connection.configureSession({
      type: "realtime",
      output_modalities: ["text", "audio"],
      audio: { input: { format: { type: "audio/pcm", rate: 24_000 } } },
    });
    await connection.sendText("How can you help me?");

    for await (const event of connection) {
      switch (event.type) {
        case "response.output_text.delta":
        case "response.output_audio_transcript.delta":
          process.stdout.write(event.delta);
          break;
        case "response.output_audio.delta":
          playPcmAudio(event.delta);
          break;
        case "response.done":
          await connection.close();
          break;
      }
    }
  } finally {
    await connection.dispose();
  }
}

declare function playPcmAudio(audio: Uint8Array): void;

void manageVoiceAgent;
void streamVoiceAgent;
