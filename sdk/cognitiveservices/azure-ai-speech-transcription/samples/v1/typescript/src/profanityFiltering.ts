// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use profanity filtering modes to control how
 * profanity is handled in transcription results.
 *
 * @summary control profanity handling in transcription results
 * @azsdk-weight 60
 */

import { TranscriptionClient } from "@azure/azure-ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import * as fs from "fs";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  console.log("== Profanity Filtering Sample ==");

  const endpoint = process.env.ENDPOINT || "<endpoint>";
  const apiKey = process.env.API_KEY || "<api-key>";

  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

  const audioFilePath = process.env.AUDIO_FILE_PATH || "path/to/audio.wav";

  if (!fs.existsSync(audioFilePath)) {
    console.error(`Audio file not found: ${audioFilePath}`);
    console.log("Please set the AUDIO_FILE_PATH environment variable to a valid audio file.");
    return;
  }

  const audioFile = fs.readFileSync(audioFilePath);

  // Demonstrate different profanity filter modes
  const modes = ["None", "Removed", "Tags", "Masked"] as const;

  for (const mode of modes) {
    console.log(`\n--- Profanity Filter Mode: ${mode} ---`);

    const result = await client.transcribe({
      audio: audioFile,
      options: {
        locales: ["en-US"],
        profanityFilterMode: mode,
      },
    });

    console.log("Transcript:");
    for (const combined of result.combinedPhrases) {
      console.log(combined.text);
    }
  }

  console.log("\n=== Mode Descriptions ===");
  console.log("None:    Profanity is left unchanged");
  console.log("Removed: Profanity is removed from the transcript");
  console.log("Tags:    Profanity is replaced with 'profanity' tag");
  console.log("Masked:  Profanity is replaced with asterisks (e.g., ***)");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
