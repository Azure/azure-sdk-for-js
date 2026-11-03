// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to specify language locales for transcription.
 *
 * The `locales` option controls how the transcription service handles language recognition:
 * - **Single locale (known language)**: When you know the language of the audio, specify one
 *   locale to improve accuracy and minimize latency.
 * - **Multiple locales (language identification)**: When you're not sure about the language,
 *   specify multiple candidate locales and the service will identify the language
 *   (one locale per audio file).
 * - **No locale specified**: The service uses the multi-lingual model to auto-detect.
 *
 * For the full list of supported locales, see:
 * https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=stt
 *
 * @summary transcribe audio with specific locale options
 * @azsdk-weight 55
 */

import { TranscriptionClient } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import * as fs from "fs";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  console.log("== Transcription with Locale Specification Sample ==");

  const endpoint = process.env.TRANSCRIPTION_ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.TRANSCRIPTION_API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);

  // === Transcribe with a Known Locale ===
  // When you know the language of the audio, specify a single locale
  // to improve transcription accuracy and minimize latency.
  console.log("\n--- Known Locale (en-US) ---");

  const knownLocaleResult = await client.transcribe(audioFile, {
    locales: ["en-US"],
  });

  console.log("Transcription with known locale (en-US):");
  console.log(knownLocaleResult.combinedPhrases[0]?.text);

  // === Transcribe with Language Identification ===
  // When you're not sure about the locale, specify multiple candidate locales.
  // The service will identify the main language of the audio (one locale per audio file).
  console.log("\n--- Language Identification ---");

  const langIdResult = await client.transcribe(audioFile, {
    locales: ["en-US", "es-ES"],
  });

  console.log("Transcription with language identification:");
  for (const phrase of langIdResult.phrases) {
    console.log(`[${phrase.locale}] ${phrase.text}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
