// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VoiceAgentLiveConnection } from "@azure/ai-projects";
import { LiveSpeechActivity, runLiveAudioSession } from "./liveAudio.js";

/** Runs the UTC function example without opening resources, so its protocol flow can be tested offline. */
export async function runVoiceAgentLiveFunctions(
  connection: VoiceAgentLiveConnection,
): Promise<void> {
  const speech = new LiveSpeechActivity();
  const toolCalls = new Map<string, string>();
  const completedResponses = new Set<string>();
  const pendingTools = new Map<string, string>();
  let finalResponseCompleted = false;
  await runLiveAudioSession(
    connection,
    async (event) => {
      speech.observe(event);
      if (event.type === "session.output_transcript.delta") {
        process.stdout.write(event.delta);
      } else if (event.type === "response.event") {
        const backend = event.event;
        const item = backend.item;
        if (
          backend.type === "response.output_item.done" &&
          isRecord(item) &&
          item.type === "function_call"
        ) {
          if (
            item.name !== "get_current_time" ||
            typeof item.call_id !== "string" ||
            !item.call_id ||
            typeof item.arguments !== "string"
          ) {
            throw new Error("Unexpected or malformed get_current_time function call.");
          }
          const args: unknown = JSON.parse(item.arguments);
          if (!isRecord(args) || Object.keys(args).length) {
            throw new Error("get_current_time requires an empty JSON object argument.");
          }
          const fingerprint = `${item.name}:${JSON.stringify(args)}`;
          if (toolCalls.has(item.call_id)) {
            if (toolCalls.get(item.call_id) !== fingerprint) {
              throw new Error("The backend changed a previously completed function call.");
            }
            return;
          }
          if (toolCalls.size >= 3) throw new Error("The backend requested too many tool calls.");
          toolCalls.set(item.call_id, fingerprint);
          pendingTools.set(item.call_id, JSON.stringify({ utc: new Date().toISOString() }));
        } else if (backend.type === "response.completed") {
          const response = backend.response;
          if (
            !isRecord(response) ||
            response.status !== "completed" ||
            typeof response.id !== "string"
          ) {
            throw new Error("The delegated backend response did not complete successfully.");
          }
          if (completedResponses.has(response.id)) return;
          completedResponses.add(response.id);
          if (pendingTools.size) {
            speech.reset();
            for (const [callId, output] of pendingTools) {
              await connection.sendToolOutput(callId, output, { createResponse: false });
            }
            pendingTools.clear();
            await connection.requestResponse();
          } else {
            if (!toolCalls.size) throw new Error("The backend did not request get_current_time.");
            finalResponseCompleted = true;
          }
        } else if (backend.type === "response.output_text.delta") {
          if (typeof backend.delta !== "string") throw new Error("Invalid backend text delta.");
        }
      }
    },
    async (signal) => {
      await connection.sendResponseItem(
        {
          type: "message",
          role: "user",
          content: [
            { type: "input_text", text: "What is the current UTC time? Call get_current_time." },
          ],
        },
        { abortSignal: signal },
      );
      await connection.requestResponse({ abortSignal: signal });
      await speech.waitForSpeech(signal, () => finalResponseCompleted, 60_000);
    },
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
