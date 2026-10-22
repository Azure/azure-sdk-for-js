// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sends a raw PCM speech file to GPT Live and saves the streamed audio response.
 * @azsdk-weight 100
 */

import { AIProjectClient, VoiceAgentConnectionError } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { delay } from "@azure/core-util";
import { randomUUID } from "node:crypto";
import { once } from "node:events";
import { readFile, open } from "node:fs/promises";
import { createInterface } from "node:readline";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  const model = process.env["FOUNDRY_LIVE_MODEL"];
  if (!endpoint || !model) {
    throw new Error("Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_LIVE_MODEL (a deployment name).");
  }
  const inputPath =
    process.env["FOUNDRY_LIVE_AUDIO_INPUT"] ?? new URL("./assets/input.pcm", import.meta.url);
  const input = await readFile(inputPath);
  if (
    !input.length ||
    input.length % 2 ||
    ["RIFF", "RIFX"].includes(input.toString("ascii", 0, 4))
  ) {
    throw new Error("Input must be raw mono PCM16LE at 24 kHz, not a WAV container.");
  }
  const outputPath = process.env["FOUNDRY_LIVE_AUDIO_OUTPUT"] ?? "voice-live-output.pcm";
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
  const name = `live-audio-${randomUUID().slice(0, 8)}`;
  await project.agents.create(
    name,
    {
      kind: "voice",
      sub_protocol: "live",
      model_type: "self_deployed",
      model,
      instructions: "Answer the user's spoken question briefly.",
      audio: { format: { type: "audio/pcm", rate: 24000 } },
      store: false,
    },
    { foundryFeatures: "VoiceAgents=V1Preview" },
  );
  try {
    const output = await open(outputPath, "w");
    try {
      const connection = await project.beta.voiceAgents.live.connect(name, { store: false });
      const stop = new AbortController();
      const terminal = createInterface({ input: process.stdin, output: process.stdout });
      const finished = once(terminal, "close");
      const closeInput = (): void => terminal.close();
      terminal.once("line", closeInput);
      terminal.once("SIGINT", closeInput);
      process.once("SIGINT", closeInput);
      console.log(
        "Press Enter after the reply, or Ctrl+C, to stop. Live remains billable until then.",
      );

      const receive = (async () => {
        for await (const event of connection) {
          if (event.type === "error" || event.type === "transport.failed") {
            throw new Error(`Live service error ${event.error.code}: ${event.error.message}`);
          }
          if (event.type === "session.output_audio.delta") {
            const bytes = Buffer.from(event.delta, "base64");
            if (bytes.length % 2) throw new Error("The service returned incomplete PCM16 audio.");
            await output.writeFile(bytes);
          } else if (event.type === "session.output_transcript.delta") {
            process.stdout.write(event.delta);
          }
        }
        if (!stop.signal.aborted) throw new Error("Live closed before the sample was stopped.");
      })();
      const send = (async () => {
        const silence = new Uint8Array(4800);
        // Send 100 ms PCM chunks, then silence to keep the reply's audio timeline advancing.
        for (let offset = 0; !stop.signal.aborted; offset += 4800) {
          const bytes = offset < input.length ? input.subarray(offset, offset + 4800) : silence;
          const started = Date.now();
          await connection.sendAudio(bytes, { abortSignal: stop.signal });
          await delay(Math.max(0, bytes.length / 48 - (Date.now() - started)));
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
      try {
        await Promise.race([receive, send, finished]);
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
      console.log(`\nSaved output to ${outputPath} (raw PCM16LE, mono, 24 kHz).`);
    } finally {
      await output.close();
    }
  } finally {
    await project.agents.delete(name);
  }
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});
