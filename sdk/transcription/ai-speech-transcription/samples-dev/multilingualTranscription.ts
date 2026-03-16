// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to transcribe audio with multilingual content using the
 * Azure AI Speech Transcription service.
 *
 * When your audio contains multilingual content that switches between different
 * languages, use the multilingual transcription model by not specifying any locales.
 * The service will automatically detect and transcribe each language segment.
 *
 * Supported locales:
 * de-DE, en-AU, en-CA, en-GB, en-IN, en-US, es-ES, es-MX, fr-CA, fr-FR,
 * it-IT, ja-JP, ko-KR, zh-CN
 *
 * Note: This feature is currently in preview. The multilingual model outputs
 * the "major locale" for each language (e.g., always "en-US" for English
 * regardless of accent).
 *
 * @summary transcribe multilingual audio content (preview)
 * @azsdk-weight 50
 */

import { TranscriptionClient } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import * as fs from "fs";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  console.log("== Multilingual Transcription Sample ==");

  const endpoint = process.env.TRANSCRIPTION_ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.TRANSCRIPTION_API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/multilingual-audio.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);

  // For multilingual content, do not specify any locales.
  // The service will automatically detect and transcribe each language segment.
  const result = await client.transcribe(audioFile);

  console.log("Multilingual Transcription:");
  console.log(result.combinedPhrases[0]?.text);

  // Each phrase includes the detected locale
  console.log("\nPhrases by detected locale:");
  for (const phrase of result.phrases) {
    console.log(`[${phrase.locale}] ${phrase.text}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
