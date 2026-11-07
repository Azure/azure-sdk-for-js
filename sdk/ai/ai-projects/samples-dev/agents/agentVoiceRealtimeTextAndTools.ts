// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Send text to a Realtime voice agent, handle a weather tool, and save its audio reply.
 * @azsdk-weight 100
 */

import { AIProjectClient, isRestError } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { randomUUID } from "node:crypto";
import { open } from "node:fs/promises";
import "dotenv/config";

export async function main(): Promise<void> {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"]?.trim();
  if (!projectEndpoint) throw new Error("Set FOUNDRY_PROJECT_ENDPOINT.");
  const agentName = process.env["FOUNDRY_VOICE_AGENT_NAME"]?.trim() || `voice-text-${Date.now()}`;
  const modelName = process.env["FOUNDRY_VOICE_MODEL"]?.trim() || "gpt-realtime";
  const outputPath =
    process.env["FOUNDRY_VOICE_AGENT_AUDIO_OUTPUT_FILE"]?.trim() || "voice-agent-output.pcm";
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const created = await getOrCreateVoiceAgent(project, agentName, modelName);

  try {
    const output = await open(outputPath, "w");
    try {
      const connection = await project.beta.voiceAgents.realtime.connect(agentName, {
        store: false,
      });
      try {
        await connection.configureSession({
          type: "realtime",
          output_modalities: ["text", "audio"],
          audio: { output: { format: { type: "audio/pcm", rate: 24000 } } },
          tools: [
            {
              type: "function",
              name: "get_weather",
              description: "Get the current weather for a city.",
              parameters: {
                type: "object",
                properties: { city: { type: "string" } },
                required: ["city"],
                additionalProperties: false,
              },
            },
          ],
        });

        // Tag our responses so an existing agent's startup greeting is not mistaken for this turn.
        const turnId = randomUUID();
        const response = { metadata: { additionalProperties: { sample_turn: turnId } } };
        let responseId: string | undefined;
        let needsResponse = false;
        let completed = false;
        const handledCalls = new Set<string>();

        console.log("Asking about the weather in Seattle...");
        await connection.sendText("What is the weather in Seattle? Use get_weather.", {
          createResponse: false,
        });
        await connection.requestResponse({ response });

        for await (const event of connection) {
          if (event.type === "error") {
            throw new Error(`Voice Agent error ${event.error.code}: ${event.error.message}`);
          }
          if (event.type === "response.created") {
            if (event.response.metadata?.additionalProperties?.["sample_turn"] === turnId) {
              responseId = event.response.id;
            }
          } else if (event.type === "response.done" && event.response.id === responseId) {
            if (event.response.status !== "completed") {
              throw new Error(`Voice response ${event.response.status ?? "unknown"}.`);
            }
            if (needsResponse) {
              needsResponse = false;
              responseId = undefined;
              await connection.requestResponse({ response });
            } else {
              completed = true;
              break;
            }
          } else if ("response_id" in event && event.response_id === responseId) {
            switch (event.type) {
              case "response.output_text.delta":
              case "response.output_audio_transcript.delta":
                process.stdout.write(event.delta);
                break;
              case "response.output_audio.delta":
                await output.writeFile(event.delta);
                break;
              case "response.function_call_arguments.done": {
                if (event.name !== "get_weather" || !event.call_id) {
                  throw new Error("Unexpected function call.");
                }
                const city = parseCity(event.arguments);
                if (handledCalls.has(event.call_id)) break;
                handledCalls.add(event.call_id);
                console.log(`\nReturning sample weather data for ${city}.`);
                // Replace this fixed result with a call to your weather service.
                await connection.sendToolOutput(
                  event.call_id,
                  JSON.stringify({ city, temperature: 62, unit: "F" }),
                  { createResponse: false },
                );
                // Wait for this response to finish before asking the agent to use the result.
                needsResponse = true;
                break;
              }
            }
          }
        }
        if (!completed) throw new Error("The connection closed before the reply completed.");
        console.log(`\nSaved the reply to ${outputPath} (PCM16LE, mono, 24 kHz; not played).`);
      } finally {
        await connection.close();
      }
    } finally {
      await output.close();
    }
  } finally {
    // Never delete an agent that already existed.
    if (created) {
      await project.agents.delete(agentName, {
        requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
      });
    }
  }
}

function parseCity(value: string): string {
  const args: unknown = JSON.parse(value);
  if (
    typeof args !== "object" ||
    args === null ||
    Array.isArray(args) ||
    !("city" in args) ||
    typeof args.city !== "string" ||
    !args.city.trim()
  ) {
    throw new Error('get_weather requires a non-empty string "city" argument.');
  }
  return args.city.trim();
}

async function getOrCreateVoiceAgent(
  project: AIProjectClient,
  agentName: string,
  modelName: string,
): Promise<boolean> {
  try {
    const agent = await project.agents.get(agentName, {
      requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
    });
    const definition = agent.versions.latest.definition;
    if (
      definition.kind !== "voice" ||
      ("sub_protocol" in definition && definition.sub_protocol === "live")
    ) {
      throw new Error(`Agent ${agentName} is not a Realtime voice agent.`);
    }
    return false;
  } catch (error) {
    if (!isRestError(error) || error.statusCode !== 404) throw error;
  }

  await project.agents.create(
    agentName,
    {
      kind: "voice",
      model_type: "managed",
      model: modelName,
      instructions: "You are a helpful voice assistant. Use tools when appropriate.",
      output_modalities: ["text", "audio"],
      store: false,
    },
    { foundryFeatures: "VoiceAgents=V1Preview" },
  );
  return true;
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
