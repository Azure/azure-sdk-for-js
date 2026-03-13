// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to transcribe a local audio file using the Azure AI Speech Transcription service.
 *
 * @summary transcribe a local audio file
 */

const { TranscriptionClient } = require("@azure/ai-speech-transcription");
const { AzureKeyCredential } = require("@azure/core-auth");
const fs = require("fs");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  console.log("== Basic Transcription Sample ==");

  const endpoint = process.env.ENDPOINT ?? "<endpoint>";
  const apiKey = process.env.API_KEY ?? "<api-key>";
  const client = new TranscriptionClient(endpoint, new AzureKeyCredential(apiKey));

  const audioFilePath = process.env.AUDIO_FILE_PATH ?? "path/to/audio.wav";
  const audioFile = fs.existsSync(audioFilePath) ? fs.readFileSync(audioFilePath) : Buffer.from([]);

  // Transcribe the audio file
  const result = await client.transcribe(audioFile);

  // Display the transcription results
  console.log(`Total audio duration: ${result.durationInMs}ms`);
  console.log("\nTranscription:");
  console.log(result.combinedPhrases[0]?.text);

  // Display detailed phrase-level results
  console.log("\n=== Detailed Phrases ===");
  for (const phrase of result.phrases) {
    console.log(
      `[${phrase.offsetMilliseconds}ms - ${phrase.offsetMilliseconds + phrase.durationMilliseconds}ms] ${phrase.text}`,
    );
    console.log(`  Confidence: ${phrase.confidence.toFixed(2)}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
