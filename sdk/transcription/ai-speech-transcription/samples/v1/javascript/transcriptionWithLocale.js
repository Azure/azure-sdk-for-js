// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to specify language locales for transcription.
 *
 * @summary transcribe audio with specific locale options
 */

const { TranscriptionClient } = require("@azure/ai-speech-transcription");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  console.log("== Transcription with Locale Specification Sample ==");

  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);

  // === Transcribe with a Known Locale ===
  console.log("\n--- Known Locale (en-US) ---");

  const knownLocaleResult = await client.transcribe(audioFile, {
    locales: ["en-US"],
  });

  console.log("Transcription with known locale (en-US):");
  console.log(knownLocaleResult.combinedPhrases[0]?.text);

  // === Transcribe with Language Identification ===
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

module.exports = { main };
