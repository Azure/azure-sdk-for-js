// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Streams GPT Live spoken output, with optional interactive Responses-delegation text turns.
 * @azsdk-weight 100
 */

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { randomUUID } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { LiveSpeechActivity, runLiveAudioSession } from "./utils/liveAudio.js";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  const model = process.env["FOUNDRY_LIVE_MODEL"];
  const interactive = process.env["FOUNDRY_LIVE_INTERACTIVE"] === "true";
  const backendModel = process.env["FOUNDRY_LIVE_BACKEND_MODEL"];
  if (!endpoint || !model) {
    throw new Error("Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_LIVE_MODEL (a GPT Live deployment).");
  }
  if (interactive && !backendModel) {
    throw new Error("Set FOUNDRY_LIVE_BACKEND_MODEL for interactive Responses-delegation text.");
  }
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
  const name = `live-text-${randomUUID().slice(0, 8)}`;
  await project.agents.create(
    name,
    {
      kind: "voice",
      sub_protocol: "live",
      model_type: "self_deployed",
      model,
      instructions: "Be concise. Speak supplied greetings and delegated commentary briefly.",
      audio: { format: { type: "audio/pcm", rate: 24000 } },
      delegation:
        interactive && backendModel
          ? {
              type: "responses",
              responses: {
                model: backendModel,
                instructions: "Answer the user's question briefly in [commentary] tags.",
              },
            }
          : undefined,
      store: false,
    },
    { foundryFeatures: "VoiceAgents=V1Preview" },
  );
  try {
    const connection = await project.beta.voiceAgents.live.connect(name, { store: false });
    console.log(`Live session started: ${connection.session.id}`);
    const speech = new LiveSpeechActivity();
    let outputBytes = 0;
    let readingInput = false;
    let pendingCaption = "";
    let backendCompletions = 0;
    const completedResponses = new Set<string>();
    await runLiveAudioSession(
      connection,
      (event) => {
        const pcm = speech.observe(event);
        if (pcm) outputBytes += pcm.byteLength;
        if (event.type === "session.output_transcript.delta") {
          if (readingInput) {
            if (pendingCaption.length + event.delta.length > 65_536) {
              throw new Error("Buffered Live captions exceeded 65,536 characters.");
            }
            pendingCaption += event.delta;
          } else process.stdout.write(event.delta);
        } else if (event.type === "response.event" && event.event.type === "response.completed") {
          const response = event.event.response;
          if (
            !response ||
            typeof response !== "object" ||
            !("status" in response) ||
            response.status !== "completed" ||
            !("id" in response) ||
            typeof response.id !== "string"
          ) {
            throw new Error("The delegated text response did not complete successfully.");
          }
          if (!completedResponses.has(response.id)) {
            completedResponses.add(response.id);
            backendCompletions++;
            if (completedResponses.size > 64) {
              const oldest = completedResponses.values().next().value;
              if (oldest !== undefined) completedResponses.delete(oldest);
            }
          }
        }
      },
      async (sessionSignal) => {
        // Live appends context to an ongoing timeline; it does not create Realtime text turns.
        await connection.appendCommentary("Say: Hello from Microsoft Foundry GPT Live.", {
          abortSignal: sessionSignal,
        });
        await speech.waitForSpeech(sessionSignal);
        process.stdout.write("\n");
        if (!interactive) return;

        console.log("Type a question, or /quit to finish. Text is sent to the Responses backend.");
        console.log("Silent PCM keeps Live running while you type; voice usage remains billable.");
        const input = createInterface({ input: process.stdin, output: process.stdout });
        const inputStopped = new AbortController();
        input.on("SIGINT", () => inputStopped.abort());
        input.on("close", () => inputStopped.abort());
        const signal = AbortSignal.any([sessionSignal, inputStopped.signal]);
        try {
          while (!signal.aborted) {
            readingInput = true;
            let text: string;
            try {
              text = (await input.question("You: ", { signal })).trim();
            } finally {
              readingInput = false;
              if (pendingCaption) process.stdout.write(`${pendingCaption}\n`);
              pendingCaption = "";
            }
            if (text === "/quit") break;
            if (!text) continue;
            speech.reset();
            const before = backendCompletions;
            await connection.sendResponseItem(
              { type: "message", role: "user", content: [{ type: "input_text", text }] },
              { abortSignal: signal },
            );
            await connection.requestResponse({ abortSignal: signal });
            await speech.waitForSpeech(signal, () => backendCompletions > before, 60_000);
            process.stdout.write("\n");
          }
        } catch (error) {
          if (
            !inputStopped.signal.aborted ||
            !(error instanceof Error) ||
            (error.name !== "AbortError" &&
              !("code" in error && error.code === "ERR_USE_AFTER_CLOSE"))
          ) {
            throw error;
          }
        } finally {
          input.close();
        }
      },
    );
    console.log(`Received ${outputBytes} audio bytes. Conversation persistence is disabled.`);
  } finally {
    await project.agents.delete(name);
  }
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
