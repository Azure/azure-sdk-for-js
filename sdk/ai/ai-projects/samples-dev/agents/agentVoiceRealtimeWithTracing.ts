// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Send a question to a Realtime voice agent and print its SDK traces.
 * @azsdk-weight 50
 */

import {
  NodeTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import "dotenv/config";

export async function main(): Promise<void> {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"]?.trim();
  if (!projectEndpoint) throw new Error("Set FOUNDRY_PROJECT_ENDPOINT.");
  const provider = new NodeTracerProvider({
    spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
  });
  provider.register();
  const unregister = registerInstrumentations({
    instrumentations: [createAzureSdkInstrumentation()],
  });
  try {
    // Load the clients after registering instrumentation. Do not record conversation content.
    const { AIProjectClient } = await import("@azure/ai-projects");
    const { DefaultAzureCredential } = await import("@azure/identity");
    const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential(), {
      tracingOptions: { experimental: true, contentRecording: false },
    });
    // Omit a greeting so the agent only responds to the question below.
    const agent = await project.agents.create(
      `voice-tracing-${Date.now()}`,
      {
        kind: "voice",
        model_type: "managed",
        model: "gpt-realtime",
        instructions: "Answer questions in one short sentence.",
        output_modalities: ["text", "audio"],
        store: false,
      },
      { foundryFeatures: "VoiceAgents=V1Preview" },
    );
    try {
      const connection = await project.beta.voiceAgents.realtime.connect(agent.name);
      const timeout = setTimeout(() => void connection.close(), 90_000);
      try {
        console.log("Asking a question. SDK traces will be printed to the console.");
        await connection.sendText("What is the capital of France?");
        for await (const event of connection) {
          if (
            event.type === "response.output_text.delta" ||
            event.type === "response.output_audio_transcript.delta"
          ) {
            process.stdout.write(event.delta);
          } else if (event.type === "error") {
            throw new Error(`Voice Agent error ${event.error.code}: ${event.error.message}`);
          } else if (event.type === "response.done") {
            if (event.response.status !== "completed") {
              throw new Error(`Voice response ${event.response.status ?? "unknown"}.`);
            }
            process.stdout.write("\n");
            return;
          }
        }
        throw new Error("The connection closed before the reply completed.");
      } finally {
        clearTimeout(timeout);
        await connection.close();
      }
    } finally {
      await project.agents.delete(agent.name, {
        requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
      });
    }
  } finally {
    try {
      await provider.shutdown();
    } finally {
      unregister();
    }
  }
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
