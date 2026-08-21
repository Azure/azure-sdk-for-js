// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample sends text to a voice agent, streams text/audio output, and handles a local function.
 *
 * @summary streams text and local function calls with a Foundry voice agent.
 */

import {
  AIProjectClient,
  isRestError,
  type Agent,
  type AgentDefinitionUnion,
  type VoiceAgentDefinition,
} from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { once } from "node:events";
import { createWriteStream, type WriteStream } from "node:fs";
import { finished } from "node:stream/promises";
import "dotenv/config";

const projectEndpoint = getRequiredEnvironmentVariable("FOUNDRY_PROJECT_ENDPOINT");
const agentName = process.env["FOUNDRY_VOICE_AGENT_NAME"]?.trim() || `voice-text-${Date.now()}`;
const modelName = process.env["FOUNDRY_VOICE_MODEL"]?.trim() || "gpt-realtime";
const audioOutputPath =
  process.env["FOUNDRY_VOICE_AGENT_AUDIO_OUTPUT_FILE"]?.trim() || "voice-agent-output.pcm";
const preview = "VoiceAgents=V1Preview" as const;
const pcmSampleRate = 24_000;

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const { definition, created } = await getOrCreateVoiceAgent(project);
  const connection = await project.realtime.connect(agentName);
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
          ...definition.audio?.output,
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
          await connection.sendToolOutput(
            event.call_id,
            JSON.stringify({ city: args.city, temperature: 62, unit: "F" }),
            { createResponse: false },
          );
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
      if (created) {
        await project.agents.delete(agentName);
      }
    }
  }
}

function parseWeatherToolArguments(value: string): { city: string } {
  const argumentsValue: unknown = JSON.parse(value);
  if (
    typeof argumentsValue !== "object" ||
    argumentsValue === null ||
    !("city" in argumentsValue) ||
    typeof argumentsValue.city !== "string" ||
    !argumentsValue.city.trim()
  ) {
    throw new Error('The get_weather tool requires a non-empty string "city" argument.');
  }
  return { city: argumentsValue.city.trim() };
}

async function writeAudio(output: WriteStream, audio: Uint8Array): Promise<void> {
  if (!output.write(audio)) {
    await once(output, "drain");
  }
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
    instructions: "You are a helpful voice assistant. Use tools when appropriate.",
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
