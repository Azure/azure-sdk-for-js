// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Sends actual raw PCM speech to GPT Live and saves the streamed audio response.
 * @azsdk-weight 100
 */

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { randomUUID } from "node:crypto";
import { readFile, open } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  LiveSpeechActivity,
  runLiveAudioSession,
  validateLivePcmInput,
} from "./utils/liveAudio.js";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  const model = process.env["FOUNDRY_LIVE_MODEL"];
  if (!endpoint || !model) {
    throw new Error("Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_LIVE_MODEL (a GPT Live deployment).");
  }
  const inputPath =
    process.env["FOUNDRY_LIVE_AUDIO_INPUT"] ??
    join(dirname(fileURLToPath(import.meta.url)), "assets", "input.pcm");
  const input = await readFile(inputPath);
  validateLivePcmInput(input);
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
      const speech = new LiveSpeechActivity();
      let receivedBytes = 0;
      await runLiveAudioSession(
        connection,
        async (event) => {
          const bytes = speech.observe(event);
          if (bytes) {
            await output.writeFile(bytes);
            receivedBytes += bytes.length;
          } else if (event.type === "session.output_transcript.delta") {
            process.stdout.write(event.delta);
          }
        },
        (signal, inputComplete) =>
          speech.waitForSpeech(signal, inputComplete, (input.length / 48000) * 1000 + 30_000),
        input,
      );
      console.log(`\nSaved ${receivedBytes} bytes to ${outputPath} (PCM16LE, mono, 24 kHz).`);
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
