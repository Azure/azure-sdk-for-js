// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to specify one or more locales for transcription.
 *
 * @summary transcribe audio with specific locale options
 */

import { TranscriptionClient } from "@azure/azure-ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import * as fs from "fs";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  console.log("== Transcription with Locale Specification Sample ==");

  // <ReadmeSampleTranscriptionWithLocale>
  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);
  const result = await client.transcribe({
    audio: audioFile,
    options: {
      locales: ["en-US", "es-ES"],
    },
  });
  console.log("Transcription:", result.combinedPhrases[0]?.text);
  // </ReadmeSampleTranscriptionWithLocale>

  console.log("\n=== Transcription Results ===");
  console.log(`Duration: ${result.durationMilliseconds}ms\n`);

  console.log("Full Transcript:");
  for (const combined of result.combinedPhrases) {
    console.log(combined.text);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
