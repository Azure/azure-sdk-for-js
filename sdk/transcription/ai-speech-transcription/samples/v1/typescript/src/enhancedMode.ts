// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use Enhanced Mode for LLM-powered transcription and translation.
 *
 * Enhanced Mode uses LLM-powered speech recognition to provide improved transcription
 * accuracy, real-time translation, prompt-based customization, and multilingual support
 * with GPU acceleration.
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

import { TranscriptionClient } from "@azure/ai-speech-transcription";
import { AzureKeyCredential } from "@azure/core-auth";
import * as fs from "fs";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  console.log("== Enhanced Mode Sample ==");

  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);

  // === Transcribe with Enhanced Mode ===
  console.log("\n--- Enhanced Mode Transcription ---");

  const transcribeResult = await client.transcribe(audioFile, {
    enhancedMode: {
      task: "transcribe",
    },
  });
  console.log("Transcription:", transcribeResult.combinedPhrases[0]?.text);
  console.log(`Duration: ${transcribeResult.durationMilliseconds}ms`);

  // === Translate with Enhanced Mode ===
  console.log("\n--- Enhanced Mode Translation ---");

  const translateResult = await client.transcribe(audioFile, {
    enhancedMode: {
      task: "translate",
      targetLanguage: "ko", // Translate to Korean
    },
  });
  console.log("Translated to Korean:", translateResult.combinedPhrases[0]?.text);

  // === Enhanced Mode with Prompt ===
  console.log("\n--- Enhanced Mode with Prompt ---");

  const promptResult = await client.transcribe(audioFile, {
    enhancedMode: {
      task: "transcribe",
      prompt: ["Output must be in lexical format."],
    },
  });
  console.log("Transcription with prompt:", promptResult.combinedPhrases[0]?.text);

  // === Enhanced Mode with Diarization ===
  console.log("\n--- Enhanced Mode with Diarization ---");
  console.log("Note: Diarization is only supported for 'transcribe' task, not 'translate'.");

  const diarizeResult = await client.transcribe(audioFile, {
    enhancedMode: {
      task: "transcribe",
      prompt: ["Output must be in lexical format."],
    },
    profanityFilterMode: "Masked",
    diarizationOptions: {
      maxSpeakers: 2,
    },
  });

  for (const phrase of diarizeResult.phrases) {
    console.log(`[Speaker ${phrase.speaker}] ${phrase.text}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
