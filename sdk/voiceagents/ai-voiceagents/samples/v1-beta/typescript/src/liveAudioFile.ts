// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample retrieves or creates a voice agent, sends a raw PCM16 audio file,
 * and streams the agent's PCM audio and text transcript to disk and stdout.
 *
 * @summary streams audio-file input and audio/text output with a live voice agent.
 */

import { VoiceAgentsClient, isRestError, type VoiceAgentDefinition } from "@azure/ai-voiceagents";
import { DefaultAzureCredential } from "@azure/identity";
import { once } from "node:events";
import { createReadStream, createWriteStream, type WriteStream } from "node:fs";
import { finished } from "node:stream/promises";
import "dotenv/config";

const projectEndpoint = getRequiredEnvironmentVariable("AZURE_VOICE_AGENTS_ENDPOINT");
const agentName = getRequiredEnvironmentVariable("AZURE_VOICE_AGENTS_AGENT_NAME");
const modelName = process.env["AZURE_VOICE_AGENTS_MODEL"] ?? "gpt-realtime";
const audioInputPath = process.env["AZURE_VOICE_AGENTS_AUDIO_INPUT_FILE"] ?? "./input.pcm";
const audioOutputPath = process.env["AZURE_VOICE_AGENTS_AUDIO_OUTPUT_FILE"] ?? "./output.pcm";
const preview = "VoiceAgents=V1Preview" as const;
const pcmSampleRate = 24_000;
const pcmBytesPerSample = 2;
const inputChunkDurationInMs = 100;
const inputChunkSize = (pcmSampleRate * pcmBytesPerSample * inputChunkDurationInMs) / 1000;
const trailingSilenceDurationInMs = 1000;

function getRequiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Set ${name} before running this sample.`);
  }
  return value;
}

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new VoiceAgentsClient(projectEndpoint, credential);
  const agentDefinition = await getOrCreateAgent(client);

  const connection = await client.streaming.connect(agentName);
  const audioOutput = createWriteStream(audioOutputPath);
  let textCharacterCount = 0;
  let audioByteCount = 0;
  let inputComplete = false;

  try {
    await connection.configureSession({
      type: "realtime",
      output_modalities: ["text", "audio"],
      audio: {
        input: {
          format: { type: "audio/pcm", rate: pcmSampleRate },
          turn_detection: {
            type: "server_vad",
            create_response: true,
            interrupt_response: true,
            silenceDurationInMs: 500,
          },
        },
        output: {
          ...agentDefinition.audio?.output,
          format: { type: "audio/pcm", rate: pcmSampleRate },
        },
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

async function getOrCreateAgent(client: VoiceAgentsClient): Promise<VoiceAgentDefinition> {
  try {
    const agent = await client.voiceAgents.getVoiceAgent(preview, agentName);
    return agent.versions.latest.definition;
  } catch (error) {
    if (!isRestError(error) || error.statusCode !== 404) {
      throw error;
    }
    const definition: VoiceAgentDefinition = {
      kind: "voice",
      model_type: "managed",
      model: modelName,
      instructions: "Listen carefully and answer the user's request.",
      output_modalities: ["text", "audio"],
    };
    const agent = await client.voiceAgents.createVoiceAgent(preview, agentName, definition);
    return agent.versions.latest.definition;
  }
}

main().catch((error) => {
  console.error("The sample encountered an error:", error);
  process.exitCode = 1;
});
