// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to transcribe an audio file using the Azure AI Speech Transcription service.
 *
 * @summary transcribe an audio file with automatic language detection
 * @azsdk-weight 100
 */

import { TranscriptionClient } from "@azure/azure-ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import * as fs from "fs";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  console.log("== Basic Transcription Sample ==");

  // <ReadmeSampleCreateClient_ApiKey>
  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  // </ReadmeSampleCreateClient_ApiKey>

  // <ReadmeSampleBasicTranscription>
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
  // For testing purposes, we'll create a mock audio file buffer
  // In real usage, you would read an actual audio file
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);
  const result = await client.transcribe({
    audio: audioFile,
  });
  console.log("Transcription:", result.combinedPhrases[0]?.text);
  // </ReadmeSampleBasicTranscription>

  console.log("\n=== Transcription Results ===");
  console.log(`Duration: ${result.durationMilliseconds}ms`);
  console.log("\nFull Transcript:");
  for (const combined of result.combinedPhrases) {
    if (combined.channel !== undefined) {
      console.log(`Channel ${combined.channel}: ${combined.text}`);
    } else {
      console.log(combined.text);
    }
  }

  console.log("\nPhrases:");
  for (const phrase of result.phrases) {
    console.log(
      `  [${phrase.offsetMilliseconds}ms - ${phrase.offsetMilliseconds + phrase.durationMilliseconds}ms]: ${phrase.text}`,
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
