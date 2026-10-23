// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Handles a GPT Live Responses function call and prints the spoken answer as captions.
 * @azsdk-weight 100
 */

import { AIProjectClient, VoiceAgentConnectionError } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { delay } from "@azure/core-util";
import { randomUUID } from "node:crypto";
import { once } from "node:events";
import { createInterface } from "node:readline";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  const model = process.env["FOUNDRY_LIVE_MODEL"];
  const backendModel = process.env["FOUNDRY_LIVE_BACKEND_MODEL"];
  if (!endpoint || !model || !backendModel) {
    throw new Error(
      "Set FOUNDRY_PROJECT_ENDPOINT, FOUNDRY_LIVE_MODEL and FOUNDRY_LIVE_BACKEND_MODEL.",
    );
  }
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
  const name = `live-functions-${randomUUID().slice(0, 8)}`;
  await project.agents.create(
    name,
    {
      kind: "voice",
      sub_protocol: "live",
      model_type: "self_deployed",
      model,
      instructions: "Read delegated commentary faithfully. Do not answer independently.",
      audio: { format: { type: "audio/pcm", rate: 24000 } },
      delegation: {
        type: "responses",
        responses: {
          model: backendModel,
          instructions:
            "Call get_current_time once. Return the UTC time in [commentary] tags. Spell out hours, minutes and seconds on the twenty-four-hour clock, including zero units.",
          parallel_tool_calls: false,
          tools: [
            {
              type: "function",
              name: "get_current_time",
              description: "Get the current UTC time.",
              parameters: { type: "object", properties: {}, additionalProperties: false },
              strict: true,
            },
          ],
        },
      },
      store: false,
    },
    { foundryFeatures: "VoiceAgents=V1Preview" },
  );
  try {
    const connection = await project.beta.voiceAgents.live.connect(name, { store: false });
    const stop = new AbortController();
    const terminal = createInterface({ input: process.stdin, output: process.stdout });
    const finished = once(terminal, "close");
    const closeInput = (): void => terminal.close();
    terminal.once("line", closeInput);
    terminal.once("SIGINT", closeInput);
    process.once("SIGINT", closeInput);
    console.log("Press Enter after reading the spoken answer, or Ctrl+C, to stop.");
    console.log("Live remains billable until stopped; this sample does not play audio.");

    const handledCalls = new Set<string>();
    let pendingCall: { callId: string; output: string } | undefined;
    const receive = (async () => {
      for await (const event of connection) {
        if (event.type === "error" || event.type === "transport.failed") {
          throw new Error(`Live service error ${event.error.code}: ${event.error.message}`);
        }
        if (event.type === "session.output_transcript.delta") process.stdout.write(event.delta);
        if (event.type !== "response.event") continue;
        const backend = event.event;
        if (["error", "response.failed", "response.incomplete"].includes(String(backend.type))) {
          throw new Error(`The Responses backend returned ${String(backend.type)}.`);
        }
        if (backend.type === "response.output_item.done") {
          const item = backend.item;
          if (!isRecord(item) || item.type !== "function_call") continue;
          if (
            item.name !== "get_current_time" ||
            typeof item.call_id !== "string" ||
            !item.call_id
          ) {
            throw new Error("Unexpected function call.");
          }
          if (handledCalls.has(item.call_id)) continue;
          if (pendingCall) throw new Error("This example expects one function call at a time.");
          handledCalls.add(item.call_id);
          pendingCall = {
            callId: item.call_id,
            output: JSON.stringify({ utc: new Date().toISOString() }),
          };
        } else if (backend.type === "response.completed") {
          if (!isRecord(backend.response) || backend.response.status !== "completed") {
            throw new Error("The Responses backend did not complete successfully.");
          }
          if (pendingCall) {
            console.log("\nTool result:", pendingCall.output);
            // Wait for the calling response to finish; sendToolOutput requests continuation.
            await connection.sendToolOutput(pendingCall.callId, pendingCall.output);
            pendingCall = undefined;
          }
        }
      }
      if (!stop.signal.aborted) throw new Error("Live closed before the sample was stopped.");
    })();
    // Live needs a continuous audio timeline while the backend works and the agent speaks.
    const send = (async () => {
      const silence = new Uint8Array(4800);
      while (!stop.signal.aborted) {
        const started = Date.now();
        await connection.sendAudio(silence, { abortSignal: stop.signal });
        await delay(Math.max(0, 100 - (Date.now() - started)));
      }
    })().catch((error: unknown) => {
      if (
        !stop.signal.aborted ||
        !(error instanceof VoiceAgentConnectionError) ||
        error.code !== "operationCancelled"
      ) {
        throw error;
      }
    });
    const ask = (async () => {
      await connection.sendResponseItem({
        type: "message",
        role: "user",
        content: [
          { type: "input_text", text: "What is the current UTC time? Use get_current_time." },
        ],
      });
      await connection.requestResponse();
      await finished;
    })();
    try {
      await Promise.race([receive, send, ask]);
    } finally {
      stop.abort();
      terminal.close();
      process.off("SIGINT", closeInput);
      try {
        await connection.close();
      } finally {
        await Promise.all([receive, send]);
      }
    }
  } finally {
    await project.agents.delete(name);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
