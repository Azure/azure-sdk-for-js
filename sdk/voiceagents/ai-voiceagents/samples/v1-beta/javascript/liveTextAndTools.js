// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample retrieves or creates a voice agent, sends text, streams text/audio output,
 * handles a function call, and gracefully closes the connection.
 *
 * @summary streams text and function calls with a live voice agent.
 */

import { VoiceAgentsClient, isRestError } from "@azure/ai-voiceagents";
import { DefaultAzureCredential } from "@azure/identity";
import { once } from "node:events";
import { createWriteStream } from "node:fs";
import { finished } from "node:stream/promises";
import "dotenv/config";

const projectEndpoint = getRequiredEnvironmentVariable("AZURE_VOICE_AGENTS_ENDPOINT");
const agentName = getRequiredEnvironmentVariable("AZURE_VOICE_AGENTS_AGENT_NAME");
const modelName = process.env["AZURE_VOICE_AGENTS_MODEL"] ?? "gpt-realtime";
const audioOutputPath =
  process.env["AZURE_VOICE_AGENTS_AUDIO_OUTPUT_FILE"] ?? "voice-agent-output.pcm";
const preview = "VoiceAgents=V1Preview";

function parseWeatherToolArguments(value) {
  const argumentsValue = JSON.parse(value);
  if (
    typeof argumentsValue !== "object" ||
    argumentsValue === null ||
    typeof argumentsValue.city !== "string" ||
    !argumentsValue.city.trim()
  ) {
    throw new Error('The get_weather tool requires a non-empty string "city" argument.');
  }
  return { city: argumentsValue.city.trim() };
}
const pcmSampleRate = 24_000;

function getRequiredEnvironmentVariable(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Set ${name} before running this sample.`);
  }
  return value;
}

export async function main() {
  const credential = new DefaultAzureCredential();
  const client = new VoiceAgentsClient(projectEndpoint, credential);
  const agentDefinition = await getOrCreateAgent(client);

  const connection = await client.streaming.connect(agentName);
  const audioOutput = createWriteStream(audioOutputPath);
  let pendingToolOutputs = 0;
  let toolCallCount = 0;
  let textCharacterCount = 0;
  let audioByteCount = 0;

  try {
    await connection.configureSession({
      type: "realtime",
      output_modalities: ["text", "audio"],
      audio: {
        output: {
          ...agentDefinition.audio?.output,
          format: { type: "audio/pcm", rate: pcmSampleRate },
        },
      },
      tools: [
        {
          type: "function",
          name: "get_weather",
          description: "Get the current weather for a city.",
          parameters: {
            type: "object",
            properties: { city: { type: "string" } },
            required: ["city"],
          },
        },
      ],
    });

    await connection.sendText("What is the weather in Seattle? Use the weather tool.");

    for await (const event of connection) {
      switch (event.type) {
        case "response.output_text.delta":
        case "response.output_audio_transcript.delta":
          textCharacterCount += event.delta.length;
          process.stdout.write(event.delta);
          break;
        case "response.output_audio.delta":
          audioByteCount += event.delta.byteLength;
          await writeAudio(audioOutput, event.delta);
          break;
        case "response.function_call_arguments.done": {
          toolCallCount++;
          pendingToolOutputs++;
          const args = parseWeatherToolArguments(event.arguments);
          const result = { city: args.city, temperature: 62, unit: "F" };
          await connection.sendToolOutput(event.call_id, JSON.stringify(result), {
            createResponse: false,
          });
          break;
        }
        case "error":
          throw new Error(`${event.error.code ?? "voice_agent_error"}: ${event.error.message}`);
        case "response.done":
          if (pendingToolOutputs > 0) {
            pendingToolOutputs = 0;
            await connection.requestResponse();
          } else {
            await connection.close();
          }
          break;
      }
    }
    console.log(
      `\nCompleted with ${toolCallCount} tool call(s), ${textCharacterCount} text character(s), and ${audioByteCount} audio byte(s).`,
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

async function writeAudio(output, audio) {
  if (!output.write(audio)) {
    await once(output, "drain");
  }
}

async function getOrCreateAgent(client) {
  try {
    const agent = await client.voiceAgents.getVoiceAgent(preview, agentName);
    return agent.versions.latest.definition;
  } catch (error) {
    if (!isRestError(error) || error.statusCode !== 404) {
      throw error;
    }
    const agent = await client.voiceAgents.createVoiceAgent(preview, agentName, {
      kind: "voice",
      model_type: "managed",
      model: modelName,
      instructions: "You are a helpful voice assistant. Use tools when appropriate.",
      output_modalities: ["text", "audio"],
    });
    return agent.versions.latest.definition;
  }
}

main().catch((error) => {
  console.error("The sample encountered an error:", error);
  process.exitCode = 1;
});
