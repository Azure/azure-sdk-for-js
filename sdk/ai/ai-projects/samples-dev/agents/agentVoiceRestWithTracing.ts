// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Trace Voice Agent generation and, with explicit opt-in, an outbound telephony job.
 * @azsdk-weight 50
 */

import { provider, context, trace } from "./consoleTracingSetup.js";
import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import { randomUUID } from "node:crypto";
import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Set ${name}.`);
  return value;
}

export async function main(): Promise<void> {
  const project = new AIProjectClient(
    required("FOUNDRY_PROJECT_ENDPOINT"),
    new DefaultAzureCredential(),
    {
      tracingOptions: { experimental: true, contentRecording: false },
    },
  );
  const parent = trace.getTracer("voice-tracing-sample").startSpan("voice REST operations");
  try {
    await context.with(trace.setSpan(context.active(), parent), async () => {
      const agent = await project.beta.agents.createFromPrompt({
        kind: "voice",
        name: `voice-rest-tracing-${Date.now()}`,
        goal: "Help callers find public transport information.",
      });
      try {
        console.log("Voice Agent generation completed. Inspect the create_agent span.");
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
        console.log(
          `Call job accepted; current status: ${job.status}. Acceptance is not call completion.`,
        );
      } else {
        console.log(
          "Telephony skipped. Explicitly set FOUNDRY_ENABLE_OUTBOUND_CALL=true to place a test call.",
        );
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
