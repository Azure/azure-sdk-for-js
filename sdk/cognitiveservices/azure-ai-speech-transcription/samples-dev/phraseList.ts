// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use phrase lists to improve transcription accuracy
 * for domain-specific terminology or proper nouns.
 *
 * @summary use phrase lists to improve transcription accuracy
 * @azsdk-weight 70
 */

import { TranscriptionClient } from "@azure/azure-ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import * as fs from "fs";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  console.log("== Phrase List Sample ==");

  // <ReadmeSamplePhraseList>
  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);
  const result = await client.transcribe({
    audio: audioFile,
    options: {
      locales: ["en-US"],
      phraseList: {
        phrases: ["Azure", "Cognitive Services", "Speech API"],
        biasingWeight: 5.0, // Weight from 1.0 to 20.0
      },
    },
  });
  console.log("Transcription:", result.combinedPhrases[0]?.text);
  // </ReadmeSamplePhraseList>

  console.log("\n=== Transcription Results ===");
  console.log(`Duration: ${result.durationMilliseconds}ms\n`);

  console.log("Full Transcript:");
  for (const combined of result.combinedPhrases) {
    console.log(combined.text);
  }

  console.log("\nPhrases:");
  for (const phrase of result.phrases) {
    console.log(`  - ${phrase.text}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
