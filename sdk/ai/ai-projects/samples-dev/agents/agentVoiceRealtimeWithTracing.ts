// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Trace a generated Voice Agent's text/audio response and local tool exchange.
 * @azsdk-weight 50
 */

import { provider, context, trace } from "./consoleTracingSetup.js";
import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  if (!endpoint) throw new Error("Set FOUNDRY_PROJECT_ENDPOINT.");
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential(), {
    tracingOptions: { experimental: true, contentRecording: false },
  });
  const parent = trace.getTracer("voice-tracing-sample").startSpan("voice conversation");
  try {
    await context.with(trace.setSpan(context.active(), parent), async () => {
      const agent = await project.beta.agents.createFromPrompt({
        kind: "voice",
        name: `voice-tracing-${Date.now()}`,
        goal: "Answer briefly. Use the get_current_time function when asked for the time.",
      });
      try {
        const connection = await project.beta.voiceAgents.realtime.connect(agent.name);
        try {
          await connection.configureSession({
            type: "realtime",
            output_modalities: ["text", "audio"],
            tools: [
              {
                type: "function",
                name: "get_current_time",
                parameters: { type: "object", properties: {} },
              },
            ],
          });
          await connection.sendText("What time is it? Please call get_current_time.");
          let toolOutputSent = false;
          let receivedAudioBytes = 0;
          for await (const event of connection) {
            if (event.type === "response.output_audio.delta") {
              receivedAudioBytes += event.delta.byteLength;
            } else if (event.type === "response.function_call_arguments.done") {
              if (event.name !== "get_current_time") throw new Error("Unexpected tool request.");
              // This is application tool execution, not a span owned by the Voice Agents SDK.
              await connection.sendToolOutput(
                event.call_id,
                JSON.stringify({ time: new Date().toISOString() }),
                { createResponse: false },
              );
              toolOutputSent = true;
            } else if (event.type === "error") {
              throw new Error("The Voice Agent reported a service error.");
            } else if (event.type === "response.done") {
              if (event.response.status === "failed") throw new Error("The response failed.");
              if (toolOutputSent) {
                toolOutputSent = false;
                await connection.requestResponse();
              } else {
                console.log(`Response finished; received ${receivedAudioBytes} audio bytes.`);
                break;
              }
            }
          }
        } finally {
          await connection.close();
        }
      } finally {
        await project.agents.delete(agent.name, {
          requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
        });
      }
    });
  } finally {
    parent.end();
    await provider.shutdown();
  }
}

main().catch((error) => {
  console.error("Sample failed:", error);
});
