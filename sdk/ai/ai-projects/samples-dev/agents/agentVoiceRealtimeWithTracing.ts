// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Trace a generated Voice Agent's text/audio response and local tool exchange.
 * @azsdk-weight 50
 */

import { context, trace } from "@opentelemetry/api";
import {
  NodeTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import { randomUUID } from "node:crypto";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  if (!endpoint) throw new Error("Set FOUNDRY_PROJECT_ENDPOINT.");
  const provider = new NodeTracerProvider({
    spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
  });
  provider.register();
  const unregister = registerInstrumentations({
    instrumentations: [createAzureSdkInstrumentation()],
  });
  const { AIProjectClient } = await import("@azure/ai-projects");
  const { DefaultAzureCredential } = await import("@azure/identity");
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
          const turnId = randomUUID();
          const response = { metadata: { additionalProperties: { sample_turn: turnId } } };
          let responseId: string | undefined;
          let callId: string | undefined;
          let toolOutput: string | undefined;
          let toolAcknowledged = false;
          let continueResponse = false;
          let completed = false;
          let audioBytes = 0;
          let responseAudioBytes = 0;
          let responseText = "";
          const timeout = setTimeout(() => void connection.close(), 90_000);
          try {
            await connection.sendText("What time is it? Please call get_current_time.", {
              createResponse: false,
            });
            await connection.requestResponse({ response });
            for await (const event of connection) {
              if (event.type === "error") {
                throw new Error(`Voice Agent error ${event.error.code}: ${event.error.message}`);
              }
              if (
                event.type === "response.created" &&
                event.response.metadata?.additionalProperties?.["sample_turn"] === turnId
              ) {
                responseId = event.response.id;
                responseText = "";
                responseAudioBytes = 0;
              }
              if (
                event.type === "conversation.item.created" &&
                event.item.type === "function_call_output" &&
                "call_id" in event.item &&
                callId &&
                event.item.call_id === callId
              ) {
                if (!("output" in event.item) || event.item.output !== toolOutput) {
                  throw new Error("The service acknowledged a different function result.");
                }
                toolAcknowledged = true;
              } else if (
                (event.type === "response.output_text.delta" ||
                  event.type === "response.output_audio_transcript.delta") &&
                event.response_id === responseId
              ) {
                responseText += event.delta;
                process.stdout.write(event.delta);
              } else if (
                event.type === "response.output_audio.delta" &&
                event.response_id === responseId
              ) {
                audioBytes += event.delta.byteLength;
                responseAudioBytes += event.delta.byteLength;
              } else if (
                event.type === "response.function_call_arguments.done" &&
                event.response_id === responseId
              ) {
                const args: unknown = JSON.parse(event.arguments);
                if (
                  event.name !== "get_current_time" ||
                  !event.call_id ||
                  callId ||
                  !args ||
                  typeof args !== "object" ||
                  Array.isArray(args) ||
                  Object.keys(args).length
                ) {
                  throw new Error("Unexpected or malformed get_current_time request.");
                }
                callId = event.call_id;
                toolOutput = JSON.stringify({ time: new Date().toISOString() });
                await connection.sendToolOutput(callId, toolOutput, { createResponse: false });
                continueResponse = true;
              } else if (
                event.type === "response.done" &&
                responseId &&
                event.response.id === responseId
              ) {
                if (event.response.status !== "completed") {
                  throw new Error(
                    `Requested voice response ${event.response.status ?? "unknown"}.`,
                  );
                }
                if (continueResponse) {
                  continueResponse = false;
                  await connection.requestResponse({ response });
                } else {
                  if (!callId || !toolAcknowledged || !responseText.trim() || !responseAudioBytes) {
                    throw new Error(
                      "The requested tool exchange and spoken response did not finish.",
                    );
                  }
                  completed = true;
                  break;
                }
              }
            }
            if (!completed) throw new Error("The requested voice response did not complete.");
            console.log(`\nRequested response finished; received ${audioBytes} audio bytes.`);
          } finally {
            clearTimeout(timeout);
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
    try {
      await provider.shutdown();
    } finally {
      unregister();
    }
  }
}

main().catch((error) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
