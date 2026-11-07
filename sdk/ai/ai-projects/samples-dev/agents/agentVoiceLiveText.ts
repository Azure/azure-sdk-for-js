// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Send text to GPT Live and print its spoken reply as captions.
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
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"]?.trim();
  const modelName = process.env["FOUNDRY_LIVE_MODEL"]?.trim();
  if (!projectEndpoint || !modelName) {
    throw new Error("Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_LIVE_MODEL (a deployment name).");
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const agentName = `live-text-${randomUUID().slice(0, 8)}`;
  await project.agents.create(
    agentName,
    {
      kind: "voice",
      sub_protocol: "live",
      model_type: "self_deployed",
      model: modelName,
      instructions: "Read the supplied commentary aloud.",
      audio: { format: { type: "audio/pcm", rate: 24000 } },
      store: false,
    },
    { foundryFeatures: "VoiceAgents=V1Preview" },
  );
  try {
    const connection = await project.beta.voiceAgents.live.connect(agentName, { store: false });
    const stop = new AbortController();
    const terminal = createInterface({ input: process.stdin, output: process.stdout });
    const finished = once(terminal, "close");
    const closeInput = (): void => terminal.close();
    terminal.once("line", closeInput);
    terminal.once("SIGINT", closeInput);
    process.once("SIGINT", closeInput);
    console.log("Captions stream below. Press Enter after the reply, or Ctrl+C, to stop.");
    console.log("Live remains billable until stopped; this sample does not play audio.");

    const receive = (async () => {
      for await (const event of connection) {
        if (event.type === "error" || event.type === "transport.failed") {
          throw new Error(`Live service error ${event.error.code}: ${event.error.message}`);
        }
        if (event.type === "session.output_transcript.delta") process.stdout.write(event.delta);
      }
      if (!stop.signal.aborted) throw new Error("Live closed before the sample was stopped.");
    })();
    // Live needs a continuous audio timeline, even for text. 4800 PCM16 bytes = 100 ms.
    const send = (async () => {
      const silence = new Uint8Array(4800);
      while (!stop.signal.aborted) {
        const started = Date.now();
        await connection.sendAudio(silence, { abortSignal: stop.signal });
        await delay(Math.max(0, 100 - (Date.now() - started)));
      }
    })().catch((error: unknown) => {
      if (
        stop.signal.aborted &&
        error instanceof VoiceAgentConnectionError &&
        error.code === "operationCancelled"
      ) {
        return;
      }
      throw error;
    });
    const greet = (async () => {
      await connection.appendCommentary("Hello from Microsoft Foundry GPT Live.");
      await finished;
    })();
    try {
      await Promise.race([receive, send, greet]);
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
    await project.agents.delete(agentName);
  }
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
