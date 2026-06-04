// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use custom phrase lists to improve transcription accuracy
 * for domain-specific terminology, product names, or proper nouns.
 *
 * A phrase list allows you to provide terms that may not be well-recognized
 * by the default speech model. For example, without a phrase list:
 * - "Jessie" might be recognized as "Jesse"
 * - "Rehaan" might be recognized as "everyone"
 * - "Contoso" might be recognized as "can't do so"
 *
 * @summary use phrase lists to improve transcription accuracy
 */

import { TranscriptionClient } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import * as fs from "fs";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  console.log("== Phrase List Sample ==");

  const endpoint = process.env.TRANSCRIPTION_ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.TRANSCRIPTION_API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);

  // Add custom phrases to improve recognition of names and domain-specific terms
  const result = await client.transcribe(audioFile, {
    phraseList: {
      // Add names, locations, and terms that might be misrecognized
      phrases: ["Contoso", "Jessie", "Rehaan"],
    },
  });

  console.log("Transcription with custom phrase list:");
  console.log(result.combinedPhrases[0]?.text);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
