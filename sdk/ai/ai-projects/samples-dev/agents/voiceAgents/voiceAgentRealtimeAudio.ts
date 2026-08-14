// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample sends raw PCM16 audio to a voice agent and saves streamed PCM audio output.
 *
 * @summary streams PCM audio input and audio/text output with a Foundry voice agent.
 *
 * @azsdk-weight 100
 */

import {
  AIProjectClient,
  isRestError,
  type Agent,
  type AgentDefinitionUnion,
  type VoiceAgentDefinition,
  type VoiceAgentServerVadTurnDetection,
  type VoiceAudioFormat,
} from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { once } from "node:events";
import { createReadStream, createWriteStream, type WriteStream } from "node:fs";
import { finished } from "node:stream/promises";
import "dotenv/config";

const projectEndpoint = getRequiredEnvironmentVariable("FOUNDRY_PROJECT_ENDPOINT");
const agentName = process.env["FOUNDRY_VOICE_AGENT_NAME"]?.trim() || `voice-audio-${Date.now()}`;
const modelName = process.env["FOUNDRY_VOICE_MODEL"]?.trim() || "gpt-realtime";
const audioInputPath = process.env["FOUNDRY_VOICE_AGENT_AUDIO_INPUT_FILE"]?.trim() || "./input.pcm";
const audioOutputPath =
  process.env["FOUNDRY_VOICE_AGENT_AUDIO_OUTPUT_FILE"]?.trim() || "./output.pcm";
const preview = "VoiceAgents=V1Preview" as const;
const pcmSampleRate = 24_000;
const pcmBytesPerSample = 2;
const inputChunkDurationInMs = 100;
const inputChunkSize = (pcmSampleRate * pcmBytesPerSample * inputChunkDurationInMs) / 1000;
const trailingSilenceDurationInMs = 1_000;

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const { created } = await getOrCreateVoiceAgent(project);
  const connection = await project.realtime.connect(agentName);
  const audioOutput = createWriteStream(audioOutputPath);
  let textCharacterCount = 0;
  let audioByteCount = 0;
  let inputComplete = false;

  try {
    // session.update merges into the existing session config; only the changed field needs to be sent.
    const pcmFormat: VoiceAudioFormat = { type: "audio/pcm", rate: pcmSampleRate };
    const turnDetection: VoiceAgentServerVadTurnDetection = {
      type: "server_vad",
      create_response: true,
      interrupt_response: true,
      silence_duration_ms: 500,
    };
    await connection.configureSession({
      type: "realtime",
      output_modalities: ["text", "audio"],
      audio: {
        input: {
          format: pcmFormat,
          turn_detection: turnDetection,
        },
        output: { format: pcmFormat },
      },
    });

    const consumeEvents = (async () => {
      for await (const event of connection) {
        switch (event.type) {
          case "response.output_audio.delta":
            audioByteCount += event.delta.byteLength;
            await writeAudio(audioOutput, event.delta);
            break;
          case "response.output_text.delta":
          case "response.output_audio_transcript.delta":
            textCharacterCount += event.delta.length;
            process.stdout.write(event.delta);
            break;
          case "error":
            throw new Error(`${event.error.code ?? "voice_agent_error"}: ${event.error.message}`);
          case "response.done":
            if (inputComplete) {
              await connection.close();
            }
            break;
        }
      }
    })();

    for await (const chunk of createReadStream(audioInputPath, { highWaterMark: inputChunkSize })) {
      await connection.sendAudio(chunk);
      await delay((chunk.byteLength / (pcmSampleRate * pcmBytesPerSample)) * 1000);
    }
    const silence = new Uint8Array(inputChunkSize);
    for (
      let durationInMs = 0;
      durationInMs < trailingSilenceDurationInMs;
      durationInMs += inputChunkDurationInMs
    ) {
      await connection.sendAudio(silence);
      await delay(inputChunkDurationInMs);
    }
    inputComplete = true;
    await consumeEvents;
    console.log(
      `\nCompleted with ${textCharacterCount} text character(s) and ${audioByteCount} audio byte(s).`,
    );
  } finally {
    audioOutput.end();
    try {
      await finished(audioOutput);
    } finally {
      await connection.dispose();
      if (created) {
        await project.agents.delete(agentName);
      }
    }
  }
}

async function writeAudio(output: WriteStream, audio: Uint8Array): Promise<void> {
  if (!output.write(audio)) {
    await once(output, "drain");
  }
}

function delay(durationInMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, durationInMs));
}

async function getOrCreateVoiceAgent(
  project: AIProjectClient,
): Promise<{ definition: VoiceAgentDefinition; created: boolean }> {
  try {
    return { definition: getVoiceDefinition(await project.agents.get(agentName)), created: false };
  } catch (error) {
    if (!isRestError(error) || error.statusCode !== 404) {
      throw error;
    }
  }

  const definition: VoiceAgentDefinition = {
    kind: "voice",
    model_type: "managed",
    model: modelName,
    instructions: "Listen carefully and answer the user's request.",
    output_modalities: ["text", "audio"],
  };
  const agent = await project.agents.create(agentName, definition, { foundryFeatures: preview });
  return { definition: getVoiceDefinition(agent), created: true };
}

function getVoiceDefinition(agent: Agent): VoiceAgentDefinition {
  const definition = agent.versions.latest.definition;
  if (!isVoiceAgentDefinition(definition)) {
    throw new Error(`Agent ${agent.name} is not a voice agent.`);
  }
  return definition;
}

function isVoiceAgentDefinition(
  definition: AgentDefinitionUnion,
): definition is VoiceAgentDefinition {
  return (
    definition.kind === "voice" &&
    "model_type" in definition &&
    (definition.model_type === "managed" || definition.model_type === "self_deployed") &&
    "model" in definition &&
    typeof definition.model === "string"
  );
}

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Set ${name} before running this sample.`);
  }
  return value;
}

main().catch((error) => {
  console.error("The sample encountered an error:", error);
  process.exitCode = 1;
});
