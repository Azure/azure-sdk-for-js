// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Send a PCM speech file to GPT Live (preview) and save its spoken reply.
 */

const { AIProjectClient, VoiceAgentConnectionError } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const { delay } = require("@azure/core-util");
const { randomUUID } = require("node:crypto");
const { once } = require("node:events");
const { existsSync } = require("node:fs");
const { readFile, open } = require("node:fs/promises");
const { createInterface } = require("node:readline");
require("dotenv/config");

async function main() {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"]?.trim();
  const modelName = process.env["FOUNDRY_LIVE_MODEL"]?.trim();
  if (!projectEndpoint || !modelName) {
    throw new Error("Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_LIVE_MODEL (a deployment name).");
  }
  const adjacentInput = new URL(
    "./assets/input.pcm",
    require("node:url").pathToFileURL(__filename).href,
  );
  const inputPath =
    process.env["FOUNDRY_LIVE_AUDIO_INPUT"]?.trim() ||
    // Published TypeScript assets sit outside src/ and dist/.
    (existsSync(adjacentInput)
      ? adjacentInput
      : new URL(
          "../../agents/assets/input.pcm",
          require("node:url").pathToFileURL(__filename).href,
        ));
  const input = await readFile(inputPath);
  if (
    !input.length ||
    input.length % 2 ||
    ["RIFF", "RIFX"].includes(input.toString("ascii", 0, 4))
  ) {
    throw new Error("Input must be raw mono PCM16LE at 24 kHz, not a WAV container.");
  }
  const outputPath = process.env["FOUNDRY_LIVE_AUDIO_OUTPUT"]?.trim() || "voice-live-output.pcm";
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const agentName = `live-audio-${randomUUID().slice(0, 8)}`;
  await project.agents.create(
    agentName,
    {
      kind: "voice",
      sub_protocol: "live",
      model_type: "self_deployed",
      model: modelName,
      instructions: "Answer the user's spoken question briefly.",
      audio: { format: { type: "audio/pcm", rate: 24000 } },
      store: false,
    },
    { foundryFeatures: "VoiceAgents=V1Preview" },
  );
  try {
    const output = await open(outputPath, "w");
    try {
      const connection = await project.beta.voiceAgents.live.connect(agentName, { store: false });
      const stop = new AbortController();
      const terminal = createInterface({ input: process.stdin, output: process.stdout });
      const finished = once(terminal, "close");
      const closeInput = () => terminal.close();
      terminal.once("line", closeInput);
      terminal.once("SIGINT", closeInput);
      process.once("SIGINT", closeInput);
      console.log(
        "Press Enter after the reply, or Ctrl+C, to stop. Live remains billable until then.",
      );
      console.log(`Saving the reply to ${outputPath}; this sample does not play audio.`);

      const receive = (async () => {
        for await (const event of connection) {
          if (event.type === "error" || event.type === "transport.failed") {
            throw new Error(`Live service error ${event.error.code}: ${event.error.message}`);
          }
          if (event.type === "session.output_audio.delta") {
            await output.writeFile(Buffer.from(event.delta, "base64"));
          } else if (event.type === "session.output_transcript.delta") {
            process.stdout.write(event.delta);
          }
        }
        if (!stop.signal.aborted) throw new Error("Live closed before the sample was stopped.");
      })();
      const send = (async () => {
        // Live needs paced audio even during its reply: 4800 PCM16 bytes = 100 ms.
        for (let offset = 0; !stop.signal.aborted; offset += 4800) {
          const bytes = new Uint8Array(4800);
          bytes.set(input.subarray(offset, offset + 4800));
          const started = Date.now();
          await connection.sendAudio(bytes, { abortSignal: stop.signal });
          await delay(Math.max(0, 100 - (Date.now() - started)));
        }
      })().catch((error) => {
        if (
          stop.signal.aborted &&
          error instanceof VoiceAgentConnectionError &&
          error.code === "operationCancelled"
        ) {
          return;
        }
        throw error;
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
    await project.agents.delete(agentName);
  }
}

main().catch((error) => {
  console.error("Sample failed:", error);
  process.exitCode = 1;
});

module.exports = { main };
