// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use Enhanced Mode for LLM-powered transcription and translation,
 * combined with existing Fast Transcription options like diarization, profanity filtering,
 * and channel selection.
 *
 * Enhanced Mode uses LLM-powered speech recognition to provide improved transcription
 * accuracy, real-time translation, prompt-based customization, and multilingual support
 * with GPU acceleration. It works alongside existing transcription options.
 *
 * Supported tasks:
 * - `transcribe`: Transcribe audio in the input language (auto-detected or specified)
 * - `translate`: Translate audio to a specified target language
 *
 * Limitations:
 * - `confidence` is not available and always returns `0`
 * - Word-level timing is not supported for the `translate` task
 * - Diarization is not supported for the `translate` task
 * - `locales` and `phraseList` options are not required or applicable with Enhanced Mode
 *
 * @summary use Enhanced Mode for LLM-powered transcription and translation
 * @azsdk-weight 85
 */

import { TranscriptionClient, KnownProfanityFilterModes } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import * as fs from "fs";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  console.log("== Enhanced Mode Sample ==");

  const endpoint = process.env.TRANSCRIPTION_ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.TRANSCRIPTION_API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);

  // === Enhanced Mode Transcription with options ===
  console.log("\n--- Enhanced Mode Transcription ---");

  const transcribeResult = await client.transcribe(audioFile, {
    enhancedMode: {
      task: "transcribe",
      prompt: ["Output must be in lexical format."],
    },
    diarizationOptions: {
      maxSpeakers: 2,
    },
    profanityFilterMode: KnownProfanityFilterModes.Masked,
    activeChannels: [0, 1],
  });

  for (const phrase of transcribeResult.phrases) {
    console.log(`[Speaker ${phrase.speaker}] ${phrase.text}`);
  }

  console.log(`Duration: ${transcribeResult.durationInMs}ms`);

  // === Enhanced Mode Translation ===
  console.log("\n--- Enhanced Mode Translation ---");
  console.log("Note: Diarization and word-level timing are not supported for 'translate' task.");

  const translateResult = await client.transcribe(audioFile, {
    enhancedMode: {
      task: "translate",
      targetLanguage: "ko", // Translate to Korean
    },
    profanityFilterMode: KnownProfanityFilterModes.Masked,
  });
  console.log("Translated to Korean:", translateResult.combinedPhrases[0]?.text);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
