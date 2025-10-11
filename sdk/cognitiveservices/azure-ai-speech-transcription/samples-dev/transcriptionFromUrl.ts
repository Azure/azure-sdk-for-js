// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to transcribe an audio file from a URL with multiple locale options.
 *
 * The service will automatically detect which locale is being spoken.
 *
 * @summary transcribe audio from a URL with automatic language detection
 * @azsdk-weight 90
 */

import { TranscriptionClient } from "@azure/azure-ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  console.log("== Transcription from URL Sample ==");

  const endpoint = process.env.ENDPOINT || "<endpoint>";
  const apiKey = process.env.API_KEY || "<api-key>";

  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

  // URL to an audio file (must be publicly accessible)
  const audioUrl = process.env.AUDIO_URL || "https://example.com/audio.wav";

  console.log(`Transcribing audio from URL: ${audioUrl}`);
  const result = await client.transcribe({
    options: {
      audioUrl: audioUrl,
      locales: ["en-US", "es-ES", "fr-FR"], // Multiple locale options for auto-detection
    },
  });

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
