// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Trace voice agent generation and an optional outbound call.
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

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Set ${name}.`);
  return value;
}

export async function main(): Promise<void> {
  const projectEndpoint = required("FOUNDRY_PROJECT_ENDPOINT");
  const provider = new NodeTracerProvider({
    spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
  });
  provider.register();
  const unregister = registerInstrumentations({
    instrumentations: [createAzureSdkInstrumentation()],
  });
  const operationsSpan = trace.getTracer("voice-tracing-sample").startSpan("voice REST operations");
  try {
    // Load the clients after registering instrumentation. Do not record caller content.
    const { AIProjectClient } = await import("@azure/ai-projects");
    const { DefaultAzureCredential } = await import("@azure/identity");
    const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential(), {
      tracingOptions: { experimental: true, contentRecording: false },
    });
    await context.with(trace.setSpan(context.active(), operationsSpan), async () => {
      const agent = await project.beta.agents.createFromPrompt({
        kind: "voice",
        name: `voice-rest-tracing-${Date.now()}`,
        goal: "Help callers find public transport information.",
      });
      try {
        console.log("Voice agent created. Inspect the create_agent span.");
      } finally {
        await project.agents.delete(agent.name, {
          requestOptions: { headers: { "foundry-features": "VoiceAgents=V1Preview" } },
        });
      }

      // This places a real telephone call and may incur charges. It is disabled by default.
      if (process.env["FOUNDRY_ENABLE_OUTBOUND_CALL"] === "true") {
        const job = await project.beta.voiceAgents.telephony.createCallJob(
          required("FOUNDRY_VOICE_AGENT_NAME"),
          randomUUID(),
          {
            connection_name: required("FOUNDRY_TELEPHONY_CONNECTION"),
            source: required("FOUNDRY_TELEPHONY_SOURCE"),
            destination: { type: "phone_number", value: required("FOUNDRY_TELEPHONY_DESTINATION") },
          },
          { foundryFeatures: "VoiceAgents=V1Preview" },
        );
        console.log(`Call job accepted (${job.status}); the call may still be in progress.`);
      } else {
        console.log(
          "Telephony skipped. Explicitly set FOUNDRY_ENABLE_OUTBOUND_CALL=true to place a test call.",
        );
      }
    });
  } finally {
    operationsSpan.end();
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
