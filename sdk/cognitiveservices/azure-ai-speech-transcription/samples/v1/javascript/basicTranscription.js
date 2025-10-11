// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to transcribe an audio file using the Azure AI Speech Transcription service.
 *
 * @summary transcribe an audio file with automatic language detection
 */

const { TranscriptionClient } = require("@azure/azure-ai-speech-transcription");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  console.log("== Basic Transcription Sample ==");

  const endpoint = process.env.ENDPOINT || "<endpoint>";
  const apiKey = process.env.API_KEY || "<api-key>";

  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

  // Read an audio file (replace with your audio file path)
  const audioFilePath = process.env.AUDIO_FILE_PATH || "path/to/audio.wav";

  if (!fs.existsSync(audioFilePath)) {
    console.error(`Audio file not found: ${audioFilePath}`);
    console.log("Please set the AUDIO_FILE_PATH environment variable to a valid audio file.");
    return;
  }

  const audioFile = fs.readFileSync(audioFilePath);

  console.log("Transcribing audio file...");
  const result = await client.transcribe({
    audio: audioFile,
  });

  console.log("\n=== Transcription Results ===");
  console.log(`Duration: ${result.durationMilliseconds}ms`);
  console.log("\nFull Transcript:");
  for (const combined of result.combinedPhrases) {
    if (combined.channel !== undefined) {
      console.log(`Channel ${combined.channel}: ${combined.text}`);
    } else {
      console.log(combined.text);
    }
  }

  console.log("\nPhrases:");
  for (const phrase of result.phrases) {
    console.log(
      `  [${phrase.offsetMilliseconds}ms - ${phrase.offsetMilliseconds + phrase.durationMilliseconds}ms]: ${phrase.text}`,
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
