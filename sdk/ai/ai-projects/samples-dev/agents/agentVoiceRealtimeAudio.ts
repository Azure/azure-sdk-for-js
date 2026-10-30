// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Send PCM speech to a Realtime voice agent and save its audio reply.
 * @azsdk-weight 100
 */

import {
  AIProjectClient,
  isRestError,
  type Agent,
  type AgentDefinitionUnion,
  type VoiceAgentDefinition,
  type VoiceAgentTurnDetectionConfigUnion,
} from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { delay } from "@azure/core-util";
import { open, readFile } from "node:fs/promises";
import "dotenv/config";

export async function main(): Promise<void> {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"]?.trim();
  if (!projectEndpoint) throw new Error("Set FOUNDRY_PROJECT_ENDPOINT.");
  const agentName = process.env["FOUNDRY_VOICE_AGENT_NAME"]?.trim() || `voice-audio-${Date.now()}`;
  const modelName = process.env["FOUNDRY_VOICE_MODEL"]?.trim() || "gpt-realtime";
  const inputPath =
    process.env["FOUNDRY_VOICE_AGENT_AUDIO_INPUT_FILE"]?.trim() ||
    new URL("./assets/input.pcm", import.meta.url);
  const outputPath = process.env["FOUNDRY_VOICE_AGENT_AUDIO_OUTPUT_FILE"]?.trim() || "./output.pcm";
  // Use a short recording of speech: raw PCM16LE, mono, 24 kHz (not a WAV file).
  const input = await readFile(inputPath);
  if (
    !input.length ||
    input.length % 2 ||
    ["RIFF", "RIFX"].includes(input.toString("ascii", 0, 4))
  ) {
    throw new Error("Input must be raw mono PCM16LE at 24 kHz, not a WAV container.");
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const { agent, created } = await getOrCreateVoiceAgent(project, agentName, modelName);

  try {
    const definition = agent.versions.latest.definition;
    if (!isVoiceAgentDefinition(definition)) {
      throw new Error(`Agent ${agentName} is not a model-backed Realtime voice agent.`);
    }
    const output = await open(outputPath, "w");
    try {
      const connection = await project.beta.voiceAgents.realtime.connect(agentName, {
        store: false,
      });
      let receiveEvents: Promise<void> | undefined;
      let sendAudio: Promise<void> | undefined;
      let stopSending = false;
      try {
        const pcmFormat = { type: "audio/pcm", rate: 24000 } as const;
        await connection.configureSession({
          type: "realtime",
          output_modalities: ["text", "audio"],
          audio: {
            input: {
              format: pcmFormat,
              turn_detection: withTurnDetectionOverrides(definition.audio?.input?.turn_detection),
            },
            output: { format: pcmFormat },
          },
        });

        let inputComplete = false;
        let inputCommitted = false;
        let responseId: string | undefined;
        let responseComplete = false;
        receiveEvents = (async () => {
          for await (const event of connection) {
            switch (event.type) {
              case "input_audio_buffer.committed":
                inputCommitted = true;
                break;
              case "response.created":
                // Ignore any startup greeting; wait for a response to our committed speech.
                if (inputCommitted) responseId = event.response.id;
                break;
              case "response.output_audio.delta":
                if (event.response_id === responseId) await output.writeFile(event.delta);
                break;
              case "response.output_text.delta":
              case "response.output_audio_transcript.delta":
                if (event.response_id === responseId) process.stdout.write(event.delta);
                break;
              case "error":
                throw new Error(`Voice Agent error ${event.error.code}: ${event.error.message}`);
              case "response.done":
                if (event.response.id !== responseId) break;
                if (event.response.status !== "completed") {
                  throw new Error(`Voice response ${event.response.status ?? "unknown"}.`);
                }
                responseComplete = true;
                if (inputComplete) await connection.close();
                break;
            }
          }
          if (!responseComplete) {
            throw new Error("The connection closed before the reply completed.");
          }
        })();

        console.log("Sending speech and saving the reply...");
        sendAudio = (async () => {
          // 4800 bytes of PCM16 audio at 24 kHz is 100 ms.
          for (let offset = 0; offset < input.length && !stopSending; offset += 4800) {
            const chunk = input.subarray(offset, offset + 4800);
            await connection.sendAudio(chunk);
            await delay(chunk.length / 48);
          }
          // A second of silence lets the agent's voice activity detection finish the turn.
          const silence = new Uint8Array(4800);
          for (let chunk = 0; chunk < 10 && !stopSending; chunk++) {
            await connection.sendAudio(silence);
            await delay(100);
          }
          inputComplete = true;
          if (responseComplete) await connection.close();
        })();
        await Promise.all([receiveEvents, sendAudio]);
        console.log(`\nSaved the reply to ${outputPath} (PCM16LE, mono, 24 kHz; not played).`);
      } finally {
        stopSending = true;
        try {
          await connection.close();
        } finally {
          await Promise.allSettled([receiveEvents, sendAudio]);
        }
      }
    } finally {
      await output.close();
    }
  } finally {
    // Never delete an agent that already existed.
    if (created) await project.agents.delete(agentName);
  }
}

async function getOrCreateVoiceAgent(
  project: AIProjectClient,
  agentName: string,
  modelName: string,
): Promise<{ agent: Agent; created: boolean }> {
  try {
    return { agent: await project.agents.get(agentName), created: false };
  } catch (error) {
    if (!isRestError(error) || error.statusCode !== 404) throw error;
  }
  const agent = await project.agents.create(
    agentName,
    {
      kind: "voice",
      model_type: "managed",
      model: modelName,
      instructions: "Listen carefully and answer the user's request.",
      output_modalities: ["text", "audio"],
      store: false,
    },
    { foundryFeatures: "VoiceAgents=V1Preview" },
  );
  return { agent, created: true };
}

function isVoiceAgentDefinition(
  definition: AgentDefinitionUnion,
): definition is VoiceAgentDefinition {
  return (
    definition.kind === "voice" &&
    "model_type" in definition &&
    (definition.model_type === "managed" || definition.model_type === "self_deployed") &&
    "model" in definition &&
    typeof definition.model === "string" &&
    (!("sub_protocol" in definition) || definition.sub_protocol !== "live")
  );
}

function withTurnDetectionOverrides(
  turnDetection: VoiceAgentTurnDetectionConfigUnion = { type: "server_vad" },
): VoiceAgentTurnDetectionConfigUnion {
  // Preserve the agent's VAD type. semantic_vad does not support silence_duration_ms.
  const overrides = { create_response: true, interrupt_response: true };
  return turnDetection.type === "semantic_vad"
    ? { ...turnDetection, ...overrides }
    : { ...turnDetection, ...overrides, silence_duration_ms: 500 };
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
