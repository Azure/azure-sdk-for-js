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
  type VoiceAgentTurnDetectionConfigUnion,
  type RealtimeAudioFormatsUnion,
  type VoiceAgentServerEvent,
} from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { once } from "node:events";
import { createReadStream, createWriteStream, type WriteStream } from "node:fs";
import { finished } from "node:stream/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";

const projectEndpoint = getRequiredEnvironmentVariable("FOUNDRY_PROJECT_ENDPOINT");
const agentName = process.env["FOUNDRY_VOICE_AGENT_NAME"]?.trim() || `voice-audio-${Date.now()}`;
const modelName = process.env["FOUNDRY_VOICE_MODEL"]?.trim() || "gpt-realtime";
// The input file must contain raw PCM16 24kHz mono audio with real, audible speech.
// Silence or non-speech noise will never trigger server-side turn detection, and the
// service will eventually drop the connection (observed as a 1006 abnormal close).
// Defaults to the checked-in sample fixture (a few seconds of synthesized speech) so this
// sample also runs unattended, e.g. in the live-test pipeline's `execute:samples` step.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultAudioInputPath = path.join(__dirname, "assets/input.pcm");
const audioInputPath =
  process.env["FOUNDRY_VOICE_AGENT_AUDIO_INPUT_FILE"]?.trim() || defaultAudioInputPath;
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
  const { definition, created } = await getOrCreateVoiceAgent(project);

  try {
    const connection = await project.realtime.connect(agentName);
    const audioOutput = createWriteStream(audioOutputPath);
    let textCharacterCount = 0;
    let inputAudioByteCount = 0;
    let outputAudioByteCount = 0;
    let inputComplete = false;
    let responseComplete = false;

    try {
      // session.update merges into the existing session config; only the changed field needs to be sent.
      const pcmFormat: RealtimeAudioFormatsUnion = { type: "audio/pcm", rate: pcmSampleRate };
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

      const consumeEvents = (async () => {
        for await (const event of connection) {
          console.log(`[event] ${event.type}${describeEvent(event)}`);
          switch (event.type) {
            case "response.output_audio.delta":
              outputAudioByteCount += event.delta.byteLength;
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
              // The response can finish before all input has been sent; remember it happened so the
              // pending completion isn't dropped once inputComplete flips below.
              responseComplete = true;
              if (inputComplete) {
                await connection.close();
              }
              break;
          }
        }
      })();

      for await (const chunk of createReadStream(audioInputPath, {
        highWaterMark: inputChunkSize,
      })) {
        await connection.sendAudio(chunk);
        inputAudioByteCount += chunk.byteLength;
        await delay((chunk.byteLength / (pcmSampleRate * pcmBytesPerSample)) * 1000);
      }
      const silence = new Uint8Array(inputChunkSize);
      for (
        let durationInMs = 0;
        durationInMs < trailingSilenceDurationInMs;
        durationInMs += inputChunkDurationInMs
      ) {
        await connection.sendAudio(silence);
        inputAudioByteCount += silence.byteLength;
        await delay(inputChunkDurationInMs);
      }
      inputComplete = true;
      if (responseComplete) {
        await connection.close();
      }
      await consumeEvents;
      const totalAudioByteCount = inputAudioByteCount + outputAudioByteCount;
      console.log(`\nCompleted with ${textCharacterCount} text character(s).`);
      console.log(
        `Audio format: PCM16, ${pcmSampleRate} Hz, mono (${pcmBytesPerSample} bytes/sample).`,
      );
      console.log(
        `Input audio:  ${inputAudioByteCount} bytes (${formatBytes(inputAudioByteCount)}), ` +
          `${formatDuration(inputAudioByteCount)}`,
      );
      console.log(
        `Output audio: ${outputAudioByteCount} bytes (${formatBytes(outputAudioByteCount)}), ` +
          `${formatDuration(outputAudioByteCount)}`,
      );
      console.log(
        `Total audio:  ${totalAudioByteCount} bytes (${formatBytes(totalAudioByteCount)})`,
      );
    } finally {
      audioOutput.end();
      try {
        await finished(audioOutput);
      } finally {
        await connection.dispose();
      }
    }
  } finally {
    if (created) {
      await project.agents.delete(agentName);
    }
  }
}

async function writeAudio(output: WriteStream, audio: Uint8Array): Promise<void> {
  if (!output.write(audio)) {
    await once(output, "drain");
  }
}

/** Summarizes a server event with a short, useful detail for the event log. */
function describeEvent(event: VoiceAgentServerEvent): string {
  switch (event.type) {
    case "response.output_audio.delta":
      return ` (${event.delta.byteLength} bytes)`;
    case "response.output_text.delta":
    case "response.output_audio_transcript.delta":
      return ` (${event.delta.length} chars)`;
    case "input_audio_buffer.speech_started":
      return ` (audio_start_ms=${event.audio_start_ms})`;
    case "input_audio_buffer.speech_stopped":
      return ` (audio_end_ms=${event.audio_end_ms})`;
    case "response.output_item.added":
      return ` (item type=${event.item.type})`;
    case "response.done":
      return ` (status=${event.response.status})`;
    case "error":
      return ` (${event.error.code ?? "unknown"}: ${event.error.message})`;
    default:
      return "";
  }
}

const bytesPerKiB = 1024;
const bytesPerMiB = bytesPerKiB * 1024;

/** Formats a byte count as a human-readable size (bytes, KB, or MB). */
function formatBytes(byteCount: number): string {
  if (byteCount >= bytesPerMiB) {
    return `${(byteCount / bytesPerMiB).toFixed(2)} MB`;
  }
  if (byteCount >= bytesPerKiB) {
    return `${(byteCount / bytesPerKiB).toFixed(2)} KB`;
  }
  return `${byteCount} B`;
}

/** Computes and formats the audio duration implied by a PCM16 mono byte count at pcmSampleRate. */
function formatDuration(byteCount: number): string {
  const seconds = byteCount / (pcmSampleRate * pcmBytesPerSample);
  return `${seconds.toFixed(2)}s of audio`;
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

function withTurnDetectionOverrides(
  turnDetection: VoiceAgentTurnDetectionConfigUnion | undefined,
): VoiceAgentTurnDetectionConfigUnion {
  // Turn-detection type is a session default set when the agent was configured and cannot change
  // at connect time, so the agent's own type and fields are preserved here; only this sample's
  // chosen overrides are layered on top.
  if (!turnDetection) {
    return {
      type: "server_vad",
      create_response: true,
      interrupt_response: true,
      silence_duration_ms: 500,
    };
  }
  if (turnDetection.type === "semantic_vad") {
    // Unlike every other turn-detection type, `semantic_vad` has no `silence_duration_ms` field.
    return { ...turnDetection, create_response: true, interrupt_response: true };
  }
  return {
    ...turnDetection,
    create_response: true,
    interrupt_response: true,
    silence_duration_ms: 500,
  };
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
