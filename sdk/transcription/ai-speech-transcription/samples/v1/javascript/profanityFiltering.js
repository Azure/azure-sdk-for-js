// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use profanity filtering modes to control how
 * profanity is handled in transcription results.
 *
 * @summary control profanity handling in transcription results
 */

const { TranscriptionClient } = require("@azure/ai-speech-transcription");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  console.log("== Profanity Filtering Sample ==");

  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));
  const audioFilePath = process.env.PROFANITY_AUDIO_FILE_PATH ?? "path/to/audio-with-profanity.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);

  // Demonstrate all four profanity filter modes
  const filterModes = ["None", "Masked", "Removed", "Tags"];

  for (const filterMode of filterModes) {
    const result = await client.transcribe(audioFile, {
      profanityFilterMode: filterMode,
    });

    console.log(`ProfanityFilterMode "${filterMode}":`);
    console.log(`  ${result.combinedPhrases[0]?.text}`);
    console.log();
  }

  console.log("=== When to Use Each Mode ===");
  console.log("None:    Use when you need the exact spoken content (e.g., content moderation).");
  console.log(
    "Masked:  Use for general applications where you want to indicate profanity (default).",
  );
  console.log("Removed: Use when you want completely clean output.");
  console.log(
    "Tags:    Use when you need to programmatically identify profanity in post-processing.",
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
